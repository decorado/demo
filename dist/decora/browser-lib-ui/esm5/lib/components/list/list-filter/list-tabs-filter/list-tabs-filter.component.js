/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecListFilter } from './../../list.models';
var DecListTabsFilterComponent = /** @class */ (function () {
    function DecListTabsFilterComponent(route, router) {
        var _this = this;
        this.route = route;
        this.router = router;
        this._filters = [];
        this.search = new EventEmitter();
        this.tabChange = new EventEmitter();
        this.doFirstLoad = function () {
            setTimeout(function () {
                // avoids ExpressionChangedAfterItHasBeenCheckedError selecting the active tab
                _this.watchTabInUrlQuery();
            }, 0);
        };
        this.onSearch = function (tab, recount) {
            if (recount === void 0) { recount = false; }
            _this.selectedTabUid = tab.uid;
            if (_this.filters && tab) {
                /** @type {?} */
                var event_1 = {
                    filters: tab.filters,
                    children: tab.children,
                    recount: recount,
                };
                _this.search.emit(event_1);
            }
        };
    }
    Object.defineProperty(DecListTabsFilterComponent.prototype, "filters", {
        get: /**
         * @return {?}
         */
        function () {
            return this._filters;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._filters !== v) {
                this._filters = v ? v.map(function (filter) { return new DecListFilter(filter); }) : [];
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stopWatchingTabInUrlQuery();
    };
    /**
     * @param {?} uid
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.getCountOf = /**
     * @param {?} uid
     * @return {?}
     */
    function (uid) {
        return this.countReport && this.countReport[uid] >= 0 ? this.countReport[uid] : '?';
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.selectTab = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.setTabInUrlQuery(tab);
    };
    Object.defineProperty(DecListTabsFilterComponent.prototype, "selectedTab", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.filters ? this.filters.find(function (filter) { return filter.uid === _this.selectedTabUid; }) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecListTabsFilterComponent.prototype, "visibleFilters", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var visible = this.filters ? this.filters.filter(function (filter) { return !filter.hide; }) : [];
            return (visible && visible.length > 1) ? visible : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.detectDefaultTab = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var hasDefault = this.filters.find(function (item) {
            return item.default;
        });
        if (hasDefault) {
            this.defaultTab = hasDefault.uid;
        }
        else {
            this.defaultTab = this.filters[0].uid;
        }
    };
    /**
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.componentTabName = /**
     * @return {?}
     */
    function () {
        return this.name + '-tab';
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.setTabInUrlQuery = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        /** @type {?} */
        var queryParams = Object.assign({}, this.route.snapshot.queryParams);
        queryParams[this.componentTabName()] = tab;
        this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
    };
    /**
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.watchTabInUrlQuery = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.detectDefaultTab();
        this.wathUrlSubscription = this.route.queryParams
            .subscribe(function (params) {
            /** @type {?} */
            var tab = params[_this.componentTabName()] || _this.defaultTab;
            if (tab !== _this.selectedTabUid) {
                /** @type {?} */
                var selectedTab = _this.filters.find(function (filter) { return filter.uid === tab; });
                _this.onSearch(selectedTab);
                _this.tabChange.emit(tab);
            }
        });
    };
    /**
     * @return {?}
     */
    DecListTabsFilterComponent.prototype.stopWatchingTabInUrlQuery = /**
     * @return {?}
     */
    function () {
        if (this.wathUrlSubscription) {
            this.wathUrlSubscription.unsubscribe();
        }
    };
    DecListTabsFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-list-tabs-filter',
                    template: "<div class=\"list-tabs-filter-wrapper\" *ngIf=\"visibleFilters as filters\">\n  <div fxLayout=\"row\" class=\"dec-tab-header\">\n    <ng-container *ngFor=\"let tabFilter of filters\">\n      <button type=\"button\"\n              *decPermission=\"tabFilter.permissions\"\n              mat-button\n              class=\"uppercase\"\n              (click)=\"selectTab(tabFilter.uid)\"\n              [class.selected]=\"selectedTabUid == (tabFilter.uid)\">\n        <span>{{ 'label.' + tabFilter.label | translate | uppercase }}</span>\n        <span *ngIf=\"countReport\" class=\"badge badge-pill badge-small\">{{ countReport[tabFilter.uid].count }}</span>\n      </button>\n    </ng-container>\n  </div>\n</div>\n",
                    styles: [".list-tabs-filter-wrapper{margin-top:8px}.list-tabs-filter-wrapper .dec-tab-header.bottom{border-bottom:0}.list-tabs-filter-wrapper .dec-tab-header .badge{margin-left:8px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill{padding:8px;font-size:small;border-radius:24px}.list-tabs-filter-wrapper .dec-tab-header .badge.badge-pill.badge-small{font-size:x-small;padding:4px}"]
                },] },
    ];
    /** @nocollapse */
    DecListTabsFilterComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    DecListTabsFilterComponent.propDecorators = {
        countReport: [{ type: Input }],
        filters: [{ type: Input }],
        search: [{ type: Output, args: ['search',] }],
        tabChange: [{ type: Output, args: ['tabChange',] }]
    };
    return DecListTabsFilterComponent;
}());
export { DecListTabsFilterComponent };
if (false) {
    /** @type {?} */
    DecListTabsFilterComponent.prototype.customFetchMethod;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.name;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.selectedTabUid;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.service;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.countReport;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.defaultTab;
    /** @type {?} */
    DecListTabsFilterComponent.prototype._filters;
    /** @type {?} */
    DecListTabsFilterComponent.prototype.wathUrlSubscription;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC10YWJzLWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0LWZpbHRlci9saXN0LXRhYnMtZmlsdGVyL2xpc3QtdGFicy1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFFakUsT0FBTyxFQUFzQixhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUF1RHRFLG9DQUNVLE9BQ0E7UUFGVixpQkFHSztRQUZLLFVBQUssR0FBTCxLQUFLO1FBQ0wsV0FBTSxHQUFOLE1BQU07d0JBVm9CLEVBQUU7c0JBSVEsSUFBSSxZQUFZLEVBQU87eUJBRWpCLElBQUksWUFBWSxFQUFPOzJCQVc3RDtZQUNaLFVBQVUsQ0FBQzs7Z0JBQ1QsS0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDM0IsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNQO3dCQXVDa0IsVUFBQyxHQUFHLEVBQUUsT0FBZTtZQUFmLHdCQUFBLEVBQUEsZUFBZTtZQUV0QyxLQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFFOUIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDOztnQkFFeEIsSUFBTSxPQUFLLEdBQUc7b0JBQ1osT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO29CQUNwQixRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7b0JBQ3RCLE9BQU8sRUFBRSxPQUFPO2lCQUNqQixDQUFDO2dCQUVGLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFB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S0FBSzswQkFFTCxLQUFLO3lCQWlCTCxNQUFNLFNBQUMsUUFBUTs0QkFFZixNQUFNLFNBQUMsV0FBVzs7cUNBeERyQjs7U0F5QmEsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjTGlzdEZldGNoTWV0aG9kLCBEZWNMaXN0RmlsdGVyIH0gZnJvbSAnLi8uLi8uLi9saXN0Lm1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1saXN0LXRhYnMtZmlsdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGlzdC10YWJzLWZpbHRlci13cmFwcGVyXCIgKm5nSWY9XCJ2aXNpYmxlRmlsdGVycyBhcyBmaWx0ZXJzXCI+XG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cImRlYy10YWItaGVhZGVyXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdGFiRmlsdGVyIG9mIGZpbHRlcnNcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICpkZWNQZXJtaXNzaW9uPVwidGFiRmlsdGVyLnBlcm1pc3Npb25zXCJcbiAgICAgICAgICAgICAgbWF0LWJ1dHRvblxuICAgICAgICAgICAgICBjbGFzcz1cInVwcGVyY2FzZVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RUYWIodGFiRmlsdGVyLnVpZClcIlxuICAgICAgICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwic2VsZWN0ZWRUYWJVaWQgPT0gKHRhYkZpbHRlci51aWQpXCI+XG4gICAgICAgIDxzcGFuPnt7ICdsYWJlbC4nICsgdGFiRmlsdGVyLmxhYmVsIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImNvdW50UmVwb3J0XCIgY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLXNtYWxsXCI+e3sgY291bnRSZXBvcnRbdGFiRmlsdGVyLnVpZF0uY291bnQgfX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubGlzdC10YWJzLWZpbHRlci13cmFwcGVye21hcmdpbi10b3A6OHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyLmJvdHRvbXtib3JkZXItYm90dG9tOjB9Lmxpc3QtdGFicy1maWx0ZXItd3JhcHBlciAuZGVjLXRhYi1oZWFkZXIgLmJhZGdle21hcmdpbi1sZWZ0OjhweH0ubGlzdC10YWJzLWZpbHRlci13cmFwcGVyIC5kZWMtdGFiLWhlYWRlciAuYmFkZ2UuYmFkZ2UtcGlsbHtwYWRkaW5nOjhweDtmb250LXNpemU6c21hbGw7Ym9yZGVyLXJhZGl1czoyNHB4fS5saXN0LXRhYnMtZmlsdGVyLXdyYXBwZXIgLmRlYy10YWItaGVhZGVyIC5iYWRnZS5iYWRnZS1waWxsLmJhZGdlLXNtYWxse2ZvbnQtc2l6ZTp4LXNtYWxsO3BhZGRpbmc6NHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RUYWJzRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBjdXN0b21GZXRjaE1ldGhvZDogRGVjTGlzdEZldGNoTWV0aG9kO1xuXG4gIG5hbWU6IHN0cmluZzsgLy8gbGlzdCB1bmlxdWUgbmFtZSB0byBpZGVudGlmeSB0aGUgdGFiIGluIHVybFxuXG4gIHNlbGVjdGVkVGFiVWlkOiBzdHJpbmc7XG5cbiAgc2VydmljZTogYW55O1xuXG4gIEBJbnB1dCgpIGNvdW50UmVwb3J0OiBhbnk7XG5cbiAgQElucHV0KClcbiAgc2V0IGZpbHRlcnModjogRGVjTGlzdEZpbHRlcltdKSB7XG4gICAgaWYgKHRoaXMuX2ZpbHRlcnMgIT09IHYpIHtcbiAgICAgIHRoaXMuX2ZpbHRlcnMgPSB2ID8gdi5tYXAoZmlsdGVyID0+IG5ldyBEZWNMaXN0RmlsdGVyKGZpbHRlcikpIDogW107XG4gICAgfVxuICB9XG5cbiAgZ2V0IGZpbHRlcnMoKTogRGVjTGlzdEZpbHRlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVycztcbiAgfVxuXG4gIHByaXZhdGUgZGVmYXVsdFRhYjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2ZpbHRlcnM6IERlY0xpc3RGaWx0ZXJbXSA9IFtdO1xuXG4gIHByaXZhdGUgd2F0aFVybFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIEBPdXRwdXQoJ3NlYXJjaCcpIHNlYXJjaDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCd0YWJDaGFuZ2UnKSB0YWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHsgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgZG9GaXJzdExvYWQgPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGF2b2lkcyBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yIHNlbGVjdGluZyB0aGUgYWN0aXZlIHRhYlxuICAgICAgdGhpcy53YXRjaFRhYkluVXJsUXVlcnkoKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGdldENvdW50T2YodWlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudFJlcG9ydCAmJiB0aGlzLmNvdW50UmVwb3J0W3VpZF0gPj0gMCA/IHRoaXMuY291bnRSZXBvcnRbdWlkXSA6ICc/JztcbiAgfVxuXG4gIHNlbGVjdFRhYih0YWIpIHtcbiAgICB0aGlzLnNldFRhYkluVXJsUXVlcnkodGFiKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZFRhYigpIHtcblxuICAgIHJldHVybiB0aGlzLmZpbHRlcnMgPyB0aGlzLmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLnVpZCA9PT0gdGhpcy5zZWxlY3RlZFRhYlVpZCkgOiB1bmRlZmluZWQ7XG5cbiAgfVxuXG4gIGdldCB2aXNpYmxlRmlsdGVycygpIHtcbiAgICBjb25zdCB2aXNpYmxlID0gdGhpcy5maWx0ZXJzID8gdGhpcy5maWx0ZXJzLmZpbHRlcigoZmlsdGVyKSA9PiAhZmlsdGVyLmhpZGUpIDogW107XG4gICAgcmV0dXJuICh2aXNpYmxlICYmIHZpc2libGUubGVuZ3RoID4gMSkgPyB2aXNpYmxlIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3REZWZhdWx0VGFiKCkge1xuXG4gICAgY29uc3QgaGFzRGVmYXVsdDogYW55ID0gdGhpcy5maWx0ZXJzLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiBpdGVtLmRlZmF1bHQ7XG4gICAgfSk7XG5cbiAgICBpZiAoaGFzRGVmYXVsdCkge1xuXG4gICAgICB0aGlzLmRlZmF1bHRUYWIgPSBoYXNEZWZhdWx0LnVpZDtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuZGVmYXVsdFRhYiA9IHRoaXMuZmlsdGVyc1swXS51aWQ7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgb25TZWFyY2ggPSAodGFiLCByZWNvdW50ID0gZmFsc2UpID0+IHtcblxuICAgIHRoaXMuc2VsZWN0ZWRUYWJVaWQgPSB0YWIudWlkO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVycyAmJiB0YWIpIHtcblxuICAgICAgY29uc3QgZXZlbnQgPSB7XG4gICAgICAgIGZpbHRlcnM6IHRhYi5maWx0ZXJzLFxuICAgICAgICBjaGlsZHJlbjogdGFiLmNoaWxkcmVuLFxuICAgICAgICByZWNvdW50OiByZWNvdW50LFxuICAgICAgfTtcblxuICAgICAgdGhpcy5zZWFyY2guZW1pdChldmVudCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgY29tcG9uZW50VGFiTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy10YWInO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUYWJJblVybFF1ZXJ5KHRhYikge1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgICBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0gPSB0YWI7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB3YXRjaFRhYkluVXJsUXVlcnkoKSB7XG5cbiAgICB0aGlzLmRldGVjdERlZmF1bHRUYWIoKTtcblxuICAgIHRoaXMud2F0aFVybFN1YnNjcmlwdGlvbiA9IHRoaXMucm91dGUucXVlcnlQYXJhbXNcbiAgICAgIC5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhYiA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0gfHwgdGhpcy5kZWZhdWx0VGFiO1xuXG4gICAgICAgIGlmICh0YWIgIT09IHRoaXMuc2VsZWN0ZWRUYWJVaWQpIHtcblxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGFiID0gdGhpcy5maWx0ZXJzLmZpbmQoZmlsdGVyID0+IGZpbHRlci51aWQgPT09IHRhYik7XG5cbiAgICAgICAgICB0aGlzLm9uU2VhcmNoKHNlbGVjdGVkVGFiKTtcblxuICAgICAgICAgIHRoaXMudGFiQ2hhbmdlLmVtaXQodGFiKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYkluVXJsUXVlcnkoKSB7XG4gICAgaWYgKHRoaXMud2F0aFVybFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy53YXRoVXJsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==