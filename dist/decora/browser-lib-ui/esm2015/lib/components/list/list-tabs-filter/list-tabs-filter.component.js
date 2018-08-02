/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecListTabsFilter } from './../list.models';
export class DecListTabsFilterComponent {
    /**
     * @param {?} route
     * @param {?} router
     */
    constructor(route, router) {
        this.route = route;
        this.router = router;
        this._filters = [];
        this.search = new EventEmitter();
        this.tabChange = new EventEmitter();
        this.doFirstLoad = () => {
            setTimeout(() => {
                // wait for the url to change before doing the first load
                this.watchTabInUrlQuery();
            }, 0);
        };
        this.onSearch = (uid, recount = false) => {
            this.selectedTabUid = uid;
            if (this.filters) {
                const /** @type {?} */ filterTab = this.filters.find(filter => filter.uid === uid);
                if (filterTab) {
                    this.search.emit({
                        filters: filterTab.filters,
                        recount: recount
                    });
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
            this._filters = v.map(filter => new DecListTabsFilter(filter));
        }
    }
    /**
     * @return {?}
     */
    get filters() {
        return this._filters;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set countEndpoint(v) {
        if (this._countEndpoint !== v) {
            this._countEndpoint = (v[0] && v[0] === '/') ? v.replace('/', '') : v;
        }
    }
    /**
     * @return {?}
     */
    get countEndpoint() {
        return this._countEndpoint;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stopWatchingTabInUrlQuery();
    }
    /**
     * @param {?} count
     * @return {?}
     */
    getCountOf(count) {
        if (typeof count === 'string') {
            return this.countReport && this.countReport[count] >= 0 ? this.countReport[count] : '?';
        }
        else {
            return this.countReport && count(this.countReport) >= 0 ? count(this.countReport) : '?';
        }
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    selectTab(tab) {
        this.setTabInUrlQuery(tab);
    }
    /**
     * @param {?} payload
     * @return {?}
     */
    reloadCountReport(payload) {
        if (this.countEndpoint) {
            const /** @type {?} */ fetchMethod = this.customFetchMethod || this.service.get;
            fetchMethod(this.countEndpoint, payload)
                .toPromise()
                .then(res => {
                this.countReport = res;
            });
        }
    }
    /**
     * @return {?}
     */
    selectedTab() {
        return this.filters ? this.filters.find(filter => filter.uid === this.selectedTabUid) : undefined;
    }
    /**
     * @return {?}
     */
    get visibleFilters() {
        const /** @type {?} */ visible = this.filters ? this.filters.filter((filter) => !filter.hide) : [];
        return (visible && visible.length > 1) ? visible : undefined;
    }
    /**
     * @return {?}
     */
    detectDefaultTab() {
        const /** @type {?} */ hasDefault = this.filters.find((item) => {
            return item.default;
        });
        if (hasDefault) {
            this.defaultTab = hasDefault.uid;
        }
        else {
            this.defaultTab = this.filters[0].uid;
        }
    }
    /**
     * @return {?}
     */
    componentTabName() {
        return this.name + '-tab';
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    setTabInUrlQuery(tab) {
        const /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
        queryParams[this.componentTabName()] = tab;
        this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
    }
    /**
     * @return {?}
     */
    watchTabInUrlQuery() {
        this.detectDefaultTab();
        this.wathUrlSubscription = this.route.queryParams
            .subscribe((params) => {
            const /** @type {?} */ tab = params[this.componentTabName()] || this.defaultTab;
            if (tab !== this.selectedTabUid) {
                this.onSearch(tab);
                this.tabChange.emit(tab);
            }
        });
    }
    /**
     * @return {?}
     */
    stopWatchingTabInUrlQuery() {
        if (this.wathUrlSubscription) {
            this.wathUrlSubscription.unsubscribe();
        }
    }
}
DecListTabsFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-tabs-filter',
                template: `<div class="list-tabs-filter-wrapper" *ngIf="visibleFilters as filters">
  <div fxLayout="row" class="dec-tab-header">
    <ng-container *ngFor="let tabFilter of filters">
      <button type="button"
              *decPermission="tabFilter.permissions"
              mat-button
              class="uppercase"
              (click)="selectTab(tabFilter.uid)"
              [class.selected]="selectedTabUid == (tabFilter.uid)">
        <span>{{ 'label.' + tabFilter.label | translate | uppercase }}</span>
        <span *ngIf="tabFilter.count && countEndpoint && countReport" class="badge badge-pill badge-small">{{ getCountOf(tabFilter.count) }}</span>
      </button>
    </ng-container>
  </div>
</div>
`,
                styles: [`.list-tabs-filter-wrapper{margin-top:8px}.list-tabs-filter-wrapper .dec-tab-header.bottom{border-bottom:0}.list-tabs-filter-wrapper .dec-tab-header .badge{margin-left:8px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill{padding:8px;font-size:small;border-radius:24px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill.badge-small{font-size:x-small;padding:4px}`]
            },] },
];
/** @nocollapse */
DecListTabsFilterComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router }
];
DecListTabsFilterComponent.propDecorators = {
    filters: [{ type: Input }],
    countEndpoint: [{ type: Input }],
    search: [{ type: Output, args: ['search',] }],
    tabChange: [{ type: Output, args: ['tabChange',] }]
};
function DecListTabsFilterComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecListTabsFilterComponent.prototype.selectedTabUid;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.name;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.countReport;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.service;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.customFetchMethod;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.defaultTab;
    /** @type {?} */
    DecListTabsFilterComponent.prototype._filters;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.wathUrlSubscription;
    /** @type {?} */
    DecListTabsFilterComponent.prototype._countEndpoint;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.search;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.tabChange;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.doFirstLoad;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.onSearch;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.route;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC10YWJzLWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LXRhYnMtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFFakUsT0FBTyxFQUFzQixpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBc0J6RSxNQUFNOzs7OztJQThESixZQUFvQixLQUFxQixFQUNyQjtRQURBLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNO3dCQWxDYyxFQUFFO3NCQTZCSSxJQUFJLFlBQVksRUFBTzt5QkFFakIsSUFBSSxZQUFZLEVBQU87MkJBUzdELEdBQUcsRUFBRTtZQUNqQixVQUFVLENBQUMsR0FBRyxFQUFFOztnQkFDZCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1A7d0JBdURrQixDQUFDLEdBQUcsRUFBRSxPQUFPLEdBQUcsS0FBSyxFQUFFLEVBQUU7WUFFMUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7WUFFMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRWpCLHVCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBRWxFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxD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QUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Ozs7O0lBRzlGLGtCQUFrQjtRQUV4QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO2FBQ2hELFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBRXBCLHVCQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO1lBRS9ELEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFFaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFFMUI7U0FFRixDQUFDLENBQUM7Ozs7O0lBSUcseUJBQXlCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hDOzs7O1lBNU1KLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztDQWVYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLDhYQUE4WCxDQUFDO2FBQ3pZOzs7O1lBdkJRLGNBQWM7WUFBRSxNQUFNOzs7c0JBb0M1QixLQUFLOzRCQTZCTCxLQUFLO3FCQWlCTCxNQUFNLFNBQUMsUUFBUTt3QkFFZixNQUFNLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0xpc3RGZXRjaE1ldGhvZCwgRGVjTGlzdFRhYnNGaWx0ZXIgfSBmcm9tICcuLy4uL2xpc3QubW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtdGFicy1maWx0ZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJsaXN0LXRhYnMtZmlsdGVyLXdyYXBwZXJcIiAqbmdJZj1cInZpc2libGVGaWx0ZXJzIGFzIGZpbHRlcnNcIj5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwiZGVjLXRhYi1oZWFkZXJcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCB0YWJGaWx0ZXIgb2YgZmlsdGVyc1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgKmRlY1Blcm1pc3Npb249XCJ0YWJGaWx0ZXIucGVybWlzc2lvbnNcIlxuICAgICAgICAgICAgICBtYXQtYnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzPVwidXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFRhYih0YWJGaWx0ZXIudWlkKVwiXG4gICAgICAgICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJzZWxlY3RlZFRhYlVpZCA9PSAodGFiRmlsdGVyLnVpZClcIj5cbiAgICAgICAgPHNwYW4+e3sgJ2xhYmVsLicgKyB0YWJGaWx0ZXIubGFiZWwgfCB0cmFuc2xhdGUgfCB1cHBlcmNhc2UgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwidGFiRmlsdGVyLmNvdW50ICYmIGNvdW50RW5kcG9pbnQgJiYgY291bnRSZXBvcnRcIiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2Utc21hbGxcIj57eyBnZXRDb3VudE9mKHRhYkZpbHRlci5jb3VudCkgfX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubGlzdC10YWJzLWZpbHRlci13cmFwcGVye21hcmdpbi10b3A6OHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyLmJvdHRvbXtib3JkZXItYm90dG9tOjB9Lmxpc3QtdGFicy1maWx0ZXItd3JhcHBlciAuZGVjLXRhYi1oZWFkZXIgLmJhZGdle21hcmdpbi1sZWZ0OjhweH0ubGlzdC10YWJzLWZpbHRlci13cmFwcGVyIC5kZWMtdGFiLWhlYWRlciAuYmFkZ2UuYmFkZ2UtcGlsbHtwYWRkaW5nOjhweDtmb250LXNpemU6c21hbGw7Ym9yZGVyLXJhZGl1czoyNHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyIC5iYWRnZS5iYWRnZS1waWxsLmJhZGdlLXNtYWxse2ZvbnQtc2l6ZTp4LXNtYWxsO3BhZGRpbmc6NHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBzZWxlY3RlZFRhYlVpZDogc3RyaW5nO1xuXG4gIG5hbWU6IHN0cmluZzsgLy8gbGlzdCB1bmlxdWUgbmFtZSB0byBpZGVudGlmeSB0aGUgdGFiIGluIHVybFxuXG4gIGNvdW50UmVwb3J0OiBhbnk7XG5cbiAgc2VydmljZTogYW55O1xuXG4gIGN1c3RvbUZldGNoTWV0aG9kOiBEZWNMaXN0RmV0Y2hNZXRob2Q7XG5cbiAgQElucHV0KClcbiAgc2V0IGZpbHRlcnModjogRGVjTGlzdFRhYnNGaWx0ZXJbXSkge1xuXG4gICAgaWYgKHRoaXMuX2ZpbHRlcnMgIT09IHYpIHtcblxuICAgICAgdGhpcy5fZmlsdGVycyA9IHYubWFwKGZpbHRlciA9PiBuZXcgRGVjTGlzdFRhYnNGaWx0ZXIoZmlsdGVyKSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBmaWx0ZXJzKCk6IERlY0xpc3RUYWJzRmlsdGVyW10ge1xuICAgIHJldHVybiB0aGlzLl9maWx0ZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWZhdWx0VGFiOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfZmlsdGVyczogRGVjTGlzdFRhYnNGaWx0ZXJbXSA9IFtdO1xuXG4gIHByaXZhdGUgd2F0aFVybFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgX2NvdW50RW5kcG9pbnQ6IHN0cmluZztcblxuXG4gIC8qXG4gICAqIGNvdW50RW5kcG9pbnRcbiAgICpcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBjb3VudEVuZHBvaW50KHY6IHN0cmluZykge1xuXG4gICAgaWYgKHRoaXMuX2NvdW50RW5kcG9pbnQgIT09IHYpIHtcblxuICAgICAgdGhpcy5fY291bnRFbmRwb2ludCA9ICh2WzBdICYmIHZbMF0gPT09ICcvJykgPyB2LnJlcGxhY2UoJy8nLCAnJykgOiB2O1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgY291bnRFbmRwb2ludCgpOiBzdHJpbmcge1xuXG4gICAgcmV0dXJuIHRoaXMuX2NvdW50RW5kcG9pbnQ7XG5cbiAgfVxuXG4gIEBPdXRwdXQoJ3NlYXJjaCcpIHNlYXJjaDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCd0YWJDaGFuZ2UnKSB0YWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgZG9GaXJzdExvYWQgPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIHdhaXQgZm9yIHRoZSB1cmwgdG8gY2hhbmdlIGJlZm9yZSBkb2luZyB0aGUgZmlyc3QgbG9hZFxuICAgICAgdGhpcy53YXRjaFRhYkluVXJsUXVlcnkoKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGdldENvdW50T2YoY291bnQ6IHN0cmluZyB8IEZ1bmN0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBjb3VudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvdW50UmVwb3J0ICYmIHRoaXMuY291bnRSZXBvcnRbY291bnRdID49IDAgPyB0aGlzLmNvdW50UmVwb3J0W2NvdW50XSA6ICc/JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY291bnRSZXBvcnQgJiYgY291bnQodGhpcy5jb3VudFJlcG9ydCkgPj0gMCA/IGNvdW50KHRoaXMuY291bnRSZXBvcnQpIDogJz8nO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFRhYih0YWIpIHtcbiAgICB0aGlzLnNldFRhYkluVXJsUXVlcnkodGFiKTtcbiAgfVxuXG4gIHJlbG9hZENvdW50UmVwb3J0KHBheWxvYWQpIHtcblxuICAgIGlmICh0aGlzLmNvdW50RW5kcG9pbnQpIHtcbiAgICAgIGNvbnN0IGZldGNoTWV0aG9kID0gdGhpcy5jdXN0b21GZXRjaE1ldGhvZCB8fCB0aGlzLnNlcnZpY2UuZ2V0O1xuICAgICAgZmV0Y2hNZXRob2QodGhpcy5jb3VudEVuZHBvaW50LCBwYXlsb2FkKVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLmNvdW50UmVwb3J0ID0gcmVzO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0ZWRUYWIoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5maWx0ZXJzID8gdGhpcy5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci51aWQgPT09IHRoaXMuc2VsZWN0ZWRUYWJVaWQpIDogdW5kZWZpbmVkO1xuXG4gIH1cblxuICBnZXQgdmlzaWJsZUZpbHRlcnMoKSB7XG4gICAgY29uc3QgdmlzaWJsZSA9IHRoaXMuZmlsdGVycyA/IHRoaXMuZmlsdGVycy5maWx0ZXIoKGZpbHRlcikgPT4gIWZpbHRlci5oaWRlKSA6IFtdO1xuICAgIHJldHVybiAodmlzaWJsZSAmJiB2aXNpYmxlLmxlbmd0aCA+IDEpID8gdmlzaWJsZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0RGVmYXVsdFRhYigpIHtcblxuICAgIGNvbnN0IGhhc0RlZmF1bHQ6IGFueSA9IHRoaXMuZmlsdGVycy5maW5kKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5kZWZhdWx0O1xuICAgIH0pO1xuXG4gICAgaWYgKGhhc0RlZmF1bHQpIHtcblxuICAgICAgdGhpcy5kZWZhdWx0VGFiID0gaGFzRGVmYXVsdC51aWQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmRlZmF1bHRUYWIgPSB0aGlzLmZpbHRlcnNbMF0udWlkO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIG9uU2VhcmNoID0gKHVpZCwgcmVjb3VudCA9IGZhbHNlKSA9PiB7XG5cbiAgICB0aGlzLnNlbGVjdGVkVGFiVWlkID0gdWlkO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVycykge1xuXG4gICAgICBjb25zdCBmaWx0ZXJUYWIgPSB0aGlzLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnVpZCA9PT0gdWlkKTtcblxuICAgICAgaWYgKGZpbHRlclRhYikge1xuXG4gICAgICAgIHRoaXMuc2VhcmNoLmVtaXQoe1xuICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclRhYi5maWx0ZXJzLFxuICAgICAgICAgIHJlY291bnQ6IHJlY291bnRcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuXG4gIH1cblxuICBwcml2YXRlIGNvbXBvbmVudFRhYk5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICctdGFiJztcbiAgfVxuXG4gIHByaXZhdGUgc2V0VGFiSW5VcmxRdWVyeSh0YWIpIHtcbiAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG4gICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldID0gdGFiO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLiddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcywgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJJblVybFF1ZXJ5KCkge1xuXG4gICAgdGhpcy5kZXRlY3REZWZhdWx0VGFiKCk7XG5cbiAgICB0aGlzLndhdGhVcmxTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG5cbiAgICAgIGNvbnN0IHRhYiA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0gfHwgdGhpcy5kZWZhdWx0VGFiO1xuXG4gICAgICBpZiAodGFiICE9PSB0aGlzLnNlbGVjdGVkVGFiVWlkKSB7XG5cbiAgICAgICAgdGhpcy5vblNlYXJjaCh0YWIpO1xuXG4gICAgICAgIHRoaXMudGFiQ2hhbmdlLmVtaXQodGFiKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpIHtcbiAgICBpZiAodGhpcy53YXRoVXJsU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLndhdGhVcmxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxufVxuIl19