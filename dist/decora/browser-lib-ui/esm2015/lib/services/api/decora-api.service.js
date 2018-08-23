/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';
import { DecSnackBarService } from './../snack-bar/dec-snack-bar.service';
import { DecConfigurationService } from './../configuration/configuration.service';
export class DecApiService {
    /**
     * @param {?} http
     * @param {?} snackbar
     * @param {?} decConfig
     */
    constructor(http, snackbar, decConfig) {
        this.http = http;
        this.snackbar = snackbar;
        this.decConfig = decConfig;
        this.user$ = new BehaviorSubject(undefined);
        // ******************* //
        // PUBLIC AUTH METHODS //
        // ******************* //
        this.auth = (loginData) => {
            if (loginData) {
                const /** @type {?} */ endpoint = this.getResourceUrl('auth/signin');
                const /** @type {?} */ options = { headers: this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
                const /** @type {?} */ body = new HttpParams()
                    .set('username', loginData.email)
                    .set('password', loginData.password);
                return this.postMethod(endpoint, body, options)
                    .pipe(tap((res) => {
                    this.extratSessionToken(res),
                        this.user$.next(res);
                    return res;
                }));
            }
            else {
                return throwError({ status, notified: true, message: 'DECORA-API AUTH ERROR:: No credentials provided' });
            }
        };
        this.authFacebook = (loginData) => {
            if (loginData) {
                const /** @type {?} */ endpoint = this.getResourceUrl('auth/facebook/signin');
                const /** @type {?} */ options = { headers: this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
                const /** @type {?} */ body = new HttpParams()
                    .set('facebookToken', loginData.facebookToken)
                    .set('keepLogged', loginData.keepLogged.toString());
                return this.postMethod(endpoint, body, options)
                    .pipe(tap((res) => {
                    this.extratSessionToken(res),
                        this.user$.next(res);
                    return res;
                }));
            }
            else {
                return throwError({ status, notified: true, message: 'DECORA-API AUTH FACEBOOK ERROR:: No credentials provided' });
            }
        };
        this.logout = (redirectToLoginPage = true) => {
            const /** @type {?} */ endpoint = this.getResourceUrl('auth/signout');
            const /** @type {?} */ options = { headers: this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
            return this.postMethod(endpoint, {}, options)
                .pipe(tap((res) => {
                this.sessionToken = undefined;
                this.user$.next(res);
                if (redirectToLoginPage) {
                    this.goToLoginPage();
                }
                return res;
            }));
        };
        this.fetchCurrentLoggedUser = () => {
            const /** @type {?} */ endpoint = this.getResourceUrl('auth/account');
            const /** @type {?} */ options = { headers: this.newHeaderWithSessionToken() };
            return this.getMethod(endpoint, {}, options)
                .pipe(tap((res) => {
                this.extratSessionToken(res),
                    this.user$.next(res);
                return res;
            }));
        };
        // ******************* //
        // PUBLIC HTTP METHODS //
        // ******************* //
        this.get = (endpoint, search, options) => {
            const /** @type {?} */ endopintUrl = this.getResourceUrl(endpoint);
            const /** @type {?} */ params = this.transformDecFilterInParams(search);
            return this.getMethod(endopintUrl, params, options);
        };
        this.delete = (endpoint, options) => {
            const /** @type {?} */ endopintUrl = this.getResourceUrl(endpoint);
            return this.deleteMethod(endopintUrl, options);
        };
        this.patch = (endpoint, payload = {}, options) => {
            const /** @type {?} */ endopintUrl = this.getResourceUrl(endpoint);
            return this.patchMethod(endopintUrl, payload, options);
        };
        this.post = (endpoint, payload = {}, options) => {
            const /** @type {?} */ endopintUrl = this.getResourceUrl(endpoint);
            return this.postMethod(endopintUrl, payload, options);
        };
        this.put = (endpoint, payload = {}, options) => {
            const /** @type {?} */ endopintUrl = this.getResourceUrl(endpoint);
            return this.putMethod(endopintUrl, payload, options);
        };
        this.upsert = (endpoint, payload = {}, options) => {
            if (payload.id >= 0) {
                return this.put(endpoint, payload, options);
            }
            else {
                return this.post(endpoint, payload, options);
            }
        };
        this.handleError = (error) => {
            const /** @type {?} */ message = error.message;
            const /** @type {?} */ bodyMessage = (error && error.error) ? error.error.message : '';
            const /** @type {?} */ status = error.status;
            const /** @type {?} */ statusText = error.statusText;
            switch (error.status) {
                case 401:
                    if (this.decConfig.config.authHost) {
                        this.goToLoginPage();
                    }
                    break;
                case 409:
                    this.snackbar.open('message.http-status.409', 'error');
                    break;
            }
            return throwError({ status, statusText, message, bodyMessage });
        };
        this.subscribeToUser();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeToUser();
    }
    /**
     * @return {?}
     */
    get host() {
        return this.decConfig.config.api;
    }
    /**
     * @param {?} endpoint
     * @param {?} files
     * @param {?=} options
     * @return {?}
     */
    upload(endpoint, files, options = {}) {
        const /** @type {?} */ endopintUrl = this.getResourceUrl(endpoint);
        const /** @type {?} */ formData = this.createFilesFormData(files);
        options["reportProgress"] = true;
        options.headers = options.headers || new HttpHeaders();
        return this.requestMethod('POST', endopintUrl, formData, options);
    }
    /**
     * @return {?}
     */
    handShake() {
        return this.tryToLoadSignedInUser();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    transformDecFilterInParams(filter) {
        const /** @type {?} */ serializedFilter = {};
        if (filter) {
            if (filter.page) {
                serializedFilter.page = filter.page;
            }
            if (filter.limit) {
                serializedFilter.limit = filter.limit;
            }
            if (filter.filterGroups) {
                const /** @type {?} */ filterWithValueAsArray = this.getFilterWithValuesAsArray(filter.filterGroups);
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
    /**
     * @param {?} obj
     * @return {?}
     */
    filterObjectToQueryString(obj) {
        if (obj) {
            return JSON.stringify(obj);
        }
        else {
            return obj;
        }
    }
    /**
     * @param {?} filterGroups
     * @return {?}
     */
    getFilterWithValuesAsArray(filterGroups) {
        const /** @type {?} */ filterGroupCopy = JSON.parse(JSON.stringify(filterGroups)); // make a copy of the filter so we do not change the original filter
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
        }
        else {
            return filterGroups;
        }
    }
    /**
     * @template T
     * @param {?} url
     * @param {?=} search
     * @param {?=} options
     * @return {?}
     */
    getMethod(url, search = {}, options = {}) {
        options.params = search;
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        const /** @type {?} */ callObservable = this.http.get(url, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    }
    /**
     * @template T
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    patchMethod(url, body = {}, options = {}) {
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        const /** @type {?} */ callObservable = this.http.patch(url, body, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    }
    /**
     * @template T
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    postMethod(url, body, options = {}) {
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        const /** @type {?} */ callObservable = this.http.post(url, body, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    }
    /**
     * @template T
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    putMethod(url, body = {}, options = {}) {
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        const /** @type {?} */ callObservable = this.http.put(url, body, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    }
    /**
     * @template T
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    deleteMethod(url, options = {}) {
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        const /** @type {?} */ callObservable = this.http.delete(url, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    }
    /**
     * @template T
     * @param {?} type
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    requestMethod(type, url, body = {}, options = {}) {
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken(undefined, options.headers);
        const /** @type {?} */ req = new HttpRequest(type, url, body, options);
        const /** @type {?} */ callObservable = this.http.request(req)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    }
    /**
     * @param {?} files
     * @return {?}
     */
    createFilesFormData(files) {
        const /** @type {?} */ formData = new FormData();
        files.forEach((file, index) => {
            const /** @type {?} */ formItemName = index > 0 ? `file-${index}` : 'file';
            formData.append(formItemName, file, file.name);
        });
        return formData;
    }
    /**
     * @return {?}
     */
    goToLoginPage() {
        const /** @type {?} */ nakedAppDomain = window.location.href
            .replace('https://', '')
            .replace('http://', '')
            .replace(window.location.search, '');
        const /** @type {?} */ nakedAuthDomain = this.decConfig.config.authHost.split('?')[0]
            .replace('https://', '')
            .replace('http://', '')
            .replace('//', '');
        if (nakedAppDomain !== nakedAuthDomain) {
            const /** @type {?} */ authUrlWithRedirect = `${this.decConfig.config.authHost}${this.getParamsDivider()}redirectUrl=${window.location.href}`;
            console.log(`DecApiService:: Not authenticated. Redirecting to login page at: ${authUrlWithRedirect}`);
            window.location.href = authUrlWithRedirect;
        }
    }
    /**
     * @return {?}
     */
    getParamsDivider() {
        return this.decConfig.config.authHost.split('?').length > 1 ? '&' : '?';
    }
    /**
     * @return {?}
     */
    tryToLoadSignedInUser() {
        const /** @type {?} */ call = this.fetchCurrentLoggedUser().toPromise();
        call.then(account => {
            console.log(`DecoraApiService:: Initialized as ${account.name}`);
        }, err => {
            if (err.status === 401) {
                console.log('DecoraApiService:: Initialized as not logged');
            }
            else {
                console.error('DecoraApiService:: Initialization Error. Could retrieve user account', err);
            }
        });
        return call;
    }
    /**
     * @param {?=} type
     * @param {?=} headers
     * @return {?}
     */
    newHeaderWithSessionToken(type, headers) {
        headers = headers || new HttpHeaders();
        const /** @type {?} */ customizedContentType = headers.get('Content-Type');
        if (!customizedContentType && type) {
            headers = headers.set('Content-Type', type);
        }
        if (this.sessionToken) {
            headers = headers.set('X-Auth-Token', this.sessionToken);
        }
        return headers;
    }
    /**
     * @param {?} res
     * @return {?}
     */
    extratSessionToken(res) {
        this.sessionToken = res && res.session ? res.session.id : undefined;
        return res;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    getResourceUrl(path) {
        const /** @type {?} */ basePath = this.decConfig.config.useMockApi ? this.decConfig.config.mockApiHost : this.decConfig.config.api;
        path = path.replace(/^\/|\/$/g, '');
        return `${basePath}/${path}`;
    }
    /**
     * @return {?}
     */
    subscribeToUser() {
        this.userSubscripion = this.user$.subscribe(user => {
            this.user = user;
        });
    }
    /**
     * @return {?}
     */
    unsubscribeToUser() {
        this.userSubscripion.unsubscribe();
    }
    /**
     * @param {?} call
     * @return {?}
     */
    shareObservable(call) {
        return call.pipe(share());
    }
}
DecApiService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecApiService.ctorParameters = () => [
    { type: HttpClient },
    { type: DecSnackBarService },
    { type: DecConfigurationService }
];
function DecApiService_tsickle_Closure_declarations() {
    /** @type {?} */
    DecApiService.prototype.user;
    /** @type {?} */
    DecApiService.prototype.user$;
    /** @type {?} */
    DecApiService.prototype.sessionToken;
    /** @type {?} */
    DecApiService.prototype.userSubscripion;
    /** @type {?} */
    DecApiService.prototype.auth;
    /** @type {?} */
    DecApiService.prototype.authFacebook;
    /** @type {?} */
    DecApiService.prototype.logout;
    /** @type {?} */
    DecApiService.prototype.fetchCurrentLoggedUser;
    /** @type {?} */
    DecApiService.prototype.get;
    /** @type {?} */
    DecApiService.prototype.delete;
    /** @type {?} */
    DecApiService.prototype.patch;
    /** @type {?} */
    DecApiService.prototype.post;
    /** @type {?} */
    DecApiService.prototype.put;
    /** @type {?} */
    DecApiService.prototype.upsert;
    /** @type {?} */
    DecApiService.prototype.handleError;
    /** @type {?} */
    DecApiService.prototype.http;
    /** @type {?} */
    DecApiService.prototype.snackbar;
    /** @type {?} */
    DecApiService.prototype.decConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWFwaS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEYsT0FBTyxFQUFjLFVBQVUsRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBZW5GLE1BQU07Ozs7OztJQVVKLFlBQ1UsTUFDQSxVQUNBO1FBRkEsU0FBSSxHQUFKLElBQUk7UUFDSixhQUFRLEdBQVIsUUFBUTtRQUNSLGNBQVMsR0FBVCxTQUFTO3FCQVRvQixJQUFJLGVBQWUsQ0FBZSxTQUFTLENBQUM7Ozs7b0JBeUI1RSxDQUFDLFNBQW9CLEVBQUUsRUFBRTtZQUM5QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNkLHVCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNwRCx1QkFBTSxPQUFPLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLG1DQUFtQyxDQUFDLEVBQUUsQ0FBQztnQkFDakcsdUJBQU0sSUFBSSxHQUFHLElBQUksVUFBVSxFQUFFO3FCQUMxQixHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FB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QUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBRWxILElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVwQyxNQUFNLENBQUMsR0FBRyxRQUFRLElBQUksSUFBSSxFQUFFLENBQUM7Ozs7O0lBSXZCLGVBQWU7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNsQixDQUFDLENBQUM7Ozs7O0lBR0csaUJBQWlCO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7OztJQVc3QixlQUFlLENBQUMsSUFBcUI7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzs7OztZQXZaN0IsVUFBVTs7OztZQW5CRixVQUFVO1lBSVYsa0JBQWtCO1lBQ2xCLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcywgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgc2hhcmUsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFVzZXJBdXRoRGF0YSwgTG9naW5EYXRhLCBGYWNlYm9va0xvZ2luRGF0YSwgRGVjRmlsdGVyLCBTZXJpYWxpemVkRGVjRmlsdGVyIH0gZnJvbSAnLi9kZWNvcmEtYXBpLm1vZGVsJztcbmltcG9ydCB7IERlY1NuYWNrQmFyU2VydmljZSB9IGZyb20gJy4vLi4vc25hY2stYmFyL2RlYy1zbmFjay1iYXIuc2VydmljZSc7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vLi4vY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgdHlwZSBDYWxsT3B0aW9ucyA9IHtcbiAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xuICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICBwYXJhbXM/OiB7XG4gICAgW3Byb3A6IHN0cmluZ106IGFueTtcbiAgfTtcbn0gJiB7XG4gIFtwcm9wOiBzdHJpbmddOiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBIdHRwUmVxdWVzdFR5cGVzID0gJ0dFVCcgfCAnUE9TVCcgfCAnUFVUJyB8ICdQQVRDSCcgfCAnREVMRVRFJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0FwaVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHVzZXI6IFVzZXJBdXRoRGF0YTtcblxuICB1c2VyJDogQmVoYXZpb3JTdWJqZWN0PFVzZXJBdXRoRGF0YT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFVzZXJBdXRoRGF0YT4odW5kZWZpbmVkKTtcblxuICBwcml2YXRlIHNlc3Npb25Ub2tlbjogc3RyaW5nO1xuXG4gIHByaXZhdGUgdXNlclN1YnNjcmlwaW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgc25hY2tiYXI6IERlY1NuYWNrQmFyU2VydmljZSxcbiAgICBwcml2YXRlIGRlY0NvbmZpZzogRGVjQ29uZmlndXJhdGlvblNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaWJlVG9Vc2VyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9Vc2VyKCk7XG4gIH1cblxuICBnZXQgaG9zdCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNDb25maWcuY29uZmlnLmFwaTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gUFVCTElDIEFVVEggTUVUSE9EUyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIGF1dGggPSAobG9naW5EYXRhOiBMb2dpbkRhdGEpID0+IHtcbiAgICBpZiAobG9naW5EYXRhKSB7XG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvc2lnbmluJyk7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgICBjb25zdCBib2R5ID0gbmV3IEh0dHBQYXJhbXMoKVxuICAgICAgICAuc2V0KCd1c2VybmFtZScsIGxvZ2luRGF0YS5lbWFpbClcbiAgICAgICAgLnNldCgncGFzc3dvcmQnLCBsb2dpbkRhdGEucGFzc3dvcmQpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCBib2R5LCBvcHRpb25zKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBub3RpZmllZDogdHJ1ZSwgbWVzc2FnZTogJ0RFQ09SQS1BUEkgQVVUSCBFUlJPUjo6IE5vIGNyZWRlbnRpYWxzIHByb3ZpZGVkJyB9KTtcbiAgICB9XG4gIH1cblxuICBhdXRoRmFjZWJvb2sgPSAobG9naW5EYXRhOiBGYWNlYm9va0xvZ2luRGF0YSkgPT4ge1xuICAgIGlmIChsb2dpbkRhdGEpIHtcbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9mYWNlYm9vay9zaWduaW4nKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICAgIGNvbnN0IGJvZHkgPSBuZXcgSHR0cFBhcmFtcygpXG4gICAgICAgIC5zZXQoJ2ZhY2Vib29rVG9rZW4nLCBsb2dpbkRhdGEuZmFjZWJvb2tUb2tlbilcbiAgICAgICAgLnNldCgna2VlcExvZ2dlZCcsIGxvZ2luRGF0YS5rZWVwTG9nZ2VkLnRvU3RyaW5nKCkpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCBib2R5LCBvcHRpb25zKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBub3RpZmllZDogdHJ1ZSwgbWVzc2FnZTogJ0RFQ09SQS1BUEkgQVVUSCBGQUNFQk9PSyBFUlJPUjo6IE5vIGNyZWRlbnRpYWxzIHByb3ZpZGVkJyB9KTtcbiAgICB9XG4gIH1cblxuICBsb2dvdXQgPSAocmVkaXJlY3RUb0xvZ2luUGFnZSA9IHRydWUpID0+IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvc2lnbm91dCcpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kKGVuZHBvaW50LCB7fSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuc2Vzc2lvblRva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgIGlmIChyZWRpcmVjdFRvTG9naW5QYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmdvVG9Mb2dpblBhZ2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSkpO1xuICB9XG5cbiAgZmV0Y2hDdXJyZW50TG9nZ2VkVXNlciA9ICgpID0+IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvYWNjb3VudCcpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbigpIH07XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kPFVzZXJBdXRoRGF0YT4oZW5kcG9pbnQsIHt9LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBQVUJMSUMgSFRUUCBNRVRIT0RTIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgZ2V0ID0gPFQ+KGVuZHBvaW50LCBzZWFyY2g/OiBEZWNGaWx0ZXIsIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy50cmFuc2Zvcm1EZWNGaWx0ZXJJblBhcmFtcyhzZWFyY2gpO1xuICAgIHJldHVybiB0aGlzLmdldE1ldGhvZDxUPihlbmRvcGludFVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZSA9IDxUPihlbmRwb2ludCwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5kZWxldGVNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgcGF0Y2ggPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLnBhdGNoTWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3QgPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHV0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wdXRNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgdXBzZXJ0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgaWYgKHBheWxvYWQuaWQgPj0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KGVuZHBvaW50LCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChlbmRwb2ludCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgdXBsb2FkKGVuZHBvaW50OiBzdHJpbmcsIGZpbGVzOiBGaWxlW10sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5jcmVhdGVGaWxlc0Zvcm1EYXRhKGZpbGVzKTtcbiAgICBvcHRpb25zLnJlcG9ydFByb2dyZXNzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdE1ldGhvZCgnUE9TVCcsIGVuZG9waW50VXJsLCBmb3JtRGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuXG5cbiAgaGFuZFNoYWtlKCkge1xuICAgIHJldHVybiB0aGlzLnRyeVRvTG9hZFNpZ25lZEluVXNlcigpO1xuICB9XG4gIC8vICoqKioqKioqKioqKiAvL1xuICAvLyBQcml2YXRlIEhlbHBlciBNZXRob2RzIC8vXG4gIC8vICoqKioqKioqKioqKiAvL1xuICBwcml2YXRlIHRyYW5zZm9ybURlY0ZpbHRlckluUGFyYW1zKGZpbHRlcjogRGVjRmlsdGVyKTogU2VyaWFsaXplZERlY0ZpbHRlciB7XG5cbiAgICBjb25zdCBzZXJpYWxpemVkRmlsdGVyOiBTZXJpYWxpemVkRGVjRmlsdGVyID0ge307XG5cbiAgICBpZiAoZmlsdGVyKSB7XG5cbiAgICAgIGlmIChmaWx0ZXIucGFnZSkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnBhZ2UgPSBmaWx0ZXIucGFnZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5saW1pdCkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLmxpbWl0ID0gZmlsdGVyLmxpbWl0O1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLmZpbHRlckdyb3Vwcykge1xuICAgICAgICBjb25zdCBmaWx0ZXJXaXRoVmFsdWVBc0FycmF5ID0gdGhpcy5nZXRGaWx0ZXJXaXRoVmFsdWVzQXNBcnJheShmaWx0ZXIuZmlsdGVyR3JvdXBzKTtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5maWx0ZXIgPSB0aGlzLmZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcoZmlsdGVyV2l0aFZhbHVlQXNBcnJheSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIucHJvamVjdFZpZXcpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5wcm9qZWN0VmlldyA9IHRoaXMuZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhmaWx0ZXIucHJvamVjdFZpZXcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLnNvcnQpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5zb3J0ID0gdGhpcy5maWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKGZpbHRlci5zb3J0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci50ZXh0U2VhcmNoKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIudGV4dFNlYXJjaCA9IGZpbHRlci50ZXh0U2VhcmNoO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlcmlhbGl6ZWRGaWx0ZXI7XG5cbiAgfVxuXG4gIHByaXZhdGUgZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhvYmopIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEZpbHRlcldpdGhWYWx1ZXNBc0FycmF5KGZpbHRlckdyb3Vwcykge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWx0ZXJHcm91cHMpKTsgLy8gbWFrZSBhIGNvcHkgb2YgdGhlIGZpbHRlciBzbyB3ZSBkbyBub3QgY2hhbmdlIHRoZSBvcmlnaW5hbCBmaWx0ZXJcblxuICAgIGlmIChmaWx0ZXJHcm91cENvcHkpIHtcblxuICAgICAgcmV0dXJuIGZpbHRlckdyb3VwQ29weS5tYXAoZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMgPSBmaWx0ZXJHcm91cC5maWx0ZXJzLm1hcChmaWx0ZXIgPT4ge1xuXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGZpbHRlci52YWx1ZSkpIHtcbiAgICAgICAgICAgIGZpbHRlci52YWx1ZSA9IFtmaWx0ZXIudmFsdWVdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZpbHRlckdyb3VwO1xuXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiBmaWx0ZXJHcm91cHM7XG5cbiAgICB9XG4gIH1cblxuXG4gIC8vICoqKioqKioqKioqKiAvL1xuICAvLyBIdHRwIE1ldGhvZHMgLy9cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIHByaXZhdGUgZ2V0TWV0aG9kPFQ+KHVybDogc3RyaW5nLCBzZWFyY2ggPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy5wYXJhbXMgPSBzZWFyY2g7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAuZ2V0PFQ+KHVybCwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHBhdGNoTWV0aG9kPFQ+KHVybCwgYm9keSA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wYXRjaDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3N0TWV0aG9kPFQ+KHVybCwgYm9keT8sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnBvc3Q8VD4odXJsLCBib2R5LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcHV0TWV0aG9kPFQ+KHVybCwgYm9keSA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wdXQ8VD4odXJsLCBib2R5LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVsZXRlTWV0aG9kPFQ+KHVybDogc3RyaW5nLCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5kZWxldGU8VD4odXJsLCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdE1ldGhvZDxUPih0eXBlOiBIdHRwUmVxdWVzdFR5cGVzLCB1cmw6IHN0cmluZywgYm9keTogYW55ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4odW5kZWZpbmVkLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCh0eXBlLCB1cmwsIGJvZHksIG9wdGlvbnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnJlcXVlc3Q8VD4ocmVxKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAoZXJyb3I6IGFueSkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgIGNvbnN0IGJvZHlNZXNzYWdlID0gKGVycm9yICYmIGVycm9yLmVycm9yKSA/IGVycm9yLmVycm9yLm1lc3NhZ2UgOiAnJztcbiAgICBjb25zdCBzdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgY29uc3Qgc3RhdHVzVGV4dCA9IGVycm9yLnN0YXR1c1RleHQ7XG5cbiAgICBzd2l0Y2ggKGVycm9yLnN0YXR1cykge1xuICAgICAgY2FzZSA0MDE6XG4gICAgICAgIGlmICh0aGlzLmRlY0NvbmZpZy5jb25maWcuYXV0aEhvc3QpIHtcbiAgICAgICAgICB0aGlzLmdvVG9Mb2dpblBhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA0MDk6XG4gICAgICAgIHRoaXMuc25hY2tiYXIub3BlbignbWVzc2FnZS5odHRwLXN0YXR1cy40MDknLCAnZXJyb3InKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRocm93RXJyb3IoeyBzdGF0dXMsIHN0YXR1c1RleHQsIG1lc3NhZ2UsIGJvZHlNZXNzYWdlIH0pO1xuICB9XG5cbiAgLy8gKioqKioqKiAvL1xuICAvLyBIZWxwZXJzIC8vXG4gIC8vICoqKioqKiogLy9cblxuICBwcml2YXRlIGNyZWF0ZUZpbGVzRm9ybURhdGEoZmlsZXM6IEZpbGVbXSkge1xuICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZpbGVzLmZvckVhY2goKGZpbGUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBmb3JtSXRlbU5hbWUgPSBpbmRleCA+IDAgPyBgZmlsZS0ke2luZGV4fWAgOiAnZmlsZSc7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoZm9ybUl0ZW1OYW1lLCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub0xvZ2luUGFnZSgpIHtcbiAgICBjb25zdCBuYWtlZEFwcERvbWFpbiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgICAucmVwbGFjZSgnaHR0cHM6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKCdodHRwOi8vJywgJycpXG4gICAgICAucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uc2VhcmNoLCAnJyk7XG5cbiAgICBjb25zdCBuYWtlZEF1dGhEb21haW4gPSB0aGlzLmRlY0NvbmZpZy5jb25maWcuYXV0aEhvc3Quc3BsaXQoJz8nKVswXVxuICAgICAgLnJlcGxhY2UoJ2h0dHBzOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnaHR0cDovLycsICcnKVxuICAgICAgLnJlcGxhY2UoJy8vJywgJycpO1xuXG4gICAgaWYgKG5ha2VkQXBwRG9tYWluICE9PSBuYWtlZEF1dGhEb21haW4pIHtcbiAgICAgIGNvbnN0IGF1dGhVcmxXaXRoUmVkaXJlY3QgPSBgJHt0aGlzLmRlY0NvbmZpZy5jb25maWcuYXV0aEhvc3R9JHt0aGlzLmdldFBhcmFtc0RpdmlkZXIoKX1yZWRpcmVjdFVybD0ke3dpbmRvdy5sb2NhdGlvbi5ocmVmfWA7XG4gICAgICBjb25zb2xlLmxvZyhgRGVjQXBpU2VydmljZTo6IE5vdCBhdXRoZW50aWNhdGVkLiBSZWRpcmVjdGluZyB0byBsb2dpbiBwYWdlIGF0OiAke2F1dGhVcmxXaXRoUmVkaXJlY3R9YCk7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGF1dGhVcmxXaXRoUmVkaXJlY3Q7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXJhbXNEaXZpZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmRlY0NvbmZpZy5jb25maWcuYXV0aEhvc3Quc3BsaXQoJz8nKS5sZW5ndGggPiAxID8gJyYnIDogJz8nO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlUb0xvYWRTaWduZWRJblVzZXIoKSB7XG4gICAgY29uc3QgY2FsbCA9IHRoaXMuZmV0Y2hDdXJyZW50TG9nZ2VkVXNlcigpLnRvUHJvbWlzZSgpO1xuICAgIGNhbGwudGhlbihhY2NvdW50ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBEZWNvcmFBcGlTZXJ2aWNlOjogSW5pdGlhbGl6ZWQgYXMgJHthY2NvdW50Lm5hbWV9YCk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0RlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXplZCBhcyBub3QgbG9nZ2VkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdEZWNvcmFBcGlTZXJ2aWNlOjogSW5pdGlhbGl6YXRpb24gRXJyb3IuIENvdWxkIHJldHJpZXZlIHVzZXIgYWNjb3VudCcsIGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICBwcml2YXRlIG5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4odHlwZT86IHN0cmluZywgaGVhZGVycz86IEh0dHBIZWFkZXJzKSB7XG4gICAgaGVhZGVycyA9IGhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgY29uc3QgY3VzdG9taXplZENvbnRlbnRUeXBlID0gaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICghY3VzdG9taXplZENvbnRlbnRUeXBlICYmIHR5cGUpIHtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgdHlwZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlc3Npb25Ub2tlbikge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdYLUF1dGgtVG9rZW4nLCB0aGlzLnNlc3Npb25Ub2tlbik7XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYXRTZXNzaW9uVG9rZW4ocmVzKSB7XG4gICAgdGhpcy5zZXNzaW9uVG9rZW4gPSByZXMgJiYgcmVzLnNlc3Npb24gPyByZXMuc2Vzc2lvbi5pZCA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZXNvdXJjZVVybChwYXRoKSB7XG5cbiAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMuZGVjQ29uZmlnLmNvbmZpZy51c2VNb2NrQXBpID8gdGhpcy5kZWNDb25maWcuY29uZmlnLm1vY2tBcGlIb3N0IDogdGhpcy5kZWNDb25maWcuY29uZmlnLmFwaTtcblxuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC98XFwvJC9nLCAnJyk7XG5cbiAgICByZXR1cm4gYCR7YmFzZVBhdGh9LyR7cGF0aH1gO1xuXG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvVXNlcigpIHtcbiAgICB0aGlzLnVzZXJTdWJzY3JpcGlvbiA9IHRoaXMudXNlciQuc3Vic2NyaWJlKHVzZXIgPT4ge1xuICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb1VzZXIoKSB7XG4gICAgdGhpcy51c2VyU3Vic2NyaXBpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qXG4gICogU2hhcmUgT2JzZXJ2YWJsZVxuICAqXG4gICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBzaGFyZSB0aGUgYWN0dWFsIGRhdGEgdmFsdWVzIGFuZCBub3QganVzdCB0aGUgb2JzZXJ2YWJsZSBpbnN0YW5jZVxuICAqXG4gICogVG8gcmV1c2UgYSBzaW5nbGUsIGNvbW1vbiBzdHJlYW0gYW5kIGF2b2lkIG1ha2luZyBhbm90aGVyIHN1YnNjcmlwdGlvbiB0byB0aGUgc2VydmVyIHByb3ZpZGluZyB0aGF0IGRhdGEuXG4gICpcbiAgKi9cbiAgcHJpdmF0ZSBzaGFyZU9ic2VydmFibGUoY2FsbDogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgcmV0dXJuIGNhbGwucGlwZShzaGFyZSgpKTtcbiAgfVxufVxuIl19