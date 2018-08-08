import { Injectable, Component, Input, ContentChild, TemplateRef, EventEmitter, Output, NgModule, ViewChild, forwardRef, ComponentFactoryResolver, ViewContainerRef, ContentChildren, HostListener, Renderer, ElementRef, Directive, Inject, Optional, InjectionToken, defineInjectable, inject } from '@angular/core';
import { MatSnackBar, MatAutocompleteTrigger, MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogRef, MatDialog, MatDialogModule, MatToolbarModule, MatMenuModule, MatChipsModule, MatCardModule, MatSnackBarModule, MatExpansionModule, MatTooltipModule, MatSidenavModule, MatListModule, MatProgressBarModule, MatTabsModule } from '@angular/material';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatSnackBar as MatSnackBar$1 } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, of, noop, Subject } from 'rxjs';
import { catchError, share, tap, debounceTime, distinctUntilChanged, switchMap, startWith, map, filter } from 'rxjs/operators';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, PlatformLocation } from '@angular/common';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
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
class DecApiService {
    /**
     * @param {?} http
     * @param {?} snackbar
     * @param {?} config
     */
    constructor(http, snackbar, config) {
        this.http = http;
        this.snackbar = snackbar;
        this.config = config;
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
                    if (this.config.authHost) {
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
        this.tryToLoadSignedInUser();
    }
    /**
     * @return {?}
     */
    get host() {
        return this.config.host;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeToUser();
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
            if (filter$$1.columns) {
                serializedFilter.columns = filter$$1.columns;
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
        const /** @type {?} */ nakedAuthDomain = this.config.authHost.split('?')[0]
            .replace('https://', '')
            .replace('http://', '')
            .replace('//', '');
        if (nakedAppDomain !== nakedAuthDomain) {
            const /** @type {?} */ authUrlWithRedirect = `${this.config.authHost}${this.getParamsDivider()}redirectUrl=${window.location.href}`;
            console.log(`DecApiService:: Not authenticated. Redirecting to login page at: ${authUrlWithRedirect}`);
            window.location.href = authUrlWithRedirect;
        }
    }
    /**
     * @return {?}
     */
    getParamsDivider() {
        return this.config.authHost.split('?').length > 1 ? '&' : '?';
    }
    /**
     * @return {?}
     */
    tryToLoadSignedInUser() {
        this.fetchCurrentLoggedUser()
            .toPromise()
            .then(res => {
            console.log('DecoraApiService:: Started as logged');
        }, err => {
            if (err.status === 401) {
                console.log('DecoraApiService:: Started as not logged');
            }
            else {
                console.error('DecoraApiService:: Initialization Error. Could retrieve user account', err);
            }
        });
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
        const /** @type {?} */ basePath = this.config.useMockApi ? this.config.mockApiHost : this.config.host;
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
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['DECORA_API_SERVICE_CONFIG',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop$1 = () => {
};
//  Used to extend ngForms functions
const /** @type {?} */ AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteComponent),
    multi: true
};
class DecAutocompleteComponent {
    /**
     * @param {?} formBuilder
     * @param {?} service
     */
    constructor(formBuilder, service) {
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
            this.subscribeToOptions();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeToOptions();
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
     * @param {?} v
     * @return {?}
     */
    writeValue(v) {
        this.writtenValue = v;
        v = v ? v : undefined; // avoid null values
        const /** @type {?} */ hasDifference = !this.compareAsString(v, this.value);
        if (hasDifference) {
            this.loadRemoteObjectByWrittenValue(v)
                .then((options) => {
                this.setInnerValue(v);
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
                filteredOptions: this.filteredOptions,
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
     * @return {?}
     */
    subscribeToOptions() {
        this.options$Subscription = this.options$.subscribe(options => {
            this.filteredOptions = options;
        });
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
        const /** @type {?} */ label = this.extractLabel(option);
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
        this.autocompleteInput = this.formBuilder.control({ value: undefined, disabled: this.disabled, required: this.required });
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
     * @return {?}
     */
    unsubscribeToOptions() {
        this.options$Subscription.unsubscribe();
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
    (blur)="onBlur($event)">

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
    { type: FormBuilder },
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
const /** @type {?} */ noop$2 = () => {
};
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
        this.endpoint = 'accounts/options';
        this.labelAttr = 'value';
        this.valueAttr = 'key';
        this.name = 'Account autocomplete';
        this.placeholder = 'Account autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.innerValue = '';
        this.onTouchedCallback = noop$2;
        this.onChangeCallback = noop$2;
        this.customFetchFunction = (textSearch) => {
            const /** @type {?} */ filterGroups = [
                {
                    filters: [
                        { property: 'name', value: textSearch }
                    ]
                }
            ];
            if (this.types) {
                filterGroups[0].filters.push({ property: 'role.$id', value: this.types });
            }
            return this.decoraApi.get(this.endpoint, { filterGroups });
        };
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
        if (`${value}` !== `${this.value}`) {
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
DecAutocompleteAccountComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-account',
                template: `<dec-autocomplete
[disabled]="disabled"
[required]="required"
[name]="name"
[placeholder]="placeholder"
(optionSelected)="optionSelected.emit($event)"
[customFetchFunction]="customFetchFunction"
[(ngModel)]="value"
[labelAttr]="labelAttr"
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
const /** @type {?} */ noop$3 = () => {
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
        this.innerValue = '';
        this.onTouchedCallback = noop$3;
        this.onChangeCallback = noop$3;
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
        if (`${value}` !== `${this.value}`) {
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
DecAutocompleteCompanyComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-company',
                template: `<dec-autocomplete
[disabled]="disabled"
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
const /** @type {?} */ noop$4 = () => {
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
        this.innerValue = '';
        this.onTouchedCallback = noop$4;
        this.onChangeCallback = noop$4;
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
        if (`${value}` !== `${this.value}`) {
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
const /** @type {?} */ noop$5 = () => {
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
        this.innerValue = '';
        this.onTouchedCallback = noop$5;
        this.onChangeCallback = noop$5;
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
        if (`${value}` !== `${this.value}`) {
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
const /** @type {?} */ noop$6 = () => {
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
        this.innerValue = '';
        this.onTouchedCallback = noop$6;
        this.onChangeCallback = noop$6;
        this.customFetchFunction = (textSearch) => {
            const /** @type {?} */ search = textSearch ? { textSearch } : undefined;
            return this.decoraApi.get(this.endpoint, search)
                .pipe(map(roles => {
                return roles.filter(role => {
                    const /** @type {?} */ roleType = (role && role.key) ? role.key.split('.')[0] : undefined;
                    return !this.types ? true : this.types.indexOf(roleType) >= 0;
                });
            }));
        };
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
        if (`${value}` !== `${this.value}`) {
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
[customFetchFunction]="customFetchFunction"
[(ngModel)]="value"
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
const /** @type {?} */ noop$7 = () => {
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
        this.innerValue = '';
        this.onTouchedCallback = noop$7;
        this.onChangeCallback = noop$7;
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
        if (`${value}` !== `${this.value}`) {
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
const /** @type {?} */ noop$8 = () => {
};
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
        this.customFetchFunction = (textSearch) => {
            const /** @type {?} */ params = {};
            params.textSearch = textSearch;
            this.setEndpointBasedOnProjectId();
            return this.decoraApi.get(this.endpoint, params)
                .pipe(map(response => {
                response = response.map(quotes => {
                    return {
                        key: quotes.id,
                        value: quotes.productVariantId
                    };
                });
                return response;
            }));
        };
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set projectId(v) {
        this._projectId = v;
        this.value = undefined;
        this.setEndpointBasedOnProjectId();
    }
    /**
     * @return {?}
     */
    get projectId() {
        return this._projectId;
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
        if (`${value}` !== `${this.value}`) {
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
    setEndpointBasedOnProjectId() {
        this.endpoint = !this.projectId ? undefined : this.BASE_ENDPOINT.replace('${projectId}', this.projectId);
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
                providers: [AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteQuoteComponent.ctorParameters = () => [
    { type: DecApiService }
];
DecAutocompleteQuoteComponent.propDecorators = {
    projectId: [{ type: Input }],
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
class AutocompleteTagsComponent {
    constructor() {
        this.endpoint = 'tags/options';
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
        if (`${value}` !== `${this.value}`) {
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
AutocompleteTagsComponent.decorators = [
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
                styles: [``]
            },] },
];
/** @nocollapse */
AutocompleteTagsComponent.ctorParameters = () => [];
AutocompleteTagsComponent.propDecorators = {
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
class AutocompleteTagsModule {
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

  <div class="image-highlighted" [decImage]="imageHighlight" [decImageSize]="{width:600}"></div>

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
class DecGalleryModule {
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
                order: { type: event.sorts[0].dir }
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
        if (this.opennedCollapsable !== filter$$1.uid) {
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
        this.listMode = this.getListMode();
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
        const /** @type {?} */ filter$$1 = this.collapsableFilters.find(item => item.uid === filterUid);
        const /** @type {?} */ filterGroup = { filters: filter$$1.filters };
        this.loadReport(true, filterGroup);
        setTimeout(() => {
            this.opennedCollapsable = filter$$1.uid;
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
                this.payload = this.mountPayload(clearAndReloadReport, collapseFilterGroups);
                this.filterData.next({ endpoint: this.endpoint, payload: this.payload, cbk: res, clear: clearAndReloadReport });
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
        const /** @type {?} */ searchFilterGroups = this.filter ? this.filter.filterGroups : undefined;
        const /** @type {?} */ filterGroups = this.appendFilterGroupsToEachFilterGroup(searchFilterGroups, collapseFilterGroups);
        const /** @type {?} */ payload = {};
        payload.limit = this.limit;
        if (filterGroups) {
            payload.filterGroups = filterGroups;
        }
        if (this.columnsSortConfig) {
            payload.columns = this.columnsSortConfig;
        }
        if (!clearAndReloadReport && this.report) {
            payload.page = this.report.page + 1;
            payload.limit = this.report.limit;
        }
        return payload;
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
                if (this.filterMode !== event.filterMode) {
                    if (event.filterMode === 'tabs') {
                        // if changing from collapse to tabs, clear the results before showing the rows
                        this.setRows([]);
                    }
                    this.filterMode = event.filterMode;
                }
                if (this.filterMode === 'tabs') {
                    this.opennedCollapsable = undefined;
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
                    if (this.opennedCollapsable) {
                        this.loadByOpennedCollapse(this.opennedCollapsable);
                    }
                    else {
                        this.collapsableFilters = event.children ? event.children : [];
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
                    this.loadReport(true);
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
    <ng-container *ngFor="let filter of collapsableFilters">
      <mat-expansion-panel (opened)="searchCollapsable(filter)">
        <mat-expansion-panel-header>
          <div class="collapse-title" fxLayout="row" fxLayoutGap="32px" fxLayoutAlign="left center">
            <div fxFlex="96px" *ngIf="countReport">
              <dec-label [colorHex]="filter.color">{{ getCollapsableCount(filter.uid) }}</dec-label>
            </div>
            {{ 'label.' + filter.label | translate }}
          </div>
        </mat-expansion-panel-header>
        <div *ngIf="opennedCollapsable === filter.uid">
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
                template: `<mat-toolbar [color]="color" *ngIf="initialized">

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
        let /** @type {?} */ style = { backgroundColor: '', pointerEvents: '' };
        if (this.routerLink === window.location.pathname) {
            style.backgroundColor += '#EF3F54';
            style.pointerEvents += 'none';
        }
        else {
            style.backgroundColor += 'rgba(0, 0, 0, ' + treeLevel / 6 + ')'; // hsl(209, 20%, 30%)
        }
        return style;
    }
}
DecSidenavMenuItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-menu-item',
                template: `<ng-template let-treeLevel="treeLevel" #template>

  <mat-list-item class="click dec-sidenav-menu-item"
  (click)="subitems.length ? toggleSubmenu() : openLink()"
  [ngStyle]="getBackground(treeLevel)">

    <div class="item-wrapper">

      <div [ngStyle]="{paddingLeft: treeLevel * 16 + 'px'}" class="item-content">
        <ng-content></ng-content>
      </div>

      <a *ngIf="subitems.length" class="text-right">
        <ng-container [ngSwitch]="showSubmenu">
          <span *ngSwitchCase="false"><i class="arrow down"></i></span>
          <span *ngSwitchCase="true"><i class="arrow up"></i></span>
        </ng-container>
      </a>
    </div>

  </mat-list-item>

  <div class="subitem-menu" *ngIf="showSubmenu">

    <dec-sidenav-menu [items]="subitems" [treeLevel]="treeLevel"></dec-sidenav-menu>

  </div>

</ng-template>
`,
                styles: [`.dec-sidenav-menu-item{height:56px!important;outline:0}.dec-sidenav-menu-item .item-wrapper{width:100%;display:flex;flex-flow:row no-wrap;justify-content:space-between}.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep .mat-icon,.dec-sidenav-menu-item .item-wrapper .item-content ::ng-deep i{vertical-align:middle;margin-bottom:5px;margin-right:8px}.dec-sidenav-menu-item .item-wrapper .right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.dec-sidenav-menu-item .item-wrapper .left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.dec-sidenav-menu-item .item-wrapper .up{transform:rotate(-135deg);-webkit-transform:rotate(-135deg)}.dec-sidenav-menu-item .item-wrapper .down{transform:rotate(45deg);-webkit-transform:rotate(45deg)}.dec-sidenav-menu-item .text-right{text-align:right}.dec-sidenav-menu-item .click{cursor:pointer}.dec-sidenav-menu-item i{border:solid #000;border-width:0 2px 2px 0;display:inline-block;padding:4px}`]
            },] },
];
/** @nocollapse */
DecSidenavMenuItemComponent.ctorParameters = () => [
    { type: Router }
];
DecSidenavMenuItemComponent.propDecorators = {
    routerLink: [{ type: Input }],
    template: [{ type: ViewChild, args: [TemplateRef,] }],
    _subitems: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }]
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
  <ng-container *ngIf="toolbar">
    <ng-content select="dec-sidenav-toolbar"></ng-content>
  </ng-container>
  <!-- / TOOLBAR -->

  <!-- PROGRESS BAR -->
  <div class="progress-bar-wrapper" *ngIf="progressBarVisible | async">
    <mat-progress-bar mode="indeterminate" color="accent"></mat-progress-bar>
  </div>
  <!-- / PROGRESS BAR -->

  <mat-sidenav-container [ngClass]="{'with-toolbar': toolbar}">

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
                styles: [`.dec-sidenav-wraper .mat-sidenav-container{height:100vh}.dec-sidenav-wraper .mat-sidenav-container.with-toolbar{height:calc(100vh - 64px)}.dec-sidenav-wraper .mat-sidenav-container .mat-sidenav{width:256px}.dec-sidenav-wraper .progress-bar-wrapper{position:fixed;top:60px;left:0;width:100%}`]
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
                template: `<div class="dec-sidenav-container-wrapper">
  <ng-content></ng-content>
</div>
`,
                styles: [`.dec-sidenav-container-wrapper{min-width:1024px;padding:32px}`]
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
const /** @type {?} */ DECORA_API_SERVICE_CONFIG = new InjectionToken('DECORA_API_SERVICE_CONFIG');
/**
 * @param {?} http
 * @param {?} snackbar
 * @param {?} serviceConfig
 * @return {?}
 */
function InitDecApiService(http, snackbar, serviceConfig) {
    return new DecApiService(http, snackbar, serviceConfig);
}
class DecApiModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: DecApiModule,
            providers: [
                { provide: DECORA_API_SERVICE_CONFIG, useValue: config },
                {
                    provide: DecApiService,
                    useFactory: InitDecApiService,
                    deps: [HttpClient, DecSnackBarService, DECORA_API_SERVICE_CONFIG]
                }
            ]
        };
    }
}
DecApiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    DecSnackBarModule
                ]
            },] },
];

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
        return /** @type {?} */ (this.decoraApi.fetchCurrentLoggedUser()
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

export { AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, DecAutocompleteComponent, DecAutocompleteModule, DecAutocompleteAccountComponent, DecAutocompleteAccountModule, AUTOCOMPLETE_COMPANY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCompanyComponent, DecAutocompleteCompanyModule, AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR, DecAutocompleteCountryComponent, DecAutocompleteCountryModule, BASE_ENDPOINT, AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR, DecAutocompleteDepartmentComponent, DecAutocompleteDepartmentModule, DecAutocompleteRoleComponent, DecAutocompleteRoleModule, BASE_AUTOCOMPLETE_PROJECT_ENDPOINT, AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR, DecAutocompleteProjectComponent, DecAutocompleteProjectModule, AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR, DecAutocompleteQuoteComponent, DecAutocompleteQuoteModule, AutocompleteTagsComponent, AutocompleteTagsModule, DecBreadcrumbComponent, DecBreadcrumbModule, DecDialogComponent, DecDialogModule, DecDialogService, DecGalleryComponent, DecGalleryModule, DecImageModule, DecImageDirective, DecLabelComponent, DecLabelModule, DecListModule, DecListFilter, DecListComponent, DecListActiveFilterResumeModule, DecListActiveFilterResumeComponent, DecListAdvancedFilterModule, DecListAdvancedFilterComponent, DecListFilterModule, DecListFilterComponent, DecListFooterComponent, DecListGridComponent, DecListTableModule, DecListTableComponent, DecListTableColumnComponent, DecListActionsModule, DecListActionsComponent, DecPageForbidenComponent, DecPageForbidenModule, DecPageNotFoundComponent, DecPageNotFoundModule, DecProductSpinComponent, DecProductSpinModule, DecSidenavModule, DecSidenavComponent, DecSidenavContentComponent, DecSidenavMenuItemComponent, DecSidenavMenuLeftComponent, DecSidenavMenuRightComponent, DecSidenavMenuTitleComponent, DecSidenavToolbarComponent, DecSidenavToolbarTitleComponent, DecSketchfabViewComponent, DecSketchfabViewModule, DecSpinnerComponent, DecSpinnerModule, DecStepsListComponent, DecStepsListModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, DecStringArrayInputComponent, DecStringArrayInputModule, DecTabsModule, DecTabsComponent, DecTabModule, DecTabComponent, DecUploadModule, DEC_UPLOAD_CONTROL_VALUE_ACCESSOR, DecUploadComponent, DecPermissionDirective, DecPermissionModule, hexToRgbNew, standardize_color, DecContrastFontWithBgDirective, DecContrastFontWithBgModule, DecGuardModule, DecAuthGuard, DecApiService, DECORA_API_SERVICE_CONFIG, InitDecApiService, DecApiModule, UserAuthData, Filter, DecSnackBarService, DecSnackBarModule, DecPermissionGuard, DecPermissionGuardModule, DecWsClientService, DecWsClientModule, DecScriptLoaderService, DecScriptLoaderModule, DecListTabsFilterComponent as ɵa, DecSidenavMenuComponent as ɵc, DecSidenavService as ɵb, DecTabMenuComponent as ɵd };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWJyb3dzZXItbGliLXVpLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1hY2NvdW50L2F1dG9jb21wbGV0ZS1hY2NvdW50LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtYWNjb3VudC9hdXRvY29tcGxldGUtYWNjb3VudC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWNvbXBhbnkvYXV0b2NvbXBsZXRlLWNvbXBhbnkuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1jb21wYW55L2F1dG9jb21wbGV0ZS1jb21wYW55Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtY291bnRyeS9hdXRvY29tcGxldGUtY291bnRyeS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLWNvdW50cnkvYXV0b2NvbXBsZXRlLWNvdW50cnkubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1kZXBhcnRtZW50L2F1dG9jb21wbGV0ZS1kZXBhcnRtZW50LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXJvbGUvYXV0b2NvbXBsZXRlLXJvbGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1yb2xlL2F1dG9jb21wbGV0ZS1yb2xlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtcHJvamVjdC9hdXRvY29tcGxldGUtcHJvamVjdC5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlLXByb2plY3QvYXV0b2NvbXBsZXRlLXByb2plY3QubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1xdW90ZS9hdXRvY29tcGxldGUtcXVvdGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1xdW90ZS9hdXRvY29tcGxldGUtcXVvdGUubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS10YWdzL2F1dG9jb21wbGV0ZS10YWdzLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9hdXRvY29tcGxldGUtdGFncy9hdXRvY29tcGxldGUtdGFncy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1kaWFsb2cvZGVjLWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXNwaW5uZXIvZGVjLXNwaW5uZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zcGlubmVyL2RlYy1zcGlubmVyLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtZGlhbG9nL2RlYy1kaWFsb2cuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtZGlhbG9nL2RlYy1kaWFsb2cubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2dhbGxlcnkvY2Fyb3VzZWwtY29uZmlnLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2dhbGxlcnkvZGVjLWdhbGxlcnkuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS5jb25zdGFudHMudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UuZGlyZWN0aXZlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9nYWxsZXJ5L2RlYy1nYWxsZXJ5Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtbGFiZWwvZGVjLWxhYmVsLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZGlyZWN0aXZlcy9jb2xvci9jb250cmFzdC1mb250LXdpdGgtYmcvZGVjLWNvbnRyYXN0LWZvbnQtd2l0aC1iZy5kaXJlY3RpdmUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2RpcmVjdGl2ZXMvY29sb3IvY29udHJhc3QtZm9udC13aXRoLWJnL2RlYy1jb250cmFzdC1mb250LXdpdGgtYmcubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1sYWJlbC9kZWMtbGFiZWwubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC5tb2RlbHMudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWZpbHRlci9saXN0LXRhYnMtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hZHZhbmNlZC1maWx0ZXIvbGlzdC1hZHZhbmNlZC1maWx0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWUvbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2RpcmVjdGl2ZXMvcGVybWlzc2lvbi9kZWMtcGVybWlzc2lvbi5kaXJlY3RpdmUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2RpcmVjdGl2ZXMvcGVybWlzc2lvbi9kZWMtcGVybWlzc2lvbi5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWZpbHRlci9saXN0LWZpbHRlci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWdyaWQvbGlzdC1ncmlkLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtdGFibGUtY29sdW1uL2xpc3QtdGFibGUtY29sdW1uLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtdGFibGUvbGlzdC10YWJsZS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtdGFibGUvbGlzdC10YWJsZS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWZvb3Rlci9saXN0LWZvb3Rlci5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFkdmFuY2VkLWZpbHRlci9saXN0LWFkdmFuY2VkLWZpbHRlci5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWFjdGlvbnMvbGlzdC1hY3Rpb25zLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9saXN0L2xpc3QtYWN0aW9ucy9saXN0LWFjdGlvbnMubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvcGFnZS1mb3JiaWRlbi9wYWdlLWZvcmJpZGVuLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wYWdlLWZvcmJpZGVuL3BhZ2UtZm9yYmlkZW4ubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3BhZ2Utbm90LWZvdW5kL3BhZ2Utbm90LWZvdW5kLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9wYWdlLW5vdC1mb3VuZC9wYWdlLW5vdC1mb3VuZC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvcHJvZHVjdC1zcGluL3Byb2R1Y3Qtc3Bpbi5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvcHJvZHVjdC1zcGluL3Byb2R1Y3Qtc3Bpbi5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlL2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtdG9vbGJhci9kZWMtc2lkZW5hdi10b29sYmFyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LW1lbnUtaXRlbS9kZWMtc2lkZW5hdi1tZW51LWl0ZW0uY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS10aXRsZS9kZWMtc2lkZW5hdi1tZW51LXRpdGxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L3NpZGVuYXYuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC9kZWMtc2lkZW5hdi1tZW51LWxlZnQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtbWVudS1yaWdodC9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L3NpZGVuYXYuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NpZGVuYXYvZGVjLXNpZGVuYXYtY29udGVudC9kZWMtc2lkZW5hdi1jb250ZW50LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LW1lbnUvZGVjLXNpZGVuYXYtbWVudS5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvc2lkZW5hdi9zaWRlbmF2Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NrZXRjaGZhYi12aWV3L2RlYy1za2V0Y2hmYWItdmlldy5jb21wb25lbnQudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL3NlcnZpY2VzL3NjcmlwdC1sb2FkZXIvZGVjLXNjcmlwdC1sb2FkZXIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3NrZXRjaGZhYi12aWV3L2RlYy1za2V0Y2hmYWItdmlldy5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvZGVjLXN0ZXBzLWxpc3QvZGVjLXN0ZXBzLWxpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zdGVwcy1saXN0L2RlYy1zdGVwcy1saXN0Lm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy9kZWMtc3RyaW5nLWFycmF5LWlucHV0L2RlYy1zdHJpbmctYXJyYXktaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL2RlYy1zdHJpbmctYXJyYXktaW5wdXQvZGVjLXN0cmluZy1hcnJheS1pbnB1dC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdGFicy90YWIvdGFiLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYi1tZW51L3RhYi1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy90YWJzL3RhYnMuY29tcG9uZW50LnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9jb21wb25lbnRzL3RhYnMvdGFiL3RhYi5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdGFicy90YWJzLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvc25hY2stYmFyL2RlYy1zbmFjay1iYXIubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2NvbXBvbmVudHMvdXBsb2FkL3VwbG9hZC5tb2R1bGUudHMiLCJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvbGliL2d1YXJkL2F1dGgtZ3VhcmQuc2VydmljZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvZ3VhcmQvZ3VhcmQubW9kdWxlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbC50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvcGVybWlzc2lvbi1ndWFyZC9kZWMtcGVybWlzc2lvbi1ndWFyZC5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy9wZXJtaXNzaW9uLWd1YXJkL2RlYy1wZXJtaXNzaW9uLWd1YXJkLm1vZHVsZS50cyIsIm5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS9saWIvc2VydmljZXMvd3MtY2xpZW50L3dzLWNsaWVudC5zZXJ2aWNlLnRzIiwibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpL2xpYi9zZXJ2aWNlcy93cy1jbGllbnQvd3MtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTbmFja0JhciwgTWF0U25hY2tCYXJSZWYsIFNpbXBsZVNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VUeXBlID0gJ3N1Y2Nlc3MnIHwgJ3ByaW1hcnknIHwgJ2luZm8nIHwgJ3dhcm4nIHwgJ2Vycm9yJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGVjU25hY2tCYXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc25hY2tCYXJTZXJ2aWNlOiBNYXRTbmFja0JhcixcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XG5cbiAgb3BlbihtZXNzYWdlOiBzdHJpbmcsIHR5cGU6IE1lc3NhZ2VUeXBlLCBkdXJhdGlvbiA9IDRlMyk6IE1hdFNuYWNrQmFyUmVmPFNpbXBsZVNuYWNrQmFyPiB7XG4gICAgY29uc3QgbXNnID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudChtZXNzYWdlKTtcbiAgICBjb25zdCBzbmFja0NsYXNzID0gdGhpcy5nZXRDbGFzcyh0eXBlKTtcblxuICAgIHJldHVybiB0aGlzLnNuYWNrQmFyU2VydmljZS5vcGVuKG1zZywgJycsIHtcbiAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgIHBhbmVsQ2xhc3M6IHNuYWNrQ2xhc3NcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsYXNzKHR5cGU6IE1lc3NhZ2VUeXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1zdWNjZXNzJztcbiAgICAgIGNhc2UgJ3ByaW1hcnknOlxuICAgICAgICByZXR1cm4gJ3NuYWNrLXByaW1hcnknO1xuICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgIHJldHVybiAnc25hY2staW5mbyc7XG4gICAgICBjYXNlICd3YXJuJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay13YXJuJztcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgcmV0dXJuICdzbmFjay1lcnJvcic7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBzaGFyZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVXNlckF1dGhEYXRhLCBMb2dpbkRhdGEsIEZhY2Vib29rTG9naW5EYXRhLCBTZXJ2aWNlQ29uZmlnLCBEZWNGaWx0ZXIsIFNlcmlhbGl6ZWREZWNGaWx0ZXIgfSBmcm9tICcuL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgRGVjU25hY2tCYXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgQ2FsbE9wdGlvbnMgPSB7XG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgcGFyYW1zPzoge1xuICAgIFtwcm9wOiBzdHJpbmddOiBhbnk7XG4gIH07XG59ICYge1xuICBbcHJvcDogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IHR5cGUgSHR0cFJlcXVlc3RUeXBlcyA9ICdHRVQnIHwgJ1BPU1QnIHwgJ1BVVCcgfCAnUEFUQ0gnIHwgJ0RFTEVURSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBcGlTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICB1c2VyOiBVc2VyQXV0aERhdGE7XG5cbiAgdXNlciQ6IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyQXV0aERhdGE+KHVuZGVmaW5lZCk7XG5cbiAgcHJpdmF0ZSBzZXNzaW9uVG9rZW46IHN0cmluZztcblxuICBwcml2YXRlIHVzZXJTdWJzY3JpcGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGdldCBob3N0KCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5ob3N0O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgc25hY2tiYXI6IERlY1NuYWNrQmFyU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdERUNPUkFfQVBJX1NFUlZJQ0VfQ09ORklHJykgcHJpdmF0ZSBjb25maWc6IFNlcnZpY2VDb25maWdcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVUb1VzZXIoKTtcbiAgICB0aGlzLnRyeVRvTG9hZFNpZ25lZEluVXNlcigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZVRvVXNlcigpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBQVUJMSUMgQVVUSCBNRVRIT0RTIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgYXV0aCA9IChsb2dpbkRhdGE6IExvZ2luRGF0YSkgPT4ge1xuICAgIGlmIChsb2dpbkRhdGEpIHtcbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9zaWduaW4nKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGhlYWRlcnM6IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgfTtcbiAgICAgIGNvbnN0IGJvZHkgPSBuZXcgSHR0cFBhcmFtcygpXG4gICAgICAgIC5zZXQoJ3VzZXJuYW1lJywgbG9naW5EYXRhLmVtYWlsKVxuICAgICAgICAuc2V0KCdwYXNzd29yZCcsIGxvZ2luRGF0YS5wYXNzd29yZCk7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kPFVzZXJBdXRoRGF0YT4oZW5kcG9pbnQsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4dHJhdFNlc3Npb25Ub2tlbihyZXMpLFxuICAgICAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoeyBzdGF0dXMsIG5vdGlmaWVkOiB0cnVlLCBtZXNzYWdlOiAnREVDT1JBLUFQSSBBVVRIIEVSUk9SOjogTm8gY3JlZGVudGlhbHMgcHJvdmlkZWQnIH0pO1xuICAgIH1cbiAgfVxuXG4gIGF1dGhGYWNlYm9vayA9IChsb2dpbkRhdGE6IEZhY2Vib29rTG9naW5EYXRhKSA9PiB7XG4gICAgaWYgKGxvZ2luRGF0YSkge1xuICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmdldFJlc291cmNlVXJsKCdhdXRoL2ZhY2Vib29rL3NpZ25pbicpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgaGVhZGVyczogdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB9O1xuICAgICAgY29uc3QgYm9keSA9IG5ldyBIdHRwUGFyYW1zKClcbiAgICAgICAgLnNldCgnZmFjZWJvb2tUb2tlbicsIGxvZ2luRGF0YS5mYWNlYm9va1Rva2VuKVxuICAgICAgICAuc2V0KCdrZWVwTG9nZ2VkJywgbG9naW5EYXRhLmtlZXBMb2dnZWQudG9TdHJpbmcoKSk7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0TWV0aG9kPFVzZXJBdXRoRGF0YT4oZW5kcG9pbnQsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcCgocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4dHJhdFNlc3Npb25Ub2tlbihyZXMpLFxuICAgICAgICAgICAgICB0aGlzLnVzZXIkLm5leHQocmVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoeyBzdGF0dXMsIG5vdGlmaWVkOiB0cnVlLCBtZXNzYWdlOiAnREVDT1JBLUFQSSBBVVRIIEZBQ0VCT09LIEVSUk9SOjogTm8gY3JlZGVudGlhbHMgcHJvdmlkZWQnIH0pO1xuICAgIH1cbiAgfVxuXG4gIGxvZ291dCA9IChyZWRpcmVjdFRvTG9naW5QYWdlID0gdHJ1ZSkgPT4ge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9zaWdub3V0Jyk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgaGVhZGVyczogdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSB9O1xuICAgIHJldHVybiB0aGlzLnBvc3RNZXRob2QoZW5kcG9pbnQsIHt9LCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXNzaW9uVG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgaWYgKHJlZGlyZWN0VG9Mb2dpblBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZ29Ub0xvZ2luUGFnZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KSk7XG4gIH1cblxuICBmZXRjaEN1cnJlbnRMb2dnZWRVc2VyID0gKCkgPT4ge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5nZXRSZXNvdXJjZVVybCgnYXV0aC9hY2NvdW50Jyk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgaGVhZGVyczogdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCkgfTtcbiAgICByZXR1cm4gdGhpcy5nZXRNZXRob2Q8VXNlckF1dGhEYXRhPihlbmRwb2ludCwge30sIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLmV4dHJhdFNlc3Npb25Ub2tlbihyZXMpLFxuICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KHJlcyk7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIC8vIFBVQkxJQyBIVFRQIE1FVEhPRFMgLy9cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICBnZXQgPSA8VD4oZW5kcG9pbnQsIHNlYXJjaD86IERlY0ZpbHRlciwgb3B0aW9ucz86IENhbGxPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgZW5kb3BpbnRVcmwgPSB0aGlzLmdldFJlc291cmNlVXJsKGVuZHBvaW50KTtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnRyYW5zZm9ybURlY0ZpbHRlckluUGFyYW1zKHNlYXJjaCk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWV0aG9kPFQ+KGVuZG9waW50VXJsLCBwYXJhbXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgZGVsZXRlID0gPFQ+KGVuZHBvaW50LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLmRlbGV0ZU1ldGhvZDxUPihlbmRvcGludFVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBwYXRjaCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMucGF0Y2hNZXRob2Q8VD4oZW5kb3BpbnRVcmwsIHBheWxvYWQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdCA9IDxUPihlbmRwb2ludCwgcGF5bG9hZDogYW55ID0ge30sIG9wdGlvbnM/OiBDYWxsT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgcmV0dXJuIHRoaXMucG9zdE1ldGhvZDxUPihlbmRvcGludFVybCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gIH1cblxuICBwdXQgPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbmRvcGludFVybCA9IHRoaXMuZ2V0UmVzb3VyY2VVcmwoZW5kcG9pbnQpO1xuICAgIHJldHVybiB0aGlzLnB1dE1ldGhvZDxUPihlbmRvcGludFVybCwgcGF5bG9hZCwgb3B0aW9ucyk7XG4gIH1cblxuICB1cHNlcnQgPSA8VD4oZW5kcG9pbnQsIHBheWxvYWQ6IGFueSA9IHt9LCBvcHRpb25zPzogQ2FsbE9wdGlvbnMpID0+IHtcbiAgICBpZiAocGF5bG9hZC5pZCA+PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXQoZW5kcG9pbnQsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGVuZHBvaW50LCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICB1cGxvYWQoZW5kcG9pbnQ6IHN0cmluZywgZmlsZXM6IEZpbGVbXSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGVuZG9waW50VXJsID0gdGhpcy5nZXRSZXNvdXJjZVVybChlbmRwb2ludCk7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmNyZWF0ZUZpbGVzRm9ybURhdGEoZmlsZXMpO1xuICAgIG9wdGlvbnMucmVwb3J0UHJvZ3Jlc3MgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TWV0aG9kKCdQT1NUJywgZW5kb3BpbnRVcmwsIGZvcm1EYXRhLCBvcHRpb25zKTtcbiAgfVxuXG5cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIC8vIFB1YmxpYyBIZWxwZXIgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKiogLy9cbiAgcHJpdmF0ZSB0cmFuc2Zvcm1EZWNGaWx0ZXJJblBhcmFtcyhmaWx0ZXI6IERlY0ZpbHRlcik6IFNlcmlhbGl6ZWREZWNGaWx0ZXIge1xuXG4gICAgY29uc3Qgc2VyaWFsaXplZEZpbHRlcjogU2VyaWFsaXplZERlY0ZpbHRlciA9IHt9O1xuXG4gICAgaWYgKGZpbHRlcikge1xuXG4gICAgICBpZiAoZmlsdGVyLnBhZ2UpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5wYWdlID0gZmlsdGVyLnBhZ2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWx0ZXIubGltaXQpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci5saW1pdCA9IGZpbHRlci5saW1pdDtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5maWx0ZXJHcm91cHMpIHtcbiAgICAgICAgY29uc3QgZmlsdGVyV2l0aFZhbHVlQXNBcnJheSA9IHRoaXMuZ2V0RmlsdGVyV2l0aFZhbHVlc0FzQXJyYXkoZmlsdGVyLmZpbHRlckdyb3Vwcyk7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIuZmlsdGVyID0gdGhpcy5maWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKGZpbHRlcldpdGhWYWx1ZUFzQXJyYXkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLnByb2plY3RWaWV3KSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIucHJvamVjdFZpZXcgPSB0aGlzLmZpbHRlck9iamVjdFRvUXVlcnlTdHJpbmcoZmlsdGVyLnByb2plY3RWaWV3KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlci5jb2x1bW5zKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRGaWx0ZXIuY29sdW1ucyA9IGZpbHRlci5jb2x1bW5zO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVyLnRleHRTZWFyY2gpIHtcbiAgICAgICAgc2VyaWFsaXplZEZpbHRlci50ZXh0U2VhcmNoID0gZmlsdGVyLnRleHRTZWFyY2g7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gc2VyaWFsaXplZEZpbHRlcjtcblxuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXJPYmplY3RUb1F1ZXJ5U3RyaW5nKG9iaikge1xuICAgIGlmIChvYmopIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyV2l0aFZhbHVlc0FzQXJyYXkoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cENvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbHRlckdyb3VwcykpOyAvLyBtYWtlIGEgY29weSBvZiB0aGUgZmlsdGVyIHNvIHdlIGRvIG5vdCBjaGFuZ2UgdGhlIG9yaWdpbmFsIGZpbHRlclxuXG4gICAgaWYgKGZpbHRlckdyb3VwQ29weSkge1xuXG4gICAgICByZXR1cm4gZmlsdGVyR3JvdXBDb3B5Lm1hcChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycyA9IGZpbHRlckdyb3VwLmZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG5cbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmlsdGVyLnZhbHVlKSkge1xuICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gW2ZpbHRlci52YWx1ZV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZpbHRlcjtcblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyR3JvdXA7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIGZpbHRlckdyb3VwcztcblxuICAgIH1cbiAgfVxuXG5cbiAgLy8gKioqKioqKioqKioqIC8vXG4gIC8vIEh0dHAgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKiogLy9cbiAgcHJpdmF0ZSBnZXRNZXRob2Q8VD4odXJsOiBzdHJpbmcsIHNlYXJjaCA9IHt9LCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBvcHRpb25zLnBhcmFtcyA9IHNlYXJjaDtcbiAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5uZXdIZWFkZXJXaXRoU2Vzc2lvblRva2VuKCdhcHBsaWNhdGlvbi9qc29uJywgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQ8VD4odXJsLCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnBhdGNoPFQ+KHVybCwgYm9keSwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpXG4gICAgICApO1xuICAgIHJldHVybiB0aGlzLnNoYXJlT2JzZXJ2YWJsZShjYWxsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHBvc3RNZXRob2Q8VD4odXJsLCBib2R5Pywgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbignYXBwbGljYXRpb24vanNvbicsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucG9zdDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXRNZXRob2Q8VD4odXJsLCBib2R5ID0ge30sIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLnB1dDxUPih1cmwsIGJvZHksIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWxldGVNZXRob2Q8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IENhbGxPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLm5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4oJ2FwcGxpY2F0aW9uL2pzb24nLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IGNhbGxPYnNlcnZhYmxlID0gdGhpcy5odHRwLmRlbGV0ZTxUPih1cmwsIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0TWV0aG9kPFQ+KHR5cGU6IEh0dHBSZXF1ZXN0VHlwZXMsIHVybDogc3RyaW5nLCBib2R5OiBhbnkgPSB7fSwgb3B0aW9uczogQ2FsbE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHRoaXMubmV3SGVhZGVyV2l0aFNlc3Npb25Ub2tlbih1bmRlZmluZWQsIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHR5cGUsIHVybCwgYm9keSwgb3B0aW9ucyk7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucmVxdWVzdDxUPihyZXEpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5zaGFyZU9ic2VydmFibGUoY2FsbE9ic2VydmFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvciA9IChlcnJvcjogYW55KSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgY29uc3QgYm9keU1lc3NhZ2UgPSAoZXJyb3IgJiYgZXJyb3IuZXJyb3IpID8gZXJyb3IuZXJyb3IubWVzc2FnZSA6ICcnO1xuICAgIGNvbnN0IHN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICBjb25zdCBzdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcblxuICAgIHN3aXRjaCAoZXJyb3Iuc3RhdHVzKSB7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmF1dGhIb3N0KSB7XG4gICAgICAgICAgdGhpcy5nb1RvTG9naW5QYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgNDA5OlxuICAgICAgICB0aGlzLnNuYWNrYmFyLm9wZW4oJ21lc3NhZ2UuaHR0cC1zdGF0dXMuNDA5JywgJ2Vycm9yJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB0aHJvd0Vycm9yKHsgc3RhdHVzLCBzdGF0dXNUZXh0LCBtZXNzYWdlLCBib2R5TWVzc2FnZSB9KTtcbiAgfVxuXG4gIC8vICoqKioqKiogLy9cbiAgLy8gSGVscGVycyAvL1xuICAvLyAqKioqKioqIC8vXG5cbiAgcHJpdmF0ZSBjcmVhdGVGaWxlc0Zvcm1EYXRhKGZpbGVzOiBGaWxlW10pIHtcbiAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmaWxlcy5mb3JFYWNoKChmaWxlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZm9ybUl0ZW1OYW1lID0gaW5kZXggPiAwID8gYGZpbGUtJHtpbmRleH1gIDogJ2ZpbGUnO1xuICAgICAgZm9ybURhdGEuYXBwZW5kKGZvcm1JdGVtTmFtZSwgZmlsZSwgZmlsZS5uYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH1cblxuICBwcml2YXRlIGdvVG9Mb2dpblBhZ2UoKSB7XG4gICAgY29uc3QgbmFrZWRBcHBEb21haW4gPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgLnJlcGxhY2UoJ2h0dHBzOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnaHR0cDovLycsICcnKVxuICAgICAgLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLnNlYXJjaCwgJycpO1xuXG4gICAgY29uc3QgbmFrZWRBdXRoRG9tYWluID0gdGhpcy5jb25maWcuYXV0aEhvc3Quc3BsaXQoJz8nKVswXVxuICAgICAgLnJlcGxhY2UoJ2h0dHBzOi8vJywgJycpXG4gICAgICAucmVwbGFjZSgnaHR0cDovLycsICcnKVxuICAgICAgLnJlcGxhY2UoJy8vJywgJycpO1xuXG4gICAgaWYgKG5ha2VkQXBwRG9tYWluICE9PSBuYWtlZEF1dGhEb21haW4pIHtcbiAgICAgIGNvbnN0IGF1dGhVcmxXaXRoUmVkaXJlY3QgPSBgJHt0aGlzLmNvbmZpZy5hdXRoSG9zdH0ke3RoaXMuZ2V0UGFyYW1zRGl2aWRlcigpfXJlZGlyZWN0VXJsPSR7d2luZG93LmxvY2F0aW9uLmhyZWZ9YDtcbiAgICAgIGNvbnNvbGUubG9nKGBEZWNBcGlTZXJ2aWNlOjogTm90IGF1dGhlbnRpY2F0ZWQuIFJlZGlyZWN0aW5nIHRvIGxvZ2luIHBhZ2UgYXQ6ICR7YXV0aFVybFdpdGhSZWRpcmVjdH1gKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXV0aFVybFdpdGhSZWRpcmVjdDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFBhcmFtc0RpdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmF1dGhIb3N0LnNwbGl0KCc/JykubGVuZ3RoID4gMSA/ICcmJyA6ICc/JztcbiAgfVxuXG4gIHByaXZhdGUgdHJ5VG9Mb2FkU2lnbmVkSW5Vc2VyKCkge1xuICAgIHRoaXMuZmV0Y2hDdXJyZW50TG9nZ2VkVXNlcigpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZWNvcmFBcGlTZXJ2aWNlOjogU3RhcnRlZCBhcyBsb2dnZWQnKTtcbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRGVjb3JhQXBpU2VydmljZTo6IFN0YXJ0ZWQgYXMgbm90IGxvZ2dlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RlY29yYUFwaVNlcnZpY2U6OiBJbml0aWFsaXphdGlvbiBFcnJvci4gQ291bGQgcmV0cmlldmUgdXNlciBhY2NvdW50JywgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG5ld0hlYWRlcldpdGhTZXNzaW9uVG9rZW4odHlwZT86IHN0cmluZywgaGVhZGVycz86IEh0dHBIZWFkZXJzKSB7XG4gICAgaGVhZGVycyA9IGhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgY29uc3QgY3VzdG9taXplZENvbnRlbnRUeXBlID0gaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICghY3VzdG9taXplZENvbnRlbnRUeXBlICYmIHR5cGUpIHtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgdHlwZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlc3Npb25Ub2tlbikge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdYLUF1dGgtVG9rZW4nLCB0aGlzLnNlc3Npb25Ub2tlbik7XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYXRTZXNzaW9uVG9rZW4ocmVzKSB7XG4gICAgdGhpcy5zZXNzaW9uVG9rZW4gPSByZXMgJiYgcmVzLnNlc3Npb24gPyByZXMuc2Vzc2lvbi5pZCA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZXNvdXJjZVVybChwYXRoKSB7XG5cbiAgICBjb25zdCBiYXNlUGF0aCA9IHRoaXMuY29uZmlnLnVzZU1vY2tBcGkgPyB0aGlzLmNvbmZpZy5tb2NrQXBpSG9zdCA6IHRoaXMuY29uZmlnLmhvc3Q7XG5cbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwvfFxcLyQvZywgJycpO1xuXG4gICAgcmV0dXJuIGAke2Jhc2VQYXRofS8ke3BhdGh9YDtcblxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1VzZXIoKSB7XG4gICAgdGhpcy51c2VyU3Vic2NyaXBpb24gPSB0aGlzLnVzZXIkLnN1YnNjcmliZSh1c2VyID0+IHtcbiAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9Vc2VyKCkge1xuICAgIHRoaXMudXNlclN1YnNjcmlwaW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKlxuICAqIFNoYXJlIE9ic2VydmFibGVcbiAgKlxuICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gc2hhcmUgdGhlIGFjdHVhbCBkYXRhIHZhbHVlcyBhbmQgbm90IGp1c3QgdGhlIG9ic2VydmFibGUgaW5zdGFuY2VcbiAgKlxuICAqIFRvIHJldXNlIGEgc2luZ2xlLCBjb21tb24gc3RyZWFtIGFuZCBhdm9pZCBtYWtpbmcgYW5vdGhlciBzdWJzY3JpcHRpb24gdG8gdGhlIHNlcnZlciBwcm92aWRpbmcgdGhhdCBkYXRhLlxuICAqXG4gICovXG4gIHByaXZhdGUgc2hhcmVPYnNlcnZhYmxlKGNhbGw6IE9ic2VydmFibGU8YW55Pikge1xuICAgIHJldHVybiBjYWxsLnBpcGUoc2hhcmUoKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN3aXRjaE1hcCwgc3RhcnRXaXRoLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYWJlbEZ1bmN0aW9uLCBWYWx1ZUZ1bmN0aW9uLCBTZWxlY3Rpb25FdmVudCwgQ3VzdG9tRmV0Y2hGdW5jdGlvbiB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLm1vZGVscyc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dFxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiXG4gICAgI3Rlcm1JbnB1dFxuICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCJcbiAgICBbZm9ybUNvbnRyb2xdPVwiYXV0b2NvbXBsZXRlSW5wdXRcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAoa2V5dXAuZW50ZXIpPVwib25FbnRlckJ1dHRvbigkZXZlbnQpXCJcbiAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiPlxuXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0U3VmZml4IChjbGljayk9XCJjbGVhcih0cnVlKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmICFyZXF1aXJlZCAmJiBhdXRvY29tcGxldGVJbnB1dC52YWx1ZVwiPlxuICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwicmVzZXQoKVwiICpuZ0lmPVwiIWRpc2FibGVkICYmIHZhbHVlICE9PSB3cml0dGVuVmFsdWVcIj5cbiAgICAgIDxtYXQtaWNvbj5yZXBsYXk8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuXG4gIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG9jb21wbGV0ZT1cIm1hdEF1dG9jb21wbGV0ZVwiXG4gIFtkaXNwbGF5V2l0aF09XCJleHRyYWN0TGFiZWxcIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib25PcHRpb25TZWxlY3RlZCgkZXZlbnQpXCJcbiAgbmFtZT1cImF1dG9jb21wbGV0ZVZhbHVlXCI+XG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGl0ZW0gb2YgKG9wdGlvbnMkIHwgYXN5bmMpXCIgW3ZhbHVlXT1cIml0ZW1cIj5cbiAgICAgIHt7IGV4dHJhY3RMYWJlbChpdGVtKSB9fVxuICAgIDwvbWF0LW9wdGlvbj5cbiAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBAVmlld0NoaWxkKE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIpICBhdXRvY29tcGxldGVUcmlnZ2VyOiBNYXRBdXRvY29tcGxldGVUcmlnZ2VyO1xuXG4gIGF1dG9jb21wbGV0ZUlucHV0OiBGb3JtQ29udHJvbDtcblxuICBvcHRpb25zJDogT2JzZXJ2YWJsZTxhbnlbXT47XG5cbiAgd3JpdHRlblZhbHVlOiBhbnk7XG5cbiAgLy8gUGFyYW1zXG4gIEBJbnB1dCgpIGN1c3RvbUZldGNoRnVuY3Rpb246IEN1c3RvbUZldGNoRnVuY3Rpb247XG5cbiAgQElucHV0KCkgZW5kcG9pbnQ7XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHY7XG4gICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQpIHtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuZGlzYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGxhYmVsRm46IExhYmVsRnVuY3Rpb247XG5cbiAgQElucHV0KCkgbGFiZWxBdHRyOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbmFtZSA9ICdhdXRvY29tcGxldGVJbnB1dCc7XG5cbiAgQElucHV0KClcbiAgc2V0IG9wdGlvbnModjogYW55W10pIHtcbiAgICB0aGlzLl9vcHRpb25zID0gdjtcbiAgICB0aGlzLmlubmVyT3B0aW9ucyA9IHY7XG4gIH1cbiAgZ2V0IG9wdGlvbnMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB9XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSB2YWx1ZUZuOiBWYWx1ZUZ1bmN0aW9uO1xuXG4gIEBJbnB1dCgpIHZhbHVlQXR0cjogc3RyaW5nO1xuXG4gIC8vIEV2ZW50c1xuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGlvbkV2ZW50PigpO1xuICBcbiAgQE91dHB1dCgpIGVudGVyQnV0dG9uOiBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25FdmVudD4oKTtcblxuICAvLyBWaWV3IGVsZW1lbnRzXG4gIEBWaWV3Q2hpbGQoJ3Rlcm1JbnB1dCcpIHRlcm1JbnB1dDtcblxuICAvLyBwcml2YXRlIGRhdGE7XG4gIHByaXZhdGUgb3B0aW9ucyRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9vcHRpb25zOiBhbnlbXTtcblxuICBpbm5lck9wdGlvbnM6IGFueVtdID0gW107XG5cbiAgcHJpdmF0ZSBmaWx0ZXJlZE9wdGlvbnM6IGFueVtdID0gW107XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuY3JlYXRlSW5wdXQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRldGVjdFJlcXVpcmVkRGF0YSgpXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlVG9TZWFyY2hBbmRTZXRPcHRpb25zT2JzZXJ2YWJsZSgpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVUb09wdGlvbnMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUb09wdGlvbnMoKTtcbiAgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgVkFMVUVcbiAgKi9cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0SW5uZXJWYWx1ZSh2KTtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2VkKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gZXZlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodjogYW55KSB7XG4gICAgdGhpcy53cml0dGVuVmFsdWUgPSB2O1xuICAgIHYgPSB2ID8gdiA6IHVuZGVmaW5lZDsgLy8gYXZvaWQgbnVsbCB2YWx1ZXNcbiAgICBjb25zdCBoYXNEaWZmZXJlbmNlID0gIXRoaXMuY29tcGFyZUFzU3RyaW5nKHYsIHRoaXMudmFsdWUpO1xuICAgIGlmIChoYXNEaWZmZXJlbmNlKSB7XG4gICAgICB0aGlzLmxvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZSh2KVxuICAgICAgLnRoZW4oKG9wdGlvbnMpID0+IHtcbiAgICAgICAgdGhpcy5zZXRJbm5lclZhbHVlKHYpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25PcHRpb25TZWxlY3RlZCgkZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9ICRldmVudC5vcHRpb24udmFsdWU7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IHRoaXMuZXh0cmFjdFZhbHVlKHNlbGVjdGVkT3B0aW9uKTtcbiAgICBpZiAoc2VsZWN0ZWRPcHRpb25WYWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkT3B0aW9uVmFsdWU7XG4gICAgICB0aGlzLm9wdGlvblNlbGVjdGVkLmVtaXQoe1xuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgb3B0aW9uOiBzZWxlY3RlZE9wdGlvbixcbiAgICAgICAgb3B0aW9uczogdGhpcy5pbm5lck9wdGlvbnMsXG4gICAgICAgIGZpbHRlcmVkT3B0aW9uczogdGhpcy5maWx0ZXJlZE9wdGlvbnMsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkVudGVyQnV0dG9uKCRldmVudCkge1xuICAgIHRoaXMuZW50ZXJCdXR0b24uZW1pdCgkZXZlbnQpO1xuICB9IFxuXG4gIHNldEZvY3VzKCkge1xuICAgIHRoaXMudGVybUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIG9wZW5QYW5lbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZVRyaWdnZXIub3BlblBhbmVsKCk7XG4gIH1cblxuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlVHJpZ2dlci5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICBvbkJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY2xlYXIocmVvcGVuID0gZmFsc2UpIHtcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQuc2V0VmFsdWUoJycpO1xuICAgIGlmICh0aGlzLndyaXR0ZW5WYWx1ZSA9PT0gdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5yZXNldElucHV0Q29udHJvbCgpO1xuICAgIH1cbiAgICBpZiAocmVvcGVuKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICAgIH0sIDEpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLndyaXR0ZW5WYWx1ZTtcbiAgICB0aGlzLnNldElubmVyVmFsdWUodGhpcy53cml0dGVuVmFsdWUpO1xuICAgIHRoaXMucmVzZXRJbnB1dENvbnRyb2woKTtcbiAgfVxuXG4gIGV4dHJhY3RMYWJlbDogTGFiZWxGdW5jdGlvbiA9IChpdGVtOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIGxldCBsYWJlbCA9IGl0ZW07IC8vIHVzZSB0aGUgb2JqZWN0IGl0c2VsZiBpZiBubyBsYWJlbCBmdW5jdGlvbiBvciBhdHRyaWJ1dGUgaXMgcHJvdmlkZWRcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKHRoaXMubGFiZWxGbikgeyAvLyBVc2UgY3VzdG9tIGxhYmVsIGZ1bmN0aW9uIGlmIHByb3ZpZGVkXG4gICAgICAgIGxhYmVsID0gdGhpcy5sYWJlbEZuKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxhYmVsQXR0cikgeyAvLyBVc2Ugb2JqZWN0IGxhYmVsIGF0dHJpYnV0ZSBpZiBwcm92aWRlZFxuICAgICAgICBsYWJlbCA9IGl0ZW1bdGhpcy5sYWJlbEF0dHJdIHx8IHVuZGVmaW5lZDtcblxuICAgICAgfVxuICAgIH1cbiAgICBsYWJlbCA9IHRoaXMuZW5zdXJlU3RyaW5nKGxhYmVsKTtcbiAgICByZXR1cm4gbGFiZWw7XG4gIH1cblxuICBwcml2YXRlIGxvYWRSZW1vdGVPYmplY3RCeVdyaXR0ZW5WYWx1ZSh3cml0dGVuVmFsdWU6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHdyaXR0ZW5WYWx1ZSkge1xuICAgICAgICB0aGlzLnNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHdyaXR0ZW5WYWx1ZSlcbiAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh3cml0dGVuVmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUod3JpdHRlblZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0UmVxdWlyZWREYXRhKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBlcnJvcjogc3RyaW5nO1xuICAgICAgaWYgKCF0aGlzLmVuZHBvaW50ICYmICF0aGlzLm9wdGlvbnMgJiYgIXRoaXMuY3VzdG9tRmV0Y2hGdW5jdGlvbikge1xuICAgICAgICBlcnJvciA9ICdObyBlbmRwb2ludCB8IG9wdGlvbnMgfCBjdXN0b21GZXRjaEZ1bmN0aW9uIHNldC4gWW91IG11c3QgcHJvdmlkZSBvbmUgb2YgdGhlbSB0byBiZSBhYmxlIHRvIHVzZSB0aGUgQXV0b2NvbXBsZXRlJztcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICB0aGlzLnJhaXNlRXJyb3IoZXJyb3IpO1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldElucHV0Q29udHJvbCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5tYXJrQXNVbnRvdWNoZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdFZhbHVlOiBWYWx1ZUZ1bmN0aW9uID0gKGl0ZW06IGFueSk6IGFueSA9PiB7XG4gICAgbGV0IHZhbHVlID0gaXRlbTsgLy8gdXNlIHRoZSBvYmplY3QgaXRzZWxmIGlmIG5vIHZhbHVlIGZ1bmN0aW9uIG9yIGF0dHJpYnV0ZSBpcyBwcm92aWRlZFxuICAgIGlmIChpdGVtKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZUZuKSB7IC8vIFVzZSBjdXN0b20gdmFsdWUgZnVuY3Rpb24gaWYgcHJvdmlkZWRcbiAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlRm4oaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWVBdHRyKSB7IC8vIFVzZSBvYmplY3QgdmFsdWUgYXR0cmlidXRlIGlmIHByb3ZpZGVkXG4gICAgICAgIHZhbHVlID0gaXRlbVt0aGlzLnZhbHVlQXR0cl0gfHwgdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGNvbXBhcmVBc1N0cmluZyh2MSwgdjIpIHtcbiAgICBjb25zdCBzdHJpbmcxID0gdGhpcy5lbnN1cmVTdHJpbmcodjEpO1xuICAgIGNvbnN0IHN0cmluZzIgPSB0aGlzLmVuc3VyZVN0cmluZyh2Mik7XG4gICAgcmV0dXJuIHN0cmluZzEgPT09IHN0cmluZzI7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVN0cmluZyh2KSB7XG4gICAgaWYgKHR5cGVvZiB2ICE9PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGlzTmFOKHYpKSB7XG4gICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHYgPSBgJHt2fWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb09wdGlvbnMoKSB7XG4gICAgdGhpcy5vcHRpb25zJFN1YnNjcmlwdGlvbiA9IHRoaXMub3B0aW9ucyQuc3Vic2NyaWJlKG9wdGlvbnMgPT4ge1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbm5lclZhbHVlKHY6IGFueSkge1xuICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlQmFzZWRPbklubmVyVmFsdWUodik7XG4gIH1cblxuICBwcml2YXRlIHNldElucHV0VmFsdWVCYXNlZE9uSW5uZXJWYWx1ZSh2OiBhbnkpIHtcbiAgICBjb25zdCBvcHRpb24gPSB0aGlzLmdldE9wdGlvbkJhc2VkT25WYWx1ZSh2KTtcbiAgICBjb25zdCBsYWJlbCA9IHRoaXMuZXh0cmFjdExhYmVsKG9wdGlvbik7XG4gICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5zZXRWYWx1ZShvcHRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcHRpb25CYXNlZE9uVmFsdWUodjogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJPcHRpb25zLmZpbmQoaXRlbSA9PiB7XG4gICAgICBjb25zdCBpdGVtVmFsdWUgPSB0aGlzLmV4dHJhY3RWYWx1ZShpdGVtKTtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBc1N0cmluZyhpdGVtVmFsdWUsIHYpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVJbnB1dCgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0ID0gdGhpcy5mb3JtQnVpbGRlci5jb250cm9sKHt2YWx1ZTogdW5kZWZpbmVkLCBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCwgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWR9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9TZWFyY2hBbmRTZXRPcHRpb25zT2JzZXJ2YWJsZSgpIHtcbiAgICB0aGlzLm9wdGlvbnMkID0gdGhpcy5hdXRvY29tcGxldGVJbnB1dC52YWx1ZUNoYW5nZXNcbiAgICAucGlwZShcbiAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBzd2l0Y2hNYXAoKHRleHRTZWFyY2g6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBpc1N0cmluZ1Rlcm0gPSB0eXBlb2YgdGV4dFNlYXJjaCA9PT0gJ3N0cmluZyc7XG4gICAgICAgIGlmIChpc1N0cmluZ1Rlcm0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hCYXNlZEZldGNoaW5nVHlwZSh0ZXh0U2VhcmNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2YodGhpcy5pbm5lck9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaEJhc2VkRmV0Y2hpbmdUeXBlKHRleHRTZWFyY2gpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoSW5Mb2NhbE9wdGlvbnModGV4dFNlYXJjaCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1c3RvbUZldGNoRnVuY3Rpb24odGV4dFNlYXJjaClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKG9wdGlvbnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJvZHkgPSB0ZXh0U2VhcmNoID8geyB0ZXh0U2VhcmNoIH0gOiB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldDxhbnlbXT4odGhpcy5lbmRwb2ludCwgYm9keSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKChvcHRpb25zOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbm5lck9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvT3B0aW9ucygpIHtcbiAgICB0aGlzLm9wdGlvbnMkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHNlYXJjaEluTG9jYWxPcHRpb25zKHRlcm06IHN0cmluZykge1xuICAgIGNvbnN0IHRlcm1TdHJpbmcgPSBgJHt0ZXJtfWA7XG5cbiAgICBsZXQgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnM7XG5cbiAgICBpZiAodGVybVN0cmluZykge1xuICAgICAgZmlsdGVyZWREYXRhID0gdGhpcy5pbm5lck9wdGlvbnNcbiAgICAgIC5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsOiBzdHJpbmcgPSB0aGlzLmV4dHJhY3RMYWJlbChpdGVtKTtcbiAgICAgICAgY29uc3QgbG93ZXJDYXNlTGFiZWwgPSBsYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBsb3dlckNhc2VUZXJtID0gdGVybVN0cmluZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbG93ZXJDYXNlTGFiZWwuc2VhcmNoKGxvd2VyQ2FzZVRlcm0pID49IDA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2YoZmlsdGVyZWREYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgcmFpc2VFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBEZWNBdXRvY29tcGxldGVDb21wb25lbnQgRXJyb3I6OiBUaGUgYXV0b2NvbXBsZXRlIHdpdGggbmFtZSBcIiR7dGhpcy5uYW1lfVwiIGhhZCB0aGUgZm9sbG93IHByb2JsZW06ICR7ZXJyb3J9YCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVBY2NvdW50Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtYWNjb3VudCcsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bY3VzdG9tRmV0Y2hGdW5jdGlvbl09XCJjdXN0b21GZXRjaEZ1bmN0aW9uXCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludCA9ICdhY2NvdW50cy9vcHRpb25zJztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIHR5cGVzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ0FjY291bnQgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdBY2NvdW50IGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlXG4gICkge31cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY3VzdG9tRmV0Y2hGdW5jdGlvbiA9ICh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwcyA9IFtcbiAgICAgIHtcbiAgICAgICAgZmlsdGVyczogW1xuICAgICAgICAgIHsgcHJvcGVydHk6ICduYW1lJywgdmFsdWU6IHRleHRTZWFyY2ggfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXTtcblxuICAgIGlmICh0aGlzLnR5cGVzKSB7XG5cbiAgICAgIGZpbHRlckdyb3Vwc1swXS5maWx0ZXJzLnB1c2goeyBwcm9wZXJ0eTogJ3JvbGUuJGlkJywgdmFsdWU6IHRoaXMudHlwZXMgfSk7XG5cbiAgICB9XG5cblxuICAgIHJldHVybiB0aGlzLmRlY29yYUFwaS5nZXQodGhpcy5lbmRwb2ludCwgeyBmaWx0ZXJHcm91cHMgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJy4vLi4vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLWFjY291bnQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZUFjY291bnRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlQWNjb3VudENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlQWNjb3VudE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0NPTVBBTllfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlQ29tcGFueUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLWNvbXBhbnknLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlXG5bZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbltuYW1lXT1cIm5hbWVcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuW2VuZHBvaW50XT1cImVuZHBvaW50XCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsRm5dPVwibGFiZWxGblwiXG5bdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9DT01QQU5ZX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvbXBhbnlDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgZW5kcG9pbnQgPSAnY29tcGFuaWVzL29wdGlvbnMnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnQ29tcGFueSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0NvbXBhbnkgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIGxhYmVsRm4oY29tcGFueSkge1xuICAgIHJldHVybiBgJHtjb21wYW55LnZhbHVlfSAjJHtjb21wYW55LmtleX1gO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtY29tcGFueS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjQXV0b2NvbXBsZXRlQ29tcGFueUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNBdXRvY29tcGxldGVDb21wYW55Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb21wYW55TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5cbi8vICBSZXR1cm4gYW4gZW1wdHkgZnVuY3Rpb24gdG8gYmUgdXNlZCBhcyBkZWZhdWx0IHRyaWdnZXIgZnVuY3Rpb25zXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuLy8gIFVzZWQgdG8gZXh0ZW5kIG5nRm9ybXMgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgQVVUT0NPTVBMRVRFX0NPVU5UUllfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQXV0b2NvbXBsZXRlQ291bnRyeUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLWNvdW50cnknLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlXG5bZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbltuYW1lXT1cIm5hbWVcIlxuW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbihvcHRpb25TZWxlY3RlZCk9XCJvcHRpb25TZWxlY3RlZC5lbWl0KCRldmVudClcIlxuW29wdGlvbnNdPVwiKGNvdW50cmllcyQgfCBhc3luYylcIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bbGFiZWxGbl09XCJsYWJlbEZuXCJcblt2YWx1ZUZuXT1cInZhbHVlRm5cIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfQ09VTlRSWV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGNvdW50cmllcyQ6IE9ic2VydmFibGU8YW55PjtcblxuICBASW5wdXQoKSBsYW5nOiAnZW4nIHwgJ3B0LWJyJyA9ICdlbic7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdDb3VudHJ5IGF1dG9jb21wbGV0ZSc7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnQ291bnRyeSBhdXRvY29tcGxldGUnO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvdW50cmllcyQgPSBvZihGQUtFX0RBVEEpO1xuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGxhYmVsRm4gPSAoaXRlbSkgPT4ge1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5uYW1lIDogaXRlbTtcbiAgfVxuXG4gIHZhbHVlRm4gPSAoaXRlbSkgPT4ge1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5jb2RlIDogaXRlbTtcbiAgfVxuXG59XG5cbmNvbnN0IEZBS0VfREFUQSA9IFt7ICdjb2RlJzogJ0FEJywgJ25hbWUnOiAnQW5kb3JyYScgfSwgeyAnY29kZSc6ICdBRScsICduYW1lJzogJ1VuaXRlZCBBcmFiIEVtaXJhdGVzJyB9LCB7ICdjb2RlJzogJ0FGJywgJ25hbWUnOiAnQWZnaGFuaXN0YW4nIH0sIHsgJ2NvZGUnOiAnQUcnLCAnbmFtZSc6ICdBbnRpZ3VhIGFuZCBCYXJidWRhJyB9LCB7ICdjb2RlJzogJ0FJJywgJ25hbWUnOiAnQW5ndWlsbGEnIH0sIHsgJ2NvZGUnOiAnQUwnLCAnbmFtZSc6ICdBbGJhbmlhJyB9LCB7ICdjb2RlJzogJ0FNJywgJ25hbWUnOiAnQXJtZW5pYScgfSwgeyAnY29kZSc6ICdBTicsICduYW1lJzogJ05ldGhlcmxhbmRzIEFudGlsbGVzJyB9LCB7ICdjb2RlJzogJ0FPJywgJ25hbWUnOiAnQW5nb2xhJyB9LCB7ICdjb2RlJzogJ0FRJywgJ25hbWUnOiAnQW50YXJjdGljYScgfSwgeyAnY29kZSc6ICdBUicsICduYW1lJzogJ0FyZ2VudGluYScgfSwgeyAnY29kZSc6ICdBUycsICduYW1lJzogJ0FtZXJpY2FuIFNhbW9hJyB9LCB7ICdjb2RlJzogJ0FUJywgJ25hbWUnOiAnQXVzdHJpYScgfSwgeyAnY29kZSc6ICdBVScsICduYW1lJzogJ0F1c3RyYWxpYScgfSwgeyAnY29kZSc6ICdBVycsICduYW1lJzogJ0FydWJhJyB9LCB7ICdjb2RlJzogJ0FYJywgJ25hbWUnOiAnw4PChWxhbmQgSXNsYW5kcycgfSwgeyAnY29kZSc6ICdBWicsICduYW1lJzogJ0F6ZXJiYWlqYW4nIH0sIHsgJ2NvZGUnOiAnQkEnLCAnbmFtZSc6ICdCb3NuaWEgYW5kIEhlcnplZ292aW5hJyB9LCB7ICdjb2RlJzogJ0JCJywgJ25hbWUnOiAnQmFyYmFkb3MnIH0sIHsgJ2NvZGUnOiAnQkQnLCAnbmFtZSc6ICdCYW5nbGFkZXNoJyB9LCB7ICdjb2RlJzogJ0JFJywgJ25hbWUnOiAnQmVsZ2l1bScgfSwgeyAnY29kZSc6ICdCRicsICduYW1lJzogJ0J1cmtpbmEgRmFzbycgfSwgeyAnY29kZSc6ICdCRycsICduYW1lJzogJ0J1bGdhcmlhJyB9LCB7ICdjb2RlJzogJ0JIJywgJ25hbWUnOiAnQmFocmFpbicgfSwgeyAnY29kZSc6ICdCSScsICduYW1lJzogJ0J1cnVuZGknIH0sIHsgJ2NvZGUnOiAnQkonLCAnbmFtZSc6ICdCZW5pbicgfSwgeyAnY29kZSc6ICdCTCcsICduYW1lJzogJ1NhaW50IEJhcnRow4PCqWxlbXknIH0sIHsgJ2NvZGUnOiAnQk0nLCAnbmFtZSc6ICdCZXJtdWRhJyB9LCB7ICdjb2RlJzogJ0JOJywgJ25hbWUnOiAnQnJ1bmVpJyB9LCB7ICdjb2RlJzogJ0JPJywgJ25hbWUnOiAnQm9saXZpYScgfSwgeyAnY29kZSc6ICdCUScsICduYW1lJzogJ0JvbmFpcmUsIFNpbnQgRXVzdGF0aXVzIGFuZCBTYWJhJyB9LCB7ICdjb2RlJzogJ0JSJywgJ25hbWUnOiAnQnJhemlsJyB9LCB7ICdjb2RlJzogJ0JTJywgJ25hbWUnOiAnQmFoYW1hcycgfSwgeyAnY29kZSc6ICdCVCcsICduYW1lJzogJ0JodXRhbicgfSwgeyAnY29kZSc6ICdCVicsICduYW1lJzogJ0JvdXZldCBJc2xhbmQnIH0sIHsgJ2NvZGUnOiAnQlcnLCAnbmFtZSc6ICdCb3Rzd2FuYScgfSwgeyAnY29kZSc6ICdCWScsICduYW1lJzogJ0JlbGFydXMnIH0sIHsgJ2NvZGUnOiAnQlonLCAnbmFtZSc6ICdCZWxpemUnIH0sIHsgJ2NvZGUnOiAnQ0EnLCAnbmFtZSc6ICdDYW5hZGEnIH0sIHsgJ2NvZGUnOiAnQ0MnLCAnbmFtZSc6ICdDb2NvcyBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0NEJywgJ25hbWUnOiAnVGhlIERlbW9jcmF0aWMgUmVwdWJsaWMgT2YgQ29uZ28nIH0sIHsgJ2NvZGUnOiAnQ0YnLCAnbmFtZSc6ICdDZW50cmFsIEFmcmljYW4gUmVwdWJsaWMnIH0sIHsgJ2NvZGUnOiAnQ0cnLCAnbmFtZSc6ICdDb25nbycgfSwgeyAnY29kZSc6ICdDSCcsICduYW1lJzogJ1N3aXR6ZXJsYW5kJyB9LCB7ICdjb2RlJzogJ0NJJywgJ25hbWUnOiAnQ8ODwrR0ZSBkXFwnSXZvaXJlJyB9LCB7ICdjb2RlJzogJ0NLJywgJ25hbWUnOiAnQ29vayBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0NMJywgJ25hbWUnOiAnQ2hpbGUnIH0sIHsgJ2NvZGUnOiAnQ00nLCAnbmFtZSc6ICdDYW1lcm9vbicgfSwgeyAnY29kZSc6ICdDTicsICduYW1lJzogJ0NoaW5hJyB9LCB7ICdjb2RlJzogJ0NPJywgJ25hbWUnOiAnQ29sb21iaWEnIH0sIHsgJ2NvZGUnOiAnQ1InLCAnbmFtZSc6ICdDb3N0YSBSaWNhJyB9LCB7ICdjb2RlJzogJ0NVJywgJ25hbWUnOiAnQ3ViYScgfSwgeyAnY29kZSc6ICdDVicsICduYW1lJzogJ0NhcGUgVmVyZGUnIH0sIHsgJ2NvZGUnOiAnQ1cnLCAnbmFtZSc6ICdDdXJhw4PCp2FvJyB9LCB7ICdjb2RlJzogJ0NYJywgJ25hbWUnOiAnQ2hyaXN0bWFzIElzbGFuZCcgfSwgeyAnY29kZSc6ICdDWScsICduYW1lJzogJ0N5cHJ1cycgfSwgeyAnY29kZSc6ICdDWicsICduYW1lJzogJ0N6ZWNoIFJlcHVibGljJyB9LCB7ICdjb2RlJzogJ0RFJywgJ25hbWUnOiAnR2VybWFueScgfSwgeyAnY29kZSc6ICdESicsICduYW1lJzogJ0RqaWJvdXRpJyB9LCB7ICdjb2RlJzogJ0RLJywgJ25hbWUnOiAnRGVubWFyaycgfSwgeyAnY29kZSc6ICdETScsICduYW1lJzogJ0RvbWluaWNhJyB9LCB7ICdjb2RlJzogJ0RPJywgJ25hbWUnOiAnRG9taW5pY2FuIFJlcHVibGljJyB9LCB7ICdjb2RlJzogJ0RaJywgJ25hbWUnOiAnQWxnZXJpYScgfSwgeyAnY29kZSc6ICdFQycsICduYW1lJzogJ0VjdWFkb3InIH0sIHsgJ2NvZGUnOiAnRUUnLCAnbmFtZSc6ICdFc3RvbmlhJyB9LCB7ICdjb2RlJzogJ0VHJywgJ25hbWUnOiAnRWd5cHQnIH0sIHsgJ2NvZGUnOiAnRUgnLCAnbmFtZSc6ICdXZXN0ZXJuIFNhaGFyYScgfSwgeyAnY29kZSc6ICdFUicsICduYW1lJzogJ0VyaXRyZWEnIH0sIHsgJ2NvZGUnOiAnRVMnLCAnbmFtZSc6ICdTcGFpbicgfSwgeyAnY29kZSc6ICdFVCcsICduYW1lJzogJ0V0aGlvcGlhJyB9LCB7ICdjb2RlJzogJ0ZJJywgJ25hbWUnOiAnRmlubGFuZCcgfSwgeyAnY29kZSc6ICdGSicsICduYW1lJzogJ0ZpamknIH0sIHsgJ2NvZGUnOiAnRksnLCAnbmFtZSc6ICdGYWxrbGFuZCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0ZNJywgJ25hbWUnOiAnTWljcm9uZXNpYScgfSwgeyAnY29kZSc6ICdGTycsICduYW1lJzogJ0Zhcm9lIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnRlInLCAnbmFtZSc6ICdGcmFuY2UnIH0sIHsgJ2NvZGUnOiAnR0EnLCAnbmFtZSc6ICdHYWJvbicgfSwgeyAnY29kZSc6ICdHQicsICduYW1lJzogJ1VuaXRlZCBLaW5nZG9tJyB9LCB7ICdjb2RlJzogJ0dEJywgJ25hbWUnOiAnR3JlbmFkYScgfSwgeyAnY29kZSc6ICdHRScsICduYW1lJzogJ0dlb3JnaWEnIH0sIHsgJ2NvZGUnOiAnR0YnLCAnbmFtZSc6ICdGcmVuY2ggR3VpYW5hJyB9LCB7ICdjb2RlJzogJ0dHJywgJ25hbWUnOiAnR3Vlcm5zZXknIH0sIHsgJ2NvZGUnOiAnR0gnLCAnbmFtZSc6ICdHaGFuYScgfSwgeyAnY29kZSc6ICdHSScsICduYW1lJzogJ0dpYnJhbHRhcicgfSwgeyAnY29kZSc6ICdHTCcsICduYW1lJzogJ0dyZWVubGFuZCcgfSwgeyAnY29kZSc6ICdHTScsICduYW1lJzogJ0dhbWJpYScgfSwgeyAnY29kZSc6ICdHTicsICduYW1lJzogJ0d1aW5lYScgfSwgeyAnY29kZSc6ICdHUCcsICduYW1lJzogJ0d1YWRlbG91cGUnIH0sIHsgJ2NvZGUnOiAnR1EnLCAnbmFtZSc6ICdFcXVhdG9yaWFsIEd1aW5lYScgfSwgeyAnY29kZSc6ICdHUicsICduYW1lJzogJ0dyZWVjZScgfSwgeyAnY29kZSc6ICdHUycsICduYW1lJzogJ1NvdXRoIEdlb3JnaWEgQW5kIFRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ0dUJywgJ25hbWUnOiAnR3VhdGVtYWxhJyB9LCB7ICdjb2RlJzogJ0dVJywgJ25hbWUnOiAnR3VhbScgfSwgeyAnY29kZSc6ICdHVycsICduYW1lJzogJ0d1aW5lYS1CaXNzYXUnIH0sIHsgJ2NvZGUnOiAnR1knLCAnbmFtZSc6ICdHdXlhbmEnIH0sIHsgJ2NvZGUnOiAnSEsnLCAnbmFtZSc6ICdIb25nIEtvbmcnIH0sIHsgJ2NvZGUnOiAnSE0nLCAnbmFtZSc6ICdIZWFyZCBJc2xhbmQgQW5kIE1jRG9uYWxkIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnSE4nLCAnbmFtZSc6ICdIb25kdXJhcycgfSwgeyAnY29kZSc6ICdIUicsICduYW1lJzogJ0Nyb2F0aWEnIH0sIHsgJ2NvZGUnOiAnSFQnLCAnbmFtZSc6ICdIYWl0aScgfSwgeyAnY29kZSc6ICdIVScsICduYW1lJzogJ0h1bmdhcnknIH0sIHsgJ2NvZGUnOiAnSUQnLCAnbmFtZSc6ICdJbmRvbmVzaWEnIH0sIHsgJ2NvZGUnOiAnSUUnLCAnbmFtZSc6ICdJcmVsYW5kJyB9LCB7ICdjb2RlJzogJ0lMJywgJ25hbWUnOiAnSXNyYWVsJyB9LCB7ICdjb2RlJzogJ0lNJywgJ25hbWUnOiAnSXNsZSBPZiBNYW4nIH0sIHsgJ2NvZGUnOiAnSU4nLCAnbmFtZSc6ICdJbmRpYScgfSwgeyAnY29kZSc6ICdJTycsICduYW1lJzogJ0JyaXRpc2ggSW5kaWFuIE9jZWFuIFRlcnJpdG9yeScgfSwgeyAnY29kZSc6ICdJUScsICduYW1lJzogJ0lyYXEnIH0sIHsgJ2NvZGUnOiAnSVInLCAnbmFtZSc6ICdJcmFuJyB9LCB7ICdjb2RlJzogJ0lTJywgJ25hbWUnOiAnSWNlbGFuZCcgfSwgeyAnY29kZSc6ICdJVCcsICduYW1lJzogJ0l0YWx5JyB9LCB7ICdjb2RlJzogJ0pFJywgJ25hbWUnOiAnSmVyc2V5JyB9LCB7ICdjb2RlJzogJ0pNJywgJ25hbWUnOiAnSmFtYWljYScgfSwgeyAnY29kZSc6ICdKTycsICduYW1lJzogJ0pvcmRhbicgfSwgeyAnY29kZSc6ICdKUCcsICduYW1lJzogJ0phcGFuJyB9LCB7ICdjb2RlJzogJ0tFJywgJ25hbWUnOiAnS2VueWEnIH0sIHsgJ2NvZGUnOiAnS0cnLCAnbmFtZSc6ICdLeXJneXpzdGFuJyB9LCB7ICdjb2RlJzogJ0tIJywgJ25hbWUnOiAnQ2FtYm9kaWEnIH0sIHsgJ2NvZGUnOiAnS0knLCAnbmFtZSc6ICdLaXJpYmF0aScgfSwgeyAnY29kZSc6ICdLTScsICduYW1lJzogJ0NvbW9yb3MnIH0sIHsgJ2NvZGUnOiAnS04nLCAnbmFtZSc6ICdTYWludCBLaXR0cyBBbmQgTmV2aXMnIH0sIHsgJ2NvZGUnOiAnS1AnLCAnbmFtZSc6ICdOb3J0aCBLb3JlYScgfSwgeyAnY29kZSc6ICdLUicsICduYW1lJzogJ1NvdXRoIEtvcmVhJyB9LCB7ICdjb2RlJzogJ0tXJywgJ25hbWUnOiAnS3V3YWl0JyB9LCB7ICdjb2RlJzogJ0tZJywgJ25hbWUnOiAnQ2F5bWFuIElzbGFuZHMnIH0sIHsgJ2NvZGUnOiAnS1onLCAnbmFtZSc6ICdLYXpha2hzdGFuJyB9LCB7ICdjb2RlJzogJ0xBJywgJ25hbWUnOiAnTGFvcycgfSwgeyAnY29kZSc6ICdMQicsICduYW1lJzogJ0xlYmFub24nIH0sIHsgJ2NvZGUnOiAnTEMnLCAnbmFtZSc6ICdTYWludCBMdWNpYScgfSwgeyAnY29kZSc6ICdMSScsICduYW1lJzogJ0xpZWNodGVuc3RlaW4nIH0sIHsgJ2NvZGUnOiAnTEsnLCAnbmFtZSc6ICdTcmkgTGFua2EnIH0sIHsgJ2NvZGUnOiAnTFInLCAnbmFtZSc6ICdMaWJlcmlhJyB9LCB7ICdjb2RlJzogJ0xTJywgJ25hbWUnOiAnTGVzb3RobycgfSwgeyAnY29kZSc6ICdMVCcsICduYW1lJzogJ0xpdGh1YW5pYScgfSwgeyAnY29kZSc6ICdMVScsICduYW1lJzogJ0x1eGVtYm91cmcnIH0sIHsgJ2NvZGUnOiAnTFYnLCAnbmFtZSc6ICdMYXR2aWEnIH0sIHsgJ2NvZGUnOiAnTFknLCAnbmFtZSc6ICdMaWJ5YScgfSwgeyAnY29kZSc6ICdNQScsICduYW1lJzogJ01vcm9jY28nIH0sIHsgJ2NvZGUnOiAnTUMnLCAnbmFtZSc6ICdNb25hY28nIH0sIHsgJ2NvZGUnOiAnTUQnLCAnbmFtZSc6ICdNb2xkb3ZhJyB9LCB7ICdjb2RlJzogJ01FJywgJ25hbWUnOiAnTW9udGVuZWdybycgfSwgeyAnY29kZSc6ICdNRicsICduYW1lJzogJ1NhaW50IE1hcnRpbicgfSwgeyAnY29kZSc6ICdNRycsICduYW1lJzogJ01hZGFnYXNjYXInIH0sIHsgJ2NvZGUnOiAnTUgnLCAnbmFtZSc6ICdNYXJzaGFsbCBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ01LJywgJ25hbWUnOiAnTWFjZWRvbmlhJyB9LCB7ICdjb2RlJzogJ01MJywgJ25hbWUnOiAnTWFsaScgfSwgeyAnY29kZSc6ICdNTScsICduYW1lJzogJ015YW5tYXInIH0sIHsgJ2NvZGUnOiAnTU4nLCAnbmFtZSc6ICdNb25nb2xpYScgfSwgeyAnY29kZSc6ICdNTycsICduYW1lJzogJ01hY2FvJyB9LCB7ICdjb2RlJzogJ01QJywgJ25hbWUnOiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ01RJywgJ25hbWUnOiAnTWFydGluaXF1ZScgfSwgeyAnY29kZSc6ICdNUicsICduYW1lJzogJ01hdXJpdGFuaWEnIH0sIHsgJ2NvZGUnOiAnTVMnLCAnbmFtZSc6ICdNb250c2VycmF0JyB9LCB7ICdjb2RlJzogJ01UJywgJ25hbWUnOiAnTWFsdGEnIH0sIHsgJ2NvZGUnOiAnTVUnLCAnbmFtZSc6ICdNYXVyaXRpdXMnIH0sIHsgJ2NvZGUnOiAnTVYnLCAnbmFtZSc6ICdNYWxkaXZlcycgfSwgeyAnY29kZSc6ICdNVycsICduYW1lJzogJ01hbGF3aScgfSwgeyAnY29kZSc6ICdNWCcsICduYW1lJzogJ01leGljbycgfSwgeyAnY29kZSc6ICdNWScsICduYW1lJzogJ01hbGF5c2lhJyB9LCB7ICdjb2RlJzogJ01aJywgJ25hbWUnOiAnTW96YW1iaXF1ZScgfSwgeyAnY29kZSc6ICdOQScsICduYW1lJzogJ05hbWliaWEnIH0sIHsgJ2NvZGUnOiAnTkMnLCAnbmFtZSc6ICdOZXcgQ2FsZWRvbmlhJyB9LCB7ICdjb2RlJzogJ05FJywgJ25hbWUnOiAnTmlnZXInIH0sIHsgJ2NvZGUnOiAnTkYnLCAnbmFtZSc6ICdOb3Jmb2xrIElzbGFuZCcgfSwgeyAnY29kZSc6ICdORycsICduYW1lJzogJ05pZ2VyaWEnIH0sIHsgJ2NvZGUnOiAnTkknLCAnbmFtZSc6ICdOaWNhcmFndWEnIH0sIHsgJ2NvZGUnOiAnTkwnLCAnbmFtZSc6ICdOZXRoZXJsYW5kcycgfSwgeyAnY29kZSc6ICdOTycsICduYW1lJzogJ05vcndheScgfSwgeyAnY29kZSc6ICdOUCcsICduYW1lJzogJ05lcGFsJyB9LCB7ICdjb2RlJzogJ05SJywgJ25hbWUnOiAnTmF1cnUnIH0sIHsgJ2NvZGUnOiAnTlUnLCAnbmFtZSc6ICdOaXVlJyB9LCB7ICdjb2RlJzogJ05aJywgJ25hbWUnOiAnTmV3IFplYWxhbmQnIH0sIHsgJ2NvZGUnOiAnT00nLCAnbmFtZSc6ICdPbWFuJyB9LCB7ICdjb2RlJzogJ1BBJywgJ25hbWUnOiAnUGFuYW1hJyB9LCB7ICdjb2RlJzogJ1BFJywgJ25hbWUnOiAnUGVydScgfSwgeyAnY29kZSc6ICdQRicsICduYW1lJzogJ0ZyZW5jaCBQb2x5bmVzaWEnIH0sIHsgJ2NvZGUnOiAnUEcnLCAnbmFtZSc6ICdQYXB1YSBOZXcgR3VpbmVhJyB9LCB7ICdjb2RlJzogJ1BIJywgJ25hbWUnOiAnUGhpbGlwcGluZXMnIH0sIHsgJ2NvZGUnOiAnUEsnLCAnbmFtZSc6ICdQYWtpc3RhbicgfSwgeyAnY29kZSc6ICdQTCcsICduYW1lJzogJ1BvbGFuZCcgfSwgeyAnY29kZSc6ICdQTScsICduYW1lJzogJ1NhaW50IFBpZXJyZSBBbmQgTWlxdWVsb24nIH0sIHsgJ2NvZGUnOiAnUE4nLCAnbmFtZSc6ICdQaXRjYWlybicgfSwgeyAnY29kZSc6ICdQUicsICduYW1lJzogJ1B1ZXJ0byBSaWNvJyB9LCB7ICdjb2RlJzogJ1BTJywgJ25hbWUnOiAnUGFsZXN0aW5lJyB9LCB7ICdjb2RlJzogJ1BUJywgJ25hbWUnOiAnUG9ydHVnYWwnIH0sIHsgJ2NvZGUnOiAnUFcnLCAnbmFtZSc6ICdQYWxhdScgfSwgeyAnY29kZSc6ICdQWScsICduYW1lJzogJ1BhcmFndWF5JyB9LCB7ICdjb2RlJzogJ1FBJywgJ25hbWUnOiAnUWF0YXInIH0sIHsgJ2NvZGUnOiAnUkUnLCAnbmFtZSc6ICdSZXVuaW9uJyB9LCB7ICdjb2RlJzogJ1JPJywgJ25hbWUnOiAnUm9tYW5pYScgfSwgeyAnY29kZSc6ICdSUycsICduYW1lJzogJ1NlcmJpYScgfSwgeyAnY29kZSc6ICdSVScsICduYW1lJzogJ1J1c3NpYScgfSwgeyAnY29kZSc6ICdSVycsICduYW1lJzogJ1J3YW5kYScgfSwgeyAnY29kZSc6ICdTQScsICduYW1lJzogJ1NhdWRpIEFyYWJpYScgfSwgeyAnY29kZSc6ICdTQicsICduYW1lJzogJ1NvbG9tb24gSXNsYW5kcycgfSwgeyAnY29kZSc6ICdTQycsICduYW1lJzogJ1NleWNoZWxsZXMnIH0sIHsgJ2NvZGUnOiAnU0QnLCAnbmFtZSc6ICdTdWRhbicgfSwgeyAnY29kZSc6ICdTRScsICduYW1lJzogJ1N3ZWRlbicgfSwgeyAnY29kZSc6ICdTRycsICduYW1lJzogJ1NpbmdhcG9yZScgfSwgeyAnY29kZSc6ICdTSCcsICduYW1lJzogJ1NhaW50IEhlbGVuYScgfSwgeyAnY29kZSc6ICdTSScsICduYW1lJzogJ1Nsb3ZlbmlhJyB9LCB7ICdjb2RlJzogJ1NKJywgJ25hbWUnOiAnU3ZhbGJhcmQgQW5kIEphbiBNYXllbicgfSwgeyAnY29kZSc6ICdTSycsICduYW1lJzogJ1Nsb3Zha2lhJyB9LCB7ICdjb2RlJzogJ1NMJywgJ25hbWUnOiAnU2llcnJhIExlb25lJyB9LCB7ICdjb2RlJzogJ1NNJywgJ25hbWUnOiAnU2FuIE1hcmlubycgfSwgeyAnY29kZSc6ICdTTicsICduYW1lJzogJ1NlbmVnYWwnIH0sIHsgJ2NvZGUnOiAnU08nLCAnbmFtZSc6ICdTb21hbGlhJyB9LCB7ICdjb2RlJzogJ1NSJywgJ25hbWUnOiAnU3VyaW5hbWUnIH0sIHsgJ2NvZGUnOiAnU1MnLCAnbmFtZSc6ICdTb3V0aCBTdWRhbicgfSwgeyAnY29kZSc6ICdTVCcsICduYW1lJzogJ1NhbyBUb21lIEFuZCBQcmluY2lwZScgfSwgeyAnY29kZSc6ICdTVicsICduYW1lJzogJ0VsIFNhbHZhZG9yJyB9LCB7ICdjb2RlJzogJ1NYJywgJ25hbWUnOiAnU2ludCBNYWFydGVuIChEdXRjaCBwYXJ0KScgfSwgeyAnY29kZSc6ICdTWScsICduYW1lJzogJ1N5cmlhJyB9LCB7ICdjb2RlJzogJ1NaJywgJ25hbWUnOiAnU3dhemlsYW5kJyB9LCB7ICdjb2RlJzogJ1RDJywgJ25hbWUnOiAnVHVya3MgQW5kIENhaWNvcyBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1REJywgJ25hbWUnOiAnQ2hhZCcgfSwgeyAnY29kZSc6ICdURicsICduYW1lJzogJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcycgfSwgeyAnY29kZSc6ICdURycsICduYW1lJzogJ1RvZ28nIH0sIHsgJ2NvZGUnOiAnVEgnLCAnbmFtZSc6ICdUaGFpbGFuZCcgfSwgeyAnY29kZSc6ICdUSicsICduYW1lJzogJ1RhamlraXN0YW4nIH0sIHsgJ2NvZGUnOiAnVEsnLCAnbmFtZSc6ICdUb2tlbGF1JyB9LCB7ICdjb2RlJzogJ1RMJywgJ25hbWUnOiAnVGltb3ItTGVzdGUnIH0sIHsgJ2NvZGUnOiAnVE0nLCAnbmFtZSc6ICdUdXJrbWVuaXN0YW4nIH0sIHsgJ2NvZGUnOiAnVE4nLCAnbmFtZSc6ICdUdW5pc2lhJyB9LCB7ICdjb2RlJzogJ1RPJywgJ25hbWUnOiAnVG9uZ2EnIH0sIHsgJ2NvZGUnOiAnVFInLCAnbmFtZSc6ICdUdXJrZXknIH0sIHsgJ2NvZGUnOiAnVFQnLCAnbmFtZSc6ICdUcmluaWRhZCBhbmQgVG9iYWdvJyB9LCB7ICdjb2RlJzogJ1RWJywgJ25hbWUnOiAnVHV2YWx1JyB9LCB7ICdjb2RlJzogJ1RXJywgJ25hbWUnOiAnVGFpd2FuJyB9LCB7ICdjb2RlJzogJ1RaJywgJ25hbWUnOiAnVGFuemFuaWEnIH0sIHsgJ2NvZGUnOiAnVUEnLCAnbmFtZSc6ICdVa3JhaW5lJyB9LCB7ICdjb2RlJzogJ1VHJywgJ25hbWUnOiAnVWdhbmRhJyB9LCB7ICdjb2RlJzogJ1VNJywgJ25hbWUnOiAnVW5pdGVkIFN0YXRlcyBNaW5vciBPdXRseWluZyBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1VZJywgJ25hbWUnOiAnVXJ1Z3VheScgfSwgeyAnY29kZSc6ICdVWicsICduYW1lJzogJ1V6YmVraXN0YW4nIH0sIHsgJ2NvZGUnOiAnVkEnLCAnbmFtZSc6ICdWYXRpY2FuJyB9LCB7ICdjb2RlJzogJ1ZDJywgJ25hbWUnOiAnU2FpbnQgVmluY2VudCBBbmQgVGhlIEdyZW5hZGluZXMnIH0sIHsgJ2NvZGUnOiAnVkUnLCAnbmFtZSc6ICdWZW5lenVlbGEnIH0sIHsgJ2NvZGUnOiAnVkcnLCAnbmFtZSc6ICdCcml0aXNoIFZpcmdpbiBJc2xhbmRzJyB9LCB7ICdjb2RlJzogJ1ZJJywgJ25hbWUnOiAnVS5TLiBWaXJnaW4gSXNsYW5kcycgfSwgeyAnY29kZSc6ICdWTicsICduYW1lJzogJ1ZpZXRuYW0nIH0sIHsgJ2NvZGUnOiAnVlUnLCAnbmFtZSc6ICdWYW51YXR1JyB9LCB7ICdjb2RlJzogJ1dGJywgJ25hbWUnOiAnV2FsbGlzIEFuZCBGdXR1bmEnIH0sIHsgJ2NvZGUnOiAnV1MnLCAnbmFtZSc6ICdTYW1vYScgfSwgeyAnY29kZSc6ICdZRScsICduYW1lJzogJ1llbWVuJyB9LCB7ICdjb2RlJzogJ1lUJywgJ25hbWUnOiAnTWF5b3R0ZScgfSwgeyAnY29kZSc6ICdaQScsICduYW1lJzogJ1NvdXRoIEFmcmljYScgfSwgeyAnY29kZSc6ICdaTScsICduYW1lJzogJ1phbWJpYScgfSwgeyAnY29kZSc6ICdaVycsICduYW1lJzogJ1ppbWJhYndlJyB9XTtcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IERlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1jb3VudHJ5LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVDb3VudHJ5Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZUNvdW50cnlDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZUNvdW50cnlNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgQkFTRV9FTkRQT0lOVCA9ICdjb21wYW5pZXMvJHtjb21wYW55SWR9L2RlcGFydG1lbnRzL29wdGlvbnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9ERVBBUlRNRU5UX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1kZXBhcnRtZW50JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZW5kcG9pbnQgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgW2Rpc2FibGVkXT1cIiFjb21wYW55SWQgfHwgZGlzYWJsZWRcIlxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICBbdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4gIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX0RFUEFSVE1FTlRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDogc3RyaW5nO1xuXG4gIGxhYmVsQXR0ciA9ICd2YWx1ZSc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbXBhbnlJZCh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jb21wYW55SWQgPSB2O1xuICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25jb21wYW55SWQoKTtcbiAgfVxuXG4gIGdldCBjb21wYW55SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlJZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnRGVwYXJ0bWVudCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0RlcGFydG1lbnQgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY29tcGFueUlkOiBzdHJpbmc7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0RW5kcG9pbnRCYXNlZE9uY29tcGFueUlkKCkge1xuICAgIHRoaXMuZW5kcG9pbnQgPSAhdGhpcy5jb21wYW55SWQgPyB1bmRlZmluZWQgOiBCQVNFX0VORFBPSU5ULnJlcGxhY2UoJyR7Y29tcGFueUlkfScsIHRoaXMuY29tcGFueUlkKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVEZXBhcnRtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtZGVwYXJ0bWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY0F1dG9jb21wbGV0ZURlcGFydG1lbnRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlRGVwYXJ0bWVudE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmNvbnN0IEFVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtcm9sZScsXG4gIHRlbXBsYXRlOiBgPGRlYy1hdXRvY29tcGxldGVcbltkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG5bcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG5bY3VzdG9tRmV0Y2hGdW5jdGlvbl09XCJjdXN0b21GZXRjaEZ1bmN0aW9uXCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG5gLFxuICBzdHlsZXM6IFtdLFxuICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfUk9MRVNfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUm9sZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludCA9ICdyb2xlcy9vcHRpb25zJztcblxuICBsYWJlbEF0dHIgPSAndmFsdWUnO1xuXG4gIHZhbHVlQXR0ciA9ICdrZXknO1xuXG4gIEBJbnB1dCgpIHR5cGVzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1JvbGUgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdSb2xlIGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlXG4gICkge31cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY3VzdG9tRmV0Y2hGdW5jdGlvbiA9ICh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICBjb25zdCBzZWFyY2ggPSB0ZXh0U2VhcmNoID8geyB0ZXh0U2VhcmNoIH0gOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXMuZGVjb3JhQXBpLmdldCh0aGlzLmVuZHBvaW50LCBzZWFyY2gpXG4gICAgLnBpcGUoXG4gICAgICBtYXAocm9sZXMgPT4ge1xuICAgICAgICByZXR1cm4gcm9sZXMuZmlsdGVyKHJvbGUgPT4ge1xuICAgICAgICAgIGNvbnN0IHJvbGVUeXBlID0gKHJvbGUgJiYgcm9sZS5rZXkpID8gcm9sZS5rZXkuc3BsaXQoJy4nKVswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICByZXR1cm4gIXRoaXMudHlwZXMgPyB0cnVlIDogdGhpcy50eXBlcy5pbmRleE9mKHJvbGVUeXBlKSA+PSAwO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtcm9sZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNBdXRvY29tcGxldGVSb2xlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0F1dG9jb21wbGV0ZVJvbGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0F1dG9jb21wbGV0ZVJvbGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBCQVNFX0FVVE9DT01QTEVURV9QUk9KRUNUX0VORFBPSU5UID0gJy9sZWdhY3kvcHJvamVjdC9zZWFyY2gva2V5VmFsdWUnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9QUk9KRUNUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS1wcm9qZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiKGVuZHBvaW50ICYmIGNvbXBhbnlJZCkgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgI2F1dG9jb21wbGV0ZVxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxGbl09XCJsYWJlbEZuXCJcbiAgW25hbWVdPVwibmFtZVwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIFtjdXN0b21GZXRjaEZ1bmN0aW9uXT1cImN1c3RvbUZldGNoRnVuY3Rpb25cIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1BST0pFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDtcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgY29tcGFueUlkKHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9jb21wYW55SWQgIT09IHYpIHtcbiAgICAgIHRoaXMuX2NvbXBhbnlJZCA9IHY7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5lbmRwb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBlbnN1cmVzIGEgZGlnZXN0IGNpY2xlIGJlZm9yZSByZXNldGluZyB0aGUgZW5kcG9pbnRcbiAgICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjb21wYW55SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlJZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUHJvamVjdCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1Byb2plY3QgYXV0b2NvbXBsZXRlJztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY29tcGFueUlkOiBzdHJpbmc7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2UpIHsgfVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgQVBJXG4gICovXG5cbiAgLy8gR2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBTZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIGxhYmVsRm4oY29tcGFueSkge1xuICAgIHJldHVybiBgJHtjb21wYW55LnZhbHVlfSAjJHtjb21wYW55LmtleX1gO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGAke3ZhbHVlfWAgIT09IGAke3RoaXMudmFsdWV9YCkgeyAvLyBjb252ZXJ0IHRvIHN0cmluZyB0byBhdm9pZCBwcm9ibGVtcyBjb21wYXJpbmcgdmFsdWVzXG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0RW5kcG9pbnRCYXNlZE9uQ29tcGFueUlkKCkge1xuICAgIGlmICh0aGlzLmNvbXBhbnlJZCkge1xuICAgICAgdGhpcy5lbmRwb2ludCA9IEJBU0VfQVVUT0NPTVBMRVRFX1BST0pFQ1RfRU5EUE9JTlQgKyAnP2NvbXBhbnlJZD0nICsgdGhpcy5jb21wYW55SWQ7XG4gICAgfVxuICB9XG5cbiAgb25BdXRvY29tcGxldGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmJsdXIuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGN1c3RvbUZldGNoRnVuY3Rpb24gPSAodGV4dFNlYXJjaCk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBwYXJhbXMudGV4dFNlYXJjaCA9IHRleHRTZWFyY2g7XG4gICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKTtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkuZ2V0KHRoaXMuZW5kcG9pbnQsIHBhcmFtcylcbiAgICAucGlwZShcbiAgICAgIG1hcChwcm9qZWN0cyA9PiB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0cztcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUtcHJvamVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRGVjQXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0F1dG9jb21wbGV0ZVByb2plY3RDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVQcm9qZWN0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyAgUmV0dXJuIGFuIGVtcHR5IGZ1bmN0aW9uIHRvIGJlIHVzZWQgYXMgZGVmYXVsdCB0cmlnZ2VyIGZ1bmN0aW9uc1xuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbi8vICBVc2VkIHRvIGV4dGVuZCBuZ0Zvcm1zIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IEFVVE9DT01QTEVURV9RVU9URV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXF1b3RlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZW5kcG9pbnQgZWxzZSBmYWtlRGlzYWJsZWRcIj5cbiAgPGRlYy1hdXRvY29tcGxldGVcbiAgW2Rpc2FibGVkXT1cIiFwcm9qZWN0SWQgfHwgZGlzYWJsZWRcIlxuICBbZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuICBbbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICBbdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4gIFsobmdNb2RlbCldPVwidmFsdWVcIlxuICBbY3VzdG9tRmV0Y2hGdW5jdGlvbl09XCJjdXN0b21GZXRjaEZ1bmN0aW9uXCJcbiAgKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4gIChibHVyKT1cImJsdXIuZW1pdCgkZXZlbnQpXCI+PC9kZWMtYXV0b2NvbXBsZXRlPlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZmFrZURpc2FibGVkPlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0XG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCJcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgIFtkaXNhYmxlZF09XCJ0cnVlXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW10sXG4gIHByb3ZpZGVyczogW0FVVE9DT01QTEVURV9RVU9URV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBCQVNFX0VORFBPSU5UID0gJy9sZWdhY3kvcHJvamVjdC8ke3Byb2plY3RJZH0vcXVvdGUnO1xuXG4gIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgbGFiZWxBdHRyID0gJ3ZhbHVlJztcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgcHJvamVjdElkKHY6IHN0cmluZykge1xuICAgIHRoaXMuX3Byb2plY3RJZCA9IHY7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPblByb2plY3RJZCgpO1xuICB9XG5cbiAgZ2V0IHByb2plY3RJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdElkO1xuICB9XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbmFtZSA9ICdRdW90ZSBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1F1b3RlIGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX3Byb2plY3RJZDogc3RyaW5nO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlKSB7IH1cblxuICAvKlxuICAqKiBuZ01vZGVsIEFQSVxuICAqL1xuXG4gIC8vIEdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0RW5kcG9pbnRCYXNlZE9uUHJvamVjdElkKCkge1xuICAgIHRoaXMuZW5kcG9pbnQgPSAhdGhpcy5wcm9qZWN0SWQgPyB1bmRlZmluZWQgOiB0aGlzLkJBU0VfRU5EUE9JTlQucmVwbGFjZSgnJHtwcm9qZWN0SWR9JywgdGhpcy5wcm9qZWN0SWQpO1xuICB9XG5cbiAgY3VzdG9tRmV0Y2hGdW5jdGlvbiA9ICh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIHBhcmFtcy50ZXh0U2VhcmNoID0gdGV4dFNlYXJjaDtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPblByb2plY3RJZCgpO1xuICAgIHJldHVybiB0aGlzLmRlY29yYUFwaS5nZXQodGhpcy5lbmRwb2ludCwgcGFyYW1zKVxuICAgIC5waXBlKFxuICAgICAgbWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZS5tYXAocXVvdGVzID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBxdW90ZXMuaWQsXG4gICAgICAgICAgICB2YWx1ZTogcXVvdGVzLnByb2R1Y3RWYXJpYW50SWRcbiAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi8uLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVRdW90ZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLXF1b3RlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEZWNBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQXV0b2NvbXBsZXRlUXVvdGVDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0F1dG9jb21wbGV0ZVF1b3RlQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUXVvdGVNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWF1dG9jb21wbGV0ZS10YWdzJyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWF1dG9jb21wbGV0ZVxuW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbltyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG5bZW5kcG9pbnRdPVwiZW5kcG9pbnRcIlxuW25hbWVdPVwibmFtZVwiXG5bcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuKG9wdGlvblNlbGVjdGVkKT1cIm9wdGlvblNlbGVjdGVkLmVtaXQoJGV2ZW50KVwiXG4oZW50ZXJCdXR0b24pPVwiZW50ZXJCdXR0b24uZW1pdCgkZXZlbnQpXCJcblsobmdNb2RlbCldPVwidmFsdWVcIlxuW2xhYmVsQXR0cl09XCJsYWJlbEF0dHJcIlxuW3ZhbHVlQXR0cl09XCJ2YWx1ZUF0dHJcIlxuKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9jb21wbGV0ZVRhZ3NDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgXG4gIGVuZHBvaW50ID0gJ3RhZ3Mvb3B0aW9ucyc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgbGFiZWxBdHRyID0gJ3ZhbHVlJztcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1RhZ3MgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdUYWdzIGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBlbnRlckJ1dHRvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEF1dG9jb21wbGV0ZVRhZ3NDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS10YWdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICcuLy4uL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUubW9kdWxlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0F1dG9jb21wbGV0ZU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBdXRvY29tcGxldGVUYWdzQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBdXRvY29tcGxldGVUYWdzQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlVGFnc01vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWJyZWFkY3J1bWInLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cImRlYy1icmVhZGNydW1iLXdyYXBwZXJcIj5cblxuICA8ZGl2IGZ4RmxleD5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgPGgxPnt7ZmVhdHVyZX19PC9oMT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImJyZWFkY3J1bWJcIj5cbiAgICAgICAge3ticmVhZGNydW1ifX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGZ4RmxleCBmeEZsZXhBbGlnbj1cImNlbnRlclwiIGZ4TGF5b3V0QWxpZ249XCJlbmRcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCI+XG4gICAgICA8ZGl2IGZ4RmxleD5cbiAgICAgICAgPCEtLSBDT05URU5UICAtLT5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8IS0tIEJBQ0sgQlVUVE9OIC0tPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cImRlZmF1bHRcIiAqbmdJZj1cImJhY2tCdXR0b25QYXRoXCIgKGNsaWNrKT1cImdvQmFjaygpXCI+e3sgYmFja0xhYmVsIH19PC9idXR0b24+XG4gICAgICAgIDwhLS0gRk9SV0FSRCBCVVRUT04gLS0+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwiZGVmYXVsdFwiICpuZ0lmPVwiZm9yd2FyZEJ1dHRvblwiIChjbGljayk9XCJnb0ZvcndhcmQoKVwiPnt7IGZvcndhcmRMYWJlbCB9fTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLWJyZWFkY3J1bWItd3JhcHBlcnttYXJnaW4tYm90dG9tOjMycHh9LmRlYy1icmVhZGNydW1iLXdyYXBwZXIgaDF7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NDAwO21hcmdpbi10b3A6NHB4O21hcmdpbi1ib3R0b206NHB4fS5kZWMtYnJlYWRjcnVtYi13cmFwcGVyIC5icmVhZGNydW1ie2NvbG9yOiNhOGE4YTh9YF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0JyZWFkY3J1bWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGJhY2tCdXR0b25QYXRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJyZWFkY3J1bWI6IHN0cmluZztcbiAgQElucHV0KCkgZmVhdHVyZTogc3RyaW5nO1xuICBASW5wdXQoKSBmb3J3YXJkQnV0dG9uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGkxOG5GZWF0dXJlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGkxOG5CcmVhZGNydW1iOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgYmFja0xhYmVsID0gJ0JhY2snO1xuICBASW5wdXQoKSBmb3J3YXJkTGFiZWwgPSAnRm9yd2FyZCc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSB0cmFuc2xhdG9yOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRyYW5zbGF0ZUZlYXR1cmUoKTtcbiAgICB0aGlzLnRyYW5zbGF0ZVBhdGhzKCk7XG4gICAgdGhpcy5kZXRlY3RBbmRQYXJzZUJ1dHRvbnNDb25maWcoKTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0QW5kUGFyc2VCdXR0b25zQ29uZmlnKCkge1xuICAgIHRoaXMucGFyc2VCYWNrQnV0dG9uKCk7XG4gICAgdGhpcy5wYXJzZUZvcndhcmRCdXR0b24oKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VCYWNrQnV0dG9uKCkge1xuICAgIGlmICh0aGlzLmJhY2tCdXR0b25QYXRoICE9PSB1bmRlZmluZWQgJiYgdGhpcy5iYWNrQnV0dG9uUGF0aCAhPT0gJ2ZhbHNlJykge1xuICAgICAgdGhpcy5iYWNrQnV0dG9uUGF0aCA9IHRoaXMuYmFja0J1dHRvblBhdGggPyB0aGlzLmJhY2tCdXR0b25QYXRoIDogJy8nO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VGb3J3YXJkQnV0dG9uKCkge1xuICAgIGlmICh0aGlzLmZvcndhcmRCdXR0b24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmZvcndhcmRCdXR0b24gIT09ICdmYWxzZScpIHtcbiAgICAgIHRoaXMuZm9yd2FyZEJ1dHRvbiA9IHRoaXMuZm9yd2FyZEJ1dHRvbiA/IHRoaXMuZm9yd2FyZEJ1dHRvbiA6ICcvJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyYW5zbGF0ZUZlYXR1cmUoKSB7XG4gICAgaWYgKHRoaXMuaTE4bkJyZWFkY3J1bWIpIHtcbiAgICAgIHRoaXMuYnJlYWRjcnVtYiA9IHRoaXMuaTE4bkJyZWFkY3J1bWIubWFwKHBhdGggPT4gdGhpcy50cmFuc2xhdG9yLmluc3RhbnQocGF0aCkpLmpvaW4oJyAvICcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNsYXRlUGF0aHMoKSB7XG4gICAgaWYgKHRoaXMuaTE4bkZlYXR1cmUpIHtcbiAgICAgIHRoaXMuZmVhdHVyZSA9IHRoaXMudHJhbnNsYXRvci5pbnN0YW50KHRoaXMuaTE4bkZlYXR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBOYXZpZ2F0aW9uIE1ldGhvZHMgLy9cbiAgLy8gKioqKioqKioqKioqKioqKioqIC8vXG5cbiAgcHVibGljIGdvQmFjaygpIHtcbiAgICBpZiAodGhpcy5iYWNrQnV0dG9uUGF0aCkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuYmFja0J1dHRvblBhdGhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnb0ZvcndhcmQoKSB7XG4gICAgaWYgKHRoaXMuZm9yd2FyZEJ1dHRvbikge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuZm9yd2FyZEJ1dHRvbl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5mb3J3YXJkKCk7XG4gICAgfVxuICB9XG59XG4iLCIvLyBBbmd1bGFyIG1vZHVsZXNcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNCcmVhZGNydW1iQ29tcG9uZW50IH0gZnJvbSAnLi9icmVhZGNydW1iLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNCcmVhZGNydW1iQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNCcmVhZGNydW1iQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQnJlYWRjcnVtYk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBPbkluaXQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRGlhbG9nQWN0aW9uIH0gZnJvbSAnLi9kZWMtZGlhbG9nLm1vZGVscyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1kaWFsb2cnLFxuICB0ZW1wbGF0ZTogYDxtYXQtdG9vbGJhciBjb2xvcj1cInByaW1hcnlcIj5cblxuICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhGbGV4RmlsbCBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgPGRpdj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cInVwcGVyY2FzZVwiIG1hdC1kaWFsb2ctY2xvc2U+XG4gICAgICAgIDxtYXQtaWNvbj5hcnJvd19iYWNrPC9tYXQtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8aDE+Jm5ic3A7IHt7IHRpdGxlIH19PC9oMT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGZ4RmxleD5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiYWN0aW9uc1wiPlxuICAgICAgICAgIDxtYXQtbWVudSAjZGVjRGlhbG9nQWN0aW9uc01lbnU9XCJtYXRNZW51XCI+XG4gICAgICAgICAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgYWN0aW9uc1wiIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImFjdGlvbi5jYWxsYmFjayhjb250ZXh0KVwiPlxuICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjdGlvbi5sYWJlbFwiPnt7IGFjdGlvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaTE4bkxhYmVsXCI+e3sgYWN0aW9uLmkxOG5MYWJlbCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvbWF0LW1lbnU+XG5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwiZGVjRGlhbG9nQWN0aW9uc01lbnVcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5tb3JlX3ZlcnQ8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9tYXQtdG9vbGJhcj5cblxuPGRpdiBjbGFzcz1cImRlYy1kaWFsb2ctY2hpbGQtd3JhcHBlclwiPlxuICA8dGVtcGxhdGUgI2NoaWxkQ29udGFpbmVyPjwvdGVtcGxhdGU+XG48L2Rpdj5cblxuPGRlYy1zcGlubmVyICpuZ0lmPVwiIWxvYWRlZFwiPjwvZGVjLXNwaW5uZXI+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1kaWFsb2ctY2hpbGQtd3JhcHBlcntwYWRkaW5nOjMycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvLyBDVVJSRU5UXG4gIGNoaWxkQ29tcG9uZW50VHlwZTogQ29tcG9uZW50VHlwZTxhbnk+O1xuXG4gIGNoaWxkQ29tcG9uZW50SW5zdGFuY2U6IGFueTtcblxuICBhY3Rpb25zOiBEaWFsb2dBY3Rpb25bXSA9IFtdO1xuXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgY29udGV4dDogYW55ID0ge307XG5cbiAgbG9hZGVkOiBib29sZWFuO1xuXG4gIEBWaWV3Q2hpbGQoJ2NoaWxkQ29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIGNoaWxkQ29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIEBPdXRwdXQoKSBjaGlsZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmFjdG9yOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEZWNEaWFsb2dDb21wb25lbnQ+XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyT3BlbigpXG4gICAgLnRvUHJvbWlzZSgpXG4gICAgLnRoZW4odGhpcy5mYWN0b3J5VGhlQ29tcG9uZW50KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBmYWN0b3J5VGhlQ29tcG9uZW50ID0gKCkgPT4ge1xuXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxhbnk+ID0gdGhpcy5mYWN0b3IucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5jaGlsZENvbXBvbmVudFR5cGUpO1xuXG4gICAgY29uc3QgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMuY2hpbGRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgdGhpcy5jaGlsZENvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXG4gICAgdGhpcy5jaGlsZC5lbWl0KHRoaXMuY2hpbGRDb21wb25lbnRJbnN0YW5jZSk7XG5cbiAgICB0aGlzLmNoaWxkLmNvbXBsZXRlKCk7IC8vIHVuc3Vic3JpYmUgc3Vic2NyaWJlcnNcblxuICAgIHRoaXMuYXBwZW5kQ29udGV4dFRvSW5zdGFuY2UoY29tcG9uZW50UmVmLmluc3RhbmNlLCB0aGlzLmNvbnRleHQpO1xuXG4gICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuXG4gIH1cblxuICBwcml2YXRlIGFwcGVuZENvbnRleHRUb0luc3RhbmNlKGluc3RhbmNlOiBhbnksIGNvbnRleHQ6IGFueSkge1xuXG4gICAgaWYgKGluc3RhbmNlICYmIGNvbnRleHQpIHtcblxuICAgICAgT2JqZWN0LmtleXMoY29udGV4dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cbiAgICAgICAgaW5zdGFuY2Vba2V5XSA9IHRoaXMuY29udGV4dFtrZXldO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zcGlubmVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGVjb3JhLWxvYWRpbmctc3Bpbm5lci13cmFwcGVyXCI+XG4gIDxkaXYgY2xhc3M9XCJkZWNvcmEtbG9hZGluZy1zcGlubmVyIHRyYW5zcGFyZW50QmdcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlubmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FwXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGFsZi1jaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoYWxmLWNpcmNsZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2AuZGVjb3JhLWxvYWRpbmctc3Bpbm5lci13cmFwcGVye3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTcGlubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNwaW5uZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNTcGlubmVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY1NwaW5uZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NwaW5uZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERlY0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vZGVjLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3BlbkNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2RlYy1kaWFsb2cubW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2dcbiAgKSB7IH1cblxuXG4gIG9wZW4oY2hpbGRDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8YW55PiwgY29uZmlnOiBPcGVuQ29uZmlndXJhdGlvbikge1xuXG4gICAgY29uc3QgZGlhbG9nSW5zdGFuY2U6IE1hdERpYWxvZ1JlZjxhbnk+ID0gdGhpcy5kaWFsb2cub3BlbihcbiAgICAgIERlY0RpYWxvZ0NvbXBvbmVudCxcbiAgICAgIHtcbiAgICAgICAgd2lkdGg6IGNvbmZpZy53aWR0aCB8fCAnMTAwdncnLFxuICAgICAgICBoZWlnaHQ6IGNvbmZpZy5oZWlndGggfHwgJzEwMHZoJyxcbiAgICAgICAgcGFuZWxDbGFzczogJ2Z1bGwtc2NyZWVuLWRpYWxvZydcbiAgICAgIH1cbiAgICApO1xuXG4gICAgZGlhbG9nSW5zdGFuY2UuY29tcG9uZW50SW5zdGFuY2UuY2hpbGRDb21wb25lbnRUeXBlID0gY2hpbGRDb21wb25lbnQ7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS5hY3Rpb25zID0gY29uZmlnLmFjdGlvbnM7XG5cbiAgICBkaWFsb2dJbnN0YW5jZS5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9IGNvbmZpZy50aXRsZTtcblxuICAgIGRpYWxvZ0luc3RhbmNlLmNvbXBvbmVudEluc3RhbmNlLmNvbnRleHQgPSBjb25maWcuY29udGV4dDtcblxuICAgIHJldHVybiBkaWFsb2dJbnN0YW5jZTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4vLi4vZGVjLXNwaW5uZXIvZGVjLXNwaW5uZXIubW9kdWxlJztcblxuaW1wb3J0IHsgRGVjRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtZGlhbG9nLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBEZWNTcGlubmVyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjRGlhbG9nQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbRGVjRGlhbG9nQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbRGVjRGlhbG9nU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ01vZHVsZSB7IH1cbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaGVpa2FsdGhhZi9uZ3UtY2Fyb3VzZWwjaW5wdXQtaW50ZXJmYWNlXG5cbmV4cG9ydCBjb25zdCBDYXJvdXNlbENvbmZpZyA9IHtcbiAgZ3JpZDogeyB4czogMSwgc206IDIsIG1kOiAzLCBsZzogNCwgYWxsOiAwIH0sXG4gIHNsaWRlOiAxLFxuICBzcGVlZDogNDAwLFxuICBpbnRlcnZhbDogNDAwMCxcbiAgcG9pbnQ6IHtcbiAgICB2aXNpYmxlOiBmYWxzZVxuICB9LFxuICBjdXN0b206ICdiYW5uZXInXG59O1xuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxDb25maWcgfSBmcm9tICcuL2Nhcm91c2VsLWNvbmZpZyc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbFN0b3JlIH0gZnJvbSAnQG5ndS9jYXJvdXNlbC9zcmMvbmd1LWNhcm91c2VsL25ndS1jYXJvdXNlbC5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZ2FsbGVyeScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1nYWxsZXJ5LXdyYXBwZXJcIj5cblxuICA8ZGl2IGNsYXNzPVwiaW1hZ2UtaGlnaGxpZ2h0ZWRcIiBbZGVjSW1hZ2VdPVwiaW1hZ2VIaWdobGlnaHRcIiBbZGVjSW1hZ2VTaXplXT1cInt3aWR0aDo2MDB9XCI+PC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIiAqbmdJZj1cImltZ0V4dGVybmFsTGlua1wiPlxuXG4gICAgPGEgaHJlZj1cInt7IGltZ0V4dGVybmFsTGluayB9fVwiIHRhcmdldD1cIl9ibGFua1wiPnt7ICdsYWJlbC5pbWFnZS1saW5rJyB8IHRyYW5zbGF0ZSB9fTwvYT5cblxuICA8L2Rpdj5cblxuICA8bmd1LWNhcm91c2VsIGNsYXNzPVwiY2Fyb3VzZWwtd3JhcHBlclwiIFtpbnB1dHNdPVwiY2Fyb3VzZWxDb25maWdcIiAoaW5pdERhdGEpPVwib25Jbml0RGF0YUZuKCRldmVudClcIiAob25Nb3ZlKT1cIm9uTW92ZUZuKCRldmVudClcIj5cblxuICAgIDxuZ3UtaXRlbSBOZ3VDYXJvdXNlbEl0ZW0gKm5nRm9yPVwibGV0IGltYWdlIG9mIGltYWdlc1wiIFtjbGFzcy5hY3RpdmVdPVwiaW1hZ2UgPT0gaW1hZ2VIaWdobGlnaHRcIj5cblxuICAgICAgPGltZyBbZGVjSW1hZ2VdPVwiaW1hZ2VcIiBbZGVjSW1hZ2VTaXplXT1cInt3aWR0aDozMDAsIGhlaWdodDozMDB9XCIgKGNsaWNrKT1cIm9uU2VsZWN0SW1hZ2UoJGV2ZW50LGltYWdlKVwiPlxuXG4gICAgPC9uZ3UtaXRlbT5cblxuICAgIDxtYXQtaWNvbiBOZ3VDYXJvdXNlbFByZXYgY2xhc3M9XCJsZWZ0LXByZXZpb3VzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGlzRmlyc3R9XCI+Y2hldnJvbl9sZWZ0PC9tYXQtaWNvbj5cblxuICAgIDxtYXQtaWNvbiBOZ3VDYXJvdXNlbE5leHQgY2xhc3M9XCJyaWdodC1uZXh0XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGlzTGFzdH1cIj5jaGV2cm9uX3JpZ2h0PC9tYXQtaWNvbj5cblxuICA8L25ndS1jYXJvdXNlbD5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1nYWxsZXJ5LXdyYXBwZXJ7bWF4LXdpZHRoOjYyNHB4O292ZXJmbG93OmhpZGRlbn0uZGVjLWdhbGxlcnktd3JhcHBlciAuaW1hZ2UtaGlnaGxpZ2h0ZWR7Ym9yZGVyOjJweCBzb2xpZCAjZjVmNWY1O3dpZHRoOjYyMHB4O2hlaWdodDo2MjBweH0uZGVjLWdhbGxlcnktd3JhcHBlciBhe2ZvbnQtc2l6ZToxMHB4O3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOiM5MjkyOTI7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXJ7bWFyZ2luLXRvcDo4cHg7cGFkZGluZzowIDI0cHg7aGVpZ2h0OjEyOHB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVte2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtoZWlnaHQ6MTI0cHg7cGFkZGluZzoycHg7bWFyZ2luLXJpZ2h0OjJweH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbS5hY3RpdmUsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW06aG92ZXJ7cGFkZGluZzowO2JvcmRlcjoycHggc29saWQgIzIzMmUzOH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbSBpbWd7bWF4LXdpZHRoOjEyNHB4O2N1cnNvcjpwb2ludGVyfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0e2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O3Bvc2l0aW9uOmFic29sdXRlO3RvcDpjYWxjKDUwJSAtIDEycHgpO2N1cnNvcjpwb2ludGVyO3RleHQtc2hhZG93Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzOmhvdmVyLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0OmhvdmVye3RleHQtc2hhZG93OjAgMCA2cHggcmdiYSgwLDAsMCwuMil9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMuZGlzYWJsZWQsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQuZGlzYWJsZWR7b3BhY2l0eTouNH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cy5kaXNhYmxlZDpob3ZlciwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dC5kaXNhYmxlZDpob3Zlcnt0ZXh0LXNoYWRvdzpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3Vze2xlZnQ6MH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dHtyaWdodDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dhbGxlcnlDb21wb25lbnQge1xuXG4gIGltYWdlSGlnaGxpZ2h0OiBhbnk7XG5cbiAgYWN0aXZlSW1hZ2U6IEVsZW1lbnQ7XG5cbiAgaW1nRXh0ZXJuYWxMaW5rOiBzdHJpbmc7XG5cbiAgaXNGaXJzdDogYm9vbGVhbjtcblxuICBpc0xhc3Q6IGJvb2xlYW47XG5cbiAgY2Fyb3VzZWxDb25maWcgPSBDYXJvdXNlbENvbmZpZztcblxuICBASW5wdXQoKVxuICBzZXQgaW1hZ2VzKHZhbHVlOiBhbnlbXSkge1xuXG4gICAgdmFsdWUgPSB2YWx1ZSB8fCBuZXcgQXJyYXk8YW55PigpO1xuXG4gICAgaWYgKHZhbHVlICYmIChKU09OLnN0cmluZ2lmeSh2YWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuX2ltYWdlcykpKSB7XG5cbiAgICAgIHRoaXMuaW1hZ2VIaWdobGlnaHQgPSB2YWx1ZVswXTtcblxuICAgICAgdGhpcy5faW1hZ2VzID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuc2V0RXh0ZXJuYWxMaW5rKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBpbWFnZXMoKTogYW55W10ge1xuXG4gICAgcmV0dXJuIHRoaXMuX2ltYWdlcztcblxuICB9XG5cbiAgcHJpdmF0ZSBfaW1hZ2VzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgb25TZWxlY3RJbWFnZSA9ICgkZXZlbnQsIHN5c0ZpbGUpID0+IHtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUltYWdlICYmIHRoaXMuYWN0aXZlSW1hZ2UgIT09ICRldmVudC50YXJnZXQpIHtcblxuICAgICAgdGhpcy5hY3RpdmVJbWFnZS5jbGFzc05hbWUgPSAnJztcblxuICAgIH1cblxuICAgICRldmVudC50YXJnZXQuY2xhc3NOYW1lID0gJ2FjdGl2ZSc7XG5cbiAgICB0aGlzLmFjdGl2ZUltYWdlID0gJGV2ZW50LnRhcmdldDtcblxuICAgIHRoaXMuaW1hZ2VIaWdobGlnaHQgPSBzeXNGaWxlO1xuXG4gICAgdGhpcy5zZXRFeHRlcm5hbExpbmsoKTtcblxuICB9XG5cbiAgc2V0RXh0ZXJuYWxMaW5rID0gKCkgPT4ge1xuXG4gICAgaWYgKHRoaXMuaW1hZ2VIaWdobGlnaHQpIHtcblxuICAgICAgdGhpcy5pbWdFeHRlcm5hbExpbmsgPSB0aGlzLmltYWdlSGlnaGxpZ2h0LmZpbGVVcmw7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uSW5pdERhdGFGbihldmVudDogTmd1Q2Fyb3VzZWxTdG9yZSkge1xuXG4gICAgdGhpcy5zZXRQcmV2TmV4dENoZWNrZXJzKGV2ZW50LmlzRmlyc3QsIGV2ZW50Lml0ZW1zID49IHRoaXMuaW1hZ2VzLmxlbmd0aCk7XG5cbiAgfVxuXG4gIG9uTW92ZUZuKGV2ZW50OiBOZ3VDYXJvdXNlbFN0b3JlKSB7XG5cbiAgICB0aGlzLnNldFByZXZOZXh0Q2hlY2tlcnMoZXZlbnQuaXNGaXJzdCwgZXZlbnQuaXNMYXN0KTtcblxuICB9XG5cbiAgc2V0UHJldk5leHRDaGVja2VycyhmaXJzdDogYm9vbGVhbiwgbGFzdDogYm9vbGVhbikge1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuaXNGaXJzdCA9IGZpcnN0O1xuXG4gICAgICB0aGlzLmlzTGFzdCA9IGxhc3Q7XG5cbiAgICB9LCAwKTtcblxuICB9XG5cbn1cbiIsImV4cG9ydCBjb25zdCBUaHVtYm9yU2VydmVySG9zdCA9ICdodHRwczovL2NhY2hlLXRodW1icy5kZWNvcmFjb250ZW50LmNvbS91bnNhZmUnO1xuXG5leHBvcnQgY29uc3QgUzNIb3N0ID0gJ2h0dHA6Ly9zMy5hbWF6b25hd3MuY29tL2RlY29yYS1wbGF0Zm9ybS0xLW52JztcblxuZXhwb3J0IGNvbnN0IFRyYW5zcGFyZW50SW1hZ2UgPSBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUFtSkxSMFFBLzRlUHpMOEFBQVxuQUpjRWhaY3dBQUN4TUFBQXNUQVFDYW5CZ0FBQUFMU1VSQlZBalhZMkJnQUFBQUF3QUJJTldVeHdBQUFBQkpSVTVFcmtKZ2dnPT1gO1xuXG5leHBvcnQgY29uc3QgRXJyb3JJbWFnZSA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQU1BQUFEMDRKSDVBQUFBc1ZCTVZFVUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVxuQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFcbkFBQUFBQUFBQWsyd0xTQUFBQU9uUlNUbE1BQTRVVUJRZ01FUFNLSytqYUd4Y2Y5NTB5Y2s4Nk5pK21nYjlYSmlPeVJQRHMzcUtXWjByS3JYeDMrODVqUVQyNFhlUFgwOFZ0YXBHYUVDNVJOd0FBQjE1SlJFRlVlTnJ0bTJkejJ6QU1oa2xyMmJJbDc1RjQxWEc4NHBsbDEvei9QNnlYVmpZRWtpS1xucGtkNzFycytubmlNZEllSUZDRUFxK2M5Ly9wTVYyd3Y4M21HNW5CNTZmdURhNUM5Q2crbm1WR2FZSDZlWGFVREo5eE1PSnl5WnlUQWszMGx3cmpJZHM4MllmQS91QlZiWDJIRHhTT0dNNXl3TmszNnhldWg5c0xTOEg0c3pZYlJpU1pUTExKRmFxeURkUzJULzlqeHNoVkh3VTl1eHhzZjlYR0xLXG5ZMWhBMEw4d2pvL0Z5SmFyMUc4TE1uMnc4MnJ2aVNGMkhaZW84RG83aHFqMmN6MytBODUyWjhza1dXeXdNMHJaeGVnaThhME9wdHRwTDkrUUdDMlNEYjhjMy90V3FnZnAxaGl3UFpBc0xPSVBrVDZvbDNIejJ4bmNVR0xBSll1VzdiaUFua2xhcnJGb3p1ckRJT2FITlUwbi96WGN1czhSUmFYWVlcbjZTeUFKTGZiSnp2RUdsa3NxQjV2K3ZrNUUzazRJWUpNUVhVMDh4L29qbmd6V3ZxK0hzZ1JmQU0wVWhNYUVIMGtXS29zQnNtR2NtOUo1QVhVaFRnMDRCb3VlZi9DZ0VLODBMTk1UYTJTWXBrWXBvUysvZkRoeGJiUjkzTGhKYjZ1dXF0MW5PTEx1b2J0OHhtR3puQUowcnErNS9OaVBrWHplYlBmVlxuMXpRTjhMRk5YcFlSYUExaWVUOFdscDFLV1BoTWRiMmxaWDZWc21aenRXdXZmalpxZytCVlVjblRmbGxCMmwzN1E2ckVINTJhR2FtSmJ6Yk9TRW1sb20wVVg5cEoxa0twUVNwN2NZNnhJcDd3eHhDdVFLWUFvMDBUTlZib0V2YnFnc0dSeVppaWtCRkU3dUs3SWxvaTF1NllHcFdHb0twTnZ1eXNSXG45MHgvV2RhZElBOEROVm5JWjBnM1h5aWI3a01NRm9JSXpFYWhHRzJBVE1sN2hKbnVzTmNDNDRxQlJFcW1LV1FKVlRWM2NaemRqYXR3ekZSY3JUaEI0ZkQ1cFJ4Y0tKOGR0REJCR2xnNGJDV3AwSGxnYWZweXhqa01vdDZRZTJFSEMyU1NwTVZ5bk02RXVpOFFad1ZqUjFYSFJlM2d3OXRTRGxMRmpcbktkaWlRYzFlSGdlZDZHZFhOWjE2aEdjQmtSaFFrL21BaSs5QjlKUzhhQStjR3IzN1gxNGJ6QlNjKzUraWJwVWd0bUxuSUZmanhzbWd4cVpFN2xzOFcxS2NKZllMVnVNcnZkODFZR1pVWlhXdko4dlJEbG81UVkxdm9FYkxjOFBSc2pKakdsQ3pHUDNXaytUaEdZN01BNlNwVDF6OThXbGtQREEzZ1xuRVNuelFKcFVOYU1NTFlhd3g3aGdlSGNJNWhncFRjQUx6WWdNZDVrdzVEZlYzbWd4akpXbzgwbldWTUQ5cEVuNDFLWHVZVkVMVHJJSHVmR3hwRHlKMTBpMHBLR2lyb0lKQWF3QnNqZXZXSnhIN0FKU3pNRDZtTFNzNlI1RUJZNmdxc2ZXWnlWejU5b2NxUXhING8yMmRnQVlBY0x0YkFhQjBpTk94XG5NRGJQRkU5dUU2YkFDd0JuczduQm9kZmNtTWs2dVk5Vm82QTdBYWJSQThKeEx5MDhBQUlqWklYWTBCb2hwaGtDZUl4TmlBbm1CQVEya0FYbWpNcVhHTVJHSmtRTmQ4QjRCZENBdlZkQ0l4MzRFZXBJWVkycnA3aVh1SWlnc2lNUkZoUzR3Q1cyL0FHQVhVT1ZFa3ovb3c5TVU4NE9nTmdGSU9GdEtcbnJrY2pPNDdxWUNTMjlBUjdoQ0U1WUpLUDdUbmVmMUpuUWs5aWtOeUNJN3ZpQURleHphclR1Sm5SK3FNNENSeGtZb2dHNHNTNnpTWWdYQWtvT0x4THBJRVJmRDhnWVJuL2NvRkdTZzlXNFhkaFlKTEkydUNZcFV1WjZBNXJJa1F0Nk53RW40ZG1TZ2hvNUErYVM4dXNTZFZGNkF4b1Vib0ZwbHVRbFxuOThjb0poSVNwd3picmE2S05WT2dhN1NUc1k0TlQ1a21LS2dFeGJka3JXRmZiOEJKR0dtY1FxaktaamczT29wcHBDWHJqRjcwQmpEWVdtL3p0ZDZzN2NJOWRJSFZ1S2VFNXdWOEthcnd6Y0NBOS9pZGptY1RqTWVwY1pvd0NCakl1Mk5MYndBckVUVUJwOGFXTkE5MjVQT0JWNVVCa0FzMCtCOVlOXG5uVUNES0VrbFcxTVRXTUFtQ2t5aElWNE5mNEVOVWEyVlJVeklyMEJyQ0pxaTFhK1pxdlFTTzN4VUg5QjhWYS9KRTNKTmtZR3NLY1d2K3ZSaVFRekthZUNSMFZUMU1BRlNYUENoZ01HS1Buc3dpN1EvaU1zdEFSaHJYSDQrSVRRTW9RYngwSlFwM2I0TkJqMkF5dndPL010UzVqMDl6azFocjFrRmJcbm5DUklsbDVqRzQ3ODJ5aW84U2FBSUYxbnhSd0hMdzdNSTBhOHNFQm9yM0JlQ2VCc3RERzRxRmtySzBCZDY1a2Z1SzVhSTh0TEVhZ1JXUmN1VGViVjVZSG5Dc2puYTRycE5DMy9GN2M0c0J1ZFZJamxXMEFWTDZuSXZhTEQ5WGFKY3FjS0RyM3B6VzZKOHR1Ykxjd0ZkVTlrci9NVXNJSnk2MG1mbVxuQU9mOEdlaHVERjh6VGU1SmRQSlFpS2w5RS96Yjg3V0hScC94cjBiYlI5d09Oa0JTTFZiNkZCbFdYRXVoamorSncza0hnYWtyb3k2dWlvQlBqVDNQbzNkUjVnZXMvM3c5eEEyYzE3blZVWWV1WFdKcFBVNDZLcndIeWZocnJFeFBPNk5UTURmMXBXRTREY01jcGZ5elljQkp1aUNrRGVEMlROeDk0XG5PL0JvbHFoaDJ5bkpRLzhIOG1jV0M5alZLZVREOUVIS1d3ZHdhM1ZFc2hIc1lvOUIwbExCblpVRzNmdkdEVW5QSzNvL1JOS3luS0YyTmd1dEJnT3F5MVJuUSsrZEFlV3NQclJRWHpNYjJxWUNtdFpRRStkbVR5SVBYRk04b2dabXQ4dTRKQ041R0QxeGxmYWlybDU5K01FUXRYcmVUTjRXaXJ4S1YxXG43VnVhMU5sWEZjS01tTk4yRWlwL2JTRHgyYmZtRTczdmh3WGt2cTE3VlgyUDh6eXNMbmlCU0cvNWwrZVo4VXluakEwdENzazhKeFg1OU1tOUpYaDN3UDRVVnZ3OXM1SU4rSk43MldrOXV3ZWNjaWZ3RzN2Mi9XK0FlZjcxc2UrWnRReDZyN3ZlN3gyUFBybGtQKzgrL3lDekdpN2FGenBQVXRBQUFBQUVsRlRrU3VRbUNDYDtcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEltYWdlU2l6ZSwgU3lzdGVtRmlsZUtleSB9IGZyb20gJy4vaW1hZ2UuZGlyZWN0aXZlLm1vZGVscyc7XG5pbXBvcnQgeyBUcmFuc3BhcmVudEltYWdlLCBUaHVtYm9yU2VydmVySG9zdCwgRXJyb3JJbWFnZSwgUzNIb3N0IH0gZnJvbSAnLi9pbWFnZS5kaXJlY3RpdmUuY29uc3RhbnRzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlY0ltYWdlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2VEaXJlY3RpdmUge1xuXG4gIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGVycm9yT25Mb2FkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY0ltYWdlKHY6IFN5c3RlbUZpbGVLZXkgfCBzdHJpbmcpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lckltYWdlKSB7XG4gICAgICB0aGlzLmlubmVySW1hZ2UgPSB2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBkZWNJbWFnZVNpemU6IEltYWdlU2l6ZTtcblxuICAvLyBEZWZpbmVzIGlmIHdoaXRlIG1hcmdpbnMgc2hvdWxkIGJlIGNyb3BwZWRcbiAgQElucHV0KCkgdHJpbTogYm9vbGVhbjtcblxuICAvLyBEZWZpbmVzIGlmIHRoZSBpbWFnZSBzaG91bGQgYmUgY3JvcHBlZCBvciBmaXQgdGhlIHNpemUgcmVzcGVjdGluIHRoZSBhc3BlY3QgcmF0aW9cbiAgQElucHV0KCkgZml0SW46IGJvb2xlYW47XG5cbiAgLy8gR2VkIHJlZGltZW5zaW9uZWQgaW1hZ2UgZnJvbSB0aHVtYm9yIGltYWdlIHJlc2l6ZSBzZXJ2aWNlXG4gIEBJbnB1dCgpIHRodW1ib3JpemUgPSB0cnVlO1xuXG4gIHByaXZhdGUgY29udGFpbmVyRWxlbWVudFR5cGU6ICdJTUcnIHwgJ05PVC1JTUcnO1xuXG4gIHByaXZhdGUgaW5uZXJJbWFnZTogU3lzdGVtRmlsZUtleSB8IHN0cmluZyA9IFRyYW5zcGFyZW50SW1hZ2U7XG5cbiAgcHJpdmF0ZSBpbWFnZVBhdGg6IHN0cmluZztcblxuICBwcml2YXRlIGZpbmFsSW1hZ2VVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHRoaXMuZGV0ZWN0Q29udGFpbmVyRWxlbWVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RDb250YWluZXJFbGVtZW50KCkge1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudCA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50VHlwZSA9IHRoaXMuY29udGFpbmVyRWxlbWVudC50YWdOYW1lID09PSAnSU1HJyA/ICdJTUcnIDogJ05PVC1JTUcnO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkSW1hZ2UoKSB7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuaW5uZXJJbWFnZSA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gdGhpcy5pbm5lckltYWdlO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5pbWFnZVBhdGggPSB0aGlzLmV4dHJhY3RJbWFnZVVybEZyb21TeXNmaWxlKCk7XG5cbiAgICAgIGlmICh0aGlzLmltYWdlUGF0aCkge1xuXG4gICAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IHRoaXMuZ2V0RmluYWxVcmwoKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSBFcnJvckltYWdlO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLnRyeVRvTG9hZEltYWdlKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVySW1hZ2VbJ2ZpbGVCYXNlUGF0aCddIHx8IHVuZGVmaW5lZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEZpbmFsVXJsKCkge1xuXG4gICAgaWYgKHRoaXMudGh1bWJvcml6ZSkge1xuXG4gICAgICByZXR1cm4gdGhpcy5nZXRUaHVtYm9yVXJsKCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5nZXRTM1VybCgpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGdldFMzVXJsKCkge1xuICAgIHJldHVybiBgJHtTM0hvc3R9LyR7dGhpcy5pbWFnZVBhdGh9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGh1bWJvclVybCgpIHtcbiAgICBjb25zdCBzaXplID0gdGhpcy5nZXRJbWFnZVNpemUodGhpcy5kZWNJbWFnZVNpemUpO1xuICAgIGNvbnN0IGFzcGVjdCA9IHRoaXMuZ2V0QXNwZWN0KCk7XG4gICAgY29uc3QgdHJpbSA9IHRoaXMuZ2V0VHJpbSgpO1xuICAgIHJldHVybiBgJHtUaHVtYm9yU2VydmVySG9zdH0vJHtzaXplfSR7YXNwZWN0fSR7dHJpbX0vJHt0aGlzLmltYWdlUGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbWFnZVNpemUoZGVjSW1hZ2VTaXplOiBJbWFnZVNpemUgPSB7fSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke2RlY0ltYWdlU2l6ZS53aWR0aCB8fCAwfXgke2RlY0ltYWdlU2l6ZS5oZWlnaHQgfHwgMH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBc3BlY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZml0SW4gPyAnL2ZpdC1pbicgIDogJyc7XG4gIH1cblxuICBwcml2YXRlIGdldFRyaW0oKSB7XG4gICAgcmV0dXJuIHRoaXMudHJpbSA/ICcvdHJpbScgOiAnJztcbiAgfVxuXG4gIHByaXZhdGUgdHJ5VG9Mb2FkSW1hZ2UoKSB7XG4gICAgY29uc3QgZG93bmxvYWRpbmdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGRvd25sb2FkaW5nSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5jcmVhdGVJbWFnZSgpO1xuICAgIH07XG5cbiAgICBkb3dubG9hZGluZ0ltYWdlLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSBFcnJvckltYWdlO1xuICAgICAgdGhpcy5jcmVhdGVJbWFnZSgpO1xuICAgIH07XG5cbiAgICBkb3dubG9hZGluZ0ltYWdlLnNyYyA9IHRoaXMuZmluYWxJbWFnZVVybDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyRWxlbWVudFR5cGUgPT09ICdJTUcnKSB7XG4gICAgICB0aGlzLnNldEltYWdlZWxlbWVudFNyYygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGVuZEltYWdlVG9CZygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kSW1hZ2VUb0JnKCkge1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyB0aGlzLmZpbmFsSW1hZ2VVcmwgKyAnKSc7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRTaXplID0gJzEwMCUnO1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkZWMtaW1hZ2UtYmctbG9hZGluZycpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbWFnZWVsZW1lbnRTcmMoKSB7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgdGhpcy5maW5hbEltYWdlVXJsKTtcbiAgfVxuXG59XG5cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNJbWFnZURpcmVjdGl2ZSB9IGZyb20gJy4vaW1hZ2UuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNJbWFnZURpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtEZWNJbWFnZURpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2VNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0dhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL2RlYy1nYWxsZXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNJbWFnZU1vZHVsZSB9IGZyb20gJy4vLi4vLi4vZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5tb2R1bGUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbE1vZHVsZSB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCAnaGFtbWVyanMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY0ltYWdlTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE5ndUNhcm91c2VsTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0dhbGxlcnlDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0dhbGxlcnlDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHYWxsZXJ5TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGFiZWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3JIZXh9XCIgW25nQ2xhc3NdPVwiZGVjQ2xhc3NcIiBkZWNDb250cmFzdEZvbnRXaXRoQmc+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGRpdnttYXJnaW46NHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6N3B4IDEycHg7Ym9yZGVyLXJhZGl1czoyNHB4O2FsaWduLWl0ZW1zOmNlbnRlcjtjdXJzb3I6ZGVmYXVsdH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMYWJlbENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbG9ySGV4OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRlY0NsYXNzOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ290cmFzdCBjb25maWd1cmF0aW9uXG4gKlxuICogVXNlZCB0byBkZWZpbmUgc29tZSBjdXN0b20gY29uZmlndXJhdGlvbiBhcyBjb2xvcnMgYW5kIGJyZWFrcG9pbnRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNDb250cmFzdEZvbnRXaXRoQmdEaXJlY3RpdmVDb25maWcge1xuICBsdW1hQnJlYWtQb2ludDogc3RyaW5nO1xuICBsaWdodENvbG9yOiBzdHJpbmc7XG4gIGRhcmtDb2xvcjogc3RyaW5nO1xufVxuXG5jb25zdCBERUZBVUxUX0xVTUFfQlJFQUtQT0lOVCA9IDIwMDtcblxuLypcbiogQ29udHJhc3QgRm9udCBXaXRoIEJhY2tncm91bmQgRGlyZWN0aXZlXG4qXG4qIENvbnRyYXN0cyB0aGUgdGV4dCBjb2xvciB3aXRoIHRoZSBiYWNrZ3JvdW5kLWNvbG9yIHRvIGF2b2lkIHdoaXRlIGNvbG9yIGluIGxpZ2ggYmFja2dyb3VuZCBhbmQgYmxhY2sgY29sb3IgaW4gZGFya2VuIG9uZXMuXG4qIEl0IGNhbiBiZSB1c2VkIGFzIGF0dHJpYnV0ZSBpbiBhbnkgZWxlbWVudCB3aXRoIG9yIHdpdGhvdXQgcGFzc2luZyBjdXN0b20gY29uZmlndXJhdGlvblxuKiBFeGFtcGxlIHdpdGhvdXQgY3VzdG9tIGNvbmZpZ3VyYXRpb246IDxkaXYgZGVjQ29udHJhc3RGb250V2l0aEJnXCI+PC9kaXY+XG4qIEV4YW1wbGUgd2l0aCBjdXN0b20gY29uZmlndXJhdGlvbjogPGRpdiBbZGVjQ29udHJhc3RGb250V2l0aEJnXT1cIntkYXJrQ29sb3I6ICdyZWQnfVwiPjwvZGl2PlxuKlxuKiBDb25maWd1cmF0aW9uIHBhcmFtczpcbiogbHVtYUJyZWFrUG9pbnQ6IHRoZSBwb2ludCB3aGVyZSB3ZSBzaG91bGQgY2hhbmdlIHRoZSBmb250IGNvbG9yLiBUaGlzIGlzIHRoZSBsaWd0aCBmZWVsaW5nIGJyZWFrcG9pbnQuXG4qIGxpZ2h0Q29sb3I6IHRoZSB0ZXh0IGNvbG9yIHVzZWQgaW4gZGFyayBiYWNrZ3JvdW5kc1xuKiBkYXJrQ29sb3I6IHRoZSB0ZXh0IGNvbG9yIHVzZWQgaW4gbGlndGggYmFja2dyb3VuZHNcbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb1JnYk5ldyhoZXgpIHtcblxuICBjb25zdCByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgcmV0dXJuIHJlc3VsdCA/IHtcbiAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICBiOiBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuICB9IDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YW5kYXJkaXplX2NvbG9yKGJnQ29sb3IpIHtcblxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICBjdHguZmlsbFN0eWxlID0gYmdDb2xvcjtcblxuICByZXR1cm4gY3R4LmZpbGxTdHlsZTtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGVjQ29udHJhc3RGb250V2l0aEJnXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlIGltcGxlbWVudHMgRG9DaGVjayB7XG5cbiAgcHJpdmF0ZSBjb25maWc7XG5cbiAgcHJpdmF0ZSBiZ0NvbG9yO1xuXG4gIEBJbnB1dCgpIHNldCBkZWNDb250cmFzdEZvbnRXaXRoQmcoY29uZmlnOiBEZWNDb250cmFzdEZvbnRXaXRoQmdEaXJlY3RpdmVDb25maWcpIHtcblxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgdGhpcy5kb0RlY0NvbnRyYXN0Rm9udFdpdGhCZygpO1xuXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG5cbiAgICB0aGlzLmJnQ29sb3IgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuXG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG5cbiAgICBjb25zdCBiZ0NvbG9yID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcblxuICAgIGlmIChiZ0NvbG9yICE9PSB0aGlzLmJnQ29sb3IpIHtcblxuICAgICAgdGhpcy5iZ0NvbG9yID0gYmdDb2xvcjtcblxuICAgICAgdGhpcy5kb0RlY0NvbnRyYXN0Rm9udFdpdGhCZygpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGRvRGVjQ29udHJhc3RGb250V2l0aEJnKCkge1xuXG4gICAgY29uc3QgbHVtYUJyZWFrUG9pbnQgPSAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcubHVtYUJyZWFrUG9pbnQpID8gdGhpcy5jb25maWcubHVtYUJyZWFrUG9pbnQgOiBERUZBVUxUX0xVTUFfQlJFQUtQT0lOVDtcblxuICAgIGNvbnN0IGhleGFCZ0NvbG9yID0gc3RhbmRhcmRpemVfY29sb3IodGhpcy5iZ0NvbG9yKTtcblxuICAgIGNvbnN0IHJnYkNvbG9yID0gaGV4VG9SZ2JOZXcoaGV4YUJnQ29sb3IpO1xuXG4gICAgY29uc3QgbHVtYSA9IDAuMjEyNiAqIHJnYkNvbG9yLnIgKyAwLjcxNTIgKiByZ2JDb2xvci5nICsgMC4wNzIyICogcmdiQ29sb3IuYjsgLy8gcGVyIElUVS1SIEJULjcwOVxuXG4gICAgaWYgKGx1bWEgPCBsdW1hQnJlYWtQb2ludCkge1xuXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY29sb3IgPSAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcubGlnaHRDb2xvcikgPyB0aGlzLmNvbmZpZy5saWdodENvbG9yIDogJ3JnYmEoMjU1LDI1NSwyNTUsMSknO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmNvbG9yID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmRhcmtDb2xvcikgPyB0aGlzLmNvbmZpZy5kYXJrQ29sb3IgOiAnIzIzMmUzOCc7XG5cbiAgICB9XG5cbiAgfVxufVxuXG5cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlIH0gZnJvbSAnLi9kZWMtY29udHJhc3QtZm9udC13aXRoLWJnLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbnRyYXN0Rm9udFdpdGhCZ01vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNMYWJlbENvbXBvbmVudCB9IGZyb20gJy4vZGVjLWxhYmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNDb250cmFzdEZvbnRXaXRoQmdNb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvY29sb3IvY29udHJhc3QtZm9udC13aXRoLWJnL2RlYy1jb250cmFzdC1mb250LXdpdGgtYmcubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRGVjQ29udHJhc3RGb250V2l0aEJnTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNMYWJlbENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjTGFiZWxDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMYWJlbE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpbHRlcnMsIEZpbHRlckdyb3VwcyB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ291bnRSZXBvcnQge1xuXG4gIGNvdW50OiBudW1iZXI7XG4gIGNoaWxkcmVuPzogQ291bnRSZXBvcnRbXTtcblxufVxuXG4vKlxuICAqIERlY0xpc3RQcmVTZWFyY2hcbiAgKlxuICAqIFVzZWQgYXMgbWlkZGxld2FyZSB0byBtYW5pcHVsYXRlIHRoZSBmaWx0ZXIgYmVmb3JlIGZldGNobmcgdGhlIGRhdGFcbiAgKi9cbmV4cG9ydCB0eXBlIERlY0xpc3RQcmVTZWFyY2ggPSAoZmlsdGVyR3JvdXBzOiBGaWx0ZXJHcm91cHMpID0+IEZpbHRlckdyb3VwcztcblxuXG4vKlxuICAqIERlY0xpc3RGZXRjaE1ldGhvZFxuICAqXG4gICogVXNlZCB0byBmZXRjaCBkYXRhIGZyb20gcmVtb3RlIEFQSVxuICAqL1xuZXhwb3J0IHR5cGUgRGVjTGlzdEZldGNoTWV0aG9kID0gKGVuZHBvaW50OiBzdHJpbmcsIGZpbHRlcjogYW55KSA9PiBPYnNlcnZhYmxlPERlY0xpc3RGZXRjaE1ldGhvZFJlc3BvbnNlPjtcblxuLypcbiAgKiBMaXN0VHlwZVxuICAqXG4gICogTGlzdCB0eXBlc1xuICAqL1xuZXhwb3J0IHR5cGUgRGVjTGlzdFR5cGUgPSAndGFibGUnIHwgJ2dyaWQnO1xuXG4vKlxuICAqIERlY0xpc3RGZXRjaE1ldGhvZFJlc3BvbnNlXG4gICpcbiAgKiBSZXNwb25zZSByZWNlaXZlZCBieSBmZXRjaCBEZWNMaXN0RmV0Y2hNZXRob2RcbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjTGlzdEZldGNoTWV0aG9kUmVzcG9uc2Uge1xuICByZXN1bHQ6IHtcbiAgICByb3dzOiBhbnlbXTtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9O1xufVxuXG4vKlxuICAqIERlY0xpc3RGaWx0ZXJcbiAgKlxuICAqIFN0cnVjdHVyZSBvZiB0YWJzIGZpbHRlcnNcbiAgKi9cbmV4cG9ydCBjbGFzcyBEZWNMaXN0RmlsdGVyIHtcbiAgY2hpbGRyZW4/OiBEZWNMaXN0RmlsdGVyW107XG4gIGNvdW50Pzogc3RyaW5nO1xuICBkZWZhdWx0PzogYm9vbGVhbjtcbiAgZmlsdGVyczogRmlsdGVycztcbiAgaGlkZT86IGJvb2xlYW47XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGNvbG9yOiBzdHJpbmc7XG4gIGxpc3RNb2RlPzogRGVjTGlzdFR5cGU7XG4gIHBlcm1pc3Npb25zPzogc3RyaW5nW107XG4gIHVpZD86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkgPSB7fSkge1xuICAgIHRoaXMuY2hpbGRyZW4gPSBkYXRhLmNoaWxkcmVuID8gZGF0YS5jaGlsZHJlbi5tYXAoZmlsdGVyID0+IG5ldyBEZWNMaXN0RmlsdGVyKGZpbHRlcikpIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuY291bnQgPSBkYXRhLmNvdW50IHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRlZmF1bHQgPSBkYXRhLmRlZmF1bHQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuZmlsdGVycyA9IGRhdGEuZmlsdGVycyB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5oaWRlID0gZGF0YS5oaWRlIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxhYmVsID0gZGF0YS5sYWJlbCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3IgfHwgJyM2RTc1N0EnO1xuICAgIHRoaXMubGlzdE1vZGUgPSBkYXRhLmxpc3RNb2RlIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBlcm1pc3Npb25zID0gZGF0YS5wZXJtaXNzaW9ucyB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy51aWQgPSBkYXRhLnVpZCB8fCBkYXRhLmxhYmVsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNMaXN0RmV0Y2hNZXRob2QsIERlY0xpc3RGaWx0ZXIgfSBmcm9tICcuLy4uLy4uL2xpc3QubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtdGFicy1maWx0ZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJsaXN0LXRhYnMtZmlsdGVyLXdyYXBwZXJcIiAqbmdJZj1cInZpc2libGVGaWx0ZXJzIGFzIGZpbHRlcnNcIj5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwiZGVjLXRhYi1oZWFkZXJcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCB0YWJGaWx0ZXIgb2YgZmlsdGVyc1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgKmRlY1Blcm1pc3Npb249XCJ0YWJGaWx0ZXIucGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICBtYXQtYnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzPVwidXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFRhYih0YWJGaWx0ZXIudWlkKVwiXG4gICAgICAgICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJzZWxlY3RlZFRhYlVpZCA9PSAodGFiRmlsdGVyLnVpZClcIj5cbiAgICAgICAgPHNwYW4+e3sgJ2xhYmVsLicgKyB0YWJGaWx0ZXIubGFiZWwgfCB0cmFuc2xhdGUgfCB1cHBlcmNhc2UgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnRSZXBvcnRcIiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2Utc21hbGxcIj57eyBjb3VudFJlcG9ydFt0YWJGaWx0ZXIudWlkXS5jb3VudCB9fTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXJ7bWFyZ2luLXRvcDo4cHh9Lmxpc3QtdGFicy1maWx0ZXItd3JhcHBlciAuZGVjLXRhYi1oZWFkZXIuYm90dG9te2JvcmRlci1ib3R0b206MH0ubGlzdC10YWJzLWZpbHRlci13cmFwcGVyIC5kZWMtdGFiLWhlYWRlciAuYmFkZ2V7bWFyZ2luLWxlZnQ6OHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyIC5iYWRnZS5iYWRnZS1waWxse3BhZGRpbmc6OHB4O2ZvbnQtc2l6ZTpzbWFsbDtib3JkZXItcmFkaXVzOjI0cHh9Lmxpc3QtdGFicy1maWx0ZXItd3JhcHBlciAuZGVjLXRhYi1oZWFkZXIgLmJhZGdlLmJhZGdlLXBpbGwuYmFkZ2Utc21hbGx7Zm9udC1zaXplOngtc21hbGw7cGFkZGluZzo0cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIGN1c3RvbUZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2Q7XG5cbiAgbmFtZTogc3RyaW5nOyAvLyBsaXN0IHVuaXF1ZSBuYW1lIHRvIGlkZW50aWZ5IHRoZSB0YWIgaW4gdXJsXG5cbiAgc2VsZWN0ZWRUYWJVaWQ6IHN0cmluZztcblxuICBzZXJ2aWNlOiBhbnk7XG5cbiAgQElucHV0KCkgY291bnRSZXBvcnQ6IGFueTtcblxuICBASW5wdXQoKVxuICBzZXQgZmlsdGVycyh2OiBEZWNMaXN0RmlsdGVyW10pIHtcbiAgICBpZiAodGhpcy5fZmlsdGVycyAhPT0gdikge1xuICAgICAgdGhpcy5fZmlsdGVycyA9IHYgPyB2Lm1hcChmaWx0ZXIgPT4gbmV3IERlY0xpc3RGaWx0ZXIoZmlsdGVyKSkgOiBbXTtcbiAgICB9XG4gIH1cblxuICBnZXQgZmlsdGVycygpOiBEZWNMaXN0RmlsdGVyW10ge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWZhdWx0VGFiOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfZmlsdGVyczogRGVjTGlzdEZpbHRlcltdID0gW107XG5cbiAgcHJpdmF0ZSB3YXRoVXJsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQE91dHB1dCgnc2VhcmNoJykgc2VhcmNoOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ3RhYkNoYW5nZScpIHRhYkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkgeyB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCk7XG4gIH1cblxuICBkb0ZpcnN0TG9hZCA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gYXZvaWRzIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3Igc2VsZWN0aW5nIHRoZSBhY3RpdmUgdGFiXG4gICAgICB0aGlzLndhdGNoVGFiSW5VcmxRdWVyeSgpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgZ2V0Q291bnRPZih1aWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNvdW50UmVwb3J0ICYmIHRoaXMuY291bnRSZXBvcnRbdWlkXSA+PSAwID8gdGhpcy5jb3VudFJlcG9ydFt1aWRdIDogJz8nO1xuICB9XG5cbiAgc2VsZWN0VGFiKHRhYikge1xuICAgIHRoaXMuc2V0VGFiSW5VcmxRdWVyeSh0YWIpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkVGFiKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVycyA/IHRoaXMuZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIudWlkID09PSB0aGlzLnNlbGVjdGVkVGFiVWlkKSA6IHVuZGVmaW5lZDtcblxuICB9XG5cbiAgZ2V0IHZpc2libGVGaWx0ZXJzKCkge1xuICAgIGNvbnN0IHZpc2libGUgPSB0aGlzLmZpbHRlcnMgPyB0aGlzLmZpbHRlcnMuZmlsdGVyKChmaWx0ZXIpID0+ICFmaWx0ZXIuaGlkZSkgOiBbXTtcbiAgICByZXR1cm4gKHZpc2libGUgJiYgdmlzaWJsZS5sZW5ndGggPiAxKSA/IHZpc2libGUgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdERlZmF1bHRUYWIoKSB7XG5cbiAgICBjb25zdCBoYXNEZWZhdWx0OiBhbnkgPSB0aGlzLmZpbHRlcnMuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0uZGVmYXVsdDtcbiAgICB9KTtcblxuICAgIGlmIChoYXNEZWZhdWx0KSB7XG5cbiAgICAgIHRoaXMuZGVmYXVsdFRhYiA9IGhhc0RlZmF1bHQudWlkO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5kZWZhdWx0VGFiID0gdGhpcy5maWx0ZXJzWzBdLnVpZDtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBvblNlYXJjaCA9ICh0YWIsIHJlY291bnQgPSBmYWxzZSkgPT4ge1xuXG4gICAgdGhpcy5zZWxlY3RlZFRhYlVpZCA9IHRhYi51aWQ7XG5cbiAgICBpZiAodGhpcy5maWx0ZXJzICYmIHRhYikge1xuXG4gICAgICBjb25zdCBldmVudCA9IHtcbiAgICAgICAgZmlsdGVyczogdGFiLmZpbHRlcnMsXG4gICAgICAgIGNoaWxkcmVuOiB0YWIuY2hpbGRyZW4sXG4gICAgICAgIHJlY291bnQ6IHJlY291bnQsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnNlYXJjaC5lbWl0KGV2ZW50KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBjb21wb25lbnRUYWJOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnLXRhYic7XG4gIH1cblxuICBwcml2YXRlIHNldFRhYkluVXJsUXVlcnkodGFiKSB7XG4gICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICAgIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXSA9IHRhYjtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4nXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLCBxdWVyeVBhcmFtczogcXVlcnlQYXJhbXMsIHJlcGxhY2VVcmw6IHRydWUgfSk7XG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFiSW5VcmxRdWVyeSgpIHtcblxuICAgIHRoaXMuZGV0ZWN0RGVmYXVsdFRhYigpO1xuXG4gICAgdGhpcy53YXRoVXJsU3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtc1xuICAgICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG5cbiAgICAgICAgY29uc3QgdGFiID0gcGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXSB8fCB0aGlzLmRlZmF1bHRUYWI7XG5cbiAgICAgICAgaWYgKHRhYiAhPT0gdGhpcy5zZWxlY3RlZFRhYlVpZCkge1xuXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUYWIgPSB0aGlzLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnVpZCA9PT0gdGFiKTtcblxuICAgICAgICAgIHRoaXMub25TZWFyY2goc2VsZWN0ZWRUYWIpO1xuXG4gICAgICAgICAgdGhpcy50YWJDaGFuZ2UuZW1pdCh0YWIpO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpIHtcbiAgICBpZiAodGhpcy53YXRoVXJsU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLndhdGhVcmxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtYWR2YW5jZWQtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG5cbiAgPGRpdiBmeEZsZXg+XG5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVJlZlwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Zvcm06IGZvcm19XCJcbiAgICA+PC9uZy1jb250YWluZXI+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXg+XG5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBlbmRcIiBmeExheW91dEdhcD1cIjhweFwiPlxuXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwic3VibWl0KClcIj57eyAnbGFiZWwuc2VhcmNoJyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uIChjbGljayk9XCJyZXNldCgpXCI+e3sgJ2xhYmVsLnJlc2V0JyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuXG5cblxuXG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmb3JtOiBhbnkgPSB7fTtcblxuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuICBvblNlYXJjaCA9ICgpID0+IHt9O1xuXG4gIG9uQ2xlYXIgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5vbkNsZWFyKCk7XG4gIH1cblxuICBzdWJtaXQoKSB7XG4gICAgdGhpcy5vblNlYXJjaCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJzLWZpbHRlci9saXN0LXRhYnMtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0xpc3RQcmVTZWFyY2gsIERlY0xpc3RGaWx0ZXIgfSBmcm9tICcuLy4uL2xpc3QubW9kZWxzJztcbmltcG9ydCB7IEZpbHRlckdyb3VwcyB9IGZyb20gJy4vLi4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgUGxhdGZvcm1Mb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWZpbHRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImxpc3QtZmlsdGVyLXdyYXBwZXJcIj5cbiAgPGRpdiBmeExheW91dD1cInJvdyB3cmFwXCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgPCEtLVxuICAgICAgQ291bnRlclxuICAgIC0tPlxuICAgIDxkaXYgZnhGbGV4PVwiMzBcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb3VudCA+PSAwICYmICFsb2FkaW5nXCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnQgPT09IDBcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPnt7IFwibGFiZWwucmVjb3JkLW5vdC1mb3VuZFwiIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID09PSAxXCIgY2xhc3M9XCJkZWMtYm9keS1zdHJvbmdcIj57eyBcImxhYmVsLm9uZS1yZWNvcmQtZm91bmRcIiB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA+IDFcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPiB7eyBcImxhYmVsLnJlY29yZHMtZm91bmRcIiB8IHRyYW5zbGF0ZTp7Y291bnQ6Y291bnR9IH19PC9zcGFuPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGZ4RmxleD1cIjcwXCIgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCIgY2xhc3M9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXY+XG5cbiAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgY2xhc3M9XCJpbnB1dC1zZWFyY2gtY29udGFpbmVyXCIgW2NsYXNzLmFjdGl2ZV09XCJzaG93U2VhcmNoSW5wdXRcIj5cbiAgICAgICAgICAgIDwhLS0gZ2FwIC0tPlxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLXRvb2dsZS1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIChjbGljayk9XCJ0b2dnbGVTZWFyY2hJbnB1dCgpXCI+c2VhcmNoPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxmb3JtIGZ4RmxleCByb2xlPVwiZm9ybVwiIChzdWJtaXQpPVwib25TZWFyY2goKVwiPlxuICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIxNnB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGNsYXNzPVwiaW5wdXQtc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYXItaFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgZnhGbGV4ICNpbnB1dFNlYXJjaCBuYW1lPVwic2VhcmNoXCIgWyhuZ01vZGVsKV09XCJmaWx0ZXJGb3JtLnNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJhZHZhbmNlZEZpbHRlckNvbXBvbmVudFwiIGNsYXNzPVwiY2xpY2tcIiAoY2xpY2spPVwidG9nZ2xlQWR2YW5jZWRGaWx0ZXIoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWMtc21hbGwgYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoXCI+e3tcImxhYmVsLmFkdmFuY2VkLW9wdGlvbnNcIiB8IHRyYW5zbGF0ZX19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwhLS1nYXAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tUmVmcmVzaCBzZWFyY2gtLT5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWluZm8gbWFyZ2luLWljb25cIiAoY2xpY2spPVwib25TZWFyY2goKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPnJlZnJlc2g8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS1DbGVhciBmaWx0ZXJzLS0+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiAqbmdJZj1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGhcIj5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1pbmZvXCIgKGNsaWNrKT1cIm9uQ2xlYXIoKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmNsZWFyPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiAqbmdJZj1cInNob3dJbmZvQnV0dG9uXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4taW5mb1wiIChjbGljayk9XCJvbkNsaWNrSW5mbygpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+aW5mb19vdXRsaW5lPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuXG4gIDxkaXYgKm5nSWY9XCJzaG93QWR2YW5jZWRGaWx0ZXJcIj5cblxuICAgIDxtYXQtY2FyZCBjbGFzcz1cImFkdmFuY2VkLXNlYXJjaC1jb250YWluZXJcIiBbbmdDbGFzc109XCJ7J3JlbW92ZS1idXR0b24tZW5hYmxlZCc6IGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGh9XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuXG4gICAgICAgIDxhIChjbGljayk9XCJjbG9zZUZpbHRlcnMoKVwiIGNsYXNzPVwiYnRuLWNsb3NlLWFkdmFuY2VkLXNlYXJjaFwiPlxuXG4gICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNsb3NlPC9pPlxuXG4gICAgICAgIDwvYT5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXY+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtYWR2YW5jZWQtZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvbWF0LWNhcmQ+XG5cbiAgPC9kaXY+XG5cbiAgPGRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lXG4gICAgKm5nSWY9XCJmaWx0ZXJHcm91cHNXaXRob3V0VGFicz8ubGVuZ3RoXCJcbiAgICBbZmlsdGVyR3JvdXBzXT1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzXCJcbiAgICAocmVtb3ZlKT1cInJlbW92ZURlY0ZpbHRlckdyb3VwKCRldmVudClcIlxuICAgIChlZGl0KT1cImVkaXREZWNGaWx0ZXJHcm91cCgkZXZlbnQpXCI+PC9kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZT5cblxuICA8ZGVjLWxpc3QtdGFicy1maWx0ZXIgW2ZpbHRlcnNdPVwiZmlsdGVyc1wiIFtjb3VudFJlcG9ydF09XCJjb3VudFJlcG9ydFwiPjwvZGVjLWxpc3QtdGFicy1maWx0ZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubGlzdC1maWx0ZXItd3JhcHBlcnttYXJnaW46MCAwIDE2cHg7cG9zaXRpb246cmVsYXRpdmV9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLm1hdC1pY29ue2NvbG9yOiM5OTl9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLnNlYXJjaC10ZXJtLWlucHV0e3dpZHRoOjUwMHB4O21hcmdpbi1yaWdodDo4cHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmlubGluZS1mb3Jte2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo3NHB4O3otaW5kZXg6MTtyaWdodDozMHB4O3dpZHRoOjU1MnB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyLnJlbW92ZS1idXR0b24tZW5hYmxlZHtyaWdodDo2MnB4O3dpZHRoOjU1MXB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyIC5idG4tY2xvc2UtYWR2YW5jZWQtc2VhcmNoe2N1cnNvcjpwb2ludGVyfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVye3RyYW5zaXRpb246YWxsIC4zcyBlYXNlO292ZXJmbG93OmhpZGRlbjt3aWR0aDo0MHB4O2hlaWdodDo1MHB4fS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyLmFjdGl2ZXtiYWNrZ3JvdW5kOiNmOGY4ZmE7Y29sb3I6Izk5OTt3aWR0aDo2MDBweH0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lci5hY3RpdmUgLmJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaHtkaXNwbGF5OmlubGluZX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoe3dpZHRoOjEwMCV9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaCBpbnB1dHtmb250OmluaGVyaXQ7YmFja2dyb3VuZDowIDA7Y29sb3I6Y3VycmVudENvbG9yO2JvcmRlcjpub25lO291dGxpbmU6MDtwYWRkaW5nOjA7d2lkdGg6MTAwJTt2ZXJ0aWNhbC1hbGlnbjpib3R0b219LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaHtkaXNwbGF5Om5vbmV9LnNlYXJjaC1jb250YWluZXIgLmJ0bi1jbGVhci1zZWFyY2h7cGFkZGluZy1yaWdodDoxNXB4O2N1cnNvcjpwb2ludGVyO2NvbG9yOiM5OTk7d2lkdGg6OTBweH0uc2VhcmNoLWNvbnRhaW5lciAuYnRuLWluZm8sLnNlYXJjaC1jb250YWluZXIgLmJ0bi10b29nbGUtc2VhcmNoe2ZvbnQtc2l6ZToyMXB4O2N1cnNvcjpwb2ludGVyO2hlaWdodDoyMXB4O2NvbG9yOiM5OTl9LnNlYXJjaC1jb250YWluZXIgLmJhci1oe2JvcmRlci1yaWdodDoycHggc29saWQgI2QwZDBkMDtoZWlnaHQ6MjFweDttYXJnaW46YXV0byAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgY291bnQ6IG51bWJlcjtcblxuICBjb3VudFJlcG9ydDtcblxuICBzaG93U2VhcmNoSW5wdXQ6IGJvb2xlYW47XG5cbiAgc2hvd0FkdmFuY2VkRmlsdGVyOiBib29sZWFuO1xuXG4gIGZpbHRlckZvcm06IGFueSA9IHtcbiAgICBzZWFyY2g6IHVuZGVmaW5lZFxuICB9O1xuXG4gIGZpbHRlckdyb3VwczogRmlsdGVyR3JvdXBzO1xuXG4gIGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzOiBGaWx0ZXJHcm91cHM7XG5cbiAgY3VycmVudFN0YXR1c0ZpbHRlcmVkOiBzdHJpbmc7XG5cbiAgdGFic0ZpbHRlcjogYW55O1xuXG4gIGVkaXRpb25Hcm91cEluZGV4OiBudW1iZXI7XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGxvYWRpbmc6IGJvb2xlYW47XG5cbiAgaXNJdEZpcnN0TG9hZCA9IHRydWU7XG5cbiAgZmlsdGVyTW9kZTogJ3RhYnMnIHwgJ2NvbGxhcHNlJztcblxuICBjaGlsZHJlbkZpbHRlcnM7XG5cbiAgLypcbiAgICogY2xpY2thYmxlQ29udGFpbmVyQ2xhc3NcbiAgICpcbiAgICogV2hlcmUgdGhlIGNsaWNrIHdhdGNoZXIgc2hvdWxkIGJlIGxpc3RlbmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBjbGlja2FibGVDb250YWluZXJDbGFzcyA9ICdsaXN0LWZpbHRlci13cmFwcGVyJztcblxuICBwcml2YXRlIGlubmVyRGVjRmlsdGVyR3JvdXBzOiBhbnlbXTtcblxuICBwcml2YXRlIGN1cnJlbnRVcmxFbmNvZGVkRmlsdGVyOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSB0YWJzRmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSB3YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgX2ZpbHRlcnM6IERlY0xpc3RGaWx0ZXJbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2xvYWRDb3VudFJlcG9ydDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBwcmVTZWFyY2g6IERlY0xpc3RQcmVTZWFyY2g7XG5cbiAgQElucHV0KCkgc2hvd0luZm9CdXR0b247XG5cbiAgQElucHV0KCkgaGFzUGVyc2lzdGVuY2UgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmaWx0ZXJzKHY6IERlY0xpc3RGaWx0ZXJbXSkge1xuXG4gICAgaWYgKHRoaXMuX2ZpbHRlcnMgIT09IHYpIHtcblxuICAgICAgdGhpcy5fZmlsdGVycyA9IHYubWFwKGZpbHRlciA9PiBuZXcgRGVjTGlzdEZpbHRlcihmaWx0ZXIpKTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGxvYWRDb3VudFJlcG9ydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbG9hZENvdW50UmVwb3J0O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGxvYWRDb3VudFJlcG9ydCh2OiBib29sZWFuKSB7XG4gICAgaWYgKHYgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9sb2FkQ291bnRSZXBvcnQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCBmaWx0ZXJzKCk6IERlY0xpc3RGaWx0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcnM7XG4gIH1cblxuICBAT3V0cHV0KCkgc2VhcmNoOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0U2VhcmNoJykgaW5wdXRTZWFyY2g7XG5cbiAgQFZpZXdDaGlsZChEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCkgdGFic0ZpbHRlckNvbXBvbmVudDogRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQpIGFkdmFuY2VkRmlsdGVyQ29tcG9uZW50OiBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybUxvY2F0aW9uOiBQbGF0Zm9ybUxvY2F0aW9uLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhdGNoVGFic0ZpbHRlcigpO1xuICAgIHRoaXMud2F0Y2hDbGljaygpO1xuICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXIoKTtcbiAgICB0aGlzLmNvbmZpZ3VyZUFkdmFuY2VkRmlsdGVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ0NsaWNrKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJzRmlsdGVyKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdVcmxGaWx0ZXIoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlYXJjaElucHV0KCkge1xuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gIXRoaXMuc2hvd1NlYXJjaElucHV0O1xuICAgIGlmICghdGhpcy5zaG93U2VhcmNoSW5wdXQpIHtcbiAgICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0U2VhcmNoLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0sIDE4MCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQWR2YW5jZWRGaWx0ZXIoJGV2ZW50KSB7XG5cbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9ICF0aGlzLnNob3dBZHZhbmNlZEZpbHRlcjtcblxuICB9XG5cbiAgb25TZWFyY2ggPSAoYXBwZW5kQ3VycmVudEZvcm0gPSB0cnVlKSA9PiB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXJGb3JtICYmIGFwcGVuZEN1cnJlbnRGb3JtKSB7XG5cbiAgICAgIGNvbnN0IG5ld0RlY0ZpbHRlckdyb3VwID0ge1xuXG4gICAgICAgIGZpbHRlcnM6IFtdXG5cbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybSkuZm9yRWFjaChrZXkgPT4ge1xuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlckZvcm1ba2V5XSkge1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyID0geyBwcm9wZXJ0eToga2V5LCB2YWx1ZTogdGhpcy5maWx0ZXJGb3JtW2tleV0gfTtcblxuICAgICAgICAgIG5ld0RlY0ZpbHRlckdyb3VwLmZpbHRlcnMucHVzaChmaWx0ZXIpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICB9KTtcblxuICAgICAgaWYgKG5ld0RlY0ZpbHRlckdyb3VwLmZpbHRlcnMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIGlmICh0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzKSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5lZGl0aW9uR3JvdXBJbmRleCA+PSAwKSB7XG5cbiAgICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHNbdGhpcy5lZGl0aW9uR3JvdXBJbmRleF0gPSBuZXdEZWNGaWx0ZXJHcm91cDtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMucHVzaChuZXdEZWNGaWx0ZXJHcm91cCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSBbbmV3RGVjRmlsdGVyR3JvdXBdO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgdGhpcy5yZWFjYWxjdWxhdGVBbmRFbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwcyh0cnVlKTtcblxuICB9XG5cbiAgb25DbGVhcigpIHtcblxuICAgIHRoaXMuY2xvc2VGaWx0ZXJzKCk7XG5cbiAgICB0aGlzLmZpbHRlckdyb3VwcyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgIHRoaXMub25TZWFyY2goKTtcblxuICB9XG5cbiAgcmVtb3ZlRGVjRmlsdGVyR3JvdXAoZ3JvdXBJbmRleCkge1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlckdyb3Vwcy5maWx0ZXIoKGdyb3VwLCBpbmRleCkgPT4gaW5kZXggIT09IGdyb3VwSW5kZXgpO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMuZmlsdGVyKChncm91cCwgaW5kZXgpID0+IGluZGV4ICE9PSBncm91cEluZGV4KTtcblxuICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLmZpbHRlcigoZ3JvdXAsIGluZGV4KSA9PiBpbmRleCAhPT0gZ3JvdXBJbmRleCk7XG5cbiAgICB0aGlzLm9uU2VhcmNoKHRydWUpO1xuXG4gIH1cblxuICBlZGl0RGVjRmlsdGVyR3JvdXAoZ3JvdXBJbmRleCkge1xuXG4gICAgdGhpcy5lZGl0aW9uR3JvdXBJbmRleCA9IGdyb3VwSW5kZXg7XG5cbiAgICBjb25zdCB0b0VkaXREZWNGaWx0ZXJHcm91cCA9IHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnNbZ3JvdXBJbmRleF07XG5cbiAgICBpZiAodG9FZGl0RGVjRmlsdGVyR3JvdXAgJiYgdG9FZGl0RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHRoaXMucmVsb2FkRm9ybVdpdGhHaXZlbkRlY0ZpbHRlckdyb3VwZSh0b0VkaXREZWNGaWx0ZXJHcm91cC5maWx0ZXJzKTtcblxuICAgIH1cblxuICB9XG5cbiAgY2xlYXJGaWx0ZXJGb3JtID0gKCkgPT4ge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyRm9ybSkge1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckZvcm0pLmZvckVhY2goa2V5ID0+IHtcblxuICAgICAgICB0aGlzLmZpbHRlckZvcm1ba2V5XSA9IHVuZGVmaW5lZDtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgb25DbGlja0luZm8oKSB7XG4gICAgY29uc29sZS5sb2coJ29uIGNsaWNrIGluZm8uIE5vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgLypcbiAgICogYXBwZW5kVG9DdXJyZW50RmlsdGVyc1xuICAgKlxuICAgKiBBcHBlbmQgYSBmaWx0ZXIgdG8gdGhlIGN1cnJlbnQgZmlsdGVyIGdyb3Vwc1xuICAgKi9cbiAgYXBwZW5kVG9DdXJyZW50RGVjRmlsdGVyR3JvdXBzKHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSkge1xuXG4gICAgY29uc3QgZmlsdGVyID0ge1xuICAgICAgJ3Byb3BlcnR5JzogcHJvcGVydHlOYW1lLFxuICAgICAgJ3ZhbHVlJzogcHJvcGVydHlWYWx1ZSxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpIHtcblxuICAgICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5mb3JFYWNoKChmaWx0ZXJHcm91cCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlckV4aXN0c0luVGhpc0dyb3VwID0gZmlsdGVyR3JvdXAuZmlsdGVycy5maW5kKGZpbHRlckdyb3VwRmlsdGVyID0+IGZpbHRlckdyb3VwRmlsdGVyLnByb3BlcnR5ID09PSBmaWx0ZXIucHJvcGVydHkpO1xuXG4gICAgICAgIGlmICghZmlsdGVyRXhpc3RzSW5UaGlzR3JvdXApIHtcblxuICAgICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMucHVzaChmaWx0ZXIpO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gW3sgZmlsdGVyczogW2ZpbHRlcl0gfV07XG5cbiAgICB9XG5cbiAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicztcblxuICAgIHRoaXMucmVhY2FsY3VsYXRlQW5kRW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICB9XG5cbiAgY2xvc2VGaWx0ZXJzKCkge1xuXG4gICAgdGhpcy5lZGl0aW9uR3JvdXBJbmRleCA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gZmFsc2U7XG5cbiAgICB0aGlzLnNob3dTZWFyY2hJbnB1dCA9IGZhbHNlO1xuXG4gIH1cblxuICBwcml2YXRlIHJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQgPSBmYWxzZSkge1xuXG4gICAgdGhpcy5lbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcyhyZWNvdW50KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNQZXJzaXN0ZW5jZSkge1xuXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5KClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2VGaWx0ZXJzKCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICAgICAgICB9KTtcblxuXG4gICAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZWxvYWRGb3JtV2l0aEdpdmVuRGVjRmlsdGVyR3JvdXBlKGZpbHRlcnMpIHtcblxuICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICBmaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcblxuICAgICAgaWYgKGZpbHRlci52YWx1ZSkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRm9ybVtmaWx0ZXIucHJvcGVydHldID0gZmlsdGVyLnZhbHVlO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHRoaXMub3BlbkZpbHRlcnMoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuRmlsdGVycygpIHtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gdHJ1ZTtcblxuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gdHJ1ZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVBZHZhbmNlZEZpbHRlcigpIHtcblxuICAgIGlmICh0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQuZm9ybSA9IHRoaXMuZmlsdGVyRm9ybTtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5vblNlYXJjaCA9IHRoaXMub25TZWFyY2g7XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQub25DbGVhciA9IHRoaXMuY2xlYXJGaWx0ZXJGb3JtO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VhcmNoLnN1YnNjcmliZShmaWx0ZXJFdmVudCA9PiB7XG5cbiAgICAgICAgaWYgKGZpbHRlckV2ZW50LmNoaWxkcmVuKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSAnY29sbGFwc2UnO1xuXG4gICAgICAgICAgdGhpcy5jaGlsZHJlbkZpbHRlcnMgPSBmaWx0ZXJFdmVudC5jaGlsZHJlbjtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gJ3RhYnMnO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMudGFic0ZpbHRlciA9IGZpbHRlckV2ZW50LmZpbHRlcnM7XG5cbiAgICAgICAgdGhpcy5lbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwcyh0aGlzLmlzSXRGaXJzdExvYWQgfHwgZmlsdGVyRXZlbnQucmVjb3VudCk7XG5cbiAgICAgICAgdGhpcy5pc0l0Rmlyc3RMb2FkID0gZmFsc2U7XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpIHtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXIgPSBbXTtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicyA9IFtdO1xuXG4gICAgaWYgKHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgJiYgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5sZW5ndGgpIHtcblxuICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5mb3JFYWNoKChmaWx0ZXJHcm91cDogeyBmaWx0ZXJzOiBhbnlbXSB9KSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5ID0ge1xuICAgICAgICAgIGZpbHRlcnM6IGZpbHRlckdyb3VwLmZpbHRlcnMuc2xpY2UoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcbiAgICAgICAgICBmaWx0ZXJHcm91cENvcHkuZmlsdGVycy5wdXNoKC4uLnRoaXMudGFic0ZpbHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RmlsdGVyLnB1c2goZmlsdGVyR3JvdXBDb3B5KTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJHcm91cC5maWx0ZXJzLnNsaWNlKClcbiAgICAgICAgfTtcblxuICAgICAgICBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMucHVzaChmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcblxuICAgICAgY3VycmVudEZpbHRlci5wdXNoKHsgZmlsdGVyczogdGhpcy50YWJzRmlsdGVyIH0pO1xuXG4gICAgfVxuXG4gICAgdGhpcy5maWx0ZXJHcm91cHMgPSBjdXJyZW50RmlsdGVyLmxlbmd0aCA/IGN1cnJlbnRGaWx0ZXIgOiB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gY3VycmVudEZpbHRlcldpdGhvdXRUYWJzLmxlbmd0aCA/IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qXG4gICAqIGVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQgPSBmYWxzZSkge1xuXG4gICAgbGV0IGZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzID8gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlckdyb3VwcykpIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICB0aGlzLm1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gICAgICBpZiAodGhpcy5wcmVTZWFyY2gpIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMgPSB0aGlzLnByZVNlYXJjaChmaWx0ZXJHcm91cHMpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VhcmNoLmVtaXQoe1xuICAgICAgICBmaWx0ZXJHcm91cHM6IGZpbHRlckdyb3VwcyxcbiAgICAgICAgcmVjb3VudDogcmVjb3VudCxcbiAgICAgICAgZmlsdGVyTW9kZTogdGhpcy5maWx0ZXJNb2RlLFxuICAgICAgICBjaGlsZHJlbjogdGhpcy5jaGlsZHJlbkZpbHRlcnMsXG4gICAgICB9KTtcblxuICAgICAgcmVzKCk7XG5cbiAgICB9KTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBhY3RCeUNsaWNrUG9zaXRpb25cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZGV0ZWN0XG4gICAqL1xuICBwcml2YXRlIGFjdEJ5Q2xpY2tQb3NpdGlvbiA9ICgkZXZlbnQpID0+IHtcblxuICAgIGlmIChldmVudCAmJiBldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGNsaWNrZWRJbnNpZGVGaWx0ZXIgPSAkZXZlbnRbJ3BhdGgnXS5maW5kKHBhdGggPT4ge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAke3BhdGhbJ2NsYXNzTmFtZSddfWAgfHwgJyc7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlV3JhcHBlciA9IGNsYXNzTmFtZS5pbmRleE9mKHRoaXMuY2xpY2thYmxlQ29udGFpbmVyQ2xhc3MpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3B0aW9uID0gY2xhc3NOYW1lLmluZGV4T2YoJ21hdC1vcHRpb24nKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZURhdGVQaWNrZXIgPSBjbGFzc05hbWUuaW5kZXhPZignbWF0LWRhdGVwaWNrZXItY29udGVudCcpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3ZlcmxheUNvbnRhaW5lciA9IGNsYXNzTmFtZS5pbmRleE9mKCdjZGstb3ZlcmxheS1jb250YWluZXInKSA+PSAwO1xuXG4gICAgICAgIHJldHVybiBpbnNpZGVXcmFwcGVyIHx8IGluc2lkZU9wdGlvbiB8fCBpbnNpZGVEYXRlUGlja2VyIHx8IGluc2lkZU92ZXJsYXlDb250YWluZXI7XG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWNsaWNrZWRJbnNpZGVGaWx0ZXIpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaENsaWNrKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5hY3RCeUNsaWNrUG9zaXRpb24sIHRydWUpO1xuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nQ2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nQ2xpY2soKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmFjdEJ5Q2xpY2tQb3NpdGlvbiwgdHJ1ZSk7XG4gIH1cblxuICAvKlxuICAgKiBjb21wb25lbnRUYWJOYW1lXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGNvbXBvbmVudEZpbHRlck5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICctZmlsdGVyJztcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVXJsRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVXJsRmlsdGVyKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc1BlcnNpc3RlbmNlKSB7XG5cbiAgICAgIHJldHVybjtcblxuICAgIH1cblxuICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgICAuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcblxuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cbiAgICAgICAgICBpZiAodGhpcy5uYW1lKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGJhc2U2NEZpbHRlciA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudEZpbHRlck5hbWUoKV07XG5cbiAgICAgICAgICAgIGlmIChiYXNlNjRGaWx0ZXIpIHtcblxuICAgICAgICAgICAgICBpZiAoYmFzZTY0RmlsdGVyICE9PSB0aGlzLmN1cnJlbnRVcmxFbmNvZGVkRmlsdGVyKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmdldEpzb25Gcm9tQmFzZTY0RmlsdGVyKGJhc2U2NEZpbHRlcik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gZmlsdGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VudEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25TZWFyY2goKTtcblxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sIDEwKTtcblxuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVXJsRmlsdGVyKCkge1xuXG4gICAgaWYgKHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24pIHtcblxuICAgICAgdGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZWZyZXNoRmlsdGVySW5VcmxRdWVyeVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWZyZXNoRmlsdGVySW5VcmxRdWVyeSgpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgY29uc3QgZmlsdGVyQmFzZTY0ID0gdGhpcy5nZXRCYXNlNjRGaWx0ZXJGcm9tRGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgICAgIHRoaXMuc2V0RmlsdGVySW5VcmxRdWVyeShmaWx0ZXJCYXNlNjQpLnRoZW4ocmVzLCByZWopO1xuXG4gICAgfSk7XG5cblxuICB9XG5cbiAgLypcbiAgICogc2V0RmlsdGVySW5VcmxRdWVyeVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRGaWx0ZXJJblVybFF1ZXJ5KGZpbHRlcikge1xuXG4gICAgdGhpcy5jdXJyZW50VXJsRW5jb2RlZEZpbHRlciA9IGZpbHRlcjtcblxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcblxuICAgIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50RmlsdGVyTmFtZSgpXSA9IGZpbHRlcjtcblxuICAgIHJldHVybiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4nXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLCBxdWVyeVBhcmFtczogcXVlcnlQYXJhbXMsIHJlcGxhY2VVcmw6IHRydWUgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1VybEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRCYXNlNjRGaWx0ZXJGcm9tRGVjRmlsdGVyR3JvdXBzKCkge1xuICAgIGlmICh0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzICYmIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBiYXNlNjRGaWx0ZXIgPSBidG9hKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzKSkpO1xuICAgICAgY29uc3QgYmFzZUZpbHRlcldpdGhvdXRFcXVhbFNpZ24gPSBiYXNlNjRGaWx0ZXIucmVwbGFjZSgvPS9nLCAnJyk7XG4gICAgICByZXR1cm4gYmFzZUZpbHRlcldpdGhvdXRFcXVhbFNpZ247IC8vIHJlbW92ZXMgPSBiZWZvciBlc2V0IHRoZSBmaWx0ZXJcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICogU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkwMjA0MDkvaXMtaXQtb2stdG8tcmVtb3ZlLXRoZS1lcXVhbC1zaWducy1mcm9tLWEtYmFzZTY0LXN0cmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRKc29uRnJvbUJhc2U2NEZpbHRlcihiYXNlNjRGaWx0ZXIpIHtcbiAgICBjb25zdCBiYXNlNjRQYWRMZW4gPSAoYmFzZTY0RmlsdGVyLmxlbmd0aCAlIDQpID4gMCA/IDQgLSAoYmFzZTY0RmlsdGVyLmxlbmd0aCAlIDQpIDogMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFzZTY0UGFkTGVuOyBpKyspIHtcbiAgICAgIGJhc2U2NEZpbHRlciArPSAnPSc7IC8vIGFkZCA9IGJlZm9yZSByZWFkZCB0aGUgZmlsdGVyXG4gICAgfVxuXG4gICAgbGV0IGZpbHRlck9iamVjdDtcblxuICAgIHRyeSB7XG4gICAgICBmaWx0ZXJPYmplY3QgPSBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudChhdG9iKGJhc2U2NEZpbHRlcikpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbXNnID0gJ0xpc3RGaWx0ZXJDb21wb25lbnQ6OiBGYWlsZWQgdG8gcGFyc2UgdGhlIGZpbHRlci4gVGhlIHZhbHVlIGlzIG5vdCB2YWxpZCBhbmQgdGhlIGZpbHRlciB3YXMgcmVtb3ZlZC4gRmlsdGVyIHZhbHVlOiAnO1xuICAgICAgY29uc29sZS5lcnJvcihtc2csIGJhc2U2NEZpbHRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U2NEZpbHRlciA/IGZpbHRlck9iamVjdCA6IHVuZGVmaW5lZDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZmlsdGVyR3JvdXBzPy5sZW5ndGhcIiBjbGFzcz1cImRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXJcIj5cblxuICA8bWF0LWNoaXAtbGlzdD5cblxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGdyb3VwIG9mIGZpbHRlckdyb3VwczsgbGV0IGdyb3VwSW5kZXggPSBpbmRleDtcIj5cbiAgICAgIDxtYXQtY2hpcCAqbmdJZj1cImdyb3VwPy5maWx0ZXJzXCIgKGNsaWNrKT1cImVkaXREZWNGaWx0ZXJHcm91cCgkZXZlbnQsIGdyb3VwSW5kZXgpXCI+XG5cbiAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IGZpbHRlciBvZiBncm91cD8uZmlsdGVyczsgbGV0IGxhc3RGaWx0ZXIgPSBsYXN0O1wiIGNsYXNzPVwiaXRlbS13cmFwcGVyXCI+XG5cbiAgICAgICAgICA8c3BhbiBbbmdTd2l0Y2hdPVwiZmlsdGVyLnByb3BlcnR5ICE9PSAnc2VhcmNoJ1wiPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPnt7ICdsYWJlbC4nICsgZmlsdGVyLnByb3BlcnR5IHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hEZWZhdWx0Pnt7ICdsYWJlbC5LZXl3b3JkJyB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cblxuICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIDxzcGFuPjombmJzcDs8L3NwYW4+XG5cbiAgICAgICAgICA8c3BhbiBbbmdTd2l0Y2hdPVwiZ2V0VmFsdWV0eXBlKGZpbHRlci52YWx1ZSlcIiBjbGFzcz1cInZhbHVlLXdyYXBwZXJcIj5cblxuICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiPnt7IGZpbHRlci52YWx1ZSB8IGRhdGUgfX08L3NwYW4+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaERlZmF1bHQ+e3sgZmlsdGVyLnZhbHVlIH19PC9zcGFuPlxuXG4gICAgICAgICAgPC9zcGFuID5cblxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWxhc3RGaWx0ZXJcIj4sPC9zcGFuPlxuXG4gICAgICAgICAgJm5ic3A7XG5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiAoY2xpY2spPVwicmVtb3ZlRGVjRmlsdGVyR3JvdXAoJGV2ZW50LCBncm91cEluZGV4KVwiPnJlbW92ZV9jaXJjbGU8L2k+XG5cbiAgICAgIDwvbWF0LWNoaXA+XG5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICA8L21hdC1jaGlwLWxpc3Q+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtdGFiLWJvZHktY29udGVudHtwYWRkaW5nOjE2cHggMH0ubWF0LWZvcm0tZmllbGQtcHJlZml4e21hcmdpbi1yaWdodDo4cHghaW1wb3J0YW50fS5tYXQtZm9ybS1maWVsZC1zdWZmaXh7bWFyZ2luLWxlZnQ6OHB4IWltcG9ydGFudH0ubWF0LWVsZXZhdGlvbi16MHtib3gtc2hhZG93OjAgMCAwIDAgcmdiYSgwLDAsMCwuMiksMCAwIDAgMCByZ2JhKDAsMCwwLC4xNCksMCAwIDAgMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejF7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoye2JveC1zaGFkb3c6MCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16M3tib3gtc2hhZG93OjAgM3B4IDNweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgM3B4IDRweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejR7Ym94LXNoYWRvdzowIDJweCA0cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDRweCA1cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMTBweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NXtib3gtc2hhZG93OjAgM3B4IDVweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNXB4IDhweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxNHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo2e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA2cHggMTBweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxOHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo3e2JveC1zaGFkb3c6MCA0cHggNXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCA3cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgMnB4IDE2cHggMXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OHtib3gtc2hhZG93OjAgNXB4IDVweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOHB4IDEwcHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNHB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejl7Ym94LXNoYWRvdzowIDVweCA2cHggLTNweCByZ2JhKDAsMCwwLC4yKSwwIDlweCAxMnB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAzcHggMTZweCAycHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMHtib3gtc2hhZG93OjAgNnB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgMTBweCAxNHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMThweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMXtib3gtc2hhZG93OjAgNnB4IDdweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTFweCAxNXB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMjBweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMntib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTJweCAxN3B4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjJweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxM3tib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTNweCAxOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjRweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNHtib3gtc2hhZG93OjAgN3B4IDlweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTRweCAyMXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjZweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNXtib3gtc2hhZG93OjAgOHB4IDlweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTVweCAyMnB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMjhweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNntib3gtc2hhZG93OjAgOHB4IDEwcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE2cHggMjRweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMwcHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTd7Ym94LXNoYWRvdzowIDhweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxN3B4IDI2cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAzMnB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE4e2JveC1zaGFkb3c6MCA5cHggMTFweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMThweCAyOHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzRweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxOXtib3gtc2hhZG93OjAgOXB4IDEycHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDE5cHggMjlweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgN3B4IDM2cHggNnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjB7Ym94LXNoYWRvdzowIDEwcHggMTNweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjBweCAzMXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggMzhweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMXtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMXB4IDMzcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCA0MHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIye2JveC1zaGFkb3c6MCAxMHB4IDE0cHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIycHggMzVweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQycHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjN7Ym94LXNoYWRvdzowIDExcHggMTRweCAtN3B4IHJnYmEoMCwwLDAsLjIpLDAgMjNweCAzNnB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA5cHggNDRweCA4cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyNHtib3gtc2hhZG93OjAgMTFweCAxNXB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyNHB4IDM4cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NnB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1iYWRnZS1zbWFsbCAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjZweH0ubWF0LWJhZGdlLWxhcmdlIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6MjRweH0ubWF0LWgxLC5tYXQtaGVhZGxpbmUsLm1hdC10eXBvZ3JhcGh5IGgxe2ZvbnQ6NDAwIDI0cHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDIsLm1hdC10aXRsZSwubWF0LXR5cG9ncmFwaHkgaDJ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMywubWF0LXN1YmhlYWRpbmctMiwubWF0LXR5cG9ncmFwaHkgaDN7Zm9udDo0MDAgMTZweC8yOHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNCwubWF0LXN1YmhlYWRpbmctMSwubWF0LXR5cG9ncmFwaHkgaDR7Zm9udDo0MDAgMTVweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgaDV7Zm9udDo0MDAgMTEuNjJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgaDZ7Zm9udDo0MDAgOS4zOHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWJvZHktMiwubWF0LWJvZHktc3Ryb25ne2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5LC5tYXQtYm9keS0xLC5tYXQtdHlwb2dyYXBoeXtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSBwLC5tYXQtYm9keS0xIHAsLm1hdC10eXBvZ3JhcGh5IHB7bWFyZ2luOjAgMCAxMnB4fS5tYXQtY2FwdGlvbiwubWF0LXNtYWxse2ZvbnQ6NDAwIDEycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1kaXNwbGF5LTQsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS00e2ZvbnQ6MzAwIDExMnB4LzExMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDU2cHg7bGV0dGVyLXNwYWNpbmc6LS4wNWVtfS5tYXQtZGlzcGxheS0zLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktM3tmb250OjQwMCA1NnB4LzU2cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAyZW19Lm1hdC1kaXNwbGF5LTIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ye2ZvbnQ6NDAwIDQ1cHgvNDhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDA1ZW19Lm1hdC1kaXNwbGF5LTEsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0xe2ZvbnQ6NDAwIDM0cHgvNDBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4fS5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtZmxhdC1idXR0b24sLm1hdC1pY29uLWJ1dHRvbiwubWF0LW1pbmktZmFiLC5tYXQtcmFpc2VkLWJ1dHRvbiwubWF0LXN0cm9rZWQtYnV0dG9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1idXR0b24tdG9nZ2xlLC5tYXQtY2FyZHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWNhcmQtY29udGVudCwubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZSwubWF0LWNhcmQtc3VidGl0bGV7Zm9udC1zaXplOjE0cHh9Lm1hdC1jaGVja2JveHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jaGVja2JveC1sYXlvdXQgLm1hdC1jaGVja2JveC1sYWJlbHtsaW5lLWhlaWdodDoyNHB4fS5tYXQtY2hpcHtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDoxOHB4fS5tYXQtY2hpcCAubWF0LWNoaXAtcmVtb3ZlLm1hdC1pY29uLC5tYXQtY2hpcCAubWF0LWNoaXAtdHJhaWxpbmctaWNvbi5tYXQtaWNvbntmb250LXNpemU6MThweH0ubWF0LXRhYmxle2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWhlYWRlci1jZWxse2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNlbGwsLm1hdC1mb290ZXItY2VsbHtmb250LXNpemU6MTRweH0ubWF0LWNhbGVuZGFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhbGVuZGFyLWJvZHl7Zm9udC1zaXplOjEzcHh9Lm1hdC1jYWxlbmRhci1ib2R5LWxhYmVsLC5tYXQtY2FsZW5kYXItcGVyaW9kLWJ1dHRvbntmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXIgdGh7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtZGlhbG9nLXRpdGxle2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTVweDtmb250LXdlaWdodDo0MDB9Lm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlO2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjEyNTtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29ue2ZvbnQtc2l6ZToxNTAlO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b257aGVpZ2h0OjEuNWVtO3dpZHRoOjEuNWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbntoZWlnaHQ6MS4xMjVlbTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNWVtIDA7Ym9yZGVyLXRvcDouODQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudH0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlcnt0b3A6LS44NDM3NWVtO3BhZGRpbmctdG9wOi44NDM3NWVtfS5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7Zm9udC1zaXplOjc1JTttYXJnaW4tdG9wOi42NjY2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjc5MTY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi40Mzc1ZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbDotd2Via2l0LWF1dG9maWxsKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIzZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM1JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjI4MTI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye21hcmdpbi10b3A6LjU0MTY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNjY2NjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouMjVlbSAwIC43NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjA5Mzc1ZW07bWFyZ2luLXRvcDotLjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6MWVtIDB9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtb3V0bGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjg0Mzc1ZW07bWFyZ2luLXRvcDotLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyLC5tYXQtZ3JpZC10aWxlLWhlYWRlcntmb250LXNpemU6MTRweH0ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lLC5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTJweH1pbnB1dC5tYXQtaW5wdXQtZWxlbWVudHttYXJnaW4tdG9wOi0uMDYyNWVtfS5tYXQtbWVudS1pdGVte2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1wYWdpbmF0b3IsLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4fS5tYXQtcmFkaW8tYnV0dG9uLC5tYXQtc2VsZWN0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNlbGVjdC10cmlnZ2Vye2hlaWdodDoxLjEyNWVtfS5tYXQtc2xpZGUtdG9nZ2xlLWNvbnRlbnR7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1zdGVwcGVyLWhvcml6b250YWwsLm1hdC1zdGVwcGVyLXZlcnRpY2Fse2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXN0ZXAtbGFiZWx7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtc3RlcC1sYWJlbC1zZWxlY3RlZHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC10YWItZ3JvdXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLWxpbmt7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRvb2xiYXIsLm1hdC10b29sYmFyIGgxLC5tYXQtdG9vbGJhciBoMiwubWF0LXRvb2xiYXIgaDMsLm1hdC10b29sYmFyIGg0LC5tYXQtdG9vbGJhciBoNSwubWF0LXRvb2xiYXIgaDZ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MH0ubWF0LXRvb2x0aXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjZweDtwYWRkaW5nLWJvdHRvbTo2cHh9Lm1hdC10b29sdGlwLWhhbmRzZXR7Zm9udC1zaXplOjE0cHg7cGFkZGluZy10b3A6OXB4O3BhZGRpbmctYm90dG9tOjlweH0ubWF0LWxpc3QtaXRlbSwubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWxpc3QgLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTZweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxNHB4fS5tYXQtbGlzdCAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTJweH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LW9wdGlvbntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHh9Lm1hdC1vcHRncm91cC1sYWJlbHtmb250OjUwMCAxNHB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2ltcGxlLXNuYWNrYmFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweH0ubWF0LXNpbXBsZS1zbmFja2Jhci1hY3Rpb257bGluZS1oZWlnaHQ6MTtmb250LWZhbWlseTppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRyZWV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdHJlZS1ub2Rle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTRweH0ubWF0LXJpcHBsZXtvdmVyZmxvdzpoaWRkZW59QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7Lm1hdC1yaXBwbGV7ZGlzcGxheTpub25lfX0ubWF0LXJpcHBsZS5tYXQtcmlwcGxlLXVuYm91bmRlZHtvdmVyZmxvdzp2aXNpYmxlfS5tYXQtcmlwcGxlLWVsZW1lbnR7cG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyLXJhZGl1czo1MCU7cG9pbnRlci1ldmVudHM6bm9uZTt0cmFuc2l0aW9uOm9wYWNpdHksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7dHJhbnNpdGlvbjpvcGFjaXR5LHRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpLC13ZWJraXQtdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfS5jZGstdmlzdWFsbHktaGlkZGVue2JvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O21hcmdpbjotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MXB4O291dGxpbmU6MDstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXIsLmNkay1vdmVybGF5LWNvbnRhaW5lcntwb2ludGVyLWV2ZW50czpub25lO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1jb250YWluZXI6ZW1wdHl7ZGlzcGxheTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlcntkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1wYW5le3Bvc2l0aW9uOmFic29sdXRlO3BvaW50ZXItZXZlbnRzOmF1dG87Ym94LXNpemluZzpib3JkZXItYm94O3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7bWF4LXdpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlfS5jZGstb3ZlcmxheS1iYWNrZHJvcHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDt6LWluZGV4OjEwMDA7cG9pbnRlci1ldmVudHM6YXV0bzstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7dHJhbnNpdGlvbjpvcGFjaXR5IC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtvcGFjaXR5OjB9LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eToxfUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6LjZ9fS5jZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9we2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMjg4KX0uY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AsLmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTowfS5jZGstb3ZlcmxheS1jb25uZWN0ZWQtcG9zaXRpb24tYm91bmRpbmctYm94e3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21pbi13aWR0aDoxcHg7bWluLWhlaWdodDoxcHh9LmNkay1nbG9iYWwtc2Nyb2xsYmxvY2t7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtvdmVyZmxvdy15OnNjcm9sbH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOi13ZWJraXQtYXV0b2ZpbGx7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOm5vdCg6LXdlYmtpdC1hdXRvZmlsbCl7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZXtyZXNpemU6bm9uZX10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5ne2hlaWdodDphdXRvIWltcG9ydGFudDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3BhZGRpbmc6MnB4IDAhaW1wb3J0YW50O2JveC1zaXppbmc6Y29udGVudC1ib3ghaW1wb3J0YW50fS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVye21hcmdpbjoxNnB4IDAgOHB4fS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC5pdGVtLXdyYXBwZXJ7bWF4LXdpZHRoOjE1ZW07b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwfS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC5pdGVtLXdyYXBwZXIsLmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLm1hdGVyaWFsLWljb25ze2NvbG9yOiM5Njk2OTZ9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLmZpbHRlci1jb250ZW50e21hcmdpbi1yaWdodDo4cHh9LmRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLXdyYXBwZXIgLm1hdC1jaGlwe2N1cnNvcjpwb2ludGVyfS5kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS13cmFwcGVyIC52YWx1ZS13cmFwcGVye2NvbG9yOiNlZjNmNTR9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgZmlsdGVyR3JvdXBzID0gW107XG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgZWRpdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgZWRpdERlY0ZpbHRlckdyb3VwKCRldmVudCwgZmlsdGVyR3JvdXApIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5lZGl0LmVtaXQoZmlsdGVyR3JvdXApO1xuICB9XG4gIHJlbW92ZURlY0ZpbHRlckdyb3VwKCRldmVudCwgZmlsdGVyR3JvdXApIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5yZW1vdmUuZW1pdChmaWx0ZXJHcm91cCk7XG4gIH1cblxuICBnZXRWYWx1ZXR5cGUodmFsdWUpIHtcblxuICAgIGNvbnN0IGZpcnN0VmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlWzBdIDogdmFsdWU7XG5cbiAgICBsZXQgdHlwZTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBgJHtmaXJzdFZhbHVlfWAuaW5kZXhPZignMDAwWicpID49IDA6XG4gICAgICAgIHR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdHlwZSA9ICdkZWZhdWx0JztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGU7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdENoaXBzTW9kdWxlLCBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNMaXN0QWN0aXZlRmlsdGVyUmVzdW1lQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlY1Blcm1pc3Npb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWNQZXJtaXNzaW9uRGlyZWN0aXZlIHtcblxuICBwcml2YXRlIGhhc1ZpZXcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IERlY0FwaVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY1Blcm1pc3Npb24ocDogc3RyaW5nW10pIHtcbiAgICBpZiAoIXApIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XG4gICAgICB0aGlzLmhhc1ZpZXcgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc1Blcm1pc3Npb24ocCk7XG4gICAgfVxuICB9XG5cbiAgaGFzUGVybWlzc2lvbihwKSB7XG4gICAgdGhpcy5zZXJ2aWNlLnVzZXIkLnN1YnNjcmliZShcbiAgICAgIHVzZXIgPT4ge1xuICAgICAgICBpZiAodXNlciAmJiB0aGlzLmlzQWxsb3dlZEFjY2VzcyhwLCB1c2VyLnBlcm1pc3Npb25zKSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXNWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgICAgICAgdGhpcy5oYXNWaWV3ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgICAgdGhpcy5oYXNWaWV3ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FsbG93ZWRBY2Nlc3Mocm9sZXNBbGxvd2VkOiBzdHJpbmdbXSA9IFtdLCBjdXJyZW50Um9sZXM6IHN0cmluZ1tdID0gW10pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWF0Y2hpbmdSb2xlID0gY3VycmVudFJvbGVzLmZpbmQoKHVzZXJSb2xlKSA9PiB7XG4gICAgICAgIHJldHVybiByb2xlc0FsbG93ZWQuZmluZCgoYWxvd2VkUm9sZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBhbG93ZWRSb2xlID09PSB1c2VyUm9sZTtcbiAgICAgICAgfSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXRjaGluZ1JvbGUgPyB0cnVlIDogZmFsc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNQZXJtaXNzaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kZWMtcGVybWlzc2lvbi5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjUGVybWlzc2lvbkRpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUGVybWlzc2lvbkRpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0xpc3RGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdENhcmRNb2R1bGUsIE1hdENoaXBzTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdEFjdGl2ZUZpbHRlclJlc3VtZU1vZHVsZSB9IGZyb20gJy4vLi4vbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZS9saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNQZXJtaXNzaW9uTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi8uLi9kaXJlY3RpdmVzL3Blcm1pc3Npb24vZGVjLXBlcm1pc3Npb24ubW9kdWxlJztcbmltcG9ydCB7IERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYnMtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIERlY0xpc3RBY3RpdmVGaWx0ZXJSZXN1bWVNb2R1bGUsXG4gICAgRGVjUGVybWlzc2lvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEZpbHRlckNvbXBvbmVudCwgRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjTGlzdEZpbHRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RGaWx0ZXJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3cgd3JhcFwiIFtmeExheW91dEdhcF09XCJpdGVtR2FwXCIgPlxuICA8ZGl2ICpuZ0Zvcj1cImxldCByb3cgb2Ygcm93czsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCByb3csIHJvd3MsIGkpXCIgW2Z4RmxleF09XCJpdGVtV2lkdGhcIj5cbiAgICA8ZGl2IFtuZ1N0eWxlXT1cInttYXJnaW46IGl0ZW1HYXB9XCI+XG4gICAgICA8bmctY29udGFpbmVyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlUmVmXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntyb3c6IHJvdyB8fCB7fSwgbGlzdDogcm93cyB8fCBbXSwgaW5kZXg6IGl9XCJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0R3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgaXRlbVdpZHRoID0gJzI4MHB4JztcblxuICBASW5wdXQoKSBpdGVtR2FwID0gJzhweCc7XG5cbiAgQE91dHB1dCgpIHJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX3Jvd3MgPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHNldCByb3dzKHY6IGFueSkge1xuICAgIGlmICh0aGlzLl9yb3dzICE9PSB2KSB7XG4gICAgICB0aGlzLl9yb3dzID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcm93cztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgb25JdGVtQ2xpY2soZXZlbnQsIGl0ZW0sIGxpc3QsIGluZGV4KSB7XG5cbiAgICB0aGlzLnJvd0NsaWNrLmVtaXQoe2V2ZW50LCBpdGVtLCBsaXN0LCBpbmRleH0pO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ29udGVudENoaWxkLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC10YWJsZS1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQge1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHByb3A7XG5cbiAgQElucHV0KCkgdGl0bGUgPSAnJztcblxuICBASW5wdXQoKSBzZXQgY29sU3Bhbih2KSB7XG4gICAgY29uc3QgbnVtYmVyID0gK3Y7XG4gICAgdGhpcy5fY29sU3BhbiA9IGlzTmFOKG51bWJlcikgPyAxIDogbnVtYmVyO1xuICB9XG5cbiAgZ2V0IGNvbFNwYW4oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY29sU3BhbjtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbFNwYW4gPSAxO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vLi4vbGlzdC10YWJsZS1jb2x1bW4vbGlzdC10YWJsZS1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7IERhdGF0YWJsZUNvbXBvbmVudCB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtdGFibGUnLFxuICB0ZW1wbGF0ZTogYDxuZ3gtZGF0YXRhYmxlICN0YWJsZUNvbXBvbmVudFxuICBjb2x1bW5Nb2RlPVwiZmxleFwiXG4gIGhlYWRlckhlaWdodD1cIjI0cHhcIlxuICByb3dIZWlnaHQ9XCJhdXRvXCJcbiAgW2V4dGVybmFsU29ydGluZ109XCJ0cnVlXCJcbiAgW21lc3NhZ2VzXT1cIntlbXB0eU1lc3NhZ2U6Jyd9XCJcbiAgW3Jvd3NdPVwicm93c1wiXG4gIChzb3J0KT1cIm9uU29ydCgkZXZlbnQpXCJcbiAgKGFjdGl2YXRlKT1cIm9uSXRlbUNsaWNrKCRldmVudClcIj5cblxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInt7Y29sdW1uLnRpdGxlIHwgdHJhbnNsYXRlfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtmbGV4R3Jvd109XCJjb2x1bW4uY29sU3BhblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgW3Byb3BdPVwiY29sdW1uLnByb3BcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtzb3J0YWJsZV09XCJjb2x1bW4ucHJvcCA/IHRydWUgOiBmYWxzZVwiPlxuXG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiY29sdW1uLnRlbXBsYXRlID8gdHJ1ZSA6IGZhbHNlXCJcbiAgICAgIGxldC1yb3c9XCJyb3dcIlxuICAgICAgbGV0LWluZGV4PVwicm93SW5kZXhcIlxuICAgICAgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlPlxuXG4gICAgICA8bmctY29udGFpbmVyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbi50ZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cm93OiByb3cgfHwge30sIGxpc3Q6IHJvd3MgfHwgW10sIGluZGV4OiBpbmRleH1cIlxuICAgICAgPjwvbmctY29udGFpbmVyPlxuXG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuXG48L25neC1kYXRhdGFibGU+XG5gLFxuICBzdHlsZXM6IFtgOjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5vdmVyZmxvdy12aXNpYmxle292ZXJmbG93OnZpc2libGUhaW1wb3J0YW50fTo6bmctZGVlcCBkYXRhdGFibGUtc2Nyb2xsZXJ7d2lkdGg6MTAwJSFpbXBvcnRhbnR9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlLm5vLW92ZXJmbG93e292ZXJmbG93OmF1dG99OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlLm5vLXBhZGRpbmcgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbCAuZGF0YXRhYmxlLWJvZHktY2VsbC1sYWJlbHtwYWRkaW5nOjB9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5kYXRhdGFibGUtaGVhZGVye3BhZGRpbmc6MTFweCAxNnB4fTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWhlYWRlciAuZGF0YXRhYmxlLWhlYWRlci1jZWxsLWxhYmVse2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1ib2R5LXJvdyAuZGF0YXRhYmxlLWJvZHktY2VsbHtmb250LXNpemU6MTNweDtmb250LXdlaWdodDo0MDA7b3ZlcmZsb3c6aGlkZGVuO21pbi1oZWlnaHQ6MTAwJTtkaXNwbGF5OnRhYmxlOy13ZWJraXQtdXNlci1zZWxlY3Q6aW5pdGlhbDstbW96LXVzZXItc2VsZWN0OmluaXRpYWw7LW1zLXVzZXItc2VsZWN0OmluaXRpYWw7LW8tdXNlci1zZWxlY3Q6aW5pdGlhbDt1c2VyLXNlbGVjdDppbml0aWFsfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWJvZHktcm93IC5kYXRhdGFibGUtYm9keS1jZWxsIC5kYXRhdGFibGUtYm9keS1jZWxsLWxhYmVse3BhZGRpbmc6MTZweDtkaXNwbGF5OnRhYmxlLWNlbGw7dmVydGljYWwtYWxpZ246bWlkZGxlO3dvcmQtYnJlYWs6YnJlYWstYWxsfTo6bmctZGVlcCAubmd4LWRhdGF0YWJsZSAuZGF0YXRhYmxlLWJvZHktcm93IC5kYXRhdGFibGUtYm9keS1jZWxsLmNlbGwtdG9wIC5kYXRhdGFibGUtYm9keS1jZWxsLWxhYmVse3ZlcnRpY2FsLWFsaWduOnRvcH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLmRhdGF0YWJsZS1yb3ctZGV0YWlse3BhZGRpbmc6MTBweH06Om5nLWRlZXAgLm5neC1kYXRhdGFibGUgLnNvcnQtYnRue3dpZHRoOjA7aGVpZ2h0OjB9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5pY29uLWRvd257Ym9yZGVyLWxlZnQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDo1cHggc29saWQgdHJhbnNwYXJlbnR9OjpuZy1kZWVwIC5uZ3gtZGF0YXRhYmxlIC5pY29uLXVwe2JvcmRlci1sZWZ0OjVweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6NXB4IHNvbGlkIHRyYW5zcGFyZW50fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJsZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHJvd3Modikge1xuICAgIGlmICh0aGlzLl9yb3dzICE9PSB2KSB7XG4gICAgICB0aGlzLl9yb3dzID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcm93cztcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoRGF0YXRhYmxlQ29tcG9uZW50KSB0YWJsZUNvbXBvbmVudDogRGF0YXRhYmxlQ29tcG9uZW50O1xuXG4gIGNvbHVtbnNTb3J0Q29uZmlnOiBhbnk7XG5cbiAgcHJpdmF0ZSBfcm93czogQXJyYXk8YW55PiA9IFtdO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50KSBjb2x1bW5zOiBRdWVyeUxpc3Q8RGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50PjtcblxuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgcm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBvblNvcnQoZXZlbnQpIHtcblxuICAgIGNvbnN0IHNvcnRDb25maWcgPSBbe1xuICAgICAgcHJvcGVydHk6IGV2ZW50LnNvcnRzWzBdLnByb3AsXG4gICAgICBvcmRlcjoge3R5cGU6IGV2ZW50LnNvcnRzWzBdLmRpcn1cbiAgICB9XTtcblxuICAgIGlmIChzb3J0Q29uZmlnICE9PSB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnKSB7XG5cbiAgICAgIHRoaXMuY29sdW1uc1NvcnRDb25maWcgPSBzb3J0Q29uZmlnO1xuXG4gICAgICB0aGlzLnNvcnQuZW1pdCh0aGlzLmNvbHVtbnNTb3J0Q29uZmlnKTtcblxuICAgIH1cblxuICB9XG5cbiAgb25JdGVtQ2xpY2soJGV2ZW50KSB7XG5cbiAgICBjb25zdCBldmVudCA9ICRldmVudDtcblxuICAgIGNvbnN0IGl0ZW0gPSAkZXZlbnQucm93O1xuXG4gICAgY29uc3QgbGlzdCA9IHRoaXMucm93cztcblxuICAgIGNvbnN0IGluZGV4ID0gJGV2ZW50LnJvdy4kJGluZGV4O1xuXG4gICAgdGhpcy5yb3dDbGljay5lbWl0KHtldmVudCwgaXRlbSwgbGlzdCwgaW5kZXh9KTtcblxuICB9XG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJsZS9saXN0LXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZpbHRlci9saXN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRhcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBEZWNMaXN0RmV0Y2hNZXRob2QsIENvdW50UmVwb3J0IH0gZnJvbSAnLi9saXN0Lm1vZGVscyc7XG5pbXBvcnQgeyBGaWx0ZXJEYXRhLCBEZWNGaWx0ZXIsIEZpbHRlckdyb3VwcywgRmlsdGVyR3JvdXAgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsJztcbmltcG9ydCB7IERlY0xpc3RGaWx0ZXIgfSBmcm9tICcuL2xpc3QubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDwhLS0gQ09NUE9ORU5UIExBWU9VVCAtLT5cbjxkaXYgY2xhc3M9XCJsaXN0LWNvbXBvbmVudC13cmFwcGVyXCI+XG4gIDxkaXYgKm5nSWY9XCJmaWx0ZXJcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwicmVwb3J0IHx8IGZpbHRlck1vZGUgPT09ICdjb2xsYXBzZSdcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gICAgICA8ZGl2IGZ4RmxleCBjbGFzcz1cInRleHQtcmlnaHRcIiAqbmdJZj1cInRhYmxlQW5kR3JpZEFyZVNldCgpXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlTGlzdE1vZGUoKVwiPlxuICAgICAgICAgIDxtYXQtaWNvbiB0aXRsZT1cIlN3aXRjaCB0byB0YWJsZSBtb2RlXCIgYXJpYS1sYWJlbD1cIlN3aXRjaCB0byB0YWJsZSBtb2RlXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnICpuZ0lmPVwibGlzdE1vZGUgPT09ICdncmlkJ1wiPnZpZXdfaGVhZGxpbmU8L21hdC1pY29uPlxuICAgICAgICAgIDxtYXQtaWNvbiB0aXRsZT1cIlN3aXRjaCB0byBncmlkIG1vZGVcIiBhcmlhLWxhYmVsPVwiU3dpdGNoIHRvIGdyaWQgbW9kZVwiIGNvbG9yPVwicHJpbWFyeVwiIGNvbnRyYXN0Rm9udFdpdGhCZyAqbmdJZj1cImxpc3RNb2RlID09PSAndGFibGUnXCI+dmlld19tb2R1bGU8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXJNb2RlID09ICdjb2xsYXBzZScgdGhlbiBjb2xsYXBzZVRlbXBsYXRlIGVsc2UgdGFic1RlbXBsYXRlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBHUklEIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNncmlkVGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWdyaWRcIj48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRBQkxFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNsaXN0VGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LXRhYmxlXCI+PC9uZy1jb250ZW50PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBGT09URVIgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2Zvb3RlclRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gIDxwIGNsYXNzPVwibGlzdC1mb290ZXJcIj5cbiAgICB7eyAnbGFiZWwuYW1vdW50LWxvYWRlZC1vZi10b3RhbCcgfFxuICAgICAgdHJhbnNsYXRlOntcbiAgICAgICAgbG9hZGVkOiByZXBvcnQ/LnJlc3VsdD8ucm93cz8ubGVuZ3RoLFxuICAgICAgICB0b3RhbDogcmVwb3J0Py5yZXN1bHQ/LmNvdW50XG4gICAgICB9XG4gICAgfX1cbiAgPC9wPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBDT0xMQVBTRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjdGFic1RlbXBsYXRlPlxuICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gICAgPGRpdiAqbmdJZj1cImxpc3RNb2RlID09ICdncmlkJyB0aGVuIGdyaWRUZW1wbGF0ZSBlbHNlIGxpc3RUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDwhLS0gRk9PVEVSIENPTlRFTlQgLS0+XG4gICAgPGRpdiBmeEZsZXg+XG4gICAgICA8ZGl2ICpuZ0lmPVwic2hvd0Zvb3RlciAmJiAhbG9hZGluZyB0aGVuIGZvb3RlclRlbXBsYXRlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBMT0FESU5HIFNQSU5ORVIgLS0+XG4gICAgPGRpdiBmeEZsZXggKm5nSWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlciBsb2FkaW5nLXNwaW5uZXItd3JhcHBlclwiPlxuICAgICAgPGRlYy1zcGlubmVyPjwvZGVjLXNwaW5uZXI+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBMT0FEIE1PUkUgQlVUVE9OIC0tPlxuICAgIDxkaXYgZnhGbGV4ICpuZ0lmPVwiIWlzTGFzdFBhZ2UgJiYgIWxvYWRpbmcgJiYgIWRpc2FibGVTaG93TW9yZUJ1dHRvblwiIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJzaG93TW9yZSgpXCI+e3snbGFiZWwuc2hvdy1tb3JlJyB8IHRyYW5zbGF0ZX19PC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBDT0xMQVBTRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjY29sbGFwc2VUZW1wbGF0ZT5cbiAgPG1hdC1hY2NvcmRpb24+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGNvbGxhcHNhYmxlRmlsdGVyc1wiPlxuICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwgKG9wZW5lZCk9XCJzZWFyY2hDb2xsYXBzYWJsZShmaWx0ZXIpXCI+XG4gICAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sbGFwc2UtdGl0bGVcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMzJweFwiIGZ4TGF5b3V0QWxpZ249XCJsZWZ0IGNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBmeEZsZXg9XCI5NnB4XCIgKm5nSWY9XCJjb3VudFJlcG9ydFwiPlxuICAgICAgICAgICAgICA8ZGVjLWxhYmVsIFtjb2xvckhleF09XCJmaWx0ZXIuY29sb3JcIj57eyBnZXRDb2xsYXBzYWJsZUNvdW50KGZpbHRlci51aWQpIH19PC9kZWMtbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt7ICdsYWJlbC4nICsgZmlsdGVyLmxhYmVsIHwgdHJhbnNsYXRlIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJvcGVubmVkQ29sbGFwc2FibGUgPT09IGZpbHRlci51aWRcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYnNUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9tYXQtYWNjb3JkaW9uPlxuICA8ZGl2IGNsYXNzPVwiYWNjb3JkaW9uLWJvdHRvbS1tYXJnaW5cIj48L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbmAsXG4gIHN0eWxlczogW2AubGlzdC1mb290ZXJ7Zm9udC1zaXplOjE0cHg7dGV4dC1hbGlnbjpjZW50ZXJ9Lmxpc3QtY29tcG9uZW50LXdyYXBwZXJ7bWluLWhlaWdodDo3MnB4fS50ZXh0LXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9LmxvYWRpbmctc3Bpbm5lci13cmFwcGVye3BhZGRpbmc6MzJweH0uY29sbGFwc2UtdGl0bGV7d2lkdGg6MTAwJX0uYWNjb3JkaW9uLWJvdHRvbS1tYXJnaW57bWFyZ2luLWJvdHRvbToxMDBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuXG4gIC8qXG4gICogY291bnRSZXBvcnRcbiAgKlxuICAqXG4gICovXG4gIGNvdW50UmVwb3J0OiBDb3VudFJlcG9ydDtcblxuICAvKlxuICAqIGZpbHRlck1vZGVcbiAgKlxuICAqXG4gICovXG4gIGZpbHRlck1vZGU6ICd0YWJzJyB8ICdjb2xsYXBzZScgPSAndGFicyc7XG5cblxuICAvKlxuICAqIGNvbGxhcHNhYmxlRmlsdGVyc1xuICAqXG4gICpcbiAgKi9cbiAgY29sbGFwc2FibGVGaWx0ZXJzOiBEZWNMaXN0RmlsdGVyW10gPSBbXTtcblxuICAvKlxuICAgKiBsb2FkaW5nXG4gICAqXG4gICAqXG4gICAqL1xuICBzZXQgbG9hZGluZyh2KSB7XG5cbiAgICB0aGlzLl9sb2FkaW5nID0gdjtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5sb2FkaW5nID0gdjtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGxvYWRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gIH1cblxuICAvKlxuICAgKiBmaWx0ZXJHcm91cHNcbiAgICpcbiAgICpcbiAgICovXG4gIGdldCBmaWx0ZXJHcm91cHMoKTogRmlsdGVyR3JvdXBzIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHMgOiBbXTtcbiAgfVxuXG4gIC8qXG4gICAqIG9wZW5uZWRDb2xsYXBzYWJsZVxuICAgKlxuICAgKlxuICAgKi9cbiAgb3Blbm5lZENvbGxhcHNhYmxlO1xuXG4gIC8qXG4gICAqIHJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcmVwb3J0O1xuXG4gIC8qXG4gICAqIGlzTGFzdFBhZ2VcbiAgICpcbiAgICpcbiAgICovXG4gIGlzTGFzdFBhZ2U6IGJvb2xlYW47XG5cbiAgLypcbiAgKiBzZWxlY3RlZFRhYlxuICAqXG4gICpcbiAgKi9cbiAgc2VsZWN0ZWRUYWI6IGFueTtcblxuICAvKlxuICAgKiBmaWx0ZXJEYXRhXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGZpbHRlckRhdGE6IFN1YmplY3Q8RmlsdGVyRGF0YT4gPSBuZXcgU3ViamVjdDxGaWx0ZXJEYXRhPigpO1xuXG4gIC8qXG4gICAqIF9sb2FkaW5nO1xuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfbG9hZGluZyA9IHRydWU7XG5cbiAgLypcbiAgICogY2xlYXJBbmRSZWxvYWRSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgY2xlYXJBbmRSZWxvYWRSZXBvcnQ7XG5cbiAgLypcbiAgICogZmlsdGVyU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHJlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlYWN0aXZlUmVwb3J0OiBPYnNlcnZhYmxlPGFueT47XG5cbiAgLypcbiAgICogcmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiBzY3JvbGxhYmxlQ29udGFpbmVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbGFibGVDb250YWluZXI6IEVsZW1lbnQ7XG5cbiAgLypcbiAgICogc2Nyb2xsRXZlbnRFbWl0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnRFbWl0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiBzY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHRhYnNDaGFuZ2VTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdGFic0NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHRhYmxlU29ydFN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB0YWJsZVNvcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiBwYXlsb2FkXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHBheWxvYWQ6IERlY0ZpbHRlcjtcblxuICAvKlxuICAgKiBfZW5kcG9pbnQgaW50ZXJuYWxsXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9lbmRwb2ludDogc3RyaW5nO1xuXG4gIC8qXG4gICAqIGN1c3RvbUZldGNoTWV0aG9kXG4gICAqXG4gICAqIG1ldGhvZCB1c2VkIHRvIGZldGNoIGRhdGEgZnJvbSBiYWNrLWVuZFxuICAgKi9cbiAgQElucHV0KCkgY3VzdG9tRmV0Y2hNZXRob2Q6IERlY0xpc3RGZXRjaE1ldGhvZDtcblxuICAvKlxuICAgKiBjb2x1bW5zU29ydENvbmZpZ1xuICAgKlxuICAgKiB1c2VkIHRvIGdldCBhIHNvcnRlZCBsaXN0IGZyb20gYmFja2VuZFxuICAgKiBjYW4gYmUgcGFzZWQgdmlhIGF0dHJpYnV0ZSB0byBzb3J0IHRoZSBmaXJzdCBsb2FkXG4gICAqL1xuICBASW5wdXQoKSBjb2x1bW5zU29ydENvbmZpZztcblxuICAvKlxuICAgKiBkaXNhYmxlU2hvd01vcmVCdXR0b25cbiAgICpcbiAgICogdXNlZCB0byBoaWRlIHRoZSBzaG93IG1vcmUgYnV0dG9uXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlU2hvd01vcmVCdXR0b246IGJvb2xlYW47XG5cbiAgLypcbiAgICogZW5kcG9pbnRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBlbmRwb2ludCh2OiBzdHJpbmcpIHtcblxuICAgIGlmICh0aGlzLl9lbmRwb2ludCAhPT0gdikge1xuXG4gICAgICB0aGlzLl9lbmRwb2ludCA9ICh2WzBdICYmIHZbMF0gPT09ICcvJykgPyB2LnJlcGxhY2UoJy8nLCAnJykgOiB2O1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgZW5kcG9pbnQoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLl9lbmRwb2ludDtcblxuICB9XG5cbiAgLypcbiAgICogbmFtZVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuYW1lKHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9uYW1lICE9PSB2KSB7XG4gICAgICB0aGlzLl9uYW1lID0gdjtcbiAgICAgIHRoaXMuc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICAvKlxuICAgKiByb3dzXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ3Jvd3MnKVxuXG4gIHNldCByb3dzKHJvd3MpIHtcbiAgICB0aGlzLnNldFJvd3Mocm93cyk7XG4gIH1cblxuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXBvcnQgPyB0aGlzLnJlcG9ydC5yZXN1bHQucm93cyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qXG4gICAqIGxpbWl0XG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBsaW1pdCA9IDEwO1xuXG4gIC8qXG4gICAqIHNjcm9sbGFibGVDb250YWluZXJDbGFzc1xuICAgKlxuICAgKiBXaGVyZSB0aGUgc2Nyb2xsIHdhdGNoZXIgc2hvdWxkIGJlIGxpc3RlbmluZ1xuICAgKi9cbiAgQElucHV0KCkgc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzID0gJ21hdC1zaWRlbmF2LWNvbnRlbnQnO1xuXG4gIC8qXG4gICAqIHNlYXJjaGFibGVQcm9wZXJ0aWVzXG4gICAqXG4gICAqIFByb3BlcnRpZXMgdG8gYmUgc2VhcmNoZWQgd2hlbiB1c2luZyBiYXNpYyBzZWFyY2hcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaGFibGVQcm9wZXJ0aWVzOiBzdHJpbmdbXTtcblxuICAvKlxuICAgKiBzaG93Rm9vdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBzaG93Rm9vdGVyID0gdHJ1ZTtcblxuICAvKlxuICAgKiBwb3N0U2VhcmNoXG4gICAqXG4gICAqIFRoaXMgbWlkZGxld2FyZSBpcyB1c2VkIHRvIHRyaWdnZXIgZXZlbnRzIGFmdGVyIGV2ZXJ5IHNlYXJjaFxuICAgKi9cbiAgQE91dHB1dCgpIHBvc3RTZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiByb3dDbGlja1xuICAgKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIGEgcm93IG9yIGNhcmQgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpIHJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIGdyaWRcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEdyaWRDb21wb25lbnQpIGdyaWQ6IERlY0xpc3RHcmlkQ29tcG9uZW50O1xuXG4gIC8qXG4gICAqIHRhYmxlXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RUYWJsZUNvbXBvbmVudCkgdGFibGU6IERlY0xpc3RUYWJsZUNvbXBvbmVudDtcblxuICAvKlxuICAgKiBmaWx0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2ZpbHRlcjogRGVjTGlzdEZpbHRlckNvbXBvbmVudDtcblxuICBAQ29udGVudENoaWxkKERlY0xpc3RGaWx0ZXJDb21wb25lbnQpXG4gIHNldCBmaWx0ZXIodjogRGVjTGlzdEZpbHRlckNvbXBvbmVudCkge1xuICAgIGlmICh0aGlzLl9maWx0ZXIgIT09IHYpIHtcbiAgICAgIHRoaXMuX2ZpbHRlciA9IHY7XG4gICAgICB0aGlzLnNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBmaWx0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcjtcbiAgfVxuXG4gIC8qXG4gICAqIGxpc3RNb2RlXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBsaXN0TW9kZTtcblxuICAvKlxuICAgKiBnZXRMaXN0TW9kZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgZ2V0TGlzdE1vZGUgPSAoKSA9PiB7XG5cbiAgICBsZXQgbGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgJiYgdGhpcy5zZWxlY3RlZFRhYi5saXN0TW9kZSkge1xuXG4gICAgICAgIGxpc3RNb2RlID0gdGhpcy5zZWxlY3RlZFRhYi5saXN0TW9kZTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBsaXN0TW9kZSA9IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdE1vZGU7XG5cbiAgfVxuXG4gIC8qXG4gICAqIG5nT25Jbml0XG4gICAqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNlcnZpY2U6IERlY0FwaVNlcnZpY2VcbiAgKSB7IH1cblxuICAvKlxuICAgKiBuZ09uSW5pdFxuICAgKlxuICAgKiBTdGFydHMgYSBmcmVzaCBjb21wb25lbnQgYW5kIHByZXBhcmUgaXQgdG8gcnVuXG4gICAqXG4gICAqIC0gU3RhcnQgdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN1YnNjcmliZSB0byB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3RhcnQgd2F0Y2hpbmcgd2luZG93IFNjcm9sbFxuICAgKiAtIEVuc3VyZSB1bmlxdWUgbmFtZVxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53YXRjaEZpbHRlckRhdGEoKTtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZU5hbWUoKTtcbiAgICB0aGlzLmRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKCk7XG4gIH1cblxuICAvKlxuICAqIG5nQWZ0ZXJWaWV3SW5pdFxuICAqXG4gICogV2FpdCBmb3IgdGhlIHN1YmNvbXBvbmVudHMgdG8gc3RhcnQgYmVmb3JlIHJ1biB0aGUgY29tcG9uZW50XG4gICpcbiAgKiAtIFN0YXJ0IHdhdGNoaW5nIEZpbHRlclxuICAqIC0gRG8gdGhlIGZpcnN0IGxvYWRcbiAgKi9cbiBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICB0aGlzLndhdGNoRmlsdGVyKCk7XG4gICB0aGlzLmRvRmlyc3RMb2FkKCk7XG4gICB0aGlzLmRldGVjdExpc3RNb2RlKCk7XG4gICB0aGlzLndhdGNoVGFic0NoYW5nZSgpO1xuICAgdGhpcy53YXRjaFRhYmxlU29ydCgpO1xuICAgdGhpcy5yZWdpc3RlckNoaWxkV2F0Y2hlcnMoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGwoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIG5nT25EZXN0cm95XG4gICAqXG4gICAqIERlc3Ryb3kgd2F0Y2hlciB0byBmcmVlIG1lZW1vcnkgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyeSB0cmlnZ2Vyc1xuICAgKlxuICAgKiAtIFVuc3Vic2NyaWJlIGZyb20gdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgd2luZG93IFNjcm9sbFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgRmlsdGVyXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdGaWx0ZXIoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYmxlU29ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICAvKlxuICAgKiByZWxvYWRDb3VudFJlcG9ydFxuICAgKlxuICAgKi9cbiAgcmVsb2FkQ291bnRSZXBvcnQoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIuZmlsdGVycyAmJiB0aGlzLmZpbHRlci5sb2FkQ291bnRSZXBvcnQpIHtcblxuICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50W3RoaXMuZW5kcG9pbnQubGVuZ3RoIC0gMV0gPT09ICcvJyA/IGAke3RoaXMuZW5kcG9pbnR9Y291bnRgIDogYCR7dGhpcy5lbmRwb2ludH0vY291bnRgO1xuXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5maWx0ZXIuZmlsdGVycztcblxuICAgICAgY29uc3QgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcyA9IHRoaXMuZ2V0Q291bnRhYmxlRmlsdGVycyhmaWx0ZXJzKTtcblxuICAgICAgdGhpcy5zZXJ2aWNlLnBvc3QoZW5kcG9pbnQsIHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgdGhpcy5jb3VudFJlcG9ydCA9IHRoaXMubW91bnRDb3VudFJlcG9ydChyZXMpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLmNvdW50UmVwb3J0ID0gdGhpcy5jb3VudFJlcG9ydDtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgbW91bnRDb3VudFJlcG9ydChmaWx0ZXJzQ291bnRlcnMpOiBDb3VudFJlcG9ydCB7XG5cbiAgICBjb25zdCBjb3VudFJlcG9ydDogQ291bnRSZXBvcnQgPSB7XG4gICAgICBjb3VudDogMFxuICAgIH07XG5cbiAgICBmaWx0ZXJzQ291bnRlcnMuZm9yRWFjaChpdGVtID0+IHtcblxuICAgICAgY291bnRSZXBvcnRbaXRlbS51aWRdID0ge1xuXG4gICAgICAgIGNvdW50OiBpdGVtLmNvdW50XG5cbiAgICAgIH07XG5cbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgY291bnRSZXBvcnRbaXRlbS51aWRdLmNoaWxkcmVuID0gdGhpcy5tb3VudENvdW50UmVwb3J0KGl0ZW0uY2hpbGRyZW4pO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudFJlcG9ydDtcblxuICB9XG5cbiAgLypcbiAgICogcmVtb3ZlSXRlbVxuICAgKlxuICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgbGlzdFxuICAgKi9cbiAgcmVtb3ZlSXRlbShpZCkge1xuXG4gICAgY29uc3QgaXRlbSA9IHRoaXMucm93cy5maW5kKF9pdGVtID0+IF9pdGVtLmlkID09PSBpZCk7XG5cbiAgICBpZiAoaXRlbSkge1xuXG4gICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLnJvd3MuaW5kZXhPZihpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1JbmRleCA+PSAwKSB7XG5cbiAgICAgICAgdGhpcy5yb3dzLnNwbGljZShpdGVtSW5kZXgsIDEpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbmRwb2ludCkge1xuXG4gICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlc3RhcnRcbiAgICpcbiAgICogQ2xlYXIgdGhlIGxpc3QgYW5kIHJlbG9hZCB0aGUgZmlyc3QgcGFnZVxuICAgKi9cbiAgcmVzdGFydCgpIHtcblxuICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKTtcblxuICB9XG5cbiAgLypcbiAgICogc2hvd01vcmVcbiAgICpcbiAgICovXG4gIHNob3dNb3JlKCkge1xuXG4gICAgcmV0dXJuIHRoaXMubG9hZFJlcG9ydCgpO1xuXG4gIH1cblxuICAvKlxuICAgKiBzZWFyY2hDb2xsYXBzYWJsZVxuICAgKlxuICAgKiBzZWFyY2ggYnkgY29sbGFwc2FibGUgZmlsdGVyXG4gICAqL1xuICBzZWFyY2hDb2xsYXBzYWJsZShmaWx0ZXI6IERlY0xpc3RGaWx0ZXIpIHtcblxuICAgIGlmICh0aGlzLm9wZW5uZWRDb2xsYXBzYWJsZSAhPT0gZmlsdGVyLnVpZCkge1xuXG4gICAgICB0aGlzLmxvYWRCeU9wZW5uZWRDb2xsYXBzZShmaWx0ZXIudWlkKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogdGFibGVBbmRHcmlkQXJlU2V0XG4gICAqXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZXJlIGFyZSBib3RoIEdSSUQgYW5kIFRBQkxFIGRlZmluaXRpb24gaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICB0YWJsZUFuZEdyaWRBcmVTZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpZCAmJiB0aGlzLnRhYmxlO1xuICB9XG5cbiAgLypcbiAgICogdG9nZ2xlTGlzdE1vZGVcbiAgICpcbiAgICogQ2hhbmdlcyBiZXR3ZWVuIEdSSUQgYW5kIFRBQkxFIHZpc3VhbGl6YXRvaW4gbW9kZXNcbiAgICovXG4gIHRvZ2dsZUxpc3RNb2RlKCkge1xuXG4gICAgdGhpcy5saXN0TW9kZSA9IHRoaXMubGlzdE1vZGUgPT09ICdncmlkJyA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgICBpZiAodGhpcy5saXN0TW9kZSA9PT0gJ3RhYmxlJykge1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICB0aGlzLnRhYmxlLnRhYmxlQ29tcG9uZW50LnJlY2FsY3VsYXRlKCk7XG5cbiAgICAgIH0sIDEpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBnZXRDb2xsYXBzYWJsZUNvdW50XG4gICAqXG4gICAqIGdldCBDb2xsYXBzYWJsZSBDb3VudCBmcm9tIGNvdW50UmVwb3J0XG4gICAqL1xuICBnZXRDb2xsYXBzYWJsZUNvdW50KHVpZCkge1xuXG4gICAgdHJ5IHtcblxuICAgICAgcmV0dXJuIHRoaXMuY291bnRSZXBvcnRbdGhpcy5zZWxlY3RlZFRhYl0uY2hpbGRyZW5bdWlkXS5jb3VudDtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICAgIHJldHVybiAnPyc7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgLypcbiAgICogZ2V0Q291bnRhYmxlRmlsdGVyc1xuICAgKlxuICAgKiBHZXQgdGhlIHNlYXJjaCBmaWx0ZXIsIHRybnNmb3JtZSB0aGUgc2VhcmNoIHBhcmFtcyBpbnRvIHRoZSBzZWFyY2hhYmxlIHByb3BlcnRpZXMgYW5kIGluamVjdCBpdCBpbiBldmVyeSBmaWx0ZXIgY29uZmlndXJlZCBpbiBkZWMtZmlsdGVyc1xuICAgKlxuICAgKiBUaGUgcmVzdWx0IGlzIHVzZWQgdG8gY2FsbCB0aGUgY291bnQgZW5kcG9pbnQgYW5kIHJldHVybiB0aGUgYW1vdW50IG9mIHJlY2NvcmRzIGZvdW5kIGluIGV2ZXJ5IHRhYi9jb2xsYXBzZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRDb3VudGFibGVGaWx0ZXJzKGZpbHRlcnMpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgfHwgW3tmaWx0ZXJzOiBbXX1dO1xuXG4gICAgY29uc3QgZmlsdGVyc1BsdXNTZWFyY2ggPSBmaWx0ZXJzLm1hcChkZWNGaWx0ZXIgPT4ge1xuXG4gICAgICBjb25zdCBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGVjRmlsdGVyKSk7XG5cbiAgICAgIGlmIChkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzKSB7XG5cbiAgICAgICAgY29uc3QgdGFiRmlsdGVyc0NvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMpKTtcblxuICAgICAgICBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWx0ZXJHcm91cHNXaXRob3V0VGFicykpO1xuXG4gICAgICAgIGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmZpbHRlcnMuZm9yRWFjaChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzLnB1c2goLi4udGFiRmlsdGVyc0NvcHkpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2UgaWYgKGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuKSB7XG5cbiAgICAgICAgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4gPSB0aGlzLmdldENvdW50YWJsZUZpbHRlcnMoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4pO1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVpZDogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2gudWlkLFxuICAgICAgICBmaWx0ZXJzOiBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzLFxuICAgICAgICBjaGlsZHJlbjogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guY2hpbGRyZW4sXG4gICAgICB9O1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5lbnN1cmVGaWx0ZXJWYWx1ZXNBc0FycmF5KGZpbHRlcnNQbHVzU2VhcmNoKTtcblxuICB9XG5cbiAgLypcbiAgICogZW5zdXJlRmlsdGVyVmFsdWVzQXNBcnJheVxuICAgKlxuICAgKiBHZXQgYW4gYXJyYXkgb2YgZmlsdGVyZ3JvdXBzIGFuZCBzZXQgdGhlIGZpbHRlciB2YWx1ZXMgdG8gYXJyYXkgaWYgbm90XG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVuc3VyZUZpbHRlclZhbHVlc0FzQXJyYXkoZmlsdGVyR3JvdXBzOiBhbnkgPSBbXSkge1xuXG4gICAgcmV0dXJuIGZpbHRlckdyb3Vwcy5tYXAoZGVjTGlzdEZpbHRlciA9PiB7XG5cbiAgICAgIGlmIChkZWNMaXN0RmlsdGVyLmZpbHRlcnMpIHtcblxuICAgICAgICB0aGlzLmFwcGVuZEZpbHRlckdyb3Vwc0Jhc2VkT25TZWFyY2hhYmxlUHJvcGVydGllcyhkZWNMaXN0RmlsdGVyLmZpbHRlcnMpO1xuXG4gICAgICAgIGRlY0xpc3RGaWx0ZXIuZmlsdGVycyA9IGRlY0xpc3RGaWx0ZXIuZmlsdGVycy5tYXAoZmlsdGVyR3JvdXAgPT4ge1xuXG5cbiAgICAgICAgICBmaWx0ZXJHcm91cC5maWx0ZXJzID0gZmlsdGVyR3JvdXAuZmlsdGVycy5tYXAoZmlsdGVyID0+IHtcblxuICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gQXJyYXkuaXNBcnJheShmaWx0ZXIudmFsdWUpID8gZmlsdGVyLnZhbHVlIDogW2ZpbHRlci52YWx1ZV07XG5cbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBmaWx0ZXJHcm91cDtcblxuICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVjTGlzdEZpbHRlcjtcblxuICAgIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBhY3RCeVNjcm9sbFBvc2l0aW9uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGRldGVjdCBpZiB0aGVyZSBpcyBzY3Jvb2xpbmcgYWN0aW9uIG9uIHdpbmRvdyB0byBmZXRjaCBhbmQgc2hvdyBtb3JlIHJvd3Mgd2hlbiB0aGUgc2Nyb2xsaW5nIGRvd24uXG4gICAqL1xuICBwcml2YXRlIGFjdEJ5U2Nyb2xsUG9zaXRpb24gPSAoJGV2ZW50KSA9PiB7XG5cbiAgICBpZiAoJGV2ZW50WydwYXRoJ10pIHtcblxuICAgICAgY29uc3QgZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MgPSAkZXZlbnRbJ3BhdGgnXS5maW5kKHBhdGggPT4ge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHBhdGhbJ2NsYXNzTmFtZSddIHx8ICcnO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZU92ZXJsYXkgPSBjbGFzc05hbWUuaW5kZXhPZignY2RrLW92ZXJsYXknKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZUZ1bGxzY3JlYW5EaWFsb2dDb250YWluZXIgPSBjbGFzc05hbWUuaW5kZXhPZignZnVsbHNjcmVhbi1kaWFsb2ctY29udGFpbmVyJykgPj0gMDtcblxuICAgICAgICByZXR1cm4gaW5zaWRlT3ZlcmxheSB8fCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyO1xuXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFlbGVtZW50V2l0aENka092ZXJsYXlDbGFzcykgeyAvLyBhdm9pZCBjbG9zaW5nIGZpbHRlciBmcm9tIGFueSBvcGVuIGRpYWxvZ1xuXG4gICAgICAgIGlmICghdGhpcy5pc0xhc3RQYWdlKSB7XG5cbiAgICAgICAgICBjb25zdCB0YXJnZXQ6IGFueSA9ICRldmVudFsndGFyZ2V0J107XG5cbiAgICAgICAgICBjb25zdCBsaW1pdCA9IHRhcmdldC5zY3JvbGxIZWlnaHQgLSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKHRhcmdldC5zY3JvbGxUb3AgPj0gKGxpbWl0IC0gMTYpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd01vcmUoKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlXG4gICAqXG4gICAqIFNldCB0aGUgbGlzdCBtb2RlIGJhc2VkIG9uIGZpbHRlclRhYnMgY29uZmlndXJhdGlvbiBvciBjdXN0b20gZnVuY3Rpb24gb3ZlcnJpZGRlbiBieSBnZXRMaXN0TW9kZSBpbnB1dFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmdldExpc3RNb2RlKCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKClcbiAgICpcbiAgICogU2V0IHRoZSBsaXN0IG1vZGUgYmFzZWQgb24gZGVjbGFyYXRpb24gb2YgdGFibGUgYW5kIGdyaWQuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGJvb3Rhc3RyYXAgdGhlIGNvbXBvbmVudCB3aXRoIG9ubHkgZ3JpZCBvciBvbmx5IHRhYmxlXG4gICAqIFRoaXMgb25seSB3b3JrIGlmIG5vIG1vZGUgaXMgcHJvdmlkZWQgYnkgQElucHV0IG90aGVyd2lzZSB0aGUgQElucHV0IHZhbHVlIHdpbGwgYmUgdXNlZFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID8gdGhpcy5saXN0TW9kZSA6IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gIH1cblxuICAvKlxuICAgKiBlbWl0U2Nyb2xsRXZlbnRcbiAgICpcbiAgICogRW1pdHMgc2Nyb2xsIGV2ZW50IHdoZW4gbm90IGxvYWRpbmdcbiAgICovXG4gIHByaXZhdGUgZW1pdFNjcm9sbEV2ZW50ID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCF0aGlzLmxvYWRpbmcpIHtcblxuICAgICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlci5lbWl0KCRldmVudCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGlzVGFic0ZpbHRlckRlZmluZWRcbiAgICpcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIFRhYnMgRmlsdGVyIGlzIGRlZmluZWQgaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICBwcml2YXRlIGlzVGFic0ZpbHRlckRlZmluZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZFxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHZpZXcgYW5kIGlucHV0cyBhcmUgaW5pdGlhbGl6ZWRcbiAgICpcbiAgICogVGhpcyBpcyB0aGUgZmlyc3QgY2FsbCB0byBnZXQgZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZCgpIHtcbiAgICBpZiAodGhpcy5pc1RhYnNGaWx0ZXJEZWZpbmVkKCkpIHtcbiAgICAgIHRoaXMuZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpcnN0TG9hZExvY2FsbHkodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXJcbiAgICpcbiAgICogdXNlIHRoZSB0YWJzIGZpbHRlciB0byB0cmlnZ2VyIHRoZSBmaXJzdCBsb2FkXG4gICAqXG4gICAqIFRoaXMgd2F5IHRoZSBkZWZhdWx0IHRhYiBhbmQgZmlsdGVyIGFyZSBzZWxlY3RlZCBieSB0aGUgZGVjdGFic0ZpbHRlciBjb21wb25lbnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKSB7XG4gICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5kb0ZpcnN0TG9hZCgpO1xuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRMb2NhbGx5XG4gICAqXG4gICAqIElmIG5vIGZpbHRlciBhcmUgZGVmaW5lZCwganVzdCBjYWxsIHRoIGVlbmRwb2ludCB3aXRob3V0IGZpbHRlcnNcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRMb2NhbGx5KHJlZnJlc2gpIHtcbiAgICB0aGlzLmxvYWRSZXBvcnQocmVmcmVzaCk7XG4gIH1cblxuICAvKlxuICAgKiBlbnN1cmVVbmlxdWVOYW1lXG4gICAqXG4gICAqIFdlIG11c3QgcHJvdmlkZSBhbiB1bmlxdWUgbmFtZSB0byB0aGUgbGlzdCBzbyB3ZSBjYW4gcGVyc2lzdCBpdHMgc3RhdGUgaW4gdGhlIFVSTCB3aXRob3V0IGNvbmZsaWN0c1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVOYW1lKCkge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICBjb25zdCBlcnJvciA9ICdMaXN0Q29tcG9uZW50RXJyb3I6IFRoZSBsaXN0IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUgdG8gYmUgdXNlZCBpbiB1cmwgZmlsdGVyLidcbiAgICAgICsgJyBQbGVhc2UsIGVuc3VyZSB0aGF0IHlvdSBoYXZlIHBhc3NlZCBhbiB1bmlxdWUgbmFtbWUgdG8gdGhlIGNvbXBvbmVudC4nO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBsb2FkQnlPcGVubmVkQ29sbGFwc2VcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgdHJpZ2dlcmVkIHdoZW4gYSBjb2xsYXBzYWJsZSB0YWJsZSBpcyBvcGVuLlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkQnlPcGVubmVkQ29sbGFwc2UoZmlsdGVyVWlkKSB7XG5cbiAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmNvbGxhcHNhYmxlRmlsdGVycy5maW5kKGl0ZW0gPT4gaXRlbS51aWQgPT09IGZpbHRlclVpZCk7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cDogRmlsdGVyR3JvdXAgPSB7IGZpbHRlcnM6IGZpbHRlci5maWx0ZXJzIH07XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSwgZmlsdGVyR3JvdXApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMub3Blbm5lZENvbGxhcHNhYmxlID0gZmlsdGVyLnVpZDtcblxuICAgIH0sIDApO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRSZXBvcnRcbiAgICpcbiAgICogVGhpcyBtZWh0b2QgZ2F0aGVyIHRoZSBmaWx0ZXIgaW5mbyBhbmQgZW5kcG9pbnQgYW5kIGNhbGwgdGhlIGJhY2stZW5kIHRvIGZldGNoIHRoZSBkYXRhXG4gICAqXG4gICAqIElmIHRoZSBzdWN0b21GZXRjaE1ldGhvZCBpcyB1c2VkLCBpdHMgY2FsbCBpdFxuICAgKlxuICAgKiBJZiBvbmx5IHRoZSByb3dzIGFyZSBwYXNzZWQsIHRoZSBtZXRob2QganVzdCB1c2UgaXQgYXMgcmVzdWx0XG4gICAqL1xuICBwcml2YXRlIGxvYWRSZXBvcnQoY2xlYXJBbmRSZWxvYWRSZXBvcnQ/OiBib29sZWFuLCBjb2xsYXBzZUZpbHRlckdyb3Vwcz86IEZpbHRlckdyb3VwKTogUHJvbWlzZTxhbnk+IHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgaWYgKGNsZWFyQW5kUmVsb2FkUmVwb3J0ICYmIHRoaXMucm93cykge1xuXG4gICAgICAgIHRoaXMuc2V0Um93cyh0aGlzLnJvd3MpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xlYXJBbmRSZWxvYWRSZXBvcnQgPSBjbGVhckFuZFJlbG9hZFJlcG9ydDtcblxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMuZW5kcG9pbnQpIHtcblxuICAgICAgICB0aGlzLnBheWxvYWQgPSB0aGlzLm1vdW50UGF5bG9hZChjbGVhckFuZFJlbG9hZFJlcG9ydCwgY29sbGFwc2VGaWx0ZXJHcm91cHMpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRGF0YS5uZXh0KHsgZW5kcG9pbnQ6IHRoaXMuZW5kcG9pbnQsIHBheWxvYWQ6IHRoaXMucGF5bG9hZCwgY2JrOiByZXMsIGNsZWFyOiBjbGVhckFuZFJlbG9hZFJlcG9ydCB9KTtcblxuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUZldGNoTWV0aG9kKSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm5leHQoKTtcblxuICAgICAgfSBlbHNlIGlmICghdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMucm93cykge1xuXG4gICAgICAgICAgICByZWooJ05vIGVuZHBvaW50LCBjdXN0b21GZXRjaE1ldGhvZCBvciByb3dzIHNldCcpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgfSwgMSk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIG1vdW50UGF5bG9hZChjbGVhckFuZFJlbG9hZFJlcG9ydDogYm9vbGVhbiA9IGZhbHNlLCBjb2xsYXBzZUZpbHRlckdyb3Vwcz8pIHtcblxuICAgIGNvbnN0IHNlYXJjaEZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyID8gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBzID0gdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cChzZWFyY2hGaWx0ZXJHcm91cHMsIGNvbGxhcHNlRmlsdGVyR3JvdXBzKTtcblxuICAgIGNvbnN0IHBheWxvYWQ6IERlY0ZpbHRlciA9IHt9O1xuXG4gICAgcGF5bG9hZC5saW1pdCA9IHRoaXMubGltaXQ7XG5cbiAgICBpZiAoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICAgIHBheWxvYWQuZmlsdGVyR3JvdXBzID0gZmlsdGVyR3JvdXBzO1xuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgcGF5bG9hZC5jb2x1bW5zID0gdGhpcy5jb2x1bW5zU29ydENvbmZpZztcblxuICAgIH1cblxuICAgIGlmICghY2xlYXJBbmRSZWxvYWRSZXBvcnQgJiYgdGhpcy5yZXBvcnQpIHtcblxuICAgICAgcGF5bG9hZC5wYWdlID0gdGhpcy5yZXBvcnQucGFnZSArIDE7XG5cbiAgICAgIHBheWxvYWQubGltaXQgPSB0aGlzLnJlcG9ydC5saW1pdDtcblxuICAgIH1cblxuICAgIHJldHVybiBwYXlsb2FkO1xuXG4gIH1cblxuICAvKlxuICAgKiBhcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cFxuICAgKlxuICAgKiBHZXRzIGFuIGFycmF5IG9mIGZpbHRlckdyb3VwIGFuZCBpbiBlYWNoIGZpbHRlckdyb3VwIGluIHRoaXMgYXJyYXkgYXBwZW5kcyB0aGUgc2Vjb25kIGZpbHRlckdyb3VwIGZpbHRlcnMuXG4gICAqL1xuICBwcml2YXRlIGFwcGVuZEZpbHRlckdyb3Vwc1RvRWFjaEZpbHRlckdyb3VwKGZpbHRlckdyb3VwczogRmlsdGVyR3JvdXBzLCBmaWx0ZXJHcm91cFRvQXBwZW5kOiBGaWx0ZXJHcm91cCkge1xuXG4gICAgaWYgKGZpbHRlckdyb3VwVG9BcHBlbmQpIHtcblxuICAgICAgaWYgKGZpbHRlckdyb3VwcyAmJiBmaWx0ZXJHcm91cHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIGZpbHRlckdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IHtcblxuICAgICAgICAgIGdyb3VwLmZpbHRlcnMucHVzaCguLi5maWx0ZXJHcm91cFRvQXBwZW5kLmZpbHRlcnMpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZpbHRlckdyb3VwcyA9IFtmaWx0ZXJHcm91cFRvQXBwZW5kXTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlckdyb3VwcyB8fCBbXTtcblxuICB9XG5cbiAgLypcbiAgICogc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpIHtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5uYW1lID0gdGhpcy5uYW1lO1xuXG5cbiAgICAgIGlmICh0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5uYW1lID0gdGhpcy5uYW1lO1xuXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZldGNoTWV0aG9kKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LmN1c3RvbUZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5zZXJ2aWNlID0gdGhpcy5zZXJ2aWNlO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogc2V0Um93c1xuICAgKlxuICAgKiBTZXRzIHRoZSBjdXJyZW50IHRhYmxlIHJvd3NcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2V0Um93cyhyb3dzID0gW10pIHtcblxuICAgIHRoaXMucmVwb3J0ID0ge1xuXG4gICAgICBwYWdlOiAxLFxuXG4gICAgICByZXN1bHQ6IHtcblxuICAgICAgICByb3dzOiByb3dzLFxuXG4gICAgICAgIGNvdW50OiByb3dzLmxlbmd0aFxuXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZGV0ZWN0TGFzdFBhZ2Uocm93cywgcm93cy5sZW5ndGgpO1xuXG4gICAgdGhpcy51cGRhdGVDb250ZW50Q2hpbGRyZW4oKTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyKCkge1xuXG4gICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbiA9IHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJcbiAgICAucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgxNTApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICkuc3Vic2NyaWJlKHRoaXMuYWN0QnlTY3JvbGxQb3NpdGlvbik7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbikge1xuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyRGF0YVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEZpbHRlckRhdGEoKSB7XG4gICAgdGhpcy5yZWFjdGl2ZVJlcG9ydCA9IHRoaXMuZmlsdGVyRGF0YVxuICAgIC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDE1MCksIC8vIGF2b2lkIG11aWx0aXBsZSByZXF1ZXN0IHdoZW4gdGhlIGZpbHRlciBvciB0YWIgY2hhbmdlIHRvbyBmYXN0XG4gICAgICBzd2l0Y2hNYXAoKGZpbHRlckRhdGE6IEZpbHRlckRhdGEpID0+IHtcblxuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHVuZGVmaW5lZCk7XG5cbiAgICAgICAgY29uc3QgZmV0Y2hNZXRob2Q6IERlY0xpc3RGZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QgfHwgdGhpcy5zZXJ2aWNlLmdldDtcblxuICAgICAgICBjb25zdCBlbmRwb2ludCA9IGZpbHRlckRhdGEgPyBmaWx0ZXJEYXRhLmVuZHBvaW50IDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGNvbnN0IHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMgPSB0aGlzLmdldFBheWxvYWRXaXRoU2VhcmNoVHJhbnNmb3JtZWRJbnRvU2VhcmNoYWJsZVByb3BlcnRpZXModGhpcy5wYXlsb2FkKTtcblxuICAgICAgICBpZiAoZmlsdGVyRGF0YSAmJiBmaWx0ZXJEYXRhLmNsZWFyKSB7XG4gICAgICAgICAgdGhpcy5zZXRSb3dzKFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZldGNoTWV0aG9kKGVuZHBvaW50LCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzKVxuICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICBvYnNlcnZhYmxlLm5leHQocmVzKTtcblxuICAgICAgICAgIGlmIChmaWx0ZXJEYXRhICYmIGZpbHRlckRhdGEuY2JrKSB7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyB3YWl0IGZvciBzdWJzY3JpYmVycyB0byByZWZyZXNoIHRoZWlyIHJvd3NcblxuICAgICAgICAgICAgICBmaWx0ZXJEYXRhLmNiayhuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG5cbiAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgICB9KVxuXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcyhwYXlsb2FkKSB7XG5cbiAgICBjb25zdCBwYXlsb2FkQ29weSA9IHsuLi5wYXlsb2FkfTtcblxuICAgIGlmIChwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMgJiYgdGhpcy5zZWFyY2hhYmxlUHJvcGVydGllcykge1xuXG4gICAgICBwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMgPSBbLi4ucGF5bG9hZC5maWx0ZXJHcm91cHNdO1xuXG4gICAgICB0aGlzLmFwcGVuZEZpbHRlckdyb3Vwc0Jhc2VkT25TZWFyY2hhYmxlUHJvcGVydGllcyhwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMpO1xuXG5cbiAgICAgIHJldHVybiBwYXlsb2FkQ29weTtcblxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIHRoaXMucGF5bG9hZDtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMoZmlsdGVyR3JvdXBzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoID0gdGhpcy5nZXRGaWx0ZXJHcm91cFRoYXRDb250YWluc1RoZUJhc2ljU2VhcmNoKGZpbHRlckdyb3Vwcyk7XG5cbiAgICBpZiAoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCkge1xuXG4gICAgICB0aGlzLnJlbW92ZUZpbHRlckdyb3VwKGZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCk7XG5cbiAgICAgIGNvbnN0IGJhc2ljU2VhcmNoID0gZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci5wcm9wZXJ0eSA9PT0gJ3NlYXJjaCcpO1xuXG4gICAgICBjb25zdCBiYXNpY1NlYXJjaEluZGV4ID0gZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzLmluZGV4T2YoYmFzaWNTZWFyY2gpO1xuXG4gICAgICB0aGlzLnNlYXJjaGFibGVQcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG5ld0ZpbHRlckdyb3VwOiBGaWx0ZXJHcm91cCA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBbLi4uZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzXVxuICAgICAgICB9O1xuXG4gICAgICAgIG5ld0ZpbHRlckdyb3VwLmZpbHRlcnNbYmFzaWNTZWFyY2hJbmRleF0gPSB7XG4gICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgIHZhbHVlOiBbYmFzaWNTZWFyY2gudmFsdWVdXG4gICAgICAgIH07XG5cbiAgICAgICAgZmlsdGVyR3JvdXBzLnB1c2gobmV3RmlsdGVyR3JvdXApO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2hJbmRleCA9IGZpbHRlckdyb3Vwcy5pbmRleE9mKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgZmlsdGVyR3JvdXBzLnNwbGljZShmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoSW5kZXgsIDEpO1xuXG4gIH1cblxuICBwcml2YXRlIGdldEZpbHRlckdyb3VwVGhhdENvbnRhaW5zVGhlQmFzaWNTZWFyY2goZmlsdGVyR3JvdXBzKSB7XG5cbiAgICByZXR1cm4gZmlsdGVyR3JvdXBzLmZpbmQoZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICBjb25zdCBiYXNpY1NlcmNoRmlsdGVyID0gZmlsdGVyR3JvdXAuZmlsdGVycyA/IGZpbHRlckdyb3VwLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnByb3BlcnR5ID09PSAnc2VhcmNoJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybiBiYXNpY1NlcmNoRmlsdGVyID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpIHtcbiAgICB0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uID0gdGhpcy5yZWFjdGl2ZVJlcG9ydFxuICAgIC5waXBlKFxuICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhICYmIGRhdGEucmVzdWx0ICYmIGRhdGEucmVzdWx0LnJvd3MpIHtcblxuICAgICAgICBpZiAoIXRoaXMuY2xlYXJBbmRSZWxvYWRSZXBvcnQpIHtcbiAgICAgICAgICBkYXRhLnJlc3VsdC5yb3dzID0gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MuY29uY2F0KGRhdGEucmVzdWx0LnJvd3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXBvcnQgPSBkYXRhO1xuXG4gICAgICAgIHRoaXMucG9zdFNlYXJjaC5lbWl0KGRhdGEpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29udGVudENoaWxkcmVuKCk7XG5cbiAgICAgICAgdGhpcy5kZXRlY3RMYXN0UGFnZShkYXRhLnJlc3VsdC5yb3dzLCBkYXRhLnJlc3VsdC5jb3VudCk7XG5cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdExhc3RQYWdlKHJvd3MsIGNvdW50KSB7XG5cbiAgICBjb25zdCBudW1iZXJPZnJvd3MgPSByb3dzLmxlbmd0aDtcblxuICAgIGNvbnN0IGVtcHRMaXN0ID0gbnVtYmVyT2Zyb3dzID09PSAwO1xuXG4gICAgY29uc3Qgc2luZ2xlUGFnZUxpc3QgPSBudW1iZXJPZnJvd3MgPT09IGNvdW50O1xuXG4gICAgdGhpcy5pc0xhc3RQYWdlID0gZW1wdExpc3QgfHwgc2luZ2xlUGFnZUxpc3Q7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKSB7XG4gICAgaWYgKHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVhY3RpdmVSZXBvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB1cGRhdGVDb250ZW50Q2hpbGRyZW5cbiAgICpcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlQ29udGVudENoaWxkcmVuKCkge1xuXG4gICAgY29uc3Qgcm93cyA9IHRoaXMuZW5kcG9pbnQgPyB0aGlzLnJlcG9ydC5yZXN1bHQucm93cyA6IHRoaXMucm93cztcbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLmdyaWQucm93cyA9IHJvd3M7XG4gICAgfVxuICAgIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICB0aGlzLnRhYmxlLnJvd3MgPSByb3dzO1xuICAgIH1cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyLmNvdW50ID0gdGhpcy5yZXBvcnQucmVzdWx0LmNvdW50O1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHJlZ2lzdGVyQ2hpbGRXYXRjaGVyc1xuICAgKlxuICAgKiBXYXRjaCBmb3IgY2hpbGRyZW4gb3V0cHV0c1xuICAgKi9cbiAgcHJpdmF0ZSByZWdpc3RlckNoaWxkV2F0Y2hlcnMoKSB7XG5cbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLndhdGNoR3JpZFJvd0NsaWNrKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMud2F0Y2hUYWJsZVJvd0NsaWNrKCk7XG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEdyaWRSb3dDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEdyaWRSb3dDbGljaygpIHtcbiAgICB0aGlzLmdyaWQucm93Q2xpY2suc3Vic2NyaWJlKCgkZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucm93Q2xpY2suZW1pdCgkZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hUYWJsZVJvd0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFibGVSb3dDbGljaygpIHtcbiAgICB0aGlzLnRhYmxlLnJvd0NsaWNrLnN1YnNjcmliZSgoJGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJvd0NsaWNrLmVtaXQoJGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlci5zZWFyY2guc3Vic2NyaWJlKGV2ZW50ID0+IHtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJNb2RlICE9PSBldmVudC5maWx0ZXJNb2RlKSB7XG5cbiAgICAgICAgICBpZiAoZXZlbnQuZmlsdGVyTW9kZSA9PT0gJ3RhYnMnKSB7IC8vIGlmIGNoYW5naW5nIGZyb20gY29sbGFwc2UgdG8gdGFicywgY2xlYXIgdGhlIHJlc3VsdHMgYmVmb3JlIHNob3dpbmcgdGhlIHJvd3NcbiAgICAgICAgICAgIHRoaXMuc2V0Um93cyhbXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gZXZlbnQuZmlsdGVyTW9kZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyTW9kZSA9PT0gJ3RhYnMnKSB7XG5cbiAgICAgICAgICB0aGlzLm9wZW5uZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKS50aGVuKChyZXMpID0+IHtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnJlY291bnQpIHtcblxuICAgICAgICAgICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuY291bnRSZXBvcnQgfHwgZXZlbnQucmVjb3VudCkge1xuXG4gICAgICAgICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5vcGVubmVkQ29sbGFwc2FibGUpIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UodGhpcy5vcGVubmVkQ29sbGFwc2FibGUpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzYWJsZUZpbHRlcnMgPSBldmVudC5jaGlsZHJlbiA/IGV2ZW50LmNoaWxkcmVuIDogW107XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoU2Nyb2xsXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoU2Nyb2xsKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnNjcm9sbGFibGVDb250YWluZXJDbGFzcylbMF07XG4gICAgICBpZiAodGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSwgMSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmVtaXRTY3JvbGxFdmVudCwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQudGFiQ2hhbmdlLnN1YnNjcmliZSh0YWIgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xuICAgICAgICB0aGlzLmRldGVjdExpc3RNb2RlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1RhYnNDaGFuZ2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFic0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFRhYmxlU29ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgdGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnRhYmxlLnNvcnQuc3Vic2NyaWJlKGNvbHVtbnNTb3J0Q29uZmlnID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uc1NvcnRDb25maWcgIT09IGNvbHVtbnNTb3J0Q29uZmlnKSB7XG4gICAgICAgICAgdGhpcy5jb2x1bW5zU29ydENvbmZpZyA9IGNvbHVtbnNTb3J0Q29uZmlnO1xuICAgICAgICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtdGFibGUtY29sdW1uL2xpc3QtdGFibGUtY29sdW1uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNMaXN0VGFibGVDb21wb25lbnQsXG4gICAgRGVjTGlzdFRhYmxlQ29sdW1uQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjTGlzdFRhYmxlQ29tcG9uZW50LFxuICAgIERlY0xpc3RUYWJsZUNvbHVtbkNvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdFRhYmxlTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWZvb3RlcicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RGb290ZXJDb21wb25lbnQge31cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtYWR2YW5jZWQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0RlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBZHZhbmNlZEZpbHRlck1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWFjdGlvbnMnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD4+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNMaXN0QWN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1hY3Rpb25zLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjTGlzdEFjdGlvbnNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjTGlzdEFjdGlvbnNDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RBY3Rpb25zTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRTbmFja0Jhck1vZHVsZSwgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyTW9kdWxlIH0gZnJvbSAnLi9saXN0LWZpbHRlci9saXN0LWZpbHRlci5tb2R1bGUnO1xuXG5pbXBvcnQgeyBEZWNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0R3JpZENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1ncmlkL2xpc3QtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdFRhYmxlTW9kdWxlIH0gZnJvbSAnLi9saXN0LXRhYmxlL2xpc3QtdGFibGUubW9kdWxlJztcbmltcG9ydCB7IERlY0xpc3RGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZm9vdGVyL2xpc3QtZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUgfSBmcm9tICcuL2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBEZWNTcGlubmVyTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtc3Bpbm5lci9kZWMtc3Bpbm5lci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjTGlzdEFjdGlvbnNNb2R1bGUgfSBmcm9tICcuL2xpc3QtYWN0aW9ucy9saXN0LWFjdGlvbnMubW9kdWxlJztcbmltcG9ydCB7IERlY0xhYmVsTW9kdWxlIH0gZnJvbSAnLi8uLi9kZWMtbGFiZWwvZGVjLWxhYmVsLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGVjTGFiZWxNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gICAgRGVjTGlzdEFkdmFuY2VkRmlsdGVyTW9kdWxlLFxuICAgIERlY0xpc3RGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdFRhYmxlTW9kdWxlLFxuICAgIERlY1NwaW5uZXJNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY0xpc3RDb21wb25lbnQsXG4gICAgRGVjTGlzdEdyaWRDb21wb25lbnQsXG4gICAgRGVjTGlzdEZvb3RlckNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY0xpc3RDb21wb25lbnQsXG4gICAgRGVjTGlzdEdyaWRDb21wb25lbnQsXG4gICAgRGVjTGlzdFRhYmxlTW9kdWxlLFxuICAgIERlY0xpc3RGb290ZXJDb21wb25lbnQsXG4gICAgRGVjTGlzdEZpbHRlck1vZHVsZSxcbiAgICBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJNb2R1bGUsXG4gICAgRGVjTGlzdEFjdGlvbnNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1wYWdlLWZvcmJpZGVuJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGFnZS1mb3JiaWRlbi13cmFwcGVyXCI+XG4gIDxoMT57eydsYWJlbC5wYWdlLWZvcmJpZGVuJyB8IHRyYW5zbGF0ZX19PC9oMT5cbiAgPHA+e3snbGFiZWwucGFnZS1mb3JiaWRlbi1oZWxwJyB8IHRyYW5zbGF0ZX19PC9wPlxuICA8cD48c21hbGw+UmVmOiB7e3ByZXZpb3VzVXJsfX08L3NtYWxsPjwvcD5cbiAgPGltZyBzcmM9XCJodHRwOi8vczMtc2EtZWFzdC0xLmFtYXpvbmF3cy5jb20vc3RhdGljLWZpbGVzLXByb2QvcGxhdGZvcm0vZGVjb3JhMy5wbmdcIj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5wYWdlLWZvcmJpZGVuLXdyYXBwZXJ7cGFkZGluZy10b3A6MTAwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9aW1ne3dpZHRoOjEwMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1BhZ2VGb3JiaWRlbkNvbXBvbmVudCB7XG5cbiAgcHJldmlvdXNVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgLnBpcGUoXG4gICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKVxuICAgIClcbiAgICAuc3Vic2NyaWJlKChlOiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICB0aGlzLnByZXZpb3VzVXJsID0gZG9jdW1lbnQucmVmZXJyZXIgfHwgZS51cmw7XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNQYWdlRm9yYmlkZW5Db21wb25lbnQgfSBmcm9tICcuL3BhZ2UtZm9yYmlkZW4uY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjUGFnZUZvcmJpZGVuQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNQYWdlRm9yYmlkZW5Db21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQYWdlRm9yYmlkZW5Nb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1wYWdlLW5vdC1mb3VuZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBhZ2Utbm90LWZvdW5kLXdyYXBwZXJcIj5cbiAgPGgxPnt7J2xhYmVsLnBhZ2Utbm90LWZvdW5kJyB8IHRyYW5zbGF0ZX19PC9oMT5cbiAgPHA+e3snbGFiZWwucGFnZS1ub3QtZm91bmQtaGVscCcgfCB0cmFuc2xhdGV9fTwvcD5cbiAgPHA+e3twcmV2aW91c1VybH19PC9wPlxuICA8aW1nIHNyYz1cImh0dHA6Ly9zMy1zYS1lYXN0LTEuYW1hem9uYXdzLmNvbS9zdGF0aWMtZmlsZXMtcHJvZC9wbGF0Zm9ybS9kZWNvcmEzLnBuZ1wiPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnBhZ2Utbm90LWZvdW5kLXdyYXBwZXJ7cGFkZGluZy10b3A6MTAwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9aW1ne3dpZHRoOjEwMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1BhZ2VOb3RGb3VuZENvbXBvbmVudCB7XG5cbiAgcHJldmlvdXNVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgcm91dGVyLmV2ZW50c1xuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZClcbiAgICApXG4gICAgLnN1YnNjcmliZSgoZTogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICB0aGlzLnByZXZpb3VzVXJsID0gZS51cmw7XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNQYWdlTm90Rm91bmRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2Utbm90LWZvdW5kLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERlY1BhZ2VOb3RGb3VuZENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUGFnZU5vdEZvdW5kQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUGFnZU5vdEZvdW5kTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlciAgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgRkFMTEJBQ0tfSU1BR0UgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUFtSkxSMFFBLzRlUHpMOEFBQUFKY0VoWmN3QUFDeE1BQUFzVEFRQ2FuQmdBQUFBTFNVUkJWQWpYWTJCZ0FBQUFBd0FCSU5XVXh3QUFBQUJKUlU1JyArXG4nRXJrSmdnZz09JztcblxuY29uc3QgTE9BRElOR19JTUFHRSA9ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlNVFV3SWlCb1pXbG5hSFE5SWpFMU1DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQndjbVZ6WlhKMlpVRnpjR1ZqZEZKaGRHbHZQU0o0VFdsa1dVMXBaQ0lnJyArXG4nWTJ4aGMzTTlJblZwYkMxeWFXNW5JajQ4Y0dGMGFDQm1hV3hzUFNKdWIyNWxJaUJqYkdGemN6MGlZbXNpSUdROUlrMHdJREJvTVRBd2RqRXdNRWd3ZWlJdlBqeGphWEpqYkdVZ1kzZzlJamMxSWlCamVUMGlOelVpSUhJOUlqUTFJaUJ6ZEhKdmEyVXRaR0Z6YUdGeWNtRjVQU0l5TWpZdU1UazFJRFUyTGpVME9TSScgK1xuJ2djM1J5YjJ0bFBTSWpNak15WlRNNElpQm1hV3hzUFNKdWIyNWxJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqRXdJajQ4WVc1cGJXRjBaVlJ5WVc1elptOXliU0JoZEhSeWFXSjFkR1ZPWVcxbFBTSjBjbUZ1YzJadmNtMGlJSFI1Y0dVOUluSnZkR0YwWlNJZ2RtRnNkV1Z6UFNJd0lEYzFJRGMxT3pFNE1DQTNOU0EzTlQnICtcbidzek5qQWdOelVnTnpVN0lpQnJaWGxVYVcxbGN6MGlNRHN3TGpVN01TSWdaSFZ5UFNJeGN5SWdjbVZ3WldGMFEyOTFiblE5SW1sdVpHVm1hVzVwZEdVaUlHSmxaMmx1UFNJd2N5SXZQand2WTJseVkyeGxQand2YzNablBnPT0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtcHJvZHVjdC1zcGluJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicHJvZHVjdC1zcGlubmVyLXdyYXBwZXJcIiAqbmdJZj1cInNjZW5lc1wiPlxuICA8ZGl2IFtuZ1N3aXRjaF09XCJsb2FkaW5nSW1hZ2VzID8gdHJ1ZSA6IGZhbHNlXCI+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCIgY2xhc3M9XCJvdmVybGF5XCI+XG4gICAgICA8IS0tIExvYWRpbmcgc3Bpbm5lciAtLT5cbiAgICAgIDxkaXYgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWltYWdlJzondXJsKCcgKyBsb2FkaW5nSW1hZ2UgKyAnKSd9XCI+e3tsb2FkZXJQZXJjZW50YWdlKCl9fSU8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCIgY2xhc3M9XCJvdmVybGF5XCI+XG5cbiAgICAgIDwhLS0gT3ZlcmxheSBvdmVyIHRoZSBpbWFnZSAoaGFuZCBpY29uKSAtLT5cbiAgICAgIDxpbWcgY2xhc3M9XCJmcmFtZVwiICpuZ0lmPVwiIW9ubHlNb2RhbFwiIHNyYz1cIi8vczMtc2EtZWFzdC0xLmFtYXpvbmF3cy5jb20vc3RhdGljLWZpbGVzLXByb2QvcGxhdGZvcm0vZHJhZy1ob3Jpem9udGFsbHkucG5nXCIgYWx0PVwiXCIgKGNsaWNrKT1cIm9ubHlNb2RhbCA/ICcnIDogc3RhcnQoJGV2ZW50KVwiPlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwic3RhcnRlZCA/IHRydWUgOiBmYWxzZVwiPlxuXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIGNsYXNzPVwiZnJhbWVcIj5cbiAgICAgIDwhLS0gSW1hZ2VzIC0tPlxuICAgICAgPGltZyAqbmdGb3I9XCJsZXQgc2NlbmUgb2Ygc2NlbmVzOyBsZXQgaSA9IGluZGV4O1wiXG4gICAgICAgIFtzcmNdPVwic2NlbmVcIlxuICAgICAgICBkcmFnZ2FibGU9XCJmYWxzZVwiXG4gICAgICAgIGNsYXNzPVwibm8tZHJhZyBpbWFnZS1vbmx5XCJcbiAgICAgICAgKGxvYWQpPVwibWFya0FzTG9hZGVkKCRldmVudClcIlxuICAgICAgICBbbmdDbGFzc109XCJmcmFtZVNob3duID09PSBpICYmICFsb2FkaW5nSW1hZ2VzID8gJ2N1cnJlbnQtc2NlbmUnIDogJ25leHQtc2NlbmUnXCI+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCIgY2xhc3M9XCJmcmFtZVwiPlxuXG4gICAgICA8IS0tIFBsYWNlaG9sZGVyIGltYWdlIC0tPlxuICAgICAgPGltZ1xuICAgICAgICBbc3JjXT1cInNjZW5lc1tmcmFtZVNob3duXVwiXG4gICAgICAgIGRyYWdnYWJsZT1cImZhbHNlXCJcbiAgICAgICAgY2xhc3M9XCJuby1kcmFnXCJcbiAgICAgICAgKGNsaWNrKT1cIm9ubHlNb2RhbCA/IG9uT3BlbigkZXZlbnQpIDogc3RhcnQoJGV2ZW50KVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsnaW1hZ2Utb25seSc6IG9ubHlNb2RhbH1cIj5cblxuICAgICAgPCEtLSBMb2FkaW5nIHNwaW5uZXIgLS0+XG4gICAgICA8YnV0dG9uXG4gICAgICAqbmdJZj1cInNob3dPcGVuRGlhbG9nQnV0dG9uICYmICFvbmx5TW9kYWxcIlxuICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAoY2xpY2spPVwib25PcGVuKCRldmVudClcIlxuICAgICAgW21hdFRvb2x0aXBdPVwiJ2xhYmVsLm9wZW4nIHwgdHJhbnNsYXRlXCJcbiAgICAgIGNsYXNzPVwiZGlhbG9nLWJ1dHRvblwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNvbG9yPVwiZGVmYXVsdFwiPlxuICAgICAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cIlN3YXAgYmV0d2VlbiBSZWZlcmVuY2UgYW5kIFJlbmRlciBpbWFnZXNcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgPmZ1bGxzY3JlZW48L21hdC1pY29uPlxuICAgICAgPC9idXR0b24+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5wcm9kdWN0LXNwaW5uZXItd3JhcHBlcntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlcjpob3ZlciAuZnJhbWV7b3BhY2l0eToxfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlcjpob3ZlciAub3ZlcmxheXtkaXNwbGF5Om5vbmV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZXtkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7YmFja2dyb3VuZC1zaXplOmNvbnRhaW47YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyIGNlbnRlcjtvcGFjaXR5Oi41O3RyYW5zaXRpb246b3BhY2l0eSAuM3MgZWFzZTtjdXJzb3I6bW92ZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lLmltYWdlLW9ubHl7b3BhY2l0eToxO2N1cnNvcjpwb2ludGVyfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUgLmN1cnJlbnQtc2NlbmV7ZGlzcGxheTpibG9ja30ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lIC5uZXh0LXNjZW5le2Rpc3BsYXk6bm9uZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lIGltZ3t3aWR0aDoxMDAlfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAub3ZlcmxheXtwb3NpdGlvbjphYnNvbHV0ZTtwYWRkaW5nOjEwcHg7d2lkdGg6MjAlO21hcmdpbi1sZWZ0OjQwJTttYXJnaW4tdG9wOjQwJTt6LWluZGV4OjE7b3BhY2l0eTouNDt0cmFuc2l0aW9uOm9wYWNpdHkgLjJzIGVhc2V9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZS5sb2FkZXJ7d2lkdGg6NTAlO21hcmdpbjphdXRvfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZGlhbG9nLWJ1dHRvbntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAubG9hZGVyLXBlcmNlbnRhZ2V7cG9zaXRpb246cmVsYXRpdmU7dG9wOjQ3JTt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyO29wYWNpdHk6LjV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjUHJvZHVjdFNwaW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZyYW1lU2hvd246IG51bWJlcjtcbiAgc2NlbmVzOiBzdHJpbmdbXTtcbiAgbG9hZGluZ0ltYWdlczogYm9vbGVhbjtcbiAgcGxhY2Vob2xkZXJTY2VuZTogc3RyaW5nO1xuICBzdGFydGVkOiBib29sZWFuO1xuICB0b3RhbEltYWdlc0xvYWRlZDogbnVtYmVyO1xuICBsb2FkaW5nSW1hZ2UgPSBMT0FESU5HX0lNQUdFO1xuXG4gIEBJbnB1dCgpIGxvb3BpbmcgPSBmYWxzZTtcbiAgQElucHV0KCkgb25seU1vZGFsID0gZmFsc2U7XG4gIEBJbnB1dCgpIEZBTExCQUNLX0lNQUdFOiBzdHJpbmcgPSBGQUxMQkFDS19JTUFHRTtcbiAgQElucHV0KCkgc3RhcnRJbkNlbnRlciA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93T3BlbkRpYWxvZ0J1dHRvbiA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IHNwaW4oc3BpbjogYW55KSB7XG4gICAgaWYgKHNwaW4pIHtcbiAgICAgIGNvbnN0IHNjZW5lcyA9IHRoaXMubG9hZFNjZW5lcyhzcGluKTtcblxuICAgICAgY29uc3Qgc2NlbmVzQ2hhbmdlZCA9ICF0aGlzLnNjZW5lcyB8fCAoc2NlbmVzICYmIHRoaXMuc2NlbmVzLmpvaW4oKSAhPT0gc2NlbmVzLmpvaW4oKSk7XG5cbiAgICAgIGlmIChzY2VuZXNDaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMucmVzZXRTY2VuZXNEYXRhKHNjZW5lcyk7XG4gICAgICAgIC8vIHRoaXMucmVzZXRTdGFydFBvc2l0aW9uQmFzZWRPbkNvbXBhbnkoc3Bpbiwgc2NlbmVzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3BpbiA9IHNwaW47XG5cbiAgICB9XG4gIH1cblxuICBnZXQgc3BpbigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9zcGluO1xuICB9XG5cbiAgQE91dHB1dCgpIG9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIHNjZW5lc0xlbiA9IDA7XG4gIHByaXZhdGUgbW91c2VEb3duID0gZmFsc2U7XG4gIHByaXZhdGUgbGFzdE1vdXNlRXZlbnQ6IE1vdXNlRXZlbnQ7XG4gIHByaXZhdGUgY29udGFpbmVyV2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBpbnRlcnZhbDogbnVtYmVyO1xuICBwcml2YXRlIHBvc2l0aW9uRGlmZjogbnVtYmVyO1xuICBwcml2YXRlIF9zcGluOiBhbnk7XG5cbiAgLypcbiAgKiBMaXN0ZW5pbmcgZm9yIG1vdXNlIGV2ZW50c1xuICAqIG1vdXNldXAgaW4gbmdPbkluaXQgYmVjYXVzZSBpdCB1c2VkIGRvY2N1bWVudCBhcyByZWZlcmVuY2VcbiAgKi9cblxuICAvLyBhdm9pZCBkcmFnXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBtb3VzZWRvd25cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZWRvd24oZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XG4gICAgdGhpcy5sYXN0TW91c2VFdmVudCA9IGV2ZW50O1xuICB9XG5cbiAgLy8gbW91c2Vtb3ZlXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbW92ZScsIFsnJGV2ZW50J10pXG4gIG9uTW91c2Vtb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMubW91c2VEb3duICYmIHRoaXMuc3RhcnRlZCkge1xuXG4gICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKGV2ZW50KTtcblxuICAgICAgLy8gVGhlIHdpZHRoIGlzIGRpdmlkZWQgYnkgdGhlIGFtb3VudCBvZiBpbWFnZXMuIE1vdmluZyBmcm9tIDAgdG8gMTAwIHdpbGwgdHVybiAzNjDDgsKwXG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5wb3NpdGlvbkRpZmYpID49IHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25EaWZmIDwgMCkge1xuICAgICAgICAgIHRoaXMuZ29SaWdodCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ29MZWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0TW91c2VFdmVudCA9IGV2ZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5mcmFtZVNob3duID0gMDtcblxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCdkb2N1bWVudCcsICdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5tb3VzZURvd24pIHtcbiAgICAgICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbWFya0FzTG9hZGVkID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy50b3RhbEltYWdlc0xvYWRlZCsrO1xuICAgIGlmICh0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkID09PSB0aGlzLnNjZW5lc0xlbikge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlclNjZW5lID0gdGhpcy5zY2VuZXNbMF07XG4gICAgICB0aGlzLmxvYWRpbmdJbWFnZXMgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnb0xlZnQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc2NlbmVzW3RoaXMuZnJhbWVTaG93biAtIDFdKSB7XG4gICAgICB0aGlzLmZyYW1lU2hvd24tLTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9vcGluZykge1xuICAgICAgdGhpcy5mcmFtZVNob3duID0gdGhpcy5zY2VuZXNMZW4gLSAxO1xuICAgIH1cbiAgfVxuXG4gIGdvUmlnaHQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc2NlbmVzW3RoaXMuZnJhbWVTaG93biArIDFdKSB7XG4gICAgICB0aGlzLmZyYW1lU2hvd24rKztcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9vcGluZykge1xuICAgICAgdGhpcy5mcmFtZVNob3duID0gMDtcbiAgICB9XG4gIH1cblxuICBzdGFydCA9ICgkZXZlbnQpOiB2b2lkID0+IHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyU2NlbmUgPSBMT0FESU5HX0lNQUdFO1xuICAgIHRoaXMudG90YWxJbWFnZXNMb2FkZWQgPSAwO1xuICAgIHRoaXMubG9hZGluZ0ltYWdlcyA9IHRydWU7XG4gICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGxvYWRlclBlcmNlbnRhZ2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuICh0aGlzLnNjZW5lc0xlbiAtIHRoaXMudG90YWxJbWFnZXNMb2FkZWQpID4gMCA/ICgoMTAwIC8gdGhpcy5zY2VuZXNMZW4pICogdGhpcy50b3RhbEltYWdlc0xvYWRlZCkudG9GaXhlZCgxKSA6IDA7XG4gIH1cblxuICBvbk9wZW4oJGV2ZW50KSB7XG5cbiAgICB0aGlzLm9wZW4uZW1pdCgkZXZlbnQpO1xuXG4gIH1cblxuICAvKlxuICAgKlxuICAgKiBJTVBPUlRBTlRcbiAgICpcbiAgICogcmVzZXRTdGFydFBvc2l0aW9uQmFzZWRPbkNvbXBhbnlcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcmVzcG9uc2libGUgZm9yIGVuc3VyaW5nIHRoZSBCdXNpbmVzcyBSdWxlIG9mIHRoZSBzcGluIHNlcXVlbmNlXG4gICAqIFRoZSBIb21lIERlcG90IGFrYSBjdXN0b21lciAxMDAsIGhhdmUgYSBwYXJ0aWN1bGFyIGJlaGF2aW9yIHN0YXJ0aW5nIDE4MMOCwrogaW4gdGhlIG1pZGRsZVxuICAgKlxuICAqL1xuICBwcml2YXRlIHJlc2V0U3RhcnRQb3NpdGlvbkJhc2VkT25Db21wYW55KHNwaW4sIHNjZW5lcykge1xuXG4gICAgdGhpcy5zdGFydEluQ2VudGVyID0gc3Bpbi5jb21wYW55LmlkID09PSAxMDAgPyB0cnVlIDogZmFsc2U7XG5cbiAgICB0aGlzLnN0YXJ0SW5DZW50ZXIgPSB0aGlzLnN0YXJ0SW5DZW50ZXIgJiYgc2NlbmVzLmxlbmd0aCA8PSAxNjtcblxuICB9XG5cbiAgcHJpdmF0ZSByZXNldFNjZW5lc0RhdGEoc2NlbmVzKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlclNjZW5lID0gc2NlbmVzWzBdO1xuICAgIHRoaXMuc2NlbmVzTGVuID0gc2NlbmVzLmxlbmd0aDtcbiAgICB0aGlzLnNjZW5lcyA9IHNjZW5lcztcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFNjZW5lcyhzcGluKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNjZW5lcyA9IHRoaXMuZ2V0VXJsc0Zyb21TeXNGaWxlcyhzcGluLmRhdGEuc2hvdHMpO1xuICAgICAgcmV0dXJuIHNjZW5lcyAmJiBzY2VuZXMubGVuZ3RoID4gMCA/IHNjZW5lcyA6IFtGQUxMQkFDS19JTUFHRV07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBbRkFMTEJBQ0tfSU1BR0VdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlUG9zaXRpb24oZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQ6IGFueSA9IGV2ZW50Wyd0YXJnZXQnXTtcblxuICAgIGlmICh0aGlzLmNvbnRhaW5lcldpZHRoICE9PSB0YXJnZXQuY2xpZW50V2lkdGgpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSAgdGFyZ2V0LmNsaWVudFdpZHRoO1xuICAgICAgdGhpcy5pbnRlcnZhbCA9ICh0aGlzLmNvbnRhaW5lcldpZHRoIC8gdGhpcy5zY2VuZXNMZW4pIC8gMS42O1xuICAgIH1cblxuICAgIHRoaXMucG9zaXRpb25EaWZmID0gZXZlbnQuY2xpZW50WCAtIHRoaXMubGFzdE1vdXNlRXZlbnQuY2xpZW50WDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VXJsc0Zyb21TeXNGaWxlcyhzeXNGaWxlcykge1xuICAgIGlmICghc3lzRmlsZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN5c0ZpbGVzLm1hcChmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbGUucmVuZGVyRmlsZS5maWxlVXJsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjUHJvZHVjdFNwaW5Db21wb25lbnQgfSBmcm9tICcuL3Byb2R1Y3Qtc3Bpbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNQcm9kdWN0U3BpbkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGVjUHJvZHVjdFNwaW5Db21wb25lbnRcbiAgXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBEZWNQcm9kdWN0U3Bpbk1vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtyb3V0ZXJMaW5rXT1cInJvdXRlckxpbmtcIiBjbGFzcz1cImRlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGVcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGV7b3V0bGluZTowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHJvdXRlckxpbms7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlL2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtdG9vbGJhcicsXG4gIHRlbXBsYXRlOiBgPG1hdC10b29sYmFyIFtjb2xvcl09XCJjb2xvclwiICpuZ0lmPVwiaW5pdGlhbGl6ZWRcIj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLWljb24gaXRlbS1sZWZ0XCIgKm5nSWY9XCJsZWZ0TWVudVRyaWdnZXJWaXNpYmxlXCIgKGNsaWNrKT1cInRvZ2dsZUxlZnRNZW51LmVtaXQoKVwiPlxuICAgICYjOTc3NjtcbiAgPC9zcGFuPlxuXG4gIDxzcGFuICpuZ0lmPVwiY3VzdG9tVGl0bGVcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICA8L3NwYW4+XG5cbiAgPGRpdiBjbGFzcz1cInJpYmJvbiB7e3JpYmJvbn19XCIgKm5nSWY9XCJub3RQcm9kdWN0aW9uXCI+XG4gICAgPHNwYW4+e3tsYWJlbCB8IHRyYW5zbGF0ZX19PC9zcGFuPlxuICA8L2Rpdj5cblxuICA8c3BhbiBjbGFzcz1cImRlYy1zaWRlbmF2LXRvb2xiYXItY3VzdG9tLWNvbnRlbnRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvc3Bhbj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLXNwYWNlclwiPjwvc3Bhbj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLWljb24gaXRlbS1yaWdodFwiICpuZ0lmPVwicmlnaHRNZW51VHJpZ2dlclZpc2libGVcIiAoY2xpY2spPVwidG9nZ2xlUmlnaHRNZW51LmVtaXQoKVwiPlxuICAgICYjOTc3NjtcbiAgPC9zcGFuPlxuXG48L21hdC10b29sYmFyPlxuYCxcbiAgc3R5bGVzOiBbYC5pdGVtcy1zcGFjZXJ7ZmxleDoxIDEgYXV0b30uaXRlbXMtaWNvbntjdXJzb3I6cG9pbnRlcjstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjIsLjgpO3RyYW5zZm9ybTpzY2FsZSgxLjIsLjgpfS5pdGVtcy1pY29uLml0ZW0tcmlnaHR7cGFkZGluZy1sZWZ0OjE0cHh9Lml0ZW1zLWljb24uaXRlbS1sZWZ0e3BhZGRpbmctcmlnaHQ6MTRweH0uZGVjLXNpZGVuYXYtdG9vbGJhci1jdXN0b20tY29udGVudHtwYWRkaW5nOjAgMTZweDt3aWR0aDoxMDAlfS5yaWJib257dHJhbnNpdGlvbjphbGwgLjNzIGVhc2U7dGV4dC10cmFuc2Zvcm06bG93ZXJjYXNlO3RleHQtYWxpZ246Y2VudGVyO3Bvc2l0aW9uOnJlbGF0aXZlO2xpbmUtaGVpZ2h0OjY0cHg7bWFyZ2luLWxlZnQ6NHB4O3BhZGRpbmc6MCAyMHB4O2hlaWdodDo2NHB4O3dpZHRoOjE1NXB4O2NvbG9yOiNmZmY7bGVmdDoyMHB4O3RvcDowfS5yaWJib24ucmliYm9uLWhpZGRlbntkaXNwbGF5Om5vbmV9LnJpYmJvbjo6YmVmb3Jle2NvbnRlbnQ6Jyc7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwdnc7aGVpZ2h0OjRweDt6LWluZGV4OjI7dG9wOjY0cHg7bGVmdDowfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTk5cHgpey5yaWJib246OmJlZm9yZXt0b3A6NTZweH19YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xuXG4gIGluaXRpYWxpemVkO1xuXG4gIG5vdFByb2R1Y3Rpb24gPSB0cnVlO1xuICByaWJib24gPSAnJztcbiAgbGFiZWwgPSAnJztcblxuICBASW5wdXQoKSBjb2xvcjtcblxuICBASW5wdXQoKSBlbnZpcm9ubWVudDtcblxuICBASW5wdXQoKSBsZWZ0TWVudVRyaWdnZXJWaXNpYmxlID0gdHJ1ZTtcblxuICBASW5wdXQoKSByaWdodE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHRvZ2dsZUxlZnRNZW51OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSB0b2dnbGVSaWdodE1lbnU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50KSBjdXN0b21UaXRsZTogRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdsb2NhbCcpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1ncmVlbic7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLmxvY2FsJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1ibHVlJztcbiAgICAgIHRoaXMubGFiZWwgPSAnbGFiZWwuZGV2ZWxvcG1lbnQnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5lbnZpcm9ubWVudCA9PT0gJ3FhJykge1xuICAgICAgdGhpcy5yaWJib24gPSAncmliYm9uLXJlZCc7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLnFhJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdhY3RpdmUnKSB7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24tZ3JlZW4nO1xuICAgICAgdGhpcy5sYWJlbCA9ICdsYWJlbC5hY3RpdmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vdFByb2R1Y3Rpb24gPSBmYWxzZTtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1oaWRkZW4nO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtaXRlbScsXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlIGxldC10cmVlTGV2ZWw9XCJ0cmVlTGV2ZWxcIiAjdGVtcGxhdGU+XG5cbiAgPG1hdC1saXN0LWl0ZW0gY2xhc3M9XCJjbGljayBkZWMtc2lkZW5hdi1tZW51LWl0ZW1cIlxuICAoY2xpY2spPVwic3ViaXRlbXMubGVuZ3RoID8gdG9nZ2xlU3VibWVudSgpIDogb3BlbkxpbmsoKVwiXG4gIFtuZ1N0eWxlXT1cImdldEJhY2tncm91bmQodHJlZUxldmVsKVwiPlxuXG4gICAgPGRpdiBjbGFzcz1cIml0ZW0td3JhcHBlclwiPlxuXG4gICAgICA8ZGl2IFtuZ1N0eWxlXT1cIntwYWRkaW5nTGVmdDogdHJlZUxldmVsICogMTYgKyAncHgnfVwiIGNsYXNzPVwiaXRlbS1jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8YSAqbmdJZj1cInN1Yml0ZW1zLmxlbmd0aFwiIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJzaG93U3VibWVudVwiPlxuICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiPjxpIGNsYXNzPVwiYXJyb3cgZG93blwiPjwvaT48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cInRydWVcIj48aSBjbGFzcz1cImFycm93IHVwXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2E+XG4gICAgPC9kaXY+XG5cbiAgPC9tYXQtbGlzdC1pdGVtPlxuXG4gIDxkaXYgY2xhc3M9XCJzdWJpdGVtLW1lbnVcIiAqbmdJZj1cInNob3dTdWJtZW51XCI+XG5cbiAgICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwic3ViaXRlbXNcIiBbdHJlZUxldmVsXT1cInRyZWVMZXZlbFwiPjwvZGVjLXNpZGVuYXYtbWVudT5cblxuICA8L2Rpdj5cblxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gIHN0eWxlczogW2AuZGVjLXNpZGVuYXYtbWVudS1pdGVte2hlaWdodDo1NnB4IWltcG9ydGFudDtvdXRsaW5lOjB9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVye3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3cgbm8td3JhcDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLml0ZW0tY29udGVudCA6Om5nLWRlZXAgLm1hdC1pY29uLC5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAuaXRlbS1jb250ZW50IDo6bmctZGVlcCBpe3ZlcnRpY2FsLWFsaWduOm1pZGRsZTttYXJnaW4tYm90dG9tOjVweDttYXJnaW4tcmlnaHQ6OHB4fS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAucmlnaHR7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpfS5kZWMtc2lkZW5hdi1tZW51LWl0ZW0gLml0ZW0td3JhcHBlciAubGVmdHt0cmFuc2Zvcm06cm90YXRlKDEzNWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDEzNWRlZyl9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuaXRlbS13cmFwcGVyIC51cHt0cmFuc2Zvcm06cm90YXRlKC0xMzVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtMTM1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC5pdGVtLXdyYXBwZXIgLmRvd257dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKX0uZGVjLXNpZGVuYXYtbWVudS1pdGVtIC50ZXh0LXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSAuY2xpY2t7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1zaWRlbmF2LW1lbnUtaXRlbSBpe2JvcmRlcjpzb2xpZCAjMDAwO2JvcmRlci13aWR0aDowIDJweCAycHggMDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjRweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSByb3V0ZXJMaW5rO1xuXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgX3N1Yml0ZW1zOiBRdWVyeUxpc3Q8RGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50PjtcblxuICBzdGFydGVkO1xuXG4gIHNob3dTdWJtZW51ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgfSwgMSk7XG4gIH1cblxuICBnZXQgc3ViaXRlbXMoKSB7XG4gICAgY29uc3Qgc3ViaXRlbXMgPSB0aGlzLl9zdWJpdGVtcy50b0FycmF5KCk7XG4gICAgc3ViaXRlbXMuc3BsaWNlKDAsIDEpOyAvLyByZW1vdmVzIGl0c2VsZlxuICAgIHJldHVybiBzdWJpdGVtcztcbiAgfVxuXG4gIHRvZ2dsZVN1Ym1lbnUoKSB7XG4gICAgdGhpcy5zaG93U3VibWVudSA9ICF0aGlzLnNob3dTdWJtZW51O1xuICB9XG5cbiAgb3BlbkxpbmsoKSB7XG4gICAgaWYgKHRoaXMucm91dGVyTGluaykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnJvdXRlckxpbmsgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGlzTmFrZWQgPSB0aGlzLnJvdXRlckxpbmsuc3RhcnRzV2l0aCgnLy8nKTtcbiAgICAgICAgY29uc3QgaXNIdHRwID0gdGhpcy5yb3V0ZXJMaW5rLnN0YXJ0c1dpdGgoJ2h0dHA6Ly8nKTtcbiAgICAgICAgY29uc3QgaXNIdHRwcyA9IHRoaXMucm91dGVyTGluay5zdGFydHNXaXRoKCdodHRwczovLycpO1xuICAgICAgICBpZiAoaXNOYWtlZCB8fCBpc0h0dHAgfHwgaXNIdHRwcykge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5yb3V0ZXJMaW5rO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnJvdXRlckxpbmtdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMucm91dGVyTGluaykpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUodGhpcy5yb3V0ZXJMaW5rKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRCYWNrZ3JvdW5kKHRyZWVMZXZlbCkge1xuICAgIGxldCBzdHlsZSA9IHsgYmFja2dyb3VuZENvbG9yOiAnJywgcG9pbnRlckV2ZW50czogJycgfTtcbiAgICBpZiAodGhpcy5yb3V0ZXJMaW5rID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciArPSAnI0VGM0Y1NCc7XG4gICAgICBzdHlsZS5wb2ludGVyRXZlbnRzICs9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yICs9ICdyZ2JhKDAsIDAsIDAsICcgKyB0cmVlTGV2ZWwgLyA2ICsgJyknOyAvLyBoc2woMjA5LCAyMCUsIDMwJSlcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IFNUT1JBR0VfRE9NQUlOID0gJ2RlY1NpZGVuYXZDb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdlNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXRTaWRlbmF2VmlzaWJpbGl0eShuYW1lLCB2aXNpYmlsaXR5KSB7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldFNpZGVuYXZDb25maWcoKTtcblxuICAgIGNvbmZpZ1tuYW1lXSA9IHZpc2liaWxpdHk7XG5cbiAgICB0aGlzLnNldFNpZGVuYXZDb25maWcoY29uZmlnKTtcblxuICB9XG5cbiAgZ2V0U2lkZW5hdlZpc2liaWxpdHkobmFtZSkge1xuXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRTaWRlbmF2Q29uZmlnKCk7XG5cbiAgICByZXR1cm4gY29uZmlnW25hbWVdO1xuXG4gIH1cblxuICBwcml2YXRlIHNldFNpZGVuYXZDb25maWcoY29uZikge1xuXG4gICAgY29uc3QgY29uZlN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGNvbmYpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9ET01BSU4sIGNvbmZTdHJpbmcpO1xuXG4gIH1cblxuICBwcml2YXRlIGdldFNpZGVuYXZDb25maWcoKSB7XG5cbiAgICBjb25zdCBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9ET01BSU4pO1xuXG4gICAgaWYgKGRhdGEpIHtcblxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25zdCBuZXdDb25maWc6IGFueSA9IHt9O1xuXG4gICAgICB0aGlzLnNldFNpZGVuYXZDb25maWcobmV3Q29uZmlnKTtcblxuICAgICAgcmV0dXJuIG5ld0NvbmZpZztcblxuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIElucHV0LCBDb250ZW50Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS9kZWMtc2lkZW5hdi1tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUvZGVjLXNpZGVuYXYtbWVudS10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vLi4vc2lkZW5hdi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtbWVudS1sZWZ0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VzdG9tVGl0bGVcIj5cbiAgPGRpdiBjbGFzcz1cIm1lbnUtdGl0bGVcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtZGVjLXNpZGVuYXYtbWVudS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW1zXCI+XG4gIDxkZWMtc2lkZW5hdi1tZW51IFtpdGVtc109XCJpdGVtcy50b0FycmF5KClcIj48L2RlYy1zaWRlbmF2LW1lbnU+XG48L25nLWNvbnRhaW5lcj5gLFxuICBzdHlsZXM6IFtgLm1lbnUtdGl0bGV7cGFkZGluZzoxNnB4O2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjcwMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQge1xuXG4gIHJlYWRvbmx5IGxlZnRNZW51VmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgcmVhZG9ubHkgbGVmdE1lbnVNb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdzaWRlJyk7XG5cbiAgQElucHV0KClcbiAgc2V0IG9wZW4odjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5sZWZ0TWVudVZpc2libGUudmFsdWU7XG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5sZWZ0TWVudVZpc2libGUubmV4dCh2KTtcbiAgICAgIHRoaXMuZGVjU2lkZW5hdlNlcnZpY2Uuc2V0U2lkZW5hdlZpc2liaWxpdHkoJ2xlZnRNZW51SGlkZGVuJywgIXYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLmxlZnRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBtb2RlKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMubGVmdE1lbnVNb2RlLnZhbHVlO1xuXG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5sZWZ0TWVudU1vZGUubmV4dCh2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgbW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0TWVudU1vZGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKSBwZXJzaXN0VmlzaWJpbGl0eU1vZGU6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBpdGVtczogUXVlcnlMaXN0PERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50KSBjdXN0b21UaXRsZTogRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgb3BlbmVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKSBtb2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNTaWRlbmF2U2VydmljZTogRGVjU2lkZW5hdlNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVBbmRFeHBvc2VTaWRlbmF2RXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKSB7XG5cbiAgICB0aGlzLmxlZnRNZW51VmlzaWJsZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxlZnRNZW51TW9kZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5tb2RlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS10aXRsZS9kZWMtc2lkZW5hdi1tZW51LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY1NpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zaWRlbmF2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51LXJpZ2h0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VzdG9tVGl0bGVcIj5cbiAgPGRpdiBjbGFzcz1cIm1lbnUtdGl0bGVcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtZGVjLXNpZGVuYXYtbWVudS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIml0ZW1zXCI+XG4gIDxkZWMtc2lkZW5hdi1tZW51IFtpdGVtc109XCJpdGVtcy50b0FycmF5KClcIj48L2RlYy1zaWRlbmF2LW1lbnU+XG48L25nLWNvbnRhaW5lcj5gLFxuICBzdHlsZXM6IFtgLm1lbnUtdGl0bGV7cGFkZGluZzoxNnB4O2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjcwMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2TWVudVJpZ2h0Q29tcG9uZW50IHtcblxuICByZWFkb25seSByaWdodE1lbnVWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcblxuICByZWFkb25seSByaWdodE1lbnVNb2RlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCdzaWRlJyk7XG5cbiAgQElucHV0KClcbiAgc2V0IG9wZW4odjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5yaWdodE1lbnVWaXNpYmxlLnZhbHVlO1xuXG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yaWdodE1lbnVWaXNpYmxlLm5leHQodik7XG4gICAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnNldFNpZGVuYXZWaXNpYmlsaXR5KCdyaWdodE1lbnVIaWRkZW4nLCAhdik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBtb2RlKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMucmlnaHRNZW51TW9kZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucmlnaHRNZW51TW9kZS5uZXh0KHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0TWVudU1vZGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKSBwZXJzaXN0VmlzaWJpbGl0eU1vZGU6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQsIHtkZXNjZW5kYW50czogZmFsc2V9KSBpdGVtczogUXVlcnlMaXN0PERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50KSBjdXN0b21UaXRsZTogRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgb3BlbmVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKSBtb2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNTaWRlbmF2U2VydmljZTogRGVjU2lkZW5hdlNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVBbmRFeHBvc2VTaWRlbmF2RXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKSB7XG5cbiAgICB0aGlzLnJpZ2h0TWVudVZpc2libGUuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yaWdodE1lbnVNb2RlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLm1vZGVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDb250ZW50Q2hpbGQsIEFmdGVyVmlld0luaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtdG9vbGJhci9kZWMtc2lkZW5hdi10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtbGVmdC9kZWMtc2lkZW5hdi1tZW51LWxlZnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQvZGVjLXNpZGVuYXYtbWVudS1yaWdodC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0U2lkZW5hdiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY1NpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlbmF2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1zaWRlbmF2LXdyYXBlclwiPlxuICA8IS0tIFRPT0xCQVIgLS0+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0b29sYmFyXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtdG9vbGJhclwiPjwvbmctY29udGVudD5cbiAgPC9uZy1jb250YWluZXI+XG4gIDwhLS0gLyBUT09MQkFSIC0tPlxuXG4gIDwhLS0gUFJPR1JFU1MgQkFSIC0tPlxuICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyLXdyYXBwZXJcIiAqbmdJZj1cInByb2dyZXNzQmFyVmlzaWJsZSB8IGFzeW5jXCI+XG4gICAgPG1hdC1wcm9ncmVzcy1iYXIgbW9kZT1cImluZGV0ZXJtaW5hdGVcIiBjb2xvcj1cImFjY2VudFwiPjwvbWF0LXByb2dyZXNzLWJhcj5cbiAgPC9kaXY+XG4gIDwhLS0gLyBQUk9HUkVTUyBCQVIgLS0+XG5cbiAgPG1hdC1zaWRlbmF2LWNvbnRhaW5lciBbbmdDbGFzc109XCJ7J3dpdGgtdG9vbGJhcic6IHRvb2xiYXJ9XCI+XG5cbiAgICA8IS0tIExFRlQgTUVOVSAtLT5cbiAgICA8bWF0LXNpZGVuYXYgKm5nSWY9XCJsZWZ0TWVudVwiXG4gICAgW21vZGVdPVwibGVmdE1lbnUubGVmdE1lbnVNb2RlIHwgYXN5bmNcIlxuICAgIFtvcGVuZWRdPVwibGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlIHwgYXN5bmNcIlxuICAgIHBvc2l0aW9uPVwic3RhcnRcIlxuICAgIChvcGVuZWRDaGFuZ2UpPVwibGVmdFNpZGVuYXZPcGVuZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgI2xlZnRTaWRlbmF2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLXNpZGVuYXYtbWVudS1sZWZ0XCI+PC9uZy1jb250ZW50PlxuICAgIDwvbWF0LXNpZGVuYXY+XG4gICAgPCEtLSAvIExFRlQgTUVOVSAtLT5cblxuICAgIDwhLS0gQ09OVEVOVCAtLT5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgIDwhLS0gLyBDT05URU5UIC0tPlxuXG4gICAgPCEtLSBSSUdIVCBNRU5VIC0tPlxuICAgIDxtYXQtc2lkZW5hdiAqbmdJZj1cInJpZ2h0TWVudVwiXG4gICAgW21vZGVdPVwicmlnaHRNZW51LnJpZ2h0TWVudU1vZGUgfCBhc3luY1wiXG4gICAgW29wZW5lZF09XCJyaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZSB8IGFzeW5jXCJcbiAgICBwb3NpdGlvbj1cImVuZFwiXG4gICAgKG9wZW5lZENoYW5nZSk9XCJyaWdodFNpZGVuYXZPcGVuZWRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgI3JpZ2h0U2lkZW5hdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1zaWRlbmF2LW1lbnUtcmlnaHRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9tYXQtc2lkZW5hdj5cbiAgICA8IS0tIC8gUklHSFQgTUVOVSAtLT5cblxuICA8L21hdC1zaWRlbmF2LWNvbnRhaW5lcj5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVye2hlaWdodDoxMDB2aH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5tYXQtc2lkZW5hdi1jb250YWluZXIud2l0aC10b29sYmFye2hlaWdodDpjYWxjKDEwMHZoIC0gNjRweCl9LmRlYy1zaWRlbmF2LXdyYXBlciAubWF0LXNpZGVuYXYtY29udGFpbmVyIC5tYXQtc2lkZW5hdnt3aWR0aDoyNTZweH0uZGVjLXNpZGVuYXYtd3JhcGVyIC5wcm9ncmVzcy1iYXItd3JhcHBlcntwb3NpdGlvbjpmaXhlZDt0b3A6NjBweDtsZWZ0OjA7d2lkdGg6MTAwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcmVhZG9ubHkgcHJvZ3Jlc3NCYXJWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCkgdG9vbGJhcjogRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQpXG4gIHNldCBsZWZ0TWVudSh2OiBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQpIHtcbiAgICB0aGlzLl9sZWZ0TWVudSA9IHY7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbExlZnRNZW51VmlzaWJpbGl0eU1vZGVzKCk7XG4gICAgfVxuICB9XG4gIGdldCBsZWZ0TWVudSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGVmdE1lbnU7XG4gIH1cblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQpXG4gIHNldCByaWdodE1lbnUodjogRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCkge1xuICAgIHRoaXMuX3JpZ2h0TWVudSA9IHY7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbFJpZ2h0TWVudVZpc2liaWxpdHlNb2RlcygpO1xuICAgIH1cbiAgfVxuICBnZXQgcmlnaHRNZW51KCkge1xuICAgIHJldHVybiB0aGlzLl9yaWdodE1lbnU7XG4gIH1cblxuICBAVmlld0NoaWxkKCdsZWZ0U2lkZW5hdicpIGxlZnRTaWRlbmF2OiBNYXRTaWRlbmF2O1xuXG4gIEBWaWV3Q2hpbGQoJ3JpZ2h0U2lkZW5hdicpIHJpZ2h0U2lkZW5hdjogTWF0U2lkZW5hdjtcblxuICBwcml2YXRlIF9sZWZ0TWVudTogRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50O1xuXG4gIHByaXZhdGUgX3JpZ2h0TWVudTogRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudDtcblxuICBASW5wdXQoKVxuICBzZXQgbG9hZGluZyh2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGxvYWRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNTaWRlbmF2U2VydmljZTogRGVjU2lkZW5hdlNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgIHRoaXMuZGV0ZWN0QW5kU2hvd0NoaWxkQ29tcG9uZW50cygpO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVUb1Rvb2xiYXJFdmVudHMoKTtcblxuICB9XG5cbiAgLy8gQVBJIC8vXG4gIG9wZW5Cb3RoTWVudXMoKSB7XG4gICAgdGhpcy5vcGVuTGVmdE1lbnUoKTtcbiAgICB0aGlzLm9wZW5SaWdodE1lbnUoKTtcbiAgfVxuXG4gIG9wZW5MZWZ0TWVudSgpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgb3BlblJpZ2h0TWVudSgpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQodHJ1ZSk7XG4gIH1cblxuICBjbG9zZUJvdGhNZW51cygpIHtcbiAgICB0aGlzLmNsb3NlTGVmdE1lbnUoKTtcbiAgICB0aGlzLmNsb3NlUmlnaHRNZW51KCk7XG4gIH1cblxuICBjbG9zZUxlZnRNZW51KCkge1xuICAgIHRoaXMubGVmdE1lbnUubGVmdE1lbnVWaXNpYmxlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgY2xvc2VSaWdodE1lbnUoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIHRvZ2dsZUJvdGhNZW51cygpIHtcbiAgICB0aGlzLnRvZ2dsZUxlZnRNZW51KCk7XG4gICAgdGhpcy50b2dnbGVSaWdodE1lbnUoKTtcbiAgfVxuXG4gIHRvZ2dsZUxlZnRNZW51KCkge1xuICAgIHRoaXMubGVmdE1lbnUub3BlbiA9ICF0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS52YWx1ZTtcbiAgfVxuXG4gIHRvZ2dsZVJpZ2h0TWVudSgpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5vcGVuID0gIXRoaXMucmlnaHRNZW51LnJpZ2h0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICBzZXRCb3RoTWVudXNNb2RlKG1vZGU6ICdvdmVyJyB8ICdwdXNoJyB8ICdzaWRlJyA9ICdzaWRlJykge1xuICAgIHRoaXMuc2V0TGVmdE1lbnVNb2RlKG1vZGUpO1xuICAgIHRoaXMuc2V0UmlnaHRNZW51TW9kZShtb2RlKTtcbiAgfVxuXG4gIHNldExlZnRNZW51TW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51TW9kZS5uZXh0KG1vZGUpO1xuICB9XG5cbiAgc2V0UmlnaHRNZW51TW9kZShtb2RlOiAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZScgPSAnc2lkZScpIHtcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVNb2RlLm5leHQobW9kZSk7XG4gIH1cblxuICB0b2dnbGVQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSAhdGhpcy5wcm9ncmVzc0JhclZpc2libGUudmFsdWU7XG4gIH1cblxuICBzaG93UHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5wcm9ncmVzc0JhclZpc2libGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGhpZGVQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyVmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIGxlZnRTaWRlbmF2T3BlbmVkQ2hhbmdlKG9wZW5lZFN0YXR1cykge1xuICAgIHRoaXMubGVmdE1lbnUub3BlbiA9IG9wZW5lZFN0YXR1cztcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KG9wZW5lZFN0YXR1cyk7XG4gIH1cblxuICByaWdodFNpZGVuYXZPcGVuZWRDaGFuZ2Uob3BlbmVkU3RhdHVzKSB7XG4gICAgdGhpcy5yaWdodE1lbnUub3BlbiA9IG9wZW5lZFN0YXR1cztcbiAgICB0aGlzLnJpZ2h0TWVudS5yaWdodE1lbnVWaXNpYmxlLm5leHQob3BlbmVkU3RhdHVzKTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0QW5kU2hvd0NoaWxkQ29tcG9uZW50cygpIHtcblxuICAgIHRoaXMudG9vbGJhci5sZWZ0TWVudVRyaWdnZXJWaXNpYmxlID0gdGhpcy5sZWZ0TWVudSA/IHRydWUgOiBmYWxzZTtcblxuICAgIHRoaXMudG9vbGJhci5yaWdodE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRoaXMucmlnaHRNZW51ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvVG9vbGJhckV2ZW50cygpIHtcblxuICAgIGlmICh0aGlzLnRvb2xiYXIpIHtcblxuICAgICAgdGhpcy50b29sYmFyLnRvZ2dsZUxlZnRNZW51LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubGVmdFNpZGVuYXYudG9nZ2xlKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy50b29sYmFyLnRvZ2dsZVJpZ2h0TWVudS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJpZ2h0U2lkZW5hdi50b2dnbGUoKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHNldEluaXRpYWxSaWdodE1lbnVWaXNpYmlsaXR5TW9kZXMoKSB7XG4gICAgdGhpcy5yaWdodE1lbnUucmlnaHRNZW51VmlzaWJsZS5uZXh0KCF0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLmdldFNpZGVuYXZWaXNpYmlsaXR5KCdyaWdodE1lbnVIaWRkZW4nKSk7XG4gIH1cblxuICBwcml2YXRlIHNldEluaXRpYWxMZWZ0TWVudVZpc2liaWxpdHlNb2RlcygpIHtcbiAgICB0aGlzLmxlZnRNZW51LmxlZnRNZW51VmlzaWJsZS5uZXh0KCF0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLmdldFNpZGVuYXZWaXNpYmlsaXR5KCdsZWZ0TWVudUhpZGRlbicpKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtY29udGVudCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1zaWRlbmF2LWNvbnRhaW5lci13cmFwcGVyXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtc2lkZW5hdi1jb250YWluZXItd3JhcHBlcnttaW4td2lkdGg6MTAyNHB4O3BhZGRpbmc6MzJweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNTaWRlbmF2Q29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUnLFxuICB0ZW1wbGF0ZTogYDxtYXQtbGlzdD5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtLnN0YXJ0ZWQgJiYgaXRlbS50ZW1wbGF0ZSA/IHRydWUgOiBmYWxzZVwiPlxuICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtLnRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dHJlZUxldmVsOiB0cmVlTGV2ZWwgKyAxfVwiXG4gICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG48L21hdC1saXN0PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtbGlzdHtwYWRkaW5nLXRvcDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51Q29tcG9uZW50IHtcblxuICBASW5wdXQoKSBpdGVtcyA9IFtdO1xuXG4gIEBJbnB1dCgpIHRyZWVMZXZlbCA9IC0xO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU2lkZW5hdkNvbXBvbmVudCB9IGZyb20gJy4vc2lkZW5hdi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0U2lkZW5hdk1vZHVsZSwgTWF0TGlzdE1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGVjU2lkZW5hdkNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LWNvbnRlbnQvZGVjLXNpZGVuYXYtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc2lkZW5hdi1tZW51LWl0ZW0vZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtbGVmdC9kZWMtc2lkZW5hdi1tZW51LWxlZnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQvZGVjLXNpZGVuYXYtbWVudS1yaWdodC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVDb21wb25lbnQgfSBmcm9tICcuL2RlYy1zaWRlbmF2LW1lbnUvZGVjLXNpZGVuYXYtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtbWVudS10aXRsZS9kZWMtc2lkZW5hdi1tZW51LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtdG9vbGJhci9kZWMtc2lkZW5hdi10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vZGVjLXNpZGVuYXYtdG9vbGJhci10aXRsZS9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vc2lkZW5hdi5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNTaWRlbmF2Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZDb250ZW50Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNTaWRlbmF2Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZDb250ZW50Q29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudUxlZnRDb21wb25lbnQsXG4gICAgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCxcbiAgICBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyQ29tcG9uZW50LFxuICAgIERlY1NpZGVuYXZUb29sYmFyVGl0bGVDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1NpZGVuYXZTZXJ2aWNlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbndpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddID0gd2luZG93WydkZWNvcmFTY3JpcHRTZXJ2aWNlJ10gfHwge307XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERlY1NjcmlwdExvYWRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbG9hZCh1cmw6IHN0cmluZywgc2NyaXB0TmFtZTogc3RyaW5nKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBjb25zdCBzY3JpcHRMb2FkZWQgPSB3aW5kb3dbJ2RlY29yYVNjcmlwdFNlcnZpY2UnXVtzY3JpcHROYW1lXTtcblxuICAgICAgaWYgKHNjcmlwdExvYWRlZCkge1xuXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IHdpbmRvd1tzY3JpcHROYW1lXTtcblxuICAgICAgICByZXNvbHZlKHNjcmlwdCk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY29uc3Qgc2NyaXB0VGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgc2NyaXB0VGFnLnNldEF0dHJpYnV0ZSgnc3JjJywgdXJsKTtcblxuICAgICAgICBzY3JpcHRUYWcuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuXG4gICAgICAgIHNjcmlwdFRhZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICB3aW5kb3dbJ2RlY29yYVNjcmlwdFNlcnZpY2UnXVtzY3JpcHROYW1lXSA9IHRydWU7XG5cbiAgICAgICAgICBjb25zdCBzY3JpcHQgPSB3aW5kb3dbc2NyaXB0TmFtZV07XG5cbiAgICAgICAgICByZXNvbHZlKHNjcmlwdCk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBzY3JpcHRUYWcub25lcnJvciA9IHJlamVjdDtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHNjcmlwdFRhZyk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH07XG5cbiAgbG9hZFN0eWxlKHVybDogc3RyaW5nKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICB3aW5kb3dbJ3NjcmlwdFNlcnZpY2VMb2FkZWRTdHlsZXNBcnJheSddID0gd2luZG93WydzY3JpcHRTZXJ2aWNlTG9hZGVkU3R5bGVzQXJyYXknXSB8fCB7fTtcblxuICAgICAgY29uc3Qgc3R5bGVMb2FkZWQgPSB3aW5kb3dbJ3NjcmlwdFNlcnZpY2VMb2FkZWRTdHlsZXNBcnJheSddW3VybF07XG5cbiAgICAgIGlmIChzdHlsZUxvYWRlZCkge1xuXG4gICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBjb25zdCBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICAgIGxpbmtUYWcuc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xuICAgICAgICBsaW5rVGFnLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgICAgICBsaW5rVGFnLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCAnYWxsJyk7XG4gICAgICAgIGxpbmtUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcblxuICAgICAgICBsaW5rVGFnLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIHdpbmRvd1snc2NyaXB0U2VydmljZUxvYWRlZFN0eWxlc0FycmF5J11bdXJsXSA9IHRydWU7XG5cbiAgICAgICAgICByZXNvbHZlKCk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBsaW5rVGFnLm9uZXJyb3IgPSByZWplY3Q7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChsaW5rVGFnKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfTtcblxuICBsb2FkU3R5bGVBbmRTY3JpcHQoc3R5bGVVcmwsIHNjcmlwdFVybCwgc2NyaXB0TmFtZXNwYWNlKSB7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkU3R5bGUoc3R5bGVVcmwpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZChzY3JpcHRVcmwsIHNjcmlwdE5hbWVzcGFjZSk7XG4gICAgfSk7XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NjcmlwdExvYWRlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3NjcmlwdC1sb2FkZXIvZGVjLXNjcmlwdC1sb2FkZXIuc2VydmljZSc7XG5cbmNvbnN0IFNLRVRDSEZBQl9TQ1JJUFRfVVJMID0gJ2h0dHBzOi8vc3RhdGljLnNrZXRjaGZhYi5jb20vYXBpL3NrZXRjaGZhYi12aWV3ZXItMS4wLjAuanMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2tldGNoZmFiLXZpZXcnLFxuICB0ZW1wbGF0ZTogYDxpZnJhbWUgc3JjPVwiXCIgXG4gICNhcGlGcmFtZSBcbiAgaWQ9XCJhcGktZnJhbWVcIiBcbiAgaGVpZ2h0PVwiNjIwXCJcbiAgd2lkdGg9XCI2MjBcIiBcbiAgYWxsb3dmdWxsc2NyZWVuIFxuICBtb3phbGxvd2Z1bGxzY3JlZW49XCJ0cnVlXCIgXG4gIHdlYmtpdGFsbG93ZnVsbHNjcmVlbj1cInRydWVcIj48L2lmcmFtZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2tldGNoZmFiVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgXG4gIHNldCBza2V0Y2hmYWJJZChpZCkge1xuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5fc2tldGNoZmFiSWQgPSBpZDtcbiAgICAgIHRoaXMuc3RhcnRTa2V0Y2hmYWIoaWQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBza2V0Y2hmYWJJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2tldGNoZmFiSWQ7XG4gIH1cblxuICBfc2tldGNoZmFiSWQ6IHN0cmluZztcblxuICBAVmlld0NoaWxkKCdhcGlGcmFtZScpIGFwaUZyYW1lOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjU2NyaXB0TG9hZGVyU2VydmljZTogRGVjU2NyaXB0TG9hZGVyU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBzdGFydFNrZXRjaGZhYihpZCkge1xuICAgIHRoaXMuZGVjU2NyaXB0TG9hZGVyU2VydmljZS5sb2FkKFNLRVRDSEZBQl9TQ1JJUFRfVVJMLCAnU2tldGNoZmFiJylcbiAgICAgIC50aGVuKChTa2V0Y2hmYWI6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBpZnJhbWUgPSB0aGlzLmFwaUZyYW1lLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBTa2V0Y2hmYWIoJzEuMC4wJywgaWZyYW1lKTtcbiAgICAgICAgY2xpZW50LmluaXQodGhpcy5za2V0Y2hmYWJJZCwge1xuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIG9uU3VjY2VzcyhhcGkpIHtcbiAgICAgICAgICAgIGFwaS5zdGFydCgpO1xuICAgICAgICAgICAgYXBpLmFkZEV2ZW50TGlzdGVuZXIoJ3ZpZXdlcnJlYWR5JywgICgpID0+IHt9KTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9kZWMtc2NyaXB0LWxvYWRlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2NyaXB0TG9hZGVyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNTY3JpcHRMb2FkZXJNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3NjcmlwdC1sb2FkZXIvZGVjLXNjcmlwdC1sb2FkZXIubW9kdWxlJztcbmltcG9ydCB7IERlY1NrZXRjaGZhYlZpZXdDb21wb25lbnQgfSBmcm9tICcuL2RlYy1za2V0Y2hmYWItdmlldy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERlY1NjcmlwdExvYWRlck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNTa2V0Y2hmYWJWaWV3Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNTa2V0Y2hmYWJWaWV3Q29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2tldGNoZmFiVmlld01vZHVsZSB7IH1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0ZXAgfSBmcm9tICcuL2RlYy1zdGVwcy1saXN0Lm1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zdGVwcy1saXN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaGlzdG9yeS1jb250YWluZXJcIiBbbmdDbGFzc109XCJ7J2xpbWl0ZWQtaGVpZ2h0JzogbWF4SGVpZ2h0fVwiIFtzdHlsZS5tYXhIZWlnaHRdPVwibWF4SGVpZ2h0IHx8ICcxMDAlJ1wiPlxuXG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBjbGFzcz1cImRlYy1jb2xvci1ncmV5LWRhcmtcIj5cblxuICAgIDxtYXQtaWNvbiBmeEZsZXg9XCIyNHB4XCI+e3tpY29ufX08L21hdC1pY29uPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJiaWdnZXItZm9udFwiPnt7IHRpdGxlIH19PC9zcGFuPlxuXG4gIDwvZGl2PlxuXG4gIDxicj5cblxuICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaGlzdG9yeS1pdGVtXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RlcHNMaXN0OyBsZXQgaSA9IGluZGV4XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJsZWZ0IHN0YXJ0XCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleVwiPlxuXG4gICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInNtYWxsZXItaWNvbiBkZWMtY29sb3ItZ3JleS1kYXJrXCIgZnhGbGV4PVwiMjRweFwiPnt7IGkgPT09IHN0ZXBzTGlzdC5sZW5ndGggLSAxID8gJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnIDogJ2xlbnMnIH19PC9tYXQtaWNvbj5cblxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCI0cHhcIj5cblxuICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgIDxzdHJvbmcgKm5nSWY9XCJpdGVtLnRpdGxlXCI+e3sgaXRlbS50aXRsZSB9fTwvc3Ryb25nPlxuXG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uZGF0ZVwiPlxuICAgICAgICAgICAgICB7eyBpdGVtLmRhdGUgfCBkYXRlIH19XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd1RpbWVcIj4gfCB7eyBpdGVtLmRhdGUgfCBkYXRlOiAnbWVkaXVtVGltZScgfX08L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJpdGVtLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleS1kYXJrXCI+XG4gICAgICAgICAgICA8c3Ryb25nIGNsYXNzPVwiZGVjLWNvbG9yLWJsYWNrXCI+e3sgaXRlbS5kZXNjcmlwdGlvbiB9fTwvc3Ryb25nPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtdGFiLWJvZHktY29udGVudHtwYWRkaW5nOjE2cHggMH0ubWF0LWZvcm0tZmllbGQtcHJlZml4e21hcmdpbi1yaWdodDo4cHghaW1wb3J0YW50fS5tYXQtZm9ybS1maWVsZC1zdWZmaXh7bWFyZ2luLWxlZnQ6OHB4IWltcG9ydGFudH0ubWF0LWVsZXZhdGlvbi16MHtib3gtc2hhZG93OjAgMCAwIDAgcmdiYSgwLDAsMCwuMiksMCAwIDAgMCByZ2JhKDAsMCwwLC4xNCksMCAwIDAgMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejF7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoye2JveC1zaGFkb3c6MCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16M3tib3gtc2hhZG93OjAgM3B4IDNweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgM3B4IDRweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejR7Ym94LXNoYWRvdzowIDJweCA0cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDRweCA1cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMTBweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NXtib3gtc2hhZG93OjAgM3B4IDVweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNXB4IDhweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxNHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo2e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA2cHggMTBweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxOHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo3e2JveC1zaGFkb3c6MCA0cHggNXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCA3cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgMnB4IDE2cHggMXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OHtib3gtc2hhZG93OjAgNXB4IDVweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOHB4IDEwcHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNHB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejl7Ym94LXNoYWRvdzowIDVweCA2cHggLTNweCByZ2JhKDAsMCwwLC4yKSwwIDlweCAxMnB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAzcHggMTZweCAycHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMHtib3gtc2hhZG93OjAgNnB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgMTBweCAxNHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMThweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMXtib3gtc2hhZG93OjAgNnB4IDdweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTFweCAxNXB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMjBweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMntib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTJweCAxN3B4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjJweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxM3tib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTNweCAxOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjRweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNHtib3gtc2hhZG93OjAgN3B4IDlweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTRweCAyMXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjZweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNXtib3gtc2hhZG93OjAgOHB4IDlweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTVweCAyMnB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMjhweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNntib3gtc2hhZG93OjAgOHB4IDEwcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE2cHggMjRweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMwcHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTd7Ym94LXNoYWRvdzowIDhweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxN3B4IDI2cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAzMnB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE4e2JveC1zaGFkb3c6MCA5cHggMTFweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMThweCAyOHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzRweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxOXtib3gtc2hhZG93OjAgOXB4IDEycHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDE5cHggMjlweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgN3B4IDM2cHggNnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjB7Ym94LXNoYWRvdzowIDEwcHggMTNweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjBweCAzMXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggMzhweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMXtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMXB4IDMzcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCA0MHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIye2JveC1zaGFkb3c6MCAxMHB4IDE0cHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIycHggMzVweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQycHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjN7Ym94LXNoYWRvdzowIDExcHggMTRweCAtN3B4IHJnYmEoMCwwLDAsLjIpLDAgMjNweCAzNnB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA5cHggNDRweCA4cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyNHtib3gtc2hhZG93OjAgMTFweCAxNXB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyNHB4IDM4cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NnB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1iYWRnZS1zbWFsbCAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjZweH0ubWF0LWJhZGdlLWxhcmdlIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6MjRweH0ubWF0LWgxLC5tYXQtaGVhZGxpbmUsLm1hdC10eXBvZ3JhcGh5IGgxe2ZvbnQ6NDAwIDI0cHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDIsLm1hdC10aXRsZSwubWF0LXR5cG9ncmFwaHkgaDJ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMywubWF0LXN1YmhlYWRpbmctMiwubWF0LXR5cG9ncmFwaHkgaDN7Zm9udDo0MDAgMTZweC8yOHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNCwubWF0LXN1YmhlYWRpbmctMSwubWF0LXR5cG9ncmFwaHkgaDR7Zm9udDo0MDAgMTVweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgaDV7Zm9udDo0MDAgMTEuNjJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgaDZ7Zm9udDo0MDAgOS4zOHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWJvZHktMiwubWF0LWJvZHktc3Ryb25ne2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5LC5tYXQtYm9keS0xLC5tYXQtdHlwb2dyYXBoeXtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSBwLC5tYXQtYm9keS0xIHAsLm1hdC10eXBvZ3JhcGh5IHB7bWFyZ2luOjAgMCAxMnB4fS5tYXQtY2FwdGlvbiwubWF0LXNtYWxse2ZvbnQ6NDAwIDEycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1kaXNwbGF5LTQsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS00e2ZvbnQ6MzAwIDExMnB4LzExMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDU2cHg7bGV0dGVyLXNwYWNpbmc6LS4wNWVtfS5tYXQtZGlzcGxheS0zLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktM3tmb250OjQwMCA1NnB4LzU2cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAyZW19Lm1hdC1kaXNwbGF5LTIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ye2ZvbnQ6NDAwIDQ1cHgvNDhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDA1ZW19Lm1hdC1kaXNwbGF5LTEsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0xe2ZvbnQ6NDAwIDM0cHgvNDBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4fS5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtZmxhdC1idXR0b24sLm1hdC1pY29uLWJ1dHRvbiwubWF0LW1pbmktZmFiLC5tYXQtcmFpc2VkLWJ1dHRvbiwubWF0LXN0cm9rZWQtYnV0dG9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1idXR0b24tdG9nZ2xlLC5tYXQtY2FyZHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWNhcmQtY29udGVudCwubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZSwubWF0LWNhcmQtc3VidGl0bGV7Zm9udC1zaXplOjE0cHh9Lm1hdC1jaGVja2JveHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jaGVja2JveC1sYXlvdXQgLm1hdC1jaGVja2JveC1sYWJlbHtsaW5lLWhlaWdodDoyNHB4fS5tYXQtY2hpcHtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDoxOHB4fS5tYXQtY2hpcCAubWF0LWNoaXAtcmVtb3ZlLm1hdC1pY29uLC5tYXQtY2hpcCAubWF0LWNoaXAtdHJhaWxpbmctaWNvbi5tYXQtaWNvbntmb250LXNpemU6MThweH0ubWF0LXRhYmxle2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWhlYWRlci1jZWxse2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNlbGwsLm1hdC1mb290ZXItY2VsbHtmb250LXNpemU6MTRweH0ubWF0LWNhbGVuZGFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhbGVuZGFyLWJvZHl7Zm9udC1zaXplOjEzcHh9Lm1hdC1jYWxlbmRhci1ib2R5LWxhYmVsLC5tYXQtY2FsZW5kYXItcGVyaW9kLWJ1dHRvbntmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXIgdGh7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtZGlhbG9nLXRpdGxle2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTVweDtmb250LXdlaWdodDo0MDB9Lm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlO2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjEyNTtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29ue2ZvbnQtc2l6ZToxNTAlO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b257aGVpZ2h0OjEuNWVtO3dpZHRoOjEuNWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbntoZWlnaHQ6MS4xMjVlbTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNWVtIDA7Ym9yZGVyLXRvcDouODQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudH0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlcnt0b3A6LS44NDM3NWVtO3BhZGRpbmctdG9wOi44NDM3NWVtfS5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7Zm9udC1zaXplOjc1JTttYXJnaW4tdG9wOi42NjY2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjc5MTY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi40Mzc1ZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbDotd2Via2l0LWF1dG9maWxsKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIzZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM1JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjI4MTI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye21hcmdpbi10b3A6LjU0MTY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNjY2NjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouMjVlbSAwIC43NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjA5Mzc1ZW07bWFyZ2luLXRvcDotLjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6MWVtIDB9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtb3V0bGluZXtib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjg0Mzc1ZW07bWFyZ2luLXRvcDotLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyLC5tYXQtZ3JpZC10aWxlLWhlYWRlcntmb250LXNpemU6MTRweH0ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lLC5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTJweH1pbnB1dC5tYXQtaW5wdXQtZWxlbWVudHttYXJnaW4tdG9wOi0uMDYyNWVtfS5tYXQtbWVudS1pdGVte2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo0MDB9Lm1hdC1wYWdpbmF0b3IsLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4fS5tYXQtcmFkaW8tYnV0dG9uLC5tYXQtc2VsZWN0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNlbGVjdC10cmlnZ2Vye2hlaWdodDoxLjEyNWVtfS5tYXQtc2xpZGUtdG9nZ2xlLWNvbnRlbnR7Zm9udDo0MDAgMTRweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0e2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtmb250LXdlaWdodDo1MDB9Lm1hdC1zdGVwcGVyLWhvcml6b250YWwsLm1hdC1zdGVwcGVyLXZlcnRpY2Fse2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LXN0ZXAtbGFiZWx7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtc3RlcC1sYWJlbC1zZWxlY3RlZHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC10YWItZ3JvdXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdGFiLWxhYmVsLC5tYXQtdGFiLWxpbmt7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRvb2xiYXIsLm1hdC10b29sYmFyIGgxLC5tYXQtdG9vbGJhciBoMiwubWF0LXRvb2xiYXIgaDMsLm1hdC10b29sYmFyIGg0LC5tYXQtdG9vbGJhciBoNSwubWF0LXRvb2xiYXIgaDZ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MH0ubWF0LXRvb2x0aXB7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjZweDtwYWRkaW5nLWJvdHRvbTo2cHh9Lm1hdC10b29sdGlwLWhhbmRzZXR7Zm9udC1zaXplOjE0cHg7cGFkZGluZy10b3A6OXB4O3BhZGRpbmctYm90dG9tOjlweH0ubWF0LWxpc3QtaXRlbSwubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWxpc3QgLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTZweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxNHB4fS5tYXQtbGlzdCAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVte2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbntmb250LXNpemU6MTJweH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5le3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpcztkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubWF0LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1zdWJoZWFkZXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LW9wdGlvbntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHh9Lm1hdC1vcHRncm91cC1sYWJlbHtmb250OjUwMCAxNHB4LzI0cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2ltcGxlLXNuYWNrYmFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweH0ubWF0LXNpbXBsZS1zbmFja2Jhci1hY3Rpb257bGluZS1oZWlnaHQ6MTtmb250LWZhbWlseTppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRyZWV7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtdHJlZS1ub2Rle2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTRweH0ubWF0LXJpcHBsZXtvdmVyZmxvdzpoaWRkZW59QG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OmFjdGl2ZSl7Lm1hdC1yaXBwbGV7ZGlzcGxheTpub25lfX0ubWF0LXJpcHBsZS5tYXQtcmlwcGxlLXVuYm91bmRlZHtvdmVyZmxvdzp2aXNpYmxlfS5tYXQtcmlwcGxlLWVsZW1lbnR7cG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyLXJhZGl1czo1MCU7cG9pbnRlci1ldmVudHM6bm9uZTt0cmFuc2l0aW9uOm9wYWNpdHksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7dHJhbnNpdGlvbjpvcGFjaXR5LHRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpLC13ZWJraXQtdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfS5jZGstdmlzdWFsbHktaGlkZGVue2JvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O21hcmdpbjotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MXB4O291dGxpbmU6MDstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXIsLmNkay1vdmVybGF5LWNvbnRhaW5lcntwb2ludGVyLWV2ZW50czpub25lO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1jb250YWluZXI6ZW1wdHl7ZGlzcGxheTpub25lfS5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlcntkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDAwfS5jZGstb3ZlcmxheS1wYW5le3Bvc2l0aW9uOmFic29sdXRlO3BvaW50ZXItZXZlbnRzOmF1dG87Ym94LXNpemluZzpib3JkZXItYm94O3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7bWF4LXdpZHRoOjEwMCU7bWF4LWhlaWdodDoxMDAlfS5jZGstb3ZlcmxheS1iYWNrZHJvcHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDt6LWluZGV4OjEwMDA7cG9pbnRlci1ldmVudHM6YXV0bzstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7dHJhbnNpdGlvbjpvcGFjaXR5IC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtvcGFjaXR5OjB9LmNkay1vdmVybGF5LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eToxfUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6LjZ9fS5jZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9we2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMjg4KX0uY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AsLmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmd7b3BhY2l0eTowfS5jZGstb3ZlcmxheS1jb25uZWN0ZWQtcG9zaXRpb24tYm91bmRpbmctYm94e3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwMDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21pbi13aWR0aDoxcHg7bWluLWhlaWdodDoxcHh9LmNkay1nbG9iYWwtc2Nyb2xsYmxvY2t7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtvdmVyZmxvdy15OnNjcm9sbH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOi13ZWJraXQtYXV0b2ZpbGx7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydDthbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydH0uY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOm5vdCg6LXdlYmtpdC1hdXRvZmlsbCl7LXdlYmtpdC1hbmltYXRpb24tbmFtZTpjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kfXRleHRhcmVhLmNkay10ZXh0YXJlYS1hdXRvc2l6ZXtyZXNpemU6bm9uZX10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5ne2hlaWdodDphdXRvIWltcG9ydGFudDtvdmVyZmxvdzpoaWRkZW4haW1wb3J0YW50O3BhZGRpbmc6MnB4IDAhaW1wb3J0YW50O2JveC1zaXppbmc6Y29udGVudC1ib3ghaW1wb3J0YW50fS5oaXN0b3J5LWNvbnRhaW5lcnttYXJnaW46MS41ZW0gMH0uaGlzdG9yeS1jb250YWluZXIubGltaXRlZC1oZWlnaHR7b3ZlcmZsb3cteTphdXRvfS5oaXN0b3J5LWNvbnRhaW5lciAuaGlzdG9yeS1pdGVtOm5vdCg6bGFzdC1jaGlsZCl7cG9zaXRpb246cmVsYXRpdmV9Lmhpc3RvcnktY29udGFpbmVyIC5oaXN0b3J5LWl0ZW06bm90KDpsYXN0LWNoaWxkKTo6YmVmb3Jle2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6M2VtO3dpZHRoOjJweDtiYWNrZ3JvdW5kLWNvbG9yOiM5MTk3OWM7bGVmdDoxMXB4O3RvcDoxNHB4fS5oaXN0b3J5LWNvbnRhaW5lciAuaGlzdG9yeS1pdGVtIC5zbWFsbGVyLWljb257Zm9udC1zaXplOjE2cHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7bWFyZ2luLXRvcDoycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RlcHNMaXN0Q29tcG9uZW50IHtcblxuICBASW5wdXQoKSBpY29uID0gJ2hpc3RvcnknO1xuXG4gIEBJbnB1dCgpIHRpdGxlID0gJyc7XG5cbiAgQElucHV0KCkgc2hvd1RpbWU6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbWF4SGVpZ2h0O1xuXG4gIEBJbnB1dCgpIHN0ZXBzTGlzdDogU3RlcFtdID0gW107XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjU3RlcHNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc3RlcHMtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNTdGVwc0xpc3RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRGVjU3RlcHNMaXN0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RlcHNMaXN0TW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIGZvcndhcmRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc3RyaW5nLWFycmF5LWlucHV0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtb2RlID09ICdpbnB1dCdcIj5cblxuICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgWyhuZ01vZGVsKV09XCJ2YWx1ZUFzU3RyaW5nXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cblxuICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgPHRleHRhcmVhIG1hdElucHV0XG4gICAgW3Jvd3NdPVwicm93c1wiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgWyhuZ01vZGVsKV09XCJ2YWx1ZUFzU3RyaW5nXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgICA8L3RleHRhcmVhPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY1N0cmluZ0FycmF5SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIG5hbWU7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI7XG5cbiAgQElucHV0KCkgbW9kZSA9ICd0ZXh0YXJlYSc7XG5cbiAgQElucHV0KCkgcm93cyA9IDM7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZ1tdIHtcblxuICAgIHJldHVybiB0aGlzLmlubmVyQXJyYXk7XG5cbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IHN0cmluZ1tdKSB7XG5cbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lckFycmF5KSB7XG5cbiAgICAgIHRoaXMuaW5uZXJBcnJheSA9IHY7XG5cbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IHZhbHVlQXNTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLmdldEFycmF5QXNTdHJpbmcoKTtcblxuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWVBc1N0cmluZyh2OiBzdHJpbmcpIHtcblxuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyQXJyYXkpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RyaW5nVG9BcnJheSh2KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lckFycmF5OiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIC8vXG4gIGdldEFycmF5QXNTdHJpbmcoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5hcnJheVRvU3RyaW5nKHRoaXMudmFsdWUpO1xuXG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmdbXSkge1xuXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgIH1cblxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdHJpbmdUb0FycmF5KHN0cmluZ09mQXJyYXk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBpZiAoc3RyaW5nT2ZBcnJheSkge1xuXG4gICAgICBjb25zdCByZWdFeHAgPSAvW14sXFxzXVteLFxcc10qW14sXFxzXSovZztcblxuICAgICAgcmV0dXJuIHN0cmluZ09mQXJyYXkubWF0Y2gocmVnRXhwKTtcblxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXJyYXlUb1N0cmluZyhhcnJheU9mc3RyaW5nOiBzdHJpbmdbXSk6IHN0cmluZyB7XG5cbiAgICBpZiAoYXJyYXlPZnN0cmluZykge1xuXG4gICAgICByZXR1cm4gYXJyYXlPZnN0cmluZy5qb2luKCcsICcpO1xuXG4gICAgfVxuXG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtc3RyaW5nLWFycmF5LWlucHV0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNTdHJpbmdBcnJheUlucHV0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVjU3RyaW5nQXJyYXlJbnB1dE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXRhYicsXG4gIHRlbXBsYXRlOiBgYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRvdGFsOiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgY29udGVudDogVGVtcGxhdGVSZWY8RGVjVGFiQ29tcG9uZW50PjtcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZW5zdXJlVGFiTmFtZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVUYWJOYW1lID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlY1RhYkNvbXBvbmVudEVycm9yOiBUaGUgPGRlYy10YWI+IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50LicpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy10YWItbWVudScsXG4gIHRlbXBsYXRlOiBgPHA+XG4gIHRhYi1tZW51IHdvcmtzIVxuPC9wPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYk1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGFjdGl2ZVRhYjogc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPERlY1RhYk1lbnVDb21wb25lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi90YWIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1RhYk1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RhYi1tZW51L3RhYi1tZW51LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy10YWJzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiIWhpZGRlblwiPlxuXG4gIDwhLS0gVEFCUyAtLT5cbiAgPG1hdC10YWItZ3JvdXAgW3NlbGVjdGVkSW5kZXhdPVwiYWN0aXZlVGFiSW5kZXhcIiAoZm9jdXNDaGFuZ2UpPVwib25DaGFuZ2VUYWIoJGV2ZW50KVwiIFtkeW5hbWljSGVpZ2h0XT1cInRydWVcIj5cblxuICAgIDwhLS0gVEFCIC0tPlxuICAgIDxtYXQtdGFiICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFicztcIiBbZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCI+XG5cbiAgICAgIDwhLS0gVEFCIExBQkVMIC0tPlxuICAgICAgPG5nLXRlbXBsYXRlIG1hdC10YWItbGFiZWw+XG4gICAgICAgIHt7IHRhYi5sYWJlbCB9fVxuICAgICAgICA8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2Utc21hbGxcIiAqbmdJZj1cInRhYi50b3RhbCA+PSAwXCI+e3sgcGFyc2VUb3RhbCh0YWIudG90YWwpIH19PC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPCEtLSBUQUIgQ09OVEVOVCBXUkFQUEVSIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3VsVGFiQmVEaXNwbGF5ZWQodGFiKVwiPlxuXG4gICAgICAgIDwhLS0gVEFCIE1FTlUgLS0+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0YWJNZW51Q29tcG9uZW50XCIgY2xhc3M9XCJtZW51LXdyYXBwZXJcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiTWVudUNvbXBvbmVudC5jb250ZW50OyBjb250ZXh0OiB7IGFjdGl2ZVRhYjogYWN0aXZlVGFiIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBUQUJTIENPTlRFTlQgLS0+XG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd0YWItcGFkZGluZyc6IHBhZGRpbmd9XCI+XG5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8L21hdC10YWI+XG5cbiAgPC9tYXQtdGFiLWdyb3VwPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubWVudS13cmFwcGVye3RleHQtYWxpZ246cmlnaHQ7cGFkZGluZzo4cHggMH0udGFiLXBhZGRpbmd7cGFkZGluZzoxNnB4IDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBAQ29udGVudENoaWxkcmVuKERlY1RhYkNvbXBvbmVudCkgdGFiczogUXVlcnlMaXN0PERlY1RhYkNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZChEZWNUYWJNZW51Q29tcG9uZW50KSB0YWJNZW51Q29tcG9uZW50OiBEZWNUYWJNZW51Q29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIGhpZGRlbjsgLy8gaGlkZXMgdGhlIHRhYnMgZ3JvdXAgdG8gcmVsb2FkIGl0cyBjb250ZW50c1xuXG4gIEBJbnB1dCgpIHBlcnNpc3QgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkJsdXIgPSBmYWxzZTtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGFkZGluZyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IGFjdGl2ZVRhYih2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAmJiB0aGlzLl9hY3RpdmVUYWIgIT09IHYpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IHY7XG4gICAgICB0aGlzLnBlcnNpc3RUYWIodik7XG4gICAgfVxuICB9XG4gIGdldCBhY3RpdmVUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYjtcbiAgfVxuXG4gIEBPdXRwdXQoKSBhY3RpdmVUYWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgZ2V0IGFjdGl2ZVRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYkluZGV4O1xuICB9XG5cbiAgZ2V0IGFjdGl2ZVRhYk9iamVjdCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVUYWJPYmplY3Q7XG4gIH1cblxuICBwcml2YXRlIF9hY3RpdmVUYWI6IHN0cmluZztcblxuICBwcml2YXRlIF9hY3RpdmVUYWJJbmRleDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYk9iamVjdDogYW55O1xuXG4gIHByaXZhdGUgYWN0aXZhdGVkVGFiczogYW55ID0ge307XG5cbiAgcHJpdmF0ZSBxdWVyeVBhcmFtc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgcGF0aEZyb21Sb290ID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5lbnN1cmVVbmlxdWVOYW1lKCk7XG4gICAgdGhpcy53YXRjaFRhYkluVXJsUXVlcnkoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZVRhYk5hbWVzKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG4gICAgICBpZiAocXVlcnlQYXJhbXMgJiYgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUYWIgPSBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV07XG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKGN1cnJlbnRUYWIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGFydFNlbGVjdGVkVGFiKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgc2hvdWxUYWJCZURpc3BsYXllZCh0YWIpIHtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gdGhpcy5fYWN0aXZlVGFiT2JqZWN0ID09PSB0YWI7XG4gICAgY29uc3QgaXNBY3RpdmF0ZWQgPSB0aGlzLmFjdGl2YXRlZFRhYnNbdGFiLm5hbWVdO1xuICAgIHJldHVybiBpc1NlbGVjdGVkIHx8ICghdGhpcy5kZXN0cm95T25CbHVyICYmIGlzQWN0aXZhdGVkKTtcbiAgfVxuXG4gIG9uQ2hhbmdlVGFiKCRldmVudCkge1xuICAgIGNvbnN0IGFjdGl2ZVRhYk9iamVjdCA9IHRoaXMudGFicy50b0FycmF5KClbJGV2ZW50LmluZGV4XTtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IGFjdGl2ZVRhYk9iamVjdC5uYW1lO1xuICB9XG5cbiAgcGFyc2VUb3RhbCh0b3RhbCkge1xuXG4gICAgcmV0dXJuIHRvdGFsICE9PSBudWxsICYmIHRvdGFsID49IDAgPyAgdG90YWwgOiAnPyc7XG5cbiAgfVxuXG4gIHJlc2V0KCkge1xuXG4gICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG5cbiAgICB9LCAxMCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgY29tcG9uZW50VGFiTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy10YWInO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVOYW1lID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlY1RhYkNvbXBvbmVudEVycm9yOiBUaGUgdGFiIGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGVuc3VyZVVuaXF1ZVRhYk5hbWVzXG4gICAqIFRoaXMgbWV0aG9kIHByZXZlbnRzIHRoZSB1c2Ugb2YgdGhlIHNhbWUgbmFtZSBmb3IgbW9yZSB0aGFuIG9uZSB0YWJcbiAgICogd2hhdCB3b3VsZCBlbmRpbmcgdXAgY29uZmxpY3RpbmcgdGhlIHRhYnMgYWN0aXZhdGlvbiBvbmNlIHRoaXMgaXMgZG9uZSB2aWEgdGFiIG5hbWVcbiAgKi9cblxuICBwcml2YXRlIGVuc3VyZVVuaXF1ZVRhYk5hbWVzID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXMsIHJlaikgPT4ge1xuICAgICAgY29uc3QgbmFtZXMgPSB7fTtcbiAgICAgIHRoaXMudGFicy50b0FycmF5KCkuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgICBpZiAoIW5hbWVzW3RhYi5uYW1lXSkge1xuICAgICAgICAgIG5hbWVzW3RhYi5uYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSA8ZGVjLXRhYnM+IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFRoZSBuYW1lICR7dGFiLm5hbWV9IHdhcyB1c2VkIG1vcmUgdGhhbiBvbmNlLmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJzaXN0VGFiKHRhYikge1xuICAgIGlmICh0aGlzLnBlcnNpc3QpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgICAgIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXSA9IHRhYjtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLiddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcywgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdFRhYiA9ICh0YWJOYW1lKSA9PiB7XG4gICAgaWYgKHRoaXMudGFicykge1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWJOYW1lO1xuICAgICAgdGhpcy5hY3RpdmF0ZWRUYWJzW3RhYk5hbWVdID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYk9iamVjdCA9IHRoaXMudGFicy50b0FycmF5KCkuZmlsdGVyKHRhYiA9PiB0YWIubmFtZSA9PT0gdGFiTmFtZSlbMF07XG4gICAgICB0aGlzLl9hY3RpdmVUYWJJbmRleCA9IHRoaXMudGFicy50b0FycmF5KCkuaW5kZXhPZih0aGlzLl9hY3RpdmVUYWJPYmplY3QpO1xuICAgICAgdGhpcy5hY3RpdmVUYWJDaGFuZ2UuZW1pdCh0YWJOYW1lKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0U2VsZWN0ZWRUYWIoKSB7XG4gICAgY29uc3QgYWN0aXZlVGFiID0gdGhpcy5hY3RpdmVUYWIgfHwgdGhpcy50YWJzLnRvQXJyYXkoKVswXS5uYW1lO1xuICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBhdm9pZCBjaGFuZ2UgYWZ0ZXIgY29tcG9uZW50IGNoZWNrZWQgZXJyb3JcbiAgICAgIHRoaXMuc2VsZWN0VGFiKGFjdGl2ZVRhYik7XG4gICAgfSwgMSk7XG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFiSW5VcmxRdWVyeSgpIHtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtc1xuICAgIC5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuICAgICAgY29uc3QgdGFiOiBzdHJpbmcgPSBwYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldO1xuICAgICAgdGhpcy5zZWxlY3RUYWIodGFiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpIHtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RlY1RhYkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEZWNUYWJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBEZWNUYWJNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNUYWJzQ29tcG9uZW50IH0gZnJvbSAnLi90YWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNUYWJNb2R1bGUgfSBmcm9tICcuL3RhYi90YWIubW9kdWxlJztcbmltcG9ydCB7IERlY1RhYk1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RhYi1tZW51L3RhYi1tZW51LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBEZWNUYWJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRGVjVGFic0NvbXBvbmVudCwgRGVjVGFiTWVudUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNUYWJzQ29tcG9uZW50LFxuICAgIERlY1RhYk1lbnVDb21wb25lbnQsXG4gICAgRGVjVGFiTW9kdWxlXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYnNNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFdmVudFR5cGUsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBVcGxvYWRQcm9ncmVzcyB9IGZyb20gJy4vdXBsb2FkLm1vZGVscyc7XG5cbmNvbnN0IFVQTE9BRF9FTkRQT0lOVCA9ICcvdXBsb2FkJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5leHBvcnQgY29uc3QgREVDX1VQTE9BRF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNVcGxvYWRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXVwbG9hZCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiKHByb2dyZXNzZXMgJiYgcHJvZ3Jlc3Nlcy5sZW5ndGgpID8gdHJ1ZSA6IGZhbHNlXCI+XG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgPHNwYW4gKGNsaWNrKT1cIm9wZW5GaWxlU2VsZWN0aW9uKClcIiBjbGFzcz1cImNsaWNrXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHVwbG9hZFByb2dyZXNzIG9mIHByb2dyZXNzZXNcIiBjbGFzcz1cImRlYy11cGxvYWQtcHJvZ3Jlc3Mtd3JhcHBlclwiPlxuICAgICAgPG1hdC1wcm9ncmVzcy1iYXJcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgW21vZGVdPVwiZ2V0UHJvZ3Jlc3NiYXJNb2RlKHVwbG9hZFByb2dyZXNzKVwiXG4gICAgICAgIFt2YWx1ZV09XCJnZXRQcm9ncmVzc1ZhbHVlQmFzZWRPbk1vZGUodXBsb2FkUHJvZ3Jlc3MpXCI+XG4gICAgICA8L21hdC1wcm9ncmVzcy1iYXI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgPHNtYWxsPlxuICAgICAgICAgIHt7IHVwbG9hZFByb2dyZXNzLnZhbHVlIH19JSAtIHt7IHVwbG9hZFByb2dyZXNzLmZpbGVOYW1lIH19XG4gICAgICAgIDwvc21hbGw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cblxuXG48aW5wdXQgdHlwZT1cImZpbGVcIiAjaW5wdXRGaWxlIChjaGFuZ2UpPVwiZmlsZXNDaGFuZ2VkKCRldmVudClcIiBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cblxuYCxcbiAgc3R5bGVzOiBbYC5jbGlja3tjdXJzb3I6cG9pbnRlcn1pbnB1dHtkaXNwbGF5Om5vbmV9LnRleHQtY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5kZWMtdXBsb2FkLXByb2dyZXNzLXdyYXBwZXJ7cGFkZGluZzo4cHggMH1gXSxcbiAgcHJvdmlkZXJzOiBbREVDX1VQTE9BRF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgcHJvZ3Jlc3NlczogVXBsb2FkUHJvZ3Jlc3NbXSA9IFtdO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdXBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpIHByb2dyZXNzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0RmlsZScpIGlucHV0RmlsZTogRWxlbWVudFJlZjtcblxuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55W107XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZSkge31cblxuICAvKlxuICAqKiBuZ01vZGVsIFZBTFVFXG4gICovXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2OiBhbnlbXSkge1xuICAgIHRoaXMudmFsdWUgPSB2O1xuICB9XG5cblxuICBmaWxlc0NoYW5nZWQoZXZlbnQpIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGV2ZW50LnRhcmdldC5maWxlcy5sZW5ndGg7IHgrKykge1xuICAgICAgdGhpcy51cGxvYWRGaWxlKGV2ZW50LnRhcmdldC5maWxlc1t4XSwgeCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkZpbGVTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5pbnB1dEZpbGUubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG5cbiAgZ2V0UHJvZ3Jlc3NiYXJNb2RlKHByb2dyZXNzKSB7XG5cbiAgICBsZXQgbW9kZTtcblxuICAgIHN3aXRjaCAocHJvZ3Jlc3MudmFsdWUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbW9kZSA9ICdidWZmZXInO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTAwOlxuICAgICAgICBtb2RlID0gJ2luZGV0ZXJtaW5hdGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gbW9kZTtcblxuICB9XG5cbiAgZ2V0UHJvZ3Jlc3NWYWx1ZUJhc2VkT25Nb2RlKHByb2dyZXNzKSB7XG4gICAgY29uc3QgbW9kZSA9IHRoaXMuZ2V0UHJvZ3Jlc3NiYXJNb2RlKHByb2dyZXNzKTtcbiAgICBjb25zdCB2YWx1ZSA9IG1vZGUgPT09ICdidWZmZXInID8gMCA6IHByb2dyZXNzLnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBsb2FkRmlsZShmaWxlLCBpbmRleCkge1xuICAgIGlmIChmaWxlKSB7XG4gICAgICBjb25zdCBwcm9ncmVzczogVXBsb2FkUHJvZ3Jlc3MgPSB7XG4gICAgICAgIGZpbGVJbmRleDogaW5kZXgsXG4gICAgICAgIGZpbGVOYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgIHZhbHVlOiAwLFxuICAgICAgfTtcbiAgICAgIHRoaXMucHJvZ3Jlc3Nlcy5wdXNoKHByb2dyZXNzKTtcbiAgICAgIHRoaXMuc2VydmljZS51cGxvYWQoVVBMT0FEX0VORFBPSU5ULCBbZmlsZV0pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjYXRjaEVycm9yJywgZXJyb3IpO1xuICAgICAgICAgIHByb2dyZXNzLmVycm9yID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoJ21lc3NhZ2UuZXJyb3IudW5leHBlY3RlZCcpO1xuICAgICAgICAgIHRoaXMuZGV0ZWN0VXBsb2FkRW5kKCk7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgICBjb25zdCBwZXJjZW50RG9uZSA9IE1hdGgucm91bmQoKDEwMCAqIGV2ZW50LmxvYWRlZCkgLyBldmVudC50b3RhbCk7XG4gICAgICAgICAgcHJvZ3Jlc3MudmFsdWUgPSBwZXJjZW50RG9uZSA9PT0gMTAwID8gcGVyY2VudERvbmUgOiBwYXJzZUZsb2F0KHBlcmNlbnREb25lLnRvRml4ZWQoMikpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgcHJvZ3Jlc3MudmFsdWUgPSAxMDA7XG4gICAgICAgICAgcHJvZ3Jlc3MuZmlsZSA9IGV2ZW50LmJvZHk7XG4gICAgICAgICAgdGhpcy5kZXRlY3RVcGxvYWRFbmQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb2dyZXNzLmVtaXQodGhpcy5wcm9ncmVzc2VzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0VXBsb2FkRW5kKCkge1xuXG4gICAgY29uc3Qgc3RpbGxVcGxvYWRpbmcgPSB0aGlzLnByb2dyZXNzZXMuZmlsdGVyKChwcm9ncmVzcykgPT4ge1xuICAgICAgcmV0dXJuIHByb2dyZXNzLnZhbHVlIDwgMTAwO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzdGlsbFVwbG9hZGluZy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZW1pdFVwbG9hZGVkRmlsZXMoKTtcbiAgICAgIHRoaXMuY2xlYXJJbnB1dEZpbGUoKTtcbiAgICAgIHRoaXMuY2xlYXJQcm9ncmVzc2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcklucHV0RmlsZSgpIHtcbiAgICB0aGlzLmlucHV0RmlsZS5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyUHJvZ3Jlc3NlcygpIHtcbiAgICB0aGlzLnByb2dyZXNzZXMgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdFVwbG9hZGVkRmlsZXMoKSB7XG4gICAgY29uc3QgZmlsZXMgPSB0aGlzLnByb2dyZXNzZXMubWFwKCh1cGxvYWRQcm9ncmVzczogVXBsb2FkUHJvZ3Jlc3MpID0+IHtcbiAgICAgIHJldHVybiB1cGxvYWRQcm9ncmVzcy5maWxlO1xuICAgIH0pO1xuICAgIHRoaXMudmFsdWUgPSBbLi4uZmlsZXNdO1xuICAgIHRoaXMudXBsb2FkZWQuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY1NuYWNrQmFyU2VydmljZSB9IGZyb20gJy4vZGVjLXNuYWNrLWJhci5zZXJ2aWNlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1NuYWNrQmFyU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NuYWNrQmFyTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NuYWNrQmFyTW9kdWxlIH0gZnJvbSAnLi8uLi9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5tb2R1bGUnO1xuaW1wb3J0IHsgRGVjU25hY2tCYXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zbmFjay1iYXIvZGVjLXNuYWNrLWJhci5zZXJ2aWNlJztcbmltcG9ydCB7IFNlcnZpY2VDb25maWcgfSBmcm9tICcuL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vZGVjb3JhLWFwaS5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IERFQ09SQV9BUElfU0VSVklDRV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48U2VydmljZUNvbmZpZz4oJ0RFQ09SQV9BUElfU0VSVklDRV9DT05GSUcnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEluaXREZWNBcGlTZXJ2aWNlKGh0dHA6IEh0dHBDbGllbnQsIHNuYWNrYmFyOiBEZWNTbmFja0JhclNlcnZpY2UsIHNlcnZpY2VDb25maWc6IFNlcnZpY2VDb25maWcpIHtcbiAgcmV0dXJuIG5ldyBEZWNBcGlTZXJ2aWNlKGh0dHAsIHNuYWNrYmFyLCBzZXJ2aWNlQ29uZmlnKTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIERlY1NuYWNrQmFyTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXBpTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBTZXJ2aWNlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEZWNBcGlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IERFQ09SQV9BUElfU0VSVklDRV9DT05GSUcsIHVzZVZhbHVlOiBjb25maWd9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRGVjQXBpU2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBJbml0RGVjQXBpU2VydmljZSxcbiAgICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgRGVjU25hY2tCYXJTZXJ2aWNlLCBERUNPUkFfQVBJX1NFUlZJQ0VfQ09ORklHXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY1VwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vdXBsb2FkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNBcGlNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgRGVjQXBpTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWNVcGxvYWRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIERlY1VwbG9hZENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1VwbG9hZE1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQsIENhbkxvYWQsIFJvdXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWNBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5Mb2FkLCBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNvcmFBcGk6IERlY0FwaVNlcnZpY2VcbiAgKSB7fVxuXG4gIGNhbkxvYWQocm91dGU6IFJvdXRlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlQ2hpbGQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNBdXRoZW50aWNhdGVkKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQXV0aGVudGljYXRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5kZWNvcmFBcGkuZmV0Y2hDdXJyZW50TG9nZ2VkVXNlcigpXG4gICAgLnBpcGUoXG4gICAgICBtYXAoKHVzZXI6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gKHVzZXIgJiYgdXNlci5pZCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9KVxuICAgICkgYXMgT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERlY0F1dGhHdWFyZCB9IGZyb20gJy4vYXV0aC1ndWFyZC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBEZWNBdXRoR3VhcmRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNHdWFyZE1vZHVsZSB7IH1cbiIsImV4cG9ydCBjbGFzcyBVc2VyQXV0aERhdGEge1xuICBwdWJsaWMgaWQ6IHN0cmluZztcbiAgcHVibGljIGVtYWlsOiBzdHJpbmc7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBjb3VudHJ5OiBzdHJpbmc7XG4gIHB1YmxpYyBjb21wYW55OiBzdHJpbmc7XG4gIHB1YmxpYyByb2xlOiBudW1iZXI7XG4gIHB1YmxpYyBwZXJtaXNzaW9uczogQXJyYXk8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3Rvcih1c2VyOiBhbnkgPSB7fSkge1xuICAgIHRoaXMuaWQgPSB1c2VyLmlkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmVtYWlsID0gdXNlci5lbWFpbCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5uYW1lID0gdXNlci5uYW1lIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvdW50cnkgPSB1c2VyLmNvdW50cnkgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuY29tcGFueSA9IHVzZXIuY29tcGFueSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5yb2xlID0gdXNlci5yb2xlIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBlcm1pc3Npb25zID0gdXNlci5wZXJtaXNzaW9ucyB8fCB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2dpbkRhdGEge1xuICBlbWFpbDogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xuICBrZWVwTG9nZ2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2Vib29rTG9naW5EYXRhIHtcbiAga2VlcExvZ2dlZDogYm9vbGVhbjtcbiAgZmFjZWJvb2tUb2tlbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlcnZpY2VDb25maWcge1xuICBob3N0OiBzdHJpbmc7XG4gIGF1dGhIb3N0Pzogc3RyaW5nO1xuICB1c2VNb2NrQXBpPzogYm9vbGVhbjtcbiAgbW9ja0FwaUhvc3Q/OiBzdHJpbmc7XG59XG5cblxuXG4vKlxuICAqIEZpbHRlckdyb3Vwc1xuICAqXG4gICogYW4gQXJyYXkgb2YgZmlsdGVyIGdyb3VwXG4gICovXG5leHBvcnQgdHlwZSBGaWx0ZXJHcm91cHMgPSBGaWx0ZXJHcm91cFtdO1xuXG4vKlxuICAqIEZpbHRlcnNcbiAgKlxuICAqIGFuIEFycmF5IG9mIGZpbHRlclxuICAqL1xuZXhwb3J0IHR5cGUgRmlsdGVycyA9IEZpbHRlcltdO1xuXG4vKlxuICAqIEZpbHRlckRhdGFcbiAgKlxuICAqIEZpbHRlciBjb25maWd1cmF0aW9uXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckRhdGEge1xuICBlbmRwb2ludDogc3RyaW5nO1xuICBwYXlsb2FkOiBEZWNGaWx0ZXI7XG4gIGNiaz86IEZ1bmN0aW9uO1xuICBjbGVhcj86IGJvb2xlYW47XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNGaWx0ZXIge1xuICBmaWx0ZXJHcm91cHM/OiBGaWx0ZXJHcm91cHM7XG4gIHByb2plY3RWaWV3PzogYW55O1xuICBjb2x1bW5zPzogYW55O1xuICBwYWdlPzogbnVtYmVyO1xuICBsaW1pdD86IG51bWJlcjtcbiAgdGV4dFNlYXJjaD86IHN0cmluZztcbn1cblxuLypcbiAgKiBGaWx0ZXJcbiAgKlxuICAqIEZpbHRlciBjb25maWd1cmF0aW9uXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIFNlcmlhbGl6ZWREZWNGaWx0ZXIge1xuICBmaWx0ZXI/OiBzdHJpbmc7XG4gIHByb2plY3RWaWV3Pzogc3RyaW5nO1xuICBjb2x1bW5zPzogc3RyaW5nO1xuICBwYWdlPzogbnVtYmVyO1xuICBsaW1pdD86IG51bWJlcjtcbiAgdGV4dFNlYXJjaD86IHN0cmluZztcbn1cblxuLypcbiAgKiBGaWx0ZXJcbiAgKlxuICAqIFNpZ25sZSBmaWx0ZXJcbiAgKi9cbmV4cG9ydCBjbGFzcyBGaWx0ZXIge1xuICBwcm9wZXJ0eTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoZGF0YTogYW55ID0ge30pIHtcbiAgICB0aGlzLnByb3BlcnR5ID0gZGF0YS5wcm9wZXJ0eTtcbiAgICB0aGlzLnZhbHVlID0gQXJyYXkuaXNBcnJheShkYXRhLnByb3BlcnR5KSA/IGRhdGEucHJvcGVydHkgOiBbZGF0YS5wcm9wZXJ0eV07XG4gIH1cbn1cblxuLypcbiAgKiBGaWx0ZXJHcm91cFxuICAqXG4gICogR3JvdXAgb2YgRmlsdGVyXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckdyb3VwIHtcbiAgZmlsdGVyczogRmlsdGVycztcbn1cblxuLypcbiAgKiBDb2x1bW5zU29ydENvbmZpZ1xuICAqXG4gICogQ29uZmlndXJhdGlvbiB0byBzb3J0IGNvbHVtbnNcbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uc1NvcnRDb25maWcge1xuICBwcm9wZXJ0eTogc3RyaW5nO1xuICBvcmRlcjoge1xuICAgIHR5cGU6ICdhc2MnIHwgJ2Rlc2MnXG4gIH07XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IENhbkxvYWQsIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkLCBSb3V0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG9mLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGVjUGVybWlzc2lvbkd1YXJkIGltcGxlbWVudHMgQ2FuTG9hZCwgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjb3JhQXBpOiBEZWNBcGlTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cblxuICBjYW5Mb2FkKHJvdXRlOiBSb3V0ZSkge1xuICAgIGlmIChyb3V0ZS5kYXRhICYmICFyb3V0ZS5kYXRhLnBlcm1pc3Npb25zKSB7XG4gICAgICB0aGlzLm5vdEFsbG93ZWQoKTtcbiAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGVybWlzc2lvbnMgPSByb3V0ZS5kYXRhLnBlcm1pc3Npb25zO1xuICAgIHJldHVybiB0aGlzLmhhc0FjY2VzcyhwZXJtaXNzaW9ucyk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcbiAgICBpZiAocm91dGUuZGF0YSAmJiAhcm91dGUuZGF0YS5wZXJtaXNzaW9ucykge1xuICAgICAgdGhpcy5ub3RBbGxvd2VkKCk7XG4gICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcm1pc3Npb25zID0gcm91dGUuZGF0YS5wZXJtaXNzaW9ucztcbiAgICByZXR1cm4gdGhpcy5oYXNBY2Nlc3MocGVybWlzc2lvbnMpO1xuICB9XG5cbiAgY2FuQWN0aXZhdGVDaGlsZChyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcbiAgICByZXR1cm4gdGhpcy5jYW5BY3RpdmF0ZShyb3V0ZSwgc3RhdGUpO1xuICB9XG5cbiAgbm90QWxsb3dlZCgpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9mb3JiaWRlbiddKTtcbiAgfVxuXG4gIGhhc0FjY2VzcyhwZXJtaXNzaW9ucykge1xuICAgIHJldHVybiB0aGlzLmRlY29yYUFwaS51c2VyJFxuICAgIC5waXBlKFxuICAgICAgbWFwKHVzZXIgPT4ge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgIGNvbnN0IGFsbG93ZWQgPSB0aGlzLmlzQWxsb3dlZEFjY2Vzcyh1c2VyLnBlcm1pc3Npb25zLCBwZXJtaXNzaW9ucyk7XG4gICAgICAgICAgaWYgKCFhbGxvd2VkKSB7XG4gICAgICAgICAgICB0aGlzLm5vdEFsbG93ZWQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzQWxsb3dlZEFjY2Vzcyh1c2VyUGVybWlzc2lvbnM6IHN0cmluZ1tdLCBjdXJyZW50UGVybWlzc2lvbnM6IHN0cmluZ1tdKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1hdGNoaW5nUm9sZSA9IGN1cnJlbnRQZXJtaXNzaW9ucy5maW5kKCh1c2VyUm9sZSkgPT4ge1xuICAgICAgICByZXR1cm4gdXNlclBlcm1pc3Npb25zLmZpbmQoKGFsb3dlZFJvbGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gYWxvd2VkUm9sZSA9PT0gdXNlclJvbGU7XG4gICAgICAgIH0pID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWF0Y2hpbmdSb2xlID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjUGVybWlzc2lvbkd1YXJkIH0gZnJvbSAnLi9kZWMtcGVybWlzc2lvbi1ndWFyZC5zZXJ2aWNlJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIERlY1Blcm1pc3Npb25HdWFyZFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1Blcm1pc3Npb25HdWFyZE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3BlbkNvbm5lY3Rpb24gfSBmcm9tICcuL3dzLWNsaWVudC5tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjV3NDbGllbnRTZXJ2aWNlIHtcblxuICBwcml2YXRlIGNvbm5lY3Rpb246IHtcbiAgICBba2V5OiBzdHJpbmddOiBPcGVuQ29ubmVjdGlvblxuICB9ID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGNvbm5lY3QodXJsKSB7XG5cbiAgICBjb25zdCBjb25uZWN0aW9uID0gdGhpcy5jb25uZWN0aW9uW3VybF07XG5cbiAgICBpZiAoY29ubmVjdGlvbikge1xuXG4gICAgICByZXR1cm4gY29ubmVjdGlvbjtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RUb1dzKHVybCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgY29ubmVjdFRvV3ModXJsKTogT3BlbkNvbm5lY3Rpb24ge1xuXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IHRoaXMub3BlbkNvbm5lY3Rpb24odXJsKTtcblxuICAgIHRoaXMuY29ubmVjdGlvblt1cmxdID0gY29ubmVjdGlvbjtcblxuICAgIHJldHVybiBjb25uZWN0aW9uO1xuXG4gIH1cblxuXG4gIHByaXZhdGUgb3BlbkNvbm5lY3Rpb24odXJsOiBzdHJpbmcsIGNvbm5lY3Rpb24/OiBPcGVuQ29ubmVjdGlvbik6IE9wZW5Db25uZWN0aW9uIHtcblxuICAgIGlmIChjb25uZWN0aW9uKSB7XG5cbiAgICAgIGNvbm5lY3Rpb24uY2hhbm5lbCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGNvbm5lY3Rpb24gPSBjb25uZWN0aW9uID8gY29ubmVjdGlvbiA6IHtcbiAgICAgICAgY2hhbm5lbDogbmV3IFdlYlNvY2tldCh1cmwpLFxuICAgICAgICBtZXNzYWdlczogbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pLFxuICAgICAgfTtcblxuICAgIH1cblxuICAgIGNvbm5lY3Rpb24uY2hhbm5lbC5vbmNsb3NlID0gKCkgPT4gdGhpcy5vcGVuQ29ubmVjdGlvbih1cmwsIGNvbm5lY3Rpb24pO1xuXG4gICAgY29ubmVjdGlvbi5jaGFubmVsLm9uZXJyb3IgPSAoKSA9PiB0aGlzLm9wZW5Db25uZWN0aW9uKHVybCwgY29ubmVjdGlvbik7XG5cbiAgICBjb25uZWN0aW9uLmNoYW5uZWwub25tZXNzYWdlID0gKGEpID0+IHtcblxuICAgICAgY29uc3QgY3VycmVudE1lc3NhZ2VzID0gY29ubmVjdGlvbi5tZXNzYWdlcy5nZXRWYWx1ZSgpO1xuXG4gICAgICBjdXJyZW50TWVzc2FnZXMudW5zaGlmdChhLmRhdGEpO1xuXG4gICAgICBjb25uZWN0aW9uLm1lc3NhZ2VzLm5leHQoY3VycmVudE1lc3NhZ2VzKTtcblxuICAgIH07XG5cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGVjV3NDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi93cy1jbGllbnQuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGVjV3NDbGllbnRTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjV3NDbGllbnRNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiZmlsdGVyIiwibm9vcCIsIkFVVE9DT01QTEVURV9ST0xFU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0lBWUUsWUFBbUIsZUFBNEIsRUFDckM7UUFEUyxvQkFBZSxHQUFmLGVBQWUsQ0FBYTtRQUNyQyxjQUFTLEdBQVQsU0FBUztLQUF1Qjs7Ozs7OztJQUUxQyxJQUFJLENBQUMsT0FBZSxFQUFFLElBQWlCLEVBQUUsUUFBUSxHQUFHLEdBQUc7UUFDckQsdUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLHVCQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTtZQUN4QyxRQUFRLEVBQUUsUUFBUTtZQUNsQixVQUFVLEVBQUUsVUFBVTtTQUN2QixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxRQUFRLENBQUMsSUFBaUI7UUFDeEIsUUFBUSxJQUFJO1lBQ1YsS0FBSyxTQUFTO2dCQUNaLE9BQU8sZUFBZSxDQUFDO1lBQ3pCLEtBQUssU0FBUztnQkFDWixPQUFPLGVBQWUsQ0FBQztZQUN6QixLQUFLLE1BQU07Z0JBQ1Qs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QUVMLEtBQUs7MEJBRUwsS0FBSzttQkFFTCxNQUFNOzZCQUVOLE1BQU07O0FBdUVULHVCQUFNLFNBQVMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0NBQWtDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtDQUFrQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDhDQUE4QyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsbUNBQW1DLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGdDQUFnQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMkJBQTJCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDJCQUEyQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsNkJBQTZCLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsc0NBQXNDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGtDQUFrQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMs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