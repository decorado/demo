import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DecListGridComponent } from './list-grid/list-grid.component';
import { DecListTableComponent } from './list-table/list-table.component';
import { DecListFilterComponent } from './list-filter/list-filter.component';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { DecApiService } from './../../services/api/decora-api.service';
import { DecListFetchMethod, CountReport, DecSublistMode, DecListType } from './list.models';
import { FilterData, DecFilter, FilterGroups, FilterGroup } from './../../services/api/decora-api.model';
import { DecListFilter } from './list.models';

const DELETE_COMPARE_FUNCTION = (_item, id) => _item.id === id;

@Component({
  selector: 'dec-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class DecListComponent implements OnInit, OnDestroy, AfterViewInit {

  /*
  * countReport
  *
  *
  */
  countReport: CountReport;

  /*
  * subfilter
  *
  *
  */
  subfilter: { tab: string, children: DecListFilter[] };

  /*
  * sublistMode
  *
  *
  */
  sublistMode: DecSublistMode;

  /*
   * loading
   *
   *
   */
  set loading(v) {

    this._loading = v;

    if (this.filter) {

      this.filter.loading = v;

    }

  }

  get loading() {
    return this._loading;
  }

  /*
   * filterGroups
   *
   *
   */
  get filterGroups(): FilterGroups {
    return this.filter ? this.filter.filterGroups : [];
  }

  /*
   * selectedSubfilter
   *
   *
   */
  selectedSubfilter;

  /*
   * report
   *
   *
   */
  report;

  /*
   * isLastPage
   *
   *
   */
  isLastPage: boolean;

  /*
  * selectedTab
  *
  *
  */
  selectedTab: any;

  /*
  * previousSelectedTab
  *
  *
  */
  previousSelectedTab: any;

  /*
   * filterData
   *
   *
   */
  private filterData: Subject<FilterData> = new Subject<FilterData>();

  /*
   * _loading;
   *
   *
   */
  private _loading = true;

  /*
   * clearAndReloadReport
   *
   *
   */
  private clearAndReloadReport;

  /*
   * filterSubscription
   *
   *
   */
  private filterSubscription: Subscription;

  /*
   * reactiveReport
   *
   *
   */
  private reactiveReport: Observable<any>;

  /*
   * reactiveReportSubscription
   *
   *
   */
  private reactiveReportSubscription: Subscription;

  /*
   * scrollableContainer
   *
   *
   */
  private scrollableContainer: Element;

  /*
   * scrollEventEmiter
   *
   *
   */
  private scrollEventEmiter = new EventEmitter<any>();

  /*
   * scrollEventEmiterSubscription
   *
   *
   */
  private scrollEventEmiterSubscription: Subscription;

  /*
   * tabsChangeSubscription
   *
   *
   */
  private tabsChangeSubscription: Subscription;

  /*
   * tableSortSubscription
   *
   *
   */
  private tableSortSubscription: Subscription;

  /*
   * payload
   *
   *
   */
  private payload: DecFilter;

  /*
   * _endpoint internall
   *
   *
   */
  private _endpoint: string;

  /*
   * _filter
   *
   *
   */
  private _filter: DecListFilterComponent;

  /*
   * _name
   *
   *
   */
  private _name: string;

  /*
   * _givenRows
   *
   *
   */
  private _givenRows: any[];

  /*
   * customFetchMethod
   *
   * method used to fetch data from back-end
   */
  @Input() customFetchMethod: DecListFetchMethod;

  /*
   * columnsSortConfig
   *
   * used to get a sorted list from backend
   * can be pased via attribute to sort the first load
   */
  @Input() columnsSortConfig;

  /*
   * disableShowMoreButton
   *
   * used to hide the show more button
   */
  @Input() disableShowMoreButton: boolean;

  /*
   * endpoint
   *
   *
   */
  @Input()
  set endpoint(v: string) {
    if (this._endpoint !== v) {
      this._endpoint = (v[0] && v[0] === '/') ? v.replace('/', '') : v;
    }
  }

  get endpoint(): string {
    return this._endpoint;
  }

  /*
   * name
   *
   *
   */
  @Input()
  set name(v: string) {
    if (this._name !== v) {
      this._name = v;
      this.setFiltersComponentsBasePathAndNames();
    }
  }

  get name() {
    return this._name;
  }

  /*
   * rows
   *
   *
   */
  @Input('rows')

  set rows(rows) {
    this._givenRows = rows;
    this.setRows(this._givenRows);
  }

  get rows() {
    return this.report ? this.report.result.rows : undefined;
  }

  /*
   * limit
   *
   *
   */
  @Input() limit = 10;

  /*
   * listMode
   *
   *
   */
  @Input() listMode: DecListType;

  /*
   * scrollableContainerClass
   *
   * Where the scroll watcher should be listening
   */
  @Input() scrollableContainerClass = 'mat-sidenav-content';

  /*
   * searchableProperties
   *
   * Properties to be searched when using basic search
   */
  @Input() searchableProperties: string[];

  /*
   * showFooter
   *
   *
   */
  @Input() selected = [];

  /*
   * showFooter
   *
   *
   */
  @Input() showFooter = true;

  /*
   * postSearch
   *
   * This middleware is used to trigger events after every search
   */
  @Output() postSearch = new EventEmitter<any>();

  /*
   * rowClick
   *
   * Emits an event when a row or card is clicked
   */
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();

  /*
   * grid
   *
   *
   */
  @ContentChild(DecListGridComponent) grid: DecListGridComponent;

  /*
   * table
   *
   *
   */
  @ContentChild(DecListTableComponent) table: DecListTableComponent;

  /*
   * filter
   *
   *
   */
  @ContentChild(DecListFilterComponent)
  set filter(v: DecListFilterComponent) {
    if (this._filter !== v) {
      this._filter = v;
      this.setFiltersComponentsBasePathAndNames();
    }
  }

  get filter() {
    return this._filter;
  }

  /*
   * ngOnInit
   *
   *
   */
  constructor(
    private service: DecApiService
  ) { }

  /*
   * ngOnInit
   *
   * Starts a fresh component and prepare it to run
   *
   * - Start the Reactive Report
   * - Subscribe to the Reactive Report
   * - Start watching window Scroll
   * - Ensure unique name
   */
  ngOnInit() {
    this.watchFilterData();
    this.ensureUniqueName();
    this.detectListModeBasedOnGridAndTablePresence();
  }

  /*
  * ngAfterViewInit
  *
  * Wait for the subcomponents to start before run the component
  *
  * - Start watching Filter
  * - Do the first load
  */
  ngAfterViewInit() {
    this.watchFilter();
    this.doFirstLoad();
    this.detectListMode();
    this.watchTabsChange();
    this.watchTableSort();
    this.registerChildWatchers();
    this.shareSelectedRowsArray();
    this.watchScroll();
    this.watchScrollEventEmitter();
  }

  /*
   * ngOnDestroy
   *
   * Destroy watcher to free meemory and remove unnecessary triggers
   *
   * - Unsubscribe from the Reactive Report
   * - Stop watching window Scroll
   * - Stop watching Filter
   */
  ngOnDestroy() {
    this.unsubscribeToReactiveReport();
    this.stopWatchingScroll();
    this.stopWatchingFilter();
    this.stopWatchingTabsChange();
    this.stopWatchingTableSort();
    this.stopWatchingScrollEventEmitter();
  }

  /*
   * reloadCountReport
   *
   */
  reloadCountReport() {

    if (this.filter && this.filter.filters && this.filter.loadCountReport) {

      const endpoint = this.endpoint[this.endpoint.length - 1] === '/' ? `${this.endpoint}count` : `${this.endpoint}/count`;

      const filters = this.filter.filters;

      const payloadWithSearchableProperties = this.getCountableFilters(filters);

      this.service.post(endpoint, payloadWithSearchableProperties)
        .subscribe(res => {

          this.countReport = this.mountCountReport(res);

          this.filter.countReport = this.countReport;

        });

    }

  }

  /*
   * removeItem
   *
   * Removes an item from the list
   */
  removeItem(ids: number | number[], compareFn = DELETE_COMPARE_FUNCTION, recount = true) {

    if (Array.isArray(ids)) {

      ids.forEach(id => {

        this.removeItem(id, compareFn, false);

      });

    } else {

      const item = this.rows.find((_item) => compareFn(_item, ids));

      if (item) {

        const itemIndex = this.rows.indexOf(item);

        if (itemIndex >= 0) {

          this.rows.splice(itemIndex, 1);

        }

        const selectedItemIndex = this.selected.indexOf(item);

        if (selectedItemIndex >= 0) {

          this.selected.splice(selectedItemIndex, 1);

        }

      }

    }

    if (recount && this.endpoint) {

      this.reloadCountReport();

    }

  }

  /*
   * restart
   *
   * Clear the list and reload the first page
   */
  restart() {

    this.loadReport(true);
    this.resetSelected();
  }

  /*
   * showMore
   *
   */
  showMore() {

    return this.loadReport();

  }

  /*
   * searchSubfilter
   *
   * search by subfilter filter
   */
  searchSubfilter(filter: DecListFilter) {

    if (this.selectedSubfilter !== filter.uid) {

      this.loadByOpennedSubfilter(filter.uid);

    }

  }

  /*
   * tableAndGridAreSet
   *
   * Return true if there are both GRID and TABLE definition inside the list
   */
  tableAndGridAreSet() {
    return this.grid && this.table;
  }

  /*
   * toggleListMode
   *
   * Changes between GRID and TABLE visualizatoin modes
   */
  toggleListMode() {

    this.listMode = this.listMode === 'grid' ? 'table' : 'grid';

    if (this.listMode === 'table') {

      setTimeout(() => {

        this.table.tableComponent.recalculate();

      }, 1);

    }

  }

  /*
   * getSubfilterCount
   *
   * get subfilter Count from countReport
   */
  getSubfilterCount(uid) {

    try {

      return this.countReport[this.selectedTab].children[uid].count;

    } catch (error) {

      return '?';

    }


  }

  /*
   getListMode
   *
   *
   */
  private getListMode = () => {

    let listMode = this.listMode;

    if (this.filter && this.filter.tabsFilterComponent) {

      if (this.selectedTab && this.selectedTab.listMode) {

        listMode = this.selectedTab.listMode;

      } else {

        listMode = this.table ? 'table' : 'grid';

      }

    }

    return listMode;

  }

  /*
   mountCountReport
   *
   *
   */
  private mountCountReport(filtersCounters): CountReport {

    const countReport: CountReport = {
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

  /*
   * getCountableFilters
   *
   * Get the search filter, trnsforme the search params into the searchable properties and inject it in every filter configured in dec-filters
   *
   * The result is used to call the count endpoint and return the amount of reccords found in every tab/collapse
   *
   */
  private getCountableFilters(filters) {

    const filterGroupsWithoutTabs = this.filter.filterGroupsWithoutTabs || [{ filters: [] }];

    const filtersPlusSearch = filters.map(decFilter => {

      const decFilterFiltersPlusSearch = JSON.parse(JSON.stringify(decFilter));

      if (decFilterFiltersPlusSearch.filters) {

        const tabFiltersCopy = JSON.parse(JSON.stringify(decFilterFiltersPlusSearch.filters));

        decFilterFiltersPlusSearch.filters = JSON.parse(JSON.stringify(filterGroupsWithoutTabs));

        decFilterFiltersPlusSearch.filters.forEach(filterGroup => {

          filterGroup.filters.push(...tabFiltersCopy);

        });

      } else if (decFilterFiltersPlusSearch.children) {

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

  /*
   * ensureFilterValuesAsArray
   *
   * Get an array of filtergroups and set the filter values to array if not
   *
   */
  private ensureFilterValuesAsArray(filterGroups: any = []) {

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

  /*
   * actByScrollPosition
   *
   * This method detect if there is scrooling action on window to fetch and show more rows when the scrolling down.
   */
  private actByScrollPosition = ($event) => {

    if ($event['path']) {

      const elementWithCdkOverlayClass = $event['path'].find(path => {

        const className = path['className'] || '';

        const insideOverlay = className.indexOf('cdk-overlay') >= 0;

        const insideFullscreanDialogContainer = className.indexOf('fullscrean-dialog-container') >= 0;

        return insideOverlay || insideFullscreanDialogContainer;

      });

      if (!elementWithCdkOverlayClass) { // avoid closing filter from any open dialog

        if (!this.isLastPage) {

          const target: any = $event['target'];

          const limit = target.scrollHeight - target.clientHeight;

          if (target.scrollTop >= (limit - 16)) {

            this.showMore();

          }

        }
      }

    }

  }

  /*
   * detectListMode
   *
   getListMode input
   */
  private detectListMode() {

    this.getListMode();

  }

  /*
   * detectListModeBasedOnGridAndTablePresence()
   *
   * Set the list mode based on declaration of table and grid. This is necessary to bootastrap the component with only grid or only table
   * This only work if no mode is provided by @Input otherwise the @Input value will be used
   */
  private detectListModeBasedOnGridAndTablePresence() {

    this.listMode = this.listMode ? this.listMode : this.table ? 'table' : 'grid';

  }

  /*
   * emitScrollEvent
   *
   * Emits scroll event when not loading
   */
  private emitScrollEvent = ($event) => {

    if (!this.loading) {

      this.scrollEventEmiter.emit($event);

    }

  }

  /*
   * isTabsFilterDefined
   *
   * Return true if the Tabs Filter is defined inside the list
   */
  private isTabsFilterDefined() {
    return this.filter && this.filter.tabsFilterComponent;
  }

  /*
   * doFirstLoad
   *
   * This method is called after the view and inputs are initialized
   *
   * This is the first call to get data
   */
  private doFirstLoad() {
    if (this.isTabsFilterDefined()) {
      this.doFirstLoadByTabsFilter();
    } else {
      this.doFirstLoadLocally(true);
    }
  }

  /*
   * doFirstLoadByTabsFilter
   *
   * use the tabs filter to trigger the first load
   *
   * This way the default tab and filter are selected by the dectabsFilter component
   *
   */
  private doFirstLoadByTabsFilter() {
    this.filter.tabsFilterComponent.doFirstLoad();
  }

  /*
   * doFirstLoadLocally
   *
   * If no filter are defined, just call th eendpoint without filters
   */
  private doFirstLoadLocally(refresh) {
    this.loadReport(refresh);
  }

  /*
   * ensureUniqueName
   *
   * We must provide an unique name to the list so we can persist its state in the URL without conflicts
   *
   */
  private ensureUniqueName() {
    if (!this.name) {
      const error = 'ListComponentError: The list component must have an unique name to be used in url filter.'
        + ' Please, ensure that you have passed an unique namme to the component.';
      throw new Error(error);
    }
  }

  /*
   * loadByOpennedSubfilter
   *
   * This method is triggered when a collapsable table is open or a tab is selected.
   *
   */
  private loadByOpennedSubfilter(filterUid) {

    const filter = this.subfilter.children.find(item => item.uid === filterUid);

    const filterGroup: FilterGroup = { filters: filter.filters };

    this.loadReport(true, filterGroup);

    setTimeout(() => {

      this.selectedSubfilter = filter.uid;

    }, 0);


  }

  /*
   * loadReport
   *
   * This mehtod gather the filter info and endpoint and call the back-end to fetch the data
   *
   * If the suctomFetchMethod is used, its call it
   *
   * If only the rows are passed, the method just use it as result
   */
  private loadReport(clearAndReloadReport?: boolean, collapseFilterGroups?: FilterGroup): Promise<any> {

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


      } else if (this.customFetchMethod) {

        this.mountPayload(clearAndReloadReport, collapseFilterGroups)
          .then(payload => {

            this.payload = payload;

            this.filterData.next();

          });

      } else if (this.rows) {

        console.log('DecList:: Local filter not implemented. Talk to Bruno to see how to do it!');

      } else {

        setTimeout(() => {

          rej('No endpoint, customFetchMethod or rows set');

          this.loading = false;

        }, 1);

      }

    });

  }

  private mountPayload(clearAndReloadReport: boolean = false, collapseFilterGroups?) {

    return new Promise((resolve, reject) => {

      const searchFilterGroups = this.filter ? this.filter.filterGroups : undefined;

      const filterGroups = this.appendFilterGroupsToEachFilterGroup(searchFilterGroups, collapseFilterGroups);

      const payload: DecFilter = {};

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

  /*
   * appendFilterGroupsToEachFilterGroup
   *
   * Gets an array of filterGroup and in each filterGroup in this array appends the second filterGroup filters.
   */
  private appendFilterGroupsToEachFilterGroup(filterGroups: FilterGroups, filterGroupToAppend: FilterGroup) {

    if (filterGroupToAppend) {

      if (filterGroups && filterGroups.length > 0) {

        filterGroups.forEach(group => {

          group.filters.push(...filterGroupToAppend.filters);

        });

      } else {

        filterGroups = [filterGroupToAppend];

      }

    }

    return filterGroups || [];

  }

  /*
   * setFiltersComponentsBasePathAndNames
   *
   */
  private setFiltersComponentsBasePathAndNames() {

    if (this.filter) {

      this.filter.name = this.name;


      if (this.filter.tabsFilterComponent) {

        this.filter.tabsFilterComponent.name = this.name;

        if (this.customFetchMethod) {

          this.filter.tabsFilterComponent.customFetchMethod = this.customFetchMethod;

        } else {

          this.filter.tabsFilterComponent.service = this.service;

        }



      }

    }

  }

  /*
   * setRows
   *
   * Sets the current table rows
   *
   */
  private setRows(rows = this._givenRows || []) {

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

  /*
   * watchScrollEventEmitter
   *
   *
   */
  private watchScrollEventEmitter() {

    this.scrollEventEmiterSubscription = this.scrollEventEmiter
      .pipe(
        debounceTime(150),
        distinctUntilChanged()
      ).subscribe(this.actByScrollPosition);

  }

  /*
   * stopWatchingScrollEventEmitter
   *
   *
   */
  private stopWatchingScrollEventEmitter() {

    if (this.scrollEventEmiterSubscription) {

      this.scrollEventEmiterSubscription.unsubscribe();

    }

  }

  /*
   * watchFilterData
   *
   */
  private watchFilterData() {
    this.reactiveReport = this.filterData
      .pipe(
        debounceTime(150), // avoid muiltiple request when the filter or tab change too fast
        switchMap((filterData: FilterData) => {

          const observable = new BehaviorSubject<any>(undefined);

          const fetchMethod: DecListFetchMethod = this.customFetchMethod || this.service.get;

          const endpoint = filterData ? filterData.endpoint : undefined;

          const payloadWithSearchableProperties = this.getPayloadWithSearchTransformedIntoSearchableProperties(this.payload);

          if (filterData && filterData.clear) {
            this.setRows();
          }

          fetchMethod(endpoint, payloadWithSearchableProperties)
            .subscribe(res => {

              observable.next(res);

              if (filterData && filterData.cbk) {

                setTimeout(() => { // wait for subscribers to refresh their rows

                  filterData.cbk(new Promise((resolve, rej) => {

                    resolve(res);

                  }));

                }, 1);
              }
              return res;
            });

          return observable;
        })

      );
    this.subscribeToReactiveReport();
  }

  private getPayloadWithSearchTransformedIntoSearchableProperties(payload) {

    const payloadCopy = { ...payload };

    if (payloadCopy.filterGroups && this.searchableProperties) {

      payloadCopy.filterGroups = [...payload.filterGroups];

      this.appendFilterGroupsBasedOnSearchableProperties(payloadCopy.filterGroups);

      return payloadCopy;

    } else {

      return this.payload;

    }

  }

  private appendFilterGroupsBasedOnSearchableProperties(filterGroups) {

    const filterGroupsThatContainsBasicSearch = this.getFilterGroupsThatContainsTheBasicSearch(filterGroups);

    if (filterGroupsThatContainsBasicSearch && filterGroupsThatContainsBasicSearch.length > 0) {

      filterGroupsThatContainsBasicSearch.forEach(filterGroupThatContainsBasicSearch => {

        this.removeFilterGroup(filterGroups, filterGroupThatContainsBasicSearch);

        const basicSearch = filterGroupThatContainsBasicSearch.filters.find(filter => filter.property === 'search');

        const basicSearchIndex = filterGroupThatContainsBasicSearch.filters.indexOf(basicSearch);

        this.searchableProperties.forEach(property => {

          const newFilterGroup: FilterGroup = {
            filters: [...filterGroupThatContainsBasicSearch.filters]
          };

          newFilterGroup.filters[basicSearchIndex] = {
            property: property,
            value: basicSearch.value.split(',').map(value => value.trim())
          };

          filterGroups.push(newFilterGroup);

        });

      });

    }

  }

  private removeFilterGroup(filterGroups, filterGroupThatContainsBasicSearch) {

    const filterGroupThatContainsBasicSearchIndex = filterGroups.indexOf(filterGroupThatContainsBasicSearch);

    filterGroups.splice(filterGroupThatContainsBasicSearchIndex, 1);

  }

  private getFilterGroupsThatContainsTheBasicSearch(filterGroups) {

    return filterGroups.filter(filterGroup => {

      const basicSerchFilter = filterGroup.filters ? filterGroup.filters.find(filter => filter.property === 'search') : undefined;

      return basicSerchFilter ? true : false;

    });

  }

  /*
   * subscribeToReactiveReport
   *
   */
  private subscribeToReactiveReport() {
    this.reactiveReportSubscription = this.reactiveReport
      .pipe(
        tap(res => {
          if (res) {
            this.loading = false;
          }
        })
      )
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

  private detectLastPage(rows, count) {

    const numberOfrows = rows.length;

    const emptList = numberOfrows === 0;

    const singlePageList = numberOfrows === count;

    this.isLastPage = emptList || singlePageList;

  }

  /*
   * unsubscribeToReactiveReport
   *
   */
  private unsubscribeToReactiveReport() {
    if (this.reactiveReportSubscription) {
      this.reactiveReportSubscription.unsubscribe();
    }
  }

  /*
   * updateContentChildren
   *
   */
  private updateContentChildren() {

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

  /*
   * registerChildWatchers
   *
   * Watch for children outputs
   */
  private registerChildWatchers() {

    if (this.grid) {
      this.watchGridRowClick();
    }

    if (this.table) {
      this.watchTableRowClick();
    }

  }

  /*
   * shareSelectedRowsArray
   *
   * Share the selected array between views
   */
  private shareSelectedRowsArray() {

    setTimeout(() => {
      if (this.table) {
        this.table.selected = this.selected;
      }

      if (this.grid) {
        this.grid.selected = this.selected;
      }
    }, 0);

  }

  /*
   * watchGridRowClick
   *
   */
  private watchGridRowClick() {
    this.grid.rowClick.subscribe(($event) => {
      this.rowClick.emit($event);
    });
  }

  /*
   * watchTableRowClick
   *
   */
  private watchTableRowClick() {
    this.table.rowClick.subscribe(($event) => {
      this.rowClick.emit($event);
    });
  }

  /*
   * watchFilter
   *
   */
  private watchFilter() {
    if (this.filter) {

      this.filterSubscription = this.filter.search.subscribe(event => {

        const tabChanged = !this.previousSelectedTab || (this.previousSelectedTab !== this.selectedTab);

        const sublistModeChanged = this.sublistMode !== event.sublistMode;

        if (tabChanged) {

          this.previousSelectedTab = this.selectedTab;

          this.setRows(); // if changing tabs, clear the results before showing the rows because it is done only after fetching the data

        }

        if (sublistModeChanged) {

          this.sublistMode = event.sublistMode;

        }

        if (!this.sublistMode) {

          this.selectedSubfilter = undefined;

          this.subfilter = undefined;

          this.loadReport(true).then((res) => {

            if (event.recount) {

              this.reloadCountReport();

            }

          });

        } else {

          if (!this.countReport || event.recount) {

            this.reloadCountReport();

          }

          if (this.selectedSubfilter) {

            this.loadByOpennedSubfilter(this.selectedSubfilter);

          }

          this.subfilter = {
            tab: this.selectedTab,
            children: event.children ? event.children : []
          };

        }

      });
    }
  }

  /*
   * watchFilter
   *
   */
  private stopWatchingFilter() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  /*
   * watchScroll
   *
   */
  private watchScroll() {
    setTimeout(() => {
      this.scrollableContainer = document.getElementsByClassName(this.scrollableContainerClass)[0];
      if (this.scrollableContainer) {
        this.scrollableContainer.addEventListener('scroll', this.emitScrollEvent, true);
      }
    }, 1);
  }

  /*
   * stopWatchingScroll
   *
   */
  private stopWatchingScroll() {
    if (this.scrollableContainer) {
      this.scrollableContainer.removeEventListener('scroll', this.emitScrollEvent, true);
    }
  }

  /*
   * subscribeToReactiveReport
   *
   */
  private watchTabsChange() {

    if (this.filter && this.filter.tabsFilterComponent) {

      this.selectedTab = this.filter.tabsFilterComponent.selectedTab;

      this.tabsChangeSubscription = this.filter.tabsFilterComponent.tabChange.subscribe(tab => {
        this.selectedTab = tab;
        this.detectListMode();
      });

    }
  }

  /*
   * subscribeToTabsChange
   *
   */
  private stopWatchingTabsChange() {
    if (this.tabsChangeSubscription) {
      this.tabsChangeSubscription.unsubscribe();
    }
  }

  /*
   * watchTableSort
   *
   */
  private watchTableSort() {
    if (this.table) {

      this.tableSortSubscription = this.table.sort.subscribe(columnsSortConfig => {

        if (this.columnsSortConfig !== columnsSortConfig) {

          this.columnsSortConfig = columnsSortConfig;

          if (this.subfilter) {

            this.loadByOpennedSubfilter(this.selectedSubfilter);

          } else {

            this.loadReport(true);

          }

        }

      });
    }
  }

  /*
   * stopWatchingTableSort
   *
   */
  private stopWatchingTableSort() {
    if (this.tableSortSubscription) {
      this.tableSortSubscription.unsubscribe();
    }
  }


  /*
  * Reset Selected Rows in Table
  *
  */
  private resetSelected() {
    this.selected = [];
    this.shareSelectedRowsArray();
  }
}
