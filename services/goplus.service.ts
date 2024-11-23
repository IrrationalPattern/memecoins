import { GoPlus, ErrorCode } from "@goplus/sdk-node";
import { ethers } from 'ethers';

import {GoPlusVerificationChecks, GoPlusVerificationResult} from "@/types/goplus";

const baseRpcUrl = 'https://mainnet.base.org';

const provider = new ethers.JsonRpcProvider(baseRpcUrl);

function stringToBoolean(str: string) {
    return str === '1';
}

const threatsDescriptions = {
    isNoBuyTax: 'Buy tax is set',
    isNoSellTax: 'Sell tax is set',
    isNoExternalCall: 'External calls',
    isNoHiddenOwner: 'Hidden owner',
    isOpenSource: 'Not open-source',
    isNotHoneyPot: 'Honey pot',
    isNotHoneyPotCreator: 'Honey pot creator',
    isNotProxy: 'Proxy contract',
    isNotMintable: 'Token is mintable',
    isNotTransferPausable: 'Transfer pausable',
    isNoTradingCooldown: 'Trading cooldown',
    isCanSellAll: 'Cat sell all',
    isOwnerCantChangeBalance: 'Owner can change balance',
    isNotBlacklisted: 'Blacklisted',
    isNotWhitelisted: 'Whitelisted',
    isNoSelfDestruct: 'Self-destruct',
    isNoCreatorFee: 'Creator fee',
    isCantTakeBackOwnership: 'Can take back ownership',
    isSlippageNotModifiable: 'Slippage modifiable',
    isCanBuy: 'Cannot buy',
}

export class GoPlusService {
    static async verifyToken(address: string): Promise<GoPlusVerificationResult | null> {
        const network = await provider.getNetwork();
        const chainId = network.chainId;

        const response = await GoPlus.tokenSecurity(chainId, [address], 30);
        if (response.code != ErrorCode.SUCCESS) {
            console.error(response.message);
            return null;
        }

        const token = response.result[address];

        const owner = token.owner_address;
        const isAntiWhale = stringToBoolean(token.is_anti_whale);
        const isAntiWhaleModifiable = stringToBoolean(token.anti_whale_modifiable);

        const verificationData: GoPlusVerificationChecks = {
            isNoBuyTax: token.sell_tax === '',
            isNoSellTax: token.buy_tax === '',
            isNoExternalCall: !stringToBoolean(token.external_call),
            isNoHiddenOwner: !stringToBoolean(token.hidden_owner),
            isOpenSource: stringToBoolean(token.is_open_source),
            isNotHoneyPot: !stringToBoolean(token.is_honeypot),
            isNotHoneyPotCreator: !stringToBoolean(token.honeypot_with_same_creator),
            isNotProxy: !stringToBoolean(token.is_proxy),
            isNotMintable: !stringToBoolean(token.is_mintable),
            isNotTransferPausable: !stringToBoolean(token.transfer_pausable),
            isNoTradingCooldown: !stringToBoolean(token.trading_cooldown),
            isCanSellAll: !isAntiWhale && !isAntiWhaleModifiable,
            isOwnerCantChangeBalance: !stringToBoolean(token.owner_change_balance),
            isNotBlacklisted: !stringToBoolean(token.is_blacklisted),
            isNotWhitelisted: !stringToBoolean(token.is_whitelisted),
            isNoSelfDestruct: !stringToBoolean(token.selfdestruct),
            isNoCreatorFee: parseFloat(token.creator_percent) === 0,
            isCantTakeBackOwnership: !stringToBoolean(token.can_take_back_ownership),
            isSlippageNotModifiable: !stringToBoolean(token.slippage_modifiable),
            isCanBuy: !stringToBoolean(token.cannot_buy),
        }

        const threats = Object.keys(verificationData).filter((key) => {
            return !verificationData[key as keyof GoPlusVerificationChecks];
        }) as Array<keyof GoPlusVerificationChecks>;

        return {
            isAllChecksPassed: threats.length === 0,
            threats: threats.map((threat) => threatsDescriptions[threat]),
            info: {
                owner,
                isAntiWhale,
                isAntiWhaleModifiable
            }
        }
    }
}
