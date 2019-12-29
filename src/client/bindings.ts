import {CurrencyType, CurrencyType1, CurrencyType3, EntityType} from "./models";

export class ProjectModel {
    guid?: string;
    name?: string;
    description?: string;
    repository_guid?: string;
    creator_guid?: string;
    base_uri?: string;
    stars_count?: number;
    created_at?: string;
    updated_at?: string;
}

export class BoardModel {
    guid?: string;
    name?: string;
    description?: string;
    project_guid?: string;
    user_guid?: string;
    created_at?: string;
    updated_at?: string;
}

export class ColumnModel {
    guid?: string;
    name?: string;
    board_guid?: string;
    board_order?: number;
}

export class CardModel {
    guid?: string;
    name?: string;
    description?: string;
    creator_guid?: string;
    column_order?: number;
    column_guid?: string;
    created_at?: string;
    updated_at?: string;
}

export class FundingBalance {
    guid?: string;
    entity_guid?: string;
    /**
     * Possible values include: 'ProjectCategory', 'Project', 'Board', 'Card', 'BacklogItem',
     * 'UserBalance'
     */
    entity_type?: EntityType;
    amount?: number;
    /**
     * Possible values include: 'Usd', 'BitCoin', 'Ethereum', 'Erc20Token', 'Waves', 'WavesToken',
     * 'LiteCoin'
     */
    currency_type?: CurrencyType;
}

export class ProjectWorkType {
    guid?: string;
    project_guid?: string;
    title?: string;
    budget_percent?: number;
    created_at?: string;
    updated_at?: string;
}

export class CardWork {
    guid?: string;
    user_guid?: string;
    card_guid?: string;
    work_type?: ProjectWorkType;
    proof?: string;
    created_at?: string;
    updated_at?: string;
}

export class InvoiceModel {
    guid?: string;
    user_id?: string;
    entity_guid?: string;
    /**
     * Possible values include: 'ProjectCategory', 'Project', 'Board', 'Card', 'BacklogItem',
     * 'UserBalance'
     */
    entity_type?: EntityType;
    amount?: number;
    status?: string;
    /**
     * Possible values include: 'Usd', 'BitCoin', 'Ethereum', 'Erc20Token', 'Waves', 'WavesToken',
     * 'LiteCoin'
     */
    currency_type?: CurrencyType1;
    wallet?: CurrencyWallet;
    created_at?: string;
    updated_at?: string;
}

export class CurrencyWallet {
    guid?: string;
    address?: string;
    /**
     * Possible values include: 'Usd', 'BitCoin', 'Ethereum', 'Erc20Token', 'Waves', 'WavesToken',
     * 'LiteCoin'
     */
    currency_type?: CurrencyType1;
}

export class UserBalanceModel {
    guid?: string;
    user_guid?: string;
    /**
     * Possible values include: 'Usd', 'BitCoin', 'Ethereum', 'Erc20Token', 'Waves', 'WavesToken',
     * 'LiteCoin'
     */
    currency_type?: CurrencyType3;
    amount?: number;
    created_at?: string;
    updated_at?: string;
}
export class UserModel {
    guid?: string;
    login?: string;
    email?: string;
    register_date?: string;
}

export class LibraryItem {
    guid?: string;
    user_guid?: string;
    project_guid?: string;
    created_at?: string;
}

export class ProjectProduct {
    guid?: string;
    name?: string;
    description?: string;
    /**
     * url to view product info (optional)
     */
    url?: string;
    project_guid?: string;
    usd_price?: number;
    duration_hours?: number;
    users_count?: number;
    created_at?: string;
    updated_at?: string;
}

export interface WithdrawalRequest {
    guid?: string;
    user_guid?: string;
    amount?: number;
    address?: string;
    paid?: boolean;
    created_at?: string;
}
