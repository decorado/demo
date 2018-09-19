import { AfterViewInit, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { DecListGridComponent } from './list-grid/list-grid.component';
import { DecListTableComponent } from './list-table/list-table.component';
import { DecListFilterComponent } from './list-filter/list-filter.component';
import { DecApiService } from './../../services/api/decora-api.service';
import { DecListFetchMethod, CountReport } from './list.models';
import { FilterGroups } from './../../services/api/decora-api.model';
import { DecListFilter } from './list.models';
export declare class DecListComponent implements OnInit, OnDestroy, AfterViewInit {
    private service;
    countReport: CountReport;
    filterMode: 'tabs' | 'collapse';
    collapsableFilters: {
        tab: string;
        children: DecListFilter[];
    };
    loading: boolean;
    readonly filterGroups: FilterGroups;
    selectedCollapsable: any;
    report: any;
    isLastPage: boolean;
    selectedTab: any;
    previousSelectedTab: any;
    private filterData;
    private _loading;
    private clearAndReloadReport;
    private filterSubscription;
    private reactiveReport;
    private reactiveReportSubscription;
    private scrollableContainer;
    private scrollEventEmiter;
    private scrollEventEmiterSubscription;
    private tabsChangeSubscription;
    private tableSortSubscription;
    private payload;
    private _endpoint;
    private _filter;
    private _name;
    customFetchMethod: DecListFetchMethod;
    columnsSortConfig: any;
    disableShowMoreButton: boolean;
    endpoint: string;
    name: string;
    rows: any;
    limit: number;
    listMode: any;
    scrollableContainerClass: string;
    searchableProperties: string[];
    showFooter: boolean;
    postSearch: EventEmitter<any>;
    rowClick: EventEmitter<any>;
    grid: DecListGridComponent;
    table: DecListTableComponent;
    filter: DecListFilterComponent;
    constructor(service: DecApiService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    reloadCountReport(): void;
    removeItem(id: any): void;
    restart(): void;
    showMore(): Promise<any>;
    searchCollapsable(filter: DecListFilter): void;
    tableAndGridAreSet(): DecListTableComponent;
    toggleListMode(): void;
    getCollapsableCount(uid: any): any;
    private getListMode;
    private mountCountReport(filtersCounters);
    private getCountableFilters(filters);
    private ensureFilterValuesAsArray(filterGroups?);
    private actByScrollPosition;
    private detectListMode();
    private detectListModeBasedOnGridAndTablePresence();
    private emitScrollEvent;
    private isTabsFilterDefined();
    private doFirstLoad();
    private doFirstLoadByTabsFilter();
    private doFirstLoadLocally(refresh);
    private ensureUniqueName();
    private loadByOpennedCollapse(filterUid);
    private loadReport(clearAndReloadReport?, collapseFilterGroups?);
    private mountPayload(clearAndReloadReport?, collapseFilterGroups?);
    private appendFilterGroupsToEachFilterGroup(filterGroups, filterGroupToAppend);
    private setFiltersComponentsBasePathAndNames();
    private setRows(rows?);
    private watchScrollEventEmitter();
    private stopWatchingScrollEventEmitter();
    private watchFilterData();
    private getPayloadWithSearchTransformedIntoSearchableProperties(payload);
    private appendFilterGroupsBasedOnSearchableProperties(filterGroups);
    private removeFilterGroup(filterGroups, filterGroupThatContainsBasicSearch);
    private getFilterGroupsThatContainsTheBasicSearch(filterGroups);
    private subscribeToReactiveReport();
    private detectLastPage(rows, count);
    private unsubscribeToReactiveReport();
    private updateContentChildren();
    private registerChildWatchers();
    private watchGridRowClick();
    private watchTableRowClick();
    private watchFilter();
    private stopWatchingFilter();
    private watchScroll();
    private stopWatchingScroll();
    private watchTabsChange();
    private stopWatchingTabsChange();
    private watchTableSort();
    private stopWatchingTableSort();
}
