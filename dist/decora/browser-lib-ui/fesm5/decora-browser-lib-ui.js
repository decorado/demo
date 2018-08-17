import { Injectable, Component, Input, ContentChild, TemplateRef, EventEmitter, Output, NgModule, ViewChild, ContentChildren, forwardRef, ComponentFactoryResolver, ViewContainerRef, HostListener, Renderer, ElementRef, Directive, SkipSelf, Optional, Inject, InjectionToken, defineInjectable, inject } from '@angular/core';
import { MatSnackBar, MatAutocompleteTrigger, MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogRef, MatDialog, MatDialogModule, MatToolbarModule, MatMenuModule, MatChipsModule, MatCardModule, MatSnackBarModule, MatExpansionModule, MatTooltipModule, MatSidenavModule, MatListModule, MatProgressBarModule, MatTabsModule } from '@angular/material';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatSnackBar as MatSnackBar$1 } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap, catchError, share, debounceTime, distinctUntilChanged, switchMap, startWith, map, filter } from 'rxjs/operators';
import { throwError, BehaviorSubject, of, noop, Subject } from 'rxjs';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
        return this.http.get(path)
            .pipe(tap(function (res) {
            _this.profile = _this.isValidProfile(res.profile, res) ? res.profile : _this.profile;
            _this.config = res[_this.profile];
            console.log("DecConfigurationService:: Loaded \"" + _this.profile + "\" profile");
        })).toPromise();
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
var /** @type {?} */ noop$1 = function () {
};
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteComponent; }),
    multi: true
};
var DecAutocompleteComponent = /** @class */ (function () {
    function DecAutocompleteComponent(formBuilder, service) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.service = service;
        this.name = 'autocompleteInput';
        this.placeholder = '';
        // Events
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.enterButton = new EventEmitter();
        this.innerOptions = [];
        this.filteredOptions = [];
        this.innerValue = '';
        this.onTouchedCallback = noop$1;
        this.onChangeCallback = noop$1;
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
        this.createInput();
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
        var _this = this;
        this.detectRequiredData()
            .then(function (res) {
            _this.subscribeToSearchAndSetOptionsObservable();
            _this.subscribeToOptions();
        });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeToOptions();
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
     * @param {?} v
     * @return {?}
     */
    DecAutocompleteComponent.prototype.writeValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        var _this = this;
        this.writtenValue = v;
        v = v ? v : undefined; // avoid null values
        var /** @type {?} */ hasDifference = !this.compareAsString(v, this.value);
        if (hasDifference) {
            this.loadRemoteObjectByWrittenValue(v)
                .then(function (options) {
                _this.setInnerValue(v);
            });
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
        var /** @type {?} */ selectedOption = $event.option.value;
        var /** @type {?} */ selectedOptionValue = this.extractValue(selectedOption);
        if (selectedOptionValue !== this.value) {
            this.value = selectedOptionValue;
            this.optionSelected.emit({
                value: this.value,
                option: selectedOption,
                options: this.innerOptions,
                filteredOptions: this.filteredOptions,
            });
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
        this.autocompleteInput.setValue('');
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
        this.setInnerValue(this.writtenValue);
        this.resetInputControl();
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
        return new Promise(function (resolve, reject) {
            if (writtenValue) {
                _this.searchBasedFetchingType(writtenValue)
                    .subscribe(function (res) {
                    resolve(writtenValue);
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
     * @return {?}
     */
    DecAutocompleteComponent.prototype.subscribeToOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.options$Subscription = this.options$.subscribe(function (options) {
            _this.filteredOptions = options;
        });
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
        var /** @type {?} */ label = this.extractLabel(option);
        this.autocompleteInput.setValue(option);
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
        this.autocompleteInput = this.formBuilder.control({ value: undefined, disabled: this.disabled, required: this.required });
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.subscribeToSearchAndSetOptionsObservable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.options$ = this.autocompleteInput.valueChanges
            .pipe(startWith(''), debounceTime(300), distinctUntilChanged(), switchMap(function (textSearch) {
            var /** @type {?} */ isStringTerm = typeof textSearch === 'string';
            if (isStringTerm) {
                return _this.searchBasedFetchingType(textSearch);
            }
            else {
                return of(_this.innerOptions);
            }
        }));
    };
    /**
     * @param {?} textSearch
     * @return {?}
     */
    DecAutocompleteComponent.prototype.searchBasedFetchingType = /**
     * @param {?} textSearch
     * @return {?}
     */
    function (textSearch) {
        var _this = this;
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
            return this.service.get(this.endpoint, body)
                .pipe(tap(function (options) {
                _this.innerOptions = options;
            }));
        }
    };
    /**
     * @return {?}
     */
    DecAutocompleteComponent.prototype.unsubscribeToOptions = /**
     * @return {?}
     */
    function () {
        this.options$Subscription.unsubscribe();
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
                    template: "<div>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    #termInput\n    [matAutocomplete]=\"autocomplete\"\n    [formControl]=\"autocompleteInput\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [placeholder]=\"placeholder\"\n    (keyup.enter)=\"onEnterButton($event)\"\n    (blur)=\"onBlur($event)\"\n    autocomplete=\"off\"\n    readonly onfocus=\"this.removeAttribute('readonly');\">\n\n    <button mat-icon-button matSuffix (click)=\"clear(true)\" *ngIf=\"!disabled && !required && autocompleteInput.value\">\n      <mat-icon>close</mat-icon>\n    </button>\n\n    <button mat-icon-button matSuffix (click)=\"reset()\" *ngIf=\"!disabled && value !== writtenValue\">\n      <mat-icon>replay</mat-icon>\n    </button>\n\n  </mat-form-field>\n\n  <mat-autocomplete #autocomplete=\"matAutocomplete\"\n  [displayWith]=\"extractLabel\"\n  (optionSelected)=\"onOptionSelected($event)\"\n  name=\"autocompleteValue\">\n    <mat-option *ngFor=\"let item of (options$ | async)\" [value]=\"item\">\n      {{ extractLabel(item) }}\n    </mat-option>\n  </mat-autocomplete>\n</div>\n\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: DecApiService }
    ]; };
    DecAutocompleteComponent.propDecorators = {
        autocompleteTrigger: [{ type: ViewChild, args: [MatAutocompleteTrigger,] }],
        customFetchFunction: [{ type: Input }],
        endpoint: [{ type: Input }],
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
        termInput: [{ type: ViewChild, args: ['termInput',] }]
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
var /** @type {?} */ noop$2 = function () {
};
var /** @type {?} */ ENDPOINT_TESTE = 'report/accounts/options';
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteAccountComponent; }),
    multi: true
};
var DecAutocompleteAccountComponent = /** @class */ (function () {
    function DecAutocompleteAccountComponent(decoraApi) {
        this.decoraApi = decoraApi;
        this.labelAttr = 'value';
        this.valueAttr = 'key';
        this.name = 'Account autocomplete';
        this.placeholder = 'Account autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.innerValue = '';
        this.onTouchedCallback = noop$2;
        this.onChangeCallback = noop$2;
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
                this.setRolesParams();
            }
        },
        enumerable: true,
        configurable: true
    });
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
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
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
        var /** @type {?} */ endpoint = "" + ENDPOINT_TESTE;
        if (this.types) {
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
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[endpoint]=\"endpoint\"\n[name]=\"name\"\n[labelFn]=\"labelFn\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[(ngModel)]=\"value\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
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
var /** @type {?} */ noop$3 = function () {
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
        this.innerValue = '';
        this.onTouchedCallback = noop$3;
        this.onChangeCallback = noop$3;
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
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
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
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[endpoint]=\"endpoint\"\n[(ngModel)]=\"value\"\n[labelFn]=\"labelFn\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
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
var /** @type {?} */ noop$4 = function () {
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
        this.innerValue = '';
        this.onTouchedCallback = noop$4;
        this.onChangeCallback = noop$4;
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
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
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
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[options]=\"(countries$ | async)\"\n[(ngModel)]=\"value\"\n[labelFn]=\"labelFn\"\n[valueFn]=\"valueFn\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
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
var /** @type {?} */ noop$5 = function () {
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
        this.innerValue = '';
        this.onTouchedCallback = noop$5;
        this.onChangeCallback = noop$5;
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
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
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
                    template: "<div *ngIf=\"endpoint else fakeDisabled\">\n  <dec-autocomplete\n  [disabled]=\"!companyId || disabled\"\n  [endpoint]=\"endpoint\"\n  [labelAttr]=\"labelAttr\"\n  [name]=\"name\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
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
var /** @type {?} */ noop$6 = function () {
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
        this.innerValue = '';
        this.onTouchedCallback = noop$6;
        this.onChangeCallback = noop$6;
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
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
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
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[(ngModel)]=\"value\"\n[endpoint]=\"endpoint\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
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
var /** @type {?} */ noop$7 = function () {
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
        this.innerValue = '';
        this.onTouchedCallback = noop$7;
        this.onChangeCallback = noop$7;
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
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
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
                    template: "<div *ngIf=\"(endpoint && companyId) else fakeDisabled\">\n  <dec-autocomplete\n  #autocomplete\n  [endpoint]=\"endpoint\"\n  [labelFn]=\"labelFn\"\n  [name]=\"name\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  [disabled]=\"disabled\"\n  [customFetchFunction]=\"customFetchFunction\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
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
var /** @type {?} */ noop$8 = function () {
};
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteQuoteComponent; }),
    multi: true
};
var DecAutocompleteQuoteComponent = /** @class */ (function () {
    function DecAutocompleteQuoteComponent(decoraApi) {
        var _this = this;
        this.decoraApi = decoraApi;
        this.BASE_ENDPOINT = '/legacy/project/${projectId}/quote';
        this.labelAttr = 'value';
        this.valueAttr = 'key';
        this.name = 'Quote autocomplete';
        this.placeholder = 'Quote autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.innerValue = '';
        this.onTouchedCallback = noop$8;
        this.onChangeCallback = noop$8;
        this.customFetchFunction = function (textSearch) {
            var /** @type {?} */ params = {};
            params.textSearch = textSearch;
            _this.setEndpointBasedOnProjectId();
            return _this.decoraApi.get(_this.endpoint, params)
                .pipe(map(function (response) {
                response = response.map(function (quotes) {
                    return {
                        key: quotes.id,
                        value: quotes.productVariantId
                    };
                });
                return response;
            }));
        };
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
            this.value = undefined;
            this.setEndpointBasedOnProjectId();
        },
        enumerable: true,
        configurable: true
    });
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
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
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
    DecAutocompleteQuoteComponent.prototype.setEndpointBasedOnProjectId = /**
     * @return {?}
     */
    function () {
        this.endpoint = !this.projectId ? undefined : this.BASE_ENDPOINT.replace('${projectId}', this.projectId);
    };
    DecAutocompleteQuoteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-quote',
                    template: "<div *ngIf=\"endpoint else fakeDisabled\">\n  <dec-autocomplete\n  [disabled]=\"!projectId || disabled\"\n  [endpoint]=\"endpoint\"\n  [labelAttr]=\"labelAttr\"\n  [name]=\"name\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  [customFetchFunction]=\"customFetchFunction\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
                    styles: [],
                    providers: [AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecAutocompleteQuoteComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecAutocompleteQuoteComponent.propDecorators = {
        projectId: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }]
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
var AutocompleteTagsComponent = /** @class */ (function () {
    function AutocompleteTagsComponent() {
        this.valueAttr = 'key';
        this.labelAttr = 'value';
        this.name = 'Tags autocomplete';
        this.placeholder = 'Tags autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.enterButton = new EventEmitter();
        this.innerValue = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(AutocompleteTagsComponent.prototype, "endpoint", {
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
    Object.defineProperty(AutocompleteTagsComponent.prototype, "value", {
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
    AutocompleteTagsComponent.prototype.labelFn = /**
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
    AutocompleteTagsComponent.prototype.registerOnChange = /**
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
    AutocompleteTagsComponent.prototype.registerOnTouched = /**
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
    AutocompleteTagsComponent.prototype.onValueChanged = /**
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
    AutocompleteTagsComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AutocompleteTagsComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    AutocompleteTagsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-tags',
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[endpoint]=\"endpoint\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n(enterButton)=\"enterButton.emit($event)\"\n[(ngModel)]=\"value\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    AutocompleteTagsComponent.ctorParameters = function () { return []; };
    AutocompleteTagsComponent.propDecorators = {
        endpoint: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }],
        enterButton: [{ type: Output }]
    };
    return AutocompleteTagsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AutocompleteTagsModule = /** @class */ (function () {
    function AutocompleteTagsModule() {
    }
    AutocompleteTagsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        DecAutocompleteModule
                    ],
                    declarations: [
                        AutocompleteTagsComponent
                    ],
                    exports: [
                        AutocompleteTagsComponent
                    ]
                },] },
    ];
    return AutocompleteTagsModule;
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
                    template: "<div class=\"dec-gallery-wrapper\">\n\n  <div class=\"image-highlighted\">\n      <dec-zoom-image-view \n        [thumbImageSize]=\"{width: 620, height: 620}\"\n        [decImage]=\"imageHighlight\">\n      </dec-zoom-image-view>\n  </div>\n\n  <div class=\"text-right\" *ngIf=\"imgExternalLink\">\n\n    <a href=\"{{ imgExternalLink }}\" target=\"_blank\">{{ 'label.image-link' | translate }}</a>\n\n  </div>\n\n  <ngu-carousel class=\"carousel-wrapper\" [inputs]=\"carouselConfig\" (initData)=\"onInitDataFn($event)\" (onMove)=\"onMoveFn($event)\">\n\n    <ngu-item NguCarouselItem *ngFor=\"let image of images\" [class.active]=\"image == imageHighlight\">\n\n      <img [decImage]=\"image\" [decImageSize]=\"{width:300, height:300}\" (click)=\"onSelectImage($event,image)\">\n\n    </ngu-item>\n\n    <mat-icon NguCarouselPrev class=\"left-previous\" [ngClass]=\"{'disabled': isFirst}\">chevron_left</mat-icon>\n\n    <mat-icon NguCarouselNext class=\"right-next\" [ngClass]=\"{'disabled': isLast}\">chevron_right</mat-icon>\n\n  </ngu-carousel>\n\n</div>\n",
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
        this.detectContainerElement();
    }
    Object.defineProperty(DecImageDirective.prototype, "decImage", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerImage) {
                this.innerImage = v;
                this.loadImage();
            }
        },
        enumerable: true,
        configurable: true
    });
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
        return (decImageSize.width || 0) + "x" + (decImageSize.height || 0);
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
        this.containerElement.style.backgroundPosition = 'center';
        this.containerElement.style.backgroundRepeat = 'no-repeat';
        this.containerElement.style.backgroundSize = '100%';
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
var /** @type {?} */ ThumborServerHost$1 = 'https://cache-thumbs.decoracontent.com/unsafe';
var DecZoomImageViewComponent = /** @class */ (function () {
    function DecZoomImageViewComponent() {
        // hover | click | toggle | hover-freeze
        this.zoomMode = 'click';
        this.enableScrollZoom = true;
        this.scrollStepSize = 0.1;
        this.enableLens = false;
        this.lensWidth = 100;
        this.lensHeight = 100;
    }
    Object.defineProperty(DecZoomImageViewComponent.prototype, "decImage", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerImage) {
                this.innerImage = v;
                this.loadImage();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecZoomImageViewComponent.prototype, "thumbImageSize", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this.thumbSize = v;
                this.loadImage();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecZoomImageViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    DecZoomImageViewComponent.prototype.loadImage = /**
     * @return {?}
     */
    function () {
        if (this.innerImage && this.thumbSize) {
            this.imagePath = this.extractImageUrlFromSysfile();
            this.finalImageUrl = this.innerImage.fileUrl;
            this.thumbImage = this.getThumborUrl();
        }
    };
    /**
     * @return {?}
     */
    DecZoomImageViewComponent.prototype.extractImageUrlFromSysfile = /**
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
     * @param {?} thumbSize
     * @return {?}
     */
    DecZoomImageViewComponent.prototype.getImageSize = /**
     * @param {?} thumbSize
     * @return {?}
     */
    function (thumbSize) {
        return (thumbSize.width || 0) + "x" + (thumbSize.height || 0);
    };
    /**
     * @return {?}
     */
    DecZoomImageViewComponent.prototype.getThumborUrl = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ size = this.getImageSize(this.thumbSize);
        return ThumborServerHost$1 + "/" + size + "/" + this.imagePath;
    };
    DecZoomImageViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-zoom-image-view',
                    template: "<div class=\"imagehighlight-container\" >\n    <ngx-image-zoom \n        [thumbImage]=\"thumbImage\"\n        [fullImage]=\"finalImageUrl\"\n        [zoomMode]=\"zoomMode\"\n        [enableScrollZoom]=\"enableScrollZoom\"\n        [scrollStepSize]=\"scrollStepSize\"\n        [enableLens]=\"enableLens\"\n        [lensWidth]=\"lensWidth\"\n        [lensHeight]=\"lensHeight\">\n    </ngx-image-zoom>\n</div>\n\n",
                    styles: [".imagehighlight-container{width:100%;height:100%;cursor:zoom-in}"]
                },] },
    ];
    /** @nocollapse */
    DecZoomImageViewComponent.ctorParameters = function () { return []; };
    DecZoomImageViewComponent.propDecorators = {
        decImage: [{ type: Input }],
        thumbImageSize: [{ type: Input }],
        zoomMode: [{ type: Input }],
        enableScrollZoom: [{ type: Input }],
        scrollStepSize: [{ type: Input }],
        enableLens: [{ type: Input }],
        lensWidth: [{ type: Input }],
        lensHeight: [{ type: Input }]
    };
    return DecZoomImageViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecZoomImageViewModule = /** @class */ (function () {
    function DecZoomImageViewModule() {
    }
    DecZoomImageViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        NgxImageZoomModule.forRoot()
                    ],
                    declarations: [
                        DecZoomImageViewComponent
                    ],
                    exports: [
                        DecZoomImageViewComponent
                    ]
                },] },
    ];
    return DecZoomImageViewModule;
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
                        DecZoomImageViewModule
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
                    template: "<div fxLayout=\"column\" fxLayoutGap=\"16px\">\n\n  <div fxFlex>\n\n    <ng-container\n      [ngTemplateOutlet]=\"templateRef\"\n      [ngTemplateOutletContext]=\"{form: form}\"\n    ></ng-container>\n\n  </div>\n\n  <div fxFlex>\n\n    <div fxLayout=\"row\" fxLayoutAlign=\"end end\" fxLayoutGap=\"8px\">\n\n      <button type=\"button\" mat-raised-button color=\"primary\" (click)=\"submit()\">{{ 'label.search' | translate | uppercase }}</button>\n\n      <button type=\"button\" mat-button (click)=\"reset()\">{{ 'label.reset' | translate | uppercase }}</button>\n\n    </div>\n\n  </div>\n\n</div>\n\n\n\n\n",
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
        /*
           * getListMode
           *
           *
           */
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
        if (this.opennedCollapsable !== filter$$1.uid) {
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
        this.listMode = this.getListMode();
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
            _this.opennedCollapsable = filter$$1.uid;
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
                var /** @type {?} */ tabChanged = _this.previousSelectedTab !== _this.selectedTab;
                var /** @type {?} */ filterModeChanged = _this.filterMode !== event.filterMode;
                if (tabChanged) {
                    _this.previousSelectedTab = _this.selectedTab;
                    _this.setRows([]); // if changing tabs, clear the results before showing the rows because it is done only after fetching the data
                }
                if (filterModeChanged) {
                    _this.filterMode = event.filterMode;
                }
                if (_this.filterMode === 'tabs') {
                    _this.opennedCollapsable = undefined;
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
                    if (_this.opennedCollapsable && !tabChanged) {
                        _this.loadByOpennedCollapse(_this.opennedCollapsable);
                    }
                    else {
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
                    _this.loadReport(true);
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
                    template: "<!-- COMPONENT LAYOUT -->\n<div class=\"list-component-wrapper\">\n  <div *ngIf=\"filter\">\n    <ng-content select=\"dec-list-filter\"></ng-content>\n  </div>\n  <div *ngIf=\"report || filterMode === 'collapse'\">\n    <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n      <div fxFlex class=\"text-right\" *ngIf=\"tableAndGridAreSet()\">\n        <button type=\"button\" mat-icon-button (click)=\"toggleListMode()\">\n          <mat-icon title=\"Switch to table mode\" aria-label=\"Switch to table mode\" color=\"primary\" contrastFontWithBg *ngIf=\"listMode === 'grid'\">view_headline</mat-icon>\n          <mat-icon title=\"Switch to grid mode\" aria-label=\"Switch to grid mode\" color=\"primary\" contrastFontWithBg *ngIf=\"listMode === 'table'\">view_module</mat-icon>\n        </button>\n      </div>\n      <div fxFlex>\n        <div *ngIf=\"filterMode == 'collapse' then collapseTemplate else tabsTemplate\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- GRID TEMPLATE -->\n<ng-template #gridTemplate>\n  <ng-content select=\"dec-list-grid\"></ng-content>\n</ng-template>\n\n<!-- TABLE TEMPLATE -->\n<ng-template #listTemplate>\n  <ng-content select=\"dec-list-table\"></ng-content>\n</ng-template>\n\n<!-- FOOTER TEMPLATE -->\n<ng-template #footerTemplate>\n  <ng-content select=\"dec-list-footer\"></ng-content>\n  <p class=\"list-footer\">\n    {{ 'label.amount-loaded-of-total' |\n      translate:{\n        loaded: report?.result?.rows?.length,\n        total: report?.result?.count\n      }\n    }}\n  </p>\n</ng-template>\n\n<!-- COLLAPSE TEMPLATE -->\n<ng-template #tabsTemplate>\n  <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n    <div *ngIf=\"listMode == 'grid' then gridTemplate else listTemplate\"></div>\n    <!-- FOOTER CONTENT -->\n    <div fxFlex>\n      <div *ngIf=\"showFooter && !loading then footerTemplate\"></div>\n    </div>\n    <!-- LOADING SPINNER -->\n    <div fxFlex *ngIf=\"loading\" class=\"text-center loading-spinner-wrapper\">\n      <dec-spinner></dec-spinner>\n    </div>\n    <!-- LOAD MORE BUTTON -->\n    <div fxFlex *ngIf=\"!isLastPage && !loading && !disableShowMoreButton\" class=\"text-center\">\n      <button type=\"button\" mat-raised-button (click)=\"showMore()\">{{'label.show-more' | translate}}</button>\n    </div>\n  </div>\n</ng-template>\n\n<!-- COLLAPSE TEMPLATE -->\n<ng-template #collapseTemplate>\n  <mat-accordion>\n    <ng-container *ngFor=\"let filter of collapsableFilters.children\">\n      <mat-expansion-panel (opened)=\"searchCollapsable(filter)\">\n        <mat-expansion-panel-header>\n          <div class=\"collapse-title\" fxLayout=\"row\" fxLayoutGap=\"32px\" fxLayoutAlign=\"left center\">\n            <div fxFlex=\"96px\" *ngIf=\"countReport\">\n              <dec-label [colorHex]=\"filter.color\">{{ getCollapsableCount(filter.uid) }}</dec-label>\n            </div>\n            {{ 'label.' + filter.label | translate }}\n          </div>\n        </mat-expansion-panel-header>\n        <div *ngIf=\"opennedCollapsable === filter.uid\">\n          <ng-container [ngTemplateOutlet]=\"tabsTemplate\"></ng-container>\n        </div>\n      </mat-expansion-panel>\n    </ng-container>\n  </mat-accordion>\n  <div class=\"accordion-bottom-margin\"></div>\n</ng-template>\n\n",
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
        scrollableContainerClass: [{ type: Input }],
        searchableProperties: [{ type: Input }],
        showFooter: [{ type: Input }],
        postSearch: [{ type: Output }],
        rowClick: [{ type: Output }],
        grid: [{ type: ContentChild, args: [DecListGridComponent,] }],
        table: [{ type: ContentChild, args: [DecListTableComponent,] }],
        filter: [{ type: ContentChild, args: [DecListFilterComponent,] }],
        listMode: [{ type: Input }],
        getListMode: [{ type: Input }]
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
                    template: "<mat-toolbar [color]=\"color\" *ngIf=\"initialized\">\n\n  <span class=\"items-icon item-left\" *ngIf=\"leftMenuTriggerVisible\" (click)=\"toggleLeftMenu.emit()\">\n    &#9776;\n  </span>\n\n  <span *ngIf=\"customTitle\">\n    <ng-content select=\"dec-sidenav-toolbar-title\"></ng-content>\n  </span>\n\n  <div class=\"ribbon {{ribbon}}\" *ngIf=\"notProduction\">\n    <span>{{label | translate}}</span>\n  </div>\n\n  <span class=\"dec-sidenav-toolbar-custom-content\">\n    <ng-content></ng-content>\n  </span>\n\n  <span class=\"items-spacer\"></span>\n\n  <span class=\"items-icon item-right\" *ngIf=\"rightMenuTriggerVisible\" (click)=\"toggleRightMenu.emit()\">\n    &#9776;\n  </span>\n\n</mat-toolbar>\n",
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
        var /** @type {?} */ style = { backgroundColor: '', pointerEvents: '' };
        if (this.routerLink === window.location.pathname) {
            style.backgroundColor += '#EF3F54';
            style.pointerEvents += 'none';
        }
        else {
            style.backgroundColor += 'rgba(0, 0, 0, ' + treeLevel / 6 + ')'; // hsl(209, 20%, 30%)
        }
        return style;
    };
    DecSidenavMenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-menu-item',
                    template: "<ng-template let-treeLevel=\"treeLevel\" #template>\n\n  <mat-list-item class=\"click dec-sidenav-menu-item\"\n  (click)=\"subitems.length ? toggleSubmenu() : openLink()\"\n  [ngStyle]=\"getBackground(treeLevel)\">\n\n    <div class=\"item-wrapper\">\n\n      <div [ngStyle]=\"{paddingLeft: treeLevel * 16 + 'px'}\" class=\"item-content\">\n        <ng-content></ng-content>\n      </div>\n\n      <div *ngIf=\"subitems.length\" class=\"text-right\">\n        <ng-container [ngSwitch]=\"showSubmenu\">\n          <span *ngSwitchCase=\"true\"><i class=\"arrow down\"></i></span>\n          <span *ngSwitchCase=\"false\"><i class=\"arrow right\"></i></span>\n        </ng-container>\n      </div>\n    </div>\n\n  </mat-list-item>\n\n  <div class=\"subitem-menu\" *ngIf=\"showSubmenu\">\n\n    <dec-sidenav-menu [items]=\"subitems\" [treeLevel]=\"treeLevel\"></dec-sidenav-menu>\n\n  </div>\n\n</ng-template>\n",
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
                    template: "<div class=\"dec-sidenav-wraper\">\n  <!-- TOOLBAR -->\n  <ng-container *ngIf=\"toolbar\">\n    <ng-content select=\"dec-sidenav-toolbar\"></ng-content>\n  </ng-container>\n  <!-- / TOOLBAR -->\n\n  <!-- PROGRESS BAR -->\n  <div class=\"progress-bar-wrapper\" *ngIf=\"progressBarVisible | async\">\n    <mat-progress-bar mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n  </div>\n  <!-- / PROGRESS BAR -->\n\n  <mat-sidenav-container [ngClass]=\"{'with-toolbar': toolbar}\">\n\n    <!-- LEFT MENU -->\n    <mat-sidenav *ngIf=\"leftMenu\"\n    [mode]=\"leftMenu.leftMenuMode | async\"\n    [opened]=\"leftMenu.leftMenuVisible | async\"\n    position=\"start\"\n    (openedChange)=\"leftSidenavOpenedChange($event)\"\n    #leftSidenav>\n      <ng-content select=\"dec-sidenav-menu-left\"></ng-content>\n    </mat-sidenav>\n    <!-- / LEFT MENU -->\n\n    <!-- CONTENT -->\n    <ng-content select=\"dec-sidenav-content\"></ng-content>\n    <!-- / CONTENT -->\n\n    <!-- RIGHT MENU -->\n    <mat-sidenav *ngIf=\"rightMenu\"\n    [mode]=\"rightMenu.rightMenuMode | async\"\n    [opened]=\"rightMenu.rightMenuVisible | async\"\n    position=\"end\"\n    (openedChange)=\"rightSidenavOpenedChange($event)\"\n    #rightSidenav>\n      <ng-content select=\"dec-sidenav-menu-right\"></ng-content>\n    </mat-sidenav>\n    <!-- / RIGHT MENU -->\n\n  </mat-sidenav-container>\n\n</div>\n",
                    styles: [".dec-sidenav-wraper .mat-sidenav-container{height:100vh}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 64px)}.dec-sidenav-wraper .mat-sidenav-container .mat-sidenav{width:256px}.dec-sidenav-wraper .progress-bar-wrapper{position:fixed;top:60px;left:0;width:100%}"]
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
                    template: "<div class=\"dec-sidenav-container-wrapper\">\n  <ng-content></ng-content>\n</div>\n",
                    styles: [".dec-sidenav-container-wrapper{min-width:1024px;padding:32px}"]
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
    DecTabsComponent.prototype.shoulTabBeDisplayed = /**
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
                    template: "<div *ngIf=\"!hidden\">\n\n  <!-- TABS -->\n  <mat-tab-group [selectedIndex]=\"activeTabIndex\" (focusChange)=\"onChangeTab($event)\" [dynamicHeight]=\"true\">\n\n    <!-- TAB -->\n    <mat-tab *ngFor=\"let tab of tabs;\" [disabled]=\"tab.disabled\">\n\n      <!-- TAB LABEL -->\n      <ng-template mat-tab-label>\n        {{ tab.label }}\n        <span class=\"badge badge-pill badge-small\" *ngIf=\"tab.total >= 0\">{{ parseTotal(tab.total) }}</span>\n      </ng-template>\n\n      <!-- TAB CONTENT WRAPPER -->\n      <ng-container *ngIf=\"shoulTabBeDisplayed(tab)\">\n\n        <!-- TAB MENU -->\n        <div *ngIf=\"tabMenuComponent\" class=\"menu-wrapper\">\n          <ng-container *ngTemplateOutlet=\"tabMenuComponent.content; context: { activeTab: activeTab }\"></ng-container>\n        </div>\n\n        <!-- TABS CONTENT -->\n        <div [ngClass]=\"{'tab-padding': padding}\">\n\n          <ng-container *ngTemplateOutlet=\"tab.content\"></ng-container>\n\n        </div>\n\n      </ng-container>\n\n    </mat-tab>\n\n  </mat-tab-group>\n\n</div>\n",
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
        return /** @type {?} */ (this.decoraApi.fetchCurrentLoggedUser()
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
var /** @type {?} */ DecConfigurationInitializer = function (decConfig) {
    return function () { return decConfig.loadConfig(); };
};

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

export { AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, DecAutocompleteComponent, DecAutocompleteModule, DecAutocompleteAccountComponent, DecAutocompleteAccountModule, AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCompanyComponent, DecAutocompleteCompanyModule, AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCountryComponent, DecAutocompleteCountryModule, BASE_ENDPOINT, AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR, DecAutocompleteDepartmentComponent, DecAutocompleteDepartmentModule, DecAutocompleteRoleComponent, DecAutocompleteRoleModule, BASE_AUTOCOMPLETE_PROJECT_ENDPOINT, AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR, DecAutocompleteProjectComponent, DecAutocompleteProjectModule, AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR, DecAutocompleteQuoteComponent, DecAutocompleteQuoteModule, AutocompleteTagsComponent, AutocompleteTagsModule, DecBreadcrumbComponent, DecBreadcrumbModule, DecDialogComponent, DecDialogModule, DecDialogService, DecGalleryComponent, DecGalleryModule, DecImageModule, DecImageDirective, DecZoomImageViewModule, DecZoomImageViewComponent, DecLabelComponent, DecLabelModule, DecListModule, DecListFilter, DecListComponent, DecListActiveFilterResumeModule, DecListActiveFilterResumeComponent, DecListAdvancedFilterModule, DecListAdvancedFilterComponent, DecListFilterModule, DecListFilterComponent, DecListFooterComponent, DecListGridComponent, DecListTableModule, DecListTableComponent, DecListTableColumnComponent, DecListActionsModule, DecListActionsComponent, DecPageForbidenComponent, DecPageForbidenModule, DecPageNotFoundComponent, DecPageNotFoundModule, DecProductSpinComponent, DecProductSpinModule, DecSidenavModule, DecSidenavComponent, DecSidenavContentComponent, DecSidenavMenuItemComponent, DecSidenavMenuLeftComponent, DecSidenavMenuRightComponent, DecSidenavMenuTitleComponent, DecSidenavToolbarComponent, DecSidenavToolbarTitleComponent, DecSketchfabViewComponent, DecSketchfabViewModule, DecSpinnerComponent, DecSpinnerModule, DecStepsListComponent, DecStepsListModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, DecStringArrayInputComponent, DecStringArrayInputModule, DecTabsModule, DecTabsComponent, DecTabModule, DecTabComponent, DecUploadModule, DEC_UPLOAD_CONTROL_VALUE_ACCESSOR, DecUploadComponent, DecPermissionDirective, DecPermissionModule, hexToRgbNew, standardize_color, DecContrastFontWithBgDirective, DecContrastFontWithBgModule, DecGuardModule, DecAuthGuard, DecApiService, DecApiModule, UserAuthData, Filter, DecConfigurationService, DECORA_CONFIGURATION_SERVICE_CONFIG, InitDecConfigurationService, DecConfigurationModule, DecConfigurationInitializer, DecSnackBarService, DecSnackBarModule, DecPermissionGuard, DecPermissionGuardModule, DecWsClientService, DecWsClientModule, DecScriptLoaderService, DecScriptLoaderModule, DecListTabsFilterComponent as ɵb, DecSidenavMenuComponent as ɵd, DecSidenavService as ɵc, DecTabMenuComponent as ɵe };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWJyb3dzZXItbGliLXVpLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtYWNjb3VudC9hdXRvY29tcGxldGUtYWNjb3VudC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWFjY291bnQvYXV0b2NvbXBsZXRlLWFjY291bnQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb21wYW55L2F1dG9jb21wbGV0ZS1jb21wYW55LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtY29tcGFueS9hdXRvY29tcGxldGUtY29tcGFueS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWNvdW50cnkvYXV0b2NvbXBsZXRlLWNvdW50cnkuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb3VudHJ5L2F1dG9jb21wbGV0ZS1jb3VudHJ5Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQvYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1yb2xlL2F1dG9jb21wbGV0ZS1yb2xlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcm9sZS9hdXRvY29tcGxldGUtcm9sZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXByb2plY3QvYXV0b2NvbXBsZXRlLXByb2plY3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1wcm9qZWN0L2F1dG9jb21wbGV0ZS1wcm9qZWN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtdGFncy9hdXRvY29tcGxldGUtdGFncy5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXRhZ3MvYXV0b2NvbXBsZXRlLXRhZ3MubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtZGlhbG9nL2RlYy1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zcGlubmVyL2RlYy1zcGlubmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2Nhcm91c2VsLWNvbmZpZy50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2RlYy1nYWxsZXJ5LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUuY29uc3RhbnRzLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXpvb20taW1hZ2Utdmlldy9kZWMtem9vbS1pbWFnZS12aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtem9vbS1pbWFnZS12aWV3L2RlYy16b29tLWltYWdlLXZpZXcubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2dhbGxlcnkvZGVjLWdhbGxlcnkubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1sYWJlbC9kZWMtbGFiZWwuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2NvbG9yL2NvbnRyYXN0LWZvbnQtd2l0aC1iZy9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9jb2xvci9jb250cmFzdC1mb250LXdpdGgtYmcvZGVjLWNvbnRyYXN0LWZvbnQtd2l0aC1iZy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWxhYmVsL2RlYy1sYWJlbC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0Lm1vZGVscy50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIvbGlzdC10YWJzLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFkdmFuY2VkLWZpbHRlci9saXN0LWFkdmFuY2VkLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWZpbHRlci9saXN0LWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9wZXJtaXNzaW9uL2RlYy1wZXJtaXNzaW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9wZXJtaXNzaW9uL2RlYy1wZXJtaXNzaW9uLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZmlsdGVyL2xpc3QtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS1jb2x1bW4vbGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS9saXN0LXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS9saXN0LXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZm9vdGVyL2xpc3QtZm9vdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWN0aW9ucy9saXN0LWFjdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hY3Rpb25zL2xpc3QtYWN0aW9ucy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wYWdlLWZvcmJpZGVuL3BhZ2UtZm9yYmlkZW4uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2UtZm9yYmlkZW4vcGFnZS1mb3JiaWRlbi5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvcGFnZS1ub3QtZm91bmQvcGFnZS1ub3QtZm91bmQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2Utbm90LWZvdW5kL3BhZ2Utbm90LWZvdW5kLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wcm9kdWN0LXNwaW4vcHJvZHVjdC1zcGluLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wcm9kdWN0LXNwaW4vcHJvZHVjdC1zcGluLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUvZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi10b29sYmFyL2RlYy1zaWRlbmF2LXRvb2xiYXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS1sZWZ0L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1jb250ZW50L2RlYy1zaWRlbmF2LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS9kZWMtc2lkZW5hdi1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L3NpZGVuYXYubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9zY3JpcHQtbG9hZGVyL2RlYy1zY3JpcHQtbG9hZGVyLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2tldGNoZmFiLXZpZXcvZGVjLXNrZXRjaGZhYi12aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2tldGNoZmFiLXZpZXcvZGVjLXNrZXRjaGZhYi12aWV3Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3RlcHMtbGlzdC9kZWMtc3RlcHMtbGlzdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXN0ZXBzLWxpc3QvZGVjLXN0ZXBzLWxpc3QubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zdHJpbmctYXJyYXktaW5wdXQvZGVjLXN0cmluZy1hcnJheS1pbnB1dC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXN0cmluZy1hcnJheS1pbnB1dC9kZWMtc3RyaW5nLWFycmF5LWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYi90YWIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFicy5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdGFicy90YWIvdGFiLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYnMubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9ndWFyZC9hdXRoLWd1YXJkLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2d1YXJkL2d1YXJkLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvc25hY2stYmFyL2RlYy1zbmFjay1iYXIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24tc2VydmljZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi1pbml0aWFsaXplci5wcm92aWRlci50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvcGVybWlzc2lvbi1ndWFyZC9kZWMtcGVybWlzc2lvbi1ndWFyZC5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9wZXJtaXNzaW9uLWd1YXJkL2RlYy1wZXJtaXNzaW9uLWd1YXJkLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvd3MtY2xpZW50L3dzLWNsaWVudC5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy93cy1jbGllbnQvd3MtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTbmFja0JhciwgTWF0U25hY2tCYXJSZWYsIFNpbXBsZVNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VUeXBlID0gJ3N1Y2Nlc3MnIHwgJ3ByaW1hcnknIHwgJ2luZm8nIHwgJ3dhcm4nIHwgJ2Vycm9yJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGVjU25hY2tCYXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc25hY2tCYXJTZXJ2aWNlOiBNYXRTbmFja0JhcixcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XG5cbiAgb3BlbihtZXNzYWdlOiBzdHJpbmcsIHR5cGU6IE1lc3NhZ2VUeXBlLCBkdXJhdGlvbiA9IDRlMyk6IE1hdFNuYWNrQmFyUmVmPFNpbXBsZVNuYWNrQmFyPiB7XG4gICAgY29uc3QgbXNnID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudChtZXNzYWdlKTtcbiAgICBjb25zdCBzbmFja0NsYXNzID0gdGhpcy5nZXRDbGFzcyh0eXBlKTtcblxuICAgIHJldHVybiB0aGlzLnNuYWNrQmFyU2VydmljZS5vcGVuKG1zZywgJycsIHtcbiAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgIHBhbmVsQ2xhc3M6IHNuYWNrQ2xhc3NcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsYXNzKHR5cGU6IE1lc3NhZ2VUeXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1zdWNjZXNzJztcbiAgICAgIGNhc2UgJ3ByaW1hcnknOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLXByaW1hcnknO1xuICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgIHJldHVybiAnc25hY2staW5mbyc7XG4gICAgICBjYXNlICd3YXJuJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay13YXJuJztcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1lcnJvcic7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tc2VydmljZS5tb2RlbHMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5jb25zdCBDT05GSUdfUEFUSCA9ICdhc3NldHMvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLmpzb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjQ29uZmlndXJhdGlvblNlcnZpY2Uge1xuXG4gIHNldCBjb25maWcodjogYW55KSB7XG4gICAgaWYgKHRoaXMuX2NvbmZpZyAhPT0gdikge1xuICAgICAgdGhpcy5fY29uZmlnID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgY29uZmlnKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIHByb2ZpbGUgPSAnbG9jYWwnO1xuXG4gIHByaXZhdGUgX2NvbmZpZzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdERUNPUkFfQ09ORklHVVJBVElPTl9TRVJWSUNFX0NPTkZJRycpIHByaXZhdGUgc2VydmljZUNvbmZpZ3VyYXRpb246IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnLFxuICApIHt9XG5cbiAgbG9hZENvbmZpZygpIHtcbiAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMuc2VydmljZUNvbmZpZ3VyYXRpb24uYmFzZVBhdGg7XG4gICAgY29uc3QgcGF0aCA9IGAke2Jhc2VQYXRofS8ke0NPTkZJR19QQVRIfWA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQocGF0aClcbiAgICAucGlwZShcbiAgICAgIHRhcCgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5wcm9maWxlID0gdGhpcy5pc1ZhbGlkUHJvZmlsZShyZXMucHJvZmlsZSwgcmVzKSA/IHJlcy5wcm9maWxlIDogdGhpcy5wcm9maWxlO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHJlc1t0aGlzLnByb2ZpbGVdO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVjQ29uZmlndXJhdGlvblNlcnZpY2U6OiBMb2FkZWQgXCIke3RoaXMucHJvZmlsZX1cIiBwcm9maWxlYCk7XG4gICAgICB9KVxuICAgICkudG9Qcm9taXNlKCk7XG4gIH1cblxuICBwcml2YXRlIGlzVmFsaWRQcm9maWxlKHByb2ZpbGUsIGF2YWlsYWJsZVByb2ZpbGVzKSB7XG5cbiAgICBjb25zdCBhdmFpbGFibGVzID0gT2JqZWN0LmtleXMoYXZhaWxhYmxlUHJvZmlsZXMpO1xuXG4gICAgcmV0dXJuIChhdmFpbGFibGVzLmluZGV4T2YocHJvZmlsZSkgPj0gMCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHNoYXJlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVc2VyQXV0aERhdGEsIExvZ2luRGF0YSwgRmFjZWJvb2tMb2dpbkRhdGEsIERlY0ZpbHRlciwgU2VyaWFsaXplZERlY0ZpbHRlciB9IGZyb20gJy4vZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNTbmFja0JhclNlcnZpY2UgfSBmcm9tICcuLy4uL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgQ2FsbE9wdGlvbnMgPSB7XG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgcGFyYW1zPzoge1xuICAgIFtwcm9wOiBzdHJpbmddOiBhbnk7XG4gIH07XG59ICYge1xuICBbcHJvcDogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSHR0cFJlcXVlc3RUeXBlcyA9ICdHRVQnIHwgJ1BPU1QnIHwgJ1BVVCcgfCAnUEFUQ0gnIHwgJ0RFTEVURSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBcGlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICB1c2VyOiBVc2VyQXV0aERhdGE7XG5cbiAgdXNlciQ6IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+KHVuZGVmaW5lZCk7XG5cbiAgcHJpdmF0ZSBzZXNzaW9uVG9rZW46IHN0cmluZztcblxuICBwcml2YXRlIHVzZXJTdWJzY3JpcGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIHNuYWNrYmFyOiBEZWNTbmFja0JhclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZWNDb25maWc6IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZVRvVXNlcigpO1xuICAgIHRoaXMudHJ5VG9Mb2FkU2lnbmVkSW5Vc2VyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9Vc2VyKCk7XG4gIH1cblxuICBnZXQgaG9zdCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNDb25maWcuY29uZmlnLmFwaTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gUFVCTElDIEFVVEggTUVUSE9EUyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIGF1dGggPSAobG9naW5EYXRhOiBMb2dpbkRhdGEpID0+IHtcbiAgICBpZiAobG9naW5EYXRhKSB7XG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvc2lnbmluJyk7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgICBjb25zdCBib2R5ID0gbmV3IEh0dHBQYXJhbXMoKVxuICAgICAgICAuc2V0KCd1c2VybmFtZScsIGxvZ2luRGF0YS5lbWFpbClcbiAgICAgICAgLnNldCgncGFzc3dvcmQnLCBsb2dpbkRhdGEucGFzc3dvcmQpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCBib2R5LCBvcHRpb25zKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBub3RpZmllZDogdHJ1ZSwgbWVzc2FnZTogJ0RFQ09SQS1BUEkgQVVUSCBFUlJPUjo6IE5vIGNyZWRlbnRpYWxzIHByb3ZpZGVkJyB9KTtcbiAgICB9XG4gIH1cblxuICBhdXRoRmFjZWJvb2sgPSAobG9naW5EYXRhOiBGYWNlYm9va0xvZ2luRGF0YSkgPT4ge1xuICAgIGlmIChsb2dpbkRhdGEpIHtcbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9mYWNlYm9vay9zaWduaW4nKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICAgIGNvbnN0IGJvZHkgPSBuZXcgSHR0cFBhcmFtcygpXG4gICAgICAgIC5zZXQoJ2ZhY2Vib29rVG9rZW4nLCBsb2dpbkRhdGEuZmFjZWJvb2tUb2tlbilcbiAgICAgICAgLnNldCgna2VlcExvZ2dlZCcsIGxvZ2luRGF0YS5rZWVwTG9nZ2VkLnRvU3RyaW5nKCkpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCBib2R5LCBvcHRpb25zKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBub3RpZmllZDogdHJ1ZSwgbWVzc2FnZTogJ0RFQ09SQS1BUEkgQVVUSCBGQUNFQk9PSyBFUlJPUjo6IE5vIGNyZWRlbnRpYWxzIHByb3ZpZGVkJyB9KTtcbiAgICB9XG4gIH1cblxuICBsb2dvdXQgPSAocmVkaXJlY3RUb0xvZ2luUGFnZSA9IHRydWUpID0+IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvc2lnbm91dCcpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kKGVuZHBvaW50LCB7fSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuc2Vzc2lvblRva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgIGlmIChyZWRpcmVjdFRvTG9naW5QYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmdvVG9Mb2dpblBhZ2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSkpO1xuICB9XG5cbiAgZmV0Y2hDdXJyZW50TG9nZ2VkVXNlciA9ICgpID0+IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvYWNjb3VudCcpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbigpIH07XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kPFVzZXJBdXRoRGF0YT4oZW5kcG9pbnQsIHt9LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBQVUJMSUMgSFRUUCBNRVRIT0RTIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgZ2V0ID0gPFQ+KGVuZHBvaW50LCBzZWFyY2g/OiBEZWNGaWx0ZXIsIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy50cmFuc2Zvcm1EZWNGaWx0ZXJJblBhcmFtcyhzZWFyY2gpO1xuICAgIHJldHVybiB0aGlzLmdldE1ldGhvZDxUPihlbmRvcGludFVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZSA9IDxUPihlbmRwb2ludCwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5kZWxldGVNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgcGF0Y2ggPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLnBhdGNoTWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3QgPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHV0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wdXRNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgdXBzZXJ0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgaWYgKHBheWxvYWQuaWQgPj0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KGVuZHBvaW50LCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChlbmRwb2ludCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgdXBsb2FkKGVuZHBvaW50OiBzdHJpbmcsIGZpbGVzOiBGaWxlW10sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5jcmVhdGVGaWxlc0Zvcm1EYXRhKGZpbGVzKTtcbiAgICBvcHRpb25zLnJlcG9ydFByb2dyZXNzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdE1ldGhvZCgnUE9TVCcsIGVuZG9waW50VXJsLCBmb3JtRGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIC8vICoqKioqKioqKioqKiAvL1xuICAvLyBQdWJsaWMgSGVscGVyIE1ldGhvZHMgLy9cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIHByaXZhdGUgdHJhbnNmb3JtRGVjRmlsdGVySW5QYXJhbXMoZmlsdGVyOiBEZWNGaWx0ZXIpOiBTZXJpYWxpemVkRGVjRmlsdGVyIHtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZWRGaWx0ZXI6IFNlcmlhbGl6ZWREZWNGaWx0ZXIgPSB7fTtcblxuICAgIGlmIChmaWx0ZXIpIHtcblxuICAgICAgaWYgKGZpbHRlci5wYWdlKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIucGFnZSA9IGZpbHRlci5wYWdlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLmxpbWl0KSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIubGltaXQgPSBmaWx0ZXIubGltaXQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuZmlsdGVyR3JvdXBzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcldpdGhWYWx1ZUFzQXJyYXkgPSB0aGlzLmdldEZpbHRlcldpdGhWYWx1ZXNBc0FycmF5KGZpbHRlci5maWx0ZXJHcm91cHMpO1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLmZpbHRlciA9IHRoaXMuZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhmaWx0ZXJXaXRoVmFsdWVBc0FycmF5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5wcm9qZWN0Vmlldykge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnByb2plY3RWaWV3ID0gdGhpcy5maWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKGZpbHRlci5wcm9qZWN0Vmlldyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuc29ydCkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnNvcnQgPSB0aGlzLmZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcoZmlsdGVyLnNvcnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLnRleHRTZWFyY2gpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci50ZXh0U2VhcmNoID0gZmlsdGVyLnRleHRTZWFyY2g7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gc2VyaWFsaXplZEZpbHRlcjtcblxuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKG9iaikge1xuICAgIGlmIChvYmopIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyV2l0aFZhbHVlc0FzQXJyYXkoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cENvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbHRlckdyb3VwcykpOyAvLyBtYWtlIGEgY29weSBvZiB0aGUgZmlsdGVyIHNvIHdlIGRvIG5vdCBjaGFuZ2UgdGhlIG9yaWdpbmFsIGZpbHRlclxuXG4gICAgaWYgKGZpbHRlckdyb3VwQ29weSkge1xuXG4gICAgICByZXR1cm4gZmlsdGVyR3JvdXBDb3B5Lm1hcChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycyA9IGZpbHRlckdyb3VwLmZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG5cbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmlsdGVyLnZhbHVlKSkge1xuICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gW2ZpbHRlci52YWx1ZV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZpbHRlcjtcblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyR3JvdXA7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIGZpbHRlckdyb3VwcztcblxuICAgIH1cbiAgfVxuXG5cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIC8vIEh0dHAgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKiogLy9cbiAgcHJpdmF0ZSBnZXRNZXRob2Q8VD4odXJsOiBzdHJpbmcsIHNlYXJjaCA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLnBhcmFtcyA9IHNlYXJjaDtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8VD4odXJsLCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnBhdGNoPFQ+KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHBvc3RNZXRob2Q8VD4odXJsLCBib2R5Pywgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXRNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWxldGVNZXRob2Q8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLmRlbGV0ZTxUPih1cmwsIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0TWV0aG9kPFQ+KHR5cGU6IEh0dHBSZXF1ZXN0VHlwZXMsIHVybDogc3RyaW5nLCBib2R5OiBhbnkgPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih1bmRlZmluZWQsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHR5cGUsIHVybCwgYm9keSwgb3B0aW9ucyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucmVxdWVzdDxUPihyZXEpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvciA9IChlcnJvcjogYW55KSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgY29uc3QgYm9keU1lc3NhZ2UgPSAoZXJyb3IgJiYgZXJyb3IuZXJyb3IpID8gZXJyb3IuZXJyb3IubWVzc2FnZSA6ICcnO1xuICAgIGNvbnN0IHN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICBjb25zdCBzdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcblxuICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgaWYgKHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdCkge1xuICAgICAgICAgIHRoaXMuZ29Ub0xvZ2luUGFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDQwOTpcbiAgICAgICAgdGhpcy5zbmFja2Jhci5vcGVuKCdtZXNzYWdlLmh0dHAtc3RhdHVzLjQwOScsICdlcnJvcicpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgc3RhdHVzVGV4dCwgbWVzc2FnZSwgYm9keU1lc3NhZ2UgfSk7XG4gIH1cblxuICAvLyAqKioqKioqIC8vXG4gIC8vIEhlbHBlcnMgLy9cbiAgLy8gKioqKioqKiAvL1xuXG4gIHByaXZhdGUgY3JlYXRlRmlsZXNGb3JtRGF0YShmaWxlczogRmlsZVtdKSB7XG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZmlsZXMuZm9yRWFjaCgoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm1JdGVtTmFtZSA9IGluZGV4ID4gMCA/IGBmaWxlLSR7aW5kZXh9YCA6ICdmaWxlJztcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChmb3JtSXRlbU5hbWUsIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTG9naW5QYWdlKCkge1xuICAgIGNvbnN0IG5ha2VkQXBwRG9tYWluID0gd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgIC5yZXBsYWNlKCdodHRwczovLycsICcnKVxuICAgICAgLnJlcGxhY2UoJ2h0dHA6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gsICcnKTtcblxuICAgIGNvbnN0IG5ha2VkQXV0aERvbWFpbiA9IHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdC5zcGxpdCgnPycpWzBdXG4gICAgICAucmVwbGFjZSgnaHR0cHM6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKCdodHRwOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnLy8nLCAnJyk7XG5cbiAgICBpZiAobmFrZWRBcHBEb21haW4gIT09IG5ha2VkQXV0aERvbWFpbikge1xuICAgICAgY29uc3QgYXV0aFVybFdpdGhSZWRpcmVjdCA9IGAke3RoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdH0ke3RoaXMuZ2V0UGFyYW1zRGl2aWRlcigpfXJlZGlyZWN0VXJsPSR7d2luZG93LmxvY2F0aW9uLmhyZWZ9YDtcbiAgICAgIGNvbnNvbGUubG9nKGBEZWNBcGlTZXJ2aWNlOjogTm90IGF1dGhlbnRpY2F0ZWQuIFJlZGlyZWN0aW5nIHRvIGxvZ2luIHBhZ2UgYXQ6ICR7YXV0aFVybFdpdGhSZWRpcmVjdH1gKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXV0aFVybFdpdGhSZWRpcmVjdDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFBhcmFtc0RpdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdC5zcGxpdCgnPycpLmxlbmd0aCA+IDEgPyAnJicgOiAnPyc7XG4gIH1cblxuICBwcml2YXRlIHRyeVRvTG9hZFNpZ25lZEluVXNlcigpIHtcbiAgICB0aGlzLmZldGNoQ3VycmVudExvZ2dlZFVzZXIoKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnRGVjb3JhQXBpU2VydmljZTo6IEluaXRpYWxpemVkIGFzIGxvZ2dlZCcpO1xuICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdEZWNvcmFBcGlTZXJ2aWNlOjogSW5pdGlhbGl6ZWQgYXMgbm90IGxvZ2dlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXphdGlvbiBFcnJvci4gQ291bGQgcmV0cmlldmUgdXNlciBhY2NvdW50JywgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4odHlwZT86IHN0cmluZywgaGVhZGVycz86IEh0dHBIZWFkZXJzKSB7XG4gICAgaGVhZGVycyA9IGhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgY29uc3QgY3VzdG9taXplZENvbnRlbnRUeXBlID0gaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICghY3VzdG9taXplZENvbnRlbnRUeXBlICYmIHR5cGUpIHtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgdHlwZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlc3Npb25Ub2tlbikge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdYLUF1dGgtVG9rZW4nLCB0aGlzLnNlc3Npb25Ub2tlbik7XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYXRTZXNzaW9uVG9rZW4ocmVzKSB7XG4gICAgdGhpcy5zZXNzaW9uVG9rZW4gPSByZXMgJiYgcmVzLnNlc3Npb24gPyByZXMuc2Vzc2lvbi5pZCA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZXNvdXJjZVVybChwYXRoKSB7XG5cbiAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMuZGVjQ29uZmlnLmNvbmZpZy51c2VNb2NrQXBpID8gdGhpcy5kZWNDb25maWcuY29uZmlnLm1vY2tBcGlIb3N0IDogdGhpcy5kZWNDb25maWcuY29uZmlnLmFwaTtcblxuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC98XFwvJC9nLCAnJyk7XG5cbiAgICByZXR1cm4gYCR7YmFzZVBhdGh9LyR7cGF0aH1gO1xuXG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvVXNlcigpIHtcbiAgICB0aGlzLnVzZXJTdWJzY3JpcGlvbiA9IHRoaXMudXNlciQuc3Vic2NyaWJlKHVzZXIgPT4ge1xuICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb1VzZXIoKSB7XG4gICAgdGhpcy51c2VyU3Vic2NyaXBpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qXG4gICogU2hhcmUgT2JzZXJ2YWJsZVxuICAqXG4gICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBzaGFyZSB0aGUgYWN0dWFsIGRhdGEgdmFsdWVzIGFuZCBub3QganVzdCB0aGUgb2JzZXJ2YWJsZSBpbnN0YW5jZVxuICAqXG4gICogVG8gcmV1c2UgYSBzaW5nbGUsIGNvbW1vbiBzdHJlYW0gYW5kIGF2b2lkIG1ha2luZyBhbm90aGVyIHN1YnNjcmlwdGlvbiB0byB0aGUgc2VydmVyIHByb3ZpZGluZyB0aGF0IGRhdGEuXG4gICpcbiAgKi9cbiAgcHJpdmF0ZSBzaGFyZU9ic2VydmFibGUoY2FsbDogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgcmV0dXJuIGNhbGwucGlwZShzaGFyZSgpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwLCBzdGFydFdpdGgsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExhYmVsRnVuY3Rpb24sIFZhbHVlRnVuY3Rpb24sIFNlbGVjdGlvbkV2ZW50LCBDdXN0b21GZXRjaEZ1bmN0aW9uIH0gZnJvbSAnLi9hdXRvY29tcGxldGUubW9kZWxzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICAjdGVybUlucHV0XG4gICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIlxuICAgIFtmb3JtQ29udHJvbF09XCJhdXRvY29tcGxldGVJbnB1dFwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgIChrZXl1cC5lbnRlcik9XCJvbkVudGVyQnV0dG9uKCRldmVudClcIlxuICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcbiAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgIHJlYWRvbmx5IG9uZm9jdXM9XCJ0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcIj5cblxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwiY2xlYXIodHJ1ZSlcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiAhcmVxdWlyZWQgJiYgYXV0b2NvbXBsZXRlSW5wdXQudmFsdWVcIj5cbiAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG5cbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cInJlc2V0KClcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiB2YWx1ZSAhPT0gd3JpdHRlblZhbHVlXCI+XG4gICAgICA8bWF0LWljb24+cmVwbGF5PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cblxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvY29tcGxldGU9XCJtYXRBdXRvY29tcGxldGVcIlxuICBbZGlzcGxheVdpdGhdPVwiZXh0cmFjdExhYmVsXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KVwiXG4gIG5hbWU9XCJhdXRvY29tcGxldGVWYWx1ZVwiPlxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIChvcHRpb25zJCB8IGFzeW5jKVwiIFt2YWx1ZV09XCJpdGVtXCI+XG4gICAgICB7eyBleHRyYWN0TGFiZWwoaXRlbSkgfX1cbiAgICA8L21hdC1vcHRpb24+XG4gIDwvbWF0LWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgQFZpZXdDaGlsZChNYXRBdXRvY29tcGxldGVUcmlnZ2VyKSAgYXV0b2NvbXBsZXRlVHJpZ2dlcjogTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcjtcblxuICBhdXRvY29tcGxldGVJbnB1dDogRm9ybUNvbnRyb2w7XG5cbiAgb3B0aW9ucyQ6IE9ic2VydmFibGU8YW55W10+O1xuXG4gIHdyaXR0ZW5WYWx1ZTogYW55O1xuXG4gIC8vIFBhcmFtc1xuICBASW5wdXQoKSBjdXN0b21GZXRjaEZ1bmN0aW9uOiBDdXN0b21GZXRjaEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGVuZHBvaW50O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZUlucHV0KSB7XG4gICAgICBpZiAodikge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmRpc2FibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBsYWJlbEZuOiBMYWJlbEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGxhYmVsQXR0cjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnYXV0b2NvbXBsZXRlSW5wdXQnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKHY6IGFueVtdKSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IHY7XG4gICAgdGhpcy5pbm5lck9wdGlvbnMgPSB2O1xuICB9XG4gIGdldCBvcHRpb25zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgfVxuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgdmFsdWVGbjogVmFsdWVGdW5jdGlvbjtcblxuICBASW5wdXQoKSB2YWx1ZUF0dHI6IHN0cmluZztcblxuICAvLyBFdmVudHNcbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4oKTtcbiAgXG4gIEBPdXRwdXQoKSBlbnRlckJ1dHRvbjogRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+KCk7XG5cbiAgLy8gVmlldyBlbGVtZW50c1xuICBAVmlld0NoaWxkKCd0ZXJtSW5wdXQnKSB0ZXJtSW5wdXQ7XG5cbiAgLy8gcHJpdmF0ZSBkYXRhO1xuICBwcml2YXRlIG9wdGlvbnMkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55W107XG5cbiAgaW5uZXJPcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIHByaXZhdGUgZmlsdGVyZWRPcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNyZWF0ZUlucHV0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kZXRlY3RSZXF1aXJlZERhdGEoKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9PcHRpb25zKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9PcHRpb25zKCk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIFZBTFVFXG4gICovXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLnNldElubmVyVmFsdWUodik7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHY6IGFueSkge1xuICAgIHRoaXMud3JpdHRlblZhbHVlID0gdjtcbiAgICB2ID0gdiA/IHYgOiB1bmRlZmluZWQ7IC8vIGF2b2lkIG51bGwgdmFsdWVzXG4gICAgY29uc3QgaGFzRGlmZmVyZW5jZSA9ICF0aGlzLmNvbXBhcmVBc1N0cmluZyh2LCB0aGlzLnZhbHVlKTtcbiAgICBpZiAoaGFzRGlmZmVyZW5jZSkge1xuICAgICAgdGhpcy5sb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUodilcbiAgICAgIC50aGVuKChvcHRpb25zKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSAkZXZlbnQub3B0aW9uLnZhbHVlO1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShzZWxlY3RlZE9wdGlvbik7XG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uVmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZE9wdGlvblZhbHVlO1xuICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgIG9wdGlvbjogc2VsZWN0ZWRPcHRpb24sXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuaW5uZXJPcHRpb25zLFxuICAgICAgICBmaWx0ZXJlZE9wdGlvbnM6IHRoaXMuZmlsdGVyZWRPcHRpb25zLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25FbnRlckJ1dHRvbigkZXZlbnQpIHtcbiAgICB0aGlzLmVudGVyQnV0dG9uLmVtaXQoJGV2ZW50KTtcbiAgfSBcblxuICBzZXRGb2N1cygpIHtcbiAgICB0aGlzLnRlcm1JbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBvcGVuUGFuZWwoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVUcmlnZ2VyLm9wZW5QYW5lbCgpO1xuICB9XG5cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgb25CbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGNsZWFyKHJlb3BlbiA9IGZhbHNlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnNldFZhbHVlKCcnKTtcbiAgICBpZiAodGhpcy53cml0dGVuVmFsdWUgPT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgICB9XG4gICAgaWYgKHJlb3Blbikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICB9LCAxKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy53cml0dGVuVmFsdWU7XG4gICAgdGhpcy5zZXRJbm5lclZhbHVlKHRoaXMud3JpdHRlblZhbHVlKTtcbiAgICB0aGlzLnJlc2V0SW5wdXRDb250cm9sKCk7XG4gIH1cblxuICBleHRyYWN0TGFiZWw6IExhYmVsRnVuY3Rpb24gPSAoaXRlbTogYW55KTogc3RyaW5nID0+IHtcbiAgICBsZXQgbGFiZWwgPSBpdGVtOyAvLyB1c2UgdGhlIG9iamVjdCBpdHNlbGYgaWYgbm8gbGFiZWwgZnVuY3Rpb24gb3IgYXR0cmlidXRlIGlzIHByb3ZpZGVkXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLmxhYmVsRm4pIHsgLy8gVXNlIGN1c3RvbSBsYWJlbCBmdW5jdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IHRoaXMubGFiZWxGbihpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sYWJlbEF0dHIpIHsgLy8gVXNlIG9iamVjdCBsYWJlbCBhdHRyaWJ1dGUgaWYgcHJvdmlkZWRcbiAgICAgICAgbGFiZWwgPSBpdGVtW3RoaXMubGFiZWxBdHRyXSB8fCB1bmRlZmluZWQ7XG5cbiAgICAgIH1cbiAgICB9XG4gICAgbGFiZWwgPSB0aGlzLmVuc3VyZVN0cmluZyhsYWJlbCk7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUod3JpdHRlblZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh3cml0dGVuVmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh3cml0dGVuVmFsdWUpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgIHJlc29sdmUod3JpdHRlblZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHdyaXR0ZW5WYWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdFJlcXVpcmVkRGF0YSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgZXJyb3I6IHN0cmluZztcbiAgICAgIGlmICghdGhpcy5lbmRwb2ludCAmJiAhdGhpcy5vcHRpb25zICYmICF0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24pIHtcbiAgICAgICAgZXJyb3IgPSAnTm8gZW5kcG9pbnQgfCBvcHRpb25zIHwgY3VzdG9tRmV0Y2hGdW5jdGlvbiBzZXQuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9mIHRoZW0gdG8gYmUgYWJsZSB0byB1c2UgdGhlIEF1dG9jb21wbGV0ZSc7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5yYWlzZUVycm9yKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRJbnB1dENvbnRyb2woKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5tYXJrQXNQcmlzdGluZSgpO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubWFya0FzVW50b3VjaGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RWYWx1ZTogVmFsdWVGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBhbnkgPT4ge1xuICAgIGxldCB2YWx1ZSA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyB2YWx1ZSBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMudmFsdWVGbikgeyAvLyBVc2UgY3VzdG9tIHZhbHVlIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZUZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlQXR0cikgeyAvLyBVc2Ugb2JqZWN0IHZhbHVlIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICB2YWx1ZSA9IGl0ZW1bdGhpcy52YWx1ZUF0dHJdIHx8IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wYXJlQXNTdHJpbmcodjEsIHYyKSB7XG4gICAgY29uc3Qgc3RyaW5nMSA9IHRoaXMuZW5zdXJlU3RyaW5nKHYxKTtcbiAgICBjb25zdCBzdHJpbmcyID0gdGhpcy5lbnN1cmVTdHJpbmcodjIpO1xuICAgIHJldHVybiBzdHJpbmcxID09PSBzdHJpbmcyO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVTdHJpbmcodikge1xuICAgIGlmICh0eXBlb2YgdiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc05hTih2KSkge1xuICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ID0gYCR7dn1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9PcHRpb25zKCkge1xuICAgIHRoaXMub3B0aW9ucyRTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbnMkLnN1YnNjcmliZShvcHRpb25zID0+IHtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gb3B0aW9ucztcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJWYWx1ZSh2OiBhbnkpIHtcbiAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZUJhc2VkT25Jbm5lclZhbHVlKHYpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbnB1dFZhbHVlQmFzZWRPbklubmVyVmFsdWUodjogYW55KSB7XG4gICAgY29uc3Qgb3B0aW9uID0gdGhpcy5nZXRPcHRpb25CYXNlZE9uVmFsdWUodik7XG4gICAgY29uc3QgbGFiZWwgPSB0aGlzLmV4dHJhY3RMYWJlbChvcHRpb24pO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuc2V0VmFsdWUob3B0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9uQmFzZWRPblZhbHVlKHY6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyT3B0aW9ucy5maW5kKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgaXRlbVZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoaXRlbSk7XG4gICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXNTdHJpbmcoaXRlbVZhbHVlLCB2KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW5wdXQoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dCA9IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbCh7dmFsdWU6IHVuZGVmaW5lZCwgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkfSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKSB7XG4gICAgdGhpcy5vcHRpb25zJCA9IHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQudmFsdWVDaGFuZ2VzXG4gICAgLnBpcGUoXG4gICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgc3dpdGNoTWFwKCh0ZXh0U2VhcmNoOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgaXNTdHJpbmdUZXJtID0gdHlwZW9mIHRleHRTZWFyY2ggPT09ICdzdHJpbmcnO1xuICAgICAgICBpZiAoaXNTdHJpbmdUZXJtKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUodGV4dFNlYXJjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9mKHRoaXMuaW5uZXJPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlYXJjaEluTG9jYWxPcHRpb25zKHRleHRTZWFyY2gpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKHRleHRTZWFyY2gpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChvcHRpb25zID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBib2R5ID0gdGV4dFNlYXJjaCA/IHsgdGV4dFNlYXJjaCB9IDogdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5nZXQ8YW55W10+KHRoaXMuZW5kcG9pbnQsIGJvZHkpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgob3B0aW9uczogYW55W10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb09wdGlvbnMoKSB7XG4gICAgdGhpcy5vcHRpb25zJFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hJbkxvY2FsT3B0aW9ucyh0ZXJtOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0ZXJtU3RyaW5nID0gYCR7dGVybX1gO1xuXG4gICAgbGV0IGZpbHRlcmVkRGF0YSA9IHRoaXMuaW5uZXJPcHRpb25zO1xuXG4gICAgaWYgKHRlcm1TdHJpbmcpIHtcbiAgICAgIGZpbHRlcmVkRGF0YSA9IHRoaXMuaW5uZXJPcHRpb25zXG4gICAgICAuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBsYWJlbDogc3RyaW5nID0gdGhpcy5leHRyYWN0TGFiZWwoaXRlbSk7XG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZUxhYmVsID0gbGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbG93ZXJDYXNlVGVybSA9IHRlcm1TdHJpbmcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIGxvd2VyQ2FzZUxhYmVsLnNlYXJjaChsb3dlckNhc2VUZXJtKSA+PSAwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mKGZpbHRlcmVkRGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHJhaXNlRXJyb3IoZXJyb3I6IHN0cmluZykge1xuICAgIHRocm93IG5ldyBFcnJvcihgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IEVycm9yOjogVGhlIGF1dG9jb21wbGV0ZSB3aXRoIG5hbWUgXCIke3RoaXMubmFtZX1cIiBoYWQgdGhlIGZvbGxvdyBwcm9ibGVtOiAke2Vycm9yfWApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwVXJsRW5jb2RpbmdDb2RlYyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5jb25zdCBFTkRQT0lOVF9URVNURSA9ICdyZXBvcnQvYWNjb3VudHMvb3B0aW9ucyc7XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuY29uc3QgQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUFjY291bnRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1hY2NvdW50JyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWF1dG9jb21wbGV0ZVxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuW25hbWVdPVwibmFtZVwiXG5bbGFiZWxGbl09XCJsYWJlbEZuXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KClcbiAgc2V0IHR5cGVzKHY6IHN0cmluZ1tdKSB7XG4gICAgaWYgKHYgIT09IHRoaXMuX3R5cGVzKSB7XG4gICAgICB0aGlzLl90eXBlcyA9IHY7XG4gICAgICB0aGlzLnNldFJvbGVzUGFyYW1zKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHR5cGVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZXM7XG4gIH1cblxuICBfdHlwZXM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0FjY291bnQgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdBY2NvdW50IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlXG4gICkgeyB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGxhYmVsRm4oYWNjb3VudCkge1xuICAgIHJldHVybiBgJHthY2NvdW50LnZhbHVlfSAjJHthY2NvdW50LmtleX1gO1xuICB9XG5cbiAgc2V0Um9sZXNQYXJhbXMoKSB7XG4gICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgbGV0IGVuZHBvaW50ID0gYCR7RU5EUE9JTlRfVEVTVEV9YDtcblxuICAgIGlmICh0aGlzLnR5cGVzKSB7XG4gICAgICBwYXJhbXMucHVzaChgcm9sZXM9JHtlbmNvZGVVUkkoSlNPTi5zdHJpbmdpZnkodGhpcy50eXBlcykpfWApO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMubGVuZ3RoKSB7XG4gICAgICBlbmRwb2ludCArPSBgPyR7cGFyYW1zLmpvaW4oJyYnKX1gO1xuICAgIH1cblxuICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtYWNjb3VudC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVBY2NvdW50TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfQ09NUEFOWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtY29tcGFueScsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bbGFiZWxGbl09XCJsYWJlbEZuXCJcblt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbihibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX0NPTVBBTllfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ29tcGFueUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludCA9ICdjb21wYW5pZXMvb3B0aW9ucyc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdDb21wYW55IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnQ29tcGFueSBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1jb21wYW55LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvbXBhbnlNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfQ09VTlRSWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtY291bnRyeScsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bb3B0aW9uc109XCIoY291bnRyaWVzJCB8IGFzeW5jKVwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcbltsYWJlbEZuXT1cImxhYmVsRm5cIlxuW3ZhbHVlRm5dPVwidmFsdWVGblwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9DT1VOVFJZX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgY291bnRyaWVzJDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIEBJbnB1dCgpIGxhbmc6ICdlbicgfCAncHQtYnInID0gJ2VuJztcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0NvdW50cnkgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdDb3VudHJ5IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY291bnRyaWVzJCA9IG9mKEZBS0VfREFUQSk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgbGFiZWxGbiA9IChpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLm5hbWUgOiBpdGVtO1xuICB9XG5cbiAgdmFsdWVGbiA9IChpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmNvZGUgOiBpdGVtO1xuICB9XG5cbn1cblxuY29uc3QgRkFLRV9EQVRBID0gW3sgJ2NvZGUnOiAnQUQnLCAnbmFtZSc6ICdBbmRvcnJhJyB9LCB7ICdjb2RlJzogJ0FFJywgJ25hbWUnOiAnVW5pdGVkIEFyYWIgRW1pcmF0ZXMnIH0sIHsgJ2NvZGUnOiAnQUYnLCAnbmFtZSc6ICdBZmdoYW5pc3RhbicgfSwgeyAnY29kZSc6ICdBRycsICduYW1lJzogJ0FudGlndWEgYW5kIEJhcmJ1ZGEnIH0sIHsgJ2NvZGUnOiAnQUknLCAnbmFtZSc6ICdBbmd1aWxsYScgfSwgeyAnY29kZSc6ICdBTCcsICduYW1lJzogJ0FsYmFuaWEnIH0sIHsgJ2NvZGUnOiAnQU0nLCAnbmFtZSc6ICdBcm1lbmlhJyB9LCB7ICdjb2RlJzogJ0FOJywgJ25hbWUnOiAnTmV0aGVybGFuZHMgQW50aWxsZXMnIH0sIHsgJ2NvZGUnOiAnQU8nLCAnbmFtZSc6ICdBbmdvbGEnIH0sIHsgJ2NvZGUnOiAnQVEnLCAnbmFtZSc6ICdBbnRhcmN0aWNhJyB9LCB7ICdjb2RlJzogJ0FSJywgJ25hbWUnOiAnQXJnZW50aW5hJyB9LCB7ICdjb2RlJzogJ0FTJywgJ25hbWUnOiAnQW1lcmljYW4gU2Ftb2EnIH0sIHsgJ2NvZGUnOiAnQVQnLCAnbmFtZSc6ICdBdXN0cmlhJyB9LCB7ICdjb2RlJzogJ0FVJywgJ25hbWUnOiAnQXVzdHJhbGlhJyB9LCB7ICdjb2RlJzogJ0FXJywgJ25hbWUnOiAnQXJ1YmEnIH0sIHsgJ2NvZGUnOiAnQVgnLCAnbmFtZSc6ICfDg8KFbGFuZCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0FaJywgJ25hbWUnOiAnQXplcmJhaWphbicgfSwgeyAnY29kZSc6ICdCQScsICduYW1lJzogJ0Jvc25pYSBhbmQgSGVyemVnb3ZpbmEnIH0sIHsgJ2NvZGUnOiAnQkInLCAnbmFtZSc6ICdCYXJiYWRvcycgfSwgeyAnY29kZSc6ICdCRCcsICduYW1lJzogJ0JhbmdsYWRlc2gnIH0sIHsgJ2NvZGUnOiAnQkUnLCAnbmFtZSc6ICdCZWxnaXVtJyB9LCB7ICdjb2RlJzogJ0JGJywgJ25hbWUnOiAnQnVya2luYSBGYXNvJyB9LCB7ICdjb2RlJzogJ0JHJywgJ25hbWUnOiAnQnVsZ2FyaWEnIH0sIHsgJ2NvZGUnOiAnQkgnLCAnbmFtZSc6ICdCYWhyYWluJyB9LCB7ICdjb2RlJzogJ0JJJywgJ25hbWUnOiAnQnVydW5kaScgfSwgeyAnY29kZSc6ICdCSicsICduYW1lJzogJ0JlbmluJyB9LCB7ICdjb2RlJzogJ0JMJywgJ25hbWUnOiAnU2FpbnQgQmFydGjDg8KpbGVteScgfSwgeyAnY29kZSc6ICdCTScsICduYW1lJzogJ0Jlcm11ZGEnIH0sIHsgJ2NvZGUnOiAnQk4nLCAnbmFtZSc6ICdCcnVuZWknIH0sIHsgJ2NvZGUnOiAnQk8nLCAnbmFtZSc6ICdCb2xpdmlhJyB9LCB7ICdjb2RlJzogJ0JRJywgJ25hbWUnOiAnQm9uYWlyZSwgU2ludCBFdXN0YXRpdXMgYW5kIFNhYmEnIH0sIHsgJ2NvZGUnOiAnQlInLCAnbmFtZSc6ICdCcmF6aWwnIH0sIHsgJ2NvZGUnOiAnQlMnLCAnbmFtZSc6ICdCYWhhbWFzJyB9LCB7ICdjb2RlJzogJ0JUJywgJ25hbWUnOiAnQmh1dGFuJyB9LCB7ICdjb2RlJzogJ0JWJywgJ25hbWUnOiAnQm91dmV0IElzbGFuZCcgfSwgeyAnY29kZSc6ICdCVycsICduYW1lJzogJ0JvdHN3YW5hJyB9LCB7ICdjb2RlJzogJ0JZJywgJ25hbWUnOiAnQmVsYXJ1cycgfSwgeyAnY29kZSc6ICdCWicsICduYW1lJzogJ0JlbGl6ZScgfSwgeyAnY29kZSc6ICdDQScsICduYW1lJzogJ0NhbmFkYScgfSwgeyAnY29kZSc6ICdDQycsICduYW1lJzogJ0NvY29zIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnQ0QnLCAnbmFtZSc6ICdUaGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBPZiBDb25nbycgfSwgeyAnY29kZSc6ICdDRicsICduYW1lJzogJ0NlbnRyYWwgQWZyaWNhbiBSZXB1YmxpYycgfSwgeyAnY29kZSc6ICdDRycsICduYW1lJzogJ0NvbmdvJyB9LCB7ICdjb2RlJzogJ0NIJywgJ25hbWUnOiAnU3dpdHplcmxhbmQnIH0sIHsgJ2NvZGUnOiAnQ0knLCAnbmFtZSc6ICdDw4PCtHRlIGRcXCdJdm9pcmUnIH0sIHsgJ2NvZGUnOiAnQ0snLCAnbmFtZSc6ICdDb29rIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnQ0wnLCAnbmFtZSc6ICdDaGlsZScgfSwgeyAnY29kZSc6ICdDTScsICduYW1lJzogJ0NhbWVyb29uJyB9LCB7ICdjb2RlJzogJ0NOJywgJ25hbWUnOiAnQ2hpbmEnIH0sIHsgJ2NvZGUnOiAnQ08nLCAnbmFtZSc6ICdDb2xvbWJpYScgfSwgeyAnY29kZSc6ICdDUicsICduYW1lJzogJ0Nvc3RhIFJpY2EnIH0sIHsgJ2NvZGUnOiAnQ1UnLCAnbmFtZSc6ICdDdWJhJyB9LCB7ICdjb2RlJzogJ0NWJywgJ25hbWUnOiAnQ2FwZSBWZXJkZScgfSwgeyAnY29kZSc6ICdDVycsICduYW1lJzogJ0N1cmHDg8KnYW8nIH0sIHsgJ2NvZGUnOiAnQ1gnLCAnbmFtZSc6ICdDaHJpc3RtYXMgSXNsYW5kJyB9LCB7ICdjb2RlJzogJ0NZJywgJ25hbWUnOiAnQ3lwcnVzJyB9LCB7ICdjb2RlJzogJ0NaJywgJ25hbWUnOiAnQ3plY2ggUmVwdWJsaWMnIH0sIHsgJ2NvZGUnOiAnREUnLCAnbmFtZSc6ICdHZXJtYW55JyB9LCB7ICdjb2RlJzogJ0RKJywgJ25hbWUnOiAnRGppYm91dGknIH0sIHsgJ2NvZGUnOiAnREsnLCAnbmFtZSc6ICdEZW5tYXJrJyB9LCB7ICdjb2RlJzogJ0RNJywgJ25hbWUnOiAnRG9taW5pY2EnIH0sIHsgJ2NvZGUnOiAnRE8nLCAnbmFtZSc6ICdEb21pbmljYW4gUmVwdWJsaWMnIH0sIHsgJ2NvZGUnOiAnRFonLCAnbmFtZSc6ICdBbGdlcmlhJyB9LCB7ICdjb2RlJzogJ0VDJywgJ25hbWUnOiAnRWN1YWRvcicgfSwgeyAnY29kZSc6ICdFRScsICduYW1lJzogJ0VzdG9uaWEnIH0sIHsgJ2NvZGUnOiAnRUcnLCAnbmFtZSc6ICdFZ3lwdCcgfSwgeyAnY29kZSc6ICdFSCcsICduYW1lJzogJ1dlc3Rlcm4gU2FoYXJhJyB9LCB7ICdjb2RlJzogJ0VSJywgJ25hbWUnOiAnRXJpdHJlYScgfSwgeyAnY29kZSc6ICdFUycsICduYW1lJzogJ1NwYWluJyB9LCB7ICdjb2RlJzogJ0VUJywgJ25hbWUnOiAnRXRoaW9waWEnIH0sIHsgJ2NvZGUnOiAnRkknLCAnbmFtZSc6ICdGaW5sYW5kJyB9LCB7ICdjb2RlJzogJ0ZKJywgJ25hbWUnOiAnRmlqaScgfSwgeyAnY29kZSc6ICdGSycsICduYW1lJzogJ0ZhbGtsYW5kIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnRk0nLCAnbmFtZSc6ICdNaWNyb25lc2lhJyB9LCB7ICdjb2RlJzogJ0ZPJywgJ25hbWUnOiAnRmFyb2UgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdGUicsICduYW1lJzogJ0ZyYW5jZScgfSwgeyAnY29kZSc6ICdHQScsICduYW1lJzogJ0dhYm9uJyB9LCB7ICdjb2RlJzogJ0dCJywgJ25hbWUnOiAnVW5pdGVkIEtpbmdkb20nIH0sIHsgJ2NvZGUnOiAnR0QnLCAnbmFtZSc6ICdHcmVuYWRhJyB9LCB7ICdjb2RlJzogJ0dFJywgJ25hbWUnOiAnR2VvcmdpYScgfSwgeyAnY29kZSc6ICdHRicsICduYW1lJzogJ0ZyZW5jaCBHdWlhbmEnIH0sIHsgJ2NvZGUnOiAnR0cnLCAnbmFtZSc6ICdHdWVybnNleScgfSwgeyAnY29kZSc6ICdHSCcsICduYW1lJzogJ0doYW5hJyB9LCB7ICdjb2RlJzogJ0dJJywgJ25hbWUnOiAnR2licmFsdGFyJyB9LCB7ICdjb2RlJzogJ0dMJywgJ25hbWUnOiAnR3JlZW5sYW5kJyB9LCB7ICdjb2RlJzogJ0dNJywgJ25hbWUnOiAnR2FtYmlhJyB9LCB7ICdjb2RlJzogJ0dOJywgJ25hbWUnOiAnR3VpbmVhJyB9LCB7ICdjb2RlJzogJ0dQJywgJ25hbWUnOiAnR3VhZGVsb3VwZScgfSwgeyAnY29kZSc6ICdHUScsICduYW1lJzogJ0VxdWF0b3JpYWwgR3VpbmVhJyB9LCB7ICdjb2RlJzogJ0dSJywgJ25hbWUnOiAnR3JlZWNlJyB9LCB7ICdjb2RlJzogJ0dTJywgJ25hbWUnOiAnU291dGggR2VvcmdpYSBBbmQgVGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnR1QnLCAnbmFtZSc6ICdHdWF0ZW1hbGEnIH0sIHsgJ2NvZGUnOiAnR1UnLCAnbmFtZSc6ICdHdWFtJyB9LCB7ICdjb2RlJzogJ0dXJywgJ25hbWUnOiAnR3VpbmVhLUJpc3NhdScgfSwgeyAnY29kZSc6ICdHWScsICduYW1lJzogJ0d1eWFuYScgfSwgeyAnY29kZSc6ICdISycsICduYW1lJzogJ0hvbmcgS29uZycgfSwgeyAnY29kZSc6ICdITScsICduYW1lJzogJ0hlYXJkIElzbGFuZCBBbmQgTWNEb25hbGQgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdITicsICduYW1lJzogJ0hvbmR1cmFzJyB9LCB7ICdjb2RlJzogJ0hSJywgJ25hbWUnOiAnQ3JvYXRpYScgfSwgeyAnY29kZSc6ICdIVCcsICduYW1lJzogJ0hhaXRpJyB9LCB7ICdjb2RlJzogJ0hVJywgJ25hbWUnOiAnSHVuZ2FyeScgfSwgeyAnY29kZSc6ICdJRCcsICduYW1lJzogJ0luZG9uZXNpYScgfSwgeyAnY29kZSc6ICdJRScsICduYW1lJzogJ0lyZWxhbmQnIH0sIHsgJ2NvZGUnOiAnSUwnLCAnbmFtZSc6ICdJc3JhZWwnIH0sIHsgJ2NvZGUnOiAnSU0nLCAnbmFtZSc6ICdJc2xlIE9mIE1hbicgfSwgeyAnY29kZSc6ICdJTicsICduYW1lJzogJ0luZGlhJyB9LCB7ICdjb2RlJzogJ0lPJywgJ25hbWUnOiAnQnJpdGlzaCBJbmRpYW4gT2NlYW4gVGVycml0b3J5JyB9LCB7ICdjb2RlJzogJ0lRJywgJ25hbWUnOiAnSXJhcScgfSwgeyAnY29kZSc6ICdJUicsICduYW1lJzogJ0lyYW4nIH0sIHsgJ2NvZGUnOiAnSVMnLCAnbmFtZSc6ICdJY2VsYW5kJyB9LCB7ICdjb2RlJzogJ0lUJywgJ25hbWUnOiAnSXRhbHknIH0sIHsgJ2NvZGUnOiAnSkUnLCAnbmFtZSc6ICdKZXJzZXknIH0sIHsgJ2NvZGUnOiAnSk0nLCAnbmFtZSc6ICdKYW1haWNhJyB9LCB7ICdjb2RlJzogJ0pPJywgJ25hbWUnOiAnSm9yZGFuJyB9LCB7ICdjb2RlJzogJ0pQJywgJ25hbWUnOiAnSmFwYW4nIH0sIHsgJ2NvZGUnOiAnS0UnLCAnbmFtZSc6ICdLZW55YScgfSwgeyAnY29kZSc6ICdLRycsICduYW1lJzogJ0t5cmd5enN0YW4nIH0sIHsgJ2NvZGUnOiAnS0gnLCAnbmFtZSc6ICdDYW1ib2RpYScgfSwgeyAnY29kZSc6ICdLSScsICduYW1lJzogJ0tpcmliYXRpJyB9LCB7ICdjb2RlJzogJ0tNJywgJ25hbWUnOiAnQ29tb3JvcycgfSwgeyAnY29kZSc6ICdLTicsICduYW1lJzogJ1NhaW50IEtpdHRzIEFuZCBOZXZpcycgfSwgeyAnY29kZSc6ICdLUCcsICduYW1lJzogJ05vcnRoIEtvcmVhJyB9LCB7ICdjb2RlJzogJ0tSJywgJ25hbWUnOiAnU291dGggS29yZWEnIH0sIHsgJ2NvZGUnOiAnS1cnLCAnbmFtZSc6ICdLdXdhaXQnIH0sIHsgJ2NvZGUnOiAnS1knLCAnbmFtZSc6ICdDYXltYW4gSXNsYW5kcycgfSwgeyAnY29kZSc6ICdLWicsICduYW1lJzogJ0themFraHN0YW4nIH0sIHsgJ2NvZGUnOiAnTEEnLCAnbmFtZSc6ICdMYW9zJyB9LCB7ICdjb2RlJzogJ0xCJywgJ25hbWUnOiAnTGViYW5vbicgfSwgeyAnY29kZSc6ICdMQycsICduYW1lJzogJ1NhaW50IEx1Y2lhJyB9LCB7ICdjb2RlJzogJ0xJJywgJ25hbWUnOiAnTGllY2h0ZW5zdGVpbicgfSwgeyAnY29kZSc6ICdMSycsICduYW1lJzogJ1NyaSBMYW5rYScgfSwgeyAnY29kZSc6ICdMUicsICduYW1lJzogJ0xpYmVyaWEnIH0sIHsgJ2NvZGUnOiAnTFMnLCAnbmFtZSc6ICdMZXNvdGhvJyB9LCB7ICdjb2RlJzogJ0xUJywgJ25hbWUnOiAnTGl0aHVhbmlhJyB9LCB7ICdjb2RlJzogJ0xVJywgJ25hbWUnOiAnTHV4ZW1ib3VyZycgfSwgeyAnY29kZSc6ICdMVicsICduYW1lJzogJ0xhdHZpYScgfSwgeyAnY29kZSc6ICdMWScsICduYW1lJzogJ0xpYnlhJyB9LCB7ICdjb2RlJzogJ01BJywgJ25hbWUnOiAnTW9yb2NjbycgfSwgeyAnY29kZSc6ICdNQycsICduYW1lJzogJ01vbmFjbycgfSwgeyAnY29kZSc6ICdNRCcsICduYW1lJzogJ01vbGRvdmEnIH0sIHsgJ2NvZGUnOiAnTUUnLCAnbmFtZSc6ICdNb250ZW5lZ3JvJyB9LCB7ICdjb2RlJzogJ01GJywgJ25hbWUnOiAnU2FpbnQgTWFydGluJyB9LCB7ICdjb2RlJzogJ01HJywgJ25hbWUnOiAnTWFkYWdhc2NhcicgfSwgeyAnY29kZSc6ICdNSCcsICduYW1lJzogJ01hcnNoYWxsIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnTUsnLCAnbmFtZSc6ICdNYWNlZG9uaWEnIH0sIHsgJ2NvZGUnOiAnTUwnLCAnbmFtZSc6ICdNYWxpJyB9LCB7ICdjb2RlJzogJ01NJywgJ25hbWUnOiAnTXlhbm1hcicgfSwgeyAnY29kZSc6ICdNTicsICduYW1lJzogJ01vbmdvbGlhJyB9LCB7ICdjb2RlJzogJ01PJywgJ25hbWUnOiAnTWFjYW8nIH0sIHsgJ2NvZGUnOiAnTVAnLCAnbmFtZSc6ICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnTVEnLCAnbmFtZSc6ICdNYXJ0aW5pcXVlJyB9LCB7ICdjb2RlJzogJ01SJywgJ25hbWUnOiAnTWF1cml0YW5pYScgfSwgeyAnY29kZSc6ICdNUycsICduYW1lJzogJ01vbnRzZXJyYXQnIH0sIHsgJ2NvZGUnOiAnTVQnLCAnbmFtZSc6ICdNYWx0YScgfSwgeyAnY29kZSc6ICdNVScsICduYW1lJzogJ01hdXJpdGl1cycgfSwgeyAnY29kZSc6ICdNVicsICduYW1lJzogJ01hbGRpdmVzJyB9LCB7ICdjb2RlJzogJ01XJywgJ25hbWUnOiAnTWFsYXdpJyB9LCB7ICdjb2RlJzogJ01YJywgJ25hbWUnOiAnTWV4aWNvJyB9LCB7ICdjb2RlJzogJ01ZJywgJ25hbWUnOiAnTWFsYXlzaWEnIH0sIHsgJ2NvZGUnOiAnTVonLCAnbmFtZSc6ICdNb3phbWJpcXVlJyB9LCB7ICdjb2RlJzogJ05BJywgJ25hbWUnOiAnTmFtaWJpYScgfSwgeyAnY29kZSc6ICdOQycsICduYW1lJzogJ05ldyBDYWxlZG9uaWEnIH0sIHsgJ2NvZGUnOiAnTkUnLCAnbmFtZSc6ICdOaWdlcicgfSwgeyAnY29kZSc6ICdORicsICduYW1lJzogJ05vcmZvbGsgSXNsYW5kJyB9LCB7ICdjb2RlJzogJ05HJywgJ25hbWUnOiAnTmlnZXJpYScgfSwgeyAnY29kZSc6ICdOSScsICduYW1lJzogJ05pY2FyYWd1YScgfSwgeyAnY29kZSc6ICdOTCcsICduYW1lJzogJ05ldGhlcmxhbmRzJyB9LCB7ICdjb2RlJzogJ05PJywgJ25hbWUnOiAnTm9yd2F5JyB9LCB7ICdjb2RlJzogJ05QJywgJ25hbWUnOiAnTmVwYWwnIH0sIHsgJ2NvZGUnOiAnTlInLCAnbmFtZSc6ICdOYXVydScgfSwgeyAnY29kZSc6ICdOVScsICduYW1lJzogJ05pdWUnIH0sIHsgJ2NvZGUnOiAnTlonLCAnbmFtZSc6ICdOZXcgWmVhbGFuZCcgfSwgeyAnY29kZSc6ICdPTScsICduYW1lJzogJ09tYW4nIH0sIHsgJ2NvZGUnOiAnUEEnLCAnbmFtZSc6ICdQYW5hbWEnIH0sIHsgJ2NvZGUnOiAnUEUnLCAnbmFtZSc6ICdQZXJ1JyB9LCB7ICdjb2RlJzogJ1BGJywgJ25hbWUnOiAnRnJlbmNoIFBvbHluZXNpYScgfSwgeyAnY29kZSc6ICdQRycsICduYW1lJzogJ1BhcHVhIE5ldyBHdWluZWEnIH0sIHsgJ2NvZGUnOiAnUEgnLCAnbmFtZSc6ICdQaGlsaXBwaW5lcycgfSwgeyAnY29kZSc6ICdQSycsICduYW1lJzogJ1Bha2lzdGFuJyB9LCB7ICdjb2RlJzogJ1BMJywgJ25hbWUnOiAnUG9sYW5kJyB9LCB7ICdjb2RlJzogJ1BNJywgJ25hbWUnOiAnU2FpbnQgUGllcnJlIEFuZCBNaXF1ZWxvbicgfSwgeyAnY29kZSc6ICdQTicsICduYW1lJzogJ1BpdGNhaXJuJyB9LCB7ICdjb2RlJzogJ1BSJywgJ25hbWUnOiAnUHVlcnRvIFJpY28nIH0sIHsgJ2NvZGUnOiAnUFMnLCAnbmFtZSc6ICdQYWxlc3RpbmUnIH0sIHsgJ2NvZGUnOiAnUFQnLCAnbmFtZSc6ICdQb3J0dWdhbCcgfSwgeyAnY29kZSc6ICdQVycsICduYW1lJzogJ1BhbGF1JyB9LCB7ICdjb2RlJzogJ1BZJywgJ25hbWUnOiAnUGFyYWd1YXknIH0sIHsgJ2NvZGUnOiAnUUEnLCAnbmFtZSc6ICdRYXRhcicgfSwgeyAnY29kZSc6ICdSRScsICduYW1lJzogJ1JldW5pb24nIH0sIHsgJ2NvZGUnOiAnUk8nLCAnbmFtZSc6ICdSb21hbmlhJyB9LCB7ICdjb2RlJzogJ1JTJywgJ25hbWUnOiAnU2VyYmlhJyB9LCB7ICdjb2RlJzogJ1JVJywgJ25hbWUnOiAnUnVzc2lhJyB9LCB7ICdjb2RlJzogJ1JXJywgJ25hbWUnOiAnUndhbmRhJyB9LCB7ICdjb2RlJzogJ1NBJywgJ25hbWUnOiAnU2F1ZGkgQXJhYmlhJyB9LCB7ICdjb2RlJzogJ1NCJywgJ25hbWUnOiAnU29sb21vbiBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1NDJywgJ25hbWUnOiAnU2V5Y2hlbGxlcycgfSwgeyAnY29kZSc6ICdTRCcsICduYW1lJzogJ1N1ZGFuJyB9LCB7ICdjb2RlJzogJ1NFJywgJ25hbWUnOiAnU3dlZGVuJyB9LCB7ICdjb2RlJzogJ1NHJywgJ25hbWUnOiAnU2luZ2Fwb3JlJyB9LCB7ICdjb2RlJzogJ1NIJywgJ25hbWUnOiAnU2FpbnQgSGVsZW5hJyB9LCB7ICdjb2RlJzogJ1NJJywgJ25hbWUnOiAnU2xvdmVuaWEnIH0sIHsgJ2NvZGUnOiAnU0onLCAnbmFtZSc6ICdTdmFsYmFyZCBBbmQgSmFuIE1heWVuJyB9LCB7ICdjb2RlJzogJ1NLJywgJ25hbWUnOiAnU2xvdmFraWEnIH0sIHsgJ2NvZGUnOiAnU0wnLCAnbmFtZSc6ICdTaWVycmEgTGVvbmUnIH0sIHsgJ2NvZGUnOiAnU00nLCAnbmFtZSc6ICdTYW4gTWFyaW5vJyB9LCB7ICdjb2RlJzogJ1NOJywgJ25hbWUnOiAnU2VuZWdhbCcgfSwgeyAnY29kZSc6ICdTTycsICduYW1lJzogJ1NvbWFsaWEnIH0sIHsgJ2NvZGUnOiAnU1InLCAnbmFtZSc6ICdTdXJpbmFtZScgfSwgeyAnY29kZSc6ICdTUycsICduYW1lJzogJ1NvdXRoIFN1ZGFuJyB9LCB7ICdjb2RlJzogJ1NUJywgJ25hbWUnOiAnU2FvIFRvbWUgQW5kIFByaW5jaXBlJyB9LCB7ICdjb2RlJzogJ1NWJywgJ25hbWUnOiAnRWwgU2FsdmFkb3InIH0sIHsgJ2NvZGUnOiAnU1gnLCAnbmFtZSc6ICdTaW50IE1hYXJ0ZW4gKER1dGNoIHBhcnQpJyB9LCB7ICdjb2RlJzogJ1NZJywgJ25hbWUnOiAnU3lyaWEnIH0sIHsgJ2NvZGUnOiAnU1onLCAnbmFtZSc6ICdTd2F6aWxhbmQnIH0sIHsgJ2NvZGUnOiAnVEMnLCAnbmFtZSc6ICdUdXJrcyBBbmQgQ2FpY29zIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnVEQnLCAnbmFtZSc6ICdDaGFkJyB9LCB7ICdjb2RlJzogJ1RGJywgJ25hbWUnOiAnRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzJyB9LCB7ICdjb2RlJzogJ1RHJywgJ25hbWUnOiAnVG9nbycgfSwgeyAnY29kZSc6ICdUSCcsICduYW1lJzogJ1RoYWlsYW5kJyB9LCB7ICdjb2RlJzogJ1RKJywgJ25hbWUnOiAnVGFqaWtpc3RhbicgfSwgeyAnY29kZSc6ICdUSycsICduYW1lJzogJ1Rva2VsYXUnIH0sIHsgJ2NvZGUnOiAnVEwnLCAnbmFtZSc6ICdUaW1vci1MZXN0ZScgfSwgeyAnY29kZSc6ICdUTScsICduYW1lJzogJ1R1cmttZW5pc3RhbicgfSwgeyAnY29kZSc6ICdUTicsICduYW1lJzogJ1R1bmlzaWEnIH0sIHsgJ2NvZGUnOiAnVE8nLCAnbmFtZSc6ICdUb25nYScgfSwgeyAnY29kZSc6ICdUUicsICduYW1lJzogJ1R1cmtleScgfSwgeyAnY29kZSc6ICdUVCcsICduYW1lJzogJ1RyaW5pZGFkIGFuZCBUb2JhZ28nIH0sIHsgJ2NvZGUnOiAnVFYnLCAnbmFtZSc6ICdUdXZhbHUnIH0sIHsgJ2NvZGUnOiAnVFcnLCAnbmFtZSc6ICdUYWl3YW4nIH0sIHsgJ2NvZGUnOiAnVFonLCAnbmFtZSc6ICdUYW56YW5pYScgfSwgeyAnY29kZSc6ICdVQScsICduYW1lJzogJ1VrcmFpbmUnIH0sIHsgJ2NvZGUnOiAnVUcnLCAnbmFtZSc6ICdVZ2FuZGEnIH0sIHsgJ2NvZGUnOiAnVU0nLCAnbmFtZSc6ICdVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnVVknLCAnbmFtZSc6ICdVcnVndWF5JyB9LCB7ICdjb2RlJzogJ1VaJywgJ25hbWUnOiAnVXpiZWtpc3RhbicgfSwgeyAnY29kZSc6ICdWQScsICduYW1lJzogJ1ZhdGljYW4nIH0sIHsgJ2NvZGUnOiAnVkMnLCAnbmFtZSc6ICdTYWludCBWaW5jZW50IEFuZCBUaGUgR3JlbmFkaW5lcycgfSwgeyAnY29kZSc6ICdWRScsICduYW1lJzogJ1ZlbmV6dWVsYScgfSwgeyAnY29kZSc6ICdWRycsICduYW1lJzogJ0JyaXRpc2ggVmlyZ2luIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnVkknLCAnbmFtZSc6ICdVLlMuIFZpcmdpbiBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1ZOJywgJ25hbWUnOiAnVmlldG5hbScgfSwgeyAnY29kZSc6ICdWVScsICduYW1lJzogJ1ZhbnVhdHUnIH0sIHsgJ2NvZGUnOiAnV0YnLCAnbmFtZSc6ICdXYWxsaXMgQW5kIEZ1dHVuYScgfSwgeyAnY29kZSc6ICdXUycsICduYW1lJzogJ1NhbW9hJyB9LCB7ICdjb2RlJzogJ1lFJywgJ25hbWUnOiAnWWVtZW4nIH0sIHsgJ2NvZGUnOiAnWVQnLCAnbmFtZSc6ICdNYXlvdHRlJyB9LCB7ICdjb2RlJzogJ1pBJywgJ25hbWUnOiAnU291dGggQWZyaWNhJyB9LCB7ICdjb2RlJzogJ1pNJywgJ25hbWUnOiAnWmFtYmlhJyB9LCB7ICdjb2RlJzogJ1pXJywgJ25hbWUnOiAnWmltYmFid2UnIH1dO1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlQ291bnRyeUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLWNvdW50cnkuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlQ291bnRyeUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ291bnRyeU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBCQVNFX0VORFBPSU5UID0gJ2NvbXBhbmllcy8ke2NvbXBhbnlJZH0vZGVwYXJ0bWVudHMvb3B0aW9ucyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0RFUEFSVE1FTlRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJlbmRwb2ludCBlbHNlIGZha2VEaXNhYmxlZFwiPlxuICA8ZGVjLWF1dG9jb21wbGV0ZVxuICBbZGlzYWJsZWRdPVwiIWNvbXBhbnlJZCB8fCBkaXNhYmxlZFwiXG4gIFtlbmRwb2ludF09XCJlbmRwb2ludFwiXG4gIFtsYWJlbEF0dHJdPVwibGFiZWxBdHRyXCJcbiAgW25hbWVdPVwibmFtZVwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIChvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuICAoYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2Zha2VEaXNhYmxlZD5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbZGlzYWJsZWRdPVwidHJ1ZVwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCI+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfREVQQVJUTUVOVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgbGFiZWxBdHRyID0gJ3ZhbHVlJztcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgY29tcGFueUlkKHY6IHN0cmluZykge1xuICAgIHRoaXMuX2NvbXBhbnlJZCA9IHY7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbmNvbXBhbnlJZCgpO1xuICB9XG5cbiAgZ2V0IGNvbXBhbnlJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGFueUlkO1xuICB9XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdEZXBhcnRtZW50IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnRGVwYXJ0bWVudCBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF9jb21wYW55SWQ6IHN0cmluZztcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXRFbmRwb2ludEJhc2VkT25jb21wYW55SWQoKSB7XG4gICAgdGhpcy5lbmRwb2ludCA9ICF0aGlzLmNvbXBhbnlJZCA/IHVuZGVmaW5lZCA6IEJBU0VfRU5EUE9JTlQucmVwbGFjZSgnJHtjb21wYW55SWR9JywgdGhpcy5jb21wYW55SWQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1kZXBhcnRtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuY29uc3QgQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZVJvbGVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1yb2xlJyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWF1dG9jb21wbGV0ZVxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bbmFtZV09XCJuYW1lXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbltsYWJlbEF0dHJdPVwibGFiZWxBdHRyXCJcblt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbihibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVJvbGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgZW5kcG9pbnQgPSAncm9sZXMvb3B0aW9ucyc7XG5cbiAgbGFiZWxBdHRyID0gJ3ZhbHVlJztcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKSB0eXBlczogc3RyaW5nW107XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdSb2xlIGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnUm9sZSBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZVxuICApIHt9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIC8vIGN1c3RvbUZldGNoRnVuY3Rpb24gPSAodGV4dFNlYXJjaCk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gIC8vICAgY29uc3Qgc2VhcmNoID0gdGV4dFNlYXJjaCA/IHsgdGV4dFNlYXJjaCB9IDogdW5kZWZpbmVkO1xuICAvLyAgIHJldHVybiB0aGlzLmRlY29yYUFwaS5nZXQodGhpcy5lbmRwb2ludCwgc2VhcmNoKVxuICAvLyAgIC5waXBlKFxuICAvLyAgICAgbWFwKHJvbGVzID0+IHtcbiAgLy8gICAgICAgcmV0dXJuIHJvbGVzLmZpbHRlcihyb2xlID0+IHtcbiAgLy8gICAgICAgICBjb25zdCByb2xlVHlwZSA9IChyb2xlICYmIHJvbGUua2V5KSA/IHJvbGUua2V5LnNwbGl0KCcuJylbMF0gOiB1bmRlZmluZWQ7XG4gIC8vICAgICAgICAgcmV0dXJuICF0aGlzLnR5cGVzID8gdHJ1ZSA6IHRoaXMudHlwZXMuaW5kZXhPZihyb2xlVHlwZSkgPj0gMDtcbiAgLy8gICAgICAgfSk7XG4gIC8vICAgICB9KVxuICAvLyAgICk7XG4gIC8vIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLXJvbGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVSb2xlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY29uc3QgQkFTRV9BVVRPQ09NUExFVEVfUFJPSkVDVF9FTkRQT0lOVCA9ICcvbGVnYWN5L3Byb2plY3Qvc2VhcmNoL2tleVZhbHVlJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfUFJPSkVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtcHJvamVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIihlbmRwb2ludCAmJiBjb21wYW55SWQpIGVsc2UgZmFrZURpc2FibGVkXCI+XG4gIDxkZWMtYXV0b2NvbXBsZXRlXG4gICNhdXRvY29tcGxldGVcbiAgW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbiAgW2xhYmVsRm5dPVwibGFiZWxGblwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICBbdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4gIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICBbY3VzdG9tRmV0Y2hGdW5jdGlvbl09XCJjdXN0b21GZXRjaEZ1bmN0aW9uXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4gIChibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZmFrZURpc2FibGVkPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9QUk9KRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgZW5kcG9pbnQ7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbXBhbnlJZCh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fY29tcGFueUlkICE9PSB2KSB7XG4gICAgICB0aGlzLl9jb21wYW55SWQgPSB2O1xuICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZW5kcG9pbnQgPSB1bmRlZmluZWQ7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gZW5zdXJlcyBhIGRpZ2VzdCBjaWNsZSBiZWZvcmUgcmVzZXRpbmcgdGhlIGVuZHBvaW50XG4gICAgICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uQ29tcGFueUlkKCk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICBnZXQgY29tcGFueUlkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wYW55SWQ7XG4gIH1cblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1Byb2plY3QgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdQcm9qZWN0IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX2NvbXBhbnlJZDogc3RyaW5nO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlKSB7IH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICBsYWJlbEZuKGNvbXBhbnkpIHtcbiAgICByZXR1cm4gYCR7Y29tcGFueS52YWx1ZX0gIyR7Y29tcGFueS5rZXl9YDtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldEVuZHBvaW50QmFzZWRPbkNvbXBhbnlJZCgpIHtcbiAgICBpZiAodGhpcy5jb21wYW55SWQpIHtcbiAgICAgIHRoaXMuZW5kcG9pbnQgPSBCQVNFX0FVVE9DT01QTEVURV9QUk9KRUNUX0VORFBPSU5UICsgJz9jb21wYW55SWQ9JyArIHRoaXMuY29tcGFueUlkO1xuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBjdXN0b21GZXRjaEZ1bmN0aW9uID0gKHRleHRTZWFyY2gpOiBPYnNlcnZhYmxlPGFueT4gPT4ge1xuICAgIGNvbnN0IHBhcmFtczogYW55ID0ge307XG4gICAgcGFyYW1zLnRleHRTZWFyY2ggPSB0ZXh0U2VhcmNoO1xuICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uQ29tcGFueUlkKCk7XG4gICAgcmV0dXJuIHRoaXMuZGVjb3JhQXBpLmdldCh0aGlzLmVuZHBvaW50LCBwYXJhbXMpXG4gICAgLnBpcGUoXG4gICAgICBtYXAocHJvamVjdHMgPT4ge1xuICAgICAgICByZXR1cm4gcHJvamVjdHM7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLXByb2plY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUHJvamVjdE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfUVVPVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1xdW90ZScsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImVuZHBvaW50IGVsc2UgZmFrZURpc2FibGVkXCI+XG4gIDxkZWMtYXV0b2NvbXBsZXRlXG4gIFtkaXNhYmxlZF09XCIhcHJvamVjdElkIHx8IGRpc2FibGVkXCJcbiAgW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbiAgW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuICBbbmFtZV09XCJuYW1lXCJcbiAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuICBbKG5nTW9kZWwpXT1cInZhbHVlXCJcbiAgW2N1c3RvbUZldGNoRnVuY3Rpb25dPVwiY3VzdG9tRmV0Y2hGdW5jdGlvblwiXG4gIChvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuICAoYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2Zha2VEaXNhYmxlZD5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbZGlzYWJsZWRdPVwidHJ1ZVwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCI+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUVVPVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgQkFTRV9FTkRQT0lOVCA9ICcvbGVnYWN5L3Byb2plY3QvJHtwcm9qZWN0SWR9L3F1b3RlJztcblxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KClcbiAgc2V0IHByb2plY3RJZCh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wcm9qZWN0SWQgPSB2O1xuICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25Qcm9qZWN0SWQoKTtcbiAgfVxuXG4gIGdldCBwcm9qZWN0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb2plY3RJZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUXVvdGUgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdRdW90ZSBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF9wcm9qZWN0SWQ6IHN0cmluZztcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSkgeyB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHNldEVuZHBvaW50QmFzZWRPblByb2plY3RJZCgpIHtcbiAgICB0aGlzLmVuZHBvaW50ID0gIXRoaXMucHJvamVjdElkID8gdW5kZWZpbmVkIDogdGhpcy5CQVNFX0VORFBPSU5ULnJlcGxhY2UoJyR7cHJvamVjdElkfScsIHRoaXMucHJvamVjdElkKTtcbiAgfVxuXG4gIGN1c3RvbUZldGNoRnVuY3Rpb24gPSAodGV4dFNlYXJjaCk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBwYXJhbXMudGV4dFNlYXJjaCA9IHRleHRTZWFyY2g7XG4gICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25Qcm9qZWN0SWQoKTtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkuZ2V0KHRoaXMuZW5kcG9pbnQsIHBhcmFtcylcbiAgICAucGlwZShcbiAgICAgIG1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgIHJlc3BvbnNlID0gcmVzcG9uc2UubWFwKHF1b3RlcyA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleTogcXVvdGVzLmlkLFxuICAgICAgICAgICAgdmFsdWU6IHF1b3Rlcy5wcm9kdWN0VmFyaWFudElkXG4gICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1xdW90ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0F1dG9jb21wbGV0ZVF1b3RlQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVF1b3RlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtdGFncycsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbltuYW1lXT1cIm5hbWVcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuKGVudGVyQnV0dG9uKT1cImVudGVyQnV0dG9uLmVtaXQoJGV2ZW50KVwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcbltsYWJlbEF0dHJdPVwibGFiZWxBdHRyXCJcblt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbihibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVUYWdzQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBJbnB1dCgpXG4gIHNldCBlbmRwb2ludCh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX2VuZHBvaW50ID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgZW5kcG9pbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZHBvaW50O1xuICB9XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgbGFiZWxBdHRyID0gJ3ZhbHVlJztcblxuICBfZW5kcG9pbnQ6IHN0cmluZztcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1RhZ3MgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdUYWdzIGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBlbnRlckJ1dHRvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbih0YWdzKSB7XG4gICAgcmV0dXJuIGAke3RhZ3MudmFsdWV9ICMke3RhZ3Mua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEF1dG9jb21wbGV0ZVRhZ3NDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS10YWdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBdXRvY29tcGxldGVUYWdzQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBdXRvY29tcGxldGVUYWdzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlVGFnc01vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWJyZWFkY3J1bWInLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cImRlYy1icmVhZGNydW1iLXdyYXBwZXJcIj5cblxuICA8ZGl2IGZ4RmxleD5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgPGgxPnt7ZmVhdHVyZX19PC9oMT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImJyZWFkY3J1bWJcIj5cbiAgICAgICAge3ticmVhZGNydW1ifX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGZ4RmxleCBmeEZsZXhBbGlnbj1cImNlbnRlclwiIGZ4TGF5b3V0QWxpZ249XCJlbmRcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCI+XG4gICAgICA8ZGl2IGZ4RmxleD5cbiAgICAgICAgPCEtLSBDT05URU5UICAtLT5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8IS0tIEJBQ0sgQlVUVE9OIC0tPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cImRlZmF1bHRcIiAqbmdJZj1cImJhY2tCdXR0b25QYXRoXCIgKGNsaWNrKT1cImdvQmFjaygpXCI+e3sgYmFja0xhYmVsIH19PC9idXR0b24+XG4gICAgICAgIDwhLS0gRk9SV0FSRCBCVVRUT04gLS0+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwiZGVmYXVsdFwiICpuZ0lmPVwiZm9yd2FyZEJ1dHRvblwiIChjbGljayk9XCJnb0ZvcndhcmQoKVwiPnt7IGZvcndhcmRMYWJlbCB9fTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLWJyZWFkY3J1bWItd3JhcHBlcnttYXJnaW4tYm90dG9tOjMycHh9LmRlYy1icmVhZGNydW1iLXdyYXBwZXIgaDF7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi10b3A6NHB4O21hcmdpbi1ib3R0b206NHB4fS5kZWMtYnJlYWRjcnVtYi13cmFwcGVyIC5icmVhZGNydW1ie2NvbG9yOiNhOGE4YTh9YF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0JyZWFkY3J1bWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGJhY2tCdXR0b25QYXRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJyZWFkY3J1bWI6IHN0cmluZztcbiAgQElucHV0KCkgZmVhdHVyZTogc3RyaW5nO1xuICBASW5wdXQoKSBmb3J3YXJkQnV0dG9uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGkxOG5GZWF0dXJlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGkxOG5CcmVhZGNydW1iOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgYmFja0xhYmVsID0gJ0JhY2snO1xuICBASW5wdXQoKSBmb3J3YXJkTGFiZWwgPSAnRm9yd2FyZCc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSB0cmFuc2xhdG9yOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRyYW5zbGF0ZUZlYXR1cmUoKTtcbiAgICB0aGlzLnRyYW5zbGF0ZVBhdGhzKCk7XG4gICAgdGhpcy5kZXRlY3RBbmRQYXJzZUJ1dHRvbnNDb25maWcoKTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0QW5kUGFyc2VCdXR0b25zQ29uZmlnKCkge1xuICAgIHRoaXMucGFyc2VCYWNrQnV0dG9uKCk7XG4gICAgdGhpcy5wYXJzZUZvcndhcmRCdXR0b24oKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VCYWNrQnV0dG9uKCkge1xuICAgIGlmICh0aGlzLmJhY2tCdXR0b25QYXRoICE9PSB1bmRlZmluZWQgJiYgdGhpcy5iYWNrQnV0dG9uUGF0aCAhPT0gJ2ZhbHNlJykge1xuICAgICAgdGhpcy5iYWNrQnV0dG9uUGF0aCA9IHRoaXMuYmFja0J1dHRvblBhdGggPyB0aGlzLmJhY2tCdXR0b25QYXRoIDogJy8nO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VGb3J3YXJkQnV0dG9uKCkge1xuICAgIGlmICh0aGlzLmZvcndhcmRCdXR0b24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmZvcndhcmRCdXR0b24gIT09ICdmYWxzZScpIHtcbiAgICAgIHRoaXMuZm9yd2FyZEJ1dHRvbiA9IHRoaXMuZm9yd2FyZEJ1dHRvbiA/IHRoaXMuZm9yd2FyZEJ1dHRvbiA6ICcvJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyYW5zbGF0ZUZlYXR1cmUoKSB7XG4gICAgaWYgKHRoaXMuaTE4bkJyZWFkY3J1bWIpIHtcbiAgICAgIHRoaXMuYnJlYWRjcnVtYiA9IHRoaXMuaTE4bkJyZWFkY3J1bWIubWFwKHBhdGggPT4gdGhpcy50cmFuc2xhdG9yLmluc3RhbnQocGF0aCkpLmpvaW4oJyAvICcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNsYXRlUGF0aHMoKSB7XG4gICAgaWYgKHRoaXMuaTE4bkZlYXR1cmUpIHtcbiAgICAgIHRoaXMuZmVhdHVyZSA9IHRoaXMudHJhbnNsYXRvci5pbnN0YW50KHRoaXMuaTE4bkZlYXR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBOYXZpZ2F0aW9uIE1ldGhvZHMgLy9cbiAgLy8gKioqKioqKioqKioqKioqKioqIC8vXG5cbiAgcHVibGljIGdvQmFjaygpIHtcbiAgICBpZiAodGhpcy5iYWNrQnV0dG9uUGF0aCkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuYmFja0J1dHRvblBhdGhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnb0ZvcndhcmQoKSB7XG4gICAgaWYgKHRoaXMuZm9yd2FyZEJ1dHRvbikge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuZm9yd2FyZEJ1dHRvbl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5mb3J3YXJkKCk7XG4gICAgfVxuICB9XG59XG4iLCIvLyBBbmd1bGFyIG1vZHVsZXNcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi9icmVhZGNydW1iLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNCcmVhZGNydW1iQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNCcmVhZGNydW1iQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQnJlYWRjcnVtYk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBPbkluaXQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRGlhbG9nQWN0aW9uIH0gZnJvbSAnLi9kZWMtZGlhbG9nLm1vZGVscyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1kaWFsb2cnLFxuICB0ZW1wbGF0ZTogYDxtYXQtdG9vbGJhciBjb2xvcj1cInByaW1hcnlcIj5cblxuICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhGbGV4RmlsbCBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cInVwcGVyY2FzZVwiIG1hdC1kaWFsb2ctY2xvc2U+XG4gICAgICAgIDxtYXQtaWNvbj5hcnJvd19iYWNrPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8aDE+Jm5ic3A7IHt7IHRpdGxlIH19PC9oMT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGZ4RmxleD5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiYWN0aW9uc1wiPlxuICAgICAgICAgIDxtYXQtbWVudSAjZGVjRGlhbG9nQWN0aW9uc01lbnU9XCJtYXRNZW51XCI+XG4gICAgICAgICAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgYWN0aW9uc1wiIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImFjdGlvbi5jYWxsYmFjayhjb250ZXh0KVwiPlxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjdGlvbi5sYWJlbFwiPnt7IGFjdGlvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaTE4bkxhYmVsXCI+e3sgYWN0aW9uLmkxOG5MYWJlbCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvbWF0LW1lbnU+XG5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwiZGVjRGlhbG9nQWN0aW9uc01lbnVcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5tb3JlX3ZlcnQ8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9tYXQtdG9vbGJhcj5cblxuPGRpdiBjbGFzcz1cImRlYy1kaWFsb2ctY2hpbGQtd3JhcHBlclwiPlxuICA8dGVtcGxhdGUgI2NoaWxkQ29udGFpbmVyPjwvdGVtcGxhdGU+XG48L2Rpdj5cblxuPGRlYy1zcGlubmVyICpuZ0lmPVwiIWxvYWRlZFwiPjwvZGVjLXNwaW5uZXI+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1kaWFsb2ctY2hpbGQtd3JhcHBlcntwYWRkaW5nOjMycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvLyBDVVJSRU5UXG4gIGNoaWxkQ29tcG9uZW50VHlwZTogQ29tcG9uZW50VHlwZTxhbnk+O1xuXG4gIGNoaWxkQ29tcG9uZW50SW5zdGFuY2U6IGFueTtcblxuICBhY3Rpb25zOiBEaWFsb2dBY3Rpb25bXSA9IFtdO1xuXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgY29udGV4dDogYW55ID0ge307XG5cbiAgbG9hZGVkOiBib29sZWFuO1xuXG4gIEBWaWV3Q2hpbGQoJ2NoaWxkQ29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIGNoaWxkQ29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIEBPdXRwdXQoKSBjaGlsZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmFjdG9yOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEZWNEaWFsb2dDb21wb25lbnQ+XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyT3BlbigpXG4gICAgLnRvUHJvbWlzZSgpXG4gICAgLnRoZW4odGhpcy5mYWN0b3J5VGhlQ29tcG9uZW50KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBmYWN0b3J5VGhlQ29tcG9uZW50ID0gKCkgPT4ge1xuXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxhbnk+ID0gdGhpcy5mYWN0b3IucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5jaGlsZENvbXBvbmVudFR5cGUpO1xuXG4gICAgY29uc3QgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMuY2hpbGRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgdGhpcy5jaGlsZENvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXG4gICAgdGhpcy5jaGlsZC5lbWl0KHRoaXMuY2hpbGRDb21wb25lbnRJbnN0YW5jZSk7XG5cbiAgICB0aGlzLmNoaWxkLmNvbXBsZXRlKCk7IC8vIHVuc3Vic3JpYmUgc3Vic2NyaWJlcnNcblxuICAgIHRoaXMuYXBwZW5kQ29udGV4dFRvSW5zdGFuY2UoY29tcG9uZW50UmVmLmluc3RhbmNlLCB0aGlzLmNvbnRleHQpO1xuXG4gICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuXG4gIH1cblxuICBwcml2YXRlIGFwcGVuZENvbnRleHRUb0luc3RhbmNlKGluc3RhbmNlOiBhbnksIGNvbnRleHQ6IGFueSkge1xuXG4gICAgaWYgKGluc3RhbmNlICYmIGNvbnRleHQpIHtcblxuICAgICAgT2JqZWN0LmtleXMoY29udGV4dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cbiAgICAgICAgaW5zdGFuY2Vba2V5XSA9IHRoaXMuY29udGV4dFtrZXldO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zcGlubmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGVjb3JhLWxvYWRpbmctc3Bpbm5lci13cmFwcGVyXCI+XG4gIDxkaXYgY2xhc3M9XCJkZWNvcmEtbG9hZGluZy1zcGlubmVyIHRyYW5zcGFyZW50QmdcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlubmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FwXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGFsZi1jaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoYWxmLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2AuZGVjb3JhLWxvYWRpbmctc3Bpbm5lci13cmFwcGVye3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTcGlubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNwaW5uZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNTcGlubmVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY1NwaW5uZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NwaW5uZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERlY0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vZGVjLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3BlbkNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2RlYy1kaWFsb2cubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2dcbiAgKSB7IH1cblxuXG4gIG9wZW4oY2hpbGRDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8YW55PiwgY29uZmlnOiBPcGVuQ29uZmlndXJhdGlvbikge1xuXG4gICAgY29uc3QgZGlhbG9nSW5zdGFuY2U6IE1hdERpYWxvZ1JlZjxhbnk+ID0gdGhpcy5kaWFsb2cub3BlbihcbiAgICAgIERlY0RpYWxvZ0NvbXBvbmVudCxcbiAgICAgIHtcbiAgICAgICAgd2lkdGg6IGNvbmZpZy53aWR0aCB8fCAnMTAwdncnLFxuICAgICAgICBoZWlnaHQ6IGNvbmZpZy5oZWlndGggfHwgJzEwMHZoJyxcbiAgICAgICAgcGFuZWxDbGFzczogJ2Z1bGwtc2NyZWVuLWRpYWxvZydcbiAgICAgIH1cbiAgICApO1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UuY2hpbGRDb21wb25lbnRUeXBlID0gY2hpbGRDb21wb25lbnQ7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS5hY3Rpb25zID0gY29uZmlnLmFjdGlvbnM7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9IGNvbmZpZy50aXRsZTtcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLmNvbnRleHQgPSBjb25maWcuY29udGV4dDtcblxuICAgIHJldHVybiBkaWFsb2dJbnN0YW5jZTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLXNwaW5uZXIvZGVjLXNwaW5uZXIubW9kdWxlJztcblxuaW1wb3J0IHsgRGVjRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtZGlhbG9nLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBEZWNTcGlubmVyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjRGlhbG9nQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbRGVjRGlhbG9nQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbRGVjRGlhbG9nU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ01vZHVsZSB7IH1cbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaGVpa2FsdGhhZi9uZ3UtY2Fyb3VzZWwjaW5wdXQtaW50ZXJmYWNlXG5cbmV4cG9ydCBjb25zdCBDYXJvdXNlbENvbmZpZyA9IHtcbiAgZ3JpZDogeyB4czogMSwgc206IDIsIG1kOiAzLCBsZzogNCwgYWxsOiAwIH0sXG4gIHNsaWRlOiAxLFxuICBzcGVlZDogNDAwLFxuICBpbnRlcnZhbDogNDAwMCxcbiAgcG9pbnQ6IHtcbiAgICB2aXNpYmxlOiBmYWxzZVxuICB9LFxuICBjdXN0b206ICdiYW5uZXInXG59O1xuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxDb25maWcgfSBmcm9tICcuL2Nhcm91c2VsLWNvbmZpZyc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbFN0b3JlIH0gZnJvbSAnQG5ndS9jYXJvdXNlbC9zcmMvbmd1LWNhcm91c2VsL25ndS1jYXJvdXNlbC5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZ2FsbGVyeScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1nYWxsZXJ5LXdyYXBwZXJcIj5cblxuICA8ZGl2IGNsYXNzPVwiaW1hZ2UtaGlnaGxpZ2h0ZWRcIj5cbiAgICAgIDxkZWMtem9vbS1pbWFnZS12aWV3IFxuICAgICAgICBbdGh1bWJJbWFnZVNpemVdPVwie3dpZHRoOiA2MjAsIGhlaWdodDogNjIwfVwiXG4gICAgICAgIFtkZWNJbWFnZV09XCJpbWFnZUhpZ2hsaWdodFwiPlxuICAgICAgPC9kZWMtem9vbS1pbWFnZS12aWV3PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodFwiICpuZ0lmPVwiaW1nRXh0ZXJuYWxMaW5rXCI+XG5cbiAgICA8YSBocmVmPVwie3sgaW1nRXh0ZXJuYWxMaW5rIH19XCIgdGFyZ2V0PVwiX2JsYW5rXCI+e3sgJ2xhYmVsLmltYWdlLWxpbmsnIHwgdHJhbnNsYXRlIH19PC9hPlxuXG4gIDwvZGl2PlxuXG4gIDxuZ3UtY2Fyb3VzZWwgY2xhc3M9XCJjYXJvdXNlbC13cmFwcGVyXCIgW2lucHV0c109XCJjYXJvdXNlbENvbmZpZ1wiIChpbml0RGF0YSk9XCJvbkluaXREYXRhRm4oJGV2ZW50KVwiIChvbk1vdmUpPVwib25Nb3ZlRm4oJGV2ZW50KVwiPlxuXG4gICAgPG5ndS1pdGVtIE5ndUNhcm91c2VsSXRlbSAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgaW1hZ2VzXCIgW2NsYXNzLmFjdGl2ZV09XCJpbWFnZSA9PSBpbWFnZUhpZ2hsaWdodFwiPlxuXG4gICAgICA8aW1nIFtkZWNJbWFnZV09XCJpbWFnZVwiIFtkZWNJbWFnZVNpemVdPVwie3dpZHRoOjMwMCwgaGVpZ2h0OjMwMH1cIiAoY2xpY2spPVwib25TZWxlY3RJbWFnZSgkZXZlbnQsaW1hZ2UpXCI+XG5cbiAgICA8L25ndS1pdGVtPlxuXG4gICAgPG1hdC1pY29uIE5ndUNhcm91c2VsUHJldiBjbGFzcz1cImxlZnQtcHJldmlvdXNcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXNGaXJzdH1cIj5jaGV2cm9uX2xlZnQ8L21hdC1pY29uPlxuXG4gICAgPG1hdC1pY29uIE5ndUNhcm91c2VsTmV4dCBjbGFzcz1cInJpZ2h0LW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXNMYXN0fVwiPmNoZXZyb25fcmlnaHQ8L21hdC1pY29uPlxuXG4gIDwvbmd1LWNhcm91c2VsPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLWdhbGxlcnktd3JhcHBlcnttYXgtd2lkdGg6NjI0cHg7b3ZlcmZsb3c6aGlkZGVufS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5pbWFnZS1oaWdobGlnaHRlZHtib3JkZXI6MnB4IHNvbGlkICNmNWY1ZjU7d2lkdGg6NjIwcHg7aGVpZ2h0OjYyMHB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIGF7Zm9udC1zaXplOjEwcHg7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y29sb3I6IzkyOTI5MjtjdXJzb3I6cG9pbnRlcn0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlcnttYXJnaW4tdG9wOjhweDtwYWRkaW5nOjAgMjRweDtoZWlnaHQ6MTI4cHh9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW17ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2hlaWdodDoxMjRweDtwYWRkaW5nOjJweDttYXJnaW4tcmlnaHQ6MnB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtLmFjdGl2ZSwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbTpob3ZlcntwYWRkaW5nOjA7Ym9yZGVyOjJweCBzb2xpZCAjMjMyZTM4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtIGltZ3ttYXgtd2lkdGg6MTI0cHg7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHR7ZGlzcGxheTpibG9jayFpbXBvcnRhbnQ7cG9zaXRpb246YWJzb2x1dGU7dG9wOmNhbGMoNTAlIC0gMTJweCk7Y3Vyc29yOnBvaW50ZXI7dGV4dC1zaGFkb3c6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXM6aG92ZXIsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQ6aG92ZXJ7dGV4dC1zaGFkb3c6MCAwIDZweCByZ2JhKDAsMCwwLC4yKX0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cy5kaXNhYmxlZCwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dC5kaXNhYmxlZHtvcGFjaXR5Oi40fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLmRpc2FibGVkOmhvdmVyLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0LmRpc2FibGVkOmhvdmVye3RleHQtc2hhZG93Om5vbmV9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXN7bGVmdDowfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0e3JpZ2h0OjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjR2FsbGVyeUNvbXBvbmVudCB7XG5cbiAgaW1hZ2VIaWdobGlnaHQ6IGFueTtcblxuICBhY3RpdmVJbWFnZTogRWxlbWVudDtcblxuICBpbWdFeHRlcm5hbExpbms6IHN0cmluZztcblxuICBpc0ZpcnN0OiBib29sZWFuO1xuXG4gIGlzTGFzdDogYm9vbGVhbjtcblxuICBjYXJvdXNlbENvbmZpZyA9IENhcm91c2VsQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBpbWFnZXModmFsdWU6IGFueVtdKSB7XG5cbiAgICB2YWx1ZSA9IHZhbHVlIHx8IG5ldyBBcnJheTxhbnk+KCk7XG5cbiAgICBpZiAodmFsdWUgJiYgKEpTT04uc3RyaW5naWZ5KHZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5faW1hZ2VzKSkpIHtcblxuICAgICAgdGhpcy5pbWFnZUhpZ2hsaWdodCA9IHZhbHVlWzBdO1xuXG4gICAgICB0aGlzLl9pbWFnZXMgPSB2YWx1ZTtcblxuICAgICAgdGhpcy5zZXRFeHRlcm5hbExpbmsoKTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGltYWdlcygpOiBhbnlbXSB7XG5cbiAgICByZXR1cm4gdGhpcy5faW1hZ2VzO1xuXG4gIH1cblxuICBwcml2YXRlIF9pbWFnZXM6IGFueVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBvblNlbGVjdEltYWdlID0gKCRldmVudCwgc3lzRmlsZSkgPT4ge1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlSW1hZ2UgJiYgdGhpcy5hY3RpdmVJbWFnZSAhPT0gJGV2ZW50LnRhcmdldCkge1xuXG4gICAgICB0aGlzLmFjdGl2ZUltYWdlLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgfVxuXG4gICAgJGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPSAnYWN0aXZlJztcblxuICAgIHRoaXMuYWN0aXZlSW1hZ2UgPSAkZXZlbnQudGFyZ2V0O1xuXG4gICAgdGhpcy5pbWFnZUhpZ2hsaWdodCA9IHN5c0ZpbGU7XG5cbiAgICB0aGlzLnNldEV4dGVybmFsTGluaygpO1xuXG4gIH1cblxuICBzZXRFeHRlcm5hbExpbmsgPSAoKSA9PiB7XG5cbiAgICBpZiAodGhpcy5pbWFnZUhpZ2hsaWdodCkge1xuXG4gICAgICB0aGlzLmltZ0V4dGVybmFsTGluayA9IHRoaXMuaW1hZ2VIaWdobGlnaHQuZmlsZVVybDtcblxuICAgIH1cblxuICB9XG5cbiAgb25Jbml0RGF0YUZuKGV2ZW50OiBOZ3VDYXJvdXNlbFN0b3JlKSB7XG5cbiAgICB0aGlzLnNldFByZXZOZXh0Q2hlY2tlcnMoZXZlbnQuaXNGaXJzdCwgZXZlbnQuaXRlbXMgPj0gdGhpcy5pbWFnZXMubGVuZ3RoKTtcblxuICB9XG5cbiAgb25Nb3ZlRm4oZXZlbnQ6IE5ndUNhcm91c2VsU3RvcmUpIHtcblxuICAgIHRoaXMuc2V0UHJldk5leHRDaGVja2VycyhldmVudC5pc0ZpcnN0LCBldmVudC5pc0xhc3QpO1xuXG4gIH1cblxuICBzZXRQcmV2TmV4dENoZWNrZXJzKGZpcnN0OiBib29sZWFuLCBsYXN0OiBib29sZWFuKSB7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5pc0ZpcnN0ID0gZmlyc3Q7XG5cbiAgICAgIHRoaXMuaXNMYXN0ID0gbGFzdDtcblxuICAgIH0sIDApO1xuXG4gIH1cblxufVxuIiwiZXhwb3J0IGNvbnN0IFRodW1ib3JTZXJ2ZXJIb3N0ID0gJ2h0dHBzOi8vY2FjaGUtdGh1bWJzLmRlY29yYWNvbnRlbnQuY29tL3Vuc2FmZSc7XG5cbmV4cG9ydCBjb25zdCBTM0hvc3QgPSAnaHR0cDovL3MzLmFtYXpvbmF3cy5jb20vZGVjb3JhLXBsYXRmb3JtLTEtbnYnO1xuXG5leHBvcnQgY29uc3QgVHJhbnNwYXJlbnRJbWFnZSA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVFBQUFDMUhBd0NBQUFBQW1KTFIwUUEvNGVQekw4QUFBXG5BSmNFaFpjd0FBQ3hNQUFBc1RBUUNhbkJnQUFBQUxTVVJCVkFqWFkyQmdBQUFBQXdBQklOV1V4d0FBQUFCSlJVNUVya0pnZ2c9PWA7XG5cbmV4cG9ydCBjb25zdCBFcnJvckltYWdlID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBTUFBQUQwNEpINUFBQUFzVkJNVkVVQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBXG5BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVxuQUFBQUFBQUFBazJ3TFNBQUFBT25SU1RsTUFBNFVVQlFnTUVQU0tLK2phR3hjZjk1MHljazg2TmkrbWdiOVhKaU95UlBEczNxS1daMHJLclh4Mys4NWpRVDI0WGVQWDA4VnRhcEdhRUM1Uk53QUFCMTVKUkVGVWVOcnRtMmR6MnpBTWhrbHIyYklsNzVGNDFYRzg0cGxsMS96L1A2eVhWallFa2lLXG5wa2Q3MXJzK25uaU1kSWVJRkNFQXErYzkvL3BNVjJ3djgzbUc1bkI1NmZ1RGE1QzlDZytubVZHYVlINmVYYVVESjl4TU9KeXlaeVRBazMwbHdyaklkczgyWWZBL3VCVmJYMkhEeFNPR001eXdOazM2eGV1aDlzTFM4SDRzelliUmlTWlRMTEpGYXF5RGRTMlQvOWp4c2hWSHdVOXV4eHNmOVhHTEtcblkxaEEwTDh3am8vRnlKYXIxRzhMTW4ydzgycnZpU0YySFplbzhEbzdocWoyY3ozK0E4NTJaOHNrV1d5d00wclp4ZWdpOGEwT3B0dHBMOStRR0MyU0RiOGMzL3RXcWdmcDFoaXdQWkFzTE9JUGtUNm9sM0h6MnhuY1VHTEFKWXVXN2JpQW5rbGFyckZvenVyRElPYUhOVTBuL3pYY3VzOFJSYVhZWVxuNlN5QUpMZmJKenZFR2xrc3FCNXYrdms1RTNrNElZSk1RWFUwOHgvb2puZ3pXdnErSHNnUmZBTTBVaE1hRUgwa1dLb3NCc21HY205SjVBWFVoVGcwNEJvdWVmL0NnRUs4MExOTVRhMlNZcGtZcG9TKy9mRGh4YmJSOTNMaEpiNnV1cXQxbk9MTHVvYnQ4eG1Hem5BSjBycSs1L05pUGtYemViUGZWXG4xelFOOExGTlhwWVJhQTFpZVQ4V2xwMUtXUGhNZGIybFpYNlZzbVp6dFd1dmZqWnFnK0JWVWNuVGZsbEIybDM3UTZyRUg1MmFHYW1KYnpiT1NFbWxvbTBVWDlwSjFrS3BRU3A3Y1k2eElwN3d4eEN1UUtZQW8wMFROVmJvRXZicWdzR1J5Wmlpa0JGRTd1SzdJbG9pMXU2WUdwV0dvS3BOdnV5c1JcbjkweC9XZGFkSUE4RE5WbklaMGczWHlpYjdrTU1Gb0lJekVhaEdHMkFUTWw3aEpudXNOY0M0NHFCUkVxbUtXUUpWVFYzY1p6ZGphdHd6RlJjclRoQjRmRDVwUnhjS0o4ZHREQkJHbGc0YkNXcDBIbGdhZnB5eGprTW90NlFlMkVIQzJTU3BNVnluTTZFdWk4UVp3VmpSMVhIUmUzZ3c5dFNEbExGalxuS2RpaVFjMWVIZ2VkNkdkWE5aMTZoR2NCa1JoUWsvbUFpKzlCOUpTOGFBK2NHcjM3WDE0YnpCU2MrNStpYnBVZ3RtTG5JRmZqeHNtZ3hxWkU3bHM4VzFLY0pmWUxWdU1ydmQ4MVlHWlVaWFd2Sjh2UkRsbzVRWTF2b0ViTGM4UFJzakpqR2xDekdQM1drK1RoR1k3TUE2U3BUMXo5OFdsa1BEQTNnXG5FU256UUpwVU5hTU1MWWF3eDdoZ2VIY0k1aGdwVGNBTHpZZ01kNWt3NURmVjNtZ3hqSldvODBuV1ZNRDlwRW40MUtYdVlWRUxUcklIdWZHeHBEeUoxMGkwcEtHaXJvSUpBYXdCc2pldldKeEg3QUpTek1ENm1MU3M2UjVFQlk2Z3FzZldaeVZ6NTlvY3FReEg0bzIyZGdBWUFjTHRiQWFCMGlOT3hcbk1EYlBGRTl1RTZiQUN3Qm5zN25Cb2RmY21NazZ1WTlWbzZBN0FhYlJBOEp4THkwOEFBSWpaSVhZMEJvaHBoa0NlSXhOaUFubUJBUTJrQVhtak1xWEdNUkdKa1FOZDhCNEJkQ0F2VmRDSXgzNEVlcElZWTJycDdpWHVJaWdzaU1SRmhTNHdDVzIvQUdBWFVPVkVrei9vdzlNVTg0T2dOZ0ZJT0Z0S1xucmtjak80N3FZQ1MyOUFSN2hDRTVZSktQN1RuZWYxSm5Razlpa055Q0k3dmlBRGV4emFyVHVKblIrcU00Q1J4a1lvZ0c0c1M2elNZZ1hBa29PTHhMcElFUmZEOGdZUm4vY29GR1NnOVc0WGRoWUpMSTJ1Q1lwVXVaNkE1cklrUXQ2TndFbjRkbVNnaG81QSthUzh1c1NkVkY2QXhvVWJvRnBsdVFsXG45OGNvSmhJU3B3emJyYTZLTlZPZ2E3U1RzWTROVDVrbUtLZ0V4YmRrcldGZmI4QkpHR21jUXFqS1pqZzNPb3BwcENYcmpGNzBCakRZV20venRkNnM3Y0k5ZElIVnVLZUU1d1Y4S2Fyd3pjQ0E5L2lkam1jVGpNZXBjWm93Q0JqSXUyTkxid0FyRVRVQnA4YVdOQTkyNVBPQlY1VUJrQXMwK0I5WU5cbm5VQ0RLRWtsVzFNVFdNQW1Da3loSVY0TmY0RU5VYTJWUlV6SXIwQnJDSnFpMWErWnF2UVNPM3hVSDlCOFZhL0pFM0pOa1lHc0tjV3YrdlJpUVF6S2FlQ1IwVlQxTUFGU1hQQ2hnTUdLUG5zd2k3US9pTXN0QVJoclhINCtJVFFNb1FieDBKUXAzYjROQmoyQXl2d08vTXRTNWowOXprMWhyMWtGYlxubkNSSWxsNWpHNDc4MnlpbzhTYUFJRjFueFJ3SEx3N01JMGE4c0VCb3IzQmVDZUJzdERHNHFGa3JLMEJkNjVrZnVLNWFJOHRMRWFnUldSY3VUZWJWNVlIbkNzam5hNHJwTkMzL0Y3YzRzQnVkVklqbFcwQVZMNm5JdmFMRDlYYUpjcWNLRHIzcHpXNko4dHViTGN3RmRVOWtyL01Vc0lKeTYwbWZtXG5BT2Y4R2VodURGOHpUZTVKZFBKUWlLbDlFL3piODdXSFJwL3hyMGJiUjl3T05rQlNMVmI2RkJsV1hFdWhqaitKdzNrSGdha3JveTZ1aW9CUGpUM1BvM2RSNWdlcy8zdzl4QTJjMTduVlVZZXVYV0pwUFU0Nktyd0h5ZmhyckV4UE82TlRNRGYxcFdFNERjTWNwZnl6WWNCSnVpQ2tEZUQyVE54OTRcbk8vQm9scWhoMnluSlEvOEg4bWNXQzlqVktlVEQ5RUhLV3dkd2EzVkVzaEhzWW85QjBsTEJuWlVHM2Z2R0RVblBLM28vUk5LeW5LRjJOZ3V0QmdPcXkxUm5RKytkQWVXc1ByUlFYek1iMnFZQ210WlFFK2RtVHlJUFhGTThvZ1ptdDh1NEpDTjVHRDF4bGZhaXJsNTkrTUVRdFhyZVRONFdpcnhLVjFcbjdWdWExTmxYRmNLTW1OTjJFaXAvYlNEeDJiZm1FNzN2aHdYa3ZxMTdWWDJQOHp5c0xuaUJTRy81bCtlWjhVeW5qQTB0Q3NrOEp4WDU5TW05SlhoM3dQNFVWdnc5czVJTitKTjcyV2s5dXdlY2NpZndHM3YyL1crQWVmNzFzZStadFF4NnI3dmU3eDJQUHJsa1ArOCsveUN6R2k3YUZ6cFBVdEFBQUFBRWxGVGtTdVFtQ0NgO1xuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW1hZ2VTaXplLCBTeXN0ZW1GaWxlS2V5IH0gZnJvbSAnLi9pbWFnZS5kaXJlY3RpdmUubW9kZWxzJztcbmltcG9ydCB7IFRyYW5zcGFyZW50SW1hZ2UsIFRodW1ib3JTZXJ2ZXJIb3N0LCBFcnJvckltYWdlLCBTM0hvc3QgfSBmcm9tICcuL2ltYWdlLmRpcmVjdGl2ZS5jb25zdGFudHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGVjSW1hZ2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZURpcmVjdGl2ZSB7XG5cbiAgY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgZXJyb3JPbkxvYWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgZGVjSW1hZ2UodjogU3lzdGVtRmlsZUtleSB8IHN0cmluZykge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVySW1hZ2UpIHtcbiAgICAgIHRoaXMuaW5uZXJJbWFnZSA9IHY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGRlY0ltYWdlU2l6ZTogSW1hZ2VTaXplO1xuXG4gIC8vIERlZmluZXMgaWYgd2hpdGUgbWFyZ2lucyBzaG91bGQgYmUgY3JvcHBlZFxuICBASW5wdXQoKSB0cmltOiBib29sZWFuO1xuXG4gIC8vIERlZmluZXMgaWYgdGhlIGltYWdlIHNob3VsZCBiZSBjcm9wcGVkIG9yIGZpdCB0aGUgc2l6ZSByZXNwZWN0aW4gdGhlIGFzcGVjdCByYXRpb1xuICBASW5wdXQoKSBmaXRJbjogYm9vbGVhbjtcblxuICAvLyBHZWQgcmVkaW1lbnNpb25lZCBpbWFnZSBmcm9tIHRodW1ib3IgaW1hZ2UgcmVzaXplIHNlcnZpY2VcbiAgQElucHV0KCkgdGh1bWJvcml6ZSA9IHRydWU7XG5cbiAgcHJpdmF0ZSBjb250YWluZXJFbGVtZW50VHlwZTogJ0lNRycgfCAnTk9ULUlNRyc7XG5cbiAgcHJpdmF0ZSBpbm5lckltYWdlOiBTeXN0ZW1GaWxlS2V5IHwgc3RyaW5nID0gVHJhbnNwYXJlbnRJbWFnZTtcblxuICBwcml2YXRlIGltYWdlUGF0aDogc3RyaW5nO1xuXG4gIHByaXZhdGUgZmluYWxJbWFnZVVybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy5kZXRlY3RDb250YWluZXJFbGVtZW50KCk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdENvbnRhaW5lckVsZW1lbnQoKSB7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50ID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnRUeXBlID0gdGhpcy5jb250YWluZXJFbGVtZW50LnRhZ05hbWUgPT09ICdJTUcnID8gJ0lNRycgOiAnTk9ULUlNRyc7XG4gIH1cblxuICBwcml2YXRlIGxvYWRJbWFnZSgpIHtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5pbm5lckltYWdlID09PSAnc3RyaW5nJykge1xuXG4gICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSB0aGlzLmlubmVySW1hZ2U7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmltYWdlUGF0aCA9IHRoaXMuZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKTtcblxuICAgICAgaWYgKHRoaXMuaW1hZ2VQYXRoKSB7XG5cbiAgICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gdGhpcy5nZXRGaW5hbFVybCgpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IEVycm9ySW1hZ2U7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMudHJ5VG9Mb2FkSW1hZ2UoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJJbWFnZVsnZmlsZUJhc2VQYXRoJ10gfHwgdW5kZWZpbmVkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmluYWxVcmwoKSB7XG5cbiAgICBpZiAodGhpcy50aHVtYm9yaXplKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFRodW1ib3JVcmwoKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFMzVXJsKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UzNVcmwoKSB7XG4gICAgcmV0dXJuIGAke1MzSG9zdH0vJHt0aGlzLmltYWdlUGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaHVtYm9yVXJsKCkge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmdldEltYWdlU2l6ZSh0aGlzLmRlY0ltYWdlU2l6ZSk7XG4gICAgY29uc3QgYXNwZWN0ID0gdGhpcy5nZXRBc3BlY3QoKTtcbiAgICBjb25zdCB0cmltID0gdGhpcy5nZXRUcmltKCk7XG4gICAgcmV0dXJuIGAke1RodW1ib3JTZXJ2ZXJIb3N0fS8ke3NpemV9JHthc3BlY3R9JHt0cmltfS8ke3RoaXMuaW1hZ2VQYXRofWA7XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlU2l6ZShkZWNJbWFnZVNpemU6IEltYWdlU2l6ZSA9IHt9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7ZGVjSW1hZ2VTaXplLndpZHRoIHx8IDB9eCR7ZGVjSW1hZ2VTaXplLmhlaWdodCB8fCAwfWA7XG4gIH1cblxuICBwcml2YXRlIGdldEFzcGVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5maXRJbiA/ICcvZml0LWluJyAgOiAnJztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJpbSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmltID8gJy90cmltJyA6ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlUb0xvYWRJbWFnZSgpIHtcbiAgICBjb25zdCBkb3dubG9hZGluZ0ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgZG93bmxvYWRpbmdJbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmNyZWF0ZUltYWdlKCk7XG4gICAgfTtcblxuICAgIGRvd25sb2FkaW5nSW1hZ2Uub25lcnJvciA9ICgpID0+IHtcbiAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IEVycm9ySW1hZ2U7XG4gICAgICB0aGlzLmNyZWF0ZUltYWdlKCk7XG4gICAgfTtcblxuICAgIGRvd25sb2FkaW5nSW1hZ2Uuc3JjID0gdGhpcy5maW5hbEltYWdlVXJsO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXJFbGVtZW50VHlwZSA9PT0gJ0lNRycpIHtcbiAgICAgIHRoaXMuc2V0SW1hZ2VlbGVtZW50U3JjKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXBwZW5kSW1hZ2VUb0JnKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRJbWFnZVRvQmcoKSB7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHRoaXMuZmluYWxJbWFnZVVybCArICcpJztcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAnbm8tcmVwZWF0JztcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnMTAwJSc7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RlYy1pbWFnZS1iZy1sb2FkaW5nJyk7XG4gIH1cblxuICBwcml2YXRlIHNldEltYWdlZWxlbWVudFNyYygpIHtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCB0aGlzLmZpbmFsSW1hZ2VVcmwpO1xuICB9XG5cbn1cblxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0ltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9pbWFnZS5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0ltYWdlRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0RlY0ltYWdlRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBUaHVtYm9yU2VydmVySG9zdCA9ICdodHRwczovL2NhY2hlLXRodW1icy5kZWNvcmFjb250ZW50LmNvbS91bnNhZmUnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy16b29tLWltYWdlLXZpZXcnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJpbWFnZWhpZ2hsaWdodC1jb250YWluZXJcIiA+XG4gICAgPG5neC1pbWFnZS16b29tIFxuICAgICAgICBbdGh1bWJJbWFnZV09XCJ0aHVtYkltYWdlXCJcbiAgICAgICAgW2Z1bGxJbWFnZV09XCJmaW5hbEltYWdlVXJsXCJcbiAgICAgICAgW3pvb21Nb2RlXT1cInpvb21Nb2RlXCJcbiAgICAgICAgW2VuYWJsZVNjcm9sbFpvb21dPVwiZW5hYmxlU2Nyb2xsWm9vbVwiXG4gICAgICAgIFtzY3JvbGxTdGVwU2l6ZV09XCJzY3JvbGxTdGVwU2l6ZVwiXG4gICAgICAgIFtlbmFibGVMZW5zXT1cImVuYWJsZUxlbnNcIlxuICAgICAgICBbbGVuc1dpZHRoXT1cImxlbnNXaWR0aFwiXG4gICAgICAgIFtsZW5zSGVpZ2h0XT1cImxlbnNIZWlnaHRcIj5cbiAgICA8L25neC1pbWFnZS16b29tPlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2AuaW1hZ2VoaWdobGlnaHQtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7Y3Vyc29yOnpvb20taW59YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjWm9vbUltYWdlVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY0ltYWdlKHYpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lckltYWdlKSB7XG4gICAgICB0aGlzLmlubmVySW1hZ2UgPSB2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBcbiAgc2V0IHRodW1iSW1hZ2VTaXplKHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy50aHVtYlNpemUgPSB2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICAvLyBob3ZlciB8IGNsaWNrIHwgdG9nZ2xlIHwgaG92ZXItZnJlZXplXG4gIEBJbnB1dCgpIHpvb21Nb2RlOiBzdHJpbmcgPSAnY2xpY2snO1xuXG4gIEBJbnB1dCgpIGVuYWJsZVNjcm9sbFpvb206IEJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIHNjcm9sbFN0ZXBTaXplOiBudW1iZXIgPSAwLjE7XG5cbiAgQElucHV0KCkgZW5hYmxlTGVuczogQm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGxlbnNXaWR0aDogbnVtYmVyID0gMTAwO1xuXG4gIEBJbnB1dCgpIGxlbnNIZWlnaHQ6IG51bWJlciA9IDEwMDtcblxuICBpbm5lckltYWdlOiBhbnk7XG4gIGltYWdlUGF0aDogYW55O1xuICBmaW5hbEltYWdlVXJsOiBhbnk7XG4gIHRodW1iSW1hZ2U6IGFueTtcbiAgdGh1bWJTaXplOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5pbm5lckltYWdlICYmIHRoaXMudGh1bWJTaXplKSB7XG4gICAgICB0aGlzLmltYWdlUGF0aCA9IHRoaXMuZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKTtcbiAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IHRoaXMuaW5uZXJJbWFnZS5maWxlVXJsO1xuICAgICAgdGhpcy50aHVtYkltYWdlID0gdGhpcy5nZXRUaHVtYm9yVXJsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJJbWFnZVsnZmlsZUJhc2VQYXRoJ10gfHwgdW5kZWZpbmVkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VTaXplKHRodW1iU2l6ZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGh1bWJTaXplLndpZHRoIHx8IDB9eCR7dGh1bWJTaXplLmhlaWdodCB8fCAwfWA7XG4gIH1cblxuICBwcml2YXRlIGdldFRodW1ib3JVcmwoKSB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZ2V0SW1hZ2VTaXplKHRoaXMudGh1bWJTaXplKTtcbiAgICByZXR1cm4gYCR7VGh1bWJvclNlcnZlckhvc3R9LyR7c2l6ZX0vJHt0aGlzLmltYWdlUGF0aH1gO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neEltYWdlWm9vbU1vZHVsZSB9IGZyb20gJ25neC1pbWFnZS16b29tJztcbmltcG9ydCB7IERlY1pvb21JbWFnZVZpZXdDb21wb25lbnQgfSBmcm9tICcuL2RlYy16b29tLWltYWdlLXZpZXcuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOZ3hJbWFnZVpvb21Nb2R1bGUuZm9yUm9vdCgpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1pvb21JbWFnZVZpZXdDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1pvb21JbWFnZVZpZXdDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNab29tSW1hZ2VWaWV3TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZ2FsbGVyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjSW1hZ2VNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxNb2R1bGUgfSBmcm9tICdAbmd1L2Nhcm91c2VsJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgJ2hhbW1lcmpzJztcbmltcG9ydCB7IERlY1pvb21JbWFnZVZpZXdNb2R1bGUgfSBmcm9tICcuLy4uL2RlYy16b29tLWltYWdlLXZpZXcvZGVjLXpvb20taW1hZ2Utdmlldy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY0ltYWdlTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE5ndUNhcm91c2VsTW9kdWxlLFxuICAgIERlY1pvb21JbWFnZVZpZXdNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjR2FsbGVyeUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjR2FsbGVyeUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dhbGxlcnlNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1sYWJlbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvckhleH1cIiBbbmdDbGFzc109XCJkZWNDbGFzc1wiIGRlY0NvbnRyYXN0Rm9udFdpdGhCZz5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgZGl2e21hcmdpbjo0cHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzo3cHggMTJweDtib3JkZXItcmFkaXVzOjI0cHg7YWxpZ24taXRlbXM6Y2VudGVyO2N1cnNvcjpkZWZhdWx0fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xhYmVsQ29tcG9uZW50IHtcbiAgQElucHV0KCkgY29sb3JIZXg6IHN0cmluZztcbiAgQElucHV0KCkgZGVjQ2xhc3M6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb3RyYXN0IGNvbmZpZ3VyYXRpb25cbiAqXG4gKiBVc2VkIHRvIGRlZmluZSBzb21lIGN1c3RvbSBjb25maWd1cmF0aW9uIGFzIGNvbG9ycyBhbmQgYnJlYWtwb2ludFxuICovXG5leHBvcnQgaW50ZXJmYWNlIERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZUNvbmZpZyB7XG4gIGx1bWFCcmVha1BvaW50OiBzdHJpbmc7XG4gIGxpZ2h0Q29sb3I6IHN0cmluZztcbiAgZGFya0NvbG9yOiBzdHJpbmc7XG59XG5cbmNvbnN0IERFRkFVTFRfTFVNQV9CUkVBS1BPSU5UID0gMjAwO1xuXG4vKlxuKiBDb250cmFzdCBGb250IFdpdGggQmFja2dyb3VuZCBEaXJlY3RpdmVcbipcbiogQ29udHJhc3RzIHRoZSB0ZXh0IGNvbG9yIHdpdGggdGhlIGJhY2tncm91bmQtY29sb3IgdG8gYXZvaWQgd2hpdGUgY29sb3IgaW4gbGlnaCBiYWNrZ3JvdW5kIGFuZCBibGFjayBjb2xvciBpbiBkYXJrZW4gb25lcy5cbiogSXQgY2FuIGJlIHVzZWQgYXMgYXR0cmlidXRlIGluIGFueSBlbGVtZW50IHdpdGggb3Igd2l0aG91dCBwYXNzaW5nIGN1c3RvbSBjb25maWd1cmF0aW9uXG4qIEV4YW1wbGUgd2l0aG91dCBjdXN0b20gY29uZmlndXJhdGlvbjogPGRpdiBkZWNDb250cmFzdEZvbnRXaXRoQmdcIj48L2Rpdj5cbiogRXhhbXBsZSB3aXRoIGN1c3RvbSBjb25maWd1cmF0aW9uOiA8ZGl2IFtkZWNDb250cmFzdEZvbnRXaXRoQmddPVwie2RhcmtDb2xvcjogJ3JlZCd9XCI+PC9kaXY+XG4qXG4qIENvbmZpZ3VyYXRpb24gcGFyYW1zOlxuKiBsdW1hQnJlYWtQb2ludDogdGhlIHBvaW50IHdoZXJlIHdlIHNob3VsZCBjaGFuZ2UgdGhlIGZvbnQgY29sb3IuIFRoaXMgaXMgdGhlIGxpZ3RoIGZlZWxpbmcgYnJlYWtwb2ludC5cbiogbGlnaHRDb2xvcjogdGhlIHRleHQgY29sb3IgdXNlZCBpbiBkYXJrIGJhY2tncm91bmRzXG4qIGRhcmtDb2xvcjogdGhlIHRleHQgY29sb3IgdXNlZCBpbiBsaWd0aCBiYWNrZ3JvdW5kc1xuKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGhleFRvUmdiTmV3KGhleCkge1xuXG4gIGNvbnN0IHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpO1xuICByZXR1cm4gcmVzdWx0ID8ge1xuICAgIHI6IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpLFxuICAgIGc6IHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpLFxuICAgIGI6IHBhcnNlSW50KHJlc3VsdFszXSwgMTYpXG4gIH0gOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhbmRhcmRpemVfY29sb3IoYmdDb2xvcikge1xuXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIGN0eC5maWxsU3R5bGUgPSBiZ0NvbG9yO1xuXG4gIHJldHVybiBjdHguZmlsbFN0eWxlO1xufVxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkZWNDb250cmFzdEZvbnRXaXRoQmddJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWNDb250cmFzdEZvbnRXaXRoQmdEaXJlY3RpdmUgaW1wbGVtZW50cyBEb0NoZWNrIHtcblxuICBwcml2YXRlIGNvbmZpZztcblxuICBwcml2YXRlIGJnQ29sb3I7XG5cbiAgQElucHV0KCkgc2V0IGRlY0NvbnRyYXN0Rm9udFdpdGhCZyhjb25maWc6IERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZUNvbmZpZykge1xuXG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgICB0aGlzLmRvRGVjQ29udHJhc3RGb250V2l0aEJnKCk7XG5cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcblxuICAgIHRoaXMuYmdDb2xvciA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcblxuICAgIGNvbnN0IGJnQ29sb3IgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuXG4gICAgaWYgKGJnQ29sb3IgIT09IHRoaXMuYmdDb2xvcikge1xuXG4gICAgICB0aGlzLmJnQ29sb3IgPSBiZ0NvbG9yO1xuXG4gICAgICB0aGlzLmRvRGVjQ29udHJhc3RGb250V2l0aEJnKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgZG9EZWNDb250cmFzdEZvbnRXaXRoQmcoKSB7XG5cbiAgICBjb25zdCBsdW1hQnJlYWtQb2ludCA9ICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5sdW1hQnJlYWtQb2ludCkgPyB0aGlzLmNvbmZpZy5sdW1hQnJlYWtQb2ludCA6IERFRkFVTFRfTFVNQV9CUkVBS1BPSU5UO1xuXG4gICAgY29uc3QgaGV4YUJnQ29sb3IgPSBzdGFuZGFyZGl6ZV9jb2xvcih0aGlzLmJnQ29sb3IpO1xuXG4gICAgY29uc3QgcmdiQ29sb3IgPSBoZXhUb1JnYk5ldyhoZXhhQmdDb2xvcik7XG5cbiAgICBjb25zdCBsdW1hID0gMC4yMTI2ICogcmdiQ29sb3IuciArIDAuNzE1MiAqIHJnYkNvbG9yLmcgKyAwLjA3MjIgKiByZ2JDb2xvci5iOyAvLyBwZXIgSVRVLVIgQlQuNzA5XG5cbiAgICBpZiAobHVtYSA8IGx1bWFCcmVha1BvaW50KSB7XG5cbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5jb2xvciA9ICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5saWdodENvbG9yKSA/IHRoaXMuY29uZmlnLmxpZ2h0Q29sb3IgOiAncmdiYSgyNTUsMjU1LDI1NSwxKSc7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY29sb3IgPSAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcuZGFya0NvbG9yKSA/IHRoaXMuY29uZmlnLmRhcmtDb2xvciA6ICcjMjMyZTM4JztcblxuICAgIH1cblxuICB9XG59XG5cblxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNDb250cmFzdEZvbnRXaXRoQmdEaXJlY3RpdmUgfSBmcm9tICcuL2RlYy1jb250cmFzdC1mb250LXdpdGgtYmcuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNDb250cmFzdEZvbnRXaXRoQmdEaXJlY3RpdmUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNDb250cmFzdEZvbnRXaXRoQmdEaXJlY3RpdmUsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQ29udHJhc3RGb250V2l0aEJnTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY0xhYmVsQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtbGFiZWwuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0NvbnRyYXN0Rm9udFdpdGhCZ01vZHVsZSB9IGZyb20gJy4vLi4vLi4vZGlyZWN0aXZlcy9jb2xvci9jb250cmFzdC1mb250LXdpdGgtYmcvZGVjLWNvbnRyYXN0LWZvbnQtd2l0aC1iZy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBEZWNDb250cmFzdEZvbnRXaXRoQmdNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0xhYmVsQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNMYWJlbENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xhYmVsTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmlsdGVycywgRmlsdGVyR3JvdXBzIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbCc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBDb3VudFJlcG9ydCB7XG5cbiAgY291bnQ6IG51bWJlcjtcbiAgY2hpbGRyZW4/OiBDb3VudFJlcG9ydFtdO1xuXG59XG5cbi8qXG4gICogRGVjTGlzdFByZVNlYXJjaFxuICAqXG4gICogVXNlZCBhcyBtaWRkbGV3YXJlIHRvIG1hbmlwdWxhdGUgdGhlIGZpbHRlciBiZWZvcmUgZmV0Y2huZyB0aGUgZGF0YVxuICAqL1xuZXhwb3J0IHR5cGUgRGVjTGlzdFByZVNlYXJjaCA9IChmaWx0ZXJHcm91cHM6IEZpbHRlckdyb3VwcykgPT4gRmlsdGVyR3JvdXBzO1xuXG5cbi8qXG4gICogRGVjTGlzdEZldGNoTWV0aG9kXG4gICpcbiAgKiBVc2VkIHRvIGZldGNoIGRhdGEgZnJvbSByZW1vdGUgQVBJXG4gICovXG5leHBvcnQgdHlwZSBEZWNMaXN0RmV0Y2hNZXRob2QgPSAoZW5kcG9pbnQ6IHN0cmluZywgZmlsdGVyOiBhbnkpID0+IE9ic2VydmFibGU8RGVjTGlzdEZldGNoTWV0aG9kUmVzcG9uc2U+O1xuXG4vKlxuICAqIExpc3RUeXBlXG4gICpcbiAgKiBMaXN0IHR5cGVzXG4gICovXG5leHBvcnQgdHlwZSBEZWNMaXN0VHlwZSA9ICd0YWJsZScgfCAnZ3JpZCc7XG5cbi8qXG4gICogRGVjTGlzdEZldGNoTWV0aG9kUmVzcG9uc2VcbiAgKlxuICAqIFJlc3BvbnNlIHJlY2VpdmVkIGJ5IGZldGNoIERlY0xpc3RGZXRjaE1ldGhvZFxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNMaXN0RmV0Y2hNZXRob2RSZXNwb25zZSB7XG4gIHJlc3VsdDoge1xuICAgIHJvd3M6IGFueVtdO1xuICAgIGNvdW50OiBudW1iZXI7XG4gIH07XG59XG5cbi8qXG4gICogRGVjTGlzdEZpbHRlclxuICAqXG4gICogU3RydWN0dXJlIG9mIHRhYnMgZmlsdGVyc1xuICAqL1xuZXhwb3J0IGNsYXNzIERlY0xpc3RGaWx0ZXIge1xuICBjaGlsZHJlbj86IERlY0xpc3RGaWx0ZXJbXTtcbiAgY291bnQ/OiBzdHJpbmc7XG4gIGRlZmF1bHQ/OiBib29sZWFuO1xuICBmaWx0ZXJzOiBGaWx0ZXJzO1xuICBoaWRlPzogYm9vbGVhbjtcbiAgbGFiZWw6IHN0cmluZztcbiAgY29sb3I6IHN0cmluZztcbiAgbGlzdE1vZGU/OiBEZWNMaXN0VHlwZTtcbiAgcGVybWlzc2lvbnM/OiBzdHJpbmdbXTtcbiAgdWlkPzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSA9IHt9KSB7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGRhdGEuY2hpbGRyZW4gPyBkYXRhLmNoaWxkcmVuLm1hcChmaWx0ZXIgPT4gbmV3IERlY0xpc3RGaWx0ZXIoZmlsdGVyKSkgOiB1bmRlZmluZWQ7XG4gICAgdGhpcy5jb3VudCA9IGRhdGEuY291bnQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuZGVmYXVsdCA9IGRhdGEuZGVmYXVsdCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWx0ZXJzID0gZGF0YS5maWx0ZXJzIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmhpZGUgPSBkYXRhLmhpZGUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMubGFiZWwgPSBkYXRhLmxhYmVsIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvciB8fCAnIzZFNzU3QSc7XG4gICAgdGhpcy5saXN0TW9kZSA9IGRhdGEubGlzdE1vZGUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucGVybWlzc2lvbnMgPSBkYXRhLnBlcm1pc3Npb25zIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnVpZCA9IGRhdGEudWlkIHx8IGRhdGEubGFiZWw7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0xpc3RGZXRjaE1ldGhvZCwgRGVjTGlzdEZpbHRlciB9IGZyb20gJy4vLi4vLi4vbGlzdC5tb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC10YWJzLWZpbHRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImxpc3QtdGFicy1maWx0ZXItd3JhcHBlclwiICpuZ0lmPVwidmlzaWJsZUZpbHRlcnMgYXMgZmlsdGVyc1wiPlxuICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgY2xhc3M9XCJkZWMtdGFiLWhlYWRlclwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHRhYkZpbHRlciBvZiBmaWx0ZXJzXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAqZGVjUGVybWlzc2lvbj1cInRhYkZpbHRlci5wZXJtaXNzaW9uc1wiXG4gICAgICAgICAgICAgIG1hdC1idXR0b25cbiAgICAgICAgICAgICAgY2xhc3M9XCJ1cHBlcmNhc2VcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0VGFiKHRhYkZpbHRlci51aWQpXCJcbiAgICAgICAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cInNlbGVjdGVkVGFiVWlkID09ICh0YWJGaWx0ZXIudWlkKVwiPlxuICAgICAgICA8c3Bhbj57eyAnbGFiZWwuJyArIHRhYkZpbHRlci5sYWJlbCB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudFJlcG9ydFwiIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1zbWFsbFwiPnt7IGNvdW50UmVwb3J0W3RhYkZpbHRlci51aWRdLmNvdW50IH19PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmxpc3QtdGFicy1maWx0ZXItd3JhcHBlcnttYXJnaW4tdG9wOjhweH0ubGlzdC10YWJzLWZpbHRlci13cmFwcGVyIC5kZWMtdGFiLWhlYWRlci5ib3R0b217Ym9yZGVyLWJvdHRvbTowfS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyIC5iYWRnZXttYXJnaW4tbGVmdDo4cHh9Lmxpc3QtdGFicy1maWx0ZXItd3JhcHBlciAuZGVjLXRhYi1oZWFkZXIgLmJhZGdlLmJhZGdlLXBpbGx7cGFkZGluZzo4cHg7Zm9udC1zaXplOnNtYWxsO2JvcmRlci1yYWRpdXM6MjRweH0ubGlzdC10YWJzLWZpbHRlci13cmFwcGVyIC5kZWMtdGFiLWhlYWRlciAuYmFkZ2UuYmFkZ2UtcGlsbC5iYWRnZS1zbWFsbHtmb250LXNpemU6eC1zbWFsbDtwYWRkaW5nOjRweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgY3VzdG9tRmV0Y2hNZXRob2Q6IERlY0xpc3RGZXRjaE1ldGhvZDtcblxuICBuYW1lOiBzdHJpbmc7IC8vIGxpc3QgdW5pcXVlIG5hbWUgdG8gaWRlbnRpZnkgdGhlIHRhYiBpbiB1cmxcblxuICBzZWxlY3RlZFRhYlVpZDogc3RyaW5nO1xuXG4gIHNlcnZpY2U6IGFueTtcblxuICBASW5wdXQoKSBjb3VudFJlcG9ydDogYW55O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmaWx0ZXJzKHY6IERlY0xpc3RGaWx0ZXJbXSkge1xuICAgIGlmICh0aGlzLl9maWx0ZXJzICE9PSB2KSB7XG4gICAgICB0aGlzLl9maWx0ZXJzID0gdiA/IHYubWFwKGZpbHRlciA9PiBuZXcgRGVjTGlzdEZpbHRlcihmaWx0ZXIpKSA6IFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldCBmaWx0ZXJzKCk6IERlY0xpc3RGaWx0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcnM7XG4gIH1cblxuICBwcml2YXRlIGRlZmF1bHRUYWI6IHN0cmluZztcblxuICBwcml2YXRlIF9maWx0ZXJzOiBEZWNMaXN0RmlsdGVyW10gPSBbXTtcblxuICBwcml2YXRlIHdhdGhVcmxTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBAT3V0cHV0KCdzZWFyY2gnKSBzZWFyY2g6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgndGFiQ2hhbmdlJykgdGFiQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYkluVXJsUXVlcnkoKTtcbiAgfVxuXG4gIGRvRmlyc3RMb2FkID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBhdm9pZHMgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvciBzZWxlY3RpbmcgdGhlIGFjdGl2ZSB0YWJcbiAgICAgIHRoaXMud2F0Y2hUYWJJblVybFF1ZXJ5KCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBnZXRDb3VudE9mKHVpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY291bnRSZXBvcnQgJiYgdGhpcy5jb3VudFJlcG9ydFt1aWRdID49IDAgPyB0aGlzLmNvdW50UmVwb3J0W3VpZF0gOiAnPyc7XG4gIH1cblxuICBzZWxlY3RUYWIodGFiKSB7XG4gICAgdGhpcy5zZXRUYWJJblVybFF1ZXJ5KHRhYik7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWRUYWIoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5maWx0ZXJzID8gdGhpcy5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci51aWQgPT09IHRoaXMuc2VsZWN0ZWRUYWJVaWQpIDogdW5kZWZpbmVkO1xuXG4gIH1cblxuICBnZXQgdmlzaWJsZUZpbHRlcnMoKSB7XG4gICAgY29uc3QgdmlzaWJsZSA9IHRoaXMuZmlsdGVycyA/IHRoaXMuZmlsdGVycy5maWx0ZXIoKGZpbHRlcikgPT4gIWZpbHRlci5oaWRlKSA6IFtdO1xuICAgIHJldHVybiAodmlzaWJsZSAmJiB2aXNpYmxlLmxlbmd0aCA+IDEpID8gdmlzaWJsZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0RGVmYXVsdFRhYigpIHtcblxuICAgIGNvbnN0IGhhc0RlZmF1bHQ6IGFueSA9IHRoaXMuZmlsdGVycy5maW5kKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5kZWZhdWx0O1xuICAgIH0pO1xuXG4gICAgaWYgKGhhc0RlZmF1bHQpIHtcblxuICAgICAgdGhpcy5kZWZhdWx0VGFiID0gaGFzRGVmYXVsdC51aWQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmRlZmF1bHRUYWIgPSB0aGlzLmZpbHRlcnNbMF0udWlkO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIG9uU2VhcmNoID0gKHRhYiwgcmVjb3VudCA9IGZhbHNlKSA9PiB7XG5cbiAgICB0aGlzLnNlbGVjdGVkVGFiVWlkID0gdGFiLnVpZDtcblxuICAgIGlmICh0aGlzLmZpbHRlcnMgJiYgdGFiKSB7XG5cbiAgICAgIGNvbnN0IGV2ZW50ID0ge1xuICAgICAgICBmaWx0ZXJzOiB0YWIuZmlsdGVycyxcbiAgICAgICAgY2hpbGRyZW46IHRhYi5jaGlsZHJlbixcbiAgICAgICAgcmVjb3VudDogcmVjb3VudCxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuc2VhcmNoLmVtaXQoZXZlbnQpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGNvbXBvbmVudFRhYk5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICctdGFiJztcbiAgfVxuXG4gIHByaXZhdGUgc2V0VGFiSW5VcmxRdWVyeSh0YWIpIHtcbiAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG4gICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldID0gdGFiO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLiddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcywgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJJblVybFF1ZXJ5KCkge1xuXG4gICAgdGhpcy5kZXRlY3REZWZhdWx0VGFiKCk7XG5cbiAgICB0aGlzLndhdGhVcmxTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgICAuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcblxuICAgICAgICBjb25zdCB0YWIgPSBwYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldIHx8IHRoaXMuZGVmYXVsdFRhYjtcblxuICAgICAgICBpZiAodGFiICE9PSB0aGlzLnNlbGVjdGVkVGFiVWlkKSB7XG5cbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFRhYiA9IHRoaXMuZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIudWlkID09PSB0YWIpO1xuXG4gICAgICAgICAgdGhpcy5vblNlYXJjaChzZWxlY3RlZFRhYik7XG5cbiAgICAgICAgICB0aGlzLnRhYkNoYW5nZS5lbWl0KHRhYik7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCkge1xuICAgIGlmICh0aGlzLndhdGhVcmxTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMud2F0aFVybFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1hZHZhbmNlZC1maWx0ZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cblxuICA8ZGl2IGZ4RmxleD5cblxuICAgIDxuZy1jb250YWluZXJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlUmVmXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7Zm9ybTogZm9ybX1cIlxuICAgID48L25nLWNvbnRhaW5lcj5cblxuICA8L2Rpdj5cblxuICA8ZGl2IGZ4RmxleD5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGVuZFwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJzdWJtaXQoKVwiPnt7ICdsYWJlbC5zZWFyY2gnIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlIH19PC9idXR0b24+XG5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b24gKGNsaWNrKT1cInJlc2V0KClcIj57eyAnbGFiZWwucmVzZXQnIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlIH19PC9idXR0b24+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuPC9kaXY+XG5cblxuXG5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZvcm06IGFueSA9IHt9O1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIG9uU2VhcmNoID0gKCkgPT4ge307XG5cbiAgb25DbGVhciA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLm9uQ2xlYXIoKTtcbiAgfVxuXG4gIHN1Ym1pdCgpIHtcbiAgICB0aGlzLm9uU2VhcmNoKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYnMtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vLi4vbGlzdC1hZHZhbmNlZC1maWx0ZXIvbGlzdC1hZHZhbmNlZC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjTGlzdFByZVNlYXJjaCwgRGVjTGlzdEZpbHRlciB9IGZyb20gJy4vLi4vbGlzdC5tb2RlbHMnO1xuaW1wb3J0IHsgRmlsdGVyR3JvdXBzIH0gZnJvbSAnLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBQbGF0Zm9ybUxvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGlzdC1maWx0ZXItd3JhcHBlclwiPlxuICA8ZGl2IGZ4TGF5b3V0PVwicm93IHdyYXBcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgICA8IS0tXG4gICAgICBDb3VudGVyXG4gICAgLS0+XG4gICAgPGRpdiBmeEZsZXg9XCIzMFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvdW50ID49IDAgJiYgIWxvYWRpbmdcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA9PT0gMFwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+e3sgXCJsYWJlbC5yZWNvcmQtbm90LWZvdW5kXCIgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnQgPT09IDFcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPnt7IFwibGFiZWwub25lLXJlY29yZC1mb3VuZFwiIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID4gMVwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+IHt7IFwibGFiZWwucmVjb3Jkcy1mb3VuZFwiIHwgdHJhbnNsYXRlOntjb3VudDpjb3VudH0gfX08L3NwYW4+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgZnhGbGV4PVwiNzBcIiBjbGFzcz1cInRleHQtcmlnaHRcIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIiBjbGFzcz1cInNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdj5cblxuICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBjbGFzcz1cImlucHV0LXNlYXJjaC1jb250YWluZXJcIiBbY2xhc3MuYWN0aXZlXT1cInNob3dTZWFyY2hJbnB1dFwiPlxuICAgICAgICAgICAgPCEtLSBnYXAgLS0+XG4gICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4tdG9vZ2xlLXNlYXJjaFwiPlxuICAgICAgICAgICAgICA8bWF0LWljb24gKGNsaWNrKT1cInRvZ2dsZVNlYXJjaElucHV0KClcIj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGZvcm0gZnhGbGV4IHJvbGU9XCJmb3JtXCIgKHN1Ym1pdCk9XCJvblNlYXJjaCgpXCI+XG4gICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjE2cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgY2xhc3M9XCJpbnB1dC1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJhci1oXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBmeEZsZXggI2lucHV0U2VhcmNoIG5hbWU9XCJzZWFyY2hcIiBbKG5nTW9kZWwpXT1cImZpbHRlckZvcm0uc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImFkdmFuY2VkRmlsdGVyQ29tcG9uZW50XCIgY2xhc3M9XCJjbGlja1wiIChjbGljayk9XCJ0b2dnbGVBZHZhbmNlZEZpbHRlcigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlYy1zbWFsbCBidG4tb3Blbi1hZHZhbmNlZC1zZWFyY2hcIj57e1wibGFiZWwuYWR2YW5jZWQtb3B0aW9uc1wiIHwgdHJhbnNsYXRlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPCEtLWdhcC0tPlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS1SZWZyZXNoIHNlYXJjaC0tPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4taW5mbyBtYXJnaW4taWNvblwiIChjbGljayk9XCJvblNlYXJjaCgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+cmVmcmVzaDwvbWF0LWljb24+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLUNsZWFyIGZpbHRlcnMtLT5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiICpuZ0lmPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aFwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWluZm9cIiAoY2xpY2spPVwib25DbGVhcigpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+Y2xlYXI8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiICpuZ0lmPVwic2hvd0luZm9CdXR0b25cIj5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1pbmZvXCIgKGNsaWNrKT1cIm9uQ2xpY2tJbmZvKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5pbmZvX291dGxpbmU8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG5cbiAgPGRpdiAqbmdJZj1cInNob3dBZHZhbmNlZEZpbHRlclwiPlxuXG4gICAgPG1hdC1jYXJkIGNsYXNzPVwiYWR2YW5jZWQtc2VhcmNoLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsncmVtb3ZlLWJ1dHRvbi1lbmFibGVkJzogZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aH1cIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG5cbiAgICAgICAgPGEgKGNsaWNrKT1cImNsb3NlRmlsdGVycygpXCIgY2xhc3M9XCJidG4tY2xvc2UtYWR2YW5jZWQtc2VhcmNoXCI+XG5cbiAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG5cbiAgICAgICAgPC9hPlxuXG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1hZHZhbmNlZC1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9tYXQtY2FyZD5cblxuICA8L2Rpdj5cblxuICA8ZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWVcbiAgICAqbmdJZj1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGhcIlxuICAgIFtmaWx0ZXJHcm91cHNdPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnNcIlxuICAgIChyZW1vdmUpPVwicmVtb3ZlRGVjRmlsdGVyR3JvdXAoJGV2ZW50KVwiXG4gICAgKGVkaXQpPVwiZWRpdERlY0ZpbHRlckdyb3VwKCRldmVudClcIj48L2RlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lPlxuXG4gIDxkZWMtbGlzdC10YWJzLWZpbHRlciBbZmlsdGVyc109XCJmaWx0ZXJzXCIgW2NvdW50UmVwb3J0XT1cImNvdW50UmVwb3J0XCI+PC9kZWMtbGlzdC10YWJzLWZpbHRlcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5saXN0LWZpbHRlci13cmFwcGVye21hcmdpbjowIDAgMTZweDtwb3NpdGlvbjpyZWxhdGl2ZX0ubGlzdC1maWx0ZXItd3JhcHBlciAubWF0LWljb257Y29sb3I6Izk5OX0ubGlzdC1maWx0ZXItd3JhcHBlciAuc2VhcmNoLXRlcm0taW5wdXR7d2lkdGg6NTAwcHg7bWFyZ2luLXJpZ2h0OjhweH0ubGlzdC1maWx0ZXItd3JhcHBlciAuaW5saW5lLWZvcm17ZGlzcGxheTppbmxpbmUtYmxvY2t9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjc0cHg7ei1pbmRleDoxO3JpZ2h0OjMwcHg7d2lkdGg6NTUycHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXIucmVtb3ZlLWJ1dHRvbi1lbmFibGVke3JpZ2h0OjYycHg7d2lkdGg6NTUxcHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXIgLmJ0bi1jbG9zZS1hZHZhbmNlZC1zZWFyY2h7Y3Vyc29yOnBvaW50ZXJ9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXJ7dHJhbnNpdGlvbjphbGwgLjNzIGVhc2U7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjQwcHg7aGVpZ2h0OjUwcHh9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIuYWN0aXZle2JhY2tncm91bmQ6I2Y4ZjhmYTtjb2xvcjojOTk5O3dpZHRoOjYwMHB4fS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyLmFjdGl2ZSAuYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoe2Rpc3BsYXk6aW5saW5lfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2h7d2lkdGg6MTAwJX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoIGlucHV0e2ZvbnQ6aW5oZXJpdDtiYWNrZ3JvdW5kOjAgMDtjb2xvcjpjdXJyZW50Q29sb3I7Ym9yZGVyOm5vbmU7b3V0bGluZTowO3BhZGRpbmc6MDt3aWR0aDoxMDAlO3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoe2Rpc3BsYXk6bm9uZX0uc2VhcmNoLWNvbnRhaW5lciAuYnRuLWNsZWFyLXNlYXJjaHtwYWRkaW5nLXJpZ2h0OjE1cHg7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6Izk5OTt3aWR0aDo5MHB4fS5zZWFyY2gtY29udGFpbmVyIC5idG4taW5mbywuc2VhcmNoLWNvbnRhaW5lciAuYnRuLXRvb2dsZS1zZWFyY2h7Zm9udC1zaXplOjIxcHg7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OjIxcHg7Y29sb3I6Izk5OX0uc2VhcmNoLWNvbnRhaW5lciAuYmFyLWh7Ym9yZGVyLXJpZ2h0OjJweCBzb2xpZCAjZDBkMGQwO2hlaWdodDoyMXB4O21hcmdpbjphdXRvIDA7ZGlzcGxheTppbmxpbmUtYmxvY2t9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBjb3VudDogbnVtYmVyO1xuXG4gIGNvdW50UmVwb3J0O1xuXG4gIHNob3dTZWFyY2hJbnB1dDogYm9vbGVhbjtcblxuICBzaG93QWR2YW5jZWRGaWx0ZXI6IGJvb2xlYW47XG5cbiAgZmlsdGVyRm9ybTogYW55ID0ge1xuICAgIHNlYXJjaDogdW5kZWZpbmVkXG4gIH07XG5cbiAgZmlsdGVyR3JvdXBzOiBGaWx0ZXJHcm91cHM7XG5cbiAgZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM6IEZpbHRlckdyb3VwcztcblxuICBjdXJyZW50U3RhdHVzRmlsdGVyZWQ6IHN0cmluZztcblxuICB0YWJzRmlsdGVyOiBhbnk7XG5cbiAgZWRpdGlvbkdyb3VwSW5kZXg6IG51bWJlcjtcblxuICBuYW1lOiBzdHJpbmc7XG5cbiAgbG9hZGluZzogYm9vbGVhbjtcblxuICBpc0l0Rmlyc3RMb2FkID0gdHJ1ZTtcblxuICBmaWx0ZXJNb2RlOiAndGFicycgfCAnY29sbGFwc2UnO1xuXG4gIGNoaWxkcmVuRmlsdGVycztcblxuICAvKlxuICAgKiBjbGlja2FibGVDb250YWluZXJDbGFzc1xuICAgKlxuICAgKiBXaGVyZSB0aGUgY2xpY2sgd2F0Y2hlciBzaG91bGQgYmUgbGlzdGVuaW5nXG4gICAqL1xuICBwcml2YXRlIGNsaWNrYWJsZUNvbnRhaW5lckNsYXNzID0gJ2xpc3QtZmlsdGVyLXdyYXBwZXInO1xuXG4gIHByaXZhdGUgaW5uZXJEZWNGaWx0ZXJHcm91cHM6IGFueVtdO1xuXG4gIHByaXZhdGUgY3VycmVudFVybEVuY29kZWRGaWx0ZXI6IHN0cmluZztcblxuICBwcml2YXRlIHRhYnNGaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIHdhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBfZmlsdGVyczogRGVjTGlzdEZpbHRlcltdID0gW107XG5cbiAgcHJpdmF0ZSBfbG9hZENvdW50UmVwb3J0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHByZVNlYXJjaDogRGVjTGlzdFByZVNlYXJjaDtcblxuICBASW5wdXQoKSBzaG93SW5mb0J1dHRvbjtcblxuICBASW5wdXQoKSBoYXNQZXJzaXN0ZW5jZSA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IGZpbHRlcnModjogRGVjTGlzdEZpbHRlcltdKSB7XG5cbiAgICBpZiAodGhpcy5fZmlsdGVycyAhPT0gdikge1xuXG4gICAgICB0aGlzLl9maWx0ZXJzID0gdi5tYXAoZmlsdGVyID0+IG5ldyBEZWNMaXN0RmlsdGVyKGZpbHRlcikpO1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgbG9hZENvdW50UmVwb3J0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9sb2FkQ291bnRSZXBvcnQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbG9hZENvdW50UmVwb3J0KHY6IGJvb2xlYW4pIHtcbiAgICBpZiAodiAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuX2xvYWRDb3VudFJlcG9ydCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGZpbHRlcnMoKTogRGVjTGlzdEZpbHRlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVycztcbiAgfVxuXG4gIEBPdXRwdXQoKSBzZWFyY2g6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXRTZWFyY2gnKSBpbnB1dFNlYXJjaDtcblxuICBAVmlld0NoaWxkKERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50KSB0YWJzRmlsdGVyQ29tcG9uZW50OiBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudDtcblxuICBAQ29udGVudENoaWxkKERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCkgYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQ6IERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBsYXRmb3JtTG9jYXRpb246IFBsYXRmb3JtTG9jYXRpb24sXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2F0Y2hUYWJzRmlsdGVyKCk7XG4gICAgdGhpcy53YXRjaENsaWNrKCk7XG4gICAgdGhpcy53YXRjaFVybEZpbHRlcigpO1xuICAgIHRoaXMuY29uZmlndXJlQWR2YW5jZWRGaWx0ZXIoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nQ2xpY2soKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYnNGaWx0ZXIoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1VybEZpbHRlcigpO1xuICB9XG5cbiAgdG9nZ2xlU2VhcmNoSW5wdXQoKSB7XG4gICAgdGhpcy5zaG93U2VhcmNoSW5wdXQgPSAhdGhpcy5zaG93U2VhcmNoSW5wdXQ7XG4gICAgaWYgKCF0aGlzLnNob3dTZWFyY2hJbnB1dCkge1xuICAgICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXRTZWFyY2gubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfSwgMTgwKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVBZHZhbmNlZEZpbHRlcigkZXZlbnQpIHtcblxuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gIXRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyO1xuXG4gIH1cblxuICBvblNlYXJjaCA9IChhcHBlbmRDdXJyZW50Rm9ybSA9IHRydWUpID0+IHtcblxuICAgIGlmICh0aGlzLmZpbHRlckZvcm0gJiYgYXBwZW5kQ3VycmVudEZvcm0pIHtcblxuICAgICAgY29uc3QgbmV3RGVjRmlsdGVyR3JvdXAgPSB7XG5cbiAgICAgICAgZmlsdGVyczogW11cblxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXModGhpcy5maWx0ZXJGb3JtKS5mb3JFYWNoKGtleSA9PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyRm9ybVtrZXldKSB7XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IHByb3BlcnR5OiBrZXksIHZhbHVlOiB0aGlzLmZpbHRlckZvcm1ba2V5XSB9O1xuXG4gICAgICAgICAgbmV3RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKGZpbHRlcik7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAobmV3RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmVkaXRpb25Hcm91cEluZGV4ID49IDApIHtcblxuICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwc1t0aGlzLmVkaXRpb25Hcm91cEluZGV4XSA9IG5ld0RlY0ZpbHRlckdyb3VwO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5wdXNoKG5ld0RlY0ZpbHRlckdyb3VwKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IFtuZXdEZWNGaWx0ZXJHcm91cF07XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLnJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHRydWUpO1xuXG4gIH1cblxuICBvbkNsZWFyKCkge1xuXG4gICAgdGhpcy5jbG9zZUZpbHRlcnMoKTtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmNsZWFyRmlsdGVyRm9ybSgpO1xuXG4gICAgdGhpcy5vblNlYXJjaCgpO1xuXG4gIH1cblxuICByZW1vdmVEZWNGaWx0ZXJHcm91cChncm91cEluZGV4KSB7XG5cbiAgICB0aGlzLmZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzLmZpbHRlcigoZ3JvdXAsIGluZGV4KSA9PiBpbmRleCAhPT0gZ3JvdXBJbmRleCk7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5maWx0ZXIoKGdyb3VwLCBpbmRleCkgPT4gaW5kZXggIT09IGdyb3VwSW5kZXgpO1xuXG4gICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMuZmlsdGVyKChncm91cCwgaW5kZXgpID0+IGluZGV4ICE9PSBncm91cEluZGV4KTtcblxuICAgIHRoaXMub25TZWFyY2godHJ1ZSk7XG5cbiAgfVxuXG4gIGVkaXREZWNGaWx0ZXJHcm91cChncm91cEluZGV4KSB7XG5cbiAgICB0aGlzLmVkaXRpb25Hcm91cEluZGV4ID0gZ3JvdXBJbmRleDtcblxuICAgIGNvbnN0IHRvRWRpdERlY0ZpbHRlckdyb3VwID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFic1tncm91cEluZGV4XTtcblxuICAgIGlmICh0b0VkaXREZWNGaWx0ZXJHcm91cCAmJiB0b0VkaXREZWNGaWx0ZXJHcm91cC5maWx0ZXJzLmxlbmd0aCA+IDApIHtcblxuICAgICAgdGhpcy5yZWxvYWRGb3JtV2l0aEdpdmVuRGVjRmlsdGVyR3JvdXBlKHRvRWRpdERlY0ZpbHRlckdyb3VwLmZpbHRlcnMpO1xuXG4gICAgfVxuXG4gIH1cblxuICBjbGVhckZpbHRlckZvcm0gPSAoKSA9PiB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXJGb3JtKSB7XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybSkuZm9yRWFjaChrZXkgPT4ge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRm9ybVtrZXldID0gdW5kZWZpbmVkO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuXG4gIH1cblxuICBvbkNsaWNrSW5mbygpIHtcbiAgICBjb25zb2xlLmxvZygnb24gY2xpY2sgaW5mby4gTm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICAvKlxuICAgKiBhcHBlbmRUb0N1cnJlbnRGaWx0ZXJzXG4gICAqXG4gICAqIEFwcGVuZCBhIGZpbHRlciB0byB0aGUgY3VycmVudCBmaWx0ZXIgZ3JvdXBzXG4gICAqL1xuICBhcHBlbmRUb0N1cnJlbnREZWNGaWx0ZXJHcm91cHMocHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKSB7XG5cbiAgICBjb25zdCBmaWx0ZXIgPSB7XG4gICAgICAncHJvcGVydHknOiBwcm9wZXJ0eU5hbWUsXG4gICAgICAndmFsdWUnOiBwcm9wZXJ0eVZhbHVlLFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicykge1xuXG4gICAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzLmZvckVhY2goKGZpbHRlckdyb3VwKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyRXhpc3RzSW5UaGlzR3JvdXAgPSBmaWx0ZXJHcm91cC5maWx0ZXJzLmZpbmQoZmlsdGVyR3JvdXBGaWx0ZXIgPT4gZmlsdGVyR3JvdXBGaWx0ZXIucHJvcGVydHkgPT09IGZpbHRlci5wcm9wZXJ0eSk7XG5cbiAgICAgICAgaWYgKCFmaWx0ZXJFeGlzdHNJblRoaXNHcm91cCkge1xuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKGZpbHRlcik7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSBbeyBmaWx0ZXJzOiBbZmlsdGVyXSB9XTtcblxuICAgIH1cblxuICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzO1xuXG4gICAgdGhpcy5yZWFjYWxjdWxhdGVBbmRFbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gIH1cblxuICBjbG9zZUZpbHRlcnMoKSB7XG5cbiAgICB0aGlzLmVkaXRpb25Hcm91cEluZGV4ID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSBmYWxzZTtcblxuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gZmFsc2U7XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVhY2FsY3VsYXRlQW5kRW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMocmVjb3VudCA9IGZhbHNlKSB7XG5cbiAgICB0aGlzLmVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQpXG4gICAgICAudGhlbigoKSA9PiB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc1BlcnNpc3RlbmNlKSB7XG5cbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaEZpbHRlckluVXJsUXVlcnkoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZUZpbHRlcnMoKTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgICAgICAgIH0pO1xuXG5cbiAgICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIHJlbG9hZEZvcm1XaXRoR2l2ZW5EZWNGaWx0ZXJHcm91cGUoZmlsdGVycykge1xuXG4gICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgIGZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuXG4gICAgICBpZiAoZmlsdGVyLnZhbHVlKSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJGb3JtW2ZpbHRlci5wcm9wZXJ0eV0gPSBmaWx0ZXIudmFsdWU7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgdGhpcy5vcGVuRmlsdGVycygpO1xuXG4gIH1cblxuICBwcml2YXRlIG9wZW5GaWx0ZXJzKCkge1xuXG4gICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSB0cnVlO1xuXG4gICAgdGhpcy5zaG93U2VhcmNoSW5wdXQgPSB0cnVlO1xuXG4gIH1cblxuICBwcml2YXRlIGNvbmZpZ3VyZUFkdmFuY2VkRmlsdGVyKCkge1xuXG4gICAgaWYgKHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5mb3JtID0gdGhpcy5maWx0ZXJGb3JtO1xuXG4gICAgICB0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50Lm9uU2VhcmNoID0gdGhpcy5vblNlYXJjaDtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5vbkNsZWFyID0gdGhpcy5jbGVhckZpbHRlckZvcm07XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJzRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMudGFic0ZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMudGFic0ZpbHRlckNvbXBvbmVudC5zZWFyY2guc3Vic2NyaWJlKGZpbHRlckV2ZW50ID0+IHtcblxuICAgICAgICBpZiAoZmlsdGVyRXZlbnQuY2hpbGRyZW4pIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyTW9kZSA9ICdjb2xsYXBzZSc7XG5cbiAgICAgICAgICB0aGlzLmNoaWxkcmVuRmlsdGVycyA9IGZpbHRlckV2ZW50LmNoaWxkcmVuO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSAndGFicyc7XG5cbiAgICAgICAgICB0aGlzLmNoaWxkcmVuRmlsdGVycyA9IHVuZGVmaW5lZDtcblxuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnRhYnNGaWx0ZXIgPSBmaWx0ZXJFdmVudC5maWx0ZXJzO1xuXG4gICAgICAgIHRoaXMuZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHModGhpcy5pc0l0Rmlyc3RMb2FkIHx8IGZpbHRlckV2ZW50LnJlY291bnQpO1xuXG4gICAgICAgIHRoaXMuaXNJdEZpcnN0TG9hZCA9IGZhbHNlO1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYnNGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMudGFic0ZpbHRlclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50YWJzRmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb3VudEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKSB7XG5cbiAgICBjb25zdCBjdXJyZW50RmlsdGVyID0gW107XG5cbiAgICBjb25zdCBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMgPSBbXTtcblxuICAgIGlmICh0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzICYmIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMubGVuZ3RoKSB7XG5cbiAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMuZm9yRWFjaCgoZmlsdGVyR3JvdXA6IHsgZmlsdGVyczogYW55W10gfSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlckdyb3VwQ29weSA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJHcm91cC5maWx0ZXJzLnNsaWNlKClcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy50YWJzRmlsdGVyKSB7XG4gICAgICAgICAgZmlsdGVyR3JvdXBDb3B5LmZpbHRlcnMucHVzaCguLi50aGlzLnRhYnNGaWx0ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudEZpbHRlci5wdXNoKGZpbHRlckdyb3VwQ29weSk7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5V2l0aG91dFRhYnMgPSB7XG4gICAgICAgICAgZmlsdGVyczogZmlsdGVyR3JvdXAuZmlsdGVycy5zbGljZSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgY3VycmVudEZpbHRlcldpdGhvdXRUYWJzLnB1c2goZmlsdGVyR3JvdXBDb3B5V2l0aG91dFRhYnMpO1xuXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy50YWJzRmlsdGVyKSB7XG5cbiAgICAgIGN1cnJlbnRGaWx0ZXIucHVzaCh7IGZpbHRlcnM6IHRoaXMudGFic0ZpbHRlciB9KTtcblxuICAgIH1cblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gY3VycmVudEZpbHRlci5sZW5ndGggPyBjdXJyZW50RmlsdGVyIDogdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicy5sZW5ndGggPyBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKlxuICAgKiBlbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwc1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcyhyZWNvdW50ID0gZmFsc2UpIHtcblxuICAgIGxldCBmaWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlckdyb3VwcyA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5maWx0ZXJHcm91cHMpKSA6IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgdGhpcy5tb3VudEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICAgICAgaWYgKHRoaXMucHJlU2VhcmNoKSB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXBzID0gdGhpcy5wcmVTZWFyY2goZmlsdGVyR3JvdXBzKTtcblxuICAgICAgfVxuXG4gICAgICB0aGlzLnNlYXJjaC5lbWl0KHtcbiAgICAgICAgZmlsdGVyR3JvdXBzOiBmaWx0ZXJHcm91cHMsXG4gICAgICAgIHJlY291bnQ6IHJlY291bnQsXG4gICAgICAgIGZpbHRlck1vZGU6IHRoaXMuZmlsdGVyTW9kZSxcbiAgICAgICAgY2hpbGRyZW46IHRoaXMuY2hpbGRyZW5GaWx0ZXJzLFxuICAgICAgfSk7XG5cbiAgICAgIHJlcygpO1xuXG4gICAgfSk7XG5cblxuICB9XG5cbiAgLypcbiAgICogYWN0QnlDbGlja1Bvc2l0aW9uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGRldGVjdFxuICAgKi9cbiAgcHJpdmF0ZSBhY3RCeUNsaWNrUG9zaXRpb24gPSAoJGV2ZW50KSA9PiB7XG5cbiAgICBpZiAoZXZlbnQgJiYgZXZlbnRbJ3BhdGgnXSkge1xuXG4gICAgICBjb25zdCBjbGlja2VkSW5zaWRlRmlsdGVyID0gJGV2ZW50WydwYXRoJ10uZmluZChwYXRoID0+IHtcblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBgJHtwYXRoWydjbGFzc05hbWUnXX1gIHx8ICcnO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZVdyYXBwZXIgPSBjbGFzc05hbWUuaW5kZXhPZih0aGlzLmNsaWNrYWJsZUNvbnRhaW5lckNsYXNzKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZU9wdGlvbiA9IGNsYXNzTmFtZS5pbmRleE9mKCdtYXQtb3B0aW9uJykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVEYXRlUGlja2VyID0gY2xhc3NOYW1lLmluZGV4T2YoJ21hdC1kYXRlcGlja2VyLWNvbnRlbnQnKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZU92ZXJsYXlDb250YWluZXIgPSBjbGFzc05hbWUuaW5kZXhPZignY2RrLW92ZXJsYXktY29udGFpbmVyJykgPj0gMDtcblxuICAgICAgICByZXR1cm4gaW5zaWRlV3JhcHBlciB8fCBpbnNpZGVPcHRpb24gfHwgaW5zaWRlRGF0ZVBpY2tlciB8fCBpbnNpZGVPdmVybGF5Q29udGFpbmVyO1xuXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFjbGlja2VkSW5zaWRlRmlsdGVyKSB7IC8vIGF2b2lkIGNsb3NpbmcgZmlsdGVyIGZyb20gYW55IG9wZW4gZGlhbG9nXG5cbiAgICAgICAgdGhpcy5jbG9zZUZpbHRlcnMoKTtcblxuICAgICAgICB0aGlzLmNsZWFyRmlsdGVyRm9ybSgpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoQ2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hDbGljaygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYWN0QnlDbGlja1Bvc2l0aW9uLCB0cnVlKTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ0NsaWNrKCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5hY3RCeUNsaWNrUG9zaXRpb24sIHRydWUpO1xuICB9XG5cbiAgLypcbiAgICogY29tcG9uZW50VGFiTmFtZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBjb21wb25lbnRGaWx0ZXJOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnLWZpbHRlcic7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFVybEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFVybEZpbHRlcigpIHtcblxuICAgIGlmICghdGhpcy5oYXNQZXJzaXN0ZW5jZSkge1xuXG4gICAgICByZXR1cm47XG5cbiAgICB9XG5cbiAgICB0aGlzLndhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtc1xuICAgICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG5cbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgICAgaWYgKHRoaXMubmFtZSkge1xuXG4gICAgICAgICAgICBjb25zdCBiYXNlNjRGaWx0ZXIgPSBwYXJhbXNbdGhpcy5jb21wb25lbnRGaWx0ZXJOYW1lKCldO1xuXG4gICAgICAgICAgICBpZiAoYmFzZTY0RmlsdGVyKSB7XG5cbiAgICAgICAgICAgICAgaWYgKGJhc2U2NEZpbHRlciAhPT0gdGhpcy5jdXJyZW50VXJsRW5jb2RlZEZpbHRlcikge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gdGhpcy5nZXRKc29uRnJvbUJhc2U2NEZpbHRlcihiYXNlNjRGaWx0ZXIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IGZpbHRlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMubW91bnRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VhcmNoKCk7XG5cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9LCAxMCk7XG5cbiAgICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVXJsRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1VybEZpbHRlcigpIHtcblxuICAgIGlmICh0aGlzLndhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG5cbiAgICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogcmVmcmVzaEZpbHRlckluVXJsUXVlcnlcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcmVmcmVzaEZpbHRlckluVXJsUXVlcnkoKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cbiAgICAgIGNvbnN0IGZpbHRlckJhc2U2NCA9IHRoaXMuZ2V0QmFzZTY0RmlsdGVyRnJvbURlY0ZpbHRlckdyb3VwcygpO1xuXG4gICAgICB0aGlzLnNldEZpbHRlckluVXJsUXVlcnkoZmlsdGVyQmFzZTY0KS50aGVuKHJlcywgcmVqKTtcblxuICAgIH0pO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldEZpbHRlckluVXJsUXVlcnlcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2V0RmlsdGVySW5VcmxRdWVyeShmaWx0ZXIpIHtcblxuICAgIHRoaXMuY3VycmVudFVybEVuY29kZWRGaWx0ZXIgPSBmaWx0ZXI7XG5cbiAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG5cbiAgICBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudEZpbHRlck5hbWUoKV0gPSBmaWx0ZXI7XG5cbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZ2V0QmFzZTY0RmlsdGVyRnJvbURlY0ZpbHRlckdyb3VwcygpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyAmJiB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgYmFzZTY0RmlsdGVyID0gYnRvYShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicykpKTtcbiAgICAgIGNvbnN0IGJhc2VGaWx0ZXJXaXRob3V0RXF1YWxTaWduID0gYmFzZTY0RmlsdGVyLnJlcGxhY2UoLz0vZywgJycpO1xuICAgICAgcmV0dXJuIGJhc2VGaWx0ZXJXaXRob3V0RXF1YWxTaWduOyAvLyByZW1vdmVzID0gYmVmb3IgZXNldCB0aGUgZmlsdGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVXJsRmlsdGVyXG4gICAqXG4gICAqIFNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MDIwNDA5L2lzLWl0LW9rLXRvLXJlbW92ZS10aGUtZXF1YWwtc2lnbnMtZnJvbS1hLWJhc2U2NC1zdHJpbmdcbiAgICovXG4gIHByaXZhdGUgZ2V0SnNvbkZyb21CYXNlNjRGaWx0ZXIoYmFzZTY0RmlsdGVyKSB7XG4gICAgY29uc3QgYmFzZTY0UGFkTGVuID0gKGJhc2U2NEZpbHRlci5sZW5ndGggJSA0KSA+IDAgPyA0IC0gKGJhc2U2NEZpbHRlci5sZW5ndGggJSA0KSA6IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhc2U2NFBhZExlbjsgaSsrKSB7XG4gICAgICBiYXNlNjRGaWx0ZXIgKz0gJz0nOyAvLyBhZGQgPSBiZWZvcmUgcmVhZGQgdGhlIGZpbHRlclxuICAgIH1cblxuICAgIGxldCBmaWx0ZXJPYmplY3Q7XG5cbiAgICB0cnkge1xuICAgICAgZmlsdGVyT2JqZWN0ID0gSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQoYXRvYihiYXNlNjRGaWx0ZXIpKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdMaXN0RmlsdGVyQ29tcG9uZW50OjogRmFpbGVkIHRvIHBhcnNlIHRoZSBmaWx0ZXIuIFRoZSB2YWx1ZSBpcyBub3QgdmFsaWQgYW5kIHRoZSBmaWx0ZXIgd2FzIHJlbW92ZWQuIEZpbHRlciB2YWx1ZTogJztcbiAgICAgIGNvbnNvbGUuZXJyb3IobXNnLCBiYXNlNjRGaWx0ZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBiYXNlNjRGaWx0ZXIgPyBmaWx0ZXJPYmplY3QgOiB1bmRlZmluZWQ7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZScsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImZpbHRlckdyb3Vwcz8ubGVuZ3RoXCIgY2xhc3M9XCJkZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyXCI+XG5cbiAgPG1hdC1jaGlwLWxpc3Q+XG5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBncm91cCBvZiBmaWx0ZXJHcm91cHM7IGxldCBncm91cEluZGV4ID0gaW5kZXg7XCI+XG4gICAgICA8bWF0LWNoaXAgKm5nSWY9XCJncm91cD8uZmlsdGVyc1wiIChjbGljayk9XCJlZGl0RGVjRmlsdGVyR3JvdXAoJGV2ZW50LCBncm91cEluZGV4KVwiPlxuXG4gICAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgZ3JvdXA/LmZpbHRlcnM7IGxldCBsYXN0RmlsdGVyID0gbGFzdDtcIiBjbGFzcz1cIml0ZW0td3JhcHBlclwiPlxuXG4gICAgICAgICAgPHNwYW4gW25nU3dpdGNoXT1cImZpbHRlci5wcm9wZXJ0eSAhPT0gJ3NlYXJjaCdcIj5cblxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cInRydWVcIj57eyAnbGFiZWwuJyArIGZpbHRlci5wcm9wZXJ0eSB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cblxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoRGVmYXVsdD57eyAnbGFiZWwuS2V5d29yZCcgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG5cbiAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICA8c3Bhbj46Jm5ic3A7PC9zcGFuPlxuXG4gICAgICAgICAgPHNwYW4gW25nU3dpdGNoXT1cImdldFZhbHVldHlwZShmaWx0ZXIudmFsdWUpXCIgY2xhc3M9XCJ2YWx1ZS13cmFwcGVyXCI+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIj57eyBmaWx0ZXIudmFsdWUgfCBkYXRlIH19PC9zcGFuPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hEZWZhdWx0Pnt7IGZpbHRlci52YWx1ZSB9fTwvc3Bhbj5cblxuICAgICAgICAgIDwvc3BhbiA+XG5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFsYXN0RmlsdGVyXCI+LDwvc3Bhbj5cblxuICAgICAgICAgICZuYnNwO1xuXG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cInJlbW92ZURlY0ZpbHRlckdyb3VwKCRldmVudCwgZ3JvdXBJbmRleClcIj5yZW1vdmVfY2lyY2xlPC9pPlxuXG4gICAgICA8L21hdC1jaGlwPlxuXG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgPC9tYXQtY2hpcC1saXN0PlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubWF0LXRhYi1ib2R5LWNvbnRlbnR7cGFkZGluZzoxNnB4IDB9Lm1hdC1mb3JtLWZpZWxkLXByZWZpeHttYXJnaW4tcmlnaHQ6OHB4IWltcG9ydGFudH0ubWF0LWZvcm0tZmllbGQtc3VmZml4e21hcmdpbi1sZWZ0OjhweCFpbXBvcnRhbnR9Lm1hdC1lbGV2YXRpb24tejB7Ym94LXNoYWRvdzowIDAgMCAwIHJnYmEoMCwwLDAsLjIpLDAgMCAwIDAgcmdiYSgwLDAsMCwuMTQpLDAgMCAwIDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxe2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16Mntib3gtc2hhZG93OjAgM3B4IDFweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA1cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejN7Ym94LXNoYWRvdzowIDNweCAzcHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDNweCA0cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggOHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo0e2JveC1zaGFkb3c6MCAycHggNHB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA0cHggNXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDEwcHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejV7Ym94LXNoYWRvdzowIDNweCA1cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDVweCA4cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMTRweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16Nntib3gtc2hhZG93OjAgM3B4IDVweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNnB4IDEwcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMThweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16N3tib3gtc2hhZG93OjAgNHB4IDVweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgN3B4IDEwcHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDJweCAxNnB4IDFweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejh7Ym94LXNoYWRvdzowIDVweCA1cHggLTNweCByZ2JhKDAsMCwwLC4yKSwwIDhweCAxMHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAzcHggMTRweCAycHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo5e2JveC1zaGFkb3c6MCA1cHggNnB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCA5cHggMTJweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgM3B4IDE2cHggMnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTB7Ym94LXNoYWRvdzowIDZweCA2cHggLTNweCByZ2JhKDAsMCwwLC4yKSwwIDEwcHggMTRweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgNHB4IDE4cHggM3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTF7Ym94LXNoYWRvdzowIDZweCA3cHggLTRweCByZ2JhKDAsMCwwLC4yKSwwIDExcHggMTVweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgNHB4IDIwcHggM3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTJ7Ym94LXNoYWRvdzowIDdweCA4cHggLTRweCByZ2JhKDAsMCwwLC4yKSwwIDEycHggMTdweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNXB4IDIycHggNHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTN7Ym94LXNoYWRvdzowIDdweCA4cHggLTRweCByZ2JhKDAsMCwwLC4yKSwwIDEzcHggMTlweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNXB4IDI0cHggNHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTR7Ym94LXNoYWRvdzowIDdweCA5cHggLTRweCByZ2JhKDAsMCwwLC4yKSwwIDE0cHggMjFweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNXB4IDI2cHggNHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTV7Ym94LXNoYWRvdzowIDhweCA5cHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE1cHggMjJweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDI4cHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTZ7Ym94LXNoYWRvdzowIDhweCAxMHB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxNnB4IDI0cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAzMHB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE3e2JveC1zaGFkb3c6MCA4cHggMTFweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTdweCAyNnB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMzJweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxOHtib3gtc2hhZG93OjAgOXB4IDExcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE4cHggMjhweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgN3B4IDM0cHggNnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTl7Ym94LXNoYWRvdzowIDlweCAxMnB4IC02cHggcmdiYSgwLDAsMCwuMiksMCAxOXB4IDI5cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDdweCAzNnB4IDZweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIwe2JveC1zaGFkb3c6MCAxMHB4IDEzcHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIwcHggMzFweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDM4cHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjF7Ym94LXNoYWRvdzowIDEwcHggMTNweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjFweCAzM3B4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggNDBweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMntib3gtc2hhZG93OjAgMTBweCAxNHB4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMnB4IDM1cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCA0MnB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIze2JveC1zaGFkb3c6MCAxMXB4IDE0cHggLTdweCByZ2JhKDAsMCwwLC4yKSwwIDIzcHggMzZweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOXB4IDQ0cHggOHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjR7Ym94LXNoYWRvdzowIDExcHggMTVweCAtN3B4IHJnYmEoMCwwLDAsLjIpLDAgMjRweCAzOHB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA5cHggNDZweCA4cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtYmFkZ2UtY29udGVudHtmb250LXdlaWdodDo2MDA7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYmFkZ2Utc21hbGwgLm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtc2l6ZTo2cHh9Lm1hdC1iYWRnZS1sYXJnZSAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjI0cHh9Lm1hdC1oMSwubWF0LWhlYWRsaW5lLC5tYXQtdHlwb2dyYXBoeSBoMXtmb250OjQwMCAyNHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWgyLC5tYXQtdGl0bGUsLm1hdC10eXBvZ3JhcGh5IGgye2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDMsLm1hdC1zdWJoZWFkaW5nLTIsLm1hdC10eXBvZ3JhcGh5IGgze2ZvbnQ6NDAwIDE2cHgvMjhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDQsLm1hdC1zdWJoZWFkaW5nLTEsLm1hdC10eXBvZ3JhcGh5IGg0e2ZvbnQ6NDAwIDE1cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDUsLm1hdC10eXBvZ3JhcGh5IGg1e2ZvbnQ6NDAwIDExLjYycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxMnB4fS5tYXQtaDYsLm1hdC10eXBvZ3JhcGh5IGg2e2ZvbnQ6NDAwIDkuMzhweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1ib2R5LTIsLm1hdC1ib2R5LXN0cm9uZ3tmb250OjUwMCAxNHB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSwubWF0LWJvZHktMSwubWF0LXR5cG9ncmFwaHl7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJvZHkgcCwubWF0LWJvZHktMSBwLC5tYXQtdHlwb2dyYXBoeSBwe21hcmdpbjowIDAgMTJweH0ubWF0LWNhcHRpb24sLm1hdC1zbWFsbHtmb250OjQwMCAxMnB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZGlzcGxheS00LC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktNHtmb250OjMwMCAxMTJweC8xMTJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA1NnB4O2xldHRlci1zcGFjaW5nOi0uMDVlbX0ubWF0LWRpc3BsYXktMywubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTN7Zm9udDo0MDAgNTZweC81NnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHg7bGV0dGVyLXNwYWNpbmc6LS4wMmVtfS5tYXQtZGlzcGxheS0yLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktMntmb250OjQwMCA0NXB4LzQ4cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAwNWVtfS5tYXQtZGlzcGxheS0xLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktMXtmb250OjQwMCAzNHB4LzQwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweH0ubWF0LWJvdHRvbS1zaGVldC1jb250YWluZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWJ1dHRvbiwubWF0LWZhYiwubWF0LWZsYXQtYnV0dG9uLC5tYXQtaWNvbi1idXR0b24sLm1hdC1taW5pLWZhYiwubWF0LXJhaXNlZC1idXR0b24sLm1hdC1zdHJva2VkLWJ1dHRvbntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtYnV0dG9uLXRvZ2dsZSwubWF0LWNhcmR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2FyZC10aXRsZXtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1jYXJkLWNvbnRlbnQsLm1hdC1jYXJkLWhlYWRlciAubWF0LWNhcmQtdGl0bGUsLm1hdC1jYXJkLXN1YnRpdGxle2ZvbnQtc2l6ZToxNHB4fS5tYXQtY2hlY2tib3h7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2hlY2tib3gtbGF5b3V0IC5tYXQtY2hlY2tib3gtbGFiZWx7bGluZS1oZWlnaHQ6MjRweH0ubWF0LWNoaXB7Zm9udC1zaXplOjEzcHg7bGluZS1oZWlnaHQ6MThweH0ubWF0LWNoaXAgLm1hdC1jaGlwLXJlbW92ZS5tYXQtaWNvbiwubWF0LWNoaXAgLm1hdC1jaGlwLXRyYWlsaW5nLWljb24ubWF0LWljb257Zm9udC1zaXplOjE4cHh9Lm1hdC10YWJsZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1oZWFkZXItY2VsbHtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jZWxsLC5tYXQtZm9vdGVyLWNlbGx7Zm9udC1zaXplOjE0cHh9Lm1hdC1jYWxlbmRhcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYWxlbmRhci1ib2R5e2ZvbnQtc2l6ZToxM3B4fS5tYXQtY2FsZW5kYXItYm9keS1sYWJlbCwubWF0LWNhbGVuZGFyLXBlcmlvZC1idXR0b257Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyIHRoe2ZvbnQtc2l6ZToxMXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWRpYWxvZy10aXRsZXtmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE1cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtZXhwYW5zaW9uLXBhbmVsLWNvbnRlbnR7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWZvcm0tZmllbGR7d2lkdGg6MTAwJTtmb250LXNpemU6aW5oZXJpdDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MS4xMjU7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZm9ybS1maWVsZC13cmFwcGVye3BhZGRpbmctYm90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtcHJlZml4IC5tYXQtaWNvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbntmb250LXNpemU6MTUwJTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtcHJlZml4IC5tYXQtaWNvbi1idXR0b24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9ue2hlaWdodDoxLjVlbTt3aWR0aDoxLjVlbX0ubWF0LWZvcm0tZmllbGQtcHJlZml4IC5tYXQtaWNvbi1idXR0b24gLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb257aGVpZ2h0OjEuMTI1ZW07bGluZS1oZWlnaHQ6MS4xMjV9Lm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjVlbSAwO2JvcmRlci10b3A6Ljg0Mzc1ZW0gc29saWQgdHJhbnNwYXJlbnR9Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXJ7dG9wOi0uODQzNzVlbTtwYWRkaW5nLXRvcDouODQzNzVlbX0ubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5le2JvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye2ZvbnQtc2l6ZTo3NSU7bWFyZ2luLXRvcDouNjY2NjdlbTt0b3A6Y2FsYygxMDAlIC0gMS43OTE2N2VtKX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4yNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNDM3NWVtIDB9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMXB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2w6LXdlYmtpdC1hdXRvZmlsbCsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMXB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMXB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAycHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAycHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyM2VtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNSV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4yODEyNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5le2JvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlcnttYXJnaW4tdG9wOi41NDE2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjY2NjY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjI1ZW0gMCAuNzVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4wOTM3NWVtO21hcmdpbi10b3A6LS41ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOjFlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLW91dGxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS44NDM3NWVtO21hcmdpbi10b3A6LS4yNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZ3JpZC10aWxlLWZvb3RlciwubWF0LWdyaWQtdGlsZS1oZWFkZXJ7Zm9udC1zaXplOjE0cHh9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyIC5tYXQtbGluZSwubWF0LWdyaWQtdGlsZS1oZWFkZXIgLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjEycHh9aW5wdXQubWF0LWlucHV0LWVsZW1lbnR7bWFyZ2luLXRvcDotLjA2MjVlbX0ubWF0LW1lbnUtaXRlbXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtcGFnaW5hdG9yLC5tYXQtcGFnaW5hdG9yLXBhZ2Utc2l6ZSAubWF0LXNlbGVjdC10cmlnZ2Vye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweH0ubWF0LXJhZGlvLWJ1dHRvbiwubWF0LXNlbGVjdHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zZWxlY3QtdHJpZ2dlcntoZWlnaHQ6MS4xMjVlbX0ubWF0LXNsaWRlLXRvZ2dsZS1jb250ZW50e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zbGlkZXItdGh1bWItbGFiZWwtdGV4dHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtc3RlcHBlci1ob3Jpem9udGFsLC5tYXQtc3RlcHBlci12ZXJ0aWNhbHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zdGVwLWxhYmVse2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXN0ZXAtbGFiZWwtc2VsZWN0ZWR7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdGFiLWdyb3Vwe2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXRhYi1sYWJlbCwubWF0LXRhYi1saW5re2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC10b29sYmFyLC5tYXQtdG9vbGJhciBoMSwubWF0LXRvb2xiYXIgaDIsLm1hdC10b29sYmFyIGgzLC5tYXQtdG9vbGJhciBoNCwubWF0LXRvb2xiYXIgaDUsLm1hdC10b29sYmFyIGg2e2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjB9Lm1hdC10b29sdGlwe2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTBweDtwYWRkaW5nLXRvcDo2cHg7cGFkZGluZy1ib3R0b206NnB4fS5tYXQtdG9vbHRpcC1oYW5kc2V0e2ZvbnQtc2l6ZToxNHB4O3BhZGRpbmctdG9wOjlweDtwYWRkaW5nLWJvdHRvbTo5cHh9Lm1hdC1saXN0LWl0ZW0sLm1hdC1saXN0LW9wdGlvbntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LWl0ZW0sLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbXtmb250LXNpemU6MTZweH0ubWF0LWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxNHB4fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LW9wdGlvbiwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb257Zm9udC1zaXplOjE2cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QgLm1hdC1zdWJoZWFkZXIsLm1hdC1uYXYtbGlzdCAubWF0LXN1YmhlYWRlciwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtc3ViaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbXtmb250LXNpemU6MTJweH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24sLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24sLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb257Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTJweH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtc3ViaGVhZGVyLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtc3ViaGVhZGVyLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtc3ViaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4fS5tYXQtb3B0Z3JvdXAtbGFiZWx7Zm9udDo1MDAgMTRweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNpbXBsZS1zbmFja2Jhcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHh9Lm1hdC1zaW1wbGUtc25hY2tiYXItYWN0aW9ue2xpbmUtaGVpZ2h0OjE7Zm9udC1mYW1pbHk6aW5oZXJpdDtmb250LXNpemU6aW5oZXJpdDtmb250LXdlaWdodDo1MDB9Lm1hdC10cmVle2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXRyZWUtbm9kZXtmb250LXdlaWdodDo0MDA7Zm9udC1zaXplOjE0cHh9Lm1hdC1yaXBwbGV7b3ZlcmZsb3c6aGlkZGVufUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5tYXQtcmlwcGxle2Rpc3BsYXk6bm9uZX19Lm1hdC1yaXBwbGUubWF0LXJpcHBsZS11bmJvdW5kZWR7b3ZlcmZsb3c6dmlzaWJsZX0ubWF0LXJpcHBsZS1lbGVtZW50e3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlci1yYWRpdXM6NTAlO3BvaW50ZXItZXZlbnRzOm5vbmU7dHJhbnNpdGlvbjpvcGFjaXR5LC13ZWJraXQtdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7dHJhbnNpdGlvbjpvcGFjaXR5LHRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpO3RyYW5zaXRpb246b3BhY2l0eSx0cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKSwtd2Via2l0LXRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX0uY2RrLXZpc3VhbGx5LWhpZGRlbntib3JkZXI6MDtjbGlwOnJlY3QoMCAwIDAgMCk7aGVpZ2h0OjFweDttYXJnaW46LTFweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjFweDtvdXRsaW5lOjA7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyLC5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9pbnRlci1ldmVudHM6bm9uZTt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uY2RrLW92ZXJsYXktY29udGFpbmVye3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6MTAwMH0uY2RrLW92ZXJsYXktY29udGFpbmVyOmVtcHR5e2Rpc3BsYXk6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXJ7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwMH0uY2RrLW92ZXJsYXktcGFuZXtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czphdXRvO2JveC1zaXppbmc6Ym9yZGVyLWJveDt6LWluZGV4OjEwMDA7ZGlzcGxheTpmbGV4O21heC13aWR0aDoxMDAlO21heC1oZWlnaHQ6MTAwJX0uY2RrLW92ZXJsYXktYmFja2Ryb3B7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDoxMDAwO3BvaW50ZXItZXZlbnRzOmF1dG87LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnRyYW5zcGFyZW50O3RyYW5zaXRpb246b3BhY2l0eSAuNHMgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7b3BhY2l0eTowfS5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6MX1AbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6YWN0aXZlKXsuY2RrLW92ZXJsYXktYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5Oi42fX0uY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcHtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjI4OCl9LmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLC5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6MH0uY2RrLW92ZXJsYXktY29ubmVjdGVkLXBvc2l0aW9uLWJvdW5kaW5nLWJveHtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDA7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttaW4td2lkdGg6MXB4O21pbi1oZWlnaHQ6MXB4fS5jZGstZ2xvYmFsLXNjcm9sbGJsb2Nre3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7b3ZlcmZsb3cteTpzY3JvbGx9LmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDotd2Via2l0LWF1dG9maWxsey13ZWJraXQtYW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnR9LmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDpub3QoOi13ZWJraXQtYXV0b2ZpbGwpey13ZWJraXQtYW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kO2FuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZH10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemV7cmVzaXplOm5vbmV9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplLW1lYXN1cmluZ3toZWlnaHQ6YXV0byFpbXBvcnRhbnQ7b3ZlcmZsb3c6aGlkZGVuIWltcG9ydGFudDtwYWRkaW5nOjJweCAwIWltcG9ydGFudDtib3gtc2l6aW5nOmNvbnRlbnQtYm94IWltcG9ydGFudH0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlcnttYXJnaW46MTZweCAwIDhweH0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAuaXRlbS13cmFwcGVye21heC13aWR0aDoxNWVtO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAuaXRlbS13cmFwcGVyLC5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC5tYXRlcmlhbC1pY29uc3tjb2xvcjojOTY5Njk2fS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC5maWx0ZXItY29udGVudHttYXJnaW4tcmlnaHQ6OHB4fS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC5tYXQtY2hpcHtjdXJzb3I6cG9pbnRlcn0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAudmFsdWUtd3JhcHBlcntjb2xvcjojZWYzZjU0fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGZpbHRlckdyb3VwcyA9IFtdO1xuXG4gIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGVkaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGVkaXREZWNGaWx0ZXJHcm91cCgkZXZlbnQsIGZpbHRlckdyb3VwKSB7XG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuZWRpdC5lbWl0KGZpbHRlckdyb3VwKTtcbiAgfVxuICByZW1vdmVEZWNGaWx0ZXJHcm91cCgkZXZlbnQsIGZpbHRlckdyb3VwKSB7XG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMucmVtb3ZlLmVtaXQoZmlsdGVyR3JvdXApO1xuICB9XG5cbiAgZ2V0VmFsdWV0eXBlKHZhbHVlKSB7XG5cbiAgICBjb25zdCBmaXJzdFZhbHVlID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZVswXSA6IHZhbHVlO1xuXG4gICAgbGV0IHR5cGU7XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgYCR7Zmlyc3RWYWx1ZX1gLmluZGV4T2YoJzAwMFonKSA+PSAwOlxuICAgICAgICB0eXBlID0gJ2RhdGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHR5cGUgPSAnZGVmYXVsdCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRDaGlwc01vZHVsZSwgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkZWNQZXJtaXNzaW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVjUGVybWlzc2lvbkRpcmVjdGl2ZSB7XG5cbiAgcHJpdmF0ZSBoYXNWaWV3ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBkZWNQZXJtaXNzaW9uKHA6IHN0cmluZ1tdKSB7XG4gICAgaWYgKCFwKSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgdGhpcy5oYXNWaWV3ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYXNQZXJtaXNzaW9uKHApO1xuICAgIH1cbiAgfVxuXG4gIGhhc1Blcm1pc3Npb24ocCkge1xuICAgIHRoaXMuc2VydmljZS51c2VyJC5zdWJzY3JpYmUoXG4gICAgICB1c2VyID0+IHtcbiAgICAgICAgaWYgKHVzZXIgJiYgdGhpcy5pc0FsbG93ZWRBY2Nlc3MocCwgdXNlci5wZXJtaXNzaW9ucykpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGFzVmlldykge1xuICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcbiAgICAgICAgICAgIHRoaXMuaGFzVmlldyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICAgIHRoaXMuaGFzVmlldyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNBbGxvd2VkQWNjZXNzKHJvbGVzQWxsb3dlZDogc3RyaW5nW10gPSBbXSwgY3VycmVudFJvbGVzOiBzdHJpbmdbXSA9IFtdKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1hdGNoaW5nUm9sZSA9IGN1cnJlbnRSb2xlcy5maW5kKCh1c2VyUm9sZSkgPT4ge1xuICAgICAgICByZXR1cm4gcm9sZXNBbGxvd2VkLmZpbmQoKGFsb3dlZFJvbGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gYWxvd2VkUm9sZSA9PT0gdXNlclJvbGU7XG4gICAgICAgIH0pID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWF0Y2hpbmdSb2xlID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjUGVybWlzc2lvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGVjLXBlcm1pc3Npb24uZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1Blcm1pc3Npb25EaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1Blcm1pc3Npb25EaXJlY3RpdmVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQZXJtaXNzaW9uTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRDYXJkTW9kdWxlLCBNYXRDaGlwc01vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVNb2R1bGUgfSBmcm9tICcuLy4uL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjUGVybWlzc2lvbk1vZHVsZSB9IGZyb20gJy4vLi4vLi4vLi4vZGlyZWN0aXZlcy9wZXJtaXNzaW9uL2RlYy1wZXJtaXNzaW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJzLWZpbHRlci9saXN0LXRhYnMtZmlsdGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lTW9kdWxlLFxuICAgIERlY1Blcm1pc3Npb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0xpc3RGaWx0ZXJDb21wb25lbnQsIERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RGaWx0ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0RmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1ncmlkJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93IHdyYXBcIiBbZnhMYXlvdXRHYXBdPVwiaXRlbUdhcFwiID5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgcm93IG9mIHJvd3M7IGxldCBpID0gaW5kZXg7XCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgcm93LCByb3dzLCBpKVwiIFtmeEZsZXhdPVwiaXRlbVdpZHRoXCI+XG4gICAgPGRpdiBbbmdTdHlsZV09XCJ7bWFyZ2luOiBpdGVtR2FwfVwiPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVJlZlwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cm93OiByb3cgfHwge30sIGxpc3Q6IHJvd3MgfHwgW10sIGluZGV4OiBpfVwiXG4gICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGl0ZW1XaWR0aCA9ICcyODBweCc7XG5cbiAgQElucHV0KCkgaXRlbUdhcCA9ICc4cHgnO1xuXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF9yb3dzID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBzZXQgcm93cyh2OiBhbnkpIHtcbiAgICBpZiAodGhpcy5fcm93cyAhPT0gdikge1xuICAgICAgdGhpcy5fcm93cyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uSXRlbUNsaWNrKGV2ZW50LCBpdGVtLCBsaXN0LCBpbmRleCkge1xuXG4gICAgdGhpcy5yb3dDbGljay5lbWl0KHtldmVudCwgaXRlbSwgbGlzdCwgaW5kZXh9KTtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtdGFibGUtY29sdW1uJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50IHtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBwcm9wO1xuXG4gIEBJbnB1dCgpIHRpdGxlID0gJyc7XG5cbiAgQElucHV0KCkgc2V0IGNvbFNwYW4odikge1xuICAgIGNvbnN0IG51bWJlciA9ICt2O1xuICAgIHRoaXMuX2NvbFNwYW4gPSBpc05hTihudW1iZXIpID8gMSA6IG51bWJlcjtcbiAgfVxuXG4gIGdldCBjb2xTcGFuKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbFNwYW47XG4gIH1cblxuICBwcml2YXRlIF9jb2xTcGFuID0gMTtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtdGFibGUtY29sdW1uL2xpc3QtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8bmd4LWRhdGF0YWJsZSAjdGFibGVDb21wb25lbnRcbiAgY29sdW1uTW9kZT1cImZsZXhcIlxuICBoZWFkZXJIZWlnaHQ9XCIyNHB4XCJcbiAgcm93SGVpZ2h0PVwiYXV0b1wiXG4gIFtleHRlcm5hbFNvcnRpbmddPVwidHJ1ZVwiXG4gIFttZXNzYWdlc109XCJ7ZW1wdHlNZXNzYWdlOicnfVwiXG4gIFtyb3dzXT1cInJvd3NcIlxuICAoc29ydCk9XCJvblNvcnQoJGV2ZW50KVwiXG4gIChhY3RpdmF0ZSk9XCJvbkl0ZW1DbGljaygkZXZlbnQpXCI+XG5cbiAgPG5neC1kYXRhdGFibGUtY29sdW1uICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1ucztcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ7e2NvbHVtbi50aXRsZSB8IHRyYW5zbGF0ZX19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbZmxleEdyb3ddPVwiY29sdW1uLmNvbFNwYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wXT1cImNvbHVtbi5wcm9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbc29ydGFibGVdPVwiY29sdW1uLnByb3AgPyB0cnVlIDogZmFsc2VcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cImNvbHVtbi50ZW1wbGF0ZSA/IHRydWUgOiBmYWxzZVwiXG4gICAgICBsZXQtcm93PVwicm93XCJcbiAgICAgIGxldC1pbmRleD1cInJvd0luZGV4XCJcbiAgICAgIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZT5cblxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4udGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3Jvdzogcm93IHx8IHt9LCBsaXN0OiByb3dzIHx8IFtdLCBpbmRleDogaW5kZXh9XCJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cblxuPC9uZ3gtZGF0YXRhYmxlPlxuYCxcbiAgc3R5bGVzOiBbYDo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAub3ZlcmZsb3ctdmlzaWJsZXtvdmVyZmxvdzp2aXNpYmxlIWltcG9ydGFudH06Om5nLWRlZXAgZGF0YXRhYmxlLXNjcm9sbGVye3dpZHRoOjEwMCUhaW1wb3J0YW50fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZS5uby1vdmVyZmxvd3tvdmVyZmxvdzphdXRvfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZS5uby1wYWRkaW5nIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGwgLmRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWx7cGFkZGluZzowfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWhlYWRlcntwYWRkaW5nOjExcHggMTZweH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1oZWFkZXIgLmRhdGF0YWJsZS1oZWFkZXItY2VsbC1sYWJlbHtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGx7Zm9udC1zaXplOjEzcHg7Zm9udC13ZWlnaHQ6NDAwO292ZXJmbG93OmhpZGRlbjttaW4taGVpZ2h0OjEwMCU7ZGlzcGxheTp0YWJsZTstd2Via2l0LXVzZXItc2VsZWN0OmluaXRpYWw7LW1vei11c2VyLXNlbGVjdDppbml0aWFsOy1tcy11c2VyLXNlbGVjdDppbml0aWFsOy1vLXVzZXItc2VsZWN0OmluaXRpYWw7dXNlci1zZWxlY3Q6aW5pdGlhbH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHtwYWRkaW5nOjE2cHg7ZGlzcGxheTp0YWJsZS1jZWxsO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt3b3JkLWJyZWFrOmJyZWFrLWFsbH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbC5jZWxsLXRvcCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHt2ZXJ0aWNhbC1hbGlnbjp0b3B9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtcm93LWRldGFpbHtwYWRkaW5nOjEwcHh9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5zb3J0LWJ0bnt3aWR0aDowO2hlaWdodDowfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuaWNvbi1kb3due2JvcmRlci1sZWZ0OjVweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuaWNvbi11cHtib3JkZXItbGVmdDo1cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjVweCBzb2xpZCB0cmFuc3BhcmVudH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0VGFibGVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCByb3dzKHYpIHtcbiAgICBpZiAodGhpcy5fcm93cyAhPT0gdikge1xuICAgICAgdGhpcy5fcm93cyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBAVmlld0NoaWxkKERhdGF0YWJsZUNvbXBvbmVudCkgdGFibGVDb21wb25lbnQ6IERhdGF0YWJsZUNvbXBvbmVudDtcblxuICBjb2x1bW5zU29ydENvbmZpZzogYW55O1xuXG4gIHByaXZhdGUgX3Jvd3M6IEFycmF5PGFueT4gPSBbXTtcblxuICBAQ29udGVudENoaWxkcmVuKERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCkgY29sdW1uczogUXVlcnlMaXN0PERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudD47XG5cbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIHJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgb25Tb3J0KGV2ZW50KSB7XG5cbiAgICBjb25zdCBzb3J0Q29uZmlnID0gW3tcbiAgICAgIHByb3BlcnR5OiBldmVudC5zb3J0c1swXS5wcm9wLFxuICAgICAgb3JkZXI6IGV2ZW50LnNvcnRzWzBdLmRpci50b1VwcGVyQ2FzZSgpXG4gICAgfV07XG5cbiAgICBpZiAoc29ydENvbmZpZyAhPT0gdGhpcy5jb2x1bW5zU29ydENvbmZpZykge1xuXG4gICAgICB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnID0gc29ydENvbmZpZztcblxuICAgICAgdGhpcy5zb3J0LmVtaXQodGhpcy5jb2x1bW5zU29ydENvbmZpZyk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uSXRlbUNsaWNrKCRldmVudCkge1xuXG4gICAgY29uc3QgZXZlbnQgPSAkZXZlbnQ7XG5cbiAgICBjb25zdCBpdGVtID0gJGV2ZW50LnJvdztcblxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnJvd3M7XG5cbiAgICBjb25zdCBpbmRleCA9ICRldmVudC5yb3cuJCRpbmRleDtcblxuICAgIHRoaXMucm93Q2xpY2suZW1pdCh7ZXZlbnQsIGl0ZW0sIGxpc3QsIGluZGV4fSk7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWdyaWQvbGlzdC1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtdGFibGUvbGlzdC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjTGlzdEZldGNoTWV0aG9kLCBDb3VudFJlcG9ydCB9IGZyb20gJy4vbGlzdC5tb2RlbHMnO1xuaW1wb3J0IHsgRmlsdGVyRGF0YSwgRGVjRmlsdGVyLCBGaWx0ZXJHcm91cHMsIEZpbHRlckdyb3VwIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyIH0gZnJvbSAnLi9saXN0Lm1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0JyxcbiAgdGVtcGxhdGU6IGA8IS0tIENPTVBPTkVOVCBMQVlPVVQgLS0+XG48ZGl2IGNsYXNzPVwibGlzdC1jb21wb25lbnQtd3JhcHBlclwiPlxuICA8ZGl2ICpuZ0lmPVwiZmlsdGVyXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cInJlcG9ydCB8fCBmaWx0ZXJNb2RlID09PSAnY29sbGFwc2UnXCI+XG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICAgICAgPGRpdiBmeEZsZXggY2xhc3M9XCJ0ZXh0LXJpZ2h0XCIgKm5nSWY9XCJ0YWJsZUFuZEdyaWRBcmVTZXQoKVwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInRvZ2dsZUxpc3RNb2RlKClcIj5cbiAgICAgICAgICA8bWF0LWljb24gdGl0bGU9XCJTd2l0Y2ggdG8gdGFibGUgbW9kZVwiIGFyaWEtbGFiZWw9XCJTd2l0Y2ggdG8gdGFibGUgbW9kZVwiIGNvbG9yPVwicHJpbWFyeVwiIGNvbnRyYXN0Rm9udFdpdGhCZyAqbmdJZj1cImxpc3RNb2RlID09PSAnZ3JpZCdcIj52aWV3X2hlYWRsaW5lPC9tYXQtaWNvbj5cbiAgICAgICAgICA8bWF0LWljb24gdGl0bGU9XCJTd2l0Y2ggdG8gZ3JpZCBtb2RlXCIgYXJpYS1sYWJlbD1cIlN3aXRjaCB0byBncmlkIG1vZGVcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgKm5nSWY9XCJsaXN0TW9kZSA9PT0gJ3RhYmxlJ1wiPnZpZXdfbW9kdWxlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgZnhGbGV4PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyTW9kZSA9PSAnY29sbGFwc2UnIHRoZW4gY29sbGFwc2VUZW1wbGF0ZSBlbHNlIHRhYnNUZW1wbGF0ZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjwhLS0gR1JJRCBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjZ3JpZFRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1ncmlkXCI+PC9uZy1jb250ZW50PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUQUJMRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjbGlzdFRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC10YWJsZVwiPjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gRk9PVEVSIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNmb290ZXJUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICA8cCBjbGFzcz1cImxpc3QtZm9vdGVyXCI+XG4gICAge3sgJ2xhYmVsLmFtb3VudC1sb2FkZWQtb2YtdG90YWwnIHxcbiAgICAgIHRyYW5zbGF0ZTp7XG4gICAgICAgIGxvYWRlZDogcmVwb3J0Py5yZXN1bHQ/LnJvd3M/Lmxlbmd0aCxcbiAgICAgICAgdG90YWw6IHJlcG9ydD8ucmVzdWx0Py5jb3VudFxuICAgICAgfVxuICAgIH19XG4gIDwvcD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gQ09MTEFQU0UgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI3RhYnNUZW1wbGF0ZT5cbiAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICAgIDxkaXYgKm5nSWY9XCJsaXN0TW9kZSA9PSAnZ3JpZCcgdGhlbiBncmlkVGVtcGxhdGUgZWxzZSBsaXN0VGVtcGxhdGVcIj48L2Rpdj5cbiAgICA8IS0tIEZPT1RFUiBDT05URU5UIC0tPlxuICAgIDxkaXYgZnhGbGV4PlxuICAgICAgPGRpdiAqbmdJZj1cInNob3dGb290ZXIgJiYgIWxvYWRpbmcgdGhlbiBmb290ZXJUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gTE9BRElORyBTUElOTkVSIC0tPlxuICAgIDxkaXYgZnhGbGV4ICpuZ0lmPVwibG9hZGluZ1wiIGNsYXNzPVwidGV4dC1jZW50ZXIgbG9hZGluZy1zcGlubmVyLXdyYXBwZXJcIj5cbiAgICAgIDxkZWMtc3Bpbm5lcj48L2RlYy1zcGlubmVyPlxuICAgIDwvZGl2PlxuICAgIDwhLS0gTE9BRCBNT1JFIEJVVFRPTiAtLT5cbiAgICA8ZGl2IGZ4RmxleCAqbmdJZj1cIiFpc0xhc3RQYWdlICYmICFsb2FkaW5nICYmICFkaXNhYmxlU2hvd01vcmVCdXR0b25cIiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwic2hvd01vcmUoKVwiPnt7J2xhYmVsLnNob3ctbW9yZScgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gQ09MTEFQU0UgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2NvbGxhcHNlVGVtcGxhdGU+XG4gIDxtYXQtYWNjb3JkaW9uPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBjb2xsYXBzYWJsZUZpbHRlcnMuY2hpbGRyZW5cIj5cbiAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsIChvcGVuZWQpPVwic2VhcmNoQ29sbGFwc2FibGUoZmlsdGVyKVwiPlxuICAgICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxhcHNlLXRpdGxlXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjMycHhcIiBmeExheW91dEFsaWduPVwibGVmdCBjZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgZnhGbGV4PVwiOTZweFwiICpuZ0lmPVwiY291bnRSZXBvcnRcIj5cbiAgICAgICAgICAgICAgPGRlYy1sYWJlbCBbY29sb3JIZXhdPVwiZmlsdGVyLmNvbG9yXCI+e3sgZ2V0Q29sbGFwc2FibGVDb3VudChmaWx0ZXIudWlkKSB9fTwvZGVjLWxhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7eyAnbGFiZWwuJyArIGZpbHRlci5sYWJlbCB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwib3Blbm5lZENvbGxhcHNhYmxlID09PSBmaWx0ZXIudWlkXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWJzVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21hdC1leHBhbnNpb24tcGFuZWw+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbWF0LWFjY29yZGlvbj5cbiAgPGRpdiBjbGFzcz1cImFjY29yZGlvbi1ib3R0b20tbWFyZ2luXCI+PC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtgLmxpc3QtZm9vdGVye2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyfS5saXN0LWNvbXBvbmVudC13cmFwcGVye21pbi1oZWlnaHQ6NzJweH0udGV4dC1yaWdodHt0ZXh0LWFsaWduOnJpZ2h0fS5sb2FkaW5nLXNwaW5uZXItd3JhcHBlcntwYWRkaW5nOjMycHh9LmNvbGxhcHNlLXRpdGxle3dpZHRoOjEwMCV9LmFjY29yZGlvbi1ib3R0b20tbWFyZ2lue21hcmdpbi1ib3R0b206MTAwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcblxuICAvKlxuICAqIGNvdW50UmVwb3J0XG4gICpcbiAgKlxuICAqL1xuICBjb3VudFJlcG9ydDogQ291bnRSZXBvcnQ7XG5cbiAgLypcbiAgKiBmaWx0ZXJNb2RlXG4gICpcbiAgKlxuICAqL1xuICBmaWx0ZXJNb2RlOiAndGFicycgfCAnY29sbGFwc2UnID0gJ3RhYnMnO1xuXG5cbiAgLypcbiAgKiBjb2xsYXBzYWJsZUZpbHRlcnNcbiAgKlxuICAqXG4gICovXG4gIGNvbGxhcHNhYmxlRmlsdGVyczogeyB0YWI6IHN0cmluZywgY2hpbGRyZW46IERlY0xpc3RGaWx0ZXJbXSB9O1xuXG4gIC8qXG4gICAqIGxvYWRpbmdcbiAgICpcbiAgICpcbiAgICovXG4gIHNldCBsb2FkaW5nKHYpIHtcblxuICAgIHRoaXMuX2xvYWRpbmcgPSB2O1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyLmxvYWRpbmcgPSB2O1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgbG9hZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9hZGluZztcbiAgfVxuXG4gIC8qXG4gICAqIGZpbHRlckdyb3Vwc1xuICAgKlxuICAgKlxuICAgKi9cbiAgZ2V0IGZpbHRlckdyb3VwcygpOiBGaWx0ZXJHcm91cHMge1xuICAgIHJldHVybiB0aGlzLmZpbHRlciA/IHRoaXMuZmlsdGVyLmZpbHRlckdyb3VwcyA6IFtdO1xuICB9XG5cbiAgLypcbiAgICogb3Blbm5lZENvbGxhcHNhYmxlXG4gICAqXG4gICAqXG4gICAqL1xuICBvcGVubmVkQ29sbGFwc2FibGU7XG5cbiAgLypcbiAgICogcmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICByZXBvcnQ7XG5cbiAgLypcbiAgICogaXNMYXN0UGFnZVxuICAgKlxuICAgKlxuICAgKi9cbiAgaXNMYXN0UGFnZTogYm9vbGVhbjtcblxuICAvKlxuICAqIHNlbGVjdGVkVGFiXG4gICpcbiAgKlxuICAqL1xuICBzZWxlY3RlZFRhYjogYW55O1xuXG4gIC8qXG4gICogcHJldmlvdXNTZWxlY3RlZFRhYlxuICAqXG4gICpcbiAgKi9cbiAgcHJldmlvdXNTZWxlY3RlZFRhYjogYW55O1xuXG4gIC8qXG4gICAqIGZpbHRlckRhdGFcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyRGF0YTogU3ViamVjdDxGaWx0ZXJEYXRhPiA9IG5ldyBTdWJqZWN0PEZpbHRlckRhdGE+KCk7XG5cbiAgLypcbiAgICogX2xvYWRpbmc7XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9sb2FkaW5nID0gdHJ1ZTtcblxuICAvKlxuICAgKiBjbGVhckFuZFJlbG9hZFJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhckFuZFJlbG9hZFJlcG9ydDtcblxuICAvKlxuICAgKiBmaWx0ZXJTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogcmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcmVhY3RpdmVSZXBvcnQ6IE9ic2VydmFibGU8YW55PjtcblxuICAvKlxuICAgKiByZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHNjcm9sbGFibGVDb250YWluZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsYWJsZUNvbnRhaW5lcjogRWxlbWVudDtcblxuICAvKlxuICAgKiBzY3JvbGxFdmVudEVtaXRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxFdmVudEVtaXRlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIHNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogdGFic0NoYW5nZVN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB0YWJzQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogdGFibGVTb3J0U3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHRhYmxlU29ydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHBheWxvYWRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcGF5bG9hZDogRGVjRmlsdGVyO1xuXG4gIC8qXG4gICAqIF9lbmRwb2ludCBpbnRlcm5hbGxcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2VuZHBvaW50OiBzdHJpbmc7XG5cbiAgLypcbiAgICogY3VzdG9tRmV0Y2hNZXRob2RcbiAgICpcbiAgICogbWV0aG9kIHVzZWQgdG8gZmV0Y2ggZGF0YSBmcm9tIGJhY2stZW5kXG4gICAqL1xuICBASW5wdXQoKSBjdXN0b21GZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kO1xuXG4gIC8qXG4gICAqIGNvbHVtbnNTb3J0Q29uZmlnXG4gICAqXG4gICAqIHVzZWQgdG8gZ2V0IGEgc29ydGVkIGxpc3QgZnJvbSBiYWNrZW5kXG4gICAqIGNhbiBiZSBwYXNlZCB2aWEgYXR0cmlidXRlIHRvIHNvcnQgdGhlIGZpcnN0IGxvYWRcbiAgICovXG4gIEBJbnB1dCgpIGNvbHVtbnNTb3J0Q29uZmlnO1xuXG4gIC8qXG4gICAqIGRpc2FibGVTaG93TW9yZUJ1dHRvblxuICAgKlxuICAgKiB1c2VkIHRvIGhpZGUgdGhlIHNob3cgbW9yZSBidXR0b25cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVTaG93TW9yZUJ1dHRvbjogYm9vbGVhbjtcblxuICAvKlxuICAgKiBlbmRwb2ludFxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGVuZHBvaW50KHY6IHN0cmluZykge1xuXG4gICAgaWYgKHRoaXMuX2VuZHBvaW50ICE9PSB2KSB7XG5cbiAgICAgIHRoaXMuX2VuZHBvaW50ID0gKHZbMF0gJiYgdlswXSA9PT0gJy8nKSA/IHYucmVwbGFjZSgnLycsICcnKSA6IHY7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBlbmRwb2ludCgpOiBzdHJpbmcge1xuXG4gICAgcmV0dXJuIHRoaXMuX2VuZHBvaW50O1xuXG4gIH1cblxuICAvKlxuICAgKiBuYW1lXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2V0IG5hbWUodjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX25hbWUgIT09IHYpIHtcbiAgICAgIHRoaXMuX25hbWUgPSB2O1xuICAgICAgdGhpcy5zZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIC8qXG4gICAqIHJvd3NcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgncm93cycpXG5cbiAgc2V0IHJvd3Mocm93cykge1xuICAgIHRoaXMuc2V0Um93cyhyb3dzKTtcbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLnJlcG9ydCA/IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLypcbiAgICogbGltaXRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpbWl0ID0gMTA7XG5cbiAgLypcbiAgICogc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzXG4gICAqXG4gICAqIFdoZXJlIHRoZSBzY3JvbGwgd2F0Y2hlciBzaG91bGQgYmUgbGlzdGVuaW5nXG4gICAqL1xuICBASW5wdXQoKSBzY3JvbGxhYmxlQ29udGFpbmVyQ2xhc3MgPSAnbWF0LXNpZGVuYXYtY29udGVudCc7XG5cbiAgLypcbiAgICogc2VhcmNoYWJsZVByb3BlcnRpZXNcbiAgICpcbiAgICogUHJvcGVydGllcyB0byBiZSBzZWFyY2hlZCB3aGVuIHVzaW5nIGJhc2ljIHNlYXJjaFxuICAgKi9cbiAgQElucHV0KCkgc2VhcmNoYWJsZVByb3BlcnRpZXM6IHN0cmluZ1tdO1xuXG4gIC8qXG4gICAqIHNob3dGb290ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIHNob3dGb290ZXIgPSB0cnVlO1xuXG4gIC8qXG4gICAqIHBvc3RTZWFyY2hcbiAgICpcbiAgICogVGhpcyBtaWRkbGV3YXJlIGlzIHVzZWQgdG8gdHJpZ2dlciBldmVudHMgYWZ0ZXIgZXZlcnkgc2VhcmNoXG4gICAqL1xuICBAT3V0cHV0KCkgcG9zdFNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIHJvd0NsaWNrXG4gICAqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gYSByb3cgb3IgY2FyZCBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgcm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogZ3JpZFxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0R3JpZENvbXBvbmVudCkgZ3JpZDogRGVjTGlzdEdyaWRDb21wb25lbnQ7XG5cbiAgLypcbiAgICogdGFibGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdFRhYmxlQ29tcG9uZW50KSB0YWJsZTogRGVjTGlzdFRhYmxlQ29tcG9uZW50O1xuXG4gIC8qXG4gICAqIGZpbHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsdGVyOiBEZWNMaXN0RmlsdGVyQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEZpbHRlckNvbXBvbmVudClcbiAgc2V0IGZpbHRlcih2OiBEZWNMaXN0RmlsdGVyQ29tcG9uZW50KSB7XG4gICAgaWYgKHRoaXMuX2ZpbHRlciAhPT0gdikge1xuICAgICAgdGhpcy5fZmlsdGVyID0gdjtcbiAgICAgIHRoaXMuc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGZpbHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVyO1xuICB9XG5cbiAgLypcbiAgICogbGlzdE1vZGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpc3RNb2RlO1xuXG4gIC8qXG4gICAqIGdldExpc3RNb2RlXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBnZXRMaXN0TW9kZSA9ICgpID0+IHtcblxuICAgIGxldCBsaXN0TW9kZSA9IHRoaXMubGlzdE1vZGU7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZFRhYiAmJiB0aGlzLnNlbGVjdGVkVGFiLmxpc3RNb2RlKSB7XG5cbiAgICAgICAgbGlzdE1vZGUgPSB0aGlzLnNlbGVjdGVkVGFiLmxpc3RNb2RlO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxpc3RNb2RlID0gdGhpcy50YWJsZSA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBsaXN0TW9kZTtcblxuICB9XG5cbiAgLypcbiAgICogbmdPbkluaXRcbiAgICpcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHsgfVxuXG4gIC8qXG4gICAqIG5nT25Jbml0XG4gICAqXG4gICAqIFN0YXJ0cyBhIGZyZXNoIGNvbXBvbmVudCBhbmQgcHJlcGFyZSBpdCB0byBydW5cbiAgICpcbiAgICogLSBTdGFydCB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3Vic2NyaWJlIHRvIHRoZSBSZWFjdGl2ZSBSZXBvcnRcbiAgICogLSBTdGFydCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gRW5zdXJlIHVuaXF1ZSBuYW1lXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhdGNoRmlsdGVyRGF0YSgpO1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlTmFtZSgpO1xuICAgIHRoaXMuZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKTtcbiAgfVxuXG4gIC8qXG4gICogbmdBZnRlclZpZXdJbml0XG4gICpcbiAgKiBXYWl0IGZvciB0aGUgc3ViY29tcG9uZW50cyB0byBzdGFydCBiZWZvcmUgcnVuIHRoZSBjb21wb25lbnRcbiAgKlxuICAqIC0gU3RhcnQgd2F0Y2hpbmcgRmlsdGVyXG4gICogLSBEbyB0aGUgZmlyc3QgbG9hZFxuICAqL1xuIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgIHRoaXMud2F0Y2hGaWx0ZXIoKTtcbiAgIHRoaXMuZG9GaXJzdExvYWQoKTtcbiAgIHRoaXMuZGV0ZWN0TGlzdE1vZGUoKTtcbiAgIHRoaXMud2F0Y2hUYWJzQ2hhbmdlKCk7XG4gICB0aGlzLndhdGNoVGFibGVTb3J0KCk7XG4gICB0aGlzLnJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpO1xuICAgdGhpcy53YXRjaFNjcm9sbCgpO1xuICAgdGhpcy53YXRjaFNjcm9sbEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgLypcbiAgICogbmdPbkRlc3Ryb3lcbiAgICpcbiAgICogRGVzdHJveSB3YXRjaGVyIHRvIGZyZWUgbWVlbW9yeSBhbmQgcmVtb3ZlIHVubmVjZXNzYXJ5IHRyaWdnZXJzXG4gICAqXG4gICAqIC0gVW5zdWJzY3JpYmUgZnJvbSB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3RvcCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gU3RvcCB3YXRjaGluZyBGaWx0ZXJcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGwoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ0ZpbHRlcigpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFic0NoYW5nZSgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFibGVTb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIHJlbG9hZENvdW50UmVwb3J0XG4gICAqXG4gICAqL1xuICByZWxvYWRDb3VudFJlcG9ydCgpIHtcblxuICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci5maWx0ZXJzICYmIHRoaXMuZmlsdGVyLmxvYWRDb3VudFJlcG9ydCkge1xuXG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZW5kcG9pbnRbdGhpcy5lbmRwb2ludC5sZW5ndGggLSAxXSA9PT0gJy8nID8gYCR7dGhpcy5lbmRwb2ludH1jb3VudGAgOiBgJHt0aGlzLmVuZHBvaW50fS9jb3VudGA7XG5cbiAgICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmZpbHRlci5maWx0ZXJzO1xuXG4gICAgICBjb25zdCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzID0gdGhpcy5nZXRDb3VudGFibGVGaWx0ZXJzKGZpbHRlcnMpO1xuXG4gICAgICB0aGlzLnNlcnZpY2UucG9zdChlbmRwb2ludCwgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcylcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICB0aGlzLmNvdW50UmVwb3J0ID0gdGhpcy5tb3VudENvdW50UmVwb3J0KHJlcyk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIuY291bnRSZXBvcnQgPSB0aGlzLmNvdW50UmVwb3J0O1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBtb3VudENvdW50UmVwb3J0KGZpbHRlcnNDb3VudGVycyk6IENvdW50UmVwb3J0IHtcblxuICAgIGNvbnN0IGNvdW50UmVwb3J0OiBDb3VudFJlcG9ydCA9IHtcbiAgICAgIGNvdW50OiAwXG4gICAgfTtcblxuICAgIGZpbHRlcnNDb3VudGVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuXG4gICAgICBjb3VudFJlcG9ydFtpdGVtLnVpZF0gPSB7XG5cbiAgICAgICAgY291bnQ6IGl0ZW0uY291bnRcblxuICAgICAgfTtcblxuICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcblxuICAgICAgICBjb3VudFJlcG9ydFtpdGVtLnVpZF0uY2hpbGRyZW4gPSB0aGlzLm1vdW50Q291bnRSZXBvcnQoaXRlbS5jaGlsZHJlbik7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdW50UmVwb3J0O1xuXG4gIH1cblxuICAvKlxuICAgKiByZW1vdmVJdGVtXG4gICAqXG4gICAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBsaXN0XG4gICAqL1xuICByZW1vdmVJdGVtKGlkKSB7XG5cbiAgICBjb25zdCBpdGVtID0gdGhpcy5yb3dzLmZpbmQoX2l0ZW0gPT4gX2l0ZW0uaWQgPT09IGlkKTtcblxuICAgIGlmIChpdGVtKSB7XG5cbiAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMucm93cy5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbUluZGV4ID49IDApIHtcblxuICAgICAgICB0aGlzLnJvd3Muc3BsaWNlKGl0ZW1JbmRleCwgMSk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmICh0aGlzLmVuZHBvaW50KSB7XG5cbiAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogcmVzdGFydFxuICAgKlxuICAgKiBDbGVhciB0aGUgbGlzdCBhbmQgcmVsb2FkIHRoZSBmaXJzdCBwYWdlXG4gICAqL1xuICByZXN0YXJ0KCkge1xuXG4gICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpO1xuXG4gIH1cblxuICAvKlxuICAgKiBzaG93TW9yZVxuICAgKlxuICAgKi9cbiAgc2hvd01vcmUoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkUmVwb3J0KCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNlYXJjaENvbGxhcHNhYmxlXG4gICAqXG4gICAqIHNlYXJjaCBieSBjb2xsYXBzYWJsZSBmaWx0ZXJcbiAgICovXG4gIHNlYXJjaENvbGxhcHNhYmxlKGZpbHRlcjogRGVjTGlzdEZpbHRlcikge1xuXG4gICAgaWYgKHRoaXMub3Blbm5lZENvbGxhcHNhYmxlICE9PSBmaWx0ZXIudWlkKSB7XG5cbiAgICAgIHRoaXMubG9hZEJ5T3Blbm5lZENvbGxhcHNlKGZpbHRlci51aWQpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB0YWJsZUFuZEdyaWRBcmVTZXRcbiAgICpcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlcmUgYXJlIGJvdGggR1JJRCBhbmQgVEFCTEUgZGVmaW5pdGlvbiBpbnNpZGUgdGhlIGxpc3RcbiAgICovXG4gIHRhYmxlQW5kR3JpZEFyZVNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkICYmIHRoaXMudGFibGU7XG4gIH1cblxuICAvKlxuICAgKiB0b2dnbGVMaXN0TW9kZVxuICAgKlxuICAgKiBDaGFuZ2VzIGJldHdlZW4gR1JJRCBhbmQgVEFCTEUgdmlzdWFsaXphdG9pbiBtb2Rlc1xuICAgKi9cbiAgdG9nZ2xlTGlzdE1vZGUoKSB7XG5cbiAgICB0aGlzLmxpc3RNb2RlID0gdGhpcy5saXN0TW9kZSA9PT0gJ2dyaWQnID8gJ3RhYmxlJyA6ICdncmlkJztcblxuICAgIGlmICh0aGlzLmxpc3RNb2RlID09PSAndGFibGUnKSB7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgIHRoaXMudGFibGUudGFibGVDb21wb25lbnQucmVjYWxjdWxhdGUoKTtcblxuICAgICAgfSwgMSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGdldENvbGxhcHNhYmxlQ291bnRcbiAgICpcbiAgICogZ2V0IENvbGxhcHNhYmxlIENvdW50IGZyb20gY291bnRSZXBvcnRcbiAgICovXG4gIGdldENvbGxhcHNhYmxlQ291bnQodWlkKSB7XG5cbiAgICB0cnkge1xuXG4gICAgICByZXR1cm4gdGhpcy5jb3VudFJlcG9ydFt0aGlzLnNlbGVjdGVkVGFiXS5jaGlsZHJlblt1aWRdLmNvdW50O1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgICAgcmV0dXJuICc/JztcblxuICAgIH1cblxuXG4gIH1cblxuICAvKlxuICAgKiBnZXRDb3VudGFibGVGaWx0ZXJzXG4gICAqXG4gICAqIEdldCB0aGUgc2VhcmNoIGZpbHRlciwgdHJuc2Zvcm1lIHRoZSBzZWFyY2ggcGFyYW1zIGludG8gdGhlIHNlYXJjaGFibGUgcHJvcGVydGllcyBhbmQgaW5qZWN0IGl0IGluIGV2ZXJ5IGZpbHRlciBjb25maWd1cmVkIGluIGRlYy1maWx0ZXJzXG4gICAqXG4gICAqIFRoZSByZXN1bHQgaXMgdXNlZCB0byBjYWxsIHRoZSBjb3VudCBlbmRwb2ludCBhbmQgcmV0dXJuIHRoZSBhbW91bnQgb2YgcmVjY29yZHMgZm91bmQgaW4gZXZlcnkgdGFiL2NvbGxhcHNlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGdldENvdW50YWJsZUZpbHRlcnMoZmlsdGVycykge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHNXaXRob3V0VGFicyB8fCBbe2ZpbHRlcnM6IFtdfV07XG5cbiAgICBjb25zdCBmaWx0ZXJzUGx1c1NlYXJjaCA9IGZpbHRlcnMubWFwKGRlY0ZpbHRlciA9PiB7XG5cbiAgICAgIGNvbnN0IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkZWNGaWx0ZXIpKTtcblxuICAgICAgaWYgKGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMpIHtcblxuICAgICAgICBjb25zdCB0YWJGaWx0ZXJzQ29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycykpO1xuXG4gICAgICAgIGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzKSk7XG5cbiAgICAgICAgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycy5mb3JFYWNoKGZpbHRlckdyb3VwID0+IHtcblxuICAgICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMucHVzaCguLi50YWJGaWx0ZXJzQ29weSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSBpZiAoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4pIHtcblxuICAgICAgICBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5jaGlsZHJlbiA9IHRoaXMuZ2V0Q291bnRhYmxlRmlsdGVycyhkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5jaGlsZHJlbik7XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdWlkOiBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC51aWQsXG4gICAgICAgIGZpbHRlcnM6IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMsXG4gICAgICAgIGNoaWxkcmVuOiBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5jaGlsZHJlbixcbiAgICAgIH07XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmVuc3VyZUZpbHRlclZhbHVlc0FzQXJyYXkoZmlsdGVyc1BsdXNTZWFyY2gpO1xuXG4gIH1cblxuICAvKlxuICAgKiBlbnN1cmVGaWx0ZXJWYWx1ZXNBc0FycmF5XG4gICAqXG4gICAqIEdldCBhbiBhcnJheSBvZiBmaWx0ZXJncm91cHMgYW5kIHNldCB0aGUgZmlsdGVyIHZhbHVlcyB0byBhcnJheSBpZiBub3RcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZW5zdXJlRmlsdGVyVmFsdWVzQXNBcnJheShmaWx0ZXJHcm91cHM6IGFueSA9IFtdKSB7XG5cbiAgICByZXR1cm4gZmlsdGVyR3JvdXBzLm1hcChkZWNMaXN0RmlsdGVyID0+IHtcblxuICAgICAgaWYgKGRlY0xpc3RGaWx0ZXIuZmlsdGVycykge1xuXG4gICAgICAgIHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKGRlY0xpc3RGaWx0ZXIuZmlsdGVycyk7XG5cbiAgICAgICAgZGVjTGlzdEZpbHRlci5maWx0ZXJzID0gZGVjTGlzdEZpbHRlci5maWx0ZXJzLm1hcChmaWx0ZXJHcm91cCA9PiB7XG5cblxuICAgICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMgPSBmaWx0ZXJHcm91cC5maWx0ZXJzLm1hcChmaWx0ZXIgPT4ge1xuXG4gICAgICAgICAgICBmaWx0ZXIudmFsdWUgPSBBcnJheS5pc0FycmF5KGZpbHRlci52YWx1ZSkgPyBmaWx0ZXIudmFsdWUgOiBbZmlsdGVyLnZhbHVlXTtcblxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGZpbHRlckdyb3VwO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWNMaXN0RmlsdGVyO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGFjdEJ5U2Nyb2xsUG9zaXRpb25cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZGV0ZWN0IGlmIHRoZXJlIGlzIHNjcm9vbGluZyBhY3Rpb24gb24gd2luZG93IHRvIGZldGNoIGFuZCBzaG93IG1vcmUgcm93cyB3aGVuIHRoZSBzY3JvbGxpbmcgZG93bi5cbiAgICovXG4gIHByaXZhdGUgYWN0QnlTY3JvbGxQb3NpdGlvbiA9ICgkZXZlbnQpID0+IHtcblxuICAgIGlmICgkZXZlbnRbJ3BhdGgnXSkge1xuXG4gICAgICBjb25zdCBlbGVtZW50V2l0aENka092ZXJsYXlDbGFzcyA9ICRldmVudFsncGF0aCddLmZpbmQocGF0aCA9PiB7XG5cbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gcGF0aFsnY2xhc3NOYW1lJ10gfHwgJyc7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3ZlcmxheSA9IGNsYXNzTmFtZS5pbmRleE9mKCdjZGstb3ZlcmxheScpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlRnVsbHNjcmVhbkRpYWxvZ0NvbnRhaW5lciA9IGNsYXNzTmFtZS5pbmRleE9mKCdmdWxsc2NyZWFuLWRpYWxvZy1jb250YWluZXInKSA+PSAwO1xuXG4gICAgICAgIHJldHVybiBpbnNpZGVPdmVybGF5IHx8IGluc2lkZUZ1bGxzY3JlYW5EaWFsb2dDb250YWluZXI7XG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWVsZW1lbnRXaXRoQ2RrT3ZlcmxheUNsYXNzKSB7IC8vIGF2b2lkIGNsb3NpbmcgZmlsdGVyIGZyb20gYW55IG9wZW4gZGlhbG9nXG5cbiAgICAgICAgaWYgKCF0aGlzLmlzTGFzdFBhZ2UpIHtcblxuICAgICAgICAgIGNvbnN0IHRhcmdldDogYW55ID0gJGV2ZW50Wyd0YXJnZXQnXTtcblxuICAgICAgICAgIGNvbnN0IGxpbWl0ID0gdGFyZ2V0LnNjcm9sbEhlaWdodCAtIHRhcmdldC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICBpZiAodGFyZ2V0LnNjcm9sbFRvcCA+PSAobGltaXQgLSAxNikpIHtcblxuICAgICAgICAgICAgdGhpcy5zaG93TW9yZSgpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogZGV0ZWN0TGlzdE1vZGVcbiAgICpcbiAgICogU2V0IHRoZSBsaXN0IG1vZGUgYmFzZWQgb24gZmlsdGVyVGFicyBjb25maWd1cmF0aW9uIG9yIGN1c3RvbSBmdW5jdGlvbiBvdmVycmlkZGVuIGJ5IGdldExpc3RNb2RlIGlucHV0XG4gICAqL1xuICBwcml2YXRlIGRldGVjdExpc3RNb2RlKCkge1xuXG4gICAgdGhpcy5saXN0TW9kZSA9IHRoaXMuZ2V0TGlzdE1vZGUoKTtcblxuICB9XG5cbiAgLypcbiAgICogZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKVxuICAgKlxuICAgKiBTZXQgdGhlIGxpc3QgbW9kZSBiYXNlZCBvbiBkZWNsYXJhdGlvbiBvZiB0YWJsZSBhbmQgZ3JpZC4gVGhpcyBpcyBuZWNlc3NhcnkgdG8gYm9vdGFzdHJhcCB0aGUgY29tcG9uZW50IHdpdGggb25seSBncmlkIG9yIG9ubHkgdGFibGVcbiAgICogVGhpcyBvbmx5IHdvcmsgaWYgbm8gbW9kZSBpcyBwcm92aWRlZCBieSBASW5wdXQgb3RoZXJ3aXNlIHRoZSBASW5wdXQgdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAqL1xuICBwcml2YXRlIGRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKCkge1xuXG4gICAgdGhpcy5saXN0TW9kZSA9IHRoaXMubGlzdE1vZGUgPyB0aGlzLmxpc3RNb2RlIDogdGhpcy50YWJsZSA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGVtaXRTY3JvbGxFdmVudFxuICAgKlxuICAgKiBFbWl0cyBzY3JvbGwgZXZlbnQgd2hlbiBub3QgbG9hZGluZ1xuICAgKi9cbiAgcHJpdmF0ZSBlbWl0U2Nyb2xsRXZlbnQgPSAoJGV2ZW50KSA9PiB7XG5cbiAgICBpZiAoIXRoaXMubG9hZGluZykge1xuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyLmVtaXQoJGV2ZW50KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogaXNUYWJzRmlsdGVyRGVmaW5lZFxuICAgKlxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgVGFicyBGaWx0ZXIgaXMgZGVmaW5lZCBpbnNpZGUgdGhlIGxpc3RcbiAgICovXG4gIHByaXZhdGUgaXNUYWJzRmlsdGVyRGVmaW5lZCgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIC8qXG4gICAqIGRvRmlyc3RMb2FkXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhZnRlciB0aGUgdmlldyBhbmQgaW5wdXRzIGFyZSBpbml0aWFsaXplZFxuICAgKlxuICAgKiBUaGlzIGlzIHRoZSBmaXJzdCBjYWxsIHRvIGdldCBkYXRhXG4gICAqL1xuICBwcml2YXRlIGRvRmlyc3RMb2FkKCkge1xuICAgIGlmICh0aGlzLmlzVGFic0ZpbHRlckRlZmluZWQoKSkge1xuICAgICAgdGhpcy5kb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvRmlyc3RMb2FkTG9jYWxseSh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlclxuICAgKlxuICAgKiB1c2UgdGhlIHRhYnMgZmlsdGVyIHRvIHRyaWdnZXIgdGhlIGZpcnN0IGxvYWRcbiAgICpcbiAgICogVGhpcyB3YXkgdGhlIGRlZmF1bHQgdGFiIGFuZCBmaWx0ZXIgYXJlIHNlbGVjdGVkIGJ5IHRoZSBkZWN0YWJzRmlsdGVyIGNvbXBvbmVudFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlcigpIHtcbiAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LmRvRmlyc3RMb2FkKCk7XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZExvY2FsbHlcbiAgICpcbiAgICogSWYgbm8gZmlsdGVyIGFyZSBkZWZpbmVkLCBqdXN0IGNhbGwgdGggZWVuZHBvaW50IHdpdGhvdXQgZmlsdGVyc1xuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZExvY2FsbHkocmVmcmVzaCkge1xuICAgIHRoaXMubG9hZFJlcG9ydChyZWZyZXNoKTtcbiAgfVxuXG4gIC8qXG4gICAqIGVuc3VyZVVuaXF1ZU5hbWVcbiAgICpcbiAgICogV2UgbXVzdCBwcm92aWRlIGFuIHVuaXF1ZSBuYW1lIHRvIHRoZSBsaXN0IHNvIHdlIGNhbiBwZXJzaXN0IGl0cyBzdGF0ZSBpbiB0aGUgVVJMIHdpdGhvdXQgY29uZmxpY3RzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVuc3VyZVVuaXF1ZU5hbWUoKSB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gJ0xpc3RDb21wb25lbnRFcnJvcjogVGhlIGxpc3QgY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZSB0byBiZSB1c2VkIGluIHVybCBmaWx0ZXIuJ1xuICAgICAgKyAnIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50Lic7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRCeU9wZW5uZWRDb2xsYXBzZVxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyB0cmlnZ2VyZWQgd2hlbiBhIGNvbGxhcHNhYmxlIHRhYmxlIGlzIG9wZW4uXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGxvYWRCeU9wZW5uZWRDb2xsYXBzZShmaWx0ZXJVaWQpIHtcblxuICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzLmNoaWxkcmVuLmZpbmQoaXRlbSA9PiBpdGVtLnVpZCA9PT0gZmlsdGVyVWlkKTtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwOiBGaWx0ZXJHcm91cCA9IHsgZmlsdGVyczogZmlsdGVyLmZpbHRlcnMgfTtcblxuICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlLCBmaWx0ZXJHcm91cCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5vcGVubmVkQ29sbGFwc2FibGUgPSBmaWx0ZXIudWlkO1xuXG4gICAgfSwgMCk7XG5cblxuICB9XG5cbiAgLypcbiAgICogbG9hZFJlcG9ydFxuICAgKlxuICAgKiBUaGlzIG1laHRvZCBnYXRoZXIgdGhlIGZpbHRlciBpbmZvIGFuZCBlbmRwb2ludCBhbmQgY2FsbCB0aGUgYmFjay1lbmQgdG8gZmV0Y2ggdGhlIGRhdGFcbiAgICpcbiAgICogSWYgdGhlIHN1Y3RvbUZldGNoTWV0aG9kIGlzIHVzZWQsIGl0cyBjYWxsIGl0XG4gICAqXG4gICAqIElmIG9ubHkgdGhlIHJvd3MgYXJlIHBhc3NlZCwgdGhlIG1ldGhvZCBqdXN0IHVzZSBpdCBhcyByZXN1bHRcbiAgICovXG4gIHByaXZhdGUgbG9hZFJlcG9ydChjbGVhckFuZFJlbG9hZFJlcG9ydD86IGJvb2xlYW4sIGNvbGxhcHNlRmlsdGVyR3JvdXBzPzogRmlsdGVyR3JvdXApOiBQcm9taXNlPGFueT4ge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICBpZiAoY2xlYXJBbmRSZWxvYWRSZXBvcnQgJiYgdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgdGhpcy5zZXRSb3dzKHRoaXMucm93cyk7XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5jbGVhckFuZFJlbG9hZFJlcG9ydCA9IGNsZWFyQW5kUmVsb2FkUmVwb3J0O1xuXG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICBpZiAodGhpcy5lbmRwb2ludCkge1xuXG4gICAgICAgIHRoaXMubW91bnRQYXlsb2FkKGNsZWFyQW5kUmVsb2FkUmVwb3J0LCBjb2xsYXBzZUZpbHRlckdyb3VwcylcbiAgICAgICAgLnRoZW4ocGF5bG9hZCA9PiB7XG5cbiAgICAgICAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkO1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm5leHQoeyBlbmRwb2ludDogdGhpcy5lbmRwb2ludCwgcGF5bG9hZDogdGhpcy5wYXlsb2FkLCBjYms6IHJlcywgY2xlYXI6IGNsZWFyQW5kUmVsb2FkUmVwb3J0IH0pO1xuXG4gICAgICAgIH0pO1xuXG5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21GZXRjaE1ldGhvZCkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRGF0YS5uZXh0KCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMucm93cykge1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLnJvd3MpIHtcblxuICAgICAgICAgICAgcmVqKCdObyBlbmRwb2ludCwgY3VzdG9tRmV0Y2hNZXRob2Qgb3Igcm93cyBzZXQnKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIH0sIDEpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBtb3VudFBheWxvYWQoY2xlYXJBbmRSZWxvYWRSZXBvcnQ6IGJvb2xlYW4gPSBmYWxzZSwgY29sbGFwc2VGaWx0ZXJHcm91cHM/KSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBjb25zdCBzZWFyY2hGaWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlciA/IHRoaXMuZmlsdGVyLmZpbHRlckdyb3VwcyA6IHVuZGVmaW5lZDtcblxuICAgICAgY29uc3QgZmlsdGVyR3JvdXBzID0gdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cChzZWFyY2hGaWx0ZXJHcm91cHMsIGNvbGxhcHNlRmlsdGVyR3JvdXBzKTtcblxuICAgICAgY29uc3QgcGF5bG9hZDogRGVjRmlsdGVyID0ge307XG5cbiAgICAgIHBheWxvYWQubGltaXQgPSB0aGlzLmxpbWl0O1xuXG4gICAgICBpZiAoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICAgICAgcGF5bG9hZC5maWx0ZXJHcm91cHMgPSBmaWx0ZXJHcm91cHM7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgICBwYXlsb2FkLnNvcnQgPSB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnO1xuXG4gICAgICB9XG5cbiAgICAgIGlmICghY2xlYXJBbmRSZWxvYWRSZXBvcnQgJiYgdGhpcy5yZXBvcnQpIHtcblxuICAgICAgICBwYXlsb2FkLnBhZ2UgPSB0aGlzLnJlcG9ydC5wYWdlICsgMTtcblxuICAgICAgICBwYXlsb2FkLmxpbWl0ID0gdGhpcy5yZXBvcnQubGltaXQ7XG5cbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZShwYXlsb2FkKTtcblxuICAgIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBhcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cFxuICAgKlxuICAgKiBHZXRzIGFuIGFycmF5IG9mIGZpbHRlckdyb3VwIGFuZCBpbiBlYWNoIGZpbHRlckdyb3VwIGluIHRoaXMgYXJyYXkgYXBwZW5kcyB0aGUgc2Vjb25kIGZpbHRlckdyb3VwIGZpbHRlcnMuXG4gICAqL1xuICBwcml2YXRlIGFwcGVuZEZpbHRlckdyb3Vwc1RvRWFjaEZpbHRlckdyb3VwKGZpbHRlckdyb3VwczogRmlsdGVyR3JvdXBzLCBmaWx0ZXJHcm91cFRvQXBwZW5kOiBGaWx0ZXJHcm91cCkge1xuXG4gICAgaWYgKGZpbHRlckdyb3VwVG9BcHBlbmQpIHtcblxuICAgICAgaWYgKGZpbHRlckdyb3VwcyAmJiBmaWx0ZXJHcm91cHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIGZpbHRlckdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IHtcblxuICAgICAgICAgIGdyb3VwLmZpbHRlcnMucHVzaCguLi5maWx0ZXJHcm91cFRvQXBwZW5kLmZpbHRlcnMpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZpbHRlckdyb3VwcyA9IFtmaWx0ZXJHcm91cFRvQXBwZW5kXTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlckdyb3VwcyB8fCBbXTtcblxuICB9XG5cbiAgLypcbiAgICogc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpIHtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5uYW1lID0gdGhpcy5uYW1lO1xuXG5cbiAgICAgIGlmICh0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5uYW1lID0gdGhpcy5uYW1lO1xuXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZldGNoTWV0aG9kKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LmN1c3RvbUZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5zZXJ2aWNlID0gdGhpcy5zZXJ2aWNlO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogc2V0Um93c1xuICAgKlxuICAgKiBTZXRzIHRoZSBjdXJyZW50IHRhYmxlIHJvd3NcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2V0Um93cyhyb3dzID0gW10pIHtcblxuICAgIHRoaXMucmVwb3J0ID0ge1xuXG4gICAgICBwYWdlOiAxLFxuXG4gICAgICByZXN1bHQ6IHtcblxuICAgICAgICByb3dzOiByb3dzLFxuXG4gICAgICAgIGNvdW50OiByb3dzLmxlbmd0aFxuXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZGV0ZWN0TGFzdFBhZ2Uocm93cywgcm93cy5sZW5ndGgpO1xuXG4gICAgdGhpcy51cGRhdGVDb250ZW50Q2hpbGRyZW4oKTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyKCkge1xuXG4gICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbiA9IHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJcbiAgICAucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgxNTApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICkuc3Vic2NyaWJlKHRoaXMuYWN0QnlTY3JvbGxQb3NpdGlvbik7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbikge1xuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyRGF0YVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEZpbHRlckRhdGEoKSB7XG4gICAgdGhpcy5yZWFjdGl2ZVJlcG9ydCA9IHRoaXMuZmlsdGVyRGF0YVxuICAgIC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDE1MCksIC8vIGF2b2lkIG11aWx0aXBsZSByZXF1ZXN0IHdoZW4gdGhlIGZpbHRlciBvciB0YWIgY2hhbmdlIHRvbyBmYXN0XG4gICAgICBzd2l0Y2hNYXAoKGZpbHRlckRhdGE6IEZpbHRlckRhdGEpID0+IHtcblxuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHVuZGVmaW5lZCk7XG5cbiAgICAgICAgY29uc3QgZmV0Y2hNZXRob2Q6IERlY0xpc3RGZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QgfHwgdGhpcy5zZXJ2aWNlLmdldDtcblxuICAgICAgICBjb25zdCBlbmRwb2ludCA9IGZpbHRlckRhdGEgPyBmaWx0ZXJEYXRhLmVuZHBvaW50IDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGNvbnN0IHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMgPSB0aGlzLmdldFBheWxvYWRXaXRoU2VhcmNoVHJhbnNmb3JtZWRJbnRvU2VhcmNoYWJsZVByb3BlcnRpZXModGhpcy5wYXlsb2FkKTtcblxuICAgICAgICBpZiAoZmlsdGVyRGF0YSAmJiBmaWx0ZXJEYXRhLmNsZWFyKSB7XG4gICAgICAgICAgdGhpcy5zZXRSb3dzKFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZldGNoTWV0aG9kKGVuZHBvaW50LCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzKVxuICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICBvYnNlcnZhYmxlLm5leHQocmVzKTtcblxuICAgICAgICAgIGlmIChmaWx0ZXJEYXRhICYmIGZpbHRlckRhdGEuY2JrKSB7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyB3YWl0IGZvciBzdWJzY3JpYmVycyB0byByZWZyZXNoIHRoZWlyIHJvd3NcblxuICAgICAgICAgICAgICBmaWx0ZXJEYXRhLmNiayhuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG5cbiAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgICB9KVxuXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcyhwYXlsb2FkKSB7XG5cbiAgICBjb25zdCBwYXlsb2FkQ29weSA9IHsuLi5wYXlsb2FkfTtcblxuICAgIGlmIChwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMgJiYgdGhpcy5zZWFyY2hhYmxlUHJvcGVydGllcykge1xuXG4gICAgICBwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMgPSBbLi4ucGF5bG9hZC5maWx0ZXJHcm91cHNdO1xuXG4gICAgICB0aGlzLmFwcGVuZEZpbHRlckdyb3Vwc0Jhc2VkT25TZWFyY2hhYmxlUHJvcGVydGllcyhwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMpO1xuXG4gICAgICByZXR1cm4gcGF5bG9hZENvcHk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5wYXlsb2FkO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGFwcGVuZEZpbHRlckdyb3Vwc0Jhc2VkT25TZWFyY2hhYmxlUHJvcGVydGllcyhmaWx0ZXJHcm91cHMpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2ggPSB0aGlzLmdldEZpbHRlckdyb3VwVGhhdENvbnRhaW5zVGhlQmFzaWNTZWFyY2goZmlsdGVyR3JvdXBzKTtcblxuICAgIGlmIChmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKSB7XG5cbiAgICAgIHRoaXMucmVtb3ZlRmlsdGVyR3JvdXAoZmlsdGVyR3JvdXBzLCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKTtcblxuICAgICAgY29uc3QgYmFzaWNTZWFyY2ggPSBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnByb3BlcnR5ID09PSAnc2VhcmNoJyk7XG5cbiAgICAgIGNvbnN0IGJhc2ljU2VhcmNoSW5kZXggPSBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZpbHRlcnMuaW5kZXhPZihiYXNpY1NlYXJjaCk7XG5cbiAgICAgIHRoaXMuc2VhcmNoYWJsZVByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG5cbiAgICAgICAgY29uc3QgbmV3RmlsdGVyR3JvdXA6IEZpbHRlckdyb3VwID0ge1xuICAgICAgICAgIGZpbHRlcnM6IFsuLi5maWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoLmZpbHRlcnNdXG4gICAgICAgIH07XG5cbiAgICAgICAgbmV3RmlsdGVyR3JvdXAuZmlsdGVyc1tiYXNpY1NlYXJjaEluZGV4XSA9IHtcbiAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgdmFsdWU6IFtiYXNpY1NlYXJjaC52YWx1ZV1cbiAgICAgICAgfTtcblxuICAgICAgICBmaWx0ZXJHcm91cHMucHVzaChuZXdGaWx0ZXJHcm91cCk7XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUZpbHRlckdyb3VwKGZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCkge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaEluZGV4ID0gZmlsdGVyR3JvdXBzLmluZGV4T2YoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCk7XG5cbiAgICBmaWx0ZXJHcm91cHMuc3BsaWNlKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2hJbmRleCwgMSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyR3JvdXBUaGF0Q29udGFpbnNUaGVCYXNpY1NlYXJjaChmaWx0ZXJHcm91cHMpIHtcblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMuZmluZChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgIGNvbnN0IGJhc2ljU2VyY2hGaWx0ZXIgPSBmaWx0ZXJHcm91cC5maWx0ZXJzID8gZmlsdGVyR3JvdXAuZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIucHJvcGVydHkgPT09ICdzZWFyY2gnKSA6IHVuZGVmaW5lZDtcblxuICAgICAgcmV0dXJuIGJhc2ljU2VyY2hGaWx0ZXIgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCkge1xuICAgIHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnJlYWN0aXZlUmVwb3J0XG4gICAgLnBpcGUoXG4gICAgICB0YXAocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcbiAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgJiYgZGF0YS5yZXN1bHQgJiYgZGF0YS5yZXN1bHQucm93cykge1xuXG4gICAgICAgIGlmICghdGhpcy5jbGVhckFuZFJlbG9hZFJlcG9ydCkge1xuICAgICAgICAgIGRhdGEucmVzdWx0LnJvd3MgPSB0aGlzLnJlcG9ydC5yZXN1bHQucm93cy5jb25jYXQoZGF0YS5yZXN1bHQucm93cyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcG9ydCA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5wb3N0U2VhcmNoLmVtaXQoZGF0YSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb250ZW50Q2hpbGRyZW4oKTtcblxuICAgICAgICB0aGlzLmRldGVjdExhc3RQYWdlKGRhdGEucmVzdWx0LnJvd3MsIGRhdGEucmVzdWx0LmNvdW50KTtcblxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0TGFzdFBhZ2Uocm93cywgY291bnQpIHtcblxuICAgIGNvbnN0IG51bWJlck9mcm93cyA9IHJvd3MubGVuZ3RoO1xuXG4gICAgY29uc3QgZW1wdExpc3QgPSBudW1iZXJPZnJvd3MgPT09IDA7XG5cbiAgICBjb25zdCBzaW5nbGVQYWdlTGlzdCA9IG51bWJlck9mcm93cyA9PT0gY291bnQ7XG5cbiAgICB0aGlzLmlzTGFzdFBhZ2UgPSBlbXB0TGlzdCB8fCBzaW5nbGVQYWdlTGlzdDtcblxuICB9XG5cbiAgLypcbiAgICogdW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpIHtcbiAgICBpZiAodGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHVwZGF0ZUNvbnRlbnRDaGlsZHJlblxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVDb250ZW50Q2hpbGRyZW4oKSB7XG5cbiAgICBjb25zdCByb3dzID0gdGhpcy5lbmRwb2ludCA/IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzIDogdGhpcy5yb3dzO1xuICAgIGlmICh0aGlzLmdyaWQpIHtcbiAgICAgIHRoaXMuZ3JpZC5yb3dzID0gcm93cztcbiAgICB9XG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMudGFibGUucm93cyA9IHJvd3M7XG4gICAgfVxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIuY291bnQgPSB0aGlzLnJlcG9ydC5yZXN1bHQuY291bnQ7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogcmVnaXN0ZXJDaGlsZFdhdGNoZXJzXG4gICAqXG4gICAqIFdhdGNoIGZvciBjaGlsZHJlbiBvdXRwdXRzXG4gICAqL1xuICBwcml2YXRlIHJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpIHtcblxuICAgIGlmICh0aGlzLmdyaWQpIHtcbiAgICAgIHRoaXMud2F0Y2hHcmlkUm93Q2xpY2soKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgdGhpcy53YXRjaFRhYmxlUm93Q2xpY2soKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoR3JpZFJvd0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoR3JpZFJvd0NsaWNrKCkge1xuICAgIHRoaXMuZ3JpZC5yb3dDbGljay5zdWJzY3JpYmUoKCRldmVudCkgPT4ge1xuICAgICAgdGhpcy5yb3dDbGljay5lbWl0KCRldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFRhYmxlUm93Q2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVJvd0NsaWNrKCkge1xuICAgIHRoaXMudGFibGUucm93Q2xpY2suc3Vic2NyaWJlKCgkZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucm93Q2xpY2suZW1pdCgkZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyLnNlYXJjaC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhYkNoYW5nZWQgPSB0aGlzLnByZXZpb3VzU2VsZWN0ZWRUYWIgIT09IHRoaXMuc2VsZWN0ZWRUYWI7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyTW9kZUNoYW5nZWQgPSB0aGlzLmZpbHRlck1vZGUgIT09IGV2ZW50LmZpbHRlck1vZGU7XG5cbiAgICAgICAgaWYgKHRhYkNoYW5nZWQpIHtcblxuICAgICAgICAgIHRoaXMucHJldmlvdXNTZWxlY3RlZFRhYiA9IHRoaXMuc2VsZWN0ZWRUYWI7XG5cbiAgICAgICAgICB0aGlzLnNldFJvd3MoW10pOyAvLyBpZiBjaGFuZ2luZyB0YWJzLCBjbGVhciB0aGUgcmVzdWx0cyBiZWZvcmUgc2hvd2luZyB0aGUgcm93cyBiZWNhdXNlIGl0IGlzIGRvbmUgb25seSBhZnRlciBmZXRjaGluZyB0aGUgZGF0YVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsdGVyTW9kZUNoYW5nZWQpIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyTW9kZSA9IGV2ZW50LmZpbHRlck1vZGU7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlck1vZGUgPT09ICd0YWJzJykge1xuXG4gICAgICAgICAgdGhpcy5vcGVubmVkQ29sbGFwc2FibGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSkudGhlbigocmVzKSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChldmVudC5yZWNvdW50KSB7XG5cbiAgICAgICAgICAgICAgdGhpcy5yZWxvYWRDb3VudFJlcG9ydCgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmNvdW50UmVwb3J0IHx8IGV2ZW50LnJlY291bnQpIHtcblxuICAgICAgICAgICAgdGhpcy5yZWxvYWRDb3VudFJlcG9ydCgpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMub3Blbm5lZENvbGxhcHNhYmxlICYmICF0YWJDaGFuZ2VkKSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZEJ5T3Blbm5lZENvbGxhcHNlKHRoaXMub3Blbm5lZENvbGxhcHNhYmxlKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0ge1xuICAgICAgICAgICAgICB0YWI6IHRoaXMuc2VsZWN0ZWRUYWIsXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBldmVudC5jaGlsZHJlbiA/IGV2ZW50LmNoaWxkcmVuIDogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnNjcm9sbGFibGVDb250YWluZXJDbGFzcylbMF07XG4gICAgICBpZiAodGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSwgMSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQudGFiQ2hhbmdlLnN1YnNjcmliZSh0YWIgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xuICAgICAgICB0aGlzLmRldGVjdExpc3RNb2RlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1RhYnNDaGFuZ2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFic0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFRhYmxlU29ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZSkge1xuXG4gICAgICB0aGlzLnRhYmxlU29ydFN1YnNjcmlwdGlvbiA9IHRoaXMudGFibGUuc29ydC5zdWJzY3JpYmUoY29sdW1uc1NvcnRDb25maWcgPT4ge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnNTb3J0Q29uZmlnICE9PSBjb2x1bW5zU29ydENvbmZpZykge1xuXG4gICAgICAgICAgdGhpcy5jb2x1bW5zU29ydENvbmZpZyA9IGNvbHVtbnNTb3J0Q29uZmlnO1xuXG4gICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtdGFibGUtY29sdW1uL2xpc3QtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNMaXN0VGFibGVDb21wb25lbnQsXG4gICAgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjTGlzdFRhYmxlQ29tcG9uZW50LFxuICAgIERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYmxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWZvb3RlcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RGb290ZXJDb21wb25lbnQge31cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtYWR2YW5jZWQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBZHZhbmNlZEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWFjdGlvbnMnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD4+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNMaXN0QWN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1hY3Rpb25zLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEFjdGlvbnNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjTGlzdEFjdGlvbnNDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBY3Rpb25zTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRTbmFja0Jhck1vZHVsZSwgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyTW9kdWxlIH0gZnJvbSAnLi9saXN0LWZpbHRlci9saXN0LWZpbHRlci5tb2R1bGUnO1xuXG5pbXBvcnQgeyBEZWNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0R3JpZENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1ncmlkL2xpc3QtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlTW9kdWxlIH0gZnJvbSAnLi9saXN0LXRhYmxlL2xpc3QtdGFibGUubW9kdWxlJztcbmltcG9ydCB7IERlY0xpc3RGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZm9vdGVyL2xpc3QtZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUgfSBmcm9tICcuL2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNTcGlubmVyTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjTGlzdEFjdGlvbnNNb2R1bGUgfSBmcm9tICcuL2xpc3QtYWN0aW9ucy9saXN0LWFjdGlvbnMubW9kdWxlJztcbmltcG9ydCB7IERlY0xhYmVsTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtbGFiZWwvZGVjLWxhYmVsLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGVjTGFiZWxNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRGVjTGlzdEFkdmFuY2VkRmlsdGVyTW9kdWxlLFxuICAgIERlY0xpc3RGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdFRhYmxlTW9kdWxlLFxuICAgIERlY1NwaW5uZXJNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0xpc3RDb21wb25lbnQsXG4gICAgRGVjTGlzdEdyaWRDb21wb25lbnQsXG4gICAgRGVjTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0xpc3RDb21wb25lbnQsXG4gICAgRGVjTGlzdEdyaWRDb21wb25lbnQsXG4gICAgRGVjTGlzdFRhYmxlTW9kdWxlLFxuICAgIERlY0xpc3RGb290ZXJDb21wb25lbnQsXG4gICAgRGVjTGlzdEZpbHRlck1vZHVsZSxcbiAgICBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdEFjdGlvbnNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1wYWdlLWZvcmJpZGVuJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGFnZS1mb3JiaWRlbi13cmFwcGVyXCI+XG4gIDxoMT57eydsYWJlbC5wYWdlLWZvcmJpZGVuJyB8IHRyYW5zbGF0ZX19PC9oMT5cbiAgPHA+e3snbGFiZWwucGFnZS1mb3JiaWRlbi1oZWxwJyB8IHRyYW5zbGF0ZX19PC9wPlxuICA8cD48c21hbGw+UmVmOiB7e3ByZXZpb3VzVXJsfX08L3NtYWxsPjwvcD5cbiAgPGltZyBzcmM9XCJodHRwOi8vczMtc2EtZWFzdC0xLmFtYXpvbmF3cy5jb20vc3RhdGljLWZpbGVzLXByb2QvcGxhdGZvcm0vZGVjb3JhMy5wbmdcIj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5wYWdlLWZvcmJpZGVuLXdyYXBwZXJ7cGFkZGluZy10b3A6MTAwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9aW1ne3dpZHRoOjEwMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1BhZ2VGb3JiaWRlbkNvbXBvbmVudCB7XG5cbiAgcHJldmlvdXNVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgLnBpcGUoXG4gICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKVxuICAgIClcbiAgICAuc3Vic2NyaWJlKChlOiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZG9jdW1lbnQucmVmZXJyZXIgfHwgZS51cmw7XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNQYWdlRm9yYmlkZW5Db21wb25lbnQgfSBmcm9tICcuL3BhZ2UtZm9yYmlkZW4uY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjUGFnZUZvcmJpZGVuQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNQYWdlRm9yYmlkZW5Db21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQYWdlRm9yYmlkZW5Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1wYWdlLW5vdC1mb3VuZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2Utbm90LWZvdW5kLXdyYXBwZXJcIj5cbiAgPGgxPnt7J2xhYmVsLnBhZ2Utbm90LWZvdW5kJyB8IHRyYW5zbGF0ZX19PC9oMT5cbiAgPHA+e3snbGFiZWwucGFnZS1ub3QtZm91bmQtaGVscCcgfCB0cmFuc2xhdGV9fTwvcD5cbiAgPHA+e3twcmV2aW91c1VybH19PC9wPlxuICA8aW1nIHNyYz1cImh0dHA6Ly9zMy1zYS1lYXN0LTEuYW1hem9uYXdzLmNvbS9zdGF0aWMtZmlsZXMtcHJvZC9wbGF0Zm9ybS9kZWNvcmEzLnBuZ1wiPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnBhZ2Utbm90LWZvdW5kLXdyYXBwZXJ7cGFkZGluZy10b3A6MTAwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9aW1ne3dpZHRoOjEwMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1BhZ2VOb3RGb3VuZENvbXBvbmVudCB7XG5cbiAgcHJldmlvdXNVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgcm91dGVyLmV2ZW50c1xuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZClcbiAgICApXG4gICAgLnN1YnNjcmliZSgoZTogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICB0aGlzLnByZXZpb3VzVXJsID0gZS51cmw7XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNQYWdlTm90Rm91bmRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2Utbm90LWZvdW5kLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1BhZ2VOb3RGb3VuZENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUGFnZU5vdEZvdW5kQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUGFnZU5vdEZvdW5kTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlciAgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgRkFMTEJBQ0tfSU1BR0UgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUFtSkxSMFFBLzRlUHpMOEFBQUFKY0VoWmN3QUFDeE1BQUFzVEFRQ2FuQmdBQUFBTFNVUkJWQWpYWTJCZ0FBQUFBd0FCSU5XVXh3QUFBQUJKUlU1JyArXG4nRXJrSmdnZz09JztcblxuY29uc3QgTE9BRElOR19JTUFHRSA9ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlNVFV3SWlCb1pXbG5hSFE5SWpFMU1DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQndjbVZ6WlhKMlpVRnpjR1ZqZEZKaGRHbHZQU0o0VFdsa1dVMXBaQ0lnJyArXG4nWTJ4aGMzTTlJblZwYkMxeWFXNW5JajQ4Y0dGMGFDQm1hV3hzUFNKdWIyNWxJaUJqYkdGemN6MGlZbXNpSUdROUlrMHdJREJvTVRBd2RqRXdNRWd3ZWlJdlBqeGphWEpqYkdVZ1kzZzlJamMxSWlCamVUMGlOelVpSUhJOUlqUTFJaUJ6ZEhKdmEyVXRaR0Z6YUdGeWNtRjVQU0l5TWpZdU1UazFJRFUyTGpVME9TSScgK1xuJ2djM1J5YjJ0bFBTSWpNak15WlRNNElpQm1hV3hzUFNKdWIyNWxJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqRXdJajQ4WVc1cGJXRjBaVlJ5WVc1elptOXliU0JoZEhSeWFXSjFkR1ZPWVcxbFBTSjBjbUZ1YzJadmNtMGlJSFI1Y0dVOUluSnZkR0YwWlNJZ2RtRnNkV1Z6UFNJd0lEYzFJRGMxT3pFNE1DQTNOU0EzTlQnICtcbidzek5qQWdOelVnTnpVN0lpQnJaWGxVYVcxbGN6MGlNRHN3TGpVN01TSWdaSFZ5UFNJeGN5SWdjbVZ3WldGMFEyOTFiblE5SW1sdVpHVm1hVzVwZEdVaUlHSmxaMmx1UFNJd2N5SXZQand2WTJseVkyeGxQand2YzNablBnPT0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtcHJvZHVjdC1zcGluJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicHJvZHVjdC1zcGlubmVyLXdyYXBwZXJcIiAqbmdJZj1cInNjZW5lc1wiPlxuICA8ZGl2IFtuZ1N3aXRjaF09XCJsb2FkaW5nSW1hZ2VzID8gdHJ1ZSA6IGZhbHNlXCI+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCIgY2xhc3M9XCJvdmVybGF5XCI+XG4gICAgICA8IS0tIExvYWRpbmcgc3Bpbm5lciAtLT5cbiAgICAgIDxkaXYgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWltYWdlJzondXJsKCcgKyBsb2FkaW5nSW1hZ2UgKyAnKSd9XCI+e3tsb2FkZXJQZXJjZW50YWdlKCl9fSU8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCIgY2xhc3M9XCJvdmVybGF5XCI+XG5cbiAgICAgIDwhLS0gT3ZlcmxheSBvdmVyIHRoZSBpbWFnZSAoaGFuZCBpY29uKSAtLT5cbiAgICAgIDxpbWcgY2xhc3M9XCJmcmFtZVwiICpuZ0lmPVwiIW9ubHlNb2RhbFwiIHNyYz1cIi8vczMtc2EtZWFzdC0xLmFtYXpvbmF3cy5jb20vc3RhdGljLWZpbGVzLXByb2QvcGxhdGZvcm0vZHJhZy1ob3Jpem9udGFsbHkucG5nXCIgYWx0PVwiXCIgKGNsaWNrKT1cIm9ubHlNb2RhbCA/ICcnIDogc3RhcnQoJGV2ZW50KVwiPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwic3RhcnRlZCA/IHRydWUgOiBmYWxzZVwiPlxuXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIGNsYXNzPVwiZnJhbWVcIj5cbiAgICAgIDwhLS0gSW1hZ2VzIC0tPlxuICAgICAgPGltZyAqbmdGb3I9XCJsZXQgc2NlbmUgb2Ygc2NlbmVzOyBsZXQgaSA9IGluZGV4O1wiXG4gICAgICAgIFtzcmNdPVwic2NlbmVcIlxuICAgICAgICBkcmFnZ2FibGU9XCJmYWxzZVwiXG4gICAgICAgIGNsYXNzPVwibm8tZHJhZyBpbWFnZS1vbmx5XCJcbiAgICAgICAgKGxvYWQpPVwibWFya0FzTG9hZGVkKCRldmVudClcIlxuICAgICAgICBbbmdDbGFzc109XCJmcmFtZVNob3duID09PSBpICYmICFsb2FkaW5nSW1hZ2VzID8gJ2N1cnJlbnQtc2NlbmUnIDogJ25leHQtc2NlbmUnXCI+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCIgY2xhc3M9XCJmcmFtZVwiPlxuXG4gICAgICA8IS0tIFBsYWNlaG9sZGVyIGltYWdlIC0tPlxuICAgICAgPGltZ1xuICAgICAgICBbc3JjXT1cInNjZW5lc1tmcmFtZVNob3duXVwiXG4gICAgICAgIGRyYWdnYWJsZT1cImZhbHNlXCJcbiAgICAgICAgY2xhc3M9XCJuby1kcmFnXCJcbiAgICAgICAgKGNsaWNrKT1cIm9ubHlNb2RhbCA/IG9uT3BlbigkZXZlbnQpIDogc3RhcnQoJGV2ZW50KVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnaW1hZ2Utb25seSc6IG9ubHlNb2RhbH1cIj5cblxuICAgICAgPCEtLSBMb2FkaW5nIHNwaW5uZXIgLS0+XG4gICAgICA8YnV0dG9uXG4gICAgICAqbmdJZj1cInNob3dPcGVuRGlhbG9nQnV0dG9uICYmICFvbmx5TW9kYWxcIlxuICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAoY2xpY2spPVwib25PcGVuKCRldmVudClcIlxuICAgICAgW21hdFRvb2x0aXBdPVwiJ2xhYmVsLm9wZW4nIHwgdHJhbnNsYXRlXCJcbiAgICAgIGNsYXNzPVwiZGlhbG9nLWJ1dHRvblwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNvbG9yPVwiZGVmYXVsdFwiPlxuICAgICAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cIlN3YXAgYmV0d2VlbiBSZWZlcmVuY2UgYW5kIFJlbmRlciBpbWFnZXNcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgPmZ1bGxzY3JlZW48L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5wcm9kdWN0LXNwaW5uZXItd3JhcHBlcntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlcjpob3ZlciAuZnJhbWV7b3BhY2l0eToxfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlcjpob3ZlciAub3ZlcmxheXtkaXNwbGF5Om5vbmV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZXtkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1zaXplOmNvbnRhaW47YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyIGNlbnRlcjtvcGFjaXR5Oi41O3RyYW5zaXRpb246b3BhY2l0eSAuM3MgZWFzZTtjdXJzb3I6bW92ZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lLmltYWdlLW9ubHl7b3BhY2l0eToxO2N1cnNvcjpwb2ludGVyfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUgLmN1cnJlbnQtc2NlbmV7ZGlzcGxheTpibG9ja30ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lIC5uZXh0LXNjZW5le2Rpc3BsYXk6bm9uZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lIGltZ3t3aWR0aDoxMDAlfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAub3ZlcmxheXtwb3NpdGlvbjphYnNvbHV0ZTtwYWRkaW5nOjEwcHg7d2lkdGg6MjAlO21hcmdpbi1sZWZ0OjQwJTttYXJnaW4tdG9wOjQwJTt6LWluZGV4OjE7b3BhY2l0eTouNDt0cmFuc2l0aW9uOm9wYWNpdHkgLjJzIGVhc2V9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZS5sb2FkZXJ7d2lkdGg6NTAlO21hcmdpbjphdXRvfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZGlhbG9nLWJ1dHRvbntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAubG9hZGVyLXBlcmNlbnRhZ2V7cG9zaXRpb246cmVsYXRpdmU7dG9wOjQ3JTt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO29wYWNpdHk6LjV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUHJvZHVjdFNwaW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZyYW1lU2hvd246IG51bWJlcjtcbiAgc2NlbmVzOiBzdHJpbmdbXTtcbiAgbG9hZGluZ0ltYWdlczogYm9vbGVhbjtcbiAgcGxhY2Vob2xkZXJTY2VuZTogc3RyaW5nO1xuICBzdGFydGVkOiBib29sZWFuO1xuICB0b3RhbEltYWdlc0xvYWRlZDogbnVtYmVyO1xuICBsb2FkaW5nSW1hZ2UgPSBMT0FESU5HX0lNQUdFO1xuXG4gIEBJbnB1dCgpIGxvb3BpbmcgPSBmYWxzZTtcbiAgQElucHV0KCkgb25seU1vZGFsID0gZmFsc2U7XG4gIEBJbnB1dCgpIEZBTExCQUNLX0lNQUdFOiBzdHJpbmcgPSBGQUxMQkFDS19JTUFHRTtcbiAgQElucHV0KCkgc3RhcnRJbkNlbnRlciA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93T3BlbkRpYWxvZ0J1dHRvbiA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IHNwaW4oc3BpbjogYW55KSB7XG4gICAgaWYgKHNwaW4pIHtcbiAgICAgIGNvbnN0IHNjZW5lcyA9IHRoaXMubG9hZFNjZW5lcyhzcGluKTtcblxuICAgICAgY29uc3Qgc2NlbmVzQ2hhbmdlZCA9ICF0aGlzLnNjZW5lcyB8fCAoc2NlbmVzICYmIHRoaXMuc2NlbmVzLmpvaW4oKSAhPT0gc2NlbmVzLmpvaW4oKSk7XG5cbiAgICAgIGlmIChzY2VuZXNDaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMucmVzZXRTY2VuZXNEYXRhKHNjZW5lcyk7XG4gICAgICAgIC8vIHRoaXMucmVzZXRTdGFydFBvc2l0aW9uQmFzZWRPbkNvbXBhbnkoc3Bpbiwgc2NlbmVzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3BpbiA9IHNwaW47XG5cbiAgICB9XG4gIH1cblxuICBnZXQgc3BpbigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9zcGluO1xuICB9XG5cbiAgQE91dHB1dCgpIG9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIHNjZW5lc0xlbiA9IDA7XG4gIHByaXZhdGUgbW91c2VEb3duID0gZmFsc2U7XG4gIHByaXZhdGUgbGFzdE1vdXNlRXZlbnQ6IE1vdXNlRXZlbnQ7XG4gIHByaXZhdGUgY29udGFpbmVyV2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBpbnRlcnZhbDogbnVtYmVyO1xuICBwcml2YXRlIHBvc2l0aW9uRGlmZjogbnVtYmVyO1xuICBwcml2YXRlIF9zcGluOiBhbnk7XG5cbiAgLypcbiAgKiBMaXN0ZW5pbmcgZm9yIG1vdXNlIGV2ZW50c1xuICAqIG1vdXNldXAgaW4gbmdPbkluaXQgYmVjYXVzZSBpdCB1c2VkIGRvY2N1bWVudCBhcyByZWZlcmVuY2VcbiAgKi9cblxuICAvLyBhdm9pZCBkcmFnXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBtb3VzZWRvd25cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZWRvd24oZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XG4gICAgdGhpcy5sYXN0TW91c2VFdmVudCA9IGV2ZW50O1xuICB9XG5cbiAgLy8gbW91c2Vtb3ZlXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbW92ZScsIFsnJGV2ZW50J10pXG4gIG9uTW91c2Vtb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMubW91c2VEb3duICYmIHRoaXMuc3RhcnRlZCkge1xuXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKGV2ZW50KTtcblxuICAgICAgLy8gVGhlIHdpZHRoIGlzIGRpdmlkZWQgYnkgdGhlIGFtb3VudCBvZiBpbWFnZXMuIE1vdmluZyBmcm9tIDAgdG8gMTAwIHdpbGwgdHVybiAzNjDDgsKwXG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5wb3NpdGlvbkRpZmYpID49IHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25EaWZmIDwgMCkge1xuICAgICAgICAgIHRoaXMuZ29SaWdodCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ29MZWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0TW91c2VFdmVudCA9IGV2ZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5mcmFtZVNob3duID0gMDtcblxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCdkb2N1bWVudCcsICdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5tb3VzZURvd24pIHtcbiAgICAgICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbWFya0FzTG9hZGVkID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy50b3RhbEltYWdlc0xvYWRlZCsrO1xuICAgIGlmICh0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkID09PSB0aGlzLnNjZW5lc0xlbikge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlclNjZW5lID0gdGhpcy5zY2VuZXNbMF07XG4gICAgICB0aGlzLmxvYWRpbmdJbWFnZXMgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnb0xlZnQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc2NlbmVzW3RoaXMuZnJhbWVTaG93biAtIDFdKSB7XG4gICAgICB0aGlzLmZyYW1lU2hvd24tLTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9vcGluZykge1xuICAgICAgdGhpcy5mcmFtZVNob3duID0gdGhpcy5zY2VuZXNMZW4gLSAxO1xuICAgIH1cbiAgfVxuXG4gIGdvUmlnaHQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc2NlbmVzW3RoaXMuZnJhbWVTaG93biArIDFdKSB7XG4gICAgICB0aGlzLmZyYW1lU2hvd24rKztcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9vcGluZykge1xuICAgICAgdGhpcy5mcmFtZVNob3duID0gMDtcbiAgICB9XG4gIH1cblxuICBzdGFydCA9ICgkZXZlbnQpOiB2b2lkID0+IHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyU2NlbmUgPSBMT0FESU5HX0lNQUdFO1xuICAgIHRoaXMudG90YWxJbWFnZXNMb2FkZWQgPSAwO1xuICAgIHRoaXMubG9hZGluZ0ltYWdlcyA9IHRydWU7XG4gICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGxvYWRlclBlcmNlbnRhZ2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuICh0aGlzLnNjZW5lc0xlbiAtIHRoaXMudG90YWxJbWFnZXNMb2FkZWQpID4gMCA/ICgoMTAwIC8gdGhpcy5zY2VuZXNMZW4pICogdGhpcy50b3RhbEltYWdlc0xvYWRlZCkudG9GaXhlZCgxKSA6IDA7XG4gIH1cblxuICBvbk9wZW4oJGV2ZW50KSB7XG5cbiAgICB0aGlzLm9wZW4uZW1pdCgkZXZlbnQpO1xuXG4gIH1cblxuICAvKlxuICAgKlxuICAgKiBJTVBPUlRBTlRcbiAgICpcbiAgICogcmVzZXRTdGFydFBvc2l0aW9uQmFzZWRPbkNvbXBhbnlcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcmVzcG9uc2libGUgZm9yIGVuc3VyaW5nIHRoZSBCdXNpbmVzcyBSdWxlIG9mIHRoZSBzcGluIHNlcXVlbmNlXG4gICAqIFRoZSBIb21lIERlcG90IGFrYSBjdXN0b21lciAxMDAsIGhhdmUgYSBwYXJ0aWN1bGFyIGJlaGF2aW9yIHN0YXJ0aW5nIDE4MMOCwrogaW4gdGhlIG1pZGRsZVxuICAgKlxuICAqL1xuICBwcml2YXRlIHJlc2V0U3RhcnRQb3NpdGlvbkJhc2VkT25Db21wYW55KHNwaW4sIHNjZW5lcykge1xuXG4gICAgdGhpcy5zdGFydEluQ2VudGVyID0gc3Bpbi5jb21wYW55LmlkID09PSAxMDAgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB0aGlzLnN0YXJ0SW5DZW50ZXIgPSB0aGlzLnN0YXJ0SW5DZW50ZXIgJiYgc2NlbmVzLmxlbmd0aCA8PSAxNjtcblxuICB9XG5cbiAgcHJpdmF0ZSByZXNldFNjZW5lc0RhdGEoc2NlbmVzKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlclNjZW5lID0gc2NlbmVzWzBdO1xuICAgIHRoaXMuc2NlbmVzTGVuID0gc2NlbmVzLmxlbmd0aDtcbiAgICB0aGlzLnNjZW5lcyA9IHNjZW5lcztcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFNjZW5lcyhzcGluKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNjZW5lcyA9IHRoaXMuZ2V0VXJsc0Zyb21TeXNGaWxlcyhzcGluLmRhdGEuc2hvdHMpO1xuICAgICAgcmV0dXJuIHNjZW5lcyAmJiBzY2VuZXMubGVuZ3RoID4gMCA/IHNjZW5lcyA6IFtGQUxMQkFDS19JTUFHRV07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBbRkFMTEJBQ0tfSU1BR0VdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlUG9zaXRpb24oZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQ6IGFueSA9IGV2ZW50Wyd0YXJnZXQnXTtcblxuICAgIGlmICh0aGlzLmNvbnRhaW5lcldpZHRoICE9PSB0YXJnZXQuY2xpZW50V2lkdGgpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSAgdGFyZ2V0LmNsaWVudFdpZHRoO1xuICAgICAgdGhpcy5pbnRlcnZhbCA9ICh0aGlzLmNvbnRhaW5lcldpZHRoIC8gdGhpcy5zY2VuZXNMZW4pIC8gMS42O1xuICAgIH1cblxuICAgIHRoaXMucG9zaXRpb25EaWZmID0gZXZlbnQuY2xpZW50WCAtIHRoaXMubGFzdE1vdXNlRXZlbnQuY2xpZW50WDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VXJsc0Zyb21TeXNGaWxlcyhzeXNGaWxlcykge1xuICAgIGlmICghc3lzRmlsZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN5c0ZpbGVzLm1hcChmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbGUucmVuZGVyRmlsZS5maWxlVXJsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjUHJvZHVjdFNwaW5Db21wb25lbnQgfSBmcm9tICcuL3Byb2R1Y3Qtc3Bpbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNQcm9kdWN0U3BpbkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUHJvZHVjdFNwaW5Db21wb25lbnRcbiAgXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBEZWNQcm9kdWN0U3Bpbk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtyb3V0ZXJMaW5rXT1cInJvdXRlckxpbmtcIiBjbGFzcz1cImRlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGVcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGV7b3V0bGluZTowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHJvdXRlckxpbms7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlL2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtdG9vbGJhcicsXG4gIHRlbXBsYXRlOiBgPG1hdC10b29sYmFyIFtjb2xvcl09XCJjb2xvclwiICpuZ0lmPVwiaW5pdGlhbGl6ZWRcIj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLWljb24gaXRlbS1sZWZ0XCIgKm5nSWY9XCJsZWZ0TWVudVRyaWdnZXJWaXNpYmxlXCIgKGNsaWNrKT1cInRvZ2dsZUxlZnRNZW51LmVtaXQoKVwiPlxuICAgICYjOTc3NjtcbiAgPC9zcGFuPlxuXG4gIDxzcGFuICpuZ0lmPVwiY3VzdG9tVGl0bGVcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICA8L3NwYW4+XG5cbiAgPGRpdiBjbGFzcz1cInJpYmJvbiB7e3JpYmJvbn19XCIgKm5nSWY9XCJub3RQcm9kdWN0aW9uXCI+XG4gICAgPHNwYW4+e3tsYWJlbCB8IHRyYW5zbGF0ZX19PC9zcGFuPlxuICA8L2Rpdj5cblxuICA8c3BhbiBjbGFzcz1cImRlYy1zaWRlbmF2LXRvb2xiYXItY3VzdG9tLWNvbnRlbnRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvc3Bhbj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLXNwYWNlclwiPjwvc3Bhbj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLWljb24gaXRlbS1yaWdodFwiICpuZ0lmPVwicmlnaHRNZW51VHJpZ2dlclZpc2libGVcIiAoY2xpY2spPVwidG9nZ2xlUmlnaHRNZW51LmVtaXQoKVwiPlxuICAgICYjOTc3NjtcbiAgPC9zcGFuPlxuXG48L21hdC10b29sYmFyPlxuYCxcbiAgc3R5bGVzOiBbYC5pdGVtcy1zcGFjZXJ7ZmxleDoxIDEgYXV0b30uaXRlbXMtaWNvbntjdXJzb3I6cG9pbnRlcjstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjIsLjgpO3RyYW5zZm9ybTpzY2FsZSgxLjIsLjgpfS5pdGVtcy1pY29uLml0ZW0tcmlnaHR7cGFkZGluZy1sZWZ0OjE0cHh9Lml0ZW1zLWljb24uaXRlbS1sZWZ0e3BhZGRpbmctcmlnaHQ6MTRweH0uZGVjLXNpZGVuYXYtdG9vbGJhci1jdXN0b20tY29udGVudHtwYWRkaW5nOjAgMTZweDt3aWR0aDoxMDAlfS5yaWJib257dHJhbnNpdGlvbjphbGwgLjNzIGVhc2U7dGV4dC10cmFuc2Zvcm06bG93ZXJjYXNlO3RleHQtYWxpZ246Y2VudGVyO3Bvc2l0aW9uOnJlbGF0aXZlO2xpbmUtaGVpZ2h0OjY0cHg7bWFyZ2luLWxlZnQ6NHB4O3BhZGRpbmc6MCAyMHB4O2hlaWdodDo2NHB4O3dpZHRoOjE1NXB4O2NvbG9yOiNmZmY7bGVmdDoyMHB4O3RvcDowfS5yaWJib24ucmliYm9uLWhpZGRlbntkaXNwbGF5Om5vbmV9LnJpYmJvbjo6YmVmb3Jle2NvbnRlbnQ6Jyc7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwdnc7aGVpZ2h0OjRweDt6LWluZGV4OjI7dG9wOjY0cHg7bGVmdDowfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTk5cHgpey5yaWJib246OmJlZm9yZXt0b3A6NTZweH19YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xuXG4gIGluaXRpYWxpemVkO1xuXG4gIG5vdFByb2R1Y3Rpb24gPSB0cnVlO1xuICByaWJib24gPSAnJztcbiAgbGFiZWwgPSAnJztcblxuICBASW5wdXQoKSBjb2xvcjtcblxuICBASW5wdXQoKSBlbnZpcm9ubWVudDtcblxuICBASW5wdXQoKSBsZWZ0TWVudVRyaWdnZXJWaXNpYmxlID0gdHJ1ZTtcblxuICBASW5wdXQoKSByaWdodE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHRvZ2dsZUxlZnRNZW51OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSB0b2dnbGVSaWdodE1lbnU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50KSBjdXN0b21UaXRsZTogRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdsb2NhbCcpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1ncmVlbic7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLmxvY2FsJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1ibHVlJztcbiAgICAgIHRoaXMubGFiZWwgPSAnbGFiZWwuZGV2ZWxvcG1lbnQnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5lbnZpcm9ubWVudCA9PT0gJ3FhJykge1xuICAgICAgdGhpcy5yaWJib24gPSAncmliYm9uLXJlZCc7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLnFhJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdhY3RpdmUnKSB7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24tZ3JlZW4nO1xuICAgICAgdGhpcy5sYWJlbCA9ICdsYWJlbC5hY3RpdmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vdFByb2R1Y3Rpb24gPSBmYWxzZTtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1oaWRkZW4nO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBsZXQtdHJlZUxldmVsPVwidHJlZUxldmVsXCIgI3RlbXBsYXRlPlxuXG4gIDxtYXQtbGlzdC1pdGVtIGNsYXNzPVwiY2xpY2sgZGVjLXNpZGVuYXYtbWVudS1pdGVtXCJcbiAgKGNsaWNrKT1cInN1Yml0ZW1zLmxlbmd0aCA/IHRvZ2dsZVN1Ym1lbnUoKSA6IG9wZW5MaW5rKClcIlxuICBbbmdTdHlsZV09XCJnZXRCYWNrZ3JvdW5kKHRyZWVMZXZlbClcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJpdGVtLXdyYXBwZXJcIj5cblxuICAgICAgPGRpdiBbbmdTdHlsZV09XCJ7cGFkZGluZ0xlZnQ6IHRyZWVMZXZlbCAqIDE2ICsgJ3B4J31cIiBjbGFzcz1cIml0ZW0tY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdJZj1cInN1Yml0ZW1zLmxlbmd0aFwiIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJzaG93U3VibWVudVwiPlxuICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+PGkgY2xhc3M9XCJhcnJvdyBkb3duXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj48aSBjbGFzcz1cImFycm93IHJpZ2h0XCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICA8L21hdC1saXN0LWl0ZW0+XG5cbiAgPGRpdiBjbGFzcz1cInN1Yml0ZW0tbWVudVwiICpuZ0lmPVwic2hvd1N1Ym1lbnVcIj5cblxuICAgIDxkZWMtc2lkZW5hdi1tZW51IFtpdGVtc109XCJzdWJpdGVtc1wiIFt0cmVlTGV2ZWxdPVwidHJlZUxldmVsXCI+PC9kZWMtc2lkZW5hdi1tZW51PlxuXG4gIDwvZGl2PlxuXG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi1tZW51LWl0ZW17aGVpZ2h0OjU2cHghaW1wb3J0YW50O291dGxpbmU6MH0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXJ7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1mbG93OnJvdyBuby13cmFwO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuaXRlbS1jb250ZW50IDo6bmctZGVlcCAubWF0LWljb24sLmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5pdGVtLWNvbnRlbnQgOjpuZy1kZWVwIGl7dmVydGljYWwtYWxpZ246bWlkZGxlO21hcmdpbi1ib3R0b206NXB4O21hcmdpbi1yaWdodDo4cHh9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5hcnJvd3ttYXJnaW4tYm90dG9tOi00cHh9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5hcnJvdy5yaWdodHt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyl9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5hcnJvdy5sZWZ0e3RyYW5zZm9ybTpyb3RhdGUoMTM1ZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTM1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLmFycm93LnVwe3RyYW5zZm9ybTpyb3RhdGUoLTEzNWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC0xMzVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuYXJyb3cuZG93bnt0cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLnRleHQtcmlnaHR7dGV4dC1hbGlnbjpyaWdodH0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5jbGlja3tjdXJzb3I6cG9pbnRlcn0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIGl7Ym9yZGVyOnNvbGlkICMwMDA7Ym9yZGVyLXdpZHRoOjAgMnB4IDJweCAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6NHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHJvdXRlckxpbms7XG5cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBfc3ViaXRlbXM6IFF1ZXJ5TGlzdDxEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gIEBPdXRwdXQoKSB0b2dnbGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc3RhcnRlZDtcblxuICBzaG93U3VibWVudSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgZ2V0IHN1Yml0ZW1zKCkge1xuICAgIGNvbnN0IHN1Yml0ZW1zID0gdGhpcy5fc3ViaXRlbXMudG9BcnJheSgpO1xuICAgIHN1Yml0ZW1zLnNwbGljZSgwLCAxKTsgLy8gcmVtb3ZlcyBpdHNlbGZcbiAgICByZXR1cm4gc3ViaXRlbXM7XG4gIH1cblxuICB0b2dnbGVTdWJtZW51KCkge1xuICAgIHRoaXMuc2hvd1N1Ym1lbnUgPSAhdGhpcy5zaG93U3VibWVudTtcbiAgICB0aGlzLnRvZ2dsZS5lbWl0KHRoaXMuc2hvd1N1Ym1lbnUpO1xuICB9XG5cbiAgY2xvc2VTdWJtZW51KCkge1xuICAgIHRoaXMuc2hvd1N1Ym1lbnUgPSBmYWxzZTtcbiAgfVxuXG4gIG9wZW5MaW5rKCkge1xuICAgIGlmICh0aGlzLnJvdXRlckxpbmspIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5yb3V0ZXJMaW5rID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBpc05ha2VkID0gdGhpcy5yb3V0ZXJMaW5rLnN0YXJ0c1dpdGgoJy8vJyk7XG4gICAgICAgIGNvbnN0IGlzSHR0cCA9IHRoaXMucm91dGVyTGluay5zdGFydHNXaXRoKCdodHRwOi8vJyk7XG4gICAgICAgIGNvbnN0IGlzSHR0cHMgPSB0aGlzLnJvdXRlckxpbmsuc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKTtcbiAgICAgICAgaWYgKGlzTmFrZWQgfHwgaXNIdHRwIHx8IGlzSHR0cHMpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMucm91dGVyTGluaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZXJMaW5rXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnJvdXRlckxpbmspKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHRoaXMucm91dGVyTGluayk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0QmFja2dyb3VuZCh0cmVlTGV2ZWwpIHtcbiAgICBjb25zdCBzdHlsZSA9IHsgYmFja2dyb3VuZENvbG9yOiAnJywgcG9pbnRlckV2ZW50czogJycgfTtcbiAgICBpZiAodGhpcy5yb3V0ZXJMaW5rID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciArPSAnI0VGM0Y1NCc7XG4gICAgICBzdHlsZS5wb2ludGVyRXZlbnRzICs9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yICs9ICdyZ2JhKDAsIDAsIDAsICcgKyB0cmVlTGV2ZWwgLyA2ICsgJyknOyAvLyBoc2woMjA5LCAyMCUsIDMwJSlcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IFNUT1JBR0VfRE9NQUlOID0gJ2RlY1NpZGVuYXZDb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdlNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXRTaWRlbmF2VmlzaWJpbGl0eShuYW1lLCB2aXNpYmlsaXR5KSB7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldFNpZGVuYXZDb25maWcoKTtcblxuICAgIGNvbmZpZ1tuYW1lXSA9IHZpc2liaWxpdHk7XG5cbiAgICB0aGlzLnNldFNpZGVuYXZDb25maWcoY29uZmlnKTtcblxuICB9XG5cbiAgZ2V0U2lkZW5hdlZpc2liaWxpdHkobmFtZSkge1xuXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRTaWRlbmF2Q29uZmlnKCk7XG5cbiAgICByZXR1cm4gY29uZmlnW25hbWVdO1xuXG4gIH1cblxuICBwcml2YXRlIHNldFNpZGVuYXZDb25maWcoY29uZikge1xuXG4gICAgY29uc3QgY29uZlN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGNvbmYpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9ET01BSU4sIGNvbmZTdHJpbmcpO1xuXG4gIH1cblxuICBwcml2YXRlIGdldFNpZGVuYXZDb25maWcoKSB7XG5cbiAgICBjb25zdCBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9ET01BSU4pO1xuXG4gICAgaWYgKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuXG4gICAgICB0aGlzLnNldFNpZGVuYXZDb25maWcobmV3Q29uZmlnKTtcblxuICAgICAgcmV0dXJuIG5ld0NvbmZpZztcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIElucHV0LCBDb250ZW50Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS10aXRsZS9kZWMtc2lkZW5hdi1tZW51LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuLy4uL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtbGVmdCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1c3RvbVRpdGxlXCI+XG4gIDxkaXYgY2xhc3M9XCJtZW51LXRpdGxlXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWRlYy1zaWRlbmF2LW1lbnUtdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtc1wiPlxuICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwiaXRlbXMudG9BcnJheSgpXCI+PC9kZWMtc2lkZW5hdi1tZW51PlxuPC9uZy1jb250YWluZXI+YCxcbiAgc3R5bGVzOiBbYC5tZW51LXRpdGxle3BhZGRpbmc6MTZweDtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo3MDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICByZWFkb25seSBsZWZ0TWVudVZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIHJlYWRvbmx5IGxlZnRNZW51TW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2lkZScpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcGVuKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMubGVmdE1lbnVWaXNpYmxlLnZhbHVlO1xuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubGVmdE1lbnVWaXNpYmxlLm5leHQodik7XG4gICAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnNldFNpZGVuYXZWaXNpYmlsaXR5KCdsZWZ0TWVudUhpZGRlbicsICF2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbW9kZSh2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmxlZnRNZW51TW9kZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubGVmdE1lbnVNb2RlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdE1lbnVNb2RlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgcGVyc2lzdFZpc2liaWxpdHlNb2RlOiBib29sZWFuO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgaXRlbXM6IFF1ZXJ5TGlzdDxEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCkgY3VzdG9tVGl0bGU6IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIG9wZW5lZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAT3V0cHV0KCkgbW9kZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHByaXZhdGUgaXRlbVN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNTaWRlbmF2U2VydmljZTogRGVjU2lkZW5hdlNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVBbmRFeHBvc2VTaWRlbmF2RXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKSB7XG5cbiAgICB0aGlzLmxlZnRNZW51VmlzaWJsZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxlZnRNZW51TW9kZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5tb2RlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMudG9BcnJheSgpO1xuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50KSA9PiB7XG5cbiAgICAgIGl0ZW0udG9nZ2xlLnN1YnNjcmliZShzdGF0ZSA9PiB7XG5cbiAgICAgICAgaWYgKHN0YXRlKSB7XG5cbiAgICAgICAgICB0aGlzLmNsb3NlQnJvdGhlcnMoaXRlbSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLml0ZW1TdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VCcm90aGVycyhpdGVtU2VsZWN0ZWQpIHtcblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy50b0FycmF5KCk7XG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQpID0+IHtcblxuICAgICAgaWYgKGl0ZW1TZWxlY3RlZCAhPT0gaXRlbSkge1xuXG4gICAgICAgIGl0ZW0uY2xvc2VTdWJtZW51KCk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbnB1dCwgQ29udGVudENoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS9kZWMtc2lkZW5hdi1tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUvZGVjLXNpZGVuYXYtbWVudS10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY1NpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zaWRlbmF2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51LXJpZ2h0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VzdG9tVGl0bGVcIj5cbiAgPGRpdiBjbGFzcz1cIm1lbnUtdGl0bGVcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtZGVjLXNpZGVuYXYtbWVudS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW1zXCI+XG4gIDxkZWMtc2lkZW5hdi1tZW51IFtpdGVtc109XCJpdGVtcy50b0FycmF5KClcIj48L2RlYy1zaWRlbmF2LW1lbnU+XG48L25nLWNvbnRhaW5lcj5gLFxuICBzdHlsZXM6IFtgLm1lbnUtdGl0bGV7cGFkZGluZzoxNnB4O2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjcwMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICByZWFkb25seSByaWdodE1lbnVWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcblxuICByZWFkb25seSByaWdodE1lbnVNb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdzaWRlJyk7XG5cbiAgQElucHV0KClcbiAgc2V0IG9wZW4odjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5yaWdodE1lbnVWaXNpYmxlLnZhbHVlO1xuXG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yaWdodE1lbnVWaXNpYmxlLm5leHQodik7XG4gICAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnNldFNpZGVuYXZWaXNpYmlsaXR5KCdyaWdodE1lbnVIaWRkZW4nLCAhdik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBtb2RlKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMucmlnaHRNZW51TW9kZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucmlnaHRNZW51TW9kZS5uZXh0KHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0TWVudU1vZGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKSBwZXJzaXN0VmlzaWJpbGl0eU1vZGU6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBpdGVtczogUXVlcnlMaXN0PERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50KSBjdXN0b21UaXRsZTogRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgb3BlbmVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKSBtb2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHJpdmF0ZSBpdGVtU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NpZGVuYXZTZXJ2aWNlOiBEZWNTaWRlbmF2U2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpIHtcblxuICAgIHRoaXMucmlnaHRNZW51VmlzaWJsZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJpZ2h0TWVudU1vZGUuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMubW9kZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zLnRvQXJyYXkoKTtcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCkgPT4ge1xuXG4gICAgICBpdGVtLnRvZ2dsZS5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuXG4gICAgICAgIGlmIChzdGF0ZSkge1xuXG4gICAgICAgICAgdGhpcy5jbG9zZUJyb3RoZXJzKGl0ZW0pO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5pdGVtU3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikgPT4ge1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlQnJvdGhlcnMoaXRlbVNlbGVjdGVkKSB7XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMudG9BcnJheSgpO1xuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50KSA9PiB7XG5cbiAgICAgIGlmIChpdGVtU2VsZWN0ZWQgIT09IGl0ZW0pIHtcblxuICAgICAgICBpdGVtLmNsb3NlU3VibWVudSgpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtdG9vbGJhci9kZWMtc2lkZW5hdi10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtbGVmdC9kZWMtc2lkZW5hdi1tZW51LWxlZnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQvZGVjLXNpZGVuYXYtbWVudS1yaWdodC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0U2lkZW5hdiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY1NpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlbmF2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1zaWRlbmF2LXdyYXBlclwiPlxuICA8IS0tIFRPT0xCQVIgLS0+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0b29sYmFyXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtdG9vbGJhclwiPjwvbmctY29udGVudD5cbiAgPC9uZy1jb250YWluZXI+XG4gIDwhLS0gLyBUT09MQkFSIC0tPlxuXG4gIDwhLS0gUFJPR1JFU1MgQkFSIC0tPlxuICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyLXdyYXBwZXJcIiAqbmdJZj1cInByb2dyZXNzQmFyVmlzaWJsZSB8IGFzeW5jXCI+XG4gICAgPG1hdC1wcm9ncmVzcy1iYXIgbW9kZT1cImluZGV0ZXJtaW5hdGVcIiBjb2xvcj1cImFjY2VudFwiPjwvbWF0LXByb2dyZXNzLWJhcj5cbiAgPC9kaXY+XG4gIDwhLS0gLyBQUk9HUkVTUyBCQVIgLS0+XG5cbiAgPG1hdC1zaWRlbmF2LWNvbnRhaW5lciBbbmdDbGFzc109XCJ7J3dpdGgtdG9vbGJhcic6IHRvb2xiYXJ9XCI+XG5cbiAgICA8IS0tIExFRlQgTUVOVSAtLT5cbiAgICA8bWF0LXNpZGVuYXYgKm5nSWY9XCJsZWZ0TWVudVwiXG4gICAgW21vZGVdPVwibGVmdE1lbnUubGVmdE1lbnVNb2RlIHwgYXN5bmNcIlxuICAgIFtvcGVuZWRdPVwibGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlIHwgYXN5bmNcIlxuICAgIHBvc2l0aW9uPVwic3RhcnRcIlxuICAgIChvcGVuZWRDaGFuZ2UpPVwibGVmdFNpZGVuYXZPcGVuZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgI2xlZnRTaWRlbmF2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtbWVudS1sZWZ0XCI+PC9uZy1jb250ZW50PlxuICAgIDwvbWF0LXNpZGVuYXY+XG4gICAgPCEtLSAvIExFRlQgTUVOVSAtLT5cblxuICAgIDwhLS0gQ09OVEVOVCAtLT5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgIDwhLS0gLyBDT05URU5UIC0tPlxuXG4gICAgPCEtLSBSSUdIVCBNRU5VIC0tPlxuICAgIDxtYXQtc2lkZW5hdiAqbmdJZj1cInJpZ2h0TWVudVwiXG4gICAgW21vZGVdPVwicmlnaHRNZW51LnJpZ2h0TWVudU1vZGUgfCBhc3luY1wiXG4gICAgW29wZW5lZF09XCJyaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZSB8IGFzeW5jXCJcbiAgICBwb3NpdGlvbj1cImVuZFwiXG4gICAgKG9wZW5lZENoYW5nZSk9XCJyaWdodFNpZGVuYXZPcGVuZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgI3JpZ2h0U2lkZW5hdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LW1lbnUtcmlnaHRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9tYXQtc2lkZW5hdj5cbiAgICA8IS0tIC8gUklHSFQgTUVOVSAtLT5cblxuICA8L21hdC1zaWRlbmF2LWNvbnRhaW5lcj5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVye2hlaWdodDoxMDB2aH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXIud2l0aC10b29sYmFye2hlaWdodDpjYWxjKDEwMHZoIC0gNjRweCl9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyIC5tYXQtc2lkZW5hdnt3aWR0aDoyNTZweH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5wcm9ncmVzcy1iYXItd3JhcHBlcntwb3NpdGlvbjpmaXhlZDt0b3A6NjBweDtsZWZ0OjA7d2lkdGg6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcmVhZG9ubHkgcHJvZ3Jlc3NCYXJWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCkgdG9vbGJhcjogRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQpXG4gIHNldCBsZWZ0TWVudSh2OiBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQpIHtcbiAgICB0aGlzLl9sZWZ0TWVudSA9IHY7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbExlZnRNZW51VmlzaWJpbGl0eU1vZGVzKCk7XG4gICAgfVxuICB9XG4gIGdldCBsZWZ0TWVudSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGVmdE1lbnU7XG4gIH1cblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQpXG4gIHNldCByaWdodE1lbnUodjogRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCkge1xuICAgIHRoaXMuX3JpZ2h0TWVudSA9IHY7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbFJpZ2h0TWVudVZpc2liaWxpdHlNb2RlcygpO1xuICAgIH1cbiAgfVxuICBnZXQgcmlnaHRNZW51KCkge1xuICAgIHJldHVybiB0aGlzLl9yaWdodE1lbnU7XG4gIH1cblxuICBAVmlld0NoaWxkKCdsZWZ0U2lkZW5hdicpIGxlZnRTaWRlbmF2OiBNYXRTaWRlbmF2O1xuXG4gIEBWaWV3Q2hpbGQoJ3JpZ2h0U2lkZW5hdicpIHJpZ2h0U2lkZW5hdjogTWF0U2lkZW5hdjtcblxuICBwcml2YXRlIF9sZWZ0TWVudTogRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50O1xuXG4gIHByaXZhdGUgX3JpZ2h0TWVudTogRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudDtcblxuICBASW5wdXQoKVxuICBzZXQgbG9hZGluZyh2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGxvYWRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNTaWRlbmF2U2VydmljZTogRGVjU2lkZW5hdlNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgIHRoaXMuZGV0ZWN0QW5kU2hvd0NoaWxkQ29tcG9uZW50cygpO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVUb1Rvb2xiYXJFdmVudHMoKTtcblxuICB9XG5cbiAgLy8gQVBJIC8vXG4gIG9wZW5Cb3RoTWVudXMoKSB7XG4gICAgdGhpcy5vcGVuTGVmdE1lbnUoKTtcbiAgICB0aGlzLm9wZW5SaWdodE1lbnUoKTtcbiAgfVxuXG4gIG9wZW5MZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgb3BlblJpZ2h0TWVudSgpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBjbG9zZUJvdGhNZW51cygpIHtcbiAgICB0aGlzLmNsb3NlTGVmdE1lbnUoKTtcbiAgICB0aGlzLmNsb3NlUmlnaHRNZW51KCk7XG4gIH1cblxuICBjbG9zZUxlZnRNZW51KCkge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgY2xvc2VSaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIHRvZ2dsZUJvdGhNZW51cygpIHtcbiAgICB0aGlzLnRvZ2dsZUxlZnRNZW51KCk7XG4gICAgdGhpcy50b2dnbGVSaWdodE1lbnUoKTtcbiAgfVxuXG4gIHRvZ2dsZUxlZnRNZW51KCkge1xuICAgIHRoaXMubGVmdE1lbnUub3BlbiA9ICF0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIHRvZ2dsZVJpZ2h0TWVudSgpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5vcGVuID0gIXRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICBzZXRCb3RoTWVudXNNb2RlKG1vZGU6ICdvdmVyJyB8ICdwdXNoJyB8ICdzaWRlJyA9ICdzaWRlJykge1xuICAgIHRoaXMuc2V0TGVmdE1lbnVNb2RlKG1vZGUpO1xuICAgIHRoaXMuc2V0UmlnaHRNZW51TW9kZShtb2RlKTtcbiAgfVxuXG4gIHNldExlZnRNZW51TW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51TW9kZS5uZXh0KG1vZGUpO1xuICB9XG5cbiAgc2V0UmlnaHRNZW51TW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVNb2RlLm5leHQobW9kZSk7XG4gIH1cblxuICB0b2dnbGVQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSAhdGhpcy5wcm9ncmVzc0JhclZpc2libGUudmFsdWU7XG4gIH1cblxuICBzaG93UHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5wcm9ncmVzc0JhclZpc2libGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGhpZGVQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIGxlZnRTaWRlbmF2T3BlbmVkQ2hhbmdlKG9wZW5lZFN0YXR1cykge1xuICAgIHRoaXMubGVmdE1lbnUub3BlbiA9IG9wZW5lZFN0YXR1cztcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KG9wZW5lZFN0YXR1cyk7XG4gIH1cblxuICByaWdodFNpZGVuYXZPcGVuZWRDaGFuZ2Uob3BlbmVkU3RhdHVzKSB7XG4gICAgdGhpcy5yaWdodE1lbnUub3BlbiA9IG9wZW5lZFN0YXR1cztcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQob3BlbmVkU3RhdHVzKTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0QW5kU2hvd0NoaWxkQ29tcG9uZW50cygpIHtcblxuICAgIHRoaXMudG9vbGJhci5sZWZ0TWVudVRyaWdnZXJWaXNpYmxlID0gdGhpcy5sZWZ0TWVudSA/IHRydWUgOiBmYWxzZTtcblxuICAgIHRoaXMudG9vbGJhci5yaWdodE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRoaXMucmlnaHRNZW51ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvVG9vbGJhckV2ZW50cygpIHtcblxuICAgIGlmICh0aGlzLnRvb2xiYXIpIHtcblxuICAgICAgdGhpcy50b29sYmFyLnRvZ2dsZUxlZnRNZW51LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubGVmdFNpZGVuYXYudG9nZ2xlKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50b29sYmFyLnRvZ2dsZVJpZ2h0TWVudS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJpZ2h0U2lkZW5hdi50b2dnbGUoKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHNldEluaXRpYWxSaWdodE1lbnVWaXNpYmlsaXR5TW9kZXMoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KCF0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLmdldFNpZGVuYXZWaXNpYmlsaXR5KCdyaWdodE1lbnVIaWRkZW4nKSk7XG4gIH1cblxuICBwcml2YXRlIHNldEluaXRpYWxMZWZ0TWVudVZpc2liaWxpdHlNb2RlcygpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KCF0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLmdldFNpZGVuYXZWaXNpYmlsaXR5KCdsZWZ0TWVudUhpZGRlbicpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtY29udGVudCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1zaWRlbmF2LWNvbnRhaW5lci13cmFwcGVyXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi1jb250YWluZXItd3JhcHBlcnttaW4td2lkdGg6MTAyNHB4O3BhZGRpbmc6MzJweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2Q29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUnLFxuICB0ZW1wbGF0ZTogYDxtYXQtbGlzdD5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtLnN0YXJ0ZWQgJiYgaXRlbS50ZW1wbGF0ZSA/IHRydWUgOiBmYWxzZVwiPlxuICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtLnRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dHJlZUxldmVsOiB0cmVlTGV2ZWwgKyAxfVwiXG4gICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG48L21hdC1saXN0PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtbGlzdHtwYWRkaW5nLXRvcDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51Q29tcG9uZW50IHtcblxuICBASW5wdXQoKSBpdGVtcyA9IFtdO1xuXG4gIEBJbnB1dCgpIHRyZWVMZXZlbCA9IC0xO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU2lkZW5hdkNvbXBvbmVudCB9IGZyb20gJy4vc2lkZW5hdi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0U2lkZW5hdk1vZHVsZSwgTWF0TGlzdE1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGVjU2lkZW5hdkNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LWNvbnRlbnQvZGVjLXNpZGVuYXYtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LWl0ZW0vZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtbGVmdC9kZWMtc2lkZW5hdi1tZW51LWxlZnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQvZGVjLXNpZGVuYXYtbWVudS1yaWdodC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUvZGVjLXNpZGVuYXYtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS10aXRsZS9kZWMtc2lkZW5hdi1tZW51LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtdG9vbGJhci9kZWMtc2lkZW5hdi10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vc2lkZW5hdi5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNTaWRlbmF2Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZDb250ZW50Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNTaWRlbmF2Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZDb250ZW50Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1NpZGVuYXZTZXJ2aWNlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbndpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddID0gd2luZG93WydkZWNvcmFTY3JpcHRTZXJ2aWNlJ10gfHwge307XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERlY1NjcmlwdExvYWRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbG9hZCh1cmw6IHN0cmluZywgc2NyaXB0TmFtZTogc3RyaW5nKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc2NyaXB0TG9hZGVkID0gd2luZG93WydkZWNvcmFTY3JpcHRTZXJ2aWNlJ11bc2NyaXB0TmFtZV07XG5cbiAgICAgIGlmIChzY3JpcHRMb2FkZWQpIHtcblxuICAgICAgICBjb25zdCBzY3JpcHQgPSB3aW5kb3dbc2NyaXB0TmFtZV07XG5cbiAgICAgICAgcmVzb2x2ZShzY3JpcHQpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnN0IHNjcmlwdFRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICAgIHNjcmlwdFRhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybCk7XG5cbiAgICAgICAgc2NyaXB0VGFnLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnKTtcblxuICAgICAgICBzY3JpcHRUYWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgd2luZG93WydkZWNvcmFTY3JpcHRTZXJ2aWNlJ11bc2NyaXB0TmFtZV0gPSB0cnVlO1xuXG4gICAgICAgICAgY29uc3Qgc2NyaXB0ID0gd2luZG93W3NjcmlwdE5hbWVdO1xuXG4gICAgICAgICAgcmVzb2x2ZShzY3JpcHQpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgc2NyaXB0VGFnLm9uZXJyb3IgPSByZWplY3Q7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzY3JpcHRUYWcpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9O1xuXG4gIGxvYWRTdHlsZSh1cmw6IHN0cmluZykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgd2luZG93WydzY3JpcHRTZXJ2aWNlTG9hZGVkU3R5bGVzQXJyYXknXSA9IHdpbmRvd1snc2NyaXB0U2VydmljZUxvYWRlZFN0eWxlc0FycmF5J10gfHwge307XG5cbiAgICAgIGNvbnN0IHN0eWxlTG9hZGVkID0gd2luZG93WydzY3JpcHRTZXJ2aWNlTG9hZGVkU3R5bGVzQXJyYXknXVt1cmxdO1xuXG4gICAgICBpZiAoc3R5bGVMb2FkZWQpIHtcblxuICAgICAgICByZXNvbHZlKCk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY29uc3QgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgICAgICBsaW5rVGFnLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcbiAgICAgICAgbGlua1RhZy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAgICAgbGlua1RhZy5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgJ2FsbCcpO1xuICAgICAgICBsaW5rVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG5cbiAgICAgICAgbGlua1RhZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICB3aW5kb3dbJ3NjcmlwdFNlcnZpY2VMb2FkZWRTdHlsZXNBcnJheSddW3VybF0gPSB0cnVlO1xuXG4gICAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgbGlua1RhZy5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobGlua1RhZyk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH07XG5cbiAgbG9hZFN0eWxlQW5kU2NyaXB0KHN0eWxlVXJsLCBzY3JpcHRVcmwsIHNjcmlwdE5hbWVzcGFjZSkge1xuXG4gICAgcmV0dXJuIHRoaXMubG9hZFN0eWxlKHN0eWxlVXJsKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWQoc2NyaXB0VXJsLCBzY3JpcHROYW1lc3BhY2UpO1xuICAgIH0pO1xuXG4gIH1cblxuICBsb2FkTGVhZmxldFNjcmlwdHNBbmRTdHlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkU3R5bGUoJ2h0dHBzOi8vdW5wa2cuY29tL2xlYWZsZXRAMS4zLjMvZGlzdC9sZWFmbGV0LmNzcycpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZFN0eWxlKCdodHRwOi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vZm9udC1hd2Vzb21lLzQuMC4zL2Nzcy9mb250LWF3ZXNvbWUuY3NzJykudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRTdHlsZSgnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9sZWFmbGV0LWVhc3lidXR0b25AMi9zcmMvZWFzeS1idXR0b24uY3NzJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubG9hZCgnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjMuMy9kaXN0L2xlYWZsZXQuanMnLCAnTGVhZmxldCcpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZCgnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9sZWFmbGV0LWVhc3lidXR0b25AMi9zcmMvZWFzeS1idXR0b24uanMnLCAnRWFzeUJ1dHRvbicpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2NyaXB0TG9hZGVyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5zZXJ2aWNlJztcblxuY29uc3QgU0tFVENIRkFCX1NDUklQVF9VUkwgPSAnaHR0cHM6Ly9zdGF0aWMuc2tldGNoZmFiLmNvbS9hcGkvc2tldGNoZmFiLXZpZXdlci0xLjAuMC5qcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1za2V0Y2hmYWItdmlldycsXG4gIHRlbXBsYXRlOiBgPGlmcmFtZSBzcmM9XCJcIiBcbiAgI2FwaUZyYW1lIFxuICBpZD1cImFwaS1mcmFtZVwiIFxuICBoZWlnaHQ9XCI2MjBcIlxuICB3aWR0aD1cIjYyMFwiIFxuICBhbGxvd2Z1bGxzY3JlZW4gXG4gIG1vemFsbG93ZnVsbHNjcmVlbj1cInRydWVcIiBcbiAgd2Via2l0YWxsb3dmdWxsc2NyZWVuPVwidHJ1ZVwiPjwvaWZyYW1lPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTa2V0Y2hmYWJWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBcbiAgc2V0IHNrZXRjaGZhYklkKGlkKSB7XG4gICAgaWYgKGlkKSB7XG4gICAgICB0aGlzLl9za2V0Y2hmYWJJZCA9IGlkO1xuICAgICAgdGhpcy5zdGFydFNrZXRjaGZhYihpZCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNrZXRjaGZhYklkKCkge1xuICAgIHJldHVybiB0aGlzLl9za2V0Y2hmYWJJZDtcbiAgfVxuXG4gIF9za2V0Y2hmYWJJZDogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoJ2FwaUZyYW1lJykgYXBpRnJhbWU6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNTY3JpcHRMb2FkZXJTZXJ2aWNlOiBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHN0YXJ0U2tldGNoZmFiKGlkKSB7XG4gICAgdGhpcy5kZWNTY3JpcHRMb2FkZXJTZXJ2aWNlLmxvYWQoU0tFVENIRkFCX1NDUklQVF9VUkwsICdTa2V0Y2hmYWInKVxuICAgICAgLnRoZW4oKFNrZXRjaGZhYjogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IHRoaXMuYXBpRnJhbWUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgY2xpZW50ID0gbmV3IFNrZXRjaGZhYignMS4wLjAnLCBpZnJhbWUpO1xuICAgICAgICBjbGllbnQuaW5pdCh0aGlzLnNrZXRjaGZhYklkLCB7XG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gb25TdWNjZXNzKGFwaSkge1xuICAgICAgICAgICAgYXBpLnN0YXJ0KCk7XG4gICAgICAgICAgICBhcGkuYWRkRXZlbnRMaXN0ZW5lcigndmlld2VycmVhZHknLCAgKCkgPT4ge30pO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NjcmlwdExvYWRlclNlcnZpY2UgfSBmcm9tICcuL2RlYy1zY3JpcHQtbG9hZGVyLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1NjcmlwdExvYWRlclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTY3JpcHRMb2FkZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NjcmlwdExvYWRlck1vZHVsZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjU2tldGNoZmFiVmlld0NvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNrZXRjaGZhYi12aWV3LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGVjU2NyaXB0TG9hZGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1NrZXRjaGZhYlZpZXdDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1NrZXRjaGZhYlZpZXdDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTa2V0Y2hmYWJWaWV3TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RlcCB9IGZyb20gJy4vZGVjLXN0ZXBzLWxpc3QubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXN0ZXBzLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJoaXN0b3J5LWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsnbGltaXRlZC1oZWlnaHQnOiBtYXhIZWlnaHR9XCIgW3N0eWxlLm1heEhlaWdodF09XCJtYXhIZWlnaHQgfHwgJzEwMCUnXCI+XG5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjhweFwiIGNsYXNzPVwiZGVjLWNvbG9yLWdyZXktZGFya1wiPlxuXG4gICAgPG1hdC1pY29uIGZ4RmxleD1cIjI0cHhcIj57e2ljb259fTwvbWF0LWljb24+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpZ2dlci1mb250XCI+e3sgdGl0bGUgfX08L3NwYW4+XG5cbiAgPC9kaXY+XG5cbiAgPGJyPlxuXG4gIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJoaXN0b3J5LWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdGVwc0xpc3Q7IGxldCBpID0gaW5kZXhcIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cImxlZnQgc3RhcnRcIiBjbGFzcz1cImRlYy1jb2xvci1ncmV5XCI+XG5cbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwic21hbGxlci1pY29uIGRlYy1jb2xvci1ncmV5LWRhcmtcIiBmeEZsZXg9XCIyNHB4XCI+e3sgaSA9PT0gc3RlcHNMaXN0Lmxlbmd0aCAtIDEgPyAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCcgOiAnbGVucycgfX08L21hdC1pY29uPlxuXG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjRweFwiPlxuXG4gICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgPHN0cm9uZyAqbmdJZj1cIml0ZW0udGl0bGVcIj57eyBpdGVtLnRpdGxlIH19PC9zdHJvbmc+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5kYXRlXCI+XG4gICAgICAgICAgICAgIHt7IGl0ZW0uZGF0ZSB8IGRhdGUgfX1cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93VGltZVwiPiB8IHt7IGl0ZW0uZGF0ZSB8IGRhdGU6ICdtZWRpdW1UaW1lJyB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiAqbmdJZj1cIml0ZW0uZGVzY3JpcHRpb25cIiBjbGFzcz1cImRlYy1jb2xvci1ncmV5LWRhcmtcIj5cbiAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJkZWMtY29sb3ItYmxhY2tcIj57eyBpdGVtLmRlc2NyaXB0aW9uIH19PC9zdHJvbmc+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC10YWItYm9keS1jb250ZW50e3BhZGRpbmc6MTZweCAwfS5tYXQtZm9ybS1maWVsZC1wcmVmaXh7bWFyZ2luLXJpZ2h0OjhweCFpbXBvcnRhbnR9Lm1hdC1mb3JtLWZpZWxkLXN1ZmZpeHttYXJnaW4tbGVmdDo4cHghaW1wb3J0YW50fS5tYXQtZWxldmF0aW9uLXowe2JveC1zaGFkb3c6MCAwIDAgMCByZ2JhKDAsMCwwLC4yKSwwIDAgMCAwIHJnYmEoMCwwLDAsLjE0KSwwIDAgMCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MXtib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejJ7Ym94LXNoYWRvdzowIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDJweCAycHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoze2JveC1zaGFkb3c6MCAzcHggM3B4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAzcHggNHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDhweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NHtib3gtc2hhZG93OjAgMnB4IDRweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNHB4IDVweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo1e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA1cHggOHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE0cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejZ7Ym94LXNoYWRvdzowIDNweCA1cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDZweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejd7Ym94LXNoYWRvdzowIDRweCA1cHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDdweCAxMHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAycHggMTZweCAxcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo4e2JveC1zaGFkb3c6MCA1cHggNXB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCA4cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgM3B4IDE0cHggMnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OXtib3gtc2hhZG93OjAgNXB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOXB4IDEycHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNnB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEwe2JveC1zaGFkb3c6MCA2cHggNnB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCAxMHB4IDE0cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAxOHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejExe2JveC1zaGFkb3c6MCA2cHggN3B4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMXB4IDE1cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAyMHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEye2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMnB4IDE3cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyMnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEze2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxM3B4IDE5cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNHB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE0e2JveC1zaGFkb3c6MCA3cHggOXB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxNHB4IDIxcHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE1e2JveC1zaGFkb3c6MCA4cHggOXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxNXB4IDIycHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAyOHB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE2e2JveC1zaGFkb3c6MCA4cHggMTBweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTZweCAyNHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMzBweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxN3tib3gtc2hhZG93OjAgOHB4IDExcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE3cHggMjZweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMycHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTh7Ym94LXNoYWRvdzowIDlweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxOHB4IDI4cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDdweCAzNHB4IDZweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE5e2JveC1zaGFkb3c6MCA5cHggMTJweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMTlweCAyOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzZweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMHtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMHB4IDMxcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCAzOHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIxe2JveC1zaGFkb3c6MCAxMHB4IDEzcHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIxcHggMzNweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQwcHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjJ7Ym94LXNoYWRvdzowIDEwcHggMTRweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjJweCAzNXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggNDJweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyM3tib3gtc2hhZG93OjAgMTFweCAxNHB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyM3B4IDM2cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NHB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejI0e2JveC1zaGFkb3c6MCAxMXB4IDE1cHggLTdweCByZ2JhKDAsMCwwLC4yKSwwIDI0cHggMzhweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOXB4IDQ2cHggOHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJhZGdlLXNtYWxsIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6NnB4fS5tYXQtYmFkZ2UtbGFyZ2UgLm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtc2l6ZToyNHB4fS5tYXQtaDEsLm1hdC1oZWFkbGluZSwubWF0LXR5cG9ncmFwaHkgaDF7Zm9udDo0MDAgMjRweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMiwubWF0LXRpdGxlLC5tYXQtdHlwb2dyYXBoeSBoMntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWgzLC5tYXQtc3ViaGVhZGluZy0yLC5tYXQtdHlwb2dyYXBoeSBoM3tmb250OjQwMCAxNnB4LzI4cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg0LC5tYXQtc3ViaGVhZGluZy0xLC5tYXQtdHlwb2dyYXBoeSBoNHtmb250OjQwMCAxNXB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg1LC5tYXQtdHlwb2dyYXBoeSBoNXtmb250OjQwMCAxMS42MnB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWg2LC5tYXQtdHlwb2dyYXBoeSBoNntmb250OjQwMCA5LjM4cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxMnB4fS5tYXQtYm9keS0yLC5tYXQtYm9keS1zdHJvbmd7Zm9udDo1MDAgMTRweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJvZHksLm1hdC1ib2R5LTEsLm1hdC10eXBvZ3JhcGh5e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5IHAsLm1hdC1ib2R5LTEgcCwubWF0LXR5cG9ncmFwaHkgcHttYXJnaW46MCAwIDEycHh9Lm1hdC1jYXB0aW9uLC5tYXQtc21hbGx7Zm9udDo0MDAgMTJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWRpc3BsYXktNCwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTR7Zm9udDozMDAgMTEycHgvMTEycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNTZweDtsZXR0ZXItc3BhY2luZzotLjA1ZW19Lm1hdC1kaXNwbGF5LTMsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ze2ZvbnQ6NDAwIDU2cHgvNTZweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDJlbX0ubWF0LWRpc3BsYXktMiwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTJ7Zm9udDo0MDAgNDVweC80OHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHg7bGV0dGVyLXNwYWNpbmc6LS4wMDVlbX0ubWF0LWRpc3BsYXktMSwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTF7Zm9udDo0MDAgMzRweC80MHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHh9Lm1hdC1ib3R0b20tc2hlZXQtY29udGFpbmVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1idXR0b24sLm1hdC1mYWIsLm1hdC1mbGF0LWJ1dHRvbiwubWF0LWljb24tYnV0dG9uLC5tYXQtbWluaS1mYWIsLm1hdC1yYWlzZWQtYnV0dG9uLC5tYXQtc3Ryb2tlZC1idXR0b257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWJ1dHRvbi10b2dnbGUsLm1hdC1jYXJke2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhcmQtdGl0bGV7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtY2FyZC1jb250ZW50LC5tYXQtY2FyZC1oZWFkZXIgLm1hdC1jYXJkLXRpdGxlLC5tYXQtY2FyZC1zdWJ0aXRsZXtmb250LXNpemU6MTRweH0ubWF0LWNoZWNrYm94e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNoZWNrYm94LWxheW91dCAubWF0LWNoZWNrYm94LWxhYmVse2xpbmUtaGVpZ2h0OjI0cHh9Lm1hdC1jaGlwe2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjE4cHh9Lm1hdC1jaGlwIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24sLm1hdC1jaGlwIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29ue2ZvbnQtc2l6ZToxOHB4fS5tYXQtdGFibGV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtaGVhZGVyLWNlbGx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2VsbCwubWF0LWZvb3Rlci1jZWxse2ZvbnQtc2l6ZToxNHB4fS5tYXQtY2FsZW5kYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2FsZW5kYXItYm9keXtmb250LXNpemU6MTNweH0ubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9ue2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlciB0aHtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo0MDB9Lm1hdC1kaWFsb2ctdGl0bGV7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWV4cGFuc2lvbi1wYW5lbC1jb250ZW50e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCU7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuMTI1O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb257Zm9udC1zaXplOjE1MCU7bGluZS1oZWlnaHQ6MS4xMjV9Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29uLWJ1dHRvbntoZWlnaHQ6MS41ZW07d2lkdGg6MS41ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b24gLm1hdC1pY29ue2hlaWdodDoxLjEyNWVtO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi41ZW0gMDtib3JkZXItdG9wOi44NDM3NWVtIHNvbGlkIHRyYW5zcGFyZW50fS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVye3RvcDotLjg0Mzc1ZW07cGFkZGluZy10b3A6Ljg0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlcntmb250LXNpemU6NzUlO21hcmdpbi10b3A6LjY2NjY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNzkxNjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC13cmFwcGVye3BhZGRpbmctYm90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjQzNzVlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMXB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjNlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzUlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMjgxMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4yNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7bWFyZ2luLXRvcDouNTQxNjdlbTt0b3A6Y2FsYygxMDAlIC0gMS42NjY2N2VtKX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi4yNWVtIDAgLjc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMDkzNzVlbTttYXJnaW4tdG9wOi0uNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzoxZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5le2JvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuODQzNzVlbTttYXJnaW4tdG9wOi0uMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWdyaWQtdGlsZS1mb290ZXIsLm1hdC1ncmlkLXRpbGUtaGVhZGVye2ZvbnQtc2l6ZToxNHB4fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmUsLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LWdyaWQtdGlsZS1oZWFkZXIgLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fWlucHV0Lm1hdC1pbnB1dC1lbGVtZW50e21hcmdpbi10b3A6LS4wNjI1ZW19Lm1hdC1tZW51LWl0ZW17Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXBhZ2luYXRvciwubWF0LXBhZ2luYXRvci1wYWdlLXNpemUgLm1hdC1zZWxlY3QtdHJpZ2dlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHh9Lm1hdC1yYWRpby1idXR0b24sLm1hdC1zZWxlY3R7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2VsZWN0LXRyaWdnZXJ7aGVpZ2h0OjEuMTI1ZW19Lm1hdC1zbGlkZS10b2dnbGUtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwubWF0LXN0ZXBwZXItdmVydGljYWx7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc3RlcC1sYWJlbHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVke2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRhYi1ncm91cHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10YWItbGFiZWwsLm1hdC10YWItbGlua3tmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdG9vbGJhciwubWF0LXRvb2xiYXIgaDEsLm1hdC10b29sYmFyIGgyLC5tYXQtdG9vbGJhciBoMywubWF0LXRvb2xiYXIgaDQsLm1hdC10b29sYmFyIGg1LC5tYXQtdG9vbGJhciBoNntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowfS5tYXQtdG9vbHRpcHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEwcHg7cGFkZGluZy10b3A6NnB4O3BhZGRpbmctYm90dG9tOjZweH0ubWF0LXRvb2x0aXAtaGFuZHNldHtmb250LXNpemU6MTRweDtwYWRkaW5nLXRvcDo5cHg7cGFkZGluZy1ib3R0b206OXB4fS5tYXQtbGlzdC1pdGVtLC5tYXQtbGlzdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjE2cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtbmF2LWxpc3QgLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweH0ubWF0LW9wdGdyb3VwLWxhYmVse2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zaW1wbGUtc25hY2tiYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4fS5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbntsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdHJlZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10cmVlLW5vZGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxNHB4fS5tYXQtcmlwcGxle292ZXJmbG93OmhpZGRlbn1AbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6YWN0aXZlKXsubWF0LXJpcHBsZXtkaXNwbGF5Om5vbmV9fS5tYXQtcmlwcGxlLm1hdC1yaXBwbGUtdW5ib3VuZGVke292ZXJmbG93OnZpc2libGV9Lm1hdC1yaXBwbGUtZWxlbWVudHtwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXItcmFkaXVzOjUwJTtwb2ludGVyLWV2ZW50czpub25lO3RyYW5zaXRpb246b3BhY2l0eSwtd2Via2l0LXRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpO3RyYW5zaXRpb246b3BhY2l0eSx0cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9LmNkay12aXN1YWxseS1oaWRkZW57Ym9yZGVyOjA7Y2xpcDpyZWN0KDAgMCAwIDApO2hlaWdodDoxcHg7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHg7b3V0bGluZTowOy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlciwuY2RrLW92ZXJsYXktY29udGFpbmVye3BvaW50ZXItZXZlbnRzOm5vbmU7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmNkay1vdmVybGF5LWNvbnRhaW5lcntwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LWNvbnRhaW5lcjplbXB0eXtkaXNwbGF5Om5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVye2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LXBhbmV7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6YXV0bztib3gtc2l6aW5nOmJvcmRlci1ib3g7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9LmNkay1vdmVybGF5LWJhY2tkcm9we3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6MTAwMDtwb2ludGVyLWV2ZW50czphdXRvOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDt0cmFuc2l0aW9uOm9wYWNpdHkgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO29wYWNpdHk6MH0uY2RrLW92ZXJsYXktYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjF9QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTouNn19LmNkay1vdmVybGF5LWRhcmstYmFja2Ryb3B7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yODgpfS5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCwuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjB9LmNkay1vdmVybGF5LWNvbm5lY3RlZC1wb3NpdGlvbi1ib3VuZGluZy1ib3h7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47bWluLXdpZHRoOjFweDttaW4taGVpZ2h0OjFweH0uY2RrLWdsb2JhbC1zY3JvbGxibG9ja3twb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO292ZXJmbG93LXk6c2Nyb2xsfS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbHstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0O2FuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0fS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6bm90KDotd2Via2l0LWF1dG9maWxsKXstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmR9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXple3Jlc2l6ZTpub25lfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZS1tZWFzdXJpbmd7aGVpZ2h0OmF1dG8haW1wb3J0YW50O292ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnQ7cGFkZGluZzoycHggMCFpbXBvcnRhbnQ7Ym94LXNpemluZzpjb250ZW50LWJveCFpbXBvcnRhbnR9Lmhpc3RvcnktY29udGFpbmVye21hcmdpbjoxLjVlbSAwfS5oaXN0b3J5LWNvbnRhaW5lci5saW1pdGVkLWhlaWdodHtvdmVyZmxvdy15OmF1dG99Lmhpc3RvcnktY29udGFpbmVyIC5oaXN0b3J5LWl0ZW06bm90KDpsYXN0LWNoaWxkKXtwb3NpdGlvbjpyZWxhdGl2ZX0uaGlzdG9yeS1jb250YWluZXIgLmhpc3RvcnktaXRlbTpub3QoOmxhc3QtY2hpbGQpOjpiZWZvcmV7Y29udGVudDpcIlwiO3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDozZW07d2lkdGg6MnB4O2JhY2tncm91bmQtY29sb3I6IzkxOTc5YztsZWZ0OjExcHg7dG9wOjE0cHh9Lmhpc3RvcnktY29udGFpbmVyIC5oaXN0b3J5LWl0ZW0gLnNtYWxsZXItaWNvbntmb250LXNpemU6MTZweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjttYXJnaW4tdG9wOjJweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTdGVwc0xpc3RDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGljb24gPSAnaGlzdG9yeSc7XG5cbiAgQElucHV0KCkgdGl0bGUgPSAnJztcblxuICBASW5wdXQoKSBzaG93VGltZTogYm9vbGVhbjtcblxuICBASW5wdXQoKSBtYXhIZWlnaHQ7XG5cbiAgQElucHV0KCkgc3RlcHNMaXN0OiBTdGVwW10gPSBbXTtcblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTdGVwc0xpc3RDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zdGVwcy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY1N0ZXBzTGlzdENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNTdGVwc0xpc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNTdGVwc0xpc3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zdHJpbmctYXJyYXktaW5wdXQnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm1vZGUgPT0gJ2lucHV0J1wiPlxuXG4gIDxtYXQtZm9ybS1maWVsZCAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbKG5nTW9kZWwpXT1cInZhbHVlQXNTdHJpbmdcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gIDxtYXQtZm9ybS1maWVsZCAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cbiAgICA8dGV4dGFyZWEgbWF0SW5wdXRcbiAgICBbcm93c109XCJyb3dzXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbKG5nTW9kZWwpXT1cInZhbHVlQXNTdHJpbmdcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICAgIDwvdGV4dGFyZWE+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG5cbjwvbmctY29udGFpbmVyPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgbmFtZTtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjtcblxuICBASW5wdXQoKSBtb2RlID0gJ3RleHRhcmVhJztcblxuICBASW5wdXQoKSByb3dzID0gMztcblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogc3RyaW5nW10ge1xuXG4gICAgcmV0dXJuIHRoaXMuaW5uZXJBcnJheTtcblxuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogc3RyaW5nW10pIHtcblxuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyQXJyYXkpIHtcblxuICAgICAgdGhpcy5pbm5lckFycmF5ID0gdjtcblxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgdmFsdWVBc1N0cmluZygpOiBzdHJpbmcge1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0QXJyYXlBc1N0cmluZygpO1xuXG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZUFzU3RyaW5nKHY6IHN0cmluZykge1xuXG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJBcnJheSkge1xuXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdHJpbmdUb0FycmF5KHYpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyQXJyYXk6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgLy9cbiAgZ2V0QXJyYXlBc1N0cmluZygpIHtcblxuICAgIHJldHVybiB0aGlzLmFycmF5VG9TdHJpbmcodGhpcy52YWx1ZSk7XG5cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZ1tdKSB7XG5cbiAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgfVxuXG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICBwcml2YXRlIHN0cmluZ1RvQXJyYXkoc3RyaW5nT2ZBcnJheTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGlmIChzdHJpbmdPZkFycmF5KSB7XG5cbiAgICAgIGNvbnN0IHJlZ0V4cCA9IC9bXixcXHNdW14sXFxzXSpbXixcXHNdKi9nO1xuXG4gICAgICByZXR1cm4gc3RyaW5nT2ZBcnJheS5tYXRjaChyZWdFeHApO1xuXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcnJheVRvU3RyaW5nKGFycmF5T2ZzdHJpbmc6IHN0cmluZ1tdKTogc3RyaW5nIHtcblxuICAgIGlmIChhcnJheU9mc3RyaW5nKSB7XG5cbiAgICAgIHJldHVybiBhcnJheU9mc3RyaW5nLmpvaW4oJywgJyk7XG5cbiAgICB9XG5cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY1N0cmluZ0FycmF5SW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zdHJpbmctYXJyYXktaW5wdXQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY1N0cmluZ0FycmF5SW5wdXRDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNTdHJpbmdBcnJheUlucHV0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtdGFiJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFiQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgdG90YWw6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBjb250ZW50OiBUZW1wbGF0ZVJlZjxEZWNUYWJDb21wb25lbnQ+O1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbnN1cmVUYWJOYW1lKCk7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVRhYk5hbWUgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSA8ZGVjLXRhYj4gY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXRhYi1tZW51JyxcbiAgdGVtcGxhdGU6IGA8cD5cbiAgdGFiLW1lbnUgd29ya3MhXG48L3A+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFiTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgYWN0aXZlVGFiOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgY29udGVudDogVGVtcGxhdGVSZWY8RGVjVGFiTWVudUNvbXBvbmVudD47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY1RhYkNvbXBvbmVudCB9IGZyb20gJy4vdGFiL3RhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjVGFiTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXRhYnMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCIhaGlkZGVuXCI+XG5cbiAgPCEtLSBUQUJTIC0tPlxuICA8bWF0LXRhYi1ncm91cCBbc2VsZWN0ZWRJbmRleF09XCJhY3RpdmVUYWJJbmRleFwiIChmb2N1c0NoYW5nZSk9XCJvbkNoYW5nZVRhYigkZXZlbnQpXCIgW2R5bmFtaWNIZWlnaHRdPVwidHJ1ZVwiPlxuXG4gICAgPCEtLSBUQUIgLS0+XG4gICAgPG1hdC10YWIgKm5nRm9yPVwibGV0IHRhYiBvZiB0YWJzO1wiIFtkaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIj5cblxuICAgICAgPCEtLSBUQUIgTEFCRUwgLS0+XG4gICAgICA8bmctdGVtcGxhdGUgbWF0LXRhYi1sYWJlbD5cbiAgICAgICAge3sgdGFiLmxhYmVsIH19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1zbWFsbFwiICpuZ0lmPVwidGFiLnRvdGFsID49IDBcIj57eyBwYXJzZVRvdGFsKHRhYi50b3RhbCkgfX08L3NwYW4+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICA8IS0tIFRBQiBDT05URU5UIFdSQVBQRVIgLS0+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvdWxUYWJCZURpc3BsYXllZCh0YWIpXCI+XG5cbiAgICAgICAgPCEtLSBUQUIgTUVOVSAtLT5cbiAgICAgICAgPGRpdiAqbmdJZj1cInRhYk1lbnVDb21wb25lbnRcIiBjbGFzcz1cIm1lbnUtd3JhcHBlclwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWJNZW51Q29tcG9uZW50LmNvbnRlbnQ7IGNvbnRleHQ6IHsgYWN0aXZlVGFiOiBhY3RpdmVUYWIgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tIFRBQlMgQ09OVEVOVCAtLT5cbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3RhYi1wYWRkaW5nJzogcGFkZGluZ31cIj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbWF0LXRhYj5cblxuICA8L21hdC10YWItZ3JvdXA+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tZW51LXdyYXBwZXJ7dGV4dC1hbGlnbjpyaWdodDtwYWRkaW5nOjhweCAwfS50YWItcGFkZGluZ3twYWRkaW5nOjE2cHggMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjVGFiQ29tcG9uZW50KSB0YWJzOiBRdWVyeUxpc3Q8RGVjVGFiQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkKERlY1RhYk1lbnVDb21wb25lbnQpIHRhYk1lbnVDb21wb25lbnQ6IERlY1RhYk1lbnVDb21wb25lbnQ7XG5cbiAgQElucHV0KCkgaGlkZGVuOyAvLyBoaWRlcyB0aGUgdGFicyBncm91cCB0byByZWxvYWQgaXRzIGNvbnRlbnRzXG5cbiAgQElucHV0KCkgcGVyc2lzdCA9IHRydWU7XG5cbiAgQElucHV0KCkgZGVzdHJveU9uQmx1ciA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKSBwYWRkaW5nID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgYWN0aXZlVGFiKHY6IHN0cmluZykge1xuICAgIGlmICh2ICYmIHRoaXMuX2FjdGl2ZVRhYiAhPT0gdikge1xuICAgICAgdGhpcy5fYWN0aXZlVGFiID0gdjtcbiAgICAgIHRoaXMucGVyc2lzdFRhYih2KTtcbiAgICB9XG4gIH1cbiAgZ2V0IGFjdGl2ZVRhYigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiO1xuICB9XG5cbiAgQE91dHB1dCgpIGFjdGl2ZVRhYkNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBnZXQgYWN0aXZlVGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiSW5kZXg7XG4gIH1cblxuICBnZXQgYWN0aXZlVGFiT2JqZWN0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYk9iamVjdDtcbiAgfVxuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYkluZGV4OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfYWN0aXZlVGFiT2JqZWN0OiBhbnk7XG5cbiAgcHJpdmF0ZSBhY3RpdmF0ZWRUYWJzOiBhbnkgPSB7fTtcblxuICBwcml2YXRlIHF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBwYXRoRnJvbVJvb3QgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZU5hbWUoKTtcbiAgICB0aGlzLndhdGNoVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlVGFiTmFtZXMoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgICAgIGlmIChxdWVyeVBhcmFtcyAmJiBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0pIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRhYiA9IHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXTtcbiAgICAgICAgdGhpcy5zZWxlY3RUYWIoY3VycmVudFRhYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXJ0U2VsZWN0ZWRUYWIoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCk7XG4gIH1cblxuICBzaG91bFRhYkJlRGlzcGxheWVkKHRhYikge1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB0aGlzLl9hY3RpdmVUYWJPYmplY3QgPT09IHRhYjtcbiAgICBjb25zdCBpc0FjdGl2YXRlZCA9IHRoaXMuYWN0aXZhdGVkVGFic1t0YWIubmFtZV07XG4gICAgcmV0dXJuIGlzU2VsZWN0ZWQgfHwgKCF0aGlzLmRlc3Ryb3lPbkJsdXIgJiYgaXNBY3RpdmF0ZWQpO1xuICB9XG5cbiAgb25DaGFuZ2VUYWIoJGV2ZW50KSB7XG4gICAgY29uc3QgYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKVskZXZlbnQuaW5kZXhdO1xuICAgIHRoaXMuYWN0aXZlVGFiID0gYWN0aXZlVGFiT2JqZWN0Lm5hbWU7XG4gIH1cblxuICBwYXJzZVRvdGFsKHRvdGFsKSB7XG5cbiAgICByZXR1cm4gdG90YWwgIT09IG51bGwgJiYgdG90YWwgPj0gMCA/ICB0b3RhbCA6ICc/JztcblxuICB9XG5cbiAgcmVzZXQoKSB7XG5cbiAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcblxuICAgIH0sIDEwKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjb21wb25lbnRUYWJOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnLXRhYic7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVVuaXF1ZU5hbWUgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSB0YWIgY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgLyogZW5zdXJlVW5pcXVlVGFiTmFtZXNcbiAgICogVGhpcyBtZXRob2QgcHJldmVudHMgdGhlIHVzZSBvZiB0aGUgc2FtZSBuYW1lIGZvciBtb3JlIHRoYW4gb25lIHRhYlxuICAgKiB3aGF0IHdvdWxkIGVuZGluZyB1cCBjb25mbGljdGluZyB0aGUgdGFicyBhY3RpdmF0aW9uIG9uY2UgdGhpcyBpcyBkb25lIHZpYSB0YWIgbmFtZVxuICAqL1xuXG4gIHByaXZhdGUgZW5zdXJlVW5pcXVlVGFiTmFtZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlcywgcmVqKSA9PiB7XG4gICAgICBjb25zdCBuYW1lcyA9IHt9O1xuICAgICAgdGhpcy50YWJzLnRvQXJyYXkoKS5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICAgIGlmICghbmFtZXNbdGFiLm5hbWVdKSB7XG4gICAgICAgICAgbmFtZXNbdGFiLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWNUYWJDb21wb25lbnRFcnJvcjogVGhlIDxkZWMtdGFicz4gY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gVGhlIG5hbWUgJHt0YWIubmFtZX0gd2FzIHVzZWQgbW9yZSB0aGFuIG9uY2UuYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHBlcnNpc3RUYWIodGFiKSB7XG4gICAgaWYgKHRoaXMucGVyc2lzdCkge1xuICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICAgICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldID0gdGFiO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0VGFiID0gKHRhYk5hbWUpID0+IHtcbiAgICBpZiAodGhpcy50YWJzKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYk5hbWU7XG4gICAgICB0aGlzLmFjdGl2YXRlZFRhYnNbdGFiTmFtZV0gPSB0cnVlO1xuICAgICAgdGhpcy5fYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5maWx0ZXIodGFiID0+IHRhYi5uYW1lID09PSB0YWJOYW1lKVswXTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYkluZGV4ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5pbmRleE9mKHRoaXMuX2FjdGl2ZVRhYk9iamVjdCk7XG4gICAgICB0aGlzLmFjdGl2ZVRhYkNoYW5nZS5lbWl0KHRhYk5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRTZWxlY3RlZFRhYigpIHtcbiAgICBjb25zdCBhY3RpdmVUYWIgPSB0aGlzLmFjdGl2ZVRhYiB8fCB0aGlzLnRhYnMudG9BcnJheSgpWzBdLm5hbWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGF2b2lkIGNoYW5nZSBhZnRlciBjb21wb25lbnQgY2hlY2tlZCBlcnJvclxuICAgICAgdGhpcy5zZWxlY3RUYWIoYWN0aXZlVGFiKTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJJblVybFF1ZXJ5KCkge1xuICAgIHRoaXMucXVlcnlQYXJhbXNTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICBjb25zdCB0YWI6IHN0cmluZyA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV07XG4gICAgICB0aGlzLnNlbGVjdFRhYih0YWIpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCkge1xuICAgIHRoaXMucXVlcnlQYXJhbXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjVGFiQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY1RhYkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY1RhYnNDb21wb25lbnQgfSBmcm9tICcuL3RhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1RhYk1vZHVsZSB9IGZyb20gJy4vdGFiL3RhYi5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjVGFiTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIERlY1RhYk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNUYWJzQ29tcG9uZW50LCBEZWNUYWJNZW51Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1xuICAgIERlY1RhYnNDb21wb25lbnQsXG4gICAgRGVjVGFiTWVudUNvbXBvbmVudCxcbiAgICBEZWNUYWJNb2R1bGVcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFic01vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEV2ZW50VHlwZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFVwbG9hZFByb2dyZXNzIH0gZnJvbSAnLi91cGxvYWQubW9kZWxzJztcblxuY29uc3QgVVBMT0FEX0VORFBPSU5UID0gJy91cGxvYWQnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBERUNfVVBMT0FEX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY1VwbG9hZENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtdXBsb2FkJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCIocHJvZ3Jlc3NlcyAmJiBwcm9ncmVzc2VzLmxlbmd0aCkgPyB0cnVlIDogZmFsc2VcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cbiAgICA8c3BhbiAoY2xpY2spPVwib3BlbkZpbGVTZWxlY3Rpb24oKVwiIGNsYXNzPVwiY2xpY2tcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L3NwYW4+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgdXBsb2FkUHJvZ3Jlc3Mgb2YgcHJvZ3Jlc3Nlc1wiIGNsYXNzPVwiZGVjLXVwbG9hZC1wcm9ncmVzcy13cmFwcGVyXCI+XG4gICAgICA8bWF0LXByb2dyZXNzLWJhclxuICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICBbbW9kZV09XCJnZXRQcm9ncmVzc2Jhck1vZGUodXBsb2FkUHJvZ3Jlc3MpXCJcbiAgICAgICAgW3ZhbHVlXT1cImdldFByb2dyZXNzVmFsdWVCYXNlZE9uTW9kZSh1cGxvYWRQcm9ncmVzcylcIj5cbiAgICAgIDwvbWF0LXByb2dyZXNzLWJhcj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICA8c21hbGw+XG4gICAgICAgICAge3sgdXBsb2FkUHJvZ3Jlc3MudmFsdWUgfX0lIC0ge3sgdXBsb2FkUHJvZ3Jlc3MuZmlsZU5hbWUgfX1cbiAgICAgICAgPC9zbWFsbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuXG5cbjxpbnB1dCB0eXBlPVwiZmlsZVwiICNpbnB1dEZpbGUgKGNoYW5nZSk9XCJmaWxlc0NoYW5nZWQoJGV2ZW50KVwiIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuXG5gLFxuICBzdHlsZXM6IFtgLmNsaWNre2N1cnNvcjpwb2ludGVyfWlucHV0e2Rpc3BsYXk6bm9uZX0udGV4dC1jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LmRlYy11cGxvYWQtcHJvZ3Jlc3Mtd3JhcHBlcntwYWRkaW5nOjhweCAwfWBdLFxuICBwcm92aWRlcnM6IFtERUNfVVBMT0FEX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY1VwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBwcm9ncmVzc2VzOiBVcGxvYWRQcm9ncmVzc1tdID0gW107XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSB1cGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgcHJvZ3Jlc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXRGaWxlJykgaW5wdXRGaWxlOiBFbGVtZW50UmVmO1xuXG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnlbXTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgVkFMVUVcbiAgKi9cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHY6IGFueVtdKSB7XG4gICAgdGhpcy52YWx1ZSA9IHY7XG4gIH1cblxuXG4gIGZpbGVzQ2hhbmdlZChldmVudCkge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZXZlbnQudGFyZ2V0LmZpbGVzLmxlbmd0aDsgeCsrKSB7XG4gICAgICB0aGlzLnVwbG9hZEZpbGUoZXZlbnQudGFyZ2V0LmZpbGVzW3hdLCB4KTtcbiAgICB9XG4gIH1cblxuICBvcGVuRmlsZVNlbGVjdGlvbigpIHtcbiAgICB0aGlzLmlucHV0RmlsZS5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxuICBnZXRQcm9ncmVzc2Jhck1vZGUocHJvZ3Jlc3MpIHtcblxuICAgIGxldCBtb2RlO1xuXG4gICAgc3dpdGNoIChwcm9ncmVzcy52YWx1ZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBtb2RlID0gJ2J1ZmZlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMDA6XG4gICAgICAgIG1vZGUgPSAnaW5kZXRlcm1pbmF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBtb2RlO1xuXG4gIH1cblxuICBnZXRQcm9ncmVzc1ZhbHVlQmFzZWRPbk1vZGUocHJvZ3Jlc3MpIHtcbiAgICBjb25zdCBtb2RlID0gdGhpcy5nZXRQcm9ncmVzc2Jhck1vZGUocHJvZ3Jlc3MpO1xuICAgIGNvbnN0IHZhbHVlID0gbW9kZSA9PT0gJ2J1ZmZlcicgPyAwIDogcHJvZ3Jlc3MudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGxvYWRGaWxlKGZpbGUsIGluZGV4KSB7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGNvbnN0IHByb2dyZXNzOiBVcGxvYWRQcm9ncmVzcyA9IHtcbiAgICAgICAgZmlsZUluZGV4OiBpbmRleCxcbiAgICAgICAgZmlsZU5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgdmFsdWU6IDAsXG4gICAgICB9O1xuICAgICAgdGhpcy5wcm9ncmVzc2VzLnB1c2gocHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5zZXJ2aWNlLnVwbG9hZChVUExPQURfRU5EUE9JTlQsIFtmaWxlXSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NhdGNoRXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgcHJvZ3Jlc3MuZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgIHRoaXMuZXJyb3IuZW1pdCgnbWVzc2FnZS5lcnJvci51bmV4cGVjdGVkJyk7XG4gICAgICAgICAgdGhpcy5kZXRlY3RVcGxvYWRFbmQoKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzcykge1xuICAgICAgICAgIGNvbnN0IHBlcmNlbnREb25lID0gTWF0aC5yb3VuZCgoMTAwICogZXZlbnQubG9hZGVkKSAvIGV2ZW50LnRvdGFsKTtcbiAgICAgICAgICBwcm9ncmVzcy52YWx1ZSA9IHBlcmNlbnREb25lID09PSAxMDAgPyBwZXJjZW50RG9uZSA6IHBhcnNlRmxvYXQocGVyY2VudERvbmUudG9GaXhlZCgyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICBwcm9ncmVzcy52YWx1ZSA9IDEwMDtcbiAgICAgICAgICBwcm9ncmVzcy5maWxlID0gZXZlbnQuYm9keTtcbiAgICAgICAgICB0aGlzLmRldGVjdFVwbG9hZEVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MuZW1pdCh0aGlzLnByb2dyZXNzZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RVcGxvYWRFbmQoKSB7XG5cbiAgICBjb25zdCBzdGlsbFVwbG9hZGluZyA9IHRoaXMucHJvZ3Jlc3Nlcy5maWx0ZXIoKHByb2dyZXNzKSA9PiB7XG4gICAgICByZXR1cm4gcHJvZ3Jlc3MudmFsdWUgPCAxMDA7XG4gICAgfSk7XG5cbiAgICBpZiAoIXN0aWxsVXBsb2FkaW5nLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbWl0VXBsb2FkZWRGaWxlcygpO1xuICAgICAgdGhpcy5jbGVhcklucHV0RmlsZSgpO1xuICAgICAgdGhpcy5jbGVhclByb2dyZXNzZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFySW5wdXRGaWxlKCkge1xuICAgIHRoaXMuaW5wdXRGaWxlLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJQcm9ncmVzc2VzKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NlcyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0VXBsb2FkZWRGaWxlcygpIHtcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMucHJvZ3Jlc3Nlcy5tYXAoKHVwbG9hZFByb2dyZXNzOiBVcGxvYWRQcm9ncmVzcykgPT4ge1xuICAgICAgcmV0dXJuIHVwbG9hZFByb2dyZXNzLmZpbGU7XG4gICAgfSk7XG4gICAgdGhpcy52YWx1ZSA9IFsuLi5maWxlc107XG4gICAgdGhpcy51cGxvYWRlZC5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNVcGxvYWRDb21wb25lbnQgfSBmcm9tICcuL3VwbG9hZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNVcGxvYWRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1VwbG9hZENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1VwbG9hZE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIENhbkxvYWQsIFJvdXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2VcbiAgKSB7fVxuXG4gIGNhbkxvYWQocm91dGU6IFJvdXRlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQXV0aGVudGljYXRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkuZmV0Y2hDdXJyZW50TG9nZ2VkVXNlcigpXG4gICAgLnBpcGUoXG4gICAgICBtYXAoKHVzZXI6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gKHVzZXIgJiYgdXNlci5pZCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9KVxuICAgICkgYXMgT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dGhHdWFyZCB9IGZyb20gJy4vYXV0aC1ndWFyZC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNBdXRoR3VhcmRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHdWFyZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU25hY2tCYXJTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtc25hY2stYmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGVjU25hY2tCYXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU25hY2tCYXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgU2tpcFNlbGYsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERlY1NuYWNrQmFyTW9kdWxlIH0gZnJvbSAnLi8uLi9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vZGVjb3JhLWFwaS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIERlY1NuYWNrQmFyTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNBcGlTZXJ2aWNlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0FwaU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogRGVjQXBpTW9kdWxlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnRGVjQXBpTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVXNlckF1dGhEYXRhIHtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgY291bnRyeTogc3RyaW5nO1xuICBwdWJsaWMgY29tcGFueTogc3RyaW5nO1xuICBwdWJsaWMgcm9sZTogbnVtYmVyO1xuICBwdWJsaWMgcGVybWlzc2lvbnM6IEFycmF5PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IodXNlcjogYW55ID0ge30pIHtcbiAgICB0aGlzLmlkID0gdXNlci5pZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5lbWFpbCA9IHVzZXIuZW1haWwgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMubmFtZSA9IHVzZXIubmFtZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5jb3VudHJ5ID0gdXNlci5jb3VudHJ5IHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvbXBhbnkgPSB1c2VyLmNvbXBhbnkgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucm9sZSA9IHVzZXIucm9sZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5wZXJtaXNzaW9ucyA9IHVzZXIucGVybWlzc2lvbnMgfHwgdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9naW5EYXRhIHtcbiAgZW1haWw6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbiAga2VlcExvZ2dlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNlYm9va0xvZ2luRGF0YSB7XG4gIGtlZXBMb2dnZWQ6IGJvb2xlYW47XG4gIGZhY2Vib29rVG9rZW46IHN0cmluZztcbn1cblxuLypcbiAgKiBGaWx0ZXJHcm91cHNcbiAgKlxuICAqIGFuIEFycmF5IG9mIGZpbHRlciBncm91cFxuICAqL1xuZXhwb3J0IHR5cGUgRmlsdGVyR3JvdXBzID0gRmlsdGVyR3JvdXBbXTtcblxuLypcbiAgKiBGaWx0ZXJzXG4gICpcbiAgKiBhbiBBcnJheSBvZiBmaWx0ZXJcbiAgKi9cbmV4cG9ydCB0eXBlIEZpbHRlcnMgPSBGaWx0ZXJbXTtcblxuLypcbiAgKiBGaWx0ZXJEYXRhXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJEYXRhIHtcbiAgZW5kcG9pbnQ6IHN0cmluZztcbiAgcGF5bG9hZDogRGVjRmlsdGVyO1xuICBjYms/OiBGdW5jdGlvbjtcbiAgY2xlYXI/OiBib29sZWFuO1xufVxuXG4vKlxuICAqIEZpbHRlclxuICAqXG4gICogRmlsdGVyIGNvbmZpZ3VyYXRpb25cbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjRmlsdGVyIHtcbiAgZmlsdGVyR3JvdXBzPzogRmlsdGVyR3JvdXBzO1xuICBwcm9qZWN0Vmlldz86IGFueTtcbiAgc29ydD86IGFueTtcbiAgcGFnZT86IG51bWJlcjtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHRleHRTZWFyY2g/OiBzdHJpbmc7XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemVkRGVjRmlsdGVyIHtcbiAgZmlsdGVyPzogc3RyaW5nO1xuICBwcm9qZWN0Vmlldz86IHN0cmluZztcbiAgc29ydD86IHN0cmluZztcbiAgcGFnZT86IG51bWJlcjtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHRleHRTZWFyY2g/OiBzdHJpbmc7XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBTaWdubGUgZmlsdGVyXG4gICovXG5leHBvcnQgY2xhc3MgRmlsdGVyIHtcbiAgcHJvcGVydHk6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSA9IHt9KSB7XG4gICAgdGhpcy5wcm9wZXJ0eSA9IGRhdGEucHJvcGVydHk7XG4gICAgdGhpcy52YWx1ZSA9IEFycmF5LmlzQXJyYXkoZGF0YS5wcm9wZXJ0eSkgPyBkYXRhLnByb3BlcnR5IDogW2RhdGEucHJvcGVydHldO1xuICB9XG59XG5cbi8qXG4gICogRmlsdGVyR3JvdXBcbiAgKlxuICAqIEdyb3VwIG9mIEZpbHRlclxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJHcm91cCB7XG4gIGZpbHRlcnM6IEZpbHRlcnM7XG59XG5cbi8qXG4gICogQ29sdW1uc1NvcnRDb25maWdcbiAgKlxuICAqIENvbmZpZ3VyYXRpb24gdG8gc29ydCBzb3J0XG4gICovXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbnNTb3J0Q29uZmlnIHtcbiAgcHJvcGVydHk6IHN0cmluZztcbiAgb3JkZXI6IHtcbiAgICB0eXBlOiAnYXNjJyB8ICdkZXNjJ1xuICB9O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIEluamVjdGlvblRva2VuLCBTa2lwU2VsZiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUsIEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZyB9IGZyb20gJy4vY29uZmlndXJhdGlvbi1zZXJ2aWNlLm1vZGVscyc7XG5cbmV4cG9ydCBjb25zdCBERUNPUkFfQ09ORklHVVJBVElPTl9TRVJWSUNFX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZz4oJ0RFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBJbml0RGVjQ29uZmlndXJhdGlvblNlcnZpY2UoaHR0cDogSHR0cENsaWVudCwgc2VydmljZUNvbmZpZzogRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcpIHtcbiAgcmV0dXJuIG5ldyBEZWNDb25maWd1cmF0aW9uU2VydmljZShodHRwLCBzZXJ2aWNlQ29uZmlnKTtcbn1cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbmZpZ3VyYXRpb25Nb2R1bGUge1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogRGVjQ29uZmlndXJhdGlvbk1vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjQ29uZmlndXJhdGlvbk1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcpIHtcblxuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRGVjQ29uZmlndXJhdGlvbk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IERFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBEZWNDb25maWd1cmF0aW9uU2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBJbml0RGVjQ29uZmlndXJhdGlvblNlcnZpY2UsXG4gICAgICAgICAgZGVwczogW0h0dHBDbGllbnQsIERFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgRGVjQ29uZmlndXJhdGlvbkluaXRpYWxpemVyID0gKGRlY0NvbmZpZzogRGVjQ29uZmlndXJhdGlvblNlcnZpY2UpID0+IHtcbiAgcmV0dXJuICgpID0+IGRlY0NvbmZpZy5sb2FkQ29uZmlnKCk7XG59O1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCwgUm91dGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBvZiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25HdWFyZCBpbXBsZW1lbnRzIENhbkxvYWQsIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XG5cbiAgY2FuTG9hZChyb3V0ZTogUm91dGUpIHtcbiAgICBpZiAocm91dGUuZGF0YSAmJiAhcm91dGUuZGF0YS5wZXJtaXNzaW9ucykge1xuICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcm1pc3Npb25zID0gcm91dGUuZGF0YS5wZXJtaXNzaW9ucztcbiAgICByZXR1cm4gdGhpcy5oYXNBY2Nlc3MocGVybWlzc2lvbnMpO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgaWYgKHJvdXRlLmRhdGEgJiYgIXJvdXRlLmRhdGEucGVybWlzc2lvbnMpIHtcbiAgICAgIHRoaXMubm90QWxsb3dlZCgpO1xuICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJtaXNzaW9ucyA9IHJvdXRlLmRhdGEucGVybWlzc2lvbnM7XG4gICAgcmV0dXJuIHRoaXMuaGFzQWNjZXNzKHBlcm1pc3Npb25zKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FuQWN0aXZhdGUocm91dGUsIHN0YXRlKTtcbiAgfVxuXG4gIG5vdEFsbG93ZWQoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZm9yYmlkZW4nXSk7XG4gIH1cblxuICBoYXNBY2Nlc3MocGVybWlzc2lvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkudXNlciRcbiAgICAucGlwZShcbiAgICAgIG1hcCh1c2VyID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICBjb25zdCBhbGxvd2VkID0gdGhpcy5pc0FsbG93ZWRBY2Nlc3ModXNlci5wZXJtaXNzaW9ucywgcGVybWlzc2lvbnMpO1xuICAgICAgICAgIGlmICghYWxsb3dlZCkge1xuICAgICAgICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FsbG93ZWRBY2Nlc3ModXNlclBlcm1pc3Npb25zOiBzdHJpbmdbXSwgY3VycmVudFBlcm1pc3Npb25zOiBzdHJpbmdbXSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXRjaGluZ1JvbGUgPSBjdXJyZW50UGVybWlzc2lvbnMuZmluZCgodXNlclJvbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHVzZXJQZXJtaXNzaW9ucy5maW5kKChhbG93ZWRSb2xlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGFsb3dlZFJvbGUgPT09IHVzZXJSb2xlO1xuICAgICAgICB9KSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoaW5nUm9sZSA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1Blcm1pc3Npb25HdWFyZCB9IGZyb20gJy4vZGVjLXBlcm1pc3Npb24tZ3VhcmQuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNQZXJtaXNzaW9uR3VhcmRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQZXJtaXNzaW9uR3VhcmRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9wZW5Db25uZWN0aW9uIH0gZnJvbSAnLi93cy1jbGllbnQubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY1dzQ2xpZW50U2VydmljZSB7XG5cbiAgcHJpdmF0ZSBjb25uZWN0aW9uOiB7XG4gICAgW2tleTogc3RyaW5nXTogT3BlbkNvbm5lY3Rpb25cbiAgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjb25uZWN0KHVybCkge1xuXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvblt1cmxdO1xuXG4gICAgaWYgKGNvbm5lY3Rpb24pIHtcblxuICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5jb25uZWN0VG9Xcyh1cmwpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGNvbm5lY3RUb1dzKHVybCk6IE9wZW5Db25uZWN0aW9uIHtcblxuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSB0aGlzLm9wZW5Db25uZWN0aW9uKHVybCk7XG5cbiAgICB0aGlzLmNvbm5lY3Rpb25bdXJsXSA9IGNvbm5lY3Rpb247XG5cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcblxuICB9XG5cblxuICBwcml2YXRlIG9wZW5Db25uZWN0aW9uKHVybDogc3RyaW5nLCBjb25uZWN0aW9uPzogT3BlbkNvbm5lY3Rpb24pOiBPcGVuQ29ubmVjdGlvbiB7XG5cbiAgICBpZiAoY29ubmVjdGlvbikge1xuXG4gICAgICBjb25uZWN0aW9uLmNoYW5uZWwgPSBuZXcgV2ViU29ja2V0KHVybCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25uZWN0aW9uID0gY29ubmVjdGlvbiA/IGNvbm5lY3Rpb24gOiB7XG4gICAgICAgIGNoYW5uZWw6IG5ldyBXZWJTb2NrZXQodXJsKSxcbiAgICAgICAgbWVzc2FnZXM6IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKSxcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICBjb25uZWN0aW9uLmNoYW5uZWwub25jbG9zZSA9ICgpID0+IHRoaXMub3BlbkNvbm5lY3Rpb24odXJsLCBjb25uZWN0aW9uKTtcblxuICAgIGNvbm5lY3Rpb24uY2hhbm5lbC5vbmVycm9yID0gKCkgPT4gdGhpcy5vcGVuQ29ubmVjdGlvbih1cmwsIGNvbm5lY3Rpb24pO1xuXG4gICAgY29ubmVjdGlvbi5jaGFubmVsLm9ubWVzc2FnZSA9IChhKSA9PiB7XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlcyA9IGNvbm5lY3Rpb24ubWVzc2FnZXMuZ2V0VmFsdWUoKTtcblxuICAgICAgY3VycmVudE1lc3NhZ2VzLnVuc2hpZnQoYS5kYXRhKTtcblxuICAgICAgY29ubmVjdGlvbi5tZXNzYWdlcy5uZXh0KGN1cnJlbnRNZXNzYWdlcyk7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1dzQ2xpZW50U2VydmljZSB9IGZyb20gJy4vd3MtY2xpZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1dzQ2xpZW50U2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1dzQ2xpZW50TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbImZpbHRlciIsIm5vb3AiLCJBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiIsIlRodW1ib3JTZXJ2ZXJIb3N0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQVlFLDRCQUFtQixlQUE0QixFQUNyQztRQURTLG9CQUFlLEdBQWYsZUFBZSxDQUFhO1FBQ3JDLGNBQVMsR0FBVCxTQUFTO0tBQXVCOzs7Ozs7O0lBRTFDLGlDQUFJOzs7Ozs7SUFBSixVQUFLLE9BQWUsRUFBRSxJQUFpQixFQUFFLFFBQWM7UUFBZCx5QkFBQSxFQUFB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QUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtDQUFrQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQ0FBa0MsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSw4Q0FBOEMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG1DQUFtQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQ0FBZ0MsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDJCQUEyQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwyQkFBMkIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDBCQUEwQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDZCQUE2QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHNDQUFzQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQ0FBa0MsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUs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