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
     * @return {?}
     */
    DecApiService.prototype.handShake = /**
     * @return {?}
     */
    function () {
        return this.tryToLoadSignedInUser();
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
        var /** @type {?} */ call = this.fetchCurrentLoggedUser().toPromise();
        call.then(function (account) {
            console.log("DecoraApiService:: Initialized as " + account.name);
        }, function (err) {
            if (err.status === 401) {
                console.log('DecoraApiService:: Initialized as not logged');
            }
            else {
                console.error('DecoraApiService:: Initialization Error. Could retrieve user account', err);
            }
        });
        return call;
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
    DecApiService.prototype.fetchCurrentLoggedUser;
    /** @type {?} */
    DecApiService.prototype.handleError;
    /** @type {?} */
    DecApiService.prototype.http;
    /** @type {?} */
    DecApiService.prototype.snackbar;
    /** @type {?} */
    DecApiService.prototype.decConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWFwaS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEYsT0FBTyxFQUFjLFVBQVUsRUFBRSxlQUFlLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztJQXlCakYsdUJBQ1UsTUFDQSxVQUNBO1FBSFYsaUJBTUM7UUFMUyxTQUFJLEdBQUosSUFBSTtRQUNKLGFBQVEsR0FBUixRQUFRO1FBQ1IsY0FBUyxHQUFULFNBQVM7cUJBVG9CLElBQUksZUFBZSxDQUFlLFNBQVMsQ0FBQzs7OztvQkF5QjVFLFVBQUMsU0FBb0I7WUFDMUIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDZCxxQkFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDcEQscUJBQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pHLHFCQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTtxQkFDMUIsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFD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OztjQUFDLEdBQUc7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNwRSxNQUFNLENBQUMsR0FBRyxDQUFDOzs7Ozs7SUFHTCxzQ0FBYzs7OztjQUFDLElBQUk7UUFFekIscUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFFbEgsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXBDLE1BQU0sQ0FBSSxRQUFRLFNBQUksSUFBTSxDQUFDOzs7OztJQUl2Qix1Q0FBZTs7Ozs7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDOUMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDbEIsQ0FBQyxDQUFDOzs7OztJQUdHLHlDQUFpQjs7OztRQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDOzs7Ozs7SUFXN0IsdUNBQWU7Ozs7Y0FBQyxJQUFxQjtRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDOzs7Z0JBeFo3QixVQUFVOzs7O2dCQW5CRixVQUFVO2dCQUlWLGtCQUFrQjtnQkFDbEIsdUJBQXVCOzt3QkFOaEM7O1NBcUJhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHNoYXJlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVc2VyQXV0aERhdGEsIExvZ2luRGF0YSwgRmFjZWJvb2tMb2dpbkRhdGEsIERlY0ZpbHRlciwgU2VyaWFsaXplZERlY0ZpbHRlciB9IGZyb20gJy4vZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNTbmFja0JhclNlcnZpY2UgfSBmcm9tICcuLy4uL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgQ2FsbE9wdGlvbnMgPSB7XG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgcGFyYW1zPzoge1xuICAgIFtwcm9wOiBzdHJpbmddOiBhbnk7XG4gIH07XG59ICYge1xuICBbcHJvcDogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSHR0cFJlcXVlc3RUeXBlcyA9ICdHRVQnIHwgJ1BPU1QnIHwgJ1BVVCcgfCAnUEFUQ0gnIHwgJ0RFTEVURSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBcGlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICB1c2VyOiBVc2VyQXV0aERhdGE7XG5cbiAgdXNlciQ6IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+KHVuZGVmaW5lZCk7XG5cbiAgcHJpdmF0ZSBzZXNzaW9uVG9rZW46IHN0cmluZztcblxuICBwcml2YXRlIHVzZXJTdWJzY3JpcGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIHNuYWNrYmFyOiBEZWNTbmFja0JhclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZWNDb25maWc6IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZVRvVXNlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZVRvVXNlcigpO1xuICB9XG5cbiAgZ2V0IGhvc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hcGk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIC8vIFBVQkxJQyBBVVRIIE1FVEhPRFMgLy9cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICBhdXRoID0gKGxvZ2luRGF0YTogTG9naW5EYXRhKSA9PiB7XG4gICAgaWYgKGxvZ2luRGF0YSkge1xuICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL3NpZ25pbicpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgaGVhZGVyczogdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB9O1xuICAgICAgY29uc3QgYm9keSA9IG5ldyBIdHRwUGFyYW1zKClcbiAgICAgICAgLnNldCgndXNlcm5hbWUnLCBsb2dpbkRhdGEuZW1haWwpXG4gICAgICAgIC5zZXQoJ3Bhc3N3b3JkJywgbG9naW5EYXRhLnBhc3N3b3JkKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VXNlckF1dGhEYXRhPihlbmRwb2ludCwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgbm90aWZpZWQ6IHRydWUsIG1lc3NhZ2U6ICdERUNPUkEtQVBJIEFVVEggRVJST1I6OiBObyBjcmVkZW50aWFscyBwcm92aWRlZCcgfSk7XG4gICAgfVxuICB9XG5cbiAgYXV0aEZhY2Vib29rID0gKGxvZ2luRGF0YTogRmFjZWJvb2tMb2dpbkRhdGEpID0+IHtcbiAgICBpZiAobG9naW5EYXRhKSB7XG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvZmFjZWJvb2svc2lnbmluJyk7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgICBjb25zdCBib2R5ID0gbmV3IEh0dHBQYXJhbXMoKVxuICAgICAgICAuc2V0KCdmYWNlYm9va1Rva2VuJywgbG9naW5EYXRhLmZhY2Vib29rVG9rZW4pXG4gICAgICAgIC5zZXQoJ2tlZXBMb2dnZWQnLCBsb2dpbkRhdGEua2VlcExvZ2dlZC50b1N0cmluZygpKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VXNlckF1dGhEYXRhPihlbmRwb2ludCwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgbm90aWZpZWQ6IHRydWUsIG1lc3NhZ2U6ICdERUNPUkEtQVBJIEFVVEggRkFDRUJPT0sgRVJST1I6OiBObyBjcmVkZW50aWFscyBwcm92aWRlZCcgfSk7XG4gICAgfVxuICB9XG5cbiAgbG9nb3V0ID0gKHJlZGlyZWN0VG9Mb2dpblBhZ2UgPSB0cnVlKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL3NpZ25vdXQnKTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZChlbmRwb2ludCwge30sIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICBpZiAocmVkaXJlY3RUb0xvZ2luUGFnZSkge1xuICAgICAgICAgICAgdGhpcy5nb1RvTG9naW5QYWdlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gUFVCTElDIEhUVFAgTUVUSE9EUyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIGdldCA9IDxUPihlbmRwb2ludCwgc2VhcmNoPzogRGVjRmlsdGVyLCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMudHJhbnNmb3JtRGVjRmlsdGVySW5QYXJhbXMoc2VhcmNoKTtcbiAgICByZXR1cm4gdGhpcy5nZXRNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gIH1cblxuICBkZWxldGUgPSA8VD4oZW5kcG9pbnQsIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlTWV0aG9kPFQ+KGVuZG9waW50VXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBhdGNoID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wYXRjaE1ldGhvZDxUPihlbmRvcGludFVybCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1dCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMucHV0TWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHVwc2VydCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGlmIChwYXlsb2FkLmlkID49IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChlbmRwb2ludCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoZW5kcG9pbnQsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHVwbG9hZChlbmRwb2ludDogc3RyaW5nLCBmaWxlczogRmlsZVtdLCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuY3JlYXRlRmlsZXNGb3JtRGF0YShmaWxlcyk7XG4gICAgb3B0aW9ucy5yZXBvcnRQcm9ncmVzcyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RNZXRob2QoJ1BPU1QnLCBlbmRvcGludFVybCwgZm9ybURhdGEsIG9wdGlvbnMpO1xuICB9XG5cblxuXG4gIGhhbmRTaGFrZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cnlUb0xvYWRTaWduZWRJblVzZXIoKTtcbiAgfVxuICAvLyAqKioqKioqKioqKiogLy9cbiAgLy8gUHJpdmF0ZSBIZWxwZXIgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKiogLy9cblxuICBwcml2YXRlIGZldGNoQ3VycmVudExvZ2dlZFVzZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL2FjY291bnQnKTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oKSB9O1xuICAgIHJldHVybiB0aGlzLmdldE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCB7fSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNmb3JtRGVjRmlsdGVySW5QYXJhbXMoZmlsdGVyOiBEZWNGaWx0ZXIpOiBTZXJpYWxpemVkRGVjRmlsdGVyIHtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZWRGaWx0ZXI6IFNlcmlhbGl6ZWREZWNGaWx0ZXIgPSB7fTtcblxuICAgIGlmIChmaWx0ZXIpIHtcblxuICAgICAgaWYgKGZpbHRlci5wYWdlKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIucGFnZSA9IGZpbHRlci5wYWdlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLmxpbWl0KSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIubGltaXQgPSBmaWx0ZXIubGltaXQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuZmlsdGVyR3JvdXBzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcldpdGhWYWx1ZUFzQXJyYXkgPSB0aGlzLmdldEZpbHRlcldpdGhWYWx1ZXNBc0FycmF5KGZpbHRlci5maWx0ZXJHcm91cHMpO1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLmZpbHRlciA9IHRoaXMuZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhmaWx0ZXJXaXRoVmFsdWVBc0FycmF5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5wcm9qZWN0Vmlldykge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnByb2plY3RWaWV3ID0gdGhpcy5maWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKGZpbHRlci5wcm9qZWN0Vmlldyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuc29ydCkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnNvcnQgPSB0aGlzLmZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcoZmlsdGVyLnNvcnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLnRleHRTZWFyY2gpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci50ZXh0U2VhcmNoID0gZmlsdGVyLnRleHRTZWFyY2g7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gc2VyaWFsaXplZEZpbHRlcjtcblxuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKG9iaikge1xuICAgIGlmIChvYmopIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyV2l0aFZhbHVlc0FzQXJyYXkoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cENvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbHRlckdyb3VwcykpOyAvLyBtYWtlIGEgY29weSBvZiB0aGUgZmlsdGVyIHNvIHdlIGRvIG5vdCBjaGFuZ2UgdGhlIG9yaWdpbmFsIGZpbHRlclxuXG4gICAgaWYgKGZpbHRlckdyb3VwQ29weSkge1xuXG4gICAgICByZXR1cm4gZmlsdGVyR3JvdXBDb3B5Lm1hcChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycyA9IGZpbHRlckdyb3VwLmZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG5cbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmlsdGVyLnZhbHVlKSkge1xuICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gW2ZpbHRlci52YWx1ZV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZpbHRlcjtcblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyR3JvdXA7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIGZpbHRlckdyb3VwcztcblxuICAgIH1cbiAgfVxuXG5cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIC8vIEh0dHAgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKiogLy9cbiAgcHJpdmF0ZSBnZXRNZXRob2Q8VD4odXJsOiBzdHJpbmcsIHNlYXJjaCA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLnBhcmFtcyA9IHNlYXJjaDtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8VD4odXJsLCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnBhdGNoPFQ+KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHBvc3RNZXRob2Q8VD4odXJsLCBib2R5Pywgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXRNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWxldGVNZXRob2Q8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLmRlbGV0ZTxUPih1cmwsIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0TWV0aG9kPFQ+KHR5cGU6IEh0dHBSZXF1ZXN0VHlwZXMsIHVybDogc3RyaW5nLCBib2R5OiBhbnkgPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih1bmRlZmluZWQsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHR5cGUsIHVybCwgYm9keSwgb3B0aW9ucyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucmVxdWVzdDxUPihyZXEpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvciA9IChlcnJvcjogYW55KSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgY29uc3QgYm9keU1lc3NhZ2UgPSAoZXJyb3IgJiYgZXJyb3IuZXJyb3IpID8gZXJyb3IuZXJyb3IubWVzc2FnZSA6ICcnO1xuICAgIGNvbnN0IHN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICBjb25zdCBzdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcblxuICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgaWYgKHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdCkge1xuICAgICAgICAgIHRoaXMuZ29Ub0xvZ2luUGFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDQwOTpcbiAgICAgICAgdGhpcy5zbmFja2Jhci5vcGVuKCdtZXNzYWdlLmh0dHAtc3RhdHVzLjQwOScsICdlcnJvcicpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgc3RhdHVzVGV4dCwgbWVzc2FnZSwgYm9keU1lc3NhZ2UgfSk7XG4gIH1cblxuICAvLyAqKioqKioqIC8vXG4gIC8vIEhlbHBlcnMgLy9cbiAgLy8gKioqKioqKiAvL1xuXG4gIHByaXZhdGUgY3JlYXRlRmlsZXNGb3JtRGF0YShmaWxlczogRmlsZVtdKSB7XG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZmlsZXMuZm9yRWFjaCgoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm1JdGVtTmFtZSA9IGluZGV4ID4gMCA/IGBmaWxlLSR7aW5kZXh9YCA6ICdmaWxlJztcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChmb3JtSXRlbU5hbWUsIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTG9naW5QYWdlKCkge1xuICAgIGNvbnN0IG5ha2VkQXBwRG9tYWluID0gd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgIC5yZXBsYWNlKCdodHRwczovLycsICcnKVxuICAgICAgLnJlcGxhY2UoJ2h0dHA6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gsICcnKTtcblxuICAgIGNvbnN0IG5ha2VkQXV0aERvbWFpbiA9IHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdC5zcGxpdCgnPycpWzBdXG4gICAgICAucmVwbGFjZSgnaHR0cHM6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKCdodHRwOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnLy8nLCAnJyk7XG5cbiAgICBpZiAobmFrZWRBcHBEb21haW4gIT09IG5ha2VkQXV0aERvbWFpbikge1xuICAgICAgY29uc3QgYXV0aFVybFdpdGhSZWRpcmVjdCA9IGAke3RoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdH0ke3RoaXMuZ2V0UGFyYW1zRGl2aWRlcigpfXJlZGlyZWN0VXJsPSR7d2luZG93LmxvY2F0aW9uLmhyZWZ9YDtcbiAgICAgIGNvbnNvbGUubG9nKGBEZWNBcGlTZXJ2aWNlOjogTm90IGF1dGhlbnRpY2F0ZWQuIFJlZGlyZWN0aW5nIHRvIGxvZ2luIHBhZ2UgYXQ6ICR7YXV0aFVybFdpdGhSZWRpcmVjdH1gKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXV0aFVybFdpdGhSZWRpcmVjdDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFBhcmFtc0RpdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdC5zcGxpdCgnPycpLmxlbmd0aCA+IDEgPyAnJicgOiAnPyc7XG4gIH1cblxuICBwcml2YXRlIHRyeVRvTG9hZFNpZ25lZEluVXNlcigpIHtcbiAgICBjb25zdCBjYWxsID0gdGhpcy5mZXRjaEN1cnJlbnRMb2dnZWRVc2VyKCkudG9Qcm9taXNlKCk7XG4gICAgY2FsbC50aGVuKGFjY291bnQgPT4ge1xuICAgICAgY29uc29sZS5sb2coYERlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXplZCBhcyAke2FjY291bnQubmFtZX1gKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICBjb25zb2xlLmxvZygnRGVjb3JhQXBpU2VydmljZTo6IEluaXRpYWxpemVkIGFzIG5vdCBsb2dnZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXphdGlvbiBFcnJvci4gQ291bGQgcmV0cmlldmUgdXNlciBhY2NvdW50JywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHByaXZhdGUgbmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih0eXBlPzogc3RyaW5nLCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpIHtcbiAgICBoZWFkZXJzID0gaGVhZGVycyB8fCBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICBjb25zdCBjdXN0b21pemVkQ29udGVudFR5cGUgPSBoZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKCFjdXN0b21pemVkQ29udGVudFR5cGUgJiYgdHlwZSkge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCB0eXBlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2Vzc2lvblRva2VuKSB7XG4gICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ1gtQXV0aC1Ub2tlbicsIHRoaXMuc2Vzc2lvblRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhdFNlc3Npb25Ub2tlbihyZXMpIHtcbiAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHJlcyAmJiByZXMuc2Vzc2lvbiA/IHJlcy5zZXNzaW9uLmlkIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwcml2YXRlIGdldFJlc291cmNlVXJsKHBhdGgpIHtcblxuICAgIGNvbnN0IGJhc2VQYXRoID0gdGhpcy5kZWNDb25maWcuY29uZmlnLnVzZU1vY2tBcGkgPyB0aGlzLmRlY0NvbmZpZy5jb25maWcubW9ja0FwaUhvc3QgOiB0aGlzLmRlY0NvbmZpZy5jb25maWcuYXBpO1xuXG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXlxcL3xcXC8kL2csICcnKTtcblxuICAgIHJldHVybiBgJHtiYXNlUGF0aH0vJHtwYXRofWA7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Vc2VyKCkge1xuICAgIHRoaXMudXNlclN1YnNjcmlwaW9uID0gdGhpcy51c2VyJC5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvVXNlcigpIHtcbiAgICB0aGlzLnVzZXJTdWJzY3JpcGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLypcbiAgKiBTaGFyZSBPYnNlcnZhYmxlXG4gICpcbiAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIHNoYXJlIHRoZSBhY3R1YWwgZGF0YSB2YWx1ZXMgYW5kIG5vdCBqdXN0IHRoZSBvYnNlcnZhYmxlIGluc3RhbmNlXG4gICpcbiAgKiBUbyByZXVzZSBhIHNpbmdsZSwgY29tbW9uIHN0cmVhbSBhbmQgYXZvaWQgbWFraW5nIGFub3RoZXIgc3Vic2NyaXB0aW9uIHRvIHRoZSBzZXJ2ZXIgcHJvdmlkaW5nIHRoYXQgZGF0YS5cbiAgKlxuICAqL1xuICBwcml2YXRlIHNoYXJlT2JzZXJ2YWJsZShjYWxsOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICByZXR1cm4gY2FsbC5waXBlKHNoYXJlKCkpO1xuICB9XG59XG4iXX0=