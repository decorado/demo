export class UserAuthData {
  public id: string;
  public email: string;
  public name: string;
  public country: string;
  public company: string;
  public role: number;
  public i18n: string;
  public permissions: Array<string>;

  constructor(user: any = {}) {
    this.id = user.id || undefined;
    this.email = user.email || undefined;
    this.name = user.name || undefined;
    this.country = user.country || undefined;
    this.company = user.company || undefined;
    this.role = user.role || undefined;
    this.i18n = user.i18n || undefined;
    this.permissions = user.permissions || undefined;
  }
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

/*
  * FilterGroups
  *
  * an Array of filter group
  */
export type FilterGroups = FilterGroup[];

/*
  * Filters
  *
  * an Array of filter
  */
export type Filters = Filter[];

/*
  * FilterData
  *
  * Filter configuration
  */
export interface FilterData {
  endpoint: string;
  payload: DecFilter;
  cbk?: Function;
  clear?: boolean;
}

/*
  * Filter
  *
  * Filter configuration
  */
export interface DecFilter {
  filterGroups?: FilterGroups;
  projectView?: any;
  sort?: any;
  page?: number;
  limit?: number;
  textSearch?: string;
}

/*
  * Filter
  *
  * Filter configuration
  */
export interface SerializedDecFilter {
  filter?: string;
  projectView?: string;
  sort?: string;
  page?: number;
  limit?: number;
  textSearch?: string;
}

/*
  * Filter
  *
  * Signle filter
  */
export class Filter {
  property: string;
  value: string | string[];

  constructor(data: any = {}) {
    this.property = data.property;
    this.value = Array.isArray(data.property) ? data.property : [data.property];
  }
}

/*
  * FilterGroup
  *
  * Group of Filter
  */
export interface FilterGroup {
  filters: Filters;
}

/*
  * ColumnsSortConfig
  *
  * Configuration to sort sort
  */
export interface ColumnsSortConfig {
  property: string;
  order: {
    type: 'asc' | 'desc'
  };
}

/*
  * QueryParams
  *
  * QueryParams to be used in GET requests
  */
export interface QueryParams {
  [key: string]: string | string[];
}
