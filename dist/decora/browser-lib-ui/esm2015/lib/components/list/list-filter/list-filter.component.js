/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecListTabsFilterComponent } from './list-tabs-filter/list-tabs-filter.component';
import { DecListAdvancedFilterComponent } from './../list-advanced-filter/list-advanced-filter.component';
import { DecListFilter } from './../list.models';
import { PlatformLocation } from '@angular/common';
export class DecListFilterComponent {
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
                        const /** @type {?} */ filter = { property: key, value: this.filterForm[key] };
                        newDecFilterGroup.filters.push(filter);
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
            this._filters = v.map(filter => new DecListFilter(filter));
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
        const /** @type {?} */ filter = {
            'property': propertyName,
            'value': propertyValue,
        };
        if (this.filterGroupsWithoutTabs) {
            this.filterGroupsWithoutTabs.forEach((filterGroup) => {
                const /** @type {?} */ filterExistsInThisGroup = filterGroup.filters.find(filterGroupFilter => filterGroupFilter.property === filter.property);
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
        filters.forEach(filter => {
            if (filter.value) {
                this.filterForm[filter.property] = filter.value;
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
                            const /** @type {?} */ filter = this.getJsonFromBase64Filter(base64Filter);
                            this.innerDecFilterGroups = filter;
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
    setFilterInUrlQuery(filter) {
        this.currentUrlEncodedFilter = filter;
        const /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
        queryParams[this.componentFilterName()] = filter;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDM0YsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFFMUcsT0FBTyxFQUFvQixhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXVHbkQsTUFBTTs7Ozs7O0lBNkZKLFlBQ1Usa0JBQ0EsT0FDQTtRQUZBLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDaEIsVUFBSyxHQUFMLEtBQUs7UUFDTCxXQUFNLEdBQU4sTUFBTTswQkF0RkU7WUFDaEIsTUFBTSxFQUFFLFNBQVM7U0FDbEI7NkJBZ0JlLElBQUk7dUNBV2MscUJBQXFCO3dCQVVuQixFQUFFOzhCQVFaLElBQUk7c0JBNEJRLElBQUksWUFBWSxFQUFPO3dCQThDbEQsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUV0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFFekMsdUJBQU0saUJBQWlCLEdBQUc7b0JBRXhCLE9BQU8sRUFBRSxFQUFFO2lCQUVaLENBQUM7Z0JBRUYsTUFBTSxDQUFDLElB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QUFDLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJzLWZpbHRlci9saXN0LXRhYnMtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuLy4uL2xpc3QtYWR2YW5jZWQtZmlsdGVyL2xpc3QtYWR2YW5jZWQtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0xpc3RQcmVTZWFyY2gsIERlY0xpc3RGaWx0ZXIgfSBmcm9tICcuLy4uL2xpc3QubW9kZWxzJztcbmltcG9ydCB7IEZpbHRlckdyb3VwcyB9IGZyb20gJy4vLi4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwnO1xuaW1wb3J0IHsgUGxhdGZvcm1Mb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LWZpbHRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImxpc3QtZmlsdGVyLXdyYXBwZXJcIj5cbiAgPGRpdiBmeExheW91dD1cInJvdyB3cmFwXCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgPCEtLVxuICAgICAgQ291bnRlclxuICAgIC0tPlxuICAgIDxkaXYgZnhGbGV4PVwiMzBcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb3VudCA+PSAwICYmICFsb2FkaW5nXCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnQgPT09IDBcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPnt7IFwibGFiZWwucmVjb3JkLW5vdC1mb3VuZFwiIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID09PSAxXCIgY2xhc3M9XCJkZWMtYm9keS1zdHJvbmdcIj57eyBcImxhYmVsLm9uZS1yZWNvcmQtZm91bmRcIiB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA+IDFcIiBjbGFzcz1cImRlYy1ib2R5LXN0cm9uZ1wiPiB7eyBcImxhYmVsLnJlY29yZHMtZm91bmRcIiB8IHRyYW5zbGF0ZTp7Y291bnQ6Y291bnR9IH19PC9zcGFuPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGZ4RmxleD1cIjcwXCIgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCIgY2xhc3M9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXY+XG5cbiAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgY2xhc3M9XCJpbnB1dC1zZWFyY2gtY29udGFpbmVyXCIgW2NsYXNzLmFjdGl2ZV09XCJzaG93U2VhcmNoSW5wdXRcIj5cbiAgICAgICAgICAgIDwhLS0gZ2FwIC0tPlxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLXRvb2dsZS1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIChjbGljayk9XCJ0b2dnbGVTZWFyY2hJbnB1dCgpXCI+c2VhcmNoPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxmb3JtIGZ4RmxleCByb2xlPVwiZm9ybVwiIChzdWJtaXQpPVwib25TZWFyY2goKVwiPlxuICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIxNnB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGNsYXNzPVwiaW5wdXQtc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYXItaFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgZnhGbGV4ICNpbnB1dFNlYXJjaCBuYW1lPVwic2VhcmNoXCIgWyhuZ01vZGVsKV09XCJmaWx0ZXJGb3JtLnNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJhZHZhbmNlZEZpbHRlckNvbXBvbmVudFwiIGNsYXNzPVwiY2xpY2tcIiAoY2xpY2spPVwidG9nZ2xlQWR2YW5jZWRGaWx0ZXIoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWMtc21hbGwgYnRuLW9wZW4tYWR2YW5jZWQtc2VhcmNoXCI+e3tcImxhYmVsLmFkdmFuY2VkLW9wdGlvbnNcIiB8IHRyYW5zbGF0ZX19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwhLS1nYXAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tUmVmcmVzaCBzZWFyY2gtLT5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWluZm8gbWFyZ2luLWljb25cIiAoY2xpY2spPVwib25TZWFyY2goKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPnJlZnJlc2g8L21hdC1pY29uPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS1DbGVhciBmaWx0ZXJzLS0+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiAqbmdJZj1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGhcIj5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1pbmZvXCIgKGNsaWNrKT1cIm9uQ2xlYXIoKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmNsZWFyPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiAqbmdJZj1cInNob3dJbmZvQnV0dG9uXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4taW5mb1wiIChjbGljayk9XCJvbkNsaWNrSW5mbygpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+aW5mb19vdXRsaW5lPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuXG4gIDxkaXYgKm5nSWY9XCJzaG93QWR2YW5jZWRGaWx0ZXJcIj5cblxuICAgIDxtYXQtY2FyZCBjbGFzcz1cImFkdmFuY2VkLXNlYXJjaC1jb250YWluZXJcIiBbbmdDbGFzc109XCJ7J3JlbW92ZS1idXR0b24tZW5hYmxlZCc6IGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzPy5sZW5ndGh9XCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuXG4gICAgICAgIDxhIChjbGljayk9XCJjbG9zZUZpbHRlcnMoKVwiIGNsYXNzPVwiYnRuLWNsb3NlLWFkdmFuY2VkLXNlYXJjaFwiPlxuXG4gICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNsb3NlPC9pPlxuXG4gICAgICAgIDwvYT5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXY+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtYWR2YW5jZWQtZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvbWF0LWNhcmQ+XG5cbiAgPC9kaXY+XG5cbiAgPGRlYy1saXN0LWFjdGl2ZS1maWx0ZXItcmVzdW1lXG4gICAgKm5nSWY9XCJmaWx0ZXJHcm91cHNXaXRob3V0VGFicz8ubGVuZ3RoXCJcbiAgICBbZmlsdGVyR3JvdXBzXT1cImZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzXCJcbiAgICAocmVtb3ZlKT1cInJlbW92ZURlY0ZpbHRlckdyb3VwKCRldmVudClcIlxuICAgIChlZGl0KT1cImVkaXREZWNGaWx0ZXJHcm91cCgkZXZlbnQpXCI+PC9kZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZT5cblxuICA8ZGVjLWxpc3QtdGFicy1maWx0ZXIgW2ZpbHRlcnNdPVwiZmlsdGVyc1wiIFtjb3VudFJlcG9ydF09XCJjb3VudFJlcG9ydFwiPjwvZGVjLWxpc3QtdGFicy1maWx0ZXI+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubGlzdC1maWx0ZXItd3JhcHBlcnttYXJnaW46MCAwIDE2cHg7cG9zaXRpb246cmVsYXRpdmV9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLm1hdC1pY29ue2NvbG9yOiM5OTl9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLnNlYXJjaC10ZXJtLWlucHV0e3dpZHRoOjUwMHB4O21hcmdpbi1yaWdodDo4cHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmlubGluZS1mb3Jte2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo3NHB4O3otaW5kZXg6MTtyaWdodDozMHB4O3dpZHRoOjU1MnB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyLnJlbW92ZS1idXR0b24tZW5hYmxlZHtyaWdodDo2MnB4O3dpZHRoOjU1MXB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyIC5idG4tY2xvc2UtYWR2YW5jZWQtc2VhcmNoe2N1cnNvcjpwb2ludGVyfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVye3RyYW5zaXRpb246YWxsIC4zcyBlYXNlO292ZXJmbG93OmhpZGRlbjt3aWR0aDo0MHB4O2hlaWdodDo1MHB4fS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyLmFjdGl2ZXtiYWNrZ3JvdW5kOiNmOGY4ZmE7Y29sb3I6Izk5OTt3aWR0aDo2MDBweH0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lci5hY3RpdmUgLmJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaHtkaXNwbGF5OmlubGluZX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoe3dpZHRoOjEwMCV9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaCBpbnB1dHtmb250OmluaGVyaXQ7YmFja2dyb3VuZDowIDA7Y29sb3I6Y3VycmVudENvbG9yO2JvcmRlcjpub25lO291dGxpbmU6MDtwYWRkaW5nOjA7d2lkdGg6MTAwJTt2ZXJ0aWNhbC1hbGlnbjpib3R0b219LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaHtkaXNwbGF5Om5vbmV9LnNlYXJjaC1jb250YWluZXIgLmJ0bi1jbGVhci1zZWFyY2h7cGFkZGluZy1yaWdodDoxNXB4O2N1cnNvcjpwb2ludGVyO2NvbG9yOiM5OTk7d2lkdGg6OTBweH0uc2VhcmNoLWNvbnRhaW5lciAuYnRuLWluZm8sLnNlYXJjaC1jb250YWluZXIgLmJ0bi10b29nbGUtc2VhcmNoe2ZvbnQtc2l6ZToyMXB4O2N1cnNvcjpwb2ludGVyO2hlaWdodDoyMXB4O2NvbG9yOiM5OTl9LnNlYXJjaC1jb250YWluZXIgLmJhci1oe2JvcmRlci1yaWdodDoycHggc29saWQgI2QwZDBkMDtoZWlnaHQ6MjFweDttYXJnaW46YXV0byAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgY291bnQ6IG51bWJlcjtcblxuICBjb3VudFJlcG9ydDtcblxuICBzaG93U2VhcmNoSW5wdXQ6IGJvb2xlYW47XG5cbiAgc2hvd0FkdmFuY2VkRmlsdGVyOiBib29sZWFuO1xuXG4gIGZpbHRlckZvcm06IGFueSA9IHtcbiAgICBzZWFyY2g6IHVuZGVmaW5lZFxuICB9O1xuXG4gIGZpbHRlckdyb3VwczogRmlsdGVyR3JvdXBzO1xuXG4gIGZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzOiBGaWx0ZXJHcm91cHM7XG5cbiAgY3VycmVudFN0YXR1c0ZpbHRlcmVkOiBzdHJpbmc7XG5cbiAgdGFic0ZpbHRlcjogYW55O1xuXG4gIGVkaXRpb25Hcm91cEluZGV4OiBudW1iZXI7XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGxvYWRpbmc6IGJvb2xlYW47XG5cbiAgaXNJdEZpcnN0TG9hZCA9IHRydWU7XG5cbiAgZmlsdGVyTW9kZTogJ3RhYnMnIHwgJ2NvbGxhcHNlJztcblxuICBjaGlsZHJlbkZpbHRlcnM7XG5cbiAgLypcbiAgICogY2xpY2thYmxlQ29udGFpbmVyQ2xhc3NcbiAgICpcbiAgICogV2hlcmUgdGhlIGNsaWNrIHdhdGNoZXIgc2hvdWxkIGJlIGxpc3RlbmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBjbGlja2FibGVDb250YWluZXJDbGFzcyA9ICdsaXN0LWZpbHRlci13cmFwcGVyJztcblxuICBwcml2YXRlIGlubmVyRGVjRmlsdGVyR3JvdXBzOiBhbnlbXTtcblxuICBwcml2YXRlIGN1cnJlbnRVcmxFbmNvZGVkRmlsdGVyOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSB0YWJzRmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSB3YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgX2ZpbHRlcnM6IERlY0xpc3RGaWx0ZXJbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2xvYWRDb3VudFJlcG9ydDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBwcmVTZWFyY2g6IERlY0xpc3RQcmVTZWFyY2g7XG5cbiAgQElucHV0KCkgc2hvd0luZm9CdXR0b247XG5cbiAgQElucHV0KCkgaGFzUGVyc2lzdGVuY2UgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmaWx0ZXJzKHY6IERlY0xpc3RGaWx0ZXJbXSkge1xuXG4gICAgaWYgKHRoaXMuX2ZpbHRlcnMgIT09IHYpIHtcblxuICAgICAgdGhpcy5fZmlsdGVycyA9IHYubWFwKGZpbHRlciA9PiBuZXcgRGVjTGlzdEZpbHRlcihmaWx0ZXIpKTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGxvYWRDb3VudFJlcG9ydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbG9hZENvdW50UmVwb3J0O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGxvYWRDb3VudFJlcG9ydCh2OiBib29sZWFuKSB7XG4gICAgaWYgKHYgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9sb2FkQ291bnRSZXBvcnQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCBmaWx0ZXJzKCk6IERlY0xpc3RGaWx0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcnM7XG4gIH1cblxuICBAT3V0cHV0KCkgc2VhcmNoOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0U2VhcmNoJykgaW5wdXRTZWFyY2g7XG5cbiAgQFZpZXdDaGlsZChEZWNMaXN0VGFic0ZpbHRlckNvbXBvbmVudCkgdGFic0ZpbHRlckNvbXBvbmVudDogRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQpIGFkdmFuY2VkRmlsdGVyQ29tcG9uZW50OiBEZWNMaXN0QWR2YW5jZWRGaWx0ZXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybUxvY2F0aW9uOiBQbGF0Zm9ybUxvY2F0aW9uLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhdGNoVGFic0ZpbHRlcigpO1xuICAgIHRoaXMud2F0Y2hDbGljaygpO1xuICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXIoKTtcbiAgICB0aGlzLmNvbmZpZ3VyZUFkdmFuY2VkRmlsdGVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ0NsaWNrKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJzRmlsdGVyKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdVcmxGaWx0ZXIoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlYXJjaElucHV0KCkge1xuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gIXRoaXMuc2hvd1NlYXJjaElucHV0O1xuICAgIGlmICghdGhpcy5zaG93U2VhcmNoSW5wdXQpIHtcbiAgICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0U2VhcmNoLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0sIDE4MCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQWR2YW5jZWRGaWx0ZXIoJGV2ZW50KSB7XG5cbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9ICF0aGlzLnNob3dBZHZhbmNlZEZpbHRlcjtcblxuICB9XG5cbiAgb25TZWFyY2ggPSAoYXBwZW5kQ3VycmVudEZvcm0gPSB0cnVlKSA9PiB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXJGb3JtICYmIGFwcGVuZEN1cnJlbnRGb3JtKSB7XG5cbiAgICAgIGNvbnN0IG5ld0RlY0ZpbHRlckdyb3VwID0ge1xuXG4gICAgICAgIGZpbHRlcnM6IFtdXG5cbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybSkuZm9yRWFjaChrZXkgPT4ge1xuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlckZvcm1ba2V5XSkge1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyID0geyBwcm9wZXJ0eToga2V5LCB2YWx1ZTogdGhpcy5maWx0ZXJGb3JtW2tleV0gfTtcblxuICAgICAgICAgIG5ld0RlY0ZpbHRlckdyb3VwLmZpbHRlcnMucHVzaChmaWx0ZXIpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICB9KTtcblxuICAgICAgaWYgKG5ld0RlY0ZpbHRlckdyb3VwLmZpbHRlcnMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIGlmICh0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzKSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5lZGl0aW9uR3JvdXBJbmRleCA+PSAwKSB7XG5cbiAgICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHNbdGhpcy5lZGl0aW9uR3JvdXBJbmRleF0gPSBuZXdEZWNGaWx0ZXJHcm91cDtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMucHVzaChuZXdEZWNGaWx0ZXJHcm91cCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSBbbmV3RGVjRmlsdGVyR3JvdXBdO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgdGhpcy5yZWFjYWxjdWxhdGVBbmRFbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwcyh0cnVlKTtcblxuICB9XG5cbiAgb25DbGVhcigpIHtcblxuICAgIHRoaXMuY2xvc2VGaWx0ZXJzKCk7XG5cbiAgICB0aGlzLmZpbHRlckdyb3VwcyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgIHRoaXMub25TZWFyY2goKTtcblxuICB9XG5cbiAgcmVtb3ZlRGVjRmlsdGVyR3JvdXAoZ3JvdXBJbmRleCkge1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHMgPSB0aGlzLmZpbHRlckdyb3Vwcy5maWx0ZXIoKGdyb3VwLCBpbmRleCkgPT4gaW5kZXggIT09IGdyb3VwSW5kZXgpO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMuZmlsdGVyKChncm91cCwgaW5kZXgpID0+IGluZGV4ICE9PSBncm91cEluZGV4KTtcblxuICAgIHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgPSB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLmZpbHRlcigoZ3JvdXAsIGluZGV4KSA9PiBpbmRleCAhPT0gZ3JvdXBJbmRleCk7XG5cbiAgICB0aGlzLm9uU2VhcmNoKHRydWUpO1xuXG4gIH1cblxuICBlZGl0RGVjRmlsdGVyR3JvdXAoZ3JvdXBJbmRleCkge1xuXG4gICAgdGhpcy5lZGl0aW9uR3JvdXBJbmRleCA9IGdyb3VwSW5kZXg7XG5cbiAgICBjb25zdCB0b0VkaXREZWNGaWx0ZXJHcm91cCA9IHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnNbZ3JvdXBJbmRleF07XG5cbiAgICBpZiAodG9FZGl0RGVjRmlsdGVyR3JvdXAgJiYgdG9FZGl0RGVjRmlsdGVyR3JvdXAuZmlsdGVycy5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHRoaXMucmVsb2FkRm9ybVdpdGhHaXZlbkRlY0ZpbHRlckdyb3VwZSh0b0VkaXREZWNGaWx0ZXJHcm91cC5maWx0ZXJzKTtcblxuICAgIH1cblxuICB9XG5cbiAgY2xlYXJGaWx0ZXJGb3JtID0gKCkgPT4ge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyRm9ybSkge1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmZpbHRlckZvcm0pLmZvckVhY2goa2V5ID0+IHtcblxuICAgICAgICB0aGlzLmZpbHRlckZvcm1ba2V5XSA9IHVuZGVmaW5lZDtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgb25DbGlja0luZm8oKSB7XG4gICAgY29uc29sZS5sb2coJ29uIGNsaWNrIGluZm8uIE5vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgLypcbiAgICogYXBwZW5kVG9DdXJyZW50RmlsdGVyc1xuICAgKlxuICAgKiBBcHBlbmQgYSBmaWx0ZXIgdG8gdGhlIGN1cnJlbnQgZmlsdGVyIGdyb3Vwc1xuICAgKi9cbiAgYXBwZW5kVG9DdXJyZW50RGVjRmlsdGVyR3JvdXBzKHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSkge1xuXG4gICAgY29uc3QgZmlsdGVyID0ge1xuICAgICAgJ3Byb3BlcnR5JzogcHJvcGVydHlOYW1lLFxuICAgICAgJ3ZhbHVlJzogcHJvcGVydHlWYWx1ZSxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpIHtcblxuICAgICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicy5mb3JFYWNoKChmaWx0ZXJHcm91cCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlckV4aXN0c0luVGhpc0dyb3VwID0gZmlsdGVyR3JvdXAuZmlsdGVycy5maW5kKGZpbHRlckdyb3VwRmlsdGVyID0+IGZpbHRlckdyb3VwRmlsdGVyLnByb3BlcnR5ID09PSBmaWx0ZXIucHJvcGVydHkpO1xuXG4gICAgICAgIGlmICghZmlsdGVyRXhpc3RzSW5UaGlzR3JvdXApIHtcblxuICAgICAgICAgIGZpbHRlckdyb3VwLmZpbHRlcnMucHVzaChmaWx0ZXIpO1xuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gW3sgZmlsdGVyczogW2ZpbHRlcl0gfV07XG5cbiAgICB9XG5cbiAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicztcblxuICAgIHRoaXMucmVhY2FsY3VsYXRlQW5kRW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICB9XG5cbiAgY2xvc2VGaWx0ZXJzKCkge1xuXG4gICAgdGhpcy5lZGl0aW9uR3JvdXBJbmRleCA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gZmFsc2U7XG5cbiAgICB0aGlzLnNob3dTZWFyY2hJbnB1dCA9IGZhbHNlO1xuXG4gIH1cblxuICBwcml2YXRlIHJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQgPSBmYWxzZSkge1xuXG4gICAgdGhpcy5lbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcyhyZWNvdW50KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNQZXJzaXN0ZW5jZSkge1xuXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5KClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2VGaWx0ZXJzKCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICAgICAgICB9KTtcblxuXG4gICAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZWxvYWRGb3JtV2l0aEdpdmVuRGVjRmlsdGVyR3JvdXBlKGZpbHRlcnMpIHtcblxuICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICBmaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcblxuICAgICAgaWYgKGZpbHRlci52YWx1ZSkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRm9ybVtmaWx0ZXIucHJvcGVydHldID0gZmlsdGVyLnZhbHVlO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHRoaXMub3BlbkZpbHRlcnMoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuRmlsdGVycygpIHtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gdHJ1ZTtcblxuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gdHJ1ZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVBZHZhbmNlZEZpbHRlcigpIHtcblxuICAgIGlmICh0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQuZm9ybSA9IHRoaXMuZmlsdGVyRm9ybTtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5vblNlYXJjaCA9IHRoaXMub25TZWFyY2g7XG5cbiAgICAgIHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQub25DbGVhciA9IHRoaXMuY2xlYXJGaWx0ZXJGb3JtO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VhcmNoLnN1YnNjcmliZShmaWx0ZXJFdmVudCA9PiB7XG5cbiAgICAgICAgaWYgKGZpbHRlckV2ZW50LmNoaWxkcmVuKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSAnY29sbGFwc2UnO1xuXG4gICAgICAgICAgdGhpcy5jaGlsZHJlbkZpbHRlcnMgPSBmaWx0ZXJFdmVudC5jaGlsZHJlbjtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXJNb2RlID0gJ3RhYnMnO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMudGFic0ZpbHRlciA9IGZpbHRlckV2ZW50LmZpbHRlcnM7XG5cbiAgICAgICAgdGhpcy5lbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwcyh0aGlzLmlzSXRGaXJzdExvYWQgfHwgZmlsdGVyRXZlbnQucmVjb3VudCk7XG5cbiAgICAgICAgdGhpcy5pc0l0Rmlyc3RMb2FkID0gZmFsc2U7XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFic0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy50YWJzRmlsdGVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpIHtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXIgPSBbXTtcblxuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicyA9IFtdO1xuXG4gICAgaWYgKHRoaXMuaW5uZXJEZWNGaWx0ZXJHcm91cHMgJiYgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5sZW5ndGgpIHtcblxuICAgICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5mb3JFYWNoKChmaWx0ZXJHcm91cDogeyBmaWx0ZXJzOiBhbnlbXSB9KSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5ID0ge1xuICAgICAgICAgIGZpbHRlcnM6IGZpbHRlckdyb3VwLmZpbHRlcnMuc2xpY2UoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcbiAgICAgICAgICBmaWx0ZXJHcm91cENvcHkuZmlsdGVycy5wdXNoKC4uLnRoaXMudGFic0ZpbHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RmlsdGVyLnB1c2goZmlsdGVyR3JvdXBDb3B5KTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJHcm91cC5maWx0ZXJzLnNsaWNlKClcbiAgICAgICAgfTtcblxuICAgICAgICBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMucHVzaChmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcblxuICAgICAgY3VycmVudEZpbHRlci5wdXNoKHsgZmlsdGVyczogdGhpcy50YWJzRmlsdGVyIH0pO1xuXG4gICAgfVxuXG4gICAgdGhpcy5maWx0ZXJHcm91cHMgPSBjdXJyZW50RmlsdGVyLmxlbmd0aCA/IGN1cnJlbnRGaWx0ZXIgOiB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gY3VycmVudEZpbHRlcldpdGhvdXRUYWJzLmxlbmd0aCA/IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qXG4gICAqIGVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQgPSBmYWxzZSkge1xuXG4gICAgbGV0IGZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyR3JvdXBzID8gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlckdyb3VwcykpIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICB0aGlzLm1vdW50Q3VycmVudERlY0ZpbHRlckdyb3VwcygpO1xuXG4gICAgICBpZiAodGhpcy5wcmVTZWFyY2gpIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMgPSB0aGlzLnByZVNlYXJjaChmaWx0ZXJHcm91cHMpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VhcmNoLmVtaXQoe1xuICAgICAgICBmaWx0ZXJHcm91cHM6IGZpbHRlckdyb3VwcyxcbiAgICAgICAgcmVjb3VudDogcmVjb3VudCxcbiAgICAgICAgZmlsdGVyTW9kZTogdGhpcy5maWx0ZXJNb2RlLFxuICAgICAgICBjaGlsZHJlbjogdGhpcy5jaGlsZHJlbkZpbHRlcnMsXG4gICAgICB9KTtcblxuICAgICAgcmVzKCk7XG5cbiAgICB9KTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBhY3RCeUNsaWNrUG9zaXRpb25cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZGV0ZWN0XG4gICAqL1xuICBwcml2YXRlIGFjdEJ5Q2xpY2tQb3NpdGlvbiA9ICgkZXZlbnQpID0+IHtcblxuICAgIGlmIChldmVudCAmJiBldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGNsaWNrZWRJbnNpZGVGaWx0ZXIgPSAkZXZlbnRbJ3BhdGgnXS5maW5kKHBhdGggPT4ge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAke3BhdGhbJ2NsYXNzTmFtZSddfWAgfHwgJyc7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlV3JhcHBlciA9IGNsYXNzTmFtZS5pbmRleE9mKHRoaXMuY2xpY2thYmxlQ29udGFpbmVyQ2xhc3MpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3B0aW9uID0gY2xhc3NOYW1lLmluZGV4T2YoJ21hdC1vcHRpb24nKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZURhdGVQaWNrZXIgPSBjbGFzc05hbWUuaW5kZXhPZignbWF0LWRhdGVwaWNrZXItY29udGVudCcpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlT3ZlcmxheUNvbnRhaW5lciA9IGNsYXNzTmFtZS5pbmRleE9mKCdjZGstb3ZlcmxheS1jb250YWluZXInKSA+PSAwO1xuXG4gICAgICAgIHJldHVybiBpbnNpZGVXcmFwcGVyIHx8IGluc2lkZU9wdGlvbiB8fCBpbnNpZGVEYXRlUGlja2VyIHx8IGluc2lkZU92ZXJsYXlDb250YWluZXI7XG5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWNsaWNrZWRJbnNpZGVGaWx0ZXIpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaENsaWNrKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5hY3RCeUNsaWNrUG9zaXRpb24sIHRydWUpO1xuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nQ2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nQ2xpY2soKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmFjdEJ5Q2xpY2tQb3NpdGlvbiwgdHJ1ZSk7XG4gIH1cblxuICAvKlxuICAgKiBjb21wb25lbnRUYWJOYW1lXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGNvbXBvbmVudEZpbHRlck5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICctZmlsdGVyJztcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVXJsRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVXJsRmlsdGVyKCkge1xuXG4gICAgaWYgKCF0aGlzLmhhc1BlcnNpc3RlbmNlKSB7XG5cbiAgICAgIHJldHVybjtcblxuICAgIH1cblxuICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgICAuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcblxuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cbiAgICAgICAgICBpZiAodGhpcy5uYW1lKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGJhc2U2NEZpbHRlciA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudEZpbHRlck5hbWUoKV07XG5cbiAgICAgICAgICAgIGlmIChiYXNlNjRGaWx0ZXIpIHtcblxuICAgICAgICAgICAgICBpZiAoYmFzZTY0RmlsdGVyICE9PSB0aGlzLmN1cnJlbnRVcmxFbmNvZGVkRmlsdGVyKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmdldEpzb25Gcm9tQmFzZTY0RmlsdGVyKGJhc2U2NEZpbHRlcik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gZmlsdGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VudEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25TZWFyY2goKTtcblxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sIDEwKTtcblxuICAgICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVXJsRmlsdGVyKCkge1xuXG4gICAgaWYgKHRoaXMud2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb24pIHtcblxuICAgICAgdGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZWZyZXNoRmlsdGVySW5VcmxRdWVyeVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWZyZXNoRmlsdGVySW5VcmxRdWVyeSgpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgY29uc3QgZmlsdGVyQmFzZTY0ID0gdGhpcy5nZXRCYXNlNjRGaWx0ZXJGcm9tRGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgICAgIHRoaXMuc2V0RmlsdGVySW5VcmxRdWVyeShmaWx0ZXJCYXNlNjQpLnRoZW4ocmVzLCByZWopO1xuXG4gICAgfSk7XG5cblxuICB9XG5cbiAgLypcbiAgICogc2V0RmlsdGVySW5VcmxRdWVyeVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRGaWx0ZXJJblVybFF1ZXJ5KGZpbHRlcikge1xuXG4gICAgdGhpcy5jdXJyZW50VXJsRW5jb2RlZEZpbHRlciA9IGZpbHRlcjtcblxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcblxuICAgIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50RmlsdGVyTmFtZSgpXSA9IGZpbHRlcjtcblxuICAgIHJldHVybiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4nXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLCBxdWVyeVBhcmFtczogcXVlcnlQYXJhbXMsIHJlcGxhY2VVcmw6IHRydWUgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1VybEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRCYXNlNjRGaWx0ZXJGcm9tRGVjRmlsdGVyR3JvdXBzKCkge1xuICAgIGlmICh0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzICYmIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBiYXNlNjRGaWx0ZXIgPSBidG9hKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzKSkpO1xuICAgICAgY29uc3QgYmFzZUZpbHRlcldpdGhvdXRFcXVhbFNpZ24gPSBiYXNlNjRGaWx0ZXIucmVwbGFjZSgvPS9nLCAnJyk7XG4gICAgICByZXR1cm4gYmFzZUZpbHRlcldpdGhvdXRFcXVhbFNpZ247IC8vIHJlbW92ZXMgPSBiZWZvciBlc2V0IHRoZSBmaWx0ZXJcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICogU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkwMjA0MDkvaXMtaXQtb2stdG8tcmVtb3ZlLXRoZS1lcXVhbC1zaWducy1mcm9tLWEtYmFzZTY0LXN0cmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRKc29uRnJvbUJhc2U2NEZpbHRlcihiYXNlNjRGaWx0ZXIpIHtcbiAgICBjb25zdCBiYXNlNjRQYWRMZW4gPSAoYmFzZTY0RmlsdGVyLmxlbmd0aCAlIDQpID4gMCA/IDQgLSAoYmFzZTY0RmlsdGVyLmxlbmd0aCAlIDQpIDogMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFzZTY0UGFkTGVuOyBpKyspIHtcbiAgICAgIGJhc2U2NEZpbHRlciArPSAnPSc7IC8vIGFkZCA9IGJlZm9yZSByZWFkZCB0aGUgZmlsdGVyXG4gICAgfVxuXG4gICAgbGV0IGZpbHRlck9iamVjdDtcblxuICAgIHRyeSB7XG4gICAgICBmaWx0ZXJPYmplY3QgPSBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudChhdG9iKGJhc2U2NEZpbHRlcikpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgbXNnID0gJ0xpc3RGaWx0ZXJDb21wb25lbnQ6OiBGYWlsZWQgdG8gcGFyc2UgdGhlIGZpbHRlci4gVGhlIHZhbHVlIGlzIG5vdCB2YWxpZCBhbmQgdGhlIGZpbHRlciB3YXMgcmVtb3ZlZC4gRmlsdGVyIHZhbHVlOiAnO1xuICAgICAgY29uc29sZS5lcnJvcihtc2csIGJhc2U2NEZpbHRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U2NEZpbHRlciA/IGZpbHRlck9iamVjdCA6IHVuZGVmaW5lZDtcbiAgfVxuXG59XG4iXX0=