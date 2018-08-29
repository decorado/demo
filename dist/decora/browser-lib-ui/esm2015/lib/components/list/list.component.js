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
    searchCollapsable(filter) {
        if (this.selectedCollapsable !== filter.uid) {
            this.loadByOpennedCollapse(filter.uid);
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
                    filterGroup.filters = filterGroup.filters.map(filter => {
                        filter.value = Array.isArray(filter.value) ? filter.value : [filter.value];
                        return filter;
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
        const /** @type {?} */ filter = this.collapsableFilters.children.find(item => item.uid === filterUid);
        const /** @type {?} */ filterGroup = { filters: filter.filters };
        this.loadReport(true, filterGroup);
        setTimeout(() => {
            this.selectedCollapsable = filter.uid;
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
            const /** @type {?} */ basicSearch = filterGroupThatContainsBasicSearch.filters.find(filter => filter.property === 'search');
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
            const /** @type {?} */ basicSerchFilter = filterGroup.filters ? filterGroup.filters.find(filter => filter.property === 'search') : undefined;
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
                const /** @type {?} */ tabChanged = this.previousSelectedTab && this.previousSelectedTab !== this.selectedTab;
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
function DecListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecListComponent.prototype.countReport;
    /** @type {?} */
    DecListComponent.prototype.filterMode;
    /** @type {?} */
    DecListComponent.prototype.collapsableFilters;
    /** @type {?} */
    DecListComponent.prototype.selectedCollapsable;
    /** @type {?} */
    DecListComponent.prototype.report;
    /** @type {?} */
    DecListComponent.prototype.isLastPage;
    /** @type {?} */
    DecListComponent.prototype.selectedTab;
    /** @type {?} */
    DecListComponent.prototype.previousSelectedTab;
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
    DecListComponent.prototype._filter;
    /** @type {?} */
    DecListComponent.prototype._name;
    /** @type {?} */
    DecListComponent.prototype.customFetchMethod;
    /** @type {?} */
    DecListComponent.prototype.columnsSortConfig;
    /** @type {?} */
    DecListComponent.prototype.disableShowMoreButton;
    /** @type {?} */
    DecListComponent.prototype.limit;
    /** @type {?} */
    DecListComponent.prototype.listMode;
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
    DecListComponent.prototype.getListMode;
    /** @type {?} */
    DecListComponent.prototype.actByScrollPosition;
    /** @type {?} */
    DecListComponent.prototype.emitScrollEvent;
    /** @type {?} */
    DecListComponent.prototype.service;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2SCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RSxPQUFPLEVBQWMsZUFBZSxFQUFnQixPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBOEZ4RSxNQUFNOzs7O0lBNlZKLFlBQ1U7UUFBQSxZQUFPLEdBQVAsT0FBTzs7Ozs7OzBCQWhWaUIsTUFBTTswQkFnRkUsSUFBSSxPQUFPLEVBQWM7d0JBT2hELElBQUk7aUNBMENLLElBQUksWUFBWSxFQUFPOzs7Ozs7cUJBOEhsQyxFQUFFOzs7Ozs7d0NBY2lCLHFCQUFxQjs7Ozs7OzBCQWNuQyxJQUFJOzs7Ozs7MEJBT0gsSUFBSSxZQUFZLEVBQU87Ozs7Ozt3QkFPTixJQUFJLFlBQVksRUFBTzsyQkFrUHpDLEdBQUcsRUFBRTtZQUV6QixxQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUU3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUVuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFFbEQsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO2lCQUV0QztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFFTixRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7aUJBRTFDO2FBRUY7WUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO1NBRWpCO21DQXlINkIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUV2QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVuQix1QkFBTSwwQkFBMEIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUU1RCx1QkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFFMUMsdUJBQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUU1RCx1QkFBTSwrQkFBK0IsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUU5RixNQUFNLENBQUMsYUFBYSxJQUFJLCtCQUErQixDQUFDO2lCQUV6RCxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7O29CQUVoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUVyQix1QkFBTSxNQUFNLEdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUVyQyx1QkFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO3dCQUV4RCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFckMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3lCQUVqQjtxQkFFRjtpQkFDRjthQUVGO1NBRUY7K0JBOEJ5QixDQUFDLE1BQU0sRUFBRSxFQUFFO1lBRW5DLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRWxCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFFckM7U0FFRjtLQWhhSTs7Ozs7SUFsVUwsSUFBSSxPQUFPLENBQUMsQ0FBQztRQUVYLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRWhCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztTQUV6QjtLQUVGOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7Ozs7SUFPRCxJQUFJLFlBQVk7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNwRDs7Ozs7SUF5S0QsSUFDSSxRQUFRLENBQUMsQ0FBUztRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEU7S0FDRjs7OztJQUVELElBQUksUUFBUTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7OztJQU9ELElBQ0ksSUFBSSxDQUFDLENBQVM7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLG9DQUFvQyxFQUFFLENBQUM7U0FDN0M7S0FDRjs7OztJQUVELElBQUksSUFBSTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7OztJQU9ELElBRUksSUFBSSxDQUFDLElBQUk7UUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BCOzs7O0lBRUQsSUFBSSxJQUFJO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQzFEOzs7OztJQXNFRCxJQUNJLE1BQU0sQ0FBQyxDQUF5QjtRQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLG9DQUFvQyxFQUFFLENBQUM7U0FDN0M7S0FDRjs7OztJQUVELElBQUksTUFBTTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCOzs7O0lBcUJELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLHlDQUF5QyxFQUFFLENBQUM7S0FDbEQ7Ozs7SUFVRixlQUFlO1FBQ2IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7S0FDL0I7Ozs7SUFXRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7S0FDdkM7Ozs7SUFNRCxpQkFBaUI7UUFFZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUV0RSx1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLFFBQVEsQ0FBQztZQUV0SCx1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFFcEMsdUJBQU0sK0JBQStCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSwrQkFBK0IsQ0FBQztpQkFDM0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUVmLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBRTVDLENBQUMsQ0FBQztTQUVKO0tBRUY7Ozs7O0lBT0QsVUFBVSxDQUFDLEVBQUU7UUFFWCx1QkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRXRELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFVCx1QkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFMUMsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRW5CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUVoQztTQUVGO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFbEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FFMUI7S0FFRjs7OztJQU9ELE9BQU87UUFFTCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBRXZCOzs7O0lBTUQsUUFBUTtRQUVOLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FFMUI7Ozs7O0lBT0QsaUJBQWlCLENBQUMsTUFBcUI7UUFFckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTVDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FFeEM7S0FFRjs7OztJQU9ELGtCQUFrQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ2hDOzs7O0lBT0QsY0FBYztRQUVaLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRTVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUU5QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUVkLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBRXpDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FFUDtLQUVGOzs7OztJQU9ELG1CQUFtQixDQUFDLEdBQUc7UUFFckIsSUFBSSxDQUFDO1lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FFL0Q7UUFBQyxLQUFLLENBQUMsQ0FBQyxpQkFBQSxLQUFLLEVBQUUsQ0FBQztZQUVmLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FFWjtLQUdGOzs7OztJQWtDTyxnQkFBZ0IsQ0FBQyxlQUFlO1FBRXRDLHVCQUFNLFdBQVcsR0FBZ0I7WUFDL0IsS0FBSyxFQUFFLENBQUM7U0FDVCxDQUFDO1FBRUYsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUU3QixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHO2dCQUV0QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFFbEIsQ0FBQztZQUVGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUVsQixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBRXZFO1NBRUYsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7Ozs7O0lBWWIsbUJBQW1CLENBQUMsT0FBTztRQUVqQyx1QkFBTSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUV2Rix1QkFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBRWhELHVCQUFNLDBCQUEwQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRXpFLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRXZDLHVCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFFdEYsMEJBQTBCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7Z0JBRXpGLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBRXZELFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUM7aUJBRTdDLENBQUMsQ0FBQzthQUVKO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBRS9DLDBCQUEwQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFFckc7WUFFRCxNQUFNLENBQUM7Z0JBQ0wsR0FBRyxFQUFFLDBCQUEwQixDQUFDLEdBQUc7Z0JBQ25DLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQyxPQUFPO2dCQUMzQyxRQUFRLEVBQUUsMEJBQTBCLENBQUMsUUFBUTthQUM5QyxDQUFDO1NBRUgsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzs7Ozs7SUFVbkQseUJBQXlCLENBQUMsZUFBb0IsRUFBRTtRQUV0RCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUV0QyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFFMUIsSUFBSSxDQUFDLDZDQUE2QyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFMUUsYUFBYSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFHOUQsV0FBVyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFFckQsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRTNFLE1BQU0sQ0FBQyxNQUFNLENBQUM7cUJBRWYsQ0FBQyxDQUFDO29CQUVILE1BQU0sQ0FBQyxXQUFXLENBQUM7aUJBRXBCLENBQUMsQ0FBQzthQUVKO1lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQztTQUV0QixDQUFDLENBQUM7Ozs7O0lBbURHLGNBQWM7UUFFcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzs7OztJQVViLHlDQUF5QztRQUUvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDOzs7OztJQXdCeEUsbUJBQW1CO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7Ozs7O0lBVWhELFdBQVc7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2hDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7Ozs7O0lBV0ssdUJBQXVCO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7OztJQVF4QyxrQkFBa0IsQ0FBQyxPQUFPO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7O0lBU25CLGdCQUFnQjtRQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2YsdUJBQU0sS0FBSyxHQUFHLDJGQUEyRjtrQkFDdkcsd0VBQXdFLENBQUM7WUFDM0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4Qjs7Ozs7O0lBU0sscUJBQXFCLENBQUMsU0FBUztRQUVyQyx1QkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBRXJGLHVCQUFNLFdBQVcsR0FBZ0IsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTdELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRW5DLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFFZCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUV2QyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBY0EsVUFBVSxDQUFDLG9CQUE4QixFQUFFLG9CQUFrQztRQUVuRixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFFOUIsRUFBRSxDQUFDLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRXRDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBRXpCO1lBRUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1lBRWpELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBRXBCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUVsQixJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLG9CQUFvQixDQUFDO3FCQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBRWQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBRXZCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO2lCQUVqSCxDQUFDLENBQUM7YUFHSjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUVsQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2FBRXhCO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRXRCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBRWQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFFZixHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQztxQkFFbkQ7b0JBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7aUJBRXRCLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFFUDtTQUVGLENBQUMsQ0FBQzs7Ozs7OztJQUlHLFlBQVksQ0FBQyx1QkFBZ0MsS0FBSyxFQUFFLG9CQUFxQjtRQUUvRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFFckMsdUJBQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUU5RSx1QkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLGtCQUFrQixFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFFeEcsdUJBQU0sT0FBTyxHQUFjLEVBQUUsQ0FBQztZQUU5QixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFM0IsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFFakIsT0FBTyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7YUFFckM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUUzQixPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzthQUV2QztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBRXpDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUVwQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBRW5DO1lBRUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBRWxCLENBQUMsQ0FBQzs7Ozs7OztJQVNHLG1DQUFtQyxDQUFDLFlBQTBCLEVBQUUsbUJBQWdDO1FBRXRHLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUV4QixFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUUzQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUVwRCxDQUFDLENBQUM7YUFFSjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVOLFlBQVksR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFFdEM7U0FFRjtRQUVELE1BQU0sQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDOzs7OztJQVFwQixvQ0FBb0M7UUFFMUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUc3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztnQkFFcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFFakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFFM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7aUJBRTVFO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUVOLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7aUJBRXhEO2FBSUY7U0FFRjs7Ozs7O0lBVUssT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFO1FBRXZCLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFFWixJQUFJLEVBQUUsQ0FBQztZQUVQLE1BQU0sRUFBRTtnQkFFTixJQUFJLEVBQUUsSUFBSTtnQkFFVixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFFbkI7U0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOzs7OztJQVF2Qix1QkFBdUI7UUFFN0IsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyxpQkFBaUI7YUFDMUQsSUFBSSxDQUNILFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Ozs7O0lBU2hDLDhCQUE4QjtRQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUVsRDs7Ozs7SUFRSyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVU7YUFDcEMsSUFBSSxDQUNILFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxpRUFBaUU7O1FBQ3BGLFNBQVMsQ0FBQyxDQUFDLFVBQXNCLEVBQUUsRUFBRTtZQUVuQyx1QkFBTSxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQU0sU0FBUyxDQUFDLENBQUM7WUFFdkQsdUJBQU0sV0FBVyxHQUF1QixJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFFbkYsdUJBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBRTlELHVCQUFNLCtCQUErQixHQUFHLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbkgsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xCO1lBRUQsV0FBVyxDQUFDLFFBQVEsRUFBRSwrQkFBK0IsQ0FBQztpQkFDckQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUVmLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXJCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFFakMsVUFBVSxDQUFDLEdBQUcsRUFBRTs7d0JBRWQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFFMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUVkLENBQUMsQ0FBQyxDQUFDO3FCQUVMLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ1A7Z0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNaLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FDbkIsQ0FBQyxDQUVILENBQUM7UUFDRixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQzs7Ozs7O0lBRzNCLHVEQUF1RCxDQUFDLE9BQU87UUFFckUsdUJBQU0sV0FBVyxxQkFBTyxPQUFPLENBQUMsQ0FBQztRQUVqQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFFMUQsV0FBVyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFN0UsTUFBTSxDQUFDLFdBQVcsQ0FBQztTQUVwQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU4sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FFckI7Ozs7OztJQUlLLDZDQUE2QyxDQUFDLFlBQVk7UUFFaEUsdUJBQU0sa0NBQWtDLEdBQUcsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZHLEVBQUUsQ0FBQyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7WUFFekUsdUJBQU0sV0FBVyxHQUFHLGtDQUFrQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBRTVHLHVCQUFNLGdCQUFnQixHQUFHLGtDQUFrQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFekYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFFM0MsdUJBQU0sY0FBYyxHQUFnQjtvQkFDbEMsT0FBTyxFQUFFLENBQUMsR0FBRyxrQ0FBa0MsQ0FBQyxPQUFPLENBQUM7aUJBQ3pELENBQUM7Z0JBRUYsY0FBYyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO29CQUN6QyxRQUFRLEVBQUUsUUFBUTtvQkFDbEIsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztpQkFDM0IsQ0FBQztnQkFFRixZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBRW5DLENBQUMsQ0FBQztTQUVKOzs7Ozs7O0lBSUssaUJBQWlCLENBQUMsWUFBWSxFQUFFLGtDQUFrQztRQUV4RSx1QkFBTSx1Q0FBdUMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFFekcsWUFBWSxDQUFDLE1BQU0sQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBSTFELHdDQUF3QyxDQUFDLFlBQVk7UUFFM0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFFckMsdUJBQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFFNUgsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUV4QyxDQUFDLENBQUM7Ozs7O0lBUUcseUJBQXlCO1FBQy9CLElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsY0FBYzthQUNwRCxJQUFJLENBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN0QjtTQUNGLENBQUMsQ0FDSDthQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRTVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyRTtnQkFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTNCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUU3QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFFeEQ7U0FDRixDQUFDLENBQUM7Ozs7Ozs7SUFHQyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUs7UUFFaEMsdUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFakMsdUJBQU0sUUFBUSxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUM7UUFFcEMsdUJBQU0sY0FBYyxHQUFHLFlBQVksS0FBSyxLQUFLLENBQUM7UUFFOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLElBQUksY0FBYyxDQUFDOzs7OztJQVF2QywyQkFBMkI7UUFDakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDL0M7Ozs7O0lBT0sscUJBQXFCO1FBRTNCLHVCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDakUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDdkI7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUM5Qzs7Ozs7SUFRSyxxQkFBcUI7UUFFM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7Ozs7O0lBUUssaUJBQWlCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVCLENBQUMsQ0FBQzs7Ozs7SUFPRyxrQkFBa0I7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUIsQ0FBQyxDQUFDOzs7OztJQU9HLFdBQVc7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFFN0QsdUJBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFFN0YsdUJBQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUUvRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUVmLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUU1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUVsQjtnQkFFRCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBRXRCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztpQkFFcEM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUUvQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO29CQUVyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO29CQUVwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUVqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs0QkFFbEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7eUJBRTFCO3FCQUVGLENBQUMsQ0FBQztpQkFFSjtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFFTixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBRXZDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO3FCQUUxQjtvQkFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUU1QyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7cUJBRXREO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUVOLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7d0JBRXJDLElBQUksQ0FBQyxrQkFBa0IsR0FBRzs0QkFDeEIsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXOzRCQUNyQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTt5QkFDL0MsQ0FBQztxQkFFSDtpQkFFRjthQUVGLENBQUMsQ0FBQztTQUNKOzs7OztJQU9LLGtCQUFrQjtRQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2Qzs7Ozs7SUFPSyxXQUFXO1FBQ2pCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNqRjtTQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBT0Esa0JBQWtCO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BGOzs7OztJQU9LLGVBQWU7UUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDO1lBQy9ELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RGLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO2dCQUN2QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDdkIsQ0FBQyxDQUFDO1NBQ0o7Ozs7O0lBT0ssc0JBQXNCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzNDOzs7OztJQU9LLGNBQWM7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFZixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBRXpFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBRWpELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztvQkFFM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzt3QkFFNUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3FCQUV0RDtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFFTixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUV2QjtpQkFFRjthQUVGLENBQUMsQ0FBQztTQUNKOzs7OztJQU9LLHFCQUFxQjtRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMxQzs7OztZQTVnREosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9GWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxtT0FBbU8sQ0FBQzthQUM5Tzs7OztZQTdGUSxhQUFhOzs7Z0NBcVNuQixLQUFLO2dDQVFMLEtBQUs7b0NBT0wsS0FBSzt1QkFPTCxLQUFLO21CQWdCTCxLQUFLO21CQWlCTCxLQUFLLFNBQUMsTUFBTTtvQkFlWixLQUFLO3VCQU9MLEtBQUs7dUNBT0wsS0FBSzttQ0FPTCxLQUFLO3lCQU9MLEtBQUs7eUJBT0wsTUFBTTt1QkFPTixNQUFNO21CQU9OLFlBQVksU0FBQyxvQkFBb0I7b0JBT2pDLFlBQVksU0FBQyxxQkFBcUI7cUJBT2xDLFlBQVksU0FBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjTGlzdEdyaWRDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IERlY0xpc3RUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC10YWJsZS9saXN0LXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWZpbHRlci9saXN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24sIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRhcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBEZWNMaXN0RmV0Y2hNZXRob2QsIENvdW50UmVwb3J0IH0gZnJvbSAnLi9saXN0Lm1vZGVscyc7XG5pbXBvcnQgeyBGaWx0ZXJEYXRhLCBEZWNGaWx0ZXIsIEZpbHRlckdyb3VwcywgRmlsdGVyR3JvdXAgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsJztcbmltcG9ydCB7IERlY0xpc3RGaWx0ZXIgfSBmcm9tICcuL2xpc3QubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDwhLS0gQ09NUE9ORU5UIExBWU9VVCAtLT5cbjxkaXYgY2xhc3M9XCJsaXN0LWNvbXBvbmVudC13cmFwcGVyXCI+XG4gIDxkaXYgKm5nSWY9XCJmaWx0ZXJcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1maWx0ZXJcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwicmVwb3J0IHx8IGZpbHRlck1vZGUgPT09ICdjb2xsYXBzZSdcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gICAgICA8ZGl2IGZ4RmxleCBjbGFzcz1cInRleHQtcmlnaHRcIiAqbmdJZj1cInRhYmxlQW5kR3JpZEFyZVNldCgpXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlTGlzdE1vZGUoKVwiPlxuICAgICAgICAgIDxtYXQtaWNvbiB0aXRsZT1cIlN3aXRjaCB0byB0YWJsZSBtb2RlXCIgYXJpYS1sYWJlbD1cIlN3aXRjaCB0byB0YWJsZSBtb2RlXCIgY29sb3I9XCJwcmltYXJ5XCIgY29udHJhc3RGb250V2l0aEJnICpuZ0lmPVwibGlzdE1vZGUgPT09ICdncmlkJ1wiPnZpZXdfaGVhZGxpbmU8L21hdC1pY29uPlxuICAgICAgICAgIDxtYXQtaWNvbiB0aXRsZT1cIlN3aXRjaCB0byBncmlkIG1vZGVcIiBhcmlhLWxhYmVsPVwiU3dpdGNoIHRvIGdyaWQgbW9kZVwiIGNvbG9yPVwicHJpbWFyeVwiIGNvbnRyYXN0Rm9udFdpdGhCZyAqbmdJZj1cImxpc3RNb2RlID09PSAndGFibGUnXCI+dmlld19tb2R1bGU8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXJNb2RlID09ICdjb2xsYXBzZScgdGhlbiBjb2xsYXBzZVRlbXBsYXRlIGVsc2UgdGFic1RlbXBsYXRlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBHUklEIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNncmlkVGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LWdyaWRcIj48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRBQkxFIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNsaXN0VGVtcGxhdGU+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1saXN0LXRhYmxlXCI+PC9uZy1jb250ZW50PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBGT09URVIgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2Zvb3RlclRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gIDxwIGNsYXNzPVwibGlzdC1mb290ZXJcIj5cbiAgICB7eyAnbGFiZWwuYW1vdW50LWxvYWRlZC1vZi10b3RhbCcgfFxuICAgICAgdHJhbnNsYXRlOntcbiAgICAgICAgbG9hZGVkOiByZXBvcnQ/LnJlc3VsdD8ucm93cz8ubGVuZ3RoLFxuICAgICAgICB0b3RhbDogcmVwb3J0Py5yZXN1bHQ/LmNvdW50XG4gICAgICB9XG4gICAgfX1cbiAgPC9wPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBDT0xMQVBTRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjdGFic1RlbXBsYXRlPlxuICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gICAgPGRpdiAqbmdJZj1cImxpc3RNb2RlID09ICdncmlkJyB0aGVuIGdyaWRUZW1wbGF0ZSBlbHNlIGxpc3RUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDwhLS0gRk9PVEVSIENPTlRFTlQgLS0+XG4gICAgPGRpdiBmeEZsZXg+XG4gICAgICA8ZGl2ICpuZ0lmPVwic2hvd0Zvb3RlciAmJiAhbG9hZGluZyB0aGVuIGZvb3RlclRlbXBsYXRlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBMT0FESU5HIFNQSU5ORVIgLS0+XG4gICAgPGRpdiBmeEZsZXggKm5nSWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJ0ZXh0LWNlbnRlciBsb2FkaW5nLXNwaW5uZXItd3JhcHBlclwiPlxuICAgICAgPGRlYy1zcGlubmVyPjwvZGVjLXNwaW5uZXI+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBMT0FEIE1PUkUgQlVUVE9OIC0tPlxuICAgIDxkaXYgZnhGbGV4ICpuZ0lmPVwiIWlzTGFzdFBhZ2UgJiYgIWxvYWRpbmcgJiYgIWRpc2FibGVTaG93TW9yZUJ1dHRvblwiIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJzaG93TW9yZSgpXCI+e3snbGFiZWwuc2hvdy1tb3JlJyB8IHRyYW5zbGF0ZX19PC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBDT0xMQVBTRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjY29sbGFwc2VUZW1wbGF0ZT5cbiAgPG1hdC1hY2NvcmRpb24+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGNvbGxhcHNhYmxlRmlsdGVycy5jaGlsZHJlblwiPlxuICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwgKG9wZW5lZCk9XCJzZWFyY2hDb2xsYXBzYWJsZShmaWx0ZXIpXCI+XG4gICAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sbGFwc2UtdGl0bGVcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMzJweFwiIGZ4TGF5b3V0QWxpZ249XCJsZWZ0IGNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBmeEZsZXg9XCI5NnB4XCIgKm5nSWY9XCJjb3VudFJlcG9ydFwiPlxuICAgICAgICAgICAgICA8ZGVjLWxhYmVsIFtjb2xvckhleF09XCJmaWx0ZXIuY29sb3JcIj57eyBnZXRDb2xsYXBzYWJsZUNvdW50KGZpbHRlci51aWQpIH19PC9kZWMtbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt7ICdsYWJlbC4nICsgZmlsdGVyLmxhYmVsIHwgdHJhbnNsYXRlIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZWxlY3RlZENvbGxhcHNhYmxlID09PSBmaWx0ZXIudWlkXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWJzVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21hdC1leHBhbnNpb24tcGFuZWw+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbWF0LWFjY29yZGlvbj5cbiAgPGRpdiBjbGFzcz1cImFjY29yZGlvbi1ib3R0b20tbWFyZ2luXCI+PC9kaXY+XG48L25nLXRlbXBsYXRlPlxuXG5gLFxuICBzdHlsZXM6IFtgLmxpc3QtZm9vdGVye2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyfS5saXN0LWNvbXBvbmVudC13cmFwcGVye21pbi1oZWlnaHQ6NzJweH0udGV4dC1yaWdodHt0ZXh0LWFsaWduOnJpZ2h0fS5sb2FkaW5nLXNwaW5uZXItd3JhcHBlcntwYWRkaW5nOjMycHh9LmNvbGxhcHNlLXRpdGxle3dpZHRoOjEwMCV9LmFjY29yZGlvbi1ib3R0b20tbWFyZ2lue21hcmdpbi1ib3R0b206MTAwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcblxuICAvKlxuICAqIGNvdW50UmVwb3J0XG4gICpcbiAgKlxuICAqL1xuICBjb3VudFJlcG9ydDogQ291bnRSZXBvcnQ7XG5cbiAgLypcbiAgKiBmaWx0ZXJNb2RlXG4gICpcbiAgKlxuICAqL1xuICBmaWx0ZXJNb2RlOiAndGFicycgfCAnY29sbGFwc2UnID0gJ3RhYnMnO1xuXG5cbiAgLypcbiAgKiBjb2xsYXBzYWJsZUZpbHRlcnNcbiAgKlxuICAqXG4gICovXG4gIGNvbGxhcHNhYmxlRmlsdGVyczogeyB0YWI6IHN0cmluZywgY2hpbGRyZW46IERlY0xpc3RGaWx0ZXJbXSB9O1xuXG4gIC8qXG4gICAqIGxvYWRpbmdcbiAgICpcbiAgICpcbiAgICovXG4gIHNldCBsb2FkaW5nKHYpIHtcblxuICAgIHRoaXMuX2xvYWRpbmcgPSB2O1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyLmxvYWRpbmcgPSB2O1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgbG9hZGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9hZGluZztcbiAgfVxuXG4gIC8qXG4gICAqIGZpbHRlckdyb3Vwc1xuICAgKlxuICAgKlxuICAgKi9cbiAgZ2V0IGZpbHRlckdyb3VwcygpOiBGaWx0ZXJHcm91cHMge1xuICAgIHJldHVybiB0aGlzLmZpbHRlciA/IHRoaXMuZmlsdGVyLmZpbHRlckdyb3VwcyA6IFtdO1xuICB9XG5cbiAgLypcbiAgICogc2VsZWN0ZWRDb2xsYXBzYWJsZVxuICAgKlxuICAgKlxuICAgKi9cbiAgc2VsZWN0ZWRDb2xsYXBzYWJsZTtcblxuICAvKlxuICAgKiByZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHJlcG9ydDtcblxuICAvKlxuICAgKiBpc0xhc3RQYWdlXG4gICAqXG4gICAqXG4gICAqL1xuICBpc0xhc3RQYWdlOiBib29sZWFuO1xuXG4gIC8qXG4gICogc2VsZWN0ZWRUYWJcbiAgKlxuICAqXG4gICovXG4gIHNlbGVjdGVkVGFiOiBhbnk7XG5cbiAgLypcbiAgKiBwcmV2aW91c1NlbGVjdGVkVGFiXG4gICpcbiAgKlxuICAqL1xuICBwcmV2aW91c1NlbGVjdGVkVGFiOiBhbnk7XG5cbiAgLypcbiAgICogZmlsdGVyRGF0YVxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJEYXRhOiBTdWJqZWN0PEZpbHRlckRhdGE+ID0gbmV3IFN1YmplY3Q8RmlsdGVyRGF0YT4oKTtcblxuICAvKlxuICAgKiBfbG9hZGluZztcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2xvYWRpbmcgPSB0cnVlO1xuXG4gIC8qXG4gICAqIGNsZWFyQW5kUmVsb2FkUmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGNsZWFyQW5kUmVsb2FkUmVwb3J0O1xuXG4gIC8qXG4gICAqIGZpbHRlclN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiByZWFjdGl2ZVJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWFjdGl2ZVJlcG9ydDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIC8qXG4gICAqIHJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogc2Nyb2xsYWJsZUNvbnRhaW5lclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxhYmxlQ29udGFpbmVyOiBFbGVtZW50O1xuXG4gIC8qXG4gICAqIHNjcm9sbEV2ZW50RW1pdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbEV2ZW50RW1pdGVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiB0YWJzQ2hhbmdlU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHRhYnNDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKlxuICAgKiB0YWJsZVNvcnRTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdGFibGVTb3J0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogcGF5bG9hZFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBwYXlsb2FkOiBEZWNGaWx0ZXI7XG5cbiAgLypcbiAgICogX2VuZHBvaW50IGludGVybmFsbFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfZW5kcG9pbnQ6IHN0cmluZztcblxuICAvKlxuICAgKiBfZmlsdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9maWx0ZXI6IERlY0xpc3RGaWx0ZXJDb21wb25lbnQ7XG5cbiAgLypcbiAgICogX25hbWVcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcblxuICAvKlxuICAgKiBjdXN0b21GZXRjaE1ldGhvZFxuICAgKlxuICAgKiBtZXRob2QgdXNlZCB0byBmZXRjaCBkYXRhIGZyb20gYmFjay1lbmRcbiAgICovXG4gIEBJbnB1dCgpIGN1c3RvbUZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2Q7XG5cbiAgLypcbiAgICogY29sdW1uc1NvcnRDb25maWdcbiAgICpcbiAgICogdXNlZCB0byBnZXQgYSBzb3J0ZWQgbGlzdCBmcm9tIGJhY2tlbmRcbiAgICogY2FuIGJlIHBhc2VkIHZpYSBhdHRyaWJ1dGUgdG8gc29ydCB0aGUgZmlyc3QgbG9hZFxuICAgKi9cbiAgQElucHV0KCkgY29sdW1uc1NvcnRDb25maWc7XG5cbiAgLypcbiAgICogZGlzYWJsZVNob3dNb3JlQnV0dG9uXG4gICAqXG4gICAqIHVzZWQgdG8gaGlkZSB0aGUgc2hvdyBtb3JlIGJ1dHRvblxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZVNob3dNb3JlQnV0dG9uOiBib29sZWFuO1xuXG4gIC8qXG4gICAqIGVuZHBvaW50XG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgZW5kcG9pbnQodjogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2VuZHBvaW50ICE9PSB2KSB7XG4gICAgICB0aGlzLl9lbmRwb2ludCA9ICh2WzBdICYmIHZbMF0gPT09ICcvJykgPyB2LnJlcGxhY2UoJy8nLCAnJykgOiB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCBlbmRwb2ludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9lbmRwb2ludDtcbiAgfVxuXG4gIC8qXG4gICAqIG5hbWVcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBuYW1lKHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9uYW1lICE9PSB2KSB7XG4gICAgICB0aGlzLl9uYW1lID0gdjtcbiAgICAgIHRoaXMuc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICAvKlxuICAgKiByb3dzXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoJ3Jvd3MnKVxuXG4gIHNldCByb3dzKHJvd3MpIHtcbiAgICB0aGlzLnNldFJvd3Mocm93cyk7XG4gIH1cblxuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXBvcnQgPyB0aGlzLnJlcG9ydC5yZXN1bHQucm93cyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qXG4gICAqIGxpbWl0XG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBsaW1pdCA9IDEwO1xuXG4gIC8qXG4gICAqIGxpc3RNb2RlXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBsaXN0TW9kZTtcblxuICAvKlxuICAgKiBzY3JvbGxhYmxlQ29udGFpbmVyQ2xhc3NcbiAgICpcbiAgICogV2hlcmUgdGhlIHNjcm9sbCB3YXRjaGVyIHNob3VsZCBiZSBsaXN0ZW5pbmdcbiAgICovXG4gIEBJbnB1dCgpIHNjcm9sbGFibGVDb250YWluZXJDbGFzcyA9ICdtYXQtc2lkZW5hdi1jb250ZW50JztcblxuICAvKlxuICAgKiBzZWFyY2hhYmxlUHJvcGVydGllc1xuICAgKlxuICAgKiBQcm9wZXJ0aWVzIHRvIGJlIHNlYXJjaGVkIHdoZW4gdXNpbmcgYmFzaWMgc2VhcmNoXG4gICAqL1xuICBASW5wdXQoKSBzZWFyY2hhYmxlUHJvcGVydGllczogc3RyaW5nW107XG5cbiAgLypcbiAgICogc2hvd0Zvb3RlclxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgc2hvd0Zvb3RlciA9IHRydWU7XG5cbiAgLypcbiAgICogcG9zdFNlYXJjaFxuICAgKlxuICAgKiBUaGlzIG1pZGRsZXdhcmUgaXMgdXNlZCB0byB0cmlnZ2VyIGV2ZW50cyBhZnRlciBldmVyeSBzZWFyY2hcbiAgICovXG4gIEBPdXRwdXQoKSBwb3N0U2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogcm93Q2xpY2tcbiAgICpcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBhIHJvdyBvciBjYXJkIGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAgKiBncmlkXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RHcmlkQ29tcG9uZW50KSBncmlkOiBEZWNMaXN0R3JpZENvbXBvbmVudDtcblxuICAvKlxuICAgKiB0YWJsZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0VGFibGVDb21wb25lbnQpIHRhYmxlOiBEZWNMaXN0VGFibGVDb21wb25lbnQ7XG5cbiAgLypcbiAgICogZmlsdGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBAQ29udGVudENoaWxkKERlY0xpc3RGaWx0ZXJDb21wb25lbnQpXG4gIHNldCBmaWx0ZXIodjogRGVjTGlzdEZpbHRlckNvbXBvbmVudCkge1xuICAgIGlmICh0aGlzLl9maWx0ZXIgIT09IHYpIHtcbiAgICAgIHRoaXMuX2ZpbHRlciA9IHY7XG4gICAgICB0aGlzLnNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBmaWx0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcjtcbiAgfVxuXG4gIC8qXG4gICAqIG5nT25Jbml0XG4gICAqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNlcnZpY2U6IERlY0FwaVNlcnZpY2VcbiAgKSB7IH1cblxuICAvKlxuICAgKiBuZ09uSW5pdFxuICAgKlxuICAgKiBTdGFydHMgYSBmcmVzaCBjb21wb25lbnQgYW5kIHByZXBhcmUgaXQgdG8gcnVuXG4gICAqXG4gICAqIC0gU3RhcnQgdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN1YnNjcmliZSB0byB0aGUgUmVhY3RpdmUgUmVwb3J0XG4gICAqIC0gU3RhcnQgd2F0Y2hpbmcgd2luZG93IFNjcm9sbFxuICAgKiAtIEVuc3VyZSB1bmlxdWUgbmFtZVxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy53YXRjaEZpbHRlckRhdGEoKTtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZU5hbWUoKTtcbiAgICB0aGlzLmRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKCk7XG4gIH1cblxuICAvKlxuICAqIG5nQWZ0ZXJWaWV3SW5pdFxuICAqXG4gICogV2FpdCBmb3IgdGhlIHN1YmNvbXBvbmVudHMgdG8gc3RhcnQgYmVmb3JlIHJ1biB0aGUgY29tcG9uZW50XG4gICpcbiAgKiAtIFN0YXJ0IHdhdGNoaW5nIEZpbHRlclxuICAqIC0gRG8gdGhlIGZpcnN0IGxvYWRcbiAgKi9cbiBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICB0aGlzLndhdGNoRmlsdGVyKCk7XG4gICB0aGlzLmRvRmlyc3RMb2FkKCk7XG4gICB0aGlzLmRldGVjdExpc3RNb2RlKCk7XG4gICB0aGlzLndhdGNoVGFic0NoYW5nZSgpO1xuICAgdGhpcy53YXRjaFRhYmxlU29ydCgpO1xuICAgdGhpcy5yZWdpc3RlckNoaWxkV2F0Y2hlcnMoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGwoKTtcbiAgIHRoaXMud2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qXG4gICAqIG5nT25EZXN0cm95XG4gICAqXG4gICAqIERlc3Ryb3kgd2F0Y2hlciB0byBmcmVlIG1lZW1vcnkgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyeSB0cmlnZ2Vyc1xuICAgKlxuICAgKiAtIFVuc3Vic2NyaWJlIGZyb20gdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgd2luZG93IFNjcm9sbFxuICAgKiAtIFN0b3Agd2F0Y2hpbmcgRmlsdGVyXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdGaWx0ZXIoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYmxlU29ydCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICAvKlxuICAgKiByZWxvYWRDb3VudFJlcG9ydFxuICAgKlxuICAgKi9cbiAgcmVsb2FkQ291bnRSZXBvcnQoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIuZmlsdGVycyAmJiB0aGlzLmZpbHRlci5sb2FkQ291bnRSZXBvcnQpIHtcblxuICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLmVuZHBvaW50W3RoaXMuZW5kcG9pbnQubGVuZ3RoIC0gMV0gPT09ICcvJyA/IGAke3RoaXMuZW5kcG9pbnR9Y291bnRgIDogYCR7dGhpcy5lbmRwb2ludH0vY291bnRgO1xuXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5maWx0ZXIuZmlsdGVycztcblxuICAgICAgY29uc3QgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcyA9IHRoaXMuZ2V0Q291bnRhYmxlRmlsdGVycyhmaWx0ZXJzKTtcblxuICAgICAgdGhpcy5zZXJ2aWNlLnBvc3QoZW5kcG9pbnQsIHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgdGhpcy5jb3VudFJlcG9ydCA9IHRoaXMubW91bnRDb3VudFJlcG9ydChyZXMpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLmNvdW50UmVwb3J0ID0gdGhpcy5jb3VudFJlcG9ydDtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlbW92ZUl0ZW1cbiAgICpcbiAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGxpc3RcbiAgICovXG4gIHJlbW92ZUl0ZW0oaWQpIHtcblxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnJvd3MuZmluZChfaXRlbSA9PiBfaXRlbS5pZCA9PT0gaWQpO1xuXG4gICAgaWYgKGl0ZW0pIHtcblxuICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5yb3dzLmluZGV4T2YoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtSW5kZXggPj0gMCkge1xuXG4gICAgICAgIHRoaXMucm93cy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5kcG9pbnQpIHtcblxuICAgICAgdGhpcy5yZWxvYWRDb3VudFJlcG9ydCgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZXN0YXJ0XG4gICAqXG4gICAqIENsZWFyIHRoZSBsaXN0IGFuZCByZWxvYWQgdGhlIGZpcnN0IHBhZ2VcbiAgICovXG4gIHJlc3RhcnQoKSB7XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNob3dNb3JlXG4gICAqXG4gICAqL1xuICBzaG93TW9yZSgpIHtcblxuICAgIHJldHVybiB0aGlzLmxvYWRSZXBvcnQoKTtcblxuICB9XG5cbiAgLypcbiAgICogc2VhcmNoQ29sbGFwc2FibGVcbiAgICpcbiAgICogc2VhcmNoIGJ5IGNvbGxhcHNhYmxlIGZpbHRlclxuICAgKi9cbiAgc2VhcmNoQ29sbGFwc2FibGUoZmlsdGVyOiBEZWNMaXN0RmlsdGVyKSB7XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlICE9PSBmaWx0ZXIudWlkKSB7XG5cbiAgICAgIHRoaXMubG9hZEJ5T3Blbm5lZENvbGxhcHNlKGZpbHRlci51aWQpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiB0YWJsZUFuZEdyaWRBcmVTZXRcbiAgICpcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlcmUgYXJlIGJvdGggR1JJRCBhbmQgVEFCTEUgZGVmaW5pdGlvbiBpbnNpZGUgdGhlIGxpc3RcbiAgICovXG4gIHRhYmxlQW5kR3JpZEFyZVNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkICYmIHRoaXMudGFibGU7XG4gIH1cblxuICAvKlxuICAgKiB0b2dnbGVMaXN0TW9kZVxuICAgKlxuICAgKiBDaGFuZ2VzIGJldHdlZW4gR1JJRCBhbmQgVEFCTEUgdmlzdWFsaXphdG9pbiBtb2Rlc1xuICAgKi9cbiAgdG9nZ2xlTGlzdE1vZGUoKSB7XG5cbiAgICB0aGlzLmxpc3RNb2RlID0gdGhpcy5saXN0TW9kZSA9PT0gJ2dyaWQnID8gJ3RhYmxlJyA6ICdncmlkJztcblxuICAgIGlmICh0aGlzLmxpc3RNb2RlID09PSAndGFibGUnKSB7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgIHRoaXMudGFibGUudGFibGVDb21wb25lbnQucmVjYWxjdWxhdGUoKTtcblxuICAgICAgfSwgMSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGdldENvbGxhcHNhYmxlQ291bnRcbiAgICpcbiAgICogZ2V0IENvbGxhcHNhYmxlIENvdW50IGZyb20gY291bnRSZXBvcnRcbiAgICovXG4gIGdldENvbGxhcHNhYmxlQ291bnQodWlkKSB7XG5cbiAgICB0cnkge1xuXG4gICAgICByZXR1cm4gdGhpcy5jb3VudFJlcG9ydFt0aGlzLnNlbGVjdGVkVGFiXS5jaGlsZHJlblt1aWRdLmNvdW50O1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgICAgcmV0dXJuICc/JztcblxuICAgIH1cblxuXG4gIH1cblxuICAvKlxuICAgZ2V0TGlzdE1vZGVcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZ2V0TGlzdE1vZGUgPSAoKSA9PiB7XG5cbiAgICBsZXQgbGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgJiYgdGhpcy5zZWxlY3RlZFRhYi5saXN0TW9kZSkge1xuXG4gICAgICAgIGxpc3RNb2RlID0gdGhpcy5zZWxlY3RlZFRhYi5saXN0TW9kZTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBsaXN0TW9kZSA9IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdE1vZGU7XG5cbiAgfVxuXG4gIC8qXG4gICBtb3VudENvdW50UmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIG1vdW50Q291bnRSZXBvcnQoZmlsdGVyc0NvdW50ZXJzKTogQ291bnRSZXBvcnQge1xuXG4gICAgY29uc3QgY291bnRSZXBvcnQ6IENvdW50UmVwb3J0ID0ge1xuICAgICAgY291bnQ6IDBcbiAgICB9O1xuXG4gICAgZmlsdGVyc0NvdW50ZXJzLmZvckVhY2goaXRlbSA9PiB7XG5cbiAgICAgIGNvdW50UmVwb3J0W2l0ZW0udWlkXSA9IHtcblxuICAgICAgICBjb3VudDogaXRlbS5jb3VudFxuXG4gICAgICB9O1xuXG4gICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuXG4gICAgICAgIGNvdW50UmVwb3J0W2l0ZW0udWlkXS5jaGlsZHJlbiA9IHRoaXMubW91bnRDb3VudFJlcG9ydChpdGVtLmNoaWxkcmVuKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291bnRSZXBvcnQ7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGdldENvdW50YWJsZUZpbHRlcnNcbiAgICpcbiAgICogR2V0IHRoZSBzZWFyY2ggZmlsdGVyLCB0cm5zZm9ybWUgdGhlIHNlYXJjaCBwYXJhbXMgaW50byB0aGUgc2VhcmNoYWJsZSBwcm9wZXJ0aWVzIGFuZCBpbmplY3QgaXQgaW4gZXZlcnkgZmlsdGVyIGNvbmZpZ3VyZWQgaW4gZGVjLWZpbHRlcnNcbiAgICpcbiAgICogVGhlIHJlc3VsdCBpcyB1c2VkIHRvIGNhbGwgdGhlIGNvdW50IGVuZHBvaW50IGFuZCByZXR1cm4gdGhlIGFtb3VudCBvZiByZWNjb3JkcyBmb3VuZCBpbiBldmVyeSB0YWIvY29sbGFwc2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZ2V0Q291bnRhYmxlRmlsdGVycyhmaWx0ZXJzKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cHNXaXRob3V0VGFicyA9IHRoaXMuZmlsdGVyLmZpbHRlckdyb3Vwc1dpdGhvdXRUYWJzIHx8IFt7ZmlsdGVyczogW119XTtcblxuICAgIGNvbnN0IGZpbHRlcnNQbHVzU2VhcmNoID0gZmlsdGVycy5tYXAoZGVjRmlsdGVyID0+IHtcblxuICAgICAgY29uc3QgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2ggPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRlY0ZpbHRlcikpO1xuXG4gICAgICBpZiAoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycykge1xuXG4gICAgICAgIGNvbnN0IHRhYkZpbHRlcnNDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzKSk7XG5cbiAgICAgICAgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpKTtcblxuICAgICAgICBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzLmZvckVhY2goZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKC4uLnRhYkZpbHRlcnNDb3B5KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIGlmIChkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5jaGlsZHJlbikge1xuXG4gICAgICAgIGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuID0gdGhpcy5nZXRDb3VudGFibGVGaWx0ZXJzKGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuKTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB1aWQ6IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLnVpZCxcbiAgICAgICAgZmlsdGVyczogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycyxcbiAgICAgICAgY2hpbGRyZW46IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuLFxuICAgICAgfTtcblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZW5zdXJlRmlsdGVyVmFsdWVzQXNBcnJheShmaWx0ZXJzUGx1c1NlYXJjaCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGVuc3VyZUZpbHRlclZhbHVlc0FzQXJyYXlcbiAgICpcbiAgICogR2V0IGFuIGFycmF5IG9mIGZpbHRlcmdyb3VwcyBhbmQgc2V0IHRoZSBmaWx0ZXIgdmFsdWVzIHRvIGFycmF5IGlmIG5vdFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVGaWx0ZXJWYWx1ZXNBc0FycmF5KGZpbHRlckdyb3VwczogYW55ID0gW10pIHtcblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMubWFwKGRlY0xpc3RGaWx0ZXIgPT4ge1xuXG4gICAgICBpZiAoZGVjTGlzdEZpbHRlci5maWx0ZXJzKSB7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMoZGVjTGlzdEZpbHRlci5maWx0ZXJzKTtcblxuICAgICAgICBkZWNMaXN0RmlsdGVyLmZpbHRlcnMgPSBkZWNMaXN0RmlsdGVyLmZpbHRlcnMubWFwKGZpbHRlckdyb3VwID0+IHtcblxuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycyA9IGZpbHRlckdyb3VwLmZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG5cbiAgICAgICAgICAgIGZpbHRlci52YWx1ZSA9IEFycmF5LmlzQXJyYXkoZmlsdGVyLnZhbHVlKSA/IGZpbHRlci52YWx1ZSA6IFtmaWx0ZXIudmFsdWVdO1xuXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZmlsdGVyR3JvdXA7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlY0xpc3RGaWx0ZXI7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogYWN0QnlTY3JvbGxQb3NpdGlvblxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlY3QgaWYgdGhlcmUgaXMgc2Nyb29saW5nIGFjdGlvbiBvbiB3aW5kb3cgdG8gZmV0Y2ggYW5kIHNob3cgbW9yZSByb3dzIHdoZW4gdGhlIHNjcm9sbGluZyBkb3duLlxuICAgKi9cbiAgcHJpdmF0ZSBhY3RCeVNjcm9sbFBvc2l0aW9uID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCRldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnRXaXRoQ2RrT3ZlcmxheUNsYXNzID0gJGV2ZW50WydwYXRoJ10uZmluZChwYXRoID0+IHtcblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBwYXRoWydjbGFzc05hbWUnXSB8fCAnJztcblxuICAgICAgICBjb25zdCBpbnNpZGVPdmVybGF5ID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Nkay1vdmVybGF5JykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Z1bGxzY3JlYW4tZGlhbG9nLWNvbnRhaW5lcicpID49IDA7XG5cbiAgICAgICAgcmV0dXJuIGluc2lkZU92ZXJsYXkgfHwgaW5zaWRlRnVsbHNjcmVhbkRpYWxvZ0NvbnRhaW5lcjtcblxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICBpZiAoIXRoaXMuaXNMYXN0UGFnZSkge1xuXG4gICAgICAgICAgY29uc3QgdGFyZ2V0OiBhbnkgPSAkZXZlbnRbJ3RhcmdldCddO1xuXG4gICAgICAgICAgY29uc3QgbGltaXQgPSB0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGFyZ2V0LmNsaWVudEhlaWdodDtcblxuICAgICAgICAgIGlmICh0YXJnZXQuc2Nyb2xsVG9wID49IChsaW1pdCAtIDE2KSkge1xuXG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlKCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBkZXRlY3RMaXN0TW9kZVxuICAgKlxuICAgZ2V0TGlzdE1vZGUgaW5wdXRcbiAgICovXG4gIHByaXZhdGUgZGV0ZWN0TGlzdE1vZGUoKSB7XG5cbiAgICB0aGlzLmdldExpc3RNb2RlKCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKClcbiAgICpcbiAgICogU2V0IHRoZSBsaXN0IG1vZGUgYmFzZWQgb24gZGVjbGFyYXRpb24gb2YgdGFibGUgYW5kIGdyaWQuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGJvb3Rhc3RyYXAgdGhlIGNvbXBvbmVudCB3aXRoIG9ubHkgZ3JpZCBvciBvbmx5IHRhYmxlXG4gICAqIFRoaXMgb25seSB3b3JrIGlmIG5vIG1vZGUgaXMgcHJvdmlkZWQgYnkgQElucHV0IG90aGVyd2lzZSB0aGUgQElucHV0IHZhbHVlIHdpbGwgYmUgdXNlZFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID8gdGhpcy5saXN0TW9kZSA6IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gIH1cblxuICAvKlxuICAgKiBlbWl0U2Nyb2xsRXZlbnRcbiAgICpcbiAgICogRW1pdHMgc2Nyb2xsIGV2ZW50IHdoZW4gbm90IGxvYWRpbmdcbiAgICovXG4gIHByaXZhdGUgZW1pdFNjcm9sbEV2ZW50ID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCF0aGlzLmxvYWRpbmcpIHtcblxuICAgICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlci5lbWl0KCRldmVudCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGlzVGFic0ZpbHRlckRlZmluZWRcbiAgICpcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIFRhYnMgRmlsdGVyIGlzIGRlZmluZWQgaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICBwcml2YXRlIGlzVGFic0ZpbHRlckRlZmluZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZFxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHZpZXcgYW5kIGlucHV0cyBhcmUgaW5pdGlhbGl6ZWRcbiAgICpcbiAgICogVGhpcyBpcyB0aGUgZmlyc3QgY2FsbCB0byBnZXQgZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZCgpIHtcbiAgICBpZiAodGhpcy5pc1RhYnNGaWx0ZXJEZWZpbmVkKCkpIHtcbiAgICAgIHRoaXMuZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpcnN0TG9hZExvY2FsbHkodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXJcbiAgICpcbiAgICogdXNlIHRoZSB0YWJzIGZpbHRlciB0byB0cmlnZ2VyIHRoZSBmaXJzdCBsb2FkXG4gICAqXG4gICAqIFRoaXMgd2F5IHRoZSBkZWZhdWx0IHRhYiBhbmQgZmlsdGVyIGFyZSBzZWxlY3RlZCBieSB0aGUgZGVjdGFic0ZpbHRlciBjb21wb25lbnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKSB7XG4gICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5kb0ZpcnN0TG9hZCgpO1xuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRMb2NhbGx5XG4gICAqXG4gICAqIElmIG5vIGZpbHRlciBhcmUgZGVmaW5lZCwganVzdCBjYWxsIHRoIGVlbmRwb2ludCB3aXRob3V0IGZpbHRlcnNcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRMb2NhbGx5KHJlZnJlc2gpIHtcbiAgICB0aGlzLmxvYWRSZXBvcnQocmVmcmVzaCk7XG4gIH1cblxuICAvKlxuICAgKiBlbnN1cmVVbmlxdWVOYW1lXG4gICAqXG4gICAqIFdlIG11c3QgcHJvdmlkZSBhbiB1bmlxdWUgbmFtZSB0byB0aGUgbGlzdCBzbyB3ZSBjYW4gcGVyc2lzdCBpdHMgc3RhdGUgaW4gdGhlIFVSTCB3aXRob3V0IGNvbmZsaWN0c1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVOYW1lKCkge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICBjb25zdCBlcnJvciA9ICdMaXN0Q29tcG9uZW50RXJyb3I6IFRoZSBsaXN0IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUgdG8gYmUgdXNlZCBpbiB1cmwgZmlsdGVyLidcbiAgICAgICsgJyBQbGVhc2UsIGVuc3VyZSB0aGF0IHlvdSBoYXZlIHBhc3NlZCBhbiB1bmlxdWUgbmFtbWUgdG8gdGhlIGNvbXBvbmVudC4nO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBsb2FkQnlPcGVubmVkQ29sbGFwc2VcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgdHJpZ2dlcmVkIHdoZW4gYSBjb2xsYXBzYWJsZSB0YWJsZSBpcyBvcGVuLlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkQnlPcGVubmVkQ29sbGFwc2UoZmlsdGVyVWlkKSB7XG5cbiAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLmNvbGxhcHNhYmxlRmlsdGVycy5jaGlsZHJlbi5maW5kKGl0ZW0gPT4gaXRlbS51aWQgPT09IGZpbHRlclVpZCk7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cDogRmlsdGVyR3JvdXAgPSB7IGZpbHRlcnM6IGZpbHRlci5maWx0ZXJzIH07XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSwgZmlsdGVyR3JvdXApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IGZpbHRlci51aWQ7XG5cbiAgICB9LCAwKTtcblxuXG4gIH1cblxuICAvKlxuICAgKiBsb2FkUmVwb3J0XG4gICAqXG4gICAqIFRoaXMgbWVodG9kIGdhdGhlciB0aGUgZmlsdGVyIGluZm8gYW5kIGVuZHBvaW50IGFuZCBjYWxsIHRoZSBiYWNrLWVuZCB0byBmZXRjaCB0aGUgZGF0YVxuICAgKlxuICAgKiBJZiB0aGUgc3VjdG9tRmV0Y2hNZXRob2QgaXMgdXNlZCwgaXRzIGNhbGwgaXRcbiAgICpcbiAgICogSWYgb25seSB0aGUgcm93cyBhcmUgcGFzc2VkLCB0aGUgbWV0aG9kIGp1c3QgdXNlIGl0IGFzIHJlc3VsdFxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkUmVwb3J0KGNsZWFyQW5kUmVsb2FkUmVwb3J0PzogYm9vbGVhbiwgY29sbGFwc2VGaWx0ZXJHcm91cHM/OiBGaWx0ZXJHcm91cCk6IFByb21pc2U8YW55PiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cbiAgICAgIGlmIChjbGVhckFuZFJlbG9hZFJlcG9ydCAmJiB0aGlzLnJvd3MpIHtcblxuICAgICAgICB0aGlzLnNldFJvd3ModGhpcy5yb3dzKTtcblxuICAgICAgfVxuXG4gICAgICB0aGlzLmNsZWFyQW5kUmVsb2FkUmVwb3J0ID0gY2xlYXJBbmRSZWxvYWRSZXBvcnQ7XG5cbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgIGlmICh0aGlzLmVuZHBvaW50KSB7XG5cbiAgICAgICAgdGhpcy5tb3VudFBheWxvYWQoY2xlYXJBbmRSZWxvYWRSZXBvcnQsIGNvbGxhcHNlRmlsdGVyR3JvdXBzKVxuICAgICAgICAudGhlbihwYXlsb2FkID0+IHtcblxuICAgICAgICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQ7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlckRhdGEubmV4dCh7IGVuZHBvaW50OiB0aGlzLmVuZHBvaW50LCBwYXlsb2FkOiB0aGlzLnBheWxvYWQsIGNiazogcmVzLCBjbGVhcjogY2xlYXJBbmRSZWxvYWRSZXBvcnQgfSk7XG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUZldGNoTWV0aG9kKSB7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm5leHQoKTtcblxuICAgICAgfSBlbHNlIGlmICghdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMucm93cykge1xuXG4gICAgICAgICAgICByZWooJ05vIGVuZHBvaW50LCBjdXN0b21GZXRjaE1ldGhvZCBvciByb3dzIHNldCcpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgfSwgMSk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIG1vdW50UGF5bG9hZChjbGVhckFuZFJlbG9hZFJlcG9ydDogYm9vbGVhbiA9IGZhbHNlLCBjb2xsYXBzZUZpbHRlckdyb3Vwcz8pIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGNvbnN0IHNlYXJjaEZpbHRlckdyb3VwcyA9IHRoaXMuZmlsdGVyID8gdGhpcy5maWx0ZXIuZmlsdGVyR3JvdXBzIDogdW5kZWZpbmVkO1xuXG4gICAgICBjb25zdCBmaWx0ZXJHcm91cHMgPSB0aGlzLmFwcGVuZEZpbHRlckdyb3Vwc1RvRWFjaEZpbHRlckdyb3VwKHNlYXJjaEZpbHRlckdyb3VwcywgY29sbGFwc2VGaWx0ZXJHcm91cHMpO1xuXG4gICAgICBjb25zdCBwYXlsb2FkOiBEZWNGaWx0ZXIgPSB7fTtcblxuICAgICAgcGF5bG9hZC5saW1pdCA9IHRoaXMubGltaXQ7XG5cbiAgICAgIGlmIChmaWx0ZXJHcm91cHMpIHtcblxuICAgICAgICBwYXlsb2FkLmZpbHRlckdyb3VwcyA9IGZpbHRlckdyb3VwcztcblxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb2x1bW5zU29ydENvbmZpZykge1xuXG4gICAgICAgIHBheWxvYWQuc29ydCA9IHRoaXMuY29sdW1uc1NvcnRDb25maWc7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKCFjbGVhckFuZFJlbG9hZFJlcG9ydCAmJiB0aGlzLnJlcG9ydCkge1xuXG4gICAgICAgIHBheWxvYWQucGFnZSA9IHRoaXMucmVwb3J0LnBhZ2UgKyAxO1xuXG4gICAgICAgIHBheWxvYWQubGltaXQgPSB0aGlzLnJlcG9ydC5saW1pdDtcblxuICAgICAgfVxuXG4gICAgICByZXNvbHZlKHBheWxvYWQpO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGFwcGVuZEZpbHRlckdyb3Vwc1RvRWFjaEZpbHRlckdyb3VwXG4gICAqXG4gICAqIEdldHMgYW4gYXJyYXkgb2YgZmlsdGVyR3JvdXAgYW5kIGluIGVhY2ggZmlsdGVyR3JvdXAgaW4gdGhpcyBhcnJheSBhcHBlbmRzIHRoZSBzZWNvbmQgZmlsdGVyR3JvdXAgZmlsdGVycy5cbiAgICovXG4gIHByaXZhdGUgYXBwZW5kRmlsdGVyR3JvdXBzVG9FYWNoRmlsdGVyR3JvdXAoZmlsdGVyR3JvdXBzOiBGaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVG9BcHBlbmQ6IEZpbHRlckdyb3VwKSB7XG5cbiAgICBpZiAoZmlsdGVyR3JvdXBUb0FwcGVuZCkge1xuXG4gICAgICBpZiAoZmlsdGVyR3JvdXBzICYmIGZpbHRlckdyb3Vwcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXBzLmZvckVhY2goZ3JvdXAgPT4ge1xuXG4gICAgICAgICAgZ3JvdXAuZmlsdGVycy5wdXNoKC4uLmZpbHRlckdyb3VwVG9BcHBlbmQuZmlsdGVycyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZmlsdGVyR3JvdXBzID0gW2ZpbHRlckdyb3VwVG9BcHBlbmRdO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsdGVyR3JvdXBzIHx8IFtdO1xuXG4gIH1cblxuICAvKlxuICAgKiBzZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXNcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2V0RmlsdGVyc0NvbXBvbmVudHNCYXNlUGF0aEFuZE5hbWVzKCkge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG5cbiAgICAgIHRoaXMuZmlsdGVyLm5hbWUgPSB0aGlzLm5hbWU7XG5cblxuICAgICAgaWYgKHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQpIHtcblxuICAgICAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50Lm5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmV0Y2hNZXRob2QpIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuY3VzdG9tRmV0Y2hNZXRob2QgPSB0aGlzLmN1c3RvbUZldGNoTWV0aG9kO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnNlcnZpY2UgPSB0aGlzLnNlcnZpY2U7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBzZXRSb3dzXG4gICAqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgdGFibGUgcm93c1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRSb3dzKHJvd3MgPSBbXSkge1xuXG4gICAgdGhpcy5yZXBvcnQgPSB7XG5cbiAgICAgIHBhZ2U6IDEsXG5cbiAgICAgIHJlc3VsdDoge1xuXG4gICAgICAgIHJvd3M6IHJvd3MsXG5cbiAgICAgICAgY291bnQ6IHJvd3MubGVuZ3RoXG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5kZXRlY3RMYXN0UGFnZShyb3dzLCByb3dzLmxlbmd0aCk7XG5cbiAgICB0aGlzLnVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5zY3JvbGxFdmVudEVtaXRlclxuICAgIC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDE1MCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKS5zdWJzY3JpYmUodGhpcy5hY3RCeVNjcm9sbFBvc2l0aW9uKTtcblxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nU2Nyb2xsRXZlbnRFbWl0dGVyXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlcigpIHtcblxuICAgIGlmICh0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uKSB7XG5cbiAgICAgIHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJEYXRhXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoRmlsdGVyRGF0YSgpIHtcbiAgICB0aGlzLnJlYWN0aXZlUmVwb3J0ID0gdGhpcy5maWx0ZXJEYXRhXG4gICAgLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMTUwKSwgLy8gYXZvaWQgbXVpbHRpcGxlIHJlcXVlc3Qgd2hlbiB0aGUgZmlsdGVyIG9yIHRhYiBjaGFuZ2UgdG9vIGZhc3RcbiAgICAgIHN3aXRjaE1hcCgoZmlsdGVyRGF0YTogRmlsdGVyRGF0YSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4odW5kZWZpbmVkKTtcblxuICAgICAgICBjb25zdCBmZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZCB8fCB0aGlzLnNlcnZpY2UuZ2V0O1xuXG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gZmlsdGVyRGF0YSA/IGZpbHRlckRhdGEuZW5kcG9pbnQgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3QgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcyA9IHRoaXMuZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcyh0aGlzLnBheWxvYWQpO1xuXG4gICAgICAgIGlmIChmaWx0ZXJEYXRhICYmIGZpbHRlckRhdGEuY2xlYXIpIHtcbiAgICAgICAgICB0aGlzLnNldFJvd3MoW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgZmV0Y2hNZXRob2QoZW5kcG9pbnQsIHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMpXG4gICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICAgIG9ic2VydmFibGUubmV4dChyZXMpO1xuXG4gICAgICAgICAgaWYgKGZpbHRlckRhdGEgJiYgZmlsdGVyRGF0YS5jYmspIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIHdhaXQgZm9yIHN1YnNjcmliZXJzIHRvIHJlZnJlc2ggdGhlaXIgcm93c1xuXG4gICAgICAgICAgICAgIGZpbHRlckRhdGEuY2JrKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcblxuICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICAgIH0pXG5cbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXlsb2FkV2l0aFNlYXJjaFRyYW5zZm9ybWVkSW50b1NlYXJjaGFibGVQcm9wZXJ0aWVzKHBheWxvYWQpIHtcblxuICAgIGNvbnN0IHBheWxvYWRDb3B5ID0gey4uLnBheWxvYWR9O1xuXG4gICAgaWYgKHBheWxvYWRDb3B5LmZpbHRlckdyb3VwcyAmJiB0aGlzLnNlYXJjaGFibGVQcm9wZXJ0aWVzKSB7XG5cbiAgICAgIHBheWxvYWRDb3B5LmZpbHRlckdyb3VwcyA9IFsuLi5wYXlsb2FkLmZpbHRlckdyb3Vwc107XG5cbiAgICAgIHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKHBheWxvYWRDb3B5LmZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIHJldHVybiBwYXlsb2FkQ29weTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLnBheWxvYWQ7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKGZpbHRlckdyb3Vwcykge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaCA9IHRoaXMuZ2V0RmlsdGVyR3JvdXBUaGF0Q29udGFpbnNUaGVCYXNpY1NlYXJjaChmaWx0ZXJHcm91cHMpO1xuXG4gICAgaWYgKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpIHtcblxuICAgICAgdGhpcy5yZW1vdmVGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgICBjb25zdCBiYXNpY1NlYXJjaCA9IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2guZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIucHJvcGVydHkgPT09ICdzZWFyY2gnKTtcblxuICAgICAgY29uc3QgYmFzaWNTZWFyY2hJbmRleCA9IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2guZmlsdGVycy5pbmRleE9mKGJhc2ljU2VhcmNoKTtcblxuICAgICAgdGhpcy5zZWFyY2hhYmxlUHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcblxuICAgICAgICBjb25zdCBuZXdGaWx0ZXJHcm91cDogRmlsdGVyR3JvdXAgPSB7XG4gICAgICAgICAgZmlsdGVyczogWy4uLmZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2guZmlsdGVyc11cbiAgICAgICAgfTtcblxuICAgICAgICBuZXdGaWx0ZXJHcm91cC5maWx0ZXJzW2Jhc2ljU2VhcmNoSW5kZXhdID0ge1xuICAgICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICB2YWx1ZTogW2Jhc2ljU2VhcmNoLnZhbHVlXVxuICAgICAgICB9O1xuXG4gICAgICAgIGZpbHRlckdyb3Vwcy5wdXNoKG5ld0ZpbHRlckdyb3VwKTtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlRmlsdGVyR3JvdXAoZmlsdGVyR3JvdXBzLCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKSB7XG5cbiAgICBjb25zdCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoSW5kZXggPSBmaWx0ZXJHcm91cHMuaW5kZXhPZihmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKTtcblxuICAgIGZpbHRlckdyb3Vwcy5zcGxpY2UoZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaEluZGV4LCAxKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWx0ZXJHcm91cFRoYXRDb250YWluc1RoZUJhc2ljU2VhcmNoKGZpbHRlckdyb3Vwcykge1xuXG4gICAgcmV0dXJuIGZpbHRlckdyb3Vwcy5maW5kKGZpbHRlckdyb3VwID0+IHtcblxuICAgICAgY29uc3QgYmFzaWNTZXJjaEZpbHRlciA9IGZpbHRlckdyb3VwLmZpbHRlcnMgPyBmaWx0ZXJHcm91cC5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci5wcm9wZXJ0eSA9PT0gJ3NlYXJjaCcpIDogdW5kZWZpbmVkO1xuXG4gICAgICByZXR1cm4gYmFzaWNTZXJjaEZpbHRlciA/IHRydWUgOiBmYWxzZTtcblxuICAgIH0pO1xuXG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKSB7XG4gICAgdGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbiA9IHRoaXMucmVhY3RpdmVSZXBvcnRcbiAgICAucGlwZShcbiAgICAgIHRhcChyZXMgPT4ge1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSAmJiBkYXRhLnJlc3VsdCAmJiBkYXRhLnJlc3VsdC5yb3dzKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNsZWFyQW5kUmVsb2FkUmVwb3J0KSB7XG4gICAgICAgICAgZGF0YS5yZXN1bHQucm93cyA9IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzLmNvbmNhdChkYXRhLnJlc3VsdC5yb3dzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVwb3J0ID0gZGF0YTtcblxuICAgICAgICB0aGlzLnBvc3RTZWFyY2guZW1pdChkYXRhKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpO1xuXG4gICAgICAgIHRoaXMuZGV0ZWN0TGFzdFBhZ2UoZGF0YS5yZXN1bHQucm93cywgZGF0YS5yZXN1bHQuY291bnQpO1xuXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RMYXN0UGFnZShyb3dzLCBjb3VudCkge1xuXG4gICAgY29uc3QgbnVtYmVyT2Zyb3dzID0gcm93cy5sZW5ndGg7XG5cbiAgICBjb25zdCBlbXB0TGlzdCA9IG51bWJlck9mcm93cyA9PT0gMDtcblxuICAgIGNvbnN0IHNpbmdsZVBhZ2VMaXN0ID0gbnVtYmVyT2Zyb3dzID09PSBjb3VudDtcblxuICAgIHRoaXMuaXNMYXN0UGFnZSA9IGVtcHRMaXN0IHx8IHNpbmdsZVBhZ2VMaXN0O1xuXG4gIH1cblxuICAvKlxuICAgKiB1bnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0KCkge1xuICAgIGlmICh0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogdXBkYXRlQ29udGVudENoaWxkcmVuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZUNvbnRlbnRDaGlsZHJlbigpIHtcblxuICAgIGNvbnN0IHJvd3MgPSB0aGlzLmVuZHBvaW50ID8gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MgOiB0aGlzLnJvd3M7XG4gICAgaWYgKHRoaXMuZ3JpZCkge1xuICAgICAgdGhpcy5ncmlkLnJvd3MgPSByb3dzO1xuICAgIH1cbiAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgdGhpcy50YWJsZS5yb3dzID0gcm93cztcbiAgICB9XG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci5jb3VudCA9IHRoaXMucmVwb3J0LnJlc3VsdC5jb3VudDtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiByZWdpc3RlckNoaWxkV2F0Y2hlcnNcbiAgICpcbiAgICogV2F0Y2ggZm9yIGNoaWxkcmVuIG91dHB1dHNcbiAgICovXG4gIHByaXZhdGUgcmVnaXN0ZXJDaGlsZFdhdGNoZXJzKCkge1xuXG4gICAgaWYgKHRoaXMuZ3JpZCkge1xuICAgICAgdGhpcy53YXRjaEdyaWRSb3dDbGljaygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICB0aGlzLndhdGNoVGFibGVSb3dDbGljaygpO1xuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hHcmlkUm93Q2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hHcmlkUm93Q2xpY2soKSB7XG4gICAgdGhpcy5ncmlkLnJvd0NsaWNrLnN1YnNjcmliZSgoJGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJvd0NsaWNrLmVtaXQoJGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoVGFibGVSb3dDbGlja1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYmxlUm93Q2xpY2soKSB7XG4gICAgdGhpcy50YWJsZS5yb3dDbGljay5zdWJzY3JpYmUoKCRldmVudCkgPT4ge1xuICAgICAgdGhpcy5yb3dDbGljay5lbWl0KCRldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaEZpbHRlclxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5maWx0ZXIuc2VhcmNoLnN1YnNjcmliZShldmVudCA9PiB7XG5cbiAgICAgICAgY29uc3QgdGFiQ2hhbmdlZCA9IHRoaXMucHJldmlvdXNTZWxlY3RlZFRhYiAmJiB0aGlzLnByZXZpb3VzU2VsZWN0ZWRUYWIgIT09IHRoaXMuc2VsZWN0ZWRUYWI7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyTW9kZUNoYW5nZWQgPSB0aGlzLmZpbHRlck1vZGUgIT09IGV2ZW50LmZpbHRlck1vZGU7XG5cbiAgICAgICAgaWYgKHRhYkNoYW5nZWQpIHtcblxuICAgICAgICAgIHRoaXMucHJldmlvdXNTZWxlY3RlZFRhYiA9IHRoaXMuc2VsZWN0ZWRUYWI7XG5cbiAgICAgICAgICB0aGlzLnNldFJvd3MoW10pOyAvLyBpZiBjaGFuZ2luZyB0YWJzLCBjbGVhciB0aGUgcmVzdWx0cyBiZWZvcmUgc2hvd2luZyB0aGUgcm93cyBiZWNhdXNlIGl0IGlzIGRvbmUgb25seSBhZnRlciBmZXRjaGluZyB0aGUgZGF0YVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsdGVyTW9kZUNoYW5nZWQpIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyTW9kZSA9IGV2ZW50LmZpbHRlck1vZGU7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlck1vZGUgPT09ICd0YWJzJykge1xuXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdGhpcy5jb2xsYXBzYWJsZUZpbHRlcnMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSkudGhlbigocmVzKSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChldmVudC5yZWNvdW50KSB7XG5cbiAgICAgICAgICAgICAgdGhpcy5yZWxvYWRDb3VudFJlcG9ydCgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmNvdW50UmVwb3J0IHx8IGV2ZW50LnJlY291bnQpIHtcblxuICAgICAgICAgICAgdGhpcy5yZWxvYWRDb3VudFJlcG9ydCgpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSAmJiAhdGFiQ2hhbmdlZCkge1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRCeU9wZW5uZWRDb2xsYXBzZSh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNhYmxlRmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgdGFiOiB0aGlzLnNlbGVjdGVkVGFiLFxuICAgICAgICAgICAgICBjaGlsZHJlbjogZXZlbnQuY2hpbGRyZW4gPyBldmVudC5jaGlsZHJlbiA6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLmZpbHRlclN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5maWx0ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFNjcm9sbFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFNjcm9sbCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyQ2xhc3MpWzBdO1xuICAgICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLnNjcm9sbGFibGVDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5lbWl0U2Nyb2xsRXZlbnQsIHRydWUpO1xuICAgICAgfVxuICAgIH0sIDEpO1xuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nU2Nyb2xsXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1Njcm9sbCgpIHtcbiAgICBpZiAodGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLnNjcm9sbGFibGVDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5lbWl0U2Nyb2xsRXZlbnQsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJzQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5zZWxlY3RlZFRhYjtcbiAgICAgIHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQudGFiQ2hhbmdlLnN1YnNjcmliZSh0YWIgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGFiO1xuICAgICAgICB0aGlzLmRldGVjdExpc3RNb2RlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1RhYnNDaGFuZ2VcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFic0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFRhYmxlU29ydFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFRhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZSkge1xuXG4gICAgICB0aGlzLnRhYmxlU29ydFN1YnNjcmlwdGlvbiA9IHRoaXMudGFibGUuc29ydC5zdWJzY3JpYmUoY29sdW1uc1NvcnRDb25maWcgPT4ge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnNTb3J0Q29uZmlnICE9PSBjb2x1bW5zU29ydENvbmZpZykge1xuXG4gICAgICAgICAgdGhpcy5jb2x1bW5zU29ydENvbmZpZyA9IGNvbHVtbnNTb3J0Q29uZmlnO1xuXG4gICAgICAgICAgaWYgKHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzKSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZEJ5T3Blbm5lZENvbGxhcHNlKHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdG9wV2F0Y2hpbmdUYWJsZVNvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFibGVTb3J0KCkge1xuICAgIGlmICh0aGlzLnRhYmxlU29ydFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxufVxuIl19