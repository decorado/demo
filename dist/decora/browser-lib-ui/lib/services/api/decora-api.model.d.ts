export declare class UserAuthData {
    id: string;
    email: string;
    name: string;
    country: string;
    company: string;
    role: number;
    i18n: string;
    permissions: Array<string>;
    constructor(user?: any);
}
export interface LoginData {
    email: string;
    password: string;
    keepLogged: boolean;
}
export interface FacebookLoginData {
    keepLogged: boolean;
    facebookToken: string;
}
export declare type FilterGroups = FilterGroup[];
export declare type Filters = Filter[];
export interface FilterData {
    endpoint: string;
    payload: DecFilter;
    cbk?: Function;
    clear?: boolean;
}
export interface DecFilter {
    filterGroups?: FilterGroups;
    projectView?: any;
    sort?: any;
    page?: number;
    limit?: number;
    textSearch?: string;
}
export interface SerializedDecFilter {
    filter?: string;
    projectView?: string;
    sort?: string;
    page?: number;
    limit?: number;
    textSearch?: string;
}
export declare class Filter {
    property: string;
    value: string | string[];
    constructor(data?: any);
}
export interface FilterGroup {
    filters: Filters;
}
export interface ColumnsSortConfig {
    property: string;
    order: {
        type: 'asc' | 'desc';
    };
}
