import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export declare type CallOptions = {
    headers?: HttpHeaders;
    withCredentials?: boolean;
    params?: {
        [prop: string]: any;
    };
} & {
    [prop: string]: any;
};
export declare class DecSketchfabService {
    private http;
    constructor(http: HttpClient);
    pachConfigs(uid: string, configs: any): Observable<any>;
    getAllTextures(uid: string): Observable<any>;
    private handleError;
    private shareObservable(call);
}
