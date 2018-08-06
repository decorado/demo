import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DecListFetchMethod, DecListFilter } from './../../list.models';

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
  set filters(v: DecListFilter[]) {
    if (this._filters !== v) {
      this._filters = v ? v.map(filter => new DecListFilter(filter)) : [];
    }
  }

  get filters(): DecListFilter[] {
    return this._filters;
  }

  private defaultTab: string;

  private _filters: DecListFilter[] = [];

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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnDestroy() {
    this.stopWatchingTabInUrlQuery();
  }

  doFirstLoad = () => {
    setTimeout(() => { // avoids ExpressionChangedAfterItHasBeenCheckedError selecting the active tab
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

  private onSearch = (tab, recount = false) => {

    this.selectedTabUid = tab.uid;

    if (this.filters && tab) {

      const event = {
        filters: tab.filters,
        children: tab.children,
        recount: recount,
      };

      this.search.emit(event);

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

          const selectedTab = this.filters.find(filter => filter.uid === tab);

          this.onSearch(selectedTab);

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
