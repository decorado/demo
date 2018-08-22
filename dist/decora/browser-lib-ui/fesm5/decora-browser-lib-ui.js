import { Injectable, Component, Input, ContentChild, TemplateRef, EventEmitter, Output, NgModule, ViewChild, ContentChildren, forwardRef, ComponentFactoryResolver, ViewContainerRef, ElementRef, HostListener, Renderer, Directive, SkipSelf, Optional, Inject, InjectionToken, defineInjectable, inject } from '@angular/core';
import { MatSnackBar, MatAutocompleteTrigger, MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogRef, MatDialog, MatDialogModule, MatToolbarModule, MatMenuModule, MatIconRegistry, MatChipsModule, MatCardModule, MatSnackBarModule, MatExpansionModule, MatTooltipModule, MatSidenavModule, MatListModule, MatProgressBarModule, MatTabsModule } from '@angular/material';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatSnackBar as MatSnackBar$1 } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap, catchError, share, debounceTime, distinctUntilChanged, switchMap, startWith, map, filter } from 'rxjs/operators';
import { throwError, BehaviorSubject, of, Subject } from 'rxjs';
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
var /** @type {?} */ noop = function () {
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
        this.innerValue = '';
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
        if ("" + value !== "" + this.value) {
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
                    template: "<dec-autocomplete *ngIf=\"endpoint\"\n[disabled]=\"disabled\"\n[required]=\"required\"\n[endpoint]=\"endpoint\"\n[name]=\"name\"\n[labelFn]=\"labelFn\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[(ngModel)]=\"value\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
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
        this.innerValue = '';
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
        if ("" + value !== "" + this.value) {
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
        this.innerValue = '';
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
        if ("" + value !== "" + this.value) {
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
        this.innerValue = '';
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
        this.innerValue = '';
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
        this.innerValue = '';
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
        this.innerValue = '';
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
            this.setEndpointBasedOnInputs();
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
            this.setEndpointBasedOnInputs();
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
            this.setEndpointBasedOnInputs();
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
            this.endpoint = undefined;
            setTimeout(function () {
                _this.endpoint = endpoint;
            }, 0);
        }
    };
    DecAutocompleteQuoteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-quote',
                    template: "<div *ngIf=\"endpoint else fakeDisabled\">\n  <dec-autocomplete\n  [disabled]=\"!projectId || disabled\"\n  [endpoint]=\"endpoint\"\n  [labelAttr]=\"labelAttr\"\n  [name]=\"name\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
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
        this.innerValue = '';
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
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[endpoint]=\"endpoint\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n(enterButton)=\"enterButton.emit($event)\"\n[(ngModel)]=\"value\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>",
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
var DecImageZoomComponent = /** @class */ (function () {
    function DecImageZoomComponent() {
        this.zoomMode = 'click';
        this.enableScrollZoom = true;
        this.scrollStepSize = 0.1;
        this.enableLens = true;
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
        this.fullImageUrl = this.systemFile.fileBaseUrl + '.' + this.systemFile.extension;
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

export { AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, DecAutocompleteComponent, DecAutocompleteModule, DecAutocompleteAccountComponent, DecAutocompleteAccountModule, AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCompanyComponent, DecAutocompleteCompanyModule, AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCountryComponent, DecAutocompleteCountryModule, BASE_ENDPOINT, AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR, DecAutocompleteDepartmentComponent, DecAutocompleteDepartmentModule, DecAutocompleteRoleComponent, DecAutocompleteRoleModule, BASE_AUTOCOMPLETE_PROJECT_ENDPOINT, AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR, DecAutocompleteProjectComponent, DecAutocompleteProjectModule, AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR, DecAutocompleteQuoteComponent, DecAutocompleteQuoteModule, DecAutocompleteTagsComponent, DecAutocompleteTagsModule, DecBreadcrumbComponent, DecBreadcrumbModule, DecDialogComponent, DecDialogModule, DecDialogService, DecGalleryComponent, DecGalleryModule, DecIconModule, DecIconComponent, DecImageZoomModule, DecImageZoomComponent, DecLabelComponent, DecLabelModule, DecListModule, DecListFilter, DecListComponent, DecListActiveFilterResumeModule, DecListActiveFilterResumeComponent, DecListAdvancedFilterModule, DecListAdvancedFilterComponent, DecListFilterModule, DecListFilterComponent, DecListFooterComponent, DecListGridComponent, DecListTableModule, DecListTableComponent, DecListTableColumnComponent, DecListActionsModule, DecListActionsComponent, DecPageForbidenComponent, DecPageForbidenModule, DecPageNotFoundComponent, DecPageNotFoundModule, DecProductSpinComponent, DecProductSpinModule, DecSidenavModule, DecSidenavComponent, DecSidenavContentComponent, DecSidenavMenuItemComponent, DecSidenavMenuLeftComponent, DecSidenavMenuRightComponent, DecSidenavMenuTitleComponent, DecSidenavToolbarComponent, DecSidenavToolbarTitleComponent, DecSketchfabViewComponent, DecSketchfabViewModule, DecSpinnerComponent, DecSpinnerModule, DecStepsListComponent, DecStepsListModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, DecStringArrayInputComponent, DecStringArrayInputModule, DecTabsModule, DecTabsComponent, DecTabModule, DecTabComponent, DecUploadModule, DEC_UPLOAD_CONTROL_VALUE_ACCESSOR, DecUploadComponent, hexToRgbNew, standardize_color, DecContrastFontWithBgDirective, DecContrastFontWithBgModule, DecImageModule, DecImageDirective, DecPermissionDirective, DecPermissionModule, DecGuardModule, DecAuthGuard, DecApiService, DecApiModule, UserAuthData, Filter, DecConfigurationService, DECORA_CONFIGURATION_SERVICE_CONFIG, InitDecConfigurationService, DecConfigurationModule, DecConfigurationInitializer, DecSnackBarService, DecSnackBarModule, DecPermissionGuard, DecPermissionGuardModule, DecWsClientService, DecWsClientModule, DecScriptLoaderService, DecScriptLoaderModule, DecListTabsFilterComponent as ɵb, DecSidenavMenuComponent as ɵd, DecSidenavService as ɵc, DecTabMenuComponent as ɵe };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWJyb3dzZXItbGliLXVpLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtYWNjb3VudC9hdXRvY29tcGxldGUtYWNjb3VudC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWFjY291bnQvYXV0b2NvbXBsZXRlLWFjY291bnQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb21wYW55L2F1dG9jb21wbGV0ZS1jb21wYW55LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtY29tcGFueS9hdXRvY29tcGxldGUtY29tcGFueS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWNvdW50cnkvYXV0b2NvbXBsZXRlLWNvdW50cnkuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb3VudHJ5L2F1dG9jb21wbGV0ZS1jb3VudHJ5Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQvYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1yb2xlL2F1dG9jb21wbGV0ZS1yb2xlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcm9sZS9hdXRvY29tcGxldGUtcm9sZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXByb2plY3QvYXV0b2NvbXBsZXRlLXByb2plY3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1wcm9qZWN0L2F1dG9jb21wbGV0ZS1wcm9qZWN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtdGFncy9hdXRvY29tcGxldGUtdGFncy5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXRhZ3MvYXV0b2NvbXBsZXRlLXRhZ3MubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtZGlhbG9nL2RlYy1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zcGlubmVyL2RlYy1zcGlubmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2Nhcm91c2VsLWNvbmZpZy50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2RlYy1nYWxsZXJ5LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUuY29uc3RhbnRzLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWltYWdlLXpvb20vZGVjLWltYWdlLXpvb20uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2RlYy1nYWxsZXJ5Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtaWNvbi9kZWMtaWNvbi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWljb24vZGVjLWljb24ubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1sYWJlbC9kZWMtbGFiZWwuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2NvbG9yL2NvbnRyYXN0LWZvbnQtd2l0aC1iZy9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9jb2xvci9jb250cmFzdC1mb250LXdpdGgtYmcvZGVjLWNvbnRyYXN0LWZvbnQtd2l0aC1iZy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWxhYmVsL2RlYy1sYWJlbC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0Lm1vZGVscy50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIvbGlzdC10YWJzLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFkdmFuY2VkLWZpbHRlci9saXN0LWFkdmFuY2VkLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWZpbHRlci9saXN0LWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9wZXJtaXNzaW9uL2RlYy1wZXJtaXNzaW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9wZXJtaXNzaW9uL2RlYy1wZXJtaXNzaW9uLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZmlsdGVyL2xpc3QtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS1jb2x1bW4vbGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS9saXN0LXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS9saXN0LXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZm9vdGVyL2xpc3QtZm9vdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWN0aW9ucy9saXN0LWFjdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hY3Rpb25zL2xpc3QtYWN0aW9ucy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wYWdlLWZvcmJpZGVuL3BhZ2UtZm9yYmlkZW4uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2UtZm9yYmlkZW4vcGFnZS1mb3JiaWRlbi5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvcGFnZS1ub3QtZm91bmQvcGFnZS1ub3QtZm91bmQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2Utbm90LWZvdW5kL3BhZ2Utbm90LWZvdW5kLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wcm9kdWN0LXNwaW4vcHJvZHVjdC1zcGluLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wcm9kdWN0LXNwaW4vcHJvZHVjdC1zcGluLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUvZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi10b29sYmFyL2RlYy1zaWRlbmF2LXRvb2xiYXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS1sZWZ0L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1jb250ZW50L2RlYy1zaWRlbmF2LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS9kZWMtc2lkZW5hdi1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L3NpZGVuYXYubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9zY3JpcHQtbG9hZGVyL2RlYy1zY3JpcHQtbG9hZGVyLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2tldGNoZmFiLXZpZXcvZGVjLXNrZXRjaGZhYi12aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2tldGNoZmFiLXZpZXcvZGVjLXNrZXRjaGZhYi12aWV3Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3RlcHMtbGlzdC9kZWMtc3RlcHMtbGlzdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXN0ZXBzLWxpc3QvZGVjLXN0ZXBzLWxpc3QubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zdHJpbmctYXJyYXktaW5wdXQvZGVjLXN0cmluZy1hcnJheS1pbnB1dC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXN0cmluZy1hcnJheS1pbnB1dC9kZWMtc3RyaW5nLWFycmF5LWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYi90YWIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFicy5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdGFicy90YWIvdGFiLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYnMubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9ndWFyZC9hdXRoLWd1YXJkLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2d1YXJkL2d1YXJkLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvc25hY2stYmFyL2RlYy1zbmFjay1iYXIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24tc2VydmljZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi1pbml0aWFsaXplci5wcm92aWRlci50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvcGVybWlzc2lvbi1ndWFyZC9kZWMtcGVybWlzc2lvbi1ndWFyZC5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9wZXJtaXNzaW9uLWd1YXJkL2RlYy1wZXJtaXNzaW9uLWd1YXJkLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvd3MtY2xpZW50L3dzLWNsaWVudC5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy93cy1jbGllbnQvd3MtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTbmFja0JhciwgTWF0U25hY2tCYXJSZWYsIFNpbXBsZVNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VUeXBlID0gJ3N1Y2Nlc3MnIHwgJ3ByaW1hcnknIHwgJ2luZm8nIHwgJ3dhcm4nIHwgJ2Vycm9yJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGVjU25hY2tCYXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc25hY2tCYXJTZXJ2aWNlOiBNYXRTbmFja0JhcixcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XG5cbiAgb3BlbihtZXNzYWdlOiBzdHJpbmcsIHR5cGU6IE1lc3NhZ2VUeXBlLCBkdXJhdGlvbiA9IDRlMyk6IE1hdFNuYWNrQmFyUmVmPFNpbXBsZVNuYWNrQmFyPiB7XG4gICAgY29uc3QgbXNnID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudChtZXNzYWdlKTtcbiAgICBjb25zdCBzbmFja0NsYXNzID0gdGhpcy5nZXRDbGFzcyh0eXBlKTtcblxuICAgIHJldHVybiB0aGlzLnNuYWNrQmFyU2VydmljZS5vcGVuKG1zZywgJycsIHtcbiAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgIHBhbmVsQ2xhc3M6IHNuYWNrQ2xhc3NcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsYXNzKHR5cGU6IE1lc3NhZ2VUeXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1zdWNjZXNzJztcbiAgICAgIGNhc2UgJ3ByaW1hcnknOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLXByaW1hcnknO1xuICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgIHJldHVybiAnc25hY2staW5mbyc7XG4gICAgICBjYXNlICd3YXJuJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay13YXJuJztcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1lcnJvcic7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tc2VydmljZS5tb2RlbHMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5jb25zdCBDT05GSUdfUEFUSCA9ICdhc3NldHMvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLmpzb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjQ29uZmlndXJhdGlvblNlcnZpY2Uge1xuXG4gIHNldCBjb25maWcodjogYW55KSB7XG4gICAgaWYgKHRoaXMuX2NvbmZpZyAhPT0gdikge1xuICAgICAgdGhpcy5fY29uZmlnID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgY29uZmlnKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIHByb2ZpbGUgPSAnbG9jYWwnO1xuXG4gIHByaXZhdGUgX2NvbmZpZzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdERUNPUkFfQ09ORklHVVJBVElPTl9TRVJWSUNFX0NPTkZJRycpIHByaXZhdGUgc2VydmljZUNvbmZpZ3VyYXRpb246IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnLFxuICApIHt9XG5cbiAgbG9hZENvbmZpZygpIHtcbiAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMuc2VydmljZUNvbmZpZ3VyYXRpb24uYmFzZVBhdGg7XG4gICAgY29uc3QgcGF0aCA9IGAke2Jhc2VQYXRofS8ke0NPTkZJR19QQVRIfWA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQocGF0aClcbiAgICAucGlwZShcbiAgICAgIHRhcCgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5wcm9maWxlID0gdGhpcy5pc1ZhbGlkUHJvZmlsZShyZXMucHJvZmlsZSwgcmVzKSA/IHJlcy5wcm9maWxlIDogdGhpcy5wcm9maWxlO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHJlc1t0aGlzLnByb2ZpbGVdO1xuICAgICAgICBjb25zb2xlLmxvZyhgRGVjQ29uZmlndXJhdGlvblNlcnZpY2U6OiBMb2FkZWQgXCIke3RoaXMucHJvZmlsZX1cIiBwcm9maWxlYCk7XG4gICAgICB9KVxuICAgICkudG9Qcm9taXNlKCk7XG4gIH1cblxuICBwcml2YXRlIGlzVmFsaWRQcm9maWxlKHByb2ZpbGUsIGF2YWlsYWJsZVByb2ZpbGVzKSB7XG5cbiAgICBjb25zdCBhdmFpbGFibGVzID0gT2JqZWN0LmtleXMoYXZhaWxhYmxlUHJvZmlsZXMpO1xuXG4gICAgcmV0dXJuIChhdmFpbGFibGVzLmluZGV4T2YocHJvZmlsZSkgPj0gMCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHNoYXJlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVc2VyQXV0aERhdGEsIExvZ2luRGF0YSwgRmFjZWJvb2tMb2dpbkRhdGEsIERlY0ZpbHRlciwgU2VyaWFsaXplZERlY0ZpbHRlciB9IGZyb20gJy4vZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNTbmFja0JhclNlcnZpY2UgfSBmcm9tICcuLy4uL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgQ2FsbE9wdGlvbnMgPSB7XG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgcGFyYW1zPzoge1xuICAgIFtwcm9wOiBzdHJpbmddOiBhbnk7XG4gIH07XG59ICYge1xuICBbcHJvcDogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSHR0cFJlcXVlc3RUeXBlcyA9ICdHRVQnIHwgJ1BPU1QnIHwgJ1BVVCcgfCAnUEFUQ0gnIHwgJ0RFTEVURSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBcGlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICB1c2VyOiBVc2VyQXV0aERhdGE7XG5cbiAgdXNlciQ6IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+KHVuZGVmaW5lZCk7XG5cbiAgcHJpdmF0ZSBzZXNzaW9uVG9rZW46IHN0cmluZztcblxuICBwcml2YXRlIHVzZXJTdWJzY3JpcGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIHNuYWNrYmFyOiBEZWNTbmFja0JhclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZWNDb25maWc6IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZVRvVXNlcigpO1xuICAgIHRoaXMudHJ5VG9Mb2FkU2lnbmVkSW5Vc2VyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9Vc2VyKCk7XG4gIH1cblxuICBnZXQgaG9zdCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNDb25maWcuY29uZmlnLmFwaTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gUFVCTElDIEFVVEggTUVUSE9EUyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIGF1dGggPSAobG9naW5EYXRhOiBMb2dpbkRhdGEpID0+IHtcbiAgICBpZiAobG9naW5EYXRhKSB7XG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvc2lnbmluJyk7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgICBjb25zdCBib2R5ID0gbmV3IEh0dHBQYXJhbXMoKVxuICAgICAgICAuc2V0KCd1c2VybmFtZScsIGxvZ2luRGF0YS5lbWFpbClcbiAgICAgICAgLnNldCgncGFzc3dvcmQnLCBsb2dpbkRhdGEucGFzc3dvcmQpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCBib2R5LCBvcHRpb25zKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBub3RpZmllZDogdHJ1ZSwgbWVzc2FnZTogJ0RFQ09SQS1BUEkgQVVUSCBFUlJPUjo6IE5vIGNyZWRlbnRpYWxzIHByb3ZpZGVkJyB9KTtcbiAgICB9XG4gIH1cblxuICBhdXRoRmFjZWJvb2sgPSAobG9naW5EYXRhOiBGYWNlYm9va0xvZ2luRGF0YSkgPT4ge1xuICAgIGlmIChsb2dpbkRhdGEpIHtcbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9mYWNlYm9vay9zaWduaW4nKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICAgIGNvbnN0IGJvZHkgPSBuZXcgSHR0cFBhcmFtcygpXG4gICAgICAgIC5zZXQoJ2ZhY2Vib29rVG9rZW4nLCBsb2dpbkRhdGEuZmFjZWJvb2tUb2tlbilcbiAgICAgICAgLnNldCgna2VlcExvZ2dlZCcsIGxvZ2luRGF0YS5rZWVwTG9nZ2VkLnRvU3RyaW5nKCkpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCBib2R5LCBvcHRpb25zKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBub3RpZmllZDogdHJ1ZSwgbWVzc2FnZTogJ0RFQ09SQS1BUEkgQVVUSCBGQUNFQk9PSyBFUlJPUjo6IE5vIGNyZWRlbnRpYWxzIHByb3ZpZGVkJyB9KTtcbiAgICB9XG4gIH1cblxuICBsb2dvdXQgPSAocmVkaXJlY3RUb0xvZ2luUGFnZSA9IHRydWUpID0+IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvc2lnbm91dCcpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kKGVuZHBvaW50LCB7fSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuc2Vzc2lvblRva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgIGlmIChyZWRpcmVjdFRvTG9naW5QYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmdvVG9Mb2dpblBhZ2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSkpO1xuICB9XG5cbiAgZmV0Y2hDdXJyZW50TG9nZ2VkVXNlciA9ICgpID0+IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvYWNjb3VudCcpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbigpIH07XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kPFVzZXJBdXRoRGF0YT4oZW5kcG9pbnQsIHt9LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBQVUJMSUMgSFRUUCBNRVRIT0RTIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgZ2V0ID0gPFQ+KGVuZHBvaW50LCBzZWFyY2g/OiBEZWNGaWx0ZXIsIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy50cmFuc2Zvcm1EZWNGaWx0ZXJJblBhcmFtcyhzZWFyY2gpO1xuICAgIHJldHVybiB0aGlzLmdldE1ldGhvZDxUPihlbmRvcGludFVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZSA9IDxUPihlbmRwb2ludCwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5kZWxldGVNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgcGF0Y2ggPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLnBhdGNoTWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3QgPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHV0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wdXRNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgdXBzZXJ0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgaWYgKHBheWxvYWQuaWQgPj0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KGVuZHBvaW50LCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChlbmRwb2ludCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgdXBsb2FkKGVuZHBvaW50OiBzdHJpbmcsIGZpbGVzOiBGaWxlW10sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5jcmVhdGVGaWxlc0Zvcm1EYXRhKGZpbGVzKTtcbiAgICBvcHRpb25zLnJlcG9ydFByb2dyZXNzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdE1ldGhvZCgnUE9TVCcsIGVuZG9waW50VXJsLCBmb3JtRGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIC8vICoqKioqKioqKioqKiAvL1xuICAvLyBQdWJsaWMgSGVscGVyIE1ldGhvZHMgLy9cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIHByaXZhdGUgdHJhbnNmb3JtRGVjRmlsdGVySW5QYXJhbXMoZmlsdGVyOiBEZWNGaWx0ZXIpOiBTZXJpYWxpemVkRGVjRmlsdGVyIHtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZWRGaWx0ZXI6IFNlcmlhbGl6ZWREZWNGaWx0ZXIgPSB7fTtcblxuICAgIGlmIChmaWx0ZXIpIHtcblxuICAgICAgaWYgKGZpbHRlci5wYWdlKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIucGFnZSA9IGZpbHRlci5wYWdlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLmxpbWl0KSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIubGltaXQgPSBmaWx0ZXIubGltaXQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuZmlsdGVyR3JvdXBzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcldpdGhWYWx1ZUFzQXJyYXkgPSB0aGlzLmdldEZpbHRlcldpdGhWYWx1ZXNBc0FycmF5KGZpbHRlci5maWx0ZXJHcm91cHMpO1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLmZpbHRlciA9IHRoaXMuZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhmaWx0ZXJXaXRoVmFsdWVBc0FycmF5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5wcm9qZWN0Vmlldykge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnByb2plY3RWaWV3ID0gdGhpcy5maWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKGZpbHRlci5wcm9qZWN0Vmlldyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuc29ydCkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnNvcnQgPSB0aGlzLmZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcoZmlsdGVyLnNvcnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLnRleHRTZWFyY2gpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci50ZXh0U2VhcmNoID0gZmlsdGVyLnRleHRTZWFyY2g7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gc2VyaWFsaXplZEZpbHRlcjtcblxuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKG9iaikge1xuICAgIGlmIChvYmopIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyV2l0aFZhbHVlc0FzQXJyYXkoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cENvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbHRlckdyb3VwcykpOyAvLyBtYWtlIGEgY29weSBvZiB0aGUgZmlsdGVyIHNvIHdlIGRvIG5vdCBjaGFuZ2UgdGhlIG9yaWdpbmFsIGZpbHRlclxuXG4gICAgaWYgKGZpbHRlckdyb3VwQ29weSkge1xuXG4gICAgICByZXR1cm4gZmlsdGVyR3JvdXBDb3B5Lm1hcChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycyA9IGZpbHRlckdyb3VwLmZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG5cbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmlsdGVyLnZhbHVlKSkge1xuICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gW2ZpbHRlci52YWx1ZV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZpbHRlcjtcblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyR3JvdXA7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIGZpbHRlckdyb3VwcztcblxuICAgIH1cbiAgfVxuXG5cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIC8vIEh0dHAgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKiogLy9cbiAgcHJpdmF0ZSBnZXRNZXRob2Q8VD4odXJsOiBzdHJpbmcsIHNlYXJjaCA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLnBhcmFtcyA9IHNlYXJjaDtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8VD4odXJsLCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnBhdGNoPFQ+KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHBvc3RNZXRob2Q8VD4odXJsLCBib2R5Pywgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXRNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWxldGVNZXRob2Q8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLmRlbGV0ZTxUPih1cmwsIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0TWV0aG9kPFQ+KHR5cGU6IEh0dHBSZXF1ZXN0VHlwZXMsIHVybDogc3RyaW5nLCBib2R5OiBhbnkgPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih1bmRlZmluZWQsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHR5cGUsIHVybCwgYm9keSwgb3B0aW9ucyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucmVxdWVzdDxUPihyZXEpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvciA9IChlcnJvcjogYW55KSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgY29uc3QgYm9keU1lc3NhZ2UgPSAoZXJyb3IgJiYgZXJyb3IuZXJyb3IpID8gZXJyb3IuZXJyb3IubWVzc2FnZSA6ICcnO1xuICAgIGNvbnN0IHN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICBjb25zdCBzdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcblxuICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgaWYgKHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdCkge1xuICAgICAgICAgIHRoaXMuZ29Ub0xvZ2luUGFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDQwOTpcbiAgICAgICAgdGhpcy5zbmFja2Jhci5vcGVuKCdtZXNzYWdlLmh0dHAtc3RhdHVzLjQwOScsICdlcnJvcicpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgc3RhdHVzVGV4dCwgbWVzc2FnZSwgYm9keU1lc3NhZ2UgfSk7XG4gIH1cblxuICAvLyAqKioqKioqIC8vXG4gIC8vIEhlbHBlcnMgLy9cbiAgLy8gKioqKioqKiAvL1xuXG4gIHByaXZhdGUgY3JlYXRlRmlsZXNGb3JtRGF0YShmaWxlczogRmlsZVtdKSB7XG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZmlsZXMuZm9yRWFjaCgoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm1JdGVtTmFtZSA9IGluZGV4ID4gMCA/IGBmaWxlLSR7aW5kZXh9YCA6ICdmaWxlJztcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChmb3JtSXRlbU5hbWUsIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTG9naW5QYWdlKCkge1xuICAgIGNvbnN0IG5ha2VkQXBwRG9tYWluID0gd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgIC5yZXBsYWNlKCdodHRwczovLycsICcnKVxuICAgICAgLnJlcGxhY2UoJ2h0dHA6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gsICcnKTtcblxuICAgIGNvbnN0IG5ha2VkQXV0aERvbWFpbiA9IHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdC5zcGxpdCgnPycpWzBdXG4gICAgICAucmVwbGFjZSgnaHR0cHM6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKCdodHRwOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnLy8nLCAnJyk7XG5cbiAgICBpZiAobmFrZWRBcHBEb21haW4gIT09IG5ha2VkQXV0aERvbWFpbikge1xuICAgICAgY29uc3QgYXV0aFVybFdpdGhSZWRpcmVjdCA9IGAke3RoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdH0ke3RoaXMuZ2V0UGFyYW1zRGl2aWRlcigpfXJlZGlyZWN0VXJsPSR7d2luZG93LmxvY2F0aW9uLmhyZWZ9YDtcbiAgICAgIGNvbnNvbGUubG9nKGBEZWNBcGlTZXJ2aWNlOjogTm90IGF1dGhlbnRpY2F0ZWQuIFJlZGlyZWN0aW5nIHRvIGxvZ2luIHBhZ2UgYXQ6ICR7YXV0aFVybFdpdGhSZWRpcmVjdH1gKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXV0aFVybFdpdGhSZWRpcmVjdDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFBhcmFtc0RpdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdC5zcGxpdCgnPycpLmxlbmd0aCA+IDEgPyAnJicgOiAnPyc7XG4gIH1cblxuICBwcml2YXRlIHRyeVRvTG9hZFNpZ25lZEluVXNlcigpIHtcbiAgICB0aGlzLmZldGNoQ3VycmVudExvZ2dlZFVzZXIoKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnRGVjb3JhQXBpU2VydmljZTo6IEluaXRpYWxpemVkIGFzIGxvZ2dlZCcpO1xuICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdEZWNvcmFBcGlTZXJ2aWNlOjogSW5pdGlhbGl6ZWQgYXMgbm90IGxvZ2dlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXphdGlvbiBFcnJvci4gQ291bGQgcmV0cmlldmUgdXNlciBhY2NvdW50JywgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4odHlwZT86IHN0cmluZywgaGVhZGVycz86IEh0dHBIZWFkZXJzKSB7XG4gICAgaGVhZGVycyA9IGhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgY29uc3QgY3VzdG9taXplZENvbnRlbnRUeXBlID0gaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICghY3VzdG9taXplZENvbnRlbnRUeXBlICYmIHR5cGUpIHtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgdHlwZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlc3Npb25Ub2tlbikge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdYLUF1dGgtVG9rZW4nLCB0aGlzLnNlc3Npb25Ub2tlbik7XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYXRTZXNzaW9uVG9rZW4ocmVzKSB7XG4gICAgdGhpcy5zZXNzaW9uVG9rZW4gPSByZXMgJiYgcmVzLnNlc3Npb24gPyByZXMuc2Vzc2lvbi5pZCA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZXNvdXJjZVVybChwYXRoKSB7XG5cbiAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMuZGVjQ29uZmlnLmNvbmZpZy51c2VNb2NrQXBpID8gdGhpcy5kZWNDb25maWcuY29uZmlnLm1vY2tBcGlIb3N0IDogdGhpcy5kZWNDb25maWcuY29uZmlnLmFwaTtcblxuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC98XFwvJC9nLCAnJyk7XG5cbiAgICByZXR1cm4gYCR7YmFzZVBhdGh9LyR7cGF0aH1gO1xuXG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvVXNlcigpIHtcbiAgICB0aGlzLnVzZXJTdWJzY3JpcGlvbiA9IHRoaXMudXNlciQuc3Vic2NyaWJlKHVzZXIgPT4ge1xuICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb1VzZXIoKSB7XG4gICAgdGhpcy51c2VyU3Vic2NyaXBpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qXG4gICogU2hhcmUgT2JzZXJ2YWJsZVxuICAqXG4gICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBzaGFyZSB0aGUgYWN0dWFsIGRhdGEgdmFsdWVzIGFuZCBub3QganVzdCB0aGUgb2JzZXJ2YWJsZSBpbnN0YW5jZVxuICAqXG4gICogVG8gcmV1c2UgYSBzaW5nbGUsIGNvbW1vbiBzdHJlYW0gYW5kIGF2b2lkIG1ha2luZyBhbm90aGVyIHN1YnNjcmlwdGlvbiB0byB0aGUgc2VydmVyIHByb3ZpZGluZyB0aGF0IGRhdGEuXG4gICpcbiAgKi9cbiAgcHJpdmF0ZSBzaGFyZU9ic2VydmFibGUoY2FsbDogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgcmV0dXJuIGNhbGwucGlwZShzaGFyZSgpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwLCBzdGFydFdpdGgsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExhYmVsRnVuY3Rpb24sIFZhbHVlRnVuY3Rpb24sIFNlbGVjdGlvbkV2ZW50LCBDdXN0b21GZXRjaEZ1bmN0aW9uIH0gZnJvbSAnLi9hdXRvY29tcGxldGUubW9kZWxzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICAjdGVybUlucHV0XG4gICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIlxuICAgIFtmb3JtQ29udHJvbF09XCJhdXRvY29tcGxldGVJbnB1dFwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgIChrZXl1cC5lbnRlcik9XCJvbkVudGVyQnV0dG9uKCRldmVudClcIlxuICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcbiAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgIHJlYWRvbmx5IG9uZm9jdXM9XCJ0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcIj5cblxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwiY2xlYXIodHJ1ZSlcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiAhcmVxdWlyZWQgJiYgYXV0b2NvbXBsZXRlSW5wdXQudmFsdWVcIj5cbiAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG5cbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cInJlc2V0KClcIiAqbmdJZj1cIiFkaXNhYmxlZCAmJiB2YWx1ZSAhPT0gd3JpdHRlblZhbHVlXCI+XG4gICAgICA8bWF0LWljb24+cmVwbGF5PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cblxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvY29tcGxldGU9XCJtYXRBdXRvY29tcGxldGVcIlxuICBbZGlzcGxheVdpdGhdPVwiZXh0cmFjdExhYmVsXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KVwiXG4gIG5hbWU9XCJhdXRvY29tcGxldGVWYWx1ZVwiPlxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBpdGVtIG9mIChvcHRpb25zJCB8IGFzeW5jKVwiIFt2YWx1ZV09XCJpdGVtXCI+XG4gICAgICB7eyBleHRyYWN0TGFiZWwoaXRlbSkgfX1cbiAgICA8L21hdC1vcHRpb24+XG4gIDwvbWF0LWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgQFZpZXdDaGlsZChNYXRBdXRvY29tcGxldGVUcmlnZ2VyKSAgYXV0b2NvbXBsZXRlVHJpZ2dlcjogTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcjtcblxuICBhdXRvY29tcGxldGVJbnB1dDogRm9ybUNvbnRyb2w7XG5cbiAgb3B0aW9ucyQ6IE9ic2VydmFibGU8YW55W10+O1xuXG4gIHdyaXR0ZW5WYWx1ZTogYW55O1xuXG4gIC8vIFBhcmFtc1xuICBASW5wdXQoKSBjdXN0b21GZXRjaEZ1bmN0aW9uOiBDdXN0b21GZXRjaEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGVuZHBvaW50O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZUlucHV0KSB7XG4gICAgICBpZiAodikge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmRpc2FibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBsYWJlbEZuOiBMYWJlbEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGxhYmVsQXR0cjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnYXV0b2NvbXBsZXRlSW5wdXQnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKHY6IGFueVtdKSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IHY7XG4gICAgdGhpcy5pbm5lck9wdGlvbnMgPSB2O1xuICB9XG4gIGdldCBvcHRpb25zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgfVxuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgdmFsdWVGbjogVmFsdWVGdW5jdGlvbjtcblxuICBASW5wdXQoKSB2YWx1ZUF0dHI6IHN0cmluZztcblxuICAvLyBFdmVudHNcbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4oKTtcbiAgXG4gIEBPdXRwdXQoKSBlbnRlckJ1dHRvbjogRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+KCk7XG5cbiAgLy8gVmlldyBlbGVtZW50c1xuICBAVmlld0NoaWxkKCd0ZXJtSW5wdXQnKSB0ZXJtSW5wdXQ7XG5cbiAgLy8gcHJpdmF0ZSBkYXRhO1xuICBwcml2YXRlIG9wdGlvbnMkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55W107XG5cbiAgaW5uZXJPcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIHByaXZhdGUgZmlsdGVyZWRPcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNyZWF0ZUlucHV0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kZXRlY3RSZXF1aXJlZERhdGEoKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9PcHRpb25zKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9PcHRpb25zKCk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIFZBTFVFXG4gICovXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLnNldElubmVyVmFsdWUodik7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHY6IGFueSkge1xuICAgIHRoaXMud3JpdHRlblZhbHVlID0gdjtcbiAgICB2ID0gdiA/IHYgOiB1bmRlZmluZWQ7IC8vIGF2b2lkIG51bGwgdmFsdWVzXG4gICAgY29uc3QgaGFzRGlmZmVyZW5jZSA9ICF0aGlzLmNvbXBhcmVBc1N0cmluZyh2LCB0aGlzLnZhbHVlKTtcbiAgICBpZiAoaGFzRGlmZmVyZW5jZSkge1xuICAgICAgdGhpcy5sb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUodilcbiAgICAgIC50aGVuKChvcHRpb25zKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSAkZXZlbnQub3B0aW9uLnZhbHVlO1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShzZWxlY3RlZE9wdGlvbik7XG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uVmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZE9wdGlvblZhbHVlO1xuICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgIG9wdGlvbjogc2VsZWN0ZWRPcHRpb24sXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuaW5uZXJPcHRpb25zLFxuICAgICAgICBmaWx0ZXJlZE9wdGlvbnM6IHRoaXMuZmlsdGVyZWRPcHRpb25zLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25FbnRlckJ1dHRvbigkZXZlbnQpIHtcbiAgICB0aGlzLmVudGVyQnV0dG9uLmVtaXQoJGV2ZW50KTtcbiAgfSBcblxuICBzZXRGb2N1cygpIHtcbiAgICB0aGlzLnRlcm1JbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBvcGVuUGFuZWwoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVUcmlnZ2VyLm9wZW5QYW5lbCgpO1xuICB9XG5cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgb25CbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGNsZWFyKHJlb3BlbiA9IGZhbHNlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnNldFZhbHVlKCcnKTtcbiAgICBpZiAodGhpcy53cml0dGVuVmFsdWUgPT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgICB9XG4gICAgaWYgKHJlb3Blbikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICB9LCAxKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy53cml0dGVuVmFsdWU7XG4gICAgdGhpcy5zZXRJbm5lclZhbHVlKHRoaXMud3JpdHRlblZhbHVlKTtcbiAgICB0aGlzLnJlc2V0SW5wdXRDb250cm9sKCk7XG4gIH1cblxuICBleHRyYWN0TGFiZWw6IExhYmVsRnVuY3Rpb24gPSAoaXRlbTogYW55KTogc3RyaW5nID0+IHtcbiAgICBsZXQgbGFiZWwgPSBpdGVtOyAvLyB1c2UgdGhlIG9iamVjdCBpdHNlbGYgaWYgbm8gbGFiZWwgZnVuY3Rpb24gb3IgYXR0cmlidXRlIGlzIHByb3ZpZGVkXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLmxhYmVsRm4pIHsgLy8gVXNlIGN1c3RvbSBsYWJlbCBmdW5jdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IHRoaXMubGFiZWxGbihpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sYWJlbEF0dHIpIHsgLy8gVXNlIG9iamVjdCBsYWJlbCBhdHRyaWJ1dGUgaWYgcHJvdmlkZWRcbiAgICAgICAgbGFiZWwgPSBpdGVtW3RoaXMubGFiZWxBdHRyXSB8fCB1bmRlZmluZWQ7XG5cbiAgICAgIH1cbiAgICB9XG4gICAgbGFiZWwgPSB0aGlzLmVuc3VyZVN0cmluZyhsYWJlbCk7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUod3JpdHRlblZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh3cml0dGVuVmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh3cml0dGVuVmFsdWUpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgIHJlc29sdmUod3JpdHRlblZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHdyaXR0ZW5WYWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdFJlcXVpcmVkRGF0YSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgZXJyb3I6IHN0cmluZztcbiAgICAgIGlmICghdGhpcy5lbmRwb2ludCAmJiAhdGhpcy5vcHRpb25zICYmICF0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24pIHtcbiAgICAgICAgZXJyb3IgPSAnTm8gZW5kcG9pbnQgfCBvcHRpb25zIHwgY3VzdG9tRmV0Y2hGdW5jdGlvbiBzZXQuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9mIHRoZW0gdG8gYmUgYWJsZSB0byB1c2UgdGhlIEF1dG9jb21wbGV0ZSc7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5yYWlzZUVycm9yKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRJbnB1dENvbnRyb2woKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5tYXJrQXNQcmlzdGluZSgpO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubWFya0FzVW50b3VjaGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RWYWx1ZTogVmFsdWVGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBhbnkgPT4ge1xuICAgIGxldCB2YWx1ZSA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyB2YWx1ZSBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMudmFsdWVGbikgeyAvLyBVc2UgY3VzdG9tIHZhbHVlIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZUZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlQXR0cikgeyAvLyBVc2Ugb2JqZWN0IHZhbHVlIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICB2YWx1ZSA9IGl0ZW1bdGhpcy52YWx1ZUF0dHJdIHx8IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wYXJlQXNTdHJpbmcodjEsIHYyKSB7XG4gICAgY29uc3Qgc3RyaW5nMSA9IHRoaXMuZW5zdXJlU3RyaW5nKHYxKTtcbiAgICBjb25zdCBzdHJpbmcyID0gdGhpcy5lbnN1cmVTdHJpbmcodjIpO1xuICAgIHJldHVybiBzdHJpbmcxID09PSBzdHJpbmcyO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVTdHJpbmcodikge1xuICAgIGlmICh0eXBlb2YgdiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc05hTih2KSkge1xuICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ID0gYCR7dn1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9PcHRpb25zKCkge1xuICAgIHRoaXMub3B0aW9ucyRTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbnMkLnN1YnNjcmliZShvcHRpb25zID0+IHtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gb3B0aW9ucztcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJWYWx1ZSh2OiBhbnkpIHtcbiAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZUJhc2VkT25Jbm5lclZhbHVlKHYpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbnB1dFZhbHVlQmFzZWRPbklubmVyVmFsdWUodjogYW55KSB7XG4gICAgY29uc3Qgb3B0aW9uID0gdGhpcy5nZXRPcHRpb25CYXNlZE9uVmFsdWUodik7XG4gICAgY29uc3QgbGFiZWwgPSB0aGlzLmV4dHJhY3RMYWJlbChvcHRpb24pO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuc2V0VmFsdWUob3B0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3B0aW9uQmFzZWRPblZhbHVlKHY6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyT3B0aW9ucy5maW5kKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgaXRlbVZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoaXRlbSk7XG4gICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXNTdHJpbmcoaXRlbVZhbHVlLCB2KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW5wdXQoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dCA9IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbCh7dmFsdWU6IHVuZGVmaW5lZCwgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkfSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKSB7XG4gICAgdGhpcy5vcHRpb25zJCA9IHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQudmFsdWVDaGFuZ2VzXG4gICAgLnBpcGUoXG4gICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgc3dpdGNoTWFwKCh0ZXh0U2VhcmNoOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgaXNTdHJpbmdUZXJtID0gdHlwZW9mIHRleHRTZWFyY2ggPT09ICdzdHJpbmcnO1xuICAgICAgICBpZiAoaXNTdHJpbmdUZXJtKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUodGV4dFNlYXJjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9mKHRoaXMuaW5uZXJPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlYXJjaEluTG9jYWxPcHRpb25zKHRleHRTZWFyY2gpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKHRleHRTZWFyY2gpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChvcHRpb25zID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBib2R5ID0gdGV4dFNlYXJjaCA/IHsgdGV4dFNlYXJjaCB9IDogdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5nZXQ8YW55W10+KHRoaXMuZW5kcG9pbnQsIGJvZHkpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgob3B0aW9uczogYW55W10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb09wdGlvbnMoKSB7XG4gICAgdGhpcy5vcHRpb25zJFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hJbkxvY2FsT3B0aW9ucyh0ZXJtOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0ZXJtU3RyaW5nID0gYCR7dGVybX1gO1xuXG4gICAgbGV0IGZpbHRlcmVkRGF0YSA9IHRoaXMuaW5uZXJPcHRpb25zO1xuXG4gICAgaWYgKHRlcm1TdHJpbmcpIHtcbiAgICAgIGZpbHRlcmVkRGF0YSA9IHRoaXMuaW5uZXJPcHRpb25zXG4gICAgICAuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBsYWJlbDogc3RyaW5nID0gdGhpcy5leHRyYWN0TGFiZWwoaXRlbSk7XG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZUxhYmVsID0gbGFiZWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbG93ZXJDYXNlVGVybSA9IHRlcm1TdHJpbmcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIGxvd2VyQ2FzZUxhYmVsLnNlYXJjaChsb3dlckNhc2VUZXJtKSA+PSAwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mKGZpbHRlcmVkRGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHJhaXNlRXJyb3IoZXJyb3I6IHN0cmluZykge1xuICAgIHRocm93IG5ldyBFcnJvcihgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IEVycm9yOjogVGhlIGF1dG9jb21wbGV0ZSB3aXRoIG5hbWUgXCIke3RoaXMubmFtZX1cIiBoYWQgdGhlIGZvbGxvdyBwcm9ibGVtOiAke2Vycm9yfWApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwVXJsRW5jb2RpbmdDb2RlYyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5jb25zdCBBQ0NPVU5UU19FTkRQT0lOVCA9ICdhY2NvdW50cy9vcHRpb25zJztcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5jb25zdCBBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLWFjY291bnQnLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlICpuZ0lmPVwiZW5kcG9pbnRcIlxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuW25hbWVdPVwibmFtZVwiXG5bbGFiZWxGbl09XCJsYWJlbEZuXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0IHtcblxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB0eXBlcyh2OiBzdHJpbmdbXSkge1xuICAgIGlmICh2ICE9PSB0aGlzLl90eXBlcykge1xuICAgICAgdGhpcy5fdHlwZXMgPSB2O1xuXG4gICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLnNldFJvbGVzUGFyYW1zKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IHR5cGVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZXM7XG4gIH1cblxuICBfdHlwZXM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0FjY291bnQgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdBY2NvdW50IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNldFJvbGVzUGFyYW1zKCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgbGFiZWxGbihhY2NvdW50KSB7XG4gICAgcmV0dXJuIGAke2FjY291bnQudmFsdWV9ICMke2FjY291bnQua2V5fWA7XG4gIH1cblxuICBzZXRSb2xlc1BhcmFtcygpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBbXTtcbiAgICBsZXQgZW5kcG9pbnQgPSBgJHtBQ0NPVU5UU19FTkRQT0lOVH1gO1xuXG4gICAgaWYgKHRoaXMudHlwZXMgJiYgdGhpcy50eXBlcy5sZW5ndGgpIHtcbiAgICAgIHBhcmFtcy5wdXNoKGByb2xlcz0ke2VuY29kZVVSSShKU09OLnN0cmluZ2lmeSh0aGlzLnR5cGVzKSl9YCk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5sZW5ndGgpIHtcbiAgICAgIGVuZHBvaW50ICs9IGA/JHtwYXJhbXMuam9pbignJicpfWA7XG4gICAgfVxuXG4gICAgdGhpcy5lbmRwb2ludCA9IGVuZHBvaW50O1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZUFjY291bnRDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1hY2NvdW50LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZUFjY291bnRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUFjY291bnRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9DT01QQU5ZX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1jb21wYW55JyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWF1dG9jb21wbGV0ZVxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bbmFtZV09XCJuYW1lXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbltlbmRwb2ludF09XCJlbmRwb2ludFwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcbltsYWJlbEZuXT1cImxhYmVsRm5cIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfQ09NUEFOWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50ID0gJ2NvbXBhbmllcy9vcHRpb25zJztcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0NvbXBhbnkgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdDb21wYW55IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICBsYWJlbEZuKGNvbXBhbnkpIHtcbiAgICByZXR1cm4gYCR7Y29tcGFueS52YWx1ZX0gIyR7Y29tcGFueS5rZXl9YDtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlQ29tcGFueUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLWNvbXBhbnkuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlQ29tcGFueUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ29tcGFueU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9DT1VOVFJZX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1jb3VudHJ5JyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWF1dG9jb21wbGV0ZVxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bbmFtZV09XCJuYW1lXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbltvcHRpb25zXT1cIihjb3VudHJpZXMkIHwgYXN5bmMpXCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsRm5dPVwibGFiZWxGblwiXG5bdmFsdWVGbl09XCJ2YWx1ZUZuXCJcbihibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX0NPVU5UUllfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ291bnRyeUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBjb3VudHJpZXMkOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgQElucHV0KCkgbGFuZzogJ2VuJyB8ICdwdC1icicgPSAnZW4nO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnQ291bnRyeSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0NvdW50cnkgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb3VudHJpZXMkID0gb2YoRkFLRV9EQVRBKTtcbiAgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBsYWJlbEZuID0gKGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0ubmFtZSA6IGl0ZW07XG4gIH1cblxuICB2YWx1ZUZuID0gKGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uY29kZSA6IGl0ZW07XG4gIH1cblxufVxuXG5jb25zdCBGQUtFX0RBVEEgPSBbeyAnY29kZSc6ICdBRCcsICduYW1lJzogJ0FuZG9ycmEnIH0sIHsgJ2NvZGUnOiAnQUUnLCAnbmFtZSc6ICdVbml0ZWQgQXJhYiBFbWlyYXRlcycgfSwgeyAnY29kZSc6ICdBRicsICduYW1lJzogJ0FmZ2hhbmlzdGFuJyB9LCB7ICdjb2RlJzogJ0FHJywgJ25hbWUnOiAnQW50aWd1YSBhbmQgQmFyYnVkYScgfSwgeyAnY29kZSc6ICdBSScsICduYW1lJzogJ0FuZ3VpbGxhJyB9LCB7ICdjb2RlJzogJ0FMJywgJ25hbWUnOiAnQWxiYW5pYScgfSwgeyAnY29kZSc6ICdBTScsICduYW1lJzogJ0FybWVuaWEnIH0sIHsgJ2NvZGUnOiAnQU4nLCAnbmFtZSc6ICdOZXRoZXJsYW5kcyBBbnRpbGxlcycgfSwgeyAnY29kZSc6ICdBTycsICduYW1lJzogJ0FuZ29sYScgfSwgeyAnY29kZSc6ICdBUScsICduYW1lJzogJ0FudGFyY3RpY2EnIH0sIHsgJ2NvZGUnOiAnQVInLCAnbmFtZSc6ICdBcmdlbnRpbmEnIH0sIHsgJ2NvZGUnOiAnQVMnLCAnbmFtZSc6ICdBbWVyaWNhbiBTYW1vYScgfSwgeyAnY29kZSc6ICdBVCcsICduYW1lJzogJ0F1c3RyaWEnIH0sIHsgJ2NvZGUnOiAnQVUnLCAnbmFtZSc6ICdBdXN0cmFsaWEnIH0sIHsgJ2NvZGUnOiAnQVcnLCAnbmFtZSc6ICdBcnViYScgfSwgeyAnY29kZSc6ICdBWCcsICduYW1lJzogJ8ODwoVsYW5kIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnQVonLCAnbmFtZSc6ICdBemVyYmFpamFuJyB9LCB7ICdjb2RlJzogJ0JBJywgJ25hbWUnOiAnQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYScgfSwgeyAnY29kZSc6ICdCQicsICduYW1lJzogJ0JhcmJhZG9zJyB9LCB7ICdjb2RlJzogJ0JEJywgJ25hbWUnOiAnQmFuZ2xhZGVzaCcgfSwgeyAnY29kZSc6ICdCRScsICduYW1lJzogJ0JlbGdpdW0nIH0sIHsgJ2NvZGUnOiAnQkYnLCAnbmFtZSc6ICdCdXJraW5hIEZhc28nIH0sIHsgJ2NvZGUnOiAnQkcnLCAnbmFtZSc6ICdCdWxnYXJpYScgfSwgeyAnY29kZSc6ICdCSCcsICduYW1lJzogJ0JhaHJhaW4nIH0sIHsgJ2NvZGUnOiAnQkknLCAnbmFtZSc6ICdCdXJ1bmRpJyB9LCB7ICdjb2RlJzogJ0JKJywgJ25hbWUnOiAnQmVuaW4nIH0sIHsgJ2NvZGUnOiAnQkwnLCAnbmFtZSc6ICdTYWludCBCYXJ0aMODwqlsZW15JyB9LCB7ICdjb2RlJzogJ0JNJywgJ25hbWUnOiAnQmVybXVkYScgfSwgeyAnY29kZSc6ICdCTicsICduYW1lJzogJ0JydW5laScgfSwgeyAnY29kZSc6ICdCTycsICduYW1lJzogJ0JvbGl2aWEnIH0sIHsgJ2NvZGUnOiAnQlEnLCAnbmFtZSc6ICdCb25haXJlLCBTaW50IEV1c3RhdGl1cyBhbmQgU2FiYScgfSwgeyAnY29kZSc6ICdCUicsICduYW1lJzogJ0JyYXppbCcgfSwgeyAnY29kZSc6ICdCUycsICduYW1lJzogJ0JhaGFtYXMnIH0sIHsgJ2NvZGUnOiAnQlQnLCAnbmFtZSc6ICdCaHV0YW4nIH0sIHsgJ2NvZGUnOiAnQlYnLCAnbmFtZSc6ICdCb3V2ZXQgSXNsYW5kJyB9LCB7ICdjb2RlJzogJ0JXJywgJ25hbWUnOiAnQm90c3dhbmEnIH0sIHsgJ2NvZGUnOiAnQlknLCAnbmFtZSc6ICdCZWxhcnVzJyB9LCB7ICdjb2RlJzogJ0JaJywgJ25hbWUnOiAnQmVsaXplJyB9LCB7ICdjb2RlJzogJ0NBJywgJ25hbWUnOiAnQ2FuYWRhJyB9LCB7ICdjb2RlJzogJ0NDJywgJ25hbWUnOiAnQ29jb3MgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdDRCcsICduYW1lJzogJ1RoZSBEZW1vY3JhdGljIFJlcHVibGljIE9mIENvbmdvJyB9LCB7ICdjb2RlJzogJ0NGJywgJ25hbWUnOiAnQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljJyB9LCB7ICdjb2RlJzogJ0NHJywgJ25hbWUnOiAnQ29uZ28nIH0sIHsgJ2NvZGUnOiAnQ0gnLCAnbmFtZSc6ICdTd2l0emVybGFuZCcgfSwgeyAnY29kZSc6ICdDSScsICduYW1lJzogJ0PDg8K0dGUgZFxcJ0l2b2lyZScgfSwgeyAnY29kZSc6ICdDSycsICduYW1lJzogJ0Nvb2sgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdDTCcsICduYW1lJzogJ0NoaWxlJyB9LCB7ICdjb2RlJzogJ0NNJywgJ25hbWUnOiAnQ2FtZXJvb24nIH0sIHsgJ2NvZGUnOiAnQ04nLCAnbmFtZSc6ICdDaGluYScgfSwgeyAnY29kZSc6ICdDTycsICduYW1lJzogJ0NvbG9tYmlhJyB9LCB7ICdjb2RlJzogJ0NSJywgJ25hbWUnOiAnQ29zdGEgUmljYScgfSwgeyAnY29kZSc6ICdDVScsICduYW1lJzogJ0N1YmEnIH0sIHsgJ2NvZGUnOiAnQ1YnLCAnbmFtZSc6ICdDYXBlIFZlcmRlJyB9LCB7ICdjb2RlJzogJ0NXJywgJ25hbWUnOiAnQ3VyYcODwqdhbycgfSwgeyAnY29kZSc6ICdDWCcsICduYW1lJzogJ0NocmlzdG1hcyBJc2xhbmQnIH0sIHsgJ2NvZGUnOiAnQ1knLCAnbmFtZSc6ICdDeXBydXMnIH0sIHsgJ2NvZGUnOiAnQ1onLCAnbmFtZSc6ICdDemVjaCBSZXB1YmxpYycgfSwgeyAnY29kZSc6ICdERScsICduYW1lJzogJ0dlcm1hbnknIH0sIHsgJ2NvZGUnOiAnREonLCAnbmFtZSc6ICdEamlib3V0aScgfSwgeyAnY29kZSc6ICdESycsICduYW1lJzogJ0Rlbm1hcmsnIH0sIHsgJ2NvZGUnOiAnRE0nLCAnbmFtZSc6ICdEb21pbmljYScgfSwgeyAnY29kZSc6ICdETycsICduYW1lJzogJ0RvbWluaWNhbiBSZXB1YmxpYycgfSwgeyAnY29kZSc6ICdEWicsICduYW1lJzogJ0FsZ2VyaWEnIH0sIHsgJ2NvZGUnOiAnRUMnLCAnbmFtZSc6ICdFY3VhZG9yJyB9LCB7ICdjb2RlJzogJ0VFJywgJ25hbWUnOiAnRXN0b25pYScgfSwgeyAnY29kZSc6ICdFRycsICduYW1lJzogJ0VneXB0JyB9LCB7ICdjb2RlJzogJ0VIJywgJ25hbWUnOiAnV2VzdGVybiBTYWhhcmEnIH0sIHsgJ2NvZGUnOiAnRVInLCAnbmFtZSc6ICdFcml0cmVhJyB9LCB7ICdjb2RlJzogJ0VTJywgJ25hbWUnOiAnU3BhaW4nIH0sIHsgJ2NvZGUnOiAnRVQnLCAnbmFtZSc6ICdFdGhpb3BpYScgfSwgeyAnY29kZSc6ICdGSScsICduYW1lJzogJ0ZpbmxhbmQnIH0sIHsgJ2NvZGUnOiAnRkonLCAnbmFtZSc6ICdGaWppJyB9LCB7ICdjb2RlJzogJ0ZLJywgJ25hbWUnOiAnRmFsa2xhbmQgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdGTScsICduYW1lJzogJ01pY3JvbmVzaWEnIH0sIHsgJ2NvZGUnOiAnRk8nLCAnbmFtZSc6ICdGYXJvZSBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0ZSJywgJ25hbWUnOiAnRnJhbmNlJyB9LCB7ICdjb2RlJzogJ0dBJywgJ25hbWUnOiAnR2Fib24nIH0sIHsgJ2NvZGUnOiAnR0InLCAnbmFtZSc6ICdVbml0ZWQgS2luZ2RvbScgfSwgeyAnY29kZSc6ICdHRCcsICduYW1lJzogJ0dyZW5hZGEnIH0sIHsgJ2NvZGUnOiAnR0UnLCAnbmFtZSc6ICdHZW9yZ2lhJyB9LCB7ICdjb2RlJzogJ0dGJywgJ25hbWUnOiAnRnJlbmNoIEd1aWFuYScgfSwgeyAnY29kZSc6ICdHRycsICduYW1lJzogJ0d1ZXJuc2V5JyB9LCB7ICdjb2RlJzogJ0dIJywgJ25hbWUnOiAnR2hhbmEnIH0sIHsgJ2NvZGUnOiAnR0knLCAnbmFtZSc6ICdHaWJyYWx0YXInIH0sIHsgJ2NvZGUnOiAnR0wnLCAnbmFtZSc6ICdHcmVlbmxhbmQnIH0sIHsgJ2NvZGUnOiAnR00nLCAnbmFtZSc6ICdHYW1iaWEnIH0sIHsgJ2NvZGUnOiAnR04nLCAnbmFtZSc6ICdHdWluZWEnIH0sIHsgJ2NvZGUnOiAnR1AnLCAnbmFtZSc6ICdHdWFkZWxvdXBlJyB9LCB7ICdjb2RlJzogJ0dRJywgJ25hbWUnOiAnRXF1YXRvcmlhbCBHdWluZWEnIH0sIHsgJ2NvZGUnOiAnR1InLCAnbmFtZSc6ICdHcmVlY2UnIH0sIHsgJ2NvZGUnOiAnR1MnLCAnbmFtZSc6ICdTb3V0aCBHZW9yZ2lhIEFuZCBUaGUgU291dGggU2FuZHdpY2ggSXNsYW5kcycgfSwgeyAnY29kZSc6ICdHVCcsICduYW1lJzogJ0d1YXRlbWFsYScgfSwgeyAnY29kZSc6ICdHVScsICduYW1lJzogJ0d1YW0nIH0sIHsgJ2NvZGUnOiAnR1cnLCAnbmFtZSc6ICdHdWluZWEtQmlzc2F1JyB9LCB7ICdjb2RlJzogJ0dZJywgJ25hbWUnOiAnR3V5YW5hJyB9LCB7ICdjb2RlJzogJ0hLJywgJ25hbWUnOiAnSG9uZyBLb25nJyB9LCB7ICdjb2RlJzogJ0hNJywgJ25hbWUnOiAnSGVhcmQgSXNsYW5kIEFuZCBNY0RvbmFsZCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0hOJywgJ25hbWUnOiAnSG9uZHVyYXMnIH0sIHsgJ2NvZGUnOiAnSFInLCAnbmFtZSc6ICdDcm9hdGlhJyB9LCB7ICdjb2RlJzogJ0hUJywgJ25hbWUnOiAnSGFpdGknIH0sIHsgJ2NvZGUnOiAnSFUnLCAnbmFtZSc6ICdIdW5nYXJ5JyB9LCB7ICdjb2RlJzogJ0lEJywgJ25hbWUnOiAnSW5kb25lc2lhJyB9LCB7ICdjb2RlJzogJ0lFJywgJ25hbWUnOiAnSXJlbGFuZCcgfSwgeyAnY29kZSc6ICdJTCcsICduYW1lJzogJ0lzcmFlbCcgfSwgeyAnY29kZSc6ICdJTScsICduYW1lJzogJ0lzbGUgT2YgTWFuJyB9LCB7ICdjb2RlJzogJ0lOJywgJ25hbWUnOiAnSW5kaWEnIH0sIHsgJ2NvZGUnOiAnSU8nLCAnbmFtZSc6ICdCcml0aXNoIEluZGlhbiBPY2VhbiBUZXJyaXRvcnknIH0sIHsgJ2NvZGUnOiAnSVEnLCAnbmFtZSc6ICdJcmFxJyB9LCB7ICdjb2RlJzogJ0lSJywgJ25hbWUnOiAnSXJhbicgfSwgeyAnY29kZSc6ICdJUycsICduYW1lJzogJ0ljZWxhbmQnIH0sIHsgJ2NvZGUnOiAnSVQnLCAnbmFtZSc6ICdJdGFseScgfSwgeyAnY29kZSc6ICdKRScsICduYW1lJzogJ0plcnNleScgfSwgeyAnY29kZSc6ICdKTScsICduYW1lJzogJ0phbWFpY2EnIH0sIHsgJ2NvZGUnOiAnSk8nLCAnbmFtZSc6ICdKb3JkYW4nIH0sIHsgJ2NvZGUnOiAnSlAnLCAnbmFtZSc6ICdKYXBhbicgfSwgeyAnY29kZSc6ICdLRScsICduYW1lJzogJ0tlbnlhJyB9LCB7ICdjb2RlJzogJ0tHJywgJ25hbWUnOiAnS3lyZ3l6c3RhbicgfSwgeyAnY29kZSc6ICdLSCcsICduYW1lJzogJ0NhbWJvZGlhJyB9LCB7ICdjb2RlJzogJ0tJJywgJ25hbWUnOiAnS2lyaWJhdGknIH0sIHsgJ2NvZGUnOiAnS00nLCAnbmFtZSc6ICdDb21vcm9zJyB9LCB7ICdjb2RlJzogJ0tOJywgJ25hbWUnOiAnU2FpbnQgS2l0dHMgQW5kIE5ldmlzJyB9LCB7ICdjb2RlJzogJ0tQJywgJ25hbWUnOiAnTm9ydGggS29yZWEnIH0sIHsgJ2NvZGUnOiAnS1InLCAnbmFtZSc6ICdTb3V0aCBLb3JlYScgfSwgeyAnY29kZSc6ICdLVycsICduYW1lJzogJ0t1d2FpdCcgfSwgeyAnY29kZSc6ICdLWScsICduYW1lJzogJ0NheW1hbiBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0taJywgJ25hbWUnOiAnS2F6YWtoc3RhbicgfSwgeyAnY29kZSc6ICdMQScsICduYW1lJzogJ0xhb3MnIH0sIHsgJ2NvZGUnOiAnTEInLCAnbmFtZSc6ICdMZWJhbm9uJyB9LCB7ICdjb2RlJzogJ0xDJywgJ25hbWUnOiAnU2FpbnQgTHVjaWEnIH0sIHsgJ2NvZGUnOiAnTEknLCAnbmFtZSc6ICdMaWVjaHRlbnN0ZWluJyB9LCB7ICdjb2RlJzogJ0xLJywgJ25hbWUnOiAnU3JpIExhbmthJyB9LCB7ICdjb2RlJzogJ0xSJywgJ25hbWUnOiAnTGliZXJpYScgfSwgeyAnY29kZSc6ICdMUycsICduYW1lJzogJ0xlc290aG8nIH0sIHsgJ2NvZGUnOiAnTFQnLCAnbmFtZSc6ICdMaXRodWFuaWEnIH0sIHsgJ2NvZGUnOiAnTFUnLCAnbmFtZSc6ICdMdXhlbWJvdXJnJyB9LCB7ICdjb2RlJzogJ0xWJywgJ25hbWUnOiAnTGF0dmlhJyB9LCB7ICdjb2RlJzogJ0xZJywgJ25hbWUnOiAnTGlieWEnIH0sIHsgJ2NvZGUnOiAnTUEnLCAnbmFtZSc6ICdNb3JvY2NvJyB9LCB7ICdjb2RlJzogJ01DJywgJ25hbWUnOiAnTW9uYWNvJyB9LCB7ICdjb2RlJzogJ01EJywgJ25hbWUnOiAnTW9sZG92YScgfSwgeyAnY29kZSc6ICdNRScsICduYW1lJzogJ01vbnRlbmVncm8nIH0sIHsgJ2NvZGUnOiAnTUYnLCAnbmFtZSc6ICdTYWludCBNYXJ0aW4nIH0sIHsgJ2NvZGUnOiAnTUcnLCAnbmFtZSc6ICdNYWRhZ2FzY2FyJyB9LCB7ICdjb2RlJzogJ01IJywgJ25hbWUnOiAnTWFyc2hhbGwgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdNSycsICduYW1lJzogJ01hY2Vkb25pYScgfSwgeyAnY29kZSc6ICdNTCcsICduYW1lJzogJ01hbGknIH0sIHsgJ2NvZGUnOiAnTU0nLCAnbmFtZSc6ICdNeWFubWFyJyB9LCB7ICdjb2RlJzogJ01OJywgJ25hbWUnOiAnTW9uZ29saWEnIH0sIHsgJ2NvZGUnOiAnTU8nLCAnbmFtZSc6ICdNYWNhbycgfSwgeyAnY29kZSc6ICdNUCcsICduYW1lJzogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdNUScsICduYW1lJzogJ01hcnRpbmlxdWUnIH0sIHsgJ2NvZGUnOiAnTVInLCAnbmFtZSc6ICdNYXVyaXRhbmlhJyB9LCB7ICdjb2RlJzogJ01TJywgJ25hbWUnOiAnTW9udHNlcnJhdCcgfSwgeyAnY29kZSc6ICdNVCcsICduYW1lJzogJ01hbHRhJyB9LCB7ICdjb2RlJzogJ01VJywgJ25hbWUnOiAnTWF1cml0aXVzJyB9LCB7ICdjb2RlJzogJ01WJywgJ25hbWUnOiAnTWFsZGl2ZXMnIH0sIHsgJ2NvZGUnOiAnTVcnLCAnbmFtZSc6ICdNYWxhd2knIH0sIHsgJ2NvZGUnOiAnTVgnLCAnbmFtZSc6ICdNZXhpY28nIH0sIHsgJ2NvZGUnOiAnTVknLCAnbmFtZSc6ICdNYWxheXNpYScgfSwgeyAnY29kZSc6ICdNWicsICduYW1lJzogJ01vemFtYmlxdWUnIH0sIHsgJ2NvZGUnOiAnTkEnLCAnbmFtZSc6ICdOYW1pYmlhJyB9LCB7ICdjb2RlJzogJ05DJywgJ25hbWUnOiAnTmV3IENhbGVkb25pYScgfSwgeyAnY29kZSc6ICdORScsICduYW1lJzogJ05pZ2VyJyB9LCB7ICdjb2RlJzogJ05GJywgJ25hbWUnOiAnTm9yZm9sayBJc2xhbmQnIH0sIHsgJ2NvZGUnOiAnTkcnLCAnbmFtZSc6ICdOaWdlcmlhJyB9LCB7ICdjb2RlJzogJ05JJywgJ25hbWUnOiAnTmljYXJhZ3VhJyB9LCB7ICdjb2RlJzogJ05MJywgJ25hbWUnOiAnTmV0aGVybGFuZHMnIH0sIHsgJ2NvZGUnOiAnTk8nLCAnbmFtZSc6ICdOb3J3YXknIH0sIHsgJ2NvZGUnOiAnTlAnLCAnbmFtZSc6ICdOZXBhbCcgfSwgeyAnY29kZSc6ICdOUicsICduYW1lJzogJ05hdXJ1JyB9LCB7ICdjb2RlJzogJ05VJywgJ25hbWUnOiAnTml1ZScgfSwgeyAnY29kZSc6ICdOWicsICduYW1lJzogJ05ldyBaZWFsYW5kJyB9LCB7ICdjb2RlJzogJ09NJywgJ25hbWUnOiAnT21hbicgfSwgeyAnY29kZSc6ICdQQScsICduYW1lJzogJ1BhbmFtYScgfSwgeyAnY29kZSc6ICdQRScsICduYW1lJzogJ1BlcnUnIH0sIHsgJ2NvZGUnOiAnUEYnLCAnbmFtZSc6ICdGcmVuY2ggUG9seW5lc2lhJyB9LCB7ICdjb2RlJzogJ1BHJywgJ25hbWUnOiAnUGFwdWEgTmV3IEd1aW5lYScgfSwgeyAnY29kZSc6ICdQSCcsICduYW1lJzogJ1BoaWxpcHBpbmVzJyB9LCB7ICdjb2RlJzogJ1BLJywgJ25hbWUnOiAnUGFraXN0YW4nIH0sIHsgJ2NvZGUnOiAnUEwnLCAnbmFtZSc6ICdQb2xhbmQnIH0sIHsgJ2NvZGUnOiAnUE0nLCAnbmFtZSc6ICdTYWludCBQaWVycmUgQW5kIE1pcXVlbG9uJyB9LCB7ICdjb2RlJzogJ1BOJywgJ25hbWUnOiAnUGl0Y2Fpcm4nIH0sIHsgJ2NvZGUnOiAnUFInLCAnbmFtZSc6ICdQdWVydG8gUmljbycgfSwgeyAnY29kZSc6ICdQUycsICduYW1lJzogJ1BhbGVzdGluZScgfSwgeyAnY29kZSc6ICdQVCcsICduYW1lJzogJ1BvcnR1Z2FsJyB9LCB7ICdjb2RlJzogJ1BXJywgJ25hbWUnOiAnUGFsYXUnIH0sIHsgJ2NvZGUnOiAnUFknLCAnbmFtZSc6ICdQYXJhZ3VheScgfSwgeyAnY29kZSc6ICdRQScsICduYW1lJzogJ1FhdGFyJyB9LCB7ICdjb2RlJzogJ1JFJywgJ25hbWUnOiAnUmV1bmlvbicgfSwgeyAnY29kZSc6ICdSTycsICduYW1lJzogJ1JvbWFuaWEnIH0sIHsgJ2NvZGUnOiAnUlMnLCAnbmFtZSc6ICdTZXJiaWEnIH0sIHsgJ2NvZGUnOiAnUlUnLCAnbmFtZSc6ICdSdXNzaWEnIH0sIHsgJ2NvZGUnOiAnUlcnLCAnbmFtZSc6ICdSd2FuZGEnIH0sIHsgJ2NvZGUnOiAnU0EnLCAnbmFtZSc6ICdTYXVkaSBBcmFiaWEnIH0sIHsgJ2NvZGUnOiAnU0InLCAnbmFtZSc6ICdTb2xvbW9uIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnU0MnLCAnbmFtZSc6ICdTZXljaGVsbGVzJyB9LCB7ICdjb2RlJzogJ1NEJywgJ25hbWUnOiAnU3VkYW4nIH0sIHsgJ2NvZGUnOiAnU0UnLCAnbmFtZSc6ICdTd2VkZW4nIH0sIHsgJ2NvZGUnOiAnU0cnLCAnbmFtZSc6ICdTaW5nYXBvcmUnIH0sIHsgJ2NvZGUnOiAnU0gnLCAnbmFtZSc6ICdTYWludCBIZWxlbmEnIH0sIHsgJ2NvZGUnOiAnU0knLCAnbmFtZSc6ICdTbG92ZW5pYScgfSwgeyAnY29kZSc6ICdTSicsICduYW1lJzogJ1N2YWxiYXJkIEFuZCBKYW4gTWF5ZW4nIH0sIHsgJ2NvZGUnOiAnU0snLCAnbmFtZSc6ICdTbG92YWtpYScgfSwgeyAnY29kZSc6ICdTTCcsICduYW1lJzogJ1NpZXJyYSBMZW9uZScgfSwgeyAnY29kZSc6ICdTTScsICduYW1lJzogJ1NhbiBNYXJpbm8nIH0sIHsgJ2NvZGUnOiAnU04nLCAnbmFtZSc6ICdTZW5lZ2FsJyB9LCB7ICdjb2RlJzogJ1NPJywgJ25hbWUnOiAnU29tYWxpYScgfSwgeyAnY29kZSc6ICdTUicsICduYW1lJzogJ1N1cmluYW1lJyB9LCB7ICdjb2RlJzogJ1NTJywgJ25hbWUnOiAnU291dGggU3VkYW4nIH0sIHsgJ2NvZGUnOiAnU1QnLCAnbmFtZSc6ICdTYW8gVG9tZSBBbmQgUHJpbmNpcGUnIH0sIHsgJ2NvZGUnOiAnU1YnLCAnbmFtZSc6ICdFbCBTYWx2YWRvcicgfSwgeyAnY29kZSc6ICdTWCcsICduYW1lJzogJ1NpbnQgTWFhcnRlbiAoRHV0Y2ggcGFydCknIH0sIHsgJ2NvZGUnOiAnU1knLCAnbmFtZSc6ICdTeXJpYScgfSwgeyAnY29kZSc6ICdTWicsICduYW1lJzogJ1N3YXppbGFuZCcgfSwgeyAnY29kZSc6ICdUQycsICduYW1lJzogJ1R1cmtzIEFuZCBDYWljb3MgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdURCcsICduYW1lJzogJ0NoYWQnIH0sIHsgJ2NvZGUnOiAnVEYnLCAnbmFtZSc6ICdGcmVuY2ggU291dGhlcm4gVGVycml0b3JpZXMnIH0sIHsgJ2NvZGUnOiAnVEcnLCAnbmFtZSc6ICdUb2dvJyB9LCB7ICdjb2RlJzogJ1RIJywgJ25hbWUnOiAnVGhhaWxhbmQnIH0sIHsgJ2NvZGUnOiAnVEonLCAnbmFtZSc6ICdUYWppa2lzdGFuJyB9LCB7ICdjb2RlJzogJ1RLJywgJ25hbWUnOiAnVG9rZWxhdScgfSwgeyAnY29kZSc6ICdUTCcsICduYW1lJzogJ1RpbW9yLUxlc3RlJyB9LCB7ICdjb2RlJzogJ1RNJywgJ25hbWUnOiAnVHVya21lbmlzdGFuJyB9LCB7ICdjb2RlJzogJ1ROJywgJ25hbWUnOiAnVHVuaXNpYScgfSwgeyAnY29kZSc6ICdUTycsICduYW1lJzogJ1RvbmdhJyB9LCB7ICdjb2RlJzogJ1RSJywgJ25hbWUnOiAnVHVya2V5JyB9LCB7ICdjb2RlJzogJ1RUJywgJ25hbWUnOiAnVHJpbmlkYWQgYW5kIFRvYmFnbycgfSwgeyAnY29kZSc6ICdUVicsICduYW1lJzogJ1R1dmFsdScgfSwgeyAnY29kZSc6ICdUVycsICduYW1lJzogJ1RhaXdhbicgfSwgeyAnY29kZSc6ICdUWicsICduYW1lJzogJ1RhbnphbmlhJyB9LCB7ICdjb2RlJzogJ1VBJywgJ25hbWUnOiAnVWtyYWluZScgfSwgeyAnY29kZSc6ICdVRycsICduYW1lJzogJ1VnYW5kYScgfSwgeyAnY29kZSc6ICdVTScsICduYW1lJzogJ1VuaXRlZCBTdGF0ZXMgTWlub3IgT3V0bHlpbmcgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdVWScsICduYW1lJzogJ1VydWd1YXknIH0sIHsgJ2NvZGUnOiAnVVonLCAnbmFtZSc6ICdVemJla2lzdGFuJyB9LCB7ICdjb2RlJzogJ1ZBJywgJ25hbWUnOiAnVmF0aWNhbicgfSwgeyAnY29kZSc6ICdWQycsICduYW1lJzogJ1NhaW50IFZpbmNlbnQgQW5kIFRoZSBHcmVuYWRpbmVzJyB9LCB7ICdjb2RlJzogJ1ZFJywgJ25hbWUnOiAnVmVuZXp1ZWxhJyB9LCB7ICdjb2RlJzogJ1ZHJywgJ25hbWUnOiAnQnJpdGlzaCBWaXJnaW4gSXNsYW5kcycgfSwgeyAnY29kZSc6ICdWSScsICduYW1lJzogJ1UuUy4gVmlyZ2luIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnVk4nLCAnbmFtZSc6ICdWaWV0bmFtJyB9LCB7ICdjb2RlJzogJ1ZVJywgJ25hbWUnOiAnVmFudWF0dScgfSwgeyAnY29kZSc6ICdXRicsICduYW1lJzogJ1dhbGxpcyBBbmQgRnV0dW5hJyB9LCB7ICdjb2RlJzogJ1dTJywgJ25hbWUnOiAnU2Ftb2EnIH0sIHsgJ2NvZGUnOiAnWUUnLCAnbmFtZSc6ICdZZW1lbicgfSwgeyAnY29kZSc6ICdZVCcsICduYW1lJzogJ01heW90dGUnIH0sIHsgJ2NvZGUnOiAnWkEnLCAnbmFtZSc6ICdTb3V0aCBBZnJpY2EnIH0sIHsgJ2NvZGUnOiAnWk0nLCAnbmFtZSc6ICdaYW1iaWEnIH0sIHsgJ2NvZGUnOiAnWlcnLCAnbmFtZSc6ICdaaW1iYWJ3ZScgfV07XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtY291bnRyeS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlQ291bnRyeUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb3VudHJ5TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IEJBU0VfRU5EUE9JTlQgPSAnY29tcGFuaWVzLyR7Y29tcGFueUlkfS9kZXBhcnRtZW50cy9vcHRpb25zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfREVQQVJUTUVOVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtZGVwYXJ0bWVudCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImVuZHBvaW50IGVsc2UgZmFrZURpc2FibGVkXCI+XG4gIDxkZWMtYXV0b2NvbXBsZXRlXG4gIFtkaXNhYmxlZF09XCIhY29tcGFueUlkIHx8IGRpc2FibGVkXCJcbiAgW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbiAgW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuICBbbmFtZV09XCJuYW1lXCJcbiAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuICBbKG5nTW9kZWwpXT1cInZhbHVlXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4gIChibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZmFrZURpc2FibGVkPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9ERVBBUlRNRU5UX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgZW5kcG9pbnQ6IHN0cmluZztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjb21wYW55SWQodjogc3RyaW5nKSB7XG4gICAgdGhpcy5fY29tcGFueUlkID0gdjtcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uY29tcGFueUlkKCk7XG4gIH1cblxuICBnZXQgY29tcGFueUlkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wYW55SWQ7XG4gIH1cblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0RlcGFydG1lbnQgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdEZXBhcnRtZW50IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX2NvbXBhbnlJZDogc3RyaW5nO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHNldEVuZHBvaW50QmFzZWRPbmNvbXBhbnlJZCgpIHtcbiAgICB0aGlzLmVuZHBvaW50ID0gIXRoaXMuY29tcGFueUlkID8gdW5kZWZpbmVkIDogQkFTRV9FTkRQT0lOVC5yZXBsYWNlKCcke2NvbXBhbnlJZH0nLCB0aGlzLmNvbXBhbnlJZCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5jb25zdCBBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXJvbGUnLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlXG5bZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbltuYW1lXT1cIm5hbWVcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludCA9ICdyb2xlcy9vcHRpb25zJztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIHR5cGVzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1JvbGUgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdSb2xlIGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlXG4gICkge31cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgLy8gY3VzdG9tRmV0Y2hGdW5jdGlvbiA9ICh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgLy8gICBjb25zdCBzZWFyY2ggPSB0ZXh0U2VhcmNoID8geyB0ZXh0U2VhcmNoIH0gOiB1bmRlZmluZWQ7XG4gIC8vICAgcmV0dXJuIHRoaXMuZGVjb3JhQXBpLmdldCh0aGlzLmVuZHBvaW50LCBzZWFyY2gpXG4gIC8vICAgLnBpcGUoXG4gIC8vICAgICBtYXAocm9sZXMgPT4ge1xuICAvLyAgICAgICByZXR1cm4gcm9sZXMuZmlsdGVyKHJvbGUgPT4ge1xuICAvLyAgICAgICAgIGNvbnN0IHJvbGVUeXBlID0gKHJvbGUgJiYgcm9sZS5rZXkpID8gcm9sZS5rZXkuc3BsaXQoJy4nKVswXSA6IHVuZGVmaW5lZDtcbiAgLy8gICAgICAgICByZXR1cm4gIXRoaXMudHlwZXMgPyB0cnVlIDogdGhpcy50eXBlcy5pbmRleE9mKHJvbGVUeXBlKSA+PSAwO1xuICAvLyAgICAgICB9KTtcbiAgLy8gICAgIH0pXG4gIC8vICAgKTtcbiAgLy8gfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtcm9sZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZVJvbGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVJvbGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBCQVNFX0FVVE9DT01QTEVURV9QUk9KRUNUX0VORFBPSU5UID0gJy9sZWdhY3kvcHJvamVjdC9zZWFyY2gva2V5VmFsdWUnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9QUk9KRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1wcm9qZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiKGVuZHBvaW50ICYmIGNvbXBhbnlJZCkgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgI2F1dG9jb21wbGV0ZVxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxGbl09XCJsYWJlbEZuXCJcbiAgW25hbWVdPVwibmFtZVwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIFtjdXN0b21GZXRjaEZ1bmN0aW9uXT1cImN1c3RvbUZldGNoRnVuY3Rpb25cIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1BST0pFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDtcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgY29tcGFueUlkKHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9jb21wYW55SWQgIT09IHYpIHtcbiAgICAgIHRoaXMuX2NvbXBhbnlJZCA9IHY7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5lbmRwb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBlbnN1cmVzIGEgZGlnZXN0IGNpY2xlIGJlZm9yZSByZXNldGluZyB0aGUgZW5kcG9pbnRcbiAgICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjb21wYW55SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlJZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUHJvamVjdCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1Byb2plY3QgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY29tcGFueUlkOiBzdHJpbmc7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2UpIHsgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIGxhYmVsRm4oY29tcGFueSkge1xuICAgIHJldHVybiBgJHtjb21wYW55LnZhbHVlfSAjJHtjb21wYW55LmtleX1gO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0RW5kcG9pbnRCYXNlZE9uQ29tcGFueUlkKCkge1xuICAgIGlmICh0aGlzLmNvbXBhbnlJZCkge1xuICAgICAgdGhpcy5lbmRwb2ludCA9IEJBU0VfQVVUT0NPTVBMRVRFX1BST0pFQ1RfRU5EUE9JTlQgKyAnP2NvbXBhbnlJZD0nICsgdGhpcy5jb21wYW55SWQ7XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGN1c3RvbUZldGNoRnVuY3Rpb24gPSAodGV4dFNlYXJjaCk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBwYXJhbXMudGV4dFNlYXJjaCA9IHRleHRTZWFyY2g7XG4gICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKTtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkuZ2V0KHRoaXMuZW5kcG9pbnQsIHBhcmFtcylcbiAgICAucGlwZShcbiAgICAgIG1hcChwcm9qZWN0cyA9PiB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0cztcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtcHJvamVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVQcm9qZWN0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmNvbnN0IFFVT1RFX0VORFBPSU5UID0gJy9wcm9qZWN0cy8ke3Byb2plY3RJZH0vcXVvdGVzL29wdGlvbnMnO1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfUVVPVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1xdW90ZScsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImVuZHBvaW50IGVsc2UgZmFrZURpc2FibGVkXCI+XG4gIDxkZWMtYXV0b2NvbXBsZXRlXG4gIFtkaXNhYmxlZF09XCIhcHJvamVjdElkIHx8IGRpc2FibGVkXCJcbiAgW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbiAgW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuICBbbmFtZV09XCJuYW1lXCJcbiAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuICBbKG5nTW9kZWwpXT1cInZhbHVlXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4gIChibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZmFrZURpc2FibGVkPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9RVU9URV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdRdW90ZSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1F1b3RlIGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBwcm9qZWN0SWQodjogc3RyaW5nKSB7XG4gICAgdGhpcy5fcHJvamVjdElkID0gdjtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbklucHV0cygpO1xuICB9XG5cbiAgZ2V0IHByb2plY3RJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdElkO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY29yYVByb2R1Y3Qodjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZGVjb3JhUHJvZHVjdCA9IHY7XG4gICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKTtcbiAgfVxuXG4gIGdldCBkZWNvcmFQcm9kdWN0KCkge1xuICAgIHJldHVybiB0aGlzLl9kZWNvcmFQcm9kdWN0O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY29yYVByb2R1Y3RWYXJpYW50KHY6IHN0cmluZykge1xuICAgIHRoaXMuX2RlY29yYVByb2R1Y3RWYXJpYW50ID0gdjtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbklucHV0cygpO1xuICB9XG5cbiAgZ2V0IGRlY29yYVByb2R1Y3RWYXJpYW50KCkge1xuICAgIHJldHVybiB0aGlzLl9kZWNvcmFQcm9kdWN0VmFyaWFudDtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb2plY3RJZDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2RlY29yYVByb2R1Y3Q6IHN0cmluZztcblxuICBwcml2YXRlIF9kZWNvcmFQcm9kdWN0VmFyaWFudDogc3RyaW5nO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlKSB7IH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKSB7XG5cbiAgICBsZXQgZW5kcG9pbnQ7XG5cbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRoaXMucHJvamVjdElkKSB7XG5cbiAgICAgIGVuZHBvaW50ID0gUVVPVEVfRU5EUE9JTlQucmVwbGFjZSgnJHtwcm9qZWN0SWR9JywgdGhpcy5wcm9qZWN0SWQpO1xuXG4gICAgICBjb25zdCBwYXJhbXMgPSBbXTtcblxuICAgICAgaWYgKHRoaXMuZGVjb3JhUHJvZHVjdCkge1xuICAgICAgICBwYXJhbXMucHVzaChgcHJvZHVjdElkPSR7dGhpcy5kZWNvcmFQcm9kdWN0fWApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kZWNvcmFQcm9kdWN0VmFyaWFudCkge1xuICAgICAgICBwYXJhbXMucHVzaChgcHJvZHVjdFZhcmlhbnRJZD0ke3RoaXMuZGVjb3JhUHJvZHVjdFZhcmlhbnR9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubGVuZ3RoKSB7XG5cbiAgICAgICAgZW5kcG9pbnQgKz0gYD8ke3BhcmFtcy5qb2luKCcmJyl9YDtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5kcG9pbnQgIT09IGVuZHBvaW50KSB7XG5cbiAgICAgIHRoaXMuZW5kcG9pbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcblxuICAgICAgfSwgMCk7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0F1dG9jb21wbGV0ZVF1b3RlQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUXVvdGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5jb25zdCBBVVRPQ09NUExFVEVfVEFHU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVUYWdzQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtdGFncycsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbltuYW1lXT1cIm5hbWVcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuKGVudGVyQnV0dG9uKT1cImVudGVyQnV0dG9uLmVtaXQoJGV2ZW50KVwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcbltsYWJlbEF0dHJdPVwibGFiZWxBdHRyXCJcblt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbihibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPmAsXG4gIHN0eWxlczogW2BgXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1RBR1NfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlVGFnc0NvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBASW5wdXQoKVxuICBzZXQgZW5kcG9pbnQodikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9lbmRwb2ludCA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGVuZHBvaW50KCkge1xuICAgIHJldHVybiB0aGlzLl9lbmRwb2ludDtcbiAgfVxuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgX2VuZHBvaW50OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdUYWdzIGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnVGFncyBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgZW50ZXJCdXR0b246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIGxhYmVsRm4odGFncykge1xuICAgIHJldHVybiBgJHt0YWdzLnZhbHVlfSAjJHt0YWdzLmtleX1gO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVUYWdzQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtdGFncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlVGFnc0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlVGFnc0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVRhZ3NNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1icmVhZGNydW1iJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgY2xhc3M9XCJkZWMtYnJlYWRjcnVtYi13cmFwcGVyXCI+XG5cbiAgPGRpdiBmeEZsZXg+XG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgIDxoMT57e2ZlYXR1cmV9fTwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJicmVhZGNydW1iXCI+XG4gICAgICAgIHt7YnJlYWRjcnVtYn19XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXggZnhGbGV4QWxpZ249XCJjZW50ZXJcIiBmeExheW91dEFsaWduPVwiZW5kXCI+XG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiPlxuICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgIDwhLS0gQ09OVEVOVCAgLS0+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPCEtLSBCQUNLIEJVVFRPTiAtLT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJkZWZhdWx0XCIgKm5nSWY9XCJiYWNrQnV0dG9uUGF0aFwiIChjbGljayk9XCJnb0JhY2soKVwiPnt7IGJhY2tMYWJlbCB9fTwvYnV0dG9uPlxuICAgICAgICA8IS0tIEZPUldBUkQgQlVUVE9OIC0tPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cImRlZmF1bHRcIiAqbmdJZj1cImZvcndhcmRCdXR0b25cIiAoY2xpY2spPVwiZ29Gb3J3YXJkKClcIj57eyBmb3J3YXJkTGFiZWwgfX08L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1icmVhZGNydW1iLXdyYXBwZXJ7bWFyZ2luLWJvdHRvbTozMnB4fS5kZWMtYnJlYWRjcnVtYi13cmFwcGVyIGgxe2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjQwMDttYXJnaW4tdG9wOjRweDttYXJnaW4tYm90dG9tOjRweH0uZGVjLWJyZWFkY3J1bWItd3JhcHBlciAuYnJlYWRjcnVtYntjb2xvcjojYThhOGE4fWBdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNCcmVhZGNydW1iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBiYWNrQnV0dG9uUGF0aDogc3RyaW5nO1xuICBASW5wdXQoKSBicmVhZGNydW1iOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZlYXR1cmU6IHN0cmluZztcbiAgQElucHV0KCkgZm9yd2FyZEJ1dHRvbjogc3RyaW5nO1xuICBASW5wdXQoKSBpMThuRmVhdHVyZTogc3RyaW5nO1xuICBASW5wdXQoKSBpMThuQnJlYWRjcnVtYjogc3RyaW5nW107XG4gIEBJbnB1dCgpIGJhY2tMYWJlbCA9ICdCYWNrJztcbiAgQElucHV0KCkgZm9yd2FyZExhYmVsID0gJ0ZvcndhcmQnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgdHJhbnNsYXRvcjogVHJhbnNsYXRlU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50cmFuc2xhdGVGZWF0dXJlKCk7XG4gICAgdGhpcy50cmFuc2xhdGVQYXRocygpO1xuICAgIHRoaXMuZGV0ZWN0QW5kUGFyc2VCdXR0b25zQ29uZmlnKCk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdEFuZFBhcnNlQnV0dG9uc0NvbmZpZygpIHtcbiAgICB0aGlzLnBhcnNlQmFja0J1dHRvbigpO1xuICAgIHRoaXMucGFyc2VGb3J3YXJkQnV0dG9uKCk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQmFja0J1dHRvbigpIHtcbiAgICBpZiAodGhpcy5iYWNrQnV0dG9uUGF0aCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYmFja0J1dHRvblBhdGggIT09ICdmYWxzZScpIHtcbiAgICAgIHRoaXMuYmFja0J1dHRvblBhdGggPSB0aGlzLmJhY2tCdXR0b25QYXRoID8gdGhpcy5iYWNrQnV0dG9uUGF0aCA6ICcvJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBhcnNlRm9yd2FyZEJ1dHRvbigpIHtcbiAgICBpZiAodGhpcy5mb3J3YXJkQnV0dG9uICE9PSB1bmRlZmluZWQgJiYgdGhpcy5mb3J3YXJkQnV0dG9uICE9PSAnZmFsc2UnKSB7XG4gICAgICB0aGlzLmZvcndhcmRCdXR0b24gPSB0aGlzLmZvcndhcmRCdXR0b24gPyB0aGlzLmZvcndhcmRCdXR0b24gOiAnLyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2xhdGVGZWF0dXJlKCkge1xuICAgIGlmICh0aGlzLmkxOG5CcmVhZGNydW1iKSB7XG4gICAgICB0aGlzLmJyZWFkY3J1bWIgPSB0aGlzLmkxOG5CcmVhZGNydW1iLm1hcChwYXRoID0+IHRoaXMudHJhbnNsYXRvci5pbnN0YW50KHBhdGgpKS5qb2luKCcgLyAnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyYW5zbGF0ZVBhdGhzKCkge1xuICAgIGlmICh0aGlzLmkxOG5GZWF0dXJlKSB7XG4gICAgICB0aGlzLmZlYXR1cmUgPSB0aGlzLnRyYW5zbGF0b3IuaW5zdGFudCh0aGlzLmkxOG5GZWF0dXJlKTtcbiAgICB9XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gTmF2aWdhdGlvbiBNZXRob2RzIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKiAvL1xuXG4gIHB1YmxpYyBnb0JhY2soKSB7XG4gICAgaWYgKHRoaXMuYmFja0J1dHRvblBhdGgpIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmJhY2tCdXR0b25QYXRoXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ29Gb3J3YXJkKCkge1xuICAgIGlmICh0aGlzLmZvcndhcmRCdXR0b24pIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmZvcndhcmRCdXR0b25dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lmhpc3RvcnkuZm9yd2FyZCgpO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQW5ndWxhciBtb2R1bGVzXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGVjQnJlYWRjcnVtYkNvbXBvbmVudCB9IGZyb20gJy4vYnJlYWRjcnVtYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQnJlYWRjcnVtYkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQnJlYWRjcnVtYkNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0JyZWFkY3J1bWJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERpYWxvZ0FjdGlvbiB9IGZyb20gJy4vZGVjLWRpYWxvZy5tb2RlbHMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZGlhbG9nJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXRvb2xiYXIgY29sb3I9XCJwcmltYXJ5XCI+XG5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4RmxleEZpbGwgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJ1cHBlcmNhc2VcIiBtYXQtZGlhbG9nLWNsb3NlPlxuICAgICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGgxPiZuYnNwOyB7eyB0aXRsZSB9fTwvaDE+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBmeEZsZXg+XG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImFjdGlvbnNcIj5cbiAgICAgICAgICA8bWF0LW1lbnUgI2RlY0RpYWxvZ0FjdGlvbnNNZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGFjdGlvbnNcIiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJhY3Rpb24uY2FsbGJhY2soY29udGV4dClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L21hdC1tZW51PlxuXG4gICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cImRlY0RpYWxvZ0FjdGlvbnNNZW51XCI+XG4gICAgICAgICAgICA8bWF0LWljb24+bW9yZV92ZXJ0PC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjwvbWF0LXRvb2xiYXI+XG5cbjxkaXYgY2xhc3M9XCJkZWMtZGlhbG9nLWNoaWxkLXdyYXBwZXJcIj5cbiAgPHRlbXBsYXRlICNjaGlsZENvbnRhaW5lcj48L3RlbXBsYXRlPlxuPC9kaXY+XG5cbjxkZWMtc3Bpbm5lciAqbmdJZj1cIiFsb2FkZWRcIj48L2RlYy1zcGlubmVyPlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtZGlhbG9nLWNoaWxkLXdyYXBwZXJ7cGFkZGluZzozMnB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLy8gQ1VSUkVOVFxuICBjaGlsZENvbXBvbmVudFR5cGU6IENvbXBvbmVudFR5cGU8YW55PjtcblxuICBjaGlsZENvbXBvbmVudEluc3RhbmNlOiBhbnk7XG5cbiAgYWN0aW9uczogRGlhbG9nQWN0aW9uW10gPSBbXTtcblxuICB0aXRsZTogc3RyaW5nO1xuXG4gIGNvbnRleHQ6IGFueSA9IHt9O1xuXG4gIGxvYWRlZDogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKCdjaGlsZENvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBjaGlsZENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBAT3V0cHV0KCkgY2hpbGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZhY3RvcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGVjRGlhbG9nQ29tcG9uZW50PlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLmRpYWxvZ1JlZi5hZnRlck9wZW4oKVxuICAgIC50b1Byb21pc2UoKVxuICAgIC50aGVuKHRoaXMuZmFjdG9yeVRoZUNvbXBvbmVudCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZmFjdG9yeVRoZUNvbXBvbmVudCA9ICgpID0+IHtcblxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiA9IHRoaXMuZmFjdG9yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuY2hpbGRDb21wb25lbnRUeXBlKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gPSB0aGlzLmNoaWxkQ29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgIHRoaXMuY2hpbGRDb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcblxuICAgIHRoaXMuY2hpbGQuZW1pdCh0aGlzLmNoaWxkQ29tcG9uZW50SW5zdGFuY2UpO1xuXG4gICAgdGhpcy5jaGlsZC5jb21wbGV0ZSgpOyAvLyB1bnN1YnNyaWJlIHN1YnNjcmliZXJzXG5cbiAgICB0aGlzLmFwcGVuZENvbnRleHRUb0luc3RhbmNlKGNvbXBvbmVudFJlZi5pbnN0YW5jZSwgdGhpcy5jb250ZXh0KTtcblxuICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRDb250ZXh0VG9JbnN0YW5jZShpbnN0YW5jZTogYW55LCBjb250ZXh0OiBhbnkpIHtcblxuICAgIGlmIChpbnN0YW5jZSAmJiBjb250ZXh0KSB7XG5cbiAgICAgIE9iamVjdC5rZXlzKGNvbnRleHQpLmZvckVhY2goKGtleSkgPT4ge1xuXG4gICAgICAgIGluc3RhbmNlW2tleV0gPSB0aGlzLmNvbnRleHRba2V5XTtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc3Bpbm5lcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlY29yYS1sb2FkaW5nLXNwaW5uZXItd3JhcHBlclwiPlxuICA8ZGl2IGNsYXNzPVwiZGVjb3JhLWxvYWRpbmctc3Bpbm5lciB0cmFuc3BhcmVudEJnXCI+XG4gICAgPGRpdiBjbGFzcz1cImNlbnRlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhcFwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhhbGYtY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGFsZi1jaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtgLmRlY29yYS1sb2FkaW5nLXNwaW5uZXItd3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU3Bpbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zcGlubmVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjU3Bpbm5lckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNTcGlubmVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTcGlubmVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBEZWNEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2RlYy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE9wZW5Db25maWd1cmF0aW9uIH0gZnJvbSAnLi9kZWMtZGlhbG9nLm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNEaWFsb2dTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nXG4gICkgeyB9XG5cblxuICBvcGVuKGNoaWxkQ29tcG9uZW50OiBDb21wb25lbnRUeXBlPGFueT4sIGNvbmZpZzogT3BlbkNvbmZpZ3VyYXRpb24pIHtcblxuICAgIGNvbnN0IGRpYWxvZ0luc3RhbmNlOiBNYXREaWFsb2dSZWY8YW55PiA9IHRoaXMuZGlhbG9nLm9wZW4oXG4gICAgICBEZWNEaWFsb2dDb21wb25lbnQsXG4gICAgICB7XG4gICAgICAgIHdpZHRoOiBjb25maWcud2lkdGggfHwgJzEwMHZ3JyxcbiAgICAgICAgaGVpZ2h0OiBjb25maWcuaGVpZ3RoIHx8ICcxMDB2aCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdmdWxsLXNjcmVlbi1kaWFsb2cnXG4gICAgICB9XG4gICAgKTtcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLmNoaWxkQ29tcG9uZW50VHlwZSA9IGNoaWxkQ29tcG9uZW50O1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UuYWN0aW9ucyA9IGNvbmZpZy5hY3Rpb25zO1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSBjb25maWcudGl0bGU7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS5jb250ZXh0ID0gY29uZmlnLmNvbnRleHQ7XG5cbiAgICByZXR1cm4gZGlhbG9nSW5zdGFuY2U7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY1NwaW5uZXJNb2R1bGUgfSBmcm9tICcuLy4uL2RlYy1zcGlubmVyL2RlYy1zcGlubmVyLm1vZHVsZSc7XG5cbmltcG9ydCB7IERlY0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vZGVjLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjRGlhbG9nU2VydmljZSB9IGZyb20gJy4vZGVjLWRpYWxvZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgRGVjU3Bpbm5lck1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0RpYWxvZ0NvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0RlY0RpYWxvZ0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0RlY0RpYWxvZ1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNEaWFsb2dNb2R1bGUgeyB9XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vc2hlaWthbHRoYWYvbmd1LWNhcm91c2VsI2lucHV0LWludGVyZmFjZVxuXG5leHBvcnQgY29uc3QgQ2Fyb3VzZWxDb25maWcgPSB7XG4gIGdyaWQ6IHsgeHM6IDEsIHNtOiAyLCBtZDogMywgbGc6IDQsIGFsbDogMCB9LFxuICBzbGlkZTogMSxcbiAgc3BlZWQ6IDQwMCxcbiAgaW50ZXJ2YWw6IDQwMDAsXG4gIHBvaW50OiB7XG4gICAgdmlzaWJsZTogZmFsc2VcbiAgfSxcbiAgY3VzdG9tOiAnYmFubmVyJ1xufTtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcm91c2VsQ29uZmlnIH0gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxTdG9yZSB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwvc3JjL25ndS1jYXJvdXNlbC9uZ3UtY2Fyb3VzZWwuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWdhbGxlcnknLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtZ2FsbGVyeS13cmFwcGVyXCI+XG5cbiAgPGRpdiBjbGFzcz1cImltYWdlLWhpZ2hsaWdodGVkXCI+XG4gICAgICA8ZGVjLWltYWdlLXpvb21cbiAgICAgICAgW3NpemVdPVwie3dpZHRoOiA2MjAsIGhlaWdodDogNjIwfVwiXG4gICAgICAgIFtzeXN0ZW1GaWxlXT1cImltYWdlSGlnaGxpZ2h0XCI+XG4gICAgICA8L2RlYy1pbWFnZS16b29tPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodFwiICpuZ0lmPVwiaW1nRXh0ZXJuYWxMaW5rXCI+XG5cbiAgICA8YSBocmVmPVwie3sgaW1nRXh0ZXJuYWxMaW5rIH19XCIgdGFyZ2V0PVwiX2JsYW5rXCI+e3sgJ2xhYmVsLmltYWdlLWxpbmsnIHwgdHJhbnNsYXRlIH19PC9hPlxuXG4gIDwvZGl2PlxuXG4gIDxuZ3UtY2Fyb3VzZWwgY2xhc3M9XCJjYXJvdXNlbC13cmFwcGVyXCIgW2lucHV0c109XCJjYXJvdXNlbENvbmZpZ1wiIChpbml0RGF0YSk9XCJvbkluaXREYXRhRm4oJGV2ZW50KVwiIChvbk1vdmUpPVwib25Nb3ZlRm4oJGV2ZW50KVwiPlxuXG4gICAgPG5ndS1pdGVtIE5ndUNhcm91c2VsSXRlbSAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgaW1hZ2VzXCIgW2NsYXNzLmFjdGl2ZV09XCJpbWFnZSA9PSBpbWFnZUhpZ2hsaWdodFwiPlxuXG4gICAgICA8aW1nIFtkZWNJbWFnZV09XCJpbWFnZVwiIFtkZWNJbWFnZVNpemVdPVwie3dpZHRoOjMwMCwgaGVpZ2h0OjMwMH1cIiAoY2xpY2spPVwib25TZWxlY3RJbWFnZSgkZXZlbnQsaW1hZ2UpXCI+XG5cbiAgICA8L25ndS1pdGVtPlxuXG4gICAgPG1hdC1pY29uIE5ndUNhcm91c2VsUHJldiBjbGFzcz1cImxlZnQtcHJldmlvdXNcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXNGaXJzdH1cIj5jaGV2cm9uX2xlZnQ8L21hdC1pY29uPlxuXG4gICAgPG1hdC1pY29uIE5ndUNhcm91c2VsTmV4dCBjbGFzcz1cInJpZ2h0LW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXNMYXN0fVwiPmNoZXZyb25fcmlnaHQ8L21hdC1pY29uPlxuXG4gIDwvbmd1LWNhcm91c2VsPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLWdhbGxlcnktd3JhcHBlcnttYXgtd2lkdGg6NjI0cHg7b3ZlcmZsb3c6aGlkZGVufS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5pbWFnZS1oaWdobGlnaHRlZHtib3JkZXI6MnB4IHNvbGlkICNmNWY1ZjU7d2lkdGg6NjIwcHg7aGVpZ2h0OjYyMHB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIGF7Zm9udC1zaXplOjEwcHg7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y29sb3I6IzkyOTI5MjtjdXJzb3I6cG9pbnRlcn0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlcnttYXJnaW4tdG9wOjhweDtwYWRkaW5nOjAgMjRweDtoZWlnaHQ6MTI4cHh9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW17ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2hlaWdodDoxMjRweDtwYWRkaW5nOjJweDttYXJnaW4tcmlnaHQ6MnB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtLmFjdGl2ZSwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbTpob3ZlcntwYWRkaW5nOjA7Ym9yZGVyOjJweCBzb2xpZCAjMjMyZTM4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtIGltZ3ttYXgtd2lkdGg6MTI0cHg7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHR7ZGlzcGxheTpibG9jayFpbXBvcnRhbnQ7cG9zaXRpb246YWJzb2x1dGU7dG9wOmNhbGMoNTAlIC0gMTJweCk7Y3Vyc29yOnBvaW50ZXI7dGV4dC1zaGFkb3c6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXM6aG92ZXIsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQ6aG92ZXJ7dGV4dC1zaGFkb3c6MCAwIDZweCByZ2JhKDAsMCwwLC4yKX0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cy5kaXNhYmxlZCwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dC5kaXNhYmxlZHtvcGFjaXR5Oi40fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLmRpc2FibGVkOmhvdmVyLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0LmRpc2FibGVkOmhvdmVye3RleHQtc2hhZG93Om5vbmV9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXN7bGVmdDowfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0e3JpZ2h0OjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjR2FsbGVyeUNvbXBvbmVudCB7XG5cbiAgaW1hZ2VIaWdobGlnaHQ6IGFueTtcblxuICBhY3RpdmVJbWFnZTogRWxlbWVudDtcblxuICBpbWdFeHRlcm5hbExpbms6IHN0cmluZztcblxuICBpc0ZpcnN0OiBib29sZWFuO1xuXG4gIGlzTGFzdDogYm9vbGVhbjtcblxuICBjYXJvdXNlbENvbmZpZyA9IENhcm91c2VsQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBpbWFnZXModmFsdWU6IGFueVtdKSB7XG5cbiAgICB2YWx1ZSA9IHZhbHVlIHx8IG5ldyBBcnJheTxhbnk+KCk7XG5cbiAgICBpZiAodmFsdWUgJiYgKEpTT04uc3RyaW5naWZ5KHZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5faW1hZ2VzKSkpIHtcblxuICAgICAgdGhpcy5pbWFnZUhpZ2hsaWdodCA9IHZhbHVlWzBdO1xuXG4gICAgICB0aGlzLl9pbWFnZXMgPSB2YWx1ZTtcblxuICAgICAgdGhpcy5zZXRFeHRlcm5hbExpbmsoKTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGltYWdlcygpOiBhbnlbXSB7XG5cbiAgICByZXR1cm4gdGhpcy5faW1hZ2VzO1xuXG4gIH1cblxuICBwcml2YXRlIF9pbWFnZXM6IGFueVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBvblNlbGVjdEltYWdlID0gKCRldmVudCwgc3lzRmlsZSkgPT4ge1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlSW1hZ2UgJiYgdGhpcy5hY3RpdmVJbWFnZSAhPT0gJGV2ZW50LnRhcmdldCkge1xuXG4gICAgICB0aGlzLmFjdGl2ZUltYWdlLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgfVxuXG4gICAgJGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPSAnYWN0aXZlJztcblxuICAgIHRoaXMuYWN0aXZlSW1hZ2UgPSAkZXZlbnQudGFyZ2V0O1xuXG4gICAgdGhpcy5pbWFnZUhpZ2hsaWdodCA9IHN5c0ZpbGU7XG5cbiAgICB0aGlzLnNldEV4dGVybmFsTGluaygpO1xuXG4gIH1cblxuICBzZXRFeHRlcm5hbExpbmsgPSAoKSA9PiB7XG5cbiAgICBpZiAodGhpcy5pbWFnZUhpZ2hsaWdodCkge1xuXG4gICAgICB0aGlzLmltZ0V4dGVybmFsTGluayA9IHRoaXMuaW1hZ2VIaWdobGlnaHQuZmlsZVVybDtcblxuICAgIH1cblxuICB9XG5cbiAgb25Jbml0RGF0YUZuKGV2ZW50OiBOZ3VDYXJvdXNlbFN0b3JlKSB7XG5cbiAgICB0aGlzLnNldFByZXZOZXh0Q2hlY2tlcnMoZXZlbnQuaXNGaXJzdCwgZXZlbnQuaXRlbXMgPj0gdGhpcy5pbWFnZXMubGVuZ3RoKTtcblxuICB9XG5cbiAgb25Nb3ZlRm4oZXZlbnQ6IE5ndUNhcm91c2VsU3RvcmUpIHtcblxuICAgIHRoaXMuc2V0UHJldk5leHRDaGVja2VycyhldmVudC5pc0ZpcnN0LCBldmVudC5pc0xhc3QpO1xuXG4gIH1cblxuICBzZXRQcmV2TmV4dENoZWNrZXJzKGZpcnN0OiBib29sZWFuLCBsYXN0OiBib29sZWFuKSB7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5pc0ZpcnN0ID0gZmlyc3Q7XG5cbiAgICAgIHRoaXMuaXNMYXN0ID0gbGFzdDtcblxuICAgIH0sIDApO1xuXG4gIH1cblxufVxuIiwiZXhwb3J0IGNvbnN0IFRodW1ib3JTZXJ2ZXJIb3N0ID0gJ2h0dHBzOi8vY2FjaGUtdGh1bWJzLmRlY29yYWNvbnRlbnQuY29tL3Vuc2FmZSc7XG5cbmV4cG9ydCBjb25zdCBTM0hvc3QgPSAnaHR0cDovL3MzLmFtYXpvbmF3cy5jb20vZGVjb3JhLXBsYXRmb3JtLTEtbnYnO1xuXG5leHBvcnQgY29uc3QgVHJhbnNwYXJlbnRJbWFnZSA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVFBQUFDMUhBd0NBQUFBQW1KTFIwUUEvNGVQekw4QUFBXG5BSmNFaFpjd0FBQ3hNQUFBc1RBUUNhbkJnQUFBQUxTVVJCVkFqWFkyQmdBQUFBQXdBQklOV1V4d0FBQUFCSlJVNUVya0pnZ2c9PWA7XG5cbmV4cG9ydCBjb25zdCBFcnJvckltYWdlID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBTUFBQUQwNEpINUFBQUFzVkJNVkVVQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBXG5BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVxuQUFBQUFBQUFBazJ3TFNBQUFBT25SU1RsTUFBNFVVQlFnTUVQU0tLK2phR3hjZjk1MHljazg2TmkrbWdiOVhKaU95UlBEczNxS1daMHJLclh4Mys4NWpRVDI0WGVQWDA4VnRhcEdhRUM1Uk53QUFCMTVKUkVGVWVOcnRtMmR6MnpBTWhrbHIyYklsNzVGNDFYRzg0cGxsMS96L1A2eVhWallFa2lLXG5wa2Q3MXJzK25uaU1kSWVJRkNFQXErYzkvL3BNVjJ3djgzbUc1bkI1NmZ1RGE1QzlDZytubVZHYVlINmVYYVVESjl4TU9KeXlaeVRBazMwbHdyaklkczgyWWZBL3VCVmJYMkhEeFNPR001eXdOazM2eGV1aDlzTFM4SDRzelliUmlTWlRMTEpGYXF5RGRTMlQvOWp4c2hWSHdVOXV4eHNmOVhHTEtcblkxaEEwTDh3am8vRnlKYXIxRzhMTW4ydzgycnZpU0YySFplbzhEbzdocWoyY3ozK0E4NTJaOHNrV1d5d00wclp4ZWdpOGEwT3B0dHBMOStRR0MyU0RiOGMzL3RXcWdmcDFoaXdQWkFzTE9JUGtUNm9sM0h6MnhuY1VHTEFKWXVXN2JpQW5rbGFyckZvenVyRElPYUhOVTBuL3pYY3VzOFJSYVhZWVxuNlN5QUpMZmJKenZFR2xrc3FCNXYrdms1RTNrNElZSk1RWFUwOHgvb2puZ3pXdnErSHNnUmZBTTBVaE1hRUgwa1dLb3NCc21HY205SjVBWFVoVGcwNEJvdWVmL0NnRUs4MExOTVRhMlNZcGtZcG9TKy9mRGh4YmJSOTNMaEpiNnV1cXQxbk9MTHVvYnQ4eG1Hem5BSjBycSs1L05pUGtYemViUGZWXG4xelFOOExGTlhwWVJhQTFpZVQ4V2xwMUtXUGhNZGIybFpYNlZzbVp6dFd1dmZqWnFnK0JWVWNuVGZsbEIybDM3UTZyRUg1MmFHYW1KYnpiT1NFbWxvbTBVWDlwSjFrS3BRU3A3Y1k2eElwN3d4eEN1UUtZQW8wMFROVmJvRXZicWdzR1J5Wmlpa0JGRTd1SzdJbG9pMXU2WUdwV0dvS3BOdnV5c1JcbjkweC9XZGFkSUE4RE5WbklaMGczWHlpYjdrTU1Gb0lJekVhaEdHMkFUTWw3aEpudXNOY0M0NHFCUkVxbUtXUUpWVFYzY1p6ZGphdHd6RlJjclRoQjRmRDVwUnhjS0o4ZHREQkJHbGc0YkNXcDBIbGdhZnB5eGprTW90NlFlMkVIQzJTU3BNVnluTTZFdWk4UVp3VmpSMVhIUmUzZ3c5dFNEbExGalxuS2RpaVFjMWVIZ2VkNkdkWE5aMTZoR2NCa1JoUWsvbUFpKzlCOUpTOGFBK2NHcjM3WDE0YnpCU2MrNStpYnBVZ3RtTG5JRmZqeHNtZ3hxWkU3bHM4VzFLY0pmWUxWdU1ydmQ4MVlHWlVaWFd2Sjh2UkRsbzVRWTF2b0ViTGM4UFJzakpqR2xDekdQM1drK1RoR1k3TUE2U3BUMXo5OFdsa1BEQTNnXG5FU256UUpwVU5hTU1MWWF3eDdoZ2VIY0k1aGdwVGNBTHpZZ01kNWt3NURmVjNtZ3hqSldvODBuV1ZNRDlwRW40MUtYdVlWRUxUcklIdWZHeHBEeUoxMGkwcEtHaXJvSUpBYXdCc2pldldKeEg3QUpTek1ENm1MU3M2UjVFQlk2Z3FzZldaeVZ6NTlvY3FReEg0bzIyZGdBWUFjTHRiQWFCMGlOT3hcbk1EYlBGRTl1RTZiQUN3Qm5zN25Cb2RmY21NazZ1WTlWbzZBN0FhYlJBOEp4THkwOEFBSWpaSVhZMEJvaHBoa0NlSXhOaUFubUJBUTJrQVhtak1xWEdNUkdKa1FOZDhCNEJkQ0F2VmRDSXgzNEVlcElZWTJycDdpWHVJaWdzaU1SRmhTNHdDVzIvQUdBWFVPVkVrei9vdzlNVTg0T2dOZ0ZJT0Z0S1xucmtjak80N3FZQ1MyOUFSN2hDRTVZSktQN1RuZWYxSm5Razlpa055Q0k3dmlBRGV4emFyVHVKblIrcU00Q1J4a1lvZ0c0c1M2elNZZ1hBa29PTHhMcElFUmZEOGdZUm4vY29GR1NnOVc0WGRoWUpMSTJ1Q1lwVXVaNkE1cklrUXQ2TndFbjRkbVNnaG81QSthUzh1c1NkVkY2QXhvVWJvRnBsdVFsXG45OGNvSmhJU3B3emJyYTZLTlZPZ2E3U1RzWTROVDVrbUtLZ0V4YmRrcldGZmI4QkpHR21jUXFqS1pqZzNPb3BwcENYcmpGNzBCakRZV20venRkNnM3Y0k5ZElIVnVLZUU1d1Y4S2Fyd3pjQ0E5L2lkam1jVGpNZXBjWm93Q0JqSXUyTkxid0FyRVRVQnA4YVdOQTkyNVBPQlY1VUJrQXMwK0I5WU5cbm5VQ0RLRWtsVzFNVFdNQW1Da3loSVY0TmY0RU5VYTJWUlV6SXIwQnJDSnFpMWErWnF2UVNPM3hVSDlCOFZhL0pFM0pOa1lHc0tjV3YrdlJpUVF6S2FlQ1IwVlQxTUFGU1hQQ2hnTUdLUG5zd2k3US9pTXN0QVJoclhINCtJVFFNb1FieDBKUXAzYjROQmoyQXl2d08vTXRTNWowOXprMWhyMWtGYlxubkNSSWxsNWpHNDc4MnlpbzhTYUFJRjFueFJ3SEx3N01JMGE4c0VCb3IzQmVDZUJzdERHNHFGa3JLMEJkNjVrZnVLNWFJOHRMRWFnUldSY3VUZWJWNVlIbkNzam5hNHJwTkMzL0Y3YzRzQnVkVklqbFcwQVZMNm5JdmFMRDlYYUpjcWNLRHIzcHpXNko4dHViTGN3RmRVOWtyL01Vc0lKeTYwbWZtXG5BT2Y4R2VodURGOHpUZTVKZFBKUWlLbDlFL3piODdXSFJwL3hyMGJiUjl3T05rQlNMVmI2RkJsV1hFdWhqaitKdzNrSGdha3JveTZ1aW9CUGpUM1BvM2RSNWdlcy8zdzl4QTJjMTduVlVZZXVYV0pwUFU0Nktyd0h5ZmhyckV4UE82TlRNRGYxcFdFNERjTWNwZnl6WWNCSnVpQ2tEZUQyVE54OTRcbk8vQm9scWhoMnluSlEvOEg4bWNXQzlqVktlVEQ5RUhLV3dkd2EzVkVzaEhzWW85QjBsTEJuWlVHM2Z2R0RVblBLM28vUk5LeW5LRjJOZ3V0QmdPcXkxUm5RKytkQWVXc1ByUlFYek1iMnFZQ210WlFFK2RtVHlJUFhGTThvZ1ptdDh1NEpDTjVHRDF4bGZhaXJsNTkrTUVRdFhyZVRONFdpcnhLVjFcbjdWdWExTmxYRmNLTW1OTjJFaXAvYlNEeDJiZm1FNzN2aHdYa3ZxMTdWWDJQOHp5c0xuaUJTRy81bCtlWjhVeW5qQTB0Q3NrOEp4WDU5TW05SlhoM3dQNFVWdnc5czVJTitKTjcyV2s5dXdlY2NpZndHM3YyL1crQWVmNzFzZStadFF4NnI3dmU3eDJQUHJsa1ArOCsveUN6R2k3YUZ6cFBVdEFBQUFBRWxGVGtTdVFtQ0NgO1xuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjSW1hZ2VTaXplLCBTeXN0ZW1GaWxlS2V5IH0gZnJvbSAnLi9pbWFnZS5kaXJlY3RpdmUubW9kZWxzJztcbmltcG9ydCB7IFRyYW5zcGFyZW50SW1hZ2UsIFRodW1ib3JTZXJ2ZXJIb3N0LCBFcnJvckltYWdlLCBTM0hvc3QgfSBmcm9tICcuL2ltYWdlLmRpcmVjdGl2ZS5jb25zdGFudHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGVjSW1hZ2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZURpcmVjdGl2ZSB7XG5cbiAgY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgZXJyb3JPbkxvYWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgZGVjSW1hZ2UodjogU3lzdGVtRmlsZUtleSB8IHN0cmluZykge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVySW1hZ2UpIHtcbiAgICAgIHRoaXMuaW5uZXJJbWFnZSA9IHY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGRlY0ltYWdlU2l6ZTogRGVjSW1hZ2VTaXplO1xuXG4gIC8vIERlZmluZXMgaWYgd2hpdGUgbWFyZ2lucyBzaG91bGQgYmUgY3JvcHBlZFxuICBASW5wdXQoKSB0cmltOiBib29sZWFuO1xuXG4gIC8vIERlZmluZXMgaWYgdGhlIGltYWdlIHNob3VsZCBiZSBjcm9wcGVkIG9yIGZpdCB0aGUgc2l6ZSByZXNwZWN0aW4gdGhlIGFzcGVjdCByYXRpb1xuICBASW5wdXQoKSBmaXRJbjogYm9vbGVhbjtcblxuICAvLyBHZWQgcmVkaW1lbnNpb25lZCBpbWFnZSBmcm9tIHRodW1ib3IgaW1hZ2UgcmVzaXplIHNlcnZpY2VcbiAgQElucHV0KCkgdGh1bWJvcml6ZSA9IHRydWU7XG5cbiAgcHJpdmF0ZSBjb250YWluZXJFbGVtZW50VHlwZTogJ0lNRycgfCAnTk9ULUlNRyc7XG5cbiAgcHJpdmF0ZSBpbm5lckltYWdlOiBTeXN0ZW1GaWxlS2V5IHwgc3RyaW5nID0gVHJhbnNwYXJlbnRJbWFnZTtcblxuICBwcml2YXRlIGltYWdlUGF0aDogc3RyaW5nO1xuXG4gIHByaXZhdGUgZmluYWxJbWFnZVVybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy5kZXRlY3RDb250YWluZXJFbGVtZW50KCk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdENvbnRhaW5lckVsZW1lbnQoKSB7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50ID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnRUeXBlID0gdGhpcy5jb250YWluZXJFbGVtZW50LnRhZ05hbWUgPT09ICdJTUcnID8gJ0lNRycgOiAnTk9ULUlNRyc7XG4gIH1cblxuICBwcml2YXRlIGxvYWRJbWFnZSgpIHtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5pbm5lckltYWdlID09PSAnc3RyaW5nJykge1xuXG4gICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSB0aGlzLmlubmVySW1hZ2U7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmltYWdlUGF0aCA9IHRoaXMuZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKTtcblxuICAgICAgaWYgKHRoaXMuaW1hZ2VQYXRoKSB7XG5cbiAgICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gdGhpcy5nZXRGaW5hbFVybCgpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IEVycm9ySW1hZ2U7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMudHJ5VG9Mb2FkSW1hZ2UoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJJbWFnZVsnZmlsZUJhc2VQYXRoJ10gfHwgdW5kZWZpbmVkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmluYWxVcmwoKSB7XG5cbiAgICBpZiAodGhpcy50aHVtYm9yaXplKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFRodW1ib3JVcmwoKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFMzVXJsKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UzNVcmwoKSB7XG4gICAgcmV0dXJuIGAke1MzSG9zdH0vJHt0aGlzLmltYWdlUGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaHVtYm9yVXJsKCkge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmdldEltYWdlU2l6ZSh0aGlzLmRlY0ltYWdlU2l6ZSk7XG4gICAgY29uc3QgYXNwZWN0ID0gdGhpcy5nZXRBc3BlY3QoKTtcbiAgICBjb25zdCB0cmltID0gdGhpcy5nZXRUcmltKCk7XG4gICAgcmV0dXJuIGAke1RodW1ib3JTZXJ2ZXJIb3N0fS8ke3NpemV9JHthc3BlY3R9JHt0cmltfS8ke3RoaXMuaW1hZ2VQYXRofWA7XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlU2l6ZShkZWNJbWFnZVNpemU6IERlY0ltYWdlU2l6ZSA9IHt9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7ZGVjSW1hZ2VTaXplLndpZHRoIHx8IDB9eCR7ZGVjSW1hZ2VTaXplLmhlaWdodCB8fCAwfWA7XG4gIH1cblxuICBwcml2YXRlIGdldEFzcGVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5maXRJbiA/ICcvZml0LWluJyAgOiAnJztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJpbSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmltID8gJy90cmltJyA6ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlUb0xvYWRJbWFnZSgpIHtcbiAgICBjb25zdCBkb3dubG9hZGluZ0ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgZG93bmxvYWRpbmdJbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmNyZWF0ZUltYWdlKCk7XG4gICAgfTtcblxuICAgIGRvd25sb2FkaW5nSW1hZ2Uub25lcnJvciA9ICgpID0+IHtcbiAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IEVycm9ySW1hZ2U7XG4gICAgICB0aGlzLmNyZWF0ZUltYWdlKCk7XG4gICAgfTtcblxuICAgIGRvd25sb2FkaW5nSW1hZ2Uuc3JjID0gdGhpcy5maW5hbEltYWdlVXJsO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXJFbGVtZW50VHlwZSA9PT0gJ0lNRycpIHtcbiAgICAgIHRoaXMuc2V0SW1hZ2VlbGVtZW50U3JjKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXBwZW5kSW1hZ2VUb0JnKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRJbWFnZVRvQmcoKSB7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHRoaXMuZmluYWxJbWFnZVVybCArICcpJztcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAnbm8tcmVwZWF0JztcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnMTAwJSc7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RlYy1pbWFnZS1iZy1sb2FkaW5nJyk7XG4gIH1cblxuICBwcml2YXRlIHNldEltYWdlZWxlbWVudFNyYygpIHtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCB0aGlzLmZpbmFsSW1hZ2VVcmwpO1xuICB9XG5cbn1cblxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0ltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9pbWFnZS5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0ltYWdlRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0RlY0ltYWdlRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjSW1hZ2VTaXplLCBTeXN0ZW1GaWxlS2V5IH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS5tb2RlbHMnO1xuaW1wb3J0IHsgVGh1bWJvclNlcnZlckhvc3QgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UuZGlyZWN0aXZlLmNvbnN0YW50cyc7XG5cbmV4cG9ydCB0eXBlIFpvb21Nb2RlID0gJ2hvdmVyJyB8ICdjbGljaycgfCAndG9nZ2xlJyB8ICdob3Zlci1mcmVlemUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtaW1hZ2Utem9vbScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lclwiID5cbiAgPG5neC1pbWFnZS16b29tXG4gICAgW3RodW1iSW1hZ2VdPVwicmVzaXplZEltYWdlVXJsXCJcbiAgICBbZnVsbEltYWdlXT1cImZ1bGxJbWFnZVVybFwiXG4gICAgW3pvb21Nb2RlXT1cInpvb21Nb2RlXCJcbiAgICBbZW5hYmxlU2Nyb2xsWm9vbV09XCJlbmFibGVTY3JvbGxab29tXCJcbiAgICBbc2Nyb2xsU3RlcFNpemVdPVwic2Nyb2xsU3RlcFNpemVcIlxuICAgIFtlbmFibGVMZW5zXT1cImVuYWJsZUxlbnNcIlxuICAgIFtsZW5zV2lkdGhdPVwibGVuc1dpZHRoXCJcbiAgICBbbGVuc0hlaWdodF09XCJsZW5zSGVpZ2h0XCJcbiAgPjwvbmd4LWltYWdlLXpvb20+XG48L2Rpdj5cblxuYCxcbiAgc3R5bGVzOiBbYC5pbWFnZWhpZ2hsaWdodC1jb250YWluZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtjdXJzb3I6em9vbS1pbn1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZVpvb21Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZ1bGxJbWFnZVBhdGg6IGFueTtcblxuICBmdWxsSW1hZ2VVcmw6IGFueTtcblxuICByZXNpemVkSW1hZ2VVcmw6IGFueTtcblxuICBASW5wdXQoKSB6b29tTW9kZTogWm9vbU1vZGUgPSAnY2xpY2snO1xuXG4gIEBJbnB1dCgpIGVuYWJsZVNjcm9sbFpvb20gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIHNjcm9sbFN0ZXBTaXplID0gMC4xO1xuXG4gIEBJbnB1dCgpIGVuYWJsZUxlbnMgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGxlbnNXaWR0aCA9IDEwMDtcblxuICBASW5wdXQoKSBsZW5zSGVpZ2h0ID0gMTAwO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzeXN0ZW1GaWxlKHY6IFN5c3RlbUZpbGVLZXkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fc3lzdGVtRmlsZSkge1xuICAgICAgdGhpcy5fc3lzdGVtRmlsZSA9IHY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzeXN0ZW1GaWxlKCk6IFN5c3RlbUZpbGVLZXkge1xuICAgIHJldHVybiB0aGlzLl9zeXN0ZW1GaWxlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHNpemUodjogRGVjSW1hZ2VTaXplKSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX3RodW1iU2l6ZSA9IHY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaXplKCk6IERlY0ltYWdlU2l6ZSB7XG4gICAgcmV0dXJuIHRoaXMuX3RodW1iU2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3N5c3RlbUZpbGU6IFN5c3RlbUZpbGVLZXk7XG5cbiAgcHJpdmF0ZSBfdGh1bWJTaXplOiBEZWNJbWFnZVNpemU7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5zeXN0ZW1GaWxlICYmIHRoaXMuc2l6ZSkge1xuICAgICAgdGhpcy5zZXRGaW5hbEltYWdlVXJsKCk7XG4gICAgICB0aGlzLnNldE9yaWdpbmFsSW1hZ2VQYXRoKCk7XG4gICAgICB0aGlzLnNldFRodW1ib3JsVXJsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRGaW5hbEltYWdlVXJsKCkge1xuICAgIHRoaXMuZnVsbEltYWdlVXJsID0gdGhpcy5zeXN0ZW1GaWxlLmZpbGVCYXNlVXJsICsgJy4nICsgdGhpcy5zeXN0ZW1GaWxlLmV4dGVuc2lvbjtcbiAgICBjb25zb2xlLmxvZygnc2V0RmluYWxJbWFnZVVybCcsIHRoaXMuZnVsbEltYWdlVXJsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3JpZ2luYWxJbWFnZVBhdGgoKSB7XG4gICAgdGhpcy5mdWxsSW1hZ2VQYXRoID0gdGhpcy5leHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpO1xuICAgIGNvbnNvbGUubG9nKCdzZXRPcmlnaW5hbEltYWdlUGF0aCcsIHRoaXMuZnVsbEltYWdlUGF0aCk7XG4gIH1cblxuICBwcml2YXRlIHNldFRodW1ib3JsVXJsKCkge1xuICAgIHRoaXMucmVzaXplZEltYWdlVXJsID0gdGhpcy5nZXRUaHVtYm9yVXJsKCk7XG4gICAgY29uc29sZS5sb2coJ3NldFRodW1ib3JsVXJsJywgdGhpcy5yZXNpemVkSW1hZ2VVcmwpO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtRmlsZVsnZmlsZUJhc2VQYXRoJ10gfHwgdW5kZWZpbmVkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VTaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuc2l6ZS53aWR0aCB8fCAwfXgke3RoaXMuc2l6ZS5oZWlnaHQgfHwgMH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaHVtYm9yVXJsKCkge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmdldEltYWdlU2l6ZSgpO1xuICAgIHJldHVybiBgJHtUaHVtYm9yU2VydmVySG9zdH0vJHtzaXplfS8ke3RoaXMuZnVsbEltYWdlUGF0aH1gO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neEltYWdlWm9vbU1vZHVsZSB9IGZyb20gJ25neC1pbWFnZS16b29tJztcbmltcG9ydCB7IERlY0ltYWdlWm9vbUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLWltYWdlLXpvb20uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOZ3hJbWFnZVpvb21Nb2R1bGUuZm9yUm9vdCgpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0ltYWdlWm9vbUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjSW1hZ2Vab29tQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2Vab29tTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZ2FsbGVyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjSW1hZ2VNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxNb2R1bGUgfSBmcm9tICdAbmd1L2Nhcm91c2VsJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgJ2hhbW1lcmpzJztcbmltcG9ydCB7IERlY0ltYWdlWm9vbU1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLWltYWdlLXpvb20vZGVjLWltYWdlLXpvb20ubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBEZWNJbWFnZU1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBOZ3VDYXJvdXNlbE1vZHVsZSxcbiAgICBEZWNJbWFnZVpvb21Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjR2FsbGVyeUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjR2FsbGVyeUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dhbGxlcnlNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWljb24nLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImZvbnRcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ21hdCdcIj5cbiAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+e3tpY29ufX08L2k+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInZmFzJ1wiPlxuICAgIDxpIGNsYXNzPVwiZmEge3snZmEtJytpY29ufX1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gIDwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG5cbjxzcGFuICN0ZXh0IFtoaWRkZW5dPVwidHJ1ZVwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L3NwYW4+XG5gLFxuICBzdHlsZXM6IFtgLm1hdGVyaWFsLWljb25ze2NvbG9yOmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7ZGlzcGxheTppbmxpbmUtYmxvY2s7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgxNiUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDE2JSk7LXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ljb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBpY29uOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZm9udDogJ21hdCcgfCAnZmFzJztcblxuICBAVmlld0NoaWxkKCd0ZXh0JykgdGV4dEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmljb24gPSB0aGlzLnRleHRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG4gICAgfSwgMCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtaWNvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSwgTWF0SWNvblJlZ2lzdHJ5IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0ljb25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjSWNvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSWNvbk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWF0SWNvblJlZ2lzdHJ5OiBNYXRJY29uUmVnaXN0cnkpIHtcbiAgICB0aGlzLm1hdEljb25SZWdpc3RyeS5yZWdpc3RlckZvbnRDbGFzc0FsaWFzKCdmYXMnLCAnZmEnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGFiZWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3JIZXh9XCIgW25nQ2xhc3NdPVwiZGVjQ2xhc3NcIiBkZWNDb250cmFzdEZvbnRXaXRoQmc+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGRpdnttYXJnaW46NHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6N3B4IDEycHg7Ym9yZGVyLXJhZGl1czoyNHB4O2FsaWduLWl0ZW1zOmNlbnRlcjtjdXJzb3I6ZGVmYXVsdH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMYWJlbENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbG9ySGV4OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRlY0NsYXNzOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ290cmFzdCBjb25maWd1cmF0aW9uXG4gKlxuICogVXNlZCB0byBkZWZpbmUgc29tZSBjdXN0b20gY29uZmlndXJhdGlvbiBhcyBjb2xvcnMgYW5kIGJyZWFrcG9pbnRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNDb250cmFzdEZvbnRXaXRoQmdEaXJlY3RpdmVDb25maWcge1xuICBsdW1hQnJlYWtQb2ludDogc3RyaW5nO1xuICBsaWdodENvbG9yOiBzdHJpbmc7XG4gIGRhcmtDb2xvcjogc3RyaW5nO1xufVxuXG5jb25zdCBERUZBVUxUX0xVTUFfQlJFQUtQT0lOVCA9IDIwMDtcblxuLypcbiogQ29udHJhc3QgRm9udCBXaXRoIEJhY2tncm91bmQgRGlyZWN0aXZlXG4qXG4qIENvbnRyYXN0cyB0aGUgdGV4dCBjb2xvciB3aXRoIHRoZSBiYWNrZ3JvdW5kLWNvbG9yIHRvIGF2b2lkIHdoaXRlIGNvbG9yIGluIGxpZ2ggYmFja2dyb3VuZCBhbmQgYmxhY2sgY29sb3IgaW4gZGFya2VuIG9uZXMuXG4qIEl0IGNhbiBiZSB1c2VkIGFzIGF0dHJpYnV0ZSBpbiBhbnkgZWxlbWVudCB3aXRoIG9yIHdpdGhvdXQgcGFzc2luZyBjdXN0b20gY29uZmlndXJhdGlvblxuKiBFeGFtcGxlIHdpdGhvdXQgY3VzdG9tIGNvbmZpZ3VyYXRpb246IDxkaXYgZGVjQ29udHJhc3RGb250V2l0aEJnXCI+PC9kaXY+XG4qIEV4YW1wbGUgd2l0aCBjdXN0b20gY29uZmlndXJhdGlvbjogPGRpdiBbZGVjQ29udHJhc3RGb250V2l0aEJnXT1cIntkYXJrQ29sb3I6ICdyZWQnfVwiPjwvZGl2PlxuKlxuKiBDb25maWd1cmF0aW9uIHBhcmFtczpcbiogbHVtYUJyZWFrUG9pbnQ6IHRoZSBwb2ludCB3aGVyZSB3ZSBzaG91bGQgY2hhbmdlIHRoZSBmb250IGNvbG9yLiBUaGlzIGlzIHRoZSBsaWd0aCBmZWVsaW5nIGJyZWFrcG9pbnQuXG4qIGxpZ2h0Q29sb3I6IHRoZSB0ZXh0IGNvbG9yIHVzZWQgaW4gZGFyayBiYWNrZ3JvdW5kc1xuKiBkYXJrQ29sb3I6IHRoZSB0ZXh0IGNvbG9yIHVzZWQgaW4gbGlndGggYmFja2dyb3VuZHNcbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb1JnYk5ldyhoZXgpIHtcblxuICBjb25zdCByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgcmV0dXJuIHJlc3VsdCA/IHtcbiAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICBiOiBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuICB9IDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YW5kYXJkaXplX2NvbG9yKGJnQ29sb3IpIHtcblxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICBjdHguZmlsbFN0eWxlID0gYmdDb2xvcjtcblxuICByZXR1cm4gY3R4LmZpbGxTdHlsZTtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGVjQ29udHJhc3RGb250V2l0aEJnXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlIGltcGxlbWVudHMgRG9DaGVjayB7XG5cbiAgcHJpdmF0ZSBjb25maWc7XG5cbiAgcHJpdmF0ZSBiZ0NvbG9yO1xuXG4gIEBJbnB1dCgpIHNldCBkZWNDb250cmFzdEZvbnRXaXRoQmcoY29uZmlnOiBEZWNDb250cmFzdEZvbnRXaXRoQmdEaXJlY3RpdmVDb25maWcpIHtcblxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgdGhpcy5kb0RlY0NvbnRyYXN0Rm9udFdpdGhCZygpO1xuXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG5cbiAgICB0aGlzLmJnQ29sb3IgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuXG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG5cbiAgICBjb25zdCBiZ0NvbG9yID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcblxuICAgIGlmIChiZ0NvbG9yICE9PSB0aGlzLmJnQ29sb3IpIHtcblxuICAgICAgdGhpcy5iZ0NvbG9yID0gYmdDb2xvcjtcblxuICAgICAgdGhpcy5kb0RlY0NvbnRyYXN0Rm9udFdpdGhCZygpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGRvRGVjQ29udHJhc3RGb250V2l0aEJnKCkge1xuXG4gICAgY29uc3QgbHVtYUJyZWFrUG9pbnQgPSAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcubHVtYUJyZWFrUG9pbnQpID8gdGhpcy5jb25maWcubHVtYUJyZWFrUG9pbnQgOiBERUZBVUxUX0xVTUFfQlJFQUtQT0lOVDtcblxuICAgIGNvbnN0IGhleGFCZ0NvbG9yID0gc3RhbmRhcmRpemVfY29sb3IodGhpcy5iZ0NvbG9yKTtcblxuICAgIGNvbnN0IHJnYkNvbG9yID0gaGV4VG9SZ2JOZXcoaGV4YUJnQ29sb3IpO1xuXG4gICAgY29uc3QgbHVtYSA9IDAuMjEyNiAqIHJnYkNvbG9yLnIgKyAwLjcxNTIgKiByZ2JDb2xvci5nICsgMC4wNzIyICogcmdiQ29sb3IuYjsgLy8gcGVyIElUVS1SIEJULjcwOVxuXG4gICAgaWYgKGx1bWEgPCBsdW1hQnJlYWtQb2ludCkge1xuXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY29sb3IgPSAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcubGlnaHRDb2xvcikgPyB0aGlzLmNvbmZpZy5saWdodENvbG9yIDogJ3JnYmEoMjU1LDI1NSwyNTUsMSknO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmNvbG9yID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmRhcmtDb2xvcikgPyB0aGlzLmNvbmZpZy5kYXJrQ29sb3IgOiAnIzIzMmUzOCc7XG5cbiAgICB9XG5cbiAgfVxufVxuXG5cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlIH0gZnJvbSAnLi9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbnRyYXN0Rm9udFdpdGhCZ01vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNMYWJlbENvbXBvbmVudCB9IGZyb20gJy4vZGVjLWxhYmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNDb250cmFzdEZvbnRXaXRoQmdNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvY29sb3IvY29udHJhc3QtZm9udC13aXRoLWJnL2RlYy1jb250cmFzdC1mb250LXdpdGgtYmcubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRGVjQ29udHJhc3RGb250V2l0aEJnTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNMYWJlbENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjTGFiZWxDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMYWJlbE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpbHRlcnMsIEZpbHRlckdyb3VwcyB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ291bnRSZXBvcnQge1xuXG4gIGNvdW50OiBudW1iZXI7XG4gIGNoaWxkcmVuPzogQ291bnRSZXBvcnRbXTtcblxufVxuXG4vKlxuICAqIERlY0xpc3RQcmVTZWFyY2hcbiAgKlxuICAqIFVzZWQgYXMgbWlkZGxld2FyZSB0byBtYW5pcHVsYXRlIHRoZSBmaWx0ZXIgYmVmb3JlIGZldGNobmcgdGhlIGRhdGFcbiAgKi9cbmV4cG9ydCB0eXBlIERlY0xpc3RQcmVTZWFyY2ggPSAoZmlsdGVyR3JvdXBzOiBGaWx0ZXJHcm91cHMpID0+IEZpbHRlckdyb3VwcztcblxuXG4vKlxuICAqIERlY0xpc3RGZXRjaE1ldGhvZFxuICAqXG4gICogVXNlZCB0byBmZXRjaCBkYXRhIGZyb20gcmVtb3RlIEFQSVxuICAqL1xuZXhwb3J0IHR5cGUgRGVjTGlzdEZldGNoTWV0aG9kID0gKGVuZHBvaW50OiBzdHJpbmcsIGZpbHRlcjogYW55KSA9PiBPYnNlcnZhYmxlPERlY0xpc3RGZXRjaE1ldGhvZFJlc3BvbnNlPjtcblxuLypcbiAgKiBMaXN0VHlwZVxuICAqXG4gICogTGlzdCB0eXBlc1xuICAqL1xuZXhwb3J0IHR5cGUgRGVjTGlzdFR5cGUgPSAndGFibGUnIHwgJ2dyaWQnO1xuXG4vKlxuICAqIERlY0xpc3RGZXRjaE1ldGhvZFJlc3BvbnNlXG4gICpcbiAgKiBSZXNwb25zZSByZWNlaXZlZCBieSBmZXRjaCBEZWNMaXN0RmV0Y2hNZXRob2RcbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjTGlzdEZldGNoTWV0aG9kUmVzcG9uc2Uge1xuICByZXN1bHQ6IHtcbiAgICByb3dzOiBhbnlbXTtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9O1xufVxuXG4vKlxuICAqIERlY0xpc3RGaWx0ZXJcbiAgKlxuICAqIFN0cnVjdHVyZSBvZiB0YWJzIGZpbHRlcnNcbiAgKi9cbmV4cG9ydCBjbGFzcyBEZWNMaXN0RmlsdGVyIHtcbiAgY2hpbGRyZW4/OiBEZWNMaXN0RmlsdGVyW107XG4gIGNvdW50Pzogc3RyaW5nO1xuICBkZWZhdWx0PzogYm9vbGVhbjtcbiAgZmlsdGVyczogRmlsdGVycztcbiAgaGlkZT86IGJvb2xlYW47XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGNvbG9yOiBzdHJpbmc7XG4gIGxpc3RNb2RlPzogRGVjTGlzdFR5cGU7XG4gIHBlcm1pc3Npb25zPzogc3RyaW5nW107XG4gIHVpZD86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkgPSB7fSkge1xuICAgIHRoaXMuY2hpbGRyZW4gPSBkYXRhLmNoaWxkcmVuID8gZGF0YS5jaGlsZHJlbi5tYXAoZmlsdGVyID0+IG5ldyBEZWNMaXN0RmlsdGVyKGZpbHRlcikpIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuY291bnQgPSBkYXRhLmNvdW50IHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRlZmF1bHQgPSBkYXRhLmRlZmF1bHQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuZmlsdGVycyA9IGRhdGEuZmlsdGVycyB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5oaWRlID0gZGF0YS5oaWRlIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxhYmVsID0gZGF0YS5sYWJlbCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3IgfHwgJyM2RTc1N0EnO1xuICAgIHRoaXMubGlzdE1vZGUgPSBkYXRhLmxpc3RNb2RlIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBlcm1pc3Npb25zID0gZGF0YS5wZXJtaXNzaW9ucyB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy51aWQgPSBkYXRhLnVpZCB8fCBkYXRhLmxhYmVsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNMaXN0RmV0Y2hNZXRob2QsIERlY0xpc3RGaWx0ZXIgfSBmcm9tICcuLy4uLy4uL2xpc3QubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtdGFicy1maWx0ZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJsaXN0LXRhYnMtZmlsdGVyLXdyYXBwZXJcIiAqbmdJZj1cInZpc2libGVGaWx0ZXJzIGFzIGZpbHRlcnNcIj5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwiZGVjLXRhYi1oZWFkZXJcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCB0YWJGaWx0ZXIgb2YgZmlsdGVyc1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgKmRlY1Blcm1pc3Npb249XCJ0YWJGaWx0ZXIucGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICBtYXQtYnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzPVwidXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFRhYih0YWJGaWx0ZXIudWlkKVwiXG4gICAgICAgICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJzZWxlY3RlZFRhYlVpZCA9PSAodGFiRmlsdGVyLnVpZClcIj5cbiAgICAgICAgPHNwYW4+e3sgJ2xhYmVsLicgKyB0YWJGaWx0ZXIubGFiZWwgfCB0cmFuc2xhdGUgfCB1cHBlcmNhc2UgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnRSZXBvcnRcIiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2Utc21hbGxcIj57eyBjb3VudFJlcG9ydFt0YWJGaWx0ZXIudWlkXS5jb3VudCB9fTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXJ7bWFyZ2luLXRvcDo4cHh9Lmxpc3QtdGFicy1maWx0ZXItd3JhcHBlciAuZGVjLXRhYi1oZWFkZXIuYm90dG9te2JvcmRlci1ib3R0b206MH0ubGlzdC10YWJzLWZpbHRlci13cmFwcGVyIC5kZWMtdGFiLWhlYWRlciAuYmFkZ2V7bWFyZ2luLWxlZnQ6OHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyIC5iYWRnZS5iYWRnZS1waWxse3BhZGRpbmc6OHB4O2ZvbnQtc2l6ZTpzbWFsbDtib3JkZXItcmFkaXVzOjI0cHh9Lmxpc3QtdGFicy1maWx0ZXItd3JhcHBlciAuZGVjLXRhYi1oZWFkZXIgLmJhZGdlLmJhZGdlLXBpbGwuYmFkZ2Utc21hbGx7Zm9udC1zaXplOngtc21hbGw7cGFkZGluZzo0cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIGN1c3RvbUZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2Q7XG5cbiAgbmFtZTogc3RyaW5nOyAvLyBsaXN0IHVuaXF1ZSBuYW1lIHRvIGlkZW50aWZ5IHRoZSB0YWIgaW4gdXJsXG5cbiAgc2VsZWN0ZWRUYWJVaWQ6IHN0cmluZztcblxuICBzZXJ2aWNlOiBhbnk7XG5cbiAgQElucHV0KCkgY291bnRSZXBvcnQ6IGFueTtcblxuICBASW5wdXQoKVxuICBzZXQgZmlsdGVycyh2OiBEZWNMaXN0RmlsdGVyW10pIHtcbiAgICBpZiAodGhpcy5fZmlsdGVycyAhPT0gdikge1xuICAgICAgdGhpcy5fZmlsdGVycyA9IHYgPyB2Lm1hcChmaWx0ZXIgPT4gbmV3IERlY0xpc3RGaWx0ZXIoZmlsdGVyKSkgOiBbXTtcbiAgICB9XG4gIH1cblxuICBnZXQgZmlsdGVycygpOiBEZWNMaXN0RmlsdGVyW10ge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWZhdWx0VGFiOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfZmlsdGVyczogRGVjTGlzdEZpbHRlcltdID0gW107XG5cbiAgcHJpdmF0ZSB3YXRoVXJsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQE91dHB1dCgnc2VhcmNoJykgc2VhcmNoOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ3RhYkNoYW5nZScpIHRhYkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkgeyB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCk7XG4gIH1cblxuICBkb0ZpcnN0TG9hZCA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gYXZvaWRzIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3Igc2VsZWN0aW5nIHRoZSBhY3RpdmUgdGFiXG4gICAgICB0aGlzLndhdGNoVGFiSW5VcmxRdWVyeSgpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgZ2V0Q291bnRPZih1aWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNvdW50UmVwb3J0ICYmIHRoaXMuY291bnRSZXBvcnRbdWlkXSA+PSAwID8gdGhpcy5jb3VudFJlcG9ydFt1aWRdIDogJz8nO1xuICB9XG5cbiAgc2VsZWN0VGFiKHRhYikge1xuICAgIHRoaXMuc2V0VGFiSW5VcmxRdWVyeSh0YWIpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkVGFiKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVycyA/IHRoaXMuZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIudWlkID09PSB0aGlzLnNlbGVjdGVkVGFiVWlkKSA6IHVuZGVmaW5lZDtcblxuICB9XG5cbiAgZ2V0IHZpc2libGVGaWx0ZXJzKCkge1xuICAgIGNvbnN0IHZpc2libGUgPSB0aGlzLmZpbHRlcnMgPyB0aGlzLmZpbHRlcnMuZmlsdGVyKChmaWx0ZXIpID0+ICFmaWx0ZXIuaGlkZSkgOiBbXTtcbiAgICByZXR1cm4gKHZpc2libGUgJiYgdmlzaWJsZS5sZW5ndGggPiAxKSA/IHZpc2libGUgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdERlZmF1bHRUYWIoKSB7XG5cbiAgICBjb25zdCBoYXNEZWZhdWx0OiBhbnkgPSB0aGlzLmZpbHRlcnMuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0uZGVmYXVsdDtcbiAgICB9KTtcblxuICAgIGlmIChoYXNEZWZhdWx0KSB7XG5cbiAgICAgIHRoaXMuZGVmYXVsdFRhYiA9IGhhc0RlZmF1bHQudWlkO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5kZWZhdWx0VGFiID0gdGhpcy5maWx0ZXJzWzBdLnVpZDtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBvblNlYXJjaCA9ICh0YWIsIHJlY291bnQgPSBmYWxzZSkgPT4ge1xuXG4gICAgdGhpcy5zZWxlY3RlZFRhYlVpZCA9IHRhYi51aWQ7XG5cbiAgICBpZiAodGhpcy5maWx0ZXJzICYmIHRhYikge1xuXG4gICAgICBjb25zdCBldmVudCA9IHtcbiAgICAgICAgZmlsdGVyczogdGFiLmZpbHRlcnMsXG4gICAgICAgIGNoaWxkcmVuOiB0YWIuY2hpbGRyZW4sXG4gICAgICAgIHJlY291bnQ6IHJlY291bnQsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnNlYXJjaC5lbWl0KGV2ZW50KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBjb21wb25lbnRUYWJOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnLXRhYic7XG4gIH1cblxuICBwcml2YXRlIHNldFRhYkluVXJsUXVlcnkodGFiKSB7XG4gICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICAgIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXSA9IHRhYjtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4nXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLCBxdWVyeVBhcmFtczogcXVlcnlQYXJhbXMsIHJlcGxhY2VVcmw6IHRydWUgfSk7XG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFiSW5VcmxRdWVyeSgpIHtcblxuICAgIHRoaXMuZGV0ZWN0RGVmYXVsdFRhYigpO1xuXG4gICAgdGhpcy53YXRoVXJsU3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtc1xuICAgICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG5cbiAgICAgICAgY29uc3QgdGFiID0gcGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXSB8fCB0aGlzLmRlZmF1bHRUYWI7XG5cbiAgICAgICAgaWYgKHRhYiAhPT0gdGhpcy5zZWxlY3RlZFRhYlVpZCkge1xuXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUYWIgPSB0aGlzLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnVpZCA9PT0gdGFiKTtcblxuICAgICAgICAgIHRoaXMub25TZWFyY2goc2VsZWN0ZWRUYWIpO1xuXG4gICAgICAgICAgdGhpcy50YWJDaGFuZ2UuZW1pdCh0YWIpO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpIHtcbiAgICBpZiAodGhpcy53YXRoVXJsU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLndhdGhVcmxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtYWR2YW5jZWQtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG5cbiAgPGRpdiBmeEZsZXg+XG5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVJlZlwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Zvcm06IGZvcm19XCJcbiAgICA+PC9uZy1jb250YWluZXI+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXg+XG5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBlbmRcIiBmeExheW91dEdhcD1cIjhweFwiPlxuXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwic3VibWl0KClcIj57eyAnbGFiZWwuc2VhcmNoJyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uIChjbGljayk9XCJyZXNldCgpXCI+e3sgJ2xhYmVsLnJlc2V0JyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuXG5cblxuXG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmb3JtOiBhbnkgPSB7fTtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuICBvblNlYXJjaCA9ICgpID0+IHt9O1xuXG4gIG9uQ2xlYXIgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5vbkNsZWFyKCk7XG4gIH1cblxuICBzdWJtaXQoKSB7XG4gICAgdGhpcy5vblNlYXJjaCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJzLWZpbHRlci9saXN0LXRhYnMtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0xpc3RQcmVTZWFyY2gsIERlY0xpc3RGaWx0ZXIgfSBmcm9tICcuLy4uL2xpc3QubW9kZWxzJztcbmltcG9ydCB7IEZpbHRlckdyb3VwcyB9IGZyb20gJy4vLi4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgUGxhdGZvcm1Mb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWZpbHRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImxpc3QtZmlsdGVyLXdyYXBwZXJcIj5cbiAgPGRpdiBmeExheW91dD1cInJvdyB3cmFwXCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgPCEtLVxuICAgICAgQ291bnRlclxuICAgIC0tPlxuICAgIDxkaXYgZnhGbGV4PVwiMzBcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb3VudCA+PSAwICYmICFsb2FkaW5nXCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnQgPT09IDBcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPnt7IFwibGFiZWwucmVjb3JkLW5vdC1mb3VuZFwiIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID09PSAxXCIgY2xhc3M9XCJkZWMtYm9keS1zdHJvbmdcIj57eyBcImxhYmVsLm9uZS1yZWNvcmQtZm91bmRcIiB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA+IDFcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPiB7eyBcImxhYmVsLnJlY29yZHMtZm91bmRcIiB8IHRyYW5zbGF0ZTp7Y291bnQ6Y291bnR9IH19PC9zcGFuPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGZ4RmxleD1cIjcwXCIgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCIgY2xhc3M9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXY+XG5cbiAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgY2xhc3M9XCJpbnB1dC1zZWFyY2gtY29udGFpbmVyXCIgW2NsYXNzLmFjdGl2ZV09XCJzaG93U2VhcmNoSW5wdXRcIj5cbiAgICAgICAgICAgIDwhLS0gZ2FwIC0tPlxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLXRvb2dsZS1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIChjbGljayk9XCJ0b2dnbGVTZWFyY2hJbnB1dCgpXCI+c2VhcmNoPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxmb3JtIGZ4RmxleCByb2xlPVwiZm9ybVwiIChzdWJtaXQpPVwib25TZWFyY2goKVwiPlxuICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIxNnB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGNsYXNzPVwiaW5wdXQtc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYXItaFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgZnhGbGV4ICNpbnB1dFNlYXJjaCBuYW1lPVwic2VhcmNoXCIgWyhuZ01vZGVsKV09XCJmaWx0ZXJGb3JtLnNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJhZHZhbmNlZEZpbHRlckNvbXBvbmVudFwiIGNsYXNzPVwiY2xpY2tcIiAoY2xpY2spPVwidG9nZ2xlQWR2YW5jZWRGaWx0ZXIoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWMtc21hbGwgYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoXCI+e3tcImxhYmVsLmFkdmFuY2VkLW9wdGlvbnNcIiB8IHRyYW5zbGF0ZX19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwhLS1nYXAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tUmVmcmVzaCBzZWFyY2gtLT5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWluZm8gbWFyZ2luLWljb25cIiAoY2xpY2spPVwib25TZWFyY2goKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPnJlZnJlc2g8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS1DbGVhciBmaWx0ZXJzLS0+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiAqbmdJZj1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGhcIj5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1pbmZvXCIgKGNsaWNrKT1cIm9uQ2xlYXIoKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmNsZWFyPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiAqbmdJZj1cInNob3dJbmZvQnV0dG9uXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4taW5mb1wiIChjbGljayk9XCJvbkNsaWNrSW5mbygpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+aW5mb19vdXRsaW5lPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuXG4gIDxkaXYgKm5nSWY9XCJzaG93QWR2YW5jZWRGaWx0ZXJcIj5cblxuICAgIDxtYXQtY2FyZCBjbGFzcz1cImFkdmFuY2VkLXNlYXJjaC1jb250YWluZXJcIiBbbmdDbGFzc109XCJ7J3JlbW92ZS1idXR0b24tZW5hYmxlZCc6IGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGh9XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuXG4gICAgICAgIDxhIChjbGljayk9XCJjbG9zZUZpbHRlcnMoKVwiIGNsYXNzPVwiYnRuLWNsb3NlLWFkdmFuY2VkLXNlYXJjaFwiPlxuXG4gICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNsb3NlPC9pPlxuXG4gICAgICAgIDwvYT5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXY+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtYWR2YW5jZWQtZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvbWF0LWNhcmQ+XG5cbiAgPC9kaXY+XG5cbiAgPGRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lXG4gICAgKm5nSWY9XCJmaWx0ZXJHcm91cHNXaXRob3V0VGFicz8ubGVuZ3RoXCJcbiAgICBbZmlsdGVyR3JvdXBzXT1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzXCJcbiAgICAocmVtb3ZlKT1cInJlbW92ZURlY0ZpbHRlckdyb3VwKCRldmVudClcIlxuICAgIChlZGl0KT1cImVkaXREZWNGaWx0ZXJHcm91cCgkZXZlbnQpXCI+PC9kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZT5cblxuICA8ZGVjLWxpc3QtdGFicy1maWx0ZXIgW2ZpbHRlcnNdPVwiZmlsdGVyc1wiIFtjb3VudFJlcG9ydF09XCJjb3VudFJlcG9ydFwiPjwvZGVjLWxpc3QtdGFicy1maWx0ZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubGlzdC1maWx0ZXItd3JhcHBlcnttYXJnaW46MCAwIDE2cHg7cG9zaXRpb246cmVsYXRpdmV9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLm1hdC1pY29ue2NvbG9yOiM5OTl9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLnNlYXJjaC10ZXJtLWlucHV0e3dpZHRoOjUwMHB4O21hcmdpbi1yaWdodDo4cHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmlubGluZS1mb3Jte2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo3NHB4O3otaW5kZXg6MTtyaWdodDozMHB4O3dpZHRoOjU1MnB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyLnJlbW92ZS1idXR0b24tZW5hYmxlZHtyaWdodDo2MnB4O3dpZHRoOjU1MXB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyIC5idG4tY2xvc2UtYWR2YW5jZWQtc2VhcmNoe2N1cnNvcjpwb2ludGVyfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVye3RyYW5zaXRpb246YWxsIC4zcyBlYXNlO292ZXJmbG93OmhpZGRlbjt3aWR0aDo0MHB4O2hlaWdodDo1MHB4fS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyLmFjdGl2ZXtiYWNrZ3JvdW5kOiNmOGY4ZmE7Y29sb3I6Izk5OTt3aWR0aDo2MDBweH0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lci5hY3RpdmUgLmJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaHtkaXNwbGF5OmlubGluZX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoe3dpZHRoOjEwMCV9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaCBpbnB1dHtmb250OmluaGVyaXQ7YmFja2dyb3VuZDowIDA7Y29sb3I6Y3VycmVudENvbG9yO2JvcmRlcjpub25lO291dGxpbmU6MDtwYWRkaW5nOjA7d2lkdGg6MTAwJTt2ZXJ0aWNhbC1hbGlnbjpib3R0b219LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaHtkaXNwbGF5Om5vbmV9LnNlYXJjaC1jb250YWluZXIgLmJ0bi1jbGVhci1zZWFyY2h7cGFkZGluZy1yaWdodDoxNXB4O2N1cnNvcjpwb2ludGVyO2NvbG9yOiM5OTk7d2lkdGg6OTBweH0uc2VhcmNoLWNvbnRhaW5lciAuYnRuLWluZm8sLnNlYXJjaC1jb250YWluZXIgLmJ0bi10b29nbGUtc2VhcmNoe2ZvbnQtc2l6ZToyMXB4O2N1cnNvcjpwb2ludGVyO2hlaWdodDoyMXB4O2NvbG9yOiM5OTl9LnNlYXJjaC1jb250YWluZXIgLmJhci1oe2JvcmRlci1yaWdodDoycHggc29saWQgI2QwZDBkMDtoZWlnaHQ6MjFweDttYXJnaW46YXV0byAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgY291bnQ6IG51bWJlcjtcblxuICBjb3VudFJlcG9ydDtcblxuICBzaG93U2VhcmNoSW5wdXQ6IGJvb2xlYW47XG5cbiAgc2hvd0FkdmFuY2VkRmlsdGVyOiBib29sZWFuO1xuXG4gIGZpbHRlckZvcm06IGFueSA9IHtcbiAgICBzZWFyY2g6IHVuZGVmaW5lZFxuICB9O1xuXG4gIGZpbHRlckdyb3VwczogRmlsdGVyR3JvdXBzO1xuXG4gIGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzOiBGaWx0ZXJHcm91cHM7XG5cbiAgY3VycmVudFN0YXR1c0ZpbHRlcmVkOiBzdHJpbmc7XG5cbiAgdGFic0ZpbHRlcjogYW55O1xuXG4gIGVkaXRpb25Hcm91cEluZGV4OiBudW1iZXI7XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGxvYWRpbmc6IGJvb2xlYW47XG5cbiAgaXNJdEZpcnN0TG9hZCA9IHRydWU7XG5cbiAgZmlsdGVyTW9kZTogJ3RhYnMnIHwgJ2NvbGxhcHNlJztcblxuICBjaGlsZHJlbkZpbHRlcnM7XG5cbiAgLypcbiAgICogY2xpY2thYmxlQ29udGFpbmVyQ2xhc3NcbiAgICpcbiAgICogV2hlcmUgdGhlIGNsaWNrIHdhdGNoZXIgc2hvdWxkIGJlIGxpc3RlbmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBjbGlja2FibGVDb250YWluZXJDbGFzcyA9ICdsaXN0LWZpbHRlci13cmFwcGVyJztcblxuICBwcml2YXRlIGlubmVyRGVjRmlsdGVyR3JvdXBzOiBhbnlbXTtcblxuICBwcml2YXRlIGN1cnJlbnRVcmxFbmNvZGVkRmlsdGVyOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSB0YWJzRmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSB3YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgX2ZpbHRlcnM6IERlY0xpc3RGaWx0ZXJbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2xvYWRDb3VudFJlcG9ydDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBwcmVTZWFyY2g6IERlY0xpc3RQcmVTZWFyY2g7XG5cbiAgQElucHV0KCkgc2hvd0luZm9CdXR0b247XG5cbiAgQElucHV0KCkgaGFzUGVyc2lzdGVuY2UgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmaWx0ZXJzKHY6IERlY0xpc3RGaWx0ZXJbXSkge1xuXG4gICAgaWYgKHRoaXMuX2ZpbHRlcnMgIT09IHYpIHtcblxuICAgICAgdGhpcy5fZmlsdGVycyA9IHYubWFwKGZpbHRlciA9PiBuZXcgRGVjTGlzdEZpbHRlcihmaWx0ZXIpKTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGxvYWRDb3VudFJlcG9ydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbG9hZENvdW50UmVwb3J0O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGxvYWRDb3VudFJlcG9ydCh2OiBib29sZWFuKSB7XG4gICAgaWYgKHYgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9sb2FkQ291bnRSZXBvcnQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCBmaWx0ZXJzKCk6IERlY0xpc3RGaWx0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcnM7XG4gIH1cblxuICBAT3V0cHV0KCkgc2VhcmNoOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0U2VhcmNoJykgaW5wdXRTZWFyY2g7XG5cbiAgQFZpZXdDaGlsZChEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCkgdGFic0ZpbHRlckNvbXBvbmVudDogRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQpIGFkdmFuY2VkRmlsdGVyQ29tcG9uZW50OiBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybUxvY2F0aW9uOiBQbGF0Zm9ybUxvY2F0aW9uLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhdGNoVGFic0ZpbHRlcigpO1xuICAgIHRoaXMud2F0Y2hDbGljaygpO1xuICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXIoKTtcbiAgICB0aGlzLmNvbmZpZ3VyZUFkdmFuY2VkRmlsdGVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ0NsaWNrKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJzRmlsdGVyKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdVcmxGaWx0ZXIoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlYXJjaElucHV0KCkge1xuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gIXRoaXMuc2hvd1NlYXJjaElucHV0O1xuICAgIGlmICghdGhpcy5zaG93U2VhcmNoSW5wdXQpIHtcbiAgICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0U2VhcmNoLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0sIDE4MCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQWR2YW5jZWRGaWx0ZXIoJGV2ZW50KSB7XG5cbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9ICF0aGlzLnNob3dBZHZhbmNlZEZpbHRlcjtcblxuICB9XG5cbiAgb25TZWFyY2ggPSAoYXBwZW5kQ3VycmVudEZvcm0gPSB0cnVlKSA9PiB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXJGb3JtICYmIGFwcGVuZEN1cnJlbnRGb3JtKSB7XG5cbiAgICAgIGNvbnN0IG5ld0RlY0ZpbHRlckdyb3VwID0ge1xuXG4gICAgICAgIGZpbHRlcnM6IFtdXG5cbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybSkuZm9yRWFjaChrZXkgPT4ge1xuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlckZvcm1ba2V5XSkge1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyID0geyBwcm9wZXJ0eToga2V5LCB2YWx1ZTogdGhpcy5maWx0ZXJGb3JtW2tleV0gfTtcblxuICAgICAgICAgIG5ld0RlY0ZpbHRlckdyb3VwLmZpbHRlcnMucHVzaChmaWx0ZXIpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICB9KTtcblxuICAgICAgaWYgKG5ld0RlY0ZpbHRlckdyb3VwLmZpbHRlcnMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIGlmICh0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzKSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5lZGl0aW9uR3JvdXBJbmRleCA+PSAwKSB7XG5cbiAgICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHNbdGhpcy5lZGl0aW9uR3JvdXBJbmRleF0gPSBuZXdEZWNGaWx0ZXJHcm91cDtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMucHVzaChuZXdEZWNGaWx0ZXJHcm91cCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSBbbmV3RGVjRmlsdGVyR3JvdXBdO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgdGhpcy5yZWFjYWxjdWxhdGVBbmRFbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwcyh0cnVlKTtcblxuICB9XG5cbiAgb25DbGVhcigpIHtcblxuICAgIHRoaXMuY2xvc2VGaWx0ZXJzKCk7XG5cbiAgICB0aGlzLmZpbHRlckdyb3VwcyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgIHRoaXMub25TZWFyY2goKTtcblxuICB9XG5cbiAgcmVtb3ZlRGVjRmlsdGVyR3JvdXAoZ3JvdXBJbmRleCkge1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlckdyb3Vwcy5maWx0ZXIoKGdyb3VwLCBpbmRleCkgPT4gaW5kZXggIT09IGdyb3VwSW5kZXgpO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMuZmlsdGVyKChncm91cCwgaW5kZXgpID0+IGluZGV4ICE9PSBncm91cEluZGV4KTtcblxuICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLmZpbHRlcigoZ3JvdXAsIGluZGV4KSA9PiBpbmRleCAhPT0gZ3JvdXBJbmRleCk7XG5cbiAgICB0aGlzLm9uU2VhcmNoKHRydWUpO1xuXG4gIH1cblxuICBlZGl0RGVjRmlsdGVyR3JvdXAoZ3JvdXBJbmRleCkge1xuXG4gICAgdGhpcy5lZGl0aW9uR3JvdXBJbmRleCA9IGdyb3VwSW5kZXg7XG5cbiAgICBjb25zdCB0b0VkaXREZWNGaWx0ZXJHcm91cCA9IHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnNbZ3JvdXBJbmRleF07XG5cbiAgICBpZiAodG9FZGl0RGVjRmlsdGVyR3JvdXAgJiYgdG9FZGl0RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHRoaXMucmVsb2FkRm9ybVdpdGhHaXZlbkRlY0ZpbHRlckdyb3VwZSh0b0VkaXREZWNGaWx0ZXJHcm91cC5maWx0ZXJzKTtcblxuICAgIH1cblxuICB9XG5cbiAgY2xlYXJGaWx0ZXJGb3JtID0gKCkgPT4ge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyRm9ybSkge1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckZvcm0pLmZvckVhY2goa2V5ID0+IHtcblxuICAgICAgICB0aGlzLmZpbHRlckZvcm1ba2V5XSA9IHVuZGVmaW5lZDtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgb25DbGlja0luZm8oKSB7XG4gICAgY29uc29sZS5sb2coJ29uIGNsaWNrIGluZm8uIE5vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgLypcbiAgICogYXBwZW5kVG9DdXJyZW50RmlsdGVyc1xuICAgKlxuICAgKiBBcHBlbmQgYSBmaWx0ZXIgdG8gdGhlIGN1cnJlbnQgZmlsdGVyIGdyb3Vwc1xuICAgKi9cbiAgYXBwZW5kVG9DdXJyZW50RGVjRmlsdGVyR3JvdXBzKHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSkge1xuXG4gICAgY29uc3QgZmlsdGVyID0ge1xuICAgICAgJ3Byb3BlcnR5JzogcHJvcGVydHlOYW1lLFxuICAgICAgJ3ZhbHVlJzogcHJvcGVydHlWYWx1ZSxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpIHtcblxuICAgICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5mb3JFYWNoKChmaWx0ZXJHcm91cCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlckV4aXN0c0luVGhpc0dyb3VwID0gZmlsdGVyR3JvdXAuZmlsdGVycy5maW5kKGZpbHRlckdyb3VwRmlsdGVyID0+IGZpbHRlckdyb3VwRmlsdGVyLnByb3BlcnR5ID09PSBmaWx0ZXIucHJvcGVydHkpO1xuXG4gICAgICAgIGlmICghZmlsdGVyRXhpc3RzSW5UaGlzR3JvdXApIHtcblxuICAgICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMucHVzaChmaWx0ZXIpO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gW3sgZmlsdGVyczogW2ZpbHRlcl0gfV07XG5cbiAgICB9XG5cbiAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicztcblxuICAgIHRoaXMucmVhY2FsY3VsYXRlQW5kRW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICB9XG5cbiAgY2xvc2VGaWx0ZXJzKCkge1xuXG4gICAgdGhpcy5lZGl0aW9uR3JvdXBJbmRleCA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gZmFsc2U7XG5cbiAgICB0aGlzLnNob3dTZWFyY2hJbnB1dCA9IGZhbHNlO1xuXG4gIH1cblxuICBwcml2YXRlIHJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQgPSBmYWxzZSkge1xuXG4gICAgdGhpcy5lbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcyhyZWNvdW50KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNQZXJzaXN0ZW5jZSkge1xuXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5KClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2VGaWx0ZXJzKCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICAgICAgICB9KTtcblxuXG4gICAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZWxvYWRGb3JtV2l0aEdpdmVuRGVjRmlsdGVyR3JvdXBlKGZpbHRlcnMpIHtcblxuICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICBmaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcblxuICAgICAgaWYgKGZpbHRlci52YWx1ZSkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRm9ybVtmaWx0ZXIucHJvcGVydHldID0gZmlsdGVyLnZhbHVlO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHRoaXMub3BlbkZpbHRlcnMoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuRmlsdGVycygpIHtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gdHJ1ZTtcblxuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gdHJ1ZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVBZHZhbmNlZEZpbHRlcigpIHtcblxuICAgIGlmICh0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQuZm9ybSA9IHRoaXMuZmlsdGVyRm9ybTtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5vblNlYXJjaCA9IHRoaXMub25TZWFyY2g7XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQub25DbGVhciA9IHRoaXMuY2xlYXJGaWx0ZXJGb3JtO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VhcmNoLnN1YnNjcmliZShmaWx0ZXJFdmVudCA9PiB7XG5cbiAgICAgICAgaWYgKGZpbHRlckV2ZW50LmNoaWxkcmVuKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSAnY29sbGFwc2UnO1xuXG4gICAgICAgICAgdGhpcy5jaGlsZHJlbkZpbHRlcnMgPSBmaWx0ZXJFdmVudC5jaGlsZHJlbjtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gJ3RhYnMnO1xuXG4gICAgICAgICAgdGhpcy5jaGlsZHJlbkZpbHRlcnMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy50YWJzRmlsdGVyID0gZmlsdGVyRXZlbnQuZmlsdGVycztcblxuICAgICAgICB0aGlzLmVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHRoaXMuaXNJdEZpcnN0TG9hZCB8fCBmaWx0ZXJFdmVudC5yZWNvdW50KTtcblxuICAgICAgICB0aGlzLmlzSXRGaXJzdExvYWQgPSBmYWxzZTtcblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJzRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFic0ZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW91bnRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCkge1xuXG4gICAgY29uc3QgY3VycmVudEZpbHRlciA9IFtdO1xuXG4gICAgY29uc3QgY3VycmVudEZpbHRlcldpdGhvdXRUYWJzID0gW107XG5cbiAgICBpZiAodGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyAmJiB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLmxlbmd0aCkge1xuXG4gICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLmZvckVhY2goKGZpbHRlckdyb3VwOiB7IGZpbHRlcnM6IGFueVtdIH0pID0+IHtcblxuICAgICAgICBjb25zdCBmaWx0ZXJHcm91cENvcHkgPSB7XG4gICAgICAgICAgZmlsdGVyczogZmlsdGVyR3JvdXAuZmlsdGVycy5zbGljZSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMudGFic0ZpbHRlcikge1xuICAgICAgICAgIGZpbHRlckdyb3VwQ29weS5maWx0ZXJzLnB1c2goLi4udGhpcy50YWJzRmlsdGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRGaWx0ZXIucHVzaChmaWx0ZXJHcm91cENvcHkpO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlckdyb3VwQ29weVdpdGhvdXRUYWJzID0ge1xuICAgICAgICAgIGZpbHRlcnM6IGZpbHRlckdyb3VwLmZpbHRlcnMuc2xpY2UoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicy5wdXNoKGZpbHRlckdyb3VwQ29weVdpdGhvdXRUYWJzKTtcblxuICAgICAgfSk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMudGFic0ZpbHRlcikge1xuXG4gICAgICBjdXJyZW50RmlsdGVyLnB1c2goeyBmaWx0ZXJzOiB0aGlzLnRhYnNGaWx0ZXIgfSk7XG5cbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlckdyb3VwcyA9IGN1cnJlbnRGaWx0ZXIubGVuZ3RoID8gY3VycmVudEZpbHRlciA6IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMubGVuZ3RoID8gY3VycmVudEZpbHRlcldpdGhvdXRUYWJzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLypcbiAgICogZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHNcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMocmVjb3VudCA9IGZhbHNlKSB7XG5cbiAgICBsZXQgZmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXJHcm91cHMgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZmlsdGVyR3JvdXBzKSkgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cbiAgICAgIHRoaXMubW91bnRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgICAgIGlmICh0aGlzLnByZVNlYXJjaCkge1xuXG4gICAgICAgIGZpbHRlckdyb3VwcyA9IHRoaXMucHJlU2VhcmNoKGZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5zZWFyY2guZW1pdCh7XG4gICAgICAgIGZpbHRlckdyb3VwczogZmlsdGVyR3JvdXBzLFxuICAgICAgICByZWNvdW50OiByZWNvdW50LFxuICAgICAgICBmaWx0ZXJNb2RlOiB0aGlzLmZpbHRlck1vZGUsXG4gICAgICAgIGNoaWxkcmVuOiB0aGlzLmNoaWxkcmVuRmlsdGVycyxcbiAgICAgIH0pO1xuXG4gICAgICByZXMoKTtcblxuICAgIH0pO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIGFjdEJ5Q2xpY2tQb3NpdGlvblxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlY3RcbiAgICovXG4gIHByaXZhdGUgYWN0QnlDbGlja1Bvc2l0aW9uID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50WydwYXRoJ10pIHtcblxuICAgICAgY29uc3QgY2xpY2tlZEluc2lkZUZpbHRlciA9ICRldmVudFsncGF0aCddLmZpbmQocGF0aCA9PiB7XG5cbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYCR7cGF0aFsnY2xhc3NOYW1lJ119YCB8fCAnJztcblxuICAgICAgICBjb25zdCBpbnNpZGVXcmFwcGVyID0gY2xhc3NOYW1lLmluZGV4T2YodGhpcy5jbGlja2FibGVDb250YWluZXJDbGFzcykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVPcHRpb24gPSBjbGFzc05hbWUuaW5kZXhPZignbWF0LW9wdGlvbicpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlRGF0ZVBpY2tlciA9IGNsYXNzTmFtZS5pbmRleE9mKCdtYXQtZGF0ZXBpY2tlci1jb250ZW50JykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVPdmVybGF5Q29udGFpbmVyID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Nkay1vdmVybGF5LWNvbnRhaW5lcicpID49IDA7XG5cbiAgICAgICAgcmV0dXJuIGluc2lkZVdyYXBwZXIgfHwgaW5zaWRlT3B0aW9uIHx8IGluc2lkZURhdGVQaWNrZXIgfHwgaW5zaWRlT3ZlcmxheUNvbnRhaW5lcjtcblxuICAgICAgfSk7XG5cbiAgICAgIGlmICghY2xpY2tlZEluc2lkZUZpbHRlcikgeyAvLyBhdm9pZCBjbG9zaW5nIGZpbHRlciBmcm9tIGFueSBvcGVuIGRpYWxvZ1xuXG4gICAgICAgIHRoaXMuY2xvc2VGaWx0ZXJzKCk7XG5cbiAgICAgICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB3YXRjaENsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoQ2xpY2soKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmFjdEJ5Q2xpY2tQb3NpdGlvbiwgdHJ1ZSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdDbGljaygpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYWN0QnlDbGlja1Bvc2l0aW9uLCB0cnVlKTtcbiAgfVxuXG4gIC8qXG4gICAqIGNvbXBvbmVudFRhYk5hbWVcbiAgICpcbiAgICovXG4gIHByaXZhdGUgY29tcG9uZW50RmlsdGVyTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy1maWx0ZXInO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hVcmxGaWx0ZXIoKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzUGVyc2lzdGVuY2UpIHtcblxuICAgICAgcmV0dXJuO1xuXG4gICAgfVxuXG4gICAgdGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMucm91dGUucXVlcnlQYXJhbXNcbiAgICAgIC5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuXG4gICAgICAgIGNvbnN0IGludGVydmFsID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgIGlmICh0aGlzLm5hbWUpIHtcblxuICAgICAgICAgICAgY29uc3QgYmFzZTY0RmlsdGVyID0gcGFyYW1zW3RoaXMuY29tcG9uZW50RmlsdGVyTmFtZSgpXTtcblxuICAgICAgICAgICAgaWYgKGJhc2U2NEZpbHRlcikge1xuXG4gICAgICAgICAgICAgIGlmIChiYXNlNjRGaWx0ZXIgIT09IHRoaXMuY3VycmVudFVybEVuY29kZWRGaWx0ZXIpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuZ2V0SnNvbkZyb21CYXNlNjRGaWx0ZXIoYmFzZTY0RmlsdGVyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSBmaWx0ZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlYXJjaCgpO1xuXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSwgMTApO1xuXG4gICAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1VybEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbikge1xuXG4gICAgICB0aGlzLndhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5KCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICBjb25zdCBmaWx0ZXJCYXNlNjQgPSB0aGlzLmdldEJhc2U2NEZpbHRlckZyb21EZWNGaWx0ZXJHcm91cHMoKTtcblxuICAgICAgdGhpcy5zZXRGaWx0ZXJJblVybFF1ZXJ5KGZpbHRlckJhc2U2NCkudGhlbihyZXMsIHJlaik7XG5cbiAgICB9KTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBzZXRGaWx0ZXJJblVybFF1ZXJ5XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldEZpbHRlckluVXJsUXVlcnkoZmlsdGVyKSB7XG5cbiAgICB0aGlzLmN1cnJlbnRVcmxFbmNvZGVkRmlsdGVyID0gZmlsdGVyO1xuXG4gICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuXG4gICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRGaWx0ZXJOYW1lKCldID0gZmlsdGVyO1xuXG4gICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLiddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcywgcmVwbGFjZVVybDogdHJ1ZSB9KTtcblxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVXJsRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGdldEJhc2U2NEZpbHRlckZyb21EZWNGaWx0ZXJHcm91cHMoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgJiYgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGJhc2U2NEZpbHRlciA9IGJ0b2EoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpKSk7XG4gICAgICBjb25zdCBiYXNlRmlsdGVyV2l0aG91dEVxdWFsU2lnbiA9IGJhc2U2NEZpbHRlci5yZXBsYWNlKC89L2csICcnKTtcbiAgICAgIHJldHVybiBiYXNlRmlsdGVyV2l0aG91dEVxdWFsU2lnbjsgLy8gcmVtb3ZlcyA9IGJlZm9yIGVzZXQgdGhlIGZpbHRlclxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1VybEZpbHRlclxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvOTAyMDQwOS9pcy1pdC1vay10by1yZW1vdmUtdGhlLWVxdWFsLXNpZ25zLWZyb20tYS1iYXNlNjQtc3RyaW5nXG4gICAqL1xuICBwcml2YXRlIGdldEpzb25Gcm9tQmFzZTY0RmlsdGVyKGJhc2U2NEZpbHRlcikge1xuICAgIGNvbnN0IGJhc2U2NFBhZExlbiA9IChiYXNlNjRGaWx0ZXIubGVuZ3RoICUgNCkgPiAwID8gNCAtIChiYXNlNjRGaWx0ZXIubGVuZ3RoICUgNCkgOiAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlNjRQYWRMZW47IGkrKykge1xuICAgICAgYmFzZTY0RmlsdGVyICs9ICc9JzsgLy8gYWRkID0gYmVmb3JlIHJlYWRkIHRoZSBmaWx0ZXJcbiAgICB9XG5cbiAgICBsZXQgZmlsdGVyT2JqZWN0O1xuXG4gICAgdHJ5IHtcbiAgICAgIGZpbHRlck9iamVjdCA9IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KGF0b2IoYmFzZTY0RmlsdGVyKSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtc2cgPSAnTGlzdEZpbHRlckNvbXBvbmVudDo6IEZhaWxlZCB0byBwYXJzZSB0aGUgZmlsdGVyLiBUaGUgdmFsdWUgaXMgbm90IHZhbGlkIGFuZCB0aGUgZmlsdGVyIHdhcyByZW1vdmVkLiBGaWx0ZXIgdmFsdWU6ICc7XG4gICAgICBjb25zb2xlLmVycm9yKG1zZywgYmFzZTY0RmlsdGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmFzZTY0RmlsdGVyID8gZmlsdGVyT2JqZWN0IDogdW5kZWZpbmVkO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJmaWx0ZXJHcm91cHM/Lmxlbmd0aFwiIGNsYXNzPVwiZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlclwiPlxuXG4gIDxtYXQtY2hpcC1saXN0PlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZ3JvdXAgb2YgZmlsdGVyR3JvdXBzOyBsZXQgZ3JvdXBJbmRleCA9IGluZGV4O1wiPlxuICAgICAgPG1hdC1jaGlwICpuZ0lmPVwiZ3JvdXA/LmZpbHRlcnNcIiAoY2xpY2spPVwiZWRpdERlY0ZpbHRlckdyb3VwKCRldmVudCwgZ3JvdXBJbmRleClcIj5cblxuICAgICAgICA8c3BhbiAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGdyb3VwPy5maWx0ZXJzOyBsZXQgbGFzdEZpbHRlciA9IGxhc3Q7XCIgY2xhc3M9XCJpdGVtLXdyYXBwZXJcIj5cblxuICAgICAgICAgIDxzcGFuIFtuZ1N3aXRjaF09XCJmaWx0ZXIucHJvcGVydHkgIT09ICdzZWFyY2gnXCI+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+e3sgJ2xhYmVsLicgKyBmaWx0ZXIucHJvcGVydHkgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaERlZmF1bHQ+e3sgJ2xhYmVsLktleXdvcmQnIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuXG4gICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgPHNwYW4+OiZuYnNwOzwvc3Bhbj5cblxuICAgICAgICAgIDxzcGFuIFtuZ1N3aXRjaF09XCJnZXRWYWx1ZXR5cGUoZmlsdGVyLnZhbHVlKVwiIGNsYXNzPVwidmFsdWUtd3JhcHBlclwiPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCI+e3sgZmlsdGVyLnZhbHVlIHwgZGF0ZSB9fTwvc3Bhbj5cblxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoRGVmYXVsdD57eyBmaWx0ZXIudmFsdWUgfX08L3NwYW4+XG5cbiAgICAgICAgICA8L3NwYW4gPlxuXG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCIhbGFzdEZpbHRlclwiPiw8L3NwYW4+XG5cbiAgICAgICAgICAmbmJzcDtcblxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIChjbGljayk9XCJyZW1vdmVEZWNGaWx0ZXJHcm91cCgkZXZlbnQsIGdyb3VwSW5kZXgpXCI+cmVtb3ZlX2NpcmNsZTwvaT5cblxuICAgICAgPC9tYXQtY2hpcD5cblxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gIDwvbWF0LWNoaXAtbGlzdD5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC10YWItYm9keS1jb250ZW50e3BhZGRpbmc6MTZweCAwfS5tYXQtZm9ybS1maWVsZC1wcmVmaXh7bWFyZ2luLXJpZ2h0OjhweCFpbXBvcnRhbnR9Lm1hdC1mb3JtLWZpZWxkLXN1ZmZpeHttYXJnaW4tbGVmdDo4cHghaW1wb3J0YW50fS5tYXQtZWxldmF0aW9uLXowe2JveC1zaGFkb3c6MCAwIDAgMCByZ2JhKDAsMCwwLC4yKSwwIDAgMCAwIHJnYmEoMCwwLDAsLjE0KSwwIDAgMCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MXtib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejJ7Ym94LXNoYWRvdzowIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDJweCAycHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoze2JveC1zaGFkb3c6MCAzcHggM3B4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAzcHggNHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDhweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NHtib3gtc2hhZG93OjAgMnB4IDRweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNHB4IDVweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo1e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA1cHggOHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE0cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejZ7Ym94LXNoYWRvdzowIDNweCA1cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDZweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejd7Ym94LXNoYWRvdzowIDRweCA1cHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDdweCAxMHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAycHggMTZweCAxcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo4e2JveC1zaGFkb3c6MCA1cHggNXB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCA4cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgM3B4IDE0cHggMnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OXtib3gtc2hhZG93OjAgNXB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOXB4IDEycHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNnB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEwe2JveC1zaGFkb3c6MCA2cHggNnB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCAxMHB4IDE0cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAxOHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejExe2JveC1zaGFkb3c6MCA2cHggN3B4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMXB4IDE1cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAyMHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEye2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMnB4IDE3cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyMnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEze2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxM3B4IDE5cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNHB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE0e2JveC1zaGFkb3c6MCA3cHggOXB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxNHB4IDIxcHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE1e2JveC1zaGFkb3c6MCA4cHggOXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxNXB4IDIycHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAyOHB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE2e2JveC1zaGFkb3c6MCA4cHggMTBweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTZweCAyNHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMzBweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxN3tib3gtc2hhZG93OjAgOHB4IDExcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE3cHggMjZweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMycHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTh7Ym94LXNoYWRvdzowIDlweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxOHB4IDI4cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDdweCAzNHB4IDZweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE5e2JveC1zaGFkb3c6MCA5cHggMTJweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMTlweCAyOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzZweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMHtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMHB4IDMxcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCAzOHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIxe2JveC1zaGFkb3c6MCAxMHB4IDEzcHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIxcHggMzNweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQwcHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjJ7Ym94LXNoYWRvdzowIDEwcHggMTRweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjJweCAzNXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggNDJweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyM3tib3gtc2hhZG93OjAgMTFweCAxNHB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyM3B4IDM2cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NHB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejI0e2JveC1zaGFkb3c6MCAxMXB4IDE1cHggLTdweCByZ2JhKDAsMCwwLC4yKSwwIDI0cHggMzhweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOXB4IDQ2cHggOHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJhZGdlLXNtYWxsIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6NnB4fS5tYXQtYmFkZ2UtbGFyZ2UgLm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtc2l6ZToyNHB4fS5tYXQtaDEsLm1hdC1oZWFkbGluZSwubWF0LXR5cG9ncmFwaHkgaDF7Zm9udDo0MDAgMjRweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMiwubWF0LXRpdGxlLC5tYXQtdHlwb2dyYXBoeSBoMntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWgzLC5tYXQtc3ViaGVhZGluZy0yLC5tYXQtdHlwb2dyYXBoeSBoM3tmb250OjQwMCAxNnB4LzI4cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg0LC5tYXQtc3ViaGVhZGluZy0xLC5tYXQtdHlwb2dyYXBoeSBoNHtmb250OjQwMCAxNXB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg1LC5tYXQtdHlwb2dyYXBoeSBoNXtmb250OjQwMCAxMS42MnB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWg2LC5tYXQtdHlwb2dyYXBoeSBoNntmb250OjQwMCA5LjM4cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxMnB4fS5tYXQtYm9keS0yLC5tYXQtYm9keS1zdHJvbmd7Zm9udDo1MDAgMTRweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJvZHksLm1hdC1ib2R5LTEsLm1hdC10eXBvZ3JhcGh5e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5IHAsLm1hdC1ib2R5LTEgcCwubWF0LXR5cG9ncmFwaHkgcHttYXJnaW46MCAwIDEycHh9Lm1hdC1jYXB0aW9uLC5tYXQtc21hbGx7Zm9udDo0MDAgMTJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWRpc3BsYXktNCwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTR7Zm9udDozMDAgMTEycHgvMTEycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNTZweDtsZXR0ZXItc3BhY2luZzotLjA1ZW19Lm1hdC1kaXNwbGF5LTMsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ze2ZvbnQ6NDAwIDU2cHgvNTZweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDJlbX0ubWF0LWRpc3BsYXktMiwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTJ7Zm9udDo0MDAgNDVweC80OHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHg7bGV0dGVyLXNwYWNpbmc6LS4wMDVlbX0ubWF0LWRpc3BsYXktMSwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTF7Zm9udDo0MDAgMzRweC80MHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHh9Lm1hdC1ib3R0b20tc2hlZXQtY29udGFpbmVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1idXR0b24sLm1hdC1mYWIsLm1hdC1mbGF0LWJ1dHRvbiwubWF0LWljb24tYnV0dG9uLC5tYXQtbWluaS1mYWIsLm1hdC1yYWlzZWQtYnV0dG9uLC5tYXQtc3Ryb2tlZC1idXR0b257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWJ1dHRvbi10b2dnbGUsLm1hdC1jYXJke2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhcmQtdGl0bGV7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtY2FyZC1jb250ZW50LC5tYXQtY2FyZC1oZWFkZXIgLm1hdC1jYXJkLXRpdGxlLC5tYXQtY2FyZC1zdWJ0aXRsZXtmb250LXNpemU6MTRweH0ubWF0LWNoZWNrYm94e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNoZWNrYm94LWxheW91dCAubWF0LWNoZWNrYm94LWxhYmVse2xpbmUtaGVpZ2h0OjI0cHh9Lm1hdC1jaGlwe2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjE4cHh9Lm1hdC1jaGlwIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24sLm1hdC1jaGlwIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29ue2ZvbnQtc2l6ZToxOHB4fS5tYXQtdGFibGV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtaGVhZGVyLWNlbGx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2VsbCwubWF0LWZvb3Rlci1jZWxse2ZvbnQtc2l6ZToxNHB4fS5tYXQtY2FsZW5kYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2FsZW5kYXItYm9keXtmb250LXNpemU6MTNweH0ubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9ue2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlciB0aHtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo0MDB9Lm1hdC1kaWFsb2ctdGl0bGV7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWV4cGFuc2lvbi1wYW5lbC1jb250ZW50e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCU7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuMTI1O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb257Zm9udC1zaXplOjE1MCU7bGluZS1oZWlnaHQ6MS4xMjV9Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29uLWJ1dHRvbntoZWlnaHQ6MS41ZW07d2lkdGg6MS41ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b24gLm1hdC1pY29ue2hlaWdodDoxLjEyNWVtO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi41ZW0gMDtib3JkZXItdG9wOi44NDM3NWVtIHNvbGlkIHRyYW5zcGFyZW50fS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVye3RvcDotLjg0Mzc1ZW07cGFkZGluZy10b3A6Ljg0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlcntmb250LXNpemU6NzUlO21hcmdpbi10b3A6LjY2NjY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNzkxNjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC13cmFwcGVye3BhZGRpbmctYm90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjQzNzVlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMXB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjNlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzUlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMjgxMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4yNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7bWFyZ2luLXRvcDouNTQxNjdlbTt0b3A6Y2FsYygxMDAlIC0gMS42NjY2N2VtKX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi4yNWVtIDAgLjc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMDkzNzVlbTttYXJnaW4tdG9wOi0uNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzoxZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5le2JvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuODQzNzVlbTttYXJnaW4tdG9wOi0uMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWdyaWQtdGlsZS1mb290ZXIsLm1hdC1ncmlkLXRpbGUtaGVhZGVye2ZvbnQtc2l6ZToxNHB4fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmUsLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LWdyaWQtdGlsZS1oZWFkZXIgLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fWlucHV0Lm1hdC1pbnB1dC1lbGVtZW50e21hcmdpbi10b3A6LS4wNjI1ZW19Lm1hdC1tZW51LWl0ZW17Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXBhZ2luYXRvciwubWF0LXBhZ2luYXRvci1wYWdlLXNpemUgLm1hdC1zZWxlY3QtdHJpZ2dlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHh9Lm1hdC1yYWRpby1idXR0b24sLm1hdC1zZWxlY3R7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2VsZWN0LXRyaWdnZXJ7aGVpZ2h0OjEuMTI1ZW19Lm1hdC1zbGlkZS10b2dnbGUtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwubWF0LXN0ZXBwZXItdmVydGljYWx7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc3RlcC1sYWJlbHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVke2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRhYi1ncm91cHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10YWItbGFiZWwsLm1hdC10YWItbGlua3tmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdG9vbGJhciwubWF0LXRvb2xiYXIgaDEsLm1hdC10b29sYmFyIGgyLC5tYXQtdG9vbGJhciBoMywubWF0LXRvb2xiYXIgaDQsLm1hdC10b29sYmFyIGg1LC5tYXQtdG9vbGJhciBoNntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowfS5tYXQtdG9vbHRpcHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEwcHg7cGFkZGluZy10b3A6NnB4O3BhZGRpbmctYm90dG9tOjZweH0ubWF0LXRvb2x0aXAtaGFuZHNldHtmb250LXNpemU6MTRweDtwYWRkaW5nLXRvcDo5cHg7cGFkZGluZy1ib3R0b206OXB4fS5tYXQtbGlzdC1pdGVtLC5tYXQtbGlzdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjE2cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtbmF2LWxpc3QgLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweH0ubWF0LW9wdGdyb3VwLWxhYmVse2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zaW1wbGUtc25hY2tiYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4fS5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbntsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdHJlZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10cmVlLW5vZGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxNHB4fS5tYXQtcmlwcGxle292ZXJmbG93OmhpZGRlbn1AbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6YWN0aXZlKXsubWF0LXJpcHBsZXtkaXNwbGF5Om5vbmV9fS5tYXQtcmlwcGxlLm1hdC1yaXBwbGUtdW5ib3VuZGVke292ZXJmbG93OnZpc2libGV9Lm1hdC1yaXBwbGUtZWxlbWVudHtwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXItcmFkaXVzOjUwJTtwb2ludGVyLWV2ZW50czpub25lO3RyYW5zaXRpb246b3BhY2l0eSwtd2Via2l0LXRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpO3RyYW5zaXRpb246b3BhY2l0eSx0cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9LmNkay12aXN1YWxseS1oaWRkZW57Ym9yZGVyOjA7Y2xpcDpyZWN0KDAgMCAwIDApO2hlaWdodDoxcHg7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHg7b3V0bGluZTowOy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlciwuY2RrLW92ZXJsYXktY29udGFpbmVye3BvaW50ZXItZXZlbnRzOm5vbmU7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmNkay1vdmVybGF5LWNvbnRhaW5lcntwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LWNvbnRhaW5lcjplbXB0eXtkaXNwbGF5Om5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVye2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LXBhbmV7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6YXV0bztib3gtc2l6aW5nOmJvcmRlci1ib3g7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9LmNkay1vdmVybGF5LWJhY2tkcm9we3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6MTAwMDtwb2ludGVyLWV2ZW50czphdXRvOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDt0cmFuc2l0aW9uOm9wYWNpdHkgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO29wYWNpdHk6MH0uY2RrLW92ZXJsYXktYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjF9QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTouNn19LmNkay1vdmVybGF5LWRhcmstYmFja2Ryb3B7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yODgpfS5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCwuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjB9LmNkay1vdmVybGF5LWNvbm5lY3RlZC1wb3NpdGlvbi1ib3VuZGluZy1ib3h7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47bWluLXdpZHRoOjFweDttaW4taGVpZ2h0OjFweH0uY2RrLWdsb2JhbC1zY3JvbGxibG9ja3twb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO292ZXJmbG93LXk6c2Nyb2xsfS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbHstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0O2FuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0fS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6bm90KDotd2Via2l0LWF1dG9maWxsKXstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmR9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXple3Jlc2l6ZTpub25lfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZS1tZWFzdXJpbmd7aGVpZ2h0OmF1dG8haW1wb3J0YW50O292ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnQ7cGFkZGluZzoycHggMCFpbXBvcnRhbnQ7Ym94LXNpemluZzpjb250ZW50LWJveCFpbXBvcnRhbnR9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXJ7bWFyZ2luOjE2cHggMCA4cHh9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLml0ZW0td3JhcHBlcnttYXgtd2lkdGg6MTVlbTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLml0ZW0td3JhcHBlciwuZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAubWF0ZXJpYWwtaWNvbnN7Y29sb3I6Izk2OTY5Nn0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAuZmlsdGVyLWNvbnRlbnR7bWFyZ2luLXJpZ2h0OjhweH0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAubWF0LWNoaXB7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLnZhbHVlLXdyYXBwZXJ7Y29sb3I6I2VmM2Y1NH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBmaWx0ZXJHcm91cHMgPSBbXTtcblxuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBlZGl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBlZGl0RGVjRmlsdGVyR3JvdXAoJGV2ZW50LCBmaWx0ZXJHcm91cCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmVkaXQuZW1pdChmaWx0ZXJHcm91cCk7XG4gIH1cbiAgcmVtb3ZlRGVjRmlsdGVyR3JvdXAoJGV2ZW50LCBmaWx0ZXJHcm91cCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KGZpbHRlckdyb3VwKTtcbiAgfVxuXG4gIGdldFZhbHVldHlwZSh2YWx1ZSkge1xuXG4gICAgY29uc3QgZmlyc3RWYWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWVbMF0gOiB2YWx1ZTtcblxuICAgIGxldCB0eXBlO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGAke2ZpcnN0VmFsdWV9YC5pbmRleE9mKCcwMDBaJykgPj0gMDpcbiAgICAgICAgdHlwZSA9ICdkYXRlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0eXBlID0gJ2RlZmF1bHQnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZTtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0Q2hpcHNNb2R1bGUsIE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGVjUGVybWlzc2lvbl0nXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25EaXJlY3RpdmUge1xuXG4gIHByaXZhdGUgaGFzVmlldyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGVjUGVybWlzc2lvbihwOiBzdHJpbmdbXSkge1xuICAgIGlmICghcCkge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcbiAgICAgIHRoaXMuaGFzVmlldyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFzUGVybWlzc2lvbihwKTtcbiAgICB9XG4gIH1cblxuICBoYXNQZXJtaXNzaW9uKHApIHtcbiAgICB0aGlzLnNlcnZpY2UudXNlciQuc3Vic2NyaWJlKFxuICAgICAgdXNlciA9PiB7XG4gICAgICAgIGlmICh1c2VyICYmIHRoaXMuaXNBbGxvd2VkQWNjZXNzKHAsIHVzZXIucGVybWlzc2lvbnMpKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhhc1ZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XG4gICAgICAgICAgICB0aGlzLmhhc1ZpZXcgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgICB0aGlzLmhhc1ZpZXcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzQWxsb3dlZEFjY2Vzcyhyb2xlc0FsbG93ZWQ6IHN0cmluZ1tdID0gW10sIGN1cnJlbnRSb2xlczogc3RyaW5nW10gPSBbXSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXRjaGluZ1JvbGUgPSBjdXJyZW50Um9sZXMuZmluZCgodXNlclJvbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJvbGVzQWxsb3dlZC5maW5kKChhbG93ZWRSb2xlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGFsb3dlZFJvbGUgPT09IHVzZXJSb2xlO1xuICAgICAgICB9KSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoaW5nUm9sZSA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1Blcm1pc3Npb25EaXJlY3RpdmUgfSBmcm9tICcuL2RlYy1wZXJtaXNzaW9uLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNQZXJtaXNzaW9uRGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNQZXJtaXNzaW9uRGlyZWN0aXZlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUGVybWlzc2lvbk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWF0Q2hpcHNNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lTW9kdWxlIH0gZnJvbSAnLi8uLi9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUubW9kdWxlJztcbmltcG9ydCB7IERlY1Blcm1pc3Npb25Nb2R1bGUgfSBmcm9tICcuLy4uLy4uLy4uL2RpcmVjdGl2ZXMvcGVybWlzc2lvbi9kZWMtcGVybWlzc2lvbi5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtdGFicy1maWx0ZXIvbGlzdC10YWJzLWZpbHRlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZU1vZHVsZSxcbiAgICBEZWNQZXJtaXNzaW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNMaXN0RmlsdGVyQ29tcG9uZW50LCBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNMaXN0RmlsdGVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvdyB3cmFwXCIgW2Z4TGF5b3V0R2FwXT1cIml0ZW1HYXBcIiA+XG4gIDxkaXYgKm5nRm9yPVwibGV0IHJvdyBvZiByb3dzOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsIHJvdywgcm93cywgaSlcIiBbZnhGbGV4XT1cIml0ZW1XaWR0aFwiPlxuICAgIDxkaXYgW25nU3R5bGVdPVwie21hcmdpbjogaXRlbUdhcH1cIj5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVSZWZcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3Jvdzogcm93IHx8IHt9LCBsaXN0OiByb3dzIHx8IFtdLCBpbmRleDogaX1cIlxuICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBpdGVtV2lkdGggPSAnMjgwcHgnO1xuXG4gIEBJbnB1dCgpIGl0ZW1HYXAgPSAnOHB4JztcblxuICBAT3V0cHV0KCkgcm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfcm93cyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgc2V0IHJvd3ModjogYW55KSB7XG4gICAgaWYgKHRoaXMuX3Jvd3MgIT09IHYpIHtcbiAgICAgIHRoaXMuX3Jvd3MgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvbkl0ZW1DbGljayhldmVudCwgaXRlbSwgbGlzdCwgaW5kZXgpIHtcblxuICAgIHRoaXMucm93Q2xpY2suZW1pdCh7ZXZlbnQsIGl0ZW0sIGxpc3QsIGluZGV4fSk7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYmxlLWNvbHVtbicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCB7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgcHJvcDtcblxuICBASW5wdXQoKSB0aXRsZSA9ICcnO1xuXG4gIEBJbnB1dCgpIHNldCBjb2xTcGFuKHYpIHtcbiAgICBjb25zdCBudW1iZXIgPSArdjtcbiAgICB0aGlzLl9jb2xTcGFuID0gaXNOYU4obnVtYmVyKSA/IDEgOiBudW1iZXI7XG4gIH1cblxuICBnZXQgY29sU3BhbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb2xTcGFuO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29sU3BhbiA9IDE7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9saXN0LXRhYmxlLWNvbHVtbi9saXN0LXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC10YWJsZScsXG4gIHRlbXBsYXRlOiBgPG5neC1kYXRhdGFibGUgI3RhYmxlQ29tcG9uZW50XG4gIGNvbHVtbk1vZGU9XCJmbGV4XCJcbiAgaGVhZGVySGVpZ2h0PVwiMjRweFwiXG4gIHJvd0hlaWdodD1cImF1dG9cIlxuICBbZXh0ZXJuYWxTb3J0aW5nXT1cInRydWVcIlxuICBbbWVzc2FnZXNdPVwie2VtcHR5TWVzc2FnZTonJ31cIlxuICBbcm93c109XCJyb3dzXCJcbiAgKHNvcnQpPVwib25Tb3J0KCRldmVudClcIlxuICAoYWN0aXZhdGUpPVwib25JdGVtQ2xpY2soJGV2ZW50KVwiPlxuXG4gIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnM7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwie3tjb2x1bW4udGl0bGUgfCB0cmFuc2xhdGV9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2ZsZXhHcm93XT1cImNvbHVtbi5jb2xTcGFuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbcHJvcF09XCJjb2x1bW4ucHJvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3NvcnRhYmxlXT1cImNvbHVtbi5wcm9wID8gdHJ1ZSA6IGZhbHNlXCI+XG5cbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJjb2x1bW4udGVtcGxhdGUgPyB0cnVlIDogZmFsc2VcIlxuICAgICAgbGV0LXJvdz1cInJvd1wiXG4gICAgICBsZXQtaW5kZXg9XCJyb3dJbmRleFwiXG4gICAgICBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGU+XG5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLnRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntyb3c6IHJvdyB8fCB7fSwgbGlzdDogcm93cyB8fCBbXSwgaW5kZXg6IGluZGV4fVwiXG4gICAgICA+PC9uZy1jb250YWluZXI+XG5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG5cbjwvbmd4LWRhdGF0YWJsZT5cbmAsXG4gIHN0eWxlczogW2A6Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLm92ZXJmbG93LXZpc2libGV7b3ZlcmZsb3c6dmlzaWJsZSFpbXBvcnRhbnR9OjpuZy1kZWVwIGRhdGF0YWJsZS1zY3JvbGxlcnt3aWR0aDoxMDAlIWltcG9ydGFudH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUubm8tb3ZlcmZsb3d7b3ZlcmZsb3c6YXV0b306Om5nLWRlZXAgLm5neC1kYXRhdGFibGUubm8tcGFkZGluZyAuZGF0YXRhYmxlLWJvZHktcm93IC5kYXRhdGFibGUtYm9keS1jZWxsIC5kYXRhdGFibGUtYm9keS1jZWxsLWxhYmVse3BhZGRpbmc6MH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1oZWFkZXJ7cGFkZGluZzoxMXB4IDE2cHh9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtaGVhZGVyIC5kYXRhdGFibGUtaGVhZGVyLWNlbGwtbGFiZWx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWJvZHktcm93IC5kYXRhdGFibGUtYm9keS1jZWxse2ZvbnQtc2l6ZToxM3B4O2ZvbnQtd2VpZ2h0OjQwMDtvdmVyZmxvdzpoaWRkZW47bWluLWhlaWdodDoxMDAlO2Rpc3BsYXk6dGFibGU7LXdlYmtpdC11c2VyLXNlbGVjdDppbml0aWFsOy1tb3otdXNlci1zZWxlY3Q6aW5pdGlhbDstbXMtdXNlci1zZWxlY3Q6aW5pdGlhbDstby11c2VyLXNlbGVjdDppbml0aWFsO3VzZXItc2VsZWN0OmluaXRpYWx9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGwgLmRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWx7cGFkZGluZzoxNnB4O2Rpc3BsYXk6dGFibGUtY2VsbDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7d29yZC1icmVhazpicmVhay1hbGx9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGwuY2VsbC10b3AgLmRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWx7dmVydGljYWwtYWxpZ246dG9wfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLXJvdy1kZXRhaWx7cGFkZGluZzoxMHB4fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuc29ydC1idG57d2lkdGg6MDtoZWlnaHQ6MH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmljb24tZG93bntib3JkZXItbGVmdDo1cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjVweCBzb2xpZCB0cmFuc3BhcmVudH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmljb24tdXB7Ym9yZGVyLWxlZnQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDo1cHggc29saWQgdHJhbnNwYXJlbnR9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYmxlQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBzZXQgcm93cyh2KSB7XG4gICAgaWYgKHRoaXMuX3Jvd3MgIT09IHYpIHtcbiAgICAgIHRoaXMuX3Jvd3MgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlQ29tcG9uZW50OiBEYXRhdGFibGVDb21wb25lbnQ7XG5cbiAgY29sdW1uc1NvcnRDb25maWc6IGFueTtcblxuICBwcml2YXRlIF9yb3dzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQpIGNvbHVtbnM6IFF1ZXJ5TGlzdDxEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQ+O1xuXG4gIEBPdXRwdXQoKSBzb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG9uU29ydChldmVudCkge1xuXG4gICAgY29uc3Qgc29ydENvbmZpZyA9IFt7XG4gICAgICBwcm9wZXJ0eTogZXZlbnQuc29ydHNbMF0ucHJvcCxcbiAgICAgIG9yZGVyOiBldmVudC5zb3J0c1swXS5kaXIudG9VcHBlckNhc2UoKVxuICAgIH1dO1xuXG4gICAgaWYgKHNvcnRDb25maWcgIT09IHRoaXMuY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgdGhpcy5jb2x1bW5zU29ydENvbmZpZyA9IHNvcnRDb25maWc7XG5cbiAgICAgIHRoaXMuc29ydC5lbWl0KHRoaXMuY29sdW1uc1NvcnRDb25maWcpO1xuXG4gICAgfVxuXG4gIH1cblxuICBvbkl0ZW1DbGljaygkZXZlbnQpIHtcblxuICAgIGNvbnN0IGV2ZW50ID0gJGV2ZW50O1xuXG4gICAgY29uc3QgaXRlbSA9ICRldmVudC5yb3c7XG5cbiAgICBjb25zdCBsaXN0ID0gdGhpcy5yb3dzO1xuXG4gICAgY29uc3QgaW5kZXggPSAkZXZlbnQucm93LiQkaW5kZXg7XG5cbiAgICB0aGlzLnJvd0NsaWNrLmVtaXQoe2V2ZW50LCBpdGVtLCBsaXN0LCBpbmRleH0pO1xuXG4gIH1cbn1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0R3JpZENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1ncmlkL2xpc3QtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYmxlL2xpc3QtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZmlsdGVyL2xpc3QtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IERlY0xpc3RGZXRjaE1ldGhvZCwgQ291bnRSZXBvcnQgfSBmcm9tICcuL2xpc3QubW9kZWxzJztcbmltcG9ydCB7IEZpbHRlckRhdGEsIERlY0ZpbHRlciwgRmlsdGVyR3JvdXBzLCBGaWx0ZXJHcm91cCB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlciB9IGZyb20gJy4vbGlzdC5tb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdCcsXG4gIHRlbXBsYXRlOiBgPCEtLSBDT01QT05FTlQgTEFZT1VUIC0tPlxuPGRpdiBjbGFzcz1cImxpc3QtY29tcG9uZW50LXdyYXBwZXJcIj5cbiAgPGRpdiAqbmdJZj1cImZpbHRlclwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWZpbHRlclwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJyZXBvcnQgfHwgZmlsdGVyTW9kZSA9PT0gJ2NvbGxhcHNlJ1wiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICAgIDxkaXYgZnhGbGV4IGNsYXNzPVwidGV4dC1yaWdodFwiICpuZ0lmPVwidGFibGVBbmRHcmlkQXJlU2V0KClcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJ0b2dnbGVMaXN0TW9kZSgpXCI+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBhcmlhLWxhYmVsPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgKm5nSWY9XCJsaXN0TW9kZSA9PT0gJ2dyaWQnXCI+dmlld19oZWFkbGluZTwvbWF0LWljb24+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIGdyaWQgbW9kZVwiIGFyaWEtbGFiZWw9XCJTd2l0Y2ggdG8gZ3JpZCBtb2RlXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnICpuZ0lmPVwibGlzdE1vZGUgPT09ICd0YWJsZSdcIj52aWV3X21vZHVsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGZ4RmxleD5cbiAgICAgICAgPGRpdiAqbmdJZj1cImZpbHRlck1vZGUgPT0gJ2NvbGxhcHNlJyB0aGVuIGNvbGxhcHNlVGVtcGxhdGUgZWxzZSB0YWJzVGVtcGxhdGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIEdSSUQgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2dyaWRUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZ3JpZFwiPjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVEFCTEUgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2xpc3RUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtdGFibGVcIj48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIEZPT1RFUiBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjZm9vdGVyVGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgPHAgY2xhc3M9XCJsaXN0LWZvb3RlclwiPlxuICAgIHt7ICdsYWJlbC5hbW91bnQtbG9hZGVkLW9mLXRvdGFsJyB8XG4gICAgICB0cmFuc2xhdGU6e1xuICAgICAgICBsb2FkZWQ6IHJlcG9ydD8ucmVzdWx0Py5yb3dzPy5sZW5ndGgsXG4gICAgICAgIHRvdGFsOiByZXBvcnQ/LnJlc3VsdD8uY291bnRcbiAgICAgIH1cbiAgICB9fVxuICA8L3A+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIENPTExBUFNFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICN0YWJzVGVtcGxhdGU+XG4gIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICA8ZGl2ICpuZ0lmPVwibGlzdE1vZGUgPT0gJ2dyaWQnIHRoZW4gZ3JpZFRlbXBsYXRlIGVsc2UgbGlzdFRlbXBsYXRlXCI+PC9kaXY+XG4gICAgPCEtLSBGT09URVIgQ09OVEVOVCAtLT5cbiAgICA8ZGl2IGZ4RmxleD5cbiAgICAgIDxkaXYgKm5nSWY9XCJzaG93Rm9vdGVyICYmICFsb2FkaW5nIHRoZW4gZm9vdGVyVGVtcGxhdGVcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIExPQURJTkcgU1BJTk5FUiAtLT5cbiAgICA8ZGl2IGZ4RmxleCAqbmdJZj1cImxvYWRpbmdcIiBjbGFzcz1cInRleHQtY2VudGVyIGxvYWRpbmctc3Bpbm5lci13cmFwcGVyXCI+XG4gICAgICA8ZGVjLXNwaW5uZXI+PC9kZWMtc3Bpbm5lcj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIExPQUQgTU9SRSBCVVRUT04gLS0+XG4gICAgPGRpdiBmeEZsZXggKm5nSWY9XCIhaXNMYXN0UGFnZSAmJiAhbG9hZGluZyAmJiAhZGlzYWJsZVNob3dNb3JlQnV0dG9uXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gKGNsaWNrKT1cInNob3dNb3JlKClcIj57eydsYWJlbC5zaG93LW1vcmUnIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIENPTExBUFNFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNjb2xsYXBzZVRlbXBsYXRlPlxuICA8bWF0LWFjY29yZGlvbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgY29sbGFwc2FibGVGaWx0ZXJzLmNoaWxkcmVuXCI+XG4gICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbCAob3BlbmVkKT1cInNlYXJjaENvbGxhcHNhYmxlKGZpbHRlcilcIj5cbiAgICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZS10aXRsZVwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIzMnB4XCIgZnhMYXlvdXRBbGlnbj1cImxlZnQgY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGZ4RmxleD1cIjk2cHhcIiAqbmdJZj1cImNvdW50UmVwb3J0XCI+XG4gICAgICAgICAgICAgIDxkZWMtbGFiZWwgW2NvbG9ySGV4XT1cImZpbHRlci5jb2xvclwiPnt7IGdldENvbGxhcHNhYmxlQ291bnQoZmlsdGVyLnVpZCkgfX08L2RlYy1sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3sgJ2xhYmVsLicgKyBmaWx0ZXIubGFiZWwgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNlbGVjdGVkQ29sbGFwc2FibGUgPT09IGZpbHRlci51aWRcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYnNUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9tYXQtYWNjb3JkaW9uPlxuICA8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWJvdHRvbS1tYXJnaW5cIj48L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW2AubGlzdC1mb290ZXJ7Zm9udC1zaXplOjE0cHg7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpc3QtY29tcG9uZW50LXdyYXBwZXJ7bWluLWhlaWdodDo3MnB4fS50ZXh0LXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9LmxvYWRpbmctc3Bpbm5lci13cmFwcGVye3BhZGRpbmc6MzJweH0uY29sbGFwc2UtdGl0bGV7d2lkdGg6MTAwJX0uYWNjb3JkaW9uLWJvdHRvbS1tYXJnaW57bWFyZ2luLWJvdHRvbToxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuXG4gIC8qXG4gICogY291bnRSZXBvcnRcbiAgKlxuICAqXG4gICovXG4gIGNvdW50UmVwb3J0OiBDb3VudFJlcG9ydDtcblxuICAvKlxuICAqIGZpbHRlck1vZGVcbiAgKlxuICAqXG4gICovXG4gIGZpbHRlck1vZGU6ICd0YWJzJyB8ICdjb2xsYXBzZScgPSAndGFicyc7XG5cblxuICAvKlxuICAqIGNvbGxhcHNhYmxlRmlsdGVyc1xuICAqXG4gICpcbiAgKi9cbiAgY29sbGFwc2FibGVGaWx0ZXJzOiB7IHRhYjogc3RyaW5nLCBjaGlsZHJlbjogRGVjTGlzdEZpbHRlcltdIH07XG5cbiAgLypcbiAgICogbG9hZGluZ1xuICAgKlxuICAgKlxuICAgKi9cbiAgc2V0IGxvYWRpbmcodikge1xuXG4gICAgdGhpcy5fbG9hZGluZyA9IHY7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIubG9hZGluZyA9IHY7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBsb2FkaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICB9XG5cbiAgLypcbiAgICogZmlsdGVyR3JvdXBzXG4gICAqXG4gICAqXG4gICAqL1xuICBnZXQgZmlsdGVyR3JvdXBzKCk6IEZpbHRlckdyb3VwcyB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyID8gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzIDogW107XG4gIH1cblxuICAvKlxuICAgKiBzZWxlY3RlZENvbGxhcHNhYmxlXG4gICAqXG4gICAqXG4gICAqL1xuICBzZWxlY3RlZENvbGxhcHNhYmxlO1xuXG4gIC8qXG4gICAqIHJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcmVwb3J0O1xuXG4gIC8qXG4gICAqIGlzTGFzdFBhZ2VcbiAgICpcbiAgICpcbiAgICovXG4gIGlzTGFzdFBhZ2U6IGJvb2xlYW47XG5cbiAgLypcbiAgKiBzZWxlY3RlZFRhYlxuICAqXG4gICpcbiAgKi9cbiAgc2VsZWN0ZWRUYWI6IGFueTtcblxuICAvKlxuICAqIHByZXZpb3VzU2VsZWN0ZWRUYWJcbiAgKlxuICAqXG4gICovXG4gIHByZXZpb3VzU2VsZWN0ZWRUYWI6IGFueTtcblxuICAvKlxuICAgKiBmaWx0ZXJEYXRhXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGZpbHRlckRhdGE6IFN1YmplY3Q8RmlsdGVyRGF0YT4gPSBuZXcgU3ViamVjdDxGaWx0ZXJEYXRhPigpO1xuXG4gIC8qXG4gICAqIF9sb2FkaW5nO1xuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfbG9hZGluZyA9IHRydWU7XG5cbiAgLypcbiAgICogY2xlYXJBbmRSZWxvYWRSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgY2xlYXJBbmRSZWxvYWRSZXBvcnQ7XG5cbiAgLypcbiAgICogZmlsdGVyU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHJlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlYWN0aXZlUmVwb3J0OiBPYnNlcnZhYmxlPGFueT47XG5cbiAgLypcbiAgICogcmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiBzY3JvbGxhYmxlQ29udGFpbmVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbGFibGVDb250YWluZXI6IEVsZW1lbnQ7XG5cbiAgLypcbiAgICogc2Nyb2xsRXZlbnRFbWl0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnRFbWl0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiBzY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHRhYnNDaGFuZ2VTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdGFic0NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHRhYmxlU29ydFN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB0YWJsZVNvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiBwYXlsb2FkXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHBheWxvYWQ6IERlY0ZpbHRlcjtcblxuICAvKlxuICAgKiBfZW5kcG9pbnQgaW50ZXJuYWxsXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9lbmRwb2ludDogc3RyaW5nO1xuXG4gIC8qXG4gICAqIF9maWx0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2ZpbHRlcjogRGVjTGlzdEZpbHRlckNvbXBvbmVudDtcblxuICAvKlxuICAgKiBfbmFtZVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuXG4gIC8qXG4gICAqIGN1c3RvbUZldGNoTWV0aG9kXG4gICAqXG4gICAqIG1ldGhvZCB1c2VkIHRvIGZldGNoIGRhdGEgZnJvbSBiYWNrLWVuZFxuICAgKi9cbiAgQElucHV0KCkgY3VzdG9tRmV0Y2hNZXRob2Q6IERlY0xpc3RGZXRjaE1ldGhvZDtcblxuICAvKlxuICAgKiBjb2x1bW5zU29ydENvbmZpZ1xuICAgKlxuICAgKiB1c2VkIHRvIGdldCBhIHNvcnRlZCBsaXN0IGZyb20gYmFja2VuZFxuICAgKiBjYW4gYmUgcGFzZWQgdmlhIGF0dHJpYnV0ZSB0byBzb3J0IHRoZSBmaXJzdCBsb2FkXG4gICAqL1xuICBASW5wdXQoKSBjb2x1bW5zU29ydENvbmZpZztcblxuICAvKlxuICAgKiBkaXNhYmxlU2hvd01vcmVCdXR0b25cbiAgICpcbiAgICogdXNlZCB0byBoaWRlIHRoZSBzaG93IG1vcmUgYnV0dG9uXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlU2hvd01vcmVCdXR0b246IGJvb2xlYW47XG5cbiAgLypcbiAgICogZW5kcG9pbnRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBlbmRwb2ludCh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fZW5kcG9pbnQgIT09IHYpIHtcbiAgICAgIHRoaXMuX2VuZHBvaW50ID0gKHZbMF0gJiYgdlswXSA9PT0gJy8nKSA/IHYucmVwbGFjZSgnLycsICcnKSA6IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGVuZHBvaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZHBvaW50O1xuICB9XG5cbiAgLypcbiAgICogbmFtZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG5hbWUodjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX25hbWUgIT09IHYpIHtcbiAgICAgIHRoaXMuX25hbWUgPSB2O1xuICAgICAgdGhpcy5zZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIC8qXG4gICAqIHJvd3NcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgncm93cycpXG5cbiAgc2V0IHJvd3Mocm93cykge1xuICAgIHRoaXMuc2V0Um93cyhyb3dzKTtcbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLnJlcG9ydCA/IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLypcbiAgICogbGltaXRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpbWl0ID0gMTA7XG5cbiAgLypcbiAgICogbGlzdE1vZGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpc3RNb2RlO1xuXG4gIC8qXG4gICAqIHNjcm9sbGFibGVDb250YWluZXJDbGFzc1xuICAgKlxuICAgKiBXaGVyZSB0aGUgc2Nyb2xsIHdhdGNoZXIgc2hvdWxkIGJlIGxpc3RlbmluZ1xuICAgKi9cbiAgQElucHV0KCkgc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzID0gJ21hdC1zaWRlbmF2LWNvbnRlbnQnO1xuXG4gIC8qXG4gICAqIHNlYXJjaGFibGVQcm9wZXJ0aWVzXG4gICAqXG4gICAqIFByb3BlcnRpZXMgdG8gYmUgc2VhcmNoZWQgd2hlbiB1c2luZyBiYXNpYyBzZWFyY2hcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaGFibGVQcm9wZXJ0aWVzOiBzdHJpbmdbXTtcblxuICAvKlxuICAgKiBzaG93Rm9vdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBzaG93Rm9vdGVyID0gdHJ1ZTtcblxuICAvKlxuICAgKiBwb3N0U2VhcmNoXG4gICAqXG4gICAqIFRoaXMgbWlkZGxld2FyZSBpcyB1c2VkIHRvIHRyaWdnZXIgZXZlbnRzIGFmdGVyIGV2ZXJ5IHNlYXJjaFxuICAgKi9cbiAgQE91dHB1dCgpIHBvc3RTZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiByb3dDbGlja1xuICAgKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIGEgcm93IG9yIGNhcmQgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpIHJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIGdyaWRcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEdyaWRDb21wb25lbnQpIGdyaWQ6IERlY0xpc3RHcmlkQ29tcG9uZW50O1xuXG4gIC8qXG4gICAqIHRhYmxlXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RUYWJsZUNvbXBvbmVudCkgdGFibGU6IERlY0xpc3RUYWJsZUNvbXBvbmVudDtcblxuICAvKlxuICAgKiBmaWx0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEZpbHRlckNvbXBvbmVudClcbiAgc2V0IGZpbHRlcih2OiBEZWNMaXN0RmlsdGVyQ29tcG9uZW50KSB7XG4gICAgaWYgKHRoaXMuX2ZpbHRlciAhPT0gdikge1xuICAgICAgdGhpcy5fZmlsdGVyID0gdjtcbiAgICAgIHRoaXMuc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGZpbHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVyO1xuICB9XG5cbiAgLypcbiAgICogbmdPbkluaXRcbiAgICpcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHsgfVxuXG4gIC8qXG4gICAqIG5nT25Jbml0XG4gICAqXG4gICAqIFN0YXJ0cyBhIGZyZXNoIGNvbXBvbmVudCBhbmQgcHJlcGFyZSBpdCB0byBydW5cbiAgICpcbiAgICogLSBTdGFydCB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3Vic2NyaWJlIHRvIHRoZSBSZWFjdGl2ZSBSZXBvcnRcbiAgICogLSBTdGFydCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gRW5zdXJlIHVuaXF1ZSBuYW1lXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhdGNoRmlsdGVyRGF0YSgpO1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlTmFtZSgpO1xuICAgIHRoaXMuZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKTtcbiAgfVxuXG4gIC8qXG4gICogbmdBZnRlclZpZXdJbml0XG4gICpcbiAgKiBXYWl0IGZvciB0aGUgc3ViY29tcG9uZW50cyB0byBzdGFydCBiZWZvcmUgcnVuIHRoZSBjb21wb25lbnRcbiAgKlxuICAqIC0gU3RhcnQgd2F0Y2hpbmcgRmlsdGVyXG4gICogLSBEbyB0aGUgZmlyc3QgbG9hZFxuICAqL1xuIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgIHRoaXMud2F0Y2hGaWx0ZXIoKTtcbiAgIHRoaXMuZG9GaXJzdExvYWQoKTtcbiAgIHRoaXMuZGV0ZWN0TGlzdE1vZGUoKTtcbiAgIHRoaXMud2F0Y2hUYWJzQ2hhbmdlKCk7XG4gICB0aGlzLndhdGNoVGFibGVTb3J0KCk7XG4gICB0aGlzLnJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpO1xuICAgdGhpcy53YXRjaFNjcm9sbCgpO1xuICAgdGhpcy53YXRjaFNjcm9sbEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgLypcbiAgICogbmdPbkRlc3Ryb3lcbiAgICpcbiAgICogRGVzdHJveSB3YXRjaGVyIHRvIGZyZWUgbWVlbW9yeSBhbmQgcmVtb3ZlIHVubmVjZXNzYXJ5IHRyaWdnZXJzXG4gICAqXG4gICAqIC0gVW5zdWJzY3JpYmUgZnJvbSB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3RvcCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gU3RvcCB3YXRjaGluZyBGaWx0ZXJcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGwoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ0ZpbHRlcigpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFic0NoYW5nZSgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFibGVTb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIHJlbG9hZENvdW50UmVwb3J0XG4gICAqXG4gICAqL1xuICByZWxvYWRDb3VudFJlcG9ydCgpIHtcblxuICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci5maWx0ZXJzICYmIHRoaXMuZmlsdGVyLmxvYWRDb3VudFJlcG9ydCkge1xuXG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZW5kcG9pbnRbdGhpcy5lbmRwb2ludC5sZW5ndGggLSAxXSA9PT0gJy8nID8gYCR7dGhpcy5lbmRwb2ludH1jb3VudGAgOiBgJHt0aGlzLmVuZHBvaW50fS9jb3VudGA7XG5cbiAgICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmZpbHRlci5maWx0ZXJzO1xuXG4gICAgICBjb25zdCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzID0gdGhpcy5nZXRDb3VudGFibGVGaWx0ZXJzKGZpbHRlcnMpO1xuXG4gICAgICB0aGlzLnNlcnZpY2UucG9zdChlbmRwb2ludCwgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcylcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICB0aGlzLmNvdW50UmVwb3J0ID0gdGhpcy5tb3VudENvdW50UmVwb3J0KHJlcyk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIuY291bnRSZXBvcnQgPSB0aGlzLmNvdW50UmVwb3J0O1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogcmVtb3ZlSXRlbVxuICAgKlxuICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgbGlzdFxuICAgKi9cbiAgcmVtb3ZlSXRlbShpZCkge1xuXG4gICAgY29uc3QgaXRlbSA9IHRoaXMucm93cy5maW5kKF9pdGVtID0+IF9pdGVtLmlkID09PSBpZCk7XG5cbiAgICBpZiAoaXRlbSkge1xuXG4gICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLnJvd3MuaW5kZXhPZihpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1JbmRleCA+PSAwKSB7XG5cbiAgICAgICAgdGhpcy5yb3dzLnNwbGljZShpdGVtSW5kZXgsIDEpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbmRwb2ludCkge1xuXG4gICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlc3RhcnRcbiAgICpcbiAgICogQ2xlYXIgdGhlIGxpc3QgYW5kIHJlbG9hZCB0aGUgZmlyc3QgcGFnZVxuICAgKi9cbiAgcmVzdGFydCgpIHtcblxuICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKTtcblxuICB9XG5cbiAgLypcbiAgICogc2hvd01vcmVcbiAgICpcbiAgICovXG4gIHNob3dNb3JlKCkge1xuXG4gICAgcmV0dXJuIHRoaXMubG9hZFJlcG9ydCgpO1xuXG4gIH1cblxuICAvKlxuICAgKiBzZWFyY2hDb2xsYXBzYWJsZVxuICAgKlxuICAgKiBzZWFyY2ggYnkgY29sbGFwc2FibGUgZmlsdGVyXG4gICAqL1xuICBzZWFyY2hDb2xsYXBzYWJsZShmaWx0ZXI6IERlY0xpc3RGaWx0ZXIpIHtcblxuICAgIGlmICh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgIT09IGZpbHRlci51aWQpIHtcblxuICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UoZmlsdGVyLnVpZCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHRhYmxlQW5kR3JpZEFyZVNldFxuICAgKlxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGVyZSBhcmUgYm90aCBHUklEIGFuZCBUQUJMRSBkZWZpbml0aW9uIGluc2lkZSB0aGUgbGlzdFxuICAgKi9cbiAgdGFibGVBbmRHcmlkQXJlU2V0KCkge1xuICAgIHJldHVybiB0aGlzLmdyaWQgJiYgdGhpcy50YWJsZTtcbiAgfVxuXG4gIC8qXG4gICAqIHRvZ2dsZUxpc3RNb2RlXG4gICAqXG4gICAqIENoYW5nZXMgYmV0d2VlbiBHUklEIGFuZCBUQUJMRSB2aXN1YWxpemF0b2luIG1vZGVzXG4gICAqL1xuICB0b2dnbGVMaXN0TW9kZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID09PSAnZ3JpZCcgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gICAgaWYgKHRoaXMubGlzdE1vZGUgPT09ICd0YWJsZScpIHtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgdGhpcy50YWJsZS50YWJsZUNvbXBvbmVudC5yZWNhbGN1bGF0ZSgpO1xuXG4gICAgICB9LCAxKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogZ2V0Q29sbGFwc2FibGVDb3VudFxuICAgKlxuICAgKiBnZXQgQ29sbGFwc2FibGUgQ291bnQgZnJvbSBjb3VudFJlcG9ydFxuICAgKi9cbiAgZ2V0Q29sbGFwc2FibGVDb3VudCh1aWQpIHtcblxuICAgIHRyeSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmNvdW50UmVwb3J0W3RoaXMuc2VsZWN0ZWRUYWJdLmNoaWxkcmVuW3VpZF0uY291bnQ7XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICByZXR1cm4gJz8nO1xuXG4gICAgfVxuXG5cbiAgfVxuXG4gIC8qXG4gICBnZXRMaXN0TW9kZVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRMaXN0TW9kZSA9ICgpID0+IHtcblxuICAgIGxldCBsaXN0TW9kZSA9IHRoaXMubGlzdE1vZGU7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZFRhYiAmJiB0aGlzLnNlbGVjdGVkVGFiLmxpc3RNb2RlKSB7XG5cbiAgICAgICAgbGlzdE1vZGUgPSB0aGlzLnNlbGVjdGVkVGFiLmxpc3RNb2RlO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxpc3RNb2RlID0gdGhpcy50YWJsZSA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBsaXN0TW9kZTtcblxuICB9XG5cbiAgLypcbiAgIG1vdW50Q291bnRSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgbW91bnRDb3VudFJlcG9ydChmaWx0ZXJzQ291bnRlcnMpOiBDb3VudFJlcG9ydCB7XG5cbiAgICBjb25zdCBjb3VudFJlcG9ydDogQ291bnRSZXBvcnQgPSB7XG4gICAgICBjb3VudDogMFxuICAgIH07XG5cbiAgICBmaWx0ZXJzQ291bnRlcnMuZm9yRWFjaChpdGVtID0+IHtcblxuICAgICAgY291bnRSZXBvcnRbaXRlbS51aWRdID0ge1xuXG4gICAgICAgIGNvdW50OiBpdGVtLmNvdW50XG5cbiAgICAgIH07XG5cbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgY291bnRSZXBvcnRbaXRlbS51aWRdLmNoaWxkcmVuID0gdGhpcy5tb3VudENvdW50UmVwb3J0KGl0ZW0uY2hpbGRyZW4pO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudFJlcG9ydDtcblxuICB9XG5cbiAgLypcbiAgICogZ2V0Q291bnRhYmxlRmlsdGVyc1xuICAgKlxuICAgKiBHZXQgdGhlIHNlYXJjaCBmaWx0ZXIsIHRybnNmb3JtZSB0aGUgc2VhcmNoIHBhcmFtcyBpbnRvIHRoZSBzZWFyY2hhYmxlIHByb3BlcnRpZXMgYW5kIGluamVjdCBpdCBpbiBldmVyeSBmaWx0ZXIgY29uZmlndXJlZCBpbiBkZWMtZmlsdGVyc1xuICAgKlxuICAgKiBUaGUgcmVzdWx0IGlzIHVzZWQgdG8gY2FsbCB0aGUgY291bnQgZW5kcG9pbnQgYW5kIHJldHVybiB0aGUgYW1vdW50IG9mIHJlY2NvcmRzIGZvdW5kIGluIGV2ZXJ5IHRhYi9jb2xsYXBzZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRDb3VudGFibGVGaWx0ZXJzKGZpbHRlcnMpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgfHwgW3tmaWx0ZXJzOiBbXX1dO1xuXG4gICAgY29uc3QgZmlsdGVyc1BsdXNTZWFyY2ggPSBmaWx0ZXJzLm1hcChkZWNGaWx0ZXIgPT4ge1xuXG4gICAgICBjb25zdCBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGVjRmlsdGVyKSk7XG5cbiAgICAgIGlmIChkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzKSB7XG5cbiAgICAgICAgY29uc3QgdGFiRmlsdGVyc0NvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMpKTtcblxuICAgICAgICBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWx0ZXJHcm91cHNXaXRob3V0VGFicykpO1xuXG4gICAgICAgIGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMuZm9yRWFjaChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzLnB1c2goLi4udGFiRmlsdGVyc0NvcHkpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2UgaWYgKGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4gPSB0aGlzLmdldENvdW50YWJsZUZpbHRlcnMoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4pO1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVpZDogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2gudWlkLFxuICAgICAgICBmaWx0ZXJzOiBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzLFxuICAgICAgICBjaGlsZHJlbjogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4sXG4gICAgICB9O1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5lbnN1cmVGaWx0ZXJWYWx1ZXNBc0FycmF5KGZpbHRlcnNQbHVzU2VhcmNoKTtcblxuICB9XG5cbiAgLypcbiAgICogZW5zdXJlRmlsdGVyVmFsdWVzQXNBcnJheVxuICAgKlxuICAgKiBHZXQgYW4gYXJyYXkgb2YgZmlsdGVyZ3JvdXBzIGFuZCBzZXQgdGhlIGZpbHRlciB2YWx1ZXMgdG8gYXJyYXkgaWYgbm90XG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVuc3VyZUZpbHRlclZhbHVlc0FzQXJyYXkoZmlsdGVyR3JvdXBzOiBhbnkgPSBbXSkge1xuXG4gICAgcmV0dXJuIGZpbHRlckdyb3Vwcy5tYXAoZGVjTGlzdEZpbHRlciA9PiB7XG5cbiAgICAgIGlmIChkZWNMaXN0RmlsdGVyLmZpbHRlcnMpIHtcblxuICAgICAgICB0aGlzLmFwcGVuZEZpbHRlckdyb3Vwc0Jhc2VkT25TZWFyY2hhYmxlUHJvcGVydGllcyhkZWNMaXN0RmlsdGVyLmZpbHRlcnMpO1xuXG4gICAgICAgIGRlY0xpc3RGaWx0ZXIuZmlsdGVycyA9IGRlY0xpc3RGaWx0ZXIuZmlsdGVycy5tYXAoZmlsdGVyR3JvdXAgPT4ge1xuXG5cbiAgICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzID0gZmlsdGVyR3JvdXAuZmlsdGVycy5tYXAoZmlsdGVyID0+IHtcblxuICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gQXJyYXkuaXNBcnJheShmaWx0ZXIudmFsdWUpID8gZmlsdGVyLnZhbHVlIDogW2ZpbHRlci52YWx1ZV07XG5cbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBmaWx0ZXJHcm91cDtcblxuICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVjTGlzdEZpbHRlcjtcblxuICAgIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBhY3RCeVNjcm9sbFBvc2l0aW9uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGRldGVjdCBpZiB0aGVyZSBpcyBzY3Jvb2xpbmcgYWN0aW9uIG9uIHdpbmRvdyB0byBmZXRjaCBhbmQgc2hvdyBtb3JlIHJvd3Mgd2hlbiB0aGUgc2Nyb2xsaW5nIGRvd24uXG4gICAqL1xuICBwcml2YXRlIGFjdEJ5U2Nyb2xsUG9zaXRpb24gPSAoJGV2ZW50KSA9PiB7XG5cbiAgICBpZiAoJGV2ZW50WydwYXRoJ10pIHtcblxuICAgICAgY29uc3QgZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MgPSAkZXZlbnRbJ3BhdGgnXS5maW5kKHBhdGggPT4ge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHBhdGhbJ2NsYXNzTmFtZSddIHx8ICcnO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZU92ZXJsYXkgPSBjbGFzc05hbWUuaW5kZXhPZignY2RrLW92ZXJsYXknKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZUZ1bGxzY3JlYW5EaWFsb2dDb250YWluZXIgPSBjbGFzc05hbWUuaW5kZXhPZignZnVsbHNjcmVhbi1kaWFsb2ctY29udGFpbmVyJykgPj0gMDtcblxuICAgICAgICByZXR1cm4gaW5zaWRlT3ZlcmxheSB8fCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyO1xuXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFlbGVtZW50V2l0aENka092ZXJsYXlDbGFzcykgeyAvLyBhdm9pZCBjbG9zaW5nIGZpbHRlciBmcm9tIGFueSBvcGVuIGRpYWxvZ1xuXG4gICAgICAgIGlmICghdGhpcy5pc0xhc3RQYWdlKSB7XG5cbiAgICAgICAgICBjb25zdCB0YXJnZXQ6IGFueSA9ICRldmVudFsndGFyZ2V0J107XG5cbiAgICAgICAgICBjb25zdCBsaW1pdCA9IHRhcmdldC5zY3JvbGxIZWlnaHQgLSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKHRhcmdldC5zY3JvbGxUb3AgPj0gKGxpbWl0IC0gMTYpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd01vcmUoKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlXG4gICAqXG4gICBnZXRMaXN0TW9kZSBpbnB1dFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZSgpIHtcblxuICAgIHRoaXMuZ2V0TGlzdE1vZGUoKTtcblxuICB9XG5cbiAgLypcbiAgICogZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKVxuICAgKlxuICAgKiBTZXQgdGhlIGxpc3QgbW9kZSBiYXNlZCBvbiBkZWNsYXJhdGlvbiBvZiB0YWJsZSBhbmQgZ3JpZC4gVGhpcyBpcyBuZWNlc3NhcnkgdG8gYm9vdGFzdHJhcCB0aGUgY29tcG9uZW50IHdpdGggb25seSBncmlkIG9yIG9ubHkgdGFibGVcbiAgICogVGhpcyBvbmx5IHdvcmsgaWYgbm8gbW9kZSBpcyBwcm92aWRlZCBieSBASW5wdXQgb3RoZXJ3aXNlIHRoZSBASW5wdXQgdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAqL1xuICBwcml2YXRlIGRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKCkge1xuXG4gICAgdGhpcy5saXN0TW9kZSA9IHRoaXMubGlzdE1vZGUgPyB0aGlzLmxpc3RNb2RlIDogdGhpcy50YWJsZSA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGVtaXRTY3JvbGxFdmVudFxuICAgKlxuICAgKiBFbWl0cyBzY3JvbGwgZXZlbnQgd2hlbiBub3QgbG9hZGluZ1xuICAgKi9cbiAgcHJpdmF0ZSBlbWl0U2Nyb2xsRXZlbnQgPSAoJGV2ZW50KSA9PiB7XG5cbiAgICBpZiAoIXRoaXMubG9hZGluZykge1xuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyLmVtaXQoJGV2ZW50KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogaXNUYWJzRmlsdGVyRGVmaW5lZFxuICAgKlxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgVGFicyBGaWx0ZXIgaXMgZGVmaW5lZCBpbnNpZGUgdGhlIGxpc3RcbiAgICovXG4gIHByaXZhdGUgaXNUYWJzRmlsdGVyRGVmaW5lZCgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudDtcbiAgfVxuXG4gIC8qXG4gICAqIGRvRmlyc3RMb2FkXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhZnRlciB0aGUgdmlldyBhbmQgaW5wdXRzIGFyZSBpbml0aWFsaXplZFxuICAgKlxuICAgKiBUaGlzIGlzIHRoZSBmaXJzdCBjYWxsIHRvIGdldCBkYXRhXG4gICAqL1xuICBwcml2YXRlIGRvRmlyc3RMb2FkKCkge1xuICAgIGlmICh0aGlzLmlzVGFic0ZpbHRlckRlZmluZWQoKSkge1xuICAgICAgdGhpcy5kb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvRmlyc3RMb2FkTG9jYWxseSh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlclxuICAgKlxuICAgKiB1c2UgdGhlIHRhYnMgZmlsdGVyIHRvIHRyaWdnZXIgdGhlIGZpcnN0IGxvYWRcbiAgICpcbiAgICogVGhpcyB3YXkgdGhlIGRlZmF1bHQgdGFiIGFuZCBmaWx0ZXIgYXJlIHNlbGVjdGVkIGJ5IHRoZSBkZWN0YWJzRmlsdGVyIGNvbXBvbmVudFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZEJ5VGFic0ZpbHRlcigpIHtcbiAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LmRvRmlyc3RMb2FkKCk7XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZExvY2FsbHlcbiAgICpcbiAgICogSWYgbm8gZmlsdGVyIGFyZSBkZWZpbmVkLCBqdXN0IGNhbGwgdGggZWVuZHBvaW50IHdpdGhvdXQgZmlsdGVyc1xuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZExvY2FsbHkocmVmcmVzaCkge1xuICAgIHRoaXMubG9hZFJlcG9ydChyZWZyZXNoKTtcbiAgfVxuXG4gIC8qXG4gICAqIGVuc3VyZVVuaXF1ZU5hbWVcbiAgICpcbiAgICogV2UgbXVzdCBwcm92aWRlIGFuIHVuaXF1ZSBuYW1lIHRvIHRoZSBsaXN0IHNvIHdlIGNhbiBwZXJzaXN0IGl0cyBzdGF0ZSBpbiB0aGUgVVJMIHdpdGhvdXQgY29uZmxpY3RzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVuc3VyZVVuaXF1ZU5hbWUoKSB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gJ0xpc3RDb21wb25lbnRFcnJvcjogVGhlIGxpc3QgY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZSB0byBiZSB1c2VkIGluIHVybCBmaWx0ZXIuJ1xuICAgICAgKyAnIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50Lic7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRCeU9wZW5uZWRDb2xsYXBzZVxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyB0cmlnZ2VyZWQgd2hlbiBhIGNvbGxhcHNhYmxlIHRhYmxlIGlzIG9wZW4uXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGxvYWRCeU9wZW5uZWRDb2xsYXBzZShmaWx0ZXJVaWQpIHtcblxuICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzLmNoaWxkcmVuLmZpbmQoaXRlbSA9PiBpdGVtLnVpZCA9PT0gZmlsdGVyVWlkKTtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwOiBGaWx0ZXJHcm91cCA9IHsgZmlsdGVyczogZmlsdGVyLmZpbHRlcnMgfTtcblxuICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlLCBmaWx0ZXJHcm91cCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlID0gZmlsdGVyLnVpZDtcblxuICAgIH0sIDApO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRSZXBvcnRcbiAgICpcbiAgICogVGhpcyBtZWh0b2QgZ2F0aGVyIHRoZSBmaWx0ZXIgaW5mbyBhbmQgZW5kcG9pbnQgYW5kIGNhbGwgdGhlIGJhY2stZW5kIHRvIGZldGNoIHRoZSBkYXRhXG4gICAqXG4gICAqIElmIHRoZSBzdWN0b21GZXRjaE1ldGhvZCBpcyB1c2VkLCBpdHMgY2FsbCBpdFxuICAgKlxuICAgKiBJZiBvbmx5IHRoZSByb3dzIGFyZSBwYXNzZWQsIHRoZSBtZXRob2QganVzdCB1c2UgaXQgYXMgcmVzdWx0XG4gICAqL1xuICBwcml2YXRlIGxvYWRSZXBvcnQoY2xlYXJBbmRSZWxvYWRSZXBvcnQ/OiBib29sZWFuLCBjb2xsYXBzZUZpbHRlckdyb3Vwcz86IEZpbHRlckdyb3VwKTogUHJvbWlzZTxhbnk+IHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgaWYgKGNsZWFyQW5kUmVsb2FkUmVwb3J0ICYmIHRoaXMucm93cykge1xuXG4gICAgICAgIHRoaXMuc2V0Um93cyh0aGlzLnJvd3MpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xlYXJBbmRSZWxvYWRSZXBvcnQgPSBjbGVhckFuZFJlbG9hZFJlcG9ydDtcblxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMuZW5kcG9pbnQpIHtcblxuICAgICAgICB0aGlzLm1vdW50UGF5bG9hZChjbGVhckFuZFJlbG9hZFJlcG9ydCwgY29sbGFwc2VGaWx0ZXJHcm91cHMpXG4gICAgICAgIC50aGVuKHBheWxvYWQgPT4ge1xuXG4gICAgICAgICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZDtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YS5uZXh0KHsgZW5kcG9pbnQ6IHRoaXMuZW5kcG9pbnQsIHBheWxvYWQ6IHRoaXMucGF5bG9hZCwgY2JrOiByZXMsIGNsZWFyOiBjbGVhckFuZFJlbG9hZFJlcG9ydCB9KTtcblxuICAgICAgICB9KTtcblxuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QpIHtcblxuICAgICAgICB0aGlzLmZpbHRlckRhdGEubmV4dCgpO1xuXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnJvd3MpIHtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgIGlmICghdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgICAgIHJlaignTm8gZW5kcG9pbnQsIGN1c3RvbUZldGNoTWV0aG9kIG9yIHJvd3Mgc2V0Jyk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICB9LCAxKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgbW91bnRQYXlsb2FkKGNsZWFyQW5kUmVsb2FkUmVwb3J0OiBib29sZWFuID0gZmFsc2UsIGNvbGxhcHNlRmlsdGVyR3JvdXBzPykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgY29uc3Qgc2VhcmNoRmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXIgPyB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHMgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGNvbnN0IGZpbHRlckdyb3VwcyA9IHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzVG9FYWNoRmlsdGVyR3JvdXAoc2VhcmNoRmlsdGVyR3JvdXBzLCBjb2xsYXBzZUZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIGNvbnN0IHBheWxvYWQ6IERlY0ZpbHRlciA9IHt9O1xuXG4gICAgICBwYXlsb2FkLmxpbWl0ID0gdGhpcy5saW1pdDtcblxuICAgICAgaWYgKGZpbHRlckdyb3Vwcykge1xuXG4gICAgICAgIHBheWxvYWQuZmlsdGVyR3JvdXBzID0gZmlsdGVyR3JvdXBzO1xuXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbHVtbnNTb3J0Q29uZmlnKSB7XG5cbiAgICAgICAgcGF5bG9hZC5zb3J0ID0gdGhpcy5jb2x1bW5zU29ydENvbmZpZztcblxuICAgICAgfVxuXG4gICAgICBpZiAoIWNsZWFyQW5kUmVsb2FkUmVwb3J0ICYmIHRoaXMucmVwb3J0KSB7XG5cbiAgICAgICAgcGF5bG9hZC5wYWdlID0gdGhpcy5yZXBvcnQucGFnZSArIDE7XG5cbiAgICAgICAgcGF5bG9hZC5saW1pdCA9IHRoaXMucmVwb3J0LmxpbWl0O1xuXG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUocGF5bG9hZCk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogYXBwZW5kRmlsdGVyR3JvdXBzVG9FYWNoRmlsdGVyR3JvdXBcbiAgICpcbiAgICogR2V0cyBhbiBhcnJheSBvZiBmaWx0ZXJHcm91cCBhbmQgaW4gZWFjaCBmaWx0ZXJHcm91cCBpbiB0aGlzIGFycmF5IGFwcGVuZHMgdGhlIHNlY29uZCBmaWx0ZXJHcm91cCBmaWx0ZXJzLlxuICAgKi9cbiAgcHJpdmF0ZSBhcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHM6IEZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUb0FwcGVuZDogRmlsdGVyR3JvdXApIHtcblxuICAgIGlmIChmaWx0ZXJHcm91cFRvQXBwZW5kKSB7XG5cbiAgICAgIGlmIChmaWx0ZXJHcm91cHMgJiYgZmlsdGVyR3JvdXBzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMuZm9yRWFjaChncm91cCA9PiB7XG5cbiAgICAgICAgICBncm91cC5maWx0ZXJzLnB1c2goLi4uZmlsdGVyR3JvdXBUb0FwcGVuZC5maWx0ZXJzKTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMgPSBbZmlsdGVyR3JvdXBUb0FwcGVuZF07XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMgfHwgW107XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lc1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIubmFtZSA9IHRoaXMubmFtZTtcblxuXG4gICAgICBpZiAodGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQubmFtZSA9IHRoaXMubmFtZTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21GZXRjaE1ldGhvZCkge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5jdXN0b21GZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2Q7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VydmljZSA9IHRoaXMuc2VydmljZTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldFJvd3NcbiAgICpcbiAgICogU2V0cyB0aGUgY3VycmVudCB0YWJsZSByb3dzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldFJvd3Mocm93cyA9IFtdKSB7XG5cbiAgICB0aGlzLnJlcG9ydCA9IHtcblxuICAgICAgcGFnZTogMSxcblxuICAgICAgcmVzdWx0OiB7XG5cbiAgICAgICAgcm93czogcm93cyxcblxuICAgICAgICBjb3VudDogcm93cy5sZW5ndGhcblxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmRldGVjdExhc3RQYWdlKHJvd3MsIHJvd3MubGVuZ3RoKTtcblxuICAgIHRoaXMudXBkYXRlQ29udGVudENoaWxkcmVuKCk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFNjcm9sbEV2ZW50RW1pdHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFNjcm9sbEV2ZW50RW1pdHRlcigpIHtcblxuICAgIHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyXG4gICAgLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMTUwKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICApLnN1YnNjcmliZSh0aGlzLmFjdEJ5U2Nyb2xsUG9zaXRpb24pO1xuXG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyKCkge1xuXG4gICAgaWYgKHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb24pIHtcblxuICAgICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlckRhdGFcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hGaWx0ZXJEYXRhKCkge1xuICAgIHRoaXMucmVhY3RpdmVSZXBvcnQgPSB0aGlzLmZpbHRlckRhdGFcbiAgICAucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgxNTApLCAvLyBhdm9pZCBtdWlsdGlwbGUgcmVxdWVzdCB3aGVuIHRoZSBmaWx0ZXIgb3IgdGFiIGNoYW5nZSB0b28gZmFzdFxuICAgICAgc3dpdGNoTWFwKChmaWx0ZXJEYXRhOiBGaWx0ZXJEYXRhKSA9PiB7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55Pih1bmRlZmluZWQpO1xuXG4gICAgICAgIGNvbnN0IGZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2QgPSB0aGlzLmN1c3RvbUZldGNoTWV0aG9kIHx8IHRoaXMuc2VydmljZS5nZXQ7XG5cbiAgICAgICAgY29uc3QgZW5kcG9pbnQgPSBmaWx0ZXJEYXRhID8gZmlsdGVyRGF0YS5lbmRwb2ludCA6IHVuZGVmaW5lZDtcblxuICAgICAgICBjb25zdCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzID0gdGhpcy5nZXRQYXlsb2FkV2l0aFNlYXJjaFRyYW5zZm9ybWVkSW50b1NlYXJjaGFibGVQcm9wZXJ0aWVzKHRoaXMucGF5bG9hZCk7XG5cbiAgICAgICAgaWYgKGZpbHRlckRhdGEgJiYgZmlsdGVyRGF0YS5jbGVhcikge1xuICAgICAgICAgIHRoaXMuc2V0Um93cyhbXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmZXRjaE1ldGhvZChlbmRwb2ludCwgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcylcbiAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuXG4gICAgICAgICAgb2JzZXJ2YWJsZS5uZXh0KHJlcyk7XG5cbiAgICAgICAgICBpZiAoZmlsdGVyRGF0YSAmJiBmaWx0ZXJEYXRhLmNiaykge1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gd2FpdCBmb3Igc3Vic2NyaWJlcnMgdG8gcmVmcmVzaCB0aGVpciByb3dzXG5cbiAgICAgICAgICAgICAgZmlsdGVyRGF0YS5jYmsobmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuXG4gICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgICAgfSlcblxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCk7XG4gIH1cblxuICBwcml2YXRlIGdldFBheWxvYWRXaXRoU2VhcmNoVHJhbnNmb3JtZWRJbnRvU2VhcmNoYWJsZVByb3BlcnRpZXMocGF5bG9hZCkge1xuXG4gICAgY29uc3QgcGF5bG9hZENvcHkgPSB7Li4ucGF5bG9hZH07XG5cbiAgICBpZiAocGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzICYmIHRoaXMuc2VhcmNoYWJsZVByb3BlcnRpZXMpIHtcblxuICAgICAgcGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzID0gWy4uLnBheWxvYWQuZmlsdGVyR3JvdXBzXTtcblxuICAgICAgdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMocGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzKTtcblxuICAgICAgcmV0dXJuIHBheWxvYWRDb3B5O1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIHRoaXMucGF5bG9hZDtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoID0gdGhpcy5nZXRGaWx0ZXJHcm91cFRoYXRDb250YWluc1RoZUJhc2ljU2VhcmNoKGZpbHRlckdyb3Vwcyk7XG5cbiAgICBpZiAoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCkge1xuXG4gICAgICB0aGlzLnJlbW92ZUZpbHRlckdyb3VwKGZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCk7XG5cbiAgICAgIGNvbnN0IGJhc2ljU2VhcmNoID0gZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci5wcm9wZXJ0eSA9PT0gJ3NlYXJjaCcpO1xuXG4gICAgICBjb25zdCBiYXNpY1NlYXJjaEluZGV4ID0gZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzLmluZGV4T2YoYmFzaWNTZWFyY2gpO1xuXG4gICAgICB0aGlzLnNlYXJjaGFibGVQcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG5ld0ZpbHRlckdyb3VwOiBGaWx0ZXJHcm91cCA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBbLi4uZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzXVxuICAgICAgICB9O1xuXG4gICAgICAgIG5ld0ZpbHRlckdyb3VwLmZpbHRlcnNbYmFzaWNTZWFyY2hJbmRleF0gPSB7XG4gICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgIHZhbHVlOiBbYmFzaWNTZWFyY2gudmFsdWVdXG4gICAgICAgIH07XG5cbiAgICAgICAgZmlsdGVyR3JvdXBzLnB1c2gobmV3RmlsdGVyR3JvdXApO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2hJbmRleCA9IGZpbHRlckdyb3Vwcy5pbmRleE9mKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgZmlsdGVyR3JvdXBzLnNwbGljZShmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoSW5kZXgsIDEpO1xuXG4gIH1cblxuICBwcml2YXRlIGdldEZpbHRlckdyb3VwVGhhdENvbnRhaW5zVGhlQmFzaWNTZWFyY2goZmlsdGVyR3JvdXBzKSB7XG5cbiAgICByZXR1cm4gZmlsdGVyR3JvdXBzLmZpbmQoZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICBjb25zdCBiYXNpY1NlcmNoRmlsdGVyID0gZmlsdGVyR3JvdXAuZmlsdGVycyA/IGZpbHRlckdyb3VwLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnByb3BlcnR5ID09PSAnc2VhcmNoJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybiBiYXNpY1NlcmNoRmlsdGVyID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpIHtcbiAgICB0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uID0gdGhpcy5yZWFjdGl2ZVJlcG9ydFxuICAgIC5waXBlKFxuICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhICYmIGRhdGEucmVzdWx0ICYmIGRhdGEucmVzdWx0LnJvd3MpIHtcblxuICAgICAgICBpZiAoIXRoaXMuY2xlYXJBbmRSZWxvYWRSZXBvcnQpIHtcbiAgICAgICAgICBkYXRhLnJlc3VsdC5yb3dzID0gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MuY29uY2F0KGRhdGEucmVzdWx0LnJvd3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXBvcnQgPSBkYXRhO1xuXG4gICAgICAgIHRoaXMucG9zdFNlYXJjaC5lbWl0KGRhdGEpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29udGVudENoaWxkcmVuKCk7XG5cbiAgICAgICAgdGhpcy5kZXRlY3RMYXN0UGFnZShkYXRhLnJlc3VsdC5yb3dzLCBkYXRhLnJlc3VsdC5jb3VudCk7XG5cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdExhc3RQYWdlKHJvd3MsIGNvdW50KSB7XG5cbiAgICBjb25zdCBudW1iZXJPZnJvd3MgPSByb3dzLmxlbmd0aDtcblxuICAgIGNvbnN0IGVtcHRMaXN0ID0gbnVtYmVyT2Zyb3dzID09PSAwO1xuXG4gICAgY29uc3Qgc2luZ2xlUGFnZUxpc3QgPSBudW1iZXJPZnJvd3MgPT09IGNvdW50O1xuXG4gICAgdGhpcy5pc0xhc3RQYWdlID0gZW1wdExpc3QgfHwgc2luZ2xlUGFnZUxpc3Q7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKSB7XG4gICAgaWYgKHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB1cGRhdGVDb250ZW50Q2hpbGRyZW5cbiAgICpcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlQ29udGVudENoaWxkcmVuKCkge1xuXG4gICAgY29uc3Qgcm93cyA9IHRoaXMuZW5kcG9pbnQgPyB0aGlzLnJlcG9ydC5yZXN1bHQucm93cyA6IHRoaXMucm93cztcbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLmdyaWQucm93cyA9IHJvd3M7XG4gICAgfVxuICAgIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICB0aGlzLnRhYmxlLnJvd3MgPSByb3dzO1xuICAgIH1cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyLmNvdW50ID0gdGhpcy5yZXBvcnQucmVzdWx0LmNvdW50O1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHJlZ2lzdGVyQ2hpbGRXYXRjaGVyc1xuICAgKlxuICAgKiBXYXRjaCBmb3IgY2hpbGRyZW4gb3V0cHV0c1xuICAgKi9cbiAgcHJpdmF0ZSByZWdpc3RlckNoaWxkV2F0Y2hlcnMoKSB7XG5cbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLndhdGNoR3JpZFJvd0NsaWNrKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMud2F0Y2hUYWJsZVJvd0NsaWNrKCk7XG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEdyaWRSb3dDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEdyaWRSb3dDbGljaygpIHtcbiAgICB0aGlzLmdyaWQucm93Q2xpY2suc3Vic2NyaWJlKCgkZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucm93Q2xpY2suZW1pdCgkZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hUYWJsZVJvd0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFibGVSb3dDbGljaygpIHtcbiAgICB0aGlzLnRhYmxlLnJvd0NsaWNrLnN1YnNjcmliZSgoJGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJvd0NsaWNrLmVtaXQoJGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlci5zZWFyY2guc3Vic2NyaWJlKGV2ZW50ID0+IHtcblxuICAgICAgICBjb25zdCB0YWJDaGFuZ2VkID0gdGhpcy5wcmV2aW91c1NlbGVjdGVkVGFiICE9PSB0aGlzLnNlbGVjdGVkVGFiO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlck1vZGVDaGFuZ2VkID0gdGhpcy5maWx0ZXJNb2RlICE9PSBldmVudC5maWx0ZXJNb2RlO1xuXG4gICAgICAgIGlmICh0YWJDaGFuZ2VkKSB7XG5cbiAgICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRUYWIgPSB0aGlzLnNlbGVjdGVkVGFiO1xuXG4gICAgICAgICAgdGhpcy5zZXRSb3dzKFtdKTsgLy8gaWYgY2hhbmdpbmcgdGFicywgY2xlYXIgdGhlIHJlc3VsdHMgYmVmb3JlIHNob3dpbmcgdGhlIHJvd3MgYmVjYXVzZSBpdCBpcyBkb25lIG9ubHkgYWZ0ZXIgZmV0Y2hpbmcgdGhlIGRhdGFcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbHRlck1vZGVDaGFuZ2VkKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSBldmVudC5maWx0ZXJNb2RlO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJNb2RlID09PSAndGFicycpIHtcblxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpLnRoZW4oKHJlcykgPT4ge1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQucmVjb3VudCkge1xuXG4gICAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGlmICghdGhpcy5jb3VudFJlcG9ydCB8fCBldmVudC5yZWNvdW50KSB7XG5cbiAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgJiYgIXRhYkNoYW5nZWQpIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzYWJsZUZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgIHRhYjogdGhpcy5zZWxlY3RlZFRhYixcbiAgICAgICAgICAgICAgY2hpbGRyZW46IGV2ZW50LmNoaWxkcmVuID8gZXZlbnQuY2hpbGRyZW4gOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hTY3JvbGwoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbGFibGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzKVswXTtcbiAgICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9LCAxKTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lcikge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFic0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VsZWN0ZWRUYWI7XG4gICAgICB0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnRhYkNoYW5nZS5zdWJzY3JpYmUodGFiID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcbiAgICAgICAgdGhpcy5kZXRlY3RMaXN0TW9kZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9UYWJzQ2hhbmdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hUYWJsZVNvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVNvcnQoKSB7XG4gICAgaWYgKHRoaXMudGFibGUpIHtcblxuICAgICAgdGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnRhYmxlLnNvcnQuc3Vic2NyaWJlKGNvbHVtbnNTb3J0Q29uZmlnID0+IHtcblxuICAgICAgICBpZiAodGhpcy5jb2x1bW5zU29ydENvbmZpZyAhPT0gY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgICAgIHRoaXMuY29sdW1uc1NvcnRDb25maWcgPSBjb2x1bW5zU29ydENvbmZpZztcblxuICAgICAgICAgIGlmICh0aGlzLmNvbGxhcHNhYmxlRmlsdGVycykge1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRCeU9wZW5uZWRDb2xsYXBzZSh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtdGFibGUtY29sdW1uL2xpc3QtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNMaXN0VGFibGVDb21wb25lbnQsXG4gICAgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjTGlzdFRhYmxlQ29tcG9uZW50LFxuICAgIERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYmxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWZvb3RlcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RGb290ZXJDb21wb25lbnQge31cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtYWR2YW5jZWQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBZHZhbmNlZEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWFjdGlvbnMnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD4+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNMaXN0QWN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1hY3Rpb25zLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEFjdGlvbnNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjTGlzdEFjdGlvbnNDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBY3Rpb25zTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRTbmFja0Jhck1vZHVsZSwgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyTW9kdWxlIH0gZnJvbSAnLi9saXN0LWZpbHRlci9saXN0LWZpbHRlci5tb2R1bGUnO1xuXG5pbXBvcnQgeyBEZWNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0R3JpZENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1ncmlkL2xpc3QtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlTW9kdWxlIH0gZnJvbSAnLi9saXN0LXRhYmxlL2xpc3QtdGFibGUubW9kdWxlJztcbmltcG9ydCB7IERlY0xpc3RGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZm9vdGVyL2xpc3QtZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUgfSBmcm9tICcuL2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNTcGlubmVyTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjTGlzdEFjdGlvbnNNb2R1bGUgfSBmcm9tICcuL2xpc3QtYWN0aW9ucy9saXN0LWFjdGlvbnMubW9kdWxlJztcbmltcG9ydCB7IERlY0xhYmVsTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtbGFiZWwvZGVjLWxhYmVsLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGVjTGFiZWxNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRGVjTGlzdEFkdmFuY2VkRmlsdGVyTW9kdWxlLFxuICAgIERlY0xpc3RGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdFRhYmxlTW9kdWxlLFxuICAgIERlY1NwaW5uZXJNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0xpc3RDb21wb25lbnQsXG4gICAgRGVjTGlzdEdyaWRDb21wb25lbnQsXG4gICAgRGVjTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0xpc3RDb21wb25lbnQsXG4gICAgRGVjTGlzdEdyaWRDb21wb25lbnQsXG4gICAgRGVjTGlzdFRhYmxlTW9kdWxlLFxuICAgIERlY0xpc3RGb290ZXJDb21wb25lbnQsXG4gICAgRGVjTGlzdEZpbHRlck1vZHVsZSxcbiAgICBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdEFjdGlvbnNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1wYWdlLWZvcmJpZGVuJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGFnZS1mb3JiaWRlbi13cmFwcGVyXCI+XG4gIDxoMT57eydsYWJlbC5wYWdlLWZvcmJpZGVuJyB8IHRyYW5zbGF0ZX19PC9oMT5cbiAgPHA+e3snbGFiZWwucGFnZS1mb3JiaWRlbi1oZWxwJyB8IHRyYW5zbGF0ZX19PC9wPlxuICA8cD48c21hbGw+UmVmOiB7e3ByZXZpb3VzVXJsfX08L3NtYWxsPjwvcD5cbiAgPGltZyBzcmM9XCJodHRwOi8vczMtc2EtZWFzdC0xLmFtYXpvbmF3cy5jb20vc3RhdGljLWZpbGVzLXByb2QvcGxhdGZvcm0vZGVjb3JhMy5wbmdcIj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5wYWdlLWZvcmJpZGVuLXdyYXBwZXJ7cGFkZGluZy10b3A6MTAwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9aW1ne3dpZHRoOjEwMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1BhZ2VGb3JiaWRlbkNvbXBvbmVudCB7XG5cbiAgcHJldmlvdXNVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgLnBpcGUoXG4gICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKVxuICAgIClcbiAgICAuc3Vic2NyaWJlKChlOiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZG9jdW1lbnQucmVmZXJyZXIgfHwgZS51cmw7XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNQYWdlRm9yYmlkZW5Db21wb25lbnQgfSBmcm9tICcuL3BhZ2UtZm9yYmlkZW4uY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjUGFnZUZvcmJpZGVuQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNQYWdlRm9yYmlkZW5Db21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQYWdlRm9yYmlkZW5Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1wYWdlLW5vdC1mb3VuZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2Utbm90LWZvdW5kLXdyYXBwZXJcIj5cbiAgPGgxPnt7J2xhYmVsLnBhZ2Utbm90LWZvdW5kJyB8IHRyYW5zbGF0ZX19PC9oMT5cbiAgPHA+e3snbGFiZWwucGFnZS1ub3QtZm91bmQtaGVscCcgfCB0cmFuc2xhdGV9fTwvcD5cbiAgPHA+e3twcmV2aW91c1VybH19PC9wPlxuICA8aW1nIHNyYz1cImh0dHA6Ly9zMy1zYS1lYXN0LTEuYW1hem9uYXdzLmNvbS9zdGF0aWMtZmlsZXMtcHJvZC9wbGF0Zm9ybS9kZWNvcmEzLnBuZ1wiPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnBhZ2Utbm90LWZvdW5kLXdyYXBwZXJ7cGFkZGluZy10b3A6MTAwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9aW1ne3dpZHRoOjEwMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1BhZ2VOb3RGb3VuZENvbXBvbmVudCB7XG5cbiAgcHJldmlvdXNVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgcm91dGVyLmV2ZW50c1xuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZClcbiAgICApXG4gICAgLnN1YnNjcmliZSgoZTogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICB0aGlzLnByZXZpb3VzVXJsID0gZS51cmw7XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNQYWdlTm90Rm91bmRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2Utbm90LWZvdW5kLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1BhZ2VOb3RGb3VuZENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUGFnZU5vdEZvdW5kQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUGFnZU5vdEZvdW5kTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlciAgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgRkFMTEJBQ0tfSU1BR0UgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUFtSkxSMFFBLzRlUHpMOEFBQUFKY0VoWmN3QUFDeE1BQUFzVEFRQ2FuQmdBQUFBTFNVUkJWQWpYWTJCZ0FBQUFBd0FCSU5XVXh3QUFBQUJKUlU1JyArXG4nRXJrSmdnZz09JztcblxuY29uc3QgTE9BRElOR19JTUFHRSA9ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlNVFV3SWlCb1pXbG5hSFE5SWpFMU1DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQndjbVZ6WlhKMlpVRnpjR1ZqZEZKaGRHbHZQU0o0VFdsa1dVMXBaQ0lnJyArXG4nWTJ4aGMzTTlJblZwYkMxeWFXNW5JajQ4Y0dGMGFDQm1hV3hzUFNKdWIyNWxJaUJqYkdGemN6MGlZbXNpSUdROUlrMHdJREJvTVRBd2RqRXdNRWd3ZWlJdlBqeGphWEpqYkdVZ1kzZzlJamMxSWlCamVUMGlOelVpSUhJOUlqUTFJaUJ6ZEhKdmEyVXRaR0Z6YUdGeWNtRjVQU0l5TWpZdU1UazFJRFUyTGpVME9TSScgK1xuJ2djM1J5YjJ0bFBTSWpNak15WlRNNElpQm1hV3hzUFNKdWIyNWxJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqRXdJajQ4WVc1cGJXRjBaVlJ5WVc1elptOXliU0JoZEhSeWFXSjFkR1ZPWVcxbFBTSjBjbUZ1YzJadmNtMGlJSFI1Y0dVOUluSnZkR0YwWlNJZ2RtRnNkV1Z6UFNJd0lEYzFJRGMxT3pFNE1DQTNOU0EzTlQnICtcbidzek5qQWdOelVnTnpVN0lpQnJaWGxVYVcxbGN6MGlNRHN3TGpVN01TSWdaSFZ5UFNJeGN5SWdjbVZ3WldGMFEyOTFiblE5SW1sdVpHVm1hVzVwZEdVaUlHSmxaMmx1UFNJd2N5SXZQand2WTJseVkyeGxQand2YzNablBnPT0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtcHJvZHVjdC1zcGluJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicHJvZHVjdC1zcGlubmVyLXdyYXBwZXJcIiAqbmdJZj1cInNjZW5lc1wiPlxuICA8ZGl2IFtuZ1N3aXRjaF09XCJsb2FkaW5nSW1hZ2VzID8gdHJ1ZSA6IGZhbHNlXCI+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCIgY2xhc3M9XCJvdmVybGF5XCI+XG4gICAgICA8IS0tIExvYWRpbmcgc3Bpbm5lciAtLT5cbiAgICAgIDxkaXYgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWltYWdlJzondXJsKCcgKyBsb2FkaW5nSW1hZ2UgKyAnKSd9XCI+e3tsb2FkZXJQZXJjZW50YWdlKCl9fSU8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCIgY2xhc3M9XCJvdmVybGF5XCI+XG5cbiAgICAgIDwhLS0gT3ZlcmxheSBvdmVyIHRoZSBpbWFnZSAoaGFuZCBpY29uKSAtLT5cbiAgICAgIDxpbWcgY2xhc3M9XCJmcmFtZVwiICpuZ0lmPVwiIW9ubHlNb2RhbFwiIHNyYz1cIi8vczMtc2EtZWFzdC0xLmFtYXpvbmF3cy5jb20vc3RhdGljLWZpbGVzLXByb2QvcGxhdGZvcm0vZHJhZy1ob3Jpem9udGFsbHkucG5nXCIgYWx0PVwiXCIgKGNsaWNrKT1cIm9ubHlNb2RhbCA/ICcnIDogc3RhcnQoJGV2ZW50KVwiPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwic3RhcnRlZCA/IHRydWUgOiBmYWxzZVwiPlxuXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIGNsYXNzPVwiZnJhbWVcIj5cbiAgICAgIDwhLS0gSW1hZ2VzIC0tPlxuICAgICAgPGltZyAqbmdGb3I9XCJsZXQgc2NlbmUgb2Ygc2NlbmVzOyBsZXQgaSA9IGluZGV4O1wiXG4gICAgICAgIFtzcmNdPVwic2NlbmVcIlxuICAgICAgICBkcmFnZ2FibGU9XCJmYWxzZVwiXG4gICAgICAgIGNsYXNzPVwibm8tZHJhZyBpbWFnZS1vbmx5XCJcbiAgICAgICAgKGxvYWQpPVwibWFya0FzTG9hZGVkKCRldmVudClcIlxuICAgICAgICBbbmdDbGFzc109XCJmcmFtZVNob3duID09PSBpICYmICFsb2FkaW5nSW1hZ2VzID8gJ2N1cnJlbnQtc2NlbmUnIDogJ25leHQtc2NlbmUnXCI+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCIgY2xhc3M9XCJmcmFtZVwiPlxuXG4gICAgICA8IS0tIFBsYWNlaG9sZGVyIGltYWdlIC0tPlxuICAgICAgPGltZ1xuICAgICAgICBbc3JjXT1cInNjZW5lc1tmcmFtZVNob3duXVwiXG4gICAgICAgIGRyYWdnYWJsZT1cImZhbHNlXCJcbiAgICAgICAgY2xhc3M9XCJuby1kcmFnXCJcbiAgICAgICAgKGNsaWNrKT1cIm9ubHlNb2RhbCA/IG9uT3BlbigkZXZlbnQpIDogc3RhcnQoJGV2ZW50KVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnaW1hZ2Utb25seSc6IG9ubHlNb2RhbH1cIj5cblxuICAgICAgPCEtLSBMb2FkaW5nIHNwaW5uZXIgLS0+XG4gICAgICA8YnV0dG9uXG4gICAgICAqbmdJZj1cInNob3dPcGVuRGlhbG9nQnV0dG9uICYmICFvbmx5TW9kYWxcIlxuICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAoY2xpY2spPVwib25PcGVuKCRldmVudClcIlxuICAgICAgW21hdFRvb2x0aXBdPVwiJ2xhYmVsLm9wZW4nIHwgdHJhbnNsYXRlXCJcbiAgICAgIGNsYXNzPVwiZGlhbG9nLWJ1dHRvblwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNvbG9yPVwiZGVmYXVsdFwiPlxuICAgICAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cIlN3YXAgYmV0d2VlbiBSZWZlcmVuY2UgYW5kIFJlbmRlciBpbWFnZXNcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgPmZ1bGxzY3JlZW48L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5wcm9kdWN0LXNwaW5uZXItd3JhcHBlcntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlcjpob3ZlciAuZnJhbWV7b3BhY2l0eToxfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlcjpob3ZlciAub3ZlcmxheXtkaXNwbGF5Om5vbmV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZXtkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1zaXplOmNvbnRhaW47YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyIGNlbnRlcjtvcGFjaXR5Oi41O3RyYW5zaXRpb246b3BhY2l0eSAuM3MgZWFzZTtjdXJzb3I6bW92ZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lLmltYWdlLW9ubHl7b3BhY2l0eToxO2N1cnNvcjpwb2ludGVyfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUgLmN1cnJlbnQtc2NlbmV7ZGlzcGxheTpibG9ja30ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lIC5uZXh0LXNjZW5le2Rpc3BsYXk6bm9uZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lIGltZ3t3aWR0aDoxMDAlfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAub3ZlcmxheXtwb3NpdGlvbjphYnNvbHV0ZTtwYWRkaW5nOjEwcHg7d2lkdGg6MjAlO21hcmdpbi1sZWZ0OjQwJTttYXJnaW4tdG9wOjQwJTt6LWluZGV4OjE7b3BhY2l0eTouNDt0cmFuc2l0aW9uOm9wYWNpdHkgLjJzIGVhc2V9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZS5sb2FkZXJ7d2lkdGg6NTAlO21hcmdpbjphdXRvfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZGlhbG9nLWJ1dHRvbntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAubG9hZGVyLXBlcmNlbnRhZ2V7cG9zaXRpb246cmVsYXRpdmU7dG9wOjQ3JTt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO29wYWNpdHk6LjV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUHJvZHVjdFNwaW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZyYW1lU2hvd246IG51bWJlcjtcbiAgc2NlbmVzOiBzdHJpbmdbXTtcbiAgbG9hZGluZ0ltYWdlczogYm9vbGVhbjtcbiAgcGxhY2Vob2xkZXJTY2VuZTogc3RyaW5nO1xuICBzdGFydGVkOiBib29sZWFuO1xuICB0b3RhbEltYWdlc0xvYWRlZDogbnVtYmVyO1xuICBsb2FkaW5nSW1hZ2UgPSBMT0FESU5HX0lNQUdFO1xuXG4gIEBJbnB1dCgpIGxvb3BpbmcgPSBmYWxzZTtcbiAgQElucHV0KCkgb25seU1vZGFsID0gZmFsc2U7XG4gIEBJbnB1dCgpIEZBTExCQUNLX0lNQUdFOiBzdHJpbmcgPSBGQUxMQkFDS19JTUFHRTtcbiAgQElucHV0KCkgc3RhcnRJbkNlbnRlciA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93T3BlbkRpYWxvZ0J1dHRvbiA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IHNwaW4oc3BpbjogYW55KSB7XG4gICAgaWYgKHNwaW4pIHtcbiAgICAgIGNvbnN0IHNjZW5lcyA9IHRoaXMubG9hZFNjZW5lcyhzcGluKTtcblxuICAgICAgY29uc3Qgc2NlbmVzQ2hhbmdlZCA9ICF0aGlzLnNjZW5lcyB8fCAoc2NlbmVzICYmIHRoaXMuc2NlbmVzLmpvaW4oKSAhPT0gc2NlbmVzLmpvaW4oKSk7XG5cbiAgICAgIGlmIChzY2VuZXNDaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMucmVzZXRTY2VuZXNEYXRhKHNjZW5lcyk7XG4gICAgICAgIC8vIHRoaXMucmVzZXRTdGFydFBvc2l0aW9uQmFzZWRPbkNvbXBhbnkoc3Bpbiwgc2NlbmVzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3BpbiA9IHNwaW47XG5cbiAgICB9XG4gIH1cblxuICBnZXQgc3BpbigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9zcGluO1xuICB9XG5cbiAgQE91dHB1dCgpIG9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIHNjZW5lc0xlbiA9IDA7XG4gIHByaXZhdGUgbW91c2VEb3duID0gZmFsc2U7XG4gIHByaXZhdGUgbGFzdE1vdXNlRXZlbnQ6IE1vdXNlRXZlbnQ7XG4gIHByaXZhdGUgY29udGFpbmVyV2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBpbnRlcnZhbDogbnVtYmVyO1xuICBwcml2YXRlIHBvc2l0aW9uRGlmZjogbnVtYmVyO1xuICBwcml2YXRlIF9zcGluOiBhbnk7XG5cbiAgLypcbiAgKiBMaXN0ZW5pbmcgZm9yIG1vdXNlIGV2ZW50c1xuICAqIG1vdXNldXAgaW4gbmdPbkluaXQgYmVjYXVzZSBpdCB1c2VkIGRvY2N1bWVudCBhcyByZWZlcmVuY2VcbiAgKi9cblxuICAvLyBhdm9pZCBkcmFnXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBtb3VzZWRvd25cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZWRvd24oZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XG4gICAgdGhpcy5sYXN0TW91c2VFdmVudCA9IGV2ZW50O1xuICB9XG5cbiAgLy8gbW91c2Vtb3ZlXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbW92ZScsIFsnJGV2ZW50J10pXG4gIG9uTW91c2Vtb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMubW91c2VEb3duICYmIHRoaXMuc3RhcnRlZCkge1xuXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKGV2ZW50KTtcblxuICAgICAgLy8gVGhlIHdpZHRoIGlzIGRpdmlkZWQgYnkgdGhlIGFtb3VudCBvZiBpbWFnZXMuIE1vdmluZyBmcm9tIDAgdG8gMTAwIHdpbGwgdHVybiAzNjDDgsKwXG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5wb3NpdGlvbkRpZmYpID49IHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25EaWZmIDwgMCkge1xuICAgICAgICAgIHRoaXMuZ29SaWdodCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ29MZWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0TW91c2VFdmVudCA9IGV2ZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5mcmFtZVNob3duID0gMDtcblxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCdkb2N1bWVudCcsICdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5tb3VzZURvd24pIHtcbiAgICAgICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbWFya0FzTG9hZGVkID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy50b3RhbEltYWdlc0xvYWRlZCsrO1xuICAgIGlmICh0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkID09PSB0aGlzLnNjZW5lc0xlbikge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlclNjZW5lID0gdGhpcy5zY2VuZXNbMF07XG4gICAgICB0aGlzLmxvYWRpbmdJbWFnZXMgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnb0xlZnQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc2NlbmVzW3RoaXMuZnJhbWVTaG93biAtIDFdKSB7XG4gICAgICB0aGlzLmZyYW1lU2hvd24tLTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9vcGluZykge1xuICAgICAgdGhpcy5mcmFtZVNob3duID0gdGhpcy5zY2VuZXNMZW4gLSAxO1xuICAgIH1cbiAgfVxuXG4gIGdvUmlnaHQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc2NlbmVzW3RoaXMuZnJhbWVTaG93biArIDFdKSB7XG4gICAgICB0aGlzLmZyYW1lU2hvd24rKztcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9vcGluZykge1xuICAgICAgdGhpcy5mcmFtZVNob3duID0gMDtcbiAgICB9XG4gIH1cblxuICBzdGFydCA9ICgkZXZlbnQpOiB2b2lkID0+IHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyU2NlbmUgPSBMT0FESU5HX0lNQUdFO1xuICAgIHRoaXMudG90YWxJbWFnZXNMb2FkZWQgPSAwO1xuICAgIHRoaXMubG9hZGluZ0ltYWdlcyA9IHRydWU7XG4gICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGxvYWRlclBlcmNlbnRhZ2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuICh0aGlzLnNjZW5lc0xlbiAtIHRoaXMudG90YWxJbWFnZXNMb2FkZWQpID4gMCA/ICgoMTAwIC8gdGhpcy5zY2VuZXNMZW4pICogdGhpcy50b3RhbEltYWdlc0xvYWRlZCkudG9GaXhlZCgxKSA6IDA7XG4gIH1cblxuICBvbk9wZW4oJGV2ZW50KSB7XG5cbiAgICB0aGlzLm9wZW4uZW1pdCgkZXZlbnQpO1xuXG4gIH1cblxuICAvKlxuICAgKlxuICAgKiBJTVBPUlRBTlRcbiAgICpcbiAgICogcmVzZXRTdGFydFBvc2l0aW9uQmFzZWRPbkNvbXBhbnlcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcmVzcG9uc2libGUgZm9yIGVuc3VyaW5nIHRoZSBCdXNpbmVzcyBSdWxlIG9mIHRoZSBzcGluIHNlcXVlbmNlXG4gICAqIFRoZSBIb21lIERlcG90IGFrYSBjdXN0b21lciAxMDAsIGhhdmUgYSBwYXJ0aWN1bGFyIGJlaGF2aW9yIHN0YXJ0aW5nIDE4MMOCwrogaW4gdGhlIG1pZGRsZVxuICAgKlxuICAqL1xuICBwcml2YXRlIHJlc2V0U3RhcnRQb3NpdGlvbkJhc2VkT25Db21wYW55KHNwaW4sIHNjZW5lcykge1xuXG4gICAgdGhpcy5zdGFydEluQ2VudGVyID0gc3Bpbi5jb21wYW55LmlkID09PSAxMDAgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB0aGlzLnN0YXJ0SW5DZW50ZXIgPSB0aGlzLnN0YXJ0SW5DZW50ZXIgJiYgc2NlbmVzLmxlbmd0aCA8PSAxNjtcblxuICB9XG5cbiAgcHJpdmF0ZSByZXNldFNjZW5lc0RhdGEoc2NlbmVzKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlclNjZW5lID0gc2NlbmVzWzBdO1xuICAgIHRoaXMuc2NlbmVzTGVuID0gc2NlbmVzLmxlbmd0aDtcbiAgICB0aGlzLnNjZW5lcyA9IHNjZW5lcztcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFNjZW5lcyhzcGluKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNjZW5lcyA9IHRoaXMuZ2V0VXJsc0Zyb21TeXNGaWxlcyhzcGluLmRhdGEuc2hvdHMpO1xuICAgICAgcmV0dXJuIHNjZW5lcyAmJiBzY2VuZXMubGVuZ3RoID4gMCA/IHNjZW5lcyA6IFtGQUxMQkFDS19JTUFHRV07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBbRkFMTEJBQ0tfSU1BR0VdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlUG9zaXRpb24oZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQ6IGFueSA9IGV2ZW50Wyd0YXJnZXQnXTtcblxuICAgIGlmICh0aGlzLmNvbnRhaW5lcldpZHRoICE9PSB0YXJnZXQuY2xpZW50V2lkdGgpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSAgdGFyZ2V0LmNsaWVudFdpZHRoO1xuICAgICAgdGhpcy5pbnRlcnZhbCA9ICh0aGlzLmNvbnRhaW5lcldpZHRoIC8gdGhpcy5zY2VuZXNMZW4pIC8gMS42O1xuICAgIH1cblxuICAgIHRoaXMucG9zaXRpb25EaWZmID0gZXZlbnQuY2xpZW50WCAtIHRoaXMubGFzdE1vdXNlRXZlbnQuY2xpZW50WDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VXJsc0Zyb21TeXNGaWxlcyhzeXNGaWxlcykge1xuICAgIGlmICghc3lzRmlsZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN5c0ZpbGVzLm1hcChmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbGUucmVuZGVyRmlsZS5maWxlVXJsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjUHJvZHVjdFNwaW5Db21wb25lbnQgfSBmcm9tICcuL3Byb2R1Y3Qtc3Bpbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNQcm9kdWN0U3BpbkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUHJvZHVjdFNwaW5Db21wb25lbnRcbiAgXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBEZWNQcm9kdWN0U3Bpbk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtyb3V0ZXJMaW5rXT1cInJvdXRlckxpbmtcIiBjbGFzcz1cImRlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGVcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGV7b3V0bGluZTowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHJvdXRlckxpbms7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlL2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtdG9vbGJhcicsXG4gIHRlbXBsYXRlOiBgPG1hdC10b29sYmFyIFtjb2xvcl09XCJjb2xvclwiICpuZ0lmPVwiaW5pdGlhbGl6ZWRcIiBjbGFzcz1cImRlYy1zaWRlbmF2LXRvb2xiYXJcIj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLWljb24gaXRlbS1sZWZ0XCIgKm5nSWY9XCJsZWZ0TWVudVRyaWdnZXJWaXNpYmxlXCIgKGNsaWNrKT1cInRvZ2dsZUxlZnRNZW51LmVtaXQoKVwiPlxuICAgICYjOTc3NjtcbiAgPC9zcGFuPlxuXG4gIDxzcGFuICpuZ0lmPVwiY3VzdG9tVGl0bGVcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICA8L3NwYW4+XG5cbiAgPGRpdiBjbGFzcz1cInJpYmJvbiB7e3JpYmJvbn19XCIgKm5nSWY9XCJub3RQcm9kdWN0aW9uXCI+XG4gICAgPHNwYW4+e3tsYWJlbCB8IHRyYW5zbGF0ZX19PC9zcGFuPlxuICA8L2Rpdj5cblxuICA8c3BhbiBjbGFzcz1cImRlYy1zaWRlbmF2LXRvb2xiYXItY3VzdG9tLWNvbnRlbnRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvc3Bhbj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLXNwYWNlclwiPjwvc3Bhbj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLWljb24gaXRlbS1yaWdodFwiICpuZ0lmPVwicmlnaHRNZW51VHJpZ2dlclZpc2libGVcIiAoY2xpY2spPVwidG9nZ2xlUmlnaHRNZW51LmVtaXQoKVwiPlxuICAgICYjOTc3NjtcbiAgPC9zcGFuPlxuXG48L21hdC10b29sYmFyPlxuYCxcbiAgc3R5bGVzOiBbYC5pdGVtcy1zcGFjZXJ7ZmxleDoxIDEgYXV0b30uaXRlbXMtaWNvbntjdXJzb3I6cG9pbnRlcjstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjIsLjgpO3RyYW5zZm9ybTpzY2FsZSgxLjIsLjgpfS5pdGVtcy1pY29uLml0ZW0tcmlnaHR7cGFkZGluZy1sZWZ0OjE0cHh9Lml0ZW1zLWljb24uaXRlbS1sZWZ0e3BhZGRpbmctcmlnaHQ6MTRweH0uZGVjLXNpZGVuYXYtdG9vbGJhci1jdXN0b20tY29udGVudHtwYWRkaW5nOjAgMTZweDt3aWR0aDoxMDAlfS5yaWJib257dHJhbnNpdGlvbjphbGwgLjNzIGVhc2U7dGV4dC10cmFuc2Zvcm06bG93ZXJjYXNlO3RleHQtYWxpZ246Y2VudGVyO3Bvc2l0aW9uOnJlbGF0aXZlO2xpbmUtaGVpZ2h0OjY0cHg7bWFyZ2luLWxlZnQ6NHB4O3BhZGRpbmc6MCAyMHB4O2hlaWdodDo2NHB4O3dpZHRoOjE1NXB4O2NvbG9yOiNmZmY7bGVmdDoyMHB4O3RvcDowfS5yaWJib24ucmliYm9uLWhpZGRlbntkaXNwbGF5Om5vbmV9LnJpYmJvbjo6YmVmb3Jle2NvbnRlbnQ6Jyc7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwdnc7aGVpZ2h0OjRweDt6LWluZGV4OjI7dG9wOjY0cHg7bGVmdDowfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTk5cHgpey5yaWJib246OmJlZm9yZXt0b3A6NTZweH19YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xuXG4gIGluaXRpYWxpemVkO1xuXG4gIG5vdFByb2R1Y3Rpb24gPSB0cnVlO1xuICByaWJib24gPSAnJztcbiAgbGFiZWwgPSAnJztcblxuICBASW5wdXQoKSBjb2xvcjtcblxuICBASW5wdXQoKSBlbnZpcm9ubWVudDtcblxuICBASW5wdXQoKSBsZWZ0TWVudVRyaWdnZXJWaXNpYmxlID0gdHJ1ZTtcblxuICBASW5wdXQoKSByaWdodE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHRvZ2dsZUxlZnRNZW51OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSB0b2dnbGVSaWdodE1lbnU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50KSBjdXN0b21UaXRsZTogRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdsb2NhbCcpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1ncmVlbic7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLmxvY2FsJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1ibHVlJztcbiAgICAgIHRoaXMubGFiZWwgPSAnbGFiZWwuZGV2ZWxvcG1lbnQnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5lbnZpcm9ubWVudCA9PT0gJ3FhJykge1xuICAgICAgdGhpcy5yaWJib24gPSAncmliYm9uLXJlZCc7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLnFhJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdhY3RpdmUnKSB7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24tZ3JlZW4nO1xuICAgICAgdGhpcy5sYWJlbCA9ICdsYWJlbC5hY3RpdmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vdFByb2R1Y3Rpb24gPSBmYWxzZTtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1oaWRkZW4nO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBsZXQtdHJlZUxldmVsPVwidHJlZUxldmVsXCIgI3RlbXBsYXRlPlxuXG4gIDxtYXQtbGlzdC1pdGVtIGNsYXNzPVwiY2xpY2sgZGVjLXNpZGVuYXYtbWVudS1pdGVtXCJcbiAgKGNsaWNrKT1cInN1Yml0ZW1zLmxlbmd0aCA/IHRvZ2dsZVN1Ym1lbnUoKSA6IG9wZW5MaW5rKClcIlxuICBbbmdDbGFzc109XCJnZXRCYWNrZ3JvdW5kKHRyZWVMZXZlbClcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJpdGVtLXdyYXBwZXJcIj5cblxuICAgICAgPGRpdiBbbmdTdHlsZV09XCJ7cGFkZGluZ0xlZnQ6IHRyZWVMZXZlbCAqIDE2ICsgJ3B4J31cIiBjbGFzcz1cIml0ZW0tY29udGVudFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiAqbmdJZj1cInN1Yml0ZW1zLmxlbmd0aFwiIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJzaG93U3VibWVudVwiPlxuICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+PGkgY2xhc3M9XCJhcnJvdyBkb3duXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj48aSBjbGFzcz1cImFycm93IHJpZ2h0XCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICA8L21hdC1saXN0LWl0ZW0+XG5cbiAgPGRpdiBjbGFzcz1cInN1Yml0ZW0tbWVudVwiICpuZ0lmPVwic2hvd1N1Ym1lbnVcIj5cblxuICAgIDxkZWMtc2lkZW5hdi1tZW51IFtpdGVtc109XCJzdWJpdGVtc1wiIFt0cmVlTGV2ZWxdPVwidHJlZUxldmVsXCI+PC9kZWMtc2lkZW5hdi1tZW51PlxuXG4gIDwvZGl2PlxuXG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi1tZW51LWl0ZW17aGVpZ2h0OjU2cHghaW1wb3J0YW50O291dGxpbmU6MH0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXJ7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1mbG93OnJvdyBuby13cmFwO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuaXRlbS1jb250ZW50IDo6bmctZGVlcCAubWF0LWljb24sLmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5pdGVtLWNvbnRlbnQgOjpuZy1kZWVwIGl7dmVydGljYWwtYWxpZ246bWlkZGxlO21hcmdpbi1ib3R0b206NXB4O21hcmdpbi1yaWdodDo4cHh9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5hcnJvd3ttYXJnaW4tYm90dG9tOi00cHh9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5hcnJvdy5yaWdodHt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyl9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5hcnJvdy5sZWZ0e3RyYW5zZm9ybTpyb3RhdGUoMTM1ZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTM1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLmFycm93LnVwe3RyYW5zZm9ybTpyb3RhdGUoLTEzNWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC0xMzVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuYXJyb3cuZG93bnt0cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLnRleHQtcmlnaHR7dGV4dC1hbGlnbjpyaWdodH0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5jbGlja3tjdXJzb3I6cG9pbnRlcn0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIGl7Ym9yZGVyOnNvbGlkICMwMDA7Ym9yZGVyLXdpZHRoOjAgMnB4IDJweCAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6NHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHJvdXRlckxpbms7XG5cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBfc3ViaXRlbXM6IFF1ZXJ5TGlzdDxEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gIEBPdXRwdXQoKSB0b2dnbGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc3RhcnRlZDtcblxuICBzaG93U3VibWVudSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgZ2V0IHN1Yml0ZW1zKCkge1xuICAgIGNvbnN0IHN1Yml0ZW1zID0gdGhpcy5fc3ViaXRlbXMudG9BcnJheSgpO1xuICAgIHN1Yml0ZW1zLnNwbGljZSgwLCAxKTsgLy8gcmVtb3ZlcyBpdHNlbGZcbiAgICByZXR1cm4gc3ViaXRlbXM7XG4gIH1cblxuICB0b2dnbGVTdWJtZW51KCkge1xuICAgIHRoaXMuc2hvd1N1Ym1lbnUgPSAhdGhpcy5zaG93U3VibWVudTtcbiAgICB0aGlzLnRvZ2dsZS5lbWl0KHRoaXMuc2hvd1N1Ym1lbnUpO1xuICB9XG5cbiAgY2xvc2VTdWJtZW51KCkge1xuICAgIHRoaXMuc2hvd1N1Ym1lbnUgPSBmYWxzZTtcbiAgfVxuXG4gIG9wZW5MaW5rKCkge1xuICAgIGlmICh0aGlzLnJvdXRlckxpbmspIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5yb3V0ZXJMaW5rID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBpc05ha2VkID0gdGhpcy5yb3V0ZXJMaW5rLnN0YXJ0c1dpdGgoJy8vJyk7XG4gICAgICAgIGNvbnN0IGlzSHR0cCA9IHRoaXMucm91dGVyTGluay5zdGFydHNXaXRoKCdodHRwOi8vJyk7XG4gICAgICAgIGNvbnN0IGlzSHR0cHMgPSB0aGlzLnJvdXRlckxpbmsuc3RhcnRzV2l0aCgnaHR0cHM6Ly8nKTtcbiAgICAgICAgaWYgKGlzTmFrZWQgfHwgaXNIdHRwIHx8IGlzSHR0cHMpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMucm91dGVyTGluaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZXJMaW5rXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnJvdXRlckxpbmspKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHRoaXMucm91dGVyTGluayk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0QmFja2dyb3VuZCh0cmVlTGV2ZWwpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0lmQWN0aXZlKCkgPyAnbWF0LWxpc3QtaXRlbS1hY3RpdmUnIDogJ21hdC1saXN0LWl0ZW0tJyArIHRyZWVMZXZlbDtcbiAgfVxuXG4gIGNoZWNrSWZBY3RpdmUoKSB7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zaG93U3VibWVudSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoYXNBY3RpdmVDaGlsZCA9IHRoaXMuaGFzQWN0aXZlQ2hpbGQ7XG4gICAgICByZXR1cm4gaGFzQWN0aXZlQ2hpbGQ7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBoYXNBY3RpdmVDaGlsZCgpIHtcbiAgICBpZiAoIXRoaXMuc3ViaXRlbXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc3ViaXRlbXMucmVkdWNlKChsYXN0VmFsdWUsIGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGxhc3RWYWx1ZSB8fCBpdGVtLmlzQWN0aXZlIHx8IGl0ZW0uaGFzQWN0aXZlQ2hpbGQ7XG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXJMaW5rID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtbWVudS10aXRsZScsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgU1RPUkFHRV9ET01BSU4gPSAnZGVjU2lkZW5hdkNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHNldFNpZGVuYXZWaXNpYmlsaXR5KG5hbWUsIHZpc2liaWxpdHkpIHtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0U2lkZW5hdkNvbmZpZygpO1xuXG4gICAgY29uZmlnW25hbWVdID0gdmlzaWJpbGl0eTtcblxuICAgIHRoaXMuc2V0U2lkZW5hdkNvbmZpZyhjb25maWcpO1xuXG4gIH1cblxuICBnZXRTaWRlbmF2VmlzaWJpbGl0eShuYW1lKSB7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldFNpZGVuYXZDb25maWcoKTtcblxuICAgIHJldHVybiBjb25maWdbbmFtZV07XG5cbiAgfVxuXG4gIHByaXZhdGUgc2V0U2lkZW5hdkNvbmZpZyhjb25mKSB7XG5cbiAgICBjb25zdCBjb25mU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoY29uZik7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0RPTUFJTiwgY29uZlN0cmluZyk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2lkZW5hdkNvbmZpZygpIHtcblxuICAgIGNvbnN0IGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0RPTUFJTik7XG5cbiAgICBpZiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGNvbnN0IG5ld0NvbmZpZzogYW55ID0ge307XG5cbiAgICAgIHRoaXMuc2V0U2lkZW5hdkNvbmZpZyhuZXdDb25maWcpO1xuXG4gICAgICByZXR1cm4gbmV3Q29uZmlnO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LWl0ZW0vZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vLi4vc2lkZW5hdi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtbWVudS1sZWZ0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VzdG9tVGl0bGVcIj5cbiAgPGRpdiBjbGFzcz1cIm1lbnUtdGl0bGVcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtZGVjLXNpZGVuYXYtbWVudS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW1zXCI+XG4gIDxkZWMtc2lkZW5hdi1tZW51IFtpdGVtc109XCJpdGVtcy50b0FycmF5KClcIj48L2RlYy1zaWRlbmF2LW1lbnU+XG48L25nLWNvbnRhaW5lcj5gLFxuICBzdHlsZXM6IFtgLm1lbnUtdGl0bGV7cGFkZGluZzoxNnB4O2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjcwMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHJlYWRvbmx5IGxlZnRNZW51VmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgcmVhZG9ubHkgbGVmdE1lbnVNb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdzaWRlJyk7XG5cbiAgQElucHV0KClcbiAgc2V0IG9wZW4odjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5sZWZ0TWVudVZpc2libGUudmFsdWU7XG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5sZWZ0TWVudVZpc2libGUubmV4dCh2KTtcbiAgICAgIHRoaXMuZGVjU2lkZW5hdlNlcnZpY2Uuc2V0U2lkZW5hdlZpc2liaWxpdHkoJ2xlZnRNZW51SGlkZGVuJywgIXYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLmxlZnRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBtb2RlKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMubGVmdE1lbnVNb2RlLnZhbHVlO1xuXG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5sZWZ0TWVudU1vZGUubmV4dCh2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgbW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0TWVudU1vZGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKSBwZXJzaXN0VmlzaWJpbGl0eU1vZGU6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBpdGVtczogUXVlcnlMaXN0PERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50KSBjdXN0b21UaXRsZTogRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgb3BlbmVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKSBtb2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHJpdmF0ZSBpdGVtU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NpZGVuYXZTZXJ2aWNlOiBEZWNTaWRlbmF2U2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpIHtcblxuICAgIHRoaXMubGVmdE1lbnVWaXNpYmxlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMubGVmdE1lbnVNb2RlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLm1vZGVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy50b0FycmF5KCk7XG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQpID0+IHtcblxuICAgICAgaXRlbS50b2dnbGUuc3Vic2NyaWJlKHN0YXRlID0+IHtcblxuICAgICAgICBpZiAoc3RhdGUpIHtcblxuICAgICAgICAgIHRoaXMuY2xvc2VCcm90aGVycyhpdGVtKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuaXRlbVN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pID0+IHtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZUJyb3RoZXJzKGl0ZW1TZWxlY3RlZCkge1xuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zLnRvQXJyYXkoKTtcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCkgPT4ge1xuXG4gICAgICBpZiAoaXRlbVNlbGVjdGVkICE9PSBpdGVtKSB7XG5cbiAgICAgICAgaXRlbS5jbG9zZVN1Ym1lbnUoKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIElucHV0LCBDb250ZW50Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS10aXRsZS9kZWMtc2lkZW5hdi1tZW51LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuLy4uL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nSWY9XCJjdXN0b21UaXRsZVwiPlxuICA8ZGl2IGNsYXNzPVwibWVudS10aXRsZVwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1kZWMtc2lkZW5hdi1tZW51LXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbXNcIj5cbiAgPGRlYy1zaWRlbmF2LW1lbnUgW2l0ZW1zXT1cIml0ZW1zLnRvQXJyYXkoKVwiPjwvZGVjLXNpZGVuYXYtbWVudT5cbjwvbmctY29udGFpbmVyPmAsXG4gIHN0eWxlczogW2AubWVudS10aXRsZXtwYWRkaW5nOjE2cHg7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NzAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHJlYWRvbmx5IHJpZ2h0TWVudVZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIHJlYWRvbmx5IHJpZ2h0TWVudU1vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3NpZGUnKTtcblxuICBASW5wdXQoKVxuICBzZXQgb3Blbih2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnJpZ2h0TWVudVZpc2libGUudmFsdWU7XG5cbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnJpZ2h0TWVudVZpc2libGUubmV4dCh2KTtcbiAgICAgIHRoaXMuZGVjU2lkZW5hdlNlcnZpY2Uuc2V0U2lkZW5hdlZpc2liaWxpdHkoJ3JpZ2h0TWVudUhpZGRlbicsICF2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG1vZGUodjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5yaWdodE1lbnVNb2RlLnZhbHVlO1xuXG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yaWdodE1lbnVNb2RlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHRNZW51TW9kZS52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHBlcnNpc3RWaXNpYmlsaXR5TW9kZTogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkcmVuKERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGl0ZW1zOiBRdWVyeUxpc3Q8RGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQpIGN1c3RvbVRpdGxlOiBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50O1xuXG4gIEBPdXRwdXQoKSBvcGVuZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQE91dHB1dCgpIG1vZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwcml2YXRlIGl0ZW1TdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjU2lkZW5hdlNlcnZpY2U6IERlY1NpZGVuYXZTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVBbmRFeHBvc2VTaWRlbmF2RXZlbnRzKCkge1xuXG4gICAgdGhpcy5yaWdodE1lbnVWaXNpYmxlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmlnaHRNZW51TW9kZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5tb2RlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMudG9BcnJheSgpO1xuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50KSA9PiB7XG5cbiAgICAgIGl0ZW0udG9nZ2xlLnN1YnNjcmliZShzdGF0ZSA9PiB7XG5cbiAgICAgICAgaWYgKHN0YXRlKSB7XG5cbiAgICAgICAgICB0aGlzLmNsb3NlQnJvdGhlcnMoaXRlbSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLml0ZW1TdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VCcm90aGVycyhpdGVtU2VsZWN0ZWQpIHtcblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy50b0FycmF5KCk7XG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQpID0+IHtcblxuICAgICAgaWYgKGl0ZW1TZWxlY3RlZCAhPT0gaXRlbSkge1xuXG4gICAgICAgIGl0ZW0uY2xvc2VTdWJtZW51KCk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi10b29sYmFyL2RlYy1zaWRlbmF2LXRvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1sZWZ0L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1yaWdodC9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRTaWRlbmF2IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGVjLXNpZGVuYXYtd3JhcGVyXCI+XG4gIDwhLS0gVE9PTEJBUiAtLT5cbiAgPGRpdiAqbmdJZj1cInRvb2xiYXJcIiBjbGFzcz1cImRlYy1zaWRlbmF2LXRvb2xiYXItd3JhcHBlclwiIFtuZ0NsYXNzXT1cInsnZnVsbC1zY3JlZW4nOiAhKGxlZnRNZW51LmxlZnRNZW51VmlzaWJsZSB8IGFzeW5jKX1cIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi10b29sYmFyXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbiAgPCEtLSAvIFRPT0xCQVIgLS0+XG5cbiAgPCEtLSBQUk9HUkVTUyBCQVIgLS0+XG4gIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXItd3JhcHBlclwiICpuZ0lmPVwicHJvZ3Jlc3NCYXJWaXNpYmxlIHwgYXN5bmNcIj5cbiAgICA8bWF0LXByb2dyZXNzLWJhciBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiIGNvbG9yPVwiYWNjZW50XCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPlxuICA8L2Rpdj5cbiAgPCEtLSAvIFBST0dSRVNTIEJBUiAtLT5cblxuICA8bWF0LXNpZGVuYXYtY29udGFpbmVyIFtuZ0NsYXNzXT1cInsnd2l0aC10b29sYmFyJzogdG9vbGJhciwgJ2Z1bGwtc2NyZWVuJzogIShsZWZ0TWVudS5sZWZ0TWVudVZpc2libGUgfCBhc3luYyl9XCI+XG5cbiAgICA8IS0tIExFRlQgTUVOVSAtLT5cbiAgICA8bWF0LXNpZGVuYXYgKm5nSWY9XCJsZWZ0TWVudVwiXG4gICAgW21vZGVdPVwibGVmdE1lbnUubGVmdE1lbnVNb2RlIHwgYXN5bmNcIlxuICAgIFtvcGVuZWRdPVwibGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlIHwgYXN5bmNcIlxuICAgIHBvc2l0aW9uPVwic3RhcnRcIlxuICAgIChvcGVuZWRDaGFuZ2UpPVwibGVmdFNpZGVuYXZPcGVuZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgI2xlZnRTaWRlbmF2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtbWVudS1sZWZ0XCI+PC9uZy1jb250ZW50PlxuICAgIDwvbWF0LXNpZGVuYXY+XG4gICAgPCEtLSAvIExFRlQgTUVOVSAtLT5cblxuICAgIDwhLS0gQ09OVEVOVCAtLT5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgIDwhLS0gLyBDT05URU5UIC0tPlxuXG4gICAgPCEtLSBSSUdIVCBNRU5VIC0tPlxuICAgIDxtYXQtc2lkZW5hdiAqbmdJZj1cInJpZ2h0TWVudVwiXG4gICAgW21vZGVdPVwicmlnaHRNZW51LnJpZ2h0TWVudU1vZGUgfCBhc3luY1wiXG4gICAgW29wZW5lZF09XCJyaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZSB8IGFzeW5jXCJcbiAgICBwb3NpdGlvbj1cImVuZFwiXG4gICAgKG9wZW5lZENoYW5nZSk9XCJyaWdodFNpZGVuYXZPcGVuZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgI3JpZ2h0U2lkZW5hdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LW1lbnUtcmlnaHRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9tYXQtc2lkZW5hdj5cbiAgICA8IS0tIC8gUklHSFQgTUVOVSAtLT5cblxuICA8L21hdC1zaWRlbmF2LWNvbnRhaW5lcj5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1zaWRlbmF2LXdyYXBlciAuZGVjLXNpZGVuYXYtdG9vbGJhci13cmFwcGVye21pbi13aWR0aDoxMjAwcHh9LmRlYy1zaWRlbmF2LXdyYXBlciAuZGVjLXNpZGVuYXYtdG9vbGJhci13cmFwcGVyLmZ1bGwtc2NyZWVue21pbi13aWR0aDo5NDRweH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXJ7bWluLXdpZHRoOjEyMDBweDtoZWlnaHQ6MTAwdmh9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyLmZ1bGwtc2NyZWVue21pbi13aWR0aDo5NDRweH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXIud2l0aC10b29sYmFye2hlaWdodDpjYWxjKDEwMHZoIC0gNjRweCl9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyIC5tYXQtc2lkZW5hdnt3aWR0aDoyNTZweH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5wcm9ncmVzcy1iYXItd3JhcHBlcntwb3NpdGlvbjpmaXhlZDt0b3A6NjBweDtsZWZ0OjA7d2lkdGg6MTAwJX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjExOTlweCl7LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVye2hlaWdodDpjYWxjKDEwMHZoIC0gMTZweCl9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyLndpdGgtdG9vbGJhcntoZWlnaHQ6Y2FsYygxMDB2aCAtIDgwcHgpfX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcmVhZG9ubHkgcHJvZ3Jlc3NCYXJWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCkgdG9vbGJhcjogRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQpXG4gIHNldCBsZWZ0TWVudSh2OiBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQpIHtcbiAgICB0aGlzLl9sZWZ0TWVudSA9IHY7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbExlZnRNZW51VmlzaWJpbGl0eU1vZGVzKCk7XG4gICAgfVxuICB9XG4gIGdldCBsZWZ0TWVudSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGVmdE1lbnU7XG4gIH1cblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQpXG4gIHNldCByaWdodE1lbnUodjogRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCkge1xuICAgIHRoaXMuX3JpZ2h0TWVudSA9IHY7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbFJpZ2h0TWVudVZpc2liaWxpdHlNb2RlcygpO1xuICAgIH1cbiAgfVxuICBnZXQgcmlnaHRNZW51KCkge1xuICAgIHJldHVybiB0aGlzLl9yaWdodE1lbnU7XG4gIH1cblxuICBAVmlld0NoaWxkKCdsZWZ0U2lkZW5hdicpIGxlZnRTaWRlbmF2OiBNYXRTaWRlbmF2O1xuXG4gIEBWaWV3Q2hpbGQoJ3JpZ2h0U2lkZW5hdicpIHJpZ2h0U2lkZW5hdjogTWF0U2lkZW5hdjtcblxuICBwcml2YXRlIF9sZWZ0TWVudTogRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50O1xuXG4gIHByaXZhdGUgX3JpZ2h0TWVudTogRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudDtcblxuICBASW5wdXQoKVxuICBzZXQgbG9hZGluZyh2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGxvYWRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNTaWRlbmF2U2VydmljZTogRGVjU2lkZW5hdlNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgIHRoaXMuZGV0ZWN0QW5kU2hvd0NoaWxkQ29tcG9uZW50cygpO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVUb1Rvb2xiYXJFdmVudHMoKTtcblxuICB9XG5cbiAgLy8gQVBJIC8vXG4gIG9wZW5Cb3RoTWVudXMoKSB7XG4gICAgdGhpcy5vcGVuTGVmdE1lbnUoKTtcbiAgICB0aGlzLm9wZW5SaWdodE1lbnUoKTtcbiAgfVxuXG4gIG9wZW5MZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgb3BlblJpZ2h0TWVudSgpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBjbG9zZUJvdGhNZW51cygpIHtcbiAgICB0aGlzLmNsb3NlTGVmdE1lbnUoKTtcbiAgICB0aGlzLmNsb3NlUmlnaHRNZW51KCk7XG4gIH1cblxuICBjbG9zZUxlZnRNZW51KCkge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgY2xvc2VSaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIHRvZ2dsZUJvdGhNZW51cygpIHtcbiAgICB0aGlzLnRvZ2dsZUxlZnRNZW51KCk7XG4gICAgdGhpcy50b2dnbGVSaWdodE1lbnUoKTtcbiAgfVxuXG4gIHRvZ2dsZUxlZnRNZW51KCkge1xuICAgIHRoaXMubGVmdE1lbnUub3BlbiA9ICF0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIHRvZ2dsZVJpZ2h0TWVudSgpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5vcGVuID0gIXRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICBzZXRCb3RoTWVudXNNb2RlKG1vZGU6ICdvdmVyJyB8ICdwdXNoJyB8ICdzaWRlJyA9ICdzaWRlJykge1xuICAgIHRoaXMuc2V0TGVmdE1lbnVNb2RlKG1vZGUpO1xuICAgIHRoaXMuc2V0UmlnaHRNZW51TW9kZShtb2RlKTtcbiAgfVxuXG4gIHNldExlZnRNZW51TW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51TW9kZS5uZXh0KG1vZGUpO1xuICB9XG5cbiAgc2V0UmlnaHRNZW51TW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVNb2RlLm5leHQobW9kZSk7XG4gIH1cblxuICB0b2dnbGVQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSAhdGhpcy5wcm9ncmVzc0JhclZpc2libGUudmFsdWU7XG4gIH1cblxuICBzaG93UHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5wcm9ncmVzc0JhclZpc2libGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGhpZGVQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIGxlZnRTaWRlbmF2T3BlbmVkQ2hhbmdlKG9wZW5lZFN0YXR1cykge1xuICAgIHRoaXMubGVmdE1lbnUub3BlbiA9IG9wZW5lZFN0YXR1cztcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KG9wZW5lZFN0YXR1cyk7XG4gIH1cblxuICByaWdodFNpZGVuYXZPcGVuZWRDaGFuZ2Uob3BlbmVkU3RhdHVzKSB7XG4gICAgdGhpcy5yaWdodE1lbnUub3BlbiA9IG9wZW5lZFN0YXR1cztcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQob3BlbmVkU3RhdHVzKTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0QW5kU2hvd0NoaWxkQ29tcG9uZW50cygpIHtcblxuICAgIHRoaXMudG9vbGJhci5sZWZ0TWVudVRyaWdnZXJWaXNpYmxlID0gdGhpcy5sZWZ0TWVudSA/IHRydWUgOiBmYWxzZTtcblxuICAgIHRoaXMudG9vbGJhci5yaWdodE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRoaXMucmlnaHRNZW51ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvVG9vbGJhckV2ZW50cygpIHtcblxuICAgIGlmICh0aGlzLnRvb2xiYXIpIHtcblxuICAgICAgdGhpcy50b29sYmFyLnRvZ2dsZUxlZnRNZW51LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubGVmdFNpZGVuYXYudG9nZ2xlKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50b29sYmFyLnRvZ2dsZVJpZ2h0TWVudS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJpZ2h0U2lkZW5hdi50b2dnbGUoKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHNldEluaXRpYWxSaWdodE1lbnVWaXNpYmlsaXR5TW9kZXMoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KCF0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLmdldFNpZGVuYXZWaXNpYmlsaXR5KCdyaWdodE1lbnVIaWRkZW4nKSk7XG4gIH1cblxuICBwcml2YXRlIHNldEluaXRpYWxMZWZ0TWVudVZpc2liaWxpdHlNb2RlcygpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KCF0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLmdldFNpZGVuYXZWaXNpYmlsaXR5KCdsZWZ0TWVudUhpZGRlbicpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtY29udGVudCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1zaWRlbmF2LWNvbnRlbnQtd3JhcHBlclwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLXNpZGVuYXYtY29udGVudC13cmFwcGVye3BhZGRpbmc6MzJweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2Q29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUnLFxuICB0ZW1wbGF0ZTogYDxtYXQtbGlzdD5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtLnN0YXJ0ZWQgJiYgaXRlbS50ZW1wbGF0ZSA/IHRydWUgOiBmYWxzZVwiPlxuICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtLnRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dHJlZUxldmVsOiB0cmVlTGV2ZWwgKyAxfVwiXG4gICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG48L21hdC1saXN0PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtbGlzdHtwYWRkaW5nLXRvcDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51Q29tcG9uZW50IHtcblxuICBASW5wdXQoKSBpdGVtcyA9IFtdO1xuXG4gIEBJbnB1dCgpIHRyZWVMZXZlbCA9IC0xO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU2lkZW5hdkNvbXBvbmVudCB9IGZyb20gJy4vc2lkZW5hdi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0U2lkZW5hdk1vZHVsZSwgTWF0TGlzdE1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGVjU2lkZW5hdkNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LWNvbnRlbnQvZGVjLXNpZGVuYXYtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LWl0ZW0vZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtbGVmdC9kZWMtc2lkZW5hdi1tZW51LWxlZnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQvZGVjLXNpZGVuYXYtbWVudS1yaWdodC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUvZGVjLXNpZGVuYXYtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS10aXRsZS9kZWMtc2lkZW5hdi1tZW51LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtdG9vbGJhci9kZWMtc2lkZW5hdi10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vc2lkZW5hdi5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNTaWRlbmF2Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZDb250ZW50Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNTaWRlbmF2Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZDb250ZW50Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1NpZGVuYXZTZXJ2aWNlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbndpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddID0gd2luZG93WydkZWNvcmFTY3JpcHRTZXJ2aWNlJ10gfHwge307XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERlY1NjcmlwdExvYWRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbG9hZCh1cmw6IHN0cmluZywgc2NyaXB0TmFtZTogc3RyaW5nKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc2NyaXB0TG9hZGVkID0gd2luZG93WydkZWNvcmFTY3JpcHRTZXJ2aWNlJ11bc2NyaXB0TmFtZV07XG5cbiAgICAgIGlmIChzY3JpcHRMb2FkZWQpIHtcblxuICAgICAgICBjb25zdCBzY3JpcHQgPSB3aW5kb3dbc2NyaXB0TmFtZV07XG5cbiAgICAgICAgcmVzb2x2ZShzY3JpcHQpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnN0IHNjcmlwdFRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICAgIHNjcmlwdFRhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybCk7XG5cbiAgICAgICAgc2NyaXB0VGFnLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnKTtcblxuICAgICAgICBzY3JpcHRUYWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgd2luZG93WydkZWNvcmFTY3JpcHRTZXJ2aWNlJ11bc2NyaXB0TmFtZV0gPSB0cnVlO1xuXG4gICAgICAgICAgY29uc3Qgc2NyaXB0ID0gd2luZG93W3NjcmlwdE5hbWVdO1xuXG4gICAgICAgICAgcmVzb2x2ZShzY3JpcHQpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgc2NyaXB0VGFnLm9uZXJyb3IgPSByZWplY3Q7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzY3JpcHRUYWcpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9O1xuXG4gIGxvYWRTdHlsZSh1cmw6IHN0cmluZykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgd2luZG93WydzY3JpcHRTZXJ2aWNlTG9hZGVkU3R5bGVzQXJyYXknXSA9IHdpbmRvd1snc2NyaXB0U2VydmljZUxvYWRlZFN0eWxlc0FycmF5J10gfHwge307XG5cbiAgICAgIGNvbnN0IHN0eWxlTG9hZGVkID0gd2luZG93WydzY3JpcHRTZXJ2aWNlTG9hZGVkU3R5bGVzQXJyYXknXVt1cmxdO1xuXG4gICAgICBpZiAoc3R5bGVMb2FkZWQpIHtcblxuICAgICAgICByZXNvbHZlKCk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY29uc3QgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgICAgICBsaW5rVGFnLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcbiAgICAgICAgbGlua1RhZy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAgICAgbGlua1RhZy5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgJ2FsbCcpO1xuICAgICAgICBsaW5rVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG5cbiAgICAgICAgbGlua1RhZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICB3aW5kb3dbJ3NjcmlwdFNlcnZpY2VMb2FkZWRTdHlsZXNBcnJheSddW3VybF0gPSB0cnVlO1xuXG4gICAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgbGlua1RhZy5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobGlua1RhZyk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH07XG5cbiAgbG9hZFN0eWxlQW5kU2NyaXB0KHN0eWxlVXJsLCBzY3JpcHRVcmwsIHNjcmlwdE5hbWVzcGFjZSkge1xuXG4gICAgcmV0dXJuIHRoaXMubG9hZFN0eWxlKHN0eWxlVXJsKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWQoc2NyaXB0VXJsLCBzY3JpcHROYW1lc3BhY2UpO1xuICAgIH0pO1xuXG4gIH1cblxuICBsb2FkTGVhZmxldFNjcmlwdHNBbmRTdHlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkU3R5bGUoJ2h0dHBzOi8vdW5wa2cuY29tL2xlYWZsZXRAMS4zLjMvZGlzdC9sZWFmbGV0LmNzcycpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZFN0eWxlKCdodHRwOi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vZm9udC1hd2Vzb21lLzQuMC4zL2Nzcy9mb250LWF3ZXNvbWUuY3NzJykudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRTdHlsZSgnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9sZWFmbGV0LWVhc3lidXR0b25AMi9zcmMvZWFzeS1idXR0b24uY3NzJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubG9hZCgnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjMuMy9kaXN0L2xlYWZsZXQuanMnLCAnTGVhZmxldCcpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZCgnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9sZWFmbGV0LWVhc3lidXR0b25AMi9zcmMvZWFzeS1idXR0b24uanMnLCAnRWFzeUJ1dHRvbicpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2NyaXB0TG9hZGVyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5zZXJ2aWNlJztcblxuY29uc3QgU0tFVENIRkFCX1NDUklQVF9VUkwgPSAnaHR0cHM6Ly9zdGF0aWMuc2tldGNoZmFiLmNvbS9hcGkvc2tldGNoZmFiLXZpZXdlci0xLjAuMC5qcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1za2V0Y2hmYWItdmlldycsXG4gIHRlbXBsYXRlOiBgPGlmcmFtZSBzcmM9XCJcIiBcbiAgI2FwaUZyYW1lIFxuICBpZD1cImFwaS1mcmFtZVwiIFxuICBoZWlnaHQ9XCI2MjBcIlxuICB3aWR0aD1cIjYyMFwiIFxuICBhbGxvd2Z1bGxzY3JlZW4gXG4gIG1vemFsbG93ZnVsbHNjcmVlbj1cInRydWVcIiBcbiAgd2Via2l0YWxsb3dmdWxsc2NyZWVuPVwidHJ1ZVwiPjwvaWZyYW1lPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTa2V0Y2hmYWJWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBcbiAgc2V0IHNrZXRjaGZhYklkKGlkKSB7XG4gICAgaWYgKGlkKSB7XG4gICAgICB0aGlzLl9za2V0Y2hmYWJJZCA9IGlkO1xuICAgICAgdGhpcy5zdGFydFNrZXRjaGZhYihpZCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNrZXRjaGZhYklkKCkge1xuICAgIHJldHVybiB0aGlzLl9za2V0Y2hmYWJJZDtcbiAgfVxuXG4gIF9za2V0Y2hmYWJJZDogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoJ2FwaUZyYW1lJykgYXBpRnJhbWU6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNTY3JpcHRMb2FkZXJTZXJ2aWNlOiBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHN0YXJ0U2tldGNoZmFiKGlkKSB7XG4gICAgdGhpcy5kZWNTY3JpcHRMb2FkZXJTZXJ2aWNlLmxvYWQoU0tFVENIRkFCX1NDUklQVF9VUkwsICdTa2V0Y2hmYWInKVxuICAgICAgLnRoZW4oKFNrZXRjaGZhYjogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IHRoaXMuYXBpRnJhbWUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgY2xpZW50ID0gbmV3IFNrZXRjaGZhYignMS4wLjAnLCBpZnJhbWUpO1xuICAgICAgICBjbGllbnQuaW5pdCh0aGlzLnNrZXRjaGZhYklkLCB7XG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gb25TdWNjZXNzKGFwaSkge1xuICAgICAgICAgICAgYXBpLnN0YXJ0KCk7XG4gICAgICAgICAgICBhcGkuYWRkRXZlbnRMaXN0ZW5lcigndmlld2VycmVhZHknLCAgKCkgPT4ge30pO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NjcmlwdExvYWRlclNlcnZpY2UgfSBmcm9tICcuL2RlYy1zY3JpcHQtbG9hZGVyLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1NjcmlwdExvYWRlclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTY3JpcHRMb2FkZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NjcmlwdExvYWRlck1vZHVsZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjU2tldGNoZmFiVmlld0NvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNrZXRjaGZhYi12aWV3LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGVjU2NyaXB0TG9hZGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1NrZXRjaGZhYlZpZXdDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1NrZXRjaGZhYlZpZXdDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTa2V0Y2hmYWJWaWV3TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RlcCB9IGZyb20gJy4vZGVjLXN0ZXBzLWxpc3QubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXN0ZXBzLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJoaXN0b3J5LWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsnbGltaXRlZC1oZWlnaHQnOiBtYXhIZWlnaHR9XCIgW3N0eWxlLm1heEhlaWdodF09XCJtYXhIZWlnaHQgfHwgJzEwMCUnXCI+XG5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjhweFwiIGNsYXNzPVwiZGVjLWNvbG9yLWdyZXktZGFya1wiPlxuXG4gICAgPG1hdC1pY29uIGZ4RmxleD1cIjI0cHhcIj57e2ljb259fTwvbWF0LWljb24+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpZ2dlci1mb250XCI+e3sgdGl0bGUgfX08L3NwYW4+XG5cbiAgPC9kaXY+XG5cbiAgPGJyPlxuXG4gIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJoaXN0b3J5LWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdGVwc0xpc3Q7IGxldCBpID0gaW5kZXhcIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cImxlZnQgc3RhcnRcIiBjbGFzcz1cImRlYy1jb2xvci1ncmV5XCI+XG5cbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwic21hbGxlci1pY29uIGRlYy1jb2xvci1ncmV5LWRhcmtcIiBmeEZsZXg9XCIyNHB4XCI+e3sgaSA9PT0gc3RlcHNMaXN0Lmxlbmd0aCAtIDEgPyAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCcgOiAnbGVucycgfX08L21hdC1pY29uPlxuXG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjRweFwiPlxuXG4gICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgPHN0cm9uZyAqbmdJZj1cIml0ZW0udGl0bGVcIj57eyBpdGVtLnRpdGxlIH19PC9zdHJvbmc+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5kYXRlXCI+XG4gICAgICAgICAgICAgIHt7IGl0ZW0uZGF0ZSB8IGRhdGUgfX1cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93VGltZVwiPiB8IHt7IGl0ZW0uZGF0ZSB8IGRhdGU6ICdtZWRpdW1UaW1lJyB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiAqbmdJZj1cIml0ZW0uZGVzY3JpcHRpb25cIiBjbGFzcz1cImRlYy1jb2xvci1ncmV5LWRhcmtcIj5cbiAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJkZWMtY29sb3ItYmxhY2tcIj57eyBpdGVtLmRlc2NyaXB0aW9uIH19PC9zdHJvbmc+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC10YWItYm9keS1jb250ZW50e3BhZGRpbmc6MTZweCAwfS5tYXQtZm9ybS1maWVsZC1wcmVmaXh7bWFyZ2luLXJpZ2h0OjhweCFpbXBvcnRhbnR9Lm1hdC1mb3JtLWZpZWxkLXN1ZmZpeHttYXJnaW4tbGVmdDo4cHghaW1wb3J0YW50fS5tYXQtZWxldmF0aW9uLXowe2JveC1zaGFkb3c6MCAwIDAgMCByZ2JhKDAsMCwwLC4yKSwwIDAgMCAwIHJnYmEoMCwwLDAsLjE0KSwwIDAgMCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MXtib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejJ7Ym94LXNoYWRvdzowIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDJweCAycHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoze2JveC1zaGFkb3c6MCAzcHggM3B4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAzcHggNHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDhweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NHtib3gtc2hhZG93OjAgMnB4IDRweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNHB4IDVweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo1e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA1cHggOHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE0cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejZ7Ym94LXNoYWRvdzowIDNweCA1cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDZweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejd7Ym94LXNoYWRvdzowIDRweCA1cHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDdweCAxMHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAycHggMTZweCAxcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo4e2JveC1zaGFkb3c6MCA1cHggNXB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCA4cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgM3B4IDE0cHggMnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OXtib3gtc2hhZG93OjAgNXB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOXB4IDEycHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNnB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEwe2JveC1zaGFkb3c6MCA2cHggNnB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCAxMHB4IDE0cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAxOHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejExe2JveC1zaGFkb3c6MCA2cHggN3B4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMXB4IDE1cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAyMHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEye2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMnB4IDE3cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyMnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEze2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxM3B4IDE5cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNHB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE0e2JveC1zaGFkb3c6MCA3cHggOXB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxNHB4IDIxcHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE1e2JveC1zaGFkb3c6MCA4cHggOXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxNXB4IDIycHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAyOHB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE2e2JveC1zaGFkb3c6MCA4cHggMTBweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTZweCAyNHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMzBweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxN3tib3gtc2hhZG93OjAgOHB4IDExcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE3cHggMjZweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMycHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTh7Ym94LXNoYWRvdzowIDlweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxOHB4IDI4cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDdweCAzNHB4IDZweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE5e2JveC1zaGFkb3c6MCA5cHggMTJweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMTlweCAyOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzZweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMHtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMHB4IDMxcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCAzOHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIxe2JveC1zaGFkb3c6MCAxMHB4IDEzcHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIxcHggMzNweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQwcHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjJ7Ym94LXNoYWRvdzowIDEwcHggMTRweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjJweCAzNXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggNDJweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyM3tib3gtc2hhZG93OjAgMTFweCAxNHB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyM3B4IDM2cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NHB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejI0e2JveC1zaGFkb3c6MCAxMXB4IDE1cHggLTdweCByZ2JhKDAsMCwwLC4yKSwwIDI0cHggMzhweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOXB4IDQ2cHggOHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJhZGdlLXNtYWxsIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6NnB4fS5tYXQtYmFkZ2UtbGFyZ2UgLm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtc2l6ZToyNHB4fS5tYXQtaDEsLm1hdC1oZWFkbGluZSwubWF0LXR5cG9ncmFwaHkgaDF7Zm9udDo0MDAgMjRweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMiwubWF0LXRpdGxlLC5tYXQtdHlwb2dyYXBoeSBoMntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWgzLC5tYXQtc3ViaGVhZGluZy0yLC5tYXQtdHlwb2dyYXBoeSBoM3tmb250OjQwMCAxNnB4LzI4cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg0LC5tYXQtc3ViaGVhZGluZy0xLC5tYXQtdHlwb2dyYXBoeSBoNHtmb250OjQwMCAxNXB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg1LC5tYXQtdHlwb2dyYXBoeSBoNXtmb250OjQwMCAxMS42MnB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWg2LC5tYXQtdHlwb2dyYXBoeSBoNntmb250OjQwMCA5LjM4cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxMnB4fS5tYXQtYm9keS0yLC5tYXQtYm9keS1zdHJvbmd7Zm9udDo1MDAgMTRweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJvZHksLm1hdC1ib2R5LTEsLm1hdC10eXBvZ3JhcGh5e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5IHAsLm1hdC1ib2R5LTEgcCwubWF0LXR5cG9ncmFwaHkgcHttYXJnaW46MCAwIDEycHh9Lm1hdC1jYXB0aW9uLC5tYXQtc21hbGx7Zm9udDo0MDAgMTJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWRpc3BsYXktNCwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTR7Zm9udDozMDAgMTEycHgvMTEycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNTZweDtsZXR0ZXItc3BhY2luZzotLjA1ZW19Lm1hdC1kaXNwbGF5LTMsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ze2ZvbnQ6NDAwIDU2cHgvNTZweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDJlbX0ubWF0LWRpc3BsYXktMiwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTJ7Zm9udDo0MDAgNDVweC80OHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHg7bGV0dGVyLXNwYWNpbmc6LS4wMDVlbX0ubWF0LWRpc3BsYXktMSwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTF7Zm9udDo0MDAgMzRweC80MHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHh9Lm1hdC1ib3R0b20tc2hlZXQtY29udGFpbmVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1idXR0b24sLm1hdC1mYWIsLm1hdC1mbGF0LWJ1dHRvbiwubWF0LWljb24tYnV0dG9uLC5tYXQtbWluaS1mYWIsLm1hdC1yYWlzZWQtYnV0dG9uLC5tYXQtc3Ryb2tlZC1idXR0b257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWJ1dHRvbi10b2dnbGUsLm1hdC1jYXJke2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhcmQtdGl0bGV7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtY2FyZC1jb250ZW50LC5tYXQtY2FyZC1oZWFkZXIgLm1hdC1jYXJkLXRpdGxlLC5tYXQtY2FyZC1zdWJ0aXRsZXtmb250LXNpemU6MTRweH0ubWF0LWNoZWNrYm94e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNoZWNrYm94LWxheW91dCAubWF0LWNoZWNrYm94LWxhYmVse2xpbmUtaGVpZ2h0OjI0cHh9Lm1hdC1jaGlwe2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjE4cHh9Lm1hdC1jaGlwIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24sLm1hdC1jaGlwIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29ue2ZvbnQtc2l6ZToxOHB4fS5tYXQtdGFibGV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtaGVhZGVyLWNlbGx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2VsbCwubWF0LWZvb3Rlci1jZWxse2ZvbnQtc2l6ZToxNHB4fS5tYXQtY2FsZW5kYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2FsZW5kYXItYm9keXtmb250LXNpemU6MTNweH0ubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9ue2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlciB0aHtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo0MDB9Lm1hdC1kaWFsb2ctdGl0bGV7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWV4cGFuc2lvbi1wYW5lbC1jb250ZW50e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCU7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuMTI1O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb257Zm9udC1zaXplOjE1MCU7bGluZS1oZWlnaHQ6MS4xMjV9Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29uLWJ1dHRvbntoZWlnaHQ6MS41ZW07d2lkdGg6MS41ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b24gLm1hdC1pY29ue2hlaWdodDoxLjEyNWVtO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi41ZW0gMDtib3JkZXItdG9wOi44NDM3NWVtIHNvbGlkIHRyYW5zcGFyZW50fS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVye3RvcDotLjg0Mzc1ZW07cGFkZGluZy10b3A6Ljg0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlcntmb250LXNpemU6NzUlO21hcmdpbi10b3A6LjY2NjY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNzkxNjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC13cmFwcGVye3BhZGRpbmctYm90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjQzNzVlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMXB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjNlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzUlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMjgxMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4yNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7bWFyZ2luLXRvcDouNTQxNjdlbTt0b3A6Y2FsYygxMDAlIC0gMS42NjY2N2VtKX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi4yNWVtIDAgLjc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMDkzNzVlbTttYXJnaW4tdG9wOi0uNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzoxZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5le2JvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuODQzNzVlbTttYXJnaW4tdG9wOi0uMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWdyaWQtdGlsZS1mb290ZXIsLm1hdC1ncmlkLXRpbGUtaGVhZGVye2ZvbnQtc2l6ZToxNHB4fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmUsLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LWdyaWQtdGlsZS1oZWFkZXIgLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fWlucHV0Lm1hdC1pbnB1dC1lbGVtZW50e21hcmdpbi10b3A6LS4wNjI1ZW19Lm1hdC1tZW51LWl0ZW17Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXBhZ2luYXRvciwubWF0LXBhZ2luYXRvci1wYWdlLXNpemUgLm1hdC1zZWxlY3QtdHJpZ2dlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHh9Lm1hdC1yYWRpby1idXR0b24sLm1hdC1zZWxlY3R7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2VsZWN0LXRyaWdnZXJ7aGVpZ2h0OjEuMTI1ZW19Lm1hdC1zbGlkZS10b2dnbGUtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwubWF0LXN0ZXBwZXItdmVydGljYWx7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc3RlcC1sYWJlbHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVke2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRhYi1ncm91cHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10YWItbGFiZWwsLm1hdC10YWItbGlua3tmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdG9vbGJhciwubWF0LXRvb2xiYXIgaDEsLm1hdC10b29sYmFyIGgyLC5tYXQtdG9vbGJhciBoMywubWF0LXRvb2xiYXIgaDQsLm1hdC10b29sYmFyIGg1LC5tYXQtdG9vbGJhciBoNntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowfS5tYXQtdG9vbHRpcHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEwcHg7cGFkZGluZy10b3A6NnB4O3BhZGRpbmctYm90dG9tOjZweH0ubWF0LXRvb2x0aXAtaGFuZHNldHtmb250LXNpemU6MTRweDtwYWRkaW5nLXRvcDo5cHg7cGFkZGluZy1ib3R0b206OXB4fS5tYXQtbGlzdC1pdGVtLC5tYXQtbGlzdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjE2cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtbmF2LWxpc3QgLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweH0ubWF0LW9wdGdyb3VwLWxhYmVse2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zaW1wbGUtc25hY2tiYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4fS5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbntsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdHJlZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10cmVlLW5vZGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxNHB4fS5tYXQtcmlwcGxle292ZXJmbG93OmhpZGRlbn1AbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6YWN0aXZlKXsubWF0LXJpcHBsZXtkaXNwbGF5Om5vbmV9fS5tYXQtcmlwcGxlLm1hdC1yaXBwbGUtdW5ib3VuZGVke292ZXJmbG93OnZpc2libGV9Lm1hdC1yaXBwbGUtZWxlbWVudHtwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXItcmFkaXVzOjUwJTtwb2ludGVyLWV2ZW50czpub25lO3RyYW5zaXRpb246b3BhY2l0eSwtd2Via2l0LXRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpO3RyYW5zaXRpb246b3BhY2l0eSx0cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9LmNkay12aXN1YWxseS1oaWRkZW57Ym9yZGVyOjA7Y2xpcDpyZWN0KDAgMCAwIDApO2hlaWdodDoxcHg7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHg7b3V0bGluZTowOy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlciwuY2RrLW92ZXJsYXktY29udGFpbmVye3BvaW50ZXItZXZlbnRzOm5vbmU7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmNkay1vdmVybGF5LWNvbnRhaW5lcntwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LWNvbnRhaW5lcjplbXB0eXtkaXNwbGF5Om5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVye2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LXBhbmV7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6YXV0bztib3gtc2l6aW5nOmJvcmRlci1ib3g7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9LmNkay1vdmVybGF5LWJhY2tkcm9we3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6MTAwMDtwb2ludGVyLWV2ZW50czphdXRvOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDt0cmFuc2l0aW9uOm9wYWNpdHkgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO29wYWNpdHk6MH0uY2RrLW92ZXJsYXktYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjF9QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTouNn19LmNkay1vdmVybGF5LWRhcmstYmFja2Ryb3B7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yODgpfS5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCwuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjB9LmNkay1vdmVybGF5LWNvbm5lY3RlZC1wb3NpdGlvbi1ib3VuZGluZy1ib3h7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47bWluLXdpZHRoOjFweDttaW4taGVpZ2h0OjFweH0uY2RrLWdsb2JhbC1zY3JvbGxibG9ja3twb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO292ZXJmbG93LXk6c2Nyb2xsfS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbHstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0O2FuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0fS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6bm90KDotd2Via2l0LWF1dG9maWxsKXstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmR9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXple3Jlc2l6ZTpub25lfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZS1tZWFzdXJpbmd7aGVpZ2h0OmF1dG8haW1wb3J0YW50O292ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnQ7cGFkZGluZzoycHggMCFpbXBvcnRhbnQ7Ym94LXNpemluZzpjb250ZW50LWJveCFpbXBvcnRhbnR9Lmhpc3RvcnktY29udGFpbmVye21hcmdpbjoxLjVlbSAwfS5oaXN0b3J5LWNvbnRhaW5lci5saW1pdGVkLWhlaWdodHtvdmVyZmxvdy15OmF1dG99Lmhpc3RvcnktY29udGFpbmVyIC5oaXN0b3J5LWl0ZW06bm90KDpsYXN0LWNoaWxkKXtwb3NpdGlvbjpyZWxhdGl2ZX0uaGlzdG9yeS1jb250YWluZXIgLmhpc3RvcnktaXRlbTpub3QoOmxhc3QtY2hpbGQpOjpiZWZvcmV7Y29udGVudDpcIlwiO3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDozZW07d2lkdGg6MnB4O2JhY2tncm91bmQtY29sb3I6IzkxOTc5YztsZWZ0OjExcHg7dG9wOjE0cHh9Lmhpc3RvcnktY29udGFpbmVyIC5oaXN0b3J5LWl0ZW0gLnNtYWxsZXItaWNvbntmb250LXNpemU6MTZweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjttYXJnaW4tdG9wOjJweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTdGVwc0xpc3RDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGljb24gPSAnaGlzdG9yeSc7XG5cbiAgQElucHV0KCkgdGl0bGUgPSAnJztcblxuICBASW5wdXQoKSBzaG93VGltZTogYm9vbGVhbjtcblxuICBASW5wdXQoKSBtYXhIZWlnaHQ7XG5cbiAgQElucHV0KCkgc3RlcHNMaXN0OiBTdGVwW10gPSBbXTtcblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTdGVwc0xpc3RDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zdGVwcy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY1N0ZXBzTGlzdENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNTdGVwc0xpc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNTdGVwc0xpc3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zdHJpbmctYXJyYXktaW5wdXQnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm1vZGUgPT0gJ2lucHV0J1wiPlxuXG4gIDxtYXQtZm9ybS1maWVsZCAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbKG5nTW9kZWwpXT1cInZhbHVlQXNTdHJpbmdcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gIDxtYXQtZm9ybS1maWVsZCAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cbiAgICA8dGV4dGFyZWEgbWF0SW5wdXRcbiAgICBbcm93c109XCJyb3dzXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbKG5nTW9kZWwpXT1cInZhbHVlQXNTdHJpbmdcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICAgIDwvdGV4dGFyZWE+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG5cbjwvbmctY29udGFpbmVyPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgbmFtZTtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjtcblxuICBASW5wdXQoKSBtb2RlID0gJ3RleHRhcmVhJztcblxuICBASW5wdXQoKSByb3dzID0gMztcblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogc3RyaW5nW10ge1xuXG4gICAgcmV0dXJuIHRoaXMuaW5uZXJBcnJheTtcblxuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogc3RyaW5nW10pIHtcblxuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyQXJyYXkpIHtcblxuICAgICAgdGhpcy5pbm5lckFycmF5ID0gdjtcblxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgdmFsdWVBc1N0cmluZygpOiBzdHJpbmcge1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0QXJyYXlBc1N0cmluZygpO1xuXG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZUFzU3RyaW5nKHY6IHN0cmluZykge1xuXG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJBcnJheSkge1xuXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdHJpbmdUb0FycmF5KHYpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyQXJyYXk6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgLy9cbiAgZ2V0QXJyYXlBc1N0cmluZygpIHtcblxuICAgIHJldHVybiB0aGlzLmFycmF5VG9TdHJpbmcodGhpcy52YWx1ZSk7XG5cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZ1tdKSB7XG5cbiAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgfVxuXG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICBwcml2YXRlIHN0cmluZ1RvQXJyYXkoc3RyaW5nT2ZBcnJheTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGlmIChzdHJpbmdPZkFycmF5KSB7XG5cbiAgICAgIGNvbnN0IHJlZ0V4cCA9IC9bXixcXHNdW14sXFxzXSpbXixcXHNdKi9nO1xuXG4gICAgICByZXR1cm4gc3RyaW5nT2ZBcnJheS5tYXRjaChyZWdFeHApO1xuXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcnJheVRvU3RyaW5nKGFycmF5T2ZzdHJpbmc6IHN0cmluZ1tdKTogc3RyaW5nIHtcblxuICAgIGlmIChhcnJheU9mc3RyaW5nKSB7XG5cbiAgICAgIHJldHVybiBhcnJheU9mc3RyaW5nLmpvaW4oJywgJyk7XG5cbiAgICB9XG5cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY1N0cmluZ0FycmF5SW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zdHJpbmctYXJyYXktaW5wdXQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY1N0cmluZ0FycmF5SW5wdXRDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNTdHJpbmdBcnJheUlucHV0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtdGFiJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFiQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgdG90YWw6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBjb250ZW50OiBUZW1wbGF0ZVJlZjxEZWNUYWJDb21wb25lbnQ+O1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbnN1cmVUYWJOYW1lKCk7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVRhYk5hbWUgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSA8ZGVjLXRhYj4gY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXRhYi1tZW51JyxcbiAgdGVtcGxhdGU6IGA8cD5cbiAgdGFiLW1lbnUgd29ya3MhXG48L3A+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFiTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgYWN0aXZlVGFiOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgY29udGVudDogVGVtcGxhdGVSZWY8RGVjVGFiTWVudUNvbXBvbmVudD47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY1RhYkNvbXBvbmVudCB9IGZyb20gJy4vdGFiL3RhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjVGFiTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXRhYnMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCIhaGlkZGVuXCI+XG5cbiAgPCEtLSBUQUJTIC0tPlxuICA8bWF0LXRhYi1ncm91cCBbc2VsZWN0ZWRJbmRleF09XCJhY3RpdmVUYWJJbmRleFwiIChmb2N1c0NoYW5nZSk9XCJvbkNoYW5nZVRhYigkZXZlbnQpXCIgW2R5bmFtaWNIZWlnaHRdPVwidHJ1ZVwiPlxuXG4gICAgPCEtLSBUQUIgLS0+XG4gICAgPG1hdC10YWIgKm5nRm9yPVwibGV0IHRhYiBvZiB0YWJzO1wiIFtkaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIj5cblxuICAgICAgPCEtLSBUQUIgTEFCRUwgLS0+XG4gICAgICA8bmctdGVtcGxhdGUgbWF0LXRhYi1sYWJlbD5cbiAgICAgICAge3sgdGFiLmxhYmVsIH19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1zbWFsbFwiICpuZ0lmPVwidGFiLnRvdGFsID49IDBcIj57eyBwYXJzZVRvdGFsKHRhYi50b3RhbCkgfX08L3NwYW4+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICA8IS0tIFRBQiBDT05URU5UIFdSQVBQRVIgLS0+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvdWxUYWJCZURpc3BsYXllZCh0YWIpXCI+XG5cbiAgICAgICAgPCEtLSBUQUIgTUVOVSAtLT5cbiAgICAgICAgPGRpdiAqbmdJZj1cInRhYk1lbnVDb21wb25lbnRcIiBjbGFzcz1cIm1lbnUtd3JhcHBlclwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWJNZW51Q29tcG9uZW50LmNvbnRlbnQ7IGNvbnRleHQ6IHsgYWN0aXZlVGFiOiBhY3RpdmVUYWIgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tIFRBQlMgQ09OVEVOVCAtLT5cbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3RhYi1wYWRkaW5nJzogcGFkZGluZ31cIj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbWF0LXRhYj5cblxuICA8L21hdC10YWItZ3JvdXA+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tZW51LXdyYXBwZXJ7dGV4dC1hbGlnbjpyaWdodDtwYWRkaW5nOjhweCAwfS50YWItcGFkZGluZ3twYWRkaW5nOjE2cHggMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjVGFiQ29tcG9uZW50KSB0YWJzOiBRdWVyeUxpc3Q8RGVjVGFiQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkKERlY1RhYk1lbnVDb21wb25lbnQpIHRhYk1lbnVDb21wb25lbnQ6IERlY1RhYk1lbnVDb21wb25lbnQ7XG5cbiAgQElucHV0KCkgaGlkZGVuOyAvLyBoaWRlcyB0aGUgdGFicyBncm91cCB0byByZWxvYWQgaXRzIGNvbnRlbnRzXG5cbiAgQElucHV0KCkgcGVyc2lzdCA9IHRydWU7XG5cbiAgQElucHV0KCkgZGVzdHJveU9uQmx1ciA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKSBwYWRkaW5nID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgYWN0aXZlVGFiKHY6IHN0cmluZykge1xuICAgIGlmICh2ICYmIHRoaXMuX2FjdGl2ZVRhYiAhPT0gdikge1xuICAgICAgdGhpcy5fYWN0aXZlVGFiID0gdjtcbiAgICAgIHRoaXMucGVyc2lzdFRhYih2KTtcbiAgICB9XG4gIH1cbiAgZ2V0IGFjdGl2ZVRhYigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiO1xuICB9XG5cbiAgQE91dHB1dCgpIGFjdGl2ZVRhYkNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBnZXQgYWN0aXZlVGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiSW5kZXg7XG4gIH1cblxuICBnZXQgYWN0aXZlVGFiT2JqZWN0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYk9iamVjdDtcbiAgfVxuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYkluZGV4OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfYWN0aXZlVGFiT2JqZWN0OiBhbnk7XG5cbiAgcHJpdmF0ZSBhY3RpdmF0ZWRUYWJzOiBhbnkgPSB7fTtcblxuICBwcml2YXRlIHF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBwYXRoRnJvbVJvb3QgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZU5hbWUoKTtcbiAgICB0aGlzLndhdGNoVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlVGFiTmFtZXMoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgICAgIGlmIChxdWVyeVBhcmFtcyAmJiBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0pIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRhYiA9IHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXTtcbiAgICAgICAgdGhpcy5zZWxlY3RUYWIoY3VycmVudFRhYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXJ0U2VsZWN0ZWRUYWIoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCk7XG4gIH1cblxuICBzaG91bFRhYkJlRGlzcGxheWVkKHRhYikge1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB0aGlzLl9hY3RpdmVUYWJPYmplY3QgPT09IHRhYjtcbiAgICBjb25zdCBpc0FjdGl2YXRlZCA9IHRoaXMuYWN0aXZhdGVkVGFic1t0YWIubmFtZV07XG4gICAgcmV0dXJuIGlzU2VsZWN0ZWQgfHwgKCF0aGlzLmRlc3Ryb3lPbkJsdXIgJiYgaXNBY3RpdmF0ZWQpO1xuICB9XG5cbiAgb25DaGFuZ2VUYWIoJGV2ZW50KSB7XG4gICAgY29uc3QgYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKVskZXZlbnQuaW5kZXhdO1xuICAgIHRoaXMuYWN0aXZlVGFiID0gYWN0aXZlVGFiT2JqZWN0Lm5hbWU7XG4gIH1cblxuICBwYXJzZVRvdGFsKHRvdGFsKSB7XG5cbiAgICByZXR1cm4gdG90YWwgIT09IG51bGwgJiYgdG90YWwgPj0gMCA/ICB0b3RhbCA6ICc/JztcblxuICB9XG5cbiAgcmVzZXQoKSB7XG5cbiAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcblxuICAgIH0sIDEwKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjb21wb25lbnRUYWJOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnLXRhYic7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVVuaXF1ZU5hbWUgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSB0YWIgY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgLyogZW5zdXJlVW5pcXVlVGFiTmFtZXNcbiAgICogVGhpcyBtZXRob2QgcHJldmVudHMgdGhlIHVzZSBvZiB0aGUgc2FtZSBuYW1lIGZvciBtb3JlIHRoYW4gb25lIHRhYlxuICAgKiB3aGF0IHdvdWxkIGVuZGluZyB1cCBjb25mbGljdGluZyB0aGUgdGFicyBhY3RpdmF0aW9uIG9uY2UgdGhpcyBpcyBkb25lIHZpYSB0YWIgbmFtZVxuICAqL1xuXG4gIHByaXZhdGUgZW5zdXJlVW5pcXVlVGFiTmFtZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlcywgcmVqKSA9PiB7XG4gICAgICBjb25zdCBuYW1lcyA9IHt9O1xuICAgICAgdGhpcy50YWJzLnRvQXJyYXkoKS5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICAgIGlmICghbmFtZXNbdGFiLm5hbWVdKSB7XG4gICAgICAgICAgbmFtZXNbdGFiLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWNUYWJDb21wb25lbnRFcnJvcjogVGhlIDxkZWMtdGFicz4gY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gVGhlIG5hbWUgJHt0YWIubmFtZX0gd2FzIHVzZWQgbW9yZSB0aGFuIG9uY2UuYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHBlcnNpc3RUYWIodGFiKSB7XG4gICAgaWYgKHRoaXMucGVyc2lzdCkge1xuICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICAgICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldID0gdGFiO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0VGFiID0gKHRhYk5hbWUpID0+IHtcbiAgICBpZiAodGhpcy50YWJzKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYk5hbWU7XG4gICAgICB0aGlzLmFjdGl2YXRlZFRhYnNbdGFiTmFtZV0gPSB0cnVlO1xuICAgICAgdGhpcy5fYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5maWx0ZXIodGFiID0+IHRhYi5uYW1lID09PSB0YWJOYW1lKVswXTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYkluZGV4ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5pbmRleE9mKHRoaXMuX2FjdGl2ZVRhYk9iamVjdCk7XG4gICAgICB0aGlzLmFjdGl2ZVRhYkNoYW5nZS5lbWl0KHRhYk5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRTZWxlY3RlZFRhYigpIHtcbiAgICBjb25zdCBhY3RpdmVUYWIgPSB0aGlzLmFjdGl2ZVRhYiB8fCB0aGlzLnRhYnMudG9BcnJheSgpWzBdLm5hbWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGF2b2lkIGNoYW5nZSBhZnRlciBjb21wb25lbnQgY2hlY2tlZCBlcnJvclxuICAgICAgdGhpcy5zZWxlY3RUYWIoYWN0aXZlVGFiKTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJJblVybFF1ZXJ5KCkge1xuICAgIHRoaXMucXVlcnlQYXJhbXNTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICBjb25zdCB0YWI6IHN0cmluZyA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV07XG4gICAgICB0aGlzLnNlbGVjdFRhYih0YWIpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCkge1xuICAgIHRoaXMucXVlcnlQYXJhbXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjVGFiQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY1RhYkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY1RhYnNDb21wb25lbnQgfSBmcm9tICcuL3RhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1RhYk1vZHVsZSB9IGZyb20gJy4vdGFiL3RhYi5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjVGFiTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIERlY1RhYk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNUYWJzQ29tcG9uZW50LCBEZWNUYWJNZW51Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1xuICAgIERlY1RhYnNDb21wb25lbnQsXG4gICAgRGVjVGFiTWVudUNvbXBvbmVudCxcbiAgICBEZWNUYWJNb2R1bGVcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFic01vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEV2ZW50VHlwZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFVwbG9hZFByb2dyZXNzIH0gZnJvbSAnLi91cGxvYWQubW9kZWxzJztcblxuY29uc3QgVVBMT0FEX0VORFBPSU5UID0gJy91cGxvYWQnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBERUNfVVBMT0FEX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY1VwbG9hZENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtdXBsb2FkJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCIocHJvZ3Jlc3NlcyAmJiBwcm9ncmVzc2VzLmxlbmd0aCkgPyB0cnVlIDogZmFsc2VcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cbiAgICA8c3BhbiAoY2xpY2spPVwib3BlbkZpbGVTZWxlY3Rpb24oKVwiIGNsYXNzPVwiY2xpY2tcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L3NwYW4+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgdXBsb2FkUHJvZ3Jlc3Mgb2YgcHJvZ3Jlc3Nlc1wiIGNsYXNzPVwiZGVjLXVwbG9hZC1wcm9ncmVzcy13cmFwcGVyXCI+XG4gICAgICA8bWF0LXByb2dyZXNzLWJhclxuICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICBbbW9kZV09XCJnZXRQcm9ncmVzc2Jhck1vZGUodXBsb2FkUHJvZ3Jlc3MpXCJcbiAgICAgICAgW3ZhbHVlXT1cImdldFByb2dyZXNzVmFsdWVCYXNlZE9uTW9kZSh1cGxvYWRQcm9ncmVzcylcIj5cbiAgICAgIDwvbWF0LXByb2dyZXNzLWJhcj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICA8c21hbGw+XG4gICAgICAgICAge3sgdXBsb2FkUHJvZ3Jlc3MudmFsdWUgfX0lIC0ge3sgdXBsb2FkUHJvZ3Jlc3MuZmlsZU5hbWUgfX1cbiAgICAgICAgPC9zbWFsbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuXG5cbjxpbnB1dCB0eXBlPVwiZmlsZVwiICNpbnB1dEZpbGUgKGNoYW5nZSk9XCJmaWxlc0NoYW5nZWQoJGV2ZW50KVwiIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuXG5gLFxuICBzdHlsZXM6IFtgLmNsaWNre2N1cnNvcjpwb2ludGVyfWlucHV0e2Rpc3BsYXk6bm9uZX0udGV4dC1jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LmRlYy11cGxvYWQtcHJvZ3Jlc3Mtd3JhcHBlcntwYWRkaW5nOjhweCAwfWBdLFxuICBwcm92aWRlcnM6IFtERUNfVVBMT0FEX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY1VwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBwcm9ncmVzc2VzOiBVcGxvYWRQcm9ncmVzc1tdID0gW107XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSB1cGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgcHJvZ3Jlc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXRGaWxlJykgaW5wdXRGaWxlOiBFbGVtZW50UmVmO1xuXG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnlbXTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgVkFMVUVcbiAgKi9cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHY6IGFueVtdKSB7XG4gICAgdGhpcy52YWx1ZSA9IHY7XG4gIH1cblxuXG4gIGZpbGVzQ2hhbmdlZChldmVudCkge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZXZlbnQudGFyZ2V0LmZpbGVzLmxlbmd0aDsgeCsrKSB7XG4gICAgICB0aGlzLnVwbG9hZEZpbGUoZXZlbnQudGFyZ2V0LmZpbGVzW3hdLCB4KTtcbiAgICB9XG4gIH1cblxuICBvcGVuRmlsZVNlbGVjdGlvbigpIHtcbiAgICB0aGlzLmlucHV0RmlsZS5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxuICBnZXRQcm9ncmVzc2Jhck1vZGUocHJvZ3Jlc3MpIHtcblxuICAgIGxldCBtb2RlO1xuXG4gICAgc3dpdGNoIChwcm9ncmVzcy52YWx1ZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBtb2RlID0gJ2J1ZmZlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMDA6XG4gICAgICAgIG1vZGUgPSAnaW5kZXRlcm1pbmF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBtb2RlO1xuXG4gIH1cblxuICBnZXRQcm9ncmVzc1ZhbHVlQmFzZWRPbk1vZGUocHJvZ3Jlc3MpIHtcbiAgICBjb25zdCBtb2RlID0gdGhpcy5nZXRQcm9ncmVzc2Jhck1vZGUocHJvZ3Jlc3MpO1xuICAgIGNvbnN0IHZhbHVlID0gbW9kZSA9PT0gJ2J1ZmZlcicgPyAwIDogcHJvZ3Jlc3MudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGxvYWRGaWxlKGZpbGUsIGluZGV4KSB7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGNvbnN0IHByb2dyZXNzOiBVcGxvYWRQcm9ncmVzcyA9IHtcbiAgICAgICAgZmlsZUluZGV4OiBpbmRleCxcbiAgICAgICAgZmlsZU5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgdmFsdWU6IDAsXG4gICAgICB9O1xuICAgICAgdGhpcy5wcm9ncmVzc2VzLnB1c2gocHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5zZXJ2aWNlLnVwbG9hZChVUExPQURfRU5EUE9JTlQsIFtmaWxlXSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NhdGNoRXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgcHJvZ3Jlc3MuZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgIHRoaXMuZXJyb3IuZW1pdCgnbWVzc2FnZS5lcnJvci51bmV4cGVjdGVkJyk7XG4gICAgICAgICAgdGhpcy5kZXRlY3RVcGxvYWRFbmQoKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzcykge1xuICAgICAgICAgIGNvbnN0IHBlcmNlbnREb25lID0gTWF0aC5yb3VuZCgoMTAwICogZXZlbnQubG9hZGVkKSAvIGV2ZW50LnRvdGFsKTtcbiAgICAgICAgICBwcm9ncmVzcy52YWx1ZSA9IHBlcmNlbnREb25lID09PSAxMDAgPyBwZXJjZW50RG9uZSA6IHBhcnNlRmxvYXQocGVyY2VudERvbmUudG9GaXhlZCgyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICBwcm9ncmVzcy52YWx1ZSA9IDEwMDtcbiAgICAgICAgICBwcm9ncmVzcy5maWxlID0gZXZlbnQuYm9keTtcbiAgICAgICAgICB0aGlzLmRldGVjdFVwbG9hZEVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MuZW1pdCh0aGlzLnByb2dyZXNzZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RVcGxvYWRFbmQoKSB7XG5cbiAgICBjb25zdCBzdGlsbFVwbG9hZGluZyA9IHRoaXMucHJvZ3Jlc3Nlcy5maWx0ZXIoKHByb2dyZXNzKSA9PiB7XG4gICAgICByZXR1cm4gcHJvZ3Jlc3MudmFsdWUgPCAxMDA7XG4gICAgfSk7XG5cbiAgICBpZiAoIXN0aWxsVXBsb2FkaW5nLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbWl0VXBsb2FkZWRGaWxlcygpO1xuICAgICAgdGhpcy5jbGVhcklucHV0RmlsZSgpO1xuICAgICAgdGhpcy5jbGVhclByb2dyZXNzZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFySW5wdXRGaWxlKCkge1xuICAgIHRoaXMuaW5wdXRGaWxlLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJQcm9ncmVzc2VzKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NlcyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0VXBsb2FkZWRGaWxlcygpIHtcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMucHJvZ3Jlc3Nlcy5tYXAoKHVwbG9hZFByb2dyZXNzOiBVcGxvYWRQcm9ncmVzcykgPT4ge1xuICAgICAgcmV0dXJuIHVwbG9hZFByb2dyZXNzLmZpbGU7XG4gICAgfSk7XG4gICAgdGhpcy52YWx1ZSA9IFsuLi5maWxlc107XG4gICAgdGhpcy51cGxvYWRlZC5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNVcGxvYWRDb21wb25lbnQgfSBmcm9tICcuL3VwbG9hZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNVcGxvYWRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1VwbG9hZENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1VwbG9hZE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIENhbkxvYWQsIFJvdXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2VcbiAgKSB7fVxuXG4gIGNhbkxvYWQocm91dGU6IFJvdXRlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQXV0aGVudGljYXRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkuZmV0Y2hDdXJyZW50TG9nZ2VkVXNlcigpXG4gICAgLnBpcGUoXG4gICAgICBtYXAoKHVzZXI6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gKHVzZXIgJiYgdXNlci5pZCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9KVxuICAgICkgYXMgT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dGhHdWFyZCB9IGZyb20gJy4vYXV0aC1ndWFyZC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNBdXRoR3VhcmRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHdWFyZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU25hY2tCYXJTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtc25hY2stYmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGVjU25hY2tCYXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU25hY2tCYXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgU2tpcFNlbGYsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERlY1NuYWNrQmFyTW9kdWxlIH0gZnJvbSAnLi8uLi9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vZGVjb3JhLWFwaS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIERlY1NuYWNrQmFyTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNBcGlTZXJ2aWNlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0FwaU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogRGVjQXBpTW9kdWxlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnRGVjQXBpTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVXNlckF1dGhEYXRhIHtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgY291bnRyeTogc3RyaW5nO1xuICBwdWJsaWMgY29tcGFueTogc3RyaW5nO1xuICBwdWJsaWMgcm9sZTogbnVtYmVyO1xuICBwdWJsaWMgcGVybWlzc2lvbnM6IEFycmF5PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IodXNlcjogYW55ID0ge30pIHtcbiAgICB0aGlzLmlkID0gdXNlci5pZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5lbWFpbCA9IHVzZXIuZW1haWwgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMubmFtZSA9IHVzZXIubmFtZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5jb3VudHJ5ID0gdXNlci5jb3VudHJ5IHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvbXBhbnkgPSB1c2VyLmNvbXBhbnkgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucm9sZSA9IHVzZXIucm9sZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5wZXJtaXNzaW9ucyA9IHVzZXIucGVybWlzc2lvbnMgfHwgdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9naW5EYXRhIHtcbiAgZW1haWw6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbiAga2VlcExvZ2dlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNlYm9va0xvZ2luRGF0YSB7XG4gIGtlZXBMb2dnZWQ6IGJvb2xlYW47XG4gIGZhY2Vib29rVG9rZW46IHN0cmluZztcbn1cblxuLypcbiAgKiBGaWx0ZXJHcm91cHNcbiAgKlxuICAqIGFuIEFycmF5IG9mIGZpbHRlciBncm91cFxuICAqL1xuZXhwb3J0IHR5cGUgRmlsdGVyR3JvdXBzID0gRmlsdGVyR3JvdXBbXTtcblxuLypcbiAgKiBGaWx0ZXJzXG4gICpcbiAgKiBhbiBBcnJheSBvZiBmaWx0ZXJcbiAgKi9cbmV4cG9ydCB0eXBlIEZpbHRlcnMgPSBGaWx0ZXJbXTtcblxuLypcbiAgKiBGaWx0ZXJEYXRhXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJEYXRhIHtcbiAgZW5kcG9pbnQ6IHN0cmluZztcbiAgcGF5bG9hZDogRGVjRmlsdGVyO1xuICBjYms/OiBGdW5jdGlvbjtcbiAgY2xlYXI/OiBib29sZWFuO1xufVxuXG4vKlxuICAqIEZpbHRlclxuICAqXG4gICogRmlsdGVyIGNvbmZpZ3VyYXRpb25cbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjRmlsdGVyIHtcbiAgZmlsdGVyR3JvdXBzPzogRmlsdGVyR3JvdXBzO1xuICBwcm9qZWN0Vmlldz86IGFueTtcbiAgc29ydD86IGFueTtcbiAgcGFnZT86IG51bWJlcjtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHRleHRTZWFyY2g/OiBzdHJpbmc7XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemVkRGVjRmlsdGVyIHtcbiAgZmlsdGVyPzogc3RyaW5nO1xuICBwcm9qZWN0Vmlldz86IHN0cmluZztcbiAgc29ydD86IHN0cmluZztcbiAgcGFnZT86IG51bWJlcjtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHRleHRTZWFyY2g/OiBzdHJpbmc7XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBTaWdubGUgZmlsdGVyXG4gICovXG5leHBvcnQgY2xhc3MgRmlsdGVyIHtcbiAgcHJvcGVydHk6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSA9IHt9KSB7XG4gICAgdGhpcy5wcm9wZXJ0eSA9IGRhdGEucHJvcGVydHk7XG4gICAgdGhpcy52YWx1ZSA9IEFycmF5LmlzQXJyYXkoZGF0YS5wcm9wZXJ0eSkgPyBkYXRhLnByb3BlcnR5IDogW2RhdGEucHJvcGVydHldO1xuICB9XG59XG5cbi8qXG4gICogRmlsdGVyR3JvdXBcbiAgKlxuICAqIEdyb3VwIG9mIEZpbHRlclxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJHcm91cCB7XG4gIGZpbHRlcnM6IEZpbHRlcnM7XG59XG5cbi8qXG4gICogQ29sdW1uc1NvcnRDb25maWdcbiAgKlxuICAqIENvbmZpZ3VyYXRpb24gdG8gc29ydCBzb3J0XG4gICovXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbnNTb3J0Q29uZmlnIHtcbiAgcHJvcGVydHk6IHN0cmluZztcbiAgb3JkZXI6IHtcbiAgICB0eXBlOiAnYXNjJyB8ICdkZXNjJ1xuICB9O1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIEluamVjdGlvblRva2VuLCBTa2lwU2VsZiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUsIEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZyB9IGZyb20gJy4vY29uZmlndXJhdGlvbi1zZXJ2aWNlLm1vZGVscyc7XG5cbmV4cG9ydCBjb25zdCBERUNPUkFfQ09ORklHVVJBVElPTl9TRVJWSUNFX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZz4oJ0RFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBJbml0RGVjQ29uZmlndXJhdGlvblNlcnZpY2UoaHR0cDogSHR0cENsaWVudCwgc2VydmljZUNvbmZpZzogRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcpIHtcbiAgcmV0dXJuIG5ldyBEZWNDb25maWd1cmF0aW9uU2VydmljZShodHRwLCBzZXJ2aWNlQ29uZmlnKTtcbn1cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbmZpZ3VyYXRpb25Nb2R1bGUge1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogRGVjQ29uZmlndXJhdGlvbk1vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjQ29uZmlndXJhdGlvbk1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seScpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogRGVjQ29uZmlndXJhdGlvbkZvclJvb3RDb25maWcpIHtcblxuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRGVjQ29uZmlndXJhdGlvbk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IERFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBEZWNDb25maWd1cmF0aW9uU2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBJbml0RGVjQ29uZmlndXJhdGlvblNlcnZpY2UsXG4gICAgICAgICAgZGVwczogW0h0dHBDbGllbnQsIERFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgRGVjQ29uZmlndXJhdGlvbkluaXRpYWxpemVyID0gKGRlY0NvbmZpZzogRGVjQ29uZmlndXJhdGlvblNlcnZpY2UpID0+IHtcbiAgcmV0dXJuICgpID0+IGRlY0NvbmZpZy5sb2FkQ29uZmlnKCk7XG59O1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCwgUm91dGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBvZiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25HdWFyZCBpbXBsZW1lbnRzIENhbkxvYWQsIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XG5cbiAgY2FuTG9hZChyb3V0ZTogUm91dGUpIHtcbiAgICBpZiAocm91dGUuZGF0YSAmJiAhcm91dGUuZGF0YS5wZXJtaXNzaW9ucykge1xuICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcm1pc3Npb25zID0gcm91dGUuZGF0YS5wZXJtaXNzaW9ucztcbiAgICByZXR1cm4gdGhpcy5oYXNBY2Nlc3MocGVybWlzc2lvbnMpO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgaWYgKHJvdXRlLmRhdGEgJiYgIXJvdXRlLmRhdGEucGVybWlzc2lvbnMpIHtcbiAgICAgIHRoaXMubm90QWxsb3dlZCgpO1xuICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJtaXNzaW9ucyA9IHJvdXRlLmRhdGEucGVybWlzc2lvbnM7XG4gICAgcmV0dXJuIHRoaXMuaGFzQWNjZXNzKHBlcm1pc3Npb25zKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FuQWN0aXZhdGUocm91dGUsIHN0YXRlKTtcbiAgfVxuXG4gIG5vdEFsbG93ZWQoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZm9yYmlkZW4nXSk7XG4gIH1cblxuICBoYXNBY2Nlc3MocGVybWlzc2lvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkudXNlciRcbiAgICAucGlwZShcbiAgICAgIG1hcCh1c2VyID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICBjb25zdCBhbGxvd2VkID0gdGhpcy5pc0FsbG93ZWRBY2Nlc3ModXNlci5wZXJtaXNzaW9ucywgcGVybWlzc2lvbnMpO1xuICAgICAgICAgIGlmICghYWxsb3dlZCkge1xuICAgICAgICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FsbG93ZWRBY2Nlc3ModXNlclBlcm1pc3Npb25zOiBzdHJpbmdbXSwgY3VycmVudFBlcm1pc3Npb25zOiBzdHJpbmdbXSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXRjaGluZ1JvbGUgPSBjdXJyZW50UGVybWlzc2lvbnMuZmluZCgodXNlclJvbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHVzZXJQZXJtaXNzaW9ucy5maW5kKChhbG93ZWRSb2xlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGFsb3dlZFJvbGUgPT09IHVzZXJSb2xlO1xuICAgICAgICB9KSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoaW5nUm9sZSA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1Blcm1pc3Npb25HdWFyZCB9IGZyb20gJy4vZGVjLXBlcm1pc3Npb24tZ3VhcmQuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNQZXJtaXNzaW9uR3VhcmRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQZXJtaXNzaW9uR3VhcmRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9wZW5Db25uZWN0aW9uIH0gZnJvbSAnLi93cy1jbGllbnQubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY1dzQ2xpZW50U2VydmljZSB7XG5cbiAgcHJpdmF0ZSBjb25uZWN0aW9uOiB7XG4gICAgW2tleTogc3RyaW5nXTogT3BlbkNvbm5lY3Rpb25cbiAgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjb25uZWN0KHVybCkge1xuXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvblt1cmxdO1xuXG4gICAgaWYgKGNvbm5lY3Rpb24pIHtcblxuICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5jb25uZWN0VG9Xcyh1cmwpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGNvbm5lY3RUb1dzKHVybCk6IE9wZW5Db25uZWN0aW9uIHtcblxuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSB0aGlzLm9wZW5Db25uZWN0aW9uKHVybCk7XG5cbiAgICB0aGlzLmNvbm5lY3Rpb25bdXJsXSA9IGNvbm5lY3Rpb247XG5cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcblxuICB9XG5cblxuICBwcml2YXRlIG9wZW5Db25uZWN0aW9uKHVybDogc3RyaW5nLCBjb25uZWN0aW9uPzogT3BlbkNvbm5lY3Rpb24pOiBPcGVuQ29ubmVjdGlvbiB7XG5cbiAgICBpZiAoY29ubmVjdGlvbikge1xuXG4gICAgICBjb25uZWN0aW9uLmNoYW5uZWwgPSBuZXcgV2ViU29ja2V0KHVybCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25uZWN0aW9uID0gY29ubmVjdGlvbiA/IGNvbm5lY3Rpb24gOiB7XG4gICAgICAgIGNoYW5uZWw6IG5ldyBXZWJTb2NrZXQodXJsKSxcbiAgICAgICAgbWVzc2FnZXM6IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKSxcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICBjb25uZWN0aW9uLmNoYW5uZWwub25jbG9zZSA9ICgpID0+IHRoaXMub3BlbkNvbm5lY3Rpb24odXJsLCBjb25uZWN0aW9uKTtcblxuICAgIGNvbm5lY3Rpb24uY2hhbm5lbC5vbmVycm9yID0gKCkgPT4gdGhpcy5vcGVuQ29ubmVjdGlvbih1cmwsIGNvbm5lY3Rpb24pO1xuXG4gICAgY29ubmVjdGlvbi5jaGFubmVsLm9ubWVzc2FnZSA9IChhKSA9PiB7XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlcyA9IGNvbm5lY3Rpb24ubWVzc2FnZXMuZ2V0VmFsdWUoKTtcblxuICAgICAgY3VycmVudE1lc3NhZ2VzLnVuc2hpZnQoYS5kYXRhKTtcblxuICAgICAgY29ubmVjdGlvbi5tZXNzYWdlcy5uZXh0KGN1cnJlbnRNZXNzYWdlcyk7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1dzQ2xpZW50U2VydmljZSB9IGZyb20gJy4vd3MtY2xpZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1dzQ2xpZW50U2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1dzQ2xpZW50TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbImZpbHRlciIsIm5vb3AiLCJBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFZRSw0QkFBbUIsZUFBNEIsRUFDckM7UUFEUyxvQkFBZSxHQUFmLGVBQWUsQ0FBYTtRQUNyQyxjQUFTLEdBQVQsU0FBUztLQUF1Qjs7Ozs7OztJQUUxQyxpQ0FBSTs7Ozs7O0lBQUosVUFBSyxPQUFlLEVBQUUsSUFBaUIsRUFBRSxR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QUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtDQUFrQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQ0FBa0MsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSw4Q0FBOEMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG1DQUFtQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQ0FBZ0MsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDJCQUEyQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwyQkFBMkIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDBCQUEwQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDZCQUE2QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHNDQUFzQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQ0FBa0MsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFF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