import { Observable } from 'rxjs';
export declare type LabelFunction = (item: any) => string;
export declare type ValueFunction = (item: any) => any;
export declare type CustomFetchFunction = (string: any) => Observable<any[]>;
export interface SelectionEvent {
    value: any;
    option: any;
    options: any[];
    filteredOptions: any[];
}
