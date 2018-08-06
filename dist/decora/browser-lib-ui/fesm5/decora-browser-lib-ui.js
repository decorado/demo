import { Injectable, Inject, Optional, Component, Input, forwardRef, ViewChild, Output, EventEmitter, NgModule, ComponentFactoryResolver, ViewContainerRef, Directive, ElementRef, ContentChild, TemplateRef, ContentChildren, HostListener, Renderer, InjectionToken, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, share, tap, debounceTime, distinctUntilChanged, switchMap, startWith, map, filter } from 'rxjs/operators';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteTrigger, MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogRef, MatDialog, MatDialogModule, MatToolbarModule, MatMenuModule, MatChipsModule, MatCardModule, MatSnackBarModule, MatExpansionModule, MatTooltipModule, MatSidenavModule, MatListModule, MatProgressBarModule, MatTabsModule, MatSnackBar } from '@angular/material';
import { CommonModule, PlatformLocation } from '@angular/common';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NguCarouselModule } from '@ngu/carousel';
import 'hammerjs';
import { __spread, __assign } from 'tslib';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatSnackBar as MatSnackBar$1 } from '@angular/material/snack-bar';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DecApiService = /** @class */ (function () {
    function DecApiService(http, config) {
        var _this = this;
        this.http = http;
        this.config = config;
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
            if ((error.status === 401) && _this.config.authHost) {
                _this.goToLoginPage();
                return throwError({ status: status, statusText: statusText, message: message, bodyMessage: bodyMessage });
            }
            else {
                return throwError({ status: status, statusText: statusText, message: message, bodyMessage: bodyMessage });
            }
        };
        this.subscribeToUser();
        this.tryToLoadSignedInUser();
    }
    Object.defineProperty(DecApiService.prototype, "host", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.host;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecApiService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeToUser();
    };
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
            if (filter$$1.columns) {
                serializedFilter.columns = filter$$1.columns;
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
        var /** @type {?} */ nakedAuthDomain = this.config.authHost.split('?')[0]
            .replace('https://', '')
            .replace('http://', '')
            .replace('//', '');
        if (nakedAppDomain !== nakedAuthDomain) {
            var /** @type {?} */ authUrlWithRedirect = "" + this.config.authHost + this.getParamsDivider() + "redirectUrl=" + window.location.href;
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
        return this.config.authHost.split('?').length > 1 ? '&' : '?';
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
            console.log('DecoraApiService:: Started as logged');
        }, function (err) {
            if (err.status === 401) {
                console.log('DecoraApiService:: Started as not logged');
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
        var /** @type {?} */ basePath = this.config.useMockApi ? this.config.mockApiHost : this.config.host;
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
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['DECORA_API_SERVICE_CONFIG',] }] }
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
                    template: "<div>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    #termInput\n    [matAutocomplete]=\"autocomplete\"\n    [formControl]=\"autocompleteInput\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [placeholder]=\"placeholder\"\n    (blur)=\"onBlur($event)\">\n\n    <button mat-icon-button matSuffix (click)=\"clear(true)\" *ngIf=\"!disabled && !required && autocompleteInput.value\">\n      <mat-icon>close</mat-icon>\n    </button>\n\n    <button mat-icon-button matSuffix (click)=\"reset()\" *ngIf=\"!disabled && value !== writtenValue\">\n      <mat-icon>replay</mat-icon>\n    </button>\n\n  </mat-form-field>\n\n  <mat-autocomplete #autocomplete=\"matAutocomplete\"\n  [displayWith]=\"extractLabel\"\n  (optionSelected)=\"onOptionSelected($event)\"\n  name=\"autocompleteValue\">\n    <mat-option *ngFor=\"let item of (options$ | async)\" [value]=\"item\">\n      {{ extractLabel(item) }}\n    </mat-option>\n  </mat-autocomplete>\n</div>\n\n",
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
//  Used to extend ngForms functions
var /** @type {?} */ AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecAutocompleteAccountComponent; }),
    multi: true
};
var DecAutocompleteAccountComponent = /** @class */ (function () {
    function DecAutocompleteAccountComponent(decoraApi) {
        var _this = this;
        this.decoraApi = decoraApi;
        this.endpoint = 'accounts/options';
        this.labelAttr = 'value';
        this.valueAttr = 'key';
        this.name = 'Account autocomplete';
        this.placeholder = 'Account autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.innerValue = '';
        this.onTouchedCallback = noop$1;
        this.onChangeCallback = noop$1;
        this.customFetchFunction = function (textSearch) {
            var /** @type {?} */ filterGroups = [
                {
                    filters: [
                        { property: 'name', value: textSearch }
                    ]
                }
            ];
            if (_this.types) {
                filterGroups[0].filters.push({ property: 'role.$id', value: _this.types });
            }
            return _this.decoraApi.get(_this.endpoint, { filterGroups: filterGroups });
        };
    }
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
    DecAutocompleteAccountComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-account',
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[customFetchFunction]=\"customFetchFunction\"\n[(ngModel)]=\"value\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
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
        var _this = this;
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
        this.customFetchFunction = function (textSearch) {
            var /** @type {?} */ search = textSearch ? { textSearch: textSearch } : undefined;
            return _this.decoraApi.get(_this.endpoint, search)
                .pipe(map(function (roles) {
                return roles.filter(function (role) {
                    var /** @type {?} */ roleType = (role && role.key) ? role.key.split('.')[0] : undefined;
                    return !_this.types ? true : _this.types.indexOf(roleType) >= 0;
                });
            }));
        };
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
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[customFetchFunction]=\"customFetchFunction\"\n[(ngModel)]=\"value\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
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
        this.onTouchedCallback = noop$7;
        this.onChangeCallback = noop$7;
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
                    template: "<div class=\"dec-gallery-wrapper\">\n\n  <div class=\"image-highlighted\" [decImage]=\"imageHighlight\" [decImageSize]=\"{width:600}\"></div>\n\n  <div class=\"text-right\" *ngIf=\"imgExternalLink\">\n\n    <a href=\"{{ imgExternalLink }}\" target=\"_blank\">{{ 'label.image-link' | translate }}</a>\n\n  </div>\n\n  <ngu-carousel class=\"carousel-wrapper\" [inputs]=\"carouselConfig\" (initData)=\"onInitDataFn($event)\" (onMove)=\"onMoveFn($event)\">\n\n    <ngu-item NguCarouselItem *ngFor=\"let image of images\" [class.active]=\"image == imageHighlight\">\n\n      <img [decImage]=\"image\" [decImageSize]=\"{width:300, height:300}\" (click)=\"onSelectImage($event,image)\">\n\n    </ngu-item>\n\n    <mat-icon NguCarouselPrev class=\"left-previous\" [ngClass]=\"{'disabled': isFirst}\">chevron_left</mat-icon>\n\n    <mat-icon NguCarouselNext class=\"right-next\" [ngClass]=\"{'disabled': isLast}\">chevron_right</mat-icon>\n\n  </ngu-carousel>\n\n</div>\n",
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
                        NguCarouselModule
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
        this.colorHex = '#D3D3D3';
    }
    DecLabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-label',
                    template: "<div [ngStyle]=\"{'background-color': colorHex}\" decContrastFontWithBg>\n  <ng-content></ng-content>\n</div>\n",
                    styles: ["div{margin:4px;display:inline-block;padding:7px 12px;border-radius:24px;align-items:center;cursor:default}"]
                },] },
    ];
    DecLabelComponent.propDecorators = {
        colorHex: [{ type: Input }]
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
    Object.defineProperty(DecListTabsFilterComponent.prototype, "countEndpoint", {
        get: /**
         * @return {?}
         */
        function () {
            return this._countEndpoint;
        },
        /*
         * countEndpoint
         *
         *
         */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._countEndpoint !== v) {
                this._countEndpoint = (v[0] && v[0] === '/') ? v.replace('/', '') : v;
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
     * @param {?} count
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.getCountOf = /**
     * @param {?} count
     * @return {?}
     */
    function (count) {
        if (typeof count === 'string') {
            return this.countReport && this.countReport[count] >= 0 ? this.countReport[count] : '?';
        }
        else {
            return this.countReport && count(this.countReport) >= 0 ? count(this.countReport) : '?';
        }
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
    /**
     * @param {?} payload
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.reloadCountReport = /**
     * @param {?} payload
     * @return {?}
     */
    function (payload) {
        var _this = this;
        if (this.countEndpoint) {
            var /** @type {?} */ fetchMethod = this.customFetchMethod || this.service.get;
            fetchMethod(this.countEndpoint, payload)
                .toPromise()
                .then(function (res) {
                _this.countReport = res;
            });
        }
    };
    /**
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.selectedTab = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.filters ? this.filters.find(function (filter$$1) { return filter$$1.uid === _this.selectedTabUid; }) : undefined;
    };
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
                    template: "<div class=\"list-tabs-filter-wrapper\" *ngIf=\"visibleFilters as filters\">\n  <div fxLayout=\"row\" class=\"dec-tab-header\">\n    <ng-container *ngFor=\"let tabFilter of filters\">\n      <button type=\"button\"\n              *decPermission=\"tabFilter.permissions\"\n              mat-button\n              class=\"uppercase\"\n              (click)=\"selectTab(tabFilter.uid)\"\n              [class.selected]=\"selectedTabUid == (tabFilter.uid)\">\n        <span>{{ 'label.' + tabFilter.label | translate | uppercase }}</span>\n        <span *ngIf=\"tabFilter.count && countEndpoint && countReport\" class=\"badge badge-pill badge-small\">{{ getCountOf(tabFilter.count) }}</span>\n      </button>\n    </ng-container>\n  </div>\n</div>\n",
                    styles: [".list-tabs-filter-wrapper{margin-top:8px}.list-tabs-filter-wrapper .dec-tab-header.bottom{border-bottom:0}.list-tabs-filter-wrapper .dec-tab-header .badge{margin-left:8px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill{padding:8px;font-size:small;border-radius:24px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill.badge-small{font-size:x-small;padding:4px}"]
                },] },
    ];
    /** @nocollapse */
    DecListTabsFilterComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    DecListTabsFilterComponent.propDecorators = {
        filters: [{ type: Input }],
        countEndpoint: [{ type: Input }],
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
        this.reloadCountReport = function (payload) {
            if (_this.tabsFilterComponent) {
                _this.tabsFilterComponent.reloadCountReport(payload);
            }
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
                        if (base64Filter !== _this.currentBase64Filter) {
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
        this.currentBase64Filter = filter$$1;
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
                    template: "<div class=\"list-filter-wrapper\">\n  <div fxLayout=\"row wrap\" fxLayoutAlign=\"space-between center\">\n    <!--\n      Counter\n    -->\n    <div fxFlex=\"30\">\n      <ng-container *ngIf=\"count >= 0 && !loading\">\n        <span *ngIf=\"count === 0\" class=\"dec-body-strong\">{{ \"label.record-not-found\" | translate }}</span>\n        <span *ngIf=\"count === 1\" class=\"dec-body-strong\">{{ \"label.one-record-found\" | translate }}</span>\n        <span *ngIf=\"count > 1\" class=\"dec-body-strong\"> {{ \"label.records-found\" | translate:{count:count} }}</span>\n      </ng-container>\n    </div>\n\n    <div fxFlex=\"70\" class=\"text-right\">\n\n      <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"end center\" class=\"search-container\">\n        <div>\n\n          <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\" class=\"input-search-container\" [class.active]=\"showSearchInput\">\n            <!-- gap -->\n            <div></div>\n            <a class=\"btn-toogle-search\">\n              <mat-icon (click)=\"toggleSearchInput()\">search</mat-icon>\n            </a>\n            <form fxFlex role=\"form\" (submit)=\"onSearch()\">\n              <div fxLayout=\"row\" fxLayoutGap=\"16px\" fxLayoutAlign=\"start center\" class=\"input-search\">\n                <span class=\"bar-h\"></span>\n                <input fxFlex #inputSearch name=\"search\" [(ngModel)]=\"filterForm.search\">\n                <div *ngIf=\"advancedFilterComponent\" class=\"click\" (click)=\"toggleAdvancedFilter($event)\">\n                  <span class=\"dec-small btn-open-advanced-search\">{{\"label.advanced-options\" | translate}}</span>\n                </div>\n                <!--gap-->\n                <div></div>\n              </div>\n            </form>\n          </div>\n\n        </div>\n\n        <!--Refresh search-->\n        <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\">\n          <a class=\"btn-info margin-icon\" (click)=\"onSearch()\">\n            <mat-icon>refresh</mat-icon>\n          </a>\n        </div>\n        <!--Clear filters-->\n        <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\" *ngIf=\"filterGroupsWithoutTabs?.length\">\n          <a class=\"btn-info\" (click)=\"onClear()\">\n            <mat-icon>clear</mat-icon>\n          </a>\n        </div>\n\n        <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\" *ngIf=\"showInfoButton\">\n          <a class=\"btn-info\" (click)=\"onClickInfo()\">\n            <mat-icon>info_outline</mat-icon>\n          </a>\n        </div>\n\n      </div>\n\n    </div>\n  </div>\n\n\n  <div *ngIf=\"showAdvancedFilter\">\n\n    <mat-card class=\"advanced-search-container\" [ngClass]=\"{'remove-button-enabled': filterGroupsWithoutTabs?.length}\">\n\n      <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n\n        <a (click)=\"closeFilters()\" class=\"btn-close-advanced-search\">\n\n          <i class=\"material-icons\">close</i>\n\n        </a>\n\n      </div>\n\n      <div>\n\n        <ng-content select=\"dec-list-advanced-filter\"></ng-content>\n\n      </div>\n\n    </mat-card>\n\n  </div>\n\n  <dec-list-active-filter-resume\n    *ngIf=\"filterGroupsWithoutTabs?.length\"\n    [filterGroups]=\"filterGroupsWithoutTabs\"\n    (remove)=\"removeDecFilterGroup($event)\"\n    (edit)=\"editDecFilterGroup($event)\"></dec-list-active-filter-resume>\n\n  <dec-list-tabs-filter [filters]=\"filters\"></dec-list-tabs-filter>\n</div>\n",
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
                order: { type: event.sorts[0].dir }
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
        /*
          * collapsableFilters
          *
          *
          */
        this.collapsableFilters = [];
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
                var /** @type {?} */ selectedTab = _this.filter.tabsFilterComponent.selectedTab();
                if (selectedTab && selectedTab.listMode) {
                    listMode = selectedTab.listMode;
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
        if (this.filter) {
            this.filter.reloadCountReport(this.payload);
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
        var /** @type {?} */ filter$$1 = this.collapsableFilters.find(function (item) { return item.uid === filterUid; });
        var /** @type {?} */ filterGroup = { filters: filter$$1.filters };
        this.loadReport(true, filterGroup);
        setTimeout(function () {
            _this.opennedCollapsable = filter$$1.uid;
        }, 0);
    };
    /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilter
     * @return {?}
     */
    DecListComponent.prototype.loadReport = /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilter
     * @return {?}
     */
    function (clearAndReloadReport, collapseFilter) {
        var _this = this;
        return new Promise(function (res, rej) {
            if (clearAndReloadReport && _this.rows) {
                _this.setRows(_this.rows);
            }
            _this.clearAndReloadReport = clearAndReloadReport;
            _this.loading = true;
            if (_this.endpoint) {
                var /** @type {?} */ filterGroups = _this.filter ? _this.filter.filterGroups : undefined;
                if (collapseFilter) {
                    if (filterGroups) {
                        filterGroups.forEach(function (group) {
                            (_a = group.filters).push.apply(_a, __spread(collapseFilter.filters));
                            var _a;
                        });
                    }
                    else {
                        filterGroups = [collapseFilter];
                    }
                }
                var /** @type {?} */ payload = {};
                payload.limit = _this.limit;
                if (filterGroups) {
                    payload.filterGroups = filterGroups;
                }
                if (_this.columnsSortConfig) {
                    payload.columns = _this.columnsSortConfig;
                }
                if (!clearAndReloadReport && _this.report) {
                    payload.page = _this.report.page + 1;
                    payload.limit = _this.report.limit;
                }
                _this.payload = payload;
                _this.filterData.next({ endpoint: _this.endpoint, payload: payload, cbk: res, clear: clearAndReloadReport });
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
            var /** @type {?} */ payloadWithSearchableProperties = _this.getPayloadWithSearchTransformedIntoSearchableProperties();
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
     * @return {?}
     */
    DecListComponent.prototype.getPayloadWithSearchTransformedIntoSearchableProperties = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ payloadCopy = __assign({}, this.payload);
        if (payloadCopy.filterGroups && this.searchableProperties) {
            payloadCopy.filterGroups = __spread(this.payload.filterGroups);
            var /** @type {?} */ filterGroupThatContainsBasicSearch = this.getFilterGroupThatContainsTheBasicSearch(payloadCopy.filterGroups);
            if (filterGroupThatContainsBasicSearch) {
                this.removeFilterGroup(payloadCopy.filterGroups, filterGroupThatContainsBasicSearch);
                this.appendFilterGroupsBasedOnSearchableProperties(filterGroupThatContainsBasicSearch, payloadCopy);
            }
            return payloadCopy;
        }
        else {
            return this.payload;
        }
    };
    /**
     * @param {?} filterGroupsModel
     * @param {?} payload
     * @return {?}
     */
    DecListComponent.prototype.appendFilterGroupsBasedOnSearchableProperties = /**
     * @param {?} filterGroupsModel
     * @param {?} payload
     * @return {?}
     */
    function (filterGroupsModel, payload) {
        var /** @type {?} */ basicSearch = filterGroupsModel.filters.find(function (filter$$1) { return filter$$1.property === 'search'; });
        var /** @type {?} */ basicSearchIndex = filterGroupsModel.filters.indexOf(basicSearch);
        this.searchableProperties.forEach(function (property) {
            var /** @type {?} */ newFilterGroup = {
                filters: __spread(filterGroupsModel.filters)
            };
            newFilterGroup.filters[basicSearchIndex] = {
                property: property,
                value: basicSearch.value
            };
            payload.filterGroups.push(newFilterGroup);
        });
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
                if (_this.filterMode !== event.filterMode) {
                    if (event.filterMode === 'tabs') {
                        // if changing from collapse to tabs, clear the results before showing the rows
                        _this.setRows([]);
                    }
                    _this.filterMode = event.filterMode;
                }
                if (_this.filterMode === 'tabs') {
                    _this.opennedCollapsable = undefined;
                    _this.loadReport(true)
                        .then(function (res) {
                        if (event.recount) {
                            _this.reloadCountReport();
                        }
                    });
                }
                else {
                    if (_this.opennedCollapsable) {
                        _this.loadByOpennedCollapse(_this.opennedCollapsable);
                    }
                    else {
                        _this.collapsableFilters = event.children ? event.children : [];
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
                    template: "<!-- COMPONENT LAYOUT -->\n<div class=\"list-component-wrapper\">\n  <div *ngIf=\"filter\">\n    <ng-content select=\"dec-list-filter\"></ng-content>\n  </div>\n  <div *ngIf=\"report || filterMode === 'collapse'\">\n    <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n      <div fxFlex class=\"text-right\" *ngIf=\"tableAndGridAreSet()\">\n        <button type=\"button\" mat-icon-button (click)=\"toggleListMode()\">\n          <mat-icon title=\"Switch to table mode\" aria-label=\"Switch to table mode\" color=\"primary\" contrastFontWithBg *ngIf=\"listMode === 'grid'\">view_headline</mat-icon>\n          <mat-icon title=\"Switch to grid mode\" aria-label=\"Switch to grid mode\" color=\"primary\" contrastFontWithBg *ngIf=\"listMode === 'table'\">view_module</mat-icon>\n        </button>\n      </div>\n      <div fxFlex>\n        <div *ngIf=\"filterMode == 'collapse' then collapseTemplate else tabsTemplate\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- GRID TEMPLATE -->\n<ng-template #gridTemplate>\n  <ng-content select=\"dec-list-grid\"></ng-content>\n</ng-template>\n\n<!-- TABLE TEMPLATE -->\n<ng-template #listTemplate>\n  <ng-content select=\"dec-list-table\"></ng-content>\n</ng-template>\n\n<!-- FOOTER TEMPLATE -->\n<ng-template #footerTemplate>\n  <ng-content select=\"dec-list-footer\"></ng-content>\n  <p class=\"list-footer\">\n    {{ 'label.amount-loaded-of-total' |\n      translate:{\n        loaded: report?.result?.rows?.length,\n        total: report?.result?.count\n      }\n    }}\n  </p>\n</ng-template>\n\n<!-- COLLAPSE TEMPLATE -->\n<ng-template #tabsTemplate>\n  <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n    <div *ngIf=\"listMode == 'grid' then gridTemplate else listTemplate\"></div>\n    <!-- FOOTER CONTENT -->\n    <div fxFlex>\n      <div *ngIf=\"showFooter && !loading then footerTemplate\"></div>\n    </div>\n    <!-- LOADING SPINNER -->\n    <div fxFlex *ngIf=\"loading\" class=\"text-center loading-spinner-wrapper\">\n      <dec-spinner></dec-spinner>\n    </div>\n    <!-- LOAD MORE BUTTON -->\n    <div fxFlex *ngIf=\"!isLastPage && !loading && !disableShowMoreButton\" class=\"text-center\">\n      <button type=\"button\" mat-raised-button (click)=\"showMore()\">{{'label.show-more' | translate}}</button>\n    </div>\n  </div>\n</ng-template>\n\n<!-- COLLAPSE TEMPLATE -->\n<ng-template #collapseTemplate>\n  <mat-accordion>\n    <ng-container *ngFor=\"let filter of collapsableFilters\">\n      <mat-expansion-panel (opened)=\"searchCollapsable(filter)\">\n        <mat-expansion-panel-header>\n          <div class=\"collapse-title\" fxLayout=\"row\" fxLayoutGap=\"32px\" fxLayoutAlign=\"left center\">\n            <div fxFlex=\"96px\">\n              <dec-label [colorHex]=\"filter.color\">{{ filter.label.length }}</dec-label>\n            </div>\n            {{ 'label.' + filter.label | translate }}\n          </div>\n        </mat-expansion-panel-header>\n        <div *ngIf=\"opennedCollapsable === filter.uid\">\n          <ng-container [ngTemplateOutlet]=\"tabsTemplate\"></ng-container>\n        </div>\n      </mat-expansion-panel>\n    </ng-container>\n  </mat-accordion>\n  <div class=\"accordion-bottom-margin\"></div>\n</ng-template>\n\n",
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
    DecSidenavMenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-menu-item',
                    template: "<ng-template let-treeLevel=\"treeLevel\" #template>\n\n  <mat-list-item class=\"click dec-sidenav-menu-item\"\n  (click)=\"subitems.length ? toggleSubmenu() : openLink()\"\n  [ngStyle]=\"{backgroundColor: 'rgba(0, 0, 0, ' + treeLevel/6 + ')'}\">\n\n    <div class=\"item-wrapper\">\n\n      <div [ngStyle]=\"{paddingLeft: treeLevel * 16 + 'px'}\" class=\"item-content\">\n        <ng-content></ng-content>\n      </div>\n\n      <a *ngIf=\"subitems.length\" class=\"text-right\">\n        <ng-container [ngSwitch]=\"showSubmenu\">\n          <span *ngSwitchCase=\"false\"><i class=\"arrow down\"></i></span>\n          <span *ngSwitchCase=\"true\"><i class=\"arrow up\"></i></span>\n        </ng-container>\n      </a>\n    </div>\n\n  </mat-list-item>\n\n  <div class=\"subitem-menu\" *ngIf=\"showSubmenu\">\n\n    <dec-sidenav-menu [items]=\"subitems\" [treeLevel]=\"treeLevel\"></dec-sidenav-menu>\n\n  </div>\n\n</ng-template>\n",
                    styles: [".dec-sidenav-menu-item{height:56px!important;outline:0}.dec-sidenav-menu-item .item-wrapper{width:100%;display:flex;flex-flow:row no-wrap;justify-content:space-between}.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep .mat-icon,.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep i{vertical-align:middle;margin-bottom:5px;margin-right:8px}.dec-sidenav-menu-item .item-wrapper .right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.dec-sidenav-menu-item .item-wrapper .left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.dec-sidenav-menu-item .item-wrapper .up{transform:rotate(-135deg);-webkit-transform:rotate(-135deg)}.dec-sidenav-menu-item .item-wrapper .down{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.dec-sidenav-menu-item .text-right{text-align:right}.dec-sidenav-menu-item .click{cursor:pointer}.dec-sidenav-menu-item i{border:solid #000;border-width:0 2px 2px 0;display:inline-block;padding:4px}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavMenuItemComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    DecSidenavMenuItemComponent.propDecorators = {
        routerLink: [{ type: Input }],
        template: [{ type: ViewChild, args: [TemplateRef,] }],
        _subitems: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }]
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
var /** @type {?} */ noop$8 = function () {
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
        this.onTouchedCallback = noop$8;
        this.onChangeCallback = noop$8;
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
var /** @type {?} */ noop$9 = function () {
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
        this.onTouchedCallback = noop$9;
        this.onChangeCallback = noop$9;
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
var /** @type {?} */ DECORA_API_SERVICE_CONFIG = new InjectionToken('DECORA_API_SERVICE_CONFIG');
/**
 * @param {?} http
 * @param {?} serviceConfig
 * @return {?}
 */
function InitDecApiService(http, serviceConfig) {
    return new DecApiService(http, serviceConfig);
}
var DecApiModule = /** @class */ (function () {
    function DecApiModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    DecApiModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: DecApiModule,
            providers: [
                { provide: DECORA_API_SERVICE_CONFIG, useValue: config },
                {
                    provide: DecApiService,
                    useFactory: InitDecApiService,
                    deps: [HttpClient, DECORA_API_SERVICE_CONFIG]
                }
            ]
        };
    };
    DecApiModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule
                    ]
                },] },
    ];
    return DecApiModule;
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
                        DecApiModule,
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

export { AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, DecAutocompleteComponent, DecAutocompleteModule, DecAutocompleteAccountComponent, DecAutocompleteAccountModule, AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCompanyComponent, DecAutocompleteCompanyModule, AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCountryComponent, DecAutocompleteCountryModule, BASE_ENDPOINT, AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR, DecAutocompleteDepartmentComponent, DecAutocompleteDepartmentModule, DecAutocompleteRoleComponent, DecAutocompleteRoleModule, BASE_AUTOCOMPLETE_PROJECT_ENDPOINT, AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR, DecAutocompleteProjectComponent, DecAutocompleteProjectModule, AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR, DecAutocompleteQuoteComponent, DecAutocompleteQuoteModule, DecBreadcrumbComponent, DecBreadcrumbModule, DecDialogComponent, DecDialogModule, DecDialogService, DecGalleryComponent, DecGalleryModule, DecImageModule, DecImageDirective, DecLabelComponent, DecLabelModule, DecListModule, DecListFilter, DecListComponent, DecListActiveFilterResumeModule, DecListActiveFilterResumeComponent, DecListAdvancedFilterModule, DecListAdvancedFilterComponent, DecListFilterModule, DecListFilterComponent, DecListFooterComponent, DecListGridComponent, DecListTableModule, DecListTableComponent, DecListTableColumnComponent, DecListActionsModule, DecListActionsComponent, DecPageForbidenComponent, DecPageForbidenModule, DecPageNotFoundComponent, DecPageNotFoundModule, DecProductSpinComponent, DecProductSpinModule, DecSidenavModule, DecSidenavComponent, DecSidenavContentComponent, DecSidenavMenuItemComponent, DecSidenavMenuLeftComponent, DecSidenavMenuRightComponent, DecSidenavMenuTitleComponent, DecSidenavToolbarComponent, DecSidenavToolbarTitleComponent, DecSpinnerComponent, DecSpinnerModule, DecStepsListComponent, DecStepsListModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, DecStringArrayInputComponent, DecStringArrayInputModule, DecTabsModule, DecTabsComponent, DecTabModule, DecTabComponent, DecUploadModule, DEC_UPLOAD_CONTROL_VALUE_ACCESSOR, DecUploadComponent, DecPermissionDirective, DecPermissionModule, hexToRgbNew, standardize_color, DecContrastFontWithBgDirective, DecContrastFontWithBgModule, DecGuardModule, DecAuthGuard, DecApiService, DECORA_API_SERVICE_CONFIG, InitDecApiService, DecApiModule, UserAuthData, DecSnackBarService, DecSnackBarModule, DecPermissionGuard, DecPermissionGuardModule, DecWsClientService, DecWsClientModule, DecListTabsFilterComponent as ɵa, DecSidenavMenuComponent as ɵc, DecSidenavService as ɵb, DecTabMenuComponent as ɵd };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWJyb3dzZXItbGliLXVpLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1hY2NvdW50L2F1dG9jb21wbGV0ZS1hY2NvdW50LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtYWNjb3VudC9hdXRvY29tcGxldGUtYWNjb3VudC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWNvbXBhbnkvYXV0b2NvbXBsZXRlLWNvbXBhbnkuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb21wYW55L2F1dG9jb21wbGV0ZS1jb21wYW55Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtY291bnRyeS9hdXRvY29tcGxldGUtY291bnRyeS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWNvdW50cnkvYXV0b2NvbXBsZXRlLWNvdW50cnkubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1kZXBhcnRtZW50L2F1dG9jb21wbGV0ZS1kZXBhcnRtZW50LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXJvbGUvYXV0b2NvbXBsZXRlLXJvbGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1yb2xlL2F1dG9jb21wbGV0ZS1yb2xlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcHJvamVjdC9hdXRvY29tcGxldGUtcHJvamVjdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXByb2plY3QvYXV0b2NvbXBsZXRlLXByb2plY3QubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1xdW90ZS9hdXRvY29tcGxldGUtcXVvdGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1xdW90ZS9hdXRvY29tcGxldGUtcXVvdGUubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtZGlhbG9nL2RlYy1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zcGlubmVyL2RlYy1zcGlubmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2Nhcm91c2VsLWNvbmZpZy50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2RlYy1nYWxsZXJ5LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUuY29uc3RhbnRzLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZ2FsbGVyeS9kZWMtZ2FsbGVyeS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWxhYmVsL2RlYy1sYWJlbC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2RpcmVjdGl2ZXMvY29sb3IvY29udHJhc3QtZm9udC13aXRoLWJnL2RlYy1jb250cmFzdC1mb250LXdpdGgtYmcuZGlyZWN0aXZlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2NvbG9yL2NvbnRyYXN0LWZvbnQtd2l0aC1iZy9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtbGFiZWwvZGVjLWxhYmVsLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QubW9kZWxzLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1maWx0ZXIvbGlzdC10YWJzLWZpbHRlci9saXN0LXRhYnMtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZmlsdGVyL2xpc3QtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL3Blcm1pc3Npb24vZGVjLXBlcm1pc3Npb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL3Blcm1pc3Npb24vZGVjLXBlcm1pc3Npb24ubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1ncmlkL2xpc3QtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LXRhYmxlLWNvbHVtbi9saXN0LXRhYmxlLWNvbHVtbi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LXRhYmxlL2xpc3QtdGFibGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LXRhYmxlL2xpc3QtdGFibGUubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1mb290ZXIvbGlzdC1mb290ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hZHZhbmNlZC1maWx0ZXIvbGlzdC1hZHZhbmNlZC1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hY3Rpb25zL2xpc3QtYWN0aW9ucy5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFjdGlvbnMvbGlzdC1hY3Rpb25zLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2UtZm9yYmlkZW4vcGFnZS1mb3JiaWRlbi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvcGFnZS1mb3JiaWRlbi9wYWdlLWZvcmJpZGVuLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wYWdlLW5vdC1mb3VuZC9wYWdlLW5vdC1mb3VuZC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvcGFnZS1ub3QtZm91bmQvcGFnZS1ub3QtZm91bmQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3Byb2R1Y3Qtc3Bpbi9wcm9kdWN0LXNwaW4uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3Byb2R1Y3Qtc3Bpbi9wcm9kdWN0LXNwaW4ubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LXRvb2xiYXIvZGVjLXNpZGVuYXYtdG9vbGJhci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LWl0ZW0vZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUvZGVjLXNpZGVuYXYtbWVudS10aXRsZS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9zaWRlbmF2LnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LWxlZnQvZGVjLXNpZGVuYXYtbWVudS1sZWZ0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQvZGVjLXNpZGVuYXYtbWVudS1yaWdodC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LWNvbnRlbnQvZGVjLXNpZGVuYXYtY29udGVudC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51L2RlYy1zaWRlbmF2LW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXN0ZXBzLWxpc3QvZGVjLXN0ZXBzLWxpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zdGVwcy1saXN0L2RlYy1zdGVwcy1saXN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3RyaW5nLWFycmF5LWlucHV0L2RlYy1zdHJpbmctYXJyYXktaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zdHJpbmctYXJyYXktaW5wdXQvZGVjLXN0cmluZy1hcnJheS1pbnB1dC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdGFicy90YWIvdGFiLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYi1tZW51L3RhYi1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYnMuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFiL3RhYi5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdGFicy90YWJzLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9ndWFyZC9hdXRoLWd1YXJkLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2d1YXJkL2d1YXJkLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvcGVybWlzc2lvbi1ndWFyZC9kZWMtcGVybWlzc2lvbi1ndWFyZC5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9wZXJtaXNzaW9uLWd1YXJkL2RlYy1wZXJtaXNzaW9uLWd1YXJkLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvd3MtY2xpZW50L3dzLWNsaWVudC5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy93cy1jbGllbnQvd3MtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBzaGFyZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVXNlckF1dGhEYXRhLCBMb2dpbkRhdGEsIEZhY2Vib29rTG9naW5EYXRhLCBTZXJ2aWNlQ29uZmlnLCBEZWNGaWx0ZXIsIFNlcmlhbGl6ZWREZWNGaWx0ZXIgfSBmcm9tICcuL2RlY29yYS1hcGkubW9kZWwnO1xuXG5leHBvcnQgdHlwZSBDYWxsT3B0aW9ucyA9IHtcbiAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xuICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICBwYXJhbXM/OiB7XG4gICAgW3Byb3A6IHN0cmluZ106IGFueTtcbiAgfTtcbn0gJiB7XG4gIFtwcm9wOiBzdHJpbmddOiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBIdHRwUmVxdWVzdFR5cGVzID0gJ0dFVCcgfCAnUE9TVCcgfCAnUFVUJyB8ICdQQVRDSCcgfCAnREVMRVRFJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0FwaVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHVzZXI6IFVzZXJBdXRoRGF0YTtcblxuICB1c2VyJDogQmVoYXZpb3JTdWJqZWN0PFVzZXJBdXRoRGF0YT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFVzZXJBdXRoRGF0YT4odW5kZWZpbmVkKTtcblxuICBwcml2YXRlIHNlc3Npb25Ub2tlbjogc3RyaW5nO1xuXG4gIHByaXZhdGUgdXNlclN1YnNjcmlwaW9uOiBTdWJzY3JpcHRpb247XG5cbiAgZ2V0IGhvc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmhvc3Q7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnREVDT1JBX0FQSV9TRVJWSUNFX0NPTkZJRycpIHByaXZhdGUgY29uZmlnOiBTZXJ2aWNlQ29uZmlnXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaWJlVG9Vc2VyKCk7XG4gICAgdGhpcy50cnlUb0xvYWRTaWduZWRJblVzZXIoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUb1VzZXIoKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gUFVCTElDIEFVVEggTUVUSE9EUyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIGF1dGggPSAobG9naW5EYXRhOiBMb2dpbkRhdGEpID0+IHtcbiAgICBpZiAobG9naW5EYXRhKSB7XG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvc2lnbmluJyk7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgICBjb25zdCBib2R5ID0gbmV3IEh0dHBQYXJhbXMoKVxuICAgICAgICAuc2V0KCd1c2VybmFtZScsIGxvZ2luRGF0YS5lbWFpbClcbiAgICAgICAgLnNldCgncGFzc3dvcmQnLCBsb2dpbkRhdGEucGFzc3dvcmQpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCBib2R5LCBvcHRpb25zKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBub3RpZmllZDogdHJ1ZSwgbWVzc2FnZTogJ0RFQ09SQS1BUEkgQVVUSCBFUlJPUjo6IE5vIGNyZWRlbnRpYWxzIHByb3ZpZGVkJyB9KTtcbiAgICB9XG4gIH1cblxuICBhdXRoRmFjZWJvb2sgPSAobG9naW5EYXRhOiBGYWNlYm9va0xvZ2luRGF0YSkgPT4ge1xuICAgIGlmIChsb2dpbkRhdGEpIHtcbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9mYWNlYm9vay9zaWduaW4nKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICAgIGNvbnN0IGJvZHkgPSBuZXcgSHR0cFBhcmFtcygpXG4gICAgICAgIC5zZXQoJ2ZhY2Vib29rVG9rZW4nLCBsb2dpbkRhdGEuZmFjZWJvb2tUb2tlbilcbiAgICAgICAgLnNldCgna2VlcExvZ2dlZCcsIGxvZ2luRGF0YS5rZWVwTG9nZ2VkLnRvU3RyaW5nKCkpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCBib2R5LCBvcHRpb25zKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBub3RpZmllZDogdHJ1ZSwgbWVzc2FnZTogJ0RFQ09SQS1BUEkgQVVUSCBGQUNFQk9PSyBFUlJPUjo6IE5vIGNyZWRlbnRpYWxzIHByb3ZpZGVkJyB9KTtcbiAgICB9XG4gIH1cblxuICBsb2dvdXQgPSAocmVkaXJlY3RUb0xvZ2luUGFnZSA9IHRydWUpID0+IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvc2lnbm91dCcpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kKGVuZHBvaW50LCB7fSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuc2Vzc2lvblRva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgIGlmIChyZWRpcmVjdFRvTG9naW5QYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmdvVG9Mb2dpblBhZ2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSkpO1xuICB9XG5cbiAgZmV0Y2hDdXJyZW50TG9nZ2VkVXNlciA9ICgpID0+IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvYWNjb3VudCcpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbigpIH07XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kPFVzZXJBdXRoRGF0YT4oZW5kcG9pbnQsIHt9LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5leHRyYXRTZXNzaW9uVG9rZW4ocmVzKSxcbiAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBQVUJMSUMgSFRUUCBNRVRIT0RTIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgZ2V0ID0gPFQ+KGVuZHBvaW50LCBzZWFyY2g/OiBEZWNGaWx0ZXIsIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy50cmFuc2Zvcm1EZWNGaWx0ZXJJblBhcmFtcyhzZWFyY2gpO1xuICAgIHJldHVybiB0aGlzLmdldE1ldGhvZDxUPihlbmRvcGludFVybCwgcGFyYW1zLCBvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZSA9IDxUPihlbmRwb2ludCwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5kZWxldGVNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgcGF0Y2ggPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLnBhdGNoTWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3QgPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHV0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wdXRNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgdXBzZXJ0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgaWYgKHBheWxvYWQuaWQgPj0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0KGVuZHBvaW50LCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChlbmRwb2ludCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgdXBsb2FkKGVuZHBvaW50OiBzdHJpbmcsIGZpbGVzOiBGaWxlW10sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5jcmVhdGVGaWxlc0Zvcm1EYXRhKGZpbGVzKTtcbiAgICBvcHRpb25zLnJlcG9ydFByb2dyZXNzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdE1ldGhvZCgnUE9TVCcsIGVuZG9waW50VXJsLCBmb3JtRGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIC8vICoqKioqKioqKioqKiAvL1xuICAvLyBQdWJsaWMgSGVscGVyIE1ldGhvZHMgLy9cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIHByaXZhdGUgdHJhbnNmb3JtRGVjRmlsdGVySW5QYXJhbXMoZmlsdGVyOiBEZWNGaWx0ZXIpOiBTZXJpYWxpemVkRGVjRmlsdGVyIHtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZWRGaWx0ZXI6IFNlcmlhbGl6ZWREZWNGaWx0ZXIgPSB7fTtcblxuICAgIGlmIChmaWx0ZXIpIHtcblxuICAgICAgaWYgKGZpbHRlci5wYWdlKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIucGFnZSA9IGZpbHRlci5wYWdlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLmxpbWl0KSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIubGltaXQgPSBmaWx0ZXIubGltaXQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuZmlsdGVyR3JvdXBzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcldpdGhWYWx1ZUFzQXJyYXkgPSB0aGlzLmdldEZpbHRlcldpdGhWYWx1ZXNBc0FycmF5KGZpbHRlci5maWx0ZXJHcm91cHMpO1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLmZpbHRlciA9IHRoaXMuZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhmaWx0ZXJXaXRoVmFsdWVBc0FycmF5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5wcm9qZWN0Vmlldykge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnByb2plY3RWaWV3ID0gdGhpcy5maWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKGZpbHRlci5wcm9qZWN0Vmlldyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuY29sdW1ucykge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLmNvbHVtbnMgPSBmaWx0ZXIuY29sdW1ucztcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci50ZXh0U2VhcmNoKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIudGV4dFNlYXJjaCA9IGZpbHRlci50ZXh0U2VhcmNoO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlcmlhbGl6ZWRGaWx0ZXI7XG5cbiAgfVxuXG4gIHByaXZhdGUgZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhvYmopIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEZpbHRlcldpdGhWYWx1ZXNBc0FycmF5KGZpbHRlckdyb3Vwcykge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWx0ZXJHcm91cHMpKTsgLy8gbWFrZSBhIGNvcHkgb2YgdGhlIGZpbHRlciBzbyB3ZSBkbyBub3QgY2hhbmdlIHRoZSBvcmlnaW5hbCBmaWx0ZXJcblxuICAgIGlmIChmaWx0ZXJHcm91cENvcHkpIHtcblxuICAgICAgcmV0dXJuIGZpbHRlckdyb3VwQ29weS5tYXAoZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMgPSBmaWx0ZXJHcm91cC5maWx0ZXJzLm1hcChmaWx0ZXIgPT4ge1xuXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGZpbHRlci52YWx1ZSkpIHtcbiAgICAgICAgICAgIGZpbHRlci52YWx1ZSA9IFtmaWx0ZXIudmFsdWVdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZpbHRlckdyb3VwO1xuXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiBmaWx0ZXJHcm91cHM7XG5cbiAgICB9XG4gIH1cblxuXG4gIC8vICoqKioqKioqKioqKiAvL1xuICAvLyBIdHRwIE1ldGhvZHMgLy9cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIHByaXZhdGUgZ2V0TWV0aG9kPFQ+KHVybDogc3RyaW5nLCBzZWFyY2ggPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy5wYXJhbXMgPSBzZWFyY2g7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAuZ2V0PFQ+KHVybCwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHBhdGNoTWV0aG9kPFQ+KHVybCwgYm9keSA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wYXRjaDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3N0TWV0aG9kPFQ+KHVybCwgYm9keT8sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnBvc3Q8VD4odXJsLCBib2R5LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcHV0TWV0aG9kPFQ+KHVybCwgYm9keSA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wdXQ8VD4odXJsLCBib2R5LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVsZXRlTWV0aG9kPFQ+KHVybDogc3RyaW5nLCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5kZWxldGU8VD4odXJsLCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdE1ldGhvZDxUPih0eXBlOiBIdHRwUmVxdWVzdFR5cGVzLCB1cmw6IHN0cmluZywgYm9keTogYW55ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4odW5kZWZpbmVkLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCh0eXBlLCB1cmwsIGJvZHksIG9wdGlvbnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnJlcXVlc3Q8VD4ocmVxKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAoZXJyb3I6IGFueSkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgIGNvbnN0IGJvZHlNZXNzYWdlID0gKGVycm9yICYmIGVycm9yLmVycm9yKSA/IGVycm9yLmVycm9yLm1lc3NhZ2UgOiAnJztcbiAgICBjb25zdCBzdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgY29uc3Qgc3RhdHVzVGV4dCA9IGVycm9yLnN0YXR1c1RleHQ7XG4gICAgaWYgKChlcnJvci5zdGF0dXMgPT09IDQwMSkgJiYgdGhpcy5jb25maWcuYXV0aEhvc3QpIHtcbiAgICAgIHRoaXMuZ29Ub0xvZ2luUGFnZSgpO1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoeyBzdGF0dXMsIHN0YXR1c1RleHQsIG1lc3NhZ2UsIGJvZHlNZXNzYWdlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgc3RhdHVzVGV4dCwgbWVzc2FnZSwgYm9keU1lc3NhZ2UgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gKioqKioqKiAvL1xuICAvLyBIZWxwZXJzIC8vXG4gIC8vICoqKioqKiogLy9cblxuICBwcml2YXRlIGNyZWF0ZUZpbGVzRm9ybURhdGEoZmlsZXM6IEZpbGVbXSkge1xuICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZpbGVzLmZvckVhY2goKGZpbGUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBmb3JtSXRlbU5hbWUgPSBpbmRleCA+IDAgPyBgZmlsZS0ke2luZGV4fWAgOiAnZmlsZSc7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoZm9ybUl0ZW1OYW1lLCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub0xvZ2luUGFnZSgpIHtcbiAgICBjb25zdCBuYWtlZEFwcERvbWFpbiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgICAucmVwbGFjZSgnaHR0cHM6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKCdodHRwOi8vJywgJycpXG4gICAgICAucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uc2VhcmNoLCAnJyk7XG5cbiAgICBjb25zdCBuYWtlZEF1dGhEb21haW4gPSB0aGlzLmNvbmZpZy5hdXRoSG9zdC5zcGxpdCgnPycpWzBdXG4gICAgICAucmVwbGFjZSgnaHR0cHM6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKCdodHRwOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnLy8nLCAnJyk7XG5cbiAgICBpZiAobmFrZWRBcHBEb21haW4gIT09IG5ha2VkQXV0aERvbWFpbikge1xuICAgICAgY29uc3QgYXV0aFVybFdpdGhSZWRpcmVjdCA9IGAke3RoaXMuY29uZmlnLmF1dGhIb3N0fSR7dGhpcy5nZXRQYXJhbXNEaXZpZGVyKCl9cmVkaXJlY3RVcmw9JHt3aW5kb3cubG9jYXRpb24uaHJlZn1gO1xuICAgICAgY29uc29sZS5sb2coYERlY0FwaVNlcnZpY2U6OiBOb3QgYXV0aGVudGljYXRlZC4gUmVkaXJlY3RpbmcgdG8gbG9naW4gcGFnZSBhdDogJHthdXRoVXJsV2l0aFJlZGlyZWN0fWApO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhdXRoVXJsV2l0aFJlZGlyZWN0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFyYW1zRGl2aWRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuYXV0aEhvc3Quc3BsaXQoJz8nKS5sZW5ndGggPiAxID8gJyYnIDogJz8nO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlUb0xvYWRTaWduZWRJblVzZXIoKSB7XG4gICAgdGhpcy5mZXRjaEN1cnJlbnRMb2dnZWRVc2VyKClcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0RlY29yYUFwaVNlcnZpY2U6OiBTdGFydGVkIGFzIGxvZ2dlZCcpO1xuICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdEZWNvcmFBcGlTZXJ2aWNlOjogU3RhcnRlZCBhcyBub3QgbG9nZ2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRGVjb3JhQXBpU2VydmljZTo6IEluaXRpYWxpemF0aW9uIEVycm9yLiBDb3VsZCByZXRyaWV2ZSB1c2VyIGFjY291bnQnLCBlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih0eXBlPzogc3RyaW5nLCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpIHtcbiAgICBoZWFkZXJzID0gaGVhZGVycyB8fCBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICBjb25zdCBjdXN0b21pemVkQ29udGVudFR5cGUgPSBoZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKCFjdXN0b21pemVkQ29udGVudFR5cGUgJiYgdHlwZSkge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCB0eXBlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2Vzc2lvblRva2VuKSB7XG4gICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ1gtQXV0aC1Ub2tlbicsIHRoaXMuc2Vzc2lvblRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhdFNlc3Npb25Ub2tlbihyZXMpIHtcbiAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHJlcyAmJiByZXMuc2Vzc2lvbiA/IHJlcy5zZXNzaW9uLmlkIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwcml2YXRlIGdldFJlc291cmNlVXJsKHBhdGgpIHtcblxuICAgIGNvbnN0IGJhc2VQYXRoID0gdGhpcy5jb25maWcudXNlTW9ja0FwaSA/IHRoaXMuY29uZmlnLm1vY2tBcGlIb3N0IDogdGhpcy5jb25maWcuaG9zdDtcblxuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC98XFwvJC9nLCAnJyk7XG5cbiAgICByZXR1cm4gYCR7YmFzZVBhdGh9LyR7cGF0aH1gO1xuXG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvVXNlcigpIHtcbiAgICB0aGlzLnVzZXJTdWJzY3JpcGlvbiA9IHRoaXMudXNlciQuc3Vic2NyaWJlKHVzZXIgPT4ge1xuICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb1VzZXIoKSB7XG4gICAgdGhpcy51c2VyU3Vic2NyaXBpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qXG4gICogU2hhcmUgT2JzZXJ2YWJsZVxuICAqXG4gICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBzaGFyZSB0aGUgYWN0dWFsIGRhdGEgdmFsdWVzIGFuZCBub3QganVzdCB0aGUgb2JzZXJ2YWJsZSBpbnN0YW5jZVxuICAqXG4gICogVG8gcmV1c2UgYSBzaW5nbGUsIGNvbW1vbiBzdHJlYW0gYW5kIGF2b2lkIG1ha2luZyBhbm90aGVyIHN1YnNjcmlwdGlvbiB0byB0aGUgc2VydmVyIHByb3ZpZGluZyB0aGF0IGRhdGEuXG4gICpcbiAgKi9cbiAgcHJpdmF0ZSBzaGFyZU9ic2VydmFibGUoY2FsbDogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgcmV0dXJuIGNhbGwucGlwZShzaGFyZSgpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgZm9yd2FyZFJlZiwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwLCBzdGFydFdpdGgsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExhYmVsRnVuY3Rpb24sIFZhbHVlRnVuY3Rpb24sIFNlbGVjdGlvbkV2ZW50LCBDdXN0b21GZXRjaEZ1bmN0aW9uIH0gZnJvbSAnLi9hdXRvY29tcGxldGUubW9kZWxzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICAjdGVybUlucHV0XG4gICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIlxuICAgIFtmb3JtQ29udHJvbF09XCJhdXRvY29tcGxldGVJbnB1dFwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCI+XG5cbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXRTdWZmaXggKGNsaWNrKT1cImNsZWFyKHRydWUpXCIgKm5nSWY9XCIhZGlzYWJsZWQgJiYgIXJlcXVpcmVkICYmIGF1dG9jb21wbGV0ZUlucHV0LnZhbHVlXCI+XG4gICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJyZXNldCgpXCIgKm5nSWY9XCIhZGlzYWJsZWQgJiYgdmFsdWUgIT09IHdyaXR0ZW5WYWx1ZVwiPlxuICAgICAgPG1hdC1pY29uPnJlcGxheTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG5cbiAgPC9tYXQtZm9ybS1maWVsZD5cblxuICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0b2NvbXBsZXRlPVwibWF0QXV0b2NvbXBsZXRlXCJcbiAgW2Rpc3BsYXlXaXRoXT1cImV4dHJhY3RMYWJlbFwiXG4gIChvcHRpb25TZWxlY3RlZCk9XCJvbk9wdGlvblNlbGVjdGVkKCRldmVudClcIlxuICBuYW1lPVwiYXV0b2NvbXBsZXRlVmFsdWVcIj5cbiAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiAob3B0aW9ucyQgfCBhc3luYylcIiBbdmFsdWVdPVwiaXRlbVwiPlxuICAgICAge3sgZXh0cmFjdExhYmVsKGl0ZW0pIH19XG4gICAgPC9tYXQtb3B0aW9uPlxuICA8L21hdC1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBWaWV3Q2hpbGQoTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcikgIGF1dG9jb21wbGV0ZVRyaWdnZXI6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXI7XG5cbiAgYXV0b2NvbXBsZXRlSW5wdXQ6IEZvcm1Db250cm9sO1xuXG4gIG9wdGlvbnMkOiBPYnNlcnZhYmxlPGFueVtdPjtcblxuICB3cml0dGVuVmFsdWU6IGFueTtcblxuICAvLyBQYXJhbXNcbiAgQElucHV0KCkgY3VzdG9tRmV0Y2hGdW5jdGlvbjogQ3VzdG9tRmV0Y2hGdW5jdGlvbjtcblxuICBASW5wdXQoKSBlbmRwb2ludDtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdjtcbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGVJbnB1dCkge1xuICAgICAgaWYgKHYpIHtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5kaXNhYmxlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgQElucHV0KCkgbGFiZWxGbjogTGFiZWxGdW5jdGlvbjtcblxuICBASW5wdXQoKSBsYWJlbEF0dHI6IHN0cmluZztcblxuICBASW5wdXQoKSBuYW1lID0gJ2F1dG9jb21wbGV0ZUlucHV0JztcblxuICBASW5wdXQoKVxuICBzZXQgb3B0aW9ucyh2OiBhbnlbXSkge1xuICAgIHRoaXMuX29wdGlvbnMgPSB2O1xuICAgIHRoaXMuaW5uZXJPcHRpb25zID0gdjtcbiAgfVxuICBnZXQgb3B0aW9ucygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gIH1cblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHZhbHVlRm46IFZhbHVlRnVuY3Rpb247XG5cbiAgQElucHV0KCkgdmFsdWVBdHRyOiBzdHJpbmc7XG5cbiAgLy8gRXZlbnRzXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+KCk7XG5cbiAgLy8gVmlldyBlbGVtZW50c1xuICBAVmlld0NoaWxkKCd0ZXJtSW5wdXQnKSB0ZXJtSW5wdXQ7XG5cbiAgLy8gcHJpdmF0ZSBkYXRhO1xuICBwcml2YXRlIG9wdGlvbnMkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55W107XG5cbiAgaW5uZXJPcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIHByaXZhdGUgZmlsdGVyZWRPcHRpb25zOiBhbnlbXSA9IFtdO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNyZWF0ZUlucHV0KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kZXRlY3RSZXF1aXJlZERhdGEoKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9PcHRpb25zKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9PcHRpb25zKCk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIFZBTFVFXG4gICovXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLnNldElubmVyVmFsdWUodik7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHY6IGFueSkge1xuICAgIHRoaXMud3JpdHRlblZhbHVlID0gdjtcbiAgICB2ID0gdiA/IHYgOiB1bmRlZmluZWQ7IC8vIGF2b2lkIG51bGwgdmFsdWVzXG4gICAgY29uc3QgaGFzRGlmZmVyZW5jZSA9ICF0aGlzLmNvbXBhcmVBc1N0cmluZyh2LCB0aGlzLnZhbHVlKTtcbiAgICBpZiAoaGFzRGlmZmVyZW5jZSkge1xuICAgICAgdGhpcy5sb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUodilcbiAgICAgIC50aGVuKChvcHRpb25zKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSAkZXZlbnQub3B0aW9uLnZhbHVlO1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShzZWxlY3RlZE9wdGlvbik7XG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uVmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZE9wdGlvblZhbHVlO1xuICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgIG9wdGlvbjogc2VsZWN0ZWRPcHRpb24sXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuaW5uZXJPcHRpb25zLFxuICAgICAgICBmaWx0ZXJlZE9wdGlvbnM6IHRoaXMuZmlsdGVyZWRPcHRpb25zLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0Rm9jdXMoKSB7XG4gICAgdGhpcy50ZXJtSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgb3BlblBhbmVsKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlVHJpZ2dlci5vcGVuUGFuZWwoKTtcbiAgfVxuXG4gIGNsb3NlUGFuZWwoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVUcmlnZ2VyLmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIG9uQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBjbGVhcihyZW9wZW4gPSBmYWxzZSkge1xuICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5zZXRWYWx1ZSgnJyk7XG4gICAgaWYgKHRoaXMud3JpdHRlblZhbHVlID09PSB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnJlc2V0SW5wdXRDb250cm9sKCk7XG4gICAgfVxuICAgIGlmIChyZW9wZW4pIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm9wZW5QYW5lbCgpO1xuICAgICAgfSwgMSk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMud3JpdHRlblZhbHVlO1xuICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh0aGlzLndyaXR0ZW5WYWx1ZSk7XG4gICAgdGhpcy5yZXNldElucHV0Q29udHJvbCgpO1xuICB9XG5cbiAgZXh0cmFjdExhYmVsOiBMYWJlbEZ1bmN0aW9uID0gKGl0ZW06IGFueSk6IHN0cmluZyA9PiB7XG4gICAgbGV0IGxhYmVsID0gaXRlbTsgLy8gdXNlIHRoZSBvYmplY3QgaXRzZWxmIGlmIG5vIGxhYmVsIGZ1bmN0aW9uIG9yIGF0dHJpYnV0ZSBpcyBwcm92aWRlZFxuICAgIGlmIChpdGVtKSB7XG4gICAgICBpZiAodGhpcy5sYWJlbEZuKSB7IC8vIFVzZSBjdXN0b20gbGFiZWwgZnVuY3Rpb24gaWYgcHJvdmlkZWRcbiAgICAgICAgbGFiZWwgPSB0aGlzLmxhYmVsRm4oaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubGFiZWxBdHRyKSB7IC8vIFVzZSBvYmplY3QgbGFiZWwgYXR0cmlidXRlIGlmIHByb3ZpZGVkXG4gICAgICAgIGxhYmVsID0gaXRlbVt0aGlzLmxhYmVsQXR0cl0gfHwgdW5kZWZpbmVkO1xuXG4gICAgICB9XG4gICAgfVxuICAgIGxhYmVsID0gdGhpcy5lbnN1cmVTdHJpbmcobGFiZWwpO1xuICAgIHJldHVybiBsYWJlbDtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlKHdyaXR0ZW5WYWx1ZTogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAod3JpdHRlblZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUod3JpdHRlblZhbHVlKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHdyaXR0ZW5WYWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh3cml0dGVuVmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RSZXF1aXJlZERhdGEoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IGVycm9yOiBzdHJpbmc7XG4gICAgICBpZiAoIXRoaXMuZW5kcG9pbnQgJiYgIXRoaXMub3B0aW9ucyAmJiAhdGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKSB7XG4gICAgICAgIGVycm9yID0gJ05vIGVuZHBvaW50IHwgb3B0aW9ucyB8IGN1c3RvbUZldGNoRnVuY3Rpb24gc2V0LiBZb3UgbXVzdCBwcm92aWRlIG9uZSBvZiB0aGVtIHRvIGJlIGFibGUgdG8gdXNlIHRoZSBBdXRvY29tcGxldGUnO1xuICAgICAgfVxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRoaXMucmFpc2VFcnJvcihlcnJvcik7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0SW5wdXRDb250cm9sKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubWFya0FzUHJpc3RpbmUoKTtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm1hcmtBc1VudG91Y2hlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0VmFsdWU6IFZhbHVlRnVuY3Rpb24gPSAoaXRlbTogYW55KTogYW55ID0+IHtcbiAgICBsZXQgdmFsdWUgPSBpdGVtOyAvLyB1c2UgdGhlIG9iamVjdCBpdHNlbGYgaWYgbm8gdmFsdWUgZnVuY3Rpb24gb3IgYXR0cmlidXRlIGlzIHByb3ZpZGVkXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlRm4pIHsgLy8gVXNlIGN1c3RvbSB2YWx1ZSBmdW5jdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVGbihpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52YWx1ZUF0dHIpIHsgLy8gVXNlIG9iamVjdCB2YWx1ZSBhdHRyaWJ1dGUgaWYgcHJvdmlkZWRcbiAgICAgICAgdmFsdWUgPSBpdGVtW3RoaXMudmFsdWVBdHRyXSB8fCB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcGFyZUFzU3RyaW5nKHYxLCB2Mikge1xuICAgIGNvbnN0IHN0cmluZzEgPSB0aGlzLmVuc3VyZVN0cmluZyh2MSk7XG4gICAgY29uc3Qgc3RyaW5nMiA9IHRoaXMuZW5zdXJlU3RyaW5nKHYyKTtcbiAgICByZXR1cm4gc3RyaW5nMSA9PT0gc3RyaW5nMjtcbiAgfVxuXG4gIHByaXZhdGUgZW5zdXJlU3RyaW5nKHYpIHtcbiAgICBpZiAodHlwZW9mIHYgIT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoaXNOYU4odikpIHtcbiAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdiA9IGAke3Z9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvT3B0aW9ucygpIHtcbiAgICB0aGlzLm9wdGlvbnMkU3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25zJC5zdWJzY3JpYmUob3B0aW9ucyA9PiB7XG4gICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldElubmVyVmFsdWUodjogYW55KSB7XG4gICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICB0aGlzLnNldElucHV0VmFsdWVCYXNlZE9uSW5uZXJWYWx1ZSh2KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5wdXRWYWx1ZUJhc2VkT25Jbm5lclZhbHVlKHY6IGFueSkge1xuICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuZ2V0T3B0aW9uQmFzZWRPblZhbHVlKHYpO1xuICAgIGNvbnN0IGxhYmVsID0gdGhpcy5leHRyYWN0TGFiZWwob3B0aW9uKTtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnNldFZhbHVlKG9wdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGdldE9wdGlvbkJhc2VkT25WYWx1ZSh2OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck9wdGlvbnMuZmluZChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1WYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKGl0ZW0pO1xuICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZUFzU3RyaW5nKGl0ZW1WYWx1ZSwgdik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUlucHV0KCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQgPSB0aGlzLmZvcm1CdWlsZGVyLmNvbnRyb2woe3ZhbHVlOiB1bmRlZmluZWQsIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkLCByZXF1aXJlZDogdGhpcy5yZXF1aXJlZH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1NlYXJjaEFuZFNldE9wdGlvbnNPYnNlcnZhYmxlKCkge1xuICAgIHRoaXMub3B0aW9ucyQgPSB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnZhbHVlQ2hhbmdlc1xuICAgIC5waXBlKFxuICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHN3aXRjaE1hcCgodGV4dFNlYXJjaDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzU3RyaW5nVGVybSA9IHR5cGVvZiB0ZXh0U2VhcmNoID09PSAnc3RyaW5nJztcbiAgICAgICAgaWYgKGlzU3RyaW5nVGVybSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHRleHRTZWFyY2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvZih0aGlzLmlubmVyT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUodGV4dFNlYXJjaCk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWFyY2hJbkxvY2FsT3B0aW9ucyh0ZXh0U2VhcmNoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbih0ZXh0U2VhcmNoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAob3B0aW9ucyA9PiB7XG4gICAgICAgICAgICB0aGlzLmlubmVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYm9keSA9IHRleHRTZWFyY2ggPyB7IHRleHRTZWFyY2ggfSA6IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0PGFueVtdPih0aGlzLmVuZHBvaW50LCBib2R5KVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoKG9wdGlvbnM6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlubmVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9PcHRpb25zKCkge1xuICAgIHRoaXMub3B0aW9ucyRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VhcmNoSW5Mb2NhbE9wdGlvbnModGVybTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGVybVN0cmluZyA9IGAke3Rlcm19YDtcblxuICAgIGxldCBmaWx0ZXJlZERhdGEgPSB0aGlzLmlubmVyT3B0aW9ucztcblxuICAgIGlmICh0ZXJtU3RyaW5nKSB7XG4gICAgICBmaWx0ZXJlZERhdGEgPSB0aGlzLmlubmVyT3B0aW9uc1xuICAgICAgLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgY29uc3QgbGFiZWw6IHN0cmluZyA9IHRoaXMuZXh0cmFjdExhYmVsKGl0ZW0pO1xuICAgICAgICBjb25zdCBsb3dlckNhc2VMYWJlbCA9IGxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZVRlcm0gPSB0ZXJtU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBsb3dlckNhc2VMYWJlbC5zZWFyY2gobG93ZXJDYXNlVGVybSkgPj0gMDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBvZihmaWx0ZXJlZERhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSByYWlzZUVycm9yKGVycm9yOiBzdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCBFcnJvcjo6IFRoZSBhdXRvY29tcGxldGUgd2l0aCBuYW1lIFwiJHt0aGlzLm5hbWV9XCIgaGFkIHRoZSBmb2xsb3cgcHJvYmxlbTogJHtlcnJvcn1gKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUuY29tcG9uZW50JztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuY29uc3QgQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUFjY291bnRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1hY2NvdW50JyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWF1dG9jb21wbGV0ZVxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bbmFtZV09XCJuYW1lXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbltjdXN0b21GZXRjaEZ1bmN0aW9uXT1cImN1c3RvbUZldGNoRnVuY3Rpb25cIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG5bdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50ID0gJ2FjY291bnRzL29wdGlvbnMnO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KCkgdHlwZXM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnQWNjb3VudCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0FjY291bnQgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBjdXN0b21GZXRjaEZ1bmN0aW9uID0gKHRleHRTZWFyY2gpOiBPYnNlcnZhYmxlPGFueT4gPT4ge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBzID0gW1xuICAgICAge1xuICAgICAgICBmaWx0ZXJzOiBbXG4gICAgICAgICAgeyBwcm9wZXJ0eTogJ25hbWUnLCB2YWx1ZTogdGV4dFNlYXJjaCB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdO1xuXG4gICAgaWYgKHRoaXMudHlwZXMpIHtcblxuICAgICAgZmlsdGVyR3JvdXBzWzBdLmZpbHRlcnMucHVzaCh7IHByb3BlcnR5OiAncm9sZS4kaWQnLCB2YWx1ZTogdGhpcy50eXBlcyB9KTtcblxuICAgIH1cblxuXG4gICAgcmV0dXJuIHRoaXMuZGVjb3JhQXBpLmdldCh0aGlzLmVuZHBvaW50LCB7IGZpbHRlckdyb3VwcyB9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtYWNjb3VudC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVBY2NvdW50TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfQ09NUEFOWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtY29tcGFueScsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bbGFiZWxGbl09XCJsYWJlbEZuXCJcblt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbihibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX0NPTVBBTllfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ29tcGFueUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludCA9ICdjb21wYW5pZXMvb3B0aW9ucyc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdDb21wYW55IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnQ29tcGFueSBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1jb21wYW55LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvbXBhbnlNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfQ09VTlRSWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtY291bnRyeScsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bb3B0aW9uc109XCIoY291bnRyaWVzJCB8IGFzeW5jKVwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcbltsYWJlbEZuXT1cImxhYmVsRm5cIlxuW3ZhbHVlRm5dPVwidmFsdWVGblwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9DT1VOVFJZX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgY291bnRyaWVzJDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIEBJbnB1dCgpIGxhbmc6ICdlbicgfCAncHQtYnInID0gJ2VuJztcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0NvdW50cnkgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdDb3VudHJ5IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY291bnRyaWVzJCA9IG9mKEZBS0VfREFUQSk7XG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgbGFiZWxGbiA9IChpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLm5hbWUgOiBpdGVtO1xuICB9XG5cbiAgdmFsdWVGbiA9IChpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmNvZGUgOiBpdGVtO1xuICB9XG5cbn1cblxuY29uc3QgRkFLRV9EQVRBID0gW3sgJ2NvZGUnOiAnQUQnLCAnbmFtZSc6ICdBbmRvcnJhJyB9LCB7ICdjb2RlJzogJ0FFJywgJ25hbWUnOiAnVW5pdGVkIEFyYWIgRW1pcmF0ZXMnIH0sIHsgJ2NvZGUnOiAnQUYnLCAnbmFtZSc6ICdBZmdoYW5pc3RhbicgfSwgeyAnY29kZSc6ICdBRycsICduYW1lJzogJ0FudGlndWEgYW5kIEJhcmJ1ZGEnIH0sIHsgJ2NvZGUnOiAnQUknLCAnbmFtZSc6ICdBbmd1aWxsYScgfSwgeyAnY29kZSc6ICdBTCcsICduYW1lJzogJ0FsYmFuaWEnIH0sIHsgJ2NvZGUnOiAnQU0nLCAnbmFtZSc6ICdBcm1lbmlhJyB9LCB7ICdjb2RlJzogJ0FOJywgJ25hbWUnOiAnTmV0aGVybGFuZHMgQW50aWxsZXMnIH0sIHsgJ2NvZGUnOiAnQU8nLCAnbmFtZSc6ICdBbmdvbGEnIH0sIHsgJ2NvZGUnOiAnQVEnLCAnbmFtZSc6ICdBbnRhcmN0aWNhJyB9LCB7ICdjb2RlJzogJ0FSJywgJ25hbWUnOiAnQXJnZW50aW5hJyB9LCB7ICdjb2RlJzogJ0FTJywgJ25hbWUnOiAnQW1lcmljYW4gU2Ftb2EnIH0sIHsgJ2NvZGUnOiAnQVQnLCAnbmFtZSc6ICdBdXN0cmlhJyB9LCB7ICdjb2RlJzogJ0FVJywgJ25hbWUnOiAnQXVzdHJhbGlhJyB9LCB7ICdjb2RlJzogJ0FXJywgJ25hbWUnOiAnQXJ1YmEnIH0sIHsgJ2NvZGUnOiAnQVgnLCAnbmFtZSc6ICfDg8KFbGFuZCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0FaJywgJ25hbWUnOiAnQXplcmJhaWphbicgfSwgeyAnY29kZSc6ICdCQScsICduYW1lJzogJ0Jvc25pYSBhbmQgSGVyemVnb3ZpbmEnIH0sIHsgJ2NvZGUnOiAnQkInLCAnbmFtZSc6ICdCYXJiYWRvcycgfSwgeyAnY29kZSc6ICdCRCcsICduYW1lJzogJ0JhbmdsYWRlc2gnIH0sIHsgJ2NvZGUnOiAnQkUnLCAnbmFtZSc6ICdCZWxnaXVtJyB9LCB7ICdjb2RlJzogJ0JGJywgJ25hbWUnOiAnQnVya2luYSBGYXNvJyB9LCB7ICdjb2RlJzogJ0JHJywgJ25hbWUnOiAnQnVsZ2FyaWEnIH0sIHsgJ2NvZGUnOiAnQkgnLCAnbmFtZSc6ICdCYWhyYWluJyB9LCB7ICdjb2RlJzogJ0JJJywgJ25hbWUnOiAnQnVydW5kaScgfSwgeyAnY29kZSc6ICdCSicsICduYW1lJzogJ0JlbmluJyB9LCB7ICdjb2RlJzogJ0JMJywgJ25hbWUnOiAnU2FpbnQgQmFydGjDg8KpbGVteScgfSwgeyAnY29kZSc6ICdCTScsICduYW1lJzogJ0Jlcm11ZGEnIH0sIHsgJ2NvZGUnOiAnQk4nLCAnbmFtZSc6ICdCcnVuZWknIH0sIHsgJ2NvZGUnOiAnQk8nLCAnbmFtZSc6ICdCb2xpdmlhJyB9LCB7ICdjb2RlJzogJ0JRJywgJ25hbWUnOiAnQm9uYWlyZSwgU2ludCBFdXN0YXRpdXMgYW5kIFNhYmEnIH0sIHsgJ2NvZGUnOiAnQlInLCAnbmFtZSc6ICdCcmF6aWwnIH0sIHsgJ2NvZGUnOiAnQlMnLCAnbmFtZSc6ICdCYWhhbWFzJyB9LCB7ICdjb2RlJzogJ0JUJywgJ25hbWUnOiAnQmh1dGFuJyB9LCB7ICdjb2RlJzogJ0JWJywgJ25hbWUnOiAnQm91dmV0IElzbGFuZCcgfSwgeyAnY29kZSc6ICdCVycsICduYW1lJzogJ0JvdHN3YW5hJyB9LCB7ICdjb2RlJzogJ0JZJywgJ25hbWUnOiAnQmVsYXJ1cycgfSwgeyAnY29kZSc6ICdCWicsICduYW1lJzogJ0JlbGl6ZScgfSwgeyAnY29kZSc6ICdDQScsICduYW1lJzogJ0NhbmFkYScgfSwgeyAnY29kZSc6ICdDQycsICduYW1lJzogJ0NvY29zIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnQ0QnLCAnbmFtZSc6ICdUaGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBPZiBDb25nbycgfSwgeyAnY29kZSc6ICdDRicsICduYW1lJzogJ0NlbnRyYWwgQWZyaWNhbiBSZXB1YmxpYycgfSwgeyAnY29kZSc6ICdDRycsICduYW1lJzogJ0NvbmdvJyB9LCB7ICdjb2RlJzogJ0NIJywgJ25hbWUnOiAnU3dpdHplcmxhbmQnIH0sIHsgJ2NvZGUnOiAnQ0knLCAnbmFtZSc6ICdDw4PCtHRlIGRcXCdJdm9pcmUnIH0sIHsgJ2NvZGUnOiAnQ0snLCAnbmFtZSc6ICdDb29rIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnQ0wnLCAnbmFtZSc6ICdDaGlsZScgfSwgeyAnY29kZSc6ICdDTScsICduYW1lJzogJ0NhbWVyb29uJyB9LCB7ICdjb2RlJzogJ0NOJywgJ25hbWUnOiAnQ2hpbmEnIH0sIHsgJ2NvZGUnOiAnQ08nLCAnbmFtZSc6ICdDb2xvbWJpYScgfSwgeyAnY29kZSc6ICdDUicsICduYW1lJzogJ0Nvc3RhIFJpY2EnIH0sIHsgJ2NvZGUnOiAnQ1UnLCAnbmFtZSc6ICdDdWJhJyB9LCB7ICdjb2RlJzogJ0NWJywgJ25hbWUnOiAnQ2FwZSBWZXJkZScgfSwgeyAnY29kZSc6ICdDVycsICduYW1lJzogJ0N1cmHDg8KnYW8nIH0sIHsgJ2NvZGUnOiAnQ1gnLCAnbmFtZSc6ICdDaHJpc3RtYXMgSXNsYW5kJyB9LCB7ICdjb2RlJzogJ0NZJywgJ25hbWUnOiAnQ3lwcnVzJyB9LCB7ICdjb2RlJzogJ0NaJywgJ25hbWUnOiAnQ3plY2ggUmVwdWJsaWMnIH0sIHsgJ2NvZGUnOiAnREUnLCAnbmFtZSc6ICdHZXJtYW55JyB9LCB7ICdjb2RlJzogJ0RKJywgJ25hbWUnOiAnRGppYm91dGknIH0sIHsgJ2NvZGUnOiAnREsnLCAnbmFtZSc6ICdEZW5tYXJrJyB9LCB7ICdjb2RlJzogJ0RNJywgJ25hbWUnOiAnRG9taW5pY2EnIH0sIHsgJ2NvZGUnOiAnRE8nLCAnbmFtZSc6ICdEb21pbmljYW4gUmVwdWJsaWMnIH0sIHsgJ2NvZGUnOiAnRFonLCAnbmFtZSc6ICdBbGdlcmlhJyB9LCB7ICdjb2RlJzogJ0VDJywgJ25hbWUnOiAnRWN1YWRvcicgfSwgeyAnY29kZSc6ICdFRScsICduYW1lJzogJ0VzdG9uaWEnIH0sIHsgJ2NvZGUnOiAnRUcnLCAnbmFtZSc6ICdFZ3lwdCcgfSwgeyAnY29kZSc6ICdFSCcsICduYW1lJzogJ1dlc3Rlcm4gU2FoYXJhJyB9LCB7ICdjb2RlJzogJ0VSJywgJ25hbWUnOiAnRXJpdHJlYScgfSwgeyAnY29kZSc6ICdFUycsICduYW1lJzogJ1NwYWluJyB9LCB7ICdjb2RlJzogJ0VUJywgJ25hbWUnOiAnRXRoaW9waWEnIH0sIHsgJ2NvZGUnOiAnRkknLCAnbmFtZSc6ICdGaW5sYW5kJyB9LCB7ICdjb2RlJzogJ0ZKJywgJ25hbWUnOiAnRmlqaScgfSwgeyAnY29kZSc6ICdGSycsICduYW1lJzogJ0ZhbGtsYW5kIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnRk0nLCAnbmFtZSc6ICdNaWNyb25lc2lhJyB9LCB7ICdjb2RlJzogJ0ZPJywgJ25hbWUnOiAnRmFyb2UgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdGUicsICduYW1lJzogJ0ZyYW5jZScgfSwgeyAnY29kZSc6ICdHQScsICduYW1lJzogJ0dhYm9uJyB9LCB7ICdjb2RlJzogJ0dCJywgJ25hbWUnOiAnVW5pdGVkIEtpbmdkb20nIH0sIHsgJ2NvZGUnOiAnR0QnLCAnbmFtZSc6ICdHcmVuYWRhJyB9LCB7ICdjb2RlJzogJ0dFJywgJ25hbWUnOiAnR2VvcmdpYScgfSwgeyAnY29kZSc6ICdHRicsICduYW1lJzogJ0ZyZW5jaCBHdWlhbmEnIH0sIHsgJ2NvZGUnOiAnR0cnLCAnbmFtZSc6ICdHdWVybnNleScgfSwgeyAnY29kZSc6ICdHSCcsICduYW1lJzogJ0doYW5hJyB9LCB7ICdjb2RlJzogJ0dJJywgJ25hbWUnOiAnR2licmFsdGFyJyB9LCB7ICdjb2RlJzogJ0dMJywgJ25hbWUnOiAnR3JlZW5sYW5kJyB9LCB7ICdjb2RlJzogJ0dNJywgJ25hbWUnOiAnR2FtYmlhJyB9LCB7ICdjb2RlJzogJ0dOJywgJ25hbWUnOiAnR3VpbmVhJyB9LCB7ICdjb2RlJzogJ0dQJywgJ25hbWUnOiAnR3VhZGVsb3VwZScgfSwgeyAnY29kZSc6ICdHUScsICduYW1lJzogJ0VxdWF0b3JpYWwgR3VpbmVhJyB9LCB7ICdjb2RlJzogJ0dSJywgJ25hbWUnOiAnR3JlZWNlJyB9LCB7ICdjb2RlJzogJ0dTJywgJ25hbWUnOiAnU291dGggR2VvcmdpYSBBbmQgVGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnR1QnLCAnbmFtZSc6ICdHdWF0ZW1hbGEnIH0sIHsgJ2NvZGUnOiAnR1UnLCAnbmFtZSc6ICdHdWFtJyB9LCB7ICdjb2RlJzogJ0dXJywgJ25hbWUnOiAnR3VpbmVhLUJpc3NhdScgfSwgeyAnY29kZSc6ICdHWScsICduYW1lJzogJ0d1eWFuYScgfSwgeyAnY29kZSc6ICdISycsICduYW1lJzogJ0hvbmcgS29uZycgfSwgeyAnY29kZSc6ICdITScsICduYW1lJzogJ0hlYXJkIElzbGFuZCBBbmQgTWNEb25hbGQgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdITicsICduYW1lJzogJ0hvbmR1cmFzJyB9LCB7ICdjb2RlJzogJ0hSJywgJ25hbWUnOiAnQ3JvYXRpYScgfSwgeyAnY29kZSc6ICdIVCcsICduYW1lJzogJ0hhaXRpJyB9LCB7ICdjb2RlJzogJ0hVJywgJ25hbWUnOiAnSHVuZ2FyeScgfSwgeyAnY29kZSc6ICdJRCcsICduYW1lJzogJ0luZG9uZXNpYScgfSwgeyAnY29kZSc6ICdJRScsICduYW1lJzogJ0lyZWxhbmQnIH0sIHsgJ2NvZGUnOiAnSUwnLCAnbmFtZSc6ICdJc3JhZWwnIH0sIHsgJ2NvZGUnOiAnSU0nLCAnbmFtZSc6ICdJc2xlIE9mIE1hbicgfSwgeyAnY29kZSc6ICdJTicsICduYW1lJzogJ0luZGlhJyB9LCB7ICdjb2RlJzogJ0lPJywgJ25hbWUnOiAnQnJpdGlzaCBJbmRpYW4gT2NlYW4gVGVycml0b3J5JyB9LCB7ICdjb2RlJzogJ0lRJywgJ25hbWUnOiAnSXJhcScgfSwgeyAnY29kZSc6ICdJUicsICduYW1lJzogJ0lyYW4nIH0sIHsgJ2NvZGUnOiAnSVMnLCAnbmFtZSc6ICdJY2VsYW5kJyB9LCB7ICdjb2RlJzogJ0lUJywgJ25hbWUnOiAnSXRhbHknIH0sIHsgJ2NvZGUnOiAnSkUnLCAnbmFtZSc6ICdKZXJzZXknIH0sIHsgJ2NvZGUnOiAnSk0nLCAnbmFtZSc6ICdKYW1haWNhJyB9LCB7ICdjb2RlJzogJ0pPJywgJ25hbWUnOiAnSm9yZGFuJyB9LCB7ICdjb2RlJzogJ0pQJywgJ25hbWUnOiAnSmFwYW4nIH0sIHsgJ2NvZGUnOiAnS0UnLCAnbmFtZSc6ICdLZW55YScgfSwgeyAnY29kZSc6ICdLRycsICduYW1lJzogJ0t5cmd5enN0YW4nIH0sIHsgJ2NvZGUnOiAnS0gnLCAnbmFtZSc6ICdDYW1ib2RpYScgfSwgeyAnY29kZSc6ICdLSScsICduYW1lJzogJ0tpcmliYXRpJyB9LCB7ICdjb2RlJzogJ0tNJywgJ25hbWUnOiAnQ29tb3JvcycgfSwgeyAnY29kZSc6ICdLTicsICduYW1lJzogJ1NhaW50IEtpdHRzIEFuZCBOZXZpcycgfSwgeyAnY29kZSc6ICdLUCcsICduYW1lJzogJ05vcnRoIEtvcmVhJyB9LCB7ICdjb2RlJzogJ0tSJywgJ25hbWUnOiAnU291dGggS29yZWEnIH0sIHsgJ2NvZGUnOiAnS1cnLCAnbmFtZSc6ICdLdXdhaXQnIH0sIHsgJ2NvZGUnOiAnS1knLCAnbmFtZSc6ICdDYXltYW4gSXNsYW5kcycgfSwgeyAnY29kZSc6ICdLWicsICduYW1lJzogJ0themFraHN0YW4nIH0sIHsgJ2NvZGUnOiAnTEEnLCAnbmFtZSc6ICdMYW9zJyB9LCB7ICdjb2RlJzogJ0xCJywgJ25hbWUnOiAnTGViYW5vbicgfSwgeyAnY29kZSc6ICdMQycsICduYW1lJzogJ1NhaW50IEx1Y2lhJyB9LCB7ICdjb2RlJzogJ0xJJywgJ25hbWUnOiAnTGllY2h0ZW5zdGVpbicgfSwgeyAnY29kZSc6ICdMSycsICduYW1lJzogJ1NyaSBMYW5rYScgfSwgeyAnY29kZSc6ICdMUicsICduYW1lJzogJ0xpYmVyaWEnIH0sIHsgJ2NvZGUnOiAnTFMnLCAnbmFtZSc6ICdMZXNvdGhvJyB9LCB7ICdjb2RlJzogJ0xUJywgJ25hbWUnOiAnTGl0aHVhbmlhJyB9LCB7ICdjb2RlJzogJ0xVJywgJ25hbWUnOiAnTHV4ZW1ib3VyZycgfSwgeyAnY29kZSc6ICdMVicsICduYW1lJzogJ0xhdHZpYScgfSwgeyAnY29kZSc6ICdMWScsICduYW1lJzogJ0xpYnlhJyB9LCB7ICdjb2RlJzogJ01BJywgJ25hbWUnOiAnTW9yb2NjbycgfSwgeyAnY29kZSc6ICdNQycsICduYW1lJzogJ01vbmFjbycgfSwgeyAnY29kZSc6ICdNRCcsICduYW1lJzogJ01vbGRvdmEnIH0sIHsgJ2NvZGUnOiAnTUUnLCAnbmFtZSc6ICdNb250ZW5lZ3JvJyB9LCB7ICdjb2RlJzogJ01GJywgJ25hbWUnOiAnU2FpbnQgTWFydGluJyB9LCB7ICdjb2RlJzogJ01HJywgJ25hbWUnOiAnTWFkYWdhc2NhcicgfSwgeyAnY29kZSc6ICdNSCcsICduYW1lJzogJ01hcnNoYWxsIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnTUsnLCAnbmFtZSc6ICdNYWNlZG9uaWEnIH0sIHsgJ2NvZGUnOiAnTUwnLCAnbmFtZSc6ICdNYWxpJyB9LCB7ICdjb2RlJzogJ01NJywgJ25hbWUnOiAnTXlhbm1hcicgfSwgeyAnY29kZSc6ICdNTicsICduYW1lJzogJ01vbmdvbGlhJyB9LCB7ICdjb2RlJzogJ01PJywgJ25hbWUnOiAnTWFjYW8nIH0sIHsgJ2NvZGUnOiAnTVAnLCAnbmFtZSc6ICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnTVEnLCAnbmFtZSc6ICdNYXJ0aW5pcXVlJyB9LCB7ICdjb2RlJzogJ01SJywgJ25hbWUnOiAnTWF1cml0YW5pYScgfSwgeyAnY29kZSc6ICdNUycsICduYW1lJzogJ01vbnRzZXJyYXQnIH0sIHsgJ2NvZGUnOiAnTVQnLCAnbmFtZSc6ICdNYWx0YScgfSwgeyAnY29kZSc6ICdNVScsICduYW1lJzogJ01hdXJpdGl1cycgfSwgeyAnY29kZSc6ICdNVicsICduYW1lJzogJ01hbGRpdmVzJyB9LCB7ICdjb2RlJzogJ01XJywgJ25hbWUnOiAnTWFsYXdpJyB9LCB7ICdjb2RlJzogJ01YJywgJ25hbWUnOiAnTWV4aWNvJyB9LCB7ICdjb2RlJzogJ01ZJywgJ25hbWUnOiAnTWFsYXlzaWEnIH0sIHsgJ2NvZGUnOiAnTVonLCAnbmFtZSc6ICdNb3phbWJpcXVlJyB9LCB7ICdjb2RlJzogJ05BJywgJ25hbWUnOiAnTmFtaWJpYScgfSwgeyAnY29kZSc6ICdOQycsICduYW1lJzogJ05ldyBDYWxlZG9uaWEnIH0sIHsgJ2NvZGUnOiAnTkUnLCAnbmFtZSc6ICdOaWdlcicgfSwgeyAnY29kZSc6ICdORicsICduYW1lJzogJ05vcmZvbGsgSXNsYW5kJyB9LCB7ICdjb2RlJzogJ05HJywgJ25hbWUnOiAnTmlnZXJpYScgfSwgeyAnY29kZSc6ICdOSScsICduYW1lJzogJ05pY2FyYWd1YScgfSwgeyAnY29kZSc6ICdOTCcsICduYW1lJzogJ05ldGhlcmxhbmRzJyB9LCB7ICdjb2RlJzogJ05PJywgJ25hbWUnOiAnTm9yd2F5JyB9LCB7ICdjb2RlJzogJ05QJywgJ25hbWUnOiAnTmVwYWwnIH0sIHsgJ2NvZGUnOiAnTlInLCAnbmFtZSc6ICdOYXVydScgfSwgeyAnY29kZSc6ICdOVScsICduYW1lJzogJ05pdWUnIH0sIHsgJ2NvZGUnOiAnTlonLCAnbmFtZSc6ICdOZXcgWmVhbGFuZCcgfSwgeyAnY29kZSc6ICdPTScsICduYW1lJzogJ09tYW4nIH0sIHsgJ2NvZGUnOiAnUEEnLCAnbmFtZSc6ICdQYW5hbWEnIH0sIHsgJ2NvZGUnOiAnUEUnLCAnbmFtZSc6ICdQZXJ1JyB9LCB7ICdjb2RlJzogJ1BGJywgJ25hbWUnOiAnRnJlbmNoIFBvbHluZXNpYScgfSwgeyAnY29kZSc6ICdQRycsICduYW1lJzogJ1BhcHVhIE5ldyBHdWluZWEnIH0sIHsgJ2NvZGUnOiAnUEgnLCAnbmFtZSc6ICdQaGlsaXBwaW5lcycgfSwgeyAnY29kZSc6ICdQSycsICduYW1lJzogJ1Bha2lzdGFuJyB9LCB7ICdjb2RlJzogJ1BMJywgJ25hbWUnOiAnUG9sYW5kJyB9LCB7ICdjb2RlJzogJ1BNJywgJ25hbWUnOiAnU2FpbnQgUGllcnJlIEFuZCBNaXF1ZWxvbicgfSwgeyAnY29kZSc6ICdQTicsICduYW1lJzogJ1BpdGNhaXJuJyB9LCB7ICdjb2RlJzogJ1BSJywgJ25hbWUnOiAnUHVlcnRvIFJpY28nIH0sIHsgJ2NvZGUnOiAnUFMnLCAnbmFtZSc6ICdQYWxlc3RpbmUnIH0sIHsgJ2NvZGUnOiAnUFQnLCAnbmFtZSc6ICdQb3J0dWdhbCcgfSwgeyAnY29kZSc6ICdQVycsICduYW1lJzogJ1BhbGF1JyB9LCB7ICdjb2RlJzogJ1BZJywgJ25hbWUnOiAnUGFyYWd1YXknIH0sIHsgJ2NvZGUnOiAnUUEnLCAnbmFtZSc6ICdRYXRhcicgfSwgeyAnY29kZSc6ICdSRScsICduYW1lJzogJ1JldW5pb24nIH0sIHsgJ2NvZGUnOiAnUk8nLCAnbmFtZSc6ICdSb21hbmlhJyB9LCB7ICdjb2RlJzogJ1JTJywgJ25hbWUnOiAnU2VyYmlhJyB9LCB7ICdjb2RlJzogJ1JVJywgJ25hbWUnOiAnUnVzc2lhJyB9LCB7ICdjb2RlJzogJ1JXJywgJ25hbWUnOiAnUndhbmRhJyB9LCB7ICdjb2RlJzogJ1NBJywgJ25hbWUnOiAnU2F1ZGkgQXJhYmlhJyB9LCB7ICdjb2RlJzogJ1NCJywgJ25hbWUnOiAnU29sb21vbiBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1NDJywgJ25hbWUnOiAnU2V5Y2hlbGxlcycgfSwgeyAnY29kZSc6ICdTRCcsICduYW1lJzogJ1N1ZGFuJyB9LCB7ICdjb2RlJzogJ1NFJywgJ25hbWUnOiAnU3dlZGVuJyB9LCB7ICdjb2RlJzogJ1NHJywgJ25hbWUnOiAnU2luZ2Fwb3JlJyB9LCB7ICdjb2RlJzogJ1NIJywgJ25hbWUnOiAnU2FpbnQgSGVsZW5hJyB9LCB7ICdjb2RlJzogJ1NJJywgJ25hbWUnOiAnU2xvdmVuaWEnIH0sIHsgJ2NvZGUnOiAnU0onLCAnbmFtZSc6ICdTdmFsYmFyZCBBbmQgSmFuIE1heWVuJyB9LCB7ICdjb2RlJzogJ1NLJywgJ25hbWUnOiAnU2xvdmFraWEnIH0sIHsgJ2NvZGUnOiAnU0wnLCAnbmFtZSc6ICdTaWVycmEgTGVvbmUnIH0sIHsgJ2NvZGUnOiAnU00nLCAnbmFtZSc6ICdTYW4gTWFyaW5vJyB9LCB7ICdjb2RlJzogJ1NOJywgJ25hbWUnOiAnU2VuZWdhbCcgfSwgeyAnY29kZSc6ICdTTycsICduYW1lJzogJ1NvbWFsaWEnIH0sIHsgJ2NvZGUnOiAnU1InLCAnbmFtZSc6ICdTdXJpbmFtZScgfSwgeyAnY29kZSc6ICdTUycsICduYW1lJzogJ1NvdXRoIFN1ZGFuJyB9LCB7ICdjb2RlJzogJ1NUJywgJ25hbWUnOiAnU2FvIFRvbWUgQW5kIFByaW5jaXBlJyB9LCB7ICdjb2RlJzogJ1NWJywgJ25hbWUnOiAnRWwgU2FsdmFkb3InIH0sIHsgJ2NvZGUnOiAnU1gnLCAnbmFtZSc6ICdTaW50IE1hYXJ0ZW4gKER1dGNoIHBhcnQpJyB9LCB7ICdjb2RlJzogJ1NZJywgJ25hbWUnOiAnU3lyaWEnIH0sIHsgJ2NvZGUnOiAnU1onLCAnbmFtZSc6ICdTd2F6aWxhbmQnIH0sIHsgJ2NvZGUnOiAnVEMnLCAnbmFtZSc6ICdUdXJrcyBBbmQgQ2FpY29zIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnVEQnLCAnbmFtZSc6ICdDaGFkJyB9LCB7ICdjb2RlJzogJ1RGJywgJ25hbWUnOiAnRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzJyB9LCB7ICdjb2RlJzogJ1RHJywgJ25hbWUnOiAnVG9nbycgfSwgeyAnY29kZSc6ICdUSCcsICduYW1lJzogJ1RoYWlsYW5kJyB9LCB7ICdjb2RlJzogJ1RKJywgJ25hbWUnOiAnVGFqaWtpc3RhbicgfSwgeyAnY29kZSc6ICdUSycsICduYW1lJzogJ1Rva2VsYXUnIH0sIHsgJ2NvZGUnOiAnVEwnLCAnbmFtZSc6ICdUaW1vci1MZXN0ZScgfSwgeyAnY29kZSc6ICdUTScsICduYW1lJzogJ1R1cmttZW5pc3RhbicgfSwgeyAnY29kZSc6ICdUTicsICduYW1lJzogJ1R1bmlzaWEnIH0sIHsgJ2NvZGUnOiAnVE8nLCAnbmFtZSc6ICdUb25nYScgfSwgeyAnY29kZSc6ICdUUicsICduYW1lJzogJ1R1cmtleScgfSwgeyAnY29kZSc6ICdUVCcsICduYW1lJzogJ1RyaW5pZGFkIGFuZCBUb2JhZ28nIH0sIHsgJ2NvZGUnOiAnVFYnLCAnbmFtZSc6ICdUdXZhbHUnIH0sIHsgJ2NvZGUnOiAnVFcnLCAnbmFtZSc6ICdUYWl3YW4nIH0sIHsgJ2NvZGUnOiAnVFonLCAnbmFtZSc6ICdUYW56YW5pYScgfSwgeyAnY29kZSc6ICdVQScsICduYW1lJzogJ1VrcmFpbmUnIH0sIHsgJ2NvZGUnOiAnVUcnLCAnbmFtZSc6ICdVZ2FuZGEnIH0sIHsgJ2NvZGUnOiAnVU0nLCAnbmFtZSc6ICdVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnVVknLCAnbmFtZSc6ICdVcnVndWF5JyB9LCB7ICdjb2RlJzogJ1VaJywgJ25hbWUnOiAnVXpiZWtpc3RhbicgfSwgeyAnY29kZSc6ICdWQScsICduYW1lJzogJ1ZhdGljYW4nIH0sIHsgJ2NvZGUnOiAnVkMnLCAnbmFtZSc6ICdTYWludCBWaW5jZW50IEFuZCBUaGUgR3JlbmFkaW5lcycgfSwgeyAnY29kZSc6ICdWRScsICduYW1lJzogJ1ZlbmV6dWVsYScgfSwgeyAnY29kZSc6ICdWRycsICduYW1lJzogJ0JyaXRpc2ggVmlyZ2luIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnVkknLCAnbmFtZSc6ICdVLlMuIFZpcmdpbiBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1ZOJywgJ25hbWUnOiAnVmlldG5hbScgfSwgeyAnY29kZSc6ICdWVScsICduYW1lJzogJ1ZhbnVhdHUnIH0sIHsgJ2NvZGUnOiAnV0YnLCAnbmFtZSc6ICdXYWxsaXMgQW5kIEZ1dHVuYScgfSwgeyAnY29kZSc6ICdXUycsICduYW1lJzogJ1NhbW9hJyB9LCB7ICdjb2RlJzogJ1lFJywgJ25hbWUnOiAnWWVtZW4nIH0sIHsgJ2NvZGUnOiAnWVQnLCAnbmFtZSc6ICdNYXlvdHRlJyB9LCB7ICdjb2RlJzogJ1pBJywgJ25hbWUnOiAnU291dGggQWZyaWNhJyB9LCB7ICdjb2RlJzogJ1pNJywgJ25hbWUnOiAnWmFtYmlhJyB9LCB7ICdjb2RlJzogJ1pXJywgJ25hbWUnOiAnWmltYmFid2UnIH1dO1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlQ291bnRyeUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLWNvdW50cnkuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlQ291bnRyeUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQ291bnRyeU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBCQVNFX0VORFBPSU5UID0gJ2NvbXBhbmllcy8ke2NvbXBhbnlJZH0vZGVwYXJ0bWVudHMvb3B0aW9ucyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0RFUEFSVE1FTlRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJlbmRwb2ludCBlbHNlIGZha2VEaXNhYmxlZFwiPlxuICA8ZGVjLWF1dG9jb21wbGV0ZVxuICBbZGlzYWJsZWRdPVwiIWNvbXBhbnlJZCB8fCBkaXNhYmxlZFwiXG4gIFtlbmRwb2ludF09XCJlbmRwb2ludFwiXG4gIFtsYWJlbEF0dHJdPVwibGFiZWxBdHRyXCJcbiAgW25hbWVdPVwibmFtZVwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIChvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuICAoYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2Zha2VEaXNhYmxlZD5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbZGlzYWJsZWRdPVwidHJ1ZVwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCI+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfREVQQVJUTUVOVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgbGFiZWxBdHRyID0gJ3ZhbHVlJztcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgY29tcGFueUlkKHY6IHN0cmluZykge1xuICAgIHRoaXMuX2NvbXBhbnlJZCA9IHY7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbmNvbXBhbnlJZCgpO1xuICB9XG5cbiAgZ2V0IGNvbXBhbnlJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGFueUlkO1xuICB9XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdEZXBhcnRtZW50IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnRGVwYXJ0bWVudCBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF9jb21wYW55SWQ6IHN0cmluZztcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXRFbmRwb2ludEJhc2VkT25jb21wYW55SWQoKSB7XG4gICAgdGhpcy5lbmRwb2ludCA9ICF0aGlzLmNvbXBhbnlJZCA/IHVuZGVmaW5lZCA6IEJBU0VfRU5EUE9JTlQucmVwbGFjZSgnJHtjb21wYW55SWR9JywgdGhpcy5jb21wYW55SWQpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1kZXBhcnRtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuY29uc3QgQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZVJvbGVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1yb2xlJyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWF1dG9jb21wbGV0ZVxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bbmFtZV09XCJuYW1lXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbltjdXN0b21GZXRjaEZ1bmN0aW9uXT1cImN1c3RvbUZldGNoRnVuY3Rpb25cIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG5bdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50ID0gJ3JvbGVzL29wdGlvbnMnO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KCkgdHlwZXM6IHN0cmluZ1tdO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUm9sZSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1JvbGUgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBjdXN0b21GZXRjaEZ1bmN0aW9uID0gKHRleHRTZWFyY2gpOiBPYnNlcnZhYmxlPGFueT4gPT4ge1xuICAgIGNvbnN0IHNlYXJjaCA9IHRleHRTZWFyY2ggPyB7IHRleHRTZWFyY2ggfSA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkuZ2V0KHRoaXMuZW5kcG9pbnQsIHNlYXJjaClcbiAgICAucGlwZShcbiAgICAgIG1hcChyb2xlcyA9PiB7XG4gICAgICAgIHJldHVybiByb2xlcy5maWx0ZXIocm9sZSA9PiB7XG4gICAgICAgICAgY29uc3Qgcm9sZVR5cGUgPSAocm9sZSAmJiByb2xlLmtleSkgPyByb2xlLmtleS5zcGxpdCgnLicpWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICAgIHJldHVybiAhdGhpcy50eXBlcyA/IHRydWUgOiB0aGlzLnR5cGVzLmluZGV4T2Yocm9sZVR5cGUpID49IDA7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZVJvbGVDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1yb2xlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZVJvbGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUm9sZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNvbnN0IEJBU0VfQVVUT0NPTVBMRVRFX1BST0pFQ1RfRU5EUE9JTlQgPSAnL2xlZ2FjeS9wcm9qZWN0L3NlYXJjaC9rZXlWYWx1ZSc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX1BST0pFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXByb2plY3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCIoZW5kcG9pbnQgJiYgY29tcGFueUlkKSBlbHNlIGZha2VEaXNhYmxlZFwiPlxuICA8ZGVjLWF1dG9jb21wbGV0ZVxuICAjYXV0b2NvbXBsZXRlXG4gIFtlbmRwb2ludF09XCJlbmRwb2ludFwiXG4gIFtsYWJlbEZuXT1cImxhYmVsRm5cIlxuICBbbmFtZV09XCJuYW1lXCJcbiAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuICBbKG5nTW9kZWwpXT1cInZhbHVlXCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgW2N1c3RvbUZldGNoRnVuY3Rpb25dPVwiY3VzdG9tRmV0Y2hGdW5jdGlvblwiXG4gIChvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuICAoYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2Zha2VEaXNhYmxlZD5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbZGlzYWJsZWRdPVwidHJ1ZVwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCI+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUFJPSkVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50O1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjb21wYW55SWQodjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2NvbXBhbnlJZCAhPT0gdikge1xuICAgICAgdGhpcy5fY29tcGFueUlkID0gdjtcbiAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmVuZHBvaW50ID0gdW5kZWZpbmVkO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGVuc3VyZXMgYSBkaWdlc3QgY2ljbGUgYmVmb3JlIHJlc2V0aW5nIHRoZSBlbmRwb2ludFxuICAgICAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbkNvbXBhbnlJZCgpO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNvbXBhbnlJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGFueUlkO1xuICB9XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdQcm9qZWN0IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnUHJvamVjdCBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF9jb21wYW55SWQ6IHN0cmluZztcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSkgeyB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKSB7XG4gICAgaWYgKHRoaXMuY29tcGFueUlkKSB7XG4gICAgICB0aGlzLmVuZHBvaW50ID0gQkFTRV9BVVRPQ09NUExFVEVfUFJPSkVDVF9FTkRQT0lOVCArICc/Y29tcGFueUlkPScgKyB0aGlzLmNvbXBhbnlJZDtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY3VzdG9tRmV0Y2hGdW5jdGlvbiA9ICh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIHBhcmFtcy50ZXh0U2VhcmNoID0gdGV4dFNlYXJjaDtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbkNvbXBhbnlJZCgpO1xuICAgIHJldHVybiB0aGlzLmRlY29yYUFwaS5nZXQodGhpcy5lbmRwb2ludCwgcGFyYW1zKVxuICAgIC5waXBlKFxuICAgICAgbWFwKHByb2plY3RzID0+IHtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1wcm9qZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVByb2plY3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX1FVT1RFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZVF1b3RlQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtcXVvdGUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJlbmRwb2ludCBlbHNlIGZha2VEaXNhYmxlZFwiPlxuICA8ZGVjLWF1dG9jb21wbGV0ZVxuICBbZGlzYWJsZWRdPVwiIXByb2plY3RJZCB8fCBkaXNhYmxlZFwiXG4gIFtlbmRwb2ludF09XCJlbmRwb2ludFwiXG4gIFtsYWJlbEF0dHJdPVwibGFiZWxBdHRyXCJcbiAgW25hbWVdPVwibmFtZVwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIFtjdXN0b21GZXRjaEZ1bmN0aW9uXT1cImN1c3RvbUZldGNoRnVuY3Rpb25cIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1FVT1RFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVF1b3RlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEJBU0VfRU5EUE9JTlQgPSAnL2xlZ2FjeS9wcm9qZWN0LyR7cHJvamVjdElkfS9xdW90ZSc7XG5cbiAgZW5kcG9pbnQ6IHN0cmluZztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBwcm9qZWN0SWQodjogc3RyaW5nKSB7XG4gICAgdGhpcy5fcHJvamVjdElkID0gdjtcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uUHJvamVjdElkKCk7XG4gIH1cblxuICBnZXQgcHJvamVjdElkKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9qZWN0SWQ7XG4gIH1cblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1F1b3RlIGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnUXVvdGUgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfcHJvamVjdElkOiBzdHJpbmc7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2UpIHsgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXRFbmRwb2ludEJhc2VkT25Qcm9qZWN0SWQoKSB7XG4gICAgdGhpcy5lbmRwb2ludCA9ICF0aGlzLnByb2plY3RJZCA/IHVuZGVmaW5lZCA6IHRoaXMuQkFTRV9FTkRQT0lOVC5yZXBsYWNlKCcke3Byb2plY3RJZH0nLCB0aGlzLnByb2plY3RJZCk7XG4gIH1cblxuICBjdXN0b21GZXRjaEZ1bmN0aW9uID0gKHRleHRTZWFyY2gpOiBPYnNlcnZhYmxlPGFueT4gPT4ge1xuICAgIGNvbnN0IHBhcmFtczogYW55ID0ge307XG4gICAgcGFyYW1zLnRleHRTZWFyY2ggPSB0ZXh0U2VhcmNoO1xuICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uUHJvamVjdElkKCk7XG4gICAgcmV0dXJuIHRoaXMuZGVjb3JhQXBpLmdldCh0aGlzLmVuZHBvaW50LCBwYXJhbXMpXG4gICAgLnBpcGUoXG4gICAgICBtYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlLm1hcChxdW90ZXMgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IHF1b3Rlcy5pZCxcbiAgICAgICAgICAgIHZhbHVlOiBxdW90ZXMucHJvZHVjdFZhcmlhbnRJZFxuICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZVF1b3RlQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtcXVvdGUuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVRdW90ZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWJyZWFkY3J1bWInLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cImRlYy1icmVhZGNydW1iLXdyYXBwZXJcIj5cblxuICA8ZGl2IGZ4RmxleD5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgPGgxPnt7ZmVhdHVyZX19PC9oMT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImJyZWFkY3J1bWJcIj5cbiAgICAgICAge3ticmVhZGNydW1ifX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGZ4RmxleCBmeEZsZXhBbGlnbj1cImNlbnRlclwiIGZ4TGF5b3V0QWxpZ249XCJlbmRcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCI+XG4gICAgICA8ZGl2IGZ4RmxleD5cbiAgICAgICAgPCEtLSBDT05URU5UICAtLT5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8IS0tIEJBQ0sgQlVUVE9OIC0tPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cImRlZmF1bHRcIiAqbmdJZj1cImJhY2tCdXR0b25QYXRoXCIgKGNsaWNrKT1cImdvQmFjaygpXCI+e3sgYmFja0xhYmVsIH19PC9idXR0b24+XG4gICAgICAgIDwhLS0gRk9SV0FSRCBCVVRUT04gLS0+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwiZGVmYXVsdFwiICpuZ0lmPVwiZm9yd2FyZEJ1dHRvblwiIChjbGljayk9XCJnb0ZvcndhcmQoKVwiPnt7IGZvcndhcmRMYWJlbCB9fTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLWJyZWFkY3J1bWItd3JhcHBlcnttYXJnaW4tYm90dG9tOjMycHh9LmRlYy1icmVhZGNydW1iLXdyYXBwZXIgaDF7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi10b3A6NHB4O21hcmdpbi1ib3R0b206NHB4fS5kZWMtYnJlYWRjcnVtYi13cmFwcGVyIC5icmVhZGNydW1ie2NvbG9yOiNhOGE4YTh9YF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0JyZWFkY3J1bWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGJhY2tCdXR0b25QYXRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJyZWFkY3J1bWI6IHN0cmluZztcbiAgQElucHV0KCkgZmVhdHVyZTogc3RyaW5nO1xuICBASW5wdXQoKSBmb3J3YXJkQnV0dG9uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGkxOG5GZWF0dXJlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGkxOG5CcmVhZGNydW1iOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgYmFja0xhYmVsID0gJ0JhY2snO1xuICBASW5wdXQoKSBmb3J3YXJkTGFiZWwgPSAnRm9yd2FyZCc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSB0cmFuc2xhdG9yOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRyYW5zbGF0ZUZlYXR1cmUoKTtcbiAgICB0aGlzLnRyYW5zbGF0ZVBhdGhzKCk7XG4gICAgdGhpcy5kZXRlY3RBbmRQYXJzZUJ1dHRvbnNDb25maWcoKTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0QW5kUGFyc2VCdXR0b25zQ29uZmlnKCkge1xuICAgIHRoaXMucGFyc2VCYWNrQnV0dG9uKCk7XG4gICAgdGhpcy5wYXJzZUZvcndhcmRCdXR0b24oKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VCYWNrQnV0dG9uKCkge1xuICAgIGlmICh0aGlzLmJhY2tCdXR0b25QYXRoICE9PSB1bmRlZmluZWQgJiYgdGhpcy5iYWNrQnV0dG9uUGF0aCAhPT0gJ2ZhbHNlJykge1xuICAgICAgdGhpcy5iYWNrQnV0dG9uUGF0aCA9IHRoaXMuYmFja0J1dHRvblBhdGggPyB0aGlzLmJhY2tCdXR0b25QYXRoIDogJy8nO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VGb3J3YXJkQnV0dG9uKCkge1xuICAgIGlmICh0aGlzLmZvcndhcmRCdXR0b24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmZvcndhcmRCdXR0b24gIT09ICdmYWxzZScpIHtcbiAgICAgIHRoaXMuZm9yd2FyZEJ1dHRvbiA9IHRoaXMuZm9yd2FyZEJ1dHRvbiA/IHRoaXMuZm9yd2FyZEJ1dHRvbiA6ICcvJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyYW5zbGF0ZUZlYXR1cmUoKSB7XG4gICAgaWYgKHRoaXMuaTE4bkJyZWFkY3J1bWIpIHtcbiAgICAgIHRoaXMuYnJlYWRjcnVtYiA9IHRoaXMuaTE4bkJyZWFkY3J1bWIubWFwKHBhdGggPT4gdGhpcy50cmFuc2xhdG9yLmluc3RhbnQocGF0aCkpLmpvaW4oJyAvICcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNsYXRlUGF0aHMoKSB7XG4gICAgaWYgKHRoaXMuaTE4bkZlYXR1cmUpIHtcbiAgICAgIHRoaXMuZmVhdHVyZSA9IHRoaXMudHJhbnNsYXRvci5pbnN0YW50KHRoaXMuaTE4bkZlYXR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBOYXZpZ2F0aW9uIE1ldGhvZHMgLy9cbiAgLy8gKioqKioqKioqKioqKioqKioqIC8vXG5cbiAgcHVibGljIGdvQmFjaygpIHtcbiAgICBpZiAodGhpcy5iYWNrQnV0dG9uUGF0aCkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuYmFja0J1dHRvblBhdGhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnb0ZvcndhcmQoKSB7XG4gICAgaWYgKHRoaXMuZm9yd2FyZEJ1dHRvbikge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuZm9yd2FyZEJ1dHRvbl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5mb3J3YXJkKCk7XG4gICAgfVxuICB9XG59XG4iLCIvLyBBbmd1bGFyIG1vZHVsZXNcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi9icmVhZGNydW1iLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNCcmVhZGNydW1iQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNCcmVhZGNydW1iQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQnJlYWRjcnVtYk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBPbkluaXQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRGlhbG9nQWN0aW9uIH0gZnJvbSAnLi9kZWMtZGlhbG9nLm1vZGVscyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1kaWFsb2cnLFxuICB0ZW1wbGF0ZTogYDxtYXQtdG9vbGJhciBjb2xvcj1cInByaW1hcnlcIj5cblxuICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhGbGV4RmlsbCBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cInVwcGVyY2FzZVwiIG1hdC1kaWFsb2ctY2xvc2U+XG4gICAgICAgIDxtYXQtaWNvbj5hcnJvd19iYWNrPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8aDE+Jm5ic3A7IHt7IHRpdGxlIH19PC9oMT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGZ4RmxleD5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiYWN0aW9uc1wiPlxuICAgICAgICAgIDxtYXQtbWVudSAjZGVjRGlhbG9nQWN0aW9uc01lbnU9XCJtYXRNZW51XCI+XG4gICAgICAgICAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgYWN0aW9uc1wiIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImFjdGlvbi5jYWxsYmFjayhjb250ZXh0KVwiPlxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjdGlvbi5sYWJlbFwiPnt7IGFjdGlvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaTE4bkxhYmVsXCI+e3sgYWN0aW9uLmkxOG5MYWJlbCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvbWF0LW1lbnU+XG5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwiZGVjRGlhbG9nQWN0aW9uc01lbnVcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5tb3JlX3ZlcnQ8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9tYXQtdG9vbGJhcj5cblxuPGRpdiBjbGFzcz1cImRlYy1kaWFsb2ctY2hpbGQtd3JhcHBlclwiPlxuICA8dGVtcGxhdGUgI2NoaWxkQ29udGFpbmVyPjwvdGVtcGxhdGU+XG48L2Rpdj5cblxuPGRlYy1zcGlubmVyICpuZ0lmPVwiIWxvYWRlZFwiPjwvZGVjLXNwaW5uZXI+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1kaWFsb2ctY2hpbGQtd3JhcHBlcntwYWRkaW5nOjMycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvLyBDVVJSRU5UXG4gIGNoaWxkQ29tcG9uZW50VHlwZTogQ29tcG9uZW50VHlwZTxhbnk+O1xuXG4gIGNoaWxkQ29tcG9uZW50SW5zdGFuY2U6IGFueTtcblxuICBhY3Rpb25zOiBEaWFsb2dBY3Rpb25bXSA9IFtdO1xuXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgY29udGV4dDogYW55ID0ge307XG5cbiAgbG9hZGVkOiBib29sZWFuO1xuXG4gIEBWaWV3Q2hpbGQoJ2NoaWxkQ29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIGNoaWxkQ29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIEBPdXRwdXQoKSBjaGlsZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmFjdG9yOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEZWNEaWFsb2dDb21wb25lbnQ+XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyT3BlbigpXG4gICAgLnRvUHJvbWlzZSgpXG4gICAgLnRoZW4odGhpcy5mYWN0b3J5VGhlQ29tcG9uZW50KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBmYWN0b3J5VGhlQ29tcG9uZW50ID0gKCkgPT4ge1xuXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxhbnk+ID0gdGhpcy5mYWN0b3IucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5jaGlsZENvbXBvbmVudFR5cGUpO1xuXG4gICAgY29uc3QgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMuY2hpbGRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgdGhpcy5jaGlsZENvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXG4gICAgdGhpcy5jaGlsZC5lbWl0KHRoaXMuY2hpbGRDb21wb25lbnRJbnN0YW5jZSk7XG5cbiAgICB0aGlzLmNoaWxkLmNvbXBsZXRlKCk7IC8vIHVuc3Vic3JpYmUgc3Vic2NyaWJlcnNcblxuICAgIHRoaXMuYXBwZW5kQ29udGV4dFRvSW5zdGFuY2UoY29tcG9uZW50UmVmLmluc3RhbmNlLCB0aGlzLmNvbnRleHQpO1xuXG4gICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuXG4gIH1cblxuICBwcml2YXRlIGFwcGVuZENvbnRleHRUb0luc3RhbmNlKGluc3RhbmNlOiBhbnksIGNvbnRleHQ6IGFueSkge1xuXG4gICAgaWYgKGluc3RhbmNlICYmIGNvbnRleHQpIHtcblxuICAgICAgT2JqZWN0LmtleXMoY29udGV4dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cbiAgICAgICAgaW5zdGFuY2Vba2V5XSA9IHRoaXMuY29udGV4dFtrZXldO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zcGlubmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGVjb3JhLWxvYWRpbmctc3Bpbm5lci13cmFwcGVyXCI+XG4gIDxkaXYgY2xhc3M9XCJkZWNvcmEtbG9hZGluZy1zcGlubmVyIHRyYW5zcGFyZW50QmdcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlubmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FwXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGFsZi1jaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoYWxmLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2AuZGVjb3JhLWxvYWRpbmctc3Bpbm5lci13cmFwcGVye3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTcGlubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNwaW5uZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNTcGlubmVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY1NwaW5uZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NwaW5uZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERlY0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vZGVjLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3BlbkNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2RlYy1kaWFsb2cubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2dcbiAgKSB7IH1cblxuXG4gIG9wZW4oY2hpbGRDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8YW55PiwgY29uZmlnOiBPcGVuQ29uZmlndXJhdGlvbikge1xuXG4gICAgY29uc3QgZGlhbG9nSW5zdGFuY2U6IE1hdERpYWxvZ1JlZjxhbnk+ID0gdGhpcy5kaWFsb2cub3BlbihcbiAgICAgIERlY0RpYWxvZ0NvbXBvbmVudCxcbiAgICAgIHtcbiAgICAgICAgd2lkdGg6IGNvbmZpZy53aWR0aCB8fCAnMTAwdncnLFxuICAgICAgICBoZWlnaHQ6IGNvbmZpZy5oZWlndGggfHwgJzEwMHZoJyxcbiAgICAgICAgcGFuZWxDbGFzczogJ2Z1bGwtc2NyZWVuLWRpYWxvZydcbiAgICAgIH1cbiAgICApO1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UuY2hpbGRDb21wb25lbnRUeXBlID0gY2hpbGRDb21wb25lbnQ7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS5hY3Rpb25zID0gY29uZmlnLmFjdGlvbnM7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9IGNvbmZpZy50aXRsZTtcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLmNvbnRleHQgPSBjb25maWcuY29udGV4dDtcblxuICAgIHJldHVybiBkaWFsb2dJbnN0YW5jZTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLXNwaW5uZXIvZGVjLXNwaW5uZXIubW9kdWxlJztcblxuaW1wb3J0IHsgRGVjRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtZGlhbG9nLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBEZWNTcGlubmVyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjRGlhbG9nQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbRGVjRGlhbG9nQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbRGVjRGlhbG9nU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ01vZHVsZSB7IH1cbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaGVpa2FsdGhhZi9uZ3UtY2Fyb3VzZWwjaW5wdXQtaW50ZXJmYWNlXG5cbmV4cG9ydCBjb25zdCBDYXJvdXNlbENvbmZpZyA9IHtcbiAgZ3JpZDogeyB4czogMSwgc206IDIsIG1kOiAzLCBsZzogNCwgYWxsOiAwIH0sXG4gIHNsaWRlOiAxLFxuICBzcGVlZDogNDAwLFxuICBpbnRlcnZhbDogNDAwMCxcbiAgcG9pbnQ6IHtcbiAgICB2aXNpYmxlOiBmYWxzZVxuICB9LFxuICBjdXN0b206ICdiYW5uZXInXG59O1xuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxDb25maWcgfSBmcm9tICcuL2Nhcm91c2VsLWNvbmZpZyc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbFN0b3JlIH0gZnJvbSAnQG5ndS9jYXJvdXNlbC9zcmMvbmd1LWNhcm91c2VsL25ndS1jYXJvdXNlbC5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZ2FsbGVyeScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1nYWxsZXJ5LXdyYXBwZXJcIj5cblxuICA8ZGl2IGNsYXNzPVwiaW1hZ2UtaGlnaGxpZ2h0ZWRcIiBbZGVjSW1hZ2VdPVwiaW1hZ2VIaWdobGlnaHRcIiBbZGVjSW1hZ2VTaXplXT1cInt3aWR0aDo2MDB9XCI+PC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIiAqbmdJZj1cImltZ0V4dGVybmFsTGlua1wiPlxuXG4gICAgPGEgaHJlZj1cInt7IGltZ0V4dGVybmFsTGluayB9fVwiIHRhcmdldD1cIl9ibGFua1wiPnt7ICdsYWJlbC5pbWFnZS1saW5rJyB8IHRyYW5zbGF0ZSB9fTwvYT5cblxuICA8L2Rpdj5cblxuICA8bmd1LWNhcm91c2VsIGNsYXNzPVwiY2Fyb3VzZWwtd3JhcHBlclwiIFtpbnB1dHNdPVwiY2Fyb3VzZWxDb25maWdcIiAoaW5pdERhdGEpPVwib25Jbml0RGF0YUZuKCRldmVudClcIiAob25Nb3ZlKT1cIm9uTW92ZUZuKCRldmVudClcIj5cblxuICAgIDxuZ3UtaXRlbSBOZ3VDYXJvdXNlbEl0ZW0gKm5nRm9yPVwibGV0IGltYWdlIG9mIGltYWdlc1wiIFtjbGFzcy5hY3RpdmVdPVwiaW1hZ2UgPT0gaW1hZ2VIaWdobGlnaHRcIj5cblxuICAgICAgPGltZyBbZGVjSW1hZ2VdPVwiaW1hZ2VcIiBbZGVjSW1hZ2VTaXplXT1cInt3aWR0aDozMDAsIGhlaWdodDozMDB9XCIgKGNsaWNrKT1cIm9uU2VsZWN0SW1hZ2UoJGV2ZW50LGltYWdlKVwiPlxuXG4gICAgPC9uZ3UtaXRlbT5cblxuICAgIDxtYXQtaWNvbiBOZ3VDYXJvdXNlbFByZXYgY2xhc3M9XCJsZWZ0LXByZXZpb3VzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGlzRmlyc3R9XCI+Y2hldnJvbl9sZWZ0PC9tYXQtaWNvbj5cblxuICAgIDxtYXQtaWNvbiBOZ3VDYXJvdXNlbE5leHQgY2xhc3M9XCJyaWdodC1uZXh0XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGlzTGFzdH1cIj5jaGV2cm9uX3JpZ2h0PC9tYXQtaWNvbj5cblxuICA8L25ndS1jYXJvdXNlbD5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1nYWxsZXJ5LXdyYXBwZXJ7bWF4LXdpZHRoOjYyNHB4O292ZXJmbG93OmhpZGRlbn0uZGVjLWdhbGxlcnktd3JhcHBlciAuaW1hZ2UtaGlnaGxpZ2h0ZWR7Ym9yZGVyOjJweCBzb2xpZCAjZjVmNWY1O3dpZHRoOjYyMHB4O2hlaWdodDo2MjBweH0uZGVjLWdhbGxlcnktd3JhcHBlciBhe2ZvbnQtc2l6ZToxMHB4O3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOiM5MjkyOTI7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXJ7bWFyZ2luLXRvcDo4cHg7cGFkZGluZzowIDI0cHg7aGVpZ2h0OjEyOHB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVte2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtoZWlnaHQ6MTI0cHg7cGFkZGluZzoycHg7bWFyZ2luLXJpZ2h0OjJweH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbS5hY3RpdmUsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW06aG92ZXJ7cGFkZGluZzowO2JvcmRlcjoycHggc29saWQgIzIzMmUzOH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbSBpbWd7bWF4LXdpZHRoOjEyNHB4O2N1cnNvcjpwb2ludGVyfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0e2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O3Bvc2l0aW9uOmFic29sdXRlO3RvcDpjYWxjKDUwJSAtIDEycHgpO2N1cnNvcjpwb2ludGVyO3RleHQtc2hhZG93Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzOmhvdmVyLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0OmhvdmVye3RleHQtc2hhZG93OjAgMCA2cHggcmdiYSgwLDAsMCwuMil9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMuZGlzYWJsZWQsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQuZGlzYWJsZWR7b3BhY2l0eTouNH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cy5kaXNhYmxlZDpob3ZlciwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dC5kaXNhYmxlZDpob3Zlcnt0ZXh0LXNoYWRvdzpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3Vze2xlZnQ6MH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dHtyaWdodDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dhbGxlcnlDb21wb25lbnQge1xuXG4gIGltYWdlSGlnaGxpZ2h0OiBhbnk7XG5cbiAgYWN0aXZlSW1hZ2U6IEVsZW1lbnQ7XG5cbiAgaW1nRXh0ZXJuYWxMaW5rOiBzdHJpbmc7XG5cbiAgaXNGaXJzdDogYm9vbGVhbjtcblxuICBpc0xhc3Q6IGJvb2xlYW47XG5cbiAgY2Fyb3VzZWxDb25maWcgPSBDYXJvdXNlbENvbmZpZztcblxuICBASW5wdXQoKVxuICBzZXQgaW1hZ2VzKHZhbHVlOiBhbnlbXSkge1xuXG4gICAgdmFsdWUgPSB2YWx1ZSB8fCBuZXcgQXJyYXk8YW55PigpO1xuXG4gICAgaWYgKHZhbHVlICYmIChKU09OLnN0cmluZ2lmeSh2YWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuX2ltYWdlcykpKSB7XG5cbiAgICAgIHRoaXMuaW1hZ2VIaWdobGlnaHQgPSB2YWx1ZVswXTtcblxuICAgICAgdGhpcy5faW1hZ2VzID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuc2V0RXh0ZXJuYWxMaW5rKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBpbWFnZXMoKTogYW55W10ge1xuXG4gICAgcmV0dXJuIHRoaXMuX2ltYWdlcztcblxuICB9XG5cbiAgcHJpdmF0ZSBfaW1hZ2VzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgb25TZWxlY3RJbWFnZSA9ICgkZXZlbnQsIHN5c0ZpbGUpID0+IHtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUltYWdlICYmIHRoaXMuYWN0aXZlSW1hZ2UgIT09ICRldmVudC50YXJnZXQpIHtcblxuICAgICAgdGhpcy5hY3RpdmVJbWFnZS5jbGFzc05hbWUgPSAnJztcblxuICAgIH1cblxuICAgICRldmVudC50YXJnZXQuY2xhc3NOYW1lID0gJ2FjdGl2ZSc7XG5cbiAgICB0aGlzLmFjdGl2ZUltYWdlID0gJGV2ZW50LnRhcmdldDtcblxuICAgIHRoaXMuaW1hZ2VIaWdobGlnaHQgPSBzeXNGaWxlO1xuXG4gICAgdGhpcy5zZXRFeHRlcm5hbExpbmsoKTtcblxuICB9XG5cbiAgc2V0RXh0ZXJuYWxMaW5rID0gKCkgPT4ge1xuXG4gICAgaWYgKHRoaXMuaW1hZ2VIaWdobGlnaHQpIHtcblxuICAgICAgdGhpcy5pbWdFeHRlcm5hbExpbmsgPSB0aGlzLmltYWdlSGlnaGxpZ2h0LmZpbGVVcmw7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uSW5pdERhdGFGbihldmVudDogTmd1Q2Fyb3VzZWxTdG9yZSkge1xuXG4gICAgdGhpcy5zZXRQcmV2TmV4dENoZWNrZXJzKGV2ZW50LmlzRmlyc3QsIGV2ZW50Lml0ZW1zID49IHRoaXMuaW1hZ2VzLmxlbmd0aCk7XG5cbiAgfVxuXG4gIG9uTW92ZUZuKGV2ZW50OiBOZ3VDYXJvdXNlbFN0b3JlKSB7XG5cbiAgICB0aGlzLnNldFByZXZOZXh0Q2hlY2tlcnMoZXZlbnQuaXNGaXJzdCwgZXZlbnQuaXNMYXN0KTtcblxuICB9XG5cbiAgc2V0UHJldk5leHRDaGVja2VycyhmaXJzdDogYm9vbGVhbiwgbGFzdDogYm9vbGVhbikge1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuaXNGaXJzdCA9IGZpcnN0O1xuXG4gICAgICB0aGlzLmlzTGFzdCA9IGxhc3Q7XG5cbiAgICB9LCAwKTtcblxuICB9XG5cbn1cbiIsImV4cG9ydCBjb25zdCBUaHVtYm9yU2VydmVySG9zdCA9ICdodHRwczovL2NhY2hlLXRodW1icy5kZWNvcmFjb250ZW50LmNvbS91bnNhZmUnO1xuXG5leHBvcnQgY29uc3QgUzNIb3N0ID0gJ2h0dHA6Ly9zMy5hbWF6b25hd3MuY29tL2RlY29yYS1wbGF0Zm9ybS0xLW52JztcblxuZXhwb3J0IGNvbnN0IFRyYW5zcGFyZW50SW1hZ2UgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUFtSkxSMFFBLzRlUHpMOEFBQVxuQUpjRWhaY3dBQUN4TUFBQXNUQVFDYW5CZ0FBQUFMU1VSQlZBalhZMkJnQUFBQUF3QUJJTldVeHdBQUFBQkpSVTVFcmtKZ2dnPT1gO1xuXG5leHBvcnQgY29uc3QgRXJyb3JJbWFnZSA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQU1BQUFEMDRKSDVBQUFBc1ZCTVZFVUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVxuQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFcbkFBQUFBQUFBQWsyd0xTQUFBQU9uUlNUbE1BQTRVVUJRZ01FUFNLSytqYUd4Y2Y5NTB5Y2s4Nk5pK21nYjlYSmlPeVJQRHMzcUtXWjByS3JYeDMrODVqUVQyNFhlUFgwOFZ0YXBHYUVDNVJOd0FBQjE1SlJFRlVlTnJ0bTJkejJ6QU1oa2xyMmJJbDc1RjQxWEc4NHBsbDEvei9QNnlYVmpZRWtpS1xucGtkNzFycytubmlNZEllSUZDRUFxK2M5Ly9wTVYyd3Y4M21HNW5CNTZmdURhNUM5Q2crbm1WR2FZSDZlWGFVREo5eE1PSnl5WnlUQWszMGx3cmpJZHM4MllmQS91QlZiWDJIRHhTT0dNNXl3TmszNnhldWg5c0xTOEg0c3pZYlJpU1pUTExKRmFxeURkUzJULzlqeHNoVkh3VTl1eHhzZjlYR0xLXG5ZMWhBMEw4d2pvL0Z5SmFyMUc4TE1uMnc4MnJ2aVNGMkhaZW84RG83aHFqMmN6MytBODUyWjhza1dXeXdNMHJaeGVnaThhME9wdHRwTDkrUUdDMlNEYjhjMy90V3FnZnAxaGl3UFpBc0xPSVBrVDZvbDNIejJ4bmNVR0xBSll1VzdiaUFua2xhcnJGb3p1ckRJT2FITlUwbi96WGN1czhSUmFYWVlcbjZTeUFKTGZiSnp2RUdsa3NxQjV2K3ZrNUUzazRJWUpNUVhVMDh4L29qbmd6V3ZxK0hzZ1JmQU0wVWhNYUVIMGtXS29zQnNtR2NtOUo1QVhVaFRnMDRCb3VlZi9DZ0VLODBMTk1UYTJTWXBrWXBvUysvZkRoeGJiUjkzTGhKYjZ1dXF0MW5PTEx1b2J0OHhtR3puQUowcnErNS9OaVBrWHplYlBmVlxuMXpRTjhMRk5YcFlSYUExaWVUOFdscDFLV1BoTWRiMmxaWDZWc21aenRXdXZmalpxZytCVlVjblRmbGxCMmwzN1E2ckVINTJhR2FtSmJ6Yk9TRW1sb20wVVg5cEoxa0twUVNwN2NZNnhJcDd3eHhDdVFLWUFvMDBUTlZib0V2YnFnc0dSeVppaWtCRkU3dUs3SWxvaTF1NllHcFdHb0twTnZ1eXNSXG45MHgvV2RhZElBOEROVm5JWjBnM1h5aWI3a01NRm9JSXpFYWhHRzJBVE1sN2hKbnVzTmNDNDRxQlJFcW1LV1FKVlRWM2NaemRqYXR3ekZSY3JUaEI0ZkQ1cFJ4Y0tKOGR0REJCR2xnNGJDV3AwSGxnYWZweXhqa01vdDZRZTJFSEMyU1NwTVZ5bk02RXVpOFFad1ZqUjFYSFJlM2d3OXRTRGxMRmpcbktkaWlRYzFlSGdlZDZHZFhOWjE2aEdjQmtSaFFrL21BaSs5QjlKUzhhQStjR3IzN1gxNGJ6QlNjKzUraWJwVWd0bUxuSUZmanhzbWd4cVpFN2xzOFcxS2NKZllMVnVNcnZkODFZR1pVWlhXdko4dlJEbG81UVkxdm9FYkxjOFBSc2pKakdsQ3pHUDNXaytUaEdZN01BNlNwVDF6OThXbGtQREEzZ1xuRVNuelFKcFVOYU1NTFlhd3g3aGdlSGNJNWhncFRjQUx6WWdNZDVrdzVEZlYzbWd4akpXbzgwbldWTUQ5cEVuNDFLWHVZVkVMVHJJSHVmR3hwRHlKMTBpMHBLR2lyb0lKQWF3QnNqZXZXSnhIN0FKU3pNRDZtTFNzNlI1RUJZNmdxc2ZXWnlWejU5b2NxUXhING8yMmRnQVlBY0x0YkFhQjBpTk94XG5NRGJQRkU5dUU2YkFDd0JuczduQm9kZmNtTWs2dVk5Vm82QTdBYWJSQThKeEx5MDhBQUlqWklYWTBCb2hwaGtDZUl4TmlBbm1CQVEya0FYbWpNcVhHTVJHSmtRTmQ4QjRCZENBdlZkQ0l4MzRFZXBJWVkycnA3aVh1SWlnc2lNUkZoUzR3Q1cyL0FHQVhVT1ZFa3ovb3c5TVU4NE9nTmdGSU9GdEtcbnJrY2pPNDdxWUNTMjlBUjdoQ0U1WUpLUDdUbmVmMUpuUWs5aWtOeUNJN3ZpQURleHphclR1Sm5SK3FNNENSeGtZb2dHNHNTNnpTWWdYQWtvT0x4THBJRVJmRDhnWVJuL2NvRkdTZzlXNFhkaFlKTEkydUNZcFV1WjZBNXJJa1F0Nk53RW40ZG1TZ2hvNUErYVM4dXNTZFZGNkF4b1Vib0ZwbHVRbFxuOThjb0poSVNwd3picmE2S05WT2dhN1NUc1k0TlQ1a21LS2dFeGJka3JXRmZiOEJKR0dtY1FxaktaamczT29wcHBDWHJqRjcwQmpEWVdtL3p0ZDZzN2NJOWRJSFZ1S2VFNXdWOEthcnd6Y0NBOS9pZGptY1RqTWVwY1pvd0NCakl1Mk5MYndBckVUVUJwOGFXTkE5MjVQT0JWNVVCa0FzMCtCOVlOXG5uVUNES0VrbFcxTVRXTUFtQ2t5aElWNE5mNEVOVWEyVlJVeklyMEJyQ0pxaTFhK1pxdlFTTzN4VUg5QjhWYS9KRTNKTmtZR3NLY1d2K3ZSaVFRekthZUNSMFZUMU1BRlNYUENoZ01HS1Buc3dpN1EvaU1zdEFSaHJYSDQrSVRRTW9RYngwSlFwM2I0TkJqMkF5dndPL010UzVqMDl6azFocjFrRmJcbm5DUklsbDVqRzQ3ODJ5aW84U2FBSUYxbnhSd0hMdzdNSTBhOHNFQm9yM0JlQ2VCc3RERzRxRmtySzBCZDY1a2Z1SzVhSTh0TEVhZ1JXUmN1VGViVjVZSG5Dc2puYTRycE5DMy9GN2M0c0J1ZFZJamxXMEFWTDZuSXZhTEQ5WGFKY3FjS0RyM3B6VzZKOHR1Ykxjd0ZkVTlrci9NVXNJSnk2MG1mbVxuQU9mOEdlaHVERjh6VGU1SmRQSlFpS2w5RS96Yjg3V0hScC94cjBiYlI5d09Oa0JTTFZiNkZCbFdYRXVoamorSncza0hnYWtyb3k2dWlvQlBqVDNQbzNkUjVnZXMvM3c5eEEyYzE3blZVWWV1WFdKcFBVNDZLcndIeWZocnJFeFBPNk5UTURmMXBXRTREY01jcGZ5elljQkp1aUNrRGVEMlROeDk0XG5PL0JvbHFoaDJ5bkpRLzhIOG1jV0M5alZLZVREOUVIS1d3ZHdhM1ZFc2hIc1lvOUIwbExCblpVRzNmdkdEVW5QSzNvL1JOS3luS0YyTmd1dEJnT3F5MVJuUSsrZEFlV3NQclJRWHpNYjJxWUNtdFpRRStkbVR5SVBYRk04b2dabXQ4dTRKQ041R0QxeGxmYWlybDU5K01FUXRYcmVUTjRXaXJ4S1YxXG43VnVhMU5sWEZjS01tTk4yRWlwL2JTRHgyYmZtRTczdmh3WGt2cTE3VlgyUDh6eXNMbmlCU0cvNWwrZVo4VXluakEwdENzazhKeFg1OU1tOUpYaDN3UDRVVnZ3OXM1SU4rSk43MldrOXV3ZWNjaWZ3RzN2Mi9XK0FlZjcxc2UrWnRReDZyN3ZlN3gyUFBybGtQKzgrL3lDekdpN2FGenBQVXRBQUFBQUVsRlRrU3VRbUNDYDtcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEltYWdlU2l6ZSwgU3lzdGVtRmlsZUtleSB9IGZyb20gJy4vaW1hZ2UuZGlyZWN0aXZlLm1vZGVscyc7XG5pbXBvcnQgeyBUcmFuc3BhcmVudEltYWdlLCBUaHVtYm9yU2VydmVySG9zdCwgRXJyb3JJbWFnZSwgUzNIb3N0IH0gZnJvbSAnLi9pbWFnZS5kaXJlY3RpdmUuY29uc3RhbnRzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlY0ltYWdlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2VEaXJlY3RpdmUge1xuXG4gIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGVycm9yT25Mb2FkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY0ltYWdlKHY6IFN5c3RlbUZpbGVLZXkgfCBzdHJpbmcpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lckltYWdlKSB7XG4gICAgICB0aGlzLmlubmVySW1hZ2UgPSB2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBkZWNJbWFnZVNpemU6IEltYWdlU2l6ZTtcblxuICAvLyBEZWZpbmVzIGlmIHdoaXRlIG1hcmdpbnMgc2hvdWxkIGJlIGNyb3BwZWRcbiAgQElucHV0KCkgdHJpbTogYm9vbGVhbjtcblxuICAvLyBEZWZpbmVzIGlmIHRoZSBpbWFnZSBzaG91bGQgYmUgY3JvcHBlZCBvciBmaXQgdGhlIHNpemUgcmVzcGVjdGluIHRoZSBhc3BlY3QgcmF0aW9cbiAgQElucHV0KCkgZml0SW46IGJvb2xlYW47XG5cbiAgLy8gR2VkIHJlZGltZW5zaW9uZWQgaW1hZ2UgZnJvbSB0aHVtYm9yIGltYWdlIHJlc2l6ZSBzZXJ2aWNlXG4gIEBJbnB1dCgpIHRodW1ib3JpemUgPSB0cnVlO1xuXG4gIHByaXZhdGUgY29udGFpbmVyRWxlbWVudFR5cGU6ICdJTUcnIHwgJ05PVC1JTUcnO1xuXG4gIHByaXZhdGUgaW5uZXJJbWFnZTogU3lzdGVtRmlsZUtleSB8IHN0cmluZyA9IFRyYW5zcGFyZW50SW1hZ2U7XG5cbiAgcHJpdmF0ZSBpbWFnZVBhdGg6IHN0cmluZztcblxuICBwcml2YXRlIGZpbmFsSW1hZ2VVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHRoaXMuZGV0ZWN0Q29udGFpbmVyRWxlbWVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RDb250YWluZXJFbGVtZW50KCkge1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudCA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50VHlwZSA9IHRoaXMuY29udGFpbmVyRWxlbWVudC50YWdOYW1lID09PSAnSU1HJyA/ICdJTUcnIDogJ05PVC1JTUcnO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkSW1hZ2UoKSB7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuaW5uZXJJbWFnZSA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gdGhpcy5pbm5lckltYWdlO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5pbWFnZVBhdGggPSB0aGlzLmV4dHJhY3RJbWFnZVVybEZyb21TeXNmaWxlKCk7XG5cbiAgICAgIGlmICh0aGlzLmltYWdlUGF0aCkge1xuXG4gICAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IHRoaXMuZ2V0RmluYWxVcmwoKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSBFcnJvckltYWdlO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLnRyeVRvTG9hZEltYWdlKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVySW1hZ2VbJ2ZpbGVCYXNlUGF0aCddIHx8IHVuZGVmaW5lZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEZpbmFsVXJsKCkge1xuXG4gICAgaWYgKHRoaXMudGh1bWJvcml6ZSkge1xuXG4gICAgICByZXR1cm4gdGhpcy5nZXRUaHVtYm9yVXJsKCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5nZXRTM1VybCgpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGdldFMzVXJsKCkge1xuICAgIHJldHVybiBgJHtTM0hvc3R9LyR7dGhpcy5pbWFnZVBhdGh9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGh1bWJvclVybCgpIHtcbiAgICBjb25zdCBzaXplID0gdGhpcy5nZXRJbWFnZVNpemUodGhpcy5kZWNJbWFnZVNpemUpO1xuICAgIGNvbnN0IGFzcGVjdCA9IHRoaXMuZ2V0QXNwZWN0KCk7XG4gICAgY29uc3QgdHJpbSA9IHRoaXMuZ2V0VHJpbSgpO1xuICAgIHJldHVybiBgJHtUaHVtYm9yU2VydmVySG9zdH0vJHtzaXplfSR7YXNwZWN0fSR7dHJpbX0vJHt0aGlzLmltYWdlUGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbWFnZVNpemUoZGVjSW1hZ2VTaXplOiBJbWFnZVNpemUgPSB7fSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke2RlY0ltYWdlU2l6ZS53aWR0aCB8fCAwfXgke2RlY0ltYWdlU2l6ZS5oZWlnaHQgfHwgMH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBc3BlY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZml0SW4gPyAnL2ZpdC1pbicgIDogJyc7XG4gIH1cblxuICBwcml2YXRlIGdldFRyaW0oKSB7XG4gICAgcmV0dXJuIHRoaXMudHJpbSA/ICcvdHJpbScgOiAnJztcbiAgfVxuXG4gIHByaXZhdGUgdHJ5VG9Mb2FkSW1hZ2UoKSB7XG4gICAgY29uc3QgZG93bmxvYWRpbmdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGRvd25sb2FkaW5nSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5jcmVhdGVJbWFnZSgpO1xuICAgIH07XG5cbiAgICBkb3dubG9hZGluZ0ltYWdlLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSBFcnJvckltYWdlO1xuICAgICAgdGhpcy5jcmVhdGVJbWFnZSgpO1xuICAgIH07XG5cbiAgICBkb3dubG9hZGluZ0ltYWdlLnNyYyA9IHRoaXMuZmluYWxJbWFnZVVybDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyRWxlbWVudFR5cGUgPT09ICdJTUcnKSB7XG4gICAgICB0aGlzLnNldEltYWdlZWxlbWVudFNyYygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGVuZEltYWdlVG9CZygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kSW1hZ2VUb0JnKCkge1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyB0aGlzLmZpbmFsSW1hZ2VVcmwgKyAnKSc7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRTaXplID0gJzEwMCUnO1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkZWMtaW1hZ2UtYmctbG9hZGluZycpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbWFnZWVsZW1lbnRTcmMoKSB7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgdGhpcy5maW5hbEltYWdlVXJsKTtcbiAgfVxuXG59XG5cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNJbWFnZURpcmVjdGl2ZSB9IGZyb20gJy4vaW1hZ2UuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNJbWFnZURpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtEZWNJbWFnZURpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2VNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0dhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL2RlYy1nYWxsZXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNJbWFnZU1vZHVsZSB9IGZyb20gJy4vLi4vLi4vZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5tb2R1bGUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbE1vZHVsZSB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCAnaGFtbWVyanMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY0ltYWdlTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE5ndUNhcm91c2VsTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0dhbGxlcnlDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0dhbGxlcnlDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHYWxsZXJ5TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGFiZWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3JIZXh9XCIgZGVjQ29udHJhc3RGb250V2l0aEJnPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BkaXZ7bWFyZ2luOjRweDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjdweCAxMnB4O2JvcmRlci1yYWRpdXM6MjRweDthbGlnbi1pdGVtczpjZW50ZXI7Y3Vyc29yOmRlZmF1bHR9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGFiZWxDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGNvbG9ySGV4ID0gJyNEM0QzRDMnO1xuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ290cmFzdCBjb25maWd1cmF0aW9uXG4gKlxuICogVXNlZCB0byBkZWZpbmUgc29tZSBjdXN0b20gY29uZmlndXJhdGlvbiBhcyBjb2xvcnMgYW5kIGJyZWFrcG9pbnRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNDb250cmFzdEZvbnRXaXRoQmdEaXJlY3RpdmVDb25maWcge1xuICBsdW1hQnJlYWtQb2ludDogc3RyaW5nO1xuICBsaWdodENvbG9yOiBzdHJpbmc7XG4gIGRhcmtDb2xvcjogc3RyaW5nO1xufVxuXG5jb25zdCBERUZBVUxUX0xVTUFfQlJFQUtQT0lOVCA9IDIwMDtcblxuLypcbiogQ29udHJhc3QgRm9udCBXaXRoIEJhY2tncm91bmQgRGlyZWN0aXZlXG4qXG4qIENvbnRyYXN0cyB0aGUgdGV4dCBjb2xvciB3aXRoIHRoZSBiYWNrZ3JvdW5kLWNvbG9yIHRvIGF2b2lkIHdoaXRlIGNvbG9yIGluIGxpZ2ggYmFja2dyb3VuZCBhbmQgYmxhY2sgY29sb3IgaW4gZGFya2VuIG9uZXMuXG4qIEl0IGNhbiBiZSB1c2VkIGFzIGF0dHJpYnV0ZSBpbiBhbnkgZWxlbWVudCB3aXRoIG9yIHdpdGhvdXQgcGFzc2luZyBjdXN0b20gY29uZmlndXJhdGlvblxuKiBFeGFtcGxlIHdpdGhvdXQgY3VzdG9tIGNvbmZpZ3VyYXRpb246IDxkaXYgZGVjQ29udHJhc3RGb250V2l0aEJnXCI+PC9kaXY+XG4qIEV4YW1wbGUgd2l0aCBjdXN0b20gY29uZmlndXJhdGlvbjogPGRpdiBbZGVjQ29udHJhc3RGb250V2l0aEJnXT1cIntkYXJrQ29sb3I6ICdyZWQnfVwiPjwvZGl2PlxuKlxuKiBDb25maWd1cmF0aW9uIHBhcmFtczpcbiogbHVtYUJyZWFrUG9pbnQ6IHRoZSBwb2ludCB3aGVyZSB3ZSBzaG91bGQgY2hhbmdlIHRoZSBmb250IGNvbG9yLiBUaGlzIGlzIHRoZSBsaWd0aCBmZWVsaW5nIGJyZWFrcG9pbnQuXG4qIGxpZ2h0Q29sb3I6IHRoZSB0ZXh0IGNvbG9yIHVzZWQgaW4gZGFyayBiYWNrZ3JvdW5kc1xuKiBkYXJrQ29sb3I6IHRoZSB0ZXh0IGNvbG9yIHVzZWQgaW4gbGlndGggYmFja2dyb3VuZHNcbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb1JnYk5ldyhoZXgpIHtcblxuICBjb25zdCByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgcmV0dXJuIHJlc3VsdCA/IHtcbiAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICBiOiBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuICB9IDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YW5kYXJkaXplX2NvbG9yKGJnQ29sb3IpIHtcblxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICBjdHguZmlsbFN0eWxlID0gYmdDb2xvcjtcblxuICByZXR1cm4gY3R4LmZpbGxTdHlsZTtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGVjQ29udHJhc3RGb250V2l0aEJnXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlIGltcGxlbWVudHMgRG9DaGVjayB7XG5cbiAgcHJpdmF0ZSBjb25maWc7XG5cbiAgcHJpdmF0ZSBiZ0NvbG9yO1xuXG4gIEBJbnB1dCgpIHNldCBkZWNDb250cmFzdEZvbnRXaXRoQmcoY29uZmlnOiBEZWNDb250cmFzdEZvbnRXaXRoQmdEaXJlY3RpdmVDb25maWcpIHtcblxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgdGhpcy5kb0RlY0NvbnRyYXN0Rm9udFdpdGhCZygpO1xuXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG5cbiAgICB0aGlzLmJnQ29sb3IgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuXG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG5cbiAgICBjb25zdCBiZ0NvbG9yID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcblxuICAgIGlmIChiZ0NvbG9yICE9PSB0aGlzLmJnQ29sb3IpIHtcblxuICAgICAgdGhpcy5iZ0NvbG9yID0gYmdDb2xvcjtcblxuICAgICAgdGhpcy5kb0RlY0NvbnRyYXN0Rm9udFdpdGhCZygpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGRvRGVjQ29udHJhc3RGb250V2l0aEJnKCkge1xuXG4gICAgY29uc3QgbHVtYUJyZWFrUG9pbnQgPSAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcubHVtYUJyZWFrUG9pbnQpID8gdGhpcy5jb25maWcubHVtYUJyZWFrUG9pbnQgOiBERUZBVUxUX0xVTUFfQlJFQUtQT0lOVDtcblxuICAgIGNvbnN0IGhleGFCZ0NvbG9yID0gc3RhbmRhcmRpemVfY29sb3IodGhpcy5iZ0NvbG9yKTtcblxuICAgIGNvbnN0IHJnYkNvbG9yID0gaGV4VG9SZ2JOZXcoaGV4YUJnQ29sb3IpO1xuXG4gICAgY29uc3QgbHVtYSA9IDAuMjEyNiAqIHJnYkNvbG9yLnIgKyAwLjcxNTIgKiByZ2JDb2xvci5nICsgMC4wNzIyICogcmdiQ29sb3IuYjsgLy8gcGVyIElUVS1SIEJULjcwOVxuXG4gICAgaWYgKGx1bWEgPCBsdW1hQnJlYWtQb2ludCkge1xuXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY29sb3IgPSAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcubGlnaHRDb2xvcikgPyB0aGlzLmNvbmZpZy5saWdodENvbG9yIDogJ3JnYmEoMjU1LDI1NSwyNTUsMSknO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmNvbG9yID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmRhcmtDb2xvcikgPyB0aGlzLmNvbmZpZy5kYXJrQ29sb3IgOiAnIzIzMmUzOCc7XG5cbiAgICB9XG5cbiAgfVxufVxuXG5cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlIH0gZnJvbSAnLi9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbnRyYXN0Rm9udFdpdGhCZ01vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNMYWJlbENvbXBvbmVudCB9IGZyb20gJy4vZGVjLWxhYmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNDb250cmFzdEZvbnRXaXRoQmdNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvY29sb3IvY29udHJhc3QtZm9udC13aXRoLWJnL2RlYy1jb250cmFzdC1mb250LXdpdGgtYmcubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRGVjQ29udHJhc3RGb250V2l0aEJnTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNMYWJlbENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjTGFiZWxDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMYWJlbE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpbHRlcnMsIEZpbHRlckdyb3VwcyB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuXG5cbi8qXG4gICogRGVjTGlzdFByZVNlYXJjaFxuICAqXG4gICogVXNlZCBhcyBtaWRkbGV3YXJlIHRvIG1hbmlwdWxhdGUgdGhlIGZpbHRlciBiZWZvcmUgZmV0Y2huZyB0aGUgZGF0YVxuICAqL1xuZXhwb3J0IHR5cGUgRGVjTGlzdFByZVNlYXJjaCA9IChmaWx0ZXJHcm91cHM6IEZpbHRlckdyb3VwcykgPT4gRmlsdGVyR3JvdXBzO1xuXG5cbi8qXG4gICogRGVjTGlzdEZldGNoTWV0aG9kXG4gICpcbiAgKiBVc2VkIHRvIGZldGNoIGRhdGEgZnJvbSByZW1vdGUgQVBJXG4gICovXG5leHBvcnQgdHlwZSBEZWNMaXN0RmV0Y2hNZXRob2QgPSAoZW5kcG9pbnQ6IHN0cmluZywgZmlsdGVyOiBhbnkpID0+IE9ic2VydmFibGU8RGVjTGlzdEZldGNoTWV0aG9kUmVzcG9uc2U+O1xuXG4vKlxuICAqIExpc3RUeXBlXG4gICpcbiAgKiBMaXN0IHR5cGVzXG4gICovXG5leHBvcnQgdHlwZSBEZWNMaXN0VHlwZSA9ICd0YWJsZScgfCAnZ3JpZCc7XG5cbi8qXG4gICogRGVjTGlzdEZldGNoTWV0aG9kUmVzcG9uc2VcbiAgKlxuICAqIFJlc3BvbnNlIHJlY2VpdmVkIGJ5IGZldGNoIERlY0xpc3RGZXRjaE1ldGhvZFxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNMaXN0RmV0Y2hNZXRob2RSZXNwb25zZSB7XG4gIHJlc3VsdDoge1xuICAgIHJvd3M6IGFueVtdO1xuICAgIGNvdW50OiBudW1iZXI7XG4gIH07XG59XG5cbi8qXG4gICogRGVjTGlzdEZpbHRlclxuICAqXG4gICogU3RydWN0dXJlIG9mIHRhYnMgZmlsdGVyc1xuICAqL1xuZXhwb3J0IGNsYXNzIERlY0xpc3RGaWx0ZXIge1xuICBjaGlsZHJlbj86IERlY0xpc3RGaWx0ZXJbXTtcbiAgY291bnQ/OiBGdW5jdGlvbiB8IHN0cmluZztcbiAgZGVmYXVsdD86IGJvb2xlYW47XG4gIGZpbHRlcnM6IEZpbHRlcnM7XG4gIGhpZGU/OiBib29sZWFuO1xuICBsYWJlbDogc3RyaW5nO1xuICBjb2xvcjogc3RyaW5nO1xuICBsaXN0TW9kZT86IERlY0xpc3RUeXBlO1xuICBwZXJtaXNzaW9ucz86IHN0cmluZ1tdO1xuICB1aWQ/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogYW55ID0ge30pIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gZGF0YS5jaGlsZHJlbiA/IGRhdGEuY2hpbGRyZW4ubWFwKGZpbHRlciA9PiBuZXcgRGVjTGlzdEZpbHRlcihmaWx0ZXIpKSA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvdW50ID0gZGF0YS5jb3VudCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5kZWZhdWx0ID0gZGF0YS5kZWZhdWx0IHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpbHRlcnMgPSBkYXRhLmZpbHRlcnMgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuaGlkZSA9IGRhdGEuaGlkZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5sYWJlbCA9IGRhdGEubGFiZWwgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yIHx8ICcjNkU3NTdBJztcbiAgICB0aGlzLmxpc3RNb2RlID0gZGF0YS5saXN0TW9kZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5wZXJtaXNzaW9ucyA9IGRhdGEucGVybWlzc2lvbnMgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMudWlkID0gZGF0YS51aWQgfHwgZGF0YS5sYWJlbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjTGlzdEZldGNoTWV0aG9kLCBEZWNMaXN0RmlsdGVyIH0gZnJvbSAnLi8uLi8uLi9saXN0Lm1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYnMtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGlzdC10YWJzLWZpbHRlci13cmFwcGVyXCIgKm5nSWY9XCJ2aXNpYmxlRmlsdGVycyBhcyBmaWx0ZXJzXCI+XG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cImRlYy10YWItaGVhZGVyXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdGFiRmlsdGVyIG9mIGZpbHRlcnNcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICpkZWNQZXJtaXNzaW9uPVwidGFiRmlsdGVyLnBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgICAgbWF0LWJ1dHRvblxuICAgICAgICAgICAgICBjbGFzcz1cInVwcGVyY2FzZVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RUYWIodGFiRmlsdGVyLnVpZClcIlxuICAgICAgICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwic2VsZWN0ZWRUYWJVaWQgPT0gKHRhYkZpbHRlci51aWQpXCI+XG4gICAgICAgIDxzcGFuPnt7ICdsYWJlbC4nICsgdGFiRmlsdGVyLmxhYmVsIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInRhYkZpbHRlci5jb3VudCAmJiBjb3VudEVuZHBvaW50ICYmIGNvdW50UmVwb3J0XCIgY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLXNtYWxsXCI+e3sgZ2V0Q291bnRPZih0YWJGaWx0ZXIuY291bnQpIH19PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmxpc3QtdGFicy1maWx0ZXItd3JhcHBlcnttYXJnaW4tdG9wOjhweH0ubGlzdC10YWJzLWZpbHRlci13cmFwcGVyIC5kZWMtdGFiLWhlYWRlci5ib3R0b217Ym9yZGVyLWJvdHRvbTowfS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyIC5iYWRnZXttYXJnaW4tbGVmdDo4cHh9Lmxpc3QtdGFicy1maWx0ZXItd3JhcHBlciAuZGVjLXRhYi1oZWFkZXIgLmJhZGdlLmJhZGdlLXBpbGx7cGFkZGluZzo4cHg7Zm9udC1zaXplOnNtYWxsO2JvcmRlci1yYWRpdXM6MjRweH0ubGlzdC10YWJzLWZpbHRlci13cmFwcGVyIC5kZWMtdGFiLWhlYWRlciAuYmFkZ2UuYmFkZ2UtcGlsbC5iYWRnZS1zbWFsbHtmb250LXNpemU6eC1zbWFsbDtwYWRkaW5nOjRweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgc2VsZWN0ZWRUYWJVaWQ6IHN0cmluZztcblxuICBuYW1lOiBzdHJpbmc7IC8vIGxpc3QgdW5pcXVlIG5hbWUgdG8gaWRlbnRpZnkgdGhlIHRhYiBpbiB1cmxcblxuICBjb3VudFJlcG9ydDogYW55O1xuXG4gIHNlcnZpY2U6IGFueTtcblxuICBjdXN0b21GZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmaWx0ZXJzKHY6IERlY0xpc3RGaWx0ZXJbXSkge1xuICAgIGlmICh0aGlzLl9maWx0ZXJzICE9PSB2KSB7XG4gICAgICB0aGlzLl9maWx0ZXJzID0gdiA/IHYubWFwKGZpbHRlciA9PiBuZXcgRGVjTGlzdEZpbHRlcihmaWx0ZXIpKSA6IFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldCBmaWx0ZXJzKCk6IERlY0xpc3RGaWx0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcnM7XG4gIH1cblxuICBwcml2YXRlIGRlZmF1bHRUYWI6IHN0cmluZztcblxuICBwcml2YXRlIF9maWx0ZXJzOiBEZWNMaXN0RmlsdGVyW10gPSBbXTtcblxuICBwcml2YXRlIHdhdGhVcmxTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIF9jb3VudEVuZHBvaW50OiBzdHJpbmc7XG5cblxuICAvKlxuICAgKiBjb3VudEVuZHBvaW50XG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgY291bnRFbmRwb2ludCh2OiBzdHJpbmcpIHtcblxuICAgIGlmICh0aGlzLl9jb3VudEVuZHBvaW50ICE9PSB2KSB7XG5cbiAgICAgIHRoaXMuX2NvdW50RW5kcG9pbnQgPSAodlswXSAmJiB2WzBdID09PSAnLycpID8gdi5yZXBsYWNlKCcvJywgJycpIDogdjtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGNvdW50RW5kcG9pbnQoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLl9jb3VudEVuZHBvaW50O1xuXG4gIH1cblxuICBAT3V0cHV0KCdzZWFyY2gnKSBzZWFyY2g6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgndGFiQ2hhbmdlJykgdGFiQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYkluVXJsUXVlcnkoKTtcbiAgfVxuXG4gIGRvRmlyc3RMb2FkID0gKCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBhdm9pZHMgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvciBzZWxlY3RpbmcgdGhlIGFjdGl2ZSB0YWJcbiAgICAgIHRoaXMud2F0Y2hUYWJJblVybFF1ZXJ5KCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBnZXRDb3VudE9mKGNvdW50OiBzdHJpbmcgfCBGdW5jdGlvbikge1xuICAgIGlmICh0eXBlb2YgY291bnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb3VudFJlcG9ydCAmJiB0aGlzLmNvdW50UmVwb3J0W2NvdW50XSA+PSAwID8gdGhpcy5jb3VudFJlcG9ydFtjb3VudF0gOiAnPyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNvdW50UmVwb3J0ICYmIGNvdW50KHRoaXMuY291bnRSZXBvcnQpID49IDAgPyBjb3VudCh0aGlzLmNvdW50UmVwb3J0KSA6ICc/JztcbiAgICB9XG4gIH1cblxuICBzZWxlY3RUYWIodGFiKSB7XG4gICAgdGhpcy5zZXRUYWJJblVybFF1ZXJ5KHRhYik7XG4gIH1cblxuICByZWxvYWRDb3VudFJlcG9ydChwYXlsb2FkKSB7XG5cbiAgICBpZiAodGhpcy5jb3VudEVuZHBvaW50KSB7XG4gICAgICBjb25zdCBmZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QgfHwgdGhpcy5zZXJ2aWNlLmdldDtcbiAgICAgIGZldGNoTWV0aG9kKHRoaXMuY291bnRFbmRwb2ludCwgcGF5bG9hZClcbiAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5jb3VudFJlcG9ydCA9IHJlcztcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0ZWRUYWIoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5maWx0ZXJzID8gdGhpcy5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci51aWQgPT09IHRoaXMuc2VsZWN0ZWRUYWJVaWQpIDogdW5kZWZpbmVkO1xuXG4gIH1cblxuICBnZXQgdmlzaWJsZUZpbHRlcnMoKSB7XG4gICAgY29uc3QgdmlzaWJsZSA9IHRoaXMuZmlsdGVycyA/IHRoaXMuZmlsdGVycy5maWx0ZXIoKGZpbHRlcikgPT4gIWZpbHRlci5oaWRlKSA6IFtdO1xuICAgIHJldHVybiAodmlzaWJsZSAmJiB2aXNpYmxlLmxlbmd0aCA+IDEpID8gdmlzaWJsZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0RGVmYXVsdFRhYigpIHtcblxuICAgIGNvbnN0IGhhc0RlZmF1bHQ6IGFueSA9IHRoaXMuZmlsdGVycy5maW5kKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5kZWZhdWx0O1xuICAgIH0pO1xuXG4gICAgaWYgKGhhc0RlZmF1bHQpIHtcblxuICAgICAgdGhpcy5kZWZhdWx0VGFiID0gaGFzRGVmYXVsdC51aWQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmRlZmF1bHRUYWIgPSB0aGlzLmZpbHRlcnNbMF0udWlkO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIG9uU2VhcmNoID0gKHRhYiwgcmVjb3VudCA9IGZhbHNlKSA9PiB7XG5cbiAgICB0aGlzLnNlbGVjdGVkVGFiVWlkID0gdGFiLnVpZDtcblxuICAgIGlmICh0aGlzLmZpbHRlcnMgJiYgdGFiKSB7XG5cbiAgICAgIGNvbnN0IGV2ZW50ID0ge1xuICAgICAgICBmaWx0ZXJzOiB0YWIuZmlsdGVycyxcbiAgICAgICAgY2hpbGRyZW46IHRhYi5jaGlsZHJlbixcbiAgICAgICAgcmVjb3VudDogcmVjb3VudCxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuc2VhcmNoLmVtaXQoZXZlbnQpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGNvbXBvbmVudFRhYk5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICctdGFiJztcbiAgfVxuXG4gIHByaXZhdGUgc2V0VGFiSW5VcmxRdWVyeSh0YWIpIHtcbiAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG4gICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldID0gdGFiO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLiddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcywgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJJblVybFF1ZXJ5KCkge1xuXG4gICAgdGhpcy5kZXRlY3REZWZhdWx0VGFiKCk7XG5cbiAgICB0aGlzLndhdGhVcmxTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgICAuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcblxuICAgICAgICBjb25zdCB0YWIgPSBwYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldIHx8IHRoaXMuZGVmYXVsdFRhYjtcblxuICAgICAgICBpZiAodGFiICE9PSB0aGlzLnNlbGVjdGVkVGFiVWlkKSB7XG5cbiAgICAgICAgICBjb25zdCBzZWxlY3RlZFRhYiA9IHRoaXMuZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIudWlkID09PSB0YWIpO1xuXG4gICAgICAgICAgdGhpcy5vblNlYXJjaChzZWxlY3RlZFRhYik7XG5cbiAgICAgICAgICB0aGlzLnRhYkNoYW5nZS5lbWl0KHRhYik7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCkge1xuICAgIGlmICh0aGlzLndhdGhVcmxTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMud2F0aFVybFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1hZHZhbmNlZC1maWx0ZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cblxuICA8ZGl2IGZ4RmxleD5cblxuICAgIDxuZy1jb250YWluZXJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlUmVmXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7Zm9ybTogZm9ybX1cIlxuICAgID48L25nLWNvbnRhaW5lcj5cblxuICA8L2Rpdj5cblxuICA8ZGl2IGZ4RmxleD5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGVuZFwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJzdWJtaXQoKVwiPnt7ICdsYWJlbC5zZWFyY2gnIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlIH19PC9idXR0b24+XG5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b24gKGNsaWNrKT1cInJlc2V0KClcIj57eyAnbGFiZWwucmVzZXQnIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlIH19PC9idXR0b24+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuPC9kaXY+XG5cblxuXG5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZvcm06IGFueSA9IHt9O1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIG9uU2VhcmNoID0gKCkgPT4ge307XG5cbiAgb25DbGVhciA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLm9uQ2xlYXIoKTtcbiAgfVxuXG4gIHN1Ym1pdCgpIHtcbiAgICB0aGlzLm9uU2VhcmNoKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYnMtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vLi4vbGlzdC1hZHZhbmNlZC1maWx0ZXIvbGlzdC1hZHZhbmNlZC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjTGlzdFByZVNlYXJjaCwgRGVjTGlzdEZpbHRlciB9IGZyb20gJy4vLi4vbGlzdC5tb2RlbHMnO1xuaW1wb3J0IHsgRmlsdGVyR3JvdXBzIH0gZnJvbSAnLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBQbGF0Zm9ybUxvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGlzdC1maWx0ZXItd3JhcHBlclwiPlxuICA8ZGl2IGZ4TGF5b3V0PVwicm93IHdyYXBcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgICA8IS0tXG4gICAgICBDb3VudGVyXG4gICAgLS0+XG4gICAgPGRpdiBmeEZsZXg9XCIzMFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvdW50ID49IDAgJiYgIWxvYWRpbmdcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA9PT0gMFwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+e3sgXCJsYWJlbC5yZWNvcmQtbm90LWZvdW5kXCIgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnQgPT09IDFcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPnt7IFwibGFiZWwub25lLXJlY29yZC1mb3VuZFwiIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID4gMVwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+IHt7IFwibGFiZWwucmVjb3Jkcy1mb3VuZFwiIHwgdHJhbnNsYXRlOntjb3VudDpjb3VudH0gfX08L3NwYW4+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgZnhGbGV4PVwiNzBcIiBjbGFzcz1cInRleHQtcmlnaHRcIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIiBjbGFzcz1cInNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdj5cblxuICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBjbGFzcz1cImlucHV0LXNlYXJjaC1jb250YWluZXJcIiBbY2xhc3MuYWN0aXZlXT1cInNob3dTZWFyY2hJbnB1dFwiPlxuICAgICAgICAgICAgPCEtLSBnYXAgLS0+XG4gICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4tdG9vZ2xlLXNlYXJjaFwiPlxuICAgICAgICAgICAgICA8bWF0LWljb24gKGNsaWNrKT1cInRvZ2dsZVNlYXJjaElucHV0KClcIj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGZvcm0gZnhGbGV4IHJvbGU9XCJmb3JtXCIgKHN1Ym1pdCk9XCJvblNlYXJjaCgpXCI+XG4gICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjE2cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgY2xhc3M9XCJpbnB1dC1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJhci1oXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBmeEZsZXggI2lucHV0U2VhcmNoIG5hbWU9XCJzZWFyY2hcIiBbKG5nTW9kZWwpXT1cImZpbHRlckZvcm0uc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImFkdmFuY2VkRmlsdGVyQ29tcG9uZW50XCIgY2xhc3M9XCJjbGlja1wiIChjbGljayk9XCJ0b2dnbGVBZHZhbmNlZEZpbHRlcigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlYy1zbWFsbCBidG4tb3Blbi1hZHZhbmNlZC1zZWFyY2hcIj57e1wibGFiZWwuYWR2YW5jZWQtb3B0aW9uc1wiIHwgdHJhbnNsYXRlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPCEtLWdhcC0tPlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS1SZWZyZXNoIHNlYXJjaC0tPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4taW5mbyBtYXJnaW4taWNvblwiIChjbGljayk9XCJvblNlYXJjaCgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+cmVmcmVzaDwvbWF0LWljb24+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLUNsZWFyIGZpbHRlcnMtLT5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiICpuZ0lmPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aFwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWluZm9cIiAoY2xpY2spPVwib25DbGVhcigpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+Y2xlYXI8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiICpuZ0lmPVwic2hvd0luZm9CdXR0b25cIj5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1pbmZvXCIgKGNsaWNrKT1cIm9uQ2xpY2tJbmZvKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5pbmZvX291dGxpbmU8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG5cbiAgPGRpdiAqbmdJZj1cInNob3dBZHZhbmNlZEZpbHRlclwiPlxuXG4gICAgPG1hdC1jYXJkIGNsYXNzPVwiYWR2YW5jZWQtc2VhcmNoLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsncmVtb3ZlLWJ1dHRvbi1lbmFibGVkJzogZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aH1cIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG5cbiAgICAgICAgPGEgKGNsaWNrKT1cImNsb3NlRmlsdGVycygpXCIgY2xhc3M9XCJidG4tY2xvc2UtYWR2YW5jZWQtc2VhcmNoXCI+XG5cbiAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG5cbiAgICAgICAgPC9hPlxuXG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1hZHZhbmNlZC1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9tYXQtY2FyZD5cblxuICA8L2Rpdj5cblxuICA8ZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWVcbiAgICAqbmdJZj1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGhcIlxuICAgIFtmaWx0ZXJHcm91cHNdPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnNcIlxuICAgIChyZW1vdmUpPVwicmVtb3ZlRGVjRmlsdGVyR3JvdXAoJGV2ZW50KVwiXG4gICAgKGVkaXQpPVwiZWRpdERlY0ZpbHRlckdyb3VwKCRldmVudClcIj48L2RlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lPlxuXG4gIDxkZWMtbGlzdC10YWJzLWZpbHRlciBbZmlsdGVyc109XCJmaWx0ZXJzXCI+PC9kZWMtbGlzdC10YWJzLWZpbHRlcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5saXN0LWZpbHRlci13cmFwcGVye21hcmdpbjowIDAgMTZweDtwb3NpdGlvbjpyZWxhdGl2ZX0ubGlzdC1maWx0ZXItd3JhcHBlciAubWF0LWljb257Y29sb3I6Izk5OX0ubGlzdC1maWx0ZXItd3JhcHBlciAuc2VhcmNoLXRlcm0taW5wdXR7d2lkdGg6NTAwcHg7bWFyZ2luLXJpZ2h0OjhweH0ubGlzdC1maWx0ZXItd3JhcHBlciAuaW5saW5lLWZvcm17ZGlzcGxheTppbmxpbmUtYmxvY2t9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjc0cHg7ei1pbmRleDoxO3JpZ2h0OjMwcHg7d2lkdGg6NTUycHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXIucmVtb3ZlLWJ1dHRvbi1lbmFibGVke3JpZ2h0OjYycHg7d2lkdGg6NTUxcHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXIgLmJ0bi1jbG9zZS1hZHZhbmNlZC1zZWFyY2h7Y3Vyc29yOnBvaW50ZXJ9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXJ7dHJhbnNpdGlvbjphbGwgLjNzIGVhc2U7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjQwcHg7aGVpZ2h0OjUwcHh9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIuYWN0aXZle2JhY2tncm91bmQ6I2Y4ZjhmYTtjb2xvcjojOTk5O3dpZHRoOjYwMHB4fS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyLmFjdGl2ZSAuYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoe2Rpc3BsYXk6aW5saW5lfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2h7d2lkdGg6MTAwJX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoIGlucHV0e2ZvbnQ6aW5oZXJpdDtiYWNrZ3JvdW5kOjAgMDtjb2xvcjpjdXJyZW50Q29sb3I7Ym9yZGVyOm5vbmU7b3V0bGluZTowO3BhZGRpbmc6MDt3aWR0aDoxMDAlO3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoe2Rpc3BsYXk6bm9uZX0uc2VhcmNoLWNvbnRhaW5lciAuYnRuLWNsZWFyLXNlYXJjaHtwYWRkaW5nLXJpZ2h0OjE1cHg7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6Izk5OTt3aWR0aDo5MHB4fS5zZWFyY2gtY29udGFpbmVyIC5idG4taW5mbywuc2VhcmNoLWNvbnRhaW5lciAuYnRuLXRvb2dsZS1zZWFyY2h7Zm9udC1zaXplOjIxcHg7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OjIxcHg7Y29sb3I6Izk5OX0uc2VhcmNoLWNvbnRhaW5lciAuYmFyLWh7Ym9yZGVyLXJpZ2h0OjJweCBzb2xpZCAjZDBkMGQwO2hlaWdodDoyMXB4O21hcmdpbjphdXRvIDA7ZGlzcGxheTppbmxpbmUtYmxvY2t9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBjb3VudDogbnVtYmVyO1xuICBzaG93U2VhcmNoSW5wdXQ6IGJvb2xlYW47XG4gIHNob3dBZHZhbmNlZEZpbHRlcjogYm9vbGVhbjtcbiAgZmlsdGVyRm9ybTogYW55ID0ge1xuICAgIHNlYXJjaDogdW5kZWZpbmVkXG4gIH07XG4gIGZpbHRlckdyb3VwczogRmlsdGVyR3JvdXBzO1xuICBmaWx0ZXJHcm91cHNXaXRob3V0VGFiczogRmlsdGVyR3JvdXBzO1xuICBjdXJyZW50U3RhdHVzRmlsdGVyZWQ6IHN0cmluZztcbiAgdGFic0ZpbHRlcjogYW55O1xuICBlZGl0aW9uR3JvdXBJbmRleDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIGlzSXRGaXJzdExvYWQgPSB0cnVlO1xuICBmaWx0ZXJNb2RlOiAndGFicycgfCAnY29sbGFwc2UnO1xuICBjaGlsZHJlbkZpbHRlcnM7XG5cbiAgLypcbiAgICogY2xpY2thYmxlQ29udGFpbmVyQ2xhc3NcbiAgICpcbiAgICogV2hlcmUgdGhlIGNsaWNrIHdhdGNoZXIgc2hvdWxkIGJlIGxpc3RlbmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBjbGlja2FibGVDb250YWluZXJDbGFzcyA9ICdsaXN0LWZpbHRlci13cmFwcGVyJztcblxuICBwcml2YXRlIGlubmVyRGVjRmlsdGVyR3JvdXBzOiBhbnlbXTtcblxuICBwcml2YXRlIGN1cnJlbnRCYXNlNjRGaWx0ZXI6IHN0cmluZztcblxuICBwcml2YXRlIHRhYnNGaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIHdhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBfZmlsdGVyczogRGVjTGlzdEZpbHRlcltdID0gW107XG5cbiAgQElucHV0KCkgcHJlU2VhcmNoOiBEZWNMaXN0UHJlU2VhcmNoO1xuXG4gIEBJbnB1dCgpIHNob3dJbmZvQnV0dG9uO1xuXG4gIEBJbnB1dCgpIGhhc1BlcnNpc3RlbmNlID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgZmlsdGVycyh2OiBEZWNMaXN0RmlsdGVyW10pIHtcblxuICAgIGlmICh0aGlzLl9maWx0ZXJzICE9PSB2KSB7XG5cbiAgICAgIHRoaXMuX2ZpbHRlcnMgPSB2Lm1hcChmaWx0ZXIgPT4gbmV3IERlY0xpc3RGaWx0ZXIoZmlsdGVyKSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBmaWx0ZXJzKCk6IERlY0xpc3RGaWx0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcnM7XG4gIH1cblxuXG4gIEBPdXRwdXQoKSBzZWFyY2g6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXRTZWFyY2gnKSBpbnB1dFNlYXJjaDtcblxuICBAVmlld0NoaWxkKERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50KSB0YWJzRmlsdGVyQ29tcG9uZW50OiBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudDtcblxuICBAQ29udGVudENoaWxkKERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCkgYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQ6IERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBsYXRmb3JtTG9jYXRpb246IFBsYXRmb3JtTG9jYXRpb24sXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2F0Y2hUYWJzRmlsdGVyKCk7XG4gICAgdGhpcy53YXRjaENsaWNrKCk7XG4gICAgdGhpcy53YXRjaFVybEZpbHRlcigpO1xuICAgIHRoaXMuY29uZmlndXJlQWR2YW5jZWRGaWx0ZXIoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nQ2xpY2soKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYnNGaWx0ZXIoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1VybEZpbHRlcigpO1xuICB9XG5cbiAgdG9nZ2xlU2VhcmNoSW5wdXQoKSB7XG4gICAgdGhpcy5zaG93U2VhcmNoSW5wdXQgPSAhdGhpcy5zaG93U2VhcmNoSW5wdXQ7XG4gICAgaWYgKCF0aGlzLnNob3dTZWFyY2hJbnB1dCkge1xuICAgICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXRTZWFyY2gubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfSwgMTgwKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVBZHZhbmNlZEZpbHRlcigkZXZlbnQpIHtcblxuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gIXRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyO1xuXG4gIH1cblxuICBvblNlYXJjaCA9IChhcHBlbmRDdXJyZW50Rm9ybSA9IHRydWUpID0+IHtcblxuICAgIGlmICh0aGlzLmZpbHRlckZvcm0gJiYgYXBwZW5kQ3VycmVudEZvcm0pIHtcblxuICAgICAgY29uc3QgbmV3RGVjRmlsdGVyR3JvdXAgPSB7XG5cbiAgICAgICAgZmlsdGVyczogW11cblxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXModGhpcy5maWx0ZXJGb3JtKS5mb3JFYWNoKGtleSA9PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyRm9ybVtrZXldKSB7XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IHByb3BlcnR5OiBrZXksIHZhbHVlOiB0aGlzLmZpbHRlckZvcm1ba2V5XSB9O1xuXG4gICAgICAgICAgbmV3RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKGZpbHRlcik7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAobmV3RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmVkaXRpb25Hcm91cEluZGV4ID49IDApIHtcblxuICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwc1t0aGlzLmVkaXRpb25Hcm91cEluZGV4XSA9IG5ld0RlY0ZpbHRlckdyb3VwO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5wdXNoKG5ld0RlY0ZpbHRlckdyb3VwKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IFtuZXdEZWNGaWx0ZXJHcm91cF07XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLnJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHRydWUpO1xuXG4gIH1cblxuICBvbkNsZWFyKCkge1xuXG4gICAgdGhpcy5jbG9zZUZpbHRlcnMoKTtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmNsZWFyRmlsdGVyRm9ybSgpO1xuXG4gICAgdGhpcy5vblNlYXJjaCgpO1xuXG4gIH1cblxuICByZW1vdmVEZWNGaWx0ZXJHcm91cChncm91cEluZGV4KSB7XG5cbiAgICB0aGlzLmZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzLmZpbHRlcigoZ3JvdXAsIGluZGV4KSA9PiBpbmRleCAhPT0gZ3JvdXBJbmRleCk7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5maWx0ZXIoKGdyb3VwLCBpbmRleCkgPT4gaW5kZXggIT09IGdyb3VwSW5kZXgpO1xuXG4gICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMuZmlsdGVyKChncm91cCwgaW5kZXgpID0+IGluZGV4ICE9PSBncm91cEluZGV4KTtcblxuICAgIHRoaXMub25TZWFyY2godHJ1ZSk7XG5cbiAgfVxuXG4gIGVkaXREZWNGaWx0ZXJHcm91cChncm91cEluZGV4KSB7XG5cbiAgICB0aGlzLmVkaXRpb25Hcm91cEluZGV4ID0gZ3JvdXBJbmRleDtcblxuICAgIGNvbnN0IHRvRWRpdERlY0ZpbHRlckdyb3VwID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFic1tncm91cEluZGV4XTtcblxuICAgIGlmICh0b0VkaXREZWNGaWx0ZXJHcm91cCAmJiB0b0VkaXREZWNGaWx0ZXJHcm91cC5maWx0ZXJzLmxlbmd0aCA+IDApIHtcblxuICAgICAgdGhpcy5yZWxvYWRGb3JtV2l0aEdpdmVuRGVjRmlsdGVyR3JvdXBlKHRvRWRpdERlY0ZpbHRlckdyb3VwLmZpbHRlcnMpO1xuXG4gICAgfVxuXG4gIH1cblxuICByZWxvYWRDb3VudFJlcG9ydCA9IChwYXlsb2FkKSA9PiB7XG5cbiAgICBpZiAodGhpcy50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIHRoaXMudGFic0ZpbHRlckNvbXBvbmVudC5yZWxvYWRDb3VudFJlcG9ydChwYXlsb2FkKTtcblxuICAgIH1cblxuICB9XG5cbiAgY2xlYXJGaWx0ZXJGb3JtID0gKCkgPT4ge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyRm9ybSkge1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckZvcm0pLmZvckVhY2goa2V5ID0+IHtcblxuICAgICAgICB0aGlzLmZpbHRlckZvcm1ba2V5XSA9IHVuZGVmaW5lZDtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgb25DbGlja0luZm8oKSB7XG4gICAgY29uc29sZS5sb2coJ29uIGNsaWNrIGluZm8uIE5vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgLypcbiAgICogYXBwZW5kVG9DdXJyZW50RmlsdGVyc1xuICAgKlxuICAgKiBBcHBlbmQgYSBmaWx0ZXIgdG8gdGhlIGN1cnJlbnQgZmlsdGVyIGdyb3Vwc1xuICAgKi9cbiAgYXBwZW5kVG9DdXJyZW50RGVjRmlsdGVyR3JvdXBzKHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSkge1xuXG4gICAgY29uc3QgZmlsdGVyID0ge1xuICAgICAgJ3Byb3BlcnR5JzogcHJvcGVydHlOYW1lLFxuICAgICAgJ3ZhbHVlJzogcHJvcGVydHlWYWx1ZSxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpIHtcblxuICAgICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5mb3JFYWNoKChmaWx0ZXJHcm91cCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlckV4aXN0c0luVGhpc0dyb3VwID0gZmlsdGVyR3JvdXAuZmlsdGVycy5maW5kKGZpbHRlckdyb3VwRmlsdGVyID0+IGZpbHRlckdyb3VwRmlsdGVyLnByb3BlcnR5ID09PSBmaWx0ZXIucHJvcGVydHkpO1xuXG4gICAgICAgIGlmICghZmlsdGVyRXhpc3RzSW5UaGlzR3JvdXApIHtcblxuICAgICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMucHVzaChmaWx0ZXIpO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gW3sgZmlsdGVyczogW2ZpbHRlcl0gfV07XG5cbiAgICB9XG5cbiAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicztcblxuICAgIHRoaXMucmVhY2FsY3VsYXRlQW5kRW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICB9XG5cbiAgY2xvc2VGaWx0ZXJzKCkge1xuXG4gICAgdGhpcy5lZGl0aW9uR3JvdXBJbmRleCA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gZmFsc2U7XG5cbiAgICB0aGlzLnNob3dTZWFyY2hJbnB1dCA9IGZhbHNlO1xuXG4gIH1cblxuICBwcml2YXRlIHJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQgPSBmYWxzZSkge1xuXG4gICAgdGhpcy5lbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcyhyZWNvdW50KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNQZXJzaXN0ZW5jZSkge1xuXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5KClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2VGaWx0ZXJzKCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICAgICAgICB9KTtcblxuXG4gICAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZWxvYWRGb3JtV2l0aEdpdmVuRGVjRmlsdGVyR3JvdXBlKGZpbHRlcnMpIHtcblxuICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICBmaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcblxuICAgICAgaWYgKGZpbHRlci52YWx1ZSkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRm9ybVtmaWx0ZXIucHJvcGVydHldID0gZmlsdGVyLnZhbHVlO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHRoaXMub3BlbkZpbHRlcnMoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuRmlsdGVycygpIHtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gdHJ1ZTtcblxuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gdHJ1ZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVBZHZhbmNlZEZpbHRlcigpIHtcblxuICAgIGlmICh0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQuZm9ybSA9IHRoaXMuZmlsdGVyRm9ybTtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5vblNlYXJjaCA9IHRoaXMub25TZWFyY2g7XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQub25DbGVhciA9IHRoaXMuY2xlYXJGaWx0ZXJGb3JtO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VhcmNoLnN1YnNjcmliZShmaWx0ZXJFdmVudCA9PiB7XG5cbiAgICAgICAgaWYgKGZpbHRlckV2ZW50LmNoaWxkcmVuKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSAnY29sbGFwc2UnO1xuXG4gICAgICAgICAgdGhpcy5jaGlsZHJlbkZpbHRlcnMgPSBmaWx0ZXJFdmVudC5jaGlsZHJlbjtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gJ3RhYnMnO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMudGFic0ZpbHRlciA9IGZpbHRlckV2ZW50LmZpbHRlcnM7XG5cbiAgICAgICAgdGhpcy5lbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwcyh0aGlzLmlzSXRGaXJzdExvYWQgfHwgZmlsdGVyRXZlbnQucmVjb3VudCk7XG5cbiAgICAgICAgdGhpcy5pc0l0Rmlyc3RMb2FkID0gZmFsc2U7XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpIHtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXIgPSBbXTtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicyA9IFtdO1xuXG4gICAgaWYgKHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgJiYgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5sZW5ndGgpIHtcblxuICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5mb3JFYWNoKChmaWx0ZXJHcm91cDogeyBmaWx0ZXJzOiBhbnlbXSB9KSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5ID0ge1xuICAgICAgICAgIGZpbHRlcnM6IGZpbHRlckdyb3VwLmZpbHRlcnMuc2xpY2UoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcbiAgICAgICAgICBmaWx0ZXJHcm91cENvcHkuZmlsdGVycy5wdXNoKC4uLnRoaXMudGFic0ZpbHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RmlsdGVyLnB1c2goZmlsdGVyR3JvdXBDb3B5KTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJHcm91cC5maWx0ZXJzLnNsaWNlKClcbiAgICAgICAgfTtcblxuICAgICAgICBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMucHVzaChmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcblxuICAgICAgY3VycmVudEZpbHRlci5wdXNoKHsgZmlsdGVyczogdGhpcy50YWJzRmlsdGVyIH0pO1xuXG4gICAgfVxuXG4gICAgdGhpcy5maWx0ZXJHcm91cHMgPSBjdXJyZW50RmlsdGVyLmxlbmd0aCA/IGN1cnJlbnRGaWx0ZXIgOiB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gY3VycmVudEZpbHRlcldpdGhvdXRUYWJzLmxlbmd0aCA/IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qXG4gICAqIGVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQgPSBmYWxzZSkge1xuXG4gICAgbGV0IGZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzID8gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlckdyb3VwcykpIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICB0aGlzLm1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gICAgICBpZiAodGhpcy5wcmVTZWFyY2gpIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMgPSB0aGlzLnByZVNlYXJjaChmaWx0ZXJHcm91cHMpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VhcmNoLmVtaXQoe1xuICAgICAgICBmaWx0ZXJHcm91cHM6IGZpbHRlckdyb3VwcyxcbiAgICAgICAgcmVjb3VudDogcmVjb3VudCxcbiAgICAgICAgZmlsdGVyTW9kZTogdGhpcy5maWx0ZXJNb2RlLFxuICAgICAgICBjaGlsZHJlbjogdGhpcy5jaGlsZHJlbkZpbHRlcnMsXG4gICAgICB9KTtcblxuICAgICAgcmVzKCk7XG5cbiAgICB9KTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBhY3RCeUNsaWNrUG9zaXRpb25cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZGV0ZWN0XG4gICAqL1xuICBwcml2YXRlIGFjdEJ5Q2xpY2tQb3NpdGlvbiA9ICgkZXZlbnQpID0+IHtcblxuICAgIGlmIChldmVudCAmJiBldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGNsaWNrZWRJbnNpZGVGaWx0ZXIgPSAkZXZlbnRbJ3BhdGgnXS5maW5kKHBhdGggPT4ge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAke3BhdGhbJ2NsYXNzTmFtZSddfWAgfHwgJyc7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlV3JhcHBlciA9IGNsYXNzTmFtZS5pbmRleE9mKHRoaXMuY2xpY2thYmxlQ29udGFpbmVyQ2xhc3MpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3B0aW9uID0gY2xhc3NOYW1lLmluZGV4T2YoJ21hdC1vcHRpb24nKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZURhdGVQaWNrZXIgPSBjbGFzc05hbWUuaW5kZXhPZignbWF0LWRhdGVwaWNrZXItY29udGVudCcpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3ZlcmxheUNvbnRhaW5lciA9IGNsYXNzTmFtZS5pbmRleE9mKCdjZGstb3ZlcmxheS1jb250YWluZXInKSA+PSAwO1xuXG4gICAgICAgIHJldHVybiBpbnNpZGVXcmFwcGVyIHx8IGluc2lkZU9wdGlvbiB8fCBpbnNpZGVEYXRlUGlja2VyIHx8IGluc2lkZU92ZXJsYXlDb250YWluZXI7XG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWNsaWNrZWRJbnNpZGVGaWx0ZXIpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaENsaWNrKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5hY3RCeUNsaWNrUG9zaXRpb24sIHRydWUpO1xuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nQ2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nQ2xpY2soKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmFjdEJ5Q2xpY2tQb3NpdGlvbiwgdHJ1ZSk7XG4gIH1cblxuICAvKlxuICAgKiBjb21wb25lbnRUYWJOYW1lXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGNvbXBvbmVudEZpbHRlck5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICctZmlsdGVyJztcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVXJsRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVXJsRmlsdGVyKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc1BlcnNpc3RlbmNlKSB7XG5cbiAgICAgIHJldHVybjtcblxuICAgIH1cblxuICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgICAuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcblxuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cbiAgICAgICAgICBpZiAodGhpcy5uYW1lKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGJhc2U2NEZpbHRlciA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudEZpbHRlck5hbWUoKV07XG5cbiAgICAgICAgICAgIGlmIChiYXNlNjRGaWx0ZXIpIHtcblxuICAgICAgICAgICAgICBpZiAoYmFzZTY0RmlsdGVyICE9PSB0aGlzLmN1cnJlbnRCYXNlNjRGaWx0ZXIpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuZ2V0SnNvbkZyb21CYXNlNjRGaWx0ZXIoYmFzZTY0RmlsdGVyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSBmaWx0ZXI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlYXJjaCgpO1xuXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSwgMTApO1xuXG4gICAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1VybEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbikge1xuXG4gICAgICB0aGlzLndhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5KCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICBjb25zdCBmaWx0ZXJCYXNlNjQgPSB0aGlzLmdldEJhc2U2NEZpbHRlckZyb21EZWNGaWx0ZXJHcm91cHMoKTtcblxuICAgICAgdGhpcy5zZXRGaWx0ZXJJblVybFF1ZXJ5KGZpbHRlckJhc2U2NCkudGhlbihyZXMsIHJlaik7XG5cbiAgICB9KTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBzZXRGaWx0ZXJJblVybFF1ZXJ5XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldEZpbHRlckluVXJsUXVlcnkoZmlsdGVyKSB7XG5cbiAgICB0aGlzLmN1cnJlbnRCYXNlNjRGaWx0ZXIgPSBmaWx0ZXI7XG5cbiAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG5cbiAgICBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudEZpbHRlck5hbWUoKV0gPSBmaWx0ZXI7XG5cbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZ2V0QmFzZTY0RmlsdGVyRnJvbURlY0ZpbHRlckdyb3VwcygpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyAmJiB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgYmFzZTY0RmlsdGVyID0gYnRvYShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicykpKTtcbiAgICAgIGNvbnN0IGJhc2VGaWx0ZXJXaXRob3V0RXF1YWxTaWduID0gYmFzZTY0RmlsdGVyLnJlcGxhY2UoLz0vZywgJycpO1xuICAgICAgcmV0dXJuIGJhc2VGaWx0ZXJXaXRob3V0RXF1YWxTaWduOyAvLyByZW1vdmVzID0gYmVmb3IgZXNldCB0aGUgZmlsdGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVXJsRmlsdGVyXG4gICAqXG4gICAqIFNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MDIwNDA5L2lzLWl0LW9rLXRvLXJlbW92ZS10aGUtZXF1YWwtc2lnbnMtZnJvbS1hLWJhc2U2NC1zdHJpbmdcbiAgICovXG4gIHByaXZhdGUgZ2V0SnNvbkZyb21CYXNlNjRGaWx0ZXIoYmFzZTY0RmlsdGVyKSB7XG4gICAgY29uc3QgYmFzZTY0UGFkTGVuID0gKGJhc2U2NEZpbHRlci5sZW5ndGggJSA0KSA+IDAgPyA0IC0gKGJhc2U2NEZpbHRlci5sZW5ndGggJSA0KSA6IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhc2U2NFBhZExlbjsgaSsrKSB7XG4gICAgICBiYXNlNjRGaWx0ZXIgKz0gJz0nOyAvLyBhZGQgPSBiZWZvcmUgcmVhZGQgdGhlIGZpbHRlclxuICAgIH1cblxuICAgIGxldCBmaWx0ZXJPYmplY3Q7XG5cbiAgICB0cnkge1xuICAgICAgZmlsdGVyT2JqZWN0ID0gSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQoYXRvYihiYXNlNjRGaWx0ZXIpKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdMaXN0RmlsdGVyQ29tcG9uZW50OjogRmFpbGVkIHRvIHBhcnNlIHRoZSBmaWx0ZXIuIFRoZSB2YWx1ZSBpcyBub3QgdmFsaWQgYW5kIHRoZSBmaWx0ZXIgd2FzIHJlbW92ZWQuIEZpbHRlciB2YWx1ZTogJztcbiAgICAgIGNvbnNvbGUuZXJyb3IobXNnLCBiYXNlNjRGaWx0ZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBiYXNlNjRGaWx0ZXIgPyBmaWx0ZXJPYmplY3QgOiB1bmRlZmluZWQ7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZScsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImZpbHRlckdyb3Vwcz8ubGVuZ3RoXCIgY2xhc3M9XCJkZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyXCI+XG5cbiAgPG1hdC1jaGlwLWxpc3Q+XG5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBncm91cCBvZiBmaWx0ZXJHcm91cHM7IGxldCBncm91cEluZGV4ID0gaW5kZXg7XCI+XG4gICAgICA8bWF0LWNoaXAgKm5nSWY9XCJncm91cD8uZmlsdGVyc1wiIChjbGljayk9XCJlZGl0RGVjRmlsdGVyR3JvdXAoJGV2ZW50LCBncm91cEluZGV4KVwiPlxuXG4gICAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgZ3JvdXA/LmZpbHRlcnM7IGxldCBsYXN0RmlsdGVyID0gbGFzdDtcIiBjbGFzcz1cIml0ZW0td3JhcHBlclwiPlxuXG4gICAgICAgICAgPHNwYW4gW25nU3dpdGNoXT1cImZpbHRlci5wcm9wZXJ0eSAhPT0gJ3NlYXJjaCdcIj5cblxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cInRydWVcIj57eyAnbGFiZWwuJyArIGZpbHRlci5wcm9wZXJ0eSB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cblxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoRGVmYXVsdD57eyAnbGFiZWwuS2V5d29yZCcgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG5cbiAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICA8c3Bhbj46Jm5ic3A7PC9zcGFuPlxuXG4gICAgICAgICAgPHNwYW4gW25nU3dpdGNoXT1cImdldFZhbHVldHlwZShmaWx0ZXIudmFsdWUpXCIgY2xhc3M9XCJ2YWx1ZS13cmFwcGVyXCI+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIj57eyBmaWx0ZXIudmFsdWUgfCBkYXRlIH19PC9zcGFuPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hEZWZhdWx0Pnt7IGZpbHRlci52YWx1ZSB9fTwvc3Bhbj5cblxuICAgICAgICAgIDwvc3BhbiA+XG5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFsYXN0RmlsdGVyXCI+LDwvc3Bhbj5cblxuICAgICAgICAgICZuYnNwO1xuXG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgKGNsaWNrKT1cInJlbW92ZURlY0ZpbHRlckdyb3VwKCRldmVudCwgZ3JvdXBJbmRleClcIj5yZW1vdmVfY2lyY2xlPC9pPlxuXG4gICAgICA8L21hdC1jaGlwPlxuXG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgPC9tYXQtY2hpcC1saXN0PlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubWF0LXRhYi1ib2R5LWNvbnRlbnR7cGFkZGluZzoxNnB4IDB9Lm1hdC1mb3JtLWZpZWxkLXByZWZpeHttYXJnaW4tcmlnaHQ6OHB4IWltcG9ydGFudH0ubWF0LWZvcm0tZmllbGQtc3VmZml4e21hcmdpbi1sZWZ0OjhweCFpbXBvcnRhbnR9Lm1hdC1lbGV2YXRpb24tejB7Ym94LXNoYWRvdzowIDAgMCAwIHJnYmEoMCwwLDAsLjIpLDAgMCAwIDAgcmdiYSgwLDAsMCwuMTQpLDAgMCAwIDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxe2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16Mntib3gtc2hhZG93OjAgM3B4IDFweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA1cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejN7Ym94LXNoYWRvdzowIDNweCAzcHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDNweCA0cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggOHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo0e2JveC1zaGFkb3c6MCAycHggNHB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA0cHggNXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDEwcHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejV7Ym94LXNoYWRvdzowIDNweCA1cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDVweCA4cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMTRweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16Nntib3gtc2hhZG93OjAgM3B4IDVweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNnB4IDEwcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMThweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16N3tib3gtc2hhZG93OjAgNHB4IDVweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgN3B4IDEwcHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDJweCAxNnB4IDFweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejh7Ym94LXNoYWRvdzowIDVweCA1cHggLTNweCByZ2JhKDAsMCwwLC4yKSwwIDhweCAxMHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAzcHggMTRweCAycHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo5e2JveC1zaGFkb3c6MCA1cHggNnB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCA5cHggMTJweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgM3B4IDE2cHggMnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTB7Ym94LXNoYWRvdzowIDZweCA2cHggLTNweCByZ2JhKDAsMCwwLC4yKSwwIDEwcHggMTRweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgNHB4IDE4cHggM3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTF7Ym94LXNoYWRvdzowIDZweCA3cHggLTRweCByZ2JhKDAsMCwwLC4yKSwwIDExcHggMTVweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgNHB4IDIwcHggM3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTJ7Ym94LXNoYWRvdzowIDdweCA4cHggLTRweCByZ2JhKDAsMCwwLC4yKSwwIDEycHggMTdweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNXB4IDIycHggNHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTN7Ym94LXNoYWRvdzowIDdweCA4cHggLTRweCByZ2JhKDAsMCwwLC4yKSwwIDEzcHggMTlweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNXB4IDI0cHggNHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTR7Ym94LXNoYWRvdzowIDdweCA5cHggLTRweCByZ2JhKDAsMCwwLC4yKSwwIDE0cHggMjFweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNXB4IDI2cHggNHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTV7Ym94LXNoYWRvdzowIDhweCA5cHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE1cHggMjJweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDI4cHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTZ7Ym94LXNoYWRvdzowIDhweCAxMHB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxNnB4IDI0cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAzMHB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE3e2JveC1zaGFkb3c6MCA4cHggMTFweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTdweCAyNnB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMzJweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxOHtib3gtc2hhZG93OjAgOXB4IDExcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE4cHggMjhweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgN3B4IDM0cHggNnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTl7Ym94LXNoYWRvdzowIDlweCAxMnB4IC02cHggcmdiYSgwLDAsMCwuMiksMCAxOXB4IDI5cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDdweCAzNnB4IDZweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIwe2JveC1zaGFkb3c6MCAxMHB4IDEzcHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIwcHggMzFweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDM4cHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjF7Ym94LXNoYWRvdzowIDEwcHggMTNweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjFweCAzM3B4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggNDBweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMntib3gtc2hhZG93OjAgMTBweCAxNHB4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMnB4IDM1cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCA0MnB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIze2JveC1zaGFkb3c6MCAxMXB4IDE0cHggLTdweCByZ2JhKDAsMCwwLC4yKSwwIDIzcHggMzZweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOXB4IDQ0cHggOHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjR7Ym94LXNoYWRvdzowIDExcHggMTVweCAtN3B4IHJnYmEoMCwwLDAsLjIpLDAgMjRweCAzOHB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA5cHggNDZweCA4cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtYmFkZ2UtY29udGVudHtmb250LXdlaWdodDo2MDA7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYmFkZ2Utc21hbGwgLm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtc2l6ZTo2cHh9Lm1hdC1iYWRnZS1sYXJnZSAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjI0cHh9Lm1hdC1oMSwubWF0LWhlYWRsaW5lLC5tYXQtdHlwb2dyYXBoeSBoMXtmb250OjQwMCAyNHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWgyLC5tYXQtdGl0bGUsLm1hdC10eXBvZ3JhcGh5IGgye2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDMsLm1hdC1zdWJoZWFkaW5nLTIsLm1hdC10eXBvZ3JhcGh5IGgze2ZvbnQ6NDAwIDE2cHgvMjhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDQsLm1hdC1zdWJoZWFkaW5nLTEsLm1hdC10eXBvZ3JhcGh5IGg0e2ZvbnQ6NDAwIDE1cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDUsLm1hdC10eXBvZ3JhcGh5IGg1e2ZvbnQ6NDAwIDExLjYycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxMnB4fS5tYXQtaDYsLm1hdC10eXBvZ3JhcGh5IGg2e2ZvbnQ6NDAwIDkuMzhweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1ib2R5LTIsLm1hdC1ib2R5LXN0cm9uZ3tmb250OjUwMCAxNHB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSwubWF0LWJvZHktMSwubWF0LXR5cG9ncmFwaHl7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJvZHkgcCwubWF0LWJvZHktMSBwLC5tYXQtdHlwb2dyYXBoeSBwe21hcmdpbjowIDAgMTJweH0ubWF0LWNhcHRpb24sLm1hdC1zbWFsbHtmb250OjQwMCAxMnB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZGlzcGxheS00LC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktNHtmb250OjMwMCAxMTJweC8xMTJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA1NnB4O2xldHRlci1zcGFjaW5nOi0uMDVlbX0ubWF0LWRpc3BsYXktMywubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTN7Zm9udDo0MDAgNTZweC81NnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHg7bGV0dGVyLXNwYWNpbmc6LS4wMmVtfS5tYXQtZGlzcGxheS0yLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktMntmb250OjQwMCA0NXB4LzQ4cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAwNWVtfS5tYXQtZGlzcGxheS0xLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktMXtmb250OjQwMCAzNHB4LzQwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweH0ubWF0LWJvdHRvbS1zaGVldC1jb250YWluZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWJ1dHRvbiwubWF0LWZhYiwubWF0LWZsYXQtYnV0dG9uLC5tYXQtaWNvbi1idXR0b24sLm1hdC1taW5pLWZhYiwubWF0LXJhaXNlZC1idXR0b24sLm1hdC1zdHJva2VkLWJ1dHRvbntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtYnV0dG9uLXRvZ2dsZSwubWF0LWNhcmR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2FyZC10aXRsZXtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1jYXJkLWNvbnRlbnQsLm1hdC1jYXJkLWhlYWRlciAubWF0LWNhcmQtdGl0bGUsLm1hdC1jYXJkLXN1YnRpdGxle2ZvbnQtc2l6ZToxNHB4fS5tYXQtY2hlY2tib3h7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2hlY2tib3gtbGF5b3V0IC5tYXQtY2hlY2tib3gtbGFiZWx7bGluZS1oZWlnaHQ6MjRweH0ubWF0LWNoaXB7Zm9udC1zaXplOjEzcHg7bGluZS1oZWlnaHQ6MThweH0ubWF0LWNoaXAgLm1hdC1jaGlwLXJlbW92ZS5tYXQtaWNvbiwubWF0LWNoaXAgLm1hdC1jaGlwLXRyYWlsaW5nLWljb24ubWF0LWljb257Zm9udC1zaXplOjE4cHh9Lm1hdC10YWJsZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1oZWFkZXItY2VsbHtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jZWxsLC5tYXQtZm9vdGVyLWNlbGx7Zm9udC1zaXplOjE0cHh9Lm1hdC1jYWxlbmRhcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYWxlbmRhci1ib2R5e2ZvbnQtc2l6ZToxM3B4fS5tYXQtY2FsZW5kYXItYm9keS1sYWJlbCwubWF0LWNhbGVuZGFyLXBlcmlvZC1idXR0b257Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyIHRoe2ZvbnQtc2l6ZToxMXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWRpYWxvZy10aXRsZXtmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE1cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtZXhwYW5zaW9uLXBhbmVsLWNvbnRlbnR7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWZvcm0tZmllbGR7d2lkdGg6MTAwJTtmb250LXNpemU6aW5oZXJpdDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MS4xMjU7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZm9ybS1maWVsZC13cmFwcGVye3BhZGRpbmctYm90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtcHJlZml4IC5tYXQtaWNvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbntmb250LXNpemU6MTUwJTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtcHJlZml4IC5tYXQtaWNvbi1idXR0b24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9ue2hlaWdodDoxLjVlbTt3aWR0aDoxLjVlbX0ubWF0LWZvcm0tZmllbGQtcHJlZml4IC5tYXQtaWNvbi1idXR0b24gLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb257aGVpZ2h0OjEuMTI1ZW07bGluZS1oZWlnaHQ6MS4xMjV9Lm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjVlbSAwO2JvcmRlci10b3A6Ljg0Mzc1ZW0gc29saWQgdHJhbnNwYXJlbnR9Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXJ7dG9wOi0uODQzNzVlbTtwYWRkaW5nLXRvcDouODQzNzVlbX0ubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5le2JvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye2ZvbnQtc2l6ZTo3NSU7bWFyZ2luLXRvcDouNjY2NjdlbTt0b3A6Y2FsYygxMDAlIC0gMS43OTE2N2VtKX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4yNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNDM3NWVtIDB9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMXB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2w6LXdlYmtpdC1hdXRvZmlsbCsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMXB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMXB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAycHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAycHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyM2VtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNSV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4yODEyNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5le2JvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlcnttYXJnaW4tdG9wOi41NDE2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjY2NjY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjI1ZW0gMCAuNzVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4wOTM3NWVtO21hcmdpbi10b3A6LS41ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOjFlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLW91dGxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS44NDM3NWVtO21hcmdpbi10b3A6LS4yNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZ3JpZC10aWxlLWZvb3RlciwubWF0LWdyaWQtdGlsZS1oZWFkZXJ7Zm9udC1zaXplOjE0cHh9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyIC5tYXQtbGluZSwubWF0LWdyaWQtdGlsZS1oZWFkZXIgLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjEycHh9aW5wdXQubWF0LWlucHV0LWVsZW1lbnR7bWFyZ2luLXRvcDotLjA2MjVlbX0ubWF0LW1lbnUtaXRlbXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtcGFnaW5hdG9yLC5tYXQtcGFnaW5hdG9yLXBhZ2Utc2l6ZSAubWF0LXNlbGVjdC10cmlnZ2Vye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweH0ubWF0LXJhZGlvLWJ1dHRvbiwubWF0LXNlbGVjdHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zZWxlY3QtdHJpZ2dlcntoZWlnaHQ6MS4xMjVlbX0ubWF0LXNsaWRlLXRvZ2dsZS1jb250ZW50e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zbGlkZXItdGh1bWItbGFiZWwtdGV4dHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtc3RlcHBlci1ob3Jpem9udGFsLC5tYXQtc3RlcHBlci12ZXJ0aWNhbHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zdGVwLWxhYmVse2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXN0ZXAtbGFiZWwtc2VsZWN0ZWR7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdGFiLWdyb3Vwe2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXRhYi1sYWJlbCwubWF0LXRhYi1saW5re2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC10b29sYmFyLC5tYXQtdG9vbGJhciBoMSwubWF0LXRvb2xiYXIgaDIsLm1hdC10b29sYmFyIGgzLC5tYXQtdG9vbGJhciBoNCwubWF0LXRvb2xiYXIgaDUsLm1hdC10b29sYmFyIGg2e2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjB9Lm1hdC10b29sdGlwe2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTBweDtwYWRkaW5nLXRvcDo2cHg7cGFkZGluZy1ib3R0b206NnB4fS5tYXQtdG9vbHRpcC1oYW5kc2V0e2ZvbnQtc2l6ZToxNHB4O3BhZGRpbmctdG9wOjlweDtwYWRkaW5nLWJvdHRvbTo5cHh9Lm1hdC1saXN0LWl0ZW0sLm1hdC1saXN0LW9wdGlvbntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LWl0ZW0sLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbXtmb250LXNpemU6MTZweH0ubWF0LWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxNHB4fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LW9wdGlvbiwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb257Zm9udC1zaXplOjE2cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QgLm1hdC1zdWJoZWFkZXIsLm1hdC1uYXYtbGlzdCAubWF0LXN1YmhlYWRlciwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtc3ViaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbXtmb250LXNpemU6MTJweH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24sLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24sLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb257Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTJweH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtc3ViaGVhZGVyLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtc3ViaGVhZGVyLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtc3ViaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4fS5tYXQtb3B0Z3JvdXAtbGFiZWx7Zm9udDo1MDAgMTRweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNpbXBsZS1zbmFja2Jhcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHh9Lm1hdC1zaW1wbGUtc25hY2tiYXItYWN0aW9ue2xpbmUtaGVpZ2h0OjE7Zm9udC1mYW1pbHk6aW5oZXJpdDtmb250LXNpemU6aW5oZXJpdDtmb250LXdlaWdodDo1MDB9Lm1hdC10cmVle2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXRyZWUtbm9kZXtmb250LXdlaWdodDo0MDA7Zm9udC1zaXplOjE0cHh9Lm1hdC1yaXBwbGV7b3ZlcmZsb3c6aGlkZGVufUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5tYXQtcmlwcGxle2Rpc3BsYXk6bm9uZX19Lm1hdC1yaXBwbGUubWF0LXJpcHBsZS11bmJvdW5kZWR7b3ZlcmZsb3c6dmlzaWJsZX0ubWF0LXJpcHBsZS1lbGVtZW50e3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlci1yYWRpdXM6NTAlO3BvaW50ZXItZXZlbnRzOm5vbmU7dHJhbnNpdGlvbjpvcGFjaXR5LC13ZWJraXQtdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7dHJhbnNpdGlvbjpvcGFjaXR5LHRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpO3RyYW5zaXRpb246b3BhY2l0eSx0cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKSwtd2Via2l0LXRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX0uY2RrLXZpc3VhbGx5LWhpZGRlbntib3JkZXI6MDtjbGlwOnJlY3QoMCAwIDAgMCk7aGVpZ2h0OjFweDttYXJnaW46LTFweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjFweDtvdXRsaW5lOjA7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyLC5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9pbnRlci1ldmVudHM6bm9uZTt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uY2RrLW92ZXJsYXktY29udGFpbmVye3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6MTAwMH0uY2RrLW92ZXJsYXktY29udGFpbmVyOmVtcHR5e2Rpc3BsYXk6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXJ7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwMH0uY2RrLW92ZXJsYXktcGFuZXtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czphdXRvO2JveC1zaXppbmc6Ym9yZGVyLWJveDt6LWluZGV4OjEwMDA7ZGlzcGxheTpmbGV4O21heC13aWR0aDoxMDAlO21heC1oZWlnaHQ6MTAwJX0uY2RrLW92ZXJsYXktYmFja2Ryb3B7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDoxMDAwO3BvaW50ZXItZXZlbnRzOmF1dG87LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnRyYW5zcGFyZW50O3RyYW5zaXRpb246b3BhY2l0eSAuNHMgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7b3BhY2l0eTowfS5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6MX1AbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6YWN0aXZlKXsuY2RrLW92ZXJsYXktYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5Oi42fX0uY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcHtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjI4OCl9LmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLC5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6MH0uY2RrLW92ZXJsYXktY29ubmVjdGVkLXBvc2l0aW9uLWJvdW5kaW5nLWJveHtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDA7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttaW4td2lkdGg6MXB4O21pbi1oZWlnaHQ6MXB4fS5jZGstZ2xvYmFsLXNjcm9sbGJsb2Nre3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7b3ZlcmZsb3cteTpzY3JvbGx9LmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDotd2Via2l0LWF1dG9maWxsey13ZWJraXQtYW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnR9LmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDpub3QoOi13ZWJraXQtYXV0b2ZpbGwpey13ZWJraXQtYW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kO2FuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZH10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemV7cmVzaXplOm5vbmV9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplLW1lYXN1cmluZ3toZWlnaHQ6YXV0byFpbXBvcnRhbnQ7b3ZlcmZsb3c6aGlkZGVuIWltcG9ydGFudDtwYWRkaW5nOjJweCAwIWltcG9ydGFudDtib3gtc2l6aW5nOmNvbnRlbnQtYm94IWltcG9ydGFudH0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlcnttYXJnaW46MTZweCAwIDhweH0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAuaXRlbS13cmFwcGVye21heC13aWR0aDoxNWVtO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAuaXRlbS13cmFwcGVyLC5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC5tYXRlcmlhbC1pY29uc3tjb2xvcjojOTY5Njk2fS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC5maWx0ZXItY29udGVudHttYXJnaW4tcmlnaHQ6OHB4fS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC5tYXQtY2hpcHtjdXJzb3I6cG9pbnRlcn0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAudmFsdWUtd3JhcHBlcntjb2xvcjojZWYzZjU0fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGZpbHRlckdyb3VwcyA9IFtdO1xuXG4gIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGVkaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGVkaXREZWNGaWx0ZXJHcm91cCgkZXZlbnQsIGZpbHRlckdyb3VwKSB7XG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuZWRpdC5lbWl0KGZpbHRlckdyb3VwKTtcbiAgfVxuICByZW1vdmVEZWNGaWx0ZXJHcm91cCgkZXZlbnQsIGZpbHRlckdyb3VwKSB7XG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMucmVtb3ZlLmVtaXQoZmlsdGVyR3JvdXApO1xuICB9XG5cbiAgZ2V0VmFsdWV0eXBlKHZhbHVlKSB7XG5cbiAgICBjb25zdCBmaXJzdFZhbHVlID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZVswXSA6IHZhbHVlO1xuXG4gICAgbGV0IHR5cGU7XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgYCR7Zmlyc3RWYWx1ZX1gLmluZGV4T2YoJzAwMFonKSA+PSAwOlxuICAgICAgICB0eXBlID0gJ2RhdGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHR5cGUgPSAnZGVmYXVsdCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRDaGlwc01vZHVsZSwgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkZWNQZXJtaXNzaW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVjUGVybWlzc2lvbkRpcmVjdGl2ZSB7XG5cbiAgcHJpdmF0ZSBoYXNWaWV3ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBkZWNQZXJtaXNzaW9uKHA6IHN0cmluZ1tdKSB7XG4gICAgaWYgKCFwKSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgdGhpcy5oYXNWaWV3ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYXNQZXJtaXNzaW9uKHApO1xuICAgIH1cbiAgfVxuXG4gIGhhc1Blcm1pc3Npb24ocCkge1xuICAgIHRoaXMuc2VydmljZS51c2VyJC5zdWJzY3JpYmUoXG4gICAgICB1c2VyID0+IHtcbiAgICAgICAgaWYgKHVzZXIgJiYgdGhpcy5pc0FsbG93ZWRBY2Nlc3MocCwgdXNlci5wZXJtaXNzaW9ucykpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGFzVmlldykge1xuICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcbiAgICAgICAgICAgIHRoaXMuaGFzVmlldyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICAgIHRoaXMuaGFzVmlldyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNBbGxvd2VkQWNjZXNzKHJvbGVzQWxsb3dlZDogc3RyaW5nW10gPSBbXSwgY3VycmVudFJvbGVzOiBzdHJpbmdbXSA9IFtdKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1hdGNoaW5nUm9sZSA9IGN1cnJlbnRSb2xlcy5maW5kKCh1c2VyUm9sZSkgPT4ge1xuICAgICAgICByZXR1cm4gcm9sZXNBbGxvd2VkLmZpbmQoKGFsb3dlZFJvbGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gYWxvd2VkUm9sZSA9PT0gdXNlclJvbGU7XG4gICAgICAgIH0pID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWF0Y2hpbmdSb2xlID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjUGVybWlzc2lvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGVjLXBlcm1pc3Npb24uZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1Blcm1pc3Npb25EaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1Blcm1pc3Npb25EaXJlY3RpdmVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQZXJtaXNzaW9uTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRDYXJkTW9kdWxlLCBNYXRDaGlwc01vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVNb2R1bGUgfSBmcm9tICcuLy4uL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjUGVybWlzc2lvbk1vZHVsZSB9IGZyb20gJy4vLi4vLi4vLi4vZGlyZWN0aXZlcy9wZXJtaXNzaW9uL2RlYy1wZXJtaXNzaW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJzLWZpbHRlci9saXN0LXRhYnMtZmlsdGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lTW9kdWxlLFxuICAgIERlY1Blcm1pc3Npb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0xpc3RGaWx0ZXJDb21wb25lbnQsIERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RGaWx0ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0RmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1ncmlkJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93IHdyYXBcIiBbZnhMYXlvdXRHYXBdPVwiaXRlbUdhcFwiID5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgcm93IG9mIHJvd3M7IGxldCBpID0gaW5kZXg7XCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgcm93LCByb3dzLCBpKVwiIFtmeEZsZXhdPVwiaXRlbVdpZHRoXCI+XG4gICAgPGRpdiBbbmdTdHlsZV09XCJ7bWFyZ2luOiBpdGVtR2FwfVwiPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVJlZlwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cm93OiByb3cgfHwge30sIGxpc3Q6IHJvd3MgfHwgW10sIGluZGV4OiBpfVwiXG4gICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGl0ZW1XaWR0aCA9ICcyODBweCc7XG5cbiAgQElucHV0KCkgaXRlbUdhcCA9ICc4cHgnO1xuXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF9yb3dzID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBzZXQgcm93cyh2OiBhbnkpIHtcbiAgICBpZiAodGhpcy5fcm93cyAhPT0gdikge1xuICAgICAgdGhpcy5fcm93cyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uSXRlbUNsaWNrKGV2ZW50LCBpdGVtLCBsaXN0LCBpbmRleCkge1xuXG4gICAgdGhpcy5yb3dDbGljay5lbWl0KHtldmVudCwgaXRlbSwgbGlzdCwgaW5kZXh9KTtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtdGFibGUtY29sdW1uJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50IHtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBwcm9wO1xuXG4gIEBJbnB1dCgpIHRpdGxlID0gJyc7XG5cbiAgQElucHV0KCkgc2V0IGNvbFNwYW4odikge1xuICAgIGNvbnN0IG51bWJlciA9ICt2O1xuICAgIHRoaXMuX2NvbFNwYW4gPSBpc05hTihudW1iZXIpID8gMSA6IG51bWJlcjtcbiAgfVxuXG4gIGdldCBjb2xTcGFuKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbFNwYW47XG4gIH1cblxuICBwcml2YXRlIF9jb2xTcGFuID0gMTtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtdGFibGUtY29sdW1uL2xpc3QtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8bmd4LWRhdGF0YWJsZSAjdGFibGVDb21wb25lbnRcbiAgY29sdW1uTW9kZT1cImZsZXhcIlxuICBoZWFkZXJIZWlnaHQ9XCIyNHB4XCJcbiAgcm93SGVpZ2h0PVwiYXV0b1wiXG4gIFtleHRlcm5hbFNvcnRpbmddPVwidHJ1ZVwiXG4gIFttZXNzYWdlc109XCJ7ZW1wdHlNZXNzYWdlOicnfVwiXG4gIFtyb3dzXT1cInJvd3NcIlxuICAoc29ydCk9XCJvblNvcnQoJGV2ZW50KVwiXG4gIChhY3RpdmF0ZSk9XCJvbkl0ZW1DbGljaygkZXZlbnQpXCI+XG5cbiAgPG5neC1kYXRhdGFibGUtY29sdW1uICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1ucztcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ7e2NvbHVtbi50aXRsZSB8IHRyYW5zbGF0ZX19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbZmxleEdyb3ddPVwiY29sdW1uLmNvbFNwYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wXT1cImNvbHVtbi5wcm9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbc29ydGFibGVdPVwiY29sdW1uLnByb3AgPyB0cnVlIDogZmFsc2VcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cImNvbHVtbi50ZW1wbGF0ZSA/IHRydWUgOiBmYWxzZVwiXG4gICAgICBsZXQtcm93PVwicm93XCJcbiAgICAgIGxldC1pbmRleD1cInJvd0luZGV4XCJcbiAgICAgIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZT5cblxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4udGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3Jvdzogcm93IHx8IHt9LCBsaXN0OiByb3dzIHx8IFtdLCBpbmRleDogaW5kZXh9XCJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cblxuPC9uZ3gtZGF0YXRhYmxlPlxuYCxcbiAgc3R5bGVzOiBbYDo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAub3ZlcmZsb3ctdmlzaWJsZXtvdmVyZmxvdzp2aXNpYmxlIWltcG9ydGFudH06Om5nLWRlZXAgZGF0YXRhYmxlLXNjcm9sbGVye3dpZHRoOjEwMCUhaW1wb3J0YW50fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZS5uby1vdmVyZmxvd3tvdmVyZmxvdzphdXRvfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZS5uby1wYWRkaW5nIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGwgLmRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWx7cGFkZGluZzowfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWhlYWRlcntwYWRkaW5nOjExcHggMTZweH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1oZWFkZXIgLmRhdGF0YWJsZS1oZWFkZXItY2VsbC1sYWJlbHtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGx7Zm9udC1zaXplOjEzcHg7Zm9udC13ZWlnaHQ6NDAwO292ZXJmbG93OmhpZGRlbjttaW4taGVpZ2h0OjEwMCU7ZGlzcGxheTp0YWJsZTstd2Via2l0LXVzZXItc2VsZWN0OmluaXRpYWw7LW1vei11c2VyLXNlbGVjdDppbml0aWFsOy1tcy11c2VyLXNlbGVjdDppbml0aWFsOy1vLXVzZXItc2VsZWN0OmluaXRpYWw7dXNlci1zZWxlY3Q6aW5pdGlhbH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHtwYWRkaW5nOjE2cHg7ZGlzcGxheTp0YWJsZS1jZWxsO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt3b3JkLWJyZWFrOmJyZWFrLWFsbH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbC5jZWxsLXRvcCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHt2ZXJ0aWNhbC1hbGlnbjp0b3B9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtcm93LWRldGFpbHtwYWRkaW5nOjEwcHh9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5zb3J0LWJ0bnt3aWR0aDowO2hlaWdodDowfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuaWNvbi1kb3due2JvcmRlci1sZWZ0OjVweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuaWNvbi11cHtib3JkZXItbGVmdDo1cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjVweCBzb2xpZCB0cmFuc3BhcmVudH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0VGFibGVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCByb3dzKHYpIHtcbiAgICBpZiAodGhpcy5fcm93cyAhPT0gdikge1xuICAgICAgdGhpcy5fcm93cyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBAVmlld0NoaWxkKERhdGF0YWJsZUNvbXBvbmVudCkgdGFibGVDb21wb25lbnQ6IERhdGF0YWJsZUNvbXBvbmVudDtcblxuICBjb2x1bW5zU29ydENvbmZpZzogYW55O1xuXG4gIHByaXZhdGUgX3Jvd3M6IEFycmF5PGFueT4gPSBbXTtcblxuICBAQ29udGVudENoaWxkcmVuKERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCkgY29sdW1uczogUXVlcnlMaXN0PERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudD47XG5cbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIHJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgb25Tb3J0KGV2ZW50KSB7XG5cbiAgICBjb25zdCBzb3J0Q29uZmlnID0gW3tcbiAgICAgIHByb3BlcnR5OiBldmVudC5zb3J0c1swXS5wcm9wLFxuICAgICAgb3JkZXI6IHt0eXBlOiBldmVudC5zb3J0c1swXS5kaXJ9XG4gICAgfV07XG5cbiAgICBpZiAoc29ydENvbmZpZyAhPT0gdGhpcy5jb2x1bW5zU29ydENvbmZpZykge1xuXG4gICAgICB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnID0gc29ydENvbmZpZztcblxuICAgICAgdGhpcy5zb3J0LmVtaXQodGhpcy5jb2x1bW5zU29ydENvbmZpZyk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uSXRlbUNsaWNrKCRldmVudCkge1xuXG4gICAgY29uc3QgZXZlbnQgPSAkZXZlbnQ7XG5cbiAgICBjb25zdCBpdGVtID0gJGV2ZW50LnJvdztcblxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnJvd3M7XG5cbiAgICBjb25zdCBpbmRleCA9ICRldmVudC5yb3cuJCRpbmRleDtcblxuICAgIHRoaXMucm93Q2xpY2suZW1pdCh7ZXZlbnQsIGl0ZW0sIGxpc3QsIGluZGV4fSk7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RlY0xpc3RHcmlkQ29tcG9uZW50fSBmcm9tICcuL2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7RGVjTGlzdFRhYmxlQ29tcG9uZW50fSBmcm9tICcuL2xpc3QtdGFibGUvbGlzdC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlckNvbXBvbmVudH0gZnJvbSAnLi9saXN0LWZpbHRlci9saXN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRhcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBEZWNMaXN0RmV0Y2hNZXRob2QgfSBmcm9tICcuL2xpc3QubW9kZWxzJztcbmltcG9ydCB7IEZpbHRlckRhdGEsIERlY0ZpbHRlciwgRmlsdGVyR3JvdXBzLCBGaWx0ZXJHcm91cCB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlciB9IGZyb20gJy4vbGlzdC5tb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdCcsXG4gIHRlbXBsYXRlOiBgPCEtLSBDT01QT05FTlQgTEFZT1VUIC0tPlxuPGRpdiBjbGFzcz1cImxpc3QtY29tcG9uZW50LXdyYXBwZXJcIj5cbiAgPGRpdiAqbmdJZj1cImZpbHRlclwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWZpbHRlclwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJyZXBvcnQgfHwgZmlsdGVyTW9kZSA9PT0gJ2NvbGxhcHNlJ1wiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICAgIDxkaXYgZnhGbGV4IGNsYXNzPVwidGV4dC1yaWdodFwiICpuZ0lmPVwidGFibGVBbmRHcmlkQXJlU2V0KClcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJ0b2dnbGVMaXN0TW9kZSgpXCI+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBhcmlhLWxhYmVsPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgKm5nSWY9XCJsaXN0TW9kZSA9PT0gJ2dyaWQnXCI+dmlld19oZWFkbGluZTwvbWF0LWljb24+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIGdyaWQgbW9kZVwiIGFyaWEtbGFiZWw9XCJTd2l0Y2ggdG8gZ3JpZCBtb2RlXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnICpuZ0lmPVwibGlzdE1vZGUgPT09ICd0YWJsZSdcIj52aWV3X21vZHVsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGZ4RmxleD5cbiAgICAgICAgPGRpdiAqbmdJZj1cImZpbHRlck1vZGUgPT0gJ2NvbGxhcHNlJyB0aGVuIGNvbGxhcHNlVGVtcGxhdGUgZWxzZSB0YWJzVGVtcGxhdGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIEdSSUQgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2dyaWRUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZ3JpZFwiPjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVEFCTEUgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2xpc3RUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtdGFibGVcIj48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIEZPT1RFUiBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjZm9vdGVyVGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgPHAgY2xhc3M9XCJsaXN0LWZvb3RlclwiPlxuICAgIHt7ICdsYWJlbC5hbW91bnQtbG9hZGVkLW9mLXRvdGFsJyB8XG4gICAgICB0cmFuc2xhdGU6e1xuICAgICAgICBsb2FkZWQ6IHJlcG9ydD8ucmVzdWx0Py5yb3dzPy5sZW5ndGgsXG4gICAgICAgIHRvdGFsOiByZXBvcnQ/LnJlc3VsdD8uY291bnRcbiAgICAgIH1cbiAgICB9fVxuICA8L3A+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIENPTExBUFNFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICN0YWJzVGVtcGxhdGU+XG4gIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICA8ZGl2ICpuZ0lmPVwibGlzdE1vZGUgPT0gJ2dyaWQnIHRoZW4gZ3JpZFRlbXBsYXRlIGVsc2UgbGlzdFRlbXBsYXRlXCI+PC9kaXY+XG4gICAgPCEtLSBGT09URVIgQ09OVEVOVCAtLT5cbiAgICA8ZGl2IGZ4RmxleD5cbiAgICAgIDxkaXYgKm5nSWY9XCJzaG93Rm9vdGVyICYmICFsb2FkaW5nIHRoZW4gZm9vdGVyVGVtcGxhdGVcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIExPQURJTkcgU1BJTk5FUiAtLT5cbiAgICA8ZGl2IGZ4RmxleCAqbmdJZj1cImxvYWRpbmdcIiBjbGFzcz1cInRleHQtY2VudGVyIGxvYWRpbmctc3Bpbm5lci13cmFwcGVyXCI+XG4gICAgICA8ZGVjLXNwaW5uZXI+PC9kZWMtc3Bpbm5lcj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIExPQUQgTU9SRSBCVVRUT04gLS0+XG4gICAgPGRpdiBmeEZsZXggKm5nSWY9XCIhaXNMYXN0UGFnZSAmJiAhbG9hZGluZyAmJiAhZGlzYWJsZVNob3dNb3JlQnV0dG9uXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gKGNsaWNrKT1cInNob3dNb3JlKClcIj57eydsYWJlbC5zaG93LW1vcmUnIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIENPTExBUFNFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNjb2xsYXBzZVRlbXBsYXRlPlxuICA8bWF0LWFjY29yZGlvbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgY29sbGFwc2FibGVGaWx0ZXJzXCI+XG4gICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbCAob3BlbmVkKT1cInNlYXJjaENvbGxhcHNhYmxlKGZpbHRlcilcIj5cbiAgICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZS10aXRsZVwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIzMnB4XCIgZnhMYXlvdXRBbGlnbj1cImxlZnQgY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGZ4RmxleD1cIjk2cHhcIj5cbiAgICAgICAgICAgICAgPGRlYy1sYWJlbCBbY29sb3JIZXhdPVwiZmlsdGVyLmNvbG9yXCI+e3sgZmlsdGVyLmxhYmVsLmxlbmd0aCB9fTwvZGVjLWxhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7eyAnbGFiZWwuJyArIGZpbHRlci5sYWJlbCB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwib3Blbm5lZENvbGxhcHNhYmxlID09PSBmaWx0ZXIudWlkXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWJzVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21hdC1leHBhbnNpb24tcGFuZWw+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbWF0LWFjY29yZGlvbj5cbiAgPGRpdiBjbGFzcz1cImFjY29yZGlvbi1ib3R0b20tbWFyZ2luXCI+PC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtgLmxpc3QtZm9vdGVye2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyfS5saXN0LWNvbXBvbmVudC13cmFwcGVye21pbi1oZWlnaHQ6NzJweH0udGV4dC1yaWdodHt0ZXh0LWFsaWduOnJpZ2h0fS5sb2FkaW5nLXNwaW5uZXItd3JhcHBlcntwYWRkaW5nOjMycHh9LmNvbGxhcHNlLXRpdGxle3dpZHRoOjEwMCV9LmFjY29yZGlvbi1ib3R0b20tbWFyZ2lue21hcmdpbi1ib3R0b206MTAwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcblxuICAvKlxuICAqIGZpbHRlck1vZGVcbiAgKlxuICAqXG4gICovXG4gIGZpbHRlck1vZGU6ICd0YWJzJyB8ICdjb2xsYXBzZScgPSAndGFicyc7XG5cblxuICAvKlxuICAqIGNvbGxhcHNhYmxlRmlsdGVyc1xuICAqXG4gICpcbiAgKi9cbiAgY29sbGFwc2FibGVGaWx0ZXJzOiBEZWNMaXN0RmlsdGVyW10gPSBbXTtcblxuICAvKlxuICAgKiBsb2FkaW5nXG4gICAqXG4gICAqXG4gICAqL1xuICBzZXQgbG9hZGluZyh2KSB7XG5cbiAgICB0aGlzLl9sb2FkaW5nID0gdjtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5sb2FkaW5nID0gdjtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGxvYWRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gIH1cblxuICAvKlxuICAgKiBmaWx0ZXJHcm91cHNcbiAgICpcbiAgICpcbiAgICovXG4gIGdldCBmaWx0ZXJHcm91cHMoKTogRmlsdGVyR3JvdXBzIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHMgOiBbXTtcbiAgfVxuXG4gIC8qXG4gICAqIG9wZW5uZWRDb2xsYXBzYWJsZVxuICAgKlxuICAgKlxuICAgKi9cbiAgb3Blbm5lZENvbGxhcHNhYmxlO1xuXG4gIC8qXG4gICAqIHJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcmVwb3J0O1xuXG4gIC8qXG4gICAqIGlzTGFzdFBhZ2VcbiAgICpcbiAgICpcbiAgICovXG4gIGlzTGFzdFBhZ2U6IGJvb2xlYW47XG5cbiAgLypcbiAgICogZmlsdGVyRGF0YVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJEYXRhOiBTdWJqZWN0PEZpbHRlckRhdGE+ID0gbmV3IFN1YmplY3Q8RmlsdGVyRGF0YT4oKTtcblxuICAvKlxuICAgKiBfbG9hZGluZztcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2xvYWRpbmcgPSB0cnVlO1xuXG4gIC8qXG4gICAqIGNsZWFyQW5kUmVsb2FkUmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGNsZWFyQW5kUmVsb2FkUmVwb3J0O1xuXG4gIC8qXG4gICAqIGZpbHRlclN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiByZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWFjdGl2ZVJlcG9ydDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIC8qXG4gICAqIHJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogc2Nyb2xsYWJsZUNvbnRhaW5lclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxhYmxlQ29udGFpbmVyOiBFbGVtZW50O1xuXG4gIC8qXG4gICAqIHNjcm9sbEV2ZW50RW1pdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbEV2ZW50RW1pdGVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiB0YWJzQ2hhbmdlU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHRhYnNDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiB0YWJsZVNvcnRTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdGFibGVTb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogcGF5bG9hZFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBwYXlsb2FkOiBEZWNGaWx0ZXI7XG5cbiAgLypcbiAgICogX2VuZHBvaW50IGludGVybmFsbFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfZW5kcG9pbnQ6IHN0cmluZztcblxuICAvKlxuICAgKiBjdXN0b21GZXRjaE1ldGhvZFxuICAgKlxuICAgKiBtZXRob2QgdXNlZCB0byBmZXRjaCBkYXRhIGZyb20gYmFjay1lbmRcbiAgICovXG4gIEBJbnB1dCgpIGN1c3RvbUZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2Q7XG5cbiAgLypcbiAgICogY29sdW1uc1NvcnRDb25maWdcbiAgICpcbiAgICogdXNlZCB0byBnZXQgYSBzb3J0ZWQgbGlzdCBmcm9tIGJhY2tlbmRcbiAgICogY2FuIGJlIHBhc2VkIHZpYSBhdHRyaWJ1dGUgdG8gc29ydCB0aGUgZmlyc3QgbG9hZFxuICAgKi9cbiAgQElucHV0KCkgY29sdW1uc1NvcnRDb25maWc7XG5cbiAgLypcbiAgICogZGlzYWJsZVNob3dNb3JlQnV0dG9uXG4gICAqXG4gICAqIHVzZWQgdG8gaGlkZSB0aGUgc2hvdyBtb3JlIGJ1dHRvblxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZVNob3dNb3JlQnV0dG9uOiBib29sZWFuO1xuXG4gIC8qXG4gICAqIGVuZHBvaW50XG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgZW5kcG9pbnQodjogc3RyaW5nKSB7XG5cbiAgICBpZiAodGhpcy5fZW5kcG9pbnQgIT09IHYpIHtcblxuICAgICAgdGhpcy5fZW5kcG9pbnQgPSAodlswXSAmJiB2WzBdID09PSAnLycpID8gdi5yZXBsYWNlKCcvJywgJycpIDogdjtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGVuZHBvaW50KCk6IHN0cmluZyB7XG5cbiAgICByZXR1cm4gdGhpcy5fZW5kcG9pbnQ7XG5cbiAgfVxuXG4gIC8qXG4gICAqIG5hbWVcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzZXQgbmFtZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fbmFtZSAhPT0gdikge1xuICAgICAgdGhpcy5fbmFtZSA9IHY7XG4gICAgICB0aGlzLnNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgLypcbiAgICogcm93c1xuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCdyb3dzJylcblxuICBzZXQgcm93cyhyb3dzKSB7XG4gICAgdGhpcy5zZXRSb3dzKHJvd3MpO1xuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVwb3J0ID8gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKlxuICAgKiBsaW1pdFxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgbGltaXQgPSAxMDtcblxuICAvKlxuICAgKiBzY3JvbGxhYmxlQ29udGFpbmVyQ2xhc3NcbiAgICpcbiAgICogV2hlcmUgdGhlIHNjcm9sbCB3YXRjaGVyIHNob3VsZCBiZSBsaXN0ZW5pbmdcbiAgICovXG4gIEBJbnB1dCgpIHNjcm9sbGFibGVDb250YWluZXJDbGFzcyA9ICdtYXQtc2lkZW5hdi1jb250ZW50JztcblxuICAvKlxuICAgKiBzZWFyY2hhYmxlUHJvcGVydGllc1xuICAgKlxuICAgKiBQcm9wZXJ0aWVzIHRvIGJlIHNlYXJjaGVkIHdoZW4gdXNpbmcgYmFzaWMgc2VhcmNoXG4gICAqL1xuICBASW5wdXQoKSBzZWFyY2hhYmxlUHJvcGVydGllczogc3RyaW5nW107XG5cbiAgLypcbiAgICogc2hvd0Zvb3RlclxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgc2hvd0Zvb3RlciA9IHRydWU7XG5cbiAgLypcbiAgICogcG9zdFNlYXJjaFxuICAgKlxuICAgKiBUaGlzIG1pZGRsZXdhcmUgaXMgdXNlZCB0byB0cmlnZ2VyIGV2ZW50cyBhZnRlciBldmVyeSBzZWFyY2hcbiAgICovXG4gIEBPdXRwdXQoKSBwb3N0U2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogcm93Q2xpY2tcbiAgICpcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBhIHJvdyBvciBjYXJkIGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiBncmlkXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RHcmlkQ29tcG9uZW50KSBncmlkOiBEZWNMaXN0R3JpZENvbXBvbmVudDtcblxuICAvKlxuICAgKiB0YWJsZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0VGFibGVDb21wb25lbnQpIHRhYmxlOiBEZWNMaXN0VGFibGVDb21wb25lbnQ7XG5cbiAgLypcbiAgICogZmlsdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9maWx0ZXI6IERlY0xpc3RGaWx0ZXJDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0RmlsdGVyQ29tcG9uZW50KVxuICBzZXQgZmlsdGVyKHY6IERlY0xpc3RGaWx0ZXJDb21wb25lbnQpIHtcbiAgICBpZiAodGhpcy5fZmlsdGVyICE9PSB2KSB7XG4gICAgICB0aGlzLl9maWx0ZXIgPSB2O1xuICAgICAgdGhpcy5zZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZmlsdGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXI7XG4gIH1cblxuICAvKlxuICAgKiBsaXN0TW9kZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgbGlzdE1vZGU7XG5cbiAgLypcbiAgICogZ2V0TGlzdE1vZGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGdldExpc3RNb2RlID0gKCkgPT4ge1xuXG4gICAgbGV0IGxpc3RNb2RlID0gdGhpcy5saXN0TW9kZTtcblxuICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIGNvbnN0IHNlbGVjdGVkVGFiID0gdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5zZWxlY3RlZFRhYigpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWRUYWIgJiYgc2VsZWN0ZWRUYWIubGlzdE1vZGUpIHtcblxuICAgICAgICBsaXN0TW9kZSA9IHNlbGVjdGVkVGFiLmxpc3RNb2RlO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxpc3RNb2RlID0gdGhpcy50YWJsZSA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBsaXN0TW9kZTtcblxuICB9XG5cbiAgLypcbiAgICogbmdPbkluaXRcbiAgICpcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHsgfVxuXG4gIC8qXG4gICAqIG5nT25Jbml0XG4gICAqXG4gICAqIFN0YXJ0cyBhIGZyZXNoIGNvbXBvbmVudCBhbmQgcHJlcGFyZSBpdCB0byBydW5cbiAgICpcbiAgICogLSBTdGFydCB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3Vic2NyaWJlIHRvIHRoZSBSZWFjdGl2ZSBSZXBvcnRcbiAgICogLSBTdGFydCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gRW5zdXJlIHVuaXF1ZSBuYW1lXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhdGNoRmlsdGVyRGF0YSgpO1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlTmFtZSgpO1xuICAgIHRoaXMuZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKTtcbiAgfVxuXG4gIC8qXG4gICogbmdBZnRlclZpZXdJbml0XG4gICpcbiAgKiBXYWl0IGZvciB0aGUgc3ViY29tcG9uZW50cyB0byBzdGFydCBiZWZvcmUgcnVuIHRoZSBjb21wb25lbnRcbiAgKlxuICAqIC0gU3RhcnQgd2F0Y2hpbmcgRmlsdGVyXG4gICogLSBEbyB0aGUgZmlyc3QgbG9hZFxuICAqL1xuIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgIHRoaXMud2F0Y2hGaWx0ZXIoKTtcbiAgIHRoaXMuZG9GaXJzdExvYWQoKTtcbiAgIHRoaXMuZGV0ZWN0TGlzdE1vZGUoKTtcbiAgIHRoaXMud2F0Y2hUYWJzQ2hhbmdlKCk7XG4gICB0aGlzLndhdGNoVGFibGVTb3J0KCk7XG4gICB0aGlzLnJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpO1xuICAgdGhpcy53YXRjaFNjcm9sbCgpO1xuICAgdGhpcy53YXRjaFNjcm9sbEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgLypcbiAgICogbmdPbkRlc3Ryb3lcbiAgICpcbiAgICogRGVzdHJveSB3YXRjaGVyIHRvIGZyZWUgbWVlbW9yeSBhbmQgcmVtb3ZlIHVubmVjZXNzYXJ5IHRyaWdnZXJzXG4gICAqXG4gICAqIC0gVW5zdWJzY3JpYmUgZnJvbSB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3RvcCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gU3RvcCB3YXRjaGluZyBGaWx0ZXJcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGwoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ0ZpbHRlcigpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFic0NoYW5nZSgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFibGVTb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIHJlbG9hZENvdW50UmVwb3J0XG4gICAqXG4gICAqL1xuICByZWxvYWRDb3VudFJlcG9ydCgpIHtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5yZWxvYWRDb3VudFJlcG9ydCh0aGlzLnBheWxvYWQpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZW1vdmVJdGVtXG4gICAqXG4gICAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBsaXN0XG4gICAqL1xuICByZW1vdmVJdGVtKGlkKSB7XG5cbiAgICBjb25zdCBpdGVtID0gdGhpcy5yb3dzLmZpbmQoX2l0ZW0gPT4gX2l0ZW0uaWQgPT09IGlkKTtcblxuICAgIGlmIChpdGVtKSB7XG5cbiAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMucm93cy5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbUluZGV4ID49IDApIHtcblxuICAgICAgICB0aGlzLnJvd3Muc3BsaWNlKGl0ZW1JbmRleCwgMSk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmICh0aGlzLmVuZHBvaW50KSB7XG4gICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZXN0YXJ0XG4gICAqXG4gICAqIENsZWFyIHRoZSBsaXN0IGFuZCByZWxvYWQgdGhlIGZpcnN0IHBhZ2VcbiAgICovXG4gIHJlc3RhcnQoKSB7XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNob3dNb3JlXG4gICAqXG4gICAqL1xuICBzaG93TW9yZSgpIHtcblxuICAgIHJldHVybiB0aGlzLmxvYWRSZXBvcnQoKTtcblxuICB9XG5cbiAgLypcbiAgICogc2VhcmNoQ29sbGFwc2FibGVcbiAgICpcbiAgICogc2VhcmNoIGJ5IGNvbGxhcHNhYmxlIGZpbHRlclxuICAgKi9cbiAgc2VhcmNoQ29sbGFwc2FibGUoZmlsdGVyOiBEZWNMaXN0RmlsdGVyKSB7XG5cbiAgICBpZiAodGhpcy5vcGVubmVkQ29sbGFwc2FibGUgIT09IGZpbHRlci51aWQpIHtcblxuICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UoZmlsdGVyLnVpZCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHRhYmxlQW5kR3JpZEFyZVNldFxuICAgKlxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGVyZSBhcmUgYm90aCBHUklEIGFuZCBUQUJMRSBkZWZpbml0aW9uIGluc2lkZSB0aGUgbGlzdFxuICAgKi9cbiAgdGFibGVBbmRHcmlkQXJlU2V0KCkge1xuICAgIHJldHVybiB0aGlzLmdyaWQgJiYgdGhpcy50YWJsZTtcbiAgfVxuXG4gIC8qXG4gICAqIHRvZ2dsZUxpc3RNb2RlXG4gICAqXG4gICAqIENoYW5nZXMgYmV0d2VlbiBHUklEIGFuZCBUQUJMRSB2aXN1YWxpemF0b2luIG1vZGVzXG4gICAqL1xuICB0b2dnbGVMaXN0TW9kZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID09PSAnZ3JpZCcgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gICAgaWYgKHRoaXMubGlzdE1vZGUgPT09ICd0YWJsZScpIHtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgdGhpcy50YWJsZS50YWJsZUNvbXBvbmVudC5yZWNhbGN1bGF0ZSgpO1xuXG4gICAgICB9LCAxKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogYWN0QnlTY3JvbGxQb3NpdGlvblxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlY3QgaWYgdGhlcmUgaXMgc2Nyb29saW5nIGFjdGlvbiBvbiB3aW5kb3cgdG8gZmV0Y2ggYW5kIHNob3cgbW9yZSByb3dzIHdoZW4gdGhlIHNjcm9sbGluZyBkb3duLlxuICAgKi9cbiAgcHJpdmF0ZSBhY3RCeVNjcm9sbFBvc2l0aW9uID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCRldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnRXaXRoQ2RrT3ZlcmxheUNsYXNzID0gJGV2ZW50WydwYXRoJ10uZmluZChwYXRoID0+IHtcblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBwYXRoWydjbGFzc05hbWUnXSB8fCAnJztcblxuICAgICAgICBjb25zdCBpbnNpZGVPdmVybGF5ID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Nkay1vdmVybGF5JykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Z1bGxzY3JlYW4tZGlhbG9nLWNvbnRhaW5lcicpID49IDA7XG5cbiAgICAgICAgcmV0dXJuIGluc2lkZU92ZXJsYXkgfHwgaW5zaWRlRnVsbHNjcmVhbkRpYWxvZ0NvbnRhaW5lcjtcblxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICBpZiAoIXRoaXMuaXNMYXN0UGFnZSkge1xuXG4gICAgICAgICAgY29uc3QgdGFyZ2V0OiBhbnkgPSAkZXZlbnRbJ3RhcmdldCddO1xuXG4gICAgICAgICAgY29uc3QgbGltaXQgPSB0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGFyZ2V0LmNsaWVudEhlaWdodDtcblxuICAgICAgICAgIGlmICh0YXJnZXQuc2Nyb2xsVG9wID49IChsaW1pdCAtIDE2KSkge1xuXG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlKCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBkZXRlY3RMaXN0TW9kZVxuICAgKlxuICAgKiBTZXQgdGhlIGxpc3QgbW9kZSBiYXNlZCBvbiBmaWx0ZXJUYWJzIGNvbmZpZ3VyYXRpb24gb3IgY3VzdG9tIGZ1bmN0aW9uIG92ZXJyaWRkZW4gYnkgZ2V0TGlzdE1vZGUgaW5wdXRcbiAgICovXG4gIHByaXZhdGUgZGV0ZWN0TGlzdE1vZGUoKSB7XG5cbiAgICB0aGlzLmxpc3RNb2RlID0gdGhpcy5nZXRMaXN0TW9kZSgpO1xuXG4gIH1cblxuICAvKlxuICAgKiBkZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpXG4gICAqXG4gICAqIFNldCB0aGUgbGlzdCBtb2RlIGJhc2VkIG9uIGRlY2xhcmF0aW9uIG9mIHRhYmxlIGFuZCBncmlkLiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBib290YXN0cmFwIHRoZSBjb21wb25lbnQgd2l0aCBvbmx5IGdyaWQgb3Igb25seSB0YWJsZVxuICAgKiBUaGlzIG9ubHkgd29yayBpZiBubyBtb2RlIGlzIHByb3ZpZGVkIGJ5IEBJbnB1dCBvdGhlcndpc2UgdGhlIEBJbnB1dCB2YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICovXG4gIHByaXZhdGUgZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKSB7XG5cbiAgICB0aGlzLmxpc3RNb2RlID0gdGhpcy5saXN0TW9kZSA/IHRoaXMubGlzdE1vZGUgOiB0aGlzLnRhYmxlID8gJ3RhYmxlJyA6ICdncmlkJztcblxuICB9XG5cbiAgLypcbiAgICogZW1pdFNjcm9sbEV2ZW50XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVtaXRTY3JvbGxFdmVudCA9ICgkZXZlbnQpID0+IHtcblxuICAgIGlmICghdGhpcy5sb2FkaW5nKSB7XG5cbiAgICAgIHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXIuZW1pdCgkZXZlbnQpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBpc1RhYnNGaWx0ZXJEZWZpbmVkXG4gICAqXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSBUYWJzIEZpbHRlciBpcyBkZWZpbmVkIGluc2lkZSB0aGUgbGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBpc1RhYnNGaWx0ZXJEZWZpbmVkKCkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50O1xuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWQoKSB7XG4gICAgaWYgKHRoaXMuaXNUYWJzRmlsdGVyRGVmaW5lZCgpKSB7XG4gICAgICB0aGlzLmRvRmlyc3RMb2FkQnlUYWJzRmlsdGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9GaXJzdExvYWRMb2NhbGx5KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGRvRmlyc3RMb2FkQnlUYWJzRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGRvRmlyc3RMb2FkQnlUYWJzRmlsdGVyKCkge1xuICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuZG9GaXJzdExvYWQoKTtcbiAgfVxuXG4gIC8qXG4gICAqIGRvRmlyc3RMb2FkTG9jYWxseVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZExvY2FsbHkocmVmcmVzaCkge1xuICAgIHRoaXMubG9hZFJlcG9ydChyZWZyZXNoKTtcbiAgfVxuXG4gIC8qXG4gICAqIGVuc3VyZVVuaXF1ZU5hbWVcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZW5zdXJlVW5pcXVlTmFtZSgpIHtcbiAgICBpZiAoIXRoaXMubmFtZSkge1xuICAgICAgY29uc3QgZXJyb3IgPSAnTGlzdENvbXBvbmVudEVycm9yOiBUaGUgbGlzdCBjb21wb25lbnQgbXVzdCBoYXZlIGFuIHVuaXF1ZSBuYW1lIHRvIGJlIHVzZWQgaW4gdXJsIGZpbHRlci4nXG4gICAgICArICcgUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJztcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkQnlPcGVubmVkQ29sbGFwc2UoZmlsdGVyVWlkKSB7XG5cbiAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmNvbGxhcHNhYmxlRmlsdGVycy5maW5kKGl0ZW0gPT4gaXRlbS51aWQgPT09IGZpbHRlclVpZCk7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cDogRmlsdGVyR3JvdXAgPSB7IGZpbHRlcnM6IGZpbHRlci5maWx0ZXJzIH07XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSwgZmlsdGVyR3JvdXApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMub3Blbm5lZENvbGxhcHNhYmxlID0gZmlsdGVyLnVpZDtcblxuICAgIH0sIDApO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgbG9hZFJlcG9ydChjbGVhckFuZFJlbG9hZFJlcG9ydD86IGJvb2xlYW4sIGNvbGxhcHNlRmlsdGVyPzogRmlsdGVyR3JvdXApOiBQcm9taXNlPGFueT4ge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICBpZiAoY2xlYXJBbmRSZWxvYWRSZXBvcnQgJiYgdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgdGhpcy5zZXRSb3dzKHRoaXMucm93cyk7XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5jbGVhckFuZFJlbG9hZFJlcG9ydCA9IGNsZWFyQW5kUmVsb2FkUmVwb3J0O1xuXG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICBpZiAodGhpcy5lbmRwb2ludCkge1xuXG4gICAgICAgIGxldCBmaWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlciA/IHRoaXMuZmlsdGVyLmZpbHRlckdyb3VwcyA6IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoY29sbGFwc2VGaWx0ZXIpIHtcblxuICAgICAgICAgIGlmIChmaWx0ZXJHcm91cHMpIHtcblxuICAgICAgICAgICAgZmlsdGVyR3JvdXBzLmZvckVhY2goZ3JvdXAgPT4ge1xuICAgICAgICAgICAgICBncm91cC5maWx0ZXJzLnB1c2goLi4uY29sbGFwc2VGaWx0ZXIuZmlsdGVycyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGZpbHRlckdyb3VwcyA9IFtjb2xsYXBzZUZpbHRlcl07XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBheWxvYWQ6IERlY0ZpbHRlciA9IHt9O1xuXG4gICAgICAgIHBheWxvYWQubGltaXQgPSB0aGlzLmxpbWl0O1xuXG4gICAgICAgIGlmIChmaWx0ZXJHcm91cHMpIHtcblxuICAgICAgICAgIHBheWxvYWQuZmlsdGVyR3JvdXBzID0gZmlsdGVyR3JvdXBzO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb2x1bW5zU29ydENvbmZpZykge1xuXG4gICAgICAgICAgcGF5bG9hZC5jb2x1bW5zID0gdGhpcy5jb2x1bW5zU29ydENvbmZpZztcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjbGVhckFuZFJlbG9hZFJlcG9ydCAmJiB0aGlzLnJlcG9ydCkge1xuXG4gICAgICAgICAgcGF5bG9hZC5wYWdlID0gdGhpcy5yZXBvcnQucGFnZSArIDE7XG5cbiAgICAgICAgICBwYXlsb2FkLmxpbWl0ID0gdGhpcy5yZXBvcnQubGltaXQ7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQ7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm5leHQoeyBlbmRwb2ludDogdGhpcy5lbmRwb2ludCwgcGF5bG9hZDogcGF5bG9hZCwgY2JrOiByZXMsIGNsZWFyOiBjbGVhckFuZFJlbG9hZFJlcG9ydCB9KTtcblxuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUZldGNoTWV0aG9kKSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm5leHQoKTtcblxuICAgICAgfSBlbHNlIGlmICghdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMucm93cykge1xuXG4gICAgICAgICAgICByZWooJ05vIGVuZHBvaW50LCBjdXN0b21GZXRjaE1ldGhvZCBvciByb3dzIHNldCcpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgfSwgMSk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lc1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIubmFtZSA9IHRoaXMubmFtZTtcblxuXG4gICAgICBpZiAodGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQubmFtZSA9IHRoaXMubmFtZTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21GZXRjaE1ldGhvZCkge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5jdXN0b21GZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2Q7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VydmljZSA9IHRoaXMuc2VydmljZTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldFJvd3NcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2V0Um93cyhyb3dzID0gW10pIHtcblxuICAgIHRoaXMucmVwb3J0ID0ge1xuXG4gICAgICBwYWdlOiAxLFxuXG4gICAgICByZXN1bHQ6IHtcblxuICAgICAgICByb3dzOiByb3dzLFxuXG4gICAgICAgIGNvdW50OiByb3dzLmxlbmd0aFxuXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZGV0ZWN0TGFzdFBhZ2Uocm93cywgcm93cy5sZW5ndGgpO1xuXG4gICAgdGhpcy51cGRhdGVDb250ZW50Q2hpbGRyZW4oKTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyKCkge1xuXG4gICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbiA9IHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJcbiAgICAucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgxNTApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICkuc3Vic2NyaWJlKHRoaXMuYWN0QnlTY3JvbGxQb3NpdGlvbik7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbikge1xuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyRGF0YVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEZpbHRlckRhdGEoKSB7XG4gICAgdGhpcy5yZWFjdGl2ZVJlcG9ydCA9IHRoaXMuZmlsdGVyRGF0YVxuICAgIC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDE1MCksIC8vIGF2b2lkIG11aWx0aXBsZSByZXF1ZXN0IHdoZW4gdGhlIGZpbHRlciBvciB0YWIgY2hhbmdlIHRvbyBmYXN0XG4gICAgICBzd2l0Y2hNYXAoKGZpbHRlckRhdGE6IEZpbHRlckRhdGEpID0+IHtcblxuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHVuZGVmaW5lZCk7XG5cbiAgICAgICAgY29uc3QgZmV0Y2hNZXRob2Q6IERlY0xpc3RGZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QgfHwgdGhpcy5zZXJ2aWNlLmdldDtcblxuICAgICAgICBjb25zdCBlbmRwb2ludCA9IGZpbHRlckRhdGEgPyBmaWx0ZXJEYXRhLmVuZHBvaW50IDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGNvbnN0IHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMgPSB0aGlzLmdldFBheWxvYWRXaXRoU2VhcmNoVHJhbnNmb3JtZWRJbnRvU2VhcmNoYWJsZVByb3BlcnRpZXMoKTtcblxuICAgICAgICBpZiAoZmlsdGVyRGF0YSAmJiBmaWx0ZXJEYXRhLmNsZWFyKSB7XG4gICAgICAgICAgdGhpcy5zZXRSb3dzKFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZldGNoTWV0aG9kKGVuZHBvaW50LCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzKVxuICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICBvYnNlcnZhYmxlLm5leHQocmVzKTtcblxuICAgICAgICAgIGlmIChmaWx0ZXJEYXRhICYmIGZpbHRlckRhdGEuY2JrKSB7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyB3YWl0IGZvciBzdWJzY3JpYmVycyB0byByZWZyZXNoIHRoZWlyIHJvd3NcblxuICAgICAgICAgICAgICBmaWx0ZXJEYXRhLmNiayhuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG5cbiAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgICB9KVxuXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcygpIHtcblxuICAgIGNvbnN0IHBheWxvYWRDb3B5ID0gey4uLnRoaXMucGF5bG9hZH07XG5cbiAgICBpZiAocGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzICYmIHRoaXMuc2VhcmNoYWJsZVByb3BlcnRpZXMpIHtcblxuICAgICAgcGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzID0gWy4uLnRoaXMucGF5bG9hZC5maWx0ZXJHcm91cHNdO1xuXG4gICAgICBjb25zdCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoID0gdGhpcy5nZXRGaWx0ZXJHcm91cFRoYXRDb250YWluc1RoZUJhc2ljU2VhcmNoKHBheWxvYWRDb3B5LmZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIGlmIChmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKSB7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXJHcm91cChwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gsIHBheWxvYWRDb3B5KTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGF5bG9hZENvcHk7XG5cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLnBheWxvYWQ7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKGZpbHRlckdyb3Vwc01vZGVsLCBwYXlsb2FkKSB7XG5cbiAgICBjb25zdCBiYXNpY1NlYXJjaCA9IGZpbHRlckdyb3Vwc01vZGVsLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnByb3BlcnR5ID09PSAnc2VhcmNoJyk7XG5cbiAgICBjb25zdCBiYXNpY1NlYXJjaEluZGV4ID0gZmlsdGVyR3JvdXBzTW9kZWwuZmlsdGVycy5pbmRleE9mKGJhc2ljU2VhcmNoKTtcblxuICAgIHRoaXMuc2VhcmNoYWJsZVByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG5cbiAgICAgIGNvbnN0IG5ld0ZpbHRlckdyb3VwOiBGaWx0ZXJHcm91cCA9IHtcbiAgICAgICAgZmlsdGVyczogWy4uLmZpbHRlckdyb3Vwc01vZGVsLmZpbHRlcnNdXG4gICAgICB9O1xuXG4gICAgICBuZXdGaWx0ZXJHcm91cC5maWx0ZXJzW2Jhc2ljU2VhcmNoSW5kZXhdID0ge1xuICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgIHZhbHVlOiBiYXNpY1NlYXJjaC52YWx1ZVxuICAgICAgfTtcblxuICAgICAgcGF5bG9hZC5maWx0ZXJHcm91cHMucHVzaChuZXdGaWx0ZXJHcm91cCk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2hJbmRleCA9IGZpbHRlckdyb3Vwcy5pbmRleE9mKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgZmlsdGVyR3JvdXBzLnNwbGljZShmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoSW5kZXgsIDEpO1xuXG4gIH1cblxuICBwcml2YXRlIGdldEZpbHRlckdyb3VwVGhhdENvbnRhaW5zVGhlQmFzaWNTZWFyY2goZmlsdGVyR3JvdXBzKSB7XG5cbiAgICByZXR1cm4gZmlsdGVyR3JvdXBzLmZpbmQoZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICBjb25zdCBiYXNpY1NlcmNoRmlsdGVyID0gZmlsdGVyR3JvdXAuZmlsdGVycyA/IGZpbHRlckdyb3VwLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnByb3BlcnR5ID09PSAnc2VhcmNoJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybiBiYXNpY1NlcmNoRmlsdGVyID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpIHtcbiAgICB0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uID0gdGhpcy5yZWFjdGl2ZVJlcG9ydFxuICAgIC5waXBlKFxuICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhICYmIGRhdGEucmVzdWx0ICYmIGRhdGEucmVzdWx0LnJvd3MpIHtcblxuICAgICAgICBpZiAoIXRoaXMuY2xlYXJBbmRSZWxvYWRSZXBvcnQpIHtcbiAgICAgICAgICBkYXRhLnJlc3VsdC5yb3dzID0gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MuY29uY2F0KGRhdGEucmVzdWx0LnJvd3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXBvcnQgPSBkYXRhO1xuXG4gICAgICAgIHRoaXMucG9zdFNlYXJjaC5lbWl0KGRhdGEpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29udGVudENoaWxkcmVuKCk7XG5cbiAgICAgICAgdGhpcy5kZXRlY3RMYXN0UGFnZShkYXRhLnJlc3VsdC5yb3dzLCBkYXRhLnJlc3VsdC5jb3VudCk7XG5cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdExhc3RQYWdlKHJvd3MsIGNvdW50KSB7XG5cbiAgICBjb25zdCBudW1iZXJPZnJvd3MgPSByb3dzLmxlbmd0aDtcblxuICAgIGNvbnN0IGVtcHRMaXN0ID0gbnVtYmVyT2Zyb3dzID09PSAwO1xuXG4gICAgY29uc3Qgc2luZ2xlUGFnZUxpc3QgPSBudW1iZXJPZnJvd3MgPT09IGNvdW50O1xuXG4gICAgdGhpcy5pc0xhc3RQYWdlID0gZW1wdExpc3QgfHwgc2luZ2xlUGFnZUxpc3Q7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKSB7XG4gICAgaWYgKHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB1cGRhdGVDb250ZW50Q2hpbGRyZW5cbiAgICpcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlQ29udGVudENoaWxkcmVuKCkge1xuXG4gICAgY29uc3Qgcm93cyA9IHRoaXMuZW5kcG9pbnQgPyB0aGlzLnJlcG9ydC5yZXN1bHQucm93cyA6IHRoaXMucm93cztcbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLmdyaWQucm93cyA9IHJvd3M7XG4gICAgfVxuICAgIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICB0aGlzLnRhYmxlLnJvd3MgPSByb3dzO1xuICAgIH1cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyLmNvdW50ID0gdGhpcy5yZXBvcnQucmVzdWx0LmNvdW50O1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHJlZ2lzdGVyQ2hpbGRXYXRjaGVyc1xuICAgKlxuICAgKiBXYXRjaCBmb3IgY2hpbGRyZW4gb3V0cHV0c1xuICAgKi9cbiAgcHJpdmF0ZSByZWdpc3RlckNoaWxkV2F0Y2hlcnMoKSB7XG5cbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLndhdGNoR3JpZFJvd0NsaWNrKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMud2F0Y2hUYWJsZVJvd0NsaWNrKCk7XG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEdyaWRSb3dDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEdyaWRSb3dDbGljaygpIHtcbiAgICB0aGlzLmdyaWQucm93Q2xpY2suc3Vic2NyaWJlKCgkZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucm93Q2xpY2suZW1pdCgkZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hUYWJsZVJvd0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFibGVSb3dDbGljaygpIHtcbiAgICB0aGlzLnRhYmxlLnJvd0NsaWNrLnN1YnNjcmliZSgoJGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJvd0NsaWNrLmVtaXQoJGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlci5zZWFyY2guc3Vic2NyaWJlKGV2ZW50ID0+IHtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJNb2RlICE9PSBldmVudC5maWx0ZXJNb2RlKSB7XG5cbiAgICAgICAgICBpZiAoZXZlbnQuZmlsdGVyTW9kZSA9PT0gJ3RhYnMnKSB7IC8vIGlmIGNoYW5naW5nIGZyb20gY29sbGFwc2UgdG8gdGFicywgY2xlYXIgdGhlIHJlc3VsdHMgYmVmb3JlIHNob3dpbmcgdGhlIHJvd3NcbiAgICAgICAgICAgIHRoaXMuc2V0Um93cyhbXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gZXZlbnQuZmlsdGVyTW9kZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyTW9kZSA9PT0gJ3RhYnMnKSB7XG5cbiAgICAgICAgICB0aGlzLm9wZW5uZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKVxuICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5yZWNvdW50KSB7XG4gICAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgaWYgKHRoaXMub3Blbm5lZENvbGxhcHNhYmxlKSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZEJ5T3Blbm5lZENvbGxhcHNlKHRoaXMub3Blbm5lZENvbGxhcHNhYmxlKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0gZXZlbnQuY2hpbGRyZW4gPyBldmVudC5jaGlsZHJlbiA6IFtdO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLmZpbHRlclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5maWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFNjcm9sbFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFNjcm9sbCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyQ2xhc3MpWzBdO1xuICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLnNjcm9sbGFibGVDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5lbWl0U2Nyb2xsRXZlbnQsIHRydWUpO1xuICAgICAgfVxuICAgIH0sIDEpO1xuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nU2Nyb2xsXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1Njcm9sbCgpIHtcbiAgICBpZiAodGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLnNjcm9sbGFibGVDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5lbWl0U2Nyb2xsRXZlbnQsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJzQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnRhYkNoYW5nZS5zdWJzY3JpYmUodGFiID0+IHtcbiAgICAgICAgdGhpcy5kZXRlY3RMaXN0TW9kZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9UYWJzQ2hhbmdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hUYWJsZVNvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVNvcnQoKSB7XG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uID0gdGhpcy50YWJsZS5zb3J0LnN1YnNjcmliZShjb2x1bW5zU29ydENvbmZpZyA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnNTb3J0Q29uZmlnICE9PSBjb2x1bW5zU29ydENvbmZpZykge1xuICAgICAgICAgIHRoaXMuY29sdW1uc1NvcnRDb25maWcgPSBjb2x1bW5zU29ydENvbmZpZztcbiAgICAgICAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1RhYmxlU29ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJsZVNvcnQoKSB7XG4gICAgaWYgKHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYmxlU29ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IERlY0xpc3RUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9saXN0LXRhYmxlLWNvbHVtbi9saXN0LXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjTGlzdFRhYmxlQ29tcG9uZW50LFxuICAgIERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0xpc3RUYWJsZUNvbXBvbmVudCxcbiAgICBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJsZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1mb290ZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0Rm9vdGVyQ29tcG9uZW50IHt9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWFkdmFuY2VkLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1hY3Rpb25zJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBY3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjTGlzdEFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtYWN0aW9ucy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0xpc3RBY3Rpb25zQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RBY3Rpb25zQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWN0aW9uc01vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0U25hY2tCYXJNb2R1bGUsIE1hdEV4cGFuc2lvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRGVjTGlzdEZpbHRlck1vZHVsZSB9IGZyb20gJy4vbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIubW9kdWxlJztcblxuaW1wb3J0IHsgRGVjTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RUYWJsZU1vZHVsZSB9IGZyb20gJy4vbGlzdC10YWJsZS9saXN0LXRhYmxlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNMaXN0Rm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZvb3Rlci9saXN0LWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEFkdmFuY2VkRmlsdGVyTW9kdWxlIH0gZnJvbSAnLi9saXN0LWFkdmFuY2VkLWZpbHRlci9saXN0LWFkdmFuY2VkLWZpbHRlci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLXNwaW5uZXIvZGVjLXNwaW5uZXIubW9kdWxlJztcbmltcG9ydCB7IERlY0xpc3RBY3Rpb25zTW9kdWxlIH0gZnJvbSAnLi9saXN0LWFjdGlvbnMvbGlzdC1hY3Rpb25zLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNMYWJlbE1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLWxhYmVsL2RlYy1sYWJlbC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY0xhYmVsTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE5neERhdGF0YWJsZU1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIERlY0xpc3RBZHZhbmNlZEZpbHRlck1vZHVsZSxcbiAgICBEZWNMaXN0RmlsdGVyTW9kdWxlLFxuICAgIERlY0xpc3RUYWJsZU1vZHVsZSxcbiAgICBEZWNTcGlubmVyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNMaXN0Q29tcG9uZW50LFxuICAgIERlY0xpc3RHcmlkQ29tcG9uZW50LFxuICAgIERlY0xpc3RGb290ZXJDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNMaXN0Q29tcG9uZW50LFxuICAgIERlY0xpc3RHcmlkQ29tcG9uZW50LFxuICAgIERlY0xpc3RUYWJsZU1vZHVsZSxcbiAgICBEZWNMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgIERlY0xpc3RGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdEFkdmFuY2VkRmlsdGVyTW9kdWxlLFxuICAgIERlY0xpc3RBY3Rpb25zTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtcGFnZS1mb3JiaWRlbicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2UtZm9yYmlkZW4td3JhcHBlclwiPlxuICA8aDE+e3snbGFiZWwucGFnZS1mb3JiaWRlbicgfCB0cmFuc2xhdGV9fTwvaDE+XG4gIDxwPnt7J2xhYmVsLnBhZ2UtZm9yYmlkZW4taGVscCcgfCB0cmFuc2xhdGV9fTwvcD5cbiAgPHA+PHNtYWxsPlJlZjoge3twcmV2aW91c1VybH19PC9zbWFsbD48L3A+XG4gIDxpbWcgc3JjPVwiaHR0cDovL3MzLXNhLWVhc3QtMS5hbWF6b25hd3MuY29tL3N0YXRpYy1maWxlcy1wcm9kL3BsYXRmb3JtL2RlY29yYTMucG5nXCI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AucGFnZS1mb3JiaWRlbi13cmFwcGVye3BhZGRpbmctdG9wOjEwMHB4O3RleHQtYWxpZ246Y2VudGVyfWltZ3t3aWR0aDoxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQYWdlRm9yYmlkZW5Db21wb25lbnQge1xuXG4gIHByZXZpb3VzVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZClcbiAgICApXG4gICAgLnN1YnNjcmliZSgoZTogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRvY3VtZW50LnJlZmVycmVyIHx8IGUudXJsO1xuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjUGFnZUZvcmJpZGVuQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlLWZvcmJpZGVuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1BhZ2VGb3JiaWRlbkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUGFnZUZvcmJpZGVuQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUGFnZUZvcmJpZGVuTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtcGFnZS1ub3QtZm91bmQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYWdlLW5vdC1mb3VuZC13cmFwcGVyXCI+XG4gIDxoMT57eydsYWJlbC5wYWdlLW5vdC1mb3VuZCcgfCB0cmFuc2xhdGV9fTwvaDE+XG4gIDxwPnt7J2xhYmVsLnBhZ2Utbm90LWZvdW5kLWhlbHAnIHwgdHJhbnNsYXRlfX08L3A+XG4gIDxwPnt7cHJldmlvdXNVcmx9fTwvcD5cbiAgPGltZyBzcmM9XCJodHRwOi8vczMtc2EtZWFzdC0xLmFtYXpvbmF3cy5jb20vc3RhdGljLWZpbGVzLXByb2QvcGxhdGZvcm0vZGVjb3JhMy5wbmdcIj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5wYWdlLW5vdC1mb3VuZC13cmFwcGVye3BhZGRpbmctdG9wOjEwMHB4O3RleHQtYWxpZ246Y2VudGVyfWltZ3t3aWR0aDoxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQYWdlTm90Rm91bmRDb21wb25lbnQge1xuXG4gIHByZXZpb3VzVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIHJvdXRlci5ldmVudHNcbiAgICAucGlwZShcbiAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoKGU6IE5hdmlnYXRpb25FbmQpID0+IHtcbiAgICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGUudXJsO1xuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjUGFnZU5vdEZvdW5kQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlLW5vdC1mb3VuZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNQYWdlTm90Rm91bmRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1BhZ2VOb3RGb3VuZENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1BhZ2VOb3RGb3VuZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIgIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IEZBTExCQUNLX0lNQUdFID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQkNBUUFBQUMxSEF3Q0FBQUFBbUpMUjBRQS80ZVB6TDhBQUFBSmNFaFpjd0FBQ3hNQUFBc1RBUUNhbkJnQUFBQUxTVVJCVkFqWFkyQmdBQUFBQXdBQklOV1V4d0FBQUFCSlJVNScgK1xuJ0Vya0pnZ2c9PSc7XG5cbmNvbnN0IExPQURJTkdfSU1BR0UgPSAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpTVRVd0lpQm9aV2xuYUhROUlqRTFNQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUJ3Y21WelpYSjJaVUZ6Y0dWamRGSmhkR2x2UFNKNFRXbGtXVTFwWkNJZycgK1xuJ1kyeGhjM005SW5WcGJDMXlhVzVuSWo0OGNHRjBhQ0JtYVd4c1BTSnViMjVsSWlCamJHRnpjejBpWW1zaUlHUTlJazB3SURCb01UQXdkakV3TUVnd2VpSXZQanhqYVhKamJHVWdZM2c5SWpjMUlpQmplVDBpTnpVaUlISTlJalExSWlCemRISnZhMlV0WkdGemFHRnljbUY1UFNJeU1qWXVNVGsxSURVMkxqVTBPU0knICtcbidnYzNSeWIydGxQU0lqTWpNeVpUTTRJaUJtYVd4c1BTSnViMjVsSWlCemRISnZhMlV0ZDJsa2RHZzlJakV3SWo0OFlXNXBiV0YwWlZSeVlXNXpabTl5YlNCaGRIUnlhV0oxZEdWT1lXMWxQU0owY21GdWMyWnZjbTBpSUhSNWNHVTlJbkp2ZEdGMFpTSWdkbUZzZFdWelBTSXdJRGMxSURjMU96RTRNQ0EzTlNBM05UJyArXG4nc3pOakFnTnpVZ056VTdJaUJyWlhsVWFXMWxjejBpTURzd0xqVTdNU0lnWkhWeVBTSXhjeUlnY21Wd1pXRjBRMjkxYm5ROUltbHVaR1ZtYVc1cGRHVWlJR0psWjJsdVBTSXdjeUl2UGp3dlkybHlZMnhsUGp3dmMzWm5QZz09JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXByb2R1Y3Qtc3BpbicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyXCIgKm5nSWY9XCJzY2VuZXNcIj5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwibG9hZGluZ0ltYWdlcyA/IHRydWUgOiBmYWxzZVwiPlxuXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIGNsYXNzPVwib3ZlcmxheVwiPlxuICAgICAgPCEtLSBMb2FkaW5nIHNwaW5uZXIgLS0+XG4gICAgICA8ZGl2IFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1pbWFnZSc6J3VybCgnICsgbG9hZGluZ0ltYWdlICsgJyknfVwiPnt7bG9hZGVyUGVyY2VudGFnZSgpfX0lPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiIGNsYXNzPVwib3ZlcmxheVwiPlxuXG4gICAgICA8IS0tIE92ZXJsYXkgb3ZlciB0aGUgaW1hZ2UgKGhhbmQgaWNvbikgLS0+XG4gICAgICA8aW1nIGNsYXNzPVwiZnJhbWVcIiAqbmdJZj1cIiFvbmx5TW9kYWxcIiBzcmM9XCIvL3MzLXNhLWVhc3QtMS5hbWF6b25hd3MuY29tL3N0YXRpYy1maWxlcy1wcm9kL3BsYXRmb3JtL2RyYWctaG9yaXpvbnRhbGx5LnBuZ1wiIGFsdD1cIlwiIChjbGljayk9XCJvbmx5TW9kYWwgPyAnJyA6IHN0YXJ0KCRldmVudClcIj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG4gIDxkaXYgW25nU3dpdGNoXT1cInN0YXJ0ZWQgPyB0cnVlIDogZmFsc2VcIj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cInRydWVcIiBjbGFzcz1cImZyYW1lXCI+XG4gICAgICA8IS0tIEltYWdlcyAtLT5cbiAgICAgIDxpbWcgKm5nRm9yPVwibGV0IHNjZW5lIG9mIHNjZW5lczsgbGV0IGkgPSBpbmRleDtcIlxuICAgICAgICBbc3JjXT1cInNjZW5lXCJcbiAgICAgICAgZHJhZ2dhYmxlPVwiZmFsc2VcIlxuICAgICAgICBjbGFzcz1cIm5vLWRyYWcgaW1hZ2Utb25seVwiXG4gICAgICAgIChsb2FkKT1cIm1hcmtBc0xvYWRlZCgkZXZlbnQpXCJcbiAgICAgICAgW25nQ2xhc3NdPVwiZnJhbWVTaG93biA9PT0gaSAmJiAhbG9hZGluZ0ltYWdlcyA/ICdjdXJyZW50LXNjZW5lJyA6ICduZXh0LXNjZW5lJ1wiPlxuXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiIGNsYXNzPVwiZnJhbWVcIj5cblxuICAgICAgPCEtLSBQbGFjZWhvbGRlciBpbWFnZSAtLT5cbiAgICAgIDxpbWdcbiAgICAgICAgW3NyY109XCJzY2VuZXNbZnJhbWVTaG93bl1cIlxuICAgICAgICBkcmFnZ2FibGU9XCJmYWxzZVwiXG4gICAgICAgIGNsYXNzPVwibm8tZHJhZ1wiXG4gICAgICAgIChjbGljayk9XCJvbmx5TW9kYWwgPyBvbk9wZW4oJGV2ZW50KSA6IHN0YXJ0KCRldmVudClcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2ltYWdlLW9ubHknOiBvbmx5TW9kYWx9XCI+XG5cbiAgICAgIDwhLS0gTG9hZGluZyBzcGlubmVyIC0tPlxuICAgICAgPGJ1dHRvblxuICAgICAgKm5nSWY9XCJzaG93T3BlbkRpYWxvZ0J1dHRvbiAmJiAhb25seU1vZGFsXCJcbiAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgKGNsaWNrKT1cIm9uT3BlbigkZXZlbnQpXCJcbiAgICAgIFttYXRUb29sdGlwXT1cIidsYWJlbC5vcGVuJyB8IHRyYW5zbGF0ZVwiXG4gICAgICBjbGFzcz1cImRpYWxvZy1idXR0b25cIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjb2xvcj1cImRlZmF1bHRcIj5cbiAgICAgICAgPG1hdC1pY29uIGFyaWEtbGFiZWw9XCJTd2FwIGJldHdlZW4gUmVmZXJlbmNlIGFuZCBSZW5kZXIgaW1hZ2VzXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnID5mdWxsc2NyZWVuPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AucHJvZHVjdC1zcGlubmVyLXdyYXBwZXJ7ZGlzcGxheTpibG9jaztwb3NpdGlvbjpyZWxhdGl2ZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXI6aG92ZXIgLmZyYW1le29wYWNpdHk6MX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXI6aG92ZXIgLm92ZXJsYXl7ZGlzcGxheTpub25lfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWV7ZGlzcGxheTpibG9jazt3aWR0aDoxMDAlO2JhY2tncm91bmQtc2l6ZTpjb250YWluO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlciBjZW50ZXI7b3BhY2l0eTouNTt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzIGVhc2U7Y3Vyc29yOm1vdmV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZS5pbWFnZS1vbmx5e29wYWNpdHk6MTtjdXJzb3I6cG9pbnRlcn0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lIC5jdXJyZW50LXNjZW5le2Rpc3BsYXk6YmxvY2t9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZSAubmV4dC1zY2VuZXtkaXNwbGF5Om5vbmV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZSBpbWd7d2lkdGg6MTAwJX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLm92ZXJsYXl7cG9zaXRpb246YWJzb2x1dGU7cGFkZGluZzoxMHB4O3dpZHRoOjIwJTttYXJnaW4tbGVmdDo0MCU7bWFyZ2luLXRvcDo0MCU7ei1pbmRleDoxO29wYWNpdHk6LjQ7dHJhbnNpdGlvbjpvcGFjaXR5IC4ycyBlYXNlfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUubG9hZGVye3dpZHRoOjUwJTttYXJnaW46YXV0b30ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmRpYWxvZy1idXR0b257cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MH0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmxvYWRlci1wZXJjZW50YWdle3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo0NyU7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjtvcGFjaXR5Oi41fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1Byb2R1Y3RTcGluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmcmFtZVNob3duOiBudW1iZXI7XG4gIHNjZW5lczogc3RyaW5nW107XG4gIGxvYWRpbmdJbWFnZXM6IGJvb2xlYW47XG4gIHBsYWNlaG9sZGVyU2NlbmU6IHN0cmluZztcbiAgc3RhcnRlZDogYm9vbGVhbjtcbiAgdG90YWxJbWFnZXNMb2FkZWQ6IG51bWJlcjtcbiAgbG9hZGluZ0ltYWdlID0gTE9BRElOR19JTUFHRTtcblxuICBASW5wdXQoKSBsb29waW5nID0gZmFsc2U7XG4gIEBJbnB1dCgpIG9ubHlNb2RhbCA9IGZhbHNlO1xuICBASW5wdXQoKSBGQUxMQkFDS19JTUFHRTogc3RyaW5nID0gRkFMTEJBQ0tfSU1BR0U7XG4gIEBJbnB1dCgpIHN0YXJ0SW5DZW50ZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd09wZW5EaWFsb2dCdXR0b24gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzcGluKHNwaW46IGFueSkge1xuICAgIGlmIChzcGluKSB7XG4gICAgICBjb25zdCBzY2VuZXMgPSB0aGlzLmxvYWRTY2VuZXMoc3Bpbik7XG5cbiAgICAgIGNvbnN0IHNjZW5lc0NoYW5nZWQgPSAhdGhpcy5zY2VuZXMgfHwgKHNjZW5lcyAmJiB0aGlzLnNjZW5lcy5qb2luKCkgIT09IHNjZW5lcy5qb2luKCkpO1xuXG4gICAgICBpZiAoc2NlbmVzQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLnJlc2V0U2NlbmVzRGF0YShzY2VuZXMpO1xuICAgICAgICAvLyB0aGlzLnJlc2V0U3RhcnRQb3NpdGlvbkJhc2VkT25Db21wYW55KHNwaW4sIHNjZW5lcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NwaW4gPSBzcGluO1xuXG4gICAgfVxuICB9XG5cbiAgZ2V0IHNwaW4oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fc3BpbjtcbiAgfVxuXG4gIEBPdXRwdXQoKSBvcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBzY2VuZXNMZW4gPSAwO1xuICBwcml2YXRlIG1vdXNlRG93biA9IGZhbHNlO1xuICBwcml2YXRlIGxhc3RNb3VzZUV2ZW50OiBNb3VzZUV2ZW50O1xuICBwcml2YXRlIGNvbnRhaW5lcldpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgaW50ZXJ2YWw6IG51bWJlcjtcbiAgcHJpdmF0ZSBwb3NpdGlvbkRpZmY6IG51bWJlcjtcbiAgcHJpdmF0ZSBfc3BpbjogYW55O1xuXG4gIC8qXG4gICogTGlzdGVuaW5nIGZvciBtb3VzZSBldmVudHNcbiAgKiBtb3VzZXVwIGluIG5nT25Jbml0IGJlY2F1c2UgaXQgdXNlZCBkb2NjdW1lbnQgYXMgcmVmZXJlbmNlXG4gICovXG5cbiAgLy8gYXZvaWQgZHJhZ1xuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICBvbkRyYWdTdGFydChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gbW91c2Vkb3duXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG9uTW91c2Vkb3duKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xuICAgIHRoaXMubGFzdE1vdXNlRXZlbnQgPSBldmVudDtcbiAgfVxuXG4gIC8vIG1vdXNlbW92ZVxuICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCddKVxuICBvbk1vdXNlbW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vdXNlRG93biAmJiB0aGlzLnN0YXJ0ZWQpIHtcblxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihldmVudCk7XG5cbiAgICAgIC8vIFRoZSB3aWR0aCBpcyBkaXZpZGVkIGJ5IHRoZSBhbW91bnQgb2YgaW1hZ2VzLiBNb3ZpbmcgZnJvbSAwIHRvIDEwMCB3aWxsIHR1cm4gMzYww4LCsFxuICAgICAgaWYgKE1hdGguYWJzKHRoaXMucG9zaXRpb25EaWZmKSA+PSB0aGlzLmludGVydmFsKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uRGlmZiA8IDApIHtcbiAgICAgICAgICB0aGlzLmdvUmlnaHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmdvTGVmdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFzdE1vdXNlRXZlbnQgPSBldmVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZnJhbWVTaG93biA9IDA7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbkdsb2JhbCgnZG9jdW1lbnQnLCAnbW91c2V1cCcsIChldmVudCkgPT4ge1xuICAgICAgaWYgKHRoaXMubW91c2VEb3duKSB7XG4gICAgICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG1hcmtBc0xvYWRlZCA9IChldmVudCkgPT4ge1xuICAgIHRoaXMudG90YWxJbWFnZXNMb2FkZWQrKztcbiAgICBpZiAodGhpcy50b3RhbEltYWdlc0xvYWRlZCA9PT0gdGhpcy5zY2VuZXNMZW4pIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJTY2VuZSA9IHRoaXMuc2NlbmVzWzBdO1xuICAgICAgdGhpcy5sb2FkaW5nSW1hZ2VzID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ29MZWZ0ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnNjZW5lc1t0aGlzLmZyYW1lU2hvd24gLSAxXSkge1xuICAgICAgdGhpcy5mcmFtZVNob3duLS07XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvb3BpbmcpIHtcbiAgICAgIHRoaXMuZnJhbWVTaG93biA9IHRoaXMuc2NlbmVzTGVuIC0gMTtcbiAgICB9XG4gIH1cblxuICBnb1JpZ2h0ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnNjZW5lc1t0aGlzLmZyYW1lU2hvd24gKyAxXSkge1xuICAgICAgdGhpcy5mcmFtZVNob3duKys7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvb3BpbmcpIHtcbiAgICAgIHRoaXMuZnJhbWVTaG93biA9IDA7XG4gICAgfVxuICB9XG5cbiAgc3RhcnQgPSAoJGV2ZW50KTogdm9pZCA9PiB7XG4gICAgdGhpcy5wbGFjZWhvbGRlclNjZW5lID0gTE9BRElOR19JTUFHRTtcbiAgICB0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkID0gMDtcbiAgICB0aGlzLmxvYWRpbmdJbWFnZXMgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gIH1cblxuICBsb2FkZXJQZXJjZW50YWdlID0gKCkgPT4ge1xuICAgIHJldHVybiAodGhpcy5zY2VuZXNMZW4gLSB0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkKSA+IDAgPyAoKDEwMCAvIHRoaXMuc2NlbmVzTGVuKSAqIHRoaXMudG90YWxJbWFnZXNMb2FkZWQpLnRvRml4ZWQoMSkgOiAwO1xuICB9XG5cbiAgb25PcGVuKCRldmVudCkge1xuXG4gICAgdGhpcy5vcGVuLmVtaXQoJGV2ZW50KTtcblxuICB9XG5cbiAgLypcbiAgICpcbiAgICogSU1QT1JUQU5UXG4gICAqXG4gICAqIHJlc2V0U3RhcnRQb3NpdGlvbkJhc2VkT25Db21wYW55XG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHJlc3BvbnNpYmxlIGZvciBlbnN1cmluZyB0aGUgQnVzaW5lc3MgUnVsZSBvZiB0aGUgc3BpbiBzZXF1ZW5jZVxuICAgKiBUaGUgSG9tZSBEZXBvdCBha2EgY3VzdG9tZXIgMTAwLCBoYXZlIGEgcGFydGljdWxhciBiZWhhdmlvciBzdGFydGluZyAxODDDgsK6IGluIHRoZSBtaWRkbGVcbiAgICpcbiAgKi9cbiAgcHJpdmF0ZSByZXNldFN0YXJ0UG9zaXRpb25CYXNlZE9uQ29tcGFueShzcGluLCBzY2VuZXMpIHtcblxuICAgIHRoaXMuc3RhcnRJbkNlbnRlciA9IHNwaW4uY29tcGFueS5pZCA9PT0gMTAwID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy5zdGFydEluQ2VudGVyID0gdGhpcy5zdGFydEluQ2VudGVyICYmIHNjZW5lcy5sZW5ndGggPD0gMTY7XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTY2VuZXNEYXRhKHNjZW5lcykge1xuICAgIHRoaXMucGxhY2Vob2xkZXJTY2VuZSA9IHNjZW5lc1swXTtcbiAgICB0aGlzLnNjZW5lc0xlbiA9IHNjZW5lcy5sZW5ndGg7XG4gICAgdGhpcy5zY2VuZXMgPSBzY2VuZXM7XG4gIH1cblxuICBwcml2YXRlIGxvYWRTY2VuZXMoc3Bpbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzY2VuZXMgPSB0aGlzLmdldFVybHNGcm9tU3lzRmlsZXMoc3Bpbi5kYXRhLnNob3RzKTtcbiAgICAgIHJldHVybiBzY2VuZXMgJiYgc2NlbmVzLmxlbmd0aCA+IDAgPyBzY2VuZXMgOiBbRkFMTEJBQ0tfSU1BR0VdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gW0ZBTExCQUNLX0lNQUdFXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZVBvc2l0aW9uKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0OiBhbnkgPSBldmVudFsndGFyZ2V0J107XG5cbiAgICBpZiAodGhpcy5jb250YWluZXJXaWR0aCAhPT0gdGFyZ2V0LmNsaWVudFdpZHRoKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gIHRhcmdldC5jbGllbnRXaWR0aDtcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSAodGhpcy5jb250YWluZXJXaWR0aCAvIHRoaXMuc2NlbmVzTGVuKSAvIDEuNjtcbiAgICB9XG5cbiAgICB0aGlzLnBvc2l0aW9uRGlmZiA9IGV2ZW50LmNsaWVudFggLSB0aGlzLmxhc3RNb3VzZUV2ZW50LmNsaWVudFg7XG4gIH1cblxuICBwcml2YXRlIGdldFVybHNGcm9tU3lzRmlsZXMoc3lzRmlsZXMpIHtcbiAgICBpZiAoIXN5c0ZpbGVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzeXNGaWxlcy5tYXAoZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWxlLnJlbmRlckZpbGUuZmlsZVVybDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY1Byb2R1Y3RTcGluQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9kdWN0LXNwaW4uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjUHJvZHVjdFNwaW5Db21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1Byb2R1Y3RTcGluQ29tcG9uZW50XG4gIF0sXG59KVxuXG5leHBvcnQgY2xhc3MgRGVjUHJvZHVjdFNwaW5Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBbcm91dGVyTGlua109XCJyb3V0ZXJMaW5rXCIgY2xhc3M9XCJkZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxle291dGxpbmU6MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSByb3V0ZXJMaW5rO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBBZnRlclZpZXdJbml0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LXRvb2xiYXInLFxuICB0ZW1wbGF0ZTogYDxtYXQtdG9vbGJhciBbY29sb3JdPVwiY29sb3JcIiAqbmdJZj1cImluaXRpYWxpemVkXCI+XG5cbiAgPHNwYW4gY2xhc3M9XCJpdGVtcy1pY29uIGl0ZW0tbGVmdFwiICpuZ0lmPVwibGVmdE1lbnVUcmlnZ2VyVmlzaWJsZVwiIChjbGljayk9XCJ0b2dnbGVMZWZ0TWVudS5lbWl0KClcIj5cbiAgICAmIzk3NzY7XG4gIDwvc3Bhbj5cblxuICA8c3BhbiAqbmdJZj1cImN1c3RvbVRpdGxlXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZVwiPjwvbmctY29udGVudD5cbiAgPC9zcGFuPlxuXG4gIDxkaXYgY2xhc3M9XCJyaWJib24ge3tyaWJib259fVwiICpuZ0lmPVwibm90UHJvZHVjdGlvblwiPlxuICAgIDxzcGFuPnt7bGFiZWwgfCB0cmFuc2xhdGV9fTwvc3Bhbj5cbiAgPC9kaXY+XG5cbiAgPHNwYW4gY2xhc3M9XCJkZWMtc2lkZW5hdi10b29sYmFyLWN1c3RvbS1jb250ZW50XCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L3NwYW4+XG5cbiAgPHNwYW4gY2xhc3M9XCJpdGVtcy1zcGFjZXJcIj48L3NwYW4+XG5cbiAgPHNwYW4gY2xhc3M9XCJpdGVtcy1pY29uIGl0ZW0tcmlnaHRcIiAqbmdJZj1cInJpZ2h0TWVudVRyaWdnZXJWaXNpYmxlXCIgKGNsaWNrKT1cInRvZ2dsZVJpZ2h0TWVudS5lbWl0KClcIj5cbiAgICAmIzk3NzY7XG4gIDwvc3Bhbj5cblxuPC9tYXQtdG9vbGJhcj5cbmAsXG4gIHN0eWxlczogW2AuaXRlbXMtc3BhY2Vye2ZsZXg6MSAxIGF1dG99Lml0ZW1zLWljb257Y3Vyc29yOnBvaW50ZXI7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMS4yLC44KTt0cmFuc2Zvcm06c2NhbGUoMS4yLC44KX0uaXRlbXMtaWNvbi5pdGVtLXJpZ2h0e3BhZGRpbmctbGVmdDoxNHB4fS5pdGVtcy1pY29uLml0ZW0tbGVmdHtwYWRkaW5nLXJpZ2h0OjE0cHh9LmRlYy1zaWRlbmF2LXRvb2xiYXItY3VzdG9tLWNvbnRlbnR7cGFkZGluZzowIDE2cHg7d2lkdGg6MTAwJX0ucmliYm9ue3RyYW5zaXRpb246YWxsIC4zcyBlYXNlO3RleHQtdHJhbnNmb3JtOmxvd2VyY2FzZTt0ZXh0LWFsaWduOmNlbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZTtsaW5lLWhlaWdodDo2NHB4O21hcmdpbi1sZWZ0OjRweDtwYWRkaW5nOjAgMjBweDtoZWlnaHQ6NjRweDt3aWR0aDoxNTVweDtjb2xvcjojZmZmO2xlZnQ6MjBweDt0b3A6MH0ucmliYm9uLnJpYmJvbi1oaWRkZW57ZGlzcGxheTpub25lfS5yaWJib246OmJlZm9yZXtjb250ZW50OicnO3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMHZ3O2hlaWdodDo0cHg7ei1pbmRleDoyO3RvcDo2NHB4O2xlZnQ6MH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjU5OXB4KXsucmliYm9uOjpiZWZvcmV7dG9wOjU2cHh9fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcblxuICBpbml0aWFsaXplZDtcblxuICBub3RQcm9kdWN0aW9uID0gdHJ1ZTtcbiAgcmliYm9uID0gJyc7XG4gIGxhYmVsID0gJyc7XG5cbiAgQElucHV0KCkgY29sb3I7XG5cbiAgQElucHV0KCkgZW52aXJvbm1lbnQ7XG5cbiAgQElucHV0KCkgbGVmdE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRydWU7XG5cbiAgQElucHV0KCkgcmlnaHRNZW51VHJpZ2dlclZpc2libGUgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSB0b2dnbGVMZWZ0TWVudTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgdG9nZ2xlUmlnaHRNZW51OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCkgY3VzdG9tVGl0bGU6IERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVudmlyb25tZW50ID09PSAnbG9jYWwnKSB7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24tZ3JlZW4nO1xuICAgICAgdGhpcy5sYWJlbCA9ICdsYWJlbC5sb2NhbCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVudmlyb25tZW50ID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24tYmx1ZSc7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLmRldmVsb3BtZW50JztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdxYScpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1yZWQnO1xuICAgICAgdGhpcy5sYWJlbCA9ICdsYWJlbC5xYSc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVudmlyb25tZW50ID09PSAnYWN0aXZlJykge1xuICAgICAgdGhpcy5yaWJib24gPSAncmliYm9uLWdyZWVuJztcbiAgICAgIHRoaXMubGFiZWwgPSAnbGFiZWwuYWN0aXZlJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub3RQcm9kdWN0aW9uID0gZmFsc2U7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24taGlkZGVuJztcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEFmdGVyVmlld0luaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51LWl0ZW0nLFxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBsZXQtdHJlZUxldmVsPVwidHJlZUxldmVsXCIgI3RlbXBsYXRlPlxuXG4gIDxtYXQtbGlzdC1pdGVtIGNsYXNzPVwiY2xpY2sgZGVjLXNpZGVuYXYtbWVudS1pdGVtXCJcbiAgKGNsaWNrKT1cInN1Yml0ZW1zLmxlbmd0aCA/IHRvZ2dsZVN1Ym1lbnUoKSA6IG9wZW5MaW5rKClcIlxuICBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAnICsgdHJlZUxldmVsLzYgKyAnKSd9XCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaXRlbS13cmFwcGVyXCI+XG5cbiAgICAgIDxkaXYgW25nU3R5bGVdPVwie3BhZGRpbmdMZWZ0OiB0cmVlTGV2ZWwgKiAxNiArICdweCd9XCIgY2xhc3M9XCJpdGVtLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxhICpuZ0lmPVwic3ViaXRlbXMubGVuZ3RoXCIgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInNob3dTdWJtZW51XCI+XG4gICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+PGkgY2xhc3M9XCJhcnJvdyBkb3duXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPjxpIGNsYXNzPVwiYXJyb3cgdXBcIj48L2k+PC9zcGFuPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvYT5cbiAgICA8L2Rpdj5cblxuICA8L21hdC1saXN0LWl0ZW0+XG5cbiAgPGRpdiBjbGFzcz1cInN1Yml0ZW0tbWVudVwiICpuZ0lmPVwic2hvd1N1Ym1lbnVcIj5cblxuICAgIDxkZWMtc2lkZW5hdi1tZW51IFtpdGVtc109XCJzdWJpdGVtc1wiIFt0cmVlTGV2ZWxdPVwidHJlZUxldmVsXCI+PC9kZWMtc2lkZW5hdi1tZW51PlxuXG4gIDwvZGl2PlxuXG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi1tZW51LWl0ZW17aGVpZ2h0OjU2cHghaW1wb3J0YW50O291dGxpbmU6MH0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXJ7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1mbG93OnJvdyBuby13cmFwO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuaXRlbS1jb250ZW50IDo6bmctZGVlcCAubWF0LWljb24sLmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5pdGVtLWNvbnRlbnQgOjpuZy1kZWVwIGl7dmVydGljYWwtYWxpZ246bWlkZGxlO21hcmdpbi1ib3R0b206NXB4O21hcmdpbi1yaWdodDo4cHh9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5yaWdodHt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyl9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5sZWZ0e3RyYW5zZm9ybTpyb3RhdGUoMTM1ZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTM1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLnVwe3RyYW5zZm9ybTpyb3RhdGUoLTEzNWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC0xMzVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuZG93bnt0cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLnRleHQtcmlnaHR7dGV4dC1hbGlnbjpyaWdodH0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5jbGlja3tjdXJzb3I6cG9pbnRlcn0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIGl7Ym9yZGVyOnNvbGlkICMwMDA7Ym9yZGVyLXdpZHRoOjAgMnB4IDJweCAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6NHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIHJvdXRlckxpbms7XG5cbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBfc3ViaXRlbXM6IFF1ZXJ5TGlzdDxEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gIHN0YXJ0ZWQ7XG5cbiAgc2hvd1N1Ym1lbnUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIGdldCBzdWJpdGVtcygpIHtcbiAgICBjb25zdCBzdWJpdGVtcyA9IHRoaXMuX3N1Yml0ZW1zLnRvQXJyYXkoKTtcbiAgICBzdWJpdGVtcy5zcGxpY2UoMCwgMSk7IC8vIHJlbW92ZXMgaXRzZWxmXG4gICAgcmV0dXJuIHN1Yml0ZW1zO1xuICB9XG5cbiAgdG9nZ2xlU3VibWVudSgpIHtcbiAgICB0aGlzLnNob3dTdWJtZW51ID0gIXRoaXMuc2hvd1N1Ym1lbnU7XG4gIH1cblxuICBvcGVuTGluaygpIHtcbiAgICBpZiAodGhpcy5yb3V0ZXJMaW5rKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucm91dGVyTGluayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgaXNOYWtlZCA9IHRoaXMucm91dGVyTGluay5zdGFydHNXaXRoKCcvLycpO1xuICAgICAgICBjb25zdCBpc0h0dHAgPSB0aGlzLnJvdXRlckxpbmsuc3RhcnRzV2l0aCgnaHR0cDovLycpO1xuICAgICAgICBjb25zdCBpc0h0dHBzID0gdGhpcy5yb3V0ZXJMaW5rLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJyk7XG4gICAgICAgIGlmIChpc05ha2VkIHx8IGlzSHR0cCB8fCBpc0h0dHBzKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnJvdXRlckxpbms7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGVyTGlua10pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5yb3V0ZXJMaW5rKSkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSh0aGlzLnJvdXRlckxpbmspO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51LXRpdGxlJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBTVE9SQUdFX0RPTUFJTiA9ICdkZWNTaWRlbmF2Q29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgc2V0U2lkZW5hdlZpc2liaWxpdHkobmFtZSwgdmlzaWJpbGl0eSkge1xuXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRTaWRlbmF2Q29uZmlnKCk7XG5cbiAgICBjb25maWdbbmFtZV0gPSB2aXNpYmlsaXR5O1xuXG4gICAgdGhpcy5zZXRTaWRlbmF2Q29uZmlnKGNvbmZpZyk7XG5cbiAgfVxuXG4gIGdldFNpZGVuYXZWaXNpYmlsaXR5KG5hbWUpIHtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0U2lkZW5hdkNvbmZpZygpO1xuXG4gICAgcmV0dXJuIGNvbmZpZ1tuYW1lXTtcblxuICB9XG5cbiAgcHJpdmF0ZSBzZXRTaWRlbmF2Q29uZmlnKGNvbmYpIHtcblxuICAgIGNvbnN0IGNvbmZTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShjb25mKTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfRE9NQUlOLCBjb25mU3RyaW5nKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTaWRlbmF2Q29uZmlnKCkge1xuXG4gICAgY29uc3QgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfRE9NQUlOKTtcblxuICAgIGlmIChkYXRhKSB7XG5cbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgY29uc3QgbmV3Q29uZmlnOiBhbnkgPSB7fTtcblxuICAgICAgdGhpcy5zZXRTaWRlbmF2Q29uZmlnKG5ld0NvbmZpZyk7XG5cbiAgICAgIHJldHVybiBuZXdDb25maWc7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbnB1dCwgQ29udGVudENoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LWl0ZW0vZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuLy4uL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtbGVmdCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1c3RvbVRpdGxlXCI+XG4gIDxkaXYgY2xhc3M9XCJtZW51LXRpdGxlXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWRlYy1zaWRlbmF2LW1lbnUtdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtc1wiPlxuICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwiaXRlbXMudG9BcnJheSgpXCI+PC9kZWMtc2lkZW5hdi1tZW51PlxuPC9uZy1jb250YWluZXI+YCxcbiAgc3R5bGVzOiBbYC5tZW51LXRpdGxle3BhZGRpbmc6MTZweDtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo3MDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50IHtcblxuICByZWFkb25seSBsZWZ0TWVudVZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIHJlYWRvbmx5IGxlZnRNZW51TW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2lkZScpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcGVuKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMubGVmdE1lbnVWaXNpYmxlLnZhbHVlO1xuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubGVmdE1lbnVWaXNpYmxlLm5leHQodik7XG4gICAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnNldFNpZGVuYXZWaXNpYmlsaXR5KCdsZWZ0TWVudUhpZGRlbicsICF2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbW9kZSh2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmxlZnRNZW51TW9kZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubGVmdE1lbnVNb2RlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdE1lbnVNb2RlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgcGVyc2lzdFZpc2liaWxpdHlNb2RlOiBib29sZWFuO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgaXRlbXM6IFF1ZXJ5TGlzdDxEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCkgY3VzdG9tVGl0bGU6IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIG9wZW5lZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAT3V0cHV0KCkgbW9kZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjU2lkZW5hdlNlcnZpY2U6IERlY1NpZGVuYXZTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVBbmRFeHBvc2VTaWRlbmF2RXZlbnRzKCkge1xuXG4gICAgdGhpcy5sZWZ0TWVudVZpc2libGUuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sZWZ0TWVudU1vZGUuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMubW9kZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIElucHV0LCBDb250ZW50Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS9kZWMtc2lkZW5hdi1tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUvZGVjLXNpZGVuYXYtbWVudS10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vLi4vc2lkZW5hdi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtbWVudS1yaWdodCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1c3RvbVRpdGxlXCI+XG4gIDxkaXYgY2xhc3M9XCJtZW51LXRpdGxlXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWRlYy1zaWRlbmF2LW1lbnUtdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtc1wiPlxuICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwiaXRlbXMudG9BcnJheSgpXCI+PC9kZWMtc2lkZW5hdi1tZW51PlxuPC9uZy1jb250YWluZXI+YCxcbiAgc3R5bGVzOiBbYC5tZW51LXRpdGxle3BhZGRpbmc6MTZweDtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo3MDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCB7XG5cbiAgcmVhZG9ubHkgcmlnaHRNZW51VmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgcmVhZG9ubHkgcmlnaHRNZW51TW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2lkZScpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcGVuKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMucmlnaHRNZW51VmlzaWJsZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucmlnaHRNZW51VmlzaWJsZS5uZXh0KHYpO1xuICAgICAgdGhpcy5kZWNTaWRlbmF2U2VydmljZS5zZXRTaWRlbmF2VmlzaWJpbGl0eSgncmlnaHRNZW51SGlkZGVuJywgIXYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbW9kZSh2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnJpZ2h0TWVudU1vZGUudmFsdWU7XG5cbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnJpZ2h0TWVudU1vZGUubmV4dCh2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgbW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodE1lbnVNb2RlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgcGVyc2lzdFZpc2liaWxpdHlNb2RlOiBib29sZWFuO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgaXRlbXM6IFF1ZXJ5TGlzdDxEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCkgY3VzdG9tVGl0bGU6IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIG9wZW5lZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAT3V0cHV0KCkgbW9kZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjU2lkZW5hdlNlcnZpY2U6IERlY1NpZGVuYXZTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVBbmRFeHBvc2VTaWRlbmF2RXZlbnRzKCkge1xuXG4gICAgdGhpcy5yaWdodE1lbnVWaXNpYmxlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmlnaHRNZW51TW9kZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5tb2RlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ29udGVudENoaWxkLCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LXRvb2xiYXIvZGVjLXNpZGVuYXYtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LWxlZnQvZGVjLXNpZGVuYXYtbWVudS1sZWZ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdFNpZGVuYXYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vc2lkZW5hdi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtc2lkZW5hdi13cmFwZXJcIj5cbiAgPCEtLSBUT09MQkFSIC0tPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwidG9vbGJhclwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LXRvb2xiYXJcIj48L25nLWNvbnRlbnQ+XG4gIDwvbmctY29udGFpbmVyPlxuICA8IS0tIC8gVE9PTEJBUiAtLT5cblxuICA8IS0tIFBST0dSRVNTIEJBUiAtLT5cbiAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhci13cmFwcGVyXCIgKm5nSWY9XCJwcm9ncmVzc0JhclZpc2libGUgfCBhc3luY1wiPlxuICAgIDxtYXQtcHJvZ3Jlc3MtYmFyIG1vZGU9XCJpbmRldGVybWluYXRlXCIgY29sb3I9XCJhY2NlbnRcIj48L21hdC1wcm9ncmVzcy1iYXI+XG4gIDwvZGl2PlxuICA8IS0tIC8gUFJPR1JFU1MgQkFSIC0tPlxuXG4gIDxtYXQtc2lkZW5hdi1jb250YWluZXIgW25nQ2xhc3NdPVwieyd3aXRoLXRvb2xiYXInOiB0b29sYmFyfVwiPlxuXG4gICAgPCEtLSBMRUZUIE1FTlUgLS0+XG4gICAgPG1hdC1zaWRlbmF2ICpuZ0lmPVwibGVmdE1lbnVcIlxuICAgIFttb2RlXT1cImxlZnRNZW51LmxlZnRNZW51TW9kZSB8IGFzeW5jXCJcbiAgICBbb3BlbmVkXT1cImxlZnRNZW51LmxlZnRNZW51VmlzaWJsZSB8IGFzeW5jXCJcbiAgICBwb3NpdGlvbj1cInN0YXJ0XCJcbiAgICAob3BlbmVkQ2hhbmdlKT1cImxlZnRTaWRlbmF2T3BlbmVkQ2hhbmdlKCRldmVudClcIlxuICAgICNsZWZ0U2lkZW5hdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LW1lbnUtbGVmdFwiPjwvbmctY29udGVudD5cbiAgICA8L21hdC1zaWRlbmF2PlxuICAgIDwhLS0gLyBMRUZUIE1FTlUgLS0+XG5cbiAgICA8IS0tIENPTlRFTlQgLS0+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICA8IS0tIC8gQ09OVEVOVCAtLT5cblxuICAgIDwhLS0gUklHSFQgTUVOVSAtLT5cbiAgICA8bWF0LXNpZGVuYXYgKm5nSWY9XCJyaWdodE1lbnVcIlxuICAgIFttb2RlXT1cInJpZ2h0TWVudS5yaWdodE1lbnVNb2RlIHwgYXN5bmNcIlxuICAgIFtvcGVuZWRdPVwicmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUgfCBhc3luY1wiXG4gICAgcG9zaXRpb249XCJlbmRcIlxuICAgIChvcGVuZWRDaGFuZ2UpPVwicmlnaHRTaWRlbmF2T3BlbmVkQ2hhbmdlKCRldmVudClcIlxuICAgICNyaWdodFNpZGVuYXY+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi1tZW51LXJpZ2h0XCI+PC9uZy1jb250ZW50PlxuICAgIDwvbWF0LXNpZGVuYXY+XG4gICAgPCEtLSAvIFJJR0hUIE1FTlUgLS0+XG5cbiAgPC9tYXQtc2lkZW5hdi1jb250YWluZXI+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lcntoZWlnaHQ6MTAwdmh9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyLndpdGgtdG9vbGJhcntoZWlnaHQ6Y2FsYygxMDB2aCAtIDY0cHgpfS5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lciAubWF0LXNpZGVuYXZ7d2lkdGg6MjU2cHh9LmRlYy1zaWRlbmF2LXdyYXBlciAucHJvZ3Jlc3MtYmFyLXdyYXBwZXJ7cG9zaXRpb246Zml4ZWQ7dG9wOjYwcHg7bGVmdDowO3dpZHRoOjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHJlYWRvbmx5IHByb2dyZXNzQmFyVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQpIHRvb2xiYXI6IERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50KVxuICBzZXQgbGVmdE1lbnUodjogRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50KSB7XG4gICAgdGhpcy5fbGVmdE1lbnUgPSB2O1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLnNldEluaXRpYWxMZWZ0TWVudVZpc2liaWxpdHlNb2RlcygpO1xuICAgIH1cbiAgfVxuICBnZXQgbGVmdE1lbnUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xlZnRNZW51O1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50KVxuICBzZXQgcmlnaHRNZW51KHY6IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQpIHtcbiAgICB0aGlzLl9yaWdodE1lbnUgPSB2O1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLnNldEluaXRpYWxSaWdodE1lbnVWaXNpYmlsaXR5TW9kZXMoKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHJpZ2h0TWVudSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmlnaHRNZW51O1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnbGVmdFNpZGVuYXYnKSBsZWZ0U2lkZW5hdjogTWF0U2lkZW5hdjtcblxuICBAVmlld0NoaWxkKCdyaWdodFNpZGVuYXYnKSByaWdodFNpZGVuYXY6IE1hdFNpZGVuYXY7XG5cbiAgcHJpdmF0ZSBfbGVmdE1lbnU6IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudDtcblxuICBwcml2YXRlIF9yaWdodE1lbnU6IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQ7XG5cbiAgQElucHV0KClcbiAgc2V0IGxvYWRpbmcodjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5wcm9ncmVzc0JhclZpc2libGUudmFsdWU7XG5cbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsb2FkaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjU2lkZW5hdlNlcnZpY2U6IERlY1NpZGVuYXZTZXJ2aWNlXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgICB0aGlzLmRldGVjdEFuZFNob3dDaGlsZENvbXBvbmVudHMoKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlVG9Ub29sYmFyRXZlbnRzKCk7XG5cbiAgfVxuXG4gIC8vIEFQSSAvL1xuICBvcGVuQm90aE1lbnVzKCkge1xuICAgIHRoaXMub3BlbkxlZnRNZW51KCk7XG4gICAgdGhpcy5vcGVuUmlnaHRNZW51KCk7XG4gIH1cblxuICBvcGVuTGVmdE1lbnUoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIG9wZW5SaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgY2xvc2VCb3RoTWVudXMoKSB7XG4gICAgdGhpcy5jbG9zZUxlZnRNZW51KCk7XG4gICAgdGhpcy5jbG9zZVJpZ2h0TWVudSgpO1xuICB9XG5cbiAgY2xvc2VMZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIGNsb3NlUmlnaHRNZW51KCkge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dChmYWxzZSk7XG4gIH1cblxuICB0b2dnbGVCb3RoTWVudXMoKSB7XG4gICAgdGhpcy50b2dnbGVMZWZ0TWVudSgpO1xuICAgIHRoaXMudG9nZ2xlUmlnaHRNZW51KCk7XG4gIH1cblxuICB0b2dnbGVMZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51Lm9wZW4gPSAhdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICB0b2dnbGVSaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUub3BlbiA9ICF0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgc2V0Qm90aE1lbnVzTW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLnNldExlZnRNZW51TW9kZShtb2RlKTtcbiAgICB0aGlzLnNldFJpZ2h0TWVudU1vZGUobW9kZSk7XG4gIH1cblxuICBzZXRMZWZ0TWVudU1vZGUobW9kZTogJ292ZXInIHwgJ3B1c2gnIHwgJ3NpZGUnID0gJ3NpZGUnKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudU1vZGUubmV4dChtb2RlKTtcbiAgfVxuXG4gIHNldFJpZ2h0TWVudU1vZGUobW9kZTogJ292ZXInIHwgJ3B1c2gnIHwgJ3NpZGUnID0gJ3NpZGUnKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51TW9kZS5uZXh0KG1vZGUpO1xuICB9XG5cbiAgdG9nZ2xlUHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gIXRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgc2hvd1Byb2dyZXNzQmFyKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBoaWRlUHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5wcm9ncmVzc0JhclZpc2libGUubmV4dChmYWxzZSk7XG4gIH1cblxuICBsZWZ0U2lkZW5hdk9wZW5lZENoYW5nZShvcGVuZWRTdGF0dXMpIHtcbiAgICB0aGlzLmxlZnRNZW51Lm9wZW4gPSBvcGVuZWRTdGF0dXM7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dChvcGVuZWRTdGF0dXMpO1xuICB9XG5cbiAgcmlnaHRTaWRlbmF2T3BlbmVkQ2hhbmdlKG9wZW5lZFN0YXR1cykge1xuICAgIHRoaXMucmlnaHRNZW51Lm9wZW4gPSBvcGVuZWRTdGF0dXM7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KG9wZW5lZFN0YXR1cyk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdEFuZFNob3dDaGlsZENvbXBvbmVudHMoKSB7XG5cbiAgICB0aGlzLnRvb2xiYXIubGVmdE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRoaXMubGVmdE1lbnUgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB0aGlzLnRvb2xiYXIucmlnaHRNZW51VHJpZ2dlclZpc2libGUgPSB0aGlzLnJpZ2h0TWVudSA/IHRydWUgOiBmYWxzZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1Rvb2xiYXJFdmVudHMoKSB7XG5cbiAgICBpZiAodGhpcy50b29sYmFyKSB7XG5cbiAgICAgIHRoaXMudG9vbGJhci50b2dnbGVMZWZ0TWVudS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxlZnRTaWRlbmF2LnRvZ2dsZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudG9vbGJhci50b2dnbGVSaWdodE1lbnUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5yaWdodFNpZGVuYXYudG9nZ2xlKCk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0aWFsUmlnaHRNZW51VmlzaWJpbGl0eU1vZGVzKCkge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dCghdGhpcy5kZWNTaWRlbmF2U2VydmljZS5nZXRTaWRlbmF2VmlzaWJpbGl0eSgncmlnaHRNZW51SGlkZGVuJykpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0aWFsTGVmdE1lbnVWaXNpYmlsaXR5TW9kZXMoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dCghdGhpcy5kZWNTaWRlbmF2U2VydmljZS5nZXRTaWRlbmF2VmlzaWJpbGl0eSgnbGVmdE1lbnVIaWRkZW4nKSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtc2lkZW5hdi1jb250YWluZXItd3JhcHBlclwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLXNpZGVuYXYtY29udGFpbmVyLXdyYXBwZXJ7bWluLXdpZHRoOjEwMjRweDtwYWRkaW5nOjMycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdkNvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51JyxcbiAgdGVtcGxhdGU6IGA8bWF0LWxpc3Q+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbS5zdGFydGVkICYmIGl0ZW0udGVtcGxhdGUgPyB0cnVlIDogZmFsc2VcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbS50ZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3RyZWVMZXZlbDogdHJlZUxldmVsICsgMX1cIlxuICAgICAgPjwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9tYXQtbGlzdD5cbmAsXG4gIHN0eWxlczogW2AubWF0LWxpc3R7cGFkZGluZy10b3A6MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudUNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgaXRlbXMgPSBbXTtcblxuICBASW5wdXQoKSB0cmVlTGV2ZWwgPSAtMTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NpZGVuYXZDb21wb25lbnQgfSBmcm9tICcuL3NpZGVuYXYuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdFNpZGVuYXZNb2R1bGUsIE1hdExpc3RNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsIE1hdFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY1NpZGVuYXZDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1jb250ZW50L2RlYy1zaWRlbmF2LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LWxlZnQvZGVjLXNpZGVuYXYtbWVudS1sZWZ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51L2RlYy1zaWRlbmF2LW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUvZGVjLXNpZGVuYXYtbWVudS10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LXRvb2xiYXIvZGVjLXNpZGVuYXYtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUvZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuL3NpZGVuYXYuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjU2lkZW5hdkNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2Q29udGVudENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjU2lkZW5hdkNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2Q29udGVudENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNTaWRlbmF2U2VydmljZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RlcCB9IGZyb20gJy4vZGVjLXN0ZXBzLWxpc3QubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXN0ZXBzLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJoaXN0b3J5LWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsnbGltaXRlZC1oZWlnaHQnOiBtYXhIZWlnaHR9XCIgW3N0eWxlLm1heEhlaWdodF09XCJtYXhIZWlnaHQgfHwgJzEwMCUnXCI+XG5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjhweFwiIGNsYXNzPVwiZGVjLWNvbG9yLWdyZXktZGFya1wiPlxuXG4gICAgPG1hdC1pY29uIGZ4RmxleD1cIjI0cHhcIj57e2ljb259fTwvbWF0LWljb24+XG5cbiAgICA8c3BhbiBjbGFzcz1cImJpZ2dlci1mb250XCI+e3sgdGl0bGUgfX08L3NwYW4+XG5cbiAgPC9kaXY+XG5cbiAgPGJyPlxuXG4gIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJoaXN0b3J5LWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdGVwc0xpc3Q7IGxldCBpID0gaW5kZXhcIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cImxlZnQgc3RhcnRcIiBjbGFzcz1cImRlYy1jb2xvci1ncmV5XCI+XG5cbiAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwic21hbGxlci1pY29uIGRlYy1jb2xvci1ncmV5LWRhcmtcIiBmeEZsZXg9XCIyNHB4XCI+e3sgaSA9PT0gc3RlcHNMaXN0Lmxlbmd0aCAtIDEgPyAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCcgOiAnbGVucycgfX08L21hdC1pY29uPlxuXG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjRweFwiPlxuXG4gICAgICAgICAgPGRpdj5cblxuICAgICAgICAgICAgPHN0cm9uZyAqbmdJZj1cIml0ZW0udGl0bGVcIj57eyBpdGVtLnRpdGxlIH19PC9zdHJvbmc+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5kYXRlXCI+XG4gICAgICAgICAgICAgIHt7IGl0ZW0uZGF0ZSB8IGRhdGUgfX1cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93VGltZVwiPiB8IHt7IGl0ZW0uZGF0ZSB8IGRhdGU6ICdtZWRpdW1UaW1lJyB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiAqbmdJZj1cIml0ZW0uZGVzY3JpcHRpb25cIiBjbGFzcz1cImRlYy1jb2xvci1ncmV5LWRhcmtcIj5cbiAgICAgICAgICAgIDxzdHJvbmcgY2xhc3M9XCJkZWMtY29sb3ItYmxhY2tcIj57eyBpdGVtLmRlc2NyaXB0aW9uIH19PC9zdHJvbmc+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC10YWItYm9keS1jb250ZW50e3BhZGRpbmc6MTZweCAwfS5tYXQtZm9ybS1maWVsZC1wcmVmaXh7bWFyZ2luLXJpZ2h0OjhweCFpbXBvcnRhbnR9Lm1hdC1mb3JtLWZpZWxkLXN1ZmZpeHttYXJnaW4tbGVmdDo4cHghaW1wb3J0YW50fS5tYXQtZWxldmF0aW9uLXowe2JveC1zaGFkb3c6MCAwIDAgMCByZ2JhKDAsMCwwLC4yKSwwIDAgMCAwIHJnYmEoMCwwLDAsLjE0KSwwIDAgMCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MXtib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejJ7Ym94LXNoYWRvdzowIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDJweCAycHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoze2JveC1zaGFkb3c6MCAzcHggM3B4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAzcHggNHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDhweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NHtib3gtc2hhZG93OjAgMnB4IDRweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNHB4IDVweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo1e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA1cHggOHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE0cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejZ7Ym94LXNoYWRvdzowIDNweCA1cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDZweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejd7Ym94LXNoYWRvdzowIDRweCA1cHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDdweCAxMHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAycHggMTZweCAxcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo4e2JveC1zaGFkb3c6MCA1cHggNXB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCA4cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgM3B4IDE0cHggMnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OXtib3gtc2hhZG93OjAgNXB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOXB4IDEycHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNnB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEwe2JveC1zaGFkb3c6MCA2cHggNnB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCAxMHB4IDE0cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAxOHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejExe2JveC1zaGFkb3c6MCA2cHggN3B4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMXB4IDE1cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAyMHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEye2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMnB4IDE3cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyMnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEze2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxM3B4IDE5cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNHB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE0e2JveC1zaGFkb3c6MCA3cHggOXB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxNHB4IDIxcHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE1e2JveC1zaGFkb3c6MCA4cHggOXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxNXB4IDIycHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAyOHB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE2e2JveC1zaGFkb3c6MCA4cHggMTBweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTZweCAyNHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMzBweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxN3tib3gtc2hhZG93OjAgOHB4IDExcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE3cHggMjZweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMycHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTh7Ym94LXNoYWRvdzowIDlweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxOHB4IDI4cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDdweCAzNHB4IDZweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE5e2JveC1zaGFkb3c6MCA5cHggMTJweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMTlweCAyOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzZweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMHtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMHB4IDMxcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCAzOHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIxe2JveC1zaGFkb3c6MCAxMHB4IDEzcHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIxcHggMzNweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQwcHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjJ7Ym94LXNoYWRvdzowIDEwcHggMTRweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjJweCAzNXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggNDJweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyM3tib3gtc2hhZG93OjAgMTFweCAxNHB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyM3B4IDM2cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NHB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejI0e2JveC1zaGFkb3c6MCAxMXB4IDE1cHggLTdweCByZ2JhKDAsMCwwLC4yKSwwIDI0cHggMzhweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOXB4IDQ2cHggOHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJhZGdlLXNtYWxsIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6NnB4fS5tYXQtYmFkZ2UtbGFyZ2UgLm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtc2l6ZToyNHB4fS5tYXQtaDEsLm1hdC1oZWFkbGluZSwubWF0LXR5cG9ncmFwaHkgaDF7Zm9udDo0MDAgMjRweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMiwubWF0LXRpdGxlLC5tYXQtdHlwb2dyYXBoeSBoMntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWgzLC5tYXQtc3ViaGVhZGluZy0yLC5tYXQtdHlwb2dyYXBoeSBoM3tmb250OjQwMCAxNnB4LzI4cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg0LC5tYXQtc3ViaGVhZGluZy0xLC5tYXQtdHlwb2dyYXBoeSBoNHtmb250OjQwMCAxNXB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg1LC5tYXQtdHlwb2dyYXBoeSBoNXtmb250OjQwMCAxMS42MnB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWg2LC5tYXQtdHlwb2dyYXBoeSBoNntmb250OjQwMCA5LjM4cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxMnB4fS5tYXQtYm9keS0yLC5tYXQtYm9keS1zdHJvbmd7Zm9udDo1MDAgMTRweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJvZHksLm1hdC1ib2R5LTEsLm1hdC10eXBvZ3JhcGh5e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5IHAsLm1hdC1ib2R5LTEgcCwubWF0LXR5cG9ncmFwaHkgcHttYXJnaW46MCAwIDEycHh9Lm1hdC1jYXB0aW9uLC5tYXQtc21hbGx7Zm9udDo0MDAgMTJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWRpc3BsYXktNCwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTR7Zm9udDozMDAgMTEycHgvMTEycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNTZweDtsZXR0ZXItc3BhY2luZzotLjA1ZW19Lm1hdC1kaXNwbGF5LTMsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ze2ZvbnQ6NDAwIDU2cHgvNTZweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDJlbX0ubWF0LWRpc3BsYXktMiwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTJ7Zm9udDo0MDAgNDVweC80OHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHg7bGV0dGVyLXNwYWNpbmc6LS4wMDVlbX0ubWF0LWRpc3BsYXktMSwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTF7Zm9udDo0MDAgMzRweC80MHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHh9Lm1hdC1ib3R0b20tc2hlZXQtY29udGFpbmVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1idXR0b24sLm1hdC1mYWIsLm1hdC1mbGF0LWJ1dHRvbiwubWF0LWljb24tYnV0dG9uLC5tYXQtbWluaS1mYWIsLm1hdC1yYWlzZWQtYnV0dG9uLC5tYXQtc3Ryb2tlZC1idXR0b257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWJ1dHRvbi10b2dnbGUsLm1hdC1jYXJke2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhcmQtdGl0bGV7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtY2FyZC1jb250ZW50LC5tYXQtY2FyZC1oZWFkZXIgLm1hdC1jYXJkLXRpdGxlLC5tYXQtY2FyZC1zdWJ0aXRsZXtmb250LXNpemU6MTRweH0ubWF0LWNoZWNrYm94e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNoZWNrYm94LWxheW91dCAubWF0LWNoZWNrYm94LWxhYmVse2xpbmUtaGVpZ2h0OjI0cHh9Lm1hdC1jaGlwe2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjE4cHh9Lm1hdC1jaGlwIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24sLm1hdC1jaGlwIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29ue2ZvbnQtc2l6ZToxOHB4fS5tYXQtdGFibGV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtaGVhZGVyLWNlbGx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2VsbCwubWF0LWZvb3Rlci1jZWxse2ZvbnQtc2l6ZToxNHB4fS5tYXQtY2FsZW5kYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2FsZW5kYXItYm9keXtmb250LXNpemU6MTNweH0ubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9ue2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlciB0aHtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo0MDB9Lm1hdC1kaWFsb2ctdGl0bGV7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWV4cGFuc2lvbi1wYW5lbC1jb250ZW50e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCU7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuMTI1O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb257Zm9udC1zaXplOjE1MCU7bGluZS1oZWlnaHQ6MS4xMjV9Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29uLWJ1dHRvbntoZWlnaHQ6MS41ZW07d2lkdGg6MS41ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b24gLm1hdC1pY29ue2hlaWdodDoxLjEyNWVtO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi41ZW0gMDtib3JkZXItdG9wOi44NDM3NWVtIHNvbGlkIHRyYW5zcGFyZW50fS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVye3RvcDotLjg0Mzc1ZW07cGFkZGluZy10b3A6Ljg0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlcntmb250LXNpemU6NzUlO21hcmdpbi10b3A6LjY2NjY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNzkxNjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC13cmFwcGVye3BhZGRpbmctYm90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjQzNzVlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMXB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjNlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzUlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMjgxMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4yNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7bWFyZ2luLXRvcDouNTQxNjdlbTt0b3A6Y2FsYygxMDAlIC0gMS42NjY2N2VtKX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi4yNWVtIDAgLjc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMDkzNzVlbTttYXJnaW4tdG9wOi0uNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzoxZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5le2JvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuODQzNzVlbTttYXJnaW4tdG9wOi0uMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWdyaWQtdGlsZS1mb290ZXIsLm1hdC1ncmlkLXRpbGUtaGVhZGVye2ZvbnQtc2l6ZToxNHB4fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmUsLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LWdyaWQtdGlsZS1oZWFkZXIgLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fWlucHV0Lm1hdC1pbnB1dC1lbGVtZW50e21hcmdpbi10b3A6LS4wNjI1ZW19Lm1hdC1tZW51LWl0ZW17Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXBhZ2luYXRvciwubWF0LXBhZ2luYXRvci1wYWdlLXNpemUgLm1hdC1zZWxlY3QtdHJpZ2dlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHh9Lm1hdC1yYWRpby1idXR0b24sLm1hdC1zZWxlY3R7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2VsZWN0LXRyaWdnZXJ7aGVpZ2h0OjEuMTI1ZW19Lm1hdC1zbGlkZS10b2dnbGUtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwubWF0LXN0ZXBwZXItdmVydGljYWx7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc3RlcC1sYWJlbHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVke2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRhYi1ncm91cHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10YWItbGFiZWwsLm1hdC10YWItbGlua3tmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdG9vbGJhciwubWF0LXRvb2xiYXIgaDEsLm1hdC10b29sYmFyIGgyLC5tYXQtdG9vbGJhciBoMywubWF0LXRvb2xiYXIgaDQsLm1hdC10b29sYmFyIGg1LC5tYXQtdG9vbGJhciBoNntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowfS5tYXQtdG9vbHRpcHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEwcHg7cGFkZGluZy10b3A6NnB4O3BhZGRpbmctYm90dG9tOjZweH0ubWF0LXRvb2x0aXAtaGFuZHNldHtmb250LXNpemU6MTRweDtwYWRkaW5nLXRvcDo5cHg7cGFkZGluZy1ib3R0b206OXB4fS5tYXQtbGlzdC1pdGVtLC5tYXQtbGlzdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjE2cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtbmF2LWxpc3QgLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweH0ubWF0LW9wdGdyb3VwLWxhYmVse2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zaW1wbGUtc25hY2tiYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4fS5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbntsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdHJlZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10cmVlLW5vZGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxNHB4fS5tYXQtcmlwcGxle292ZXJmbG93OmhpZGRlbn1AbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6YWN0aXZlKXsubWF0LXJpcHBsZXtkaXNwbGF5Om5vbmV9fS5tYXQtcmlwcGxlLm1hdC1yaXBwbGUtdW5ib3VuZGVke292ZXJmbG93OnZpc2libGV9Lm1hdC1yaXBwbGUtZWxlbWVudHtwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXItcmFkaXVzOjUwJTtwb2ludGVyLWV2ZW50czpub25lO3RyYW5zaXRpb246b3BhY2l0eSwtd2Via2l0LXRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpO3RyYW5zaXRpb246b3BhY2l0eSx0cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9LmNkay12aXN1YWxseS1oaWRkZW57Ym9yZGVyOjA7Y2xpcDpyZWN0KDAgMCAwIDApO2hlaWdodDoxcHg7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHg7b3V0bGluZTowOy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlciwuY2RrLW92ZXJsYXktY29udGFpbmVye3BvaW50ZXItZXZlbnRzOm5vbmU7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmNkay1vdmVybGF5LWNvbnRhaW5lcntwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LWNvbnRhaW5lcjplbXB0eXtkaXNwbGF5Om5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVye2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LXBhbmV7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6YXV0bztib3gtc2l6aW5nOmJvcmRlci1ib3g7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9LmNkay1vdmVybGF5LWJhY2tkcm9we3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6MTAwMDtwb2ludGVyLWV2ZW50czphdXRvOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDt0cmFuc2l0aW9uOm9wYWNpdHkgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO29wYWNpdHk6MH0uY2RrLW92ZXJsYXktYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjF9QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTouNn19LmNkay1vdmVybGF5LWRhcmstYmFja2Ryb3B7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yODgpfS5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCwuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjB9LmNkay1vdmVybGF5LWNvbm5lY3RlZC1wb3NpdGlvbi1ib3VuZGluZy1ib3h7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47bWluLXdpZHRoOjFweDttaW4taGVpZ2h0OjFweH0uY2RrLWdsb2JhbC1zY3JvbGxibG9ja3twb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO292ZXJmbG93LXk6c2Nyb2xsfS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbHstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0O2FuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0fS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6bm90KDotd2Via2l0LWF1dG9maWxsKXstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmR9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXple3Jlc2l6ZTpub25lfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZS1tZWFzdXJpbmd7aGVpZ2h0OmF1dG8haW1wb3J0YW50O292ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnQ7cGFkZGluZzoycHggMCFpbXBvcnRhbnQ7Ym94LXNpemluZzpjb250ZW50LWJveCFpbXBvcnRhbnR9Lmhpc3RvcnktY29udGFpbmVye21hcmdpbjoxLjVlbSAwfS5oaXN0b3J5LWNvbnRhaW5lci5saW1pdGVkLWhlaWdodHtvdmVyZmxvdy15OmF1dG99Lmhpc3RvcnktY29udGFpbmVyIC5oaXN0b3J5LWl0ZW06bm90KDpsYXN0LWNoaWxkKXtwb3NpdGlvbjpyZWxhdGl2ZX0uaGlzdG9yeS1jb250YWluZXIgLmhpc3RvcnktaXRlbTpub3QoOmxhc3QtY2hpbGQpOjpiZWZvcmV7Y29udGVudDpcIlwiO3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDozZW07d2lkdGg6MnB4O2JhY2tncm91bmQtY29sb3I6IzkxOTc5YztsZWZ0OjExcHg7dG9wOjE0cHh9Lmhpc3RvcnktY29udGFpbmVyIC5oaXN0b3J5LWl0ZW0gLnNtYWxsZXItaWNvbntmb250LXNpemU6MTZweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjttYXJnaW4tdG9wOjJweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTdGVwc0xpc3RDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGljb24gPSAnaGlzdG9yeSc7XG5cbiAgQElucHV0KCkgdGl0bGUgPSAnJztcblxuICBASW5wdXQoKSBzaG93VGltZTogYm9vbGVhbjtcblxuICBASW5wdXQoKSBtYXhIZWlnaHQ7XG5cbiAgQElucHV0KCkgc3RlcHNMaXN0OiBTdGVwW10gPSBbXTtcblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTdGVwc0xpc3RDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zdGVwcy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY1N0ZXBzTGlzdENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNTdGVwc0xpc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNTdGVwc0xpc3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zdHJpbmctYXJyYXktaW5wdXQnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm1vZGUgPT0gJ2lucHV0J1wiPlxuXG4gIDxtYXQtZm9ybS1maWVsZCAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbKG5nTW9kZWwpXT1cInZhbHVlQXNTdHJpbmdcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gIDxtYXQtZm9ybS1maWVsZCAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cbiAgICA8dGV4dGFyZWEgbWF0SW5wdXRcbiAgICBbcm93c109XCJyb3dzXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbKG5nTW9kZWwpXT1cInZhbHVlQXNTdHJpbmdcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICAgIDwvdGV4dGFyZWE+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG5cbjwvbmctY29udGFpbmVyPlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgbmFtZTtcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjtcblxuICBASW5wdXQoKSBtb2RlID0gJ3RleHRhcmVhJztcblxuICBASW5wdXQoKSByb3dzID0gMztcblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogc3RyaW5nW10ge1xuXG4gICAgcmV0dXJuIHRoaXMuaW5uZXJBcnJheTtcblxuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogc3RyaW5nW10pIHtcblxuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyQXJyYXkpIHtcblxuICAgICAgdGhpcy5pbm5lckFycmF5ID0gdjtcblxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgdmFsdWVBc1N0cmluZygpOiBzdHJpbmcge1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0QXJyYXlBc1N0cmluZygpO1xuXG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZUFzU3RyaW5nKHY6IHN0cmluZykge1xuXG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJBcnJheSkge1xuXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdHJpbmdUb0FycmF5KHYpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyQXJyYXk6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgLy9cbiAgZ2V0QXJyYXlBc1N0cmluZygpIHtcblxuICAgIHJldHVybiB0aGlzLmFycmF5VG9TdHJpbmcodGhpcy52YWx1ZSk7XG5cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZ1tdKSB7XG5cbiAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgfVxuXG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICBwcml2YXRlIHN0cmluZ1RvQXJyYXkoc3RyaW5nT2ZBcnJheTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGlmIChzdHJpbmdPZkFycmF5KSB7XG5cbiAgICAgIGNvbnN0IHJlZ0V4cCA9IC9bXixcXHNdW14sXFxzXSpbXixcXHNdKi9nO1xuXG4gICAgICByZXR1cm4gc3RyaW5nT2ZBcnJheS5tYXRjaChyZWdFeHApO1xuXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcnJheVRvU3RyaW5nKGFycmF5T2ZzdHJpbmc6IHN0cmluZ1tdKTogc3RyaW5nIHtcblxuICAgIGlmIChhcnJheU9mc3RyaW5nKSB7XG5cbiAgICAgIHJldHVybiBhcnJheU9mc3RyaW5nLmpvaW4oJywgJyk7XG5cbiAgICB9XG5cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY1N0cmluZ0FycmF5SW5wdXRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zdHJpbmctYXJyYXktaW5wdXQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY1N0cmluZ0FycmF5SW5wdXRDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNTdHJpbmdBcnJheUlucHV0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtdGFiJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFiQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgdG90YWw6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBjb250ZW50OiBUZW1wbGF0ZVJlZjxEZWNUYWJDb21wb25lbnQ+O1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbnN1cmVUYWJOYW1lKCk7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVRhYk5hbWUgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSA8ZGVjLXRhYj4gY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXRhYi1tZW51JyxcbiAgdGVtcGxhdGU6IGA8cD5cbiAgdGFiLW1lbnUgd29ya3MhXG48L3A+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFiTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgYWN0aXZlVGFiOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgY29udGVudDogVGVtcGxhdGVSZWY8RGVjVGFiTWVudUNvbXBvbmVudD47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY1RhYkNvbXBvbmVudCB9IGZyb20gJy4vdGFiL3RhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjVGFiTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXRhYnMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCIhaGlkZGVuXCI+XG5cbiAgPCEtLSBUQUJTIC0tPlxuICA8bWF0LXRhYi1ncm91cCBbc2VsZWN0ZWRJbmRleF09XCJhY3RpdmVUYWJJbmRleFwiIChmb2N1c0NoYW5nZSk9XCJvbkNoYW5nZVRhYigkZXZlbnQpXCIgW2R5bmFtaWNIZWlnaHRdPVwidHJ1ZVwiPlxuXG4gICAgPCEtLSBUQUIgLS0+XG4gICAgPG1hdC10YWIgKm5nRm9yPVwibGV0IHRhYiBvZiB0YWJzO1wiIFtkaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIj5cblxuICAgICAgPCEtLSBUQUIgTEFCRUwgLS0+XG4gICAgICA8bmctdGVtcGxhdGUgbWF0LXRhYi1sYWJlbD5cbiAgICAgICAge3sgdGFiLmxhYmVsIH19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1zbWFsbFwiICpuZ0lmPVwidGFiLnRvdGFsID49IDBcIj57eyBwYXJzZVRvdGFsKHRhYi50b3RhbCkgfX08L3NwYW4+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICA8IS0tIFRBQiBDT05URU5UIFdSQVBQRVIgLS0+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvdWxUYWJCZURpc3BsYXllZCh0YWIpXCI+XG5cbiAgICAgICAgPCEtLSBUQUIgTUVOVSAtLT5cbiAgICAgICAgPGRpdiAqbmdJZj1cInRhYk1lbnVDb21wb25lbnRcIiBjbGFzcz1cIm1lbnUtd3JhcHBlclwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWJNZW51Q29tcG9uZW50LmNvbnRlbnQ7IGNvbnRleHQ6IHsgYWN0aXZlVGFiOiBhY3RpdmVUYWIgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tIFRBQlMgQ09OVEVOVCAtLT5cbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3RhYi1wYWRkaW5nJzogcGFkZGluZ31cIj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbWF0LXRhYj5cblxuICA8L21hdC10YWItZ3JvdXA+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tZW51LXdyYXBwZXJ7dGV4dC1hbGlnbjpyaWdodDtwYWRkaW5nOjhweCAwfS50YWItcGFkZGluZ3twYWRkaW5nOjE2cHggMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjVGFiQ29tcG9uZW50KSB0YWJzOiBRdWVyeUxpc3Q8RGVjVGFiQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkKERlY1RhYk1lbnVDb21wb25lbnQpIHRhYk1lbnVDb21wb25lbnQ6IERlY1RhYk1lbnVDb21wb25lbnQ7XG5cbiAgQElucHV0KCkgaGlkZGVuOyAvLyBoaWRlcyB0aGUgdGFicyBncm91cCB0byByZWxvYWQgaXRzIGNvbnRlbnRzXG5cbiAgQElucHV0KCkgcGVyc2lzdCA9IHRydWU7XG5cbiAgQElucHV0KCkgZGVzdHJveU9uQmx1ciA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKSBwYWRkaW5nID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgYWN0aXZlVGFiKHY6IHN0cmluZykge1xuICAgIGlmICh2ICYmIHRoaXMuX2FjdGl2ZVRhYiAhPT0gdikge1xuICAgICAgdGhpcy5fYWN0aXZlVGFiID0gdjtcbiAgICAgIHRoaXMucGVyc2lzdFRhYih2KTtcbiAgICB9XG4gIH1cbiAgZ2V0IGFjdGl2ZVRhYigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiO1xuICB9XG5cbiAgQE91dHB1dCgpIGFjdGl2ZVRhYkNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBnZXQgYWN0aXZlVGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiSW5kZXg7XG4gIH1cblxuICBnZXQgYWN0aXZlVGFiT2JqZWN0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYk9iamVjdDtcbiAgfVxuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYkluZGV4OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfYWN0aXZlVGFiT2JqZWN0OiBhbnk7XG5cbiAgcHJpdmF0ZSBhY3RpdmF0ZWRUYWJzOiBhbnkgPSB7fTtcblxuICBwcml2YXRlIHF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBwYXRoRnJvbVJvb3QgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZU5hbWUoKTtcbiAgICB0aGlzLndhdGNoVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlVGFiTmFtZXMoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgICAgIGlmIChxdWVyeVBhcmFtcyAmJiBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0pIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRhYiA9IHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXTtcbiAgICAgICAgdGhpcy5zZWxlY3RUYWIoY3VycmVudFRhYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXJ0U2VsZWN0ZWRUYWIoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCk7XG4gIH1cblxuICBzaG91bFRhYkJlRGlzcGxheWVkKHRhYikge1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB0aGlzLl9hY3RpdmVUYWJPYmplY3QgPT09IHRhYjtcbiAgICBjb25zdCBpc0FjdGl2YXRlZCA9IHRoaXMuYWN0aXZhdGVkVGFic1t0YWIubmFtZV07XG4gICAgcmV0dXJuIGlzU2VsZWN0ZWQgfHwgKCF0aGlzLmRlc3Ryb3lPbkJsdXIgJiYgaXNBY3RpdmF0ZWQpO1xuICB9XG5cbiAgb25DaGFuZ2VUYWIoJGV2ZW50KSB7XG4gICAgY29uc3QgYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKVskZXZlbnQuaW5kZXhdO1xuICAgIHRoaXMuYWN0aXZlVGFiID0gYWN0aXZlVGFiT2JqZWN0Lm5hbWU7XG4gIH1cblxuICBwYXJzZVRvdGFsKHRvdGFsKSB7XG5cbiAgICByZXR1cm4gdG90YWwgIT09IG51bGwgJiYgdG90YWwgPj0gMCA/ICB0b3RhbCA6ICc/JztcblxuICB9XG5cbiAgcmVzZXQoKSB7XG5cbiAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcblxuICAgIH0sIDEwKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjb21wb25lbnRUYWJOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnLXRhYic7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVVuaXF1ZU5hbWUgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSB0YWIgY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgLyogZW5zdXJlVW5pcXVlVGFiTmFtZXNcbiAgICogVGhpcyBtZXRob2QgcHJldmVudHMgdGhlIHVzZSBvZiB0aGUgc2FtZSBuYW1lIGZvciBtb3JlIHRoYW4gb25lIHRhYlxuICAgKiB3aGF0IHdvdWxkIGVuZGluZyB1cCBjb25mbGljdGluZyB0aGUgdGFicyBhY3RpdmF0aW9uIG9uY2UgdGhpcyBpcyBkb25lIHZpYSB0YWIgbmFtZVxuICAqL1xuXG4gIHByaXZhdGUgZW5zdXJlVW5pcXVlVGFiTmFtZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlcywgcmVqKSA9PiB7XG4gICAgICBjb25zdCBuYW1lcyA9IHt9O1xuICAgICAgdGhpcy50YWJzLnRvQXJyYXkoKS5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICAgIGlmICghbmFtZXNbdGFiLm5hbWVdKSB7XG4gICAgICAgICAgbmFtZXNbdGFiLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWNUYWJDb21wb25lbnRFcnJvcjogVGhlIDxkZWMtdGFicz4gY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gVGhlIG5hbWUgJHt0YWIubmFtZX0gd2FzIHVzZWQgbW9yZSB0aGFuIG9uY2UuYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHBlcnNpc3RUYWIodGFiKSB7XG4gICAgaWYgKHRoaXMucGVyc2lzdCkge1xuICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICAgICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldID0gdGFiO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0VGFiID0gKHRhYk5hbWUpID0+IHtcbiAgICBpZiAodGhpcy50YWJzKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYk5hbWU7XG4gICAgICB0aGlzLmFjdGl2YXRlZFRhYnNbdGFiTmFtZV0gPSB0cnVlO1xuICAgICAgdGhpcy5fYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5maWx0ZXIodGFiID0+IHRhYi5uYW1lID09PSB0YWJOYW1lKVswXTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYkluZGV4ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5pbmRleE9mKHRoaXMuX2FjdGl2ZVRhYk9iamVjdCk7XG4gICAgICB0aGlzLmFjdGl2ZVRhYkNoYW5nZS5lbWl0KHRhYk5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRTZWxlY3RlZFRhYigpIHtcbiAgICBjb25zdCBhY3RpdmVUYWIgPSB0aGlzLmFjdGl2ZVRhYiB8fCB0aGlzLnRhYnMudG9BcnJheSgpWzBdLm5hbWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGF2b2lkIGNoYW5nZSBhZnRlciBjb21wb25lbnQgY2hlY2tlZCBlcnJvclxuICAgICAgdGhpcy5zZWxlY3RUYWIoYWN0aXZlVGFiKTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJJblVybFF1ZXJ5KCkge1xuICAgIHRoaXMucXVlcnlQYXJhbXNTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICBjb25zdCB0YWI6IHN0cmluZyA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV07XG4gICAgICB0aGlzLnNlbGVjdFRhYih0YWIpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCkge1xuICAgIHRoaXMucXVlcnlQYXJhbXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjVGFiQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY1RhYkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY1RhYnNDb21wb25lbnQgfSBmcm9tICcuL3RhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1RhYk1vZHVsZSB9IGZyb20gJy4vdGFiL3RhYi5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjVGFiTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIERlY1RhYk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNUYWJzQ29tcG9uZW50LCBEZWNUYWJNZW51Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1xuICAgIERlY1RhYnNDb21wb25lbnQsXG4gICAgRGVjVGFiTWVudUNvbXBvbmVudCxcbiAgICBEZWNUYWJNb2R1bGVcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFic01vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEV2ZW50VHlwZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFVwbG9hZFByb2dyZXNzIH0gZnJvbSAnLi91cGxvYWQubW9kZWxzJztcblxuY29uc3QgVVBMT0FEX0VORFBPSU5UID0gJy91cGxvYWQnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBERUNfVVBMT0FEX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY1VwbG9hZENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtdXBsb2FkJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCIocHJvZ3Jlc3NlcyAmJiBwcm9ncmVzc2VzLmxlbmd0aCkgPyB0cnVlIDogZmFsc2VcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cbiAgICA8c3BhbiAoY2xpY2spPVwib3BlbkZpbGVTZWxlY3Rpb24oKVwiIGNsYXNzPVwiY2xpY2tcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L3NwYW4+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgdXBsb2FkUHJvZ3Jlc3Mgb2YgcHJvZ3Jlc3Nlc1wiIGNsYXNzPVwiZGVjLXVwbG9hZC1wcm9ncmVzcy13cmFwcGVyXCI+XG4gICAgICA8bWF0LXByb2dyZXNzLWJhclxuICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICBbbW9kZV09XCJnZXRQcm9ncmVzc2Jhck1vZGUodXBsb2FkUHJvZ3Jlc3MpXCJcbiAgICAgICAgW3ZhbHVlXT1cImdldFByb2dyZXNzVmFsdWVCYXNlZE9uTW9kZSh1cGxvYWRQcm9ncmVzcylcIj5cbiAgICAgIDwvbWF0LXByb2dyZXNzLWJhcj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICA8c21hbGw+XG4gICAgICAgICAge3sgdXBsb2FkUHJvZ3Jlc3MudmFsdWUgfX0lIC0ge3sgdXBsb2FkUHJvZ3Jlc3MuZmlsZU5hbWUgfX1cbiAgICAgICAgPC9zbWFsbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuXG5cbjxpbnB1dCB0eXBlPVwiZmlsZVwiICNpbnB1dEZpbGUgKGNoYW5nZSk9XCJmaWxlc0NoYW5nZWQoJGV2ZW50KVwiIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuXG5gLFxuICBzdHlsZXM6IFtgLmNsaWNre2N1cnNvcjpwb2ludGVyfWlucHV0e2Rpc3BsYXk6bm9uZX0udGV4dC1jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LmRlYy11cGxvYWQtcHJvZ3Jlc3Mtd3JhcHBlcntwYWRkaW5nOjhweCAwfWBdLFxuICBwcm92aWRlcnM6IFtERUNfVVBMT0FEX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY1VwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBwcm9ncmVzc2VzOiBVcGxvYWRQcm9ncmVzc1tdID0gW107XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSB1cGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgcHJvZ3Jlc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXRGaWxlJykgaW5wdXRGaWxlOiBFbGVtZW50UmVmO1xuXG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnlbXTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgVkFMVUVcbiAgKi9cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHY6IGFueVtdKSB7XG4gICAgdGhpcy52YWx1ZSA9IHY7XG4gIH1cblxuXG4gIGZpbGVzQ2hhbmdlZChldmVudCkge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZXZlbnQudGFyZ2V0LmZpbGVzLmxlbmd0aDsgeCsrKSB7XG4gICAgICB0aGlzLnVwbG9hZEZpbGUoZXZlbnQudGFyZ2V0LmZpbGVzW3hdLCB4KTtcbiAgICB9XG4gIH1cblxuICBvcGVuRmlsZVNlbGVjdGlvbigpIHtcbiAgICB0aGlzLmlucHV0RmlsZS5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxuICBnZXRQcm9ncmVzc2Jhck1vZGUocHJvZ3Jlc3MpIHtcblxuICAgIGxldCBtb2RlO1xuXG4gICAgc3dpdGNoIChwcm9ncmVzcy52YWx1ZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBtb2RlID0gJ2J1ZmZlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMDA6XG4gICAgICAgIG1vZGUgPSAnaW5kZXRlcm1pbmF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBtb2RlO1xuXG4gIH1cblxuICBnZXRQcm9ncmVzc1ZhbHVlQmFzZWRPbk1vZGUocHJvZ3Jlc3MpIHtcbiAgICBjb25zdCBtb2RlID0gdGhpcy5nZXRQcm9ncmVzc2Jhck1vZGUocHJvZ3Jlc3MpO1xuICAgIGNvbnN0IHZhbHVlID0gbW9kZSA9PT0gJ2J1ZmZlcicgPyAwIDogcHJvZ3Jlc3MudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGxvYWRGaWxlKGZpbGUsIGluZGV4KSB7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGNvbnN0IHByb2dyZXNzOiBVcGxvYWRQcm9ncmVzcyA9IHtcbiAgICAgICAgZmlsZUluZGV4OiBpbmRleCxcbiAgICAgICAgZmlsZU5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgdmFsdWU6IDAsXG4gICAgICB9O1xuICAgICAgdGhpcy5wcm9ncmVzc2VzLnB1c2gocHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5zZXJ2aWNlLnVwbG9hZChVUExPQURfRU5EUE9JTlQsIFtmaWxlXSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NhdGNoRXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgcHJvZ3Jlc3MuZXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgIHRoaXMuZXJyb3IuZW1pdCgnbWVzc2FnZS5lcnJvci51bmV4cGVjdGVkJyk7XG4gICAgICAgICAgdGhpcy5kZXRlY3RVcGxvYWRFbmQoKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzcykge1xuICAgICAgICAgIGNvbnN0IHBlcmNlbnREb25lID0gTWF0aC5yb3VuZCgoMTAwICogZXZlbnQubG9hZGVkKSAvIGV2ZW50LnRvdGFsKTtcbiAgICAgICAgICBwcm9ncmVzcy52YWx1ZSA9IHBlcmNlbnREb25lID09PSAxMDAgPyBwZXJjZW50RG9uZSA6IHBhcnNlRmxvYXQocGVyY2VudERvbmUudG9GaXhlZCgyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICBwcm9ncmVzcy52YWx1ZSA9IDEwMDtcbiAgICAgICAgICBwcm9ncmVzcy5maWxlID0gZXZlbnQuYm9keTtcbiAgICAgICAgICB0aGlzLmRldGVjdFVwbG9hZEVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MuZW1pdCh0aGlzLnByb2dyZXNzZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RVcGxvYWRFbmQoKSB7XG5cbiAgICBjb25zdCBzdGlsbFVwbG9hZGluZyA9IHRoaXMucHJvZ3Jlc3Nlcy5maWx0ZXIoKHByb2dyZXNzKSA9PiB7XG4gICAgICByZXR1cm4gcHJvZ3Jlc3MudmFsdWUgPCAxMDA7XG4gICAgfSk7XG5cbiAgICBpZiAoIXN0aWxsVXBsb2FkaW5nLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbWl0VXBsb2FkZWRGaWxlcygpO1xuICAgICAgdGhpcy5jbGVhcklucHV0RmlsZSgpO1xuICAgICAgdGhpcy5jbGVhclByb2dyZXNzZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFySW5wdXRGaWxlKCkge1xuICAgIHRoaXMuaW5wdXRGaWxlLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJQcm9ncmVzc2VzKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NlcyA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0VXBsb2FkZWRGaWxlcygpIHtcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMucHJvZ3Jlc3Nlcy5tYXAoKHVwbG9hZFByb2dyZXNzOiBVcGxvYWRQcm9ncmVzcykgPT4ge1xuICAgICAgcmV0dXJuIHVwbG9hZFByb2dyZXNzLmZpbGU7XG4gICAgfSk7XG4gICAgdGhpcy52YWx1ZSA9IFsuLi5maWxlc107XG4gICAgdGhpcy51cGxvYWRlZC5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZXJ2aWNlQ29uZmlnIH0gZnJvbSAnLi9kZWNvcmEtYXBpLm1vZGVsJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuL2RlY29yYS1hcGkuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBERUNPUkFfQVBJX1NFUlZJQ0VfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPFNlcnZpY2VDb25maWc+KCdERUNPUkFfQVBJX1NFUlZJQ0VfQ09ORklHJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBJbml0RGVjQXBpU2VydmljZShodHRwOiBIdHRwQ2xpZW50LCBzZXJ2aWNlQ29uZmlnOiBTZXJ2aWNlQ29uZmlnKSB7XG4gIHJldHVybiBuZXcgRGVjQXBpU2VydmljZShodHRwLCBzZXJ2aWNlQ29uZmlnKTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXBpTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBTZXJ2aWNlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEZWNBcGlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBERUNPUkFfQVBJX1NFUlZJQ0VfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBEZWNBcGlTZXJ2aWNlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IEluaXREZWNBcGlTZXJ2aWNlLFxuICAgICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50LCBERUNPUkFfQVBJX1NFUlZJQ0VfQ09ORklHXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY1VwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vdXBsb2FkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNBcGlNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgRGVjQXBpTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNVcGxvYWRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1VwbG9hZENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1VwbG9hZE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIENhbkxvYWQsIFJvdXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2VcbiAgKSB7fVxuXG4gIGNhbkxvYWQocm91dGU6IFJvdXRlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQXV0aGVudGljYXRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkuZmV0Y2hDdXJyZW50TG9nZ2VkVXNlcigpXG4gICAgLnBpcGUoXG4gICAgICBtYXAoKHVzZXI6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gKHVzZXIgJiYgdXNlci5pZCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9KVxuICAgICkgYXMgT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dGhHdWFyZCB9IGZyb20gJy4vYXV0aC1ndWFyZC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNBdXRoR3VhcmRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHdWFyZE1vZHVsZSB7IH1cbiIsImV4cG9ydCBjbGFzcyBVc2VyQXV0aERhdGEge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIGVtYWlsOiBzdHJpbmc7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBjb3VudHJ5OiBzdHJpbmc7XG4gIHB1YmxpYyBjb21wYW55OiBzdHJpbmc7XG4gIHB1YmxpYyByb2xlOiBudW1iZXI7XG4gIHB1YmxpYyBwZXJtaXNzaW9uczogQXJyYXk8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3Rvcih1c2VyOiBhbnkgPSB7fSkge1xuICAgIHRoaXMuaWQgPSB1c2VyLmlkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmVtYWlsID0gdXNlci5lbWFpbCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5uYW1lID0gdXNlci5uYW1lIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvdW50cnkgPSB1c2VyLmNvdW50cnkgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuY29tcGFueSA9IHVzZXIuY29tcGFueSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5yb2xlID0gdXNlci5yb2xlIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBlcm1pc3Npb25zID0gdXNlci5wZXJtaXNzaW9ucyB8fCB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2dpbkRhdGEge1xuICBlbWFpbDogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xuICBrZWVwTG9nZ2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2Vib29rTG9naW5EYXRhIHtcbiAga2VlcExvZ2dlZDogYm9vbGVhbjtcbiAgZmFjZWJvb2tUb2tlbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlcnZpY2VDb25maWcge1xuICBob3N0OiBzdHJpbmc7XG4gIGF1dGhIb3N0Pzogc3RyaW5nO1xuICB1c2VNb2NrQXBpPzogYm9vbGVhbjtcbiAgbW9ja0FwaUhvc3Q/OiBzdHJpbmc7XG59XG5cblxuXG4vKlxuICAqIEZpbHRlckdyb3Vwc1xuICAqXG4gICogYW4gQXJyYXkgb2YgZmlsdGVyIGdyb3VwXG4gICovXG5leHBvcnQgdHlwZSBGaWx0ZXJHcm91cHMgPSBGaWx0ZXJHcm91cFtdO1xuXG4vKlxuICAqIEZpbHRlcnNcbiAgKlxuICAqIGFuIEFycmF5IG9mIGZpbHRlclxuICAqL1xuZXhwb3J0IHR5cGUgRmlsdGVycyA9IEZpbHRlcltdO1xuXG4vKlxuICAqIEZpbHRlckRhdGFcbiAgKlxuICAqIEZpbHRlciBjb25maWd1cmF0aW9uXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckRhdGEge1xuICBlbmRwb2ludDogc3RyaW5nO1xuICBwYXlsb2FkOiBEZWNGaWx0ZXI7XG4gIGNiaz86IEZ1bmN0aW9uO1xuICBjbGVhcj86IGJvb2xlYW47XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNGaWx0ZXIge1xuICBmaWx0ZXJHcm91cHM/OiBGaWx0ZXJHcm91cHM7XG4gIHByb2plY3RWaWV3PzogYW55O1xuICBjb2x1bW5zPzogYW55O1xuICBwYWdlPzogbnVtYmVyO1xuICBsaW1pdD86IG51bWJlcjtcbiAgdGV4dFNlYXJjaD86IHN0cmluZztcbn1cblxuLypcbiAgKiBGaWx0ZXJcbiAgKlxuICAqIEZpbHRlciBjb25maWd1cmF0aW9uXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIFNlcmlhbGl6ZWREZWNGaWx0ZXIge1xuICBmaWx0ZXI/OiBzdHJpbmc7XG4gIHByb2plY3RWaWV3Pzogc3RyaW5nO1xuICBjb2x1bW5zPzogc3RyaW5nO1xuICBwYWdlPzogbnVtYmVyO1xuICBsaW1pdD86IG51bWJlcjtcbiAgdGV4dFNlYXJjaD86IHN0cmluZztcbn1cblxuLypcbiAgKiBGaWx0ZXJcbiAgKlxuICAqIFNpZ25sZSBmaWx0ZXJcbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgcHJvcGVydHk6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdO1xufVxuXG4vKlxuICAqIEZpbHRlckdyb3VwXG4gICpcbiAgKiBHcm91cCBvZiBGaWx0ZXJcbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyR3JvdXAge1xuICBmaWx0ZXJzOiBGaWx0ZXJzO1xufVxuXG4vKlxuICAqIENvbHVtbnNTb3J0Q29uZmlnXG4gICpcbiAgKiBDb25maWd1cmF0aW9uIHRvIHNvcnQgY29sdW1uc1xuICAqL1xuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5zU29ydENvbmZpZyB7XG4gIHByb3BlcnR5OiBzdHJpbmc7XG4gIG9yZGVyOiB7XG4gICAgdHlwZTogJ2FzYycgfCAnZGVzYydcbiAgfTtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyLCBNYXRTbmFja0JhclJlZiwgU2ltcGxlU25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgTWVzc2FnZVR5cGUgPSAnc3VjY2VzcycgfCAncHJpbWFyeScgfCAnaW5mbycgfCAnd2FybicgfCAnZXJyb3InO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEZWNTbmFja0JhclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzbmFja0JhclNlcnZpY2U6IE1hdFNuYWNrQmFyLFxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7IH1cblxuICBvcGVuKG1lc3NhZ2U6IHN0cmluZywgdHlwZTogTWVzc2FnZVR5cGUsIGR1cmF0aW9uID0gNGUzKTogTWF0U25hY2tCYXJSZWY8U2ltcGxlU25hY2tCYXI+IHtcbiAgICBjb25zdCBtc2cgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KG1lc3NhZ2UpO1xuICAgIGNvbnN0IHNuYWNrQ2xhc3MgPSB0aGlzLmdldENsYXNzKHR5cGUpO1xuXG4gICAgcmV0dXJuIHRoaXMuc25hY2tCYXJTZXJ2aWNlLm9wZW4obXNnLCAnJywge1xuICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgcGFuZWxDbGFzczogc25hY2tDbGFzc1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q2xhc3ModHlwZTogTWVzc2FnZVR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLXN1Y2Nlc3MnO1xuICAgICAgY2FzZSAncHJpbWFyeSc6XG4gICAgICAgIHJldHVybiAnc25hY2stcHJpbWFyeSc7XG4gICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1pbmZvJztcbiAgICAgIGNhc2UgJ3dhcm4nOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLXdhcm4nO1xuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLWVycm9yJztcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU25hY2tCYXJTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtc25hY2stYmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGVjU25hY2tCYXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU25hY2tCYXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IENhbkxvYWQsIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkLCBSb3V0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG9mLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGVjUGVybWlzc2lvbkd1YXJkIGltcGxlbWVudHMgQ2FuTG9hZCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cblxuICBjYW5Mb2FkKHJvdXRlOiBSb3V0ZSkge1xuICAgIGlmIChyb3V0ZS5kYXRhICYmICFyb3V0ZS5kYXRhLnBlcm1pc3Npb25zKSB7XG4gICAgICB0aGlzLm5vdEFsbG93ZWQoKTtcbiAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGVybWlzc2lvbnMgPSByb3V0ZS5kYXRhLnBlcm1pc3Npb25zO1xuICAgIHJldHVybiB0aGlzLmhhc0FjY2VzcyhwZXJtaXNzaW9ucyk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcbiAgICBpZiAocm91dGUuZGF0YSAmJiAhcm91dGUuZGF0YS5wZXJtaXNzaW9ucykge1xuICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcm1pc3Npb25zID0gcm91dGUuZGF0YS5wZXJtaXNzaW9ucztcbiAgICByZXR1cm4gdGhpcy5oYXNBY2Nlc3MocGVybWlzc2lvbnMpO1xuICB9XG5cbiAgY2FuQWN0aXZhdGVDaGlsZChyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcbiAgICByZXR1cm4gdGhpcy5jYW5BY3RpdmF0ZShyb3V0ZSwgc3RhdGUpO1xuICB9XG5cbiAgbm90QWxsb3dlZCgpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9mb3JiaWRlbiddKTtcbiAgfVxuXG4gIGhhc0FjY2VzcyhwZXJtaXNzaW9ucykge1xuICAgIHJldHVybiB0aGlzLmRlY29yYUFwaS51c2VyJFxuICAgIC5waXBlKFxuICAgICAgbWFwKHVzZXIgPT4ge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgIGNvbnN0IGFsbG93ZWQgPSB0aGlzLmlzQWxsb3dlZEFjY2Vzcyh1c2VyLnBlcm1pc3Npb25zLCBwZXJtaXNzaW9ucyk7XG4gICAgICAgICAgaWYgKCFhbGxvd2VkKSB7XG4gICAgICAgICAgICB0aGlzLm5vdEFsbG93ZWQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzQWxsb3dlZEFjY2Vzcyh1c2VyUGVybWlzc2lvbnM6IHN0cmluZ1tdLCBjdXJyZW50UGVybWlzc2lvbnM6IHN0cmluZ1tdKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1hdGNoaW5nUm9sZSA9IGN1cnJlbnRQZXJtaXNzaW9ucy5maW5kKCh1c2VyUm9sZSkgPT4ge1xuICAgICAgICByZXR1cm4gdXNlclBlcm1pc3Npb25zLmZpbmQoKGFsb3dlZFJvbGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gYWxvd2VkUm9sZSA9PT0gdXNlclJvbGU7XG4gICAgICAgIH0pID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWF0Y2hpbmdSb2xlID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjUGVybWlzc2lvbkd1YXJkIH0gZnJvbSAnLi9kZWMtcGVybWlzc2lvbi1ndWFyZC5zZXJ2aWNlJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1Blcm1pc3Npb25HdWFyZFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25HdWFyZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3BlbkNvbm5lY3Rpb24gfSBmcm9tICcuL3dzLWNsaWVudC5tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjV3NDbGllbnRTZXJ2aWNlIHtcblxuICBwcml2YXRlIGNvbm5lY3Rpb246IHtcbiAgICBba2V5OiBzdHJpbmddOiBPcGVuQ29ubmVjdGlvblxuICB9ID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGNvbm5lY3QodXJsKSB7XG5cbiAgICBjb25zdCBjb25uZWN0aW9uID0gdGhpcy5jb25uZWN0aW9uW3VybF07XG5cbiAgICBpZiAoY29ubmVjdGlvbikge1xuXG4gICAgICByZXR1cm4gY29ubmVjdGlvbjtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RUb1dzKHVybCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgY29ubmVjdFRvV3ModXJsKTogT3BlbkNvbm5lY3Rpb24ge1xuXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IHRoaXMub3BlbkNvbm5lY3Rpb24odXJsKTtcblxuICAgIHRoaXMuY29ubmVjdGlvblt1cmxdID0gY29ubmVjdGlvbjtcblxuICAgIHJldHVybiBjb25uZWN0aW9uO1xuXG4gIH1cblxuXG4gIHByaXZhdGUgb3BlbkNvbm5lY3Rpb24odXJsOiBzdHJpbmcsIGNvbm5lY3Rpb24/OiBPcGVuQ29ubmVjdGlvbik6IE9wZW5Db25uZWN0aW9uIHtcblxuICAgIGlmIChjb25uZWN0aW9uKSB7XG5cbiAgICAgIGNvbm5lY3Rpb24uY2hhbm5lbCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGNvbm5lY3Rpb24gPSBjb25uZWN0aW9uID8gY29ubmVjdGlvbiA6IHtcbiAgICAgICAgY2hhbm5lbDogbmV3IFdlYlNvY2tldCh1cmwpLFxuICAgICAgICBtZXNzYWdlczogbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pLFxuICAgICAgfTtcblxuICAgIH1cblxuICAgIGNvbm5lY3Rpb24uY2hhbm5lbC5vbmNsb3NlID0gKCkgPT4gdGhpcy5vcGVuQ29ubmVjdGlvbih1cmwsIGNvbm5lY3Rpb24pO1xuXG4gICAgY29ubmVjdGlvbi5jaGFubmVsLm9uZXJyb3IgPSAoKSA9PiB0aGlzLm9wZW5Db25uZWN0aW9uKHVybCwgY29ubmVjdGlvbik7XG5cbiAgICBjb25uZWN0aW9uLmNoYW5uZWwub25tZXNzYWdlID0gKGEpID0+IHtcblxuICAgICAgY29uc3QgY3VycmVudE1lc3NhZ2VzID0gY29ubmVjdGlvbi5tZXNzYWdlcy5nZXRWYWx1ZSgpO1xuXG4gICAgICBjdXJyZW50TWVzc2FnZXMudW5zaGlmdChhLmRhdGEpO1xuXG4gICAgICBjb25uZWN0aW9uLm1lc3NhZ2VzLm5leHQoY3VycmVudE1lc3NhZ2VzKTtcblxuICAgIH07XG5cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjV3NDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi93cy1jbGllbnQuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGVjV3NDbGllbnRTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjV3NDbGllbnRNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiZmlsdGVyIiwibm9vcCIsIkFVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBaUNFLHVCQUNVLE1BQ2lELE1BQXFCO1FBRmhGLGlCQU1DO1FBTFMsU0FBSSxHQUFKLElBQUk7UUFDNkMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtxQkFaekMsSUFBSSxlQUFlLENBQWUsU0FBUyxDQUFDOzs7O29CQXlCNUUsVUFBQyxTQUFvQjtZQUMxQixJQUFJLFNBQVMsRUFBRTtnQkFDYixxQkFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDcEQscUJBQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pHLHFCQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTtxQkFDMUIsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDO3FCQUNoQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxLQUFJLENBQUMsVUFBVSxDQUFlLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDO3FCQUMxRCxJQUFJLENBQ0gsR0FBRyxDQUFDLFVBQUMsR0FBRztvQkFDTixLQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDO3dCQUMxQixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkIsT0FBTyxHQUFHLENBQUM7aUJBQ1osQ0FBQyxDQUNILENBQUM7YUFDTDtpQkFBTTtnQkFDTCxPQUFPLFVBQVUsQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGlEQUFpRCxFQUFFLENBQUMsQ0FBQzthQUMzRztTQUNGOzRC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LEVBQUUsTUFBTSxFQUFFLHFCQUFxQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQ0FBa0MsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0NBQWtDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDBCQUEwQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsOENBQThDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxtQ0FBbUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZ0NBQWdDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDBCQUEwQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwyQkFBMkIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMkJBQTJCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSw2QkFBNkIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxzQ0FBc0MsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFF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