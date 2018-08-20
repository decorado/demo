/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                    (_a = filterGroupCopy.filters).push.apply(_a, tslib_1.__spread(_this.tabsFilter));
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
        this.currentUrlEncodedFilter = filter;
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
export { DecListFilterComponent };
function DecListFilterComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecListFilterComponent.prototype.count;
    /** @type {?} */
    DecListFilterComponent.prototype.countReport;
    /** @type {?} */
    DecListFilterComponent.prototype.showSearchInput;
    /** @type {?} */
    DecListFilterComponent.prototype.showAdvancedFilter;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBRTFHLE9BQU8sRUFBb0IsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0lBb01qRCxnQ0FDVSxrQkFDQSxPQUNBO1FBSFYsaUJBSUs7UUFISyxxQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBQ2hCLFVBQUssR0FBTCxLQUFLO1FBQ0wsV0FBTSxHQUFOLE1BQU07MEJBdEZFO1lBQ2hCLE1BQU0sRUFBRSxTQUFTO1NBQ2xCOzZCQWdCZSxJQUFJO3VDQVdjLHFCQUFxQjt3QkFVbkIsRUFBRTs4QkFRWixJQUFJO3NCQTRCUSxJQUFJLFlBQVksRUFBTzt3QkE4Q2xELFVBQUMsaUJBQXdCO1lBQXhCLGtDQUFBLEVBQUEsd0JBQXdCO1lBRWxDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUV6QyxxQkFBTSxtQkFBaUIsR0FBRztvQkFFeEIsT0FBTyxFQUFFLEVBQUU7aUJBRVosQ0FBQztnQkFFRixNQUFNLENBQUMs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QUs7eUJBV0wsTUFBTTs4QkFFTixTQUFTLFNBQUMsYUFBYTtzQ0FFdkIsU0FBUyxTQUFDLDBCQUEwQjswQ0FFcEMsWUFBWSxTQUFDLDhCQUE4Qjs7aUNBek05Qzs7U0E4R2Esc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LXRhYnMtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vLi4vbGlzdC1hZHZhbmNlZC1maWx0ZXIvbGlzdC1hZHZhbmNlZC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjTGlzdFByZVNlYXJjaCwgRGVjTGlzdEZpbHRlciB9IGZyb20gJy4vLi4vbGlzdC5tb2RlbHMnO1xuaW1wb3J0IHsgRmlsdGVyR3JvdXBzIH0gZnJvbSAnLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBQbGF0Zm9ybUxvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGlzdC1maWx0ZXItd3JhcHBlclwiPlxuICA8ZGl2IGZ4TGF5b3V0PVwicm93IHdyYXBcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgICA8IS0tXG4gICAgICBDb3VudGVyXG4gICAgLS0+XG4gICAgPGRpdiBmeEZsZXg9XCIzMFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvdW50ID49IDAgJiYgIWxvYWRpbmdcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA9PT0gMFwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+e3sgXCJsYWJlbC5yZWNvcmQtbm90LWZvdW5kXCIgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnQgPT09IDFcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPnt7IFwibGFiZWwub25lLXJlY29yZC1mb3VuZFwiIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID4gMVwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+IHt7IFwibGFiZWwucmVjb3Jkcy1mb3VuZFwiIHwgdHJhbnNsYXRlOntjb3VudDpjb3VudH0gfX08L3NwYW4+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgZnhGbGV4PVwiNzBcIiBjbGFzcz1cInRleHQtcmlnaHRcIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIiBjbGFzcz1cInNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdj5cblxuICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBjbGFzcz1cImlucHV0LXNlYXJjaC1jb250YWluZXJcIiBbY2xhc3MuYWN0aXZlXT1cInNob3dTZWFyY2hJbnB1dFwiPlxuICAgICAgICAgICAgPCEtLSBnYXAgLS0+XG4gICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4tdG9vZ2xlLXNlYXJjaFwiPlxuICAgICAgICAgICAgICA8bWF0LWljb24gKGNsaWNrKT1cInRvZ2dsZVNlYXJjaElucHV0KClcIj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGZvcm0gZnhGbGV4IHJvbGU9XCJmb3JtXCIgKHN1Ym1pdCk9XCJvblNlYXJjaCgpXCI+XG4gICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjE2cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgY2xhc3M9XCJpbnB1dC1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJhci1oXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBmeEZsZXggI2lucHV0U2VhcmNoIG5hbWU9XCJzZWFyY2hcIiBbKG5nTW9kZWwpXT1cImZpbHRlckZvcm0uc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImFkdmFuY2VkRmlsdGVyQ29tcG9uZW50XCIgY2xhc3M9XCJjbGlja1wiIChjbGljayk9XCJ0b2dnbGVBZHZhbmNlZEZpbHRlcigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlYy1zbWFsbCBidG4tb3Blbi1hZHZhbmNlZC1zZWFyY2hcIj57e1wibGFiZWwuYWR2YW5jZWQtb3B0aW9uc1wiIHwgdHJhbnNsYXRlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPCEtLWdhcC0tPlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS1SZWZyZXNoIHNlYXJjaC0tPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4taW5mbyBtYXJnaW4taWNvblwiIChjbGljayk9XCJvblNlYXJjaCgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+cmVmcmVzaDwvbWF0LWljb24+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLUNsZWFyIGZpbHRlcnMtLT5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiICpuZ0lmPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aFwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWluZm9cIiAoY2xpY2spPVwib25DbGVhcigpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+Y2xlYXI8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiICpuZ0lmPVwic2hvd0luZm9CdXR0b25cIj5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1pbmZvXCIgKGNsaWNrKT1cIm9uQ2xpY2tJbmZvKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5pbmZvX291dGxpbmU8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG5cbiAgPGRpdiAqbmdJZj1cInNob3dBZHZhbmNlZEZpbHRlclwiPlxuXG4gICAgPG1hdC1jYXJkIGNsYXNzPVwiYWR2YW5jZWQtc2VhcmNoLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsncmVtb3ZlLWJ1dHRvbi1lbmFibGVkJzogZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aH1cIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG5cbiAgICAgICAgPGEgKGNsaWNrKT1cImNsb3NlRmlsdGVycygpXCIgY2xhc3M9XCJidG4tY2xvc2UtYWR2YW5jZWQtc2VhcmNoXCI+XG5cbiAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG5cbiAgICAgICAgPC9hPlxuXG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdj5cblxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1hZHZhbmNlZC1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9tYXQtY2FyZD5cblxuICA8L2Rpdj5cblxuICA8ZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWVcbiAgICAqbmdJZj1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGhcIlxuICAgIFtmaWx0ZXJHcm91cHNdPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnNcIlxuICAgIChyZW1vdmUpPVwicmVtb3ZlRGVjRmlsdGVyR3JvdXAoJGV2ZW50KVwiXG4gICAgKGVkaXQpPVwiZWRpdERlY0ZpbHRlckdyb3VwKCRldmVudClcIj48L2RlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lPlxuXG4gIDxkZWMtbGlzdC10YWJzLWZpbHRlciBbZmlsdGVyc109XCJmaWx0ZXJzXCIgW2NvdW50UmVwb3J0XT1cImNvdW50UmVwb3J0XCI+PC9kZWMtbGlzdC10YWJzLWZpbHRlcj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5saXN0LWZpbHRlci13cmFwcGVye21hcmdpbjowIDAgMTZweDtwb3NpdGlvbjpyZWxhdGl2ZX0ubGlzdC1maWx0ZXItd3JhcHBlciAubWF0LWljb257Y29sb3I6Izk5OX0ubGlzdC1maWx0ZXItd3JhcHBlciAuc2VhcmNoLXRlcm0taW5wdXR7d2lkdGg6NTAwcHg7bWFyZ2luLXJpZ2h0OjhweH0ubGlzdC1maWx0ZXItd3JhcHBlciAuaW5saW5lLWZvcm17ZGlzcGxheTppbmxpbmUtYmxvY2t9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjc0cHg7ei1pbmRleDoxO3JpZ2h0OjMwcHg7d2lkdGg6NTUycHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXIucmVtb3ZlLWJ1dHRvbi1lbmFibGVke3JpZ2h0OjYycHg7d2lkdGg6NTUxcHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmFkdmFuY2VkLXNlYXJjaC1jb250YWluZXIgLmJ0bi1jbG9zZS1hZHZhbmNlZC1zZWFyY2h7Y3Vyc29yOnBvaW50ZXJ9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXJ7dHJhbnNpdGlvbjphbGwgLjNzIGVhc2U7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjQwcHg7aGVpZ2h0OjUwcHh9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIuYWN0aXZle2JhY2tncm91bmQ6I2Y4ZjhmYTtjb2xvcjojOTk5O3dpZHRoOjYwMHB4fS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyLmFjdGl2ZSAuYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoe2Rpc3BsYXk6aW5saW5lfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2h7d2lkdGg6MTAwJX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoIGlucHV0e2ZvbnQ6aW5oZXJpdDtiYWNrZ3JvdW5kOjAgMDtjb2xvcjpjdXJyZW50Q29sb3I7Ym9yZGVyOm5vbmU7b3V0bGluZTowO3BhZGRpbmc6MDt3aWR0aDoxMDAlO3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoe2Rpc3BsYXk6bm9uZX0uc2VhcmNoLWNvbnRhaW5lciAuYnRuLWNsZWFyLXNlYXJjaHtwYWRkaW5nLXJpZ2h0OjE1cHg7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6Izk5OTt3aWR0aDo5MHB4fS5zZWFyY2gtY29udGFpbmVyIC5idG4taW5mbywuc2VhcmNoLWNvbnRhaW5lciAuYnRuLXRvb2dsZS1zZWFyY2h7Zm9udC1zaXplOjIxcHg7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OjIxcHg7Y29sb3I6Izk5OX0uc2VhcmNoLWNvbnRhaW5lciAuYmFyLWh7Ym9yZGVyLXJpZ2h0OjJweCBzb2xpZCAjZDBkMGQwO2hlaWdodDoyMXB4O21hcmdpbjphdXRvIDA7ZGlzcGxheTppbmxpbmUtYmxvY2t9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBjb3VudDogbnVtYmVyO1xuXG4gIGNvdW50UmVwb3J0O1xuXG4gIHNob3dTZWFyY2hJbnB1dDogYm9vbGVhbjtcblxuICBzaG93QWR2YW5jZWRGaWx0ZXI6IGJvb2xlYW47XG5cbiAgZmlsdGVyRm9ybTogYW55ID0ge1xuICAgIHNlYXJjaDogdW5kZWZpbmVkXG4gIH07XG5cbiAgZmlsdGVyR3JvdXBzOiBGaWx0ZXJHcm91cHM7XG5cbiAgZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM6IEZpbHRlckdyb3VwcztcblxuICBjdXJyZW50U3RhdHVzRmlsdGVyZWQ6IHN0cmluZztcblxuICB0YWJzRmlsdGVyOiBhbnk7XG5cbiAgZWRpdGlvbkdyb3VwSW5kZXg6IG51bWJlcjtcblxuICBuYW1lOiBzdHJpbmc7XG5cbiAgbG9hZGluZzogYm9vbGVhbjtcblxuICBpc0l0Rmlyc3RMb2FkID0gdHJ1ZTtcblxuICBmaWx0ZXJNb2RlOiAndGFicycgfCAnY29sbGFwc2UnO1xuXG4gIGNoaWxkcmVuRmlsdGVycztcblxuICAvKlxuICAgKiBjbGlja2FibGVDb250YWluZXJDbGFzc1xuICAgKlxuICAgKiBXaGVyZSB0aGUgY2xpY2sgd2F0Y2hlciBzaG91bGQgYmUgbGlzdGVuaW5nXG4gICAqL1xuICBwcml2YXRlIGNsaWNrYWJsZUNvbnRhaW5lckNsYXNzID0gJ2xpc3QtZmlsdGVyLXdyYXBwZXInO1xuXG4gIHByaXZhdGUgaW5uZXJEZWNGaWx0ZXJHcm91cHM6IGFueVtdO1xuXG4gIHByaXZhdGUgY3VycmVudFVybEVuY29kZWRGaWx0ZXI6IHN0cmluZztcblxuICBwcml2YXRlIHRhYnNGaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIHdhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBfZmlsdGVyczogRGVjTGlzdEZpbHRlcltdID0gW107XG5cbiAgcHJpdmF0ZSBfbG9hZENvdW50UmVwb3J0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHByZVNlYXJjaDogRGVjTGlzdFByZVNlYXJjaDtcblxuICBASW5wdXQoKSBzaG93SW5mb0J1dHRvbjtcblxuICBASW5wdXQoKSBoYXNQZXJzaXN0ZW5jZSA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IGZpbHRlcnModjogRGVjTGlzdEZpbHRlcltdKSB7XG5cbiAgICBpZiAodGhpcy5fZmlsdGVycyAhPT0gdikge1xuXG4gICAgICB0aGlzLl9maWx0ZXJzID0gdi5tYXAoZmlsdGVyID0+IG5ldyBEZWNMaXN0RmlsdGVyKGZpbHRlcikpO1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgbG9hZENvdW50UmVwb3J0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9sb2FkQ291bnRSZXBvcnQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbG9hZENvdW50UmVwb3J0KHY6IGJvb2xlYW4pIHtcbiAgICBpZiAodiAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuX2xvYWRDb3VudFJlcG9ydCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGZpbHRlcnMoKTogRGVjTGlzdEZpbHRlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVycztcbiAgfVxuXG4gIEBPdXRwdXQoKSBzZWFyY2g6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXRTZWFyY2gnKSBpbnB1dFNlYXJjaDtcblxuICBAVmlld0NoaWxkKERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50KSB0YWJzRmlsdGVyQ29tcG9uZW50OiBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudDtcblxuICBAQ29udGVudENoaWxkKERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCkgYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQ6IERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBsYXRmb3JtTG9jYXRpb246IFBsYXRmb3JtTG9jYXRpb24sXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2F0Y2hUYWJzRmlsdGVyKCk7XG4gICAgdGhpcy53YXRjaENsaWNrKCk7XG4gICAgdGhpcy53YXRjaFVybEZpbHRlcigpO1xuICAgIHRoaXMuY29uZmlndXJlQWR2YW5jZWRGaWx0ZXIoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nQ2xpY2soKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYnNGaWx0ZXIoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1VybEZpbHRlcigpO1xuICB9XG5cbiAgdG9nZ2xlU2VhcmNoSW5wdXQoKSB7XG4gICAgdGhpcy5zaG93U2VhcmNoSW5wdXQgPSAhdGhpcy5zaG93U2VhcmNoSW5wdXQ7XG4gICAgaWYgKCF0aGlzLnNob3dTZWFyY2hJbnB1dCkge1xuICAgICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5wdXRTZWFyY2gubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfSwgMTgwKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVBZHZhbmNlZEZpbHRlcigkZXZlbnQpIHtcblxuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gIXRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyO1xuXG4gIH1cblxuICBvblNlYXJjaCA9IChhcHBlbmRDdXJyZW50Rm9ybSA9IHRydWUpID0+IHtcblxuICAgIGlmICh0aGlzLmZpbHRlckZvcm0gJiYgYXBwZW5kQ3VycmVudEZvcm0pIHtcblxuICAgICAgY29uc3QgbmV3RGVjRmlsdGVyR3JvdXAgPSB7XG5cbiAgICAgICAgZmlsdGVyczogW11cblxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXModGhpcy5maWx0ZXJGb3JtKS5mb3JFYWNoKGtleSA9PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyRm9ybVtrZXldKSB7XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IHByb3BlcnR5OiBrZXksIHZhbHVlOiB0aGlzLmZpbHRlckZvcm1ba2V5XSB9O1xuXG4gICAgICAgICAgbmV3RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKGZpbHRlcik7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAobmV3RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmVkaXRpb25Hcm91cEluZGV4ID49IDApIHtcblxuICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwc1t0aGlzLmVkaXRpb25Hcm91cEluZGV4XSA9IG5ld0RlY0ZpbHRlckdyb3VwO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5wdXNoKG5ld0RlY0ZpbHRlckdyb3VwKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IFtuZXdEZWNGaWx0ZXJHcm91cF07XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLnJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHRydWUpO1xuXG4gIH1cblxuICBvbkNsZWFyKCkge1xuXG4gICAgdGhpcy5jbG9zZUZpbHRlcnMoKTtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmNsZWFyRmlsdGVyRm9ybSgpO1xuXG4gICAgdGhpcy5vblNlYXJjaCgpO1xuXG4gIH1cblxuICByZW1vdmVEZWNGaWx0ZXJHcm91cChncm91cEluZGV4KSB7XG5cbiAgICB0aGlzLmZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzLmZpbHRlcigoZ3JvdXAsIGluZGV4KSA9PiBpbmRleCAhPT0gZ3JvdXBJbmRleCk7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5maWx0ZXIoKGdyb3VwLCBpbmRleCkgPT4gaW5kZXggIT09IGdyb3VwSW5kZXgpO1xuXG4gICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMuZmlsdGVyKChncm91cCwgaW5kZXgpID0+IGluZGV4ICE9PSBncm91cEluZGV4KTtcblxuICAgIHRoaXMub25TZWFyY2godHJ1ZSk7XG5cbiAgfVxuXG4gIGVkaXREZWNGaWx0ZXJHcm91cChncm91cEluZGV4KSB7XG5cbiAgICB0aGlzLmVkaXRpb25Hcm91cEluZGV4ID0gZ3JvdXBJbmRleDtcblxuICAgIGNvbnN0IHRvRWRpdERlY0ZpbHRlckdyb3VwID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFic1tncm91cEluZGV4XTtcblxuICAgIGlmICh0b0VkaXREZWNGaWx0ZXJHcm91cCAmJiB0b0VkaXREZWNGaWx0ZXJHcm91cC5maWx0ZXJzLmxlbmd0aCA+IDApIHtcblxuICAgICAgdGhpcy5yZWxvYWRGb3JtV2l0aEdpdmVuRGVjRmlsdGVyR3JvdXBlKHRvRWRpdERlY0ZpbHRlckdyb3VwLmZpbHRlcnMpO1xuXG4gICAgfVxuXG4gIH1cblxuICBjbGVhckZpbHRlckZvcm0gPSAoKSA9PiB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXJGb3JtKSB7XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybSkuZm9yRWFjaChrZXkgPT4ge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRm9ybVtrZXldID0gdW5kZWZpbmVkO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuXG4gIH1cblxuICBvbkNsaWNrSW5mbygpIHtcbiAgICBjb25zb2xlLmxvZygnb24gY2xpY2sgaW5mby4gTm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICAvKlxuICAgKiBhcHBlbmRUb0N1cnJlbnRGaWx0ZXJzXG4gICAqXG4gICAqIEFwcGVuZCBhIGZpbHRlciB0byB0aGUgY3VycmVudCBmaWx0ZXIgZ3JvdXBzXG4gICAqL1xuICBhcHBlbmRUb0N1cnJlbnREZWNGaWx0ZXJHcm91cHMocHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKSB7XG5cbiAgICBjb25zdCBmaWx0ZXIgPSB7XG4gICAgICAncHJvcGVydHknOiBwcm9wZXJ0eU5hbWUsXG4gICAgICAndmFsdWUnOiBwcm9wZXJ0eVZhbHVlLFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicykge1xuXG4gICAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzLmZvckVhY2goKGZpbHRlckdyb3VwKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyRXhpc3RzSW5UaGlzR3JvdXAgPSBmaWx0ZXJHcm91cC5maWx0ZXJzLmZpbmQoZmlsdGVyR3JvdXBGaWx0ZXIgPT4gZmlsdGVyR3JvdXBGaWx0ZXIucHJvcGVydHkgPT09IGZpbHRlci5wcm9wZXJ0eSk7XG5cbiAgICAgICAgaWYgKCFmaWx0ZXJFeGlzdHNJblRoaXNHcm91cCkge1xuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKGZpbHRlcik7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSBbeyBmaWx0ZXJzOiBbZmlsdGVyXSB9XTtcblxuICAgIH1cblxuICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzO1xuXG4gICAgdGhpcy5yZWFjYWxjdWxhdGVBbmRFbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gIH1cblxuICBjbG9zZUZpbHRlcnMoKSB7XG5cbiAgICB0aGlzLmVkaXRpb25Hcm91cEluZGV4ID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSBmYWxzZTtcblxuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gZmFsc2U7XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVhY2FsY3VsYXRlQW5kRW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMocmVjb3VudCA9IGZhbHNlKSB7XG5cbiAgICB0aGlzLmVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQpXG4gICAgICAudGhlbigoKSA9PiB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc1BlcnNpc3RlbmNlKSB7XG5cbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaEZpbHRlckluVXJsUXVlcnkoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZUZpbHRlcnMoKTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgICAgICAgIH0pO1xuXG5cbiAgICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIHJlbG9hZEZvcm1XaXRoR2l2ZW5EZWNGaWx0ZXJHcm91cGUoZmlsdGVycykge1xuXG4gICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgIGZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuXG4gICAgICBpZiAoZmlsdGVyLnZhbHVlKSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJGb3JtW2ZpbHRlci5wcm9wZXJ0eV0gPSBmaWx0ZXIudmFsdWU7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgdGhpcy5vcGVuRmlsdGVycygpO1xuXG4gIH1cblxuICBwcml2YXRlIG9wZW5GaWx0ZXJzKCkge1xuXG4gICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSB0cnVlO1xuXG4gICAgdGhpcy5zaG93U2VhcmNoSW5wdXQgPSB0cnVlO1xuXG4gIH1cblxuICBwcml2YXRlIGNvbmZpZ3VyZUFkdmFuY2VkRmlsdGVyKCkge1xuXG4gICAgaWYgKHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5mb3JtID0gdGhpcy5maWx0ZXJGb3JtO1xuXG4gICAgICB0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50Lm9uU2VhcmNoID0gdGhpcy5vblNlYXJjaDtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5vbkNsZWFyID0gdGhpcy5jbGVhckZpbHRlckZvcm07XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJzRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMudGFic0ZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMudGFic0ZpbHRlckNvbXBvbmVudC5zZWFyY2guc3Vic2NyaWJlKGZpbHRlckV2ZW50ID0+IHtcblxuICAgICAgICBpZiAoZmlsdGVyRXZlbnQuY2hpbGRyZW4pIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyTW9kZSA9ICdjb2xsYXBzZSc7XG5cbiAgICAgICAgICB0aGlzLmNoaWxkcmVuRmlsdGVycyA9IGZpbHRlckV2ZW50LmNoaWxkcmVuO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSAndGFicyc7XG5cbiAgICAgICAgICB0aGlzLmNoaWxkcmVuRmlsdGVycyA9IHVuZGVmaW5lZDtcblxuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnRhYnNGaWx0ZXIgPSBmaWx0ZXJFdmVudC5maWx0ZXJzO1xuXG4gICAgICAgIHRoaXMuZW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHModGhpcy5pc0l0Rmlyc3RMb2FkIHx8IGZpbHRlckV2ZW50LnJlY291bnQpO1xuXG4gICAgICAgIHRoaXMuaXNJdEZpcnN0TG9hZCA9IGZhbHNlO1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYnNGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMudGFic0ZpbHRlclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50YWJzRmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb3VudEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKSB7XG5cbiAgICBjb25zdCBjdXJyZW50RmlsdGVyID0gW107XG5cbiAgICBjb25zdCBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMgPSBbXTtcblxuICAgIGlmICh0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzICYmIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMubGVuZ3RoKSB7XG5cbiAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMuZm9yRWFjaCgoZmlsdGVyR3JvdXA6IHsgZmlsdGVyczogYW55W10gfSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlckdyb3VwQ29weSA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJHcm91cC5maWx0ZXJzLnNsaWNlKClcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy50YWJzRmlsdGVyKSB7XG4gICAgICAgICAgZmlsdGVyR3JvdXBDb3B5LmZpbHRlcnMucHVzaCguLi50aGlzLnRhYnNGaWx0ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudEZpbHRlci5wdXNoKGZpbHRlckdyb3VwQ29weSk7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5V2l0aG91dFRhYnMgPSB7XG4gICAgICAgICAgZmlsdGVyczogZmlsdGVyR3JvdXAuZmlsdGVycy5zbGljZSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgY3VycmVudEZpbHRlcldpdGhvdXRUYWJzLnB1c2goZmlsdGVyR3JvdXBDb3B5V2l0aG91dFRhYnMpO1xuXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy50YWJzRmlsdGVyKSB7XG5cbiAgICAgIGN1cnJlbnRGaWx0ZXIucHVzaCh7IGZpbHRlcnM6IHRoaXMudGFic0ZpbHRlciB9KTtcblxuICAgIH1cblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gY3VycmVudEZpbHRlci5sZW5ndGggPyBjdXJyZW50RmlsdGVyIDogdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicy5sZW5ndGggPyBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKlxuICAgKiBlbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwc1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcyhyZWNvdW50ID0gZmFsc2UpIHtcblxuICAgIGxldCBmaWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlckdyb3VwcyA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5maWx0ZXJHcm91cHMpKSA6IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgdGhpcy5tb3VudEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICAgICAgaWYgKHRoaXMucHJlU2VhcmNoKSB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXBzID0gdGhpcy5wcmVTZWFyY2goZmlsdGVyR3JvdXBzKTtcblxuICAgICAgfVxuXG4gICAgICB0aGlzLnNlYXJjaC5lbWl0KHtcbiAgICAgICAgZmlsdGVyR3JvdXBzOiBmaWx0ZXJHcm91cHMsXG4gICAgICAgIHJlY291bnQ6IHJlY291bnQsXG4gICAgICAgIGZpbHRlck1vZGU6IHRoaXMuZmlsdGVyTW9kZSxcbiAgICAgICAgY2hpbGRyZW46IHRoaXMuY2hpbGRyZW5GaWx0ZXJzLFxuICAgICAgfSk7XG5cbiAgICAgIHJlcygpO1xuXG4gICAgfSk7XG5cblxuICB9XG5cbiAgLypcbiAgICogYWN0QnlDbGlja1Bvc2l0aW9uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGRldGVjdFxuICAgKi9cbiAgcHJpdmF0ZSBhY3RCeUNsaWNrUG9zaXRpb24gPSAoJGV2ZW50KSA9PiB7XG5cbiAgICBpZiAoZXZlbnQgJiYgZXZlbnRbJ3BhdGgnXSkge1xuXG4gICAgICBjb25zdCBjbGlja2VkSW5zaWRlRmlsdGVyID0gJGV2ZW50WydwYXRoJ10uZmluZChwYXRoID0+IHtcblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBgJHtwYXRoWydjbGFzc05hbWUnXX1gIHx8ICcnO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZVdyYXBwZXIgPSBjbGFzc05hbWUuaW5kZXhPZih0aGlzLmNsaWNrYWJsZUNvbnRhaW5lckNsYXNzKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZU9wdGlvbiA9IGNsYXNzTmFtZS5pbmRleE9mKCdtYXQtb3B0aW9uJykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVEYXRlUGlja2VyID0gY2xhc3NOYW1lLmluZGV4T2YoJ21hdC1kYXRlcGlja2VyLWNvbnRlbnQnKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZU92ZXJsYXlDb250YWluZXIgPSBjbGFzc05hbWUuaW5kZXhPZignY2RrLW92ZXJsYXktY29udGFpbmVyJykgPj0gMDtcblxuICAgICAgICByZXR1cm4gaW5zaWRlV3JhcHBlciB8fCBpbnNpZGVPcHRpb24gfHwgaW5zaWRlRGF0ZVBpY2tlciB8fCBpbnNpZGVPdmVybGF5Q29udGFpbmVyO1xuXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFjbGlja2VkSW5zaWRlRmlsdGVyKSB7IC8vIGF2b2lkIGNsb3NpbmcgZmlsdGVyIGZyb20gYW55IG9wZW4gZGlhbG9nXG5cbiAgICAgICAgdGhpcy5jbG9zZUZpbHRlcnMoKTtcblxuICAgICAgICB0aGlzLmNsZWFyRmlsdGVyRm9ybSgpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoQ2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hDbGljaygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYWN0QnlDbGlja1Bvc2l0aW9uLCB0cnVlKTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ0NsaWNrKCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5hY3RCeUNsaWNrUG9zaXRpb24sIHRydWUpO1xuICB9XG5cbiAgLypcbiAgICogY29tcG9uZW50VGFiTmFtZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBjb21wb25lbnRGaWx0ZXJOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnLWZpbHRlcic7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFVybEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFVybEZpbHRlcigpIHtcblxuICAgIGlmICghdGhpcy5oYXNQZXJzaXN0ZW5jZSkge1xuXG4gICAgICByZXR1cm47XG5cbiAgICB9XG5cbiAgICB0aGlzLndhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtc1xuICAgICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG5cbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgICAgaWYgKHRoaXMubmFtZSkge1xuXG4gICAgICAgICAgICBjb25zdCBiYXNlNjRGaWx0ZXIgPSBwYXJhbXNbdGhpcy5jb21wb25lbnRGaWx0ZXJOYW1lKCldO1xuXG4gICAgICAgICAgICBpZiAoYmFzZTY0RmlsdGVyKSB7XG5cbiAgICAgICAgICAgICAgaWYgKGJhc2U2NEZpbHRlciAhPT0gdGhpcy5jdXJyZW50VXJsRW5jb2RlZEZpbHRlcikge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gdGhpcy5nZXRKc29uRnJvbUJhc2U2NEZpbHRlcihiYXNlNjRGaWx0ZXIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IGZpbHRlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMubW91bnRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VhcmNoKCk7XG5cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9LCAxMCk7XG5cbiAgICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVXJsRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1VybEZpbHRlcigpIHtcblxuICAgIGlmICh0aGlzLndhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG5cbiAgICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogcmVmcmVzaEZpbHRlckluVXJsUXVlcnlcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcmVmcmVzaEZpbHRlckluVXJsUXVlcnkoKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cbiAgICAgIGNvbnN0IGZpbHRlckJhc2U2NCA9IHRoaXMuZ2V0QmFzZTY0RmlsdGVyRnJvbURlY0ZpbHRlckdyb3VwcygpO1xuXG4gICAgICB0aGlzLnNldEZpbHRlckluVXJsUXVlcnkoZmlsdGVyQmFzZTY0KS50aGVuKHJlcywgcmVqKTtcblxuICAgIH0pO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldEZpbHRlckluVXJsUXVlcnlcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2V0RmlsdGVySW5VcmxRdWVyeShmaWx0ZXIpIHtcblxuICAgIHRoaXMuY3VycmVudFVybEVuY29kZWRGaWx0ZXIgPSBmaWx0ZXI7XG5cbiAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG5cbiAgICBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudEZpbHRlck5hbWUoKV0gPSBmaWx0ZXI7XG5cbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZ2V0QmFzZTY0RmlsdGVyRnJvbURlY0ZpbHRlckdyb3VwcygpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyAmJiB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgYmFzZTY0RmlsdGVyID0gYnRvYShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicykpKTtcbiAgICAgIGNvbnN0IGJhc2VGaWx0ZXJXaXRob3V0RXF1YWxTaWduID0gYmFzZTY0RmlsdGVyLnJlcGxhY2UoLz0vZywgJycpO1xuICAgICAgcmV0dXJuIGJhc2VGaWx0ZXJXaXRob3V0RXF1YWxTaWduOyAvLyByZW1vdmVzID0gYmVmb3IgZXNldCB0aGUgZmlsdGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVXJsRmlsdGVyXG4gICAqXG4gICAqIFNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MDIwNDA5L2lzLWl0LW9rLXRvLXJlbW92ZS10aGUtZXF1YWwtc2lnbnMtZnJvbS1hLWJhc2U2NC1zdHJpbmdcbiAgICovXG4gIHByaXZhdGUgZ2V0SnNvbkZyb21CYXNlNjRGaWx0ZXIoYmFzZTY0RmlsdGVyKSB7XG4gICAgY29uc3QgYmFzZTY0UGFkTGVuID0gKGJhc2U2NEZpbHRlci5sZW5ndGggJSA0KSA+IDAgPyA0IC0gKGJhc2U2NEZpbHRlci5sZW5ndGggJSA0KSA6IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhc2U2NFBhZExlbjsgaSsrKSB7XG4gICAgICBiYXNlNjRGaWx0ZXIgKz0gJz0nOyAvLyBhZGQgPSBiZWZvcmUgcmVhZGQgdGhlIGZpbHRlclxuICAgIH1cblxuICAgIGxldCBmaWx0ZXJPYmplY3Q7XG5cbiAgICB0cnkge1xuICAgICAgZmlsdGVyT2JqZWN0ID0gSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQoYXRvYihiYXNlNjRGaWx0ZXIpKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdMaXN0RmlsdGVyQ29tcG9uZW50OjogRmFpbGVkIHRvIHBhcnNlIHRoZSBmaWx0ZXIuIFRoZSB2YWx1ZSBpcyBub3QgdmFsaWQgYW5kIHRoZSBmaWx0ZXIgd2FzIHJlbW92ZWQuIEZpbHRlciB2YWx1ZTogJztcbiAgICAgIGNvbnNvbGUuZXJyb3IobXNnLCBiYXNlNjRGaWx0ZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBiYXNlNjRGaWx0ZXIgPyBmaWx0ZXJPYmplY3QgOiB1bmRlZmluZWQ7XG4gIH1cblxufVxuIl19