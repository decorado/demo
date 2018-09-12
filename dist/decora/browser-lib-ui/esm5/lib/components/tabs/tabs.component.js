/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ContentChildren, QueryList, ContentChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecTabComponent } from './tab/tab.component';
import { DecTabMenuComponent } from './tab-menu/tab-menu.component';
var DecTabsComponent = /** @class */ (function () {
    function DecTabsComponent(route, router) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.persist = true;
        this.destroyOnBlur = false;
        this.padding = true;
        this.activeTabChange = new EventEmitter();
        this.activatedTabs = {};
        this.pathFromRoot = '';
        this.ensureUniqueName = function () {
            if (!_this.name) {
                throw new Error('DecTabComponentError: The tab component must have an unique name. Please, ensure that you have passed an unique namme to the component.');
            }
        };
        this.ensureUniqueTabNames = function () {
            return new Promise(function (res, rej) {
                /** @type {?} */
                var names = {};
                _this.tabs.toArray().forEach(function (tab) {
                    if (!names[tab.name]) {
                        names[tab.name] = true;
                    }
                    else {
                        throw new Error("DecTabComponentError: The <dec-tabs> component must have an unique name. The name " + tab.name + " was used more than once.");
                    }
                });
                res();
            });
        };
        this.selectTab = function (tabName) {
            if (_this.tabs) {
                _this.activeTab = tabName;
                _this.activatedTabs[tabName] = true;
                _this._activeTabObject = _this.tabs.toArray().filter(function (tab) { return tab.name === tabName; })[0];
                _this._activeTabIndex = _this.tabs.toArray().indexOf(_this._activeTabObject);
                _this.activeTabChange.emit(tabName);
            }
        };
    }
    Object.defineProperty(DecTabsComponent.prototype, "activeTab", {
        get: /**
         * @return {?}
         */
        function () {
            return this._activeTab;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v && this._activeTab !== v) {
                this._activeTab = v;
                this.persistTab(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecTabsComponent.prototype, "activeTabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._activeTabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecTabsComponent.prototype, "activeTabObject", {
        get: /**
         * @return {?}
         */
        function () {
            return this._activeTabObject;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.ensureUniqueName();
        this.watchTabInUrlQuery();
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ensureUniqueTabNames()
            .then(function () {
            /** @type {?} */
            var queryParams = Object.assign({}, _this.route.snapshot.queryParams);
            if (queryParams && queryParams[_this.componentTabName()]) {
                /** @type {?} */
                var currentTab = queryParams[_this.componentTabName()];
                _this.selectTab(currentTab);
            }
            else {
                _this.startSelectedTab();
            }
        });
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stopWatchingTabInUrlQuery();
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    DecTabsComponent.prototype.shouldTabBeDisplayed = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        /** @type {?} */
        var isSelected = this._activeTabObject === tab;
        /** @type {?} */
        var isActivated = this.activatedTabs[tab.name];
        return isSelected || (!this.destroyOnBlur && isActivated);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecTabsComponent.prototype.onChangeTab = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var activeTabObject = this.tabs.toArray()[$event.index];
        this.activeTab = activeTabObject.name;
    };
    /**
     * @param {?} total
     * @return {?}
     */
    DecTabsComponent.prototype.parseTotal = /**
     * @param {?} total
     * @return {?}
     */
    function (total) {
        return total !== null && total >= 0 ? total : '?';
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.hidden = true;
        setTimeout(function () {
            _this.hidden = false;
        }, 10);
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.componentTabName = /**
     * @return {?}
     */
    function () {
        return this.name + '-tab';
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    DecTabsComponent.prototype.persistTab = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        if (this.persist) {
            /** @type {?} */
            var queryParams = Object.assign({}, this.route.snapshot.queryParams);
            queryParams[this.componentTabName()] = tab;
            this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
        }
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.startSelectedTab = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var activeTab = this.activeTab || this.tabs.toArray()[0].name;
        setTimeout(function () {
            // avoid change after component checked error
            _this.selectTab(activeTab);
        }, 1);
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.watchTabInUrlQuery = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.queryParamsSubscription = this.route.queryParams
            .subscribe(function (params) {
            /** @type {?} */
            var tab = params[_this.componentTabName()];
            _this.selectTab(tab);
        });
    };
    /**
     * @return {?}
     */
    DecTabsComponent.prototype.stopWatchingTabInUrlQuery = /**
     * @return {?}
     */
    function () {
        this.queryParamsSubscription.unsubscribe();
    };
    DecTabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-tabs',
                    template: "<div *ngIf=\"!hidden\">\n\n  <!-- TABS -->\n  <mat-tab-group [selectedIndex]=\"activeTabIndex\" (focusChange)=\"onChangeTab($event)\" [dynamicHeight]=\"true\">\n\n    <!-- TAB -->\n    <mat-tab *ngFor=\"let tab of tabs;\" [disabled]=\"tab.disabled\">\n\n      <!-- TAB LABEL -->\n      <ng-template mat-tab-label>\n        {{ tab.label }}\n        <span class=\"badge badge-pill badge-small\" *ngIf=\"tab.total >= 0\">{{ parseTotal(tab.total) }}</span>\n      </ng-template>\n\n      <!-- TAB CONTENT WRAPPER -->\n      <ng-container *ngIf=\"shouldTabBeDisplayed(tab)\">\n\n        <!-- TAB MENU -->\n        <div *ngIf=\"tabMenuComponent\" class=\"menu-wrapper\">\n          <ng-container *ngTemplateOutlet=\"tabMenuComponent.content; context: { activeTab: activeTab }\"></ng-container>\n        </div>\n\n        <!-- TABS CONTENT -->\n        <div [ngClass]=\"{'tab-padding': padding}\">\n\n          <ng-container *ngTemplateOutlet=\"tab.content\"></ng-container>\n\n        </div>\n\n      </ng-container>\n\n    </mat-tab>\n\n  </mat-tab-group>\n\n</div>\n",
                    styles: [".menu-wrapper{text-align:right;padding:8px 0}.tab-padding{padding:16px 0}"]
                },] },
    ];
    /** @nocollapse */
    DecTabsComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    DecTabsComponent.propDecorators = {
        tabs: [{ type: ContentChildren, args: [DecTabComponent,] }],
        tabMenuComponent: [{ type: ContentChild, args: [DecTabMenuComponent,] }],
        hidden: [{ type: Input }],
        persist: [{ type: Input }],
        destroyOnBlur: [{ type: Input }],
        name: [{ type: Input }],
        padding: [{ type: Input }],
        activeTab: [{ type: Input }],
        activeTabChange: [{ type: Output }]
    };
    return DecTabsComponent;
}());
export { DecTabsComponent };
if (false) {
    /** @type {?} */
    DecTabsComponent.prototype.tabs;
    /** @type {?} */
    DecTabsComponent.prototype.tabMenuComponent;
    /** @type {?} */
    DecTabsComponent.prototype.hidden;
    /** @type {?} */
    DecTabsComponent.prototype.persist;
    /** @type {?} */
    DecTabsComponent.prototype.destroyOnBlur;
    /** @type {?} */
    DecTabsComponent.prototype.name;
    /** @type {?} */
    DecTabsComponent.prototype.padding;
    /** @type {?} */
    DecTabsComponent.prototype.activeTabChange;
    /** @type {?} */
    DecTabsComponent.prototype._activeTab;
    /** @type {?} */
    DecTabsComponent.prototype._activeTabIndex;
    /** @type {?} */
    DecTabsComponent.prototype._activeTabObject;
    /** @type {?} */
    DecTabsComponent.prototype.activatedTabs;
    /** @type {?} */
    DecTabsComponent.prototype.queryParamsSubscription;
    /** @type {?} */
    DecTabsComponent.prototype.pathFromRoot;
    /** @type {?} */
    DecTabsComponent.prototype.ensureUniqueName;
    /** @type {?} */
    DecTabsComponent.prototype.ensureUniqueTabNames;
    /** @type {?} */
    DecTabsComponent.prototype.selectTab;
    /** @type {?} */
    DecTabsComponent.prototype.route;
    /** @type {?} */
    DecTabsComponent.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvdGFicy90YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5KLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDOztJQTRGbEUsMEJBQW9CLEtBQXFCLEVBQVUsTUFBYztRQUFqRSxpQkFBcUU7UUFBakQsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO3VCQXpDOUMsSUFBSTs2QkFFRSxLQUFLO3VCQUlYLElBQUk7K0JBYTJCLElBQUksWUFBWSxFQUFVOzZCQWdCL0MsRUFBRTs0QkFJUixFQUFFO2dDQTRERTtZQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMseUlBQXlJLENBQUMsQ0FBQzthQUM1SjtTQUNGO29DQU84QjtZQUM3QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQU0sVUFBQyxHQUFHLEVBQUUsR0FBRzs7Z0JBQy9CLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO29CQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMs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MUVUOztTQStDYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERlY1RhYkNvbXBvbmVudCB9IGZyb20gJy4vdGFiL3RhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjVGFiTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGFiLW1lbnUvdGFiLW1lbnUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXRhYnMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCIhaGlkZGVuXCI+XG5cbiAgPCEtLSBUQUJTIC0tPlxuICA8bWF0LXRhYi1ncm91cCBbc2VsZWN0ZWRJbmRleF09XCJhY3RpdmVUYWJJbmRleFwiIChmb2N1c0NoYW5nZSk9XCJvbkNoYW5nZVRhYigkZXZlbnQpXCIgW2R5bmFtaWNIZWlnaHRdPVwidHJ1ZVwiPlxuXG4gICAgPCEtLSBUQUIgLS0+XG4gICAgPG1hdC10YWIgKm5nRm9yPVwibGV0IHRhYiBvZiB0YWJzO1wiIFtkaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIj5cblxuICAgICAgPCEtLSBUQUIgTEFCRUwgLS0+XG4gICAgICA8bmctdGVtcGxhdGUgbWF0LXRhYi1sYWJlbD5cbiAgICAgICAge3sgdGFiLmxhYmVsIH19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1zbWFsbFwiICpuZ0lmPVwidGFiLnRvdGFsID49IDBcIj57eyBwYXJzZVRvdGFsKHRhYi50b3RhbCkgfX08L3NwYW4+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICA8IS0tIFRBQiBDT05URU5UIFdSQVBQRVIgLS0+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvdWxkVGFiQmVEaXNwbGF5ZWQodGFiKVwiPlxuXG4gICAgICAgIDwhLS0gVEFCIE1FTlUgLS0+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0YWJNZW51Q29tcG9uZW50XCIgY2xhc3M9XCJtZW51LXdyYXBwZXJcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiTWVudUNvbXBvbmVudC5jb250ZW50OyBjb250ZXh0OiB7IGFjdGl2ZVRhYjogYWN0aXZlVGFiIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBUQUJTIENPTlRFTlQgLS0+XG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd0YWItcGFkZGluZyc6IHBhZGRpbmd9XCI+XG5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8L21hdC10YWI+XG5cbiAgPC9tYXQtdGFiLWdyb3VwPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubWVudS13cmFwcGVye3RleHQtYWxpZ246cmlnaHQ7cGFkZGluZzo4cHggMH0udGFiLXBhZGRpbmd7cGFkZGluZzoxNnB4IDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBAQ29udGVudENoaWxkcmVuKERlY1RhYkNvbXBvbmVudCkgdGFiczogUXVlcnlMaXN0PERlY1RhYkNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZChEZWNUYWJNZW51Q29tcG9uZW50KSB0YWJNZW51Q29tcG9uZW50OiBEZWNUYWJNZW51Q29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIGhpZGRlbjsgLy8gaGlkZXMgdGhlIHRhYnMgZ3JvdXAgdG8gcmVsb2FkIGl0cyBjb250ZW50c1xuXG4gIEBJbnB1dCgpIHBlcnNpc3QgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkJsdXIgPSBmYWxzZTtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGFkZGluZyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IGFjdGl2ZVRhYih2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAmJiB0aGlzLl9hY3RpdmVUYWIgIT09IHYpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IHY7XG4gICAgICB0aGlzLnBlcnNpc3RUYWIodik7XG4gICAgfVxuICB9XG4gIGdldCBhY3RpdmVUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYjtcbiAgfVxuXG4gIEBPdXRwdXQoKSBhY3RpdmVUYWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgZ2V0IGFjdGl2ZVRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYkluZGV4O1xuICB9XG5cbiAgZ2V0IGFjdGl2ZVRhYk9iamVjdCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVUYWJPYmplY3Q7XG4gIH1cblxuICBwcml2YXRlIF9hY3RpdmVUYWI6IHN0cmluZztcblxuICBwcml2YXRlIF9hY3RpdmVUYWJJbmRleDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYk9iamVjdDogYW55O1xuXG4gIHByaXZhdGUgYWN0aXZhdGVkVGFiczogYW55ID0ge307XG5cbiAgcHJpdmF0ZSBxdWVyeVBhcmFtc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgcGF0aEZyb21Sb290ID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5lbnN1cmVVbmlxdWVOYW1lKCk7XG4gICAgdGhpcy53YXRjaFRhYkluVXJsUXVlcnkoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZVRhYk5hbWVzKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG4gICAgICBpZiAocXVlcnlQYXJhbXMgJiYgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUYWIgPSBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV07XG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKGN1cnJlbnRUYWIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGFydFNlbGVjdGVkVGFiKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgc2hvdWxkVGFiQmVEaXNwbGF5ZWQodGFiKSB7XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IHRoaXMuX2FjdGl2ZVRhYk9iamVjdCA9PT0gdGFiO1xuICAgIGNvbnN0IGlzQWN0aXZhdGVkID0gdGhpcy5hY3RpdmF0ZWRUYWJzW3RhYi5uYW1lXTtcbiAgICByZXR1cm4gaXNTZWxlY3RlZCB8fCAoIXRoaXMuZGVzdHJveU9uQmx1ciAmJiBpc0FjdGl2YXRlZCk7XG4gIH1cblxuICBvbkNoYW5nZVRhYigkZXZlbnQpIHtcbiAgICBjb25zdCBhY3RpdmVUYWJPYmplY3QgPSB0aGlzLnRhYnMudG9BcnJheSgpWyRldmVudC5pbmRleF07XG4gICAgdGhpcy5hY3RpdmVUYWIgPSBhY3RpdmVUYWJPYmplY3QubmFtZTtcbiAgfVxuXG4gIHBhcnNlVG90YWwodG90YWwpIHtcblxuICAgIHJldHVybiB0b3RhbCAhPT0gbnVsbCAmJiB0b3RhbCA+PSAwID8gIHRvdGFsIDogJz8nO1xuXG4gIH1cblxuICByZXNldCgpIHtcblxuICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuXG4gICAgfSwgMTApO1xuXG4gIH1cblxuICBwcml2YXRlIGNvbXBvbmVudFRhYk5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICctdGFiJztcbiAgfVxuXG4gIHByaXZhdGUgZW5zdXJlVW5pcXVlTmFtZSA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMubmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZWNUYWJDb21wb25lbnRFcnJvcjogVGhlIHRhYiBjb21wb25lbnQgbXVzdCBoYXZlIGFuIHVuaXF1ZSBuYW1lLiBQbGVhc2UsIGVuc3VyZSB0aGF0IHlvdSBoYXZlIHBhc3NlZCBhbiB1bmlxdWUgbmFtbWUgdG8gdGhlIGNvbXBvbmVudC4nKTtcbiAgICB9XG4gIH1cblxuICAvKiBlbnN1cmVVbmlxdWVUYWJOYW1lc1xuICAgKiBUaGlzIG1ldGhvZCBwcmV2ZW50cyB0aGUgdXNlIG9mIHRoZSBzYW1lIG5hbWUgZm9yIG1vcmUgdGhhbiBvbmUgdGFiXG4gICAqIHdoYXQgd291bGQgZW5kaW5nIHVwIGNvbmZsaWN0aW5nIHRoZSB0YWJzIGFjdGl2YXRpb24gb25jZSB0aGlzIGlzIGRvbmUgdmlhIHRhYiBuYW1lXG4gICovXG5cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVUYWJOYW1lcyA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzLCByZWopID0+IHtcbiAgICAgIGNvbnN0IG5hbWVzID0ge307XG4gICAgICB0aGlzLnRhYnMudG9BcnJheSgpLmZvckVhY2godGFiID0+IHtcbiAgICAgICAgaWYgKCFuYW1lc1t0YWIubmFtZV0pIHtcbiAgICAgICAgICBuYW1lc1t0YWIubmFtZV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYERlY1RhYkNvbXBvbmVudEVycm9yOiBUaGUgPGRlYy10YWJzPiBjb21wb25lbnQgbXVzdCBoYXZlIGFuIHVuaXF1ZSBuYW1lLiBUaGUgbmFtZSAke3RhYi5uYW1lfSB3YXMgdXNlZCBtb3JlIHRoYW4gb25jZS5gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcGVyc2lzdFRhYih0YWIpIHtcbiAgICBpZiAodGhpcy5wZXJzaXN0KSB7XG4gICAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG4gICAgICBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV0gPSB0YWI7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4nXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLCBxdWVyeVBhcmFtczogcXVlcnlQYXJhbXMsIHJlcGxhY2VVcmw6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RUYWIgPSAodGFiTmFtZSkgPT4ge1xuICAgIGlmICh0aGlzLnRhYnMpIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gdGFiTmFtZTtcbiAgICAgIHRoaXMuYWN0aXZhdGVkVGFic1t0YWJOYW1lXSA9IHRydWU7XG4gICAgICB0aGlzLl9hY3RpdmVUYWJPYmplY3QgPSB0aGlzLnRhYnMudG9BcnJheSgpLmZpbHRlcih0YWIgPT4gdGFiLm5hbWUgPT09IHRhYk5hbWUpWzBdO1xuICAgICAgdGhpcy5fYWN0aXZlVGFiSW5kZXggPSB0aGlzLnRhYnMudG9BcnJheSgpLmluZGV4T2YodGhpcy5fYWN0aXZlVGFiT2JqZWN0KTtcbiAgICAgIHRoaXMuYWN0aXZlVGFiQ2hhbmdlLmVtaXQodGFiTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFNlbGVjdGVkVGFiKCkge1xuICAgIGNvbnN0IGFjdGl2ZVRhYiA9IHRoaXMuYWN0aXZlVGFiIHx8IHRoaXMudGFicy50b0FycmF5KClbMF0ubmFtZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gYXZvaWQgY2hhbmdlIGFmdGVyIGNvbXBvbmVudCBjaGVja2VkIGVycm9yXG4gICAgICB0aGlzLnNlbGVjdFRhYihhY3RpdmVUYWIpO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSB3YXRjaFRhYkluVXJsUXVlcnkoKSB7XG4gICAgdGhpcy5xdWVyeVBhcmFtc1N1YnNjcmlwdGlvbiA9IHRoaXMucm91dGUucXVlcnlQYXJhbXNcbiAgICAuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcbiAgICAgIGNvbnN0IHRhYjogc3RyaW5nID0gcGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXTtcbiAgICAgIHRoaXMuc2VsZWN0VGFiKHRhYik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0b3BXYXRjaGluZ1RhYkluVXJsUXVlcnkoKSB7XG4gICAgdGhpcy5xdWVyeVBhcmFtc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==