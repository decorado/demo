import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subscription } from 'rxjs';
import { catchError, share, tap, finalize, debounceTime, switchMap, map } from 'rxjs/operators';
import { UserAuthData, LoginData, FacebookLoginData, DecFilter, SerializedDecFilter, QueryParams, DecApiGenericError, DecApiResponseError } from './decora-api.model';
import { DecConfigurationService } from './../configuration/configuration.service';
import { DecLanguageService } from './../language/dec-language.service';

export type CallOptions = {
  headers?: HttpHeaders;
  withCredentials?: boolean;
  params?: {
    [prop: string]: any;
  };
  loadingMessage?: string;
} & {
  [prop: string]: any;
};

export type HttpRequestTypes = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

@Injectable()
export class DecApiService implements OnDestroy {

  user: UserAuthData;

  user$: BehaviorSubject<UserAuthData> = new BehaviorSubject<UserAuthData>(undefined);

  loading$: Observable<boolean | string>;

  private sessionToken: string;

  private userSubscripion: Subscription;

  private loadingMap = {};

  private loadingStream$ = new BehaviorSubject<boolean | string>(undefined);

  constructor(
    private http: HttpClient,
    private decConfig: DecConfigurationService,
    private decLanguage: DecLanguageService
  ) {
    this.subscribeToUser();
    this.subscribeToLoading();
  }

  ngOnDestroy() {
    this.unsubscribeToUser();
  }

  get host() {
    return this.decConfig.config.api;
  }

  // ******************* //
  // PUBLIC AUTH METHODS //
  // ******************* //
  auth = (loginData: LoginData) => {
    if (loginData) {
      const endpoint = this.getResourceUrl('auth/signin');
      const options = { headers: this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
      const body = new HttpParams()
        .set('username', loginData.email)
        .set('password', loginData.password);
      return this.postMethod<UserAuthData>(endpoint, body, options)
        .pipe(
          tap((res) => {
            this.extractSessionToken(res),
              this.user$.next(res);
            return res;
          })
        );
    } else {
      return throwError({ status, notified: true, message: 'DECORA-API AUTH ERROR:: No credentials provided' });
    }
  }

  authFacebook = (loginData: FacebookLoginData) => {
    if (loginData) {
      const endpoint = this.getResourceUrl('auth/facebook/signin');
      const options = { headers: this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
      const body = new HttpParams()
        .set('facebookToken', loginData.facebookToken)
        .set('keepLogged', loginData.keepLogged.toString());
      return this.postMethod<UserAuthData>(endpoint, body, options)
        .pipe(
          tap((res) => {
            this.extractSessionToken(res),
              this.user$.next(res);
            return res;
          })
        );
    } else {
      return throwError({ status, notified: true, message: 'DECORA-API AUTH FACEBOOK ERROR:: No credentials provided' });
    }
  }

  logout = (redirectToLoginPage = true) => {
    const endpoint = this.getResourceUrl('auth/signout');
    const options = { headers: this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
    return this.postMethod(endpoint, {}, options)
      .pipe(
        tap((res) => {
          this.sessionToken = undefined;
          this.user$.next(res);
          if (redirectToLoginPage) {
            this.goToLoginPage();
          }
          return res;
        }));
  }

  // ******************* //
  // PUBLIC HTTP METHODS //
  // ******************* //
  get = <T>(endpoint, search?: DecFilter | QueryParams, options?: CallOptions) => {
    const endopintUrl = this.getResourceUrl(endpoint);

    let params = search;

    if (search && search['filterGroups']) {

      params = this.transformDecFilterInParams(search);

    }

    return this.getMethod<T>(endopintUrl, params, options);
  }

  delete = <T>(endpoint, options?: CallOptions) => {
    const endopintUrl = this.getResourceUrl(endpoint);
    return this.deleteMethod<T>(endopintUrl, options);
  }

  patch = <T>(endpoint, payload: any = {}, options?: CallOptions) => {
    const endopintUrl = this.getResourceUrl(endpoint);
    return this.patchMethod<T>(endopintUrl, payload, options);
  }

  post = <T>(endpoint, payload: any = {}, options?: CallOptions) => {
    const endopintUrl = this.getResourceUrl(endpoint);
    return this.postMethod<T>(endopintUrl, payload, options);
  }

  put = <T>(endpoint, payload: any = {}, options?: CallOptions) => {
    const endopintUrl = this.getResourceUrl(endpoint);
    return this.putMethod<T>(endopintUrl, payload, options);
  }

  upsert = <T>(endpoint, payload: any = {}, options?: CallOptions) => {
    if (payload.id >= 0) {
      return this.put(endpoint, payload, options);
    } else {
      return this.post(endpoint, payload, options);
    }
  }

  upload(endpoint: string, files: File[], options: CallOptions = {}) {
    const endopintUrl = this.getResourceUrl(endpoint);
    const formData = this.createFilesFormData(files);
    options.reportProgress = true;
    options.headers = options.headers || new HttpHeaders();
    return this.requestMethod('POST', endopintUrl, formData, options);
  }

  // used by DecAppInitializer
  handShake() {
    return this.tryToLoadSignedInUser();
  }

  getResourceUrl(path = '') {

    const basePath = this.decConfig.config.useMockApi ? this.decConfig.config.mockApiHost : this.decConfig.config.api;

    path = path.replace(/^\/|\/$/g, '');

    return `${basePath}/${path}`;

  }

  // ************ //
  // Http Methods //
  // ************ //
  private getMethod<T>(url: string, search: any = {}, options: CallOptions = {}): Observable<any> {
    const uuid = this.startLoading(options.loadingMessage);
    options.params = search;
    options.withCredentials = true;
    options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
    const callObservable = this.http.get<T>(url, options)
      .pipe(
        tap(this.handleSuccess),
        finalize(() => this.stopLoading(uuid)),
        catchError(this.handleError)
      );
    return this.shareObservable(callObservable);
  }

  private patchMethod<T>(url, body = {}, options: CallOptions = {}): Observable<any> {
    const uuid = this.startLoading(options.loadingMessage);
    options.withCredentials = true;
    options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
    const callObservable = this.http.patch<T>(url, body, options)
      .pipe(
        tap(this.handleSuccess),
        finalize(() => this.stopLoading(uuid)),
        catchError(this.handleError)
      );
    return this.shareObservable(callObservable);
  }

  private postMethod<T>(url, body?, options: CallOptions = {}): Observable<any> {
    const uuid = this.startLoading(options.loadingMessage);
    options.withCredentials = true;
    options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
    const callObservable = this.http.post<T>(url, body, options)
      .pipe(
        tap(this.handleSuccess),
        finalize(() => this.stopLoading(uuid)),
        catchError(this.handleError)
      );
    return this.shareObservable(callObservable);
  }

  private putMethod<T>(url, body = {}, options: CallOptions = {}): Observable<any> {
    const uuid = this.startLoading(options.loadingMessage);
    options.withCredentials = true;
    options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
    const callObservable = this.http.put<T>(url, body, options)
      .pipe(
        tap(this.handleSuccess),
        finalize(() => this.stopLoading(uuid)),
        catchError(this.handleError)
      );
    return this.shareObservable(callObservable);
  }

  private deleteMethod<T>(url: string, options: CallOptions = {}): Observable<any> {
    const uuid = this.startLoading(options.loadingMessage);
    options.withCredentials = true;
    options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
    const callObservable = this.http.delete<T>(url, options)
      .pipe(
        tap(this.handleSuccess),
        finalize(() => this.stopLoading(uuid)),
        catchError(this.handleError)
      );
    return this.shareObservable(callObservable);
  }

  private requestMethod<T>(type: HttpRequestTypes, url: string, body: any = {}, options: CallOptions = {}): Observable<any> {
    const uuid = this.startLoading(options.loadingMessage);
    options.withCredentials = true;
    options.headers = this.newHeaderWithSessionToken(undefined, options.headers);
    const req = new HttpRequest(type, url, body, options);
    const callObservable = this.http.request<T>(req)
      .pipe(
        tap(this.handleSuccess),
        finalize(() => this.stopLoading(uuid)),
        catchError(this.handleError)
      );
    return this.shareObservable(callObservable);
  }

  private handleSuccess = (res) => {

    if (res && res.status === 207) { // multiple errors returned in batch requests

      const errors = this.extractBulkOperationErrors(res);

      if (errors && errors.length) {

        res.operations = errors;

        throw res;

      } else {

        return res;

      }

    } else {

      return res;

    }

  }

  private handleError = (err: any) => {

    const message = err.message;
    const bodyMessage = (err && err.error) ? err.error.message : '';
    const bodyError = err.error;
    const status = err.status;
    const timestamp = err.timestamp;
    const statusText = err.statusText;
    const parsedError = (err.error && err.error.errors) ? err.error.errors : [{ status, timestamp, error: statusText, message }];
    const errors: DecApiGenericError[] = status === 207 ? err.operations : parsedError;

    const persedErrorResponse: DecApiResponseError = { status, statusText, message, bodyMessage, bodyError, errors };

    switch (err.status) {
      case 401:
        if (this.decConfig.config.authHost) {
          this.goToLoginPage();
        }
    }

    return throwError(persedErrorResponse);
  }

  private extractBulkOperationErrors(res) {

    return res.operations.filter(operation => !(operation.status >= 200 && operation.status < 300));

  }

  // ******* //
  // Helpers //
  // ******* //

  private startLoading = (msg: string | boolean = true) => {

    const uuid = Math.random().toString(26).slice(2) + Date.now();

    this.loadingMap[uuid] = msg || true;

    this.emitLoading();

    return uuid;

  }

  private stopLoading = (uuid) => {

    if (this.loadingMap[uuid]) {

      delete this.loadingMap[uuid];

    }

    this.emitLoading();

  }

  private emitLoading = () => {
    const keys = Object.keys(this.loadingMap);
    const hasLoading = keys.length > 0;
    const loadingMessage = this.loadingMap[keys[0]];
    this.loadingStream$.next(hasLoading ? loadingMessage : false);
  }

  private fetchCurrentLoggedUser = () => {
    const endpoint = this.getResourceUrl('auth/account');
    const options = { headers: this.newHeaderWithSessionToken() };
    return this.getMethod<UserAuthData>(endpoint, {}, options)
      .pipe(
        tap(this.extractSessionToken),
        switchMap(this.fetchUserProfile),
      );
  }

  private fetchUserProfile = (account) => {
    const endpoint = this.getResourceUrl(`accounts/${account.id}/profile`);
    const options = { headers: this.newHeaderWithSessionToken() };
    return this.getMethod<UserAuthData>(endpoint, {}, options)
      .pipe(
        map(profile => {
          const user = {
            ...account,
            ... profile,
          };
          return user;
        }),
        tap(user => {
          this.user$.next(user);
        })
      );
  }

  //

  private transformDecFilterInParams(filter: DecFilter): SerializedDecFilter {

    const serializedFilter: SerializedDecFilter = {};

    if (filter) {

      if (filter.page) {
        serializedFilter.page = filter.page;
      }

      if (filter.limit) {
        serializedFilter.limit = filter.limit;
      }

      if (filter.filterGroups) {
        const filterWithValueAsArray = this.getFilterWithValuesAsArray(filter.filterGroups);
        serializedFilter.filter = this.filterObjectToQueryString(filterWithValueAsArray);
      }

      if (filter.projectView) {
        serializedFilter.projectView = this.filterObjectToQueryString(filter.projectView);
      }

      if (filter.sort) {
        serializedFilter.sort = this.filterObjectToQueryString(filter.sort);
      }

      if (filter.textSearch) {
        serializedFilter.textSearch = filter.textSearch;
      }

    }

    return serializedFilter;

  }

  private filterObjectToQueryString(obj) {
    if (obj) {
      return JSON.stringify(obj);
    } else {
      return obj;
    }
  }

  private getFilterWithValuesAsArray(filterGroups) {

    const filterGroupCopy = JSON.parse(JSON.stringify(filterGroups)); // make a copy of the filter so we do not change the original filter

    if (filterGroupCopy) {

      return filterGroupCopy.map(filterGroup => {

        filterGroup.filters = filterGroup.filters.map(filter => {

          if (!Array.isArray(filter.value)) {
            filter.value = [filter.value];
          }

          return filter;

        });

        return filterGroup;

      });

    } else {

      return filterGroups;

    }
  }

  private createFilesFormData(files: File[]) {
    const formData: FormData = new FormData();
    files.forEach((file, index) => {
      const formItemName = index > 0 ? `file-${index}` : 'file';
      formData.append(formItemName, file, file.name);
    });
    return formData;
  }

  private goToLoginPage() {
    const nakedAppDomain = window.location.href
      .replace('https://', '')
      .replace('http://', '')
      .replace(window.location.search, '');

    const nakedAuthDomain = this.decConfig.config.authHost.split('?')[0]
      .replace('https://', '')
      .replace('http://', '')
      .replace('//', '');

    if (nakedAppDomain !== nakedAuthDomain) {
      const authUrlWithRedirect = `${this.decConfig.config.authHost}${this.getParamsDivider()}redirectUrl=${window.location.href}`;
      console.log(`DecApiService:: Not authenticated. Redirecting to login page at: ${authUrlWithRedirect}`);
      window.location.href = authUrlWithRedirect;
    }
  }

  private getParamsDivider() {
    return this.decConfig.config.authHost.split('?').length > 1 ? '&' : '?';
  }

  private tryToLoadSignedInUser() {

    const call = this.fetchCurrentLoggedUser().toPromise();

    call.then(account => {
      console.log(`DecoraApiService:: Initialized as ${account.name}`);
    }, err => {
      if (err.status === 401) {
        console.log('DecoraApiService:: Initialized as not logged');
      } else {
        console.error('DecoraApiService:: Initialization Error. Could retrieve user account', err);
      }
    });
    return call;
  }

  private newHeaderWithSessionToken(type?: string, headers?: HttpHeaders) {
    headers = headers || new HttpHeaders();
    const customizedContentType = headers.get('Content-Type');
    if (!customizedContentType && type) {
      headers = headers.set('Content-Type', type);
    }
    if (this.sessionToken) {
      headers = headers.set('X-Auth-Token', this.sessionToken);
    }
    return headers;
  }

  private extractSessionToken = (account) => {
    this.sessionToken = account && account.session ? account.session.id : undefined;
  }

  private subscribeToUser() {
    this.userSubscripion = this.user$.subscribe(user => {
      if (user) {
        this.decLanguage.setLanguage(user.i18n);
      }
      this.user = user;
    });
  }

  private unsubscribeToUser() {
    this.userSubscripion.unsubscribe();
  }


  private subscribeToLoading() {
    this.loading$ = this.loadingStream$.pipe(debounceTime(100));
  }

  /*
  * Share Observable
  *
  * This method is used to share the actual data values and not just the observable instance
  *
  * To reuse a single, common stream and avoid making another subscription to the server providing that data.
  *
  */
  private shareObservable(call: Observable<any>) {
    return call.pipe(share());
  }
}
