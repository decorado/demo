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
var DecApiService = /** @class */ (function () {
    function DecApiService(http, snackbar, decConfig) {
        var _this = this;
        this.http = http;
        this.snackbar = snackbar;
        this.decConfig = decConfig;
        this.user$ = new BehaviorSubject(undefined);
        // ******************* //
        // PUBLIC AUTH METHODS //
        // ******************* //
        this.auth = function (loginData) {
            if (loginData) {
                var /** @type {?} */ endpoint = _this.getResourceUrl('auth/signin');
                var /** @type {?} */ options = { headers: _this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
                var /** @type {?} */ body = new HttpParams()
                    .set('username', loginData.email)
                    .set('password', loginData.password);
                return _this.postMethod(endpoint, body, options)
                    .pipe(tap(function (res) {
                    _this.extratSessionToken(res),
                        _this.user$.next(res);
                    return res;
                }));
            }
            else {
                return throwError({ status: status, notified: true, message: 'DECORA-API AUTH ERROR:: No credentials provided' });
            }
        };
        this.authFacebook = function (loginData) {
            if (loginData) {
                var /** @type {?} */ endpoint = _this.getResourceUrl('auth/facebook/signin');
                var /** @type {?} */ options = { headers: _this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
                var /** @type {?} */ body = new HttpParams()
                    .set('facebookToken', loginData.facebookToken)
                    .set('keepLogged', loginData.keepLogged.toString());
                return _this.postMethod(endpoint, body, options)
                    .pipe(tap(function (res) {
                    _this.extratSessionToken(res),
                        _this.user$.next(res);
                    return res;
                }));
            }
            else {
                return throwError({ status: status, notified: true, message: 'DECORA-API AUTH FACEBOOK ERROR:: No credentials provided' });
            }
        };
        this.logout = function (redirectToLoginPage) {
            if (redirectToLoginPage === void 0) { redirectToLoginPage = true; }
            var /** @type {?} */ endpoint = _this.getResourceUrl('auth/signout');
            var /** @type {?} */ options = { headers: _this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
            return _this.postMethod(endpoint, {}, options)
                .pipe(tap(function (res) {
                _this.sessionToken = undefined;
                _this.user$.next(res);
                if (redirectToLoginPage) {
                    _this.goToLoginPage();
                }
                return res;
            }));
        };
        this.fetchCurrentLoggedUser = function () {
            var /** @type {?} */ endpoint = _this.getResourceUrl('auth/account');
            var /** @type {?} */ options = { headers: _this.newHeaderWithSessionToken() };
            return _this.getMethod(endpoint, {}, options)
                .pipe(tap(function (res) {
                _this.extratSessionToken(res),
                    _this.user$.next(res);
                return res;
            }));
        };
        // ******************* //
        // PUBLIC HTTP METHODS //
        // ******************* //
        this.get = function (endpoint, search, options) {
            var /** @type {?} */ endopintUrl = _this.getResourceUrl(endpoint);
            var /** @type {?} */ params = _this.transformDecFilterInParams(search);
            return _this.getMethod(endopintUrl, params, options);
        };
        this.delete = function (endpoint, options) {
            var /** @type {?} */ endopintUrl = _this.getResourceUrl(endpoint);
            return _this.deleteMethod(endopintUrl, options);
        };
        this.patch = function (endpoint, payload, options) {
            if (payload === void 0) { payload = {}; }
            var /** @type {?} */ endopintUrl = _this.getResourceUrl(endpoint);
            return _this.patchMethod(endopintUrl, payload, options);
        };
        this.post = function (endpoint, payload, options) {
            if (payload === void 0) { payload = {}; }
            var /** @type {?} */ endopintUrl = _this.getResourceUrl(endpoint);
            return _this.postMethod(endopintUrl, payload, options);
        };
        this.put = function (endpoint, payload, options) {
            if (payload === void 0) { payload = {}; }
            var /** @type {?} */ endopintUrl = _this.getResourceUrl(endpoint);
            return _this.putMethod(endopintUrl, payload, options);
        };
        this.upsert = function (endpoint, payload, options) {
            if (payload === void 0) { payload = {}; }
            if (payload.id >= 0) {
                return _this.put(endpoint, payload, options);
            }
            else {
                return _this.post(endpoint, payload, options);
            }
        };
        this.handleError = function (error) {
            var /** @type {?} */ message = error.message;
            var /** @type {?} */ bodyMessage = (error && error.error) ? error.error.message : '';
            var /** @type {?} */ status = error.status;
            var /** @type {?} */ statusText = error.statusText;
            switch (error.status) {
                case 401:
                    if (_this.decConfig.config.authHost) {
                        _this.goToLoginPage();
                    }
                    break;
                case 409:
                    _this.snackbar.open('message.http-status.409', 'error');
                    break;
            }
            return throwError({ status: status, statusText: statusText, message: message, bodyMessage: bodyMessage });
        };
        this.subscribeToUser();
        this.tryToLoadSignedInUser();
    }
    /**
     * @return {?}
     */
    DecApiService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeToUser();
    };
    Object.defineProperty(DecApiService.prototype, "host", {
        get: /**
         * @return {?}
         */
        function () {
            return this.decConfig.config.api;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} endpoint
     * @param {?} files
     * @param {?=} options
     * @return {?}
     */
    DecApiService.prototype.upload = /**
     * @param {?} endpoint
     * @param {?} files
     * @param {?=} options
     * @return {?}
     */
    function (endpoint, files, options) {
        if (options === void 0) { options = {}; }
        var /** @type {?} */ endopintUrl = this.getResourceUrl(endpoint);
        var /** @type {?} */ formData = this.createFilesFormData(files);
        options["reportProgress"] = true;
        options.headers = options.headers || new HttpHeaders();
        return this.requestMethod('POST', endopintUrl, formData, options);
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    DecApiService.prototype.transformDecFilterInParams = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        var /** @type {?} */ serializedFilter = {};
        if (filter) {
            if (filter.page) {
                serializedFilter.page = filter.page;
            }
            if (filter.limit) {
                serializedFilter.limit = filter.limit;
            }
            if (filter.filterGroups) {
                var /** @type {?} */ filterWithValueAsArray = this.getFilterWithValuesAsArray(filter.filterGroups);
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
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    DecApiService.prototype.filterObjectToQueryString = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (obj) {
            return JSON.stringify(obj);
        }
        else {
            return obj;
        }
    };
    /**
     * @param {?} filterGroups
     * @return {?}
     */
    DecApiService.prototype.getFilterWithValuesAsArray = /**
     * @param {?} filterGroups
     * @return {?}
     */
    function (filterGroups) {
        var /** @type {?} */ filterGroupCopy = JSON.parse(JSON.stringify(filterGroups)); // make a copy of the filter so we do not change the original filter
        if (filterGroupCopy) {
            return filterGroupCopy.map(function (filterGroup) {
                filterGroup.filters = filterGroup.filters.map(function (filter) {
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
    };
    /**
     * @template T
     * @param {?} url
     * @param {?=} search
     * @param {?=} options
     * @return {?}
     */
    DecApiService.prototype.getMethod = /**
     * @template T
     * @param {?} url
     * @param {?=} search
     * @param {?=} options
     * @return {?}
     */
    function (url, search, options) {
        if (search === void 0) { search = {}; }
        if (options === void 0) { options = {}; }
        options.params = search;
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        var /** @type {?} */ callObservable = this.http.get(url, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    };
    /**
     * @template T
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    DecApiService.prototype.patchMethod = /**
     * @template T
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    function (url, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        var /** @type {?} */ callObservable = this.http.patch(url, body, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    };
    /**
     * @template T
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    DecApiService.prototype.postMethod = /**
     * @template T
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    function (url, body, options) {
        if (options === void 0) { options = {}; }
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        var /** @type {?} */ callObservable = this.http.post(url, body, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    };
    /**
     * @template T
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    DecApiService.prototype.putMethod = /**
     * @template T
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    function (url, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        var /** @type {?} */ callObservable = this.http.put(url, body, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    };
    /**
     * @template T
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    DecApiService.prototype.deleteMethod = /**
     * @template T
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    function (url, options) {
        if (options === void 0) { options = {}; }
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        var /** @type {?} */ callObservable = this.http.delete(url, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    };
    /**
     * @template T
     * @param {?} type
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    DecApiService.prototype.requestMethod = /**
     * @template T
     * @param {?} type
     * @param {?} url
     * @param {?=} body
     * @param {?=} options
     * @return {?}
     */
    function (type, url, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken(undefined, options.headers);
        var /** @type {?} */ req = new HttpRequest(type, url, body, options);
        var /** @type {?} */ callObservable = this.http.request(req)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    };
    /**
     * @param {?} files
     * @return {?}
     */
    DecApiService.prototype.createFilesFormData = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        var /** @type {?} */ formData = new FormData();
        files.forEach(function (file, index) {
            var /** @type {?} */ formItemName = index > 0 ? "file-" + index : 'file';
            formData.append(formItemName, file, file.name);
        });
        return formData;
    };
    /**
     * @return {?}
     */
    DecApiService.prototype.goToLoginPage = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ nakedAppDomain = window.location.href
            .replace('https://', '')
            .replace('http://', '')
            .replace(window.location.search, '');
        var /** @type {?} */ nakedAuthDomain = this.decConfig.config.authHost.split('?')[0]
            .replace('https://', '')
            .replace('http://', '')
            .replace('//', '');
        if (nakedAppDomain !== nakedAuthDomain) {
            var /** @type {?} */ authUrlWithRedirect = "" + this.decConfig.config.authHost + this.getParamsDivider() + "redirectUrl=" + window.location.href;
            console.log("DecApiService:: Not authenticated. Redirecting to login page at: " + authUrlWithRedirect);
            window.location.href = authUrlWithRedirect;
        }
    };
    /**
     * @return {?}
     */
    DecApiService.prototype.getParamsDivider = /**
     * @return {?}
     */
    function () {
        return this.decConfig.config.authHost.split('?').length > 1 ? '&' : '?';
    };
    /**
     * @return {?}
     */
    DecApiService.prototype.tryToLoadSignedInUser = /**
     * @return {?}
     */
    function () {
        this.fetchCurrentLoggedUser()
            .toPromise()
            .then(function (res) {
            console.log('DecoraApiService:: Initialized as logged');
        }, function (err) {
            if (err.status === 401) {
                console.log('DecoraApiService:: Initialized as not logged');
            }
            else {
                console.error('DecoraApiService:: Initialization Error. Could retrieve user account', err);
            }
        });
    };
    /**
     * @param {?=} type
     * @param {?=} headers
     * @return {?}
     */
    DecApiService.prototype.newHeaderWithSessionToken = /**
     * @param {?=} type
     * @param {?=} headers
     * @return {?}
     */
    function (type, headers) {
        headers = headers || new HttpHeaders();
        var /** @type {?} */ customizedContentType = headers.get('Content-Type');
        if (!customizedContentType && type) {
            headers = headers.set('Content-Type', type);
        }
        if (this.sessionToken) {
            headers = headers.set('X-Auth-Token', this.sessionToken);
        }
        return headers;
    };
    /**
     * @param {?} res
     * @return {?}
     */
    DecApiService.prototype.extratSessionToken = /**
     * @param {?} res
     * @return {?}
     */
    function (res) {
        this.sessionToken = res && res.session ? res.session.id : undefined;
        return res;
    };
    /**
     * @param {?} path
     * @return {?}
     */
    DecApiService.prototype.getResourceUrl = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        var /** @type {?} */ basePath = this.decConfig.config.useMockApi ? this.decConfig.config.mockApiHost : this.decConfig.config.api;
        path = path.replace(/^\/|\/$/g, '');
        return basePath + "/" + path;
    };
    /**
     * @return {?}
     */
    DecApiService.prototype.subscribeToUser = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.userSubscripion = this.user$.subscribe(function (user) {
            _this.user = user;
        });
    };
    /**
     * @return {?}
     */
    DecApiService.prototype.unsubscribeToUser = /**
     * @return {?}
     */
    function () {
        this.userSubscripion.unsubscribe();
    };
    /**
     * @param {?} call
     * @return {?}
     */
    DecApiService.prototype.shareObservable = /**
     * @param {?} call
     * @return {?}
     */
    function (call) {
        return call.pipe(share());
    };
    DecApiService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecApiService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: DecSnackBarService },
        { type: DecConfigurationService }
    ]; };
    return DecApiService;
}());
export { DecApiService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWFwaS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEYsT0FBTyxFQUFjLFVBQVUsRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztJQXlCakYsdUJBQ1UsTUFDQSxVQUNBO1FBSFYsaUJBT0M7UUFOUyxTQUFJLEdBQUosSUFBSTtRQUNKLGFBQVEsR0FBUixRQUFRO1FBQ1IsY0FBUyxHQUFULFNBQVM7cUJBVG9CLElBQUksZUFBZSxDQUFlLFNBQVMsQ0FBQzs7OztvQkEwQjVFLFVBQUMsU0FBb0I7WUFDMUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDZCxxQkFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDcEQscUJBQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pHLHFCQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTtxQkFDMUIsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFD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QUFDLENBQUMsU0FBUyxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxHQUFHLENBQUM7Ozs7OztJQUdMLHNDQUFjOzs7O2NBQUMsSUFBSTtRQUV6QixxQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUVsSCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFcEMsTUFBTSxDQUFJLFFBQVEsU0FBSSxJQUFNLENBQUM7Ozs7O0lBSXZCLHVDQUFlOzs7OztRQUNyQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUM5QyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNsQixDQUFDLENBQUM7Ozs7O0lBR0cseUNBQWlCOzs7O1FBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7OztJQVc3Qix1Q0FBZTs7OztjQUFDLElBQXFCO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7OztnQkFwWjdCLFVBQVU7Ozs7Z0JBbkJGLFVBQVU7Z0JBSVYsa0JBQWtCO2dCQUNsQix1QkFBdUI7O3dCQU5oQzs7U0FxQmEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcywgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgc2hhcmUsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFVzZXJBdXRoRGF0YSwgTG9naW5EYXRhLCBGYWNlYm9va0xvZ2luRGF0YSwgRGVjRmlsdGVyLCBTZXJpYWxpemVkRGVjRmlsdGVyIH0gZnJvbSAnLi9kZWNvcmEtYXBpLm1vZGVsJztcbmltcG9ydCB7IERlY1NuYWNrQmFyU2VydmljZSB9IGZyb20gJy4vLi4vc25hY2stYmFyL2RlYy1zbmFjay1iYXIuc2VydmljZSc7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vLi4vY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgdHlwZSBDYWxsT3B0aW9ucyA9IHtcbiAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xuICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICBwYXJhbXM/OiB7XG4gICAgW3Byb3A6IHN0cmluZ106IGFueTtcbiAgfTtcbn0gJiB7XG4gIFtwcm9wOiBzdHJpbmddOiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBIdHRwUmVxdWVzdFR5cGVzID0gJ0dFVCcgfCAnUE9TVCcgfCAnUFVUJyB8ICdQQVRDSCcgfCAnREVMRVRFJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0FwaVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHVzZXI6IFVzZXJBdXRoRGF0YTtcblxuICB1c2VyJDogQmVoYXZpb3JTdWJqZWN0PFVzZXJBdXRoRGF0YT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFVzZXJBdXRoRGF0YT4odW5kZWZpbmVkKTtcblxuICBwcml2YXRlIHNlc3Npb25Ub2tlbjogc3RyaW5nO1xuXG4gIHByaXZhdGUgdXNlclN1YnNjcmlwaW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgc25hY2tiYXI6IERlY1NuYWNrQmFyU2VydmljZSxcbiAgICBwcml2YXRlIGRlY0NvbmZpZzogRGVjQ29uZmlndXJhdGlvblNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaWJlVG9Vc2VyKCk7XG4gICAgdGhpcy50cnlUb0xvYWRTaWduZWRJblVzZXIoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUb1VzZXIoKTtcbiAgfVxuXG4gIGdldCBob3N0KCkge1xuICAgIHJldHVybiB0aGlzLmRlY0NvbmZpZy5jb25maWcuYXBpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBQVUJMSUMgQVVUSCBNRVRIT0RTIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgYXV0aCA9IChsb2dpbkRhdGE6IExvZ2luRGF0YSkgPT4ge1xuICAgIGlmIChsb2dpbkRhdGEpIHtcbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9zaWduaW4nKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICAgIGNvbnN0IGJvZHkgPSBuZXcgSHR0cFBhcmFtcygpXG4gICAgICAgIC5zZXQoJ3VzZXJuYW1lJywgbG9naW5EYXRhLmVtYWlsKVxuICAgICAgICAuc2V0KCdwYXNzd29yZCcsIGxvZ2luRGF0YS5wYXNzd29yZCk7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kPFVzZXJBdXRoRGF0YT4oZW5kcG9pbnQsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4dHJhdFNlc3Npb25Ub2tlbihyZXMpLFxuICAgICAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoeyBzdGF0dXMsIG5vdGlmaWVkOiB0cnVlLCBtZXNzYWdlOiAnREVDT1JBLUFQSSBBVVRIIEVSUk9SOjogTm8gY3JlZGVudGlhbHMgcHJvdmlkZWQnIH0pO1xuICAgIH1cbiAgfVxuXG4gIGF1dGhGYWNlYm9vayA9IChsb2dpbkRhdGE6IEZhY2Vib29rTG9naW5EYXRhKSA9PiB7XG4gICAgaWYgKGxvZ2luRGF0YSkge1xuICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL2ZhY2Vib29rL3NpZ25pbicpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgaGVhZGVyczogdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB9O1xuICAgICAgY29uc3QgYm9keSA9IG5ldyBIdHRwUGFyYW1zKClcbiAgICAgICAgLnNldCgnZmFjZWJvb2tUb2tlbicsIGxvZ2luRGF0YS5mYWNlYm9va1Rva2VuKVxuICAgICAgICAuc2V0KCdrZWVwTG9nZ2VkJywgbG9naW5EYXRhLmtlZXBMb2dnZWQudG9TdHJpbmcoKSk7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kPFVzZXJBdXRoRGF0YT4oZW5kcG9pbnQsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4dHJhdFNlc3Npb25Ub2tlbihyZXMpLFxuICAgICAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoeyBzdGF0dXMsIG5vdGlmaWVkOiB0cnVlLCBtZXNzYWdlOiAnREVDT1JBLUFQSSBBVVRIIEZBQ0VCT09LIEVSUk9SOjogTm8gY3JlZGVudGlhbHMgcHJvdmlkZWQnIH0pO1xuICAgIH1cbiAgfVxuXG4gIGxvZ291dCA9IChyZWRpcmVjdFRvTG9naW5QYWdlID0gdHJ1ZSkgPT4ge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9zaWdub3V0Jyk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgaGVhZGVyczogdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB9O1xuICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2QoZW5kcG9pbnQsIHt9LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXNzaW9uVG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgaWYgKHJlZGlyZWN0VG9Mb2dpblBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZ29Ub0xvZ2luUGFnZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KSk7XG4gIH1cblxuICBmZXRjaEN1cnJlbnRMb2dnZWRVc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9hY2NvdW50Jyk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgaGVhZGVyczogdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCkgfTtcbiAgICByZXR1cm4gdGhpcy5nZXRNZXRob2Q8VXNlckF1dGhEYXRhPihlbmRwb2ludCwge30sIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLmV4dHJhdFNlc3Npb25Ub2tlbihyZXMpLFxuICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIC8vIFBVQkxJQyBIVFRQIE1FVEhPRFMgLy9cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICBnZXQgPSA8VD4oZW5kcG9pbnQsIHNlYXJjaD86IERlY0ZpbHRlciwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnRyYW5zZm9ybURlY0ZpbHRlckluUGFyYW1zKHNlYXJjaCk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgZGVsZXRlID0gPFQ+KGVuZHBvaW50LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLmRlbGV0ZU1ldGhvZDxUPihlbmRvcGludFVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBwYXRjaCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMucGF0Y2hNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxUPihlbmRvcGludFVybCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gIH1cblxuICBwdXQgPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLnB1dE1ldGhvZDxUPihlbmRvcGludFVybCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gIH1cblxuICB1cHNlcnQgPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBpZiAocGF5bG9hZC5pZCA+PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXQoZW5kcG9pbnQsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGVuZHBvaW50LCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICB1cGxvYWQoZW5kcG9pbnQ6IHN0cmluZywgZmlsZXM6IEZpbGVbXSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmNyZWF0ZUZpbGVzRm9ybURhdGEoZmlsZXMpO1xuICAgIG9wdGlvbnMucmVwb3J0UHJvZ3Jlc3MgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TWV0aG9kKCdQT1NUJywgZW5kb3BpbnRVcmwsIGZvcm1EYXRhLCBvcHRpb25zKTtcbiAgfVxuXG5cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIC8vIFB1YmxpYyBIZWxwZXIgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKiogLy9cbiAgcHJpdmF0ZSB0cmFuc2Zvcm1EZWNGaWx0ZXJJblBhcmFtcyhmaWx0ZXI6IERlY0ZpbHRlcik6IFNlcmlhbGl6ZWREZWNGaWx0ZXIge1xuXG4gICAgY29uc3Qgc2VyaWFsaXplZEZpbHRlcjogU2VyaWFsaXplZERlY0ZpbHRlciA9IHt9O1xuXG4gICAgaWYgKGZpbHRlcikge1xuXG4gICAgICBpZiAoZmlsdGVyLnBhZ2UpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5wYWdlID0gZmlsdGVyLnBhZ2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIubGltaXQpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5saW1pdCA9IGZpbHRlci5saW1pdDtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5maWx0ZXJHcm91cHMpIHtcbiAgICAgICAgY29uc3QgZmlsdGVyV2l0aFZhbHVlQXNBcnJheSA9IHRoaXMuZ2V0RmlsdGVyV2l0aFZhbHVlc0FzQXJyYXkoZmlsdGVyLmZpbHRlckdyb3Vwcyk7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIuZmlsdGVyID0gdGhpcy5maWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKGZpbHRlcldpdGhWYWx1ZUFzQXJyYXkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLnByb2plY3RWaWV3KSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIucHJvamVjdFZpZXcgPSB0aGlzLmZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcoZmlsdGVyLnByb2plY3RWaWV3KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5zb3J0KSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIuc29ydCA9IHRoaXMuZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhmaWx0ZXIuc29ydCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIudGV4dFNlYXJjaCkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnRleHRTZWFyY2ggPSBmaWx0ZXIudGV4dFNlYXJjaDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBzZXJpYWxpemVkRmlsdGVyO1xuXG4gIH1cblxuICBwcml2YXRlIGZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcob2JqKSB7XG4gICAgaWYgKG9iaikge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWx0ZXJXaXRoVmFsdWVzQXNBcnJheShmaWx0ZXJHcm91cHMpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwQ29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsdGVyR3JvdXBzKSk7IC8vIG1ha2UgYSBjb3B5IG9mIHRoZSBmaWx0ZXIgc28gd2UgZG8gbm90IGNoYW5nZSB0aGUgb3JpZ2luYWwgZmlsdGVyXG5cbiAgICBpZiAoZmlsdGVyR3JvdXBDb3B5KSB7XG5cbiAgICAgIHJldHVybiBmaWx0ZXJHcm91cENvcHkubWFwKGZpbHRlckdyb3VwID0+IHtcblxuICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzID0gZmlsdGVyR3JvdXAuZmlsdGVycy5tYXAoZmlsdGVyID0+IHtcblxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShmaWx0ZXIudmFsdWUpKSB7XG4gICAgICAgICAgICBmaWx0ZXIudmFsdWUgPSBbZmlsdGVyLnZhbHVlXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmaWx0ZXJHcm91cDtcblxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gZmlsdGVyR3JvdXBzO1xuXG4gICAgfVxuICB9XG5cblxuICAvLyAqKioqKioqKioqKiogLy9cbiAgLy8gSHR0cCBNZXRob2RzIC8vXG4gIC8vICoqKioqKioqKioqKiAvL1xuICBwcml2YXRlIGdldE1ldGhvZDxUPih1cmw6IHN0cmluZywgc2VhcmNoID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMucGFyYW1zID0gc2VhcmNoO1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLmdldDxUPih1cmwsIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXRjaE1ldGhvZDxUPih1cmwsIGJvZHkgPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucGF0Y2g8VD4odXJsLCBib2R5LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcG9zdE1ldGhvZDxUPih1cmwsIGJvZHk/LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wb3N0PFQ+KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHB1dE1ldGhvZDxUPih1cmwsIGJvZHkgPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucHV0PFQ+KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIGRlbGV0ZU1ldGhvZDxUPih1cmw6IHN0cmluZywgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAuZGVsZXRlPFQ+KHVybCwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RNZXRob2Q8VD4odHlwZTogSHR0cFJlcXVlc3RUeXBlcywgdXJsOiBzdHJpbmcsIGJvZHk6IGFueSA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKHVuZGVmaW5lZCwgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QodHlwZSwgdXJsLCBib2R5LCBvcHRpb25zKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5yZXF1ZXN0PFQ+KHJlcSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yID0gKGVycm9yOiBhbnkpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICBjb25zdCBib2R5TWVzc2FnZSA9IChlcnJvciAmJiBlcnJvci5lcnJvcikgPyBlcnJvci5lcnJvci5tZXNzYWdlIDogJyc7XG4gICAgY29uc3Qgc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xuICAgIGNvbnN0IHN0YXR1c1RleHQgPSBlcnJvci5zdGF0dXNUZXh0O1xuXG4gICAgc3dpdGNoIChlcnJvci5zdGF0dXMpIHtcbiAgICAgIGNhc2UgNDAxOlxuICAgICAgICBpZiAodGhpcy5kZWNDb25maWcuY29uZmlnLmF1dGhIb3N0KSB7XG4gICAgICAgICAgdGhpcy5nb1RvTG9naW5QYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDA5OlxuICAgICAgICB0aGlzLnNuYWNrYmFyLm9wZW4oJ21lc3NhZ2UuaHR0cC1zdGF0dXMuNDA5JywgJ2Vycm9yJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBzdGF0dXNUZXh0LCBtZXNzYWdlLCBib2R5TWVzc2FnZSB9KTtcbiAgfVxuXG4gIC8vICoqKioqKiogLy9cbiAgLy8gSGVscGVycyAvL1xuICAvLyAqKioqKioqIC8vXG5cbiAgcHJpdmF0ZSBjcmVhdGVGaWxlc0Zvcm1EYXRhKGZpbGVzOiBGaWxlW10pIHtcbiAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmaWxlcy5mb3JFYWNoKChmaWxlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZm9ybUl0ZW1OYW1lID0gaW5kZXggPiAwID8gYGZpbGUtJHtpbmRleH1gIDogJ2ZpbGUnO1xuICAgICAgZm9ybURhdGEuYXBwZW5kKGZvcm1JdGVtTmFtZSwgZmlsZSwgZmlsZS5uYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH1cblxuICBwcml2YXRlIGdvVG9Mb2dpblBhZ2UoKSB7XG4gICAgY29uc3QgbmFrZWRBcHBEb21haW4gPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgLnJlcGxhY2UoJ2h0dHBzOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnaHR0cDovLycsICcnKVxuICAgICAgLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLnNlYXJjaCwgJycpO1xuXG4gICAgY29uc3QgbmFrZWRBdXRoRG9tYWluID0gdGhpcy5kZWNDb25maWcuY29uZmlnLmF1dGhIb3N0LnNwbGl0KCc/JylbMF1cbiAgICAgIC5yZXBsYWNlKCdodHRwczovLycsICcnKVxuICAgICAgLnJlcGxhY2UoJ2h0dHA6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKCcvLycsICcnKTtcblxuICAgIGlmIChuYWtlZEFwcERvbWFpbiAhPT0gbmFrZWRBdXRoRG9tYWluKSB7XG4gICAgICBjb25zdCBhdXRoVXJsV2l0aFJlZGlyZWN0ID0gYCR7dGhpcy5kZWNDb25maWcuY29uZmlnLmF1dGhIb3N0fSR7dGhpcy5nZXRQYXJhbXNEaXZpZGVyKCl9cmVkaXJlY3RVcmw9JHt3aW5kb3cubG9jYXRpb24uaHJlZn1gO1xuICAgICAgY29uc29sZS5sb2coYERlY0FwaVNlcnZpY2U6OiBOb3QgYXV0aGVudGljYXRlZC4gUmVkaXJlY3RpbmcgdG8gbG9naW4gcGFnZSBhdDogJHthdXRoVXJsV2l0aFJlZGlyZWN0fWApO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhdXRoVXJsV2l0aFJlZGlyZWN0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFyYW1zRGl2aWRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNDb25maWcuY29uZmlnLmF1dGhIb3N0LnNwbGl0KCc/JykubGVuZ3RoID4gMSA/ICcmJyA6ICc/JztcbiAgfVxuXG4gIHByaXZhdGUgdHJ5VG9Mb2FkU2lnbmVkSW5Vc2VyKCkge1xuICAgIHRoaXMuZmV0Y2hDdXJyZW50TG9nZ2VkVXNlcigpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZWNvcmFBcGlTZXJ2aWNlOjogSW5pdGlhbGl6ZWQgYXMgbG9nZ2VkJyk7XG4gICAgICB9LCBlcnIgPT4ge1xuICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0RlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXplZCBhcyBub3QgbG9nZ2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGVjb3JhQXBpU2VydmljZTo6IEluaXRpYWxpemF0aW9uIEVycm9yLiBDb3VsZCByZXRyaWV2ZSB1c2VyIGFjY291bnQnLCBlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih0eXBlPzogc3RyaW5nLCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpIHtcbiAgICBoZWFkZXJzID0gaGVhZGVycyB8fCBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICBjb25zdCBjdXN0b21pemVkQ29udGVudFR5cGUgPSBoZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKCFjdXN0b21pemVkQ29udGVudFR5cGUgJiYgdHlwZSkge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCB0eXBlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2Vzc2lvblRva2VuKSB7XG4gICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ1gtQXV0aC1Ub2tlbicsIHRoaXMuc2Vzc2lvblRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhdFNlc3Npb25Ub2tlbihyZXMpIHtcbiAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHJlcyAmJiByZXMuc2Vzc2lvbiA/IHJlcy5zZXNzaW9uLmlkIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwcml2YXRlIGdldFJlc291cmNlVXJsKHBhdGgpIHtcblxuICAgIGNvbnN0IGJhc2VQYXRoID0gdGhpcy5kZWNDb25maWcuY29uZmlnLnVzZU1vY2tBcGkgPyB0aGlzLmRlY0NvbmZpZy5jb25maWcubW9ja0FwaUhvc3QgOiB0aGlzLmRlY0NvbmZpZy5jb25maWcuYXBpO1xuXG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXlxcL3xcXC8kL2csICcnKTtcblxuICAgIHJldHVybiBgJHtiYXNlUGF0aH0vJHtwYXRofWA7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Vc2VyKCkge1xuICAgIHRoaXMudXNlclN1YnNjcmlwaW9uID0gdGhpcy51c2VyJC5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvVXNlcigpIHtcbiAgICB0aGlzLnVzZXJTdWJzY3JpcGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLypcbiAgKiBTaGFyZSBPYnNlcnZhYmxlXG4gICpcbiAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIHNoYXJlIHRoZSBhY3R1YWwgZGF0YSB2YWx1ZXMgYW5kIG5vdCBqdXN0IHRoZSBvYnNlcnZhYmxlIGluc3RhbmNlXG4gICpcbiAgKiBUbyByZXVzZSBhIHNpbmdsZSwgY29tbW9uIHN0cmVhbSBhbmQgYXZvaWQgbWFraW5nIGFub3RoZXIgc3Vic2NyaXB0aW9uIHRvIHRoZSBzZXJ2ZXIgcHJvdmlkaW5nIHRoYXQgZGF0YS5cbiAgKlxuICAqL1xuICBwcml2YXRlIHNoYXJlT2JzZXJ2YWJsZShjYWxsOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICByZXR1cm4gY2FsbC5waXBlKHNoYXJlKCkpO1xuICB9XG59XG4iXX0=