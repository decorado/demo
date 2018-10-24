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
            if (_this.persist) {
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
        else {
            this.selectTab(tab);
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
            if (_this.persist) {
                /** @type {?} */
                var tab = params[_this.componentTabName()];
                _this.selectTab(tab);
            }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvdGFicy90YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5KLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDOztJQTRGbEUsMEJBQW9CLEtBQXFCLEVBQVUsTUFBYztRQUFqRSxpQkFBcUU7UUFBakQsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO3VCQXpDOUMsSUFBSTs2QkFFRSxLQUFLO3VCQUlYLElBQUk7K0JBYTJCLElBQUksWUFBWSxFQUFVOzZCQWdCL0MsRUFBRTs0QkFJUixFQUFFO2dDQThERTtZQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMseUlBQXlJLENBQUMsQ0FBQzthQUM1SjtTQUNGO29DQU84QjtZQUM3QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQU0sVUFBQyxHQUFHLEVBQUUsR0FBRzs7Z0JBQy9CLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO29CQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztxQkFDeEI7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RkFBcUYsR0FBRyxDQUFDLElBQUksOEJBQTJCLENBQUMsQ0FBQztxQkFDNUk7aUJBQ0YsQ0FBQyxDQUFDO2dCQUNILEdBQUcsRUFBRSxDQUFDO2FBQ1AsQ0FBQyxDQUFDO1NBQ0o7eUJBWW1CLFVBQUMsT0FBTztZQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxLQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztnQkFDekIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFwQixDQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLEtBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzFFLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7S0F2R29FO0lBakNyRSxzQkFDSSx1Q0FBUzs7OztRQU1iO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7Ozs7O1FBVEQsVUFDYyxDQUFTO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BCO1NBQ0Y7OztPQUFBO0lBT0Qsc0JBQUksNENBQWM7Ozs7UUFBbEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUM3Qjs7O09BQUE7SUFFRCxzQkFBSSw2Q0FBZTs7OztRQUFuQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDOUI7OztPQUFBOzs7O0lBZ0JELG1DQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQzNCOzs7O0lBRUQsMENBQWU7OztJQUFmO1FBQUEsaUJBY0M7UUFiQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7YUFDMUIsSUFBSSxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O2dCQUNqQixJQUFNLFdBQVcsR0FBVyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDL0UsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7b0JBQ3hELElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO29CQUN4RCxLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUM1QjtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDekI7YUFDRjtTQUNGLENBQUMsQ0FBQztLQUVKOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7S0FDbEM7Ozs7O0lBRUQsK0NBQW9COzs7O0lBQXBCLFVBQXFCLEdBQUc7O1FBQ3RCLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxHQUFHLENBQUM7O1FBQ2pELElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksV0FBVyxDQUFDLENBQUM7S0FDM0Q7Ozs7O0lBRUQsc0NBQVc7Ozs7SUFBWCxVQUFZLE1BQU07O1FBQ2hCLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztLQUN2Qzs7Ozs7SUFFRCxxQ0FBVTs7OztJQUFWLFVBQVcsS0FBSztRQUVkLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0tBRXBEOzs7O0lBRUQsZ0NBQUs7OztJQUFMO1FBQUEsaUJBVUM7UUFSQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixVQUFVLENBQUM7WUFFVCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUVyQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBRVI7Ozs7SUFFTywyQ0FBZ0I7Ozs7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDOzs7Ozs7SUE0QnBCLHFDQUFVOzs7O2NBQUMsR0FBRztRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFDakIsSUFBTSxXQUFXLEdBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0UsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3JHO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCOzs7OztJQWFLLDJDQUFnQjs7Ozs7O1FBQ3RCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDaEUsVUFBVSxDQUFDOztZQUNULEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0IsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFHQSw2Q0FBa0I7Ozs7O1FBQ3hCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7YUFDcEQsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNoQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ2pCLElBQU0sR0FBRyxHQUFXLE1BQU0sQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRCxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JCO1NBQ0YsQ0FBQyxDQUFDOzs7OztJQUdHLG9EQUF5Qjs7OztRQUMvQixJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7OztnQkFyTjlDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLHdpQ0FvQ1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsMkVBQTJFLENBQUM7aUJBQ3RGOzs7O2dCQTVDUSxjQUFjO2dCQUFFLE1BQU07Ozt1QkErQzVCLGVBQWUsU0FBQyxlQUFlO21DQUUvQixZQUFZLFNBQUMsbUJBQW1CO3lCQUVoQyxLQUFLOzBCQUVMLEtBQUs7Z0NBRUwsS0FBSzt1QkFFTCxLQUFLOzBCQUVMLEtBQUs7NEJBRUwsS0FBSztrQ0FXTCxNQUFNOzsyQkExRVQ7O1NBK0NhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGVjVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIvdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNUYWJNZW51Q29tcG9uZW50IH0gZnJvbSAnLi90YWItbWVudS90YWItbWVudS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtdGFicycsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIiFoaWRkZW5cIj5cblxuICA8IS0tIFRBQlMgLS0+XG4gIDxtYXQtdGFiLWdyb3VwIFtzZWxlY3RlZEluZGV4XT1cImFjdGl2ZVRhYkluZGV4XCIgKGZvY3VzQ2hhbmdlKT1cIm9uQ2hhbmdlVGFiKCRldmVudClcIiBbZHluYW1pY0hlaWdodF09XCJ0cnVlXCI+XG5cbiAgICA8IS0tIFRBQiAtLT5cbiAgICA8bWF0LXRhYiAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnM7XCIgW2Rpc2FibGVkXT1cInRhYi5kaXNhYmxlZFwiPlxuXG4gICAgICA8IS0tIFRBQiBMQUJFTCAtLT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBtYXQtdGFiLWxhYmVsPlxuICAgICAgICB7eyB0YWIubGFiZWwgfX1cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLXNtYWxsXCIgKm5nSWY9XCJ0YWIudG90YWwgPj0gMFwiPnt7IHBhcnNlVG90YWwodGFiLnRvdGFsKSB9fTwvc3Bhbj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgIDwhLS0gVEFCIENPTlRFTlQgV1JBUFBFUiAtLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzaG91bGRUYWJCZURpc3BsYXllZCh0YWIpXCI+XG5cbiAgICAgICAgPCEtLSBUQUIgTUVOVSAtLT5cbiAgICAgICAgPGRpdiAqbmdJZj1cInRhYk1lbnVDb21wb25lbnRcIiBjbGFzcz1cIm1lbnUtd3JhcHBlclwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWJNZW51Q29tcG9uZW50LmNvbnRlbnQ7IGNvbnRleHQ6IHsgYWN0aXZlVGFiOiBhY3RpdmVUYWIgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tIFRBQlMgQ09OVEVOVCAtLT5cbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3RhYi1wYWRkaW5nJzogcGFkZGluZ31cIj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbWF0LXRhYj5cblxuICA8L21hdC10YWItZ3JvdXA+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tZW51LXdyYXBwZXJ7dGV4dC1hbGlnbjpyaWdodDtwYWRkaW5nOjhweCAwfS50YWItcGFkZGluZ3twYWRkaW5nOjE2cHggMH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjVGFiQ29tcG9uZW50KSB0YWJzOiBRdWVyeUxpc3Q8RGVjVGFiQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkKERlY1RhYk1lbnVDb21wb25lbnQpIHRhYk1lbnVDb21wb25lbnQ6IERlY1RhYk1lbnVDb21wb25lbnQ7XG5cbiAgQElucHV0KCkgaGlkZGVuOyAvLyBoaWRlcyB0aGUgdGFicyBncm91cCB0byByZWxvYWQgaXRzIGNvbnRlbnRzXG5cbiAgQElucHV0KCkgcGVyc2lzdCA9IHRydWU7XG5cbiAgQElucHV0KCkgZGVzdHJveU9uQmx1ciA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKSBwYWRkaW5nID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgYWN0aXZlVGFiKHY6IHN0cmluZykge1xuICAgIGlmICh2ICYmIHRoaXMuX2FjdGl2ZVRhYiAhPT0gdikge1xuICAgICAgdGhpcy5fYWN0aXZlVGFiID0gdjtcbiAgICAgIHRoaXMucGVyc2lzdFRhYih2KTtcbiAgICB9XG4gIH1cbiAgZ2V0IGFjdGl2ZVRhYigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiO1xuICB9XG5cbiAgQE91dHB1dCgpIGFjdGl2ZVRhYkNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBnZXQgYWN0aXZlVGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiSW5kZXg7XG4gIH1cblxuICBnZXQgYWN0aXZlVGFiT2JqZWN0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYk9iamVjdDtcbiAgfVxuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYkluZGV4OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfYWN0aXZlVGFiT2JqZWN0OiBhbnk7XG5cbiAgcHJpdmF0ZSBhY3RpdmF0ZWRUYWJzOiBhbnkgPSB7fTtcblxuICBwcml2YXRlIHF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBwYXRoRnJvbVJvb3QgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZU5hbWUoKTtcbiAgICB0aGlzLndhdGNoVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlVGFiTmFtZXMoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnBlcnNpc3QpIHtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICAgICAgICBpZiAocXVlcnlQYXJhbXMgJiYgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudFRhYiA9IHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXTtcbiAgICAgICAgICB0aGlzLnNlbGVjdFRhYihjdXJyZW50VGFiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0U2VsZWN0ZWRUYWIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYkluVXJsUXVlcnkoKTtcbiAgfVxuXG4gIHNob3VsZFRhYkJlRGlzcGxheWVkKHRhYikge1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB0aGlzLl9hY3RpdmVUYWJPYmplY3QgPT09IHRhYjtcbiAgICBjb25zdCBpc0FjdGl2YXRlZCA9IHRoaXMuYWN0aXZhdGVkVGFic1t0YWIubmFtZV07XG4gICAgcmV0dXJuIGlzU2VsZWN0ZWQgfHwgKCF0aGlzLmRlc3Ryb3lPbkJsdXIgJiYgaXNBY3RpdmF0ZWQpO1xuICB9XG5cbiAgb25DaGFuZ2VUYWIoJGV2ZW50KSB7XG4gICAgY29uc3QgYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKVskZXZlbnQuaW5kZXhdO1xuICAgIHRoaXMuYWN0aXZlVGFiID0gYWN0aXZlVGFiT2JqZWN0Lm5hbWU7XG4gIH1cblxuICBwYXJzZVRvdGFsKHRvdGFsKSB7XG5cbiAgICByZXR1cm4gdG90YWwgIT09IG51bGwgJiYgdG90YWwgPj0gMCA/ICB0b3RhbCA6ICc/JztcblxuICB9XG5cbiAgcmVzZXQoKSB7XG5cbiAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcblxuICAgIH0sIDEwKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjb21wb25lbnRUYWJOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnLXRhYic7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVVuaXF1ZU5hbWUgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSB0YWIgY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgLyogZW5zdXJlVW5pcXVlVGFiTmFtZXNcbiAgICogVGhpcyBtZXRob2QgcHJldmVudHMgdGhlIHVzZSBvZiB0aGUgc2FtZSBuYW1lIGZvciBtb3JlIHRoYW4gb25lIHRhYlxuICAgKiB3aGF0IHdvdWxkIGVuZGluZyB1cCBjb25mbGljdGluZyB0aGUgdGFicyBhY3RpdmF0aW9uIG9uY2UgdGhpcyBpcyBkb25lIHZpYSB0YWIgbmFtZVxuICAqL1xuXG4gIHByaXZhdGUgZW5zdXJlVW5pcXVlVGFiTmFtZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlcywgcmVqKSA9PiB7XG4gICAgICBjb25zdCBuYW1lcyA9IHt9O1xuICAgICAgdGhpcy50YWJzLnRvQXJyYXkoKS5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICAgIGlmICghbmFtZXNbdGFiLm5hbWVdKSB7XG4gICAgICAgICAgbmFtZXNbdGFiLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWNUYWJDb21wb25lbnRFcnJvcjogVGhlIDxkZWMtdGFicz4gY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gVGhlIG5hbWUgJHt0YWIubmFtZX0gd2FzIHVzZWQgbW9yZSB0aGFuIG9uY2UuYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHBlcnNpc3RUYWIodGFiKSB7XG4gICAgaWYgKHRoaXMucGVyc2lzdCkge1xuICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICAgICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldID0gdGFiO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdFRhYih0YWIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0VGFiID0gKHRhYk5hbWUpID0+IHtcbiAgICBpZiAodGhpcy50YWJzKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYk5hbWU7XG4gICAgICB0aGlzLmFjdGl2YXRlZFRhYnNbdGFiTmFtZV0gPSB0cnVlO1xuICAgICAgdGhpcy5fYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5maWx0ZXIodGFiID0+IHRhYi5uYW1lID09PSB0YWJOYW1lKVswXTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYkluZGV4ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5pbmRleE9mKHRoaXMuX2FjdGl2ZVRhYk9iamVjdCk7XG4gICAgICB0aGlzLmFjdGl2ZVRhYkNoYW5nZS5lbWl0KHRhYk5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRTZWxlY3RlZFRhYigpIHtcbiAgICBjb25zdCBhY3RpdmVUYWIgPSB0aGlzLmFjdGl2ZVRhYiB8fCB0aGlzLnRhYnMudG9BcnJheSgpWzBdLm5hbWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGF2b2lkIGNoYW5nZSBhZnRlciBjb21wb25lbnQgY2hlY2tlZCBlcnJvclxuICAgICAgdGhpcy5zZWxlY3RUYWIoYWN0aXZlVGFiKTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJJblVybFF1ZXJ5KCkge1xuICAgIHRoaXMucXVlcnlQYXJhbXNTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICBpZiAodGhpcy5wZXJzaXN0KSB7XG4gICAgICAgIGNvbnN0IHRhYjogc3RyaW5nID0gcGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXTtcbiAgICAgICAgdGhpcy5zZWxlY3RUYWIodGFiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpIHtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19