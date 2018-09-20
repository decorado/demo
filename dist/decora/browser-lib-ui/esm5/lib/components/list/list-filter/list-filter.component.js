/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecListTabsFilterComponent } from './list-tabs-filter/list-tabs-filter.component';
import { DecListAdvancedFilterComponent } from './../list-advanced-filter/list-advanced-filter.component';
import { DecListFilter } from './../list.models';
import { PlatformLocation } from '@angular/common';
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
                /** @type {?} */
                var newDecFilterGroup_1 = {
                    filters: []
                };
                Object.keys(_this.filterForm).forEach(function (key) {
                    console.log('this.filterForm[key]', _this.filterForm[key]);
                    if (typeof _this.filterForm[key] !== 'undefined') {
                        console.log('AQUI KRAI');
                        /** @type {?} */
                        var filter = { property: key, value: _this.filterForm[key] };
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
        this.clearFilterForm = function () {
            if (_this.filterForm) {
                Object.keys(_this.filterForm).forEach(function (key) {
                    _this.filterForm[key] = undefined;
                });
            }
        };
        this.actByClickPosition = function ($event) {
            if (event && event['path']) {
                /** @type {?} */
                var clickedInsideFilter = $event['path'].find(function (path) {
                    /** @type {?} */
                    var className = "" + path['className'] || '';
                    /** @type {?} */
                    var insideWrapper = className.indexOf(_this.clickableContainerClass) >= 0;
                    /** @type {?} */
                    var insideOption = className.indexOf('mat-option') >= 0;
                    /** @type {?} */
                    var insideDatePicker = className.indexOf('mat-datepicker-content') >= 0;
                    /** @type {?} */
                    var insideOverlayContainer = className.indexOf('cdk-overlay-container') >= 0;
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
                this._filters = v.map(function (filter) { return new DecListFilter(filter); });
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
        /** @type {?} */
        var toEditDecFilterGroup = this.filterGroupsWithoutTabs[groupIndex];
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
        /** @type {?} */
        var filter = {
            'property': propertyName,
            'value': propertyValue,
        };
        if (this.filterGroupsWithoutTabs) {
            this.filterGroupsWithoutTabs.forEach(function (filterGroup) {
                /** @type {?} */
                var filterExistsInThisGroup = filterGroup.filters.find(function (filterGroupFilter) { return filterGroupFilter.property === filter.property; });
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
        /** @type {?} */
        var currentFilter = [];
        /** @type {?} */
        var currentFilterWithoutTabs = [];
        if (this.innerDecFilterGroups && this.innerDecFilterGroups.length) {
            this.innerDecFilterGroups.forEach(function (filterGroup) {
                /** @type {?} */
                var filterGroupCopy = {
                    filters: filterGroup.filters.slice()
                };
                if (_this.tabsFilter) {
                    (_a = filterGroupCopy.filters).push.apply(_a, tslib_1.__spread(_this.tabsFilter));
                }
                currentFilter.push(filterGroupCopy);
                /** @type {?} */
                var filterGroupCopyWithoutTabs = {
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
        /** @type {?} */
        var filterGroups = this.filterGroups ? JSON.parse(JSON.stringify(this.filterGroups)) : undefined;
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
            /** @type {?} */
            var interval = window.setInterval(function () {
                if (_this.name) {
                    /** @type {?} */
                    var base64Filter = params[_this.componentFilterName()];
                    if (base64Filter) {
                        if (base64Filter !== _this.currentUrlEncodedFilter) {
                            /** @type {?} */
                            var filter = _this.getJsonFromBase64Filter(base64Filter);
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
            /** @type {?} */
            var filterBase64 = _this.getBase64FilterFromDecFilterGroups();
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
        this.currentUrlEncodedFilter = filter;
        /** @type {?} */
        var queryParams = Object.assign({}, this.route.snapshot.queryParams);
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
            /** @type {?} */
            var base64Filter = btoa(encodeURIComponent(JSON.stringify(this.filterGroupsWithoutTabs)));
            /** @type {?} */
            var baseFilterWithoutEqualSign = base64Filter.replace(/=/g, '');
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
        /** @type {?} */
        var base64PadLen = (base64Filter.length % 4) > 0 ? 4 - (base64Filter.length % 4) : 0;
        for (var i = 0; i < base64PadLen; i++) {
            base64Filter += '='; // add = before readd the filter
        }
        /** @type {?} */
        var filterObject;
        try {
            filterObject = JSON.parse(decodeURIComponent(atob(base64Filter)));
        }
        catch (error) {
            /** @type {?} */
            var msg = 'ListFilterComponent:: Failed to parse the filter. The value is not valid and the filter was removed. Filter value: ';
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
export { DecListFilterComponent };
if (false) {
    /** @type {?} */
    DecListFilterComponent.prototype.count;
    /** @type {?} */
    DecListFilterComponent.prototype.countReport;
    /** @type {?} */
    DecListFilterComponent.prototype.showSearchInput;
    /** @type {?} */
    DecListFilterComponent.prototype.filterForm;
    /** @type {?} */
    DecListFilterComponent.prototype.filterGroups;
    /** @type {?} */
    DecListFilterComponent.prototype.filterGroupsWithoutTabs;
    /** @type {?} */
    DecListFilterComponent.prototype.currentStatusFiltered;
    /** @type {?} */
    DecListFilterComponent.prototype.tabsFilter;
    /** @type {?} */
    DecListFilterComponent.prototype.editionGroupIndex;
    /** @type {?} */
    DecListFilterComponent.prototype.name;
    /** @type {?} */
    DecListFilterComponent.prototype.loading;
    /** @type {?} */
    DecListFilterComponent.prototype.isItFirstLoad;
    /** @type {?} */
    DecListFilterComponent.prototype.filterMode;
    /** @type {?} */
    DecListFilterComponent.prototype.childrenFilters;
    /** @type {?} */
    DecListFilterComponent.prototype.clickableContainerClass;
    /** @type {?} */
    DecListFilterComponent.prototype.innerDecFilterGroups;
    /** @type {?} */
    DecListFilterComponent.prototype.currentUrlEncodedFilter;
    /** @type {?} */
    DecListFilterComponent.prototype.tabsFilterSubscription;
    /** @type {?} */
    DecListFilterComponent.prototype.watchUrlFilterSubscription;
    /** @type {?} */
    DecListFilterComponent.prototype._filters;
    /** @type {?} */
    DecListFilterComponent.prototype._loadCountReport;
    /** @type {?} */
    DecListFilterComponent.prototype._showAdvancedFilter;
    /** @type {?} */
    DecListFilterComponent.prototype.preSearch;
    /** @type {?} */
    DecListFilterComponent.prototype.showInfoButton;
    /** @type {?} */
    DecListFilterComponent.prototype.hasPersistence;
    /** @type {?} */
    DecListFilterComponent.prototype.search;
    /** @type {?} */
    DecListFilterComponent.prototype.inputSearch;
    /** @type {?} */
    DecListFilterComponent.prototype.tabsFilterComponent;
    /** @type {?} */
    DecListFilterComponent.prototype.advancedFilterComponent;
    /** @type {?} */
    DecListFilterComponent.prototype.onSearch;
    /** @type {?} */
    DecListFilterComponent.prototype.clearFilterForm;
    /** @type {?} */
    DecListFilterComponent.prototype.actByClickPosition;
    /** @type {?} */
    DecListFilterComponent.prototype.platformLocation;
    /** @type {?} */
    DecListFilterComponent.prototype.route;
    /** @type {?} */
    DecListFilterComponent.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBRTFHLE9BQU8sRUFBb0IsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0lBK01qRCxnQ0FDVSxrQkFDQSxPQUNBO1FBSFYsaUJBSUs7UUFISyxxQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBQ2hCLFVBQUssR0FBTCxLQUFLO1FBQ0wsV0FBTSxHQUFOLE1BQU07MEJBeEZFO1lBQ2hCLE1BQU0sRUFBRSxTQUFTO1NBQ2xCOzZCQWdCZSxJQUFJO3VDQVdjLHFCQUFxQjt3QkFVbkIsRUFBRTs4QkFVWixJQUFJO3NCQTRCUSxJQUFJLFlBQVksRUFBTzt3QkE4Q2xELFVBQUMsaUJBQXdCO1lBQXhCLGtDQUFBLEVBQUEsd0JBQXdCO1lBRWxDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDOztnQkFFekMsSUFBTSxtQkFBaUIsR0FBRztvQkFFeEIsT0FBTyxFQUFFLEVBQUU7aUJBRVosQ0FBQztnQkFFRixNQUFNLENBQUMs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QztTQUNyQjs7UUFFRCxJQUFJLFlBQVksQ0FBQztRQUVqQixJQUFJLENBQUM7WUFDSCxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25FO1FBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7O1lBQ2YsSUFBTSxHQUFHLEdBQUcscUhBQXFILENBQUM7WUFDbEksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDbEM7UUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs7O2dCQXJ3QmxELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsNCtHQWdHWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQywyNUNBQTI1QyxDQUFDO2lCQUN0NkM7Ozs7Z0JBdEdRLGdCQUFnQjtnQkFOaEIsY0FBYztnQkFBRSxNQUFNOzs7NEJBNks1QixLQUFLO2lDQUVMLEtBQUs7aUNBRUwsS0FBSzswQkFFTCxLQUFLO2tDQWVMLEtBQUs7eUJBV0wsTUFBTTs4QkFFTixTQUFTLFNBQUMsYUFBYTtzQ0FFdkIsU0FBUyxTQUFDLDBCQUEwQjswQ0FFcEMsWUFBWSxTQUFDLDhCQUE4Qjs7aUNBcE45Qzs7U0E4R2Esc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYnMtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vLi4vbGlzdC1hZHZhbmNlZC1maWx0ZXIvbGlzdC1hZHZhbmNlZC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjTGlzdFByZVNlYXJjaCwgRGVjTGlzdEZpbHRlciB9IGZyb20gJy4vLi4vbGlzdC5tb2RlbHMnO1xuaW1wb3J0IHsgRmlsdGVyR3JvdXBzIH0gZnJvbSAnLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBQbGF0Zm9ybUxvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGlzdC1maWx0ZXItd3JhcHBlclwiPlxuICA8ZGl2IGZ4TGF5b3V0PVwicm93IHdyYXBcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgICA8IS0tXG4gICAgICBDb3VudGVyXG4gICAgLS0+XG4gICAgPGRpdiBmeEZsZXg9XCIzMFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvdW50ID49IDAgJiYgIWxvYWRpbmdcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA9PT0gMFwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+e3sgXCJsYWJlbC5yZWNvcmQtbm90LWZvdW5kXCIgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnQgPT09IDFcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPnt7IFwibGFiZWwub25lLXJlY29yZC1mb3VuZFwiIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID4gMVwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+IHt7IFwibGFiZWwucmVjb3Jkcy1mb3VuZFwiIHwgdHJhbnNsYXRlOntjb3VudDpjb3VudH0gfX08L3NwYW4+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgZnhGbGV4PVwiNzBcIiBjbGFzcz1cInRleHQtcmlnaHRcIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIiBjbGFzcz1cInNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdj5cblxuICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBjbGFzcz1cImlucHV0LXNlYXJjaC1jb250YWluZXJcIiBbY2xhc3MuYWN0aXZlXT1cInNob3dTZWFyY2hJbnB1dFwiPlxuICAgICAgICAgICAgPCEtLSBnYXAgLS0+XG4gICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4tdG9vZ2xlLXNlYXJjaFwiPlxuICAgICAgICAgICAgICA8bWF0LWljb24gKGNsaWNrKT1cInRvZ2dsZVNlYXJjaElucHV0KClcIj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGZvcm0gZnhGbGV4IHJvbGU9XCJmb3JtXCIgKHN1Ym1pdCk9XCJvblNlYXJjaCgpXCI+XG4gICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjE2cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgY2xhc3M9XCJpbnB1dC1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJhci1oXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBmeEZsZXggI2lucHV0U2VhcmNoIG5hbWU9XCJzZWFyY2hcIiBbKG5nTW9kZWwpXT1cImZpbHRlckZvcm0uc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImFkdmFuY2VkRmlsdGVyQ29tcG9uZW50XCIgY2xhc3M9XCJjbGlja1wiIChjbGljayk9XCJ0b2dnbGVBZHZhbmNlZEZpbHRlcigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlYy1zbWFsbCBidG4tb3Blbi1hZHZhbmNlZC1zZWFyY2hcIj57e1wibGFiZWwuYWR2YW5jZWQtb3B0aW9uc1wiIHwgdHJhbnNsYXRlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPCEtLWdhcC0tPlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS1SZWZyZXNoIHNlYXJjaC0tPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4taW5mbyBtYXJnaW4taWNvblwiIChjbGljayk9XCJvblNlYXJjaCgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+cmVmcmVzaDwvbWF0LWljb24+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLUNsZWFyIGZpbHRlcnMtLT5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiICpuZ0lmPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aFwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWluZm9cIiAoY2xpY2spPVwib25DbGVhcigpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+Y2xlYXI8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiICpuZ0lmPVwic2hvd0luZm9CdXR0b25cIj5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1pbmZvXCIgKGNsaWNrKT1cIm9uQ2xpY2tJbmZvKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5pbmZvX291dGxpbmU8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG5cbiAgPGRpdiAqbmdJZj1cInNob3dBZHZhbmNlZEZpbHRlclwiPlxuXG4gICAgPG1hdC1jYXJkIGNsYXNzPVwiYWR2YW5jZWQtc2VhcmNoLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsncmVtb3ZlLWJ1dHRvbi1lbmFibGVkJzogZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aH1cIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG5cbiAgICAgICAgPGEgKGNsaWNrKT1cImNsb3NlRmlsdGVycygpXCIgY2xhc3M9XCJidG4tY2xvc2UtYWR2YW5jZWQtc2VhcmNoXCI+XG5cbiAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG5cbiAgICAgICAgPC9hPlxuXG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1hZHZhbmNlZC1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9tYXQtY2FyZD5cblxuICA8L2Rpdj5cblxuICA8ZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWVcbiAgICAqbmdJZj1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGhcIlxuICAgIFtmaWx0ZXJHcm91cHNdPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnNcIlxuICAgIChyZW1vdmUpPVwicmVtb3ZlRGVjRmlsdGVyR3JvdXAoJGV2ZW50KVwiXG4gICAgKGVkaXQpPVwiZWRpdERlY0ZpbHRlckdyb3VwKCRldmVudClcIj48L2RlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lPlxuXG4gIDxkZWMtbGlzdC10YWJzLWZpbHRlciBbZmlsdGVyc109XCJmaWx0ZXJzXCIgW2NvdW50UmVwb3J0XT1cImNvdW50UmVwb3J0XCI+PC9kZWMtbGlzdC10YWJzLWZpbHRlcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5saXN0LWZpbHRlci13cmFwcGVye21hcmdpbjowIDAgMTZweDtwb3NpdGlvbjpyZWxhdGl2ZX0ubGlzdC1maWx0ZXItd3JhcHBlciAubWF0LWljb257Y29sb3I6Izk5OX0ubGlzdC1maWx0ZXItd3JhcHBlciAuc2VhcmNoLXRlcm0taW5wdXR7d2lkdGg6NTAwcHg7bWFyZ2luLXJpZ2h0OjhweH0ubGlzdC1maWx0ZXItd3JhcHBlciAuaW5saW5lLWZvcm17ZGlzcGxheTppbmxpbmUtYmxvY2t9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjc0cHg7ei1pbmRleDoxO3JpZ2h0OjMwcHg7d2lkdGg6NTUycHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXIucmVtb3ZlLWJ1dHRvbi1lbmFibGVke3JpZ2h0OjYycHg7d2lkdGg6NTUxcHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXIgLmJ0bi1jbG9zZS1hZHZhbmNlZC1zZWFyY2h7Y3Vyc29yOnBvaW50ZXJ9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXJ7dHJhbnNpdGlvbjphbGwgLjNzIGVhc2U7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjQwcHg7aGVpZ2h0OjUwcHh9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIuYWN0aXZle2JhY2tncm91bmQ6I2Y4ZjhmYTtjb2xvcjojOTk5O3dpZHRoOjYwMHB4fS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyLmFjdGl2ZSAuYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoe2Rpc3BsYXk6aW5saW5lfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2h7d2lkdGg6MTAwJX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoIGlucHV0e2ZvbnQ6aW5oZXJpdDtiYWNrZ3JvdW5kOjAgMDtjb2xvcjpjdXJyZW50Q29sb3I7Ym9yZGVyOm5vbmU7b3V0bGluZTowO3BhZGRpbmc6MDt3aWR0aDoxMDAlO3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoe2Rpc3BsYXk6bm9uZX0uc2VhcmNoLWNvbnRhaW5lciAuYnRuLWNsZWFyLXNlYXJjaHtwYWRkaW5nLXJpZ2h0OjE1cHg7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6Izk5OTt3aWR0aDo5MHB4fS5zZWFyY2gtY29udGFpbmVyIC5idG4taW5mbywuc2VhcmNoLWNvbnRhaW5lciAuYnRuLXRvb2dsZS1zZWFyY2h7Zm9udC1zaXplOjIxcHg7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OjIxcHg7Y29sb3I6Izk5OX0uc2VhcmNoLWNvbnRhaW5lciAuYmFyLWh7Ym9yZGVyLXJpZ2h0OjJweCBzb2xpZCAjZDBkMGQwO2hlaWdodDoyMXB4O21hcmdpbjphdXRvIDA7ZGlzcGxheTppbmxpbmUtYmxvY2t9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBjb3VudDogbnVtYmVyO1xuXG4gIGNvdW50UmVwb3J0O1xuXG4gIHNob3dTZWFyY2hJbnB1dDogYm9vbGVhbjtcblxuICBzZXQgc2hvd0FkdmFuY2VkRmlsdGVyKHY6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fc2hvd0FkdmFuY2VkRmlsdGVyICE9PSB2KSB7XG4gICAgICB0aGlzLl9zaG93QWR2YW5jZWRGaWx0ZXIgPSAhIXY7XG4gICAgICB0aGlzLnNldEFkdmFuY2VkRmlsdGVyU3RhdGUodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNob3dBZHZhbmNlZEZpbHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0FkdmFuY2VkRmlsdGVyO1xuICB9XG5cbiAgZmlsdGVyRm9ybTogYW55ID0ge1xuICAgIHNlYXJjaDogdW5kZWZpbmVkXG4gIH07XG5cbiAgZmlsdGVyR3JvdXBzOiBGaWx0ZXJHcm91cHM7XG5cbiAgZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM6IEZpbHRlckdyb3VwcztcblxuICBjdXJyZW50U3RhdHVzRmlsdGVyZWQ6IHN0cmluZztcblxuICB0YWJzRmlsdGVyOiBhbnk7XG5cbiAgZWRpdGlvbkdyb3VwSW5kZXg6IG51bWJlcjtcblxuICBuYW1lOiBzdHJpbmc7XG5cbiAgbG9hZGluZzogYm9vbGVhbjtcblxuICBpc0l0Rmlyc3RMb2FkID0gdHJ1ZTtcblxuICBmaWx0ZXJNb2RlOiAndGFicycgfCAnY29sbGFwc2UnO1xuXG4gIGNoaWxkcmVuRmlsdGVycztcblxuICAvKlxuICAgKiBjbGlja2FibGVDb250YWluZXJDbGFzc1xuICAgKlxuICAgKiBXaGVyZSB0aGUgY2xpY2sgd2F0Y2hlciBzaG91bGQgYmUgbGlzdGVuaW5nXG4gICAqL1xuICBwcml2YXRlIGNsaWNrYWJsZUNvbnRhaW5lckNsYXNzID0gJ2xpc3QtZmlsdGVyLXdyYXBwZXInO1xuXG4gIHByaXZhdGUgaW5uZXJEZWNGaWx0ZXJHcm91cHM6IGFueVtdO1xuXG4gIHByaXZhdGUgY3VycmVudFVybEVuY29kZWRGaWx0ZXI6IHN0cmluZztcblxuICBwcml2YXRlIHRhYnNGaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIHdhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBfZmlsdGVyczogRGVjTGlzdEZpbHRlcltdID0gW107XG5cbiAgcHJpdmF0ZSBfbG9hZENvdW50UmVwb3J0OiBib29sZWFuO1xuXG4gIHByaXZhdGUgX3Nob3dBZHZhbmNlZEZpbHRlcjogYm9vbGVhbjtcblxuICBASW5wdXQoKSBwcmVTZWFyY2g6IERlY0xpc3RQcmVTZWFyY2g7XG5cbiAgQElucHV0KCkgc2hvd0luZm9CdXR0b247XG5cbiAgQElucHV0KCkgaGFzUGVyc2lzdGVuY2UgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmaWx0ZXJzKHY6IERlY0xpc3RGaWx0ZXJbXSkge1xuXG4gICAgaWYgKHRoaXMuX2ZpbHRlcnMgIT09IHYpIHtcblxuICAgICAgdGhpcy5fZmlsdGVycyA9IHYubWFwKGZpbHRlciA9PiBuZXcgRGVjTGlzdEZpbHRlcihmaWx0ZXIpKTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGxvYWRDb3VudFJlcG9ydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbG9hZENvdW50UmVwb3J0O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGxvYWRDb3VudFJlcG9ydCh2OiBib29sZWFuKSB7XG4gICAgaWYgKHYgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9sb2FkQ291bnRSZXBvcnQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCBmaWx0ZXJzKCk6IERlY0xpc3RGaWx0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcnM7XG4gIH1cblxuICBAT3V0cHV0KCkgc2VhcmNoOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0U2VhcmNoJykgaW5wdXRTZWFyY2g7XG5cbiAgQFZpZXdDaGlsZChEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCkgdGFic0ZpbHRlckNvbXBvbmVudDogRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQpIGFkdmFuY2VkRmlsdGVyQ29tcG9uZW50OiBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybUxvY2F0aW9uOiBQbGF0Zm9ybUxvY2F0aW9uLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhdGNoVGFic0ZpbHRlcigpO1xuICAgIHRoaXMud2F0Y2hDbGljaygpO1xuICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXIoKTtcbiAgICB0aGlzLmNvbmZpZ3VyZUFkdmFuY2VkRmlsdGVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ0NsaWNrKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJzRmlsdGVyKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdVcmxGaWx0ZXIoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlYXJjaElucHV0KCkge1xuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gIXRoaXMuc2hvd1NlYXJjaElucHV0O1xuICAgIGlmICghdGhpcy5zaG93U2VhcmNoSW5wdXQpIHtcbiAgICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0U2VhcmNoLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0sIDE4MCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQWR2YW5jZWRGaWx0ZXIoJGV2ZW50KSB7XG5cbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9ICF0aGlzLnNob3dBZHZhbmNlZEZpbHRlcjtcblxuICB9XG5cbiAgb25TZWFyY2ggPSAoYXBwZW5kQ3VycmVudEZvcm0gPSB0cnVlKSA9PiB7XG4gICAgXG4gICAgaWYgKHRoaXMuZmlsdGVyRm9ybSAmJiBhcHBlbmRDdXJyZW50Rm9ybSkge1xuXG4gICAgICBjb25zdCBuZXdEZWNGaWx0ZXJHcm91cCA9IHtcblxuICAgICAgICBmaWx0ZXJzOiBbXVxuXG4gICAgICB9O1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckZvcm0pLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuZmlsdGVyRm9ybVtrZXldJywgdGhpcy5maWx0ZXJGb3JtW2tleV0pO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZmlsdGVyRm9ybVtrZXldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdBUVVJIEtSQUknKTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IHByb3BlcnR5OiBrZXksIHZhbHVlOiB0aGlzLmZpbHRlckZvcm1ba2V5XSB9O1xuXG4gICAgICAgICAgbmV3RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKGZpbHRlcik7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAobmV3RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmVkaXRpb25Hcm91cEluZGV4ID49IDApIHtcblxuICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwc1t0aGlzLmVkaXRpb25Hcm91cEluZGV4XSA9IG5ld0RlY0ZpbHRlckdyb3VwO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5wdXNoKG5ld0RlY0ZpbHRlckdyb3VwKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IFtuZXdEZWNGaWx0ZXJHcm91cF07XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLnJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHRydWUpO1xuXG4gIH1cblxuICBvbkNsZWFyKCkge1xuXG4gICAgdGhpcy5jbG9zZUZpbHRlcnMoKTtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmNsZWFyRmlsdGVyRm9ybSgpO1xuXG4gICAgdGhpcy5vblNlYXJjaCgpO1xuXG4gIH1cblxuICByZW1vdmVEZWNGaWx0ZXJHcm91cChncm91cEluZGV4KSB7XG5cbiAgICB0aGlzLmZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzLmZpbHRlcigoZ3JvdXAsIGluZGV4KSA9PiBpbmRleCAhPT0gZ3JvdXBJbmRleCk7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5maWx0ZXIoKGdyb3VwLCBpbmRleCkgPT4gaW5kZXggIT09IGdyb3VwSW5kZXgpO1xuXG4gICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMuZmlsdGVyKChncm91cCwgaW5kZXgpID0+IGluZGV4ICE9PSBncm91cEluZGV4KTtcblxuICAgIHRoaXMub25TZWFyY2godHJ1ZSk7XG5cbiAgfVxuXG4gIGVkaXREZWNGaWx0ZXJHcm91cChncm91cEluZGV4KSB7XG5cbiAgICB0aGlzLmVkaXRpb25Hcm91cEluZGV4ID0gZ3JvdXBJbmRleDtcblxuICAgIGNvbnN0IHRvRWRpdERlY0ZpbHRlckdyb3VwID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFic1tncm91cEluZGV4XTtcblxuICAgIGlmICh0b0VkaXREZWNGaWx0ZXJHcm91cCAmJiB0b0VkaXREZWNGaWx0ZXJHcm91cC5maWx0ZXJzLmxlbmd0aCA+IDApIHtcblxuICAgICAgdGhpcy5yZWxvYWRGb3JtV2l0aEdpdmVuRGVjRmlsdGVyR3JvdXBlKHRvRWRpdERlY0ZpbHRlckdyb3VwLmZpbHRlcnMpO1xuXG4gICAgfVxuXG4gIH1cblxuICBjbGVhckZpbHRlckZvcm0gPSAoKSA9PiB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXJGb3JtKSB7XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybSkuZm9yRWFjaChrZXkgPT4ge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRm9ybVtrZXldID0gdW5kZWZpbmVkO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuXG4gIH1cblxuICBvbkNsaWNrSW5mbygpIHtcbiAgICBjb25zb2xlLmxvZygnb24gY2xpY2sgaW5mby4gTm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICAvKlxuICAgKiBhcHBlbmRUb0N1cnJlbnRGaWx0ZXJzXG4gICAqXG4gICAqIEFwcGVuZCBhIGZpbHRlciB0byB0aGUgY3VycmVudCBmaWx0ZXIgZ3JvdXBzXG4gICAqL1xuICBhcHBlbmRUb0N1cnJlbnREZWNGaWx0ZXJHcm91cHMocHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKSB7XG5cbiAgICBjb25zdCBmaWx0ZXIgPSB7XG4gICAgICAncHJvcGVydHknOiBwcm9wZXJ0eU5hbWUsXG4gICAgICAndmFsdWUnOiBwcm9wZXJ0eVZhbHVlLFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicykge1xuXG4gICAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzLmZvckVhY2goKGZpbHRlckdyb3VwKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyRXhpc3RzSW5UaGlzR3JvdXAgPSBmaWx0ZXJHcm91cC5maWx0ZXJzLmZpbmQoZmlsdGVyR3JvdXBGaWx0ZXIgPT4gZmlsdGVyR3JvdXBGaWx0ZXIucHJvcGVydHkgPT09IGZpbHRlci5wcm9wZXJ0eSk7XG5cbiAgICAgICAgaWYgKCFmaWx0ZXJFeGlzdHNJblRoaXNHcm91cCkge1xuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKGZpbHRlcik7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSBbeyBmaWx0ZXJzOiBbZmlsdGVyXSB9XTtcblxuICAgIH1cblxuICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzO1xuXG4gICAgdGhpcy5yZWFjYWxjdWxhdGVBbmRFbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gIH1cblxuICBjbG9zZUZpbHRlcnMoKSB7XG5cbiAgICB0aGlzLmVkaXRpb25Hcm91cEluZGV4ID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSBmYWxzZTtcblxuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gZmFsc2U7XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVhY2FsY3VsYXRlQW5kRW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMocmVjb3VudCA9IGZhbHNlKSB7XG5cbiAgICB0aGlzLmVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQpXG4gICAgICAudGhlbigoKSA9PiB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc1BlcnNpc3RlbmNlKSB7XG5cbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaEZpbHRlckluVXJsUXVlcnkoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZUZpbHRlcnMoKTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgICAgICAgIH0pO1xuXG5cbiAgICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIHJlbG9hZEZvcm1XaXRoR2l2ZW5EZWNGaWx0ZXJHcm91cGUoZmlsdGVycykge1xuXG4gICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgIGZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuXG4gICAgICBpZiAoZmlsdGVyLnZhbHVlKSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJGb3JtW2ZpbHRlci5wcm9wZXJ0eV0gPSBmaWx0ZXIudmFsdWU7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgdGhpcy5vcGVuRmlsdGVycygpO1xuXG4gIH1cblxuICBwcml2YXRlIG9wZW5GaWx0ZXJzKCkge1xuXG4gICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSB0cnVlO1xuXG4gICAgdGhpcy5zaG93U2VhcmNoSW5wdXQgPSB0cnVlO1xuXG4gIH1cblxuICBwcml2YXRlIGNvbmZpZ3VyZUFkdmFuY2VkRmlsdGVyKCkge1xuXG4gICAgaWYgKHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5mb3JtID0gdGhpcy5maWx0ZXJGb3JtO1xuXG4gICAgICB0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50Lm9uU2VhcmNoID0gdGhpcy5vblNlYXJjaDtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5vbkNsZWFyID0gdGhpcy5jbGVhckZpbHRlckZvcm07XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgc2V0QWR2YW5jZWRGaWx0ZXJTdGF0ZShzdGF0ZSkge1xuXG4gICAgaWYgKHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5vcGVuZWQgPSBzdGF0ZTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSB3YXRjaFRhYnNGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMudGFic0ZpbHRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy50YWJzRmlsdGVyU3Vic2NyaXB0aW9uID0gdGhpcy50YWJzRmlsdGVyQ29tcG9uZW50LnNlYXJjaC5zdWJzY3JpYmUoZmlsdGVyRXZlbnQgPT4ge1xuXG4gICAgICAgIGlmIChmaWx0ZXJFdmVudC5jaGlsZHJlbikge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gJ2NvbGxhcHNlJztcblxuICAgICAgICAgIHRoaXMuY2hpbGRyZW5GaWx0ZXJzID0gZmlsdGVyRXZlbnQuY2hpbGRyZW47XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyTW9kZSA9ICd0YWJzJztcblxuICAgICAgICAgIHRoaXMuY2hpbGRyZW5GaWx0ZXJzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMudGFic0ZpbHRlciA9IGZpbHRlckV2ZW50LmZpbHRlcnM7XG5cbiAgICAgICAgdGhpcy5lbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwcyh0aGlzLmlzSXRGaXJzdExvYWQgfHwgZmlsdGVyRXZlbnQucmVjb3VudCk7XG5cbiAgICAgICAgdGhpcy5pc0l0Rmlyc3RMb2FkID0gZmFsc2U7XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpIHtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXIgPSBbXTtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicyA9IFtdO1xuXG4gICAgaWYgKHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgJiYgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5sZW5ndGgpIHtcblxuICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5mb3JFYWNoKChmaWx0ZXJHcm91cDogeyBmaWx0ZXJzOiBhbnlbXSB9KSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5ID0ge1xuICAgICAgICAgIGZpbHRlcnM6IGZpbHRlckdyb3VwLmZpbHRlcnMuc2xpY2UoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcbiAgICAgICAgICBmaWx0ZXJHcm91cENvcHkuZmlsdGVycy5wdXNoKC4uLnRoaXMudGFic0ZpbHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RmlsdGVyLnB1c2goZmlsdGVyR3JvdXBDb3B5KTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJHcm91cC5maWx0ZXJzLnNsaWNlKClcbiAgICAgICAgfTtcblxuICAgICAgICBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMucHVzaChmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcblxuICAgICAgY3VycmVudEZpbHRlci5wdXNoKHsgZmlsdGVyczogdGhpcy50YWJzRmlsdGVyIH0pO1xuXG4gICAgfVxuXG4gICAgdGhpcy5maWx0ZXJHcm91cHMgPSBjdXJyZW50RmlsdGVyLmxlbmd0aCA/IGN1cnJlbnRGaWx0ZXIgOiB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gY3VycmVudEZpbHRlcldpdGhvdXRUYWJzLmxlbmd0aCA/IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qXG4gICAqIGVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQgPSBmYWxzZSkge1xuXG4gICAgbGV0IGZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzID8gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlckdyb3VwcykpIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICB0aGlzLm1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gICAgICBpZiAodGhpcy5wcmVTZWFyY2gpIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMgPSB0aGlzLnByZVNlYXJjaChmaWx0ZXJHcm91cHMpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VhcmNoLmVtaXQoe1xuICAgICAgICBmaWx0ZXJHcm91cHM6IGZpbHRlckdyb3VwcyxcbiAgICAgICAgcmVjb3VudDogcmVjb3VudCxcbiAgICAgICAgZmlsdGVyTW9kZTogdGhpcy5maWx0ZXJNb2RlLFxuICAgICAgICBjaGlsZHJlbjogdGhpcy5jaGlsZHJlbkZpbHRlcnMsXG4gICAgICB9KTtcblxuICAgICAgcmVzKCk7XG5cbiAgICB9KTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBhY3RCeUNsaWNrUG9zaXRpb25cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZGV0ZWN0XG4gICAqL1xuICBwcml2YXRlIGFjdEJ5Q2xpY2tQb3NpdGlvbiA9ICgkZXZlbnQpID0+IHtcblxuICAgIGlmIChldmVudCAmJiBldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGNsaWNrZWRJbnNpZGVGaWx0ZXIgPSAkZXZlbnRbJ3BhdGgnXS5maW5kKHBhdGggPT4ge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAke3BhdGhbJ2NsYXNzTmFtZSddfWAgfHwgJyc7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlV3JhcHBlciA9IGNsYXNzTmFtZS5pbmRleE9mKHRoaXMuY2xpY2thYmxlQ29udGFpbmVyQ2xhc3MpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3B0aW9uID0gY2xhc3NOYW1lLmluZGV4T2YoJ21hdC1vcHRpb24nKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZURhdGVQaWNrZXIgPSBjbGFzc05hbWUuaW5kZXhPZignbWF0LWRhdGVwaWNrZXItY29udGVudCcpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3ZlcmxheUNvbnRhaW5lciA9IGNsYXNzTmFtZS5pbmRleE9mKCdjZGstb3ZlcmxheS1jb250YWluZXInKSA+PSAwO1xuXG4gICAgICAgIHJldHVybiBpbnNpZGVXcmFwcGVyIHx8IGluc2lkZU9wdGlvbiB8fCBpbnNpZGVEYXRlUGlja2VyIHx8IGluc2lkZU92ZXJsYXlDb250YWluZXI7XG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWNsaWNrZWRJbnNpZGVGaWx0ZXIpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaENsaWNrKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5hY3RCeUNsaWNrUG9zaXRpb24sIHRydWUpO1xuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nQ2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nQ2xpY2soKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmFjdEJ5Q2xpY2tQb3NpdGlvbiwgdHJ1ZSk7XG4gIH1cblxuICAvKlxuICAgKiBjb21wb25lbnRUYWJOYW1lXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGNvbXBvbmVudEZpbHRlck5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICctZmlsdGVyJztcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVXJsRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVXJsRmlsdGVyKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc1BlcnNpc3RlbmNlKSB7XG5cbiAgICAgIHJldHVybjtcblxuICAgIH1cblxuICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgICAuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcblxuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cbiAgICAgICAgICBpZiAodGhpcy5uYW1lKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGJhc2U2NEZpbHRlciA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudEZpbHRlck5hbWUoKV07XG5cbiAgICAgICAgICAgIGlmIChiYXNlNjRGaWx0ZXIpIHtcblxuICAgICAgICAgICAgICBpZiAoYmFzZTY0RmlsdGVyICE9PSB0aGlzLmN1cnJlbnRVcmxFbmNvZGVkRmlsdGVyKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmdldEpzb25Gcm9tQmFzZTY0RmlsdGVyKGJhc2U2NEZpbHRlcik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gZmlsdGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VudEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25TZWFyY2goKTtcblxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sIDEwKTtcblxuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVXJsRmlsdGVyKCkge1xuXG4gICAgaWYgKHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24pIHtcblxuICAgICAgdGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZWZyZXNoRmlsdGVySW5VcmxRdWVyeVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWZyZXNoRmlsdGVySW5VcmxRdWVyeSgpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgY29uc3QgZmlsdGVyQmFzZTY0ID0gdGhpcy5nZXRCYXNlNjRGaWx0ZXJGcm9tRGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgICAgIHRoaXMuc2V0RmlsdGVySW5VcmxRdWVyeShmaWx0ZXJCYXNlNjQpLnRoZW4ocmVzLCByZWopO1xuXG4gICAgfSk7XG5cblxuICB9XG5cbiAgLypcbiAgICogc2V0RmlsdGVySW5VcmxRdWVyeVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRGaWx0ZXJJblVybFF1ZXJ5KGZpbHRlcikge1xuXG4gICAgdGhpcy5jdXJyZW50VXJsRW5jb2RlZEZpbHRlciA9IGZpbHRlcjtcblxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcblxuICAgIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50RmlsdGVyTmFtZSgpXSA9IGZpbHRlcjtcblxuICAgIHJldHVybiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4nXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLCBxdWVyeVBhcmFtczogcXVlcnlQYXJhbXMsIHJlcGxhY2VVcmw6IHRydWUgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1VybEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRCYXNlNjRGaWx0ZXJGcm9tRGVjRmlsdGVyR3JvdXBzKCkge1xuICAgIGlmICh0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzICYmIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBiYXNlNjRGaWx0ZXIgPSBidG9hKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzKSkpO1xuICAgICAgY29uc3QgYmFzZUZpbHRlcldpdGhvdXRFcXVhbFNpZ24gPSBiYXNlNjRGaWx0ZXIucmVwbGFjZSgvPS9nLCAnJyk7XG4gICAgICByZXR1cm4gYmFzZUZpbHRlcldpdGhvdXRFcXVhbFNpZ247IC8vIHJlbW92ZXMgPSBiZWZvciBlc2V0IHRoZSBmaWx0ZXJcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICogU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkwMjA0MDkvaXMtaXQtb2stdG8tcmVtb3ZlLXRoZS1lcXVhbC1zaWducy1mcm9tLWEtYmFzZTY0LXN0cmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRKc29uRnJvbUJhc2U2NEZpbHRlcihiYXNlNjRGaWx0ZXIpIHtcbiAgICBjb25zdCBiYXNlNjRQYWRMZW4gPSAoYmFzZTY0RmlsdGVyLmxlbmd0aCAlIDQpID4gMCA/IDQgLSAoYmFzZTY0RmlsdGVyLmxlbmd0aCAlIDQpIDogMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFzZTY0UGFkTGVuOyBpKyspIHtcbiAgICAgIGJhc2U2NEZpbHRlciArPSAnPSc7IC8vIGFkZCA9IGJlZm9yZSByZWFkZCB0aGUgZmlsdGVyXG4gICAgfVxuXG4gICAgbGV0IGZpbHRlck9iamVjdDtcblxuICAgIHRyeSB7XG4gICAgICBmaWx0ZXJPYmplY3QgPSBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudChhdG9iKGJhc2U2NEZpbHRlcikpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbXNnID0gJ0xpc3RGaWx0ZXJDb21wb25lbnQ6OiBGYWlsZWQgdG8gcGFyc2UgdGhlIGZpbHRlci4gVGhlIHZhbHVlIGlzIG5vdCB2YWxpZCBhbmQgdGhlIGZpbHRlciB3YXMgcmVtb3ZlZC4gRmlsdGVyIHZhbHVlOiAnO1xuICAgICAgY29uc29sZS5lcnJvcihtc2csIGJhc2U2NEZpbHRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U2NEZpbHRlciA/IGZpbHRlck9iamVjdCA6IHVuZGVmaW5lZDtcbiAgfVxuXG59XG4iXX0=