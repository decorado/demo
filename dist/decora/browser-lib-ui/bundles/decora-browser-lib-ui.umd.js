(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('@angular/material'), require('@angular/common'), require('@angular/router'), require('@ngx-translate/core'), require('@angular/flex-layout'), require('@ngu/carousel'), require('hammerjs'), require('@swimlane/ngx-datatable'), require('@angular/material/snack-bar')) :
    typeof define === 'function' && define.amd ? define('@decora/browser-lib-ui', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', '@angular/forms', '@angular/material', '@angular/common', '@angular/router', '@ngx-translate/core', '@angular/flex-layout', '@ngu/carousel', 'hammerjs', '@swimlane/ngx-datatable', '@angular/material/snack-bar'], factory) :
    (factory((global.decora = global.decora || {}, global.decora['browser-lib-ui'] = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs.operators,global.ng.forms,global.ng.material,global.ng.common,global.ng.router,null,global.ng['flex-layout'],null,null,null,global.ng.material['snack-bar']));
}(this, (function (exports,i0,http,rxjs,operators,forms,material,common,i2,i2$1,flexLayout,carousel,hammerjs,ngxDatatable,i1) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecApiService = (function () {
        function DecApiService(http$$1, config) {
            var _this = this;
            this.http = http$$1;
            this.config = config;
            this.user$ = new rxjs.BehaviorSubject(undefined);
            // ******************* //
            // PUBLIC AUTH METHODS //
            // ******************* //
            this.auth = function (loginData) {
                if (loginData) {
                    var /** @type {?} */ endpoint = _this.getResourceUrl('auth/signin');
                    var /** @type {?} */ options = { headers: _this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
                    var /** @type {?} */ body = new http.HttpParams()
                        .set('username', loginData.email)
                        .set('password', loginData.password);
                    return _this.postMethod(endpoint, body, options)
                        .pipe(operators.tap(function (res) {
                        _this.extratSessionToken(res),
                            _this.user$.next(res);
                        return res;
                    }));
                }
                else {
                    return rxjs.throwError({ status: status, notified: true, message: 'DECORA-API AUTH ERROR:: No credentials provided' });
                }
            };
            this.authFacebook = function (loginData) {
                if (loginData) {
                    var /** @type {?} */ endpoint = _this.getResourceUrl('auth/facebook/signin');
                    var /** @type {?} */ options = { headers: _this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
                    var /** @type {?} */ body = new http.HttpParams()
                        .set('facebookToken', loginData.facebookToken)
                        .set('keepLogged', loginData.keepLogged.toString());
                    return _this.postMethod(endpoint, body, options)
                        .pipe(operators.tap(function (res) {
                        _this.extratSessionToken(res),
                            _this.user$.next(res);
                        return res;
                    }));
                }
                else {
                    return rxjs.throwError({ status: status, notified: true, message: 'DECORA-API AUTH FACEBOOK ERROR:: No credentials provided' });
                }
            };
            this.logout = function (redirectToLoginPage) {
                if (redirectToLoginPage === void 0) {
                    redirectToLoginPage = true;
                }
                var /** @type {?} */ endpoint = _this.getResourceUrl('auth/signout');
                var /** @type {?} */ options = { headers: _this.newHeaderWithSessionToken('application/x-www-form-urlencoded') };
                return _this.postMethod(endpoint, {}, options)
                    .pipe(operators.tap(function (res) {
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
                    .pipe(operators.tap(function (res) {
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
                if (payload === void 0) {
                    payload = {};
                }
                var /** @type {?} */ endopintUrl = _this.getResourceUrl(endpoint);
                return _this.patchMethod(endopintUrl, payload, options);
            };
            this.post = function (endpoint, payload, options) {
                if (payload === void 0) {
                    payload = {};
                }
                var /** @type {?} */ endopintUrl = _this.getResourceUrl(endpoint);
                return _this.postMethod(endopintUrl, payload, options);
            };
            this.put = function (endpoint, payload, options) {
                if (payload === void 0) {
                    payload = {};
                }
                var /** @type {?} */ endopintUrl = _this.getResourceUrl(endpoint);
                return _this.putMethod(endopintUrl, payload, options);
            };
            this.upsert = function (endpoint, payload, options) {
                if (payload === void 0) {
                    payload = {};
                }
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
                    return rxjs.throwError({ status: status, statusText: statusText, message: message, bodyMessage: bodyMessage });
                }
                else {
                    return rxjs.throwError({ status: status, statusText: statusText, message: message, bodyMessage: bodyMessage });
                }
            };
            this.subscribeToUser();
            this.tryToLoadSignedInUser();
        }
        Object.defineProperty(DecApiService.prototype, "host", {
            get: /**
             * @return {?}
             */ function () {
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
                if (options === void 0) {
                    options = {};
                }
                var /** @type {?} */ endopintUrl = this.getResourceUrl(endpoint);
                var /** @type {?} */ formData = this.createFilesFormData(files);
                options["reportProgress"] = true;
                options.headers = options.headers || new http.HttpHeaders();
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
                    if (filter.columns) {
                        serializedFilter.columns = filter.columns;
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
                if (search === void 0) {
                    search = {};
                }
                if (options === void 0) {
                    options = {};
                }
                options.params = search;
                options.withCredentials = true;
                options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
                var /** @type {?} */ callObservable = this.http.get(url, options)
                    .pipe(operators.catchError(this.handleError));
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
                if (body === void 0) {
                    body = {};
                }
                if (options === void 0) {
                    options = {};
                }
                options.withCredentials = true;
                options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
                var /** @type {?} */ callObservable = this.http.patch(url, body, options)
                    .pipe(operators.catchError(this.handleError));
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
                if (options === void 0) {
                    options = {};
                }
                options.withCredentials = true;
                options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
                var /** @type {?} */ callObservable = this.http.post(url, body, options)
                    .pipe(operators.catchError(this.handleError));
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
                if (body === void 0) {
                    body = {};
                }
                if (options === void 0) {
                    options = {};
                }
                options.withCredentials = true;
                options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
                var /** @type {?} */ callObservable = this.http.put(url, body, options)
                    .pipe(operators.catchError(this.handleError));
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
                if (options === void 0) {
                    options = {};
                }
                options.withCredentials = true;
                options.headers = this.newHeaderWithSessionToken('application/json', options.headers);
                var /** @type {?} */ callObservable = this.http.delete(url, options)
                    .pipe(operators.catchError(this.handleError));
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
                if (body === void 0) {
                    body = {};
                }
                if (options === void 0) {
                    options = {};
                }
                options.withCredentials = true;
                options.headers = this.newHeaderWithSessionToken(undefined, options.headers);
                var /** @type {?} */ req = new http.HttpRequest(type, url, body, options);
                var /** @type {?} */ callObservable = this.http.request(req)
                    .pipe(operators.catchError(this.handleError));
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
                headers = headers || new http.HttpHeaders();
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
                return call.pipe(operators.share());
            };
        DecApiService.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        DecApiService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: ['DECORA_API_SERVICE_CONFIG',] }] }
            ];
        };
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DecAutocompleteComponent; }),
        multi: true
    };
    var DecAutocompleteComponent = (function () {
        function DecAutocompleteComponent(formBuilder, service) {
            var _this = this;
            this.formBuilder = formBuilder;
            this.service = service;
            this.name = 'autocompleteInput';
            this.placeholder = '';
            // Events
            this.blur = new i0.EventEmitter();
            this.optionSelected = new i0.EventEmitter();
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
             */ function () {
                return this._disabled;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._options;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this.innerValue;
            },
            /*
            ** ngModel VALUE
            */
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
                if (reopen === void 0) {
                    reopen = false;
                }
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
                    .pipe(operators.startWith(''), operators.debounceTime(300), operators.distinctUntilChanged(), operators.switchMap(function (textSearch) {
                    var /** @type {?} */ isStringTerm = typeof textSearch === 'string';
                    if (isStringTerm) {
                        return _this.searchBasedFetchingType(textSearch);
                    }
                    else {
                        return rxjs.of(_this.innerOptions);
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
                        .pipe(operators.tap(function (options) {
                        _this.innerOptions = options;
                    }));
                }
                else {
                    var /** @type {?} */ body = textSearch ? { textSearch: textSearch } : undefined;
                    return this.service.get(this.endpoint, body)
                        .pipe(operators.tap(function (options) {
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
                return rxjs.of(filteredData);
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
            { type: i0.Component, args: [{
                        selector: 'dec-autocomplete',
                        template: "<div>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    #termInput\n    [matAutocomplete]=\"autocomplete\"\n    [formControl]=\"autocompleteInput\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [placeholder]=\"placeholder\"\n    (blur)=\"onBlur($event)\">\n\n    <button mat-icon-button matSuffix (click)=\"clear(true)\" *ngIf=\"!disabled && !required && autocompleteInput.value\">\n      <mat-icon>close</mat-icon>\n    </button>\n\n    <button mat-icon-button matSuffix (click)=\"reset()\" *ngIf=\"!disabled && value !== writtenValue\">\n      <mat-icon>replay</mat-icon>\n    </button>\n\n  </mat-form-field>\n\n  <mat-autocomplete #autocomplete=\"matAutocomplete\"\n  [displayWith]=\"extractLabel\"\n  (optionSelected)=\"onOptionSelected($event)\"\n  name=\"autocompleteValue\">\n    <mat-option *ngFor=\"let item of (options$ | async)\" [value]=\"item\">\n      {{ extractLabel(item) }}\n    </mat-option>\n  </mat-autocomplete>\n</div>\n\n",
                        styles: [],
                        providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        DecAutocompleteComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder },
                { type: DecApiService }
            ];
        };
        DecAutocompleteComponent.propDecorators = {
            autocompleteTrigger: [{ type: i0.ViewChild, args: [material.MatAutocompleteTrigger,] }],
            customFetchFunction: [{ type: i0.Input }],
            endpoint: [{ type: i0.Input }],
            disabled: [{ type: i0.Input }],
            labelFn: [{ type: i0.Input }],
            labelAttr: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            options: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            required: [{ type: i0.Input }],
            valueFn: [{ type: i0.Input }],
            valueAttr: [{ type: i0.Input }],
            blur: [{ type: i0.Output }],
            optionSelected: [{ type: i0.Output }],
            termInput: [{ type: i0.ViewChild, args: ['termInput',] }]
        };
        return DecAutocompleteComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecAutocompleteModule = (function () {
        function DecAutocompleteModule() {
        }
        DecAutocompleteModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatAutocompleteModule,
                            material.MatInputModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DecAutocompleteAccountComponent; }),
        multi: true
    };
    var DecAutocompleteAccountComponent = (function () {
        function DecAutocompleteAccountComponent(decoraApi) {
            var _this = this;
            this.decoraApi = decoraApi;
            this.endpoint = 'accounts/options';
            this.labelAttr = 'value';
            this.valueAttr = 'key';
            this.name = 'Account autocomplete';
            this.placeholder = 'Account autocomplete';
            this.blur = new i0.EventEmitter();
            this.optionSelected = new i0.EventEmitter();
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
             */ function () {
                return this.innerValue;
            },
            // Set accessor including call the onchange callback
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-autocomplete-account',
                        template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[customFetchFunction]=\"customFetchFunction\"\n[(ngModel)]=\"value\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
                        styles: [],
                        providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        DecAutocompleteAccountComponent.ctorParameters = function () {
            return [
                { type: DecApiService }
            ];
        };
        DecAutocompleteAccountComponent.propDecorators = {
            types: [{ type: i0.Input }],
            disabled: [{ type: i0.Input }],
            required: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            blur: [{ type: i0.Output }],
            optionSelected: [{ type: i0.Output }]
        };
        return DecAutocompleteAccountComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecAutocompleteAccountModule = (function () {
        function DecAutocompleteAccountModule() {
        }
        DecAutocompleteAccountModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DecAutocompleteCompanyComponent; }),
        multi: true
    };
    var DecAutocompleteCompanyComponent = (function () {
        function DecAutocompleteCompanyComponent() {
            this.endpoint = 'companies/options';
            this.valueAttr = 'key';
            this.name = 'Company autocomplete';
            this.placeholder = 'Company autocomplete';
            this.blur = new i0.EventEmitter();
            this.optionSelected = new i0.EventEmitter();
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
             */ function () {
                return this.innerValue;
            },
            // Set accessor including call the onchange callback
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-autocomplete-company',
                        template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[endpoint]=\"endpoint\"\n[(ngModel)]=\"value\"\n[labelFn]=\"labelFn\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
                        styles: [],
                        providers: [AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        DecAutocompleteCompanyComponent.ctorParameters = function () { return []; };
        DecAutocompleteCompanyComponent.propDecorators = {
            disabled: [{ type: i0.Input }],
            required: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            blur: [{ type: i0.Output }],
            optionSelected: [{ type: i0.Output }]
        };
        return DecAutocompleteCompanyComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecAutocompleteCompanyModule = (function () {
        function DecAutocompleteCompanyModule() {
        }
        DecAutocompleteCompanyModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DecAutocompleteCountryComponent; }),
        multi: true
    };
    var DecAutocompleteCountryComponent = (function () {
        function DecAutocompleteCountryComponent() {
            this.lang = 'en';
            this.name = 'Country autocomplete';
            this.placeholder = 'Country autocomplete';
            this.blur = new i0.EventEmitter();
            this.optionSelected = new i0.EventEmitter();
            this.innerValue = '';
            this.onTouchedCallback = noop$3;
            this.onChangeCallback = noop$3;
            this.labelFn = function (item) {
                return item ? item.name : item;
            };
            this.valueFn = function (item) {
                return item ? item.code : item;
            };
            this.countries$ = rxjs.of(FAKE_DATA);
        }
        Object.defineProperty(DecAutocompleteCountryComponent.prototype, "value", {
            /*
            ** ngModel API
            */
            // Get accessor
            get: /**
             * @return {?}
             */ function () {
                return this.innerValue;
            },
            // Set accessor including call the onchange callback
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-autocomplete-country',
                        template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[options]=\"(countries$ | async)\"\n[(ngModel)]=\"value\"\n[labelFn]=\"labelFn\"\n[valueFn]=\"valueFn\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
                        styles: [],
                        providers: [AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        DecAutocompleteCountryComponent.ctorParameters = function () { return []; };
        DecAutocompleteCountryComponent.propDecorators = {
            lang: [{ type: i0.Input }],
            disabled: [{ type: i0.Input }],
            required: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            blur: [{ type: i0.Output }],
            optionSelected: [{ type: i0.Output }]
        };
        return DecAutocompleteCountryComponent;
    }());
    var /** @type {?} */ FAKE_DATA = [{ 'code': 'AD', 'name': 'Andorra' }, { 'code': 'AE', 'name': 'United Arab Emirates' }, { 'code': 'AF', 'name': 'Afghanistan' }, { 'code': 'AG', 'name': 'Antigua and Barbuda' }, { 'code': 'AI', 'name': 'Anguilla' }, { 'code': 'AL', 'name': 'Albania' }, { 'code': 'AM', 'name': 'Armenia' }, { 'code': 'AN', 'name': 'Netherlands Antilles' }, { 'code': 'AO', 'name': 'Angola' }, { 'code': 'AQ', 'name': 'Antarctica' }, { 'code': 'AR', 'name': 'Argentina' }, { 'code': 'AS', 'name': 'American Samoa' }, { 'code': 'AT', 'name': 'Austria' }, { 'code': 'AU', 'name': 'Australia' }, { 'code': 'AW', 'name': 'Aruba' }, { 'code': 'AX', 'name': 'Åland Islands' }, { 'code': 'AZ', 'name': 'Azerbaijan' }, { 'code': 'BA', 'name': 'Bosnia and Herzegovina' }, { 'code': 'BB', 'name': 'Barbados' }, { 'code': 'BD', 'name': 'Bangladesh' }, { 'code': 'BE', 'name': 'Belgium' }, { 'code': 'BF', 'name': 'Burkina Faso' }, { 'code': 'BG', 'name': 'Bulgaria' }, { 'code': 'BH', 'name': 'Bahrain' }, { 'code': 'BI', 'name': 'Burundi' }, { 'code': 'BJ', 'name': 'Benin' }, { 'code': 'BL', 'name': 'Saint Barthélemy' }, { 'code': 'BM', 'name': 'Bermuda' }, { 'code': 'BN', 'name': 'Brunei' }, { 'code': 'BO', 'name': 'Bolivia' }, { 'code': 'BQ', 'name': 'Bonaire, Sint Eustatius and Saba' }, { 'code': 'BR', 'name': 'Brazil' }, { 'code': 'BS', 'name': 'Bahamas' }, { 'code': 'BT', 'name': 'Bhutan' }, { 'code': 'BV', 'name': 'Bouvet Island' }, { 'code': 'BW', 'name': 'Botswana' }, { 'code': 'BY', 'name': 'Belarus' }, { 'code': 'BZ', 'name': 'Belize' }, { 'code': 'CA', 'name': 'Canada' }, { 'code': 'CC', 'name': 'Cocos Islands' }, { 'code': 'CD', 'name': 'The Democratic Republic Of Congo' }, { 'code': 'CF', 'name': 'Central African Republic' }, { 'code': 'CG', 'name': 'Congo' }, { 'code': 'CH', 'name': 'Switzerland' }, { 'code': 'CI', 'name': 'Côte d\'Ivoire' }, { 'code': 'CK', 'name': 'Cook Islands' }, { 'code': 'CL', 'name': 'Chile' }, { 'code': 'CM', 'name': 'Cameroon' }, { 'code': 'CN', 'name': 'China' }, { 'code': 'CO', 'name': 'Colombia' }, { 'code': 'CR', 'name': 'Costa Rica' }, { 'code': 'CU', 'name': 'Cuba' }, { 'code': 'CV', 'name': 'Cape Verde' }, { 'code': 'CW', 'name': 'Curaçao' }, { 'code': 'CX', 'name': 'Christmas Island' }, { 'code': 'CY', 'name': 'Cyprus' }, { 'code': 'CZ', 'name': 'Czech Republic' }, { 'code': 'DE', 'name': 'Germany' }, { 'code': 'DJ', 'name': 'Djibouti' }, { 'code': 'DK', 'name': 'Denmark' }, { 'code': 'DM', 'name': 'Dominica' }, { 'code': 'DO', 'name': 'Dominican Republic' }, { 'code': 'DZ', 'name': 'Algeria' }, { 'code': 'EC', 'name': 'Ecuador' }, { 'code': 'EE', 'name': 'Estonia' }, { 'code': 'EG', 'name': 'Egypt' }, { 'code': 'EH', 'name': 'Western Sahara' }, { 'code': 'ER', 'name': 'Eritrea' }, { 'code': 'ES', 'name': 'Spain' }, { 'code': 'ET', 'name': 'Ethiopia' }, { 'code': 'FI', 'name': 'Finland' }, { 'code': 'FJ', 'name': 'Fiji' }, { 'code': 'FK', 'name': 'Falkland Islands' }, { 'code': 'FM', 'name': 'Micronesia' }, { 'code': 'FO', 'name': 'Faroe Islands' }, { 'code': 'FR', 'name': 'France' }, { 'code': 'GA', 'name': 'Gabon' }, { 'code': 'GB', 'name': 'United Kingdom' }, { 'code': 'GD', 'name': 'Grenada' }, { 'code': 'GE', 'name': 'Georgia' }, { 'code': 'GF', 'name': 'French Guiana' }, { 'code': 'GG', 'name': 'Guernsey' }, { 'code': 'GH', 'name': 'Ghana' }, { 'code': 'GI', 'name': 'Gibraltar' }, { 'code': 'GL', 'name': 'Greenland' }, { 'code': 'GM', 'name': 'Gambia' }, { 'code': 'GN', 'name': 'Guinea' }, { 'code': 'GP', 'name': 'Guadeloupe' }, { 'code': 'GQ', 'name': 'Equatorial Guinea' }, { 'code': 'GR', 'name': 'Greece' }, { 'code': 'GS', 'name': 'South Georgia And The South Sandwich Islands' }, { 'code': 'GT', 'name': 'Guatemala' }, { 'code': 'GU', 'name': 'Guam' }, { 'code': 'GW', 'name': 'Guinea-Bissau' }, { 'code': 'GY', 'name': 'Guyana' }, { 'code': 'HK', 'name': 'Hong Kong' }, { 'code': 'HM', 'name': 'Heard Island And McDonald Islands' }, { 'code': 'HN', 'name': 'Honduras' }, { 'code': 'HR', 'name': 'Croatia' }, { 'code': 'HT', 'name': 'Haiti' }, { 'code': 'HU', 'name': 'Hungary' }, { 'code': 'ID', 'name': 'Indonesia' }, { 'code': 'IE', 'name': 'Ireland' }, { 'code': 'IL', 'name': 'Israel' }, { 'code': 'IM', 'name': 'Isle Of Man' }, { 'code': 'IN', 'name': 'India' }, { 'code': 'IO', 'name': 'British Indian Ocean Territory' }, { 'code': 'IQ', 'name': 'Iraq' }, { 'code': 'IR', 'name': 'Iran' }, { 'code': 'IS', 'name': 'Iceland' }, { 'code': 'IT', 'name': 'Italy' }, { 'code': 'JE', 'name': 'Jersey' }, { 'code': 'JM', 'name': 'Jamaica' }, { 'code': 'JO', 'name': 'Jordan' }, { 'code': 'JP', 'name': 'Japan' }, { 'code': 'KE', 'name': 'Kenya' }, { 'code': 'KG', 'name': 'Kyrgyzstan' }, { 'code': 'KH', 'name': 'Cambodia' }, { 'code': 'KI', 'name': 'Kiribati' }, { 'code': 'KM', 'name': 'Comoros' }, { 'code': 'KN', 'name': 'Saint Kitts And Nevis' }, { 'code': 'KP', 'name': 'North Korea' }, { 'code': 'KR', 'name': 'South Korea' }, { 'code': 'KW', 'name': 'Kuwait' }, { 'code': 'KY', 'name': 'Cayman Islands' }, { 'code': 'KZ', 'name': 'Kazakhstan' }, { 'code': 'LA', 'name': 'Laos' }, { 'code': 'LB', 'name': 'Lebanon' }, { 'code': 'LC', 'name': 'Saint Lucia' }, { 'code': 'LI', 'name': 'Liechtenstein' }, { 'code': 'LK', 'name': 'Sri Lanka' }, { 'code': 'LR', 'name': 'Liberia' }, { 'code': 'LS', 'name': 'Lesotho' }, { 'code': 'LT', 'name': 'Lithuania' }, { 'code': 'LU', 'name': 'Luxembourg' }, { 'code': 'LV', 'name': 'Latvia' }, { 'code': 'LY', 'name': 'Libya' }, { 'code': 'MA', 'name': 'Morocco' }, { 'code': 'MC', 'name': 'Monaco' }, { 'code': 'MD', 'name': 'Moldova' }, { 'code': 'ME', 'name': 'Montenegro' }, { 'code': 'MF', 'name': 'Saint Martin' }, { 'code': 'MG', 'name': 'Madagascar' }, { 'code': 'MH', 'name': 'Marshall Islands' }, { 'code': 'MK', 'name': 'Macedonia' }, { 'code': 'ML', 'name': 'Mali' }, { 'code': 'MM', 'name': 'Myanmar' }, { 'code': 'MN', 'name': 'Mongolia' }, { 'code': 'MO', 'name': 'Macao' }, { 'code': 'MP', 'name': 'Northern Mariana Islands' }, { 'code': 'MQ', 'name': 'Martinique' }, { 'code': 'MR', 'name': 'Mauritania' }, { 'code': 'MS', 'name': 'Montserrat' }, { 'code': 'MT', 'name': 'Malta' }, { 'code': 'MU', 'name': 'Mauritius' }, { 'code': 'MV', 'name': 'Maldives' }, { 'code': 'MW', 'name': 'Malawi' }, { 'code': 'MX', 'name': 'Mexico' }, { 'code': 'MY', 'name': 'Malaysia' }, { 'code': 'MZ', 'name': 'Mozambique' }, { 'code': 'NA', 'name': 'Namibia' }, { 'code': 'NC', 'name': 'New Caledonia' }, { 'code': 'NE', 'name': 'Niger' }, { 'code': 'NF', 'name': 'Norfolk Island' }, { 'code': 'NG', 'name': 'Nigeria' }, { 'code': 'NI', 'name': 'Nicaragua' }, { 'code': 'NL', 'name': 'Netherlands' }, { 'code': 'NO', 'name': 'Norway' }, { 'code': 'NP', 'name': 'Nepal' }, { 'code': 'NR', 'name': 'Nauru' }, { 'code': 'NU', 'name': 'Niue' }, { 'code': 'NZ', 'name': 'New Zealand' }, { 'code': 'OM', 'name': 'Oman' }, { 'code': 'PA', 'name': 'Panama' }, { 'code': 'PE', 'name': 'Peru' }, { 'code': 'PF', 'name': 'French Polynesia' }, { 'code': 'PG', 'name': 'Papua New Guinea' }, { 'code': 'PH', 'name': 'Philippines' }, { 'code': 'PK', 'name': 'Pakistan' }, { 'code': 'PL', 'name': 'Poland' }, { 'code': 'PM', 'name': 'Saint Pierre And Miquelon' }, { 'code': 'PN', 'name': 'Pitcairn' }, { 'code': 'PR', 'name': 'Puerto Rico' }, { 'code': 'PS', 'name': 'Palestine' }, { 'code': 'PT', 'name': 'Portugal' }, { 'code': 'PW', 'name': 'Palau' }, { 'code': 'PY', 'name': 'Paraguay' }, { 'code': 'QA', 'name': 'Qatar' }, { 'code': 'RE', 'name': 'Reunion' }, { 'code': 'RO', 'name': 'Romania' }, { 'code': 'RS', 'name': 'Serbia' }, { 'code': 'RU', 'name': 'Russia' }, { 'code': 'RW', 'name': 'Rwanda' }, { 'code': 'SA', 'name': 'Saudi Arabia' }, { 'code': 'SB', 'name': 'Solomon Islands' }, { 'code': 'SC', 'name': 'Seychelles' }, { 'code': 'SD', 'name': 'Sudan' }, { 'code': 'SE', 'name': 'Sweden' }, { 'code': 'SG', 'name': 'Singapore' }, { 'code': 'SH', 'name': 'Saint Helena' }, { 'code': 'SI', 'name': 'Slovenia' }, { 'code': 'SJ', 'name': 'Svalbard And Jan Mayen' }, { 'code': 'SK', 'name': 'Slovakia' }, { 'code': 'SL', 'name': 'Sierra Leone' }, { 'code': 'SM', 'name': 'San Marino' }, { 'code': 'SN', 'name': 'Senegal' }, { 'code': 'SO', 'name': 'Somalia' }, { 'code': 'SR', 'name': 'Suriname' }, { 'code': 'SS', 'name': 'South Sudan' }, { 'code': 'ST', 'name': 'Sao Tome And Principe' }, { 'code': 'SV', 'name': 'El Salvador' }, { 'code': 'SX', 'name': 'Sint Maarten (Dutch part)' }, { 'code': 'SY', 'name': 'Syria' }, { 'code': 'SZ', 'name': 'Swaziland' }, { 'code': 'TC', 'name': 'Turks And Caicos Islands' }, { 'code': 'TD', 'name': 'Chad' }, { 'code': 'TF', 'name': 'French Southern Territories' }, { 'code': 'TG', 'name': 'Togo' }, { 'code': 'TH', 'name': 'Thailand' }, { 'code': 'TJ', 'name': 'Tajikistan' }, { 'code': 'TK', 'name': 'Tokelau' }, { 'code': 'TL', 'name': 'Timor-Leste' }, { 'code': 'TM', 'name': 'Turkmenistan' }, { 'code': 'TN', 'name': 'Tunisia' }, { 'code': 'TO', 'name': 'Tonga' }, { 'code': 'TR', 'name': 'Turkey' }, { 'code': 'TT', 'name': 'Trinidad and Tobago' }, { 'code': 'TV', 'name': 'Tuvalu' }, { 'code': 'TW', 'name': 'Taiwan' }, { 'code': 'TZ', 'name': 'Tanzania' }, { 'code': 'UA', 'name': 'Ukraine' }, { 'code': 'UG', 'name': 'Uganda' }, { 'code': 'UM', 'name': 'United States Minor Outlying Islands' }, { 'code': 'UY', 'name': 'Uruguay' }, { 'code': 'UZ', 'name': 'Uzbekistan' }, { 'code': 'VA', 'name': 'Vatican' }, { 'code': 'VC', 'name': 'Saint Vincent And The Grenadines' }, { 'code': 'VE', 'name': 'Venezuela' }, { 'code': 'VG', 'name': 'British Virgin Islands' }, { 'code': 'VI', 'name': 'U.S. Virgin Islands' }, { 'code': 'VN', 'name': 'Vietnam' }, { 'code': 'VU', 'name': 'Vanuatu' }, { 'code': 'WF', 'name': 'Wallis And Futuna' }, { 'code': 'WS', 'name': 'Samoa' }, { 'code': 'YE', 'name': 'Yemen' }, { 'code': 'YT', 'name': 'Mayotte' }, { 'code': 'ZA', 'name': 'South Africa' }, { 'code': 'ZM', 'name': 'Zambia' }, { 'code': 'ZW', 'name': 'Zimbabwe' }];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecAutocompleteCountryModule = (function () {
        function DecAutocompleteCountryModule() {
        }
        DecAutocompleteCountryModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DecAutocompleteDepartmentComponent; }),
        multi: true
    };
    var DecAutocompleteDepartmentComponent = (function () {
        function DecAutocompleteDepartmentComponent() {
            this.labelAttr = 'value';
            this.valueAttr = 'key';
            this.name = 'Department autocomplete';
            this.placeholder = 'Department autocomplete';
            this.blur = new i0.EventEmitter();
            this.optionSelected = new i0.EventEmitter();
            this.innerValue = '';
            this.onTouchedCallback = noop$4;
            this.onChangeCallback = noop$4;
        }
        Object.defineProperty(DecAutocompleteDepartmentComponent.prototype, "companyId", {
            get: /**
             * @return {?}
             */ function () {
                return this._companyId;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this.innerValue;
            },
            // Set accessor including call the onchange callback
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-autocomplete-department',
                        template: "<div *ngIf=\"endpoint else fakeDisabled\">\n  <dec-autocomplete\n  [disabled]=\"!companyId || disabled\"\n  [endpoint]=\"endpoint\"\n  [labelAttr]=\"labelAttr\"\n  [name]=\"name\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
                        styles: [],
                        providers: [AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        DecAutocompleteDepartmentComponent.ctorParameters = function () { return []; };
        DecAutocompleteDepartmentComponent.propDecorators = {
            companyId: [{ type: i0.Input }],
            disabled: [{ type: i0.Input }],
            required: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            blur: [{ type: i0.Output }],
            optionSelected: [{ type: i0.Output }]
        };
        return DecAutocompleteDepartmentComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecAutocompleteDepartmentModule = (function () {
        function DecAutocompleteDepartmentModule() {
        }
        DecAutocompleteDepartmentModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            DecAutocompleteModule,
                            material.MatInputModule
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DecAutocompleteRoleComponent; }),
        multi: true
    };
    var DecAutocompleteRoleComponent = (function () {
        function DecAutocompleteRoleComponent(decoraApi) {
            var _this = this;
            this.decoraApi = decoraApi;
            this.endpoint = 'roles/options';
            this.labelAttr = 'value';
            this.valueAttr = 'key';
            this.name = 'Role autocomplete';
            this.placeholder = 'Role autocomplete';
            this.blur = new i0.EventEmitter();
            this.optionSelected = new i0.EventEmitter();
            this.innerValue = '';
            this.onTouchedCallback = noop$5;
            this.onChangeCallback = noop$5;
            this.customFetchFunction = function (textSearch) {
                var /** @type {?} */ search = textSearch ? { textSearch: textSearch } : undefined;
                return _this.decoraApi.get(_this.endpoint, search)
                    .pipe(operators.map(function (roles) {
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
             */ function () {
                return this.innerValue;
            },
            // Set accessor including call the onchange callback
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-autocomplete-role',
                        template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n[customFetchFunction]=\"customFetchFunction\"\n[(ngModel)]=\"value\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>\n",
                        styles: [],
                        providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR$1]
                    },] },
        ];
        /** @nocollapse */
        DecAutocompleteRoleComponent.ctorParameters = function () {
            return [
                { type: DecApiService }
            ];
        };
        DecAutocompleteRoleComponent.propDecorators = {
            types: [{ type: i0.Input }],
            disabled: [{ type: i0.Input }],
            required: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            blur: [{ type: i0.Output }],
            optionSelected: [{ type: i0.Output }]
        };
        return DecAutocompleteRoleComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecAutocompleteRoleModule = (function () {
        function DecAutocompleteRoleModule() {
        }
        DecAutocompleteRoleModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DecAutocompleteProjectComponent; }),
        multi: true
    };
    var DecAutocompleteProjectComponent = (function () {
        function DecAutocompleteProjectComponent(decoraApi) {
            var _this = this;
            this.decoraApi = decoraApi;
            this.valueAttr = 'key';
            this.name = 'Project autocomplete';
            this.placeholder = 'Project autocomplete';
            this.blur = new i0.EventEmitter();
            this.optionSelected = new i0.EventEmitter();
            this.innerValue = '';
            this.onTouchedCallback = noop$6;
            this.onChangeCallback = noop$6;
            this.customFetchFunction = function (textSearch) {
                var /** @type {?} */ params = {};
                params.textSearch = textSearch;
                _this.setEndpointBasedOnCompanyId();
                return _this.decoraApi.get(_this.endpoint, params)
                    .pipe(operators.map(function (projects) {
                    return projects;
                }));
            };
        }
        Object.defineProperty(DecAutocompleteProjectComponent.prototype, "companyId", {
            get: /**
             * @return {?}
             */ function () {
                return this._companyId;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this.innerValue;
            },
            // Set accessor including call the onchange callback
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-autocomplete-project',
                        template: "<div *ngIf=\"(endpoint && companyId) else fakeDisabled\">\n  <dec-autocomplete\n  #autocomplete\n  [endpoint]=\"endpoint\"\n  [labelFn]=\"labelFn\"\n  [name]=\"name\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  [disabled]=\"disabled\"\n  [customFetchFunction]=\"customFetchFunction\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
                        styles: [],
                        providers: [AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        DecAutocompleteProjectComponent.ctorParameters = function () {
            return [
                { type: DecApiService }
            ];
        };
        DecAutocompleteProjectComponent.propDecorators = {
            companyId: [{ type: i0.Input }],
            disabled: [{ type: i0.Input }],
            required: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            blur: [{ type: i0.Output }],
            optionSelected: [{ type: i0.Output }]
        };
        return DecAutocompleteProjectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecAutocompleteProjectModule = (function () {
        function DecAutocompleteProjectModule() {
        }
        DecAutocompleteProjectModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            DecAutocompleteModule,
                            material.MatInputModule
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DecAutocompleteQuoteComponent; }),
        multi: true
    };
    var DecAutocompleteQuoteComponent = (function () {
        function DecAutocompleteQuoteComponent(decoraApi) {
            var _this = this;
            this.decoraApi = decoraApi;
            this.BASE_ENDPOINT = '/legacy/project/${projectId}/quote';
            this.labelAttr = 'value';
            this.valueAttr = 'key';
            this.name = 'Quote autocomplete';
            this.placeholder = 'Quote autocomplete';
            this.blur = new i0.EventEmitter();
            this.optionSelected = new i0.EventEmitter();
            this.innerValue = '';
            this.onTouchedCallback = noop$7;
            this.onChangeCallback = noop$7;
            this.customFetchFunction = function (textSearch) {
                var /** @type {?} */ params = {};
                params.textSearch = textSearch;
                _this.setEndpointBasedOnProjectId();
                return _this.decoraApi.get(_this.endpoint, params)
                    .pipe(operators.map(function (response) {
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
             */ function () {
                return this._projectId;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this.innerValue;
            },
            // Set accessor including call the onchange callback
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-autocomplete-quote',
                        template: "<div *ngIf=\"endpoint else fakeDisabled\">\n  <dec-autocomplete\n  [disabled]=\"!projectId || disabled\"\n  [endpoint]=\"endpoint\"\n  [labelAttr]=\"labelAttr\"\n  [name]=\"name\"\n  [placeholder]=\"placeholder\"\n  [required]=\"required\"\n  [valueAttr]=\"valueAttr\"\n  [(ngModel)]=\"value\"\n  [customFetchFunction]=\"customFetchFunction\"\n  (optionSelected)=\"optionSelected.emit($event)\"\n  (blur)=\"blur.emit($event)\"></dec-autocomplete>\n</div>\n\n<ng-template #fakeDisabled>\n  <mat-form-field>\n    <input matInput\n    [attr.aria-label]=\"name\"\n    [name]=\"name\"\n    [required]=\"required\"\n    [disabled]=\"true\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n</ng-template>\n\n",
                        styles: [],
                        providers: [AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        DecAutocompleteQuoteComponent.ctorParameters = function () {
            return [
                { type: DecApiService }
            ];
        };
        DecAutocompleteQuoteComponent.propDecorators = {
            projectId: [{ type: i0.Input }],
            disabled: [{ type: i0.Input }],
            required: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            blur: [{ type: i0.Output }],
            optionSelected: [{ type: i0.Output }]
        };
        return DecAutocompleteQuoteComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecAutocompleteQuoteModule = (function () {
        function DecAutocompleteQuoteModule() {
        }
        DecAutocompleteQuoteModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            DecAutocompleteModule,
                            material.MatInputModule
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
    var DecBreadcrumbComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'dec-breadcrumb',
                        template: "<div fxLayout=\"row\" class=\"dec-breadcrumb-wrapper\">\n\n  <div fxFlex>\n    <div fxLayout=\"column\">\n      <div class=\"title\">\n        <h1>{{feature}}</h1>\n      </div>\n      <div class=\"breadcrumb\">\n        {{breadcrumb}}\n      </div>\n    </div>\n  </div>\n\n  <div fxFlex fxFlexAlign=\"center\" fxLayoutAlign=\"end\">\n    <div fxLayout=\"row\">\n      <div fxFlex>\n        <!-- CONTENT  -->\n        <ng-content></ng-content>\n        <!-- BACK BUTTON -->\n        <button type=\"button\" mat-raised-button color=\"default\" *ngIf=\"backButtonPath\" (click)=\"goBack()\">{{ backLabel }}</button>\n        <!-- FORWARD BUTTON -->\n        <button type=\"button\" mat-raised-button color=\"default\" *ngIf=\"forwardButton\" (click)=\"goForward()\">{{ forwardLabel }}</button>\n      </div>\n    </div>\n  </div>\n\n</div>\n",
                        styles: [".dec-breadcrumb-wrapper{margin-bottom:32px}.dec-breadcrumb-wrapper h1{font-size:24px;font-weight:400;margin-top:4px;margin-bottom:4px}.dec-breadcrumb-wrapper .breadcrumb{color:#a8a8a8}"],
                    },] },
        ];
        /** @nocollapse */
        DecBreadcrumbComponent.ctorParameters = function () {
            return [
                { type: i2.Router },
                { type: i2$1.TranslateService }
            ];
        };
        DecBreadcrumbComponent.propDecorators = {
            backButtonPath: [{ type: i0.Input }],
            breadcrumb: [{ type: i0.Input }],
            feature: [{ type: i0.Input }],
            forwardButton: [{ type: i0.Input }],
            i18nFeature: [{ type: i0.Input }],
            i18nBreadcrumb: [{ type: i0.Input }],
            backLabel: [{ type: i0.Input }],
            forwardLabel: [{ type: i0.Input }]
        };
        return DecBreadcrumbComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecBreadcrumbModule = (function () {
        function DecBreadcrumbModule() {
        }
        DecBreadcrumbModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            flexLayout.FlexLayoutModule,
                            material.MatButtonModule,
                            i2.RouterModule,
                            i2$1.TranslateModule,
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
    var DecDialogComponent = (function () {
        function DecDialogComponent(factor, dialogRef) {
            var _this = this;
            this.factor = factor;
            this.dialogRef = dialogRef;
            this.actions = [];
            this.context = {};
            this.child = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'dec-dialog',
                        template: "<mat-toolbar color=\"primary\">\n\n  <div fxLayout=\"row\" fxFlexFill fxLayoutAlign=\"start center\">\n    <div>\n      <button type=\"button\" mat-icon-button class=\"uppercase\" mat-dialog-close>\n        <mat-icon>arrow_back</mat-icon>\n      </button>\n    </div>\n    <div>\n      <h1>&nbsp; {{ title }}</h1>\n    </div>\n    <div fxFlex>\n      <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n        <div *ngIf=\"actions\">\n          <mat-menu #decDialogActionsMenu=\"matMenu\">\n            <button *ngFor=\"let action of actions\" mat-menu-item (click)=\"action.callback(context)\">\n              <span *ngIf=\"action.label\">{{ action.label }}</span>\n              <span *ngIf=\"action.i18nLabel\">{{ action.i18nLabel | translate }}</span>\n            </button>\n          </mat-menu>\n\n          <button mat-icon-button [matMenuTriggerFor]=\"decDialogActionsMenu\">\n            <mat-icon>more_vert</mat-icon>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</mat-toolbar>\n\n<div class=\"dec-dialog-child-wrapper\">\n  <template #childContainer></template>\n</div>\n\n<dec-spinner *ngIf=\"!loaded\"></dec-spinner>\n",
                        styles: [".dec-dialog-child-wrapper{padding:32px}"]
                    },] },
        ];
        /** @nocollapse */
        DecDialogComponent.ctorParameters = function () {
            return [
                { type: i0.ComponentFactoryResolver },
                { type: material.MatDialogRef }
            ];
        };
        DecDialogComponent.propDecorators = {
            childContainer: [{ type: i0.ViewChild, args: ['childContainer', { read: i0.ViewContainerRef },] }],
            child: [{ type: i0.Output }]
        };
        return DecDialogComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecSpinnerComponent = (function () {
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
            { type: i0.Component, args: [{
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
    var DecSpinnerModule = (function () {
        function DecSpinnerModule() {
        }
        DecSpinnerModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
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
    var DecDialogService = (function () {
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
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        DecDialogService.ctorParameters = function () {
            return [
                { type: material.MatDialog }
            ];
        };
        return DecDialogService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecDialogModule = (function () {
        function DecDialogModule() {
        }
        DecDialogModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatDialogModule,
                            material.MatToolbarModule,
                            material.MatIconModule,
                            material.MatMenuModule,
                            material.MatButtonModule,
                            flexLayout.FlexLayoutModule,
                            DecSpinnerModule,
                            i2$1.TranslateModule,
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
    var DecGalleryComponent = (function () {
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
             */ function () {
                return this._images;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-gallery',
                        template: "<div class=\"dec-gallery-wrapper\">\n\n  <div class=\"image-highlighted\" [decImage]=\"imageHighlight\" [decImageSize]=\"{width:600}\"></div>\n\n  <div class=\"text-right\" *ngIf=\"imgExternalLink\">\n\n    <a href=\"{{ imgExternalLink }}\" target=\"_blank\">{{ 'label.image-link' | translate }}</a>\n\n  </div>\n\n  <ngu-carousel class=\"carousel-wrapper\" [inputs]=\"carouselConfig\" (initData)=\"onInitDataFn($event)\" (onMove)=\"onMoveFn($event)\">\n\n    <ngu-item NguCarouselItem *ngFor=\"let image of images\" [class.active]=\"image == imageHighlight\">\n\n      <img [decImage]=\"image\" [decImageSize]=\"{width:300, height:300}\" (click)=\"onSelectImage($event,image)\">\n\n    </ngu-item>\n\n    <mat-icon NguCarouselPrev class=\"left-previous\" [ngClass]=\"{'disabled': isFirst}\">chevron_left</mat-icon>\n\n    <mat-icon NguCarouselNext class=\"right-next\" [ngClass]=\"{'disabled': isLast}\">chevron_right</mat-icon>\n\n  </ngu-carousel>\n\n</div>\n",
                        styles: [".dec-gallery-wrapper{max-width:624px;overflow:hidden}.dec-gallery-wrapper .image-highlighted{border:2px solid #f5f5f5;width:620px;height:620px}.dec-gallery-wrapper a{font-size:10px;text-decoration:none;color:#929292;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper{margin-top:8px;padding:0 24px;height:128px}.dec-gallery-wrapper .carousel-wrapper ngu-item{display:flex;justify-content:center;align-items:center;height:124px;padding:2px;margin-right:2px}.dec-gallery-wrapper .carousel-wrapper ngu-item.active,.dec-gallery-wrapper .carousel-wrapper ngu-item:hover{padding:0;border:2px solid #232e38}.dec-gallery-wrapper .carousel-wrapper ngu-item img{max-width:124px;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper .left-previous,.dec-gallery-wrapper .carousel-wrapper .right-next{display:block!important;position:absolute;top:calc(50% - 12px);cursor:pointer;text-shadow:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.dec-gallery-wrapper .carousel-wrapper .left-previous:hover,.dec-gallery-wrapper .carousel-wrapper .right-next:hover{text-shadow:0 0 6px rgba(0,0,0,.2)}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled{opacity:.4}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled:hover,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled:hover{text-shadow:none}.dec-gallery-wrapper .carousel-wrapper .left-previous{left:0}.dec-gallery-wrapper .carousel-wrapper .right-next{right:0}"]
                    },] },
        ];
        /** @nocollapse */
        DecGalleryComponent.ctorParameters = function () { return []; };
        DecGalleryComponent.propDecorators = {
            images: [{ type: i0.Input }]
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
    var DecImageDirective = (function () {
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
             */ function (v) {
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
                catch (error) {
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
                if (decImageSize === void 0) {
                    decImageSize = {};
                }
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
            { type: i0.Directive, args: [{
                        selector: '[decImage]'
                    },] },
        ];
        /** @nocollapse */
        DecImageDirective.ctorParameters = function () {
            return [
                { type: i0.ViewContainerRef }
            ];
        };
        DecImageDirective.propDecorators = {
            decImage: [{ type: i0.Input }],
            decImageSize: [{ type: i0.Input }],
            trim: [{ type: i0.Input }],
            fitIn: [{ type: i0.Input }],
            thumborize: [{ type: i0.Input }]
        };
        return DecImageDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecImageModule = (function () {
        function DecImageModule() {
        }
        DecImageModule.decorators = [
            { type: i0.NgModule, args: [{
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
    var DecGalleryModule = (function () {
        function DecGalleryModule() {
        }
        DecGalleryModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            DecImageModule,
                            i2$1.TranslateModule,
                            material.MatIconModule,
                            carousel.NguCarouselModule
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
    var DecLabelComponent = (function () {
        function DecLabelComponent() {
            this.colorHex = '#D3D3D3';
        }
        DecLabelComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'dec-label',
                        template: "<div [ngStyle]=\"{'background-color': colorHex}\" decContrastFontWithBg>\n  <ng-content></ng-content>\n</div>\n",
                        styles: ["div{margin:4px;display:inline-block;padding:7px 12px;border-radius:24px;align-items:center;cursor:default}"]
                    },] },
        ];
        DecLabelComponent.propDecorators = {
            colorHex: [{ type: i0.Input }]
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
    var DecContrastFontWithBgDirective = (function () {
        function DecContrastFontWithBgDirective(el) {
            this.el = el;
            this.bgColor = this.el.nativeElement.style.backgroundColor;
        }
        Object.defineProperty(DecContrastFontWithBgDirective.prototype, "decContrastFontWithBg", {
            set: /**
             * @param {?} config
             * @return {?}
             */ function (config) {
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
            { type: i0.Directive, args: [{
                        selector: '[decContrastFontWithBg]'
                    },] },
        ];
        /** @nocollapse */
        DecContrastFontWithBgDirective.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        DecContrastFontWithBgDirective.propDecorators = {
            decContrastFontWithBg: [{ type: i0.Input }]
        };
        return DecContrastFontWithBgDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecContrastFontWithBgModule = (function () {
        function DecContrastFontWithBgModule() {
        }
        DecContrastFontWithBgModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
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
    var DecLabelModule = (function () {
        function DecLabelModule() {
        }
        DecLabelModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i2$1.TranslateModule,
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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListTabsFilter = (function () {
        function DecListTabsFilter(data) {
            if (data === void 0) {
                data = {};
            }
            this.count = data.count || undefined;
            this.default = data.default || undefined;
            this.filters = data.filters || undefined;
            this.hide = data.hide || undefined;
            this.label = data.label || undefined;
            this.listMode = data.listMode || undefined;
            this.permissions = data.permissions || undefined;
            this.uid = data.uid || data.label;
        }
        return DecListTabsFilter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListTabsFilterComponent = (function () {
        function DecListTabsFilterComponent(route, router) {
            var _this = this;
            this.route = route;
            this.router = router;
            this._filters = [];
            this.search = new i0.EventEmitter();
            this.tabChange = new i0.EventEmitter();
            this.doFirstLoad = function () {
                setTimeout(function () {
                    // wait for the url to change before doing the first load
                    _this.watchTabInUrlQuery();
                }, 0);
            };
            this.onSearch = function (uid, recount) {
                if (recount === void 0) {
                    recount = false;
                }
                _this.selectedTabUid = uid;
                if (_this.filters) {
                    var /** @type {?} */ filterTab = _this.filters.find(function (filter) { return filter.uid === uid; });
                    if (filterTab) {
                        _this.search.emit({
                            filters: filterTab.filters,
                            recount: recount
                        });
                    }
                }
            };
        }
        Object.defineProperty(DecListTabsFilterComponent.prototype, "filters", {
            get: /**
             * @return {?}
             */ function () {
                return this._filters;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
                if (this._filters !== v) {
                    this._filters = v.map(function (filter) { return new DecListTabsFilter(filter); });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DecListTabsFilterComponent.prototype, "countEndpoint", {
            get: /**
             * @return {?}
             */ function () {
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
             */ function (v) {
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
                return this.filters ? this.filters.find(function (filter) { return filter.uid === _this.selectedTabUid; }) : undefined;
            };
        Object.defineProperty(DecListTabsFilterComponent.prototype, "visibleFilters", {
            get: /**
             * @return {?}
             */ function () {
                var /** @type {?} */ visible = this.filters ? this.filters.filter(function (filter) { return !filter.hide; }) : [];
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
                        _this.onSearch(tab);
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
            { type: i0.Component, args: [{
                        selector: 'dec-list-tabs-filter',
                        template: "<div class=\"list-tabs-filter-wrapper\" *ngIf=\"visibleFilters as filters\">\n  <div fxLayout=\"row\" class=\"dec-tab-header\">\n    <ng-container *ngFor=\"let tabFilter of filters\">\n      <button type=\"button\"\n              *decPermission=\"tabFilter.permissions\"\n              mat-button\n              class=\"uppercase\"\n              (click)=\"selectTab(tabFilter.uid)\"\n              [class.selected]=\"selectedTabUid == (tabFilter.uid)\">\n        <span>{{ 'label.' + tabFilter.label | translate | uppercase }}</span>\n        <span *ngIf=\"tabFilter.count && countEndpoint && countReport\" class=\"badge badge-pill badge-small\">{{ getCountOf(tabFilter.count) }}</span>\n      </button>\n    </ng-container>\n  </div>\n</div>\n",
                        styles: [".list-tabs-filter-wrapper{margin-top:8px}.list-tabs-filter-wrapper .dec-tab-header.bottom{border-bottom:0}.list-tabs-filter-wrapper .dec-tab-header .badge{margin-left:8px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill{padding:8px;font-size:small;border-radius:24px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill.badge-small{font-size:x-small;padding:4px}"]
                    },] },
        ];
        /** @nocollapse */
        DecListTabsFilterComponent.ctorParameters = function () {
            return [
                { type: i2.ActivatedRoute },
                { type: i2.Router }
            ];
        };
        DecListTabsFilterComponent.propDecorators = {
            filters: [{ type: i0.Input }],
            countEndpoint: [{ type: i0.Input }],
            search: [{ type: i0.Output, args: ['search',] }],
            tabChange: [{ type: i0.Output, args: ['tabChange',] }]
        };
        return DecListTabsFilterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListAdvancedFilterComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'dec-list-advanced-filter',
                        template: "<div fxLayout=\"column\" fxLayoutGap=\"16px\">\n\n  <div fxFlex>\n\n    <ng-container\n      [ngTemplateOutlet]=\"templateRef\"\n      [ngTemplateOutletContext]=\"{form: form}\"\n    ></ng-container>\n\n  </div>\n\n  <div fxFlex>\n\n    <div fxLayout=\"row\" fxLayoutAlign=\"end end\" fxLayoutGap=\"8px\">\n\n      <button type=\"button\" mat-raised-button color=\"primary\" (click)=\"submit()\">{{ 'label.search' | translate | uppercase }}</button>\n\n      <button type=\"button\" mat-button (click)=\"reset()\">{{ 'label.reset' | translate | uppercase }}</button>\n\n    </div>\n\n  </div>\n\n</div>\n\n\n\n\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        DecListAdvancedFilterComponent.ctorParameters = function () { return []; };
        DecListAdvancedFilterComponent.propDecorators = {
            templateRef: [{ type: i0.ContentChild, args: [i0.TemplateRef,] }]
        };
        return DecListAdvancedFilterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListFilterComponent = (function () {
        function DecListFilterComponent(route, router) {
            var _this = this;
            this.route = route;
            this.router = router;
            this.filterForm = {
                search: undefined
            };
            this.isItFirstLoad = true;
            this.clickableContainerClass = 'list-filter-wrapper';
            this.hasPersistence = true;
            this.search = new i0.EventEmitter();
            this.onSearch = function (appendCurrentForm) {
                if (appendCurrentForm === void 0) {
                    appendCurrentForm = true;
                }
                if (_this.filterForm && appendCurrentForm) {
                    var /** @type {?} */ newDecFilterGroup_1 = {
                        filters: []
                    };
                    Object.keys(_this.filterForm).forEach(function (key) {
                        if (_this.filterForm[key]) {
                            var /** @type {?} */ filter = { property: key, value: _this.filterForm[key] };
                            newDecFilterGroup_1.filters.push(filter);
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
                var /** @type {?} */ filter = {
                    'property': propertyName,
                    'value': propertyValue,
                };
                if (this.filterGroupsWithoutTabs) {
                    this.filterGroupsWithoutTabs.forEach(function (filterGroup) {
                        var /** @type {?} */ filterExistsInThisGroup = filterGroup.filters.find(function (filterGroupFilter) { return filterGroupFilter.property === filter.property; });
                        if (!filterExistsInThisGroup) {
                            filterGroup.filters.push(filter);
                        }
                    });
                }
                else {
                    this.filterGroupsWithoutTabs = [{ filters: [filter] }];
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
                if (recount === void 0) {
                    recount = false;
                }
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
                filters.forEach(function (filter) {
                    if (filter.value) {
                        _this.filterForm[filter.property] = filter.value;
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
                if (recount === void 0) {
                    recount = false;
                }
                return new Promise(function (res, rej) {
                    _this.mountCurrentDecFilterGroups();
                    if (_this.preSearch) {
                        _this.filterGroups = _this.preSearch(_this.filterGroups);
                    }
                    _this.search.emit({
                        filterGroups: _this.filterGroups,
                        recount: recount
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
                                    var /** @type {?} */ filter = _this.getJsonFromBase64Filter(base64Filter);
                                    _this.innerDecFilterGroups = filter;
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
            function (filter) {
                this.currentBase64Filter = filter;
                var /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
                queryParams[this.componentFilterName()] = filter;
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
                catch (error) {
                    var /** @type {?} */ msg = 'ListFilterComponent:: Failed to parse the filter. The value is not valid and the filter was removed. Filter value: ';
                    console.error(msg, base64Filter);
                }
                return base64Filter ? filterObject : undefined;
            };
        DecListFilterComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'dec-list-filter',
                        template: "<div class=\"list-filter-wrapper\">\n  <div fxLayout=\"row wrap\" fxLayoutAlign=\"space-between center\">\n    <!--\n      Counter\n    -->\n    <div fxFlex=\"30\">\n      <ng-container *ngIf=\"count >= 0 && !loading\">\n        <span *ngIf=\"count === 0\" class=\"dec-body-strong\">{{ \"label.record-not-found\" | translate }}</span>\n        <span *ngIf=\"count === 1\" class=\"dec-body-strong\">{{ \"label.one-record-found\" | translate }}</span>\n        <span *ngIf=\"count > 1\" class=\"dec-body-strong\"> {{ \"label.records-found\" | translate:{count:count} }}</span>\n      </ng-container>\n    </div>\n\n    <div fxFlex=\"70\" class=\"text-right\">\n\n      <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"end center\" class=\"search-container\">\n        <div>\n\n          <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\" class=\"input-search-container\" [class.active]=\"showSearchInput\">\n            <!-- gap -->\n            <div></div>\n            <a class=\"btn-toogle-search\">\n              <mat-icon (click)=\"toggleSearchInput()\">search</mat-icon>\n            </a>\n            <form fxFlex role=\"form\" (submit)=\"onSearch()\">\n              <div fxLayout=\"row\" fxLayoutGap=\"16px\" fxLayoutAlign=\"start center\" class=\"input-search\">\n                <span class=\"bar-h\"></span>\n                <input fxFlex #inputSearch name=\"search\" [(ngModel)]=\"filterForm.search\">\n                <div *ngIf=\"advancedFilterComponent\" class=\"click\" (click)=\"toggleAdvancedFilter($event)\">\n                  <span class=\"dec-small btn-open-advanced-search\">{{\"label.advanced-options\" | translate}}</span>\n                </div>\n                <!--gap-->\n                <div></div>\n              </div>\n            </form>\n          </div>\n\n        </div>\n\n        <!--Refresh search-->\n        <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\">\n          <a class=\"btn-info margin-icon\" (click)=\"onSearch()\">\n            <mat-icon>refresh</mat-icon>\n          </a>\n        </div>\n        <!--Clear filters-->\n        <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\" *ngIf=\"filterGroupsWithoutTabs?.length\">\n          <a class=\"btn-info\" (click)=\"onClear()\">\n            <mat-icon>clear</mat-icon>\n          </a>\n        </div>\n\n        <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"start center\" *ngIf=\"showInfoButton\">\n          <a class=\"btn-info\" (click)=\"onClickInfo()\">\n            <mat-icon>info_outline</mat-icon>\n          </a>\n        </div>\n\n      </div>\n\n    </div>\n  </div>\n\n\n  <div *ngIf=\"showAdvancedFilter\">\n\n    <mat-card class=\"advanced-search-container\" [ngClass]=\"{'remove-button-enabled': filterGroupsWithoutTabs?.length}\">\n\n      <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n\n        <a (click)=\"closeFilters()\" class=\"btn-close-advanced-search\">\n\n          <i class=\"material-icons\">close</i>\n\n        </a>\n\n      </div>\n\n      <div>\n\n        <ng-content select=\"dec-list-advanced-filter\"></ng-content>\n\n      </div>\n\n    </mat-card>\n\n  </div>\n\n  <dec-list-active-filter-resume\n    *ngIf=\"filterGroupsWithoutTabs?.length\"\n    [filterGroups]=\"filterGroupsWithoutTabs\"\n    (remove)=\"removeDecFilterGroup($event)\"\n    (edit)=\"editDecFilterGroup($event)\"></dec-list-active-filter-resume>\n\n  <ng-content select=\"dec-list-tabs-filter\"></ng-content>\n</div>\n",
                        styles: [".list-filter-wrapper{margin:0 0 16px;position:relative}.list-filter-wrapper .mat-icon{color:#999}.list-filter-wrapper .search-term-input{width:500px;margin-right:8px}.list-filter-wrapper .inline-form{display:inline-block}.list-filter-wrapper .advanced-search-container{position:absolute;top:74px;z-index:1;right:30px;width:552px}.list-filter-wrapper .advanced-search-container.remove-button-enabled{right:62px;width:551px}.list-filter-wrapper .advanced-search-container .btn-close-advanced-search{cursor:pointer}.search-container .input-search-container{transition:all .3s ease;overflow:hidden;width:40px;height:50px}.search-container .input-search-container.active{background:#f8f8fa;color:#999;width:600px}.search-container .input-search-container.active .btn-open-advanced-search{display:inline}.search-container .input-search-container .input-search{width:100%}.search-container .input-search-container .input-search input{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;width:100%;vertical-align:bottom}.search-container .input-search-container .btn-open-advanced-search{display:none}.search-container .btn-clear-search{padding-right:15px;cursor:pointer;color:#999;width:90px}.search-container .btn-info,.search-container .btn-toogle-search{font-size:21px;cursor:pointer;height:21px;color:#999}.search-container .bar-h{border-right:2px solid #d0d0d0;height:21px;margin:auto 0;display:inline-block}"]
                    },] },
        ];
        /** @nocollapse */
        DecListFilterComponent.ctorParameters = function () {
            return [
                { type: i2.ActivatedRoute },
                { type: i2.Router }
            ];
        };
        DecListFilterComponent.propDecorators = {
            preSearch: [{ type: i0.Input }],
            showInfoButton: [{ type: i0.Input }],
            hasPersistence: [{ type: i0.Input }],
            search: [{ type: i0.Output, args: ['search',] }],
            inputSearch: [{ type: i0.ViewChild, args: ['inputSearch',] }],
            tabsFilterComponent: [{ type: i0.ContentChild, args: [DecListTabsFilterComponent,] }],
            advancedFilterComponent: [{ type: i0.ContentChild, args: [DecListAdvancedFilterComponent,] }]
        };
        return DecListFilterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListActiveFilterResumeComponent = (function () {
        function DecListActiveFilterResumeComponent() {
            this.filterGroups = [];
            this.remove = new i0.EventEmitter();
            this.edit = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'dec-list-active-filter-resume',
                        template: "<div *ngIf=\"filterGroups?.length\" class=\"dec-list-active-filter-resume-wrapper\">\n\n  <mat-chip-list>\n\n    <ng-container *ngFor=\"let group of filterGroups; let groupIndex = index;\">\n      <mat-chip *ngIf=\"group?.filters\" (click)=\"editDecFilterGroup($event, groupIndex)\">\n\n        <span *ngFor=\"let filter of group?.filters; let lastFilter = last;\" class=\"item-wrapper\">\n\n          <span [ngSwitch]=\"filter.property !== 'search'\">\n\n            <span *ngSwitchCase=\"true\">{{ 'label.' + filter.property | translate }}</span>\n\n            <span *ngSwitchDefault>{{ 'label.Keyword' | translate }}</span>\n\n          </span>\n\n          <span>:&nbsp;</span>\n\n          <span [ngSwitch]=\"getValuetype(filter.value)\" class=\"value-wrapper\">\n\n            <span *ngSwitchCase=\"'date'\">{{ filter.value | date }}</span>\n\n            <span *ngSwitchDefault>{{ filter.value }}</span>\n\n          </span >\n\n          <span *ngIf=\"!lastFilter\">,</span>\n\n          &nbsp;\n\n        </span>\n\n        <i class=\"material-icons\" (click)=\"removeDecFilterGroup($event, groupIndex)\">remove_circle</i>\n\n      </mat-chip>\n\n    </ng-container>\n\n  </mat-chip-list>\n\n</div>\n",
                        styles: [".mat-tab-body-content{padding:16px 0}.mat-form-field-prefix{margin-right:8px!important}.mat-form-field-suffix{margin-left:8px!important}.mat-elevation-z0{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mat-elevation-z1{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.mat-elevation-z2{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.mat-elevation-z3{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.mat-elevation-z4{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mat-elevation-z5{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}.mat-elevation-z6{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.mat-elevation-z7{box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}.mat-elevation-z8{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-elevation-z9{box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}.mat-elevation-z10{box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}.mat-elevation-z11{box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}.mat-elevation-z12{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-elevation-z13{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}.mat-elevation-z14{box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}.mat-elevation-z15{box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}.mat-elevation-z16{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-elevation-z17{box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}.mat-elevation-z18{box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}.mat-elevation-z19{box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}.mat-elevation-z20{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}.mat-elevation-z21{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}.mat-elevation-z22{box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}.mat-elevation-z23{box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}.mat-elevation-z24{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-card-title{font-size:24px;font-weight:400}.mat-card-content,.mat-card-header .mat-card-title,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:13px;line-height:18px}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif}.mat-expansion-panel-header{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field{width:100%;font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-outline{bottom:1.34375em}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:9px;padding-bottom:9px}.mat-list-item,.mat-list-option{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{font-size:16px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line,.mat-selection-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{font-size:16px}.mat-list .mat-list-option .mat-line,.mat-nav-list .mat-list-option .mat-line,.mat-selection-list .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-item{font-size:12px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line,.mat-selection-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option{font-size:12px}.mat-list[dense] .mat-list-option .mat-line,.mat-nav-list[dense] .mat-list-option .mat-line,.mat-selection-list[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-simple-snackbar{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden}@media screen and (-ms-high-contrast:active){.mat-ripple{display:none}}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1),-webkit-transform 0s cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.288)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;box-sizing:content-box!important}.dec-list-active-filter-resume-wrapper{margin:16px 0 8px}.dec-list-active-filter-resume-wrapper .item-wrapper{max-width:15em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dec-list-active-filter-resume-wrapper .item-wrapper,.dec-list-active-filter-resume-wrapper .material-icons{color:#969696}.dec-list-active-filter-resume-wrapper .filter-content{margin-right:8px}.dec-list-active-filter-resume-wrapper .mat-chip{cursor:pointer}.dec-list-active-filter-resume-wrapper .value-wrapper{color:#ef3f54}"]
                    },] },
        ];
        /** @nocollapse */
        DecListActiveFilterResumeComponent.ctorParameters = function () { return []; };
        DecListActiveFilterResumeComponent.propDecorators = {
            filterGroups: [{ type: i0.Input }],
            remove: [{ type: i0.Output }],
            edit: [{ type: i0.Output }]
        };
        return DecListActiveFilterResumeComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListActiveFilterResumeModule = (function () {
        function DecListActiveFilterResumeModule() {
        }
        DecListActiveFilterResumeModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatChipsModule,
                            material.MatIconModule,
                            i2$1.TranslateModule
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
    var DecListFilterModule = (function () {
        function DecListFilterModule() {
        }
        DecListFilterModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            flexLayout.FlexLayoutModule,
                            forms.FormsModule,
                            DecListActiveFilterResumeModule,
                            material.MatButtonModule,
                            material.MatCardModule,
                            material.MatChipsModule,
                            material.MatIconModule,
                            material.MatInputModule,
                            i2$1.TranslateModule,
                        ],
                        declarations: [DecListFilterComponent],
                        exports: [DecListFilterComponent],
                    },] },
        ];
        return DecListFilterModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecPermissionDirective = (function () {
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
             */ function (p) {
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
                if (rolesAllowed === void 0) {
                    rolesAllowed = [];
                }
                if (currentRoles === void 0) {
                    currentRoles = [];
                }
                try {
                    var /** @type {?} */ matchingRole = currentRoles.find(function (userRole) {
                        return rolesAllowed.find(function (alowedRole) {
                            return alowedRole === userRole;
                        }) ? true : false;
                    });
                    return matchingRole ? true : false;
                }
                catch (error) {
                    return false;
                }
            };
        DecPermissionDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[decPermission]'
                    },] },
        ];
        /** @nocollapse */
        DecPermissionDirective.ctorParameters = function () {
            return [
                { type: DecApiService },
                { type: i0.TemplateRef },
                { type: i0.ViewContainerRef }
            ];
        };
        DecPermissionDirective.propDecorators = {
            decPermission: [{ type: i0.Input }]
        };
        return DecPermissionDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecPermissionModule = (function () {
        function DecPermissionModule() {
        }
        DecPermissionModule.decorators = [
            { type: i0.NgModule, args: [{
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
    var DecListTabsFilterModule = (function () {
        function DecListTabsFilterModule() {
        }
        DecListTabsFilterModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatButtonModule,
                            i2$1.TranslateModule,
                            DecPermissionModule
                        ],
                        declarations: [DecListTabsFilterComponent],
                        exports: [DecListTabsFilterComponent],
                    },] },
        ];
        return DecListTabsFilterModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListGridComponent = (function () {
        function DecListGridComponent() {
            this.itemWidth = '280px';
            this.itemGap = '8px';
            this.rowClick = new i0.EventEmitter();
            this._rows = [];
        }
        Object.defineProperty(DecListGridComponent.prototype, "rows", {
            get: /**
             * @return {?}
             */ function () {
                return this._rows;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-list-grid',
                        template: "<div fxLayout=\"row wrap\" [fxLayoutGap]=\"itemGap\" >\n  <div *ngFor=\"let row of rows; let i = index;\" (click)=\"onItemClick($event, row, rows, i)\" [fxFlex]=\"itemWidth\">\n    <div [ngStyle]=\"{margin: itemGap}\">\n      <ng-container\n        [ngTemplateOutlet]=\"templateRef\"\n        [ngTemplateOutletContext]=\"{row: row || {}, list: rows || [], index: i}\"\n      ></ng-container>\n    </div>\n  </div>\n</div>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        DecListGridComponent.ctorParameters = function () { return []; };
        DecListGridComponent.propDecorators = {
            templateRef: [{ type: i0.ContentChild, args: [i0.TemplateRef,] }],
            itemWidth: [{ type: i0.Input }],
            itemGap: [{ type: i0.Input }],
            rowClick: [{ type: i0.Output }]
        };
        return DecListGridComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListTableColumnComponent = (function () {
        function DecListTableColumnComponent() {
            this.title = '';
            this._colSpan = 1;
        }
        Object.defineProperty(DecListTableColumnComponent.prototype, "colSpan", {
            get: /**
             * @return {?}
             */ function () {
                return this._colSpan;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
                var /** @type {?} */ number = +v;
                this._colSpan = isNaN(number) ? 1 : number;
            },
            enumerable: true,
            configurable: true
        });
        DecListTableColumnComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'dec-list-table-column',
                        template: "<ng-content></ng-content>\n",
                        styles: [""]
                    },] },
        ];
        DecListTableColumnComponent.propDecorators = {
            template: [{ type: i0.ContentChild, args: [i0.TemplateRef,] }],
            prop: [{ type: i0.Input }],
            title: [{ type: i0.Input }],
            colSpan: [{ type: i0.Input }]
        };
        return DecListTableColumnComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListTableComponent = (function () {
        function DecListTableComponent() {
            this._rows = [];
            this.sort = new i0.EventEmitter();
            this.rowClick = new i0.EventEmitter();
        }
        Object.defineProperty(DecListTableComponent.prototype, "rows", {
            get: /**
             * @return {?}
             */ function () {
                return this._rows;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-list-table',
                        template: "<ngx-datatable #tableComponent\n  columnMode=\"flex\"\n  headerHeight=\"24px\"\n  rowHeight=\"auto\"\n  [externalSorting]=\"true\"\n  [messages]=\"{emptyMessage:''}\"\n  [rows]=\"rows\"\n  (sort)=\"onSort($event)\"\n  (activate)=\"onItemClick($event)\">\n\n  <ngx-datatable-column *ngFor=\"let column of columns;\"\n                         name=\"{{column.title | translate}}\"\n                         [flexGrow]=\"column.colSpan\"\n                         [prop]=\"column.prop\"\n                         [sortable]=\"column.prop ? true : false\">\n\n    <ng-template *ngIf=\"column.template ? true : false\"\n      let-row=\"row\"\n      let-index=\"rowIndex\"\n      ngx-datatable-cell-template>\n\n      <ng-container\n        [ngTemplateOutlet]=\"column.template\"\n        [ngTemplateOutletContext]=\"{row: row || {}, list: rows || [], index: index}\"\n      ></ng-container>\n\n    </ng-template>\n\n  </ngx-datatable-column>\n\n</ngx-datatable>\n",
                        styles: ["::ng-deep .ngx-datatable .overflow-visible{overflow:visible!important}::ng-deep datatable-scroller{width:100%!important}::ng-deep .ngx-datatable.no-overflow{overflow:auto}::ng-deep .ngx-datatable.no-padding .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:0}::ng-deep .ngx-datatable .datatable-header{padding:11px 16px}::ng-deep .ngx-datatable .datatable-header .datatable-header-cell-label{font-size:12px;font-weight:500}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell{font-size:13px;font-weight:400;overflow:hidden;min-height:100%;display:table;-webkit-user-select:initial;-moz-user-select:initial;-ms-user-select:initial;-o-user-select:initial;user-select:initial}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:16px;display:table-cell;vertical-align:middle;word-break:break-all}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell.cell-top .datatable-body-cell-label{vertical-align:top}::ng-deep .ngx-datatable .datatable-row-detail{padding:10px}::ng-deep .ngx-datatable .sort-btn{width:0;height:0}::ng-deep .ngx-datatable .icon-down{border-left:5px solid transparent;border-right:5px solid transparent}::ng-deep .ngx-datatable .icon-up{border-left:5px solid transparent;border-right:5px solid transparent}"]
                    },] },
        ];
        /** @nocollapse */
        DecListTableComponent.ctorParameters = function () { return []; };
        DecListTableComponent.propDecorators = {
            rows: [{ type: i0.Input }],
            tableComponent: [{ type: i0.ViewChild, args: [ngxDatatable.DatatableComponent,] }],
            columns: [{ type: i0.ContentChildren, args: [DecListTableColumnComponent,] }],
            sort: [{ type: i0.Output }],
            rowClick: [{ type: i0.Output }]
        };
        return DecListTableComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListComponent = (function () {
        /*
         * ngOnInit
         *
         *
         */
        function DecListComponent(service) {
            var _this = this;
            this.service = service;
            this.filterData = new rxjs.Subject();
            this._loading = true;
            this.scrollEventEmiter = new i0.EventEmitter();
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
            this.postSearch = new i0.EventEmitter();
            /*
               * rowClick
               *
               * Emits an event when a row or card is clicked
               */
            this.rowClick = new i0.EventEmitter();
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
             */ function () {
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
             */ function (v) {
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
             */ function () {
                return this.filter ? this.filter.filterGroups : [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DecListComponent.prototype, "endpoint", {
            get: /**
             * @return {?}
             */ function () {
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
             */ function (v) {
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
             */ function () {
                return this._name;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
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
             */ function (rows) {
                this.setRows(rows);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DecListComponent.prototype, "filter", {
            get: /**
             * @return {?}
             */ function () {
                return this._filter;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
         * @param {?=} clearAndReloadReport
         * @return {?}
         */
        DecListComponent.prototype.loadReport = /**
         * @param {?=} clearAndReloadReport
         * @return {?}
         */
            function (clearAndReloadReport) {
                var _this = this;
                return new Promise(function (res, rej) {
                    if (clearAndReloadReport && _this.rows) {
                        _this.setRows(_this.rows);
                    }
                    _this.clearAndReloadReport = clearAndReloadReport;
                    _this.loading = true;
                    if (_this.endpoint) {
                        var /** @type {?} */ filterGroups = _this.filter ? _this.filter.filterGroups : undefined;
                        var /** @type {?} */ payload = {};
                        payload.limit = _this.limit;
                        var /** @type {?} */ selectedTab = void 0;
                        if (_this.filter && _this.filter.tabsFilterComponent) {
                            selectedTab = _this.filter.tabsFilterComponent.selectedTab();
                        }
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
                if (rows === void 0) {
                    rows = [];
                }
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
                    .pipe(operators.debounceTime(150), operators.distinctUntilChanged()).subscribe(this.actByScrollPosition);
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
                    .pipe(operators.debounceTime(150), // avoid muiltiple request when the filter or tab change too fast
                // avoid muiltiple request when the filter or tab change too fast
                operators.switchMap(function (filterData) {
                    var /** @type {?} */ observable = new rxjs.BehaviorSubject(undefined);
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
                var /** @type {?} */ basicSearch = filterGroupsModel.filters.find(function (filter) { return filter.property === 'search'; });
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
                    var /** @type {?} */ basicSerchFilter = filterGroup.filters.find(function (filter) { return filter.property === 'search'; });
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
                    .pipe(operators.tap(function (res) {
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
                        _this.loadReport(true)
                            .then(function (res) {
                            if (event.recount) {
                                _this.reloadCountReport();
                            }
                        });
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
            { type: i0.Component, args: [{
                        selector: 'dec-list',
                        template: "<div class=\"list-component-wrapper\">\n\n  <div *ngIf=\"filter\">\n    <ng-content select=\"dec-list-filter\"></ng-content>\n  </div>\n\n  <div *ngIf=\"report\">\n\n    <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n\n      <div fxFlex class=\"text-right\" *ngIf=\"tableAndGridAreSet()\">\n        <button type=\"button\" mat-icon-button (click)=\"toggleListMode()\">\n          <mat-icon title=\"Switch to table mode\" aria-label=\"Switch to table mode\" color=\"primary\" contrastFontWithBg *ngIf=\"listMode === 'grid'\">view_headline</mat-icon>\n          <mat-icon title=\"Switch to grid mode\" aria-label=\"Switch to grid mode\" color=\"primary\" contrastFontWithBg *ngIf=\"listMode === 'table'\">view_module</mat-icon>\n        </button>\n      </div>\n\n      <div fxFlex>\n        <div *ngIf=\"listMode == 'grid' then gridTemplate else listTemplate\"></div>\n      </div>\n\n      <!-- FOOTER CONTENT -->\n      <div fxFlex>\n        <div *ngIf=\"showFooter && !loading then footerTemplate\"></div>\n      </div>\n\n      <!-- LOADING SPINNER -->\n      <div fxFlex *ngIf=\"loading\" class=\"text-center loading-spinner-wrapper\">\n        <dec-spinner></dec-spinner>\n      </div>\n\n      <!-- LOAD MORE BUTTON -->\n      <div fxFlex *ngIf=\"!isLastPage && !loading && !disableShowMoreButton\" class=\"text-center\">\n        <button type=\"button\" mat-raised-button (click)=\"showMore()\">{{'label.show-more' | translate}}</button>\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n\n<!-- GRID TEMPLATE -->\n<ng-template #gridTemplate>\n  <ng-content select=\"dec-list-grid\"></ng-content>\n</ng-template>\n\n<!-- TABLE TEMPLATE -->\n<ng-template #listTemplate>\n  <ng-content select=\"dec-list-table\"></ng-content>\n</ng-template>\n\n<!-- FOOTER TEMPLATE -->\n<ng-template #footerTemplate>\n\n  <ng-content select=\"dec-list-footer\"></ng-content>\n\n  <p class=\"list-footer\">\n    {{ 'label.amount-loaded-of-total' |\n      translate:{\n        loaded: report?.result?.rows?.length,\n        total: report?.result?.count\n      }\n    }}\n  </p>\n\n</ng-template>\n",
                        styles: [".list-footer{font-size:14px;text-align:center}.list-component-wrapper{min-height:72px}.text-right{text-align:right}.loading-spinner-wrapper{padding:32px}"]
                    },] },
        ];
        /** @nocollapse */
        DecListComponent.ctorParameters = function () {
            return [
                { type: DecApiService }
            ];
        };
        DecListComponent.propDecorators = {
            customFetchMethod: [{ type: i0.Input }],
            columnsSortConfig: [{ type: i0.Input }],
            disableShowMoreButton: [{ type: i0.Input }],
            endpoint: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            rows: [{ type: i0.Input, args: ['rows',] }],
            limit: [{ type: i0.Input }],
            scrollableContainerClass: [{ type: i0.Input }],
            searchableProperties: [{ type: i0.Input }],
            showFooter: [{ type: i0.Input }],
            postSearch: [{ type: i0.Output }],
            rowClick: [{ type: i0.Output }],
            grid: [{ type: i0.ContentChild, args: [DecListGridComponent,] }],
            table: [{ type: i0.ContentChild, args: [DecListTableComponent,] }],
            filter: [{ type: i0.ContentChild, args: [DecListFilterComponent,] }],
            listMode: [{ type: i0.Input }],
            getListMode: [{ type: i0.Input }]
        };
        return DecListComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListTableModule = (function () {
        function DecListTableModule() {
        }
        DecListTableModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            flexLayout.FlexLayoutModule,
                            ngxDatatable.NgxDatatableModule,
                            i2$1.TranslateModule,
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
    var DecListFooterComponent = (function () {
        function DecListFooterComponent() {
        }
        DecListFooterComponent.decorators = [
            { type: i0.Component, args: [{
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
    var DecListAdvancedFilterModule = (function () {
        function DecListAdvancedFilterModule() {
        }
        DecListAdvancedFilterModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatButtonModule,
                            i2$1.TranslateModule,
                            flexLayout.FlexLayoutModule,
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
    var DecListActionsComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'dec-list-actions',
                        template: "<ng-content></ng-content>>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        DecListActionsComponent.ctorParameters = function () { return []; };
        DecListActionsComponent.propDecorators = {
            template: [{ type: i0.ContentChild, args: [i0.TemplateRef,] }]
        };
        return DecListActionsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecListActionsModule = (function () {
        function DecListActionsModule() {
        }
        DecListActionsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
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
    var DecListModule = (function () {
        function DecListModule() {
        }
        DecListModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            flexLayout.FlexLayoutModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            material.MatSnackBarModule,
                            ngxDatatable.NgxDatatableModule,
                            i2.RouterModule,
                            i2$1.TranslateModule,
                            DecListAdvancedFilterModule,
                            DecListFilterModule,
                            DecListTabsFilterModule,
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
                            DecListTabsFilterModule,
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
    var DecPageForbidenComponent = (function () {
        function DecPageForbidenComponent(router) {
            var _this = this;
            this.router = router;
            this.router.events
                .pipe(operators.filter(function (event) { return event instanceof i2.NavigationEnd; }))
                .subscribe(function (e) {
                _this.previousUrl = document.referrer || e.url;
            });
        }
        DecPageForbidenComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'dec-page-forbiden',
                        template: "<div class=\"page-forbiden-wrapper\">\n  <h1>{{'label.page-forbiden' | translate}}</h1>\n  <p>{{'label.page-forbiden-help' | translate}}</p>\n  <p><small>Ref: {{previousUrl}}</small></p>\n  <img src=\"http://s3-sa-east-1.amazonaws.com/static-files-prod/platform/decora3.png\">\n</div>\n",
                        styles: [".page-forbiden-wrapper{padding-top:100px;text-align:center}img{width:100px}"]
                    },] },
        ];
        /** @nocollapse */
        DecPageForbidenComponent.ctorParameters = function () {
            return [
                { type: i2.Router }
            ];
        };
        return DecPageForbidenComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecPageForbidenModule = (function () {
        function DecPageForbidenModule() {
        }
        DecPageForbidenModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i2$1.TranslateModule,
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
    var DecPageNotFoundComponent = (function () {
        function DecPageNotFoundComponent(router) {
            var _this = this;
            this.router = router;
            router.events
                .pipe(operators.filter(function (event) { return event instanceof i2.NavigationEnd; }))
                .subscribe(function (e) {
                _this.previousUrl = e.url;
            });
        }
        DecPageNotFoundComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'dec-page-not-found',
                        template: "<div class=\"page-not-found-wrapper\">\n  <h1>{{'label.page-not-found' | translate}}</h1>\n  <p>{{'label.page-not-found-help' | translate}}</p>\n  <p>{{previousUrl}}</p>\n  <img src=\"http://s3-sa-east-1.amazonaws.com/static-files-prod/platform/decora3.png\">\n</div>\n",
                        styles: [".page-not-found-wrapper{padding-top:100px;text-align:center}img{width:100px}"]
                    },] },
        ];
        /** @nocollapse */
        DecPageNotFoundComponent.ctorParameters = function () {
            return [
                { type: i2.Router }
            ];
        };
        return DecPageNotFoundComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecPageNotFoundModule = (function () {
        function DecPageNotFoundModule() {
        }
        DecPageNotFoundModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            i2$1.TranslateModule,
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
    var DecProductSpinComponent = (function () {
        function DecProductSpinComponent(renderer) {
            var _this = this;
            this.renderer = renderer;
            this.loadingImage = LOADING_IMAGE;
            this.looping = false;
            this.onlyModal = false;
            this.FALLBACK_IMAGE = FALLBACK_IMAGE;
            this.startInCenter = false;
            this.showOpenDialogButton = true;
            this.open = new i0.EventEmitter();
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
             */ function () {
                return this._spin;
            },
            set: /**
             * @param {?} spin
             * @return {?}
             */ function (spin) {
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
                catch (error) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-product-spin',
                        template: "<div class=\"product-spinner-wrapper\" *ngIf=\"scenes\">\n  <div [ngSwitch]=\"loadingImages ? true : false\">\n\n    <div *ngSwitchCase=\"true\" class=\"overlay\">\n      <!-- Loading spinner -->\n      <div [ngStyle]=\"{'background-image':'url(' + loadingImage + ')'}\">{{loaderPercentage()}}%</div>\n    </div>\n\n    <div *ngSwitchCase=\"false\" class=\"overlay\">\n\n      <!-- Overlay over the image (hand icon) -->\n      <img class=\"frame\" *ngIf=\"!onlyModal\" src=\"//s3-sa-east-1.amazonaws.com/static-files-prod/platform/drag-horizontally.png\" alt=\"\" (click)=\"onlyModal ? '' : start($event)\">\n\n    </div>\n\n  </div>\n\n  <div [ngSwitch]=\"started ? true : false\">\n\n    <div *ngSwitchCase=\"true\" class=\"frame\">\n      <!-- Images -->\n      <img *ngFor=\"let scene of scenes; let i = index;\"\n        [src]=\"scene\"\n        draggable=\"false\"\n        class=\"no-drag image-only\"\n        (load)=\"markAsLoaded($event)\"\n        [ngClass]=\"frameShown === i && !loadingImages ? 'current-scene' : 'next-scene'\">\n\n    </div>\n\n    <div *ngSwitchCase=\"false\" class=\"frame\">\n\n      <!-- Placeholder image -->\n      <img\n        [src]=\"scenes[frameShown]\"\n        draggable=\"false\"\n        class=\"no-drag\"\n        (click)=\"onlyModal ? onOpen($event) : start($event)\"\n        [ngClass]=\"{'image-only': onlyModal}\">\n\n      <!-- Loading spinner -->\n      <button\n      *ngIf=\"showOpenDialogButton && !onlyModal\"\n      mat-icon-button\n      (click)=\"onOpen($event)\"\n      [matTooltip]=\"'label.open' | translate\"\n      class=\"dialog-button\"\n      type=\"button\"\n      color=\"default\">\n        <mat-icon aria-label=\"Swap between Reference and Render images\" color=\"primary\" contrastFontWithBg >fullscreen</mat-icon>\n      </button>\n\n    </div>\n\n  </div>\n</div>\n",
                        styles: [".product-spinner-wrapper{display:block;position:relative}.product-spinner-wrapper:hover .frame{opacity:1}.product-spinner-wrapper:hover .overlay{display:none}.product-spinner-wrapper .frame{display:block;width:100%;background-size:contain;background-repeat:no-repeat;background-position:center center;opacity:.5;transition:opacity .3s ease;cursor:move}.product-spinner-wrapper .frame.image-only{opacity:1;cursor:pointer}.product-spinner-wrapper .frame .current-scene{display:block}.product-spinner-wrapper .frame .next-scene{display:none}.product-spinner-wrapper .frame img{width:100%}.product-spinner-wrapper .overlay{position:absolute;padding:10px;width:20%;margin-left:40%;margin-top:40%;z-index:1;opacity:.4;transition:opacity .2s ease}.product-spinner-wrapper .frame.loader{width:50%;margin:auto}.product-spinner-wrapper .dialog-button{position:absolute;top:0;right:0}.product-spinner-wrapper .loader-percentage{position:relative;top:47%;width:100%;text-align:center;opacity:.5}"]
                    },] },
        ];
        /** @nocollapse */
        DecProductSpinComponent.ctorParameters = function () {
            return [
                { type: i0.Renderer }
            ];
        };
        DecProductSpinComponent.propDecorators = {
            looping: [{ type: i0.Input }],
            onlyModal: [{ type: i0.Input }],
            FALLBACK_IMAGE: [{ type: i0.Input }],
            startInCenter: [{ type: i0.Input }],
            showOpenDialogButton: [{ type: i0.Input }],
            spin: [{ type: i0.Input }],
            open: [{ type: i0.Output }],
            onDragStart: [{ type: i0.HostListener, args: ['dragstart', ['$event'],] }],
            onMousedown: [{ type: i0.HostListener, args: ['mousedown', ['$event'],] }],
            onMousemove: [{ type: i0.HostListener, args: ['mousemove', ['$event'],] }]
        };
        return DecProductSpinComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecProductSpinModule = (function () {
        function DecProductSpinModule() {
        }
        DecProductSpinModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            material.MatTooltipModule,
                            i2$1.TranslateModule,
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
    var DecSidenavToolbarTitleComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'dec-sidenav-toolbar-title',
                        template: "<div [routerLink]=\"routerLink\" class=\"dec-sidenav-toolbar-title\">\n  <ng-content></ng-content>\n</div>\n",
                        styles: [".dec-sidenav-toolbar-title{outline:0}"]
                    },] },
        ];
        /** @nocollapse */
        DecSidenavToolbarTitleComponent.ctorParameters = function () { return []; };
        DecSidenavToolbarTitleComponent.propDecorators = {
            routerLink: [{ type: i0.Input }]
        };
        return DecSidenavToolbarTitleComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecSidenavToolbarComponent = (function () {
        function DecSidenavToolbarComponent() {
            this.notProduction = true;
            this.ribbon = '';
            this.label = '';
            this.leftMenuTriggerVisible = true;
            this.rightMenuTriggerVisible = true;
            this.toggleLeftMenu = new i0.EventEmitter();
            this.toggleRightMenu = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'dec-sidenav-toolbar',
                        template: "<mat-toolbar [color]=\"color\" *ngIf=\"initialized\">\n\n  <span class=\"items-icon item-left\" *ngIf=\"leftMenuTriggerVisible\" (click)=\"toggleLeftMenu.emit()\">\n    &#9776;\n  </span>\n\n  <span *ngIf=\"customTitle\">\n    <ng-content select=\"dec-sidenav-toolbar-title\"></ng-content>\n  </span>\n\n  <div class=\"ribbon {{ribbon}}\" *ngIf=\"notProduction\">\n    <span>{{label | translate}}</span>\n  </div>\n\n  <span class=\"dec-sidenav-toolbar-custom-content\">\n    <ng-content></ng-content>\n  </span>\n\n  <span class=\"items-spacer\"></span>\n\n  <span class=\"items-icon item-right\" *ngIf=\"rightMenuTriggerVisible\" (click)=\"toggleRightMenu.emit()\">\n    &#9776;\n  </span>\n\n</mat-toolbar>\n",
                        styles: [".items-spacer{flex:1 1 auto}.items-icon{cursor:pointer;-webkit-transform:scale(1.2,.8);transform:scale(1.2,.8)}.items-icon.item-right{padding-left:14px}.items-icon.item-left{padding-right:14px}.dec-sidenav-toolbar-custom-content{padding:0 16px;width:100%}.ribbon{transition:all .3s ease;text-transform:lowercase;text-align:center;position:relative;line-height:64px;margin-left:4px;padding:0 20px;height:64px;width:155px;color:#fff;left:20px;top:0}.ribbon.ribbon-hidden{display:none}.ribbon::before{content:'';position:fixed;width:100vw;height:4px;z-index:2;top:64px;left:0}@media screen and (max-width:599px){.ribbon::before{top:56px}}"]
                    },] },
        ];
        /** @nocollapse */
        DecSidenavToolbarComponent.ctorParameters = function () { return []; };
        DecSidenavToolbarComponent.propDecorators = {
            color: [{ type: i0.Input }],
            environment: [{ type: i0.Input }],
            leftMenuTriggerVisible: [{ type: i0.Input }],
            rightMenuTriggerVisible: [{ type: i0.Input }],
            toggleLeftMenu: [{ type: i0.Output }],
            toggleRightMenu: [{ type: i0.Output }],
            customTitle: [{ type: i0.ContentChild, args: [DecSidenavToolbarTitleComponent,] }]
        };
        return DecSidenavToolbarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecSidenavMenuItemComponent = (function () {
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
             */ function () {
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
            { type: i0.Component, args: [{
                        selector: 'dec-sidenav-menu-item',
                        template: "<ng-template let-treeLevel=\"treeLevel\" #template>\n\n  <mat-list-item class=\"click dec-sidenav-menu-item\"\n  (click)=\"subitems.length ? toggleSubmenu() : openLink()\"\n  [ngStyle]=\"{backgroundColor: 'rgba(0, 0, 0, ' + treeLevel/6 + ')'}\">\n\n    <div class=\"item-wrapper\">\n\n      <div [ngStyle]=\"{paddingLeft: treeLevel * 16 + 'px'}\" class=\"item-content\">\n        <ng-content></ng-content>\n      </div>\n\n      <a *ngIf=\"subitems.length\" class=\"text-right\">\n        <ng-container [ngSwitch]=\"showSubmenu\">\n          <span *ngSwitchCase=\"false\"><i class=\"arrow down\"></i></span>\n          <span *ngSwitchCase=\"true\"><i class=\"arrow up\"></i></span>\n        </ng-container>\n      </a>\n    </div>\n\n  </mat-list-item>\n\n  <div class=\"subitem-menu\" *ngIf=\"showSubmenu\">\n\n    <dec-sidenav-menu [items]=\"subitems\" [treeLevel]=\"treeLevel\"></dec-sidenav-menu>\n\n  </div>\n\n</ng-template>\n",
                        styles: [".dec-sidenav-menu-item{height:56px!important;outline:0}.dec-sidenav-menu-item .item-wrapper{width:100%;display:flex;flex-flow:row no-wrap;justify-content:space-between}.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep .mat-icon,.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep i{vertical-align:middle;margin-bottom:5px;margin-right:8px}.dec-sidenav-menu-item .item-wrapper .right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.dec-sidenav-menu-item .item-wrapper .left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.dec-sidenav-menu-item .item-wrapper .up{transform:rotate(-135deg);-webkit-transform:rotate(-135deg)}.dec-sidenav-menu-item .item-wrapper .down{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.dec-sidenav-menu-item .text-right{text-align:right}.dec-sidenav-menu-item .click{cursor:pointer}.dec-sidenav-menu-item i{border:solid #000;border-width:0 2px 2px 0;display:inline-block;padding:4px}"]
                    },] },
        ];
        /** @nocollapse */
        DecSidenavMenuItemComponent.ctorParameters = function () {
            return [
                { type: i2.Router }
            ];
        };
        DecSidenavMenuItemComponent.propDecorators = {
            routerLink: [{ type: i0.Input }],
            template: [{ type: i0.ViewChild, args: [i0.TemplateRef,] }],
            _subitems: [{ type: i0.ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }]
        };
        return DecSidenavMenuItemComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecSidenavMenuTitleComponent = (function () {
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
            { type: i0.Component, args: [{
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
    var DecSidenavService = (function () {
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
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        DecSidenavService.ctorParameters = function () { return []; };
        return DecSidenavService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecSidenavMenuLeftComponent = (function () {
        function DecSidenavMenuLeftComponent(decSidenavService) {
            this.decSidenavService = decSidenavService;
            this.leftMenuVisible = new rxjs.BehaviorSubject(true);
            this.leftMenuMode = new rxjs.BehaviorSubject('side');
            this.openedChange = new i0.EventEmitter();
            this.modeChange = new i0.EventEmitter();
            this.subscribeAndExposeSidenavEvents();
        }
        Object.defineProperty(DecSidenavMenuLeftComponent.prototype, "open", {
            get: /**
             * @return {?}
             */ function () {
                return this.leftMenuVisible.value;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this.leftMenuMode.value;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-sidenav-menu-left',
                        template: "<ng-container *ngIf=\"customTitle\">\n  <div class=\"menu-title\">\n    <ng-content select=\"dec-dec-sidenav-menu-title\"></ng-content>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"items\">\n  <dec-sidenav-menu [items]=\"items.toArray()\"></dec-sidenav-menu>\n</ng-container>",
                        styles: [".menu-title{padding:16px;font-size:24px;font-weight:700}"]
                    },] },
        ];
        /** @nocollapse */
        DecSidenavMenuLeftComponent.ctorParameters = function () {
            return [
                { type: DecSidenavService }
            ];
        };
        DecSidenavMenuLeftComponent.propDecorators = {
            open: [{ type: i0.Input }],
            mode: [{ type: i0.Input }],
            persistVisibilityMode: [{ type: i0.Input }],
            items: [{ type: i0.ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
            customTitle: [{ type: i0.ContentChild, args: [DecSidenavMenuTitleComponent,] }],
            openedChange: [{ type: i0.Output }],
            modeChange: [{ type: i0.Output }]
        };
        return DecSidenavMenuLeftComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecSidenavMenuRightComponent = (function () {
        function DecSidenavMenuRightComponent(decSidenavService) {
            this.decSidenavService = decSidenavService;
            this.rightMenuVisible = new rxjs.BehaviorSubject(true);
            this.rightMenuMode = new rxjs.BehaviorSubject('side');
            this.openedChange = new i0.EventEmitter();
            this.modeChange = new i0.EventEmitter();
            this.subscribeAndExposeSidenavEvents();
        }
        Object.defineProperty(DecSidenavMenuRightComponent.prototype, "open", {
            get: /**
             * @return {?}
             */ function () {
                return this.rightMenuVisible.value;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this.rightMenuMode.value;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-sidenav-menu-right',
                        template: "<ng-container *ngIf=\"customTitle\">\n  <div class=\"menu-title\">\n    <ng-content select=\"dec-dec-sidenav-menu-title\"></ng-content>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"items\">\n  <dec-sidenav-menu [items]=\"items.toArray()\"></dec-sidenav-menu>\n</ng-container>",
                        styles: [".menu-title{padding:16px;font-size:24px;font-weight:700}"]
                    },] },
        ];
        /** @nocollapse */
        DecSidenavMenuRightComponent.ctorParameters = function () {
            return [
                { type: DecSidenavService }
            ];
        };
        DecSidenavMenuRightComponent.propDecorators = {
            open: [{ type: i0.Input }],
            mode: [{ type: i0.Input }],
            persistVisibilityMode: [{ type: i0.Input }],
            items: [{ type: i0.ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
            customTitle: [{ type: i0.ContentChild, args: [DecSidenavMenuTitleComponent,] }],
            openedChange: [{ type: i0.Output }],
            modeChange: [{ type: i0.Output }]
        };
        return DecSidenavMenuRightComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecSidenavComponent = (function () {
        function DecSidenavComponent(decSidenavService) {
            this.decSidenavService = decSidenavService;
            this.progressBarVisible = new rxjs.BehaviorSubject(false);
        }
        Object.defineProperty(DecSidenavComponent.prototype, "leftMenu", {
            get: /**
             * @return {?}
             */ function () {
                return this._leftMenu;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._rightMenu;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this.progressBarVisible.value;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
                if (mode === void 0) {
                    mode = 'side';
                }
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
                if (mode === void 0) {
                    mode = 'side';
                }
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
                if (mode === void 0) {
                    mode = 'side';
                }
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
            { type: i0.Component, args: [{
                        selector: 'dec-sidenav',
                        template: "<div class=\"dec-sidenav-wraper\">\n  <!-- TOOLBAR -->\n  <ng-container *ngIf=\"toolbar\">\n    <ng-content select=\"dec-sidenav-toolbar\"></ng-content>\n  </ng-container>\n  <!-- / TOOLBAR -->\n\n  <!-- PROGRESS BAR -->\n  <div class=\"progress-bar-wrapper\" *ngIf=\"progressBarVisible | async\">\n    <mat-progress-bar mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n  </div>\n  <!-- / PROGRESS BAR -->\n\n  <mat-sidenav-container [ngClass]=\"{'with-toolbar': toolbar}\">\n\n    <!-- LEFT MENU -->\n    <mat-sidenav *ngIf=\"leftMenu\"\n    [mode]=\"leftMenu.leftMenuMode | async\"\n    [opened]=\"leftMenu.leftMenuVisible | async\"\n    position=\"start\"\n    (openedChange)=\"leftSidenavOpenedChange($event)\"\n    #leftSidenav>\n      <ng-content select=\"dec-sidenav-menu-left\"></ng-content>\n    </mat-sidenav>\n    <!-- / LEFT MENU -->\n\n    <!-- CONTENT -->\n    <ng-content select=\"dec-sidenav-content\"></ng-content>\n    <!-- / CONTENT -->\n\n    <!-- RIGHT MENU -->\n    <mat-sidenav *ngIf=\"rightMenu\"\n    [mode]=\"rightMenu.rightMenuMode | async\"\n    [opened]=\"rightMenu.rightMenuVisible | async\"\n    position=\"end\"\n    (openedChange)=\"rightSidenavOpenedChange($event)\"\n    #rightSidenav>\n      <ng-content select=\"dec-sidenav-menu-right\"></ng-content>\n    </mat-sidenav>\n    <!-- / RIGHT MENU -->\n\n  </mat-sidenav-container>\n\n</div>\n",
                        styles: [".dec-sidenav-wraper .mat-sidenav-container{height:100vh}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 64px)}.dec-sidenav-wraper .mat-sidenav-container .mat-sidenav{width:256px}.dec-sidenav-wraper .progress-bar-wrapper{position:fixed;top:60px;left:0;width:100%}"]
                    },] },
        ];
        /** @nocollapse */
        DecSidenavComponent.ctorParameters = function () {
            return [
                { type: DecSidenavService }
            ];
        };
        DecSidenavComponent.propDecorators = {
            toolbar: [{ type: i0.ContentChild, args: [DecSidenavToolbarComponent,] }],
            leftMenu: [{ type: i0.ContentChild, args: [DecSidenavMenuLeftComponent,] }],
            rightMenu: [{ type: i0.ContentChild, args: [DecSidenavMenuRightComponent,] }],
            leftSidenav: [{ type: i0.ViewChild, args: ['leftSidenav',] }],
            rightSidenav: [{ type: i0.ViewChild, args: ['rightSidenav',] }],
            loading: [{ type: i0.Input }]
        };
        return DecSidenavComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecSidenavContentComponent = (function () {
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
            { type: i0.Component, args: [{
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
    var DecSidenavMenuComponent = (function () {
        function DecSidenavMenuComponent() {
            this.items = [];
            this.treeLevel = -1;
        }
        DecSidenavMenuComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'dec-sidenav-menu',
                        template: "<mat-list>\n  <ng-container *ngFor=\"let item of items\">\n    <ng-container *ngIf=\"item.started && item.template ? true : false\">\n      <ng-template\n      [ngTemplateOutlet]=\"item.template\"\n      [ngTemplateOutletContext]=\"{treeLevel: treeLevel + 1}\"\n      ></ng-template>\n    </ng-container>\n  </ng-container>\n</mat-list>\n",
                        styles: [".mat-list{padding-top:0}"]
                    },] },
        ];
        /** @nocollapse */
        DecSidenavMenuComponent.ctorParameters = function () { return []; };
        DecSidenavMenuComponent.propDecorators = {
            items: [{ type: i0.Input }],
            treeLevel: [{ type: i0.Input }]
        };
        return DecSidenavMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecSidenavModule = (function () {
        function DecSidenavModule() {
        }
        DecSidenavModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatSidenavModule,
                            material.MatListModule,
                            material.MatIconModule,
                            material.MatToolbarModule,
                            material.MatProgressBarModule,
                            i2.RouterModule,
                            http.HttpClientModule,
                            i2$1.TranslateModule,
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
    var DecStepsListComponent = (function () {
        function DecStepsListComponent() {
            this.icon = 'history';
            this.title = '';
            this.stepsList = [];
        }
        DecStepsListComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'dec-steps-list',
                        template: "<div class=\"history-container\" [ngClass]=\"{'limited-height': maxHeight}\" [style.maxHeight]=\"maxHeight || '100%'\">\n\n  <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"8px\" class=\"dec-color-grey-dark\">\n\n    <mat-icon fxFlex=\"24px\">{{icon}}</mat-icon>\n\n    <span class=\"bigger-font\">{{ title }}</span>\n\n  </div>\n\n  <br>\n\n  <div fxLayout=\"column\" fxLayoutGap=\"16px\">\n\n    <div class=\"history-item\" *ngFor=\"let item of stepsList; let i = index\">\n\n      <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"left start\" class=\"dec-color-grey\">\n\n        <mat-icon class=\"smaller-icon dec-color-grey-dark\" fxFlex=\"24px\">{{ i === stepsList.length - 1 ? 'radio_button_unchecked' : 'lens' }}</mat-icon>\n\n        <div fxLayout=\"column\" fxLayoutGap=\"4px\">\n\n          <div>\n\n            <strong *ngIf=\"item.title\">{{ item.title }}</strong>\n\n            <span *ngIf=\"item.date\">\n              {{ item.date | date }}\n              <span *ngIf=\"showTime\"> | {{ item.date | date: 'mediumTime' }}</span>\n            </span>\n\n          </div>\n\n          <div *ngIf=\"item.description\" class=\"dec-color-grey-dark\">\n            <strong class=\"dec-color-black\">{{ item.description }}</strong>\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n</div>\n",
                        styles: [".mat-tab-body-content{padding:16px 0}.mat-form-field-prefix{margin-right:8px!important}.mat-form-field-suffix{margin-left:8px!important}.mat-elevation-z0{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mat-elevation-z1{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.mat-elevation-z2{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.mat-elevation-z3{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.mat-elevation-z4{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mat-elevation-z5{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}.mat-elevation-z6{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.mat-elevation-z7{box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}.mat-elevation-z8{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-elevation-z9{box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}.mat-elevation-z10{box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}.mat-elevation-z11{box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}.mat-elevation-z12{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-elevation-z13{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}.mat-elevation-z14{box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}.mat-elevation-z15{box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}.mat-elevation-z16{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-elevation-z17{box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}.mat-elevation-z18{box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}.mat-elevation-z19{box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}.mat-elevation-z20{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}.mat-elevation-z21{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}.mat-elevation-z22{box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}.mat-elevation-z23{box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}.mat-elevation-z24{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-card-title{font-size:24px;font-weight:400}.mat-card-content,.mat-card-header .mat-card-title,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:13px;line-height:18px}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif}.mat-expansion-panel-header{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field{width:100%;font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-outline{bottom:1.34375em}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:9px;padding-bottom:9px}.mat-list-item,.mat-list-option{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{font-size:16px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line,.mat-selection-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{font-size:16px}.mat-list .mat-list-option .mat-line,.mat-nav-list .mat-list-option .mat-line,.mat-selection-list .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-item{font-size:12px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line,.mat-selection-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option{font-size:12px}.mat-list[dense] .mat-list-option .mat-line,.mat-nav-list[dense] .mat-list-option .mat-line,.mat-selection-list[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-simple-snackbar{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden}@media screen and (-ms-high-contrast:active){.mat-ripple{display:none}}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1),-webkit-transform 0s cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.288)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;box-sizing:content-box!important}.history-container{margin:1.5em 0}.history-container.limited-height{overflow-y:auto}.history-container .history-item:not(:last-child){position:relative}.history-container .history-item:not(:last-child)::before{content:\"\";position:absolute;height:3em;width:2px;background-color:#91979c;left:11px;top:14px}.history-container .history-item .smaller-icon{font-size:16px;display:flex;justify-content:center;margin-top:2px}"]
                    },] },
        ];
        DecStepsListComponent.propDecorators = {
            icon: [{ type: i0.Input }],
            title: [{ type: i0.Input }],
            showTime: [{ type: i0.Input }],
            maxHeight: [{ type: i0.Input }],
            stepsList: [{ type: i0.Input }]
        };
        return DecStepsListComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecStepsListModule = (function () {
        function DecStepsListModule() {
        }
        DecStepsListModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            flexLayout.FlexLayoutModule,
                            material.MatIconModule,
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DecStringArrayInputComponent; }),
        multi: true
    };
    var DecStringArrayInputComponent = (function () {
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
             */ function () {
                return this.innerArray;
            },
            // Set accessor including call the onchange callback
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this.getArrayAsString();
            },
            // Set accessor including call the onchange callback
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-string-array-input',
                        template: "<ng-container [ngSwitch]=\"mode == 'input'\">\n\n  <mat-form-field *ngSwitchCase=\"true\">\n    <input matInput\n    type=\"text\"\n    [name]=\"name\"\n    [(ngModel)]=\"valueAsString\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n\n  <mat-form-field *ngSwitchCase=\"false\">\n    <textarea matInput\n    [rows]=\"rows\"\n    [name]=\"name\"\n    [(ngModel)]=\"valueAsString\"\n    [placeholder]=\"placeholder\">\n    </textarea>\n  </mat-form-field>\n\n</ng-container>\n",
                        styles: [""],
                        providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        DecStringArrayInputComponent.ctorParameters = function () { return []; };
        DecStringArrayInputComponent.propDecorators = {
            name: [{ type: i0.Input }],
            placeholder: [{ type: i0.Input }],
            mode: [{ type: i0.Input }],
            rows: [{ type: i0.Input }]
        };
        return DecStringArrayInputComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecStringArrayInputModule = (function () {
        function DecStringArrayInputModule() {
        }
        DecStringArrayInputModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatInputModule,
                            forms.FormsModule
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
    var DecTabComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'dec-tab',
                        template: "",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        DecTabComponent.ctorParameters = function () { return []; };
        DecTabComponent.propDecorators = {
            label: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            total: [{ type: i0.Input }],
            content: [{ type: i0.ContentChild, args: [i0.TemplateRef,] }],
            disabled: [{ type: i0.Input }]
        };
        return DecTabComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecTabMenuComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'dec-tab-menu',
                        template: "<p>\n  tab-menu works!\n</p>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        DecTabMenuComponent.ctorParameters = function () { return []; };
        DecTabMenuComponent.propDecorators = {
            activeTab: [{ type: i0.Input }],
            content: [{ type: i0.ContentChild, args: [i0.TemplateRef,] }]
        };
        return DecTabMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecTabsComponent = (function () {
        function DecTabsComponent(route, router) {
            var _this = this;
            this.route = route;
            this.router = router;
            this.persist = true;
            this.destroyOnBlur = false;
            this.padding = true;
            this.activeTabChange = new i0.EventEmitter();
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
             */ function () {
                return this._activeTab;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._activeTabIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DecTabsComponent.prototype, "activeTabObject", {
            get: /**
             * @return {?}
             */ function () {
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
            { type: i0.Component, args: [{
                        selector: 'dec-tabs',
                        template: "<div *ngIf=\"!hidden\">\n\n  <!-- TABS -->\n  <mat-tab-group [selectedIndex]=\"activeTabIndex\" (focusChange)=\"onChangeTab($event)\" [dynamicHeight]=\"true\">\n\n    <!-- TAB -->\n    <mat-tab *ngFor=\"let tab of tabs;\" [disabled]=\"tab.disabled\">\n\n      <!-- TAB LABEL -->\n      <ng-template mat-tab-label>\n        {{ tab.label }}\n        <span class=\"badge badge-pill badge-small\" *ngIf=\"tab.total >= 0\">{{ parseTotal(tab.total) }}</span>\n      </ng-template>\n\n      <!-- TAB CONTENT WRAPPER -->\n      <ng-container *ngIf=\"shoulTabBeDisplayed(tab)\">\n\n        <!-- TAB MENU -->\n        <div *ngIf=\"tabMenuComponent\" class=\"menu-wrapper\">\n          <ng-container *ngTemplateOutlet=\"tabMenuComponent.content; context: { activeTab: activeTab }\"></ng-container>\n        </div>\n\n        <!-- TABS CONTENT -->\n        <div [ngClass]=\"{'tab-padding': padding}\">\n\n          <ng-container *ngTemplateOutlet=\"tab.content\"></ng-container>\n\n        </div>\n\n      </ng-container>\n\n    </mat-tab>\n\n  </mat-tab-group>\n\n</div>\n",
                        styles: [".menu-wrapper{text-align:right;padding:8px 0}.tab-padding{padding:16px 0}"]
                    },] },
        ];
        /** @nocollapse */
        DecTabsComponent.ctorParameters = function () {
            return [
                { type: i2.ActivatedRoute },
                { type: i2.Router }
            ];
        };
        DecTabsComponent.propDecorators = {
            tabs: [{ type: i0.ContentChildren, args: [DecTabComponent,] }],
            tabMenuComponent: [{ type: i0.ContentChild, args: [DecTabMenuComponent,] }],
            hidden: [{ type: i0.Input }],
            persist: [{ type: i0.Input }],
            destroyOnBlur: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            padding: [{ type: i0.Input }],
            activeTab: [{ type: i0.Input }],
            activeTabChange: [{ type: i0.Output }]
        };
        return DecTabsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecTabModule = (function () {
        function DecTabModule() {
        }
        DecTabModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatTabsModule
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
    var DecTabsModule = (function () {
        function DecTabsModule() {
        }
        DecTabsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatTabsModule,
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
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DecUploadComponent; }),
        multi: true
    };
    var DecUploadComponent = (function () {
        function DecUploadComponent(service) {
            this.service = service;
            this.progresses = [];
            this.error = new i0.EventEmitter();
            this.uploaded = new i0.EventEmitter();
            this.progress = new i0.EventEmitter();
            this.onTouchedCallback = noop$9;
            this.onChangeCallback = noop$9;
        }
        Object.defineProperty(DecUploadComponent.prototype, "value", {
            get: /**
             * @return {?}
             */ function () {
                return this.innerValue;
            },
            /*
            ** ngModel VALUE
            */
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
                        .pipe(operators.catchError(function (error) {
                        console.log('catchError', error);
                        progress_1.error = error.message;
                        _this.error.emit('message.error.unexpected');
                        _this.detectUploadEnd();
                        return rxjs.throwError(error.message);
                    }))
                        .subscribe(function (event) {
                        if (event.type === http.HttpEventType.UploadProgress) {
                            var /** @type {?} */ percentDone = Math.round((100 * event.loaded) / event.total);
                            progress_1.value = percentDone === 100 ? percentDone : parseFloat(percentDone.toFixed(2));
                        }
                        else if (event instanceof http.HttpResponse) {
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
            { type: i0.Component, args: [{
                        selector: 'dec-upload',
                        template: "<ng-container [ngSwitch]=\"(progresses && progresses.length) ? true : false\">\n  <ng-container *ngSwitchCase=\"false\">\n    <span (click)=\"openFileSelection()\" class=\"click\">\n      <ng-content></ng-content>\n    </span>\n  </ng-container>\n  <ng-container *ngSwitchCase=\"true\">\n    <div *ngFor=\"let uploadProgress of progresses\" class=\"dec-upload-progress-wrapper\">\n      <mat-progress-bar\n        color=\"primary\"\n        [mode]=\"getProgressbarMode(uploadProgress)\"\n        [value]=\"getProgressValueBasedOnMode(uploadProgress)\">\n      </mat-progress-bar>\n      <div class=\"text-center\">\n        <small>\n          {{ uploadProgress.value }}% - {{ uploadProgress.fileName }}\n        </small>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n\n\n<input type=\"file\" #inputFile (change)=\"filesChanged($event)\" [multiple]=\"multiple\" [disabled]=\"disabled\">\n\n",
                        styles: [".click{cursor:pointer}input{display:none}.text-center{text-align:center}.dec-upload-progress-wrapper{padding:8px 0}"],
                        providers: [DEC_UPLOAD_CONTROL_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        DecUploadComponent.ctorParameters = function () {
            return [
                { type: DecApiService }
            ];
        };
        DecUploadComponent.propDecorators = {
            disabled: [{ type: i0.Input }],
            multiple: [{ type: i0.Input }],
            error: [{ type: i0.Output }],
            uploaded: [{ type: i0.Output }],
            progress: [{ type: i0.Output }],
            inputFile: [{ type: i0.ViewChild, args: ['inputFile',] }]
        };
        return DecUploadComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ DECORA_API_SERVICE_CONFIG = new i0.InjectionToken('DECORA_API_SERVICE_CONFIG');
    /**
     * @param {?} http
     * @param {?} serviceConfig
     * @return {?}
     */
    function InitDecApiService(http$$1, serviceConfig) {
        return new DecApiService(http$$1, serviceConfig);
    }
    var DecApiModule = (function () {
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
                            deps: [http.HttpClient, DECORA_API_SERVICE_CONFIG]
                        }
                    ]
                };
            };
        DecApiModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            http.HttpClientModule
                        ]
                    },] },
        ];
        return DecApiModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecUploadModule = (function () {
        function DecUploadModule() {
        }
        DecUploadModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatProgressBarModule,
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
    var DecAuthGuard = (function () {
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
                    .pipe(operators.map(function (user) {
                    return (user && user.id) ? true : false;
                })));
            };
        DecAuthGuard.decorators = [
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        DecAuthGuard.ctorParameters = function () {
            return [
                { type: DecApiService }
            ];
        };
        return DecAuthGuard;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecGuardModule = (function () {
        function DecGuardModule() {
        }
        DecGuardModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
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
    var UserAuthData = (function () {
        function UserAuthData(user) {
            if (user === void 0) {
                user = {};
            }
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
    var DecSnackBarService = (function () {
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
                if (duration === void 0) {
                    duration = 4e3;
                }
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        DecSnackBarService.ctorParameters = function () {
            return [
                { type: material.MatSnackBar },
                { type: i2$1.TranslateService }
            ];
        };
        /** @nocollapse */ DecSnackBarService.ngInjectableDef = i0.defineInjectable({ factory: function DecSnackBarService_Factory() { return new DecSnackBarService(i0.inject(i1.MatSnackBar), i0.inject(i2$1.TranslateService)); }, token: DecSnackBarService, providedIn: "root" });
        return DecSnackBarService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecSnackBarModule = (function () {
        function DecSnackBarModule() {
        }
        DecSnackBarModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatSnackBarModule,
                            i2$1.TranslateModule
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
    var DecPermissionGuard = (function () {
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
                    return rxjs.of(false);
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
                    return rxjs.of(false);
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
                    .pipe(operators.map(function (user) {
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
                catch (error) {
                    return false;
                }
            };
        DecPermissionGuard.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        DecPermissionGuard.ctorParameters = function () {
            return [
                { type: DecApiService },
                { type: i2.Router }
            ];
        };
        /** @nocollapse */ DecPermissionGuard.ngInjectableDef = i0.defineInjectable({ factory: function DecPermissionGuard_Factory() { return new DecPermissionGuard(i0.inject(DecApiService), i0.inject(i2.Router)); }, token: DecPermissionGuard, providedIn: "root" });
        return DecPermissionGuard;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecPermissionGuardModule = (function () {
        function DecPermissionGuardModule() {
        }
        DecPermissionGuardModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
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
    var DecWsClientService = (function () {
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
                        messages: new rxjs.BehaviorSubject([]),
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
            { type: i0.Injectable },
        ];
        /** @nocollapse */
        DecWsClientService.ctorParameters = function () { return []; };
        return DecWsClientService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DecWsClientModule = (function () {
        function DecWsClientModule() {
        }
        DecWsClientModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR;
    exports.DecAutocompleteComponent = DecAutocompleteComponent;
    exports.DecAutocompleteModule = DecAutocompleteModule;
    exports.DecAutocompleteAccountComponent = DecAutocompleteAccountComponent;
    exports.DecAutocompleteAccountModule = DecAutocompleteAccountModule;
    exports.AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR = AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR;
    exports.DecAutocompleteCompanyComponent = DecAutocompleteCompanyComponent;
    exports.DecAutocompleteCompanyModule = DecAutocompleteCompanyModule;
    exports.AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR = AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR;
    exports.DecAutocompleteCountryComponent = DecAutocompleteCountryComponent;
    exports.DecAutocompleteCountryModule = DecAutocompleteCountryModule;
    exports.BASE_ENDPOINT = BASE_ENDPOINT;
    exports.AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR = AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR;
    exports.DecAutocompleteDepartmentComponent = DecAutocompleteDepartmentComponent;
    exports.DecAutocompleteDepartmentModule = DecAutocompleteDepartmentModule;
    exports.DecAutocompleteRoleComponent = DecAutocompleteRoleComponent;
    exports.DecAutocompleteRoleModule = DecAutocompleteRoleModule;
    exports.BASE_AUTOCOMPLETE_PROJECT_ENDPOINT = BASE_AUTOCOMPLETE_PROJECT_ENDPOINT;
    exports.AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR = AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR;
    exports.DecAutocompleteProjectComponent = DecAutocompleteProjectComponent;
    exports.DecAutocompleteProjectModule = DecAutocompleteProjectModule;
    exports.AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR = AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR;
    exports.DecAutocompleteQuoteComponent = DecAutocompleteQuoteComponent;
    exports.DecAutocompleteQuoteModule = DecAutocompleteQuoteModule;
    exports.DecBreadcrumbComponent = DecBreadcrumbComponent;
    exports.DecBreadcrumbModule = DecBreadcrumbModule;
    exports.DecDialogComponent = DecDialogComponent;
    exports.DecDialogModule = DecDialogModule;
    exports.DecDialogService = DecDialogService;
    exports.DecGalleryComponent = DecGalleryComponent;
    exports.DecGalleryModule = DecGalleryModule;
    exports.DecImageModule = DecImageModule;
    exports.DecImageDirective = DecImageDirective;
    exports.DecLabelComponent = DecLabelComponent;
    exports.DecLabelModule = DecLabelModule;
    exports.DecListModule = DecListModule;
    exports.DecListTabsFilter = DecListTabsFilter;
    exports.DecListComponent = DecListComponent;
    exports.DecListActiveFilterResumeModule = DecListActiveFilterResumeModule;
    exports.DecListActiveFilterResumeComponent = DecListActiveFilterResumeComponent;
    exports.DecListAdvancedFilterModule = DecListAdvancedFilterModule;
    exports.DecListAdvancedFilterComponent = DecListAdvancedFilterComponent;
    exports.DecListFilterModule = DecListFilterModule;
    exports.DecListFilterComponent = DecListFilterComponent;
    exports.DecListFooterComponent = DecListFooterComponent;
    exports.DecListGridComponent = DecListGridComponent;
    exports.DecListTableModule = DecListTableModule;
    exports.DecListTableComponent = DecListTableComponent;
    exports.DecListTableColumnComponent = DecListTableColumnComponent;
    exports.DecListTabsFilterModule = DecListTabsFilterModule;
    exports.DecListTabsFilterComponent = DecListTabsFilterComponent;
    exports.DecListActionsModule = DecListActionsModule;
    exports.DecListActionsComponent = DecListActionsComponent;
    exports.DecPageForbidenComponent = DecPageForbidenComponent;
    exports.DecPageForbidenModule = DecPageForbidenModule;
    exports.DecPageNotFoundComponent = DecPageNotFoundComponent;
    exports.DecPageNotFoundModule = DecPageNotFoundModule;
    exports.DecProductSpinComponent = DecProductSpinComponent;
    exports.DecProductSpinModule = DecProductSpinModule;
    exports.DecSidenavModule = DecSidenavModule;
    exports.DecSidenavComponent = DecSidenavComponent;
    exports.DecSidenavContentComponent = DecSidenavContentComponent;
    exports.DecSidenavMenuItemComponent = DecSidenavMenuItemComponent;
    exports.DecSidenavMenuLeftComponent = DecSidenavMenuLeftComponent;
    exports.DecSidenavMenuRightComponent = DecSidenavMenuRightComponent;
    exports.DecSidenavMenuTitleComponent = DecSidenavMenuTitleComponent;
    exports.DecSidenavToolbarComponent = DecSidenavToolbarComponent;
    exports.DecSidenavToolbarTitleComponent = DecSidenavToolbarTitleComponent;
    exports.DecSpinnerComponent = DecSpinnerComponent;
    exports.DecSpinnerModule = DecSpinnerModule;
    exports.DecStepsListComponent = DecStepsListComponent;
    exports.DecStepsListModule = DecStepsListModule;
    exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR;
    exports.DecStringArrayInputComponent = DecStringArrayInputComponent;
    exports.DecStringArrayInputModule = DecStringArrayInputModule;
    exports.DecTabsModule = DecTabsModule;
    exports.DecTabsComponent = DecTabsComponent;
    exports.DecTabModule = DecTabModule;
    exports.DecTabComponent = DecTabComponent;
    exports.DecUploadModule = DecUploadModule;
    exports.DEC_UPLOAD_CONTROL_VALUE_ACCESSOR = DEC_UPLOAD_CONTROL_VALUE_ACCESSOR;
    exports.DecUploadComponent = DecUploadComponent;
    exports.DecPermissionDirective = DecPermissionDirective;
    exports.DecPermissionModule = DecPermissionModule;
    exports.hexToRgbNew = hexToRgbNew;
    exports.standardize_color = standardize_color;
    exports.DecContrastFontWithBgDirective = DecContrastFontWithBgDirective;
    exports.DecContrastFontWithBgModule = DecContrastFontWithBgModule;
    exports.DecGuardModule = DecGuardModule;
    exports.DecAuthGuard = DecAuthGuard;
    exports.DecApiService = DecApiService;
    exports.DECORA_API_SERVICE_CONFIG = DECORA_API_SERVICE_CONFIG;
    exports.InitDecApiService = InitDecApiService;
    exports.DecApiModule = DecApiModule;
    exports.UserAuthData = UserAuthData;
    exports.DecSnackBarService = DecSnackBarService;
    exports.DecSnackBarModule = DecSnackBarModule;
    exports.DecPermissionGuard = DecPermissionGuard;
    exports.DecPermissionGuardModule = DecPermissionGuardModule;
    exports.DecWsClientService = DecWsClientService;
    exports.DecWsClientModule = DecWsClientModule;
    exports.ɵb = DecSidenavMenuComponent;
    exports.ɵa = DecSidenavService;
    exports.ɵc = DecTabMenuComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWJyb3dzZXItbGliLXVpLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtYWNjb3VudC9hdXRvY29tcGxldGUtYWNjb3VudC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWFjY291bnQvYXV0b2NvbXBsZXRlLWFjY291bnQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb21wYW55L2F1dG9jb21wbGV0ZS1jb21wYW55LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtY29tcGFueS9hdXRvY29tcGxldGUtY29tcGFueS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWNvdW50cnkvYXV0b2NvbXBsZXRlLWNvdW50cnkuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb3VudHJ5L2F1dG9jb21wbGV0ZS1jb3VudHJ5Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQvYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1yb2xlL2F1dG9jb21wbGV0ZS1yb2xlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcm9sZS9hdXRvY29tcGxldGUtcm9sZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXByb2plY3QvYXV0b2NvbXBsZXRlLXByb2plY3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1wcm9qZWN0L2F1dG9jb21wbGV0ZS1wcm9qZWN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXNwaW5uZXIvZGVjLXNwaW5uZXIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1kaWFsb2cvZGVjLWRpYWxvZy5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1kaWFsb2cvZGVjLWRpYWxvZy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZ2FsbGVyeS9jYXJvdXNlbC1jb25maWcudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZ2FsbGVyeS9kZWMtZ2FsbGVyeS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UuZGlyZWN0aXZlLmNvbnN0YW50cy50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2dhbGxlcnkvZGVjLWdhbGxlcnkubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1sYWJlbC9kZWMtbGFiZWwuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2NvbG9yL2NvbnRyYXN0LWZvbnQtd2l0aC1iZy9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9jb2xvci9jb250cmFzdC1mb250LXdpdGgtYmcvZGVjLWNvbnRyYXN0LWZvbnQtd2l0aC1iZy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWxhYmVsL2RlYy1sYWJlbC5tb2R1bGUudHMiLG51bGwsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QubW9kZWxzLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJzLWZpbHRlci9saXN0LXRhYnMtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZmlsdGVyL2xpc3QtZmlsdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL3Blcm1pc3Npb24vZGVjLXBlcm1pc3Npb24uZGlyZWN0aXZlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL3Blcm1pc3Npb24vZGVjLXBlcm1pc3Npb24ubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJzLWZpbHRlci9saXN0LXRhYnMtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS1jb2x1bW4vbGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS9saXN0LXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS9saXN0LXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZm9vdGVyL2xpc3QtZm9vdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWN0aW9ucy9saXN0LWFjdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hY3Rpb25zL2xpc3QtYWN0aW9ucy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wYWdlLWZvcmJpZGVuL3BhZ2UtZm9yYmlkZW4uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2UtZm9yYmlkZW4vcGFnZS1mb3JiaWRlbi5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvcGFnZS1ub3QtZm91bmQvcGFnZS1ub3QtZm91bmQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2Utbm90LWZvdW5kL3BhZ2Utbm90LWZvdW5kLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wcm9kdWN0LXNwaW4vcHJvZHVjdC1zcGluLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wcm9kdWN0LXNwaW4vcHJvZHVjdC1zcGluLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUvZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi10b29sYmFyL2RlYy1zaWRlbmF2LXRvb2xiYXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS1sZWZ0L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1jb250ZW50L2RlYy1zaWRlbmF2LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS9kZWMtc2lkZW5hdi1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L3NpZGVuYXYubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zdGVwcy1saXN0L2RlYy1zdGVwcy1saXN0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3RlcHMtbGlzdC9kZWMtc3RlcHMtbGlzdC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXN0cmluZy1hcnJheS1pbnB1dC9kZWMtc3RyaW5nLWFycmF5LWlucHV0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3RyaW5nLWFycmF5LWlucHV0L2RlYy1zdHJpbmctYXJyYXktaW5wdXQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFiL3RhYi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdGFicy90YWItbWVudS90YWItbWVudS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdGFicy90YWJzLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYi90YWIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFicy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdXBsb2FkL3VwbG9hZC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZ3VhcmQvYXV0aC1ndWFyZC5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9ndWFyZC9ndWFyZC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL3Blcm1pc3Npb24tZ3VhcmQvZGVjLXBlcm1pc3Npb24tZ3VhcmQuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvcGVybWlzc2lvbi1ndWFyZC9kZWMtcGVybWlzc2lvbi1ndWFyZC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL3dzLWNsaWVudC93cy1jbGllbnQuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvd3MtY2xpZW50L3dzLWNsaWVudC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcywgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgc2hhcmUsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFVzZXJBdXRoRGF0YSwgTG9naW5EYXRhLCBGYWNlYm9va0xvZ2luRGF0YSwgU2VydmljZUNvbmZpZywgRGVjRmlsdGVyLCBTZXJpYWxpemVkRGVjRmlsdGVyIH0gZnJvbSAnLi9kZWNvcmEtYXBpLm1vZGVsJztcblxuZXhwb3J0IHR5cGUgQ2FsbE9wdGlvbnMgPSB7XG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgcGFyYW1zPzoge1xuICAgIFtwcm9wOiBzdHJpbmddOiBhbnk7XG4gIH07XG59ICYge1xuICBbcHJvcDogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSHR0cFJlcXVlc3RUeXBlcyA9ICdHRVQnIHwgJ1BPU1QnIHwgJ1BVVCcgfCAnUEFUQ0gnIHwgJ0RFTEVURSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBcGlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICB1c2VyOiBVc2VyQXV0aERhdGE7XG5cbiAgdXNlciQ6IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+KHVuZGVmaW5lZCk7XG5cbiAgcHJpdmF0ZSBzZXNzaW9uVG9rZW46IHN0cmluZztcblxuICBwcml2YXRlIHVzZXJTdWJzY3JpcGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGdldCBob3N0KCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5ob3N0O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ0RFQ09SQV9BUElfU0VSVklDRV9DT05GSUcnKSBwcml2YXRlIGNvbmZpZzogU2VydmljZUNvbmZpZ1xuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZVRvVXNlcigpO1xuICAgIHRoaXMudHJ5VG9Mb2FkU2lnbmVkSW5Vc2VyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9Vc2VyKCk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIC8vIFBVQkxJQyBBVVRIIE1FVEhPRFMgLy9cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICBhdXRoID0gKGxvZ2luRGF0YTogTG9naW5EYXRhKSA9PiB7XG4gICAgaWYgKGxvZ2luRGF0YSkge1xuICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL3NpZ25pbicpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgaGVhZGVyczogdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB9O1xuICAgICAgY29uc3QgYm9keSA9IG5ldyBIdHRwUGFyYW1zKClcbiAgICAgICAgLnNldCgndXNlcm5hbWUnLCBsb2dpbkRhdGEuZW1haWwpXG4gICAgICAgIC5zZXQoJ3Bhc3N3b3JkJywgbG9naW5EYXRhLnBhc3N3b3JkKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VXNlckF1dGhEYXRhPihlbmRwb2ludCwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgbm90aWZpZWQ6IHRydWUsIG1lc3NhZ2U6ICdERUNPUkEtQVBJIEFVVEggRVJST1I6OiBObyBjcmVkZW50aWFscyBwcm92aWRlZCcgfSk7XG4gICAgfVxuICB9XG5cbiAgYXV0aEZhY2Vib29rID0gKGxvZ2luRGF0YTogRmFjZWJvb2tMb2dpbkRhdGEpID0+IHtcbiAgICBpZiAobG9naW5EYXRhKSB7XG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvZmFjZWJvb2svc2lnbmluJyk7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgICBjb25zdCBib2R5ID0gbmV3IEh0dHBQYXJhbXMoKVxuICAgICAgICAuc2V0KCdmYWNlYm9va1Rva2VuJywgbG9naW5EYXRhLmZhY2Vib29rVG9rZW4pXG4gICAgICAgIC5zZXQoJ2tlZXBMb2dnZWQnLCBsb2dpbkRhdGEua2VlcExvZ2dlZC50b1N0cmluZygpKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VXNlckF1dGhEYXRhPihlbmRwb2ludCwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgbm90aWZpZWQ6IHRydWUsIG1lc3NhZ2U6ICdERUNPUkEtQVBJIEFVVEggRkFDRUJPT0sgRVJST1I6OiBObyBjcmVkZW50aWFscyBwcm92aWRlZCcgfSk7XG4gICAgfVxuICB9XG5cbiAgbG9nb3V0ID0gKHJlZGlyZWN0VG9Mb2dpblBhZ2UgPSB0cnVlKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL3NpZ25vdXQnKTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZChlbmRwb2ludCwge30sIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICBpZiAocmVkaXJlY3RUb0xvZ2luUGFnZSkge1xuICAgICAgICAgICAgdGhpcy5nb1RvTG9naW5QYWdlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pKTtcbiAgfVxuXG4gIGZldGNoQ3VycmVudExvZ2dlZFVzZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL2FjY291bnQnKTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oKSB9O1xuICAgIHJldHVybiB0aGlzLmdldE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCB7fSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gUFVCTElDIEhUVFAgTUVUSE9EUyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIGdldCA9IDxUPihlbmRwb2ludCwgc2VhcmNoPzogRGVjRmlsdGVyLCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMudHJhbnNmb3JtRGVjRmlsdGVySW5QYXJhbXMoc2VhcmNoKTtcbiAgICByZXR1cm4gdGhpcy5nZXRNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gIH1cblxuICBkZWxldGUgPSA8VD4oZW5kcG9pbnQsIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlTWV0aG9kPFQ+KGVuZG9waW50VXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBhdGNoID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wYXRjaE1ldGhvZDxUPihlbmRvcGludFVybCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1dCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMucHV0TWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHVwc2VydCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGlmIChwYXlsb2FkLmlkID49IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChlbmRwb2ludCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoZW5kcG9pbnQsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHVwbG9hZChlbmRwb2ludDogc3RyaW5nLCBmaWxlczogRmlsZVtdLCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuY3JlYXRlRmlsZXNGb3JtRGF0YShmaWxlcyk7XG4gICAgb3B0aW9ucy5yZXBvcnRQcm9ncmVzcyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RNZXRob2QoJ1BPU1QnLCBlbmRvcGludFVybCwgZm9ybURhdGEsIG9wdGlvbnMpO1xuICB9XG5cblxuICAvLyAqKioqKioqKioqKiogLy9cbiAgLy8gUHVibGljIEhlbHBlciBNZXRob2RzIC8vXG4gIC8vICoqKioqKioqKioqKiAvL1xuICBwcml2YXRlIHRyYW5zZm9ybURlY0ZpbHRlckluUGFyYW1zKGZpbHRlcjogRGVjRmlsdGVyKTogU2VyaWFsaXplZERlY0ZpbHRlciB7XG5cbiAgICBjb25zdCBzZXJpYWxpemVkRmlsdGVyOiBTZXJpYWxpemVkRGVjRmlsdGVyID0ge307XG5cbiAgICBpZiAoZmlsdGVyKSB7XG5cbiAgICAgIGlmIChmaWx0ZXIucGFnZSkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnBhZ2UgPSBmaWx0ZXIucGFnZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5saW1pdCkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLmxpbWl0ID0gZmlsdGVyLmxpbWl0O1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLmZpbHRlckdyb3Vwcykge1xuICAgICAgICBjb25zdCBmaWx0ZXJXaXRoVmFsdWVBc0FycmF5ID0gdGhpcy5nZXRGaWx0ZXJXaXRoVmFsdWVzQXNBcnJheShmaWx0ZXIuZmlsdGVyR3JvdXBzKTtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5maWx0ZXIgPSB0aGlzLmZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcoZmlsdGVyV2l0aFZhbHVlQXNBcnJheSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIucHJvamVjdFZpZXcpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5wcm9qZWN0VmlldyA9IHRoaXMuZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhmaWx0ZXIucHJvamVjdFZpZXcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLmNvbHVtbnMpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5jb2x1bW5zID0gZmlsdGVyLmNvbHVtbnM7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIudGV4dFNlYXJjaCkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnRleHRTZWFyY2ggPSBmaWx0ZXIudGV4dFNlYXJjaDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBzZXJpYWxpemVkRmlsdGVyO1xuXG4gIH1cblxuICBwcml2YXRlIGZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcob2JqKSB7XG4gICAgaWYgKG9iaikge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWx0ZXJXaXRoVmFsdWVzQXNBcnJheShmaWx0ZXJHcm91cHMpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwQ29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsdGVyR3JvdXBzKSk7IC8vIG1ha2UgYSBjb3B5IG9mIHRoZSBmaWx0ZXIgc28gd2UgZG8gbm90IGNoYW5nZSB0aGUgb3JpZ2luYWwgZmlsdGVyXG5cbiAgICBpZiAoZmlsdGVyR3JvdXBDb3B5KSB7XG5cbiAgICAgIHJldHVybiBmaWx0ZXJHcm91cENvcHkubWFwKGZpbHRlckdyb3VwID0+IHtcblxuICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzID0gZmlsdGVyR3JvdXAuZmlsdGVycy5tYXAoZmlsdGVyID0+IHtcblxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShmaWx0ZXIudmFsdWUpKSB7XG4gICAgICAgICAgICBmaWx0ZXIudmFsdWUgPSBbZmlsdGVyLnZhbHVlXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmaWx0ZXJHcm91cDtcblxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gZmlsdGVyR3JvdXBzO1xuXG4gICAgfVxuICB9XG5cblxuICAvLyAqKioqKioqKioqKiogLy9cbiAgLy8gSHR0cCBNZXRob2RzIC8vXG4gIC8vICoqKioqKioqKioqKiAvL1xuICBwcml2YXRlIGdldE1ldGhvZDxUPih1cmw6IHN0cmluZywgc2VhcmNoID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMucGFyYW1zID0gc2VhcmNoO1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLmdldDxUPih1cmwsIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXRjaE1ldGhvZDxUPih1cmwsIGJvZHkgPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucGF0Y2g8VD4odXJsLCBib2R5LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcG9zdE1ldGhvZDxUPih1cmwsIGJvZHk/LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5wb3N0PFQ+KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHB1dE1ldGhvZDxUPih1cmwsIGJvZHkgPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucHV0PFQ+KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIGRlbGV0ZU1ldGhvZDxUPih1cmw6IHN0cmluZywgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAuZGVsZXRlPFQ+KHVybCwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RNZXRob2Q8VD4odHlwZTogSHR0cFJlcXVlc3RUeXBlcywgdXJsOiBzdHJpbmcsIGJvZHk6IGFueSA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKHVuZGVmaW5lZCwgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QodHlwZSwgdXJsLCBib2R5LCBvcHRpb25zKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5yZXF1ZXN0PFQ+KHJlcSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yID0gKGVycm9yOiBhbnkpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICBjb25zdCBib2R5TWVzc2FnZSA9IChlcnJvciAmJiBlcnJvci5lcnJvcikgPyBlcnJvci5lcnJvci5tZXNzYWdlIDogJyc7XG4gICAgY29uc3Qgc3RhdHVzID0gZXJyb3Iuc3RhdHVzO1xuICAgIGNvbnN0IHN0YXR1c1RleHQgPSBlcnJvci5zdGF0dXNUZXh0O1xuICAgIGlmICgoZXJyb3Iuc3RhdHVzID09PSA0MDEpICYmIHRoaXMuY29uZmlnLmF1dGhIb3N0KSB7XG4gICAgICB0aGlzLmdvVG9Mb2dpblBhZ2UoKTtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBzdGF0dXNUZXh0LCBtZXNzYWdlLCBib2R5TWVzc2FnZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoeyBzdGF0dXMsIHN0YXR1c1RleHQsIG1lc3NhZ2UsIGJvZHlNZXNzYWdlIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vICoqKioqKiogLy9cbiAgLy8gSGVscGVycyAvL1xuICAvLyAqKioqKioqIC8vXG5cbiAgcHJpdmF0ZSBjcmVhdGVGaWxlc0Zvcm1EYXRhKGZpbGVzOiBGaWxlW10pIHtcbiAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmaWxlcy5mb3JFYWNoKChmaWxlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZm9ybUl0ZW1OYW1lID0gaW5kZXggPiAwID8gYGZpbGUtJHtpbmRleH1gIDogJ2ZpbGUnO1xuICAgICAgZm9ybURhdGEuYXBwZW5kKGZvcm1JdGVtTmFtZSwgZmlsZSwgZmlsZS5uYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH1cblxuICBwcml2YXRlIGdvVG9Mb2dpblBhZ2UoKSB7XG4gICAgY29uc3QgbmFrZWRBcHBEb21haW4gPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgLnJlcGxhY2UoJ2h0dHBzOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnaHR0cDovLycsICcnKVxuICAgICAgLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLnNlYXJjaCwgJycpO1xuXG4gICAgY29uc3QgbmFrZWRBdXRoRG9tYWluID0gdGhpcy5jb25maWcuYXV0aEhvc3Quc3BsaXQoJz8nKVswXVxuICAgICAgLnJlcGxhY2UoJ2h0dHBzOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnaHR0cDovLycsICcnKVxuICAgICAgLnJlcGxhY2UoJy8vJywgJycpO1xuXG4gICAgaWYgKG5ha2VkQXBwRG9tYWluICE9PSBuYWtlZEF1dGhEb21haW4pIHtcbiAgICAgIGNvbnN0IGF1dGhVcmxXaXRoUmVkaXJlY3QgPSBgJHt0aGlzLmNvbmZpZy5hdXRoSG9zdH0ke3RoaXMuZ2V0UGFyYW1zRGl2aWRlcigpfXJlZGlyZWN0VXJsPSR7d2luZG93LmxvY2F0aW9uLmhyZWZ9YDtcbiAgICAgIGNvbnNvbGUubG9nKGBEZWNBcGlTZXJ2aWNlOjogTm90IGF1dGhlbnRpY2F0ZWQuIFJlZGlyZWN0aW5nIHRvIGxvZ2luIHBhZ2UgYXQ6ICR7YXV0aFVybFdpdGhSZWRpcmVjdH1gKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXV0aFVybFdpdGhSZWRpcmVjdDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFBhcmFtc0RpdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmF1dGhIb3N0LnNwbGl0KCc/JykubGVuZ3RoID4gMSA/ICcmJyA6ICc/JztcbiAgfVxuXG4gIHByaXZhdGUgdHJ5VG9Mb2FkU2lnbmVkSW5Vc2VyKCkge1xuICAgIHRoaXMuZmV0Y2hDdXJyZW50TG9nZ2VkVXNlcigpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZWNvcmFBcGlTZXJ2aWNlOjogU3RhcnRlZCBhcyBsb2dnZWQnKTtcbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRGVjb3JhQXBpU2VydmljZTo6IFN0YXJ0ZWQgYXMgbm90IGxvZ2dlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXphdGlvbiBFcnJvci4gQ291bGQgcmV0cmlldmUgdXNlciBhY2NvdW50JywgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4odHlwZT86IHN0cmluZywgaGVhZGVycz86IEh0dHBIZWFkZXJzKSB7XG4gICAgaGVhZGVycyA9IGhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgY29uc3QgY3VzdG9taXplZENvbnRlbnRUeXBlID0gaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICghY3VzdG9taXplZENvbnRlbnRUeXBlICYmIHR5cGUpIHtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgdHlwZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlc3Npb25Ub2tlbikge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdYLUF1dGgtVG9rZW4nLCB0aGlzLnNlc3Npb25Ub2tlbik7XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYXRTZXNzaW9uVG9rZW4ocmVzKSB7XG4gICAgdGhpcy5zZXNzaW9uVG9rZW4gPSByZXMgJiYgcmVzLnNlc3Npb24gPyByZXMuc2Vzc2lvbi5pZCA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZXNvdXJjZVVybChwYXRoKSB7XG5cbiAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMuY29uZmlnLnVzZU1vY2tBcGkgPyB0aGlzLmNvbmZpZy5tb2NrQXBpSG9zdCA6IHRoaXMuY29uZmlnLmhvc3Q7XG5cbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwvfFxcLyQvZywgJycpO1xuXG4gICAgcmV0dXJuIGAke2Jhc2VQYXRofS8ke3BhdGh9YDtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1VzZXIoKSB7XG4gICAgdGhpcy51c2VyU3Vic2NyaXBpb24gPSB0aGlzLnVzZXIkLnN1YnNjcmliZSh1c2VyID0+IHtcbiAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9Vc2VyKCkge1xuICAgIHRoaXMudXNlclN1YnNjcmlwaW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKlxuICAqIFNoYXJlIE9ic2VydmFibGVcbiAgKlxuICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gc2hhcmUgdGhlIGFjdHVhbCBkYXRhIHZhbHVlcyBhbmQgbm90IGp1c3QgdGhlIG9ic2VydmFibGUgaW5zdGFuY2VcbiAgKlxuICAqIFRvIHJldXNlIGEgc2luZ2xlLCBjb21tb24gc3RyZWFtIGFuZCBhdm9pZCBtYWtpbmcgYW5vdGhlciBzdWJzY3JpcHRpb24gdG8gdGhlIHNlcnZlciBwcm92aWRpbmcgdGhhdCBkYXRhLlxuICAqXG4gICovXG4gIHByaXZhdGUgc2hhcmVPYnNlcnZhYmxlKGNhbGw6IE9ic2VydmFibGU8YW55Pikge1xuICAgIHJldHVybiBjYWxsLnBpcGUoc2hhcmUoKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN3aXRjaE1hcCwgc3RhcnRXaXRoLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYWJlbEZ1bmN0aW9uLCBWYWx1ZUZ1bmN0aW9uLCBTZWxlY3Rpb25FdmVudCwgQ3VzdG9tRmV0Y2hGdW5jdGlvbiB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLm1vZGVscyc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgI3Rlcm1JbnB1dFxuICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCJcbiAgICBbZm9ybUNvbnRyb2xdPVwiYXV0b2NvbXBsZXRlSW5wdXRcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiPlxuXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjbGVhcih0cnVlKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmICFyZXF1aXJlZCAmJiBhdXRvY29tcGxldGVJbnB1dC52YWx1ZVwiPlxuICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwicmVzZXQoKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmIHZhbHVlICE9PSB3cml0dGVuVmFsdWVcIj5cbiAgICAgIDxtYXQtaWNvbj5yZXBsYXk8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuXG4gIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG9jb21wbGV0ZT1cIm1hdEF1dG9jb21wbGV0ZVwiXG4gIFtkaXNwbGF5V2l0aF09XCJleHRyYWN0TGFiZWxcIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib25PcHRpb25TZWxlY3RlZCgkZXZlbnQpXCJcbiAgbmFtZT1cImF1dG9jb21wbGV0ZVZhbHVlXCI+XG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgKG9wdGlvbnMkIHwgYXN5bmMpXCIgW3ZhbHVlXT1cIml0ZW1cIj5cbiAgICAgIHt7IGV4dHJhY3RMYWJlbChpdGVtKSB9fVxuICAgIDwvbWF0LW9wdGlvbj5cbiAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBAVmlld0NoaWxkKE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIpICBhdXRvY29tcGxldGVUcmlnZ2VyOiBNYXRBdXRvY29tcGxldGVUcmlnZ2VyO1xuXG4gIGF1dG9jb21wbGV0ZUlucHV0OiBGb3JtQ29udHJvbDtcblxuICBvcHRpb25zJDogT2JzZXJ2YWJsZTxhbnlbXT47XG5cbiAgd3JpdHRlblZhbHVlOiBhbnk7XG5cbiAgLy8gUGFyYW1zXG4gIEBJbnB1dCgpIGN1c3RvbUZldGNoRnVuY3Rpb246IEN1c3RvbUZldGNoRnVuY3Rpb247XG5cbiAgQElucHV0KCkgZW5kcG9pbnQ7XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHY7XG4gICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQpIHtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZGlzYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGxhYmVsRm46IExhYmVsRnVuY3Rpb247XG5cbiAgQElucHV0KCkgbGFiZWxBdHRyOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbmFtZSA9ICdhdXRvY29tcGxldGVJbnB1dCc7XG5cbiAgQElucHV0KClcbiAgc2V0IG9wdGlvbnModjogYW55W10pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gdjtcbiAgICB0aGlzLmlubmVyT3B0aW9ucyA9IHY7XG4gIH1cbiAgZ2V0IG9wdGlvbnMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB9XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSB2YWx1ZUZuOiBWYWx1ZUZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIHZhbHVlQXR0cjogc3RyaW5nO1xuXG4gIC8vIEV2ZW50c1xuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PigpO1xuXG4gIC8vIFZpZXcgZWxlbWVudHNcbiAgQFZpZXdDaGlsZCgndGVybUlucHV0JykgdGVybUlucHV0O1xuXG4gIC8vIHByaXZhdGUgZGF0YTtcbiAgcHJpdmF0ZSBvcHRpb25zJFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX29wdGlvbnM6IGFueVtdO1xuXG4gIGlubmVyT3B0aW9uczogYW55W10gPSBbXTtcblxuICBwcml2YXRlIGZpbHRlcmVkT3B0aW9uczogYW55W10gPSBbXTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIHNlcnZpY2U6IERlY0FwaVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5jcmVhdGVJbnB1dCgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZGV0ZWN0UmVxdWlyZWREYXRhKClcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpYmVUb1NlYXJjaEFuZFNldE9wdGlvbnNPYnNlcnZhYmxlKCk7XG4gICAgICB0aGlzLnN1YnNjcmliZVRvT3B0aW9ucygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZVRvT3B0aW9ucygpO1xuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBWQUxVRVxuICAqL1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5zZXRJbm5lclZhbHVlKHYpO1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2OiBhbnkpIHtcbiAgICB0aGlzLndyaXR0ZW5WYWx1ZSA9IHY7XG4gICAgdiA9IHYgPyB2IDogdW5kZWZpbmVkOyAvLyBhdm9pZCBudWxsIHZhbHVlc1xuICAgIGNvbnN0IGhhc0RpZmZlcmVuY2UgPSAhdGhpcy5jb21wYXJlQXNTdHJpbmcodiwgdGhpcy52YWx1ZSk7XG4gICAgaWYgKGhhc0RpZmZlcmVuY2UpIHtcbiAgICAgIHRoaXMubG9hZFJlbW90ZU9iamVjdEJ5V3JpdHRlblZhbHVlKHYpXG4gICAgICAudGhlbigob3B0aW9ucykgPT4ge1xuICAgICAgICB0aGlzLnNldElubmVyVmFsdWUodik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbk9wdGlvblNlbGVjdGVkKCRldmVudCkge1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gJGV2ZW50Lm9wdGlvbi52YWx1ZTtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvblZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoc2VsZWN0ZWRPcHRpb24pO1xuICAgIGlmIChzZWxlY3RlZE9wdGlvblZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gc2VsZWN0ZWRPcHRpb25WYWx1ZTtcbiAgICAgIHRoaXMub3B0aW9uU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICBvcHRpb246IHNlbGVjdGVkT3B0aW9uLFxuICAgICAgICBvcHRpb25zOiB0aGlzLmlubmVyT3B0aW9ucyxcbiAgICAgICAgZmlsdGVyZWRPcHRpb25zOiB0aGlzLmZpbHRlcmVkT3B0aW9ucyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldEZvY3VzKCkge1xuICAgIHRoaXMudGVybUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIG9wZW5QYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIub3BlblBhbmVsKCk7XG4gIH1cblxuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlVHJpZ2dlci5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBvbkJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY2xlYXIocmVvcGVuID0gZmFsc2UpIHtcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuc2V0VmFsdWUoJycpO1xuICAgIGlmICh0aGlzLndyaXR0ZW5WYWx1ZSA9PT0gdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5yZXNldElucHV0Q29udHJvbCgpO1xuICAgIH1cbiAgICBpZiAocmVvcGVuKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH0sIDEpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLndyaXR0ZW5WYWx1ZTtcbiAgICB0aGlzLnNldElubmVyVmFsdWUodGhpcy53cml0dGVuVmFsdWUpO1xuICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgfVxuXG4gIGV4dHJhY3RMYWJlbDogTGFiZWxGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIGxldCBsYWJlbCA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyBsYWJlbCBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMubGFiZWxGbikgeyAvLyBVc2UgY3VzdG9tIGxhYmVsIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIGxhYmVsID0gdGhpcy5sYWJlbEZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxhYmVsQXR0cikgeyAvLyBVc2Ugb2JqZWN0IGxhYmVsIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IGl0ZW1bdGhpcy5sYWJlbEF0dHJdIHx8IHVuZGVmaW5lZDtcblxuICAgICAgfVxuICAgIH1cbiAgICBsYWJlbCA9IHRoaXMuZW5zdXJlU3RyaW5nKGxhYmVsKTtcbiAgICByZXR1cm4gbGFiZWw7XG4gIH1cblxuICBwcml2YXRlIGxvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZSh3cml0dGVuVmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHdyaXR0ZW5WYWx1ZSkge1xuICAgICAgICB0aGlzLnNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHdyaXR0ZW5WYWx1ZSlcbiAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh3cml0dGVuVmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUod3JpdHRlblZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0UmVxdWlyZWREYXRhKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBlcnJvcjogc3RyaW5nO1xuICAgICAgaWYgKCF0aGlzLmVuZHBvaW50ICYmICF0aGlzLm9wdGlvbnMgJiYgIXRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbikge1xuICAgICAgICBlcnJvciA9ICdObyBlbmRwb2ludCB8IG9wdGlvbnMgfCBjdXN0b21GZXRjaEZ1bmN0aW9uIHNldC4gWW91IG11c3QgcHJvdmlkZSBvbmUgb2YgdGhlbSB0byBiZSBhYmxlIHRvIHVzZSB0aGUgQXV0b2NvbXBsZXRlJztcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICB0aGlzLnJhaXNlRXJyb3IoZXJyb3IpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldElucHV0Q29udHJvbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5tYXJrQXNVbnRvdWNoZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdFZhbHVlOiBWYWx1ZUZ1bmN0aW9uID0gKGl0ZW06IGFueSk6IGFueSA9PiB7XG4gICAgbGV0IHZhbHVlID0gaXRlbTsgLy8gdXNlIHRoZSBvYmplY3QgaXRzZWxmIGlmIG5vIHZhbHVlIGZ1bmN0aW9uIG9yIGF0dHJpYnV0ZSBpcyBwcm92aWRlZFxuICAgIGlmIChpdGVtKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZUZuKSB7IC8vIFVzZSBjdXN0b20gdmFsdWUgZnVuY3Rpb24gaWYgcHJvdmlkZWRcbiAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlRm4oaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWVBdHRyKSB7IC8vIFVzZSBvYmplY3QgdmFsdWUgYXR0cmlidXRlIGlmIHByb3ZpZGVkXG4gICAgICAgIHZhbHVlID0gaXRlbVt0aGlzLnZhbHVlQXR0cl0gfHwgdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGNvbXBhcmVBc1N0cmluZyh2MSwgdjIpIHtcbiAgICBjb25zdCBzdHJpbmcxID0gdGhpcy5lbnN1cmVTdHJpbmcodjEpO1xuICAgIGNvbnN0IHN0cmluZzIgPSB0aGlzLmVuc3VyZVN0cmluZyh2Mik7XG4gICAgcmV0dXJuIHN0cmluZzEgPT09IHN0cmluZzI7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVN0cmluZyh2KSB7XG4gICAgaWYgKHR5cGVvZiB2ICE9PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGlzTmFOKHYpKSB7XG4gICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHYgPSBgJHt2fWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb09wdGlvbnMoKSB7XG4gICAgdGhpcy5vcHRpb25zJFN1YnNjcmlwdGlvbiA9IHRoaXMub3B0aW9ucyQuc3Vic2NyaWJlKG9wdGlvbnMgPT4ge1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbm5lclZhbHVlKHY6IGFueSkge1xuICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlQmFzZWRPbklubmVyVmFsdWUodik7XG4gIH1cblxuICBwcml2YXRlIHNldElucHV0VmFsdWVCYXNlZE9uSW5uZXJWYWx1ZSh2OiBhbnkpIHtcbiAgICBjb25zdCBvcHRpb24gPSB0aGlzLmdldE9wdGlvbkJhc2VkT25WYWx1ZSh2KTtcbiAgICBjb25zdCBsYWJlbCA9IHRoaXMuZXh0cmFjdExhYmVsKG9wdGlvbik7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5zZXRWYWx1ZShvcHRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcHRpb25CYXNlZE9uVmFsdWUodjogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJPcHRpb25zLmZpbmQoaXRlbSA9PiB7XG4gICAgICBjb25zdCBpdGVtVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShpdGVtKTtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBc1N0cmluZyhpdGVtVmFsdWUsIHYpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbnB1dCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0ID0gdGhpcy5mb3JtQnVpbGRlci5jb250cm9sKHt2YWx1ZTogdW5kZWZpbmVkLCBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCwgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWR9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9TZWFyY2hBbmRTZXRPcHRpb25zT2JzZXJ2YWJsZSgpIHtcbiAgICB0aGlzLm9wdGlvbnMkID0gdGhpcy5hdXRvY29tcGxldGVJbnB1dC52YWx1ZUNoYW5nZXNcbiAgICAucGlwZShcbiAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBzd2l0Y2hNYXAoKHRleHRTZWFyY2g6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBpc1N0cmluZ1Rlcm0gPSB0eXBlb2YgdGV4dFNlYXJjaCA9PT0gJ3N0cmluZyc7XG4gICAgICAgIGlmIChpc1N0cmluZ1Rlcm0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh0ZXh0U2VhcmNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2YodGhpcy5pbm5lck9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHRleHRTZWFyY2gpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoSW5Mb2NhbE9wdGlvbnModGV4dFNlYXJjaCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24odGV4dFNlYXJjaClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKG9wdGlvbnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJvZHkgPSB0ZXh0U2VhcmNoID8geyB0ZXh0U2VhcmNoIH0gOiB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldDxhbnlbXT4odGhpcy5lbmRwb2ludCwgYm9keSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKChvcHRpb25zOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvT3B0aW9ucygpIHtcbiAgICB0aGlzLm9wdGlvbnMkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaEluTG9jYWxPcHRpb25zKHRlcm06IHN0cmluZykge1xuICAgIGNvbnN0IHRlcm1TdHJpbmcgPSBgJHt0ZXJtfWA7XG5cbiAgICBsZXQgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnM7XG5cbiAgICBpZiAodGVybVN0cmluZykge1xuICAgICAgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnNcbiAgICAgIC5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsOiBzdHJpbmcgPSB0aGlzLmV4dHJhY3RMYWJlbChpdGVtKTtcbiAgICAgICAgY29uc3QgbG93ZXJDYXNlTGFiZWwgPSBsYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBsb3dlckNhc2VUZXJtID0gdGVybVN0cmluZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbG93ZXJDYXNlTGFiZWwuc2VhcmNoKGxvd2VyQ2FzZVRlcm0pID49IDA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2YoZmlsdGVyZWREYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgcmFpc2VFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgRXJyb3I6OiBUaGUgYXV0b2NvbXBsZXRlIHdpdGggbmFtZSBcIiR7dGhpcy5uYW1lfVwiIGhhZCB0aGUgZm9sbG93IHByb2JsZW06ICR7ZXJyb3J9YCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtYWNjb3VudCcsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bY3VzdG9tRmV0Y2hGdW5jdGlvbl09XCJjdXN0b21GZXRjaEZ1bmN0aW9uXCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludCA9ICdhY2NvdW50cy9vcHRpb25zJztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIHR5cGVzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0FjY291bnQgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdBY2NvdW50IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlXG4gICkge31cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY3VzdG9tRmV0Y2hGdW5jdGlvbiA9ICh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwcyA9IFtcbiAgICAgIHtcbiAgICAgICAgZmlsdGVyczogW1xuICAgICAgICAgIHsgcHJvcGVydHk6ICduYW1lJywgdmFsdWU6IHRleHRTZWFyY2ggfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXTtcblxuICAgIGlmICh0aGlzLnR5cGVzKSB7XG5cbiAgICAgIGZpbHRlckdyb3Vwc1swXS5maWx0ZXJzLnB1c2goeyBwcm9wZXJ0eTogJ3JvbGUuJGlkJywgdmFsdWU6IHRoaXMudHlwZXMgfSk7XG5cbiAgICB9XG5cblxuICAgIHJldHVybiB0aGlzLmRlY29yYUFwaS5nZXQodGhpcy5lbmRwb2ludCwgeyBmaWx0ZXJHcm91cHMgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLWFjY291bnQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZUFjY291bnRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQWNjb3VudE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0NPTVBBTllfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlQ29tcGFueUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLWNvbXBhbnknLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlXG5bZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbltuYW1lXT1cIm5hbWVcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuW2VuZHBvaW50XT1cImVuZHBvaW50XCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsRm5dPVwibGFiZWxGblwiXG5bdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9DT01QQU5ZX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgZW5kcG9pbnQgPSAnY29tcGFuaWVzL29wdGlvbnMnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnQ29tcGFueSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0NvbXBhbnkgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIGxhYmVsRm4oY29tcGFueSkge1xuICAgIHJldHVybiBgJHtjb21wYW55LnZhbHVlfSAjJHtjb21wYW55LmtleX1gO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtY29tcGFueS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlQ29tcGFueUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb21wYW55TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0NPVU5UUllfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlQ291bnRyeUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLWNvdW50cnknLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlXG5bZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbltuYW1lXT1cIm5hbWVcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuW29wdGlvbnNdPVwiKGNvdW50cmllcyQgfCBhc3luYylcIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bbGFiZWxGbl09XCJsYWJlbEZuXCJcblt2YWx1ZUZuXT1cInZhbHVlRm5cIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfQ09VTlRSWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGNvdW50cmllcyQ6IE9ic2VydmFibGU8YW55PjtcblxuICBASW5wdXQoKSBsYW5nOiAnZW4nIHwgJ3B0LWJyJyA9ICdlbic7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdDb3VudHJ5IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnQ291bnRyeSBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvdW50cmllcyQgPSBvZihGQUtFX0RBVEEpO1xuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGxhYmVsRm4gPSAoaXRlbSkgPT4ge1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5uYW1lIDogaXRlbTtcbiAgfVxuXG4gIHZhbHVlRm4gPSAoaXRlbSkgPT4ge1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5jb2RlIDogaXRlbTtcbiAgfVxuXG59XG5cbmNvbnN0IEZBS0VfREFUQSA9IFt7ICdjb2RlJzogJ0FEJywgJ25hbWUnOiAnQW5kb3JyYScgfSwgeyAnY29kZSc6ICdBRScsICduYW1lJzogJ1VuaXRlZCBBcmFiIEVtaXJhdGVzJyB9LCB7ICdjb2RlJzogJ0FGJywgJ25hbWUnOiAnQWZnaGFuaXN0YW4nIH0sIHsgJ2NvZGUnOiAnQUcnLCAnbmFtZSc6ICdBbnRpZ3VhIGFuZCBCYXJidWRhJyB9LCB7ICdjb2RlJzogJ0FJJywgJ25hbWUnOiAnQW5ndWlsbGEnIH0sIHsgJ2NvZGUnOiAnQUwnLCAnbmFtZSc6ICdBbGJhbmlhJyB9LCB7ICdjb2RlJzogJ0FNJywgJ25hbWUnOiAnQXJtZW5pYScgfSwgeyAnY29kZSc6ICdBTicsICduYW1lJzogJ05ldGhlcmxhbmRzIEFudGlsbGVzJyB9LCB7ICdjb2RlJzogJ0FPJywgJ25hbWUnOiAnQW5nb2xhJyB9LCB7ICdjb2RlJzogJ0FRJywgJ25hbWUnOiAnQW50YXJjdGljYScgfSwgeyAnY29kZSc6ICdBUicsICduYW1lJzogJ0FyZ2VudGluYScgfSwgeyAnY29kZSc6ICdBUycsICduYW1lJzogJ0FtZXJpY2FuIFNhbW9hJyB9LCB7ICdjb2RlJzogJ0FUJywgJ25hbWUnOiAnQXVzdHJpYScgfSwgeyAnY29kZSc6ICdBVScsICduYW1lJzogJ0F1c3RyYWxpYScgfSwgeyAnY29kZSc6ICdBVycsICduYW1lJzogJ0FydWJhJyB9LCB7ICdjb2RlJzogJ0FYJywgJ25hbWUnOiAnw4PChWxhbmQgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdBWicsICduYW1lJzogJ0F6ZXJiYWlqYW4nIH0sIHsgJ2NvZGUnOiAnQkEnLCAnbmFtZSc6ICdCb3NuaWEgYW5kIEhlcnplZ292aW5hJyB9LCB7ICdjb2RlJzogJ0JCJywgJ25hbWUnOiAnQmFyYmFkb3MnIH0sIHsgJ2NvZGUnOiAnQkQnLCAnbmFtZSc6ICdCYW5nbGFkZXNoJyB9LCB7ICdjb2RlJzogJ0JFJywgJ25hbWUnOiAnQmVsZ2l1bScgfSwgeyAnY29kZSc6ICdCRicsICduYW1lJzogJ0J1cmtpbmEgRmFzbycgfSwgeyAnY29kZSc6ICdCRycsICduYW1lJzogJ0J1bGdhcmlhJyB9LCB7ICdjb2RlJzogJ0JIJywgJ25hbWUnOiAnQmFocmFpbicgfSwgeyAnY29kZSc6ICdCSScsICduYW1lJzogJ0J1cnVuZGknIH0sIHsgJ2NvZGUnOiAnQkonLCAnbmFtZSc6ICdCZW5pbicgfSwgeyAnY29kZSc6ICdCTCcsICduYW1lJzogJ1NhaW50IEJhcnRow4PCqWxlbXknIH0sIHsgJ2NvZGUnOiAnQk0nLCAnbmFtZSc6ICdCZXJtdWRhJyB9LCB7ICdjb2RlJzogJ0JOJywgJ25hbWUnOiAnQnJ1bmVpJyB9LCB7ICdjb2RlJzogJ0JPJywgJ25hbWUnOiAnQm9saXZpYScgfSwgeyAnY29kZSc6ICdCUScsICduYW1lJzogJ0JvbmFpcmUsIFNpbnQgRXVzdGF0aXVzIGFuZCBTYWJhJyB9LCB7ICdjb2RlJzogJ0JSJywgJ25hbWUnOiAnQnJhemlsJyB9LCB7ICdjb2RlJzogJ0JTJywgJ25hbWUnOiAnQmFoYW1hcycgfSwgeyAnY29kZSc6ICdCVCcsICduYW1lJzogJ0JodXRhbicgfSwgeyAnY29kZSc6ICdCVicsICduYW1lJzogJ0JvdXZldCBJc2xhbmQnIH0sIHsgJ2NvZGUnOiAnQlcnLCAnbmFtZSc6ICdCb3Rzd2FuYScgfSwgeyAnY29kZSc6ICdCWScsICduYW1lJzogJ0JlbGFydXMnIH0sIHsgJ2NvZGUnOiAnQlonLCAnbmFtZSc6ICdCZWxpemUnIH0sIHsgJ2NvZGUnOiAnQ0EnLCAnbmFtZSc6ICdDYW5hZGEnIH0sIHsgJ2NvZGUnOiAnQ0MnLCAnbmFtZSc6ICdDb2NvcyBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0NEJywgJ25hbWUnOiAnVGhlIERlbW9jcmF0aWMgUmVwdWJsaWMgT2YgQ29uZ28nIH0sIHsgJ2NvZGUnOiAnQ0YnLCAnbmFtZSc6ICdDZW50cmFsIEFmcmljYW4gUmVwdWJsaWMnIH0sIHsgJ2NvZGUnOiAnQ0cnLCAnbmFtZSc6ICdDb25nbycgfSwgeyAnY29kZSc6ICdDSCcsICduYW1lJzogJ1N3aXR6ZXJsYW5kJyB9LCB7ICdjb2RlJzogJ0NJJywgJ25hbWUnOiAnQ8ODwrR0ZSBkXFwnSXZvaXJlJyB9LCB7ICdjb2RlJzogJ0NLJywgJ25hbWUnOiAnQ29vayBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0NMJywgJ25hbWUnOiAnQ2hpbGUnIH0sIHsgJ2NvZGUnOiAnQ00nLCAnbmFtZSc6ICdDYW1lcm9vbicgfSwgeyAnY29kZSc6ICdDTicsICduYW1lJzogJ0NoaW5hJyB9LCB7ICdjb2RlJzogJ0NPJywgJ25hbWUnOiAnQ29sb21iaWEnIH0sIHsgJ2NvZGUnOiAnQ1InLCAnbmFtZSc6ICdDb3N0YSBSaWNhJyB9LCB7ICdjb2RlJzogJ0NVJywgJ25hbWUnOiAnQ3ViYScgfSwgeyAnY29kZSc6ICdDVicsICduYW1lJzogJ0NhcGUgVmVyZGUnIH0sIHsgJ2NvZGUnOiAnQ1cnLCAnbmFtZSc6ICdDdXJhw4PCp2FvJyB9LCB7ICdjb2RlJzogJ0NYJywgJ25hbWUnOiAnQ2hyaXN0bWFzIElzbGFuZCcgfSwgeyAnY29kZSc6ICdDWScsICduYW1lJzogJ0N5cHJ1cycgfSwgeyAnY29kZSc6ICdDWicsICduYW1lJzogJ0N6ZWNoIFJlcHVibGljJyB9LCB7ICdjb2RlJzogJ0RFJywgJ25hbWUnOiAnR2VybWFueScgfSwgeyAnY29kZSc6ICdESicsICduYW1lJzogJ0RqaWJvdXRpJyB9LCB7ICdjb2RlJzogJ0RLJywgJ25hbWUnOiAnRGVubWFyaycgfSwgeyAnY29kZSc6ICdETScsICduYW1lJzogJ0RvbWluaWNhJyB9LCB7ICdjb2RlJzogJ0RPJywgJ25hbWUnOiAnRG9taW5pY2FuIFJlcHVibGljJyB9LCB7ICdjb2RlJzogJ0RaJywgJ25hbWUnOiAnQWxnZXJpYScgfSwgeyAnY29kZSc6ICdFQycsICduYW1lJzogJ0VjdWFkb3InIH0sIHsgJ2NvZGUnOiAnRUUnLCAnbmFtZSc6ICdFc3RvbmlhJyB9LCB7ICdjb2RlJzogJ0VHJywgJ25hbWUnOiAnRWd5cHQnIH0sIHsgJ2NvZGUnOiAnRUgnLCAnbmFtZSc6ICdXZXN0ZXJuIFNhaGFyYScgfSwgeyAnY29kZSc6ICdFUicsICduYW1lJzogJ0VyaXRyZWEnIH0sIHsgJ2NvZGUnOiAnRVMnLCAnbmFtZSc6ICdTcGFpbicgfSwgeyAnY29kZSc6ICdFVCcsICduYW1lJzogJ0V0aGlvcGlhJyB9LCB7ICdjb2RlJzogJ0ZJJywgJ25hbWUnOiAnRmlubGFuZCcgfSwgeyAnY29kZSc6ICdGSicsICduYW1lJzogJ0ZpamknIH0sIHsgJ2NvZGUnOiAnRksnLCAnbmFtZSc6ICdGYWxrbGFuZCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0ZNJywgJ25hbWUnOiAnTWljcm9uZXNpYScgfSwgeyAnY29kZSc6ICdGTycsICduYW1lJzogJ0Zhcm9lIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnRlInLCAnbmFtZSc6ICdGcmFuY2UnIH0sIHsgJ2NvZGUnOiAnR0EnLCAnbmFtZSc6ICdHYWJvbicgfSwgeyAnY29kZSc6ICdHQicsICduYW1lJzogJ1VuaXRlZCBLaW5nZG9tJyB9LCB7ICdjb2RlJzogJ0dEJywgJ25hbWUnOiAnR3JlbmFkYScgfSwgeyAnY29kZSc6ICdHRScsICduYW1lJzogJ0dlb3JnaWEnIH0sIHsgJ2NvZGUnOiAnR0YnLCAnbmFtZSc6ICdGcmVuY2ggR3VpYW5hJyB9LCB7ICdjb2RlJzogJ0dHJywgJ25hbWUnOiAnR3Vlcm5zZXknIH0sIHsgJ2NvZGUnOiAnR0gnLCAnbmFtZSc6ICdHaGFuYScgfSwgeyAnY29kZSc6ICdHSScsICduYW1lJzogJ0dpYnJhbHRhcicgfSwgeyAnY29kZSc6ICdHTCcsICduYW1lJzogJ0dyZWVubGFuZCcgfSwgeyAnY29kZSc6ICdHTScsICduYW1lJzogJ0dhbWJpYScgfSwgeyAnY29kZSc6ICdHTicsICduYW1lJzogJ0d1aW5lYScgfSwgeyAnY29kZSc6ICdHUCcsICduYW1lJzogJ0d1YWRlbG91cGUnIH0sIHsgJ2NvZGUnOiAnR1EnLCAnbmFtZSc6ICdFcXVhdG9yaWFsIEd1aW5lYScgfSwgeyAnY29kZSc6ICdHUicsICduYW1lJzogJ0dyZWVjZScgfSwgeyAnY29kZSc6ICdHUycsICduYW1lJzogJ1NvdXRoIEdlb3JnaWEgQW5kIFRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0dUJywgJ25hbWUnOiAnR3VhdGVtYWxhJyB9LCB7ICdjb2RlJzogJ0dVJywgJ25hbWUnOiAnR3VhbScgfSwgeyAnY29kZSc6ICdHVycsICduYW1lJzogJ0d1aW5lYS1CaXNzYXUnIH0sIHsgJ2NvZGUnOiAnR1knLCAnbmFtZSc6ICdHdXlhbmEnIH0sIHsgJ2NvZGUnOiAnSEsnLCAnbmFtZSc6ICdIb25nIEtvbmcnIH0sIHsgJ2NvZGUnOiAnSE0nLCAnbmFtZSc6ICdIZWFyZCBJc2xhbmQgQW5kIE1jRG9uYWxkIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnSE4nLCAnbmFtZSc6ICdIb25kdXJhcycgfSwgeyAnY29kZSc6ICdIUicsICduYW1lJzogJ0Nyb2F0aWEnIH0sIHsgJ2NvZGUnOiAnSFQnLCAnbmFtZSc6ICdIYWl0aScgfSwgeyAnY29kZSc6ICdIVScsICduYW1lJzogJ0h1bmdhcnknIH0sIHsgJ2NvZGUnOiAnSUQnLCAnbmFtZSc6ICdJbmRvbmVzaWEnIH0sIHsgJ2NvZGUnOiAnSUUnLCAnbmFtZSc6ICdJcmVsYW5kJyB9LCB7ICdjb2RlJzogJ0lMJywgJ25hbWUnOiAnSXNyYWVsJyB9LCB7ICdjb2RlJzogJ0lNJywgJ25hbWUnOiAnSXNsZSBPZiBNYW4nIH0sIHsgJ2NvZGUnOiAnSU4nLCAnbmFtZSc6ICdJbmRpYScgfSwgeyAnY29kZSc6ICdJTycsICduYW1lJzogJ0JyaXRpc2ggSW5kaWFuIE9jZWFuIFRlcnJpdG9yeScgfSwgeyAnY29kZSc6ICdJUScsICduYW1lJzogJ0lyYXEnIH0sIHsgJ2NvZGUnOiAnSVInLCAnbmFtZSc6ICdJcmFuJyB9LCB7ICdjb2RlJzogJ0lTJywgJ25hbWUnOiAnSWNlbGFuZCcgfSwgeyAnY29kZSc6ICdJVCcsICduYW1lJzogJ0l0YWx5JyB9LCB7ICdjb2RlJzogJ0pFJywgJ25hbWUnOiAnSmVyc2V5JyB9LCB7ICdjb2RlJzogJ0pNJywgJ25hbWUnOiAnSmFtYWljYScgfSwgeyAnY29kZSc6ICdKTycsICduYW1lJzogJ0pvcmRhbicgfSwgeyAnY29kZSc6ICdKUCcsICduYW1lJzogJ0phcGFuJyB9LCB7ICdjb2RlJzogJ0tFJywgJ25hbWUnOiAnS2VueWEnIH0sIHsgJ2NvZGUnOiAnS0cnLCAnbmFtZSc6ICdLeXJneXpzdGFuJyB9LCB7ICdjb2RlJzogJ0tIJywgJ25hbWUnOiAnQ2FtYm9kaWEnIH0sIHsgJ2NvZGUnOiAnS0knLCAnbmFtZSc6ICdLaXJpYmF0aScgfSwgeyAnY29kZSc6ICdLTScsICduYW1lJzogJ0NvbW9yb3MnIH0sIHsgJ2NvZGUnOiAnS04nLCAnbmFtZSc6ICdTYWludCBLaXR0cyBBbmQgTmV2aXMnIH0sIHsgJ2NvZGUnOiAnS1AnLCAnbmFtZSc6ICdOb3J0aCBLb3JlYScgfSwgeyAnY29kZSc6ICdLUicsICduYW1lJzogJ1NvdXRoIEtvcmVhJyB9LCB7ICdjb2RlJzogJ0tXJywgJ25hbWUnOiAnS3V3YWl0JyB9LCB7ICdjb2RlJzogJ0tZJywgJ25hbWUnOiAnQ2F5bWFuIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnS1onLCAnbmFtZSc6ICdLYXpha2hzdGFuJyB9LCB7ICdjb2RlJzogJ0xBJywgJ25hbWUnOiAnTGFvcycgfSwgeyAnY29kZSc6ICdMQicsICduYW1lJzogJ0xlYmFub24nIH0sIHsgJ2NvZGUnOiAnTEMnLCAnbmFtZSc6ICdTYWludCBMdWNpYScgfSwgeyAnY29kZSc6ICdMSScsICduYW1lJzogJ0xpZWNodGVuc3RlaW4nIH0sIHsgJ2NvZGUnOiAnTEsnLCAnbmFtZSc6ICdTcmkgTGFua2EnIH0sIHsgJ2NvZGUnOiAnTFInLCAnbmFtZSc6ICdMaWJlcmlhJyB9LCB7ICdjb2RlJzogJ0xTJywgJ25hbWUnOiAnTGVzb3RobycgfSwgeyAnY29kZSc6ICdMVCcsICduYW1lJzogJ0xpdGh1YW5pYScgfSwgeyAnY29kZSc6ICdMVScsICduYW1lJzogJ0x1eGVtYm91cmcnIH0sIHsgJ2NvZGUnOiAnTFYnLCAnbmFtZSc6ICdMYXR2aWEnIH0sIHsgJ2NvZGUnOiAnTFknLCAnbmFtZSc6ICdMaWJ5YScgfSwgeyAnY29kZSc6ICdNQScsICduYW1lJzogJ01vcm9jY28nIH0sIHsgJ2NvZGUnOiAnTUMnLCAnbmFtZSc6ICdNb25hY28nIH0sIHsgJ2NvZGUnOiAnTUQnLCAnbmFtZSc6ICdNb2xkb3ZhJyB9LCB7ICdjb2RlJzogJ01FJywgJ25hbWUnOiAnTW9udGVuZWdybycgfSwgeyAnY29kZSc6ICdNRicsICduYW1lJzogJ1NhaW50IE1hcnRpbicgfSwgeyAnY29kZSc6ICdNRycsICduYW1lJzogJ01hZGFnYXNjYXInIH0sIHsgJ2NvZGUnOiAnTUgnLCAnbmFtZSc6ICdNYXJzaGFsbCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ01LJywgJ25hbWUnOiAnTWFjZWRvbmlhJyB9LCB7ICdjb2RlJzogJ01MJywgJ25hbWUnOiAnTWFsaScgfSwgeyAnY29kZSc6ICdNTScsICduYW1lJzogJ015YW5tYXInIH0sIHsgJ2NvZGUnOiAnTU4nLCAnbmFtZSc6ICdNb25nb2xpYScgfSwgeyAnY29kZSc6ICdNTycsICduYW1lJzogJ01hY2FvJyB9LCB7ICdjb2RlJzogJ01QJywgJ25hbWUnOiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ01RJywgJ25hbWUnOiAnTWFydGluaXF1ZScgfSwgeyAnY29kZSc6ICdNUicsICduYW1lJzogJ01hdXJpdGFuaWEnIH0sIHsgJ2NvZGUnOiAnTVMnLCAnbmFtZSc6ICdNb250c2VycmF0JyB9LCB7ICdjb2RlJzogJ01UJywgJ25hbWUnOiAnTWFsdGEnIH0sIHsgJ2NvZGUnOiAnTVUnLCAnbmFtZSc6ICdNYXVyaXRpdXMnIH0sIHsgJ2NvZGUnOiAnTVYnLCAnbmFtZSc6ICdNYWxkaXZlcycgfSwgeyAnY29kZSc6ICdNVycsICduYW1lJzogJ01hbGF3aScgfSwgeyAnY29kZSc6ICdNWCcsICduYW1lJzogJ01leGljbycgfSwgeyAnY29kZSc6ICdNWScsICduYW1lJzogJ01hbGF5c2lhJyB9LCB7ICdjb2RlJzogJ01aJywgJ25hbWUnOiAnTW96YW1iaXF1ZScgfSwgeyAnY29kZSc6ICdOQScsICduYW1lJzogJ05hbWliaWEnIH0sIHsgJ2NvZGUnOiAnTkMnLCAnbmFtZSc6ICdOZXcgQ2FsZWRvbmlhJyB9LCB7ICdjb2RlJzogJ05FJywgJ25hbWUnOiAnTmlnZXInIH0sIHsgJ2NvZGUnOiAnTkYnLCAnbmFtZSc6ICdOb3Jmb2xrIElzbGFuZCcgfSwgeyAnY29kZSc6ICdORycsICduYW1lJzogJ05pZ2VyaWEnIH0sIHsgJ2NvZGUnOiAnTkknLCAnbmFtZSc6ICdOaWNhcmFndWEnIH0sIHsgJ2NvZGUnOiAnTkwnLCAnbmFtZSc6ICdOZXRoZXJsYW5kcycgfSwgeyAnY29kZSc6ICdOTycsICduYW1lJzogJ05vcndheScgfSwgeyAnY29kZSc6ICdOUCcsICduYW1lJzogJ05lcGFsJyB9LCB7ICdjb2RlJzogJ05SJywgJ25hbWUnOiAnTmF1cnUnIH0sIHsgJ2NvZGUnOiAnTlUnLCAnbmFtZSc6ICdOaXVlJyB9LCB7ICdjb2RlJzogJ05aJywgJ25hbWUnOiAnTmV3IFplYWxhbmQnIH0sIHsgJ2NvZGUnOiAnT00nLCAnbmFtZSc6ICdPbWFuJyB9LCB7ICdjb2RlJzogJ1BBJywgJ25hbWUnOiAnUGFuYW1hJyB9LCB7ICdjb2RlJzogJ1BFJywgJ25hbWUnOiAnUGVydScgfSwgeyAnY29kZSc6ICdQRicsICduYW1lJzogJ0ZyZW5jaCBQb2x5bmVzaWEnIH0sIHsgJ2NvZGUnOiAnUEcnLCAnbmFtZSc6ICdQYXB1YSBOZXcgR3VpbmVhJyB9LCB7ICdjb2RlJzogJ1BIJywgJ25hbWUnOiAnUGhpbGlwcGluZXMnIH0sIHsgJ2NvZGUnOiAnUEsnLCAnbmFtZSc6ICdQYWtpc3RhbicgfSwgeyAnY29kZSc6ICdQTCcsICduYW1lJzogJ1BvbGFuZCcgfSwgeyAnY29kZSc6ICdQTScsICduYW1lJzogJ1NhaW50IFBpZXJyZSBBbmQgTWlxdWVsb24nIH0sIHsgJ2NvZGUnOiAnUE4nLCAnbmFtZSc6ICdQaXRjYWlybicgfSwgeyAnY29kZSc6ICdQUicsICduYW1lJzogJ1B1ZXJ0byBSaWNvJyB9LCB7ICdjb2RlJzogJ1BTJywgJ25hbWUnOiAnUGFsZXN0aW5lJyB9LCB7ICdjb2RlJzogJ1BUJywgJ25hbWUnOiAnUG9ydHVnYWwnIH0sIHsgJ2NvZGUnOiAnUFcnLCAnbmFtZSc6ICdQYWxhdScgfSwgeyAnY29kZSc6ICdQWScsICduYW1lJzogJ1BhcmFndWF5JyB9LCB7ICdjb2RlJzogJ1FBJywgJ25hbWUnOiAnUWF0YXInIH0sIHsgJ2NvZGUnOiAnUkUnLCAnbmFtZSc6ICdSZXVuaW9uJyB9LCB7ICdjb2RlJzogJ1JPJywgJ25hbWUnOiAnUm9tYW5pYScgfSwgeyAnY29kZSc6ICdSUycsICduYW1lJzogJ1NlcmJpYScgfSwgeyAnY29kZSc6ICdSVScsICduYW1lJzogJ1J1c3NpYScgfSwgeyAnY29kZSc6ICdSVycsICduYW1lJzogJ1J3YW5kYScgfSwgeyAnY29kZSc6ICdTQScsICduYW1lJzogJ1NhdWRpIEFyYWJpYScgfSwgeyAnY29kZSc6ICdTQicsICduYW1lJzogJ1NvbG9tb24gSXNsYW5kcycgfSwgeyAnY29kZSc6ICdTQycsICduYW1lJzogJ1NleWNoZWxsZXMnIH0sIHsgJ2NvZGUnOiAnU0QnLCAnbmFtZSc6ICdTdWRhbicgfSwgeyAnY29kZSc6ICdTRScsICduYW1lJzogJ1N3ZWRlbicgfSwgeyAnY29kZSc6ICdTRycsICduYW1lJzogJ1NpbmdhcG9yZScgfSwgeyAnY29kZSc6ICdTSCcsICduYW1lJzogJ1NhaW50IEhlbGVuYScgfSwgeyAnY29kZSc6ICdTSScsICduYW1lJzogJ1Nsb3ZlbmlhJyB9LCB7ICdjb2RlJzogJ1NKJywgJ25hbWUnOiAnU3ZhbGJhcmQgQW5kIEphbiBNYXllbicgfSwgeyAnY29kZSc6ICdTSycsICduYW1lJzogJ1Nsb3Zha2lhJyB9LCB7ICdjb2RlJzogJ1NMJywgJ25hbWUnOiAnU2llcnJhIExlb25lJyB9LCB7ICdjb2RlJzogJ1NNJywgJ25hbWUnOiAnU2FuIE1hcmlubycgfSwgeyAnY29kZSc6ICdTTicsICduYW1lJzogJ1NlbmVnYWwnIH0sIHsgJ2NvZGUnOiAnU08nLCAnbmFtZSc6ICdTb21hbGlhJyB9LCB7ICdjb2RlJzogJ1NSJywgJ25hbWUnOiAnU3VyaW5hbWUnIH0sIHsgJ2NvZGUnOiAnU1MnLCAnbmFtZSc6ICdTb3V0aCBTdWRhbicgfSwgeyAnY29kZSc6ICdTVCcsICduYW1lJzogJ1NhbyBUb21lIEFuZCBQcmluY2lwZScgfSwgeyAnY29kZSc6ICdTVicsICduYW1lJzogJ0VsIFNhbHZhZG9yJyB9LCB7ICdjb2RlJzogJ1NYJywgJ25hbWUnOiAnU2ludCBNYWFydGVuIChEdXRjaCBwYXJ0KScgfSwgeyAnY29kZSc6ICdTWScsICduYW1lJzogJ1N5cmlhJyB9LCB7ICdjb2RlJzogJ1NaJywgJ25hbWUnOiAnU3dhemlsYW5kJyB9LCB7ICdjb2RlJzogJ1RDJywgJ25hbWUnOiAnVHVya3MgQW5kIENhaWNvcyBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1REJywgJ25hbWUnOiAnQ2hhZCcgfSwgeyAnY29kZSc6ICdURicsICduYW1lJzogJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcycgfSwgeyAnY29kZSc6ICdURycsICduYW1lJzogJ1RvZ28nIH0sIHsgJ2NvZGUnOiAnVEgnLCAnbmFtZSc6ICdUaGFpbGFuZCcgfSwgeyAnY29kZSc6ICdUSicsICduYW1lJzogJ1RhamlraXN0YW4nIH0sIHsgJ2NvZGUnOiAnVEsnLCAnbmFtZSc6ICdUb2tlbGF1JyB9LCB7ICdjb2RlJzogJ1RMJywgJ25hbWUnOiAnVGltb3ItTGVzdGUnIH0sIHsgJ2NvZGUnOiAnVE0nLCAnbmFtZSc6ICdUdXJrbWVuaXN0YW4nIH0sIHsgJ2NvZGUnOiAnVE4nLCAnbmFtZSc6ICdUdW5pc2lhJyB9LCB7ICdjb2RlJzogJ1RPJywgJ25hbWUnOiAnVG9uZ2EnIH0sIHsgJ2NvZGUnOiAnVFInLCAnbmFtZSc6ICdUdXJrZXknIH0sIHsgJ2NvZGUnOiAnVFQnLCAnbmFtZSc6ICdUcmluaWRhZCBhbmQgVG9iYWdvJyB9LCB7ICdjb2RlJzogJ1RWJywgJ25hbWUnOiAnVHV2YWx1JyB9LCB7ICdjb2RlJzogJ1RXJywgJ25hbWUnOiAnVGFpd2FuJyB9LCB7ICdjb2RlJzogJ1RaJywgJ25hbWUnOiAnVGFuemFuaWEnIH0sIHsgJ2NvZGUnOiAnVUEnLCAnbmFtZSc6ICdVa3JhaW5lJyB9LCB7ICdjb2RlJzogJ1VHJywgJ25hbWUnOiAnVWdhbmRhJyB9LCB7ICdjb2RlJzogJ1VNJywgJ25hbWUnOiAnVW5pdGVkIFN0YXRlcyBNaW5vciBPdXRseWluZyBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1VZJywgJ25hbWUnOiAnVXJ1Z3VheScgfSwgeyAnY29kZSc6ICdVWicsICduYW1lJzogJ1V6YmVraXN0YW4nIH0sIHsgJ2NvZGUnOiAnVkEnLCAnbmFtZSc6ICdWYXRpY2FuJyB9LCB7ICdjb2RlJzogJ1ZDJywgJ25hbWUnOiAnU2FpbnQgVmluY2VudCBBbmQgVGhlIEdyZW5hZGluZXMnIH0sIHsgJ2NvZGUnOiAnVkUnLCAnbmFtZSc6ICdWZW5lenVlbGEnIH0sIHsgJ2NvZGUnOiAnVkcnLCAnbmFtZSc6ICdCcml0aXNoIFZpcmdpbiBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1ZJJywgJ25hbWUnOiAnVS5TLiBWaXJnaW4gSXNsYW5kcycgfSwgeyAnY29kZSc6ICdWTicsICduYW1lJzogJ1ZpZXRuYW0nIH0sIHsgJ2NvZGUnOiAnVlUnLCAnbmFtZSc6ICdWYW51YXR1JyB9LCB7ICdjb2RlJzogJ1dGJywgJ25hbWUnOiAnV2FsbGlzIEFuZCBGdXR1bmEnIH0sIHsgJ2NvZGUnOiAnV1MnLCAnbmFtZSc6ICdTYW1vYScgfSwgeyAnY29kZSc6ICdZRScsICduYW1lJzogJ1llbWVuJyB9LCB7ICdjb2RlJzogJ1lUJywgJ25hbWUnOiAnTWF5b3R0ZScgfSwgeyAnY29kZSc6ICdaQScsICduYW1lJzogJ1NvdXRoIEFmcmljYScgfSwgeyAnY29kZSc6ICdaTScsICduYW1lJzogJ1phbWJpYScgfSwgeyAnY29kZSc6ICdaVycsICduYW1lJzogJ1ppbWJhYndlJyB9XTtcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1jb3VudHJ5LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvdW50cnlNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgQkFTRV9FTkRQT0lOVCA9ICdjb21wYW5pZXMvJHtjb21wYW55SWR9L2RlcGFydG1lbnRzL29wdGlvbnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9ERVBBUlRNRU5UX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1kZXBhcnRtZW50JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZW5kcG9pbnQgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgW2Rpc2FibGVkXT1cIiFjb21wYW55SWQgfHwgZGlzYWJsZWRcIlxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICBbdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4gIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX0RFUEFSVE1FTlRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbXBhbnlJZCh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jb21wYW55SWQgPSB2O1xuICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25jb21wYW55SWQoKTtcbiAgfVxuXG4gIGdldCBjb21wYW55SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlJZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnRGVwYXJ0bWVudCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0RlcGFydG1lbnQgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY29tcGFueUlkOiBzdHJpbmc7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0RW5kcG9pbnRCYXNlZE9uY29tcGFueUlkKCkge1xuICAgIHRoaXMuZW5kcG9pbnQgPSAhdGhpcy5jb21wYW55SWQgPyB1bmRlZmluZWQgOiBCQVNFX0VORFBPSU5ULnJlcGxhY2UoJyR7Y29tcGFueUlkfScsIHRoaXMuY29tcGFueUlkKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtcm9sZScsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bY3VzdG9tRmV0Y2hGdW5jdGlvbl09XCJjdXN0b21GZXRjaEZ1bmN0aW9uXCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludCA9ICdyb2xlcy9vcHRpb25zJztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIHR5cGVzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1JvbGUgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdSb2xlIGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlXG4gICkge31cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY3VzdG9tRmV0Y2hGdW5jdGlvbiA9ICh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICBjb25zdCBzZWFyY2ggPSB0ZXh0U2VhcmNoID8geyB0ZXh0U2VhcmNoIH0gOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXMuZGVjb3JhQXBpLmdldCh0aGlzLmVuZHBvaW50LCBzZWFyY2gpXG4gICAgLnBpcGUoXG4gICAgICBtYXAocm9sZXMgPT4ge1xuICAgICAgICByZXR1cm4gcm9sZXMuZmlsdGVyKHJvbGUgPT4ge1xuICAgICAgICAgIGNvbnN0IHJvbGVUeXBlID0gKHJvbGUgJiYgcm9sZS5rZXkpID8gcm9sZS5rZXkuc3BsaXQoJy4nKVswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICByZXR1cm4gIXRoaXMudHlwZXMgPyB0cnVlIDogdGhpcy50eXBlcy5pbmRleE9mKHJvbGVUeXBlKSA+PSAwO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtcm9sZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZVJvbGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVJvbGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBCQVNFX0FVVE9DT01QTEVURV9QUk9KRUNUX0VORFBPSU5UID0gJy9sZWdhY3kvcHJvamVjdC9zZWFyY2gva2V5VmFsdWUnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9QUk9KRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1wcm9qZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiKGVuZHBvaW50ICYmIGNvbXBhbnlJZCkgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgI2F1dG9jb21wbGV0ZVxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxGbl09XCJsYWJlbEZuXCJcbiAgW25hbWVdPVwibmFtZVwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIFtjdXN0b21GZXRjaEZ1bmN0aW9uXT1cImN1c3RvbUZldGNoRnVuY3Rpb25cIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1BST0pFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDtcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgY29tcGFueUlkKHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9jb21wYW55SWQgIT09IHYpIHtcbiAgICAgIHRoaXMuX2NvbXBhbnlJZCA9IHY7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5lbmRwb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBlbnN1cmVzIGEgZGlnZXN0IGNpY2xlIGJlZm9yZSByZXNldGluZyB0aGUgZW5kcG9pbnRcbiAgICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjb21wYW55SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlJZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUHJvamVjdCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1Byb2plY3QgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY29tcGFueUlkOiBzdHJpbmc7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2UpIHsgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIGxhYmVsRm4oY29tcGFueSkge1xuICAgIHJldHVybiBgJHtjb21wYW55LnZhbHVlfSAjJHtjb21wYW55LmtleX1gO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0RW5kcG9pbnRCYXNlZE9uQ29tcGFueUlkKCkge1xuICAgIGlmICh0aGlzLmNvbXBhbnlJZCkge1xuICAgICAgdGhpcy5lbmRwb2ludCA9IEJBU0VfQVVUT0NPTVBMRVRFX1BST0pFQ1RfRU5EUE9JTlQgKyAnP2NvbXBhbnlJZD0nICsgdGhpcy5jb21wYW55SWQ7XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGN1c3RvbUZldGNoRnVuY3Rpb24gPSAodGV4dFNlYXJjaCk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBwYXJhbXMudGV4dFNlYXJjaCA9IHRleHRTZWFyY2g7XG4gICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKTtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkuZ2V0KHRoaXMuZW5kcG9pbnQsIHBhcmFtcylcbiAgICAucGlwZShcbiAgICAgIG1hcChwcm9qZWN0cyA9PiB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0cztcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtcHJvamVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVQcm9qZWN0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9RVU9URV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXF1b3RlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZW5kcG9pbnQgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgW2Rpc2FibGVkXT1cIiFwcm9qZWN0SWQgfHwgZGlzYWJsZWRcIlxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICBbdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4gIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICBbY3VzdG9tRmV0Y2hGdW5jdGlvbl09XCJjdXN0b21GZXRjaEZ1bmN0aW9uXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4gIChibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZmFrZURpc2FibGVkPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9RVU9URV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBCQVNFX0VORFBPSU5UID0gJy9sZWdhY3kvcHJvamVjdC8ke3Byb2plY3RJZH0vcXVvdGUnO1xuXG4gIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgbGFiZWxBdHRyID0gJ3ZhbHVlJztcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgcHJvamVjdElkKHY6IHN0cmluZykge1xuICAgIHRoaXMuX3Byb2plY3RJZCA9IHY7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPblByb2plY3RJZCgpO1xuICB9XG5cbiAgZ2V0IHByb2plY3RJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdElkO1xuICB9XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdRdW90ZSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1F1b3RlIGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX3Byb2plY3RJZDogc3RyaW5nO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlKSB7IH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0RW5kcG9pbnRCYXNlZE9uUHJvamVjdElkKCkge1xuICAgIHRoaXMuZW5kcG9pbnQgPSAhdGhpcy5wcm9qZWN0SWQgPyB1bmRlZmluZWQgOiB0aGlzLkJBU0VfRU5EUE9JTlQucmVwbGFjZSgnJHtwcm9qZWN0SWR9JywgdGhpcy5wcm9qZWN0SWQpO1xuICB9XG5cbiAgY3VzdG9tRmV0Y2hGdW5jdGlvbiA9ICh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIHBhcmFtcy50ZXh0U2VhcmNoID0gdGV4dFNlYXJjaDtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPblByb2plY3RJZCgpO1xuICAgIHJldHVybiB0aGlzLmRlY29yYUFwaS5nZXQodGhpcy5lbmRwb2ludCwgcGFyYW1zKVxuICAgIC5waXBlKFxuICAgICAgbWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZS5tYXAocXVvdGVzID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBxdW90ZXMuaWQsXG4gICAgICAgICAgICB2YWx1ZTogcXVvdGVzLnByb2R1Y3RWYXJpYW50SWRcbiAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0F1dG9jb21wbGV0ZVF1b3RlQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUXVvdGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1icmVhZGNydW1iJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgY2xhc3M9XCJkZWMtYnJlYWRjcnVtYi13cmFwcGVyXCI+XG5cbiAgPGRpdiBmeEZsZXg+XG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgIDxoMT57e2ZlYXR1cmV9fTwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJicmVhZGNydW1iXCI+XG4gICAgICAgIHt7YnJlYWRjcnVtYn19XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXggZnhGbGV4QWxpZ249XCJjZW50ZXJcIiBmeExheW91dEFsaWduPVwiZW5kXCI+XG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiPlxuICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgIDwhLS0gQ09OVEVOVCAgLS0+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPCEtLSBCQUNLIEJVVFRPTiAtLT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJkZWZhdWx0XCIgKm5nSWY9XCJiYWNrQnV0dG9uUGF0aFwiIChjbGljayk9XCJnb0JhY2soKVwiPnt7IGJhY2tMYWJlbCB9fTwvYnV0dG9uPlxuICAgICAgICA8IS0tIEZPUldBUkQgQlVUVE9OIC0tPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cImRlZmF1bHRcIiAqbmdJZj1cImZvcndhcmRCdXR0b25cIiAoY2xpY2spPVwiZ29Gb3J3YXJkKClcIj57eyBmb3J3YXJkTGFiZWwgfX08L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1icmVhZGNydW1iLXdyYXBwZXJ7bWFyZ2luLWJvdHRvbTozMnB4fS5kZWMtYnJlYWRjcnVtYi13cmFwcGVyIGgxe2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjQwMDttYXJnaW4tdG9wOjRweDttYXJnaW4tYm90dG9tOjRweH0uZGVjLWJyZWFkY3J1bWItd3JhcHBlciAuYnJlYWRjcnVtYntjb2xvcjojYThhOGE4fWBdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNCcmVhZGNydW1iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBiYWNrQnV0dG9uUGF0aDogc3RyaW5nO1xuICBASW5wdXQoKSBicmVhZGNydW1iOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZlYXR1cmU6IHN0cmluZztcbiAgQElucHV0KCkgZm9yd2FyZEJ1dHRvbjogc3RyaW5nO1xuICBASW5wdXQoKSBpMThuRmVhdHVyZTogc3RyaW5nO1xuICBASW5wdXQoKSBpMThuQnJlYWRjcnVtYjogc3RyaW5nW107XG4gIEBJbnB1dCgpIGJhY2tMYWJlbCA9ICdCYWNrJztcbiAgQElucHV0KCkgZm9yd2FyZExhYmVsID0gJ0ZvcndhcmQnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgdHJhbnNsYXRvcjogVHJhbnNsYXRlU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50cmFuc2xhdGVGZWF0dXJlKCk7XG4gICAgdGhpcy50cmFuc2xhdGVQYXRocygpO1xuICAgIHRoaXMuZGV0ZWN0QW5kUGFyc2VCdXR0b25zQ29uZmlnKCk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdEFuZFBhcnNlQnV0dG9uc0NvbmZpZygpIHtcbiAgICB0aGlzLnBhcnNlQmFja0J1dHRvbigpO1xuICAgIHRoaXMucGFyc2VGb3J3YXJkQnV0dG9uKCk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQmFja0J1dHRvbigpIHtcbiAgICBpZiAodGhpcy5iYWNrQnV0dG9uUGF0aCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYmFja0J1dHRvblBhdGggIT09ICdmYWxzZScpIHtcbiAgICAgIHRoaXMuYmFja0J1dHRvblBhdGggPSB0aGlzLmJhY2tCdXR0b25QYXRoID8gdGhpcy5iYWNrQnV0dG9uUGF0aCA6ICcvJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBhcnNlRm9yd2FyZEJ1dHRvbigpIHtcbiAgICBpZiAodGhpcy5mb3J3YXJkQnV0dG9uICE9PSB1bmRlZmluZWQgJiYgdGhpcy5mb3J3YXJkQnV0dG9uICE9PSAnZmFsc2UnKSB7XG4gICAgICB0aGlzLmZvcndhcmRCdXR0b24gPSB0aGlzLmZvcndhcmRCdXR0b24gPyB0aGlzLmZvcndhcmRCdXR0b24gOiAnLyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2xhdGVGZWF0dXJlKCkge1xuICAgIGlmICh0aGlzLmkxOG5CcmVhZGNydW1iKSB7XG4gICAgICB0aGlzLmJyZWFkY3J1bWIgPSB0aGlzLmkxOG5CcmVhZGNydW1iLm1hcChwYXRoID0+IHRoaXMudHJhbnNsYXRvci5pbnN0YW50KHBhdGgpKS5qb2luKCcgLyAnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyYW5zbGF0ZVBhdGhzKCkge1xuICAgIGlmICh0aGlzLmkxOG5GZWF0dXJlKSB7XG4gICAgICB0aGlzLmZlYXR1cmUgPSB0aGlzLnRyYW5zbGF0b3IuaW5zdGFudCh0aGlzLmkxOG5GZWF0dXJlKTtcbiAgICB9XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gTmF2aWdhdGlvbiBNZXRob2RzIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKiAvL1xuXG4gIHB1YmxpYyBnb0JhY2soKSB7XG4gICAgaWYgKHRoaXMuYmFja0J1dHRvblBhdGgpIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmJhY2tCdXR0b25QYXRoXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ29Gb3J3YXJkKCkge1xuICAgIGlmICh0aGlzLmZvcndhcmRCdXR0b24pIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmZvcndhcmRCdXR0b25dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lmhpc3RvcnkuZm9yd2FyZCgpO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQW5ndWxhciBtb2R1bGVzXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGVjQnJlYWRjcnVtYkNvbXBvbmVudCB9IGZyb20gJy4vYnJlYWRjcnVtYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQnJlYWRjcnVtYkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQnJlYWRjcnVtYkNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0JyZWFkY3J1bWJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERpYWxvZ0FjdGlvbiB9IGZyb20gJy4vZGVjLWRpYWxvZy5tb2RlbHMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZGlhbG9nJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXRvb2xiYXIgY29sb3I9XCJwcmltYXJ5XCI+XG5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4RmxleEZpbGwgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJ1cHBlcmNhc2VcIiBtYXQtZGlhbG9nLWNsb3NlPlxuICAgICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGgxPiZuYnNwOyB7eyB0aXRsZSB9fTwvaDE+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBmeEZsZXg+XG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImFjdGlvbnNcIj5cbiAgICAgICAgICA8bWF0LW1lbnUgI2RlY0RpYWxvZ0FjdGlvbnNNZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGFjdGlvbnNcIiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJhY3Rpb24uY2FsbGJhY2soY29udGV4dClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L21hdC1tZW51PlxuXG4gICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cImRlY0RpYWxvZ0FjdGlvbnNNZW51XCI+XG4gICAgICAgICAgICA8bWF0LWljb24+bW9yZV92ZXJ0PC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjwvbWF0LXRvb2xiYXI+XG5cbjxkaXYgY2xhc3M9XCJkZWMtZGlhbG9nLWNoaWxkLXdyYXBwZXJcIj5cbiAgPHRlbXBsYXRlICNjaGlsZENvbnRhaW5lcj48L3RlbXBsYXRlPlxuPC9kaXY+XG5cbjxkZWMtc3Bpbm5lciAqbmdJZj1cIiFsb2FkZWRcIj48L2RlYy1zcGlubmVyPlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtZGlhbG9nLWNoaWxkLXdyYXBwZXJ7cGFkZGluZzozMnB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLy8gQ1VSUkVOVFxuICBjaGlsZENvbXBvbmVudFR5cGU6IENvbXBvbmVudFR5cGU8YW55PjtcblxuICBjaGlsZENvbXBvbmVudEluc3RhbmNlOiBhbnk7XG5cbiAgYWN0aW9uczogRGlhbG9nQWN0aW9uW10gPSBbXTtcblxuICB0aXRsZTogc3RyaW5nO1xuXG4gIGNvbnRleHQ6IGFueSA9IHt9O1xuXG4gIGxvYWRlZDogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKCdjaGlsZENvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBjaGlsZENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBAT3V0cHV0KCkgY2hpbGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZhY3RvcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGVjRGlhbG9nQ29tcG9uZW50PlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLmRpYWxvZ1JlZi5hZnRlck9wZW4oKVxuICAgIC50b1Byb21pc2UoKVxuICAgIC50aGVuKHRoaXMuZmFjdG9yeVRoZUNvbXBvbmVudCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZmFjdG9yeVRoZUNvbXBvbmVudCA9ICgpID0+IHtcblxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiA9IHRoaXMuZmFjdG9yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuY2hpbGRDb21wb25lbnRUeXBlKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gPSB0aGlzLmNoaWxkQ29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgIHRoaXMuY2hpbGRDb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcblxuICAgIHRoaXMuY2hpbGQuZW1pdCh0aGlzLmNoaWxkQ29tcG9uZW50SW5zdGFuY2UpO1xuXG4gICAgdGhpcy5jaGlsZC5jb21wbGV0ZSgpOyAvLyB1bnN1YnNyaWJlIHN1YnNjcmliZXJzXG5cbiAgICB0aGlzLmFwcGVuZENvbnRleHRUb0luc3RhbmNlKGNvbXBvbmVudFJlZi5pbnN0YW5jZSwgdGhpcy5jb250ZXh0KTtcblxuICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRDb250ZXh0VG9JbnN0YW5jZShpbnN0YW5jZTogYW55LCBjb250ZXh0OiBhbnkpIHtcblxuICAgIGlmIChpbnN0YW5jZSAmJiBjb250ZXh0KSB7XG5cbiAgICAgIE9iamVjdC5rZXlzKGNvbnRleHQpLmZvckVhY2goKGtleSkgPT4ge1xuXG4gICAgICAgIGluc3RhbmNlW2tleV0gPSB0aGlzLmNvbnRleHRba2V5XTtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc3Bpbm5lcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlY29yYS1sb2FkaW5nLXNwaW5uZXItd3JhcHBlclwiPlxuICA8ZGl2IGNsYXNzPVwiZGVjb3JhLWxvYWRpbmctc3Bpbm5lciB0cmFuc3BhcmVudEJnXCI+XG4gICAgPGRpdiBjbGFzcz1cImNlbnRlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhcFwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhhbGYtY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGFsZi1jaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtgLmRlY29yYS1sb2FkaW5nLXNwaW5uZXItd3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU3Bpbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zcGlubmVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjU3Bpbm5lckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNTcGlubmVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTcGlubmVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBEZWNEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2RlYy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE9wZW5Db25maWd1cmF0aW9uIH0gZnJvbSAnLi9kZWMtZGlhbG9nLm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNEaWFsb2dTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nXG4gICkgeyB9XG5cblxuICBvcGVuKGNoaWxkQ29tcG9uZW50OiBDb21wb25lbnRUeXBlPGFueT4sIGNvbmZpZzogT3BlbkNvbmZpZ3VyYXRpb24pIHtcblxuICAgIGNvbnN0IGRpYWxvZ0luc3RhbmNlOiBNYXREaWFsb2dSZWY8YW55PiA9IHRoaXMuZGlhbG9nLm9wZW4oXG4gICAgICBEZWNEaWFsb2dDb21wb25lbnQsXG4gICAgICB7XG4gICAgICAgIHdpZHRoOiBjb25maWcud2lkdGggfHwgJzEwMHZ3JyxcbiAgICAgICAgaGVpZ2h0OiBjb25maWcuaGVpZ3RoIHx8ICcxMDB2aCcsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdmdWxsLXNjcmVlbi1kaWFsb2cnXG4gICAgICB9XG4gICAgKTtcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLmNoaWxkQ29tcG9uZW50VHlwZSA9IGNoaWxkQ29tcG9uZW50O1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UuYWN0aW9ucyA9IGNvbmZpZy5hY3Rpb25zO1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSBjb25maWcudGl0bGU7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS5jb250ZXh0ID0gY29uZmlnLmNvbnRleHQ7XG5cbiAgICByZXR1cm4gZGlhbG9nSW5zdGFuY2U7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY1NwaW5uZXJNb2R1bGUgfSBmcm9tICcuLy4uL2RlYy1zcGlubmVyL2RlYy1zcGlubmVyLm1vZHVsZSc7XG5cbmltcG9ydCB7IERlY0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vZGVjLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjRGlhbG9nU2VydmljZSB9IGZyb20gJy4vZGVjLWRpYWxvZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgRGVjU3Bpbm5lck1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0RpYWxvZ0NvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0RlY0RpYWxvZ0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0RlY0RpYWxvZ1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNEaWFsb2dNb2R1bGUgeyB9XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vc2hlaWthbHRoYWYvbmd1LWNhcm91c2VsI2lucHV0LWludGVyZmFjZVxuXG5leHBvcnQgY29uc3QgQ2Fyb3VzZWxDb25maWcgPSB7XG4gIGdyaWQ6IHsgeHM6IDEsIHNtOiAyLCBtZDogMywgbGc6IDQsIGFsbDogMCB9LFxuICBzbGlkZTogMSxcbiAgc3BlZWQ6IDQwMCxcbiAgaW50ZXJ2YWw6IDQwMDAsXG4gIHBvaW50OiB7XG4gICAgdmlzaWJsZTogZmFsc2VcbiAgfSxcbiAgY3VzdG9tOiAnYmFubmVyJ1xufTtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcm91c2VsQ29uZmlnIH0gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxTdG9yZSB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwvc3JjL25ndS1jYXJvdXNlbC9uZ3UtY2Fyb3VzZWwuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWdhbGxlcnknLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtZ2FsbGVyeS13cmFwcGVyXCI+XG5cbiAgPGRpdiBjbGFzcz1cImltYWdlLWhpZ2hsaWdodGVkXCIgW2RlY0ltYWdlXT1cImltYWdlSGlnaGxpZ2h0XCIgW2RlY0ltYWdlU2l6ZV09XCJ7d2lkdGg6NjAwfVwiPjwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCIgKm5nSWY9XCJpbWdFeHRlcm5hbExpbmtcIj5cblxuICAgIDxhIGhyZWY9XCJ7eyBpbWdFeHRlcm5hbExpbmsgfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj57eyAnbGFiZWwuaW1hZ2UtbGluaycgfCB0cmFuc2xhdGUgfX08L2E+XG5cbiAgPC9kaXY+XG5cbiAgPG5ndS1jYXJvdXNlbCBjbGFzcz1cImNhcm91c2VsLXdyYXBwZXJcIiBbaW5wdXRzXT1cImNhcm91c2VsQ29uZmlnXCIgKGluaXREYXRhKT1cIm9uSW5pdERhdGFGbigkZXZlbnQpXCIgKG9uTW92ZSk9XCJvbk1vdmVGbigkZXZlbnQpXCI+XG5cbiAgICA8bmd1LWl0ZW0gTmd1Q2Fyb3VzZWxJdGVtICpuZ0Zvcj1cImxldCBpbWFnZSBvZiBpbWFnZXNcIiBbY2xhc3MuYWN0aXZlXT1cImltYWdlID09IGltYWdlSGlnaGxpZ2h0XCI+XG5cbiAgICAgIDxpbWcgW2RlY0ltYWdlXT1cImltYWdlXCIgW2RlY0ltYWdlU2l6ZV09XCJ7d2lkdGg6MzAwLCBoZWlnaHQ6MzAwfVwiIChjbGljayk9XCJvblNlbGVjdEltYWdlKCRldmVudCxpbWFnZSlcIj5cblxuICAgIDwvbmd1LWl0ZW0+XG5cbiAgICA8bWF0LWljb24gTmd1Q2Fyb3VzZWxQcmV2IGNsYXNzPVwibGVmdC1wcmV2aW91c1wiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBpc0ZpcnN0fVwiPmNoZXZyb25fbGVmdDwvbWF0LWljb24+XG5cbiAgICA8bWF0LWljb24gTmd1Q2Fyb3VzZWxOZXh0IGNsYXNzPVwicmlnaHQtbmV4dFwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBpc0xhc3R9XCI+Y2hldnJvbl9yaWdodDwvbWF0LWljb24+XG5cbiAgPC9uZ3UtY2Fyb3VzZWw+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtZ2FsbGVyeS13cmFwcGVye21heC13aWR0aDo2MjRweDtvdmVyZmxvdzpoaWRkZW59LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmltYWdlLWhpZ2hsaWdodGVke2JvcmRlcjoycHggc29saWQgI2Y1ZjVmNTt3aWR0aDo2MjBweDtoZWlnaHQ6NjIwcHh9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgYXtmb250LXNpemU6MTBweDt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjojOTI5MjkyO2N1cnNvcjpwb2ludGVyfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVye21hcmdpbi10b3A6OHB4O3BhZGRpbmc6MCAyNHB4O2hlaWdodDoxMjhweH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbXtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7aGVpZ2h0OjEyNHB4O3BhZGRpbmc6MnB4O21hcmdpbi1yaWdodDoycHh9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW0uYWN0aXZlLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtOmhvdmVye3BhZGRpbmc6MDtib3JkZXI6MnB4IHNvbGlkICMyMzJlMzh9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW0gaW1ne21heC13aWR0aDoxMjRweDtjdXJzb3I6cG9pbnRlcn0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cywuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dHtkaXNwbGF5OmJsb2NrIWltcG9ydGFudDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6Y2FsYyg1MCUgLSAxMnB4KTtjdXJzb3I6cG9pbnRlcjt0ZXh0LXNoYWRvdzpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91czpob3ZlciwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dDpob3Zlcnt0ZXh0LXNoYWRvdzowIDAgNnB4IHJnYmEoMCwwLDAsLjIpfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLmRpc2FibGVkLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0LmRpc2FibGVke29wYWNpdHk6LjR9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMuZGlzYWJsZWQ6aG92ZXIsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQuZGlzYWJsZWQ6aG92ZXJ7dGV4dC1zaGFkb3c6bm9uZX0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91c3tsZWZ0OjB9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHR7cmlnaHQ6MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHYWxsZXJ5Q29tcG9uZW50IHtcblxuICBpbWFnZUhpZ2hsaWdodDogYW55O1xuXG4gIGFjdGl2ZUltYWdlOiBFbGVtZW50O1xuXG4gIGltZ0V4dGVybmFsTGluazogc3RyaW5nO1xuXG4gIGlzRmlyc3Q6IGJvb2xlYW47XG5cbiAgaXNMYXN0OiBib29sZWFuO1xuXG4gIGNhcm91c2VsQ29uZmlnID0gQ2Fyb3VzZWxDb25maWc7XG5cbiAgQElucHV0KClcbiAgc2V0IGltYWdlcyh2YWx1ZTogYW55W10pIHtcblxuICAgIHZhbHVlID0gdmFsdWUgfHwgbmV3IEFycmF5PGFueT4oKTtcblxuICAgIGlmICh2YWx1ZSAmJiAoSlNPTi5zdHJpbmdpZnkodmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLl9pbWFnZXMpKSkge1xuXG4gICAgICB0aGlzLmltYWdlSGlnaGxpZ2h0ID0gdmFsdWVbMF07XG5cbiAgICAgIHRoaXMuX2ltYWdlcyA9IHZhbHVlO1xuXG4gICAgICB0aGlzLnNldEV4dGVybmFsTGluaygpO1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgaW1hZ2VzKCk6IGFueVtdIHtcblxuICAgIHJldHVybiB0aGlzLl9pbWFnZXM7XG5cbiAgfVxuXG4gIHByaXZhdGUgX2ltYWdlczogYW55W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG9uU2VsZWN0SW1hZ2UgPSAoJGV2ZW50LCBzeXNGaWxlKSA9PiB7XG5cbiAgICBpZiAodGhpcy5hY3RpdmVJbWFnZSAmJiB0aGlzLmFjdGl2ZUltYWdlICE9PSAkZXZlbnQudGFyZ2V0KSB7XG5cbiAgICAgIHRoaXMuYWN0aXZlSW1hZ2UuY2xhc3NOYW1lID0gJyc7XG5cbiAgICB9XG5cbiAgICAkZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9ICdhY3RpdmUnO1xuXG4gICAgdGhpcy5hY3RpdmVJbWFnZSA9ICRldmVudC50YXJnZXQ7XG5cbiAgICB0aGlzLmltYWdlSGlnaGxpZ2h0ID0gc3lzRmlsZTtcblxuICAgIHRoaXMuc2V0RXh0ZXJuYWxMaW5rKCk7XG5cbiAgfVxuXG4gIHNldEV4dGVybmFsTGluayA9ICgpID0+IHtcblxuICAgIGlmICh0aGlzLmltYWdlSGlnaGxpZ2h0KSB7XG5cbiAgICAgIHRoaXMuaW1nRXh0ZXJuYWxMaW5rID0gdGhpcy5pbWFnZUhpZ2hsaWdodC5maWxlVXJsO1xuXG4gICAgfVxuXG4gIH1cblxuICBvbkluaXREYXRhRm4oZXZlbnQ6IE5ndUNhcm91c2VsU3RvcmUpIHtcblxuICAgIHRoaXMuc2V0UHJldk5leHRDaGVja2VycyhldmVudC5pc0ZpcnN0LCBldmVudC5pdGVtcyA+PSB0aGlzLmltYWdlcy5sZW5ndGgpO1xuXG4gIH1cblxuICBvbk1vdmVGbihldmVudDogTmd1Q2Fyb3VzZWxTdG9yZSkge1xuXG4gICAgdGhpcy5zZXRQcmV2TmV4dENoZWNrZXJzKGV2ZW50LmlzRmlyc3QsIGV2ZW50LmlzTGFzdCk7XG5cbiAgfVxuXG4gIHNldFByZXZOZXh0Q2hlY2tlcnMoZmlyc3Q6IGJvb2xlYW4sIGxhc3Q6IGJvb2xlYW4pIHtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICB0aGlzLmlzRmlyc3QgPSBmaXJzdDtcblxuICAgICAgdGhpcy5pc0xhc3QgPSBsYXN0O1xuXG4gICAgfSwgMCk7XG5cbiAgfVxuXG59XG4iLCJleHBvcnQgY29uc3QgVGh1bWJvclNlcnZlckhvc3QgPSAnaHR0cHM6Ly9jYWNoZS10aHVtYnMuZGVjb3JhY29udGVudC5jb20vdW5zYWZlJztcblxuZXhwb3J0IGNvbnN0IFMzSG9zdCA9ICdodHRwOi8vczMuYW1hem9uYXdzLmNvbS9kZWNvcmEtcGxhdGZvcm0tMS1udic7XG5cbmV4cG9ydCBjb25zdCBUcmFuc3BhcmVudEltYWdlID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQkNBUUFBQUMxSEF3Q0FBQUFBbUpMUjBRQS80ZVB6TDhBQUFcbkFKY0VoWmN3QUFDeE1BQUFzVEFRQ2FuQmdBQUFBTFNVUkJWQWpYWTJCZ0FBQUFBd0FCSU5XVXh3QUFBQUJKUlU1RXJrSmdnZz09YDtcblxuZXhwb3J0IGNvbnN0IEVycm9ySW1hZ2UgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJQUFBQUNBQ0FNQUFBRDA0Skg1QUFBQXNWQk1WRVVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFcbkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBXG5BQUFBQUFBQUFrMndMU0FBQUFPblJTVGxNQUE0VVVCUWdNRVBTS0sramFHeGNmOTUweWNrODZOaSttZ2I5WEppT3lSUERzM3FLV1owcktyWHgzKzg1alFUMjRYZVBYMDhWdGFwR2FFQzVSTndBQUIxNUpSRUZVZU5ydG0yZHoyekFNaGtscjJiSWw3NUY0MVhHODRwbGwxL3ovUDZ5WFZqWUVraUtcbnBrZDcxcnMrbm5pTWRJZUlGQ0VBcStjOS8vcE1WMnd2ODNtRzVuQjU2ZnVEYTVDOUNnK25tVkdhWUg2ZVhhVURKOXhNT0p5eVp5VEFrMzBsd3JqSWRzODJZZkEvdUJWYlgySER4U09HTTV5d05rMzZ4ZXVoOXNMUzhINHN6WWJSaVNaVExMSkZhcXlEZFMyVC85anhzaFZId1U5dXh4c2Y5WEdMS1xuWTFoQTBMOHdqby9GeUphcjFHOExNbjJ3ODJydmlTRjJIWmVvOERvN2hxajJjejMrQTg1Mlo4c2tXV3l3TTByWnhlZ2k4YTBPcHR0cEw5K1FHQzJTRGI4YzMvdFdxZ2ZwMWhpd1BaQXNMT0lQa1Q2b2wzSHoyeG5jVUdMQUpZdVc3YmlBbmtsYXJyRm96dXJESU9hSE5VMG4velhjdXM4UlJhWFlZXG42U3lBSkxmYkp6dkVHbGtzcUI1dit2azVFM2s0SVlKTVFYVTA4eC9vam5neld2cStIc2dSZkFNMFVoTWFFSDBrV0tvc0JzbUdjbTlKNUFYVWhUZzA0Qm91ZWYvQ2dFSzgwTE5NVGEyU1lwa1lwb1MrL2ZEaHhiYlI5M0xoSmI2dXVxdDFuT0xMdW9idDh4bUd6bkFKMHJxKzUvTmlQa1h6ZWJQZlZcbjF6UU44TEZOWHBZUmFBMWllVDhXbHAxS1dQaE1kYjJsWlg2VnNtWnp0V3V2ZmpacWcrQlZVY25UZmxsQjJsMzdRNnJFSDUyYUdhbUpiemJPU0VtbG9tMFVYOXBKMWtLcFFTcDdjWTZ4SXA3d3h4Q3VRS1lBbzAwVE5WYm9FdmJxZ3NHUnlaaWlrQkZFN3VLN0lsb2kxdTZZR3BXR29LcE52dXlzUlxuOTB4L1dkYWRJQThETlZuSVowZzNYeWliN2tNTUZvSUl6RWFoR0cyQVRNbDdoSm51c05jQzQ0cUJSRXFtS1dRSlZUVjNjWnpkamF0d3pGUmNyVGhCNGZENXBSeGNLSjhkdERCQkdsZzRiQ1dwMEhsZ2FmcHl4amtNb3Q2UWUyRUhDMlNTcE1WeW5NNkV1aThRWndWalIxWEhSZTNndzl0U0RsTEZqXG5LZGlpUWMxZUhnZWQ2R2RYTloxNmhHY0JrUmhRay9tQWkrOUI5SlM4YUErY0dyMzdYMTRiekJTYys1K2licFVndG1MbklGZmp4c21neHFaRTdsczhXMUtjSmZZTFZ1TXJ2ZDgxWUdaVVpYV3ZKOHZSRGxvNVFZMXZvRWJMYzhQUnNqSmpHbEN6R1AzV2srVGhHWTdNQTZTcFQxejk4V2xrUERBM2dcbkVTbnpRSnBVTmFNTUxZYXd4N2hnZUhjSTVoZ3BUY0FMellnTWQ1a3c1RGZWM21neGpKV284MG5XVk1EOXBFbjQxS1h1WVZFTFRySUh1Zkd4cER5SjEwaTBwS0dpcm9JSkFhd0JzamV2V0p4SDdBSlN6TUQ2bUxTczZSNUVCWTZncXNmV1p5Vno1OW9jcVF4SDRvMjJkZ0FZQWNMdGJBYUIwaU5PeFxuTURiUEZFOXVFNmJBQ3dCbnM3bkJvZGZjbU1rNnVZOVZvNkE3QWFiUkE4SnhMeTA4QUFJalpJWFkwQm9ocGhrQ2VJeE5pQW5tQkFRMmtBWG1qTXFYR01SR0prUU5kOEI0QmRDQXZWZENJeDM0RWVwSVlZMnJwN2lYdUlpZ3NpTVJGaFM0d0NXMi9BR0FYVU9WRWt6L293OU1VODRPZ05nRklPRnRLXG5ya2NqTzQ3cVlDUzI5QVI3aENFNVlKS1A3VG5lZjFKblFrOWlrTnlDSTd2aUFEZXh6YXJUdUpuUitxTTRDUnhrWW9nRzRzUzZ6U1lnWEFrb09MeExwSUVSZkQ4Z1lSbi9jb0ZHU2c5VzRYZGhZSkxJMnVDWXBVdVo2QTVySWtRdDZOd0VuNGRtU2dobzVBK2FTOHVzU2RWRjZBeG9VYm9GcGx1UWxcbjk4Y29KaElTcHd6YnJhNktOVk9nYTdTVHNZNE5UNWttS0tnRXhiZGtyV0ZmYjhCSkdHbWNRcWpLWmpnM09vcHBwQ1hyakY3MEJqRFlXbS96dGQ2czdjSTlkSUhWdUtlRTV3VjhLYXJ3emNDQTkvaWRqbWNUak1lcGNab3dDQmpJdTJOTGJ3QXJFVFVCcDhhV05BOTI1UE9CVjVVQmtBczArQjlZTlxublVDREtFa2xXMU1UV01BbUNreWhJVjROZjRFTlVhMlZSVXpJcjBCckNKcWkxYStacXZRU08zeFVIOUI4VmEvSkUzSk5rWUdzS2NXdit2UmlRUXpLYWVDUjBWVDFNQUZTWFBDaGdNR0tQbnN3aTdRL2lNc3RBUmhyWEg0K0lUUU1vUWJ4MEpRcDNiNE5CajJBeXZ3Ty9NdFM1ajA5emsxaHIxa0ZiXG5uQ1JJbGw1akc0NzgyeWlvOFNhQUlGMW54UndITHc3TUkwYThzRUJvcjNCZUNlQnN0REc0cUZrckswQmQ2NWtmdUs1YUk4dExFYWdSV1JjdVRlYlY1WUhuQ3NqbmE0cnBOQzMvRjdjNHNCdWRWSWpsVzBBVkw2bkl2YUxEOVhhSmNxY0tEcjNwelc2Sjh0dWJMY3dGZFU5a3IvTVVzSUp5NjBtZm1cbkFPZjhHZWh1REY4elRlNUpkUEpRaUtsOUUvemI4N1dIUnAveHIwYmJSOXdPTmtCU0xWYjZGQmxXWEV1aGpqK0p3M2tIZ2Frcm95NnVpb0JQalQzUG8zZFI1Z2VzLzN3OXhBMmMxN25WVVlldVhXSnBQVTQ2S3J3SHlmaHJyRXhQTzZOVE1EZjFwV0U0RGNNY3BmeXpZY0JKdWlDa0RlRDJUTng5NFxuTy9Cb2xxaGgyeW5KUS84SDhtY1dDOWpWS2VURDlFSEtXd2R3YTNWRXNoSHNZbzlCMGxMQm5aVUczZnZHRFVuUEszby9STkt5bktGMk5ndXRCZ09xeTFSblErK2RBZVdzUHJSUVh6TWIycVlDbXRaUUUrZG1UeUlQWEZNOG9nWm10OHU0SkNONUdEMXhsZmFpcmw1OStNRVF0WHJlVE40V2lyeEtWMVxuN1Z1YTFObFhGY0tNbU5OMkVpcC9iU0R4MmJmbUU3M3Zod1hrdnExN1ZYMlA4enlzTG5pQlNHLzVsK2VaOFV5bmpBMHRDc2s4SnhYNTlNbTlKWGgzd1A0VVZ2dzlzNUlOK0pONzJXazl1d2VjY2lmd0czdjIvVytBZWY3MXNlK1p0UXg2cjd2ZTd4MlBQcmxrUCs4Ky95Q3pHaTdhRnpwUFV0QUFBQUFFbEZUa1N1UW1DQ2A7XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbWFnZVNpemUsIFN5c3RlbUZpbGVLZXkgfSBmcm9tICcuL2ltYWdlLmRpcmVjdGl2ZS5tb2RlbHMnO1xuaW1wb3J0IHsgVHJhbnNwYXJlbnRJbWFnZSwgVGh1bWJvclNlcnZlckhvc3QsIEVycm9ySW1hZ2UsIFMzSG9zdCB9IGZyb20gJy4vaW1hZ2UuZGlyZWN0aXZlLmNvbnN0YW50cyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkZWNJbWFnZV0nXG59KVxuZXhwb3J0IGNsYXNzIERlY0ltYWdlRGlyZWN0aXZlIHtcblxuICBjb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBlcnJvck9uTG9hZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkZWNJbWFnZSh2OiBTeXN0ZW1GaWxlS2V5IHwgc3RyaW5nKSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJJbWFnZSkge1xuICAgICAgdGhpcy5pbm5lckltYWdlID0gdjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZGVjSW1hZ2VTaXplOiBJbWFnZVNpemU7XG5cbiAgLy8gRGVmaW5lcyBpZiB3aGl0ZSBtYXJnaW5zIHNob3VsZCBiZSBjcm9wcGVkXG4gIEBJbnB1dCgpIHRyaW06IGJvb2xlYW47XG5cbiAgLy8gRGVmaW5lcyBpZiB0aGUgaW1hZ2Ugc2hvdWxkIGJlIGNyb3BwZWQgb3IgZml0IHRoZSBzaXplIHJlc3BlY3RpbiB0aGUgYXNwZWN0IHJhdGlvXG4gIEBJbnB1dCgpIGZpdEluOiBib29sZWFuO1xuXG4gIC8vIEdlZCByZWRpbWVuc2lvbmVkIGltYWdlIGZyb20gdGh1bWJvciBpbWFnZSByZXNpemUgc2VydmljZVxuICBASW5wdXQoKSB0aHVtYm9yaXplID0gdHJ1ZTtcblxuICBwcml2YXRlIGNvbnRhaW5lckVsZW1lbnRUeXBlOiAnSU1HJyB8ICdOT1QtSU1HJztcblxuICBwcml2YXRlIGlubmVySW1hZ2U6IFN5c3RlbUZpbGVLZXkgfCBzdHJpbmcgPSBUcmFuc3BhcmVudEltYWdlO1xuXG4gIHByaXZhdGUgaW1hZ2VQYXRoOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBmaW5hbEltYWdlVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICB0aGlzLmRldGVjdENvbnRhaW5lckVsZW1lbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0Q29udGFpbmVyRWxlbWVudCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudFR5cGUgPSB0aGlzLmNvbnRhaW5lckVsZW1lbnQudGFnTmFtZSA9PT0gJ0lNRycgPyAnSU1HJyA6ICdOT1QtSU1HJztcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEltYWdlKCkge1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmlubmVySW1hZ2UgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IHRoaXMuaW5uZXJJbWFnZTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuaW1hZ2VQYXRoID0gdGhpcy5leHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpO1xuXG4gICAgICBpZiAodGhpcy5pbWFnZVBhdGgpIHtcblxuICAgICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSB0aGlzLmdldEZpbmFsVXJsKCk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gRXJyb3JJbWFnZTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgdGhpcy50cnlUb0xvYWRJbWFnZSgpO1xuXG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RJbWFnZVVybEZyb21TeXNmaWxlKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lckltYWdlWydmaWxlQmFzZVBhdGgnXSB8fCB1bmRlZmluZWQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaW5hbFVybCgpIHtcblxuICAgIGlmICh0aGlzLnRodW1ib3JpemUpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0VGh1bWJvclVybCgpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0UzNVcmwoKTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTM1VybCgpIHtcbiAgICByZXR1cm4gYCR7UzNIb3N0fS8ke3RoaXMuaW1hZ2VQYXRofWA7XG4gIH1cblxuICBwcml2YXRlIGdldFRodW1ib3JVcmwoKSB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZ2V0SW1hZ2VTaXplKHRoaXMuZGVjSW1hZ2VTaXplKTtcbiAgICBjb25zdCBhc3BlY3QgPSB0aGlzLmdldEFzcGVjdCgpO1xuICAgIGNvbnN0IHRyaW0gPSB0aGlzLmdldFRyaW0oKTtcbiAgICByZXR1cm4gYCR7VGh1bWJvclNlcnZlckhvc3R9LyR7c2l6ZX0ke2FzcGVjdH0ke3RyaW19LyR7dGhpcy5pbWFnZVBhdGh9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VTaXplKGRlY0ltYWdlU2l6ZTogSW1hZ2VTaXplID0ge30pOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtkZWNJbWFnZVNpemUud2lkdGggfHwgMH14JHtkZWNJbWFnZVNpemUuaGVpZ2h0IHx8IDB9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXNwZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmZpdEluID8gJy9maXQtaW4nICA6ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUcmltKCkge1xuICAgIHJldHVybiB0aGlzLnRyaW0gPyAnL3RyaW0nIDogJyc7XG4gIH1cblxuICBwcml2YXRlIHRyeVRvTG9hZEltYWdlKCkge1xuICAgIGNvbnN0IGRvd25sb2FkaW5nSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBkb3dubG9hZGluZ0ltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuY3JlYXRlSW1hZ2UoKTtcbiAgICB9O1xuXG4gICAgZG93bmxvYWRpbmdJbWFnZS5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gRXJyb3JJbWFnZTtcbiAgICAgIHRoaXMuY3JlYXRlSW1hZ2UoKTtcbiAgICB9O1xuXG4gICAgZG93bmxvYWRpbmdJbWFnZS5zcmMgPSB0aGlzLmZpbmFsSW1hZ2VVcmw7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUltYWdlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lckVsZW1lbnRUeXBlID09PSAnSU1HJykge1xuICAgICAgdGhpcy5zZXRJbWFnZWVsZW1lbnRTcmMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hcHBlbmRJbWFnZVRvQmcoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZEltYWdlVG9CZygpIHtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgdGhpcy5maW5hbEltYWdlVXJsICsgJyknO1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnY2VudGVyJztcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9ICduby1yZXBlYXQnO1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICcxMDAlJztcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGVjLWltYWdlLWJnLWxvYWRpbmcnKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW1hZ2VlbGVtZW50U3JjKCkge1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRoaXMuZmluYWxJbWFnZVVybCk7XG4gIH1cblxufVxuXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjSW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2ltYWdlLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjSW1hZ2VEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbRGVjSW1hZ2VEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ltYWdlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZ2FsbGVyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjSW1hZ2VNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UubW9kdWxlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxNb2R1bGUgfSBmcm9tICdAbmd1L2Nhcm91c2VsJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgJ2hhbW1lcmpzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBEZWNJbWFnZU1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBOZ3VDYXJvdXNlbE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNHYWxsZXJ5Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNHYWxsZXJ5Q29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjR2FsbGVyeU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxhYmVsJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9ySGV4fVwiIGRlY0NvbnRyYXN0Rm9udFdpdGhCZz5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgZGl2e21hcmdpbjo0cHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzo3cHggMTJweDtib3JkZXItcmFkaXVzOjI0cHg7YWxpZ24taXRlbXM6Y2VudGVyO2N1cnNvcjpkZWZhdWx0fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xhYmVsQ29tcG9uZW50IHtcblxuICBASW5wdXQoKSBjb2xvckhleCA9ICcjRDNEM0QzJztcblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENvdHJhc3QgY29uZmlndXJhdGlvblxuICpcbiAqIFVzZWQgdG8gZGVmaW5lIHNvbWUgY3VzdG9tIGNvbmZpZ3VyYXRpb24gYXMgY29sb3JzIGFuZCBicmVha3BvaW50XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlQ29uZmlnIHtcbiAgbHVtYUJyZWFrUG9pbnQ6IHN0cmluZztcbiAgbGlnaHRDb2xvcjogc3RyaW5nO1xuICBkYXJrQ29sb3I6IHN0cmluZztcbn1cblxuY29uc3QgREVGQVVMVF9MVU1BX0JSRUFLUE9JTlQgPSAyMDA7XG5cbi8qXG4qIENvbnRyYXN0IEZvbnQgV2l0aCBCYWNrZ3JvdW5kIERpcmVjdGl2ZVxuKlxuKiBDb250cmFzdHMgdGhlIHRleHQgY29sb3Igd2l0aCB0aGUgYmFja2dyb3VuZC1jb2xvciB0byBhdm9pZCB3aGl0ZSBjb2xvciBpbiBsaWdoIGJhY2tncm91bmQgYW5kIGJsYWNrIGNvbG9yIGluIGRhcmtlbiBvbmVzLlxuKiBJdCBjYW4gYmUgdXNlZCBhcyBhdHRyaWJ1dGUgaW4gYW55IGVsZW1lbnQgd2l0aCBvciB3aXRob3V0IHBhc3NpbmcgY3VzdG9tIGNvbmZpZ3VyYXRpb25cbiogRXhhbXBsZSB3aXRob3V0IGN1c3RvbSBjb25maWd1cmF0aW9uOiA8ZGl2IGRlY0NvbnRyYXN0Rm9udFdpdGhCZ1wiPjwvZGl2PlxuKiBFeGFtcGxlIHdpdGggY3VzdG9tIGNvbmZpZ3VyYXRpb246IDxkaXYgW2RlY0NvbnRyYXN0Rm9udFdpdGhCZ109XCJ7ZGFya0NvbG9yOiAncmVkJ31cIj48L2Rpdj5cbipcbiogQ29uZmlndXJhdGlvbiBwYXJhbXM6XG4qIGx1bWFCcmVha1BvaW50OiB0aGUgcG9pbnQgd2hlcmUgd2Ugc2hvdWxkIGNoYW5nZSB0aGUgZm9udCBjb2xvci4gVGhpcyBpcyB0aGUgbGlndGggZmVlbGluZyBicmVha3BvaW50LlxuKiBsaWdodENvbG9yOiB0aGUgdGV4dCBjb2xvciB1c2VkIGluIGRhcmsgYmFja2dyb3VuZHNcbiogZGFya0NvbG9yOiB0aGUgdGV4dCBjb2xvciB1c2VkIGluIGxpZ3RoIGJhY2tncm91bmRzXG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gaGV4VG9SZ2JOZXcoaGV4KSB7XG5cbiAgY29uc3QgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gIHJldHVybiByZXN1bHQgPyB7XG4gICAgcjogcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiAgfSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFuZGFyZGl6ZV9jb2xvcihiZ0NvbG9yKSB7XG5cbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgY3R4LmZpbGxTdHlsZSA9IGJnQ29sb3I7XG5cbiAgcmV0dXJuIGN0eC5maWxsU3R5bGU7XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlY0NvbnRyYXN0Rm9udFdpdGhCZ10nXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIERvQ2hlY2sge1xuXG4gIHByaXZhdGUgY29uZmlnO1xuXG4gIHByaXZhdGUgYmdDb2xvcjtcblxuICBASW5wdXQoKSBzZXQgZGVjQ29udHJhc3RGb250V2l0aEJnKGNvbmZpZzogRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlQ29uZmlnKSB7XG5cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIHRoaXMuZG9EZWNDb250cmFzdEZvbnRXaXRoQmcoKTtcblxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuXG4gICAgdGhpcy5iZ0NvbG9yID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcblxuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuXG4gICAgY29uc3QgYmdDb2xvciA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICBpZiAoYmdDb2xvciAhPT0gdGhpcy5iZ0NvbG9yKSB7XG5cbiAgICAgIHRoaXMuYmdDb2xvciA9IGJnQ29sb3I7XG5cbiAgICAgIHRoaXMuZG9EZWNDb250cmFzdEZvbnRXaXRoQmcoKTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBkb0RlY0NvbnRyYXN0Rm9udFdpdGhCZygpIHtcblxuICAgIGNvbnN0IGx1bWFCcmVha1BvaW50ID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmx1bWFCcmVha1BvaW50KSA/IHRoaXMuY29uZmlnLmx1bWFCcmVha1BvaW50IDogREVGQVVMVF9MVU1BX0JSRUFLUE9JTlQ7XG5cbiAgICBjb25zdCBoZXhhQmdDb2xvciA9IHN0YW5kYXJkaXplX2NvbG9yKHRoaXMuYmdDb2xvcik7XG5cbiAgICBjb25zdCByZ2JDb2xvciA9IGhleFRvUmdiTmV3KGhleGFCZ0NvbG9yKTtcblxuICAgIGNvbnN0IGx1bWEgPSAwLjIxMjYgKiByZ2JDb2xvci5yICsgMC43MTUyICogcmdiQ29sb3IuZyArIDAuMDcyMiAqIHJnYkNvbG9yLmI7IC8vIHBlciBJVFUtUiBCVC43MDlcblxuICAgIGlmIChsdW1hIDwgbHVtYUJyZWFrUG9pbnQpIHtcblxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmNvbG9yID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmxpZ2h0Q29sb3IpID8gdGhpcy5jb25maWcubGlnaHRDb2xvciA6ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5jb2xvciA9ICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5kYXJrQ29sb3IpID8gdGhpcy5jb25maWcuZGFya0NvbG9yIDogJyMyMzJlMzgnO1xuXG4gICAgfVxuXG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGVjLWNvbnRyYXN0LWZvbnQtd2l0aC1iZy5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNDb250cmFzdEZvbnRXaXRoQmdNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGFiZWxDb21wb25lbnQgfSBmcm9tICcuL2RlYy1sYWJlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjQ29udHJhc3RGb250V2l0aEJnTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL2NvbG9yL2NvbnRyYXN0LWZvbnQtd2l0aC1iZy9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIERlY0NvbnRyYXN0Rm9udFdpdGhCZ01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjTGFiZWxDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0xhYmVsQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGFiZWxNb2R1bGUgeyB9XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmlsdGVyR3JvdXAsIEZpbHRlckdyb3VwcyB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuXG4vKlxuICAqIERlY0xpc3RQcmVTZWFyY2hcbiAgKlxuICAqIFVzZWQgYXMgbWlkZGxld2FyZSB0byBtYW5pcHVsYXRlIHRoZSBmaWx0ZXIgYmVmb3JlIGZldGNobmcgdGhlIGRhdGFcbiAgKi9cbmV4cG9ydCB0eXBlIERlY0xpc3RQcmVTZWFyY2ggPSAoZmlsdGVyR3JvdXBzOiBGaWx0ZXJHcm91cHMpID0+IEZpbHRlckdyb3VwcztcblxuXG4vKlxuICAqIERlY0xpc3RGZXRjaE1ldGhvZFxuICAqXG4gICogVXNlZCB0byBmZXRjaCBkYXRhIGZyb20gcmVtb3RlIEFQSVxuICAqL1xuZXhwb3J0IHR5cGUgRGVjTGlzdEZldGNoTWV0aG9kID0gKGVuZHBvaW50OiBzdHJpbmcsIGZpbHRlcjogYW55KSA9PiBPYnNlcnZhYmxlPERlY0xpc3RGZXRjaE1ldGhvZFJlc3BvbnNlPjtcblxuLypcbiAgKiBMaXN0VHlwZVxuICAqXG4gICogTGlzdCB0eXBlc1xuICAqL1xuZXhwb3J0IHR5cGUgRGVjTGlzdFR5cGUgPSAndGFibGUnIHwgJ2dyaWQnO1xuXG4vKlxuICAqIERlY0xpc3RGZXRjaE1ldGhvZFJlc3BvbnNlXG4gICpcbiAgKiBSZXNwb25zZSByZWNlaXZlZCBieSBmZXRjaCBEZWNMaXN0RmV0Y2hNZXRob2RcbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjTGlzdEZldGNoTWV0aG9kUmVzcG9uc2Uge1xuICByZXN1bHQ6IHtcbiAgICByb3dzOiBhbnlbXTtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9O1xufVxuXG4vKlxuICAqIERlY0xpc3RUYWJzRmlsdGVyXG4gICpcbiAgKiBTdHJ1Y3R1cmUgb2YgdGFicyBmaWx0ZXJzXG4gICovXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYnNGaWx0ZXIge1xuICBjb3VudD86IEZ1bmN0aW9uIHwgc3RyaW5nO1xuICBkZWZhdWx0PzogYm9vbGVhbjtcbiAgZmlsdGVyczogRmlsdGVyR3JvdXA7XG4gIGhpZGU/OiBib29sZWFuO1xuICBsYWJlbDogc3RyaW5nO1xuICBsaXN0TW9kZT86IERlY0xpc3RUeXBlO1xuICBwZXJtaXNzaW9ucz86IHN0cmluZ1tdO1xuICB1aWQ/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogYW55ID0ge30pIHtcblxuICAgIHRoaXMuY291bnQgPSBkYXRhLmNvdW50IHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRlZmF1bHQgPSBkYXRhLmRlZmF1bHQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuZmlsdGVycyA9IGRhdGEuZmlsdGVycyB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5oaWRlID0gZGF0YS5oaWRlIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxhYmVsID0gZGF0YS5sYWJlbCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5saXN0TW9kZSA9IGRhdGEubGlzdE1vZGUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucGVybWlzc2lvbnMgPSBkYXRhLnBlcm1pc3Npb25zIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnVpZCA9IGRhdGEudWlkIHx8IGRhdGEubGFiZWw7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0xpc3RGZXRjaE1ldGhvZCwgRGVjTGlzdFRhYnNGaWx0ZXIgfSBmcm9tICcuLy4uL2xpc3QubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtdGFicy1maWx0ZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJsaXN0LXRhYnMtZmlsdGVyLXdyYXBwZXJcIiAqbmdJZj1cInZpc2libGVGaWx0ZXJzIGFzIGZpbHRlcnNcIj5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwiZGVjLXRhYi1oZWFkZXJcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCB0YWJGaWx0ZXIgb2YgZmlsdGVyc1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgKmRlY1Blcm1pc3Npb249XCJ0YWJGaWx0ZXIucGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICBtYXQtYnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzPVwidXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFRhYih0YWJGaWx0ZXIudWlkKVwiXG4gICAgICAgICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJzZWxlY3RlZFRhYlVpZCA9PSAodGFiRmlsdGVyLnVpZClcIj5cbiAgICAgICAgPHNwYW4+e3sgJ2xhYmVsLicgKyB0YWJGaWx0ZXIubGFiZWwgfCB0cmFuc2xhdGUgfCB1cHBlcmNhc2UgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwidGFiRmlsdGVyLmNvdW50ICYmIGNvdW50RW5kcG9pbnQgJiYgY291bnRSZXBvcnRcIiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2Utc21hbGxcIj57eyBnZXRDb3VudE9mKHRhYkZpbHRlci5jb3VudCkgfX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubGlzdC10YWJzLWZpbHRlci13cmFwcGVye21hcmdpbi10b3A6OHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyLmJvdHRvbXtib3JkZXItYm90dG9tOjB9Lmxpc3QtdGFicy1maWx0ZXItd3JhcHBlciAuZGVjLXRhYi1oZWFkZXIgLmJhZGdle21hcmdpbi1sZWZ0OjhweH0ubGlzdC10YWJzLWZpbHRlci13cmFwcGVyIC5kZWMtdGFiLWhlYWRlciAuYmFkZ2UuYmFkZ2UtcGlsbHtwYWRkaW5nOjhweDtmb250LXNpemU6c21hbGw7Ym9yZGVyLXJhZGl1czoyNHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyIC5iYWRnZS5iYWRnZS1waWxsLmJhZGdlLXNtYWxse2ZvbnQtc2l6ZTp4LXNtYWxsO3BhZGRpbmc6NHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBzZWxlY3RlZFRhYlVpZDogc3RyaW5nO1xuXG4gIG5hbWU6IHN0cmluZzsgLy8gbGlzdCB1bmlxdWUgbmFtZSB0byBpZGVudGlmeSB0aGUgdGFiIGluIHVybFxuXG4gIGNvdW50UmVwb3J0OiBhbnk7XG5cbiAgc2VydmljZTogYW55O1xuXG4gIGN1c3RvbUZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2Q7XG5cbiAgQElucHV0KClcbiAgc2V0IGZpbHRlcnModjogRGVjTGlzdFRhYnNGaWx0ZXJbXSkge1xuXG4gICAgaWYgKHRoaXMuX2ZpbHRlcnMgIT09IHYpIHtcblxuICAgICAgdGhpcy5fZmlsdGVycyA9IHYubWFwKGZpbHRlciA9PiBuZXcgRGVjTGlzdFRhYnNGaWx0ZXIoZmlsdGVyKSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBmaWx0ZXJzKCk6IERlY0xpc3RUYWJzRmlsdGVyW10ge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWZhdWx0VGFiOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfZmlsdGVyczogRGVjTGlzdFRhYnNGaWx0ZXJbXSA9IFtdO1xuXG4gIHByaXZhdGUgd2F0aFVybFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgX2NvdW50RW5kcG9pbnQ6IHN0cmluZztcblxuXG4gIC8qXG4gICAqIGNvdW50RW5kcG9pbnRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBjb3VudEVuZHBvaW50KHY6IHN0cmluZykge1xuXG4gICAgaWYgKHRoaXMuX2NvdW50RW5kcG9pbnQgIT09IHYpIHtcblxuICAgICAgdGhpcy5fY291bnRFbmRwb2ludCA9ICh2WzBdICYmIHZbMF0gPT09ICcvJykgPyB2LnJlcGxhY2UoJy8nLCAnJykgOiB2O1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgY291bnRFbmRwb2ludCgpOiBzdHJpbmcge1xuXG4gICAgcmV0dXJuIHRoaXMuX2NvdW50RW5kcG9pbnQ7XG5cbiAgfVxuXG4gIEBPdXRwdXQoJ3NlYXJjaCcpIHNlYXJjaDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCd0YWJDaGFuZ2UnKSB0YWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgZG9GaXJzdExvYWQgPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIHdhaXQgZm9yIHRoZSB1cmwgdG8gY2hhbmdlIGJlZm9yZSBkb2luZyB0aGUgZmlyc3QgbG9hZFxuICAgICAgdGhpcy53YXRjaFRhYkluVXJsUXVlcnkoKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGdldENvdW50T2YoY291bnQ6IHN0cmluZyB8IEZ1bmN0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBjb3VudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvdW50UmVwb3J0ICYmIHRoaXMuY291bnRSZXBvcnRbY291bnRdID49IDAgPyB0aGlzLmNvdW50UmVwb3J0W2NvdW50XSA6ICc/JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY291bnRSZXBvcnQgJiYgY291bnQodGhpcy5jb3VudFJlcG9ydCkgPj0gMCA/IGNvdW50KHRoaXMuY291bnRSZXBvcnQpIDogJz8nO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFRhYih0YWIpIHtcbiAgICB0aGlzLnNldFRhYkluVXJsUXVlcnkodGFiKTtcbiAgfVxuXG4gIHJlbG9hZENvdW50UmVwb3J0KHBheWxvYWQpIHtcblxuICAgIGlmICh0aGlzLmNvdW50RW5kcG9pbnQpIHtcbiAgICAgIGNvbnN0IGZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZCB8fCB0aGlzLnNlcnZpY2UuZ2V0O1xuICAgICAgZmV0Y2hNZXRob2QodGhpcy5jb3VudEVuZHBvaW50LCBwYXlsb2FkKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLmNvdW50UmVwb3J0ID0gcmVzO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0ZWRUYWIoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5maWx0ZXJzID8gdGhpcy5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci51aWQgPT09IHRoaXMuc2VsZWN0ZWRUYWJVaWQpIDogdW5kZWZpbmVkO1xuXG4gIH1cblxuICBnZXQgdmlzaWJsZUZpbHRlcnMoKSB7XG4gICAgY29uc3QgdmlzaWJsZSA9IHRoaXMuZmlsdGVycyA/IHRoaXMuZmlsdGVycy5maWx0ZXIoKGZpbHRlcikgPT4gIWZpbHRlci5oaWRlKSA6IFtdO1xuICAgIHJldHVybiAodmlzaWJsZSAmJiB2aXNpYmxlLmxlbmd0aCA+IDEpID8gdmlzaWJsZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0RGVmYXVsdFRhYigpIHtcblxuICAgIGNvbnN0IGhhc0RlZmF1bHQ6IGFueSA9IHRoaXMuZmlsdGVycy5maW5kKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5kZWZhdWx0O1xuICAgIH0pO1xuXG4gICAgaWYgKGhhc0RlZmF1bHQpIHtcblxuICAgICAgdGhpcy5kZWZhdWx0VGFiID0gaGFzRGVmYXVsdC51aWQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmRlZmF1bHRUYWIgPSB0aGlzLmZpbHRlcnNbMF0udWlkO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIG9uU2VhcmNoID0gKHVpZCwgcmVjb3VudCA9IGZhbHNlKSA9PiB7XG5cbiAgICB0aGlzLnNlbGVjdGVkVGFiVWlkID0gdWlkO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVycykge1xuXG4gICAgICBjb25zdCBmaWx0ZXJUYWIgPSB0aGlzLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnVpZCA9PT0gdWlkKTtcblxuICAgICAgaWYgKGZpbHRlclRhYikge1xuXG4gICAgICAgIHRoaXMuc2VhcmNoLmVtaXQoe1xuICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclRhYi5maWx0ZXJzLFxuICAgICAgICAgIHJlY291bnQ6IHJlY291bnRcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuXG4gIH1cblxuICBwcml2YXRlIGNvbXBvbmVudFRhYk5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICctdGFiJztcbiAgfVxuXG4gIHByaXZhdGUgc2V0VGFiSW5VcmxRdWVyeSh0YWIpIHtcbiAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG4gICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldID0gdGFiO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLiddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcywgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJJblVybFF1ZXJ5KCkge1xuXG4gICAgdGhpcy5kZXRlY3REZWZhdWx0VGFiKCk7XG5cbiAgICB0aGlzLndhdGhVcmxTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG5cbiAgICAgIGNvbnN0IHRhYiA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0gfHwgdGhpcy5kZWZhdWx0VGFiO1xuXG4gICAgICBpZiAodGFiICE9PSB0aGlzLnNlbGVjdGVkVGFiVWlkKSB7XG5cbiAgICAgICAgdGhpcy5vblNlYXJjaCh0YWIpO1xuXG4gICAgICAgIHRoaXMudGFiQ2hhbmdlLmVtaXQodGFiKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpIHtcbiAgICBpZiAodGhpcy53YXRoVXJsU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLndhdGhVcmxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtYWR2YW5jZWQtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG5cbiAgPGRpdiBmeEZsZXg+XG5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVJlZlwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Zvcm06IGZvcm19XCJcbiAgICA+PC9uZy1jb250YWluZXI+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXg+XG5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBlbmRcIiBmeExheW91dEdhcD1cIjhweFwiPlxuXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwic3VibWl0KClcIj57eyAnbGFiZWwuc2VhcmNoJyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uIChjbGljayk9XCJyZXNldCgpXCI+e3sgJ2xhYmVsLnJlc2V0JyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuXG5cblxuXG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmb3JtOiBhbnkgPSB7fTtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuICBvblNlYXJjaCA9ICgpID0+IHt9O1xuXG4gIG9uQ2xlYXIgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5vbkNsZWFyKCk7XG4gIH1cblxuICBzdWJtaXQoKSB7XG4gICAgdGhpcy5vblNlYXJjaCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vLi4vbGlzdC10YWJzLWZpbHRlci9saXN0LXRhYnMtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0xpc3RQcmVTZWFyY2ggfSBmcm9tICcuLy4uL2xpc3QubW9kZWxzJztcbmltcG9ydCB7IEZpbHRlckdyb3VwcyB9IGZyb20gJy4vLi4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGlzdC1maWx0ZXItd3JhcHBlclwiPlxuICA8ZGl2IGZ4TGF5b3V0PVwicm93IHdyYXBcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgICA8IS0tXG4gICAgICBDb3VudGVyXG4gICAgLS0+XG4gICAgPGRpdiBmeEZsZXg9XCIzMFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvdW50ID49IDAgJiYgIWxvYWRpbmdcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA9PT0gMFwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+e3sgXCJsYWJlbC5yZWNvcmQtbm90LWZvdW5kXCIgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnQgPT09IDFcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPnt7IFwibGFiZWwub25lLXJlY29yZC1mb3VuZFwiIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID4gMVwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+IHt7IFwibGFiZWwucmVjb3Jkcy1mb3VuZFwiIHwgdHJhbnNsYXRlOntjb3VudDpjb3VudH0gfX08L3NwYW4+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgZnhGbGV4PVwiNzBcIiBjbGFzcz1cInRleHQtcmlnaHRcIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIiBjbGFzcz1cInNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdj5cblxuICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBjbGFzcz1cImlucHV0LXNlYXJjaC1jb250YWluZXJcIiBbY2xhc3MuYWN0aXZlXT1cInNob3dTZWFyY2hJbnB1dFwiPlxuICAgICAgICAgICAgPCEtLSBnYXAgLS0+XG4gICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4tdG9vZ2xlLXNlYXJjaFwiPlxuICAgICAgICAgICAgICA8bWF0LWljb24gKGNsaWNrKT1cInRvZ2dsZVNlYXJjaElucHV0KClcIj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGZvcm0gZnhGbGV4IHJvbGU9XCJmb3JtXCIgKHN1Ym1pdCk9XCJvblNlYXJjaCgpXCI+XG4gICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjE2cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgY2xhc3M9XCJpbnB1dC1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJhci1oXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBmeEZsZXggI2lucHV0U2VhcmNoIG5hbWU9XCJzZWFyY2hcIiBbKG5nTW9kZWwpXT1cImZpbHRlckZvcm0uc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImFkdmFuY2VkRmlsdGVyQ29tcG9uZW50XCIgY2xhc3M9XCJjbGlja1wiIChjbGljayk9XCJ0b2dnbGVBZHZhbmNlZEZpbHRlcigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlYy1zbWFsbCBidG4tb3Blbi1hZHZhbmNlZC1zZWFyY2hcIj57e1wibGFiZWwuYWR2YW5jZWQtb3B0aW9uc1wiIHwgdHJhbnNsYXRlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPCEtLWdhcC0tPlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS1SZWZyZXNoIHNlYXJjaC0tPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4taW5mbyBtYXJnaW4taWNvblwiIChjbGljayk9XCJvblNlYXJjaCgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+cmVmcmVzaDwvbWF0LWljb24+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLUNsZWFyIGZpbHRlcnMtLT5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiICpuZ0lmPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aFwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWluZm9cIiAoY2xpY2spPVwib25DbGVhcigpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+Y2xlYXI8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiICpuZ0lmPVwic2hvd0luZm9CdXR0b25cIj5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1pbmZvXCIgKGNsaWNrKT1cIm9uQ2xpY2tJbmZvKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5pbmZvX291dGxpbmU8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG5cbiAgPGRpdiAqbmdJZj1cInNob3dBZHZhbmNlZEZpbHRlclwiPlxuXG4gICAgPG1hdC1jYXJkIGNsYXNzPVwiYWR2YW5jZWQtc2VhcmNoLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsncmVtb3ZlLWJ1dHRvbi1lbmFibGVkJzogZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aH1cIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG5cbiAgICAgICAgPGEgKGNsaWNrKT1cImNsb3NlRmlsdGVycygpXCIgY2xhc3M9XCJidG4tY2xvc2UtYWR2YW5jZWQtc2VhcmNoXCI+XG5cbiAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG5cbiAgICAgICAgPC9hPlxuXG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1hZHZhbmNlZC1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9tYXQtY2FyZD5cblxuICA8L2Rpdj5cblxuICA8ZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWVcbiAgICAqbmdJZj1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGhcIlxuICAgIFtmaWx0ZXJHcm91cHNdPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnNcIlxuICAgIChyZW1vdmUpPVwicmVtb3ZlRGVjRmlsdGVyR3JvdXAoJGV2ZW50KVwiXG4gICAgKGVkaXQpPVwiZWRpdERlY0ZpbHRlckdyb3VwKCRldmVudClcIj48L2RlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lPlxuXG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LXRhYnMtZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmxpc3QtZmlsdGVyLXdyYXBwZXJ7bWFyZ2luOjAgMCAxNnB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5saXN0LWZpbHRlci13cmFwcGVyIC5tYXQtaWNvbntjb2xvcjojOTk5fS5saXN0LWZpbHRlci13cmFwcGVyIC5zZWFyY2gtdGVybS1pbnB1dHt3aWR0aDo1MDBweDttYXJnaW4tcmlnaHQ6OHB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5pbmxpbmUtZm9ybXtkaXNwbGF5OmlubGluZS1ibG9ja30ubGlzdC1maWx0ZXItd3JhcHBlciAuYWR2YW5jZWQtc2VhcmNoLWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NzRweDt6LWluZGV4OjE7cmlnaHQ6MzBweDt3aWR0aDo1NTJweH0ubGlzdC1maWx0ZXItd3JhcHBlciAuYWR2YW5jZWQtc2VhcmNoLWNvbnRhaW5lci5yZW1vdmUtYnV0dG9uLWVuYWJsZWR7cmlnaHQ6NjJweDt3aWR0aDo1NTFweH0ubGlzdC1maWx0ZXItd3JhcHBlciAuYWR2YW5jZWQtc2VhcmNoLWNvbnRhaW5lciAuYnRuLWNsb3NlLWFkdmFuY2VkLXNlYXJjaHtjdXJzb3I6cG9pbnRlcn0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lcnt0cmFuc2l0aW9uOmFsbCAuM3MgZWFzZTtvdmVyZmxvdzpoaWRkZW47d2lkdGg6NDBweDtoZWlnaHQ6NTBweH0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lci5hY3RpdmV7YmFja2dyb3VuZDojZjhmOGZhO2NvbG9yOiM5OTk7d2lkdGg6NjAwcHh9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIuYWN0aXZlIC5idG4tb3Blbi1hZHZhbmNlZC1zZWFyY2h7ZGlzcGxheTppbmxpbmV9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaHt3aWR0aDoxMDAlfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2ggaW5wdXR7Zm9udDppbmhlcml0O2JhY2tncm91bmQ6MCAwO2NvbG9yOmN1cnJlbnRDb2xvcjtib3JkZXI6bm9uZTtvdXRsaW5lOjA7cGFkZGluZzowO3dpZHRoOjEwMCU7dmVydGljYWwtYWxpZ246Ym90dG9tfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyIC5idG4tb3Blbi1hZHZhbmNlZC1zZWFyY2h7ZGlzcGxheTpub25lfS5zZWFyY2gtY29udGFpbmVyIC5idG4tY2xlYXItc2VhcmNoe3BhZGRpbmctcmlnaHQ6MTVweDtjdXJzb3I6cG9pbnRlcjtjb2xvcjojOTk5O3dpZHRoOjkwcHh9LnNlYXJjaC1jb250YWluZXIgLmJ0bi1pbmZvLC5zZWFyY2gtY29udGFpbmVyIC5idG4tdG9vZ2xlLXNlYXJjaHtmb250LXNpemU6MjFweDtjdXJzb3I6cG9pbnRlcjtoZWlnaHQ6MjFweDtjb2xvcjojOTk5fS5zZWFyY2gtY29udGFpbmVyIC5iYXItaHtib3JkZXItcmlnaHQ6MnB4IHNvbGlkICNkMGQwZDA7aGVpZ2h0OjIxcHg7bWFyZ2luOmF1dG8gMDtkaXNwbGF5OmlubGluZS1ibG9ja31gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIGNvdW50OiBudW1iZXI7XG4gIHNob3dTZWFyY2hJbnB1dDogYm9vbGVhbjtcbiAgc2hvd0FkdmFuY2VkRmlsdGVyOiBib29sZWFuO1xuICBmaWx0ZXJGb3JtOiBhbnkgPSB7XG4gICAgc2VhcmNoOiB1bmRlZmluZWRcbiAgfTtcbiAgZmlsdGVyR3JvdXBzOiBGaWx0ZXJHcm91cHM7XG4gIGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzOiBGaWx0ZXJHcm91cHM7XG4gIGN1cnJlbnRTdGF0dXNGaWx0ZXJlZDogc3RyaW5nO1xuICB0YWJzRmlsdGVyOiBhbnk7XG4gIGVkaXRpb25Hcm91cEluZGV4OiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgbG9hZGluZzogYm9vbGVhbjtcbiAgaXNJdEZpcnN0TG9hZCA9IHRydWU7XG5cbiAgLypcbiAgICogY2xpY2thYmxlQ29udGFpbmVyQ2xhc3NcbiAgICpcbiAgICogV2hlcmUgdGhlIGNsaWNrIHdhdGNoZXIgc2hvdWxkIGJlIGxpc3RlbmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBjbGlja2FibGVDb250YWluZXJDbGFzcyA9ICdsaXN0LWZpbHRlci13cmFwcGVyJztcblxuICBwcml2YXRlIGlubmVyRGVjRmlsdGVyR3JvdXBzOiBhbnlbXTtcblxuICBwcml2YXRlIGN1cnJlbnRCYXNlNjRGaWx0ZXI6IHN0cmluZztcblxuICBwcml2YXRlIHRhYnNGaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIHdhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KCkgcHJlU2VhcmNoOiBEZWNMaXN0UHJlU2VhcmNoO1xuXG4gIEBJbnB1dCgpIHNob3dJbmZvQnV0dG9uO1xuXG4gIEBJbnB1dCgpIGhhc1BlcnNpc3RlbmNlID0gdHJ1ZTtcblxuICBAT3V0cHV0KCdzZWFyY2gnKSBzZWFyY2g6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXRTZWFyY2gnKSBpbnB1dFNlYXJjaDtcblxuICBAQ29udGVudENoaWxkKERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50KSB0YWJzRmlsdGVyQ29tcG9uZW50OiBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudDtcblxuICBAQ29udGVudENoaWxkKERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCkgYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQ6IERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53YXRjaFRhYnNGaWx0ZXIoKTtcbiAgICB0aGlzLndhdGNoQ2xpY2soKTtcbiAgICB0aGlzLndhdGNoVXJsRmlsdGVyKCk7XG4gICAgdGhpcy5jb25maWd1cmVBZHZhbmNlZEZpbHRlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdDbGljaygpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFic0ZpbHRlcigpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVXJsRmlsdGVyKCk7XG4gIH1cblxuICB0b2dnbGVTZWFyY2hJbnB1dCgpIHtcbiAgICB0aGlzLnNob3dTZWFyY2hJbnB1dCA9ICF0aGlzLnNob3dTZWFyY2hJbnB1dDtcbiAgICBpZiAoIXRoaXMuc2hvd1NlYXJjaElucHV0KSB7XG4gICAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dFNlYXJjaC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9LCAxODApO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUFkdmFuY2VkRmlsdGVyKCRldmVudCkge1xuXG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSAhdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXI7XG5cbiAgfVxuXG4gIG9uU2VhcmNoID0gKGFwcGVuZEN1cnJlbnRGb3JtID0gdHJ1ZSkgPT4ge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyRm9ybSAmJiBhcHBlbmRDdXJyZW50Rm9ybSkge1xuXG4gICAgICBjb25zdCBuZXdEZWNGaWx0ZXJHcm91cCA9IHtcblxuICAgICAgICBmaWx0ZXJzOiBbXVxuXG4gICAgICB9O1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckZvcm0pLmZvckVhY2goa2V5ID0+IHtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJGb3JtW2tleV0pIHtcblxuICAgICAgICAgIGNvbnN0IGZpbHRlciA9IHtwcm9wZXJ0eToga2V5LCB2YWx1ZTogdGhpcy5maWx0ZXJGb3JtW2tleV19O1xuXG4gICAgICAgICAgbmV3RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKGZpbHRlcik7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAobmV3RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmVkaXRpb25Hcm91cEluZGV4ID49IDApIHtcblxuICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwc1t0aGlzLmVkaXRpb25Hcm91cEluZGV4XSA9IG5ld0RlY0ZpbHRlckdyb3VwO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5wdXNoKG5ld0RlY0ZpbHRlckdyb3VwKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IFtuZXdEZWNGaWx0ZXJHcm91cF07XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLnJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHRydWUpO1xuXG4gIH1cblxuICBvbkNsZWFyKCkge1xuXG4gICAgdGhpcy5jbG9zZUZpbHRlcnMoKTtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmNsZWFyRmlsdGVyRm9ybSgpO1xuXG4gICAgdGhpcy5vblNlYXJjaCgpO1xuXG4gIH1cblxuICByZW1vdmVEZWNGaWx0ZXJHcm91cChncm91cEluZGV4KSB7XG5cbiAgICB0aGlzLmZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzLmZpbHRlcigoZ3JvdXAsIGluZGV4KSA9PiBpbmRleCAhPT0gZ3JvdXBJbmRleCk7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5maWx0ZXIoKGdyb3VwLCBpbmRleCkgPT4gaW5kZXggIT09IGdyb3VwSW5kZXgpO1xuXG4gICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMuZmlsdGVyKChncm91cCwgaW5kZXgpID0+IGluZGV4ICE9PSBncm91cEluZGV4KTtcblxuICAgIHRoaXMub25TZWFyY2godHJ1ZSk7XG5cbiAgfVxuXG4gIGVkaXREZWNGaWx0ZXJHcm91cChncm91cEluZGV4KSB7XG5cbiAgICB0aGlzLmVkaXRpb25Hcm91cEluZGV4ID0gZ3JvdXBJbmRleDtcblxuICAgIGNvbnN0IHRvRWRpdERlY0ZpbHRlckdyb3VwID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFic1tncm91cEluZGV4XTtcblxuICAgIGlmICh0b0VkaXREZWNGaWx0ZXJHcm91cCAmJiB0b0VkaXREZWNGaWx0ZXJHcm91cC5maWx0ZXJzLmxlbmd0aCA+IDApIHtcblxuICAgICAgdGhpcy5yZWxvYWRGb3JtV2l0aEdpdmVuRGVjRmlsdGVyR3JvdXBlKHRvRWRpdERlY0ZpbHRlckdyb3VwLmZpbHRlcnMpO1xuXG4gICAgfVxuXG4gIH1cblxuICByZWxvYWRDb3VudFJlcG9ydCA9IChwYXlsb2FkKSA9PiB7XG5cbiAgICBpZiAodGhpcy50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIHRoaXMudGFic0ZpbHRlckNvbXBvbmVudC5yZWxvYWRDb3VudFJlcG9ydChwYXlsb2FkKTtcblxuICAgIH1cblxuICB9XG5cbiAgY2xlYXJGaWx0ZXJGb3JtID0gKCkgPT4ge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyRm9ybSkge1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckZvcm0pLmZvckVhY2goa2V5ID0+IHtcblxuICAgICAgICB0aGlzLmZpbHRlckZvcm1ba2V5XSA9IHVuZGVmaW5lZDtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgb25DbGlja0luZm8oKSB7XG4gICAgY29uc29sZS5sb2coJ29uIGNsaWNrIGluZm8uIE5vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgLypcbiAgICogYXBwZW5kVG9DdXJyZW50RmlsdGVyc1xuICAgKlxuICAgKiBBcHBlbmQgYSBmaWx0ZXIgdG8gdGhlIGN1cnJlbnQgZmlsdGVyIGdyb3Vwc1xuICAgKi9cbiAgYXBwZW5kVG9DdXJyZW50RGVjRmlsdGVyR3JvdXBzKHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSkge1xuXG4gICAgY29uc3QgZmlsdGVyID0ge1xuICAgICAgJ3Byb3BlcnR5JzogcHJvcGVydHlOYW1lLFxuICAgICAgJ3ZhbHVlJzogcHJvcGVydHlWYWx1ZSxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpIHtcblxuICAgICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5mb3JFYWNoKChmaWx0ZXJHcm91cCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlckV4aXN0c0luVGhpc0dyb3VwID0gZmlsdGVyR3JvdXAuZmlsdGVycy5maW5kKGZpbHRlckdyb3VwRmlsdGVyID0+IGZpbHRlckdyb3VwRmlsdGVyLnByb3BlcnR5ID09PSBmaWx0ZXIucHJvcGVydHkpO1xuXG4gICAgICAgIGlmICghZmlsdGVyRXhpc3RzSW5UaGlzR3JvdXApIHtcblxuICAgICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMucHVzaChmaWx0ZXIpO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gW3tmaWx0ZXJzOiBbZmlsdGVyXX1dO1xuXG4gICAgfVxuXG4gICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM7XG5cbiAgICB0aGlzLnJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgfVxuXG4gIGNsb3NlRmlsdGVycygpIHtcblxuICAgIHRoaXMuZWRpdGlvbkdyb3VwSW5kZXggPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9IGZhbHNlO1xuXG4gICAgdGhpcy5zaG93U2VhcmNoSW5wdXQgPSBmYWxzZTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZWFjYWxjdWxhdGVBbmRFbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcyhyZWNvdW50ID0gZmFsc2UpIHtcblxuICAgIHRoaXMuZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMocmVjb3VudClcbiAgICAudGhlbigoKSA9PiB7XG5cbiAgICAgIGlmICghdGhpcy5oYXNQZXJzaXN0ZW5jZSkge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgICAgfVxuXG4gICAgICB0aGlzLnJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5KClcbiAgICAgIC50aGVuKCgpID0+IHtcblxuICAgICAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICAgIH0pO1xuXG5cbiAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZWxvYWRGb3JtV2l0aEdpdmVuRGVjRmlsdGVyR3JvdXBlKGZpbHRlcnMpIHtcblxuICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICBmaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcblxuICAgICAgaWYgKGZpbHRlci52YWx1ZSkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRm9ybVtmaWx0ZXIucHJvcGVydHldID0gZmlsdGVyLnZhbHVlO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHRoaXMub3BlbkZpbHRlcnMoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuRmlsdGVycygpIHtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gdHJ1ZTtcblxuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gdHJ1ZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVBZHZhbmNlZEZpbHRlcigpIHtcblxuICAgIGlmICh0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQuZm9ybSA9IHRoaXMuZmlsdGVyRm9ybTtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5vblNlYXJjaCA9IHRoaXMub25TZWFyY2g7XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQub25DbGVhciA9IHRoaXMuY2xlYXJGaWx0ZXJGb3JtO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VhcmNoLnN1YnNjcmliZShmaWx0ZXJFdmVudCA9PiB7XG4gICAgICAgIHRoaXMudGFic0ZpbHRlciA9IGZpbHRlckV2ZW50LmZpbHRlcnM7XG4gICAgICAgIHRoaXMuZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHModGhpcy5pc0l0Rmlyc3RMb2FkIHx8IGZpbHRlckV2ZW50LnJlY291bnQpO1xuICAgICAgICB0aGlzLmlzSXRGaXJzdExvYWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpIHtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXIgPSBbXTtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicyA9IFtdO1xuXG4gICAgaWYgKHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgJiYgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5sZW5ndGgpIHtcblxuICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5mb3JFYWNoKChmaWx0ZXJHcm91cDoge2ZpbHRlcnM6IGFueVtdfSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlckdyb3VwQ29weSA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJHcm91cC5maWx0ZXJzLnNsaWNlKClcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy50YWJzRmlsdGVyKSB7XG4gICAgICAgICAgZmlsdGVyR3JvdXBDb3B5LmZpbHRlcnMucHVzaCguLi50aGlzLnRhYnNGaWx0ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudEZpbHRlci5wdXNoKGZpbHRlckdyb3VwQ29weSk7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5V2l0aG91dFRhYnMgPSB7XG4gICAgICAgICAgZmlsdGVyczogZmlsdGVyR3JvdXAuZmlsdGVycy5zbGljZSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgY3VycmVudEZpbHRlcldpdGhvdXRUYWJzLnB1c2goZmlsdGVyR3JvdXBDb3B5V2l0aG91dFRhYnMpO1xuXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy50YWJzRmlsdGVyKSB7XG5cbiAgICAgIGN1cnJlbnRGaWx0ZXIucHVzaCh7ZmlsdGVyczogdGhpcy50YWJzRmlsdGVyfSk7XG5cbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlckdyb3VwcyA9IGN1cnJlbnRGaWx0ZXIubGVuZ3RoID8gY3VycmVudEZpbHRlciA6IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMubGVuZ3RoID8gY3VycmVudEZpbHRlcldpdGhvdXRUYWJzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLypcbiAgICogZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHNcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMocmVjb3VudCA9IGZhbHNlKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cbiAgICAgIHRoaXMubW91bnRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgICAgIGlmICh0aGlzLnByZVNlYXJjaCkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gdGhpcy5wcmVTZWFyY2godGhpcy5maWx0ZXJHcm91cHMpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VhcmNoLmVtaXQoe1xuICAgICAgICBmaWx0ZXJHcm91cHM6IHRoaXMuZmlsdGVyR3JvdXBzLFxuICAgICAgICByZWNvdW50OiByZWNvdW50XG4gICAgICB9KTtcblxuICAgICAgcmVzKCk7XG5cbiAgICB9KTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBhY3RCeUNsaWNrUG9zaXRpb25cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZGV0ZWN0XG4gICAqL1xuICBwcml2YXRlIGFjdEJ5Q2xpY2tQb3NpdGlvbiA9ICgkZXZlbnQpID0+IHtcblxuICAgIGlmIChldmVudCAmJiBldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGNsaWNrZWRJbnNpZGVGaWx0ZXIgPSAkZXZlbnRbJ3BhdGgnXS5maW5kKHBhdGggPT4ge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAke3BhdGhbJ2NsYXNzTmFtZSddfWAgfHwgJyc7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlV3JhcHBlciA9IGNsYXNzTmFtZS5pbmRleE9mKHRoaXMuY2xpY2thYmxlQ29udGFpbmVyQ2xhc3MpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3B0aW9uID0gY2xhc3NOYW1lLmluZGV4T2YoJ21hdC1vcHRpb24nKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZURhdGVQaWNrZXIgPSBjbGFzc05hbWUuaW5kZXhPZignbWF0LWRhdGVwaWNrZXItY29udGVudCcpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3ZlcmxheUNvbnRhaW5lciA9IGNsYXNzTmFtZS5pbmRleE9mKCdjZGstb3ZlcmxheS1jb250YWluZXInKSA+PSAwO1xuXG4gICAgICAgIHJldHVybiBpbnNpZGVXcmFwcGVyIHx8IGluc2lkZU9wdGlvbiB8fCBpbnNpZGVEYXRlUGlja2VyIHx8IGluc2lkZU92ZXJsYXlDb250YWluZXI7XG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWNsaWNrZWRJbnNpZGVGaWx0ZXIpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaENsaWNrKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5hY3RCeUNsaWNrUG9zaXRpb24sIHRydWUpO1xuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nQ2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nQ2xpY2soKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmFjdEJ5Q2xpY2tQb3NpdGlvbiwgdHJ1ZSk7XG4gIH1cblxuICAvKlxuICAgKiBjb21wb25lbnRUYWJOYW1lXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGNvbXBvbmVudEZpbHRlck5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICctZmlsdGVyJztcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVXJsRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVXJsRmlsdGVyKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc1BlcnNpc3RlbmNlKSB7XG5cbiAgICAgIHJldHVybjtcblxuICAgIH1cblxuICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG5cbiAgICAgIGNvbnN0IGludGVydmFsID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICBpZiAodGhpcy5uYW1lKSB7XG5cbiAgICAgICAgICBjb25zdCBiYXNlNjRGaWx0ZXIgPSBwYXJhbXNbdGhpcy5jb21wb25lbnRGaWx0ZXJOYW1lKCldO1xuXG4gICAgICAgICAgaWYgKGJhc2U2NEZpbHRlcikge1xuXG4gICAgICAgICAgICBpZiAoYmFzZTY0RmlsdGVyICE9PSB0aGlzLmN1cnJlbnRCYXNlNjRGaWx0ZXIpIHtcblxuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmdldEpzb25Gcm9tQmFzZTY0RmlsdGVyKGJhc2U2NEZpbHRlcik7XG5cbiAgICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IGZpbHRlcjtcblxuICAgICAgICAgICAgICB0aGlzLm1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gICAgICAgICAgICAgIHRoaXMub25TZWFyY2goKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuXG4gICAgICAgIH1cblxuICAgICAgfSwgMTApO1xuXG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVXJsRmlsdGVyKCkge1xuXG4gICAgaWYgKHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24pIHtcblxuICAgICAgdGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZWZyZXNoRmlsdGVySW5VcmxRdWVyeVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWZyZXNoRmlsdGVySW5VcmxRdWVyeSgpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgY29uc3QgZmlsdGVyQmFzZTY0ID0gdGhpcy5nZXRCYXNlNjRGaWx0ZXJGcm9tRGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgICAgIHRoaXMuc2V0RmlsdGVySW5VcmxRdWVyeShmaWx0ZXJCYXNlNjQpLnRoZW4ocmVzLCByZWopO1xuXG4gICAgfSk7XG5cblxuICB9XG5cbiAgLypcbiAgICogc2V0RmlsdGVySW5VcmxRdWVyeVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRGaWx0ZXJJblVybFF1ZXJ5KGZpbHRlcikge1xuXG4gICAgdGhpcy5jdXJyZW50QmFzZTY0RmlsdGVyID0gZmlsdGVyO1xuXG4gICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuXG4gICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRGaWx0ZXJOYW1lKCldID0gZmlsdGVyO1xuXG4gICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLiddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcywgcmVwbGFjZVVybDogdHJ1ZSB9KTtcblxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVXJsRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGdldEJhc2U2NEZpbHRlckZyb21EZWNGaWx0ZXJHcm91cHMoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgJiYgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGJhc2U2NEZpbHRlciA9IGJ0b2EoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpKSk7XG4gICAgICBjb25zdCBiYXNlRmlsdGVyV2l0aG91dEVxdWFsU2lnbiA9IGJhc2U2NEZpbHRlci5yZXBsYWNlKC89L2csICcnKTtcbiAgICAgIHJldHVybiBiYXNlRmlsdGVyV2l0aG91dEVxdWFsU2lnbjsgLy8gcmVtb3ZlcyA9IGJlZm9yIGVzZXQgdGhlIGZpbHRlclxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1VybEZpbHRlclxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvOTAyMDQwOS9pcy1pdC1vay10by1yZW1vdmUtdGhlLWVxdWFsLXNpZ25zLWZyb20tYS1iYXNlNjQtc3RyaW5nXG4gICAqL1xuICBwcml2YXRlIGdldEpzb25Gcm9tQmFzZTY0RmlsdGVyKGJhc2U2NEZpbHRlcikge1xuICAgIGNvbnN0IGJhc2U2NFBhZExlbiA9IChiYXNlNjRGaWx0ZXIubGVuZ3RoICUgNCkgPiAwID8gNCAtIChiYXNlNjRGaWx0ZXIubGVuZ3RoICUgNCkgOiAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlNjRQYWRMZW47IGkrKykge1xuICAgICAgYmFzZTY0RmlsdGVyICs9ICc9JzsgLy8gYWRkID0gYmVmb3JlIHJlYWRkIHRoZSBmaWx0ZXJcbiAgICB9XG5cbiAgICBsZXQgZmlsdGVyT2JqZWN0O1xuXG4gICAgdHJ5IHtcbiAgICAgIGZpbHRlck9iamVjdCA9IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KGF0b2IoYmFzZTY0RmlsdGVyKSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtc2cgPSAnTGlzdEZpbHRlckNvbXBvbmVudDo6IEZhaWxlZCB0byBwYXJzZSB0aGUgZmlsdGVyLiBUaGUgdmFsdWUgaXMgbm90IHZhbGlkIGFuZCB0aGUgZmlsdGVyIHdhcyByZW1vdmVkLiBGaWx0ZXIgdmFsdWU6ICc7XG4gICAgICBjb25zb2xlLmVycm9yKG1zZywgYmFzZTY0RmlsdGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmFzZTY0RmlsdGVyID8gZmlsdGVyT2JqZWN0IDogdW5kZWZpbmVkO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJmaWx0ZXJHcm91cHM/Lmxlbmd0aFwiIGNsYXNzPVwiZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlclwiPlxuXG4gIDxtYXQtY2hpcC1saXN0PlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZ3JvdXAgb2YgZmlsdGVyR3JvdXBzOyBsZXQgZ3JvdXBJbmRleCA9IGluZGV4O1wiPlxuICAgICAgPG1hdC1jaGlwICpuZ0lmPVwiZ3JvdXA/LmZpbHRlcnNcIiAoY2xpY2spPVwiZWRpdERlY0ZpbHRlckdyb3VwKCRldmVudCwgZ3JvdXBJbmRleClcIj5cblxuICAgICAgICA8c3BhbiAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGdyb3VwPy5maWx0ZXJzOyBsZXQgbGFzdEZpbHRlciA9IGxhc3Q7XCIgY2xhc3M9XCJpdGVtLXdyYXBwZXJcIj5cblxuICAgICAgICAgIDxzcGFuIFtuZ1N3aXRjaF09XCJmaWx0ZXIucHJvcGVydHkgIT09ICdzZWFyY2gnXCI+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+e3sgJ2xhYmVsLicgKyBmaWx0ZXIucHJvcGVydHkgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaERlZmF1bHQ+e3sgJ2xhYmVsLktleXdvcmQnIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuXG4gICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgPHNwYW4+OiZuYnNwOzwvc3Bhbj5cblxuICAgICAgICAgIDxzcGFuIFtuZ1N3aXRjaF09XCJnZXRWYWx1ZXR5cGUoZmlsdGVyLnZhbHVlKVwiIGNsYXNzPVwidmFsdWUtd3JhcHBlclwiPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCI+e3sgZmlsdGVyLnZhbHVlIHwgZGF0ZSB9fTwvc3Bhbj5cblxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoRGVmYXVsdD57eyBmaWx0ZXIudmFsdWUgfX08L3NwYW4+XG5cbiAgICAgICAgICA8L3NwYW4gPlxuXG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCIhbGFzdEZpbHRlclwiPiw8L3NwYW4+XG5cbiAgICAgICAgICAmbmJzcDtcblxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIChjbGljayk9XCJyZW1vdmVEZWNGaWx0ZXJHcm91cCgkZXZlbnQsIGdyb3VwSW5kZXgpXCI+cmVtb3ZlX2NpcmNsZTwvaT5cblxuICAgICAgPC9tYXQtY2hpcD5cblxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gIDwvbWF0LWNoaXAtbGlzdD5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC10YWItYm9keS1jb250ZW50e3BhZGRpbmc6MTZweCAwfS5tYXQtZm9ybS1maWVsZC1wcmVmaXh7bWFyZ2luLXJpZ2h0OjhweCFpbXBvcnRhbnR9Lm1hdC1mb3JtLWZpZWxkLXN1ZmZpeHttYXJnaW4tbGVmdDo4cHghaW1wb3J0YW50fS5tYXQtZWxldmF0aW9uLXowe2JveC1zaGFkb3c6MCAwIDAgMCByZ2JhKDAsMCwwLC4yKSwwIDAgMCAwIHJnYmEoMCwwLDAsLjE0KSwwIDAgMCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MXtib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejJ7Ym94LXNoYWRvdzowIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDJweCAycHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoze2JveC1zaGFkb3c6MCAzcHggM3B4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAzcHggNHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDhweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NHtib3gtc2hhZG93OjAgMnB4IDRweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNHB4IDVweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo1e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA1cHggOHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE0cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejZ7Ym94LXNoYWRvdzowIDNweCA1cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDZweCAxMHB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDE4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejd7Ym94LXNoYWRvdzowIDRweCA1cHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDdweCAxMHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAycHggMTZweCAxcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo4e2JveC1zaGFkb3c6MCA1cHggNXB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCA4cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgM3B4IDE0cHggMnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OXtib3gtc2hhZG93OjAgNXB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOXB4IDEycHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNnB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEwe2JveC1zaGFkb3c6MCA2cHggNnB4IC0zcHggcmdiYSgwLDAsMCwuMiksMCAxMHB4IDE0cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAxOHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejExe2JveC1zaGFkb3c6MCA2cHggN3B4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMXB4IDE1cHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDRweCAyMHB4IDNweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEye2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxMnB4IDE3cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyMnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejEze2JveC1zaGFkb3c6MCA3cHggOHB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxM3B4IDE5cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNHB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE0e2JveC1zaGFkb3c6MCA3cHggOXB4IC00cHggcmdiYSgwLDAsMCwuMiksMCAxNHB4IDIxcHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDVweCAyNnB4IDRweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE1e2JveC1zaGFkb3c6MCA4cHggOXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxNXB4IDIycHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAyOHB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE2e2JveC1zaGFkb3c6MCA4cHggMTBweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTZweCAyNHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMzBweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxN3tib3gtc2hhZG93OjAgOHB4IDExcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE3cHggMjZweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMycHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTh7Ym94LXNoYWRvdzowIDlweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxOHB4IDI4cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDdweCAzNHB4IDZweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE5e2JveC1zaGFkb3c6MCA5cHggMTJweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMTlweCAyOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzZweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMHtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMHB4IDMxcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCAzOHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIxe2JveC1zaGFkb3c6MCAxMHB4IDEzcHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIxcHggMzNweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQwcHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjJ7Ym94LXNoYWRvdzowIDEwcHggMTRweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjJweCAzNXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggNDJweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyM3tib3gtc2hhZG93OjAgMTFweCAxNHB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyM3B4IDM2cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NHB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejI0e2JveC1zaGFkb3c6MCAxMXB4IDE1cHggLTdweCByZ2JhKDAsMCwwLC4yKSwwIDI0cHggMzhweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOXB4IDQ2cHggOHB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJhZGdlLXNtYWxsIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6NnB4fS5tYXQtYmFkZ2UtbGFyZ2UgLm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtc2l6ZToyNHB4fS5tYXQtaDEsLm1hdC1oZWFkbGluZSwubWF0LXR5cG9ncmFwaHkgaDF7Zm9udDo0MDAgMjRweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMiwubWF0LXRpdGxlLC5tYXQtdHlwb2dyYXBoeSBoMntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWgzLC5tYXQtc3ViaGVhZGluZy0yLC5tYXQtdHlwb2dyYXBoeSBoM3tmb250OjQwMCAxNnB4LzI4cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg0LC5tYXQtc3ViaGVhZGluZy0xLC5tYXQtdHlwb2dyYXBoeSBoNHtmb250OjQwMCAxNXB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTZweH0ubWF0LWg1LC5tYXQtdHlwb2dyYXBoeSBoNXtmb250OjQwMCAxMS42MnB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWg2LC5tYXQtdHlwb2dyYXBoeSBoNntmb250OjQwMCA5LjM4cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxMnB4fS5tYXQtYm9keS0yLC5tYXQtYm9keS1zdHJvbmd7Zm9udDo1MDAgMTRweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWJvZHksLm1hdC1ib2R5LTEsLm1hdC10eXBvZ3JhcGh5e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5IHAsLm1hdC1ib2R5LTEgcCwubWF0LXR5cG9ncmFwaHkgcHttYXJnaW46MCAwIDEycHh9Lm1hdC1jYXB0aW9uLC5tYXQtc21hbGx7Zm9udDo0MDAgMTJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWRpc3BsYXktNCwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTR7Zm9udDozMDAgMTEycHgvMTEycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNTZweDtsZXR0ZXItc3BhY2luZzotLjA1ZW19Lm1hdC1kaXNwbGF5LTMsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ze2ZvbnQ6NDAwIDU2cHgvNTZweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDJlbX0ubWF0LWRpc3BsYXktMiwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTJ7Zm9udDo0MDAgNDVweC80OHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHg7bGV0dGVyLXNwYWNpbmc6LS4wMDVlbX0ubWF0LWRpc3BsYXktMSwubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTF7Zm9udDo0MDAgMzRweC80MHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDY0cHh9Lm1hdC1ib3R0b20tc2hlZXQtY29udGFpbmVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1idXR0b24sLm1hdC1mYWIsLm1hdC1mbGF0LWJ1dHRvbiwubWF0LWljb24tYnV0dG9uLC5tYXQtbWluaS1mYWIsLm1hdC1yYWlzZWQtYnV0dG9uLC5tYXQtc3Ryb2tlZC1idXR0b257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWJ1dHRvbi10b2dnbGUsLm1hdC1jYXJke2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhcmQtdGl0bGV7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtY2FyZC1jb250ZW50LC5tYXQtY2FyZC1oZWFkZXIgLm1hdC1jYXJkLXRpdGxlLC5tYXQtY2FyZC1zdWJ0aXRsZXtmb250LXNpemU6MTRweH0ubWF0LWNoZWNrYm94e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNoZWNrYm94LWxheW91dCAubWF0LWNoZWNrYm94LWxhYmVse2xpbmUtaGVpZ2h0OjI0cHh9Lm1hdC1jaGlwe2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjE4cHh9Lm1hdC1jaGlwIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24sLm1hdC1jaGlwIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29ue2ZvbnQtc2l6ZToxOHB4fS5tYXQtdGFibGV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtaGVhZGVyLWNlbGx7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtY2VsbCwubWF0LWZvb3Rlci1jZWxse2ZvbnQtc2l6ZToxNHB4fS5tYXQtY2FsZW5kYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtY2FsZW5kYXItYm9keXtmb250LXNpemU6MTNweH0ubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9ue2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlciB0aHtmb250LXNpemU6MTFweDtmb250LXdlaWdodDo0MDB9Lm1hdC1kaWFsb2ctdGl0bGV7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNXB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWV4cGFuc2lvbi1wYW5lbC1jb250ZW50e2ZvbnQ6NDAwIDE0cHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxke3dpZHRoOjEwMCU7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuMTI1O2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb257Zm9udC1zaXplOjE1MCU7bGluZS1oZWlnaHQ6MS4xMjV9Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29uLWJ1dHRvbntoZWlnaHQ6MS41ZW07d2lkdGg6MS41ZW19Lm1hdC1mb3JtLWZpZWxkLXByZWZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b24gLm1hdC1pY29ue2hlaWdodDoxLjEyNWVtO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi41ZW0gMDtib3JkZXItdG9wOi44NDM3NWVtIHNvbGlkIHRyYW5zcGFyZW50fS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMzQzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVye3RvcDotLjg0Mzc1ZW07cGFkZGluZy10b3A6Ljg0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlcntmb250LXNpemU6NzUlO21hcmdpbi10b3A6LjY2NjY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNzkxNjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC13cmFwcGVye3BhZGRpbmctYm90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6LjQzNzVlbSAwfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMXB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDFweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDEwMnB4KTstbXMtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjNlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzUlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMjgxMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZXtib3R0b206MS4yNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7bWFyZ2luLXRvcDouNTQxNjdlbTt0b3A6Y2FsYygxMDAlIC0gMS42NjY2N2VtKX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsIC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi4yNWVtIDAgLjc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuMDkzNzVlbTttYXJnaW4tdG9wOi0uNWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc0ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzoxZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5le2JvdHRvbToxLjM0Mzc1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuODQzNzVlbTttYXJnaW4tdG9wOi0uMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWdyaWQtdGlsZS1mb290ZXIsLm1hdC1ncmlkLXRpbGUtaGVhZGVye2ZvbnQtc2l6ZToxNHB4fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmUsLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LWdyaWQtdGlsZS1oZWFkZXIgLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fWlucHV0Lm1hdC1pbnB1dC1lbGVtZW50e21hcmdpbi10b3A6LS4wNjI1ZW19Lm1hdC1tZW51LWl0ZW17Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXBhZ2luYXRvciwubWF0LXBhZ2luYXRvci1wYWdlLXNpemUgLm1hdC1zZWxlY3QtdHJpZ2dlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHh9Lm1hdC1yYWRpby1idXR0b24sLm1hdC1zZWxlY3R7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2VsZWN0LXRyaWdnZXJ7aGVpZ2h0OjEuMTI1ZW19Lm1hdC1zbGlkZS10b2dnbGUtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwubWF0LXN0ZXBwZXItdmVydGljYWx7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc3RlcC1sYWJlbHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVke2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRhYi1ncm91cHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10YWItbGFiZWwsLm1hdC10YWItbGlua3tmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdG9vbGJhciwubWF0LXRvb2xiYXIgaDEsLm1hdC10b29sYmFyIGgyLC5tYXQtdG9vbGJhciBoMywubWF0LXRvb2xiYXIgaDQsLm1hdC10b29sYmFyIGg1LC5tYXQtdG9vbGJhciBoNntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowfS5tYXQtdG9vbHRpcHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEwcHg7cGFkZGluZy10b3A6NnB4O3BhZGRpbmctYm90dG9tOjZweH0ubWF0LXRvb2x0aXAtaGFuZHNldHtmb250LXNpemU6MTRweDtwYWRkaW5nLXRvcDo5cHg7cGFkZGluZy1ib3R0b206OXB4fS5tYXQtbGlzdC1pdGVtLC5tYXQtbGlzdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjE2cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtbmF2LWxpc3QgLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweH0ubWF0LW9wdGdyb3VwLWxhYmVse2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zaW1wbGUtc25hY2tiYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4fS5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbntsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdHJlZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10cmVlLW5vZGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxNHB4fS5tYXQtcmlwcGxle292ZXJmbG93OmhpZGRlbn1AbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6YWN0aXZlKXsubWF0LXJpcHBsZXtkaXNwbGF5Om5vbmV9fS5tYXQtcmlwcGxlLm1hdC1yaXBwbGUtdW5ib3VuZGVke292ZXJmbG93OnZpc2libGV9Lm1hdC1yaXBwbGUtZWxlbWVudHtwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXItcmFkaXVzOjUwJTtwb2ludGVyLWV2ZW50czpub25lO3RyYW5zaXRpb246b3BhY2l0eSwtd2Via2l0LXRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpO3RyYW5zaXRpb246b3BhY2l0eSx0cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9LmNkay12aXN1YWxseS1oaWRkZW57Ym9yZGVyOjA7Y2xpcDpyZWN0KDAgMCAwIDApO2hlaWdodDoxcHg7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHg7b3V0bGluZTowOy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlciwuY2RrLW92ZXJsYXktY29udGFpbmVye3BvaW50ZXItZXZlbnRzOm5vbmU7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LmNkay1vdmVybGF5LWNvbnRhaW5lcntwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LWNvbnRhaW5lcjplbXB0eXtkaXNwbGF5Om5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVye2Rpc3BsYXk6ZmxleDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDB9LmNkay1vdmVybGF5LXBhbmV7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6YXV0bztib3gtc2l6aW5nOmJvcmRlci1ib3g7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDttYXgtd2lkdGg6MTAwJTttYXgtaGVpZ2h0OjEwMCV9LmNkay1vdmVybGF5LWJhY2tkcm9we3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO3otaW5kZXg6MTAwMDtwb2ludGVyLWV2ZW50czphdXRvOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDt0cmFuc2l0aW9uOm9wYWNpdHkgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO29wYWNpdHk6MH0uY2RrLW92ZXJsYXktYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjF9QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTouNn19LmNkay1vdmVybGF5LWRhcmstYmFja2Ryb3B7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yODgpfS5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCwuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5OjB9LmNkay1vdmVybGF5LWNvbm5lY3RlZC1wb3NpdGlvbi1ib3VuZGluZy1ib3h7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47bWluLXdpZHRoOjFweDttaW4taGVpZ2h0OjFweH0uY2RrLWdsb2JhbC1zY3JvbGxibG9ja3twb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO292ZXJmbG93LXk6c2Nyb2xsfS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbHstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0O2FuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0fS5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6bm90KDotd2Via2l0LWF1dG9maWxsKXstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmR9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXple3Jlc2l6ZTpub25lfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZS1tZWFzdXJpbmd7aGVpZ2h0OmF1dG8haW1wb3J0YW50O292ZXJmbG93OmhpZGRlbiFpbXBvcnRhbnQ7cGFkZGluZzoycHggMCFpbXBvcnRhbnQ7Ym94LXNpemluZzpjb250ZW50LWJveCFpbXBvcnRhbnR9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXJ7bWFyZ2luOjE2cHggMCA4cHh9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLml0ZW0td3JhcHBlcnttYXgtd2lkdGg6MTVlbTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLml0ZW0td3JhcHBlciwuZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAubWF0ZXJpYWwtaWNvbnN7Y29sb3I6Izk2OTY5Nn0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAuZmlsdGVyLWNvbnRlbnR7bWFyZ2luLXJpZ2h0OjhweH0uZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUtd3JhcHBlciAubWF0LWNoaXB7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLnZhbHVlLXdyYXBwZXJ7Y29sb3I6I2VmM2Y1NH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBmaWx0ZXJHcm91cHMgPSBbXTtcblxuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBlZGl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBlZGl0RGVjRmlsdGVyR3JvdXAoJGV2ZW50LCBmaWx0ZXJHcm91cCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmVkaXQuZW1pdChmaWx0ZXJHcm91cCk7XG4gIH1cbiAgcmVtb3ZlRGVjRmlsdGVyR3JvdXAoJGV2ZW50LCBmaWx0ZXJHcm91cCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KGZpbHRlckdyb3VwKTtcbiAgfVxuXG4gIGdldFZhbHVldHlwZSh2YWx1ZSkge1xuXG4gICAgY29uc3QgZmlyc3RWYWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWVbMF0gOiB2YWx1ZTtcblxuICAgIGxldCB0eXBlO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGAke2ZpcnN0VmFsdWV9YC5pbmRleE9mKCcwMDBaJykgPj0gMDpcbiAgICAgICAgdHlwZSA9ICdkYXRlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0eXBlID0gJ2RlZmF1bHQnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZTtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0Q2hpcHNNb2R1bGUsIE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRDYXJkTW9kdWxlLCBNYXRDaGlwc01vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVNb2R1bGUgfSBmcm9tICcuLy4uL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNMaXN0RmlsdGVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlY1Blcm1pc3Npb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWNQZXJtaXNzaW9uRGlyZWN0aXZlIHtcblxuICBwcml2YXRlIGhhc1ZpZXcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IERlY0FwaVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY1Blcm1pc3Npb24ocDogc3RyaW5nW10pIHtcbiAgICBpZiAoIXApIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XG4gICAgICB0aGlzLmhhc1ZpZXcgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc1Blcm1pc3Npb24ocCk7XG4gICAgfVxuICB9XG5cbiAgaGFzUGVybWlzc2lvbihwKSB7XG4gICAgdGhpcy5zZXJ2aWNlLnVzZXIkLnN1YnNjcmliZShcbiAgICAgIHVzZXIgPT4ge1xuICAgICAgICBpZiAodXNlciAmJiB0aGlzLmlzQWxsb3dlZEFjY2VzcyhwLCB1c2VyLnBlcm1pc3Npb25zKSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXNWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgICAgICAgdGhpcy5oYXNWaWV3ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgICAgdGhpcy5oYXNWaWV3ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FsbG93ZWRBY2Nlc3Mocm9sZXNBbGxvd2VkOiBzdHJpbmdbXSA9IFtdLCBjdXJyZW50Um9sZXM6IHN0cmluZ1tdID0gW10pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWF0Y2hpbmdSb2xlID0gY3VycmVudFJvbGVzLmZpbmQoKHVzZXJSb2xlKSA9PiB7XG4gICAgICAgIHJldHVybiByb2xlc0FsbG93ZWQuZmluZCgoYWxvd2VkUm9sZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBhbG93ZWRSb2xlID09PSB1c2VyUm9sZTtcbiAgICAgICAgfSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXRjaGluZ1JvbGUgPyB0cnVlIDogZmFsc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNQZXJtaXNzaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kZWMtcGVybWlzc2lvbi5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjUGVybWlzc2lvbkRpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUGVybWlzc2lvbkRpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYnMtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY1Blcm1pc3Npb25Nb2R1bGUgfSBmcm9tICcuLy4uLy4uLy4uL2RpcmVjdGl2ZXMvcGVybWlzc2lvbi9kZWMtcGVybWlzc2lvbi5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRGVjUGVybWlzc2lvbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJzRmlsdGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1ncmlkJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93IHdyYXBcIiBbZnhMYXlvdXRHYXBdPVwiaXRlbUdhcFwiID5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgcm93IG9mIHJvd3M7IGxldCBpID0gaW5kZXg7XCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgcm93LCByb3dzLCBpKVwiIFtmeEZsZXhdPVwiaXRlbVdpZHRoXCI+XG4gICAgPGRpdiBbbmdTdHlsZV09XCJ7bWFyZ2luOiBpdGVtR2FwfVwiPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVJlZlwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cm93OiByb3cgfHwge30sIGxpc3Q6IHJvd3MgfHwgW10sIGluZGV4OiBpfVwiXG4gICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGl0ZW1XaWR0aCA9ICcyODBweCc7XG5cbiAgQElucHV0KCkgaXRlbUdhcCA9ICc4cHgnO1xuXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF9yb3dzID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBzZXQgcm93cyh2OiBhbnkpIHtcbiAgICBpZiAodGhpcy5fcm93cyAhPT0gdikge1xuICAgICAgdGhpcy5fcm93cyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uSXRlbUNsaWNrKGV2ZW50LCBpdGVtLCBsaXN0LCBpbmRleCkge1xuXG4gICAgdGhpcy5yb3dDbGljay5lbWl0KHtldmVudCwgaXRlbSwgbGlzdCwgaW5kZXh9KTtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtdGFibGUtY29sdW1uJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50IHtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBwcm9wO1xuXG4gIEBJbnB1dCgpIHRpdGxlID0gJyc7XG5cbiAgQElucHV0KCkgc2V0IGNvbFNwYW4odikge1xuICAgIGNvbnN0IG51bWJlciA9ICt2O1xuICAgIHRoaXMuX2NvbFNwYW4gPSBpc05hTihudW1iZXIpID8gMSA6IG51bWJlcjtcbiAgfVxuXG4gIGdldCBjb2xTcGFuKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbFNwYW47XG4gIH1cblxuICBwcml2YXRlIF9jb2xTcGFuID0gMTtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtdGFibGUtY29sdW1uL2xpc3QtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8bmd4LWRhdGF0YWJsZSAjdGFibGVDb21wb25lbnRcbiAgY29sdW1uTW9kZT1cImZsZXhcIlxuICBoZWFkZXJIZWlnaHQ9XCIyNHB4XCJcbiAgcm93SGVpZ2h0PVwiYXV0b1wiXG4gIFtleHRlcm5hbFNvcnRpbmddPVwidHJ1ZVwiXG4gIFttZXNzYWdlc109XCJ7ZW1wdHlNZXNzYWdlOicnfVwiXG4gIFtyb3dzXT1cInJvd3NcIlxuICAoc29ydCk9XCJvblNvcnQoJGV2ZW50KVwiXG4gIChhY3RpdmF0ZSk9XCJvbkl0ZW1DbGljaygkZXZlbnQpXCI+XG5cbiAgPG5neC1kYXRhdGFibGUtY29sdW1uICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1ucztcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ7e2NvbHVtbi50aXRsZSB8IHRyYW5zbGF0ZX19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbZmxleEdyb3ddPVwiY29sdW1uLmNvbFNwYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtwcm9wXT1cImNvbHVtbi5wcm9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbc29ydGFibGVdPVwiY29sdW1uLnByb3AgPyB0cnVlIDogZmFsc2VcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cImNvbHVtbi50ZW1wbGF0ZSA/IHRydWUgOiBmYWxzZVwiXG4gICAgICBsZXQtcm93PVwicm93XCJcbiAgICAgIGxldC1pbmRleD1cInJvd0luZGV4XCJcbiAgICAgIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZT5cblxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4udGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3Jvdzogcm93IHx8IHt9LCBsaXN0OiByb3dzIHx8IFtdLCBpbmRleDogaW5kZXh9XCJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cblxuPC9uZ3gtZGF0YXRhYmxlPlxuYCxcbiAgc3R5bGVzOiBbYDo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAub3ZlcmZsb3ctdmlzaWJsZXtvdmVyZmxvdzp2aXNpYmxlIWltcG9ydGFudH06Om5nLWRlZXAgZGF0YXRhYmxlLXNjcm9sbGVye3dpZHRoOjEwMCUhaW1wb3J0YW50fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZS5uby1vdmVyZmxvd3tvdmVyZmxvdzphdXRvfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZS5uby1wYWRkaW5nIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGwgLmRhdGF0YWJsZS1ib2R5LWNlbGwtbGFiZWx7cGFkZGluZzowfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWhlYWRlcntwYWRkaW5nOjExcHggMTZweH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1oZWFkZXIgLmRhdGF0YWJsZS1oZWFkZXItY2VsbC1sYWJlbHtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtYm9keS1yb3cgLmRhdGF0YWJsZS1ib2R5LWNlbGx7Zm9udC1zaXplOjEzcHg7Zm9udC13ZWlnaHQ6NDAwO292ZXJmbG93OmhpZGRlbjttaW4taGVpZ2h0OjEwMCU7ZGlzcGxheTp0YWJsZTstd2Via2l0LXVzZXItc2VsZWN0OmluaXRpYWw7LW1vei11c2VyLXNlbGVjdDppbml0aWFsOy1tcy11c2VyLXNlbGVjdDppbml0aWFsOy1vLXVzZXItc2VsZWN0OmluaXRpYWw7dXNlci1zZWxlY3Q6aW5pdGlhbH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHtwYWRkaW5nOjE2cHg7ZGlzcGxheTp0YWJsZS1jZWxsO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt3b3JkLWJyZWFrOmJyZWFrLWFsbH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbC5jZWxsLXRvcCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHt2ZXJ0aWNhbC1hbGlnbjp0b3B9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtcm93LWRldGFpbHtwYWRkaW5nOjEwcHh9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5zb3J0LWJ0bnt3aWR0aDowO2hlaWdodDowfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuaWNvbi1kb3due2JvcmRlci1sZWZ0OjVweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuaWNvbi11cHtib3JkZXItbGVmdDo1cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjVweCBzb2xpZCB0cmFuc3BhcmVudH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0VGFibGVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCByb3dzKHYpIHtcbiAgICBpZiAodGhpcy5fcm93cyAhPT0gdikge1xuICAgICAgdGhpcy5fcm93cyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBAVmlld0NoaWxkKERhdGF0YWJsZUNvbXBvbmVudCkgdGFibGVDb21wb25lbnQ6IERhdGF0YWJsZUNvbXBvbmVudDtcblxuICBjb2x1bW5zU29ydENvbmZpZzogYW55O1xuXG4gIHByaXZhdGUgX3Jvd3M6IEFycmF5PGFueT4gPSBbXTtcblxuICBAQ29udGVudENoaWxkcmVuKERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCkgY29sdW1uczogUXVlcnlMaXN0PERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudD47XG5cbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIHJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgb25Tb3J0KGV2ZW50KSB7XG5cbiAgICBjb25zdCBzb3J0Q29uZmlnID0gW3tcbiAgICAgIHByb3BlcnR5OiBldmVudC5zb3J0c1swXS5wcm9wLFxuICAgICAgb3JkZXI6IHt0eXBlOiBldmVudC5zb3J0c1swXS5kaXJ9XG4gICAgfV07XG5cbiAgICBpZiAoc29ydENvbmZpZyAhPT0gdGhpcy5jb2x1bW5zU29ydENvbmZpZykge1xuXG4gICAgICB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnID0gc29ydENvbmZpZztcblxuICAgICAgdGhpcy5zb3J0LmVtaXQodGhpcy5jb2x1bW5zU29ydENvbmZpZyk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uSXRlbUNsaWNrKCRldmVudCkge1xuXG4gICAgY29uc3QgZXZlbnQgPSAkZXZlbnQ7XG5cbiAgICBjb25zdCBpdGVtID0gJGV2ZW50LnJvdztcblxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnJvd3M7XG5cbiAgICBjb25zdCBpbmRleCA9ICRldmVudC5yb3cuJCRpbmRleDtcblxuICAgIHRoaXMucm93Q2xpY2suZW1pdCh7ZXZlbnQsIGl0ZW0sIGxpc3QsIGluZGV4fSk7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RlY0xpc3RHcmlkQ29tcG9uZW50fSBmcm9tICcuL2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7RGVjTGlzdFRhYmxlQ29tcG9uZW50fSBmcm9tICcuL2xpc3QtdGFibGUvbGlzdC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlckNvbXBvbmVudH0gZnJvbSAnLi9saXN0LWZpbHRlci9saXN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRhcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBEZWNMaXN0RmV0Y2hNZXRob2QgfSBmcm9tICcuL2xpc3QubW9kZWxzJztcbmltcG9ydCB7IEZpbHRlckRhdGEsIERlY0ZpbHRlciwgRmlsdGVyR3JvdXBzLCBGaWx0ZXJHcm91cCB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImxpc3QtY29tcG9uZW50LXdyYXBwZXJcIj5cblxuICA8ZGl2ICpuZ0lmPVwiZmlsdGVyXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwicmVwb3J0XCI+XG5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG5cbiAgICAgIDxkaXYgZnhGbGV4IGNsYXNzPVwidGV4dC1yaWdodFwiICpuZ0lmPVwidGFibGVBbmRHcmlkQXJlU2V0KClcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJ0b2dnbGVMaXN0TW9kZSgpXCI+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBhcmlhLWxhYmVsPVwiU3dpdGNoIHRvIHRhYmxlIG1vZGVcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgKm5nSWY9XCJsaXN0TW9kZSA9PT0gJ2dyaWQnXCI+dmlld19oZWFkbGluZTwvbWF0LWljb24+XG4gICAgICAgICAgPG1hdC1pY29uIHRpdGxlPVwiU3dpdGNoIHRvIGdyaWQgbW9kZVwiIGFyaWEtbGFiZWw9XCJTd2l0Y2ggdG8gZ3JpZCBtb2RlXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnICpuZ0lmPVwibGlzdE1vZGUgPT09ICd0YWJsZSdcIj52aWV3X21vZHVsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgZnhGbGV4PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibGlzdE1vZGUgPT0gJ2dyaWQnIHRoZW4gZ3JpZFRlbXBsYXRlIGVsc2UgbGlzdFRlbXBsYXRlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSBGT09URVIgQ09OVEVOVCAtLT5cbiAgICAgIDxkaXYgZnhGbGV4PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd0Zvb3RlciAmJiAhbG9hZGluZyB0aGVuIGZvb3RlclRlbXBsYXRlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSBMT0FESU5HIFNQSU5ORVIgLS0+XG4gICAgICA8ZGl2IGZ4RmxleCAqbmdJZj1cImxvYWRpbmdcIiBjbGFzcz1cInRleHQtY2VudGVyIGxvYWRpbmctc3Bpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxkZWMtc3Bpbm5lcj48L2RlYy1zcGlubmVyPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gTE9BRCBNT1JFIEJVVFRPTiAtLT5cbiAgICAgIDxkaXYgZnhGbGV4ICpuZ0lmPVwiIWlzTGFzdFBhZ2UgJiYgIWxvYWRpbmcgJiYgIWRpc2FibGVTaG93TW9yZUJ1dHRvblwiIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gKGNsaWNrKT1cInNob3dNb3JlKClcIj57eydsYWJlbC5zaG93LW1vcmUnIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuXG48IS0tIEdSSUQgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2dyaWRUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZ3JpZFwiPjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVEFCTEUgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2xpc3RUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtdGFibGVcIj48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIEZPT1RFUiBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjZm9vdGVyVGVtcGxhdGU+XG5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuXG4gIDxwIGNsYXNzPVwibGlzdC1mb290ZXJcIj5cbiAgICB7eyAnbGFiZWwuYW1vdW50LWxvYWRlZC1vZi10b3RhbCcgfFxuICAgICAgdHJhbnNsYXRlOntcbiAgICAgICAgbG9hZGVkOiByZXBvcnQ/LnJlc3VsdD8ucm93cz8ubGVuZ3RoLFxuICAgICAgICB0b3RhbDogcmVwb3J0Py5yZXN1bHQ/LmNvdW50XG4gICAgICB9XG4gICAgfX1cbiAgPC9wPlxuXG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYC5saXN0LWZvb3Rlcntmb250LXNpemU6MTRweDt0ZXh0LWFsaWduOmNlbnRlcn0ubGlzdC1jb21wb25lbnQtd3JhcHBlcnttaW4taGVpZ2h0OjcycHh9LnRleHQtcmlnaHR7dGV4dC1hbGlnbjpyaWdodH0ubG9hZGluZy1zcGlubmVyLXdyYXBwZXJ7cGFkZGluZzozMnB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgLypcbiAgICogbG9hZGluZ1xuICAgKlxuICAgKlxuICAgKi9cbiAgc2V0IGxvYWRpbmcodikge1xuXG4gICAgdGhpcy5fbG9hZGluZyA9IHY7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIubG9hZGluZyA9IHY7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBsb2FkaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICB9XG5cbiAgLypcbiAgICogZmlsdGVyR3JvdXBzXG4gICAqXG4gICAqXG4gICAqL1xuICBnZXQgZmlsdGVyR3JvdXBzKCk6IEZpbHRlckdyb3VwcyB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyID8gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzIDogW107XG4gIH1cblxuICAvKlxuICAgKiByZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHJlcG9ydDtcblxuICAvKlxuICAgKiBpc0xhc3RQYWdlXG4gICAqXG4gICAqXG4gICAqL1xuICBpc0xhc3RQYWdlOiBib29sZWFuO1xuXG4gIC8qXG4gICAqIGZpbHRlckRhdGFcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyRGF0YTogU3ViamVjdDxGaWx0ZXJEYXRhPiA9IG5ldyBTdWJqZWN0PEZpbHRlckRhdGE+KCk7XG5cbiAgLypcbiAgICogX2xvYWRpbmc7XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9sb2FkaW5nID0gdHJ1ZTtcblxuICAvKlxuICAgKiBjbGVhckFuZFJlbG9hZFJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhckFuZFJlbG9hZFJlcG9ydDtcblxuICAvKlxuICAgKiBmaWx0ZXJTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogcmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcmVhY3RpdmVSZXBvcnQ6IE9ic2VydmFibGU8YW55PjtcblxuICAvKlxuICAgKiByZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHNjcm9sbGFibGVDb250YWluZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsYWJsZUNvbnRhaW5lcjogRWxlbWVudDtcblxuICAvKlxuICAgKiBzY3JvbGxFdmVudEVtaXRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxFdmVudEVtaXRlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIHNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogdGFic0NoYW5nZVN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB0YWJzQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogdGFibGVTb3J0U3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHRhYmxlU29ydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHBheWxvYWRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcGF5bG9hZDogRGVjRmlsdGVyO1xuXG4gIC8qXG4gICAqIF9lbmRwb2ludCBpbnRlcm5hbGxcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2VuZHBvaW50OiBzdHJpbmc7XG5cbiAgLypcbiAgICogY3VzdG9tRmV0Y2hNZXRob2RcbiAgICpcbiAgICogbWV0aG9kIHVzZWQgdG8gZmV0Y2ggZGF0YSBmcm9tIGJhY2stZW5kXG4gICAqL1xuICBASW5wdXQoKSBjdXN0b21GZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kO1xuXG4gIC8qXG4gICAqIGNvbHVtbnNTb3J0Q29uZmlnXG4gICAqXG4gICAqIHVzZWQgdG8gZ2V0IGEgc29ydGVkIGxpc3QgZnJvbSBiYWNrZW5kXG4gICAqIGNhbiBiZSBwYXNlZCB2aWEgYXR0cmlidXRlIHRvIHNvcnQgdGhlIGZpcnN0IGxvYWRcbiAgICovXG4gIEBJbnB1dCgpIGNvbHVtbnNTb3J0Q29uZmlnO1xuXG4gIC8qXG4gICAqIGRpc2FibGVTaG93TW9yZUJ1dHRvblxuICAgKlxuICAgKiB1c2VkIHRvIGhpZGUgdGhlIHNob3cgbW9yZSBidXR0b25cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVTaG93TW9yZUJ1dHRvbjogYm9vbGVhbjtcblxuICAvKlxuICAgKiBlbmRwb2ludFxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGVuZHBvaW50KHY6IHN0cmluZykge1xuXG4gICAgaWYgKHRoaXMuX2VuZHBvaW50ICE9PSB2KSB7XG5cbiAgICAgIHRoaXMuX2VuZHBvaW50ID0gKHZbMF0gJiYgdlswXSA9PT0gJy8nKSA/IHYucmVwbGFjZSgnLycsICcnKSA6IHY7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBlbmRwb2ludCgpOiBzdHJpbmcge1xuXG4gICAgcmV0dXJuIHRoaXMuX2VuZHBvaW50O1xuXG4gIH1cblxuICAvKlxuICAgKiBuYW1lXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgc2V0IG5hbWUodjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX25hbWUgIT09IHYpIHtcbiAgICAgIHRoaXMuX25hbWUgPSB2O1xuICAgICAgdGhpcy5zZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIC8qXG4gICAqIHJvd3NcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgncm93cycpXG5cbiAgc2V0IHJvd3Mocm93cykge1xuICAgIHRoaXMuc2V0Um93cyhyb3dzKTtcbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLnJlcG9ydCA/IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLypcbiAgICogbGltaXRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpbWl0ID0gMTA7XG5cbiAgLypcbiAgICogc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzXG4gICAqXG4gICAqIFdoZXJlIHRoZSBzY3JvbGwgd2F0Y2hlciBzaG91bGQgYmUgbGlzdGVuaW5nXG4gICAqL1xuICBASW5wdXQoKSBzY3JvbGxhYmxlQ29udGFpbmVyQ2xhc3MgPSAnbWF0LXNpZGVuYXYtY29udGVudCc7XG5cbiAgLypcbiAgICogc2VhcmNoYWJsZVByb3BlcnRpZXNcbiAgICpcbiAgICogUHJvcGVydGllcyB0byBiZSBzZWFyY2hlZCB3aGVuIHVzaW5nIGJhc2ljIHNlYXJjaFxuICAgKi9cbiAgQElucHV0KCkgc2VhcmNoYWJsZVByb3BlcnRpZXM6IHN0cmluZ1tdO1xuXG4gIC8qXG4gICAqIHNob3dGb290ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIHNob3dGb290ZXIgPSB0cnVlO1xuXG4gIC8qXG4gICAqIHBvc3RTZWFyY2hcbiAgICpcbiAgICogVGhpcyBtaWRkbGV3YXJlIGlzIHVzZWQgdG8gdHJpZ2dlciBldmVudHMgYWZ0ZXIgZXZlcnkgc2VhcmNoXG4gICAqL1xuICBAT3V0cHV0KCkgcG9zdFNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIHJvd0NsaWNrXG4gICAqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gYSByb3cgb3IgY2FyZCBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgcm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogZ3JpZFxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0R3JpZENvbXBvbmVudCkgZ3JpZDogRGVjTGlzdEdyaWRDb21wb25lbnQ7XG5cbiAgLypcbiAgICogdGFibGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdFRhYmxlQ29tcG9uZW50KSB0YWJsZTogRGVjTGlzdFRhYmxlQ29tcG9uZW50O1xuXG4gIC8qXG4gICAqIGZpbHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsdGVyOiBEZWNMaXN0RmlsdGVyQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEZpbHRlckNvbXBvbmVudClcbiAgc2V0IGZpbHRlcih2OiBEZWNMaXN0RmlsdGVyQ29tcG9uZW50KSB7XG4gICAgaWYgKHRoaXMuX2ZpbHRlciAhPT0gdikge1xuICAgICAgdGhpcy5fZmlsdGVyID0gdjtcbiAgICAgIHRoaXMuc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGZpbHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVyO1xuICB9XG5cbiAgLypcbiAgICogbGlzdE1vZGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGxpc3RNb2RlO1xuXG4gIC8qXG4gICAqIGdldExpc3RNb2RlXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBnZXRMaXN0TW9kZSA9ICgpID0+IHtcblxuICAgIGxldCBsaXN0TW9kZSA9IHRoaXMubGlzdE1vZGU7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICBjb25zdCBzZWxlY3RlZFRhYiA9IHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VsZWN0ZWRUYWIoKTtcblxuICAgICAgaWYgKHNlbGVjdGVkVGFiICYmIHNlbGVjdGVkVGFiLmxpc3RNb2RlKSB7XG5cbiAgICAgICAgbGlzdE1vZGUgPSBzZWxlY3RlZFRhYi5saXN0TW9kZTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBsaXN0TW9kZSA9IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdE1vZGU7XG5cbiAgfVxuXG4gIC8qXG4gICAqIG5nT25Jbml0XG4gICAqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNlcnZpY2U6IERlY0FwaVNlcnZpY2VcbiAgKSB7IH1cblxuICAvKlxuICAgKiBuZ09uSW5pdFxuICAgKlxuICAgKiBTdGFydHMgYSBmcmVzaCBjb21wb25lbnQgYW5kIHByZXBhcmUgaXQgdG8gcnVuXG4gICAqXG4gICAqIC0gU3RhcnQgdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN1YnNjcmliZSB0byB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3RhcnQgd2F0Y2hpbmcgd2luZG93IFNjcm9sbFxuICAgKiAtIEVuc3VyZSB1bmlxdWUgbmFtZVxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53YXRjaEZpbHRlckRhdGEoKTtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZU5hbWUoKTtcbiAgICB0aGlzLmRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKCk7XG4gIH1cblxuICAvKlxuICAqIG5nQWZ0ZXJWaWV3SW5pdFxuICAqXG4gICogV2FpdCBmb3IgdGhlIHN1YmNvbXBvbmVudHMgdG8gc3RhcnQgYmVmb3JlIHJ1biB0aGUgY29tcG9uZW50XG4gICpcbiAgKiAtIFN0YXJ0IHdhdGNoaW5nIEZpbHRlclxuICAqIC0gRG8gdGhlIGZpcnN0IGxvYWRcbiAgKi9cbiBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICB0aGlzLndhdGNoRmlsdGVyKCk7XG4gICB0aGlzLmRvRmlyc3RMb2FkKCk7XG4gICB0aGlzLmRldGVjdExpc3RNb2RlKCk7XG4gICB0aGlzLndhdGNoVGFic0NoYW5nZSgpO1xuICAgdGhpcy53YXRjaFRhYmxlU29ydCgpO1xuICAgdGhpcy5yZWdpc3RlckNoaWxkV2F0Y2hlcnMoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGwoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIG5nT25EZXN0cm95XG4gICAqXG4gICAqIERlc3Ryb3kgd2F0Y2hlciB0byBmcmVlIG1lZW1vcnkgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyeSB0cmlnZ2Vyc1xuICAgKlxuICAgKiAtIFVuc3Vic2NyaWJlIGZyb20gdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgd2luZG93IFNjcm9sbFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgRmlsdGVyXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdGaWx0ZXIoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYmxlU29ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICAvKlxuICAgKiByZWxvYWRDb3VudFJlcG9ydFxuICAgKlxuICAgKi9cbiAgcmVsb2FkQ291bnRSZXBvcnQoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIucmVsb2FkQ291bnRSZXBvcnQodGhpcy5wYXlsb2FkKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogcmVtb3ZlSXRlbVxuICAgKlxuICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgbGlzdFxuICAgKi9cbiAgcmVtb3ZlSXRlbShpZCkge1xuXG4gICAgY29uc3QgaXRlbSA9IHRoaXMucm93cy5maW5kKF9pdGVtID0+IF9pdGVtLmlkID09PSBpZCk7XG5cbiAgICBpZiAoaXRlbSkge1xuXG4gICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLnJvd3MuaW5kZXhPZihpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1JbmRleCA+PSAwKSB7XG5cbiAgICAgICAgdGhpcy5yb3dzLnNwbGljZShpdGVtSW5kZXgsIDEpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbmRwb2ludCkge1xuICAgICAgdGhpcy5yZWxvYWRDb3VudFJlcG9ydCgpO1xuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogcmVzdGFydFxuICAgKlxuICAgKiBDbGVhciB0aGUgbGlzdCBhbmQgcmVsb2FkIHRoZSBmaXJzdCBwYWdlXG4gICAqL1xuICByZXN0YXJ0KCkge1xuXG4gICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpO1xuXG4gIH1cblxuICAvKlxuICAgKiBzaG93TW9yZVxuICAgKlxuICAgKi9cbiAgc2hvd01vcmUoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkUmVwb3J0KCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHRhYmxlQW5kR3JpZEFyZVNldFxuICAgKlxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGVyZSBhcmUgYm90aCBHUklEIGFuZCBUQUJMRSBkZWZpbml0aW9uIGluc2lkZSB0aGUgbGlzdFxuICAgKi9cbiAgdGFibGVBbmRHcmlkQXJlU2V0KCkge1xuICAgIHJldHVybiB0aGlzLmdyaWQgJiYgdGhpcy50YWJsZTtcbiAgfVxuXG4gIC8qXG4gICAqIHRvZ2dsZUxpc3RNb2RlXG4gICAqXG4gICAqIENoYW5nZXMgYmV0d2VlbiBHUklEIGFuZCBUQUJMRSB2aXN1YWxpemF0b2luIG1vZGVzXG4gICAqL1xuICB0b2dnbGVMaXN0TW9kZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID09PSAnZ3JpZCcgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gICAgaWYgKHRoaXMubGlzdE1vZGUgPT09ICd0YWJsZScpIHtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgdGhpcy50YWJsZS50YWJsZUNvbXBvbmVudC5yZWNhbGN1bGF0ZSgpO1xuXG4gICAgICB9LCAxKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogYWN0QnlTY3JvbGxQb3NpdGlvblxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlY3QgaWYgdGhlcmUgaXMgc2Nyb29saW5nIGFjdGlvbiBvbiB3aW5kb3cgdG8gZmV0Y2ggYW5kIHNob3cgbW9yZSByb3dzIHdoZW4gdGhlIHNjcm9sbGluZyBkb3duLlxuICAgKi9cbiAgcHJpdmF0ZSBhY3RCeVNjcm9sbFBvc2l0aW9uID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCRldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnRXaXRoQ2RrT3ZlcmxheUNsYXNzID0gJGV2ZW50WydwYXRoJ10uZmluZChwYXRoID0+IHtcblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBwYXRoWydjbGFzc05hbWUnXSB8fCAnJztcblxuICAgICAgICBjb25zdCBpbnNpZGVPdmVybGF5ID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Nkay1vdmVybGF5JykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Z1bGxzY3JlYW4tZGlhbG9nLWNvbnRhaW5lcicpID49IDA7XG5cbiAgICAgICAgcmV0dXJuIGluc2lkZU92ZXJsYXkgfHwgaW5zaWRlRnVsbHNjcmVhbkRpYWxvZ0NvbnRhaW5lcjtcblxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICBpZiAoIXRoaXMuaXNMYXN0UGFnZSkge1xuXG4gICAgICAgICAgY29uc3QgdGFyZ2V0OiBhbnkgPSAkZXZlbnRbJ3RhcmdldCddO1xuXG4gICAgICAgICAgY29uc3QgbGltaXQgPSB0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGFyZ2V0LmNsaWVudEhlaWdodDtcblxuICAgICAgICAgIGlmICh0YXJnZXQuc2Nyb2xsVG9wID49IChsaW1pdCAtIDE2KSkge1xuXG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlKCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBkZXRlY3RMaXN0TW9kZVxuICAgKlxuICAgKiBTZXQgdGhlIGxpc3QgbW9kZSBiYXNlZCBvbiBmaWx0ZXJUYWJzIGNvbmZpZ3VyYXRpb24gb3IgY3VzdG9tIGZ1bmN0aW9uIG92ZXJyaWRkZW4gYnkgZ2V0TGlzdE1vZGUgaW5wdXRcbiAgICovXG4gIHByaXZhdGUgZGV0ZWN0TGlzdE1vZGUoKSB7XG5cbiAgICB0aGlzLmxpc3RNb2RlID0gdGhpcy5nZXRMaXN0TW9kZSgpO1xuXG4gIH1cblxuICAvKlxuICAgKiBkZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpXG4gICAqXG4gICAqIFNldCB0aGUgbGlzdCBtb2RlIGJhc2VkIG9uIGRlY2xhcmF0aW9uIG9mIHRhYmxlIGFuZCBncmlkLiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBib290YXN0cmFwIHRoZSBjb21wb25lbnQgd2l0aCBvbmx5IGdyaWQgb3Igb25seSB0YWJsZVxuICAgKiBUaGlzIG9ubHkgd29yayBpZiBubyBtb2RlIGlzIHByb3ZpZGVkIGJ5IEBJbnB1dCBvdGhlcndpc2UgdGhlIEBJbnB1dCB2YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICovXG4gIHByaXZhdGUgZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKSB7XG5cbiAgICB0aGlzLmxpc3RNb2RlID0gdGhpcy5saXN0TW9kZSA/IHRoaXMubGlzdE1vZGUgOiB0aGlzLnRhYmxlID8gJ3RhYmxlJyA6ICdncmlkJztcblxuICB9XG5cbiAgLypcbiAgICogZW1pdFNjcm9sbEV2ZW50XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVtaXRTY3JvbGxFdmVudCA9ICgkZXZlbnQpID0+IHtcblxuICAgIGlmICghdGhpcy5sb2FkaW5nKSB7XG5cbiAgICAgIHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXIuZW1pdCgkZXZlbnQpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBpc1RhYnNGaWx0ZXJEZWZpbmVkXG4gICAqXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSBUYWJzIEZpbHRlciBpcyBkZWZpbmVkIGluc2lkZSB0aGUgbGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBpc1RhYnNGaWx0ZXJEZWZpbmVkKCkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50O1xuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWQoKSB7XG4gICAgaWYgKHRoaXMuaXNUYWJzRmlsdGVyRGVmaW5lZCgpKSB7XG4gICAgICB0aGlzLmRvRmlyc3RMb2FkQnlUYWJzRmlsdGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9GaXJzdExvYWRMb2NhbGx5KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGRvRmlyc3RMb2FkQnlUYWJzRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGRvRmlyc3RMb2FkQnlUYWJzRmlsdGVyKCkge1xuICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuZG9GaXJzdExvYWQoKTtcbiAgfVxuXG4gIC8qXG4gICAqIGRvRmlyc3RMb2FkTG9jYWxseVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZExvY2FsbHkocmVmcmVzaCkge1xuICAgIHRoaXMubG9hZFJlcG9ydChyZWZyZXNoKTtcbiAgfVxuXG4gIC8qXG4gICAqIGVuc3VyZVVuaXF1ZU5hbWVcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZW5zdXJlVW5pcXVlTmFtZSgpIHtcbiAgICBpZiAoIXRoaXMubmFtZSkge1xuICAgICAgY29uc3QgZXJyb3IgPSAnTGlzdENvbXBvbmVudEVycm9yOiBUaGUgbGlzdCBjb21wb25lbnQgbXVzdCBoYXZlIGFuIHVuaXF1ZSBuYW1lIHRvIGJlIHVzZWQgaW4gdXJsIGZpbHRlci4nXG4gICAgICArICcgUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJztcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogbG9hZFJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkUmVwb3J0KGNsZWFyQW5kUmVsb2FkUmVwb3J0PzogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG5cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgaWYgKGNsZWFyQW5kUmVsb2FkUmVwb3J0ICYmIHRoaXMucm93cykge1xuXG4gICAgICAgIHRoaXMuc2V0Um93cyh0aGlzLnJvd3MpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xlYXJBbmRSZWxvYWRSZXBvcnQgPSBjbGVhckFuZFJlbG9hZFJlcG9ydDtcblxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMuZW5kcG9pbnQpIHtcblxuICAgICAgICBjb25zdCBmaWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlciA/IHRoaXMuZmlsdGVyLmZpbHRlckdyb3VwcyA6IHVuZGVmaW5lZDtcblxuICAgICAgICBjb25zdCBwYXlsb2FkOiBEZWNGaWx0ZXIgPSB7fTtcblxuICAgICAgICBwYXlsb2FkLmxpbWl0ID0gdGhpcy5saW1pdDtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRUYWI7XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgICAgICBzZWxlY3RlZFRhYiA9IHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VsZWN0ZWRUYWIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWx0ZXJHcm91cHMpIHtcblxuICAgICAgICAgIHBheWxvYWQuZmlsdGVyR3JvdXBzID0gZmlsdGVyR3JvdXBzO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb2x1bW5zU29ydENvbmZpZykge1xuXG4gICAgICAgICAgcGF5bG9hZC5jb2x1bW5zID0gdGhpcy5jb2x1bW5zU29ydENvbmZpZztcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjbGVhckFuZFJlbG9hZFJlcG9ydCAmJiB0aGlzLnJlcG9ydCkge1xuXG4gICAgICAgICAgcGF5bG9hZC5wYWdlID0gdGhpcy5yZXBvcnQucGFnZSArIDE7XG5cbiAgICAgICAgICBwYXlsb2FkLmxpbWl0ID0gdGhpcy5yZXBvcnQubGltaXQ7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQ7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm5leHQoeyBlbmRwb2ludDogdGhpcy5lbmRwb2ludCwgcGF5bG9hZDogcGF5bG9hZCwgY2JrOiByZXMsIGNsZWFyOiBjbGVhckFuZFJlbG9hZFJlcG9ydCB9KTtcblxuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUZldGNoTWV0aG9kKSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm5leHQoKTtcblxuICAgICAgfSBlbHNlIGlmICghdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMucm93cykge1xuXG4gICAgICAgICAgICByZWooJ05vIGVuZHBvaW50LCBjdXN0b21GZXRjaE1ldGhvZCBvciByb3dzIHNldCcpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgfSwgMSk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lc1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIubmFtZSA9IHRoaXMubmFtZTtcblxuXG4gICAgICBpZiAodGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQubmFtZSA9IHRoaXMubmFtZTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21GZXRjaE1ldGhvZCkge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5jdXN0b21GZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2Q7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VydmljZSA9IHRoaXMuc2VydmljZTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldFJvd3NcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2V0Um93cyhyb3dzID0gW10pIHtcblxuICAgIHRoaXMucmVwb3J0ID0ge1xuXG4gICAgICBwYWdlOiAxLFxuXG4gICAgICByZXN1bHQ6IHtcblxuICAgICAgICByb3dzOiByb3dzLFxuXG4gICAgICAgIGNvdW50OiByb3dzLmxlbmd0aFxuXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZGV0ZWN0TGFzdFBhZ2Uocm93cywgcm93cy5sZW5ndGgpO1xuXG4gICAgdGhpcy51cGRhdGVDb250ZW50Q2hpbGRyZW4oKTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyKCkge1xuXG4gICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbiA9IHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJcbiAgICAucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgxNTApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICkuc3Vic2NyaWJlKHRoaXMuYWN0QnlTY3JvbGxQb3NpdGlvbik7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbikge1xuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyRGF0YVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEZpbHRlckRhdGEoKSB7XG4gICAgdGhpcy5yZWFjdGl2ZVJlcG9ydCA9IHRoaXMuZmlsdGVyRGF0YVxuICAgIC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDE1MCksIC8vIGF2b2lkIG11aWx0aXBsZSByZXF1ZXN0IHdoZW4gdGhlIGZpbHRlciBvciB0YWIgY2hhbmdlIHRvbyBmYXN0XG4gICAgICBzd2l0Y2hNYXAoKGZpbHRlckRhdGE6IEZpbHRlckRhdGEpID0+IHtcblxuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHVuZGVmaW5lZCk7XG5cbiAgICAgICAgY29uc3QgZmV0Y2hNZXRob2Q6IERlY0xpc3RGZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QgfHwgdGhpcy5zZXJ2aWNlLmdldDtcblxuICAgICAgICBjb25zdCBlbmRwb2ludCA9IGZpbHRlckRhdGEgPyBmaWx0ZXJEYXRhLmVuZHBvaW50IDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGNvbnN0IHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMgPSB0aGlzLmdldFBheWxvYWRXaXRoU2VhcmNoVHJhbnNmb3JtZWRJbnRvU2VhcmNoYWJsZVByb3BlcnRpZXMoKTtcblxuICAgICAgICBpZiAoZmlsdGVyRGF0YSAmJiBmaWx0ZXJEYXRhLmNsZWFyKSB7XG4gICAgICAgICAgdGhpcy5zZXRSb3dzKFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZldGNoTWV0aG9kKGVuZHBvaW50LCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzKVxuICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICBvYnNlcnZhYmxlLm5leHQocmVzKTtcblxuICAgICAgICAgIGlmIChmaWx0ZXJEYXRhICYmIGZpbHRlckRhdGEuY2JrKSB7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyB3YWl0IGZvciBzdWJzY3JpYmVycyB0byByZWZyZXNoIHRoZWlyIHJvd3NcblxuICAgICAgICAgICAgICBmaWx0ZXJEYXRhLmNiayhuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG5cbiAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgICB9KVxuXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcygpIHtcblxuICAgIGNvbnN0IHBheWxvYWRDb3B5ID0gey4uLnRoaXMucGF5bG9hZH07XG5cbiAgICBpZiAocGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzICYmIHRoaXMuc2VhcmNoYWJsZVByb3BlcnRpZXMpIHtcblxuICAgICAgcGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzID0gWy4uLnRoaXMucGF5bG9hZC5maWx0ZXJHcm91cHNdO1xuXG4gICAgICBjb25zdCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoID0gdGhpcy5nZXRGaWx0ZXJHcm91cFRoYXRDb250YWluc1RoZUJhc2ljU2VhcmNoKHBheWxvYWRDb3B5LmZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIGlmIChmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKSB7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXJHcm91cChwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgICAgIHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gsIHBheWxvYWRDb3B5KTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGF5bG9hZENvcHk7XG5cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLnBheWxvYWQ7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKGZpbHRlckdyb3Vwc01vZGVsLCBwYXlsb2FkKSB7XG5cbiAgICBjb25zdCBiYXNpY1NlYXJjaCA9IGZpbHRlckdyb3Vwc01vZGVsLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnByb3BlcnR5ID09PSAnc2VhcmNoJyk7XG5cbiAgICBjb25zdCBiYXNpY1NlYXJjaEluZGV4ID0gZmlsdGVyR3JvdXBzTW9kZWwuZmlsdGVycy5pbmRleE9mKGJhc2ljU2VhcmNoKTtcblxuICAgIHRoaXMuc2VhcmNoYWJsZVByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG5cbiAgICAgIGNvbnN0IG5ld0ZpbHRlckdyb3VwOiBGaWx0ZXJHcm91cCA9IHtcbiAgICAgICAgZmlsdGVyczogWy4uLmZpbHRlckdyb3Vwc01vZGVsLmZpbHRlcnNdXG4gICAgICB9O1xuXG4gICAgICBuZXdGaWx0ZXJHcm91cC5maWx0ZXJzW2Jhc2ljU2VhcmNoSW5kZXhdID0ge1xuICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgIHZhbHVlOiBiYXNpY1NlYXJjaC52YWx1ZVxuICAgICAgfTtcblxuICAgICAgcGF5bG9hZC5maWx0ZXJHcm91cHMucHVzaChuZXdGaWx0ZXJHcm91cCk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2hJbmRleCA9IGZpbHRlckdyb3Vwcy5pbmRleE9mKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgZmlsdGVyR3JvdXBzLnNwbGljZShmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoSW5kZXgsIDEpO1xuXG4gIH1cblxuICBwcml2YXRlIGdldEZpbHRlckdyb3VwVGhhdENvbnRhaW5zVGhlQmFzaWNTZWFyY2goZmlsdGVyR3JvdXBzKSB7XG5cbiAgICByZXR1cm4gZmlsdGVyR3JvdXBzLmZpbmQoZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICBjb25zdCBiYXNpY1NlcmNoRmlsdGVyID0gZmlsdGVyR3JvdXAuZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIucHJvcGVydHkgPT09ICdzZWFyY2gnKTtcblxuICAgICAgcmV0dXJuIGJhc2ljU2VyY2hGaWx0ZXIgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCkge1xuICAgIHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnJlYWN0aXZlUmVwb3J0XG4gICAgLnBpcGUoXG4gICAgICB0YXAocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcbiAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgJiYgZGF0YS5yZXN1bHQgJiYgZGF0YS5yZXN1bHQucm93cykge1xuXG4gICAgICAgIGlmICghdGhpcy5jbGVhckFuZFJlbG9hZFJlcG9ydCkge1xuICAgICAgICAgIGRhdGEucmVzdWx0LnJvd3MgPSB0aGlzLnJlcG9ydC5yZXN1bHQucm93cy5jb25jYXQoZGF0YS5yZXN1bHQucm93cyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcG9ydCA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5wb3N0U2VhcmNoLmVtaXQoZGF0YSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb250ZW50Q2hpbGRyZW4oKTtcblxuICAgICAgICB0aGlzLmRldGVjdExhc3RQYWdlKGRhdGEucmVzdWx0LnJvd3MsIGRhdGEucmVzdWx0LmNvdW50KTtcblxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0TGFzdFBhZ2Uocm93cywgY291bnQpIHtcblxuICAgIGNvbnN0IG51bWJlck9mcm93cyA9IHJvd3MubGVuZ3RoO1xuXG4gICAgY29uc3QgZW1wdExpc3QgPSBudW1iZXJPZnJvd3MgPT09IDA7XG5cbiAgICBjb25zdCBzaW5nbGVQYWdlTGlzdCA9IG51bWJlck9mcm93cyA9PT0gY291bnQ7XG5cbiAgICB0aGlzLmlzTGFzdFBhZ2UgPSBlbXB0TGlzdCB8fCBzaW5nbGVQYWdlTGlzdDtcblxuICB9XG5cbiAgLypcbiAgICogdW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpIHtcbiAgICBpZiAodGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHVwZGF0ZUNvbnRlbnRDaGlsZHJlblxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVDb250ZW50Q2hpbGRyZW4oKSB7XG5cbiAgICBjb25zdCByb3dzID0gdGhpcy5lbmRwb2ludCA/IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzIDogdGhpcy5yb3dzO1xuICAgIGlmICh0aGlzLmdyaWQpIHtcbiAgICAgIHRoaXMuZ3JpZC5yb3dzID0gcm93cztcbiAgICB9XG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMudGFibGUucm93cyA9IHJvd3M7XG4gICAgfVxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIuY291bnQgPSB0aGlzLnJlcG9ydC5yZXN1bHQuY291bnQ7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogcmVnaXN0ZXJDaGlsZFdhdGNoZXJzXG4gICAqXG4gICAqIFdhdGNoIGZvciBjaGlsZHJlbiBvdXRwdXRzXG4gICAqL1xuICBwcml2YXRlIHJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpIHtcblxuICAgIGlmICh0aGlzLmdyaWQpIHtcbiAgICAgIHRoaXMud2F0Y2hHcmlkUm93Q2xpY2soKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgdGhpcy53YXRjaFRhYmxlUm93Q2xpY2soKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoR3JpZFJvd0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoR3JpZFJvd0NsaWNrKCkge1xuICAgIHRoaXMuZ3JpZC5yb3dDbGljay5zdWJzY3JpYmUoKCRldmVudCkgPT4ge1xuICAgICAgdGhpcy5yb3dDbGljay5lbWl0KCRldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFRhYmxlUm93Q2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVJvd0NsaWNrKCkge1xuICAgIHRoaXMudGFibGUucm93Q2xpY2suc3Vic2NyaWJlKCgkZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucm93Q2xpY2suZW1pdCgkZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyLnNlYXJjaC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSlcbiAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQucmVjb3VudCkge1xuICAgICAgICAgICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnNjcm9sbGFibGVDb250YWluZXJDbGFzcylbMF07XG4gICAgICBpZiAodGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSwgMSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQudGFiQ2hhbmdlLnN1YnNjcmliZSh0YWIgPT4ge1xuICAgICAgICB0aGlzLmRldGVjdExpc3RNb2RlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1RhYnNDaGFuZ2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFic0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFRhYmxlU29ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgdGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnRhYmxlLnNvcnQuc3Vic2NyaWJlKGNvbHVtbnNTb3J0Q29uZmlnID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uc1NvcnRDb25maWcgIT09IGNvbHVtbnNTb3J0Q29uZmlnKSB7XG4gICAgICAgICAgdGhpcy5jb2x1bW5zU29ydENvbmZpZyA9IGNvbHVtbnNTb3J0Q29uZmlnO1xuICAgICAgICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtdGFibGUtY29sdW1uL2xpc3QtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNMaXN0VGFibGVDb21wb25lbnQsXG4gICAgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjTGlzdFRhYmxlQ29tcG9uZW50LFxuICAgIERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYmxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWZvb3RlcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RGb290ZXJDb21wb25lbnQge31cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtYWR2YW5jZWQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBZHZhbmNlZEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWFjdGlvbnMnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD4+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNMaXN0QWN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1hY3Rpb25zLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEFjdGlvbnNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjTGlzdEFjdGlvbnNDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBY3Rpb25zTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRTbmFja0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRGVjTGlzdEZpbHRlck1vZHVsZSB9IGZyb20gJy4vbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIubW9kdWxlJztcbmltcG9ydCB7IERlY0xpc3RUYWJzRmlsdGVyTW9kdWxlIH0gZnJvbSAnLi9saXN0LXRhYnMtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIubW9kdWxlJztcblxuaW1wb3J0IHsgRGVjTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RUYWJsZU1vZHVsZSB9IGZyb20gJy4vbGlzdC10YWJsZS9saXN0LXRhYmxlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNMaXN0Rm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZvb3Rlci9saXN0LWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEFkdmFuY2VkRmlsdGVyTW9kdWxlIH0gZnJvbSAnLi9saXN0LWFkdmFuY2VkLWZpbHRlci9saXN0LWFkdmFuY2VkLWZpbHRlci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLXNwaW5uZXIvZGVjLXNwaW5uZXIubW9kdWxlJztcbmltcG9ydCB7IERlY0xpc3RBY3Rpb25zTW9kdWxlIH0gZnJvbSAnLi9saXN0LWFjdGlvbnMvbGlzdC1hY3Rpb25zLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdEZpbHRlck1vZHVsZSxcbiAgICBEZWNMaXN0VGFic0ZpbHRlck1vZHVsZSxcbiAgICBEZWNMaXN0VGFibGVNb2R1bGUsXG4gICAgRGVjU3Bpbm5lck1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjTGlzdENvbXBvbmVudCxcbiAgICBEZWNMaXN0R3JpZENvbXBvbmVudCxcbiAgICBEZWNMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjTGlzdENvbXBvbmVudCxcbiAgICBEZWNMaXN0R3JpZENvbXBvbmVudCxcbiAgICBEZWNMaXN0VGFibGVNb2R1bGUsXG4gICAgRGVjTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgICBEZWNMaXN0RmlsdGVyTW9kdWxlLFxuICAgIERlY0xpc3RBZHZhbmNlZEZpbHRlck1vZHVsZSxcbiAgICBEZWNMaXN0VGFic0ZpbHRlck1vZHVsZSxcbiAgICBEZWNMaXN0QWN0aW9uc01vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXBhZ2UtZm9yYmlkZW4nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYWdlLWZvcmJpZGVuLXdyYXBwZXJcIj5cbiAgPGgxPnt7J2xhYmVsLnBhZ2UtZm9yYmlkZW4nIHwgdHJhbnNsYXRlfX08L2gxPlxuICA8cD57eydsYWJlbC5wYWdlLWZvcmJpZGVuLWhlbHAnIHwgdHJhbnNsYXRlfX08L3A+XG4gIDxwPjxzbWFsbD5SZWY6IHt7cHJldmlvdXNVcmx9fTwvc21hbGw+PC9wPlxuICA8aW1nIHNyYz1cImh0dHA6Ly9zMy1zYS1lYXN0LTEuYW1hem9uYXdzLmNvbS9zdGF0aWMtZmlsZXMtcHJvZC9wbGF0Zm9ybS9kZWNvcmEzLnBuZ1wiPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnBhZ2UtZm9yYmlkZW4td3JhcHBlcntwYWRkaW5nLXRvcDoxMDBweDt0ZXh0LWFsaWduOmNlbnRlcn1pbWd7d2lkdGg6MTAwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUGFnZUZvcmJpZGVuQ29tcG9uZW50IHtcblxuICBwcmV2aW91c1VybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB0aGlzLnJvdXRlci5ldmVudHNcbiAgICAucGlwZShcbiAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoKGU6IE5hdmlnYXRpb25FbmQpID0+IHtcbiAgICAgIHRoaXMucHJldmlvdXNVcmwgPSBkb2N1bWVudC5yZWZlcnJlciB8fCBlLnVybDtcbiAgICB9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1BhZ2VGb3JiaWRlbkNvbXBvbmVudCB9IGZyb20gJy4vcGFnZS1mb3JiaWRlbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNQYWdlRm9yYmlkZW5Db21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1BhZ2VGb3JiaWRlbkNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1BhZ2VGb3JiaWRlbk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXBhZ2Utbm90LWZvdW5kJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGFnZS1ub3QtZm91bmQtd3JhcHBlclwiPlxuICA8aDE+e3snbGFiZWwucGFnZS1ub3QtZm91bmQnIHwgdHJhbnNsYXRlfX08L2gxPlxuICA8cD57eydsYWJlbC5wYWdlLW5vdC1mb3VuZC1oZWxwJyB8IHRyYW5zbGF0ZX19PC9wPlxuICA8cD57e3ByZXZpb3VzVXJsfX08L3A+XG4gIDxpbWcgc3JjPVwiaHR0cDovL3MzLXNhLWVhc3QtMS5hbWF6b25hd3MuY29tL3N0YXRpYy1maWxlcy1wcm9kL3BsYXRmb3JtL2RlY29yYTMucG5nXCI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AucGFnZS1ub3QtZm91bmQtd3JhcHBlcntwYWRkaW5nLXRvcDoxMDBweDt0ZXh0LWFsaWduOmNlbnRlcn1pbWd7d2lkdGg6MTAwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUGFnZU5vdEZvdW5kQ29tcG9uZW50IHtcblxuICBwcmV2aW91c1VybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICByb3V0ZXIuZXZlbnRzXG4gICAgLnBpcGUoXG4gICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKVxuICAgIClcbiAgICAuc3Vic2NyaWJlKChlOiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICAgIHRoaXMucHJldmlvdXNVcmwgPSBlLnVybDtcbiAgICB9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1BhZ2VOb3RGb3VuZENvbXBvbmVudCB9IGZyb20gJy4vcGFnZS1ub3QtZm91bmQuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjUGFnZU5vdEZvdW5kQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNQYWdlTm90Rm91bmRDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQYWdlTm90Rm91bmRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBGQUxMQkFDS19JTUFHRSA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVFBQUFDMUhBd0NBQUFBQW1KTFIwUUEvNGVQekw4QUFBQUpjRWhaY3dBQUN4TUFBQXNUQVFDYW5CZ0FBQUFMU1VSQlZBalhZMkJnQUFBQUF3QUJJTldVeHdBQUFBQkpSVTUnICtcbidFcmtKZ2dnPT0nO1xuXG5jb25zdCBMT0FESU5HX0lNQUdFID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU1UVXdJaUJvWldsbmFIUTlJakUxTUNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCd2NtVnpaWEoyWlVGemNHVmpkRkpoZEdsdlBTSjRUV2xrV1UxcFpDSWcnICtcbidZMnhoYzNNOUluVnBiQzF5YVc1bklqNDhjR0YwYUNCbWFXeHNQU0p1YjI1bElpQmpiR0Z6Y3owaVltc2lJR1E5SWswd0lEQm9NVEF3ZGpFd01FZ3dlaUl2UGp4amFYSmpiR1VnWTNnOUlqYzFJaUJqZVQwaU56VWlJSEk5SWpRMUlpQnpkSEp2YTJVdFpHRnphR0Z5Y21GNVBTSXlNall1TVRrMUlEVTJMalUwT1NJJyArXG4nZ2MzUnliMnRsUFNJak1qTXlaVE00SWlCbWFXeHNQU0p1YjI1bElpQnpkSEp2YTJVdGQybGtkR2c5SWpFd0lqNDhZVzVwYldGMFpWUnlZVzV6Wm05eWJTQmhkSFJ5YVdKMWRHVk9ZVzFsUFNKMGNtRnVjMlp2Y20waUlIUjVjR1U5SW5KdmRHRjBaU0lnZG1Gc2RXVnpQU0l3SURjMUlEYzFPekU0TUNBM05TQTNOVCcgK1xuJ3N6TmpBZ056VWdOelU3SWlCclpYbFVhVzFsY3owaU1Ec3dMalU3TVNJZ1pIVnlQU0l4Y3lJZ2NtVndaV0YwUTI5MWJuUTlJbWx1WkdWbWFXNXBkR1VpSUdKbFoybHVQU0l3Y3lJdlBqd3ZZMmx5WTJ4bFBqd3ZjM1puUGc9PSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1wcm9kdWN0LXNwaW4nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwcm9kdWN0LXNwaW5uZXItd3JhcHBlclwiICpuZ0lmPVwic2NlbmVzXCI+XG4gIDxkaXYgW25nU3dpdGNoXT1cImxvYWRpbmdJbWFnZXMgPyB0cnVlIDogZmFsc2VcIj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cInRydWVcIiBjbGFzcz1cIm92ZXJsYXlcIj5cbiAgICAgIDwhLS0gTG9hZGluZyBzcGlubmVyIC0tPlxuICAgICAgPGRpdiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtaW1hZ2UnOid1cmwoJyArIGxvYWRpbmdJbWFnZSArICcpJ31cIj57e2xvYWRlclBlcmNlbnRhZ2UoKX19JTwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIiBjbGFzcz1cIm92ZXJsYXlcIj5cblxuICAgICAgPCEtLSBPdmVybGF5IG92ZXIgdGhlIGltYWdlIChoYW5kIGljb24pIC0tPlxuICAgICAgPGltZyBjbGFzcz1cImZyYW1lXCIgKm5nSWY9XCIhb25seU1vZGFsXCIgc3JjPVwiLy9zMy1zYS1lYXN0LTEuYW1hem9uYXdzLmNvbS9zdGF0aWMtZmlsZXMtcHJvZC9wbGF0Zm9ybS9kcmFnLWhvcml6b250YWxseS5wbmdcIiBhbHQ9XCJcIiAoY2xpY2spPVwib25seU1vZGFsID8gJycgOiBzdGFydCgkZXZlbnQpXCI+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuICA8ZGl2IFtuZ1N3aXRjaF09XCJzdGFydGVkID8gdHJ1ZSA6IGZhbHNlXCI+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCIgY2xhc3M9XCJmcmFtZVwiPlxuICAgICAgPCEtLSBJbWFnZXMgLS0+XG4gICAgICA8aW1nICpuZ0Zvcj1cImxldCBzY2VuZSBvZiBzY2VuZXM7IGxldCBpID0gaW5kZXg7XCJcbiAgICAgICAgW3NyY109XCJzY2VuZVwiXG4gICAgICAgIGRyYWdnYWJsZT1cImZhbHNlXCJcbiAgICAgICAgY2xhc3M9XCJuby1kcmFnIGltYWdlLW9ubHlcIlxuICAgICAgICAobG9hZCk9XCJtYXJrQXNMb2FkZWQoJGV2ZW50KVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImZyYW1lU2hvd24gPT09IGkgJiYgIWxvYWRpbmdJbWFnZXMgPyAnY3VycmVudC1zY2VuZScgOiAnbmV4dC1zY2VuZSdcIj5cblxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIiBjbGFzcz1cImZyYW1lXCI+XG5cbiAgICAgIDwhLS0gUGxhY2Vob2xkZXIgaW1hZ2UgLS0+XG4gICAgICA8aW1nXG4gICAgICAgIFtzcmNdPVwic2NlbmVzW2ZyYW1lU2hvd25dXCJcbiAgICAgICAgZHJhZ2dhYmxlPVwiZmFsc2VcIlxuICAgICAgICBjbGFzcz1cIm5vLWRyYWdcIlxuICAgICAgICAoY2xpY2spPVwib25seU1vZGFsID8gb25PcGVuKCRldmVudCkgOiBzdGFydCgkZXZlbnQpXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydpbWFnZS1vbmx5Jzogb25seU1vZGFsfVwiPlxuXG4gICAgICA8IS0tIExvYWRpbmcgc3Bpbm5lciAtLT5cbiAgICAgIDxidXR0b25cbiAgICAgICpuZ0lmPVwic2hvd09wZW5EaWFsb2dCdXR0b24gJiYgIW9ubHlNb2RhbFwiXG4gICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgIChjbGljayk9XCJvbk9wZW4oJGV2ZW50KVwiXG4gICAgICBbbWF0VG9vbHRpcF09XCInbGFiZWwub3BlbicgfCB0cmFuc2xhdGVcIlxuICAgICAgY2xhc3M9XCJkaWFsb2ctYnV0dG9uXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY29sb3I9XCJkZWZhdWx0XCI+XG4gICAgICAgIDxtYXQtaWNvbiBhcmlhLWxhYmVsPVwiU3dhcCBiZXR3ZWVuIFJlZmVyZW5jZSBhbmQgUmVuZGVyIGltYWdlc1wiIGNvbG9yPVwicHJpbWFyeVwiIGNvbnRyYXN0Rm9udFdpdGhCZyA+ZnVsbHNjcmVlbjwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVye2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246cmVsYXRpdmV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyOmhvdmVyIC5mcmFtZXtvcGFjaXR5OjF9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyOmhvdmVyIC5vdmVybGF5e2Rpc3BsYXk6bm9uZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1le2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXIgY2VudGVyO29wYWNpdHk6LjU7dHJhbnNpdGlvbjpvcGFjaXR5IC4zcyBlYXNlO2N1cnNvcjptb3ZlfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUuaW1hZ2Utb25seXtvcGFjaXR5OjE7Y3Vyc29yOnBvaW50ZXJ9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZSAuY3VycmVudC1zY2VuZXtkaXNwbGF5OmJsb2NrfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUgLm5leHQtc2NlbmV7ZGlzcGxheTpub25lfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUgaW1ne3dpZHRoOjEwMCV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5vdmVybGF5e3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmc6MTBweDt3aWR0aDoyMCU7bWFyZ2luLWxlZnQ6NDAlO21hcmdpbi10b3A6NDAlO3otaW5kZXg6MTtvcGFjaXR5Oi40O3RyYW5zaXRpb246b3BhY2l0eSAuMnMgZWFzZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lLmxvYWRlcnt3aWR0aDo1MCU7bWFyZ2luOmF1dG99LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5kaWFsb2ctYnV0dG9ue3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjB9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5sb2FkZXItcGVyY2VudGFnZXtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6NDclO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7b3BhY2l0eTouNX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQcm9kdWN0U3BpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZnJhbWVTaG93bjogbnVtYmVyO1xuICBzY2VuZXM6IHN0cmluZ1tdO1xuICBsb2FkaW5nSW1hZ2VzOiBib29sZWFuO1xuICBwbGFjZWhvbGRlclNjZW5lOiBzdHJpbmc7XG4gIHN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHRvdGFsSW1hZ2VzTG9hZGVkOiBudW1iZXI7XG4gIGxvYWRpbmdJbWFnZSA9IExPQURJTkdfSU1BR0U7XG5cbiAgQElucHV0KCkgbG9vcGluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBvbmx5TW9kYWwgPSBmYWxzZTtcbiAgQElucHV0KCkgRkFMTEJBQ0tfSU1BR0U6IHN0cmluZyA9IEZBTExCQUNLX0lNQUdFO1xuICBASW5wdXQoKSBzdGFydEluQ2VudGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dPcGVuRGlhbG9nQnV0dG9uID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgc3BpbihzcGluOiBhbnkpIHtcbiAgICBpZiAoc3Bpbikge1xuICAgICAgY29uc3Qgc2NlbmVzID0gdGhpcy5sb2FkU2NlbmVzKHNwaW4pO1xuXG4gICAgICBjb25zdCBzY2VuZXNDaGFuZ2VkID0gIXRoaXMuc2NlbmVzIHx8IChzY2VuZXMgJiYgdGhpcy5zY2VuZXMuam9pbigpICE9PSBzY2VuZXMuam9pbigpKTtcblxuICAgICAgaWYgKHNjZW5lc0NoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5yZXNldFNjZW5lc0RhdGEoc2NlbmVzKTtcbiAgICAgICAgLy8gdGhpcy5yZXNldFN0YXJ0UG9zaXRpb25CYXNlZE9uQ29tcGFueShzcGluLCBzY2VuZXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zcGluID0gc3BpbjtcblxuICAgIH1cbiAgfVxuXG4gIGdldCBzcGluKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3NwaW47XG4gIH1cblxuICBAT3V0cHV0KCkgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgc2NlbmVzTGVuID0gMDtcbiAgcHJpdmF0ZSBtb3VzZURvd24gPSBmYWxzZTtcbiAgcHJpdmF0ZSBsYXN0TW91c2VFdmVudDogTW91c2VFdmVudDtcbiAgcHJpdmF0ZSBjb250YWluZXJXaWR0aDogbnVtYmVyO1xuICBwcml2YXRlIGludGVydmFsOiBudW1iZXI7XG4gIHByaXZhdGUgcG9zaXRpb25EaWZmOiBudW1iZXI7XG4gIHByaXZhdGUgX3NwaW46IGFueTtcblxuICAvKlxuICAqIExpc3RlbmluZyBmb3IgbW91c2UgZXZlbnRzXG4gICogbW91c2V1cCBpbiBuZ09uSW5pdCBiZWNhdXNlIGl0IHVzZWQgZG9jY3VtZW50IGFzIHJlZmVyZW5jZVxuICAqL1xuXG4gIC8vIGF2b2lkIGRyYWdcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSlcbiAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIG1vdXNlZG93blxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxuICBvbk1vdXNlZG93bihldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcbiAgICB0aGlzLmxhc3RNb3VzZUV2ZW50ID0gZXZlbnQ7XG4gIH1cblxuICAvLyBtb3VzZW1vdmVcbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZW1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5tb3VzZURvd24gJiYgdGhpcy5zdGFydGVkKSB7XG5cbiAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oZXZlbnQpO1xuXG4gICAgICAvLyBUaGUgd2lkdGggaXMgZGl2aWRlZCBieSB0aGUgYW1vdW50IG9mIGltYWdlcy4gTW92aW5nIGZyb20gMCB0byAxMDAgd2lsbCB0dXJuIDM2MMOCwrBcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLnBvc2l0aW9uRGlmZikgPj0gdGhpcy5pbnRlcnZhbCkge1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbkRpZmYgPCAwKSB7XG4gICAgICAgICAgdGhpcy5nb1JpZ2h0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5nb0xlZnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RNb3VzZUV2ZW50ID0gZXZlbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLmZyYW1lU2hvd24gPSAwO1xuXG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW5HbG9iYWwoJ2RvY3VtZW50JywgJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLm1vdXNlRG93bikge1xuICAgICAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBtYXJrQXNMb2FkZWQgPSAoZXZlbnQpID0+IHtcbiAgICB0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkKys7XG4gICAgaWYgKHRoaXMudG90YWxJbWFnZXNMb2FkZWQgPT09IHRoaXMuc2NlbmVzTGVuKSB7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyU2NlbmUgPSB0aGlzLnNjZW5lc1swXTtcbiAgICAgIHRoaXMubG9hZGluZ0ltYWdlcyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGdvTGVmdCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zY2VuZXNbdGhpcy5mcmFtZVNob3duIC0gMV0pIHtcbiAgICAgIHRoaXMuZnJhbWVTaG93bi0tO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sb29waW5nKSB7XG4gICAgICB0aGlzLmZyYW1lU2hvd24gPSB0aGlzLnNjZW5lc0xlbiAtIDE7XG4gICAgfVxuICB9XG5cbiAgZ29SaWdodCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zY2VuZXNbdGhpcy5mcmFtZVNob3duICsgMV0pIHtcbiAgICAgIHRoaXMuZnJhbWVTaG93bisrO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sb29waW5nKSB7XG4gICAgICB0aGlzLmZyYW1lU2hvd24gPSAwO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0ID0gKCRldmVudCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucGxhY2Vob2xkZXJTY2VuZSA9IExPQURJTkdfSU1BR0U7XG4gICAgdGhpcy50b3RhbEltYWdlc0xvYWRlZCA9IDA7XG4gICAgdGhpcy5sb2FkaW5nSW1hZ2VzID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICB9XG5cbiAgbG9hZGVyUGVyY2VudGFnZSA9ICgpID0+IHtcbiAgICByZXR1cm4gKHRoaXMuc2NlbmVzTGVuIC0gdGhpcy50b3RhbEltYWdlc0xvYWRlZCkgPiAwID8gKCgxMDAgLyB0aGlzLnNjZW5lc0xlbikgKiB0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkKS50b0ZpeGVkKDEpIDogMDtcbiAgfVxuXG4gIG9uT3BlbigkZXZlbnQpIHtcblxuICAgIHRoaXMub3Blbi5lbWl0KCRldmVudCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqXG4gICAqIElNUE9SVEFOVFxuICAgKlxuICAgKiByZXNldFN0YXJ0UG9zaXRpb25CYXNlZE9uQ29tcGFueVxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyByZXNwb25zaWJsZSBmb3IgZW5zdXJpbmcgdGhlIEJ1c2luZXNzIFJ1bGUgb2YgdGhlIHNwaW4gc2VxdWVuY2VcbiAgICogVGhlIEhvbWUgRGVwb3QgYWthIGN1c3RvbWVyIDEwMCwgaGF2ZSBhIHBhcnRpY3VsYXIgYmVoYXZpb3Igc3RhcnRpbmcgMTgww4LCuiBpbiB0aGUgbWlkZGxlXG4gICAqXG4gICovXG4gIHByaXZhdGUgcmVzZXRTdGFydFBvc2l0aW9uQmFzZWRPbkNvbXBhbnkoc3Bpbiwgc2NlbmVzKSB7XG5cbiAgICB0aGlzLnN0YXJ0SW5DZW50ZXIgPSBzcGluLmNvbXBhbnkuaWQgPT09IDEwMCA/IHRydWUgOiBmYWxzZTtcblxuICAgIHRoaXMuc3RhcnRJbkNlbnRlciA9IHRoaXMuc3RhcnRJbkNlbnRlciAmJiBzY2VuZXMubGVuZ3RoIDw9IDE2O1xuXG4gIH1cblxuICBwcml2YXRlIHJlc2V0U2NlbmVzRGF0YShzY2VuZXMpIHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyU2NlbmUgPSBzY2VuZXNbMF07XG4gICAgdGhpcy5zY2VuZXNMZW4gPSBzY2VuZXMubGVuZ3RoO1xuICAgIHRoaXMuc2NlbmVzID0gc2NlbmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkU2NlbmVzKHNwaW4pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2NlbmVzID0gdGhpcy5nZXRVcmxzRnJvbVN5c0ZpbGVzKHNwaW4uZGF0YS5zaG90cyk7XG4gICAgICByZXR1cm4gc2NlbmVzICYmIHNjZW5lcy5sZW5ndGggPiAwID8gc2NlbmVzIDogW0ZBTExCQUNLX0lNQUdFXTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFtGQUxMQkFDS19JTUFHRV07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVQb3NpdGlvbihldmVudCkge1xuICAgIGNvbnN0IHRhcmdldDogYW55ID0gZXZlbnRbJ3RhcmdldCddO1xuXG4gICAgaWYgKHRoaXMuY29udGFpbmVyV2lkdGggIT09IHRhcmdldC5jbGllbnRXaWR0aCkge1xuICAgICAgdGhpcy5jb250YWluZXJXaWR0aCA9ICB0YXJnZXQuY2xpZW50V2lkdGg7XG4gICAgICB0aGlzLmludGVydmFsID0gKHRoaXMuY29udGFpbmVyV2lkdGggLyB0aGlzLnNjZW5lc0xlbikgLyAxLjY7XG4gICAgfVxuXG4gICAgdGhpcy5wb3NpdGlvbkRpZmYgPSBldmVudC5jbGllbnRYIC0gdGhpcy5sYXN0TW91c2VFdmVudC5jbGllbnRYO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRVcmxzRnJvbVN5c0ZpbGVzKHN5c0ZpbGVzKSB7XG4gICAgaWYgKCFzeXNGaWxlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3lzRmlsZXMubWFwKGZpbGUgPT4ge1xuICAgICAgICByZXR1cm4gZmlsZS5yZW5kZXJGaWxlLmZpbGVVcmw7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNQcm9kdWN0U3BpbkNvbXBvbmVudCB9IGZyb20gJy4vcHJvZHVjdC1zcGluLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1Byb2R1Y3RTcGluQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNQcm9kdWN0U3BpbkNvbXBvbmVudFxuICBdLFxufSlcblxuZXhwb3J0IGNsYXNzIERlY1Byb2R1Y3RTcGluTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgW3JvdXRlckxpbmtdPVwicm91dGVyTGlua1wiIGNsYXNzPVwiZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZVwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZXtvdXRsaW5lOjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcm91dGVyTGluaztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUvZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi10b29sYmFyJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXRvb2xiYXIgW2NvbG9yXT1cImNvbG9yXCIgKm5nSWY9XCJpbml0aWFsaXplZFwiPlxuXG4gIDxzcGFuIGNsYXNzPVwiaXRlbXMtaWNvbiBpdGVtLWxlZnRcIiAqbmdJZj1cImxlZnRNZW51VHJpZ2dlclZpc2libGVcIiAoY2xpY2spPVwidG9nZ2xlTGVmdE1lbnUuZW1pdCgpXCI+XG4gICAgJiM5Nzc2O1xuICA8L3NwYW4+XG5cbiAgPHNwYW4gKm5nSWY9XCJjdXN0b21UaXRsZVwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gIDwvc3Bhbj5cblxuICA8ZGl2IGNsYXNzPVwicmliYm9uIHt7cmliYm9ufX1cIiAqbmdJZj1cIm5vdFByb2R1Y3Rpb25cIj5cbiAgICA8c3Bhbj57e2xhYmVsIHwgdHJhbnNsYXRlfX08L3NwYW4+XG4gIDwvZGl2PlxuXG4gIDxzcGFuIGNsYXNzPVwiZGVjLXNpZGVuYXYtdG9vbGJhci1jdXN0b20tY29udGVudFwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9zcGFuPlxuXG4gIDxzcGFuIGNsYXNzPVwiaXRlbXMtc3BhY2VyXCI+PC9zcGFuPlxuXG4gIDxzcGFuIGNsYXNzPVwiaXRlbXMtaWNvbiBpdGVtLXJpZ2h0XCIgKm5nSWY9XCJyaWdodE1lbnVUcmlnZ2VyVmlzaWJsZVwiIChjbGljayk9XCJ0b2dnbGVSaWdodE1lbnUuZW1pdCgpXCI+XG4gICAgJiM5Nzc2O1xuICA8L3NwYW4+XG5cbjwvbWF0LXRvb2xiYXI+XG5gLFxuICBzdHlsZXM6IFtgLml0ZW1zLXNwYWNlcntmbGV4OjEgMSBhdXRvfS5pdGVtcy1pY29ue2N1cnNvcjpwb2ludGVyOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEuMiwuOCk7dHJhbnNmb3JtOnNjYWxlKDEuMiwuOCl9Lml0ZW1zLWljb24uaXRlbS1yaWdodHtwYWRkaW5nLWxlZnQ6MTRweH0uaXRlbXMtaWNvbi5pdGVtLWxlZnR7cGFkZGluZy1yaWdodDoxNHB4fS5kZWMtc2lkZW5hdi10b29sYmFyLWN1c3RvbS1jb250ZW50e3BhZGRpbmc6MCAxNnB4O3dpZHRoOjEwMCV9LnJpYmJvbnt0cmFuc2l0aW9uOmFsbCAuM3MgZWFzZTt0ZXh0LXRyYW5zZm9ybTpsb3dlcmNhc2U7dGV4dC1hbGlnbjpjZW50ZXI7cG9zaXRpb246cmVsYXRpdmU7bGluZS1oZWlnaHQ6NjRweDttYXJnaW4tbGVmdDo0cHg7cGFkZGluZzowIDIwcHg7aGVpZ2h0OjY0cHg7d2lkdGg6MTU1cHg7Y29sb3I6I2ZmZjtsZWZ0OjIwcHg7dG9wOjB9LnJpYmJvbi5yaWJib24taGlkZGVue2Rpc3BsYXk6bm9uZX0ucmliYm9uOjpiZWZvcmV7Y29udGVudDonJztwb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDB2dztoZWlnaHQ6NHB4O3otaW5kZXg6Mjt0b3A6NjRweDtsZWZ0OjB9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo1OTlweCl7LnJpYmJvbjo6YmVmb3Jle3RvcDo1NnB4fX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG5cbiAgaW5pdGlhbGl6ZWQ7XG5cbiAgbm90UHJvZHVjdGlvbiA9IHRydWU7XG4gIHJpYmJvbiA9ICcnO1xuICBsYWJlbCA9ICcnO1xuXG4gIEBJbnB1dCgpIGNvbG9yO1xuXG4gIEBJbnB1dCgpIGVudmlyb25tZW50O1xuXG4gIEBJbnB1dCgpIGxlZnRNZW51VHJpZ2dlclZpc2libGUgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIHJpZ2h0TWVudVRyaWdnZXJWaXNpYmxlID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgdG9nZ2xlTGVmdE1lbnU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIHRvZ2dsZVJpZ2h0TWVudTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQpIGN1c3RvbVRpdGxlOiBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfSwgMSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbnZpcm9ubWVudCA9PT0gJ2xvY2FsJykge1xuICAgICAgdGhpcy5yaWJib24gPSAncmliYm9uLWdyZWVuJztcbiAgICAgIHRoaXMubGFiZWwgPSAnbGFiZWwubG9jYWwnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5lbnZpcm9ubWVudCA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgdGhpcy5yaWJib24gPSAncmliYm9uLWJsdWUnO1xuICAgICAgdGhpcy5sYWJlbCA9ICdsYWJlbC5kZXZlbG9wbWVudCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVudmlyb25tZW50ID09PSAncWEnKSB7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24tcmVkJztcbiAgICAgIHRoaXMubGFiZWwgPSAnbGFiZWwucWEnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5lbnZpcm9ubWVudCA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1ncmVlbic7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLmFjdGl2ZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm90UHJvZHVjdGlvbiA9IGZhbHNlO1xuICAgICAgdGhpcy5yaWJib24gPSAncmliYm9uLWhpZGRlbic7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBBZnRlclZpZXdJbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtbWVudS1pdGVtJyxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgbGV0LXRyZWVMZXZlbD1cInRyZWVMZXZlbFwiICN0ZW1wbGF0ZT5cblxuICA8bWF0LWxpc3QtaXRlbSBjbGFzcz1cImNsaWNrIGRlYy1zaWRlbmF2LW1lbnUtaXRlbVwiXG4gIChjbGljayk9XCJzdWJpdGVtcy5sZW5ndGggPyB0b2dnbGVTdWJtZW51KCkgOiBvcGVuTGluaygpXCJcbiAgW25nU3R5bGVdPVwie2JhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgJyArIHRyZWVMZXZlbC82ICsgJyknfVwiPlxuXG4gICAgPGRpdiBjbGFzcz1cIml0ZW0td3JhcHBlclwiPlxuXG4gICAgICA8ZGl2IFtuZ1N0eWxlXT1cIntwYWRkaW5nTGVmdDogdHJlZUxldmVsICogMTYgKyAncHgnfVwiIGNsYXNzPVwiaXRlbS1jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8YSAqbmdJZj1cInN1Yml0ZW1zLmxlbmd0aFwiIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJzaG93U3VibWVudVwiPlxuICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiPjxpIGNsYXNzPVwiYXJyb3cgZG93blwiPjwvaT48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cInRydWVcIj48aSBjbGFzcz1cImFycm93IHVwXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2E+XG4gICAgPC9kaXY+XG5cbiAgPC9tYXQtbGlzdC1pdGVtPlxuXG4gIDxkaXYgY2xhc3M9XCJzdWJpdGVtLW1lbnVcIiAqbmdJZj1cInNob3dTdWJtZW51XCI+XG5cbiAgICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwic3ViaXRlbXNcIiBbdHJlZUxldmVsXT1cInRyZWVMZXZlbFwiPjwvZGVjLXNpZGVuYXYtbWVudT5cblxuICA8L2Rpdj5cblxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gIHN0eWxlczogW2AuZGVjLXNpZGVuYXYtbWVudS1pdGVte2hlaWdodDo1NnB4IWltcG9ydGFudDtvdXRsaW5lOjB9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVye3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3cgbm8td3JhcDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLml0ZW0tY29udGVudCA6Om5nLWRlZXAgLm1hdC1pY29uLC5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuaXRlbS1jb250ZW50IDo6bmctZGVlcCBpe3ZlcnRpY2FsLWFsaWduOm1pZGRsZTttYXJnaW4tYm90dG9tOjVweDttYXJnaW4tcmlnaHQ6OHB4fS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAucmlnaHR7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAubGVmdHt0cmFuc2Zvcm06cm90YXRlKDEzNWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDEzNWRlZyl9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC51cHt0cmFuc2Zvcm06cm90YXRlKC0xMzVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtMTM1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLmRvd257dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC50ZXh0LXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuY2xpY2t7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSBpe2JvcmRlcjpzb2xpZCAjMDAwO2JvcmRlci13aWR0aDowIDJweCAycHggMDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjRweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSByb3V0ZXJMaW5rO1xuXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgX3N1Yml0ZW1zOiBRdWVyeUxpc3Q8RGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50PjtcblxuICBzdGFydGVkO1xuXG4gIHNob3dTdWJtZW51ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgfSwgMSk7XG4gIH1cblxuICBnZXQgc3ViaXRlbXMoKSB7XG4gICAgY29uc3Qgc3ViaXRlbXMgPSB0aGlzLl9zdWJpdGVtcy50b0FycmF5KCk7XG4gICAgc3ViaXRlbXMuc3BsaWNlKDAsIDEpOyAvLyByZW1vdmVzIGl0c2VsZlxuICAgIHJldHVybiBzdWJpdGVtcztcbiAgfVxuXG4gIHRvZ2dsZVN1Ym1lbnUoKSB7XG4gICAgdGhpcy5zaG93U3VibWVudSA9ICF0aGlzLnNob3dTdWJtZW51O1xuICB9XG5cbiAgb3BlbkxpbmsoKSB7XG4gICAgaWYgKHRoaXMucm91dGVyTGluaykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnJvdXRlckxpbmsgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGlzTmFrZWQgPSB0aGlzLnJvdXRlckxpbmsuc3RhcnRzV2l0aCgnLy8nKTtcbiAgICAgICAgY29uc3QgaXNIdHRwID0gdGhpcy5yb3V0ZXJMaW5rLnN0YXJ0c1dpdGgoJ2h0dHA6Ly8nKTtcbiAgICAgICAgY29uc3QgaXNIdHRwcyA9IHRoaXMucm91dGVyTGluay5zdGFydHNXaXRoKCdodHRwczovLycpO1xuICAgICAgICBpZiAoaXNOYWtlZCB8fCBpc0h0dHAgfHwgaXNIdHRwcykge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5yb3V0ZXJMaW5rO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnJvdXRlckxpbmtdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMucm91dGVyTGluaykpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUodGhpcy5yb3V0ZXJMaW5rKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtbWVudS10aXRsZScsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgU1RPUkFHRV9ET01BSU4gPSAnZGVjU2lkZW5hdkNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHNldFNpZGVuYXZWaXNpYmlsaXR5KG5hbWUsIHZpc2liaWxpdHkpIHtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0U2lkZW5hdkNvbmZpZygpO1xuXG4gICAgY29uZmlnW25hbWVdID0gdmlzaWJpbGl0eTtcblxuICAgIHRoaXMuc2V0U2lkZW5hdkNvbmZpZyhjb25maWcpO1xuXG4gIH1cblxuICBnZXRTaWRlbmF2VmlzaWJpbGl0eShuYW1lKSB7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldFNpZGVuYXZDb25maWcoKTtcblxuICAgIHJldHVybiBjb25maWdbbmFtZV07XG5cbiAgfVxuXG4gIHByaXZhdGUgc2V0U2lkZW5hdkNvbmZpZyhjb25mKSB7XG5cbiAgICBjb25zdCBjb25mU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoY29uZik7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0RPTUFJTiwgY29uZlN0cmluZyk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2lkZW5hdkNvbmZpZygpIHtcblxuICAgIGNvbnN0IGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0RPTUFJTik7XG5cbiAgICBpZiAoZGF0YSkge1xuXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGNvbnN0IG5ld0NvbmZpZzogYW55ID0ge307XG5cbiAgICAgIHRoaXMuc2V0U2lkZW5hdkNvbmZpZyhuZXdDb25maWcpO1xuXG4gICAgICByZXR1cm4gbmV3Q29uZmlnO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS10aXRsZS9kZWMtc2lkZW5hdi1tZW51LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY1NpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zaWRlbmF2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51LWxlZnQnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nSWY9XCJjdXN0b21UaXRsZVwiPlxuICA8ZGl2IGNsYXNzPVwibWVudS10aXRsZVwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1kZWMtc2lkZW5hdi1tZW51LXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbXNcIj5cbiAgPGRlYy1zaWRlbmF2LW1lbnUgW2l0ZW1zXT1cIml0ZW1zLnRvQXJyYXkoKVwiPjwvZGVjLXNpZGVuYXYtbWVudT5cbjwvbmctY29udGFpbmVyPmAsXG4gIHN0eWxlczogW2AubWVudS10aXRsZXtwYWRkaW5nOjE2cHg7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NzAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCB7XG5cbiAgcmVhZG9ubHkgbGVmdE1lbnVWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcblxuICByZWFkb25seSBsZWZ0TWVudU1vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3NpZGUnKTtcblxuICBASW5wdXQoKVxuICBzZXQgb3Blbih2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmxlZnRNZW51VmlzaWJsZS52YWx1ZTtcbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmxlZnRNZW51VmlzaWJsZS5uZXh0KHYpO1xuICAgICAgdGhpcy5kZWNTaWRlbmF2U2VydmljZS5zZXRTaWRlbmF2VmlzaWJpbGl0eSgnbGVmdE1lbnVIaWRkZW4nLCAhdik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG1vZGUodjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5sZWZ0TWVudU1vZGUudmFsdWU7XG5cbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmxlZnRNZW51TW9kZS5uZXh0KHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLmxlZnRNZW51TW9kZS52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHBlcnNpc3RWaXNpYmlsaXR5TW9kZTogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkcmVuKERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGl0ZW1zOiBRdWVyeUxpc3Q8RGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQpIGN1c3RvbVRpdGxlOiBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50O1xuXG4gIEBPdXRwdXQoKSBvcGVuZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQE91dHB1dCgpIG1vZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NpZGVuYXZTZXJ2aWNlOiBEZWNTaWRlbmF2U2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpIHtcblxuICAgIHRoaXMubGVmdE1lbnVWaXNpYmxlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMubGVmdE1lbnVNb2RlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLm1vZGVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbnB1dCwgQ29udGVudENoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LWl0ZW0vZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuLy4uL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nSWY9XCJjdXN0b21UaXRsZVwiPlxuICA8ZGl2IGNsYXNzPVwibWVudS10aXRsZVwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1kZWMtc2lkZW5hdi1tZW51LXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbXNcIj5cbiAgPGRlYy1zaWRlbmF2LW1lbnUgW2l0ZW1zXT1cIml0ZW1zLnRvQXJyYXkoKVwiPjwvZGVjLXNpZGVuYXYtbWVudT5cbjwvbmctY29udGFpbmVyPmAsXG4gIHN0eWxlczogW2AubWVudS10aXRsZXtwYWRkaW5nOjE2cHg7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NzAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQge1xuXG4gIHJlYWRvbmx5IHJpZ2h0TWVudVZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIHJlYWRvbmx5IHJpZ2h0TWVudU1vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3NpZGUnKTtcblxuICBASW5wdXQoKVxuICBzZXQgb3Blbih2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnJpZ2h0TWVudVZpc2libGUudmFsdWU7XG5cbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnJpZ2h0TWVudVZpc2libGUubmV4dCh2KTtcbiAgICAgIHRoaXMuZGVjU2lkZW5hdlNlcnZpY2Uuc2V0U2lkZW5hdlZpc2liaWxpdHkoJ3JpZ2h0TWVudUhpZGRlbicsICF2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG1vZGUodjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5yaWdodE1lbnVNb2RlLnZhbHVlO1xuXG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yaWdodE1lbnVNb2RlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHRNZW51TW9kZS52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHBlcnNpc3RWaXNpYmlsaXR5TW9kZTogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkcmVuKERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGl0ZW1zOiBRdWVyeUxpc3Q8RGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQpIGN1c3RvbVRpdGxlOiBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50O1xuXG4gIEBPdXRwdXQoKSBvcGVuZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQE91dHB1dCgpIG1vZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NpZGVuYXZTZXJ2aWNlOiBEZWNTaWRlbmF2U2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpIHtcblxuICAgIHRoaXMucmlnaHRNZW51VmlzaWJsZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJpZ2h0TWVudU1vZGUuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMubW9kZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi10b29sYmFyL2RlYy1zaWRlbmF2LXRvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1sZWZ0L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1yaWdodC9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRTaWRlbmF2IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGVjLXNpZGVuYXYtd3JhcGVyXCI+XG4gIDwhLS0gVE9PTEJBUiAtLT5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRvb2xiYXJcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi10b29sYmFyXCI+PC9uZy1jb250ZW50PlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPCEtLSAvIFRPT0xCQVIgLS0+XG5cbiAgPCEtLSBQUk9HUkVTUyBCQVIgLS0+XG4gIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXItd3JhcHBlclwiICpuZ0lmPVwicHJvZ3Jlc3NCYXJWaXNpYmxlIHwgYXN5bmNcIj5cbiAgICA8bWF0LXByb2dyZXNzLWJhciBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiIGNvbG9yPVwiYWNjZW50XCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPlxuICA8L2Rpdj5cbiAgPCEtLSAvIFBST0dSRVNTIEJBUiAtLT5cblxuICA8bWF0LXNpZGVuYXYtY29udGFpbmVyIFtuZ0NsYXNzXT1cInsnd2l0aC10b29sYmFyJzogdG9vbGJhcn1cIj5cblxuICAgIDwhLS0gTEVGVCBNRU5VIC0tPlxuICAgIDxtYXQtc2lkZW5hdiAqbmdJZj1cImxlZnRNZW51XCJcbiAgICBbbW9kZV09XCJsZWZ0TWVudS5sZWZ0TWVudU1vZGUgfCBhc3luY1wiXG4gICAgW29wZW5lZF09XCJsZWZ0TWVudS5sZWZ0TWVudVZpc2libGUgfCBhc3luY1wiXG4gICAgcG9zaXRpb249XCJzdGFydFwiXG4gICAgKG9wZW5lZENoYW5nZSk9XCJsZWZ0U2lkZW5hdk9wZW5lZENoYW5nZSgkZXZlbnQpXCJcbiAgICAjbGVmdFNpZGVuYXY+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi1tZW51LWxlZnRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9tYXQtc2lkZW5hdj5cbiAgICA8IS0tIC8gTEVGVCBNRU5VIC0tPlxuXG4gICAgPCEtLSBDT05URU5UIC0tPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgPCEtLSAvIENPTlRFTlQgLS0+XG5cbiAgICA8IS0tIFJJR0hUIE1FTlUgLS0+XG4gICAgPG1hdC1zaWRlbmF2ICpuZ0lmPVwicmlnaHRNZW51XCJcbiAgICBbbW9kZV09XCJyaWdodE1lbnUucmlnaHRNZW51TW9kZSB8IGFzeW5jXCJcbiAgICBbb3BlbmVkXT1cInJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlIHwgYXN5bmNcIlxuICAgIHBvc2l0aW9uPVwiZW5kXCJcbiAgICAob3BlbmVkQ2hhbmdlKT1cInJpZ2h0U2lkZW5hdk9wZW5lZENoYW5nZSgkZXZlbnQpXCJcbiAgICAjcmlnaHRTaWRlbmF2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtbWVudS1yaWdodFwiPjwvbmctY29udGVudD5cbiAgICA8L21hdC1zaWRlbmF2PlxuICAgIDwhLS0gLyBSSUdIVCBNRU5VIC0tPlxuXG4gIDwvbWF0LXNpZGVuYXYtY29udGFpbmVyPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXJ7aGVpZ2h0OjEwMHZofS5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lci53aXRoLXRvb2xiYXJ7aGVpZ2h0OmNhbGMoMTAwdmggLSA2NHB4KX0uZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXIgLm1hdC1zaWRlbmF2e3dpZHRoOjI1NnB4fS5kZWMtc2lkZW5hdi13cmFwZXIgLnByb2dyZXNzLWJhci13cmFwcGVye3Bvc2l0aW9uOmZpeGVkO3RvcDo2MHB4O2xlZnQ6MDt3aWR0aDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICByZWFkb25seSBwcm9ncmVzc0JhclZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50KSB0b29sYmFyOiBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudDtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudClcbiAgc2V0IGxlZnRNZW51KHY6IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCkge1xuICAgIHRoaXMuX2xlZnRNZW51ID0gdjtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5zZXRJbml0aWFsTGVmdE1lbnVWaXNpYmlsaXR5TW9kZXMoKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGxlZnRNZW51KCkge1xuICAgIHJldHVybiB0aGlzLl9sZWZ0TWVudTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudClcbiAgc2V0IHJpZ2h0TWVudSh2OiBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50KSB7XG4gICAgdGhpcy5fcmlnaHRNZW51ID0gdjtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5zZXRJbml0aWFsUmlnaHRNZW51VmlzaWJpbGl0eU1vZGVzKCk7XG4gICAgfVxuICB9XG4gIGdldCByaWdodE1lbnUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JpZ2h0TWVudTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2xlZnRTaWRlbmF2JykgbGVmdFNpZGVuYXY6IE1hdFNpZGVuYXY7XG5cbiAgQFZpZXdDaGlsZCgncmlnaHRTaWRlbmF2JykgcmlnaHRTaWRlbmF2OiBNYXRTaWRlbmF2O1xuXG4gIHByaXZhdGUgX2xlZnRNZW51OiBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQ7XG5cbiAgcHJpdmF0ZSBfcmlnaHRNZW51OiBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBsb2FkaW5nKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLnZhbHVlO1xuXG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5wcm9ncmVzc0JhclZpc2libGUubmV4dCh2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgbG9hZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9ncmVzc0JhclZpc2libGUudmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NpZGVuYXZTZXJ2aWNlOiBEZWNTaWRlbmF2U2VydmljZVxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gICAgdGhpcy5kZXRlY3RBbmRTaG93Q2hpbGRDb21wb25lbnRzKCk7XG5cbiAgICB0aGlzLnN1YnNjcmliZVRvVG9vbGJhckV2ZW50cygpO1xuXG4gIH1cblxuICAvLyBBUEkgLy9cbiAgb3BlbkJvdGhNZW51cygpIHtcbiAgICB0aGlzLm9wZW5MZWZ0TWVudSgpO1xuICAgIHRoaXMub3BlblJpZ2h0TWVudSgpO1xuICB9XG5cbiAgb3BlbkxlZnRNZW51KCkge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBvcGVuUmlnaHRNZW51KCkge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGNsb3NlQm90aE1lbnVzKCkge1xuICAgIHRoaXMuY2xvc2VMZWZ0TWVudSgpO1xuICAgIHRoaXMuY2xvc2VSaWdodE1lbnUoKTtcbiAgfVxuXG4gIGNsb3NlTGVmdE1lbnUoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dChmYWxzZSk7XG4gIH1cblxuICBjbG9zZVJpZ2h0TWVudSgpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgdG9nZ2xlQm90aE1lbnVzKCkge1xuICAgIHRoaXMudG9nZ2xlTGVmdE1lbnUoKTtcbiAgICB0aGlzLnRvZ2dsZVJpZ2h0TWVudSgpO1xuICB9XG5cbiAgdG9nZ2xlTGVmdE1lbnUoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5vcGVuID0gIXRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgdG9nZ2xlUmlnaHRNZW51KCkge1xuICAgIHRoaXMucmlnaHRNZW51Lm9wZW4gPSAhdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIHNldEJvdGhNZW51c01vZGUobW9kZTogJ292ZXInIHwgJ3B1c2gnIHwgJ3NpZGUnID0gJ3NpZGUnKSB7XG4gICAgdGhpcy5zZXRMZWZ0TWVudU1vZGUobW9kZSk7XG4gICAgdGhpcy5zZXRSaWdodE1lbnVNb2RlKG1vZGUpO1xuICB9XG5cbiAgc2V0TGVmdE1lbnVNb2RlKG1vZGU6ICdvdmVyJyB8ICdwdXNoJyB8ICdzaWRlJyA9ICdzaWRlJykge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVNb2RlLm5leHQobW9kZSk7XG4gIH1cblxuICBzZXRSaWdodE1lbnVNb2RlKG1vZGU6ICdvdmVyJyB8ICdwdXNoJyB8ICdzaWRlJyA9ICdzaWRlJykge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudU1vZGUubmV4dChtb2RlKTtcbiAgfVxuXG4gIHRvZ2dsZVByb2dyZXNzQmFyKCkge1xuICAgIHRoaXMubG9hZGluZyA9ICF0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIHNob3dQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgaGlkZVByb2dyZXNzQmFyKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgbGVmdFNpZGVuYXZPcGVuZWRDaGFuZ2Uob3BlbmVkU3RhdHVzKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5vcGVuID0gb3BlbmVkU3RhdHVzO1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQob3BlbmVkU3RhdHVzKTtcbiAgfVxuXG4gIHJpZ2h0U2lkZW5hdk9wZW5lZENoYW5nZShvcGVuZWRTdGF0dXMpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5vcGVuID0gb3BlbmVkU3RhdHVzO1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dChvcGVuZWRTdGF0dXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RBbmRTaG93Q2hpbGRDb21wb25lbnRzKCkge1xuXG4gICAgdGhpcy50b29sYmFyLmxlZnRNZW51VHJpZ2dlclZpc2libGUgPSB0aGlzLmxlZnRNZW51ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy50b29sYmFyLnJpZ2h0TWVudVRyaWdnZXJWaXNpYmxlID0gdGhpcy5yaWdodE1lbnUgPyB0cnVlIDogZmFsc2U7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Ub29sYmFyRXZlbnRzKCkge1xuXG4gICAgaWYgKHRoaXMudG9vbGJhcikge1xuXG4gICAgICB0aGlzLnRvb2xiYXIudG9nZ2xlTGVmdE1lbnUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5sZWZ0U2lkZW5hdi50b2dnbGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRvb2xiYXIudG9nZ2xlUmlnaHRNZW51LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmlnaHRTaWRlbmF2LnRvZ2dsZSgpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbFJpZ2h0TWVudVZpc2liaWxpdHlNb2RlcygpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQoIXRoaXMuZGVjU2lkZW5hdlNlcnZpY2UuZ2V0U2lkZW5hdlZpc2liaWxpdHkoJ3JpZ2h0TWVudUhpZGRlbicpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbExlZnRNZW51VmlzaWJpbGl0eU1vZGVzKCkge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQoIXRoaXMuZGVjU2lkZW5hdlNlcnZpY2UuZ2V0U2lkZW5hdlZpc2liaWxpdHkoJ2xlZnRNZW51SGlkZGVuJykpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1jb250ZW50JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGVjLXNpZGVuYXYtY29udGFpbmVyLXdyYXBwZXJcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1zaWRlbmF2LWNvbnRhaW5lci13cmFwcGVye21pbi13aWR0aDoxMDI0cHg7cGFkZGluZzozMnB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtbWVudScsXG4gIHRlbXBsYXRlOiBgPG1hdC1saXN0PlxuICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW0uc3RhcnRlZCAmJiBpdGVtLnRlbXBsYXRlID8gdHJ1ZSA6IGZhbHNlXCI+XG4gICAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIml0ZW0udGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInt0cmVlTGV2ZWw6IHRyZWVMZXZlbCArIDF9XCJcbiAgICAgID48L25nLXRlbXBsYXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbWF0LWxpc3Q+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC1saXN0e3BhZGRpbmctdG9wOjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdk1lbnVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGl0ZW1zID0gW107XG5cbiAgQElucHV0KCkgdHJlZUxldmVsID0gLTE7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTaWRlbmF2Q29tcG9uZW50IH0gZnJvbSAnLi9zaWRlbmF2LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRTaWRlbmF2TW9kdWxlLCBNYXRMaXN0TW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRUb29sYmFyTW9kdWxlLCBNYXRQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNTaWRlbmF2Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtY29udGVudC9kZWMtc2lkZW5hdi1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS9kZWMtc2lkZW5hdi1tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1sZWZ0L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1yaWdodC9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS9kZWMtc2lkZW5hdi1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi10b29sYmFyL2RlYy1zaWRlbmF2LXRvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlL2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlbmF2LnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1NpZGVuYXZDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdkNvbnRlbnRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1NpZGVuYXZDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdkNvbnRlbnRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGVjU2lkZW5hdlNlcnZpY2UsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0ZXAgfSBmcm9tICcuL2RlYy1zdGVwcy1saXN0Lm1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zdGVwcy1saXN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaGlzdG9yeS1jb250YWluZXJcIiBbbmdDbGFzc109XCJ7J2xpbWl0ZWQtaGVpZ2h0JzogbWF4SGVpZ2h0fVwiIFtzdHlsZS5tYXhIZWlnaHRdPVwibWF4SGVpZ2h0IHx8ICcxMDAlJ1wiPlxuXG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBjbGFzcz1cImRlYy1jb2xvci1ncmV5LWRhcmtcIj5cblxuICAgIDxtYXQtaWNvbiBmeEZsZXg9XCIyNHB4XCI+e3tpY29ufX08L21hdC1pY29uPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaWdnZXItZm9udFwiPnt7IHRpdGxlIH19PC9zcGFuPlxuXG4gIDwvZGl2PlxuXG4gIDxicj5cblxuICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaGlzdG9yeS1pdGVtXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RlcHNMaXN0OyBsZXQgaSA9IGluZGV4XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJsZWZ0IHN0YXJ0XCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleVwiPlxuXG4gICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInNtYWxsZXItaWNvbiBkZWMtY29sb3ItZ3JleS1kYXJrXCIgZnhGbGV4PVwiMjRweFwiPnt7IGkgPT09IHN0ZXBzTGlzdC5sZW5ndGggLSAxID8gJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnIDogJ2xlbnMnIH19PC9tYXQtaWNvbj5cblxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCI0cHhcIj5cblxuICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgIDxzdHJvbmcgKm5nSWY9XCJpdGVtLnRpdGxlXCI+e3sgaXRlbS50aXRsZSB9fTwvc3Ryb25nPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uZGF0ZVwiPlxuICAgICAgICAgICAgICB7eyBpdGVtLmRhdGUgfCBkYXRlIH19XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd1RpbWVcIj4gfCB7eyBpdGVtLmRhdGUgfCBkYXRlOiAnbWVkaXVtVGltZScgfX08L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJpdGVtLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleS1kYXJrXCI+XG4gICAgICAgICAgICA8c3Ryb25nIGNsYXNzPVwiZGVjLWNvbG9yLWJsYWNrXCI+e3sgaXRlbS5kZXNjcmlwdGlvbiB9fTwvc3Ryb25nPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtdGFiLWJvZHktY29udGVudHtwYWRkaW5nOjE2cHggMH0ubWF0LWZvcm0tZmllbGQtcHJlZml4e21hcmdpbi1yaWdodDo4cHghaW1wb3J0YW50fS5tYXQtZm9ybS1maWVsZC1zdWZmaXh7bWFyZ2luLWxlZnQ6OHB4IWltcG9ydGFudH0ubWF0LWVsZXZhdGlvbi16MHtib3gtc2hhZG93OjAgMCAwIDAgcmdiYSgwLDAsMCwuMiksMCAwIDAgMCByZ2JhKDAsMCwwLC4xNCksMCAwIDAgMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejF7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoye2JveC1zaGFkb3c6MCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16M3tib3gtc2hhZG93OjAgM3B4IDNweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgM3B4IDRweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejR7Ym94LXNoYWRvdzowIDJweCA0cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDRweCA1cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMTBweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NXtib3gtc2hhZG93OjAgM3B4IDVweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNXB4IDhweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxNHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo2e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA2cHggMTBweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxOHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo3e2JveC1zaGFkb3c6MCA0cHggNXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCA3cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgMnB4IDE2cHggMXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OHtib3gtc2hhZG93OjAgNXB4IDVweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOHB4IDEwcHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNHB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejl7Ym94LXNoYWRvdzowIDVweCA2cHggLTNweCByZ2JhKDAsMCwwLC4yKSwwIDlweCAxMnB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAzcHggMTZweCAycHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMHtib3gtc2hhZG93OjAgNnB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgMTBweCAxNHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMThweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMXtib3gtc2hhZG93OjAgNnB4IDdweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTFweCAxNXB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMjBweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMntib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTJweCAxN3B4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjJweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxM3tib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTNweCAxOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjRweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNHtib3gtc2hhZG93OjAgN3B4IDlweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTRweCAyMXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjZweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNXtib3gtc2hhZG93OjAgOHB4IDlweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTVweCAyMnB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMjhweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNntib3gtc2hhZG93OjAgOHB4IDEwcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE2cHggMjRweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMwcHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTd7Ym94LXNoYWRvdzowIDhweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxN3B4IDI2cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAzMnB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE4e2JveC1zaGFkb3c6MCA5cHggMTFweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMThweCAyOHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzRweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxOXtib3gtc2hhZG93OjAgOXB4IDEycHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDE5cHggMjlweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgN3B4IDM2cHggNnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjB7Ym94LXNoYWRvdzowIDEwcHggMTNweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjBweCAzMXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggMzhweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMXtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMXB4IDMzcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCA0MHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIye2JveC1zaGFkb3c6MCAxMHB4IDE0cHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIycHggMzVweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQycHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjN7Ym94LXNoYWRvdzowIDExcHggMTRweCAtN3B4IHJnYmEoMCwwLDAsLjIpLDAgMjNweCAzNnB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA5cHggNDRweCA4cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyNHtib3gtc2hhZG93OjAgMTFweCAxNXB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyNHB4IDM4cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NnB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1iYWRnZS1zbWFsbCAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjZweH0ubWF0LWJhZGdlLWxhcmdlIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6MjRweH0ubWF0LWgxLC5tYXQtaGVhZGxpbmUsLm1hdC10eXBvZ3JhcGh5IGgxe2ZvbnQ6NDAwIDI0cHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDIsLm1hdC10aXRsZSwubWF0LXR5cG9ncmFwaHkgaDJ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMywubWF0LXN1YmhlYWRpbmctMiwubWF0LXR5cG9ncmFwaHkgaDN7Zm9udDo0MDAgMTZweC8yOHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNCwubWF0LXN1YmhlYWRpbmctMSwubWF0LXR5cG9ncmFwaHkgaDR7Zm9udDo0MDAgMTVweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgaDV7Zm9udDo0MDAgMTEuNjJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgaDZ7Zm9udDo0MDAgOS4zOHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWJvZHktMiwubWF0LWJvZHktc3Ryb25ne2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5LC5tYXQtYm9keS0xLC5tYXQtdHlwb2dyYXBoeXtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSBwLC5tYXQtYm9keS0xIHAsLm1hdC10eXBvZ3JhcGh5IHB7bWFyZ2luOjAgMCAxMnB4fS5tYXQtY2FwdGlvbiwubWF0LXNtYWxse2ZvbnQ6NDAwIDEycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1kaXNwbGF5LTQsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS00e2ZvbnQ6MzAwIDExMnB4LzExMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDU2cHg7bGV0dGVyLXNwYWNpbmc6LS4wNWVtfS5tYXQtZGlzcGxheS0zLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktM3tmb250OjQwMCA1NnB4LzU2cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAyZW19Lm1hdC1kaXNwbGF5LTIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ye2ZvbnQ6NDAwIDQ1cHgvNDhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDA1ZW19Lm1hdC1kaXNwbGF5LTEsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0xe2ZvbnQ6NDAwIDM0cHgvNDBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4fS5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtZmxhdC1idXR0b24sLm1hdC1pY29uLWJ1dHRvbiwubWF0LW1pbmktZmFiLC5tYXQtcmFpc2VkLWJ1dHRvbiwubWF0LXN0cm9rZWQtYnV0dG9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1idXR0b24tdG9nZ2xlLC5tYXQtY2FyZHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWNhcmQtY29udGVudCwubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZSwubWF0LWNhcmQtc3VidGl0bGV7Zm9udC1zaXplOjE0cHh9Lm1hdC1jaGVja2JveHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jaGVja2JveC1sYXlvdXQgLm1hdC1jaGVja2JveC1sYWJlbHtsaW5lLWhlaWdodDoyNHB4fS5tYXQtY2hpcHtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDoxOHB4fS5tYXQtY2hpcCAubWF0LWNoaXAtcmVtb3ZlLm1hdC1pY29uLC5tYXQtY2hpcCAubWF0LWNoaXAtdHJhaWxpbmctaWNvbi5tYXQtaWNvbntmb250LXNpemU6MThweH0ubWF0LXRhYmxle2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWhlYWRlci1jZWxse2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNlbGwsLm1hdC1mb290ZXItY2VsbHtmb250LXNpemU6MTRweH0ubWF0LWNhbGVuZGFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhbGVuZGFyLWJvZHl7Zm9udC1zaXplOjEzcHh9Lm1hdC1jYWxlbmRhci1ib2R5LWxhYmVsLC5tYXQtY2FsZW5kYXItcGVyaW9kLWJ1dHRvbntmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXIgdGh7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtZGlhbG9nLXRpdGxle2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTVweDtmb250LXdlaWdodDo0MDB9Lm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlO2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjEyNTtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29ue2ZvbnQtc2l6ZToxNTAlO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b257aGVpZ2h0OjEuNWVtO3dpZHRoOjEuNWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbntoZWlnaHQ6MS4xMjVlbTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNWVtIDA7Ym9yZGVyLXRvcDouODQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudH0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlcnt0b3A6LS44NDM3NWVtO3BhZGRpbmctdG9wOi44NDM3NWVtfS5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7Zm9udC1zaXplOjc1JTttYXJnaW4tdG9wOi42NjY2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjc5MTY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi40Mzc1ZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbDotd2Via2l0LWF1dG9maWxsKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIzZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM1JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjI4MTI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye21hcmdpbi10b3A6LjU0MTY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNjY2NjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouMjVlbSAwIC43NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjA5Mzc1ZW07bWFyZ2luLXRvcDotLjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6MWVtIDB9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtb3V0bGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjg0Mzc1ZW07bWFyZ2luLXRvcDotLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyLC5tYXQtZ3JpZC10aWxlLWhlYWRlcntmb250LXNpemU6MTRweH0ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lLC5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTJweH1pbnB1dC5tYXQtaW5wdXQtZWxlbWVudHttYXJnaW4tdG9wOi0uMDYyNWVtfS5tYXQtbWVudS1pdGVte2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1wYWdpbmF0b3IsLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4fS5tYXQtcmFkaW8tYnV0dG9uLC5tYXQtc2VsZWN0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNlbGVjdC10cmlnZ2Vye2hlaWdodDoxLjEyNWVtfS5tYXQtc2xpZGUtdG9nZ2xlLWNvbnRlbnR7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1zdGVwcGVyLWhvcml6b250YWwsLm1hdC1zdGVwcGVyLXZlcnRpY2Fse2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXN0ZXAtbGFiZWx7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtc3RlcC1sYWJlbC1zZWxlY3RlZHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC10YWItZ3JvdXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLWxpbmt7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRvb2xiYXIsLm1hdC10b29sYmFyIGgxLC5tYXQtdG9vbGJhciBoMiwubWF0LXRvb2xiYXIgaDMsLm1hdC10b29sYmFyIGg0LC5tYXQtdG9vbGJhciBoNSwubWF0LXRvb2xiYXIgaDZ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MH0ubWF0LXRvb2x0aXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjZweDtwYWRkaW5nLWJvdHRvbTo2cHh9Lm1hdC10b29sdGlwLWhhbmRzZXR7Zm9udC1zaXplOjE0cHg7cGFkZGluZy10b3A6OXB4O3BhZGRpbmctYm90dG9tOjlweH0ubWF0LWxpc3QtaXRlbSwubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWxpc3QgLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTZweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxNHB4fS5tYXQtbGlzdCAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTJweH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LW9wdGlvbntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHh9Lm1hdC1vcHRncm91cC1sYWJlbHtmb250OjUwMCAxNHB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2ltcGxlLXNuYWNrYmFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweH0ubWF0LXNpbXBsZS1zbmFja2Jhci1hY3Rpb257bGluZS1oZWlnaHQ6MTtmb250LWZhbWlseTppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRyZWV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdHJlZS1ub2Rle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTRweH0ubWF0LXJpcHBsZXtvdmVyZmxvdzpoaWRkZW59QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7Lm1hdC1yaXBwbGV7ZGlzcGxheTpub25lfX0ubWF0LXJpcHBsZS5tYXQtcmlwcGxlLXVuYm91bmRlZHtvdmVyZmxvdzp2aXNpYmxlfS5tYXQtcmlwcGxlLWVsZW1lbnR7cG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyLXJhZGl1czo1MCU7cG9pbnRlci1ldmVudHM6bm9uZTt0cmFuc2l0aW9uOm9wYWNpdHksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7dHJhbnNpdGlvbjpvcGFjaXR5LHRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpLC13ZWJraXQtdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfS5jZGstdmlzdWFsbHktaGlkZGVue2JvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O21hcmdpbjotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MXB4O291dGxpbmU6MDstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXIsLmNkay1vdmVybGF5LWNvbnRhaW5lcntwb2ludGVyLWV2ZW50czpub25lO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1jb250YWluZXI6ZW1wdHl7ZGlzcGxheTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlcntkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1wYW5le3Bvc2l0aW9uOmFic29sdXRlO3BvaW50ZXItZXZlbnRzOmF1dG87Ym94LXNpemluZzpib3JkZXItYm94O3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7bWF4LXdpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlfS5jZGstb3ZlcmxheS1iYWNrZHJvcHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDt6LWluZGV4OjEwMDA7cG9pbnRlci1ldmVudHM6YXV0bzstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7dHJhbnNpdGlvbjpvcGFjaXR5IC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtvcGFjaXR5OjB9LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eToxfUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6LjZ9fS5jZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9we2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMjg4KX0uY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AsLmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTowfS5jZGstb3ZlcmxheS1jb25uZWN0ZWQtcG9zaXRpb24tYm91bmRpbmctYm94e3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21pbi13aWR0aDoxcHg7bWluLWhlaWdodDoxcHh9LmNkay1nbG9iYWwtc2Nyb2xsYmxvY2t7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtvdmVyZmxvdy15OnNjcm9sbH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOi13ZWJraXQtYXV0b2ZpbGx7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOm5vdCg6LXdlYmtpdC1hdXRvZmlsbCl7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZXtyZXNpemU6bm9uZX10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5ne2hlaWdodDphdXRvIWltcG9ydGFudDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3BhZGRpbmc6MnB4IDAhaW1wb3J0YW50O2JveC1zaXppbmc6Y29udGVudC1ib3ghaW1wb3J0YW50fS5oaXN0b3J5LWNvbnRhaW5lcnttYXJnaW46MS41ZW0gMH0uaGlzdG9yeS1jb250YWluZXIubGltaXRlZC1oZWlnaHR7b3ZlcmZsb3cteTphdXRvfS5oaXN0b3J5LWNvbnRhaW5lciAuaGlzdG9yeS1pdGVtOm5vdCg6bGFzdC1jaGlsZCl7cG9zaXRpb246cmVsYXRpdmV9Lmhpc3RvcnktY29udGFpbmVyIC5oaXN0b3J5LWl0ZW06bm90KDpsYXN0LWNoaWxkKTo6YmVmb3Jle2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6M2VtO3dpZHRoOjJweDtiYWNrZ3JvdW5kLWNvbG9yOiM5MTk3OWM7bGVmdDoxMXB4O3RvcDoxNHB4fS5oaXN0b3J5LWNvbnRhaW5lciAuaGlzdG9yeS1pdGVtIC5zbWFsbGVyLWljb257Zm9udC1zaXplOjE2cHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7bWFyZ2luLXRvcDoycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RlcHNMaXN0Q29tcG9uZW50IHtcblxuICBASW5wdXQoKSBpY29uID0gJ2hpc3RvcnknO1xuXG4gIEBJbnB1dCgpIHRpdGxlID0gJyc7XG5cbiAgQElucHV0KCkgc2hvd1RpbWU6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbWF4SGVpZ2h0O1xuXG4gIEBJbnB1dCgpIHN0ZXBzTGlzdDogU3RlcFtdID0gW107XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU3RlcHNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc3RlcHMtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNTdGVwc0xpc3RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjU3RlcHNMaXN0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RlcHNMaXN0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIGZvcndhcmRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc3RyaW5nLWFycmF5LWlucHV0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtb2RlID09ICdpbnB1dCdcIj5cblxuICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgWyhuZ01vZGVsKV09XCJ2YWx1ZUFzU3RyaW5nXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cblxuICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgPHRleHRhcmVhIG1hdElucHV0XG4gICAgW3Jvd3NdPVwicm93c1wiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgWyhuZ01vZGVsKV09XCJ2YWx1ZUFzU3RyaW5nXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgICA8L3RleHRhcmVhPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY1N0cmluZ0FycmF5SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIG5hbWU7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI7XG5cbiAgQElucHV0KCkgbW9kZSA9ICd0ZXh0YXJlYSc7XG5cbiAgQElucHV0KCkgcm93cyA9IDM7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZ1tdIHtcblxuICAgIHJldHVybiB0aGlzLmlubmVyQXJyYXk7XG5cbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IHN0cmluZ1tdKSB7XG5cbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lckFycmF5KSB7XG5cbiAgICAgIHRoaXMuaW5uZXJBcnJheSA9IHY7XG5cbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IHZhbHVlQXNTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLmdldEFycmF5QXNTdHJpbmcoKTtcblxuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWVBc1N0cmluZyh2OiBzdHJpbmcpIHtcblxuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyQXJyYXkpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RyaW5nVG9BcnJheSh2KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lckFycmF5OiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIC8vXG4gIGdldEFycmF5QXNTdHJpbmcoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5hcnJheVRvU3RyaW5nKHRoaXMudmFsdWUpO1xuXG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmdbXSkge1xuXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgIH1cblxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdHJpbmdUb0FycmF5KHN0cmluZ09mQXJyYXk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBpZiAoc3RyaW5nT2ZBcnJheSkge1xuXG4gICAgICBjb25zdCByZWdFeHAgPSAvW14sXFxzXVteLFxcc10qW14sXFxzXSovZztcblxuICAgICAgcmV0dXJuIHN0cmluZ09mQXJyYXkubWF0Y2gocmVnRXhwKTtcblxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXJyYXlUb1N0cmluZyhhcnJheU9mc3RyaW5nOiBzdHJpbmdbXSk6IHN0cmluZyB7XG5cbiAgICBpZiAoYXJyYXlPZnN0cmluZykge1xuXG4gICAgICByZXR1cm4gYXJyYXlPZnN0cmluZy5qb2luKCcsICcpO1xuXG4gICAgfVxuXG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc3RyaW5nLWFycmF5LWlucHV0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RyaW5nQXJyYXlJbnB1dE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXRhYicsXG4gIHRlbXBsYXRlOiBgYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRvdGFsOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgY29udGVudDogVGVtcGxhdGVSZWY8RGVjVGFiQ29tcG9uZW50PjtcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZW5zdXJlVGFiTmFtZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVUYWJOYW1lID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlY1RhYkNvbXBvbmVudEVycm9yOiBUaGUgPGRlYy10YWI+IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50LicpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy10YWItbWVudScsXG4gIHRlbXBsYXRlOiBgPHA+XG4gIHRhYi1tZW51IHdvcmtzIVxuPC9wPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYk1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGFjdGl2ZVRhYjogc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPERlY1RhYk1lbnVDb21wb25lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi90YWIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1RhYk1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RhYi1tZW51L3RhYi1tZW51LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy10YWJzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiIWhpZGRlblwiPlxuXG4gIDwhLS0gVEFCUyAtLT5cbiAgPG1hdC10YWItZ3JvdXAgW3NlbGVjdGVkSW5kZXhdPVwiYWN0aXZlVGFiSW5kZXhcIiAoZm9jdXNDaGFuZ2UpPVwib25DaGFuZ2VUYWIoJGV2ZW50KVwiIFtkeW5hbWljSGVpZ2h0XT1cInRydWVcIj5cblxuICAgIDwhLS0gVEFCIC0tPlxuICAgIDxtYXQtdGFiICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFicztcIiBbZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCI+XG5cbiAgICAgIDwhLS0gVEFCIExBQkVMIC0tPlxuICAgICAgPG5nLXRlbXBsYXRlIG1hdC10YWItbGFiZWw+XG4gICAgICAgIHt7IHRhYi5sYWJlbCB9fVxuICAgICAgICA8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2Utc21hbGxcIiAqbmdJZj1cInRhYi50b3RhbCA+PSAwXCI+e3sgcGFyc2VUb3RhbCh0YWIudG90YWwpIH19PC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPCEtLSBUQUIgQ09OVEVOVCBXUkFQUEVSIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3VsVGFiQmVEaXNwbGF5ZWQodGFiKVwiPlxuXG4gICAgICAgIDwhLS0gVEFCIE1FTlUgLS0+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0YWJNZW51Q29tcG9uZW50XCIgY2xhc3M9XCJtZW51LXdyYXBwZXJcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiTWVudUNvbXBvbmVudC5jb250ZW50OyBjb250ZXh0OiB7IGFjdGl2ZVRhYjogYWN0aXZlVGFiIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBUQUJTIENPTlRFTlQgLS0+XG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd0YWItcGFkZGluZyc6IHBhZGRpbmd9XCI+XG5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8L21hdC10YWI+XG5cbiAgPC9tYXQtdGFiLWdyb3VwPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubWVudS13cmFwcGVye3RleHQtYWxpZ246cmlnaHQ7cGFkZGluZzo4cHggMH0udGFiLXBhZGRpbmd7cGFkZGluZzoxNnB4IDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBAQ29udGVudENoaWxkcmVuKERlY1RhYkNvbXBvbmVudCkgdGFiczogUXVlcnlMaXN0PERlY1RhYkNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZChEZWNUYWJNZW51Q29tcG9uZW50KSB0YWJNZW51Q29tcG9uZW50OiBEZWNUYWJNZW51Q29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIGhpZGRlbjsgLy8gaGlkZXMgdGhlIHRhYnMgZ3JvdXAgdG8gcmVsb2FkIGl0cyBjb250ZW50c1xuXG4gIEBJbnB1dCgpIHBlcnNpc3QgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkJsdXIgPSBmYWxzZTtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGFkZGluZyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IGFjdGl2ZVRhYih2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAmJiB0aGlzLl9hY3RpdmVUYWIgIT09IHYpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IHY7XG4gICAgICB0aGlzLnBlcnNpc3RUYWIodik7XG4gICAgfVxuICB9XG4gIGdldCBhY3RpdmVUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYjtcbiAgfVxuXG4gIEBPdXRwdXQoKSBhY3RpdmVUYWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgZ2V0IGFjdGl2ZVRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYkluZGV4O1xuICB9XG5cbiAgZ2V0IGFjdGl2ZVRhYk9iamVjdCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVUYWJPYmplY3Q7XG4gIH1cblxuICBwcml2YXRlIF9hY3RpdmVUYWI6IHN0cmluZztcblxuICBwcml2YXRlIF9hY3RpdmVUYWJJbmRleDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYk9iamVjdDogYW55O1xuXG4gIHByaXZhdGUgYWN0aXZhdGVkVGFiczogYW55ID0ge307XG5cbiAgcHJpdmF0ZSBxdWVyeVBhcmFtc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgcGF0aEZyb21Sb290ID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5lbnN1cmVVbmlxdWVOYW1lKCk7XG4gICAgdGhpcy53YXRjaFRhYkluVXJsUXVlcnkoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZVRhYk5hbWVzKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG4gICAgICBpZiAocXVlcnlQYXJhbXMgJiYgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUYWIgPSBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV07XG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKGN1cnJlbnRUYWIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGFydFNlbGVjdGVkVGFiKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgc2hvdWxUYWJCZURpc3BsYXllZCh0YWIpIHtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gdGhpcy5fYWN0aXZlVGFiT2JqZWN0ID09PSB0YWI7XG4gICAgY29uc3QgaXNBY3RpdmF0ZWQgPSB0aGlzLmFjdGl2YXRlZFRhYnNbdGFiLm5hbWVdO1xuICAgIHJldHVybiBpc1NlbGVjdGVkIHx8ICghdGhpcy5kZXN0cm95T25CbHVyICYmIGlzQWN0aXZhdGVkKTtcbiAgfVxuXG4gIG9uQ2hhbmdlVGFiKCRldmVudCkge1xuICAgIGNvbnN0IGFjdGl2ZVRhYk9iamVjdCA9IHRoaXMudGFicy50b0FycmF5KClbJGV2ZW50LmluZGV4XTtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IGFjdGl2ZVRhYk9iamVjdC5uYW1lO1xuICB9XG5cbiAgcGFyc2VUb3RhbCh0b3RhbCkge1xuXG4gICAgcmV0dXJuIHRvdGFsICE9PSBudWxsICYmIHRvdGFsID49IDAgPyAgdG90YWwgOiAnPyc7XG5cbiAgfVxuXG4gIHJlc2V0KCkge1xuXG4gICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG5cbiAgICB9LCAxMCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgY29tcG9uZW50VGFiTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy10YWInO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVOYW1lID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlY1RhYkNvbXBvbmVudEVycm9yOiBUaGUgdGFiIGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGVuc3VyZVVuaXF1ZVRhYk5hbWVzXG4gICAqIFRoaXMgbWV0aG9kIHByZXZlbnRzIHRoZSB1c2Ugb2YgdGhlIHNhbWUgbmFtZSBmb3IgbW9yZSB0aGFuIG9uZSB0YWJcbiAgICogd2hhdCB3b3VsZCBlbmRpbmcgdXAgY29uZmxpY3RpbmcgdGhlIHRhYnMgYWN0aXZhdGlvbiBvbmNlIHRoaXMgaXMgZG9uZSB2aWEgdGFiIG5hbWVcbiAgKi9cblxuICBwcml2YXRlIGVuc3VyZVVuaXF1ZVRhYk5hbWVzID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXMsIHJlaikgPT4ge1xuICAgICAgY29uc3QgbmFtZXMgPSB7fTtcbiAgICAgIHRoaXMudGFicy50b0FycmF5KCkuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgICBpZiAoIW5hbWVzW3RhYi5uYW1lXSkge1xuICAgICAgICAgIG5hbWVzW3RhYi5uYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSA8ZGVjLXRhYnM+IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFRoZSBuYW1lICR7dGFiLm5hbWV9IHdhcyB1c2VkIG1vcmUgdGhhbiBvbmNlLmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJzaXN0VGFiKHRhYikge1xuICAgIGlmICh0aGlzLnBlcnNpc3QpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgICAgIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXSA9IHRhYjtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLiddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcywgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdFRhYiA9ICh0YWJOYW1lKSA9PiB7XG4gICAgaWYgKHRoaXMudGFicykge1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWJOYW1lO1xuICAgICAgdGhpcy5hY3RpdmF0ZWRUYWJzW3RhYk5hbWVdID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYk9iamVjdCA9IHRoaXMudGFicy50b0FycmF5KCkuZmlsdGVyKHRhYiA9PiB0YWIubmFtZSA9PT0gdGFiTmFtZSlbMF07XG4gICAgICB0aGlzLl9hY3RpdmVUYWJJbmRleCA9IHRoaXMudGFicy50b0FycmF5KCkuaW5kZXhPZih0aGlzLl9hY3RpdmVUYWJPYmplY3QpO1xuICAgICAgdGhpcy5hY3RpdmVUYWJDaGFuZ2UuZW1pdCh0YWJOYW1lKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0U2VsZWN0ZWRUYWIoKSB7XG4gICAgY29uc3QgYWN0aXZlVGFiID0gdGhpcy5hY3RpdmVUYWIgfHwgdGhpcy50YWJzLnRvQXJyYXkoKVswXS5uYW1lO1xuICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBhdm9pZCBjaGFuZ2UgYWZ0ZXIgY29tcG9uZW50IGNoZWNrZWQgZXJyb3JcbiAgICAgIHRoaXMuc2VsZWN0VGFiKGFjdGl2ZVRhYik7XG4gICAgfSwgMSk7XG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFiSW5VcmxRdWVyeSgpIHtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtc1xuICAgIC5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuICAgICAgY29uc3QgdGFiOiBzdHJpbmcgPSBwYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldO1xuICAgICAgdGhpcy5zZWxlY3RUYWIodGFiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpIHtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY1RhYkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNUYWJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNUYWJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNUYWJzQ29tcG9uZW50IH0gZnJvbSAnLi90YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNUYWJNb2R1bGUgfSBmcm9tICcuL3RhYi90YWIubW9kdWxlJztcbmltcG9ydCB7IERlY1RhYk1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RhYi1tZW51L3RhYi1tZW51LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBEZWNUYWJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjVGFic0NvbXBvbmVudCwgRGVjVGFiTWVudUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNUYWJzQ29tcG9uZW50LFxuICAgIERlY1RhYk1lbnVDb21wb25lbnQsXG4gICAgRGVjVGFiTW9kdWxlXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYnNNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFdmVudFR5cGUsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBVcGxvYWRQcm9ncmVzcyB9IGZyb20gJy4vdXBsb2FkLm1vZGVscyc7XG5cbmNvbnN0IFVQTE9BRF9FTkRQT0lOVCA9ICcvdXBsb2FkJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5leHBvcnQgY29uc3QgREVDX1VQTE9BRF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNVcGxvYWRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXVwbG9hZCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiKHByb2dyZXNzZXMgJiYgcHJvZ3Jlc3Nlcy5sZW5ndGgpID8gdHJ1ZSA6IGZhbHNlXCI+XG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgPHNwYW4gKGNsaWNrKT1cIm9wZW5GaWxlU2VsZWN0aW9uKClcIiBjbGFzcz1cImNsaWNrXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHVwbG9hZFByb2dyZXNzIG9mIHByb2dyZXNzZXNcIiBjbGFzcz1cImRlYy11cGxvYWQtcHJvZ3Jlc3Mtd3JhcHBlclwiPlxuICAgICAgPG1hdC1wcm9ncmVzcy1iYXJcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgW21vZGVdPVwiZ2V0UHJvZ3Jlc3NiYXJNb2RlKHVwbG9hZFByb2dyZXNzKVwiXG4gICAgICAgIFt2YWx1ZV09XCJnZXRQcm9ncmVzc1ZhbHVlQmFzZWRPbk1vZGUodXBsb2FkUHJvZ3Jlc3MpXCI+XG4gICAgICA8L21hdC1wcm9ncmVzcy1iYXI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgPHNtYWxsPlxuICAgICAgICAgIHt7IHVwbG9hZFByb2dyZXNzLnZhbHVlIH19JSAtIHt7IHVwbG9hZFByb2dyZXNzLmZpbGVOYW1lIH19XG4gICAgICAgIDwvc21hbGw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cblxuXG48aW5wdXQgdHlwZT1cImZpbGVcIiAjaW5wdXRGaWxlIChjaGFuZ2UpPVwiZmlsZXNDaGFuZ2VkKCRldmVudClcIiBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cblxuYCxcbiAgc3R5bGVzOiBbYC5jbGlja3tjdXJzb3I6cG9pbnRlcn1pbnB1dHtkaXNwbGF5Om5vbmV9LnRleHQtY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5kZWMtdXBsb2FkLXByb2dyZXNzLXdyYXBwZXJ7cGFkZGluZzo4cHggMH1gXSxcbiAgcHJvdmlkZXJzOiBbREVDX1VQTE9BRF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgcHJvZ3Jlc3NlczogVXBsb2FkUHJvZ3Jlc3NbXSA9IFtdO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdXBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpIHByb2dyZXNzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0RmlsZScpIGlucHV0RmlsZTogRWxlbWVudFJlZjtcblxuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55W107XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZSkge31cblxuICAvKlxuICAqKiBuZ01vZGVsIFZBTFVFXG4gICovXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2OiBhbnlbXSkge1xuICAgIHRoaXMudmFsdWUgPSB2O1xuICB9XG5cblxuICBmaWxlc0NoYW5nZWQoZXZlbnQpIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGV2ZW50LnRhcmdldC5maWxlcy5sZW5ndGg7IHgrKykge1xuICAgICAgdGhpcy51cGxvYWRGaWxlKGV2ZW50LnRhcmdldC5maWxlc1t4XSwgeCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkZpbGVTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5pbnB1dEZpbGUubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG5cbiAgZ2V0UHJvZ3Jlc3NiYXJNb2RlKHByb2dyZXNzKSB7XG5cbiAgICBsZXQgbW9kZTtcblxuICAgIHN3aXRjaCAocHJvZ3Jlc3MudmFsdWUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbW9kZSA9ICdidWZmZXInO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTAwOlxuICAgICAgICBtb2RlID0gJ2luZGV0ZXJtaW5hdGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gbW9kZTtcblxuICB9XG5cbiAgZ2V0UHJvZ3Jlc3NWYWx1ZUJhc2VkT25Nb2RlKHByb2dyZXNzKSB7XG4gICAgY29uc3QgbW9kZSA9IHRoaXMuZ2V0UHJvZ3Jlc3NiYXJNb2RlKHByb2dyZXNzKTtcbiAgICBjb25zdCB2YWx1ZSA9IG1vZGUgPT09ICdidWZmZXInID8gMCA6IHByb2dyZXNzLnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBsb2FkRmlsZShmaWxlLCBpbmRleCkge1xuICAgIGlmIChmaWxlKSB7XG4gICAgICBjb25zdCBwcm9ncmVzczogVXBsb2FkUHJvZ3Jlc3MgPSB7XG4gICAgICAgIGZpbGVJbmRleDogaW5kZXgsXG4gICAgICAgIGZpbGVOYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgIHZhbHVlOiAwLFxuICAgICAgfTtcbiAgICAgIHRoaXMucHJvZ3Jlc3Nlcy5wdXNoKHByb2dyZXNzKTtcbiAgICAgIHRoaXMuc2VydmljZS51cGxvYWQoVVBMT0FEX0VORFBPSU5ULCBbZmlsZV0pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjYXRjaEVycm9yJywgZXJyb3IpO1xuICAgICAgICAgIHByb2dyZXNzLmVycm9yID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoJ21lc3NhZ2UuZXJyb3IudW5leHBlY3RlZCcpO1xuICAgICAgICAgIHRoaXMuZGV0ZWN0VXBsb2FkRW5kKCk7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgICBjb25zdCBwZXJjZW50RG9uZSA9IE1hdGgucm91bmQoKDEwMCAqIGV2ZW50LmxvYWRlZCkgLyBldmVudC50b3RhbCk7XG4gICAgICAgICAgcHJvZ3Jlc3MudmFsdWUgPSBwZXJjZW50RG9uZSA9PT0gMTAwID8gcGVyY2VudERvbmUgOiBwYXJzZUZsb2F0KHBlcmNlbnREb25lLnRvRml4ZWQoMikpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgcHJvZ3Jlc3MudmFsdWUgPSAxMDA7XG4gICAgICAgICAgcHJvZ3Jlc3MuZmlsZSA9IGV2ZW50LmJvZHk7XG4gICAgICAgICAgdGhpcy5kZXRlY3RVcGxvYWRFbmQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb2dyZXNzLmVtaXQodGhpcy5wcm9ncmVzc2VzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0VXBsb2FkRW5kKCkge1xuXG4gICAgY29uc3Qgc3RpbGxVcGxvYWRpbmcgPSB0aGlzLnByb2dyZXNzZXMuZmlsdGVyKChwcm9ncmVzcykgPT4ge1xuICAgICAgcmV0dXJuIHByb2dyZXNzLnZhbHVlIDwgMTAwO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzdGlsbFVwbG9hZGluZy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZW1pdFVwbG9hZGVkRmlsZXMoKTtcbiAgICAgIHRoaXMuY2xlYXJJbnB1dEZpbGUoKTtcbiAgICAgIHRoaXMuY2xlYXJQcm9ncmVzc2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcklucHV0RmlsZSgpIHtcbiAgICB0aGlzLmlucHV0RmlsZS5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyUHJvZ3Jlc3NlcygpIHtcbiAgICB0aGlzLnByb2dyZXNzZXMgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdFVwbG9hZGVkRmlsZXMoKSB7XG4gICAgY29uc3QgZmlsZXMgPSB0aGlzLnByb2dyZXNzZXMubWFwKCh1cGxvYWRQcm9ncmVzczogVXBsb2FkUHJvZ3Jlc3MpID0+IHtcbiAgICAgIHJldHVybiB1cGxvYWRQcm9ncmVzcy5maWxlO1xuICAgIH0pO1xuICAgIHRoaXMudmFsdWUgPSBbLi4uZmlsZXNdO1xuICAgIHRoaXMudXBsb2FkZWQuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGlvblRva2VuLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VydmljZUNvbmZpZyB9IGZyb20gJy4vZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgREVDT1JBX0FQSV9TRVJWSUNFX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTZXJ2aWNlQ29uZmlnPignREVDT1JBX0FQSV9TRVJWSUNFX0NPTkZJRycpO1xuXG5leHBvcnQgZnVuY3Rpb24gSW5pdERlY0FwaVNlcnZpY2UoaHR0cDogSHR0cENsaWVudCwgc2VydmljZUNvbmZpZzogU2VydmljZUNvbmZpZykge1xuICByZXR1cm4gbmV3IERlY0FwaVNlcnZpY2UoaHR0cCwgc2VydmljZUNvbmZpZyk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0FwaU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU2VydmljZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRGVjQXBpTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogREVDT1JBX0FQSV9TRVJWSUNFX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRGVjQXBpU2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBJbml0RGVjQXBpU2VydmljZSxcbiAgICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgREVDT1JBX0FQSV9TRVJWSUNFX0NPTkZJR11cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNVcGxvYWRDb21wb25lbnQgfSBmcm9tICcuL3VwbG9hZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjQXBpTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIERlY0FwaU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjVXBsb2FkQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNVcGxvYWRDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNVcGxvYWRNb2R1bGUge31cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkLCBDYW5Mb2FkLCBSb3V0ZSwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjQXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuTG9hZCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlXG4gICkge31cblxuICBjYW5Mb2FkKHJvdXRlOiBSb3V0ZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzQXV0aGVudGljYXRlZCgpO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZUNoaWxkKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzQXV0aGVudGljYXRlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0F1dGhlbnRpY2F0ZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuZGVjb3JhQXBpLmZldGNoQ3VycmVudExvZ2dlZFVzZXIoKVxuICAgIC5waXBlKFxuICAgICAgbWFwKCh1c2VyOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuICh1c2VyICYmIHVzZXIuaWQpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfSlcbiAgICApIGFzIE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRoR3VhcmQgfSBmcm9tICcuL2F1dGgtZ3VhcmQuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGVjQXV0aEd1YXJkXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjR3VhcmRNb2R1bGUgeyB9XG4iLCJleHBvcnQgY2xhc3MgVXNlckF1dGhEYXRhIHtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgY291bnRyeTogc3RyaW5nO1xuICBwdWJsaWMgY29tcGFueTogc3RyaW5nO1xuICBwdWJsaWMgcm9sZTogbnVtYmVyO1xuICBwdWJsaWMgcGVybWlzc2lvbnM6IEFycmF5PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IodXNlcjogYW55ID0ge30pIHtcbiAgICB0aGlzLmlkID0gdXNlci5pZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5lbWFpbCA9IHVzZXIuZW1haWwgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMubmFtZSA9IHVzZXIubmFtZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5jb3VudHJ5ID0gdXNlci5jb3VudHJ5IHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvbXBhbnkgPSB1c2VyLmNvbXBhbnkgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucm9sZSA9IHVzZXIucm9sZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5wZXJtaXNzaW9ucyA9IHVzZXIucGVybWlzc2lvbnMgfHwgdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9naW5EYXRhIHtcbiAgZW1haWw6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbiAga2VlcExvZ2dlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNlYm9va0xvZ2luRGF0YSB7XG4gIGtlZXBMb2dnZWQ6IGJvb2xlYW47XG4gIGZhY2Vib29rVG9rZW46IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXJ2aWNlQ29uZmlnIHtcbiAgaG9zdDogc3RyaW5nO1xuICBhdXRoSG9zdD86IHN0cmluZztcbiAgdXNlTW9ja0FwaT86IGJvb2xlYW47XG4gIG1vY2tBcGlIb3N0Pzogc3RyaW5nO1xufVxuXG5cblxuLypcbiAgKiBGaWx0ZXJHcm91cHNcbiAgKlxuICAqIGFuIEFycmF5IG9mIGZpbHRlciBncm91cFxuICAqL1xuZXhwb3J0IHR5cGUgRmlsdGVyR3JvdXBzID0gRmlsdGVyR3JvdXBbXTtcblxuLypcbiAgKiBGaWx0ZXJzXG4gICpcbiAgKiBhbiBBcnJheSBvZiBmaWx0ZXJcbiAgKi9cbmV4cG9ydCB0eXBlIEZpbHRlcnMgPSBGaWx0ZXJbXTtcblxuLypcbiAgKiBGaWx0ZXJEYXRhXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJEYXRhIHtcbiAgZW5kcG9pbnQ6IHN0cmluZztcbiAgcGF5bG9hZDogRGVjRmlsdGVyO1xuICBjYms/OiBGdW5jdGlvbjtcbiAgY2xlYXI/OiBib29sZWFuO1xufVxuXG4vKlxuICAqIEZpbHRlclxuICAqXG4gICogRmlsdGVyIGNvbmZpZ3VyYXRpb25cbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjRmlsdGVyIHtcbiAgZmlsdGVyR3JvdXBzPzogRmlsdGVyR3JvdXBzO1xuICBwcm9qZWN0Vmlldz86IGFueTtcbiAgY29sdW1ucz86IGFueTtcbiAgcGFnZT86IG51bWJlcjtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHRleHRTZWFyY2g/OiBzdHJpbmc7XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemVkRGVjRmlsdGVyIHtcbiAgZmlsdGVyPzogc3RyaW5nO1xuICBwcm9qZWN0Vmlldz86IHN0cmluZztcbiAgY29sdW1ucz86IHN0cmluZztcbiAgcGFnZT86IG51bWJlcjtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHRleHRTZWFyY2g/OiBzdHJpbmc7XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBTaWdubGUgZmlsdGVyXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlciB7XG4gIHByb3BlcnR5OiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXTtcbn1cblxuLypcbiAgKiBGaWx0ZXJHcm91cFxuICAqXG4gICogR3JvdXAgb2YgRmlsdGVyXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckdyb3VwIHtcbiAgZmlsdGVyczogRmlsdGVycztcbn1cblxuLypcbiAgKiBDb2x1bW5zU29ydENvbmZpZ1xuICAqXG4gICogQ29uZmlndXJhdGlvbiB0byBzb3J0IGNvbHVtbnNcbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uc1NvcnRDb25maWcge1xuICBwcm9wZXJ0eTogc3RyaW5nO1xuICBvcmRlcjoge1xuICAgIHR5cGU6ICdhc2MnIHwgJ2Rlc2MnXG4gIH07XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTbmFja0JhciwgTWF0U25hY2tCYXJSZWYsIFNpbXBsZVNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VUeXBlID0gJ3N1Y2Nlc3MnIHwgJ3ByaW1hcnknIHwgJ2luZm8nIHwgJ3dhcm4nIHwgJ2Vycm9yJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGVjU25hY2tCYXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc25hY2tCYXJTZXJ2aWNlOiBNYXRTbmFja0JhcixcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XG5cbiAgb3BlbihtZXNzYWdlOiBzdHJpbmcsIHR5cGU6IE1lc3NhZ2VUeXBlLCBkdXJhdGlvbiA9IDRlMyk6IE1hdFNuYWNrQmFyUmVmPFNpbXBsZVNuYWNrQmFyPiB7XG4gICAgY29uc3QgbXNnID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudChtZXNzYWdlKTtcbiAgICBjb25zdCBzbmFja0NsYXNzID0gdGhpcy5nZXRDbGFzcyh0eXBlKTtcblxuICAgIHJldHVybiB0aGlzLnNuYWNrQmFyU2VydmljZS5vcGVuKG1zZywgJycsIHtcbiAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgIHBhbmVsQ2xhc3M6IHNuYWNrQ2xhc3NcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsYXNzKHR5cGU6IE1lc3NhZ2VUeXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1zdWNjZXNzJztcbiAgICAgIGNhc2UgJ3ByaW1hcnknOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLXByaW1hcnknO1xuICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgIHJldHVybiAnc25hY2staW5mbyc7XG4gICAgICBjYXNlICd3YXJuJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay13YXJuJztcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1lcnJvcic7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NuYWNrQmFyU2VydmljZSB9IGZyb20gJy4vZGVjLXNuYWNrLWJhci5zZXJ2aWNlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1NuYWNrQmFyU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NuYWNrQmFyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCwgUm91dGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBvZiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25HdWFyZCBpbXBsZW1lbnRzIENhbkxvYWQsIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XG5cbiAgY2FuTG9hZChyb3V0ZTogUm91dGUpIHtcbiAgICBpZiAocm91dGUuZGF0YSAmJiAhcm91dGUuZGF0YS5wZXJtaXNzaW9ucykge1xuICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcm1pc3Npb25zID0gcm91dGUuZGF0YS5wZXJtaXNzaW9ucztcbiAgICByZXR1cm4gdGhpcy5oYXNBY2Nlc3MocGVybWlzc2lvbnMpO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgaWYgKHJvdXRlLmRhdGEgJiYgIXJvdXRlLmRhdGEucGVybWlzc2lvbnMpIHtcbiAgICAgIHRoaXMubm90QWxsb3dlZCgpO1xuICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJtaXNzaW9ucyA9IHJvdXRlLmRhdGEucGVybWlzc2lvbnM7XG4gICAgcmV0dXJuIHRoaXMuaGFzQWNjZXNzKHBlcm1pc3Npb25zKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FuQWN0aXZhdGUocm91dGUsIHN0YXRlKTtcbiAgfVxuXG4gIG5vdEFsbG93ZWQoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZm9yYmlkZW4nXSk7XG4gIH1cblxuICBoYXNBY2Nlc3MocGVybWlzc2lvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkudXNlciRcbiAgICAucGlwZShcbiAgICAgIG1hcCh1c2VyID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICBjb25zdCBhbGxvd2VkID0gdGhpcy5pc0FsbG93ZWRBY2Nlc3ModXNlci5wZXJtaXNzaW9ucywgcGVybWlzc2lvbnMpO1xuICAgICAgICAgIGlmICghYWxsb3dlZCkge1xuICAgICAgICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FsbG93ZWRBY2Nlc3ModXNlclBlcm1pc3Npb25zOiBzdHJpbmdbXSwgY3VycmVudFBlcm1pc3Npb25zOiBzdHJpbmdbXSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXRjaGluZ1JvbGUgPSBjdXJyZW50UGVybWlzc2lvbnMuZmluZCgodXNlclJvbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHVzZXJQZXJtaXNzaW9ucy5maW5kKChhbG93ZWRSb2xlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGFsb3dlZFJvbGUgPT09IHVzZXJSb2xlO1xuICAgICAgICB9KSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoaW5nUm9sZSA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1Blcm1pc3Npb25HdWFyZCB9IGZyb20gJy4vZGVjLXBlcm1pc3Npb24tZ3VhcmQuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNQZXJtaXNzaW9uR3VhcmRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQZXJtaXNzaW9uR3VhcmRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9wZW5Db25uZWN0aW9uIH0gZnJvbSAnLi93cy1jbGllbnQubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY1dzQ2xpZW50U2VydmljZSB7XG5cbiAgcHJpdmF0ZSBjb25uZWN0aW9uOiB7XG4gICAgW2tleTogc3RyaW5nXTogT3BlbkNvbm5lY3Rpb25cbiAgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjb25uZWN0KHVybCkge1xuXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvblt1cmxdO1xuXG4gICAgaWYgKGNvbm5lY3Rpb24pIHtcblxuICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5jb25uZWN0VG9Xcyh1cmwpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGNvbm5lY3RUb1dzKHVybCk6IE9wZW5Db25uZWN0aW9uIHtcblxuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSB0aGlzLm9wZW5Db25uZWN0aW9uKHVybCk7XG5cbiAgICB0aGlzLmNvbm5lY3Rpb25bdXJsXSA9IGNvbm5lY3Rpb247XG5cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcblxuICB9XG5cblxuICBwcml2YXRlIG9wZW5Db25uZWN0aW9uKHVybDogc3RyaW5nLCBjb25uZWN0aW9uPzogT3BlbkNvbm5lY3Rpb24pOiBPcGVuQ29ubmVjdGlvbiB7XG5cbiAgICBpZiAoY29ubmVjdGlvbikge1xuXG4gICAgICBjb25uZWN0aW9uLmNoYW5uZWwgPSBuZXcgV2ViU29ja2V0KHVybCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25uZWN0aW9uID0gY29ubmVjdGlvbiA/IGNvbm5lY3Rpb24gOiB7XG4gICAgICAgIGNoYW5uZWw6IG5ldyBXZWJTb2NrZXQodXJsKSxcbiAgICAgICAgbWVzc2FnZXM6IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKSxcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICBjb25uZWN0aW9uLmNoYW5uZWwub25jbG9zZSA9ICgpID0+IHRoaXMub3BlbkNvbm5lY3Rpb24odXJsLCBjb25uZWN0aW9uKTtcblxuICAgIGNvbm5lY3Rpb24uY2hhbm5lbC5vbmVycm9yID0gKCkgPT4gdGhpcy5vcGVuQ29ubmVjdGlvbih1cmwsIGNvbm5lY3Rpb24pO1xuXG4gICAgY29ubmVjdGlvbi5jaGFubmVsLm9ubWVzc2FnZSA9IChhKSA9PiB7XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlcyA9IGNvbm5lY3Rpb24ubWVzc2FnZXMuZ2V0VmFsdWUoKTtcblxuICAgICAgY3VycmVudE1lc3NhZ2VzLnVuc2hpZnQoYS5kYXRhKTtcblxuICAgICAgY29ubmVjdGlvbi5tZXNzYWdlcy5uZXh0KGN1cnJlbnRNZXNzYWdlcyk7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1dzQ2xpZW50U2VydmljZSB9IGZyb20gJy4vd3MtY2xpZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1dzQ2xpZW50U2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1dzQ2xpZW50TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbImh0dHAiLCJCZWhhdmlvclN1YmplY3QiLCJIdHRwUGFyYW1zIiwidGFwIiwidGhyb3dFcnJvciIsIkh0dHBIZWFkZXJzIiwiY2F0Y2hFcnJvciIsIkh0dHBSZXF1ZXN0Iiwic2hhcmUiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsIk9wdGlvbmFsIiwiSW5qZWN0IiwiTkdfVkFMVUVfQUNDRVNTT1IiLCJmb3J3YXJkUmVmIiwiRXZlbnRFbWl0dGVyIiwic3RhcnRXaXRoIiwiZGVib3VuY2VUaW1lIiwiZGlzdGluY3RVbnRpbENoYW5nZWQiLCJzd2l0Y2hNYXAiLCJvZiIsIkNvbXBvbmVudCIsIkZvcm1CdWlsZGVyIiwiVmlld0NoaWxkIiwiTWF0QXV0b2NvbXBsZXRlVHJpZ2dlciIsIklucHV0IiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJNYXRBdXRvY29tcGxldGVNb2R1bGUiLCJNYXRJbnB1dE1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdEljb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJub29wIiwiQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IiLCJtYXAiLCJSb3V0ZXIiLCJUcmFuc2xhdGVTZXJ2aWNlIiwiRmxleExheW91dE1vZHVsZSIsIlJvdXRlck1vZHVsZSIsIlRyYW5zbGF0ZU1vZHVsZSIsIkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciIsIk1hdERpYWxvZ1JlZiIsIlZpZXdDb250YWluZXJSZWYiLCJNYXREaWFsb2ciLCJNYXREaWFsb2dNb2R1bGUiLCJNYXRUb29sYmFyTW9kdWxlIiwiTWF0TWVudU1vZHVsZSIsIkRpcmVjdGl2ZSIsIk5ndUNhcm91c2VsTW9kdWxlIiwiRWxlbWVudFJlZiIsIkFjdGl2YXRlZFJvdXRlIiwiQ29udGVudENoaWxkIiwiVGVtcGxhdGVSZWYiLCJNYXRDaGlwc01vZHVsZSIsIk1hdENhcmRNb2R1bGUiLCJEYXRhdGFibGVDb21wb25lbnQiLCJDb250ZW50Q2hpbGRyZW4iLCJTdWJqZWN0IiwiTmd4RGF0YXRhYmxlTW9kdWxlIiwiTWF0U25hY2tCYXJNb2R1bGUiLCJmaWx0ZXIiLCJOYXZpZ2F0aW9uRW5kIiwiUmVuZGVyZXIiLCJIb3N0TGlzdGVuZXIiLCJNYXRUb29sdGlwTW9kdWxlIiwiTWF0U2lkZW5hdk1vZHVsZSIsIk1hdExpc3RNb2R1bGUiLCJNYXRQcm9ncmVzc0Jhck1vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiLCJNYXRUYWJzTW9kdWxlIiwiSHR0cEV2ZW50VHlwZSIsIkh0dHBSZXNwb25zZSIsIkluamVjdGlvblRva2VuIiwiTWF0U25hY2tCYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQWlDRSx1QkFDVUEsU0FDaUQsTUFBcUI7WUFGaEYsaUJBTUM7WUFMUyxTQUFJLEdBQUpBLE9BQUk7WUFDNkMsV0FBTSxHQUFOLE1BQU0sQ0FBZTt5QkFaekMsSUFBSUMsb0JBQWUsQ0FBZSxTQUFTLENBQUM7Ozs7d0JBeUI1RSxVQUFDLFNBQW9CO2dCQUMxQixJQUFJLFNBQVMsRUFBRTtvQkFDYixxQkFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDcEQscUJBQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFLENBQUM7b0JBQ2pHLHFCQUFNLElBQUksR0FBRyxJQUFJQyxlQUFVLEVBQUU7eUJBQzFCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQzt5QkFDaEMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3ZDLE9BQU8sS0FBSSxDQUFDLFVBQVUsQ0FBZSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQzt5QkFDMUQsSUFBSSxDQUNIQyxhQUFHLENBQUMsVUFBQyxHQUFHO3dCQUNOLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7NEJBQzFCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN2QixPQUFPLEdBQUcsQ0FBQztxQkFDWixDQUFDLENBQ0gsQ0FBQztpQkFDTDtxQkFBTTtvQkFDTCxPQUFPQyxlQUFVLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxpREFBaUQsRUFBRSxDQUFDLENBQUM7aUJBQzNHO2FBQ0Y7Z0NBRWMsVUFBQyxTQUE0QjtnQkFDMUMsSUFBSSxTQUFTLEVBQUU7b0JBQ2IscUJBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFDN0QscUJBQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFLENBQUM7b0JBQ2pHLHFCQUFNLElBQUksR0FBRyxJQUFJRixlQUFVLEVBQUU7eUJBQzFCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLGFBQWEsQ0FBQzt5QkFDN0MsR0FBRyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ3RELE9BQU8sS0FBSSxDQUFDLFVBQVUsQ0FBZSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQzt5QkFDMUQsSUFBSSxDQUNIQyxhQUFHLENBQUMsVUFBQyxHQUFHO3dCQUNOLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7NEJBQzFCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN2QixPQUFPLEdBQUcsQ0FBQztxQkFDWixDQUFDLENBQ0gsQ0FBQztpQkFDTDtxQkFBTTtvQkFDTCxPQUFPQyxlQUFVLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSwwREFBMEQsRUFBRSxDQUFDLENBQUM7aUJBQ3BIO2FBQ0Y7MEJBRVEsVUFBQyxtQkFBMEI7Z0JBQTFCLG9DQUFBO29CQUFBLDBCQUEwQjs7Z0JBQ2xDLHFCQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNyRCxxQkFBTSxPQUFPLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSSxDQUFDLHlCQUF5QixDQUFDLG1DQUFtQyxDQUFDLEVBQUUsQ0FBQztnQkFDakcsT0FBTyxLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDO3FCQUMxQyxJQUFJLENBQ0hELGFBQUcsQ0FBQyxVQUFDLEdBQUc7b0JBQ04sS0FBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyQixJQUFJLG1CQUFtQixFQUFFO3dCQUN2QixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7cUJBQ3RCO29CQUNELE9BQU8sR0FBRyxDQUFDO2lCQUNaLENBQUMsQ0FBQyxDQUFDO2FBQ1Q7MENBRXdCO2dCQUN2QixxQkFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDckQscUJBQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUksQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUM7Z0JBQzlELE9BQU8sS0FBSSxDQUFDLFNBQVMsQ0FBZSxRQUFRLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQztxQkFDdkQsSUFBSSxDQUNIQSxhQUFHLENBQUMsVUFBQyxHQUFHO29CQUNOLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7d0JBQzFCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixPQUFPLEdBQUcsQ0FBQztpQkFDWixDQUFDLENBQ0gsQ0FBQzthQUNMOzs7O3VCQUtLLFVBQUksUUFBUSxFQUFFLE1BQWtCLEVBQUUsT0FBcUI7Z0JBQzNELHFCQUFNLFdBQVcsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRCxxQkFBTSxNQUFNLEdBQUcsS0FBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2RCxPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUksV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN4RDswQkFFUSxVQUFJLFFBQVEsRUFBRSxPQUFxQjtnQkFDMUMscUJBQU0sV0FBVyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2xELE9BQU8sS0FBSSxDQUFDLFlBQVksQ0FBSSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDbkQ7eUJBRU8sVUFBSSxRQUFRLEVBQUUsT0FBaUIsRUFBRSxPQUFxQjtnQkFBeEMsd0JBQUE7b0JBQUEsWUFBaUI7O2dCQUNyQyxxQkFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEQsT0FBTyxLQUFJLENBQUMsV0FBVyxDQUFJLFdBQVcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDM0Q7d0JBRU0sVUFBSSxRQUFRLEVBQUUsT0FBaUIsRUFBRSxPQUFxQjtnQkFBeEMsd0JBQUE7b0JBQUEsWUFBaUI7O2dCQUNwQyxxQkFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEQsT0FBTyxLQUFJLENBQUMsVUFBVSxDQUFJLFdBQVcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDMUQ7dUJBRUssVUFBSSxRQUFRLEVBQUUsT0FBaUIsRUFBRSxPQUFxQjtnQkFBeEMsd0JBQUE7b0JBQUEsWUFBaUI7O2dCQUNuQyxxQkFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEQsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFJLFdBQVcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDekQ7MEJBRVEsVUFBSSxRQUFRLEVBQUUsT0FBaUIsRUFBRSxPQUFxQjtnQkFBeEMsd0JBQUE7b0JBQUEsWUFBaUI7O2dCQUN0QyxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFO29CQUNuQixPQUFPLEtBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDN0M7cUJBQU07b0JBQ0wsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQzlDO2FBQ0Y7K0JBMEpxQixVQUFDLEtBQVU7Z0JBQy9CLHFCQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUM5QixxQkFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ3RFLHFCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUM1QixxQkFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxLQUFLLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUNsRCxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLE9BQU9DLGVBQVUsQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLFVBQVUsWUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLFdBQVcsYUFBQSxFQUFFLENBQUMsQ0FBQztpQkFDakU7cUJBQU07b0JBQ0wsT0FBT0EsZUFBVSxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsVUFBVSxZQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsQ0FBQyxDQUFDO2lCQUNqRTthQUNGO1lBdlJDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUM5QjtRQVZELHNCQUFJLCtCQUFJOzs7Z0JBQVI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUN6Qjs7O1dBQUE7Ozs7UUFVRCxtQ0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDMUI7Ozs7Ozs7UUE4R0QsOEJBQU07Ozs7OztZQUFOLFVBQU8sUUFBZ0IsRUFBRSxLQUFhLEVBQUUsT0FBeUI7Z0JBQXpCLHdCQUFBO29CQUFBLFlBQXlCOztnQkFDL0QscUJBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2xELHFCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pELE9BQU8scUJBQWtCLElBQUksQ0FBQztnQkFDOUIsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUlDLGdCQUFXLEVBQUUsQ0FBQztnQkFDdkQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ25FOzs7OztRQU1PLGtEQUEwQjs7OztzQkFBQyxNQUFpQjtnQkFFbEQscUJBQU0sZ0JBQWdCLEdBQXdCLEVBQUUsQ0FBQztnQkFFakQsSUFBSSxNQUFNLEVBQUU7b0JBRVYsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO3dCQUNmLGdCQUFnQixDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUNyQztvQkFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7d0JBQ2hCLGdCQUFnQixDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO3FCQUN2QztvQkFFRCxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7d0JBQ3ZCLHFCQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3BGLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztxQkFDbEY7b0JBRUQsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO3dCQUN0QixnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDbkY7b0JBRUQsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO3dCQUNsQixnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztxQkFDM0M7b0JBRUQsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO3dCQUNyQixnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztxQkFDakQ7aUJBRUY7Z0JBRUQsT0FBTyxnQkFBZ0IsQ0FBQzs7Ozs7O1FBSWxCLGlEQUF5Qjs7OztzQkFBQyxHQUFHO2dCQUNuQyxJQUFJLEdBQUcsRUFBRTtvQkFDUCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzVCO3FCQUFNO29CQUNMLE9BQU8sR0FBRyxDQUFDO2lCQUNaOzs7Ozs7UUFHSyxrREFBMEI7Ozs7c0JBQUMsWUFBWTtnQkFFN0MscUJBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUVqRSxJQUFJLGVBQWUsRUFBRTtvQkFFbkIsT0FBTyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQUEsV0FBVzt3QkFFcEMsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07NEJBRWxELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQ0FDaEMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDL0I7NEJBRUQsT0FBTyxNQUFNLENBQUM7eUJBRWYsQ0FBQyxDQUFDO3dCQUVILE9BQU8sV0FBVyxDQUFDO3FCQUVwQixDQUFDLENBQUM7aUJBRUo7cUJBQU07b0JBRUwsT0FBTyxZQUFZLENBQUM7aUJBRXJCOzs7Ozs7Ozs7UUFPSyxpQ0FBUzs7Ozs7OztzQkFBSSxHQUFXLEVBQUUsTUFBVyxFQUFFLE9BQXlCO2dCQUF0Qyx1QkFBQTtvQkFBQSxXQUFXOztnQkFBRSx3QkFBQTtvQkFBQSxZQUF5Qjs7Z0JBQ3RFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUN4QixPQUFPLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFDL0IsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RixxQkFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksR0FBRyxFQUFFLE9BQU8sQ0FBQztxQkFDbEQsSUFBSSxDQUNIQyxvQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDN0IsQ0FBQztnQkFDSixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7Ozs7OztRQUd0QyxtQ0FBVzs7Ozs7OztzQkFBSSxHQUFHLEVBQUUsSUFBUyxFQUFFLE9BQXlCO2dCQUFwQyxxQkFBQTtvQkFBQSxTQUFTOztnQkFBRSx3QkFBQTtvQkFBQSxZQUF5Qjs7Z0JBQzlELE9BQU8sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RGLHFCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztxQkFDMUQsSUFBSSxDQUNIQSxvQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDN0IsQ0FBQztnQkFDSixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7Ozs7OztRQUd0QyxrQ0FBVTs7Ozs7OztzQkFBSSxHQUFHLEVBQUUsSUFBSyxFQUFFLE9BQXlCO2dCQUF6Qix3QkFBQTtvQkFBQSxZQUF5Qjs7Z0JBQ3pELE9BQU8sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RGLHFCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztxQkFDekQsSUFBSSxDQUNIQSxvQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDN0IsQ0FBQztnQkFDSixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7Ozs7OztRQUd0QyxpQ0FBUzs7Ozs7OztzQkFBSSxHQUFHLEVBQUUsSUFBUyxFQUFFLE9BQXlCO2dCQUFwQyxxQkFBQTtvQkFBQSxTQUFTOztnQkFBRSx3QkFBQTtvQkFBQSxZQUF5Qjs7Z0JBQzVELE9BQU8sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RGLHFCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztxQkFDeEQsSUFBSSxDQUNIQSxvQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDN0IsQ0FBQztnQkFDSixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7Ozs7O1FBR3RDLG9DQUFZOzs7Ozs7c0JBQUksR0FBVyxFQUFFLE9BQXlCO2dCQUF6Qix3QkFBQTtvQkFBQSxZQUF5Qjs7Z0JBQzVELE9BQU8sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RGLHFCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBSSxHQUFHLEVBQUUsT0FBTyxDQUFDO3FCQUNyRCxJQUFJLENBQ0hBLG9CQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUM3QixDQUFDO2dCQUNKLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7Ozs7Ozs7OztRQUd0QyxxQ0FBYTs7Ozs7Ozs7c0JBQUksSUFBc0IsRUFBRSxHQUFXLEVBQUUsSUFBYyxFQUFFLE9BQXlCO2dCQUF6QyxxQkFBQTtvQkFBQSxTQUFjOztnQkFBRSx3QkFBQTtvQkFBQSxZQUF5Qjs7Z0JBQ3JHLE9BQU8sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM3RSxxQkFBTSxHQUFHLEdBQUcsSUFBSUMsZ0JBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDdEQscUJBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFJLEdBQUcsQ0FBQztxQkFDN0MsSUFBSSxDQUNIRCxvQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDN0IsQ0FBQztnQkFDSixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7OztRQW9CdEMsMkNBQW1COzs7O3NCQUFDLEtBQWE7Z0JBQ3ZDLHFCQUFNLFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUMxQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7b0JBQ3hCLHFCQUFNLFlBQVksR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFVBQVEsS0FBTyxHQUFHLE1BQU0sQ0FBQztvQkFDMUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDaEQsQ0FBQyxDQUFDO2dCQUNILE9BQU8sUUFBUSxDQUFDOzs7OztRQUdWLHFDQUFhOzs7O2dCQUNuQixxQkFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJO3FCQUN4QyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztxQkFDdkIsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7cUJBQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFdkMscUJBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3ZELE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO3FCQUN2QixPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztxQkFDdEIsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFckIsSUFBSSxjQUFjLEtBQUssZUFBZSxFQUFFO29CQUN0QyxxQkFBTSxtQkFBbUIsR0FBRyxLQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBZSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQU0sQ0FBQztvQkFDbkgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzRUFBb0UsbUJBQXFCLENBQUMsQ0FBQztvQkFDdkcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7aUJBQzVDOzs7OztRQUdLLHdDQUFnQjs7OztnQkFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDOzs7OztRQUd4RCw2Q0FBcUI7Ozs7Z0JBQzNCLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtxQkFDMUIsU0FBUyxFQUFFO3FCQUNYLElBQUksQ0FBQyxVQUFBLEdBQUc7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO2lCQUNyRCxFQUFFLFVBQUEsR0FBRztvQkFDSixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO3dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7cUJBQ3pEO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0VBQXNFLEVBQUUsR0FBRyxDQUFDLENBQUM7cUJBQzVGO2lCQUNGLENBQUMsQ0FBQzs7Ozs7OztRQUdDLGlEQUF5Qjs7Ozs7c0JBQUMsSUFBYSxFQUFFLE9BQXFCO2dCQUNwRSxPQUFPLEdBQUcsT0FBTyxJQUFJLElBQUlELGdCQUFXLEVBQUUsQ0FBQztnQkFDdkMscUJBQU0scUJBQXFCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLHFCQUFxQixJQUFJLElBQUksRUFBRTtvQkFDbEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUM3QztnQkFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3JCLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQzFEO2dCQUNELE9BQU8sT0FBTyxDQUFDOzs7Ozs7UUFHVCwwQ0FBa0I7Ozs7c0JBQUMsR0FBRztnQkFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7Z0JBQ3BFLE9BQU8sR0FBRyxDQUFDOzs7Ozs7UUFHTCxzQ0FBYzs7OztzQkFBQyxJQUFJO2dCQUV6QixxQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBRXJGLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFcEMsT0FBVSxRQUFRLFNBQUksSUFBTSxDQUFDOzs7OztRQUl2Qix1Q0FBZTs7Ozs7Z0JBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO29CQUM5QyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDbEIsQ0FBQyxDQUFDOzs7OztRQUdHLHlDQUFpQjs7OztnQkFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7O1FBVzdCLHVDQUFlOzs7O3NCQUFDLElBQXFCO2dCQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUNHLGVBQUssRUFBRSxDQUFDLENBQUM7OztvQkEzWTdCQyxhQUFVOzs7Ozt3QkFqQkZDLGVBQVU7d0RBa0NkQyxXQUFRLFlBQUlDLFNBQU0sU0FBQywyQkFBMkI7Ozs0QkFuQ25EOzs7Ozs7O0FDQUE7SUFTQSxxQkFBTSxJQUFJLEdBQUc7S0FDWixDQUFDOztBQUdGLHlCQUFhLG1DQUFtQyxHQUFRO1FBQ3RELE9BQU8sRUFBRUMsdUJBQWlCO1FBQzFCLFdBQVcsRUFBRUMsYUFBVSxDQUFDLGNBQU0sT0FBQSx3QkFBd0IsR0FBQSxDQUFDO1FBQ3ZELEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQzs7UUEySEEsa0NBQ1UsYUFDQTtZQUZWLGlCQUtDO1lBSlMsZ0JBQVcsR0FBWCxXQUFXO1lBQ1gsWUFBTyxHQUFQLE9BQU87d0JBbkRELG1CQUFtQjsrQkFXWixFQUFFOzt3QkFTVyxJQUFJQyxlQUFZLEVBQU87a0NBRUYsSUFBSUEsZUFBWSxFQUFrQjtnQ0FZckUsRUFBRTttQ0FFUyxFQUFFOzhCQU9ULEVBQUU7cUNBRVksSUFBSTtvQ0FFQyxJQUFJO2dDQTRHbkIsVUFBQyxJQUFTO2dCQUN0QyxxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixJQUFJLElBQUksRUFBRTtvQkFDUixJQUFJLEtBQUksQ0FBQyxPQUFPLEVBQUU7O3dCQUNoQixLQUFLLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDNUI7eUJBQU0sSUFBSSxLQUFJLENBQUMsU0FBUyxFQUFFOzt3QkFDekIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDO3FCQUUzQztpQkFDRjtnQkFDRCxLQUFLLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsT0FBTyxLQUFLLENBQUM7YUFDZDtnQ0FtQ3FDLFVBQUMsSUFBUztnQkFDOUMscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDakIsSUFBSSxJQUFJLEVBQUU7b0JBQ1IsSUFBSSxLQUFJLENBQUMsT0FBTyxFQUFFOzt3QkFDaEIsS0FBSyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzVCO3lCQUFNLElBQUksS0FBSSxDQUFDLFNBQVMsRUFBRTs7d0JBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQztxQkFDM0M7aUJBQ0Y7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7YUFDZDtZQS9KQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7UUF6RUQsc0JBQ0ksOENBQVE7OztnQkFVWjtnQkFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDdkI7Ozs7Z0JBYkQsVUFDYSxDQUFVO2dCQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxFQUFFO3dCQUNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDbEM7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNqQztpQkFDRjthQUNGOzs7V0FBQTtRQVdELHNCQUNJLDZDQUFPOzs7Z0JBSVg7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3RCOzs7O2dCQVBELFVBQ1ksQ0FBUTtnQkFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCOzs7V0FBQTs7OztRQWtERCxrREFBZTs7O1lBQWY7Z0JBQUEsaUJBTUM7Z0JBTEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO3FCQUN4QixJQUFJLENBQUMsVUFBQSxHQUFHO29CQUNQLEtBQUksQ0FBQyx3Q0FBd0MsRUFBRSxDQUFDO29CQUNoRCxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztpQkFDM0IsQ0FBQyxDQUFDO2FBQ0o7Ozs7UUFFRCw4Q0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDN0I7UUFLRCxzQkFBSSwyQ0FBSzs7O2dCQU1UO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUN4Qjs7Ozs7OztnQkFSRCxVQUFVLENBQU07Z0JBQ2QsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxQjthQUNGOzs7V0FBQTs7Ozs7UUFLRCxtREFBZ0I7Ozs7WUFBaEIsVUFBaUIsRUFBTztnQkFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzthQUM1Qjs7Ozs7UUFFRCxvREFBaUI7Ozs7WUFBakIsVUFBa0IsRUFBTztnQkFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQzthQUM3Qjs7Ozs7UUFFRCxpREFBYzs7OztZQUFkLFVBQWUsS0FBVTtnQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDL0I7Ozs7O1FBRUQsNkNBQVU7Ozs7WUFBVixVQUFXLENBQU07Z0JBQWpCLGlCQVVDO2dCQVRDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBQ3RCLHFCQUFNLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxhQUFhLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7eUJBQ3JDLElBQUksQ0FBQyxVQUFDLE9BQU87d0JBQ1osS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDdkIsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7Ozs7O1FBRUQsbURBQWdCOzs7O1lBQWhCLFVBQWlCLE1BQU07Z0JBQ3JCLHFCQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDM0MscUJBQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxtQkFBbUIsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO29CQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQzt3QkFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3dCQUNqQixNQUFNLEVBQUUsY0FBYzt3QkFDdEIsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZO3dCQUMxQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7cUJBQ3RDLENBQUMsQ0FBQztpQkFDSjthQUNGOzs7O1FBRUQsMkNBQVE7OztZQUFSO2dCQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3RDOzs7O1FBRUQsNENBQVM7OztZQUFUO2dCQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN0Qzs7OztRQUVELDZDQUFVOzs7WUFBVjtnQkFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDdkM7Ozs7O1FBRUQseUNBQU07Ozs7WUFBTixVQUFPLE1BQU07Z0JBQ1gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1Qjs7Ozs7UUFFRCx3Q0FBSzs7OztZQUFMLFVBQU0sTUFBYztnQkFBcEIsaUJBV0M7Z0JBWEssdUJBQUE7b0JBQUEsY0FBYzs7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDcEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7aUJBQzFCO2dCQUNELElBQUksTUFBTSxFQUFFO29CQUNWLFVBQVUsQ0FBQzt3QkFDVCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7cUJBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ1A7YUFDRjs7OztRQUVELHdDQUFLOzs7WUFBTDtnQkFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUMxQjs7Ozs7UUFnQk8saUVBQThCOzs7O3NCQUFDLFlBQWlCOztnQkFDdEQsT0FBTyxJQUFJLE9BQU8sQ0FBTSxVQUFDLE9BQU8sRUFBRSxNQUFNO29CQUN0QyxJQUFJLFlBQVksRUFBRTt3QkFDaEIsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQzs2QkFDekMsU0FBUyxDQUFDLFVBQUMsR0FBRzs0QkFDYixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7eUJBQ3ZCLENBQUMsQ0FBQztxQkFDSjt5QkFBTTt3QkFDTCxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBQ3ZCO2lCQUNGLENBQUMsQ0FBQzs7Ozs7UUFHRyxxREFBa0I7Ozs7O2dCQUN4QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07b0JBQ2pDLHFCQUFJLEtBQWEsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSSxDQUFDLG1CQUFtQixFQUFFO3dCQUNoRSxLQUFLLEdBQUcsa0hBQWtILENBQUM7cUJBQzVIO29CQUNELElBQUksS0FBSyxFQUFFO3dCQUNULEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDZjt5QkFBTTt3QkFDTCxPQUFPLEVBQUUsQ0FBQztxQkFDWDtpQkFDRixDQUFDLENBQUM7Ozs7O1FBR0csb0RBQWlCOzs7O2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Ozs7OztRQWVuQyxrREFBZTs7Ozs7c0JBQUMsRUFBRSxFQUFFLEVBQUU7Z0JBQzVCLHFCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0QyxxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxPQUFPLEtBQUssT0FBTyxDQUFDOzs7Ozs7UUFHckIsK0NBQVk7Ozs7c0JBQUMsQ0FBQztnQkFDcEIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQ3pCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUNaLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN2Qjt5QkFBTTt3QkFDTCxDQUFDLEdBQUcsS0FBRyxDQUFHLENBQUM7cUJBQ1o7aUJBQ0Y7Z0JBQ0QsT0FBTyxDQUFDLENBQUM7Ozs7O1FBR0gscURBQWtCOzs7OztnQkFDeEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztvQkFDekQsS0FBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7aUJBQ2hDLENBQUMsQ0FBQzs7Ozs7O1FBR0csZ0RBQWE7Ozs7c0JBQUMsQ0FBTTtnQkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O1FBR2pDLGlFQUE4Qjs7OztzQkFBQyxDQUFNO2dCQUMzQyxxQkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxxQkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7O1FBR2xDLHdEQUFxQjs7OztzQkFBQyxDQUFNOztnQkFDbEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7b0JBQ2hDLHFCQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxQyxPQUFPLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUMzQyxDQUFDLENBQUM7Ozs7O1FBR0csOENBQVc7Ozs7Z0JBQ2pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDOzs7OztRQUdsSCwyRUFBd0M7Ozs7O2dCQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZO3FCQUNsRCxJQUFJLENBQ0hDLG1CQUFTLENBQUMsRUFBRSxDQUFDLEVBQ2JDLHNCQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCQyw4QkFBb0IsRUFBRSxFQUN0QkMsbUJBQVMsQ0FBQyxVQUFDLFVBQWtCO29CQUMzQixxQkFBTSxZQUFZLEdBQUcsT0FBTyxVQUFVLEtBQUssUUFBUSxDQUFDO29CQUNwRCxJQUFJLFlBQVksRUFBRTt3QkFDaEIsT0FBTyxLQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ2pEO3lCQUFNO3dCQUNMLE9BQU9DLE9BQUUsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBQzlCO2lCQUNGLENBQUMsQ0FDSCxDQUFDOzs7Ozs7UUFHSSwwREFBdUI7Ozs7c0JBQUMsVUFBVTs7Z0JBQ3hDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzlDO3FCQUFNLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO29CQUNuQyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUM7eUJBQ3hDLElBQUksQ0FDSGpCLGFBQUcsQ0FBQyxVQUFBLE9BQU87d0JBQ1QsS0FBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7cUJBQzdCLENBQUMsQ0FDSCxDQUFDO2lCQUNMO3FCQUFNO29CQUNMLHFCQUFNLElBQUksR0FBRyxVQUFVLEdBQUcsRUFBRSxVQUFVLFlBQUEsRUFBRSxHQUFHLFNBQVMsQ0FBQztvQkFDckQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBUSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQzt5QkFDaEQsSUFBSSxDQUNIQSxhQUFHLENBQUMsVUFBQyxPQUFjO3dCQUNqQixLQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztxQkFDN0IsQ0FBQyxDQUNILENBQUM7aUJBQ0w7Ozs7O1FBR0ssdURBQW9COzs7O2dCQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7OztRQUdsQyx1REFBb0I7Ozs7c0JBQUMsSUFBWTs7Z0JBQ3ZDLHFCQUFNLFVBQVUsR0FBRyxLQUFHLElBQU0sQ0FBQztnQkFFN0IscUJBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBRXJDLElBQUksVUFBVSxFQUFFO29CQUNkLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWTt5QkFDL0IsTUFBTSxDQUFDLFVBQUEsSUFBSTt3QkFDVixxQkFBTSxLQUFLLEdBQVcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDOUMscUJBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDM0MscUJBQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDL0MsT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDbEQsQ0FBQyxDQUFDO2lCQUNKO2dCQUVELE9BQU9pQixPQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7OztRQUdsQiw2Q0FBVTs7OztzQkFBQyxLQUFhO2dCQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLG1FQUFnRSxJQUFJLENBQUMsSUFBSSxtQ0FBNkIsS0FBTyxDQUFDLENBQUM7OztvQkF4WWxJQyxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjt3QkFDNUIsUUFBUSxFQUFFLHc5QkFnQ1g7d0JBQ0MsTUFBTSxFQUFFLEVBQUU7d0JBQ1YsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7cUJBQ2pEOzs7Ozt3QkF2RFFDLGlCQUFXO3dCQUNYLGFBQWE7Ozs7MENBeURuQkMsWUFBUyxTQUFDQywrQkFBc0I7MENBU2hDQyxRQUFLOytCQUVMQSxRQUFLOytCQUVMQSxRQUFLOzhCQWVMQSxRQUFLO2dDQUVMQSxRQUFLOzJCQUVMQSxRQUFLOzhCQUVMQSxRQUFLO2tDQVNMQSxRQUFLOytCQUVMQSxRQUFLOzhCQUVMQSxRQUFLO2dDQUVMQSxRQUFLOzJCQUdMQyxTQUFNO3FDQUVOQSxTQUFNO2dDQUdOSCxZQUFTLFNBQUMsV0FBVzs7dUNBcEh4Qjs7Ozs7OztBQ0FBOzs7O29CQU1DSSxXQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFOzRCQUNQQyxtQkFBWTs0QkFDWkMsOEJBQXFCOzRCQUNyQkMsdUJBQWM7NEJBQ2RDLHdCQUFlOzRCQUNmQyxzQkFBYTs0QkFDYkMsaUJBQVc7NEJBQ1hDLHlCQUFtQjt5QkFDcEI7d0JBQ0QsWUFBWSxFQUFFLENBQUMsd0JBQXdCLENBQUM7d0JBQ3hDLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO3FCQUNwQzs7b0NBbEJEOzs7Ozs7O0FDQUE7SUFNQSxxQkFBTUMsTUFBSSxHQUFHO0tBQ1osQ0FBQzs7SUFHRixxQkFBTSx5Q0FBeUMsR0FBUTtRQUNyRCxPQUFPLEVBQUV0Qix1QkFBaUI7UUFDMUIsV0FBVyxFQUFFQyxhQUFVLENBQUMsY0FBTSxPQUFBLCtCQUErQixHQUFBLENBQUM7UUFDOUQsS0FBSyxFQUFFLElBQUk7S0FDWixDQUFDOztRQW9EQSx5Q0FDVTtZQURWLGlCQUVJO1lBRE0sY0FBUyxHQUFULFNBQVM7NEJBaENSLGtCQUFrQjs2QkFFakIsT0FBTzs2QkFFUCxLQUFLO3dCQVFELHNCQUFzQjsrQkFFZixzQkFBc0I7d0JBRVQsSUFBSUMsZUFBWSxFQUFPO2tDQUViLElBQUlBLGVBQVksRUFBTzs4QkFPM0MsRUFBRTtxQ0FFWW9CLE1BQUk7b0NBRUNBLE1BQUk7dUNBa0QzQixVQUFDLFVBQVU7Z0JBRS9CLHFCQUFNLFlBQVksR0FBRztvQkFDbkI7d0JBQ0UsT0FBTyxFQUFFOzRCQUNQLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO3lCQUN4QztxQkFDRjtpQkFDRixDQUFDO2dCQUVGLElBQUksS0FBSSxDQUFDLEtBQUssRUFBRTtvQkFFZCxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2lCQUUzRTtnQkFHRCxPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxZQUFZLGNBQUEsRUFBRSxDQUFDLENBQUM7YUFDNUQ7U0FoRUc7UUFPSixzQkFBSSxrREFBSzs7Ozs7OztnQkFBVDtnQkFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDeEI7Ozs7O2dCQUdELFVBQVUsQ0FBTTtnQkFDZCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxQjthQUNGOzs7V0FSQTs7Ozs7O1FBV0QsMERBQWdCOzs7O1lBQWhCLFVBQWlCLEVBQU87Z0JBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7YUFDNUI7Ozs7OztRQUdELDJEQUFpQjs7OztZQUFqQixVQUFrQixFQUFPO2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO2FBQzdCOzs7OztRQUVELHdEQUFjOzs7O1lBQWQsVUFBZSxLQUFVO2dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUMvQjs7Ozs7UUFFRCxvREFBVTs7OztZQUFWLFVBQVcsS0FBVTtnQkFDbkIsSUFBSSxLQUFHLEtBQU8sS0FBSyxLQUFHLElBQUksQ0FBQyxLQUFPLEVBQUU7O29CQUNsQyxJQUFJLEtBQUssSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7d0JBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO3FCQUNwQjtpQkFDRjthQUNGOzs7OztRQUVELDREQUFrQjs7OztZQUFsQixVQUFtQixNQUFNO2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCOztvQkFoR0ZkLFlBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsMEJBQTBCO3dCQUNwQyxRQUFRLEVBQUUsdVZBV1g7d0JBQ0MsTUFBTSxFQUFFLEVBQUU7d0JBQ1YsU0FBUyxFQUFFLENBQUMseUNBQXlDLENBQUM7cUJBQ3ZEOzs7Ozt3QkE5QlEsYUFBYTs7Ozs0QkF1Q25CSSxRQUFLOytCQUVMQSxRQUFLOytCQUVMQSxRQUFLOzJCQUVMQSxRQUFLO2tDQUVMQSxRQUFLOzJCQUVMQyxTQUFNO3FDQUVOQSxTQUFNOzs4Q0FyRFQ7Ozs7Ozs7QUNBQTs7OztvQkFNQ0MsV0FBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsbUJBQVk7NEJBQ1pLLGlCQUFXOzRCQUNYLHFCQUFxQjt5QkFDdEI7d0JBQ0QsWUFBWSxFQUFFLENBQUMsK0JBQStCLENBQUM7d0JBQy9DLE9BQU8sRUFBRSxDQUFDLCtCQUErQixDQUFDO3FCQUMzQzs7MkNBZEQ7Ozs7Ozs7QUNBQTtJQUlBLHFCQUFNRSxNQUFJLEdBQUc7S0FDWixDQUFDOztBQUdGLHlCQUFhLDJDQUEyQyxHQUFRO1FBQzlELE9BQU8sRUFBRXRCLHVCQUFpQjtRQUMxQixXQUFXLEVBQUVDLGFBQVUsQ0FBQyxjQUFNLE9BQUEsK0JBQStCLEdBQUEsQ0FBQztRQUM5RCxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7O1FBZ0RBOzRCQTNCVyxtQkFBbUI7NkJBRWxCLEtBQUs7d0JBTUQsc0JBQXNCOytCQUVmLHNCQUFzQjt3QkFFVCxJQUFJQyxlQUFZLEVBQU87a0NBRWIsSUFBSUEsZUFBWSxFQUFPOzhCQU8zQyxFQUFFO3FDQUVZb0IsTUFBSTtvQ0FFQ0EsTUFBSTtTQUVqQztRQU9oQixzQkFBSSxrREFBSzs7Ozs7OztnQkFBVDtnQkFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDeEI7Ozs7O2dCQUdELFVBQVUsQ0FBTTtnQkFDZCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxQjthQUNGOzs7V0FSQTs7Ozs7UUFVRCxpREFBTzs7OztZQUFQLFVBQVEsT0FBTztnQkFDYixPQUFVLE9BQU8sQ0FBQyxLQUFLLFVBQUssT0FBTyxDQUFDLEdBQUssQ0FBQzthQUMzQzs7Ozs7O1FBR0QsMERBQWdCOzs7O1lBQWhCLFVBQWlCLEVBQU87Z0JBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7YUFDNUI7Ozs7OztRQUdELDJEQUFpQjs7OztZQUFqQixVQUFrQixFQUFPO2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO2FBQzdCOzs7OztRQUVELHdEQUFjOzs7O1lBQWQsVUFBZSxLQUFVO2dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUMvQjs7Ozs7UUFFRCxvREFBVTs7OztZQUFWLFVBQVcsS0FBVTtnQkFDbkIsSUFBSSxLQUFHLEtBQU8sS0FBSyxLQUFHLElBQUksQ0FBQyxLQUFPLEVBQUU7O29CQUNsQyxJQUFJLEtBQUssSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7d0JBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO3FCQUNwQjtpQkFDRjthQUNGOzs7OztRQUVELDREQUFrQjs7OztZQUFsQixVQUFtQixNQUFNO2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCOztvQkE5RkZkLFlBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsMEJBQTBCO3dCQUNwQyxRQUFRLEVBQUUsNlRBV1g7d0JBQ0MsTUFBTSxFQUFFLEVBQUU7d0JBQ1YsU0FBUyxFQUFFLENBQUMsMkNBQTJDLENBQUM7cUJBQ3pEOzs7OzsrQkFPRUksUUFBSzsrQkFFTEEsUUFBSzsyQkFFTEEsUUFBSztrQ0FFTEEsUUFBSzsyQkFFTEMsU0FBTTtxQ0FFTkEsU0FBTTs7OENBL0NUOzs7Ozs7O0FDQUE7Ozs7b0JBTUNDLFdBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUU7NEJBQ1BDLG1CQUFZOzRCQUNaSyxpQkFBVzs0QkFDWCxxQkFBcUI7eUJBQ3RCO3dCQUNELFlBQVksRUFBRSxDQUFDLCtCQUErQixDQUFDO3dCQUMvQyxPQUFPLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztxQkFDM0M7OzJDQWREOzs7Ozs7O0FDQUE7SUFLQSxxQkFBTUUsTUFBSSxHQUFHO0tBQ1osQ0FBQzs7QUFHRix5QkFBYSwyQ0FBMkMsR0FBUTtRQUM5RCxPQUFPLEVBQUV0Qix1QkFBaUI7UUFDMUIsV0FBVyxFQUFFQyxhQUFVLENBQUMsY0FBTSxPQUFBLCtCQUErQixHQUFBLENBQUM7UUFDOUQsS0FBSyxFQUFFLElBQUk7S0FDWixDQUFDOztRQWdEQTt3QkF6QmdDLElBQUk7d0JBTXBCLHNCQUFzQjsrQkFFZixzQkFBc0I7d0JBRVQsSUFBSUMsZUFBWSxFQUFPO2tDQUViLElBQUlBLGVBQVksRUFBTzs4QkFPM0MsRUFBRTtxQ0FFWW9CLE1BQUk7b0NBRUNBLE1BQUk7MkJBa0R2QyxVQUFDLElBQUk7Z0JBQ2IsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7YUFDaEM7MkJBRVMsVUFBQyxJQUFJO2dCQUNiLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ2hDO1lBckRDLElBQUksQ0FBQyxVQUFVLEdBQUdmLE9BQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNqQztRQU9ELHNCQUFJLGtEQUFLOzs7Ozs7O2dCQUFUO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUN4Qjs7Ozs7Z0JBR0QsVUFBVSxDQUFNO2dCQUNkLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzFCO2FBQ0Y7OztXQVJBOzs7Ozs7UUFXRCwwREFBZ0I7Ozs7WUFBaEIsVUFBaUIsRUFBTztnQkFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzthQUM1Qjs7Ozs7O1FBR0QsMkRBQWlCOzs7O1lBQWpCLFVBQWtCLEVBQU87Z0JBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7YUFDN0I7Ozs7O1FBRUQsd0RBQWM7Ozs7WUFBZCxVQUFlLEtBQVU7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQy9COzs7OztRQUVELG9EQUFVOzs7O1lBQVYsVUFBVyxLQUFVO2dCQUNuQixJQUFJLEtBQUcsS0FBTyxLQUFLLEtBQUcsSUFBSSxDQUFDLEtBQU8sRUFBRTs7b0JBQ2xDLElBQUksS0FBSyxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTt3QkFDbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7cUJBQ3BCO2lCQUNGO2FBQ0Y7Ozs7O1FBRUQsNERBQWtCOzs7O1lBQWxCLFVBQW1CLE1BQU07Z0JBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7O29CQTVGRkMsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSwwQkFBMEI7d0JBQ3BDLFFBQVEsRUFBRSxvVUFXWDt3QkFDQyxNQUFNLEVBQUUsRUFBRTt3QkFDVixTQUFTLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztxQkFDekQ7Ozs7OzJCQUtFSSxRQUFLOytCQUVMQSxRQUFLOytCQUVMQSxRQUFLOzJCQUVMQSxRQUFLO2tDQUVMQSxRQUFLOzJCQUVMQyxTQUFNO3FDQUVOQSxTQUFNOzs4Q0FoRFQ7O0lBdUhBLHFCQUFNLFNBQVMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0NBQWtDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtDQUFrQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDhDQUE4QyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsbUNBQW1DLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdDQUFnQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMkJBQTJCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDJCQUEyQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsNkJBQTZCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsc0NBQXNDLEVBQUUsRUFBRSxFQUFFLE1BQU0s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