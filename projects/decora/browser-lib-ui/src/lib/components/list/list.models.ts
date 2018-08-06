import { Observable } from 'rxjs';
import { Filters, FilterGroups } from './../../services/api/decora-api.model';


/*
  * DecListPreSearch
  *
  * Used as middleware to manipulate the filter before fetchng the data
  */
export type DecListPreSearch = (filterGroups: FilterGroups) => FilterGroups;


/*
  * DecListFetchMethod
  *
  * Used to fetch data from remote API
  */
export type DecListFetchMethod = (endpoint: string, filter: any) => Observable<DecListFetchMethodResponse>;

/*
  * ListType
  *
  * List types
  */
export type DecListType = 'table' | 'grid';

/*
  * DecListFetchMethodResponse
  *
  * Response received by fetch DecListFetchMethod
  */
export interface DecListFetchMethodResponse {
  result: {
    rows: any[];
    count: number;
  };
}

/*
  * DecListFilter
  *
  * Structure of tabs filters
  */
export class DecListFilter {
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

  constructor(data: any = {}) {
    this.children = data.children ? data.children.map(filter => new DecListFilter(filter)) : undefined;
    this.count = data.count || undefined;
    this.default = data.default || undefined;
    this.filters = data.filters || undefined;
    this.hide = data.hide || undefined;
    this.label = data.label || undefined;
    this.color = data.color || '#6E757A';
    this.listMode = data.listMode || undefined;
    this.permissions = data.permissions || undefined;
    this.uid = data.uid || data.label;
  }
}
