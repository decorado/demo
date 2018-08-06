import { Observable } from 'rxjs';
import { Filters, FilterGroups } from './../../services/api/decora-api.model';
export declare type DecListPreSearch = (filterGroups: FilterGroups) => FilterGroups;
export declare type DecListFetchMethod = (endpoint: string, filter: any) => Observable<DecListFetchMethodResponse>;
export declare type DecListType = 'table' | 'grid';
export interface DecListFetchMethodResponse {
    result: {
        rows: any[];
        count: number;
    };
}
export declare class DecListFilter {
    children?: DecListFilter[];
    count?: Function | string;
    default?: boolean;
    filters: Filters;
    hide?: boolean;
    label: string;
    color: string;
    listMode?: DecListType;
    permissions?: string[];
    uid?: string;
    constructor(data?: any);
}
