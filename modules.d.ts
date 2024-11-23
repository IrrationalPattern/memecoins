const ErrorCode = {
    SUCCESS = 1,
    DATA_PENDING_SYNC = 2,
    ADDRESS_FORMAT_ERROR = 2004,
    CHAIN_NOT_SUPPORTED = 2018,
    NON_CONTRACT_ADDRESS = 2020,
    CONTRACT_INFO_NOT_FOUND = 2021,
    DAPP_NOT_FOUND = 2026,
    ABI_NOT_FOUND = 2027,
    ABI_FUNCTION_UNSUPPOERT = 2028,
    APP_KEY_NOT_EXIST = 4010,
    SIGNATURE_EXPIRATION = 4011,
    SIGNATURE_VERIFICATION_FAILURE = 4012,
    FREQUENCY_OVER_LIMIT = 4029,
    INVALID_TOKEN = 4022,
    TOKEN_NOT_FOUND = 4023,
    SERVER_ERROR = 5000,
    PARAM_ERROR = 5006
}

interface TokenSecurityResponse {
    code: ErrorCode;
    message: string;
    result: Record<string, {
        owner_address: string;
        is_anti_whale: string;
        anti_whale_modifiable: string;
        sell_tax: string;
        buy_tax: string;
        external_call: string;
        hidden_owner: string;
        is_open_source: string;
        is_honeypot: string;
        honeypot_with_same_creator: string;
        is_proxy: string;
        is_mintable: string;
        transfer_pausable: string;
        trading_cooldown: string;
        owner_change_balance: string;
        is_blacklisted: string;
        is_whitelisted: string;
        selfdestruct: string;
        creator_percent: string;
        can_take_back_ownership: string;
        slippage_modifiable: string;
        cannot_buy: string;
    }>
}

declare module '@goplus/sdk-node' {
    export const GoPlus: {
        tokenSecurity: (chainId: bigint, tokens: string[], timeout: number) => Promise<TokenSecurityResponse>;
    };
    export const ErrorCode: ErrorCode;
}
