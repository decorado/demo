import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DecListFetchMethod, DecListTabsFilter } from './../list.models';

@Component({
  selector: 'dec-list-tabs-filter',
  templateUrl: './list-tabs-filter.component.html',
  styleUrls: ['./list-tabs-filter.component.scss']
})
export class DecListTabsFilterComponent implements OnDestroy {

  selectedTabUid: string;

  name: string; // list unique name to identify the tab in url

  countReport: any;

  service: any;

  customFetchMethod: DecListFetchMethod;

  @Input()
  set filters(v: DecListTabsFilter[]) {

    if (this._filters !== v) {

      this._filters = v.map(filter => new DecListTabsFilter(filter));

    }

  }

  get filters(): DecListTabsFilter[] {
    return this._filters;
  }

  private defaultTab: string;

  private _filters: DecListTabsFilter[] = [];

  private wathUrlSubscription: Subscription;

  private _countEndpoint: string;


  /*
   * countEndpoint
   *
   *
   */
  @Input()
  set countEndpoint(v: string) {

    if (this._countEndpoint !== v) {

      this._countEndpoint = (v[0] && v[0] === '/') ? v.replace('/', '') : v;

    }

  }

  get countEndpoint(): string {

    return this._countEndpoint;

  }

  @Output('search') search: EventEmitter<any> = new EventEmitter<any>();

  @Output('tabChange') tabChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnDestroy() {
    this.stopWatchingTabInUrlQuery();
  }

  doFirstLoad = () => {
    setTimeout(() => { // wait for the url to change before doing the first load
      this.watchTabInUrlQuery();
    }, 0);
  }

  getCountOf(count: string | Function) {
    if (typeof count === 'string') {
      return this.countReport && this.countReport[count] >= 0 ? this.countReport[count] : '?';
    } else {
      return this.countReport && count(this.countReport) >= 0 ? count(this.countReport) : '?';
    }
  }

  selectTab(tab) {
    this.setTabInUrlQuery(tab);
  }

  reloadCountReport(payload) {

    if (this.countEndpoint) {
      const fetchMethod = this.customFetchMethod || this.service.get;
      fetchMethod(this.countEndpoint, payload)
      .toPromise()
      .then(res => {
        this.countReport = res;
      });
    }
  }

  selectedTab() {

    return this.filters ? this.filters.find(filter => filter.uid === this.selectedTabUid) : undefined;

  }

  get visibleFilters() {
    const visible = this.filters ? this.filters.filter((filter) => !filter.hide) : [];
    return (visible && visible.length > 1) ? visible : undefined;
  }

  private detectDefaultTab() {

    const hasDefault: any = this.filters.find((item) => {
      return item.default;
    });

    if (hasDefault) {

      this.defaultTab = hasDefault.uid;

    } else {

      this.defaultTab = this.filters[0].uid;

    }

  }

  private onSearch = (uid, recount = false) => {

    this.selectedTabUid = uid;

    if (this.filters) {

      const filterTab = this.filters.find(filter => filter.uid === uid);

      if (filterTab) {

        this.search.emit({
          filters: filterTab.filters,
          recount: recount
        });

      }

    }


  }

  private componentTabName() {
    return this.name + '-tab';
  }

  private setTabInUrlQuery(tab) {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams[this.componentTabName()] = tab;
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
  }

  private watchTabInUrlQuery() {

    this.detectDefaultTab();

    this.wathUrlSubscription = this.route.queryParams
    .subscribe((params) => {

      const tab = params[this.componentTabName()] || this.defaultTab;

      if (tab !== this.selectedTabUid) {

        this.onSearch(tab);

        this.tabChange.emit(tab);

      }

    });

  }

  private stopWatchingTabInUrlQuery() {
    if (this.wathUrlSubscription) {
      this.wathUrlSubscription.unsubscribe();
    }
  }

}
