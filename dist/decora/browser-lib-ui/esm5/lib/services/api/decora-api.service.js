/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, share, tap, finalize, debounceTime } from 'rxjs/operators';
import { DecConfigurationService } from './../configuration/configuration.service';
/** @typedef {?} */
var CallOptions;
export { CallOptions };
/** @typedef {?} */
var HttpRequestTypes;
export { HttpRequestTypes };
var DecApiService = /** @class */ (function () {
    function DecApiService(http, decConfig) {
        var _this = this;
        this.http = http;
        this.decConfig = decConfig;
        this.user$ = new BehaviorSubject(undefined);
        this.loadingMap = {};
        this.loadingStream$ = new BehaviorSubject(undefined);
        // ******************* //
        // PUBLIC AUTH METHODS //
        // ******************* //
        this.auth = function (loginData) {
            if (loginData) {
                /** @type {?} */
                var endpoint = _this.getResourceUrl('auth/signin');
                /** @type {?} */
                var options = { headers: _this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
                /** @type {?} */
                var body = new HttpParams()
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
                /** @type {?} */
                var endpoint = _this.getResourceUrl('auth/facebook/signin');
                /** @type {?} */
                var options = { headers: _this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
                /** @type {?} */
                var body = new HttpParams()
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
            /** @type {?} */
            var endpoint = _this.getResourceUrl('auth/signout');
            /** @type {?} */
            var options = { headers: _this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
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
            /** @type {?} */
            var endopintUrl = _this.getResourceUrl(endpoint);
            /** @type {?} */
            var params = search;
            if (search && search['filterGroups']) {
                params = _this.transformDecFilterInParams(search);
            }
            return _this.getMethod(endopintUrl, params, options);
        };
        this.delete = function (endpoint, options) {
            /** @type {?} */
            var endopintUrl = _this.getResourceUrl(endpoint);
            return _this.deleteMethod(endopintUrl, options);
        };
        this.patch = function (endpoint, payload, options) {
            if (payload === void 0) { payload = {}; }
            /** @type {?} */
            var endopintUrl = _this.getResourceUrl(endpoint);
            return _this.patchMethod(endopintUrl, payload, options);
        };
        this.post = function (endpoint, payload, options) {
            if (payload === void 0) { payload = {}; }
            /** @type {?} */
            var endopintUrl = _this.getResourceUrl(endpoint);
            return _this.postMethod(endopintUrl, payload, options);
        };
        this.put = function (endpoint, payload, options) {
            if (payload === void 0) { payload = {}; }
            /** @type {?} */
            var endopintUrl = _this.getResourceUrl(endpoint);
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
            /** @type {?} */
            var message = error.message;
            /** @type {?} */
            var bodyMessage = (error && error.error) ? error.error.message : '';
            /** @type {?} */
            var bodyError = error.error;
            /** @type {?} */
            var status = error.status;
            /** @type {?} */
            var statusText = error.statusText;
            switch (error.status) {
                case 401:
                    if (_this.decConfig.config.authHost) {
                        _this.goToLoginPage();
                    }
                    break;
            }
            return throwError({ status: status, statusText: statusText, message: message, bodyMessage: bodyMessage, bodyError: bodyError });
        };
        this.startLoading = function (msg) {
            if (msg === void 0) { msg = true; }
            /** @type {?} */
            var uuid = Math.random().toString(26).slice(2) + Date.now();
            _this.loadingMap[uuid] = msg || true;
            _this.emitLoading();
            return uuid;
        };
        this.stopLoading = function (uuid) {
            if (_this.loadingMap[uuid]) {
                delete _this.loadingMap[uuid];
            }
            _this.emitLoading();
        };
        this.emitLoading = function () {
            /** @type {?} */
            var keys = Object.keys(_this.loadingMap);
            /** @type {?} */
            var hasLoading = keys.length > 0;
            /** @type {?} */
            var loadingMessage = _this.loadingMap[keys[0]];
            _this.loadingStream$.next(hasLoading ? loadingMessage : false);
        };
        this.fetchCurrentLoggedUser = function () {
            /** @type {?} */
            var endpoint = _this.getResourceUrl('auth/account');
            /** @type {?} */
            var options = { headers: _this.newHeaderWithSessionToken() };
            return _this.getMethod(endpoint, {}, options)
                .pipe(tap(function (res) {
                _this.extratSessionToken(res),
                    _this.user$.next(res);
                return res;
            }));
        };
        this.subscribeToUser();
        this.subscribeToLoading();
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
        /** @type {?} */
        var endopintUrl = this.getResourceUrl(endpoint);
        /** @type {?} */
        var formData = this.createFilesFormData(files);
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
     * @param {?} path
     * @return {?}
     */
    DecApiService.prototype.getResourceUrl = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var basePath = this.decConfig.config.useMockApi ? this.decConfig.config.mockApiHost : this.decConfig.config.api;
        path = path.replace(/^\/|\/$/g, '');
        return basePath + "/" + path;
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
        var _this = this;
        if (search === void 0) { search = {}; }
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var uuid = this.startLoading(options.loadingMessage);
        options.params = search;
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        /** @type {?} */
        var callObservable = this.http.get(url, options)
            .pipe(finalize(function () { return _this.stopLoading(uuid); }), catchError(this.handleError));
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
        var _this = this;
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var uuid = this.startLoading(options.loadingMessage);
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        /** @type {?} */
        var callObservable = this.http.patch(url, body, options)
            .pipe(finalize(function () { return _this.stopLoading(uuid); }), catchError(this.handleError));
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
        var _this = this;
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var uuid = this.startLoading(options.loadingMessage);
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        /** @type {?} */
        var callObservable = this.http.post(url, body, options)
            .pipe(finalize(function () { return _this.stopLoading(uuid); }), catchError(this.handleError));
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
        var _this = this;
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var uuid = this.startLoading(options.loadingMessage);
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        /** @type {?} */
        var callObservable = this.http.put(url, body, options)
            .pipe(finalize(function () { return _this.stopLoading(uuid); }), catchError(this.handleError));
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
        var _this = this;
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var uuid = this.startLoading(options.loadingMessage);
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
        /** @type {?} */
        var callObservable = this.http.delete(url, options)
            .pipe(finalize(function () { return _this.stopLoading(uuid); }), catchError(this.handleError));
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
        var _this = this;
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var uuid = this.startLoading(options.loadingMessage);
        options.withCredentials = true;
        options.headers = this.newHeaderWithSessionToken(undefined, options.headers);
        /** @type {?} */
        var req = new HttpRequest(type, url, body, options);
        /** @type {?} */
        var callObservable = this.http.request(req)
            .pipe(finalize(function () { return _this.stopLoading(uuid); }), catchError(this.handleError));
        return this.shareObservable(callObservable);
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
        /** @type {?} */
        var serializedFilter = {};
        if (filter) {
            if (filter.page) {
                serializedFilter.page = filter.page;
            }
            if (filter.limit) {
                serializedFilter.limit = filter.limit;
            }
            if (filter.filterGroups) {
                /** @type {?} */
                var filterWithValueAsArray = this.getFilterWithValuesAsArray(filter.filterGroups);
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
        /** @type {?} */
        var filterGroupCopy = JSON.parse(JSON.stringify(filterGroups)); // make a copy of the filter so we do not change the original filter
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
     * @param {?} files
     * @return {?}
     */
    DecApiService.prototype.createFilesFormData = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        /** @type {?} */
        var formData = new FormData();
        files.forEach(function (file, index) {
            /** @type {?} */
            var formItemName = index > 0 ? "file-" + index : 'file';
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
        /** @type {?} */
        var nakedAppDomain = window.location.href
            .replace('https://', '')
            .replace('http://', '')
            .replace(window.location.search, '');
        /** @type {?} */
        var nakedAuthDomain = this.decConfig.config.authHost.split('?')[0]
            .replace('https://', '')
            .replace('http://', '')
            .replace('//', '');
        if (nakedAppDomain !== nakedAuthDomain) {
            /** @type {?} */
            var authUrlWithRedirect = "" + this.decConfig.config.authHost + this.getParamsDivider() + "redirectUrl=" + window.location.href;
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
        /** @type {?} */
        var call = this.fetchCurrentLoggedUser().toPromise();
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
        /** @type {?} */
        var customizedContentType = headers.get('Content-Type');
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
     * @return {?}
     */
    DecApiService.prototype.subscribeToLoading = /**
     * @return {?}
     */
    function () {
        this.loading$ = this.loadingStream$.pipe(debounceTime(100));
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
        { type: DecConfigurationService }
    ]; };
    return DecApiService;
}());
export { DecApiService };
if (false) {
    /** @type {?} */
    DecApiService.prototype.user;
    /** @type {?} */
    DecApiService.prototype.user$;
    /** @type {?} */
    DecApiService.prototype.loading$;
    /** @type {?} */
    DecApiService.prototype.sessionToken;
    /** @type {?} */
    DecApiService.prototype.userSubscripion;
    /** @type {?} */
    DecApiService.prototype.loadingMap;
    /** @type {?} */
    DecApiService.prototype.loadingStream$;
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
    DecApiService.prototype.handleError;
    /** @type {?} */
    DecApiService.prototype.startLoading;
    /** @type {?} */
    DecApiService.prototype.stopLoading;
    /** @type {?} */
    DecApiService.prototype.emitLoading;
    /** @type {?} */
    DecApiService.prototype.fetchCurrentLoggedUser;
    /** @type {?} */
    DecApiService.prototype.http;
    /** @type {?} */
    DecApiService.prototype.decConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWFwaS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RixPQUFPLEVBQWMsVUFBVSxFQUFFLGVBQWUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7Ozs7SUFnQ2pGLHVCQUNVLE1BQ0E7UUFGVixpQkFNQztRQUxTLFNBQUksR0FBSixJQUFJO1FBQ0osY0FBUyxHQUFULFNBQVM7cUJBZG9CLElBQUksZUFBZSxDQUFlLFNBQVMsQ0FBQzswQkFROUQsRUFBRTs4QkFFRSxJQUFJLGVBQWUsQ0FBbUIsU0FBUyxDQUFDOzs7O29CQXFCbEUsVUFBQyxTQUFvQjtZQUMxQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztnQkFDZCxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztnQkFDcEQsSUFBTSxPQUFPLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSSxDQUFDLHlCQUF5QixDQUFDLG1DQUFtQyxDQUFDLEVBQUUsQ0FBQzs7Z0JBQ2pHLElBQU0sSUFBSSxHQUFHLElBQUksVUFBVSxFQUFFO3FCQUMxQixHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUM7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SSxDQUFDLENBQUM7U0FDN0M7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7Ozs7O0lBR1QsMENBQWtCOzs7O2NBQUMsR0FBRztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxHQUFHLENBQUM7Ozs7O0lBR0wsdUNBQWU7Ozs7O1FBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQzlDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ2xCLENBQUMsQ0FBQzs7Ozs7SUFHRyx5Q0FBaUI7Ozs7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7SUFJN0IsMENBQWtCOzs7O1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQVd0RCx1Q0FBZTs7OztjQUFDLElBQXFCO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7OztnQkE1ZDdCLFVBQVU7Ozs7Z0JBbkJGLFVBQVU7Z0JBSVYsdUJBQXVCOzt3QkFMaEM7O1NBcUJhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBzaGFyZSwgdGFwLCBmaW5hbGl6ZSwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVXNlckF1dGhEYXRhLCBMb2dpbkRhdGEsIEZhY2Vib29rTG9naW5EYXRhLCBEZWNGaWx0ZXIsIFNlcmlhbGl6ZWREZWNGaWx0ZXIsIFF1ZXJ5UGFyYW1zIH0gZnJvbSAnLi9kZWNvcmEtYXBpLm1vZGVsJztcbmltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi8uLi9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uc2VydmljZSc7XG5cbmV4cG9ydCB0eXBlIENhbGxPcHRpb25zID0ge1xuICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG4gIHBhcmFtcz86IHtcbiAgICBbcHJvcDogc3RyaW5nXTogYW55O1xuICB9O1xuICBsb2FkaW5nTWVzc2FnZT86IHN0cmluZztcbn0gJiB7XG4gIFtwcm9wOiBzdHJpbmddOiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBIdHRwUmVxdWVzdFR5cGVzID0gJ0dFVCcgfCAnUE9TVCcgfCAnUFVUJyB8ICdQQVRDSCcgfCAnREVMRVRFJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0FwaVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHVzZXI6IFVzZXJBdXRoRGF0YTtcblxuICB1c2VyJDogQmVoYXZpb3JTdWJqZWN0PFVzZXJBdXRoRGF0YT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFVzZXJBdXRoRGF0YT4odW5kZWZpbmVkKTtcblxuICBsb2FkaW5nJDogT2JzZXJ2YWJsZTxib29sZWFuIHwgc3RyaW5nPjtcblxuICBwcml2YXRlIHNlc3Npb25Ub2tlbjogc3RyaW5nO1xuXG4gIHByaXZhdGUgdXNlclN1YnNjcmlwaW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBsb2FkaW5nTWFwID0ge307XG5cbiAgcHJpdmF0ZSBsb2FkaW5nU3RyZWFtJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbiB8IHN0cmluZz4odW5kZWZpbmVkKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBkZWNDb25maWc6IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZVRvVXNlcigpO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9Mb2FkaW5nKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9Vc2VyKCk7XG4gIH1cblxuICBnZXQgaG9zdCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNDb25maWcuY29uZmlnLmFwaTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gUFVCTElDIEFVVEggTUVUSE9EUyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIGF1dGggPSAobG9naW5EYXRhOiBMb2dpbkRhdGEpID0+IHtcbiAgICBpZiAobG9naW5EYXRhKSB7XG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvc2lnbmluJyk7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgICBjb25zdCBib2R5ID0gbmV3IEh0dHBQYXJhbXMoKVxuICAgICAgICAuc2V0KCd1c2VybmFtZScsIGxvZ2luRGF0YS5lbWFpbClcbiAgICAgICAgLnNldCgncGFzc3dvcmQnLCBsb2dpbkRhdGEucGFzc3dvcmQpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCBib2R5LCBvcHRpb25zKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBub3RpZmllZDogdHJ1ZSwgbWVzc2FnZTogJ0RFQ09SQS1BUEkgQVVUSCBFUlJPUjo6IE5vIGNyZWRlbnRpYWxzIHByb3ZpZGVkJyB9KTtcbiAgICB9XG4gIH1cblxuICBhdXRoRmFjZWJvb2sgPSAobG9naW5EYXRhOiBGYWNlYm9va0xvZ2luRGF0YSkgPT4ge1xuICAgIGlmIChsb2dpbkRhdGEpIHtcbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9mYWNlYm9vay9zaWduaW4nKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICAgIGNvbnN0IGJvZHkgPSBuZXcgSHR0cFBhcmFtcygpXG4gICAgICAgIC5zZXQoJ2ZhY2Vib29rVG9rZW4nLCBsb2dpbkRhdGEuZmFjZWJvb2tUb2tlbilcbiAgICAgICAgLnNldCgna2VlcExvZ2dlZCcsIGxvZ2luRGF0YS5rZWVwTG9nZ2VkLnRvU3RyaW5nKCkpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCBib2R5LCBvcHRpb25zKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBub3RpZmllZDogdHJ1ZSwgbWVzc2FnZTogJ0RFQ09SQS1BUEkgQVVUSCBGQUNFQk9PSyBFUlJPUjo6IE5vIGNyZWRlbnRpYWxzIHByb3ZpZGVkJyB9KTtcbiAgICB9XG4gIH1cblxuICBsb2dvdXQgPSAocmVkaXJlY3RUb0xvZ2luUGFnZSA9IHRydWUpID0+IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvc2lnbm91dCcpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kKGVuZHBvaW50LCB7fSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuc2Vzc2lvblRva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgIGlmIChyZWRpcmVjdFRvTG9naW5QYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmdvVG9Mb2dpblBhZ2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSkpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBQVUJMSUMgSFRUUCBNRVRIT0RTIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgZ2V0ID0gPFQ+KGVuZHBvaW50LCBzZWFyY2g/OiBEZWNGaWx0ZXIgfCBRdWVyeVBhcmFtcywgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcblxuICAgIGxldCBwYXJhbXMgPSBzZWFyY2g7XG5cbiAgICBpZiAoc2VhcmNoICYmIHNlYXJjaFsnZmlsdGVyR3JvdXBzJ10pIHtcblxuICAgICAgcGFyYW1zID0gdGhpcy50cmFuc2Zvcm1EZWNGaWx0ZXJJblBhcmFtcyhzZWFyY2gpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgZGVsZXRlID0gPFQ+KGVuZHBvaW50LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLmRlbGV0ZU1ldGhvZDxUPihlbmRvcGludFVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBwYXRjaCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMucGF0Y2hNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxUPihlbmRvcGludFVybCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gIH1cblxuICBwdXQgPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLnB1dE1ldGhvZDxUPihlbmRvcGludFVybCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gIH1cblxuICB1cHNlcnQgPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBpZiAocGF5bG9hZC5pZCA+PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXQoZW5kcG9pbnQsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGVuZHBvaW50LCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICB1cGxvYWQoZW5kcG9pbnQ6IHN0cmluZywgZmlsZXM6IEZpbGVbXSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmNyZWF0ZUZpbGVzRm9ybURhdGEoZmlsZXMpO1xuICAgIG9wdGlvbnMucmVwb3J0UHJvZ3Jlc3MgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TWV0aG9kKCdQT1NUJywgZW5kb3BpbnRVcmwsIGZvcm1EYXRhLCBvcHRpb25zKTtcbiAgfVxuXG5cblxuICBoYW5kU2hha2UoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJ5VG9Mb2FkU2lnbmVkSW5Vc2VyKCk7XG4gIH1cblxuICBnZXRSZXNvdXJjZVVybChwYXRoKSB7XG5cbiAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMuZGVjQ29uZmlnLmNvbmZpZy51c2VNb2NrQXBpID8gdGhpcy5kZWNDb25maWcuY29uZmlnLm1vY2tBcGlIb3N0IDogdGhpcy5kZWNDb25maWcuY29uZmlnLmFwaTtcblxuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC98XFwvJC9nLCAnJyk7XG5cbiAgICByZXR1cm4gYCR7YmFzZVBhdGh9LyR7cGF0aH1gO1xuXG4gIH1cblxuICAvLyAqKioqKioqKioqKiogLy9cbiAgLy8gSHR0cCBNZXRob2RzIC8vXG4gIC8vICoqKioqKioqKioqKiAvL1xuICBwcml2YXRlIGdldE1ldGhvZDxUPih1cmw6IHN0cmluZywgc2VhcmNoOiBhbnkgPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgdXVpZCA9IHRoaXMuc3RhcnRMb2FkaW5nKG9wdGlvbnMubG9hZGluZ01lc3NhZ2UpO1xuICAgIG9wdGlvbnMucGFyYW1zID0gc2VhcmNoO1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLmdldDxUPih1cmwsIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5zdG9wTG9hZGluZyh1dWlkKSksXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHV1aWQgPSB0aGlzLnN0YXJ0TG9hZGluZyhvcHRpb25zLmxvYWRpbmdNZXNzYWdlKTtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wYXRjaDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5zdG9wTG9hZGluZyh1dWlkKSksXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcG9zdE1ldGhvZDxUPih1cmwsIGJvZHk/LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1dWlkID0gdGhpcy5zdGFydExvYWRpbmcob3B0aW9ucy5sb2FkaW5nTWVzc2FnZSk7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5zdG9wTG9hZGluZyh1dWlkKSksXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcHV0TWV0aG9kPFQ+KHVybCwgYm9keSA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1dWlkID0gdGhpcy5zdGFydExvYWRpbmcob3B0aW9ucy5sb2FkaW5nTWVzc2FnZSk7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucHV0PFQ+KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLnN0b3BMb2FkaW5nKHV1aWQpKSxcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWxldGVNZXRob2Q8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHV1aWQgPSB0aGlzLnN0YXJ0TG9hZGluZyhvcHRpb25zLmxvYWRpbmdNZXNzYWdlKTtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5kZWxldGU8VD4odXJsLCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMuc3RvcExvYWRpbmcodXVpZCkpLFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RNZXRob2Q8VD4odHlwZTogSHR0cFJlcXVlc3RUeXBlcywgdXJsOiBzdHJpbmcsIGJvZHk6IGFueSA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCB1dWlkID0gdGhpcy5zdGFydExvYWRpbmcob3B0aW9ucy5sb2FkaW5nTWVzc2FnZSk7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih1bmRlZmluZWQsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHR5cGUsIHVybCwgYm9keSwgb3B0aW9ucyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucmVxdWVzdDxUPihyZXEpXG4gICAgICAucGlwZShcbiAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5zdG9wTG9hZGluZyh1dWlkKSksXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAoZXJyb3I6IGFueSkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgIGNvbnN0IGJvZHlNZXNzYWdlID0gKGVycm9yICYmIGVycm9yLmVycm9yKSA/IGVycm9yLmVycm9yLm1lc3NhZ2UgOiAnJztcbiAgICBjb25zdCBib2R5RXJyb3IgPSBlcnJvci5lcnJvcjtcbiAgICBjb25zdCBzdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgY29uc3Qgc3RhdHVzVGV4dCA9IGVycm9yLnN0YXR1c1RleHQ7XG5cbiAgICBzd2l0Y2ggKGVycm9yLnN0YXR1cykge1xuICAgICAgY2FzZSA0MDE6XG4gICAgICAgIGlmICh0aGlzLmRlY0NvbmZpZy5jb25maWcuYXV0aEhvc3QpIHtcbiAgICAgICAgICB0aGlzLmdvVG9Mb2dpblBhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgICAgLyogUkVNT1ZFRCBoYW5kbGVycyBiZWNhdXNlIHRoZSBlcnJvciBtdXN0IGJlIGhhbmRsZWQgYnkgdGhlIGNhbGxlciBub3QgdGhlIGFwaS4gRXhjZXB0cyB0aGUgNDAxIHRoYXQgc2hvdWxkIHJlZGlyZWN0IHRvIGxvZ2luIHBhZ2VcbiAgICAgICAgICAgICAgY2FzZSA0MDQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zbmFja2Jhci5vcGVuKGJvZHlNZXNzYWdlIHx8ICdtZXNzYWdlLmh0dHAtc3RhdHVzLjQwNCcsICdlcnJvcicsIHVuZGVmaW5lZCwgISEhYm9keU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgNDA5OlxuICAgICAgICAgICAgICAgIHRoaXMuc25hY2tiYXIub3Blbihib2R5TWVzc2FnZSB8fCAnbWVzc2FnZS5odHRwLXN0YXR1cy40MDknLCAnZXJyb3InLCB1bmRlZmluZWQsICEhIWJvZHlNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDQxMjpcbiAgICAgICAgICAgICAgICB0aGlzLnNuYWNrYmFyLm9wZW4oYm9keU1lc3NhZ2UsICdlcnJvcicpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAqL1xuICAgIH1cblxuICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBzdGF0dXNUZXh0LCBtZXNzYWdlLCBib2R5TWVzc2FnZSwgYm9keUVycm9yIH0pO1xuICB9XG5cbiAgLy8gKioqKioqKiAvL1xuICAvLyBIZWxwZXJzIC8vXG4gIC8vICoqKioqKiogLy9cblxuICBwcml2YXRlIHN0YXJ0TG9hZGluZyA9IChtc2c6IHN0cmluZyB8IGJvb2xlYW4gPSB0cnVlKSA9PiB7XG5cbiAgICBjb25zdCB1dWlkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygyNikuc2xpY2UoMikgKyBEYXRlLm5vdygpO1xuXG4gICAgdGhpcy5sb2FkaW5nTWFwW3V1aWRdID0gbXNnIHx8IHRydWU7XG5cbiAgICB0aGlzLmVtaXRMb2FkaW5nKCk7XG5cbiAgICByZXR1cm4gdXVpZDtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdG9wTG9hZGluZyA9ICh1dWlkKSA9PiB7XG5cbiAgICBpZiAodGhpcy5sb2FkaW5nTWFwW3V1aWRdKSB7XG5cbiAgICAgIGRlbGV0ZSB0aGlzLmxvYWRpbmdNYXBbdXVpZF07XG5cbiAgICB9XG5cbiAgICB0aGlzLmVtaXRMb2FkaW5nKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZW1pdExvYWRpbmcgPSAoKSA9PiB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMubG9hZGluZ01hcCk7XG4gICAgY29uc3QgaGFzTG9hZGluZyA9IGtleXMubGVuZ3RoID4gMDtcbiAgICBjb25zdCBsb2FkaW5nTWVzc2FnZSA9IHRoaXMubG9hZGluZ01hcFtrZXlzWzBdXTtcbiAgICB0aGlzLmxvYWRpbmdTdHJlYW0kLm5leHQoaGFzTG9hZGluZyA/IGxvYWRpbmdNZXNzYWdlIDogZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBmZXRjaEN1cnJlbnRMb2dnZWRVc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9hY2NvdW50Jyk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgaGVhZGVyczogdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCkgfTtcbiAgICByZXR1cm4gdGhpcy5nZXRNZXRob2Q8VXNlckF1dGhEYXRhPihlbmRwb2ludCwge30sIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLmV4dHJhdFNlc3Npb25Ub2tlbihyZXMpLFxuICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIHRyYW5zZm9ybURlY0ZpbHRlckluUGFyYW1zKGZpbHRlcjogRGVjRmlsdGVyKTogU2VyaWFsaXplZERlY0ZpbHRlciB7XG5cbiAgICBjb25zdCBzZXJpYWxpemVkRmlsdGVyOiBTZXJpYWxpemVkRGVjRmlsdGVyID0ge307XG5cbiAgICBpZiAoZmlsdGVyKSB7XG5cbiAgICAgIGlmIChmaWx0ZXIucGFnZSkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnBhZ2UgPSBmaWx0ZXIucGFnZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5saW1pdCkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLmxpbWl0ID0gZmlsdGVyLmxpbWl0O1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLmZpbHRlckdyb3Vwcykge1xuICAgICAgICBjb25zdCBmaWx0ZXJXaXRoVmFsdWVBc0FycmF5ID0gdGhpcy5nZXRGaWx0ZXJXaXRoVmFsdWVzQXNBcnJheShmaWx0ZXIuZmlsdGVyR3JvdXBzKTtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5maWx0ZXIgPSB0aGlzLmZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcoZmlsdGVyV2l0aFZhbHVlQXNBcnJheSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIucHJvamVjdFZpZXcpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5wcm9qZWN0VmlldyA9IHRoaXMuZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhmaWx0ZXIucHJvamVjdFZpZXcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLnNvcnQpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5zb3J0ID0gdGhpcy5maWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKGZpbHRlci5zb3J0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci50ZXh0U2VhcmNoKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIudGV4dFNlYXJjaCA9IGZpbHRlci50ZXh0U2VhcmNoO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlcmlhbGl6ZWRGaWx0ZXI7XG5cbiAgfVxuXG4gIHByaXZhdGUgZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhvYmopIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEZpbHRlcldpdGhWYWx1ZXNBc0FycmF5KGZpbHRlckdyb3Vwcykge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWx0ZXJHcm91cHMpKTsgLy8gbWFrZSBhIGNvcHkgb2YgdGhlIGZpbHRlciBzbyB3ZSBkbyBub3QgY2hhbmdlIHRoZSBvcmlnaW5hbCBmaWx0ZXJcblxuICAgIGlmIChmaWx0ZXJHcm91cENvcHkpIHtcblxuICAgICAgcmV0dXJuIGZpbHRlckdyb3VwQ29weS5tYXAoZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMgPSBmaWx0ZXJHcm91cC5maWx0ZXJzLm1hcChmaWx0ZXIgPT4ge1xuXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGZpbHRlci52YWx1ZSkpIHtcbiAgICAgICAgICAgIGZpbHRlci52YWx1ZSA9IFtmaWx0ZXIudmFsdWVdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZpbHRlckdyb3VwO1xuXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiBmaWx0ZXJHcm91cHM7XG5cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUZpbGVzRm9ybURhdGEoZmlsZXM6IEZpbGVbXSkge1xuICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZpbGVzLmZvckVhY2goKGZpbGUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBmb3JtSXRlbU5hbWUgPSBpbmRleCA+IDAgPyBgZmlsZS0ke2luZGV4fWAgOiAnZmlsZSc7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoZm9ybUl0ZW1OYW1lLCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub0xvZ2luUGFnZSgpIHtcbiAgICBjb25zdCBuYWtlZEFwcERvbWFpbiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgICAucmVwbGFjZSgnaHR0cHM6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKCdodHRwOi8vJywgJycpXG4gICAgICAucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uc2VhcmNoLCAnJyk7XG5cbiAgICBjb25zdCBuYWtlZEF1dGhEb21haW4gPSB0aGlzLmRlY0NvbmZpZy5jb25maWcuYXV0aEhvc3Quc3BsaXQoJz8nKVswXVxuICAgICAgLnJlcGxhY2UoJ2h0dHBzOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnaHR0cDovLycsICcnKVxuICAgICAgLnJlcGxhY2UoJy8vJywgJycpO1xuXG4gICAgaWYgKG5ha2VkQXBwRG9tYWluICE9PSBuYWtlZEF1dGhEb21haW4pIHtcbiAgICAgIGNvbnN0IGF1dGhVcmxXaXRoUmVkaXJlY3QgPSBgJHt0aGlzLmRlY0NvbmZpZy5jb25maWcuYXV0aEhvc3R9JHt0aGlzLmdldFBhcmFtc0RpdmlkZXIoKX1yZWRpcmVjdFVybD0ke3dpbmRvdy5sb2NhdGlvbi5ocmVmfWA7XG4gICAgICBjb25zb2xlLmxvZyhgRGVjQXBpU2VydmljZTo6IE5vdCBhdXRoZW50aWNhdGVkLiBSZWRpcmVjdGluZyB0byBsb2dpbiBwYWdlIGF0OiAke2F1dGhVcmxXaXRoUmVkaXJlY3R9YCk7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGF1dGhVcmxXaXRoUmVkaXJlY3Q7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXJhbXNEaXZpZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmRlY0NvbmZpZy5jb25maWcuYXV0aEhvc3Quc3BsaXQoJz8nKS5sZW5ndGggPiAxID8gJyYnIDogJz8nO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlUb0xvYWRTaWduZWRJblVzZXIoKSB7XG4gICAgY29uc3QgY2FsbCA9IHRoaXMuZmV0Y2hDdXJyZW50TG9nZ2VkVXNlcigpLnRvUHJvbWlzZSgpO1xuICAgIGNhbGwudGhlbihhY2NvdW50ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBEZWNvcmFBcGlTZXJ2aWNlOjogSW5pdGlhbGl6ZWQgYXMgJHthY2NvdW50Lm5hbWV9YCk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0RlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXplZCBhcyBub3QgbG9nZ2VkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdEZWNvcmFBcGlTZXJ2aWNlOjogSW5pdGlhbGl6YXRpb24gRXJyb3IuIENvdWxkIHJldHJpZXZlIHVzZXIgYWNjb3VudCcsIGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICBwcml2YXRlIG5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4odHlwZT86IHN0cmluZywgaGVhZGVycz86IEh0dHBIZWFkZXJzKSB7XG4gICAgaGVhZGVycyA9IGhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgY29uc3QgY3VzdG9taXplZENvbnRlbnRUeXBlID0gaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICghY3VzdG9taXplZENvbnRlbnRUeXBlICYmIHR5cGUpIHtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgdHlwZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlc3Npb25Ub2tlbikge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdYLUF1dGgtVG9rZW4nLCB0aGlzLnNlc3Npb25Ub2tlbik7XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYXRTZXNzaW9uVG9rZW4ocmVzKSB7XG4gICAgdGhpcy5zZXNzaW9uVG9rZW4gPSByZXMgJiYgcmVzLnNlc3Npb24gPyByZXMuc2Vzc2lvbi5pZCA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1VzZXIoKSB7XG4gICAgdGhpcy51c2VyU3Vic2NyaXBpb24gPSB0aGlzLnVzZXIkLnN1YnNjcmliZSh1c2VyID0+IHtcbiAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9Vc2VyKCkge1xuICAgIHRoaXMudXNlclN1YnNjcmlwaW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Mb2FkaW5nKCkge1xuICAgIHRoaXMubG9hZGluZyQgPSB0aGlzLmxvYWRpbmdTdHJlYW0kLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpO1xuICB9XG5cbiAgLypcbiAgKiBTaGFyZSBPYnNlcnZhYmxlXG4gICpcbiAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIHNoYXJlIHRoZSBhY3R1YWwgZGF0YSB2YWx1ZXMgYW5kIG5vdCBqdXN0IHRoZSBvYnNlcnZhYmxlIGluc3RhbmNlXG4gICpcbiAgKiBUbyByZXVzZSBhIHNpbmdsZSwgY29tbW9uIHN0cmVhbSBhbmQgYXZvaWQgbWFraW5nIGFub3RoZXIgc3Vic2NyaXB0aW9uIHRvIHRoZSBzZXJ2ZXIgcHJvdmlkaW5nIHRoYXQgZGF0YS5cbiAgKlxuICAqL1xuICBwcml2YXRlIHNoYXJlT2JzZXJ2YWJsZShjYWxsOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICByZXR1cm4gY2FsbC5waXBlKHNoYXJlKCkpO1xuICB9XG59XG4iXX0=