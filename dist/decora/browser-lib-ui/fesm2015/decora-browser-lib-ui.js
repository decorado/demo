import { Injectable, Component, Input, ContentChild, TemplateRef, EventEmitter, Output, NgModule, ContentChildren, ViewChild, forwardRef, ComponentFactoryResolver, ViewContainerRef, ElementRef, HostListener, Renderer, Directive, InjectionToken, SkipSelf, Optional, Inject, defineInjectable, inject } from '@angular/core';
import { MatSnackBar, MatAutocompleteTrigger, MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogRef, MatDialog, MatDialogModule, MatToolbarModule, MatMenuModule, MatIconRegistry, MatChipsModule, MatCardModule, MatSnackBarModule, MatExpansionModule, MatTooltipModule, MatSidenavModule, MatListModule, MatProgressBarModule, MatTabsModule } from '@angular/material';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatSnackBar as MatSnackBar$1 } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, share, tap, debounceTime, distinctUntilChanged, switchMap, startWith, map, filter } from 'rxjs/operators';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, PlatformLocation } from '@angular/common';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NguCarouselModule } from '@ngu/carousel';
import 'hammerjs';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSnackBarService {
    /**
     * @param {?} snackBarService
     * @param {?} translate
     */
    constructor(snackBarService, translate) {
        this.snackBarService = snackBarService;
        this.translate = translate;
    }
    /**
     * @param {?} message
     * @param {?} type
     * @param {?=} duration
     * @return {?}
     */
    open(message, type, duration = 4e3) {
        const /** @type {?} */ msg = this.translate.instant(message);
        const /** @type {?} */ snackClass = this.getClass(type);
        return this.snackBarService.open(msg, '', {
            duration: duration,
            panelClass: snackClass
        });
    }
    /**
     * @param {?} type
     * @return {?}
     */
    getClass(type) {
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
    }
}
DecSnackBarService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
DecSnackBarService.ctorParameters = () => [
    { type: MatSnackBar },
    { type: TranslateService }
];
/** @nocollapse */ DecSnackBarService.ngInjectableDef = defineInjectable({ factory: function DecSnackBarService_Factory() { return new DecSnackBarService(inject(MatSnackBar$1), inject(TranslateService)); }, token: DecSnackBarService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ CONFIG_PATH = 'assets/configuration/configuration.json';
class DecConfigurationService {
    /**
     * @param {?} http
     * @param {?} serviceConfiguration
     */
    constructor(http, serviceConfiguration) {
        this.http = http;
        this.serviceConfiguration = serviceConfiguration;
        this.profile = 'local';
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set config(v) {
        if (this._config !== v) {
            this._config = v;
        }
    }
    /**
     * @return {?}
     */
    get config() {
        return this._config;
    }
    /**
     * @return {?}
     */
    loadConfig() {
        const /** @type {?} */ basePath = this.serviceConfiguration.basePath;
        const /** @type {?} */ path = `${basePath}/${CONFIG_PATH}`;
        const /** @type {?} */ call = this.http.get(path).toPromise();
        call.then((res) => {
            console.log(`DecConfigurationService:: Initialized in ${this.profile} mode`);
            this.profile = this.isValidProfile(res.profile, res) ? res.profile : this.profile;
            this.config = res[this.profile];
        }, err => {
            console.error('DecConfigurationService:: Initialization Error. Could retrieve app configuration', err);
        });
        return call;
    }
    /**
     * @param {?} profile
     * @param {?} availableProfiles
     * @return {?}
     */
    isValidProfile(profile, availableProfiles) {
        const /** @type {?} */ availables = Object.keys(availableProfiles);
        return (availables.indexOf(profile) >= 0) ? true : false;
    }
}
DecConfigurationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecConfigurationService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['DECORA_CONFIGURATION_SERVICE_CONFIG',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecApiService {
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
    transformDecFilterInParams(filter$$1) {
        const /** @type {?} */ serializedFilter = {};
        if (filter$$1) {
            if (filter$$1.page) {
                serializedFilter.page = filter$$1.page;
            }
            if (filter$$1.limit) {
                serializedFilter.limit = filter$$1.limit;
            }
            if (filter$$1.filterGroups) {
                const /** @type {?} */ filterWithValueAsArray = this.getFilterWithValuesAsArray(filter$$1.filterGroups);
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
                filterGroup.filters = filterGroup.filters.map(filter$$1 => {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop = () => {
};
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteComponent),
    multi: true
};
class DecAutocompleteComponent {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
        this.name = 'autocompleteInput';
        this.placeholder = '';
        // Events
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.enterButton = new EventEmitter();
        this.innerOptions = [];
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.extractLabel = (item) => {
            let /** @type {?} */ label = item; // use the object itself if no label function or attribute is provided
            if (item) {
                if (this.labelFn) {
                    // Use custom label function if provided
                    label = this.labelFn(item);
                }
                else if (this.labelAttr) {
                    // Use object label attribute if provided
                    label = item[this.labelAttr] || undefined;
                }
            }
            label = this.ensureString(label);
            return label;
        };
        this.extractValue = (item) => {
            let /** @type {?} */ value = item; // use the object itself if no value function or attribute is provided
            if (item) {
                if (this.valueFn) {
                    // Use custom value function if provided
                    value = this.valueFn(item);
                }
                else if (this.valueAttr) {
                    // Use object value attribute if provided
                    value = item[this.valueAttr] || undefined;
                }
            }
            return value;
        };
        this.createInput();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set disabled(v) {
        this._disabled = v;
        if (this.autocompleteInput) {
            if (v) {
                this.autocompleteInput.disable();
            }
            else {
                this.autocompleteInput.enable();
            }
        }
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set options(v) {
        this._options = v;
        this.innerOptions = v;
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.detectRequiredData()
            .then(res => {
            this.subscribeToSearchAndSetOptionsObservable();
        });
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.setInnerValue(v);
            this.onChangeCallback(v);
        }
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null && `${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            this.loadRemoteObjectByWrittenValue(value)
                .then((options) => {
                this.setInnerValue(value);
            });
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onOptionSelected($event) {
        const /** @type {?} */ selectedOption = $event.option.value;
        const /** @type {?} */ selectedOptionValue = this.extractValue(selectedOption);
        if (selectedOptionValue !== this.value) {
            this.value = selectedOptionValue;
            this.optionSelected.emit({
                value: this.value,
                option: selectedOption,
                options: this.innerOptions,
            });
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onEnterButton($event) {
        this.enterButton.emit($event);
    }
    /**
     * @return {?}
     */
    setFocus() {
        this.termInput.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    openPanel() {
        this.autocompleteTrigger.openPanel();
    }
    /**
     * @return {?}
     */
    closePanel() {
        this.autocompleteTrigger.closePanel();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
    /**
     * @param {?=} reopen
     * @return {?}
     */
    clear(reopen = false) {
        this.value = undefined;
        this.autocompleteInput.setValue('');
        if (this.writtenValue === this.value) {
            this.resetInputControl();
        }
        if (reopen) {
            setTimeout(() => {
                this.openPanel();
            }, 1);
        }
    }
    /**
     * @return {?}
     */
    reset() {
        this.value = this.writtenValue;
        this.setInnerValue(this.writtenValue);
        this.resetInputControl();
    }
    /**
     * @param {?} writtenValue
     * @return {?}
     */
    loadRemoteObjectByWrittenValue(writtenValue) {
        return new Promise((resolve, reject) => {
            if (writtenValue) {
                this.searchBasedFetchingType(writtenValue)
                    .subscribe((res) => {
                    resolve(writtenValue);
                });
            }
            else {
                resolve(writtenValue);
            }
        });
    }
    /**
     * @return {?}
     */
    detectRequiredData() {
        return new Promise((resolve, reject) => {
            let /** @type {?} */ error;
            if (!this.endpoint && !this.options && !this.customFetchFunction) {
                error = 'No endpoint | options | customFetchFunction set. You must provide one of them to be able to use the Autocomplete';
            }
            if (error) {
                this.raiseError(error);
                reject(error);
            }
            else {
                resolve();
            }
        });
    }
    /**
     * @return {?}
     */
    resetInputControl() {
        this.autocompleteInput.markAsPristine();
        this.autocompleteInput.markAsUntouched();
    }
    /**
     * @param {?} v1
     * @param {?} v2
     * @return {?}
     */
    compareAsString(v1, v2) {
        const /** @type {?} */ string1 = this.ensureString(v1);
        const /** @type {?} */ string2 = this.ensureString(v2);
        return string1 === string2;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    ensureString(v) {
        if (typeof v !== 'string') {
            if (isNaN(v)) {
                v = JSON.stringify(v);
            }
            else {
                v = `${v}`;
            }
        }
        return v;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setInnerValue(v) {
        this.innerValue = v;
        this.setInputValueBasedOnInnerValue(v);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setInputValueBasedOnInnerValue(v) {
        const /** @type {?} */ option = this.getOptionBasedOnValue(v);
        this.autocompleteInput.setValue(option);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    getOptionBasedOnValue(v) {
        return this.innerOptions.find(item => {
            const /** @type {?} */ itemValue = this.extractValue(item);
            return this.compareAsString(itemValue, v);
        });
    }
    /**
     * @return {?}
     */
    createInput() {
        this.autocompleteInput = new FormControl('');
        if (this.disabled) {
            this.autocompleteInput.disable();
        }
    }
    /**
     * @return {?}
     */
    subscribeToSearchAndSetOptionsObservable() {
        this.options$ = this.autocompleteInput.valueChanges
            .pipe(startWith(''), debounceTime(300), distinctUntilChanged(), switchMap((textSearch) => {
            const /** @type {?} */ isStringTerm = typeof textSearch === 'string';
            if (isStringTerm) {
                return this.searchBasedFetchingType(textSearch);
            }
            else {
                return of(this.innerOptions);
            }
        }));
    }
    /**
     * @param {?} textSearch
     * @return {?}
     */
    searchBasedFetchingType(textSearch) {
        if (this.options) {
            return this.searchInLocalOptions(textSearch);
        }
        else if (this.customFetchFunction) {
            return this.customFetchFunction(textSearch)
                .pipe(tap(options => {
                this.innerOptions = options;
            }));
        }
        else {
            const /** @type {?} */ body = textSearch ? { textSearch } : undefined;
            return this.service.get(this.endpoint, body)
                .pipe(tap((options) => {
                this.innerOptions = options;
            }));
        }
    }
    /**
     * @param {?} term
     * @return {?}
     */
    searchInLocalOptions(term) {
        const /** @type {?} */ termString = `${term}`;
        let /** @type {?} */ filteredData = this.innerOptions;
        if (termString) {
            filteredData = this.innerOptions
                .filter(item => {
                const /** @type {?} */ label = this.extractLabel(item);
                const /** @type {?} */ lowerCaseLabel = label.toLowerCase();
                const /** @type {?} */ lowerCaseTerm = termString.toLowerCase();
                return lowerCaseLabel.search(lowerCaseTerm) >= 0;
            });
        }
        return of(filteredData);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    raiseError(error) {
        throw new Error(`DecAutocompleteComponent Error:: The autocomplete with name "${this.name}" had the follow problem: ${error}`);
    }
}
DecAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete',
                template: `<div>
  <mat-form-field>
    <input matInput
    [attr.aria-label]="name"
    #termInput
    [matAutocomplete]="autocomplete"
    [formControl]="autocompleteInput"
    [name]="name"
    [required]="required"
    [placeholder]="placeholder"
    (keyup.enter)="onEnterButton($event)"
    (blur)="onBlur($event)"
    autocomplete="off"
    readonly
    onfocus="this.removeAttribute('readonly');">

    <button mat-icon-button matSuffix (click)="clear(true)" *ngIf="!disabled && !required && autocompleteInput.value">
      <mat-icon>close</mat-icon>
    </button>

    <button mat-icon-button matSuffix (click)="reset()" *ngIf="!disabled && value !== writtenValue">
      <mat-icon>replay</mat-icon>
    </button>

  </mat-form-field>

  <mat-autocomplete #autocomplete="matAutocomplete"
  [displayWith]="extractLabel"
  (optionSelected)="onOptionSelected($event)"
  name="autocompleteValue">
    <mat-option *ngIf="!required" [value]=""></mat-option>

    <mat-option *ngFor="let item of (options$ | async)" [value]="item">
      {{ extractLabel(item) }}
    </mat-option>
  </mat-autocomplete>
</div>

`,
                styles: [],
                providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteComponent.ctorParameters = () => [
    { type: DecApiService }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecAutocompleteModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop$1 = () => {
};
const /** @type {?} */ ACCOUNTS_ENDPOINT = 'accounts/options';
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteAccountComponent),
    multi: true
};
class DecAutocompleteAccountComponent {
    /**
     * @param {?} decoraApi
     */
    constructor(decoraApi) {
        this.decoraApi = decoraApi;
        this.valueAttr = 'key';
        this.name = 'Account autocomplete';
        this.placeholder = 'Account autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$1;
        this.onChangeCallback = noop$1;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set types(v) {
        if (v !== this._types) {
            this._types = v;
            if (this.initialized) {
                this.setRolesParams();
            }
        }
    }
    /**
     * @return {?}
     */
    get types() {
        return this._types;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initialized = true;
        setTimeout(() => {
            this.setRolesParams();
        }, 0);
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null && `${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onAutocompleteBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
    /**
     * @param {?} account
     * @return {?}
     */
    labelFn(account) {
        return `${account.value} #${account.key}`;
    }
    /**
     * @return {?}
     */
    setRolesParams() {
        const /** @type {?} */ params = [];
        let /** @type {?} */ endpoint = `${ACCOUNTS_ENDPOINT}`;
        if (this.types && this.types.length) {
            params.push(`roles=${encodeURI(JSON.stringify(this.types))}`);
        }
        if (params.length) {
            endpoint += `?${params.join('&')}`;
        }
        this.endpoint = endpoint;
    }
}
DecAutocompleteAccountComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-account',
                template: `<dec-autocomplete *ngIf="endpoint"
[disabled]="disabled"
[required]="required"
[endpoint]="endpoint"
[name]="name"
[labelFn]="labelFn"
[placeholder]="placeholder"
(optionSelected)="optionSelected.emit($event)"
[(ngModel)]="value"
[valueAttr]="valueAttr"
(blur)="blur.emit($event)"></dec-autocomplete>
`,
                styles: [],
                providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteAccountComponent.ctorParameters = () => [
    { type: DecApiService }
];
DecAutocompleteAccountComponent.propDecorators = {
    types: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecAutocompleteAccountModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop$2 = () => {
};
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteCompanyComponent),
    multi: true
};
class DecAutocompleteCompanyComponent {
    constructor() {
        this.endpoint = 'companies/options';
        this.valueAttr = 'key';
        this.name = 'Company autocomplete';
        this.placeholder = 'Company autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$2;
        this.onChangeCallback = noop$2;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @param {?} company
     * @return {?}
     */
    labelFn(company) {
        return `${company.value} #${company.key}`;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null && `${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onAutocompleteBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
}
DecAutocompleteCompanyComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-company',
                template: `<dec-autocomplete
[required]="required"
[name]="name"
[placeholder]="placeholder"
(optionSelected)="optionSelected.emit($event)"
[endpoint]="endpoint"
[(ngModel)]="value"
[labelFn]="labelFn"
[valueAttr]="valueAttr"
(blur)="blur.emit($event)"></dec-autocomplete>
`,
                styles: [],
                providers: [AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteCompanyComponent.ctorParameters = () => [];
DecAutocompleteCompanyComponent.propDecorators = {
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecAutocompleteCompanyModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop$3 = () => {
};
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteCountryComponent),
    multi: true
};
class DecAutocompleteCountryComponent {
    constructor() {
        this.lang = 'en';
        this.name = 'Country autocomplete';
        this.placeholder = 'Country autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$3;
        this.onChangeCallback = noop$3;
        this.labelFn = (item) => {
            return item ? item.name : item;
        };
        this.valueFn = (item) => {
            return item ? item.code : item;
        };
        this.countries$ = of(FAKE_DATA);
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null && `${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onAutocompleteBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
}
DecAutocompleteCountryComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-country',
                template: `<dec-autocomplete
[disabled]="disabled"
[required]="required"
[name]="name"
[placeholder]="placeholder"
(optionSelected)="optionSelected.emit($event)"
[options]="(countries$ | async)"
[(ngModel)]="value"
[labelFn]="labelFn"
[valueFn]="valueFn"
(blur)="blur.emit($event)"></dec-autocomplete>
`,
                styles: [],
                providers: [AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteCountryComponent.ctorParameters = () => [];
DecAutocompleteCountryComponent.propDecorators = {
    lang: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }]
};
const /** @type {?} */ FAKE_DATA = [{ 'code': 'AD', 'name': 'Andorra' }, { 'code': 'AE', 'name': 'United Arab Emirates' }, { 'code': 'AF', 'name': 'Afghanistan' }, { 'code': 'AG', 'name': 'Antigua and Barbuda' }, { 'code': 'AI', 'name': 'Anguilla' }, { 'code': 'AL', 'name': 'Albania' }, { 'code': 'AM', 'name': 'Armenia' }, { 'code': 'AN', 'name': 'Netherlands Antilles' }, { 'code': 'AO', 'name': 'Angola' }, { 'code': 'AQ', 'name': 'Antarctica' }, { 'code': 'AR', 'name': 'Argentina' }, { 'code': 'AS', 'name': 'American Samoa' }, { 'code': 'AT', 'name': 'Austria' }, { 'code': 'AU', 'name': 'Australia' }, { 'code': 'AW', 'name': 'Aruba' }, { 'code': 'AX', 'name': 'Åland Islands' }, { 'code': 'AZ', 'name': 'Azerbaijan' }, { 'code': 'BA', 'name': 'Bosnia and Herzegovina' }, { 'code': 'BB', 'name': 'Barbados' }, { 'code': 'BD', 'name': 'Bangladesh' }, { 'code': 'BE', 'name': 'Belgium' }, { 'code': 'BF', 'name': 'Burkina Faso' }, { 'code': 'BG', 'name': 'Bulgaria' }, { 'code': 'BH', 'name': 'Bahrain' }, { 'code': 'BI', 'name': 'Burundi' }, { 'code': 'BJ', 'name': 'Benin' }, { 'code': 'BL', 'name': 'Saint Barthélemy' }, { 'code': 'BM', 'name': 'Bermuda' }, { 'code': 'BN', 'name': 'Brunei' }, { 'code': 'BO', 'name': 'Bolivia' }, { 'code': 'BQ', 'name': 'Bonaire, Sint Eustatius and Saba' }, { 'code': 'BR', 'name': 'Brazil' }, { 'code': 'BS', 'name': 'Bahamas' }, { 'code': 'BT', 'name': 'Bhutan' }, { 'code': 'BV', 'name': 'Bouvet Island' }, { 'code': 'BW', 'name': 'Botswana' }, { 'code': 'BY', 'name': 'Belarus' }, { 'code': 'BZ', 'name': 'Belize' }, { 'code': 'CA', 'name': 'Canada' }, { 'code': 'CC', 'name': 'Cocos Islands' }, { 'code': 'CD', 'name': 'The Democratic Republic Of Congo' }, { 'code': 'CF', 'name': 'Central African Republic' }, { 'code': 'CG', 'name': 'Congo' }, { 'code': 'CH', 'name': 'Switzerland' }, { 'code': 'CI', 'name': 'Côte d\'Ivoire' }, { 'code': 'CK', 'name': 'Cook Islands' }, { 'code': 'CL', 'name': 'Chile' }, { 'code': 'CM', 'name': 'Cameroon' }, { 'code': 'CN', 'name': 'China' }, { 'code': 'CO', 'name': 'Colombia' }, { 'code': 'CR', 'name': 'Costa Rica' }, { 'code': 'CU', 'name': 'Cuba' }, { 'code': 'CV', 'name': 'Cape Verde' }, { 'code': 'CW', 'name': 'Curaçao' }, { 'code': 'CX', 'name': 'Christmas Island' }, { 'code': 'CY', 'name': 'Cyprus' }, { 'code': 'CZ', 'name': 'Czech Republic' }, { 'code': 'DE', 'name': 'Germany' }, { 'code': 'DJ', 'name': 'Djibouti' }, { 'code': 'DK', 'name': 'Denmark' }, { 'code': 'DM', 'name': 'Dominica' }, { 'code': 'DO', 'name': 'Dominican Republic' }, { 'code': 'DZ', 'name': 'Algeria' }, { 'code': 'EC', 'name': 'Ecuador' }, { 'code': 'EE', 'name': 'Estonia' }, { 'code': 'EG', 'name': 'Egypt' }, { 'code': 'EH', 'name': 'Western Sahara' }, { 'code': 'ER', 'name': 'Eritrea' }, { 'code': 'ES', 'name': 'Spain' }, { 'code': 'ET', 'name': 'Ethiopia' }, { 'code': 'FI', 'name': 'Finland' }, { 'code': 'FJ', 'name': 'Fiji' }, { 'code': 'FK', 'name': 'Falkland Islands' }, { 'code': 'FM', 'name': 'Micronesia' }, { 'code': 'FO', 'name': 'Faroe Islands' }, { 'code': 'FR', 'name': 'France' }, { 'code': 'GA', 'name': 'Gabon' }, { 'code': 'GB', 'name': 'United Kingdom' }, { 'code': 'GD', 'name': 'Grenada' }, { 'code': 'GE', 'name': 'Georgia' }, { 'code': 'GF', 'name': 'French Guiana' }, { 'code': 'GG', 'name': 'Guernsey' }, { 'code': 'GH', 'name': 'Ghana' }, { 'code': 'GI', 'name': 'Gibraltar' }, { 'code': 'GL', 'name': 'Greenland' }, { 'code': 'GM', 'name': 'Gambia' }, { 'code': 'GN', 'name': 'Guinea' }, { 'code': 'GP', 'name': 'Guadeloupe' }, { 'code': 'GQ', 'name': 'Equatorial Guinea' }, { 'code': 'GR', 'name': 'Greece' }, { 'code': 'GS', 'name': 'South Georgia And The South Sandwich Islands' }, { 'code': 'GT', 'name': 'Guatemala' }, { 'code': 'GU', 'name': 'Guam' }, { 'code': 'GW', 'name': 'Guinea-Bissau' }, { 'code': 'GY', 'name': 'Guyana' }, { 'code': 'HK', 'name': 'Hong Kong' }, { 'code': 'HM', 'name': 'Heard Island And McDonald Islands' }, { 'code': 'HN', 'name': 'Honduras' }, { 'code': 'HR', 'name': 'Croatia' }, { 'code': 'HT', 'name': 'Haiti' }, { 'code': 'HU', 'name': 'Hungary' }, { 'code': 'ID', 'name': 'Indonesia' }, { 'code': 'IE', 'name': 'Ireland' }, { 'code': 'IL', 'name': 'Israel' }, { 'code': 'IM', 'name': 'Isle Of Man' }, { 'code': 'IN', 'name': 'India' }, { 'code': 'IO', 'name': 'British Indian Ocean Territory' }, { 'code': 'IQ', 'name': 'Iraq' }, { 'code': 'IR', 'name': 'Iran' }, { 'code': 'IS', 'name': 'Iceland' }, { 'code': 'IT', 'name': 'Italy' }, { 'code': 'JE', 'name': 'Jersey' }, { 'code': 'JM', 'name': 'Jamaica' }, { 'code': 'JO', 'name': 'Jordan' }, { 'code': 'JP', 'name': 'Japan' }, { 'code': 'KE', 'name': 'Kenya' }, { 'code': 'KG', 'name': 'Kyrgyzstan' }, { 'code': 'KH', 'name': 'Cambodia' }, { 'code': 'KI', 'name': 'Kiribati' }, { 'code': 'KM', 'name': 'Comoros' }, { 'code': 'KN', 'name': 'Saint Kitts And Nevis' }, { 'code': 'KP', 'name': 'North Korea' }, { 'code': 'KR', 'name': 'South Korea' }, { 'code': 'KW', 'name': 'Kuwait' }, { 'code': 'KY', 'name': 'Cayman Islands' }, { 'code': 'KZ', 'name': 'Kazakhstan' }, { 'code': 'LA', 'name': 'Laos' }, { 'code': 'LB', 'name': 'Lebanon' }, { 'code': 'LC', 'name': 'Saint Lucia' }, { 'code': 'LI', 'name': 'Liechtenstein' }, { 'code': 'LK', 'name': 'Sri Lanka' }, { 'code': 'LR', 'name': 'Liberia' }, { 'code': 'LS', 'name': 'Lesotho' }, { 'code': 'LT', 'name': 'Lithuania' }, { 'code': 'LU', 'name': 'Luxembourg' }, { 'code': 'LV', 'name': 'Latvia' }, { 'code': 'LY', 'name': 'Libya' }, { 'code': 'MA', 'name': 'Morocco' }, { 'code': 'MC', 'name': 'Monaco' }, { 'code': 'MD', 'name': 'Moldova' }, { 'code': 'ME', 'name': 'Montenegro' }, { 'code': 'MF', 'name': 'Saint Martin' }, { 'code': 'MG', 'name': 'Madagascar' }, { 'code': 'MH', 'name': 'Marshall Islands' }, { 'code': 'MK', 'name': 'Macedonia' }, { 'code': 'ML', 'name': 'Mali' }, { 'code': 'MM', 'name': 'Myanmar' }, { 'code': 'MN', 'name': 'Mongolia' }, { 'code': 'MO', 'name': 'Macao' }, { 'code': 'MP', 'name': 'Northern Mariana Islands' }, { 'code': 'MQ', 'name': 'Martinique' }, { 'code': 'MR', 'name': 'Mauritania' }, { 'code': 'MS', 'name': 'Montserrat' }, { 'code': 'MT', 'name': 'Malta' }, { 'code': 'MU', 'name': 'Mauritius' }, { 'code': 'MV', 'name': 'Maldives' }, { 'code': 'MW', 'name': 'Malawi' }, { 'code': 'MX', 'name': 'Mexico' }, { 'code': 'MY', 'name': 'Malaysia' }, { 'code': 'MZ', 'name': 'Mozambique' }, { 'code': 'NA', 'name': 'Namibia' }, { 'code': 'NC', 'name': 'New Caledonia' }, { 'code': 'NE', 'name': 'Niger' }, { 'code': 'NF', 'name': 'Norfolk Island' }, { 'code': 'NG', 'name': 'Nigeria' }, { 'code': 'NI', 'name': 'Nicaragua' }, { 'code': 'NL', 'name': 'Netherlands' }, { 'code': 'NO', 'name': 'Norway' }, { 'code': 'NP', 'name': 'Nepal' }, { 'code': 'NR', 'name': 'Nauru' }, { 'code': 'NU', 'name': 'Niue' }, { 'code': 'NZ', 'name': 'New Zealand' }, { 'code': 'OM', 'name': 'Oman' }, { 'code': 'PA', 'name': 'Panama' }, { 'code': 'PE', 'name': 'Peru' }, { 'code': 'PF', 'name': 'French Polynesia' }, { 'code': 'PG', 'name': 'Papua New Guinea' }, { 'code': 'PH', 'name': 'Philippines' }, { 'code': 'PK', 'name': 'Pakistan' }, { 'code': 'PL', 'name': 'Poland' }, { 'code': 'PM', 'name': 'Saint Pierre And Miquelon' }, { 'code': 'PN', 'name': 'Pitcairn' }, { 'code': 'PR', 'name': 'Puerto Rico' }, { 'code': 'PS', 'name': 'Palestine' }, { 'code': 'PT', 'name': 'Portugal' }, { 'code': 'PW', 'name': 'Palau' }, { 'code': 'PY', 'name': 'Paraguay' }, { 'code': 'QA', 'name': 'Qatar' }, { 'code': 'RE', 'name': 'Reunion' }, { 'code': 'RO', 'name': 'Romania' }, { 'code': 'RS', 'name': 'Serbia' }, { 'code': 'RU', 'name': 'Russia' }, { 'code': 'RW', 'name': 'Rwanda' }, { 'code': 'SA', 'name': 'Saudi Arabia' }, { 'code': 'SB', 'name': 'Solomon Islands' }, { 'code': 'SC', 'name': 'Seychelles' }, { 'code': 'SD', 'name': 'Sudan' }, { 'code': 'SE', 'name': 'Sweden' }, { 'code': 'SG', 'name': 'Singapore' }, { 'code': 'SH', 'name': 'Saint Helena' }, { 'code': 'SI', 'name': 'Slovenia' }, { 'code': 'SJ', 'name': 'Svalbard And Jan Mayen' }, { 'code': 'SK', 'name': 'Slovakia' }, { 'code': 'SL', 'name': 'Sierra Leone' }, { 'code': 'SM', 'name': 'San Marino' }, { 'code': 'SN', 'name': 'Senegal' }, { 'code': 'SO', 'name': 'Somalia' }, { 'code': 'SR', 'name': 'Suriname' }, { 'code': 'SS', 'name': 'South Sudan' }, { 'code': 'ST', 'name': 'Sao Tome And Principe' }, { 'code': 'SV', 'name': 'El Salvador' }, { 'code': 'SX', 'name': 'Sint Maarten (Dutch part)' }, { 'code': 'SY', 'name': 'Syria' }, { 'code': 'SZ', 'name': 'Swaziland' }, { 'code': 'TC', 'name': 'Turks And Caicos Islands' }, { 'code': 'TD', 'name': 'Chad' }, { 'code': 'TF', 'name': 'French Southern Territories' }, { 'code': 'TG', 'name': 'Togo' }, { 'code': 'TH', 'name': 'Thailand' }, { 'code': 'TJ', 'name': 'Tajikistan' }, { 'code': 'TK', 'name': 'Tokelau' }, { 'code': 'TL', 'name': 'Timor-Leste' }, { 'code': 'TM', 'name': 'Turkmenistan' }, { 'code': 'TN', 'name': 'Tunisia' }, { 'code': 'TO', 'name': 'Tonga' }, { 'code': 'TR', 'name': 'Turkey' }, { 'code': 'TT', 'name': 'Trinidad and Tobago' }, { 'code': 'TV', 'name': 'Tuvalu' }, { 'code': 'TW', 'name': 'Taiwan' }, { 'code': 'TZ', 'name': 'Tanzania' }, { 'code': 'UA', 'name': 'Ukraine' }, { 'code': 'UG', 'name': 'Uganda' }, { 'code': 'UM', 'name': 'United States Minor Outlying Islands' }, { 'code': 'UY', 'name': 'Uruguay' }, { 'code': 'UZ', 'name': 'Uzbekistan' }, { 'code': 'VA', 'name': 'Vatican' }, { 'code': 'VC', 'name': 'Saint Vincent And The Grenadines' }, { 'code': 'VE', 'name': 'Venezuela' }, { 'code': 'VG', 'name': 'British Virgin Islands' }, { 'code': 'VI', 'name': 'U.S. Virgin Islands' }, { 'code': 'VN', 'name': 'Vietnam' }, { 'code': 'VU', 'name': 'Vanuatu' }, { 'code': 'WF', 'name': 'Wallis And Futuna' }, { 'code': 'WS', 'name': 'Samoa' }, { 'code': 'YE', 'name': 'Yemen' }, { 'code': 'YT', 'name': 'Mayotte' }, { 'code': 'ZA', 'name': 'South Africa' }, { 'code': 'ZM', 'name': 'Zambia' }, { 'code': 'ZW', 'name': 'Zimbabwe' }];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecAutocompleteCountryModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ BASE_ENDPOINT = 'companies/${companyId}/departments/options';
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop$4 = () => {
};
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteDepartmentComponent),
    multi: true
};
class DecAutocompleteDepartmentComponent {
    constructor() {
        this.labelAttr = 'value';
        this.valueAttr = 'key';
        this.name = 'Department autocomplete';
        this.placeholder = 'Department autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$4;
        this.onChangeCallback = noop$4;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set companyId(v) {
        this._companyId = v;
        this.value = undefined;
        this.setEndpointBasedOncompanyId();
    }
    /**
     * @return {?}
     */
    get companyId() {
        return this._companyId;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null && `${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onAutocompleteBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
    /**
     * @return {?}
     */
    setEndpointBasedOncompanyId() {
        this.endpoint = !this.companyId ? undefined : BASE_ENDPOINT.replace('${companyId}', this.companyId);
    }
}
DecAutocompleteDepartmentComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-department',
                template: `<div *ngIf="endpoint else fakeDisabled">
  <dec-autocomplete
  [disabled]="!companyId || disabled"
  [endpoint]="endpoint"
  [labelAttr]="labelAttr"
  [name]="name"
  [placeholder]="placeholder"
  [required]="required"
  [valueAttr]="valueAttr"
  [(ngModel)]="value"
  (optionSelected)="optionSelected.emit($event)"
  (blur)="blur.emit($event)"></dec-autocomplete>
</div>

<ng-template #fakeDisabled>
  <mat-form-field>
    <input matInput
    [attr.aria-label]="name"
    [name]="name"
    [required]="required"
    [disabled]="true"
    [placeholder]="placeholder">
  </mat-form-field>
</ng-template>

`,
                styles: [],
                providers: [AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteDepartmentComponent.ctorParameters = () => [];
DecAutocompleteDepartmentComponent.propDecorators = {
    companyId: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecAutocompleteDepartmentModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop$5 = () => {
};
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR$1 = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteRoleComponent),
    multi: true
};
class DecAutocompleteRoleComponent {
    /**
     * @param {?} decoraApi
     */
    constructor(decoraApi) {
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
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null && `${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onAutocompleteBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
}
DecAutocompleteRoleComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-role',
                template: `<dec-autocomplete
[disabled]="disabled"
[required]="required"
[name]="name"
[placeholder]="placeholder"
(optionSelected)="optionSelected.emit($event)"
[(ngModel)]="value"
[endpoint]="endpoint"
[labelAttr]="labelAttr"
[valueAttr]="valueAttr"
(blur)="blur.emit($event)"></dec-autocomplete>
`,
                styles: [],
                providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR$1]
            },] },
];
/** @nocollapse */
DecAutocompleteRoleComponent.ctorParameters = () => [
    { type: DecApiService }
];
DecAutocompleteRoleComponent.propDecorators = {
    types: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecAutocompleteRoleModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ BASE_AUTOCOMPLETE_PROJECT_ENDPOINT = '/legacy/project/search/keyValue';
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop$6 = () => {
};
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteProjectComponent),
    multi: true
};
class DecAutocompleteProjectComponent {
    /**
     * @param {?} decoraApi
     */
    constructor(decoraApi) {
        this.decoraApi = decoraApi;
        this.valueAttr = 'key';
        this.name = 'Project autocomplete';
        this.placeholder = 'Project autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop$6;
        this.onChangeCallback = noop$6;
        this.customFetchFunction = (textSearch) => {
            const /** @type {?} */ params = {};
            params.textSearch = textSearch;
            this.setEndpointBasedOnCompanyId();
            return this.decoraApi.get(this.endpoint, params)
                .pipe(map(projects => {
                return projects;
            }));
        };
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set companyId(v) {
        if (this._companyId !== v) {
            this._companyId = v;
            this.value = undefined;
            this.endpoint = undefined;
            setTimeout(() => {
                // ensures a digest cicle before reseting the endpoint
                this.setEndpointBasedOnCompanyId();
            }, 0);
        }
    }
    /**
     * @return {?}
     */
    get companyId() {
        return this._companyId;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @param {?} company
     * @return {?}
     */
    labelFn(company) {
        return `${company.value} #${company.key}`;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null && `${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
        }
    }
    /**
     * @return {?}
     */
    setEndpointBasedOnCompanyId() {
        if (this.companyId) {
            this.endpoint = BASE_AUTOCOMPLETE_PROJECT_ENDPOINT + '?companyId=' + this.companyId;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onAutocompleteBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
}
DecAutocompleteProjectComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-project',
                template: `<div *ngIf="(endpoint && companyId) else fakeDisabled">
  <dec-autocomplete
  #autocomplete
  [endpoint]="endpoint"
  [labelFn]="labelFn"
  [name]="name"
  [placeholder]="placeholder"
  [required]="required"
  [valueAttr]="valueAttr"
  [(ngModel)]="value"
  [disabled]="disabled"
  [customFetchFunction]="customFetchFunction"
  (optionSelected)="optionSelected.emit($event)"
  (blur)="blur.emit($event)"></dec-autocomplete>
</div>

<ng-template #fakeDisabled>
  <mat-form-field>
    <input matInput
    [attr.aria-label]="name"
    [name]="name"
    [required]="required"
    [disabled]="true"
    [placeholder]="placeholder">
  </mat-form-field>
</ng-template>

`,
                styles: [],
                providers: [AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteProjectComponent.ctorParameters = () => [
    { type: DecApiService }
];
DecAutocompleteProjectComponent.propDecorators = {
    companyId: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecAutocompleteProjectModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop$7 = () => {
};
const /** @type {?} */ QUOTE_ENDPOINT = '/projects/${projectId}/quotes/options';
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteQuoteComponent),
    multi: true
};
class DecAutocompleteQuoteComponent {
    /**
     * @param {?} decoraApi
     */
    constructor(decoraApi) {
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
    /**
     * @param {?} v
     * @return {?}
     */
    set projectId(v) {
        this._projectId = v;
        this.setEndpointBasedOnInputs();
    }
    /**
     * @return {?}
     */
    get projectId() {
        return this._projectId;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set decoraProduct(v) {
        this._decoraProduct = v;
        this.setEndpointBasedOnInputs();
    }
    /**
     * @return {?}
     */
    get decoraProduct() {
        return this._decoraProduct;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set decoraProductVariant(v) {
        this._decoraProductVariant = v;
        this.setEndpointBasedOnInputs();
    }
    /**
     * @return {?}
     */
    get decoraProductVariant() {
        return this._decoraProductVariant;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null && `${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onAutocompleteBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
    /**
     * @return {?}
     */
    setEndpointBasedOnInputs() {
        let /** @type {?} */ endpoint;
        this.value = undefined;
        if (this.projectId) {
            endpoint = QUOTE_ENDPOINT.replace('${projectId}', this.projectId);
            const /** @type {?} */ params = [];
            if (this.decoraProduct) {
                params.push(`productId=${this.decoraProduct}`);
            }
            if (this.decoraProductVariant) {
                params.push(`productVariantId=${this.decoraProductVariant}`);
            }
            if (params.length) {
                endpoint += `?${params.join('&')}`;
            }
        }
        if (this.endpoint !== endpoint) {
            this.endpoint = undefined;
            setTimeout(() => {
                this.endpoint = endpoint;
            }, 0);
        }
    }
}
DecAutocompleteQuoteComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-quote',
                template: `<div *ngIf="endpoint else fakeDisabled">
  <dec-autocomplete
  [disabled]="!projectId || disabled"
  [endpoint]="endpoint"
  [labelAttr]="labelAttr"
  [name]="name"
  [placeholder]="placeholder"
  [required]="required"
  [valueAttr]="valueAttr"
  [(ngModel)]="value"
  (optionSelected)="optionSelected.emit($event)"
  (blur)="blur.emit($event)"></dec-autocomplete>
</div>

<ng-template #fakeDisabled>
  <mat-form-field>
    <input matInput
    [attr.aria-label]="name"
    [name]="name"
    [required]="required"
    [disabled]="true"
    [placeholder]="placeholder">
  </mat-form-field>
</ng-template>

`,
                styles: [],
                providers: [AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteQuoteComponent.ctorParameters = () => [
    { type: DecApiService }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecAutocompleteQuoteModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop$8 = () => {
};
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_TAGS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteTagsComponent),
    multi: true
};
class DecAutocompleteTagsComponent {
    constructor() {
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
    /**
     * @param {?} v
     * @return {?}
     */
    set endpoint(v) {
        if (v) {
            this._endpoint = v;
        }
    }
    /**
     * @return {?}
     */
    get endpoint() {
        return this._endpoint;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @param {?} tags
     * @return {?}
     */
    labelFn(tags) {
        return `${tags.value} #${tags.key}`;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null && `${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onAutocompleteBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
}
DecAutocompleteTagsComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-tags',
                template: `<dec-autocomplete
[disabled]="disabled"
[required]="required"
[endpoint]="endpoint"
[name]="name"
[placeholder]="placeholder"
(optionSelected)="optionSelected.emit($event)"
(enterButton)="enterButton.emit($event)"
[(ngModel)]="value"
[labelAttr]="labelAttr"
[valueAttr]="valueAttr"
(blur)="blur.emit($event)"></dec-autocomplete>`,
                styles: [``],
                providers: [AUTOCOMPLETE_TAGS_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteTagsComponent.ctorParameters = () => [];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecAutocompleteTagsModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecBreadcrumbComponent {
    /**
     * @param {?} router
     * @param {?} translator
     */
    constructor(router, translator) {
        this.router = router;
        this.translator = translator;
        this.backLabel = 'Back';
        this.forwardLabel = 'Forward';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.translateFeature();
        this.translatePaths();
        this.detectAndParseButtonsConfig();
    }
    /**
     * @return {?}
     */
    detectAndParseButtonsConfig() {
        this.parseBackButton();
        this.parseForwardButton();
    }
    /**
     * @return {?}
     */
    parseBackButton() {
        if (this.backButtonPath !== undefined && this.backButtonPath !== 'false') {
            this.backButtonPath = this.backButtonPath ? this.backButtonPath : '/';
        }
    }
    /**
     * @return {?}
     */
    parseForwardButton() {
        if (this.forwardButton !== undefined && this.forwardButton !== 'false') {
            this.forwardButton = this.forwardButton ? this.forwardButton : '/';
        }
    }
    /**
     * @return {?}
     */
    translateFeature() {
        if (this.i18nBreadcrumb) {
            this.breadcrumb = this.i18nBreadcrumb.map(path => this.translator.instant(path)).join(' / ');
        }
    }
    /**
     * @return {?}
     */
    translatePaths() {
        if (this.i18nFeature) {
            this.feature = this.translator.instant(this.i18nFeature);
        }
    }
    /**
     * @return {?}
     */
    goBack() {
        if (this.backButtonPath) {
            this.router.navigate([this.backButtonPath]);
        }
        else {
            window.history.back();
        }
    }
    /**
     * @return {?}
     */
    goForward() {
        if (this.forwardButton) {
            this.router.navigate([this.forwardButton]);
        }
        else {
            window.history.forward();
        }
    }
}
DecBreadcrumbComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-breadcrumb',
                template: `<div fxLayout="row" class="dec-breadcrumb-wrapper">

  <div fxFlex>
    <div fxLayout="column">
      <div class="title">
        <h1>{{feature}}</h1>
      </div>
      <div class="breadcrumb">
        {{breadcrumb}}
      </div>
    </div>
  </div>

  <div fxFlex fxFlexAlign="center" fxLayoutAlign="end">
    <div fxLayout="row">
      <div fxFlex>
        <!-- CONTENT  -->
        <ng-content></ng-content>
        <!-- BACK BUTTON -->
        <button type="button" mat-raised-button color="default" *ngIf="backButtonPath" (click)="goBack()">{{ backLabel }}</button>
        <!-- FORWARD BUTTON -->
        <button type="button" mat-raised-button color="default" *ngIf="forwardButton" (click)="goForward()">{{ forwardLabel }}</button>
      </div>
    </div>
  </div>

</div>
`,
                styles: [`.dec-breadcrumb-wrapper{margin-bottom:32px}.dec-breadcrumb-wrapper h1{font-size:24px;font-weight:400;margin-top:4px;margin-bottom:4px}.dec-breadcrumb-wrapper .breadcrumb{color:#a8a8a8}`],
            },] },
];
/** @nocollapse */
DecBreadcrumbComponent.ctorParameters = () => [
    { type: Router },
    { type: TranslateService }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecBreadcrumbModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecDialogComponent {
    /**
     * @param {?} factor
     * @param {?} dialogRef
     */
    constructor(factor, dialogRef) {
        this.factor = factor;
        this.dialogRef = dialogRef;
        this.actions = [];
        this.context = {};
        this.child = new EventEmitter();
        this.factoryTheComponent = () => {
            const /** @type {?} */ componentFactory = this.factor.resolveComponentFactory(this.childComponentType);
            const /** @type {?} */ componentRef = this.childContainer.createComponent(componentFactory);
            this.childComponentInstance = componentRef.instance;
            this.child.emit(this.childComponentInstance);
            this.child.complete(); // unsubsribe subscribers
            this.appendContextToInstance(componentRef.instance, this.context);
            this.loaded = true;
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dialogRef.afterOpen()
            .toPromise()
            .then(this.factoryTheComponent);
    }
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    appendContextToInstance(instance, context) {
        if (instance && context) {
            Object.keys(context).forEach((key) => {
                instance[key] = this.context[key];
            });
        }
    }
}
DecDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-dialog',
                template: `<mat-toolbar color="primary">

  <div fxLayout="row" fxFlexFill fxLayoutAlign="start center">
    <div>
      <button type="button" mat-icon-button class="uppercase" mat-dialog-close>
        <mat-icon>arrow_back</mat-icon>
      </button>
    </div>
    <div>
      <h1>&nbsp; {{ title }}</h1>
    </div>
    <div fxFlex>
      <div fxLayout="row" fxLayoutAlign="end center">
        <div *ngIf="actions">
          <mat-menu #decDialogActionsMenu="matMenu">
            <button *ngFor="let action of actions" mat-menu-item (click)="action.callback(context)">
              <span *ngIf="action.label">{{ action.label }}</span>
              <span *ngIf="action.i18nLabel">{{ action.i18nLabel | translate }}</span>
            </button>
          </mat-menu>

          <button mat-icon-button [matMenuTriggerFor]="decDialogActionsMenu">
            <mat-icon>more_vert</mat-icon>
          </button>
        </div>
      </div>
    </div>
  </div>

</mat-toolbar>

<div class="dec-dialog-child-wrapper">
  <template #childContainer></template>
</div>

<dec-spinner *ngIf="!loaded"></dec-spinner>
`,
                styles: [`.dec-dialog-child-wrapper{padding:32px}`]
            },] },
];
/** @nocollapse */
DecDialogComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: MatDialogRef }
];
DecDialogComponent.propDecorators = {
    childContainer: [{ type: ViewChild, args: ['childContainer', { read: ViewContainerRef },] }],
    child: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSpinnerComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
DecSpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-spinner',
                template: `<div class="decora-loading-spinner-wrapper">
  <div class="decora-loading-spinner transparentBg">
    <div class="center">
      <div class="spinner-wrapper">
        <div class="spinner">
          <div class="inner">
            <div class="gap"></div>
            <div class="left">
              <div class="half-circle"></div>
            </div>
            <div class="right">
              <div class="half-circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

`,
                styles: [`.decora-loading-spinner-wrapper{position:relative;display:block;width:100%}`]
            },] },
];
/** @nocollapse */
DecSpinnerComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSpinnerModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecDialogService {
    /**
     * @param {?} dialog
     */
    constructor(dialog) {
        this.dialog = dialog;
    }
    /**
     * @param {?} childComponent
     * @param {?} config
     * @return {?}
     */
    open(childComponent, config) {
        const /** @type {?} */ dialogInstance = this.dialog.open(DecDialogComponent, {
            width: config.width || '100vw',
            height: config.heigth || '100vh',
            panelClass: 'full-screen-dialog'
        });
        dialogInstance.componentInstance.childComponentType = childComponent;
        dialogInstance.componentInstance.actions = config.actions;
        dialogInstance.componentInstance.title = config.title;
        dialogInstance.componentInstance.context = config.context;
        return dialogInstance;
    }
}
DecDialogService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecDialogService.ctorParameters = () => [
    { type: MatDialog }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecDialogModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// https://github.com/sheikalthaf/ngu-carousel#input-interface
const /** @type {?} */ CarouselConfig = {
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
class DecGalleryComponent {
    constructor() {
        this.carouselConfig = CarouselConfig;
        this._images = [];
        this.onSelectImage = ($event, sysFile) => {
            if (this.activeImage && this.activeImage !== $event.target) {
                this.activeImage.className = '';
            }
            $event.target.className = 'active';
            this.activeImage = $event.target;
            this.imageHighlight = sysFile;
            this.setExternalLink();
        };
        this.setExternalLink = () => {
            if (this.imageHighlight) {
                this.imgExternalLink = this.imageHighlight.fileUrl;
            }
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set images(value) {
        value = value || new Array();
        if (value && (JSON.stringify(value) !== JSON.stringify(this._images))) {
            this.imageHighlight = value[0];
            this._images = value;
            this.setExternalLink();
        }
    }
    /**
     * @return {?}
     */
    get images() {
        return this._images;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInitDataFn(event) {
        this.setPrevNextCheckers(event.isFirst, event.items >= this.images.length);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMoveFn(event) {
        this.setPrevNextCheckers(event.isFirst, event.isLast);
    }
    /**
     * @param {?} first
     * @param {?} last
     * @return {?}
     */
    setPrevNextCheckers(first, last) {
        setTimeout(() => {
            this.isFirst = first;
            this.isLast = last;
        }, 0);
    }
}
DecGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-gallery',
                template: `<div class="dec-gallery-wrapper">

  <div class="image-highlighted">
      <dec-image-zoom
        [size]="{width: 620, height: 620}"
        [systemFile]="imageHighlight">
      </dec-image-zoom>
  </div>

  <div class="text-right" *ngIf="imgExternalLink">

    <a href="{{ imgExternalLink }}" target="_blank">{{ 'label.image-link' | translate }}</a>

  </div>

  <ngu-carousel class="carousel-wrapper" [inputs]="carouselConfig" (initData)="onInitDataFn($event)" (onMove)="onMoveFn($event)">

    <ngu-item NguCarouselItem *ngFor="let image of images" [class.active]="image == imageHighlight">

      <img [decImage]="image" [decImageSize]="{width:300, height:300}" (click)="onSelectImage($event,image)">

    </ngu-item>

    <mat-icon NguCarouselPrev class="left-previous" [ngClass]="{'disabled': isFirst}">chevron_left</mat-icon>

    <mat-icon NguCarouselNext class="right-next" [ngClass]="{'disabled': isLast}">chevron_right</mat-icon>

  </ngu-carousel>

</div>
`,
                styles: [`.dec-gallery-wrapper{max-width:624px;overflow:hidden}.dec-gallery-wrapper .image-highlighted{border:2px solid #f5f5f5;width:620px;height:620px}.dec-gallery-wrapper a{font-size:10px;text-decoration:none;color:#929292;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper{margin-top:8px;padding:0 24px;height:128px}.dec-gallery-wrapper .carousel-wrapper ngu-item{display:flex;justify-content:center;align-items:center;height:124px;padding:2px;margin-right:2px}.dec-gallery-wrapper .carousel-wrapper ngu-item.active,.dec-gallery-wrapper .carousel-wrapper ngu-item:hover{padding:0;border:2px solid #232e38}.dec-gallery-wrapper .carousel-wrapper ngu-item img{max-width:124px;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper .left-previous,.dec-gallery-wrapper .carousel-wrapper .right-next{display:block!important;position:absolute;top:calc(50% - 12px);cursor:pointer;text-shadow:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.dec-gallery-wrapper .carousel-wrapper .left-previous:hover,.dec-gallery-wrapper .carousel-wrapper .right-next:hover{text-shadow:0 0 6px rgba(0,0,0,.2)}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled{opacity:.4}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled:hover,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled:hover{text-shadow:none}.dec-gallery-wrapper .carousel-wrapper .left-previous{left:0}.dec-gallery-wrapper .carousel-wrapper .right-next{right:0}`]
            },] },
];
/** @nocollapse */
DecGalleryComponent.ctorParameters = () => [];
DecGalleryComponent.propDecorators = {
    images: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ ThumborServerHost = 'https://cache-thumbs.decoracontent.com/unsafe';
const /** @type {?} */ S3Host = 'http://s3.amazonaws.com/decora-platform-1-nv';
const /** @type {?} */ TransparentImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAAmJLR0QA/4ePzL8AAA
AJcEhZcwAACxMAAAsTAQCanBgAAAALSURBVAjXY2BgAAAAAwABINWUxwAAAABJRU5ErkJggg==`;
const /** @type {?} */ ErrorImage = `data:image/png;base64,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`;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecImageDirective {
    /**
     * @param {?} viewContainerRef
     */
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
        this.errorOnLoad = false;
        // Ged redimensioned image from thumbor image resize service
        this.thumborize = true;
        this.innerImage = TransparentImage;
        this.detectContainerElement();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set decImage(v) {
        if (v !== this.innerImage) {
            this.innerImage = v;
            this.loadImage();
        }
    }
    /**
     * @return {?}
     */
    detectContainerElement() {
        this.containerElement = this.viewContainerRef.element.nativeElement;
        this.containerElementType = this.containerElement.tagName === 'IMG' ? 'IMG' : 'NOT-IMG';
    }
    /**
     * @return {?}
     */
    loadImage() {
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
    }
    /**
     * @return {?}
     */
    extractImageUrlFromSysfile() {
        try {
            return this.innerImage['fileBasePath'] || undefined;
        }
        catch (/** @type {?} */ error) {
            return undefined;
        }
    }
    /**
     * @return {?}
     */
    getFinalUrl() {
        if (this.thumborize) {
            return this.getThumborUrl();
        }
        else {
            return this.getS3Url();
        }
    }
    /**
     * @return {?}
     */
    getS3Url() {
        return `${S3Host}/${this.imagePath}`;
    }
    /**
     * @return {?}
     */
    getThumborUrl() {
        const /** @type {?} */ size = this.getImageSize(this.decImageSize);
        const /** @type {?} */ aspect = this.getAspect();
        const /** @type {?} */ trim = this.getTrim();
        return `${ThumborServerHost}/${size}${aspect}${trim}/${this.imagePath}`;
    }
    /**
     * @param {?=} decImageSize
     * @return {?}
     */
    getImageSize(decImageSize = {}) {
        return `${decImageSize.width || 0}x${decImageSize.height || 0}`;
    }
    /**
     * @return {?}
     */
    getAspect() {
        return this.fitIn ? '/fit-in' : '';
    }
    /**
     * @return {?}
     */
    getTrim() {
        return this.trim ? '/trim' : '';
    }
    /**
     * @return {?}
     */
    tryToLoadImage() {
        const /** @type {?} */ downloadingImage = new Image();
        downloadingImage.onload = () => {
            this.createImage();
        };
        downloadingImage.onerror = () => {
            this.finalImageUrl = ErrorImage;
            this.createImage();
        };
        downloadingImage.src = this.finalImageUrl;
    }
    /**
     * @return {?}
     */
    createImage() {
        if (this.containerElementType === 'IMG') {
            this.setImageelementSrc();
        }
        else {
            this.appendImageToBg();
        }
    }
    /**
     * @return {?}
     */
    appendImageToBg() {
        this.containerElement.style.backgroundImage = 'url(' + this.finalImageUrl + ')';
        this.containerElement.style.backgroundPosition = 'center';
        this.containerElement.style.backgroundRepeat = 'no-repeat';
        this.containerElement.style.backgroundSize = '100%';
        this.containerElement.classList.remove('dec-image-bg-loading');
    }
    /**
     * @return {?}
     */
    setImageelementSrc() {
        this.containerElement.setAttribute('src', this.finalImageUrl);
    }
}
DecImageDirective.decorators = [
    { type: Directive, args: [{
                selector: '[decImage]'
            },] },
];
/** @nocollapse */
DecImageDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
DecImageDirective.propDecorators = {
    decImage: [{ type: Input }],
    decImageSize: [{ type: Input }],
    trim: [{ type: Input }],
    fitIn: [{ type: Input }],
    thumborize: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecImageModule {
}
DecImageModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [DecImageDirective],
                exports: [DecImageDirective]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecImageZoomComponent {
    constructor() {
        this.zoomMode = 'click';
        this.enableScrollZoom = true;
        this.scrollStepSize = 0.1;
        this.enableLens = true;
        this.lensWidth = 100;
        this.lensHeight = 100;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set systemFile(v) {
        if (v !== this._systemFile) {
            this._systemFile = v;
            this.loadImage();
        }
    }
    /**
     * @return {?}
     */
    get systemFile() {
        return this._systemFile;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set size(v) {
        if (v) {
            this._thumbSize = v;
            this.loadImage();
        }
    }
    /**
     * @return {?}
     */
    get size() {
        return this._thumbSize;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    loadImage() {
        if (this.systemFile && this.size) {
            this.setFinalImageUrl();
            this.setOriginalImagePath();
            this.setThumborlUrl();
        }
    }
    /**
     * @return {?}
     */
    setFinalImageUrl() {
        this.fullImageUrl = this.systemFile.fileBaseUrl + '.' + this.systemFile.extension;
        console.log('setFinalImageUrl', this.fullImageUrl);
    }
    /**
     * @return {?}
     */
    setOriginalImagePath() {
        this.fullImagePath = this.extractImageUrlFromSysfile();
        console.log('setOriginalImagePath', this.fullImagePath);
    }
    /**
     * @return {?}
     */
    setThumborlUrl() {
        this.resizedImageUrl = this.getThumborUrl();
        console.log('setThumborlUrl', this.resizedImageUrl);
    }
    /**
     * @return {?}
     */
    extractImageUrlFromSysfile() {
        try {
            return this.systemFile['fileBasePath'] || undefined;
        }
        catch (/** @type {?} */ error) {
            return undefined;
        }
    }
    /**
     * @return {?}
     */
    getImageSize() {
        return `${this.size.width || 0}x${this.size.height || 0}`;
    }
    /**
     * @return {?}
     */
    getThumborUrl() {
        const /** @type {?} */ size = this.getImageSize();
        return `${ThumborServerHost}/${size}/${this.fullImagePath}`;
    }
}
DecImageZoomComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-image-zoom',
                template: `<div class="imagehighlight-container" >
  <ngx-image-zoom
    [thumbImage]="resizedImageUrl"
    [fullImage]="fullImageUrl"
    [zoomMode]="zoomMode"
    [enableScrollZoom]="enableScrollZoom"
    [scrollStepSize]="scrollStepSize"
    [enableLens]="enableLens"
    [lensWidth]="lensWidth"
    [lensHeight]="lensHeight"
  ></ngx-image-zoom>
</div>

`,
                styles: [`.imagehighlight-container{width:100%;height:100%;cursor:zoom-in}`]
            },] },
];
/** @nocollapse */
DecImageZoomComponent.ctorParameters = () => [];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecImageZoomModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecGalleryModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecIconComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout(() => {
            try {
                this.icon = this.textElement.nativeElement.textContent;
            }
            catch (/** @type {?} */ error) { }
        }, 0);
    }
}
DecIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-icon',
                template: `<ng-container [ngSwitch]="font">
  <ng-container *ngSwitchCase="'mat'">
    <i class="material-icons">{{icon}}</i>
  </ng-container>
  <ng-container *ngSwitchCase="'fas'">
    <i class="fa {{'fa-'+icon}}" aria-hidden="true"></i>
  </ng-container>
</ng-container>

<span #text [hidden]="true">
  <ng-content></ng-content>
</span>
`,
                styles: [`.material-icons{color:inherit;font-size:inherit;display:inline-block;-webkit-transform:translateY(16%);transform:translateY(16%);-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}`]
            },] },
];
/** @nocollapse */
DecIconComponent.ctorParameters = () => [];
DecIconComponent.propDecorators = {
    font: [{ type: Input }],
    textElement: [{ type: ViewChild, args: ['text',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecIconModule {
    /**
     * @param {?} matIconRegistry
     */
    constructor(matIconRegistry) {
        this.matIconRegistry = matIconRegistry;
        this.matIconRegistry.registerFontClassAlias('fas', 'fa');
    }
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
DecIconModule.ctorParameters = () => [
    { type: MatIconRegistry }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecLabelComponent {
}
DecLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-label',
                template: `<div [ngStyle]="{'background-color': colorHex}" [ngClass]="decClass" decContrastFontWithBg>
  <ng-content></ng-content>
</div>
`,
                styles: [`div{margin:4px;display:inline-block;padding:7px 12px;border-radius:24px;align-items:center;cursor:default}`]
            },] },
];
DecLabelComponent.propDecorators = {
    colorHex: [{ type: Input }],
    decClass: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DEFAULT_LUMA_BREAKPOINT = 200;
/**
 * @param {?} hex
 * @return {?}
 */
function hexToRgbNew(hex) {
    const /** @type {?} */ result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
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
    const /** @type {?} */ canvas = document.createElement('canvas');
    const /** @type {?} */ ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    return ctx.fillStyle;
}
class DecContrastFontWithBgDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.bgColor = this.el.nativeElement.style.backgroundColor;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    set decContrastFontWithBg(config) {
        this.config = config;
        this.doDecContrastFontWithBg();
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        const /** @type {?} */ bgColor = this.el.nativeElement.style.backgroundColor;
        if (bgColor !== this.bgColor) {
            this.bgColor = bgColor;
            this.doDecContrastFontWithBg();
        }
    }
    /**
     * @return {?}
     */
    doDecContrastFontWithBg() {
        const /** @type {?} */ lumaBreakPoint = (this.config && this.config.lumaBreakPoint) ? this.config.lumaBreakPoint : DEFAULT_LUMA_BREAKPOINT;
        const /** @type {?} */ hexaBgColor = standardize_color(this.bgColor);
        const /** @type {?} */ rgbColor = hexToRgbNew(hexaBgColor);
        const /** @type {?} */ luma = 0.2126 * rgbColor.r + 0.7152 * rgbColor.g + 0.0722 * rgbColor.b; // per ITU-R BT.709
        if (luma < lumaBreakPoint) {
            this.el.nativeElement.style.color = (this.config && this.config.lightColor) ? this.config.lightColor : 'rgba(255,255,255,1)';
        }
        else {
            this.el.nativeElement.style.color = (this.config && this.config.darkColor) ? this.config.darkColor : '#232e38';
        }
    }
}
DecContrastFontWithBgDirective.decorators = [
    { type: Directive, args: [{
                selector: '[decContrastFontWithBg]'
            },] },
];
/** @nocollapse */
DecContrastFontWithBgDirective.ctorParameters = () => [
    { type: ElementRef }
];
DecContrastFontWithBgDirective.propDecorators = {
    decContrastFontWithBg: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecContrastFontWithBgModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecLabelModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListFilter {
    /**
     * @param {?=} data
     */
    constructor(data = {}) {
        this.children = data.children ? data.children.map(filter$$1 => new DecListFilter(filter$$1)) : undefined;
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListTabsFilterComponent {
    /**
     * @param {?} route
     * @param {?} router
     */
    constructor(route, router) {
        this.route = route;
        this.router = router;
        this._filters = [];
        this.search = new EventEmitter();
        this.tabChange = new EventEmitter();
        this.doFirstLoad = () => {
            setTimeout(() => {
                // avoids ExpressionChangedAfterItHasBeenCheckedError selecting the active tab
                this.watchTabInUrlQuery();
            }, 0);
        };
        this.onSearch = (tab, recount = false) => {
            this.selectedTabUid = tab.uid;
            if (this.filters && tab) {
                const /** @type {?} */ event = {
                    filters: tab.filters,
                    children: tab.children,
                    recount: recount,
                };
                this.search.emit(event);
            }
        };
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set filters(v) {
        if (this._filters !== v) {
            this._filters = v ? v.map(filter$$1 => new DecListFilter(filter$$1)) : [];
        }
    }
    /**
     * @return {?}
     */
    get filters() {
        return this._filters;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stopWatchingTabInUrlQuery();
    }
    /**
     * @param {?} uid
     * @return {?}
     */
    getCountOf(uid) {
        return this.countReport && this.countReport[uid] >= 0 ? this.countReport[uid] : '?';
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    selectTab(tab) {
        this.setTabInUrlQuery(tab);
    }
    /**
     * @return {?}
     */
    get selectedTab() {
        return this.filters ? this.filters.find(filter$$1 => filter$$1.uid === this.selectedTabUid) : undefined;
    }
    /**
     * @return {?}
     */
    get visibleFilters() {
        const /** @type {?} */ visible = this.filters ? this.filters.filter((filter$$1) => !filter$$1.hide) : [];
        return (visible && visible.length > 1) ? visible : undefined;
    }
    /**
     * @return {?}
     */
    detectDefaultTab() {
        const /** @type {?} */ hasDefault = this.filters.find((item) => {
            return item.default;
        });
        if (hasDefault) {
            this.defaultTab = hasDefault.uid;
        }
        else {
            this.defaultTab = this.filters[0].uid;
        }
    }
    /**
     * @return {?}
     */
    componentTabName() {
        return this.name + '-tab';
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    setTabInUrlQuery(tab) {
        const /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
        queryParams[this.componentTabName()] = tab;
        this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
    }
    /**
     * @return {?}
     */
    watchTabInUrlQuery() {
        this.detectDefaultTab();
        this.wathUrlSubscription = this.route.queryParams
            .subscribe((params) => {
            const /** @type {?} */ tab = params[this.componentTabName()] || this.defaultTab;
            if (tab !== this.selectedTabUid) {
                const /** @type {?} */ selectedTab = this.filters.find(filter$$1 => filter$$1.uid === tab);
                this.onSearch(selectedTab);
                this.tabChange.emit(tab);
            }
        });
    }
    /**
     * @return {?}
     */
    stopWatchingTabInUrlQuery() {
        if (this.wathUrlSubscription) {
            this.wathUrlSubscription.unsubscribe();
        }
    }
}
DecListTabsFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-tabs-filter',
                template: `<div class="list-tabs-filter-wrapper" *ngIf="visibleFilters as filters">
  <div fxLayout="row" class="dec-tab-header">
    <ng-container *ngFor="let tabFilter of filters">
      <button type="button"
              *decPermission="tabFilter.permissions"
              mat-button
              class="uppercase"
              (click)="selectTab(tabFilter.uid)"
              [class.selected]="selectedTabUid == (tabFilter.uid)">
        <span>{{ 'label.' + tabFilter.label | translate | uppercase }}</span>
        <span *ngIf="countReport" class="badge badge-pill badge-small">{{ countReport[tabFilter.uid].count }}</span>
      </button>
    </ng-container>
  </div>
</div>
`,
                styles: [`.list-tabs-filter-wrapper{margin-top:8px}.list-tabs-filter-wrapper .dec-tab-header.bottom{border-bottom:0}.list-tabs-filter-wrapper .dec-tab-header .badge{margin-left:8px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill{padding:8px;font-size:small;border-radius:24px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill.badge-small{font-size:x-small;padding:4px}`]
            },] },
];
/** @nocollapse */
DecListTabsFilterComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router }
];
DecListTabsFilterComponent.propDecorators = {
    countReport: [{ type: Input }],
    filters: [{ type: Input }],
    search: [{ type: Output, args: ['search',] }],
    tabChange: [{ type: Output, args: ['tabChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListAdvancedFilterComponent {
    constructor() {
        this.form = {};
        this.onSearch = () => { };
        this.onClear = () => { };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    reset() {
        this.onClear();
    }
    /**
     * @return {?}
     */
    submit() {
        this.onSearch();
    }
}
DecListAdvancedFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-advanced-filter',
                template: `<div fxLayout="column" fxLayoutGap="16px">

  <div fxFlex>

    <ng-container
      [ngTemplateOutlet]="templateRef"
      [ngTemplateOutletContext]="{form: form}"
    ></ng-container>

  </div>

  <div fxFlex>

    <div fxLayout="row" fxLayoutAlign="end end" fxLayoutGap="8px">

      <button type="button" mat-raised-button color="primary" (click)="submit()">{{ 'label.search' | translate | uppercase }}</button>

      <button type="button" mat-button (click)="reset()">{{ 'label.reset' | translate | uppercase }}</button>

    </div>

  </div>

</div>




`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecListAdvancedFilterComponent.ctorParameters = () => [];
DecListAdvancedFilterComponent.propDecorators = {
    templateRef: [{ type: ContentChild, args: [TemplateRef,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListFilterComponent {
    /**
     * @param {?} platformLocation
     * @param {?} route
     * @param {?} router
     */
    constructor(platformLocation, route, router) {
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
        this.onSearch = (appendCurrentForm = true) => {
            if (this.filterForm && appendCurrentForm) {
                const /** @type {?} */ newDecFilterGroup = {
                    filters: []
                };
                Object.keys(this.filterForm).forEach(key => {
                    if (this.filterForm[key]) {
                        const /** @type {?} */ filter$$1 = { property: key, value: this.filterForm[key] };
                        newDecFilterGroup.filters.push(filter$$1);
                    }
                });
                if (newDecFilterGroup.filters.length > 0) {
                    if (this.innerDecFilterGroups) {
                        if (this.editionGroupIndex >= 0) {
                            this.innerDecFilterGroups[this.editionGroupIndex] = newDecFilterGroup;
                        }
                        else {
                            this.innerDecFilterGroups.push(newDecFilterGroup);
                        }
                    }
                    else {
                        this.innerDecFilterGroups = [newDecFilterGroup];
                    }
                }
            }
            this.reacalculateAndEmitCurrentDecFilterGroups(true);
        };
        this.clearFilterForm = () => {
            if (this.filterForm) {
                Object.keys(this.filterForm).forEach(key => {
                    this.filterForm[key] = undefined;
                });
            }
        };
        this.actByClickPosition = ($event) => {
            if (event && event['path']) {
                const /** @type {?} */ clickedInsideFilter = $event['path'].find(path => {
                    const /** @type {?} */ className = `${path['className']}` || '';
                    const /** @type {?} */ insideWrapper = className.indexOf(this.clickableContainerClass) >= 0;
                    const /** @type {?} */ insideOption = className.indexOf('mat-option') >= 0;
                    const /** @type {?} */ insideDatePicker = className.indexOf('mat-datepicker-content') >= 0;
                    const /** @type {?} */ insideOverlayContainer = className.indexOf('cdk-overlay-container') >= 0;
                    return insideWrapper || insideOption || insideDatePicker || insideOverlayContainer;
                });
                if (!clickedInsideFilter) {
                    // avoid closing filter from any open dialog
                    this.closeFilters();
                    this.clearFilterForm();
                }
            }
        };
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set filters(v) {
        if (this._filters !== v) {
            this._filters = v.map(filter$$1 => new DecListFilter(filter$$1));
        }
    }
    /**
     * @return {?}
     */
    get loadCountReport() {
        return this._loadCountReport;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set loadCountReport(v) {
        if (v !== false) {
            this._loadCountReport = true;
        }
    }
    /**
     * @return {?}
     */
    get filters() {
        return this._filters;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.watchTabsFilter();
        this.watchClick();
        this.watchUrlFilter();
        this.configureAdvancedFilter();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stopWatchingClick();
        this.stopWatchingTabsFilter();
        this.stopWatchingUrlFilter();
    }
    /**
     * @return {?}
     */
    toggleSearchInput() {
        this.showSearchInput = !this.showSearchInput;
        if (!this.showSearchInput) {
            this.showAdvancedFilter = false;
        }
        else {
            setTimeout(() => {
                this.inputSearch.nativeElement.focus();
            }, 180);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    toggleAdvancedFilter($event) {
        $event.stopPropagation();
        this.showAdvancedFilter = !this.showAdvancedFilter;
    }
    /**
     * @return {?}
     */
    onClear() {
        this.closeFilters();
        this.filterGroups = undefined;
        this.filterGroupsWithoutTabs = undefined;
        this.innerDecFilterGroups = undefined;
        this.clearFilterForm();
        this.onSearch();
    }
    /**
     * @param {?} groupIndex
     * @return {?}
     */
    removeDecFilterGroup(groupIndex) {
        this.filterGroups = this.filterGroups.filter((group, index) => index !== groupIndex);
        this.filterGroupsWithoutTabs = this.filterGroupsWithoutTabs.filter((group, index) => index !== groupIndex);
        this.innerDecFilterGroups = this.innerDecFilterGroups.filter((group, index) => index !== groupIndex);
        this.onSearch(true);
    }
    /**
     * @param {?} groupIndex
     * @return {?}
     */
    editDecFilterGroup(groupIndex) {
        this.editionGroupIndex = groupIndex;
        const /** @type {?} */ toEditDecFilterGroup = this.filterGroupsWithoutTabs[groupIndex];
        if (toEditDecFilterGroup && toEditDecFilterGroup.filters.length > 0) {
            this.reloadFormWithGivenDecFilterGroupe(toEditDecFilterGroup.filters);
        }
    }
    /**
     * @return {?}
     */
    onClickInfo() {
        console.log('on click info. Not implemented');
    }
    /**
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    appendToCurrentDecFilterGroups(propertyName, propertyValue) {
        const /** @type {?} */ filter$$1 = {
            'property': propertyName,
            'value': propertyValue,
        };
        if (this.filterGroupsWithoutTabs) {
            this.filterGroupsWithoutTabs.forEach((filterGroup) => {
                const /** @type {?} */ filterExistsInThisGroup = filterGroup.filters.find(filterGroupFilter => filterGroupFilter.property === filter$$1.property);
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
    }
    /**
     * @return {?}
     */
    closeFilters() {
        this.editionGroupIndex = undefined;
        this.showAdvancedFilter = false;
        this.showSearchInput = false;
    }
    /**
     * @param {?=} recount
     * @return {?}
     */
    reacalculateAndEmitCurrentDecFilterGroups(recount = false) {
        this.emitCurrentDecFilterGroups(recount)
            .then(() => {
            if (!this.hasPersistence) {
                return;
            }
            this.refreshFilterInUrlQuery()
                .then(() => {
                this.closeFilters();
                this.clearFilterForm();
            });
        });
    }
    /**
     * @param {?} filters
     * @return {?}
     */
    reloadFormWithGivenDecFilterGroupe(filters) {
        this.clearFilterForm();
        filters.forEach(filter$$1 => {
            if (filter$$1.value) {
                this.filterForm[filter$$1.property] = filter$$1.value;
            }
        });
        this.openFilters();
    }
    /**
     * @return {?}
     */
    openFilters() {
        this.showAdvancedFilter = true;
        this.showSearchInput = true;
    }
    /**
     * @return {?}
     */
    configureAdvancedFilter() {
        if (this.advancedFilterComponent) {
            this.advancedFilterComponent.form = this.filterForm;
            this.advancedFilterComponent.onSearch = this.onSearch;
            this.advancedFilterComponent.onClear = this.clearFilterForm;
        }
    }
    /**
     * @return {?}
     */
    watchTabsFilter() {
        if (this.tabsFilterComponent) {
            this.tabsFilterSubscription = this.tabsFilterComponent.search.subscribe(filterEvent => {
                if (filterEvent.children) {
                    this.filterMode = 'collapse';
                    this.childrenFilters = filterEvent.children;
                }
                else {
                    this.filterMode = 'tabs';
                    this.childrenFilters = undefined;
                }
                this.tabsFilter = filterEvent.filters;
                this.emitCurrentDecFilterGroups(this.isItFirstLoad || filterEvent.recount);
                this.isItFirstLoad = false;
            });
        }
    }
    /**
     * @return {?}
     */
    stopWatchingTabsFilter() {
        if (this.tabsFilterSubscription) {
            this.tabsFilterSubscription.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    mountCurrentDecFilterGroups() {
        const /** @type {?} */ currentFilter = [];
        const /** @type {?} */ currentFilterWithoutTabs = [];
        if (this.innerDecFilterGroups && this.innerDecFilterGroups.length) {
            this.innerDecFilterGroups.forEach((filterGroup) => {
                const /** @type {?} */ filterGroupCopy = {
                    filters: filterGroup.filters.slice()
                };
                if (this.tabsFilter) {
                    filterGroupCopy.filters.push(...this.tabsFilter);
                }
                currentFilter.push(filterGroupCopy);
                const /** @type {?} */ filterGroupCopyWithoutTabs = {
                    filters: filterGroup.filters.slice()
                };
                currentFilterWithoutTabs.push(filterGroupCopyWithoutTabs);
            });
        }
        else if (this.tabsFilter) {
            currentFilter.push({ filters: this.tabsFilter });
        }
        this.filterGroups = currentFilter.length ? currentFilter : undefined;
        this.filterGroupsWithoutTabs = currentFilterWithoutTabs.length ? currentFilterWithoutTabs : undefined;
    }
    /**
     * @param {?=} recount
     * @return {?}
     */
    emitCurrentDecFilterGroups(recount = false) {
        let /** @type {?} */ filterGroups = this.filterGroups ? JSON.parse(JSON.stringify(this.filterGroups)) : undefined;
        return new Promise((res, rej) => {
            this.mountCurrentDecFilterGroups();
            if (this.preSearch) {
                filterGroups = this.preSearch(filterGroups);
            }
            this.search.emit({
                filterGroups: filterGroups,
                recount: recount,
                filterMode: this.filterMode,
                children: this.childrenFilters,
            });
            res();
        });
    }
    /**
     * @return {?}
     */
    watchClick() {
        document.addEventListener('click', this.actByClickPosition, true);
    }
    /**
     * @return {?}
     */
    stopWatchingClick() {
        document.removeEventListener('click', this.actByClickPosition, true);
    }
    /**
     * @return {?}
     */
    componentFilterName() {
        return this.name + '-filter';
    }
    /**
     * @return {?}
     */
    watchUrlFilter() {
        if (!this.hasPersistence) {
            return;
        }
        this.watchUrlFilterSubscription = this.route.queryParams
            .subscribe((params) => {
            const /** @type {?} */ interval = window.setInterval(() => {
                if (this.name) {
                    const /** @type {?} */ base64Filter = params[this.componentFilterName()];
                    if (base64Filter) {
                        if (base64Filter !== this.currentUrlEncodedFilter) {
                            const /** @type {?} */ filter$$1 = this.getJsonFromBase64Filter(base64Filter);
                            this.innerDecFilterGroups = filter$$1;
                            this.mountCurrentDecFilterGroups();
                            this.onSearch();
                        }
                    }
                    window.clearInterval(interval);
                }
            }, 10);
        });
    }
    /**
     * @return {?}
     */
    stopWatchingUrlFilter() {
        if (this.watchUrlFilterSubscription) {
            this.watchUrlFilterSubscription.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    refreshFilterInUrlQuery() {
        return new Promise((res, rej) => {
            const /** @type {?} */ filterBase64 = this.getBase64FilterFromDecFilterGroups();
            this.setFilterInUrlQuery(filterBase64).then(res, rej);
        });
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    setFilterInUrlQuery(filter$$1) {
        this.currentUrlEncodedFilter = filter$$1;
        const /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
        queryParams[this.componentFilterName()] = filter$$1;
        return this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
    }
    /**
     * @return {?}
     */
    getBase64FilterFromDecFilterGroups() {
        if (this.filterGroupsWithoutTabs && this.filterGroupsWithoutTabs.length) {
            const /** @type {?} */ base64Filter = btoa(encodeURIComponent(JSON.stringify(this.filterGroupsWithoutTabs)));
            const /** @type {?} */ baseFilterWithoutEqualSign = base64Filter.replace(/=/g, '');
            return baseFilterWithoutEqualSign; // removes = befor eset the filter
        }
        else {
            return undefined;
        }
    }
    /**
     * @param {?} base64Filter
     * @return {?}
     */
    getJsonFromBase64Filter(base64Filter) {
        const /** @type {?} */ base64PadLen = (base64Filter.length % 4) > 0 ? 4 - (base64Filter.length % 4) : 0;
        for (let /** @type {?} */ i = 0; i < base64PadLen; i++) {
            base64Filter += '='; // add = before readd the filter
        }
        let /** @type {?} */ filterObject;
        try {
            filterObject = JSON.parse(decodeURIComponent(atob(base64Filter)));
        }
        catch (/** @type {?} */ error) {
            const /** @type {?} */ msg = 'ListFilterComponent:: Failed to parse the filter. The value is not valid and the filter was removed. Filter value: ';
            console.error(msg, base64Filter);
        }
        return base64Filter ? filterObject : undefined;
    }
}
DecListFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-filter',
                template: `<div class="list-filter-wrapper">
  <div fxLayout="row wrap" fxLayoutAlign="space-between center">
    <!--
      Counter
    -->
    <div fxFlex="30">
      <ng-container *ngIf="count >= 0 && !loading">
        <span *ngIf="count === 0" class="dec-body-strong">{{ "label.record-not-found" | translate }}</span>
        <span *ngIf="count === 1" class="dec-body-strong">{{ "label.one-record-found" | translate }}</span>
        <span *ngIf="count > 1" class="dec-body-strong"> {{ "label.records-found" | translate:{count:count} }}</span>
      </ng-container>
    </div>

    <div fxFlex="70" class="text-right">

      <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="end center" class="search-container">
        <div>

          <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="start center" class="input-search-container" [class.active]="showSearchInput">
            <!-- gap -->
            <div></div>
            <a class="btn-toogle-search">
              <mat-icon (click)="toggleSearchInput()">search</mat-icon>
            </a>
            <form fxFlex role="form" (submit)="onSearch()">
              <div fxLayout="row" fxLayoutGap="16px" fxLayoutAlign="start center" class="input-search">
                <span class="bar-h"></span>
                <input fxFlex #inputSearch name="search" [(ngModel)]="filterForm.search">
                <div *ngIf="advancedFilterComponent" class="click" (click)="toggleAdvancedFilter($event)">
                  <span class="dec-small btn-open-advanced-search">{{"label.advanced-options" | translate}}</span>
                </div>
                <!--gap-->
                <div></div>
              </div>
            </form>
          </div>

        </div>

        <!--Refresh search-->
        <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="start center">
          <a class="btn-info margin-icon" (click)="onSearch()">
            <mat-icon>refresh</mat-icon>
          </a>
        </div>
        <!--Clear filters-->
        <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="start center" *ngIf="filterGroupsWithoutTabs?.length">
          <a class="btn-info" (click)="onClear()">
            <mat-icon>clear</mat-icon>
          </a>
        </div>

        <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="start center" *ngIf="showInfoButton">
          <a class="btn-info" (click)="onClickInfo()">
            <mat-icon>info_outline</mat-icon>
          </a>
        </div>

      </div>

    </div>
  </div>


  <div *ngIf="showAdvancedFilter">

    <mat-card class="advanced-search-container" [ngClass]="{'remove-button-enabled': filterGroupsWithoutTabs?.length}">

      <div fxLayout="row" fxLayoutAlign="end center">

        <a (click)="closeFilters()" class="btn-close-advanced-search">

          <i class="material-icons">close</i>

        </a>

      </div>

      <div>

        <ng-content select="dec-list-advanced-filter"></ng-content>

      </div>

    </mat-card>

  </div>

  <dec-list-active-filter-resume
    *ngIf="filterGroupsWithoutTabs?.length"
    [filterGroups]="filterGroupsWithoutTabs"
    (remove)="removeDecFilterGroup($event)"
    (edit)="editDecFilterGroup($event)"></dec-list-active-filter-resume>

  <dec-list-tabs-filter [filters]="filters" [countReport]="countReport"></dec-list-tabs-filter>
</div>
`,
                styles: [`.list-filter-wrapper{margin:0 0 16px;position:relative}.list-filter-wrapper .mat-icon{color:#999}.list-filter-wrapper .search-term-input{width:500px;margin-right:8px}.list-filter-wrapper .inline-form{display:inline-block}.list-filter-wrapper .advanced-search-container{position:absolute;top:74px;z-index:1;right:30px;width:552px}.list-filter-wrapper .advanced-search-container.remove-button-enabled{right:62px;width:551px}.list-filter-wrapper .advanced-search-container .btn-close-advanced-search{cursor:pointer}.search-container .input-search-container{transition:all .3s ease;overflow:hidden;width:40px;height:50px}.search-container .input-search-container.active{background:#f8f8fa;color:#999;width:600px}.search-container .input-search-container.active .btn-open-advanced-search{display:inline}.search-container .input-search-container .input-search{width:100%}.search-container .input-search-container .input-search input{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;width:100%;vertical-align:bottom}.search-container .input-search-container .btn-open-advanced-search{display:none}.search-container .btn-clear-search{padding-right:15px;cursor:pointer;color:#999;width:90px}.search-container .btn-info,.search-container .btn-toogle-search{font-size:21px;cursor:pointer;height:21px;color:#999}.search-container .bar-h{border-right:2px solid #d0d0d0;height:21px;margin:auto 0;display:inline-block}`]
            },] },
];
/** @nocollapse */
DecListFilterComponent.ctorParameters = () => [
    { type: PlatformLocation },
    { type: ActivatedRoute },
    { type: Router }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListActiveFilterResumeComponent {
    constructor() {
        this.filterGroups = [];
        this.remove = new EventEmitter();
        this.edit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} $event
     * @param {?} filterGroup
     * @return {?}
     */
    editDecFilterGroup($event, filterGroup) {
        $event.stopPropagation();
        this.edit.emit(filterGroup);
    }
    /**
     * @param {?} $event
     * @param {?} filterGroup
     * @return {?}
     */
    removeDecFilterGroup($event, filterGroup) {
        $event.stopPropagation();
        this.remove.emit(filterGroup);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getValuetype(value) {
        const /** @type {?} */ firstValue = Array.isArray(value) ? value[0] : value;
        let /** @type {?} */ type;
        switch (true) {
            case `${firstValue}`.indexOf('000Z') >= 0:
                type = 'date';
                break;
            default:
                type = 'default';
                break;
        }
        return type;
    }
}
DecListActiveFilterResumeComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-active-filter-resume',
                template: `<div *ngIf="filterGroups?.length" class="dec-list-active-filter-resume-wrapper">

  <mat-chip-list>

    <ng-container *ngFor="let group of filterGroups; let groupIndex = index;">
      <mat-chip *ngIf="group?.filters" (click)="editDecFilterGroup($event, groupIndex)">

        <span *ngFor="let filter of group?.filters; let lastFilter = last;" class="item-wrapper">

          <span [ngSwitch]="filter.property !== 'search'">

            <span *ngSwitchCase="true">{{ 'label.' + filter.property | translate }}</span>

            <span *ngSwitchDefault>{{ 'label.Keyword' | translate }}</span>

          </span>

          <span>:&nbsp;</span>

          <span [ngSwitch]="getValuetype(filter.value)" class="value-wrapper">

            <span *ngSwitchCase="'date'">{{ filter.value | date }}</span>

            <span *ngSwitchDefault>{{ filter.value }}</span>

          </span >

          <span *ngIf="!lastFilter">,</span>

          &nbsp;

        </span>

        <i class="material-icons" (click)="removeDecFilterGroup($event, groupIndex)">remove_circle</i>

      </mat-chip>

    </ng-container>

  </mat-chip-list>

</div>
`,
                styles: [`.mat-tab-body-content{padding:16px 0}.mat-form-field-prefix{margin-right:8px!important}.mat-form-field-suffix{margin-left:8px!important}.mat-elevation-z0{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mat-elevation-z1{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.mat-elevation-z2{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.mat-elevation-z3{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.mat-elevation-z4{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mat-elevation-z5{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}.mat-elevation-z6{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.mat-elevation-z7{box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}.mat-elevation-z8{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-elevation-z9{box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}.mat-elevation-z10{box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}.mat-elevation-z11{box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}.mat-elevation-z12{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-elevation-z13{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}.mat-elevation-z14{box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}.mat-elevation-z15{box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}.mat-elevation-z16{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-elevation-z17{box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}.mat-elevation-z18{box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}.mat-elevation-z19{box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}.mat-elevation-z20{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}.mat-elevation-z21{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}.mat-elevation-z22{box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}.mat-elevation-z23{box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}.mat-elevation-z24{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,"Helvetica Neue",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,"Helvetica Neue",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,"Helvetica Neue",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,"Helvetica Neue",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,"Helvetica Neue",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,"Helvetica Neue",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:16px;font-weight:400}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-card-title{font-size:24px;font-weight:400}.mat-card-content,.mat-card-header .mat-card-title,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:13px;line-height:18px}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif}.mat-expansion-panel-header{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-form-field{width:100%;font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,"Helvetica Neue",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-outline{bottom:1.34375em}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:16px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:9px;padding-bottom:9px}.mat-list-item,.mat-list-option{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{font-size:16px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line,.mat-selection-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{font-size:16px}.mat-list .mat-list-option .mat-line,.mat-nav-list .mat-list-option .mat-line,.mat-selection-list .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-item{font-size:12px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line,.mat-selection-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option{font-size:12px}.mat-list[dense] .mat-list-option .mat-line,.mat-nav-list[dense] .mat-list-option .mat-line,.mat-selection-list[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto,"Helvetica Neue",sans-serif}.mat-simple-snackbar{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden}@media screen and (-ms-high-contrast:active){.mat-ripple{display:none}}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1),-webkit-transform 0s cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.288)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;box-sizing:content-box!important}.dec-list-active-filter-resume-wrapper{margin:16px 0 8px}.dec-list-active-filter-resume-wrapper .item-wrapper{max-width:15em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dec-list-active-filter-resume-wrapper .item-wrapper,.dec-list-active-filter-resume-wrapper .material-icons{color:#969696}.dec-list-active-filter-resume-wrapper .filter-content{margin-right:8px}.dec-list-active-filter-resume-wrapper .mat-chip{cursor:pointer}.dec-list-active-filter-resume-wrapper .value-wrapper{color:#ef3f54}`]
            },] },
];
/** @nocollapse */
DecListActiveFilterResumeComponent.ctorParameters = () => [];
DecListActiveFilterResumeComponent.propDecorators = {
    filterGroups: [{ type: Input }],
    remove: [{ type: Output }],
    edit: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListActiveFilterResumeModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecPermissionDirective {
    /**
     * @param {?} service
     * @param {?} templateRef
     * @param {?} viewContainer
     */
    constructor(service, templateRef, viewContainer) {
        this.service = service;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.hasView = false;
    }
    /**
     * @param {?} p
     * @return {?}
     */
    set decPermission(p) {
        if (!p) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        }
        else {
            this.hasPermission(p);
        }
    }
    /**
     * @param {?} p
     * @return {?}
     */
    hasPermission(p) {
        this.service.user$.subscribe(user => {
            if (user && this.isAllowedAccess(p, user.permissions)) {
                if (!this.hasView) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                    this.hasView = true;
                }
            }
            else {
                this.viewContainer.clear();
                this.hasView = false;
            }
        });
    }
    /**
     * @param {?=} rolesAllowed
     * @param {?=} currentRoles
     * @return {?}
     */
    isAllowedAccess(rolesAllowed = [], currentRoles = []) {
        try {
            const /** @type {?} */ matchingRole = currentRoles.find((userRole) => {
                return rolesAllowed.find((alowedRole) => {
                    return alowedRole === userRole;
                }) ? true : false;
            });
            return matchingRole ? true : false;
        }
        catch (/** @type {?} */ error) {
            return false;
        }
    }
}
DecPermissionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[decPermission]'
            },] },
];
/** @nocollapse */
DecPermissionDirective.ctorParameters = () => [
    { type: DecApiService },
    { type: TemplateRef },
    { type: ViewContainerRef }
];
DecPermissionDirective.propDecorators = {
    decPermission: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecPermissionModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListFilterModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListGridComponent {
    constructor() {
        this.itemWidth = '280px';
        this.itemGap = '8px';
        this.rowClick = new EventEmitter();
        this._rows = [];
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set rows(v) {
        if (this._rows !== v) {
            this._rows = v;
        }
    }
    /**
     * @return {?}
     */
    get rows() {
        return this._rows;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} event
     * @param {?} item
     * @param {?} list
     * @param {?} index
     * @return {?}
     */
    onItemClick(event, item, list, index) {
        this.rowClick.emit({ event, item, list, index });
    }
}
DecListGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-grid',
                template: `<div fxLayout="row wrap" [fxLayoutGap]="itemGap" >
  <div *ngFor="let row of rows; let i = index;" (click)="onItemClick($event, row, rows, i)" [fxFlex]="itemWidth">
    <div [ngStyle]="{margin: itemGap}">
      <ng-container
        [ngTemplateOutlet]="templateRef"
        [ngTemplateOutletContext]="{row: row || {}, list: rows || [], index: i}"
      ></ng-container>
    </div>
  </div>
</div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecListGridComponent.ctorParameters = () => [];
DecListGridComponent.propDecorators = {
    templateRef: [{ type: ContentChild, args: [TemplateRef,] }],
    itemWidth: [{ type: Input }],
    itemGap: [{ type: Input }],
    rowClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListTableColumnComponent {
    constructor() {
        this.title = '';
        this._colSpan = 1;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set colSpan(v) {
        const /** @type {?} */ number = +v;
        this._colSpan = isNaN(number) ? 1 : number;
    }
    /**
     * @return {?}
     */
    get colSpan() {
        return this._colSpan;
    }
}
DecListTableColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-table-column',
                template: `<ng-content></ng-content>
`,
                styles: [``]
            },] },
];
DecListTableColumnComponent.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef,] }],
    prop: [{ type: Input }],
    title: [{ type: Input }],
    colSpan: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListTableComponent {
    constructor() {
        this._rows = [];
        this.sort = new EventEmitter();
        this.rowClick = new EventEmitter();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set rows(v) {
        if (this._rows !== v) {
            this._rows = v;
        }
    }
    /**
     * @return {?}
     */
    get rows() {
        return this._rows;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSort(event) {
        const /** @type {?} */ sortConfig = [{
                property: event.sorts[0].prop,
                order: event.sorts[0].dir.toUpperCase()
            }];
        if (sortConfig !== this.columnsSortConfig) {
            this.columnsSortConfig = sortConfig;
            this.sort.emit(this.columnsSortConfig);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onItemClick($event) {
        const /** @type {?} */ event = $event;
        const /** @type {?} */ item = $event.row;
        const /** @type {?} */ list = this.rows;
        const /** @type {?} */ index = $event.row.$$index;
        this.rowClick.emit({ event, item, list, index });
    }
}
DecListTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-table',
                template: `<ngx-datatable #tableComponent
  columnMode="flex"
  headerHeight="24px"
  rowHeight="auto"
  [externalSorting]="true"
  [messages]="{emptyMessage:''}"
  [rows]="rows"
  (sort)="onSort($event)"
  (activate)="onItemClick($event)">

  <ngx-datatable-column *ngFor="let column of columns;"
                         name="{{column.title | translate}}"
                         [flexGrow]="column.colSpan"
                         [prop]="column.prop"
                         [sortable]="column.prop ? true : false">

    <ng-template *ngIf="column.template ? true : false"
      let-row="row"
      let-index="rowIndex"
      ngx-datatable-cell-template>

      <ng-container
        [ngTemplateOutlet]="column.template"
        [ngTemplateOutletContext]="{row: row || {}, list: rows || [], index: index}"
      ></ng-container>

    </ng-template>

  </ngx-datatable-column>

</ngx-datatable>
`,
                styles: [`::ng-deep .ngx-datatable .overflow-visible{overflow:visible!important}::ng-deep datatable-scroller{width:100%!important}::ng-deep .ngx-datatable.no-overflow{overflow:auto}::ng-deep .ngx-datatable.no-padding .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:0}::ng-deep .ngx-datatable .datatable-header{padding:11px 16px}::ng-deep .ngx-datatable .datatable-header .datatable-header-cell-label{font-size:12px;font-weight:500}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell{font-size:13px;font-weight:400;overflow:hidden;min-height:100%;display:table;-webkit-user-select:initial;-moz-user-select:initial;-ms-user-select:initial;-o-user-select:initial;user-select:initial}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell .datatable-body-cell-label{padding:16px;display:table-cell;vertical-align:middle;word-break:break-all}::ng-deep .ngx-datatable .datatable-body-row .datatable-body-cell.cell-top .datatable-body-cell-label{vertical-align:top}::ng-deep .ngx-datatable .datatable-row-detail{padding:10px}::ng-deep .ngx-datatable .sort-btn{width:0;height:0}::ng-deep .ngx-datatable .icon-down{border-left:5px solid transparent;border-right:5px solid transparent}::ng-deep .ngx-datatable .icon-up{border-left:5px solid transparent;border-right:5px solid transparent}`]
            },] },
];
/** @nocollapse */
DecListTableComponent.ctorParameters = () => [];
DecListTableComponent.propDecorators = {
    rows: [{ type: Input }],
    tableComponent: [{ type: ViewChild, args: [DatatableComponent,] }],
    columns: [{ type: ContentChildren, args: [DecListTableColumnComponent,] }],
    sort: [{ type: Output }],
    rowClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListComponent {
    /**
     * @param {?} service
     */
    constructor(service) {
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
        this.getListMode = () => {
            let /** @type {?} */ listMode = this.listMode;
            if (this.filter && this.filter.tabsFilterComponent) {
                if (this.selectedTab && this.selectedTab.listMode) {
                    listMode = this.selectedTab.listMode;
                }
                else {
                    listMode = this.table ? 'table' : 'grid';
                }
            }
            return listMode;
        };
        this.actByScrollPosition = ($event) => {
            if ($event['path']) {
                const /** @type {?} */ elementWithCdkOverlayClass = $event['path'].find(path => {
                    const /** @type {?} */ className = path['className'] || '';
                    const /** @type {?} */ insideOverlay = className.indexOf('cdk-overlay') >= 0;
                    const /** @type {?} */ insideFullscreanDialogContainer = className.indexOf('fullscrean-dialog-container') >= 0;
                    return insideOverlay || insideFullscreanDialogContainer;
                });
                if (!elementWithCdkOverlayClass) {
                    // avoid closing filter from any open dialog
                    if (!this.isLastPage) {
                        const /** @type {?} */ target = $event['target'];
                        const /** @type {?} */ limit = target.scrollHeight - target.clientHeight;
                        if (target.scrollTop >= (limit - 16)) {
                            this.showMore();
                        }
                    }
                }
            }
        };
        this.emitScrollEvent = ($event) => {
            if (!this.loading) {
                this.scrollEventEmiter.emit($event);
            }
        };
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set loading(v) {
        this._loading = v;
        if (this.filter) {
            this.filter.loading = v;
        }
    }
    /**
     * @return {?}
     */
    get loading() {
        return this._loading;
    }
    /**
     * @return {?}
     */
    get filterGroups() {
        return this.filter ? this.filter.filterGroups : [];
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set endpoint(v) {
        if (this._endpoint !== v) {
            this._endpoint = (v[0] && v[0] === '/') ? v.replace('/', '') : v;
        }
    }
    /**
     * @return {?}
     */
    get endpoint() {
        return this._endpoint;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set name(v) {
        if (this._name !== v) {
            this._name = v;
            this.setFiltersComponentsBasePathAndNames();
        }
    }
    /**
     * @return {?}
     */
    get name() {
        return this._name;
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    set rows(rows) {
        this.setRows(rows);
    }
    /**
     * @return {?}
     */
    get rows() {
        return this.report ? this.report.result.rows : undefined;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set filter(v) {
        if (this._filter !== v) {
            this._filter = v;
            this.setFiltersComponentsBasePathAndNames();
        }
    }
    /**
     * @return {?}
     */
    get filter() {
        return this._filter;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.watchFilterData();
        this.ensureUniqueName();
        this.detectListModeBasedOnGridAndTablePresence();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.watchFilter();
        this.doFirstLoad();
        this.detectListMode();
        this.watchTabsChange();
        this.watchTableSort();
        this.registerChildWatchers();
        this.watchScroll();
        this.watchScrollEventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeToReactiveReport();
        this.stopWatchingScroll();
        this.stopWatchingFilter();
        this.stopWatchingTabsChange();
        this.stopWatchingTableSort();
        this.stopWatchingScrollEventEmitter();
    }
    /**
     * @return {?}
     */
    reloadCountReport() {
        if (this.filter && this.filter.filters && this.filter.loadCountReport) {
            const /** @type {?} */ endpoint = this.endpoint[this.endpoint.length - 1] === '/' ? `${this.endpoint}count` : `${this.endpoint}/count`;
            const /** @type {?} */ filters = this.filter.filters;
            const /** @type {?} */ payloadWithSearchableProperties = this.getCountableFilters(filters);
            this.service.post(endpoint, payloadWithSearchableProperties)
                .subscribe(res => {
                this.countReport = this.mountCountReport(res);
                this.filter.countReport = this.countReport;
            });
        }
    }
    /**
     * @param {?} id
     * @return {?}
     */
    removeItem(id) {
        const /** @type {?} */ item = this.rows.find(_item => _item.id === id);
        if (item) {
            const /** @type {?} */ itemIndex = this.rows.indexOf(item);
            if (itemIndex >= 0) {
                this.rows.splice(itemIndex, 1);
            }
        }
        if (this.endpoint) {
            this.reloadCountReport();
        }
    }
    /**
     * @return {?}
     */
    restart() {
        this.loadReport(true);
    }
    /**
     * @return {?}
     */
    showMore() {
        return this.loadReport();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    searchCollapsable(filter$$1) {
        if (this.selectedCollapsable !== filter$$1.uid) {
            this.loadByOpennedCollapse(filter$$1.uid);
        }
    }
    /**
     * @return {?}
     */
    tableAndGridAreSet() {
        return this.grid && this.table;
    }
    /**
     * @return {?}
     */
    toggleListMode() {
        this.listMode = this.listMode === 'grid' ? 'table' : 'grid';
        if (this.listMode === 'table') {
            setTimeout(() => {
                this.table.tableComponent.recalculate();
            }, 1);
        }
    }
    /**
     * @param {?} uid
     * @return {?}
     */
    getCollapsableCount(uid) {
        try {
            return this.countReport[this.selectedTab].children[uid].count;
        }
        catch (/** @type {?} */ error) {
            return '?';
        }
    }
    /**
     * @param {?} filtersCounters
     * @return {?}
     */
    mountCountReport(filtersCounters) {
        const /** @type {?} */ countReport = {
            count: 0
        };
        filtersCounters.forEach(item => {
            countReport[item.uid] = {
                count: item.count
            };
            if (item.children) {
                countReport[item.uid].children = this.mountCountReport(item.children);
            }
        });
        return countReport;
    }
    /**
     * @param {?} filters
     * @return {?}
     */
    getCountableFilters(filters) {
        const /** @type {?} */ filterGroupsWithoutTabs = this.filter.filterGroupsWithoutTabs || [{ filters: [] }];
        const /** @type {?} */ filtersPlusSearch = filters.map(decFilter => {
            const /** @type {?} */ decFilterFiltersPlusSearch = JSON.parse(JSON.stringify(decFilter));
            if (decFilterFiltersPlusSearch.filters) {
                const /** @type {?} */ tabFiltersCopy = JSON.parse(JSON.stringify(decFilterFiltersPlusSearch.filters));
                decFilterFiltersPlusSearch.filters = JSON.parse(JSON.stringify(filterGroupsWithoutTabs));
                decFilterFiltersPlusSearch.filters.forEach(filterGroup => {
                    filterGroup.filters.push(...tabFiltersCopy);
                });
            }
            else if (decFilterFiltersPlusSearch.children) {
                decFilterFiltersPlusSearch.children = this.getCountableFilters(decFilterFiltersPlusSearch.children);
            }
            return {
                uid: decFilterFiltersPlusSearch.uid,
                filters: decFilterFiltersPlusSearch.filters,
                children: decFilterFiltersPlusSearch.children,
            };
        });
        return this.ensureFilterValuesAsArray(filtersPlusSearch);
    }
    /**
     * @param {?=} filterGroups
     * @return {?}
     */
    ensureFilterValuesAsArray(filterGroups = []) {
        return filterGroups.map(decListFilter => {
            if (decListFilter.filters) {
                this.appendFilterGroupsBasedOnSearchableProperties(decListFilter.filters);
                decListFilter.filters = decListFilter.filters.map(filterGroup => {
                    filterGroup.filters = filterGroup.filters.map(filter$$1 => {
                        filter$$1.value = Array.isArray(filter$$1.value) ? filter$$1.value : [filter$$1.value];
                        return filter$$1;
                    });
                    return filterGroup;
                });
            }
            return decListFilter;
        });
    }
    /**
     * @return {?}
     */
    detectListMode() {
        this.getListMode();
    }
    /**
     * @return {?}
     */
    detectListModeBasedOnGridAndTablePresence() {
        this.listMode = this.listMode ? this.listMode : this.table ? 'table' : 'grid';
    }
    /**
     * @return {?}
     */
    isTabsFilterDefined() {
        return this.filter && this.filter.tabsFilterComponent;
    }
    /**
     * @return {?}
     */
    doFirstLoad() {
        if (this.isTabsFilterDefined()) {
            this.doFirstLoadByTabsFilter();
        }
        else {
            this.doFirstLoadLocally(true);
        }
    }
    /**
     * @return {?}
     */
    doFirstLoadByTabsFilter() {
        this.filter.tabsFilterComponent.doFirstLoad();
    }
    /**
     * @param {?} refresh
     * @return {?}
     */
    doFirstLoadLocally(refresh) {
        this.loadReport(refresh);
    }
    /**
     * @return {?}
     */
    ensureUniqueName() {
        if (!this.name) {
            const /** @type {?} */ error = 'ListComponentError: The list component must have an unique name to be used in url filter.'
                + ' Please, ensure that you have passed an unique namme to the component.';
            throw new Error(error);
        }
    }
    /**
     * @param {?} filterUid
     * @return {?}
     */
    loadByOpennedCollapse(filterUid) {
        const /** @type {?} */ filter$$1 = this.collapsableFilters.children.find(item => item.uid === filterUid);
        const /** @type {?} */ filterGroup = { filters: filter$$1.filters };
        this.loadReport(true, filterGroup);
        setTimeout(() => {
            this.selectedCollapsable = filter$$1.uid;
        }, 0);
    }
    /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilterGroups
     * @return {?}
     */
    loadReport(clearAndReloadReport, collapseFilterGroups) {
        return new Promise((res, rej) => {
            if (clearAndReloadReport && this.rows) {
                this.setRows(this.rows);
            }
            this.clearAndReloadReport = clearAndReloadReport;
            this.loading = true;
            if (this.endpoint) {
                this.mountPayload(clearAndReloadReport, collapseFilterGroups)
                    .then(payload => {
                    this.payload = payload;
                    this.filterData.next({ endpoint: this.endpoint, payload: this.payload, cbk: res, clear: clearAndReloadReport });
                });
            }
            else if (this.customFetchMethod) {
                this.filterData.next();
            }
            else if (!this.rows) {
                setTimeout(() => {
                    if (!this.rows) {
                        rej('No endpoint, customFetchMethod or rows set');
                    }
                    this.loading = false;
                }, 1);
            }
        });
    }
    /**
     * @param {?=} clearAndReloadReport
     * @param {?=} collapseFilterGroups
     * @return {?}
     */
    mountPayload(clearAndReloadReport = false, collapseFilterGroups) {
        return new Promise((resolve, reject) => {
            const /** @type {?} */ searchFilterGroups = this.filter ? this.filter.filterGroups : undefined;
            const /** @type {?} */ filterGroups = this.appendFilterGroupsToEachFilterGroup(searchFilterGroups, collapseFilterGroups);
            const /** @type {?} */ payload = {};
            payload.limit = this.limit;
            if (filterGroups) {
                payload.filterGroups = filterGroups;
            }
            if (this.columnsSortConfig) {
                payload.sort = this.columnsSortConfig;
            }
            if (!clearAndReloadReport && this.report) {
                payload.page = this.report.page + 1;
                payload.limit = this.report.limit;
            }
            resolve(payload);
        });
    }
    /**
     * @param {?} filterGroups
     * @param {?} filterGroupToAppend
     * @return {?}
     */
    appendFilterGroupsToEachFilterGroup(filterGroups, filterGroupToAppend) {
        if (filterGroupToAppend) {
            if (filterGroups && filterGroups.length > 0) {
                filterGroups.forEach(group => {
                    group.filters.push(...filterGroupToAppend.filters);
                });
            }
            else {
                filterGroups = [filterGroupToAppend];
            }
        }
        return filterGroups || [];
    }
    /**
     * @return {?}
     */
    setFiltersComponentsBasePathAndNames() {
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
    }
    /**
     * @param {?=} rows
     * @return {?}
     */
    setRows(rows = []) {
        this.report = {
            page: 1,
            result: {
                rows: rows,
                count: rows.length
            }
        };
        this.detectLastPage(rows, rows.length);
        this.updateContentChildren();
    }
    /**
     * @return {?}
     */
    watchScrollEventEmitter() {
        this.scrollEventEmiterSubscription = this.scrollEventEmiter
            .pipe(debounceTime(150), distinctUntilChanged()).subscribe(this.actByScrollPosition);
    }
    /**
     * @return {?}
     */
    stopWatchingScrollEventEmitter() {
        if (this.scrollEventEmiterSubscription) {
            this.scrollEventEmiterSubscription.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    watchFilterData() {
        this.reactiveReport = this.filterData
            .pipe(debounceTime(150), // avoid muiltiple request when the filter or tab change too fast
        // avoid muiltiple request when the filter or tab change too fast
        switchMap((filterData) => {
            const /** @type {?} */ observable = new BehaviorSubject(undefined);
            const /** @type {?} */ fetchMethod = this.customFetchMethod || this.service.get;
            const /** @type {?} */ endpoint = filterData ? filterData.endpoint : undefined;
            const /** @type {?} */ payloadWithSearchableProperties = this.getPayloadWithSearchTransformedIntoSearchableProperties(this.payload);
            if (filterData && filterData.clear) {
                this.setRows([]);
            }
            fetchMethod(endpoint, payloadWithSearchableProperties)
                .subscribe(res => {
                observable.next(res);
                if (filterData && filterData.cbk) {
                    setTimeout(() => {
                        // wait for subscribers to refresh their rows
                        filterData.cbk(new Promise((resolve, rej) => {
                            resolve(res);
                        }));
                    }, 1);
                }
                return res;
            });
            return observable;
        }));
        this.subscribeToReactiveReport();
    }
    /**
     * @param {?} payload
     * @return {?}
     */
    getPayloadWithSearchTransformedIntoSearchableProperties(payload) {
        const /** @type {?} */ payloadCopy = Object.assign({}, payload);
        if (payloadCopy.filterGroups && this.searchableProperties) {
            payloadCopy.filterGroups = [...payload.filterGroups];
            this.appendFilterGroupsBasedOnSearchableProperties(payloadCopy.filterGroups);
            return payloadCopy;
        }
        else {
            return this.payload;
        }
    }
    /**
     * @param {?} filterGroups
     * @return {?}
     */
    appendFilterGroupsBasedOnSearchableProperties(filterGroups) {
        const /** @type {?} */ filterGroupThatContainsBasicSearch = this.getFilterGroupThatContainsTheBasicSearch(filterGroups);
        if (filterGroupThatContainsBasicSearch) {
            this.removeFilterGroup(filterGroups, filterGroupThatContainsBasicSearch);
            const /** @type {?} */ basicSearch = filterGroupThatContainsBasicSearch.filters.find(filter$$1 => filter$$1.property === 'search');
            const /** @type {?} */ basicSearchIndex = filterGroupThatContainsBasicSearch.filters.indexOf(basicSearch);
            this.searchableProperties.forEach(property => {
                const /** @type {?} */ newFilterGroup = {
                    filters: [...filterGroupThatContainsBasicSearch.filters]
                };
                newFilterGroup.filters[basicSearchIndex] = {
                    property: property,
                    value: [basicSearch.value]
                };
                filterGroups.push(newFilterGroup);
            });
        }
    }
    /**
     * @param {?} filterGroups
     * @param {?} filterGroupThatContainsBasicSearch
     * @return {?}
     */
    removeFilterGroup(filterGroups, filterGroupThatContainsBasicSearch) {
        const /** @type {?} */ filterGroupThatContainsBasicSearchIndex = filterGroups.indexOf(filterGroupThatContainsBasicSearch);
        filterGroups.splice(filterGroupThatContainsBasicSearchIndex, 1);
    }
    /**
     * @param {?} filterGroups
     * @return {?}
     */
    getFilterGroupThatContainsTheBasicSearch(filterGroups) {
        return filterGroups.find(filterGroup => {
            const /** @type {?} */ basicSerchFilter = filterGroup.filters ? filterGroup.filters.find(filter$$1 => filter$$1.property === 'search') : undefined;
            return basicSerchFilter ? true : false;
        });
    }
    /**
     * @return {?}
     */
    subscribeToReactiveReport() {
        this.reactiveReportSubscription = this.reactiveReport
            .pipe(tap(res => {
            if (res) {
                this.loading = false;
            }
        }))
            .subscribe(data => {
            if (data && data.result && data.result.rows) {
                if (!this.clearAndReloadReport) {
                    data.result.rows = this.report.result.rows.concat(data.result.rows);
                }
                this.report = data;
                this.postSearch.emit(data);
                this.updateContentChildren();
                this.detectLastPage(data.result.rows, data.result.count);
            }
        });
    }
    /**
     * @param {?} rows
     * @param {?} count
     * @return {?}
     */
    detectLastPage(rows, count) {
        const /** @type {?} */ numberOfrows = rows.length;
        const /** @type {?} */ emptList = numberOfrows === 0;
        const /** @type {?} */ singlePageList = numberOfrows === count;
        this.isLastPage = emptList || singlePageList;
    }
    /**
     * @return {?}
     */
    unsubscribeToReactiveReport() {
        if (this.reactiveReportSubscription) {
            this.reactiveReportSubscription.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    updateContentChildren() {
        const /** @type {?} */ rows = this.endpoint ? this.report.result.rows : this.rows;
        if (this.grid) {
            this.grid.rows = rows;
        }
        if (this.table) {
            this.table.rows = rows;
        }
        if (this.filter) {
            this.filter.count = this.report.result.count;
        }
    }
    /**
     * @return {?}
     */
    registerChildWatchers() {
        if (this.grid) {
            this.watchGridRowClick();
        }
        if (this.table) {
            this.watchTableRowClick();
        }
    }
    /**
     * @return {?}
     */
    watchGridRowClick() {
        this.grid.rowClick.subscribe(($event) => {
            this.rowClick.emit($event);
        });
    }
    /**
     * @return {?}
     */
    watchTableRowClick() {
        this.table.rowClick.subscribe(($event) => {
            this.rowClick.emit($event);
        });
    }
    /**
     * @return {?}
     */
    watchFilter() {
        if (this.filter) {
            this.filterSubscription = this.filter.search.subscribe(event => {
                const /** @type {?} */ tabChanged = this.previousSelectedTab !== this.selectedTab;
                const /** @type {?} */ filterModeChanged = this.filterMode !== event.filterMode;
                if (tabChanged) {
                    this.previousSelectedTab = this.selectedTab;
                    this.setRows([]); // if changing tabs, clear the results before showing the rows because it is done only after fetching the data
                }
                if (filterModeChanged) {
                    this.filterMode = event.filterMode;
                }
                if (this.filterMode === 'tabs') {
                    this.selectedCollapsable = undefined;
                    this.collapsableFilters = undefined;
                    this.loadReport(true).then((res) => {
                        if (event.recount) {
                            this.reloadCountReport();
                        }
                    });
                }
                else {
                    if (!this.countReport || event.recount) {
                        this.reloadCountReport();
                    }
                    if (this.selectedCollapsable && !tabChanged) {
                        this.loadByOpennedCollapse(this.selectedCollapsable);
                    }
                    else {
                        this.selectedCollapsable = undefined;
                        this.collapsableFilters = {
                            tab: this.selectedTab,
                            children: event.children ? event.children : []
                        };
                    }
                }
            });
        }
    }
    /**
     * @return {?}
     */
    stopWatchingFilter() {
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    watchScroll() {
        setTimeout(() => {
            this.scrollableContainer = document.getElementsByClassName(this.scrollableContainerClass)[0];
            if (this.scrollableContainer) {
                this.scrollableContainer.addEventListener('scroll', this.emitScrollEvent, true);
            }
        }, 1);
    }
    /**
     * @return {?}
     */
    stopWatchingScroll() {
        if (this.scrollableContainer) {
            this.scrollableContainer.removeEventListener('scroll', this.emitScrollEvent, true);
        }
    }
    /**
     * @return {?}
     */
    watchTabsChange() {
        if (this.filter && this.filter.tabsFilterComponent) {
            this.selectedTab = this.filter.tabsFilterComponent.selectedTab;
            this.tabsChangeSubscription = this.filter.tabsFilterComponent.tabChange.subscribe(tab => {
                this.selectedTab = tab;
                this.detectListMode();
            });
        }
    }
    /**
     * @return {?}
     */
    stopWatchingTabsChange() {
        if (this.tabsChangeSubscription) {
            this.tabsChangeSubscription.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    watchTableSort() {
        if (this.table) {
            this.tableSortSubscription = this.table.sort.subscribe(columnsSortConfig => {
                if (this.columnsSortConfig !== columnsSortConfig) {
                    this.columnsSortConfig = columnsSortConfig;
                    if (this.collapsableFilters) {
                        this.loadByOpennedCollapse(this.selectedCollapsable);
                    }
                    else {
                        this.loadReport(true);
                    }
                }
            });
        }
    }
    /**
     * @return {?}
     */
    stopWatchingTableSort() {
        if (this.tableSortSubscription) {
            this.tableSortSubscription.unsubscribe();
        }
    }
}
DecListComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list',
                template: `<!-- COMPONENT LAYOUT -->
<div class="list-component-wrapper">
  <div *ngIf="filter">
    <ng-content select="dec-list-filter"></ng-content>
  </div>
  <div *ngIf="report || filterMode === 'collapse'">
    <div fxLayout="column" fxLayoutGap="16px">
      <div fxFlex class="text-right" *ngIf="tableAndGridAreSet()">
        <button type="button" mat-icon-button (click)="toggleListMode()">
          <mat-icon title="Switch to table mode" aria-label="Switch to table mode" color="primary" contrastFontWithBg *ngIf="listMode === 'grid'">view_headline</mat-icon>
          <mat-icon title="Switch to grid mode" aria-label="Switch to grid mode" color="primary" contrastFontWithBg *ngIf="listMode === 'table'">view_module</mat-icon>
        </button>
      </div>
      <div fxFlex>
        <div *ngIf="filterMode == 'collapse' then collapseTemplate else tabsTemplate"></div>
      </div>
    </div>
  </div>
</div>

<!-- GRID TEMPLATE -->
<ng-template #gridTemplate>
  <ng-content select="dec-list-grid"></ng-content>
</ng-template>

<!-- TABLE TEMPLATE -->
<ng-template #listTemplate>
  <ng-content select="dec-list-table"></ng-content>
</ng-template>

<!-- FOOTER TEMPLATE -->
<ng-template #footerTemplate>
  <ng-content select="dec-list-footer"></ng-content>
  <p class="list-footer">
    {{ 'label.amount-loaded-of-total' |
      translate:{
        loaded: report?.result?.rows?.length,
        total: report?.result?.count
      }
    }}
  </p>
</ng-template>

<!-- COLLAPSE TEMPLATE -->
<ng-template #tabsTemplate>
  <div fxLayout="column" fxLayoutGap="16px">
    <div *ngIf="listMode == 'grid' then gridTemplate else listTemplate"></div>
    <!-- FOOTER CONTENT -->
    <div fxFlex>
      <div *ngIf="showFooter && !loading then footerTemplate"></div>
    </div>
    <!-- LOADING SPINNER -->
    <div fxFlex *ngIf="loading" class="text-center loading-spinner-wrapper">
      <dec-spinner></dec-spinner>
    </div>
    <!-- LOAD MORE BUTTON -->
    <div fxFlex *ngIf="!isLastPage && !loading && !disableShowMoreButton" class="text-center">
      <button type="button" mat-raised-button (click)="showMore()">{{'label.show-more' | translate}}</button>
    </div>
  </div>
</ng-template>

<!-- COLLAPSE TEMPLATE -->
<ng-template #collapseTemplate>
  <mat-accordion>
    <ng-container *ngFor="let filter of collapsableFilters.children">
      <mat-expansion-panel (opened)="searchCollapsable(filter)">
        <mat-expansion-panel-header>
          <div class="collapse-title" fxLayout="row" fxLayoutGap="32px" fxLayoutAlign="left center">
            <div fxFlex="96px" *ngIf="countReport">
              <dec-label [colorHex]="filter.color">{{ getCollapsableCount(filter.uid) }}</dec-label>
            </div>
            {{ 'label.' + filter.label | translate }}
          </div>
        </mat-expansion-panel-header>
        <div *ngIf="selectedCollapsable === filter.uid">
          <ng-container [ngTemplateOutlet]="tabsTemplate"></ng-container>
        </div>
      </mat-expansion-panel>
    </ng-container>
  </mat-accordion>
  <div class="accordion-bottom-margin"></div>
</ng-template>

`,
                styles: [`.list-footer{font-size:14px;text-align:center}.list-component-wrapper{min-height:72px}.text-right{text-align:right}.loading-spinner-wrapper{padding:32px}.collapse-title{width:100%}.accordion-bottom-margin{margin-bottom:100px}`]
            },] },
];
/** @nocollapse */
DecListComponent.ctorParameters = () => [
    { type: DecApiService }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListTableModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListFooterComponent {
}
DecListFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-footer',
                template: `<ng-content></ng-content>
`,
                styles: [``]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListAdvancedFilterModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListActionsComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
DecListActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-actions',
                template: `<ng-content></ng-content>>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecListActionsComponent.ctorParameters = () => [];
DecListActionsComponent.propDecorators = {
    template: [{ type: ContentChild, args: [TemplateRef,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListActionsModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecListModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecPageForbidenComponent {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((e) => {
            this.previousUrl = document.referrer || e.url;
        });
    }
}
DecPageForbidenComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-page-forbiden',
                template: `<div class="page-forbiden-wrapper">
  <h1>{{'label.page-forbiden' | translate}}</h1>
  <p>{{'label.page-forbiden-help' | translate}}</p>
  <p><small>Ref: {{previousUrl}}</small></p>
  <img src="http://s3-sa-east-1.amazonaws.com/static-files-prod/platform/decora3.png">
</div>
`,
                styles: [`.page-forbiden-wrapper{padding-top:100px;text-align:center}img{width:100px}`]
            },] },
];
/** @nocollapse */
DecPageForbidenComponent.ctorParameters = () => [
    { type: Router }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecPageForbidenModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecPageNotFoundComponent {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
        router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((e) => {
            this.previousUrl = e.url;
        });
    }
}
DecPageNotFoundComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-page-not-found',
                template: `<div class="page-not-found-wrapper">
  <h1>{{'label.page-not-found' | translate}}</h1>
  <p>{{'label.page-not-found-help' | translate}}</p>
  <p>{{previousUrl}}</p>
  <img src="http://s3-sa-east-1.amazonaws.com/static-files-prod/platform/decora3.png">
</div>
`,
                styles: [`.page-not-found-wrapper{padding-top:100px;text-align:center}img{width:100px}`]
            },] },
];
/** @nocollapse */
DecPageNotFoundComponent.ctorParameters = () => [
    { type: Router }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecPageNotFoundModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ FALLBACK_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAALSURBVAjXY2BgAAAAAwABINWUxwAAAABJRU5' +
    'ErkJggg==';
const /** @type {?} */ LOADING_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIg' +
    'Y2xhc3M9InVpbC1yaW5nIj48cGF0aCBmaWxsPSJub25lIiBjbGFzcz0iYmsiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9IjQ1IiBzdHJva2UtZGFzaGFycmF5PSIyMjYuMTk1IDU2LjU0OSI' +
    'gc3Ryb2tlPSIjMjMyZTM4IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEwIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDc1IDc1OzE4MCA3NSA3NT' +
    'szNjAgNzUgNzU7IiBrZXlUaW1lcz0iMDswLjU7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwcyIvPjwvY2lyY2xlPjwvc3ZnPg==';
class DecProductSpinComponent {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
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
        this.markAsLoaded = (event) => {
            this.totalImagesLoaded++;
            if (this.totalImagesLoaded === this.scenesLen) {
                this.placeholderScene = this.scenes[0];
                this.loadingImages = false;
            }
        };
        this.goLeft = () => {
            if (this.scenes[this.frameShown - 1]) {
                this.frameShown--;
            }
            else if (this.looping) {
                this.frameShown = this.scenesLen - 1;
            }
        };
        this.goRight = () => {
            if (this.scenes[this.frameShown + 1]) {
                this.frameShown++;
            }
            else if (this.looping) {
                this.frameShown = 0;
            }
        };
        this.start = ($event) => {
            this.placeholderScene = LOADING_IMAGE;
            this.totalImagesLoaded = 0;
            this.loadingImages = true;
            this.started = true;
        };
        this.loaderPercentage = () => {
            return (this.scenesLen - this.totalImagesLoaded) > 0 ? ((100 / this.scenesLen) * this.totalImagesLoaded).toFixed(1) : 0;
        };
    }
    /**
     * @param {?} spin
     * @return {?}
     */
    set spin(spin) {
        if (spin) {
            const /** @type {?} */ scenes = this.loadScenes(spin);
            const /** @type {?} */ scenesChanged = !this.scenes || (scenes && this.scenes.join() !== scenes.join());
            if (scenesChanged) {
                this.resetScenesData(scenes);
                // this.resetStartPositionBasedOnCompany(spin, scenes);
            }
            this._spin = spin;
        }
    }
    /**
     * @return {?}
     */
    get spin() {
        return this._spin;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragStart(event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMousedown(event) {
        event.stopPropagation();
        this.mouseDown = true;
        this.lastMouseEvent = event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMousemove(event) {
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.frameShown = 0;
        this.renderer.listenGlobal('document', 'mouseup', (event) => {
            if (this.mouseDown) {
                this.mouseDown = false;
            }
        });
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onOpen($event) {
        this.open.emit($event);
    }
    /**
     * @param {?} spin
     * @param {?} scenes
     * @return {?}
     */
    resetStartPositionBasedOnCompany(spin, scenes) {
        this.startInCenter = spin.company.id === 100 ? true : false;
        this.startInCenter = this.startInCenter && scenes.length <= 16;
    }
    /**
     * @param {?} scenes
     * @return {?}
     */
    resetScenesData(scenes) {
        this.placeholderScene = scenes[0];
        this.scenesLen = scenes.length;
        this.scenes = scenes;
    }
    /**
     * @param {?} spin
     * @return {?}
     */
    loadScenes(spin) {
        try {
            const /** @type {?} */ scenes = this.getUrlsFromSysFiles(spin.data.shots);
            return scenes && scenes.length > 0 ? scenes : [FALLBACK_IMAGE];
        }
        catch (/** @type {?} */ error) {
            return [FALLBACK_IMAGE];
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    calculatePosition(event) {
        const /** @type {?} */ target = event['target'];
        if (this.containerWidth !== target.clientWidth) {
            this.containerWidth = target.clientWidth;
            this.interval = (this.containerWidth / this.scenesLen) / 1.6;
        }
        this.positionDiff = event.clientX - this.lastMouseEvent.clientX;
    }
    /**
     * @param {?} sysFiles
     * @return {?}
     */
    getUrlsFromSysFiles(sysFiles) {
        if (!sysFiles) {
            return;
        }
        else {
            return sysFiles.map(file => {
                return file.renderFile.fileUrl;
            });
        }
    }
}
DecProductSpinComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-product-spin',
                template: `<div class="product-spinner-wrapper" *ngIf="scenes">
  <div [ngSwitch]="loadingImages ? true : false">

    <div *ngSwitchCase="true" class="overlay">
      <!-- Loading spinner -->
      <div [ngStyle]="{'background-image':'url(' + loadingImage + ')'}">{{loaderPercentage()}}%</div>
    </div>

    <div *ngSwitchCase="false" class="overlay">

      <!-- Overlay over the image (hand icon) -->
      <img class="frame" *ngIf="!onlyModal" src="//s3-sa-east-1.amazonaws.com/static-files-prod/platform/drag-horizontally.png" alt="" (click)="onlyModal ? '' : start($event)">

    </div>

  </div>

  <div [ngSwitch]="started ? true : false">

    <div *ngSwitchCase="true" class="frame">
      <!-- Images -->
      <img *ngFor="let scene of scenes; let i = index;"
        [src]="scene"
        draggable="false"
        class="no-drag image-only"
        (load)="markAsLoaded($event)"
        [ngClass]="frameShown === i && !loadingImages ? 'current-scene' : 'next-scene'">

    </div>

    <div *ngSwitchCase="false" class="frame">

      <!-- Placeholder image -->
      <img
        [src]="scenes[frameShown]"
        draggable="false"
        class="no-drag"
        (click)="onlyModal ? onOpen($event) : start($event)"
        [ngClass]="{'image-only': onlyModal}">

      <!-- Loading spinner -->
      <button
      *ngIf="showOpenDialogButton && !onlyModal"
      mat-icon-button
      (click)="onOpen($event)"
      [matTooltip]="'label.open' | translate"
      class="dialog-button"
      type="button"
      color="default">
        <mat-icon aria-label="Swap between Reference and Render images" color="primary" contrastFontWithBg >fullscreen</mat-icon>
      </button>

    </div>

  </div>
</div>
`,
                styles: [`.product-spinner-wrapper{display:block;position:relative}.product-spinner-wrapper:hover .frame{opacity:1}.product-spinner-wrapper:hover .overlay{display:none}.product-spinner-wrapper .frame{display:block;width:100%;background-size:contain;background-repeat:no-repeat;background-position:center center;opacity:.5;transition:opacity .3s ease;cursor:move}.product-spinner-wrapper .frame.image-only{opacity:1;cursor:pointer}.product-spinner-wrapper .frame .current-scene{display:block}.product-spinner-wrapper .frame .next-scene{display:none}.product-spinner-wrapper .frame img{width:100%}.product-spinner-wrapper .overlay{position:absolute;padding:10px;width:20%;margin-left:40%;margin-top:40%;z-index:1;opacity:.4;transition:opacity .2s ease}.product-spinner-wrapper .frame.loader{width:50%;margin:auto}.product-spinner-wrapper .dialog-button{position:absolute;top:0;right:0}.product-spinner-wrapper .loader-percentage{position:relative;top:47%;width:100%;text-align:center;opacity:.5}`]
            },] },
];
/** @nocollapse */
DecProductSpinComponent.ctorParameters = () => [
    { type: Renderer }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecProductSpinModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSidenavToolbarTitleComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
DecSidenavToolbarTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-toolbar-title',
                template: `<div [routerLink]="routerLink" class="dec-sidenav-toolbar-title">
  <ng-content></ng-content>
</div>
`,
                styles: [`.dec-sidenav-toolbar-title{outline:0}`]
            },] },
];
/** @nocollapse */
DecSidenavToolbarTitleComponent.ctorParameters = () => [];
DecSidenavToolbarTitleComponent.propDecorators = {
    routerLink: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSidenavToolbarComponent {
    constructor() {
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
    ngAfterViewInit() {
        setTimeout(() => {
            this.initialized = true;
        }, 1);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
}
DecSidenavToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-toolbar',
                template: `<mat-toolbar [color]="color" *ngIf="initialized" class="dec-sidenav-toolbar">

  <span class="items-icon item-left" *ngIf="leftMenuTriggerVisible" (click)="toggleLeftMenu.emit()">
    &#9776;
  </span>

  <span *ngIf="customTitle">
    <ng-content select="dec-sidenav-toolbar-title"></ng-content>
  </span>

  <div class="ribbon {{ribbon}}" *ngIf="notProduction">
    <span>{{label | translate}}</span>
  </div>

  <span class="dec-sidenav-toolbar-custom-content">
    <ng-content></ng-content>
  </span>

  <span class="items-spacer"></span>

  <span class="items-icon item-right" *ngIf="rightMenuTriggerVisible" (click)="toggleRightMenu.emit()">
    &#9776;
  </span>

</mat-toolbar>
`,
                styles: [`.items-spacer{flex:1 1 auto}.items-icon{cursor:pointer;-webkit-transform:scale(1.2,.8);transform:scale(1.2,.8)}.items-icon.item-right{padding-left:14px}.items-icon.item-left{padding-right:14px}.dec-sidenav-toolbar-custom-content{padding:0 16px;width:100%}.ribbon{transition:all .3s ease;text-transform:lowercase;text-align:center;position:relative;line-height:64px;margin-left:4px;padding:0 20px;height:64px;width:155px;color:#fff;left:20px;top:0}.ribbon.ribbon-hidden{display:none}.ribbon::before{content:'';position:fixed;width:100vw;height:4px;z-index:2;top:64px;left:0}@media screen and (max-width:599px){.ribbon::before{top:56px}}`]
            },] },
];
/** @nocollapse */
DecSidenavToolbarComponent.ctorParameters = () => [];
DecSidenavToolbarComponent.propDecorators = {
    color: [{ type: Input }],
    environment: [{ type: Input }],
    leftMenuTriggerVisible: [{ type: Input }],
    rightMenuTriggerVisible: [{ type: Input }],
    toggleLeftMenu: [{ type: Output }],
    toggleRightMenu: [{ type: Output }],
    customTitle: [{ type: ContentChild, args: [DecSidenavToolbarTitleComponent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSidenavMenuItemComponent {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
        this.toggle = new EventEmitter();
        this.showSubmenu = false;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout(() => {
            this.started = true;
        }, 1);
    }
    /**
     * @return {?}
     */
    get subitems() {
        const /** @type {?} */ subitems = this._subitems.toArray();
        subitems.splice(0, 1); // removes itself
        return subitems;
    }
    /**
     * @return {?}
     */
    toggleSubmenu() {
        this.showSubmenu = !this.showSubmenu;
        this.toggle.emit(this.showSubmenu);
    }
    /**
     * @return {?}
     */
    closeSubmenu() {
        this.showSubmenu = false;
    }
    /**
     * @return {?}
     */
    openLink() {
        if (this.routerLink) {
            if (typeof this.routerLink === 'string') {
                const /** @type {?} */ isNaked = this.routerLink.startsWith('//');
                const /** @type {?} */ isHttp = this.routerLink.startsWith('http://');
                const /** @type {?} */ isHttps = this.routerLink.startsWith('https://');
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
    }
    /**
     * @param {?} treeLevel
     * @return {?}
     */
    getBackground(treeLevel) {
        return this.checkIfActive() ? 'mat-list-item-active' : 'mat-list-item-' + treeLevel;
    }
    /**
     * @return {?}
     */
    checkIfActive() {
        if (this.isActive) {
            return true;
        }
        else if (this.showSubmenu) {
            return false;
        }
        else {
            const /** @type {?} */ hasActiveChild = this.hasActiveChild;
            return hasActiveChild;
        }
    }
    /**
     * @return {?}
     */
    get hasActiveChild() {
        if (!this.subitems) {
            return false;
        }
        else {
            return this.subitems.reduce((lastValue, item) => {
                return lastValue || item.isActive || item.hasActiveChild;
            }, false);
        }
    }
    /**
     * @return {?}
     */
    get isActive() {
        return this.routerLink === window.location.pathname;
    }
}
DecSidenavMenuItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-menu-item',
                template: `<ng-template let-treeLevel="treeLevel" #template>

  <mat-list-item class="click dec-sidenav-menu-item"
  (click)="subitems.length ? toggleSubmenu() : openLink()"
  [ngClass]="getBackground(treeLevel)">

    <div class="item-wrapper">

      <div [ngStyle]="{paddingLeft: treeLevel * 16 + 'px'}" class="item-content">
        <ng-content></ng-content>
      </div>

      <div *ngIf="subitems.length" class="text-right">
        <ng-container [ngSwitch]="showSubmenu">
          <span *ngSwitchCase="true"><i class="arrow down"></i></span>
          <span *ngSwitchCase="false"><i class="arrow right"></i></span>
        </ng-container>
      </div>
    </div>

  </mat-list-item>

  <div class="subitem-menu" *ngIf="showSubmenu">

    <dec-sidenav-menu [items]="subitems" [treeLevel]="treeLevel"></dec-sidenav-menu>

  </div>

</ng-template>
`,
                styles: [`.dec-sidenav-menu-item{height:56px!important;outline:0}.dec-sidenav-menu-item .item-wrapper{width:100%;display:flex;flex-flow:row no-wrap;justify-content:space-between}.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep .mat-icon,.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep i{vertical-align:middle;margin-bottom:5px;margin-right:8px}.dec-sidenav-menu-item .item-wrapper .arrow{margin-bottom:-4px}.dec-sidenav-menu-item .item-wrapper .arrow.right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.dec-sidenav-menu-item .item-wrapper .arrow.left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.dec-sidenav-menu-item .item-wrapper .arrow.up{transform:rotate(-135deg);-webkit-transform:rotate(-135deg)}.dec-sidenav-menu-item .item-wrapper .arrow.down{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.dec-sidenav-menu-item .text-right{text-align:right}.dec-sidenav-menu-item .click{cursor:pointer}.dec-sidenav-menu-item i{border:solid #000;border-width:0 2px 2px 0;display:inline-block;padding:4px}`]
            },] },
];
/** @nocollapse */
DecSidenavMenuItemComponent.ctorParameters = () => [
    { type: Router }
];
DecSidenavMenuItemComponent.propDecorators = {
    routerLink: [{ type: Input }],
    template: [{ type: ViewChild, args: [TemplateRef,] }],
    _subitems: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
    toggle: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSidenavMenuTitleComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
DecSidenavMenuTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-menu-title',
                template: `<ng-content></ng-content>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecSidenavMenuTitleComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ STORAGE_DOMAIN = 'decSidenavConfig';
class DecSidenavService {
    constructor() { }
    /**
     * @param {?} name
     * @param {?} visibility
     * @return {?}
     */
    setSidenavVisibility(name, visibility) {
        const /** @type {?} */ config = this.getSidenavConfig();
        config[name] = visibility;
        this.setSidenavConfig(config);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getSidenavVisibility(name) {
        const /** @type {?} */ config = this.getSidenavConfig();
        return config[name];
    }
    /**
     * @param {?} conf
     * @return {?}
     */
    setSidenavConfig(conf) {
        const /** @type {?} */ confString = JSON.stringify(conf);
        localStorage.setItem(STORAGE_DOMAIN, confString);
    }
    /**
     * @return {?}
     */
    getSidenavConfig() {
        const /** @type {?} */ data = localStorage.getItem(STORAGE_DOMAIN);
        if (data) {
            return JSON.parse(data);
        }
        else {
            const /** @type {?} */ newConfig = {};
            this.setSidenavConfig(newConfig);
            return newConfig;
        }
    }
}
DecSidenavService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecSidenavService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSidenavMenuLeftComponent {
    /**
     * @param {?} decSidenavService
     */
    constructor(decSidenavService) {
        this.decSidenavService = decSidenavService;
        this.leftMenuVisible = new BehaviorSubject(true);
        this.leftMenuMode = new BehaviorSubject('side');
        this.openedChange = new EventEmitter();
        this.modeChange = new EventEmitter();
        this.itemSubscriptions = [];
        this.subscribeAndExposeSidenavEvents();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set open(v) {
        const /** @type {?} */ currentValue = this.leftMenuVisible.value;
        if (v !== currentValue) {
            this.leftMenuVisible.next(v);
            this.decSidenavService.setSidenavVisibility('leftMenuHidden', !v);
        }
    }
    /**
     * @return {?}
     */
    get open() {
        return this.leftMenuVisible.value;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set mode(v) {
        const /** @type {?} */ currentValue = this.leftMenuMode.value;
        if (v !== currentValue) {
            this.leftMenuMode.next(v);
        }
    }
    /**
     * @return {?}
     */
    get mode() {
        return this.leftMenuMode.value;
    }
    /**
     * @return {?}
     */
    subscribeAndExposeSidenavEvents() {
        this.leftMenuVisible.subscribe(value => {
            this.openedChange.emit(value);
        });
        this.leftMenuMode.subscribe(value => {
            this.modeChange.emit(value);
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const /** @type {?} */ items = this.items.toArray();
        items.forEach((item) => {
            item.toggle.subscribe(state => {
                if (state) {
                    this.closeBrothers(item);
                }
            });
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.itemSubscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
    /**
     * @param {?} itemSelected
     * @return {?}
     */
    closeBrothers(itemSelected) {
        const /** @type {?} */ items = this.items.toArray();
        items.forEach((item) => {
            if (itemSelected !== item) {
                item.closeSubmenu();
            }
        });
    }
}
DecSidenavMenuLeftComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-menu-left',
                template: `<ng-container *ngIf="customTitle">
  <div class="menu-title">
    <ng-content select="dec-dec-sidenav-menu-title"></ng-content>
  </div>
</ng-container>

<ng-container *ngIf="items">
  <dec-sidenav-menu [items]="items.toArray()"></dec-sidenav-menu>
</ng-container>`,
                styles: [`.menu-title{padding:16px;font-size:24px;font-weight:700}`]
            },] },
];
/** @nocollapse */
DecSidenavMenuLeftComponent.ctorParameters = () => [
    { type: DecSidenavService }
];
DecSidenavMenuLeftComponent.propDecorators = {
    open: [{ type: Input }],
    mode: [{ type: Input }],
    persistVisibilityMode: [{ type: Input }],
    items: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
    customTitle: [{ type: ContentChild, args: [DecSidenavMenuTitleComponent,] }],
    openedChange: [{ type: Output }],
    modeChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSidenavMenuRightComponent {
    /**
     * @param {?} decSidenavService
     */
    constructor(decSidenavService) {
        this.decSidenavService = decSidenavService;
        this.rightMenuVisible = new BehaviorSubject(true);
        this.rightMenuMode = new BehaviorSubject('side');
        this.openedChange = new EventEmitter();
        this.modeChange = new EventEmitter();
        this.itemSubscriptions = [];
        this.subscribeAndExposeSidenavEvents();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set open(v) {
        const /** @type {?} */ currentValue = this.rightMenuVisible.value;
        if (v !== currentValue) {
            this.rightMenuVisible.next(v);
            this.decSidenavService.setSidenavVisibility('rightMenuHidden', !v);
        }
    }
    /**
     * @return {?}
     */
    get open() {
        return this.rightMenuVisible.value;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set mode(v) {
        const /** @type {?} */ currentValue = this.rightMenuMode.value;
        if (v !== currentValue) {
            this.rightMenuMode.next(v);
        }
    }
    /**
     * @return {?}
     */
    get mode() {
        return this.rightMenuMode.value;
    }
    /**
     * @return {?}
     */
    subscribeAndExposeSidenavEvents() {
        this.rightMenuVisible.subscribe(value => {
            this.openedChange.emit(value);
        });
        this.rightMenuMode.subscribe(value => {
            this.modeChange.emit(value);
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const /** @type {?} */ items = this.items.toArray();
        items.forEach((item) => {
            item.toggle.subscribe(state => {
                if (state) {
                    this.closeBrothers(item);
                }
            });
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.itemSubscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
    /**
     * @param {?} itemSelected
     * @return {?}
     */
    closeBrothers(itemSelected) {
        const /** @type {?} */ items = this.items.toArray();
        items.forEach((item) => {
            if (itemSelected !== item) {
                item.closeSubmenu();
            }
        });
    }
}
DecSidenavMenuRightComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-menu-right',
                template: `<ng-container *ngIf="customTitle">
  <div class="menu-title">
    <ng-content select="dec-dec-sidenav-menu-title"></ng-content>
  </div>
</ng-container>

<ng-container *ngIf="items">
  <dec-sidenav-menu [items]="items.toArray()"></dec-sidenav-menu>
</ng-container>`,
                styles: [`.menu-title{padding:16px;font-size:24px;font-weight:700}`]
            },] },
];
/** @nocollapse */
DecSidenavMenuRightComponent.ctorParameters = () => [
    { type: DecSidenavService }
];
DecSidenavMenuRightComponent.propDecorators = {
    open: [{ type: Input }],
    mode: [{ type: Input }],
    persistVisibilityMode: [{ type: Input }],
    items: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
    customTitle: [{ type: ContentChild, args: [DecSidenavMenuTitleComponent,] }],
    openedChange: [{ type: Output }],
    modeChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSidenavComponent {
    /**
     * @param {?} decSidenavService
     */
    constructor(decSidenavService) {
        this.decSidenavService = decSidenavService;
        this.progressBarVisible = new BehaviorSubject(false);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set leftMenu(v) {
        this._leftMenu = v;
        if (v) {
            this.setInitialLeftMenuVisibilityModes();
        }
    }
    /**
     * @return {?}
     */
    get leftMenu() {
        return this._leftMenu;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set rightMenu(v) {
        this._rightMenu = v;
        if (v) {
            this.setInitialRightMenuVisibilityModes();
        }
    }
    /**
     * @return {?}
     */
    get rightMenu() {
        return this._rightMenu;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set loading(v) {
        const /** @type {?} */ currentValue = this.progressBarVisible.value;
        if (v !== currentValue) {
            this.progressBarVisible.next(v);
        }
    }
    /**
     * @return {?}
     */
    get loading() {
        return this.progressBarVisible.value;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.detectAndShowChildComponents();
        this.subscribeToToolbarEvents();
    }
    /**
     * @return {?}
     */
    openBothMenus() {
        this.openLeftMenu();
        this.openRightMenu();
    }
    /**
     * @return {?}
     */
    openLeftMenu() {
        this.leftMenu.leftMenuVisible.next(true);
    }
    /**
     * @return {?}
     */
    openRightMenu() {
        this.rightMenu.rightMenuVisible.next(true);
    }
    /**
     * @return {?}
     */
    closeBothMenus() {
        this.closeLeftMenu();
        this.closeRightMenu();
    }
    /**
     * @return {?}
     */
    closeLeftMenu() {
        this.leftMenu.leftMenuVisible.next(false);
    }
    /**
     * @return {?}
     */
    closeRightMenu() {
        this.rightMenu.rightMenuVisible.next(false);
    }
    /**
     * @return {?}
     */
    toggleBothMenus() {
        this.toggleLeftMenu();
        this.toggleRightMenu();
    }
    /**
     * @return {?}
     */
    toggleLeftMenu() {
        this.leftMenu.open = !this.leftMenu.leftMenuVisible.value;
    }
    /**
     * @return {?}
     */
    toggleRightMenu() {
        this.rightMenu.open = !this.rightMenu.rightMenuVisible.value;
    }
    /**
     * @param {?=} mode
     * @return {?}
     */
    setBothMenusMode(mode = 'side') {
        this.setLeftMenuMode(mode);
        this.setRightMenuMode(mode);
    }
    /**
     * @param {?=} mode
     * @return {?}
     */
    setLeftMenuMode(mode = 'side') {
        this.leftMenu.leftMenuMode.next(mode);
    }
    /**
     * @param {?=} mode
     * @return {?}
     */
    setRightMenuMode(mode = 'side') {
        this.rightMenu.rightMenuMode.next(mode);
    }
    /**
     * @return {?}
     */
    toggleProgressBar() {
        this.loading = !this.progressBarVisible.value;
    }
    /**
     * @return {?}
     */
    showProgressBar() {
        this.progressBarVisible.next(true);
    }
    /**
     * @return {?}
     */
    hideProgressBar() {
        this.progressBarVisible.next(false);
    }
    /**
     * @param {?} openedStatus
     * @return {?}
     */
    leftSidenavOpenedChange(openedStatus) {
        this.leftMenu.open = openedStatus;
        this.leftMenu.leftMenuVisible.next(openedStatus);
    }
    /**
     * @param {?} openedStatus
     * @return {?}
     */
    rightSidenavOpenedChange(openedStatus) {
        this.rightMenu.open = openedStatus;
        this.rightMenu.rightMenuVisible.next(openedStatus);
    }
    /**
     * @return {?}
     */
    detectAndShowChildComponents() {
        this.toolbar.leftMenuTriggerVisible = this.leftMenu ? true : false;
        this.toolbar.rightMenuTriggerVisible = this.rightMenu ? true : false;
    }
    /**
     * @return {?}
     */
    subscribeToToolbarEvents() {
        if (this.toolbar) {
            this.toolbar.toggleLeftMenu.subscribe(() => {
                this.leftSidenav.toggle();
            });
            this.toolbar.toggleRightMenu.subscribe(() => {
                this.rightSidenav.toggle();
            });
        }
    }
    /**
     * @return {?}
     */
    setInitialRightMenuVisibilityModes() {
        this.rightMenu.rightMenuVisible.next(!this.decSidenavService.getSidenavVisibility('rightMenuHidden'));
    }
    /**
     * @return {?}
     */
    setInitialLeftMenuVisibilityModes() {
        this.leftMenu.leftMenuVisible.next(!this.decSidenavService.getSidenavVisibility('leftMenuHidden'));
    }
}
DecSidenavComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav',
                template: `<div class="dec-sidenav-wraper">
  <!-- TOOLBAR -->
  <div *ngIf="toolbar" class="dec-sidenav-toolbar-wrapper" [ngClass]="{'full-screen': !(leftMenu.leftMenuVisible | async)}">
    <ng-content select="dec-sidenav-toolbar"></ng-content>
  </div>
  <!-- / TOOLBAR -->

  <!-- PROGRESS BAR -->
  <div class="progress-bar-wrapper" *ngIf="progressBarVisible | async">
    <mat-progress-bar mode="indeterminate" color="accent"></mat-progress-bar>
  </div>
  <!-- / PROGRESS BAR -->

  <mat-sidenav-container [ngClass]="{'with-toolbar': toolbar, 'full-screen': !(leftMenu.leftMenuVisible | async)}">

    <!-- LEFT MENU -->
    <mat-sidenav *ngIf="leftMenu"
    [mode]="leftMenu.leftMenuMode | async"
    [opened]="leftMenu.leftMenuVisible | async"
    position="start"
    (openedChange)="leftSidenavOpenedChange($event)"
    #leftSidenav>
      <ng-content select="dec-sidenav-menu-left"></ng-content>
    </mat-sidenav>
    <!-- / LEFT MENU -->

    <!-- CONTENT -->
    <ng-content select="dec-sidenav-content"></ng-content>
    <!-- / CONTENT -->

    <!-- RIGHT MENU -->
    <mat-sidenav *ngIf="rightMenu"
    [mode]="rightMenu.rightMenuMode | async"
    [opened]="rightMenu.rightMenuVisible | async"
    position="end"
    (openedChange)="rightSidenavOpenedChange($event)"
    #rightSidenav>
      <ng-content select="dec-sidenav-menu-right"></ng-content>
    </mat-sidenav>
    <!-- / RIGHT MENU -->

  </mat-sidenav-container>

</div>
`,
                styles: [`.dec-sidenav-wraper .dec-sidenav-toolbar-wrapper{min-width:1200px}.dec-sidenav-wraper .dec-sidenav-toolbar-wrapper.full-screen{min-width:944px}.dec-sidenav-wraper .mat-sidenav-container{min-width:1200px;height:100vh}.dec-sidenav-wraper .mat-sidenav-container.full-screen{min-width:944px}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 64px)}.dec-sidenav-wraper .mat-sidenav-container .mat-sidenav{width:256px}.dec-sidenav-wraper .progress-bar-wrapper{position:fixed;top:60px;left:0;width:100%}@media screen and (max-width:1199px){.dec-sidenav-wraper .mat-sidenav-container{height:calc(100vh - 16px)}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 80px)}}`]
            },] },
];
/** @nocollapse */
DecSidenavComponent.ctorParameters = () => [
    { type: DecSidenavService }
];
DecSidenavComponent.propDecorators = {
    toolbar: [{ type: ContentChild, args: [DecSidenavToolbarComponent,] }],
    leftMenu: [{ type: ContentChild, args: [DecSidenavMenuLeftComponent,] }],
    rightMenu: [{ type: ContentChild, args: [DecSidenavMenuRightComponent,] }],
    leftSidenav: [{ type: ViewChild, args: ['leftSidenav',] }],
    rightSidenav: [{ type: ViewChild, args: ['rightSidenav',] }],
    loading: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSidenavContentComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
DecSidenavContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-content',
                template: `<div class="dec-sidenav-content-wrapper">
  <ng-content></ng-content>
</div>
`,
                styles: [`.dec-sidenav-content-wrapper{padding:32px}`]
            },] },
];
/** @nocollapse */
DecSidenavContentComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSidenavMenuComponent {
    constructor() {
        this.items = [];
        this.treeLevel = -1;
    }
}
DecSidenavMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-menu',
                template: `<mat-list>
  <ng-container *ngFor="let item of items">
    <ng-container *ngIf="item.started && item.template ? true : false">
      <ng-template
      [ngTemplateOutlet]="item.template"
      [ngTemplateOutletContext]="{treeLevel: treeLevel + 1}"
      ></ng-template>
    </ng-container>
  </ng-container>
</mat-list>
`,
                styles: [`.mat-list{padding-top:0}`]
            },] },
];
/** @nocollapse */
DecSidenavMenuComponent.ctorParameters = () => [];
DecSidenavMenuComponent.propDecorators = {
    items: [{ type: Input }],
    treeLevel: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSidenavModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
window['decoraScriptService'] = window['decoraScriptService'] || {};
class DecScriptLoaderService {
    constructor() { }
    /**
     * @param {?} url
     * @param {?} scriptName
     * @return {?}
     */
    load(url, scriptName) {
        return new Promise((resolve, reject) => {
            const /** @type {?} */ scriptLoaded = window['decoraScriptService'][scriptName];
            if (scriptLoaded) {
                const /** @type {?} */ script = window[scriptName];
                resolve(script);
            }
            else {
                const /** @type {?} */ scriptTag = document.createElement('script');
                scriptTag.setAttribute('src', url);
                scriptTag.setAttribute('type', 'text/javascript');
                scriptTag.onload = function () {
                    window['decoraScriptService'][scriptName] = true;
                    const /** @type {?} */ script = window[scriptName];
                    resolve(script);
                };
                scriptTag.onerror = reject;
                document.getElementsByTagName('head')[0].appendChild(scriptTag);
            }
        });
    }
    ;
    /**
     * @param {?} url
     * @return {?}
     */
    loadStyle(url) {
        return new Promise((resolve, reject) => {
            window['scriptServiceLoadedStylesArray'] = window['scriptServiceLoadedStylesArray'] || {};
            const /** @type {?} */ styleLoaded = window['scriptServiceLoadedStylesArray'][url];
            if (styleLoaded) {
                resolve();
            }
            else {
                const /** @type {?} */ linkTag = document.createElement('link');
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
    }
    ;
    /**
     * @param {?} styleUrl
     * @param {?} scriptUrl
     * @param {?} scriptNamespace
     * @return {?}
     */
    loadStyleAndScript(styleUrl, scriptUrl, scriptNamespace) {
        return this.loadStyle(styleUrl).then(() => {
            return this.load(scriptUrl, scriptNamespace);
        });
    }
    /**
     * @return {?}
     */
    loadLeafletScriptsAndStyle() {
        return this.loadStyle('https://unpkg.com/leaflet@1.3.3/dist/leaflet.css').then(() => {
            return this.loadStyle('http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css').then(() => {
                return this.loadStyle('https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css').then(() => {
                    return this.load('https://unpkg.com/leaflet@1.3.3/dist/leaflet.js', 'Leaflet').then(() => {
                        return this.load('https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.js', 'EasyButton').then(() => {
                        });
                    });
                });
            });
        });
    }
}
DecScriptLoaderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
DecScriptLoaderService.ctorParameters = () => [];
/** @nocollapse */ DecScriptLoaderService.ngInjectableDef = defineInjectable({ factory: function DecScriptLoaderService_Factory() { return new DecScriptLoaderService(); }, token: DecScriptLoaderService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ SKETCHFAB_SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js';
class DecSketchfabViewComponent {
    /**
     * @param {?} decScriptLoaderService
     */
    constructor(decScriptLoaderService) {
        this.decScriptLoaderService = decScriptLoaderService;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    set sketchfabId(id) {
        if (id) {
            this._sketchfabId = id;
            this.startSketchfab(id);
        }
    }
    /**
     * @return {?}
     */
    get sketchfabId() {
        return this._sketchfabId;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} id
     * @return {?}
     */
    startSketchfab(id) {
        this.decScriptLoaderService.load(SKETCHFAB_SCRIPT_URL, 'Sketchfab')
            .then((Sketchfab) => {
            const /** @type {?} */ iframe = this.apiFrame.nativeElement;
            const /** @type {?} */ client = new Sketchfab('1.0.0', iframe);
            client.init(this.sketchfabId, {
                success: function onSuccess(api) {
                    api.start();
                    api.addEventListener('viewerready', () => { });
                }
            });
        });
    }
}
DecSketchfabViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sketchfab-view',
                template: `<iframe src="" 
  #apiFrame 
  id="api-frame" 
  height="620"
  width="620" 
  allowfullscreen 
  mozallowfullscreen="true" 
  webkitallowfullscreen="true"></iframe>`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecSketchfabViewComponent.ctorParameters = () => [
    { type: DecScriptLoaderService }
];
DecSketchfabViewComponent.propDecorators = {
    sketchfabId: [{ type: Input }],
    apiFrame: [{ type: ViewChild, args: ['apiFrame',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecScriptLoaderModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecSketchfabViewModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecStepsListComponent {
    constructor() {
        this.icon = 'history';
        this.title = '';
        this.stepsList = [];
    }
}
DecStepsListComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-steps-list',
                template: `<div class="history-container" [ngClass]="{'limited-height': maxHeight}" [style.maxHeight]="maxHeight || '100%'">

  <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px" class="dec-color-grey-dark">

    <mat-icon fxFlex="24px">{{icon}}</mat-icon>

    <span class="bigger-font">{{ title }}</span>

  </div>

  <br>

  <div fxLayout="column" fxLayoutGap="16px">

    <div class="history-item" *ngFor="let item of stepsList; let i = index">

      <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="left start" class="dec-color-grey">

        <mat-icon class="smaller-icon dec-color-grey-dark" fxFlex="24px">{{ i === stepsList.length - 1 ? 'radio_button_unchecked' : 'lens' }}</mat-icon>

        <div fxLayout="column" fxLayoutGap="4px">

          <div>

            <strong *ngIf="item.title">{{ item.title }}</strong>

            <span *ngIf="item.date">
              {{ item.date | date }}
              <span *ngIf="showTime"> | {{ item.date | date: 'mediumTime' }}</span>
            </span>

          </div>

          <div *ngIf="item.description" class="dec-color-grey-dark">
            <strong class="dec-color-black">{{ item.description }}</strong>
          </div>

        </div>

      </div>

    </div>

  </div>


</div>
`,
                styles: [`.mat-tab-body-content{padding:16px 0}.mat-form-field-prefix{margin-right:8px!important}.mat-form-field-suffix{margin-left:8px!important}.mat-elevation-z0{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mat-elevation-z1{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.mat-elevation-z2{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.mat-elevation-z3{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.mat-elevation-z4{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mat-elevation-z5{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}.mat-elevation-z6{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.mat-elevation-z7{box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}.mat-elevation-z8{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-elevation-z9{box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}.mat-elevation-z10{box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}.mat-elevation-z11{box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}.mat-elevation-z12{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-elevation-z13{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}.mat-elevation-z14{box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}.mat-elevation-z15{box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}.mat-elevation-z16{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-elevation-z17{box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}.mat-elevation-z18{box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}.mat-elevation-z19{box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}.mat-elevation-z20{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}.mat-elevation-z21{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}.mat-elevation-z22{box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}.mat-elevation-z23{box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}.mat-elevation-z24{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,"Helvetica Neue",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,"Helvetica Neue",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,"Helvetica Neue",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,"Helvetica Neue",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,"Helvetica Neue",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,"Helvetica Neue",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,"Helvetica Neue",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,"Helvetica Neue",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:16px;font-weight:400}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-card-title{font-size:24px;font-weight:400}.mat-card-content,.mat-card-header .mat-card-title,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:13px;line-height:18px}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif}.mat-expansion-panel-header{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-form-field{width:100%;font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,"Helvetica Neue",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-outline{bottom:1.34375em}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:16px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font:400 14px/20px Roboto,"Helvetica Neue",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,"Helvetica Neue",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:9px;padding-bottom:9px}.mat-list-item,.mat-list-option{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{font-size:16px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line,.mat-selection-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{font-size:16px}.mat-list .mat-list-option .mat-line,.mat-nav-list .mat-list-option .mat-line,.mat-selection-list .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px;font-weight:500}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-item{font-size:12px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line,.mat-selection-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option{font-size:12px}.mat-list[dense] .mat-list-option .mat-line,.mat-nav-list[dense] .mat-list-option .mat-line,.mat-selection-list[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto,"Helvetica Neue",sans-serif}.mat-simple-snackbar{font-family:Roboto,"Helvetica Neue",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto,"Helvetica Neue",sans-serif}.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden}@media screen and (-ms-high-contrast:active){.mat-ripple{display:none}}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1),-webkit-transform 0s cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.288)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;box-sizing:content-box!important}.history-container{margin:1.5em 0}.history-container.limited-height{overflow-y:auto}.history-container .history-item:not(:last-child){position:relative}.history-container .history-item:not(:last-child)::before{content:"";position:absolute;height:3em;width:2px;background-color:#91979c;left:11px;top:14px}.history-container .history-item .smaller-icon{font-size:16px;display:flex;justify-content:center;margin-top:2px}`]
            },] },
];
DecStepsListComponent.propDecorators = {
    icon: [{ type: Input }],
    title: [{ type: Input }],
    showTime: [{ type: Input }],
    maxHeight: [{ type: Input }],
    stepsList: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecStepsListModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop$9 = () => {
};
//  Used to extend ngForms functions
const /** @type {?} */ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecStringArrayInputComponent),
    multi: true
};
class DecStringArrayInputComponent {
    constructor() {
        this.mode = 'textarea';
        this.rows = 3;
        this.innerArray = '';
        this.onTouchedCallback = noop$9;
        this.onChangeCallback = noop$9;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerArray;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerArray) {
            this.innerArray = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @return {?}
     */
    get valueAsString() {
        return this.getArrayAsString();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set valueAsString(v) {
        if (v !== this.innerArray) {
            this.value = this.stringToArray(v);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    getArrayAsString() {
        return this.arrayToString(this.value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.value) {
            this.value = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} stringOfArray
     * @return {?}
     */
    stringToArray(stringOfArray) {
        if (stringOfArray) {
            const /** @type {?} */ regExp = /[^,\s][^,\s]*[^,\s]*/g;
            return stringOfArray.match(regExp);
        }
    }
    /**
     * @param {?} arrayOfstring
     * @return {?}
     */
    arrayToString(arrayOfstring) {
        if (arrayOfstring) {
            return arrayOfstring.join(', ');
        }
    }
}
DecStringArrayInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-string-array-input',
                template: `<ng-container [ngSwitch]="mode == 'input'">

  <mat-form-field *ngSwitchCase="true">
    <input matInput
    type="text"
    [name]="name"
    [(ngModel)]="valueAsString"
    [placeholder]="placeholder">
  </mat-form-field>

  <mat-form-field *ngSwitchCase="false">
    <textarea matInput
    [rows]="rows"
    [name]="name"
    [(ngModel)]="valueAsString"
    [placeholder]="placeholder">
    </textarea>
  </mat-form-field>

</ng-container>
`,
                styles: [``],
                providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecStringArrayInputComponent.ctorParameters = () => [];
DecStringArrayInputComponent.propDecorators = {
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    mode: [{ type: Input }],
    rows: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecStringArrayInputModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecTabComponent {
    constructor() {
        this.ensureTabName = () => {
            if (!this.name) {
                throw new Error('DecTabComponentError: The <dec-tab> component must have an unique name. Please, ensure that you have passed an unique namme to the component.');
            }
        };
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.ensureTabName();
    }
}
DecTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-tab',
                template: ``,
                styles: [``]
            },] },
];
/** @nocollapse */
DecTabComponent.ctorParameters = () => [];
DecTabComponent.propDecorators = {
    label: [{ type: Input }],
    name: [{ type: Input }],
    total: [{ type: Input }],
    content: [{ type: ContentChild, args: [TemplateRef,] }],
    disabled: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecTabMenuComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
DecTabMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-tab-menu',
                template: `<p>
  tab-menu works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecTabMenuComponent.ctorParameters = () => [];
DecTabMenuComponent.propDecorators = {
    activeTab: [{ type: Input }],
    content: [{ type: ContentChild, args: [TemplateRef,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecTabsComponent {
    /**
     * @param {?} route
     * @param {?} router
     */
    constructor(route, router) {
        this.route = route;
        this.router = router;
        this.persist = true;
        this.destroyOnBlur = false;
        this.padding = true;
        this.activeTabChange = new EventEmitter();
        this.activatedTabs = {};
        this.pathFromRoot = '';
        this.ensureUniqueName = () => {
            if (!this.name) {
                throw new Error('DecTabComponentError: The tab component must have an unique name. Please, ensure that you have passed an unique namme to the component.');
            }
        };
        this.ensureUniqueTabNames = () => {
            return new Promise((res, rej) => {
                const /** @type {?} */ names = {};
                this.tabs.toArray().forEach(tab => {
                    if (!names[tab.name]) {
                        names[tab.name] = true;
                    }
                    else {
                        throw new Error(`DecTabComponentError: The <dec-tabs> component must have an unique name. The name ${tab.name} was used more than once.`);
                    }
                });
                res();
            });
        };
        this.selectTab = (tabName) => {
            if (this.tabs) {
                this.activeTab = tabName;
                this.activatedTabs[tabName] = true;
                this._activeTabObject = this.tabs.toArray().filter(tab => tab.name === tabName)[0];
                this._activeTabIndex = this.tabs.toArray().indexOf(this._activeTabObject);
                this.activeTabChange.emit(tabName);
            }
        };
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set activeTab(v) {
        if (v && this._activeTab !== v) {
            this._activeTab = v;
            this.persistTab(v);
        }
    }
    /**
     * @return {?}
     */
    get activeTab() {
        return this._activeTab;
    }
    /**
     * @return {?}
     */
    get activeTabIndex() {
        return this._activeTabIndex;
    }
    /**
     * @return {?}
     */
    get activeTabObject() {
        return this._activeTabObject;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ensureUniqueName();
        this.watchTabInUrlQuery();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.ensureUniqueTabNames()
            .then(() => {
            const /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
            if (queryParams && queryParams[this.componentTabName()]) {
                const /** @type {?} */ currentTab = queryParams[this.componentTabName()];
                this.selectTab(currentTab);
            }
            else {
                this.startSelectedTab();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stopWatchingTabInUrlQuery();
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    shoulTabBeDisplayed(tab) {
        const /** @type {?} */ isSelected = this._activeTabObject === tab;
        const /** @type {?} */ isActivated = this.activatedTabs[tab.name];
        return isSelected || (!this.destroyOnBlur && isActivated);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChangeTab($event) {
        const /** @type {?} */ activeTabObject = this.tabs.toArray()[$event.index];
        this.activeTab = activeTabObject.name;
    }
    /**
     * @param {?} total
     * @return {?}
     */
    parseTotal(total) {
        return total !== null && total >= 0 ? total : '?';
    }
    /**
     * @return {?}
     */
    reset() {
        this.hidden = true;
        setTimeout(() => {
            this.hidden = false;
        }, 10);
    }
    /**
     * @return {?}
     */
    componentTabName() {
        return this.name + '-tab';
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    persistTab(tab) {
        if (this.persist) {
            const /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
            queryParams[this.componentTabName()] = tab;
            this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
        }
    }
    /**
     * @return {?}
     */
    startSelectedTab() {
        const /** @type {?} */ activeTab = this.activeTab || this.tabs.toArray()[0].name;
        setTimeout(() => {
            // avoid change after component checked error
            this.selectTab(activeTab);
        }, 1);
    }
    /**
     * @return {?}
     */
    watchTabInUrlQuery() {
        this.queryParamsSubscription = this.route.queryParams
            .subscribe((params) => {
            const /** @type {?} */ tab = params[this.componentTabName()];
            this.selectTab(tab);
        });
    }
    /**
     * @return {?}
     */
    stopWatchingTabInUrlQuery() {
        this.queryParamsSubscription.unsubscribe();
    }
}
DecTabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-tabs',
                template: `<div *ngIf="!hidden">

  <!-- TABS -->
  <mat-tab-group [selectedIndex]="activeTabIndex" (focusChange)="onChangeTab($event)" [dynamicHeight]="true">

    <!-- TAB -->
    <mat-tab *ngFor="let tab of tabs;" [disabled]="tab.disabled">

      <!-- TAB LABEL -->
      <ng-template mat-tab-label>
        {{ tab.label }}
        <span class="badge badge-pill badge-small" *ngIf="tab.total >= 0">{{ parseTotal(tab.total) }}</span>
      </ng-template>

      <!-- TAB CONTENT WRAPPER -->
      <ng-container *ngIf="shoulTabBeDisplayed(tab)">

        <!-- TAB MENU -->
        <div *ngIf="tabMenuComponent" class="menu-wrapper">
          <ng-container *ngTemplateOutlet="tabMenuComponent.content; context: { activeTab: activeTab }"></ng-container>
        </div>

        <!-- TABS CONTENT -->
        <div [ngClass]="{'tab-padding': padding}">

          <ng-container *ngTemplateOutlet="tab.content"></ng-container>

        </div>

      </ng-container>

    </mat-tab>

  </mat-tab-group>

</div>
`,
                styles: [`.menu-wrapper{text-align:right;padding:8px 0}.tab-padding{padding:16px 0}`]
            },] },
];
/** @nocollapse */
DecTabsComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecTabModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecTabsModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ UPLOAD_ENDPOINT = '/upload';
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop$a = () => {
};
const /** @type {?} */ DEC_UPLOAD_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecUploadComponent),
    multi: true
};
class DecUploadComponent {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
        this.progresses = [];
        this.error = new EventEmitter();
        this.uploaded = new EventEmitter();
        this.progress = new EventEmitter();
        this.onTouchedCallback = noop$a;
        this.onChangeCallback = noop$a;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    writeValue(v) {
        this.value = v;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    filesChanged(event) {
        for (let /** @type {?} */ x = 0; x < event.target.files.length; x++) {
            this.uploadFile(event.target.files[x], x);
        }
    }
    /**
     * @return {?}
     */
    openFileSelection() {
        this.inputFile.nativeElement.click();
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    getProgressbarMode(progress) {
        let /** @type {?} */ mode;
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
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    getProgressValueBasedOnMode(progress) {
        const /** @type {?} */ mode = this.getProgressbarMode(progress);
        const /** @type {?} */ value = mode === 'buffer' ? 0 : progress.value;
        return value;
    }
    /**
     * @param {?} file
     * @param {?} index
     * @return {?}
     */
    uploadFile(file, index) {
        if (file) {
            const /** @type {?} */ progress = {
                fileIndex: index,
                fileName: file.name,
                value: 0,
            };
            this.progresses.push(progress);
            this.service.upload(UPLOAD_ENDPOINT, [file])
                .pipe(catchError(error => {
                console.log('catchError', error);
                progress.error = error.message;
                this.error.emit('message.error.unexpected');
                this.detectUploadEnd();
                return throwError(error.message);
            }))
                .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    const /** @type {?} */ percentDone = Math.round((100 * event.loaded) / event.total);
                    progress.value = percentDone === 100 ? percentDone : parseFloat(percentDone.toFixed(2));
                }
                else if (event instanceof HttpResponse) {
                    progress.value = 100;
                    progress.file = event.body;
                    this.detectUploadEnd();
                }
                this.progress.emit(this.progresses);
            });
        }
    }
    /**
     * @return {?}
     */
    detectUploadEnd() {
        const /** @type {?} */ stillUploading = this.progresses.filter((progress) => {
            return progress.value < 100;
        });
        if (!stillUploading.length) {
            this.emitUploadedFiles();
            this.clearInputFile();
            this.clearProgresses();
        }
    }
    /**
     * @return {?}
     */
    clearInputFile() {
        this.inputFile.nativeElement.value = '';
    }
    /**
     * @return {?}
     */
    clearProgresses() {
        this.progresses = [];
    }
    /**
     * @return {?}
     */
    emitUploadedFiles() {
        const /** @type {?} */ files = this.progresses.map((uploadProgress) => {
            return uploadProgress.file;
        });
        this.value = [...files];
        this.uploaded.emit(this.value);
    }
}
DecUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-upload',
                template: `<ng-container [ngSwitch]="(progresses && progresses.length) ? true : false">
  <ng-container *ngSwitchCase="false">
    <span (click)="openFileSelection()" class="click">
      <ng-content></ng-content>
    </span>
  </ng-container>
  <ng-container *ngSwitchCase="true">
    <div *ngFor="let uploadProgress of progresses" class="dec-upload-progress-wrapper">
      <mat-progress-bar
        color="primary"
        [mode]="getProgressbarMode(uploadProgress)"
        [value]="getProgressValueBasedOnMode(uploadProgress)">
      </mat-progress-bar>
      <div class="text-center">
        <small>
          {{ uploadProgress.value }}% - {{ uploadProgress.fileName }}
        </small>
      </div>
    </div>
  </ng-container>
</ng-container>


<input type="file" #inputFile (change)="filesChanged($event)" [multiple]="multiple" [disabled]="disabled">

`,
                styles: [`.click{cursor:pointer}input{display:none}.text-center{text-align:center}.dec-upload-progress-wrapper{padding:8px 0}`],
                providers: [DEC_UPLOAD_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecUploadComponent.ctorParameters = () => [
    { type: DecApiService }
];
DecUploadComponent.propDecorators = {
    disabled: [{ type: Input }],
    multiple: [{ type: Input }],
    error: [{ type: Output }],
    uploaded: [{ type: Output }],
    progress: [{ type: Output }],
    inputFile: [{ type: ViewChild, args: ['inputFile',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecUploadModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecAuthGuard {
    /**
     * @param {?} decoraApi
     */
    constructor(decoraApi) {
        this.decoraApi = decoraApi;
    }
    /**
     * @param {?} route
     * @return {?}
     */
    canLoad(route) {
        return this.isAuthenticated();
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        return this.isAuthenticated();
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivateChild(route, state) {
        return this.isAuthenticated();
    }
    /**
     * @return {?}
     */
    isAuthenticated() {
        return /** @type {?} */ (this.decoraApi.user$
            .pipe(map((user) => {
            return (user && user.id) ? true : false;
        })));
    }
}
DecAuthGuard.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecAuthGuard.ctorParameters = () => [
    { type: DecApiService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecGuardModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DecAppInitializer = (decConfig, decApi) => {
    return () => {
        return new Promise((resolve, reject) => {
            decConfig.loadConfig().then((configuration) => {
                decApi.handShake().then((account) => {
                    resolve({
                        configuration,
                        account,
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
class DecSnackBarModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecApiModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('DecApiModule is already loaded. Import it in the AppModule only');
        }
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
DecApiModule.ctorParameters = () => [
    { type: DecApiModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UserAuthData {
    /**
     * @param {?=} user
     */
    constructor(user = {}) {
        this.id = user.id || undefined;
        this.email = user.email || undefined;
        this.name = user.name || undefined;
        this.country = user.country || undefined;
        this.company = user.company || undefined;
        this.role = user.role || undefined;
        this.permissions = user.permissions || undefined;
    }
}
class Filter {
    /**
     * @param {?=} data
     */
    constructor(data = {}) {
        this.property = data.property;
        this.value = Array.isArray(data.property) ? data.property : [data.property];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DECORA_CONFIGURATION_SERVICE_CONFIG = new InjectionToken('DECORA_CONFIGURATION_SERVICE_CONFIG');
/**
 * @param {?} http
 * @param {?} serviceConfig
 * @return {?}
 */
function InitDecConfigurationService(http, serviceConfig) {
    return new DecConfigurationService(http, serviceConfig);
}
class DecConfigurationModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('DecConfigurationModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
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
    }
}
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
DecConfigurationModule.ctorParameters = () => [
    { type: DecConfigurationModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecPermissionGuard {
    /**
     * @param {?} decoraApi
     * @param {?} router
     */
    constructor(decoraApi, router) {
        this.decoraApi = decoraApi;
        this.router = router;
    }
    /**
     * @param {?} route
     * @return {?}
     */
    canLoad(route) {
        if (route.data && !route.data["permissions"]) {
            this.notAllowed();
            return of(false);
        }
        const /** @type {?} */ permissions = route.data["permissions"];
        return this.hasAccess(permissions);
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        if (route.data && !route.data["permissions"]) {
            this.notAllowed();
            return of(false);
        }
        const /** @type {?} */ permissions = route.data["permissions"];
        return this.hasAccess(permissions);
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivateChild(route, state) {
        return this.canActivate(route, state);
    }
    /**
     * @return {?}
     */
    notAllowed() {
        this.router.navigate(['/forbiden']);
    }
    /**
     * @param {?} permissions
     * @return {?}
     */
    hasAccess(permissions) {
        return this.decoraApi.user$
            .pipe(map(user => {
            if (user) {
                const /** @type {?} */ allowed = this.isAllowedAccess(user.permissions, permissions);
                if (!allowed) {
                    this.notAllowed();
                }
                else {
                    return true;
                }
            }
        }));
    }
    /**
     * @param {?} userPermissions
     * @param {?} currentPermissions
     * @return {?}
     */
    isAllowedAccess(userPermissions, currentPermissions) {
        try {
            const /** @type {?} */ matchingRole = currentPermissions.find((userRole) => {
                return userPermissions.find((alowedRole) => {
                    return alowedRole === userRole;
                }) ? true : false;
            });
            return matchingRole ? true : false;
        }
        catch (/** @type {?} */ error) {
            return false;
        }
    }
}
DecPermissionGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
DecPermissionGuard.ctorParameters = () => [
    { type: DecApiService },
    { type: Router }
];
/** @nocollapse */ DecPermissionGuard.ngInjectableDef = defineInjectable({ factory: function DecPermissionGuard_Factory() { return new DecPermissionGuard(inject(DecApiService), inject(Router)); }, token: DecPermissionGuard, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecPermissionGuardModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecWsClientService {
    constructor() {
        this.connection = {};
    }
    /**
     * @param {?} url
     * @return {?}
     */
    connect(url) {
        const /** @type {?} */ connection = this.connection[url];
        if (connection) {
            return connection;
        }
        else {
            return this.connectToWs(url);
        }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    connectToWs(url) {
        const /** @type {?} */ connection = this.openConnection(url);
        this.connection[url] = connection;
        return connection;
    }
    /**
     * @param {?} url
     * @param {?=} connection
     * @return {?}
     */
    openConnection(url, connection) {
        if (connection) {
            connection.channel = new WebSocket(url);
        }
        else {
            connection = connection ? connection : {
                channel: new WebSocket(url),
                messages: new BehaviorSubject([]),
            };
        }
        connection.channel.onclose = () => this.openConnection(url, connection);
        connection.channel.onerror = () => this.openConnection(url, connection);
        connection.channel.onmessage = (a) => {
            const /** @type {?} */ currentMessages = connection.messages.getValue();
            currentMessages.unshift(a.data);
            connection.messages.next(currentMessages);
        };
        return connection;
    }
}
DecWsClientService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DecWsClientService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DecWsClientModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, DecAutocompleteComponent, DecAutocompleteModule, DecAutocompleteAccountComponent, DecAutocompleteAccountModule, AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCompanyComponent, DecAutocompleteCompanyModule, AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCountryComponent, DecAutocompleteCountryModule, BASE_ENDPOINT, AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR, DecAutocompleteDepartmentComponent, DecAutocompleteDepartmentModule, DecAutocompleteRoleComponent, DecAutocompleteRoleModule, BASE_AUTOCOMPLETE_PROJECT_ENDPOINT, AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR, DecAutocompleteProjectComponent, DecAutocompleteProjectModule, AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR, DecAutocompleteQuoteComponent, DecAutocompleteQuoteModule, DecAutocompleteTagsComponent, DecAutocompleteTagsModule, DecBreadcrumbComponent, DecBreadcrumbModule, DecDialogComponent, DecDialogModule, DecDialogService, DecGalleryComponent, DecGalleryModule, DecIconModule, DecIconComponent, DecImageZoomModule, DecImageZoomComponent, DecLabelComponent, DecLabelModule, DecListModule, DecListFilter, DecListComponent, DecListActiveFilterResumeModule, DecListActiveFilterResumeComponent, DecListAdvancedFilterModule, DecListAdvancedFilterComponent, DecListFilterModule, DecListFilterComponent, DecListFooterComponent, DecListGridComponent, DecListTableModule, DecListTableComponent, DecListTableColumnComponent, DecListActionsModule, DecListActionsComponent, DecPageForbidenComponent, DecPageForbidenModule, DecPageNotFoundComponent, DecPageNotFoundModule, DecProductSpinComponent, DecProductSpinModule, DecSidenavModule, DecSidenavComponent, DecSidenavContentComponent, DecSidenavMenuItemComponent, DecSidenavMenuLeftComponent, DecSidenavMenuRightComponent, DecSidenavMenuTitleComponent, DecSidenavToolbarComponent, DecSidenavToolbarTitleComponent, DecSketchfabViewComponent, DecSketchfabViewModule, DecSpinnerComponent, DecSpinnerModule, DecStepsListComponent, DecStepsListModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, DecStringArrayInputComponent, DecStringArrayInputModule, DecTabsModule, DecTabsComponent, DecTabModule, DecTabComponent, DecUploadModule, DEC_UPLOAD_CONTROL_VALUE_ACCESSOR, DecUploadComponent, hexToRgbNew, standardize_color, DecContrastFontWithBgDirective, DecContrastFontWithBgModule, DecImageModule, DecImageDirective, DecPermissionDirective, DecPermissionModule, DecGuardModule, DecAuthGuard, DecAppInitializer, DecApiService, DecApiModule, UserAuthData, Filter, DecConfigurationService, DECORA_CONFIGURATION_SERVICE_CONFIG, InitDecConfigurationService, DecConfigurationModule, DecSnackBarService, DecSnackBarModule, DecPermissionGuard, DecPermissionGuardModule, DecWsClientService, DecWsClientModule, DecScriptLoaderService, DecScriptLoaderModule, DecListTabsFilterComponent as ɵb, DecSidenavMenuComponent as ɵd, DecSidenavService as ɵc, DecTabMenuComponent as ɵe };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWJyb3dzZXItbGliLXVpLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtYWNjb3VudC9hdXRvY29tcGxldGUtYWNjb3VudC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWFjY291bnQvYXV0b2NvbXBsZXRlLWFjY291bnQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb21wYW55L2F1dG9jb21wbGV0ZS1jb21wYW55LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtY29tcGFueS9hdXRvY29tcGxldGUtY29tcGFueS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWNvdW50cnkvYXV0b2NvbXBsZXRlLWNvdW50cnkuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb3VudHJ5L2F1dG9jb21wbGV0ZS1jb3VudHJ5Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQvYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1yb2xlL2F1dG9jb21wbGV0ZS1yb2xlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcm9sZS9hdXRvY29tcGxldGUtcm9sZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXByb2plY3QvYXV0b2NvbXBsZXRlLXByb2plY3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1wcm9qZWN0L2F1dG9jb21wbGV0ZS1wcm9qZWN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcXVvdGUvYXV0b2NvbXBsZXRlLXF1b3RlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtdGFncy9hdXRvY29tcGxldGUtdGFncy5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXRhZ3MvYXV0b2NvbXBsZXRlLXRhZ3MubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtZGlhbG9nL2RlYy1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zcGlubmVyL2RlYy1zcGlubmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2Nhcm91c2VsLWNvbmZpZy50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2RlYy1nYWxsZXJ5LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUuY29uc3RhbnRzLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWltYWdlLXpvb20vZGVjLWltYWdlLXpvb20uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2RlYy1nYWxsZXJ5Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtaWNvbi9kZWMtaWNvbi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWljb24vZGVjLWljb24ubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1sYWJlbC9kZWMtbGFiZWwuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2NvbG9yL2NvbnRyYXN0LWZvbnQtd2l0aC1iZy9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9jb2xvci9jb250cmFzdC1mb250LXdpdGgtYmcvZGVjLWNvbnRyYXN0LWZvbnQtd2l0aC1iZy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLWxhYmVsL2RlYy1sYWJlbC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0Lm1vZGVscy50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIvbGlzdC10YWJzLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFkdmFuY2VkLWZpbHRlci9saXN0LWFkdmFuY2VkLWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWZpbHRlci9saXN0LWZpbHRlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lL2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9wZXJtaXNzaW9uL2RlYy1wZXJtaXNzaW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9wZXJtaXNzaW9uL2RlYy1wZXJtaXNzaW9uLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZmlsdGVyL2xpc3QtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS1jb2x1bW4vbGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS9saXN0LXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC10YWJsZS9saXN0LXRhYmxlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtZm9vdGVyL2xpc3QtZm9vdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWN0aW9ucy9saXN0LWFjdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hY3Rpb25zL2xpc3QtYWN0aW9ucy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wYWdlLWZvcmJpZGVuL3BhZ2UtZm9yYmlkZW4uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2UtZm9yYmlkZW4vcGFnZS1mb3JiaWRlbi5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvcGFnZS1ub3QtZm91bmQvcGFnZS1ub3QtZm91bmQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2Utbm90LWZvdW5kL3BhZ2Utbm90LWZvdW5kLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wcm9kdWN0LXNwaW4vcHJvZHVjdC1zcGluLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wcm9kdWN0LXNwaW4vcHJvZHVjdC1zcGluLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUvZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi10b29sYmFyL2RlYy1zaWRlbmF2LXRvb2xiYXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS1sZWZ0L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1jb250ZW50L2RlYy1zaWRlbmF2LWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS9kZWMtc2lkZW5hdi1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L3NpZGVuYXYubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9zY3JpcHQtbG9hZGVyL2RlYy1zY3JpcHQtbG9hZGVyLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2tldGNoZmFiLXZpZXcvZGVjLXNrZXRjaGZhYi12aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2tldGNoZmFiLXZpZXcvZGVjLXNrZXRjaGZhYi12aWV3Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3RlcHMtbGlzdC9kZWMtc3RlcHMtbGlzdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXN0ZXBzLWxpc3QvZGVjLXN0ZXBzLWxpc3QubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zdHJpbmctYXJyYXktaW5wdXQvZGVjLXN0cmluZy1hcnJheS1pbnB1dC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXN0cmluZy1hcnJheS1pbnB1dC9kZWMtc3RyaW5nLWFycmF5LWlucHV0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYi90YWIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFicy5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdGFicy90YWIvdGFiLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYnMubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3VwbG9hZC91cGxvYWQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9ndWFyZC9hdXRoLWd1YXJkLnNlcnZpY2UudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2d1YXJkL2d1YXJkLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvaW5pdGlhbGl6ZXIvZGVjLWFwcC1pbml0aWFsaXplci50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvc25hY2stYmFyL2RlYy1zbmFjay1iYXIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24tc2VydmljZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL3Blcm1pc3Npb24tZ3VhcmQvZGVjLXBlcm1pc3Npb24tZ3VhcmQuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvcGVybWlzc2lvbi1ndWFyZC9kZWMtcGVybWlzc2lvbi1ndWFyZC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL3dzLWNsaWVudC93cy1jbGllbnQuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvd3MtY2xpZW50L3dzLWNsaWVudC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIsIE1hdFNuYWNrQmFyUmVmLCBTaW1wbGVTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuXG5leHBvcnQgdHlwZSBNZXNzYWdlVHlwZSA9ICdzdWNjZXNzJyB8ICdwcmltYXJ5JyB8ICdpbmZvJyB8ICd3YXJuJyB8ICdlcnJvcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERlY1NuYWNrQmFyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNuYWNrQmFyU2VydmljZTogTWF0U25hY2tCYXIsXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxuXG4gIG9wZW4obWVzc2FnZTogc3RyaW5nLCB0eXBlOiBNZXNzYWdlVHlwZSwgZHVyYXRpb24gPSA0ZTMpOiBNYXRTbmFja0JhclJlZjxTaW1wbGVTbmFja0Jhcj4ge1xuICAgIGNvbnN0IG1zZyA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQobWVzc2FnZSk7XG4gICAgY29uc3Qgc25hY2tDbGFzcyA9IHRoaXMuZ2V0Q2xhc3ModHlwZSk7XG5cbiAgICByZXR1cm4gdGhpcy5zbmFja0JhclNlcnZpY2Uub3Blbihtc2csICcnLCB7XG4gICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICBwYW5lbENsYXNzOiBzbmFja0NsYXNzXG4gICAgfSk7XG4gIH1cblxuICBnZXRDbGFzcyh0eXBlOiBNZXNzYWdlVHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgIHJldHVybiAnc25hY2stc3VjY2Vzcyc7XG4gICAgICBjYXNlICdwcmltYXJ5JzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1wcmltYXJ5JztcbiAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLWluZm8nO1xuICAgICAgY2FzZSAnd2Fybic6XG4gICAgICAgIHJldHVybiAnc25hY2std2Fybic7XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIHJldHVybiAnc25hY2stZXJyb3InO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLXNlcnZpY2UubW9kZWxzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgQ09ORklHX1BBVEggPSAnYXNzZXRzL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5qc29uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlIHtcblxuICBzZXQgY29uZmlnKHY6IGFueSkge1xuICAgIGlmICh0aGlzLl9jb25maWcgIT09IHYpIHtcbiAgICAgIHRoaXMuX2NvbmZpZyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNvbmZpZygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICBwcm9maWxlID0gJ2xvY2FsJztcblxuICBwcml2YXRlIF9jb25maWc6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUcnKSBwcml2YXRlIHNlcnZpY2VDb25maWd1cmF0aW9uOiBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZyxcbiAgKSB7fVxuXG4gIGxvYWRDb25maWcoKSB7XG4gICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLnNlcnZpY2VDb25maWd1cmF0aW9uLmJhc2VQYXRoO1xuICAgIGNvbnN0IHBhdGggPSBgJHtiYXNlUGF0aH0vJHtDT05GSUdfUEFUSH1gO1xuXG4gICAgY29uc3QgY2FsbCA9IHRoaXMuaHR0cC5nZXQocGF0aCkudG9Qcm9taXNlKCk7XG5cbiAgICBjYWxsLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgRGVjQ29uZmlndXJhdGlvblNlcnZpY2U6OiBJbml0aWFsaXplZCBpbiAke3RoaXMucHJvZmlsZX0gbW9kZWApO1xuICAgICAgdGhpcy5wcm9maWxlID0gdGhpcy5pc1ZhbGlkUHJvZmlsZShyZXMucHJvZmlsZSwgcmVzKSA/IHJlcy5wcm9maWxlIDogdGhpcy5wcm9maWxlO1xuICAgICAgdGhpcy5jb25maWcgPSByZXNbdGhpcy5wcm9maWxlXTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignRGVjQ29uZmlndXJhdGlvblNlcnZpY2U6OiBJbml0aWFsaXphdGlvbiBFcnJvci4gQ291bGQgcmV0cmlldmUgYXBwIGNvbmZpZ3VyYXRpb24nLCBlcnIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICBwcml2YXRlIGlzVmFsaWRQcm9maWxlKHByb2ZpbGUsIGF2YWlsYWJsZVByb2ZpbGVzKSB7XG5cbiAgICBjb25zdCBhdmFpbGFibGVzID0gT2JqZWN0LmtleXMoYXZhaWxhYmxlUHJvZmlsZXMpO1xuXG4gICAgcmV0dXJuIChhdmFpbGFibGVzLmluZGV4T2YocHJvZmlsZSkgPj0gMCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHNoYXJlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVc2VyQXV0aERhdGEsIExvZ2luRGF0YSwgRmFjZWJvb2tMb2dpbkRhdGEsIERlY0ZpbHRlciwgU2VyaWFsaXplZERlY0ZpbHRlciB9IGZyb20gJy4vZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNTbmFja0JhclNlcnZpY2UgfSBmcm9tICcuLy4uL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgQ2FsbE9wdGlvbnMgPSB7XG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgcGFyYW1zPzoge1xuICAgIFtwcm9wOiBzdHJpbmddOiBhbnk7XG4gIH07XG59ICYge1xuICBbcHJvcDogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSHR0cFJlcXVlc3RUeXBlcyA9ICdHRVQnIHwgJ1BPU1QnIHwgJ1BVVCcgfCAnUEFUQ0gnIHwgJ0RFTEVURSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBcGlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICB1c2VyOiBVc2VyQXV0aERhdGE7XG5cbiAgdXNlciQ6IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+KHVuZGVmaW5lZCk7XG5cbiAgcHJpdmF0ZSBzZXNzaW9uVG9rZW46IHN0cmluZztcblxuICBwcml2YXRlIHVzZXJTdWJzY3JpcGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIHNuYWNrYmFyOiBEZWNTbmFja0JhclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZWNDb25maWc6IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZVRvVXNlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZVRvVXNlcigpO1xuICB9XG5cbiAgZ2V0IGhvc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hcGk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIC8vIFBVQkxJQyBBVVRIIE1FVEhPRFMgLy9cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICBhdXRoID0gKGxvZ2luRGF0YTogTG9naW5EYXRhKSA9PiB7XG4gICAgaWYgKGxvZ2luRGF0YSkge1xuICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL3NpZ25pbicpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgaGVhZGVyczogdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB9O1xuICAgICAgY29uc3QgYm9keSA9IG5ldyBIdHRwUGFyYW1zKClcbiAgICAgICAgLnNldCgndXNlcm5hbWUnLCBsb2dpbkRhdGEuZW1haWwpXG4gICAgICAgIC5zZXQoJ3Bhc3N3b3JkJywgbG9naW5EYXRhLnBhc3N3b3JkKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VXNlckF1dGhEYXRhPihlbmRwb2ludCwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgbm90aWZpZWQ6IHRydWUsIG1lc3NhZ2U6ICdERUNPUkEtQVBJIEFVVEggRVJST1I6OiBObyBjcmVkZW50aWFscyBwcm92aWRlZCcgfSk7XG4gICAgfVxuICB9XG5cbiAgYXV0aEZhY2Vib29rID0gKGxvZ2luRGF0YTogRmFjZWJvb2tMb2dpbkRhdGEpID0+IHtcbiAgICBpZiAobG9naW5EYXRhKSB7XG4gICAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoJ2F1dGgvZmFjZWJvb2svc2lnbmluJyk7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgICBjb25zdCBib2R5ID0gbmV3IEh0dHBQYXJhbXMoKVxuICAgICAgICAuc2V0KCdmYWNlYm9va1Rva2VuJywgbG9naW5EYXRhLmZhY2Vib29rVG9rZW4pXG4gICAgICAgIC5zZXQoJ2tlZXBMb2dnZWQnLCBsb2dpbkRhdGEua2VlcExvZ2dlZC50b1N0cmluZygpKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2Q8VXNlckF1dGhEYXRhPihlbmRwb2ludCwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChyZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgbm90aWZpZWQ6IHRydWUsIG1lc3NhZ2U6ICdERUNPUkEtQVBJIEFVVEggRkFDRUJPT0sgRVJST1I6OiBObyBjcmVkZW50aWFscyBwcm92aWRlZCcgfSk7XG4gICAgfVxuICB9XG5cbiAgbG9nb3V0ID0gKHJlZGlyZWN0VG9Mb2dpblBhZ2UgPSB0cnVlKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL3NpZ25vdXQnKTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIH07XG4gICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZChlbmRwb2ludCwge30sIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICBpZiAocmVkaXJlY3RUb0xvZ2luUGFnZSkge1xuICAgICAgICAgICAgdGhpcy5nb1RvTG9naW5QYWdlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gUFVCTElDIEhUVFAgTUVUSE9EUyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIGdldCA9IDxUPihlbmRwb2ludCwgc2VhcmNoPzogRGVjRmlsdGVyLCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMudHJhbnNmb3JtRGVjRmlsdGVySW5QYXJhbXMoc2VhcmNoKTtcbiAgICByZXR1cm4gdGhpcy5nZXRNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBhcmFtcywgb3B0aW9ucyk7XG4gIH1cblxuICBkZWxldGUgPSA8VD4oZW5kcG9pbnQsIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlTWV0aG9kPFQ+KGVuZG9waW50VXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBhdGNoID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wYXRjaE1ldGhvZDxUPihlbmRvcGludFVybCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0ID0gPFQ+KGVuZHBvaW50LCBwYXlsb2FkOiBhbnkgPSB7fSwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1dCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMucHV0TWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgfVxuXG4gIHVwc2VydCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGlmIChwYXlsb2FkLmlkID49IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dChlbmRwb2ludCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoZW5kcG9pbnQsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHVwbG9hZChlbmRwb2ludDogc3RyaW5nLCBmaWxlczogRmlsZVtdLCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuY3JlYXRlRmlsZXNGb3JtRGF0YShmaWxlcyk7XG4gICAgb3B0aW9ucy5yZXBvcnRQcm9ncmVzcyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RNZXRob2QoJ1BPU1QnLCBlbmRvcGludFVybCwgZm9ybURhdGEsIG9wdGlvbnMpO1xuICB9XG5cblxuXG4gIGhhbmRTaGFrZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cnlUb0xvYWRTaWduZWRJblVzZXIoKTtcbiAgfVxuICAvLyAqKioqKioqKioqKiogLy9cbiAgLy8gUHJpdmF0ZSBIZWxwZXIgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKiogLy9cblxuICBwcml2YXRlIGZldGNoQ3VycmVudExvZ2dlZFVzZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL2FjY291bnQnKTtcbiAgICBjb25zdCBvcHRpb25zID0geyBoZWFkZXJzOiB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oKSB9O1xuICAgIHJldHVybiB0aGlzLmdldE1ldGhvZDxVc2VyQXV0aERhdGE+KGVuZHBvaW50LCB7fSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKHJlcykgPT4ge1xuICAgICAgICAgIHRoaXMuZXh0cmF0U2Vzc2lvblRva2VuKHJlcyksXG4gICAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNmb3JtRGVjRmlsdGVySW5QYXJhbXMoZmlsdGVyOiBEZWNGaWx0ZXIpOiBTZXJpYWxpemVkRGVjRmlsdGVyIHtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZWRGaWx0ZXI6IFNlcmlhbGl6ZWREZWNGaWx0ZXIgPSB7fTtcblxuICAgIGlmIChmaWx0ZXIpIHtcblxuICAgICAgaWYgKGZpbHRlci5wYWdlKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIucGFnZSA9IGZpbHRlci5wYWdlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLmxpbWl0KSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIubGltaXQgPSBmaWx0ZXIubGltaXQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuZmlsdGVyR3JvdXBzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcldpdGhWYWx1ZUFzQXJyYXkgPSB0aGlzLmdldEZpbHRlcldpdGhWYWx1ZXNBc0FycmF5KGZpbHRlci5maWx0ZXJHcm91cHMpO1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLmZpbHRlciA9IHRoaXMuZmlsdGVyT2JqZWN0VG9RdWVyeVN0cmluZyhmaWx0ZXJXaXRoVmFsdWVBc0FycmF5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5wcm9qZWN0Vmlldykge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnByb2plY3RWaWV3ID0gdGhpcy5maWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKGZpbHRlci5wcm9qZWN0Vmlldyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIuc29ydCkge1xuICAgICAgICBzZXJpYWxpemVkRmlsdGVyLnNvcnQgPSB0aGlzLmZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcoZmlsdGVyLnNvcnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLnRleHRTZWFyY2gpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci50ZXh0U2VhcmNoID0gZmlsdGVyLnRleHRTZWFyY2g7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gc2VyaWFsaXplZEZpbHRlcjtcblxuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKG9iaikge1xuICAgIGlmIChvYmopIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyV2l0aFZhbHVlc0FzQXJyYXkoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cENvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbHRlckdyb3VwcykpOyAvLyBtYWtlIGEgY29weSBvZiB0aGUgZmlsdGVyIHNvIHdlIGRvIG5vdCBjaGFuZ2UgdGhlIG9yaWdpbmFsIGZpbHRlclxuXG4gICAgaWYgKGZpbHRlckdyb3VwQ29weSkge1xuXG4gICAgICByZXR1cm4gZmlsdGVyR3JvdXBDb3B5Lm1hcChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycyA9IGZpbHRlckdyb3VwLmZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG5cbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmlsdGVyLnZhbHVlKSkge1xuICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gW2ZpbHRlci52YWx1ZV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZpbHRlcjtcblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyR3JvdXA7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIGZpbHRlckdyb3VwcztcblxuICAgIH1cbiAgfVxuXG5cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIC8vIEh0dHAgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKiogLy9cbiAgcHJpdmF0ZSBnZXRNZXRob2Q8VD4odXJsOiBzdHJpbmcsIHNlYXJjaCA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLnBhcmFtcyA9IHNlYXJjaDtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8VD4odXJsLCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnBhdGNoPFQ+KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHBvc3RNZXRob2Q8VD4odXJsLCBib2R5Pywgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXRNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWxldGVNZXRob2Q8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLmRlbGV0ZTxUPih1cmwsIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0TWV0aG9kPFQ+KHR5cGU6IEh0dHBSZXF1ZXN0VHlwZXMsIHVybDogc3RyaW5nLCBib2R5OiBhbnkgPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih1bmRlZmluZWQsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHR5cGUsIHVybCwgYm9keSwgb3B0aW9ucyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucmVxdWVzdDxUPihyZXEpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvciA9IChlcnJvcjogYW55KSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgY29uc3QgYm9keU1lc3NhZ2UgPSAoZXJyb3IgJiYgZXJyb3IuZXJyb3IpID8gZXJyb3IuZXJyb3IubWVzc2FnZSA6ICcnO1xuICAgIGNvbnN0IHN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICBjb25zdCBzdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcblxuICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgaWYgKHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdCkge1xuICAgICAgICAgIHRoaXMuZ29Ub0xvZ2luUGFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDQwOTpcbiAgICAgICAgdGhpcy5zbmFja2Jhci5vcGVuKCdtZXNzYWdlLmh0dHAtc3RhdHVzLjQwOScsICdlcnJvcicpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhyb3dFcnJvcih7IHN0YXR1cywgc3RhdHVzVGV4dCwgbWVzc2FnZSwgYm9keU1lc3NhZ2UgfSk7XG4gIH1cblxuICAvLyAqKioqKioqIC8vXG4gIC8vIEhlbHBlcnMgLy9cbiAgLy8gKioqKioqKiAvL1xuXG4gIHByaXZhdGUgY3JlYXRlRmlsZXNGb3JtRGF0YShmaWxlczogRmlsZVtdKSB7XG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZmlsZXMuZm9yRWFjaCgoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm1JdGVtTmFtZSA9IGluZGV4ID4gMCA/IGBmaWxlLSR7aW5kZXh9YCA6ICdmaWxlJztcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChmb3JtSXRlbU5hbWUsIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBnb1RvTG9naW5QYWdlKCkge1xuICAgIGNvbnN0IG5ha2VkQXBwRG9tYWluID0gd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgIC5yZXBsYWNlKCdodHRwczovLycsICcnKVxuICAgICAgLnJlcGxhY2UoJ2h0dHA6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gsICcnKTtcblxuICAgIGNvbnN0IG5ha2VkQXV0aERvbWFpbiA9IHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdC5zcGxpdCgnPycpWzBdXG4gICAgICAucmVwbGFjZSgnaHR0cHM6Ly8nLCAnJylcbiAgICAgIC5yZXBsYWNlKCdodHRwOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnLy8nLCAnJyk7XG5cbiAgICBpZiAobmFrZWRBcHBEb21haW4gIT09IG5ha2VkQXV0aERvbWFpbikge1xuICAgICAgY29uc3QgYXV0aFVybFdpdGhSZWRpcmVjdCA9IGAke3RoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdH0ke3RoaXMuZ2V0UGFyYW1zRGl2aWRlcigpfXJlZGlyZWN0VXJsPSR7d2luZG93LmxvY2F0aW9uLmhyZWZ9YDtcbiAgICAgIGNvbnNvbGUubG9nKGBEZWNBcGlTZXJ2aWNlOjogTm90IGF1dGhlbnRpY2F0ZWQuIFJlZGlyZWN0aW5nIHRvIGxvZ2luIHBhZ2UgYXQ6ICR7YXV0aFVybFdpdGhSZWRpcmVjdH1gKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXV0aFVybFdpdGhSZWRpcmVjdDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFBhcmFtc0RpdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjQ29uZmlnLmNvbmZpZy5hdXRoSG9zdC5zcGxpdCgnPycpLmxlbmd0aCA+IDEgPyAnJicgOiAnPyc7XG4gIH1cblxuICBwcml2YXRlIHRyeVRvTG9hZFNpZ25lZEluVXNlcigpIHtcbiAgICBjb25zdCBjYWxsID0gdGhpcy5mZXRjaEN1cnJlbnRMb2dnZWRVc2VyKCkudG9Qcm9taXNlKCk7XG4gICAgY2FsbC50aGVuKGFjY291bnQgPT4ge1xuICAgICAgY29uc29sZS5sb2coYERlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXplZCBhcyAke2FjY291bnQubmFtZX1gKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICBjb25zb2xlLmxvZygnRGVjb3JhQXBpU2VydmljZTo6IEluaXRpYWxpemVkIGFzIG5vdCBsb2dnZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXphdGlvbiBFcnJvci4gQ291bGQgcmV0cmlldmUgdXNlciBhY2NvdW50JywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHByaXZhdGUgbmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih0eXBlPzogc3RyaW5nLCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpIHtcbiAgICBoZWFkZXJzID0gaGVhZGVycyB8fCBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICBjb25zdCBjdXN0b21pemVkQ29udGVudFR5cGUgPSBoZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKCFjdXN0b21pemVkQ29udGVudFR5cGUgJiYgdHlwZSkge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCB0eXBlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2Vzc2lvblRva2VuKSB7XG4gICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ1gtQXV0aC1Ub2tlbicsIHRoaXMuc2Vzc2lvblRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhdFNlc3Npb25Ub2tlbihyZXMpIHtcbiAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHJlcyAmJiByZXMuc2Vzc2lvbiA/IHJlcy5zZXNzaW9uLmlkIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwcml2YXRlIGdldFJlc291cmNlVXJsKHBhdGgpIHtcblxuICAgIGNvbnN0IGJhc2VQYXRoID0gdGhpcy5kZWNDb25maWcuY29uZmlnLnVzZU1vY2tBcGkgPyB0aGlzLmRlY0NvbmZpZy5jb25maWcubW9ja0FwaUhvc3QgOiB0aGlzLmRlY0NvbmZpZy5jb25maWcuYXBpO1xuXG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXlxcL3xcXC8kL2csICcnKTtcblxuICAgIHJldHVybiBgJHtiYXNlUGF0aH0vJHtwYXRofWA7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Vc2VyKCkge1xuICAgIHRoaXMudXNlclN1YnNjcmlwaW9uID0gdGhpcy51c2VyJC5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvVXNlcigpIHtcbiAgICB0aGlzLnVzZXJTdWJzY3JpcGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLypcbiAgKiBTaGFyZSBPYnNlcnZhYmxlXG4gICpcbiAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIHNoYXJlIHRoZSBhY3R1YWwgZGF0YSB2YWx1ZXMgYW5kIG5vdCBqdXN0IHRoZSBvYnNlcnZhYmxlIGluc3RhbmNlXG4gICpcbiAgKiBUbyByZXVzZSBhIHNpbmdsZSwgY29tbW9uIHN0cmVhbSBhbmQgYXZvaWQgbWFraW5nIGFub3RoZXIgc3Vic2NyaXB0aW9uIHRvIHRoZSBzZXJ2ZXIgcHJvdmlkaW5nIHRoYXQgZGF0YS5cbiAgKlxuICAqL1xuICBwcml2YXRlIHNoYXJlT2JzZXJ2YWJsZShjYWxsOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICByZXR1cm4gY2FsbC5waXBlKHNoYXJlKCkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIElucHV0LCBmb3J3YXJkUmVmLCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwLCBzdGFydFdpdGgsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExhYmVsRnVuY3Rpb24sIFZhbHVlRnVuY3Rpb24sIFNlbGVjdGlvbkV2ZW50LCBDdXN0b21GZXRjaEZ1bmN0aW9uIH0gZnJvbSAnLi9hdXRvY29tcGxldGUubW9kZWxzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICAjdGVybUlucHV0XG4gICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIlxuICAgIFtmb3JtQ29udHJvbF09XCJhdXRvY29tcGxldGVJbnB1dFwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgIChrZXl1cC5lbnRlcik9XCJvbkVudGVyQnV0dG9uKCRldmVudClcIlxuICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcbiAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgIHJlYWRvbmx5XG4gICAgb25mb2N1cz1cInRoaXMucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpO1wiPlxuXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjbGVhcih0cnVlKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmICFyZXF1aXJlZCAmJiBhdXRvY29tcGxldGVJbnB1dC52YWx1ZVwiPlxuICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwicmVzZXQoKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmIHZhbHVlICE9PSB3cml0dGVuVmFsdWVcIj5cbiAgICAgIDxtYXQtaWNvbj5yZXBsYXk8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuXG4gIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG9jb21wbGV0ZT1cIm1hdEF1dG9jb21wbGV0ZVwiXG4gIFtkaXNwbGF5V2l0aF09XCJleHRyYWN0TGFiZWxcIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib25PcHRpb25TZWxlY3RlZCgkZXZlbnQpXCJcbiAgbmFtZT1cImF1dG9jb21wbGV0ZVZhbHVlXCI+XG4gICAgPG1hdC1vcHRpb24gKm5nSWY9XCIhcmVxdWlyZWRcIiBbdmFsdWVdPVwiXCI+PC9tYXQtb3B0aW9uPlxuXG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgKG9wdGlvbnMkIHwgYXN5bmMpXCIgW3ZhbHVlXT1cIml0ZW1cIj5cbiAgICAgIHt7IGV4dHJhY3RMYWJlbChpdGVtKSB9fVxuICAgIDwvbWF0LW9wdGlvbj5cbiAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQFZpZXdDaGlsZChNYXRBdXRvY29tcGxldGVUcmlnZ2VyKSAgYXV0b2NvbXBsZXRlVHJpZ2dlcjogTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcjtcblxuICBhdXRvY29tcGxldGVJbnB1dDogRm9ybUNvbnRyb2w7XG5cbiAgb3B0aW9ucyQ6IE9ic2VydmFibGU8YW55W10+O1xuXG4gIHdyaXR0ZW5WYWx1ZTogYW55O1xuXG4gIC8vIFBhcmFtc1xuICBASW5wdXQoKSBjdXN0b21GZXRjaEZ1bmN0aW9uOiBDdXN0b21GZXRjaEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGVuZHBvaW50O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZUlucHV0KSB7XG4gICAgICBpZiAodikge1xuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmRpc2FibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBsYWJlbEZuOiBMYWJlbEZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIGxhYmVsQXR0cjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnYXV0b2NvbXBsZXRlSW5wdXQnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKHY6IGFueVtdKSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IHY7XG4gICAgdGhpcy5pbm5lck9wdGlvbnMgPSB2O1xuICB9XG4gIGdldCBvcHRpb25zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgfVxuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgdmFsdWVGbjogVmFsdWVGdW5jdGlvbjtcblxuICBASW5wdXQoKSB2YWx1ZUF0dHI6IHN0cmluZztcblxuICAvLyBFdmVudHNcbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4oKTtcblxuICBAT3V0cHV0KCkgZW50ZXJCdXR0b246IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PigpO1xuXG4gIC8vIFZpZXcgZWxlbWVudHNcbiAgQFZpZXdDaGlsZCgndGVybUlucHV0JykgdGVybUlucHV0O1xuXG4gIC8vIHByaXZhdGUgZGF0YTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55W107XG5cbiAgcHJpdmF0ZSBpbm5lck9wdGlvbnM6IGFueVtdID0gW107XG5cblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuY3JlYXRlSW5wdXQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRldGVjdFJlcXVpcmVkRGF0YSgpXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9TZWFyY2hBbmRTZXRPcHRpb25zT2JzZXJ2YWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBWQUxVRVxuICAqL1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5zZXRJbm5lclZhbHVlKHYpO1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICB0aGlzLmxvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZSh2YWx1ZSlcbiAgICAgIC50aGVuKChvcHRpb25zKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbk9wdGlvblNlbGVjdGVkKCRldmVudCkge1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gJGV2ZW50Lm9wdGlvbi52YWx1ZTtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvblZhbHVlID0gdGhpcy5leHRyYWN0VmFsdWUoc2VsZWN0ZWRPcHRpb24pO1xuICAgIGlmIChzZWxlY3RlZE9wdGlvblZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gc2VsZWN0ZWRPcHRpb25WYWx1ZTtcbiAgICAgIHRoaXMub3B0aW9uU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICBvcHRpb246IHNlbGVjdGVkT3B0aW9uLFxuICAgICAgICBvcHRpb25zOiB0aGlzLmlubmVyT3B0aW9ucyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uRW50ZXJCdXR0b24oJGV2ZW50KSB7XG4gICAgdGhpcy5lbnRlckJ1dHRvbi5lbWl0KCRldmVudCk7XG4gIH1cblxuICBzZXRGb2N1cygpIHtcbiAgICB0aGlzLnRlcm1JbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBvcGVuUGFuZWwoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVUcmlnZ2VyLm9wZW5QYW5lbCgpO1xuICB9XG5cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgb25CbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGNsZWFyKHJlb3BlbiA9IGZhbHNlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LnNldFZhbHVlKCcnKTtcbiAgICBpZiAodGhpcy53cml0dGVuVmFsdWUgPT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgICB9XG4gICAgaWYgKHJlb3Blbikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlblBhbmVsKCk7XG4gICAgICB9LCAxKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy53cml0dGVuVmFsdWU7XG4gICAgdGhpcy5zZXRJbm5lclZhbHVlKHRoaXMud3JpdHRlblZhbHVlKTtcbiAgICB0aGlzLnJlc2V0SW5wdXRDb250cm9sKCk7XG4gIH1cblxuICBleHRyYWN0TGFiZWw6IExhYmVsRnVuY3Rpb24gPSAoaXRlbTogYW55KTogc3RyaW5nID0+IHtcbiAgICBsZXQgbGFiZWwgPSBpdGVtOyAvLyB1c2UgdGhlIG9iamVjdCBpdHNlbGYgaWYgbm8gbGFiZWwgZnVuY3Rpb24gb3IgYXR0cmlidXRlIGlzIHByb3ZpZGVkXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLmxhYmVsRm4pIHsgLy8gVXNlIGN1c3RvbSBsYWJlbCBmdW5jdGlvbiBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IHRoaXMubGFiZWxGbihpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sYWJlbEF0dHIpIHsgLy8gVXNlIG9iamVjdCBsYWJlbCBhdHRyaWJ1dGUgaWYgcHJvdmlkZWRcbiAgICAgICAgbGFiZWwgPSBpdGVtW3RoaXMubGFiZWxBdHRyXSB8fCB1bmRlZmluZWQ7XG5cbiAgICAgIH1cbiAgICB9XG4gICAgbGFiZWwgPSB0aGlzLmVuc3VyZVN0cmluZyhsYWJlbCk7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUmVtb3RlT2JqZWN0QnlXcml0dGVuVmFsdWUod3JpdHRlblZhbHVlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh3cml0dGVuVmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh3cml0dGVuVmFsdWUpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgIHJlc29sdmUod3JpdHRlblZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHdyaXR0ZW5WYWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdFJlcXVpcmVkRGF0YSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgZXJyb3I6IHN0cmluZztcbiAgICAgIGlmICghdGhpcy5lbmRwb2ludCAmJiAhdGhpcy5vcHRpb25zICYmICF0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24pIHtcbiAgICAgICAgZXJyb3IgPSAnTm8gZW5kcG9pbnQgfCBvcHRpb25zIHwgY3VzdG9tRmV0Y2hGdW5jdGlvbiBzZXQuIFlvdSBtdXN0IHByb3ZpZGUgb25lIG9mIHRoZW0gdG8gYmUgYWJsZSB0byB1c2UgdGhlIEF1dG9jb21wbGV0ZSc7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5yYWlzZUVycm9yKGVycm9yKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRJbnB1dENvbnRyb2woKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5tYXJrQXNQcmlzdGluZSgpO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubWFya0FzVW50b3VjaGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RWYWx1ZTogVmFsdWVGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBhbnkgPT4ge1xuICAgIGxldCB2YWx1ZSA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyB2YWx1ZSBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMudmFsdWVGbikgeyAvLyBVc2UgY3VzdG9tIHZhbHVlIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZUZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlQXR0cikgeyAvLyBVc2Ugb2JqZWN0IHZhbHVlIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICB2YWx1ZSA9IGl0ZW1bdGhpcy52YWx1ZUF0dHJdIHx8IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wYXJlQXNTdHJpbmcodjEsIHYyKSB7XG4gICAgY29uc3Qgc3RyaW5nMSA9IHRoaXMuZW5zdXJlU3RyaW5nKHYxKTtcbiAgICBjb25zdCBzdHJpbmcyID0gdGhpcy5lbnN1cmVTdHJpbmcodjIpO1xuICAgIHJldHVybiBzdHJpbmcxID09PSBzdHJpbmcyO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVTdHJpbmcodikge1xuICAgIGlmICh0eXBlb2YgdiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc05hTih2KSkge1xuICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ID0gYCR7dn1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5uZXJWYWx1ZSh2OiBhbnkpIHtcbiAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZUJhc2VkT25Jbm5lclZhbHVlKHYpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbnB1dFZhbHVlQmFzZWRPbklubmVyVmFsdWUodjogYW55KSB7XG4gICAgY29uc3Qgb3B0aW9uID0gdGhpcy5nZXRPcHRpb25CYXNlZE9uVmFsdWUodik7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5zZXRWYWx1ZShvcHRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcHRpb25CYXNlZE9uVmFsdWUodjogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJPcHRpb25zLmZpbmQoaXRlbSA9PiB7XG4gICAgICBjb25zdCBpdGVtVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShpdGVtKTtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBc1N0cmluZyhpdGVtVmFsdWUsIHYpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbnB1dCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0ID0gbmV3IEZvcm1Db250cm9sKCcnKTtcblxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0LmRpc2FibGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvU2VhcmNoQW5kU2V0T3B0aW9uc09ic2VydmFibGUoKSB7XG4gICAgdGhpcy5vcHRpb25zJCA9IHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQudmFsdWVDaGFuZ2VzXG4gICAgLnBpcGUoXG4gICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgc3dpdGNoTWFwKCh0ZXh0U2VhcmNoOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgaXNTdHJpbmdUZXJtID0gdHlwZW9mIHRleHRTZWFyY2ggPT09ICdzdHJpbmcnO1xuICAgICAgICBpZiAoaXNTdHJpbmdUZXJtKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoQmFzZWRGZXRjaGluZ1R5cGUodGV4dFNlYXJjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9mKHRoaXMuaW5uZXJPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlYXJjaEluTG9jYWxPcHRpb25zKHRleHRTZWFyY2gpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXN0b21GZXRjaEZ1bmN0aW9uKHRleHRTZWFyY2gpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChvcHRpb25zID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBib2R5ID0gdGV4dFNlYXJjaCA/IHsgdGV4dFNlYXJjaCB9IDogdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5nZXQ8YW55W10+KHRoaXMuZW5kcG9pbnQsIGJvZHkpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgob3B0aW9uczogYW55W10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VhcmNoSW5Mb2NhbE9wdGlvbnModGVybTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGVybVN0cmluZyA9IGAke3Rlcm19YDtcblxuICAgIGxldCBmaWx0ZXJlZERhdGEgPSB0aGlzLmlubmVyT3B0aW9ucztcblxuICAgIGlmICh0ZXJtU3RyaW5nKSB7XG4gICAgICBmaWx0ZXJlZERhdGEgPSB0aGlzLmlubmVyT3B0aW9uc1xuICAgICAgLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgY29uc3QgbGFiZWw6IHN0cmluZyA9IHRoaXMuZXh0cmFjdExhYmVsKGl0ZW0pO1xuICAgICAgICBjb25zdCBsb3dlckNhc2VMYWJlbCA9IGxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZVRlcm0gPSB0ZXJtU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBsb3dlckNhc2VMYWJlbC5zZWFyY2gobG93ZXJDYXNlVGVybSkgPj0gMDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBvZihmaWx0ZXJlZERhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSByYWlzZUVycm9yKGVycm9yOiBzdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCBFcnJvcjo6IFRoZSBhdXRvY29tcGxldGUgd2l0aCBuYW1lIFwiJHt0aGlzLm5hbWV9XCIgaGFkIHRoZSBmb2xsb3cgcHJvYmxlbTogJHtlcnJvcn1gKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUuY29tcG9uZW50JztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cFVybEVuY29kaW5nQ29kZWMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuY29uc3QgQUNDT1VOVFNfRU5EUE9JTlQgPSAnYWNjb3VudHMvb3B0aW9ucyc7XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuY29uc3QgQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZUFjY291bnRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1hY2NvdW50JyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWF1dG9jb21wbGV0ZSAqbmdJZj1cImVuZHBvaW50XCJcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbltuYW1lXT1cIm5hbWVcIlxuW2xhYmVsRm5dPVwibGFiZWxGblwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcblt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbihibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1JPTEVTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUFjY291bnRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgZW5kcG9pbnQ6IHN0cmluZztcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgdHlwZXModjogc3RyaW5nW10pIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fdHlwZXMpIHtcbiAgICAgIHRoaXMuX3R5cGVzID0gdjtcblxuICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy5zZXRSb2xlc1BhcmFtcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCB0eXBlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGVzO1xuICB9XG5cbiAgX3R5cGVzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdBY2NvdW50IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnQWNjb3VudCBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0Um9sZXNQYXJhbXMoKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJmAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGxhYmVsRm4oYWNjb3VudCkge1xuICAgIHJldHVybiBgJHthY2NvdW50LnZhbHVlfSAjJHthY2NvdW50LmtleX1gO1xuICB9XG5cbiAgc2V0Um9sZXNQYXJhbXMoKSB7XG4gICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgbGV0IGVuZHBvaW50ID0gYCR7QUNDT1VOVFNfRU5EUE9JTlR9YDtcblxuICAgIGlmICh0aGlzLnR5cGVzICYmIHRoaXMudHlwZXMubGVuZ3RoKSB7XG4gICAgICBwYXJhbXMucHVzaChgcm9sZXM9JHtlbmNvZGVVUkkoSlNPTi5zdHJpbmdpZnkodGhpcy50eXBlcykpfWApO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMubGVuZ3RoKSB7XG4gICAgICBlbmRwb2ludCArPSBgPyR7cGFyYW1zLmpvaW4oJyYnKX1gO1xuICAgIH1cblxuICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtYWNjb3VudC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVBY2NvdW50TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfQ09NUEFOWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtY29tcGFueScsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bbmFtZV09XCJuYW1lXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbltlbmRwb2ludF09XCJlbmRwb2ludFwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcbltsYWJlbEZuXT1cImxhYmVsRm5cIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfQ09NUEFOWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50ID0gJ2NvbXBhbmllcy9vcHRpb25zJztcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0NvbXBhbnkgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdDb21wYW55IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1jb21wYW55LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvbXBhbnlNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfQ09VTlRSWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtY291bnRyeScsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bb3B0aW9uc109XCIoY291bnRyaWVzJCB8IGFzeW5jKVwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcbltsYWJlbEZuXT1cImxhYmVsRm5cIlxuW3ZhbHVlRm5dPVwidmFsdWVGblwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9DT1VOVFJZX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgY291bnRyaWVzJDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIEBJbnB1dCgpIGxhbmc6ICdlbicgfCAncHQtYnInID0gJ2VuJztcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0NvdW50cnkgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdDb3VudHJ5IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvdW50cmllcyQgPSBvZihGQUtFX0RBVEEpO1xuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGxhYmVsRm4gPSAoaXRlbSkgPT4ge1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5uYW1lIDogaXRlbTtcbiAgfVxuXG4gIHZhbHVlRm4gPSAoaXRlbSkgPT4ge1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5jb2RlIDogaXRlbTtcbiAgfVxuXG59XG5cbmNvbnN0IEZBS0VfREFUQSA9IFt7ICdjb2RlJzogJ0FEJywgJ25hbWUnOiAnQW5kb3JyYScgfSwgeyAnY29kZSc6ICdBRScsICduYW1lJzogJ1VuaXRlZCBBcmFiIEVtaXJhdGVzJyB9LCB7ICdjb2RlJzogJ0FGJywgJ25hbWUnOiAnQWZnaGFuaXN0YW4nIH0sIHsgJ2NvZGUnOiAnQUcnLCAnbmFtZSc6ICdBbnRpZ3VhIGFuZCBCYXJidWRhJyB9LCB7ICdjb2RlJzogJ0FJJywgJ25hbWUnOiAnQW5ndWlsbGEnIH0sIHsgJ2NvZGUnOiAnQUwnLCAnbmFtZSc6ICdBbGJhbmlhJyB9LCB7ICdjb2RlJzogJ0FNJywgJ25hbWUnOiAnQXJtZW5pYScgfSwgeyAnY29kZSc6ICdBTicsICduYW1lJzogJ05ldGhlcmxhbmRzIEFudGlsbGVzJyB9LCB7ICdjb2RlJzogJ0FPJywgJ25hbWUnOiAnQW5nb2xhJyB9LCB7ICdjb2RlJzogJ0FRJywgJ25hbWUnOiAnQW50YXJjdGljYScgfSwgeyAnY29kZSc6ICdBUicsICduYW1lJzogJ0FyZ2VudGluYScgfSwgeyAnY29kZSc6ICdBUycsICduYW1lJzogJ0FtZXJpY2FuIFNhbW9hJyB9LCB7ICdjb2RlJzogJ0FUJywgJ25hbWUnOiAnQXVzdHJpYScgfSwgeyAnY29kZSc6ICdBVScsICduYW1lJzogJ0F1c3RyYWxpYScgfSwgeyAnY29kZSc6ICdBVycsICduYW1lJzogJ0FydWJhJyB9LCB7ICdjb2RlJzogJ0FYJywgJ25hbWUnOiAnw4PChWxhbmQgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdBWicsICduYW1lJzogJ0F6ZXJiYWlqYW4nIH0sIHsgJ2NvZGUnOiAnQkEnLCAnbmFtZSc6ICdCb3NuaWEgYW5kIEhlcnplZ292aW5hJyB9LCB7ICdjb2RlJzogJ0JCJywgJ25hbWUnOiAnQmFyYmFkb3MnIH0sIHsgJ2NvZGUnOiAnQkQnLCAnbmFtZSc6ICdCYW5nbGFkZXNoJyB9LCB7ICdjb2RlJzogJ0JFJywgJ25hbWUnOiAnQmVsZ2l1bScgfSwgeyAnY29kZSc6ICdCRicsICduYW1lJzogJ0J1cmtpbmEgRmFzbycgfSwgeyAnY29kZSc6ICdCRycsICduYW1lJzogJ0J1bGdhcmlhJyB9LCB7ICdjb2RlJzogJ0JIJywgJ25hbWUnOiAnQmFocmFpbicgfSwgeyAnY29kZSc6ICdCSScsICduYW1lJzogJ0J1cnVuZGknIH0sIHsgJ2NvZGUnOiAnQkonLCAnbmFtZSc6ICdCZW5pbicgfSwgeyAnY29kZSc6ICdCTCcsICduYW1lJzogJ1NhaW50IEJhcnRow4PCqWxlbXknIH0sIHsgJ2NvZGUnOiAnQk0nLCAnbmFtZSc6ICdCZXJtdWRhJyB9LCB7ICdjb2RlJzogJ0JOJywgJ25hbWUnOiAnQnJ1bmVpJyB9LCB7ICdjb2RlJzogJ0JPJywgJ25hbWUnOiAnQm9saXZpYScgfSwgeyAnY29kZSc6ICdCUScsICduYW1lJzogJ0JvbmFpcmUsIFNpbnQgRXVzdGF0aXVzIGFuZCBTYWJhJyB9LCB7ICdjb2RlJzogJ0JSJywgJ25hbWUnOiAnQnJhemlsJyB9LCB7ICdjb2RlJzogJ0JTJywgJ25hbWUnOiAnQmFoYW1hcycgfSwgeyAnY29kZSc6ICdCVCcsICduYW1lJzogJ0JodXRhbicgfSwgeyAnY29kZSc6ICdCVicsICduYW1lJzogJ0JvdXZldCBJc2xhbmQnIH0sIHsgJ2NvZGUnOiAnQlcnLCAnbmFtZSc6ICdCb3Rzd2FuYScgfSwgeyAnY29kZSc6ICdCWScsICduYW1lJzogJ0JlbGFydXMnIH0sIHsgJ2NvZGUnOiAnQlonLCAnbmFtZSc6ICdCZWxpemUnIH0sIHsgJ2NvZGUnOiAnQ0EnLCAnbmFtZSc6ICdDYW5hZGEnIH0sIHsgJ2NvZGUnOiAnQ0MnLCAnbmFtZSc6ICdDb2NvcyBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0NEJywgJ25hbWUnOiAnVGhlIERlbW9jcmF0aWMgUmVwdWJsaWMgT2YgQ29uZ28nIH0sIHsgJ2NvZGUnOiAnQ0YnLCAnbmFtZSc6ICdDZW50cmFsIEFmcmljYW4gUmVwdWJsaWMnIH0sIHsgJ2NvZGUnOiAnQ0cnLCAnbmFtZSc6ICdDb25nbycgfSwgeyAnY29kZSc6ICdDSCcsICduYW1lJzogJ1N3aXR6ZXJsYW5kJyB9LCB7ICdjb2RlJzogJ0NJJywgJ25hbWUnOiAnQ8ODwrR0ZSBkXFwnSXZvaXJlJyB9LCB7ICdjb2RlJzogJ0NLJywgJ25hbWUnOiAnQ29vayBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0NMJywgJ25hbWUnOiAnQ2hpbGUnIH0sIHsgJ2NvZGUnOiAnQ00nLCAnbmFtZSc6ICdDYW1lcm9vbicgfSwgeyAnY29kZSc6ICdDTicsICduYW1lJzogJ0NoaW5hJyB9LCB7ICdjb2RlJzogJ0NPJywgJ25hbWUnOiAnQ29sb21iaWEnIH0sIHsgJ2NvZGUnOiAnQ1InLCAnbmFtZSc6ICdDb3N0YSBSaWNhJyB9LCB7ICdjb2RlJzogJ0NVJywgJ25hbWUnOiAnQ3ViYScgfSwgeyAnY29kZSc6ICdDVicsICduYW1lJzogJ0NhcGUgVmVyZGUnIH0sIHsgJ2NvZGUnOiAnQ1cnLCAnbmFtZSc6ICdDdXJhw4PCp2FvJyB9LCB7ICdjb2RlJzogJ0NYJywgJ25hbWUnOiAnQ2hyaXN0bWFzIElzbGFuZCcgfSwgeyAnY29kZSc6ICdDWScsICduYW1lJzogJ0N5cHJ1cycgfSwgeyAnY29kZSc6ICdDWicsICduYW1lJzogJ0N6ZWNoIFJlcHVibGljJyB9LCB7ICdjb2RlJzogJ0RFJywgJ25hbWUnOiAnR2VybWFueScgfSwgeyAnY29kZSc6ICdESicsICduYW1lJzogJ0RqaWJvdXRpJyB9LCB7ICdjb2RlJzogJ0RLJywgJ25hbWUnOiAnRGVubWFyaycgfSwgeyAnY29kZSc6ICdETScsICduYW1lJzogJ0RvbWluaWNhJyB9LCB7ICdjb2RlJzogJ0RPJywgJ25hbWUnOiAnRG9taW5pY2FuIFJlcHVibGljJyB9LCB7ICdjb2RlJzogJ0RaJywgJ25hbWUnOiAnQWxnZXJpYScgfSwgeyAnY29kZSc6ICdFQycsICduYW1lJzogJ0VjdWFkb3InIH0sIHsgJ2NvZGUnOiAnRUUnLCAnbmFtZSc6ICdFc3RvbmlhJyB9LCB7ICdjb2RlJzogJ0VHJywgJ25hbWUnOiAnRWd5cHQnIH0sIHsgJ2NvZGUnOiAnRUgnLCAnbmFtZSc6ICdXZXN0ZXJuIFNhaGFyYScgfSwgeyAnY29kZSc6ICdFUicsICduYW1lJzogJ0VyaXRyZWEnIH0sIHsgJ2NvZGUnOiAnRVMnLCAnbmFtZSc6ICdTcGFpbicgfSwgeyAnY29kZSc6ICdFVCcsICduYW1lJzogJ0V0aGlvcGlhJyB9LCB7ICdjb2RlJzogJ0ZJJywgJ25hbWUnOiAnRmlubGFuZCcgfSwgeyAnY29kZSc6ICdGSicsICduYW1lJzogJ0ZpamknIH0sIHsgJ2NvZGUnOiAnRksnLCAnbmFtZSc6ICdGYWxrbGFuZCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0ZNJywgJ25hbWUnOiAnTWljcm9uZXNpYScgfSwgeyAnY29kZSc6ICdGTycsICduYW1lJzogJ0Zhcm9lIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnRlInLCAnbmFtZSc6ICdGcmFuY2UnIH0sIHsgJ2NvZGUnOiAnR0EnLCAnbmFtZSc6ICdHYWJvbicgfSwgeyAnY29kZSc6ICdHQicsICduYW1lJzogJ1VuaXRlZCBLaW5nZG9tJyB9LCB7ICdjb2RlJzogJ0dEJywgJ25hbWUnOiAnR3JlbmFkYScgfSwgeyAnY29kZSc6ICdHRScsICduYW1lJzogJ0dlb3JnaWEnIH0sIHsgJ2NvZGUnOiAnR0YnLCAnbmFtZSc6ICdGcmVuY2ggR3VpYW5hJyB9LCB7ICdjb2RlJzogJ0dHJywgJ25hbWUnOiAnR3Vlcm5zZXknIH0sIHsgJ2NvZGUnOiAnR0gnLCAnbmFtZSc6ICdHaGFuYScgfSwgeyAnY29kZSc6ICdHSScsICduYW1lJzogJ0dpYnJhbHRhcicgfSwgeyAnY29kZSc6ICdHTCcsICduYW1lJzogJ0dyZWVubGFuZCcgfSwgeyAnY29kZSc6ICdHTScsICduYW1lJzogJ0dhbWJpYScgfSwgeyAnY29kZSc6ICdHTicsICduYW1lJzogJ0d1aW5lYScgfSwgeyAnY29kZSc6ICdHUCcsICduYW1lJzogJ0d1YWRlbG91cGUnIH0sIHsgJ2NvZGUnOiAnR1EnLCAnbmFtZSc6ICdFcXVhdG9yaWFsIEd1aW5lYScgfSwgeyAnY29kZSc6ICdHUicsICduYW1lJzogJ0dyZWVjZScgfSwgeyAnY29kZSc6ICdHUycsICduYW1lJzogJ1NvdXRoIEdlb3JnaWEgQW5kIFRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0dUJywgJ25hbWUnOiAnR3VhdGVtYWxhJyB9LCB7ICdjb2RlJzogJ0dVJywgJ25hbWUnOiAnR3VhbScgfSwgeyAnY29kZSc6ICdHVycsICduYW1lJzogJ0d1aW5lYS1CaXNzYXUnIH0sIHsgJ2NvZGUnOiAnR1knLCAnbmFtZSc6ICdHdXlhbmEnIH0sIHsgJ2NvZGUnOiAnSEsnLCAnbmFtZSc6ICdIb25nIEtvbmcnIH0sIHsgJ2NvZGUnOiAnSE0nLCAnbmFtZSc6ICdIZWFyZCBJc2xhbmQgQW5kIE1jRG9uYWxkIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnSE4nLCAnbmFtZSc6ICdIb25kdXJhcycgfSwgeyAnY29kZSc6ICdIUicsICduYW1lJzogJ0Nyb2F0aWEnIH0sIHsgJ2NvZGUnOiAnSFQnLCAnbmFtZSc6ICdIYWl0aScgfSwgeyAnY29kZSc6ICdIVScsICduYW1lJzogJ0h1bmdhcnknIH0sIHsgJ2NvZGUnOiAnSUQnLCAnbmFtZSc6ICdJbmRvbmVzaWEnIH0sIHsgJ2NvZGUnOiAnSUUnLCAnbmFtZSc6ICdJcmVsYW5kJyB9LCB7ICdjb2RlJzogJ0lMJywgJ25hbWUnOiAnSXNyYWVsJyB9LCB7ICdjb2RlJzogJ0lNJywgJ25hbWUnOiAnSXNsZSBPZiBNYW4nIH0sIHsgJ2NvZGUnOiAnSU4nLCAnbmFtZSc6ICdJbmRpYScgfSwgeyAnY29kZSc6ICdJTycsICduYW1lJzogJ0JyaXRpc2ggSW5kaWFuIE9jZWFuIFRlcnJpdG9yeScgfSwgeyAnY29kZSc6ICdJUScsICduYW1lJzogJ0lyYXEnIH0sIHsgJ2NvZGUnOiAnSVInLCAnbmFtZSc6ICdJcmFuJyB9LCB7ICdjb2RlJzogJ0lTJywgJ25hbWUnOiAnSWNlbGFuZCcgfSwgeyAnY29kZSc6ICdJVCcsICduYW1lJzogJ0l0YWx5JyB9LCB7ICdjb2RlJzogJ0pFJywgJ25hbWUnOiAnSmVyc2V5JyB9LCB7ICdjb2RlJzogJ0pNJywgJ25hbWUnOiAnSmFtYWljYScgfSwgeyAnY29kZSc6ICdKTycsICduYW1lJzogJ0pvcmRhbicgfSwgeyAnY29kZSc6ICdKUCcsICduYW1lJzogJ0phcGFuJyB9LCB7ICdjb2RlJzogJ0tFJywgJ25hbWUnOiAnS2VueWEnIH0sIHsgJ2NvZGUnOiAnS0cnLCAnbmFtZSc6ICdLeXJneXpzdGFuJyB9LCB7ICdjb2RlJzogJ0tIJywgJ25hbWUnOiAnQ2FtYm9kaWEnIH0sIHsgJ2NvZGUnOiAnS0knLCAnbmFtZSc6ICdLaXJpYmF0aScgfSwgeyAnY29kZSc6ICdLTScsICduYW1lJzogJ0NvbW9yb3MnIH0sIHsgJ2NvZGUnOiAnS04nLCAnbmFtZSc6ICdTYWludCBLaXR0cyBBbmQgTmV2aXMnIH0sIHsgJ2NvZGUnOiAnS1AnLCAnbmFtZSc6ICdOb3J0aCBLb3JlYScgfSwgeyAnY29kZSc6ICdLUicsICduYW1lJzogJ1NvdXRoIEtvcmVhJyB9LCB7ICdjb2RlJzogJ0tXJywgJ25hbWUnOiAnS3V3YWl0JyB9LCB7ICdjb2RlJzogJ0tZJywgJ25hbWUnOiAnQ2F5bWFuIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnS1onLCAnbmFtZSc6ICdLYXpha2hzdGFuJyB9LCB7ICdjb2RlJzogJ0xBJywgJ25hbWUnOiAnTGFvcycgfSwgeyAnY29kZSc6ICdMQicsICduYW1lJzogJ0xlYmFub24nIH0sIHsgJ2NvZGUnOiAnTEMnLCAnbmFtZSc6ICdTYWludCBMdWNpYScgfSwgeyAnY29kZSc6ICdMSScsICduYW1lJzogJ0xpZWNodGVuc3RlaW4nIH0sIHsgJ2NvZGUnOiAnTEsnLCAnbmFtZSc6ICdTcmkgTGFua2EnIH0sIHsgJ2NvZGUnOiAnTFInLCAnbmFtZSc6ICdMaWJlcmlhJyB9LCB7ICdjb2RlJzogJ0xTJywgJ25hbWUnOiAnTGVzb3RobycgfSwgeyAnY29kZSc6ICdMVCcsICduYW1lJzogJ0xpdGh1YW5pYScgfSwgeyAnY29kZSc6ICdMVScsICduYW1lJzogJ0x1eGVtYm91cmcnIH0sIHsgJ2NvZGUnOiAnTFYnLCAnbmFtZSc6ICdMYXR2aWEnIH0sIHsgJ2NvZGUnOiAnTFknLCAnbmFtZSc6ICdMaWJ5YScgfSwgeyAnY29kZSc6ICdNQScsICduYW1lJzogJ01vcm9jY28nIH0sIHsgJ2NvZGUnOiAnTUMnLCAnbmFtZSc6ICdNb25hY28nIH0sIHsgJ2NvZGUnOiAnTUQnLCAnbmFtZSc6ICdNb2xkb3ZhJyB9LCB7ICdjb2RlJzogJ01FJywgJ25hbWUnOiAnTW9udGVuZWdybycgfSwgeyAnY29kZSc6ICdNRicsICduYW1lJzogJ1NhaW50IE1hcnRpbicgfSwgeyAnY29kZSc6ICdNRycsICduYW1lJzogJ01hZGFnYXNjYXInIH0sIHsgJ2NvZGUnOiAnTUgnLCAnbmFtZSc6ICdNYXJzaGFsbCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ01LJywgJ25hbWUnOiAnTWFjZWRvbmlhJyB9LCB7ICdjb2RlJzogJ01MJywgJ25hbWUnOiAnTWFsaScgfSwgeyAnY29kZSc6ICdNTScsICduYW1lJzogJ015YW5tYXInIH0sIHsgJ2NvZGUnOiAnTU4nLCAnbmFtZSc6ICdNb25nb2xpYScgfSwgeyAnY29kZSc6ICdNTycsICduYW1lJzogJ01hY2FvJyB9LCB7ICdjb2RlJzogJ01QJywgJ25hbWUnOiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ01RJywgJ25hbWUnOiAnTWFydGluaXF1ZScgfSwgeyAnY29kZSc6ICdNUicsICduYW1lJzogJ01hdXJpdGFuaWEnIH0sIHsgJ2NvZGUnOiAnTVMnLCAnbmFtZSc6ICdNb250c2VycmF0JyB9LCB7ICdjb2RlJzogJ01UJywgJ25hbWUnOiAnTWFsdGEnIH0sIHsgJ2NvZGUnOiAnTVUnLCAnbmFtZSc6ICdNYXVyaXRpdXMnIH0sIHsgJ2NvZGUnOiAnTVYnLCAnbmFtZSc6ICdNYWxkaXZlcycgfSwgeyAnY29kZSc6ICdNVycsICduYW1lJzogJ01hbGF3aScgfSwgeyAnY29kZSc6ICdNWCcsICduYW1lJzogJ01leGljbycgfSwgeyAnY29kZSc6ICdNWScsICduYW1lJzogJ01hbGF5c2lhJyB9LCB7ICdjb2RlJzogJ01aJywgJ25hbWUnOiAnTW96YW1iaXF1ZScgfSwgeyAnY29kZSc6ICdOQScsICduYW1lJzogJ05hbWliaWEnIH0sIHsgJ2NvZGUnOiAnTkMnLCAnbmFtZSc6ICdOZXcgQ2FsZWRvbmlhJyB9LCB7ICdjb2RlJzogJ05FJywgJ25hbWUnOiAnTmlnZXInIH0sIHsgJ2NvZGUnOiAnTkYnLCAnbmFtZSc6ICdOb3Jmb2xrIElzbGFuZCcgfSwgeyAnY29kZSc6ICdORycsICduYW1lJzogJ05pZ2VyaWEnIH0sIHsgJ2NvZGUnOiAnTkknLCAnbmFtZSc6ICdOaWNhcmFndWEnIH0sIHsgJ2NvZGUnOiAnTkwnLCAnbmFtZSc6ICdOZXRoZXJsYW5kcycgfSwgeyAnY29kZSc6ICdOTycsICduYW1lJzogJ05vcndheScgfSwgeyAnY29kZSc6ICdOUCcsICduYW1lJzogJ05lcGFsJyB9LCB7ICdjb2RlJzogJ05SJywgJ25hbWUnOiAnTmF1cnUnIH0sIHsgJ2NvZGUnOiAnTlUnLCAnbmFtZSc6ICdOaXVlJyB9LCB7ICdjb2RlJzogJ05aJywgJ25hbWUnOiAnTmV3IFplYWxhbmQnIH0sIHsgJ2NvZGUnOiAnT00nLCAnbmFtZSc6ICdPbWFuJyB9LCB7ICdjb2RlJzogJ1BBJywgJ25hbWUnOiAnUGFuYW1hJyB9LCB7ICdjb2RlJzogJ1BFJywgJ25hbWUnOiAnUGVydScgfSwgeyAnY29kZSc6ICdQRicsICduYW1lJzogJ0ZyZW5jaCBQb2x5bmVzaWEnIH0sIHsgJ2NvZGUnOiAnUEcnLCAnbmFtZSc6ICdQYXB1YSBOZXcgR3VpbmVhJyB9LCB7ICdjb2RlJzogJ1BIJywgJ25hbWUnOiAnUGhpbGlwcGluZXMnIH0sIHsgJ2NvZGUnOiAnUEsnLCAnbmFtZSc6ICdQYWtpc3RhbicgfSwgeyAnY29kZSc6ICdQTCcsICduYW1lJzogJ1BvbGFuZCcgfSwgeyAnY29kZSc6ICdQTScsICduYW1lJzogJ1NhaW50IFBpZXJyZSBBbmQgTWlxdWVsb24nIH0sIHsgJ2NvZGUnOiAnUE4nLCAnbmFtZSc6ICdQaXRjYWlybicgfSwgeyAnY29kZSc6ICdQUicsICduYW1lJzogJ1B1ZXJ0byBSaWNvJyB9LCB7ICdjb2RlJzogJ1BTJywgJ25hbWUnOiAnUGFsZXN0aW5lJyB9LCB7ICdjb2RlJzogJ1BUJywgJ25hbWUnOiAnUG9ydHVnYWwnIH0sIHsgJ2NvZGUnOiAnUFcnLCAnbmFtZSc6ICdQYWxhdScgfSwgeyAnY29kZSc6ICdQWScsICduYW1lJzogJ1BhcmFndWF5JyB9LCB7ICdjb2RlJzogJ1FBJywgJ25hbWUnOiAnUWF0YXInIH0sIHsgJ2NvZGUnOiAnUkUnLCAnbmFtZSc6ICdSZXVuaW9uJyB9LCB7ICdjb2RlJzogJ1JPJywgJ25hbWUnOiAnUm9tYW5pYScgfSwgeyAnY29kZSc6ICdSUycsICduYW1lJzogJ1NlcmJpYScgfSwgeyAnY29kZSc6ICdSVScsICduYW1lJzogJ1J1c3NpYScgfSwgeyAnY29kZSc6ICdSVycsICduYW1lJzogJ1J3YW5kYScgfSwgeyAnY29kZSc6ICdTQScsICduYW1lJzogJ1NhdWRpIEFyYWJpYScgfSwgeyAnY29kZSc6ICdTQicsICduYW1lJzogJ1NvbG9tb24gSXNsYW5kcycgfSwgeyAnY29kZSc6ICdTQycsICduYW1lJzogJ1NleWNoZWxsZXMnIH0sIHsgJ2NvZGUnOiAnU0QnLCAnbmFtZSc6ICdTdWRhbicgfSwgeyAnY29kZSc6ICdTRScsICduYW1lJzogJ1N3ZWRlbicgfSwgeyAnY29kZSc6ICdTRycsICduYW1lJzogJ1NpbmdhcG9yZScgfSwgeyAnY29kZSc6ICdTSCcsICduYW1lJzogJ1NhaW50IEhlbGVuYScgfSwgeyAnY29kZSc6ICdTSScsICduYW1lJzogJ1Nsb3ZlbmlhJyB9LCB7ICdjb2RlJzogJ1NKJywgJ25hbWUnOiAnU3ZhbGJhcmQgQW5kIEphbiBNYXllbicgfSwgeyAnY29kZSc6ICdTSycsICduYW1lJzogJ1Nsb3Zha2lhJyB9LCB7ICdjb2RlJzogJ1NMJywgJ25hbWUnOiAnU2llcnJhIExlb25lJyB9LCB7ICdjb2RlJzogJ1NNJywgJ25hbWUnOiAnU2FuIE1hcmlubycgfSwgeyAnY29kZSc6ICdTTicsICduYW1lJzogJ1NlbmVnYWwnIH0sIHsgJ2NvZGUnOiAnU08nLCAnbmFtZSc6ICdTb21hbGlhJyB9LCB7ICdjb2RlJzogJ1NSJywgJ25hbWUnOiAnU3VyaW5hbWUnIH0sIHsgJ2NvZGUnOiAnU1MnLCAnbmFtZSc6ICdTb3V0aCBTdWRhbicgfSwgeyAnY29kZSc6ICdTVCcsICduYW1lJzogJ1NhbyBUb21lIEFuZCBQcmluY2lwZScgfSwgeyAnY29kZSc6ICdTVicsICduYW1lJzogJ0VsIFNhbHZhZG9yJyB9LCB7ICdjb2RlJzogJ1NYJywgJ25hbWUnOiAnU2ludCBNYWFydGVuIChEdXRjaCBwYXJ0KScgfSwgeyAnY29kZSc6ICdTWScsICduYW1lJzogJ1N5cmlhJyB9LCB7ICdjb2RlJzogJ1NaJywgJ25hbWUnOiAnU3dhemlsYW5kJyB9LCB7ICdjb2RlJzogJ1RDJywgJ25hbWUnOiAnVHVya3MgQW5kIENhaWNvcyBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1REJywgJ25hbWUnOiAnQ2hhZCcgfSwgeyAnY29kZSc6ICdURicsICduYW1lJzogJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcycgfSwgeyAnY29kZSc6ICdURycsICduYW1lJzogJ1RvZ28nIH0sIHsgJ2NvZGUnOiAnVEgnLCAnbmFtZSc6ICdUaGFpbGFuZCcgfSwgeyAnY29kZSc6ICdUSicsICduYW1lJzogJ1RhamlraXN0YW4nIH0sIHsgJ2NvZGUnOiAnVEsnLCAnbmFtZSc6ICdUb2tlbGF1JyB9LCB7ICdjb2RlJzogJ1RMJywgJ25hbWUnOiAnVGltb3ItTGVzdGUnIH0sIHsgJ2NvZGUnOiAnVE0nLCAnbmFtZSc6ICdUdXJrbWVuaXN0YW4nIH0sIHsgJ2NvZGUnOiAnVE4nLCAnbmFtZSc6ICdUdW5pc2lhJyB9LCB7ICdjb2RlJzogJ1RPJywgJ25hbWUnOiAnVG9uZ2EnIH0sIHsgJ2NvZGUnOiAnVFInLCAnbmFtZSc6ICdUdXJrZXknIH0sIHsgJ2NvZGUnOiAnVFQnLCAnbmFtZSc6ICdUcmluaWRhZCBhbmQgVG9iYWdvJyB9LCB7ICdjb2RlJzogJ1RWJywgJ25hbWUnOiAnVHV2YWx1JyB9LCB7ICdjb2RlJzogJ1RXJywgJ25hbWUnOiAnVGFpd2FuJyB9LCB7ICdjb2RlJzogJ1RaJywgJ25hbWUnOiAnVGFuemFuaWEnIH0sIHsgJ2NvZGUnOiAnVUEnLCAnbmFtZSc6ICdVa3JhaW5lJyB9LCB7ICdjb2RlJzogJ1VHJywgJ25hbWUnOiAnVWdhbmRhJyB9LCB7ICdjb2RlJzogJ1VNJywgJ25hbWUnOiAnVW5pdGVkIFN0YXRlcyBNaW5vciBPdXRseWluZyBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1VZJywgJ25hbWUnOiAnVXJ1Z3VheScgfSwgeyAnY29kZSc6ICdVWicsICduYW1lJzogJ1V6YmVraXN0YW4nIH0sIHsgJ2NvZGUnOiAnVkEnLCAnbmFtZSc6ICdWYXRpY2FuJyB9LCB7ICdjb2RlJzogJ1ZDJywgJ25hbWUnOiAnU2FpbnQgVmluY2VudCBBbmQgVGhlIEdyZW5hZGluZXMnIH0sIHsgJ2NvZGUnOiAnVkUnLCAnbmFtZSc6ICdWZW5lenVlbGEnIH0sIHsgJ2NvZGUnOiAnVkcnLCAnbmFtZSc6ICdCcml0aXNoIFZpcmdpbiBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1ZJJywgJ25hbWUnOiAnVS5TLiBWaXJnaW4gSXNsYW5kcycgfSwgeyAnY29kZSc6ICdWTicsICduYW1lJzogJ1ZpZXRuYW0nIH0sIHsgJ2NvZGUnOiAnVlUnLCAnbmFtZSc6ICdWYW51YXR1JyB9LCB7ICdjb2RlJzogJ1dGJywgJ25hbWUnOiAnV2FsbGlzIEFuZCBGdXR1bmEnIH0sIHsgJ2NvZGUnOiAnV1MnLCAnbmFtZSc6ICdTYW1vYScgfSwgeyAnY29kZSc6ICdZRScsICduYW1lJzogJ1llbWVuJyB9LCB7ICdjb2RlJzogJ1lUJywgJ25hbWUnOiAnTWF5b3R0ZScgfSwgeyAnY29kZSc6ICdaQScsICduYW1lJzogJ1NvdXRoIEFmcmljYScgfSwgeyAnY29kZSc6ICdaTScsICduYW1lJzogJ1phbWJpYScgfSwgeyAnY29kZSc6ICdaVycsICduYW1lJzogJ1ppbWJhYndlJyB9XTtcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1jb3VudHJ5LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvdW50cnlNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgQkFTRV9FTkRQT0lOVCA9ICdjb21wYW5pZXMvJHtjb21wYW55SWR9L2RlcGFydG1lbnRzL29wdGlvbnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9ERVBBUlRNRU5UX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1kZXBhcnRtZW50JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZW5kcG9pbnQgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgW2Rpc2FibGVkXT1cIiFjb21wYW55SWQgfHwgZGlzYWJsZWRcIlxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICBbdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4gIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX0RFUEFSVE1FTlRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbXBhbnlJZCh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jb21wYW55SWQgPSB2O1xuICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25jb21wYW55SWQoKTtcbiAgfVxuXG4gIGdldCBjb21wYW55SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlJZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnRGVwYXJ0bWVudCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0RlcGFydG1lbnQgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY29tcGFueUlkOiBzdHJpbmc7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHNldEVuZHBvaW50QmFzZWRPbmNvbXBhbnlJZCgpIHtcbiAgICB0aGlzLmVuZHBvaW50ID0gIXRoaXMuY29tcGFueUlkID8gdW5kZWZpbmVkIDogQkFTRV9FTkRQT0lOVC5yZXBsYWNlKCcke2NvbXBhbnlJZH0nLCB0aGlzLmNvbXBhbnlJZCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLWRlcGFydG1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5jb25zdCBBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXJvbGUnLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlXG5bZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbltuYW1lXT1cIm5hbWVcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludCA9ICdyb2xlcy9vcHRpb25zJztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIHR5cGVzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1JvbGUgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdSb2xlIGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZVxuICApIHt9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIC8vIGN1c3RvbUZldGNoRnVuY3Rpb24gPSAodGV4dFNlYXJjaCk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gIC8vICAgY29uc3Qgc2VhcmNoID0gdGV4dFNlYXJjaCA/IHsgdGV4dFNlYXJjaCB9IDogdW5kZWZpbmVkO1xuICAvLyAgIHJldHVybiB0aGlzLmRlY29yYUFwaS5nZXQodGhpcy5lbmRwb2ludCwgc2VhcmNoKVxuICAvLyAgIC5waXBlKFxuICAvLyAgICAgbWFwKHJvbGVzID0+IHtcbiAgLy8gICAgICAgcmV0dXJuIHJvbGVzLmZpbHRlcihyb2xlID0+IHtcbiAgLy8gICAgICAgICBjb25zdCByb2xlVHlwZSA9IChyb2xlICYmIHJvbGUua2V5KSA/IHJvbGUua2V5LnNwbGl0KCcuJylbMF0gOiB1bmRlZmluZWQ7XG4gIC8vICAgICAgICAgcmV0dXJuICF0aGlzLnR5cGVzID8gdHJ1ZSA6IHRoaXMudHlwZXMuaW5kZXhPZihyb2xlVHlwZSkgPj0gMDtcbiAgLy8gICAgICAgfSk7XG4gIC8vICAgICB9KVxuICAvLyAgICk7XG4gIC8vIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLXJvbGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVSb2xlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY29uc3QgQkFTRV9BVVRPQ09NUExFVEVfUFJPSkVDVF9FTkRQT0lOVCA9ICcvbGVnYWN5L3Byb2plY3Qvc2VhcmNoL2tleVZhbHVlJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfUFJPSkVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtcHJvamVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIihlbmRwb2ludCAmJiBjb21wYW55SWQpIGVsc2UgZmFrZURpc2FibGVkXCI+XG4gIDxkZWMtYXV0b2NvbXBsZXRlXG4gICNhdXRvY29tcGxldGVcbiAgW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbiAgW2xhYmVsRm5dPVwibGFiZWxGblwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICBbdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4gIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICBbY3VzdG9tRmV0Y2hGdW5jdGlvbl09XCJjdXN0b21GZXRjaEZ1bmN0aW9uXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4gIChibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZmFrZURpc2FibGVkPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9QUk9KRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgZW5kcG9pbnQ7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbXBhbnlJZCh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fY29tcGFueUlkICE9PSB2KSB7XG4gICAgICB0aGlzLl9jb21wYW55SWQgPSB2O1xuICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZW5kcG9pbnQgPSB1bmRlZmluZWQ7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gZW5zdXJlcyBhIGRpZ2VzdCBjaWNsZSBiZWZvcmUgcmVzZXRpbmcgdGhlIGVuZHBvaW50XG4gICAgICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uQ29tcGFueUlkKCk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICBnZXQgY29tcGFueUlkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wYW55SWQ7XG4gIH1cblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1Byb2plY3QgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdQcm9qZWN0IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX2NvbXBhbnlJZDogc3RyaW5nO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSkgeyB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKSB7XG4gICAgaWYgKHRoaXMuY29tcGFueUlkKSB7XG4gICAgICB0aGlzLmVuZHBvaW50ID0gQkFTRV9BVVRPQ09NUExFVEVfUFJPSkVDVF9FTkRQT0lOVCArICc/Y29tcGFueUlkPScgKyB0aGlzLmNvbXBhbnlJZDtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY3VzdG9tRmV0Y2hGdW5jdGlvbiA9ICh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIHBhcmFtcy50ZXh0U2VhcmNoID0gdGV4dFNlYXJjaDtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbkNvbXBhbnlJZCgpO1xuICAgIHJldHVybiB0aGlzLmRlY29yYUFwaS5nZXQodGhpcy5lbmRwb2ludCwgcGFyYW1zKVxuICAgIC5waXBlKFxuICAgICAgbWFwKHByb2plY3RzID0+IHtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1wcm9qZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVByb2plY3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuY29uc3QgUVVPVEVfRU5EUE9JTlQgPSAnL3Byb2plY3RzLyR7cHJvamVjdElkfS9xdW90ZXMvb3B0aW9ucyc7XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9RVU9URV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXF1b3RlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZW5kcG9pbnQgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgW2Rpc2FibGVkXT1cIiFwcm9qZWN0SWQgfHwgZGlzYWJsZWRcIlxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICBbdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4gIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1FVT1RFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVF1b3RlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgbGFiZWxBdHRyID0gJ3ZhbHVlJztcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1F1b3RlIGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnUXVvdGUgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQElucHV0KClcbiAgc2V0IHByb2plY3RJZCh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wcm9qZWN0SWQgPSB2O1xuICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uSW5wdXRzKCk7XG4gIH1cblxuICBnZXQgcHJvamVjdElkKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9qZWN0SWQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGVjb3JhUHJvZHVjdCh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kZWNvcmFQcm9kdWN0ID0gdjtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbklucHV0cygpO1xuICB9XG5cbiAgZ2V0IGRlY29yYVByb2R1Y3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlY29yYVByb2R1Y3Q7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGVjb3JhUHJvZHVjdFZhcmlhbnQodjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZGVjb3JhUHJvZHVjdFZhcmlhbnQgPSB2O1xuICAgIHRoaXMuc2V0RW5kcG9pbnRCYXNlZE9uSW5wdXRzKCk7XG4gIH1cblxuICBnZXQgZGVjb3JhUHJvZHVjdFZhcmlhbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlY29yYVByb2R1Y3RWYXJpYW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvamVjdElkOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfZGVjb3JhUHJvZHVjdDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2RlY29yYVByb2R1Y3RWYXJpYW50OiBzdHJpbmc7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlKSB7IH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFbmRwb2ludEJhc2VkT25JbnB1dHMoKSB7XG5cbiAgICBsZXQgZW5kcG9pbnQ7XG5cbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRoaXMucHJvamVjdElkKSB7XG5cbiAgICAgIGVuZHBvaW50ID0gUVVPVEVfRU5EUE9JTlQucmVwbGFjZSgnJHtwcm9qZWN0SWR9JywgdGhpcy5wcm9qZWN0SWQpO1xuXG4gICAgICBjb25zdCBwYXJhbXMgPSBbXTtcblxuICAgICAgaWYgKHRoaXMuZGVjb3JhUHJvZHVjdCkge1xuICAgICAgICBwYXJhbXMucHVzaChgcHJvZHVjdElkPSR7dGhpcy5kZWNvcmFQcm9kdWN0fWApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kZWNvcmFQcm9kdWN0VmFyaWFudCkge1xuICAgICAgICBwYXJhbXMucHVzaChgcHJvZHVjdFZhcmlhbnRJZD0ke3RoaXMuZGVjb3JhUHJvZHVjdFZhcmlhbnR9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMubGVuZ3RoKSB7XG5cbiAgICAgICAgZW5kcG9pbnQgKz0gYD8ke3BhcmFtcy5qb2luKCcmJyl9YDtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5kcG9pbnQgIT09IGVuZHBvaW50KSB7XG5cbiAgICAgIHRoaXMuZW5kcG9pbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgIHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludDtcblxuICAgICAgfSwgMCk7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0F1dG9jb21wbGV0ZVF1b3RlQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUXVvdGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5jb25zdCBBVVRPQ09NUExFVEVfVEFHU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVUYWdzQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtdGFncycsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbltuYW1lXT1cIm5hbWVcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuKGVudGVyQnV0dG9uKT1cImVudGVyQnV0dG9uLmVtaXQoJGV2ZW50KVwiXG5bKG5nTW9kZWwpXT1cInZhbHVlXCJcbltsYWJlbEF0dHJdPVwibGFiZWxBdHRyXCJcblt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbihibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPmAsXG4gIHN0eWxlczogW2BgXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1RBR1NfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlVGFnc0NvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBASW5wdXQoKVxuICBzZXQgZW5kcG9pbnQodikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9lbmRwb2ludCA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGVuZHBvaW50KCkge1xuICAgIHJldHVybiB0aGlzLl9lbmRwb2ludDtcbiAgfVxuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgX2VuZHBvaW50OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdUYWdzIGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnVGFncyBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgZW50ZXJCdXR0b246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnk7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICBsYWJlbEZuKHRhZ3MpIHtcbiAgICByZXR1cm4gYCR7dGFncy52YWx1ZX0gIyR7dGFncy5rZXl9YDtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiBgJHt2YWx1ZX1gICE9PSBgJHt0aGlzLnZhbHVlfWApIHsgLy8gY29udmVydCB0byBzdHJpbmcgdG8gYXZvaWQgcHJvYmxlbXMgY29tcGFyaW5nIHZhbHVlc1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5ibHVyLmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlVGFnc0NvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLXRhZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0F1dG9jb21wbGV0ZVRhZ3NDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0F1dG9jb21wbGV0ZVRhZ3NDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVUYWdzTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYnJlYWRjcnVtYicsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwiZGVjLWJyZWFkY3J1bWItd3JhcHBlclwiPlxuXG4gIDxkaXYgZnhGbGV4PlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICA8aDE+e3tmZWF0dXJlfX08L2gxPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnJlYWRjcnVtYlwiPlxuICAgICAgICB7e2JyZWFkY3J1bWJ9fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4IGZ4RmxleEFsaWduPVwiY2VudGVyXCIgZnhMYXlvdXRBbGlnbj1cImVuZFwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgIDxkaXYgZnhGbGV4PlxuICAgICAgICA8IS0tIENPTlRFTlQgIC0tPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwhLS0gQkFDSyBCVVRUT04gLS0+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwiZGVmYXVsdFwiICpuZ0lmPVwiYmFja0J1dHRvblBhdGhcIiAoY2xpY2spPVwiZ29CYWNrKClcIj57eyBiYWNrTGFiZWwgfX08L2J1dHRvbj5cbiAgICAgICAgPCEtLSBGT1JXQVJEIEJVVFRPTiAtLT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJkZWZhdWx0XCIgKm5nSWY9XCJmb3J3YXJkQnV0dG9uXCIgKGNsaWNrKT1cImdvRm9yd2FyZCgpXCI+e3sgZm9yd2FyZExhYmVsIH19PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtYnJlYWRjcnVtYi13cmFwcGVye21hcmdpbi1ib3R0b206MzJweH0uZGVjLWJyZWFkY3J1bWItd3JhcHBlciBoMXtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo0MDA7bWFyZ2luLXRvcDo0cHg7bWFyZ2luLWJvdHRvbTo0cHh9LmRlYy1icmVhZGNydW1iLXdyYXBwZXIgLmJyZWFkY3J1bWJ7Y29sb3I6I2E4YThhOH1gXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjQnJlYWRjcnVtYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgYmFja0J1dHRvblBhdGg6IHN0cmluZztcbiAgQElucHV0KCkgYnJlYWRjcnVtYjogc3RyaW5nO1xuICBASW5wdXQoKSBmZWF0dXJlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvcndhcmRCdXR0b246IHN0cmluZztcbiAgQElucHV0KCkgaTE4bkZlYXR1cmU6IHN0cmluZztcbiAgQElucHV0KCkgaTE4bkJyZWFkY3J1bWI6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBiYWNrTGFiZWwgPSAnQmFjayc7XG4gIEBJbnB1dCgpIGZvcndhcmRMYWJlbCA9ICdGb3J3YXJkJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHRyYW5zbGF0b3I6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudHJhbnNsYXRlRmVhdHVyZSgpO1xuICAgIHRoaXMudHJhbnNsYXRlUGF0aHMoKTtcbiAgICB0aGlzLmRldGVjdEFuZFBhcnNlQnV0dG9uc0NvbmZpZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RBbmRQYXJzZUJ1dHRvbnNDb25maWcoKSB7XG4gICAgdGhpcy5wYXJzZUJhY2tCdXR0b24oKTtcbiAgICB0aGlzLnBhcnNlRm9yd2FyZEJ1dHRvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUJhY2tCdXR0b24oKSB7XG4gICAgaWYgKHRoaXMuYmFja0J1dHRvblBhdGggIT09IHVuZGVmaW5lZCAmJiB0aGlzLmJhY2tCdXR0b25QYXRoICE9PSAnZmFsc2UnKSB7XG4gICAgICB0aGlzLmJhY2tCdXR0b25QYXRoID0gdGhpcy5iYWNrQnV0dG9uUGF0aCA/IHRoaXMuYmFja0J1dHRvblBhdGggOiAnLyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUZvcndhcmRCdXR0b24oKSB7XG4gICAgaWYgKHRoaXMuZm9yd2FyZEJ1dHRvbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuZm9yd2FyZEJ1dHRvbiAhPT0gJ2ZhbHNlJykge1xuICAgICAgdGhpcy5mb3J3YXJkQnV0dG9uID0gdGhpcy5mb3J3YXJkQnV0dG9uID8gdGhpcy5mb3J3YXJkQnV0dG9uIDogJy8nO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNsYXRlRmVhdHVyZSgpIHtcbiAgICBpZiAodGhpcy5pMThuQnJlYWRjcnVtYikge1xuICAgICAgdGhpcy5icmVhZGNydW1iID0gdGhpcy5pMThuQnJlYWRjcnVtYi5tYXAocGF0aCA9PiB0aGlzLnRyYW5zbGF0b3IuaW5zdGFudChwYXRoKSkuam9pbignIC8gJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2xhdGVQYXRocygpIHtcbiAgICBpZiAodGhpcy5pMThuRmVhdHVyZSkge1xuICAgICAgdGhpcy5mZWF0dXJlID0gdGhpcy50cmFuc2xhdG9yLmluc3RhbnQodGhpcy5pMThuRmVhdHVyZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqIC8vXG4gIC8vIE5hdmlnYXRpb24gTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKiogLy9cblxuICBwdWJsaWMgZ29CYWNrKCkge1xuICAgIGlmICh0aGlzLmJhY2tCdXR0b25QYXRoKSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5iYWNrQnV0dG9uUGF0aF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdvRm9yd2FyZCgpIHtcbiAgICBpZiAodGhpcy5mb3J3YXJkQnV0dG9uKSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5mb3J3YXJkQnV0dG9uXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmZvcndhcmQoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIEFuZ3VsYXIgbW9kdWxlc1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY0JyZWFkY3J1bWJDb21wb25lbnQgfSBmcm9tICcuL2JyZWFkY3J1bWIuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0JyZWFkY3J1bWJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0JyZWFkY3J1bWJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNCcmVhZGNydW1iTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIE9uSW5pdCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBEaWFsb2dBY3Rpb24gfSBmcm9tICcuL2RlYy1kaWFsb2cubW9kZWxzJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWRpYWxvZycsXG4gIHRlbXBsYXRlOiBgPG1hdC10b29sYmFyIGNvbG9yPVwicHJpbWFyeVwiPlxuXG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeEZsZXhGaWxsIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIj5cbiAgICA8ZGl2PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIGNsYXNzPVwidXBwZXJjYXNlXCIgbWF0LWRpYWxvZy1jbG9zZT5cbiAgICAgICAgPG1hdC1pY29uPmFycm93X2JhY2s8L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxoMT4mbmJzcDsge3sgdGl0bGUgfX08L2gxPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgZnhGbGV4PlxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJhY3Rpb25zXCI+XG4gICAgICAgICAgPG1hdC1tZW51ICNkZWNEaWFsb2dBY3Rpb25zTWVudT1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBhY3Rpb25zXCIgbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiYWN0aW9uLmNhbGxiYWNrKGNvbnRleHQpXCI+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmxhYmVsXCI+e3sgYWN0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjdGlvbi5pMThuTGFiZWxcIj57eyBhY3Rpb24uaTE4bkxhYmVsIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9tYXQtbWVudT5cblxuICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJkZWNEaWFsb2dBY3Rpb25zTWVudVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPm1vcmVfdmVydDwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L21hdC10b29sYmFyPlxuXG48ZGl2IGNsYXNzPVwiZGVjLWRpYWxvZy1jaGlsZC13cmFwcGVyXCI+XG4gIDx0ZW1wbGF0ZSAjY2hpbGRDb250YWluZXI+PC90ZW1wbGF0ZT5cbjwvZGl2PlxuXG48ZGVjLXNwaW5uZXIgKm5nSWY9XCIhbG9hZGVkXCI+PC9kZWMtc3Bpbm5lcj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLWRpYWxvZy1jaGlsZC13cmFwcGVye3BhZGRpbmc6MzJweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIC8vIENVUlJFTlRcbiAgY2hpbGRDb21wb25lbnRUeXBlOiBDb21wb25lbnRUeXBlPGFueT47XG5cbiAgY2hpbGRDb21wb25lbnRJbnN0YW5jZTogYW55O1xuXG4gIGFjdGlvbnM6IERpYWxvZ0FjdGlvbltdID0gW107XG5cbiAgdGl0bGU6IHN0cmluZztcblxuICBjb250ZXh0OiBhbnkgPSB7fTtcblxuICBsb2FkZWQ6IGJvb2xlYW47XG5cbiAgQFZpZXdDaGlsZCgnY2hpbGRDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgY2hpbGRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgQE91dHB1dCgpIGNoaWxkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmYWN0b3I6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERlY0RpYWxvZ0NvbXBvbmVudD5cbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJPcGVuKClcbiAgICAudG9Qcm9taXNlKClcbiAgICAudGhlbih0aGlzLmZhY3RvcnlUaGVDb21wb25lbnQpO1xuXG4gIH1cblxuICBwcml2YXRlIGZhY3RvcnlUaGVDb21wb25lbnQgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PGFueT4gPSB0aGlzLmZhY3Rvci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmNoaWxkQ29tcG9uZW50VHlwZSk7XG5cbiAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy5jaGlsZENvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cbiAgICB0aGlzLmNoaWxkLmVtaXQodGhpcy5jaGlsZENvbXBvbmVudEluc3RhbmNlKTtcblxuICAgIHRoaXMuY2hpbGQuY29tcGxldGUoKTsgLy8gdW5zdWJzcmliZSBzdWJzY3JpYmVyc1xuXG4gICAgdGhpcy5hcHBlbmRDb250ZXh0VG9JbnN0YW5jZShjb21wb25lbnRSZWYuaW5zdGFuY2UsIHRoaXMuY29udGV4dCk7XG5cbiAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG5cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kQ29udGV4dFRvSW5zdGFuY2UoaW5zdGFuY2U6IGFueSwgY29udGV4dDogYW55KSB7XG5cbiAgICBpZiAoaW5zdGFuY2UgJiYgY29udGV4dCkge1xuXG4gICAgICBPYmplY3Qua2V5cyhjb250ZXh0KS5mb3JFYWNoKChrZXkpID0+IHtcblxuICAgICAgICBpbnN0YW5jZVtrZXldID0gdGhpcy5jb250ZXh0W2tleV07XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNwaW5uZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWNvcmEtbG9hZGluZy1zcGlubmVyLXdyYXBwZXJcIj5cbiAgPGRpdiBjbGFzcz1cImRlY29yYS1sb2FkaW5nLXNwaW5uZXIgdHJhbnNwYXJlbnRCZ1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5uZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYXBcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoYWxmLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlnaHRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhhbGYtY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuYCxcbiAgc3R5bGVzOiBbYC5kZWNvcmEtbG9hZGluZy1zcGlubmVyLXdyYXBwZXJ7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jazt3aWR0aDoxMDAlfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NwaW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc3Bpbm5lci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY1NwaW5uZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjU3Bpbm5lckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU3Bpbm5lck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRGVjRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcGVuQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vZGVjLWRpYWxvZy5tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjRGlhbG9nU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZ1xuICApIHsgfVxuXG5cbiAgb3BlbihjaGlsZENvbXBvbmVudDogQ29tcG9uZW50VHlwZTxhbnk+LCBjb25maWc6IE9wZW5Db25maWd1cmF0aW9uKSB7XG5cbiAgICBjb25zdCBkaWFsb2dJbnN0YW5jZTogTWF0RGlhbG9nUmVmPGFueT4gPSB0aGlzLmRpYWxvZy5vcGVuKFxuICAgICAgRGVjRGlhbG9nQ29tcG9uZW50LFxuICAgICAge1xuICAgICAgICB3aWR0aDogY29uZmlnLndpZHRoIHx8ICcxMDB2dycsXG4gICAgICAgIGhlaWdodDogY29uZmlnLmhlaWd0aCB8fCAnMTAwdmgnLFxuICAgICAgICBwYW5lbENsYXNzOiAnZnVsbC1zY3JlZW4tZGlhbG9nJ1xuICAgICAgfVxuICAgICk7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS5jaGlsZENvbXBvbmVudFR5cGUgPSBjaGlsZENvbXBvbmVudDtcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLmFjdGlvbnMgPSBjb25maWcuYWN0aW9ucztcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gY29uZmlnLnRpdGxlO1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UuY29udGV4dCA9IGNvbmZpZy5jb250ZXh0O1xuXG4gICAgcmV0dXJuIGRpYWxvZ0luc3RhbmNlO1xuXG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlLCBNYXRUb29sYmFyTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNTcGlubmVyTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5tb2R1bGUnO1xuXG5pbXBvcnQgeyBEZWNEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2RlYy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0RpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL2RlYy1kaWFsb2cuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIERlY1NwaW5uZXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNEaWFsb2dDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtEZWNEaWFsb2dDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtEZWNEaWFsb2dTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjRGlhbG9nTW9kdWxlIHsgfVxuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3NoZWlrYWx0aGFmL25ndS1jYXJvdXNlbCNpbnB1dC1pbnRlcmZhY2VcblxuZXhwb3J0IGNvbnN0IENhcm91c2VsQ29uZmlnID0ge1xuICBncmlkOiB7IHhzOiAxLCBzbTogMiwgbWQ6IDMsIGxnOiA0LCBhbGw6IDAgfSxcbiAgc2xpZGU6IDEsXG4gIHNwZWVkOiA0MDAsXG4gIGludGVydmFsOiA0MDAwLFxuICBwb2ludDoge1xuICAgIHZpc2libGU6IGZhbHNlXG4gIH0sXG4gIGN1c3RvbTogJ2Jhbm5lcidcbn07XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXJvdXNlbENvbmZpZyB9IGZyb20gJy4vY2Fyb3VzZWwtY29uZmlnJztcbmltcG9ydCB7IE5ndUNhcm91c2VsU3RvcmUgfSBmcm9tICdAbmd1L2Nhcm91c2VsL3NyYy9uZ3UtY2Fyb3VzZWwvbmd1LWNhcm91c2VsLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1nYWxsZXJ5JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGVjLWdhbGxlcnktd3JhcHBlclwiPlxuXG4gIDxkaXYgY2xhc3M9XCJpbWFnZS1oaWdobGlnaHRlZFwiPlxuICAgICAgPGRlYy1pbWFnZS16b29tXG4gICAgICAgIFtzaXplXT1cInt3aWR0aDogNjIwLCBoZWlnaHQ6IDYyMH1cIlxuICAgICAgICBbc3lzdGVtRmlsZV09XCJpbWFnZUhpZ2hsaWdodFwiPlxuICAgICAgPC9kZWMtaW1hZ2Utem9vbT5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIiAqbmdJZj1cImltZ0V4dGVybmFsTGlua1wiPlxuXG4gICAgPGEgaHJlZj1cInt7IGltZ0V4dGVybmFsTGluayB9fVwiIHRhcmdldD1cIl9ibGFua1wiPnt7ICdsYWJlbC5pbWFnZS1saW5rJyB8IHRyYW5zbGF0ZSB9fTwvYT5cblxuICA8L2Rpdj5cblxuICA8bmd1LWNhcm91c2VsIGNsYXNzPVwiY2Fyb3VzZWwtd3JhcHBlclwiIFtpbnB1dHNdPVwiY2Fyb3VzZWxDb25maWdcIiAoaW5pdERhdGEpPVwib25Jbml0RGF0YUZuKCRldmVudClcIiAob25Nb3ZlKT1cIm9uTW92ZUZuKCRldmVudClcIj5cblxuICAgIDxuZ3UtaXRlbSBOZ3VDYXJvdXNlbEl0ZW0gKm5nRm9yPVwibGV0IGltYWdlIG9mIGltYWdlc1wiIFtjbGFzcy5hY3RpdmVdPVwiaW1hZ2UgPT0gaW1hZ2VIaWdobGlnaHRcIj5cblxuICAgICAgPGltZyBbZGVjSW1hZ2VdPVwiaW1hZ2VcIiBbZGVjSW1hZ2VTaXplXT1cInt3aWR0aDozMDAsIGhlaWdodDozMDB9XCIgKGNsaWNrKT1cIm9uU2VsZWN0SW1hZ2UoJGV2ZW50LGltYWdlKVwiPlxuXG4gICAgPC9uZ3UtaXRlbT5cblxuICAgIDxtYXQtaWNvbiBOZ3VDYXJvdXNlbFByZXYgY2xhc3M9XCJsZWZ0LXByZXZpb3VzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGlzRmlyc3R9XCI+Y2hldnJvbl9sZWZ0PC9tYXQtaWNvbj5cblxuICAgIDxtYXQtaWNvbiBOZ3VDYXJvdXNlbE5leHQgY2xhc3M9XCJyaWdodC1uZXh0XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGlzTGFzdH1cIj5jaGV2cm9uX3JpZ2h0PC9tYXQtaWNvbj5cblxuICA8L25ndS1jYXJvdXNlbD5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1nYWxsZXJ5LXdyYXBwZXJ7bWF4LXdpZHRoOjYyNHB4O292ZXJmbG93OmhpZGRlbn0uZGVjLWdhbGxlcnktd3JhcHBlciAuaW1hZ2UtaGlnaGxpZ2h0ZWR7Ym9yZGVyOjJweCBzb2xpZCAjZjVmNWY1O3dpZHRoOjYyMHB4O2hlaWdodDo2MjBweH0uZGVjLWdhbGxlcnktd3JhcHBlciBhe2ZvbnQtc2l6ZToxMHB4O3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOiM5MjkyOTI7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXJ7bWFyZ2luLXRvcDo4cHg7cGFkZGluZzowIDI0cHg7aGVpZ2h0OjEyOHB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVte2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtoZWlnaHQ6MTI0cHg7cGFkZGluZzoycHg7bWFyZ2luLXJpZ2h0OjJweH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbS5hY3RpdmUsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW06aG92ZXJ7cGFkZGluZzowO2JvcmRlcjoycHggc29saWQgIzIzMmUzOH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbSBpbWd7bWF4LXdpZHRoOjEyNHB4O2N1cnNvcjpwb2ludGVyfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0e2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O3Bvc2l0aW9uOmFic29sdXRlO3RvcDpjYWxjKDUwJSAtIDEycHgpO2N1cnNvcjpwb2ludGVyO3RleHQtc2hhZG93Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzOmhvdmVyLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0OmhvdmVye3RleHQtc2hhZG93OjAgMCA2cHggcmdiYSgwLDAsMCwuMil9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMuZGlzYWJsZWQsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQuZGlzYWJsZWR7b3BhY2l0eTouNH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cy5kaXNhYmxlZDpob3ZlciwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dC5kaXNhYmxlZDpob3Zlcnt0ZXh0LXNoYWRvdzpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3Vze2xlZnQ6MH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dHtyaWdodDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dhbGxlcnlDb21wb25lbnQge1xuXG4gIGltYWdlSGlnaGxpZ2h0OiBhbnk7XG5cbiAgYWN0aXZlSW1hZ2U6IEVsZW1lbnQ7XG5cbiAgaW1nRXh0ZXJuYWxMaW5rOiBzdHJpbmc7XG5cbiAgaXNGaXJzdDogYm9vbGVhbjtcblxuICBpc0xhc3Q6IGJvb2xlYW47XG5cbiAgY2Fyb3VzZWxDb25maWcgPSBDYXJvdXNlbENvbmZpZztcblxuICBASW5wdXQoKVxuICBzZXQgaW1hZ2VzKHZhbHVlOiBhbnlbXSkge1xuXG4gICAgdmFsdWUgPSB2YWx1ZSB8fCBuZXcgQXJyYXk8YW55PigpO1xuXG4gICAgaWYgKHZhbHVlICYmIChKU09OLnN0cmluZ2lmeSh2YWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuX2ltYWdlcykpKSB7XG5cbiAgICAgIHRoaXMuaW1hZ2VIaWdobGlnaHQgPSB2YWx1ZVswXTtcblxuICAgICAgdGhpcy5faW1hZ2VzID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuc2V0RXh0ZXJuYWxMaW5rKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBpbWFnZXMoKTogYW55W10ge1xuXG4gICAgcmV0dXJuIHRoaXMuX2ltYWdlcztcblxuICB9XG5cbiAgcHJpdmF0ZSBfaW1hZ2VzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgb25TZWxlY3RJbWFnZSA9ICgkZXZlbnQsIHN5c0ZpbGUpID0+IHtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUltYWdlICYmIHRoaXMuYWN0aXZlSW1hZ2UgIT09ICRldmVudC50YXJnZXQpIHtcblxuICAgICAgdGhpcy5hY3RpdmVJbWFnZS5jbGFzc05hbWUgPSAnJztcblxuICAgIH1cblxuICAgICRldmVudC50YXJnZXQuY2xhc3NOYW1lID0gJ2FjdGl2ZSc7XG5cbiAgICB0aGlzLmFjdGl2ZUltYWdlID0gJGV2ZW50LnRhcmdldDtcblxuICAgIHRoaXMuaW1hZ2VIaWdobGlnaHQgPSBzeXNGaWxlO1xuXG4gICAgdGhpcy5zZXRFeHRlcm5hbExpbmsoKTtcblxuICB9XG5cbiAgc2V0RXh0ZXJuYWxMaW5rID0gKCkgPT4ge1xuXG4gICAgaWYgKHRoaXMuaW1hZ2VIaWdobGlnaHQpIHtcblxuICAgICAgdGhpcy5pbWdFeHRlcm5hbExpbmsgPSB0aGlzLmltYWdlSGlnaGxpZ2h0LmZpbGVVcmw7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uSW5pdERhdGFGbihldmVudDogTmd1Q2Fyb3VzZWxTdG9yZSkge1xuXG4gICAgdGhpcy5zZXRQcmV2TmV4dENoZWNrZXJzKGV2ZW50LmlzRmlyc3QsIGV2ZW50Lml0ZW1zID49IHRoaXMuaW1hZ2VzLmxlbmd0aCk7XG5cbiAgfVxuXG4gIG9uTW92ZUZuKGV2ZW50OiBOZ3VDYXJvdXNlbFN0b3JlKSB7XG5cbiAgICB0aGlzLnNldFByZXZOZXh0Q2hlY2tlcnMoZXZlbnQuaXNGaXJzdCwgZXZlbnQuaXNMYXN0KTtcblxuICB9XG5cbiAgc2V0UHJldk5leHRDaGVja2VycyhmaXJzdDogYm9vbGVhbiwgbGFzdDogYm9vbGVhbikge1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuaXNGaXJzdCA9IGZpcnN0O1xuXG4gICAgICB0aGlzLmlzTGFzdCA9IGxhc3Q7XG5cbiAgICB9LCAwKTtcblxuICB9XG5cbn1cbiIsImV4cG9ydCBjb25zdCBUaHVtYm9yU2VydmVySG9zdCA9ICdodHRwczovL2NhY2hlLXRodW1icy5kZWNvcmFjb250ZW50LmNvbS91bnNhZmUnO1xuXG5leHBvcnQgY29uc3QgUzNIb3N0ID0gJ2h0dHA6Ly9zMy5hbWF6b25hd3MuY29tL2RlY29yYS1wbGF0Zm9ybS0xLW52JztcblxuZXhwb3J0IGNvbnN0IFRyYW5zcGFyZW50SW1hZ2UgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUFtSkxSMFFBLzRlUHpMOEFBQVxuQUpjRWhaY3dBQUN4TUFBQXNUQVFDYW5CZ0FBQUFMU1VSQlZBalhZMkJnQUFBQUF3QUJJTldVeHdBQUFBQkpSVTVFcmtKZ2dnPT1gO1xuXG5leHBvcnQgY29uc3QgRXJyb3JJbWFnZSA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQU1BQUFEMDRKSDVBQUFBc1ZCTVZFVUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVxuQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFcbkFBQUFBQUFBQWsyd0xTQUFBQU9uUlNUbE1BQTRVVUJRZ01FUFNLSytqYUd4Y2Y5NTB5Y2s4Nk5pK21nYjlYSmlPeVJQRHMzcUtXWjByS3JYeDMrODVqUVQyNFhlUFgwOFZ0YXBHYUVDNVJOd0FBQjE1SlJFRlVlTnJ0bTJkejJ6QU1oa2xyMmJJbDc1RjQxWEc4NHBsbDEvei9QNnlYVmpZRWtpS1xucGtkNzFycytubmlNZEllSUZDRUFxK2M5Ly9wTVYyd3Y4M21HNW5CNTZmdURhNUM5Q2crbm1WR2FZSDZlWGFVREo5eE1PSnl5WnlUQWszMGx3cmpJZHM4MllmQS91QlZiWDJIRHhTT0dNNXl3TmszNnhldWg5c0xTOEg0c3pZYlJpU1pUTExKRmFxeURkUzJULzlqeHNoVkh3VTl1eHhzZjlYR0xLXG5ZMWhBMEw4d2pvL0Z5SmFyMUc4TE1uMnc4MnJ2aVNGMkhaZW84RG83aHFqMmN6MytBODUyWjhza1dXeXdNMHJaeGVnaThhME9wdHRwTDkrUUdDMlNEYjhjMy90V3FnZnAxaGl3UFpBc0xPSVBrVDZvbDNIejJ4bmNVR0xBSll1VzdiaUFua2xhcnJGb3p1ckRJT2FITlUwbi96WGN1czhSUmFYWVlcbjZTeUFKTGZiSnp2RUdsa3NxQjV2K3ZrNUUzazRJWUpNUVhVMDh4L29qbmd6V3ZxK0hzZ1JmQU0wVWhNYUVIMGtXS29zQnNtR2NtOUo1QVhVaFRnMDRCb3VlZi9DZ0VLODBMTk1UYTJTWXBrWXBvUysvZkRoeGJiUjkzTGhKYjZ1dXF0MW5PTEx1b2J0OHhtR3puQUowcnErNS9OaVBrWHplYlBmVlxuMXpRTjhMRk5YcFlSYUExaWVUOFdscDFLV1BoTWRiMmxaWDZWc21aenRXdXZmalpxZytCVlVjblRmbGxCMmwzN1E2ckVINTJhR2FtSmJ6Yk9TRW1sb20wVVg5cEoxa0twUVNwN2NZNnhJcDd3eHhDdVFLWUFvMDBUTlZib0V2YnFnc0dSeVppaWtCRkU3dUs3SWxvaTF1NllHcFdHb0twTnZ1eXNSXG45MHgvV2RhZElBOEROVm5JWjBnM1h5aWI3a01NRm9JSXpFYWhHRzJBVE1sN2hKbnVzTmNDNDRxQlJFcW1LV1FKVlRWM2NaemRqYXR3ekZSY3JUaEI0ZkQ1cFJ4Y0tKOGR0REJCR2xnNGJDV3AwSGxnYWZweXhqa01vdDZRZTJFSEMyU1NwTVZ5bk02RXVpOFFad1ZqUjFYSFJlM2d3OXRTRGxMRmpcbktkaWlRYzFlSGdlZDZHZFhOWjE2aEdjQmtSaFFrL21BaSs5QjlKUzhhQStjR3IzN1gxNGJ6QlNjKzUraWJwVWd0bUxuSUZmanhzbWd4cVpFN2xzOFcxS2NKZllMVnVNcnZkODFZR1pVWlhXdko4dlJEbG81UVkxdm9FYkxjOFBSc2pKakdsQ3pHUDNXaytUaEdZN01BNlNwVDF6OThXbGtQREEzZ1xuRVNuelFKcFVOYU1NTFlhd3g3aGdlSGNJNWhncFRjQUx6WWdNZDVrdzVEZlYzbWd4akpXbzgwbldWTUQ5cEVuNDFLWHVZVkVMVHJJSHVmR3hwRHlKMTBpMHBLR2lyb0lKQWF3QnNqZXZXSnhIN0FKU3pNRDZtTFNzNlI1RUJZNmdxc2ZXWnlWejU5b2NxUXhING8yMmRnQVlBY0x0YkFhQjBpTk94XG5NRGJQRkU5dUU2YkFDd0JuczduQm9kZmNtTWs2dVk5Vm82QTdBYWJSQThKeEx5MDhBQUlqWklYWTBCb2hwaGtDZUl4TmlBbm1CQVEya0FYbWpNcVhHTVJHSmtRTmQ4QjRCZENBdlZkQ0l4MzRFZXBJWVkycnA3aVh1SWlnc2lNUkZoUzR3Q1cyL0FHQVhVT1ZFa3ovb3c5TVU4NE9nTmdGSU9GdEtcbnJrY2pPNDdxWUNTMjlBUjdoQ0U1WUpLUDdUbmVmMUpuUWs5aWtOeUNJN3ZpQURleHphclR1Sm5SK3FNNENSeGtZb2dHNHNTNnpTWWdYQWtvT0x4THBJRVJmRDhnWVJuL2NvRkdTZzlXNFhkaFlKTEkydUNZcFV1WjZBNXJJa1F0Nk53RW40ZG1TZ2hvNUErYVM4dXNTZFZGNkF4b1Vib0ZwbHVRbFxuOThjb0poSVNwd3picmE2S05WT2dhN1NUc1k0TlQ1a21LS2dFeGJka3JXRmZiOEJKR0dtY1FxaktaamczT29wcHBDWHJqRjcwQmpEWVdtL3p0ZDZzN2NJOWRJSFZ1S2VFNXdWOEthcnd6Y0NBOS9pZGptY1RqTWVwY1pvd0NCakl1Mk5MYndBckVUVUJwOGFXTkE5MjVQT0JWNVVCa0FzMCtCOVlOXG5uVUNES0VrbFcxTVRXTUFtQ2t5aElWNE5mNEVOVWEyVlJVeklyMEJyQ0pxaTFhK1pxdlFTTzN4VUg5QjhWYS9KRTNKTmtZR3NLY1d2K3ZSaVFRekthZUNSMFZUMU1BRlNYUENoZ01HS1Buc3dpN1EvaU1zdEFSaHJYSDQrSVRRTW9RYngwSlFwM2I0TkJqMkF5dndPL010UzVqMDl6azFocjFrRmJcbm5DUklsbDVqRzQ3ODJ5aW84U2FBSUYxbnhSd0hMdzdNSTBhOHNFQm9yM0JlQ2VCc3RERzRxRmtySzBCZDY1a2Z1SzVhSTh0TEVhZ1JXUmN1VGViVjVZSG5Dc2puYTRycE5DMy9GN2M0c0J1ZFZJamxXMEFWTDZuSXZhTEQ5WGFKY3FjS0RyM3B6VzZKOHR1Ykxjd0ZkVTlrci9NVXNJSnk2MG1mbVxuQU9mOEdlaHVERjh6VGU1SmRQSlFpS2w5RS96Yjg3V0hScC94cjBiYlI5d09Oa0JTTFZiNkZCbFdYRXVoamorSncza0hnYWtyb3k2dWlvQlBqVDNQbzNkUjVnZXMvM3c5eEEyYzE3blZVWWV1WFdKcFBVNDZLcndIeWZocnJFeFBPNk5UTURmMXBXRTREY01jcGZ5elljQkp1aUNrRGVEMlROeDk0XG5PL0JvbHFoaDJ5bkpRLzhIOG1jV0M5alZLZVREOUVIS1d3ZHdhM1ZFc2hIc1lvOUIwbExCblpVRzNmdkdEVW5QSzNvL1JOS3luS0YyTmd1dEJnT3F5MVJuUSsrZEFlV3NQclJRWHpNYjJxWUNtdFpRRStkbVR5SVBYRk04b2dabXQ4dTRKQ041R0QxeGxmYWlybDU5K01FUXRYcmVUTjRXaXJ4S1YxXG43VnVhMU5sWEZjS01tTk4yRWlwL2JTRHgyYmZtRTczdmh3WGt2cTE3VlgyUDh6eXNMbmlCU0cvNWwrZVo4VXluakEwdENzazhKeFg1OU1tOUpYaDN3UDRVVnZ3OXM1SU4rSk43MldrOXV3ZWNjaWZ3RzN2Mi9XK0FlZjcxc2UrWnRReDZyN3ZlN3gyUFBybGtQKzgrL3lDekdpN2FGenBQVXRBQUFBQUVsRlRrU3VRbUNDYDtcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0ltYWdlU2l6ZSwgU3lzdGVtRmlsZUtleSB9IGZyb20gJy4vaW1hZ2UuZGlyZWN0aXZlLm1vZGVscyc7XG5pbXBvcnQgeyBUcmFuc3BhcmVudEltYWdlLCBUaHVtYm9yU2VydmVySG9zdCwgRXJyb3JJbWFnZSwgUzNIb3N0IH0gZnJvbSAnLi9pbWFnZS5kaXJlY3RpdmUuY29uc3RhbnRzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlY0ltYWdlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2VEaXJlY3RpdmUge1xuXG4gIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGVycm9yT25Mb2FkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY0ltYWdlKHY6IFN5c3RlbUZpbGVLZXkgfCBzdHJpbmcpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lckltYWdlKSB7XG4gICAgICB0aGlzLmlubmVySW1hZ2UgPSB2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBkZWNJbWFnZVNpemU6IERlY0ltYWdlU2l6ZTtcblxuICAvLyBEZWZpbmVzIGlmIHdoaXRlIG1hcmdpbnMgc2hvdWxkIGJlIGNyb3BwZWRcbiAgQElucHV0KCkgdHJpbTogYm9vbGVhbjtcblxuICAvLyBEZWZpbmVzIGlmIHRoZSBpbWFnZSBzaG91bGQgYmUgY3JvcHBlZCBvciBmaXQgdGhlIHNpemUgcmVzcGVjdGluIHRoZSBhc3BlY3QgcmF0aW9cbiAgQElucHV0KCkgZml0SW46IGJvb2xlYW47XG5cbiAgLy8gR2VkIHJlZGltZW5zaW9uZWQgaW1hZ2UgZnJvbSB0aHVtYm9yIGltYWdlIHJlc2l6ZSBzZXJ2aWNlXG4gIEBJbnB1dCgpIHRodW1ib3JpemUgPSB0cnVlO1xuXG4gIHByaXZhdGUgY29udGFpbmVyRWxlbWVudFR5cGU6ICdJTUcnIHwgJ05PVC1JTUcnO1xuXG4gIHByaXZhdGUgaW5uZXJJbWFnZTogU3lzdGVtRmlsZUtleSB8IHN0cmluZyA9IFRyYW5zcGFyZW50SW1hZ2U7XG5cbiAgcHJpdmF0ZSBpbWFnZVBhdGg6IHN0cmluZztcblxuICBwcml2YXRlIGZpbmFsSW1hZ2VVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHRoaXMuZGV0ZWN0Q29udGFpbmVyRWxlbWVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RDb250YWluZXJFbGVtZW50KCkge1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudCA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50VHlwZSA9IHRoaXMuY29udGFpbmVyRWxlbWVudC50YWdOYW1lID09PSAnSU1HJyA/ICdJTUcnIDogJ05PVC1JTUcnO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkSW1hZ2UoKSB7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuaW5uZXJJbWFnZSA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gdGhpcy5pbm5lckltYWdlO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5pbWFnZVBhdGggPSB0aGlzLmV4dHJhY3RJbWFnZVVybEZyb21TeXNmaWxlKCk7XG5cbiAgICAgIGlmICh0aGlzLmltYWdlUGF0aCkge1xuXG4gICAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IHRoaXMuZ2V0RmluYWxVcmwoKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSBFcnJvckltYWdlO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLnRyeVRvTG9hZEltYWdlKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVySW1hZ2VbJ2ZpbGVCYXNlUGF0aCddIHx8IHVuZGVmaW5lZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEZpbmFsVXJsKCkge1xuXG4gICAgaWYgKHRoaXMudGh1bWJvcml6ZSkge1xuXG4gICAgICByZXR1cm4gdGhpcy5nZXRUaHVtYm9yVXJsKCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5nZXRTM1VybCgpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGdldFMzVXJsKCkge1xuICAgIHJldHVybiBgJHtTM0hvc3R9LyR7dGhpcy5pbWFnZVBhdGh9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGh1bWJvclVybCgpIHtcbiAgICBjb25zdCBzaXplID0gdGhpcy5nZXRJbWFnZVNpemUodGhpcy5kZWNJbWFnZVNpemUpO1xuICAgIGNvbnN0IGFzcGVjdCA9IHRoaXMuZ2V0QXNwZWN0KCk7XG4gICAgY29uc3QgdHJpbSA9IHRoaXMuZ2V0VHJpbSgpO1xuICAgIHJldHVybiBgJHtUaHVtYm9yU2VydmVySG9zdH0vJHtzaXplfSR7YXNwZWN0fSR7dHJpbX0vJHt0aGlzLmltYWdlUGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbWFnZVNpemUoZGVjSW1hZ2VTaXplOiBEZWNJbWFnZVNpemUgPSB7fSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke2RlY0ltYWdlU2l6ZS53aWR0aCB8fCAwfXgke2RlY0ltYWdlU2l6ZS5oZWlnaHQgfHwgMH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBc3BlY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZml0SW4gPyAnL2ZpdC1pbicgIDogJyc7XG4gIH1cblxuICBwcml2YXRlIGdldFRyaW0oKSB7XG4gICAgcmV0dXJuIHRoaXMudHJpbSA/ICcvdHJpbScgOiAnJztcbiAgfVxuXG4gIHByaXZhdGUgdHJ5VG9Mb2FkSW1hZ2UoKSB7XG4gICAgY29uc3QgZG93bmxvYWRpbmdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGRvd25sb2FkaW5nSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5jcmVhdGVJbWFnZSgpO1xuICAgIH07XG5cbiAgICBkb3dubG9hZGluZ0ltYWdlLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSBFcnJvckltYWdlO1xuICAgICAgdGhpcy5jcmVhdGVJbWFnZSgpO1xuICAgIH07XG5cbiAgICBkb3dubG9hZGluZ0ltYWdlLnNyYyA9IHRoaXMuZmluYWxJbWFnZVVybDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyRWxlbWVudFR5cGUgPT09ICdJTUcnKSB7XG4gICAgICB0aGlzLnNldEltYWdlZWxlbWVudFNyYygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGVuZEltYWdlVG9CZygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kSW1hZ2VUb0JnKCkge1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyB0aGlzLmZpbmFsSW1hZ2VVcmwgKyAnKSc7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRTaXplID0gJzEwMCUnO1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkZWMtaW1hZ2UtYmctbG9hZGluZycpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbWFnZWVsZW1lbnRTcmMoKSB7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgdGhpcy5maW5hbEltYWdlVXJsKTtcbiAgfVxuXG59XG5cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNJbWFnZURpcmVjdGl2ZSB9IGZyb20gJy4vaW1hZ2UuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNJbWFnZURpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtEZWNJbWFnZURpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2VNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0ltYWdlU2l6ZSwgU3lzdGVtRmlsZUtleSB9IGZyb20gJy4vLi4vLi4vZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUubW9kZWxzJztcbmltcG9ydCB7IFRodW1ib3JTZXJ2ZXJIb3N0IH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS5jb25zdGFudHMnO1xuXG5leHBvcnQgdHlwZSBab29tTW9kZSA9ICdob3ZlcicgfCAnY2xpY2snIHwgJ3RvZ2dsZScgfCAnaG92ZXItZnJlZXplJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWltYWdlLXpvb20nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJpbWFnZWhpZ2hsaWdodC1jb250YWluZXJcIiA+XG4gIDxuZ3gtaW1hZ2Utem9vbVxuICAgIFt0aHVtYkltYWdlXT1cInJlc2l6ZWRJbWFnZVVybFwiXG4gICAgW2Z1bGxJbWFnZV09XCJmdWxsSW1hZ2VVcmxcIlxuICAgIFt6b29tTW9kZV09XCJ6b29tTW9kZVwiXG4gICAgW2VuYWJsZVNjcm9sbFpvb21dPVwiZW5hYmxlU2Nyb2xsWm9vbVwiXG4gICAgW3Njcm9sbFN0ZXBTaXplXT1cInNjcm9sbFN0ZXBTaXplXCJcbiAgICBbZW5hYmxlTGVuc109XCJlbmFibGVMZW5zXCJcbiAgICBbbGVuc1dpZHRoXT1cImxlbnNXaWR0aFwiXG4gICAgW2xlbnNIZWlnaHRdPVwibGVuc0hlaWdodFwiXG4gID48L25neC1pbWFnZS16b29tPlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2AuaW1hZ2VoaWdobGlnaHQtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7Y3Vyc29yOnpvb20taW59YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2Vab29tQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmdWxsSW1hZ2VQYXRoOiBhbnk7XG5cbiAgZnVsbEltYWdlVXJsOiBhbnk7XG5cbiAgcmVzaXplZEltYWdlVXJsOiBhbnk7XG5cbiAgQElucHV0KCkgem9vbU1vZGU6IFpvb21Nb2RlID0gJ2NsaWNrJztcblxuICBASW5wdXQoKSBlbmFibGVTY3JvbGxab29tID0gdHJ1ZTtcblxuICBASW5wdXQoKSBzY3JvbGxTdGVwU2l6ZSA9IDAuMTtcblxuICBASW5wdXQoKSBlbmFibGVMZW5zID0gdHJ1ZTtcblxuICBASW5wdXQoKSBsZW5zV2lkdGggPSAxMDA7XG5cbiAgQElucHV0KCkgbGVuc0hlaWdodCA9IDEwMDtcblxuICBASW5wdXQoKVxuICBzZXQgc3lzdGVtRmlsZSh2OiBTeXN0ZW1GaWxlS2V5KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuX3N5c3RlbUZpbGUpIHtcbiAgICAgIHRoaXMuX3N5c3RlbUZpbGUgPSB2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgc3lzdGVtRmlsZSgpOiBTeXN0ZW1GaWxlS2V5IHtcbiAgICByZXR1cm4gdGhpcy5fc3lzdGVtRmlsZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBzaXplKHY6IERlY0ltYWdlU2l6ZSkge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl90aHVtYlNpemUgPSB2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2l6ZSgpOiBEZWNJbWFnZVNpemUge1xuICAgIHJldHVybiB0aGlzLl90aHVtYlNpemU7XG4gIH1cblxuICBwcml2YXRlIF9zeXN0ZW1GaWxlOiBTeXN0ZW1GaWxlS2V5O1xuXG4gIHByaXZhdGUgX3RodW1iU2l6ZTogRGVjSW1hZ2VTaXplO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMuc3lzdGVtRmlsZSAmJiB0aGlzLnNpemUpIHtcbiAgICAgIHRoaXMuc2V0RmluYWxJbWFnZVVybCgpO1xuICAgICAgdGhpcy5zZXRPcmlnaW5hbEltYWdlUGF0aCgpO1xuICAgICAgdGhpcy5zZXRUaHVtYm9ybFVybCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0RmluYWxJbWFnZVVybCgpIHtcbiAgICB0aGlzLmZ1bGxJbWFnZVVybCA9IHRoaXMuc3lzdGVtRmlsZS5maWxlQmFzZVVybCArICcuJyArIHRoaXMuc3lzdGVtRmlsZS5leHRlbnNpb247XG4gICAgY29uc29sZS5sb2coJ3NldEZpbmFsSW1hZ2VVcmwnLCB0aGlzLmZ1bGxJbWFnZVVybCk7XG4gIH1cblxuICBwcml2YXRlIHNldE9yaWdpbmFsSW1hZ2VQYXRoKCkge1xuICAgIHRoaXMuZnVsbEltYWdlUGF0aCA9IHRoaXMuZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKTtcbiAgICBjb25zb2xlLmxvZygnc2V0T3JpZ2luYWxJbWFnZVBhdGgnLCB0aGlzLmZ1bGxJbWFnZVBhdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUaHVtYm9ybFVybCgpIHtcbiAgICB0aGlzLnJlc2l6ZWRJbWFnZVVybCA9IHRoaXMuZ2V0VGh1bWJvclVybCgpO1xuICAgIGNvbnNvbGUubG9nKCdzZXRUaHVtYm9ybFVybCcsIHRoaXMucmVzaXplZEltYWdlVXJsKTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLnN5c3RlbUZpbGVbJ2ZpbGVCYXNlUGF0aCddIHx8IHVuZGVmaW5lZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlU2l6ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLnNpemUud2lkdGggfHwgMH14JHt0aGlzLnNpemUuaGVpZ2h0IHx8IDB9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGh1bWJvclVybCgpIHtcbiAgICBjb25zdCBzaXplID0gdGhpcy5nZXRJbWFnZVNpemUoKTtcbiAgICByZXR1cm4gYCR7VGh1bWJvclNlcnZlckhvc3R9LyR7c2l6ZX0vJHt0aGlzLmZ1bGxJbWFnZVBhdGh9YDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hJbWFnZVpvb21Nb2R1bGUgfSBmcm9tICduZ3gtaW1hZ2Utem9vbSc7XG5pbXBvcnQgeyBEZWNJbWFnZVpvb21Db21wb25lbnQgfSBmcm9tICcuL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTmd4SW1hZ2Vab29tTW9kdWxlLmZvclJvb3QoKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNJbWFnZVpvb21Db21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0ltYWdlWm9vbUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ltYWdlWm9vbU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjR2FsbGVyeUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLWdhbGxlcnkuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0ltYWdlTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLm1vZHVsZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE5ndUNhcm91c2VsTW9kdWxlIH0gZnJvbSAnQG5ndS9jYXJvdXNlbCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0ICdoYW1tZXJqcyc7XG5pbXBvcnQgeyBEZWNJbWFnZVpvb21Nb2R1bGUgfSBmcm9tICcuLy4uL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGVjSW1hZ2VNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTmd1Q2Fyb3VzZWxNb2R1bGUsXG4gICAgRGVjSW1hZ2Vab29tTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0dhbGxlcnlDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0dhbGxlcnlDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHYWxsZXJ5TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1pY29uJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJmb250XCI+XG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidtYXQnXCI+XG4gICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPnt7aWNvbn19PC9pPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2ZhcydcIj5cbiAgICA8aSBjbGFzcz1cImZhIHt7J2ZhLScraWNvbn19XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuXG48c3BhbiAjdGV4dCBbaGlkZGVuXT1cInRydWVcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9zcGFuPlxuYCxcbiAgc3R5bGVzOiBbYC5tYXRlcmlhbC1pY29uc3tjb2xvcjppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0O2Rpc3BsYXk6aW5saW5lLWJsb2NrOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTYlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgxNiUpOy13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNJY29uQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgaWNvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGZvbnQ6ICdtYXQnIHwgJ2Zhcyc7XG5cbiAgQFZpZXdDaGlsZCgndGV4dCcpIHRleHRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5pY29uID0gdGhpcy50ZXh0RWxlbWVudC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxuICAgIH0sIDApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vZGVjLWljb24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUsIE1hdEljb25SZWdpc3RyeSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNJY29uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0ljb25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ljb25Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hdEljb25SZWdpc3RyeTogTWF0SWNvblJlZ2lzdHJ5KSB7XG4gICAgdGhpcy5tYXRJY29uUmVnaXN0cnkucmVnaXN0ZXJGb250Q2xhc3NBbGlhcygnZmFzJywgJ2ZhJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxhYmVsJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9ySGV4fVwiIFtuZ0NsYXNzXT1cImRlY0NsYXNzXCIgZGVjQ29udHJhc3RGb250V2l0aEJnPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BkaXZ7bWFyZ2luOjRweDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjdweCAxMnB4O2JvcmRlci1yYWRpdXM6MjRweDthbGlnbi1pdGVtczpjZW50ZXI7Y3Vyc29yOmRlZmF1bHR9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGFiZWxDb21wb25lbnQge1xuICBASW5wdXQoKSBjb2xvckhleDogc3RyaW5nO1xuICBASW5wdXQoKSBkZWNDbGFzczogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENvdHJhc3QgY29uZmlndXJhdGlvblxuICpcbiAqIFVzZWQgdG8gZGVmaW5lIHNvbWUgY3VzdG9tIGNvbmZpZ3VyYXRpb24gYXMgY29sb3JzIGFuZCBicmVha3BvaW50XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlQ29uZmlnIHtcbiAgbHVtYUJyZWFrUG9pbnQ6IHN0cmluZztcbiAgbGlnaHRDb2xvcjogc3RyaW5nO1xuICBkYXJrQ29sb3I6IHN0cmluZztcbn1cblxuY29uc3QgREVGQVVMVF9MVU1BX0JSRUFLUE9JTlQgPSAyMDA7XG5cbi8qXG4qIENvbnRyYXN0IEZvbnQgV2l0aCBCYWNrZ3JvdW5kIERpcmVjdGl2ZVxuKlxuKiBDb250cmFzdHMgdGhlIHRleHQgY29sb3Igd2l0aCB0aGUgYmFja2dyb3VuZC1jb2xvciB0byBhdm9pZCB3aGl0ZSBjb2xvciBpbiBsaWdoIGJhY2tncm91bmQgYW5kIGJsYWNrIGNvbG9yIGluIGRhcmtlbiBvbmVzLlxuKiBJdCBjYW4gYmUgdXNlZCBhcyBhdHRyaWJ1dGUgaW4gYW55IGVsZW1lbnQgd2l0aCBvciB3aXRob3V0IHBhc3NpbmcgY3VzdG9tIGNvbmZpZ3VyYXRpb25cbiogRXhhbXBsZSB3aXRob3V0IGN1c3RvbSBjb25maWd1cmF0aW9uOiA8ZGl2IGRlY0NvbnRyYXN0Rm9udFdpdGhCZ1wiPjwvZGl2PlxuKiBFeGFtcGxlIHdpdGggY3VzdG9tIGNvbmZpZ3VyYXRpb246IDxkaXYgW2RlY0NvbnRyYXN0Rm9udFdpdGhCZ109XCJ7ZGFya0NvbG9yOiAncmVkJ31cIj48L2Rpdj5cbipcbiogQ29uZmlndXJhdGlvbiBwYXJhbXM6XG4qIGx1bWFCcmVha1BvaW50OiB0aGUgcG9pbnQgd2hlcmUgd2Ugc2hvdWxkIGNoYW5nZSB0aGUgZm9udCBjb2xvci4gVGhpcyBpcyB0aGUgbGlndGggZmVlbGluZyBicmVha3BvaW50LlxuKiBsaWdodENvbG9yOiB0aGUgdGV4dCBjb2xvciB1c2VkIGluIGRhcmsgYmFja2dyb3VuZHNcbiogZGFya0NvbG9yOiB0aGUgdGV4dCBjb2xvciB1c2VkIGluIGxpZ3RoIGJhY2tncm91bmRzXG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gaGV4VG9SZ2JOZXcoaGV4KSB7XG5cbiAgY29uc3QgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gIHJldHVybiByZXN1bHQgPyB7XG4gICAgcjogcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiAgfSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFuZGFyZGl6ZV9jb2xvcihiZ0NvbG9yKSB7XG5cbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgY3R4LmZpbGxTdHlsZSA9IGJnQ29sb3I7XG5cbiAgcmV0dXJuIGN0eC5maWxsU3R5bGU7XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlY0NvbnRyYXN0Rm9udFdpdGhCZ10nXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIERvQ2hlY2sge1xuXG4gIHByaXZhdGUgY29uZmlnO1xuXG4gIHByaXZhdGUgYmdDb2xvcjtcblxuICBASW5wdXQoKSBzZXQgZGVjQ29udHJhc3RGb250V2l0aEJnKGNvbmZpZzogRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlQ29uZmlnKSB7XG5cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIHRoaXMuZG9EZWNDb250cmFzdEZvbnRXaXRoQmcoKTtcblxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuXG4gICAgdGhpcy5iZ0NvbG9yID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcblxuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuXG4gICAgY29uc3QgYmdDb2xvciA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICBpZiAoYmdDb2xvciAhPT0gdGhpcy5iZ0NvbG9yKSB7XG5cbiAgICAgIHRoaXMuYmdDb2xvciA9IGJnQ29sb3I7XG5cbiAgICAgIHRoaXMuZG9EZWNDb250cmFzdEZvbnRXaXRoQmcoKTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBkb0RlY0NvbnRyYXN0Rm9udFdpdGhCZygpIHtcblxuICAgIGNvbnN0IGx1bWFCcmVha1BvaW50ID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmx1bWFCcmVha1BvaW50KSA/IHRoaXMuY29uZmlnLmx1bWFCcmVha1BvaW50IDogREVGQVVMVF9MVU1BX0JSRUFLUE9JTlQ7XG5cbiAgICBjb25zdCBoZXhhQmdDb2xvciA9IHN0YW5kYXJkaXplX2NvbG9yKHRoaXMuYmdDb2xvcik7XG5cbiAgICBjb25zdCByZ2JDb2xvciA9IGhleFRvUmdiTmV3KGhleGFCZ0NvbG9yKTtcblxuICAgIGNvbnN0IGx1bWEgPSAwLjIxMjYgKiByZ2JDb2xvci5yICsgMC43MTUyICogcmdiQ29sb3IuZyArIDAuMDcyMiAqIHJnYkNvbG9yLmI7IC8vIHBlciBJVFUtUiBCVC43MDlcblxuICAgIGlmIChsdW1hIDwgbHVtYUJyZWFrUG9pbnQpIHtcblxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmNvbG9yID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmxpZ2h0Q29sb3IpID8gdGhpcy5jb25maWcubGlnaHRDb2xvciA6ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5jb2xvciA9ICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5kYXJrQ29sb3IpID8gdGhpcy5jb25maWcuZGFya0NvbG9yIDogJyMyMzJlMzgnO1xuXG4gICAgfVxuXG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGVjLWNvbnRyYXN0LWZvbnQtd2l0aC1iZy5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNDb250cmFzdEZvbnRXaXRoQmdNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGFiZWxDb21wb25lbnQgfSBmcm9tICcuL2RlYy1sYWJlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjQ29udHJhc3RGb250V2l0aEJnTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL2NvbG9yL2NvbnRyYXN0LWZvbnQtd2l0aC1iZy9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIERlY0NvbnRyYXN0Rm9udFdpdGhCZ01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjTGFiZWxDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0xhYmVsQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGFiZWxNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWx0ZXJzLCBGaWx0ZXJHcm91cHMgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIENvdW50UmVwb3J0IHtcblxuICBjb3VudDogbnVtYmVyO1xuICBjaGlsZHJlbj86IENvdW50UmVwb3J0W107XG5cbn1cblxuLypcbiAgKiBEZWNMaXN0UHJlU2VhcmNoXG4gICpcbiAgKiBVc2VkIGFzIG1pZGRsZXdhcmUgdG8gbWFuaXB1bGF0ZSB0aGUgZmlsdGVyIGJlZm9yZSBmZXRjaG5nIHRoZSBkYXRhXG4gICovXG5leHBvcnQgdHlwZSBEZWNMaXN0UHJlU2VhcmNoID0gKGZpbHRlckdyb3VwczogRmlsdGVyR3JvdXBzKSA9PiBGaWx0ZXJHcm91cHM7XG5cblxuLypcbiAgKiBEZWNMaXN0RmV0Y2hNZXRob2RcbiAgKlxuICAqIFVzZWQgdG8gZmV0Y2ggZGF0YSBmcm9tIHJlbW90ZSBBUElcbiAgKi9cbmV4cG9ydCB0eXBlIERlY0xpc3RGZXRjaE1ldGhvZCA9IChlbmRwb2ludDogc3RyaW5nLCBmaWx0ZXI6IGFueSkgPT4gT2JzZXJ2YWJsZTxEZWNMaXN0RmV0Y2hNZXRob2RSZXNwb25zZT47XG5cbi8qXG4gICogTGlzdFR5cGVcbiAgKlxuICAqIExpc3QgdHlwZXNcbiAgKi9cbmV4cG9ydCB0eXBlIERlY0xpc3RUeXBlID0gJ3RhYmxlJyB8ICdncmlkJztcblxuLypcbiAgKiBEZWNMaXN0RmV0Y2hNZXRob2RSZXNwb25zZVxuICAqXG4gICogUmVzcG9uc2UgcmVjZWl2ZWQgYnkgZmV0Y2ggRGVjTGlzdEZldGNoTWV0aG9kXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIERlY0xpc3RGZXRjaE1ldGhvZFJlc3BvbnNlIHtcbiAgcmVzdWx0OiB7XG4gICAgcm93czogYW55W107XG4gICAgY291bnQ6IG51bWJlcjtcbiAgfTtcbn1cblxuLypcbiAgKiBEZWNMaXN0RmlsdGVyXG4gICpcbiAgKiBTdHJ1Y3R1cmUgb2YgdGFicyBmaWx0ZXJzXG4gICovXG5leHBvcnQgY2xhc3MgRGVjTGlzdEZpbHRlciB7XG4gIGNoaWxkcmVuPzogRGVjTGlzdEZpbHRlcltdO1xuICBjb3VudD86IHN0cmluZztcbiAgZGVmYXVsdD86IGJvb2xlYW47XG4gIGZpbHRlcnM6IEZpbHRlcnM7XG4gIGhpZGU/OiBib29sZWFuO1xuICBsYWJlbDogc3RyaW5nO1xuICBjb2xvcjogc3RyaW5nO1xuICBsaXN0TW9kZT86IERlY0xpc3RUeXBlO1xuICBwZXJtaXNzaW9ucz86IHN0cmluZ1tdO1xuICB1aWQ/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogYW55ID0ge30pIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gZGF0YS5jaGlsZHJlbiA/IGRhdGEuY2hpbGRyZW4ubWFwKGZpbHRlciA9PiBuZXcgRGVjTGlzdEZpbHRlcihmaWx0ZXIpKSA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvdW50ID0gZGF0YS5jb3VudCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5kZWZhdWx0ID0gZGF0YS5kZWZhdWx0IHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZpbHRlcnMgPSBkYXRhLmZpbHRlcnMgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuaGlkZSA9IGRhdGEuaGlkZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5sYWJlbCA9IGRhdGEubGFiZWwgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yIHx8ICcjNkU3NTdBJztcbiAgICB0aGlzLmxpc3RNb2RlID0gZGF0YS5saXN0TW9kZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5wZXJtaXNzaW9ucyA9IGRhdGEucGVybWlzc2lvbnMgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMudWlkID0gZGF0YS51aWQgfHwgZGF0YS5sYWJlbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjTGlzdEZldGNoTWV0aG9kLCBEZWNMaXN0RmlsdGVyIH0gZnJvbSAnLi8uLi8uLi9saXN0Lm1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYnMtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGlzdC10YWJzLWZpbHRlci13cmFwcGVyXCIgKm5nSWY9XCJ2aXNpYmxlRmlsdGVycyBhcyBmaWx0ZXJzXCI+XG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cImRlYy10YWItaGVhZGVyXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdGFiRmlsdGVyIG9mIGZpbHRlcnNcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICpkZWNQZXJtaXNzaW9uPVwidGFiRmlsdGVyLnBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgICAgbWF0LWJ1dHRvblxuICAgICAgICAgICAgICBjbGFzcz1cInVwcGVyY2FzZVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RUYWIodGFiRmlsdGVyLnVpZClcIlxuICAgICAgICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwic2VsZWN0ZWRUYWJVaWQgPT0gKHRhYkZpbHRlci51aWQpXCI+XG4gICAgICAgIDxzcGFuPnt7ICdsYWJlbC4nICsgdGFiRmlsdGVyLmxhYmVsIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50UmVwb3J0XCIgY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLXNtYWxsXCI+e3sgY291bnRSZXBvcnRbdGFiRmlsdGVyLnVpZF0uY291bnQgfX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubGlzdC10YWJzLWZpbHRlci13cmFwcGVye21hcmdpbi10b3A6OHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyLmJvdHRvbXtib3JkZXItYm90dG9tOjB9Lmxpc3QtdGFicy1maWx0ZXItd3JhcHBlciAuZGVjLXRhYi1oZWFkZXIgLmJhZGdle21hcmdpbi1sZWZ0OjhweH0ubGlzdC10YWJzLWZpbHRlci13cmFwcGVyIC5kZWMtdGFiLWhlYWRlciAuYmFkZ2UuYmFkZ2UtcGlsbHtwYWRkaW5nOjhweDtmb250LXNpemU6c21hbGw7Ym9yZGVyLXJhZGl1czoyNHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyIC5iYWRnZS5iYWRnZS1waWxsLmJhZGdlLXNtYWxse2ZvbnQtc2l6ZTp4LXNtYWxsO3BhZGRpbmc6NHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBjdXN0b21GZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kO1xuXG4gIG5hbWU6IHN0cmluZzsgLy8gbGlzdCB1bmlxdWUgbmFtZSB0byBpZGVudGlmeSB0aGUgdGFiIGluIHVybFxuXG4gIHNlbGVjdGVkVGFiVWlkOiBzdHJpbmc7XG5cbiAgc2VydmljZTogYW55O1xuXG4gIEBJbnB1dCgpIGNvdW50UmVwb3J0OiBhbnk7XG5cbiAgQElucHV0KClcbiAgc2V0IGZpbHRlcnModjogRGVjTGlzdEZpbHRlcltdKSB7XG4gICAgaWYgKHRoaXMuX2ZpbHRlcnMgIT09IHYpIHtcbiAgICAgIHRoaXMuX2ZpbHRlcnMgPSB2ID8gdi5tYXAoZmlsdGVyID0+IG5ldyBEZWNMaXN0RmlsdGVyKGZpbHRlcikpIDogW107XG4gICAgfVxuICB9XG5cbiAgZ2V0IGZpbHRlcnMoKTogRGVjTGlzdEZpbHRlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVycztcbiAgfVxuXG4gIHByaXZhdGUgZGVmYXVsdFRhYjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2ZpbHRlcnM6IERlY0xpc3RGaWx0ZXJbXSA9IFtdO1xuXG4gIHByaXZhdGUgd2F0aFVybFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIEBPdXRwdXQoJ3NlYXJjaCcpIHNlYXJjaDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCd0YWJDaGFuZ2UnKSB0YWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHsgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgZG9GaXJzdExvYWQgPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGF2b2lkcyBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yIHNlbGVjdGluZyB0aGUgYWN0aXZlIHRhYlxuICAgICAgdGhpcy53YXRjaFRhYkluVXJsUXVlcnkoKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGdldENvdW50T2YodWlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudFJlcG9ydCAmJiB0aGlzLmNvdW50UmVwb3J0W3VpZF0gPj0gMCA/IHRoaXMuY291bnRSZXBvcnRbdWlkXSA6ICc/JztcbiAgfVxuXG4gIHNlbGVjdFRhYih0YWIpIHtcbiAgICB0aGlzLnNldFRhYkluVXJsUXVlcnkodGFiKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZFRhYigpIHtcblxuICAgIHJldHVybiB0aGlzLmZpbHRlcnMgPyB0aGlzLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnVpZCA9PT0gdGhpcy5zZWxlY3RlZFRhYlVpZCkgOiB1bmRlZmluZWQ7XG5cbiAgfVxuXG4gIGdldCB2aXNpYmxlRmlsdGVycygpIHtcbiAgICBjb25zdCB2aXNpYmxlID0gdGhpcy5maWx0ZXJzID8gdGhpcy5maWx0ZXJzLmZpbHRlcigoZmlsdGVyKSA9PiAhZmlsdGVyLmhpZGUpIDogW107XG4gICAgcmV0dXJuICh2aXNpYmxlICYmIHZpc2libGUubGVuZ3RoID4gMSkgPyB2aXNpYmxlIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3REZWZhdWx0VGFiKCkge1xuXG4gICAgY29uc3QgaGFzRGVmYXVsdDogYW55ID0gdGhpcy5maWx0ZXJzLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiBpdGVtLmRlZmF1bHQ7XG4gICAgfSk7XG5cbiAgICBpZiAoaGFzRGVmYXVsdCkge1xuXG4gICAgICB0aGlzLmRlZmF1bHRUYWIgPSBoYXNEZWZhdWx0LnVpZDtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuZGVmYXVsdFRhYiA9IHRoaXMuZmlsdGVyc1swXS51aWQ7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgb25TZWFyY2ggPSAodGFiLCByZWNvdW50ID0gZmFsc2UpID0+IHtcblxuICAgIHRoaXMuc2VsZWN0ZWRUYWJVaWQgPSB0YWIudWlkO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVycyAmJiB0YWIpIHtcblxuICAgICAgY29uc3QgZXZlbnQgPSB7XG4gICAgICAgIGZpbHRlcnM6IHRhYi5maWx0ZXJzLFxuICAgICAgICBjaGlsZHJlbjogdGFiLmNoaWxkcmVuLFxuICAgICAgICByZWNvdW50OiByZWNvdW50LFxuICAgICAgfTtcblxuICAgICAgdGhpcy5zZWFyY2guZW1pdChldmVudCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgY29tcG9uZW50VGFiTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy10YWInO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUYWJJblVybFF1ZXJ5KHRhYikge1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgICBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0gPSB0YWI7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB3YXRjaFRhYkluVXJsUXVlcnkoKSB7XG5cbiAgICB0aGlzLmRldGVjdERlZmF1bHRUYWIoKTtcblxuICAgIHRoaXMud2F0aFVybFN1YnNjcmlwdGlvbiA9IHRoaXMucm91dGUucXVlcnlQYXJhbXNcbiAgICAgIC5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhYiA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0gfHwgdGhpcy5kZWZhdWx0VGFiO1xuXG4gICAgICAgIGlmICh0YWIgIT09IHRoaXMuc2VsZWN0ZWRUYWJVaWQpIHtcblxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGFiID0gdGhpcy5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci51aWQgPT09IHRhYik7XG5cbiAgICAgICAgICB0aGlzLm9uU2VhcmNoKHNlbGVjdGVkVGFiKTtcblxuICAgICAgICAgIHRoaXMudGFiQ2hhbmdlLmVtaXQodGFiKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYkluVXJsUXVlcnkoKSB7XG4gICAgaWYgKHRoaXMud2F0aFVybFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy53YXRoVXJsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWFkdmFuY2VkLWZpbHRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuXG4gIDxkaXYgZnhGbGV4PlxuXG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVSZWZcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntmb3JtOiBmb3JtfVwiXG4gICAgPjwvbmctY29udGFpbmVyPlxuXG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4PlxuXG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgZW5kXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cblxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInN1Ym1pdCgpXCI+e3sgJ2xhYmVsLnNlYXJjaCcgfCB0cmFuc2xhdGUgfCB1cHBlcmNhc2UgfX08L2J1dHRvbj5cblxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWJ1dHRvbiAoY2xpY2spPVwicmVzZXQoKVwiPnt7ICdsYWJlbC5yZXNldCcgfCB0cmFuc2xhdGUgfCB1cHBlcmNhc2UgfX08L2J1dHRvbj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG48L2Rpdj5cblxuXG5cblxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZm9ybTogYW55ID0ge307XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgb25TZWFyY2ggPSAoKSA9PiB7fTtcblxuICBvbkNsZWFyID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMub25DbGVhcigpO1xuICB9XG5cbiAgc3VibWl0KCkge1xuICAgIHRoaXMub25TZWFyY2goKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtdGFicy1maWx0ZXIvbGlzdC10YWJzLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9saXN0LWFkdmFuY2VkLWZpbHRlci9saXN0LWFkdmFuY2VkLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNMaXN0UHJlU2VhcmNoLCBEZWNMaXN0RmlsdGVyIH0gZnJvbSAnLi8uLi9saXN0Lm1vZGVscyc7XG5pbXBvcnQgeyBGaWx0ZXJHcm91cHMgfSBmcm9tICcuLy4uLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsJztcbmltcG9ydCB7IFBsYXRmb3JtTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1maWx0ZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJsaXN0LWZpbHRlci13cmFwcGVyXCI+XG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3cgd3JhcFwiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiPlxuICAgIDwhLS1cbiAgICAgIENvdW50ZXJcbiAgICAtLT5cbiAgICA8ZGl2IGZ4RmxleD1cIjMwXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY291bnQgPj0gMCAmJiAhbG9hZGluZ1wiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID09PSAwXCIgY2xhc3M9XCJkZWMtYm9keS1zdHJvbmdcIj57eyBcImxhYmVsLnJlY29yZC1ub3QtZm91bmRcIiB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA9PT0gMVwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+e3sgXCJsYWJlbC5vbmUtcmVjb3JkLWZvdW5kXCIgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnQgPiAxXCIgY2xhc3M9XCJkZWMtYm9keS1zdHJvbmdcIj4ge3sgXCJsYWJlbC5yZWNvcmRzLWZvdW5kXCIgfCB0cmFuc2xhdGU6e2NvdW50OmNvdW50fSB9fTwvc3Bhbj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBmeEZsZXg9XCI3MFwiIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuXG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiIGNsYXNzPVwic2VhcmNoLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGNsYXNzPVwiaW5wdXQtc2VhcmNoLWNvbnRhaW5lclwiIFtjbGFzcy5hY3RpdmVdPVwic2hvd1NlYXJjaElucHV0XCI+XG4gICAgICAgICAgICA8IS0tIGdhcCAtLT5cbiAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0bi10b29nbGUtc2VhcmNoXCI+XG4gICAgICAgICAgICAgIDxtYXQtaWNvbiAoY2xpY2spPVwidG9nZ2xlU2VhcmNoSW5wdXQoKVwiPnNlYXJjaDwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8Zm9ybSBmeEZsZXggcm9sZT1cImZvcm1cIiAoc3VibWl0KT1cIm9uU2VhcmNoKClcIj5cbiAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMTZweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBjbGFzcz1cImlucHV0LXNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmFyLWhcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPGlucHV0IGZ4RmxleCAjaW5wdXRTZWFyY2ggbmFtZT1cInNlYXJjaFwiIFsobmdNb2RlbCldPVwiZmlsdGVyRm9ybS5zZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiYWR2YW5jZWRGaWx0ZXJDb21wb25lbnRcIiBjbGFzcz1cImNsaWNrXCIgKGNsaWNrKT1cInRvZ2dsZUFkdmFuY2VkRmlsdGVyKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVjLXNtYWxsIGJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaFwiPnt7XCJsYWJlbC5hZHZhbmNlZC1vcHRpb25zXCIgfCB0cmFuc2xhdGV9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8IS0tZ2FwLS0+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLVJlZnJlc2ggc2VhcmNoLS0+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIj5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1pbmZvIG1hcmdpbi1pY29uXCIgKGNsaWNrKT1cIm9uU2VhcmNoKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5yZWZyZXNoPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tQ2xlYXIgZmlsdGVycy0tPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgKm5nSWY9XCJmaWx0ZXJHcm91cHNXaXRob3V0VGFicz8ubGVuZ3RoXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4taW5mb1wiIChjbGljayk9XCJvbkNsZWFyKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgKm5nSWY9XCJzaG93SW5mb0J1dHRvblwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWluZm9cIiAoY2xpY2spPVwib25DbGlja0luZm8oKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmluZm9fb3V0bGluZTwvbWF0LWljb24+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cblxuICA8ZGl2ICpuZ0lmPVwic2hvd0FkdmFuY2VkRmlsdGVyXCI+XG5cbiAgICA8bWF0LWNhcmQgY2xhc3M9XCJhZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyXCIgW25nQ2xhc3NdPVwieydyZW1vdmUtYnV0dG9uLWVuYWJsZWQnOiBmaWx0ZXJHcm91cHNXaXRob3V0VGFicz8ubGVuZ3RofVwiPlxuXG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cblxuICAgICAgICA8YSAoY2xpY2spPVwiY2xvc2VGaWx0ZXJzKClcIiBjbGFzcz1cImJ0bi1jbG9zZS1hZHZhbmNlZC1zZWFyY2hcIj5cblxuICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jbG9zZTwvaT5cblxuICAgICAgICA8L2E+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2PlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWFkdmFuY2VkLWZpbHRlclwiPjwvbmctY29udGVudD5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L21hdC1jYXJkPlxuXG4gIDwvZGl2PlxuXG4gIDxkZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZVxuICAgICpuZ0lmPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aFwiXG4gICAgW2ZpbHRlckdyb3Vwc109XCJmaWx0ZXJHcm91cHNXaXRob3V0VGFic1wiXG4gICAgKHJlbW92ZSk9XCJyZW1vdmVEZWNGaWx0ZXJHcm91cCgkZXZlbnQpXCJcbiAgICAoZWRpdCk9XCJlZGl0RGVjRmlsdGVyR3JvdXAoJGV2ZW50KVwiPjwvZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWU+XG5cbiAgPGRlYy1saXN0LXRhYnMtZmlsdGVyIFtmaWx0ZXJzXT1cImZpbHRlcnNcIiBbY291bnRSZXBvcnRdPVwiY291bnRSZXBvcnRcIj48L2RlYy1saXN0LXRhYnMtZmlsdGVyPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmxpc3QtZmlsdGVyLXdyYXBwZXJ7bWFyZ2luOjAgMCAxNnB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5saXN0LWZpbHRlci13cmFwcGVyIC5tYXQtaWNvbntjb2xvcjojOTk5fS5saXN0LWZpbHRlci13cmFwcGVyIC5zZWFyY2gtdGVybS1pbnB1dHt3aWR0aDo1MDBweDttYXJnaW4tcmlnaHQ6OHB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5pbmxpbmUtZm9ybXtkaXNwbGF5OmlubGluZS1ibG9ja30ubGlzdC1maWx0ZXItd3JhcHBlciAuYWR2YW5jZWQtc2VhcmNoLWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NzRweDt6LWluZGV4OjE7cmlnaHQ6MzBweDt3aWR0aDo1NTJweH0ubGlzdC1maWx0ZXItd3JhcHBlciAuYWR2YW5jZWQtc2VhcmNoLWNvbnRhaW5lci5yZW1vdmUtYnV0dG9uLWVuYWJsZWR7cmlnaHQ6NjJweDt3aWR0aDo1NTFweH0ubGlzdC1maWx0ZXItd3JhcHBlciAuYWR2YW5jZWQtc2VhcmNoLWNvbnRhaW5lciAuYnRuLWNsb3NlLWFkdmFuY2VkLXNlYXJjaHtjdXJzb3I6cG9pbnRlcn0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lcnt0cmFuc2l0aW9uOmFsbCAuM3MgZWFzZTtvdmVyZmxvdzpoaWRkZW47d2lkdGg6NDBweDtoZWlnaHQ6NTBweH0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lci5hY3RpdmV7YmFja2dyb3VuZDojZjhmOGZhO2NvbG9yOiM5OTk7d2lkdGg6NjAwcHh9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIuYWN0aXZlIC5idG4tb3Blbi1hZHZhbmNlZC1zZWFyY2h7ZGlzcGxheTppbmxpbmV9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaHt3aWR0aDoxMDAlfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2ggaW5wdXR7Zm9udDppbmhlcml0O2JhY2tncm91bmQ6MCAwO2NvbG9yOmN1cnJlbnRDb2xvcjtib3JkZXI6bm9uZTtvdXRsaW5lOjA7cGFkZGluZzowO3dpZHRoOjEwMCU7dmVydGljYWwtYWxpZ246Ym90dG9tfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyIC5idG4tb3Blbi1hZHZhbmNlZC1zZWFyY2h7ZGlzcGxheTpub25lfS5zZWFyY2gtY29udGFpbmVyIC5idG4tY2xlYXItc2VhcmNoe3BhZGRpbmctcmlnaHQ6MTVweDtjdXJzb3I6cG9pbnRlcjtjb2xvcjojOTk5O3dpZHRoOjkwcHh9LnNlYXJjaC1jb250YWluZXIgLmJ0bi1pbmZvLC5zZWFyY2gtY29udGFpbmVyIC5idG4tdG9vZ2xlLXNlYXJjaHtmb250LXNpemU6MjFweDtjdXJzb3I6cG9pbnRlcjtoZWlnaHQ6MjFweDtjb2xvcjojOTk5fS5zZWFyY2gtY29udGFpbmVyIC5iYXItaHtib3JkZXItcmlnaHQ6MnB4IHNvbGlkICNkMGQwZDA7aGVpZ2h0OjIxcHg7bWFyZ2luOmF1dG8gMDtkaXNwbGF5OmlubGluZS1ibG9ja31gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIGNvdW50OiBudW1iZXI7XG5cbiAgY291bnRSZXBvcnQ7XG5cbiAgc2hvd1NlYXJjaElucHV0OiBib29sZWFuO1xuXG4gIHNob3dBZHZhbmNlZEZpbHRlcjogYm9vbGVhbjtcblxuICBmaWx0ZXJGb3JtOiBhbnkgPSB7XG4gICAgc2VhcmNoOiB1bmRlZmluZWRcbiAgfTtcblxuICBmaWx0ZXJHcm91cHM6IEZpbHRlckdyb3VwcztcblxuICBmaWx0ZXJHcm91cHNXaXRob3V0VGFiczogRmlsdGVyR3JvdXBzO1xuXG4gIGN1cnJlbnRTdGF0dXNGaWx0ZXJlZDogc3RyaW5nO1xuXG4gIHRhYnNGaWx0ZXI6IGFueTtcblxuICBlZGl0aW9uR3JvdXBJbmRleDogbnVtYmVyO1xuXG4gIG5hbWU6IHN0cmluZztcblxuICBsb2FkaW5nOiBib29sZWFuO1xuXG4gIGlzSXRGaXJzdExvYWQgPSB0cnVlO1xuXG4gIGZpbHRlck1vZGU6ICd0YWJzJyB8ICdjb2xsYXBzZSc7XG5cbiAgY2hpbGRyZW5GaWx0ZXJzO1xuXG4gIC8qXG4gICAqIGNsaWNrYWJsZUNvbnRhaW5lckNsYXNzXG4gICAqXG4gICAqIFdoZXJlIHRoZSBjbGljayB3YXRjaGVyIHNob3VsZCBiZSBsaXN0ZW5pbmdcbiAgICovXG4gIHByaXZhdGUgY2xpY2thYmxlQ29udGFpbmVyQ2xhc3MgPSAnbGlzdC1maWx0ZXItd3JhcHBlcic7XG5cbiAgcHJpdmF0ZSBpbm5lckRlY0ZpbHRlckdyb3VwczogYW55W107XG5cbiAgcHJpdmF0ZSBjdXJyZW50VXJsRW5jb2RlZEZpbHRlcjogc3RyaW5nO1xuXG4gIHByaXZhdGUgdGFic0ZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgd2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIF9maWx0ZXJzOiBEZWNMaXN0RmlsdGVyW10gPSBbXTtcblxuICBwcml2YXRlIF9sb2FkQ291bnRSZXBvcnQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcHJlU2VhcmNoOiBEZWNMaXN0UHJlU2VhcmNoO1xuXG4gIEBJbnB1dCgpIHNob3dJbmZvQnV0dG9uO1xuXG4gIEBJbnB1dCgpIGhhc1BlcnNpc3RlbmNlID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgZmlsdGVycyh2OiBEZWNMaXN0RmlsdGVyW10pIHtcblxuICAgIGlmICh0aGlzLl9maWx0ZXJzICE9PSB2KSB7XG5cbiAgICAgIHRoaXMuX2ZpbHRlcnMgPSB2Lm1hcChmaWx0ZXIgPT4gbmV3IERlY0xpc3RGaWx0ZXIoZmlsdGVyKSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBsb2FkQ291bnRSZXBvcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRDb3VudFJlcG9ydDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBsb2FkQ291bnRSZXBvcnQodjogYm9vbGVhbikge1xuICAgIGlmICh2ICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5fbG9hZENvdW50UmVwb3J0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgZmlsdGVycygpOiBEZWNMaXN0RmlsdGVyW10ge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXJzO1xuICB9XG5cbiAgQE91dHB1dCgpIHNlYXJjaDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAVmlld0NoaWxkKCdpbnB1dFNlYXJjaCcpIGlucHV0U2VhcmNoO1xuXG4gIEBWaWV3Q2hpbGQoRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQpIHRhYnNGaWx0ZXJDb21wb25lbnQ6IERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50KSBhZHZhbmNlZEZpbHRlckNvbXBvbmVudDogRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGxhdGZvcm1Mb2NhdGlvbjogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53YXRjaFRhYnNGaWx0ZXIoKTtcbiAgICB0aGlzLndhdGNoQ2xpY2soKTtcbiAgICB0aGlzLndhdGNoVXJsRmlsdGVyKCk7XG4gICAgdGhpcy5jb25maWd1cmVBZHZhbmNlZEZpbHRlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdDbGljaygpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFic0ZpbHRlcigpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVXJsRmlsdGVyKCk7XG4gIH1cblxuICB0b2dnbGVTZWFyY2hJbnB1dCgpIHtcbiAgICB0aGlzLnNob3dTZWFyY2hJbnB1dCA9ICF0aGlzLnNob3dTZWFyY2hJbnB1dDtcbiAgICBpZiAoIXRoaXMuc2hvd1NlYXJjaElucHV0KSB7XG4gICAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5pbnB1dFNlYXJjaC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9LCAxODApO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUFkdmFuY2VkRmlsdGVyKCRldmVudCkge1xuXG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSAhdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXI7XG5cbiAgfVxuXG4gIG9uU2VhcmNoID0gKGFwcGVuZEN1cnJlbnRGb3JtID0gdHJ1ZSkgPT4ge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyRm9ybSAmJiBhcHBlbmRDdXJyZW50Rm9ybSkge1xuXG4gICAgICBjb25zdCBuZXdEZWNGaWx0ZXJHcm91cCA9IHtcblxuICAgICAgICBmaWx0ZXJzOiBbXVxuXG4gICAgICB9O1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckZvcm0pLmZvckVhY2goa2V5ID0+IHtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJGb3JtW2tleV0pIHtcblxuICAgICAgICAgIGNvbnN0IGZpbHRlciA9IHsgcHJvcGVydHk6IGtleSwgdmFsdWU6IHRoaXMuZmlsdGVyRm9ybVtrZXldIH07XG5cbiAgICAgICAgICBuZXdEZWNGaWx0ZXJHcm91cC5maWx0ZXJzLnB1c2goZmlsdGVyKTtcblxuICAgICAgICB9XG5cblxuICAgICAgfSk7XG5cbiAgICAgIGlmIChuZXdEZWNGaWx0ZXJHcm91cC5maWx0ZXJzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICBpZiAodGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcykge1xuXG4gICAgICAgICAgaWYgKHRoaXMuZWRpdGlvbkdyb3VwSW5kZXggPj0gMCkge1xuXG4gICAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzW3RoaXMuZWRpdGlvbkdyb3VwSW5kZXhdID0gbmV3RGVjRmlsdGVyR3JvdXA7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLnB1c2gobmV3RGVjRmlsdGVyR3JvdXApO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gW25ld0RlY0ZpbHRlckdyb3VwXTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMucmVhY2FsY3VsYXRlQW5kRW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHModHJ1ZSk7XG5cbiAgfVxuXG4gIG9uQ2xlYXIoKSB7XG5cbiAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHMgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICB0aGlzLm9uU2VhcmNoKCk7XG5cbiAgfVxuXG4gIHJlbW92ZURlY0ZpbHRlckdyb3VwKGdyb3VwSW5kZXgpIHtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXJHcm91cHMuZmlsdGVyKChncm91cCwgaW5kZXgpID0+IGluZGV4ICE9PSBncm91cEluZGV4KTtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzLmZpbHRlcigoZ3JvdXAsIGluZGV4KSA9PiBpbmRleCAhPT0gZ3JvdXBJbmRleCk7XG5cbiAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5maWx0ZXIoKGdyb3VwLCBpbmRleCkgPT4gaW5kZXggIT09IGdyb3VwSW5kZXgpO1xuXG4gICAgdGhpcy5vblNlYXJjaCh0cnVlKTtcblxuICB9XG5cbiAgZWRpdERlY0ZpbHRlckdyb3VwKGdyb3VwSW5kZXgpIHtcblxuICAgIHRoaXMuZWRpdGlvbkdyb3VwSW5kZXggPSBncm91cEluZGV4O1xuXG4gICAgY29uc3QgdG9FZGl0RGVjRmlsdGVyR3JvdXAgPSB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzW2dyb3VwSW5kZXhdO1xuXG4gICAgaWYgKHRvRWRpdERlY0ZpbHRlckdyb3VwICYmIHRvRWRpdERlY0ZpbHRlckdyb3VwLmZpbHRlcnMubGVuZ3RoID4gMCkge1xuXG4gICAgICB0aGlzLnJlbG9hZEZvcm1XaXRoR2l2ZW5EZWNGaWx0ZXJHcm91cGUodG9FZGl0RGVjRmlsdGVyR3JvdXAuZmlsdGVycyk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGNsZWFyRmlsdGVyRm9ybSA9ICgpID0+IHtcblxuICAgIGlmICh0aGlzLmZpbHRlckZvcm0pIHtcblxuICAgICAgT2JqZWN0LmtleXModGhpcy5maWx0ZXJGb3JtKS5mb3JFYWNoKGtleSA9PiB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJGb3JtW2tleV0gPSB1bmRlZmluZWQ7XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgfVxuXG4gIG9uQ2xpY2tJbmZvKCkge1xuICAgIGNvbnNvbGUubG9nKCdvbiBjbGljayBpbmZvLiBOb3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIC8qXG4gICAqIGFwcGVuZFRvQ3VycmVudEZpbHRlcnNcbiAgICpcbiAgICogQXBwZW5kIGEgZmlsdGVyIHRvIHRoZSBjdXJyZW50IGZpbHRlciBncm91cHNcbiAgICovXG4gIGFwcGVuZFRvQ3VycmVudERlY0ZpbHRlckdyb3Vwcyhwcm9wZXJ0eU5hbWUsIHByb3BlcnR5VmFsdWUpIHtcblxuICAgIGNvbnN0IGZpbHRlciA9IHtcbiAgICAgICdwcm9wZXJ0eSc6IHByb3BlcnR5TmFtZSxcbiAgICAgICd2YWx1ZSc6IHByb3BlcnR5VmFsdWUsXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzKSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMuZm9yRWFjaCgoZmlsdGVyR3JvdXApID0+IHtcblxuICAgICAgICBjb25zdCBmaWx0ZXJFeGlzdHNJblRoaXNHcm91cCA9IGZpbHRlckdyb3VwLmZpbHRlcnMuZmluZChmaWx0ZXJHcm91cEZpbHRlciA9PiBmaWx0ZXJHcm91cEZpbHRlci5wcm9wZXJ0eSA9PT0gZmlsdGVyLnByb3BlcnR5KTtcblxuICAgICAgICBpZiAoIWZpbHRlckV4aXN0c0luVGhpc0dyb3VwKSB7XG5cbiAgICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzLnB1c2goZmlsdGVyKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IFt7IGZpbHRlcnM6IFtmaWx0ZXJdIH1dO1xuXG4gICAgfVxuXG4gICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM7XG5cbiAgICB0aGlzLnJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgfVxuXG4gIGNsb3NlRmlsdGVycygpIHtcblxuICAgIHRoaXMuZWRpdGlvbkdyb3VwSW5kZXggPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9IGZhbHNlO1xuXG4gICAgdGhpcy5zaG93U2VhcmNoSW5wdXQgPSBmYWxzZTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZWFjYWxjdWxhdGVBbmRFbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcyhyZWNvdW50ID0gZmFsc2UpIHtcblxuICAgIHRoaXMuZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMocmVjb3VudClcbiAgICAgIC50aGVuKCgpID0+IHtcblxuICAgICAgICBpZiAoIXRoaXMuaGFzUGVyc2lzdGVuY2UpIHtcblxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoRmlsdGVySW5VcmxRdWVyeSgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFyRmlsdGVyRm9ybSgpO1xuXG4gICAgICAgICAgfSk7XG5cblxuICAgICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVsb2FkRm9ybVdpdGhHaXZlbkRlY0ZpbHRlckdyb3VwZShmaWx0ZXJzKSB7XG5cbiAgICB0aGlzLmNsZWFyRmlsdGVyRm9ybSgpO1xuXG4gICAgZmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XG5cbiAgICAgIGlmIChmaWx0ZXIudmFsdWUpIHtcblxuICAgICAgICB0aGlzLmZpbHRlckZvcm1bZmlsdGVyLnByb3BlcnR5XSA9IGZpbHRlci52YWx1ZTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICB0aGlzLm9wZW5GaWx0ZXJzKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgb3BlbkZpbHRlcnMoKSB7XG5cbiAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9IHRydWU7XG5cbiAgICB0aGlzLnNob3dTZWFyY2hJbnB1dCA9IHRydWU7XG5cbiAgfVxuXG4gIHByaXZhdGUgY29uZmlndXJlQWR2YW5jZWRGaWx0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICB0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50LmZvcm0gPSB0aGlzLmZpbHRlckZvcm07XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQub25TZWFyY2ggPSB0aGlzLm9uU2VhcmNoO1xuXG4gICAgICB0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50Lm9uQ2xlYXIgPSB0aGlzLmNsZWFyRmlsdGVyRm9ybTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSB3YXRjaFRhYnNGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMudGFic0ZpbHRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy50YWJzRmlsdGVyU3Vic2NyaXB0aW9uID0gdGhpcy50YWJzRmlsdGVyQ29tcG9uZW50LnNlYXJjaC5zdWJzY3JpYmUoZmlsdGVyRXZlbnQgPT4ge1xuXG4gICAgICAgIGlmIChmaWx0ZXJFdmVudC5jaGlsZHJlbikge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gJ2NvbGxhcHNlJztcblxuICAgICAgICAgIHRoaXMuY2hpbGRyZW5GaWx0ZXJzID0gZmlsdGVyRXZlbnQuY2hpbGRyZW47XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyTW9kZSA9ICd0YWJzJztcblxuICAgICAgICAgIHRoaXMuY2hpbGRyZW5GaWx0ZXJzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMudGFic0ZpbHRlciA9IGZpbHRlckV2ZW50LmZpbHRlcnM7XG5cbiAgICAgICAgdGhpcy5lbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwcyh0aGlzLmlzSXRGaXJzdExvYWQgfHwgZmlsdGVyRXZlbnQucmVjb3VudCk7XG5cbiAgICAgICAgdGhpcy5pc0l0Rmlyc3RMb2FkID0gZmFsc2U7XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpIHtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXIgPSBbXTtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicyA9IFtdO1xuXG4gICAgaWYgKHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgJiYgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5sZW5ndGgpIHtcblxuICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5mb3JFYWNoKChmaWx0ZXJHcm91cDogeyBmaWx0ZXJzOiBhbnlbXSB9KSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5ID0ge1xuICAgICAgICAgIGZpbHRlcnM6IGZpbHRlckdyb3VwLmZpbHRlcnMuc2xpY2UoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcbiAgICAgICAgICBmaWx0ZXJHcm91cENvcHkuZmlsdGVycy5wdXNoKC4uLnRoaXMudGFic0ZpbHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RmlsdGVyLnB1c2goZmlsdGVyR3JvdXBDb3B5KTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJHcm91cC5maWx0ZXJzLnNsaWNlKClcbiAgICAgICAgfTtcblxuICAgICAgICBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMucHVzaChmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcblxuICAgICAgY3VycmVudEZpbHRlci5wdXNoKHsgZmlsdGVyczogdGhpcy50YWJzRmlsdGVyIH0pO1xuXG4gICAgfVxuXG4gICAgdGhpcy5maWx0ZXJHcm91cHMgPSBjdXJyZW50RmlsdGVyLmxlbmd0aCA/IGN1cnJlbnRGaWx0ZXIgOiB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gY3VycmVudEZpbHRlcldpdGhvdXRUYWJzLmxlbmd0aCA/IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qXG4gICAqIGVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQgPSBmYWxzZSkge1xuXG4gICAgbGV0IGZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzID8gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlckdyb3VwcykpIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICB0aGlzLm1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gICAgICBpZiAodGhpcy5wcmVTZWFyY2gpIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMgPSB0aGlzLnByZVNlYXJjaChmaWx0ZXJHcm91cHMpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VhcmNoLmVtaXQoe1xuICAgICAgICBmaWx0ZXJHcm91cHM6IGZpbHRlckdyb3VwcyxcbiAgICAgICAgcmVjb3VudDogcmVjb3VudCxcbiAgICAgICAgZmlsdGVyTW9kZTogdGhpcy5maWx0ZXJNb2RlLFxuICAgICAgICBjaGlsZHJlbjogdGhpcy5jaGlsZHJlbkZpbHRlcnMsXG4gICAgICB9KTtcblxuICAgICAgcmVzKCk7XG5cbiAgICB9KTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBhY3RCeUNsaWNrUG9zaXRpb25cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZGV0ZWN0XG4gICAqL1xuICBwcml2YXRlIGFjdEJ5Q2xpY2tQb3NpdGlvbiA9ICgkZXZlbnQpID0+IHtcblxuICAgIGlmIChldmVudCAmJiBldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGNsaWNrZWRJbnNpZGVGaWx0ZXIgPSAkZXZlbnRbJ3BhdGgnXS5maW5kKHBhdGggPT4ge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAke3BhdGhbJ2NsYXNzTmFtZSddfWAgfHwgJyc7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlV3JhcHBlciA9IGNsYXNzTmFtZS5pbmRleE9mKHRoaXMuY2xpY2thYmxlQ29udGFpbmVyQ2xhc3MpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3B0aW9uID0gY2xhc3NOYW1lLmluZGV4T2YoJ21hdC1vcHRpb24nKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZURhdGVQaWNrZXIgPSBjbGFzc05hbWUuaW5kZXhPZignbWF0LWRhdGVwaWNrZXItY29udGVudCcpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3ZlcmxheUNvbnRhaW5lciA9IGNsYXNzTmFtZS5pbmRleE9mKCdjZGstb3ZlcmxheS1jb250YWluZXInKSA+PSAwO1xuXG4gICAgICAgIHJldHVybiBpbnNpZGVXcmFwcGVyIHx8IGluc2lkZU9wdGlvbiB8fCBpbnNpZGVEYXRlUGlja2VyIHx8IGluc2lkZU92ZXJsYXlDb250YWluZXI7XG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWNsaWNrZWRJbnNpZGVGaWx0ZXIpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaENsaWNrKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5hY3RCeUNsaWNrUG9zaXRpb24sIHRydWUpO1xuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nQ2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nQ2xpY2soKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmFjdEJ5Q2xpY2tQb3NpdGlvbiwgdHJ1ZSk7XG4gIH1cblxuICAvKlxuICAgKiBjb21wb25lbnRUYWJOYW1lXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGNvbXBvbmVudEZpbHRlck5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICctZmlsdGVyJztcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVXJsRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVXJsRmlsdGVyKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc1BlcnNpc3RlbmNlKSB7XG5cbiAgICAgIHJldHVybjtcblxuICAgIH1cblxuICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgICAuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcblxuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cbiAgICAgICAgICBpZiAodGhpcy5uYW1lKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGJhc2U2NEZpbHRlciA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudEZpbHRlck5hbWUoKV07XG5cbiAgICAgICAgICAgIGlmIChiYXNlNjRGaWx0ZXIpIHtcblxuICAgICAgICAgICAgICBpZiAoYmFzZTY0RmlsdGVyICE9PSB0aGlzLmN1cnJlbnRVcmxFbmNvZGVkRmlsdGVyKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmdldEpzb25Gcm9tQmFzZTY0RmlsdGVyKGJhc2U2NEZpbHRlcik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gZmlsdGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VudEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25TZWFyY2goKTtcblxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sIDEwKTtcblxuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVXJsRmlsdGVyKCkge1xuXG4gICAgaWYgKHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24pIHtcblxuICAgICAgdGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZWZyZXNoRmlsdGVySW5VcmxRdWVyeVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWZyZXNoRmlsdGVySW5VcmxRdWVyeSgpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgY29uc3QgZmlsdGVyQmFzZTY0ID0gdGhpcy5nZXRCYXNlNjRGaWx0ZXJGcm9tRGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgICAgIHRoaXMuc2V0RmlsdGVySW5VcmxRdWVyeShmaWx0ZXJCYXNlNjQpLnRoZW4ocmVzLCByZWopO1xuXG4gICAgfSk7XG5cblxuICB9XG5cbiAgLypcbiAgICogc2V0RmlsdGVySW5VcmxRdWVyeVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRGaWx0ZXJJblVybFF1ZXJ5KGZpbHRlcikge1xuXG4gICAgdGhpcy5jdXJyZW50VXJsRW5jb2RlZEZpbHRlciA9IGZpbHRlcjtcblxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcblxuICAgIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50RmlsdGVyTmFtZSgpXSA9IGZpbHRlcjtcblxuICAgIHJldHVybiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4nXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLCBxdWVyeVBhcmFtczogcXVlcnlQYXJhbXMsIHJlcGxhY2VVcmw6IHRydWUgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1VybEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRCYXNlNjRGaWx0ZXJGcm9tRGVjRmlsdGVyR3JvdXBzKCkge1xuICAgIGlmICh0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzICYmIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBiYXNlNjRGaWx0ZXIgPSBidG9hKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzKSkpO1xuICAgICAgY29uc3QgYmFzZUZpbHRlcldpdGhvdXRFcXVhbFNpZ24gPSBiYXNlNjRGaWx0ZXIucmVwbGFjZSgvPS9nLCAnJyk7XG4gICAgICByZXR1cm4gYmFzZUZpbHRlcldpdGhvdXRFcXVhbFNpZ247IC8vIHJlbW92ZXMgPSBiZWZvciBlc2V0IHRoZSBmaWx0ZXJcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICogU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkwMjA0MDkvaXMtaXQtb2stdG8tcmVtb3ZlLXRoZS1lcXVhbC1zaWducy1mcm9tLWEtYmFzZTY0LXN0cmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRKc29uRnJvbUJhc2U2NEZpbHRlcihiYXNlNjRGaWx0ZXIpIHtcbiAgICBjb25zdCBiYXNlNjRQYWRMZW4gPSAoYmFzZTY0RmlsdGVyLmxlbmd0aCAlIDQpID4gMCA/IDQgLSAoYmFzZTY0RmlsdGVyLmxlbmd0aCAlIDQpIDogMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFzZTY0UGFkTGVuOyBpKyspIHtcbiAgICAgIGJhc2U2NEZpbHRlciArPSAnPSc7IC8vIGFkZCA9IGJlZm9yZSByZWFkZCB0aGUgZmlsdGVyXG4gICAgfVxuXG4gICAgbGV0IGZpbHRlck9iamVjdDtcblxuICAgIHRyeSB7XG4gICAgICBmaWx0ZXJPYmplY3QgPSBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudChhdG9iKGJhc2U2NEZpbHRlcikpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbXNnID0gJ0xpc3RGaWx0ZXJDb21wb25lbnQ6OiBGYWlsZWQgdG8gcGFyc2UgdGhlIGZpbHRlci4gVGhlIHZhbHVlIGlzIG5vdCB2YWxpZCBhbmQgdGhlIGZpbHRlciB3YXMgcmVtb3ZlZC4gRmlsdGVyIHZhbHVlOiAnO1xuICAgICAgY29uc29sZS5lcnJvcihtc2csIGJhc2U2NEZpbHRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U2NEZpbHRlciA/IGZpbHRlck9iamVjdCA6IHVuZGVmaW5lZDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZmlsdGVyR3JvdXBzPy5sZW5ndGhcIiBjbGFzcz1cImRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXJcIj5cblxuICA8bWF0LWNoaXAtbGlzdD5cblxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGdyb3VwIG9mIGZpbHRlckdyb3VwczsgbGV0IGdyb3VwSW5kZXggPSBpbmRleDtcIj5cbiAgICAgIDxtYXQtY2hpcCAqbmdJZj1cImdyb3VwPy5maWx0ZXJzXCIgKGNsaWNrKT1cImVkaXREZWNGaWx0ZXJHcm91cCgkZXZlbnQsIGdyb3VwSW5kZXgpXCI+XG5cbiAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IGZpbHRlciBvZiBncm91cD8uZmlsdGVyczsgbGV0IGxhc3RGaWx0ZXIgPSBsYXN0O1wiIGNsYXNzPVwiaXRlbS13cmFwcGVyXCI+XG5cbiAgICAgICAgICA8c3BhbiBbbmdTd2l0Y2hdPVwiZmlsdGVyLnByb3BlcnR5ICE9PSAnc2VhcmNoJ1wiPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPnt7ICdsYWJlbC4nICsgZmlsdGVyLnByb3BlcnR5IHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hEZWZhdWx0Pnt7ICdsYWJlbC5LZXl3b3JkJyB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cblxuICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIDxzcGFuPjombmJzcDs8L3NwYW4+XG5cbiAgICAgICAgICA8c3BhbiBbbmdTd2l0Y2hdPVwiZ2V0VmFsdWV0eXBlKGZpbHRlci52YWx1ZSlcIiBjbGFzcz1cInZhbHVlLXdyYXBwZXJcIj5cblxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiPnt7IGZpbHRlci52YWx1ZSB8IGRhdGUgfX08L3NwYW4+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaERlZmF1bHQ+e3sgZmlsdGVyLnZhbHVlIH19PC9zcGFuPlxuXG4gICAgICAgICAgPC9zcGFuID5cblxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWxhc3RGaWx0ZXJcIj4sPC9zcGFuPlxuXG4gICAgICAgICAgJm5ic3A7XG5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwicmVtb3ZlRGVjRmlsdGVyR3JvdXAoJGV2ZW50LCBncm91cEluZGV4KVwiPnJlbW92ZV9jaXJjbGU8L2k+XG5cbiAgICAgIDwvbWF0LWNoaXA+XG5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICA8L21hdC1jaGlwLWxpc3Q+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtdGFiLWJvZHktY29udGVudHtwYWRkaW5nOjE2cHggMH0ubWF0LWZvcm0tZmllbGQtcHJlZml4e21hcmdpbi1yaWdodDo4cHghaW1wb3J0YW50fS5tYXQtZm9ybS1maWVsZC1zdWZmaXh7bWFyZ2luLWxlZnQ6OHB4IWltcG9ydGFudH0ubWF0LWVsZXZhdGlvbi16MHtib3gtc2hhZG93OjAgMCAwIDAgcmdiYSgwLDAsMCwuMiksMCAwIDAgMCByZ2JhKDAsMCwwLC4xNCksMCAwIDAgMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejF7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoye2JveC1zaGFkb3c6MCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16M3tib3gtc2hhZG93OjAgM3B4IDNweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgM3B4IDRweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejR7Ym94LXNoYWRvdzowIDJweCA0cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDRweCA1cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMTBweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NXtib3gtc2hhZG93OjAgM3B4IDVweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNXB4IDhweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxNHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo2e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA2cHggMTBweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxOHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo3e2JveC1zaGFkb3c6MCA0cHggNXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCA3cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgMnB4IDE2cHggMXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OHtib3gtc2hhZG93OjAgNXB4IDVweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOHB4IDEwcHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNHB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejl7Ym94LXNoYWRvdzowIDVweCA2cHggLTNweCByZ2JhKDAsMCwwLC4yKSwwIDlweCAxMnB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAzcHggMTZweCAycHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMHtib3gtc2hhZG93OjAgNnB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgMTBweCAxNHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMThweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMXtib3gtc2hhZG93OjAgNnB4IDdweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTFweCAxNXB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMjBweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMntib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTJweCAxN3B4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjJweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxM3tib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTNweCAxOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjRweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNHtib3gtc2hhZG93OjAgN3B4IDlweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTRweCAyMXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjZweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNXtib3gtc2hhZG93OjAgOHB4IDlweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTVweCAyMnB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMjhweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNntib3gtc2hhZG93OjAgOHB4IDEwcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE2cHggMjRweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMwcHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTd7Ym94LXNoYWRvdzowIDhweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxN3B4IDI2cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAzMnB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE4e2JveC1zaGFkb3c6MCA5cHggMTFweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMThweCAyOHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzRweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxOXtib3gtc2hhZG93OjAgOXB4IDEycHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDE5cHggMjlweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgN3B4IDM2cHggNnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjB7Ym94LXNoYWRvdzowIDEwcHggMTNweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjBweCAzMXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggMzhweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMXtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMXB4IDMzcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCA0MHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIye2JveC1zaGFkb3c6MCAxMHB4IDE0cHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIycHggMzVweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQycHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjN7Ym94LXNoYWRvdzowIDExcHggMTRweCAtN3B4IHJnYmEoMCwwLDAsLjIpLDAgMjNweCAzNnB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA5cHggNDRweCA4cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyNHtib3gtc2hhZG93OjAgMTFweCAxNXB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyNHB4IDM4cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NnB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1iYWRnZS1zbWFsbCAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjZweH0ubWF0LWJhZGdlLWxhcmdlIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6MjRweH0ubWF0LWgxLC5tYXQtaGVhZGxpbmUsLm1hdC10eXBvZ3JhcGh5IGgxe2ZvbnQ6NDAwIDI0cHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDIsLm1hdC10aXRsZSwubWF0LXR5cG9ncmFwaHkgaDJ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMywubWF0LXN1YmhlYWRpbmctMiwubWF0LXR5cG9ncmFwaHkgaDN7Zm9udDo0MDAgMTZweC8yOHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNCwubWF0LXN1YmhlYWRpbmctMSwubWF0LXR5cG9ncmFwaHkgaDR7Zm9udDo0MDAgMTVweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgaDV7Zm9udDo0MDAgMTEuNjJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgaDZ7Zm9udDo0MDAgOS4zOHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWJvZHktMiwubWF0LWJvZHktc3Ryb25ne2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5LC5tYXQtYm9keS0xLC5tYXQtdHlwb2dyYXBoeXtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSBwLC5tYXQtYm9keS0xIHAsLm1hdC10eXBvZ3JhcGh5IHB7bWFyZ2luOjAgMCAxMnB4fS5tYXQtY2FwdGlvbiwubWF0LXNtYWxse2ZvbnQ6NDAwIDEycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1kaXNwbGF5LTQsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS00e2ZvbnQ6MzAwIDExMnB4LzExMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDU2cHg7bGV0dGVyLXNwYWNpbmc6LS4wNWVtfS5tYXQtZGlzcGxheS0zLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktM3tmb250OjQwMCA1NnB4LzU2cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAyZW19Lm1hdC1kaXNwbGF5LTIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ye2ZvbnQ6NDAwIDQ1cHgvNDhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDA1ZW19Lm1hdC1kaXNwbGF5LTEsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0xe2ZvbnQ6NDAwIDM0cHgvNDBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4fS5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtZmxhdC1idXR0b24sLm1hdC1pY29uLWJ1dHRvbiwubWF0LW1pbmktZmFiLC5tYXQtcmFpc2VkLWJ1dHRvbiwubWF0LXN0cm9rZWQtYnV0dG9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1idXR0b24tdG9nZ2xlLC5tYXQtY2FyZHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWNhcmQtY29udGVudCwubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZSwubWF0LWNhcmQtc3VidGl0bGV7Zm9udC1zaXplOjE0cHh9Lm1hdC1jaGVja2JveHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jaGVja2JveC1sYXlvdXQgLm1hdC1jaGVja2JveC1sYWJlbHtsaW5lLWhlaWdodDoyNHB4fS5tYXQtY2hpcHtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDoxOHB4fS5tYXQtY2hpcCAubWF0LWNoaXAtcmVtb3ZlLm1hdC1pY29uLC5tYXQtY2hpcCAubWF0LWNoaXAtdHJhaWxpbmctaWNvbi5tYXQtaWNvbntmb250LXNpemU6MThweH0ubWF0LXRhYmxle2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWhlYWRlci1jZWxse2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNlbGwsLm1hdC1mb290ZXItY2VsbHtmb250LXNpemU6MTRweH0ubWF0LWNhbGVuZGFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhbGVuZGFyLWJvZHl7Zm9udC1zaXplOjEzcHh9Lm1hdC1jYWxlbmRhci1ib2R5LWxhYmVsLC5tYXQtY2FsZW5kYXItcGVyaW9kLWJ1dHRvbntmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXIgdGh7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtZGlhbG9nLXRpdGxle2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTVweDtmb250LXdlaWdodDo0MDB9Lm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlO2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjEyNTtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29ue2ZvbnQtc2l6ZToxNTAlO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b257aGVpZ2h0OjEuNWVtO3dpZHRoOjEuNWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbntoZWlnaHQ6MS4xMjVlbTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNWVtIDA7Ym9yZGVyLXRvcDouODQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudH0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlcnt0b3A6LS44NDM3NWVtO3BhZGRpbmctdG9wOi44NDM3NWVtfS5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7Zm9udC1zaXplOjc1JTttYXJnaW4tdG9wOi42NjY2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjc5MTY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi40Mzc1ZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbDotd2Via2l0LWF1dG9maWxsKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIzZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM1JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjI4MTI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye21hcmdpbi10b3A6LjU0MTY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNjY2NjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouMjVlbSAwIC43NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjA5Mzc1ZW07bWFyZ2luLXRvcDotLjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6MWVtIDB9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtb3V0bGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjg0Mzc1ZW07bWFyZ2luLXRvcDotLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyLC5tYXQtZ3JpZC10aWxlLWhlYWRlcntmb250LXNpemU6MTRweH0ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lLC5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTJweH1pbnB1dC5tYXQtaW5wdXQtZWxlbWVudHttYXJnaW4tdG9wOi0uMDYyNWVtfS5tYXQtbWVudS1pdGVte2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1wYWdpbmF0b3IsLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4fS5tYXQtcmFkaW8tYnV0dG9uLC5tYXQtc2VsZWN0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNlbGVjdC10cmlnZ2Vye2hlaWdodDoxLjEyNWVtfS5tYXQtc2xpZGUtdG9nZ2xlLWNvbnRlbnR7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1zdGVwcGVyLWhvcml6b250YWwsLm1hdC1zdGVwcGVyLXZlcnRpY2Fse2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXN0ZXAtbGFiZWx7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtc3RlcC1sYWJlbC1zZWxlY3RlZHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC10YWItZ3JvdXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLWxpbmt7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRvb2xiYXIsLm1hdC10b29sYmFyIGgxLC5tYXQtdG9vbGJhciBoMiwubWF0LXRvb2xiYXIgaDMsLm1hdC10b29sYmFyIGg0LC5tYXQtdG9vbGJhciBoNSwubWF0LXRvb2xiYXIgaDZ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MH0ubWF0LXRvb2x0aXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjZweDtwYWRkaW5nLWJvdHRvbTo2cHh9Lm1hdC10b29sdGlwLWhhbmRzZXR7Zm9udC1zaXplOjE0cHg7cGFkZGluZy10b3A6OXB4O3BhZGRpbmctYm90dG9tOjlweH0ubWF0LWxpc3QtaXRlbSwubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWxpc3QgLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTZweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxNHB4fS5tYXQtbGlzdCAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTJweH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LW9wdGlvbntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHh9Lm1hdC1vcHRncm91cC1sYWJlbHtmb250OjUwMCAxNHB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2ltcGxlLXNuYWNrYmFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweH0ubWF0LXNpbXBsZS1zbmFja2Jhci1hY3Rpb257bGluZS1oZWlnaHQ6MTtmb250LWZhbWlseTppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRyZWV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdHJlZS1ub2Rle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTRweH0ubWF0LXJpcHBsZXtvdmVyZmxvdzpoaWRkZW59QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7Lm1hdC1yaXBwbGV7ZGlzcGxheTpub25lfX0ubWF0LXJpcHBsZS5tYXQtcmlwcGxlLXVuYm91bmRlZHtvdmVyZmxvdzp2aXNpYmxlfS5tYXQtcmlwcGxlLWVsZW1lbnR7cG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyLXJhZGl1czo1MCU7cG9pbnRlci1ldmVudHM6bm9uZTt0cmFuc2l0aW9uOm9wYWNpdHksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7dHJhbnNpdGlvbjpvcGFjaXR5LHRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpLC13ZWJraXQtdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfS5jZGstdmlzdWFsbHktaGlkZGVue2JvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O21hcmdpbjotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MXB4O291dGxpbmU6MDstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXIsLmNkay1vdmVybGF5LWNvbnRhaW5lcntwb2ludGVyLWV2ZW50czpub25lO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1jb250YWluZXI6ZW1wdHl7ZGlzcGxheTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlcntkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1wYW5le3Bvc2l0aW9uOmFic29sdXRlO3BvaW50ZXItZXZlbnRzOmF1dG87Ym94LXNpemluZzpib3JkZXItYm94O3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7bWF4LXdpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlfS5jZGstb3ZlcmxheS1iYWNrZHJvcHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDt6LWluZGV4OjEwMDA7cG9pbnRlci1ldmVudHM6YXV0bzstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7dHJhbnNpdGlvbjpvcGFjaXR5IC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtvcGFjaXR5OjB9LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eToxfUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6LjZ9fS5jZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9we2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMjg4KX0uY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AsLmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTowfS5jZGstb3ZlcmxheS1jb25uZWN0ZWQtcG9zaXRpb24tYm91bmRpbmctYm94e3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21pbi13aWR0aDoxcHg7bWluLWhlaWdodDoxcHh9LmNkay1nbG9iYWwtc2Nyb2xsYmxvY2t7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtvdmVyZmxvdy15OnNjcm9sbH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOi13ZWJraXQtYXV0b2ZpbGx7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOm5vdCg6LXdlYmtpdC1hdXRvZmlsbCl7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZXtyZXNpemU6bm9uZX10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5ne2hlaWdodDphdXRvIWltcG9ydGFudDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3BhZGRpbmc6MnB4IDAhaW1wb3J0YW50O2JveC1zaXppbmc6Y29udGVudC1ib3ghaW1wb3J0YW50fS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVye21hcmdpbjoxNnB4IDAgOHB4fS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC5pdGVtLXdyYXBwZXJ7bWF4LXdpZHRoOjE1ZW07b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC5pdGVtLXdyYXBwZXIsLmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLm1hdGVyaWFsLWljb25ze2NvbG9yOiM5Njk2OTZ9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLmZpbHRlci1jb250ZW50e21hcmdpbi1yaWdodDo4cHh9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLm1hdC1jaGlwe2N1cnNvcjpwb2ludGVyfS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC52YWx1ZS13cmFwcGVye2NvbG9yOiNlZjNmNTR9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZmlsdGVyR3JvdXBzID0gW107XG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgZWRpdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgZWRpdERlY0ZpbHRlckdyb3VwKCRldmVudCwgZmlsdGVyR3JvdXApIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5lZGl0LmVtaXQoZmlsdGVyR3JvdXApO1xuICB9XG4gIHJlbW92ZURlY0ZpbHRlckdyb3VwKCRldmVudCwgZmlsdGVyR3JvdXApIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5yZW1vdmUuZW1pdChmaWx0ZXJHcm91cCk7XG4gIH1cblxuICBnZXRWYWx1ZXR5cGUodmFsdWUpIHtcblxuICAgIGNvbnN0IGZpcnN0VmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlWzBdIDogdmFsdWU7XG5cbiAgICBsZXQgdHlwZTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBgJHtmaXJzdFZhbHVlfWAuaW5kZXhPZignMDAwWicpID49IDA6XG4gICAgICAgIHR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdHlwZSA9ICdkZWZhdWx0JztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGU7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdENoaXBzTW9kdWxlLCBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlY1Blcm1pc3Npb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWNQZXJtaXNzaW9uRGlyZWN0aXZlIHtcblxuICBwcml2YXRlIGhhc1ZpZXcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IERlY0FwaVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY1Blcm1pc3Npb24ocDogc3RyaW5nW10pIHtcbiAgICBpZiAoIXApIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XG4gICAgICB0aGlzLmhhc1ZpZXcgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc1Blcm1pc3Npb24ocCk7XG4gICAgfVxuICB9XG5cbiAgaGFzUGVybWlzc2lvbihwKSB7XG4gICAgdGhpcy5zZXJ2aWNlLnVzZXIkLnN1YnNjcmliZShcbiAgICAgIHVzZXIgPT4ge1xuICAgICAgICBpZiAodXNlciAmJiB0aGlzLmlzQWxsb3dlZEFjY2VzcyhwLCB1c2VyLnBlcm1pc3Npb25zKSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXNWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgICAgICAgdGhpcy5oYXNWaWV3ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgICAgdGhpcy5oYXNWaWV3ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FsbG93ZWRBY2Nlc3Mocm9sZXNBbGxvd2VkOiBzdHJpbmdbXSA9IFtdLCBjdXJyZW50Um9sZXM6IHN0cmluZ1tdID0gW10pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWF0Y2hpbmdSb2xlID0gY3VycmVudFJvbGVzLmZpbmQoKHVzZXJSb2xlKSA9PiB7XG4gICAgICAgIHJldHVybiByb2xlc0FsbG93ZWQuZmluZCgoYWxvd2VkUm9sZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBhbG93ZWRSb2xlID09PSB1c2VyUm9sZTtcbiAgICAgICAgfSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXRjaGluZ1JvbGUgPyB0cnVlIDogZmFsc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNQZXJtaXNzaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kZWMtcGVybWlzc2lvbi5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjUGVybWlzc2lvbkRpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUGVybWlzc2lvbkRpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0xpc3RGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdENhcmRNb2R1bGUsIE1hdENoaXBzTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZU1vZHVsZSB9IGZyb20gJy4vLi4vbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNQZXJtaXNzaW9uTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi8uLi9kaXJlY3RpdmVzL3Blcm1pc3Npb24vZGVjLXBlcm1pc3Npb24ubW9kdWxlJztcbmltcG9ydCB7IERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYnMtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVNb2R1bGUsXG4gICAgRGVjUGVybWlzc2lvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEZpbHRlckNvbXBvbmVudCwgRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjTGlzdEZpbHRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3cgd3JhcFwiIFtmeExheW91dEdhcF09XCJpdGVtR2FwXCIgPlxuICA8ZGl2ICpuZ0Zvcj1cImxldCByb3cgb2Ygcm93czsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCByb3csIHJvd3MsIGkpXCIgW2Z4RmxleF09XCJpdGVtV2lkdGhcIj5cbiAgICA8ZGl2IFtuZ1N0eWxlXT1cInttYXJnaW46IGl0ZW1HYXB9XCI+XG4gICAgICA8bmctY29udGFpbmVyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlUmVmXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntyb3c6IHJvdyB8fCB7fSwgbGlzdDogcm93cyB8fCBbXSwgaW5kZXg6IGl9XCJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0R3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgaXRlbVdpZHRoID0gJzI4MHB4JztcblxuICBASW5wdXQoKSBpdGVtR2FwID0gJzhweCc7XG5cbiAgQE91dHB1dCgpIHJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX3Jvd3MgPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHNldCByb3dzKHY6IGFueSkge1xuICAgIGlmICh0aGlzLl9yb3dzICE9PSB2KSB7XG4gICAgICB0aGlzLl9yb3dzID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcm93cztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgb25JdGVtQ2xpY2soZXZlbnQsIGl0ZW0sIGxpc3QsIGluZGV4KSB7XG5cbiAgICB0aGlzLnJvd0NsaWNrLmVtaXQoe2V2ZW50LCBpdGVtLCBsaXN0LCBpbmRleH0pO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC10YWJsZS1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQge1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHByb3A7XG5cbiAgQElucHV0KCkgdGl0bGUgPSAnJztcblxuICBASW5wdXQoKSBzZXQgY29sU3Bhbih2KSB7XG4gICAgY29uc3QgbnVtYmVyID0gK3Y7XG4gICAgdGhpcy5fY29sU3BhbiA9IGlzTmFOKG51bWJlcikgPyAxIDogbnVtYmVyO1xuICB9XG5cbiAgZ2V0IGNvbFNwYW4oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29sU3BhbjtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbFNwYW4gPSAxO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vLi4vbGlzdC10YWJsZS1jb2x1bW4vbGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7IERhdGF0YWJsZUNvbXBvbmVudCB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtdGFibGUnLFxuICB0ZW1wbGF0ZTogYDxuZ3gtZGF0YXRhYmxlICN0YWJsZUNvbXBvbmVudFxuICBjb2x1bW5Nb2RlPVwiZmxleFwiXG4gIGhlYWRlckhlaWdodD1cIjI0cHhcIlxuICByb3dIZWlnaHQ9XCJhdXRvXCJcbiAgW2V4dGVybmFsU29ydGluZ109XCJ0cnVlXCJcbiAgW21lc3NhZ2VzXT1cIntlbXB0eU1lc3NhZ2U6Jyd9XCJcbiAgW3Jvd3NdPVwicm93c1wiXG4gIChzb3J0KT1cIm9uU29ydCgkZXZlbnQpXCJcbiAgKGFjdGl2YXRlKT1cIm9uSXRlbUNsaWNrKCRldmVudClcIj5cblxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInt7Y29sdW1uLnRpdGxlIHwgdHJhbnNsYXRlfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtmbGV4R3Jvd109XCJjb2x1bW4uY29sU3BhblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BdPVwiY29sdW1uLnByb3BcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtzb3J0YWJsZV09XCJjb2x1bW4ucHJvcCA/IHRydWUgOiBmYWxzZVwiPlxuXG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiY29sdW1uLnRlbXBsYXRlID8gdHJ1ZSA6IGZhbHNlXCJcbiAgICAgIGxldC1yb3c9XCJyb3dcIlxuICAgICAgbGV0LWluZGV4PVwicm93SW5kZXhcIlxuICAgICAgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlPlxuXG4gICAgICA8bmctY29udGFpbmVyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbi50ZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cm93OiByb3cgfHwge30sIGxpc3Q6IHJvd3MgfHwgW10sIGluZGV4OiBpbmRleH1cIlxuICAgICAgPjwvbmctY29udGFpbmVyPlxuXG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuXG48L25neC1kYXRhdGFibGU+XG5gLFxuICBzdHlsZXM6IFtgOjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5vdmVyZmxvdy12aXNpYmxle292ZXJmbG93OnZpc2libGUhaW1wb3J0YW50fTo6bmctZGVlcCBkYXRhdGFibGUtc2Nyb2xsZXJ7d2lkdGg6MTAwJSFpbXBvcnRhbnR9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlLm5vLW92ZXJmbG93e292ZXJmbG93OmF1dG99OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlLm5vLXBhZGRpbmcgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHtwYWRkaW5nOjB9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtaGVhZGVye3BhZGRpbmc6MTFweCAxNnB4fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWhlYWRlciAuZGF0YXRhYmxlLWhlYWRlci1jZWxsLWxhYmVse2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbHtmb250LXNpemU6MTNweDtmb250LXdlaWdodDo0MDA7b3ZlcmZsb3c6aGlkZGVuO21pbi1oZWlnaHQ6MTAwJTtkaXNwbGF5OnRhYmxlOy13ZWJraXQtdXNlci1zZWxlY3Q6aW5pdGlhbDstbW96LXVzZXItc2VsZWN0OmluaXRpYWw7LW1zLXVzZXItc2VsZWN0OmluaXRpYWw7LW8tdXNlci1zZWxlY3Q6aW5pdGlhbDt1c2VyLXNlbGVjdDppbml0aWFsfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWJvZHktcm93IC5kYXRhdGFibGUtYm9keS1jZWxsIC5kYXRhdGFibGUtYm9keS1jZWxsLWxhYmVse3BhZGRpbmc6MTZweDtkaXNwbGF5OnRhYmxlLWNlbGw7dmVydGljYWwtYWxpZ246bWlkZGxlO3dvcmQtYnJlYWs6YnJlYWstYWxsfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWJvZHktcm93IC5kYXRhdGFibGUtYm9keS1jZWxsLmNlbGwtdG9wIC5kYXRhdGFibGUtYm9keS1jZWxsLWxhYmVse3ZlcnRpY2FsLWFsaWduOnRvcH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1yb3ctZGV0YWlse3BhZGRpbmc6MTBweH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLnNvcnQtYnRue3dpZHRoOjA7aGVpZ2h0OjB9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5pY29uLWRvd257Ym9yZGVyLWxlZnQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDo1cHggc29saWQgdHJhbnNwYXJlbnR9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5pY29uLXVwe2JvcmRlci1sZWZ0OjVweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJsZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHJvd3Modikge1xuICAgIGlmICh0aGlzLl9yb3dzICE9PSB2KSB7XG4gICAgICB0aGlzLl9yb3dzID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcm93cztcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoRGF0YXRhYmxlQ29tcG9uZW50KSB0YWJsZUNvbXBvbmVudDogRGF0YXRhYmxlQ29tcG9uZW50O1xuXG4gIGNvbHVtbnNTb3J0Q29uZmlnOiBhbnk7XG5cbiAgcHJpdmF0ZSBfcm93czogQXJyYXk8YW55PiA9IFtdO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50KSBjb2x1bW5zOiBRdWVyeUxpc3Q8RGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50PjtcblxuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgcm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBvblNvcnQoZXZlbnQpIHtcblxuICAgIGNvbnN0IHNvcnRDb25maWcgPSBbe1xuICAgICAgcHJvcGVydHk6IGV2ZW50LnNvcnRzWzBdLnByb3AsXG4gICAgICBvcmRlcjogZXZlbnQuc29ydHNbMF0uZGlyLnRvVXBwZXJDYXNlKClcbiAgICB9XTtcblxuICAgIGlmIChzb3J0Q29uZmlnICE9PSB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnKSB7XG5cbiAgICAgIHRoaXMuY29sdW1uc1NvcnRDb25maWcgPSBzb3J0Q29uZmlnO1xuXG4gICAgICB0aGlzLnNvcnQuZW1pdCh0aGlzLmNvbHVtbnNTb3J0Q29uZmlnKTtcblxuICAgIH1cblxuICB9XG5cbiAgb25JdGVtQ2xpY2soJGV2ZW50KSB7XG5cbiAgICBjb25zdCBldmVudCA9ICRldmVudDtcblxuICAgIGNvbnN0IGl0ZW0gPSAkZXZlbnQucm93O1xuXG4gICAgY29uc3QgbGlzdCA9IHRoaXMucm93cztcblxuICAgIGNvbnN0IGluZGV4ID0gJGV2ZW50LnJvdy4kJGluZGV4O1xuXG4gICAgdGhpcy5yb3dDbGljay5lbWl0KHtldmVudCwgaXRlbSwgbGlzdCwgaW5kZXh9KTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJsZS9saXN0LXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZpbHRlci9saXN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRhcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBEZWNMaXN0RmV0Y2hNZXRob2QsIENvdW50UmVwb3J0IH0gZnJvbSAnLi9saXN0Lm1vZGVscyc7XG5pbXBvcnQgeyBGaWx0ZXJEYXRhLCBEZWNGaWx0ZXIsIEZpbHRlckdyb3VwcywgRmlsdGVyR3JvdXAgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsJztcbmltcG9ydCB7IERlY0xpc3RGaWx0ZXIgfSBmcm9tICcuL2xpc3QubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDwhLS0gQ09NUE9ORU5UIExBWU9VVCAtLT5cbjxkaXYgY2xhc3M9XCJsaXN0LWNvbXBvbmVudC13cmFwcGVyXCI+XG4gIDxkaXYgKm5nSWY9XCJmaWx0ZXJcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwicmVwb3J0IHx8IGZpbHRlck1vZGUgPT09ICdjb2xsYXBzZSdcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gICAgICA8ZGl2IGZ4RmxleCBjbGFzcz1cInRleHQtcmlnaHRcIiAqbmdJZj1cInRhYmxlQW5kR3JpZEFyZVNldCgpXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlTGlzdE1vZGUoKVwiPlxuICAgICAgICAgIDxtYXQtaWNvbiB0aXRsZT1cIlN3aXRjaCB0byB0YWJsZSBtb2RlXCIgYXJpYS1sYWJlbD1cIlN3aXRjaCB0byB0YWJsZSBtb2RlXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnICpuZ0lmPVwibGlzdE1vZGUgPT09ICdncmlkJ1wiPnZpZXdfaGVhZGxpbmU8L21hdC1pY29uPlxuICAgICAgICAgIDxtYXQtaWNvbiB0aXRsZT1cIlN3aXRjaCB0byBncmlkIG1vZGVcIiBhcmlhLWxhYmVsPVwiU3dpdGNoIHRvIGdyaWQgbW9kZVwiIGNvbG9yPVwicHJpbWFyeVwiIGNvbnRyYXN0Rm9udFdpdGhCZyAqbmdJZj1cImxpc3RNb2RlID09PSAndGFibGUnXCI+dmlld19tb2R1bGU8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXJNb2RlID09ICdjb2xsYXBzZScgdGhlbiBjb2xsYXBzZVRlbXBsYXRlIGVsc2UgdGFic1RlbXBsYXRlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBHUklEIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNncmlkVGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWdyaWRcIj48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRBQkxFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNsaXN0VGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LXRhYmxlXCI+PC9uZy1jb250ZW50PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBGT09URVIgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2Zvb3RlclRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gIDxwIGNsYXNzPVwibGlzdC1mb290ZXJcIj5cbiAgICB7eyAnbGFiZWwuYW1vdW50LWxvYWRlZC1vZi10b3RhbCcgfFxuICAgICAgdHJhbnNsYXRlOntcbiAgICAgICAgbG9hZGVkOiByZXBvcnQ/LnJlc3VsdD8ucm93cz8ubGVuZ3RoLFxuICAgICAgICB0b3RhbDogcmVwb3J0Py5yZXN1bHQ/LmNvdW50XG4gICAgICB9XG4gICAgfX1cbiAgPC9wPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBDT0xMQVBTRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjdGFic1RlbXBsYXRlPlxuICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gICAgPGRpdiAqbmdJZj1cImxpc3RNb2RlID09ICdncmlkJyB0aGVuIGdyaWRUZW1wbGF0ZSBlbHNlIGxpc3RUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDwhLS0gRk9PVEVSIENPTlRFTlQgLS0+XG4gICAgPGRpdiBmeEZsZXg+XG4gICAgICA8ZGl2ICpuZ0lmPVwic2hvd0Zvb3RlciAmJiAhbG9hZGluZyB0aGVuIGZvb3RlclRlbXBsYXRlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBMT0FESU5HIFNQSU5ORVIgLS0+XG4gICAgPGRpdiBmeEZsZXggKm5nSWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlciBsb2FkaW5nLXNwaW5uZXItd3JhcHBlclwiPlxuICAgICAgPGRlYy1zcGlubmVyPjwvZGVjLXNwaW5uZXI+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBMT0FEIE1PUkUgQlVUVE9OIC0tPlxuICAgIDxkaXYgZnhGbGV4ICpuZ0lmPVwiIWlzTGFzdFBhZ2UgJiYgIWxvYWRpbmcgJiYgIWRpc2FibGVTaG93TW9yZUJ1dHRvblwiIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJzaG93TW9yZSgpXCI+e3snbGFiZWwuc2hvdy1tb3JlJyB8IHRyYW5zbGF0ZX19PC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBDT0xMQVBTRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjY29sbGFwc2VUZW1wbGF0ZT5cbiAgPG1hdC1hY2NvcmRpb24+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGNvbGxhcHNhYmxlRmlsdGVycy5jaGlsZHJlblwiPlxuICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwgKG9wZW5lZCk9XCJzZWFyY2hDb2xsYXBzYWJsZShmaWx0ZXIpXCI+XG4gICAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sbGFwc2UtdGl0bGVcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMzJweFwiIGZ4TGF5b3V0QWxpZ249XCJsZWZ0IGNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBmeEZsZXg9XCI5NnB4XCIgKm5nSWY9XCJjb3VudFJlcG9ydFwiPlxuICAgICAgICAgICAgICA8ZGVjLWxhYmVsIFtjb2xvckhleF09XCJmaWx0ZXIuY29sb3JcIj57eyBnZXRDb2xsYXBzYWJsZUNvdW50KGZpbHRlci51aWQpIH19PC9kZWMtbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt7ICdsYWJlbC4nICsgZmlsdGVyLmxhYmVsIHwgdHJhbnNsYXRlIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZWxlY3RlZENvbGxhcHNhYmxlID09PSBmaWx0ZXIudWlkXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWJzVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21hdC1leHBhbnNpb24tcGFuZWw+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbWF0LWFjY29yZGlvbj5cbiAgPGRpdiBjbGFzcz1cImFjY29yZGlvbi1ib3R0b20tbWFyZ2luXCI+PC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtgLmxpc3QtZm9vdGVye2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyfS5saXN0LWNvbXBvbmVudC13cmFwcGVye21pbi1oZWlnaHQ6NzJweH0udGV4dC1yaWdodHt0ZXh0LWFsaWduOnJpZ2h0fS5sb2FkaW5nLXNwaW5uZXItd3JhcHBlcntwYWRkaW5nOjMycHh9LmNvbGxhcHNlLXRpdGxle3dpZHRoOjEwMCV9LmFjY29yZGlvbi1ib3R0b20tbWFyZ2lue21hcmdpbi1ib3R0b206MTAwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcblxuICAvKlxuICAqIGNvdW50UmVwb3J0XG4gICpcbiAgKlxuICAqL1xuICBjb3VudFJlcG9ydDogQ291bnRSZXBvcnQ7XG5cbiAgLypcbiAgKiBmaWx0ZXJNb2RlXG4gICpcbiAgKlxuICAqL1xuICBmaWx0ZXJNb2RlOiAndGFicycgfCAnY29sbGFwc2UnID0gJ3RhYnMnO1xuXG5cbiAgLypcbiAgKiBjb2xsYXBzYWJsZUZpbHRlcnNcbiAgKlxuICAqXG4gICovXG4gIGNvbGxhcHNhYmxlRmlsdGVyczogeyB0YWI6IHN0cmluZywgY2hpbGRyZW46IERlY0xpc3RGaWx0ZXJbXSB9O1xuXG4gIC8qXG4gICAqIGxvYWRpbmdcbiAgICpcbiAgICpcbiAgICovXG4gIHNldCBsb2FkaW5nKHYpIHtcblxuICAgIHRoaXMuX2xvYWRpbmcgPSB2O1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyLmxvYWRpbmcgPSB2O1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgbG9hZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9hZGluZztcbiAgfVxuXG4gIC8qXG4gICAqIGZpbHRlckdyb3Vwc1xuICAgKlxuICAgKlxuICAgKi9cbiAgZ2V0IGZpbHRlckdyb3VwcygpOiBGaWx0ZXJHcm91cHMge1xuICAgIHJldHVybiB0aGlzLmZpbHRlciA/IHRoaXMuZmlsdGVyLmZpbHRlckdyb3VwcyA6IFtdO1xuICB9XG5cbiAgLypcbiAgICogc2VsZWN0ZWRDb2xsYXBzYWJsZVxuICAgKlxuICAgKlxuICAgKi9cbiAgc2VsZWN0ZWRDb2xsYXBzYWJsZTtcblxuICAvKlxuICAgKiByZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHJlcG9ydDtcblxuICAvKlxuICAgKiBpc0xhc3RQYWdlXG4gICAqXG4gICAqXG4gICAqL1xuICBpc0xhc3RQYWdlOiBib29sZWFuO1xuXG4gIC8qXG4gICogc2VsZWN0ZWRUYWJcbiAgKlxuICAqXG4gICovXG4gIHNlbGVjdGVkVGFiOiBhbnk7XG5cbiAgLypcbiAgKiBwcmV2aW91c1NlbGVjdGVkVGFiXG4gICpcbiAgKlxuICAqL1xuICBwcmV2aW91c1NlbGVjdGVkVGFiOiBhbnk7XG5cbiAgLypcbiAgICogZmlsdGVyRGF0YVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJEYXRhOiBTdWJqZWN0PEZpbHRlckRhdGE+ID0gbmV3IFN1YmplY3Q8RmlsdGVyRGF0YT4oKTtcblxuICAvKlxuICAgKiBfbG9hZGluZztcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2xvYWRpbmcgPSB0cnVlO1xuXG4gIC8qXG4gICAqIGNsZWFyQW5kUmVsb2FkUmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGNsZWFyQW5kUmVsb2FkUmVwb3J0O1xuXG4gIC8qXG4gICAqIGZpbHRlclN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiByZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWFjdGl2ZVJlcG9ydDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIC8qXG4gICAqIHJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogc2Nyb2xsYWJsZUNvbnRhaW5lclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxhYmxlQ29udGFpbmVyOiBFbGVtZW50O1xuXG4gIC8qXG4gICAqIHNjcm9sbEV2ZW50RW1pdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbEV2ZW50RW1pdGVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiB0YWJzQ2hhbmdlU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHRhYnNDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiB0YWJsZVNvcnRTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdGFibGVTb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogcGF5bG9hZFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBwYXlsb2FkOiBEZWNGaWx0ZXI7XG5cbiAgLypcbiAgICogX2VuZHBvaW50IGludGVybmFsbFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfZW5kcG9pbnQ6IHN0cmluZztcblxuICAvKlxuICAgKiBfZmlsdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9maWx0ZXI6IERlY0xpc3RGaWx0ZXJDb21wb25lbnQ7XG5cbiAgLypcbiAgICogX25hbWVcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcblxuICAvKlxuICAgKiBjdXN0b21GZXRjaE1ldGhvZFxuICAgKlxuICAgKiBtZXRob2QgdXNlZCB0byBmZXRjaCBkYXRhIGZyb20gYmFjay1lbmRcbiAgICovXG4gIEBJbnB1dCgpIGN1c3RvbUZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2Q7XG5cbiAgLypcbiAgICogY29sdW1uc1NvcnRDb25maWdcbiAgICpcbiAgICogdXNlZCB0byBnZXQgYSBzb3J0ZWQgbGlzdCBmcm9tIGJhY2tlbmRcbiAgICogY2FuIGJlIHBhc2VkIHZpYSBhdHRyaWJ1dGUgdG8gc29ydCB0aGUgZmlyc3QgbG9hZFxuICAgKi9cbiAgQElucHV0KCkgY29sdW1uc1NvcnRDb25maWc7XG5cbiAgLypcbiAgICogZGlzYWJsZVNob3dNb3JlQnV0dG9uXG4gICAqXG4gICAqIHVzZWQgdG8gaGlkZSB0aGUgc2hvdyBtb3JlIGJ1dHRvblxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZVNob3dNb3JlQnV0dG9uOiBib29sZWFuO1xuXG4gIC8qXG4gICAqIGVuZHBvaW50XG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgZW5kcG9pbnQodjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2VuZHBvaW50ICE9PSB2KSB7XG4gICAgICB0aGlzLl9lbmRwb2ludCA9ICh2WzBdICYmIHZbMF0gPT09ICcvJykgPyB2LnJlcGxhY2UoJy8nLCAnJykgOiB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCBlbmRwb2ludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9lbmRwb2ludDtcbiAgfVxuXG4gIC8qXG4gICAqIG5hbWVcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBuYW1lKHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9uYW1lICE9PSB2KSB7XG4gICAgICB0aGlzLl9uYW1lID0gdjtcbiAgICAgIHRoaXMuc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICAvKlxuICAgKiByb3dzXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ3Jvd3MnKVxuXG4gIHNldCByb3dzKHJvd3MpIHtcbiAgICB0aGlzLnNldFJvd3Mocm93cyk7XG4gIH1cblxuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXBvcnQgPyB0aGlzLnJlcG9ydC5yZXN1bHQucm93cyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qXG4gICAqIGxpbWl0XG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBsaW1pdCA9IDEwO1xuXG4gIC8qXG4gICAqIGxpc3RNb2RlXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBsaXN0TW9kZTtcblxuICAvKlxuICAgKiBzY3JvbGxhYmxlQ29udGFpbmVyQ2xhc3NcbiAgICpcbiAgICogV2hlcmUgdGhlIHNjcm9sbCB3YXRjaGVyIHNob3VsZCBiZSBsaXN0ZW5pbmdcbiAgICovXG4gIEBJbnB1dCgpIHNjcm9sbGFibGVDb250YWluZXJDbGFzcyA9ICdtYXQtc2lkZW5hdi1jb250ZW50JztcblxuICAvKlxuICAgKiBzZWFyY2hhYmxlUHJvcGVydGllc1xuICAgKlxuICAgKiBQcm9wZXJ0aWVzIHRvIGJlIHNlYXJjaGVkIHdoZW4gdXNpbmcgYmFzaWMgc2VhcmNoXG4gICAqL1xuICBASW5wdXQoKSBzZWFyY2hhYmxlUHJvcGVydGllczogc3RyaW5nW107XG5cbiAgLypcbiAgICogc2hvd0Zvb3RlclxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgc2hvd0Zvb3RlciA9IHRydWU7XG5cbiAgLypcbiAgICogcG9zdFNlYXJjaFxuICAgKlxuICAgKiBUaGlzIG1pZGRsZXdhcmUgaXMgdXNlZCB0byB0cmlnZ2VyIGV2ZW50cyBhZnRlciBldmVyeSBzZWFyY2hcbiAgICovXG4gIEBPdXRwdXQoKSBwb3N0U2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogcm93Q2xpY2tcbiAgICpcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBhIHJvdyBvciBjYXJkIGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiBncmlkXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RHcmlkQ29tcG9uZW50KSBncmlkOiBEZWNMaXN0R3JpZENvbXBvbmVudDtcblxuICAvKlxuICAgKiB0YWJsZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0VGFibGVDb21wb25lbnQpIHRhYmxlOiBEZWNMaXN0VGFibGVDb21wb25lbnQ7XG5cbiAgLypcbiAgICogZmlsdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RGaWx0ZXJDb21wb25lbnQpXG4gIHNldCBmaWx0ZXIodjogRGVjTGlzdEZpbHRlckNvbXBvbmVudCkge1xuICAgIGlmICh0aGlzLl9maWx0ZXIgIT09IHYpIHtcbiAgICAgIHRoaXMuX2ZpbHRlciA9IHY7XG4gICAgICB0aGlzLnNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBmaWx0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcjtcbiAgfVxuXG4gIC8qXG4gICAqIG5nT25Jbml0XG4gICAqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNlcnZpY2U6IERlY0FwaVNlcnZpY2VcbiAgKSB7IH1cblxuICAvKlxuICAgKiBuZ09uSW5pdFxuICAgKlxuICAgKiBTdGFydHMgYSBmcmVzaCBjb21wb25lbnQgYW5kIHByZXBhcmUgaXQgdG8gcnVuXG4gICAqXG4gICAqIC0gU3RhcnQgdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN1YnNjcmliZSB0byB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3RhcnQgd2F0Y2hpbmcgd2luZG93IFNjcm9sbFxuICAgKiAtIEVuc3VyZSB1bmlxdWUgbmFtZVxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53YXRjaEZpbHRlckRhdGEoKTtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZU5hbWUoKTtcbiAgICB0aGlzLmRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKCk7XG4gIH1cblxuICAvKlxuICAqIG5nQWZ0ZXJWaWV3SW5pdFxuICAqXG4gICogV2FpdCBmb3IgdGhlIHN1YmNvbXBvbmVudHMgdG8gc3RhcnQgYmVmb3JlIHJ1biB0aGUgY29tcG9uZW50XG4gICpcbiAgKiAtIFN0YXJ0IHdhdGNoaW5nIEZpbHRlclxuICAqIC0gRG8gdGhlIGZpcnN0IGxvYWRcbiAgKi9cbiBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICB0aGlzLndhdGNoRmlsdGVyKCk7XG4gICB0aGlzLmRvRmlyc3RMb2FkKCk7XG4gICB0aGlzLmRldGVjdExpc3RNb2RlKCk7XG4gICB0aGlzLndhdGNoVGFic0NoYW5nZSgpO1xuICAgdGhpcy53YXRjaFRhYmxlU29ydCgpO1xuICAgdGhpcy5yZWdpc3RlckNoaWxkV2F0Y2hlcnMoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGwoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIG5nT25EZXN0cm95XG4gICAqXG4gICAqIERlc3Ryb3kgd2F0Y2hlciB0byBmcmVlIG1lZW1vcnkgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyeSB0cmlnZ2Vyc1xuICAgKlxuICAgKiAtIFVuc3Vic2NyaWJlIGZyb20gdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgd2luZG93IFNjcm9sbFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgRmlsdGVyXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdGaWx0ZXIoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYmxlU29ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICAvKlxuICAgKiByZWxvYWRDb3VudFJlcG9ydFxuICAgKlxuICAgKi9cbiAgcmVsb2FkQ291bnRSZXBvcnQoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIuZmlsdGVycyAmJiB0aGlzLmZpbHRlci5sb2FkQ291bnRSZXBvcnQpIHtcblxuICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50W3RoaXMuZW5kcG9pbnQubGVuZ3RoIC0gMV0gPT09ICcvJyA/IGAke3RoaXMuZW5kcG9pbnR9Y291bnRgIDogYCR7dGhpcy5lbmRwb2ludH0vY291bnRgO1xuXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5maWx0ZXIuZmlsdGVycztcblxuICAgICAgY29uc3QgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcyA9IHRoaXMuZ2V0Q291bnRhYmxlRmlsdGVycyhmaWx0ZXJzKTtcblxuICAgICAgdGhpcy5zZXJ2aWNlLnBvc3QoZW5kcG9pbnQsIHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgdGhpcy5jb3VudFJlcG9ydCA9IHRoaXMubW91bnRDb3VudFJlcG9ydChyZXMpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLmNvdW50UmVwb3J0ID0gdGhpcy5jb3VudFJlcG9ydDtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlbW92ZUl0ZW1cbiAgICpcbiAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGxpc3RcbiAgICovXG4gIHJlbW92ZUl0ZW0oaWQpIHtcblxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnJvd3MuZmluZChfaXRlbSA9PiBfaXRlbS5pZCA9PT0gaWQpO1xuXG4gICAgaWYgKGl0ZW0pIHtcblxuICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5yb3dzLmluZGV4T2YoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtSW5kZXggPj0gMCkge1xuXG4gICAgICAgIHRoaXMucm93cy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5kcG9pbnQpIHtcblxuICAgICAgdGhpcy5yZWxvYWRDb3VudFJlcG9ydCgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZXN0YXJ0XG4gICAqXG4gICAqIENsZWFyIHRoZSBsaXN0IGFuZCByZWxvYWQgdGhlIGZpcnN0IHBhZ2VcbiAgICovXG4gIHJlc3RhcnQoKSB7XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNob3dNb3JlXG4gICAqXG4gICAqL1xuICBzaG93TW9yZSgpIHtcblxuICAgIHJldHVybiB0aGlzLmxvYWRSZXBvcnQoKTtcblxuICB9XG5cbiAgLypcbiAgICogc2VhcmNoQ29sbGFwc2FibGVcbiAgICpcbiAgICogc2VhcmNoIGJ5IGNvbGxhcHNhYmxlIGZpbHRlclxuICAgKi9cbiAgc2VhcmNoQ29sbGFwc2FibGUoZmlsdGVyOiBEZWNMaXN0RmlsdGVyKSB7XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlICE9PSBmaWx0ZXIudWlkKSB7XG5cbiAgICAgIHRoaXMubG9hZEJ5T3Blbm5lZENvbGxhcHNlKGZpbHRlci51aWQpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB0YWJsZUFuZEdyaWRBcmVTZXRcbiAgICpcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlcmUgYXJlIGJvdGggR1JJRCBhbmQgVEFCTEUgZGVmaW5pdGlvbiBpbnNpZGUgdGhlIGxpc3RcbiAgICovXG4gIHRhYmxlQW5kR3JpZEFyZVNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkICYmIHRoaXMudGFibGU7XG4gIH1cblxuICAvKlxuICAgKiB0b2dnbGVMaXN0TW9kZVxuICAgKlxuICAgKiBDaGFuZ2VzIGJldHdlZW4gR1JJRCBhbmQgVEFCTEUgdmlzdWFsaXphdG9pbiBtb2Rlc1xuICAgKi9cbiAgdG9nZ2xlTGlzdE1vZGUoKSB7XG5cbiAgICB0aGlzLmxpc3RNb2RlID0gdGhpcy5saXN0TW9kZSA9PT0gJ2dyaWQnID8gJ3RhYmxlJyA6ICdncmlkJztcblxuICAgIGlmICh0aGlzLmxpc3RNb2RlID09PSAndGFibGUnKSB7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgIHRoaXMudGFibGUudGFibGVDb21wb25lbnQucmVjYWxjdWxhdGUoKTtcblxuICAgICAgfSwgMSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGdldENvbGxhcHNhYmxlQ291bnRcbiAgICpcbiAgICogZ2V0IENvbGxhcHNhYmxlIENvdW50IGZyb20gY291bnRSZXBvcnRcbiAgICovXG4gIGdldENvbGxhcHNhYmxlQ291bnQodWlkKSB7XG5cbiAgICB0cnkge1xuXG4gICAgICByZXR1cm4gdGhpcy5jb3VudFJlcG9ydFt0aGlzLnNlbGVjdGVkVGFiXS5jaGlsZHJlblt1aWRdLmNvdW50O1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgICAgcmV0dXJuICc/JztcblxuICAgIH1cblxuXG4gIH1cblxuICAvKlxuICAgZ2V0TGlzdE1vZGVcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZ2V0TGlzdE1vZGUgPSAoKSA9PiB7XG5cbiAgICBsZXQgbGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgJiYgdGhpcy5zZWxlY3RlZFRhYi5saXN0TW9kZSkge1xuXG4gICAgICAgIGxpc3RNb2RlID0gdGhpcy5zZWxlY3RlZFRhYi5saXN0TW9kZTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBsaXN0TW9kZSA9IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdE1vZGU7XG5cbiAgfVxuXG4gIC8qXG4gICBtb3VudENvdW50UmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIG1vdW50Q291bnRSZXBvcnQoZmlsdGVyc0NvdW50ZXJzKTogQ291bnRSZXBvcnQge1xuXG4gICAgY29uc3QgY291bnRSZXBvcnQ6IENvdW50UmVwb3J0ID0ge1xuICAgICAgY291bnQ6IDBcbiAgICB9O1xuXG4gICAgZmlsdGVyc0NvdW50ZXJzLmZvckVhY2goaXRlbSA9PiB7XG5cbiAgICAgIGNvdW50UmVwb3J0W2l0ZW0udWlkXSA9IHtcblxuICAgICAgICBjb3VudDogaXRlbS5jb3VudFxuXG4gICAgICB9O1xuXG4gICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuXG4gICAgICAgIGNvdW50UmVwb3J0W2l0ZW0udWlkXS5jaGlsZHJlbiA9IHRoaXMubW91bnRDb3VudFJlcG9ydChpdGVtLmNoaWxkcmVuKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291bnRSZXBvcnQ7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGdldENvdW50YWJsZUZpbHRlcnNcbiAgICpcbiAgICogR2V0IHRoZSBzZWFyY2ggZmlsdGVyLCB0cm5zZm9ybWUgdGhlIHNlYXJjaCBwYXJhbXMgaW50byB0aGUgc2VhcmNoYWJsZSBwcm9wZXJ0aWVzIGFuZCBpbmplY3QgaXQgaW4gZXZlcnkgZmlsdGVyIGNvbmZpZ3VyZWQgaW4gZGVjLWZpbHRlcnNcbiAgICpcbiAgICogVGhlIHJlc3VsdCBpcyB1c2VkIHRvIGNhbGwgdGhlIGNvdW50IGVuZHBvaW50IGFuZCByZXR1cm4gdGhlIGFtb3VudCBvZiByZWNjb3JkcyBmb3VuZCBpbiBldmVyeSB0YWIvY29sbGFwc2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZ2V0Q291bnRhYmxlRmlsdGVycyhmaWx0ZXJzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IHRoaXMuZmlsdGVyLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzIHx8IFt7ZmlsdGVyczogW119XTtcblxuICAgIGNvbnN0IGZpbHRlcnNQbHVzU2VhcmNoID0gZmlsdGVycy5tYXAoZGVjRmlsdGVyID0+IHtcblxuICAgICAgY29uc3QgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2ggPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRlY0ZpbHRlcikpO1xuXG4gICAgICBpZiAoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycykge1xuXG4gICAgICAgIGNvbnN0IHRhYkZpbHRlcnNDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzKSk7XG5cbiAgICAgICAgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpKTtcblxuICAgICAgICBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzLmZvckVhY2goZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKC4uLnRhYkZpbHRlcnNDb3B5KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIGlmIChkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5jaGlsZHJlbikge1xuXG4gICAgICAgIGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuID0gdGhpcy5nZXRDb3VudGFibGVGaWx0ZXJzKGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuKTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB1aWQ6IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLnVpZCxcbiAgICAgICAgZmlsdGVyczogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycyxcbiAgICAgICAgY2hpbGRyZW46IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuLFxuICAgICAgfTtcblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZW5zdXJlRmlsdGVyVmFsdWVzQXNBcnJheShmaWx0ZXJzUGx1c1NlYXJjaCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGVuc3VyZUZpbHRlclZhbHVlc0FzQXJyYXlcbiAgICpcbiAgICogR2V0IGFuIGFycmF5IG9mIGZpbHRlcmdyb3VwcyBhbmQgc2V0IHRoZSBmaWx0ZXIgdmFsdWVzIHRvIGFycmF5IGlmIG5vdFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVGaWx0ZXJWYWx1ZXNBc0FycmF5KGZpbHRlckdyb3VwczogYW55ID0gW10pIHtcblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMubWFwKGRlY0xpc3RGaWx0ZXIgPT4ge1xuXG4gICAgICBpZiAoZGVjTGlzdEZpbHRlci5maWx0ZXJzKSB7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMoZGVjTGlzdEZpbHRlci5maWx0ZXJzKTtcblxuICAgICAgICBkZWNMaXN0RmlsdGVyLmZpbHRlcnMgPSBkZWNMaXN0RmlsdGVyLmZpbHRlcnMubWFwKGZpbHRlckdyb3VwID0+IHtcblxuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycyA9IGZpbHRlckdyb3VwLmZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG5cbiAgICAgICAgICAgIGZpbHRlci52YWx1ZSA9IEFycmF5LmlzQXJyYXkoZmlsdGVyLnZhbHVlKSA/IGZpbHRlci52YWx1ZSA6IFtmaWx0ZXIudmFsdWVdO1xuXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZmlsdGVyR3JvdXA7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlY0xpc3RGaWx0ZXI7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogYWN0QnlTY3JvbGxQb3NpdGlvblxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlY3QgaWYgdGhlcmUgaXMgc2Nyb29saW5nIGFjdGlvbiBvbiB3aW5kb3cgdG8gZmV0Y2ggYW5kIHNob3cgbW9yZSByb3dzIHdoZW4gdGhlIHNjcm9sbGluZyBkb3duLlxuICAgKi9cbiAgcHJpdmF0ZSBhY3RCeVNjcm9sbFBvc2l0aW9uID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCRldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnRXaXRoQ2RrT3ZlcmxheUNsYXNzID0gJGV2ZW50WydwYXRoJ10uZmluZChwYXRoID0+IHtcblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBwYXRoWydjbGFzc05hbWUnXSB8fCAnJztcblxuICAgICAgICBjb25zdCBpbnNpZGVPdmVybGF5ID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Nkay1vdmVybGF5JykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Z1bGxzY3JlYW4tZGlhbG9nLWNvbnRhaW5lcicpID49IDA7XG5cbiAgICAgICAgcmV0dXJuIGluc2lkZU92ZXJsYXkgfHwgaW5zaWRlRnVsbHNjcmVhbkRpYWxvZ0NvbnRhaW5lcjtcblxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICBpZiAoIXRoaXMuaXNMYXN0UGFnZSkge1xuXG4gICAgICAgICAgY29uc3QgdGFyZ2V0OiBhbnkgPSAkZXZlbnRbJ3RhcmdldCddO1xuXG4gICAgICAgICAgY29uc3QgbGltaXQgPSB0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGFyZ2V0LmNsaWVudEhlaWdodDtcblxuICAgICAgICAgIGlmICh0YXJnZXQuc2Nyb2xsVG9wID49IChsaW1pdCAtIDE2KSkge1xuXG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlKCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBkZXRlY3RMaXN0TW9kZVxuICAgKlxuICAgZ2V0TGlzdE1vZGUgaW5wdXRcbiAgICovXG4gIHByaXZhdGUgZGV0ZWN0TGlzdE1vZGUoKSB7XG5cbiAgICB0aGlzLmdldExpc3RNb2RlKCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKClcbiAgICpcbiAgICogU2V0IHRoZSBsaXN0IG1vZGUgYmFzZWQgb24gZGVjbGFyYXRpb24gb2YgdGFibGUgYW5kIGdyaWQuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGJvb3Rhc3RyYXAgdGhlIGNvbXBvbmVudCB3aXRoIG9ubHkgZ3JpZCBvciBvbmx5IHRhYmxlXG4gICAqIFRoaXMgb25seSB3b3JrIGlmIG5vIG1vZGUgaXMgcHJvdmlkZWQgYnkgQElucHV0IG90aGVyd2lzZSB0aGUgQElucHV0IHZhbHVlIHdpbGwgYmUgdXNlZFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID8gdGhpcy5saXN0TW9kZSA6IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gIH1cblxuICAvKlxuICAgKiBlbWl0U2Nyb2xsRXZlbnRcbiAgICpcbiAgICogRW1pdHMgc2Nyb2xsIGV2ZW50IHdoZW4gbm90IGxvYWRpbmdcbiAgICovXG4gIHByaXZhdGUgZW1pdFNjcm9sbEV2ZW50ID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCF0aGlzLmxvYWRpbmcpIHtcblxuICAgICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlci5lbWl0KCRldmVudCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGlzVGFic0ZpbHRlckRlZmluZWRcbiAgICpcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIFRhYnMgRmlsdGVyIGlzIGRlZmluZWQgaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICBwcml2YXRlIGlzVGFic0ZpbHRlckRlZmluZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZFxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHZpZXcgYW5kIGlucHV0cyBhcmUgaW5pdGlhbGl6ZWRcbiAgICpcbiAgICogVGhpcyBpcyB0aGUgZmlyc3QgY2FsbCB0byBnZXQgZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZCgpIHtcbiAgICBpZiAodGhpcy5pc1RhYnNGaWx0ZXJEZWZpbmVkKCkpIHtcbiAgICAgIHRoaXMuZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpcnN0TG9hZExvY2FsbHkodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXJcbiAgICpcbiAgICogdXNlIHRoZSB0YWJzIGZpbHRlciB0byB0cmlnZ2VyIHRoZSBmaXJzdCBsb2FkXG4gICAqXG4gICAqIFRoaXMgd2F5IHRoZSBkZWZhdWx0IHRhYiBhbmQgZmlsdGVyIGFyZSBzZWxlY3RlZCBieSB0aGUgZGVjdGFic0ZpbHRlciBjb21wb25lbnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKSB7XG4gICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5kb0ZpcnN0TG9hZCgpO1xuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRMb2NhbGx5XG4gICAqXG4gICAqIElmIG5vIGZpbHRlciBhcmUgZGVmaW5lZCwganVzdCBjYWxsIHRoIGVlbmRwb2ludCB3aXRob3V0IGZpbHRlcnNcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRMb2NhbGx5KHJlZnJlc2gpIHtcbiAgICB0aGlzLmxvYWRSZXBvcnQocmVmcmVzaCk7XG4gIH1cblxuICAvKlxuICAgKiBlbnN1cmVVbmlxdWVOYW1lXG4gICAqXG4gICAqIFdlIG11c3QgcHJvdmlkZSBhbiB1bmlxdWUgbmFtZSB0byB0aGUgbGlzdCBzbyB3ZSBjYW4gcGVyc2lzdCBpdHMgc3RhdGUgaW4gdGhlIFVSTCB3aXRob3V0IGNvbmZsaWN0c1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVOYW1lKCkge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICBjb25zdCBlcnJvciA9ICdMaXN0Q29tcG9uZW50RXJyb3I6IFRoZSBsaXN0IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUgdG8gYmUgdXNlZCBpbiB1cmwgZmlsdGVyLidcbiAgICAgICsgJyBQbGVhc2UsIGVuc3VyZSB0aGF0IHlvdSBoYXZlIHBhc3NlZCBhbiB1bmlxdWUgbmFtbWUgdG8gdGhlIGNvbXBvbmVudC4nO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBsb2FkQnlPcGVubmVkQ29sbGFwc2VcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgdHJpZ2dlcmVkIHdoZW4gYSBjb2xsYXBzYWJsZSB0YWJsZSBpcyBvcGVuLlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkQnlPcGVubmVkQ29sbGFwc2UoZmlsdGVyVWlkKSB7XG5cbiAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmNvbGxhcHNhYmxlRmlsdGVycy5jaGlsZHJlbi5maW5kKGl0ZW0gPT4gaXRlbS51aWQgPT09IGZpbHRlclVpZCk7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cDogRmlsdGVyR3JvdXAgPSB7IGZpbHRlcnM6IGZpbHRlci5maWx0ZXJzIH07XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSwgZmlsdGVyR3JvdXApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IGZpbHRlci51aWQ7XG5cbiAgICB9LCAwKTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBsb2FkUmVwb3J0XG4gICAqXG4gICAqIFRoaXMgbWVodG9kIGdhdGhlciB0aGUgZmlsdGVyIGluZm8gYW5kIGVuZHBvaW50IGFuZCBjYWxsIHRoZSBiYWNrLWVuZCB0byBmZXRjaCB0aGUgZGF0YVxuICAgKlxuICAgKiBJZiB0aGUgc3VjdG9tRmV0Y2hNZXRob2QgaXMgdXNlZCwgaXRzIGNhbGwgaXRcbiAgICpcbiAgICogSWYgb25seSB0aGUgcm93cyBhcmUgcGFzc2VkLCB0aGUgbWV0aG9kIGp1c3QgdXNlIGl0IGFzIHJlc3VsdFxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkUmVwb3J0KGNsZWFyQW5kUmVsb2FkUmVwb3J0PzogYm9vbGVhbiwgY29sbGFwc2VGaWx0ZXJHcm91cHM/OiBGaWx0ZXJHcm91cCk6IFByb21pc2U8YW55PiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cbiAgICAgIGlmIChjbGVhckFuZFJlbG9hZFJlcG9ydCAmJiB0aGlzLnJvd3MpIHtcblxuICAgICAgICB0aGlzLnNldFJvd3ModGhpcy5yb3dzKTtcblxuICAgICAgfVxuXG4gICAgICB0aGlzLmNsZWFyQW5kUmVsb2FkUmVwb3J0ID0gY2xlYXJBbmRSZWxvYWRSZXBvcnQ7XG5cbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgIGlmICh0aGlzLmVuZHBvaW50KSB7XG5cbiAgICAgICAgdGhpcy5tb3VudFBheWxvYWQoY2xlYXJBbmRSZWxvYWRSZXBvcnQsIGNvbGxhcHNlRmlsdGVyR3JvdXBzKVxuICAgICAgICAudGhlbihwYXlsb2FkID0+IHtcblxuICAgICAgICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQ7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlckRhdGEubmV4dCh7IGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LCBwYXlsb2FkOiB0aGlzLnBheWxvYWQsIGNiazogcmVzLCBjbGVhcjogY2xlYXJBbmRSZWxvYWRSZXBvcnQgfSk7XG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUZldGNoTWV0aG9kKSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm5leHQoKTtcblxuICAgICAgfSBlbHNlIGlmICghdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMucm93cykge1xuXG4gICAgICAgICAgICByZWooJ05vIGVuZHBvaW50LCBjdXN0b21GZXRjaE1ldGhvZCBvciByb3dzIHNldCcpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgfSwgMSk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIG1vdW50UGF5bG9hZChjbGVhckFuZFJlbG9hZFJlcG9ydDogYm9vbGVhbiA9IGZhbHNlLCBjb2xsYXBzZUZpbHRlckdyb3Vwcz8pIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGNvbnN0IHNlYXJjaEZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyID8gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzIDogdW5kZWZpbmVkO1xuXG4gICAgICBjb25zdCBmaWx0ZXJHcm91cHMgPSB0aGlzLmFwcGVuZEZpbHRlckdyb3Vwc1RvRWFjaEZpbHRlckdyb3VwKHNlYXJjaEZpbHRlckdyb3VwcywgY29sbGFwc2VGaWx0ZXJHcm91cHMpO1xuXG4gICAgICBjb25zdCBwYXlsb2FkOiBEZWNGaWx0ZXIgPSB7fTtcblxuICAgICAgcGF5bG9hZC5saW1pdCA9IHRoaXMubGltaXQ7XG5cbiAgICAgIGlmIChmaWx0ZXJHcm91cHMpIHtcblxuICAgICAgICBwYXlsb2FkLmZpbHRlckdyb3VwcyA9IGZpbHRlckdyb3VwcztcblxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb2x1bW5zU29ydENvbmZpZykge1xuXG4gICAgICAgIHBheWxvYWQuc29ydCA9IHRoaXMuY29sdW1uc1NvcnRDb25maWc7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKCFjbGVhckFuZFJlbG9hZFJlcG9ydCAmJiB0aGlzLnJlcG9ydCkge1xuXG4gICAgICAgIHBheWxvYWQucGFnZSA9IHRoaXMucmVwb3J0LnBhZ2UgKyAxO1xuXG4gICAgICAgIHBheWxvYWQubGltaXQgPSB0aGlzLnJlcG9ydC5saW1pdDtcblxuICAgICAgfVxuXG4gICAgICByZXNvbHZlKHBheWxvYWQpO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGFwcGVuZEZpbHRlckdyb3Vwc1RvRWFjaEZpbHRlckdyb3VwXG4gICAqXG4gICAqIEdldHMgYW4gYXJyYXkgb2YgZmlsdGVyR3JvdXAgYW5kIGluIGVhY2ggZmlsdGVyR3JvdXAgaW4gdGhpcyBhcnJheSBhcHBlbmRzIHRoZSBzZWNvbmQgZmlsdGVyR3JvdXAgZmlsdGVycy5cbiAgICovXG4gIHByaXZhdGUgYXBwZW5kRmlsdGVyR3JvdXBzVG9FYWNoRmlsdGVyR3JvdXAoZmlsdGVyR3JvdXBzOiBGaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVG9BcHBlbmQ6IEZpbHRlckdyb3VwKSB7XG5cbiAgICBpZiAoZmlsdGVyR3JvdXBUb0FwcGVuZCkge1xuXG4gICAgICBpZiAoZmlsdGVyR3JvdXBzICYmIGZpbHRlckdyb3Vwcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXBzLmZvckVhY2goZ3JvdXAgPT4ge1xuXG4gICAgICAgICAgZ3JvdXAuZmlsdGVycy5wdXNoKC4uLmZpbHRlckdyb3VwVG9BcHBlbmQuZmlsdGVycyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXBzID0gW2ZpbHRlckdyb3VwVG9BcHBlbmRdO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsdGVyR3JvdXBzIHx8IFtdO1xuXG4gIH1cblxuICAvKlxuICAgKiBzZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXNcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCkge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyLm5hbWUgPSB0aGlzLm5hbWU7XG5cblxuICAgICAgaWYgKHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50Lm5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QpIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuY3VzdG9tRmV0Y2hNZXRob2QgPSB0aGlzLmN1c3RvbUZldGNoTWV0aG9kO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnNlcnZpY2UgPSB0aGlzLnNlcnZpY2U7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBzZXRSb3dzXG4gICAqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgdGFibGUgcm93c1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRSb3dzKHJvd3MgPSBbXSkge1xuXG4gICAgdGhpcy5yZXBvcnQgPSB7XG5cbiAgICAgIHBhZ2U6IDEsXG5cbiAgICAgIHJlc3VsdDoge1xuXG4gICAgICAgIHJvd3M6IHJvd3MsXG5cbiAgICAgICAgY291bnQ6IHJvd3MubGVuZ3RoXG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5kZXRlY3RMYXN0UGFnZShyb3dzLCByb3dzLmxlbmd0aCk7XG5cbiAgICB0aGlzLnVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5zY3JvbGxFdmVudEVtaXRlclxuICAgIC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDE1MCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKS5zdWJzY3JpYmUodGhpcy5hY3RCeVNjcm9sbFBvc2l0aW9uKTtcblxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlcigpIHtcblxuICAgIGlmICh0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uKSB7XG5cbiAgICAgIHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJEYXRhXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoRmlsdGVyRGF0YSgpIHtcbiAgICB0aGlzLnJlYWN0aXZlUmVwb3J0ID0gdGhpcy5maWx0ZXJEYXRhXG4gICAgLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMTUwKSwgLy8gYXZvaWQgbXVpbHRpcGxlIHJlcXVlc3Qgd2hlbiB0aGUgZmlsdGVyIG9yIHRhYiBjaGFuZ2UgdG9vIGZhc3RcbiAgICAgIHN3aXRjaE1hcCgoZmlsdGVyRGF0YTogRmlsdGVyRGF0YSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4odW5kZWZpbmVkKTtcblxuICAgICAgICBjb25zdCBmZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZCB8fCB0aGlzLnNlcnZpY2UuZ2V0O1xuXG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gZmlsdGVyRGF0YSA/IGZpbHRlckRhdGEuZW5kcG9pbnQgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3QgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcyA9IHRoaXMuZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcyh0aGlzLnBheWxvYWQpO1xuXG4gICAgICAgIGlmIChmaWx0ZXJEYXRhICYmIGZpbHRlckRhdGEuY2xlYXIpIHtcbiAgICAgICAgICB0aGlzLnNldFJvd3MoW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgZmV0Y2hNZXRob2QoZW5kcG9pbnQsIHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMpXG4gICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICAgIG9ic2VydmFibGUubmV4dChyZXMpO1xuXG4gICAgICAgICAgaWYgKGZpbHRlckRhdGEgJiYgZmlsdGVyRGF0YS5jYmspIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIHdhaXQgZm9yIHN1YnNjcmliZXJzIHRvIHJlZnJlc2ggdGhlaXIgcm93c1xuXG4gICAgICAgICAgICAgIGZpbHRlckRhdGEuY2JrKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcblxuICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICAgIH0pXG5cbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXlsb2FkV2l0aFNlYXJjaFRyYW5zZm9ybWVkSW50b1NlYXJjaGFibGVQcm9wZXJ0aWVzKHBheWxvYWQpIHtcblxuICAgIGNvbnN0IHBheWxvYWRDb3B5ID0gey4uLnBheWxvYWR9O1xuXG4gICAgaWYgKHBheWxvYWRDb3B5LmZpbHRlckdyb3VwcyAmJiB0aGlzLnNlYXJjaGFibGVQcm9wZXJ0aWVzKSB7XG5cbiAgICAgIHBheWxvYWRDb3B5LmZpbHRlckdyb3VwcyA9IFsuLi5wYXlsb2FkLmZpbHRlckdyb3Vwc107XG5cbiAgICAgIHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKHBheWxvYWRDb3B5LmZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIHJldHVybiBwYXlsb2FkQ29weTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLnBheWxvYWQ7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKGZpbHRlckdyb3Vwcykge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCA9IHRoaXMuZ2V0RmlsdGVyR3JvdXBUaGF0Q29udGFpbnNUaGVCYXNpY1NlYXJjaChmaWx0ZXJHcm91cHMpO1xuXG4gICAgaWYgKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpIHtcblxuICAgICAgdGhpcy5yZW1vdmVGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgICBjb25zdCBiYXNpY1NlYXJjaCA9IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2guZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIucHJvcGVydHkgPT09ICdzZWFyY2gnKTtcblxuICAgICAgY29uc3QgYmFzaWNTZWFyY2hJbmRleCA9IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2guZmlsdGVycy5pbmRleE9mKGJhc2ljU2VhcmNoKTtcblxuICAgICAgdGhpcy5zZWFyY2hhYmxlUHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcblxuICAgICAgICBjb25zdCBuZXdGaWx0ZXJHcm91cDogRmlsdGVyR3JvdXAgPSB7XG4gICAgICAgICAgZmlsdGVyczogWy4uLmZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2guZmlsdGVyc11cbiAgICAgICAgfTtcblxuICAgICAgICBuZXdGaWx0ZXJHcm91cC5maWx0ZXJzW2Jhc2ljU2VhcmNoSW5kZXhdID0ge1xuICAgICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICB2YWx1ZTogW2Jhc2ljU2VhcmNoLnZhbHVlXVxuICAgICAgICB9O1xuXG4gICAgICAgIGZpbHRlckdyb3Vwcy5wdXNoKG5ld0ZpbHRlckdyb3VwKTtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlRmlsdGVyR3JvdXAoZmlsdGVyR3JvdXBzLCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoSW5kZXggPSBmaWx0ZXJHcm91cHMuaW5kZXhPZihmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKTtcblxuICAgIGZpbHRlckdyb3Vwcy5zcGxpY2UoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaEluZGV4LCAxKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWx0ZXJHcm91cFRoYXRDb250YWluc1RoZUJhc2ljU2VhcmNoKGZpbHRlckdyb3Vwcykge1xuXG4gICAgcmV0dXJuIGZpbHRlckdyb3Vwcy5maW5kKGZpbHRlckdyb3VwID0+IHtcblxuICAgICAgY29uc3QgYmFzaWNTZXJjaEZpbHRlciA9IGZpbHRlckdyb3VwLmZpbHRlcnMgPyBmaWx0ZXJHcm91cC5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci5wcm9wZXJ0eSA9PT0gJ3NlYXJjaCcpIDogdW5kZWZpbmVkO1xuXG4gICAgICByZXR1cm4gYmFzaWNTZXJjaEZpbHRlciA/IHRydWUgOiBmYWxzZTtcblxuICAgIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKSB7XG4gICAgdGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbiA9IHRoaXMucmVhY3RpdmVSZXBvcnRcbiAgICAucGlwZShcbiAgICAgIHRhcChyZXMgPT4ge1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSAmJiBkYXRhLnJlc3VsdCAmJiBkYXRhLnJlc3VsdC5yb3dzKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNsZWFyQW5kUmVsb2FkUmVwb3J0KSB7XG4gICAgICAgICAgZGF0YS5yZXN1bHQucm93cyA9IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzLmNvbmNhdChkYXRhLnJlc3VsdC5yb3dzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVwb3J0ID0gZGF0YTtcblxuICAgICAgICB0aGlzLnBvc3RTZWFyY2guZW1pdChkYXRhKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpO1xuXG4gICAgICAgIHRoaXMuZGV0ZWN0TGFzdFBhZ2UoZGF0YS5yZXN1bHQucm93cywgZGF0YS5yZXN1bHQuY291bnQpO1xuXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RMYXN0UGFnZShyb3dzLCBjb3VudCkge1xuXG4gICAgY29uc3QgbnVtYmVyT2Zyb3dzID0gcm93cy5sZW5ndGg7XG5cbiAgICBjb25zdCBlbXB0TGlzdCA9IG51bWJlck9mcm93cyA9PT0gMDtcblxuICAgIGNvbnN0IHNpbmdsZVBhZ2VMaXN0ID0gbnVtYmVyT2Zyb3dzID09PSBjb3VudDtcblxuICAgIHRoaXMuaXNMYXN0UGFnZSA9IGVtcHRMaXN0IHx8IHNpbmdsZVBhZ2VMaXN0O1xuXG4gIH1cblxuICAvKlxuICAgKiB1bnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCkge1xuICAgIGlmICh0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogdXBkYXRlQ29udGVudENoaWxkcmVuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpIHtcblxuICAgIGNvbnN0IHJvd3MgPSB0aGlzLmVuZHBvaW50ID8gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MgOiB0aGlzLnJvd3M7XG4gICAgaWYgKHRoaXMuZ3JpZCkge1xuICAgICAgdGhpcy5ncmlkLnJvd3MgPSByb3dzO1xuICAgIH1cbiAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgdGhpcy50YWJsZS5yb3dzID0gcm93cztcbiAgICB9XG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci5jb3VudCA9IHRoaXMucmVwb3J0LnJlc3VsdC5jb3VudDtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiByZWdpc3RlckNoaWxkV2F0Y2hlcnNcbiAgICpcbiAgICogV2F0Y2ggZm9yIGNoaWxkcmVuIG91dHB1dHNcbiAgICovXG4gIHByaXZhdGUgcmVnaXN0ZXJDaGlsZFdhdGNoZXJzKCkge1xuXG4gICAgaWYgKHRoaXMuZ3JpZCkge1xuICAgICAgdGhpcy53YXRjaEdyaWRSb3dDbGljaygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICB0aGlzLndhdGNoVGFibGVSb3dDbGljaygpO1xuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hHcmlkUm93Q2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hHcmlkUm93Q2xpY2soKSB7XG4gICAgdGhpcy5ncmlkLnJvd0NsaWNrLnN1YnNjcmliZSgoJGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJvd0NsaWNrLmVtaXQoJGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVGFibGVSb3dDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYmxlUm93Q2xpY2soKSB7XG4gICAgdGhpcy50YWJsZS5yb3dDbGljay5zdWJzY3JpYmUoKCRldmVudCkgPT4ge1xuICAgICAgdGhpcy5yb3dDbGljay5lbWl0KCRldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5maWx0ZXIuc2VhcmNoLnN1YnNjcmliZShldmVudCA9PiB7XG5cbiAgICAgICAgY29uc3QgdGFiQ2hhbmdlZCA9IHRoaXMucHJldmlvdXNTZWxlY3RlZFRhYiAhPT0gdGhpcy5zZWxlY3RlZFRhYjtcblxuICAgICAgICBjb25zdCBmaWx0ZXJNb2RlQ2hhbmdlZCA9IHRoaXMuZmlsdGVyTW9kZSAhPT0gZXZlbnQuZmlsdGVyTW9kZTtcblxuICAgICAgICBpZiAodGFiQ2hhbmdlZCkge1xuXG4gICAgICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVGFiID0gdGhpcy5zZWxlY3RlZFRhYjtcblxuICAgICAgICAgIHRoaXMuc2V0Um93cyhbXSk7IC8vIGlmIGNoYW5naW5nIHRhYnMsIGNsZWFyIHRoZSByZXN1bHRzIGJlZm9yZSBzaG93aW5nIHRoZSByb3dzIGJlY2F1c2UgaXQgaXMgZG9uZSBvbmx5IGFmdGVyIGZldGNoaW5nIHRoZSBkYXRhXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWx0ZXJNb2RlQ2hhbmdlZCkge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gZXZlbnQuZmlsdGVyTW9kZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyTW9kZSA9PT0gJ3RhYnMnKSB7XG5cbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0aGlzLmNvbGxhcHNhYmxlRmlsdGVycyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKS50aGVuKChyZXMpID0+IHtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnJlY291bnQpIHtcblxuICAgICAgICAgICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuY291bnRSZXBvcnQgfHwgZXZlbnQucmVjb3VudCkge1xuXG4gICAgICAgICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlICYmICF0YWJDaGFuZ2VkKSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZEJ5T3Blbm5lZENvbGxhcHNlKHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0ge1xuICAgICAgICAgICAgICB0YWI6IHRoaXMuc2VsZWN0ZWRUYWIsXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBldmVudC5jaGlsZHJlbiA/IGV2ZW50LmNoaWxkcmVuIDogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnNjcm9sbGFibGVDb250YWluZXJDbGFzcylbMF07XG4gICAgICBpZiAodGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSwgMSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnNlbGVjdGVkVGFiO1xuICAgICAgdGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC50YWJDaGFuZ2Uuc3Vic2NyaWJlKHRhYiA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0YWI7XG4gICAgICAgIHRoaXMuZGV0ZWN0TGlzdE1vZGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN1YnNjcmliZVRvVGFic0NoYW5nZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJzQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFibGVTb3J0KCkge1xuICAgIGlmICh0aGlzLnRhYmxlKSB7XG5cbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uID0gdGhpcy50YWJsZS5zb3J0LnN1YnNjcmliZShjb2x1bW5zU29ydENvbmZpZyA9PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29sdW1uc1NvcnRDb25maWcgIT09IGNvbHVtbnNTb3J0Q29uZmlnKSB7XG5cbiAgICAgICAgICB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnID0gY29sdW1uc1NvcnRDb25maWc7XG5cbiAgICAgICAgICBpZiAodGhpcy5jb2xsYXBzYWJsZUZpbHRlcnMpIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1RhYmxlU29ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJsZVNvcnQoKSB7XG4gICAgaWYgKHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYmxlU29ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IERlY0xpc3RUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9saXN0LXRhYmxlLWNvbHVtbi9saXN0LXRhYmxlLWNvbHVtbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjTGlzdFRhYmxlQ29tcG9uZW50LFxuICAgIERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0xpc3RUYWJsZUNvbXBvbmVudCxcbiAgICBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJsZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1mb290ZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0Rm9vdGVyQ29tcG9uZW50IHt9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWFkdmFuY2VkLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1hY3Rpb25zJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBY3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjTGlzdEFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtYWN0aW9ucy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0xpc3RBY3Rpb25zQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RBY3Rpb25zQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0QWN0aW9uc01vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0U25hY2tCYXJNb2R1bGUsIE1hdEV4cGFuc2lvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRGVjTGlzdEZpbHRlck1vZHVsZSB9IGZyb20gJy4vbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIubW9kdWxlJztcblxuaW1wb3J0IHsgRGVjTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RUYWJsZU1vZHVsZSB9IGZyb20gJy4vbGlzdC10YWJsZS9saXN0LXRhYmxlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNMaXN0Rm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZvb3Rlci9saXN0LWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEFkdmFuY2VkRmlsdGVyTW9kdWxlIH0gZnJvbSAnLi9saXN0LWFkdmFuY2VkLWZpbHRlci9saXN0LWFkdmFuY2VkLWZpbHRlci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLXNwaW5uZXIvZGVjLXNwaW5uZXIubW9kdWxlJztcbmltcG9ydCB7IERlY0xpc3RBY3Rpb25zTW9kdWxlIH0gZnJvbSAnLi9saXN0LWFjdGlvbnMvbGlzdC1hY3Rpb25zLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNMYWJlbE1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLWxhYmVsL2RlYy1sYWJlbC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY0xhYmVsTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE5neERhdGF0YWJsZU1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIERlY0xpc3RBZHZhbmNlZEZpbHRlck1vZHVsZSxcbiAgICBEZWNMaXN0RmlsdGVyTW9kdWxlLFxuICAgIERlY0xpc3RUYWJsZU1vZHVsZSxcbiAgICBEZWNTcGlubmVyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNMaXN0Q29tcG9uZW50LFxuICAgIERlY0xpc3RHcmlkQ29tcG9uZW50LFxuICAgIERlY0xpc3RGb290ZXJDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNMaXN0Q29tcG9uZW50LFxuICAgIERlY0xpc3RHcmlkQ29tcG9uZW50LFxuICAgIERlY0xpc3RUYWJsZU1vZHVsZSxcbiAgICBEZWNMaXN0Rm9vdGVyQ29tcG9uZW50LFxuICAgIERlY0xpc3RGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdEFkdmFuY2VkRmlsdGVyTW9kdWxlLFxuICAgIERlY0xpc3RBY3Rpb25zTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtcGFnZS1mb3JiaWRlbicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2UtZm9yYmlkZW4td3JhcHBlclwiPlxuICA8aDE+e3snbGFiZWwucGFnZS1mb3JiaWRlbicgfCB0cmFuc2xhdGV9fTwvaDE+XG4gIDxwPnt7J2xhYmVsLnBhZ2UtZm9yYmlkZW4taGVscCcgfCB0cmFuc2xhdGV9fTwvcD5cbiAgPHA+PHNtYWxsPlJlZjoge3twcmV2aW91c1VybH19PC9zbWFsbD48L3A+XG4gIDxpbWcgc3JjPVwiaHR0cDovL3MzLXNhLWVhc3QtMS5hbWF6b25hd3MuY29tL3N0YXRpYy1maWxlcy1wcm9kL3BsYXRmb3JtL2RlY29yYTMucG5nXCI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AucGFnZS1mb3JiaWRlbi13cmFwcGVye3BhZGRpbmctdG9wOjEwMHB4O3RleHQtYWxpZ246Y2VudGVyfWltZ3t3aWR0aDoxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQYWdlRm9yYmlkZW5Db21wb25lbnQge1xuXG4gIHByZXZpb3VzVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZClcbiAgICApXG4gICAgLnN1YnNjcmliZSgoZTogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGRvY3VtZW50LnJlZmVycmVyIHx8IGUudXJsO1xuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjUGFnZUZvcmJpZGVuQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlLWZvcmJpZGVuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1BhZ2VGb3JiaWRlbkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUGFnZUZvcmJpZGVuQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUGFnZUZvcmJpZGVuTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtcGFnZS1ub3QtZm91bmQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYWdlLW5vdC1mb3VuZC13cmFwcGVyXCI+XG4gIDxoMT57eydsYWJlbC5wYWdlLW5vdC1mb3VuZCcgfCB0cmFuc2xhdGV9fTwvaDE+XG4gIDxwPnt7J2xhYmVsLnBhZ2Utbm90LWZvdW5kLWhlbHAnIHwgdHJhbnNsYXRlfX08L3A+XG4gIDxwPnt7cHJldmlvdXNVcmx9fTwvcD5cbiAgPGltZyBzcmM9XCJodHRwOi8vczMtc2EtZWFzdC0xLmFtYXpvbmF3cy5jb20vc3RhdGljLWZpbGVzLXByb2QvcGxhdGZvcm0vZGVjb3JhMy5wbmdcIj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5wYWdlLW5vdC1mb3VuZC13cmFwcGVye3BhZGRpbmctdG9wOjEwMHB4O3RleHQtYWxpZ246Y2VudGVyfWltZ3t3aWR0aDoxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQYWdlTm90Rm91bmRDb21wb25lbnQge1xuXG4gIHByZXZpb3VzVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIHJvdXRlci5ldmVudHNcbiAgICAucGlwZShcbiAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoKGU6IE5hdmlnYXRpb25FbmQpID0+IHtcbiAgICAgICAgdGhpcy5wcmV2aW91c1VybCA9IGUudXJsO1xuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjUGFnZU5vdEZvdW5kQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlLW5vdC1mb3VuZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNQYWdlTm90Rm91bmRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1BhZ2VOb3RGb3VuZENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1BhZ2VOb3RGb3VuZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIgIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IEZBTExCQUNLX0lNQUdFID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQkNBUUFBQUMxSEF3Q0FBQUFBbUpMUjBRQS80ZVB6TDhBQUFBSmNFaFpjd0FBQ3hNQUFBc1RBUUNhbkJnQUFBQUxTVVJCVkFqWFkyQmdBQUFBQXdBQklOV1V4d0FBQUFCSlJVNScgK1xuJ0Vya0pnZ2c9PSc7XG5cbmNvbnN0IExPQURJTkdfSU1BR0UgPSAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpTVRVd0lpQm9aV2xuYUhROUlqRTFNQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUJ3Y21WelpYSjJaVUZ6Y0dWamRGSmhkR2x2UFNKNFRXbGtXVTFwWkNJZycgK1xuJ1kyeGhjM005SW5WcGJDMXlhVzVuSWo0OGNHRjBhQ0JtYVd4c1BTSnViMjVsSWlCamJHRnpjejBpWW1zaUlHUTlJazB3SURCb01UQXdkakV3TUVnd2VpSXZQanhqYVhKamJHVWdZM2c5SWpjMUlpQmplVDBpTnpVaUlISTlJalExSWlCemRISnZhMlV0WkdGemFHRnljbUY1UFNJeU1qWXVNVGsxSURVMkxqVTBPU0knICtcbidnYzNSeWIydGxQU0lqTWpNeVpUTTRJaUJtYVd4c1BTSnViMjVsSWlCemRISnZhMlV0ZDJsa2RHZzlJakV3SWo0OFlXNXBiV0YwWlZSeVlXNXpabTl5YlNCaGRIUnlhV0oxZEdWT1lXMWxQU0owY21GdWMyWnZjbTBpSUhSNWNHVTlJbkp2ZEdGMFpTSWdkbUZzZFdWelBTSXdJRGMxSURjMU96RTRNQ0EzTlNBM05UJyArXG4nc3pOakFnTnpVZ056VTdJaUJyWlhsVWFXMWxjejBpTURzd0xqVTdNU0lnWkhWeVBTSXhjeUlnY21Wd1pXRjBRMjkxYm5ROUltbHVaR1ZtYVc1cGRHVWlJR0psWjJsdVBTSXdjeUl2UGp3dlkybHlZMnhsUGp3dmMzWm5QZz09JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXByb2R1Y3Qtc3BpbicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyXCIgKm5nSWY9XCJzY2VuZXNcIj5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwibG9hZGluZ0ltYWdlcyA/IHRydWUgOiBmYWxzZVwiPlxuXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIGNsYXNzPVwib3ZlcmxheVwiPlxuICAgICAgPCEtLSBMb2FkaW5nIHNwaW5uZXIgLS0+XG4gICAgICA8ZGl2IFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1pbWFnZSc6J3VybCgnICsgbG9hZGluZ0ltYWdlICsgJyknfVwiPnt7bG9hZGVyUGVyY2VudGFnZSgpfX0lPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiIGNsYXNzPVwib3ZlcmxheVwiPlxuXG4gICAgICA8IS0tIE92ZXJsYXkgb3ZlciB0aGUgaW1hZ2UgKGhhbmQgaWNvbikgLS0+XG4gICAgICA8aW1nIGNsYXNzPVwiZnJhbWVcIiAqbmdJZj1cIiFvbmx5TW9kYWxcIiBzcmM9XCIvL3MzLXNhLWVhc3QtMS5hbWF6b25hd3MuY29tL3N0YXRpYy1maWxlcy1wcm9kL3BsYXRmb3JtL2RyYWctaG9yaXpvbnRhbGx5LnBuZ1wiIGFsdD1cIlwiIChjbGljayk9XCJvbmx5TW9kYWwgPyAnJyA6IHN0YXJ0KCRldmVudClcIj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG4gIDxkaXYgW25nU3dpdGNoXT1cInN0YXJ0ZWQgPyB0cnVlIDogZmFsc2VcIj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cInRydWVcIiBjbGFzcz1cImZyYW1lXCI+XG4gICAgICA8IS0tIEltYWdlcyAtLT5cbiAgICAgIDxpbWcgKm5nRm9yPVwibGV0IHNjZW5lIG9mIHNjZW5lczsgbGV0IGkgPSBpbmRleDtcIlxuICAgICAgICBbc3JjXT1cInNjZW5lXCJcbiAgICAgICAgZHJhZ2dhYmxlPVwiZmFsc2VcIlxuICAgICAgICBjbGFzcz1cIm5vLWRyYWcgaW1hZ2Utb25seVwiXG4gICAgICAgIChsb2FkKT1cIm1hcmtBc0xvYWRlZCgkZXZlbnQpXCJcbiAgICAgICAgW25nQ2xhc3NdPVwiZnJhbWVTaG93biA9PT0gaSAmJiAhbG9hZGluZ0ltYWdlcyA/ICdjdXJyZW50LXNjZW5lJyA6ICduZXh0LXNjZW5lJ1wiPlxuXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiIGNsYXNzPVwiZnJhbWVcIj5cblxuICAgICAgPCEtLSBQbGFjZWhvbGRlciBpbWFnZSAtLT5cbiAgICAgIDxpbWdcbiAgICAgICAgW3NyY109XCJzY2VuZXNbZnJhbWVTaG93bl1cIlxuICAgICAgICBkcmFnZ2FibGU9XCJmYWxzZVwiXG4gICAgICAgIGNsYXNzPVwibm8tZHJhZ1wiXG4gICAgICAgIChjbGljayk9XCJvbmx5TW9kYWwgPyBvbk9wZW4oJGV2ZW50KSA6IHN0YXJ0KCRldmVudClcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J2ltYWdlLW9ubHknOiBvbmx5TW9kYWx9XCI+XG5cbiAgICAgIDwhLS0gTG9hZGluZyBzcGlubmVyIC0tPlxuICAgICAgPGJ1dHRvblxuICAgICAgKm5nSWY9XCJzaG93T3BlbkRpYWxvZ0J1dHRvbiAmJiAhb25seU1vZGFsXCJcbiAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgKGNsaWNrKT1cIm9uT3BlbigkZXZlbnQpXCJcbiAgICAgIFttYXRUb29sdGlwXT1cIidsYWJlbC5vcGVuJyB8IHRyYW5zbGF0ZVwiXG4gICAgICBjbGFzcz1cImRpYWxvZy1idXR0b25cIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjb2xvcj1cImRlZmF1bHRcIj5cbiAgICAgICAgPG1hdC1pY29uIGFyaWEtbGFiZWw9XCJTd2FwIGJldHdlZW4gUmVmZXJlbmNlIGFuZCBSZW5kZXIgaW1hZ2VzXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnID5mdWxsc2NyZWVuPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AucHJvZHVjdC1zcGlubmVyLXdyYXBwZXJ7ZGlzcGxheTpibG9jaztwb3NpdGlvbjpyZWxhdGl2ZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXI6aG92ZXIgLmZyYW1le29wYWNpdHk6MX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXI6aG92ZXIgLm92ZXJsYXl7ZGlzcGxheTpub25lfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWV7ZGlzcGxheTpibG9jazt3aWR0aDoxMDAlO2JhY2tncm91bmQtc2l6ZTpjb250YWluO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlciBjZW50ZXI7b3BhY2l0eTouNTt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzIGVhc2U7Y3Vyc29yOm1vdmV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZS5pbWFnZS1vbmx5e29wYWNpdHk6MTtjdXJzb3I6cG9pbnRlcn0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lIC5jdXJyZW50LXNjZW5le2Rpc3BsYXk6YmxvY2t9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZSAubmV4dC1zY2VuZXtkaXNwbGF5Om5vbmV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZSBpbWd7d2lkdGg6MTAwJX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLm92ZXJsYXl7cG9zaXRpb246YWJzb2x1dGU7cGFkZGluZzoxMHB4O3dpZHRoOjIwJTttYXJnaW4tbGVmdDo0MCU7bWFyZ2luLXRvcDo0MCU7ei1pbmRleDoxO29wYWNpdHk6LjQ7dHJhbnNpdGlvbjpvcGFjaXR5IC4ycyBlYXNlfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUubG9hZGVye3dpZHRoOjUwJTttYXJnaW46YXV0b30ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmRpYWxvZy1idXR0b257cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MH0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmxvYWRlci1wZXJjZW50YWdle3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo0NyU7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjtvcGFjaXR5Oi41fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1Byb2R1Y3RTcGluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmcmFtZVNob3duOiBudW1iZXI7XG4gIHNjZW5lczogc3RyaW5nW107XG4gIGxvYWRpbmdJbWFnZXM6IGJvb2xlYW47XG4gIHBsYWNlaG9sZGVyU2NlbmU6IHN0cmluZztcbiAgc3RhcnRlZDogYm9vbGVhbjtcbiAgdG90YWxJbWFnZXNMb2FkZWQ6IG51bWJlcjtcbiAgbG9hZGluZ0ltYWdlID0gTE9BRElOR19JTUFHRTtcblxuICBASW5wdXQoKSBsb29waW5nID0gZmFsc2U7XG4gIEBJbnB1dCgpIG9ubHlNb2RhbCA9IGZhbHNlO1xuICBASW5wdXQoKSBGQUxMQkFDS19JTUFHRTogc3RyaW5nID0gRkFMTEJBQ0tfSU1BR0U7XG4gIEBJbnB1dCgpIHN0YXJ0SW5DZW50ZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd09wZW5EaWFsb2dCdXR0b24gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzcGluKHNwaW46IGFueSkge1xuICAgIGlmIChzcGluKSB7XG4gICAgICBjb25zdCBzY2VuZXMgPSB0aGlzLmxvYWRTY2VuZXMoc3Bpbik7XG5cbiAgICAgIGNvbnN0IHNjZW5lc0NoYW5nZWQgPSAhdGhpcy5zY2VuZXMgfHwgKHNjZW5lcyAmJiB0aGlzLnNjZW5lcy5qb2luKCkgIT09IHNjZW5lcy5qb2luKCkpO1xuXG4gICAgICBpZiAoc2NlbmVzQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLnJlc2V0U2NlbmVzRGF0YShzY2VuZXMpO1xuICAgICAgICAvLyB0aGlzLnJlc2V0U3RhcnRQb3NpdGlvbkJhc2VkT25Db21wYW55KHNwaW4sIHNjZW5lcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NwaW4gPSBzcGluO1xuXG4gICAgfVxuICB9XG5cbiAgZ2V0IHNwaW4oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fc3BpbjtcbiAgfVxuXG4gIEBPdXRwdXQoKSBvcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBzY2VuZXNMZW4gPSAwO1xuICBwcml2YXRlIG1vdXNlRG93biA9IGZhbHNlO1xuICBwcml2YXRlIGxhc3RNb3VzZUV2ZW50OiBNb3VzZUV2ZW50O1xuICBwcml2YXRlIGNvbnRhaW5lcldpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgaW50ZXJ2YWw6IG51bWJlcjtcbiAgcHJpdmF0ZSBwb3NpdGlvbkRpZmY6IG51bWJlcjtcbiAgcHJpdmF0ZSBfc3BpbjogYW55O1xuXG4gIC8qXG4gICogTGlzdGVuaW5nIGZvciBtb3VzZSBldmVudHNcbiAgKiBtb3VzZXVwIGluIG5nT25Jbml0IGJlY2F1c2UgaXQgdXNlZCBkb2NjdW1lbnQgYXMgcmVmZXJlbmNlXG4gICovXG5cbiAgLy8gYXZvaWQgZHJhZ1xuICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKVxuICBvbkRyYWdTdGFydChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gbW91c2Vkb3duXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gIG9uTW91c2Vkb3duKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xuICAgIHRoaXMubGFzdE1vdXNlRXZlbnQgPSBldmVudDtcbiAgfVxuXG4gIC8vIG1vdXNlbW92ZVxuICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCddKVxuICBvbk1vdXNlbW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLm1vdXNlRG93biAmJiB0aGlzLnN0YXJ0ZWQpIHtcblxuICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbihldmVudCk7XG5cbiAgICAgIC8vIFRoZSB3aWR0aCBpcyBkaXZpZGVkIGJ5IHRoZSBhbW91bnQgb2YgaW1hZ2VzLiBNb3ZpbmcgZnJvbSAwIHRvIDEwMCB3aWxsIHR1cm4gMzYww4LCsFxuICAgICAgaWYgKE1hdGguYWJzKHRoaXMucG9zaXRpb25EaWZmKSA+PSB0aGlzLmludGVydmFsKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uRGlmZiA8IDApIHtcbiAgICAgICAgICB0aGlzLmdvUmlnaHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmdvTGVmdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFzdE1vdXNlRXZlbnQgPSBldmVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZnJhbWVTaG93biA9IDA7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbkdsb2JhbCgnZG9jdW1lbnQnLCAnbW91c2V1cCcsIChldmVudCkgPT4ge1xuICAgICAgaWYgKHRoaXMubW91c2VEb3duKSB7XG4gICAgICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG1hcmtBc0xvYWRlZCA9IChldmVudCkgPT4ge1xuICAgIHRoaXMudG90YWxJbWFnZXNMb2FkZWQrKztcbiAgICBpZiAodGhpcy50b3RhbEltYWdlc0xvYWRlZCA9PT0gdGhpcy5zY2VuZXNMZW4pIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXJTY2VuZSA9IHRoaXMuc2NlbmVzWzBdO1xuICAgICAgdGhpcy5sb2FkaW5nSW1hZ2VzID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ29MZWZ0ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnNjZW5lc1t0aGlzLmZyYW1lU2hvd24gLSAxXSkge1xuICAgICAgdGhpcy5mcmFtZVNob3duLS07XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvb3BpbmcpIHtcbiAgICAgIHRoaXMuZnJhbWVTaG93biA9IHRoaXMuc2NlbmVzTGVuIC0gMTtcbiAgICB9XG4gIH1cblxuICBnb1JpZ2h0ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnNjZW5lc1t0aGlzLmZyYW1lU2hvd24gKyAxXSkge1xuICAgICAgdGhpcy5mcmFtZVNob3duKys7XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvb3BpbmcpIHtcbiAgICAgIHRoaXMuZnJhbWVTaG93biA9IDA7XG4gICAgfVxuICB9XG5cbiAgc3RhcnQgPSAoJGV2ZW50KTogdm9pZCA9PiB7XG4gICAgdGhpcy5wbGFjZWhvbGRlclNjZW5lID0gTE9BRElOR19JTUFHRTtcbiAgICB0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkID0gMDtcbiAgICB0aGlzLmxvYWRpbmdJbWFnZXMgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gIH1cblxuICBsb2FkZXJQZXJjZW50YWdlID0gKCkgPT4ge1xuICAgIHJldHVybiAodGhpcy5zY2VuZXNMZW4gLSB0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkKSA+IDAgPyAoKDEwMCAvIHRoaXMuc2NlbmVzTGVuKSAqIHRoaXMudG90YWxJbWFnZXNMb2FkZWQpLnRvRml4ZWQoMSkgOiAwO1xuICB9XG5cbiAgb25PcGVuKCRldmVudCkge1xuXG4gICAgdGhpcy5vcGVuLmVtaXQoJGV2ZW50KTtcblxuICB9XG5cbiAgLypcbiAgICpcbiAgICogSU1QT1JUQU5UXG4gICAqXG4gICAqIHJlc2V0U3RhcnRQb3NpdGlvbkJhc2VkT25Db21wYW55XG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHJlc3BvbnNpYmxlIGZvciBlbnN1cmluZyB0aGUgQnVzaW5lc3MgUnVsZSBvZiB0aGUgc3BpbiBzZXF1ZW5jZVxuICAgKiBUaGUgSG9tZSBEZXBvdCBha2EgY3VzdG9tZXIgMTAwLCBoYXZlIGEgcGFydGljdWxhciBiZWhhdmlvciBzdGFydGluZyAxODDDgsK6IGluIHRoZSBtaWRkbGVcbiAgICpcbiAgKi9cbiAgcHJpdmF0ZSByZXNldFN0YXJ0UG9zaXRpb25CYXNlZE9uQ29tcGFueShzcGluLCBzY2VuZXMpIHtcblxuICAgIHRoaXMuc3RhcnRJbkNlbnRlciA9IHNwaW4uY29tcGFueS5pZCA9PT0gMTAwID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy5zdGFydEluQ2VudGVyID0gdGhpcy5zdGFydEluQ2VudGVyICYmIHNjZW5lcy5sZW5ndGggPD0gMTY7XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTY2VuZXNEYXRhKHNjZW5lcykge1xuICAgIHRoaXMucGxhY2Vob2xkZXJTY2VuZSA9IHNjZW5lc1swXTtcbiAgICB0aGlzLnNjZW5lc0xlbiA9IHNjZW5lcy5sZW5ndGg7XG4gICAgdGhpcy5zY2VuZXMgPSBzY2VuZXM7XG4gIH1cblxuICBwcml2YXRlIGxvYWRTY2VuZXMoc3Bpbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzY2VuZXMgPSB0aGlzLmdldFVybHNGcm9tU3lzRmlsZXMoc3Bpbi5kYXRhLnNob3RzKTtcbiAgICAgIHJldHVybiBzY2VuZXMgJiYgc2NlbmVzLmxlbmd0aCA+IDAgPyBzY2VuZXMgOiBbRkFMTEJBQ0tfSU1BR0VdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gW0ZBTExCQUNLX0lNQUdFXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZVBvc2l0aW9uKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0OiBhbnkgPSBldmVudFsndGFyZ2V0J107XG5cbiAgICBpZiAodGhpcy5jb250YWluZXJXaWR0aCAhPT0gdGFyZ2V0LmNsaWVudFdpZHRoKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gIHRhcmdldC5jbGllbnRXaWR0aDtcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSAodGhpcy5jb250YWluZXJXaWR0aCAvIHRoaXMuc2NlbmVzTGVuKSAvIDEuNjtcbiAgICB9XG5cbiAgICB0aGlzLnBvc2l0aW9uRGlmZiA9IGV2ZW50LmNsaWVudFggLSB0aGlzLmxhc3RNb3VzZUV2ZW50LmNsaWVudFg7XG4gIH1cblxuICBwcml2YXRlIGdldFVybHNGcm9tU3lzRmlsZXMoc3lzRmlsZXMpIHtcbiAgICBpZiAoIXN5c0ZpbGVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzeXNGaWxlcy5tYXAoZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWxlLnJlbmRlckZpbGUuZmlsZVVybDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IERlY1Byb2R1Y3RTcGluQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9kdWN0LXNwaW4uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjUHJvZHVjdFNwaW5Db21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1Byb2R1Y3RTcGluQ29tcG9uZW50XG4gIF0sXG59KVxuXG5leHBvcnQgY2xhc3MgRGVjUHJvZHVjdFNwaW5Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBbcm91dGVyTGlua109XCJyb3V0ZXJMaW5rXCIgY2xhc3M9XCJkZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxle291dGxpbmU6MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSByb3V0ZXJMaW5rO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBBZnRlclZpZXdJbml0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LXRvb2xiYXInLFxuICB0ZW1wbGF0ZTogYDxtYXQtdG9vbGJhciBbY29sb3JdPVwiY29sb3JcIiAqbmdJZj1cImluaXRpYWxpemVkXCIgY2xhc3M9XCJkZWMtc2lkZW5hdi10b29sYmFyXCI+XG5cbiAgPHNwYW4gY2xhc3M9XCJpdGVtcy1pY29uIGl0ZW0tbGVmdFwiICpuZ0lmPVwibGVmdE1lbnVUcmlnZ2VyVmlzaWJsZVwiIChjbGljayk9XCJ0b2dnbGVMZWZ0TWVudS5lbWl0KClcIj5cbiAgICAmIzk3NzY7XG4gIDwvc3Bhbj5cblxuICA8c3BhbiAqbmdJZj1cImN1c3RvbVRpdGxlXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZVwiPjwvbmctY29udGVudD5cbiAgPC9zcGFuPlxuXG4gIDxkaXYgY2xhc3M9XCJyaWJib24ge3tyaWJib259fVwiICpuZ0lmPVwibm90UHJvZHVjdGlvblwiPlxuICAgIDxzcGFuPnt7bGFiZWwgfCB0cmFuc2xhdGV9fTwvc3Bhbj5cbiAgPC9kaXY+XG5cbiAgPHNwYW4gY2xhc3M9XCJkZWMtc2lkZW5hdi10b29sYmFyLWN1c3RvbS1jb250ZW50XCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L3NwYW4+XG5cbiAgPHNwYW4gY2xhc3M9XCJpdGVtcy1zcGFjZXJcIj48L3NwYW4+XG5cbiAgPHNwYW4gY2xhc3M9XCJpdGVtcy1pY29uIGl0ZW0tcmlnaHRcIiAqbmdJZj1cInJpZ2h0TWVudVRyaWdnZXJWaXNpYmxlXCIgKGNsaWNrKT1cInRvZ2dsZVJpZ2h0TWVudS5lbWl0KClcIj5cbiAgICAmIzk3NzY7XG4gIDwvc3Bhbj5cblxuPC9tYXQtdG9vbGJhcj5cbmAsXG4gIHN0eWxlczogW2AuaXRlbXMtc3BhY2Vye2ZsZXg6MSAxIGF1dG99Lml0ZW1zLWljb257Y3Vyc29yOnBvaW50ZXI7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMS4yLC44KTt0cmFuc2Zvcm06c2NhbGUoMS4yLC44KX0uaXRlbXMtaWNvbi5pdGVtLXJpZ2h0e3BhZGRpbmctbGVmdDoxNHB4fS5pdGVtcy1pY29uLml0ZW0tbGVmdHtwYWRkaW5nLXJpZ2h0OjE0cHh9LmRlYy1zaWRlbmF2LXRvb2xiYXItY3VzdG9tLWNvbnRlbnR7cGFkZGluZzowIDE2cHg7d2lkdGg6MTAwJX0ucmliYm9ue3RyYW5zaXRpb246YWxsIC4zcyBlYXNlO3RleHQtdHJhbnNmb3JtOmxvd2VyY2FzZTt0ZXh0LWFsaWduOmNlbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZTtsaW5lLWhlaWdodDo2NHB4O21hcmdpbi1sZWZ0OjRweDtwYWRkaW5nOjAgMjBweDtoZWlnaHQ6NjRweDt3aWR0aDoxNTVweDtjb2xvcjojZmZmO2xlZnQ6MjBweDt0b3A6MH0ucmliYm9uLnJpYmJvbi1oaWRkZW57ZGlzcGxheTpub25lfS5yaWJib246OmJlZm9yZXtjb250ZW50OicnO3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMHZ3O2hlaWdodDo0cHg7ei1pbmRleDoyO3RvcDo2NHB4O2xlZnQ6MH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjU5OXB4KXsucmliYm9uOjpiZWZvcmV7dG9wOjU2cHh9fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcblxuICBpbml0aWFsaXplZDtcblxuICBub3RQcm9kdWN0aW9uID0gdHJ1ZTtcbiAgcmliYm9uID0gJyc7XG4gIGxhYmVsID0gJyc7XG5cbiAgQElucHV0KCkgY29sb3I7XG5cbiAgQElucHV0KCkgZW52aXJvbm1lbnQ7XG5cbiAgQElucHV0KCkgbGVmdE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRydWU7XG5cbiAgQElucHV0KCkgcmlnaHRNZW51VHJpZ2dlclZpc2libGUgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSB0b2dnbGVMZWZ0TWVudTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgdG9nZ2xlUmlnaHRNZW51OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCkgY3VzdG9tVGl0bGU6IERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVudmlyb25tZW50ID09PSAnbG9jYWwnKSB7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24tZ3JlZW4nO1xuICAgICAgdGhpcy5sYWJlbCA9ICdsYWJlbC5sb2NhbCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVudmlyb25tZW50ID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24tYmx1ZSc7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLmRldmVsb3BtZW50JztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdxYScpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1yZWQnO1xuICAgICAgdGhpcy5sYWJlbCA9ICdsYWJlbC5xYSc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVudmlyb25tZW50ID09PSAnYWN0aXZlJykge1xuICAgICAgdGhpcy5yaWJib24gPSAncmliYm9uLWdyZWVuJztcbiAgICAgIHRoaXMubGFiZWwgPSAnbGFiZWwuYWN0aXZlJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub3RQcm9kdWN0aW9uID0gZmFsc2U7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24taGlkZGVuJztcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEFmdGVyVmlld0luaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtbWVudS1pdGVtJyxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgbGV0LXRyZWVMZXZlbD1cInRyZWVMZXZlbFwiICN0ZW1wbGF0ZT5cblxuICA8bWF0LWxpc3QtaXRlbSBjbGFzcz1cImNsaWNrIGRlYy1zaWRlbmF2LW1lbnUtaXRlbVwiXG4gIChjbGljayk9XCJzdWJpdGVtcy5sZW5ndGggPyB0b2dnbGVTdWJtZW51KCkgOiBvcGVuTGluaygpXCJcbiAgW25nQ2xhc3NdPVwiZ2V0QmFja2dyb3VuZCh0cmVlTGV2ZWwpXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaXRlbS13cmFwcGVyXCI+XG5cbiAgICAgIDxkaXYgW25nU3R5bGVdPVwie3BhZGRpbmdMZWZ0OiB0cmVlTGV2ZWwgKiAxNiArICdweCd9XCIgY2xhc3M9XCJpdGVtLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJzdWJpdGVtcy5sZW5ndGhcIiBjbGFzcz1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwic2hvd1N1Ym1lbnVcIj5cbiAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPjxpIGNsYXNzPVwiYXJyb3cgZG93blwiPjwvaT48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+PGkgY2xhc3M9XCJhcnJvdyByaWdodFwiPjwvaT48L3NwYW4+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9tYXQtbGlzdC1pdGVtPlxuXG4gIDxkaXYgY2xhc3M9XCJzdWJpdGVtLW1lbnVcIiAqbmdJZj1cInNob3dTdWJtZW51XCI+XG5cbiAgICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwic3ViaXRlbXNcIiBbdHJlZUxldmVsXT1cInRyZWVMZXZlbFwiPjwvZGVjLXNpZGVuYXYtbWVudT5cblxuICA8L2Rpdj5cblxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gIHN0eWxlczogW2AuZGVjLXNpZGVuYXYtbWVudS1pdGVte2hlaWdodDo1NnB4IWltcG9ydGFudDtvdXRsaW5lOjB9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVye3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3cgbm8td3JhcDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLml0ZW0tY29udGVudCA6Om5nLWRlZXAgLm1hdC1pY29uLC5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuaXRlbS1jb250ZW50IDo6bmctZGVlcCBpe3ZlcnRpY2FsLWFsaWduOm1pZGRsZTttYXJnaW4tYm90dG9tOjVweDttYXJnaW4tcmlnaHQ6OHB4fS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuYXJyb3d7bWFyZ2luLWJvdHRvbTotNHB4fS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuYXJyb3cucmlnaHR7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuYXJyb3cubGVmdHt0cmFuc2Zvcm06cm90YXRlKDEzNWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDEzNWRlZyl9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC5hcnJvdy51cHt0cmFuc2Zvcm06cm90YXRlKC0xMzVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtMTM1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLmFycm93LmRvd257dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC50ZXh0LXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuY2xpY2t7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSBpe2JvcmRlcjpzb2xpZCAjMDAwO2JvcmRlci13aWR0aDowIDJweCAycHggMDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjRweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSByb3V0ZXJMaW5rO1xuXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgX3N1Yml0ZW1zOiBRdWVyeUxpc3Q8RGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50PjtcblxuICBAT3V0cHV0KCkgdG9nZ2xlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHN0YXJ0ZWQ7XG5cbiAgc2hvd1N1Ym1lbnUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIGdldCBzdWJpdGVtcygpIHtcbiAgICBjb25zdCBzdWJpdGVtcyA9IHRoaXMuX3N1Yml0ZW1zLnRvQXJyYXkoKTtcbiAgICBzdWJpdGVtcy5zcGxpY2UoMCwgMSk7IC8vIHJlbW92ZXMgaXRzZWxmXG4gICAgcmV0dXJuIHN1Yml0ZW1zO1xuICB9XG5cbiAgdG9nZ2xlU3VibWVudSgpIHtcbiAgICB0aGlzLnNob3dTdWJtZW51ID0gIXRoaXMuc2hvd1N1Ym1lbnU7XG4gICAgdGhpcy50b2dnbGUuZW1pdCh0aGlzLnNob3dTdWJtZW51KTtcbiAgfVxuXG4gIGNsb3NlU3VibWVudSgpIHtcbiAgICB0aGlzLnNob3dTdWJtZW51ID0gZmFsc2U7XG4gIH1cblxuICBvcGVuTGluaygpIHtcbiAgICBpZiAodGhpcy5yb3V0ZXJMaW5rKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucm91dGVyTGluayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgaXNOYWtlZCA9IHRoaXMucm91dGVyTGluay5zdGFydHNXaXRoKCcvLycpO1xuICAgICAgICBjb25zdCBpc0h0dHAgPSB0aGlzLnJvdXRlckxpbmsuc3RhcnRzV2l0aCgnaHR0cDovLycpO1xuICAgICAgICBjb25zdCBpc0h0dHBzID0gdGhpcy5yb3V0ZXJMaW5rLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJyk7XG4gICAgICAgIGlmIChpc05ha2VkIHx8IGlzSHR0cCB8fCBpc0h0dHBzKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnJvdXRlckxpbms7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGVyTGlua10pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5yb3V0ZXJMaW5rKSkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSh0aGlzLnJvdXRlckxpbmspO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldEJhY2tncm91bmQodHJlZUxldmVsKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tJZkFjdGl2ZSgpID8gJ21hdC1saXN0LWl0ZW0tYWN0aXZlJyA6ICdtYXQtbGlzdC1pdGVtLScgKyB0cmVlTGV2ZWw7XG4gIH1cblxuICBjaGVja0lmQWN0aXZlKCkge1xuICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2hvd1N1Ym1lbnUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGFzQWN0aXZlQ2hpbGQgPSB0aGlzLmhhc0FjdGl2ZUNoaWxkO1xuICAgICAgcmV0dXJuIGhhc0FjdGl2ZUNoaWxkO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgaGFzQWN0aXZlQ2hpbGQoKSB7XG4gICAgaWYgKCF0aGlzLnN1Yml0ZW1zKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnN1Yml0ZW1zLnJlZHVjZSgobGFzdFZhbHVlLCBpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBsYXN0VmFsdWUgfHwgaXRlbS5pc0FjdGl2ZSB8fCBpdGVtLmhhc0FjdGl2ZUNoaWxkO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyTGluayA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IFNUT1JBR0VfRE9NQUlOID0gJ2RlY1NpZGVuYXZDb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdlNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXRTaWRlbmF2VmlzaWJpbGl0eShuYW1lLCB2aXNpYmlsaXR5KSB7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldFNpZGVuYXZDb25maWcoKTtcblxuICAgIGNvbmZpZ1tuYW1lXSA9IHZpc2liaWxpdHk7XG5cbiAgICB0aGlzLnNldFNpZGVuYXZDb25maWcoY29uZmlnKTtcblxuICB9XG5cbiAgZ2V0U2lkZW5hdlZpc2liaWxpdHkobmFtZSkge1xuXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRTaWRlbmF2Q29uZmlnKCk7XG5cbiAgICByZXR1cm4gY29uZmlnW25hbWVdO1xuXG4gIH1cblxuICBwcml2YXRlIHNldFNpZGVuYXZDb25maWcoY29uZikge1xuXG4gICAgY29uc3QgY29uZlN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGNvbmYpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9ET01BSU4sIGNvbmZTdHJpbmcpO1xuXG4gIH1cblxuICBwcml2YXRlIGdldFNpZGVuYXZDb25maWcoKSB7XG5cbiAgICBjb25zdCBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9ET01BSU4pO1xuXG4gICAgaWYgKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuXG4gICAgICB0aGlzLnNldFNpZGVuYXZDb25maWcobmV3Q29uZmlnKTtcblxuICAgICAgcmV0dXJuIG5ld0NvbmZpZztcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIElucHV0LCBDb250ZW50Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS10aXRsZS9kZWMtc2lkZW5hdi1tZW51LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuLy4uL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtbGVmdCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1c3RvbVRpdGxlXCI+XG4gIDxkaXYgY2xhc3M9XCJtZW51LXRpdGxlXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWRlYy1zaWRlbmF2LW1lbnUtdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtc1wiPlxuICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwiaXRlbXMudG9BcnJheSgpXCI+PC9kZWMtc2lkZW5hdi1tZW51PlxuPC9uZy1jb250YWluZXI+YCxcbiAgc3R5bGVzOiBbYC5tZW51LXRpdGxle3BhZGRpbmc6MTZweDtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo3MDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICByZWFkb25seSBsZWZ0TWVudVZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIHJlYWRvbmx5IGxlZnRNZW51TW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2lkZScpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcGVuKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMubGVmdE1lbnVWaXNpYmxlLnZhbHVlO1xuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubGVmdE1lbnVWaXNpYmxlLm5leHQodik7XG4gICAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnNldFNpZGVuYXZWaXNpYmlsaXR5KCdsZWZ0TWVudUhpZGRlbicsICF2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbW9kZSh2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmxlZnRNZW51TW9kZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubGVmdE1lbnVNb2RlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdE1lbnVNb2RlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgcGVyc2lzdFZpc2liaWxpdHlNb2RlOiBib29sZWFuO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgaXRlbXM6IFF1ZXJ5TGlzdDxEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCkgY3VzdG9tVGl0bGU6IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIG9wZW5lZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAT3V0cHV0KCkgbW9kZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHByaXZhdGUgaXRlbVN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNTaWRlbmF2U2VydmljZTogRGVjU2lkZW5hdlNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVBbmRFeHBvc2VTaWRlbmF2RXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKSB7XG5cbiAgICB0aGlzLmxlZnRNZW51VmlzaWJsZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxlZnRNZW51TW9kZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5tb2RlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMudG9BcnJheSgpO1xuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50KSA9PiB7XG5cbiAgICAgIGl0ZW0udG9nZ2xlLnN1YnNjcmliZShzdGF0ZSA9PiB7XG5cbiAgICAgICAgaWYgKHN0YXRlKSB7XG5cbiAgICAgICAgICB0aGlzLmNsb3NlQnJvdGhlcnMoaXRlbSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLml0ZW1TdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VCcm90aGVycyhpdGVtU2VsZWN0ZWQpIHtcblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy50b0FycmF5KCk7XG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQpID0+IHtcblxuICAgICAgaWYgKGl0ZW1TZWxlY3RlZCAhPT0gaXRlbSkge1xuXG4gICAgICAgIGl0ZW0uY2xvc2VTdWJtZW51KCk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbnB1dCwgQ29udGVudENoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS9kZWMtc2lkZW5hdi1tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUvZGVjLXNpZGVuYXYtbWVudS10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY1NpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zaWRlbmF2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51LXJpZ2h0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VzdG9tVGl0bGVcIj5cbiAgPGRpdiBjbGFzcz1cIm1lbnUtdGl0bGVcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtZGVjLXNpZGVuYXYtbWVudS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW1zXCI+XG4gIDxkZWMtc2lkZW5hdi1tZW51IFtpdGVtc109XCJpdGVtcy50b0FycmF5KClcIj48L2RlYy1zaWRlbmF2LW1lbnU+XG48L25nLWNvbnRhaW5lcj5gLFxuICBzdHlsZXM6IFtgLm1lbnUtdGl0bGV7cGFkZGluZzoxNnB4O2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjcwMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICByZWFkb25seSByaWdodE1lbnVWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcblxuICByZWFkb25seSByaWdodE1lbnVNb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdzaWRlJyk7XG5cbiAgQElucHV0KClcbiAgc2V0IG9wZW4odjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5yaWdodE1lbnVWaXNpYmxlLnZhbHVlO1xuXG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yaWdodE1lbnVWaXNpYmxlLm5leHQodik7XG4gICAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnNldFNpZGVuYXZWaXNpYmlsaXR5KCdyaWdodE1lbnVIaWRkZW4nLCAhdik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBtb2RlKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMucmlnaHRNZW51TW9kZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucmlnaHRNZW51TW9kZS5uZXh0KHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0TWVudU1vZGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKSBwZXJzaXN0VmlzaWJpbGl0eU1vZGU6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBpdGVtczogUXVlcnlMaXN0PERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50KSBjdXN0b21UaXRsZTogRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgb3BlbmVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKSBtb2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHJpdmF0ZSBpdGVtU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NpZGVuYXZTZXJ2aWNlOiBEZWNTaWRlbmF2U2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpIHtcblxuICAgIHRoaXMucmlnaHRNZW51VmlzaWJsZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJpZ2h0TWVudU1vZGUuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMubW9kZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zLnRvQXJyYXkoKTtcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCkgPT4ge1xuXG4gICAgICBpdGVtLnRvZ2dsZS5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuXG4gICAgICAgIGlmIChzdGF0ZSkge1xuXG4gICAgICAgICAgdGhpcy5jbG9zZUJyb3RoZXJzKGl0ZW0pO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5pdGVtU3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikgPT4ge1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlQnJvdGhlcnMoaXRlbVNlbGVjdGVkKSB7XG5cbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMudG9BcnJheSgpO1xuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50KSA9PiB7XG5cbiAgICAgIGlmIChpdGVtU2VsZWN0ZWQgIT09IGl0ZW0pIHtcblxuICAgICAgICBpdGVtLmNsb3NlU3VibWVudSgpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtdG9vbGJhci9kZWMtc2lkZW5hdi10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtbGVmdC9kZWMtc2lkZW5hdi1tZW51LWxlZnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQvZGVjLXNpZGVuYXYtbWVudS1yaWdodC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0U2lkZW5hdiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY1NpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlbmF2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1zaWRlbmF2LXdyYXBlclwiPlxuICA8IS0tIFRPT0xCQVIgLS0+XG4gIDxkaXYgKm5nSWY9XCJ0b29sYmFyXCIgY2xhc3M9XCJkZWMtc2lkZW5hdi10b29sYmFyLXdyYXBwZXJcIiBbbmdDbGFzc109XCJ7J2Z1bGwtc2NyZWVuJzogIShsZWZ0TWVudS5sZWZ0TWVudVZpc2libGUgfCBhc3luYyl9XCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtdG9vbGJhclwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG4gIDwhLS0gLyBUT09MQkFSIC0tPlxuXG4gIDwhLS0gUFJPR1JFU1MgQkFSIC0tPlxuICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyLXdyYXBwZXJcIiAqbmdJZj1cInByb2dyZXNzQmFyVmlzaWJsZSB8IGFzeW5jXCI+XG4gICAgPG1hdC1wcm9ncmVzcy1iYXIgbW9kZT1cImluZGV0ZXJtaW5hdGVcIiBjb2xvcj1cImFjY2VudFwiPjwvbWF0LXByb2dyZXNzLWJhcj5cbiAgPC9kaXY+XG4gIDwhLS0gLyBQUk9HUkVTUyBCQVIgLS0+XG5cbiAgPG1hdC1zaWRlbmF2LWNvbnRhaW5lciBbbmdDbGFzc109XCJ7J3dpdGgtdG9vbGJhcic6IHRvb2xiYXIsICdmdWxsLXNjcmVlbic6ICEobGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlIHwgYXN5bmMpfVwiPlxuXG4gICAgPCEtLSBMRUZUIE1FTlUgLS0+XG4gICAgPG1hdC1zaWRlbmF2ICpuZ0lmPVwibGVmdE1lbnVcIlxuICAgIFttb2RlXT1cImxlZnRNZW51LmxlZnRNZW51TW9kZSB8IGFzeW5jXCJcbiAgICBbb3BlbmVkXT1cImxlZnRNZW51LmxlZnRNZW51VmlzaWJsZSB8IGFzeW5jXCJcbiAgICBwb3NpdGlvbj1cInN0YXJ0XCJcbiAgICAob3BlbmVkQ2hhbmdlKT1cImxlZnRTaWRlbmF2T3BlbmVkQ2hhbmdlKCRldmVudClcIlxuICAgICNsZWZ0U2lkZW5hdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LW1lbnUtbGVmdFwiPjwvbmctY29udGVudD5cbiAgICA8L21hdC1zaWRlbmF2PlxuICAgIDwhLS0gLyBMRUZUIE1FTlUgLS0+XG5cbiAgICA8IS0tIENPTlRFTlQgLS0+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICA8IS0tIC8gQ09OVEVOVCAtLT5cblxuICAgIDwhLS0gUklHSFQgTUVOVSAtLT5cbiAgICA8bWF0LXNpZGVuYXYgKm5nSWY9XCJyaWdodE1lbnVcIlxuICAgIFttb2RlXT1cInJpZ2h0TWVudS5yaWdodE1lbnVNb2RlIHwgYXN5bmNcIlxuICAgIFtvcGVuZWRdPVwicmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUgfCBhc3luY1wiXG4gICAgcG9zaXRpb249XCJlbmRcIlxuICAgIChvcGVuZWRDaGFuZ2UpPVwicmlnaHRTaWRlbmF2T3BlbmVkQ2hhbmdlKCRldmVudClcIlxuICAgICNyaWdodFNpZGVuYXY+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi1tZW51LXJpZ2h0XCI+PC9uZy1jb250ZW50PlxuICAgIDwvbWF0LXNpZGVuYXY+XG4gICAgPCEtLSAvIFJJR0hUIE1FTlUgLS0+XG5cbiAgPC9tYXQtc2lkZW5hdi1jb250YWluZXI+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi13cmFwZXIgLmRlYy1zaWRlbmF2LXRvb2xiYXItd3JhcHBlcnttaW4td2lkdGg6MTIwMHB4fS5kZWMtc2lkZW5hdi13cmFwZXIgLmRlYy1zaWRlbmF2LXRvb2xiYXItd3JhcHBlci5mdWxsLXNjcmVlbnttaW4td2lkdGg6OTQ0cHh9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVye21pbi13aWR0aDoxMjAwcHg7aGVpZ2h0OjEwMHZofS5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lci5mdWxsLXNjcmVlbnttaW4td2lkdGg6OTQ0cHh9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyLndpdGgtdG9vbGJhcntoZWlnaHQ6Y2FsYygxMDB2aCAtIDY0cHgpfS5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lciAubWF0LXNpZGVuYXZ7d2lkdGg6MjU2cHh9LmRlYy1zaWRlbmF2LXdyYXBlciAucHJvZ3Jlc3MtYmFyLXdyYXBwZXJ7cG9zaXRpb246Zml4ZWQ7dG9wOjYwcHg7bGVmdDowO3dpZHRoOjEwMCV9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDoxMTk5cHgpey5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lcntoZWlnaHQ6Y2FsYygxMDB2aCAtIDE2cHgpfS5kZWMtc2lkZW5hdi13cmFwZXIgLm1hdC1zaWRlbmF2LWNvbnRhaW5lci53aXRoLXRvb2xiYXJ7aGVpZ2h0OmNhbGMoMTAwdmggLSA4MHB4KX19YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHJlYWRvbmx5IHByb2dyZXNzQmFyVmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQpIHRvb2xiYXI6IERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50KVxuICBzZXQgbGVmdE1lbnUodjogRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50KSB7XG4gICAgdGhpcy5fbGVmdE1lbnUgPSB2O1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLnNldEluaXRpYWxMZWZ0TWVudVZpc2liaWxpdHlNb2RlcygpO1xuICAgIH1cbiAgfVxuICBnZXQgbGVmdE1lbnUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xlZnRNZW51O1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50KVxuICBzZXQgcmlnaHRNZW51KHY6IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQpIHtcbiAgICB0aGlzLl9yaWdodE1lbnUgPSB2O1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLnNldEluaXRpYWxSaWdodE1lbnVWaXNpYmlsaXR5TW9kZXMoKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHJpZ2h0TWVudSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmlnaHRNZW51O1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnbGVmdFNpZGVuYXYnKSBsZWZ0U2lkZW5hdjogTWF0U2lkZW5hdjtcblxuICBAVmlld0NoaWxkKCdyaWdodFNpZGVuYXYnKSByaWdodFNpZGVuYXY6IE1hdFNpZGVuYXY7XG5cbiAgcHJpdmF0ZSBfbGVmdE1lbnU6IERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudDtcblxuICBwcml2YXRlIF9yaWdodE1lbnU6IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQ7XG5cbiAgQElucHV0KClcbiAgc2V0IGxvYWRpbmcodjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5wcm9ncmVzc0JhclZpc2libGUudmFsdWU7XG5cbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsb2FkaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjU2lkZW5hdlNlcnZpY2U6IERlY1NpZGVuYXZTZXJ2aWNlXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgICB0aGlzLmRldGVjdEFuZFNob3dDaGlsZENvbXBvbmVudHMoKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlVG9Ub29sYmFyRXZlbnRzKCk7XG5cbiAgfVxuXG4gIC8vIEFQSSAvL1xuICBvcGVuQm90aE1lbnVzKCkge1xuICAgIHRoaXMub3BlbkxlZnRNZW51KCk7XG4gICAgdGhpcy5vcGVuUmlnaHRNZW51KCk7XG4gIH1cblxuICBvcGVuTGVmdE1lbnUoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIG9wZW5SaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgY2xvc2VCb3RoTWVudXMoKSB7XG4gICAgdGhpcy5jbG9zZUxlZnRNZW51KCk7XG4gICAgdGhpcy5jbG9zZVJpZ2h0TWVudSgpO1xuICB9XG5cbiAgY2xvc2VMZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIGNsb3NlUmlnaHRNZW51KCkge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dChmYWxzZSk7XG4gIH1cblxuICB0b2dnbGVCb3RoTWVudXMoKSB7XG4gICAgdGhpcy50b2dnbGVMZWZ0TWVudSgpO1xuICAgIHRoaXMudG9nZ2xlUmlnaHRNZW51KCk7XG4gIH1cblxuICB0b2dnbGVMZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51Lm9wZW4gPSAhdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICB0b2dnbGVSaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUub3BlbiA9ICF0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgc2V0Qm90aE1lbnVzTW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLnNldExlZnRNZW51TW9kZShtb2RlKTtcbiAgICB0aGlzLnNldFJpZ2h0TWVudU1vZGUobW9kZSk7XG4gIH1cblxuICBzZXRMZWZ0TWVudU1vZGUobW9kZTogJ292ZXInIHwgJ3B1c2gnIHwgJ3NpZGUnID0gJ3NpZGUnKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudU1vZGUubmV4dChtb2RlKTtcbiAgfVxuXG4gIHNldFJpZ2h0TWVudU1vZGUobW9kZTogJ292ZXInIHwgJ3B1c2gnIHwgJ3NpZGUnID0gJ3NpZGUnKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51TW9kZS5uZXh0KG1vZGUpO1xuICB9XG5cbiAgdG9nZ2xlUHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gIXRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgc2hvd1Byb2dyZXNzQmFyKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBoaWRlUHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5wcm9ncmVzc0JhclZpc2libGUubmV4dChmYWxzZSk7XG4gIH1cblxuICBsZWZ0U2lkZW5hdk9wZW5lZENoYW5nZShvcGVuZWRTdGF0dXMpIHtcbiAgICB0aGlzLmxlZnRNZW51Lm9wZW4gPSBvcGVuZWRTdGF0dXM7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dChvcGVuZWRTdGF0dXMpO1xuICB9XG5cbiAgcmlnaHRTaWRlbmF2T3BlbmVkQ2hhbmdlKG9wZW5lZFN0YXR1cykge1xuICAgIHRoaXMucmlnaHRNZW51Lm9wZW4gPSBvcGVuZWRTdGF0dXM7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KG9wZW5lZFN0YXR1cyk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdEFuZFNob3dDaGlsZENvbXBvbmVudHMoKSB7XG5cbiAgICB0aGlzLnRvb2xiYXIubGVmdE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRoaXMubGVmdE1lbnUgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB0aGlzLnRvb2xiYXIucmlnaHRNZW51VHJpZ2dlclZpc2libGUgPSB0aGlzLnJpZ2h0TWVudSA/IHRydWUgOiBmYWxzZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1Rvb2xiYXJFdmVudHMoKSB7XG5cbiAgICBpZiAodGhpcy50b29sYmFyKSB7XG5cbiAgICAgIHRoaXMudG9vbGJhci50b2dnbGVMZWZ0TWVudS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxlZnRTaWRlbmF2LnRvZ2dsZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudG9vbGJhci50b2dnbGVSaWdodE1lbnUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5yaWdodFNpZGVuYXYudG9nZ2xlKCk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0aWFsUmlnaHRNZW51VmlzaWJpbGl0eU1vZGVzKCkge1xuICAgIHRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUubmV4dCghdGhpcy5kZWNTaWRlbmF2U2VydmljZS5nZXRTaWRlbmF2VmlzaWJpbGl0eSgncmlnaHRNZW51SGlkZGVuJykpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0aWFsTGVmdE1lbnVWaXNpYmlsaXR5TW9kZXMoKSB7XG4gICAgdGhpcy5sZWZ0TWVudS5sZWZ0TWVudVZpc2libGUubmV4dCghdGhpcy5kZWNTaWRlbmF2U2VydmljZS5nZXRTaWRlbmF2VmlzaWJpbGl0eSgnbGVmdE1lbnVIaWRkZW4nKSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtc2lkZW5hdi1jb250ZW50LXdyYXBwZXJcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1zaWRlbmF2LWNvbnRlbnQtd3JhcHBlcntwYWRkaW5nOjMycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdkNvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51JyxcbiAgdGVtcGxhdGU6IGA8bWF0LWxpc3Q+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbS5zdGFydGVkICYmIGl0ZW0udGVtcGxhdGUgPyB0cnVlIDogZmFsc2VcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbS50ZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3RyZWVMZXZlbDogdHJlZUxldmVsICsgMX1cIlxuICAgICAgPjwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9tYXQtbGlzdD5cbmAsXG4gIHN0eWxlczogW2AubWF0LWxpc3R7cGFkZGluZy10b3A6MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudUNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgaXRlbXMgPSBbXTtcblxuICBASW5wdXQoKSB0cmVlTGV2ZWwgPSAtMTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NpZGVuYXZDb21wb25lbnQgfSBmcm9tICcuL3NpZGVuYXYuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdFNpZGVuYXZNb2R1bGUsIE1hdExpc3RNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsIE1hdFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY1NpZGVuYXZDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1jb250ZW50L2RlYy1zaWRlbmF2LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LWxlZnQvZGVjLXNpZGVuYXYtbWVudS1sZWZ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51L2RlYy1zaWRlbmF2LW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUvZGVjLXNpZGVuYXYtbWVudS10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LXRvb2xiYXIvZGVjLXNpZGVuYXYtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUvZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuL3NpZGVuYXYuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjU2lkZW5hdkNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2Q29udGVudENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjU2lkZW5hdkNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2Q29udGVudENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNTaWRlbmF2U2VydmljZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG53aW5kb3dbJ2RlY29yYVNjcmlwdFNlcnZpY2UnXSA9IHdpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddIHx8IHt9O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGxvYWQodXJsOiBzdHJpbmcsIHNjcmlwdE5hbWU6IHN0cmluZykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHNjcmlwdExvYWRlZCA9IHdpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddW3NjcmlwdE5hbWVdO1xuXG4gICAgICBpZiAoc2NyaXB0TG9hZGVkKSB7XG5cbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gd2luZG93W3NjcmlwdE5hbWVdO1xuXG4gICAgICAgIHJlc29sdmUoc2NyaXB0KTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBjb25zdCBzY3JpcHRUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICBzY3JpcHRUYWcuc2V0QXR0cmlidXRlKCdzcmMnLCB1cmwpO1xuXG4gICAgICAgIHNjcmlwdFRhZy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XG5cbiAgICAgICAgc2NyaXB0VGFnLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIHdpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddW3NjcmlwdE5hbWVdID0gdHJ1ZTtcblxuICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IHdpbmRvd1tzY3JpcHROYW1lXTtcblxuICAgICAgICAgIHJlc29sdmUoc2NyaXB0KTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHNjcmlwdFRhZy5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc2NyaXB0VGFnKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfTtcblxuICBsb2FkU3R5bGUodXJsOiBzdHJpbmcpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIHdpbmRvd1snc2NyaXB0U2VydmljZUxvYWRlZFN0eWxlc0FycmF5J10gPSB3aW5kb3dbJ3NjcmlwdFNlcnZpY2VMb2FkZWRTdHlsZXNBcnJheSddIHx8IHt9O1xuXG4gICAgICBjb25zdCBzdHlsZUxvYWRlZCA9IHdpbmRvd1snc2NyaXB0U2VydmljZUxvYWRlZFN0eWxlc0FycmF5J11bdXJsXTtcblxuICAgICAgaWYgKHN0eWxlTG9hZGVkKSB7XG5cbiAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNvbnN0IGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICAgICAgbGlua1RhZy5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XG4gICAgICAgIGxpbmtUYWcuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICAgIGxpbmtUYWcuc2V0QXR0cmlidXRlKCdtZWRpYScsICdhbGwnKTtcbiAgICAgICAgbGlua1RhZy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuXG4gICAgICAgIGxpbmtUYWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgd2luZG93WydzY3JpcHRTZXJ2aWNlTG9hZGVkU3R5bGVzQXJyYXknXVt1cmxdID0gdHJ1ZTtcblxuICAgICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGxpbmtUYWcub25lcnJvciA9IHJlamVjdDtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGxpbmtUYWcpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9O1xuXG4gIGxvYWRTdHlsZUFuZFNjcmlwdChzdHlsZVVybCwgc2NyaXB0VXJsLCBzY3JpcHROYW1lc3BhY2UpIHtcblxuICAgIHJldHVybiB0aGlzLmxvYWRTdHlsZShzdHlsZVVybCkudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkKHNjcmlwdFVybCwgc2NyaXB0TmFtZXNwYWNlKTtcbiAgICB9KTtcblxuICB9XG5cbiAgbG9hZExlYWZsZXRTY3JpcHRzQW5kU3R5bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZFN0eWxlKCdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuMy4zL2Rpc3QvbGVhZmxldC5jc3MnKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRTdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLmNzcycpLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkU3R5bGUoJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbGVhZmxldC1lYXN5YnV0dG9uQDIvc3JjL2Vhc3ktYnV0dG9uLmNzcycpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmxvYWQoJ2h0dHBzOi8vdW5wa2cuY29tL2xlYWZsZXRAMS4zLjMvZGlzdC9sZWFmbGV0LmpzJywgJ0xlYWZsZXQnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWQoJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbGVhZmxldC1lYXN5YnV0dG9uQDIvc3JjL2Vhc3ktYnV0dG9uLmpzJywgJ0Vhc3lCdXR0b24nKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NjcmlwdExvYWRlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3NjcmlwdC1sb2FkZXIvZGVjLXNjcmlwdC1sb2FkZXIuc2VydmljZSc7XG5cbmNvbnN0IFNLRVRDSEZBQl9TQ1JJUFRfVVJMID0gJ2h0dHBzOi8vc3RhdGljLnNrZXRjaGZhYi5jb20vYXBpL3NrZXRjaGZhYi12aWV3ZXItMS4wLjAuanMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2tldGNoZmFiLXZpZXcnLFxuICB0ZW1wbGF0ZTogYDxpZnJhbWUgc3JjPVwiXCIgXG4gICNhcGlGcmFtZSBcbiAgaWQ9XCJhcGktZnJhbWVcIiBcbiAgaGVpZ2h0PVwiNjIwXCJcbiAgd2lkdGg9XCI2MjBcIiBcbiAgYWxsb3dmdWxsc2NyZWVuIFxuICBtb3phbGxvd2Z1bGxzY3JlZW49XCJ0cnVlXCIgXG4gIHdlYmtpdGFsbG93ZnVsbHNjcmVlbj1cInRydWVcIj48L2lmcmFtZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2tldGNoZmFiVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgXG4gIHNldCBza2V0Y2hmYWJJZChpZCkge1xuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5fc2tldGNoZmFiSWQgPSBpZDtcbiAgICAgIHRoaXMuc3RhcnRTa2V0Y2hmYWIoaWQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBza2V0Y2hmYWJJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2tldGNoZmFiSWQ7XG4gIH1cblxuICBfc2tldGNoZmFiSWQ6IHN0cmluZztcblxuICBAVmlld0NoaWxkKCdhcGlGcmFtZScpIGFwaUZyYW1lOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjU2NyaXB0TG9hZGVyU2VydmljZTogRGVjU2NyaXB0TG9hZGVyU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBzdGFydFNrZXRjaGZhYihpZCkge1xuICAgIHRoaXMuZGVjU2NyaXB0TG9hZGVyU2VydmljZS5sb2FkKFNLRVRDSEZBQl9TQ1JJUFRfVVJMLCAnU2tldGNoZmFiJylcbiAgICAgIC50aGVuKChTa2V0Y2hmYWI6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBpZnJhbWUgPSB0aGlzLmFwaUZyYW1lLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBTa2V0Y2hmYWIoJzEuMC4wJywgaWZyYW1lKTtcbiAgICAgICAgY2xpZW50LmluaXQodGhpcy5za2V0Y2hmYWJJZCwge1xuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIG9uU3VjY2VzcyhhcGkpIHtcbiAgICAgICAgICAgIGFwaS5zdGFydCgpO1xuICAgICAgICAgICAgYXBpLmFkZEV2ZW50TGlzdGVuZXIoJ3ZpZXdlcnJlYWR5JywgICgpID0+IHt9KTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtc2NyaXB0LWxvYWRlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2NyaXB0TG9hZGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTY3JpcHRMb2FkZXJNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3NjcmlwdC1sb2FkZXIvZGVjLXNjcmlwdC1sb2FkZXIubW9kdWxlJztcbmltcG9ydCB7IERlY1NrZXRjaGZhYlZpZXdDb21wb25lbnQgfSBmcm9tICcuL2RlYy1za2V0Y2hmYWItdmlldy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY1NjcmlwdExvYWRlck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNTa2V0Y2hmYWJWaWV3Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNTa2V0Y2hmYWJWaWV3Q29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2tldGNoZmFiVmlld01vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0ZXAgfSBmcm9tICcuL2RlYy1zdGVwcy1saXN0Lm1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zdGVwcy1saXN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaGlzdG9yeS1jb250YWluZXJcIiBbbmdDbGFzc109XCJ7J2xpbWl0ZWQtaGVpZ2h0JzogbWF4SGVpZ2h0fVwiIFtzdHlsZS5tYXhIZWlnaHRdPVwibWF4SGVpZ2h0IHx8ICcxMDAlJ1wiPlxuXG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBjbGFzcz1cImRlYy1jb2xvci1ncmV5LWRhcmtcIj5cblxuICAgIDxtYXQtaWNvbiBmeEZsZXg9XCIyNHB4XCI+e3tpY29ufX08L21hdC1pY29uPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaWdnZXItZm9udFwiPnt7IHRpdGxlIH19PC9zcGFuPlxuXG4gIDwvZGl2PlxuXG4gIDxicj5cblxuICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaGlzdG9yeS1pdGVtXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RlcHNMaXN0OyBsZXQgaSA9IGluZGV4XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJsZWZ0IHN0YXJ0XCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleVwiPlxuXG4gICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInNtYWxsZXItaWNvbiBkZWMtY29sb3ItZ3JleS1kYXJrXCIgZnhGbGV4PVwiMjRweFwiPnt7IGkgPT09IHN0ZXBzTGlzdC5sZW5ndGggLSAxID8gJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnIDogJ2xlbnMnIH19PC9tYXQtaWNvbj5cblxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCI0cHhcIj5cblxuICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgIDxzdHJvbmcgKm5nSWY9XCJpdGVtLnRpdGxlXCI+e3sgaXRlbS50aXRsZSB9fTwvc3Ryb25nPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uZGF0ZVwiPlxuICAgICAgICAgICAgICB7eyBpdGVtLmRhdGUgfCBkYXRlIH19XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd1RpbWVcIj4gfCB7eyBpdGVtLmRhdGUgfCBkYXRlOiAnbWVkaXVtVGltZScgfX08L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJpdGVtLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleS1kYXJrXCI+XG4gICAgICAgICAgICA8c3Ryb25nIGNsYXNzPVwiZGVjLWNvbG9yLWJsYWNrXCI+e3sgaXRlbS5kZXNjcmlwdGlvbiB9fTwvc3Ryb25nPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtdGFiLWJvZHktY29udGVudHtwYWRkaW5nOjE2cHggMH0ubWF0LWZvcm0tZmllbGQtcHJlZml4e21hcmdpbi1yaWdodDo4cHghaW1wb3J0YW50fS5tYXQtZm9ybS1maWVsZC1zdWZmaXh7bWFyZ2luLWxlZnQ6OHB4IWltcG9ydGFudH0ubWF0LWVsZXZhdGlvbi16MHtib3gtc2hhZG93OjAgMCAwIDAgcmdiYSgwLDAsMCwuMiksMCAwIDAgMCByZ2JhKDAsMCwwLC4xNCksMCAwIDAgMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejF7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoye2JveC1zaGFkb3c6MCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16M3tib3gtc2hhZG93OjAgM3B4IDNweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgM3B4IDRweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejR7Ym94LXNoYWRvdzowIDJweCA0cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDRweCA1cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMTBweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NXtib3gtc2hhZG93OjAgM3B4IDVweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNXB4IDhweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxNHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo2e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA2cHggMTBweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxOHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo3e2JveC1zaGFkb3c6MCA0cHggNXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCA3cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgMnB4IDE2cHggMXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OHtib3gtc2hhZG93OjAgNXB4IDVweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOHB4IDEwcHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNHB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejl7Ym94LXNoYWRvdzowIDVweCA2cHggLTNweCByZ2JhKDAsMCwwLC4yKSwwIDlweCAxMnB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAzcHggMTZweCAycHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMHtib3gtc2hhZG93OjAgNnB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgMTBweCAxNHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMThweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMXtib3gtc2hhZG93OjAgNnB4IDdweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTFweCAxNXB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMjBweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMntib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTJweCAxN3B4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjJweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxM3tib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTNweCAxOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjRweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNHtib3gtc2hhZG93OjAgN3B4IDlweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTRweCAyMXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjZweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNXtib3gtc2hhZG93OjAgOHB4IDlweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTVweCAyMnB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMjhweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNntib3gtc2hhZG93OjAgOHB4IDEwcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE2cHggMjRweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMwcHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTd7Ym94LXNoYWRvdzowIDhweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxN3B4IDI2cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAzMnB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE4e2JveC1zaGFkb3c6MCA5cHggMTFweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMThweCAyOHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzRweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxOXtib3gtc2hhZG93OjAgOXB4IDEycHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDE5cHggMjlweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgN3B4IDM2cHggNnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjB7Ym94LXNoYWRvdzowIDEwcHggMTNweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjBweCAzMXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggMzhweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMXtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMXB4IDMzcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCA0MHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIye2JveC1zaGFkb3c6MCAxMHB4IDE0cHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIycHggMzVweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQycHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjN7Ym94LXNoYWRvdzowIDExcHggMTRweCAtN3B4IHJnYmEoMCwwLDAsLjIpLDAgMjNweCAzNnB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA5cHggNDRweCA4cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyNHtib3gtc2hhZG93OjAgMTFweCAxNXB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyNHB4IDM4cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NnB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1iYWRnZS1zbWFsbCAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjZweH0ubWF0LWJhZGdlLWxhcmdlIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6MjRweH0ubWF0LWgxLC5tYXQtaGVhZGxpbmUsLm1hdC10eXBvZ3JhcGh5IGgxe2ZvbnQ6NDAwIDI0cHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDIsLm1hdC10aXRsZSwubWF0LXR5cG9ncmFwaHkgaDJ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMywubWF0LXN1YmhlYWRpbmctMiwubWF0LXR5cG9ncmFwaHkgaDN7Zm9udDo0MDAgMTZweC8yOHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNCwubWF0LXN1YmhlYWRpbmctMSwubWF0LXR5cG9ncmFwaHkgaDR7Zm9udDo0MDAgMTVweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgaDV7Zm9udDo0MDAgMTEuNjJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgaDZ7Zm9udDo0MDAgOS4zOHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWJvZHktMiwubWF0LWJvZHktc3Ryb25ne2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5LC5tYXQtYm9keS0xLC5tYXQtdHlwb2dyYXBoeXtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSBwLC5tYXQtYm9keS0xIHAsLm1hdC10eXBvZ3JhcGh5IHB7bWFyZ2luOjAgMCAxMnB4fS5tYXQtY2FwdGlvbiwubWF0LXNtYWxse2ZvbnQ6NDAwIDEycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1kaXNwbGF5LTQsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS00e2ZvbnQ6MzAwIDExMnB4LzExMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDU2cHg7bGV0dGVyLXNwYWNpbmc6LS4wNWVtfS5tYXQtZGlzcGxheS0zLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktM3tmb250OjQwMCA1NnB4LzU2cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAyZW19Lm1hdC1kaXNwbGF5LTIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ye2ZvbnQ6NDAwIDQ1cHgvNDhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDA1ZW19Lm1hdC1kaXNwbGF5LTEsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0xe2ZvbnQ6NDAwIDM0cHgvNDBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4fS5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtZmxhdC1idXR0b24sLm1hdC1pY29uLWJ1dHRvbiwubWF0LW1pbmktZmFiLC5tYXQtcmFpc2VkLWJ1dHRvbiwubWF0LXN0cm9rZWQtYnV0dG9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1idXR0b24tdG9nZ2xlLC5tYXQtY2FyZHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWNhcmQtY29udGVudCwubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZSwubWF0LWNhcmQtc3VidGl0bGV7Zm9udC1zaXplOjE0cHh9Lm1hdC1jaGVja2JveHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jaGVja2JveC1sYXlvdXQgLm1hdC1jaGVja2JveC1sYWJlbHtsaW5lLWhlaWdodDoyNHB4fS5tYXQtY2hpcHtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDoxOHB4fS5tYXQtY2hpcCAubWF0LWNoaXAtcmVtb3ZlLm1hdC1pY29uLC5tYXQtY2hpcCAubWF0LWNoaXAtdHJhaWxpbmctaWNvbi5tYXQtaWNvbntmb250LXNpemU6MThweH0ubWF0LXRhYmxle2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWhlYWRlci1jZWxse2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNlbGwsLm1hdC1mb290ZXItY2VsbHtmb250LXNpemU6MTRweH0ubWF0LWNhbGVuZGFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhbGVuZGFyLWJvZHl7Zm9udC1zaXplOjEzcHh9Lm1hdC1jYWxlbmRhci1ib2R5LWxhYmVsLC5tYXQtY2FsZW5kYXItcGVyaW9kLWJ1dHRvbntmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXIgdGh7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtZGlhbG9nLXRpdGxle2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTVweDtmb250LXdlaWdodDo0MDB9Lm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlO2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjEyNTtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29ue2ZvbnQtc2l6ZToxNTAlO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b257aGVpZ2h0OjEuNWVtO3dpZHRoOjEuNWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbntoZWlnaHQ6MS4xMjVlbTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNWVtIDA7Ym9yZGVyLXRvcDouODQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudH0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlcnt0b3A6LS44NDM3NWVtO3BhZGRpbmctdG9wOi44NDM3NWVtfS5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7Zm9udC1zaXplOjc1JTttYXJnaW4tdG9wOi42NjY2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjc5MTY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi40Mzc1ZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbDotd2Via2l0LWF1dG9maWxsKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIzZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM1JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjI4MTI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye21hcmdpbi10b3A6LjU0MTY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNjY2NjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouMjVlbSAwIC43NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjA5Mzc1ZW07bWFyZ2luLXRvcDotLjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6MWVtIDB9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtb3V0bGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjg0Mzc1ZW07bWFyZ2luLXRvcDotLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyLC5tYXQtZ3JpZC10aWxlLWhlYWRlcntmb250LXNpemU6MTRweH0ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lLC5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTJweH1pbnB1dC5tYXQtaW5wdXQtZWxlbWVudHttYXJnaW4tdG9wOi0uMDYyNWVtfS5tYXQtbWVudS1pdGVte2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1wYWdpbmF0b3IsLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4fS5tYXQtcmFkaW8tYnV0dG9uLC5tYXQtc2VsZWN0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNlbGVjdC10cmlnZ2Vye2hlaWdodDoxLjEyNWVtfS5tYXQtc2xpZGUtdG9nZ2xlLWNvbnRlbnR7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1zdGVwcGVyLWhvcml6b250YWwsLm1hdC1zdGVwcGVyLXZlcnRpY2Fse2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXN0ZXAtbGFiZWx7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtc3RlcC1sYWJlbC1zZWxlY3RlZHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC10YWItZ3JvdXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLWxpbmt7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRvb2xiYXIsLm1hdC10b29sYmFyIGgxLC5tYXQtdG9vbGJhciBoMiwubWF0LXRvb2xiYXIgaDMsLm1hdC10b29sYmFyIGg0LC5tYXQtdG9vbGJhciBoNSwubWF0LXRvb2xiYXIgaDZ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MH0ubWF0LXRvb2x0aXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjZweDtwYWRkaW5nLWJvdHRvbTo2cHh9Lm1hdC10b29sdGlwLWhhbmRzZXR7Zm9udC1zaXplOjE0cHg7cGFkZGluZy10b3A6OXB4O3BhZGRpbmctYm90dG9tOjlweH0ubWF0LWxpc3QtaXRlbSwubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWxpc3QgLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTZweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxNHB4fS5tYXQtbGlzdCAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTJweH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LW9wdGlvbntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHh9Lm1hdC1vcHRncm91cC1sYWJlbHtmb250OjUwMCAxNHB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2ltcGxlLXNuYWNrYmFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweH0ubWF0LXNpbXBsZS1zbmFja2Jhci1hY3Rpb257bGluZS1oZWlnaHQ6MTtmb250LWZhbWlseTppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRyZWV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdHJlZS1ub2Rle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTRweH0ubWF0LXJpcHBsZXtvdmVyZmxvdzpoaWRkZW59QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7Lm1hdC1yaXBwbGV7ZGlzcGxheTpub25lfX0ubWF0LXJpcHBsZS5tYXQtcmlwcGxlLXVuYm91bmRlZHtvdmVyZmxvdzp2aXNpYmxlfS5tYXQtcmlwcGxlLWVsZW1lbnR7cG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyLXJhZGl1czo1MCU7cG9pbnRlci1ldmVudHM6bm9uZTt0cmFuc2l0aW9uOm9wYWNpdHksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7dHJhbnNpdGlvbjpvcGFjaXR5LHRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpLC13ZWJraXQtdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfS5jZGstdmlzdWFsbHktaGlkZGVue2JvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O21hcmdpbjotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MXB4O291dGxpbmU6MDstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXIsLmNkay1vdmVybGF5LWNvbnRhaW5lcntwb2ludGVyLWV2ZW50czpub25lO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1jb250YWluZXI6ZW1wdHl7ZGlzcGxheTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlcntkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1wYW5le3Bvc2l0aW9uOmFic29sdXRlO3BvaW50ZXItZXZlbnRzOmF1dG87Ym94LXNpemluZzpib3JkZXItYm94O3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7bWF4LXdpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlfS5jZGstb3ZlcmxheS1iYWNrZHJvcHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDt6LWluZGV4OjEwMDA7cG9pbnRlci1ldmVudHM6YXV0bzstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7dHJhbnNpdGlvbjpvcGFjaXR5IC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtvcGFjaXR5OjB9LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eToxfUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6LjZ9fS5jZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9we2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMjg4KX0uY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AsLmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTowfS5jZGstb3ZlcmxheS1jb25uZWN0ZWQtcG9zaXRpb24tYm91bmRpbmctYm94e3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21pbi13aWR0aDoxcHg7bWluLWhlaWdodDoxcHh9LmNkay1nbG9iYWwtc2Nyb2xsYmxvY2t7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtvdmVyZmxvdy15OnNjcm9sbH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOi13ZWJraXQtYXV0b2ZpbGx7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOm5vdCg6LXdlYmtpdC1hdXRvZmlsbCl7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZXtyZXNpemU6bm9uZX10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5ne2hlaWdodDphdXRvIWltcG9ydGFudDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3BhZGRpbmc6MnB4IDAhaW1wb3J0YW50O2JveC1zaXppbmc6Y29udGVudC1ib3ghaW1wb3J0YW50fS5oaXN0b3J5LWNvbnRhaW5lcnttYXJnaW46MS41ZW0gMH0uaGlzdG9yeS1jb250YWluZXIubGltaXRlZC1oZWlnaHR7b3ZlcmZsb3cteTphdXRvfS5oaXN0b3J5LWNvbnRhaW5lciAuaGlzdG9yeS1pdGVtOm5vdCg6bGFzdC1jaGlsZCl7cG9zaXRpb246cmVsYXRpdmV9Lmhpc3RvcnktY29udGFpbmVyIC5oaXN0b3J5LWl0ZW06bm90KDpsYXN0LWNoaWxkKTo6YmVmb3Jle2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6M2VtO3dpZHRoOjJweDtiYWNrZ3JvdW5kLWNvbG9yOiM5MTk3OWM7bGVmdDoxMXB4O3RvcDoxNHB4fS5oaXN0b3J5LWNvbnRhaW5lciAuaGlzdG9yeS1pdGVtIC5zbWFsbGVyLWljb257Zm9udC1zaXplOjE2cHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7bWFyZ2luLXRvcDoycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RlcHNMaXN0Q29tcG9uZW50IHtcblxuICBASW5wdXQoKSBpY29uID0gJ2hpc3RvcnknO1xuXG4gIEBJbnB1dCgpIHRpdGxlID0gJyc7XG5cbiAgQElucHV0KCkgc2hvd1RpbWU6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbWF4SGVpZ2h0O1xuXG4gIEBJbnB1dCgpIHN0ZXBzTGlzdDogU3RlcFtdID0gW107XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU3RlcHNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc3RlcHMtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNTdGVwc0xpc3RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjU3RlcHNMaXN0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RlcHNMaXN0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIGZvcndhcmRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc3RyaW5nLWFycmF5LWlucHV0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtb2RlID09ICdpbnB1dCdcIj5cblxuICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgWyhuZ01vZGVsKV09XCJ2YWx1ZUFzU3RyaW5nXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cblxuICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgPHRleHRhcmVhIG1hdElucHV0XG4gICAgW3Jvd3NdPVwicm93c1wiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgWyhuZ01vZGVsKV09XCJ2YWx1ZUFzU3RyaW5nXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgICA8L3RleHRhcmVhPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY1N0cmluZ0FycmF5SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIG5hbWU7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI7XG5cbiAgQElucHV0KCkgbW9kZSA9ICd0ZXh0YXJlYSc7XG5cbiAgQElucHV0KCkgcm93cyA9IDM7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZ1tdIHtcblxuICAgIHJldHVybiB0aGlzLmlubmVyQXJyYXk7XG5cbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IHN0cmluZ1tdKSB7XG5cbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lckFycmF5KSB7XG5cbiAgICAgIHRoaXMuaW5uZXJBcnJheSA9IHY7XG5cbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IHZhbHVlQXNTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLmdldEFycmF5QXNTdHJpbmcoKTtcblxuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWVBc1N0cmluZyh2OiBzdHJpbmcpIHtcblxuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyQXJyYXkpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RyaW5nVG9BcnJheSh2KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lckFycmF5OiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIC8vXG4gIGdldEFycmF5QXNTdHJpbmcoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5hcnJheVRvU3RyaW5nKHRoaXMudmFsdWUpO1xuXG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmdbXSkge1xuXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgIH1cblxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdHJpbmdUb0FycmF5KHN0cmluZ09mQXJyYXk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBpZiAoc3RyaW5nT2ZBcnJheSkge1xuXG4gICAgICBjb25zdCByZWdFeHAgPSAvW14sXFxzXVteLFxcc10qW14sXFxzXSovZztcblxuICAgICAgcmV0dXJuIHN0cmluZ09mQXJyYXkubWF0Y2gocmVnRXhwKTtcblxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXJyYXlUb1N0cmluZyhhcnJheU9mc3RyaW5nOiBzdHJpbmdbXSk6IHN0cmluZyB7XG5cbiAgICBpZiAoYXJyYXlPZnN0cmluZykge1xuXG4gICAgICByZXR1cm4gYXJyYXlPZnN0cmluZy5qb2luKCcsICcpO1xuXG4gICAgfVxuXG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc3RyaW5nLWFycmF5LWlucHV0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RyaW5nQXJyYXlJbnB1dE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXRhYicsXG4gIHRlbXBsYXRlOiBgYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRvdGFsOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgY29udGVudDogVGVtcGxhdGVSZWY8RGVjVGFiQ29tcG9uZW50PjtcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZW5zdXJlVGFiTmFtZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVUYWJOYW1lID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlY1RhYkNvbXBvbmVudEVycm9yOiBUaGUgPGRlYy10YWI+IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50LicpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy10YWItbWVudScsXG4gIHRlbXBsYXRlOiBgPHA+XG4gIHRhYi1tZW51IHdvcmtzIVxuPC9wPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYk1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGFjdGl2ZVRhYjogc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPERlY1RhYk1lbnVDb21wb25lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi90YWIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1RhYk1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RhYi1tZW51L3RhYi1tZW51LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy10YWJzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiIWhpZGRlblwiPlxuXG4gIDwhLS0gVEFCUyAtLT5cbiAgPG1hdC10YWItZ3JvdXAgW3NlbGVjdGVkSW5kZXhdPVwiYWN0aXZlVGFiSW5kZXhcIiAoZm9jdXNDaGFuZ2UpPVwib25DaGFuZ2VUYWIoJGV2ZW50KVwiIFtkeW5hbWljSGVpZ2h0XT1cInRydWVcIj5cblxuICAgIDwhLS0gVEFCIC0tPlxuICAgIDxtYXQtdGFiICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFicztcIiBbZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCI+XG5cbiAgICAgIDwhLS0gVEFCIExBQkVMIC0tPlxuICAgICAgPG5nLXRlbXBsYXRlIG1hdC10YWItbGFiZWw+XG4gICAgICAgIHt7IHRhYi5sYWJlbCB9fVxuICAgICAgICA8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2Utc21hbGxcIiAqbmdJZj1cInRhYi50b3RhbCA+PSAwXCI+e3sgcGFyc2VUb3RhbCh0YWIudG90YWwpIH19PC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPCEtLSBUQUIgQ09OVEVOVCBXUkFQUEVSIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3VsVGFiQmVEaXNwbGF5ZWQodGFiKVwiPlxuXG4gICAgICAgIDwhLS0gVEFCIE1FTlUgLS0+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0YWJNZW51Q29tcG9uZW50XCIgY2xhc3M9XCJtZW51LXdyYXBwZXJcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiTWVudUNvbXBvbmVudC5jb250ZW50OyBjb250ZXh0OiB7IGFjdGl2ZVRhYjogYWN0aXZlVGFiIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBUQUJTIENPTlRFTlQgLS0+XG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd0YWItcGFkZGluZyc6IHBhZGRpbmd9XCI+XG5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8L21hdC10YWI+XG5cbiAgPC9tYXQtdGFiLWdyb3VwPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubWVudS13cmFwcGVye3RleHQtYWxpZ246cmlnaHQ7cGFkZGluZzo4cHggMH0udGFiLXBhZGRpbmd7cGFkZGluZzoxNnB4IDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBAQ29udGVudENoaWxkcmVuKERlY1RhYkNvbXBvbmVudCkgdGFiczogUXVlcnlMaXN0PERlY1RhYkNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZChEZWNUYWJNZW51Q29tcG9uZW50KSB0YWJNZW51Q29tcG9uZW50OiBEZWNUYWJNZW51Q29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIGhpZGRlbjsgLy8gaGlkZXMgdGhlIHRhYnMgZ3JvdXAgdG8gcmVsb2FkIGl0cyBjb250ZW50c1xuXG4gIEBJbnB1dCgpIHBlcnNpc3QgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkJsdXIgPSBmYWxzZTtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGFkZGluZyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IGFjdGl2ZVRhYih2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAmJiB0aGlzLl9hY3RpdmVUYWIgIT09IHYpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IHY7XG4gICAgICB0aGlzLnBlcnNpc3RUYWIodik7XG4gICAgfVxuICB9XG4gIGdldCBhY3RpdmVUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYjtcbiAgfVxuXG4gIEBPdXRwdXQoKSBhY3RpdmVUYWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgZ2V0IGFjdGl2ZVRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYkluZGV4O1xuICB9XG5cbiAgZ2V0IGFjdGl2ZVRhYk9iamVjdCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVUYWJPYmplY3Q7XG4gIH1cblxuICBwcml2YXRlIF9hY3RpdmVUYWI6IHN0cmluZztcblxuICBwcml2YXRlIF9hY3RpdmVUYWJJbmRleDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYk9iamVjdDogYW55O1xuXG4gIHByaXZhdGUgYWN0aXZhdGVkVGFiczogYW55ID0ge307XG5cbiAgcHJpdmF0ZSBxdWVyeVBhcmFtc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgcGF0aEZyb21Sb290ID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5lbnN1cmVVbmlxdWVOYW1lKCk7XG4gICAgdGhpcy53YXRjaFRhYkluVXJsUXVlcnkoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZVRhYk5hbWVzKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG4gICAgICBpZiAocXVlcnlQYXJhbXMgJiYgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUYWIgPSBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV07XG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKGN1cnJlbnRUYWIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGFydFNlbGVjdGVkVGFiKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgc2hvdWxUYWJCZURpc3BsYXllZCh0YWIpIHtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gdGhpcy5fYWN0aXZlVGFiT2JqZWN0ID09PSB0YWI7XG4gICAgY29uc3QgaXNBY3RpdmF0ZWQgPSB0aGlzLmFjdGl2YXRlZFRhYnNbdGFiLm5hbWVdO1xuICAgIHJldHVybiBpc1NlbGVjdGVkIHx8ICghdGhpcy5kZXN0cm95T25CbHVyICYmIGlzQWN0aXZhdGVkKTtcbiAgfVxuXG4gIG9uQ2hhbmdlVGFiKCRldmVudCkge1xuICAgIGNvbnN0IGFjdGl2ZVRhYk9iamVjdCA9IHRoaXMudGFicy50b0FycmF5KClbJGV2ZW50LmluZGV4XTtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IGFjdGl2ZVRhYk9iamVjdC5uYW1lO1xuICB9XG5cbiAgcGFyc2VUb3RhbCh0b3RhbCkge1xuXG4gICAgcmV0dXJuIHRvdGFsICE9PSBudWxsICYmIHRvdGFsID49IDAgPyAgdG90YWwgOiAnPyc7XG5cbiAgfVxuXG4gIHJlc2V0KCkge1xuXG4gICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG5cbiAgICB9LCAxMCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgY29tcG9uZW50VGFiTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy10YWInO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVOYW1lID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlY1RhYkNvbXBvbmVudEVycm9yOiBUaGUgdGFiIGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGVuc3VyZVVuaXF1ZVRhYk5hbWVzXG4gICAqIFRoaXMgbWV0aG9kIHByZXZlbnRzIHRoZSB1c2Ugb2YgdGhlIHNhbWUgbmFtZSBmb3IgbW9yZSB0aGFuIG9uZSB0YWJcbiAgICogd2hhdCB3b3VsZCBlbmRpbmcgdXAgY29uZmxpY3RpbmcgdGhlIHRhYnMgYWN0aXZhdGlvbiBvbmNlIHRoaXMgaXMgZG9uZSB2aWEgdGFiIG5hbWVcbiAgKi9cblxuICBwcml2YXRlIGVuc3VyZVVuaXF1ZVRhYk5hbWVzID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXMsIHJlaikgPT4ge1xuICAgICAgY29uc3QgbmFtZXMgPSB7fTtcbiAgICAgIHRoaXMudGFicy50b0FycmF5KCkuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgICBpZiAoIW5hbWVzW3RhYi5uYW1lXSkge1xuICAgICAgICAgIG5hbWVzW3RhYi5uYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSA8ZGVjLXRhYnM+IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFRoZSBuYW1lICR7dGFiLm5hbWV9IHdhcyB1c2VkIG1vcmUgdGhhbiBvbmNlLmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJzaXN0VGFiKHRhYikge1xuICAgIGlmICh0aGlzLnBlcnNpc3QpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgICAgIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXSA9IHRhYjtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLiddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcywgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdFRhYiA9ICh0YWJOYW1lKSA9PiB7XG4gICAgaWYgKHRoaXMudGFicykge1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWJOYW1lO1xuICAgICAgdGhpcy5hY3RpdmF0ZWRUYWJzW3RhYk5hbWVdID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYk9iamVjdCA9IHRoaXMudGFicy50b0FycmF5KCkuZmlsdGVyKHRhYiA9PiB0YWIubmFtZSA9PT0gdGFiTmFtZSlbMF07XG4gICAgICB0aGlzLl9hY3RpdmVUYWJJbmRleCA9IHRoaXMudGFicy50b0FycmF5KCkuaW5kZXhPZih0aGlzLl9hY3RpdmVUYWJPYmplY3QpO1xuICAgICAgdGhpcy5hY3RpdmVUYWJDaGFuZ2UuZW1pdCh0YWJOYW1lKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0U2VsZWN0ZWRUYWIoKSB7XG4gICAgY29uc3QgYWN0aXZlVGFiID0gdGhpcy5hY3RpdmVUYWIgfHwgdGhpcy50YWJzLnRvQXJyYXkoKVswXS5uYW1lO1xuICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBhdm9pZCBjaGFuZ2UgYWZ0ZXIgY29tcG9uZW50IGNoZWNrZWQgZXJyb3JcbiAgICAgIHRoaXMuc2VsZWN0VGFiKGFjdGl2ZVRhYik7XG4gICAgfSwgMSk7XG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFiSW5VcmxRdWVyeSgpIHtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtc1xuICAgIC5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuICAgICAgY29uc3QgdGFiOiBzdHJpbmcgPSBwYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldO1xuICAgICAgdGhpcy5zZWxlY3RUYWIodGFiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpIHtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY1RhYkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNUYWJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNUYWJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNUYWJzQ29tcG9uZW50IH0gZnJvbSAnLi90YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNUYWJNb2R1bGUgfSBmcm9tICcuL3RhYi90YWIubW9kdWxlJztcbmltcG9ydCB7IERlY1RhYk1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RhYi1tZW51L3RhYi1tZW51LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBEZWNUYWJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjVGFic0NvbXBvbmVudCwgRGVjVGFiTWVudUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNUYWJzQ29tcG9uZW50LFxuICAgIERlY1RhYk1lbnVDb21wb25lbnQsXG4gICAgRGVjVGFiTW9kdWxlXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYnNNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFdmVudFR5cGUsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBVcGxvYWRQcm9ncmVzcyB9IGZyb20gJy4vdXBsb2FkLm1vZGVscyc7XG5cbmNvbnN0IFVQTE9BRF9FTkRQT0lOVCA9ICcvdXBsb2FkJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5leHBvcnQgY29uc3QgREVDX1VQTE9BRF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNVcGxvYWRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXVwbG9hZCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiKHByb2dyZXNzZXMgJiYgcHJvZ3Jlc3Nlcy5sZW5ndGgpID8gdHJ1ZSA6IGZhbHNlXCI+XG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgPHNwYW4gKGNsaWNrKT1cIm9wZW5GaWxlU2VsZWN0aW9uKClcIiBjbGFzcz1cImNsaWNrXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHVwbG9hZFByb2dyZXNzIG9mIHByb2dyZXNzZXNcIiBjbGFzcz1cImRlYy11cGxvYWQtcHJvZ3Jlc3Mtd3JhcHBlclwiPlxuICAgICAgPG1hdC1wcm9ncmVzcy1iYXJcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgW21vZGVdPVwiZ2V0UHJvZ3Jlc3NiYXJNb2RlKHVwbG9hZFByb2dyZXNzKVwiXG4gICAgICAgIFt2YWx1ZV09XCJnZXRQcm9ncmVzc1ZhbHVlQmFzZWRPbk1vZGUodXBsb2FkUHJvZ3Jlc3MpXCI+XG4gICAgICA8L21hdC1wcm9ncmVzcy1iYXI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgPHNtYWxsPlxuICAgICAgICAgIHt7IHVwbG9hZFByb2dyZXNzLnZhbHVlIH19JSAtIHt7IHVwbG9hZFByb2dyZXNzLmZpbGVOYW1lIH19XG4gICAgICAgIDwvc21hbGw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cblxuXG48aW5wdXQgdHlwZT1cImZpbGVcIiAjaW5wdXRGaWxlIChjaGFuZ2UpPVwiZmlsZXNDaGFuZ2VkKCRldmVudClcIiBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cblxuYCxcbiAgc3R5bGVzOiBbYC5jbGlja3tjdXJzb3I6cG9pbnRlcn1pbnB1dHtkaXNwbGF5Om5vbmV9LnRleHQtY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5kZWMtdXBsb2FkLXByb2dyZXNzLXdyYXBwZXJ7cGFkZGluZzo4cHggMH1gXSxcbiAgcHJvdmlkZXJzOiBbREVDX1VQTE9BRF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgcHJvZ3Jlc3NlczogVXBsb2FkUHJvZ3Jlc3NbXSA9IFtdO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdXBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpIHByb2dyZXNzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0RmlsZScpIGlucHV0RmlsZTogRWxlbWVudFJlZjtcblxuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55W107XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZSkge31cblxuICAvKlxuICAqKiBuZ01vZGVsIFZBTFVFXG4gICovXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2OiBhbnlbXSkge1xuICAgIHRoaXMudmFsdWUgPSB2O1xuICB9XG5cblxuICBmaWxlc0NoYW5nZWQoZXZlbnQpIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGV2ZW50LnRhcmdldC5maWxlcy5sZW5ndGg7IHgrKykge1xuICAgICAgdGhpcy51cGxvYWRGaWxlKGV2ZW50LnRhcmdldC5maWxlc1t4XSwgeCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkZpbGVTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5pbnB1dEZpbGUubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG5cbiAgZ2V0UHJvZ3Jlc3NiYXJNb2RlKHByb2dyZXNzKSB7XG5cbiAgICBsZXQgbW9kZTtcblxuICAgIHN3aXRjaCAocHJvZ3Jlc3MudmFsdWUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbW9kZSA9ICdidWZmZXInO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTAwOlxuICAgICAgICBtb2RlID0gJ2luZGV0ZXJtaW5hdGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gbW9kZTtcblxuICB9XG5cbiAgZ2V0UHJvZ3Jlc3NWYWx1ZUJhc2VkT25Nb2RlKHByb2dyZXNzKSB7XG4gICAgY29uc3QgbW9kZSA9IHRoaXMuZ2V0UHJvZ3Jlc3NiYXJNb2RlKHByb2dyZXNzKTtcbiAgICBjb25zdCB2YWx1ZSA9IG1vZGUgPT09ICdidWZmZXInID8gMCA6IHByb2dyZXNzLnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBsb2FkRmlsZShmaWxlLCBpbmRleCkge1xuICAgIGlmIChmaWxlKSB7XG4gICAgICBjb25zdCBwcm9ncmVzczogVXBsb2FkUHJvZ3Jlc3MgPSB7XG4gICAgICAgIGZpbGVJbmRleDogaW5kZXgsXG4gICAgICAgIGZpbGVOYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgIHZhbHVlOiAwLFxuICAgICAgfTtcbiAgICAgIHRoaXMucHJvZ3Jlc3Nlcy5wdXNoKHByb2dyZXNzKTtcbiAgICAgIHRoaXMuc2VydmljZS51cGxvYWQoVVBMT0FEX0VORFBPSU5ULCBbZmlsZV0pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjYXRjaEVycm9yJywgZXJyb3IpO1xuICAgICAgICAgIHByb2dyZXNzLmVycm9yID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoJ21lc3NhZ2UuZXJyb3IudW5leHBlY3RlZCcpO1xuICAgICAgICAgIHRoaXMuZGV0ZWN0VXBsb2FkRW5kKCk7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgICBjb25zdCBwZXJjZW50RG9uZSA9IE1hdGgucm91bmQoKDEwMCAqIGV2ZW50LmxvYWRlZCkgLyBldmVudC50b3RhbCk7XG4gICAgICAgICAgcHJvZ3Jlc3MudmFsdWUgPSBwZXJjZW50RG9uZSA9PT0gMTAwID8gcGVyY2VudERvbmUgOiBwYXJzZUZsb2F0KHBlcmNlbnREb25lLnRvRml4ZWQoMikpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgcHJvZ3Jlc3MudmFsdWUgPSAxMDA7XG4gICAgICAgICAgcHJvZ3Jlc3MuZmlsZSA9IGV2ZW50LmJvZHk7XG4gICAgICAgICAgdGhpcy5kZXRlY3RVcGxvYWRFbmQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb2dyZXNzLmVtaXQodGhpcy5wcm9ncmVzc2VzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0VXBsb2FkRW5kKCkge1xuXG4gICAgY29uc3Qgc3RpbGxVcGxvYWRpbmcgPSB0aGlzLnByb2dyZXNzZXMuZmlsdGVyKChwcm9ncmVzcykgPT4ge1xuICAgICAgcmV0dXJuIHByb2dyZXNzLnZhbHVlIDwgMTAwO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzdGlsbFVwbG9hZGluZy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZW1pdFVwbG9hZGVkRmlsZXMoKTtcbiAgICAgIHRoaXMuY2xlYXJJbnB1dEZpbGUoKTtcbiAgICAgIHRoaXMuY2xlYXJQcm9ncmVzc2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcklucHV0RmlsZSgpIHtcbiAgICB0aGlzLmlucHV0RmlsZS5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyUHJvZ3Jlc3NlcygpIHtcbiAgICB0aGlzLnByb2dyZXNzZXMgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdFVwbG9hZGVkRmlsZXMoKSB7XG4gICAgY29uc3QgZmlsZXMgPSB0aGlzLnByb2dyZXNzZXMubWFwKCh1cGxvYWRQcm9ncmVzczogVXBsb2FkUHJvZ3Jlc3MpID0+IHtcbiAgICAgIHJldHVybiB1cGxvYWRQcm9ncmVzcy5maWxlO1xuICAgIH0pO1xuICAgIHRoaXMudmFsdWUgPSBbLi4uZmlsZXNdO1xuICAgIHRoaXMudXBsb2FkZWQuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjVXBsb2FkQ29tcG9uZW50IH0gZnJvbSAnLi91cGxvYWQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjVXBsb2FkQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNVcGxvYWRDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNVcGxvYWRNb2R1bGUge31cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkLCBDYW5Mb2FkLCBSb3V0ZSwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjQXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuTG9hZCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlXG4gICkge31cblxuICBjYW5Mb2FkKHJvdXRlOiBSb3V0ZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzQXV0aGVudGljYXRlZCgpO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZUNoaWxkKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzQXV0aGVudGljYXRlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0F1dGhlbnRpY2F0ZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuZGVjb3JhQXBpLnVzZXIkXG4gICAgLnBpcGUoXG4gICAgICBtYXAoKHVzZXI6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gKHVzZXIgJiYgdXNlci5pZCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9KVxuICAgICkgYXMgT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dGhHdWFyZCB9IGZyb20gJy4vYXV0aC1ndWFyZC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNBdXRoR3VhcmRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHdWFyZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IERlY0FwcEluaXRpYWxpemVyID0gKGRlY0NvbmZpZzogRGVjQ29uZmlndXJhdGlvblNlcnZpY2UsIGRlY0FwaTogRGVjQXBpU2VydmljZSkgPT4ge1xuXG4gIHJldHVybiAoKSA9PiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBkZWNDb25maWcubG9hZENvbmZpZygpLnRoZW4oKGNvbmZpZ3VyYXRpb24pID0+IHtcblxuICAgICAgICBkZWNBcGkuaGFuZFNoYWtlKCkudGhlbigoYWNjb3VudCkgPT4ge1xuXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgYWNjb3VudCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9O1xuXG59O1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTbmFja0JhclNlcnZpY2UgfSBmcm9tICcuL2RlYy1zbmFjay1iYXIuc2VydmljZSc7XG5pbXBvcnQgeyBNYXRTbmFja0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNTbmFja0JhclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTbmFja0Jhck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBTa2lwU2VsZiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRGVjU25hY2tCYXJNb2R1bGUgfSBmcm9tICcuLy4uL3NuYWNrLWJhci9kZWMtc25hY2stYmFyLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgRGVjU25hY2tCYXJNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY0FwaVNlcnZpY2UsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXBpTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBEZWNBcGlNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdEZWNBcGlNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpdCBpbiB0aGUgQXBwTW9kdWxlIG9ubHknKTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBVc2VyQXV0aERhdGEge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIGVtYWlsOiBzdHJpbmc7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBjb3VudHJ5OiBzdHJpbmc7XG4gIHB1YmxpYyBjb21wYW55OiBzdHJpbmc7XG4gIHB1YmxpYyByb2xlOiBudW1iZXI7XG4gIHB1YmxpYyBwZXJtaXNzaW9uczogQXJyYXk8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3Rvcih1c2VyOiBhbnkgPSB7fSkge1xuICAgIHRoaXMuaWQgPSB1c2VyLmlkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmVtYWlsID0gdXNlci5lbWFpbCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5uYW1lID0gdXNlci5uYW1lIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvdW50cnkgPSB1c2VyLmNvdW50cnkgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuY29tcGFueSA9IHVzZXIuY29tcGFueSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5yb2xlID0gdXNlci5yb2xlIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBlcm1pc3Npb25zID0gdXNlci5wZXJtaXNzaW9ucyB8fCB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2dpbkRhdGEge1xuICBlbWFpbDogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xuICBrZWVwTG9nZ2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2Vib29rTG9naW5EYXRhIHtcbiAga2VlcExvZ2dlZDogYm9vbGVhbjtcbiAgZmFjZWJvb2tUb2tlbjogc3RyaW5nO1xufVxuXG4vKlxuICAqIEZpbHRlckdyb3Vwc1xuICAqXG4gICogYW4gQXJyYXkgb2YgZmlsdGVyIGdyb3VwXG4gICovXG5leHBvcnQgdHlwZSBGaWx0ZXJHcm91cHMgPSBGaWx0ZXJHcm91cFtdO1xuXG4vKlxuICAqIEZpbHRlcnNcbiAgKlxuICAqIGFuIEFycmF5IG9mIGZpbHRlclxuICAqL1xuZXhwb3J0IHR5cGUgRmlsdGVycyA9IEZpbHRlcltdO1xuXG4vKlxuICAqIEZpbHRlckRhdGFcbiAgKlxuICAqIEZpbHRlciBjb25maWd1cmF0aW9uXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckRhdGEge1xuICBlbmRwb2ludDogc3RyaW5nO1xuICBwYXlsb2FkOiBEZWNGaWx0ZXI7XG4gIGNiaz86IEZ1bmN0aW9uO1xuICBjbGVhcj86IGJvb2xlYW47XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNGaWx0ZXIge1xuICBmaWx0ZXJHcm91cHM/OiBGaWx0ZXJHcm91cHM7XG4gIHByb2plY3RWaWV3PzogYW55O1xuICBzb3J0PzogYW55O1xuICBwYWdlPzogbnVtYmVyO1xuICBsaW1pdD86IG51bWJlcjtcbiAgdGV4dFNlYXJjaD86IHN0cmluZztcbn1cblxuLypcbiAgKiBGaWx0ZXJcbiAgKlxuICAqIEZpbHRlciBjb25maWd1cmF0aW9uXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIFNlcmlhbGl6ZWREZWNGaWx0ZXIge1xuICBmaWx0ZXI/OiBzdHJpbmc7XG4gIHByb2plY3RWaWV3Pzogc3RyaW5nO1xuICBzb3J0Pzogc3RyaW5nO1xuICBwYWdlPzogbnVtYmVyO1xuICBsaW1pdD86IG51bWJlcjtcbiAgdGV4dFNlYXJjaD86IHN0cmluZztcbn1cblxuLypcbiAgKiBGaWx0ZXJcbiAgKlxuICAqIFNpZ25sZSBmaWx0ZXJcbiAgKi9cbmV4cG9ydCBjbGFzcyBGaWx0ZXIge1xuICBwcm9wZXJ0eTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoZGF0YTogYW55ID0ge30pIHtcbiAgICB0aGlzLnByb3BlcnR5ID0gZGF0YS5wcm9wZXJ0eTtcbiAgICB0aGlzLnZhbHVlID0gQXJyYXkuaXNBcnJheShkYXRhLnByb3BlcnR5KSA/IGRhdGEucHJvcGVydHkgOiBbZGF0YS5wcm9wZXJ0eV07XG4gIH1cbn1cblxuLypcbiAgKiBGaWx0ZXJHcm91cFxuICAqXG4gICogR3JvdXAgb2YgRmlsdGVyXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckdyb3VwIHtcbiAgZmlsdGVyczogRmlsdGVycztcbn1cblxuLypcbiAgKiBDb2x1bW5zU29ydENvbmZpZ1xuICAqXG4gICogQ29uZmlndXJhdGlvbiB0byBzb3J0IHNvcnRcbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uc1NvcnRDb25maWcge1xuICBwcm9wZXJ0eTogc3RyaW5nO1xuICBvcmRlcjoge1xuICAgIHR5cGU6ICdhc2MnIHwgJ2Rlc2MnXG4gIH07XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgSW5qZWN0aW9uVG9rZW4sIFNraXBTZWxmLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLXNlcnZpY2UubW9kZWxzJztcblxuZXhwb3J0IGNvbnN0IERFQ09SQV9DT05GSUdVUkFUSU9OX1NFUlZJQ0VfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPERlY0NvbmZpZ3VyYXRpb25Gb3JSb290Q29uZmlnPignREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUcnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEluaXREZWNDb25maWd1cmF0aW9uU2VydmljZShodHRwOiBIdHRwQ2xpZW50LCBzZXJ2aWNlQ29uZmlnOiBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZykge1xuICByZXR1cm4gbmV3IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlKGh0dHAsIHNlcnZpY2VDb25maWcpO1xufVxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQ29uZmlndXJhdGlvbk1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBEZWNDb25maWd1cmF0aW9uTW9kdWxlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZWNDb25maWd1cmF0aW9uTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBEZWNDb25maWd1cmF0aW9uRm9yUm9vdENvbmZpZykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEZWNDb25maWd1cmF0aW9uTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IEluaXREZWNDb25maWd1cmF0aW9uU2VydmljZSxcbiAgICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgREVDT1JBX0NPTkZJR1VSQVRJT05fU0VSVklDRV9DT05GSUddXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCwgUm91dGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBvZiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25HdWFyZCBpbXBsZW1lbnRzIENhbkxvYWQsIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XG5cbiAgY2FuTG9hZChyb3V0ZTogUm91dGUpIHtcbiAgICBpZiAocm91dGUuZGF0YSAmJiAhcm91dGUuZGF0YS5wZXJtaXNzaW9ucykge1xuICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcm1pc3Npb25zID0gcm91dGUuZGF0YS5wZXJtaXNzaW9ucztcbiAgICByZXR1cm4gdGhpcy5oYXNBY2Nlc3MocGVybWlzc2lvbnMpO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgaWYgKHJvdXRlLmRhdGEgJiYgIXJvdXRlLmRhdGEucGVybWlzc2lvbnMpIHtcbiAgICAgIHRoaXMubm90QWxsb3dlZCgpO1xuICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJtaXNzaW9ucyA9IHJvdXRlLmRhdGEucGVybWlzc2lvbnM7XG4gICAgcmV0dXJuIHRoaXMuaGFzQWNjZXNzKHBlcm1pc3Npb25zKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FuQWN0aXZhdGUocm91dGUsIHN0YXRlKTtcbiAgfVxuXG4gIG5vdEFsbG93ZWQoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZm9yYmlkZW4nXSk7XG4gIH1cblxuICBoYXNBY2Nlc3MocGVybWlzc2lvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkudXNlciRcbiAgICAucGlwZShcbiAgICAgIG1hcCh1c2VyID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICBjb25zdCBhbGxvd2VkID0gdGhpcy5pc0FsbG93ZWRBY2Nlc3ModXNlci5wZXJtaXNzaW9ucywgcGVybWlzc2lvbnMpO1xuICAgICAgICAgIGlmICghYWxsb3dlZCkge1xuICAgICAgICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FsbG93ZWRBY2Nlc3ModXNlclBlcm1pc3Npb25zOiBzdHJpbmdbXSwgY3VycmVudFBlcm1pc3Npb25zOiBzdHJpbmdbXSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXRjaGluZ1JvbGUgPSBjdXJyZW50UGVybWlzc2lvbnMuZmluZCgodXNlclJvbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHVzZXJQZXJtaXNzaW9ucy5maW5kKChhbG93ZWRSb2xlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGFsb3dlZFJvbGUgPT09IHVzZXJSb2xlO1xuICAgICAgICB9KSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoaW5nUm9sZSA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1Blcm1pc3Npb25HdWFyZCB9IGZyb20gJy4vZGVjLXBlcm1pc3Npb24tZ3VhcmQuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNQZXJtaXNzaW9uR3VhcmRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQZXJtaXNzaW9uR3VhcmRNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9wZW5Db25uZWN0aW9uIH0gZnJvbSAnLi93cy1jbGllbnQubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY1dzQ2xpZW50U2VydmljZSB7XG5cbiAgcHJpdmF0ZSBjb25uZWN0aW9uOiB7XG4gICAgW2tleTogc3RyaW5nXTogT3BlbkNvbm5lY3Rpb25cbiAgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjb25uZWN0KHVybCkge1xuXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvblt1cmxdO1xuXG4gICAgaWYgKGNvbm5lY3Rpb24pIHtcblxuICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5jb25uZWN0VG9Xcyh1cmwpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGNvbm5lY3RUb1dzKHVybCk6IE9wZW5Db25uZWN0aW9uIHtcblxuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSB0aGlzLm9wZW5Db25uZWN0aW9uKHVybCk7XG5cbiAgICB0aGlzLmNvbm5lY3Rpb25bdXJsXSA9IGNvbm5lY3Rpb247XG5cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcblxuICB9XG5cblxuICBwcml2YXRlIG9wZW5Db25uZWN0aW9uKHVybDogc3RyaW5nLCBjb25uZWN0aW9uPzogT3BlbkNvbm5lY3Rpb24pOiBPcGVuQ29ubmVjdGlvbiB7XG5cbiAgICBpZiAoY29ubmVjdGlvbikge1xuXG4gICAgICBjb25uZWN0aW9uLmNoYW5uZWwgPSBuZXcgV2ViU29ja2V0KHVybCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25uZWN0aW9uID0gY29ubmVjdGlvbiA/IGNvbm5lY3Rpb24gOiB7XG4gICAgICAgIGNoYW5uZWw6IG5ldyBXZWJTb2NrZXQodXJsKSxcbiAgICAgICAgbWVzc2FnZXM6IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKSxcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICBjb25uZWN0aW9uLmNoYW5uZWwub25jbG9zZSA9ICgpID0+IHRoaXMub3BlbkNvbm5lY3Rpb24odXJsLCBjb25uZWN0aW9uKTtcblxuICAgIGNvbm5lY3Rpb24uY2hhbm5lbC5vbmVycm9yID0gKCkgPT4gdGhpcy5vcGVuQ29ubmVjdGlvbih1cmwsIGNvbm5lY3Rpb24pO1xuXG4gICAgY29ubmVjdGlvbi5jaGFubmVsLm9ubWVzc2FnZSA9IChhKSA9PiB7XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlcyA9IGNvbm5lY3Rpb24ubWVzc2FnZXMuZ2V0VmFsdWUoKTtcblxuICAgICAgY3VycmVudE1lc3NhZ2VzLnVuc2hpZnQoYS5kYXRhKTtcblxuICAgICAgY29ubmVjdGlvbi5tZXNzYWdlcy5uZXh0KGN1cnJlbnRNZXNzYWdlcyk7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1dzQ2xpZW50U2VydmljZSB9IGZyb20gJy4vd3MtY2xpZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1dzQ2xpZW50U2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1dzQ2xpZW50TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbImZpbHRlciIsIm5vb3AiLCJBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7SUFZRSxZQUFtQixlQUE0QixFQUNyQztRQURTLG9CQUFlLEdBQWYsZUFBZSxDQUFhO1FBQ3JDLGNBQVMsR0FBVCxTQUFTO0tBQXVCOzs7Ozs7O0lBRTFDLElBQUksQ0FBQyxP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RSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0NBQWtDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtDQUFrQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDhDQUE4QyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsbUNBQW1DLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdDQUFnQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMkJBQTJCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDJCQUEyQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsNkJBQTZCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsc0NBQXNDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtDQUFrQyxFQUFFLEVBQUUsRUFB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