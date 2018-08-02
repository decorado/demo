/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { DecListGridComponent } from './list-grid/list-grid.component';
import { DecListTableComponent } from './list-table/list-table.component';
import { DecListFilterComponent } from './list-filter/list-filter.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { DecApiService } from './../../services/api/decora-api.service';
export class DecListComponent {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
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
                const /** @type {?} */ selectedTab = this.filter.tabsFilterComponent.selectedTab();
                if (selectedTab && selectedTab.listMode) {
                    listMode = selectedTab.listMode;
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
        if (this.filter) {
            this.filter.reloadCountReport(this.payload);
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
     * @param {?=} clearAndReloadReport
     * @return {?}
     */
    loadReport(clearAndReloadReport) {
        return new Promise((res, rej) => {
            if (clearAndReloadReport && this.rows) {
                this.setRows(this.rows);
            }
            this.clearAndReloadReport = clearAndReloadReport;
            this.loading = true;
            if (this.endpoint) {
                const /** @type {?} */ filterGroups = this.filter ? this.filter.filterGroups : undefined;
                const /** @type {?} */ payload = {};
                payload.limit = this.limit;
                let /** @type {?} */ selectedTab;
                if (this.filter && this.filter.tabsFilterComponent) {
                    selectedTab = this.filter.tabsFilterComponent.selectedTab();
                }
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
                this.payload = payload;
                this.filterData.next({ endpoint: this.endpoint, payload: payload, cbk: res, clear: clearAndReloadReport });
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
            const /** @type {?} */ payloadWithSearchableProperties = this.getPayloadWithSearchTransformedIntoSearchableProperties();
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
     * @return {?}
     */
    getPayloadWithSearchTransformedIntoSearchableProperties() {
        const /** @type {?} */ payloadCopy = Object.assign({}, this.payload);
        if (payloadCopy.filterGroups && this.searchableProperties) {
            payloadCopy.filterGroups = [...this.payload.filterGroups];
            const /** @type {?} */ filterGroupThatContainsBasicSearch = this.getFilterGroupThatContainsTheBasicSearch(payloadCopy.filterGroups);
            if (filterGroupThatContainsBasicSearch) {
                this.removeFilterGroup(payloadCopy.filterGroups, filterGroupThatContainsBasicSearch);
                this.appendFilterGroupsBasedOnSearchableProperties(filterGroupThatContainsBasicSearch, payloadCopy);
            }
            return payloadCopy;
        }
        else {
            return this.payload;
        }
    }
    /**
     * @param {?} filterGroupsModel
     * @param {?} payload
     * @return {?}
     */
    appendFilterGroupsBasedOnSearchableProperties(filterGroupsModel, payload) {
        const /** @type {?} */ basicSearch = filterGroupsModel.filters.find(filter => filter.property === 'search');
        const /** @type {?} */ basicSearchIndex = filterGroupsModel.filters.indexOf(basicSearch);
        this.searchableProperties.forEach(property => {
            const /** @type {?} */ newFilterGroup = {
                filters: [...filterGroupsModel.filters]
            };
            newFilterGroup.filters[basicSearchIndex] = {
                property: property,
                value: basicSearch.value
            };
            payload.filterGroups.push(newFilterGroup);
        });
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
            const /** @type {?} */ basicSerchFilter = filterGroup.filters.find(filter => filter.property === 'search');
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
                this.loadReport(true)
                    .then((res) => {
                    if (event.recount) {
                        this.reloadCountReport();
                    }
                });
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
                template: `<div class="list-component-wrapper">

  <div *ngIf="filter">
    <ng-content select="dec-list-filter"></ng-content>
  </div>

  <div *ngIf="report">

    <div fxLayout="column" fxLayoutGap="16px">

      <div fxFlex class="text-right" *ngIf="tableAndGridAreSet()">
        <button type="button" mat-icon-button (click)="toggleListMode()">
          <mat-icon title="Switch to table mode" aria-label="Switch to table mode" color="primary" contrastFontWithBg *ngIf="listMode === 'grid'">view_headline</mat-icon>
          <mat-icon title="Switch to grid mode" aria-label="Switch to grid mode" color="primary" contrastFontWithBg *ngIf="listMode === 'table'">view_module</mat-icon>
        </button>
      </div>

      <div fxFlex>
        <div *ngIf="listMode == 'grid' then gridTemplate else listTemplate"></div>
      </div>

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
`,
                styles: [`.list-footer{font-size:14px;text-align:center}.list-component-wrapper{min-height:72px}.text-right{text-align:right}.loading-spinner-wrapper{padding:32px}`]
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
function DecListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecListComponent.prototype.report;
    /** @type {?} */
    DecListComponent.prototype.isLastPage;
    /** @type {?} */
    DecListComponent.prototype.filterData;
    /** @type {?} */
    DecListComponent.prototype._loading;
    /** @type {?} */
    DecListComponent.prototype.clearAndReloadReport;
    /** @type {?} */
    DecListComponent.prototype.filterSubscription;
    /** @type {?} */
    DecListComponent.prototype.reactiveReport;
    /** @type {?} */
    DecListComponent.prototype.reactiveReportSubscription;
    /** @type {?} */
    DecListComponent.prototype.scrollableContainer;
    /** @type {?} */
    DecListComponent.prototype.scrollEventEmiter;
    /** @type {?} */
    DecListComponent.prototype.scrollEventEmiterSubscription;
    /** @type {?} */
    DecListComponent.prototype.tabsChangeSubscription;
    /** @type {?} */
    DecListComponent.prototype.tableSortSubscription;
    /** @type {?} */
    DecListComponent.prototype.payload;
    /** @type {?} */
    DecListComponent.prototype._endpoint;
    /** @type {?} */
    DecListComponent.prototype.customFetchMethod;
    /** @type {?} */
    DecListComponent.prototype.columnsSortConfig;
    /** @type {?} */
    DecListComponent.prototype.disableShowMoreButton;
    /** @type {?} */
    DecListComponent.prototype._name;
    /** @type {?} */
    DecListComponent.prototype.limit;
    /** @type {?} */
    DecListComponent.prototype.scrollableContainerClass;
    /** @type {?} */
    DecListComponent.prototype.searchableProperties;
    /** @type {?} */
    DecListComponent.prototype.showFooter;
    /** @type {?} */
    DecListComponent.prototype.postSearch;
    /** @type {?} */
    DecListComponent.prototype.rowClick;
    /** @type {?} */
    DecListComponent.prototype.grid;
    /** @type {?} */
    DecListComponent.prototype.table;
    /** @type {?} */
    DecListComponent.prototype._filter;
    /** @type {?} */
    DecListComponent.prototype.listMode;
    /** @type {?} */
    DecListComponent.prototype.getListMode;
    /** @type {?} */
    DecListComponent.prototype.actByScrollPosition;
    /** @type {?} */
    DecListComponent.prototype.emitScrollEvent;
    /** @type {?} */
    DecListComponent.prototype.service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNySCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQWMsZUFBZSxFQUFnQixPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBNEV4RSxNQUFNOzs7O0lBMlVKLFlBQ1U7UUFBQSxZQUFPLEdBQVAsT0FBTzswQkF6UnlCLElBQUksT0FBTyxFQUFjO3dCQU9oRCxJQUFJO2lDQTBDSyxJQUFJLFlBQVksRUFBTzs7Ozs7O3FCQXdIbEMsRUFBRTs7Ozs7O3dDQU9pQixxQkFBcUI7Ozs7OzswQkFjbkMsSUFBSTs7Ozs7OzBCQU9ILElBQUksWUFBWSxFQUFPOzs7Ozs7d0JBT04sSUFBSSxZQUFZLEVBQU87Ozs7OzsyQkErQ3hDLEdBQUcsRUFBRTtZQUUxQixxQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUU3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FB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U0FBQyxzQkFBc0I7dUJBaUJuQyxLQUFLOzBCQU9MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGVjTGlzdEdyaWRDb21wb25lbnR9IGZyb20gJy4vbGlzdC1ncmlkL2xpc3QtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHtEZWNMaXN0VGFibGVDb21wb25lbnR9IGZyb20gJy4vbGlzdC10YWJsZS9saXN0LXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyQ29tcG9uZW50fSBmcm9tICcuL2xpc3QtZmlsdGVyL2xpc3QtZmlsdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IERlY0xpc3RGZXRjaE1ldGhvZCB9IGZyb20gJy4vbGlzdC5tb2RlbHMnO1xuaW1wb3J0IHsgRmlsdGVyRGF0YSwgRGVjRmlsdGVyLCBGaWx0ZXJHcm91cHMsIEZpbHRlckdyb3VwIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGlzdC1jb21wb25lbnQtd3JhcHBlclwiPlxuXG4gIDxkaXYgKm5nSWY9XCJmaWx0ZXJcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJyZXBvcnRcIj5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cblxuICAgICAgPGRpdiBmeEZsZXggY2xhc3M9XCJ0ZXh0LXJpZ2h0XCIgKm5nSWY9XCJ0YWJsZUFuZEdyaWRBcmVTZXQoKVwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInRvZ2dsZUxpc3RNb2RlKClcIj5cbiAgICAgICAgICA8bWF0LWljb24gdGl0bGU9XCJTd2l0Y2ggdG8gdGFibGUgbW9kZVwiIGFyaWEtbGFiZWw9XCJTd2l0Y2ggdG8gdGFibGUgbW9kZVwiIGNvbG9yPVwicHJpbWFyeVwiIGNvbnRyYXN0Rm9udFdpdGhCZyAqbmdJZj1cImxpc3RNb2RlID09PSAnZ3JpZCdcIj52aWV3X2hlYWRsaW5lPC9tYXQtaWNvbj5cbiAgICAgICAgICA8bWF0LWljb24gdGl0bGU9XCJTd2l0Y2ggdG8gZ3JpZCBtb2RlXCIgYXJpYS1sYWJlbD1cIlN3aXRjaCB0byBncmlkIG1vZGVcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgKm5nSWY9XCJsaXN0TW9kZSA9PT0gJ3RhYmxlJ1wiPnZpZXdfbW9kdWxlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJsaXN0TW9kZSA9PSAnZ3JpZCcgdGhlbiBncmlkVGVtcGxhdGUgZWxzZSBsaXN0VGVtcGxhdGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIEZPT1RFUiBDT05URU5UIC0tPlxuICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93Rm9vdGVyICYmICFsb2FkaW5nIHRoZW4gZm9vdGVyVGVtcGxhdGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIExPQURJTkcgU1BJTk5FUiAtLT5cbiAgICAgIDxkaXYgZnhGbGV4ICpuZ0lmPVwibG9hZGluZ1wiIGNsYXNzPVwidGV4dC1jZW50ZXIgbG9hZGluZy1zcGlubmVyLXdyYXBwZXJcIj5cbiAgICAgICAgPGRlYy1zcGlubmVyPjwvZGVjLXNwaW5uZXI+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSBMT0FEIE1PUkUgQlVUVE9OIC0tPlxuICAgICAgPGRpdiBmeEZsZXggKm5nSWY9XCIhaXNMYXN0UGFnZSAmJiAhbG9hZGluZyAmJiAhZGlzYWJsZVNob3dNb3JlQnV0dG9uXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwic2hvd01vcmUoKVwiPnt7J2xhYmVsLnNob3ctbW9yZScgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuPC9kaXY+XG5cbjwhLS0gR1JJRCBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjZ3JpZFRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1ncmlkXCI+PC9uZy1jb250ZW50PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUQUJMRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjbGlzdFRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC10YWJsZVwiPjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gRk9PVEVSIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNmb290ZXJUZW1wbGF0ZT5cblxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgPHAgY2xhc3M9XCJsaXN0LWZvb3RlclwiPlxuICAgIHt7ICdsYWJlbC5hbW91bnQtbG9hZGVkLW9mLXRvdGFsJyB8XG4gICAgICB0cmFuc2xhdGU6e1xuICAgICAgICBsb2FkZWQ6IHJlcG9ydD8ucmVzdWx0Py5yb3dzPy5sZW5ndGgsXG4gICAgICAgIHRvdGFsOiByZXBvcnQ/LnJlc3VsdD8uY291bnRcbiAgICAgIH1cbiAgICB9fVxuICA8L3A+XG5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtgLmxpc3QtZm9vdGVye2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyfS5saXN0LWNvbXBvbmVudC13cmFwcGVye21pbi1oZWlnaHQ6NzJweH0udGV4dC1yaWdodHt0ZXh0LWFsaWduOnJpZ2h0fS5sb2FkaW5nLXNwaW5uZXItd3JhcHBlcntwYWRkaW5nOjMycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcblxuICAvKlxuICAgKiBsb2FkaW5nXG4gICAqXG4gICAqXG4gICAqL1xuICBzZXQgbG9hZGluZyh2KSB7XG5cbiAgICB0aGlzLl9sb2FkaW5nID0gdjtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5sb2FkaW5nID0gdjtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGxvYWRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gIH1cblxuICAvKlxuICAgKiBmaWx0ZXJHcm91cHNcbiAgICpcbiAgICpcbiAgICovXG4gIGdldCBmaWx0ZXJHcm91cHMoKTogRmlsdGVyR3JvdXBzIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHMgOiBbXTtcbiAgfVxuXG4gIC8qXG4gICAqIHJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcmVwb3J0O1xuXG4gIC8qXG4gICAqIGlzTGFzdFBhZ2VcbiAgICpcbiAgICpcbiAgICovXG4gIGlzTGFzdFBhZ2U6IGJvb2xlYW47XG5cbiAgLypcbiAgICogZmlsdGVyRGF0YVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJEYXRhOiBTdWJqZWN0PEZpbHRlckRhdGE+ID0gbmV3IFN1YmplY3Q8RmlsdGVyRGF0YT4oKTtcblxuICAvKlxuICAgKiBfbG9hZGluZztcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2xvYWRpbmcgPSB0cnVlO1xuXG4gIC8qXG4gICAqIGNsZWFyQW5kUmVsb2FkUmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGNsZWFyQW5kUmVsb2FkUmVwb3J0O1xuXG4gIC8qXG4gICAqIGZpbHRlclN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiByZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWFjdGl2ZVJlcG9ydDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIC8qXG4gICAqIHJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogc2Nyb2xsYWJsZUNvbnRhaW5lclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxhYmxlQ29udGFpbmVyOiBFbGVtZW50O1xuXG4gIC8qXG4gICAqIHNjcm9sbEV2ZW50RW1pdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbEV2ZW50RW1pdGVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiB0YWJzQ2hhbmdlU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHRhYnNDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiB0YWJsZVNvcnRTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdGFibGVTb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogcGF5bG9hZFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBwYXlsb2FkOiBEZWNGaWx0ZXI7XG5cbiAgLypcbiAgICogX2VuZHBvaW50IGludGVybmFsbFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfZW5kcG9pbnQ6IHN0cmluZztcblxuICAvKlxuICAgKiBjdXN0b21GZXRjaE1ldGhvZFxuICAgKlxuICAgKiBtZXRob2QgdXNlZCB0byBmZXRjaCBkYXRhIGZyb20gYmFjay1lbmRcbiAgICovXG4gIEBJbnB1dCgpIGN1c3RvbUZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2Q7XG5cbiAgLypcbiAgICogY29sdW1uc1NvcnRDb25maWdcbiAgICpcbiAgICogdXNlZCB0byBnZXQgYSBzb3J0ZWQgbGlzdCBmcm9tIGJhY2tlbmRcbiAgICogY2FuIGJlIHBhc2VkIHZpYSBhdHRyaWJ1dGUgdG8gc29ydCB0aGUgZmlyc3QgbG9hZFxuICAgKi9cbiAgQElucHV0KCkgY29sdW1uc1NvcnRDb25maWc7XG5cbiAgLypcbiAgICogZGlzYWJsZVNob3dNb3JlQnV0dG9uXG4gICAqXG4gICAqIHVzZWQgdG8gaGlkZSB0aGUgc2hvdyBtb3JlIGJ1dHRvblxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZVNob3dNb3JlQnV0dG9uOiBib29sZWFuO1xuXG4gIC8qXG4gICAqIGVuZHBvaW50XG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgZW5kcG9pbnQodjogc3RyaW5nKSB7XG5cbiAgICBpZiAodGhpcy5fZW5kcG9pbnQgIT09IHYpIHtcblxuICAgICAgdGhpcy5fZW5kcG9pbnQgPSAodlswXSAmJiB2WzBdID09PSAnLycpID8gdi5yZXBsYWNlKCcvJywgJycpIDogdjtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGVuZHBvaW50KCk6IHN0cmluZyB7XG5cbiAgICByZXR1cm4gdGhpcy5fZW5kcG9pbnQ7XG5cbiAgfVxuXG4gIC8qXG4gICAqIG5hbWVcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzZXQgbmFtZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fbmFtZSAhPT0gdikge1xuICAgICAgdGhpcy5fbmFtZSA9IHY7XG4gICAgICB0aGlzLnNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgLypcbiAgICogcm93c1xuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCdyb3dzJylcblxuICBzZXQgcm93cyhyb3dzKSB7XG4gICAgdGhpcy5zZXRSb3dzKHJvd3MpO1xuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVwb3J0ID8gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKlxuICAgKiBsaW1pdFxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgbGltaXQgPSAxMDtcblxuICAvKlxuICAgKiBzY3JvbGxhYmxlQ29udGFpbmVyQ2xhc3NcbiAgICpcbiAgICogV2hlcmUgdGhlIHNjcm9sbCB3YXRjaGVyIHNob3VsZCBiZSBsaXN0ZW5pbmdcbiAgICovXG4gIEBJbnB1dCgpIHNjcm9sbGFibGVDb250YWluZXJDbGFzcyA9ICdtYXQtc2lkZW5hdi1jb250ZW50JztcblxuICAvKlxuICAgKiBzZWFyY2hhYmxlUHJvcGVydGllc1xuICAgKlxuICAgKiBQcm9wZXJ0aWVzIHRvIGJlIHNlYXJjaGVkIHdoZW4gdXNpbmcgYmFzaWMgc2VhcmNoXG4gICAqL1xuICBASW5wdXQoKSBzZWFyY2hhYmxlUHJvcGVydGllczogc3RyaW5nW107XG5cbiAgLypcbiAgICogc2hvd0Zvb3RlclxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgc2hvd0Zvb3RlciA9IHRydWU7XG5cbiAgLypcbiAgICogcG9zdFNlYXJjaFxuICAgKlxuICAgKiBUaGlzIG1pZGRsZXdhcmUgaXMgdXNlZCB0byB0cmlnZ2VyIGV2ZW50cyBhZnRlciBldmVyeSBzZWFyY2hcbiAgICovXG4gIEBPdXRwdXQoKSBwb3N0U2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogcm93Q2xpY2tcbiAgICpcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBhIHJvdyBvciBjYXJkIGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiBncmlkXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RHcmlkQ29tcG9uZW50KSBncmlkOiBEZWNMaXN0R3JpZENvbXBvbmVudDtcblxuICAvKlxuICAgKiB0YWJsZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0VGFibGVDb21wb25lbnQpIHRhYmxlOiBEZWNMaXN0VGFibGVDb21wb25lbnQ7XG5cbiAgLypcbiAgICogZmlsdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9maWx0ZXI6IERlY0xpc3RGaWx0ZXJDb21wb25lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0RmlsdGVyQ29tcG9uZW50KVxuICBzZXQgZmlsdGVyKHY6IERlY0xpc3RGaWx0ZXJDb21wb25lbnQpIHtcbiAgICBpZiAodGhpcy5fZmlsdGVyICE9PSB2KSB7XG4gICAgICB0aGlzLl9maWx0ZXIgPSB2O1xuICAgICAgdGhpcy5zZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZmlsdGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXI7XG4gIH1cblxuICAvKlxuICAgKiBsaXN0TW9kZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgbGlzdE1vZGU7XG5cbiAgLypcbiAgICogZ2V0TGlzdE1vZGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIGdldExpc3RNb2RlID0gKCkgPT4ge1xuXG4gICAgbGV0IGxpc3RNb2RlID0gdGhpcy5saXN0TW9kZTtcblxuICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIGNvbnN0IHNlbGVjdGVkVGFiID0gdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5zZWxlY3RlZFRhYigpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWRUYWIgJiYgc2VsZWN0ZWRUYWIubGlzdE1vZGUpIHtcblxuICAgICAgICBsaXN0TW9kZSA9IHNlbGVjdGVkVGFiLmxpc3RNb2RlO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxpc3RNb2RlID0gdGhpcy50YWJsZSA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBsaXN0TW9kZTtcblxuICB9XG5cbiAgLypcbiAgICogbmdPbkluaXRcbiAgICpcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VydmljZTogRGVjQXBpU2VydmljZVxuICApIHsgfVxuXG4gIC8qXG4gICAqIG5nT25Jbml0XG4gICAqXG4gICAqIFN0YXJ0cyBhIGZyZXNoIGNvbXBvbmVudCBhbmQgcHJlcGFyZSBpdCB0byBydW5cbiAgICpcbiAgICogLSBTdGFydCB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3Vic2NyaWJlIHRvIHRoZSBSZWFjdGl2ZSBSZXBvcnRcbiAgICogLSBTdGFydCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gRW5zdXJlIHVuaXF1ZSBuYW1lXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndhdGNoRmlsdGVyRGF0YSgpO1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlTmFtZSgpO1xuICAgIHRoaXMuZGV0ZWN0TGlzdE1vZGVCYXNlZE9uR3JpZEFuZFRhYmxlUHJlc2VuY2UoKTtcbiAgfVxuXG4gIC8qXG4gICogbmdBZnRlclZpZXdJbml0XG4gICpcbiAgKiBXYWl0IGZvciB0aGUgc3ViY29tcG9uZW50cyB0byBzdGFydCBiZWZvcmUgcnVuIHRoZSBjb21wb25lbnRcbiAgKlxuICAqIC0gU3RhcnQgd2F0Y2hpbmcgRmlsdGVyXG4gICogLSBEbyB0aGUgZmlyc3QgbG9hZFxuICAqL1xuIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgIHRoaXMud2F0Y2hGaWx0ZXIoKTtcbiAgIHRoaXMuZG9GaXJzdExvYWQoKTtcbiAgIHRoaXMuZGV0ZWN0TGlzdE1vZGUoKTtcbiAgIHRoaXMud2F0Y2hUYWJzQ2hhbmdlKCk7XG4gICB0aGlzLndhdGNoVGFibGVTb3J0KCk7XG4gICB0aGlzLnJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpO1xuICAgdGhpcy53YXRjaFNjcm9sbCgpO1xuICAgdGhpcy53YXRjaFNjcm9sbEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgLypcbiAgICogbmdPbkRlc3Ryb3lcbiAgICpcbiAgICogRGVzdHJveSB3YXRjaGVyIHRvIGZyZWUgbWVlbW9yeSBhbmQgcmVtb3ZlIHVubmVjZXNzYXJ5IHRyaWdnZXJzXG4gICAqXG4gICAqIC0gVW5zdWJzY3JpYmUgZnJvbSB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3RvcCB3YXRjaGluZyB3aW5kb3cgU2Nyb2xsXG4gICAqIC0gU3RvcCB3YXRjaGluZyBGaWx0ZXJcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGwoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ0ZpbHRlcigpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFic0NoYW5nZSgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFibGVTb3J0KCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIHJlbG9hZENvdW50UmVwb3J0XG4gICAqXG4gICAqL1xuICByZWxvYWRDb3VudFJlcG9ydCgpIHtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5yZWxvYWRDb3VudFJlcG9ydCh0aGlzLnBheWxvYWQpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZW1vdmVJdGVtXG4gICAqXG4gICAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBsaXN0XG4gICAqL1xuICByZW1vdmVJdGVtKGlkKSB7XG5cbiAgICBjb25zdCBpdGVtID0gdGhpcy5yb3dzLmZpbmQoX2l0ZW0gPT4gX2l0ZW0uaWQgPT09IGlkKTtcblxuICAgIGlmIChpdGVtKSB7XG5cbiAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMucm93cy5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbUluZGV4ID49IDApIHtcblxuICAgICAgICB0aGlzLnJvd3Muc3BsaWNlKGl0ZW1JbmRleCwgMSk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmICh0aGlzLmVuZHBvaW50KSB7XG4gICAgICB0aGlzLnJlbG9hZENvdW50UmVwb3J0KCk7XG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZXN0YXJ0XG4gICAqXG4gICAqIENsZWFyIHRoZSBsaXN0IGFuZCByZWxvYWQgdGhlIGZpcnN0IHBhZ2VcbiAgICovXG4gIHJlc3RhcnQoKSB7XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNob3dNb3JlXG4gICAqXG4gICAqL1xuICBzaG93TW9yZSgpIHtcblxuICAgIHJldHVybiB0aGlzLmxvYWRSZXBvcnQoKTtcblxuICB9XG5cbiAgLypcbiAgICogdGFibGVBbmRHcmlkQXJlU2V0XG4gICAqXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZXJlIGFyZSBib3RoIEdSSUQgYW5kIFRBQkxFIGRlZmluaXRpb24gaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICB0YWJsZUFuZEdyaWRBcmVTZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpZCAmJiB0aGlzLnRhYmxlO1xuICB9XG5cbiAgLypcbiAgICogdG9nZ2xlTGlzdE1vZGVcbiAgICpcbiAgICogQ2hhbmdlcyBiZXR3ZWVuIEdSSUQgYW5kIFRBQkxFIHZpc3VhbGl6YXRvaW4gbW9kZXNcbiAgICovXG4gIHRvZ2dsZUxpc3RNb2RlKCkge1xuXG4gICAgdGhpcy5saXN0TW9kZSA9IHRoaXMubGlzdE1vZGUgPT09ICdncmlkJyA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgICBpZiAodGhpcy5saXN0TW9kZSA9PT0gJ3RhYmxlJykge1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICB0aGlzLnRhYmxlLnRhYmxlQ29tcG9uZW50LnJlY2FsY3VsYXRlKCk7XG5cbiAgICAgIH0sIDEpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBhY3RCeVNjcm9sbFBvc2l0aW9uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGRldGVjdCBpZiB0aGVyZSBpcyBzY3Jvb2xpbmcgYWN0aW9uIG9uIHdpbmRvdyB0byBmZXRjaCBhbmQgc2hvdyBtb3JlIHJvd3Mgd2hlbiB0aGUgc2Nyb2xsaW5nIGRvd24uXG4gICAqL1xuICBwcml2YXRlIGFjdEJ5U2Nyb2xsUG9zaXRpb24gPSAoJGV2ZW50KSA9PiB7XG5cbiAgICBpZiAoJGV2ZW50WydwYXRoJ10pIHtcblxuICAgICAgY29uc3QgZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MgPSAkZXZlbnRbJ3BhdGgnXS5maW5kKHBhdGggPT4ge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHBhdGhbJ2NsYXNzTmFtZSddIHx8ICcnO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZU92ZXJsYXkgPSBjbGFzc05hbWUuaW5kZXhPZignY2RrLW92ZXJsYXknKSA+PSAwO1xuXG4gICAgICAgIGNvbnN0IGluc2lkZUZ1bGxzY3JlYW5EaWFsb2dDb250YWluZXIgPSBjbGFzc05hbWUuaW5kZXhPZignZnVsbHNjcmVhbi1kaWFsb2ctY29udGFpbmVyJykgPj0gMDtcblxuICAgICAgICByZXR1cm4gaW5zaWRlT3ZlcmxheSB8fCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyO1xuXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFlbGVtZW50V2l0aENka092ZXJsYXlDbGFzcykgeyAvLyBhdm9pZCBjbG9zaW5nIGZpbHRlciBmcm9tIGFueSBvcGVuIGRpYWxvZ1xuXG4gICAgICAgIGlmICghdGhpcy5pc0xhc3RQYWdlKSB7XG5cbiAgICAgICAgICBjb25zdCB0YXJnZXQ6IGFueSA9ICRldmVudFsndGFyZ2V0J107XG5cbiAgICAgICAgICBjb25zdCBsaW1pdCA9IHRhcmdldC5zY3JvbGxIZWlnaHQgLSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKHRhcmdldC5zY3JvbGxUb3AgPj0gKGxpbWl0IC0gMTYpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd01vcmUoKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlXG4gICAqXG4gICAqIFNldCB0aGUgbGlzdCBtb2RlIGJhc2VkIG9uIGZpbHRlclRhYnMgY29uZmlndXJhdGlvbiBvciBjdXN0b20gZnVuY3Rpb24gb3ZlcnJpZGRlbiBieSBnZXRMaXN0TW9kZSBpbnB1dFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmdldExpc3RNb2RlKCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKClcbiAgICpcbiAgICogU2V0IHRoZSBsaXN0IG1vZGUgYmFzZWQgb24gZGVjbGFyYXRpb24gb2YgdGFibGUgYW5kIGdyaWQuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGJvb3Rhc3RyYXAgdGhlIGNvbXBvbmVudCB3aXRoIG9ubHkgZ3JpZCBvciBvbmx5IHRhYmxlXG4gICAqIFRoaXMgb25seSB3b3JrIGlmIG5vIG1vZGUgaXMgcHJvdmlkZWQgYnkgQElucHV0IG90aGVyd2lzZSB0aGUgQElucHV0IHZhbHVlIHdpbGwgYmUgdXNlZFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID8gdGhpcy5saXN0TW9kZSA6IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gIH1cblxuICAvKlxuICAgKiBlbWl0U2Nyb2xsRXZlbnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZW1pdFNjcm9sbEV2ZW50ID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCF0aGlzLmxvYWRpbmcpIHtcblxuICAgICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlci5lbWl0KCRldmVudCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGlzVGFic0ZpbHRlckRlZmluZWRcbiAgICpcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIFRhYnMgRmlsdGVyIGlzIGRlZmluZWQgaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICBwcml2YXRlIGlzVGFic0ZpbHRlckRlZmluZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZCgpIHtcbiAgICBpZiAodGhpcy5pc1RhYnNGaWx0ZXJEZWZpbmVkKCkpIHtcbiAgICAgIHRoaXMuZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpcnN0TG9hZExvY2FsbHkodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKSB7XG4gICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5kb0ZpcnN0TG9hZCgpO1xuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRMb2NhbGx5XG4gICAqXG4gICAqL1xuICBwcml2YXRlIGRvRmlyc3RMb2FkTG9jYWxseShyZWZyZXNoKSB7XG4gICAgdGhpcy5sb2FkUmVwb3J0KHJlZnJlc2gpO1xuICB9XG5cbiAgLypcbiAgICogZW5zdXJlVW5pcXVlTmFtZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVOYW1lKCkge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICBjb25zdCBlcnJvciA9ICdMaXN0Q29tcG9uZW50RXJyb3I6IFRoZSBsaXN0IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUgdG8gYmUgdXNlZCBpbiB1cmwgZmlsdGVyLidcbiAgICAgICsgJyBQbGVhc2UsIGVuc3VyZSB0aGF0IHlvdSBoYXZlIHBhc3NlZCBhbiB1bmlxdWUgbmFtbWUgdG8gdGhlIGNvbXBvbmVudC4nO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBsb2FkUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIGxvYWRSZXBvcnQoY2xlYXJBbmRSZWxvYWRSZXBvcnQ/OiBib29sZWFuKTogUHJvbWlzZTxhbnk+IHtcblxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICBpZiAoY2xlYXJBbmRSZWxvYWRSZXBvcnQgJiYgdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgdGhpcy5zZXRSb3dzKHRoaXMucm93cyk7XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5jbGVhckFuZFJlbG9hZFJlcG9ydCA9IGNsZWFyQW5kUmVsb2FkUmVwb3J0O1xuXG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICBpZiAodGhpcy5lbmRwb2ludCkge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyID8gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGNvbnN0IHBheWxvYWQ6IERlY0ZpbHRlciA9IHt9O1xuXG4gICAgICAgIHBheWxvYWQubGltaXQgPSB0aGlzLmxpbWl0O1xuXG4gICAgICAgIGxldCBzZWxlY3RlZFRhYjtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuICAgICAgICAgIHNlbGVjdGVkVGFiID0gdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5zZWxlY3RlZFRhYigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbHRlckdyb3Vwcykge1xuXG4gICAgICAgICAgcGF5bG9hZC5maWx0ZXJHcm91cHMgPSBmaWx0ZXJHcm91cHM7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnNTb3J0Q29uZmlnKSB7XG5cbiAgICAgICAgICBwYXlsb2FkLmNvbHVtbnMgPSB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNsZWFyQW5kUmVsb2FkUmVwb3J0ICYmIHRoaXMucmVwb3J0KSB7XG5cbiAgICAgICAgICBwYXlsb2FkLnBhZ2UgPSB0aGlzLnJlcG9ydC5wYWdlICsgMTtcblxuICAgICAgICAgIHBheWxvYWQubGltaXQgPSB0aGlzLnJlcG9ydC5saW1pdDtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZDtcblxuICAgICAgICB0aGlzLmZpbHRlckRhdGEubmV4dCh7IGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LCBwYXlsb2FkOiBwYXlsb2FkLCBjYms6IHJlcywgY2xlYXI6IGNsZWFyQW5kUmVsb2FkUmVwb3J0IH0pO1xuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QpIHtcblxuICAgICAgICB0aGlzLmZpbHRlckRhdGEubmV4dCgpO1xuXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnJvd3MpIHtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgIGlmICghdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgICAgIHJlaignTm8gZW5kcG9pbnQsIGN1c3RvbUZldGNoTWV0aG9kIG9yIHJvd3Mgc2V0Jyk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICB9LCAxKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cblxuICB9XG5cbiAgLypcbiAgICogc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpIHtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5uYW1lID0gdGhpcy5uYW1lO1xuXG5cbiAgICAgIGlmICh0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5uYW1lID0gdGhpcy5uYW1lO1xuXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZldGNoTWV0aG9kKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LmN1c3RvbUZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5zZXJ2aWNlID0gdGhpcy5zZXJ2aWNlO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogc2V0Um93c1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRSb3dzKHJvd3MgPSBbXSkge1xuXG4gICAgdGhpcy5yZXBvcnQgPSB7XG5cbiAgICAgIHBhZ2U6IDEsXG5cbiAgICAgIHJlc3VsdDoge1xuXG4gICAgICAgIHJvd3M6IHJvd3MsXG5cbiAgICAgICAgY291bnQ6IHJvd3MubGVuZ3RoXG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5kZXRlY3RMYXN0UGFnZShyb3dzLCByb3dzLmxlbmd0aCk7XG5cbiAgICB0aGlzLnVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5zY3JvbGxFdmVudEVtaXRlclxuICAgIC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDE1MCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKS5zdWJzY3JpYmUodGhpcy5hY3RCeVNjcm9sbFBvc2l0aW9uKTtcblxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlcigpIHtcblxuICAgIGlmICh0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uKSB7XG5cbiAgICAgIHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJEYXRhXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoRmlsdGVyRGF0YSgpIHtcbiAgICB0aGlzLnJlYWN0aXZlUmVwb3J0ID0gdGhpcy5maWx0ZXJEYXRhXG4gICAgLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMTUwKSwgLy8gYXZvaWQgbXVpbHRpcGxlIHJlcXVlc3Qgd2hlbiB0aGUgZmlsdGVyIG9yIHRhYiBjaGFuZ2UgdG9vIGZhc3RcbiAgICAgIHN3aXRjaE1hcCgoZmlsdGVyRGF0YTogRmlsdGVyRGF0YSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4odW5kZWZpbmVkKTtcblxuICAgICAgICBjb25zdCBmZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZCB8fCB0aGlzLnNlcnZpY2UuZ2V0O1xuXG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gZmlsdGVyRGF0YSA/IGZpbHRlckRhdGEuZW5kcG9pbnQgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3QgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcyA9IHRoaXMuZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcygpO1xuXG4gICAgICAgIGlmIChmaWx0ZXJEYXRhICYmIGZpbHRlckRhdGEuY2xlYXIpIHtcbiAgICAgICAgICB0aGlzLnNldFJvd3MoW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgZmV0Y2hNZXRob2QoZW5kcG9pbnQsIHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMpXG4gICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICAgIG9ic2VydmFibGUubmV4dChyZXMpO1xuXG4gICAgICAgICAgaWYgKGZpbHRlckRhdGEgJiYgZmlsdGVyRGF0YS5jYmspIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIHdhaXQgZm9yIHN1YnNjcmliZXJzIHRvIHJlZnJlc2ggdGhlaXIgcm93c1xuXG4gICAgICAgICAgICAgIGZpbHRlckRhdGEuY2JrKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcblxuICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICAgIH0pXG5cbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXlsb2FkV2l0aFNlYXJjaFRyYW5zZm9ybWVkSW50b1NlYXJjaGFibGVQcm9wZXJ0aWVzKCkge1xuXG4gICAgY29uc3QgcGF5bG9hZENvcHkgPSB7Li4udGhpcy5wYXlsb2FkfTtcblxuICAgIGlmIChwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMgJiYgdGhpcy5zZWFyY2hhYmxlUHJvcGVydGllcykge1xuXG4gICAgICBwYXlsb2FkQ29weS5maWx0ZXJHcm91cHMgPSBbLi4udGhpcy5wYXlsb2FkLmZpbHRlckdyb3Vwc107XG5cbiAgICAgIGNvbnN0IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2ggPSB0aGlzLmdldEZpbHRlckdyb3VwVGhhdENvbnRhaW5zVGhlQmFzaWNTZWFyY2gocGF5bG9hZENvcHkuZmlsdGVyR3JvdXBzKTtcblxuICAgICAgaWYgKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpIHtcblxuICAgICAgICB0aGlzLnJlbW92ZUZpbHRlckdyb3VwKHBheWxvYWRDb3B5LmZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCwgcGF5bG9hZENvcHkpO1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXlsb2FkQ29weTtcblxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIHRoaXMucGF5bG9hZDtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMoZmlsdGVyR3JvdXBzTW9kZWwsIHBheWxvYWQpIHtcblxuICAgIGNvbnN0IGJhc2ljU2VhcmNoID0gZmlsdGVyR3JvdXBzTW9kZWwuZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIucHJvcGVydHkgPT09ICdzZWFyY2gnKTtcblxuICAgIGNvbnN0IGJhc2ljU2VhcmNoSW5kZXggPSBmaWx0ZXJHcm91cHNNb2RlbC5maWx0ZXJzLmluZGV4T2YoYmFzaWNTZWFyY2gpO1xuXG4gICAgdGhpcy5zZWFyY2hhYmxlUHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcblxuICAgICAgY29uc3QgbmV3RmlsdGVyR3JvdXA6IEZpbHRlckdyb3VwID0ge1xuICAgICAgICBmaWx0ZXJzOiBbLi4uZmlsdGVyR3JvdXBzTW9kZWwuZmlsdGVyc11cbiAgICAgIH07XG5cbiAgICAgIG5ld0ZpbHRlckdyb3VwLmZpbHRlcnNbYmFzaWNTZWFyY2hJbmRleF0gPSB7XG4gICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgdmFsdWU6IGJhc2ljU2VhcmNoLnZhbHVlXG4gICAgICB9O1xuXG4gICAgICBwYXlsb2FkLmZpbHRlckdyb3Vwcy5wdXNoKG5ld0ZpbHRlckdyb3VwKTtcblxuICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUZpbHRlckdyb3VwKGZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCkge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaEluZGV4ID0gZmlsdGVyR3JvdXBzLmluZGV4T2YoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCk7XG5cbiAgICBmaWx0ZXJHcm91cHMuc3BsaWNlKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2hJbmRleCwgMSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsdGVyR3JvdXBUaGF0Q29udGFpbnNUaGVCYXNpY1NlYXJjaChmaWx0ZXJHcm91cHMpIHtcblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMuZmluZChmaWx0ZXJHcm91cCA9PiB7XG5cbiAgICAgIGNvbnN0IGJhc2ljU2VyY2hGaWx0ZXIgPSBmaWx0ZXJHcm91cC5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci5wcm9wZXJ0eSA9PT0gJ3NlYXJjaCcpO1xuXG4gICAgICByZXR1cm4gYmFzaWNTZXJjaEZpbHRlciA/IHRydWUgOiBmYWxzZTtcblxuICAgIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKSB7XG4gICAgdGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbiA9IHRoaXMucmVhY3RpdmVSZXBvcnRcbiAgICAucGlwZShcbiAgICAgIHRhcChyZXMgPT4ge1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSAmJiBkYXRhLnJlc3VsdCAmJiBkYXRhLnJlc3VsdC5yb3dzKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNsZWFyQW5kUmVsb2FkUmVwb3J0KSB7XG4gICAgICAgICAgZGF0YS5yZXN1bHQucm93cyA9IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzLmNvbmNhdChkYXRhLnJlc3VsdC5yb3dzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVwb3J0ID0gZGF0YTtcblxuICAgICAgICB0aGlzLnBvc3RTZWFyY2guZW1pdChkYXRhKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpO1xuXG4gICAgICAgIHRoaXMuZGV0ZWN0TGFzdFBhZ2UoZGF0YS5yZXN1bHQucm93cywgZGF0YS5yZXN1bHQuY291bnQpO1xuXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RMYXN0UGFnZShyb3dzLCBjb3VudCkge1xuXG4gICAgY29uc3QgbnVtYmVyT2Zyb3dzID0gcm93cy5sZW5ndGg7XG5cbiAgICBjb25zdCBlbXB0TGlzdCA9IG51bWJlck9mcm93cyA9PT0gMDtcblxuICAgIGNvbnN0IHNpbmdsZVBhZ2VMaXN0ID0gbnVtYmVyT2Zyb3dzID09PSBjb3VudDtcblxuICAgIHRoaXMuaXNMYXN0UGFnZSA9IGVtcHRMaXN0IHx8IHNpbmdsZVBhZ2VMaXN0O1xuXG4gIH1cblxuICAvKlxuICAgKiB1bnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCkge1xuICAgIGlmICh0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogdXBkYXRlQ29udGVudENoaWxkcmVuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpIHtcblxuICAgIGNvbnN0IHJvd3MgPSB0aGlzLmVuZHBvaW50ID8gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MgOiB0aGlzLnJvd3M7XG4gICAgaWYgKHRoaXMuZ3JpZCkge1xuICAgICAgdGhpcy5ncmlkLnJvd3MgPSByb3dzO1xuICAgIH1cbiAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgdGhpcy50YWJsZS5yb3dzID0gcm93cztcbiAgICB9XG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci5jb3VudCA9IHRoaXMucmVwb3J0LnJlc3VsdC5jb3VudDtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiByZWdpc3RlckNoaWxkV2F0Y2hlcnNcbiAgICpcbiAgICogV2F0Y2ggZm9yIGNoaWxkcmVuIG91dHB1dHNcbiAgICovXG4gIHByaXZhdGUgcmVnaXN0ZXJDaGlsZFdhdGNoZXJzKCkge1xuXG4gICAgaWYgKHRoaXMuZ3JpZCkge1xuICAgICAgdGhpcy53YXRjaEdyaWRSb3dDbGljaygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICB0aGlzLndhdGNoVGFibGVSb3dDbGljaygpO1xuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hHcmlkUm93Q2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hHcmlkUm93Q2xpY2soKSB7XG4gICAgdGhpcy5ncmlkLnJvd0NsaWNrLnN1YnNjcmliZSgoJGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJvd0NsaWNrLmVtaXQoJGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVGFibGVSb3dDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYmxlUm93Q2xpY2soKSB7XG4gICAgdGhpcy50YWJsZS5yb3dDbGljay5zdWJzY3JpYmUoKCRldmVudCkgPT4ge1xuICAgICAgdGhpcy5yb3dDbGljay5lbWl0KCRldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5maWx0ZXIuc2VhcmNoLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgIHRoaXMubG9hZFJlcG9ydCh0cnVlKVxuICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5yZWNvdW50KSB7XG4gICAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hTY3JvbGwoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbGFibGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzKVswXTtcbiAgICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9LCAxKTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lcikge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFic0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC50YWJDaGFuZ2Uuc3Vic2NyaWJlKHRhYiA9PiB7XG4gICAgICAgIHRoaXMuZGV0ZWN0TGlzdE1vZGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN1YnNjcmliZVRvVGFic0NoYW5nZVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJzQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFibGVTb3J0KCkge1xuICAgIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICB0aGlzLnRhYmxlU29ydFN1YnNjcmlwdGlvbiA9IHRoaXMudGFibGUuc29ydC5zdWJzY3JpYmUoY29sdW1uc1NvcnRDb25maWcgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5zU29ydENvbmZpZyAhPT0gY29sdW1uc1NvcnRDb25maWcpIHtcbiAgICAgICAgICB0aGlzLmNvbHVtbnNTb3J0Q29uZmlnID0gY29sdW1uc1NvcnRDb25maWc7XG4gICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdUYWJsZVNvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFibGVTb3J0KCkge1xuICAgIGlmICh0aGlzLnRhYmxlU29ydFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxufVxuIl19