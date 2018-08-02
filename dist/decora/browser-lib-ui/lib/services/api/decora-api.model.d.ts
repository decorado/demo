export declare class UserAuthData {
    id: string;
    email: string;
    name: string;
    country: string;
    company: string;
    role: number;
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
export interface ServiceConfig {
    host: string;
    authHost?: string;
    useMockApi?: boolean;
    mockApiHost?: string;
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
    columns?: any;
    page?: number;
    limit?: number;
    textSearch?: string;
}
export interface SerializedDecFilter {
    filter?: string;
    projectView?: string;
    columns?: string;
    page?: number;
    limit?: number;
    textSearch?: string;
}
export interface Filter {
    property: string;
    value: string | string[];
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
