export interface GoPlusVerificationChecks {
    isNoBuyTax: boolean,
    isNoSellTax: boolean,
    isNoExternalCall: boolean
    isNotHoneyPot: boolean
    isNotHoneyPotCreator: boolean,
    isNotTransferPausable: boolean,
    isNoTradingCooldown: boolean,
    isNoSelfDestruct: boolean,
    isOpenSource: boolean,
    isNoCreatorFee: boolean,
    isNotProxy: boolean,
    isCantTakeBackOwnership: boolean,
    isNotBlacklisted: boolean,
    isSlippageNotModifiable: boolean,
    isNotMintable: boolean,
    isCanBuy: boolean,
    isNoHiddenOwner: boolean
    isOwnerCantChangeBalance: boolean
    isNotWhitelisted: boolean
    isCanSellAll: boolean
}

export interface GoPlusVerificationInfo {
    owner: string
    isAntiWhale: boolean
    isAntiWhaleModifiable: boolean
}

export interface GoPlusVerificationResult {
    isAllChecksPassed: boolean
    threats: string[]
    info: GoPlusVerificationInfo
}