import { Component, ContentChild, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DecListTabsFilterComponent } from './list-tabs-filter/list-tabs-filter.component';
import { DecListAdvancedFilterComponent } from './../list-advanced-filter/list-advanced-filter.component';
import { Subscription } from 'rxjs';
import { DecListPreSearch, DecListFilter } from './../list.models';
import { FilterGroups } from './../../../services/api/decora-api.model';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'dec-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class DecListFilterComponent implements OnInit, OnDestroy {

  count: number;

  countReport;

  showSearchInput: boolean;

  showAdvancedFilter: boolean;

  filterForm: any = {
    search: undefined
  };

  filterGroups: FilterGroups;

  filterGroupsWithoutTabs: FilterGroups;

  currentStatusFiltered: string;

  tabsFilter: any;

  editionGroupIndex: number;

  name: string;

  loading: boolean;

  isItFirstLoad = true;

  filterMode: 'tabs' | 'collapse';

  childrenFilters;

  /*
   * clickableContainerClass
   *
   * Where the click watcher should be listening
   */
  private clickableContainerClass = 'list-filter-wrapper';

  private innerDecFilterGroups: any[];

  private currentUrlEncodedFilter: string;

  private tabsFilterSubscription: Subscription;

  private watchUrlFilterSubscription: Subscription;

  private _filters: DecListFilter[] = [];

  private _loadCountReport: boolean;

  @Input() preSearch: DecListPreSearch;

  @Input() showInfoButton;

  @Input() hasPersistence = true;

  @Input()
  set filters(v: DecListFilter[]) {

    if (this._filters !== v) {

      this._filters = v.map(filter => new DecListFilter(filter));

    }

  }

  get loadCountReport(): boolean {
    return this._loadCountReport;
  }

  @Input()
  set loadCountReport(v: boolean) {
    if (v !== false) {
      this._loadCountReport = true;
    }
  }

  get filters(): DecListFilter[] {
    return this._filters;
  }

  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('inputSearch') inputSearch;

  @ViewChild(DecListTabsFilterComponent) tabsFilterComponent: DecListTabsFilterComponent;

  @ContentChild(DecListAdvancedFilterComponent) advancedFilterComponent: DecListAdvancedFilterComponent;

  constructor(
    private platformLocation: PlatformLocation,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.watchTabsFilter();
    this.watchClick();
    this.watchUrlFilter();
    this.configureAdvancedFilter();
  }

  ngOnDestroy() {
    this.stopWatchingClick();
    this.stopWatchingTabsFilter();
    this.stopWatchingUrlFilter();
  }

  toggleSearchInput() {
    this.showSearchInput = !this.showSearchInput;
    if (!this.showSearchInput) {
      this.showAdvancedFilter = false;
    } else {
      setTimeout(() => {
        this.inputSearch.nativeElement.focus();
      }, 180);
    }
  }

  toggleAdvancedFilter($event) {

    $event.stopPropagation();

    this.showAdvancedFilter = !this.showAdvancedFilter;

  }

  onSearch = (appendCurrentForm = true) => {

    if (this.filterForm && appendCurrentForm) {

      const newDecFilterGroup = {

        filters: []

      };

      Object.keys(this.filterForm).forEach(key => {

        if (this.filterForm[key]) {

          const filter = { property: key, value: this.filterForm[key] };

          newDecFilterGroup.filters.push(filter);

        }


      });

      if (newDecFilterGroup.filters.length > 0) {

        if (this.innerDecFilterGroups) {

          if (this.editionGroupIndex >= 0) {

            this.innerDecFilterGroups[this.editionGroupIndex] = newDecFilterGroup;

          } else {

            this.innerDecFilterGroups.push(newDecFilterGroup);

          }

        } else {

          this.innerDecFilterGroups = [newDecFilterGroup];

        }

      }

    }

    this.reacalculateAndEmitCurrentDecFilterGroups(true);

  }

  onClear() {

    this.closeFilters();

    this.filterGroups = undefined;

    this.filterGroupsWithoutTabs = undefined;

    this.innerDecFilterGroups = undefined;

    this.clearFilterForm();

    this.onSearch();

  }

  removeDecFilterGroup(groupIndex) {

    this.filterGroups = this.filterGroups.filter((group, index) => index !== groupIndex);

    this.filterGroupsWithoutTabs = this.filterGroupsWithoutTabs.filter((group, index) => index !== groupIndex);

    this.innerDecFilterGroups = this.innerDecFilterGroups.filter((group, index) => index !== groupIndex);

    this.onSearch(true);

  }

  editDecFilterGroup(groupIndex) {

    this.editionGroupIndex = groupIndex;

    const toEditDecFilterGroup = this.filterGroupsWithoutTabs[groupIndex];

    if (toEditDecFilterGroup && toEditDecFilterGroup.filters.length > 0) {

      this.reloadFormWithGivenDecFilterGroupe(toEditDecFilterGroup.filters);

    }

  }

  clearFilterForm = () => {

    if (this.filterForm) {

      Object.keys(this.filterForm).forEach(key => {

        this.filterForm[key] = undefined;

      });

    }


  }

  onClickInfo() {
    console.log('on click info. Not implemented');
  }

  /*
   * appendToCurrentFilters
   *
   * Append a filter to the current filter groups
   */
  appendToCurrentDecFilterGroups(propertyName, propertyValue) {

    const filter = {
      'property': propertyName,
      'value': propertyValue,
    };

    if (this.filterGroupsWithoutTabs) {

      this.filterGroupsWithoutTabs.forEach((filterGroup) => {

        const filterExistsInThisGroup = filterGroup.filters.find(filterGroupFilter => filterGroupFilter.property === filter.property);

        if (!filterExistsInThisGroup) {

          filterGroup.filters.push(filter);

        }

      });

    } else {

      this.filterGroupsWithoutTabs = [{ filters: [filter] }];

    }

    this.innerDecFilterGroups = this.filterGroupsWithoutTabs;

    this.reacalculateAndEmitCurrentDecFilterGroups();

  }

  closeFilters() {

    this.editionGroupIndex = undefined;

    this.showAdvancedFilter = false;

    this.showSearchInput = false;

  }

  private reacalculateAndEmitCurrentDecFilterGroups(recount = false) {

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

  private reloadFormWithGivenDecFilterGroupe(filters) {

    this.clearFilterForm();

    filters.forEach(filter => {

      if (filter.value) {

        this.filterForm[filter.property] = filter.value;

      }

    });

    this.openFilters();

  }

  private openFilters() {

    this.showAdvancedFilter = true;

    this.showSearchInput = true;

  }

  private configureAdvancedFilter() {

    if (this.advancedFilterComponent) {

      this.advancedFilterComponent.form = this.filterForm;

      this.advancedFilterComponent.onSearch = this.onSearch;

      this.advancedFilterComponent.onClear = this.clearFilterForm;

    }

  }

  private watchTabsFilter() {
    if (this.tabsFilterComponent) {
      this.tabsFilterSubscription = this.tabsFilterComponent.search.subscribe(filterEvent => {

        if (filterEvent.children) {

          this.filterMode = 'collapse';

          this.childrenFilters = filterEvent.children;

        } else {

          this.filterMode = 'tabs';

          this.childrenFilters = undefined;

        }


        this.tabsFilter = filterEvent.filters;

        this.emitCurrentDecFilterGroups(this.isItFirstLoad || filterEvent.recount);

        this.isItFirstLoad = false;

      });
    }
  }

  private stopWatchingTabsFilter() {
    if (this.tabsFilterSubscription) {
      this.tabsFilterSubscription.unsubscribe();
    }
  }

  private mountCurrentDecFilterGroups() {

    const currentFilter = [];

    const currentFilterWithoutTabs = [];

    if (this.innerDecFilterGroups && this.innerDecFilterGroups.length) {

      this.innerDecFilterGroups.forEach((filterGroup: { filters: any[] }) => {

        const filterGroupCopy = {
          filters: filterGroup.filters.slice()
        };

        if (this.tabsFilter) {
          filterGroupCopy.filters.push(...this.tabsFilter);
        }

        currentFilter.push(filterGroupCopy);

        const filterGroupCopyWithoutTabs = {
          filters: filterGroup.filters.slice()
        };

        currentFilterWithoutTabs.push(filterGroupCopyWithoutTabs);

      });

    } else if (this.tabsFilter) {

      currentFilter.push({ filters: this.tabsFilter });

    }

    this.filterGroups = currentFilter.length ? currentFilter : undefined;

    this.filterGroupsWithoutTabs = currentFilterWithoutTabs.length ? currentFilterWithoutTabs : undefined;
  }

  /*
   * emitCurrentDecFilterGroups
   *
   */
  private emitCurrentDecFilterGroups(recount = false) {

    let filterGroups = this.filterGroups ? JSON.parse(JSON.stringify(this.filterGroups)) : undefined;

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

  /*
   * actByClickPosition
   *
   * This method detect
   */
  private actByClickPosition = ($event) => {

    if (event && event['path']) {

      const clickedInsideFilter = $event['path'].find(path => {

        const className = `${path['className']}` || '';

        const insideWrapper = className.indexOf(this.clickableContainerClass) >= 0;

        const insideOption = className.indexOf('mat-option') >= 0;

        const insideDatePicker = className.indexOf('mat-datepicker-content') >= 0;

        const insideOverlayContainer = className.indexOf('cdk-overlay-container') >= 0;

        return insideWrapper || insideOption || insideDatePicker || insideOverlayContainer;

      });

      if (!clickedInsideFilter) { // avoid closing filter from any open dialog

        this.closeFilters();

        this.clearFilterForm();

      }

    }

  }

  /*
   * watchClick
   *
   */
  private watchClick() {
    document.addEventListener('click', this.actByClickPosition, true);
  }

  /*
   * stopWatchingClick
   *
   */
  private stopWatchingClick() {
    document.removeEventListener('click', this.actByClickPosition, true);
  }

  /*
   * componentTabName
   *
   */
  private componentFilterName() {
    return this.name + '-filter';
  }

  /*
   * watchUrlFilter
   *
   */
  private watchUrlFilter() {

    if (!this.hasPersistence) {

      return;

    }

    this.watchUrlFilterSubscription = this.route.queryParams
      .subscribe((params) => {

        const interval = window.setInterval(() => {

          if (this.name) {

            const base64Filter = params[this.componentFilterName()];

            if (base64Filter) {

              if (base64Filter !== this.currentUrlEncodedFilter) {

                const filter = this.getJsonFromBase64Filter(base64Filter);

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

  /*
   * stopWatchingUrlFilter
   *
   */
  private stopWatchingUrlFilter() {

    if (this.watchUrlFilterSubscription) {

      this.watchUrlFilterSubscription.unsubscribe();

    }

  }

  /*
   * refreshFilterInUrlQuery
   *
   */
  private refreshFilterInUrlQuery() {

    return new Promise((res, rej) => {

      const filterBase64 = this.getBase64FilterFromDecFilterGroups();

      this.setFilterInUrlQuery(filterBase64).then(res, rej);

    });


  }

  /*
   * setFilterInUrlQuery
   *
   */
  private setFilterInUrlQuery(filter) {

    this.currentUrlEncodedFilter = filter;

    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);

    queryParams[this.componentFilterName()] = filter;

    return this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });

  }

  /*
   * stopWatchingUrlFilter
   *
   */
  private getBase64FilterFromDecFilterGroups() {
    if (this.filterGroupsWithoutTabs && this.filterGroupsWithoutTabs.length) {
      const base64Filter = btoa(encodeURIComponent(JSON.stringify(this.filterGroupsWithoutTabs)));
      const baseFilterWithoutEqualSign = base64Filter.replace(/=/g, '');
      return baseFilterWithoutEqualSign; // removes = befor eset the filter
    } else {
      return undefined;
    }
  }

  /*
   * stopWatchingUrlFilter
   *
   * See https://stackoverflow.com/questions/9020409/is-it-ok-to-remove-the-equal-signs-from-a-base64-string
   */
  private getJsonFromBase64Filter(base64Filter) {
    const base64PadLen = (base64Filter.length % 4) > 0 ? 4 - (base64Filter.length % 4) : 0;

    for (let i = 0; i < base64PadLen; i++) {
      base64Filter += '='; // add = before readd the filter
    }

    let filterObject;

    try {
      filterObject = JSON.parse(decodeURIComponent(atob(base64Filter)));
    } catch (error) {
      const msg = 'ListFilterComponent:: Failed to parse the filter. The value is not valid and the filter was removed. Filter value: ';
      console.error(msg, base64Filter);
    }

    return base64Filter ? filterObject : undefined;
  }

}
