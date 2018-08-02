/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecListTabsFilterComponent } from './../list-tabs-filter/list-tabs-filter.component';
import { DecListAdvancedFilterComponent } from './../list-advanced-filter/list-advanced-filter.component';
export class DecListFilterComponent {
    /**
     * @param {?} route
     * @param {?} router
     */
    constructor(route, router) {
        this.route = route;
        this.router = router;
        this.filterForm = {
            search: undefined
        };
        this.isItFirstLoad = true;
        this.clickableContainerClass = 'list-filter-wrapper';
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
        this.reloadCountReport = (payload) => {
            if (this.tabsFilterComponent) {
                this.tabsFilterComponent.reloadCountReport(payload);
            }
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
        return new Promise((res, rej) => {
            this.mountCurrentDecFilterGroups();
            if (this.preSearch) {
                this.filterGroups = this.preSearch(this.filterGroups);
            }
            this.search.emit({
                filterGroups: this.filterGroups,
                recount: recount
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
                        if (base64Filter !== this.currentBase64Filter) {
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
        this.currentBase64Filter = filter;
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

  <ng-content select="dec-list-tabs-filter"></ng-content>
</div>
`,
                styles: [`.list-filter-wrapper{margin:0 0 16px;position:relative}.list-filter-wrapper .mat-icon{color:#999}.list-filter-wrapper .search-term-input{width:500px;margin-right:8px}.list-filter-wrapper .inline-form{display:inline-block}.list-filter-wrapper .advanced-search-container{position:absolute;top:74px;z-index:1;right:30px;width:552px}.list-filter-wrapper .advanced-search-container.remove-button-enabled{right:62px;width:551px}.list-filter-wrapper .advanced-search-container .btn-close-advanced-search{cursor:pointer}.search-container .input-search-container{transition:all .3s ease;overflow:hidden;width:40px;height:50px}.search-container .input-search-container.active{background:#f8f8fa;color:#999;width:600px}.search-container .input-search-container.active .btn-open-advanced-search{display:inline}.search-container .input-search-container .input-search{width:100%}.search-container .input-search-container .input-search input{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;width:100%;vertical-align:bottom}.search-container .input-search-container .btn-open-advanced-search{display:none}.search-container .btn-clear-search{padding-right:15px;cursor:pointer;color:#999;width:90px}.search-container .btn-info,.search-container .btn-toogle-search{font-size:21px;cursor:pointer;height:21px;color:#999}.search-container .bar-h{border-right:2px solid #d0d0d0;height:21px;margin:auto 0;display:inline-block}`]
            },] },
];
/** @nocollapse */
DecListFilterComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router }
];
DecListFilterComponent.propDecorators = {
    preSearch: [{ type: Input }],
    showInfoButton: [{ type: Input }],
    hasPersistence: [{ type: Input }],
    search: [{ type: Output, args: ['search',] }],
    inputSearch: [{ type: ViewChild, args: ['inputSearch',] }],
    tabsFilterComponent: [{ type: ContentChild, args: [DecListTabsFilterComponent,] }],
    advancedFilterComponent: [{ type: ContentChild, args: [DecListAdvancedFilterComponent,] }]
};
function DecListFilterComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecListFilterComponent.prototype.count;
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
    DecListFilterComponent.prototype.clickableContainerClass;
    /** @type {?} */
    DecListFilterComponent.prototype.innerDecFilterGroups;
    /** @type {?} */
    DecListFilterComponent.prototype.currentBase64Filter;
    /** @type {?} */
    DecListFilterComponent.prototype.tabsFilterSubscription;
    /** @type {?} */
    DecListFilterComponent.prototype.watchUrlFilterSubscription;
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
    DecListFilterComponent.prototype.reloadCountReport;
    /** @type {?} */
    DecListFilterComponent.prototype.clearFilterForm;
    /** @type {?} */
    DecListFilterComponent.prototype.actByClickPosition;
    /** @type {?} */
    DecListFilterComponent.prototype.route;
    /** @type {?} */
    DecListFilterComponent.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xpc3QvbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDOUYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUF5RzFHLE1BQU07Ozs7O0lBOENKLFlBQW9CLEtBQXFCLEVBQ3JCO1FBREEsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU07MEJBMUNSO1lBQ2hCLE1BQU0sRUFBRSxTQUFTO1NBQ2xCOzZCQVFlLElBQUk7dUNBT2MscUJBQXFCOzhCQWM3QixJQUFJO3NCQUVnQixJQUFJLFlBQVksRUFBTzt3QkEyQzFELENBQUMsaUJBQWlCLEdBQUcsSUFBSSxFQUFFLEVBQUU7WUFFdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBRXpDLHVCQUFNLGlCQUFpQixHQUFHO29CQUV4QixPQUFPLEVBQUUsRUFBRTtpQkFFWixDQUFDO2dCQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFFekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFD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U0FBQyxRQUFROzBCQUVmLFNBQVMsU0FBQyxhQUFhO2tDQUV2QixZQUFZLFNBQUMsMEJBQTBCO3NDQUV2QyxZQUFZLFNBQUMsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9saXN0LXRhYnMtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RBZHZhbmNlZEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vLi4vbGlzdC1hZHZhbmNlZC1maWx0ZXIvbGlzdC1hZHZhbmNlZC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjTGlzdFByZVNlYXJjaCB9IGZyb20gJy4vLi4vbGlzdC5tb2RlbHMnO1xuaW1wb3J0IHsgRmlsdGVyR3JvdXBzIH0gZnJvbSAnLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbCc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbGlzdC1maWx0ZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJsaXN0LWZpbHRlci13cmFwcGVyXCI+XG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3cgd3JhcFwiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiPlxuICAgIDwhLS1cbiAgICAgIENvdW50ZXJcbiAgICAtLT5cbiAgICA8ZGl2IGZ4RmxleD1cIjMwXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY291bnQgPj0gMCAmJiAhbG9hZGluZ1wiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID09PSAwXCIgY2xhc3M9XCJkZWMtYm9keS1zdHJvbmdcIj57eyBcImxhYmVsLnJlY29yZC1ub3QtZm91bmRcIiB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA9PT0gMVwiIGNsYXNzPVwiZGVjLWJvZHktc3Ryb25nXCI+e3sgXCJsYWJlbC5vbmUtcmVjb3JkLWZvdW5kXCIgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiY291bnQgPiAxXCIgY2xhc3M9XCJkZWMtYm9keS1zdHJvbmdcIj4ge3sgXCJsYWJlbC5yZWNvcmRzLWZvdW5kXCIgfCB0cmFuc2xhdGU6e2NvdW50OmNvdW50fSB9fTwvc3Bhbj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBmeEZsZXg9XCI3MFwiIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuXG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiIGNsYXNzPVwic2VhcmNoLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGNsYXNzPVwiaW5wdXQtc2VhcmNoLWNvbnRhaW5lclwiIFtjbGFzcy5hY3RpdmVdPVwic2hvd1NlYXJjaElucHV0XCI+XG4gICAgICAgICAgICA8IS0tIGdhcCAtLT5cbiAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0bi10b29nbGUtc2VhcmNoXCI+XG4gICAgICAgICAgICAgIDxtYXQtaWNvbiAoY2xpY2spPVwidG9nZ2xlU2VhcmNoSW5wdXQoKVwiPnNlYXJjaDwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8Zm9ybSBmeEZsZXggcm9sZT1cImZvcm1cIiAoc3VibWl0KT1cIm9uU2VhcmNoKClcIj5cbiAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMTZweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBjbGFzcz1cImlucHV0LXNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmFyLWhcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPGlucHV0IGZ4RmxleCAjaW5wdXRTZWFyY2ggbmFtZT1cInNlYXJjaFwiIFsobmdNb2RlbCldPVwiZmlsdGVyRm9ybS5zZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiYWR2YW5jZWRGaWx0ZXJDb21wb25lbnRcIiBjbGFzcz1cImNsaWNrXCIgKGNsaWNrKT1cInRvZ2dsZUFkdmFuY2VkRmlsdGVyKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVjLXNtYWxsIGJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaFwiPnt7XCJsYWJlbC5hZHZhbmNlZC1vcHRpb25zXCIgfCB0cmFuc2xhdGV9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8IS0tZ2FwLS0+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLVJlZnJlc2ggc2VhcmNoLS0+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIj5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ0bi1pbmZvIG1hcmdpbi1pY29uXCIgKGNsaWNrKT1cIm9uU2VhcmNoKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5yZWZyZXNoPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tQ2xlYXIgZmlsdGVycy0tPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgKm5nSWY9XCJmaWx0ZXJHcm91cHNXaXRob3V0VGFicz8ubGVuZ3RoXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4taW5mb1wiIChjbGljayk9XCJvbkNsZWFyKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgKm5nSWY9XCJzaG93SW5mb0J1dHRvblwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWluZm9cIiAoY2xpY2spPVwib25DbGlja0luZm8oKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uPmluZm9fb3V0bGluZTwvbWF0LWljb24+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cblxuICA8ZGl2ICpuZ0lmPVwic2hvd0FkdmFuY2VkRmlsdGVyXCI+XG5cbiAgICA8bWF0LWNhcmQgY2xhc3M9XCJhZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyXCIgW25nQ2xhc3NdPVwieydyZW1vdmUtYnV0dG9uLWVuYWJsZWQnOiBmaWx0ZXJHcm91cHNXaXRob3V0VGFicz8ubGVuZ3RofVwiPlxuXG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cblxuICAgICAgICA8YSAoY2xpY2spPVwiY2xvc2VGaWx0ZXJzKClcIiBjbGFzcz1cImJ0bi1jbG9zZS1hZHZhbmNlZC1zZWFyY2hcIj5cblxuICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jbG9zZTwvaT5cblxuICAgICAgICA8L2E+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2PlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWFkdmFuY2VkLWZpbHRlclwiPjwvbmctY29udGVudD5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L21hdC1jYXJkPlxuXG4gIDwvZGl2PlxuXG4gIDxkZWMtbGlzdC1hY3RpdmUtZmlsdGVyLXJlc3VtZVxuICAgICpuZ0lmPVwiZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM/Lmxlbmd0aFwiXG4gICAgW2ZpbHRlckdyb3Vwc109XCJmaWx0ZXJHcm91cHNXaXRob3V0VGFic1wiXG4gICAgKHJlbW92ZSk9XCJyZW1vdmVEZWNGaWx0ZXJHcm91cCgkZXZlbnQpXCJcbiAgICAoZWRpdCk9XCJlZGl0RGVjRmlsdGVyR3JvdXAoJGV2ZW50KVwiPjwvZGVjLWxpc3QtYWN0aXZlLWZpbHRlci1yZXN1bWU+XG5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtdGFicy1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubGlzdC1maWx0ZXItd3JhcHBlcnttYXJnaW46MCAwIDE2cHg7cG9zaXRpb246cmVsYXRpdmV9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLm1hdC1pY29ue2NvbG9yOiM5OTl9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLnNlYXJjaC10ZXJtLWlucHV0e3dpZHRoOjUwMHB4O21hcmdpbi1yaWdodDo4cHh9Lmxpc3QtZmlsdGVyLXdyYXBwZXIgLmlubGluZS1mb3Jte2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo3NHB4O3otaW5kZXg6MTtyaWdodDozMHB4O3dpZHRoOjU1MnB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyLnJlbW92ZS1idXR0b24tZW5hYmxlZHtyaWdodDo2MnB4O3dpZHRoOjU1MXB4fS5saXN0LWZpbHRlci13cmFwcGVyIC5hZHZhbmNlZC1zZWFyY2gtY29udGFpbmVyIC5idG4tY2xvc2UtYWR2YW5jZWQtc2VhcmNoe2N1cnNvcjpwb2ludGVyfS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVye3RyYW5zaXRpb246YWxsIC4zcyBlYXNlO292ZXJmbG93OmhpZGRlbjt3aWR0aDo0MHB4O2hlaWdodDo1MHB4fS5zZWFyY2gtY29udGFpbmVyIC5pbnB1dC1zZWFyY2gtY29udGFpbmVyLmFjdGl2ZXtiYWNrZ3JvdW5kOiNmOGY4ZmE7Y29sb3I6Izk5OTt3aWR0aDo2MDBweH0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lci5hY3RpdmUgLmJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaHtkaXNwbGF5OmlubGluZX0uc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoLWNvbnRhaW5lciAuaW5wdXQtc2VhcmNoe3dpZHRoOjEwMCV9LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaCBpbnB1dHtmb250OmluaGVyaXQ7YmFja2dyb3VuZDowIDA7Y29sb3I6Y3VycmVudENvbG9yO2JvcmRlcjpub25lO291dGxpbmU6MDtwYWRkaW5nOjA7d2lkdGg6MTAwJTt2ZXJ0aWNhbC1hbGlnbjpib3R0b219LnNlYXJjaC1jb250YWluZXIgLmlucHV0LXNlYXJjaC1jb250YWluZXIgLmJ0bi1vcGVuLWFkdmFuY2VkLXNlYXJjaHtkaXNwbGF5Om5vbmV9LnNlYXJjaC1jb250YWluZXIgLmJ0bi1jbGVhci1zZWFyY2h7cGFkZGluZy1yaWdodDoxNXB4O2N1cnNvcjpwb2ludGVyO2NvbG9yOiM5OTk7d2lkdGg6OTBweH0uc2VhcmNoLWNvbnRhaW5lciAuYnRuLWluZm8sLnNlYXJjaC1jb250YWluZXIgLmJ0bi10b29nbGUtc2VhcmNoe2ZvbnQtc2l6ZToyMXB4O2N1cnNvcjpwb2ludGVyO2hlaWdodDoyMXB4O2NvbG9yOiM5OTl9LnNlYXJjaC1jb250YWluZXIgLmJhci1oe2JvcmRlci1yaWdodDoycHggc29saWQgI2QwZDBkMDtoZWlnaHQ6MjFweDttYXJnaW46YXV0byAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgY291bnQ6IG51bWJlcjtcbiAgc2hvd1NlYXJjaElucHV0OiBib29sZWFuO1xuICBzaG93QWR2YW5jZWRGaWx0ZXI6IGJvb2xlYW47XG4gIGZpbHRlckZvcm06IGFueSA9IHtcbiAgICBzZWFyY2g6IHVuZGVmaW5lZFxuICB9O1xuICBmaWx0ZXJHcm91cHM6IEZpbHRlckdyb3VwcztcbiAgZmlsdGVyR3JvdXBzV2l0aG91dFRhYnM6IEZpbHRlckdyb3VwcztcbiAgY3VycmVudFN0YXR1c0ZpbHRlcmVkOiBzdHJpbmc7XG4gIHRhYnNGaWx0ZXI6IGFueTtcbiAgZWRpdGlvbkdyb3VwSW5kZXg6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBsb2FkaW5nOiBib29sZWFuO1xuICBpc0l0Rmlyc3RMb2FkID0gdHJ1ZTtcblxuICAvKlxuICAgKiBjbGlja2FibGVDb250YWluZXJDbGFzc1xuICAgKlxuICAgKiBXaGVyZSB0aGUgY2xpY2sgd2F0Y2hlciBzaG91bGQgYmUgbGlzdGVuaW5nXG4gICAqL1xuICBwcml2YXRlIGNsaWNrYWJsZUNvbnRhaW5lckNsYXNzID0gJ2xpc3QtZmlsdGVyLXdyYXBwZXInO1xuXG4gIHByaXZhdGUgaW5uZXJEZWNGaWx0ZXJHcm91cHM6IGFueVtdO1xuXG4gIHByaXZhdGUgY3VycmVudEJhc2U2NEZpbHRlcjogc3RyaW5nO1xuXG4gIHByaXZhdGUgdGFic0ZpbHRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgd2F0Y2hVcmxGaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBASW5wdXQoKSBwcmVTZWFyY2g6IERlY0xpc3RQcmVTZWFyY2g7XG5cbiAgQElucHV0KCkgc2hvd0luZm9CdXR0b247XG5cbiAgQElucHV0KCkgaGFzUGVyc2lzdGVuY2UgPSB0cnVlO1xuXG4gIEBPdXRwdXQoJ3NlYXJjaCcpIHNlYXJjaDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAVmlld0NoaWxkKCdpbnB1dFNlYXJjaCcpIGlucHV0U2VhcmNoO1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdFRhYnNGaWx0ZXJDb21wb25lbnQpIHRhYnNGaWx0ZXJDb21wb25lbnQ6IERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50KSBhZHZhbmNlZEZpbHRlckNvbXBvbmVudDogRGVjTGlzdEFkdmFuY2VkRmlsdGVyQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhdGNoVGFic0ZpbHRlcigpO1xuICAgIHRoaXMud2F0Y2hDbGljaygpO1xuICAgIHRoaXMud2F0Y2hVcmxGaWx0ZXIoKTtcbiAgICB0aGlzLmNvbmZpZ3VyZUFkdmFuY2VkRmlsdGVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ0NsaWNrKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJzRmlsdGVyKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdVcmxGaWx0ZXIoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlYXJjaElucHV0KCkge1xuICAgIHRoaXMuc2hvd1NlYXJjaElucHV0ID0gIXRoaXMuc2hvd1NlYXJjaElucHV0O1xuICAgIGlmICghdGhpcy5zaG93U2VhcmNoSW5wdXQpIHtcbiAgICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0U2VhcmNoLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0sIDE4MCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQWR2YW5jZWRGaWx0ZXIoJGV2ZW50KSB7XG5cbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnNob3dBZHZhbmNlZEZpbHRlciA9ICF0aGlzLnNob3dBZHZhbmNlZEZpbHRlcjtcblxuICB9XG5cbiAgb25TZWFyY2ggPSAoYXBwZW5kQ3VycmVudEZvcm0gPSB0cnVlKSA9PiB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXJGb3JtICYmIGFwcGVuZEN1cnJlbnRGb3JtKSB7XG5cbiAgICAgIGNvbnN0IG5ld0RlY0ZpbHRlckdyb3VwID0ge1xuXG4gICAgICAgIGZpbHRlcnM6IFtdXG5cbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybSkuZm9yRWFjaChrZXkgPT4ge1xuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlckZvcm1ba2V5XSkge1xuXG4gICAgICAgICAgY29uc3QgZmlsdGVyID0ge3Byb3BlcnR5OiBrZXksIHZhbHVlOiB0aGlzLmZpbHRlckZvcm1ba2V5XX07XG5cbiAgICAgICAgICBuZXdEZWNGaWx0ZXJHcm91cC5maWx0ZXJzLnB1c2goZmlsdGVyKTtcblxuICAgICAgICB9XG5cblxuICAgICAgfSk7XG5cbiAgICAgIGlmIChuZXdEZWNGaWx0ZXJHcm91cC5maWx0ZXJzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICBpZiAodGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcykge1xuXG4gICAgICAgICAgaWYgKHRoaXMuZWRpdGlvbkdyb3VwSW5kZXggPj0gMCkge1xuXG4gICAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzW3RoaXMuZWRpdGlvbkdyb3VwSW5kZXhdID0gbmV3RGVjRmlsdGVyR3JvdXA7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLnB1c2gobmV3RGVjRmlsdGVyR3JvdXApO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gW25ld0RlY0ZpbHRlckdyb3VwXTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMucmVhY2FsY3VsYXRlQW5kRW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHModHJ1ZSk7XG5cbiAgfVxuXG4gIG9uQ2xlYXIoKSB7XG5cbiAgICB0aGlzLmNsb3NlRmlsdGVycygpO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHMgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuY2xlYXJGaWx0ZXJGb3JtKCk7XG5cbiAgICB0aGlzLm9uU2VhcmNoKCk7XG5cbiAgfVxuXG4gIHJlbW92ZURlY0ZpbHRlckdyb3VwKGdyb3VwSW5kZXgpIHtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXJHcm91cHMuZmlsdGVyKChncm91cCwgaW5kZXgpID0+IGluZGV4ICE9PSBncm91cEluZGV4KTtcblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzLmZpbHRlcigoZ3JvdXAsIGluZGV4KSA9PiBpbmRleCAhPT0gZ3JvdXBJbmRleCk7XG5cbiAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gdGhpcy5pbm5lckRlY0ZpbHRlckdyb3Vwcy5maWx0ZXIoKGdyb3VwLCBpbmRleCkgPT4gaW5kZXggIT09IGdyb3VwSW5kZXgpO1xuXG4gICAgdGhpcy5vblNlYXJjaCh0cnVlKTtcblxuICB9XG5cbiAgZWRpdERlY0ZpbHRlckdyb3VwKGdyb3VwSW5kZXgpIHtcblxuICAgIHRoaXMuZWRpdGlvbkdyb3VwSW5kZXggPSBncm91cEluZGV4O1xuXG4gICAgY29uc3QgdG9FZGl0RGVjRmlsdGVyR3JvdXAgPSB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzW2dyb3VwSW5kZXhdO1xuXG4gICAgaWYgKHRvRWRpdERlY0ZpbHRlckdyb3VwICYmIHRvRWRpdERlY0ZpbHRlckdyb3VwLmZpbHRlcnMubGVuZ3RoID4gMCkge1xuXG4gICAgICB0aGlzLnJlbG9hZEZvcm1XaXRoR2l2ZW5EZWNGaWx0ZXJHcm91cGUodG9FZGl0RGVjRmlsdGVyR3JvdXAuZmlsdGVycyk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHJlbG9hZENvdW50UmVwb3J0ID0gKHBheWxvYWQpID0+IHtcblxuICAgIGlmICh0aGlzLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgdGhpcy50YWJzRmlsdGVyQ29tcG9uZW50LnJlbG9hZENvdW50UmVwb3J0KHBheWxvYWQpO1xuXG4gICAgfVxuXG4gIH1cblxuICBjbGVhckZpbHRlckZvcm0gPSAoKSA9PiB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXJGb3JtKSB7XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVyRm9ybSkuZm9yRWFjaChrZXkgPT4ge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyRm9ybVtrZXldID0gdW5kZWZpbmVkO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuXG4gIH1cblxuICBvbkNsaWNrSW5mbygpIHtcbiAgICBjb25zb2xlLmxvZygnb24gY2xpY2sgaW5mby4gTm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICAvKlxuICAgKiBhcHBlbmRUb0N1cnJlbnRGaWx0ZXJzXG4gICAqXG4gICAqIEFwcGVuZCBhIGZpbHRlciB0byB0aGUgY3VycmVudCBmaWx0ZXIgZ3JvdXBzXG4gICAqL1xuICBhcHBlbmRUb0N1cnJlbnREZWNGaWx0ZXJHcm91cHMocHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKSB7XG5cbiAgICBjb25zdCBmaWx0ZXIgPSB7XG4gICAgICAncHJvcGVydHknOiBwcm9wZXJ0eU5hbWUsXG4gICAgICAndmFsdWUnOiBwcm9wZXJ0eVZhbHVlLFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicykge1xuXG4gICAgICB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzLmZvckVhY2goKGZpbHRlckdyb3VwKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyRXhpc3RzSW5UaGlzR3JvdXAgPSBmaWx0ZXJHcm91cC5maWx0ZXJzLmZpbmQoZmlsdGVyR3JvdXBGaWx0ZXIgPT4gZmlsdGVyR3JvdXBGaWx0ZXIucHJvcGVydHkgPT09IGZpbHRlci5wcm9wZXJ0eSk7XG5cbiAgICAgICAgaWYgKCFmaWx0ZXJFeGlzdHNJblRoaXNHcm91cCkge1xuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKGZpbHRlcik7XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSBbe2ZpbHRlcnM6IFtmaWx0ZXJdfV07XG5cbiAgICB9XG5cbiAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicztcblxuICAgIHRoaXMucmVhY2FsY3VsYXRlQW5kRW1pdEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICB9XG5cbiAgY2xvc2VGaWx0ZXJzKCkge1xuXG4gICAgdGhpcy5lZGl0aW9uR3JvdXBJbmRleCA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuc2hvd0FkdmFuY2VkRmlsdGVyID0gZmFsc2U7XG5cbiAgICB0aGlzLnNob3dTZWFyY2hJbnB1dCA9IGZhbHNlO1xuXG4gIH1cblxuICBwcml2YXRlIHJlYWNhbGN1bGF0ZUFuZEVtaXRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKHJlY291bnQgPSBmYWxzZSkge1xuXG4gICAgdGhpcy5lbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcyhyZWNvdW50KVxuICAgIC50aGVuKCgpID0+IHtcblxuICAgICAgaWYgKCF0aGlzLmhhc1BlcnNpc3RlbmNlKSB7XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVmcmVzaEZpbHRlckluVXJsUXVlcnkoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgIHRoaXMuY2xvc2VGaWx0ZXJzKCk7XG5cbiAgICAgICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgICAgfSk7XG5cblxuICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIHJlbG9hZEZvcm1XaXRoR2l2ZW5EZWNGaWx0ZXJHcm91cGUoZmlsdGVycykge1xuXG4gICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgIGZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuXG4gICAgICBpZiAoZmlsdGVyLnZhbHVlKSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJGb3JtW2ZpbHRlci5wcm9wZXJ0eV0gPSBmaWx0ZXIudmFsdWU7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgdGhpcy5vcGVuRmlsdGVycygpO1xuXG4gIH1cblxuICBwcml2YXRlIG9wZW5GaWx0ZXJzKCkge1xuXG4gICAgdGhpcy5zaG93QWR2YW5jZWRGaWx0ZXIgPSB0cnVlO1xuXG4gICAgdGhpcy5zaG93U2VhcmNoSW5wdXQgPSB0cnVlO1xuXG4gIH1cblxuICBwcml2YXRlIGNvbmZpZ3VyZUFkdmFuY2VkRmlsdGVyKCkge1xuXG4gICAgaWYgKHRoaXMuYWR2YW5jZWRGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5mb3JtID0gdGhpcy5maWx0ZXJGb3JtO1xuXG4gICAgICB0aGlzLmFkdmFuY2VkRmlsdGVyQ29tcG9uZW50Lm9uU2VhcmNoID0gdGhpcy5vblNlYXJjaDtcblxuICAgICAgdGhpcy5hZHZhbmNlZEZpbHRlckNvbXBvbmVudC5vbkNsZWFyID0gdGhpcy5jbGVhckZpbHRlckZvcm07XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJzRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcbiAgICAgIHRoaXMudGFic0ZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMudGFic0ZpbHRlckNvbXBvbmVudC5zZWFyY2guc3Vic2NyaWJlKGZpbHRlckV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy50YWJzRmlsdGVyID0gZmlsdGVyRXZlbnQuZmlsdGVycztcbiAgICAgICAgdGhpcy5lbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwcyh0aGlzLmlzSXRGaXJzdExvYWQgfHwgZmlsdGVyRXZlbnQucmVjb3VudCk7XG4gICAgICAgIHRoaXMuaXNJdEZpcnN0TG9hZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJzRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLnRhYnNGaWx0ZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFic0ZpbHRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW91bnRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCkge1xuXG4gICAgY29uc3QgY3VycmVudEZpbHRlciA9IFtdO1xuXG4gICAgY29uc3QgY3VycmVudEZpbHRlcldpdGhvdXRUYWJzID0gW107XG5cbiAgICBpZiAodGhpcy5pbm5lckRlY0ZpbHRlckdyb3VwcyAmJiB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLmxlbmd0aCkge1xuXG4gICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzLmZvckVhY2goKGZpbHRlckdyb3VwOiB7ZmlsdGVyczogYW55W119KSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyR3JvdXBDb3B5ID0ge1xuICAgICAgICAgIGZpbHRlcnM6IGZpbHRlckdyb3VwLmZpbHRlcnMuc2xpY2UoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcbiAgICAgICAgICBmaWx0ZXJHcm91cENvcHkuZmlsdGVycy5wdXNoKC4uLnRoaXMudGFic0ZpbHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RmlsdGVyLnB1c2goZmlsdGVyR3JvdXBDb3B5KTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyA9IHtcbiAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJHcm91cC5maWx0ZXJzLnNsaWNlKClcbiAgICAgICAgfTtcblxuICAgICAgICBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMucHVzaChmaWx0ZXJHcm91cENvcHlXaXRob3V0VGFicyk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLnRhYnNGaWx0ZXIpIHtcblxuICAgICAgY3VycmVudEZpbHRlci5wdXNoKHtmaWx0ZXJzOiB0aGlzLnRhYnNGaWx0ZXJ9KTtcblxuICAgIH1cblxuICAgIHRoaXMuZmlsdGVyR3JvdXBzID0gY3VycmVudEZpbHRlci5sZW5ndGggPyBjdXJyZW50RmlsdGVyIDogdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IGN1cnJlbnRGaWx0ZXJXaXRob3V0VGFicy5sZW5ndGggPyBjdXJyZW50RmlsdGVyV2l0aG91dFRhYnMgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKlxuICAgKiBlbWl0Q3VycmVudERlY0ZpbHRlckdyb3Vwc1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbWl0Q3VycmVudERlY0ZpbHRlckdyb3VwcyhyZWNvdW50ID0gZmFsc2UpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgdGhpcy5tb3VudEN1cnJlbnREZWNGaWx0ZXJHcm91cHMoKTtcblxuICAgICAgaWYgKHRoaXMucHJlU2VhcmNoKSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJHcm91cHMgPSB0aGlzLnByZVNlYXJjaCh0aGlzLmZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5zZWFyY2guZW1pdCh7XG4gICAgICAgIGZpbHRlckdyb3VwczogdGhpcy5maWx0ZXJHcm91cHMsXG4gICAgICAgIHJlY291bnQ6IHJlY291bnRcbiAgICAgIH0pO1xuXG4gICAgICByZXMoKTtcblxuICAgIH0pO1xuXG5cbiAgfVxuXG4gIC8qXG4gICAqIGFjdEJ5Q2xpY2tQb3NpdGlvblxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlY3RcbiAgICovXG4gIHByaXZhdGUgYWN0QnlDbGlja1Bvc2l0aW9uID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50WydwYXRoJ10pIHtcblxuICAgICAgY29uc3QgY2xpY2tlZEluc2lkZUZpbHRlciA9ICRldmVudFsncGF0aCddLmZpbmQocGF0aCA9PiB7XG5cbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYCR7cGF0aFsnY2xhc3NOYW1lJ119YCB8fCAnJztcblxuICAgICAgICBjb25zdCBpbnNpZGVXcmFwcGVyID0gY2xhc3NOYW1lLmluZGV4T2YodGhpcy5jbGlja2FibGVDb250YWluZXJDbGFzcykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVPcHRpb24gPSBjbGFzc05hbWUuaW5kZXhPZignbWF0LW9wdGlvbicpID49IDA7XG5cbiAgICAgICAgY29uc3QgaW5zaWRlRGF0ZVBpY2tlciA9IGNsYXNzTmFtZS5pbmRleE9mKCdtYXQtZGF0ZXBpY2tlci1jb250ZW50JykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVPdmVybGF5Q29udGFpbmVyID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Nkay1vdmVybGF5LWNvbnRhaW5lcicpID49IDA7XG5cbiAgICAgICAgcmV0dXJuIGluc2lkZVdyYXBwZXIgfHwgaW5zaWRlT3B0aW9uIHx8IGluc2lkZURhdGVQaWNrZXIgfHwgaW5zaWRlT3ZlcmxheUNvbnRhaW5lcjtcblxuICAgICAgfSk7XG5cbiAgICAgIGlmICghY2xpY2tlZEluc2lkZUZpbHRlcikgeyAvLyBhdm9pZCBjbG9zaW5nIGZpbHRlciBmcm9tIGFueSBvcGVuIGRpYWxvZ1xuXG4gICAgICAgIHRoaXMuY2xvc2VGaWx0ZXJzKCk7XG5cbiAgICAgICAgdGhpcy5jbGVhckZpbHRlckZvcm0oKTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB3YXRjaENsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoQ2xpY2soKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmFjdEJ5Q2xpY2tQb3NpdGlvbiwgdHJ1ZSk7XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdDbGljaygpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYWN0QnlDbGlja1Bvc2l0aW9uLCB0cnVlKTtcbiAgfVxuXG4gIC8qXG4gICAqIGNvbXBvbmVudFRhYk5hbWVcbiAgICpcbiAgICovXG4gIHByaXZhdGUgY29tcG9uZW50RmlsdGVyTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy1maWx0ZXInO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hVcmxGaWx0ZXIoKSB7XG5cbiAgICBpZiAoIXRoaXMuaGFzUGVyc2lzdGVuY2UpIHtcblxuICAgICAgcmV0dXJuO1xuXG4gICAgfVxuXG4gICAgdGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMucm91dGUucXVlcnlQYXJhbXNcbiAgICAuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcblxuICAgICAgY29uc3QgaW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgIGlmICh0aGlzLm5hbWUpIHtcblxuICAgICAgICAgIGNvbnN0IGJhc2U2NEZpbHRlciA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudEZpbHRlck5hbWUoKV07XG5cbiAgICAgICAgICBpZiAoYmFzZTY0RmlsdGVyKSB7XG5cbiAgICAgICAgICAgIGlmIChiYXNlNjRGaWx0ZXIgIT09IHRoaXMuY3VycmVudEJhc2U2NEZpbHRlcikge1xuXG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuZ2V0SnNvbkZyb21CYXNlNjRGaWx0ZXIoYmFzZTY0RmlsdGVyKTtcblxuICAgICAgICAgICAgICB0aGlzLmlubmVyRGVjRmlsdGVyR3JvdXBzID0gZmlsdGVyO1xuXG4gICAgICAgICAgICAgIHRoaXMubW91bnRDdXJyZW50RGVjRmlsdGVyR3JvdXBzKCk7XG5cbiAgICAgICAgICAgICAgdGhpcy5vblNlYXJjaCgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9LCAxMCk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1VybEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy53YXRjaFVybEZpbHRlclN1YnNjcmlwdGlvbikge1xuXG4gICAgICB0aGlzLndhdGNoVXJsRmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlZnJlc2hGaWx0ZXJJblVybFF1ZXJ5KCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICBjb25zdCBmaWx0ZXJCYXNlNjQgPSB0aGlzLmdldEJhc2U2NEZpbHRlckZyb21EZWNGaWx0ZXJHcm91cHMoKTtcblxuICAgICAgdGhpcy5zZXRGaWx0ZXJJblVybFF1ZXJ5KGZpbHRlckJhc2U2NCkudGhlbihyZXMsIHJlaik7XG5cbiAgICB9KTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBzZXRGaWx0ZXJJblVybFF1ZXJ5XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldEZpbHRlckluVXJsUXVlcnkoZmlsdGVyKSB7XG5cbiAgICB0aGlzLmN1cnJlbnRCYXNlNjRGaWx0ZXIgPSBmaWx0ZXI7XG5cbiAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG5cbiAgICBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudEZpbHRlck5hbWUoKV0gPSBmaWx0ZXI7XG5cbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdVcmxGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZ2V0QmFzZTY0RmlsdGVyRnJvbURlY0ZpbHRlckdyb3VwcygpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicyAmJiB0aGlzLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgYmFzZTY0RmlsdGVyID0gYnRvYShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodGhpcy5maWx0ZXJHcm91cHNXaXRob3V0VGFicykpKTtcbiAgICAgIGNvbnN0IGJhc2VGaWx0ZXJXaXRob3V0RXF1YWxTaWduID0gYmFzZTY0RmlsdGVyLnJlcGxhY2UoLz0vZywgJycpO1xuICAgICAgcmV0dXJuIGJhc2VGaWx0ZXJXaXRob3V0RXF1YWxTaWduOyAvLyByZW1vdmVzID0gYmVmb3IgZXNldCB0aGUgZmlsdGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVXJsRmlsdGVyXG4gICAqXG4gICAqIFNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MDIwNDA5L2lzLWl0LW9rLXRvLXJlbW92ZS10aGUtZXF1YWwtc2lnbnMtZnJvbS1hLWJhc2U2NC1zdHJpbmdcbiAgICovXG4gIHByaXZhdGUgZ2V0SnNvbkZyb21CYXNlNjRGaWx0ZXIoYmFzZTY0RmlsdGVyKSB7XG4gICAgY29uc3QgYmFzZTY0UGFkTGVuID0gKGJhc2U2NEZpbHRlci5sZW5ndGggJSA0KSA+IDAgPyA0IC0gKGJhc2U2NEZpbHRlci5sZW5ndGggJSA0KSA6IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhc2U2NFBhZExlbjsgaSsrKSB7XG4gICAgICBiYXNlNjRGaWx0ZXIgKz0gJz0nOyAvLyBhZGQgPSBiZWZvcmUgcmVhZGQgdGhlIGZpbHRlclxuICAgIH1cblxuICAgIGxldCBmaWx0ZXJPYmplY3Q7XG5cbiAgICB0cnkge1xuICAgICAgZmlsdGVyT2JqZWN0ID0gSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQoYXRvYihiYXNlNjRGaWx0ZXIpKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdMaXN0RmlsdGVyQ29tcG9uZW50OjogRmFpbGVkIHRvIHBhcnNlIHRoZSBmaWx0ZXIuIFRoZSB2YWx1ZSBpcyBub3QgdmFsaWQgYW5kIHRoZSBmaWx0ZXIgd2FzIHJlbW92ZWQuIEZpbHRlciB2YWx1ZTogJztcbiAgICAgIGNvbnNvbGUuZXJyb3IobXNnLCBiYXNlNjRGaWx0ZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBiYXNlNjRGaWx0ZXIgPyBmaWx0ZXJPYmplY3QgOiB1bmRlZmluZWQ7XG4gIH1cblxufVxuIl19