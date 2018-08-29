import { Injectable, Component, Input, ContentChild, TemplateRef, EventEmitter, Output, NgModule, ViewChild, ContentChildren, forwardRef, ComponentFactoryResolver, ViewContainerRef, ElementRef, HostListener, Renderer, Directive, SkipSelf, Optional, Inject, InjectionToken, defineInjectable, inject } from '@angular/core';
import { MatSnackBar, MatAutocompleteTrigger, MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule, MatChipsModule, MatDialogRef, MatDialog, MatDialogModule, MatToolbarModule, MatMenuModule, MatIconRegistry, MatCardModule, MatSnackBarModule, MatExpansionModule, MatTooltipModule, MatSidenavModule, MatListModule, MatProgressBarModule, MatTabsModule } from '@angular/material';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatSnackBar as MatSnackBar$1 } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, share, tap, debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, PlatformLocation } from '@angular/common';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NguCarouselModule } from '@ngu/carousel';
import 'hammerjs';
import { __spread, __assign } from 'tslib';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSnackBarService = /** @class */ (function () {
    function DecSnackBarService(snackBarService, translate) {
        this.snackBarService = snackBarService;
        this.translate = translate;
    }
    /**
     * @param {?} message
     * @param {?} type
     * @param {?=} duration
     * @return {?}
     */
    DecSnackBarService.prototype.open = /**
     * @param {?} message
     * @param {?} type
     * @param {?=} duration
     * @return {?}
     */
    function (message, type, duration) {
        if (duration === void 0) { duration = 4e3; }
        var /** @type {?} */ msg = this.translate.instant(message);
        var /** @type {?} */ snackClass = this.getClass(type);
        return this.snackBarService.open(msg, '', {
            duration: duration,
            panelClass: snackClass
        });
    };
    /**
     * @param {?} type
     * @return {?}
     */
    DecSnackBarService.prototype.getClass = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        switch (type) {
            case 'success':
                return 'snack-success';
            case 'primary':
                return 'snack-primary';
            case 'info':
                return 'snack-info';
            case 'warn':
                return 'snack-warn';
            case 'error':
                return 'snack-error';
        }
    };
    DecSnackBarService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    DecSnackBarService.ctorParameters = function () { return [
        { type: MatSnackBar },
        { type: TranslateService }
    ]; };
    /** @nocollapse */ DecSnackBarService.ngInjectableDef = defineInjectable({ factory: function DecSnackBarService_Factory() { return new DecSnackBarService(inject(MatSnackBar$1), inject(TranslateService)); }, token: DecSnackBarService, providedIn: "root" });
    return DecSnackBarService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ CONFIG_PATH = 'assets/configuration/configuration.json';
var DecConfigurationService = /** @class */ (function () {
    function DecConfigurationService(http, serviceConfiguration) {
        this.http = http;
        this.serviceConfiguration = serviceConfiguration;
        this.profile = 'local';
    }
    Object.defineProperty(DecConfigurationService.prototype, "config", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._config !== v) {
                this._config = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecConfigurationService.prototype.loadConfig = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ basePath = this.serviceConfiguration.basePath;
        var /** @type {?} */ path = basePath + "/" + CONFIG_PATH;
        var /** @type {?} */ call = this.http.get(path).toPromise();
        call.then(function (res) {
            console.log("DecConfigurationService:: Initialized in " + _this.profile + " mode");
            _this.profile = _this.isValidProfile(res.profile, res) ? res.profile : _this.profile;
            _this.config = res[_this.profile];
        }, function (err) {
            console.error('DecConfigurationService:: Initialization Error. Could retrieve app configuration', err);
        });
        return call;
    };
    /**
     * @param {?} profile
     * @param {?} availableProfiles
     * @return {?}
     */
    DecConfigurationService.prototype.isValidProfile = /**
     * @param {?} profile
     * @param {?} availableProfiles
     * @return {?}
     */
    function (profile, availableProfiles) {
        var /** @type {?} */ availables = Object.keys(availableProfiles);
        return (availables.indexOf(profile) >= 0) ? true : false;
    };
    DecConfigurationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecConfigurationService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['DECORA_CONFIGURATION_SERVICE_CONFIG',] }] }
    ]; };
    return DecConfigurationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
    function (filter$$1) {
        var /** @type {?} */ serializedFilter = {};
        if (filter$$1) {
            if (filter$$1.page) {
                serializedFilter.page = filter$$1.page;
            }
            if (filter$$1.limit) {
                serializedFilter.limit = filter$$1.limit;
            }
            if (filter$$1.filterGroups) {
                var /** @type {?} */ filterWithValueAsArray = this.getFilterWithValuesAsArray(filter$$1.filterGroups);
                serializedFilter.filter = this.filterObjectToQueryString(filterWithValueAsArray);
            }
            if (filter$$1.projectView) {
                serializedFilter.projectView = this.filterObjectToQueryString(filter$$1.projectView);
            }
            if (filter$$1.sort) {
                serializedFilter.sort = this.filterObjectToQueryString(filter$$1.sort);
            }
            if (filter$$1.textSearch) {
                serializedFilter.textSearch = filter$$1.textSearch;
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
                filterGroup.filters = filterGroup.filters.map(function (filter$$1) {
                    if (!Array.isArray(filter$$1.value)) {
                        filter$$1.value = [filter$$1.value];
                    }
                    return filter$$1;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop = function () {
};
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteComponent; }),
    multi: true
};
var DecAutocompleteComponent = /** @class */ (function () {
    function DecAutocompleteComponent(service) {
        var _this = this;
        this.service = service;
        this.separatorKeysCodes = [ENTER, COMMA];
        this.name = 'autocompleteInput';
        this.placeholder = '';
        // Events
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.enterButton = new EventEmitter();
        this.innerOptions = [];
        this.responses = {};
        this.search$ = new BehaviorSubject(undefined);
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.extractLabel = function (item) {
            var /** @type {?} */ label = item; // use the object itself if no label function or attribute is provided
            if (item) {
                if (_this.labelFn) {
                    // Use custom label function if provided
                    label = _this.labelFn(item);
                }
                else if (_this.labelAttr) {
                    // Use object label attribute if provided
                    label = item[_this.labelAttr] || undefined;
                }
            }
            label = _this.ensureString(label);
            return label;
        };
        this.extractValue = function (item) {
            var /** @type {?} */ value = item; // use the object itself if no value function or attribute is provided
            if (item) {
                if (_this.valueFn) {
                    // Use custom value function if provided
                    value = _this.valueFn(item);
                }
                else if (_this.valueAttr) {
                    // Use object value attribute if provided
                    value = item[_this.valueAttr] || undefined;
                }
            }
            return value;
        };
        this.getSelectableOptions = function (options) {
            var /** @type {?} */ isArray = options ? Array.isArray(options) : false;
            var /** @type {?} */ selectableOptions = options;
            if (isArray && !_this.repeat) {
                selectableOptions = options.filter(function (option) {
                    if (!_this.repeat) {
                        var /** @type {?} */ optionValue_1 = _this.extractValue(option);
                        var /** @type {?} */ alreadySelected = void 0;
                        if (_this.multi) {
                            alreadySelected = _this.optionsSelected && _this.optionsSelected.find(function (selected) {
                                var /** @type {?} */ selectedValue = _this.extractValue(selected);
                                return _this.compareAsString(selectedValue, optionValue_1);
                            }) ? true : false;
                        }
                        else {
                            alreadySelected = _this.compareAsString(_this.value, optionValue_1);
                        }
                        return !alreadySelected;
                    }
                    else {
                        return true;
                    }
                });
            }
            return selectableOptions;
        };
        this.createInput();
        this.subscribeToSearchAndSetOptionsObservable();
        this.subscribeToInputValueChanges();
    }
    Object.defineProperty(DecAutocompleteComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._disabled = v;
            if (this.autocompleteInput) {
                if (v) {
                    this.autocompleteInput.disable();
                }
                else {
                    this.autocompleteInput.enable();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            return this._options;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._options = v;
            this.innerOptions = v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.detectRequiredData();
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeToInputValueChanges();
    };
    Object.defineProperty(DecAutocompleteComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        /*
        ** ngModel VALUE
        */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.setInnerValue(v);
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecAutocompleteComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecAutocompleteComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== null && "" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.optionsSelected = [];
            this.writtenValue = value;
            this.populateAutocompleteWithInitialValues(value, true);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteComponent.prototype.onOptionSelected = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ shouldEmit = true;
        var /** @type {?} */ selectedOption = $event.option.value;
        var /** @type {?} */ selectedOptionValue = this.extractValue(selectedOption);
        if (selectedOptionValue !== this.value) {
            if (this.multi) {
                shouldEmit = this.addOptionToOptionsSelected(selectedOption);
                this.setInputValue(undefined);
            }
            else {
                this.value = selectedOptionValue;
            }
            if (shouldEmit) {
                this.optionSelected.emit({
                    value: this.value,
                    option: selectedOption,
                    options: this.innerOptions,
                });
            }
            this.blurInput();
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteComponent.prototype.onEnterButton = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.enterButton.emit($event);
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.setFocus = /**
     * @return {?}
     */
    function () {
        this.termInput.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.openPanel = /**
     * @return {?}
     */
    function () {
        this.autocompleteTrigger.openPanel();
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.closePanel = /**
     * @return {?}
     */
    function () {
        this.autocompleteTrigger.closePanel();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteComponent.prototype.onBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    /**
     * @param {?=} reopen
     * @return {?}
     */
    DecAutocompleteComponent.prototype.clear = /**
     * @param {?=} reopen
     * @return {?}
     */
    function (reopen) {
        var _this = this;
        if (reopen === void 0) { reopen = false; }
        this.value = undefined;
        this.optionsSelected = undefined;
        this.setInputValue('');
        if (this.writtenValue === this.value) {
            this.resetInputControl();
        }
        if (reopen) {
            setTimeout(function () {
                _this.openPanel();
            }, 1);
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.value = this.writtenValue;
        this.populateAutocompleteWithInitialValues(this.writtenValue);
        this.resetInputControl();
    };
    /**
     * @param {?} option
     * @return {?}
     */
    DecAutocompleteComponent.prototype.remove = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        var /** @type {?} */ index = this.optionsSelected.indexOf(option);
        if (index >= 0) {
            this.optionsSelected.splice(index, 1);
        }
        this.updateValueWithOptionsSelected();
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.setInputValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.autocompleteInput.setValue(v);
        if (!v) {
            this.termInput.nativeElement.value = '';
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.blurInput = /**
     * @return {?}
     */
    function () {
        this.termInput.nativeElement.blur();
    };
    /**
     * @param {?} option
     * @return {?}
     */
    DecAutocompleteComponent.prototype.addOptionToOptionsSelected = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option) {
            var /** @type {?} */ shouldEmit = true;
            if (this.optionsSelected && this.optionsSelected.length) {
                var /** @type {?} */ index = this.optionsSelected.indexOf(option);
                if (index === -1) {
                    this.optionsSelected.push(option);
                    this.setInputValue(null);
                    this.updateValueWithOptionsSelected();
                }
                else {
                    shouldEmit = false;
                }
            }
            else {
                this.optionsSelected = [option];
                this.updateValueWithOptionsSelected();
            }
            return shouldEmit;
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} value
     * @param {?=} reloadOptions
     * @return {?}
     */
    DecAutocompleteComponent.prototype.populateAutocompleteWithInitialValues = /**
     * @param {?} value
     * @param {?=} reloadOptions
     * @return {?}
     */
    function (value, reloadOptions) {
        var _this = this;
        if (reloadOptions === void 0) { reloadOptions = false; }
        if (this.multi) {
            var /** @type {?} */ isArray = Array.isArray(value);
            if (isArray) {
                this.optionsSelected = [];
                value.forEach(function (optionValue) {
                    _this.loadRemoteObjectByWrittenValue(optionValue)
                        .then(function (option) {
                        _this.addOptionToOptionsSelected(option);
                    });
                });
            }
        }
        else {
            this.loadRemoteObjectByWrittenValue(value)
                .then(function (options) {
                _this.setInnerValue(value);
            });
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.updateValueWithOptionsSelected = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.optionsSelected && this.optionsSelected.length) {
            this.value = this.optionsSelected.map(function (option) { return _this.extractValue(option); });
        }
        else {
            this.value = undefined;
        }
    };
    /**
     * @param {?} writtenValue
     * @return {?}
     */
    DecAutocompleteComponent.prototype.loadRemoteObjectByWrittenValue = /**
     * @param {?} writtenValue
     * @return {?}
     */
    function (writtenValue) {
        var _this = this;
        console.log('loadRemoteObjectByWrittenValue', writtenValue);
        return new Promise(function (resolve, reject) {
            if (writtenValue) {
                _this.searchBasedFetchingType(writtenValue, true)
                    .subscribe(function (res) {
                    resolve(res[0]);
                });
            }
            else {
                resolve(writtenValue);
            }
        });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.detectRequiredData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ error;
            if (!_this.endpoint && !_this.options && !_this.customFetchFunction) {
                error = 'No endpoint | options | customFetchFunction set. You must provide one of them to be able to use the Autocomplete';
            }
            if (error) {
                _this.raiseError(error);
                reject(error);
            }
            else {
                resolve();
            }
        });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.resetInputControl = /**
     * @return {?}
     */
    function () {
        this.autocompleteInput.markAsPristine();
        this.autocompleteInput.markAsUntouched();
        this.blurInput();
    };
    /**
     * @param {?} v1
     * @param {?} v2
     * @return {?}
     */
    DecAutocompleteComponent.prototype.compareAsString = /**
     * @param {?} v1
     * @param {?} v2
     * @return {?}
     */
    function (v1, v2) {
        var /** @type {?} */ string1 = this.ensureString(v1);
        var /** @type {?} */ string2 = this.ensureString(v2);
        return string1 === string2;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.ensureString = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        if (typeof v !== 'string') {
            if (isNaN(v)) {
                v = JSON.stringify(v);
            }
            else {
                v = "" + v;
            }
        }
        return v;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.setInnerValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.innerValue = v;
        this.setInputValueBasedOnInnerValue(v);
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.setInputValueBasedOnInnerValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        var /** @type {?} */ option = this.getOptionBasedOnValue(v);
        this.setInputValue(option);
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.getOptionBasedOnValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        var _this = this;
        return this.innerOptions.find(function (item) {
            var /** @type {?} */ itemValue = _this.extractValue(item);
            return _this.compareAsString(itemValue, v);
        });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.createInput = /**
     * @return {?}
     */
    function () {
        this.autocompleteInput = new FormControl('');
        if (this.disabled) {
            this.autocompleteInput.disable();
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.subscribeToInputValueChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.searchInputSubscription = this.autocompleteInput.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(function (searchText) {
            _this.search$.next(searchText);
        });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.unsubscribeToInputValueChanges = /**
     * @return {?}
     */
    function () {
        this.searchInputSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.subscribeToSearchAndSetOptionsObservable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.options$ = this.search$
            .pipe(map(function (v) { return v ? v : ''; }), distinctUntilChanged(), switchMap(function (textSearch) {
            var /** @type {?} */ searchTerm = textSearch || '';
            var /** @type {?} */ isStringTerm = typeof searchTerm === 'string';
            if (isStringTerm) {
                return _this.searchBasedFetchingType(searchTerm);
            }
            else {
                return of(_this.innerOptions);
            }
        }));
    };
    /**
     * @param {?} textSearch
     * @param {?=} rememberResponse
     * @return {?}
     */
    DecAutocompleteComponent.prototype.searchBasedFetchingType = /**
     * @param {?} textSearch
     * @param {?=} rememberResponse
     * @return {?}
     */
    function (textSearch, rememberResponse) {
        var _this = this;
        if (rememberResponse === void 0) { rememberResponse = false; }
        if (this.options) {
            return this.searchInLocalOptions(textSearch);
        }
        else if (this.customFetchFunction) {
            return this.customFetchFunction(textSearch)
                .pipe(tap(function (options) {
                _this.innerOptions = options;
            }));
        }
        else {
            var /** @type {?} */ body = textSearch ? { textSearch: textSearch } : undefined;
            if (rememberResponse) {
                var /** @type {?} */ dataInMemory = this.responses[textSearch];
                if (dataInMemory) {
                    return of(dataInMemory);
                }
                else {
                    return this.service.get(this.endpoint, body)
                        .pipe(tap(function (options) {
                        _this.responses[textSearch] = options;
                        _this.innerOptions = options;
                    }));
                }
            }
            else {
                return this.service.get(this.endpoint, body)
                    .pipe(tap(function (options) {
                    _this.innerOptions = options;
                }));
            }
        }
    };
    /**
     * @param {?} term
     * @return {?}
     */
    DecAutocompleteComponent.prototype.searchInLocalOptions = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var _this = this;
        var /** @type {?} */ termString = "" + term;
        var /** @type {?} */ filteredData = this.innerOptions;
        if (termString) {
            filteredData = this.innerOptions
                .filter(function (item) {
                var /** @type {?} */ label = _this.extractLabel(item);
                var /** @type {?} */ lowerCaseLabel = label.toLowerCase();
                var /** @type {?} */ lowerCaseTerm = termString.toLowerCase();
                return lowerCaseLabel.search(lowerCaseTerm) >= 0;
            });
        }
        return of(filteredData);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    DecAutocompleteComponent.prototype.raiseError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        throw new Error("DecAutocompleteComponent Error:: The autocomplete with name \"" + this.name + "\" had the follow problem: " + error);
    };
    DecAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete',
                    template: "<ng-container [ngSwitch]=\"multi ? true : false\">\n\n  <ng-container *ngSwitchCase=\"true\">\n    <mat-form-field>\n      <mat-chip-list #decAutocompleteChipList>\n        <mat-chip *ngFor=\"let option of optionsSelected\" [removable]=\"true\" (removed)=\"remove(option)\">\n          {{ extractLabel(option) }}\n          <mat-icon matChipRemove>cancel</mat-icon>\n        </mat-chip>\n        <input matInput [attr.aria-label]=\"name\" #termInput [matAutocomplete]=\"decAutocomplete\" [formControl]=\"autocompleteInput\"\n          [name]=\"name\" [required]=\"required\" [placeholder]=\"placeholder\" (keyup.enter)=\"onEnterButton($event)\" (blur)=\"onBlur($event)\"\n          autocomplete=\"off\" readonly onfocus=\"this.removeAttribute('readonly');\"\n          [matChipInputFor]=\"decAutocompleteChipList\" [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\">\n        <button mat-icon-button matSuffix (click)=\"clear(true)\" *ngIf=\"!disabled && !required && value\">\n          <mat-icon>close</mat-icon>\n        </button>\n        <button mat-icon-button matSuffix (click)=\"reset()\" *ngIf=\"!disabled && value !== writtenValue\">\n          <mat-icon>replay</mat-icon>\n        </button>\n      </mat-chip-list>\n      <mat-autocomplete #decAutocomplete=\"matAutocomplete\" [displayWith]=\"extractLabel\" (optionSelected)=\"onOptionSelected($event)\"\n        name=\"autocompleteValue\">\n        <mat-option *ngFor=\"let item of getSelectableOptions(options$ | async)\" [value]=\"item\">\n          {{ extractLabel(item) }}\n        </mat-option>\n      </mat-autocomplete>\n    </mat-form-field>\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"false\">\n    <mat-form-field>\n      <input matInput [attr.aria-label]=\"name\" #termInput [matAutocomplete]=\"decAutocomplete\" [formControl]=\"autocompleteInput\"\n        [name]=\"name\" [required]=\"required\" [placeholder]=\"placeholder\" (keyup.enter)=\"onEnterButton($event)\" (blur)=\"onBlur($event)\"\n        autocomplete=\"off\" readonly onfocus=\"this.removeAttribute('readonly');\">\n      <button mat-icon-button matSuffix (click)=\"clear(true)\" *ngIf=\"!disabled && !required && value\">\n        <mat-icon>close</mat-icon>\n      </button>\n      <button mat-icon-button matSuffix (click)=\"reset()\" *ngIf=\"!disabled && value !== writtenValue\">\n        <mat-icon>replay</mat-icon>\n      </button>\n    </mat-form-field>\n    <mat-autocomplete #decAutocomplete=\"matAutocomplete\" [displayWith]=\"extractLabel\" (optionSelected)=\"onOptionSelected($event)\"\n      name=\"autocompleteValue\">\n      <mat-option *ngIf=\"!required\" [value]=\"\"></mat-option>\n      <mat-option *ngFor=\"let item of getSelectableOptions(options$ | async)\" [value]=\"item\">\n        {{ extractLabel(item) }}\n      </mat-option>\n    </mat-autocomplete>\n  </ng-container>\n\n</ng-container>\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecAutocompleteComponent.propDecorators = {
        autocompleteTrigger: [{ type: ViewChild, args: [MatAutocompleteTrigger,] }],
        customFetchFunction: [{ type: Input }],
        endpoint: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        disabled: [{ type: Input }],
        labelFn: [{ type: Input }],
        labelAttr: [{ type: Input }],
        name: [{ type: Input }],
        options: [{ type: Input }],
        placeholder: [{ type: Input }],
        required: [{ type: Input }],
        valueFn: [{ type: Input }],
        valueAttr: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }],
        enterButton: [{ type: Output }],
        termInput: [{ type: ViewChild, args: ['termInput',] }],
        chipList: [{ type: ViewChild, args: ['chipList',] }]
    };
    return DecAutocompleteComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecAutocompleteModule = /** @class */ (function () {
    function DecAutocompleteModule() {
    }
    DecAutocompleteModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatAutocompleteModule,
                        MatChipsModule,
                        MatInputModule,
                        MatButtonModule,
                        MatIconModule,
                        FormsModule,
                        ReactiveFormsModule,
                    ],
                    declarations: [DecAutocompleteComponent],
                    exports: [DecAutocompleteComponent]
                },] },
    ];
    return DecAutocompleteModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop$1 = function () {
};
var /** @type {?} */ ACCOUNTS_ENDPOINT = 'accounts/options';
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteAccountComponent; }),
    multi: true
};
var DecAutocompleteAccountComponent = /** @class */ (function () {
    function DecAutocompleteAccountComponent(decoraApi) {
        this.decoraApi = decoraApi;
        this.valueAttr = 'key';
        this.name = 'Account autocomplete';
        this.placeholder = 'Account autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$1;
        this.onChangeCallback = noop$1;
    }
    Object.defineProperty(DecAutocompleteAccountComponent.prototype, "types", {
        get: /**
         * @return {?}
         */
        function () {
            return this._types;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._types) {
                this._types = v;
                if (this.initialized) {
                    this.setRolesParams();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.initialized = true;
        setTimeout(function () {
            _this.setRolesParams();
        }, 0);
    };
    Object.defineProperty(DecAutocompleteAccountComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== null && "" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    /**
     * @param {?} account
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.labelFn = /**
     * @param {?} account
     * @return {?}
     */
    function (account) {
        return account.value + " #" + account.key;
    };
    /**
     * @return {?}
     */
    DecAutocompleteAccountComponent.prototype.setRolesParams = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ params = [];
        var /** @type {?} */ endpoint = "" + ACCOUNTS_ENDPOINT;
        if (this.types && this.types.length) {
            params.push("roles=" + encodeURI(JSON.stringify(this.types)));
        }
        if (params.length) {
            endpoint += "?" + params.join('&');
        }
        this.endpoint = endpoint;
    };
    DecAutocompleteAccountComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-account',
                    template: "<dec-autocomplete *ngIf=\"endpoint\"\n[disabled]=\"disabled\"\n[required]=\"required\"\n[endpoint]=\"endpoint\"\n[name]=\"name\"\n[multi]=\"multi\"\n[repeat]=\"repeat\"\n[labelFn]=\"labelFn\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[(ngModel)]=\"value\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteAccountComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecAutocompleteAccountComponent.propDecorators = {
        types: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }]
    };
    return DecAutocompleteAccountComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecAutocompleteAccountModule = /** @class */ (function () {
    function DecAutocompleteAccountModule() {
    }
    DecAutocompleteAccountModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        DecAutocompleteModule,
                    ],
                    declarations: [DecAutocompleteAccountComponent],
                    exports: [DecAutocompleteAccountComponent]
                },] },
    ];
    return DecAutocompleteAccountModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop$2 = function () {
};
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteCompanyComponent; }),
    multi: true
};
var DecAutocompleteCompanyComponent = /** @class */ (function () {
    function DecAutocompleteCompanyComponent() {
        this.endpoint = 'companies/options';
        this.valueAttr = 'key';
        this.name = 'Company autocomplete';
        this.placeholder = 'Company autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$2;
        this.onChangeCallback = noop$2;
    }
    Object.defineProperty(DecAutocompleteCompanyComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} company
     * @return {?}
     */
    DecAutocompleteCompanyComponent.prototype.labelFn = /**
     * @param {?} company
     * @return {?}
     */
    function (company) {
        return company.value + " #" + company.key;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteCompanyComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteCompanyComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecAutocompleteCompanyComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecAutocompleteCompanyComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== null && "" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteCompanyComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    DecAutocompleteCompanyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-company',
                    template: "<dec-autocomplete\n[required]=\"required\"\n[name]=\"name\"\n[multi]=\"multi\"\n[repeat]=\"repeat\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[endpoint]=\"endpoint\"\n[(ngModel)]=\"value\"\n[labelFn]=\"labelFn\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteCompanyComponent.ctorParameters = function () { return []; };
    DecAutocompleteCompanyComponent.propDecorators = {
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }]
    };
    return DecAutocompleteCompanyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecAutocompleteCompanyModule = /** @class */ (function () {
    function DecAutocompleteCompanyModule() {
    }
    DecAutocompleteCompanyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        DecAutocompleteModule,
                    ],
                    declarations: [DecAutocompleteCompanyComponent],
                    exports: [DecAutocompleteCompanyComponent]
                },] },
    ];
    return DecAutocompleteCompanyModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop$3 = function () {
};
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteCountryComponent; }),
    multi: true
};
var DecAutocompleteCountryComponent = /** @class */ (function () {
    function DecAutocompleteCountryComponent() {
        this.lang = 'en';
        this.name = 'Country autocomplete';
        this.placeholder = 'Country autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$3;
        this.onChangeCallback = noop$3;
        this.labelFn = function (item) {
            return item ? item.name : item;
        };
        this.valueFn = function (item) {
            return item ? item.code : item;
        };
        this.countries$ = of(FAKE_DATA);
    }
    Object.defineProperty(DecAutocompleteCountryComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteCountryComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteCountryComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecAutocompleteCountryComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecAutocompleteCountryComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== null && "" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteCountryComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    DecAutocompleteCountryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-country',
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[name]=\"name\"\n[multi]=\"multi\"\n[repeat]=\"repeat\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[options]=\"(countries$ | async)\"\n[(ngModel)]=\"value\"\n[labelFn]=\"labelFn\"\n[valueFn]=\"valueFn\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteCountryComponent.ctorParameters = function () { return []; };
    DecAutocompleteCountryComponent.propDecorators = {
        lang: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }]
    };
    return DecAutocompleteCountryComponent;
}());
var /** @type {?} */ FAKE_DATA = [{ 'code': 'AD', 'name': 'Andorra' }, { 'code': 'AE', 'name': 'United Arab Emirates' }, { 'code': 'AF', 'name': 'Afghanistan' }, { 'code': 'AG', 'name': 'Antigua and Barbuda' }, { 'code': 'AI', 'name': 'Anguilla' }, { 'code': 'AL', 'name': 'Albania' }, { 'code': 'AM', 'name': 'Armenia' }, { 'code': 'AN', 'name': 'Netherlands Antilles' }, { 'code': 'AO', 'name': 'Angola' }, { 'code': 'AQ', 'name': 'Antarctica' }, { 'code': 'AR', 'name': 'Argentina' }, { 'code': 'AS', 'name': 'American Samoa' }, { 'code': 'AT', 'name': 'Austria' }, { 'code': 'AU', 'name': 'Australia' }, { 'code': 'AW', 'name': 'Aruba' }, { 'code': 'AX', 'name': 'Åland Islands' }, { 'code': 'AZ', 'name': 'Azerbaijan' }, { 'code': 'BA', 'name': 'Bosnia and Herzegovina' }, { 'code': 'BB', 'name': 'Barbados' }, { 'code': 'BD', 'name': 'Bangladesh' }, { 'code': 'BE', 'name': 'Belgium' }, { 'code': 'BF', 'name': 'Burkina Faso' }, { 'code': 'BG', 'name': 'Bulgaria' }, { 'code': 'BH', 'name': 'Bahrain' }, { 'code': 'BI', 'name': 'Burundi' }, { 'code': 'BJ', 'name': 'Benin' }, { 'code': 'BL', 'name': 'Saint Barthélemy' }, { 'code': 'BM', 'name': 'Bermuda' }, { 'code': 'BN', 'name': 'Brunei' }, { 'code': 'BO', 'name': 'Bolivia' }, { 'code': 'BQ', 'name': 'Bonaire, Sint Eustatius and Saba' }, { 'code': 'BR', 'name': 'Brazil' }, { 'code': 'BS', 'name': 'Bahamas' }, { 'code': 'BT', 'name': 'Bhutan' }, { 'code': 'BV', 'name': 'Bouvet Island' }, { 'code': 'BW', 'name': 'Botswana' }, { 'code': 'BY', 'name': 'Belarus' }, { 'code': 'BZ', 'name': 'Belize' }, { 'code': 'CA', 'name': 'Canada' }, { 'code': 'CC', 'name': 'Cocos Islands' }, { 'code': 'CD', 'name': 'The Democratic Republic Of Congo' }, { 'code': 'CF', 'name': 'Central African Republic' }, { 'code': 'CG', 'name': 'Congo' }, { 'code': 'CH', 'name': 'Switzerland' }, { 'code': 'CI', 'name': 'Côte d\'Ivoire' }, { 'code': 'CK', 'name': 'Cook Islands' }, { 'code': 'CL', 'name': 'Chile' }, { 'code': 'CM', 'name': 'Cameroon' }, { 'code': 'CN', 'name': 'China' }, { 'code': 'CO', 'name': 'Colombia' }, { 'code': 'CR', 'name': 'Costa Rica' }, { 'code': 'CU', 'name': 'Cuba' }, { 'code': 'CV', 'name': 'Cape Verde' }, { 'code': 'CW', 'name': 'Curaçao' }, { 'code': 'CX', 'name': 'Christmas Island' }, { 'code': 'CY', 'name': 'Cyprus' }, { 'code': 'CZ', 'name': 'Czech Republic' }, { 'code': 'DE', 'name': 'Germany' }, { 'code': 'DJ', 'name': 'Djibouti' }, { 'code': 'DK', 'name': 'Denmark' }, { 'code': 'DM', 'name': 'Dominica' }, { 'code': 'DO', 'name': 'Dominican Republic' }, { 'code': 'DZ', 'name': 'Algeria' }, { 'code': 'EC', 'name': 'Ecuador' }, { 'code': 'EE', 'name': 'Estonia' }, { 'code': 'EG', 'name': 'Egypt' }, { 'code': 'EH', 'name': 'Western Sahara' }, { 'code': 'ER', 'name': 'Eritrea' }, { 'code': 'ES', 'name': 'Spain' }, { 'code': 'ET', 'name': 'Ethiopia' }, { 'code': 'FI', 'name': 'Finland' }, { 'code': 'FJ', 'name': 'Fiji' }, { 'code': 'FK', 'name': 'Falkland Islands' }, { 'code': 'FM', 'name': 'Micronesia' }, { 'code': 'FO', 'name': 'Faroe Islands' }, { 'code': 'FR', 'name': 'France' }, { 'code': 'GA', 'name': 'Gabon' }, { 'code': 'GB', 'name': 'United Kingdom' }, { 'code': 'GD', 'name': 'Grenada' }, { 'code': 'GE', 'name': 'Georgia' }, { 'code': 'GF', 'name': 'French Guiana' }, { 'code': 'GG', 'name': 'Guernsey' }, { 'code': 'GH', 'name': 'Ghana' }, { 'code': 'GI', 'name': 'Gibraltar' }, { 'code': 'GL', 'name': 'Greenland' }, { 'code': 'GM', 'name': 'Gambia' }, { 'code': 'GN', 'name': 'Guinea' }, { 'code': 'GP', 'name': 'Guadeloupe' }, { 'code': 'GQ', 'name': 'Equatorial Guinea' }, { 'code': 'GR', 'name': 'Greece' }, { 'code': 'GS', 'name': 'South Georgia And The South Sandwich Islands' }, { 'code': 'GT', 'name': 'Guatemala' }, { 'code': 'GU', 'name': 'Guam' }, { 'code': 'GW', 'name': 'Guinea-Bissau' }, { 'code': 'GY', 'name': 'Guyana' }, { 'code': 'HK', 'name': 'Hong Kong' }, { 'code': 'HM', 'name': 'Heard Island And McDonald Islands' }, { 'code': 'HN', 'name': 'Honduras' }, { 'code': 'HR', 'name': 'Croatia' }, { 'code': 'HT', 'name': 'Haiti' }, { 'code': 'HU', 'name': 'Hungary' }, { 'code': 'ID', 'name': 'Indonesia' }, { 'code': 'IE', 'name': 'Ireland' }, { 'code': 'IL', 'name': 'Israel' }, { 'code': 'IM', 'name': 'Isle Of Man' }, { 'code': 'IN', 'name': 'India' }, { 'code': 'IO', 'name': 'British Indian Ocean Territory' }, { 'code': 'IQ', 'name': 'Iraq' }, { 'code': 'IR', 'name': 'Iran' }, { 'code': 'IS', 'name': 'Iceland' }, { 'code': 'IT', 'name': 'Italy' }, { 'code': 'JE', 'name': 'Jersey' }, { 'code': 'JM', 'name': 'Jamaica' }, { 'code': 'JO', 'name': 'Jordan' }, { 'code': 'JP', 'name': 'Japan' }, { 'code': 'KE', 'name': 'Kenya' }, { 'code': 'KG', 'name': 'Kyrgyzstan' }, { 'code': 'KH', 'name': 'Cambodia' }, { 'code': 'KI', 'name': 'Kiribati' }, { 'code': 'KM', 'name': 'Comoros' }, { 'code': 'KN', 'name': 'Saint Kitts And Nevis' }, { 'code': 'KP', 'name': 'North Korea' }, { 'code': 'KR', 'name': 'South Korea' }, { 'code': 'KW', 'name': 'Kuwait' }, { 'code': 'KY', 'name': 'Cayman Islands' }, { 'code': 'KZ', 'name': 'Kazakhstan' }, { 'code': 'LA', 'name': 'Laos' }, { 'code': 'LB', 'name': 'Lebanon' }, { 'code': 'LC', 'name': 'Saint Lucia' }, { 'code': 'LI', 'name': 'Liechtenstein' }, { 'code': 'LK', 'name': 'Sri Lanka' }, { 'code': 'LR', 'name': 'Liberia' }, { 'code': 'LS', 'name': 'Lesotho' }, { 'code': 'LT', 'name': 'Lithuania' }, { 'code': 'LU', 'name': 'Luxembourg' }, { 'code': 'LV', 'name': 'Latvia' }, { 'code': 'LY', 'name': 'Libya' }, { 'code': 'MA', 'name': 'Morocco' }, { 'code': 'MC', 'name': 'Monaco' }, { 'code': 'MD', 'name': 'Moldova' }, { 'code': 'ME', 'name': 'Montenegro' }, { 'code': 'MF', 'name': 'Saint Martin' }, { 'code': 'MG', 'name': 'Madagascar' }, { 'code': 'MH', 'name': 'Marshall Islands' }, { 'code': 'MK', 'name': 'Macedonia' }, { 'code': 'ML', 'name': 'Mali' }, { 'code': 'MM', 'name': 'Myanmar' }, { 'code': 'MN', 'name': 'Mongolia' }, { 'code': 'MO', 'name': 'Macao' }, { 'code': 'MP', 'name': 'Northern Mariana Islands' }, { 'code': 'MQ', 'name': 'Martinique' }, { 'code': 'MR', 'name': 'Mauritania' }, { 'code': 'MS', 'name': 'Montserrat' }, { 'code': 'MT', 'name': 'Malta' }, { 'code': 'MU', 'name': 'Mauritius' }, { 'code': 'MV', 'name': 'Maldives' }, { 'code': 'MW', 'name': 'Malawi' }, { 'code': 'MX', 'name': 'Mexico' }, { 'code': 'MY', 'name': 'Malaysia' }, { 'code': 'MZ', 'name': 'Mozambique' }, { 'code': 'NA', 'name': 'Namibia' }, { 'code': 'NC', 'name': 'New Caledonia' }, { 'code': 'NE', 'name': 'Niger' }, { 'code': 'NF', 'name': 'Norfolk Island' }, { 'code': 'NG', 'name': 'Nigeria' }, { 'code': 'NI', 'name': 'Nicaragua' }, { 'code': 'NL', 'name': 'Netherlands' }, { 'code': 'NO', 'name': 'Norway' }, { 'code': 'NP', 'name': 'Nepal' }, { 'code': 'NR', 'name': 'Nauru' }, { 'code': 'NU', 'name': 'Niue' }, { 'code': 'NZ', 'name': 'New Zealand' }, { 'code': 'OM', 'name': 'Oman' }, { 'code': 'PA', 'name': 'Panama' }, { 'code': 'PE', 'name': 'Peru' }, { 'code': 'PF', 'name': 'French Polynesia' }, { 'code': 'PG', 'name': 'Papua New Guinea' }, { 'code': 'PH', 'name': 'Philippines' }, { 'code': 'PK', 'name': 'Pakistan' }, { 'code': 'PL', 'name': 'Poland' }, { 'code': 'PM', 'name': 'Saint Pierre And Miquelon' }, { 'code': 'PN', 'name': 'Pitcairn' }, { 'code': 'PR', 'name': 'Puerto Rico' }, { 'code': 'PS', 'name': 'Palestine' }, { 'code': 'PT', 'name': 'Portugal' }, { 'code': 'PW', 'name': 'Palau' }, { 'code': 'PY', 'name': 'Paraguay' }, { 'code': 'QA', 'name': 'Qatar' }, { 'code': 'RE', 'name': 'Reunion' }, { 'code': 'RO', 'name': 'Romania' }, { 'code': 'RS', 'name': 'Serbia' }, { 'code': 'RU', 'name': 'Russia' }, { 'code': 'RW', 'name': 'Rwanda' }, { 'code': 'SA', 'name': 'Saudi Arabia' }, { 'code': 'SB', 'name': 'Solomon Islands' }, { 'code': 'SC', 'name': 'Seychelles' }, { 'code': 'SD', 'name': 'Sudan' }, { 'code': 'SE', 'name': 'Sweden' }, { 'code': 'SG', 'name': 'Singapore' }, { 'code': 'SH', 'name': 'Saint Helena' }, { 'code': 'SI', 'name': 'Slovenia' }, { 'code': 'SJ', 'name': 'Svalbard And Jan Mayen' }, { 'code': 'SK', 'name': 'Slovakia' }, { 'code': 'SL', 'name': 'Sierra Leone' }, { 'code': 'SM', 'name': 'San Marino' }, { 'code': 'SN', 'name': 'Senegal' }, { 'code': 'SO', 'name': 'Somalia' }, { 'code': 'SR', 'name': 'Suriname' }, { 'code': 'SS', 'name': 'South Sudan' }, { 'code': 'ST', 'name': 'Sao Tome And Principe' }, { 'code': 'SV', 'name': 'El Salvador' }, { 'code': 'SX', 'name': 'Sint Maarten (Dutch part)' }, { 'code': 'SY', 'name': 'Syria' }, { 'code': 'SZ', 'name': 'Swaziland' }, { 'code': 'TC', 'name': 'Turks And Caicos Islands' }, { 'code': 'TD', 'name': 'Chad' }, { 'code': 'TF', 'name': 'French Southern Territories' }, { 'code': 'TG', 'name': 'Togo' }, { 'code': 'TH', 'name': 'Thailand' }, { 'code': 'TJ', 'name': 'Tajikistan' }, { 'code': 'TK', 'name': 'Tokelau' }, { 'code': 'TL', 'name': 'Timor-Leste' }, { 'code': 'TM', 'name': 'Turkmenistan' }, { 'code': 'TN', 'name': 'Tunisia' }, { 'code': 'TO', 'name': 'Tonga' }, { 'code': 'TR', 'name': 'Turkey' }, { 'code': 'TT', 'name': 'Trinidad and Tobago' }, { 'code': 'TV', 'name': 'Tuvalu' }, { 'code': 'TW', 'name': 'Taiwan' }, { 'code': 'TZ', 'name': 'Tanzania' }, { 'code': 'UA', 'name': 'Ukraine' }, { 'code': 'UG', 'name': 'Uganda' }, { 'code': 'UM', 'name': 'United States Minor Outlying Islands' }, { 'code': 'UY', 'name': 'Uruguay' }, { 'code': 'UZ', 'name': 'Uzbekistan' }, { 'code': 'VA', 'name': 'Vatican' }, { 'code': 'VC', 'name': 'Saint Vincent And The Grenadines' }, { 'code': 'VE', 'name': 'Venezuela' }, { 'code': 'VG', 'name': 'British Virgin Islands' }, { 'code': 'VI', 'name': 'U.S. Virgin Islands' }, { 'code': 'VN', 'name': 'Vietnam' }, { 'code': 'VU', 'name': 'Vanuatu' }, { 'code': 'WF', 'name': 'Wallis And Futuna' }, { 'code': 'WS', 'name': 'Samoa' }, { 'code': 'YE', 'name': 'Yemen' }, { 'code': 'YT', 'name': 'Mayotte' }, { 'code': 'ZA', 'name': 'South Africa' }, { 'code': 'ZM', 'name': 'Zambia' }, { 'code': 'ZW', 'name': 'Zimbabwe' }];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecAutocompleteCountryModule = /** @class */ (function () {
    function DecAutocompleteCountryModule() {
    }
    DecAutocompleteCountryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        DecAutocompleteModule,
                    ],
                    declarations: [DecAutocompleteCountryComponent],
                    exports: [DecAutocompleteCountryComponent]
                },] },
    ];
    return DecAutocompleteCountryModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ BASE_ENDPOINT = 'companies/${companyId}/departments/options';
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop$4 = function () {
};
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteDepartmentComponent; }),
    multi: true
};
var DecAutocompleteDepartmentComponent = /** @class */ (function () {
    function DecAutocompleteDepartmentComponent() {
        this.labelAttr = 'value';
        this.valueAttr = 'key';
        this.name = 'Department autocomplete';
        this.placeholder = 'Department autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$4;
        this.onChangeCallback = noop$4;
    }
    Object.defineProperty(DecAutocompleteDepartmentComponent.prototype, "companyId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._companyId;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._companyId = v;
            this.value = undefined;
            this.setEndpointBasedOncompanyId();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteDepartmentComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== null && "" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    /**
     * @return {?}
     */
    DecAutocompleteDepartmentComponent.prototype.setEndpointBasedOncompanyId = /**
     * @return {?}
     */
    function () {
        this.endpoint = !this.companyId ? undefined : BASE_ENDPOINT.replace('${companyId}', this.companyId);
    };
    DecAutocompleteDepartmentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-department',
                    template: "<div *ngIf=\"endpoint else fakeDisabled\">\n  <dec-autocomplete\n  [disabled]=\"!companyId || disabled\"\n  [endpoint]=\"endpoint\"\n  [labelAttr]=\"labelAttr\"\n  [name]=\"name\"\n  [multi]=\"multi\"\n  [repeat]=\"repeat\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteDepartmentComponent.ctorParameters = function () { return []; };
    DecAutocompleteDepartmentComponent.propDecorators = {
        companyId: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }]
    };
    return DecAutocompleteDepartmentComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecAutocompleteDepartmentModule = /** @class */ (function () {
    function DecAutocompleteDepartmentModule() {
    }
    DecAutocompleteDepartmentModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        DecAutocompleteModule,
                        MatInputModule
                    ],
                    declarations: [DecAutocompleteDepartmentComponent],
                    exports: [DecAutocompleteDepartmentComponent]
                },] },
    ];
    return DecAutocompleteDepartmentModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop$5 = function () {
};
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR$1 = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteRoleComponent; }),
    multi: true
};
var DecAutocompleteRoleComponent = /** @class */ (function () {
    function DecAutocompleteRoleComponent(decoraApi) {
        this.decoraApi = decoraApi;
        this.endpoint = 'roles/options';
        this.labelAttr = 'value';
        this.valueAttr = 'key';
        this.name = 'Role autocomplete';
        this.placeholder = 'Role autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$5;
        this.onChangeCallback = noop$5;
    }
    Object.defineProperty(DecAutocompleteRoleComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteRoleComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteRoleComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecAutocompleteRoleComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecAutocompleteRoleComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== null && "" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteRoleComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    DecAutocompleteRoleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-role',
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[name]=\"name\"\n[multi]=\"multi\" [repeat]=\"repeat\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[(ngModel)]=\"value\"\n[endpoint]=\"endpoint\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR$1]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteRoleComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecAutocompleteRoleComponent.propDecorators = {
        types: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }]
    };
    return DecAutocompleteRoleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecAutocompleteRoleModule = /** @class */ (function () {
    function DecAutocompleteRoleModule() {
    }
    DecAutocompleteRoleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        DecAutocompleteModule
                    ],
                    declarations: [DecAutocompleteRoleComponent],
                    exports: [DecAutocompleteRoleComponent]
                },] },
    ];
    return DecAutocompleteRoleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ BASE_AUTOCOMPLETE_PROJECT_ENDPOINT = '/legacy/project/search/keyValue';
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop$6 = function () {
};
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteProjectComponent; }),
    multi: true
};
var DecAutocompleteProjectComponent = /** @class */ (function () {
    function DecAutocompleteProjectComponent(decoraApi) {
        var _this = this;
        this.decoraApi = decoraApi;
        this.valueAttr = 'key';
        this.name = 'Project autocomplete';
        this.placeholder = 'Project autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$6;
        this.onChangeCallback = noop$6;
        this.customFetchFunction = function (textSearch) {
            var /** @type {?} */ params = {};
            params.textSearch = textSearch;
            _this.setEndpointBasedOnCompanyId();
            return _this.decoraApi.get(_this.endpoint, params)
                .pipe(map(function (projects) {
                return projects;
            }));
        };
    }
    Object.defineProperty(DecAutocompleteProjectComponent.prototype, "companyId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._companyId;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var _this = this;
            if (this._companyId !== v) {
                this._companyId = v;
                this.value = undefined;
                this.endpoint = undefined;
                setTimeout(function () {
                    // ensures a digest cicle before reseting the endpoint
                    _this.setEndpointBasedOnCompanyId();
                }, 0);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteProjectComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} company
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.labelFn = /**
     * @param {?} company
     * @return {?}
     */
    function (company) {
        return company.value + " #" + company.key;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== null && "" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.setEndpointBasedOnCompanyId = /**
     * @return {?}
     */
    function () {
        if (this.companyId) {
            this.endpoint = BASE_AUTOCOMPLETE_PROJECT_ENDPOINT + '?companyId=' + this.companyId;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteProjectComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    DecAutocompleteProjectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-project',
                    template: "<div *ngIf=\"(endpoint && companyId) else fakeDisabled\">\n  <dec-autocomplete\n  #autocomplete\n  [endpoint]=\"endpoint\"\n  [labelFn]=\"labelFn\"\n  [name]=\"name\"\n  [multi]=\"multi\"\n  [repeat]=\"repeat\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  [disabled]=\"disabled\"\n  [customFetchFunction]=\"customFetchFunction\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteProjectComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecAutocompleteProjectComponent.propDecorators = {
        companyId: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }]
    };
    return DecAutocompleteProjectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecAutocompleteProjectModule = /** @class */ (function () {
    function DecAutocompleteProjectModule() {
    }
    DecAutocompleteProjectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        DecAutocompleteModule,
                        MatInputModule
                    ],
                    declarations: [
                        DecAutocompleteProjectComponent
                    ],
                    exports: [
                        DecAutocompleteProjectComponent
                    ]
                },] },
    ];
    return DecAutocompleteProjectModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop$7 = function () {
};
var /** @type {?} */ QUOTE_ENDPOINT = '/projects/${projectId}/quotes/options';
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteQuoteComponent; }),
    multi: true
};
var DecAutocompleteQuoteComponent = /** @class */ (function () {
    function DecAutocompleteQuoteComponent(decoraApi) {
        this.decoraApi = decoraApi;
        this.labelAttr = 'value';
        this.valueAttr = 'key';
        this.name = 'Quote autocomplete';
        this.placeholder = 'Quote autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$7;
        this.onChangeCallback = noop$7;
    }
    Object.defineProperty(DecAutocompleteQuoteComponent.prototype, "projectId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._projectId;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._projectId = v;
            if (this.viewInitialized) {
                this.setEndpointBasedOnInputs();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteQuoteComponent.prototype, "decoraProduct", {
        get: /**
         * @return {?}
         */
        function () {
            return this._decoraProduct;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._decoraProduct = v;
            if (this.viewInitialized) {
                this.setEndpointBasedOnInputs();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteQuoteComponent.prototype, "decoraProductVariant", {
        get: /**
         * @return {?}
         */
        function () {
            return this._decoraProductVariant;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._decoraProductVariant = v;
            if (this.viewInitialized) {
                this.setEndpointBasedOnInputs();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecAutocompleteQuoteComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.viewInitialized = true;
        this.setEndpointBasedOnInputs();
    };
    Object.defineProperty(DecAutocompleteQuoteComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteQuoteComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteQuoteComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecAutocompleteQuoteComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecAutocompleteQuoteComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== null && "" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteQuoteComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    /**
     * @return {?}
     */
    DecAutocompleteQuoteComponent.prototype.setEndpointBasedOnInputs = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ endpoint;
        this.value = undefined;
        if (this.projectId) {
            endpoint = QUOTE_ENDPOINT.replace('${projectId}', this.projectId);
            var /** @type {?} */ params = [];
            if (this.decoraProduct) {
                params.push("productId=" + this.decoraProduct);
            }
            if (this.decoraProductVariant) {
                params.push("productVariantId=" + this.decoraProductVariant);
            }
            if (params.length) {
                endpoint += "?" + params.join('&');
            }
        }
        if (this.endpoint !== endpoint) {
            setTimeout(function () {
                _this.endpoint = endpoint;
            }, 0);
        }
    };
    DecAutocompleteQuoteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-quote',
                    template: "<div *ngIf=\"endpoint else fakeDisabled\">\n  <dec-autocomplete\n  [disabled]=\"!projectId || disabled\"\n  [endpoint]=\"endpoint\"\n  [labelAttr]=\"labelAttr\"\n  [name]=\"name\"\n  [multi]=\"multi\"\n  [repeat]=\"repeat\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteQuoteComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecAutocompleteQuoteComponent.propDecorators = {
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }],
        projectId: [{ type: Input }],
        decoraProduct: [{ type: Input }],
        decoraProductVariant: [{ type: Input }]
    };
    return DecAutocompleteQuoteComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecAutocompleteQuoteModule = /** @class */ (function () {
    function DecAutocompleteQuoteModule() {
    }
    DecAutocompleteQuoteModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        DecAutocompleteModule,
                        MatInputModule
                    ],
                    declarations: [
                        DecAutocompleteQuoteComponent
                    ],
                    exports: [
                        DecAutocompleteQuoteComponent
                    ]
                },] },
    ];
    return DecAutocompleteQuoteModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop$8 = function () {
};
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_TAGS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteTagsComponent; }),
    multi: true
};
var DecAutocompleteTagsComponent = /** @class */ (function () {
    function DecAutocompleteTagsComponent() {
        this.valueAttr = 'key';
        this.labelAttr = 'value';
        this.name = 'Tags autocomplete';
        this.placeholder = 'Tags autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.enterButton = new EventEmitter();
        this.onTouchedCallback = noop$8;
        this.onChangeCallback = noop$8;
    }
    Object.defineProperty(DecAutocompleteTagsComponent.prototype, "endpoint", {
        get: /**
         * @return {?}
         */
        function () {
            return this._endpoint;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this._endpoint = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecAutocompleteTagsComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} tags
     * @return {?}
     */
    DecAutocompleteTagsComponent.prototype.labelFn = /**
     * @param {?} tags
     * @return {?}
     */
    function (tags) {
        return tags.value + " #" + tags.key;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteTagsComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecAutocompleteTagsComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecAutocompleteTagsComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecAutocompleteTagsComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== null && "" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecAutocompleteTagsComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    DecAutocompleteTagsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-tags',
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[endpoint]=\"endpoint\"\n[multi]=\"multi\"\n[repeat]=\"repeat\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n(enterButton)=\"enterButton.emit($event)\"\n[(ngModel)]=\"value\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
                    styles: [""],
                    providers: [AUTOCOMPLETE_TAGS_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteTagsComponent.ctorParameters = function () { return []; };
    DecAutocompleteTagsComponent.propDecorators = {
        endpoint: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        multi: [{ type: Input }],
        repeat: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }],
        enterButton: [{ type: Output }]
    };
    return DecAutocompleteTagsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecAutocompleteTagsModule = /** @class */ (function () {
    function DecAutocompleteTagsModule() {
    }
    DecAutocompleteTagsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        DecAutocompleteModule
                    ],
                    declarations: [
                        DecAutocompleteTagsComponent
                    ],
                    exports: [
                        DecAutocompleteTagsComponent
                    ]
                },] },
    ];
    return DecAutocompleteTagsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecBreadcrumbComponent = /** @class */ (function () {
    function DecBreadcrumbComponent(router, translator) {
        this.router = router;
        this.translator = translator;
        this.backLabel = 'Back';
        this.forwardLabel = 'Forward';
    }
    /**
     * @return {?}
     */
    DecBreadcrumbComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.translateFeature();
        this.translatePaths();
        this.detectAndParseButtonsConfig();
    };
    /**
     * @return {?}
     */
    DecBreadcrumbComponent.prototype.detectAndParseButtonsConfig = /**
     * @return {?}
     */
    function () {
        this.parseBackButton();
        this.parseForwardButton();
    };
    /**
     * @return {?}
     */
    DecBreadcrumbComponent.prototype.parseBackButton = /**
     * @return {?}
     */
    function () {
        if (this.backButtonPath !== undefined && this.backButtonPath !== 'false') {
            this.backButtonPath = this.backButtonPath ? this.backButtonPath : '/';
        }
    };
    /**
     * @return {?}
     */
    DecBreadcrumbComponent.prototype.parseForwardButton = /**
     * @return {?}
     */
    function () {
        if (this.forwardButton !== undefined && this.forwardButton !== 'false') {
            this.forwardButton = this.forwardButton ? this.forwardButton : '/';
        }
    };
    /**
     * @return {?}
     */
    DecBreadcrumbComponent.prototype.translateFeature = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.i18nBreadcrumb) {
            this.breadcrumb = this.i18nBreadcrumb.map(function (path) { return _this.translator.instant(path); }).join(' / ');
        }
    };
    /**
     * @return {?}
     */
    DecBreadcrumbComponent.prototype.translatePaths = /**
     * @return {?}
     */
    function () {
        if (this.i18nFeature) {
            this.feature = this.translator.instant(this.i18nFeature);
        }
    };
    /**
     * @return {?}
     */
    DecBreadcrumbComponent.prototype.goBack = /**
     * @return {?}
     */
    function () {
        if (this.backButtonPath) {
            this.router.navigate([this.backButtonPath]);
        }
        else {
            window.history.back();
        }
    };
    /**
     * @return {?}
     */
    DecBreadcrumbComponent.prototype.goForward = /**
     * @return {?}
     */
    function () {
        if (this.forwardButton) {
            this.router.navigate([this.forwardButton]);
        }
        else {
            window.history.forward();
        }
    };
    DecBreadcrumbComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-breadcrumb',
                    template: "<div fxLayout=\"row\" class=\"dec-breadcrumb-wrapper\">\n\n  <div fxFlex>\n    <div fxLayout=\"column\">\n      <div class=\"title\">\n        <h1>{{feature}}</h1>\n      </div>\n      <div class=\"breadcrumb\">\n        {{breadcrumb}}\n      </div>\n    </div>\n  </div>\n\n  <div fxFlex fxFlexAlign=\"center\" fxLayoutAlign=\"end\">\n    <div fxLayout=\"row\">\n      <div fxFlex>\n        <!-- CONTENT  -->\n        <ng-content></ng-content>\n        <!-- BACK BUTTON -->\n        <button type=\"button\" mat-raised-button color=\"default\" *ngIf=\"backButtonPath\" (click)=\"goBack()\">{{ backLabel }}</button>\n        <!-- FORWARD BUTTON -->\n        <button type=\"button\" mat-raised-button color=\"default\" *ngIf=\"forwardButton\" (click)=\"goForward()\">{{ forwardLabel }}</button>\n      </div>\n    </div>\n  </div>\n\n</div>\n",
                    styles: [".dec-breadcrumb-wrapper{margin-bottom:32px}.dec-breadcrumb-wrapper h1{font-size:24px;font-weight:400;margin-top:4px;margin-bottom:4px}.dec-breadcrumb-wrapper .breadcrumb{color:#a8a8a8}"],
                },] },
    ];
    /** @nocollapse */
    DecBreadcrumbComponent.ctorParameters = function () { return [
        { type: Router },
        { type: TranslateService }
    ]; };
    DecBreadcrumbComponent.propDecorators = {
        backButtonPath: [{ type: Input }],
        breadcrumb: [{ type: Input }],
        feature: [{ type: Input }],
        forwardButton: [{ type: Input }],
        i18nFeature: [{ type: Input }],
        i18nBreadcrumb: [{ type: Input }],
        backLabel: [{ type: Input }],
        forwardLabel: [{ type: Input }]
    };
    return DecBreadcrumbComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecBreadcrumbModule = /** @class */ (function () {
    function DecBreadcrumbModule() {
    }
    DecBreadcrumbModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
                        MatButtonModule,
                        RouterModule,
                        TranslateModule,
                    ],
                    declarations: [
                        DecBreadcrumbComponent
                    ],
                    exports: [
                        DecBreadcrumbComponent
                    ]
                },] },
    ];
    return DecBreadcrumbModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecDialogComponent = /** @class */ (function () {
    function DecDialogComponent(factor, dialogRef) {
        var _this = this;
        this.factor = factor;
        this.dialogRef = dialogRef;
        this.actions = [];
        this.context = {};
        this.child = new EventEmitter();
        this.factoryTheComponent = function () {
            var /** @type {?} */ componentFactory = _this.factor.resolveComponentFactory(_this.childComponentType);
            var /** @type {?} */ componentRef = _this.childContainer.createComponent(componentFactory);
            _this.childComponentInstance = componentRef.instance;
            _this.child.emit(_this.childComponentInstance);
            _this.child.complete(); // unsubsribe subscribers
            _this.appendContextToInstance(componentRef.instance, _this.context);
            _this.loaded = true;
        };
    }
    /**
     * @return {?}
     */
    DecDialogComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.dialogRef.afterOpen()
            .toPromise()
            .then(this.factoryTheComponent);
    };
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    DecDialogComponent.prototype.appendContextToInstance = /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function (instance, context) {
        var _this = this;
        if (instance && context) {
            Object.keys(context).forEach(function (key) {
                instance[key] = _this.context[key];
            });
        }
    };
    DecDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-dialog',
                    template: "<mat-toolbar color=\"primary\">\n\n  <div fxLayout=\"row\" fxFlexFill fxLayoutAlign=\"start center\">\n    <div>\n      <button type=\"button\" mat-icon-button class=\"uppercase\" mat-dialog-close>\n        <mat-icon>arrow_back</mat-icon>\n      </button>\n    </div>\n    <div>\n      <h1>&nbsp; {{ title }}</h1>\n    </div>\n    <div fxFlex>\n      <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n        <div *ngIf=\"actions\">\n          <mat-menu #decDialogActionsMenu=\"matMenu\">\n            <button *ngFor=\"let action of actions\" mat-menu-item (click)=\"action.callback(context)\">\n              <span *ngIf=\"action.label\">{{ action.label }}</span>\n              <span *ngIf=\"action.i18nLabel\">{{ action.i18nLabel | translate }}</span>\n            </button>\n          </mat-menu>\n\n          <button mat-icon-button [matMenuTriggerFor]=\"decDialogActionsMenu\">\n            <mat-icon>more_vert</mat-icon>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</mat-toolbar>\n\n<div class=\"dec-dialog-child-wrapper\">\n  <template #childContainer></template>\n</div>\n\n<dec-spinner *ngIf=\"!loaded\"></dec-spinner>\n",
                    styles: [".dec-dialog-child-wrapper{padding:32px}"]
                },] },
    ];
    /** @nocollapse */
    DecDialogComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: MatDialogRef }
    ]; };
    DecDialogComponent.propDecorators = {
        childContainer: [{ type: ViewChild, args: ['childContainer', { read: ViewContainerRef },] }],
        child: [{ type: Output }]
    };
    return DecDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSpinnerComponent = /** @class */ (function () {
    function DecSpinnerComponent() {
    }
    /**
     * @return {?}
     */
    DecSpinnerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    DecSpinnerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-spinner',
                    template: "<div class=\"decora-loading-spinner-wrapper\">\n  <div class=\"decora-loading-spinner transparentBg\">\n    <div class=\"center\">\n      <div class=\"spinner-wrapper\">\n        <div class=\"spinner\">\n          <div class=\"inner\">\n            <div class=\"gap\"></div>\n            <div class=\"left\">\n              <div class=\"half-circle\"></div>\n            </div>\n            <div class=\"right\">\n              <div class=\"half-circle\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n",
                    styles: [".decora-loading-spinner-wrapper{position:relative;display:block;width:100%}"]
                },] },
    ];
    /** @nocollapse */
    DecSpinnerComponent.ctorParameters = function () { return []; };
    return DecSpinnerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSpinnerModule = /** @class */ (function () {
    function DecSpinnerModule() {
    }
    DecSpinnerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [DecSpinnerComponent],
                    exports: [DecSpinnerComponent]
                },] },
    ];
    return DecSpinnerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecDialogService = /** @class */ (function () {
    function DecDialogService(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} childComponent
     * @param {?} config
     * @return {?}
     */
    DecDialogService.prototype.open = /**
     * @param {?} childComponent
     * @param {?} config
     * @return {?}
     */
    function (childComponent, config) {
        var /** @type {?} */ dialogInstance = this.dialog.open(DecDialogComponent, {
            width: config.width || '100vw',
            height: config.heigth || '100vh',
            panelClass: 'full-screen-dialog'
        });
        dialogInstance.componentInstance.childComponentType = childComponent;
        dialogInstance.componentInstance.actions = config.actions;
        dialogInstance.componentInstance.title = config.title;
        dialogInstance.componentInstance.context = config.context;
        return dialogInstance;
    };
    DecDialogService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecDialogService.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    return DecDialogService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecDialogModule = /** @class */ (function () {
    function DecDialogModule() {
    }
    DecDialogModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatDialogModule,
                        MatToolbarModule,
                        MatIconModule,
                        MatMenuModule,
                        MatButtonModule,
                        FlexLayoutModule,
                        DecSpinnerModule,
                        TranslateModule,
                    ],
                    declarations: [DecDialogComponent],
                    entryComponents: [DecDialogComponent],
                    providers: [DecDialogService],
                },] },
    ];
    return DecDialogModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// https://github.com/sheikalthaf/ngu-carousel#input-interface
var /** @type {?} */ CarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 4, all: 0 },
    slide: 1,
    speed: 400,
    interval: 4000,
    point: {
        visible: false
    },
    custom: 'banner'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecGalleryComponent = /** @class */ (function () {
    function DecGalleryComponent() {
        var _this = this;
        this.carouselConfig = CarouselConfig;
        this._images = [];
        this.onSelectImage = function ($event, sysFile) {
            if (_this.activeImage && _this.activeImage !== $event.target) {
                _this.activeImage.className = '';
            }
            $event.target.className = 'active';
            _this.activeImage = $event.target;
            _this.imageHighlight = sysFile;
            _this.setExternalLink();
        };
        this.setExternalLink = function () {
            if (_this.imageHighlight) {
                _this.imgExternalLink = _this.imageHighlight.fileUrl;
            }
        };
    }
    Object.defineProperty(DecGalleryComponent.prototype, "images", {
        get: /**
         * @return {?}
         */
        function () {
            return this._images;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = value || new Array();
            if (value && (JSON.stringify(value) !== JSON.stringify(this._images))) {
                this.imageHighlight = value[0];
                this._images = value;
                this.setExternalLink();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    DecGalleryComponent.prototype.onInitDataFn = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setPrevNextCheckers(event.isFirst, event.items >= this.images.length);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecGalleryComponent.prototype.onMoveFn = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setPrevNextCheckers(event.isFirst, event.isLast);
    };
    /**
     * @param {?} first
     * @param {?} last
     * @return {?}
     */
    DecGalleryComponent.prototype.setPrevNextCheckers = /**
     * @param {?} first
     * @param {?} last
     * @return {?}
     */
    function (first, last) {
        var _this = this;
        setTimeout(function () {
            _this.isFirst = first;
            _this.isLast = last;
        }, 0);
    };
    DecGalleryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-gallery',
                    template: "<div class=\"dec-gallery-wrapper\">\n\n  <div class=\"image-highlighted\">\n      <dec-image-zoom\n        [size]=\"{width: 620, height: 620}\"\n        [systemFile]=\"imageHighlight\">\n      </dec-image-zoom>\n  </div>\n\n  <div class=\"text-right\" *ngIf=\"imgExternalLink\">\n\n    <a href=\"{{ imgExternalLink }}\" target=\"_blank\">{{ 'label.image-link' | translate }}</a>\n\n  </div>\n\n  <ngu-carousel class=\"carousel-wrapper\" [inputs]=\"carouselConfig\" (initData)=\"onInitDataFn($event)\" (onMove)=\"onMoveFn($event)\">\n\n    <ngu-item NguCarouselItem *ngFor=\"let image of images\" [class.active]=\"image == imageHighlight\">\n\n      <img [decImage]=\"image\" [decImageSize]=\"{width:300, height:300}\" (click)=\"onSelectImage($event,image)\">\n\n    </ngu-item>\n\n    <mat-icon NguCarouselPrev class=\"left-previous\" [ngClass]=\"{'disabled': isFirst}\">chevron_left</mat-icon>\n\n    <mat-icon NguCarouselNext class=\"right-next\" [ngClass]=\"{'disabled': isLast}\">chevron_right</mat-icon>\n\n  </ngu-carousel>\n\n</div>\n",
                    styles: [".dec-gallery-wrapper{max-width:624px;overflow:hidden}.dec-gallery-wrapper .image-highlighted{border:2px solid #f5f5f5;width:620px;height:620px}.dec-gallery-wrapper a{font-size:10px;text-decoration:none;color:#929292;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper{margin-top:8px;padding:0 24px;height:128px}.dec-gallery-wrapper .carousel-wrapper ngu-item{display:flex;justify-content:center;align-items:center;height:124px;padding:2px;margin-right:2px}.dec-gallery-wrapper .carousel-wrapper ngu-item.active,.dec-gallery-wrapper .carousel-wrapper ngu-item:hover{padding:0;border:2px solid #232e38}.dec-gallery-wrapper .carousel-wrapper ngu-item img{max-width:124px;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper .left-previous,.dec-gallery-wrapper .carousel-wrapper .right-next{display:block!important;position:absolute;top:calc(50% - 12px);cursor:pointer;text-shadow:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.dec-gallery-wrapper .carousel-wrapper .left-previous:hover,.dec-gallery-wrapper .carousel-wrapper .right-next:hover{text-shadow:0 0 6px rgba(0,0,0,.2)}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled{opacity:.4}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled:hover,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled:hover{text-shadow:none}.dec-gallery-wrapper .carousel-wrapper .left-previous{left:0}.dec-gallery-wrapper .carousel-wrapper .right-next{right:0}"]
                },] },
    ];
    /** @nocollapse */
    DecGalleryComponent.ctorParameters = function () { return []; };
    DecGalleryComponent.propDecorators = {
        images: [{ type: Input }]
    };
    return DecGalleryComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ ThumborServerHost = 'https://cache-thumbs.decoracontent.com/unsafe';
var /** @type {?} */ S3Host = 'http://s3.amazonaws.com/decora-platform-1-nv';
var /** @type {?} */ TransparentImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAAmJLR0QA/4ePzL8AAA\nAJcEhZcwAACxMAAAsTAQCanBgAAAALSURBVAjXY2BgAAAAAwABINWUxwAAAABJRU5ErkJggg==";
var /** @type {?} */ ErrorImage = "data:image/png;base64,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";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecImageDirective = /** @class */ (function () {
    function DecImageDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
        this.errorOnLoad = false;
        // Ged redimensioned image from thumbor image resize service
        this.thumborize = true;
        this.innerImage = TransparentImage;
    }
    Object.defineProperty(DecImageDirective.prototype, "decImage", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerImage) {
                this.innerImage = v;
                if (this.viewInitialized) {
                    this.loadImage();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecImageDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.detectContainerElement();
        this.setElementWidth();
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.viewInitialized = true;
            _this.loadImage();
        });
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.detectContainerElement = /**
     * @return {?}
     */
    function () {
        this.containerElement = this.viewContainerRef.element.nativeElement;
        this.containerElementType = this.containerElement.tagName === 'IMG' ? 'IMG' : 'NOT-IMG';
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.loadImage = /**
     * @return {?}
     */
    function () {
        if (typeof this.innerImage === 'string') {
            this.finalImageUrl = this.innerImage;
        }
        else {
            this.imagePath = this.extractImageUrlFromSysfile();
            if (this.imagePath) {
                this.finalImageUrl = this.getFinalUrl();
            }
            else {
                this.finalImageUrl = ErrorImage;
            }
        }
        this.tryToLoadImage();
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.extractImageUrlFromSysfile = /**
     * @return {?}
     */
    function () {
        try {
            return this.innerImage['fileBasePath'] || undefined;
        }
        catch (/** @type {?} */ error) {
            return undefined;
        }
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.getFinalUrl = /**
     * @return {?}
     */
    function () {
        if (this.thumborize) {
            return this.getThumborUrl();
        }
        else {
            return this.getS3Url();
        }
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.getS3Url = /**
     * @return {?}
     */
    function () {
        return S3Host + "/" + this.imagePath;
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.getThumborUrl = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ size = this.getImageSize(this.decImageSize);
        var /** @type {?} */ aspect = this.getAspect();
        var /** @type {?} */ trim = this.getTrim();
        return ThumborServerHost + "/" + size + aspect + trim + "/" + this.imagePath;
    };
    /**
     * @param {?=} decImageSize
     * @return {?}
     */
    DecImageDirective.prototype.getImageSize = /**
     * @param {?=} decImageSize
     * @return {?}
     */
    function (decImageSize) {
        if (decImageSize === void 0) { decImageSize = {}; }
        var /** @type {?} */ containerWidth = this.containerElement.offsetWidth;
        if (decImageSize.width && decImageSize.height) {
            return (decImageSize.width || 0) + "x" + (decImageSize.height || 0);
        }
        switch (true) {
            case containerWidth < 300:
                return "300x300";
            case containerWidth < 600:
                return "600x600";
            case containerWidth < 900:
                return "900x900";
            case containerWidth < 1200:
                return "1200x1200";
            case containerWidth < 1500:
                return "1500x1500";
            case containerWidth < 1800:
                return "1800x1800";
            default:
                return "2000x2000";
        }
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.getAspect = /**
     * @return {?}
     */
    function () {
        return this.fitIn ? '/fit-in' : '';
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.getTrim = /**
     * @return {?}
     */
    function () {
        return this.trim ? '/trim' : '';
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.tryToLoadImage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ downloadingImage = new Image();
        downloadingImage.onload = function () {
            _this.createImage();
        };
        downloadingImage.onerror = function () {
            _this.finalImageUrl = ErrorImage;
            _this.createImage();
        };
        downloadingImage.src = this.finalImageUrl;
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.createImage = /**
     * @return {?}
     */
    function () {
        if (this.containerElementType === 'IMG') {
            this.setImageelementSrc();
        }
        else {
            this.appendImageToBg();
        }
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.appendImageToBg = /**
     * @return {?}
     */
    function () {
        this.containerElement.style.backgroundImage = 'url(' + this.finalImageUrl + ')';
        this.containerElement.classList.remove('dec-image-bg-loading');
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.setImageelementSrc = /**
     * @return {?}
     */
    function () {
        this.containerElement.setAttribute('src', this.finalImageUrl);
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.setElementWidth = /**
     * @return {?}
     */
    function () {
        if (this.containerElementType === 'IMG') {
            this.containerElement.setAttribute('width', '100%');
            this.containerElement.setAttribute('max-width', '100%');
        }
        else {
            this.containerElement.style.backgroundSize = '100%';
            this.containerElement.style.backgroundPosition = 'center';
            this.containerElement.style.backgroundRepeat = 'no-repeat';
        }
    };
    DecImageDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[decImage]'
                },] },
    ];
    /** @nocollapse */
    DecImageDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    DecImageDirective.propDecorators = {
        decImage: [{ type: Input }],
        decImageSize: [{ type: Input }],
        trim: [{ type: Input }],
        fitIn: [{ type: Input }],
        thumborize: [{ type: Input }]
    };
    return DecImageDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecImageModule = /** @class */ (function () {
    function DecImageModule() {
    }
    DecImageModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [DecImageDirective],
                    exports: [DecImageDirective]
                },] },
    ];
    return DecImageModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecImageZoomComponent = /** @class */ (function () {
    function DecImageZoomComponent() {
        this.zoomMode = 'click';
        this.enableScrollZoom = true;
        this.scrollStepSize = 0.1;
        this.enableLens = false;
        this.lensWidth = 100;
        this.lensHeight = 100;
    }
    Object.defineProperty(DecImageZoomComponent.prototype, "systemFile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._systemFile;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._systemFile) {
                this._systemFile = v;
                this.loadImage();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecImageZoomComponent.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._thumbSize;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this._thumbSize = v;
                this.loadImage();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.loadImage = /**
     * @return {?}
     */
    function () {
        if (this.systemFile && this.size) {
            this.setFinalImageUrl();
            this.setOriginalImagePath();
            this.setThumborlUrl();
        }
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.setFinalImageUrl = /**
     * @return {?}
     */
    function () {
        this.fullImageUrl = this.systemFile.fileUrl;
        console.log('setFinalImageUrl', this.fullImageUrl);
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.setOriginalImagePath = /**
     * @return {?}
     */
    function () {
        this.fullImagePath = this.extractImageUrlFromSysfile();
        console.log('setOriginalImagePath', this.fullImagePath);
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.setThumborlUrl = /**
     * @return {?}
     */
    function () {
        this.resizedImageUrl = this.getThumborUrl();
        console.log('setThumborlUrl', this.resizedImageUrl);
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.extractImageUrlFromSysfile = /**
     * @return {?}
     */
    function () {
        try {
            return this.systemFile['fileBasePath'] || undefined;
        }
        catch (/** @type {?} */ error) {
            return undefined;
        }
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.getImageSize = /**
     * @return {?}
     */
    function () {
        return (this.size.width || 0) + "x" + (this.size.height || 0);
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.getThumborUrl = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ size = this.getImageSize();
        return ThumborServerHost + "/" + size + "/" + this.fullImagePath;
    };
    DecImageZoomComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-image-zoom',
                    template: "<div class=\"imagehighlight-container\" >\n  <ngx-image-zoom\n    [thumbImage]=\"resizedImageUrl\"\n    [fullImage]=\"fullImageUrl\"\n    [zoomMode]=\"zoomMode\"\n    [enableScrollZoom]=\"enableScrollZoom\"\n    [scrollStepSize]=\"scrollStepSize\"\n    [enableLens]=\"enableLens\"\n    [lensWidth]=\"lensWidth\"\n    [lensHeight]=\"lensHeight\"\n  ></ngx-image-zoom>\n</div>\n\n",
                    styles: [".imagehighlight-container{width:100%;height:100%;cursor:zoom-in}"]
                },] },
    ];
    /** @nocollapse */
    DecImageZoomComponent.ctorParameters = function () { return []; };
    DecImageZoomComponent.propDecorators = {
        zoomMode: [{ type: Input }],
        enableScrollZoom: [{ type: Input }],
        scrollStepSize: [{ type: Input }],
        enableLens: [{ type: Input }],
        lensWidth: [{ type: Input }],
        lensHeight: [{ type: Input }],
        systemFile: [{ type: Input }],
        size: [{ type: Input }]
    };
    return DecImageZoomComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecImageZoomModule = /** @class */ (function () {
    function DecImageZoomModule() {
    }
    DecImageZoomModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        NgxImageZoomModule.forRoot()
                    ],
                    declarations: [
                        DecImageZoomComponent
                    ],
                    exports: [
                        DecImageZoomComponent
                    ]
                },] },
    ];
    return DecImageZoomModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecGalleryModule = /** @class */ (function () {
    function DecGalleryModule() {
    }
    DecGalleryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DecImageModule,
                        TranslateModule,
                        MatIconModule,
                        NguCarouselModule,
                        DecImageZoomModule
                    ],
                    declarations: [
                        DecGalleryComponent
                    ],
                    exports: [
                        DecGalleryComponent
                    ]
                },] },
    ];
    return DecGalleryModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecIconComponent = /** @class */ (function () {
    function DecIconComponent() {
    }
    /**
     * @return {?}
     */
    DecIconComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            try {
                _this.icon = _this.textElement.nativeElement.textContent;
            }
            catch (/** @type {?} */ error) { }
        }, 0);
    };
    DecIconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-icon',
                    template: "<ng-container [ngSwitch]=\"font\">\n  <ng-container *ngSwitchCase=\"'mat'\">\n    <i class=\"material-icons\">{{icon}}</i>\n  </ng-container>\n  <ng-container *ngSwitchCase=\"'fas'\">\n    <i class=\"fa {{'fa-'+icon}}\" aria-hidden=\"true\"></i>\n  </ng-container>\n</ng-container>\n\n<span #text [hidden]=\"true\">\n  <ng-content></ng-content>\n</span>\n",
                    styles: [".material-icons{color:inherit;font-size:inherit;display:inline-block;-webkit-transform:translateY(16%);transform:translateY(16%);-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"]
                },] },
    ];
    /** @nocollapse */
    DecIconComponent.ctorParameters = function () { return []; };
    DecIconComponent.propDecorators = {
        font: [{ type: Input }],
        textElement: [{ type: ViewChild, args: ['text',] }]
    };
    return DecIconComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecIconModule = /** @class */ (function () {
    function DecIconModule(matIconRegistry) {
        this.matIconRegistry = matIconRegistry;
        this.matIconRegistry.registerFontClassAlias('fas', 'fa');
    }
    DecIconModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
                    ],
                    declarations: [DecIconComponent],
                    exports: [DecIconComponent]
                },] },
    ];
    /** @nocollapse */
    DecIconModule.ctorParameters = function () { return [
        { type: MatIconRegistry }
    ]; };
    return DecIconModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecLabelComponent = /** @class */ (function () {
    function DecLabelComponent() {
    }
    DecLabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-label',
                    template: "<div [ngStyle]=\"{'background-color': colorHex}\" [ngClass]=\"decClass\" decContrastFontWithBg>\n  <ng-content></ng-content>\n</div>\n",
                    styles: ["div{margin:4px;display:inline-block;padding:7px 12px;border-radius:24px;align-items:center;cursor:default}"]
                },] },
    ];
    DecLabelComponent.propDecorators = {
        colorHex: [{ type: Input }],
        decClass: [{ type: Input }]
    };
    return DecLabelComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DEFAULT_LUMA_BREAKPOINT = 200;
/**
 * @param {?} hex
 * @return {?}
 */
function hexToRgbNew(hex) {
    var /** @type {?} */ result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
/**
 * @param {?} bgColor
 * @return {?}
 */
function standardize_color(bgColor) {
    var /** @type {?} */ canvas = document.createElement('canvas');
    var /** @type {?} */ ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    return ctx.fillStyle;
}
var DecContrastFontWithBgDirective = /** @class */ (function () {
    function DecContrastFontWithBgDirective(el) {
        this.el = el;
        this.bgColor = this.el.nativeElement.style.backgroundColor;
    }
    Object.defineProperty(DecContrastFontWithBgDirective.prototype, "decContrastFontWithBg", {
        set: /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
            this.config = config;
            this.doDecContrastFontWithBg();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecContrastFontWithBgDirective.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ bgColor = this.el.nativeElement.style.backgroundColor;
        if (bgColor !== this.bgColor) {
            this.bgColor = bgColor;
            this.doDecContrastFontWithBg();
        }
    };
    /**
     * @return {?}
     */
    DecContrastFontWithBgDirective.prototype.doDecContrastFontWithBg = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ lumaBreakPoint = (this.config && this.config.lumaBreakPoint) ? this.config.lumaBreakPoint : DEFAULT_LUMA_BREAKPOINT;
        var /** @type {?} */ hexaBgColor = standardize_color(this.bgColor);
        var /** @type {?} */ rgbColor = hexToRgbNew(hexaBgColor);
        var /** @type {?} */ luma = 0.2126 * rgbColor.r + 0.7152 * rgbColor.g + 0.0722 * rgbColor.b; // per ITU-R BT.709
        if (luma < lumaBreakPoint) {
            this.el.nativeElement.style.color = (this.config && this.config.lightColor) ? this.config.lightColor : 'rgba(255,255,255,1)';
        }
        else {
            this.el.nativeElement.style.color = (this.config && this.config.darkColor) ? this.config.darkColor : '#232e38';
        }
    };
    DecContrastFontWithBgDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[decContrastFontWithBg]'
                },] },
    ];
    /** @nocollapse */
    DecContrastFontWithBgDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    DecContrastFontWithBgDirective.propDecorators = {
        decContrastFontWithBg: [{ type: Input }]
    };
    return DecContrastFontWithBgDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecContrastFontWithBgModule = /** @class */ (function () {
    function DecContrastFontWithBgModule() {
    }
    DecContrastFontWithBgModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        DecContrastFontWithBgDirective,
                    ],
                    exports: [
                        DecContrastFontWithBgDirective,
                    ]
                },] },
    ];
    return DecContrastFontWithBgModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecLabelModule = /** @class */ (function () {
    function DecLabelModule() {
    }
    DecLabelModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TranslateModule,
                        DecContrastFontWithBgModule,
                    ],
                    declarations: [
                        DecLabelComponent
                    ],
                    exports: [
                        DecLabelComponent
                    ]
                },] },
    ];
    return DecLabelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListFilter = /** @class */ (function () {
    function DecListFilter(data) {
        if (data === void 0) { data = {}; }
        this.children = data.children ? data.children.map(function (filter$$1) { return new DecListFilter(filter$$1); }) : undefined;
        this.count = data.count || undefined;
        this.default = data.default || undefined;
        this.filters = data.filters || undefined;
        this.hide = data.hide || undefined;
        this.label = data.label || undefined;
        this.color = data.color || '#6E757A';
        this.listMode = data.listMode || undefined;
        this.permissions = data.permissions || undefined;
        this.uid = data.uid || data.label;
    }
    return DecListFilter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListTabsFilterComponent = /** @class */ (function () {
    function DecListTabsFilterComponent(route, router) {
        var _this = this;
        this.route = route;
        this.router = router;
        this._filters = [];
        this.search = new EventEmitter();
        this.tabChange = new EventEmitter();
        this.doFirstLoad = function () {
            setTimeout(function () {
                // avoids ExpressionChangedAfterItHasBeenCheckedError selecting the active tab
                _this.watchTabInUrlQuery();
            }, 0);
        };
        this.onSearch = function (tab, recount) {
            if (recount === void 0) { recount = false; }
            _this.selectedTabUid = tab.uid;
            if (_this.filters && tab) {
                var /** @type {?} */ event_1 = {
                    filters: tab.filters,
                    children: tab.children,
                    recount: recount,
                };
                _this.search.emit(event_1);
            }
        };
    }
    Object.defineProperty(DecListTabsFilterComponent.prototype, "filters", {
        get: /**
         * @return {?}
         */
        function () {
            return this._filters;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._filters !== v) {
                this._filters = v ? v.map(function (filter$$1) { return new DecListFilter(filter$$1); }) : [];
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stopWatchingTabInUrlQuery();
    };
    /**
     * @param {?} uid
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.getCountOf = /**
     * @param {?} uid
     * @return {?}
     */
    function (uid) {
        return this.countReport && this.countReport[uid] >= 0 ? this.countReport[uid] : '?';
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.selectTab = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.setTabInUrlQuery(tab);
    };
    Object.defineProperty(DecListTabsFilterComponent.prototype, "selectedTab", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.filters ? this.filters.find(function (filter$$1) { return filter$$1.uid === _this.selectedTabUid; }) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListTabsFilterComponent.prototype, "visibleFilters", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ visible = this.filters ? this.filters.filter(function (filter$$1) { return !filter$$1.hide; }) : [];
            return (visible && visible.length > 1) ? visible : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.detectDefaultTab = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ hasDefault = this.filters.find(function (item) {
            return item.default;
        });
        if (hasDefault) {
            this.defaultTab = hasDefault.uid;
        }
        else {
            this.defaultTab = this.filters[0].uid;
        }
    };
    /**
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.componentTabName = /**
     * @return {?}
     */
    function () {
        return this.name + '-tab';
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.setTabInUrlQuery = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        var /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
        queryParams[this.componentTabName()] = tab;
        this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
    };
    /**
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.watchTabInUrlQuery = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.detectDefaultTab();
        this.wathUrlSubscription = this.route.queryParams
            .subscribe(function (params) {
            var /** @type {?} */ tab = params[_this.componentTabName()] || _this.defaultTab;
            if (tab !== _this.selectedTabUid) {
                var /** @type {?} */ selectedTab = _this.filters.find(function (filter$$1) { return filter$$1.uid === tab; });
                _this.onSearch(selectedTab);
                _this.tabChange.emit(tab);
            }
        });
    };
    /**
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.stopWatchingTabInUrlQuery = /**
     * @return {?}
     */
    function () {
        if (this.wathUrlSubscription) {
            this.wathUrlSubscription.unsubscribe();
        }
    };
    DecListTabsFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-tabs-filter',
                    template: "<div class=\"list-tabs-filter-wrapper\" *ngIf=\"visibleFilters as filters\">\n  <div fxLayout=\"row\" class=\"dec-tab-header\">\n    <ng-container *ngFor=\"let tabFilter of filters\">\n      <button type=\"button\"\n              *decPermission=\"tabFilter.permissions\"\n              mat-button\n              class=\"uppercase\"\n              (click)=\"selectTab(tabFilter.uid)\"\n              [class.selected]=\"selectedTabUid == (tabFilter.uid)\">\n        <span>{{ 'label.' + tabFilter.label | translate | uppercase }}</span>\n        <span *ngIf=\"countReport\" class=\"badge badge-pill badge-small\">{{ countReport[tabFilter.uid].count }}</span>\n      </button>\n    </ng-container>\n  </div>\n</div>\n",
                    styles: [".list-tabs-filter-wrapper{margin-top:8px}.list-tabs-filter-wrapper .dec-tab-header.bottom{border-bottom:0}.list-tabs-filter-wrapper .dec-tab-header .badge{margin-left:8px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill{padding:8px;font-size:small;border-radius:24px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill.badge-small{font-size:x-small;padding:4px}"]
                },] },
    ];
    /** @nocollapse */
    DecListTabsFilterComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    DecListTabsFilterComponent.propDecorators = {
        countReport: [{ type: Input }],
        filters: [{ type: Input }],
        search: [{ type: Output, args: ['search',] }],
        tabChange: [{ type: Output, args: ['tabChange',] }]
    };
    return DecListTabsFilterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListAdvancedFilterComponent = /** @class */ (function () {
    function DecListAdvancedFilterComponent() {
        this.form = {};
        this.onSearch = function () { };
        this.onClear = function () { };
    }
    Object.defineProperty(DecListAdvancedFilterComponent.prototype, "opened", {
        get: /**
         * @return {?}
         */
        function () {
            return this._opened;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._opened = this._opened || v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecListAdvancedFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    DecListAdvancedFilterComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.onClear();
    };
    /**
     * @return {?}
     */
    DecListAdvancedFilterComponent.prototype.submit = /**
     * @return {?}
     */
    function () {
        this.onSearch();
    };
    DecListAdvancedFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-advanced-filter',
                    template: "<div fxLayout=\"column\" fxLayoutGap=\"16px\">\n\n  <div fxFlex>\n\n    <ng-container *ngIf=\"opened\"\n      [ngTemplateOutlet]=\"templateRef\"\n      [ngTemplateOutletContext]=\"{form: form}\"\n    ></ng-container>\n\n  </div>\n\n  <div fxFlex>\n\n    <div fxLayout=\"row\" fxLayoutAlign=\"end end\" fxLayoutGap=\"8px\">\n\n      <button type=\"button\" mat-raised-button color=\"primary\" (click)=\"submit()\">{{ 'label.search' | translate | uppercase }}</button>\n\n      <button type=\"button\" mat-button (click)=\"reset()\">{{ 'label.reset' | translate | uppercase }}</button>\n\n    </div>\n\n  </div>\n\n</div>\n\n\n\n\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecListAdvancedFilterComponent.ctorParameters = function () { return []; };
    DecListAdvancedFilterComponent.propDecorators = {
        templateRef: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return DecListAdvancedFilterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListFilterComponent = /** @class */ (function () {
    function DecListFilterComponent(platformLocation, route, router) {
        var _this = this;
        this.platformLocation = platformLocation;
        this.route = route;
        this.router = router;
        this.filterForm = {
            search: undefined
        };
        this.isItFirstLoad = true;
        this.clickableContainerClass = 'list-filter-wrapper';
        this._filters = [];
        this.hasPersistence = true;
        this.search = new EventEmitter();
        this.onSearch = function (appendCurrentForm) {
            if (appendCurrentForm === void 0) { appendCurrentForm = true; }
            if (_this.filterForm && appendCurrentForm) {
                var /** @type {?} */ newDecFilterGroup_1 = {
                    filters: []
                };
                Object.keys(_this.filterForm).forEach(function (key) {
                    if (_this.filterForm[key]) {
                        var /** @type {?} */ filter$$1 = { property: key, value: _this.filterForm[key] };
                        newDecFilterGroup_1.filters.push(filter$$1);
                    }
                });
                if (newDecFilterGroup_1.filters.length > 0) {
                    if (_this.innerDecFilterGroups) {
                        if (_this.editionGroupIndex >= 0) {
                            _this.innerDecFilterGroups[_this.editionGroupIndex] = newDecFilterGroup_1;
                        }
                        else {
                            _this.innerDecFilterGroups.push(newDecFilterGroup_1);
                        }
                    }
                    else {
                        _this.innerDecFilterGroups = [newDecFilterGroup_1];
                    }
                }
            }
            _this.reacalculateAndEmitCurrentDecFilterGroups(true);
        };
        this.clearFilterForm = function () {
            if (_this.filterForm) {
                Object.keys(_this.filterForm).forEach(function (key) {
                    _this.filterForm[key] = undefined;
                });
            }
        };
        this.actByClickPosition = function ($event) {
            if (event && event['path']) {
                var /** @type {?} */ clickedInsideFilter = $event['path'].find(function (path) {
                    var /** @type {?} */ className = "" + path['className'] || '';
                    var /** @type {?} */ insideWrapper = className.indexOf(_this.clickableContainerClass) >= 0;
                    var /** @type {?} */ insideOption = className.indexOf('mat-option') >= 0;
                    var /** @type {?} */ insideDatePicker = className.indexOf('mat-datepicker-content') >= 0;
                    var /** @type {?} */ insideOverlayContainer = className.indexOf('cdk-overlay-container') >= 0;
                    return insideWrapper || insideOption || insideDatePicker || insideOverlayContainer;
                });
                if (!clickedInsideFilter) {
                    // avoid closing filter from any open dialog
                    _this.closeFilters();
                    _this.clearFilterForm();
                }
            }
        };
    }
    Object.defineProperty(DecListFilterComponent.prototype, "showAdvancedFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showAdvancedFilter;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._showAdvancedFilter !== v) {
                this._showAdvancedFilter = !!v;
                this.setAdvancedFilterState(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListFilterComponent.prototype, "filters", {
        get: /**
         * @return {?}
         */
        function () {
            return this._filters;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._filters !== v) {
                this._filters = v.map(function (filter$$1) { return new DecListFilter(filter$$1); });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListFilterComponent.prototype, "loadCountReport", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loadCountReport;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== false) {
                this._loadCountReport = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.watchTabsFilter();
        this.watchClick();
        this.watchUrlFilter();
        this.configureAdvancedFilter();
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stopWatchingClick();
        this.stopWatchingTabsFilter();
        this.stopWatchingUrlFilter();
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.toggleSearchInput = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.showSearchInput = !this.showSearchInput;
        if (!this.showSearchInput) {
            this.showAdvancedFilter = false;
        }
        else {
            setTimeout(function () {
                _this.inputSearch.nativeElement.focus();
            }, 180);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecListFilterComponent.prototype.toggleAdvancedFilter = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.stopPropagation();
        this.showAdvancedFilter = !this.showAdvancedFilter;
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.onClear = /**
     * @return {?}
     */
    function () {
        this.closeFilters();
        this.filterGroups = undefined;
        this.filterGroupsWithoutTabs = undefined;
        this.innerDecFilterGroups = undefined;
        this.clearFilterForm();
        this.onSearch();
    };
    /**
     * @param {?} groupIndex
     * @return {?}
     */
    DecListFilterComponent.prototype.removeDecFilterGroup = /**
     * @param {?} groupIndex
     * @return {?}
     */
    function (groupIndex) {
        this.filterGroups = this.filterGroups.filter(function (group, index) { return index !== groupIndex; });
        this.filterGroupsWithoutTabs = this.filterGroupsWithoutTabs.filter(function (group, index) { return index !== groupIndex; });
        this.innerDecFilterGroups = this.innerDecFilterGroups.filter(function (group, index) { return index !== groupIndex; });
        this.onSearch(true);
    };
    /**
     * @param {?} groupIndex
     * @return {?}
     */
    DecListFilterComponent.prototype.editDecFilterGroup = /**
     * @param {?} groupIndex
     * @return {?}
     */
    function (groupIndex) {
        this.editionGroupIndex = groupIndex;
        var /** @type {?} */ toEditDecFilterGroup = this.filterGroupsWithoutTabs[groupIndex];
        if (toEditDecFilterGroup && toEditDecFilterGroup.filters.length > 0) {
            this.reloadFormWithGivenDecFilterGroupe(toEditDecFilterGroup.filters);
        }
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.onClickInfo = /**
     * @return {?}
     */
    function () {
        console.log('on click info. Not implemented');
    };
    /*
     * appendToCurrentFilters
     *
     * Append a filter to the current filter groups
     */
    /**
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    DecListFilterComponent.prototype.appendToCurrentDecFilterGroups = /**
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    function (propertyName, propertyValue) {
        var /** @type {?} */ filter$$1 = {
            'property': propertyName,
            'value': propertyValue,
        };
        if (this.filterGroupsWithoutTabs) {
            this.filterGroupsWithoutTabs.forEach(function (filterGroup) {
                var /** @type {?} */ filterExistsInThisGroup = filterGroup.filters.find(function (filterGroupFilter) { return filterGroupFilter.property === filter$$1.property; });
                if (!filterExistsInThisGroup) {
                    filterGroup.filters.push(filter$$1);
                }
            });
        }
        else {
            this.filterGroupsWithoutTabs = [{ filters: [filter$$1] }];
        }
        this.innerDecFilterGroups = this.filterGroupsWithoutTabs;
        this.reacalculateAndEmitCurrentDecFilterGroups();
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.closeFilters = /**
     * @return {?}
     */
    function () {
        this.editionGroupIndex = undefined;
        this.showAdvancedFilter = false;
        this.showSearchInput = false;
    };
    /**
     * @param {?=} recount
     * @return {?}
     */
    DecListFilterComponent.prototype.reacalculateAndEmitCurrentDecFilterGroups = /**
     * @param {?=} recount
     * @return {?}
     */
    function (recount) {
        var _this = this;
        if (recount === void 0) { recount = false; }
        this.emitCurrentDecFilterGroups(recount)
            .then(function () {
            if (!_this.hasPersistence) {
                return;
            }
            _this.refreshFilterInUrlQuery()
                .then(function () {
                _this.closeFilters();
                _this.clearFilterForm();
            });
        });
    };
    /**
     * @param {?} filters
     * @return {?}
     */
    DecListFilterComponent.prototype.reloadFormWithGivenDecFilterGroupe = /**
     * @param {?} filters
     * @return {?}
     */
    function (filters) {
        var _this = this;
        this.clearFilterForm();
        filters.forEach(function (filter$$1) {
            if (filter$$1.value) {
                _this.filterForm[filter$$1.property] = filter$$1.value;
            }
        });
        this.openFilters();
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.openFilters = /**
     * @return {?}
     */
    function () {
        this.showAdvancedFilter = true;
        this.showSearchInput = true;
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.configureAdvancedFilter = /**
     * @return {?}
     */
    function () {
        if (this.advancedFilterComponent) {
            this.advancedFilterComponent.form = this.filterForm;
            this.advancedFilterComponent.onSearch = this.onSearch;
            this.advancedFilterComponent.onClear = this.clearFilterForm;
        }
    };
    /**
     * @param {?} state
     * @return {?}
     */
    DecListFilterComponent.prototype.setAdvancedFilterState = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        if (this.advancedFilterComponent) {
            this.advancedFilterComponent.opened = state;
        }
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.watchTabsFilter = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.tabsFilterComponent) {
            this.tabsFilterSubscription = this.tabsFilterComponent.search.subscribe(function (filterEvent) {
                if (filterEvent.children) {
                    _this.filterMode = 'collapse';
                    _this.childrenFilters = filterEvent.children;
                }
                else {
                    _this.filterMode = 'tabs';
                    _this.childrenFilters = undefined;
                }
                _this.tabsFilter = filterEvent.filters;
                _this.emitCurrentDecFilterGroups(_this.isItFirstLoad || filterEvent.recount);
                _this.isItFirstLoad = false;
            });
        }
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.stopWatchingTabsFilter = /**
     * @return {?}
     */
    function () {
        if (this.tabsFilterSubscription) {
            this.tabsFilterSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.mountCurrentDecFilterGroups = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ currentFilter = [];
        var /** @type {?} */ currentFilterWithoutTabs = [];
        if (this.innerDecFilterGroups && this.innerDecFilterGroups.length) {
            this.innerDecFilterGroups.forEach(function (filterGroup) {
                var /** @type {?} */ filterGroupCopy = {
                    filters: filterGroup.filters.slice()
                };
                if (_this.tabsFilter) {
                    (_a = filterGroupCopy.filters).push.apply(_a, __spread(_this.tabsFilter));
                }
                currentFilter.push(filterGroupCopy);
                var /** @type {?} */ filterGroupCopyWithoutTabs = {
                    filters: filterGroup.filters.slice()
                };
                currentFilterWithoutTabs.push(filterGroupCopyWithoutTabs);
                var _a;
            });
        }
        else if (this.tabsFilter) {
            currentFilter.push({ filters: this.tabsFilter });
        }
        this.filterGroups = currentFilter.length ? currentFilter : undefined;
        this.filterGroupsWithoutTabs = currentFilterWithoutTabs.length ? currentFilterWithoutTabs : undefined;
    };
    /**
     * @param {?=} recount
     * @return {?}
     */
    DecListFilterComponent.prototype.emitCurrentDecFilterGroups = /**
     * @param {?=} recount
     * @return {?}
     */
    function (recount) {
        var _this = this;
        if (recount === void 0) { recount = false; }
        var /** @type {?} */ filterGroups = this.filterGroups ? JSON.parse(JSON.stringify(this.filterGroups)) : undefined;
        return new Promise(function (res, rej) {
            _this.mountCurrentDecFilterGroups();
            if (_this.preSearch) {
                filterGroups = _this.preSearch(filterGroups);
            }
            _this.search.emit({
                filterGroups: filterGroups,
                recount: recount,
                filterMode: _this.filterMode,
                children: _this.childrenFilters,
            });
            res();
        });
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.watchClick = /**
     * @return {?}
     */
    function () {
        document.addEventListener('click', this.actByClickPosition, true);
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.stopWatchingClick = /**
     * @return {?}
     */
    function () {
        document.removeEventListener('click', this.actByClickPosition, true);
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.componentFilterName = /**
     * @return {?}
     */
    function () {
        return this.name + '-filter';
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.watchUrlFilter = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.hasPersistence) {
            return;
        }
        this.watchUrlFilterSubscription = this.route.queryParams
            .subscribe(function (params) {
            var /** @type {?} */ interval = window.setInterval(function () {
                if (_this.name) {
                    var /** @type {?} */ base64Filter = params[_this.componentFilterName()];
                    if (base64Filter) {
                        if (base64Filter !== _this.currentUrlEncodedFilter) {
                            var /** @type {?} */ filter$$1 = _this.getJsonFromBase64Filter(base64Filter);
                            _this.innerDecFilterGroups = filter$$1;
                            _this.mountCurrentDecFilterGroups();
                            _this.onSearch();
                        }
                    }
                    window.clearInterval(interval);
                }
            }, 10);
        });
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.stopWatchingUrlFilter = /**
     * @return {?}
     */
    function () {
        if (this.watchUrlFilterSubscription) {
            this.watchUrlFilterSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.refreshFilterInUrlQuery = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (res, rej) {
            var /** @type {?} */ filterBase64 = _this.getBase64FilterFromDecFilterGroups();
            _this.setFilterInUrlQuery(filterBase64).then(res, rej);
        });
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    DecListFilterComponent.prototype.setFilterInUrlQuery = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter$$1) {
        this.currentUrlEncodedFilter = filter$$1;
        var /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
        queryParams[this.componentFilterName()] = filter$$1;
        return this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
    };
    /**
     * @return {?}
     */
    DecListFilterComponent.prototype.getBase64FilterFromDecFilterGroups = /**
     * @return {?}
     */
    function () {
        if (this.filterGroupsWithoutTabs && this.filterGroupsWithoutTabs.length) {
            var /** @type {?} */ base64Filter = btoa(encodeURIComponent(JSON.stringify(this.filterGroupsWithoutTabs)));
            var /** @type {?} */ baseFilterWithoutEqualSign = base64Filter.replace(/=/g, '');
            return baseFilterWithoutEqualSign; // removes = befor eset the filter
        }
        else {
            return undefined;
        }
    };
    /**
     * @param {?} base64Filter
     * @return {?}
     */
    DecListFilterComponent.prototype.getJsonFromBase64Filter = /**
     * @param {?} base64Filter
     * @return {?}
     */
    function (base64Filter) {
        var /** @type {?} */ base64PadLen = (base64Filter.length % 4) > 0 ? 4 - (base64Filter.length % 4) : 0;
        for (var /** @type {?} */ i = 0; i < base64PadLen; i++) {
            base64Filter += '='; // add = before readd the filter
        }
        var /** @type {?} */ filterObject;
        try {
            filterObject = JSON.parse(decodeURIComponent(atob(base64Filter)));
        }
        catch (/** @type {?} */ error) {
            var /** @type {?} */ msg = 'ListFilterComponent:: Failed to parse the filter. The value is not valid and the filter was removed. Filter value: ';
            console.error(msg, base64Filter);
        }
        return base64Filter ? filterObject : undefined;
    };
    DecListFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-filter',
                    template: "<div class=\"list-filter-wrapper\">\n  <div fxLayout=\"row wrap\" fxLayoutAlign=\"space-between center\">\n    <!--\n      Counter\n    -->\n    <div fxFlex=\"30\">\n      <ng-container *ngIf=\"count >= 0 && !loading\">\n        <span *ngIf=\"count === 0\" class=\"dec-body-strong\">{{ \"label.record-not-found\" | translate }}</span>\n        <span *ngIf=\"count === 1\" class=\"dec-body-strong\">{{ \"label.one-record-found\" | translate }}</span>\n        <span *ngIf=\"count > 1\" class=\"dec-body-strong\"> {{ \"label.records-found\" | translate:{count:count} }}</span>\n      </ng-container>\n    </div>\n\n    <div fxFlex=\"70\" class=\"text-right\">\n\n      <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"end center\" class=\"search-container\">\n        <div>\n\n          <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\" class=\"input-search-container\" [class.active]=\"showSearchInput\">\n            <!-- gap -->\n            <div></div>\n            <a class=\"btn-toogle-search\">\n              <mat-icon (click)=\"toggleSearchInput()\">search</mat-icon>\n            </a>\n            <form fxFlex role=\"form\" (submit)=\"onSearch()\">\n              <div fxLayout=\"row\" fxLayoutGap=\"16px\" fxLayoutAlign=\"start center\" class=\"input-search\">\n                <span class=\"bar-h\"></span>\n                <input fxFlex #inputSearch name=\"search\" [(ngModel)]=\"filterForm.search\">\n                <div *ngIf=\"advancedFilterComponent\" class=\"click\" (click)=\"toggleAdvancedFilter($event)\">\n                  <span class=\"dec-small btn-open-advanced-search\">{{\"label.advanced-options\" | translate}}</span>\n                </div>\n                <!--gap-->\n                <div></div>\n              </div>\n            </form>\n          </div>\n\n        </div>\n\n        <!--Refresh search-->\n        <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\">\n          <a class=\"btn-info margin-icon\" (click)=\"onSearch()\">\n            <mat-icon>refresh</mat-icon>\n          </a>\n        </div>\n        <!--Clear filters-->\n        <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\" *ngIf=\"filterGroupsWithoutTabs?.length\">\n          <a class=\"btn-info\" (click)=\"onClear()\">\n            <mat-icon>clear</mat-icon>\n          </a>\n        </div>\n\n        <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\" *ngIf=\"showInfoButton\">\n          <a class=\"btn-info\" (click)=\"onClickInfo()\">\n            <mat-icon>info_outline</mat-icon>\n          </a>\n        </div>\n\n      </div>\n\n    </div>\n  </div>\n\n\n  <div *ngIf=\"showAdvancedFilter\">\n\n    <mat-card class=\"advanced-search-container\" [ngClass]=\"{'remove-button-enabled': filterGroupsWithoutTabs?.length}\">\n\n      <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n\n        <a (click)=\"closeFilters()\" class=\"btn-close-advanced-search\">\n\n          <i class=\"material-icons\">close</i>\n\n        </a>\n\n      </div>\n\n      <div>\n\n        <ng-content select=\"dec-list-advanced-filter\"></ng-content>\n\n      </div>\n\n    </mat-card>\n\n  </div>\n\n  <dec-list-active-filter-resume\n    *ngIf=\"filterGroupsWithoutTabs?.length\"\n    [filterGroups]=\"filterGroupsWithoutTabs\"\n    (remove)=\"removeDecFilterGroup($event)\"\n    (edit)=\"editDecFilterGroup($event)\"></dec-list-active-filter-resume>\n\n  <dec-list-tabs-filter [filters]=\"filters\" [countReport]=\"countReport\"></dec-list-tabs-filter>\n</div>\n",
                    styles: [".list-filter-wrapper{margin:0 0 16px;position:relative}.list-filter-wrapper .mat-icon{color:#999}.list-filter-wrapper .search-term-input{width:500px;margin-right:8px}.list-filter-wrapper .inline-form{display:inline-block}.list-filter-wrapper .advanced-search-container{position:absolute;top:74px;z-index:1;right:30px;width:552px}.list-filter-wrapper .advanced-search-container.remove-button-enabled{right:62px;width:551px}.list-filter-wrapper .advanced-search-container .btn-close-advanced-search{cursor:pointer}.search-container .input-search-container{transition:all .3s ease;overflow:hidden;width:40px;height:50px}.search-container .input-search-container.active{background:#f8f8fa;color:#999;width:600px}.search-container .input-search-container.active .btn-open-advanced-search{display:inline}.search-container .input-search-container .input-search{width:100%}.search-container .input-search-container .input-search input{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;width:100%;vertical-align:bottom}.search-container .input-search-container .btn-open-advanced-search{display:none}.search-container .btn-clear-search{padding-right:15px;cursor:pointer;color:#999;width:90px}.search-container .btn-info,.search-container .btn-toogle-search{font-size:21px;cursor:pointer;height:21px;color:#999}.search-container .bar-h{border-right:2px solid #d0d0d0;height:21px;margin:auto 0;display:inline-block}"]
                },] },
    ];
    /** @nocollapse */
    DecListFilterComponent.ctorParameters = function () { return [
        { type: PlatformLocation },
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    DecListFilterComponent.propDecorators = {
        preSearch: [{ type: Input }],
        showInfoButton: [{ type: Input }],
        hasPersistence: [{ type: Input }],
        filters: [{ type: Input }],
        loadCountReport: [{ type: Input }],
        search: [{ type: Output }],
        inputSearch: [{ type: ViewChild, args: ['inputSearch',] }],
        tabsFilterComponent: [{ type: ViewChild, args: [DecListTabsFilterComponent,] }],
        advancedFilterComponent: [{ type: ContentChild, args: [DecListAdvancedFilterComponent,] }]
    };
    return DecListFilterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListActiveFilterResumeComponent = /** @class */ (function () {
    function DecListActiveFilterResumeComponent() {
        this.filterGroups = [];
        this.remove = new EventEmitter();
        this.edit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    DecListActiveFilterResumeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} $event
     * @param {?} filterGroup
     * @return {?}
     */
    DecListActiveFilterResumeComponent.prototype.editDecFilterGroup = /**
     * @param {?} $event
     * @param {?} filterGroup
     * @return {?}
     */
    function ($event, filterGroup) {
        $event.stopPropagation();
        this.edit.emit(filterGroup);
    };
    /**
     * @param {?} $event
     * @param {?} filterGroup
     * @return {?}
     */
    DecListActiveFilterResumeComponent.prototype.removeDecFilterGroup = /**
     * @param {?} $event
     * @param {?} filterGroup
     * @return {?}
     */
    function ($event, filterGroup) {
        $event.stopPropagation();
        this.remove.emit(filterGroup);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecListActiveFilterResumeComponent.prototype.getValuetype = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ firstValue = Array.isArray(value) ? value[0] : value;
        var /** @type {?} */ type;
        switch (true) {
            case ("" + firstValue).indexOf('000Z') >= 0:
                type = 'date';
                break;
            default:
                type = 'default';
                break;
        }
        return type;
    };
    DecListActiveFilterResumeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-active-filter-resume',
                    template: "<div *ngIf=\"filterGroups?.length\" class=\"dec-list-active-filter-resume-wrapper\">\n\n  <mat-chip-list>\n\n    <ng-container *ngFor=\"let group of filterGroups; let groupIndex = index;\">\n      <mat-chip *ngIf=\"group?.filters\" (click)=\"editDecFilterGroup($event, groupIndex)\">\n\n        <span *ngFor=\"let filter of group?.filters; let lastFilter = last;\" class=\"item-wrapper\">\n\n          <span [ngSwitch]=\"filter.property !== 'search'\">\n\n            <span *ngSwitchCase=\"true\">{{ 'label.' + filter.property | translate }}</span>\n\n            <span *ngSwitchDefault>{{ 'label.Keyword' | translate }}</span>\n\n          </span>\n\n          <span>:&nbsp;</span>\n\n          <span [ngSwitch]=\"getValuetype(filter.value)\" class=\"value-wrapper\">\n\n            <span *ngSwitchCase=\"'date'\">{{ filter.value | date }}</span>\n\n            <span *ngSwitchDefault>{{ filter.value }}</span>\n\n          </span >\n\n          <span *ngIf=\"!lastFilter\">,</span>\n\n          &nbsp;\n\n        </span>\n\n        <i class=\"material-icons\" (click)=\"removeDecFilterGroup($event, groupIndex)\">remove_circle</i>\n\n      </mat-chip>\n\n    </ng-container>\n\n  </mat-chip-list>\n\n</div>\n",
                    styles: [".mat-tab-body-content{padding:16px 0}.mat-form-field-prefix{margin-right:8px!important}.mat-form-field-suffix{margin-left:8px!important}.mat-elevation-z0{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mat-elevation-z1{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.mat-elevation-z2{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.mat-elevation-z3{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.mat-elevation-z4{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mat-elevation-z5{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}.mat-elevation-z6{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.mat-elevation-z7{box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}.mat-elevation-z8{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-elevation-z9{box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}.mat-elevation-z10{box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}.mat-elevation-z11{box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}.mat-elevation-z12{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-elevation-z13{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}.mat-elevation-z14{box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}.mat-elevation-z15{box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}.mat-elevation-z16{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-elevation-z17{box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}.mat-elevation-z18{box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}.mat-elevation-z19{box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}.mat-elevation-z20{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}.mat-elevation-z21{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}.mat-elevation-z22{box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}.mat-elevation-z23{box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}.mat-elevation-z24{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-card-title{font-size:24px;font-weight:400}.mat-card-content,.mat-card-header .mat-card-title,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:13px;line-height:18px}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif}.mat-expansion-panel-header{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field{width:100%;font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-outline{bottom:1.34375em}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:9px;padding-bottom:9px}.mat-list-item,.mat-list-option{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{font-size:16px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line,.mat-selection-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{font-size:16px}.mat-list .mat-list-option .mat-line,.mat-nav-list .mat-list-option .mat-line,.mat-selection-list .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-item{font-size:12px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line,.mat-selection-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option{font-size:12px}.mat-list[dense] .mat-list-option .mat-line,.mat-nav-list[dense] .mat-list-option .mat-line,.mat-selection-list[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-simple-snackbar{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden}@media screen and (-ms-high-contrast:active){.mat-ripple{display:none}}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1),-webkit-transform 0s cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.288)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;box-sizing:content-box!important}.dec-list-active-filter-resume-wrapper{margin:16px 0 8px}.dec-list-active-filter-resume-wrapper .item-wrapper{max-width:15em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dec-list-active-filter-resume-wrapper .item-wrapper,.dec-list-active-filter-resume-wrapper .material-icons{color:#969696}.dec-list-active-filter-resume-wrapper .filter-content{margin-right:8px}.dec-list-active-filter-resume-wrapper .mat-chip{cursor:pointer}.dec-list-active-filter-resume-wrapper .value-wrapper{color:#ef3f54}"]
                },] },
    ];
    /** @nocollapse */
    DecListActiveFilterResumeComponent.ctorParameters = function () { return []; };
    DecListActiveFilterResumeComponent.propDecorators = {
        filterGroups: [{ type: Input }],
        remove: [{ type: Output }],
        edit: [{ type: Output }]
    };
    return DecListActiveFilterResumeComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListActiveFilterResumeModule = /** @class */ (function () {
    function DecListActiveFilterResumeModule() {
    }
    DecListActiveFilterResumeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatChipsModule,
                        MatIconModule,
                        TranslateModule
                    ],
                    declarations: [DecListActiveFilterResumeComponent],
                    exports: [DecListActiveFilterResumeComponent],
                },] },
    ];
    return DecListActiveFilterResumeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecPermissionDirective = /** @class */ (function () {
    function DecPermissionDirective(service, templateRef, viewContainer) {
        this.service = service;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.hasView = false;
    }
    Object.defineProperty(DecPermissionDirective.prototype, "decPermission", {
        set: /**
         * @param {?} p
         * @return {?}
         */
        function (p) {
            if (!p) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
            }
            else {
                this.hasPermission(p);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} p
     * @return {?}
     */
    DecPermissionDirective.prototype.hasPermission = /**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        var _this = this;
        this.service.user$.subscribe(function (user) {
            if (user && _this.isAllowedAccess(p, user.permissions)) {
                if (!_this.hasView) {
                    _this.viewContainer.createEmbeddedView(_this.templateRef);
                    _this.hasView = true;
                }
            }
            else {
                _this.viewContainer.clear();
                _this.hasView = false;
            }
        });
    };
    /**
     * @param {?=} rolesAllowed
     * @param {?=} currentRoles
     * @return {?}
     */
    DecPermissionDirective.prototype.isAllowedAccess = /**
     * @param {?=} rolesAllowed
     * @param {?=} currentRoles
     * @return {?}
     */
    function (rolesAllowed, currentRoles) {
        if (rolesAllowed === void 0) { rolesAllowed = []; }
        if (currentRoles === void 0) { currentRoles = []; }
        try {
            var /** @type {?} */ matchingRole = currentRoles.find(function (userRole) {
                return rolesAllowed.find(function (alowedRole) {
                    return alowedRole === userRole;
                }) ? true : false;
            });
            return matchingRole ? true : false;
        }
        catch (/** @type {?} */ error) {
            return false;
        }
    };
    DecPermissionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[decPermission]'
                },] },
    ];
    /** @nocollapse */
    DecPermissionDirective.ctorParameters = function () { return [
        { type: DecApiService },
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    DecPermissionDirective.propDecorators = {
        decPermission: [{ type: Input }]
    };
    return DecPermissionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecPermissionModule = /** @class */ (function () {
    function DecPermissionModule() {
    }
    DecPermissionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [
                        DecPermissionDirective
                    ],
                    exports: [
                        DecPermissionDirective
                    ]
                },] },
    ];
    return DecPermissionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListFilterModule = /** @class */ (function () {
    function DecListFilterModule() {
    }
    DecListFilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
                        FormsModule,
                        DecListActiveFilterResumeModule,
                        DecPermissionModule,
                        MatButtonModule,
                        MatCardModule,
                        MatChipsModule,
                        MatIconModule,
                        MatInputModule,
                        TranslateModule,
                    ],
                    declarations: [DecListFilterComponent, DecListTabsFilterComponent],
                    exports: [DecListFilterComponent],
                },] },
    ];
    return DecListFilterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListGridComponent = /** @class */ (function () {
    function DecListGridComponent() {
        this.itemWidth = '280px';
        this.itemGap = '8px';
        this.rowClick = new EventEmitter();
        this._rows = [];
    }
    Object.defineProperty(DecListGridComponent.prototype, "rows", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rows;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._rows !== v) {
                this._rows = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecListGridComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} event
     * @param {?} item
     * @param {?} list
     * @param {?} index
     * @return {?}
     */
    DecListGridComponent.prototype.onItemClick = /**
     * @param {?} event
     * @param {?} item
     * @param {?} list
     * @param {?} index
     * @return {?}
     */
    function (event, item, list, index) {
        this.rowClick.emit({ event: event, item: item, list: list, index: index });
    };
    DecListGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-grid',
                    template: "<div fxLayout=\"row wrap\" [fxLayoutGap]=\"itemGap\" >\n  <div *ngFor=\"let row of rows; let i = index;\" (click)=\"onItemClick($event, row, rows, i)\" [fxFlex]=\"itemWidth\">\n    <div [ngStyle]=\"{margin: itemGap}\">\n      <ng-container\n        [ngTemplateOutlet]=\"templateRef\"\n        [ngTemplateOutletContext]=\"{row: row || {}, list: rows || [], index: i}\"\n      ></ng-container>\n    </div>\n  </div>\n</div>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecListGridComponent.ctorParameters = function () { return []; };
    DecListGridComponent.propDecorators = {
        templateRef: [{ type: ContentChild, args: [TemplateRef,] }],
        itemWidth: [{ type: Input }],
        itemGap: [{ type: Input }],
        rowClick: [{ type: Output }]
    };
    return DecListGridComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListTableColumnComponent = /** @class */ (function () {
    function DecListTableColumnComponent() {
        this.title = '';
        this._colSpan = 1;
    }
    Object.defineProperty(DecListTableColumnComponent.prototype, "colSpan", {
        get: /**
         * @return {?}
         */
        function () {
            return this._colSpan;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ number = +v;
            this._colSpan = isNaN(number) ? 1 : number;
        },
        enumerable: true,
        configurable: true
    });
    DecListTableColumnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-table-column',
                    template: "<ng-content></ng-content>\n",
                    styles: [""]
                },] },
    ];
    DecListTableColumnComponent.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }],
        prop: [{ type: Input }],
        title: [{ type: Input }],
        colSpan: [{ type: Input }]
    };
    return DecListTableColumnComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListTableComponent = /** @class */ (function () {
    function DecListTableComponent() {
        this._rows = [];
        this.sort = new EventEmitter();
        this.rowClick = new EventEmitter();
    }
    Object.defineProperty(DecListTableComponent.prototype, "rows", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rows;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._rows !== v) {
                this._rows = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    DecListTableComponent.prototype.onSort = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ sortConfig = [{
                property: event.sorts[0].prop,
                order: event.sorts[0].dir.toUpperCase()
            }];
        if (sortConfig !== this.columnsSortConfig) {
            this.columnsSortConfig = sortConfig;
            this.sort.emit(this.columnsSortConfig);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecListTableComponent.prototype.onItemClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ event = $event;
        var /** @type {?} */ item = $event.row;
        var /** @type {?} */ list = this.rows;
        var /** @type {?} */ index = $event.row.$$index;
        this.rowClick.emit({ event: event, item: item, list: list, index: index });
    };
    DecListTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-table',
                    template: "<ngx-datatable #tableComponent\n  columnMode=\"flex\"\n  headerHeight=\"24px\"\n  rowHeight=\"auto\"\n  [externalSorting]=\"true\"\n  [messages]=\"{emptyMessage:''}\"\n  [rows]=\"rows\"\n  (sort)=\"onSort($event)\"\n  (activate)=\"onItemClick($event)\">\n\n  <ngx-datatable-column *ngFor=\"let column of columns;\"\n                         name=\"{{column.title | translate}}\"\n                         [flexGrow]=\"column.colSpan\"\n                         [prop]=\"column.prop\"\n                         [sortable]=\"column.prop ? true : false\">\n\n    <ng-template *ngIf=\"column.template ? true : false\"\n      let-row=\"row\"\n      let-index=\"rowIndex\"\n      ngx-datatable-cell-template>\n\n      <ng-container\n        [ngTemplateOutlet]=\"column.template\"\n        [ngTemplateOutletContext]=\"{row: row || {}, list: rows || [], index: index}\"\n      ></ng-container>\n\n    </ng-template>\n\n  </ngx-datatable-column>\n\n</ngx-datatable>\n",
                    styles: ["::ng-deep .ngx-datatable .overflow-visible{overflow:visible!important}::ng-deep datatable-scroller{width:100%!important}::ng-deep .ngx-datatable.no-overflow{overflow:auto}::ng-deep .ngx-datatable.no-padding .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:0}::ng-deep .ngx-datatable .datatable-header{padding:11px 16px}::ng-deep .ngx-datatable .datatable-header .datatable-header-cell-label{font-size:12px;font-weight:500}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell{font-size:13px;font-weight:400;overflow:hidden;min-height:100%;display:table;-webkit-user-select:initial;-moz-user-select:initial;-ms-user-select:initial;-o-user-select:initial;user-select:initial}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:16px;display:table-cell;vertical-align:middle;word-break:break-all}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell.cell-top .datatable-body-cell-label{vertical-align:top}::ng-deep .ngx-datatable .datatable-row-detail{padding:10px}::ng-deep .ngx-datatable .sort-btn{width:0;height:0}::ng-deep .ngx-datatable .icon-down{border-left:5px solid transparent;border-right:5px solid transparent}::ng-deep .ngx-datatable .icon-up{border-left:5px solid transparent;border-right:5px solid transparent}"]
                },] },
    ];
    /** @nocollapse */
    DecListTableComponent.ctorParameters = function () { return []; };
    DecListTableComponent.propDecorators = {
        rows: [{ type: Input }],
        tableComponent: [{ type: ViewChild, args: [DatatableComponent,] }],
        columns: [{ type: ContentChildren, args: [DecListTableColumnComponent,] }],
        sort: [{ type: Output }],
        rowClick: [{ type: Output }]
    };
    return DecListTableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListComponent = /** @class */ (function () {
    /*
     * ngOnInit
     *
     *
     */
    function DecListComponent(service) {
        var _this = this;
        this.service = service;
        /*
          * filterMode
          *
          *
          */
        this.filterMode = 'tabs';
        this.filterData = new Subject();
        this._loading = true;
        this.scrollEventEmiter = new EventEmitter();
        /*
           * limit
           *
           *
           */
        this.limit = 10;
        /*
           * scrollableContainerClass
           *
           * Where the scroll watcher should be listening
           */
        this.scrollableContainerClass = 'mat-sidenav-content';
        /*
           * showFooter
           *
           *
           */
        this.showFooter = true;
        /*
           * postSearch
           *
           * This middleware is used to trigger events after every search
           */
        this.postSearch = new EventEmitter();
        /*
           * rowClick
           *
           * Emits an event when a row or card is clicked
           */
        this.rowClick = new EventEmitter();
        this.getListMode = function () {
            var /** @type {?} */ listMode = _this.listMode;
            if (_this.filter && _this.filter.tabsFilterComponent) {
                if (_this.selectedTab && _this.selectedTab.listMode) {
                    listMode = _this.selectedTab.listMode;
                }
                else {
                    listMode = _this.table ? 'table' : 'grid';
                }
            }
            return listMode;
        };
        this.actByScrollPosition = function ($event) {
            if ($event['path']) {
                var /** @type {?} */ elementWithCdkOverlayClass = $event['path'].find(function (path) {
                    var /** @type {?} */ className = path['className'] || '';
                    var /** @type {?} */ insideOverlay = className.indexOf('cdk-overlay') >= 0;
                    var /** @type {?} */ insideFullscreanDialogContainer = className.indexOf('fullscrean-dialog-container') >= 0;
                    return insideOverlay || insideFullscreanDialogContainer;
                });
                if (!elementWithCdkOverlayClass) {
                    // avoid closing filter from any open dialog
                    if (!_this.isLastPage) {
                        var /** @type {?} */ target = $event['target'];
                        var /** @type {?} */ limit = target.scrollHeight - target.clientHeight;
                        if (target.scrollTop >= (limit - 16)) {
                            _this.showMore();
                        }
                    }
                }
            }
        };
        this.emitScrollEvent = function ($event) {
            if (!_this.loading) {
                _this.scrollEventEmiter.emit($event);
            }
        };
    }
    Object.defineProperty(DecListComponent.prototype, "loading", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loading;
        },
        /*
         * loading
         *
         *
         */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._loading = v;
            if (this.filter) {
                this.filter.loading = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListComponent.prototype, "filterGroups", {
        /*
         * filterGroups
         *
         *
         */
        get: /**
         * @return {?}
         */
        function () {
            return this.filter ? this.filter.filterGroups : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListComponent.prototype, "endpoint", {
        get: /**
         * @return {?}
         */
        function () {
            return this._endpoint;
        },
        /*
         * endpoint
         *
         *
         */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._endpoint !== v) {
                this._endpoint = (v[0] && v[0] === '/') ? v.replace('/', '') : v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListComponent.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return this._name;
        },
        /*
         * name
         *
         *
         */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._name !== v) {
                this._name = v;
                this.setFiltersComponentsBasePathAndNames();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListComponent.prototype, "rows", {
        get: /**
         * @return {?}
         */
        function () {
            return this.report ? this.report.result.rows : undefined;
        },
        /*
         * rows
         *
         *
         */
        set: /**
         * @param {?} rows
         * @return {?}
         */
        function (rows) {
            this.setRows(rows);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListComponent.prototype, "filter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._filter;
        },
        /*
         * filter
         *
         *
         */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._filter !== v) {
                this._filter = v;
                this.setFiltersComponentsBasePathAndNames();
            }
        },
        enumerable: true,
        configurable: true
    });
    /*
     * ngOnInit
     *
     * Starts a fresh component and prepare it to run
     *
     * - Start the Reactive Report
     * - Subscribe to the Reactive Report
     * - Start watching window Scroll
     * - Ensure unique name
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.watchFilterData();
        this.ensureUniqueName();
        this.detectListModeBasedOnGridAndTablePresence();
    };
    /*
    * ngAfterViewInit
    *
    * Wait for the subcomponents to start before run the component
    *
    * - Start watching Filter
    * - Do the first load
    */
    /**
     * @return {?}
     */
    DecListComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.watchFilter();
        this.doFirstLoad();
        this.detectListMode();
        this.watchTabsChange();
        this.watchTableSort();
        this.registerChildWatchers();
        this.watchScroll();
        this.watchScrollEventEmitter();
    };
    /*
     * ngOnDestroy
     *
     * Destroy watcher to free meemory and remove unnecessary triggers
     *
     * - Unsubscribe from the Reactive Report
     * - Stop watching window Scroll
     * - Stop watching Filter
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeToReactiveReport();
        this.stopWatchingScroll();
        this.stopWatchingFilter();
        this.stopWatchingTabsChange();
        this.stopWatchingTableSort();
        this.stopWatchingScrollEventEmitter();
    };
    /*
     * reloadCountReport
     *
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.reloadCountReport = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.filter && this.filter.filters && this.filter.loadCountReport) {
            var /** @type {?} */ endpoint = this.endpoint[this.endpoint.length - 1] === '/' ? this.endpoint + "count" : this.endpoint + "/count";
            var /** @type {?} */ filters = this.filter.filters;
            var /** @type {?} */ payloadWithSearchableProperties = this.getCountableFilters(filters);
            this.service.post(endpoint, payloadWithSearchableProperties)
                .subscribe(function (res) {
                _this.countReport = _this.mountCountReport(res);
                _this.filter.countReport = _this.countReport;
            });
        }
    };
    /*
     * removeItem
     *
     * Removes an item from the list
     */
    /**
     * @param {?} id
     * @return {?}
     */
    DecListComponent.prototype.removeItem = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var /** @type {?} */ item = this.rows.find(function (_item) { return _item.id === id; });
        if (item) {
            var /** @type {?} */ itemIndex = this.rows.indexOf(item);
            if (itemIndex >= 0) {
                this.rows.splice(itemIndex, 1);
            }
        }
        if (this.endpoint) {
            this.reloadCountReport();
        }
    };
    /*
     * restart
     *
     * Clear the list and reload the first page
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.restart = /**
     * @return {?}
     */
    function () {
        this.loadReport(true);
    };
    /*
     * showMore
     *
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.showMore = /**
     * @return {?}
     */
    function () {
        return this.loadReport();
    };
    /*
     * searchCollapsable
     *
     * search by collapsable filter
     */
    /**
     * @param {?} filter
     * @return {?}
     */
    DecListComponent.prototype.searchCollapsable = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter$$1) {
        if (this.selectedCollapsable !== filter$$1.uid) {
            this.loadByOpennedCollapse(filter$$1.uid);
        }
    };
    /*
     * tableAndGridAreSet
     *
     * Return true if there are both GRID and TABLE definition inside the list
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.tableAndGridAreSet = /**
     * @return {?}
     */
    function () {
        return this.grid && this.table;
    };
    /*
     * toggleListMode
     *
     * Changes between GRID and TABLE visualizatoin modes
     */
    /**
     * @return {?}
     */
    DecListComponent.prototype.toggleListMode = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.listMode = this.listMode === 'grid' ? 'table' : 'grid';
        if (this.listMode === 'table') {
            setTimeout(function () {
                _this.table.tableComponent.recalculate();
            }, 1);
        }
    };
    /*
     * getCollapsableCount
     *
     * get Collapsable Count from countReport
     */
    /**
     * @param {?} uid
     * @return {?}
     */
    DecListComponent.prototype.getCollapsableCount = /**
     * @param {?} uid
     * @return {?}
     */
    function (uid) {
        try {
            return this.countReport[this.selectedTab].children[uid].count;
        }
        catch (/** @type {?} */ error) {
            return '?';
        }
    };
    /**
     * @param {?} filtersCounters
     * @return {?}
     */
    DecListComponent.prototype.mountCountReport = /**
     * @param {?} filtersCounters
     * @return {?}
     */
    function (filtersCounters) {
        var _this = this;
        var /** @type {?} */ countReport = {
            count: 0
        };
        filtersCounters.forEach(function (item) {
            countReport[item.uid] = {
                count: item.count
            };
            if (item.children) {
                countReport[item.uid].children = _this.mountCountReport(item.children);
            }
        });
        return countReport;
    };
    /**
     * @param {?} filters
     * @return {?}
     */
    DecListComponent.prototype.getCountableFilters = /**
     * @param {?} filters
     * @return {?}
     */
    function (filters) {
        var _this = this;
        var /** @type {?} */ filterGroupsWithoutTabs = this.filter.filterGroupsWithoutTabs || [{ filters: [] }];
        var /** @type {?} */ filtersPlusSearch = filters.map(function (decFilter) {
            var /** @type {?} */ decFilterFiltersPlusSearch = JSON.parse(JSON.stringify(decFilter));
            if (decFilterFiltersPlusSearch.filters) {
                var /** @type {?} */ tabFiltersCopy_1 = JSON.parse(JSON.stringify(decFilterFiltersPlusSearch.filters));
                decFilterFiltersPlusSearch.filters = JSON.parse(JSON.stringify(filterGroupsWithoutTabs));
                decFilterFiltersPlusSearch.filters.forEach(function (filterGroup) {
                    (_a = filterGroup.filters).push.apply(_a, __spread(tabFiltersCopy_1));
                    var _a;
                });
            }
            else if (decFilterFiltersPlusSearch.children) {
                decFilterFiltersPlusSearch.children = _this.getCountableFilters(decFilterFiltersPlusSearch.children);
            }
            return {
                uid: decFilterFiltersPlusSearch.uid,
                filters: decFilterFiltersPlusSearch.filters,
                children: decFilterFiltersPlusSearch.children,
            };
        });
        return this.ensureFilterValuesAsArray(filtersPlusSearch);
    };
    /**
     * @param {?=} filterGroups
     * @return {?}
     */
    DecListComponent.prototype.ensureFilterValuesAsArray = /**
     * @param {?=} filterGroups
     * @return {?}
     */
    function (filterGroups) {
        var _this = this;
        if (filterGroups === void 0) { filterGroups = []; }
        return filterGroups.map(function (decListFilter) {
            if (decListFilter.filters) {
                _this.appendFilterGroupsBasedOnSearchableProperties(decListFilter.filters);
                decListFilter.filters = decListFilter.filters.map(function (filterGroup) {
                    filterGroup.filters = filterGroup.filters.map(function (filter$$1) {
                        filter$$1.value = Array.isArray(filter$$1.value) ? filter$$1.value : [filter$$1.value];
                        return filter$$1;
                    });
                    return filterGroup;
                });
            }
            return decListFilter;
        });
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.detectListMode = /**
     * @return {?}
     */
    function () {
        this.getListMode();
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.detectListModeBasedOnGridAndTablePresence = /**
     * @return {?}
     */
    function () {
        this.listMode = this.listMode ? this.listMode : this.table ? 'table' : 'grid';
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.isTabsFilterDefined = /**
     * @return {?}
     */
    function () {
        return this.filter && this.filter.tabsFilterComponent;
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.doFirstLoad = /**
     * @return {?}
     */
    function () {
        if (this.isTabsFilterDefined()) {
            this.doFirstLoadByTabsFilter();
        }
        else {
            this.doFirstLoadLocally(true);
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.doFirstLoadByTabsFilter = /**
     * @return {?}
     */
    function () {
        this.filter.tabsFilterComponent.doFirstLoad();
    };
    /**
     * @param {?} refresh
     * @return {?}
     */
    DecListComponent.prototype.doFirstLoadLocally = /**
     * @param {?} refresh
     * @return {?}
     */
    function (refresh) {
        this.loadReport(refresh);
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.ensureUniqueName = /**
     * @return {?}
     */
    function () {
        if (!this.name) {
            var /** @type {?} */ error = 'ListComponentError: The list component must have an unique name to be used in url filter.'
                + ' Please, ensure that you have passed an unique namme to the component.';
            throw new Error(error);
        }
    };
    /**
     * @param {?} filterUid
     * @return {?}
     */
    DecListComponent.prototype.loadByOpennedCollapse = /**
     * @param {?} filterUid
     * @return {?}
     */
    function (filterUid) {
        var _this = this;
        var /** @type {?} */ filter$$1 = this.collapsableFilters.children.find(function (item) { return item.uid === filterUid; });
        var /** @type {?} */ filterGroup = { filters: filter$$1.filters };
        this.loadReport(true, filterGroup);
        setTimeout(function () {
            _this.selectedCollapsable = filter$$1.uid;
        }, 0);
    };
    /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilterGroups
     * @return {?}
     */
    DecListComponent.prototype.loadReport = /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilterGroups
     * @return {?}
     */
    function (clearAndReloadReport, collapseFilterGroups) {
        var _this = this;
        return new Promise(function (res, rej) {
            if (clearAndReloadReport && _this.rows) {
                _this.setRows(_this.rows);
            }
            _this.clearAndReloadReport = clearAndReloadReport;
            _this.loading = true;
            if (_this.endpoint) {
                _this.mountPayload(clearAndReloadReport, collapseFilterGroups)
                    .then(function (payload) {
                    _this.payload = payload;
                    _this.filterData.next({ endpoint: _this.endpoint, payload: _this.payload, cbk: res, clear: clearAndReloadReport });
                });
            }
            else if (_this.customFetchMethod) {
                _this.filterData.next();
            }
            else if (!_this.rows) {
                setTimeout(function () {
                    if (!_this.rows) {
                        rej('No endpoint, customFetchMethod or rows set');
                    }
                    _this.loading = false;
                }, 1);
            }
        });
    };
    /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilterGroups
     * @return {?}
     */
    DecListComponent.prototype.mountPayload = /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilterGroups
     * @return {?}
     */
    function (clearAndReloadReport, collapseFilterGroups) {
        var _this = this;
        if (clearAndReloadReport === void 0) { clearAndReloadReport = false; }
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ searchFilterGroups = _this.filter ? _this.filter.filterGroups : undefined;
            var /** @type {?} */ filterGroups = _this.appendFilterGroupsToEachFilterGroup(searchFilterGroups, collapseFilterGroups);
            var /** @type {?} */ payload = {};
            payload.limit = _this.limit;
            if (filterGroups) {
                payload.filterGroups = filterGroups;
            }
            if (_this.columnsSortConfig) {
                payload.sort = _this.columnsSortConfig;
            }
            if (!clearAndReloadReport && _this.report) {
                payload.page = _this.report.page + 1;
                payload.limit = _this.report.limit;
            }
            resolve(payload);
        });
    };
    /**
     * @param {?} filterGroups
     * @param {?} filterGroupToAppend
     * @return {?}
     */
    DecListComponent.prototype.appendFilterGroupsToEachFilterGroup = /**
     * @param {?} filterGroups
     * @param {?} filterGroupToAppend
     * @return {?}
     */
    function (filterGroups, filterGroupToAppend) {
        if (filterGroupToAppend) {
            if (filterGroups && filterGroups.length > 0) {
                filterGroups.forEach(function (group) {
                    (_a = group.filters).push.apply(_a, __spread(filterGroupToAppend.filters));
                    var _a;
                });
            }
            else {
                filterGroups = [filterGroupToAppend];
            }
        }
        return filterGroups || [];
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.setFiltersComponentsBasePathAndNames = /**
     * @return {?}
     */
    function () {
        if (this.filter) {
            this.filter.name = this.name;
            if (this.filter.tabsFilterComponent) {
                this.filter.tabsFilterComponent.name = this.name;
                if (this.customFetchMethod) {
                    this.filter.tabsFilterComponent.customFetchMethod = this.customFetchMethod;
                }
                else {
                    this.filter.tabsFilterComponent.service = this.service;
                }
            }
        }
    };
    /**
     * @param {?=} rows
     * @return {?}
     */
    DecListComponent.prototype.setRows = /**
     * @param {?=} rows
     * @return {?}
     */
    function (rows) {
        if (rows === void 0) { rows = []; }
        this.report = {
            page: 1,
            result: {
                rows: rows,
                count: rows.length
            }
        };
        this.detectLastPage(rows, rows.length);
        this.updateContentChildren();
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchScrollEventEmitter = /**
     * @return {?}
     */
    function () {
        this.scrollEventEmiterSubscription = this.scrollEventEmiter
            .pipe(debounceTime(150), distinctUntilChanged()).subscribe(this.actByScrollPosition);
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.stopWatchingScrollEventEmitter = /**
     * @return {?}
     */
    function () {
        if (this.scrollEventEmiterSubscription) {
            this.scrollEventEmiterSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchFilterData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.reactiveReport = this.filterData
            .pipe(debounceTime(150), // avoid muiltiple request when the filter or tab change too fast
        // avoid muiltiple request when the filter or tab change too fast
        switchMap(function (filterData) {
            var /** @type {?} */ observable = new BehaviorSubject(undefined);
            var /** @type {?} */ fetchMethod = _this.customFetchMethod || _this.service.get;
            var /** @type {?} */ endpoint = filterData ? filterData.endpoint : undefined;
            var /** @type {?} */ payloadWithSearchableProperties = _this.getPayloadWithSearchTransformedIntoSearchableProperties(_this.payload);
            if (filterData && filterData.clear) {
                _this.setRows([]);
            }
            fetchMethod(endpoint, payloadWithSearchableProperties)
                .subscribe(function (res) {
                observable.next(res);
                if (filterData && filterData.cbk) {
                    setTimeout(function () {
                        // wait for subscribers to refresh their rows
                        filterData.cbk(new Promise(function (resolve, rej) {
                            resolve(res);
                        }));
                    }, 1);
                }
                return res;
            });
            return observable;
        }));
        this.subscribeToReactiveReport();
    };
    /**
     * @param {?} payload
     * @return {?}
     */
    DecListComponent.prototype.getPayloadWithSearchTransformedIntoSearchableProperties = /**
     * @param {?} payload
     * @return {?}
     */
    function (payload) {
        var /** @type {?} */ payloadCopy = __assign({}, payload);
        if (payloadCopy.filterGroups && this.searchableProperties) {
            payloadCopy.filterGroups = __spread(payload.filterGroups);
            this.appendFilterGroupsBasedOnSearchableProperties(payloadCopy.filterGroups);
            return payloadCopy;
        }
        else {
            return this.payload;
        }
    };
    /**
     * @param {?} filterGroups
     * @return {?}
     */
    DecListComponent.prototype.appendFilterGroupsBasedOnSearchableProperties = /**
     * @param {?} filterGroups
     * @return {?}
     */
    function (filterGroups) {
        var /** @type {?} */ filterGroupThatContainsBasicSearch = this.getFilterGroupThatContainsTheBasicSearch(filterGroups);
        if (filterGroupThatContainsBasicSearch) {
            this.removeFilterGroup(filterGroups, filterGroupThatContainsBasicSearch);
            var /** @type {?} */ basicSearch_1 = filterGroupThatContainsBasicSearch.filters.find(function (filter$$1) { return filter$$1.property === 'search'; });
            var /** @type {?} */ basicSearchIndex_1 = filterGroupThatContainsBasicSearch.filters.indexOf(basicSearch_1);
            this.searchableProperties.forEach(function (property) {
                var /** @type {?} */ newFilterGroup = {
                    filters: __spread(filterGroupThatContainsBasicSearch.filters)
                };
                newFilterGroup.filters[basicSearchIndex_1] = {
                    property: property,
                    value: [basicSearch_1.value]
                };
                filterGroups.push(newFilterGroup);
            });
        }
    };
    /**
     * @param {?} filterGroups
     * @param {?} filterGroupThatContainsBasicSearch
     * @return {?}
     */
    DecListComponent.prototype.removeFilterGroup = /**
     * @param {?} filterGroups
     * @param {?} filterGroupThatContainsBasicSearch
     * @return {?}
     */
    function (filterGroups, filterGroupThatContainsBasicSearch) {
        var /** @type {?} */ filterGroupThatContainsBasicSearchIndex = filterGroups.indexOf(filterGroupThatContainsBasicSearch);
        filterGroups.splice(filterGroupThatContainsBasicSearchIndex, 1);
    };
    /**
     * @param {?} filterGroups
     * @return {?}
     */
    DecListComponent.prototype.getFilterGroupThatContainsTheBasicSearch = /**
     * @param {?} filterGroups
     * @return {?}
     */
    function (filterGroups) {
        return filterGroups.find(function (filterGroup) {
            var /** @type {?} */ basicSerchFilter = filterGroup.filters ? filterGroup.filters.find(function (filter$$1) { return filter$$1.property === 'search'; }) : undefined;
            return basicSerchFilter ? true : false;
        });
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.subscribeToReactiveReport = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.reactiveReportSubscription = this.reactiveReport
            .pipe(tap(function (res) {
            if (res) {
                _this.loading = false;
            }
        }))
            .subscribe(function (data) {
            if (data && data.result && data.result.rows) {
                if (!_this.clearAndReloadReport) {
                    data.result.rows = _this.report.result.rows.concat(data.result.rows);
                }
                _this.report = data;
                _this.postSearch.emit(data);
                _this.updateContentChildren();
                _this.detectLastPage(data.result.rows, data.result.count);
            }
        });
    };
    /**
     * @param {?} rows
     * @param {?} count
     * @return {?}
     */
    DecListComponent.prototype.detectLastPage = /**
     * @param {?} rows
     * @param {?} count
     * @return {?}
     */
    function (rows, count) {
        var /** @type {?} */ numberOfrows = rows.length;
        var /** @type {?} */ emptList = numberOfrows === 0;
        var /** @type {?} */ singlePageList = numberOfrows === count;
        this.isLastPage = emptList || singlePageList;
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.unsubscribeToReactiveReport = /**
     * @return {?}
     */
    function () {
        if (this.reactiveReportSubscription) {
            this.reactiveReportSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.updateContentChildren = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ rows = this.endpoint ? this.report.result.rows : this.rows;
        if (this.grid) {
            this.grid.rows = rows;
        }
        if (this.table) {
            this.table.rows = rows;
        }
        if (this.filter) {
            this.filter.count = this.report.result.count;
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.registerChildWatchers = /**
     * @return {?}
     */
    function () {
        if (this.grid) {
            this.watchGridRowClick();
        }
        if (this.table) {
            this.watchTableRowClick();
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchGridRowClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.grid.rowClick.subscribe(function ($event) {
            _this.rowClick.emit($event);
        });
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchTableRowClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.table.rowClick.subscribe(function ($event) {
            _this.rowClick.emit($event);
        });
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchFilter = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.filter) {
            this.filterSubscription = this.filter.search.subscribe(function (event) {
                var /** @type {?} */ tabChanged = _this.previousSelectedTab && _this.previousSelectedTab !== _this.selectedTab;
                var /** @type {?} */ filterModeChanged = _this.filterMode !== event.filterMode;
                if (tabChanged) {
                    _this.previousSelectedTab = _this.selectedTab;
                    _this.setRows([]); // if changing tabs, clear the results before showing the rows because it is done only after fetching the data
                }
                if (filterModeChanged) {
                    _this.filterMode = event.filterMode;
                }
                if (_this.filterMode === 'tabs') {
                    _this.selectedCollapsable = undefined;
                    _this.collapsableFilters = undefined;
                    _this.loadReport(true).then(function (res) {
                        if (event.recount) {
                            _this.reloadCountReport();
                        }
                    });
                }
                else {
                    if (!_this.countReport || event.recount) {
                        _this.reloadCountReport();
                    }
                    if (_this.selectedCollapsable && !tabChanged) {
                        _this.loadByOpennedCollapse(_this.selectedCollapsable);
                    }
                    else {
                        _this.selectedCollapsable = undefined;
                        _this.collapsableFilters = {
                            tab: _this.selectedTab,
                            children: event.children ? event.children : []
                        };
                    }
                }
            });
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.stopWatchingFilter = /**
     * @return {?}
     */
    function () {
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchScroll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.scrollableContainer = document.getElementsByClassName(_this.scrollableContainerClass)[0];
            if (_this.scrollableContainer) {
                _this.scrollableContainer.addEventListener('scroll', _this.emitScrollEvent, true);
            }
        }, 1);
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.stopWatchingScroll = /**
     * @return {?}
     */
    function () {
        if (this.scrollableContainer) {
            this.scrollableContainer.removeEventListener('scroll', this.emitScrollEvent, true);
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchTabsChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.filter && this.filter.tabsFilterComponent) {
            this.selectedTab = this.filter.tabsFilterComponent.selectedTab;
            this.tabsChangeSubscription = this.filter.tabsFilterComponent.tabChange.subscribe(function (tab) {
                _this.selectedTab = tab;
                _this.detectListMode();
            });
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.stopWatchingTabsChange = /**
     * @return {?}
     */
    function () {
        if (this.tabsChangeSubscription) {
            this.tabsChangeSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.watchTableSort = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.table) {
            this.tableSortSubscription = this.table.sort.subscribe(function (columnsSortConfig) {
                if (_this.columnsSortConfig !== columnsSortConfig) {
                    _this.columnsSortConfig = columnsSortConfig;
                    if (_this.collapsableFilters) {
                        _this.loadByOpennedCollapse(_this.selectedCollapsable);
                    }
                    else {
                        _this.loadReport(true);
                    }
                }
            });
        }
    };
    /**
     * @return {?}
     */
    DecListComponent.prototype.stopWatchingTableSort = /**
     * @return {?}
     */
    function () {
        if (this.tableSortSubscription) {
            this.tableSortSubscription.unsubscribe();
        }
    };
    DecListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list',
                    template: "<!-- COMPONENT LAYOUT -->\n<div class=\"list-component-wrapper\">\n  <div *ngIf=\"filter\">\n    <ng-content select=\"dec-list-filter\"></ng-content>\n  </div>\n  <div *ngIf=\"report || filterMode === 'collapse'\">\n    <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n      <div fxFlex class=\"text-right\" *ngIf=\"tableAndGridAreSet()\">\n        <button type=\"button\" mat-icon-button (click)=\"toggleListMode()\">\n          <mat-icon title=\"Switch to table mode\" aria-label=\"Switch to table mode\" color=\"primary\" contrastFontWithBg *ngIf=\"listMode === 'grid'\">view_headline</mat-icon>\n          <mat-icon title=\"Switch to grid mode\" aria-label=\"Switch to grid mode\" color=\"primary\" contrastFontWithBg *ngIf=\"listMode === 'table'\">view_module</mat-icon>\n        </button>\n      </div>\n      <div fxFlex>\n        <div *ngIf=\"filterMode == 'collapse' then collapseTemplate else tabsTemplate\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- GRID TEMPLATE -->\n<ng-template #gridTemplate>\n  <ng-content select=\"dec-list-grid\"></ng-content>\n</ng-template>\n\n<!-- TABLE TEMPLATE -->\n<ng-template #listTemplate>\n  <ng-content select=\"dec-list-table\"></ng-content>\n</ng-template>\n\n<!-- FOOTER TEMPLATE -->\n<ng-template #footerTemplate>\n  <ng-content select=\"dec-list-footer\"></ng-content>\n  <p class=\"list-footer\">\n    {{ 'label.amount-loaded-of-total' |\n      translate:{\n        loaded: report?.result?.rows?.length,\n        total: report?.result?.count\n      }\n    }}\n  </p>\n</ng-template>\n\n<!-- COLLAPSE TEMPLATE -->\n<ng-template #tabsTemplate>\n  <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n    <div *ngIf=\"listMode == 'grid' then gridTemplate else listTemplate\"></div>\n    <!-- FOOTER CONTENT -->\n    <div fxFlex>\n      <div *ngIf=\"showFooter && !loading then footerTemplate\"></div>\n    </div>\n    <!-- LOADING SPINNER -->\n    <div fxFlex *ngIf=\"loading\" class=\"text-center loading-spinner-wrapper\">\n      <dec-spinner></dec-spinner>\n    </div>\n    <!-- LOAD MORE BUTTON -->\n    <div fxFlex *ngIf=\"!isLastPage && !loading && !disableShowMoreButton\" class=\"text-center\">\n      <button type=\"button\" mat-raised-button (click)=\"showMore()\">{{'label.show-more' | translate}}</button>\n    </div>\n  </div>\n</ng-template>\n\n<!-- COLLAPSE TEMPLATE -->\n<ng-template #collapseTemplate>\n  <mat-accordion>\n    <ng-container *ngFor=\"let filter of collapsableFilters.children\">\n      <mat-expansion-panel (opened)=\"searchCollapsable(filter)\">\n        <mat-expansion-panel-header>\n          <div class=\"collapse-title\" fxLayout=\"row\" fxLayoutGap=\"32px\" fxLayoutAlign=\"left center\">\n            <div fxFlex=\"96px\" *ngIf=\"countReport\">\n              <dec-label [colorHex]=\"filter.color\">{{ getCollapsableCount(filter.uid) }}</dec-label>\n            </div>\n            {{ 'label.' + filter.label | translate }}\n          </div>\n        </mat-expansion-panel-header>\n        <div *ngIf=\"selectedCollapsable === filter.uid\">\n          <ng-container [ngTemplateOutlet]=\"tabsTemplate\"></ng-container>\n        </div>\n      </mat-expansion-panel>\n    </ng-container>\n  </mat-accordion>\n  <div class=\"accordion-bottom-margin\"></div>\n</ng-template>\n\n",
                    styles: [".list-footer{font-size:14px;text-align:center}.list-component-wrapper{min-height:72px}.text-right{text-align:right}.loading-spinner-wrapper{padding:32px}.collapse-title{width:100%}.accordion-bottom-margin{margin-bottom:100px}"]
                },] },
    ];
    /** @nocollapse */
    DecListComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecListComponent.propDecorators = {
        customFetchMethod: [{ type: Input }],
        columnsSortConfig: [{ type: Input }],
        disableShowMoreButton: [{ type: Input }],
        endpoint: [{ type: Input }],
        name: [{ type: Input }],
        rows: [{ type: Input, args: ['rows',] }],
        limit: [{ type: Input }],
        listMode: [{ type: Input }],
        scrollableContainerClass: [{ type: Input }],
        searchableProperties: [{ type: Input }],
        showFooter: [{ type: Input }],
        postSearch: [{ type: Output }],
        rowClick: [{ type: Output }],
        grid: [{ type: ContentChild, args: [DecListGridComponent,] }],
        table: [{ type: ContentChild, args: [DecListTableComponent,] }],
        filter: [{ type: ContentChild, args: [DecListFilterComponent,] }]
    };
    return DecListComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListTableModule = /** @class */ (function () {
    function DecListTableModule() {
    }
    DecListTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
                        NgxDatatableModule,
                        TranslateModule,
                    ],
                    declarations: [
                        DecListTableComponent,
                        DecListTableColumnComponent,
                    ],
                    exports: [
                        DecListTableComponent,
                        DecListTableColumnComponent,
                    ],
                },] },
    ];
    return DecListTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListFooterComponent = /** @class */ (function () {
    function DecListFooterComponent() {
    }
    DecListFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-footer',
                    template: "<ng-content></ng-content>\n",
                    styles: [""]
                },] },
    ];
    return DecListFooterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListAdvancedFilterModule = /** @class */ (function () {
    function DecListAdvancedFilterModule() {
    }
    DecListAdvancedFilterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatButtonModule,
                        TranslateModule,
                        FlexLayoutModule,
                    ],
                    declarations: [DecListAdvancedFilterComponent],
                    exports: [DecListAdvancedFilterComponent],
                },] },
    ];
    return DecListAdvancedFilterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListActionsComponent = /** @class */ (function () {
    function DecListActionsComponent() {
    }
    /**
     * @return {?}
     */
    DecListActionsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    DecListActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-actions',
                    template: "<ng-content></ng-content>>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecListActionsComponent.ctorParameters = function () { return []; };
    DecListActionsComponent.propDecorators = {
        template: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return DecListActionsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListActionsModule = /** @class */ (function () {
    function DecListActionsModule() {
    }
    DecListActionsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [DecListActionsComponent],
                    exports: [DecListActionsComponent]
                },] },
    ];
    return DecListActionsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecListModule = /** @class */ (function () {
    function DecListModule() {
    }
    DecListModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DecLabelModule,
                        FlexLayoutModule,
                        MatExpansionModule,
                        MatButtonModule,
                        MatIconModule,
                        MatSnackBarModule,
                        NgxDatatableModule,
                        RouterModule,
                        TranslateModule,
                        DecListAdvancedFilterModule,
                        DecListFilterModule,
                        DecListTableModule,
                        DecSpinnerModule,
                    ],
                    declarations: [
                        DecListComponent,
                        DecListGridComponent,
                        DecListFooterComponent,
                    ],
                    exports: [
                        DecListComponent,
                        DecListGridComponent,
                        DecListTableModule,
                        DecListFooterComponent,
                        DecListFilterModule,
                        DecListAdvancedFilterModule,
                        DecListActionsModule,
                    ],
                },] },
    ];
    return DecListModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecPageForbidenComponent = /** @class */ (function () {
    function DecPageForbidenComponent(router) {
        var _this = this;
        this.router = router;
        this.router.events
            .pipe(filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function (e) {
            _this.previousUrl = document.referrer || e.url;
        });
    }
    DecPageForbidenComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-page-forbiden',
                    template: "<div class=\"page-forbiden-wrapper\">\n  <h1>{{'label.page-forbiden' | translate}}</h1>\n  <p>{{'label.page-forbiden-help' | translate}}</p>\n  <p><small>Ref: {{previousUrl}}</small></p>\n  <img src=\"http://s3-sa-east-1.amazonaws.com/static-files-prod/platform/decora3.png\">\n</div>\n",
                    styles: [".page-forbiden-wrapper{padding-top:100px;text-align:center}img{width:100px}"]
                },] },
    ];
    /** @nocollapse */
    DecPageForbidenComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    return DecPageForbidenComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecPageForbidenModule = /** @class */ (function () {
    function DecPageForbidenModule() {
    }
    DecPageForbidenModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TranslateModule,
                    ],
                    declarations: [
                        DecPageForbidenComponent
                    ],
                    exports: [
                        DecPageForbidenComponent
                    ]
                },] },
    ];
    return DecPageForbidenModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecPageNotFoundComponent = /** @class */ (function () {
    function DecPageNotFoundComponent(router) {
        var _this = this;
        this.router = router;
        router.events
            .pipe(filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function (e) {
            _this.previousUrl = e.url;
        });
    }
    DecPageNotFoundComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-page-not-found',
                    template: "<div class=\"page-not-found-wrapper\">\n  <h1>{{'label.page-not-found' | translate}}</h1>\n  <p>{{'label.page-not-found-help' | translate}}</p>\n  <p>{{previousUrl}}</p>\n  <img src=\"http://s3-sa-east-1.amazonaws.com/static-files-prod/platform/decora3.png\">\n</div>\n",
                    styles: [".page-not-found-wrapper{padding-top:100px;text-align:center}img{width:100px}"]
                },] },
    ];
    /** @nocollapse */
    DecPageNotFoundComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    return DecPageNotFoundComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecPageNotFoundModule = /** @class */ (function () {
    function DecPageNotFoundModule() {
    }
    DecPageNotFoundModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TranslateModule,
                    ],
                    declarations: [
                        DecPageNotFoundComponent
                    ],
                    exports: [
                        DecPageNotFoundComponent
                    ]
                },] },
    ];
    return DecPageNotFoundModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ FALLBACK_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAALSURBVAjXY2BgAAAAAwABINWUxwAAAABJRU5' +
    'ErkJggg==';
var /** @type {?} */ LOADING_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIg' +
    'Y2xhc3M9InVpbC1yaW5nIj48cGF0aCBmaWxsPSJub25lIiBjbGFzcz0iYmsiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9IjQ1IiBzdHJva2UtZGFzaGFycmF5PSIyMjYuMTk1IDU2LjU0OSI' +
    'gc3Ryb2tlPSIjMjMyZTM4IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEwIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDc1IDc1OzE4MCA3NSA3NT' +
    'szNjAgNzUgNzU7IiBrZXlUaW1lcz0iMDswLjU7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwcyIvPjwvY2lyY2xlPjwvc3ZnPg==';
var DecProductSpinComponent = /** @class */ (function () {
    function DecProductSpinComponent(renderer) {
        var _this = this;
        this.renderer = renderer;
        this.loadingImage = LOADING_IMAGE;
        this.looping = false;
        this.onlyModal = false;
        this.FALLBACK_IMAGE = FALLBACK_IMAGE;
        this.startInCenter = false;
        this.showOpenDialogButton = true;
        this.open = new EventEmitter();
        this.scenesLen = 0;
        this.mouseDown = false;
        this.markAsLoaded = function (event) {
            _this.totalImagesLoaded++;
            if (_this.totalImagesLoaded === _this.scenesLen) {
                _this.placeholderScene = _this.scenes[0];
                _this.loadingImages = false;
            }
        };
        this.goLeft = function () {
            if (_this.scenes[_this.frameShown - 1]) {
                _this.frameShown--;
            }
            else if (_this.looping) {
                _this.frameShown = _this.scenesLen - 1;
            }
        };
        this.goRight = function () {
            if (_this.scenes[_this.frameShown + 1]) {
                _this.frameShown++;
            }
            else if (_this.looping) {
                _this.frameShown = 0;
            }
        };
        this.start = function ($event) {
            _this.placeholderScene = LOADING_IMAGE;
            _this.totalImagesLoaded = 0;
            _this.loadingImages = true;
            _this.started = true;
        };
        this.loaderPercentage = function () {
            return (_this.scenesLen - _this.totalImagesLoaded) > 0 ? ((100 / _this.scenesLen) * _this.totalImagesLoaded).toFixed(1) : 0;
        };
    }
    Object.defineProperty(DecProductSpinComponent.prototype, "spin", {
        get: /**
         * @return {?}
         */
        function () {
            return this._spin;
        },
        set: /**
         * @param {?} spin
         * @return {?}
         */
        function (spin) {
            if (spin) {
                var /** @type {?} */ scenes = this.loadScenes(spin);
                var /** @type {?} */ scenesChanged = !this.scenes || (scenes && this.scenes.join() !== scenes.join());
                if (scenesChanged) {
                    this.resetScenesData(scenes);
                    // this.resetStartPositionBasedOnCompany(spin, scenes);
                }
                this._spin = spin;
            }
        },
        enumerable: true,
        configurable: true
    });
    /*
    * Listening for mouse events
    * mouseup in ngOnInit because it used doccument as reference
    */
    // avoid drag
    /**
     * @param {?} event
     * @return {?}
     */
    DecProductSpinComponent.prototype.onDragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    };
    // mousedown
    /**
     * @param {?} event
     * @return {?}
     */
    DecProductSpinComponent.prototype.onMousedown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.mouseDown = true;
        this.lastMouseEvent = event;
    };
    // mousemove
    /**
     * @param {?} event
     * @return {?}
     */
    DecProductSpinComponent.prototype.onMousemove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.mouseDown && this.started) {
            this.calculatePosition(event);
            // The width is divided by the amount of images. Moving from 0 to 100 will turn 360°
            if (Math.abs(this.positionDiff) >= this.interval) {
                if (this.positionDiff < 0) {
                    this.goRight();
                }
                else {
                    this.goLeft();
                }
                this.lastMouseEvent = event;
            }
        }
    };
    /**
     * @return {?}
     */
    DecProductSpinComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.frameShown = 0;
        this.renderer.listenGlobal('document', 'mouseup', function (event) {
            if (_this.mouseDown) {
                _this.mouseDown = false;
            }
        });
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecProductSpinComponent.prototype.onOpen = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.open.emit($event);
    };
    /**
     * @param {?} spin
     * @param {?} scenes
     * @return {?}
     */
    DecProductSpinComponent.prototype.resetStartPositionBasedOnCompany = /**
     * @param {?} spin
     * @param {?} scenes
     * @return {?}
     */
    function (spin, scenes) {
        this.startInCenter = spin.company.id === 100 ? true : false;
        this.startInCenter = this.startInCenter && scenes.length <= 16;
    };
    /**
     * @param {?} scenes
     * @return {?}
     */
    DecProductSpinComponent.prototype.resetScenesData = /**
     * @param {?} scenes
     * @return {?}
     */
    function (scenes) {
        this.placeholderScene = scenes[0];
        this.scenesLen = scenes.length;
        this.scenes = scenes;
    };
    /**
     * @param {?} spin
     * @return {?}
     */
    DecProductSpinComponent.prototype.loadScenes = /**
     * @param {?} spin
     * @return {?}
     */
    function (spin) {
        try {
            var /** @type {?} */ scenes = this.getUrlsFromSysFiles(spin.data.shots);
            return scenes && scenes.length > 0 ? scenes : [FALLBACK_IMAGE];
        }
        catch (/** @type {?} */ error) {
            return [FALLBACK_IMAGE];
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecProductSpinComponent.prototype.calculatePosition = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ target = event['target'];
        if (this.containerWidth !== target.clientWidth) {
            this.containerWidth = target.clientWidth;
            this.interval = (this.containerWidth / this.scenesLen) / 1.6;
        }
        this.positionDiff = event.clientX - this.lastMouseEvent.clientX;
    };
    /**
     * @param {?} sysFiles
     * @return {?}
     */
    DecProductSpinComponent.prototype.getUrlsFromSysFiles = /**
     * @param {?} sysFiles
     * @return {?}
     */
    function (sysFiles) {
        if (!sysFiles) {
            return;
        }
        else {
            return sysFiles.map(function (file) {
                return file.renderFile.fileUrl;
            });
        }
    };
    DecProductSpinComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-product-spin',
                    template: "<div class=\"product-spinner-wrapper\" *ngIf=\"scenes\">\n  <div [ngSwitch]=\"loadingImages ? true : false\">\n\n    <div *ngSwitchCase=\"true\" class=\"overlay\">\n      <!-- Loading spinner -->\n      <div [ngStyle]=\"{'background-image':'url(' + loadingImage + ')'}\">{{loaderPercentage()}}%</div>\n    </div>\n\n    <div *ngSwitchCase=\"false\" class=\"overlay\">\n\n      <!-- Overlay over the image (hand icon) -->\n      <img class=\"frame\" *ngIf=\"!onlyModal\" src=\"//s3-sa-east-1.amazonaws.com/static-files-prod/platform/drag-horizontally.png\" alt=\"\" (click)=\"onlyModal ? '' : start($event)\">\n\n    </div>\n\n  </div>\n\n  <div [ngSwitch]=\"started ? true : false\">\n\n    <div *ngSwitchCase=\"true\" class=\"frame\">\n      <!-- Images -->\n      <img *ngFor=\"let scene of scenes; let i = index;\"\n        [src]=\"scene\"\n        draggable=\"false\"\n        class=\"no-drag image-only\"\n        (load)=\"markAsLoaded($event)\"\n        [ngClass]=\"frameShown === i && !loadingImages ? 'current-scene' : 'next-scene'\">\n\n    </div>\n\n    <div *ngSwitchCase=\"false\" class=\"frame\">\n\n      <!-- Placeholder image -->\n      <img\n        [src]=\"scenes[frameShown]\"\n        draggable=\"false\"\n        class=\"no-drag\"\n        (click)=\"onlyModal ? onOpen($event) : start($event)\"\n        [ngClass]=\"{'image-only': onlyModal}\">\n\n      <!-- Loading spinner -->\n      <button\n      *ngIf=\"showOpenDialogButton && !onlyModal\"\n      mat-icon-button\n      (click)=\"onOpen($event)\"\n      [matTooltip]=\"'label.open' | translate\"\n      class=\"dialog-button\"\n      type=\"button\"\n      color=\"default\">\n        <mat-icon aria-label=\"Swap between Reference and Render images\" color=\"primary\" contrastFontWithBg >fullscreen</mat-icon>\n      </button>\n\n    </div>\n\n  </div>\n</div>\n",
                    styles: [".product-spinner-wrapper{display:block;position:relative}.product-spinner-wrapper:hover .frame{opacity:1}.product-spinner-wrapper:hover .overlay{display:none}.product-spinner-wrapper .frame{display:block;width:100%;background-size:contain;background-repeat:no-repeat;background-position:center center;opacity:.5;transition:opacity .3s ease;cursor:move}.product-spinner-wrapper .frame.image-only{opacity:1;cursor:pointer}.product-spinner-wrapper .frame .current-scene{display:block}.product-spinner-wrapper .frame .next-scene{display:none}.product-spinner-wrapper .frame img{width:100%}.product-spinner-wrapper .overlay{position:absolute;padding:10px;width:20%;margin-left:40%;margin-top:40%;z-index:1;opacity:.4;transition:opacity .2s ease}.product-spinner-wrapper .frame.loader{width:50%;margin:auto}.product-spinner-wrapper .dialog-button{position:absolute;top:0;right:0}.product-spinner-wrapper .loader-percentage{position:relative;top:47%;width:100%;text-align:center;opacity:.5}"]
                },] },
    ];
    /** @nocollapse */
    DecProductSpinComponent.ctorParameters = function () { return [
        { type: Renderer }
    ]; };
    DecProductSpinComponent.propDecorators = {
        looping: [{ type: Input }],
        onlyModal: [{ type: Input }],
        FALLBACK_IMAGE: [{ type: Input }],
        startInCenter: [{ type: Input }],
        showOpenDialogButton: [{ type: Input }],
        spin: [{ type: Input }],
        open: [{ type: Output }],
        onDragStart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
        onMousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
        onMousemove: [{ type: HostListener, args: ['mousemove', ['$event'],] }]
    };
    return DecProductSpinComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecProductSpinModule = /** @class */ (function () {
    function DecProductSpinModule() {
    }
    DecProductSpinModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatButtonModule,
                        MatIconModule,
                        MatTooltipModule,
                        TranslateModule,
                    ],
                    declarations: [
                        DecProductSpinComponent
                    ],
                    exports: [
                        DecProductSpinComponent
                    ],
                },] },
    ];
    return DecProductSpinModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSidenavToolbarTitleComponent = /** @class */ (function () {
    function DecSidenavToolbarTitleComponent() {
    }
    /**
     * @return {?}
     */
    DecSidenavToolbarTitleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    DecSidenavToolbarTitleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-toolbar-title',
                    template: "<div [routerLink]=\"routerLink\" class=\"dec-sidenav-toolbar-title\">\n  <ng-content></ng-content>\n</div>\n",
                    styles: [".dec-sidenav-toolbar-title{outline:0}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavToolbarTitleComponent.ctorParameters = function () { return []; };
    DecSidenavToolbarTitleComponent.propDecorators = {
        routerLink: [{ type: Input }]
    };
    return DecSidenavToolbarTitleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSidenavToolbarComponent = /** @class */ (function () {
    function DecSidenavToolbarComponent() {
        this.notProduction = true;
        this.ribbon = '';
        this.label = '';
        this.leftMenuTriggerVisible = true;
        this.rightMenuTriggerVisible = true;
        this.toggleLeftMenu = new EventEmitter();
        this.toggleRightMenu = new EventEmitter();
    }
    /**
     * @return {?}
     */
    DecSidenavToolbarComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.initialized = true;
        }, 1);
    };
    /**
     * @return {?}
     */
    DecSidenavToolbarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.environment === 'local') {
            this.ribbon = 'ribbon-green';
            this.label = 'label.local';
        }
        else if (this.environment === 'development') {
            this.ribbon = 'ribbon-blue';
            this.label = 'label.development';
        }
        else if (this.environment === 'qa') {
            this.ribbon = 'ribbon-red';
            this.label = 'label.qa';
        }
        else if (this.environment === 'active') {
            this.ribbon = 'ribbon-green';
            this.label = 'label.active';
        }
        else {
            this.notProduction = false;
            this.ribbon = 'ribbon-hidden';
        }
    };
    DecSidenavToolbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-toolbar',
                    template: "<mat-toolbar [color]=\"color\" *ngIf=\"initialized\" class=\"dec-sidenav-toolbar\">\n\n  <span class=\"items-icon item-left\" *ngIf=\"leftMenuTriggerVisible\" (click)=\"toggleLeftMenu.emit()\">\n    &#9776;\n  </span>\n\n  <span *ngIf=\"customTitle\">\n    <ng-content select=\"dec-sidenav-toolbar-title\"></ng-content>\n  </span>\n\n  <div class=\"ribbon {{ribbon}}\" *ngIf=\"notProduction\">\n    <span>{{label | translate}}</span>\n  </div>\n\n  <span class=\"dec-sidenav-toolbar-custom-content\">\n    <ng-content></ng-content>\n  </span>\n\n  <span class=\"items-spacer\"></span>\n\n  <span class=\"items-icon item-right\" *ngIf=\"rightMenuTriggerVisible\" (click)=\"toggleRightMenu.emit()\">\n    &#9776;\n  </span>\n\n</mat-toolbar>\n",
                    styles: [".items-spacer{flex:1 1 auto}.items-icon{cursor:pointer;-webkit-transform:scale(1.2,.8);transform:scale(1.2,.8)}.items-icon.item-right{padding-left:14px}.items-icon.item-left{padding-right:14px}.dec-sidenav-toolbar-custom-content{padding:0 16px;width:100%}.ribbon{transition:all .3s ease;text-transform:lowercase;text-align:center;position:relative;line-height:64px;margin-left:4px;padding:0 20px;height:64px;width:155px;color:#fff;left:20px;top:0}.ribbon.ribbon-hidden{display:none}.ribbon::before{content:'';position:fixed;width:100vw;height:4px;z-index:2;top:64px;left:0}@media screen and (max-width:599px){.ribbon::before{top:56px}}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavToolbarComponent.ctorParameters = function () { return []; };
    DecSidenavToolbarComponent.propDecorators = {
        color: [{ type: Input }],
        environment: [{ type: Input }],
        leftMenuTriggerVisible: [{ type: Input }],
        rightMenuTriggerVisible: [{ type: Input }],
        toggleLeftMenu: [{ type: Output }],
        toggleRightMenu: [{ type: Output }],
        customTitle: [{ type: ContentChild, args: [DecSidenavToolbarTitleComponent,] }]
    };
    return DecSidenavToolbarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSidenavMenuItemComponent = /** @class */ (function () {
    function DecSidenavMenuItemComponent(router) {
        this.router = router;
        this.toggle = new EventEmitter();
        this.showSubmenu = false;
    }
    /**
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.started = true;
        }, 1);
    };
    Object.defineProperty(DecSidenavMenuItemComponent.prototype, "subitems", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ subitems = this._subitems.toArray();
            subitems.splice(0, 1); // removes itself
            return subitems;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.toggleSubmenu = /**
     * @return {?}
     */
    function () {
        this.showSubmenu = !this.showSubmenu;
        this.toggle.emit(this.showSubmenu);
    };
    /**
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.closeSubmenu = /**
     * @return {?}
     */
    function () {
        this.showSubmenu = false;
    };
    /**
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.openLink = /**
     * @return {?}
     */
    function () {
        if (this.routerLink) {
            if (typeof this.routerLink === 'string') {
                var /** @type {?} */ isNaked = this.routerLink.startsWith('//');
                var /** @type {?} */ isHttp = this.routerLink.startsWith('http://');
                var /** @type {?} */ isHttps = this.routerLink.startsWith('https://');
                if (isNaked || isHttp || isHttps) {
                    window.location.href = this.routerLink;
                }
                else {
                    this.router.navigate([this.routerLink]);
                }
            }
            else if (Array.isArray(this.routerLink)) {
                this.router.navigate(this.routerLink);
            }
        }
    };
    /**
     * @param {?} treeLevel
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.getBackground = /**
     * @param {?} treeLevel
     * @return {?}
     */
    function (treeLevel) {
        return this.checkIfActive() ? 'mat-list-item-active' : 'mat-list-item-' + treeLevel;
    };
    /**
     * @return {?}
     */
    DecSidenavMenuItemComponent.prototype.checkIfActive = /**
     * @return {?}
     */
    function () {
        if (this.isActive) {
            return true;
        }
        else if (this.showSubmenu) {
            return false;
        }
        else {
            var /** @type {?} */ hasActiveChild = this.hasActiveChild;
            return hasActiveChild;
        }
    };
    Object.defineProperty(DecSidenavMenuItemComponent.prototype, "hasActiveChild", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.subitems) {
                return false;
            }
            else {
                return this.subitems.reduce(function (lastValue, item) {
                    return lastValue || item.isActive || item.hasActiveChild;
                }, false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSidenavMenuItemComponent.prototype, "isActive", {
        get: /**
         * @return {?}
         */
        function () {
            return this.routerLink === window.location.pathname;
        },
        enumerable: true,
        configurable: true
    });
    DecSidenavMenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-menu-item',
                    template: "<ng-template let-treeLevel=\"treeLevel\" #template>\n\n  <mat-list-item class=\"click dec-sidenav-menu-item\"\n  (click)=\"subitems.length ? toggleSubmenu() : openLink()\"\n  [ngClass]=\"getBackground(treeLevel)\">\n\n    <div class=\"item-wrapper\">\n\n      <div [ngStyle]=\"{paddingLeft: treeLevel * 16 + 'px'}\" class=\"item-content\">\n        <ng-content></ng-content>\n      </div>\n\n      <div *ngIf=\"subitems.length\" class=\"text-right\">\n        <ng-container [ngSwitch]=\"showSubmenu\">\n          <span *ngSwitchCase=\"true\"><i class=\"arrow down\"></i></span>\n          <span *ngSwitchCase=\"false\"><i class=\"arrow right\"></i></span>\n        </ng-container>\n      </div>\n    </div>\n\n  </mat-list-item>\n\n  <div class=\"subitem-menu\" *ngIf=\"showSubmenu\">\n\n    <dec-sidenav-menu [items]=\"subitems\" [treeLevel]=\"treeLevel\"></dec-sidenav-menu>\n\n  </div>\n\n</ng-template>\n",
                    styles: [".dec-sidenav-menu-item{height:56px!important;outline:0}.dec-sidenav-menu-item .item-wrapper{width:100%;display:flex;flex-flow:row no-wrap;justify-content:space-between}.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep .mat-icon,.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep i{vertical-align:middle;margin-bottom:5px;margin-right:8px}.dec-sidenav-menu-item .item-wrapper .arrow{margin-bottom:-4px}.dec-sidenav-menu-item .item-wrapper .arrow.right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.dec-sidenav-menu-item .item-wrapper .arrow.left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.dec-sidenav-menu-item .item-wrapper .arrow.up{transform:rotate(-135deg);-webkit-transform:rotate(-135deg)}.dec-sidenav-menu-item .item-wrapper .arrow.down{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.dec-sidenav-menu-item .text-right{text-align:right}.dec-sidenav-menu-item .click{cursor:pointer}.dec-sidenav-menu-item i{border:solid #000;border-width:0 2px 2px 0;display:inline-block;padding:4px}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavMenuItemComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    DecSidenavMenuItemComponent.propDecorators = {
        routerLink: [{ type: Input }],
        template: [{ type: ViewChild, args: [TemplateRef,] }],
        _subitems: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
        toggle: [{ type: Output }]
    };
    return DecSidenavMenuItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSidenavMenuTitleComponent = /** @class */ (function () {
    function DecSidenavMenuTitleComponent() {
    }
    /**
     * @return {?}
     */
    DecSidenavMenuTitleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    DecSidenavMenuTitleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-menu-title',
                    template: "<ng-content></ng-content>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecSidenavMenuTitleComponent.ctorParameters = function () { return []; };
    return DecSidenavMenuTitleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ STORAGE_DOMAIN = 'decSidenavConfig';
var DecSidenavService = /** @class */ (function () {
    function DecSidenavService() {
    }
    /**
     * @param {?} name
     * @param {?} visibility
     * @return {?}
     */
    DecSidenavService.prototype.setSidenavVisibility = /**
     * @param {?} name
     * @param {?} visibility
     * @return {?}
     */
    function (name, visibility) {
        var /** @type {?} */ config = this.getSidenavConfig();
        config[name] = visibility;
        this.setSidenavConfig(config);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DecSidenavService.prototype.getSidenavVisibility = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var /** @type {?} */ config = this.getSidenavConfig();
        return config[name];
    };
    /**
     * @param {?} conf
     * @return {?}
     */
    DecSidenavService.prototype.setSidenavConfig = /**
     * @param {?} conf
     * @return {?}
     */
    function (conf) {
        var /** @type {?} */ confString = JSON.stringify(conf);
        localStorage.setItem(STORAGE_DOMAIN, confString);
    };
    /**
     * @return {?}
     */
    DecSidenavService.prototype.getSidenavConfig = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ data = localStorage.getItem(STORAGE_DOMAIN);
        if (data) {
            return JSON.parse(data);
        }
        else {
            var /** @type {?} */ newConfig = {};
            this.setSidenavConfig(newConfig);
            return newConfig;
        }
    };
    DecSidenavService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecSidenavService.ctorParameters = function () { return []; };
    return DecSidenavService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSidenavMenuLeftComponent = /** @class */ (function () {
    function DecSidenavMenuLeftComponent(decSidenavService) {
        this.decSidenavService = decSidenavService;
        this.leftMenuVisible = new BehaviorSubject(true);
        this.leftMenuMode = new BehaviorSubject('side');
        this.openedChange = new EventEmitter();
        this.modeChange = new EventEmitter();
        this.itemSubscriptions = [];
        this.subscribeAndExposeSidenavEvents();
    }
    Object.defineProperty(DecSidenavMenuLeftComponent.prototype, "open", {
        get: /**
         * @return {?}
         */
        function () {
            return this.leftMenuVisible.value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ currentValue = this.leftMenuVisible.value;
            if (v !== currentValue) {
                this.leftMenuVisible.next(v);
                this.decSidenavService.setSidenavVisibility('leftMenuHidden', !v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSidenavMenuLeftComponent.prototype, "mode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.leftMenuMode.value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ currentValue = this.leftMenuMode.value;
            if (v !== currentValue) {
                this.leftMenuMode.next(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecSidenavMenuLeftComponent.prototype.subscribeAndExposeSidenavEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.leftMenuVisible.subscribe(function (value) {
            _this.openedChange.emit(value);
        });
        this.leftMenuMode.subscribe(function (value) {
            _this.modeChange.emit(value);
        });
    };
    /**
     * @return {?}
     */
    DecSidenavMenuLeftComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ items = this.items.toArray();
        items.forEach(function (item) {
            item.toggle.subscribe(function (state) {
                if (state) {
                    _this.closeBrothers(item);
                }
            });
        });
    };
    /**
     * @return {?}
     */
    DecSidenavMenuLeftComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.itemSubscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    /**
     * @param {?} itemSelected
     * @return {?}
     */
    DecSidenavMenuLeftComponent.prototype.closeBrothers = /**
     * @param {?} itemSelected
     * @return {?}
     */
    function (itemSelected) {
        var /** @type {?} */ items = this.items.toArray();
        items.forEach(function (item) {
            if (itemSelected !== item) {
                item.closeSubmenu();
            }
        });
    };
    DecSidenavMenuLeftComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-menu-left',
                    template: "<ng-container *ngIf=\"customTitle\">\n  <div class=\"menu-title\">\n    <ng-content select=\"dec-dec-sidenav-menu-title\"></ng-content>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"items\">\n  <dec-sidenav-menu [items]=\"items.toArray()\"></dec-sidenav-menu>\n</ng-container>",
                    styles: [".menu-title{padding:16px;font-size:24px;font-weight:700}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavMenuLeftComponent.ctorParameters = function () { return [
        { type: DecSidenavService }
    ]; };
    DecSidenavMenuLeftComponent.propDecorators = {
        open: [{ type: Input }],
        mode: [{ type: Input }],
        persistVisibilityMode: [{ type: Input }],
        items: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
        customTitle: [{ type: ContentChild, args: [DecSidenavMenuTitleComponent,] }],
        openedChange: [{ type: Output }],
        modeChange: [{ type: Output }]
    };
    return DecSidenavMenuLeftComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSidenavMenuRightComponent = /** @class */ (function () {
    function DecSidenavMenuRightComponent(decSidenavService) {
        this.decSidenavService = decSidenavService;
        this.rightMenuVisible = new BehaviorSubject(true);
        this.rightMenuMode = new BehaviorSubject('side');
        this.openedChange = new EventEmitter();
        this.modeChange = new EventEmitter();
        this.itemSubscriptions = [];
        this.subscribeAndExposeSidenavEvents();
    }
    Object.defineProperty(DecSidenavMenuRightComponent.prototype, "open", {
        get: /**
         * @return {?}
         */
        function () {
            return this.rightMenuVisible.value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ currentValue = this.rightMenuVisible.value;
            if (v !== currentValue) {
                this.rightMenuVisible.next(v);
                this.decSidenavService.setSidenavVisibility('rightMenuHidden', !v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSidenavMenuRightComponent.prototype, "mode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.rightMenuMode.value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ currentValue = this.rightMenuMode.value;
            if (v !== currentValue) {
                this.rightMenuMode.next(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecSidenavMenuRightComponent.prototype.subscribeAndExposeSidenavEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.rightMenuVisible.subscribe(function (value) {
            _this.openedChange.emit(value);
        });
        this.rightMenuMode.subscribe(function (value) {
            _this.modeChange.emit(value);
        });
    };
    /**
     * @return {?}
     */
    DecSidenavMenuRightComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ items = this.items.toArray();
        items.forEach(function (item) {
            item.toggle.subscribe(function (state) {
                if (state) {
                    _this.closeBrothers(item);
                }
            });
        });
    };
    /**
     * @return {?}
     */
    DecSidenavMenuRightComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.itemSubscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    /**
     * @param {?} itemSelected
     * @return {?}
     */
    DecSidenavMenuRightComponent.prototype.closeBrothers = /**
     * @param {?} itemSelected
     * @return {?}
     */
    function (itemSelected) {
        var /** @type {?} */ items = this.items.toArray();
        items.forEach(function (item) {
            if (itemSelected !== item) {
                item.closeSubmenu();
            }
        });
    };
    DecSidenavMenuRightComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-menu-right',
                    template: "<ng-container *ngIf=\"customTitle\">\n  <div class=\"menu-title\">\n    <ng-content select=\"dec-dec-sidenav-menu-title\"></ng-content>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"items\">\n  <dec-sidenav-menu [items]=\"items.toArray()\"></dec-sidenav-menu>\n</ng-container>",
                    styles: [".menu-title{padding:16px;font-size:24px;font-weight:700}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavMenuRightComponent.ctorParameters = function () { return [
        { type: DecSidenavService }
    ]; };
    DecSidenavMenuRightComponent.propDecorators = {
        open: [{ type: Input }],
        mode: [{ type: Input }],
        persistVisibilityMode: [{ type: Input }],
        items: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
        customTitle: [{ type: ContentChild, args: [DecSidenavMenuTitleComponent,] }],
        openedChange: [{ type: Output }],
        modeChange: [{ type: Output }]
    };
    return DecSidenavMenuRightComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSidenavComponent = /** @class */ (function () {
    function DecSidenavComponent(decSidenavService) {
        this.decSidenavService = decSidenavService;
        this.progressBarVisible = new BehaviorSubject(false);
    }
    Object.defineProperty(DecSidenavComponent.prototype, "leftMenu", {
        get: /**
         * @return {?}
         */
        function () {
            return this._leftMenu;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._leftMenu = v;
            if (v) {
                this.setInitialLeftMenuVisibilityModes();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSidenavComponent.prototype, "rightMenu", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rightMenu;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._rightMenu = v;
            if (v) {
                this.setInitialRightMenuVisibilityModes();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSidenavComponent.prototype, "loading", {
        get: /**
         * @return {?}
         */
        function () {
            return this.progressBarVisible.value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ currentValue = this.progressBarVisible.value;
            if (v !== currentValue) {
                this.progressBarVisible.next(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.detectAndShowChildComponents();
        this.subscribeToToolbarEvents();
    };
    // API //
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.openBothMenus = /**
     * @return {?}
     */
    function () {
        this.openLeftMenu();
        this.openRightMenu();
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.openLeftMenu = /**
     * @return {?}
     */
    function () {
        this.leftMenu.leftMenuVisible.next(true);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.openRightMenu = /**
     * @return {?}
     */
    function () {
        this.rightMenu.rightMenuVisible.next(true);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.closeBothMenus = /**
     * @return {?}
     */
    function () {
        this.closeLeftMenu();
        this.closeRightMenu();
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.closeLeftMenu = /**
     * @return {?}
     */
    function () {
        this.leftMenu.leftMenuVisible.next(false);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.closeRightMenu = /**
     * @return {?}
     */
    function () {
        this.rightMenu.rightMenuVisible.next(false);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.toggleBothMenus = /**
     * @return {?}
     */
    function () {
        this.toggleLeftMenu();
        this.toggleRightMenu();
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.toggleLeftMenu = /**
     * @return {?}
     */
    function () {
        this.leftMenu.open = !this.leftMenu.leftMenuVisible.value;
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.toggleRightMenu = /**
     * @return {?}
     */
    function () {
        this.rightMenu.open = !this.rightMenu.rightMenuVisible.value;
    };
    /**
     * @param {?=} mode
     * @return {?}
     */
    DecSidenavComponent.prototype.setBothMenusMode = /**
     * @param {?=} mode
     * @return {?}
     */
    function (mode) {
        if (mode === void 0) { mode = 'side'; }
        this.setLeftMenuMode(mode);
        this.setRightMenuMode(mode);
    };
    /**
     * @param {?=} mode
     * @return {?}
     */
    DecSidenavComponent.prototype.setLeftMenuMode = /**
     * @param {?=} mode
     * @return {?}
     */
    function (mode) {
        if (mode === void 0) { mode = 'side'; }
        this.leftMenu.leftMenuMode.next(mode);
    };
    /**
     * @param {?=} mode
     * @return {?}
     */
    DecSidenavComponent.prototype.setRightMenuMode = /**
     * @param {?=} mode
     * @return {?}
     */
    function (mode) {
        if (mode === void 0) { mode = 'side'; }
        this.rightMenu.rightMenuMode.next(mode);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.toggleProgressBar = /**
     * @return {?}
     */
    function () {
        this.loading = !this.progressBarVisible.value;
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.showProgressBar = /**
     * @return {?}
     */
    function () {
        this.progressBarVisible.next(true);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.hideProgressBar = /**
     * @return {?}
     */
    function () {
        this.progressBarVisible.next(false);
    };
    /**
     * @param {?} openedStatus
     * @return {?}
     */
    DecSidenavComponent.prototype.leftSidenavOpenedChange = /**
     * @param {?} openedStatus
     * @return {?}
     */
    function (openedStatus) {
        this.leftMenu.open = openedStatus;
        this.leftMenu.leftMenuVisible.next(openedStatus);
    };
    /**
     * @param {?} openedStatus
     * @return {?}
     */
    DecSidenavComponent.prototype.rightSidenavOpenedChange = /**
     * @param {?} openedStatus
     * @return {?}
     */
    function (openedStatus) {
        this.rightMenu.open = openedStatus;
        this.rightMenu.rightMenuVisible.next(openedStatus);
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.detectAndShowChildComponents = /**
     * @return {?}
     */
    function () {
        this.toolbar.leftMenuTriggerVisible = this.leftMenu ? true : false;
        this.toolbar.rightMenuTriggerVisible = this.rightMenu ? true : false;
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.subscribeToToolbarEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.toolbar) {
            this.toolbar.toggleLeftMenu.subscribe(function () {
                _this.leftSidenav.toggle();
            });
            this.toolbar.toggleRightMenu.subscribe(function () {
                _this.rightSidenav.toggle();
            });
        }
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.setInitialRightMenuVisibilityModes = /**
     * @return {?}
     */
    function () {
        this.rightMenu.rightMenuVisible.next(!this.decSidenavService.getSidenavVisibility('rightMenuHidden'));
    };
    /**
     * @return {?}
     */
    DecSidenavComponent.prototype.setInitialLeftMenuVisibilityModes = /**
     * @return {?}
     */
    function () {
        this.leftMenu.leftMenuVisible.next(!this.decSidenavService.getSidenavVisibility('leftMenuHidden'));
    };
    DecSidenavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav',
                    template: "<div class=\"dec-sidenav-wraper\">\n  <!-- TOOLBAR -->\n  <div *ngIf=\"toolbar\" class=\"dec-sidenav-toolbar-wrapper\" [ngClass]=\"{'full-screen': !(leftMenu.leftMenuVisible | async)}\">\n    <ng-content select=\"dec-sidenav-toolbar\"></ng-content>\n  </div>\n  <!-- / TOOLBAR -->\n\n  <!-- PROGRESS BAR -->\n  <div class=\"progress-bar-wrapper\" *ngIf=\"progressBarVisible | async\">\n    <mat-progress-bar mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n  </div>\n  <!-- / PROGRESS BAR -->\n\n  <mat-sidenav-container [ngClass]=\"{'with-toolbar': toolbar, 'full-screen': !(leftMenu.leftMenuVisible | async)}\">\n\n    <!-- LEFT MENU -->\n    <mat-sidenav *ngIf=\"leftMenu\"\n    [mode]=\"leftMenu.leftMenuMode | async\"\n    [opened]=\"leftMenu.leftMenuVisible | async\"\n    position=\"start\"\n    (openedChange)=\"leftSidenavOpenedChange($event)\"\n    #leftSidenav>\n      <ng-content select=\"dec-sidenav-menu-left\"></ng-content>\n    </mat-sidenav>\n    <!-- / LEFT MENU -->\n\n    <!-- CONTENT -->\n    <ng-content select=\"dec-sidenav-content\"></ng-content>\n    <!-- / CONTENT -->\n\n    <!-- RIGHT MENU -->\n    <mat-sidenav *ngIf=\"rightMenu\"\n    [mode]=\"rightMenu.rightMenuMode | async\"\n    [opened]=\"rightMenu.rightMenuVisible | async\"\n    position=\"end\"\n    (openedChange)=\"rightSidenavOpenedChange($event)\"\n    #rightSidenav>\n      <ng-content select=\"dec-sidenav-menu-right\"></ng-content>\n    </mat-sidenav>\n    <!-- / RIGHT MENU -->\n\n  </mat-sidenav-container>\n\n</div>\n",
                    styles: [".dec-sidenav-wraper .dec-sidenav-toolbar-wrapper{min-width:1200px}.dec-sidenav-wraper .dec-sidenav-toolbar-wrapper.full-screen{min-width:944px}.dec-sidenav-wraper .mat-sidenav-container{min-width:1200px;height:100vh}.dec-sidenav-wraper .mat-sidenav-container.full-screen{min-width:944px}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 64px)}.dec-sidenav-wraper .mat-sidenav-container .mat-sidenav{width:256px}.dec-sidenav-wraper .progress-bar-wrapper{position:fixed;top:60px;left:0;width:100%}@media screen and (max-width:1199px){.dec-sidenav-wraper .mat-sidenav-container{height:calc(100vh - 16px)}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 80px)}}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavComponent.ctorParameters = function () { return [
        { type: DecSidenavService }
    ]; };
    DecSidenavComponent.propDecorators = {
        toolbar: [{ type: ContentChild, args: [DecSidenavToolbarComponent,] }],
        leftMenu: [{ type: ContentChild, args: [DecSidenavMenuLeftComponent,] }],
        rightMenu: [{ type: ContentChild, args: [DecSidenavMenuRightComponent,] }],
        leftSidenav: [{ type: ViewChild, args: ['leftSidenav',] }],
        rightSidenav: [{ type: ViewChild, args: ['rightSidenav',] }],
        loading: [{ type: Input }]
    };
    return DecSidenavComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSidenavContentComponent = /** @class */ (function () {
    function DecSidenavContentComponent() {
    }
    /**
     * @return {?}
     */
    DecSidenavContentComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    DecSidenavContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-content',
                    template: "<div class=\"dec-sidenav-content-wrapper\">\n  <ng-content></ng-content>\n</div>\n",
                    styles: [".dec-sidenav-content-wrapper{padding:32px}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavContentComponent.ctorParameters = function () { return []; };
    return DecSidenavContentComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSidenavMenuComponent = /** @class */ (function () {
    function DecSidenavMenuComponent() {
        this.items = [];
        this.treeLevel = -1;
    }
    DecSidenavMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-menu',
                    template: "<mat-list>\n  <ng-container *ngFor=\"let item of items\">\n    <ng-container *ngIf=\"item.started && item.template ? true : false\">\n      <ng-template\n      [ngTemplateOutlet]=\"item.template\"\n      [ngTemplateOutletContext]=\"{treeLevel: treeLevel + 1}\"\n      ></ng-template>\n    </ng-container>\n  </ng-container>\n</mat-list>\n",
                    styles: [".mat-list{padding-top:0}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavMenuComponent.ctorParameters = function () { return []; };
    DecSidenavMenuComponent.propDecorators = {
        items: [{ type: Input }],
        treeLevel: [{ type: Input }]
    };
    return DecSidenavMenuComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSidenavModule = /** @class */ (function () {
    function DecSidenavModule() {
    }
    DecSidenavModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatSidenavModule,
                        MatListModule,
                        MatIconModule,
                        MatToolbarModule,
                        MatProgressBarModule,
                        RouterModule,
                        HttpClientModule,
                        TranslateModule,
                    ],
                    declarations: [
                        DecSidenavComponent,
                        DecSidenavContentComponent,
                        DecSidenavMenuItemComponent,
                        DecSidenavMenuLeftComponent,
                        DecSidenavMenuRightComponent,
                        DecSidenavMenuComponent,
                        DecSidenavMenuTitleComponent,
                        DecSidenavToolbarComponent,
                        DecSidenavToolbarTitleComponent,
                    ],
                    exports: [
                        DecSidenavComponent,
                        DecSidenavContentComponent,
                        DecSidenavMenuItemComponent,
                        DecSidenavMenuLeftComponent,
                        DecSidenavMenuRightComponent,
                        DecSidenavMenuTitleComponent,
                        DecSidenavToolbarComponent,
                        DecSidenavToolbarTitleComponent,
                    ],
                    providers: [
                        DecSidenavService,
                    ]
                },] },
    ];
    return DecSidenavModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
window['decoraScriptService'] = window['decoraScriptService'] || {};
var DecScriptLoaderService = /** @class */ (function () {
    function DecScriptLoaderService() {
    }
    /**
     * @param {?} url
     * @param {?} scriptName
     * @return {?}
     */
    DecScriptLoaderService.prototype.load = /**
     * @param {?} url
     * @param {?} scriptName
     * @return {?}
     */
    function (url, scriptName) {
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ scriptLoaded = window['decoraScriptService'][scriptName];
            if (scriptLoaded) {
                var /** @type {?} */ script = window[scriptName];
                resolve(script);
            }
            else {
                var /** @type {?} */ scriptTag = document.createElement('script');
                scriptTag.setAttribute('src', url);
                scriptTag.setAttribute('type', 'text/javascript');
                scriptTag.onload = function () {
                    window['decoraScriptService'][scriptName] = true;
                    var /** @type {?} */ script = window[scriptName];
                    resolve(script);
                };
                scriptTag.onerror = reject;
                document.getElementsByTagName('head')[0].appendChild(scriptTag);
            }
        });
    };
    /**
     * @param {?} url
     * @return {?}
     */
    DecScriptLoaderService.prototype.loadStyle = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return new Promise(function (resolve, reject) {
            window['scriptServiceLoadedStylesArray'] = window['scriptServiceLoadedStylesArray'] || {};
            var /** @type {?} */ styleLoaded = window['scriptServiceLoadedStylesArray'][url];
            if (styleLoaded) {
                resolve();
            }
            else {
                var /** @type {?} */ linkTag = document.createElement('link');
                linkTag.setAttribute('rel', 'stylesheet');
                linkTag.setAttribute('type', 'text/css');
                linkTag.setAttribute('media', 'all');
                linkTag.setAttribute('href', url);
                linkTag.onload = function () {
                    window['scriptServiceLoadedStylesArray'][url] = true;
                    resolve();
                };
                linkTag.onerror = reject;
                document.getElementsByTagName('head')[0].appendChild(linkTag);
            }
        });
    };
    /**
     * @param {?} styleUrl
     * @param {?} scriptUrl
     * @param {?} scriptNamespace
     * @return {?}
     */
    DecScriptLoaderService.prototype.loadStyleAndScript = /**
     * @param {?} styleUrl
     * @param {?} scriptUrl
     * @param {?} scriptNamespace
     * @return {?}
     */
    function (styleUrl, scriptUrl, scriptNamespace) {
        var _this = this;
        return this.loadStyle(styleUrl).then(function () {
            return _this.load(scriptUrl, scriptNamespace);
        });
    };
    /**
     * @return {?}
     */
    DecScriptLoaderService.prototype.loadLeafletScriptsAndStyle = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.loadStyle('https://unpkg.com/leaflet@1.3.3/dist/leaflet.css').then(function () {
            return _this.loadStyle('http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css').then(function () {
                return _this.loadStyle('https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css').then(function () {
                    return _this.load('https://unpkg.com/leaflet@1.3.3/dist/leaflet.js', 'Leaflet').then(function () {
                        return _this.load('https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.js', 'EasyButton').then(function () {
                        });
                    });
                });
            });
        });
    };
    DecScriptLoaderService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    DecScriptLoaderService.ctorParameters = function () { return []; };
    /** @nocollapse */ DecScriptLoaderService.ngInjectableDef = defineInjectable({ factory: function DecScriptLoaderService_Factory() { return new DecScriptLoaderService(); }, token: DecScriptLoaderService, providedIn: "root" });
    return DecScriptLoaderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ SKETCHFAB_SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js';
var DecSketchfabViewComponent = /** @class */ (function () {
    function DecSketchfabViewComponent(decScriptLoaderService) {
        this.decScriptLoaderService = decScriptLoaderService;
    }
    Object.defineProperty(DecSketchfabViewComponent.prototype, "sketchfabId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sketchfabId;
        },
        set: /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            if (id) {
                this._sketchfabId = id;
                this.startSketchfab(id);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DecSketchfabViewComponent.prototype.startSketchfab = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        this.decScriptLoaderService.load(SKETCHFAB_SCRIPT_URL, 'Sketchfab')
            .then(function (Sketchfab) {
            var /** @type {?} */ iframe = _this.apiFrame.nativeElement;
            var /** @type {?} */ client = new Sketchfab('1.0.0', iframe);
            client.init(_this.sketchfabId, {
                success: function onSuccess(api) {
                    api.start();
                    api.addEventListener('viewerready', function () { });
                }
            });
        });
    };
    DecSketchfabViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sketchfab-view',
                    template: "<iframe src=\"\" \n  #apiFrame \n  id=\"api-frame\" \n  height=\"620\"\n  width=\"620\" \n  allowfullscreen \n  mozallowfullscreen=\"true\" \n  webkitallowfullscreen=\"true\"></iframe>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecSketchfabViewComponent.ctorParameters = function () { return [
        { type: DecScriptLoaderService }
    ]; };
    DecSketchfabViewComponent.propDecorators = {
        sketchfabId: [{ type: Input }],
        apiFrame: [{ type: ViewChild, args: ['apiFrame',] }]
    };
    return DecSketchfabViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecScriptLoaderModule = /** @class */ (function () {
    function DecScriptLoaderModule() {
    }
    DecScriptLoaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    providers: [
                        DecScriptLoaderService
                    ]
                },] },
    ];
    return DecScriptLoaderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSketchfabViewModule = /** @class */ (function () {
    function DecSketchfabViewModule() {
    }
    DecSketchfabViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DecScriptLoaderModule
                    ],
                    declarations: [
                        DecSketchfabViewComponent
                    ],
                    exports: [
                        DecSketchfabViewComponent
                    ]
                },] },
    ];
    return DecSketchfabViewModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecStepsListComponent = /** @class */ (function () {
    function DecStepsListComponent() {
        this.icon = 'history';
        this.title = '';
        this.stepsList = [];
    }
    DecStepsListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-steps-list',
                    template: "<div class=\"history-container\" [ngClass]=\"{'limited-height': maxHeight}\" [style.maxHeight]=\"maxHeight || '100%'\">\n\n  <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"8px\" class=\"dec-color-grey-dark\">\n\n    <mat-icon fxFlex=\"24px\">{{icon}}</mat-icon>\n\n    <span class=\"bigger-font\">{{ title }}</span>\n\n  </div>\n\n  <br>\n\n  <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n\n    <div class=\"history-item\" *ngFor=\"let item of stepsList; let i = index\">\n\n      <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"left start\" class=\"dec-color-grey\">\n\n        <mat-icon class=\"smaller-icon dec-color-grey-dark\" fxFlex=\"24px\">{{ i === stepsList.length - 1 ? 'radio_button_unchecked' : 'lens' }}</mat-icon>\n\n        <div fxLayout=\"column\" fxLayoutGap=\"4px\">\n\n          <div>\n\n            <strong *ngIf=\"item.title\">{{ item.title }}</strong>\n\n            <span *ngIf=\"item.date\">\n              {{ item.date | date }}\n              <span *ngIf=\"showTime\"> | {{ item.date | date: 'mediumTime' }}</span>\n            </span>\n\n          </div>\n\n          <div *ngIf=\"item.description\" class=\"dec-color-grey-dark\">\n            <strong class=\"dec-color-black\">{{ item.description }}</strong>\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n</div>\n",
                    styles: [".mat-tab-body-content{padding:16px 0}.mat-form-field-prefix{margin-right:8px!important}.mat-form-field-suffix{margin-left:8px!important}.mat-elevation-z0{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mat-elevation-z1{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.mat-elevation-z2{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.mat-elevation-z3{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.mat-elevation-z4{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mat-elevation-z5{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}.mat-elevation-z6{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.mat-elevation-z7{box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}.mat-elevation-z8{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-elevation-z9{box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}.mat-elevation-z10{box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}.mat-elevation-z11{box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}.mat-elevation-z12{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-elevation-z13{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}.mat-elevation-z14{box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}.mat-elevation-z15{box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}.mat-elevation-z16{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-elevation-z17{box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}.mat-elevation-z18{box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}.mat-elevation-z19{box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}.mat-elevation-z20{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}.mat-elevation-z21{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}.mat-elevation-z22{box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}.mat-elevation-z23{box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}.mat-elevation-z24{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-card-title{font-size:24px;font-weight:400}.mat-card-content,.mat-card-header .mat-card-title,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:13px;line-height:18px}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif}.mat-expansion-panel-header{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field{width:100%;font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-outline{bottom:1.34375em}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:9px;padding-bottom:9px}.mat-list-item,.mat-list-option{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{font-size:16px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line,.mat-selection-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{font-size:16px}.mat-list .mat-list-option .mat-line,.mat-nav-list .mat-list-option .mat-line,.mat-selection-list .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-item{font-size:12px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line,.mat-selection-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option{font-size:12px}.mat-list[dense] .mat-list-option .mat-line,.mat-nav-list[dense] .mat-list-option .mat-line,.mat-selection-list[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-simple-snackbar{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden}@media screen and (-ms-high-contrast:active){.mat-ripple{display:none}}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1),-webkit-transform 0s cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.288)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;box-sizing:content-box!important}.history-container{margin:1.5em 0}.history-container.limited-height{overflow-y:auto}.history-container .history-item:not(:last-child){position:relative}.history-container .history-item:not(:last-child)::before{content:\"\";position:absolute;height:3em;width:2px;background-color:#91979c;left:11px;top:14px}.history-container .history-item .smaller-icon{font-size:16px;display:flex;justify-content:center;margin-top:2px}"]
                },] },
    ];
    DecStepsListComponent.propDecorators = {
        icon: [{ type: Input }],
        title: [{ type: Input }],
        showTime: [{ type: Input }],
        maxHeight: [{ type: Input }],
        stepsList: [{ type: Input }]
    };
    return DecStepsListComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecStepsListModule = /** @class */ (function () {
    function DecStepsListModule() {
    }
    DecStepsListModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
                        MatIconModule,
                    ],
                    declarations: [DecStepsListComponent],
                    exports: [DecStepsListComponent],
                },] },
    ];
    return DecStepsListModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop$9 = function () {
};
//  Used to extend ngForms functions
var /** @type {?} */ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecStringArrayInputComponent; }),
    multi: true
};
var DecStringArrayInputComponent = /** @class */ (function () {
    function DecStringArrayInputComponent() {
        this.mode = 'textarea';
        this.rows = 3;
        this.innerArray = '';
        this.onTouchedCallback = noop$9;
        this.onChangeCallback = noop$9;
    }
    Object.defineProperty(DecStringArrayInputComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerArray;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerArray) {
                this.innerArray = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecStringArrayInputComponent.prototype, "valueAsString", {
        get: /**
         * @return {?}
         */
        function () {
            return this.getArrayAsString();
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerArray) {
                this.value = this.stringToArray(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    //
    /**
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.getArrayAsString = /**
     * @return {?}
     */
    function () {
        return this.arrayToString(this.value);
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} value
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.value) {
            this.value = value;
        }
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} stringOfArray
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.stringToArray = /**
     * @param {?} stringOfArray
     * @return {?}
     */
    function (stringOfArray) {
        if (stringOfArray) {
            var /** @type {?} */ regExp = /[^,\s][^,\s]*[^,\s]*/g;
            return stringOfArray.match(regExp);
        }
    };
    /**
     * @param {?} arrayOfstring
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.arrayToString = /**
     * @param {?} arrayOfstring
     * @return {?}
     */
    function (arrayOfstring) {
        if (arrayOfstring) {
            return arrayOfstring.join(', ');
        }
    };
    DecStringArrayInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-string-array-input',
                    template: "<ng-container [ngSwitch]=\"mode == 'input'\">\n\n  <mat-form-field *ngSwitchCase=\"true\">\n    <input matInput\n    type=\"text\"\n    [name]=\"name\"\n    [(ngModel)]=\"valueAsString\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n\n  <mat-form-field *ngSwitchCase=\"false\">\n    <textarea matInput\n    [rows]=\"rows\"\n    [name]=\"name\"\n    [(ngModel)]=\"valueAsString\"\n    [placeholder]=\"placeholder\">\n    </textarea>\n  </mat-form-field>\n\n</ng-container>\n",
                    styles: [""],
                    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecStringArrayInputComponent.ctorParameters = function () { return []; };
    DecStringArrayInputComponent.propDecorators = {
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        mode: [{ type: Input }],
        rows: [{ type: Input }]
    };
    return DecStringArrayInputComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecStringArrayInputModule = /** @class */ (function () {
    function DecStringArrayInputModule() {
    }
    DecStringArrayInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatInputModule,
                        FormsModule
                    ],
                    declarations: [DecStringArrayInputComponent],
                    exports: [DecStringArrayInputComponent],
                },] },
    ];
    return DecStringArrayInputModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecTabComponent = /** @class */ (function () {
    function DecTabComponent() {
        var _this = this;
        this.ensureTabName = function () {
            if (!_this.name) {
                throw new Error('DecTabComponentError: The <dec-tab> component must have an unique name. Please, ensure that you have passed an unique namme to the component.');
            }
        };
    }
    /**
     * @return {?}
     */
    DecTabComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.ensureTabName();
    };
    DecTabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-tab',
                    template: "",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecTabComponent.ctorParameters = function () { return []; };
    DecTabComponent.propDecorators = {
        label: [{ type: Input }],
        name: [{ type: Input }],
        total: [{ type: Input }],
        content: [{ type: ContentChild, args: [TemplateRef,] }],
        disabled: [{ type: Input }]
    };
    return DecTabComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecTabMenuComponent = /** @class */ (function () {
    function DecTabMenuComponent() {
    }
    /**
     * @return {?}
     */
    DecTabMenuComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    DecTabMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-tab-menu',
                    template: "<p>\n  tab-menu works!\n</p>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DecTabMenuComponent.ctorParameters = function () { return []; };
    DecTabMenuComponent.propDecorators = {
        activeTab: [{ type: Input }],
        content: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return DecTabMenuComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecTabsComponent = /** @class */ (function () {
    function DecTabsComponent(route, router) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.persist = true;
        this.destroyOnBlur = false;
        this.padding = true;
        this.activeTabChange = new EventEmitter();
        this.activatedTabs = {};
        this.pathFromRoot = '';
        this.ensureUniqueName = function () {
            if (!_this.name) {
                throw new Error('DecTabComponentError: The tab component must have an unique name. Please, ensure that you have passed an unique namme to the component.');
            }
        };
        this.ensureUniqueTabNames = function () {
            return new Promise(function (res, rej) {
                var /** @type {?} */ names = {};
                _this.tabs.toArray().forEach(function (tab) {
                    if (!names[tab.name]) {
                        names[tab.name] = true;
                    }
                    else {
                        throw new Error("DecTabComponentError: The <dec-tabs> component must have an unique name. The name " + tab.name + " was used more than once.");
                    }
                });
                res();
            });
        };
        this.selectTab = function (tabName) {
            if (_this.tabs) {
                _this.activeTab = tabName;
                _this.activatedTabs[tabName] = true;
                _this._activeTabObject = _this.tabs.toArray().filter(function (tab) { return tab.name === tabName; })[0];
                _this._activeTabIndex = _this.tabs.toArray().indexOf(_this._activeTabObject);
                _this.activeTabChange.emit(tabName);
            }
        };
    }
    Object.defineProperty(DecTabsComponent.prototype, "activeTab", {
        get: /**
         * @return {?}
         */
        function () {
            return this._activeTab;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v && this._activeTab !== v) {
                this._activeTab = v;
                this.persistTab(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecTabsComponent.prototype, "activeTabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._activeTabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecTabsComponent.prototype, "activeTabObject", {
        get: /**
         * @return {?}
         */
        function () {
            return this._activeTabObject;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.ensureUniqueName();
        this.watchTabInUrlQuery();
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ensureUniqueTabNames()
            .then(function () {
            var /** @type {?} */ queryParams = Object.assign({}, _this.route.snapshot.queryParams);
            if (queryParams && queryParams[_this.componentTabName()]) {
                var /** @type {?} */ currentTab = queryParams[_this.componentTabName()];
                _this.selectTab(currentTab);
            }
            else {
                _this.startSelectedTab();
            }
        });
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stopWatchingTabInUrlQuery();
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    DecTabsComponent.prototype.shouldTabBeDisplayed = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        var /** @type {?} */ isSelected = this._activeTabObject === tab;
        var /** @type {?} */ isActivated = this.activatedTabs[tab.name];
        return isSelected || (!this.destroyOnBlur && isActivated);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecTabsComponent.prototype.onChangeTab = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ activeTabObject = this.tabs.toArray()[$event.index];
        this.activeTab = activeTabObject.name;
    };
    /**
     * @param {?} total
     * @return {?}
     */
    DecTabsComponent.prototype.parseTotal = /**
     * @param {?} total
     * @return {?}
     */
    function (total) {
        return total !== null && total >= 0 ? total : '?';
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.hidden = true;
        setTimeout(function () {
            _this.hidden = false;
        }, 10);
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.componentTabName = /**
     * @return {?}
     */
    function () {
        return this.name + '-tab';
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    DecTabsComponent.prototype.persistTab = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        if (this.persist) {
            var /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
            queryParams[this.componentTabName()] = tab;
            this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
        }
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.startSelectedTab = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ activeTab = this.activeTab || this.tabs.toArray()[0].name;
        setTimeout(function () {
            // avoid change after component checked error
            _this.selectTab(activeTab);
        }, 1);
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.watchTabInUrlQuery = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.queryParamsSubscription = this.route.queryParams
            .subscribe(function (params) {
            var /** @type {?} */ tab = params[_this.componentTabName()];
            _this.selectTab(tab);
        });
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.stopWatchingTabInUrlQuery = /**
     * @return {?}
     */
    function () {
        this.queryParamsSubscription.unsubscribe();
    };
    DecTabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-tabs',
                    template: "<div *ngIf=\"!hidden\">\n\n  <!-- TABS -->\n  <mat-tab-group [selectedIndex]=\"activeTabIndex\" (focusChange)=\"onChangeTab($event)\" [dynamicHeight]=\"true\">\n\n    <!-- TAB -->\n    <mat-tab *ngFor=\"let tab of tabs;\" [disabled]=\"tab.disabled\">\n\n      <!-- TAB LABEL -->\n      <ng-template mat-tab-label>\n        {{ tab.label }}\n        <span class=\"badge badge-pill badge-small\" *ngIf=\"tab.total >= 0\">{{ parseTotal(tab.total) }}</span>\n      </ng-template>\n\n      <!-- TAB CONTENT WRAPPER -->\n      <ng-container *ngIf=\"shouldTabBeDisplayed(tab)\">\n\n        <!-- TAB MENU -->\n        <div *ngIf=\"tabMenuComponent\" class=\"menu-wrapper\">\n          <ng-container *ngTemplateOutlet=\"tabMenuComponent.content; context: { activeTab: activeTab }\"></ng-container>\n        </div>\n\n        <!-- TABS CONTENT -->\n        <div [ngClass]=\"{'tab-padding': padding}\">\n\n          <ng-container *ngTemplateOutlet=\"tab.content\"></ng-container>\n\n        </div>\n\n      </ng-container>\n\n    </mat-tab>\n\n  </mat-tab-group>\n\n</div>\n",
                    styles: [".menu-wrapper{text-align:right;padding:8px 0}.tab-padding{padding:16px 0}"]
                },] },
    ];
    /** @nocollapse */
    DecTabsComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    DecTabsComponent.propDecorators = {
        tabs: [{ type: ContentChildren, args: [DecTabComponent,] }],
        tabMenuComponent: [{ type: ContentChild, args: [DecTabMenuComponent,] }],
        hidden: [{ type: Input }],
        persist: [{ type: Input }],
        destroyOnBlur: [{ type: Input }],
        name: [{ type: Input }],
        padding: [{ type: Input }],
        activeTab: [{ type: Input }],
        activeTabChange: [{ type: Output }]
    };
    return DecTabsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecTabModule = /** @class */ (function () {
    function DecTabModule() {
    }
    DecTabModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatTabsModule
                    ],
                    declarations: [DecTabComponent],
                    exports: [DecTabComponent],
                },] },
    ];
    return DecTabModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecTabsModule = /** @class */ (function () {
    function DecTabsModule() {
    }
    DecTabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatTabsModule,
                        DecTabModule
                    ],
                    declarations: [DecTabsComponent, DecTabMenuComponent],
                    exports: [
                        DecTabsComponent,
                        DecTabMenuComponent,
                        DecTabModule
                    ],
                },] },
    ];
    return DecTabsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ UPLOAD_ENDPOINT = '/upload';
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop$a = function () {
};
var /** @type {?} */ DEC_UPLOAD_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecUploadComponent; }),
    multi: true
};
var DecUploadComponent = /** @class */ (function () {
    function DecUploadComponent(service) {
        this.service = service;
        this.progresses = [];
        this.error = new EventEmitter();
        this.uploaded = new EventEmitter();
        this.progress = new EventEmitter();
        this.onTouchedCallback = noop$a;
        this.onChangeCallback = noop$a;
    }
    Object.defineProperty(DecUploadComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        /*
        ** ngModel VALUE
        */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fn
     * @return {?}
     */
    DecUploadComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DecUploadComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecUploadComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecUploadComponent.prototype.writeValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.value = v;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecUploadComponent.prototype.filesChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        for (var /** @type {?} */ x = 0; x < event.target.files.length; x++) {
            this.uploadFile(event.target.files[x], x);
        }
    };
    /**
     * @return {?}
     */
    DecUploadComponent.prototype.openFileSelection = /**
     * @return {?}
     */
    function () {
        this.inputFile.nativeElement.click();
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    DecUploadComponent.prototype.getProgressbarMode = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        var /** @type {?} */ mode;
        switch (progress.value) {
            case 0:
                mode = 'buffer';
                break;
            case 100:
                mode = 'indeterminate';
                break;
            default:
                mode = 'determinate';
                break;
        }
        return mode;
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    DecUploadComponent.prototype.getProgressValueBasedOnMode = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        var /** @type {?} */ mode = this.getProgressbarMode(progress);
        var /** @type {?} */ value = mode === 'buffer' ? 0 : progress.value;
        return value;
    };
    /**
     * @param {?} file
     * @param {?} index
     * @return {?}
     */
    DecUploadComponent.prototype.uploadFile = /**
     * @param {?} file
     * @param {?} index
     * @return {?}
     */
    function (file, index) {
        var _this = this;
        if (file) {
            var /** @type {?} */ progress_1 = {
                fileIndex: index,
                fileName: file.name,
                value: 0,
            };
            this.progresses.push(progress_1);
            this.service.upload(UPLOAD_ENDPOINT, [file])
                .pipe(catchError(function (error) {
                console.log('catchError', error);
                progress_1.error = error.message;
                _this.error.emit('message.error.unexpected');
                _this.detectUploadEnd();
                return throwError(error.message);
            }))
                .subscribe(function (event) {
                if (event.type === HttpEventType.UploadProgress) {
                    var /** @type {?} */ percentDone = Math.round((100 * event.loaded) / event.total);
                    progress_1.value = percentDone === 100 ? percentDone : parseFloat(percentDone.toFixed(2));
                }
                else if (event instanceof HttpResponse) {
                    progress_1.value = 100;
                    progress_1.file = event.body;
                    _this.detectUploadEnd();
                }
                _this.progress.emit(_this.progresses);
            });
        }
    };
    /**
     * @return {?}
     */
    DecUploadComponent.prototype.detectUploadEnd = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ stillUploading = this.progresses.filter(function (progress) {
            return progress.value < 100;
        });
        if (!stillUploading.length) {
            this.emitUploadedFiles();
            this.clearInputFile();
            this.clearProgresses();
        }
    };
    /**
     * @return {?}
     */
    DecUploadComponent.prototype.clearInputFile = /**
     * @return {?}
     */
    function () {
        this.inputFile.nativeElement.value = '';
    };
    /**
     * @return {?}
     */
    DecUploadComponent.prototype.clearProgresses = /**
     * @return {?}
     */
    function () {
        this.progresses = [];
    };
    /**
     * @return {?}
     */
    DecUploadComponent.prototype.emitUploadedFiles = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ files = this.progresses.map(function (uploadProgress) {
            return uploadProgress.file;
        });
        this.value = __spread(files);
        this.uploaded.emit(this.value);
    };
    DecUploadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-upload',
                    template: "<ng-container [ngSwitch]=\"(progresses && progresses.length) ? true : false\">\n  <ng-container *ngSwitchCase=\"false\">\n    <span (click)=\"openFileSelection()\" class=\"click\">\n      <ng-content></ng-content>\n    </span>\n  </ng-container>\n  <ng-container *ngSwitchCase=\"true\">\n    <div *ngFor=\"let uploadProgress of progresses\" class=\"dec-upload-progress-wrapper\">\n      <mat-progress-bar\n        color=\"primary\"\n        [mode]=\"getProgressbarMode(uploadProgress)\"\n        [value]=\"getProgressValueBasedOnMode(uploadProgress)\">\n      </mat-progress-bar>\n      <div class=\"text-center\">\n        <small>\n          {{ uploadProgress.value }}% - {{ uploadProgress.fileName }}\n        </small>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n\n\n<input type=\"file\" #inputFile (change)=\"filesChanged($event)\" [multiple]=\"multiple\" [disabled]=\"disabled\">\n\n",
                    styles: [".click{cursor:pointer}input{display:none}.text-center{text-align:center}.dec-upload-progress-wrapper{padding:8px 0}"],
                    providers: [DEC_UPLOAD_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecUploadComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecUploadComponent.propDecorators = {
        disabled: [{ type: Input }],
        multiple: [{ type: Input }],
        error: [{ type: Output }],
        uploaded: [{ type: Output }],
        progress: [{ type: Output }],
        inputFile: [{ type: ViewChild, args: ['inputFile',] }]
    };
    return DecUploadComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecUploadModule = /** @class */ (function () {
    function DecUploadModule() {
    }
    DecUploadModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatProgressBarModule,
                    ],
                    declarations: [
                        DecUploadComponent
                    ],
                    exports: [
                        DecUploadComponent
                    ]
                },] },
    ];
    return DecUploadModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecAuthGuard = /** @class */ (function () {
    function DecAuthGuard(decoraApi) {
        this.decoraApi = decoraApi;
    }
    /**
     * @param {?} route
     * @return {?}
     */
    DecAuthGuard.prototype.canLoad = /**
     * @param {?} route
     * @return {?}
     */
    function (route) {
        return this.isAuthenticated();
    };
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    DecAuthGuard.prototype.canActivate = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        return this.isAuthenticated();
    };
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    DecAuthGuard.prototype.canActivateChild = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        return this.isAuthenticated();
    };
    /**
     * @return {?}
     */
    DecAuthGuard.prototype.isAuthenticated = /**
     * @return {?}
     */
    function () {
        return /** @type {?} */ (this.decoraApi.user$
            .pipe(map(function (user) {
            return (user && user.id) ? true : false;
        })));
    };
    DecAuthGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecAuthGuard.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    return DecAuthGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecGuardModule = /** @class */ (function () {
    function DecGuardModule() {
    }
    DecGuardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    providers: [
                        DecAuthGuard
                    ]
                },] },
    ];
    return DecGuardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DecAppInitializer = function (decConfig, decApi) {
    return function () {
        return new Promise(function (resolve, reject) {
            decConfig.loadConfig().then(function (configuration) {
                decApi.handShake().then(function (account) {
                    resolve({
                        configuration: configuration,
                        account: account,
                    });
                }, function (err) {
                    resolve({
                        configuration: configuration,
                        account: undefined,
                    });
                });
            });
        });
    };
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecSnackBarModule = /** @class */ (function () {
    function DecSnackBarModule() {
    }
    DecSnackBarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatSnackBarModule,
                        TranslateModule
                    ],
                    providers: [
                        DecSnackBarService
                    ]
                },] },
    ];
    return DecSnackBarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecApiModule = /** @class */ (function () {
    function DecApiModule(parentModule) {
        if (parentModule) {
            throw new Error('DecApiModule is already loaded. Import it in the AppModule only');
        }
    }
    DecApiModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule,
                        DecSnackBarModule,
                    ],
                    providers: [
                        DecApiService,
                    ]
                },] },
    ];
    /** @nocollapse */
    DecApiModule.ctorParameters = function () { return [
        { type: DecApiModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return DecApiModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UserAuthData = /** @class */ (function () {
    function UserAuthData(user) {
        if (user === void 0) { user = {}; }
        this.id = user.id || undefined;
        this.email = user.email || undefined;
        this.name = user.name || undefined;
        this.country = user.country || undefined;
        this.company = user.company || undefined;
        this.role = user.role || undefined;
        this.permissions = user.permissions || undefined;
    }
    return UserAuthData;
}());
var Filter = /** @class */ (function () {
    function Filter(data) {
        if (data === void 0) { data = {}; }
        this.property = data.property;
        this.value = Array.isArray(data.property) ? data.property : [data.property];
    }
    return Filter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ DECORA_CONFIGURATION_SERVICE_CONFIG = new InjectionToken('DECORA_CONFIGURATION_SERVICE_CONFIG');
/**
 * @param {?} http
 * @param {?} serviceConfig
 * @return {?}
 */
function InitDecConfigurationService(http, serviceConfig) {
    return new DecConfigurationService(http, serviceConfig);
}
var DecConfigurationModule = /** @class */ (function () {
    function DecConfigurationModule(parentModule) {
        if (parentModule) {
            throw new Error('DecConfigurationModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    DecConfigurationModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: DecConfigurationModule,
            providers: [
                { provide: DECORA_CONFIGURATION_SERVICE_CONFIG, useValue: config },
                {
                    provide: DecConfigurationService,
                    useFactory: InitDecConfigurationService,
                    deps: [HttpClient, DECORA_CONFIGURATION_SERVICE_CONFIG]
                }
            ]
        };
    };
    DecConfigurationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule
                    ],
                    exports: [
                        HttpClientModule
                    ]
                },] },
    ];
    /** @nocollapse */
    DecConfigurationModule.ctorParameters = function () { return [
        { type: DecConfigurationModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return DecConfigurationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecPermissionGuard = /** @class */ (function () {
    function DecPermissionGuard(decoraApi, router) {
        this.decoraApi = decoraApi;
        this.router = router;
    }
    /**
     * @param {?} route
     * @return {?}
     */
    DecPermissionGuard.prototype.canLoad = /**
     * @param {?} route
     * @return {?}
     */
    function (route) {
        if (route.data && !route.data["permissions"]) {
            this.notAllowed();
            return of(false);
        }
        var /** @type {?} */ permissions = route.data["permissions"];
        return this.hasAccess(permissions);
    };
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    DecPermissionGuard.prototype.canActivate = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        if (route.data && !route.data["permissions"]) {
            this.notAllowed();
            return of(false);
        }
        var /** @type {?} */ permissions = route.data["permissions"];
        return this.hasAccess(permissions);
    };
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    DecPermissionGuard.prototype.canActivateChild = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        return this.canActivate(route, state);
    };
    /**
     * @return {?}
     */
    DecPermissionGuard.prototype.notAllowed = /**
     * @return {?}
     */
    function () {
        this.router.navigate(['/forbiden']);
    };
    /**
     * @param {?} permissions
     * @return {?}
     */
    DecPermissionGuard.prototype.hasAccess = /**
     * @param {?} permissions
     * @return {?}
     */
    function (permissions) {
        var _this = this;
        return this.decoraApi.user$
            .pipe(map(function (user) {
            if (user) {
                var /** @type {?} */ allowed = _this.isAllowedAccess(user.permissions, permissions);
                if (!allowed) {
                    _this.notAllowed();
                }
                else {
                    return true;
                }
            }
        }));
    };
    /**
     * @param {?} userPermissions
     * @param {?} currentPermissions
     * @return {?}
     */
    DecPermissionGuard.prototype.isAllowedAccess = /**
     * @param {?} userPermissions
     * @param {?} currentPermissions
     * @return {?}
     */
    function (userPermissions, currentPermissions) {
        try {
            var /** @type {?} */ matchingRole = currentPermissions.find(function (userRole) {
                return userPermissions.find(function (alowedRole) {
                    return alowedRole === userRole;
                }) ? true : false;
            });
            return matchingRole ? true : false;
        }
        catch (/** @type {?} */ error) {
            return false;
        }
    };
    DecPermissionGuard.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    DecPermissionGuard.ctorParameters = function () { return [
        { type: DecApiService },
        { type: Router }
    ]; };
    /** @nocollapse */ DecPermissionGuard.ngInjectableDef = defineInjectable({ factory: function DecPermissionGuard_Factory() { return new DecPermissionGuard(inject(DecApiService), inject(Router)); }, token: DecPermissionGuard, providedIn: "root" });
    return DecPermissionGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecPermissionGuardModule = /** @class */ (function () {
    function DecPermissionGuardModule() {
    }
    DecPermissionGuardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    providers: [
                        DecPermissionGuard
                    ]
                },] },
    ];
    return DecPermissionGuardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecWsClientService = /** @class */ (function () {
    function DecWsClientService() {
        this.connection = {};
    }
    /**
     * @param {?} url
     * @return {?}
     */
    DecWsClientService.prototype.connect = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var /** @type {?} */ connection = this.connection[url];
        if (connection) {
            return connection;
        }
        else {
            return this.connectToWs(url);
        }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    DecWsClientService.prototype.connectToWs = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var /** @type {?} */ connection = this.openConnection(url);
        this.connection[url] = connection;
        return connection;
    };
    /**
     * @param {?} url
     * @param {?=} connection
     * @return {?}
     */
    DecWsClientService.prototype.openConnection = /**
     * @param {?} url
     * @param {?=} connection
     * @return {?}
     */
    function (url, connection) {
        var _this = this;
        if (connection) {
            connection.channel = new WebSocket(url);
        }
        else {
            connection = connection ? connection : {
                channel: new WebSocket(url),
                messages: new BehaviorSubject([]),
            };
        }
        connection.channel.onclose = function () { return _this.openConnection(url, connection); };
        connection.channel.onerror = function () { return _this.openConnection(url, connection); };
        connection.channel.onmessage = function (a) {
            var /** @type {?} */ currentMessages = connection.messages.getValue();
            currentMessages.unshift(a.data);
            connection.messages.next(currentMessages);
        };
        return connection;
    };
    DecWsClientService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecWsClientService.ctorParameters = function () { return []; };
    return DecWsClientService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecWsClientModule = /** @class */ (function () {
    function DecWsClientModule() {
    }
    DecWsClientModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    providers: [
                        DecWsClientService
                    ]
                },] },
    ];
    return DecWsClientModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, DecAutocompleteComponent, DecAutocompleteModule, DecAutocompleteAccountComponent, DecAutocompleteAccountModule, AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCompanyComponent, DecAutocompleteCompanyModule, AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCountryComponent, DecAutocompleteCountryModule, BASE_ENDPOINT, AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR, DecAutocompleteDepartmentComponent, DecAutocompleteDepartmentModule, DecAutocompleteRoleComponent, DecAutocompleteRoleModule, BASE_AUTOCOMPLETE_PROJECT_ENDPOINT, AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR, DecAutocompleteProjectComponent, DecAutocompleteProjectModule, AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR, DecAutocompleteQuoteComponent, DecAutocompleteQuoteModule, DecAutocompleteTagsComponent, DecAutocompleteTagsModule, DecBreadcrumbComponent, DecBreadcrumbModule, DecDialogComponent, DecDialogModule, DecDialogService, DecGalleryComponent, DecGalleryModule, DecIconModule, DecIconComponent, DecImageZoomModule, DecImageZoomComponent, DecLabelComponent, DecLabelModule, DecListModule, DecListFilter, DecListComponent, DecListActiveFilterResumeModule, DecListActiveFilterResumeComponent, DecListAdvancedFilterModule, DecListAdvancedFilterComponent, DecListFilterModule, DecListFilterComponent, DecListFooterComponent, DecListGridComponent, DecListTableModule, DecListTableComponent, DecListTableColumnComponent, DecListActionsModule, DecListActionsComponent, DecPageForbidenComponent, DecPageForbidenModule, DecPageNotFoundComponent, DecPageNotFoundModule, DecProductSpinComponent, DecProductSpinModule, DecSidenavModule, DecSidenavComponent, DecSidenavContentComponent, DecSidenavMenuItemComponent, DecSidenavMenuLeftComponent, DecSidenavMenuRightComponent, DecSidenavMenuTitleComponent, DecSidenavToolbarComponent, DecSidenavToolbarTitleComponent, DecSketchfabViewComponent, DecSketchfabViewModule, DecSpinnerComponent, DecSpinnerModule, DecStepsListComponent, DecStepsListModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, DecStringArrayInputComponent, DecStringArrayInputModule, DecTabsModule, DecTabsComponent, DecTabModule, DecTabComponent, DecUploadModule, DEC_UPLOAD_CONTROL_VALUE_ACCESSOR, DecUploadComponent, hexToRgbNew, standardize_color, DecContrastFontWithBgDirective, DecContrastFontWithBgModule, DecImageModule, DecImageDirective, DecPermissionDirective, DecPermissionModule, DecGuardModule, DecAuthGuard, DecAppInitializer, DecApiService, DecApiModule, UserAuthData, Filter, DecConfigurationService, DECORA_CONFIGURATION_SERVICE_CONFIG, InitDecConfigurationService, DecConfigurationModule, DecSnackBarService, DecSnackBarModule, DecPermissionGuard, DecPermissionGuardModule, DecWsClientService, DecWsClientModule, DecScriptLoaderService, DecScriptLoaderModule, DecListTabsFilterComponent as ɵb, DecSidenavMenuComponent as ɵd, DecSidenavService as ɵc, DecTabMenuComponent as ɵe };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWJyb3dzZXItbGliLXVpLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtYWNjb3VudC9hdXRvY29tcGxldGUtYWNjb3VudC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWFjY291bnQvYXV0b2NvbXBsZXRlLWFjY291bnQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb21wYW55L2F1dG9jb21wbGV0ZS1jb21wYW55LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtY29tcGFueS9hdXRvY29tcGxldGUtY29tcGFueS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWNvdW50cnkvYXV0b2NvbXBsZXRlLWNvdW50cnkuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb3VudHJ5L2F1dG9jb21wbGV0ZS1jb3VudHJ5Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQvYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1yb2xlL2F1dG9jb21wbGV0ZS1yb2xlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcm9sZS9hdXRvY29tcGxldGUtcm9sZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXByb2plY3QvYXV0b2NvbXBsZXRlLXByb2plY3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1wcm9qZWN0L2F1dG9jb21wbGV0ZS1wcm9qZWN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtdGFncy9hdXRvY29tcGxldGUtdGFncy5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXRhZ3MvYXV0b2NvbXBsZXRlLXRhZ3MubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtZGlhbG9nL2RlYy1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zcGlubmVyL2RlYy1zcGlubmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2Nhcm91c2VsLWNvbmZpZy50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2RlYy1nYWxsZXJ5LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUuY29uc3RhbnRzLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWltYWdlLXpvb20vZGVjLWltYWdlLXpvb20uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2RlYy1nYWxsZXJ5Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtaWNvbi9kZWMtaWNvbi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWljb24vZGVjLWljb24ubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1sYWJlbC9kZWMtbGFiZWwuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2NvbG9yL2NvbnRyYXN0LWZvbnQtd2l0aC1iZy9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9jb2xvci9jb250cmFzdC1mb250LXdpdGgtYmcvZGVjLWNvbnRyYXN0LWZvbnQtd2l0aC1iZy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWxhYmVsL2RlYy1sYWJlbC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0Lm1vZGVscy50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIvbGlzdC10YWJzLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFkdmFuY2VkLWZpbHRlci9saXN0LWFkdmFuY2VkLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWZpbHRlci9saXN0LWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9wZXJtaXNzaW9uL2RlYy1wZXJtaXNzaW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9wZXJtaXNzaW9uL2RlYy1wZXJtaXNzaW9uLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZmlsdGVyL2xpc3QtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS1jb2x1bW4vbGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS9saXN0LXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS9saXN0LXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZm9vdGVyL2xpc3QtZm9vdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWN0aW9ucy9saXN0LWFjdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hY3Rpb25zL2xpc3QtYWN0aW9ucy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wYWdlLWZvcmJpZGVuL3BhZ2UtZm9yYmlkZW4uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2UtZm9yYmlkZW4vcGFnZS1mb3JiaWRlbi5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvcGFnZS1ub3QtZm91bmQvcGFnZS1ub3QtZm91bmQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2Utbm90LWZvdW5kL3BhZ2Utbm90LWZvdW5kLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wcm9kdWN0LXNwaW4vcHJvZHVjdC1zcGluLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wcm9kdWN0LXNwaW4vcHJvZHVjdC1zcGluLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUvZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi10b29sYmFyL2RlYy1zaWRlbmF2LXRvb2xiYXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS1sZWZ0L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1jb250ZW50L2RlYy1zaWRlbmF2LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS9kZWMtc2lkZW5hdi1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L3NpZGVuYXYubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9zY3JpcHQtbG9hZGVyL2RlYy1zY3JpcHQtbG9hZGVyLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2tldGNoZmFiLXZpZXcvZGVjLXNrZXRjaGZhYi12aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2tldGNoZmFiLXZpZXcvZGVjLXNrZXRjaGZhYi12aWV3Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3RlcHMtbGlzdC9kZWMtc3RlcHMtbGlzdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXN0ZXBzLWxpc3QvZGVjLXN0ZXBzLWxpc3QubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zdHJpbmctYXJyYXktaW5wdXQvZGVjLXN0cmluZy1hcnJheS1pbnB1dC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXN0cmluZy1hcnJheS1pbnB1dC9kZWMtc3RyaW5nLWFycmF5LWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYi90YWIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFicy5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdGFicy90YWIvdGFiLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYnMubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9ndWFyZC9hdXRoLWd1YXJkLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2d1YXJkL2d1YXJkLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvaW5pdGlhbGl6ZXIvZGVjLWFwcC1pbml0aWFsaXplci50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvc25hY2stYmFyL2RlYy1zbmFjay1iYXIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24tc2VydmljZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL3Blcm1pc3Npb24tZ3VhcmQvZGVjLXBlcm1pc3Npb24tZ3VhcmQuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvcGVybWlzc2lvbi1ndWFyZC9kZWMtcGVybWlzc2lvbi1ndWFyZC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL3dzLWNsaWVudC93cy1jbGllbnQuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvd3MtY2xpZW50L3dzLWNsaWVudC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIsIE1hdFNuYWNrQmFyUmVmLCBTaW1wbGVTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuXG5leHBvcnQgdHlwZSBNZXNzYWdlVHlwZSA9ICdzdWNjZXNzJyB8ICdwcmltYXJ5JyB8ICdpbmZvJyB8ICd3YXJuJyB8ICdlcnJvcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERlY1NuYWNrQmFyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNuYWNrQmFyU2VydmljZTogTWF0U25hY2tCYXIsXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxuXG4gIG9wZW4obWVzc2FnZTogc3RyaW5nLCB0eXBlOiBNZXNzYWdlVHlwZSwgZHVyYXRpb24gPSA0ZTMpOiBNYXRTbmFja0JhclJlZjxTaW1wbGVTbmFja0Jhcj4ge1xuICAgIGNvbnN0IG1zZyA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQobWVzc2FnZSk7XG4gICAgY29uc3Qgc25hY2tDbGFzcyA9IHRoaXMuZ2V0Q2xhc3ModHlwZSk7XG5cbiAgICByZXR1cm4gdGhpcy5zbmFja0JhclNlcnZpY2Uub3Blbihtc2csICcnLCB7XG4gICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICBwYW5lbENsYXNzOiBzbmFja0NsYXNzXG4gICAgfSk7XG4gIH1cblxuICBnZXRDbGFzcyh0eXBlOiBNZXNzYWdlVHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgIHJldHVybiAnc25hY2stc3VjY2Vzcyc7XG4gICAgICBjYXNlICdwcmltYXJ5JzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1wcmltYXJ5JztcbiAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLWluZm8nO1xuICAgICAgY2FzZSAnd2Fybic6XG4gICAgICAgIHJldHVybiAnc25hY2std2Fybic7XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIHJldHVybiAnc25hY2stZXJyb3InO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLXNlcnZpY2UubW9kZWxzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgQ09ORklHX1BBVEggPSAnYXNzZXRzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5qc29uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlIHtcblxuICBzZXQgY29uZmlnKHY6IGFueSkge1xuICAgIGlmICh0aGlzLl9jb25maWcgIT09IHYpIHtcbiAgICAgIHRoaXMuX2NvbmZpZyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNvbmZpZygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICBwcm9maWxlID0gJ2xvY2FsJztcblxuICBwcml2YXRlIF9jb25maWc6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUcnKSBwcml2YXRlIHNlcnZpY2VDb25maWd1cmF0aW9uOiBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZyxcbiAgKSB7fVxuXG4gIGxvYWRDb25maWcoKSB7XG4gICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLnNlcnZpY2VDb25maWd1cmF0aW9uLmJhc2VQYXRoO1xuICAgIGNvbnN0IHBhdGggPSBgJHtiYXNlUGF0aH0vJHtDT05GSUdfUEFUSH1gO1xuXG4gICAgY29uc3QgY2FsbCA9IHRoaXMuaHR0cC5nZXQocGF0aCkudG9Qcm9taXNlKCk7XG5cbiAgICBjYWxsLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgRGVjQ29uZmlndXJhdGlvblNlcnZpY2U6OiBJbml0aWFsaXplZCBpbiAke3RoaXMucHJvZmlsZX0gbW9kZWApO1xuICAgICAgdGhpcy5wcm9maWxlID0gdGhpcy5pc1ZhbGlkUHJvZmlsZShyZXMucHJvZmlsZSwgcmVzKSA/IHJlcy5wcm9maWxlIDogdGhpcy5wcm9maWxlO1xuICAgICAgdGhpcy5jb25maWcgPSByZXNbdGhpcy5wcm9maWxlXTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignRGVjQ29uZmlndXJhdGlvblNlcnZpY2U6OiBJbml0aWFsaXphdGlvbiBFcnJvci4gQ291bGQgcmV0cmlldmUgYXBwIGNvbmZpZ3VyYXRpb24nLCBlcnIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICBwcml2YXRlIGlzVmFsaWRQcm9maWxlKHByb2ZpbGUsIGF2YWlsYWJsZVByb2ZpbGVzKSB7XG5cbiAgICBjb25zdCBhdmFpbGFibGVzID0gT2JqZWN0LmtleXMoYXZhaWxhYmxlUHJvZmlsZXMpO1xuXG4gICAgcmV0dXJuIChhdmFpbGFibGVzLmluZGV4T2YocHJvZmlsZSkgPj0gMCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHNoYXJlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVc2VyQXV0aERhdGEsIExvZ2luRGF0YSwgRmFjZWJvb2tMb2dpbkRhdGEsIERlY0ZpbHRlciwgU2VyaWFsaXplZERlY0ZpbHRlciB9IGZyb20gJy4vZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNTbmFja0JhclNlcnZpY2UgfSBmcm9tICcuLy4uL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgQ2FsbE9wdGlvbnMgPSB7XG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgcGFyYW1zPzoge1xuICAgIFtwcm9wOiBzdHJpbmddOiBhbnk7XG4gIH07XG59ICYge1xuICBbcHJvcDogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSHR0cFJlcXVlc3RUeXBlcyA9ICdHRVQnIHwgJ1BPU1QnIHwgJ1BVVCcgfCAnUEFUQ0gnIHwgJ0RFTEVURSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBcGlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICB1c2VyOiBVc2VyQXV0aERhdGE7XG5cbiAgdXNlciQ6IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+KHVuZGVmaW5lZCk7XG5cbiAgcHJpdmF0ZSBzZXNzaW9uVG9rZW46IHN0cmluZztcblxuICBwcml2YXRlIHVzZXJTdWJzY3JpcGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIHNuYWNrYmFyOiBEZWNTbmFja0JhclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZWNDb25maWc6IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZVRvVXNlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZVRvVXNlcigpO1xuICB9XG5cbiAgZ2V0IGhvc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hcGk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIC8vIFBVQkxJQyBBVVRIIE1FVEhPRFMgLy9cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICBhdXRoID0gKGxvZ2luRGF0YTogTG9naW5EYXRhKSA9PiB7XG4gICAgaWYgKGxvZ2luRGF0YSkge1xuICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL3NpZ25pbicpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgaGVhZGVyczogdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB9O1xuICAgICAgY29uc3QgYm9keSA9IG5ldyBIdHRwUGFyYW1zKClcbiAgICAgICAgLnNldCgndXNlcm5hbWUnLCBsb2dpbkRhdGEuZW1haWwpXG4gICAgICAgIC5zZXQoJ3Bhc3N3b3JkJywgbG9naW5EYXRhLnBhc3N3b3JkKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VXNlckF1dGhEYXRhPihlbmRwb2ludCwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgbm90aWZpZWQ6IHRydWUsIG1lc3NhZ2U6ICdERUNPUkEtQVBJIEFVVEggRVJST1I6OiBObyBjcmVkZW50aWFscyBwcm92aWRlZCcgfSk7XG4gICAgfVxuICB9XG5cbiAgYXV0aEZhY2Vib29rID0gKGxvZ2luRGF0YTogRmFjZWJvb2tMb2dpbkRhdGEpID0+IHtcbiAgICBpZiAobG9naW5EYXRhKSB7XG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvZmFjZWJvb2svc2lnbmluJyk7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgICBjb25zdCBib2R5ID0gbmV3IEh0dHBQYXJhbXMoKVxuICAgICAgICAuc2V0KCdmYWNlYm9va1Rva2VuJywgbG9naW5EYXRhLmZhY2Vib29rVG9rZW4pXG4gICAgICAgIC5zZXQoJ2tlZXBMb2dnZWQnLCBsb2dpbkRhdGEua2VlcExvZ2dlZC50b1N0cmluZygpKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VXNlckF1dGhEYXRhPihlbmRwb2ludCwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgbm90aWZpZWQ6IHRydWUsIG1lc3NhZ2U6ICdERUNPUkEtQVBJIEFVVEggRkFDRUJPT0sgRVJST1I6OiBObyBjcmVkZW50aWFscyBwcm92aWRlZCcgfSk7XG4gICAgfVxuICB9XG5cbiAgbG9nb3V0ID0gKHJlZGlyZWN0VG9Mb2dpblBhZ2UgPSB0cnVlKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL3NpZ25vdXQnKTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZChlbmRwb2ludCwge30sIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICBpZiAocmVkaXJlY3RUb0xvZ2luUGFnZSkge1xuICAgICAgICAgICAgdGhpcy5nb1RvTG9naW5QYWdlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gUFVCTElDIEhUVFAgTUVUSE9EUyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIGdldCA9IDxUPihlbmRwb2ludCwgc2VhcmNoPzogRGVjRmlsdGVyLCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMudHJhbnNmb3JtRGVjRmlsdGVySW5QYXJhbXMoc2VhcmNoKTtcbiAgICByZXR1cm4gdGhpcy5nZXRNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gIH1cblxuICBkZWxldGUgPSA8VD4oZW5kcG9pbnQsIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlTWV0aG9kPFQ+KGVuZG9waW50VXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBhdGNoID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wYXRjaE1ldGhvZDxUPihlbmRvcGludFVybCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1dCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMucHV0TWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHVwc2VydCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGlmIChwYXlsb2FkLmlkID49IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChlbmRwb2ludCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoZW5kcG9pbnQsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHVwbG9hZChlbmRwb2ludDogc3RyaW5nLCBmaWxlczogRmlsZVtdLCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuY3JlYXRlRmlsZXNGb3JtRGF0YShmaWxlcyk7XG4gICAgb3B0aW9ucy5yZXBvcnRQcm9ncmVzcyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RNZXRob2QoJ1BPU1QnLCBlbmRvcGludFVybCwgZm9ybURhdGEsIG9wdGlvbnMpO1xuICB9XG5cblxuXG4gIGhhbmRTaGFrZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cnlUb0xvYWRTaWduZWRJblVzZXIoKTtcbiAgfVxuICAvLyAqKioqKioqKioqKiogLy9cbiAgLy8gUHJpdmF0ZSBIZWxwZXIgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKiogLy9cblxuICBwcml2YXRlIGZldGNoQ3VycmVudExvZ2dlZFVzZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL2FjY291bnQnKTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oKSB9O1xuICAgIHJldHVybiB0aGlzLmdldE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCB7fSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNmb3JtRGVjRmlsdGVySW5QYXJhbXMoZmlsdGVyOiBEZWNGaWx0ZXIpOiBTZXJpYWxpemVkRGVjRmlsdGVyIHtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZWRGaWx0ZXI6IFNlcmlhbGl6ZWREZWNGaWx0ZXIgPSB7fTtcblxuICAgIGlmIChmaWx0ZXIpIHtcblxuICAgICAgaWYgKGZpbHRlci5wYWdlKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIucGFnZSA9IGZpbHRlci5wYWdlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLmxpbWl0KSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIubGltaXQgPSBmaWx0ZXIubGltaXQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuZmlsdGVyR3JvdXBzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcldpdGhWYWx1ZUFzQXJyYXkgPSB0aGlzLmdldEZpbHRlcldpdGhWYWx1ZXNBc0FycmF5KGZpbHRlci5maWx0ZXJHcm91cHMpO1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLmZpbHRlciA9IHRoaXMuZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhmaWx0ZXJXaXRoVmFsdWVBc0FycmF5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5wcm9qZWN0Vmlldykge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnByb2plY3RWaWV3ID0gdGhpcy5maWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKGZpbHRlci5wcm9qZWN0Vmlldyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuc29ydCkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnNvcnQgPSB0aGlzLmZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcoZmlsdGVyLnNvcnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLnRleHRTZWFyY2gpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci50ZXh0U2VhcmNoID0gZmlsdGVyLnRleHRTZWFyY2g7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gc2VyaWFsaXplZEZpbHRlcjtcblxuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKG9iaikge1xuICAgIGlmIChvYmopIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyV2l0aFZhbHVlc0FzQXJyYXkoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cENvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbHRlckdyb3VwcykpOyAvLyBtYWtlIGEgY29weSBvZiB0aGUgZmlsdGVyIHNvIHdlIGRvIG5vdCBjaGFuZ2UgdGhlIG9yaWdpbmFsIGZpbHRlclxuXG4gICAgaWYgKGZpbHRlckdyb3VwQ29weSkge1xuXG4gICAgICByZXR1cm4gZmlsdGVyR3JvdXBDb3B5Lm1hcChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycyA9IGZpbHRlckdyb3VwLmZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG5cbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmlsdGVyLnZhbHVlKSkge1xuICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gW2ZpbHRlci52YWx1ZV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZpbHRlcjtcblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyR3JvdXA7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIGZpbHRlckdyb3VwcztcblxuICAgIH1cbiAgfVxuXG5cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIC8vIEh0dHAgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKiogLy9cbiAgcHJpdmF0ZSBnZXRNZXRob2Q8VD4odXJsOiBzdHJpbmcsIHNlYXJjaCA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLnBhcmFtcyA9IHNlYXJjaDtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8VD4odXJsLCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnBhdGNoPFQ+KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHBvc3RNZXRob2Q8VD4odXJsLCBib2R5Pywgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXRNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWxldGVNZXRob2Q8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLmRlbGV0ZTxUPih1cmwsIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0TWV0aG9kPFQ+KHR5cGU6IEh0dHBSZXF1ZXN0VHlwZXMsIHVybDogc3RyaW5nLCBib2R5OiBhbnkgPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih1bmRlZmluZWQsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHR5cGUsIHVybCwgYm9keSwgb3B0aW9ucyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucmVxdWVzdDxUPihyZXEpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvciA9IChlcnJvcjogYW55KSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgY29uc3QgYm9keU1lc3NhZ2UgPSAoZXJyb3IgJiYgZXJyb3IuZXJyb3IpID8gZXJyb3IuZXJyb3IubWVzc2FnZSA6ICcnO1xuICAgIGNvbnN0IHN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICBjb25zdCBzdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcblxuICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgaWYgKHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdCkge1xuICAgICAgICAgIHRoaXMuZ29Ub0xvZ2luUGFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDQwOTpcbiAgICAgICAgdGhpcy5zbmFja2Jhci5vcGVuKCdtZXNzYWdlLmh0dHAtc3RhdHVzLjQwOScsICdlcnJvcicpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgc3RhdHVzVGV4dCwgbWVzc2FnZSwgYm9keU1lc3NhZ2UgfSk7XG4gIH1cblxuICAvLyAqKioqKioqIC8vXG4gIC8vIEhlbHBlcnMgLy9cbiAgLy8gKioqKioqKiAvL1xuXG4gIHByaXZhdGUgY3JlYXRlRmlsZXNGb3JtRGF0YShmaWxlczogRmlsZVtdKSB7XG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZmlsZXMuZm9yRWFjaCgoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm1JdGVtTmFtZSA9IGluZGV4ID4gMCA/IGBmaWxlLSR7aW5kZXh9YCA6ICdmaWxlJztcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChmb3JtSXRlbU5hbWUsIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTG9naW5QYWdlKCkge1xuICAgIGNvbnN0IG5ha2VkQXBwRG9tYWluID0gd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgIC5yZXBsYWNlKCdodHRwczovLycsICcnKVxuICAgICAgLnJlcGxhY2UoJ2h0dHA6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gsICcnKTtcblxuICAgIGNvbnN0IG5ha2VkQXV0aERvbWFpbiA9IHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdC5zcGxpdCgnPycpWzBdXG4gICAgICAucmVwbGFjZSgnaHR0cHM6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKCdodHRwOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnLy8nLCAnJyk7XG5cbiAgICBpZiAobmFrZWRBcHBEb21haW4gIT09IG5ha2VkQXV0aERvbWFpbikge1xuICAgICAgY29uc3QgYXV0aFVybFdpdGhSZWRpcmVjdCA9IGAke3RoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdH0ke3RoaXMuZ2V0UGFyYW1zRGl2aWRlcigpfXJlZGlyZWN0VXJsPSR7d2luZG93LmxvY2F0aW9uLmhyZWZ9YDtcbiAgICAgIGNvbnNvbGUubG9nKGBEZWNBcGlTZXJ2aWNlOjogTm90IGF1dGhlbnRpY2F0ZWQuIFJlZGlyZWN0aW5nIHRvIGxvZ2luIHBhZ2UgYXQ6ICR7YXV0aFVybFdpdGhSZWRpcmVjdH1gKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXV0aFVybFdpdGhSZWRpcmVjdDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFBhcmFtc0RpdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdC5zcGxpdCgnPycpLmxlbmd0aCA+IDEgPyAnJicgOiAnPyc7XG4gIH1cblxuICBwcml2YXRlIHRyeVRvTG9hZFNpZ25lZEluVXNlcigpIHtcbiAgICBjb25zdCBjYWxsID0gdGhpcy5mZXRjaEN1cnJlbnRMb2dnZWRVc2VyKCkudG9Qcm9taXNlKCk7XG4gICAgY2FsbC50aGVuKGFjY291bnQgPT4ge1xuICAgICAgY29uc29sZS5sb2coYERlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXplZCBhcyAke2FjY291bnQubmFtZX1gKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICBjb25zb2xlLmxvZygnRGVjb3JhQXBpU2VydmljZTo6IEluaXRpYWxpemVkIGFzIG5vdCBsb2dnZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXphdGlvbiBFcnJvci4gQ291bGQgcmV0cmlldmUgdXNlciBhY2NvdW50JywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHByaXZhdGUgbmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih0eXBlPzogc3RyaW5nLCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpIHtcbiAgICBoZWFkZXJzID0gaGVhZGVycyB8fCBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICBjb25zdCBjdXN0b21pemVkQ29udGVudFR5cGUgPSBoZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKCFjdXN0b21pemVkQ29udGVudFR5cGUgJiYgdHlwZSkge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCB0eXBlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2Vzc2lvblRva2VuKSB7XG4gICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ1gtQXV0aC1Ub2tlbicsIHRoaXMuc2Vzc2lvblRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhdFNlc3Npb25Ub2tlbihyZXMpIHtcbiAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHJlcyAmJiByZXMuc2Vzc2lvbiA/IHJlcy5zZXNzaW9uLmlkIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwcml2YXRlIGdldFJlc291cmNlVXJsKHBhdGgpIHtcblxuICAgIGNvbnN0IGJhc2VQYXRoID0gdGhpcy5kZWNDb25maWcuY29uZmlnLnVzZU1vY2tBcGkgPyB0aGlzLmRlY0NvbmZpZy5jb25maWcubW9ja0FwaUhvc3QgOiB0aGlzLmRlY0NvbmZpZy5jb25maWcuYXBpO1xuXG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXlxcL3xcXC8kL2csICcnKTtcblxuICAgIHJldHVybiBgJHtiYXNlUGF0aH0vJHtwYXRofWA7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Vc2VyKCkge1xuICAgIHRoaXMudXNlclN1YnNjcmlwaW9uID0gdGhpcy51c2VyJC5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvVXNlcigpIHtcbiAgICB0aGlzLnVzZXJTdWJzY3JpcGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLypcbiAgKiBTaGFyZSBPYnNlcnZhYmxlXG4gICpcbiAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIHNoYXJlIHRoZSBhY3R1YWwgZGF0YSB2YWx1ZXMgYW5kIG5vdCBqdXN0IHRoZSBvYnNlcnZhYmxlIGluc3RhbmNlXG4gICpcbiAgKiBUbyByZXVzZSBhIHNpbmdsZSwgY29tbW9uIHN0cmVhbSBhbmQgYXZvaWQgbWFraW5nIGFub3RoZXIgc3Vic2NyaXB0aW9uIHRvIHRoZSBzZXJ2ZXIgcHJvdmlkaW5nIHRoYXQgZGF0YS5cbiAgKlxuICAqL1xuICBwcml2YXRlIHNoYXJlT2JzZXJ2YWJsZShjYWxsOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICByZXR1cm4gY2FsbC5waXBlKHNoYXJlKCkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIElucHV0LCBmb3J3YXJkUmVmLCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENPTU1BLCBFTlRFUiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN3aXRjaE1hcCwgc3RhcnRXaXRoLCB0YXAsIGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGFiZWxGdW5jdGlvbiwgVmFsdWVGdW5jdGlvbiwgU2VsZWN0aW9uRXZlbnQsIEN1c3RvbUZldGNoRnVuY3Rpb24gfSBmcm9tICcuL2F1dG9jb21wbGV0ZS5tb2RlbHMnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlVHJpZ2dlciwgTWF0Q2hpcElucHV0RXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtdWx0aSA/IHRydWUgOiBmYWxzZVwiPlxuXG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj5cbiAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICA8bWF0LWNoaXAtbGlzdCAjZGVjQXV0b2NvbXBsZXRlQ2hpcExpc3Q+XG4gICAgICAgIDxtYXQtY2hpcCAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNTZWxlY3RlZFwiIFtyZW1vdmFibGVdPVwidHJ1ZVwiIChyZW1vdmVkKT1cInJlbW92ZShvcHRpb24pXCI+XG4gICAgICAgICAge3sgZXh0cmFjdExhYmVsKG9wdGlvbikgfX1cbiAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICA8L21hdC1jaGlwPlxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCIgI3Rlcm1JbnB1dCBbbWF0QXV0b2NvbXBsZXRlXT1cImRlY0F1dG9jb21wbGV0ZVwiIFtmb3JtQ29udHJvbF09XCJhdXRvY29tcGxldGVJbnB1dFwiXG4gICAgICAgICAgW25hbWVdPVwibmFtZVwiIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIChrZXl1cC5lbnRlcik9XCJvbkVudGVyQnV0dG9uKCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCIgcmVhZG9ubHkgb25mb2N1cz1cInRoaXMucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpO1wiXG4gICAgICAgICAgW21hdENoaXBJbnB1dEZvcl09XCJkZWNBdXRvY29tcGxldGVDaGlwTGlzdFwiIFttYXRDaGlwSW5wdXRTZXBhcmF0b3JLZXlDb2Rlc109XCJzZXBhcmF0b3JLZXlzQ29kZXNcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjbGVhcih0cnVlKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmICFyZXF1aXJlZCAmJiB2YWx1ZVwiPlxuICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cInJlc2V0KClcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiB2YWx1ZSAhPT0gd3JpdHRlblZhbHVlXCI+XG4gICAgICAgICAgPG1hdC1pY29uPnJlcGxheTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9tYXQtY2hpcC1saXN0PlxuICAgICAgPG1hdC1hdXRvY29tcGxldGUgI2RlY0F1dG9jb21wbGV0ZT1cIm1hdEF1dG9jb21wbGV0ZVwiIFtkaXNwbGF5V2l0aF09XCJleHRyYWN0TGFiZWxcIiAob3B0aW9uU2VsZWN0ZWQpPVwib25PcHRpb25TZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgbmFtZT1cImF1dG9jb21wbGV0ZVZhbHVlXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdldFNlbGVjdGFibGVPcHRpb25zKG9wdGlvbnMkIHwgYXN5bmMpXCIgW3ZhbHVlXT1cIml0ZW1cIj5cbiAgICAgICAgICB7eyBleHRyYWN0TGFiZWwoaXRlbSkgfX1cbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgPGlucHV0IG1hdElucHV0IFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiICN0ZXJtSW5wdXQgW21hdEF1dG9jb21wbGV0ZV09XCJkZWNBdXRvY29tcGxldGVcIiBbZm9ybUNvbnRyb2xdPVwiYXV0b2NvbXBsZXRlSW5wdXRcIlxuICAgICAgICBbbmFtZV09XCJuYW1lXCIgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgKGtleXVwLmVudGVyKT1cIm9uRW50ZXJCdXR0b24oJGV2ZW50KVwiIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcbiAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCIgcmVhZG9ubHkgb25mb2N1cz1cInRoaXMucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpO1wiPlxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjbGVhcih0cnVlKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmICFyZXF1aXJlZCAmJiB2YWx1ZVwiPlxuICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cInJlc2V0KClcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiB2YWx1ZSAhPT0gd3JpdHRlblZhbHVlXCI+XG4gICAgICAgIDxtYXQtaWNvbj5yZXBsYXk8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8bWF0LWF1dG9jb21wbGV0ZSAjZGVjQXV0b2NvbXBsZXRlPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImV4dHJhY3RMYWJlbFwiIChvcHRpb25TZWxlY3RlZCk9XCJvbk9wdGlvblNlbGVjdGVkKCRldmVudClcIlxuICAgICAgbmFtZT1cImF1dG9jb21wbGV0ZVZhbHVlXCI+XG4gICAgICA8bWF0LW9wdGlvbiAqbmdJZj1cIiFyZXF1aXJlZFwiIFt2YWx1ZV09XCJcIj48L21hdC1vcHRpb24+XG4gICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBnZXRTZWxlY3RhYmxlT3B0aW9ucyhvcHRpb25zJCB8IGFzeW5jKVwiIFt2YWx1ZV09XCJpdGVtXCI+XG4gICAgICAgIHt7IGV4dHJhY3RMYWJlbChpdGVtKSB9fVxuICAgICAgPC9tYXQtb3B0aW9uPlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgPC9uZy1jb250YWluZXI+XG5cbjwvbmctY29udGFpbmVyPlxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBWaWV3Q2hpbGQoTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcikgIGF1dG9jb21wbGV0ZVRyaWdnZXI6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXI7XG5cbiAgYXV0b2NvbXBsZXRlSW5wdXQ6IEZvcm1Db250cm9sO1xuXG4gIG9wdGlvbnMkOiBPYnNlcnZhYmxlPGFueVtdPjtcblxuICBvcHRpb25zU2VsZWN0ZWQ6IGFueVtdO1xuXG4gIHdyaXR0ZW5WYWx1ZTogYW55O1xuXG4gIHNlcGFyYXRvcktleXNDb2RlczogbnVtYmVyW10gPSBbRU5URVIsIENPTU1BXTtcblxuICAvLyBQYXJhbXNcbiAgQElucHV0KCkgY3VzdG9tRmV0Y2hGdW5jdGlvbjogQ3VzdG9tRmV0Y2hGdW5jdGlvbjtcblxuICBASW5wdXQoKSBlbmRwb2ludDtcblxuICBASW5wdXQoKSBtdWx0aTogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXBlYXQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHY7XG4gICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQpIHtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZGlzYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGxhYmVsRm46IExhYmVsRnVuY3Rpb247XG5cbiAgQElucHV0KCkgbGFiZWxBdHRyOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbmFtZSA9ICdhdXRvY29tcGxldGVJbnB1dCc7XG5cbiAgQElucHV0KClcbiAgc2V0IG9wdGlvbnModjogYW55W10pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gdjtcbiAgICB0aGlzLmlubmVyT3B0aW9ucyA9IHY7XG4gIH1cbiAgZ2V0IG9wdGlvbnMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB9XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSB2YWx1ZUZuOiBWYWx1ZUZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIHZhbHVlQXR0cjogc3RyaW5nO1xuXG4gIC8vIEV2ZW50c1xuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PigpO1xuXG4gIEBPdXRwdXQoKSBlbnRlckJ1dHRvbjogRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+KCk7XG5cbiAgLy8gVmlldyBlbGVtZW50c1xuICBAVmlld0NoaWxkKCd0ZXJtSW5wdXQnKSB0ZXJtSW5wdXQ7XG5cbiAgQFZpZXdDaGlsZCgnY2hpcExpc3QnKSBjaGlwTGlzdDtcblxuICAvLyBwcml2YXRlIGRhdGE7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX29wdGlvbnM6IGFueVtdO1xuXG4gIHByaXZhdGUgaW5uZXJPcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIHByaXZhdGUgcmVzcG9uc2VzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gIHByaXZhdGUgc2VhcmNoJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih1bmRlZmluZWQpO1xuXG4gIHByaXZhdGUgc2VhcmNoSW5wdXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNlcnZpY2U6IERlY0FwaVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5jcmVhdGVJbnB1dCgpO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9TZWFyY2hBbmRTZXRPcHRpb25zT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9JbnB1dFZhbHVlQ2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZGV0ZWN0UmVxdWlyZWREYXRhKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9JbnB1dFZhbHVlQ2hhbmdlcygpO1xuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBWQUxVRVxuICAqL1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5zZXRJbm5lclZhbHVlKHYpO1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZCA9IFtdO1xuICAgICAgdGhpcy53cml0dGVuVmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMucG9wdWxhdGVBdXRvY29tcGxldGVXaXRoSW5pdGlhbFZhbHVlcyh2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgb25PcHRpb25TZWxlY3RlZCgkZXZlbnQpIHtcblxuICAgIGxldCBzaG91bGRFbWl0ID0gdHJ1ZTtcblxuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gJGV2ZW50Lm9wdGlvbi52YWx1ZTtcblxuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShzZWxlY3RlZE9wdGlvbik7XG5cbiAgICBpZiAoc2VsZWN0ZWRPcHRpb25WYWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuXG4gICAgICBpZiAodGhpcy5tdWx0aSkge1xuXG4gICAgICAgIHNob3VsZEVtaXQgPSB0aGlzLmFkZE9wdGlvblRvT3B0aW9uc1NlbGVjdGVkKHNlbGVjdGVkT3B0aW9uKTtcblxuICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodW5kZWZpbmVkKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLnZhbHVlID0gc2VsZWN0ZWRPcHRpb25WYWx1ZTtcblxuICAgICAgfVxuXG4gICAgICBpZiAoc2hvdWxkRW1pdCkge1xuICAgICAgICB0aGlzLm9wdGlvblNlbGVjdGVkLmVtaXQoe1xuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgIG9wdGlvbjogc2VsZWN0ZWRPcHRpb24sXG4gICAgICAgICAgb3B0aW9uczogdGhpcy5pbm5lck9wdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmJsdXJJbnB1dCgpO1xuXG4gICAgfVxuXG4gIH1cblxuICBvbkVudGVyQnV0dG9uKCRldmVudCkge1xuICAgIHRoaXMuZW50ZXJCdXR0b24uZW1pdCgkZXZlbnQpO1xuICB9XG5cbiAgc2V0Rm9jdXMoKSB7XG4gICAgdGhpcy50ZXJtSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgb3BlblBhbmVsKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlVHJpZ2dlci5vcGVuUGFuZWwoKTtcbiAgfVxuXG4gIGNsb3NlUGFuZWwoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVUcmlnZ2VyLmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIG9uQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBjbGVhcihyZW9wZW4gPSBmYWxzZSkge1xuICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vcHRpb25zU2VsZWN0ZWQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlKCcnKTtcblxuICAgIGlmICh0aGlzLndyaXR0ZW5WYWx1ZSA9PT0gdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5yZXNldElucHV0Q29udHJvbCgpO1xuICAgIH1cblxuICAgIGlmIChyZW9wZW4pIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgfSwgMSk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMud3JpdHRlblZhbHVlO1xuICAgIHRoaXMucG9wdWxhdGVBdXRvY29tcGxldGVXaXRoSW5pdGlhbFZhbHVlcyh0aGlzLndyaXR0ZW5WYWx1ZSk7XG4gICAgdGhpcy5yZXNldElucHV0Q29udHJvbCgpO1xuICB9XG5cbiAgZXh0cmFjdExhYmVsOiBMYWJlbEZ1bmN0aW9uID0gKGl0ZW06IGFueSk6IHN0cmluZyA9PiB7XG4gICAgbGV0IGxhYmVsID0gaXRlbTsgLy8gdXNlIHRoZSBvYmplY3QgaXRzZWxmIGlmIG5vIGxhYmVsIGZ1bmN0aW9uIG9yIGF0dHJpYnV0ZSBpcyBwcm92aWRlZFxuICAgIGlmIChpdGVtKSB7XG4gICAgICBpZiAodGhpcy5sYWJlbEZuKSB7IC8vIFVzZSBjdXN0b20gbGFiZWwgZnVuY3Rpb24gaWYgcHJvdmlkZWRcbiAgICAgICAgbGFiZWwgPSB0aGlzLmxhYmVsRm4oaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubGFiZWxBdHRyKSB7IC8vIFVzZSBvYmplY3QgbGFiZWwgYXR0cmlidXRlIGlmIHByb3ZpZGVkXG4gICAgICAgIGxhYmVsID0gaXRlbVt0aGlzLmxhYmVsQXR0cl0gfHwgdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgICBsYWJlbCA9IHRoaXMuZW5zdXJlU3RyaW5nKGxhYmVsKTtcbiAgICByZXR1cm4gbGFiZWw7XG4gIH1cblxuICByZW1vdmUob3B0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMub3B0aW9uc1NlbGVjdGVkLmluZGV4T2Yob3B0aW9uKTtcblxuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlVmFsdWVXaXRoT3B0aW9uc1NlbGVjdGVkKCk7XG4gIH1cblxuICBwcml2YXRlIHNldElucHV0VmFsdWUodikge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuc2V0VmFsdWUodik7XG5cbiAgICBpZiAoIXYpIHtcbiAgICAgIHRoaXMudGVybUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGJsdXJJbnB1dCgpIHtcblxuICAgIHRoaXMudGVybUlucHV0Lm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuXG4gIH1cblxuICBwcml2YXRlIGFkZE9wdGlvblRvT3B0aW9uc1NlbGVjdGVkKG9wdGlvbik6IGJvb2xlYW4ge1xuXG4gICAgaWYgKG9wdGlvbikge1xuXG4gICAgICBsZXQgc2hvdWxkRW1pdCA9IHRydWU7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnNTZWxlY3RlZCAmJiB0aGlzLm9wdGlvbnNTZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm9wdGlvbnNTZWxlY3RlZC5pbmRleE9mKG9wdGlvbik7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZC5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKG51bGwpO1xuICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWVXaXRoT3B0aW9uc1NlbGVjdGVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2hvdWxkRW1pdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZCA9IFtvcHRpb25dO1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlV2l0aE9wdGlvbnNTZWxlY3RlZCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2hvdWxkRW1pdDtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBwb3B1bGF0ZUF1dG9jb21wbGV0ZVdpdGhJbml0aWFsVmFsdWVzKHZhbHVlLCByZWxvYWRPcHRpb25zID0gZmFsc2UpIHtcblxuICAgIGlmICh0aGlzLm11bHRpKSB7XG5cbiAgICAgIGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcblxuICAgICAgaWYgKGlzQXJyYXkpIHtcblxuICAgICAgICB0aGlzLm9wdGlvbnNTZWxlY3RlZCA9IFtdO1xuXG4gICAgICAgIHZhbHVlLmZvckVhY2gob3B0aW9uVmFsdWUgPT4ge1xuXG4gICAgICAgICAgdGhpcy5sb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUob3B0aW9uVmFsdWUpXG4gICAgICAgICAgICAudGhlbigob3B0aW9uKSA9PiB7XG5cbiAgICAgICAgICAgICAgdGhpcy5hZGRPcHRpb25Ub09wdGlvbnNTZWxlY3RlZChvcHRpb24pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5sb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUodmFsdWUpXG4gICAgICAgIC50aGVuKChvcHRpb25zKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRJbm5lclZhbHVlKHZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVmFsdWVXaXRoT3B0aW9uc1NlbGVjdGVkKCkge1xuXG4gICAgaWYgKHRoaXMub3B0aW9uc1NlbGVjdGVkICYmIHRoaXMub3B0aW9uc1NlbGVjdGVkLmxlbmd0aCkge1xuXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5vcHRpb25zU2VsZWN0ZWQubWFwKG9wdGlvbiA9PiB0aGlzLmV4dHJhY3RWYWx1ZShvcHRpb24pKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUod3JpdHRlblZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnNvbGUubG9nKCdsb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUnLCB3cml0dGVuVmFsdWUpXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHdyaXR0ZW5WYWx1ZSkge1xuICAgICAgICB0aGlzLnNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHdyaXR0ZW5WYWx1ZSwgdHJ1ZSlcbiAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShyZXNbMF0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUod3JpdHRlblZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0UmVxdWlyZWREYXRhKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBlcnJvcjogc3RyaW5nO1xuICAgICAgaWYgKCF0aGlzLmVuZHBvaW50ICYmICF0aGlzLm9wdGlvbnMgJiYgIXRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbikge1xuICAgICAgICBlcnJvciA9ICdObyBlbmRwb2ludCB8IG9wdGlvbnMgfCBjdXN0b21GZXRjaEZ1bmN0aW9uIHNldC4gWW91IG11c3QgcHJvdmlkZSBvbmUgb2YgdGhlbSB0byBiZSBhYmxlIHRvIHVzZSB0aGUgQXV0b2NvbXBsZXRlJztcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICB0aGlzLnJhaXNlRXJyb3IoZXJyb3IpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldElucHV0Q29udHJvbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5tYXJrQXNVbnRvdWNoZWQoKTtcbiAgICB0aGlzLmJsdXJJbnB1dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0VmFsdWU6IFZhbHVlRnVuY3Rpb24gPSAoaXRlbTogYW55KTogYW55ID0+IHtcbiAgICBsZXQgdmFsdWUgPSBpdGVtOyAvLyB1c2UgdGhlIG9iamVjdCBpdHNlbGYgaWYgbm8gdmFsdWUgZnVuY3Rpb24gb3IgYXR0cmlidXRlIGlzIHByb3ZpZGVkXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlRm4pIHsgLy8gVXNlIGN1c3RvbSB2YWx1ZSBmdW5jdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVGbihpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52YWx1ZUF0dHIpIHsgLy8gVXNlIG9iamVjdCB2YWx1ZSBhdHRyaWJ1dGUgaWYgcHJvdmlkZWRcbiAgICAgICAgdmFsdWUgPSBpdGVtW3RoaXMudmFsdWVBdHRyXSB8fCB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcGFyZUFzU3RyaW5nKHYxLCB2Mikge1xuICAgIGNvbnN0IHN0cmluZzEgPSB0aGlzLmVuc3VyZVN0cmluZyh2MSk7XG4gICAgY29uc3Qgc3RyaW5nMiA9IHRoaXMuZW5zdXJlU3RyaW5nKHYyKTtcbiAgICByZXR1cm4gc3RyaW5nMSA9PT0gc3RyaW5nMjtcbiAgfVxuXG4gIHByaXZhdGUgZW5zdXJlU3RyaW5nKHYpIHtcbiAgICBpZiAodHlwZW9mIHYgIT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoaXNOYU4odikpIHtcbiAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdiA9IGAke3Z9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBwcml2YXRlIHNldElubmVyVmFsdWUodjogYW55KSB7XG4gICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICB0aGlzLnNldElucHV0VmFsdWVCYXNlZE9uSW5uZXJWYWx1ZSh2KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5wdXRWYWx1ZUJhc2VkT25Jbm5lclZhbHVlKHY6IGFueSkge1xuICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuZ2V0T3B0aW9uQmFzZWRPblZhbHVlKHYpO1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZShvcHRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcHRpb25CYXNlZE9uVmFsdWUodjogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJPcHRpb25zLmZpbmQoaXRlbSA9PiB7XG4gICAgICBjb25zdCBpdGVtVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShpdGVtKTtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBc1N0cmluZyhpdGVtVmFsdWUsIHYpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbnB1dCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0ID0gbmV3IEZvcm1Db250cm9sKCcnKTtcblxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmRpc2FibGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvSW5wdXRWYWx1ZUNoYW5nZXMoKSB7XG5cbiAgICB0aGlzLnNlYXJjaElucHV0U3Vic2NyaXB0aW9uID0gdGhpcy5hdXRvY29tcGxldGVJbnB1dC52YWx1ZUNoYW5nZXNcbiAgICAucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICApXG4gICAgLnN1YnNjcmliZShzZWFyY2hUZXh0ID0+IHtcbiAgICAgIHRoaXMuc2VhcmNoJC5uZXh0KHNlYXJjaFRleHQpO1xuICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9JbnB1dFZhbHVlQ2hhbmdlcygpIHtcblxuICAgIHRoaXMuc2VhcmNoSW5wdXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1NlYXJjaEFuZFNldE9wdGlvbnNPYnNlcnZhYmxlKCkge1xuICAgIHRoaXMub3B0aW9ucyQgPSB0aGlzLnNlYXJjaCRcbiAgICAucGlwZShcbiAgICAgIG1hcCh2ID0+IHYgPyB2IDogJycpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHN3aXRjaE1hcCgodGV4dFNlYXJjaDogc3RyaW5nKSA9PiB7XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHRleHRTZWFyY2ggfHwgJyc7XG5cbiAgICAgICAgY29uc3QgaXNTdHJpbmdUZXJtID0gdHlwZW9mIHNlYXJjaFRlcm0gPT09ICdzdHJpbmcnO1xuXG4gICAgICAgIGlmIChpc1N0cmluZ1Rlcm0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hCYXNlZEZldGNoaW5nVHlwZShzZWFyY2hUZXJtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2YodGhpcy5pbm5lck9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldFNlbGVjdGFibGVPcHRpb25zID0gKG9wdGlvbnMpID0+IHtcblxuICAgIGNvbnN0IGlzQXJyYXkgPSBvcHRpb25zID8gQXJyYXkuaXNBcnJheShvcHRpb25zKSA6IGZhbHNlO1xuXG4gICAgbGV0IHNlbGVjdGFibGVPcHRpb25zID0gb3B0aW9ucztcblxuICAgIGlmIChpc0FycmF5ICYmICF0aGlzLnJlcGVhdCkge1xuXG4gICAgICBzZWxlY3RhYmxlT3B0aW9ucyA9IG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5yZXBlYXQpIHtcbiAgICAgICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKG9wdGlvbik7XG4gICAgICAgICAgbGV0IGFscmVhZHlTZWxlY3RlZDogYm9vbGVhbjtcbiAgICAgICAgICBpZiAodGhpcy5tdWx0aSkge1xuICAgICAgICAgICAgYWxyZWFkeVNlbGVjdGVkID0gdGhpcy5vcHRpb25zU2VsZWN0ZWQgJiYgdGhpcy5vcHRpb25zU2VsZWN0ZWQuZmluZChzZWxlY3RlZCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShzZWxlY3RlZCk7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBc1N0cmluZyhzZWxlY3RlZFZhbHVlLCBvcHRpb25WYWx1ZSk7XG4gICAgICAgICAgICB9KSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxyZWFkeVNlbGVjdGVkID0gdGhpcy5jb21wYXJlQXNTdHJpbmcodGhpcy52YWx1ZSwgb3B0aW9uVmFsdWUpOztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICFhbHJlYWR5U2VsZWN0ZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGFibGVPcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh0ZXh0U2VhcmNoLCByZW1lbWJlclJlc3BvbnNlID0gZmFsc2UpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLnNlYXJjaEluTG9jYWxPcHRpb25zKHRleHRTZWFyY2gpO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24pIHtcblxuICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbih0ZXh0U2VhcmNoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAob3B0aW9ucyA9PiB7XG4gICAgICAgICAgICB0aGlzLmlubmVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGNvbnN0IGJvZHkgPSB0ZXh0U2VhcmNoID8geyB0ZXh0U2VhcmNoIH0gOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChyZW1lbWJlclJlc3BvbnNlKSB7XG5cbiAgICAgICAgY29uc3QgZGF0YUluTWVtb3J5ID0gdGhpcy5yZXNwb25zZXNbdGV4dFNlYXJjaF07XG5cbiAgICAgICAgaWYgKGRhdGFJbk1lbW9yeSkge1xuXG4gICAgICAgICAgcmV0dXJuIG9mKGRhdGFJbk1lbW9yeSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0PGFueVtdPih0aGlzLmVuZHBvaW50LCBib2R5KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIHRhcCgob3B0aW9uczogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlc1t0ZXh0U2VhcmNoXSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5nZXQ8YW55W10+KHRoaXMuZW5kcG9pbnQsIGJvZHkpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YXAoKG9wdGlvbnM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcblxuICAgICAgfVxuXG5cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaEluTG9jYWxPcHRpb25zKHRlcm06IHN0cmluZykge1xuICAgIGNvbnN0IHRlcm1TdHJpbmcgPSBgJHt0ZXJtfWA7XG5cbiAgICBsZXQgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnM7XG5cbiAgICBpZiAodGVybVN0cmluZykge1xuICAgICAgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnNcbiAgICAgIC5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsOiBzdHJpbmcgPSB0aGlzLmV4dHJhY3RMYWJlbChpdGVtKTtcbiAgICAgICAgY29uc3QgbG93ZXJDYXNlTGFiZWwgPSBsYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBsb3dlckNhc2VUZXJtID0gdGVybVN0cmluZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbG93ZXJDYXNlTGFiZWwuc2VhcmNoKGxvd2VyQ2FzZVRlcm0pID49IDA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2YoZmlsdGVyZWREYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgcmFpc2VFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgRXJyb3I6OiBUaGUgYXV0b2NvbXBsZXRlIHdpdGggbmFtZSBcIiR7dGhpcy5uYW1lfVwiIGhhZCB0aGUgZm9sbG93IHByb2JsZW06ICR7ZXJyb3J9YCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdENoaXBzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwVXJsRW5jb2RpbmdDb2RlYyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5jb25zdCBBQ0NPVU5UU19FTkRQT0lOVCA9ICdhY2NvdW50cy9vcHRpb25zJztcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5jb25zdCBBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLWFjY291bnQnLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlICpuZ0lmPVwiZW5kcG9pbnRcIlxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuW25hbWVdPVwibmFtZVwiXG5bbXVsdGldPVwibXVsdGlcIlxuW3JlcGVhdF09XCJyZXBlYXRcIlxuW2xhYmVsRm5dPVwibGFiZWxGblwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcblt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbihibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUFjY291bnRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgZW5kcG9pbnQ6IHN0cmluZztcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgdHlwZXModjogc3RyaW5nW10pIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fdHlwZXMpIHtcbiAgICAgIHRoaXMuX3R5cGVzID0gdjtcblxuICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy5zZXRSb2xlc1BhcmFtcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCB0eXBlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGVzO1xuICB9XG5cbiAgX3R5cGVzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdBY2NvdW50IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnQWNjb3VudCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcGVhdDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNldFJvbGVzUGFyYW1zKCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiZgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBsYWJlbEZuKGFjY291bnQpIHtcbiAgICByZXR1cm4gYCR7YWNjb3VudC52YWx1ZX0gIyR7YWNjb3VudC5rZXl9YDtcbiAgfVxuXG4gIHNldFJvbGVzUGFyYW1zKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgIGxldCBlbmRwb2ludCA9IGAke0FDQ09VTlRTX0VORFBPSU5UfWA7XG5cbiAgICBpZiAodGhpcy50eXBlcyAmJiB0aGlzLnR5cGVzLmxlbmd0aCkge1xuICAgICAgcGFyYW1zLnB1c2goYHJvbGVzPSR7ZW5jb2RlVVJJKEpTT04uc3RyaW5naWZ5KHRoaXMudHlwZXMpKX1gKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmxlbmd0aCkge1xuICAgICAgZW5kcG9pbnQgKz0gYD8ke3BhcmFtcy5qb2luKCcmJyl9YDtcbiAgICB9XG5cbiAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQ7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLWFjY291bnQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZUFjY291bnRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQWNjb3VudE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0NPTVBBTllfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlQ29tcGFueUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLWNvbXBhbnknLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bbXVsdGldPVwibXVsdGlcIlxuW3JlcGVhdF09XCJyZXBlYXRcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuW2VuZHBvaW50XT1cImVuZHBvaW50XCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsRm5dPVwibGFiZWxGblwiXG5bdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9DT01QQU5ZX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgZW5kcG9pbnQgPSAnY29tcGFuaWVzL29wdGlvbnMnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnQ29tcGFueSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0NvbXBhbnkgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBtdWx0aTogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXBlYXQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1jb21wYW55LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvbXBhbnlNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfQ09VTlRSWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtY291bnRyeScsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bbXVsdGldPVwibXVsdGlcIlxuW3JlcGVhdF09XCJyZXBlYXRcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuW29wdGlvbnNdPVwiKGNvdW50cmllcyQgfCBhc3luYylcIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bbGFiZWxGbl09XCJsYWJlbEZuXCJcblt2YWx1ZUZuXT1cInZhbHVlRm5cIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfQ09VTlRSWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGNvdW50cmllcyQ6IE9ic2VydmFibGU8YW55PjtcblxuICBASW5wdXQoKSBsYW5nOiAnZW4nIHwgJ3B0LWJyJyA9ICdlbic7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdDb3VudHJ5IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnQ291bnRyeSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcGVhdDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY291bnRyaWVzJCA9IG9mKEZBS0VfREFUQSk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgbGFiZWxGbiA9IChpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLm5hbWUgOiBpdGVtO1xuICB9XG5cbiAgdmFsdWVGbiA9IChpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmNvZGUgOiBpdGVtO1xuICB9XG5cbn1cblxuY29uc3QgRkFLRV9EQVRBID0gW3sgJ2NvZGUnOiAnQUQnLCAnbmFtZSc6ICdBbmRvcnJhJyB9LCB7ICdjb2RlJzogJ0FFJywgJ25hbWUnOiAnVW5pdGVkIEFyYWIgRW1pcmF0ZXMnIH0sIHsgJ2NvZGUnOiAnQUYnLCAnbmFtZSc6ICdBZmdoYW5pc3RhbicgfSwgeyAnY29kZSc6ICdBRycsICduYW1lJzogJ0FudGlndWEgYW5kIEJhcmJ1ZGEnIH0sIHsgJ2NvZGUnOiAnQUknLCAnbmFtZSc6ICdBbmd1aWxsYScgfSwgeyAnY29kZSc6ICdBTCcsICduYW1lJzogJ0FsYmFuaWEnIH0sIHsgJ2NvZGUnOiAnQU0nLCAnbmFtZSc6ICdBcm1lbmlhJyB9LCB7ICdjb2RlJzogJ0FOJywgJ25hbWUnOiAnTmV0aGVybGFuZHMgQW50aWxsZXMnIH0sIHsgJ2NvZGUnOiAnQU8nLCAnbmFtZSc6ICdBbmdvbGEnIH0sIHsgJ2NvZGUnOiAnQVEnLCAnbmFtZSc6ICdBbnRhcmN0aWNhJyB9LCB7ICdjb2RlJzogJ0FSJywgJ25hbWUnOiAnQXJnZW50aW5hJyB9LCB7ICdjb2RlJzogJ0FTJywgJ25hbWUnOiAnQW1lcmljYW4gU2Ftb2EnIH0sIHsgJ2NvZGUnOiAnQVQnLCAnbmFtZSc6ICdBdXN0cmlhJyB9LCB7ICdjb2RlJzogJ0FVJywgJ25hbWUnOiAnQXVzdHJhbGlhJyB9LCB7ICdjb2RlJzogJ0FXJywgJ25hbWUnOiAnQXJ1YmEnIH0sIHsgJ2NvZGUnOiAnQVgnLCAnbmFtZSc6ICfDg8KFbGFuZCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0FaJywgJ25hbWUnOiAnQXplcmJhaWphbicgfSwgeyAnY29kZSc6ICdCQScsICduYW1lJzogJ0Jvc25pYSBhbmQgSGVyemVnb3ZpbmEnIH0sIHsgJ2NvZGUnOiAnQkInLCAnbmFtZSc6ICdCYXJiYWRvcycgfSwgeyAnY29kZSc6ICdCRCcsICduYW1lJzogJ0JhbmdsYWRlc2gnIH0sIHsgJ2NvZGUnOiAnQkUnLCAnbmFtZSc6ICdCZWxnaXVtJyB9LCB7ICdjb2RlJzogJ0JGJywgJ25hbWUnOiAnQnVya2luYSBGYXNvJyB9LCB7ICdjb2RlJzogJ0JHJywgJ25hbWUnOiAnQnVsZ2FyaWEnIH0sIHsgJ2NvZGUnOiAnQkgnLCAnbmFtZSc6ICdCYWhyYWluJyB9LCB7ICdjb2RlJzogJ0JJJywgJ25hbWUnOiAnQnVydW5kaScgfSwgeyAnY29kZSc6ICdCSicsICduYW1lJzogJ0JlbmluJyB9LCB7ICdjb2RlJzogJ0JMJywgJ25hbWUnOiAnU2FpbnQgQmFydGjDg8KpbGVteScgfSwgeyAnY29kZSc6ICdCTScsICduYW1lJzogJ0Jlcm11ZGEnIH0sIHsgJ2NvZGUnOiAnQk4nLCAnbmFtZSc6ICdCcnVuZWknIH0sIHsgJ2NvZGUnOiAnQk8nLCAnbmFtZSc6ICdCb2xpdmlhJyB9LCB7ICdjb2RlJzogJ0JRJywgJ25hbWUnOiAnQm9uYWlyZSwgU2ludCBFdXN0YXRpdXMgYW5kIFNhYmEnIH0sIHsgJ2NvZGUnOiAnQlInLCAnbmFtZSc6ICdCcmF6aWwnIH0sIHsgJ2NvZGUnOiAnQlMnLCAnbmFtZSc6ICdCYWhhbWFzJyB9LCB7ICdjb2RlJzogJ0JUJywgJ25hbWUnOiAnQmh1dGFuJyB9LCB7ICdjb2RlJzogJ0JWJywgJ25hbWUnOiAnQm91dmV0IElzbGFuZCcgfSwgeyAnY29kZSc6ICdCVycsICduYW1lJzogJ0JvdHN3YW5hJyB9LCB7ICdjb2RlJzogJ0JZJywgJ25hbWUnOiAnQmVsYXJ1cycgfSwgeyAnY29kZSc6ICdCWicsICduYW1lJzogJ0JlbGl6ZScgfSwgeyAnY29kZSc6ICdDQScsICduYW1lJzogJ0NhbmFkYScgfSwgeyAnY29kZSc6ICdDQycsICduYW1lJzogJ0NvY29zIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnQ0QnLCAnbmFtZSc6ICdUaGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBPZiBDb25nbycgfSwgeyAnY29kZSc6ICdDRicsICduYW1lJzogJ0NlbnRyYWwgQWZyaWNhbiBSZXB1YmxpYycgfSwgeyAnY29kZSc6ICdDRycsICduYW1lJzogJ0NvbmdvJyB9LCB7ICdjb2RlJzogJ0NIJywgJ25hbWUnOiAnU3dpdHplcmxhbmQnIH0sIHsgJ2NvZGUnOiAnQ0knLCAnbmFtZSc6ICdDw4PCtHRlIGRcXCdJdm9pcmUnIH0sIHsgJ2NvZGUnOiAnQ0snLCAnbmFtZSc6ICdDb29rIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnQ0wnLCAnbmFtZSc6ICdDaGlsZScgfSwgeyAnY29kZSc6ICdDTScsICduYW1lJzogJ0NhbWVyb29uJyB9LCB7ICdjb2RlJzogJ0NOJywgJ25hbWUnOiAnQ2hpbmEnIH0sIHsgJ2NvZGUnOiAnQ08nLCAnbmFtZSc6ICdDb2xvbWJpYScgfSwgeyAnY29kZSc6ICdDUicsICduYW1lJzogJ0Nvc3RhIFJpY2EnIH0sIHsgJ2NvZGUnOiAnQ1UnLCAnbmFtZSc6ICdDdWJhJyB9LCB7ICdjb2RlJzogJ0NWJywgJ25hbWUnOiAnQ2FwZSBWZXJkZScgfSwgeyAnY29kZSc6ICdDVycsICduYW1lJzogJ0N1cmHDg8KnYW8nIH0sIHsgJ2NvZGUnOiAnQ1gnLCAnbmFtZSc6ICdDaHJpc3RtYXMgSXNsYW5kJyB9LCB7ICdjb2RlJzogJ0NZJywgJ25hbWUnOiAnQ3lwcnVzJyB9LCB7ICdjb2RlJzogJ0NaJywgJ25hbWUnOiAnQ3plY2ggUmVwdWJsaWMnIH0sIHsgJ2NvZGUnOiAnREUnLCAnbmFtZSc6ICdHZXJtYW55JyB9LCB7ICdjb2RlJzogJ0RKJywgJ25hbWUnOiAnRGppYm91dGknIH0sIHsgJ2NvZGUnOiAnREsnLCAnbmFtZSc6ICdEZW5tYXJrJyB9LCB7ICdjb2RlJzogJ0RNJywgJ25hbWUnOiAnRG9taW5pY2EnIH0sIHsgJ2NvZGUnOiAnRE8nLCAnbmFtZSc6ICdEb21pbmljYW4gUmVwdWJsaWMnIH0sIHsgJ2NvZGUnOiAnRFonLCAnbmFtZSc6ICdBbGdlcmlhJyB9LCB7ICdjb2RlJzogJ0VDJywgJ25hbWUnOiAnRWN1YWRvcicgfSwgeyAnY29kZSc6ICdFRScsICduYW1lJzogJ0VzdG9uaWEnIH0sIHsgJ2NvZGUnOiAnRUcnLCAnbmFtZSc6ICdFZ3lwdCcgfSwgeyAnY29kZSc6ICdFSCcsICduYW1lJzogJ1dlc3Rlcm4gU2FoYXJhJyB9LCB7ICdjb2RlJzogJ0VSJywgJ25hbWUnOiAnRXJpdHJlYScgfSwgeyAnY29kZSc6ICdFUycsICduYW1lJzogJ1NwYWluJyB9LCB7ICdjb2RlJzogJ0VUJywgJ25hbWUnOiAnRXRoaW9waWEnIH0sIHsgJ2NvZGUnOiAnRkknLCAnbmFtZSc6ICdGaW5sYW5kJyB9LCB7ICdjb2RlJzogJ0ZKJywgJ25hbWUnOiAnRmlqaScgfSwgeyAnY29kZSc6ICdGSycsICduYW1lJzogJ0ZhbGtsYW5kIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnRk0nLCAnbmFtZSc6ICdNaWNyb25lc2lhJyB9LCB7ICdjb2RlJzogJ0ZPJywgJ25hbWUnOiAnRmFyb2UgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdGUicsICduYW1lJzogJ0ZyYW5jZScgfSwgeyAnY29kZSc6ICdHQScsICduYW1lJzogJ0dhYm9uJyB9LCB7ICdjb2RlJzogJ0dCJywgJ25hbWUnOiAnVW5pdGVkIEtpbmdkb20nIH0sIHsgJ2NvZGUnOiAnR0QnLCAnbmFtZSc6ICdHcmVuYWRhJyB9LCB7ICdjb2RlJzogJ0dFJywgJ25hbWUnOiAnR2VvcmdpYScgfSwgeyAnY29kZSc6ICdHRicsICduYW1lJzogJ0ZyZW5jaCBHdWlhbmEnIH0sIHsgJ2NvZGUnOiAnR0cnLCAnbmFtZSc6ICdHdWVybnNleScgfSwgeyAnY29kZSc6ICdHSCcsICduYW1lJzogJ0doYW5hJyB9LCB7ICdjb2RlJzogJ0dJJywgJ25hbWUnOiAnR2licmFsdGFyJyB9LCB7ICdjb2RlJzogJ0dMJywgJ25hbWUnOiAnR3JlZW5sYW5kJyB9LCB7ICdjb2RlJzogJ0dNJywgJ25hbWUnOiAnR2FtYmlhJyB9LCB7ICdjb2RlJzogJ0dOJywgJ25hbWUnOiAnR3VpbmVhJyB9LCB7ICdjb2RlJzogJ0dQJywgJ25hbWUnOiAnR3VhZGVsb3VwZScgfSwgeyAnY29kZSc6ICdHUScsICduYW1lJzogJ0VxdWF0b3JpYWwgR3VpbmVhJyB9LCB7ICdjb2RlJzogJ0dSJywgJ25hbWUnOiAnR3JlZWNlJyB9LCB7ICdjb2RlJzogJ0dTJywgJ25hbWUnOiAnU291dGggR2VvcmdpYSBBbmQgVGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnR1QnLCAnbmFtZSc6ICdHdWF0ZW1hbGEnIH0sIHsgJ2NvZGUnOiAnR1UnLCAnbmFtZSc6ICdHdWFtJyB9LCB7ICdjb2RlJzogJ0dXJywgJ25hbWUnOiAnR3VpbmVhLUJpc3NhdScgfSwgeyAnY29kZSc6ICdHWScsICduYW1lJzogJ0d1eWFuYScgfSwgeyAnY29kZSc6ICdISycsICduYW1lJzogJ0hvbmcgS29uZycgfSwgeyAnY29kZSc6ICdITScsICduYW1lJzogJ0hlYXJkIElzbGFuZCBBbmQgTWNEb25hbGQgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdITicsICduYW1lJzogJ0hvbmR1cmFzJyB9LCB7ICdjb2RlJzogJ0hSJywgJ25hbWUnOiAnQ3JvYXRpYScgfSwgeyAnY29kZSc6ICdIVCcsICduYW1lJzogJ0hhaXRpJyB9LCB7ICdjb2RlJzogJ0hVJywgJ25hbWUnOiAnSHVuZ2FyeScgfSwgeyAnY29kZSc6ICdJRCcsICduYW1lJzogJ0luZG9uZXNpYScgfSwgeyAnY29kZSc6ICdJRScsICduYW1lJzogJ0lyZWxhbmQnIH0sIHsgJ2NvZGUnOiAnSUwnLCAnbmFtZSc6ICdJc3JhZWwnIH0sIHsgJ2NvZGUnOiAnSU0nLCAnbmFtZSc6ICdJc2xlIE9mIE1hbicgfSwgeyAnY29kZSc6ICdJTicsICduYW1lJzogJ0luZGlhJyB9LCB7ICdjb2RlJzogJ0lPJywgJ25hbWUnOiAnQnJpdGlzaCBJbmRpYW4gT2NlYW4gVGVycml0b3J5JyB9LCB7ICdjb2RlJzogJ0lRJywgJ25hbWUnOiAnSXJhcScgfSwgeyAnY29kZSc6ICdJUicsICduYW1lJzogJ0lyYW4nIH0sIHsgJ2NvZGUnOiAnSVMnLCAnbmFtZSc6ICdJY2VsYW5kJyB9LCB7ICdjb2RlJzogJ0lUJywgJ25hbWUnOiAnSXRhbHknIH0sIHsgJ2NvZGUnOiAnSkUnLCAnbmFtZSc6ICdKZXJzZXknIH0sIHsgJ2NvZGUnOiAnSk0nLCAnbmFtZSc6ICdKYW1haWNhJyB9LCB7ICdjb2RlJzogJ0pPJywgJ25hbWUnOiAnSm9yZGFuJyB9LCB7ICdjb2RlJzogJ0pQJywgJ25hbWUnOiAnSmFwYW4nIH0sIHsgJ2NvZGUnOiAnS0UnLCAnbmFtZSc6ICdLZW55YScgfSwgeyAnY29kZSc6ICdLRycsICduYW1lJzogJ0t5cmd5enN0YW4nIH0sIHsgJ2NvZGUnOiAnS0gnLCAnbmFtZSc6ICdDYW1ib2RpYScgfSwgeyAnY29kZSc6ICdLSScsICduYW1lJzogJ0tpcmliYXRpJyB9LCB7ICdjb2RlJzogJ0tNJywgJ25hbWUnOiAnQ29tb3JvcycgfSwgeyAnY29kZSc6ICdLTicsICduYW1lJzogJ1NhaW50IEtpdHRzIEFuZCBOZXZpcycgfSwgeyAnY29kZSc6ICdLUCcsICduYW1lJzogJ05vcnRoIEtvcmVhJyB9LCB7ICdjb2RlJzogJ0tSJywgJ25hbWUnOiAnU291dGggS29yZWEnIH0sIHsgJ2NvZGUnOiAnS1cnLCAnbmFtZSc6ICdLdXdhaXQnIH0sIHsgJ2NvZGUnOiAnS1knLCAnbmFtZSc6ICdDYXltYW4gSXNsYW5kcycgfSwgeyAnY29kZSc6ICdLWicsICduYW1lJzogJ0themFraHN0YW4nIH0sIHsgJ2NvZGUnOiAnTEEnLCAnbmFtZSc6ICdMYW9zJyB9LCB7ICdjb2RlJzogJ0xCJywgJ25hbWUnOiAnTGViYW5vbicgfSwgeyAnY29kZSc6ICdMQycsICduYW1lJzogJ1NhaW50IEx1Y2lhJyB9LCB7ICdjb2RlJzogJ0xJJywgJ25hbWUnOiAnTGllY2h0ZW5zdGVpbicgfSwgeyAnY29kZSc6ICdMSycsICduYW1lJzogJ1NyaSBMYW5rYScgfSwgeyAnY29kZSc6ICdMUicsICduYW1lJzogJ0xpYmVyaWEnIH0sIHsgJ2NvZGUnOiAnTFMnLCAnbmFtZSc6ICdMZXNvdGhvJyB9LCB7ICdjb2RlJzogJ0xUJywgJ25hbWUnOiAnTGl0aHVhbmlhJyB9LCB7ICdjb2RlJzogJ0xVJywgJ25hbWUnOiAnTHV4ZW1ib3VyZycgfSwgeyAnY29kZSc6ICdMVicsICduYW1lJzogJ0xhdHZpYScgfSwgeyAnY29kZSc6ICdMWScsICduYW1lJzogJ0xpYnlhJyB9LCB7ICdjb2RlJzogJ01BJywgJ25hbWUnOiAnTW9yb2NjbycgfSwgeyAnY29kZSc6ICdNQycsICduYW1lJzogJ01vbmFjbycgfSwgeyAnY29kZSc6ICdNRCcsICduYW1lJzogJ01vbGRvdmEnIH0sIHsgJ2NvZGUnOiAnTUUnLCAnbmFtZSc6ICdNb250ZW5lZ3JvJyB9LCB7ICdjb2RlJzogJ01GJywgJ25hbWUnOiAnU2FpbnQgTWFydGluJyB9LCB7ICdjb2RlJzogJ01HJywgJ25hbWUnOiAnTWFkYWdhc2NhcicgfSwgeyAnY29kZSc6ICdNSCcsICduYW1lJzogJ01hcnNoYWxsIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnTUsnLCAnbmFtZSc6ICdNYWNlZG9uaWEnIH0sIHsgJ2NvZGUnOiAnTUwnLCAnbmFtZSc6ICdNYWxpJyB9LCB7ICdjb2RlJzogJ01NJywgJ25hbWUnOiAnTXlhbm1hcicgfSwgeyAnY29kZSc6ICdNTicsICduYW1lJzogJ01vbmdvbGlhJyB9LCB7ICdjb2RlJzogJ01PJywgJ25hbWUnOiAnTWFjYW8nIH0sIHsgJ2NvZGUnOiAnTVAnLCAnbmFtZSc6ICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnTVEnLCAnbmFtZSc6ICdNYXJ0aW5pcXVlJyB9LCB7ICdjb2RlJzogJ01SJywgJ25hbWUnOiAnTWF1cml0YW5pYScgfSwgeyAnY29kZSc6ICdNUycsICduYW1lJzogJ01vbnRzZXJyYXQnIH0sIHsgJ2NvZGUnOiAnTVQnLCAnbmFtZSc6ICdNYWx0YScgfSwgeyAnY29kZSc6ICdNVScsICduYW1lJzogJ01hdXJpdGl1cycgfSwgeyAnY29kZSc6ICdNVicsICduYW1lJzogJ01hbGRpdmVzJyB9LCB7ICdjb2RlJzogJ01XJywgJ25hbWUnOiAnTWFsYXdpJyB9LCB7ICdjb2RlJzogJ01YJywgJ25hbWUnOiAnTWV4aWNvJyB9LCB7ICdjb2RlJzogJ01ZJywgJ25hbWUnOiAnTWFsYXlzaWEnIH0sIHsgJ2NvZGUnOiAnTVonLCAnbmFtZSc6ICdNb3phbWJpcXVlJyB9LCB7ICdjb2RlJzogJ05BJywgJ25hbWUnOiAnTmFtaWJpYScgfSwgeyAnY29kZSc6ICdOQycsICduYW1lJzogJ05ldyBDYWxlZG9uaWEnIH0sIHsgJ2NvZGUnOiAnTkUnLCAnbmFtZSc6ICdOaWdlcicgfSwgeyAnY29kZSc6ICdORicsICduYW1lJzogJ05vcmZvbGsgSXNsYW5kJyB9LCB7ICdjb2RlJzogJ05HJywgJ25hbWUnOiAnTmlnZXJpYScgfSwgeyAnY29kZSc6ICdOSScsICduYW1lJzogJ05pY2FyYWd1YScgfSwgeyAnY29kZSc6ICdOTCcsICduYW1lJzogJ05ldGhlcmxhbmRzJyB9LCB7ICdjb2RlJzogJ05PJywgJ25hbWUnOiAnTm9yd2F5JyB9LCB7ICdjb2RlJzogJ05QJywgJ25hbWUnOiAnTmVwYWwnIH0sIHsgJ2NvZGUnOiAnTlInLCAnbmFtZSc6ICdOYXVydScgfSwgeyAnY29kZSc6ICdOVScsICduYW1lJzogJ05pdWUnIH0sIHsgJ2NvZGUnOiAnTlonLCAnbmFtZSc6ICdOZXcgWmVhbGFuZCcgfSwgeyAnY29kZSc6ICdPTScsICduYW1lJzogJ09tYW4nIH0sIHsgJ2NvZGUnOiAnUEEnLCAnbmFtZSc6ICdQYW5hbWEnIH0sIHsgJ2NvZGUnOiAnUEUnLCAnbmFtZSc6ICdQZXJ1JyB9LCB7ICdjb2RlJzogJ1BGJywgJ25hbWUnOiAnRnJlbmNoIFBvbHluZXNpYScgfSwgeyAnY29kZSc6ICdQRycsICduYW1lJzogJ1BhcHVhIE5ldyBHdWluZWEnIH0sIHsgJ2NvZGUnOiAnUEgnLCAnbmFtZSc6ICdQaGlsaXBwaW5lcycgfSwgeyAnY29kZSc6ICdQSycsICduYW1lJzogJ1Bha2lzdGFuJyB9LCB7ICdjb2RlJzogJ1BMJywgJ25hbWUnOiAnUG9sYW5kJyB9LCB7ICdjb2RlJzogJ1BNJywgJ25hbWUnOiAnU2FpbnQgUGllcnJlIEFuZCBNaXF1ZWxvbicgfSwgeyAnY29kZSc6ICdQTicsICduYW1lJzogJ1BpdGNhaXJuJyB9LCB7ICdjb2RlJzogJ1BSJywgJ25hbWUnOiAnUHVlcnRvIFJpY28nIH0sIHsgJ2NvZGUnOiAnUFMnLCAnbmFtZSc6ICdQYWxlc3RpbmUnIH0sIHsgJ2NvZGUnOiAnUFQnLCAnbmFtZSc6ICdQb3J0dWdhbCcgfSwgeyAnY29kZSc6ICdQVycsICduYW1lJzogJ1BhbGF1JyB9LCB7ICdjb2RlJzogJ1BZJywgJ25hbWUnOiAnUGFyYWd1YXknIH0sIHsgJ2NvZGUnOiAnUUEnLCAnbmFtZSc6ICdRYXRhcicgfSwgeyAnY29kZSc6ICdSRScsICduYW1lJzogJ1JldW5pb24nIH0sIHsgJ2NvZGUnOiAnUk8nLCAnbmFtZSc6ICdSb21hbmlhJyB9LCB7ICdjb2RlJzogJ1JTJywgJ25hbWUnOiAnU2VyYmlhJyB9LCB7ICdjb2RlJzogJ1JVJywgJ25hbWUnOiAnUnVzc2lhJyB9LCB7ICdjb2RlJzogJ1JXJywgJ25hbWUnOiAnUndhbmRhJyB9LCB7ICdjb2RlJzogJ1NBJywgJ25hbWUnOiAnU2F1ZGkgQXJhYmlhJyB9LCB7ICdjb2RlJzogJ1NCJywgJ25hbWUnOiAnU29sb21vbiBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1NDJywgJ25hbWUnOiAnU2V5Y2hlbGxlcycgfSwgeyAnY29kZSc6ICdTRCcsICduYW1lJzogJ1N1ZGFuJyB9LCB7ICdjb2RlJzogJ1NFJywgJ25hbWUnOiAnU3dlZGVuJyB9LCB7ICdjb2RlJzogJ1NHJywgJ25hbWUnOiAnU2luZ2Fwb3JlJyB9LCB7ICdjb2RlJzogJ1NIJywgJ25hbWUnOiAnU2FpbnQgSGVsZW5hJyB9LCB7ICdjb2RlJzogJ1NJJywgJ25hbWUnOiAnU2xvdmVuaWEnIH0sIHsgJ2NvZGUnOiAnU0onLCAnbmFtZSc6ICdTdmFsYmFyZCBBbmQgSmFuIE1heWVuJyB9LCB7ICdjb2RlJzogJ1NLJywgJ25hbWUnOiAnU2xvdmFraWEnIH0sIHsgJ2NvZGUnOiAnU0wnLCAnbmFtZSc6ICdTaWVycmEgTGVvbmUnIH0sIHsgJ2NvZGUnOiAnU00nLCAnbmFtZSc6ICdTYW4gTWFyaW5vJyB9LCB7ICdjb2RlJzogJ1NOJywgJ25hbWUnOiAnU2VuZWdhbCcgfSwgeyAnY29kZSc6ICdTTycsICduYW1lJzogJ1NvbWFsaWEnIH0sIHsgJ2NvZGUnOiAnU1InLCAnbmFtZSc6ICdTdXJpbmFtZScgfSwgeyAnY29kZSc6ICdTUycsICduYW1lJzogJ1NvdXRoIFN1ZGFuJyB9LCB7ICdjb2RlJzogJ1NUJywgJ25hbWUnOiAnU2FvIFRvbWUgQW5kIFByaW5jaXBlJyB9LCB7ICdjb2RlJzogJ1NWJywgJ25hbWUnOiAnRWwgU2FsdmFkb3InIH0sIHsgJ2NvZGUnOiAnU1gnLCAnbmFtZSc6ICdTaW50IE1hYXJ0ZW4gKER1dGNoIHBhcnQpJyB9LCB7ICdjb2RlJzogJ1NZJywgJ25hbWUnOiAnU3lyaWEnIH0sIHsgJ2NvZGUnOiAnU1onLCAnbmFtZSc6ICdTd2F6aWxhbmQnIH0sIHsgJ2NvZGUnOiAnVEMnLCAnbmFtZSc6ICdUdXJrcyBBbmQgQ2FpY29zIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnVEQnLCAnbmFtZSc6ICdDaGFkJyB9LCB7ICdjb2RlJzogJ1RGJywgJ25hbWUnOiAnRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzJyB9LCB7ICdjb2RlJzogJ1RHJywgJ25hbWUnOiAnVG9nbycgfSwgeyAnY29kZSc6ICdUSCcsICduYW1lJzogJ1RoYWlsYW5kJyB9LCB7ICdjb2RlJzogJ1RKJywgJ25hbWUnOiAnVGFqaWtpc3RhbicgfSwgeyAnY29kZSc6ICdUSycsICduYW1lJzogJ1Rva2VsYXUnIH0sIHsgJ2NvZGUnOiAnVEwnLCAnbmFtZSc6ICdUaW1vci1MZXN0ZScgfSwgeyAnY29kZSc6ICdUTScsICduYW1lJzogJ1R1cmttZW5pc3RhbicgfSwgeyAnY29kZSc6ICdUTicsICduYW1lJzogJ1R1bmlzaWEnIH0sIHsgJ2NvZGUnOiAnVE8nLCAnbmFtZSc6ICdUb25nYScgfSwgeyAnY29kZSc6ICdUUicsICduYW1lJzogJ1R1cmtleScgfSwgeyAnY29kZSc6ICdUVCcsICduYW1lJzogJ1RyaW5pZGFkIGFuZCBUb2JhZ28nIH0sIHsgJ2NvZGUnOiAnVFYnLCAnbmFtZSc6ICdUdXZhbHUnIH0sIHsgJ2NvZGUnOiAnVFcnLCAnbmFtZSc6ICdUYWl3YW4nIH0sIHsgJ2NvZGUnOiAnVFonLCAnbmFtZSc6ICdUYW56YW5pYScgfSwgeyAnY29kZSc6ICdVQScsICduYW1lJzogJ1VrcmFpbmUnIH0sIHsgJ2NvZGUnOiAnVUcnLCAnbmFtZSc6ICdVZ2FuZGEnIH0sIHsgJ2NvZGUnOiAnVU0nLCAnbmFtZSc6ICdVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnVVknLCAnbmFtZSc6ICdVcnVndWF5JyB9LCB7ICdjb2RlJzogJ1VaJywgJ25hbWUnOiAnVXpiZWtpc3RhbicgfSwgeyAnY29kZSc6ICdWQScsICduYW1lJzogJ1ZhdGljYW4nIH0sIHsgJ2NvZGUnOiAnVkMnLCAnbmFtZSc6ICdTYWludCBWaW5jZW50IEFuZCBUaGUgR3JlbmFkaW5lcycgfSwgeyAnY29kZSc6ICdWRScsICduYW1lJzogJ1ZlbmV6dWVsYScgfSwgeyAnY29kZSc6ICdWRycsICduYW1lJzogJ0JyaXRpc2ggVmlyZ2luIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnVkknLCAnbmFtZSc6ICdVLlMuIFZpcmdpbiBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1ZOJywgJ25hbWUnOiAnVmlldG5hbScgfSwgeyAnY29kZSc6ICdWVScsICduYW1lJzogJ1ZhbnVhdHUnIH0sIHsgJ2NvZGUnOiAnV0YnLCAnbmFtZSc6ICdXYWxsaXMgQW5kIEZ1dHVuYScgfSwgeyAnY29kZSc6ICdXUycsICduYW1lJzogJ1NhbW9hJyB9LCB7ICdjb2RlJzogJ1lFJywgJ25hbWUnOiAnWWVtZW4nIH0sIHsgJ2NvZGUnOiAnWVQnLCAnbmFtZSc6ICdNYXlvdHRlJyB9LCB7ICdjb2RlJzogJ1pBJywgJ25hbWUnOiAnU291dGggQWZyaWNhJyB9LCB7ICdjb2RlJzogJ1pNJywgJ25hbWUnOiAnWmFtYmlhJyB9LCB7ICdjb2RlJzogJ1pXJywgJ25hbWUnOiAnWmltYmFid2UnIH1dO1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlQ291bnRyeUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLWNvdW50cnkuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlQ291bnRyeUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ291bnRyeU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBCQVNFX0VORFBPSU5UID0gJ2NvbXBhbmllcy8ke2NvbXBhbnlJZH0vZGVwYXJ0bWVudHMvb3B0aW9ucyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0RFUEFSVE1FTlRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJlbmRwb2ludCBlbHNlIGZha2VEaXNhYmxlZFwiPlxuICA8ZGVjLWF1dG9jb21wbGV0ZVxuICBbZGlzYWJsZWRdPVwiIWNvbXBhbnlJZCB8fCBkaXNhYmxlZFwiXG4gIFtlbmRwb2ludF09XCJlbmRwb2ludFwiXG4gIFtsYWJlbEF0dHJdPVwibGFiZWxBdHRyXCJcbiAgW25hbWVdPVwibmFtZVwiXG4gIFttdWx0aV09XCJtdWx0aVwiXG4gIFtyZXBlYXRdPVwicmVwZWF0XCJcbiAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuICBbKG5nTW9kZWwpXT1cInZhbHVlXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4gIChibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZmFrZURpc2FibGVkPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9ERVBBUlRNRU5UX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgZW5kcG9pbnQ6IHN0cmluZztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjb21wYW55SWQodjogc3RyaW5nKSB7XG4gICAgdGhpcy5fY29tcGFueUlkID0gdjtcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uY29tcGFueUlkKCk7XG4gIH1cblxuICBnZXQgY29tcGFueUlkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wYW55SWQ7XG4gIH1cblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0RlcGFydG1lbnQgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdEZXBhcnRtZW50IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgbXVsdGk6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVwZWF0OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF9jb21wYW55SWQ6IHN0cmluZztcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0RW5kcG9pbnRCYXNlZE9uY29tcGFueUlkKCkge1xuICAgIHRoaXMuZW5kcG9pbnQgPSAhdGhpcy5jb21wYW55SWQgPyB1bmRlZmluZWQgOiBCQVNFX0VORFBPSU5ULnJlcGxhY2UoJyR7Y29tcGFueUlkfScsIHRoaXMuY29tcGFueUlkKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtcm9sZScsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bbXVsdGldPVwibXVsdGlcIiBbcmVwZWF0XT1cInJlcGVhdFwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcbltlbmRwb2ludF09XCJlbmRwb2ludFwiXG5bbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG5bdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50ID0gJ3JvbGVzL29wdGlvbnMnO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KCkgdHlwZXM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUm9sZSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1JvbGUgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBtdWx0aTogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXBlYXQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZVxuICApIHt9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIC8vIGN1c3RvbUZldGNoRnVuY3Rpb24gPSAodGV4dFNlYXJjaCk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gIC8vICAgY29uc3Qgc2VhcmNoID0gdGV4dFNlYXJjaCA/IHsgdGV4dFNlYXJjaCB9IDogdW5kZWZpbmVkO1xuICAvLyAgIHJldHVybiB0aGlzLmRlY29yYUFwaS5nZXQodGhpcy5lbmRwb2ludCwgc2VhcmNoKVxuICAvLyAgIC5waXBlKFxuICAvLyAgICAgbWFwKHJvbGVzID0+IHtcbiAgLy8gICAgICAgcmV0dXJuIHJvbGVzLmZpbHRlcihyb2xlID0+IHtcbiAgLy8gICAgICAgICBjb25zdCByb2xlVHlwZSA9IChyb2xlICYmIHJvbGUua2V5KSA/IHJvbGUua2V5LnNwbGl0KCcuJylbMF0gOiB1bmRlZmluZWQ7XG4gIC8vICAgICAgICAgcmV0dXJuICF0aGlzLnR5cGVzID8gdHJ1ZSA6IHRoaXMudHlwZXMuaW5kZXhPZihyb2xlVHlwZSkgPj0gMDtcbiAgLy8gICAgICAgfSk7XG4gIC8vICAgICB9KVxuICAvLyAgICk7XG4gIC8vIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLXJvbGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVSb2xlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY29uc3QgQkFTRV9BVVRPQ09NUExFVEVfUFJPSkVDVF9FTkRQT0lOVCA9ICcvbGVnYWN5L3Byb2plY3Qvc2VhcmNoL2tleVZhbHVlJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfUFJPSkVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtcHJvamVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIihlbmRwb2ludCAmJiBjb21wYW55SWQpIGVsc2UgZmFrZURpc2FibGVkXCI+XG4gIDxkZWMtYXV0b2NvbXBsZXRlXG4gICNhdXRvY29tcGxldGVcbiAgW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbiAgW2xhYmVsRm5dPVwibGFiZWxGblwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbbXVsdGldPVwibXVsdGlcIlxuICBbcmVwZWF0XT1cInJlcGVhdFwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIFtjdXN0b21GZXRjaEZ1bmN0aW9uXT1cImN1c3RvbUZldGNoRnVuY3Rpb25cIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1BST0pFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDtcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgY29tcGFueUlkKHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9jb21wYW55SWQgIT09IHYpIHtcbiAgICAgIHRoaXMuX2NvbXBhbnlJZCA9IHY7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5lbmRwb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBlbnN1cmVzIGEgZGlnZXN0IGNpY2xlIGJlZm9yZSByZXNldGluZyB0aGUgZW5kcG9pbnRcbiAgICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjb21wYW55SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlJZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUHJvamVjdCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1Byb2plY3QgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBtdWx0aTogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXBlYXQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX2NvbXBhbnlJZDogc3RyaW5nO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSkgeyB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBzZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKSB7XG4gICAgaWYgKHRoaXMuY29tcGFueUlkKSB7XG4gICAgICB0aGlzLmVuZHBvaW50ID0gQkFTRV9BVVRPQ09NUExFVEVfUFJPSkVDVF9FTkRQT0lOVCArICc/Y29tcGFueUlkPScgKyB0aGlzLmNvbXBhbnlJZDtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY3VzdG9tRmV0Y2hGdW5jdGlvbiA9ICh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIHBhcmFtcy50ZXh0U2VhcmNoID0gdGV4dFNlYXJjaDtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbkNvbXBhbnlJZCgpO1xuICAgIHJldHVybiB0aGlzLmRlY29yYUFwaS5nZXQodGhpcy5lbmRwb2ludCwgcGFyYW1zKVxuICAgIC5waXBlKFxuICAgICAgbWFwKHByb2plY3RzID0+IHtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1wcm9qZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVByb2plY3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuY29uc3QgUVVPVEVfRU5EUE9JTlQgPSAnL3Byb2plY3RzLyR7cHJvamVjdElkfS9xdW90ZXMvb3B0aW9ucyc7XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9RVU9URV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXF1b3RlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZW5kcG9pbnQgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgW2Rpc2FibGVkXT1cIiFwcm9qZWN0SWQgfHwgZGlzYWJsZWRcIlxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbbXVsdGldPVwibXVsdGlcIlxuICBbcmVwZWF0XT1cInJlcGVhdFwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIChvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuICAoYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2Zha2VEaXNhYmxlZD5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbZGlzYWJsZWRdPVwidHJ1ZVwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCI+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUVVPVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgZW5kcG9pbnQ6IHN0cmluZztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUXVvdGUgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdRdW90ZSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcGVhdDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQElucHV0KClcbiAgc2V0IHByb2plY3RJZCh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wcm9qZWN0SWQgPSB2O1xuICAgIGlmICh0aGlzLnZpZXdJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgcHJvamVjdElkKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9qZWN0SWQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGVjb3JhUHJvZHVjdCh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kZWNvcmFQcm9kdWN0ID0gdjtcbiAgICBpZiAodGhpcy52aWV3SW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uSW5wdXRzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGRlY29yYVByb2R1Y3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlY29yYVByb2R1Y3Q7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGVjb3JhUHJvZHVjdFZhcmlhbnQodjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZGVjb3JhUHJvZHVjdFZhcmlhbnQgPSB2O1xuICAgIGlmICh0aGlzLnZpZXdJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZGVjb3JhUHJvZHVjdFZhcmlhbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlY29yYVByb2R1Y3RWYXJpYW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvamVjdElkOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfZGVjb3JhUHJvZHVjdDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2RlY29yYVByb2R1Y3RWYXJpYW50OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSB2aWV3SW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy52aWV3SW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uSW5wdXRzKCk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKSB7XG5cbiAgICBsZXQgZW5kcG9pbnQ7XG5cbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRoaXMucHJvamVjdElkKSB7XG5cbiAgICAgIGVuZHBvaW50ID0gUVVPVEVfRU5EUE9JTlQucmVwbGFjZSgnJHtwcm9qZWN0SWR9JywgdGhpcy5wcm9qZWN0SWQpO1xuXG4gICAgICBjb25zdCBwYXJhbXMgPSBbXTtcblxuICAgICAgaWYgKHRoaXMuZGVjb3JhUHJvZHVjdCkge1xuICAgICAgICBwYXJhbXMucHVzaChgcHJvZHVjdElkPSR7dGhpcy5kZWNvcmFQcm9kdWN0fWApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kZWNvcmFQcm9kdWN0VmFyaWFudCkge1xuICAgICAgICBwYXJhbXMucHVzaChgcHJvZHVjdFZhcmlhbnRJZD0ke3RoaXMuZGVjb3JhUHJvZHVjdFZhcmlhbnR9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubGVuZ3RoKSB7XG5cbiAgICAgICAgZW5kcG9pbnQgKz0gYD8ke3BhcmFtcy5qb2luKCcmJyl9YDtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5kcG9pbnQgIT09IGVuZHBvaW50KSB7XG5cblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcbiAgICAgIH0sIDApO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1xdW90ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0F1dG9jb21wbGV0ZVF1b3RlQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVF1b3RlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuY29uc3QgQVVUT0NPTVBMRVRFX1RBR1NfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlVGFnc0NvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXRhZ3MnLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlXG5bZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbltlbmRwb2ludF09XCJlbmRwb2ludFwiXG5bbXVsdGldPVwibXVsdGlcIlxuW3JlcGVhdF09XCJyZXBlYXRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4oZW50ZXJCdXR0b24pPVwiZW50ZXJCdXR0b24uZW1pdCgkZXZlbnQpXCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtgYF0sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9UQUdTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVRhZ3NDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgQElucHV0KClcbiAgc2V0IGVuZHBvaW50KHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5fZW5kcG9pbnQgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCBlbmRwb2ludCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZW5kcG9pbnQ7XG4gIH1cblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIF9lbmRwb2ludDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnVGFncyBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1RhZ3MgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBtdWx0aTogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXBlYXQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBlbnRlckJ1dHRvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIGxhYmVsRm4odGFncykge1xuICAgIHJldHVybiBgJHt0YWdzLnZhbHVlfSAjJHt0YWdzLmtleX1gO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVUYWdzQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtdGFncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlVGFnc0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlVGFnc0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVRhZ3NNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1icmVhZGNydW1iJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgY2xhc3M9XCJkZWMtYnJlYWRjcnVtYi13cmFwcGVyXCI+XG5cbiAgPGRpdiBmeEZsZXg+XG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgIDxoMT57e2ZlYXR1cmV9fTwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJicmVhZGNydW1iXCI+XG4gICAgICAgIHt7YnJlYWRjcnVtYn19XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXggZnhGbGV4QWxpZ249XCJjZW50ZXJcIiBmeExheW91dEFsaWduPVwiZW5kXCI+XG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiPlxuICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgIDwhLS0gQ09OVEVOVCAgLS0+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPCEtLSBCQUNLIEJVVFRPTiAtLT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJkZWZhdWx0XCIgKm5nSWY9XCJiYWNrQnV0dG9uUGF0aFwiIChjbGljayk9XCJnb0JhY2soKVwiPnt7IGJhY2tMYWJlbCB9fTwvYnV0dG9uPlxuICAgICAgICA8IS0tIEZPUldBUkQgQlVUVE9OIC0tPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cImRlZmF1bHRcIiAqbmdJZj1cImZvcndhcmRCdXR0b25cIiAoY2xpY2spPVwiZ29Gb3J3YXJkKClcIj57eyBmb3J3YXJkTGFiZWwgfX08L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1icmVhZGNydW1iLXdyYXBwZXJ7bWFyZ2luLWJvdHRvbTozMnB4fS5kZWMtYnJlYWRjcnVtYi13cmFwcGVyIGgxe2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjQwMDttYXJnaW4tdG9wOjRweDttYXJnaW4tYm90dG9tOjRweH0uZGVjLWJyZWFkY3J1bWItd3JhcHBlciAuYnJlYWRjcnVtYntjb2xvcjojYThhOGE4fWBdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNCcmVhZGNydW1iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBiYWNrQnV0dG9uUGF0aDogc3RyaW5nO1xuICBASW5wdXQoKSBicmVhZGNydW1iOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZlYXR1cmU6IHN0cmluZztcbiAgQElucHV0KCkgZm9yd2FyZEJ1dHRvbjogc3RyaW5nO1xuICBASW5wdXQoKSBpMThuRmVhdHVyZTogc3RyaW5nO1xuICBASW5wdXQoKSBpMThuQnJlYWRjcnVtYjogc3RyaW5nW107XG4gIEBJbnB1dCgpIGJhY2tMYWJlbCA9ICdCYWNrJztcbiAgQElucHV0KCkgZm9yd2FyZExhYmVsID0gJ0ZvcndhcmQnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgdHJhbnNsYXRvcjogVHJhbnNsYXRlU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50cmFuc2xhdGVGZWF0dXJlKCk7XG4gICAgdGhpcy50cmFuc2xhdGVQYXRocygpO1xuICAgIHRoaXMuZGV0ZWN0QW5kUGFyc2VCdXR0b25zQ29uZmlnKCk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdEFuZFBhcnNlQnV0dG9uc0NvbmZpZygpIHtcbiAgICB0aGlzLnBhcnNlQmFja0J1dHRvbigpO1xuICAgIHRoaXMucGFyc2VGb3J3YXJkQnV0dG9uKCk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQmFja0J1dHRvbigpIHtcbiAgICBpZiAodGhpcy5iYWNrQnV0dG9uUGF0aCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYmFja0J1dHRvblBhdGggIT09ICdmYWxzZScpIHtcbiAgICAgIHRoaXMuYmFja0J1dHRvblBhdGggPSB0aGlzLmJhY2tCdXR0b25QYXRoID8gdGhpcy5iYWNrQnV0dG9uUGF0aCA6ICcvJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBhcnNlRm9yd2FyZEJ1dHRvbigpIHtcbiAgICBpZiAodGhpcy5mb3J3YXJkQnV0dG9uICE9PSB1bmRlZmluZWQgJiYgdGhpcy5mb3J3YXJkQnV0dG9uICE9PSAnZmFsc2UnKSB7XG4gICAgICB0aGlzLmZvcndhcmRCdXR0b24gPSB0aGlzLmZvcndhcmRCdXR0b24gPyB0aGlzLmZvcndhcmRCdXR0b24gOiAnLyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2xhdGVGZWF0dXJlKCkge1xuICAgIGlmICh0aGlzLmkxOG5CcmVhZGNydW1iKSB7XG4gICAgICB0aGlzLmJyZWFkY3J1bWIgPSB0aGlzLmkxOG5CcmVhZGNydW1iLm1hcChwYXRoID0+IHRoaXMudHJhbnNsYXRvci5pbnN0YW50KHBhdGgpKS5qb2luKCcgLyAnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyYW5zbGF0ZVBhdGhzKCkge1xuICAgIGlmICh0aGlzLmkxOG5GZWF0dXJlKSB7XG4gICAgICB0aGlzLmZlYXR1cmUgPSB0aGlzLnRyYW5zbGF0b3IuaW5zdGFudCh0aGlzLmkxOG5GZWF0dXJlKTtcbiAgICB9XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gTmF2aWdhdGlvbiBNZXRob2RzIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKiAvL1xuXG4gIHB1YmxpYyBnb0JhY2soKSB7XG4gICAgaWYgKHRoaXMuYmFja0J1dHRvblBhdGgpIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmJhY2tCdXR0b25QYXRoXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ29Gb3J3YXJkKCkge1xuICAgIGlmICh0aGlzLmZvcndhcmRCdXR0b24pIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmZvcndhcmRCdXR0b25dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lmhpc3RvcnkuZm9yd2FyZCgpO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQW5ndWxhciBtb2R1bGVzXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGVjQnJlYWRjcnVtYkNvbXBvbmVudCB9IGZyb20gJy4vYnJlYWRjcnVtYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQnJlYWRjcnVtYkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQnJlYWRjcnVtYkNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0JyZWFkY3J1bWJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERpYWxvZ0FjdGlvbiB9IGZyb20gJy4vZGVjLWRpYWxvZy5tb2RlbHMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZGlhbG9nJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXRvb2xiYXIgY29sb3I9XCJwcmltYXJ5XCI+XG5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4RmxleEZpbGwgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJ1cHBlcmNhc2VcIiBtYXQtZGlhbG9nLWNsb3NlPlxuICAgICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGgxPiZuYnNwOyB7eyB0aXRsZSB9fTwvaDE+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBmeEZsZXg+XG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImFjdGlvbnNcIj5cbiAgICAgICAgICA8bWF0LW1lbnUgI2RlY0RpYWxvZ0FjdGlvbnNNZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGFjdGlvbnNcIiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJhY3Rpb24uY2FsbGJhY2soY29udGV4dClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L21hdC1tZW51PlxuXG4gICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cImRlY0RpYWxvZ0FjdGlvbnNNZW51XCI+XG4gICAgICAgICAgICA8bWF0LWljb24+bW9yZV92ZXJ0PC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjwvbWF0LXRvb2xiYXI+XG5cbjxkaXYgY2xhc3M9XCJkZWMtZGlhbG9nLWNoaWxkLXdyYXBwZXJcIj5cbiAgPHRlbXBsYXRlICNjaGlsZENvbnRhaW5lcj48L3RlbXBsYXRlPlxuPC9kaXY+XG5cbjxkZWMtc3Bpbm5lciAqbmdJZj1cIiFsb2FkZWRcIj48L2RlYy1zcGlubmVyPlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtZGlhbG9nLWNoaWxkLXdyYXBwZXJ7cGFkZGluZzozMnB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLy8gQ1VSUkVOVFxuICBjaGlsZENvbXBvbmVudFR5cGU6IENvbXBvbmVudFR5cGU8YW55PjtcblxuICBjaGlsZENvbXBvbmVudEluc3RhbmNlOiBhbnk7XG5cbiAgYWN0aW9uczogRGlhbG9nQWN0aW9uW10gPSBbXTtcblxuICB0aXRsZTogc3RyaW5nO1xuXG4gIGNvbnRleHQ6IGFueSA9IHt9O1xuXG4gIGxvYWRlZDogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKCdjaGlsZENvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBjaGlsZENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBAT3V0cHV0KCkgY2hpbGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZhY3RvcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGVjRGlhbG9nQ29tcG9uZW50PlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLmRpYWxvZ1JlZi5hZnRlck9wZW4oKVxuICAgIC50b1Byb21pc2UoKVxuICAgIC50aGVuKHRoaXMuZmFjdG9yeVRoZUNvbXBvbmVudCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZmFjdG9yeVRoZUNvbXBvbmVudCA9ICgpID0+IHtcblxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiA9IHRoaXMuZmFjdG9yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuY2hpbGRDb21wb25lbnRUeXBlKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gPSB0aGlzLmNoaWxkQ29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgIHRoaXMuY2hpbGRDb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcblxuICAgIHRoaXMuY2hpbGQuZW1pdCh0aGlzLmNoaWxkQ29tcG9uZW50SW5zdGFuY2UpO1xuXG4gICAgdGhpcy5jaGlsZC5jb21wbGV0ZSgpOyAvLyB1bnN1YnNyaWJlIHN1YnNjcmliZXJzXG5cbiAgICB0aGlzLmFwcGVuZENvbnRleHRUb0luc3RhbmNlKGNvbXBvbmVudFJlZi5pbnN0YW5jZSwgdGhpcy5jb250ZXh0KTtcblxuICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRDb250ZXh0VG9JbnN0YW5jZShpbnN0YW5jZTogYW55LCBjb250ZXh0OiBhbnkpIHtcblxuICAgIGlmIChpbnN0YW5jZSAmJiBjb250ZXh0KSB7XG5cbiAgICAgIE9iamVjdC5rZXlzKGNvbnRleHQpLmZvckVhY2goKGtleSkgPT4ge1xuXG4gICAgICAgIGluc3RhbmNlW2tleV0gPSB0aGlzLmNvbnRleHRba2V5XTtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc3Bpbm5lcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlY29yYS1sb2FkaW5nLXNwaW5uZXItd3JhcHBlclwiPlxuICA8ZGl2IGNsYXNzPVwiZGVjb3JhLWxvYWRpbmctc3Bpbm5lciB0cmFuc3BhcmVudEJnXCI+XG4gICAgPGRpdiBjbGFzcz1cImNlbnRlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhcFwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhhbGYtY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGFsZi1jaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtgLmRlY29yYS1sb2FkaW5nLXNwaW5uZXItd3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU3Bpbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zcGlubmVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjU3Bpbm5lckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNTcGlubmVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTcGlubmVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBEZWNEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2RlYy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE9wZW5Db25maWd1cmF0aW9uIH0gZnJvbSAnLi9kZWMtZGlhbG9nLm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNEaWFsb2dTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nXG4gICkgeyB9XG5cblxuICBvcGVuKGNoaWxkQ29tcG9uZW50OiBDb21wb25lbnRUeXBlPGFueT4sIGNvbmZpZzogT3BlbkNvbmZpZ3VyYXRpb24pIHtcblxuICAgIGNvbnN0IGRpYWxvZ0luc3RhbmNlOiBNYXREaWFsb2dSZWY8YW55PiA9IHRoaXMuZGlhbG9nLm9wZW4oXG4gICAgICBEZWNEaWFsb2dDb21wb25lbnQsXG4gICAgICB7XG4gICAgICAgIHdpZHRoOiBjb25maWcud2lkdGggfHwgJzEwMHZ3JyxcbiAgICAgICAgaGVpZ2h0OiBjb25maWcuaGVpZ3RoIHx8ICcxMDB2aCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdmdWxsLXNjcmVlbi1kaWFsb2cnXG4gICAgICB9XG4gICAgKTtcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLmNoaWxkQ29tcG9uZW50VHlwZSA9IGNoaWxkQ29tcG9uZW50O1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UuYWN0aW9ucyA9IGNvbmZpZy5hY3Rpb25zO1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSBjb25maWcudGl0bGU7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS5jb250ZXh0ID0gY29uZmlnLmNvbnRleHQ7XG5cbiAgICByZXR1cm4gZGlhbG9nSW5zdGFuY2U7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY1NwaW5uZXJNb2R1bGUgfSBmcm9tICcuLy4uL2RlYy1zcGlubmVyL2RlYy1zcGlubmVyLm1vZHVsZSc7XG5cbmltcG9ydCB7IERlY0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vZGVjLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjRGlhbG9nU2VydmljZSB9IGZyb20gJy4vZGVjLWRpYWxvZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgRGVjU3Bpbm5lck1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0RpYWxvZ0NvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0RlY0RpYWxvZ0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0RlY0RpYWxvZ1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNEaWFsb2dNb2R1bGUgeyB9XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vc2hlaWthbHRoYWYvbmd1LWNhcm91c2VsI2lucHV0LWludGVyZmFjZVxuXG5leHBvcnQgY29uc3QgQ2Fyb3VzZWxDb25maWcgPSB7XG4gIGdyaWQ6IHsgeHM6IDEsIHNtOiAyLCBtZDogMywgbGc6IDQsIGFsbDogMCB9LFxuICBzbGlkZTogMSxcbiAgc3BlZWQ6IDQwMCxcbiAgaW50ZXJ2YWw6IDQwMDAsXG4gIHBvaW50OiB7XG4gICAgdmlzaWJsZTogZmFsc2VcbiAgfSxcbiAgY3VzdG9tOiAnYmFubmVyJ1xufTtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcm91c2VsQ29uZmlnIH0gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxTdG9yZSB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwvc3JjL25ndS1jYXJvdXNlbC9uZ3UtY2Fyb3VzZWwuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWdhbGxlcnknLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtZ2FsbGVyeS13cmFwcGVyXCI+XG5cbiAgPGRpdiBjbGFzcz1cImltYWdlLWhpZ2hsaWdodGVkXCI+XG4gICAgICA8ZGVjLWltYWdlLXpvb21cbiAgICAgICAgW3NpemVdPVwie3dpZHRoOiA2MjAsIGhlaWdodDogNjIwfVwiXG4gICAgICAgIFtzeXN0ZW1GaWxlXT1cImltYWdlSGlnaGxpZ2h0XCI+XG4gICAgICA8L2RlYy1pbWFnZS16b29tPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodFwiICpuZ0lmPVwiaW1nRXh0ZXJuYWxMaW5rXCI+XG5cbiAgICA8YSBocmVmPVwie3sgaW1nRXh0ZXJuYWxMaW5rIH19XCIgdGFyZ2V0PVwiX2JsYW5rXCI+e3sgJ2xhYmVsLmltYWdlLWxpbmsnIHwgdHJhbnNsYXRlIH19PC9hPlxuXG4gIDwvZGl2PlxuXG4gIDxuZ3UtY2Fyb3VzZWwgY2xhc3M9XCJjYXJvdXNlbC13cmFwcGVyXCIgW2lucHV0c109XCJjYXJvdXNlbENvbmZpZ1wiIChpbml0RGF0YSk9XCJvbkluaXREYXRhRm4oJGV2ZW50KVwiIChvbk1vdmUpPVwib25Nb3ZlRm4oJGV2ZW50KVwiPlxuXG4gICAgPG5ndS1pdGVtIE5ndUNhcm91c2VsSXRlbSAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgaW1hZ2VzXCIgW2NsYXNzLmFjdGl2ZV09XCJpbWFnZSA9PSBpbWFnZUhpZ2hsaWdodFwiPlxuXG4gICAgICA8aW1nIFtkZWNJbWFnZV09XCJpbWFnZVwiIFtkZWNJbWFnZVNpemVdPVwie3dpZHRoOjMwMCwgaGVpZ2h0OjMwMH1cIiAoY2xpY2spPVwib25TZWxlY3RJbWFnZSgkZXZlbnQsaW1hZ2UpXCI+XG5cbiAgICA8L25ndS1pdGVtPlxuXG4gICAgPG1hdC1pY29uIE5ndUNhcm91c2VsUHJldiBjbGFzcz1cImxlZnQtcHJldmlvdXNcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXNGaXJzdH1cIj5jaGV2cm9uX2xlZnQ8L21hdC1pY29uPlxuXG4gICAgPG1hdC1pY29uIE5ndUNhcm91c2VsTmV4dCBjbGFzcz1cInJpZ2h0LW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXNMYXN0fVwiPmNoZXZyb25fcmlnaHQ8L21hdC1pY29uPlxuXG4gIDwvbmd1LWNhcm91c2VsPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLWdhbGxlcnktd3JhcHBlcnttYXgtd2lkdGg6NjI0cHg7b3ZlcmZsb3c6aGlkZGVufS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5pbWFnZS1oaWdobGlnaHRlZHtib3JkZXI6MnB4IHNvbGlkICNmNWY1ZjU7d2lkdGg6NjIwcHg7aGVpZ2h0OjYyMHB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIGF7Zm9udC1zaXplOjEwcHg7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y29sb3I6IzkyOTI5MjtjdXJzb3I6cG9pbnRlcn0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlcnttYXJnaW4tdG9wOjhweDtwYWRkaW5nOjAgMjRweDtoZWlnaHQ6MTI4cHh9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW17ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2hlaWdodDoxMjRweDtwYWRkaW5nOjJweDttYXJnaW4tcmlnaHQ6MnB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtLmFjdGl2ZSwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbTpob3ZlcntwYWRkaW5nOjA7Ym9yZGVyOjJweCBzb2xpZCAjMjMyZTM4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtIGltZ3ttYXgtd2lkdGg6MTI0cHg7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHR7ZGlzcGxheTpibG9jayFpbXBvcnRhbnQ7cG9zaXRpb246YWJzb2x1dGU7dG9wOmNhbGMoNTAlIC0gMTJweCk7Y3Vyc29yOnBvaW50ZXI7dGV4dC1zaGFkb3c6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXM6aG92ZXIsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQ6aG92ZXJ7dGV4dC1zaGFkb3c6MCAwIDZweCByZ2JhKDAsMCwwLC4yKX0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cy5kaXNhYmxlZCwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dC5kaXNhYmxlZHtvcGFjaXR5Oi40fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLmRpc2FibGVkOmhvdmVyLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0LmRpc2FibGVkOmhvdmVye3RleHQtc2hhZG93Om5vbmV9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXN7bGVmdDowfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0e3JpZ2h0OjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjR2FsbGVyeUNvbXBvbmVudCB7XG5cbiAgaW1hZ2VIaWdobGlnaHQ6IGFueTtcblxuICBhY3RpdmVJbWFnZTogRWxlbWVudDtcblxuICBpbWdFeHRlcm5hbExpbms6IHN0cmluZztcblxuICBpc0ZpcnN0OiBib29sZWFuO1xuXG4gIGlzTGFzdDogYm9vbGVhbjtcblxuICBjYXJvdXNlbENvbmZpZyA9IENhcm91c2VsQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBpbWFnZXModmFsdWU6IGFueVtdKSB7XG5cbiAgICB2YWx1ZSA9IHZhbHVlIHx8IG5ldyBBcnJheTxhbnk+KCk7XG5cbiAgICBpZiAodmFsdWUgJiYgKEpTT04uc3RyaW5naWZ5KHZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5faW1hZ2VzKSkpIHtcblxuICAgICAgdGhpcy5pbWFnZUhpZ2hsaWdodCA9IHZhbHVlWzBdO1xuXG4gICAgICB0aGlzLl9pbWFnZXMgPSB2YWx1ZTtcblxuICAgICAgdGhpcy5zZXRFeHRlcm5hbExpbmsoKTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGltYWdlcygpOiBhbnlbXSB7XG5cbiAgICByZXR1cm4gdGhpcy5faW1hZ2VzO1xuXG4gIH1cblxuICBwcml2YXRlIF9pbWFnZXM6IGFueVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBvblNlbGVjdEltYWdlID0gKCRldmVudCwgc3lzRmlsZSkgPT4ge1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlSW1hZ2UgJiYgdGhpcy5hY3RpdmVJbWFnZSAhPT0gJGV2ZW50LnRhcmdldCkge1xuXG4gICAgICB0aGlzLmFjdGl2ZUltYWdlLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgfVxuXG4gICAgJGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPSAnYWN0aXZlJztcblxuICAgIHRoaXMuYWN0aXZlSW1hZ2UgPSAkZXZlbnQudGFyZ2V0O1xuXG4gICAgdGhpcy5pbWFnZUhpZ2hsaWdodCA9IHN5c0ZpbGU7XG5cbiAgICB0aGlzLnNldEV4dGVybmFsTGluaygpO1xuXG4gIH1cblxuICBzZXRFeHRlcm5hbExpbmsgPSAoKSA9PiB7XG5cbiAgICBpZiAodGhpcy5pbWFnZUhpZ2hsaWdodCkge1xuXG4gICAgICB0aGlzLmltZ0V4dGVybmFsTGluayA9IHRoaXMuaW1hZ2VIaWdobGlnaHQuZmlsZVVybDtcblxuICAgIH1cblxuICB9XG5cbiAgb25Jbml0RGF0YUZuKGV2ZW50OiBOZ3VDYXJvdXNlbFN0b3JlKSB7XG5cbiAgICB0aGlzLnNldFByZXZOZXh0Q2hlY2tlcnMoZXZlbnQuaXNGaXJzdCwgZXZlbnQuaXRlbXMgPj0gdGhpcy5pbWFnZXMubGVuZ3RoKTtcblxuICB9XG5cbiAgb25Nb3ZlRm4oZXZlbnQ6IE5ndUNhcm91c2VsU3RvcmUpIHtcblxuICAgIHRoaXMuc2V0UHJldk5leHRDaGVja2VycyhldmVudC5pc0ZpcnN0LCBldmVudC5pc0xhc3QpO1xuXG4gIH1cblxuICBzZXRQcmV2TmV4dENoZWNrZXJzKGZpcnN0OiBib29sZWFuLCBsYXN0OiBib29sZWFuKSB7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5pc0ZpcnN0ID0gZmlyc3Q7XG5cbiAgICAgIHRoaXMuaXNMYXN0ID0gbGFzdDtcblxuICAgIH0sIDApO1xuXG4gIH1cblxufVxuIiwiZXhwb3J0IGNvbnN0IFRodW1ib3JTZXJ2ZXJIb3N0ID0gJ2h0dHBzOi8vY2FjaGUtdGh1bWJzLmRlY29yYWNvbnRlbnQuY29tL3Vuc2FmZSc7XG5cbmV4cG9ydCBjb25zdCBTM0hvc3QgPSAnaHR0cDovL3MzLmFtYXpvbmF3cy5jb20vZGVjb3JhLXBsYXRmb3JtLTEtbnYnO1xuXG5leHBvcnQgY29uc3QgVHJhbnNwYXJlbnRJbWFnZSA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVFBQUFDMUhBd0NBQUFBQW1KTFIwUUEvNGVQekw4QUFBXG5BSmNFaFpjd0FBQ3hNQUFBc1RBUUNhbkJnQUFBQUxTVVJCVkFqWFkyQmdBQUFBQXdBQklOV1V4d0FBQUFCSlJVNUVya0pnZ2c9PWA7XG5cbmV4cG9ydCBjb25zdCBFcnJvckltYWdlID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBTUFBQUQwNEpINUFBQUFzVkJNVkVVQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBXG5BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVxuQUFBQUFBQUFBazJ3TFNBQUFBT25SU1RsTUFBNFVVQlFnTUVQU0tLK2phR3hjZjk1MHljazg2TmkrbWdiOVhKaU95UlBEczNxS1daMHJLclh4Mys4NWpRVDI0WGVQWDA4VnRhcEdhRUM1Uk53QUFCMTVKUkVGVWVOcnRtMmR6MnpBTWhrbHIyYklsNzVGNDFYRzg0cGxsMS96L1A2eVhWallFa2lLXG5wa2Q3MXJzK25uaU1kSWVJRkNFQXErYzkvL3BNVjJ3djgzbUc1bkI1NmZ1RGE1QzlDZytubVZHYVlINmVYYVVESjl4TU9KeXlaeVRBazMwbHdyaklkczgyWWZBL3VCVmJYMkhEeFNPR001eXdOazM2eGV1aDlzTFM4SDRzelliUmlTWlRMTEpGYXF5RGRTMlQvOWp4c2hWSHdVOXV4eHNmOVhHTEtcblkxaEEwTDh3am8vRnlKYXIxRzhMTW4ydzgycnZpU0YySFplbzhEbzdocWoyY3ozK0E4NTJaOHNrV1d5d00wclp4ZWdpOGEwT3B0dHBMOStRR0MyU0RiOGMzL3RXcWdmcDFoaXdQWkFzTE9JUGtUNm9sM0h6MnhuY1VHTEFKWXVXN2JpQW5rbGFyckZvenVyRElPYUhOVTBuL3pYY3VzOFJSYVhZWVxuNlN5QUpMZmJKenZFR2xrc3FCNXYrdms1RTNrNElZSk1RWFUwOHgvb2puZ3pXdnErSHNnUmZBTTBVaE1hRUgwa1dLb3NCc21HY205SjVBWFVoVGcwNEJvdWVmL0NnRUs4MExOTVRhMlNZcGtZcG9TKy9mRGh4YmJSOTNMaEpiNnV1cXQxbk9MTHVvYnQ4eG1Hem5BSjBycSs1L05pUGtYemViUGZWXG4xelFOOExGTlhwWVJhQTFpZVQ4V2xwMUtXUGhNZGIybFpYNlZzbVp6dFd1dmZqWnFnK0JWVWNuVGZsbEIybDM3UTZyRUg1MmFHYW1KYnpiT1NFbWxvbTBVWDlwSjFrS3BRU3A3Y1k2eElwN3d4eEN1UUtZQW8wMFROVmJvRXZicWdzR1J5Wmlpa0JGRTd1SzdJbG9pMXU2WUdwV0dvS3BOdnV5c1JcbjkweC9XZGFkSUE4RE5WbklaMGczWHlpYjdrTU1Gb0lJekVhaEdHMkFUTWw3aEpudXNOY0M0NHFCUkVxbUtXUUpWVFYzY1p6ZGphdHd6RlJjclRoQjRmRDVwUnhjS0o4ZHREQkJHbGc0YkNXcDBIbGdhZnB5eGprTW90NlFlMkVIQzJTU3BNVnluTTZFdWk4UVp3VmpSMVhIUmUzZ3c5dFNEbExGalxuS2RpaVFjMWVIZ2VkNkdkWE5aMTZoR2NCa1JoUWsvbUFpKzlCOUpTOGFBK2NHcjM3WDE0YnpCU2MrNStpYnBVZ3RtTG5JRmZqeHNtZ3hxWkU3bHM4VzFLY0pmWUxWdU1ydmQ4MVlHWlVaWFd2Sjh2UkRsbzVRWTF2b0ViTGM4UFJzakpqR2xDekdQM1drK1RoR1k3TUE2U3BUMXo5OFdsa1BEQTNnXG5FU256UUpwVU5hTU1MWWF3eDdoZ2VIY0k1aGdwVGNBTHpZZ01kNWt3NURmVjNtZ3hqSldvODBuV1ZNRDlwRW40MUtYdVlWRUxUcklIdWZHeHBEeUoxMGkwcEtHaXJvSUpBYXdCc2pldldKeEg3QUpTek1ENm1MU3M2UjVFQlk2Z3FzZldaeVZ6NTlvY3FReEg0bzIyZGdBWUFjTHRiQWFCMGlOT3hcbk1EYlBGRTl1RTZiQUN3Qm5zN25Cb2RmY21NazZ1WTlWbzZBN0FhYlJBOEp4THkwOEFBSWpaSVhZMEJvaHBoa0NlSXhOaUFubUJBUTJrQVhtak1xWEdNUkdKa1FOZDhCNEJkQ0F2VmRDSXgzNEVlcElZWTJycDdpWHVJaWdzaU1SRmhTNHdDVzIvQUdBWFVPVkVrei9vdzlNVTg0T2dOZ0ZJT0Z0S1xucmtjak80N3FZQ1MyOUFSN2hDRTVZSktQN1RuZWYxSm5Razlpa055Q0k3dmlBRGV4emFyVHVKblIrcU00Q1J4a1lvZ0c0c1M2elNZZ1hBa29PTHhMcElFUmZEOGdZUm4vY29GR1NnOVc0WGRoWUpMSTJ1Q1lwVXVaNkE1cklrUXQ2TndFbjRkbVNnaG81QSthUzh1c1NkVkY2QXhvVWJvRnBsdVFsXG45OGNvSmhJU3B3emJyYTZLTlZPZ2E3U1RzWTROVDVrbUtLZ0V4YmRrcldGZmI4QkpHR21jUXFqS1pqZzNPb3BwcENYcmpGNzBCakRZV20venRkNnM3Y0k5ZElIVnVLZUU1d1Y4S2Fyd3pjQ0E5L2lkam1jVGpNZXBjWm93Q0JqSXUyTkxid0FyRVRVQnA4YVdOQTkyNVBPQlY1VUJrQXMwK0I5WU5cbm5VQ0RLRWtsVzFNVFdNQW1Da3loSVY0TmY0RU5VYTJWUlV6SXIwQnJDSnFpMWErWnF2UVNPM3hVSDlCOFZhL0pFM0pOa1lHc0tjV3YrdlJpUVF6S2FlQ1IwVlQxTUFGU1hQQ2hnTUdLUG5zd2k3US9pTXN0QVJoclhINCtJVFFNb1FieDBKUXAzYjROQmoyQXl2d08vTXRTNWowOXprMWhyMWtGYlxubkNSSWxsNWpHNDc4MnlpbzhTYUFJRjFueFJ3SEx3N01JMGE4c0VCb3IzQmVDZUJzdERHNHFGa3JLMEJkNjVrZnVLNWFJOHRMRWFnUldSY3VUZWJWNVlIbkNzam5hNHJwTkMzL0Y3YzRzQnVkVklqbFcwQVZMNm5JdmFMRDlYYUpjcWNLRHIzcHpXNko4dHViTGN3RmRVOWtyL01Vc0lKeTYwbWZtXG5BT2Y4R2VodURGOHpUZTVKZFBKUWlLbDlFL3piODdXSFJwL3hyMGJiUjl3T05rQlNMVmI2RkJsV1hFdWhqaitKdzNrSGdha3JveTZ1aW9CUGpUM1BvM2RSNWdlcy8zdzl4QTJjMTduVlVZZXVYV0pwUFU0Nktyd0h5ZmhyckV4UE82TlRNRGYxcFdFNERjTWNwZnl6WWNCSnVpQ2tEZUQyVE54OTRcbk8vQm9scWhoMnluSlEvOEg4bWNXQzlqVktlVEQ5RUhLV3dkd2EzVkVzaEhzWW85QjBsTEJuWlVHM2Z2R0RVblBLM28vUk5LeW5LRjJOZ3V0QmdPcXkxUm5RKytkQWVXc1ByUlFYek1iMnFZQ210WlFFK2RtVHlJUFhGTThvZ1ptdDh1NEpDTjVHRDF4bGZhaXJsNTkrTUVRdFhyZVRONFdpcnhLVjFcbjdWdWExTmxYRmNLTW1OTjJFaXAvYlNEeDJiZm1FNzN2aHdYa3ZxMTdWWDJQOHp5c0xuaUJTRy81bCtlWjhVeW5qQTB0Q3NrOEp4WDU5TW05SlhoM3dQNFVWdnc5czVJTitKTjcyV2s5dXdlY2NpZndHM3YyL1crQWVmNzFzZStadFF4NnI3dmU3eDJQUHJsa1ArOCsveUN6R2k3YUZ6cFBVdEFBQUFBRWxGVGtTdVFtQ0NgO1xuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNJbWFnZVNpemUsIFN5c3RlbUZpbGVLZXkgfSBmcm9tICcuL2ltYWdlLmRpcmVjdGl2ZS5tb2RlbHMnO1xuaW1wb3J0IHsgVHJhbnNwYXJlbnRJbWFnZSwgVGh1bWJvclNlcnZlckhvc3QsIEVycm9ySW1hZ2UsIFMzSG9zdCB9IGZyb20gJy4vaW1hZ2UuZGlyZWN0aXZlLmNvbnN0YW50cyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkZWNJbWFnZV0nXG59KVxuZXhwb3J0IGNsYXNzIERlY0ltYWdlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICBjb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBlcnJvck9uTG9hZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkZWNJbWFnZSh2OiBTeXN0ZW1GaWxlS2V5IHwgc3RyaW5nKSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJJbWFnZSkge1xuICAgICAgdGhpcy5pbm5lckltYWdlID0gdjtcblxuICAgICAgaWYgKHRoaXMudmlld0luaXRpYWxpemVkKSB7XG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZGVjSW1hZ2VTaXplOiBEZWNJbWFnZVNpemU7XG5cbiAgLy8gRGVmaW5lcyBpZiB3aGl0ZSBtYXJnaW5zIHNob3VsZCBiZSBjcm9wcGVkXG4gIEBJbnB1dCgpIHRyaW06IGJvb2xlYW47XG5cbiAgLy8gRGVmaW5lcyBpZiB0aGUgaW1hZ2Ugc2hvdWxkIGJlIGNyb3BwZWQgb3IgZml0IHRoZSBzaXplIHJlc3BlY3RpbiB0aGUgYXNwZWN0IHJhdGlvXG4gIEBJbnB1dCgpIGZpdEluOiBib29sZWFuO1xuXG4gIC8vIEdlZCByZWRpbWVuc2lvbmVkIGltYWdlIGZyb20gdGh1bWJvciBpbWFnZSByZXNpemUgc2VydmljZVxuICBASW5wdXQoKSB0aHVtYm9yaXplID0gdHJ1ZTtcblxuICBwcml2YXRlIGNvbnRhaW5lckVsZW1lbnRUeXBlOiAnSU1HJyB8ICdOT1QtSU1HJztcblxuICBwcml2YXRlIGlubmVySW1hZ2U6IFN5c3RlbUZpbGVLZXkgfCBzdHJpbmcgPSBUcmFuc3BhcmVudEltYWdlO1xuXG4gIHByaXZhdGUgaW1hZ2VQYXRoOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBmaW5hbEltYWdlVXJsOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSB2aWV3SW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRldGVjdENvbnRhaW5lckVsZW1lbnQoKTtcbiAgICB0aGlzLnNldEVsZW1lbnRXaWR0aCgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy52aWV3SW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0Q29udGFpbmVyRWxlbWVudCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudFR5cGUgPSB0aGlzLmNvbnRhaW5lckVsZW1lbnQudGFnTmFtZSA9PT0gJ0lNRycgPyAnSU1HJyA6ICdOT1QtSU1HJztcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEltYWdlKCkge1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmlubmVySW1hZ2UgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IHRoaXMuaW5uZXJJbWFnZTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuaW1hZ2VQYXRoID0gdGhpcy5leHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpO1xuXG4gICAgICBpZiAodGhpcy5pbWFnZVBhdGgpIHtcblxuICAgICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSB0aGlzLmdldEZpbmFsVXJsKCk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gRXJyb3JJbWFnZTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgdGhpcy50cnlUb0xvYWRJbWFnZSgpO1xuXG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RJbWFnZVVybEZyb21TeXNmaWxlKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lckltYWdlWydmaWxlQmFzZVBhdGgnXSB8fCB1bmRlZmluZWQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaW5hbFVybCgpIHtcblxuICAgIGlmICh0aGlzLnRodW1ib3JpemUpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0VGh1bWJvclVybCgpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0UzNVcmwoKTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTM1VybCgpIHtcbiAgICByZXR1cm4gYCR7UzNIb3N0fS8ke3RoaXMuaW1hZ2VQYXRofWA7XG4gIH1cblxuICBwcml2YXRlIGdldFRodW1ib3JVcmwoKSB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZ2V0SW1hZ2VTaXplKHRoaXMuZGVjSW1hZ2VTaXplKTtcbiAgICBjb25zdCBhc3BlY3QgPSB0aGlzLmdldEFzcGVjdCgpO1xuICAgIGNvbnN0IHRyaW0gPSB0aGlzLmdldFRyaW0oKTtcbiAgICByZXR1cm4gYCR7VGh1bWJvclNlcnZlckhvc3R9LyR7c2l6ZX0ke2FzcGVjdH0ke3RyaW19LyR7dGhpcy5pbWFnZVBhdGh9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VTaXplKGRlY0ltYWdlU2l6ZTogRGVjSW1hZ2VTaXplID0ge30pOiBzdHJpbmcge1xuXG4gICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB0aGlzLmNvbnRhaW5lckVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICBpZiAoZGVjSW1hZ2VTaXplLndpZHRoICYmIGRlY0ltYWdlU2l6ZS5oZWlnaHQpIHtcbiAgICAgIHJldHVybiBgJHtkZWNJbWFnZVNpemUud2lkdGggfHwgMH14JHtkZWNJbWFnZVNpemUuaGVpZ2h0IHx8IDB9YDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgY29udGFpbmVyV2lkdGggPCAzMDA6XG4gICAgICAgIHJldHVybiBgMzAweDMwMGA7XG4gICAgICBjYXNlIGNvbnRhaW5lcldpZHRoIDwgNjAwOlxuICAgICAgICByZXR1cm4gYDYwMHg2MDBgO1xuICAgICAgY2FzZSBjb250YWluZXJXaWR0aCA8IDkwMDpcbiAgICAgICAgcmV0dXJuIGA5MDB4OTAwYDtcbiAgICAgIGNhc2UgY29udGFpbmVyV2lkdGggPCAxMjAwOlxuICAgICAgICByZXR1cm4gYDEyMDB4MTIwMGA7XG4gICAgICBjYXNlIGNvbnRhaW5lcldpZHRoIDwgMTUwMDpcbiAgICAgICAgcmV0dXJuIGAxNTAweDE1MDBgO1xuICAgICAgY2FzZSBjb250YWluZXJXaWR0aCA8IDE4MDA6XG4gICAgICAgIHJldHVybiBgMTgwMHgxODAwYDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBgMjAwMHgyMDAwYDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEFzcGVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5maXRJbiA/ICcvZml0LWluJyA6ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUcmltKCkge1xuICAgIHJldHVybiB0aGlzLnRyaW0gPyAnL3RyaW0nIDogJyc7XG4gIH1cblxuICBwcml2YXRlIHRyeVRvTG9hZEltYWdlKCkge1xuICAgIGNvbnN0IGRvd25sb2FkaW5nSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBkb3dubG9hZGluZ0ltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuY3JlYXRlSW1hZ2UoKTtcbiAgICB9O1xuXG4gICAgZG93bmxvYWRpbmdJbWFnZS5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gRXJyb3JJbWFnZTtcbiAgICAgIHRoaXMuY3JlYXRlSW1hZ2UoKTtcbiAgICB9O1xuXG4gICAgZG93bmxvYWRpbmdJbWFnZS5zcmMgPSB0aGlzLmZpbmFsSW1hZ2VVcmw7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUltYWdlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lckVsZW1lbnRUeXBlID09PSAnSU1HJykge1xuICAgICAgdGhpcy5zZXRJbWFnZWVsZW1lbnRTcmMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hcHBlbmRJbWFnZVRvQmcoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZEltYWdlVG9CZygpIHtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgdGhpcy5maW5hbEltYWdlVXJsICsgJyknO1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkZWMtaW1hZ2UtYmctbG9hZGluZycpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbWFnZWVsZW1lbnRTcmMoKSB7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgdGhpcy5maW5hbEltYWdlVXJsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RWxlbWVudFdpZHRoKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lckVsZW1lbnRUeXBlID09PSAnSU1HJykge1xuICAgICAgdGhpcy5jb250YWluZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpO1xuICAgICAgdGhpcy5jb250YWluZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWF4LXdpZHRoJywgJzEwMCUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRTaXplID0gJzEwMCUnO1xuICAgICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdjZW50ZXInO1xuICAgICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAnbm8tcmVwZWF0JztcbiAgICB9XG4gIH1cblxufVxuXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjSW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2ltYWdlLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjSW1hZ2VEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbRGVjSW1hZ2VEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ltYWdlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNJbWFnZVNpemUsIFN5c3RlbUZpbGVLZXkgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UuZGlyZWN0aXZlLm1vZGVscyc7XG5pbXBvcnQgeyBUaHVtYm9yU2VydmVySG9zdCB9IGZyb20gJy4vLi4vLi4vZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUuY29uc3RhbnRzJztcblxuZXhwb3J0IHR5cGUgWm9vbU1vZGUgPSAnaG92ZXInIHwgJ2NsaWNrJyB8ICd0b2dnbGUnIHwgJ2hvdmVyLWZyZWV6ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1pbWFnZS16b29tJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaW1hZ2VoaWdobGlnaHQtY29udGFpbmVyXCIgPlxuICA8bmd4LWltYWdlLXpvb21cbiAgICBbdGh1bWJJbWFnZV09XCJyZXNpemVkSW1hZ2VVcmxcIlxuICAgIFtmdWxsSW1hZ2VdPVwiZnVsbEltYWdlVXJsXCJcbiAgICBbem9vbU1vZGVdPVwiem9vbU1vZGVcIlxuICAgIFtlbmFibGVTY3JvbGxab29tXT1cImVuYWJsZVNjcm9sbFpvb21cIlxuICAgIFtzY3JvbGxTdGVwU2l6ZV09XCJzY3JvbGxTdGVwU2l6ZVwiXG4gICAgW2VuYWJsZUxlbnNdPVwiZW5hYmxlTGVuc1wiXG4gICAgW2xlbnNXaWR0aF09XCJsZW5zV2lkdGhcIlxuICAgIFtsZW5zSGVpZ2h0XT1cImxlbnNIZWlnaHRcIlxuICA+PC9uZ3gtaW1hZ2Utem9vbT5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtgLmltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2N1cnNvcjp6b29tLWlufWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ltYWdlWm9vbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZnVsbEltYWdlUGF0aDogYW55O1xuXG4gIGZ1bGxJbWFnZVVybDogYW55O1xuXG4gIHJlc2l6ZWRJbWFnZVVybDogYW55O1xuXG4gIEBJbnB1dCgpIHpvb21Nb2RlOiBab29tTW9kZSA9ICdjbGljayc7XG5cbiAgQElucHV0KCkgZW5hYmxlU2Nyb2xsWm9vbSA9IHRydWU7XG5cbiAgQElucHV0KCkgc2Nyb2xsU3RlcFNpemUgPSAwLjE7XG5cbiAgQElucHV0KCkgZW5hYmxlTGVucyA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGxlbnNXaWR0aCA9IDEwMDtcblxuICBASW5wdXQoKSBsZW5zSGVpZ2h0ID0gMTAwO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzeXN0ZW1GaWxlKHY6IFN5c3RlbUZpbGVLZXkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fc3lzdGVtRmlsZSkge1xuICAgICAgdGhpcy5fc3lzdGVtRmlsZSA9IHY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzeXN0ZW1GaWxlKCk6IFN5c3RlbUZpbGVLZXkge1xuICAgIHJldHVybiB0aGlzLl9zeXN0ZW1GaWxlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHNpemUodjogRGVjSW1hZ2VTaXplKSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX3RodW1iU2l6ZSA9IHY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaXplKCk6IERlY0ltYWdlU2l6ZSB7XG4gICAgcmV0dXJuIHRoaXMuX3RodW1iU2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3N5c3RlbUZpbGU6IFN5c3RlbUZpbGVLZXk7XG5cbiAgcHJpdmF0ZSBfdGh1bWJTaXplOiBEZWNJbWFnZVNpemU7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5zeXN0ZW1GaWxlICYmIHRoaXMuc2l6ZSkge1xuICAgICAgdGhpcy5zZXRGaW5hbEltYWdlVXJsKCk7XG4gICAgICB0aGlzLnNldE9yaWdpbmFsSW1hZ2VQYXRoKCk7XG4gICAgICB0aGlzLnNldFRodW1ib3JsVXJsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRGaW5hbEltYWdlVXJsKCkge1xuICAgIHRoaXMuZnVsbEltYWdlVXJsID0gdGhpcy5zeXN0ZW1GaWxlLmZpbGVVcmw7XG4gICAgY29uc29sZS5sb2coJ3NldEZpbmFsSW1hZ2VVcmwnLCB0aGlzLmZ1bGxJbWFnZVVybCk7XG4gIH1cblxuICBwcml2YXRlIHNldE9yaWdpbmFsSW1hZ2VQYXRoKCkge1xuICAgIHRoaXMuZnVsbEltYWdlUGF0aCA9IHRoaXMuZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKTtcbiAgICBjb25zb2xlLmxvZygnc2V0T3JpZ2luYWxJbWFnZVBhdGgnLCB0aGlzLmZ1bGxJbWFnZVBhdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUaHVtYm9ybFVybCgpIHtcbiAgICB0aGlzLnJlc2l6ZWRJbWFnZVVybCA9IHRoaXMuZ2V0VGh1bWJvclVybCgpO1xuICAgIGNvbnNvbGUubG9nKCdzZXRUaHVtYm9ybFVybCcsIHRoaXMucmVzaXplZEltYWdlVXJsKTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLnN5c3RlbUZpbGVbJ2ZpbGVCYXNlUGF0aCddIHx8IHVuZGVmaW5lZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlU2l6ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLnNpemUud2lkdGggfHwgMH14JHt0aGlzLnNpemUuaGVpZ2h0IHx8IDB9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGh1bWJvclVybCgpIHtcbiAgICBjb25zdCBzaXplID0gdGhpcy5nZXRJbWFnZVNpemUoKTtcbiAgICByZXR1cm4gYCR7VGh1bWJvclNlcnZlckhvc3R9LyR7c2l6ZX0vJHt0aGlzLmZ1bGxJbWFnZVBhdGh9YDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hJbWFnZVpvb21Nb2R1bGUgfSBmcm9tICduZ3gtaW1hZ2Utem9vbSc7XG5pbXBvcnQgeyBEZWNJbWFnZVpvb21Db21wb25lbnQgfSBmcm9tICcuL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTmd4SW1hZ2Vab29tTW9kdWxlLmZvclJvb3QoKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNJbWFnZVpvb21Db21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0ltYWdlWm9vbUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ltYWdlWm9vbU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjR2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLWdhbGxlcnkuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0ltYWdlTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLm1vZHVsZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE5ndUNhcm91c2VsTW9kdWxlIH0gZnJvbSAnQG5ndS9jYXJvdXNlbCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0ICdoYW1tZXJqcyc7XG5pbXBvcnQgeyBEZWNJbWFnZVpvb21Nb2R1bGUgfSBmcm9tICcuLy4uL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGVjSW1hZ2VNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTmd1Q2Fyb3VzZWxNb2R1bGUsXG4gICAgRGVjSW1hZ2Vab29tTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0dhbGxlcnlDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0dhbGxlcnlDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHYWxsZXJ5TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1pY29uJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJmb250XCI+XG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidtYXQnXCI+XG4gICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPnt7aWNvbn19PC9pPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2ZhcydcIj5cbiAgICA8aSBjbGFzcz1cImZhIHt7J2ZhLScraWNvbn19XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuXG48c3BhbiAjdGV4dCBbaGlkZGVuXT1cInRydWVcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9zcGFuPlxuYCxcbiAgc3R5bGVzOiBbYC5tYXRlcmlhbC1pY29uc3tjb2xvcjppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0O2Rpc3BsYXk6aW5saW5lLWJsb2NrOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTYlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxNiUpOy13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNJY29uQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgaWNvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGZvbnQ6ICdtYXQnIHwgJ2Zhcyc7XG5cbiAgQFZpZXdDaGlsZCgndGV4dCcpIHRleHRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5pY29uID0gdGhpcy50ZXh0RWxlbWVudC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxuICAgIH0sIDApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vZGVjLWljb24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUsIE1hdEljb25SZWdpc3RyeSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNJY29uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0ljb25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ljb25Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hdEljb25SZWdpc3RyeTogTWF0SWNvblJlZ2lzdHJ5KSB7XG4gICAgdGhpcy5tYXRJY29uUmVnaXN0cnkucmVnaXN0ZXJGb250Q2xhc3NBbGlhcygnZmFzJywgJ2ZhJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxhYmVsJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9ySGV4fVwiIFtuZ0NsYXNzXT1cImRlY0NsYXNzXCIgZGVjQ29udHJhc3RGb250V2l0aEJnPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BkaXZ7bWFyZ2luOjRweDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjdweCAxMnB4O2JvcmRlci1yYWRpdXM6MjRweDthbGlnbi1pdGVtczpjZW50ZXI7Y3Vyc29yOmRlZmF1bHR9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGFiZWxDb21wb25lbnQge1xuICBASW5wdXQoKSBjb2xvckhleDogc3RyaW5nO1xuICBASW5wdXQoKSBkZWNDbGFzczogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENvdHJhc3QgY29uZmlndXJhdGlvblxuICpcbiAqIFVzZWQgdG8gZGVmaW5lIHNvbWUgY3VzdG9tIGNvbmZpZ3VyYXRpb24gYXMgY29sb3JzIGFuZCBicmVha3BvaW50XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlQ29uZmlnIHtcbiAgbHVtYUJyZWFrUG9pbnQ6IHN0cmluZztcbiAgbGlnaHRDb2xvcjogc3RyaW5nO1xuICBkYXJrQ29sb3I6IHN0cmluZztcbn1cblxuY29uc3QgREVGQVVMVF9MVU1BX0JSRUFLUE9JTlQgPSAyMDA7XG5cbi8qXG4qIENvbnRyYXN0IEZvbnQgV2l0aCBCYWNrZ3JvdW5kIERpcmVjdGl2ZVxuKlxuKiBDb250cmFzdHMgdGhlIHRleHQgY29sb3Igd2l0aCB0aGUgYmFja2dyb3VuZC1jb2xvciB0byBhdm9pZCB3aGl0ZSBjb2xvciBpbiBsaWdoIGJhY2tncm91bmQgYW5kIGJsYWNrIGNvbG9yIGluIGRhcmtlbiBvbmVzLlxuKiBJdCBjYW4gYmUgdXNlZCBhcyBhdHRyaWJ1dGUgaW4gYW55IGVsZW1lbnQgd2l0aCBvciB3aXRob3V0IHBhc3NpbmcgY3VzdG9tIGNvbmZpZ3VyYXRpb25cbiogRXhhbXBsZSB3aXRob3V0IGN1c3RvbSBjb25maWd1cmF0aW9uOiA8ZGl2IGRlY0NvbnRyYXN0Rm9udFdpdGhCZ1wiPjwvZGl2PlxuKiBFeGFtcGxlIHdpdGggY3VzdG9tIGNvbmZpZ3VyYXRpb246IDxkaXYgW2RlY0NvbnRyYXN0Rm9udFdpdGhCZ109XCJ7ZGFya0NvbG9yOiAncmVkJ31cIj48L2Rpdj5cbipcbiogQ29uZmlndXJhdGlvbiBwYXJhbXM6XG4qIGx1bWFCcmVha1BvaW50OiB0aGUgcG9pbnQgd2hlcmUgd2Ugc2hvdWxkIGNoYW5nZSB0aGUgZm9udCBjb2xvci4gVGhpcyBpcyB0aGUgbGlndGggZmVlbGluZyBicmVha3BvaW50LlxuKiBsaWdodENvbG9yOiB0aGUgdGV4dCBjb2xvciB1c2VkIGluIGRhcmsgYmFja2dyb3VuZHNcbiogZGFya0NvbG9yOiB0aGUgdGV4dCBjb2xvciB1c2VkIGluIGxpZ3RoIGJhY2tncm91bmRzXG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gaGV4VG9SZ2JOZXcoaGV4KSB7XG5cbiAgY29uc3QgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gIHJldHVybiByZXN1bHQgPyB7XG4gICAgcjogcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiAgfSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFuZGFyZGl6ZV9jb2xvcihiZ0NvbG9yKSB7XG5cbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgY3R4LmZpbGxTdHlsZSA9IGJnQ29sb3I7XG5cbiAgcmV0dXJuIGN0eC5maWxsU3R5bGU7XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlY0NvbnRyYXN0Rm9udFdpdGhCZ10nXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIERvQ2hlY2sge1xuXG4gIHByaXZhdGUgY29uZmlnO1xuXG4gIHByaXZhdGUgYmdDb2xvcjtcblxuICBASW5wdXQoKSBzZXQgZGVjQ29udHJhc3RGb250V2l0aEJnKGNvbmZpZzogRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlQ29uZmlnKSB7XG5cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIHRoaXMuZG9EZWNDb250cmFzdEZvbnRXaXRoQmcoKTtcblxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuXG4gICAgdGhpcy5iZ0NvbG9yID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcblxuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuXG4gICAgY29uc3QgYmdDb2xvciA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICBpZiAoYmdDb2xvciAhPT0gdGhpcy5iZ0NvbG9yKSB7XG5cbiAgICAgIHRoaXMuYmdDb2xvciA9IGJnQ29sb3I7XG5cbiAgICAgIHRoaXMuZG9EZWNDb250cmFzdEZvbnRXaXRoQmcoKTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBkb0RlY0NvbnRyYXN0Rm9udFdpdGhCZygpIHtcblxuICAgIGNvbnN0IGx1bWFCcmVha1BvaW50ID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmx1bWFCcmVha1BvaW50KSA/IHRoaXMuY29uZmlnLmx1bWFCcmVha1BvaW50IDogREVGQVVMVF9MVU1BX0JSRUFLUE9JTlQ7XG5cbiAgICBjb25zdCBoZXhhQmdDb2xvciA9IHN0YW5kYXJkaXplX2NvbG9yKHRoaXMuYmdDb2xvcik7XG5cbiAgICBjb25zdCByZ2JDb2xvciA9IGhleFRvUmdiTmV3KGhleGFCZ0NvbG9yKTtcblxuICAgIGNvbnN0IGx1bWEgPSAwLjIxMjYgKiByZ2JDb2xvci5yICsgMC43MTUyICogcmdiQ29sb3IuZyArIDAuMDcyMiAqIHJnYkNvbG9yLmI7IC8vIHBlciBJVFUtUiBCVC43MDlcblxuICAgIGlmIChsdW1hIDwgbHVtYUJyZWFrUG9pbnQpIHtcblxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmNvbG9yID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmxpZ2h0Q29sb3IpID8gdGhpcy5jb25maWcubGlnaHRDb2xvciA6ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5jb2xvciA9ICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5kYXJrQ29sb3IpID8gdGhpcy5jb25maWcuZGFya0NvbG9yIDogJyMyMzJlMzgnO1xuXG4gICAgfVxuXG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGVjLWNvbnRyYXN0LWZvbnQtd2l0aC1iZy5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNDb250cmFzdEZvbnRXaXRoQmdNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGFiZWxDb21wb25lbnQgfSBmcm9tICcuL2RlYy1sYWJlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjQ29udHJhc3RGb250V2l0aEJnTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL2NvbG9yL2NvbnRyYXN0LWZvbnQtd2l0aC1iZy9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIERlY0NvbnRyYXN0Rm9udFdpdGhCZ01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjTGFiZWxDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0xhYmVsQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGFiZWxNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWx0ZXJzLCBGaWx0ZXJHcm91cHMgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIENvdW50UmVwb3J0IHtcblxuICBjb3VudDogbnVtYmVyO1xuICBjaGlsZHJlbj86IENvdW50UmVwb3J0W107XG5cbn1cblxuLypcbiAgKiBEZWNMaXN0UHJlU2VhcmNoXG4gICpcbiAgKiBVc2VkIGFzIG1pZGRsZXdhcmUgdG8gbWFuaXB1bGF0ZSB0aGUgZmlsdGVyIGJlZm9yZSBmZXRjaG5nIHRoZSBkYXRhXG4gICovXG5leHBvcnQgdHlwZSBEZWNMaXN0UHJlU2VhcmNoID0gKGZpbHRlckdyb3VwczogRmlsdGVyR3JvdXBzKSA9PiBGaWx0ZXJHcm91cHM7XG5cblxuLypcbiAgKiBEZWNMaXN0RmV0Y2hNZXRob2RcbiAgKlxuICAqIFVzZWQgdG8gZmV0Y2ggZGF0YSBmcm9tIHJlbW90ZSBBUElcbiAgKi9cbmV4cG9ydCB0eXBlIERlY0xpc3RGZXRjaE1ldGhvZCA9IChlbmRwb2ludDogc3RyaW5nLCBmaWx0ZXI6IGFueSkgPT4gT2JzZXJ2YWJsZTxEZWNMaXN0RmV0Y2hNZXRob2RSZXNwb25zZT47XG5cbi8qXG4gICogTGlzdFR5cGVcbiAgKlxuICAqIExpc3QgdHlwZXNcbiAgKi9cbmV4cG9ydCB0eXBlIERlY0xpc3RUeXBlID0gJ3RhYmxlJyB8ICdncmlkJztcblxuLypcbiAgKiBEZWNMaXN0RmV0Y2hNZXRob2RSZXNwb25zZVxuICAqXG4gICogUmVzcG9uc2UgcmVjZWl2ZWQgYnkgZmV0Y2ggRGVjTGlzdEZldGNoTWV0aG9kXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIERlY0xpc3RGZXRjaE1ldGhvZFJlc3BvbnNlIHtcbiAgcmVzdWx0OiB7XG4gICAgcm93czogYW55W107XG4gICAgY291bnQ6IG51bWJlcjtcbiAgfTtcbn1cblxuLypcbiAgKiBEZWNMaXN0RmlsdGVyXG4gICpcbiAgKiBTdHJ1Y3R1cmUgb2YgdGFicyBmaWx0ZXJzXG4gICovXG5leHBvcnQgY2xhc3MgRGVjTGlzdEZpbHRlciB7XG4gIGNoaWxkcmVuPzogRGVjTGlzdEZpbHRlcltdO1xuICBjb3VudD86IHN0cmluZztcbiAgZGVmYXVsdD86IGJvb2xlYW47XG4gIGZpbHRlcnM6IEZpbHRlcnM7XG4gIGhpZGU/OiBib29sZWFuO1xuICBsYWJlbDogc3RyaW5nO1xuICBjb2xvcjogc3RyaW5nO1xuICBsaXN0TW9kZT86IERlY0xpc3RUeXBlO1xuICBwZXJtaXNzaW9ucz86IHN0cmluZ1tdO1xuICB1aWQ/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogYW55ID0ge30pIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gZGF0YS5jaGlsZHJlbiA/IGRhdGEuY2hpbGRyZW4ubWFwKGZpbHRlciA9PiBuZXcgRGVjTGlzdEZpbHRlcihmaWx0ZXIpKSA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvdW50ID0gZGF0YS5jb3VudCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5kZWZhdWx0ID0gZGF0YS5kZWZhdWx0IHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpbHRlcnMgPSBkYXRhLmZpbHRlcnMgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuaGlkZSA9IGRhdGEuaGlkZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5sYWJlbCA9IGRhdGEubGFiZWwgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yIHx8ICcjNkU3NTdBJztcbiAgICB0aGlzLmxpc3RNb2RlID0gZGF0YS5saXN0TW9kZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5wZXJtaXNzaW9ucyA9IGRhdGEucGVybWlzc2lvbnMgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMudWlkID0gZGF0YS51aWQgfHwgZGF0YS5sYWJlbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjTGlzdEZldGNoTWV0aG9kLCBEZWNMaXN0RmlsdGVyIH0gZnJvbSAnLi8uLi8uLi9saXN0Lm1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYnMtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGlzdC10YWJzLWZpbHRlci13cmFwcGVyXCIgKm5nSWY9XCJ2aXNpYmxlRmlsdGVycyBhcyBmaWx0ZXJzXCI+XG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cImRlYy10YWItaGVhZGVyXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdGFiRmlsdGVyIG9mIGZpbHRlcnNcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICpkZWNQZXJtaXNzaW9uPVwidGFiRmlsdGVyLnBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgICAgbWF0LWJ1dHRvblxuICAgICAgICAgICAgICBjbGFzcz1cInVwcGVyY2FzZVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RUYWIodGFiRmlsdGVyLnVpZClcIlxuICAgICAgICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwic2VsZWN0ZWRUYWJVaWQgPT0gKHRhYkZpbHRlci51aWQpXCI+XG4gICAgICAgIDxzcGFuPnt7ICdsYWJlbC4nICsgdGFiRmlsdGVyLmxhYmVsIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50UmVwb3J0XCIgY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLXNtYWxsXCI+e3sgY291bnRSZXBvcnRbdGFiRmlsdGVyLnVpZF0uY291bnQgfX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubGlzdC10YWJzLWZpbHRlci13cmFwcGVye21hcmdpbi10b3A6OHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyLmJvdHRvbXtib3JkZXItYm90dG9tOjB9Lmxpc3QtdGFicy1maWx0ZXItd3JhcHBlciAuZGVjLXRhYi1oZWFkZXIgLmJhZGdle21hcmdpbi1sZWZ0OjhweH0ubGlzdC10YWJzLWZpbHRlci13cmFwcGVyIC5kZWMtdGFiLWhlYWRlciAuYmFkZ2UuYmFkZ2UtcGlsbHtwYWRkaW5nOjhweDtmb250LXNpemU6c21hbGw7Ym9yZGVyLXJhZGl1czoyNHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyIC5iYWRnZS5iYWRnZS1waWxsLmJhZGdlLXNtYWxse2ZvbnQtc2l6ZTp4LXNtYWxsO3BhZGRpbmc6NHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBjdXN0b21GZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kO1xuXG4gIG5hbWU6IHN0cmluZzsgLy8gbGlzdCB1bmlxdWUgbmFtZSB0byBpZGVudGlmeSB0aGUgdGFiIGluIHVybFxuXG4gIHNlbGVjdGVkVGFiVWlkOiBzdHJpbmc7XG5cbiAgc2VydmljZTogYW55O1xuXG4gIEBJbnB1dCgpIGNvdW50UmVwb3J0OiBhbnk7XG5cbiAgQElucHV0KClcbiAgc2V0IGZpbHRlcnModjogRGVjTGlzdEZpbHRlcltdKSB7XG4gICAgaWYgKHRoaXMuX2ZpbHRlcnMgIT09IHYpIHtcbiAgICAgIHRoaXMuX2ZpbHRlcnMgPSB2ID8gdi5tYXAoZmlsdGVyID0+IG5ldyBEZWNMaXN0RmlsdGVyKGZpbHRlcikpIDogW107XG4gICAgfVxuICB9XG5cbiAgZ2V0IGZpbHRlcnMoKTogRGVjTGlzdEZpbHRlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVycztcbiAgfVxuXG4gIHByaXZhdGUgZGVmYXVsdFRhYjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2ZpbHRlcnM6IERlY0xpc3RGaWx0ZXJbXSA9IFtdO1xuXG4gIHByaXZhdGUgd2F0aFVybFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIEBPdXRwdXQoJ3NlYXJjaCcpIHNlYXJjaDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCd0YWJDaGFuZ2UnKSB0YWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHsgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgZG9GaXJzdExvYWQgPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGF2b2lkcyBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yIHNlbGVjdGluZyB0aGUgYWN0aXZlIHRhYlxuICAgICAgdGhpcy53YXRjaFRhYkluVXJsUXVlcnkoKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGdldENvdW50T2YodWlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudFJlcG9ydCAmJiB0aGlzLmNvdW50UmVwb3J0W3VpZF0gPj0gMCA/IHRoaXMuY291bnRSZXBvcnRbdWlkXSA6ICc/JztcbiAgfVxuXG4gIHNlbGVjdFRhYih0YWIpIHtcbiAgICB0aGlzLnNldFRhYkluVXJsUXVlcnkodGFiKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZFRhYigpIHtcblxuICAgIHJldHVybiB0aGlzLmZpbHRlcnMgPyB0aGlzLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnVpZCA9PT0gdGhpcy5zZWxlY3RlZFRhYlVpZCkgOiB1bmRlZmluZWQ7XG5cbiAgfVxuXG4gIGdldCB2aXNpYmxlRmlsdGVycygpIHtcbiAgICBjb25zdCB2aXNpYmxlID0gdGhpcy5maWx0ZXJzID8gdGhpcy5maWx0ZXJzLmZpbHRlcigoZmlsdGVyKSA9PiAhZmlsdGVyLmhpZGUpIDogW107XG4gICAgcmV0dXJuICh2aXNpYmxlICYmIHZpc2libGUubGVuZ3RoID4gMSkgPyB2aXNpYmxlIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3REZWZhdWx0VGFiKCkge1xuXG4gICAgY29uc3QgaGFzRGVmYXVsdDogYW55ID0gdGhpcy5maWx0ZXJzLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiBpdGVtLmRlZmF1bHQ7XG4gICAgfSk7XG5cbiAgICBpZiAoaGFzRGVmYXVsdCkge1xuXG4gICAgICB0aGlzLmRlZmF1bHRUYWIgPSBoYXNEZWZhdWx0LnVpZDtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuZGVmYXVsdFRhYiA9IHRoaXMuZmlsdGVyc1swXS51aWQ7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgb25TZWFyY2ggPSAodGFiLCByZWNvdW50ID0gZmFsc2UpID0+IHtcblxuICAgIHRoaXMuc2VsZWN0ZWRUYWJVaWQgPSB0YWIudWlkO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVycyAmJiB0YWIpIHtcblxuICAgICAgY29uc3QgZXZlbnQgPSB7XG4gICAgICAgIGZpbHRlcnM6IHRhYi5maWx0ZXJzLFxuICAgICAgICBjaGlsZHJlbjogdGFiLmNoaWxkcmVuLFxuICAgICAgICByZWNvdW50OiByZWNvdW50LFxuICAgICAgfTtcblxuICAgICAgdGhpcy5zZWFyY2guZW1pdChldmVudCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgY29tcG9uZW50VGFiTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy10YWInO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUYWJJblVybFF1ZXJ5KHRhYikge1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgICBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0gPSB0YWI7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB3YXRjaFRhYkluVXJsUXVlcnkoKSB7XG5cbiAgICB0aGlzLmRldGVjdERlZmF1bHRUYWIoKTtcblxuICAgIHRoaXMud2F0aFVybFN1YnNjcmlwdGlvbiA9IHRoaXMucm91dGUucXVlcnlQYXJhbXNcbiAgICAgIC5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhYiA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0gfHwgdGhpcy5kZWZhdWx0VGFiO1xuXG4gICAgICAgIGlmICh0YWIgIT09IHRoaXMuc2VsZWN0ZWRUYWJVaWQpIHtcblxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGFiID0gdGhpcy5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci51aWQgPT09IHRhYik7XG5cbiAgICAgICAgICB0aGlzLm9uU2VhcmNoKHNlbGVjdGVkVGFiKTtcblxuICAgICAgICAgIHRoaXMudGFiQ2hhbmdlLmVtaXQodGFiKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYkluVXJsUXVlcnkoKSB7XG4gICAgaWYgKHRoaXMud2F0aFVybFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy53YXRoVXJsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWFkdmFuY2VkLWZpbHRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuXG4gIDxkaXYgZnhGbGV4PlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9wZW5lZFwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVJlZlwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Zvcm06IGZvcm19XCJcbiAgICA+PC9uZy1jb250YWluZXI+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXg+XG5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBlbmRcIiBmeExheW91dEdhcD1cIjhweFwiPlxuXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwic3VibWl0KClcIj57eyAnbGFiZWwuc2VhcmNoJyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uIChjbGljayk9XCJyZXNldCgpXCI+e3sgJ2xhYmVsLnJlc2V0JyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuXG5cblxuXG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmb3JtOiBhbnkgPSB7fTtcblxuICBzZXQgb3BlbmVkKHYpIHtcbiAgICB0aGlzLl9vcGVuZWQgPSB0aGlzLl9vcGVuZWQgfHwgdjtcbiAgfVxuXG4gIGdldCBvcGVuZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgX29wZW5lZDogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuICBvblNlYXJjaCA9ICgpID0+IHt9O1xuXG4gIG9uQ2xlYXIgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5vbkNsZWFyKCk7XG4gIH1cblxuICBzdWJtaXQoKSB7XG4gICAgdGhpcy5vblNlYXJjaCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJzLWZpbHRlci9saXN0LXRhYnMtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0xpc3RQcmVTZWFyY2gsIERlY0xpc3RGaWx0ZXIgfSBmcm9tICcuLy4uL2xpc3QubW9kZWxzJztcbmltcG9ydCB7IEZpbHRlckdyb3VwcyB9IGZyb20gJy4vLi4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgUGxhdGZvcm1Mb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWZpbHRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImxpc3QtZmlsdGVyLXdyYXBwZXJcIj5cbiAgPGRpdiBmeExheW91dD1cInJvdyB3cmFwXCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgPCEtLVxuICAgICAgQ291bnRlclxuICAgIC0tPlxuICAgIDxkaXYgZnhGbGV4PVwiMzBcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb3VudCA+PSAwICYmICFsb2FkaW5nXCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnQgPT09IDBcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPnt7IFwibGFiZWwucmVjb3JkLW5vdC1mb3VuZFwiIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID09PSAxXCIgY2xhc3M9XCJkZWMtYm9keS1zdHJvbmdcIj57eyBcImxhYmVsLm9uZS1yZWNvcmQtZm91bmRcIiB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA+IDFcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPiB7eyBcImxhYmVsLnJlY29yZHMtZm91bmRcIiB8IHRyYW5zbGF0ZTp7Y291bnQ6Y291bnR9IH19PC9zcGFuPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGZ4RmxleD1cIjcwXCIgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCIgY2xhc3M9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXY+XG5cbiAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgY2xhc3M9XCJpbnB1dC1zZWFyY2gtY29udGFpbmVyXCIgW2NsYXNzLmFjdGl2ZV09XCJzaG93U2VhcmNoSW5wdXRcIj5cbiAgICAgICAgICAgIDwhLS0gZ2FwIC0tPlxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLXRvb2dsZS1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIChjbGljayk9XCJ0b2dnbGVTZWFyY2hJbnB1dCgpXCI+c2VhcmNoPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxmb3JtIGZ4RmxleCByb2xlPVwiZm9ybVwiIChzdWJtaXQpPVwib25TZWFyY2goKVwiPlxuICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIxNnB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGNsYXNzPVwiaW5wdXQtc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYXItaFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgZnhGbGV4ICNpbnB1dFNlYXJjaCBuYW1lPVwic2VhcmNoXCIgWyhuZ01vZGVsKV09XCJmaWx0ZXJGb3JtLnNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJhZHZhbmNlZEZpbHRlckNvbXBvbmVudFwiIGNsYXNzPVwiY2xpY2tcIiAoY2xpY2spPVwidG9nZ2xlQWR2YW5jZWRGaWx0ZXIoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWMtc21hbGwgYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoXCI+e3tcImxhYmVsLmFkdmFuY2VkLW9wdGlvbnNcIiB8IHRyYW5zbGF0ZX19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwhLS1nYXAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tUmVmcmVzaCBzZWFyY2gtLT5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWluZm8gbWFyZ2luLWljb25cIiAoY2xpY2spPVwib25TZWFyY2goKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPnJlZnJlc2g8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS1DbGVhciBmaWx0ZXJzLS0+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiAqbmdJZj1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGhcIj5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1pbmZvXCIgKGNsaWNrKT1cIm9uQ2xlYXIoKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmNsZWFyPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiAqbmdJZj1cInNob3dJbmZvQnV0dG9uXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4taW5mb1wiIChjbGljayk9XCJvbkNsaWNrSW5mbygpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+aW5mb19vdXRsaW5lPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuXG4gIDxkaXYgKm5nSWY9XCJzaG93QWR2YW5jZWRGaWx0ZXJcIj5cblxuICAgIDxtYXQtY2FyZCBjbGFzcz1cImFkdmFuY2VkLXNlYXJjaC1jb250YWluZXJcIiBbbmdDbGFzc109XCJ7J3JlbW92ZS1idXR0b24tZW5hYmxlZCc6IGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGh9XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuXG4gICAgICAgIDxhIChjbGljayk9XCJjbG9zZUZpbHRlcnMoKVwiIGNsYXNzPVwiYnRuLWNsb3NlLWFkdmFuY2VkLXNlYXJjaFwiPlxuXG4gICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNsb3NlPC9pPlxuXG4gICAgICAgIDwvYT5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXY+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtYWR2YW5jZWQtZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvbWF0LWNhcmQ+XG5cbiAgPC9kaXY+XG5cbiAgPGRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lXG4gICAgKm5nSWY9XCJmaWx0ZXJHcm91cHNXaXRob3V0VGFicz8ubGVuZ3RoXCJcbiAgICBbZmlsdGVyR3JvdXBzXT1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzXCJcbiAgICAocmVtb3ZlKT1cInJlbW92ZURlY0ZpbHRlckdyb3VwKCRldmVudClcIlxuICAgIChlZGl0KT1cImVkaXREZWNGaWx0ZXJHcm91cCgkZXZlbnQpXCI+PC9kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZT5cblxuICA8ZGVjLWxpc3QtdGFicy1maWx0ZXIgW2ZpbHRlcnNdPVwiZmlsdGVyc1wiIFtjb3VudFJlcG9ydF09XCJjb3VudFJlcG9ydFwiPjwvZGVjLWxpc3QtdGFicy1maWx0ZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubGlzdC1maWx0ZXItd3JhcHBlcnttYXJnaW46MCAwIDE2cHg7cG9zaXRpb246cmVsYXRpdmV9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLm1hdC1pY29ue2NvbG9yOiM5OTl9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLnNlYXJjaC10ZXJtLWlucHV0e3dpZHRoOjUwMHB4O21hcmdpbi1yaWdodDo4cHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmlubGluZS1mb3Jte2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo3NHB4O3otaW5kZXg6MTtyaWdodDozMHB4O3dpZHRoOjU1MnB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyLnJlbW92ZS1idXR0b24tZW5hYmxlZHtyaWdodDo2MnB4O3dpZHRoOjU1MXB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyIC5idG4tY2xvc2UtYWR2YW5jZWQtc2VhcmNoe2N1cnNvcjpwb2ludGVyfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVye3RyYW5zaXRpb246YWxsIC4zcyBlYXNlO292ZXJmbG93OmhpZGRlbjt3aWR0aDo0MHB4O2hlaWdodDo1MHB4fS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyLmFjdGl2ZXtiYWNrZ3JvdW5kOiNmOGY4ZmE7Y29sb3I6Izk5OTt3aWR0aDo2MDBweH0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lci5hY3RpdmUgLmJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaHtkaXNwbGF5OmlubGluZX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoe3dpZHRoOjEwMCV9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaCBpbnB1dHtmb250OmluaGVyaXQ7YmFja2dyb3VuZDowIDA7Y29sb3I6Y3VycmVudENvbG9yO2JvcmRlcjpub25lO291dGxpbmU6MDtwYWRkaW5nOjA7d2lkdGg6MTAwJTt2ZXJ0aWNhbC1hbGlnbjpib3R0b219LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaHtkaXNwbGF5Om5vbmV9LnNlYXJjaC1jb250YWluZXIgLmJ0bi1jbGVhci1zZWFyY2h7cGFkZGluZy1yaWdodDoxNXB4O2N1cnNvcjpwb2ludGVyO2NvbG9yOiM5OTk7d2lkdGg6OTBweH0uc2VhcmNoLWNvbnRhaW5lciAuYnRuLWluZm8sLnNlYXJjaC1jb250YWluZXIgLmJ0bi10b29nbGUtc2VhcmNoe2ZvbnQtc2l6ZToyMXB4O2N1cnNvcjpwb2ludGVyO2hlaWdodDoyMXB4O2NvbG9yOiM5OTl9LnNlYXJjaC1jb250YWluZXIgLmJhci1oe2JvcmRlci1yaWdodDoycHggc29saWQgI2QwZDBkMDtoZWlnaHQ6MjFweDttYXJnaW46YXV0byAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgY291bnQ6IG51bWJlcjtcblxuICBjb3VudFJlcG9ydDtcblxuICBzaG93U2VhcmNoSW5wdXQ6IGJvb2xlYW47XG5cbiAgc2V0IHNob3dBZHZhbmNlZEZpbHRlcih2OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX3Nob3dBZHZhbmNlZEZpbHRlciAhPT0gdikge1xuICAgICAgdGhpcy5fc2hvd0FkdmFuY2VkRmlsdGVyID0gISF2O1xuICAgICAgdGhpcy5zZXRBZHZhbmNlZEZpbHRlclN0YXRlKHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaG93QWR2YW5jZWRGaWx0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dBZHZhbmNlZEZpbHRlcjtcbiAgfVxuXG4gIGZpbHRlckZvcm06IGFueSA9IHtcbiAgICBzZWFyY2g6IHVuZGVmaW5lZFxuICB9O1xuXG4gIGZpbHRlckdyb3VwczogRmlsdGVyR3JvdXBzO1xuXG4gIGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzOiBGaWx0ZXJHcm91cHM7XG5cbiAgY3VycmVudFN0YXR1c0ZpbHRlcmVkOiBzdHJpbmc7XG5cbiAgdGFic0ZpbHRlcjogYW55O1xuXG4gIGVkaXRpb25Hcm91cEluZGV4OiBudW1iZXI7XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGxvYWRpbmc6IGJvb2xlYW47XG5cbiAgaXNJdEZpcnN0TG9hZCA9IHRydWU7XG5cbiAgZmlsdGVyTW9kZTogJ3RhYnMnIHwgJ2NvbGxhcHNlJztcblxuICBjaGlsZHJlbkZpbHRlcnM7XG5cbiAgLypcbiAgICogY2xpY2thYmxlQ29udGFpbmVyQ2xhc3NcbiAgICpcbiAgICogV2hlcmUgdGhlIGNsaWNrIHdhdGNoZXIgc2hvdWxkIGJlIGxpc3RlbmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBjbGlja2FibGVDb250YWluZXJDbGFzcyA9ICdsaXN0LWZpbHRlci13cmFwcGVyJztcblxuICBwcml2YXRlIGlubmVyRGVjRmlsdGVyR3JvdXBzOiBhbnlbXTtcblxuICBwcml2YXRlIGN1cnJlbnRVcmxFbmNvZGVkRmlsdGVyOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSB0YWJzRmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSB3YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgX2ZpbHRlcnM6IERlY0xpc3RGaWx0ZXJbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2xvYWRDb3VudFJlcG9ydDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9zaG93QWR2YW5jZWRGaWx0ZXI6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcHJlU2VhcmNoOiBEZWNMaXN0UHJlU2VhcmNoO1xuXG4gIEBJbnB1dCgpIHNob3dJbmZvQnV0dG9uO1xuXG4gIEBJbnB1dCgpIGhhc1BlcnNpc3RlbmNlID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgZmlsdGVycyh2OiBEZWNMaXN0RmlsdGVyW10pIHtcblxuICAgIGlmICh0aGlzLl9maWx0ZXJzICE9PSB2KSB7XG5cbiAgICAgIHRoaXMuX2ZpbHRlcnMgPSB2Lm1hcChmaWx0ZXIgPT4gbmV3IERlY0xpc3RGaWx0ZXIoZmlsdGVyKSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBsb2FkQ291bnRSZXBvcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRDb3VudFJlcG9ydDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBsb2FkQ291bnRSZXBvcnQodjogYm9vbGVhbikge1xuICAgIGlmICh2ICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5fbG9hZENvdW50UmVwb3J0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgZmlsdGVycygpOiBEZWNMaXN0RmlsdGVyW10ge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXJzO1xuICB9XG5cbiAgQE91dHB1dCgpIHNlYXJjaDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAVmlld0NoaWxkKCdpbnB1dFNlYXJjaCcpIGlucHV0U2VhcmNoO1xuXG4gIEBWaWV3Q2hpbGQoRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQpIHRhYnNGaWx0ZXJDb21wb25lbnQ6IERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50KSBhZHZhbmNlZEZpbHRlckNvbXBvbmVudDogRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGxhdGZvcm1Mb2NhdGlvbjogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53YXRjaFRhYnNGaWx0ZXIoKTtcbiAgICB0aGlzLndhdGNoQ2xpY2soKTtcbiAgICB0aGlzLndhdGNoVXJsRmlsdGVyKCk7XG4gICAgdGhpcy5jb25maWd1cmVBZHZhbmNlZEZpbHRlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdDbGljaygpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFic0ZpbHRlcigpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVXJsRmlsdGVyKCk7XG4gIH1cblxuICB0b2dnbGVTZWFyY2hJbnB1dCgpIHtcbiAgICB0aGlzLnNob3dTZWFyY2hJbnB1dCA9ICF0aGlzLnNob3dTZWFyY2hJbnB1dDtcbiAgICBpZiAoIXRoaXMuc2hvd1NlYXJjaElucHV0KSB7XG4gICAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dFNlYXJjaC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9LCAxODApO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUFkdmFuY2VkRmlsdGVyKCRldmVudCkge1xuXG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSAhdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXI7XG5cbiAgfVxuXG4gIG9uU2VhcmNoID0gKGFwcGVuZEN1cnJlbnRGb3JtID0gdHJ1ZSkgPT4ge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyRm9ybSAmJiBhcHBlbmRDdXJyZW50Rm9ybSkge1xuXG4gICAgICBjb25zdCBuZXdEZWNGaWx0ZXJHcm91cCA9IHtcblxuICAgICAgICBmaWx0ZXJzOiBbXVxuXG4gICAgICB9O1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckZvcm0pLmZvckVhY2goa2V5ID0+IHtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJGb3JtW2tleV0pIHtcblxuICAgICAgICAgIGNvbnN0IGZpbHRlciA9IHsgcHJvcGVydHk6IGtleSwgdmFsdWU6IHRoaXMuZmlsdGVyRm9ybVtrZXldIH07XG5cbiAgICAgICAgICBuZXdEZWNGaWx0ZXJHcm91cC5maWx0ZXJzLnB1c2goZmlsdGVyKTtcblxuICAgICAgICB9XG5cblxuICAgICAgfSk7XG5cbiAgICAgIGlmIChuZXdEZWNGaWx0ZXJHcm91cC5maWx0ZXJzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICBpZiAodGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcykge1xuXG4gICAgICAgICAgaWYgKHRoaXMuZWRpdGlvbkdyb3VwSW5kZXggPj0gMCkge1xuXG4gICAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzW3RoaXMuZWRpdGlvbkdyb3VwSW5kZXhdID0gbmV3RGVjRmlsdGVyR3JvdXA7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLnB1c2gobmV3RGVjRmlsdGVyR3JvdXApO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gW25ld0RlY0ZpbHRlckdyb3VwXTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMucmVhY2FsY3VsYXRlQW5kRW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHModHJ1ZSk7XG5cbiAgfVxuXG4gIG9uQ2xlYXIoKSB7XG5cbiAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHMgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICB0aGlzLm9uU2VhcmNoKCk7XG5cbiAgfVxuXG4gIHJlbW92ZURlY0ZpbHRlckdyb3VwKGdyb3VwSW5kZXgpIHtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXJHcm91cHMuZmlsdGVyKChncm91cCwgaW5kZXgpID0+IGluZGV4ICE9PSBncm91cEluZGV4KTtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzLmZpbHRlcigoZ3JvdXAsIGluZGV4KSA9PiBpbmRleCAhPT0gZ3JvdXBJbmRleCk7XG5cbiAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5maWx0ZXIoKGdyb3VwLCBpbmRleCkgPT4gaW5kZXggIT09IGdyb3VwSW5kZXgpO1xuXG4gICAgdGhpcy5vblNlYXJjaCh0cnVlKTtcblxuICB9XG5cbiAgZWRpdERlY0ZpbHRlckdyb3VwKGdyb3VwSW5kZXgpIHtcblxuICAgIHRoaXMuZWRpdGlvbkdyb3VwSW5kZXggPSBncm91cEluZGV4O1xuXG4gICAgY29uc3QgdG9FZGl0RGVjRmlsdGVyR3JvdXAgPSB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzW2dyb3VwSW5kZXhdO1xuXG4gICAgaWYgKHRvRWRpdERlY0ZpbHRlckdyb3VwICYmIHRvRWRpdERlY0ZpbHRlckdyb3VwLmZpbHRlcnMubGVuZ3RoID4gMCkge1xuXG4gICAgICB0aGlzLnJlbG9hZEZvcm1XaXRoR2l2ZW5EZWNGaWx0ZXJHcm91cGUodG9FZGl0RGVjRmlsdGVyR3JvdXAuZmlsdGVycyk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGNsZWFyRmlsdGVyRm9ybSA9ICgpID0+IHtcblxuICAgIGlmICh0aGlzLmZpbHRlckZvcm0pIHtcblxuICAgICAgT2JqZWN0LmtleXModGhpcy5maWx0ZXJGb3JtKS5mb3JFYWNoKGtleSA9PiB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJGb3JtW2tleV0gPSB1bmRlZmluZWQ7XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgfVxuXG4gIG9uQ2xpY2tJbmZvKCkge1xuICAgIGNvbnNvbGUubG9nKCdvbiBjbGljayBpbmZvLiBOb3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIC8qXG4gICAqIGFwcGVuZFRvQ3VycmVudEZpbHRlcnNcbiAgICpcbiAgICogQXBwZW5kIGEgZmlsdGVyIHRvIHRoZSBjdXJyZW50IGZpbHRlciBncm91cHNcbiAgICovXG4gIGFwcGVuZFRvQ3VycmVudERlY0ZpbHRlckdyb3Vwcyhwcm9wZXJ0eU5hbWUsIHByb3BlcnR5VmFsdWUpIHtcblxuICAgIGNvbnN0IGZpbHRlciA9IHtcbiAgICAgICdwcm9wZXJ0eSc6IHByb3BlcnR5TmFtZSxcbiAgICAgICd2YWx1ZSc6IHByb3BlcnR5VmFsdWUsXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzKSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMuZm9yRWFjaCgoZmlsdGVyR3JvdXApID0+IHtcblxuICAgICAgICBjb25zdCBmaWx0ZXJFeGlzdHNJblRoaXNHcm91cCA9IGZpbHRlckdyb3VwLmZpbHRlcnMuZmluZChmaWx0ZXJHcm91cEZpbHRlciA9PiBmaWx0ZXJHcm91cEZpbHRlci5wcm9wZXJ0eSA9PT0gZmlsdGVyLnByb3BlcnR5KTtcblxuICAgICAgICBpZiAoIWZpbHRlckV4aXN0c0luVGhpc0dyb3VwKSB7XG5cbiAgICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzLnB1c2goZmlsdGVyKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IFt7IGZpbHRlcnM6IFtmaWx0ZXJdIH1dO1xuXG4gICAgfVxuXG4gICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM7XG5cbiAgICB0aGlzLnJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgfVxuXG4gIGNsb3NlRmlsdGVycygpIHtcblxuICAgIHRoaXMuZWRpdGlvbkdyb3VwSW5kZXggPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9IGZhbHNlO1xuXG4gICAgdGhpcy5zaG93U2VhcmNoSW5wdXQgPSBmYWxzZTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZWFjYWxjdWxhdGVBbmRFbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcyhyZWNvdW50ID0gZmFsc2UpIHtcblxuICAgIHRoaXMuZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMocmVjb3VudClcbiAgICAgIC50aGVuKCgpID0+IHtcblxuICAgICAgICBpZiAoIXRoaXMuaGFzUGVyc2lzdGVuY2UpIHtcblxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoRmlsdGVySW5VcmxRdWVyeSgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFyRmlsdGVyRm9ybSgpO1xuXG4gICAgICAgICAgfSk7XG5cblxuICAgICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVsb2FkRm9ybVdpdGhHaXZlbkRlY0ZpbHRlckdyb3VwZShmaWx0ZXJzKSB7XG5cbiAgICB0aGlzLmNsZWFyRmlsdGVyRm9ybSgpO1xuXG4gICAgZmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XG5cbiAgICAgIGlmIChmaWx0ZXIudmFsdWUpIHtcblxuICAgICAgICB0aGlzLmZpbHRlckZvcm1bZmlsdGVyLnByb3BlcnR5XSA9IGZpbHRlci52YWx1ZTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICB0aGlzLm9wZW5GaWx0ZXJzKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgb3BlbkZpbHRlcnMoKSB7XG5cbiAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9IHRydWU7XG5cbiAgICB0aGlzLnNob3dTZWFyY2hJbnB1dCA9IHRydWU7XG5cbiAgfVxuXG4gIHByaXZhdGUgY29uZmlndXJlQWR2YW5jZWRGaWx0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICB0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50LmZvcm0gPSB0aGlzLmZpbHRlckZvcm07XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQub25TZWFyY2ggPSB0aGlzLm9uU2VhcmNoO1xuXG4gICAgICB0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50Lm9uQ2xlYXIgPSB0aGlzLmNsZWFyRmlsdGVyRm9ybTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBzZXRBZHZhbmNlZEZpbHRlclN0YXRlKHN0YXRlKSB7XG5cbiAgICBpZiAodGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICB0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50Lm9wZW5lZCA9IHN0YXRlO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VhcmNoLnN1YnNjcmliZShmaWx0ZXJFdmVudCA9PiB7XG5cbiAgICAgICAgaWYgKGZpbHRlckV2ZW50LmNoaWxkcmVuKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSAnY29sbGFwc2UnO1xuXG4gICAgICAgICAgdGhpcy5jaGlsZHJlbkZpbHRlcnMgPSBmaWx0ZXJFdmVudC5jaGlsZHJlbjtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gJ3RhYnMnO1xuXG4gICAgICAgICAgdGhpcy5jaGlsZHJlbkZpbHRlcnMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy50YWJzRmlsdGVyID0gZmlsdGVyRXZlbnQuZmlsdGVycztcblxuICAgICAgICB0aGlzLmVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHRoaXMuaXNJdEZpcnN0TG9hZCB8fCBmaWx0ZXJFdmVudC5yZWNvdW50KTtcblxuICAgICAgICB0aGlzLmlzSXRGaXJzdExvYWQgPSBmYWxzZTtcblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJzRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFic0ZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW91bnRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCkge1xuXG4gICAgY29uc3QgY3VycmVudEZpbHRlciA9IFtdO1xuXG4gICAgY29uc3QgY3VycmVudEZpbHRlcldpdGhvdXRUYWJzID0gW107XG5cbiAgICBpZiAodGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyAmJiB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLmxlbmd0aCkge1xuXG4gICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLmZvckVhY2goKGZpbHRlckdyb3VwOiB7IGZpbHRlcnM6IGFueVtdIH0pID0+IHtcblxuICAgICAgICBjb25zdCBmaWx0ZXJHcm91cENvcHkgPSB7XG4gICAgICAgICAgZmlsdGVyczogZmlsdGVyR3JvdXAuZmlsdGVycy5zbGljZSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMudGFic0ZpbHRlcikge1xuICAgICAgICAgIGZpbHRlckdyb3VwQ29weS5maWx0ZXJzLnB1c2goLi4udGhpcy50YWJzRmlsdGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRGaWx0ZXIucHVzaChmaWx0ZXJHcm91cENvcHkpO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlckdyb3VwQ29weVdpdGhvdXRUYWJzID0ge1xuICAgICAgICAgIGZpbHRlcnM6IGZpbHRlckdyb3VwLmZpbHRlcnMuc2xpY2UoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicy5wdXNoKGZpbHRlckdyb3VwQ29weVdpdGhvdXRUYWJzKTtcblxuICAgICAgfSk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMudGFic0ZpbHRlcikge1xuXG4gICAgICBjdXJyZW50RmlsdGVyLnB1c2goeyBmaWx0ZXJzOiB0aGlzLnRhYnNGaWx0ZXIgfSk7XG5cbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlckdyb3VwcyA9IGN1cnJlbnRGaWx0ZXIubGVuZ3RoID8gY3VycmVudEZpbHRlciA6IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMubGVuZ3RoID8gY3VycmVudEZpbHRlcldpdGhvdXRUYWJzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLypcbiAgICogZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHNcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMocmVjb3VudCA9IGZhbHNlKSB7XG5cbiAgICBsZXQgZmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXJHcm91cHMgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZmlsdGVyR3JvdXBzKSkgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cbiAgICAgIHRoaXMubW91bnRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgICAgIGlmICh0aGlzLnByZVNlYXJjaCkge1xuXG4gICAgICAgIGZpbHRlckdyb3VwcyA9IHRoaXMucHJlU2VhcmNoKGZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5zZWFyY2guZW1pdCh7XG4gICAgICAgIGZpbHRlckdyb3VwczogZmlsdGVyR3JvdXBzLFxuICAgICAgICByZWNvdW50OiByZWNvdW50LFxuICAgICAgICBmaWx0ZXJNb2RlOiB0aGlzLmZpbHRlck1vZGUsXG4gICAgICAgIGNoaWxkcmVuOiB0aGlzLmNoaWxkcmVuRmlsdGVycyxcbiAgICAgIH0pO1xuXG4gICAgICByZXMoKTtcblxuICAgIH0pO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIGFjdEJ5Q2xpY2tQb3NpdGlvblxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlY3RcbiAgICovXG4gIHByaXZhdGUgYWN0QnlDbGlja1Bvc2l0aW9uID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50WydwYXRoJ10pIHtcblxuICAgICAgY29uc3QgY2xpY2tlZEluc2lkZUZpbHRlciA9ICRldmVudFsncGF0aCddLmZpbmQocGF0aCA9PiB7XG5cbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYCR7cGF0aFsnY2xhc3NOYW1lJ119YCB8fCAnJztcblxuICAgICAgICBjb25zdCBpbnNpZGVXcmFwcGVyID0gY2xhc3NOYW1lLmluZGV4T2YodGhpcy5jbGlja2FibGVDb250YWluZXJDbGFzcykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVPcHRpb24gPSBjbGFzc05hbWUuaW5kZXhPZignbWF0LW9wdGlvbicpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlRGF0ZVBpY2tlciA9IGNsYXNzTmFtZS5pbmRleE9mKCdtYXQtZGF0ZXBpY2tlci1jb250ZW50JykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVPdmVybGF5Q29udGFpbmVyID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Nkay1vdmVybGF5LWNvbnRhaW5lcicpID49IDA7XG5cbiAgICAgICAgcmV0dXJuIGluc2lkZVdyYXBwZXIgfHwgaW5zaWRlT3B0aW9uIHx8IGluc2lkZURhdGVQaWNrZXIgfHwgaW5zaWRlT3ZlcmxheUNvbnRhaW5lcjtcblxuICAgICAgfSk7XG5cbiAgICAgIGlmICghY2xpY2tlZEluc2lkZUZpbHRlcikgeyAvLyBhdm9pZCBjbG9zaW5nIGZpbHRlciBmcm9tIGFueSBvcGVuIGRpYWxvZ1xuXG4gICAgICAgIHRoaXMuY2xvc2VGaWx0ZXJzKCk7XG5cbiAgICAgICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB3YXRjaENsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoQ2xpY2soKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmFjdEJ5Q2xpY2tQb3NpdGlvbiwgdHJ1ZSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdDbGljaygpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYWN0QnlDbGlja1Bvc2l0aW9uLCB0cnVlKTtcbiAgfVxuXG4gIC8qXG4gICAqIGNvbXBvbmVudFRhYk5hbWVcbiAgICpcbiAgICovXG4gIHByaXZhdGUgY29tcG9uZW50RmlsdGVyTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy1maWx0ZXInO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hVcmxGaWx0ZXIoKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzUGVyc2lzdGVuY2UpIHtcblxuICAgICAgcmV0dXJuO1xuXG4gICAgfVxuXG4gICAgdGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMucm91dGUucXVlcnlQYXJhbXNcbiAgICAgIC5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuXG4gICAgICAgIGNvbnN0IGludGVydmFsID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgIGlmICh0aGlzLm5hbWUpIHtcblxuICAgICAgICAgICAgY29uc3QgYmFzZTY0RmlsdGVyID0gcGFyYW1zW3RoaXMuY29tcG9uZW50RmlsdGVyTmFtZSgpXTtcblxuICAgICAgICAgICAgaWYgKGJhc2U2NEZpbHRlcikge1xuXG4gICAgICAgICAgICAgIGlmIChiYXNlNjRGaWx0ZXIgIT09IHRoaXMuY3VycmVudFVybEVuY29kZWRGaWx0ZXIpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuZ2V0SnNvbkZyb21CYXNlNjRGaWx0ZXIoYmFzZTY0RmlsdGVyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSBmaWx0ZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlYXJjaCgpO1xuXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSwgMTApO1xuXG4gICAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1VybEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbikge1xuXG4gICAgICB0aGlzLndhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5KCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICBjb25zdCBmaWx0ZXJCYXNlNjQgPSB0aGlzLmdldEJhc2U2NEZpbHRlckZyb21EZWNGaWx0ZXJHcm91cHMoKTtcblxuICAgICAgdGhpcy5zZXRGaWx0ZXJJblVybFF1ZXJ5KGZpbHRlckJhc2U2NCkudGhlbihyZXMsIHJlaik7XG5cbiAgICB9KTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBzZXRGaWx0ZXJJblVybFF1ZXJ5XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldEZpbHRlckluVXJsUXVlcnkoZmlsdGVyKSB7XG5cbiAgICB0aGlzLmN1cnJlbnRVcmxFbmNvZGVkRmlsdGVyID0gZmlsdGVyO1xuXG4gICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuXG4gICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRGaWx0ZXJOYW1lKCldID0gZmlsdGVyO1xuXG4gICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLiddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcywgcmVwbGFjZVVybDogdHJ1ZSB9KTtcblxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVXJsRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGdldEJhc2U2NEZpbHRlckZyb21EZWNGaWx0ZXJHcm91cHMoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgJiYgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGJhc2U2NEZpbHRlciA9IGJ0b2EoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpKSk7XG4gICAgICBjb25zdCBiYXNlRmlsdGVyV2l0aG91dEVxdWFsU2lnbiA9IGJhc2U2NEZpbHRlci5yZXBsYWNlKC89L2csICcnKTtcbiAgICAgIHJldHVybiBiYXNlRmlsdGVyV2l0aG91dEVxdWFsU2lnbjsgLy8gcmVtb3ZlcyA9IGJlZm9yIGVzZXQgdGhlIGZpbHRlclxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1VybEZpbHRlclxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvOTAyMDQwOS9pcy1pdC1vay10by1yZW1vdmUtdGhlLWVxdWFsLXNpZ25zLWZyb20tYS1iYXNlNjQtc3RyaW5nXG4gICAqL1xuICBwcml2YXRlIGdldEpzb25Gcm9tQmFzZTY0RmlsdGVyKGJhc2U2NEZpbHRlcikge1xuICAgIGNvbnN0IGJhc2U2NFBhZExlbiA9IChiYXNlNjRGaWx0ZXIubGVuZ3RoICUgNCkgPiAwID8gNCAtIChiYXNlNjRGaWx0ZXIubGVuZ3RoICUgNCkgOiAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlNjRQYWRMZW47IGkrKykge1xuICAgICAgYmFzZTY0RmlsdGVyICs9ICc9JzsgLy8gYWRkID0gYmVmb3JlIHJlYWRkIHRoZSBmaWx0ZXJcbiAgICB9XG5cbiAgICBsZXQgZmlsdGVyT2JqZWN0O1xuXG4gICAgdHJ5IHtcbiAgICAgIGZpbHRlck9iamVjdCA9IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KGF0b2IoYmFzZTY0RmlsdGVyKSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtc2cgPSAnTGlzdEZpbHRlckNvbXBvbmVudDo6IEZhaWxlZCB0byBwYXJzZSB0aGUgZmlsdGVyLiBUaGUgdmFsdWUgaXMgbm90IHZhbGlkIGFuZCB0aGUgZmlsdGVyIHdhcyByZW1vdmVkLiBGaWx0ZXIgdmFsdWU6ICc7XG4gICAgICBjb25zb2xlLmVycm9yKG1zZywgYmFzZTY0RmlsdGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmFzZTY0RmlsdGVyID8gZmlsdGVyT2JqZWN0IDogdW5kZWZpbmVkO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJmaWx0ZXJHcm91cHM/Lmxlbmd0aFwiIGNsYXNzPVwiZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlclwiPlxuXG4gIDxtYXQtY2hpcC1saXN0PlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZ3JvdXAgb2YgZmlsdGVyR3JvdXBzOyBsZXQgZ3JvdXBJbmRleCA9IGluZGV4O1wiPlxuICAgICAgPG1hdC1jaGlwICpuZ0lmPVwiZ3JvdXA/LmZpbHRlcnNcIiAoY2xpY2spPVwiZWRpdERlY0ZpbHRlckdyb3VwKCRldmVudCwgZ3JvdXBJbmRleClcIj5cblxuICAgICAgICA8c3BhbiAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGdyb3VwPy5maWx0ZXJzOyBsZXQgbGFzdEZpbHRlciA9IGxhc3Q7XCIgY2xhc3M9XCJpdGVtLXdyYXBwZXJcIj5cblxuICAgICAgICAgIDxzcGFuIFtuZ1N3aXRjaF09XCJmaWx0ZXIucHJvcGVydHkgIT09ICdzZWFyY2gnXCI+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+e3sgJ2xhYmVsLicgKyBmaWx0ZXIucHJvcGVydHkgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaERlZmF1bHQ+e3sgJ2xhYmVsLktleXdvcmQnIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuXG4gICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgPHNwYW4+OiZuYnNwOzwvc3Bhbj5cblxuICAgICAgICAgIDxzcGFuIFtuZ1N3aXRjaF09XCJnZXRWYWx1ZXR5cGUoZmlsdGVyLnZhbHVlKVwiIGNsYXNzPVwidmFsdWUtd3JhcHBlclwiPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCI+e3sgZmlsdGVyLnZhbHVlIHwgZGF0ZSB9fTwvc3Bhbj5cblxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoRGVmYXVsdD57eyBmaWx0ZXIudmFsdWUgfX08L3NwYW4+XG5cbiAgICAgICAgICA8L3NwYW4gPlxuXG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCIhbGFzdEZpbHRlclwiPiw8L3NwYW4+XG5cbiAgICAgICAgICAmbmJzcDtcblxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIChjbGljayk9XCJyZW1vdmVEZWNGaWx0ZXJHcm91cCgkZXZlbnQsIGdyb3VwSW5kZXgpXCI+cmVtb3ZlX2NpcmNsZTwvaT5cblxuICAgICAgPC9tYXQtY2hpcD5cblxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gIDwvbWF0LWNoaXAtbGlzdD5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC10YWItYm9keS1jb250ZW50e3BhZGRpbmc6MTZweCAwfS5tYXQtZm9ybS1maWVsZC1wcmVmaXh7bWFyZ2luLXJpZ2h0OjhweCFpbXBvcnRhbnR9Lm1hdC1mb3JtLWZpZWxkLXN1ZmZpeHttYXJnaW4tbGVmdDo4cHghaW1wb3J0YW50fS5tYXQtZWxldmF0aW9uLXowe2JveC1zaGFkb3c6MCAwIDAgMCByZ2JhKDAsMCwwLC4yKSwwIDAgMCAwIHJnYmEoMCwwLDAsLjE0KSwwIDAgMCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MXtib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejJ7Ym94LXNoYWRvdzowIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDJweCAycHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoze2JveC1zaGFkb3c6MCAzcHggM3B4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAzcHggNHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDhweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NHtib3gtc2hhZG93OjAgMnB4IDRweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNHB4IDVweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo1e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA1cHggOHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE0cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejZ7Ym94LXNoYWRvdzowIDNweCA1cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDZweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejd7Ym94LXNoYWRvdzowIDRweCA1cHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDdweCAxMHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAycHggMTZweCAxcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo4e2JveC1zaGFkb3c6MCA1cHggNXB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCA4cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgM3B4IDE0cHggMnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OXtib3gtc2hhZG93OjAgNXB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOXB4IDEycHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNnB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEwe2JveC1zaGFkb3c6MCA2cHggNnB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCAxMHB4IDE0cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAxOHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejExe2JveC1zaGFkb3c6MCA2cHggN3B4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMXB4IDE1cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAyMHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEye2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMnB4IDE3cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyMnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEze2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxM3B4IDE5cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNHB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE0e2JveC1zaGFkb3c6MCA3cHggOXB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxNHB4IDIxcHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE1e2JveC1zaGFkb3c6MCA4cHggOXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxNXB4IDIycHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAyOHB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE2e2JveC1zaGFkb3c6MCA4cHggMTBweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTZweCAyNHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMzBweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxN3tib3gtc2hhZG93OjAgOHB4IDExcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE3cHggMjZweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMycHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTh7Ym94LXNoYWRvdzowIDlweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxOHB4IDI4cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDdweCAzNHB4IDZweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE5e2JveC1zaGFkb3c6MCA5cHggMTJweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMTlweCAyOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzZweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMHtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMHB4IDMxcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCAzOHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIxe2JveC1zaGFkb3c6MCAxMHB4IDEzcHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIxcHggMzNweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQwcHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjJ7Ym94LXNoYWRvdzowIDEwcHggMTRweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjJweCAzNXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggNDJweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyM3tib3gtc2hhZG93OjAgMTFweCAxNHB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyM3B4IDM2cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NHB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejI0e2JveC1zaGFkb3c6MCAxMXB4IDE1cHggLTdweCByZ2JhKDAsMCwwLC4yKSwwIDI0cHggMzhweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOXB4IDQ2cHggOHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJhZGdlLXNtYWxsIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6NnB4fS5tYXQtYmFkZ2UtbGFyZ2UgLm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtc2l6ZToyNHB4fS5tYXQtaDEsLm1hdC1oZWFkbGluZSwubWF0LXR5cG9ncmFwaHkgaDF7Zm9udDo0MDAgMjRweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMiwubWF0LXRpdGxlLC5tYXQtdHlwb2dyYXBoeSBoMntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWgzLC5tYXQtc3ViaGVhZGluZy0yLC5tYXQtdHlwb2dyYXBoeSBoM3tmb250OjQwMCAxNnB4LzI4cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg0LC5tYXQtc3ViaGVhZGluZy0xLC5tYXQtdHlwb2dyYXBoeSBoNHtmb250OjQwMCAxNXB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg1LC5tYXQtdHlwb2dyYXBoeSBoNXtmb250OjQwMCAxMS42MnB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWg2LC5tYXQtdHlwb2dyYXBoeSBoNntmb250OjQwMCA5LjM4cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxMnB4fS5tYXQtYm9keS0yLC5tYXQtYm9keS1zdHJvbmd7Zm9udDo1MDAgMTRweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJvZHksLm1hdC1ib2R5LTEsLm1hdC10eXBvZ3JhcGh5e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5IHAsLm1hdC1ib2R5LTEgcCwubWF0LXR5cG9ncmFwaHkgcHttYXJnaW46MCAwIDEycHh9Lm1hdC1jYXB0aW9uLC5tYXQtc21hbGx7Zm9udDo0MDAgMTJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWRpc3BsYXktNCwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTR7Zm9udDozMDAgMTEycHgvMTEycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNTZweDtsZXR0ZXItc3BhY2luZzotLjA1ZW19Lm1hdC1kaXNwbGF5LTMsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ze2ZvbnQ6NDAwIDU2cHgvNTZweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDJlbX0ubWF0LWRpc3BsYXktMiwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTJ7Zm9udDo0MDAgNDVweC80OHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHg7bGV0dGVyLXNwYWNpbmc6LS4wMDVlbX0ubWF0LWRpc3BsYXktMSwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTF7Zm9udDo0MDAgMzRweC80MHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHh9Lm1hdC1ib3R0b20tc2hlZXQtY29udGFpbmVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1idXR0b24sLm1hdC1mYWIsLm1hdC1mbGF0LWJ1dHRvbiwubWF0LWljb24tYnV0dG9uLC5tYXQtbWluaS1mYWIsLm1hdC1yYWlzZWQtYnV0dG9uLC5tYXQtc3Ryb2tlZC1idXR0b257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWJ1dHRvbi10b2dnbGUsLm1hdC1jYXJke2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhcmQtdGl0bGV7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtY2FyZC1jb250ZW50LC5tYXQtY2FyZC1oZWFkZXIgLm1hdC1jYXJkLXRpdGxlLC5tYXQtY2FyZC1zdWJ0aXRsZXtmb250LXNpemU6MTRweH0ubWF0LWNoZWNrYm94e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNoZWNrYm94LWxheW91dCAubWF0LWNoZWNrYm94LWxhYmVse2xpbmUtaGVpZ2h0OjI0cHh9Lm1hdC1jaGlwe2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjE4cHh9Lm1hdC1jaGlwIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24sLm1hdC1jaGlwIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29ue2ZvbnQtc2l6ZToxOHB4fS5tYXQtdGFibGV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtaGVhZGVyLWNlbGx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2VsbCwubWF0LWZvb3Rlci1jZWxse2ZvbnQtc2l6ZToxNHB4fS5tYXQtY2FsZW5kYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2FsZW5kYXItYm9keXtmb250LXNpemU6MTNweH0ubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9ue2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlciB0aHtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo0MDB9Lm1hdC1kaWFsb2ctdGl0bGV7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWV4cGFuc2lvbi1wYW5lbC1jb250ZW50e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCU7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuMTI1O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb257Zm9udC1zaXplOjE1MCU7bGluZS1oZWlnaHQ6MS4xMjV9Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29uLWJ1dHRvbntoZWlnaHQ6MS41ZW07d2lkdGg6MS41ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b24gLm1hdC1pY29ue2hlaWdodDoxLjEyNWVtO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi41ZW0gMDtib3JkZXItdG9wOi44NDM3NWVtIHNvbGlkIHRyYW5zcGFyZW50fS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVye3RvcDotLjg0Mzc1ZW07cGFkZGluZy10b3A6Ljg0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlcntmb250LXNpemU6NzUlO21hcmdpbi10b3A6LjY2NjY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNzkxNjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC13cmFwcGVye3BhZGRpbmctYm90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjQzNzVlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMXB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjNlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzUlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMjgxMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4yNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7bWFyZ2luLXRvcDouNTQxNjdlbTt0b3A6Y2FsYygxMDAlIC0gMS42NjY2N2VtKX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi4yNWVtIDAgLjc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMDkzNzVlbTttYXJnaW4tdG9wOi0uNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzoxZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5le2JvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuODQzNzVlbTttYXJnaW4tdG9wOi0uMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWdyaWQtdGlsZS1mb290ZXIsLm1hdC1ncmlkLXRpbGUtaGVhZGVye2ZvbnQtc2l6ZToxNHB4fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmUsLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LWdyaWQtdGlsZS1oZWFkZXIgLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fWlucHV0Lm1hdC1pbnB1dC1lbGVtZW50e21hcmdpbi10b3A6LS4wNjI1ZW19Lm1hdC1tZW51LWl0ZW17Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXBhZ2luYXRvciwubWF0LXBhZ2luYXRvci1wYWdlLXNpemUgLm1hdC1zZWxlY3QtdHJpZ2dlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHh9Lm1hdC1yYWRpby1idXR0b24sLm1hdC1zZWxlY3R7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2VsZWN0LXRyaWdnZXJ7aGVpZ2h0OjEuMTI1ZW19Lm1hdC1zbGlkZS10b2dnbGUtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwubWF0LXN0ZXBwZXItdmVydGljYWx7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc3RlcC1sYWJlbHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVke2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRhYi1ncm91cHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10YWItbGFiZWwsLm1hdC10YWItbGlua3tmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdG9vbGJhciwubWF0LXRvb2xiYXIgaDEsLm1hdC10b29sYmFyIGgyLC5tYXQtdG9vbGJhciBoMywubWF0LXRvb2xiYXIgaDQsLm1hdC10b29sYmFyIGg1LC5tYXQtdG9vbGJhciBoNntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowfS5tYXQtdG9vbHRpcHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEwcHg7cGFkZGluZy10b3A6NnB4O3BhZGRpbmctYm90dG9tOjZweH0ubWF0LXRvb2x0aXAtaGFuZHNldHtmb250LXNpemU6MTRweDtwYWRkaW5nLXRvcDo5cHg7cGFkZGluZy1ib3R0b206OXB4fS5tYXQtbGlzdC1pdGVtLC5tYXQtbGlzdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjE2cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtbmF2LWxpc3QgLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweH0ubWF0LW9wdGdyb3VwLWxhYmVse2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zaW1wbGUtc25hY2tiYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4fS5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbntsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdHJlZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10cmVlLW5vZGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxNHB4fS5tYXQtcmlwcGxle292ZXJmbG93OmhpZGRlbn1AbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6YWN0aXZlKXsubWF0LXJpcHBsZXtkaXNwbGF5Om5vbmV9fS5tYXQtcmlwcGxlLm1hdC1yaXBwbGUtdW5ib3VuZGVke292ZXJmbG93OnZpc2libGV9Lm1hdC1yaXBwbGUtZWxlbWVudHtwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXItcmFkaXVzOjUwJTtwb2ludGVyLWV2ZW50czpub25lO3RyYW5zaXRpb246b3BhY2l0eSwtd2Via2l0LXRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpO3RyYW5zaXRpb246b3BhY2l0eSx0cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9LmNkay12aXN1YWxseS1oaWRkZW57Ym9yZGVyOjA7Y2xpcDpyZWN0KDAgMCAwIDApO2hlaWdodDoxcHg7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHg7b3V0bGluZTowOy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlciwuY2RrLW92ZXJsYXktY29udGFpbmVye3BvaW50ZXItZXZlbnRzOm5vbmU7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmNkay1vdmVybGF5LWNvbnRhaW5lcntwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LWNvbnRhaW5lcjplbXB0eXtkaXNwbGF5Om5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVye2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LXBhbmV7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6YXV0bztib3gtc2l6aW5nOmJvcmRlci1ib3g7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9LmNkay1vdmVybGF5LWJhY2tkcm9we3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6MTAwMDtwb2ludGVyLWV2ZW50czphdXRvOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDt0cmFuc2l0aW9uOm9wYWNpdHkgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO29wYWNpdHk6MH0uY2RrLW92ZXJsYXktYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjF9QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTouNn19LmNkay1vdmVybGF5LWRhcmstYmFja2Ryb3B7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yODgpfS5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCwuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjB9LmNkay1vdmVybGF5LWNvbm5lY3RlZC1wb3NpdGlvbi1ib3VuZGluZy1ib3h7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47bWluLXdpZHRoOjFweDttaW4taGVpZ2h0OjFweH0uY2RrLWdsb2JhbC1zY3JvbGxibG9ja3twb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO292ZXJmbG93LXk6c2Nyb2xsfS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbHstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0O2FuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0fS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6bm90KDotd2Via2l0LWF1dG9maWxsKXstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmR9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXple3Jlc2l6ZTpub25lfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZS1tZWFzdXJpbmd7aGVpZ2h0OmF1dG8haW1wb3J0YW50O292ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnQ7cGFkZGluZzoycHggMCFpbXBvcnRhbnQ7Ym94LXNpemluZzpjb250ZW50LWJveCFpbXBvcnRhbnR9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXJ7bWFyZ2luOjE2cHggMCA4cHh9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLml0ZW0td3JhcHBlcnttYXgtd2lkdGg6MTVlbTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLml0ZW0td3JhcHBlciwuZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAubWF0ZXJpYWwtaWNvbnN7Y29sb3I6Izk2OTY5Nn0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAuZmlsdGVyLWNvbnRlbnR7bWFyZ2luLXJpZ2h0OjhweH0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAubWF0LWNoaXB7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLnZhbHVlLXdyYXBwZXJ7Y29sb3I6I2VmM2Y1NH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBmaWx0ZXJHcm91cHMgPSBbXTtcblxuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBlZGl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBlZGl0RGVjRmlsdGVyR3JvdXAoJGV2ZW50LCBmaWx0ZXJHcm91cCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmVkaXQuZW1pdChmaWx0ZXJHcm91cCk7XG4gIH1cbiAgcmVtb3ZlRGVjRmlsdGVyR3JvdXAoJGV2ZW50LCBmaWx0ZXJHcm91cCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KGZpbHRlckdyb3VwKTtcbiAgfVxuXG4gIGdldFZhbHVldHlwZSh2YWx1ZSkge1xuXG4gICAgY29uc3QgZmlyc3RWYWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWVbMF0gOiB2YWx1ZTtcblxuICAgIGxldCB0eXBlO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGAke2ZpcnN0VmFsdWV9YC5pbmRleE9mKCcwMDBaJykgPj0gMDpcbiAgICAgICAgdHlwZSA9ICdkYXRlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0eXBlID0gJ2RlZmF1bHQnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZTtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0Q2hpcHNNb2R1bGUsIE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGVjUGVybWlzc2lvbl0nXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25EaXJlY3RpdmUge1xuXG4gIHByaXZhdGUgaGFzVmlldyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGVjUGVybWlzc2lvbihwOiBzdHJpbmdbXSkge1xuICAgIGlmICghcCkge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcbiAgICAgIHRoaXMuaGFzVmlldyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFzUGVybWlzc2lvbihwKTtcbiAgICB9XG4gIH1cblxuICBoYXNQZXJtaXNzaW9uKHApIHtcbiAgICB0aGlzLnNlcnZpY2UudXNlciQuc3Vic2NyaWJlKFxuICAgICAgdXNlciA9PiB7XG4gICAgICAgIGlmICh1c2VyICYmIHRoaXMuaXNBbGxvd2VkQWNjZXNzKHAsIHVzZXIucGVybWlzc2lvbnMpKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhhc1ZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XG4gICAgICAgICAgICB0aGlzLmhhc1ZpZXcgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgICB0aGlzLmhhc1ZpZXcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzQWxsb3dlZEFjY2Vzcyhyb2xlc0FsbG93ZWQ6IHN0cmluZ1tdID0gW10sIGN1cnJlbnRSb2xlczogc3RyaW5nW10gPSBbXSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXRjaGluZ1JvbGUgPSBjdXJyZW50Um9sZXMuZmluZCgodXNlclJvbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJvbGVzQWxsb3dlZC5maW5kKChhbG93ZWRSb2xlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGFsb3dlZFJvbGUgPT09IHVzZXJSb2xlO1xuICAgICAgICB9KSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoaW5nUm9sZSA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1Blcm1pc3Npb25EaXJlY3RpdmUgfSBmcm9tICcuL2RlYy1wZXJtaXNzaW9uLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNQZXJtaXNzaW9uRGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNQZXJtaXNzaW9uRGlyZWN0aXZlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUGVybWlzc2lvbk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWF0Q2hpcHNNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lTW9kdWxlIH0gZnJvbSAnLi8uLi9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUubW9kdWxlJztcbmltcG9ydCB7IERlY1Blcm1pc3Npb25Nb2R1bGUgfSBmcm9tICcuLy4uLy4uLy4uL2RpcmVjdGl2ZXMvcGVybWlzc2lvbi9kZWMtcGVybWlzc2lvbi5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtdGFicy1maWx0ZXIvbGlzdC10YWJzLWZpbHRlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZU1vZHVsZSxcbiAgICBEZWNQZXJtaXNzaW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNMaXN0RmlsdGVyQ29tcG9uZW50LCBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNMaXN0RmlsdGVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvdyB3cmFwXCIgW2Z4TGF5b3V0R2FwXT1cIml0ZW1HYXBcIiA+XG4gIDxkaXYgKm5nRm9yPVwibGV0IHJvdyBvZiByb3dzOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsIHJvdywgcm93cywgaSlcIiBbZnhGbGV4XT1cIml0ZW1XaWR0aFwiPlxuICAgIDxkaXYgW25nU3R5bGVdPVwie21hcmdpbjogaXRlbUdhcH1cIj5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVSZWZcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3Jvdzogcm93IHx8IHt9LCBsaXN0OiByb3dzIHx8IFtdLCBpbmRleDogaX1cIlxuICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBpdGVtV2lkdGggPSAnMjgwcHgnO1xuXG4gIEBJbnB1dCgpIGl0ZW1HYXAgPSAnOHB4JztcblxuICBAT3V0cHV0KCkgcm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfcm93cyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgc2V0IHJvd3ModjogYW55KSB7XG4gICAgaWYgKHRoaXMuX3Jvd3MgIT09IHYpIHtcbiAgICAgIHRoaXMuX3Jvd3MgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvbkl0ZW1DbGljayhldmVudCwgaXRlbSwgbGlzdCwgaW5kZXgpIHtcblxuICAgIHRoaXMucm93Q2xpY2suZW1pdCh7ZXZlbnQsIGl0ZW0sIGxpc3QsIGluZGV4fSk7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYmxlLWNvbHVtbicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCB7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgcHJvcDtcblxuICBASW5wdXQoKSB0aXRsZSA9ICcnO1xuXG4gIEBJbnB1dCgpIHNldCBjb2xTcGFuKHYpIHtcbiAgICBjb25zdCBudW1iZXIgPSArdjtcbiAgICB0aGlzLl9jb2xTcGFuID0gaXNOYU4obnVtYmVyKSA/IDEgOiBudW1iZXI7XG4gIH1cblxuICBnZXQgY29sU3BhbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb2xTcGFuO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29sU3BhbiA9IDE7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9saXN0LXRhYmxlLWNvbHVtbi9saXN0LXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC10YWJsZScsXG4gIHRlbXBsYXRlOiBgPG5neC1kYXRhdGFibGUgI3RhYmxlQ29tcG9uZW50XG4gIGNvbHVtbk1vZGU9XCJmbGV4XCJcbiAgaGVhZGVySGVpZ2h0PVwiMjRweFwiXG4gIHJvd0hlaWdodD1cImF1dG9cIlxuICBbZXh0ZXJuYWxTb3J0aW5nXT1cInRydWVcIlxuICBbbWVzc2FnZXNdPVwie2VtcHR5TWVzc2FnZTonJ31cIlxuICBbcm93c109XCJyb3dzXCJcbiAgKHNvcnQpPVwib25Tb3J0KCRldmVudClcIlxuICAoYWN0aXZhdGUpPVwib25JdGVtQ2xpY2soJGV2ZW50KVwiPlxuXG4gIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnM7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwie3tjb2x1bW4udGl0bGUgfCB0cmFuc2xhdGV9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2ZsZXhHcm93XT1cImNvbHVtbi5jb2xTcGFuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcF09XCJjb2x1bW4ucHJvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3NvcnRhYmxlXT1cImNvbHVtbi5wcm9wID8gdHJ1ZSA6IGZhbHNlXCI+XG5cbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJjb2x1bW4udGVtcGxhdGUgPyB0cnVlIDogZmFsc2VcIlxuICAgICAgbGV0LXJvdz1cInJvd1wiXG4gICAgICBsZXQtaW5kZXg9XCJyb3dJbmRleFwiXG4gICAgICBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGU+XG5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLnRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntyb3c6IHJvdyB8fCB7fSwgbGlzdDogcm93cyB8fCBbXSwgaW5kZXg6IGluZGV4fVwiXG4gICAgICA+PC9uZy1jb250YWluZXI+XG5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG5cbjwvbmd4LWRhdGF0YWJsZT5cbmAsXG4gIHN0eWxlczogW2A6Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLm92ZXJmbG93LXZpc2libGV7b3ZlcmZsb3c6dmlzaWJsZSFpbXBvcnRhbnR9OjpuZy1kZWVwIGRhdGF0YWJsZS1zY3JvbGxlcnt3aWR0aDoxMDAlIWltcG9ydGFudH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUubm8tb3ZlcmZsb3d7b3ZlcmZsb3c6YXV0b306Om5nLWRlZXAgLm5neC1kYXRhdGFibGUubm8tcGFkZGluZyAuZGF0YXRhYmxlLWJvZHktcm93IC5kYXRhdGFibGUtYm9keS1jZWxsIC5kYXRhdGFibGUtYm9keS1jZWxsLWxhYmVse3BhZGRpbmc6MH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1oZWFkZXJ7cGFkZGluZzoxMXB4IDE2cHh9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtaGVhZGVyIC5kYXRhdGFibGUtaGVhZGVyLWNlbGwtbGFiZWx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWJvZHktcm93IC5kYXRhdGFibGUtYm9keS1jZWxse2ZvbnQtc2l6ZToxM3B4O2ZvbnQtd2VpZ2h0OjQwMDtvdmVyZmxvdzpoaWRkZW47bWluLWhlaWdodDoxMDAlO2Rpc3BsYXk6dGFibGU7LXdlYmtpdC11c2VyLXNlbGVjdDppbml0aWFsOy1tb3otdXNlci1zZWxlY3Q6aW5pdGlhbDstbXMtdXNlci1zZWxlY3Q6aW5pdGlhbDstby11c2VyLXNlbGVjdDppbml0aWFsO3VzZXItc2VsZWN0OmluaXRpYWx9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGwgLmRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWx7cGFkZGluZzoxNnB4O2Rpc3BsYXk6dGFibGUtY2VsbDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7d29yZC1icmVhazpicmVhay1hbGx9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGwuY2VsbC10b3AgLmRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWx7dmVydGljYWwtYWxpZ246dG9wfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLXJvdy1kZXRhaWx7cGFkZGluZzoxMHB4fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuc29ydC1idG57d2lkdGg6MDtoZWlnaHQ6MH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmljb24tZG93bntib3JkZXItbGVmdDo1cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjVweCBzb2xpZCB0cmFuc3BhcmVudH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmljb24tdXB7Ym9yZGVyLWxlZnQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDo1cHggc29saWQgdHJhbnNwYXJlbnR9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYmxlQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBzZXQgcm93cyh2KSB7XG4gICAgaWYgKHRoaXMuX3Jvd3MgIT09IHYpIHtcbiAgICAgIHRoaXMuX3Jvd3MgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlQ29tcG9uZW50OiBEYXRhdGFibGVDb21wb25lbnQ7XG5cbiAgY29sdW1uc1NvcnRDb25maWc6IGFueTtcblxuICBwcml2YXRlIF9yb3dzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQpIGNvbHVtbnM6IFF1ZXJ5TGlzdDxEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQ+O1xuXG4gIEBPdXRwdXQoKSBzb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG9uU29ydChldmVudCkge1xuXG4gICAgY29uc3Qgc29ydENvbmZpZyA9IFt7XG4gICAgICBwcm9wZXJ0eTogZXZlbnQuc29ydHNbMF0ucHJvcCxcbiAgICAgIG9yZGVyOiBldmVudC5zb3J0c1swXS5kaXIudG9VcHBlckNhc2UoKVxuICAgIH1dO1xuXG4gICAgaWYgKHNvcnRDb25maWcgIT09IHRoaXMuY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgdGhpcy5jb2x1bW5zU29ydENvbmZpZyA9IHNvcnRDb25maWc7XG5cbiAgICAgIHRoaXMuc29ydC5lbWl0KHRoaXMuY29sdW1uc1NvcnRDb25maWcpO1xuXG4gICAgfVxuXG4gIH1cblxuICBvbkl0ZW1DbGljaygkZXZlbnQpIHtcblxuICAgIGNvbnN0IGV2ZW50ID0gJGV2ZW50O1xuXG4gICAgY29uc3QgaXRlbSA9ICRldmVudC5yb3c7XG5cbiAgICBjb25zdCBsaXN0ID0gdGhpcy5yb3dzO1xuXG4gICAgY29uc3QgaW5kZXggPSAkZXZlbnQucm93LiQkaW5kZXg7XG5cbiAgICB0aGlzLnJvd0NsaWNrLmVtaXQoe2V2ZW50LCBpdGVtLCBsaXN0LCBpbmRleH0pO1xuXG4gIH1cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0R3JpZENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1ncmlkL2xpc3QtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYmxlL2xpc3QtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZmlsdGVyL2xpc3QtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IERlY0xpc3RGZXRjaE1ldGhvZCwgQ291bnRSZXBvcnQgfSBmcm9tICcuL2xpc3QubW9kZWxzJztcbmltcG9ydCB7IEZpbHRlckRhdGEsIERlY0ZpbHRlciwgRmlsdGVyR3JvdXBzLCBGaWx0ZXJHcm91cCB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlciB9IGZyb20gJy4vbGlzdC5tb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdCcsXG4gIHRlbXBsYXRlOiBgPCEtLSBDT01QT05FTlQgTEFZT1VUIC0tPlxuPGRpdiBjbGFzcz1cImxpc3QtY29tcG9uZW50LXdyYXBwZXJcIj5cbiAgPGRpdiAqbmdJZj1cImZpbHRlclwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWZpbHRlclwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJyZXBvcnQgfHwgZmlsdGVyTW9kZSA9PT0gJ2NvbGxhcHNlJ1wiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICAgIDxkaXYgZnhGbGV4IGNsYXNzPVwidGV4dC1yaWdodFwiICpuZ0lmPVwidGFibGVBbmRHcmlkQXJlU2V0KClcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJ0b2dnbGVMaXN0TW9kZSgpXCI+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBhcmlhLWxhYmVsPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgKm5nSWY9XCJsaXN0TW9kZSA9PT0gJ2dyaWQnXCI+dmlld19oZWFkbGluZTwvbWF0LWljb24+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIGdyaWQgbW9kZVwiIGFyaWEtbGFiZWw9XCJTd2l0Y2ggdG8gZ3JpZCBtb2RlXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnICpuZ0lmPVwibGlzdE1vZGUgPT09ICd0YWJsZSdcIj52aWV3X21vZHVsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGZ4RmxleD5cbiAgICAgICAgPGRpdiAqbmdJZj1cImZpbHRlck1vZGUgPT0gJ2NvbGxhcHNlJyB0aGVuIGNvbGxhcHNlVGVtcGxhdGUgZWxzZSB0YWJzVGVtcGxhdGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIEdSSUQgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2dyaWRUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZ3JpZFwiPjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVEFCTEUgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2xpc3RUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtdGFibGVcIj48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIEZPT1RFUiBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjZm9vdGVyVGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgPHAgY2xhc3M9XCJsaXN0LWZvb3RlclwiPlxuICAgIHt7ICdsYWJlbC5hbW91bnQtbG9hZGVkLW9mLXRvdGFsJyB8XG4gICAgICB0cmFuc2xhdGU6e1xuICAgICAgICBsb2FkZWQ6IHJlcG9ydD8ucmVzdWx0Py5yb3dzPy5sZW5ndGgsXG4gICAgICAgIHRvdGFsOiByZXBvcnQ/LnJlc3VsdD8uY291bnRcbiAgICAgIH1cbiAgICB9fVxuICA8L3A+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIENPTExBUFNFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICN0YWJzVGVtcGxhdGU+XG4gIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICA8ZGl2ICpuZ0lmPVwibGlzdE1vZGUgPT0gJ2dyaWQnIHRoZW4gZ3JpZFRlbXBsYXRlIGVsc2UgbGlzdFRlbXBsYXRlXCI+PC9kaXY+XG4gICAgPCEtLSBGT09URVIgQ09OVEVOVCAtLT5cbiAgICA8ZGl2IGZ4RmxleD5cbiAgICAgIDxkaXYgKm5nSWY9XCJzaG93Rm9vdGVyICYmICFsb2FkaW5nIHRoZW4gZm9vdGVyVGVtcGxhdGVcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIExPQURJTkcgU1BJTk5FUiAtLT5cbiAgICA8ZGl2IGZ4RmxleCAqbmdJZj1cImxvYWRpbmdcIiBjbGFzcz1cInRleHQtY2VudGVyIGxvYWRpbmctc3Bpbm5lci13cmFwcGVyXCI+XG4gICAgICA8ZGVjLXNwaW5uZXI+PC9kZWMtc3Bpbm5lcj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIExPQUQgTU9SRSBCVVRUT04gLS0+XG4gICAgPGRpdiBmeEZsZXggKm5nSWY9XCIhaXNMYXN0UGFnZSAmJiAhbG9hZGluZyAmJiAhZGlzYWJsZVNob3dNb3JlQnV0dG9uXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gKGNsaWNrKT1cInNob3dNb3JlKClcIj57eydsYWJlbC5zaG93LW1vcmUnIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIENPTExBUFNFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNjb2xsYXBzZVRlbXBsYXRlPlxuICA8bWF0LWFjY29yZGlvbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgY29sbGFwc2FibGVGaWx0ZXJzLmNoaWxkcmVuXCI+XG4gICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbCAob3BlbmVkKT1cInNlYXJjaENvbGxhcHNhYmxlKGZpbHRlcilcIj5cbiAgICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZS10aXRsZVwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIzMnB4XCIgZnhMYXlvdXRBbGlnbj1cImxlZnQgY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGZ4RmxleD1cIjk2cHhcIiAqbmdJZj1cImNvdW50UmVwb3J0XCI+XG4gICAgICAgICAgICAgIDxkZWMtbGFiZWwgW2NvbG9ySGV4XT1cImZpbHRlci5jb2xvclwiPnt7IGdldENvbGxhcHNhYmxlQ291bnQoZmlsdGVyLnVpZCkgfX08L2RlYy1sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3sgJ2xhYmVsLicgKyBmaWx0ZXIubGFiZWwgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNlbGVjdGVkQ29sbGFwc2FibGUgPT09IGZpbHRlci51aWRcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYnNUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9tYXQtYWNjb3JkaW9uPlxuICA8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWJvdHRvbS1tYXJnaW5cIj48L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW2AubGlzdC1mb290ZXJ7Zm9udC1zaXplOjE0cHg7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpc3QtY29tcG9uZW50LXdyYXBwZXJ7bWluLWhlaWdodDo3MnB4fS50ZXh0LXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9LmxvYWRpbmctc3Bpbm5lci13cmFwcGVye3BhZGRpbmc6MzJweH0uY29sbGFwc2UtdGl0bGV7d2lkdGg6MTAwJX0uYWNjb3JkaW9uLWJvdHRvbS1tYXJnaW57bWFyZ2luLWJvdHRvbToxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuXG4gIC8qXG4gICogY291bnRSZXBvcnRcbiAgKlxuICAqXG4gICovXG4gIGNvdW50UmVwb3J0OiBDb3VudFJlcG9ydDtcblxuICAvKlxuICAqIGZpbHRlck1vZGVcbiAgKlxuICAqXG4gICovXG4gIGZpbHRlck1vZGU6ICd0YWJzJyB8ICdjb2xsYXBzZScgPSAndGFicyc7XG5cblxuICAvKlxuICAqIGNvbGxhcHNhYmxlRmlsdGVyc1xuICAqXG4gICpcbiAgKi9cbiAgY29sbGFwc2FibGVGaWx0ZXJzOiB7IHRhYjogc3RyaW5nLCBjaGlsZHJlbjogRGVjTGlzdEZpbHRlcltdIH07XG5cbiAgLypcbiAgICogbG9hZGluZ1xuICAgKlxuICAgKlxuICAgKi9cbiAgc2V0IGxvYWRpbmcodikge1xuXG4gICAgdGhpcy5fbG9hZGluZyA9IHY7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIubG9hZGluZyA9IHY7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBsb2FkaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICB9XG5cbiAgLypcbiAgICogZmlsdGVyR3JvdXBzXG4gICAqXG4gICAqXG4gICAqL1xuICBnZXQgZmlsdGVyR3JvdXBzKCk6IEZpbHRlckdyb3VwcyB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyID8gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzIDogW107XG4gIH1cblxuICAvKlxuICAgKiBzZWxlY3RlZENvbGxhcHNhYmxlXG4gICAqXG4gICAqXG4gICAqL1xuICBzZWxlY3RlZENvbGxhcHNhYmxlO1xuXG4gIC8qXG4gICAqIHJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcmVwb3J0O1xuXG4gIC8qXG4gICAqIGlzTGFzdFBhZ2VcbiAgICpcbiAgICpcbiAgICovXG4gIGlzTGFzdFBhZ2U6IGJvb2xlYW47XG5cbiAgLypcbiAgKiBzZWxlY3RlZFRhYlxuICAqXG4gICpcbiAgKi9cbiAgc2VsZWN0ZWRUYWI6IGFueTtcblxuICAvKlxuICAqIHByZXZpb3VzU2VsZWN0ZWRUYWJcbiAgKlxuICAqXG4gICovXG4gIHByZXZpb3VzU2VsZWN0ZWRUYWI6IGFueTtcblxuICAvKlxuICAgKiBmaWx0ZXJEYXRhXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGZpbHRlckRhdGE6IFN1YmplY3Q8RmlsdGVyRGF0YT4gPSBuZXcgU3ViamVjdDxGaWx0ZXJEYXRhPigpO1xuXG4gIC8qXG4gICAqIF9sb2FkaW5nO1xuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfbG9hZGluZyA9IHRydWU7XG5cbiAgLypcbiAgICogY2xlYXJBbmRSZWxvYWRSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgY2xlYXJBbmRSZWxvYWRSZXBvcnQ7XG5cbiAgLypcbiAgICogZmlsdGVyU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHJlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlYWN0aXZlUmVwb3J0OiBPYnNlcnZhYmxlPGFueT47XG5cbiAgLypcbiAgICogcmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiBzY3JvbGxhYmxlQ29udGFpbmVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbGFibGVDb250YWluZXI6IEVsZW1lbnQ7XG5cbiAgLypcbiAgICogc2Nyb2xsRXZlbnRFbWl0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnRFbWl0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiBzY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHRhYnNDaGFuZ2VTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdGFic0NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHRhYmxlU29ydFN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB0YWJsZVNvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiBwYXlsb2FkXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHBheWxvYWQ6IERlY0ZpbHRlcjtcblxuICAvKlxuICAgKiBfZW5kcG9pbnQgaW50ZXJuYWxsXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9lbmRwb2ludDogc3RyaW5nO1xuXG4gIC8qXG4gICAqIF9maWx0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2ZpbHRlcjogRGVjTGlzdEZpbHRlckNvbXBvbmVudDtcblxuICAvKlxuICAgKiBfbmFtZVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuXG4gIC8qXG4gICAqIGN1c3RvbUZldGNoTWV0aG9kXG4gICAqXG4gICAqIG1ldGhvZCB1c2VkIHRvIGZldGNoIGRhdGEgZnJvbSBiYWNrLWVuZFxuICAgKi9cbiAgQElucHV0KCkgY3VzdG9tRmV0Y2hNZXRob2Q6IERlY0xpc3RGZXRjaE1ldGhvZDtcblxuICAvKlxuICAgKiBjb2x1bW5zU29ydENvbmZpZ1xuICAgKlxuICAgKiB1c2VkIHRvIGdldCBhIHNvcnRlZCBsaXN0IGZyb20gYmFja2VuZFxuICAgKiBjYW4gYmUgcGFzZWQgdmlhIGF0dHJpYnV0ZSB0byBzb3J0IHRoZSBmaXJzdCBsb2FkXG4gICAqL1xuICBASW5wdXQoKSBjb2x1bW5zU29ydENvbmZpZztcblxuICAvKlxuICAgKiBkaXNhYmxlU2hvd01vcmVCdXR0b25cbiAgICpcbiAgICogdXNlZCB0byBoaWRlIHRoZSBzaG93IG1vcmUgYnV0dG9uXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlU2hvd01vcmVCdXR0b246IGJvb2xlYW47XG5cbiAgLypcbiAgICogZW5kcG9pbnRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBlbmRwb2ludCh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fZW5kcG9pbnQgIT09IHYpIHtcbiAgICAgIHRoaXMuX2VuZHBvaW50ID0gKHZbMF0gJiYgdlswXSA9PT0gJy8nKSA/IHYucmVwbGFjZSgnLycsICcnKSA6IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGVuZHBvaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZHBvaW50O1xuICB9XG5cbiAgLypcbiAgICogbmFtZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG5hbWUodjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX25hbWUgIT09IHYpIHtcbiAgICAgIHRoaXMuX25hbWUgPSB2O1xuICAgICAgdGhpcy5zZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIC8qXG4gICAqIHJvd3NcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgncm93cycpXG5cbiAgc2V0IHJvd3Mocm93cykge1xuICAgIHRoaXMuc2V0Um93cyhyb3dzKTtcbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLnJlcG9ydCA/IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLypcbiAgICogbGltaXRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpbWl0ID0gMTA7XG5cbiAgLypcbiAgICogbGlzdE1vZGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpc3RNb2RlO1xuXG4gIC8qXG4gICAqIHNjcm9sbGFibGVDb250YWluZXJDbGFzc1xuICAgKlxuICAgKiBXaGVyZSB0aGUgc2Nyb2xsIHdhdGNoZXIgc2hvdWxkIGJlIGxpc3RlbmluZ1xuICAgKi9cbiAgQElucHV0KCkgc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzID0gJ21hdC1zaWRlbmF2LWNvbnRlbnQnO1xuXG4gIC8qXG4gICAqIHNlYXJjaGFibGVQcm9wZXJ0aWVzXG4gICAqXG4gICAqIFByb3BlcnRpZXMgdG8gYmUgc2VhcmNoZWQgd2hlbiB1c2luZyBiYXNpYyBzZWFyY2hcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaGFibGVQcm9wZXJ0aWVzOiBzdHJpbmdbXTtcblxuICAvKlxuICAgKiBzaG93Rm9vdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBzaG93Rm9vdGVyID0gdHJ1ZTtcblxuICAvKlxuICAgKiBwb3N0U2VhcmNoXG4gICAqXG4gICAqIFRoaXMgbWlkZGxld2FyZSBpcyB1c2VkIHRvIHRyaWdnZXIgZXZlbnRzIGFmdGVyIGV2ZXJ5IHNlYXJjaFxuICAgKi9cbiAgQE91dHB1dCgpIHBvc3RTZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiByb3dDbGlja1xuICAgKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIGEgcm93IG9yIGNhcmQgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpIHJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIGdyaWRcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEdyaWRDb21wb25lbnQpIGdyaWQ6IERlY0xpc3RHcmlkQ29tcG9uZW50O1xuXG4gIC8qXG4gICAqIHRhYmxlXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RUYWJsZUNvbXBvbmVudCkgdGFibGU6IERlY0xpc3RUYWJsZUNvbXBvbmVudDtcblxuICAvKlxuICAgKiBmaWx0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEZpbHRlckNvbXBvbmVudClcbiAgc2V0IGZpbHRlcih2OiBEZWNMaXN0RmlsdGVyQ29tcG9uZW50KSB7XG4gICAgaWYgKHRoaXMuX2ZpbHRlciAhPT0gdikge1xuICAgICAgdGhpcy5fZmlsdGVyID0gdjtcbiAgICAgIHRoaXMuc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGZpbHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVyO1xuICB9XG5cbiAgLypcbiAgICogbmdPbkluaXRcbiAgICpcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHsgfVxuXG4gIC8qXG4gICAqIG5nT25Jbml0XG4gICAqXG4gICAqIFN0YXJ0cyBhIGZyZXNoIGNvbXBvbmVudCBhbmQgcHJlcGFyZSBpdCB0byBydW5cbiAgICpcbiAgICogLSBTdGFydCB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3Vic2NyaWJlIHRvIHRoZSBSZWFjdGl2ZSBSZXBvcnRcbiAgICogLSBTdGFydCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gRW5zdXJlIHVuaXF1ZSBuYW1lXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhdGNoRmlsdGVyRGF0YSgpO1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlTmFtZSgpO1xuICAgIHRoaXMuZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKTtcbiAgfVxuXG4gIC8qXG4gICogbmdBZnRlclZpZXdJbml0XG4gICpcbiAgKiBXYWl0IGZvciB0aGUgc3ViY29tcG9uZW50cyB0byBzdGFydCBiZWZvcmUgcnVuIHRoZSBjb21wb25lbnRcbiAgKlxuICAqIC0gU3RhcnQgd2F0Y2hpbmcgRmlsdGVyXG4gICogLSBEbyB0aGUgZmlyc3QgbG9hZFxuICAqL1xuIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgIHRoaXMud2F0Y2hGaWx0ZXIoKTtcbiAgIHRoaXMuZG9GaXJzdExvYWQoKTtcbiAgIHRoaXMuZGV0ZWN0TGlzdE1vZGUoKTtcbiAgIHRoaXMud2F0Y2hUYWJzQ2hhbmdlKCk7XG4gICB0aGlzLndhdGNoVGFibGVTb3J0KCk7XG4gICB0aGlzLnJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpO1xuICAgdGhpcy53YXRjaFNjcm9sbCgpO1xuICAgdGhpcy53YXRjaFNjcm9sbEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgLypcbiAgICogbmdPbkRlc3Ryb3lcbiAgICpcbiAgICogRGVzdHJveSB3YXRjaGVyIHRvIGZyZWUgbWVlbW9yeSBhbmQgcmVtb3ZlIHVubmVjZXNzYXJ5IHRyaWdnZXJzXG4gICAqXG4gICAqIC0gVW5zdWJzY3JpYmUgZnJvbSB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3RvcCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gU3RvcCB3YXRjaGluZyBGaWx0ZXJcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGwoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ0ZpbHRlcigpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFic0NoYW5nZSgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFibGVTb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIHJlbG9hZENvdW50UmVwb3J0XG4gICAqXG4gICAqL1xuICByZWxvYWRDb3VudFJlcG9ydCgpIHtcblxuICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci5maWx0ZXJzICYmIHRoaXMuZmlsdGVyLmxvYWRDb3VudFJlcG9ydCkge1xuXG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZW5kcG9pbnRbdGhpcy5lbmRwb2ludC5sZW5ndGggLSAxXSA9PT0gJy8nID8gYCR7dGhpcy5lbmRwb2ludH1jb3VudGAgOiBgJHt0aGlzLmVuZHBvaW50fS9jb3VudGA7XG5cbiAgICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmZpbHRlci5maWx0ZXJzO1xuXG4gICAgICBjb25zdCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzID0gdGhpcy5nZXRDb3VudGFibGVGaWx0ZXJzKGZpbHRlcnMpO1xuXG4gICAgICB0aGlzLnNlcnZpY2UucG9zdChlbmRwb2ludCwgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcylcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICB0aGlzLmNvdW50UmVwb3J0ID0gdGhpcy5tb3VudENvdW50UmVwb3J0KHJlcyk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIuY291bnRSZXBvcnQgPSB0aGlzLmNvdW50UmVwb3J0O1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogcmVtb3ZlSXRlbVxuICAgKlxuICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgbGlzdFxuICAgKi9cbiAgcmVtb3ZlSXRlbShpZCkge1xuXG4gICAgY29uc3QgaXRlbSA9IHRoaXMucm93cy5maW5kKF9pdGVtID0+IF9pdGVtLmlkID09PSBpZCk7XG5cbiAgICBpZiAoaXRlbSkge1xuXG4gICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLnJvd3MuaW5kZXhPZihpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1JbmRleCA+PSAwKSB7XG5cbiAgICAgICAgdGhpcy5yb3dzLnNwbGljZShpdGVtSW5kZXgsIDEpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbmRwb2ludCkge1xuXG4gICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlc3RhcnRcbiAgICpcbiAgICogQ2xlYXIgdGhlIGxpc3QgYW5kIHJlbG9hZCB0aGUgZmlyc3QgcGFnZVxuICAgKi9cbiAgcmVzdGFydCgpIHtcblxuICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKTtcblxuICB9XG5cbiAgLypcbiAgICogc2hvd01vcmVcbiAgICpcbiAgICovXG4gIHNob3dNb3JlKCkge1xuXG4gICAgcmV0dXJuIHRoaXMubG9hZFJlcG9ydCgpO1xuXG4gIH1cblxuICAvKlxuICAgKiBzZWFyY2hDb2xsYXBzYWJsZVxuICAgKlxuICAgKiBzZWFyY2ggYnkgY29sbGFwc2FibGUgZmlsdGVyXG4gICAqL1xuICBzZWFyY2hDb2xsYXBzYWJsZShmaWx0ZXI6IERlY0xpc3RGaWx0ZXIpIHtcblxuICAgIGlmICh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgIT09IGZpbHRlci51aWQpIHtcblxuICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UoZmlsdGVyLnVpZCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHRhYmxlQW5kR3JpZEFyZVNldFxuICAgKlxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGVyZSBhcmUgYm90aCBHUklEIGFuZCBUQUJMRSBkZWZpbml0aW9uIGluc2lkZSB0aGUgbGlzdFxuICAgKi9cbiAgdGFibGVBbmRHcmlkQXJlU2V0KCkge1xuICAgIHJldHVybiB0aGlzLmdyaWQgJiYgdGhpcy50YWJsZTtcbiAgfVxuXG4gIC8qXG4gICAqIHRvZ2dsZUxpc3RNb2RlXG4gICAqXG4gICAqIENoYW5nZXMgYmV0d2VlbiBHUklEIGFuZCBUQUJMRSB2aXN1YWxpemF0b2luIG1vZGVzXG4gICAqL1xuICB0b2dnbGVMaXN0TW9kZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID09PSAnZ3JpZCcgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gICAgaWYgKHRoaXMubGlzdE1vZGUgPT09ICd0YWJsZScpIHtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgdGhpcy50YWJsZS50YWJsZUNvbXBvbmVudC5yZWNhbGN1bGF0ZSgpO1xuXG4gICAgICB9LCAxKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogZ2V0Q29sbGFwc2FibGVDb3VudFxuICAgKlxuICAgKiBnZXQgQ29sbGFwc2FibGUgQ291bnQgZnJvbSBjb3VudFJlcG9ydFxuICAgKi9cbiAgZ2V0Q29sbGFwc2FibGVDb3VudCh1aWQpIHtcblxuICAgIHRyeSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmNvdW50UmVwb3J0W3RoaXMuc2VsZWN0ZWRUYWJdLmNoaWxkcmVuW3VpZF0uY291bnQ7XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICByZXR1cm4gJz8nO1xuXG4gICAgfVxuXG5cbiAgfVxuXG4gIC8qXG4gICBnZXRMaXN0TW9kZVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRMaXN0TW9kZSA9ICgpID0+IHtcblxuICAgIGxldCBsaXN0TW9kZSA9IHRoaXMubGlzdE1vZGU7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZFRhYiAmJiB0aGlzLnNlbGVjdGVkVGFiLmxpc3RNb2RlKSB7XG5cbiAgICAgICAgbGlzdE1vZGUgPSB0aGlzLnNlbGVjdGVkVGFiLmxpc3RNb2RlO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxpc3RNb2RlID0gdGhpcy50YWJsZSA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBsaXN0TW9kZTtcblxuICB9XG5cbiAgLypcbiAgIG1vdW50Q291bnRSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgbW91bnRDb3VudFJlcG9ydChmaWx0ZXJzQ291bnRlcnMpOiBDb3VudFJlcG9ydCB7XG5cbiAgICBjb25zdCBjb3VudFJlcG9ydDogQ291bnRSZXBvcnQgPSB7XG4gICAgICBjb3VudDogMFxuICAgIH07XG5cbiAgICBmaWx0ZXJzQ291bnRlcnMuZm9yRWFjaChpdGVtID0+IHtcblxuICAgICAgY291bnRSZXBvcnRbaXRlbS51aWRdID0ge1xuXG4gICAgICAgIGNvdW50OiBpdGVtLmNvdW50XG5cbiAgICAgIH07XG5cbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgY291bnRSZXBvcnRbaXRlbS51aWRdLmNoaWxkcmVuID0gdGhpcy5tb3VudENvdW50UmVwb3J0KGl0ZW0uY2hpbGRyZW4pO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudFJlcG9ydDtcblxuICB9XG5cbiAgLypcbiAgICogZ2V0Q291bnRhYmxlRmlsdGVyc1xuICAgKlxuICAgKiBHZXQgdGhlIHNlYXJjaCBmaWx0ZXIsIHRybnNmb3JtZSB0aGUgc2VhcmNoIHBhcmFtcyBpbnRvIHRoZSBzZWFyY2hhYmxlIHByb3BlcnRpZXMgYW5kIGluamVjdCBpdCBpbiBldmVyeSBmaWx0ZXIgY29uZmlndXJlZCBpbiBkZWMtZmlsdGVyc1xuICAgKlxuICAgKiBUaGUgcmVzdWx0IGlzIHVzZWQgdG8gY2FsbCB0aGUgY291bnQgZW5kcG9pbnQgYW5kIHJldHVybiB0aGUgYW1vdW50IG9mIHJlY2NvcmRzIGZvdW5kIGluIGV2ZXJ5IHRhYi9jb2xsYXBzZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRDb3VudGFibGVGaWx0ZXJzKGZpbHRlcnMpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgfHwgW3tmaWx0ZXJzOiBbXX1dO1xuXG4gICAgY29uc3QgZmlsdGVyc1BsdXNTZWFyY2ggPSBmaWx0ZXJzLm1hcChkZWNGaWx0ZXIgPT4ge1xuXG4gICAgICBjb25zdCBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGVjRmlsdGVyKSk7XG5cbiAgICAgIGlmIChkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzKSB7XG5cbiAgICAgICAgY29uc3QgdGFiRmlsdGVyc0NvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMpKTtcblxuICAgICAgICBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWx0ZXJHcm91cHNXaXRob3V0VGFicykpO1xuXG4gICAgICAgIGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMuZm9yRWFjaChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzLnB1c2goLi4udGFiRmlsdGVyc0NvcHkpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2UgaWYgKGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4gPSB0aGlzLmdldENvdW50YWJsZUZpbHRlcnMoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4pO1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVpZDogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2gudWlkLFxuICAgICAgICBmaWx0ZXJzOiBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzLFxuICAgICAgICBjaGlsZHJlbjogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4sXG4gICAgICB9O1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5lbnN1cmVGaWx0ZXJWYWx1ZXNBc0FycmF5KGZpbHRlcnNQbHVzU2VhcmNoKTtcblxuICB9XG5cbiAgLypcbiAgICogZW5zdXJlRmlsdGVyVmFsdWVzQXNBcnJheVxuICAgKlxuICAgKiBHZXQgYW4gYXJyYXkgb2YgZmlsdGVyZ3JvdXBzIGFuZCBzZXQgdGhlIGZpbHRlciB2YWx1ZXMgdG8gYXJyYXkgaWYgbm90XG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVuc3VyZUZpbHRlclZhbHVlc0FzQXJyYXkoZmlsdGVyR3JvdXBzOiBhbnkgPSBbXSkge1xuXG4gICAgcmV0dXJuIGZpbHRlckdyb3Vwcy5tYXAoZGVjTGlzdEZpbHRlciA9PiB7XG5cbiAgICAgIGlmIChkZWNMaXN0RmlsdGVyLmZpbHRlcnMpIHtcblxuICAgICAgICB0aGlzLmFwcGVuZEZpbHRlckdyb3Vwc0Jhc2VkT25TZWFyY2hhYmxlUHJvcGVydGllcyhkZWNMaXN0RmlsdGVyLmZpbHRlcnMpO1xuXG4gICAgICAgIGRlY0xpc3RGaWx0ZXIuZmlsdGVycyA9IGRlY0xpc3RGaWx0ZXIuZmlsdGVycy5tYXAoZmlsdGVyR3JvdXAgPT4ge1xuXG5cbiAgICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzID0gZmlsdGVyR3JvdXAuZmlsdGVycy5tYXAoZmlsdGVyID0+IHtcblxuICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gQXJyYXkuaXNBcnJheShmaWx0ZXIudmFsdWUpID8gZmlsdGVyLnZhbHVlIDogW2ZpbHRlci52YWx1ZV07XG5cbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBmaWx0ZXJHcm91cDtcblxuICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVjTGlzdEZpbHRlcjtcblxuICAgIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBhY3RCeVNjcm9sbFBvc2l0aW9uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGRldGVjdCBpZiB0aGVyZSBpcyBzY3Jvb2xpbmcgYWN0aW9uIG9uIHdpbmRvdyB0byBmZXRjaCBhbmQgc2hvdyBtb3JlIHJvd3Mgd2hlbiB0aGUgc2Nyb2xsaW5nIGRvd24uXG4gICAqL1xuICBwcml2YXRlIGFjdEJ5U2Nyb2xsUG9zaXRpb24gPSAoJGV2ZW50KSA9PiB7XG5cbiAgICBpZiAoJGV2ZW50WydwYXRoJ10pIHtcblxuICAgICAgY29uc3QgZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MgPSAkZXZlbnRbJ3BhdGgnXS5maW5kKHBhdGggPT4ge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHBhdGhbJ2NsYXNzTmFtZSddIHx8ICcnO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZU92ZXJsYXkgPSBjbGFzc05hbWUuaW5kZXhPZignY2RrLW92ZXJsYXknKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZUZ1bGxzY3JlYW5EaWFsb2dDb250YWluZXIgPSBjbGFzc05hbWUuaW5kZXhPZignZnVsbHNjcmVhbi1kaWFsb2ctY29udGFpbmVyJykgPj0gMDtcblxuICAgICAgICByZXR1cm4gaW5zaWRlT3ZlcmxheSB8fCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyO1xuXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFlbGVtZW50V2l0aENka092ZXJsYXlDbGFzcykgeyAvLyBhdm9pZCBjbG9zaW5nIGZpbHRlciBmcm9tIGFueSBvcGVuIGRpYWxvZ1xuXG4gICAgICAgIGlmICghdGhpcy5pc0xhc3RQYWdlKSB7XG5cbiAgICAgICAgICBjb25zdCB0YXJnZXQ6IGFueSA9ICRldmVudFsndGFyZ2V0J107XG5cbiAgICAgICAgICBjb25zdCBsaW1pdCA9IHRhcmdldC5zY3JvbGxIZWlnaHQgLSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKHRhcmdldC5zY3JvbGxUb3AgPj0gKGxpbWl0IC0gMTYpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd01vcmUoKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlXG4gICAqXG4gICBnZXRMaXN0TW9kZSBpbnB1dFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZSgpIHtcblxuICAgIHRoaXMuZ2V0TGlzdE1vZGUoKTtcblxuICB9XG5cbiAgLypcbiAgICogZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKVxuICAgKlxuICAgKiBTZXQgdGhlIGxpc3QgbW9kZSBiYXNlZCBvbiBkZWNsYXJhdGlvbiBvZiB0YWJsZSBhbmQgZ3JpZC4gVGhpcyBpcyBuZWNlc3NhcnkgdG8gYm9vdGFzdHJhcCB0aGUgY29tcG9uZW50IHdpdGggb25seSBncmlkIG9yIG9ubHkgdGFibGVcbiAgICogVGhpcyBvbmx5IHdvcmsgaWYgbm8gbW9kZSBpcyBwcm92aWRlZCBieSBASW5wdXQgb3RoZXJ3aXNlIHRoZSBASW5wdXQgdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAqL1xuICBwcml2YXRlIGRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKCkge1xuXG4gICAgdGhpcy5saXN0TW9kZSA9IHRoaXMubGlzdE1vZGUgPyB0aGlzLmxpc3RNb2RlIDogdGhpcy50YWJsZSA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGVtaXRTY3JvbGxFdmVudFxuICAgKlxuICAgKiBFbWl0cyBzY3JvbGwgZXZlbnQgd2hlbiBub3QgbG9hZGluZ1xuICAgKi9cbiAgcHJpdmF0ZSBlbWl0U2Nyb2xsRXZlbnQgPSAoJGV2ZW50KSA9PiB7XG5cbiAgICBpZiAoIXRoaXMubG9hZGluZykge1xuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyLmVtaXQoJGV2ZW50KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogaXNUYWJzRmlsdGVyRGVmaW5lZFxuICAgKlxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgVGFicyBGaWx0ZXIgaXMgZGVmaW5lZCBpbnNpZGUgdGhlIGxpc3RcbiAgICovXG4gIHByaXZhdGUgaXNUYWJzRmlsdGVyRGVmaW5lZCgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIC8qXG4gICAqIGRvRmlyc3RMb2FkXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhZnRlciB0aGUgdmlldyBhbmQgaW5wdXRzIGFyZSBpbml0aWFsaXplZFxuICAgKlxuICAgKiBUaGlzIGlzIHRoZSBmaXJzdCBjYWxsIHRvIGdldCBkYXRhXG4gICAqL1xuICBwcml2YXRlIGRvRmlyc3RMb2FkKCkge1xuICAgIGlmICh0aGlzLmlzVGFic0ZpbHRlckRlZmluZWQoKSkge1xuICAgICAgdGhpcy5kb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvRmlyc3RMb2FkTG9jYWxseSh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlclxuICAgKlxuICAgKiB1c2UgdGhlIHRhYnMgZmlsdGVyIHRvIHRyaWdnZXIgdGhlIGZpcnN0IGxvYWRcbiAgICpcbiAgICogVGhpcyB3YXkgdGhlIGRlZmF1bHQgdGFiIGFuZCBmaWx0ZXIgYXJlIHNlbGVjdGVkIGJ5IHRoZSBkZWN0YWJzRmlsdGVyIGNvbXBvbmVudFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlcigpIHtcbiAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LmRvRmlyc3RMb2FkKCk7XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZExvY2FsbHlcbiAgICpcbiAgICogSWYgbm8gZmlsdGVyIGFyZSBkZWZpbmVkLCBqdXN0IGNhbGwgdGggZWVuZHBvaW50IHdpdGhvdXQgZmlsdGVyc1xuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZExvY2FsbHkocmVmcmVzaCkge1xuICAgIHRoaXMubG9hZFJlcG9ydChyZWZyZXNoKTtcbiAgfVxuXG4gIC8qXG4gICAqIGVuc3VyZVVuaXF1ZU5hbWVcbiAgICpcbiAgICogV2UgbXVzdCBwcm92aWRlIGFuIHVuaXF1ZSBuYW1lIHRvIHRoZSBsaXN0IHNvIHdlIGNhbiBwZXJzaXN0IGl0cyBzdGF0ZSBpbiB0aGUgVVJMIHdpdGhvdXQgY29uZmxpY3RzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVuc3VyZVVuaXF1ZU5hbWUoKSB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gJ0xpc3RDb21wb25lbnRFcnJvcjogVGhlIGxpc3QgY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZSB0byBiZSB1c2VkIGluIHVybCBmaWx0ZXIuJ1xuICAgICAgKyAnIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50Lic7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRCeU9wZW5uZWRDb2xsYXBzZVxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyB0cmlnZ2VyZWQgd2hlbiBhIGNvbGxhcHNhYmxlIHRhYmxlIGlzIG9wZW4uXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGxvYWRCeU9wZW5uZWRDb2xsYXBzZShmaWx0ZXJVaWQpIHtcblxuICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzLmNoaWxkcmVuLmZpbmQoaXRlbSA9PiBpdGVtLnVpZCA9PT0gZmlsdGVyVWlkKTtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwOiBGaWx0ZXJHcm91cCA9IHsgZmlsdGVyczogZmlsdGVyLmZpbHRlcnMgfTtcblxuICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlLCBmaWx0ZXJHcm91cCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlID0gZmlsdGVyLnVpZDtcblxuICAgIH0sIDApO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRSZXBvcnRcbiAgICpcbiAgICogVGhpcyBtZWh0b2QgZ2F0aGVyIHRoZSBmaWx0ZXIgaW5mbyBhbmQgZW5kcG9pbnQgYW5kIGNhbGwgdGhlIGJhY2stZW5kIHRvIGZldGNoIHRoZSBkYXRhXG4gICAqXG4gICAqIElmIHRoZSBzdWN0b21GZXRjaE1ldGhvZCBpcyB1c2VkLCBpdHMgY2FsbCBpdFxuICAgKlxuICAgKiBJZiBvbmx5IHRoZSByb3dzIGFyZSBwYXNzZWQsIHRoZSBtZXRob2QganVzdCB1c2UgaXQgYXMgcmVzdWx0XG4gICAqL1xuICBwcml2YXRlIGxvYWRSZXBvcnQoY2xlYXJBbmRSZWxvYWRSZXBvcnQ/OiBib29sZWFuLCBjb2xsYXBzZUZpbHRlckdyb3Vwcz86IEZpbHRlckdyb3VwKTogUHJvbWlzZTxhbnk+IHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgaWYgKGNsZWFyQW5kUmVsb2FkUmVwb3J0ICYmIHRoaXMucm93cykge1xuXG4gICAgICAgIHRoaXMuc2V0Um93cyh0aGlzLnJvd3MpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xlYXJBbmRSZWxvYWRSZXBvcnQgPSBjbGVhckFuZFJlbG9hZFJlcG9ydDtcblxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMuZW5kcG9pbnQpIHtcblxuICAgICAgICB0aGlzLm1vdW50UGF5bG9hZChjbGVhckFuZFJlbG9hZFJlcG9ydCwgY29sbGFwc2VGaWx0ZXJHcm91cHMpXG4gICAgICAgIC50aGVuKHBheWxvYWQgPT4ge1xuXG4gICAgICAgICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZDtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YS5uZXh0KHsgZW5kcG9pbnQ6IHRoaXMuZW5kcG9pbnQsIHBheWxvYWQ6IHRoaXMucGF5bG9hZCwgY2JrOiByZXMsIGNsZWFyOiBjbGVhckFuZFJlbG9hZFJlcG9ydCB9KTtcblxuICAgICAgICB9KTtcblxuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QpIHtcblxuICAgICAgICB0aGlzLmZpbHRlckRhdGEubmV4dCgpO1xuXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnJvd3MpIHtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgIGlmICghdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgICAgIHJlaignTm8gZW5kcG9pbnQsIGN1c3RvbUZldGNoTWV0aG9kIG9yIHJvd3Mgc2V0Jyk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICB9LCAxKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgbW91bnRQYXlsb2FkKGNsZWFyQW5kUmVsb2FkUmVwb3J0OiBib29sZWFuID0gZmFsc2UsIGNvbGxhcHNlRmlsdGVyR3JvdXBzPykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgY29uc3Qgc2VhcmNoRmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXIgPyB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHMgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGNvbnN0IGZpbHRlckdyb3VwcyA9IHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzVG9FYWNoRmlsdGVyR3JvdXAoc2VhcmNoRmlsdGVyR3JvdXBzLCBjb2xsYXBzZUZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIGNvbnN0IHBheWxvYWQ6IERlY0ZpbHRlciA9IHt9O1xuXG4gICAgICBwYXlsb2FkLmxpbWl0ID0gdGhpcy5saW1pdDtcblxuICAgICAgaWYgKGZpbHRlckdyb3Vwcykge1xuXG4gICAgICAgIHBheWxvYWQuZmlsdGVyR3JvdXBzID0gZmlsdGVyR3JvdXBzO1xuXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbHVtbnNTb3J0Q29uZmlnKSB7XG5cbiAgICAgICAgcGF5bG9hZC5zb3J0ID0gdGhpcy5jb2x1bW5zU29ydENvbmZpZztcblxuICAgICAgfVxuXG4gICAgICBpZiAoIWNsZWFyQW5kUmVsb2FkUmVwb3J0ICYmIHRoaXMucmVwb3J0KSB7XG5cbiAgICAgICAgcGF5bG9hZC5wYWdlID0gdGhpcy5yZXBvcnQucGFnZSArIDE7XG5cbiAgICAgICAgcGF5bG9hZC5saW1pdCA9IHRoaXMucmVwb3J0LmxpbWl0O1xuXG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUocGF5bG9hZCk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogYXBwZW5kRmlsdGVyR3JvdXBzVG9FYWNoRmlsdGVyR3JvdXBcbiAgICpcbiAgICogR2V0cyBhbiBhcnJheSBvZiBmaWx0ZXJHcm91cCBhbmQgaW4gZWFjaCBmaWx0ZXJHcm91cCBpbiB0aGlzIGFycmF5IGFwcGVuZHMgdGhlIHNlY29uZCBmaWx0ZXJHcm91cCBmaWx0ZXJzLlxuICAgKi9cbiAgcHJpdmF0ZSBhcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHM6IEZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUb0FwcGVuZDogRmlsdGVyR3JvdXApIHtcblxuICAgIGlmIChmaWx0ZXJHcm91cFRvQXBwZW5kKSB7XG5cbiAgICAgIGlmIChmaWx0ZXJHcm91cHMgJiYgZmlsdGVyR3JvdXBzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMuZm9yRWFjaChncm91cCA9PiB7XG5cbiAgICAgICAgICBncm91cC5maWx0ZXJzLnB1c2goLi4uZmlsdGVyR3JvdXBUb0FwcGVuZC5maWx0ZXJzKTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMgPSBbZmlsdGVyR3JvdXBUb0FwcGVuZF07XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMgfHwgW107XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lc1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIubmFtZSA9IHRoaXMubmFtZTtcblxuXG4gICAgICBpZiAodGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQubmFtZSA9IHRoaXMubmFtZTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21GZXRjaE1ldGhvZCkge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5jdXN0b21GZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2Q7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VydmljZSA9IHRoaXMuc2VydmljZTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldFJvd3NcbiAgICpcbiAgICogU2V0cyB0aGUgY3VycmVudCB0YWJsZSByb3dzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldFJvd3Mocm93cyA9IFtdKSB7XG5cbiAgICB0aGlzLnJlcG9ydCA9IHtcblxuICAgICAgcGFnZTogMSxcblxuICAgICAgcmVzdWx0OiB7XG5cbiAgICAgICAgcm93czogcm93cyxcblxuICAgICAgICBjb3VudDogcm93cy5sZW5ndGhcblxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmRldGVjdExhc3RQYWdlKHJvd3MsIHJvd3MubGVuZ3RoKTtcblxuICAgIHRoaXMudXBkYXRlQ29udGVudENoaWxkcmVuKCk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFNjcm9sbEV2ZW50RW1pdHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFNjcm9sbEV2ZW50RW1pdHRlcigpIHtcblxuICAgIHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyXG4gICAgLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMTUwKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICApLnN1YnNjcmliZSh0aGlzLmFjdEJ5U2Nyb2xsUG9zaXRpb24pO1xuXG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyKCkge1xuXG4gICAgaWYgKHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb24pIHtcblxuICAgICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlckRhdGFcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hGaWx0ZXJEYXRhKCkge1xuICAgIHRoaXMucmVhY3RpdmVSZXBvcnQgPSB0aGlzLmZpbHRlckRhdGFcbiAgICAucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgxNTApLCAvLyBhdm9pZCBtdWlsdGlwbGUgcmVxdWVzdCB3aGVuIHRoZSBmaWx0ZXIgb3IgdGFiIGNoYW5nZSB0b28gZmFzdFxuICAgICAgc3dpdGNoTWFwKChmaWx0ZXJEYXRhOiBGaWx0ZXJEYXRhKSA9PiB7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55Pih1bmRlZmluZWQpO1xuXG4gICAgICAgIGNvbnN0IGZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2QgPSB0aGlzLmN1c3RvbUZldGNoTWV0aG9kIHx8IHRoaXMuc2VydmljZS5nZXQ7XG5cbiAgICAgICAgY29uc3QgZW5kcG9pbnQgPSBmaWx0ZXJEYXRhID8gZmlsdGVyRGF0YS5lbmRwb2ludCA6IHVuZGVmaW5lZDtcblxuICAgICAgICBjb25zdCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzID0gdGhpcy5nZXRQYXlsb2FkV2l0aFNlYXJjaFRyYW5zZm9ybWVkSW50b1NlYXJjaGFibGVQcm9wZXJ0aWVzKHRoaXMucGF5bG9hZCk7XG5cbiAgICAgICAgaWYgKGZpbHRlckRhdGEgJiYgZmlsdGVyRGF0YS5jbGVhcikge1xuICAgICAgICAgIHRoaXMuc2V0Um93cyhbXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmZXRjaE1ldGhvZChlbmRwb2ludCwgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcylcbiAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuXG4gICAgICAgICAgb2JzZXJ2YWJsZS5uZXh0KHJlcyk7XG5cbiAgICAgICAgICBpZiAoZmlsdGVyRGF0YSAmJiBmaWx0ZXJEYXRhLmNiaykge1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gd2FpdCBmb3Igc3Vic2NyaWJlcnMgdG8gcmVmcmVzaCB0aGVpciByb3dzXG5cbiAgICAgICAgICAgICAgZmlsdGVyRGF0YS5jYmsobmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuXG4gICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgICAgfSlcblxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCk7XG4gIH1cblxuICBwcml2YXRlIGdldFBheWxvYWRXaXRoU2VhcmNoVHJhbnNmb3JtZWRJbnRvU2VhcmNoYWJsZVByb3BlcnRpZXMocGF5bG9hZCkge1xuXG4gICAgY29uc3QgcGF5bG9hZENvcHkgPSB7Li4ucGF5bG9hZH07XG5cbiAgICBpZiAocGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzICYmIHRoaXMuc2VhcmNoYWJsZVByb3BlcnRpZXMpIHtcblxuICAgICAgcGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzID0gWy4uLnBheWxvYWQuZmlsdGVyR3JvdXBzXTtcblxuICAgICAgdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMocGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzKTtcblxuICAgICAgcmV0dXJuIHBheWxvYWRDb3B5O1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIHRoaXMucGF5bG9hZDtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoID0gdGhpcy5nZXRGaWx0ZXJHcm91cFRoYXRDb250YWluc1RoZUJhc2ljU2VhcmNoKGZpbHRlckdyb3Vwcyk7XG5cbiAgICBpZiAoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCkge1xuXG4gICAgICB0aGlzLnJlbW92ZUZpbHRlckdyb3VwKGZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCk7XG5cbiAgICAgIGNvbnN0IGJhc2ljU2VhcmNoID0gZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci5wcm9wZXJ0eSA9PT0gJ3NlYXJjaCcpO1xuXG4gICAgICBjb25zdCBiYXNpY1NlYXJjaEluZGV4ID0gZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzLmluZGV4T2YoYmFzaWNTZWFyY2gpO1xuXG4gICAgICB0aGlzLnNlYXJjaGFibGVQcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG5ld0ZpbHRlckdyb3VwOiBGaWx0ZXJHcm91cCA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBbLi4uZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzXVxuICAgICAgICB9O1xuXG4gICAgICAgIG5ld0ZpbHRlckdyb3VwLmZpbHRlcnNbYmFzaWNTZWFyY2hJbmRleF0gPSB7XG4gICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgIHZhbHVlOiBbYmFzaWNTZWFyY2gudmFsdWVdXG4gICAgICAgIH07XG5cbiAgICAgICAgZmlsdGVyR3JvdXBzLnB1c2gobmV3RmlsdGVyR3JvdXApO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2hJbmRleCA9IGZpbHRlckdyb3Vwcy5pbmRleE9mKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgZmlsdGVyR3JvdXBzLnNwbGljZShmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoSW5kZXgsIDEpO1xuXG4gIH1cblxuICBwcml2YXRlIGdldEZpbHRlckdyb3VwVGhhdENvbnRhaW5zVGhlQmFzaWNTZWFyY2goZmlsdGVyR3JvdXBzKSB7XG5cbiAgICByZXR1cm4gZmlsdGVyR3JvdXBzLmZpbmQoZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICBjb25zdCBiYXNpY1NlcmNoRmlsdGVyID0gZmlsdGVyR3JvdXAuZmlsdGVycyA/IGZpbHRlckdyb3VwLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnByb3BlcnR5ID09PSAnc2VhcmNoJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybiBiYXNpY1NlcmNoRmlsdGVyID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpIHtcbiAgICB0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uID0gdGhpcy5yZWFjdGl2ZVJlcG9ydFxuICAgIC5waXBlKFxuICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhICYmIGRhdGEucmVzdWx0ICYmIGRhdGEucmVzdWx0LnJvd3MpIHtcblxuICAgICAgICBpZiAoIXRoaXMuY2xlYXJBbmRSZWxvYWRSZXBvcnQpIHtcbiAgICAgICAgICBkYXRhLnJlc3VsdC5yb3dzID0gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MuY29uY2F0KGRhdGEucmVzdWx0LnJvd3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXBvcnQgPSBkYXRhO1xuXG4gICAgICAgIHRoaXMucG9zdFNlYXJjaC5lbWl0KGRhdGEpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29udGVudENoaWxkcmVuKCk7XG5cbiAgICAgICAgdGhpcy5kZXRlY3RMYXN0UGFnZShkYXRhLnJlc3VsdC5yb3dzLCBkYXRhLnJlc3VsdC5jb3VudCk7XG5cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdExhc3RQYWdlKHJvd3MsIGNvdW50KSB7XG5cbiAgICBjb25zdCBudW1iZXJPZnJvd3MgPSByb3dzLmxlbmd0aDtcblxuICAgIGNvbnN0IGVtcHRMaXN0ID0gbnVtYmVyT2Zyb3dzID09PSAwO1xuXG4gICAgY29uc3Qgc2luZ2xlUGFnZUxpc3QgPSBudW1iZXJPZnJvd3MgPT09IGNvdW50O1xuXG4gICAgdGhpcy5pc0xhc3RQYWdlID0gZW1wdExpc3QgfHwgc2luZ2xlUGFnZUxpc3Q7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKSB7XG4gICAgaWYgKHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB1cGRhdGVDb250ZW50Q2hpbGRyZW5cbiAgICpcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlQ29udGVudENoaWxkcmVuKCkge1xuXG4gICAgY29uc3Qgcm93cyA9IHRoaXMuZW5kcG9pbnQgPyB0aGlzLnJlcG9ydC5yZXN1bHQucm93cyA6IHRoaXMucm93cztcbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLmdyaWQucm93cyA9IHJvd3M7XG4gICAgfVxuICAgIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICB0aGlzLnRhYmxlLnJvd3MgPSByb3dzO1xuICAgIH1cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyLmNvdW50ID0gdGhpcy5yZXBvcnQucmVzdWx0LmNvdW50O1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHJlZ2lzdGVyQ2hpbGRXYXRjaGVyc1xuICAgKlxuICAgKiBXYXRjaCBmb3IgY2hpbGRyZW4gb3V0cHV0c1xuICAgKi9cbiAgcHJpdmF0ZSByZWdpc3RlckNoaWxkV2F0Y2hlcnMoKSB7XG5cbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLndhdGNoR3JpZFJvd0NsaWNrKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMud2F0Y2hUYWJsZVJvd0NsaWNrKCk7XG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEdyaWRSb3dDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEdyaWRSb3dDbGljaygpIHtcbiAgICB0aGlzLmdyaWQucm93Q2xpY2suc3Vic2NyaWJlKCgkZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucm93Q2xpY2suZW1pdCgkZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hUYWJsZVJvd0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFibGVSb3dDbGljaygpIHtcbiAgICB0aGlzLnRhYmxlLnJvd0NsaWNrLnN1YnNjcmliZSgoJGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJvd0NsaWNrLmVtaXQoJGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlci5zZWFyY2guc3Vic2NyaWJlKGV2ZW50ID0+IHtcblxuICAgICAgICBjb25zdCB0YWJDaGFuZ2VkID0gdGhpcy5wcmV2aW91c1NlbGVjdGVkVGFiICYmIHRoaXMucHJldmlvdXNTZWxlY3RlZFRhYiAhPT0gdGhpcy5zZWxlY3RlZFRhYjtcblxuICAgICAgICBjb25zdCBmaWx0ZXJNb2RlQ2hhbmdlZCA9IHRoaXMuZmlsdGVyTW9kZSAhPT0gZXZlbnQuZmlsdGVyTW9kZTtcblxuICAgICAgICBpZiAodGFiQ2hhbmdlZCkge1xuXG4gICAgICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVGFiID0gdGhpcy5zZWxlY3RlZFRhYjtcblxuICAgICAgICAgIHRoaXMuc2V0Um93cyhbXSk7IC8vIGlmIGNoYW5naW5nIHRhYnMsIGNsZWFyIHRoZSByZXN1bHRzIGJlZm9yZSBzaG93aW5nIHRoZSByb3dzIGJlY2F1c2UgaXQgaXMgZG9uZSBvbmx5IGFmdGVyIGZldGNoaW5nIHRoZSBkYXRhXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWx0ZXJNb2RlQ2hhbmdlZCkge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gZXZlbnQuZmlsdGVyTW9kZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyTW9kZSA9PT0gJ3RhYnMnKSB7XG5cbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0aGlzLmNvbGxhcHNhYmxlRmlsdGVycyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKS50aGVuKChyZXMpID0+IHtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnJlY291bnQpIHtcblxuICAgICAgICAgICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuY291bnRSZXBvcnQgfHwgZXZlbnQucmVjb3VudCkge1xuXG4gICAgICAgICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlICYmICF0YWJDaGFuZ2VkKSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZEJ5T3Blbm5lZENvbGxhcHNlKHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0ge1xuICAgICAgICAgICAgICB0YWI6IHRoaXMuc2VsZWN0ZWRUYWIsXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBldmVudC5jaGlsZHJlbiA/IGV2ZW50LmNoaWxkcmVuIDogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnNjcm9sbGFibGVDb250YWluZXJDbGFzcylbMF07XG4gICAgICBpZiAodGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSwgMSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnNlbGVjdGVkVGFiO1xuICAgICAgdGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC50YWJDaGFuZ2Uuc3Vic2NyaWJlKHRhYiA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0YWI7XG4gICAgICAgIHRoaXMuZGV0ZWN0TGlzdE1vZGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN1YnNjcmliZVRvVGFic0NoYW5nZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJzQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFibGVTb3J0KCkge1xuICAgIGlmICh0aGlzLnRhYmxlKSB7XG5cbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uID0gdGhpcy50YWJsZS5zb3J0LnN1YnNjcmliZShjb2x1bW5zU29ydENvbmZpZyA9PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29sdW1uc1NvcnRDb25maWcgIT09IGNvbHVtbnNTb3J0Q29uZmlnKSB7XG5cbiAgICAgICAgICB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnID0gY29sdW1uc1NvcnRDb25maWc7XG5cbiAgICAgICAgICBpZiAodGhpcy5jb2xsYXBzYWJsZUZpbHRlcnMpIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1RhYmxlU29ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJsZVNvcnQoKSB7XG4gICAgaWYgKHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYmxlU29ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IERlY0xpc3RUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9saXN0LXRhYmxlLWNvbHVtbi9saXN0LXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjTGlzdFRhYmxlQ29tcG9uZW50LFxuICAgIERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0xpc3RUYWJsZUNvbXBvbmVudCxcbiAgICBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJsZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1mb290ZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0Rm9vdGVyQ29tcG9uZW50IHt9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWFkdmFuY2VkLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1hY3Rpb25zJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBY3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjTGlzdEFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtYWN0aW9ucy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0xpc3RBY3Rpb25zQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RBY3Rpb25zQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWN0aW9uc01vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0U25hY2tCYXJNb2R1bGUsIE1hdEV4cGFuc2lvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRGVjTGlzdEZpbHRlck1vZHVsZSB9IGZyb20gJy4vbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIubW9kdWxlJztcblxuaW1wb3J0IHsgRGVjTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RUYWJsZU1vZHVsZSB9IGZyb20gJy4vbGlzdC10YWJsZS9saXN0LXRhYmxlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNMaXN0Rm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZvb3Rlci9saXN0LWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEFkdmFuY2VkRmlsdGVyTW9kdWxlIH0gZnJvbSAnLi9saXN0LWFkdmFuY2VkLWZpbHRlci9saXN0LWFkdmFuY2VkLWZpbHRlci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLXNwaW5uZXIvZGVjLXNwaW5uZXIubW9kdWxlJztcbmltcG9ydCB7IERlY0xpc3RBY3Rpb25zTW9kdWxlIH0gZnJvbSAnLi9saXN0LWFjdGlvbnMvbGlzdC1hY3Rpb25zLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNMYWJlbE1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLWxhYmVsL2RlYy1sYWJlbC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY0xhYmVsTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE5neERhdGF0YWJsZU1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIERlY0xpc3RBZHZhbmNlZEZpbHRlck1vZHVsZSxcbiAgICBEZWNMaXN0RmlsdGVyTW9kdWxlLFxuICAgIERlY0xpc3RUYWJsZU1vZHVsZSxcbiAgICBEZWNTcGlubmVyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNMaXN0Q29tcG9uZW50LFxuICAgIERlY0xpc3RHcmlkQ29tcG9uZW50LFxuICAgIERlY0xpc3RGb290ZXJDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNMaXN0Q29tcG9uZW50LFxuICAgIERlY0xpc3RHcmlkQ29tcG9uZW50LFxuICAgIERlY0xpc3RUYWJsZU1vZHVsZSxcbiAgICBEZWNMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgIERlY0xpc3RGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdEFkdmFuY2VkRmlsdGVyTW9kdWxlLFxuICAgIERlY0xpc3RBY3Rpb25zTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtcGFnZS1mb3JiaWRlbicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2UtZm9yYmlkZW4td3JhcHBlclwiPlxuICA8aDE+e3snbGFiZWwucGFnZS1mb3JiaWRlbicgfCB0cmFuc2xhdGV9fTwvaDE+XG4gIDxwPnt7J2xhYmVsLnBhZ2UtZm9yYmlkZW4taGVscCcgfCB0cmFuc2xhdGV9fTwvcD5cbiAgPHA+PHNtYWxsPlJlZjoge3twcmV2aW91c1VybH19PC9zbWFsbD48L3A+XG4gIDxpbWcgc3JjPVwiaHR0cDovL3MzLXNhLWVhc3QtMS5hbWF6b25hd3MuY29tL3N0YXRpYy1maWxlcy1wcm9kL3BsYXRmb3JtL2RlY29yYTMucG5nXCI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AucGFnZS1mb3JiaWRlbi13cmFwcGVye3BhZGRpbmctdG9wOjEwMHB4O3RleHQtYWxpZ246Y2VudGVyfWltZ3t3aWR0aDoxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQYWdlRm9yYmlkZW5Db21wb25lbnQge1xuXG4gIHByZXZpb3VzVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZClcbiAgICApXG4gICAgLnN1YnNjcmliZSgoZTogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRvY3VtZW50LnJlZmVycmVyIHx8IGUudXJsO1xuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjUGFnZUZvcmJpZGVuQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlLWZvcmJpZGVuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1BhZ2VGb3JiaWRlbkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUGFnZUZvcmJpZGVuQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUGFnZUZvcmJpZGVuTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtcGFnZS1ub3QtZm91bmQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYWdlLW5vdC1mb3VuZC13cmFwcGVyXCI+XG4gIDxoMT57eydsYWJlbC5wYWdlLW5vdC1mb3VuZCcgfCB0cmFuc2xhdGV9fTwvaDE+XG4gIDxwPnt7J2xhYmVsLnBhZ2Utbm90LWZvdW5kLWhlbHAnIHwgdHJhbnNsYXRlfX08L3A+XG4gIDxwPnt7cHJldmlvdXNVcmx9fTwvcD5cbiAgPGltZyBzcmM9XCJodHRwOi8vczMtc2EtZWFzdC0xLmFtYXpvbmF3cy5jb20vc3RhdGljLWZpbGVzLXByb2QvcGxhdGZvcm0vZGVjb3JhMy5wbmdcIj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5wYWdlLW5vdC1mb3VuZC13cmFwcGVye3BhZGRpbmctdG9wOjEwMHB4O3RleHQtYWxpZ246Y2VudGVyfWltZ3t3aWR0aDoxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQYWdlTm90Rm91bmRDb21wb25lbnQge1xuXG4gIHByZXZpb3VzVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIHJvdXRlci5ldmVudHNcbiAgICAucGlwZShcbiAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoKGU6IE5hdmlnYXRpb25FbmQpID0+IHtcbiAgICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGUudXJsO1xuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjUGFnZU5vdEZvdW5kQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlLW5vdC1mb3VuZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNQYWdlTm90Rm91bmRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1BhZ2VOb3RGb3VuZENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1BhZ2VOb3RGb3VuZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIgIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IEZBTExCQUNLX0lNQUdFID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQkNBUUFBQUMxSEF3Q0FBQUFBbUpMUjBRQS80ZVB6TDhBQUFBSmNFaFpjd0FBQ3hNQUFBc1RBUUNhbkJnQUFBQUxTVVJCVkFqWFkyQmdBQUFBQXdBQklOV1V4d0FBQUFCSlJVNScgK1xuJ0Vya0pnZ2c9PSc7XG5cbmNvbnN0IExPQURJTkdfSU1BR0UgPSAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpTVRVd0lpQm9aV2xuYUhROUlqRTFNQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUJ3Y21WelpYSjJaVUZ6Y0dWamRGSmhkR2x2UFNKNFRXbGtXVTFwWkNJZycgK1xuJ1kyeGhjM005SW5WcGJDMXlhVzVuSWo0OGNHRjBhQ0JtYVd4c1BTSnViMjVsSWlCamJHRnpjejBpWW1zaUlHUTlJazB3SURCb01UQXdkakV3TUVnd2VpSXZQanhqYVhKamJHVWdZM2c5SWpjMUlpQmplVDBpTnpVaUlISTlJalExSWlCemRISnZhMlV0WkdGemFHRnljbUY1UFNJeU1qWXVNVGsxSURVMkxqVTBPU0knICtcbidnYzNSeWIydGxQU0lqTWpNeVpUTTRJaUJtYVd4c1BTSnViMjVsSWlCemRISnZhMlV0ZDJsa2RHZzlJakV3SWo0OFlXNXBiV0YwWlZSeVlXNXpabTl5YlNCaGRIUnlhV0oxZEdWT1lXMWxQU0owY21GdWMyWnZjbTBpSUhSNWNHVTlJbkp2ZEdGMFpTSWdkbUZzZFdWelBTSXdJRGMxSURjMU96RTRNQ0EzTlNBM05UJyArXG4nc3pOakFnTnpVZ056VTdJaUJyWlhsVWFXMWxjejBpTURzd0xqVTdNU0lnWkhWeVBTSXhjeUlnY21Wd1pXRjBRMjkxYm5ROUltbHVaR1ZtYVc1cGRHVWlJR0psWjJsdVBTSXdjeUl2UGp3dlkybHlZMnhsUGp3dmMzWm5QZz09JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXByb2R1Y3Qtc3BpbicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyXCIgKm5nSWY9XCJzY2VuZXNcIj5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwibG9hZGluZ0ltYWdlcyA/IHRydWUgOiBmYWxzZVwiPlxuXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIGNsYXNzPVwib3ZlcmxheVwiPlxuICAgICAgPCEtLSBMb2FkaW5nIHNwaW5uZXIgLS0+XG4gICAgICA8ZGl2IFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1pbWFnZSc6J3VybCgnICsgbG9hZGluZ0ltYWdlICsgJyknfVwiPnt7bG9hZGVyUGVyY2VudGFnZSgpfX0lPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiIGNsYXNzPVwib3ZlcmxheVwiPlxuXG4gICAgICA8IS0tIE92ZXJsYXkgb3ZlciB0aGUgaW1hZ2UgKGhhbmQgaWNvbikgLS0+XG4gICAgICA8aW1nIGNsYXNzPVwiZnJhbWVcIiAqbmdJZj1cIiFvbmx5TW9kYWxcIiBzcmM9XCIvL3MzLXNhLWVhc3QtMS5hbWF6b25hd3MuY29tL3N0YXRpYy1maWxlcy1wcm9kL3BsYXRmb3JtL2RyYWctaG9yaXpvbnRhbGx5LnBuZ1wiIGFsdD1cIlwiIChjbGljayk9XCJvbmx5TW9kYWwgPyAnJyA6IHN0YXJ0KCRldmVudClcIj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG4gIDxkaXYgW25nU3dpdGNoXT1cInN0YXJ0ZWQgPyB0cnVlIDogZmFsc2VcIj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cInRydWVcIiBjbGFzcz1cImZyYW1lXCI+XG4gICAgICA8IS0tIEltYWdlcyAtLT5cbiAgICAgIDxpbWcgKm5nRm9yPVwibGV0IHNjZW5lIG9mIHNjZW5lczsgbGV0IGkgPSBpbmRleDtcIlxuICAgICAgICBbc3JjXT1cInNjZW5lXCJcbiAgICAgICAgZHJhZ2dhYmxlPVwiZmFsc2VcIlxuICAgICAgICBjbGFzcz1cIm5vLWRyYWcgaW1hZ2Utb25seVwiXG4gICAgICAgIChsb2FkKT1cIm1hcmtBc0xvYWRlZCgkZXZlbnQpXCJcbiAgICAgICAgW25nQ2xhc3NdPVwiZnJhbWVTaG93biA9PT0gaSAmJiAhbG9hZGluZ0ltYWdlcyA/ICdjdXJyZW50LXNjZW5lJyA6ICduZXh0LXNjZW5lJ1wiPlxuXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiIGNsYXNzPVwiZnJhbWVcIj5cblxuICAgICAgPCEtLSBQbGFjZWhvbGRlciBpbWFnZSAtLT5cbiAgICAgIDxpbWdcbiAgICAgICAgW3NyY109XCJzY2VuZXNbZnJhbWVTaG93bl1cIlxuICAgICAgICBkcmFnZ2FibGU9XCJmYWxzZVwiXG4gICAgICAgIGNsYXNzPVwibm8tZHJhZ1wiXG4gICAgICAgIChjbGljayk9XCJvbmx5TW9kYWwgPyBvbk9wZW4oJGV2ZW50KSA6IHN0YXJ0KCRldmVudClcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2ltYWdlLW9ubHknOiBvbmx5TW9kYWx9XCI+XG5cbiAgICAgIDwhLS0gTG9hZGluZyBzcGlubmVyIC0tPlxuICAgICAgPGJ1dHRvblxuICAgICAgKm5nSWY9XCJzaG93T3BlbkRpYWxvZ0J1dHRvbiAmJiAhb25seU1vZGFsXCJcbiAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgKGNsaWNrKT1cIm9uT3BlbigkZXZlbnQpXCJcbiAgICAgIFttYXRUb29sdGlwXT1cIidsYWJlbC5vcGVuJyB8IHRyYW5zbGF0ZVwiXG4gICAgICBjbGFzcz1cImRpYWxvZy1idXR0b25cIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjb2xvcj1cImRlZmF1bHRcIj5cbiAgICAgICAgPG1hdC1pY29uIGFyaWEtbGFiZWw9XCJTd2FwIGJldHdlZW4gUmVmZXJlbmNlIGFuZCBSZW5kZXIgaW1hZ2VzXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnID5mdWxsc2NyZWVuPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AucHJvZHVjdC1zcGlubmVyLXdyYXBwZXJ7ZGlzcGxheTpibG9jaztwb3NpdGlvbjpyZWxhdGl2ZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXI6aG92ZXIgLmZyYW1le29wYWNpdHk6MX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXI6aG92ZXIgLm92ZXJsYXl7ZGlzcGxheTpub25lfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWV7ZGlzcGxheTpibG9jazt3aWR0aDoxMDAlO2JhY2tncm91bmQtc2l6ZTpjb250YWluO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlciBjZW50ZXI7b3BhY2l0eTouNTt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzIGVhc2U7Y3Vyc29yOm1vdmV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZS5pbWFnZS1vbmx5e29wYWNpdHk6MTtjdXJzb3I6cG9pbnRlcn0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lIC5jdXJyZW50LXNjZW5le2Rpc3BsYXk6YmxvY2t9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZSAubmV4dC1zY2VuZXtkaXNwbGF5Om5vbmV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZSBpbWd7d2lkdGg6MTAwJX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLm92ZXJsYXl7cG9zaXRpb246YWJzb2x1dGU7cGFkZGluZzoxMHB4O3dpZHRoOjIwJTttYXJnaW4tbGVmdDo0MCU7bWFyZ2luLXRvcDo0MCU7ei1pbmRleDoxO29wYWNpdHk6LjQ7dHJhbnNpdGlvbjpvcGFjaXR5IC4ycyBlYXNlfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUubG9hZGVye3dpZHRoOjUwJTttYXJnaW46YXV0b30ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmRpYWxvZy1idXR0b257cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MH0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmxvYWRlci1wZXJjZW50YWdle3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo0NyU7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjtvcGFjaXR5Oi41fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1Byb2R1Y3RTcGluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmcmFtZVNob3duOiBudW1iZXI7XG4gIHNjZW5lczogc3RyaW5nW107XG4gIGxvYWRpbmdJbWFnZXM6IGJvb2xlYW47XG4gIHBsYWNlaG9sZGVyU2NlbmU6IHN0cmluZztcbiAgc3RhcnRlZDogYm9vbGVhbjtcbiAgdG90YWxJbWFnZXNMb2FkZWQ6IG51bWJlcjtcbiAgbG9hZGluZ0ltYWdlID0gTE9BRElOR19JTUFHRTtcblxuICBASW5wdXQoKSBsb29waW5nID0gZmFsc2U7XG4gIEBJbnB1dCgpIG9ubHlNb2RhbCA9IGZhbHNlO1xuICBASW5wdXQoKSBGQUxMQkFDS19JTUFHRTogc3RyaW5nID0gRkFMTEJBQ0tfSU1BR0U7XG4gIEBJbnB1dCgpIHN0YXJ0SW5DZW50ZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd09wZW5EaWFsb2dCdXR0b24gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzcGluKHNwaW46IGFueSkge1xuICAgIGlmIChzcGluKSB7XG4gICAgICBjb25zdCBzY2VuZXMgPSB0aGlzLmxvYWRTY2VuZXMoc3Bpbik7XG5cbiAgICAgIGNvbnN0IHNjZW5lc0NoYW5nZWQgPSAhdGhpcy5zY2VuZXMgfHwgKHNjZW5lcyAmJiB0aGlzLnNjZW5lcy5qb2luKCkgIT09IHNjZW5lcy5qb2luKCkpO1xuXG4gICAgICBpZiAoc2NlbmVzQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLnJlc2V0U2NlbmVzRGF0YShzY2VuZXMpO1xuICAgICAgICAvLyB0aGlzLnJlc2V0U3RhcnRQb3NpdGlvbkJhc2VkT25Db21wYW55KHNwaW4sIHNjZW5lcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NwaW4gPSBzcGluO1xuXG4gICAgfVxuICB9XG5cbiAgZ2V0IHNwaW4oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fc3BpbjtcbiAgfVxuXG4gIEBPdXRwdXQoKSBvcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBzY2VuZXNMZW4gPSAwO1xuICBwcml2YXRlIG1vdXNlRG93biA9IGZhbHNlO1xuICBwcml2YXRlIGxhc3RNb3VzZUV2ZW50OiBNb3VzZUV2ZW50O1xuICBwcml2YXRlIGNvbnRhaW5lcldpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgaW50ZXJ2YWw6IG51bWJlcjtcbiAgcHJpdmF0ZSBwb3NpdGlvbkRpZmY6IG51bWJlcjtcbiAgcHJpdmF0ZSBfc3BpbjogYW55O1xuXG4gIC8qXG4gICogTGlzdGVuaW5nIGZvciBtb3VzZSBldmVudHNcbiAgKiBtb3VzZXVwIGluIG5nT25Jbml0IGJlY2F1c2UgaXQgdXNlZCBkb2NjdW1lbnQgYXMgcmVmZXJlbmNlXG4gICovXG5cbiAgLy8gYXZvaWQgZHJhZ1xuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICBvbkRyYWdTdGFydChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gbW91c2Vkb3duXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG9uTW91c2Vkb3duKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xuICAgIHRoaXMubGFzdE1vdXNlRXZlbnQgPSBldmVudDtcbiAgfVxuXG4gIC8vIG1vdXNlbW92ZVxuICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCddKVxuICBvbk1vdXNlbW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vdXNlRG93biAmJiB0aGlzLnN0YXJ0ZWQpIHtcblxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihldmVudCk7XG5cbiAgICAgIC8vIFRoZSB3aWR0aCBpcyBkaXZpZGVkIGJ5IHRoZSBhbW91bnQgb2YgaW1hZ2VzLiBNb3ZpbmcgZnJvbSAwIHRvIDEwMCB3aWxsIHR1cm4gMzYww4LCsFxuICAgICAgaWYgKE1hdGguYWJzKHRoaXMucG9zaXRpb25EaWZmKSA+PSB0aGlzLmludGVydmFsKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uRGlmZiA8IDApIHtcbiAgICAgICAgICB0aGlzLmdvUmlnaHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmdvTGVmdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFzdE1vdXNlRXZlbnQgPSBldmVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZnJhbWVTaG93biA9IDA7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbkdsb2JhbCgnZG9jdW1lbnQnLCAnbW91c2V1cCcsIChldmVudCkgPT4ge1xuICAgICAgaWYgKHRoaXMubW91c2VEb3duKSB7XG4gICAgICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG1hcmtBc0xvYWRlZCA9IChldmVudCkgPT4ge1xuICAgIHRoaXMudG90YWxJbWFnZXNMb2FkZWQrKztcbiAgICBpZiAodGhpcy50b3RhbEltYWdlc0xvYWRlZCA9PT0gdGhpcy5zY2VuZXNMZW4pIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJTY2VuZSA9IHRoaXMuc2NlbmVzWzBdO1xuICAgICAgdGhpcy5sb2FkaW5nSW1hZ2VzID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ29MZWZ0ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnNjZW5lc1t0aGlzLmZyYW1lU2hvd24gLSAxXSkge1xuICAgICAgdGhpcy5mcmFtZVNob3duLS07XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvb3BpbmcpIHtcbiAgICAgIHRoaXMuZnJhbWVTaG93biA9IHRoaXMuc2NlbmVzTGVuIC0gMTtcbiAgICB9XG4gIH1cblxuICBnb1JpZ2h0ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnNjZW5lc1t0aGlzLmZyYW1lU2hvd24gKyAxXSkge1xuICAgICAgdGhpcy5mcmFtZVNob3duKys7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvb3BpbmcpIHtcbiAgICAgIHRoaXMuZnJhbWVTaG93biA9IDA7XG4gICAgfVxuICB9XG5cbiAgc3RhcnQgPSAoJGV2ZW50KTogdm9pZCA9PiB7XG4gICAgdGhpcy5wbGFjZWhvbGRlclNjZW5lID0gTE9BRElOR19JTUFHRTtcbiAgICB0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkID0gMDtcbiAgICB0aGlzLmxvYWRpbmdJbWFnZXMgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gIH1cblxuICBsb2FkZXJQZXJjZW50YWdlID0gKCkgPT4ge1xuICAgIHJldHVybiAodGhpcy5zY2VuZXNMZW4gLSB0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkKSA+IDAgPyAoKDEwMCAvIHRoaXMuc2NlbmVzTGVuKSAqIHRoaXMudG90YWxJbWFnZXNMb2FkZWQpLnRvRml4ZWQoMSkgOiAwO1xuICB9XG5cbiAgb25PcGVuKCRldmVudCkge1xuXG4gICAgdGhpcy5vcGVuLmVtaXQoJGV2ZW50KTtcblxuICB9XG5cbiAgLypcbiAgICpcbiAgICogSU1QT1JUQU5UXG4gICAqXG4gICAqIHJlc2V0U3RhcnRQb3NpdGlvbkJhc2VkT25Db21wYW55XG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHJlc3BvbnNpYmxlIGZvciBlbnN1cmluZyB0aGUgQnVzaW5lc3MgUnVsZSBvZiB0aGUgc3BpbiBzZXF1ZW5jZVxuICAgKiBUaGUgSG9tZSBEZXBvdCBha2EgY3VzdG9tZXIgMTAwLCBoYXZlIGEgcGFydGljdWxhciBiZWhhdmlvciBzdGFydGluZyAxODDDgsK6IGluIHRoZSBtaWRkbGVcbiAgICpcbiAgKi9cbiAgcHJpdmF0ZSByZXNldFN0YXJ0UG9zaXRpb25CYXNlZE9uQ29tcGFueShzcGluLCBzY2VuZXMpIHtcblxuICAgIHRoaXMuc3RhcnRJbkNlbnRlciA9IHNwaW4uY29tcGFueS5pZCA9PT0gMTAwID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy5zdGFydEluQ2VudGVyID0gdGhpcy5zdGFydEluQ2VudGVyICYmIHNjZW5lcy5sZW5ndGggPD0gMTY7XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTY2VuZXNEYXRhKHNjZW5lcykge1xuICAgIHRoaXMucGxhY2Vob2xkZXJTY2VuZSA9IHNjZW5lc1swXTtcbiAgICB0aGlzLnNjZW5lc0xlbiA9IHNjZW5lcy5sZW5ndGg7XG4gICAgdGhpcy5zY2VuZXMgPSBzY2VuZXM7XG4gIH1cblxuICBwcml2YXRlIGxvYWRTY2VuZXMoc3Bpbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzY2VuZXMgPSB0aGlzLmdldFVybHNGcm9tU3lzRmlsZXMoc3Bpbi5kYXRhLnNob3RzKTtcbiAgICAgIHJldHVybiBzY2VuZXMgJiYgc2NlbmVzLmxlbmd0aCA+IDAgPyBzY2VuZXMgOiBbRkFMTEJBQ0tfSU1BR0VdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gW0ZBTExCQUNLX0lNQUdFXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZVBvc2l0aW9uKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0OiBhbnkgPSBldmVudFsndGFyZ2V0J107XG5cbiAgICBpZiAodGhpcy5jb250YWluZXJXaWR0aCAhPT0gdGFyZ2V0LmNsaWVudFdpZHRoKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gIHRhcmdldC5jbGllbnRXaWR0aDtcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSAodGhpcy5jb250YWluZXJXaWR0aCAvIHRoaXMuc2NlbmVzTGVuKSAvIDEuNjtcbiAgICB9XG5cbiAgICB0aGlzLnBvc2l0aW9uRGlmZiA9IGV2ZW50LmNsaWVudFggLSB0aGlzLmxhc3RNb3VzZUV2ZW50LmNsaWVudFg7XG4gIH1cblxuICBwcml2YXRlIGdldFVybHNGcm9tU3lzRmlsZXMoc3lzRmlsZXMpIHtcbiAgICBpZiAoIXN5c0ZpbGVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzeXNGaWxlcy5tYXAoZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWxlLnJlbmRlckZpbGUuZmlsZVVybDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY1Byb2R1Y3RTcGluQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9kdWN0LXNwaW4uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjUHJvZHVjdFNwaW5Db21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1Byb2R1Y3RTcGluQ29tcG9uZW50XG4gIF0sXG59KVxuXG5leHBvcnQgY2xhc3MgRGVjUHJvZHVjdFNwaW5Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBbcm91dGVyTGlua109XCJyb3V0ZXJMaW5rXCIgY2xhc3M9XCJkZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxle291dGxpbmU6MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSByb3V0ZXJMaW5rO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBBZnRlclZpZXdJbml0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LXRvb2xiYXInLFxuICB0ZW1wbGF0ZTogYDxtYXQtdG9vbGJhciBbY29sb3JdPVwiY29sb3JcIiAqbmdJZj1cImluaXRpYWxpemVkXCIgY2xhc3M9XCJkZWMtc2lkZW5hdi10b29sYmFyXCI+XG5cbiAgPHNwYW4gY2xhc3M9XCJpdGVtcy1pY29uIGl0ZW0tbGVmdFwiICpuZ0lmPVwibGVmdE1lbnVUcmlnZ2VyVmlzaWJsZVwiIChjbGljayk9XCJ0b2dnbGVMZWZ0TWVudS5lbWl0KClcIj5cbiAgICAmIzk3NzY7XG4gIDwvc3Bhbj5cblxuICA8c3BhbiAqbmdJZj1cImN1c3RvbVRpdGxlXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZVwiPjwvbmctY29udGVudD5cbiAgPC9zcGFuPlxuXG4gIDxkaXYgY2xhc3M9XCJyaWJib24ge3tyaWJib259fVwiICpuZ0lmPVwibm90UHJvZHVjdGlvblwiPlxuICAgIDxzcGFuPnt7bGFiZWwgfCB0cmFuc2xhdGV9fTwvc3Bhbj5cbiAgPC9kaXY+XG5cbiAgPHNwYW4gY2xhc3M9XCJkZWMtc2lkZW5hdi10b29sYmFyLWN1c3RvbS1jb250ZW50XCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L3NwYW4+XG5cbiAgPHNwYW4gY2xhc3M9XCJpdGVtcy1zcGFjZXJcIj48L3NwYW4+XG5cbiAgPHNwYW4gY2xhc3M9XCJpdGVtcy1pY29uIGl0ZW0tcmlnaHRcIiAqbmdJZj1cInJpZ2h0TWVudVRyaWdnZXJWaXNpYmxlXCIgKGNsaWNrKT1cInRvZ2dsZVJpZ2h0TWVudS5lbWl0KClcIj5cbiAgICAmIzk3NzY7XG4gIDwvc3Bhbj5cblxuPC9tYXQtdG9vbGJhcj5cbmAsXG4gIHN0eWxlczogW2AuaXRlbXMtc3BhY2Vye2ZsZXg6MSAxIGF1dG99Lml0ZW1zLWljb257Y3Vyc29yOnBvaW50ZXI7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMS4yLC44KTt0cmFuc2Zvcm06c2NhbGUoMS4yLC44KX0uaXRlbXMtaWNvbi5pdGVtLXJpZ2h0e3BhZGRpbmctbGVmdDoxNHB4fS5pdGVtcy1pY29uLml0ZW0tbGVmdHtwYWRkaW5nLXJpZ2h0OjE0cHh9LmRlYy1zaWRlbmF2LXRvb2xiYXItY3VzdG9tLWNvbnRlbnR7cGFkZGluZzowIDE2cHg7d2lkdGg6MTAwJX0ucmliYm9ue3RyYW5zaXRpb246YWxsIC4zcyBlYXNlO3RleHQtdHJhbnNmb3JtOmxvd2VyY2FzZTt0ZXh0LWFsaWduOmNlbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZTtsaW5lLWhlaWdodDo2NHB4O21hcmdpbi1sZWZ0OjRweDtwYWRkaW5nOjAgMjBweDtoZWlnaHQ6NjRweDt3aWR0aDoxNTVweDtjb2xvcjojZmZmO2xlZnQ6MjBweDt0b3A6MH0ucmliYm9uLnJpYmJvbi1oaWRkZW57ZGlzcGxheTpub25lfS5yaWJib246OmJlZm9yZXtjb250ZW50OicnO3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMHZ3O2hlaWdodDo0cHg7ei1pbmRleDoyO3RvcDo2NHB4O2xlZnQ6MH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjU5OXB4KXsucmliYm9uOjpiZWZvcmV7dG9wOjU2cHh9fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcblxuICBpbml0aWFsaXplZDtcblxuICBub3RQcm9kdWN0aW9uID0gdHJ1ZTtcbiAgcmliYm9uID0gJyc7XG4gIGxhYmVsID0gJyc7XG5cbiAgQElucHV0KCkgY29sb3I7XG5cbiAgQElucHV0KCkgZW52aXJvbm1lbnQ7XG5cbiAgQElucHV0KCkgbGVmdE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRydWU7XG5cbiAgQElucHV0KCkgcmlnaHRNZW51VHJpZ2dlclZpc2libGUgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSB0b2dnbGVMZWZ0TWVudTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgdG9nZ2xlUmlnaHRNZW51OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCkgY3VzdG9tVGl0bGU6IERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVudmlyb25tZW50ID09PSAnbG9jYWwnKSB7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24tZ3JlZW4nO1xuICAgICAgdGhpcy5sYWJlbCA9ICdsYWJlbC5sb2NhbCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVudmlyb25tZW50ID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24tYmx1ZSc7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLmRldmVsb3BtZW50JztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdxYScpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1yZWQnO1xuICAgICAgdGhpcy5sYWJlbCA9ICdsYWJlbC5xYSc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVudmlyb25tZW50ID09PSAnYWN0aXZlJykge1xuICAgICAgdGhpcy5yaWJib24gPSAncmliYm9uLWdyZWVuJztcbiAgICAgIHRoaXMubGFiZWwgPSAnbGFiZWwuYWN0aXZlJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub3RQcm9kdWN0aW9uID0gZmFsc2U7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24taGlkZGVuJztcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEFmdGVyVmlld0luaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtbWVudS1pdGVtJyxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgbGV0LXRyZWVMZXZlbD1cInRyZWVMZXZlbFwiICN0ZW1wbGF0ZT5cblxuICA8bWF0LWxpc3QtaXRlbSBjbGFzcz1cImNsaWNrIGRlYy1zaWRlbmF2LW1lbnUtaXRlbVwiXG4gIChjbGljayk9XCJzdWJpdGVtcy5sZW5ndGggPyB0b2dnbGVTdWJtZW51KCkgOiBvcGVuTGluaygpXCJcbiAgW25nQ2xhc3NdPVwiZ2V0QmFja2dyb3VuZCh0cmVlTGV2ZWwpXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaXRlbS13cmFwcGVyXCI+XG5cbiAgICAgIDxkaXYgW25nU3R5bGVdPVwie3BhZGRpbmdMZWZ0OiB0cmVlTGV2ZWwgKiAxNiArICdweCd9XCIgY2xhc3M9XCJpdGVtLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJzdWJpdGVtcy5sZW5ndGhcIiBjbGFzcz1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwic2hvd1N1Ym1lbnVcIj5cbiAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPjxpIGNsYXNzPVwiYXJyb3cgZG93blwiPjwvaT48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+PGkgY2xhc3M9XCJhcnJvdyByaWdodFwiPjwvaT48L3NwYW4+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9tYXQtbGlzdC1pdGVtPlxuXG4gIDxkaXYgY2xhc3M9XCJzdWJpdGVtLW1lbnVcIiAqbmdJZj1cInNob3dTdWJtZW51XCI+XG5cbiAgICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwic3ViaXRlbXNcIiBbdHJlZUxldmVsXT1cInRyZWVMZXZlbFwiPjwvZGVjLXNpZGVuYXYtbWVudT5cblxuICA8L2Rpdj5cblxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gIHN0eWxlczogW2AuZGVjLXNpZGVuYXYtbWVudS1pdGVte2hlaWdodDo1NnB4IWltcG9ydGFudDtvdXRsaW5lOjB9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVye3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3cgbm8td3JhcDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLml0ZW0tY29udGVudCA6Om5nLWRlZXAgLm1hdC1pY29uLC5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuaXRlbS1jb250ZW50IDo6bmctZGVlcCBpe3ZlcnRpY2FsLWFsaWduOm1pZGRsZTttYXJnaW4tYm90dG9tOjVweDttYXJnaW4tcmlnaHQ6OHB4fS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuYXJyb3d7bWFyZ2luLWJvdHRvbTotNHB4fS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuYXJyb3cucmlnaHR7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuYXJyb3cubGVmdHt0cmFuc2Zvcm06cm90YXRlKDEzNWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDEzNWRlZyl9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5hcnJvdy51cHt0cmFuc2Zvcm06cm90YXRlKC0xMzVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtMTM1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLmFycm93LmRvd257dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC50ZXh0LXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuY2xpY2t7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSBpe2JvcmRlcjpzb2xpZCAjMDAwO2JvcmRlci13aWR0aDowIDJweCAycHggMDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjRweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSByb3V0ZXJMaW5rO1xuXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgX3N1Yml0ZW1zOiBRdWVyeUxpc3Q8RGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50PjtcblxuICBAT3V0cHV0KCkgdG9nZ2xlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHN0YXJ0ZWQ7XG5cbiAgc2hvd1N1Ym1lbnUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIGdldCBzdWJpdGVtcygpIHtcbiAgICBjb25zdCBzdWJpdGVtcyA9IHRoaXMuX3N1Yml0ZW1zLnRvQXJyYXkoKTtcbiAgICBzdWJpdGVtcy5zcGxpY2UoMCwgMSk7IC8vIHJlbW92ZXMgaXRzZWxmXG4gICAgcmV0dXJuIHN1Yml0ZW1zO1xuICB9XG5cbiAgdG9nZ2xlU3VibWVudSgpIHtcbiAgICB0aGlzLnNob3dTdWJtZW51ID0gIXRoaXMuc2hvd1N1Ym1lbnU7XG4gICAgdGhpcy50b2dnbGUuZW1pdCh0aGlzLnNob3dTdWJtZW51KTtcbiAgfVxuXG4gIGNsb3NlU3VibWVudSgpIHtcbiAgICB0aGlzLnNob3dTdWJtZW51ID0gZmFsc2U7XG4gIH1cblxuICBvcGVuTGluaygpIHtcbiAgICBpZiAodGhpcy5yb3V0ZXJMaW5rKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucm91dGVyTGluayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgaXNOYWtlZCA9IHRoaXMucm91dGVyTGluay5zdGFydHNXaXRoKCcvLycpO1xuICAgICAgICBjb25zdCBpc0h0dHAgPSB0aGlzLnJvdXRlckxpbmsuc3RhcnRzV2l0aCgnaHR0cDovLycpO1xuICAgICAgICBjb25zdCBpc0h0dHBzID0gdGhpcy5yb3V0ZXJMaW5rLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJyk7XG4gICAgICAgIGlmIChpc05ha2VkIHx8IGlzSHR0cCB8fCBpc0h0dHBzKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnJvdXRlckxpbms7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGVyTGlua10pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5yb3V0ZXJMaW5rKSkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSh0aGlzLnJvdXRlckxpbmspO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldEJhY2tncm91bmQodHJlZUxldmVsKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tJZkFjdGl2ZSgpID8gJ21hdC1saXN0LWl0ZW0tYWN0aXZlJyA6ICdtYXQtbGlzdC1pdGVtLScgKyB0cmVlTGV2ZWw7XG4gIH1cblxuICBjaGVja0lmQWN0aXZlKCkge1xuICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2hvd1N1Ym1lbnUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGFzQWN0aXZlQ2hpbGQgPSB0aGlzLmhhc0FjdGl2ZUNoaWxkO1xuICAgICAgcmV0dXJuIGhhc0FjdGl2ZUNoaWxkO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgaGFzQWN0aXZlQ2hpbGQoKSB7XG4gICAgaWYgKCF0aGlzLnN1Yml0ZW1zKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnN1Yml0ZW1zLnJlZHVjZSgobGFzdFZhbHVlLCBpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBsYXN0VmFsdWUgfHwgaXRlbS5pc0FjdGl2ZSB8fCBpdGVtLmhhc0FjdGl2ZUNoaWxkO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyTGluayA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IFNUT1JBR0VfRE9NQUlOID0gJ2RlY1NpZGVuYXZDb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdlNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXRTaWRlbmF2VmlzaWJpbGl0eShuYW1lLCB2aXNpYmlsaXR5KSB7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldFNpZGVuYXZDb25maWcoKTtcblxuICAgIGNvbmZpZ1tuYW1lXSA9IHZpc2liaWxpdHk7XG5cbiAgICB0aGlzLnNldFNpZGVuYXZDb25maWcoY29uZmlnKTtcblxuICB9XG5cbiAgZ2V0U2lkZW5hdlZpc2liaWxpdHkobmFtZSkge1xuXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRTaWRlbmF2Q29uZmlnKCk7XG5cbiAgICByZXR1cm4gY29uZmlnW25hbWVdO1xuXG4gIH1cblxuICBwcml2YXRlIHNldFNpZGVuYXZDb25maWcoY29uZikge1xuXG4gICAgY29uc3QgY29uZlN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGNvbmYpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9ET01BSU4sIGNvbmZTdHJpbmcpO1xuXG4gIH1cblxuICBwcml2YXRlIGdldFNpZGVuYXZDb25maWcoKSB7XG5cbiAgICBjb25zdCBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9ET01BSU4pO1xuXG4gICAgaWYgKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuXG4gICAgICB0aGlzLnNldFNpZGVuYXZDb25maWcobmV3Q29uZmlnKTtcblxuICAgICAgcmV0dXJuIG5ld0NvbmZpZztcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIElucHV0LCBDb250ZW50Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS10aXRsZS9kZWMtc2lkZW5hdi1tZW51LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuLy4uL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtbGVmdCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1c3RvbVRpdGxlXCI+XG4gIDxkaXYgY2xhc3M9XCJtZW51LXRpdGxlXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWRlYy1zaWRlbmF2LW1lbnUtdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtc1wiPlxuICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwiaXRlbXMudG9BcnJheSgpXCI+PC9kZWMtc2lkZW5hdi1tZW51PlxuPC9uZy1jb250YWluZXI+YCxcbiAgc3R5bGVzOiBbYC5tZW51LXRpdGxle3BhZGRpbmc6MTZweDtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo3MDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICByZWFkb25seSBsZWZ0TWVudVZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIHJlYWRvbmx5IGxlZnRNZW51TW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2lkZScpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcGVuKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMubGVmdE1lbnVWaXNpYmxlLnZhbHVlO1xuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubGVmdE1lbnVWaXNpYmxlLm5leHQodik7XG4gICAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnNldFNpZGVuYXZWaXNpYmlsaXR5KCdsZWZ0TWVudUhpZGRlbicsICF2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbW9kZSh2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmxlZnRNZW51TW9kZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubGVmdE1lbnVNb2RlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdE1lbnVNb2RlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgcGVyc2lzdFZpc2liaWxpdHlNb2RlOiBib29sZWFuO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgaXRlbXM6IFF1ZXJ5TGlzdDxEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCkgY3VzdG9tVGl0bGU6IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIG9wZW5lZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAT3V0cHV0KCkgbW9kZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHByaXZhdGUgaXRlbVN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNTaWRlbmF2U2VydmljZTogRGVjU2lkZW5hdlNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVBbmRFeHBvc2VTaWRlbmF2RXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKSB7XG5cbiAgICB0aGlzLmxlZnRNZW51VmlzaWJsZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxlZnRNZW51TW9kZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5tb2RlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMudG9BcnJheSgpO1xuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50KSA9PiB7XG5cbiAgICAgIGl0ZW0udG9nZ2xlLnN1YnNjcmliZShzdGF0ZSA9PiB7XG5cbiAgICAgICAgaWYgKHN0YXRlKSB7XG5cbiAgICAgICAgICB0aGlzLmNsb3NlQnJvdGhlcnMoaXRlbSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLml0ZW1TdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VCcm90aGVycyhpdGVtU2VsZWN0ZWQpIHtcblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy50b0FycmF5KCk7XG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQpID0+IHtcblxuICAgICAgaWYgKGl0ZW1TZWxlY3RlZCAhPT0gaXRlbSkge1xuXG4gICAgICAgIGl0ZW0uY2xvc2VTdWJtZW51KCk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbnB1dCwgQ29udGVudENoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS9kZWMtc2lkZW5hdi1tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUvZGVjLXNpZGVuYXYtbWVudS10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY1NpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zaWRlbmF2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51LXJpZ2h0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VzdG9tVGl0bGVcIj5cbiAgPGRpdiBjbGFzcz1cIm1lbnUtdGl0bGVcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtZGVjLXNpZGVuYXYtbWVudS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW1zXCI+XG4gIDxkZWMtc2lkZW5hdi1tZW51IFtpdGVtc109XCJpdGVtcy50b0FycmF5KClcIj48L2RlYy1zaWRlbmF2LW1lbnU+XG48L25nLWNvbnRhaW5lcj5gLFxuICBzdHlsZXM6IFtgLm1lbnUtdGl0bGV7cGFkZGluZzoxNnB4O2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjcwMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICByZWFkb25seSByaWdodE1lbnVWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcblxuICByZWFkb25seSByaWdodE1lbnVNb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdzaWRlJyk7XG5cbiAgQElucHV0KClcbiAgc2V0IG9wZW4odjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5yaWdodE1lbnVWaXNpYmxlLnZhbHVlO1xuXG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yaWdodE1lbnVWaXNpYmxlLm5leHQodik7XG4gICAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnNldFNpZGVuYXZWaXNpYmlsaXR5KCdyaWdodE1lbnVIaWRkZW4nLCAhdik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBtb2RlKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMucmlnaHRNZW51TW9kZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucmlnaHRNZW51TW9kZS5uZXh0KHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0TWVudU1vZGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKSBwZXJzaXN0VmlzaWJpbGl0eU1vZGU6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBpdGVtczogUXVlcnlMaXN0PERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50KSBjdXN0b21UaXRsZTogRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgb3BlbmVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKSBtb2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHJpdmF0ZSBpdGVtU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NpZGVuYXZTZXJ2aWNlOiBEZWNTaWRlbmF2U2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpIHtcblxuICAgIHRoaXMucmlnaHRNZW51VmlzaWJsZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJpZ2h0TWVudU1vZGUuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMubW9kZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zLnRvQXJyYXkoKTtcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCkgPT4ge1xuXG4gICAgICBpdGVtLnRvZ2dsZS5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuXG4gICAgICAgIGlmIChzdGF0ZSkge1xuXG4gICAgICAgICAgdGhpcy5jbG9zZUJyb3RoZXJzKGl0ZW0pO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5pdGVtU3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikgPT4ge1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlQnJvdGhlcnMoaXRlbVNlbGVjdGVkKSB7XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMudG9BcnJheSgpO1xuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50KSA9PiB7XG5cbiAgICAgIGlmIChpdGVtU2VsZWN0ZWQgIT09IGl0ZW0pIHtcblxuICAgICAgICBpdGVtLmNsb3NlU3VibWVudSgpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtdG9vbGJhci9kZWMtc2lkZW5hdi10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtbGVmdC9kZWMtc2lkZW5hdi1tZW51LWxlZnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQvZGVjLXNpZGVuYXYtbWVudS1yaWdodC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0U2lkZW5hdiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY1NpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlbmF2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1zaWRlbmF2LXdyYXBlclwiPlxuICA8IS0tIFRPT0xCQVIgLS0+XG4gIDxkaXYgKm5nSWY9XCJ0b29sYmFyXCIgY2xhc3M9XCJkZWMtc2lkZW5hdi10b29sYmFyLXdyYXBwZXJcIiBbbmdDbGFzc109XCJ7J2Z1bGwtc2NyZWVuJzogIShsZWZ0TWVudS5sZWZ0TWVudVZpc2libGUgfCBhc3luYyl9XCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtdG9vbGJhclwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG4gIDwhLS0gLyBUT09MQkFSIC0tPlxuXG4gIDwhLS0gUFJPR1JFU1MgQkFSIC0tPlxuICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyLXdyYXBwZXJcIiAqbmdJZj1cInByb2dyZXNzQmFyVmlzaWJsZSB8IGFzeW5jXCI+XG4gICAgPG1hdC1wcm9ncmVzcy1iYXIgbW9kZT1cImluZGV0ZXJtaW5hdGVcIiBjb2xvcj1cImFjY2VudFwiPjwvbWF0LXByb2dyZXNzLWJhcj5cbiAgPC9kaXY+XG4gIDwhLS0gLyBQUk9HUkVTUyBCQVIgLS0+XG5cbiAgPG1hdC1zaWRlbmF2LWNvbnRhaW5lciBbbmdDbGFzc109XCJ7J3dpdGgtdG9vbGJhcic6IHRvb2xiYXIsICdmdWxsLXNjcmVlbic6ICEobGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlIHwgYXN5bmMpfVwiPlxuXG4gICAgPCEtLSBMRUZUIE1FTlUgLS0+XG4gICAgPG1hdC1zaWRlbmF2ICpuZ0lmPVwibGVmdE1lbnVcIlxuICAgIFttb2RlXT1cImxlZnRNZW51LmxlZnRNZW51TW9kZSB8IGFzeW5jXCJcbiAgICBbb3BlbmVkXT1cImxlZnRNZW51LmxlZnRNZW51VmlzaWJsZSB8IGFzeW5jXCJcbiAgICBwb3NpdGlvbj1cInN0YXJ0XCJcbiAgICAob3BlbmVkQ2hhbmdlKT1cImxlZnRTaWRlbmF2T3BlbmVkQ2hhbmdlKCRldmVudClcIlxuICAgICNsZWZ0U2lkZW5hdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LW1lbnUtbGVmdFwiPjwvbmctY29udGVudD5cbiAgICA8L21hdC1zaWRlbmF2PlxuICAgIDwhLS0gLyBMRUZUIE1FTlUgLS0+XG5cbiAgICA8IS0tIENPTlRFTlQgLS0+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICA8IS0tIC8gQ09OVEVOVCAtLT5cblxuICAgIDwhLS0gUklHSFQgTUVOVSAtLT5cbiAgICA8bWF0LXNpZGVuYXYgKm5nSWY9XCJyaWdodE1lbnVcIlxuICAgIFttb2RlXT1cInJpZ2h0TWVudS5yaWdodE1lbnVNb2RlIHwgYXN5bmNcIlxuICAgIFtvcGVuZWRdPVwicmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUgfCBhc3luY1wiXG4gICAgcG9zaXRpb249XCJlbmRcIlxuICAgIChvcGVuZWRDaGFuZ2UpPVwicmlnaHRTaWRlbmF2T3BlbmVkQ2hhbmdlKCRldmVudClcIlxuICAgICNyaWdodFNpZGVuYXY+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi1tZW51LXJpZ2h0XCI+PC9uZy1jb250ZW50PlxuICAgIDwvbWF0LXNpZGVuYXY+XG4gICAgPCEtLSAvIFJJR0hUIE1FTlUgLS0+XG5cbiAgPC9tYXQtc2lkZW5hdi1jb250YWluZXI+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi13cmFwZXIgLmRlYy1zaWRlbmF2LXRvb2xiYXItd3JhcHBlcnttaW4td2lkdGg6MTIwMHB4fS5kZWMtc2lkZW5hdi13cmFwZXIgLmRlYy1zaWRlbmF2LXRvb2xiYXItd3JhcHBlci5mdWxsLXNjcmVlbnttaW4td2lkdGg6OTQ0cHh9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVye21pbi13aWR0aDoxMjAwcHg7aGVpZ2h0OjEwMHZofS5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lci5mdWxsLXNjcmVlbnttaW4td2lkdGg6OTQ0cHh9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyLndpdGgtdG9vbGJhcntoZWlnaHQ6Y2FsYygxMDB2aCAtIDY0cHgpfS5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lciAubWF0LXNpZGVuYXZ7d2lkdGg6MjU2cHh9LmRlYy1zaWRlbmF2LXdyYXBlciAucHJvZ3Jlc3MtYmFyLXdyYXBwZXJ7cG9zaXRpb246Zml4ZWQ7dG9wOjYwcHg7bGVmdDowO3dpZHRoOjEwMCV9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDoxMTk5cHgpey5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lcntoZWlnaHQ6Y2FsYygxMDB2aCAtIDE2cHgpfS5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lci53aXRoLXRvb2xiYXJ7aGVpZ2h0OmNhbGMoMTAwdmggLSA4MHB4KX19YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHJlYWRvbmx5IHByb2dyZXNzQmFyVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQpIHRvb2xiYXI6IERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50KVxuICBzZXQgbGVmdE1lbnUodjogRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50KSB7XG4gICAgdGhpcy5fbGVmdE1lbnUgPSB2O1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLnNldEluaXRpYWxMZWZ0TWVudVZpc2liaWxpdHlNb2RlcygpO1xuICAgIH1cbiAgfVxuICBnZXQgbGVmdE1lbnUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xlZnRNZW51O1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50KVxuICBzZXQgcmlnaHRNZW51KHY6IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQpIHtcbiAgICB0aGlzLl9yaWdodE1lbnUgPSB2O1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLnNldEluaXRpYWxSaWdodE1lbnVWaXNpYmlsaXR5TW9kZXMoKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHJpZ2h0TWVudSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmlnaHRNZW51O1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnbGVmdFNpZGVuYXYnKSBsZWZ0U2lkZW5hdjogTWF0U2lkZW5hdjtcblxuICBAVmlld0NoaWxkKCdyaWdodFNpZGVuYXYnKSByaWdodFNpZGVuYXY6IE1hdFNpZGVuYXY7XG5cbiAgcHJpdmF0ZSBfbGVmdE1lbnU6IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudDtcblxuICBwcml2YXRlIF9yaWdodE1lbnU6IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQ7XG5cbiAgQElucHV0KClcbiAgc2V0IGxvYWRpbmcodjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5wcm9ncmVzc0JhclZpc2libGUudmFsdWU7XG5cbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsb2FkaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjU2lkZW5hdlNlcnZpY2U6IERlY1NpZGVuYXZTZXJ2aWNlXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgICB0aGlzLmRldGVjdEFuZFNob3dDaGlsZENvbXBvbmVudHMoKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlVG9Ub29sYmFyRXZlbnRzKCk7XG5cbiAgfVxuXG4gIC8vIEFQSSAvL1xuICBvcGVuQm90aE1lbnVzKCkge1xuICAgIHRoaXMub3BlbkxlZnRNZW51KCk7XG4gICAgdGhpcy5vcGVuUmlnaHRNZW51KCk7XG4gIH1cblxuICBvcGVuTGVmdE1lbnUoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIG9wZW5SaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgY2xvc2VCb3RoTWVudXMoKSB7XG4gICAgdGhpcy5jbG9zZUxlZnRNZW51KCk7XG4gICAgdGhpcy5jbG9zZVJpZ2h0TWVudSgpO1xuICB9XG5cbiAgY2xvc2VMZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIGNsb3NlUmlnaHRNZW51KCkge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dChmYWxzZSk7XG4gIH1cblxuICB0b2dnbGVCb3RoTWVudXMoKSB7XG4gICAgdGhpcy50b2dnbGVMZWZ0TWVudSgpO1xuICAgIHRoaXMudG9nZ2xlUmlnaHRNZW51KCk7XG4gIH1cblxuICB0b2dnbGVMZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51Lm9wZW4gPSAhdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICB0b2dnbGVSaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUub3BlbiA9ICF0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgc2V0Qm90aE1lbnVzTW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLnNldExlZnRNZW51TW9kZShtb2RlKTtcbiAgICB0aGlzLnNldFJpZ2h0TWVudU1vZGUobW9kZSk7XG4gIH1cblxuICBzZXRMZWZ0TWVudU1vZGUobW9kZTogJ292ZXInIHwgJ3B1c2gnIHwgJ3NpZGUnID0gJ3NpZGUnKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudU1vZGUubmV4dChtb2RlKTtcbiAgfVxuXG4gIHNldFJpZ2h0TWVudU1vZGUobW9kZTogJ292ZXInIHwgJ3B1c2gnIHwgJ3NpZGUnID0gJ3NpZGUnKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51TW9kZS5uZXh0KG1vZGUpO1xuICB9XG5cbiAgdG9nZ2xlUHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gIXRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgc2hvd1Byb2dyZXNzQmFyKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBoaWRlUHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5wcm9ncmVzc0JhclZpc2libGUubmV4dChmYWxzZSk7XG4gIH1cblxuICBsZWZ0U2lkZW5hdk9wZW5lZENoYW5nZShvcGVuZWRTdGF0dXMpIHtcbiAgICB0aGlzLmxlZnRNZW51Lm9wZW4gPSBvcGVuZWRTdGF0dXM7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dChvcGVuZWRTdGF0dXMpO1xuICB9XG5cbiAgcmlnaHRTaWRlbmF2T3BlbmVkQ2hhbmdlKG9wZW5lZFN0YXR1cykge1xuICAgIHRoaXMucmlnaHRNZW51Lm9wZW4gPSBvcGVuZWRTdGF0dXM7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KG9wZW5lZFN0YXR1cyk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdEFuZFNob3dDaGlsZENvbXBvbmVudHMoKSB7XG5cbiAgICB0aGlzLnRvb2xiYXIubGVmdE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRoaXMubGVmdE1lbnUgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB0aGlzLnRvb2xiYXIucmlnaHRNZW51VHJpZ2dlclZpc2libGUgPSB0aGlzLnJpZ2h0TWVudSA/IHRydWUgOiBmYWxzZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1Rvb2xiYXJFdmVudHMoKSB7XG5cbiAgICBpZiAodGhpcy50b29sYmFyKSB7XG5cbiAgICAgIHRoaXMudG9vbGJhci50b2dnbGVMZWZ0TWVudS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxlZnRTaWRlbmF2LnRvZ2dsZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudG9vbGJhci50b2dnbGVSaWdodE1lbnUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5yaWdodFNpZGVuYXYudG9nZ2xlKCk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0aWFsUmlnaHRNZW51VmlzaWJpbGl0eU1vZGVzKCkge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dCghdGhpcy5kZWNTaWRlbmF2U2VydmljZS5nZXRTaWRlbmF2VmlzaWJpbGl0eSgncmlnaHRNZW51SGlkZGVuJykpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0aWFsTGVmdE1lbnVWaXNpYmlsaXR5TW9kZXMoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dCghdGhpcy5kZWNTaWRlbmF2U2VydmljZS5nZXRTaWRlbmF2VmlzaWJpbGl0eSgnbGVmdE1lbnVIaWRkZW4nKSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtc2lkZW5hdi1jb250ZW50LXdyYXBwZXJcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1zaWRlbmF2LWNvbnRlbnQtd3JhcHBlcntwYWRkaW5nOjMycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdkNvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51JyxcbiAgdGVtcGxhdGU6IGA8bWF0LWxpc3Q+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbS5zdGFydGVkICYmIGl0ZW0udGVtcGxhdGUgPyB0cnVlIDogZmFsc2VcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbS50ZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3RyZWVMZXZlbDogdHJlZUxldmVsICsgMX1cIlxuICAgICAgPjwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9tYXQtbGlzdD5cbmAsXG4gIHN0eWxlczogW2AubWF0LWxpc3R7cGFkZGluZy10b3A6MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudUNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgaXRlbXMgPSBbXTtcblxuICBASW5wdXQoKSB0cmVlTGV2ZWwgPSAtMTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NpZGVuYXZDb21wb25lbnQgfSBmcm9tICcuL3NpZGVuYXYuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdFNpZGVuYXZNb2R1bGUsIE1hdExpc3RNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsIE1hdFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY1NpZGVuYXZDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1jb250ZW50L2RlYy1zaWRlbmF2LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LWxlZnQvZGVjLXNpZGVuYXYtbWVudS1sZWZ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51L2RlYy1zaWRlbmF2LW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUvZGVjLXNpZGVuYXYtbWVudS10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LXRvb2xiYXIvZGVjLXNpZGVuYXYtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUvZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuL3NpZGVuYXYuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjU2lkZW5hdkNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2Q29udGVudENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjU2lkZW5hdkNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2Q29udGVudENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNTaWRlbmF2U2VydmljZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG53aW5kb3dbJ2RlY29yYVNjcmlwdFNlcnZpY2UnXSA9IHdpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddIHx8IHt9O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGxvYWQodXJsOiBzdHJpbmcsIHNjcmlwdE5hbWU6IHN0cmluZykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHNjcmlwdExvYWRlZCA9IHdpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddW3NjcmlwdE5hbWVdO1xuXG4gICAgICBpZiAoc2NyaXB0TG9hZGVkKSB7XG5cbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gd2luZG93W3NjcmlwdE5hbWVdO1xuXG4gICAgICAgIHJlc29sdmUoc2NyaXB0KTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBjb25zdCBzY3JpcHRUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICBzY3JpcHRUYWcuc2V0QXR0cmlidXRlKCdzcmMnLCB1cmwpO1xuXG4gICAgICAgIHNjcmlwdFRhZy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XG5cbiAgICAgICAgc2NyaXB0VGFnLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIHdpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddW3NjcmlwdE5hbWVdID0gdHJ1ZTtcblxuICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IHdpbmRvd1tzY3JpcHROYW1lXTtcblxuICAgICAgICAgIHJlc29sdmUoc2NyaXB0KTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHNjcmlwdFRhZy5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc2NyaXB0VGFnKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfTtcblxuICBsb2FkU3R5bGUodXJsOiBzdHJpbmcpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIHdpbmRvd1snc2NyaXB0U2VydmljZUxvYWRlZFN0eWxlc0FycmF5J10gPSB3aW5kb3dbJ3NjcmlwdFNlcnZpY2VMb2FkZWRTdHlsZXNBcnJheSddIHx8IHt9O1xuXG4gICAgICBjb25zdCBzdHlsZUxvYWRlZCA9IHdpbmRvd1snc2NyaXB0U2VydmljZUxvYWRlZFN0eWxlc0FycmF5J11bdXJsXTtcblxuICAgICAgaWYgKHN0eWxlTG9hZGVkKSB7XG5cbiAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnN0IGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICAgICAgbGlua1RhZy5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XG4gICAgICAgIGxpbmtUYWcuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICAgIGxpbmtUYWcuc2V0QXR0cmlidXRlKCdtZWRpYScsICdhbGwnKTtcbiAgICAgICAgbGlua1RhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuXG4gICAgICAgIGxpbmtUYWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgd2luZG93WydzY3JpcHRTZXJ2aWNlTG9hZGVkU3R5bGVzQXJyYXknXVt1cmxdID0gdHJ1ZTtcblxuICAgICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGxpbmtUYWcub25lcnJvciA9IHJlamVjdDtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGxpbmtUYWcpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9O1xuXG4gIGxvYWRTdHlsZUFuZFNjcmlwdChzdHlsZVVybCwgc2NyaXB0VXJsLCBzY3JpcHROYW1lc3BhY2UpIHtcblxuICAgIHJldHVybiB0aGlzLmxvYWRTdHlsZShzdHlsZVVybCkudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkKHNjcmlwdFVybCwgc2NyaXB0TmFtZXNwYWNlKTtcbiAgICB9KTtcblxuICB9XG5cbiAgbG9hZExlYWZsZXRTY3JpcHRzQW5kU3R5bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZFN0eWxlKCdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuMy4zL2Rpc3QvbGVhZmxldC5jc3MnKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRTdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLmNzcycpLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkU3R5bGUoJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbGVhZmxldC1lYXN5YnV0dG9uQDIvc3JjL2Vhc3ktYnV0dG9uLmNzcycpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmxvYWQoJ2h0dHBzOi8vdW5wa2cuY29tL2xlYWZsZXRAMS4zLjMvZGlzdC9sZWFmbGV0LmpzJywgJ0xlYWZsZXQnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWQoJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbGVhZmxldC1lYXN5YnV0dG9uQDIvc3JjL2Vhc3ktYnV0dG9uLmpzJywgJ0Vhc3lCdXR0b24nKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NjcmlwdExvYWRlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3NjcmlwdC1sb2FkZXIvZGVjLXNjcmlwdC1sb2FkZXIuc2VydmljZSc7XG5cbmNvbnN0IFNLRVRDSEZBQl9TQ1JJUFRfVVJMID0gJ2h0dHBzOi8vc3RhdGljLnNrZXRjaGZhYi5jb20vYXBpL3NrZXRjaGZhYi12aWV3ZXItMS4wLjAuanMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2tldGNoZmFiLXZpZXcnLFxuICB0ZW1wbGF0ZTogYDxpZnJhbWUgc3JjPVwiXCIgXG4gICNhcGlGcmFtZSBcbiAgaWQ9XCJhcGktZnJhbWVcIiBcbiAgaGVpZ2h0PVwiNjIwXCJcbiAgd2lkdGg9XCI2MjBcIiBcbiAgYWxsb3dmdWxsc2NyZWVuIFxuICBtb3phbGxvd2Z1bGxzY3JlZW49XCJ0cnVlXCIgXG4gIHdlYmtpdGFsbG93ZnVsbHNjcmVlbj1cInRydWVcIj48L2lmcmFtZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2tldGNoZmFiVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgXG4gIHNldCBza2V0Y2hmYWJJZChpZCkge1xuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5fc2tldGNoZmFiSWQgPSBpZDtcbiAgICAgIHRoaXMuc3RhcnRTa2V0Y2hmYWIoaWQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBza2V0Y2hmYWJJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2tldGNoZmFiSWQ7XG4gIH1cblxuICBfc2tldGNoZmFiSWQ6IHN0cmluZztcblxuICBAVmlld0NoaWxkKCdhcGlGcmFtZScpIGFwaUZyYW1lOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjU2NyaXB0TG9hZGVyU2VydmljZTogRGVjU2NyaXB0TG9hZGVyU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBzdGFydFNrZXRjaGZhYihpZCkge1xuICAgIHRoaXMuZGVjU2NyaXB0TG9hZGVyU2VydmljZS5sb2FkKFNLRVRDSEZBQl9TQ1JJUFRfVVJMLCAnU2tldGNoZmFiJylcbiAgICAgIC50aGVuKChTa2V0Y2hmYWI6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBpZnJhbWUgPSB0aGlzLmFwaUZyYW1lLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBTa2V0Y2hmYWIoJzEuMC4wJywgaWZyYW1lKTtcbiAgICAgICAgY2xpZW50LmluaXQodGhpcy5za2V0Y2hmYWJJZCwge1xuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIG9uU3VjY2VzcyhhcGkpIHtcbiAgICAgICAgICAgIGFwaS5zdGFydCgpO1xuICAgICAgICAgICAgYXBpLmFkZEV2ZW50TGlzdGVuZXIoJ3ZpZXdlcnJlYWR5JywgICgpID0+IHt9KTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtc2NyaXB0LWxvYWRlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2NyaXB0TG9hZGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTY3JpcHRMb2FkZXJNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3NjcmlwdC1sb2FkZXIvZGVjLXNjcmlwdC1sb2FkZXIubW9kdWxlJztcbmltcG9ydCB7IERlY1NrZXRjaGZhYlZpZXdDb21wb25lbnQgfSBmcm9tICcuL2RlYy1za2V0Y2hmYWItdmlldy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY1NjcmlwdExvYWRlck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNTa2V0Y2hmYWJWaWV3Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNTa2V0Y2hmYWJWaWV3Q29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2tldGNoZmFiVmlld01vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0ZXAgfSBmcm9tICcuL2RlYy1zdGVwcy1saXN0Lm1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zdGVwcy1saXN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaGlzdG9yeS1jb250YWluZXJcIiBbbmdDbGFzc109XCJ7J2xpbWl0ZWQtaGVpZ2h0JzogbWF4SGVpZ2h0fVwiIFtzdHlsZS5tYXhIZWlnaHRdPVwibWF4SGVpZ2h0IHx8ICcxMDAlJ1wiPlxuXG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBjbGFzcz1cImRlYy1jb2xvci1ncmV5LWRhcmtcIj5cblxuICAgIDxtYXQtaWNvbiBmeEZsZXg9XCIyNHB4XCI+e3tpY29ufX08L21hdC1pY29uPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaWdnZXItZm9udFwiPnt7IHRpdGxlIH19PC9zcGFuPlxuXG4gIDwvZGl2PlxuXG4gIDxicj5cblxuICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaGlzdG9yeS1pdGVtXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RlcHNMaXN0OyBsZXQgaSA9IGluZGV4XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJsZWZ0IHN0YXJ0XCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleVwiPlxuXG4gICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInNtYWxsZXItaWNvbiBkZWMtY29sb3ItZ3JleS1kYXJrXCIgZnhGbGV4PVwiMjRweFwiPnt7IGkgPT09IHN0ZXBzTGlzdC5sZW5ndGggLSAxID8gJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnIDogJ2xlbnMnIH19PC9tYXQtaWNvbj5cblxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCI0cHhcIj5cblxuICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgIDxzdHJvbmcgKm5nSWY9XCJpdGVtLnRpdGxlXCI+e3sgaXRlbS50aXRsZSB9fTwvc3Ryb25nPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uZGF0ZVwiPlxuICAgICAgICAgICAgICB7eyBpdGVtLmRhdGUgfCBkYXRlIH19XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd1RpbWVcIj4gfCB7eyBpdGVtLmRhdGUgfCBkYXRlOiAnbWVkaXVtVGltZScgfX08L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJpdGVtLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleS1kYXJrXCI+XG4gICAgICAgICAgICA8c3Ryb25nIGNsYXNzPVwiZGVjLWNvbG9yLWJsYWNrXCI+e3sgaXRlbS5kZXNjcmlwdGlvbiB9fTwvc3Ryb25nPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtdGFiLWJvZHktY29udGVudHtwYWRkaW5nOjE2cHggMH0ubWF0LWZvcm0tZmllbGQtcHJlZml4e21hcmdpbi1yaWdodDo4cHghaW1wb3J0YW50fS5tYXQtZm9ybS1maWVsZC1zdWZmaXh7bWFyZ2luLWxlZnQ6OHB4IWltcG9ydGFudH0ubWF0LWVsZXZhdGlvbi16MHtib3gtc2hhZG93OjAgMCAwIDAgcmdiYSgwLDAsMCwuMiksMCAwIDAgMCByZ2JhKDAsMCwwLC4xNCksMCAwIDAgMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejF7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoye2JveC1zaGFkb3c6MCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16M3tib3gtc2hhZG93OjAgM3B4IDNweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgM3B4IDRweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejR7Ym94LXNoYWRvdzowIDJweCA0cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDRweCA1cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMTBweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NXtib3gtc2hhZG93OjAgM3B4IDVweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNXB4IDhweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxNHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo2e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA2cHggMTBweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxOHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo3e2JveC1zaGFkb3c6MCA0cHggNXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCA3cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgMnB4IDE2cHggMXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OHtib3gtc2hhZG93OjAgNXB4IDVweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOHB4IDEwcHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNHB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejl7Ym94LXNoYWRvdzowIDVweCA2cHggLTNweCByZ2JhKDAsMCwwLC4yKSwwIDlweCAxMnB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAzcHggMTZweCAycHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMHtib3gtc2hhZG93OjAgNnB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgMTBweCAxNHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMThweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMXtib3gtc2hhZG93OjAgNnB4IDdweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTFweCAxNXB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMjBweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMntib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTJweCAxN3B4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjJweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxM3tib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTNweCAxOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjRweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNHtib3gtc2hhZG93OjAgN3B4IDlweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTRweCAyMXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjZweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNXtib3gtc2hhZG93OjAgOHB4IDlweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTVweCAyMnB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMjhweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNntib3gtc2hhZG93OjAgOHB4IDEwcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE2cHggMjRweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMwcHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTd7Ym94LXNoYWRvdzowIDhweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxN3B4IDI2cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAzMnB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE4e2JveC1zaGFkb3c6MCA5cHggMTFweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMThweCAyOHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzRweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxOXtib3gtc2hhZG93OjAgOXB4IDEycHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDE5cHggMjlweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgN3B4IDM2cHggNnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjB7Ym94LXNoYWRvdzowIDEwcHggMTNweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjBweCAzMXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggMzhweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMXtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMXB4IDMzcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCA0MHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIye2JveC1zaGFkb3c6MCAxMHB4IDE0cHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIycHggMzVweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQycHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjN7Ym94LXNoYWRvdzowIDExcHggMTRweCAtN3B4IHJnYmEoMCwwLDAsLjIpLDAgMjNweCAzNnB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA5cHggNDRweCA4cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyNHtib3gtc2hhZG93OjAgMTFweCAxNXB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyNHB4IDM4cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NnB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1iYWRnZS1zbWFsbCAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjZweH0ubWF0LWJhZGdlLWxhcmdlIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6MjRweH0ubWF0LWgxLC5tYXQtaGVhZGxpbmUsLm1hdC10eXBvZ3JhcGh5IGgxe2ZvbnQ6NDAwIDI0cHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDIsLm1hdC10aXRsZSwubWF0LXR5cG9ncmFwaHkgaDJ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMywubWF0LXN1YmhlYWRpbmctMiwubWF0LXR5cG9ncmFwaHkgaDN7Zm9udDo0MDAgMTZweC8yOHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNCwubWF0LXN1YmhlYWRpbmctMSwubWF0LXR5cG9ncmFwaHkgaDR7Zm9udDo0MDAgMTVweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgaDV7Zm9udDo0MDAgMTEuNjJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgaDZ7Zm9udDo0MDAgOS4zOHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWJvZHktMiwubWF0LWJvZHktc3Ryb25ne2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5LC5tYXQtYm9keS0xLC5tYXQtdHlwb2dyYXBoeXtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSBwLC5tYXQtYm9keS0xIHAsLm1hdC10eXBvZ3JhcGh5IHB7bWFyZ2luOjAgMCAxMnB4fS5tYXQtY2FwdGlvbiwubWF0LXNtYWxse2ZvbnQ6NDAwIDEycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1kaXNwbGF5LTQsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS00e2ZvbnQ6MzAwIDExMnB4LzExMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDU2cHg7bGV0dGVyLXNwYWNpbmc6LS4wNWVtfS5tYXQtZGlzcGxheS0zLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktM3tmb250OjQwMCA1NnB4LzU2cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAyZW19Lm1hdC1kaXNwbGF5LTIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ye2ZvbnQ6NDAwIDQ1cHgvNDhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDA1ZW19Lm1hdC1kaXNwbGF5LTEsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0xe2ZvbnQ6NDAwIDM0cHgvNDBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4fS5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtZmxhdC1idXR0b24sLm1hdC1pY29uLWJ1dHRvbiwubWF0LW1pbmktZmFiLC5tYXQtcmFpc2VkLWJ1dHRvbiwubWF0LXN0cm9rZWQtYnV0dG9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1idXR0b24tdG9nZ2xlLC5tYXQtY2FyZHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWNhcmQtY29udGVudCwubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZSwubWF0LWNhcmQtc3VidGl0bGV7Zm9udC1zaXplOjE0cHh9Lm1hdC1jaGVja2JveHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jaGVja2JveC1sYXlvdXQgLm1hdC1jaGVja2JveC1sYWJlbHtsaW5lLWhlaWdodDoyNHB4fS5tYXQtY2hpcHtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDoxOHB4fS5tYXQtY2hpcCAubWF0LWNoaXAtcmVtb3ZlLm1hdC1pY29uLC5tYXQtY2hpcCAubWF0LWNoaXAtdHJhaWxpbmctaWNvbi5tYXQtaWNvbntmb250LXNpemU6MThweH0ubWF0LXRhYmxle2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWhlYWRlci1jZWxse2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNlbGwsLm1hdC1mb290ZXItY2VsbHtmb250LXNpemU6MTRweH0ubWF0LWNhbGVuZGFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhbGVuZGFyLWJvZHl7Zm9udC1zaXplOjEzcHh9Lm1hdC1jYWxlbmRhci1ib2R5LWxhYmVsLC5tYXQtY2FsZW5kYXItcGVyaW9kLWJ1dHRvbntmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXIgdGh7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtZGlhbG9nLXRpdGxle2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTVweDtmb250LXdlaWdodDo0MDB9Lm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlO2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjEyNTtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29ue2ZvbnQtc2l6ZToxNTAlO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b257aGVpZ2h0OjEuNWVtO3dpZHRoOjEuNWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbntoZWlnaHQ6MS4xMjVlbTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNWVtIDA7Ym9yZGVyLXRvcDouODQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudH0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlcnt0b3A6LS44NDM3NWVtO3BhZGRpbmctdG9wOi44NDM3NWVtfS5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7Zm9udC1zaXplOjc1JTttYXJnaW4tdG9wOi42NjY2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjc5MTY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi40Mzc1ZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbDotd2Via2l0LWF1dG9maWxsKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIzZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM1JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjI4MTI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye21hcmdpbi10b3A6LjU0MTY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNjY2NjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouMjVlbSAwIC43NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjA5Mzc1ZW07bWFyZ2luLXRvcDotLjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6MWVtIDB9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtb3V0bGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjg0Mzc1ZW07bWFyZ2luLXRvcDotLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyLC5tYXQtZ3JpZC10aWxlLWhlYWRlcntmb250LXNpemU6MTRweH0ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lLC5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTJweH1pbnB1dC5tYXQtaW5wdXQtZWxlbWVudHttYXJnaW4tdG9wOi0uMDYyNWVtfS5tYXQtbWVudS1pdGVte2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1wYWdpbmF0b3IsLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4fS5tYXQtcmFkaW8tYnV0dG9uLC5tYXQtc2VsZWN0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNlbGVjdC10cmlnZ2Vye2hlaWdodDoxLjEyNWVtfS5tYXQtc2xpZGUtdG9nZ2xlLWNvbnRlbnR7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1zdGVwcGVyLWhvcml6b250YWwsLm1hdC1zdGVwcGVyLXZlcnRpY2Fse2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXN0ZXAtbGFiZWx7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtc3RlcC1sYWJlbC1zZWxlY3RlZHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC10YWItZ3JvdXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLWxpbmt7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRvb2xiYXIsLm1hdC10b29sYmFyIGgxLC5tYXQtdG9vbGJhciBoMiwubWF0LXRvb2xiYXIgaDMsLm1hdC10b29sYmFyIGg0LC5tYXQtdG9vbGJhciBoNSwubWF0LXRvb2xiYXIgaDZ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MH0ubWF0LXRvb2x0aXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjZweDtwYWRkaW5nLWJvdHRvbTo2cHh9Lm1hdC10b29sdGlwLWhhbmRzZXR7Zm9udC1zaXplOjE0cHg7cGFkZGluZy10b3A6OXB4O3BhZGRpbmctYm90dG9tOjlweH0ubWF0LWxpc3QtaXRlbSwubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWxpc3QgLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTZweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxNHB4fS5tYXQtbGlzdCAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTJweH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LW9wdGlvbntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHh9Lm1hdC1vcHRncm91cC1sYWJlbHtmb250OjUwMCAxNHB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2ltcGxlLXNuYWNrYmFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweH0ubWF0LXNpbXBsZS1zbmFja2Jhci1hY3Rpb257bGluZS1oZWlnaHQ6MTtmb250LWZhbWlseTppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRyZWV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdHJlZS1ub2Rle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTRweH0ubWF0LXJpcHBsZXtvdmVyZmxvdzpoaWRkZW59QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7Lm1hdC1yaXBwbGV7ZGlzcGxheTpub25lfX0ubWF0LXJpcHBsZS5tYXQtcmlwcGxlLXVuYm91bmRlZHtvdmVyZmxvdzp2aXNpYmxlfS5tYXQtcmlwcGxlLWVsZW1lbnR7cG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyLXJhZGl1czo1MCU7cG9pbnRlci1ldmVudHM6bm9uZTt0cmFuc2l0aW9uOm9wYWNpdHksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7dHJhbnNpdGlvbjpvcGFjaXR5LHRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpLC13ZWJraXQtdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfS5jZGstdmlzdWFsbHktaGlkZGVue2JvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O21hcmdpbjotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MXB4O291dGxpbmU6MDstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXIsLmNkay1vdmVybGF5LWNvbnRhaW5lcntwb2ludGVyLWV2ZW50czpub25lO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1jb250YWluZXI6ZW1wdHl7ZGlzcGxheTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlcntkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1wYW5le3Bvc2l0aW9uOmFic29sdXRlO3BvaW50ZXItZXZlbnRzOmF1dG87Ym94LXNpemluZzpib3JkZXItYm94O3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7bWF4LXdpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlfS5jZGstb3ZlcmxheS1iYWNrZHJvcHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDt6LWluZGV4OjEwMDA7cG9pbnRlci1ldmVudHM6YXV0bzstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7dHJhbnNpdGlvbjpvcGFjaXR5IC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtvcGFjaXR5OjB9LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eToxfUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6LjZ9fS5jZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9we2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMjg4KX0uY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AsLmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTowfS5jZGstb3ZlcmxheS1jb25uZWN0ZWQtcG9zaXRpb24tYm91bmRpbmctYm94e3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21pbi13aWR0aDoxcHg7bWluLWhlaWdodDoxcHh9LmNkay1nbG9iYWwtc2Nyb2xsYmxvY2t7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtvdmVyZmxvdy15OnNjcm9sbH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOi13ZWJraXQtYXV0b2ZpbGx7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOm5vdCg6LXdlYmtpdC1hdXRvZmlsbCl7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZXtyZXNpemU6bm9uZX10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5ne2hlaWdodDphdXRvIWltcG9ydGFudDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3BhZGRpbmc6MnB4IDAhaW1wb3J0YW50O2JveC1zaXppbmc6Y29udGVudC1ib3ghaW1wb3J0YW50fS5oaXN0b3J5LWNvbnRhaW5lcnttYXJnaW46MS41ZW0gMH0uaGlzdG9yeS1jb250YWluZXIubGltaXRlZC1oZWlnaHR7b3ZlcmZsb3cteTphdXRvfS5oaXN0b3J5LWNvbnRhaW5lciAuaGlzdG9yeS1pdGVtOm5vdCg6bGFzdC1jaGlsZCl7cG9zaXRpb246cmVsYXRpdmV9Lmhpc3RvcnktY29udGFpbmVyIC5oaXN0b3J5LWl0ZW06bm90KDpsYXN0LWNoaWxkKTo6YmVmb3Jle2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6M2VtO3dpZHRoOjJweDtiYWNrZ3JvdW5kLWNvbG9yOiM5MTk3OWM7bGVmdDoxMXB4O3RvcDoxNHB4fS5oaXN0b3J5LWNvbnRhaW5lciAuaGlzdG9yeS1pdGVtIC5zbWFsbGVyLWljb257Zm9udC1zaXplOjE2cHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7bWFyZ2luLXRvcDoycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RlcHNMaXN0Q29tcG9uZW50IHtcblxuICBASW5wdXQoKSBpY29uID0gJ2hpc3RvcnknO1xuXG4gIEBJbnB1dCgpIHRpdGxlID0gJyc7XG5cbiAgQElucHV0KCkgc2hvd1RpbWU6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbWF4SGVpZ2h0O1xuXG4gIEBJbnB1dCgpIHN0ZXBzTGlzdDogU3RlcFtdID0gW107XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU3RlcHNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc3RlcHMtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNTdGVwc0xpc3RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjU3RlcHNMaXN0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RlcHNMaXN0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIGZvcndhcmRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc3RyaW5nLWFycmF5LWlucHV0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtb2RlID09ICdpbnB1dCdcIj5cblxuICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgWyhuZ01vZGVsKV09XCJ2YWx1ZUFzU3RyaW5nXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cblxuICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgPHRleHRhcmVhIG1hdElucHV0XG4gICAgW3Jvd3NdPVwicm93c1wiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgWyhuZ01vZGVsKV09XCJ2YWx1ZUFzU3RyaW5nXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgICA8L3RleHRhcmVhPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY1N0cmluZ0FycmF5SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIG5hbWU7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI7XG5cbiAgQElucHV0KCkgbW9kZSA9ICd0ZXh0YXJlYSc7XG5cbiAgQElucHV0KCkgcm93cyA9IDM7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZ1tdIHtcblxuICAgIHJldHVybiB0aGlzLmlubmVyQXJyYXk7XG5cbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IHN0cmluZ1tdKSB7XG5cbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lckFycmF5KSB7XG5cbiAgICAgIHRoaXMuaW5uZXJBcnJheSA9IHY7XG5cbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IHZhbHVlQXNTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLmdldEFycmF5QXNTdHJpbmcoKTtcblxuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWVBc1N0cmluZyh2OiBzdHJpbmcpIHtcblxuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyQXJyYXkpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RyaW5nVG9BcnJheSh2KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lckFycmF5OiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIC8vXG4gIGdldEFycmF5QXNTdHJpbmcoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5hcnJheVRvU3RyaW5nKHRoaXMudmFsdWUpO1xuXG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmdbXSkge1xuXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgIH1cblxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdHJpbmdUb0FycmF5KHN0cmluZ09mQXJyYXk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBpZiAoc3RyaW5nT2ZBcnJheSkge1xuXG4gICAgICBjb25zdCByZWdFeHAgPSAvW14sXFxzXVteLFxcc10qW14sXFxzXSovZztcblxuICAgICAgcmV0dXJuIHN0cmluZ09mQXJyYXkubWF0Y2gocmVnRXhwKTtcblxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXJyYXlUb1N0cmluZyhhcnJheU9mc3RyaW5nOiBzdHJpbmdbXSk6IHN0cmluZyB7XG5cbiAgICBpZiAoYXJyYXlPZnN0cmluZykge1xuXG4gICAgICByZXR1cm4gYXJyYXlPZnN0cmluZy5qb2luKCcsICcpO1xuXG4gICAgfVxuXG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc3RyaW5nLWFycmF5LWlucHV0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RyaW5nQXJyYXlJbnB1dE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXRhYicsXG4gIHRlbXBsYXRlOiBgYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRvdGFsOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgY29udGVudDogVGVtcGxhdGVSZWY8RGVjVGFiQ29tcG9uZW50PjtcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZW5zdXJlVGFiTmFtZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVUYWJOYW1lID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlY1RhYkNvbXBvbmVudEVycm9yOiBUaGUgPGRlYy10YWI+IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50LicpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy10YWItbWVudScsXG4gIHRlbXBsYXRlOiBgPHA+XG4gIHRhYi1tZW51IHdvcmtzIVxuPC9wPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYk1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGFjdGl2ZVRhYjogc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPERlY1RhYk1lbnVDb21wb25lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi90YWIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1RhYk1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RhYi1tZW51L3RhYi1tZW51LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy10YWJzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiIWhpZGRlblwiPlxuXG4gIDwhLS0gVEFCUyAtLT5cbiAgPG1hdC10YWItZ3JvdXAgW3NlbGVjdGVkSW5kZXhdPVwiYWN0aXZlVGFiSW5kZXhcIiAoZm9jdXNDaGFuZ2UpPVwib25DaGFuZ2VUYWIoJGV2ZW50KVwiIFtkeW5hbWljSGVpZ2h0XT1cInRydWVcIj5cblxuICAgIDwhLS0gVEFCIC0tPlxuICAgIDxtYXQtdGFiICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFicztcIiBbZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCI+XG5cbiAgICAgIDwhLS0gVEFCIExBQkVMIC0tPlxuICAgICAgPG5nLXRlbXBsYXRlIG1hdC10YWItbGFiZWw+XG4gICAgICAgIHt7IHRhYi5sYWJlbCB9fVxuICAgICAgICA8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2Utc21hbGxcIiAqbmdJZj1cInRhYi50b3RhbCA+PSAwXCI+e3sgcGFyc2VUb3RhbCh0YWIudG90YWwpIH19PC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPCEtLSBUQUIgQ09OVEVOVCBXUkFQUEVSIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3VsZFRhYkJlRGlzcGxheWVkKHRhYilcIj5cblxuICAgICAgICA8IS0tIFRBQiBNRU5VIC0tPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwidGFiTWVudUNvbXBvbmVudFwiIGNsYXNzPVwibWVudS13cmFwcGVyXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRhYk1lbnVDb21wb25lbnQuY29udGVudDsgY29udGV4dDogeyBhY3RpdmVUYWI6IGFjdGl2ZVRhYiB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS0gVEFCUyBDT05URU5UIC0tPlxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndGFiLXBhZGRpbmcnOiBwYWRkaW5nfVwiPlxuXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRhYi5jb250ZW50XCI+PC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPC9tYXQtdGFiPlxuXG4gIDwvbWF0LXRhYi1ncm91cD5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm1lbnUtd3JhcHBlcnt0ZXh0LWFsaWduOnJpZ2h0O3BhZGRpbmc6OHB4IDB9LnRhYi1wYWRkaW5ne3BhZGRpbmc6MTZweCAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNUYWJDb21wb25lbnQpIHRhYnM6IFF1ZXJ5TGlzdDxEZWNUYWJDb21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjVGFiTWVudUNvbXBvbmVudCkgdGFiTWVudUNvbXBvbmVudDogRGVjVGFiTWVudUNvbXBvbmVudDtcblxuICBASW5wdXQoKSBoaWRkZW47IC8vIGhpZGVzIHRoZSB0YWJzIGdyb3VwIHRvIHJlbG9hZCBpdHMgY29udGVudHNcblxuICBASW5wdXQoKSBwZXJzaXN0ID0gdHJ1ZTtcblxuICBASW5wdXQoKSBkZXN0cm95T25CbHVyID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHBhZGRpbmcgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBhY3RpdmVUYWIodjogc3RyaW5nKSB7XG4gICAgaWYgKHYgJiYgdGhpcy5fYWN0aXZlVGFiICE9PSB2KSB7XG4gICAgICB0aGlzLl9hY3RpdmVUYWIgPSB2O1xuICAgICAgdGhpcy5wZXJzaXN0VGFiKHYpO1xuICAgIH1cbiAgfVxuICBnZXQgYWN0aXZlVGFiKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVUYWI7XG4gIH1cblxuICBAT3V0cHV0KCkgYWN0aXZlVGFiQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGdldCBhY3RpdmVUYWJJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVUYWJJbmRleDtcbiAgfVxuXG4gIGdldCBhY3RpdmVUYWJPYmplY3QoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiT2JqZWN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfYWN0aXZlVGFiOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfYWN0aXZlVGFiSW5kZXg6IG51bWJlcjtcblxuICBwcml2YXRlIF9hY3RpdmVUYWJPYmplY3Q6IGFueTtcblxuICBwcml2YXRlIGFjdGl2YXRlZFRhYnM6IGFueSA9IHt9O1xuXG4gIHByaXZhdGUgcXVlcnlQYXJhbXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIHBhdGhGcm9tUm9vdCA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlTmFtZSgpO1xuICAgIHRoaXMud2F0Y2hUYWJJblVybFF1ZXJ5KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbnN1cmVVbmlxdWVUYWJOYW1lcygpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICAgICAgaWYgKHF1ZXJ5UGFyYW1zICYmIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXSkge1xuICAgICAgICBjb25zdCBjdXJyZW50VGFiID0gcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldO1xuICAgICAgICB0aGlzLnNlbGVjdFRhYihjdXJyZW50VGFiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhcnRTZWxlY3RlZFRhYigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYkluVXJsUXVlcnkoKTtcbiAgfVxuXG4gIHNob3VsZFRhYkJlRGlzcGxheWVkKHRhYikge1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB0aGlzLl9hY3RpdmVUYWJPYmplY3QgPT09IHRhYjtcbiAgICBjb25zdCBpc0FjdGl2YXRlZCA9IHRoaXMuYWN0aXZhdGVkVGFic1t0YWIubmFtZV07XG4gICAgcmV0dXJuIGlzU2VsZWN0ZWQgfHwgKCF0aGlzLmRlc3Ryb3lPbkJsdXIgJiYgaXNBY3RpdmF0ZWQpO1xuICB9XG5cbiAgb25DaGFuZ2VUYWIoJGV2ZW50KSB7XG4gICAgY29uc3QgYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKVskZXZlbnQuaW5kZXhdO1xuICAgIHRoaXMuYWN0aXZlVGFiID0gYWN0aXZlVGFiT2JqZWN0Lm5hbWU7XG4gIH1cblxuICBwYXJzZVRvdGFsKHRvdGFsKSB7XG5cbiAgICByZXR1cm4gdG90YWwgIT09IG51bGwgJiYgdG90YWwgPj0gMCA/ICB0b3RhbCA6ICc/JztcblxuICB9XG5cbiAgcmVzZXQoKSB7XG5cbiAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcblxuICAgIH0sIDEwKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjb21wb25lbnRUYWJOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnLXRhYic7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVVuaXF1ZU5hbWUgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSB0YWIgY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgLyogZW5zdXJlVW5pcXVlVGFiTmFtZXNcbiAgICogVGhpcyBtZXRob2QgcHJldmVudHMgdGhlIHVzZSBvZiB0aGUgc2FtZSBuYW1lIGZvciBtb3JlIHRoYW4gb25lIHRhYlxuICAgKiB3aGF0IHdvdWxkIGVuZGluZyB1cCBjb25mbGljdGluZyB0aGUgdGFicyBhY3RpdmF0aW9uIG9uY2UgdGhpcyBpcyBkb25lIHZpYSB0YWIgbmFtZVxuICAqL1xuXG4gIHByaXZhdGUgZW5zdXJlVW5pcXVlVGFiTmFtZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlcywgcmVqKSA9PiB7XG4gICAgICBjb25zdCBuYW1lcyA9IHt9O1xuICAgICAgdGhpcy50YWJzLnRvQXJyYXkoKS5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICAgIGlmICghbmFtZXNbdGFiLm5hbWVdKSB7XG4gICAgICAgICAgbmFtZXNbdGFiLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWNUYWJDb21wb25lbnRFcnJvcjogVGhlIDxkZWMtdGFicz4gY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gVGhlIG5hbWUgJHt0YWIubmFtZX0gd2FzIHVzZWQgbW9yZSB0aGFuIG9uY2UuYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHBlcnNpc3RUYWIodGFiKSB7XG4gICAgaWYgKHRoaXMucGVyc2lzdCkge1xuICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICAgICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldID0gdGFiO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0VGFiID0gKHRhYk5hbWUpID0+IHtcbiAgICBpZiAodGhpcy50YWJzKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYk5hbWU7XG4gICAgICB0aGlzLmFjdGl2YXRlZFRhYnNbdGFiTmFtZV0gPSB0cnVlO1xuICAgICAgdGhpcy5fYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5maWx0ZXIodGFiID0+IHRhYi5uYW1lID09PSB0YWJOYW1lKVswXTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYkluZGV4ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5pbmRleE9mKHRoaXMuX2FjdGl2ZVRhYk9iamVjdCk7XG4gICAgICB0aGlzLmFjdGl2ZVRhYkNoYW5nZS5lbWl0KHRhYk5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRTZWxlY3RlZFRhYigpIHtcbiAgICBjb25zdCBhY3RpdmVUYWIgPSB0aGlzLmFjdGl2ZVRhYiB8fCB0aGlzLnRhYnMudG9BcnJheSgpWzBdLm5hbWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGF2b2lkIGNoYW5nZSBhZnRlciBjb21wb25lbnQgY2hlY2tlZCBlcnJvclxuICAgICAgdGhpcy5zZWxlY3RUYWIoYWN0aXZlVGFiKTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJJblVybFF1ZXJ5KCkge1xuICAgIHRoaXMucXVlcnlQYXJhbXNTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICBjb25zdCB0YWI6IHN0cmluZyA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV07XG4gICAgICB0aGlzLnNlbGVjdFRhYih0YWIpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCkge1xuICAgIHRoaXMucXVlcnlQYXJhbXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjVGFiQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY1RhYkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY1RhYnNDb21wb25lbnQgfSBmcm9tICcuL3RhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1RhYk1vZHVsZSB9IGZyb20gJy4vdGFiL3RhYi5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjVGFiTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIERlY1RhYk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNUYWJzQ29tcG9uZW50LCBEZWNUYWJNZW51Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1xuICAgIERlY1RhYnNDb21wb25lbnQsXG4gICAgRGVjVGFiTWVudUNvbXBvbmVudCxcbiAgICBEZWNUYWJNb2R1bGVcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFic01vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEV2ZW50VHlwZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFVwbG9hZFByb2dyZXNzIH0gZnJvbSAnLi91cGxvYWQubW9kZWxzJztcblxuY29uc3QgVVBMT0FEX0VORFBPSU5UID0gJy91cGxvYWQnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBERUNfVVBMT0FEX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY1VwbG9hZENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtdXBsb2FkJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCIocHJvZ3Jlc3NlcyAmJiBwcm9ncmVzc2VzLmxlbmd0aCkgPyB0cnVlIDogZmFsc2VcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cbiAgICA8c3BhbiAoY2xpY2spPVwib3BlbkZpbGVTZWxlY3Rpb24oKVwiIGNsYXNzPVwiY2xpY2tcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L3NwYW4+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgdXBsb2FkUHJvZ3Jlc3Mgb2YgcHJvZ3Jlc3Nlc1wiIGNsYXNzPVwiZGVjLXVwbG9hZC1wcm9ncmVzcy13cmFwcGVyXCI+XG4gICAgICA8bWF0LXByb2dyZXNzLWJhclxuICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICBbbW9kZV09XCJnZXRQcm9ncmVzc2Jhck1vZGUodXBsb2FkUHJvZ3Jlc3MpXCJcbiAgICAgICAgW3ZhbHVlXT1cImdldFByb2dyZXNzVmFsdWVCYXNlZE9uTW9kZSh1cGxvYWRQcm9ncmVzcylcIj5cbiAgICAgIDwvbWF0LXByb2dyZXNzLWJhcj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICA8c21hbGw+XG4gICAgICAgICAge3sgdXBsb2FkUHJvZ3Jlc3MudmFsdWUgfX0lIC0ge3sgdXBsb2FkUHJvZ3Jlc3MuZmlsZU5hbWUgfX1cbiAgICAgICAgPC9zbWFsbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuXG5cbjxpbnB1dCB0eXBlPVwiZmlsZVwiICNpbnB1dEZpbGUgKGNoYW5nZSk9XCJmaWxlc0NoYW5nZWQoJGV2ZW50KVwiIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuXG5gLFxuICBzdHlsZXM6IFtgLmNsaWNre2N1cnNvcjpwb2ludGVyfWlucHV0e2Rpc3BsYXk6bm9uZX0udGV4dC1jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LmRlYy11cGxvYWQtcHJvZ3Jlc3Mtd3JhcHBlcntwYWRkaW5nOjhweCAwfWBdLFxuICBwcm92aWRlcnM6IFtERUNfVVBMT0FEX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY1VwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBwcm9ncmVzc2VzOiBVcGxvYWRQcm9ncmVzc1tdID0gW107XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSB1cGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgcHJvZ3Jlc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXRGaWxlJykgaW5wdXRGaWxlOiBFbGVtZW50UmVmO1xuXG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnlbXTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgVkFMVUVcbiAgKi9cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHY6IGFueVtdKSB7XG4gICAgdGhpcy52YWx1ZSA9IHY7XG4gIH1cblxuXG4gIGZpbGVzQ2hhbmdlZChldmVudCkge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZXZlbnQudGFyZ2V0LmZpbGVzLmxlbmd0aDsgeCsrKSB7XG4gICAgICB0aGlzLnVwbG9hZEZpbGUoZXZlbnQudGFyZ2V0LmZpbGVzW3hdLCB4KTtcbiAgICB9XG4gIH1cblxuICBvcGVuRmlsZVNlbGVjdGlvbigpIHtcbiAgICB0aGlzLmlucHV0RmlsZS5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxuICBnZXRQcm9ncmVzc2Jhck1vZGUocHJvZ3Jlc3MpIHtcblxuICAgIGxldCBtb2RlO1xuXG4gICAgc3dpdGNoIChwcm9ncmVzcy52YWx1ZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBtb2RlID0gJ2J1ZmZlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMDA6XG4gICAgICAgIG1vZGUgPSAnaW5kZXRlcm1pbmF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBtb2RlO1xuXG4gIH1cblxuICBnZXRQcm9ncmVzc1ZhbHVlQmFzZWRPbk1vZGUocHJvZ3Jlc3MpIHtcbiAgICBjb25zdCBtb2RlID0gdGhpcy5nZXRQcm9ncmVzc2Jhck1vZGUocHJvZ3Jlc3MpO1xuICAgIGNvbnN0IHZhbHVlID0gbW9kZSA9PT0gJ2J1ZmZlcicgPyAwIDogcHJvZ3Jlc3MudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGxvYWRGaWxlKGZpbGUsIGluZGV4KSB7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGNvbnN0IHByb2dyZXNzOiBVcGxvYWRQcm9ncmVzcyA9IHtcbiAgICAgICAgZmlsZUluZGV4OiBpbmRleCxcbiAgICAgICAgZmlsZU5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgdmFsdWU6IDAsXG4gICAgICB9O1xuICAgICAgdGhpcy5wcm9ncmVzc2VzLnB1c2gocHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5zZXJ2aWNlLnVwbG9hZChVUExPQURfRU5EUE9JTlQsIFtmaWxlXSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NhdGNoRXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgcHJvZ3Jlc3MuZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgIHRoaXMuZXJyb3IuZW1pdCgnbWVzc2FnZS5lcnJvci51bmV4cGVjdGVkJyk7XG4gICAgICAgICAgdGhpcy5kZXRlY3RVcGxvYWRFbmQoKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzcykge1xuICAgICAgICAgIGNvbnN0IHBlcmNlbnREb25lID0gTWF0aC5yb3VuZCgoMTAwICogZXZlbnQubG9hZGVkKSAvIGV2ZW50LnRvdGFsKTtcbiAgICAgICAgICBwcm9ncmVzcy52YWx1ZSA9IHBlcmNlbnREb25lID09PSAxMDAgPyBwZXJjZW50RG9uZSA6IHBhcnNlRmxvYXQocGVyY2VudERvbmUudG9GaXhlZCgyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICBwcm9ncmVzcy52YWx1ZSA9IDEwMDtcbiAgICAgICAgICBwcm9ncmVzcy5maWxlID0gZXZlbnQuYm9keTtcbiAgICAgICAgICB0aGlzLmRldGVjdFVwbG9hZEVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MuZW1pdCh0aGlzLnByb2dyZXNzZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RVcGxvYWRFbmQoKSB7XG5cbiAgICBjb25zdCBzdGlsbFVwbG9hZGluZyA9IHRoaXMucHJvZ3Jlc3Nlcy5maWx0ZXIoKHByb2dyZXNzKSA9PiB7XG4gICAgICByZXR1cm4gcHJvZ3Jlc3MudmFsdWUgPCAxMDA7XG4gICAgfSk7XG5cbiAgICBpZiAoIXN0aWxsVXBsb2FkaW5nLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbWl0VXBsb2FkZWRGaWxlcygpO1xuICAgICAgdGhpcy5jbGVhcklucHV0RmlsZSgpO1xuICAgICAgdGhpcy5jbGVhclByb2dyZXNzZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFySW5wdXRGaWxlKCkge1xuICAgIHRoaXMuaW5wdXRGaWxlLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJQcm9ncmVzc2VzKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NlcyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0VXBsb2FkZWRGaWxlcygpIHtcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMucHJvZ3Jlc3Nlcy5tYXAoKHVwbG9hZFByb2dyZXNzOiBVcGxvYWRQcm9ncmVzcykgPT4ge1xuICAgICAgcmV0dXJuIHVwbG9hZFByb2dyZXNzLmZpbGU7XG4gICAgfSk7XG4gICAgdGhpcy52YWx1ZSA9IFsuLi5maWxlc107XG4gICAgdGhpcy51cGxvYWRlZC5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNVcGxvYWRDb21wb25lbnQgfSBmcm9tICcuL3VwbG9hZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNVcGxvYWRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1VwbG9hZENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1VwbG9hZE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIENhbkxvYWQsIFJvdXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2VcbiAgKSB7fVxuXG4gIGNhbkxvYWQocm91dGU6IFJvdXRlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQXV0aGVudGljYXRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkudXNlciRcbiAgICAucGlwZShcbiAgICAgIG1hcCgodXNlcjogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiAodXNlciAmJiB1c2VyLmlkKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0pXG4gICAgKSBhcyBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0aEd1YXJkIH0gZnJvbSAnLi9hdXRoLWd1YXJkLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY0F1dGhHdWFyZFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0d1YXJkTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vLi4vY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgRGVjQXBwSW5pdGlhbGl6ZXIgPSAoZGVjQ29uZmlnOiBEZWNDb25maWd1cmF0aW9uU2VydmljZSwgZGVjQXBpOiBEZWNBcGlTZXJ2aWNlKSA9PiB7XG5cbiAgcmV0dXJuICgpID0+IHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGRlY0NvbmZpZy5sb2FkQ29uZmlnKCkudGhlbigoY29uZmlndXJhdGlvbikgPT4ge1xuXG4gICAgICAgIGRlY0FwaS5oYW5kU2hha2UoKS50aGVuKChhY2NvdW50KSA9PiB7XG5cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICBhY2NvdW50LFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sIChlcnIpID0+IHtcblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY29uZmlndXJhdGlvbixcbiAgICAgICAgICAgIGFjY291bnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9O1xuXG59O1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTbmFja0JhclNlcnZpY2UgfSBmcm9tICcuL2RlYy1zbmFjay1iYXIuc2VydmljZSc7XG5pbXBvcnQgeyBNYXRTbmFja0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNTbmFja0JhclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTbmFja0Jhck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBTa2lwU2VsZiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRGVjU25hY2tCYXJNb2R1bGUgfSBmcm9tICcuLy4uL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgRGVjU25hY2tCYXJNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY0FwaVNlcnZpY2UsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXBpTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBEZWNBcGlNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdEZWNBcGlNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpdCBpbiB0aGUgQXBwTW9kdWxlIG9ubHknKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBVc2VyQXV0aERhdGEge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIGVtYWlsOiBzdHJpbmc7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBjb3VudHJ5OiBzdHJpbmc7XG4gIHB1YmxpYyBjb21wYW55OiBzdHJpbmc7XG4gIHB1YmxpYyByb2xlOiBudW1iZXI7XG4gIHB1YmxpYyBwZXJtaXNzaW9uczogQXJyYXk8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3Rvcih1c2VyOiBhbnkgPSB7fSkge1xuICAgIHRoaXMuaWQgPSB1c2VyLmlkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmVtYWlsID0gdXNlci5lbWFpbCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5uYW1lID0gdXNlci5uYW1lIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvdW50cnkgPSB1c2VyLmNvdW50cnkgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuY29tcGFueSA9IHVzZXIuY29tcGFueSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5yb2xlID0gdXNlci5yb2xlIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBlcm1pc3Npb25zID0gdXNlci5wZXJtaXNzaW9ucyB8fCB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2dpbkRhdGEge1xuICBlbWFpbDogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xuICBrZWVwTG9nZ2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2Vib29rTG9naW5EYXRhIHtcbiAga2VlcExvZ2dlZDogYm9vbGVhbjtcbiAgZmFjZWJvb2tUb2tlbjogc3RyaW5nO1xufVxuXG4vKlxuICAqIEZpbHRlckdyb3Vwc1xuICAqXG4gICogYW4gQXJyYXkgb2YgZmlsdGVyIGdyb3VwXG4gICovXG5leHBvcnQgdHlwZSBGaWx0ZXJHcm91cHMgPSBGaWx0ZXJHcm91cFtdO1xuXG4vKlxuICAqIEZpbHRlcnNcbiAgKlxuICAqIGFuIEFycmF5IG9mIGZpbHRlclxuICAqL1xuZXhwb3J0IHR5cGUgRmlsdGVycyA9IEZpbHRlcltdO1xuXG4vKlxuICAqIEZpbHRlckRhdGFcbiAgKlxuICAqIEZpbHRlciBjb25maWd1cmF0aW9uXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckRhdGEge1xuICBlbmRwb2ludDogc3RyaW5nO1xuICBwYXlsb2FkOiBEZWNGaWx0ZXI7XG4gIGNiaz86IEZ1bmN0aW9uO1xuICBjbGVhcj86IGJvb2xlYW47XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNGaWx0ZXIge1xuICBmaWx0ZXJHcm91cHM/OiBGaWx0ZXJHcm91cHM7XG4gIHByb2plY3RWaWV3PzogYW55O1xuICBzb3J0PzogYW55O1xuICBwYWdlPzogbnVtYmVyO1xuICBsaW1pdD86IG51bWJlcjtcbiAgdGV4dFNlYXJjaD86IHN0cmluZztcbn1cblxuLypcbiAgKiBGaWx0ZXJcbiAgKlxuICAqIEZpbHRlciBjb25maWd1cmF0aW9uXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIFNlcmlhbGl6ZWREZWNGaWx0ZXIge1xuICBmaWx0ZXI/OiBzdHJpbmc7XG4gIHByb2plY3RWaWV3Pzogc3RyaW5nO1xuICBzb3J0Pzogc3RyaW5nO1xuICBwYWdlPzogbnVtYmVyO1xuICBsaW1pdD86IG51bWJlcjtcbiAgdGV4dFNlYXJjaD86IHN0cmluZztcbn1cblxuLypcbiAgKiBGaWx0ZXJcbiAgKlxuICAqIFNpZ25sZSBmaWx0ZXJcbiAgKi9cbmV4cG9ydCBjbGFzcyBGaWx0ZXIge1xuICBwcm9wZXJ0eTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoZGF0YTogYW55ID0ge30pIHtcbiAgICB0aGlzLnByb3BlcnR5ID0gZGF0YS5wcm9wZXJ0eTtcbiAgICB0aGlzLnZhbHVlID0gQXJyYXkuaXNBcnJheShkYXRhLnByb3BlcnR5KSA/IGRhdGEucHJvcGVydHkgOiBbZGF0YS5wcm9wZXJ0eV07XG4gIH1cbn1cblxuLypcbiAgKiBGaWx0ZXJHcm91cFxuICAqXG4gICogR3JvdXAgb2YgRmlsdGVyXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckdyb3VwIHtcbiAgZmlsdGVyczogRmlsdGVycztcbn1cblxuLypcbiAgKiBDb2x1bW5zU29ydENvbmZpZ1xuICAqXG4gICogQ29uZmlndXJhdGlvbiB0byBzb3J0IHNvcnRcbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uc1NvcnRDb25maWcge1xuICBwcm9wZXJ0eTogc3RyaW5nO1xuICBvcmRlcjoge1xuICAgIHR5cGU6ICdhc2MnIHwgJ2Rlc2MnXG4gIH07XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgSW5qZWN0aW9uVG9rZW4sIFNraXBTZWxmLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLXNlcnZpY2UubW9kZWxzJztcblxuZXhwb3J0IGNvbnN0IERFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnPignREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUcnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEluaXREZWNDb25maWd1cmF0aW9uU2VydmljZShodHRwOiBIdHRwQ2xpZW50LCBzZXJ2aWNlQ29uZmlnOiBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZykge1xuICByZXR1cm4gbmV3IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlKGh0dHAsIHNlcnZpY2VDb25maWcpO1xufVxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQ29uZmlndXJhdGlvbk1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBEZWNDb25maWd1cmF0aW9uTW9kdWxlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZWNDb25maWd1cmF0aW9uTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEZWNDb25maWd1cmF0aW9uTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IEluaXREZWNDb25maWd1cmF0aW9uU2VydmljZSxcbiAgICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUddXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCwgUm91dGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBvZiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25HdWFyZCBpbXBsZW1lbnRzIENhbkxvYWQsIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XG5cbiAgY2FuTG9hZChyb3V0ZTogUm91dGUpIHtcbiAgICBpZiAocm91dGUuZGF0YSAmJiAhcm91dGUuZGF0YS5wZXJtaXNzaW9ucykge1xuICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcm1pc3Npb25zID0gcm91dGUuZGF0YS5wZXJtaXNzaW9ucztcbiAgICByZXR1cm4gdGhpcy5oYXNBY2Nlc3MocGVybWlzc2lvbnMpO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgaWYgKHJvdXRlLmRhdGEgJiYgIXJvdXRlLmRhdGEucGVybWlzc2lvbnMpIHtcbiAgICAgIHRoaXMubm90QWxsb3dlZCgpO1xuICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJtaXNzaW9ucyA9IHJvdXRlLmRhdGEucGVybWlzc2lvbnM7XG4gICAgcmV0dXJuIHRoaXMuaGFzQWNjZXNzKHBlcm1pc3Npb25zKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FuQWN0aXZhdGUocm91dGUsIHN0YXRlKTtcbiAgfVxuXG4gIG5vdEFsbG93ZWQoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZm9yYmlkZW4nXSk7XG4gIH1cblxuICBoYXNBY2Nlc3MocGVybWlzc2lvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkudXNlciRcbiAgICAucGlwZShcbiAgICAgIG1hcCh1c2VyID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICBjb25zdCBhbGxvd2VkID0gdGhpcy5pc0FsbG93ZWRBY2Nlc3ModXNlci5wZXJtaXNzaW9ucywgcGVybWlzc2lvbnMpO1xuICAgICAgICAgIGlmICghYWxsb3dlZCkge1xuICAgICAgICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FsbG93ZWRBY2Nlc3ModXNlclBlcm1pc3Npb25zOiBzdHJpbmdbXSwgY3VycmVudFBlcm1pc3Npb25zOiBzdHJpbmdbXSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXRjaGluZ1JvbGUgPSBjdXJyZW50UGVybWlzc2lvbnMuZmluZCgodXNlclJvbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHVzZXJQZXJtaXNzaW9ucy5maW5kKChhbG93ZWRSb2xlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGFsb3dlZFJvbGUgPT09IHVzZXJSb2xlO1xuICAgICAgICB9KSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoaW5nUm9sZSA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1Blcm1pc3Npb25HdWFyZCB9IGZyb20gJy4vZGVjLXBlcm1pc3Npb24tZ3VhcmQuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNQZXJtaXNzaW9uR3VhcmRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQZXJtaXNzaW9uR3VhcmRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9wZW5Db25uZWN0aW9uIH0gZnJvbSAnLi93cy1jbGllbnQubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY1dzQ2xpZW50U2VydmljZSB7XG5cbiAgcHJpdmF0ZSBjb25uZWN0aW9uOiB7XG4gICAgW2tleTogc3RyaW5nXTogT3BlbkNvbm5lY3Rpb25cbiAgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjb25uZWN0KHVybCkge1xuXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvblt1cmxdO1xuXG4gICAgaWYgKGNvbm5lY3Rpb24pIHtcblxuICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5jb25uZWN0VG9Xcyh1cmwpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGNvbm5lY3RUb1dzKHVybCk6IE9wZW5Db25uZWN0aW9uIHtcblxuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSB0aGlzLm9wZW5Db25uZWN0aW9uKHVybCk7XG5cbiAgICB0aGlzLmNvbm5lY3Rpb25bdXJsXSA9IGNvbm5lY3Rpb247XG5cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcblxuICB9XG5cblxuICBwcml2YXRlIG9wZW5Db25uZWN0aW9uKHVybDogc3RyaW5nLCBjb25uZWN0aW9uPzogT3BlbkNvbm5lY3Rpb24pOiBPcGVuQ29ubmVjdGlvbiB7XG5cbiAgICBpZiAoY29ubmVjdGlvbikge1xuXG4gICAgICBjb25uZWN0aW9uLmNoYW5uZWwgPSBuZXcgV2ViU29ja2V0KHVybCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25uZWN0aW9uID0gY29ubmVjdGlvbiA/IGNvbm5lY3Rpb24gOiB7XG4gICAgICAgIGNoYW5uZWw6IG5ldyBXZWJTb2NrZXQodXJsKSxcbiAgICAgICAgbWVzc2FnZXM6IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKSxcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICBjb25uZWN0aW9uLmNoYW5uZWwub25jbG9zZSA9ICgpID0+IHRoaXMub3BlbkNvbm5lY3Rpb24odXJsLCBjb25uZWN0aW9uKTtcblxuICAgIGNvbm5lY3Rpb24uY2hhbm5lbC5vbmVycm9yID0gKCkgPT4gdGhpcy5vcGVuQ29ubmVjdGlvbih1cmwsIGNvbm5lY3Rpb24pO1xuXG4gICAgY29ubmVjdGlvbi5jaGFubmVsLm9ubWVzc2FnZSA9IChhKSA9PiB7XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlcyA9IGNvbm5lY3Rpb24ubWVzc2FnZXMuZ2V0VmFsdWUoKTtcblxuICAgICAgY3VycmVudE1lc3NhZ2VzLnVuc2hpZnQoYS5kYXRhKTtcblxuICAgICAgY29ubmVjdGlvbi5tZXNzYWdlcy5uZXh0KGN1cnJlbnRNZXNzYWdlcyk7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1dzQ2xpZW50U2VydmljZSB9IGZyb20gJy4vd3MtY2xpZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1dzQ2xpZW50U2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1dzQ2xpZW50TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbImZpbHRlciIsIm5vb3AiLCJBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiJdLCJtYXBwaW5ncyI6Ijs7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LEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQ0FBa0MsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0NBQWtDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDBCQUEwQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsOENBQThDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxtQ0FBbUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0NBQWdDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDBCQUEwQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwyQkFBMkIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMkJBQTJCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSw2QkFBNkIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxzQ0FBc0MsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0NBQWtDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUs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