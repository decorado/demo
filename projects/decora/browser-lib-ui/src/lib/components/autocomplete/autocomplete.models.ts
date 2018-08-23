import { Observable } from 'rxjs';

export type LabelFunction = (item: any) => string;

export type ValueFunction = (item: any) => any;

export type CustomFetchFunction = (string: any) => Observable<any[]>;

export interface SelectionEvent {
  value: any;
  option: any;
  options: any[];
}
