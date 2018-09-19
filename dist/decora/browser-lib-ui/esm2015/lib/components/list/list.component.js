/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            /** @type {?} */
            let listMode = this.listMode;
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
                /** @type {?} */
                const elementWithCdkOverlayClass = $event['path'].find(path => {
                    /** @type {?} */
                    const className = path['className'] || '';
                    /** @type {?} */
                    const insideOverlay = className.indexOf('cdk-overlay') >= 0;
                    /** @type {?} */
                    const insideFullscreanDialogContainer = className.indexOf('fullscrean-dialog-container') >= 0;
                    return insideOverlay || insideFullscreanDialogContainer;
                });
                if (!elementWithCdkOverlayClass) {
                    // avoid closing filter from any open dialog
                    if (!this.isLastPage) {
                        /** @type {?} */
                        const target = $event['target'];
                        /** @type {?} */
                        const limit = target.scrollHeight - target.clientHeight;
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
            /** @type {?} */
            const endpoint = this.endpoint[this.endpoint.length - 1] === '/' ? `${this.endpoint}count` : `${this.endpoint}/count`;
            /** @type {?} */
            const filters = this.filter.filters;
            /** @type {?} */
            const payloadWithSearchableProperties = this.getCountableFilters(filters);
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
        /** @type {?} */
        const item = this.rows.find(_item => _item.id === id);
        if (item) {
            /** @type {?} */
            const itemIndex = this.rows.indexOf(item);
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
        this.resetSelected();
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
        catch (error) {
            return '?';
        }
    }
    /**
     * @param {?} filtersCounters
     * @return {?}
     */
    mountCountReport(filtersCounters) {
        /** @type {?} */
        const countReport = {
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
        /** @type {?} */
        const filterGroupsWithoutTabs = this.filter.filterGroupsWithoutTabs || [{ filters: [] }];
        /** @type {?} */
        const filtersPlusSearch = filters.map(decFilter => {
            /** @type {?} */
            const decFilterFiltersPlusSearch = JSON.parse(JSON.stringify(decFilter));
            if (decFilterFiltersPlusSearch.filters) {
                /** @type {?} */
                const tabFiltersCopy = JSON.parse(JSON.stringify(decFilterFiltersPlusSearch.filters));
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
            /** @type {?} */
            const error = 'ListComponentError: The list component must have an unique name to be used in url filter.'
                + ' Please, ensure that you have passed an unique namme to the component.';
            throw new Error(error);
        }
    }
    /**
     * @param {?} filterUid
     * @return {?}
     */
    loadByOpennedCollapse(filterUid) {
        console.log('loadByOpennedCollapse', filterUid);
        /** @type {?} */
        const filter = this.collapsableFilters.children.find(item => item.uid === filterUid);
        /** @type {?} */
        const filterGroup = { filters: filter.filters };
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
                this.resetSelected();
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
                this.mountPayload(clearAndReloadReport, collapseFilterGroups)
                    .then(payload => {
                    this.payload = payload;
                    this.filterData.next();
                });
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
            /** @type {?} */
            const searchFilterGroups = this.filter ? this.filter.filterGroups : undefined;
            /** @type {?} */
            const filterGroups = this.appendFilterGroupsToEachFilterGroup(searchFilterGroups, collapseFilterGroups);
            /** @type {?} */
            const payload = {};
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
            /** @type {?} */
            const observable = new BehaviorSubject(undefined);
            /** @type {?} */
            const fetchMethod = this.customFetchMethod || this.service.get;
            /** @type {?} */
            const endpoint = filterData ? filterData.endpoint : undefined;
            /** @type {?} */
            const payloadWithSearchableProperties = this.getPayloadWithSearchTransformedIntoSearchableProperties(this.payload);
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
        /** @type {?} */
        const payloadCopy = Object.assign({}, payload);
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
        /** @type {?} */
        const filterGroupsThatContainsBasicSearch = this.getFilterGroupsThatContainsTheBasicSearch(filterGroups);
        if (filterGroupsThatContainsBasicSearch && filterGroupsThatContainsBasicSearch.length > 0) {
            filterGroupsThatContainsBasicSearch.forEach(filterGroupThatContainsBasicSearch => {
                this.removeFilterGroup(filterGroups, filterGroupThatContainsBasicSearch);
                /** @type {?} */
                const basicSearch = filterGroupThatContainsBasicSearch.filters.find(filter => filter.property === 'search');
                /** @type {?} */
                const basicSearchIndex = filterGroupThatContainsBasicSearch.filters.indexOf(basicSearch);
                this.searchableProperties.forEach(property => {
                    /** @type {?} */
                    const newFilterGroup = {
                        filters: [...filterGroupThatContainsBasicSearch.filters]
                    };
                    newFilterGroup.filters[basicSearchIndex] = {
                        property: property,
                        value: [basicSearch.value]
                    };
                    filterGroups.push(newFilterGroup);
                });
            });
        }
    }
    /**
     * @param {?} filterGroups
     * @param {?} filterGroupThatContainsBasicSearch
     * @return {?}
     */
    removeFilterGroup(filterGroups, filterGroupThatContainsBasicSearch) {
        /** @type {?} */
        const filterGroupThatContainsBasicSearchIndex = filterGroups.indexOf(filterGroupThatContainsBasicSearch);
        filterGroups.splice(filterGroupThatContainsBasicSearchIndex, 1);
    }
    /**
     * @param {?} filterGroups
     * @return {?}
     */
    getFilterGroupsThatContainsTheBasicSearch(filterGroups) {
        return filterGroups.filter(filterGroup => {
            /** @type {?} */
            const basicSerchFilter = filterGroup.filters ? filterGroup.filters.find(filter => filter.property === 'search') : undefined;
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
        /** @type {?} */
        const numberOfrows = rows.length;
        /** @type {?} */
        const emptList = numberOfrows === 0;
        /** @type {?} */
        const singlePageList = numberOfrows === count;
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
        /** @type {?} */
        const rows = this.endpoint ? this.report.result.rows : this.rows;
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
                console.log('EVENT', event);
                /** @type {?} */
                const tabChanged = !this.previousSelectedTab || (this.previousSelectedTab !== this.selectedTab);
                /** @type {?} */
                const filterModeChanged = this.filterMode !== event.filterMode;
                if (!this.previousSelectedTab || tabChanged) {
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
                        this.collapsableFilters = {
                            tab: this.selectedTab,
                            children: event.children ? event.children : []
                        };
                        this.selectedCollapsable = undefined;
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
    /**
     * @return {?}
     */
    resetSelected() {
        this.table.selected = [];
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2SCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RSxPQUFPLEVBQWMsZUFBZSxFQUFnQixPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBOEZ4RSxNQUFNOzs7O0lBNlZKLFlBQ1U7UUFBQSxZQUFPLEdBQVAsT0FBTzs7Ozs7OzBCQWhWaUIsTUFBTTswQkFnRkUsSUFBSSxPQUFPLEVBQWM7d0JBT2hELElBQUk7aUNBMENLLElBQUksWUFBWSxFQUFPOzs7Ozs7cUJBOEhsQyxFQUFFOzs7Ozs7d0NBY2lCLHFCQUFxQjs7Ozs7OzBCQWNuQyxJQUFJOzs7Ozs7MEJBT0gsSUFBSSxZQUFZLEVBQU87Ozs7Ozt3QkFPTixJQUFJLFlBQVksRUFBTzsyQkFrUHpDLEdBQUcsRUFBRTs7WUFFekIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUU3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsbUJB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S0FBSzttQkFnQkwsS0FBSzttQkFpQkwsS0FBSyxTQUFDLE1BQU07b0JBZVosS0FBSzt1QkFPTCxLQUFLO3VDQU9MLEtBQUs7bUNBT0wsS0FBSzt5QkFPTCxLQUFLO3lCQU9MLE1BQU07dUJBT04sTUFBTTttQkFPTixZQUFZLFNBQUMsb0JBQW9CO29CQU9qQyxZQUFZLFNBQUMscUJBQXFCO3FCQU9sQyxZQUFZLFNBQUMsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0xpc3RHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWdyaWQvbGlzdC1ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNMaXN0VGFibGVDb21wb25lbnQgfSBmcm9tICcuL2xpc3QtdGFibGUvbGlzdC10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjTGlzdEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1maWx0ZXIvbGlzdC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjTGlzdEZldGNoTWV0aG9kLCBDb3VudFJlcG9ydCB9IGZyb20gJy4vbGlzdC5tb2RlbHMnO1xuaW1wb3J0IHsgRmlsdGVyRGF0YSwgRGVjRmlsdGVyLCBGaWx0ZXJHcm91cHMsIEZpbHRlckdyb3VwIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5tb2RlbCc7XG5pbXBvcnQgeyBEZWNMaXN0RmlsdGVyIH0gZnJvbSAnLi9saXN0Lm1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0JyxcbiAgdGVtcGxhdGU6IGA8IS0tIENPTVBPTkVOVCBMQVlPVVQgLS0+XG48ZGl2IGNsYXNzPVwibGlzdC1jb21wb25lbnQtd3JhcHBlclwiPlxuICA8ZGl2ICpuZ0lmPVwiZmlsdGVyXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZmlsdGVyXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cInJlcG9ydCB8fCBmaWx0ZXJNb2RlID09PSAnY29sbGFwc2UnXCI+XG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICAgICAgPGRpdiBmeEZsZXggY2xhc3M9XCJ0ZXh0LXJpZ2h0XCIgKm5nSWY9XCJ0YWJsZUFuZEdyaWRBcmVTZXQoKVwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInRvZ2dsZUxpc3RNb2RlKClcIj5cbiAgICAgICAgICA8bWF0LWljb24gdGl0bGU9XCJTd2l0Y2ggdG8gdGFibGUgbW9kZVwiIGFyaWEtbGFiZWw9XCJTd2l0Y2ggdG8gdGFibGUgbW9kZVwiIGNvbG9yPVwicHJpbWFyeVwiIGNvbnRyYXN0Rm9udFdpdGhCZyAqbmdJZj1cImxpc3RNb2RlID09PSAnZ3JpZCdcIj52aWV3X2hlYWRsaW5lPC9tYXQtaWNvbj5cbiAgICAgICAgICA8bWF0LWljb24gdGl0bGU9XCJTd2l0Y2ggdG8gZ3JpZCBtb2RlXCIgYXJpYS1sYWJlbD1cIlN3aXRjaCB0byBncmlkIG1vZGVcIiBjb2xvcj1cInByaW1hcnlcIiBjb250cmFzdEZvbnRXaXRoQmcgKm5nSWY9XCJsaXN0TW9kZSA9PT0gJ3RhYmxlJ1wiPnZpZXdfbW9kdWxlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgZnhGbGV4PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyTW9kZSA9PSAnY29sbGFwc2UnIHRoZW4gY29sbGFwc2VUZW1wbGF0ZSBlbHNlIHRhYnNUZW1wbGF0ZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjwhLS0gR1JJRCBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjZ3JpZFRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC1ncmlkXCI+PC9uZy1jb250ZW50PlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUQUJMRSBURU1QTEFURSAtLT5cbjxuZy10ZW1wbGF0ZSAjbGlzdFRlbXBsYXRlPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtbGlzdC10YWJsZVwiPjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gRk9PVEVSIFRFTVBMQVRFIC0tPlxuPG5nLXRlbXBsYXRlICNmb290ZXJUZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWxpc3QtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICA8cCBjbGFzcz1cImxpc3QtZm9vdGVyXCI+XG4gICAge3sgJ2xhYmVsLmFtb3VudC1sb2FkZWQtb2YtdG90YWwnIHxcbiAgICAgIHRyYW5zbGF0ZTp7XG4gICAgICAgIGxvYWRlZDogcmVwb3J0Py5yZXN1bHQ/LnJvd3M/Lmxlbmd0aCxcbiAgICAgICAgdG90YWw6IHJlcG9ydD8ucmVzdWx0Py5jb3VudFxuICAgICAgfVxuICAgIH19XG4gIDwvcD5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gQ09MTEFQU0UgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI3RhYnNUZW1wbGF0ZT5cbiAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICAgIDxkaXYgKm5nSWY9XCJsaXN0TW9kZSA9PSAnZ3JpZCcgdGhlbiBncmlkVGVtcGxhdGUgZWxzZSBsaXN0VGVtcGxhdGVcIj48L2Rpdj5cbiAgICA8IS0tIEZPT1RFUiBDT05URU5UIC0tPlxuICAgIDxkaXYgZnhGbGV4PlxuICAgICAgPGRpdiAqbmdJZj1cInNob3dGb290ZXIgJiYgIWxvYWRpbmcgdGhlbiBmb290ZXJUZW1wbGF0ZVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gTE9BRElORyBTUElOTkVSIC0tPlxuICAgIDxkaXYgZnhGbGV4ICpuZ0lmPVwibG9hZGluZ1wiIGNsYXNzPVwidGV4dC1jZW50ZXIgbG9hZGluZy1zcGlubmVyLXdyYXBwZXJcIj5cbiAgICAgIDxkZWMtc3Bpbm5lcj48L2RlYy1zcGlubmVyPlxuICAgIDwvZGl2PlxuICAgIDwhLS0gTE9BRCBNT1JFIEJVVFRPTiAtLT5cbiAgICA8ZGl2IGZ4RmxleCAqbmdJZj1cIiFpc0xhc3RQYWdlICYmICFsb2FkaW5nICYmICFkaXNhYmxlU2hvd01vcmVCdXR0b25cIiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwic2hvd01vcmUoKVwiPnt7J2xhYmVsLnNob3ctbW9yZScgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gQ09MTEFQU0UgVEVNUExBVEUgLS0+XG48bmctdGVtcGxhdGUgI2NvbGxhcHNlVGVtcGxhdGU+XG4gIDxtYXQtYWNjb3JkaW9uPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBjb2xsYXBzYWJsZUZpbHRlcnMuY2hpbGRyZW5cIj5cbiAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsIChvcGVuZWQpPVwic2VhcmNoQ29sbGFwc2FibGUoZmlsdGVyKVwiPlxuICAgICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxhcHNlLXRpdGxlXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjMycHhcIiBmeExheW91dEFsaWduPVwibGVmdCBjZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgZnhGbGV4PVwiOTZweFwiICpuZ0lmPVwiY291bnRSZXBvcnRcIj5cbiAgICAgICAgICAgICAgPGRlYy1sYWJlbCBbY29sb3JIZXhdPVwiZmlsdGVyLmNvbG9yXCI+e3sgZ2V0Q29sbGFwc2FibGVDb3VudChmaWx0ZXIudWlkKSB9fTwvZGVjLWxhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7eyAnbGFiZWwuJyArIGZpbHRlci5sYWJlbCB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2VsZWN0ZWRDb2xsYXBzYWJsZSA9PT0gZmlsdGVyLnVpZFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFic1RlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L21hdC1hY2NvcmRpb24+XG4gIDxkaXYgY2xhc3M9XCJhY2NvcmRpb24tYm90dG9tLW1hcmdpblwiPjwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbYC5saXN0LWZvb3Rlcntmb250LXNpemU6MTRweDt0ZXh0LWFsaWduOmNlbnRlcn0ubGlzdC1jb21wb25lbnQtd3JhcHBlcnttaW4taGVpZ2h0OjcycHh9LnRleHQtcmlnaHR7dGV4dC1hbGlnbjpyaWdodH0ubG9hZGluZy1zcGlubmVyLXdyYXBwZXJ7cGFkZGluZzozMnB4fS5jb2xsYXBzZS10aXRsZXt3aWR0aDoxMDAlfS5hY2NvcmRpb24tYm90dG9tLW1hcmdpbnttYXJnaW4tYm90dG9tOjEwMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgLypcbiAgKiBjb3VudFJlcG9ydFxuICAqXG4gICpcbiAgKi9cbiAgY291bnRSZXBvcnQ6IENvdW50UmVwb3J0O1xuXG4gIC8qXG4gICogZmlsdGVyTW9kZVxuICAqXG4gICpcbiAgKi9cbiAgZmlsdGVyTW9kZTogJ3RhYnMnIHwgJ2NvbGxhcHNlJyA9ICd0YWJzJztcblxuXG4gIC8qXG4gICogY29sbGFwc2FibGVGaWx0ZXJzXG4gICpcbiAgKlxuICAqL1xuICBjb2xsYXBzYWJsZUZpbHRlcnM6IHsgdGFiOiBzdHJpbmcsIGNoaWxkcmVuOiBEZWNMaXN0RmlsdGVyW10gfTtcblxuICAvKlxuICAgKiBsb2FkaW5nXG4gICAqXG4gICAqXG4gICAqL1xuICBzZXQgbG9hZGluZyh2KSB7XG5cbiAgICB0aGlzLl9sb2FkaW5nID0gdjtcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuXG4gICAgICB0aGlzLmZpbHRlci5sb2FkaW5nID0gdjtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IGxvYWRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gIH1cblxuICAvKlxuICAgKiBmaWx0ZXJHcm91cHNcbiAgICpcbiAgICpcbiAgICovXG4gIGdldCBmaWx0ZXJHcm91cHMoKTogRmlsdGVyR3JvdXBzIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHMgOiBbXTtcbiAgfVxuXG4gIC8qXG4gICAqIHNlbGVjdGVkQ29sbGFwc2FibGVcbiAgICpcbiAgICpcbiAgICovXG4gIHNlbGVjdGVkQ29sbGFwc2FibGU7XG5cbiAgLypcbiAgICogcmVwb3J0XG4gICAqXG4gICAqXG4gICAqL1xuICByZXBvcnQ7XG5cbiAgLypcbiAgICogaXNMYXN0UGFnZVxuICAgKlxuICAgKlxuICAgKi9cbiAgaXNMYXN0UGFnZTogYm9vbGVhbjtcblxuICAvKlxuICAqIHNlbGVjdGVkVGFiXG4gICpcbiAgKlxuICAqL1xuICBzZWxlY3RlZFRhYjogYW55O1xuXG4gIC8qXG4gICogcHJldmlvdXNTZWxlY3RlZFRhYlxuICAqXG4gICpcbiAgKi9cbiAgcHJldmlvdXNTZWxlY3RlZFRhYjogYW55O1xuXG4gIC8qXG4gICAqIGZpbHRlckRhdGFcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyRGF0YTogU3ViamVjdDxGaWx0ZXJEYXRhPiA9IG5ldyBTdWJqZWN0PEZpbHRlckRhdGE+KCk7XG5cbiAgLypcbiAgICogX2xvYWRpbmc7XG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9sb2FkaW5nID0gdHJ1ZTtcblxuICAvKlxuICAgKiBjbGVhckFuZFJlbG9hZFJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhckFuZFJlbG9hZFJlcG9ydDtcblxuICAvKlxuICAgKiBmaWx0ZXJTdWJzY3JpcHRpb25cbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogcmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcmVhY3RpdmVSZXBvcnQ6IE9ic2VydmFibGU8YW55PjtcblxuICAvKlxuICAgKiByZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSByZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHNjcm9sbGFibGVDb250YWluZXJcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc2Nyb2xsYWJsZUNvbnRhaW5lcjogRWxlbWVudDtcblxuICAvKlxuICAgKiBzY3JvbGxFdmVudEVtaXRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzY3JvbGxFdmVudEVtaXRlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIHNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogdGFic0NoYW5nZVN1YnNjcmlwdGlvblxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB0YWJzQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLypcbiAgICogdGFibGVTb3J0U3Vic2NyaXB0aW9uXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHRhYmxlU29ydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qXG4gICAqIHBheWxvYWRcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgcGF5bG9hZDogRGVjRmlsdGVyO1xuXG4gIC8qXG4gICAqIF9lbmRwb2ludCBpbnRlcm5hbGxcbiAgICpcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2VuZHBvaW50OiBzdHJpbmc7XG5cbiAgLypcbiAgICogX2ZpbHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsdGVyOiBEZWNMaXN0RmlsdGVyQ29tcG9uZW50O1xuXG4gIC8qXG4gICAqIF9uYW1lXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG5cbiAgLypcbiAgICogY3VzdG9tRmV0Y2hNZXRob2RcbiAgICpcbiAgICogbWV0aG9kIHVzZWQgdG8gZmV0Y2ggZGF0YSBmcm9tIGJhY2stZW5kXG4gICAqL1xuICBASW5wdXQoKSBjdXN0b21GZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kO1xuXG4gIC8qXG4gICAqIGNvbHVtbnNTb3J0Q29uZmlnXG4gICAqXG4gICAqIHVzZWQgdG8gZ2V0IGEgc29ydGVkIGxpc3QgZnJvbSBiYWNrZW5kXG4gICAqIGNhbiBiZSBwYXNlZCB2aWEgYXR0cmlidXRlIHRvIHNvcnQgdGhlIGZpcnN0IGxvYWRcbiAgICovXG4gIEBJbnB1dCgpIGNvbHVtbnNTb3J0Q29uZmlnO1xuXG4gIC8qXG4gICAqIGRpc2FibGVTaG93TW9yZUJ1dHRvblxuICAgKlxuICAgKiB1c2VkIHRvIGhpZGUgdGhlIHNob3cgbW9yZSBidXR0b25cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVTaG93TW9yZUJ1dHRvbjogYm9vbGVhbjtcblxuICAvKlxuICAgKiBlbmRwb2ludFxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGVuZHBvaW50KHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9lbmRwb2ludCAhPT0gdikge1xuICAgICAgdGhpcy5fZW5kcG9pbnQgPSAodlswXSAmJiB2WzBdID09PSAnLycpID8gdi5yZXBsYWNlKCcvJywgJycpIDogdjtcbiAgICB9XG4gIH1cblxuICBnZXQgZW5kcG9pbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZW5kcG9pbnQ7XG4gIH1cblxuICAvKlxuICAgKiBuYW1lXG4gICAqXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgbmFtZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fbmFtZSAhPT0gdikge1xuICAgICAgdGhpcy5fbmFtZSA9IHY7XG4gICAgICB0aGlzLnNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgLypcbiAgICogcm93c1xuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCdyb3dzJylcblxuICBzZXQgcm93cyhyb3dzKSB7XG4gICAgdGhpcy5zZXRSb3dzKHJvd3MpO1xuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVwb3J0ID8gdGhpcy5yZXBvcnQucmVzdWx0LnJvd3MgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKlxuICAgKiBsaW1pdFxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgbGltaXQgPSAxMDtcblxuICAvKlxuICAgKiBsaXN0TW9kZVxuICAgKlxuICAgKlxuICAgKi9cbiAgQElucHV0KCkgbGlzdE1vZGU7XG5cbiAgLypcbiAgICogc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzXG4gICAqXG4gICAqIFdoZXJlIHRoZSBzY3JvbGwgd2F0Y2hlciBzaG91bGQgYmUgbGlzdGVuaW5nXG4gICAqL1xuICBASW5wdXQoKSBzY3JvbGxhYmxlQ29udGFpbmVyQ2xhc3MgPSAnbWF0LXNpZGVuYXYtY29udGVudCc7XG5cbiAgLypcbiAgICogc2VhcmNoYWJsZVByb3BlcnRpZXNcbiAgICpcbiAgICogUHJvcGVydGllcyB0byBiZSBzZWFyY2hlZCB3aGVuIHVzaW5nIGJhc2ljIHNlYXJjaFxuICAgKi9cbiAgQElucHV0KCkgc2VhcmNoYWJsZVByb3BlcnRpZXM6IHN0cmluZ1tdO1xuXG4gIC8qXG4gICAqIHNob3dGb290ZXJcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIHNob3dGb290ZXIgPSB0cnVlO1xuXG4gIC8qXG4gICAqIHBvc3RTZWFyY2hcbiAgICpcbiAgICogVGhpcyBtaWRkbGV3YXJlIGlzIHVzZWQgdG8gdHJpZ2dlciBldmVudHMgYWZ0ZXIgZXZlcnkgc2VhcmNoXG4gICAqL1xuICBAT3V0cHV0KCkgcG9zdFNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qXG4gICAqIHJvd0NsaWNrXG4gICAqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gYSByb3cgb3IgY2FyZCBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgcm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLypcbiAgICogZ3JpZFxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0R3JpZENvbXBvbmVudCkgZ3JpZDogRGVjTGlzdEdyaWRDb21wb25lbnQ7XG5cbiAgLypcbiAgICogdGFibGVcbiAgICpcbiAgICpcbiAgICovXG4gIEBDb250ZW50Q2hpbGQoRGVjTGlzdFRhYmxlQ29tcG9uZW50KSB0YWJsZTogRGVjTGlzdFRhYmxlQ29tcG9uZW50O1xuXG4gIC8qXG4gICAqIGZpbHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChEZWNMaXN0RmlsdGVyQ29tcG9uZW50KVxuICBzZXQgZmlsdGVyKHY6IERlY0xpc3RGaWx0ZXJDb21wb25lbnQpIHtcbiAgICBpZiAodGhpcy5fZmlsdGVyICE9PSB2KSB7XG4gICAgICB0aGlzLl9maWx0ZXIgPSB2O1xuICAgICAgdGhpcy5zZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZmlsdGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXI7XG4gIH1cblxuICAvKlxuICAgKiBuZ09uSW5pdFxuICAgKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlXG4gICkgeyB9XG5cbiAgLypcbiAgICogbmdPbkluaXRcbiAgICpcbiAgICogU3RhcnRzIGEgZnJlc2ggY29tcG9uZW50IGFuZCBwcmVwYXJlIGl0IHRvIHJ1blxuICAgKlxuICAgKiAtIFN0YXJ0IHRoZSBSZWFjdGl2ZSBSZXBvcnRcbiAgICogLSBTdWJzY3JpYmUgdG8gdGhlIFJlYWN0aXZlIFJlcG9ydFxuICAgKiAtIFN0YXJ0IHdhdGNoaW5nIHdpbmRvdyBTY3JvbGxcbiAgICogLSBFbnN1cmUgdW5pcXVlIG5hbWVcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMud2F0Y2hGaWx0ZXJEYXRhKCk7XG4gICAgdGhpcy5lbnN1cmVVbmlxdWVOYW1lKCk7XG4gICAgdGhpcy5kZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpO1xuICB9XG5cbiAgLypcbiAgKiBuZ0FmdGVyVmlld0luaXRcbiAgKlxuICAqIFdhaXQgZm9yIHRoZSBzdWJjb21wb25lbnRzIHRvIHN0YXJ0IGJlZm9yZSBydW4gdGhlIGNvbXBvbmVudFxuICAqXG4gICogLSBTdGFydCB3YXRjaGluZyBGaWx0ZXJcbiAgKiAtIERvIHRoZSBmaXJzdCBsb2FkXG4gICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLndhdGNoRmlsdGVyKCk7XG4gICAgdGhpcy5kb0ZpcnN0TG9hZCgpO1xuICAgIHRoaXMuZGV0ZWN0TGlzdE1vZGUoKTtcbiAgICB0aGlzLndhdGNoVGFic0NoYW5nZSgpO1xuICAgIHRoaXMud2F0Y2hUYWJsZVNvcnQoKTtcbiAgICB0aGlzLnJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpO1xuICAgIHRoaXMud2F0Y2hTY3JvbGwoKTtcbiAgICB0aGlzLndhdGNoU2Nyb2xsRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICAvKlxuICAgKiBuZ09uRGVzdHJveVxuICAgKlxuICAgKiBEZXN0cm95IHdhdGNoZXIgdG8gZnJlZSBtZWVtb3J5IGFuZCByZW1vdmUgdW5uZWNlc3NhcnkgdHJpZ2dlcnNcbiAgICpcbiAgICogLSBVbnN1YnNjcmliZSBmcm9tIHRoZSBSZWFjdGl2ZSBSZXBvcnRcbiAgICogLSBTdG9wIHdhdGNoaW5nIHdpbmRvdyBTY3JvbGxcbiAgICogLSBTdG9wIHdhdGNoaW5nIEZpbHRlclxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1Njcm9sbCgpO1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nRmlsdGVyKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJzQ2hhbmdlKCk7XG4gICAgdGhpcy5zdG9wV2F0Y2hpbmdUYWJsZVNvcnQoKTtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgLypcbiAgICogcmVsb2FkQ291bnRSZXBvcnRcbiAgICpcbiAgICovXG4gIHJlbG9hZENvdW50UmVwb3J0KCkge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLmZpbHRlcnMgJiYgdGhpcy5maWx0ZXIubG9hZENvdW50UmVwb3J0KSB7XG5cbiAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5lbmRwb2ludFt0aGlzLmVuZHBvaW50Lmxlbmd0aCAtIDFdID09PSAnLycgPyBgJHt0aGlzLmVuZHBvaW50fWNvdW50YCA6IGAke3RoaXMuZW5kcG9pbnR9L2NvdW50YDtcblxuICAgICAgY29uc3QgZmlsdGVycyA9IHRoaXMuZmlsdGVyLmZpbHRlcnM7XG5cbiAgICAgIGNvbnN0IHBheWxvYWRXaXRoU2VhcmNoYWJsZVByb3BlcnRpZXMgPSB0aGlzLmdldENvdW50YWJsZUZpbHRlcnMoZmlsdGVycyk7XG5cbiAgICAgIHRoaXMuc2VydmljZS5wb3N0KGVuZHBvaW50LCBwYXlsb2FkV2l0aFNlYXJjaGFibGVQcm9wZXJ0aWVzKVxuICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICB0aGlzLmNvdW50UmVwb3J0ID0gdGhpcy5tb3VudENvdW50UmVwb3J0KHJlcyk7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlci5jb3VudFJlcG9ydCA9IHRoaXMuY291bnRSZXBvcnQ7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHJlbW92ZUl0ZW1cbiAgICpcbiAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGxpc3RcbiAgICovXG4gIHJlbW92ZUl0ZW0oaWQpIHtcblxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnJvd3MuZmluZChfaXRlbSA9PiBfaXRlbS5pZCA9PT0gaWQpO1xuXG4gICAgaWYgKGl0ZW0pIHtcblxuICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5yb3dzLmluZGV4T2YoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtSW5kZXggPj0gMCkge1xuXG4gICAgICAgIHRoaXMucm93cy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5kcG9pbnQpIHtcblxuICAgICAgdGhpcy5yZWxvYWRDb3VudFJlcG9ydCgpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiByZXN0YXJ0XG4gICAqXG4gICAqIENsZWFyIHRoZSBsaXN0IGFuZCByZWxvYWQgdGhlIGZpcnN0IHBhZ2VcbiAgICovXG4gIHJlc3RhcnQoKSB7XG5cbiAgICB0aGlzLmxvYWRSZXBvcnQodHJ1ZSk7XG4gICAgdGhpcy5yZXNldFNlbGVjdGVkKCk7XG4gIH1cblxuICAvKlxuICAgKiBzaG93TW9yZVxuICAgKlxuICAgKi9cbiAgc2hvd01vcmUoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkUmVwb3J0KCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNlYXJjaENvbGxhcHNhYmxlXG4gICAqXG4gICAqIHNlYXJjaCBieSBjb2xsYXBzYWJsZSBmaWx0ZXJcbiAgICovXG4gIHNlYXJjaENvbGxhcHNhYmxlKGZpbHRlcjogRGVjTGlzdEZpbHRlcikge1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSAhPT0gZmlsdGVyLnVpZCkge1xuXG4gICAgICB0aGlzLmxvYWRCeU9wZW5uZWRDb2xsYXBzZShmaWx0ZXIudWlkKTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgICogdGFibGVBbmRHcmlkQXJlU2V0XG4gICAqXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZXJlIGFyZSBib3RoIEdSSUQgYW5kIFRBQkxFIGRlZmluaXRpb24gaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICB0YWJsZUFuZEdyaWRBcmVTZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpZCAmJiB0aGlzLnRhYmxlO1xuICB9XG5cbiAgLypcbiAgICogdG9nZ2xlTGlzdE1vZGVcbiAgICpcbiAgICogQ2hhbmdlcyBiZXR3ZWVuIEdSSUQgYW5kIFRBQkxFIHZpc3VhbGl6YXRvaW4gbW9kZXNcbiAgICovXG4gIHRvZ2dsZUxpc3RNb2RlKCkge1xuXG4gICAgdGhpcy5saXN0TW9kZSA9IHRoaXMubGlzdE1vZGUgPT09ICdncmlkJyA/ICd0YWJsZScgOiAnZ3JpZCc7XG5cbiAgICBpZiAodGhpcy5saXN0TW9kZSA9PT0gJ3RhYmxlJykge1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICB0aGlzLnRhYmxlLnRhYmxlQ29tcG9uZW50LnJlY2FsY3VsYXRlKCk7XG5cbiAgICAgIH0sIDEpO1xuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBnZXRDb2xsYXBzYWJsZUNvdW50XG4gICAqXG4gICAqIGdldCBDb2xsYXBzYWJsZSBDb3VudCBmcm9tIGNvdW50UmVwb3J0XG4gICAqL1xuICBnZXRDb2xsYXBzYWJsZUNvdW50KHVpZCkge1xuXG4gICAgdHJ5IHtcblxuICAgICAgcmV0dXJuIHRoaXMuY291bnRSZXBvcnRbdGhpcy5zZWxlY3RlZFRhYl0uY2hpbGRyZW5bdWlkXS5jb3VudDtcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICAgIHJldHVybiAnPyc7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgLypcbiAgIGdldExpc3RNb2RlXG4gICAqXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGdldExpc3RNb2RlID0gKCkgPT4ge1xuXG4gICAgbGV0IGxpc3RNb2RlID0gdGhpcy5saXN0TW9kZTtcblxuICAgIGlmICh0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50KSB7XG5cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiICYmIHRoaXMuc2VsZWN0ZWRUYWIubGlzdE1vZGUpIHtcblxuICAgICAgICBsaXN0TW9kZSA9IHRoaXMuc2VsZWN0ZWRUYWIubGlzdE1vZGU7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgbGlzdE1vZGUgPSB0aGlzLnRhYmxlID8gJ3RhYmxlJyA6ICdncmlkJztcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3RNb2RlO1xuXG4gIH1cblxuICAvKlxuICAgbW91bnRDb3VudFJlcG9ydFxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBtb3VudENvdW50UmVwb3J0KGZpbHRlcnNDb3VudGVycyk6IENvdW50UmVwb3J0IHtcblxuICAgIGNvbnN0IGNvdW50UmVwb3J0OiBDb3VudFJlcG9ydCA9IHtcbiAgICAgIGNvdW50OiAwXG4gICAgfTtcblxuICAgIGZpbHRlcnNDb3VudGVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuXG4gICAgICBjb3VudFJlcG9ydFtpdGVtLnVpZF0gPSB7XG5cbiAgICAgICAgY291bnQ6IGl0ZW0uY291bnRcblxuICAgICAgfTtcblxuICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcblxuICAgICAgICBjb3VudFJlcG9ydFtpdGVtLnVpZF0uY2hpbGRyZW4gPSB0aGlzLm1vdW50Q291bnRSZXBvcnQoaXRlbS5jaGlsZHJlbik7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdW50UmVwb3J0O1xuXG4gIH1cblxuICAvKlxuICAgKiBnZXRDb3VudGFibGVGaWx0ZXJzXG4gICAqXG4gICAqIEdldCB0aGUgc2VhcmNoIGZpbHRlciwgdHJuc2Zvcm1lIHRoZSBzZWFyY2ggcGFyYW1zIGludG8gdGhlIHNlYXJjaGFibGUgcHJvcGVydGllcyBhbmQgaW5qZWN0IGl0IGluIGV2ZXJ5IGZpbHRlciBjb25maWd1cmVkIGluIGRlYy1maWx0ZXJzXG4gICAqXG4gICAqIFRoZSByZXN1bHQgaXMgdXNlZCB0byBjYWxsIHRoZSBjb3VudCBlbmRwb2ludCBhbmQgcmV0dXJuIHRoZSBhbW91bnQgb2YgcmVjY29yZHMgZm91bmQgaW4gZXZlcnkgdGFiL2NvbGxhcHNlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGdldENvdW50YWJsZUZpbHRlcnMoZmlsdGVycykge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMgPSB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHNXaXRob3V0VGFicyB8fCBbeyBmaWx0ZXJzOiBbXSB9XTtcblxuICAgIGNvbnN0IGZpbHRlcnNQbHVzU2VhcmNoID0gZmlsdGVycy5tYXAoZGVjRmlsdGVyID0+IHtcblxuICAgICAgY29uc3QgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2ggPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRlY0ZpbHRlcikpO1xuXG4gICAgICBpZiAoZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycykge1xuXG4gICAgICAgIGNvbnN0IHRhYkZpbHRlcnNDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzKSk7XG5cbiAgICAgICAgZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsdGVyR3JvdXBzV2l0aG91dFRhYnMpKTtcblxuICAgICAgICBkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5maWx0ZXJzLmZvckVhY2goZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycy5wdXNoKC4uLnRhYkZpbHRlcnNDb3B5KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIGlmIChkZWNGaWx0ZXJGaWx0ZXJzUGx1c1NlYXJjaC5jaGlsZHJlbikge1xuXG4gICAgICAgIGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuID0gdGhpcy5nZXRDb3VudGFibGVGaWx0ZXJzKGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuKTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB1aWQ6IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLnVpZCxcbiAgICAgICAgZmlsdGVyczogZGVjRmlsdGVyRmlsdGVyc1BsdXNTZWFyY2guZmlsdGVycyxcbiAgICAgICAgY2hpbGRyZW46IGRlY0ZpbHRlckZpbHRlcnNQbHVzU2VhcmNoLmNoaWxkcmVuLFxuICAgICAgfTtcblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZW5zdXJlRmlsdGVyVmFsdWVzQXNBcnJheShmaWx0ZXJzUGx1c1NlYXJjaCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGVuc3VyZUZpbHRlclZhbHVlc0FzQXJyYXlcbiAgICpcbiAgICogR2V0IGFuIGFycmF5IG9mIGZpbHRlcmdyb3VwcyBhbmQgc2V0IHRoZSBmaWx0ZXIgdmFsdWVzIHRvIGFycmF5IGlmIG5vdFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVGaWx0ZXJWYWx1ZXNBc0FycmF5KGZpbHRlckdyb3VwczogYW55ID0gW10pIHtcblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMubWFwKGRlY0xpc3RGaWx0ZXIgPT4ge1xuXG4gICAgICBpZiAoZGVjTGlzdEZpbHRlci5maWx0ZXJzKSB7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRGaWx0ZXJHcm91cHNCYXNlZE9uU2VhcmNoYWJsZVByb3BlcnRpZXMoZGVjTGlzdEZpbHRlci5maWx0ZXJzKTtcblxuICAgICAgICBkZWNMaXN0RmlsdGVyLmZpbHRlcnMgPSBkZWNMaXN0RmlsdGVyLmZpbHRlcnMubWFwKGZpbHRlckdyb3VwID0+IHtcblxuXG4gICAgICAgICAgZmlsdGVyR3JvdXAuZmlsdGVycyA9IGZpbHRlckdyb3VwLmZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG5cbiAgICAgICAgICAgIGZpbHRlci52YWx1ZSA9IEFycmF5LmlzQXJyYXkoZmlsdGVyLnZhbHVlKSA/IGZpbHRlci52YWx1ZSA6IFtmaWx0ZXIudmFsdWVdO1xuXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gZmlsdGVyR3JvdXA7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlY0xpc3RGaWx0ZXI7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogYWN0QnlTY3JvbGxQb3NpdGlvblxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlY3QgaWYgdGhlcmUgaXMgc2Nyb29saW5nIGFjdGlvbiBvbiB3aW5kb3cgdG8gZmV0Y2ggYW5kIHNob3cgbW9yZSByb3dzIHdoZW4gdGhlIHNjcm9sbGluZyBkb3duLlxuICAgKi9cbiAgcHJpdmF0ZSBhY3RCeVNjcm9sbFBvc2l0aW9uID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCRldmVudFsncGF0aCddKSB7XG5cbiAgICAgIGNvbnN0IGVsZW1lbnRXaXRoQ2RrT3ZlcmxheUNsYXNzID0gJGV2ZW50WydwYXRoJ10uZmluZChwYXRoID0+IHtcblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBwYXRoWydjbGFzc05hbWUnXSB8fCAnJztcblxuICAgICAgICBjb25zdCBpbnNpZGVPdmVybGF5ID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Nkay1vdmVybGF5JykgPj0gMDtcblxuICAgICAgICBjb25zdCBpbnNpZGVGdWxsc2NyZWFuRGlhbG9nQ29udGFpbmVyID0gY2xhc3NOYW1lLmluZGV4T2YoJ2Z1bGxzY3JlYW4tZGlhbG9nLWNvbnRhaW5lcicpID49IDA7XG5cbiAgICAgICAgcmV0dXJuIGluc2lkZU92ZXJsYXkgfHwgaW5zaWRlRnVsbHNjcmVhbkRpYWxvZ0NvbnRhaW5lcjtcblxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudFdpdGhDZGtPdmVybGF5Q2xhc3MpIHsgLy8gYXZvaWQgY2xvc2luZyBmaWx0ZXIgZnJvbSBhbnkgb3BlbiBkaWFsb2dcblxuICAgICAgICBpZiAoIXRoaXMuaXNMYXN0UGFnZSkge1xuXG4gICAgICAgICAgY29uc3QgdGFyZ2V0OiBhbnkgPSAkZXZlbnRbJ3RhcmdldCddO1xuXG4gICAgICAgICAgY29uc3QgbGltaXQgPSB0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGFyZ2V0LmNsaWVudEhlaWdodDtcblxuICAgICAgICAgIGlmICh0YXJnZXQuc2Nyb2xsVG9wID49IChsaW1pdCAtIDE2KSkge1xuXG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlKCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICAvKlxuICAgKiBkZXRlY3RMaXN0TW9kZVxuICAgKlxuICAgZ2V0TGlzdE1vZGUgaW5wdXRcbiAgICovXG4gIHByaXZhdGUgZGV0ZWN0TGlzdE1vZGUoKSB7XG5cbiAgICB0aGlzLmdldExpc3RNb2RlKCk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIGRldGVjdExpc3RNb2RlQmFzZWRPbkdyaWRBbmRUYWJsZVByZXNlbmNlKClcbiAgICpcbiAgICogU2V0IHRoZSBsaXN0IG1vZGUgYmFzZWQgb24gZGVjbGFyYXRpb24gb2YgdGFibGUgYW5kIGdyaWQuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGJvb3Rhc3RyYXAgdGhlIGNvbXBvbmVudCB3aXRoIG9ubHkgZ3JpZCBvciBvbmx5IHRhYmxlXG4gICAqIFRoaXMgb25seSB3b3JrIGlmIG5vIG1vZGUgaXMgcHJvdmlkZWQgYnkgQElucHV0IG90aGVyd2lzZSB0aGUgQElucHV0IHZhbHVlIHdpbGwgYmUgdXNlZFxuICAgKi9cbiAgcHJpdmF0ZSBkZXRlY3RMaXN0TW9kZUJhc2VkT25HcmlkQW5kVGFibGVQcmVzZW5jZSgpIHtcblxuICAgIHRoaXMubGlzdE1vZGUgPSB0aGlzLmxpc3RNb2RlID8gdGhpcy5saXN0TW9kZSA6IHRoaXMudGFibGUgPyAndGFibGUnIDogJ2dyaWQnO1xuXG4gIH1cblxuICAvKlxuICAgKiBlbWl0U2Nyb2xsRXZlbnRcbiAgICpcbiAgICogRW1pdHMgc2Nyb2xsIGV2ZW50IHdoZW4gbm90IGxvYWRpbmdcbiAgICovXG4gIHByaXZhdGUgZW1pdFNjcm9sbEV2ZW50ID0gKCRldmVudCkgPT4ge1xuXG4gICAgaWYgKCF0aGlzLmxvYWRpbmcpIHtcblxuICAgICAgdGhpcy5zY3JvbGxFdmVudEVtaXRlci5lbWl0KCRldmVudCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIGlzVGFic0ZpbHRlckRlZmluZWRcbiAgICpcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIFRhYnMgRmlsdGVyIGlzIGRlZmluZWQgaW5zaWRlIHRoZSBsaXN0XG4gICAqL1xuICBwcml2YXRlIGlzVGFic0ZpbHRlckRlZmluZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQ7XG4gIH1cblxuICAvKlxuICAgKiBkb0ZpcnN0TG9hZFxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIHZpZXcgYW5kIGlucHV0cyBhcmUgaW5pdGlhbGl6ZWRcbiAgICpcbiAgICogVGhpcyBpcyB0aGUgZmlyc3QgY2FsbCB0byBnZXQgZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBkb0ZpcnN0TG9hZCgpIHtcbiAgICBpZiAodGhpcy5pc1RhYnNGaWx0ZXJEZWZpbmVkKCkpIHtcbiAgICAgIHRoaXMuZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpcnN0TG9hZExvY2FsbHkodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXJcbiAgICpcbiAgICogdXNlIHRoZSB0YWJzIGZpbHRlciB0byB0cmlnZ2VyIHRoZSBmaXJzdCBsb2FkXG4gICAqXG4gICAqIFRoaXMgd2F5IHRoZSBkZWZhdWx0IHRhYiBhbmQgZmlsdGVyIGFyZSBzZWxlY3RlZCBieSB0aGUgZGVjdGFic0ZpbHRlciBjb21wb25lbnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRCeVRhYnNGaWx0ZXIoKSB7XG4gICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5kb0ZpcnN0TG9hZCgpO1xuICB9XG5cbiAgLypcbiAgICogZG9GaXJzdExvYWRMb2NhbGx5XG4gICAqXG4gICAqIElmIG5vIGZpbHRlciBhcmUgZGVmaW5lZCwganVzdCBjYWxsIHRoIGVlbmRwb2ludCB3aXRob3V0IGZpbHRlcnNcbiAgICovXG4gIHByaXZhdGUgZG9GaXJzdExvYWRMb2NhbGx5KHJlZnJlc2gpIHtcbiAgICB0aGlzLmxvYWRSZXBvcnQocmVmcmVzaCk7XG4gIH1cblxuICAvKlxuICAgKiBlbnN1cmVVbmlxdWVOYW1lXG4gICAqXG4gICAqIFdlIG11c3QgcHJvdmlkZSBhbiB1bmlxdWUgbmFtZSB0byB0aGUgbGlzdCBzbyB3ZSBjYW4gcGVyc2lzdCBpdHMgc3RhdGUgaW4gdGhlIFVSTCB3aXRob3V0IGNvbmZsaWN0c1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVOYW1lKCkge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICBjb25zdCBlcnJvciA9ICdMaXN0Q29tcG9uZW50RXJyb3I6IFRoZSBsaXN0IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUgdG8gYmUgdXNlZCBpbiB1cmwgZmlsdGVyLidcbiAgICAgICAgKyAnIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50Lic7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGxvYWRCeU9wZW5uZWRDb2xsYXBzZVxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyB0cmlnZ2VyZWQgd2hlbiBhIGNvbGxhcHNhYmxlIHRhYmxlIGlzIG9wZW4uXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGxvYWRCeU9wZW5uZWRDb2xsYXBzZShmaWx0ZXJVaWQpIHtcblxuICAgIGNvbnNvbGUubG9nKCdsb2FkQnlPcGVubmVkQ29sbGFwc2UnLCBmaWx0ZXJVaWQpO1xuXG4gICAgY29uc3QgZmlsdGVyID0gdGhpcy5jb2xsYXBzYWJsZUZpbHRlcnMuY2hpbGRyZW4uZmluZChpdGVtID0+IGl0ZW0udWlkID09PSBmaWx0ZXJVaWQpO1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXA6IEZpbHRlckdyb3VwID0geyBmaWx0ZXJzOiBmaWx0ZXIuZmlsdGVycyB9O1xuXG4gICAgdGhpcy5sb2FkUmVwb3J0KHRydWUsIGZpbHRlckdyb3VwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICB0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgPSBmaWx0ZXIudWlkO1xuXG4gICAgfSwgMCk7XG5cblxuICB9XG5cbiAgLypcbiAgICogbG9hZFJlcG9ydFxuICAgKlxuICAgKiBUaGlzIG1laHRvZCBnYXRoZXIgdGhlIGZpbHRlciBpbmZvIGFuZCBlbmRwb2ludCBhbmQgY2FsbCB0aGUgYmFjay1lbmQgdG8gZmV0Y2ggdGhlIGRhdGFcbiAgICpcbiAgICogSWYgdGhlIHN1Y3RvbUZldGNoTWV0aG9kIGlzIHVzZWQsIGl0cyBjYWxsIGl0XG4gICAqXG4gICAqIElmIG9ubHkgdGhlIHJvd3MgYXJlIHBhc3NlZCwgdGhlIG1ldGhvZCBqdXN0IHVzZSBpdCBhcyByZXN1bHRcbiAgICovXG4gIHByaXZhdGUgbG9hZFJlcG9ydChjbGVhckFuZFJlbG9hZFJlcG9ydD86IGJvb2xlYW4sIGNvbGxhcHNlRmlsdGVyR3JvdXBzPzogRmlsdGVyR3JvdXApOiBQcm9taXNlPGFueT4ge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICBpZiAoY2xlYXJBbmRSZWxvYWRSZXBvcnQgJiYgdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgdGhpcy5yZXNldFNlbGVjdGVkKCk7XG4gICAgICAgIHRoaXMuc2V0Um93cyh0aGlzLnJvd3MpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xlYXJBbmRSZWxvYWRSZXBvcnQgPSBjbGVhckFuZFJlbG9hZFJlcG9ydDtcblxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMuZW5kcG9pbnQpIHtcblxuICAgICAgICB0aGlzLm1vdW50UGF5bG9hZChjbGVhckFuZFJlbG9hZFJlcG9ydCwgY29sbGFwc2VGaWx0ZXJHcm91cHMpXG4gICAgICAgICAgLnRoZW4ocGF5bG9hZCA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQ7XG5cbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YS5uZXh0KHsgZW5kcG9pbnQ6IHRoaXMuZW5kcG9pbnQsIHBheWxvYWQ6IHRoaXMucGF5bG9hZCwgY2JrOiByZXMsIGNsZWFyOiBjbGVhckFuZFJlbG9hZFJlcG9ydCB9KTtcblxuICAgICAgICAgIH0pO1xuXG5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXN0b21GZXRjaE1ldGhvZCkge1xuXG4gICAgICAgIHRoaXMubW91bnRQYXlsb2FkKGNsZWFyQW5kUmVsb2FkUmVwb3J0LCBjb2xsYXBzZUZpbHRlckdyb3VwcylcbiAgICAgICAgICAudGhlbihwYXlsb2FkID0+IHtcblxuICAgICAgICAgICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZDtcblxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm5leHQoKTtcblxuICAgICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnJvd3MpIHtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgIGlmICghdGhpcy5yb3dzKSB7XG5cbiAgICAgICAgICAgIHJlaignTm8gZW5kcG9pbnQsIGN1c3RvbUZldGNoTWV0aG9kIG9yIHJvd3Mgc2V0Jyk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICB9LCAxKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgbW91bnRQYXlsb2FkKGNsZWFyQW5kUmVsb2FkUmVwb3J0OiBib29sZWFuID0gZmFsc2UsIGNvbGxhcHNlRmlsdGVyR3JvdXBzPykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgY29uc3Qgc2VhcmNoRmlsdGVyR3JvdXBzID0gdGhpcy5maWx0ZXIgPyB0aGlzLmZpbHRlci5maWx0ZXJHcm91cHMgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGNvbnN0IGZpbHRlckdyb3VwcyA9IHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzVG9FYWNoRmlsdGVyR3JvdXAoc2VhcmNoRmlsdGVyR3JvdXBzLCBjb2xsYXBzZUZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIGNvbnN0IHBheWxvYWQ6IERlY0ZpbHRlciA9IHt9O1xuXG4gICAgICBwYXlsb2FkLmxpbWl0ID0gdGhpcy5saW1pdDtcblxuICAgICAgaWYgKGZpbHRlckdyb3Vwcykge1xuXG4gICAgICAgIHBheWxvYWQuZmlsdGVyR3JvdXBzID0gZmlsdGVyR3JvdXBzO1xuXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNvbHVtbnNTb3J0Q29uZmlnKSB7XG5cbiAgICAgICAgcGF5bG9hZC5zb3J0ID0gdGhpcy5jb2x1bW5zU29ydENvbmZpZztcblxuICAgICAgfVxuXG4gICAgICBpZiAoIWNsZWFyQW5kUmVsb2FkUmVwb3J0ICYmIHRoaXMucmVwb3J0KSB7XG5cbiAgICAgICAgcGF5bG9hZC5wYWdlID0gdGhpcy5yZXBvcnQucGFnZSArIDE7XG5cbiAgICAgICAgcGF5bG9hZC5saW1pdCA9IHRoaXMucmVwb3J0LmxpbWl0O1xuXG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUocGF5bG9hZCk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgLypcbiAgICogYXBwZW5kRmlsdGVyR3JvdXBzVG9FYWNoRmlsdGVyR3JvdXBcbiAgICpcbiAgICogR2V0cyBhbiBhcnJheSBvZiBmaWx0ZXJHcm91cCBhbmQgaW4gZWFjaCBmaWx0ZXJHcm91cCBpbiB0aGlzIGFycmF5IGFwcGVuZHMgdGhlIHNlY29uZCBmaWx0ZXJHcm91cCBmaWx0ZXJzLlxuICAgKi9cbiAgcHJpdmF0ZSBhcHBlbmRGaWx0ZXJHcm91cHNUb0VhY2hGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHM6IEZpbHRlckdyb3VwcywgZmlsdGVyR3JvdXBUb0FwcGVuZDogRmlsdGVyR3JvdXApIHtcblxuICAgIGlmIChmaWx0ZXJHcm91cFRvQXBwZW5kKSB7XG5cbiAgICAgIGlmIChmaWx0ZXJHcm91cHMgJiYgZmlsdGVyR3JvdXBzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMuZm9yRWFjaChncm91cCA9PiB7XG5cbiAgICAgICAgICBncm91cC5maWx0ZXJzLnB1c2goLi4uZmlsdGVyR3JvdXBUb0FwcGVuZC5maWx0ZXJzKTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmaWx0ZXJHcm91cHMgPSBbZmlsdGVyR3JvdXBUb0FwcGVuZF07XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBmaWx0ZXJHcm91cHMgfHwgW107XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldEZpbHRlcnNDb21wb25lbnRzQmFzZVBhdGhBbmROYW1lc1xuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzZXRGaWx0ZXJzQ29tcG9uZW50c0Jhc2VQYXRoQW5kTmFtZXMoKSB7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcblxuICAgICAgdGhpcy5maWx0ZXIubmFtZSA9IHRoaXMubmFtZTtcblxuXG4gICAgICBpZiAodGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQubmFtZSA9IHRoaXMubmFtZTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21GZXRjaE1ldGhvZCkge1xuXG4gICAgICAgICAgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudC5jdXN0b21GZXRjaE1ldGhvZCA9IHRoaXMuY3VzdG9tRmV0Y2hNZXRob2Q7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VydmljZSA9IHRoaXMuc2VydmljZTtcblxuICAgICAgICB9XG5cblxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHNldFJvd3NcbiAgICpcbiAgICogU2V0cyB0aGUgY3VycmVudCB0YWJsZSByb3dzXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHNldFJvd3Mocm93cyA9IFtdKSB7XG5cbiAgICB0aGlzLnJlcG9ydCA9IHtcblxuICAgICAgcGFnZTogMSxcblxuICAgICAgcmVzdWx0OiB7XG5cbiAgICAgICAgcm93czogcm93cyxcblxuICAgICAgICBjb3VudDogcm93cy5sZW5ndGhcblxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmRldGVjdExhc3RQYWdlKHJvd3MsIHJvd3MubGVuZ3RoKTtcblxuICAgIHRoaXMudXBkYXRlQ29udGVudENoaWxkcmVuKCk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFNjcm9sbEV2ZW50RW1pdHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaFNjcm9sbEV2ZW50RW1pdHRlcigpIHtcblxuICAgIHRoaXMuc2Nyb2xsRXZlbnRFbWl0ZXJTdWJzY3JpcHRpb24gPSB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyXG4gICAgICAucGlwZShcbiAgICAgICAgZGVib3VuY2VUaW1lKDE1MCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgICkuc3Vic2NyaWJlKHRoaXMuYWN0QnlTY3JvbGxQb3NpdGlvbik7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbEV2ZW50RW1pdHRlclxuICAgKlxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGxFdmVudEVtaXR0ZXIoKSB7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxFdmVudEVtaXRlclN1YnNjcmlwdGlvbikge1xuXG4gICAgICB0aGlzLnNjcm9sbEV2ZW50RW1pdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyRGF0YVxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB3YXRjaEZpbHRlckRhdGEoKSB7XG4gICAgdGhpcy5yZWFjdGl2ZVJlcG9ydCA9IHRoaXMuZmlsdGVyRGF0YVxuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSgxNTApLCAvLyBhdm9pZCBtdWlsdGlwbGUgcmVxdWVzdCB3aGVuIHRoZSBmaWx0ZXIgb3IgdGFiIGNoYW5nZSB0b28gZmFzdFxuICAgICAgICBzd2l0Y2hNYXAoKGZpbHRlckRhdGE6IEZpbHRlckRhdGEpID0+IHtcblxuICAgICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4odW5kZWZpbmVkKTtcblxuICAgICAgICAgIGNvbnN0IGZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2QgPSB0aGlzLmN1c3RvbUZldGNoTWV0aG9kIHx8IHRoaXMuc2VydmljZS5nZXQ7XG5cbiAgICAgICAgICBjb25zdCBlbmRwb2ludCA9IGZpbHRlckRhdGEgPyBmaWx0ZXJEYXRhLmVuZHBvaW50IDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgY29uc3QgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcyA9IHRoaXMuZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcyh0aGlzLnBheWxvYWQpO1xuXG4gICAgICAgICAgaWYgKGZpbHRlckRhdGEgJiYgZmlsdGVyRGF0YS5jbGVhcikge1xuICAgICAgICAgICAgdGhpcy5zZXRSb3dzKFtdKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmZXRjaE1ldGhvZChlbmRwb2ludCwgcGF5bG9hZFdpdGhTZWFyY2hhYmxlUHJvcGVydGllcylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICAgICAgICBvYnNlcnZhYmxlLm5leHQocmVzKTtcblxuICAgICAgICAgICAgICBpZiAoZmlsdGVyRGF0YSAmJiBmaWx0ZXJEYXRhLmNiaykge1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIHdhaXQgZm9yIHN1YnNjcmliZXJzIHRvIHJlZnJlc2ggdGhlaXIgcm93c1xuXG4gICAgICAgICAgICAgICAgICBmaWx0ZXJEYXRhLmNiayhuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuXG4gICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICAgICAgfSlcblxuICAgICAgKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGF5bG9hZFdpdGhTZWFyY2hUcmFuc2Zvcm1lZEludG9TZWFyY2hhYmxlUHJvcGVydGllcyhwYXlsb2FkKSB7XG5cbiAgICBjb25zdCBwYXlsb2FkQ29weSA9IHsgLi4ucGF5bG9hZCB9O1xuXG4gICAgaWYgKHBheWxvYWRDb3B5LmZpbHRlckdyb3VwcyAmJiB0aGlzLnNlYXJjaGFibGVQcm9wZXJ0aWVzKSB7XG5cbiAgICAgIHBheWxvYWRDb3B5LmZpbHRlckdyb3VwcyA9IFsuLi5wYXlsb2FkLmZpbHRlckdyb3Vwc107XG5cbiAgICAgIHRoaXMuYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKHBheWxvYWRDb3B5LmZpbHRlckdyb3Vwcyk7XG5cbiAgICAgIHJldHVybiBwYXlsb2FkQ29weTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLnBheWxvYWQ7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kRmlsdGVyR3JvdXBzQmFzZWRPblNlYXJjaGFibGVQcm9wZXJ0aWVzKGZpbHRlckdyb3Vwcykge1xuXG4gICAgY29uc3QgZmlsdGVyR3JvdXBzVGhhdENvbnRhaW5zQmFzaWNTZWFyY2ggPSB0aGlzLmdldEZpbHRlckdyb3Vwc1RoYXRDb250YWluc1RoZUJhc2ljU2VhcmNoKGZpbHRlckdyb3Vwcyk7XG5cbiAgICBpZiAoZmlsdGVyR3JvdXBzVGhhdENvbnRhaW5zQmFzaWNTZWFyY2ggJiYgZmlsdGVyR3JvdXBzVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gubGVuZ3RoID4gMCkge1xuXG4gICAgICBmaWx0ZXJHcm91cHNUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5mb3JFYWNoKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2ggPT4ge1xuXG4gICAgICAgIHRoaXMucmVtb3ZlRmlsdGVyR3JvdXAoZmlsdGVyR3JvdXBzLCBmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoKTtcblxuICAgICAgICBjb25zdCBiYXNpY1NlYXJjaCA9IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2guZmlsdGVycy5maW5kKGZpbHRlciA9PiBmaWx0ZXIucHJvcGVydHkgPT09ICdzZWFyY2gnKTtcblxuICAgICAgICBjb25zdCBiYXNpY1NlYXJjaEluZGV4ID0gZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzLmluZGV4T2YoYmFzaWNTZWFyY2gpO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoYWJsZVByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG5cbiAgICAgICAgICBjb25zdCBuZXdGaWx0ZXJHcm91cDogRmlsdGVyR3JvdXAgPSB7XG4gICAgICAgICAgICBmaWx0ZXJzOiBbLi4uZmlsdGVyR3JvdXBUaGF0Q29udGFpbnNCYXNpY1NlYXJjaC5maWx0ZXJzXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBuZXdGaWx0ZXJHcm91cC5maWx0ZXJzW2Jhc2ljU2VhcmNoSW5kZXhdID0ge1xuICAgICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgICAgdmFsdWU6IFtiYXNpY1NlYXJjaC52YWx1ZV1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZmlsdGVyR3JvdXBzLnB1c2gobmV3RmlsdGVyR3JvdXApO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVGaWx0ZXJHcm91cChmaWx0ZXJHcm91cHMsIGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpIHtcblxuICAgIGNvbnN0IGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2hJbmRleCA9IGZpbHRlckdyb3Vwcy5pbmRleE9mKGZpbHRlckdyb3VwVGhhdENvbnRhaW5zQmFzaWNTZWFyY2gpO1xuXG4gICAgZmlsdGVyR3JvdXBzLnNwbGljZShmaWx0ZXJHcm91cFRoYXRDb250YWluc0Jhc2ljU2VhcmNoSW5kZXgsIDEpO1xuXG4gIH1cblxuICBwcml2YXRlIGdldEZpbHRlckdyb3Vwc1RoYXRDb250YWluc1RoZUJhc2ljU2VhcmNoKGZpbHRlckdyb3Vwcykge1xuXG4gICAgcmV0dXJuIGZpbHRlckdyb3Vwcy5maWx0ZXIoZmlsdGVyR3JvdXAgPT4ge1xuXG4gICAgICBjb25zdCBiYXNpY1NlcmNoRmlsdGVyID0gZmlsdGVyR3JvdXAuZmlsdGVycyA/IGZpbHRlckdyb3VwLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnByb3BlcnR5ID09PSAnc2VhcmNoJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybiBiYXNpY1NlcmNoRmlsdGVyID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qXG4gICAqIHN1YnNjcmliZVRvUmVhY3RpdmVSZXBvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpIHtcbiAgICB0aGlzLnJlYWN0aXZlUmVwb3J0U3Vic2NyaXB0aW9uID0gdGhpcy5yZWFjdGl2ZVJlcG9ydFxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEucmVzdWx0ICYmIGRhdGEucmVzdWx0LnJvd3MpIHtcblxuICAgICAgICAgIGlmICghdGhpcy5jbGVhckFuZFJlbG9hZFJlcG9ydCkge1xuICAgICAgICAgICAgZGF0YS5yZXN1bHQucm93cyA9IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzLmNvbmNhdChkYXRhLnJlc3VsdC5yb3dzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnJlcG9ydCA9IGRhdGE7XG5cbiAgICAgICAgICB0aGlzLnBvc3RTZWFyY2guZW1pdChkYXRhKTtcblxuICAgICAgICAgIHRoaXMudXBkYXRlQ29udGVudENoaWxkcmVuKCk7XG5cbiAgICAgICAgICB0aGlzLmRldGVjdExhc3RQYWdlKGRhdGEucmVzdWx0LnJvd3MsIGRhdGEucmVzdWx0LmNvdW50KTtcblxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0TGFzdFBhZ2Uocm93cywgY291bnQpIHtcblxuICAgIGNvbnN0IG51bWJlck9mcm93cyA9IHJvd3MubGVuZ3RoO1xuXG4gICAgY29uc3QgZW1wdExpc3QgPSBudW1iZXJPZnJvd3MgPT09IDA7XG5cbiAgICBjb25zdCBzaW5nbGVQYWdlTGlzdCA9IG51bWJlck9mcm93cyA9PT0gY291bnQ7XG5cbiAgICB0aGlzLmlzTGFzdFBhZ2UgPSBlbXB0TGlzdCB8fCBzaW5nbGVQYWdlTGlzdDtcblxuICB9XG5cbiAgLypcbiAgICogdW5zdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHVuc3Vic2NyaWJlVG9SZWFjdGl2ZVJlcG9ydCgpIHtcbiAgICBpZiAodGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZWFjdGl2ZVJlcG9ydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHVwZGF0ZUNvbnRlbnRDaGlsZHJlblxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVDb250ZW50Q2hpbGRyZW4oKSB7XG5cbiAgICBjb25zdCByb3dzID0gdGhpcy5lbmRwb2ludCA/IHRoaXMucmVwb3J0LnJlc3VsdC5yb3dzIDogdGhpcy5yb3dzO1xuICAgIGlmICh0aGlzLmdyaWQpIHtcbiAgICAgIHRoaXMuZ3JpZC5yb3dzID0gcm93cztcbiAgICB9XG4gICAgaWYgKHRoaXMudGFibGUpIHtcbiAgICAgIHRoaXMudGFibGUucm93cyA9IHJvd3M7XG4gICAgfVxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIuY291bnQgPSB0aGlzLnJlcG9ydC5yZXN1bHQuY291bnQ7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogcmVnaXN0ZXJDaGlsZFdhdGNoZXJzXG4gICAqXG4gICAqIFdhdGNoIGZvciBjaGlsZHJlbiBvdXRwdXRzXG4gICAqL1xuICBwcml2YXRlIHJlZ2lzdGVyQ2hpbGRXYXRjaGVycygpIHtcblxuICAgIGlmICh0aGlzLmdyaWQpIHtcbiAgICAgIHRoaXMud2F0Y2hHcmlkUm93Q2xpY2soKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgdGhpcy53YXRjaFRhYmxlUm93Q2xpY2soKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoR3JpZFJvd0NsaWNrXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoR3JpZFJvd0NsaWNrKCkge1xuICAgIHRoaXMuZ3JpZC5yb3dDbGljay5zdWJzY3JpYmUoKCRldmVudCkgPT4ge1xuICAgICAgdGhpcy5yb3dDbGljay5lbWl0KCRldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiB3YXRjaFRhYmxlUm93Q2xpY2tcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVJvd0NsaWNrKCkge1xuICAgIHRoaXMudGFibGUucm93Q2xpY2suc3Vic2NyaWJlKCgkZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucm93Q2xpY2suZW1pdCgkZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogd2F0Y2hGaWx0ZXJcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlclN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyLnNlYXJjaC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdFVkVOVCcsIGV2ZW50KTtcblxuICAgICAgICBjb25zdCB0YWJDaGFuZ2VkID0gIXRoaXMucHJldmlvdXNTZWxlY3RlZFRhYiB8fCAodGhpcy5wcmV2aW91c1NlbGVjdGVkVGFiICE9PSB0aGlzLnNlbGVjdGVkVGFiKTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJNb2RlQ2hhbmdlZCA9IHRoaXMuZmlsdGVyTW9kZSAhPT0gZXZlbnQuZmlsdGVyTW9kZTtcblxuICAgICAgICBpZiAoIXRoaXMucHJldmlvdXNTZWxlY3RlZFRhYiB8fCB0YWJDaGFuZ2VkKSB7XG5cbiAgICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRUYWIgPSB0aGlzLnNlbGVjdGVkVGFiO1xuXG4gICAgICAgICAgdGhpcy5zZXRSb3dzKFtdKTsgLy8gaWYgY2hhbmdpbmcgdGFicywgY2xlYXIgdGhlIHJlc3VsdHMgYmVmb3JlIHNob3dpbmcgdGhlIHJvd3MgYmVjYXVzZSBpdCBpcyBkb25lIG9ubHkgYWZ0ZXIgZmV0Y2hpbmcgdGhlIGRhdGFcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbHRlck1vZGVDaGFuZ2VkKSB7XG5cbiAgICAgICAgICB0aGlzLmZpbHRlck1vZGUgPSBldmVudC5maWx0ZXJNb2RlO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJNb2RlID09PSAndGFicycpIHtcblxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpLnRoZW4oKHJlcykgPT4ge1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQucmVjb3VudCkge1xuXG4gICAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIGlmICghdGhpcy5jb3VudFJlcG9ydCB8fCBldmVudC5yZWNvdW50KSB7XG5cbiAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnRSZXBvcnQoKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUgJiYgIXRhYkNoYW5nZWQpIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkQnlPcGVubmVkQ29sbGFwc2UodGhpcy5zZWxlY3RlZENvbGxhcHNhYmxlKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2FibGVGaWx0ZXJzID0ge1xuICAgICAgICAgICAgICB0YWI6IHRoaXMuc2VsZWN0ZWRUYWIsXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBldmVudC5jaGlsZHJlbiA/IGV2ZW50LmNoaWxkcmVuIDogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsYXBzYWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIHdhdGNoRmlsdGVyXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ0ZpbHRlcigpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hTY3JvbGxcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hTY3JvbGwoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbGFibGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lckNsYXNzKVswXTtcbiAgICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9LCAxKTtcbiAgfVxuXG4gIC8qXG4gICAqIHN0b3BXYXRjaGluZ1Njcm9sbFxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuc2Nyb2xsYWJsZUNvbnRhaW5lcikge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZW1pdFNjcm9sbEV2ZW50LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBzdWJzY3JpYmVUb1JlYWN0aXZlUmVwb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHdhdGNoVGFic0NoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXIudGFic0ZpbHRlckNvbXBvbmVudCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRoaXMuZmlsdGVyLnRhYnNGaWx0ZXJDb21wb25lbnQuc2VsZWN0ZWRUYWI7XG4gICAgICB0aGlzLnRhYnNDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlci50YWJzRmlsdGVyQ29tcG9uZW50LnRhYkNoYW5nZS5zdWJzY3JpYmUodGFiID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcbiAgICAgICAgdGhpcy5kZXRlY3RMaXN0TW9kZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3Vic2NyaWJlVG9UYWJzQ2hhbmdlXG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYnNDaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMudGFic0NoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy50YWJzQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogd2F0Y2hUYWJsZVNvcnRcbiAgICpcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hUYWJsZVNvcnQoKSB7XG4gICAgaWYgKHRoaXMudGFibGUpIHtcblxuICAgICAgdGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24gPSB0aGlzLnRhYmxlLnNvcnQuc3Vic2NyaWJlKGNvbHVtbnNTb3J0Q29uZmlnID0+IHtcblxuICAgICAgICBpZiAodGhpcy5jb2x1bW5zU29ydENvbmZpZyAhPT0gY29sdW1uc1NvcnRDb25maWcpIHtcblxuICAgICAgICAgIHRoaXMuY29sdW1uc1NvcnRDb25maWcgPSBjb2x1bW5zU29ydENvbmZpZztcblxuICAgICAgICAgIGlmICh0aGlzLmNvbGxhcHNhYmxlRmlsdGVycykge1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRCeU9wZW5uZWRDb2xsYXBzZSh0aGlzLnNlbGVjdGVkQ29sbGFwc2FibGUpO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KHRydWUpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogc3RvcFdhdGNoaW5nVGFibGVTb3J0XG4gICAqXG4gICAqL1xuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYmxlU29ydCgpIHtcbiAgICBpZiAodGhpcy50YWJsZVNvcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMudGFibGVTb3J0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cblxuICAvKlxuICAqIFJlc2V0IFNlbGVjdGVkIFJvd3MgaW4gVGFibGVcbiAgKiBcbiAgKi9cbiBwcml2YXRlIHJlc2V0U2VsZWN0ZWQoKSB7XG4gIHRoaXMudGFibGUuc2VsZWN0ZWQgPSBbXTtcbiB9XG59XG4iXX0=