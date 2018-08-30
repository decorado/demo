import { Injectable } from '@angular/core';
import { catchError, share, tap } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

export type CallOptions = {
  headers?: HttpHeaders;
  withCredentials?: boolean;
  params?: {
    [prop: string]: any;
  };
} & {
  [prop: string]: any;
};

@Injectable()
export class DecSketchfabService {

  constructor(private http: HttpClient) { }

  pachConfigs(uid: string, configs: any): Observable<any> {
    const options: CallOptions = {};
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    options.headers = headers;
    const url = 'https://api.sketchfab.com/v2/models/' + uid + '?token=b230fac2222243258a36619600ba78c1';
    const callObservable = this.http.patch(url, configs, options)
    .pipe(
      catchError(this.handleError)
    );
    return this.shareObservable(callObservable);
  }

  getAllTextures(uid: string): Observable<any> {
    const options: CallOptions = {};
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    options.headers = headers;
    const url = `https://sketchfab.com/i/models/${uid}/textures`;
    const callObservable = this.http.get(url, options)
    .pipe(
      catchError(this.handleError)
    );
    return this.shareObservable(callObservable);
  }

  private handleError = (error: any) => {
    const message = error.message;
    const bodyMessage = (error && error.error) ? error.error.message : '';
    const status = error.status;
    const statusText = error.statusText;
    return throwError({ status, statusText, message, bodyMessage });
  }

  private shareObservable(call: Observable<any>) {
    return call.pipe(share());
  }
}
