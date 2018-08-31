/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ContentChildren, QueryList, ContentChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecTabComponent } from './tab/tab.component';
import { DecTabMenuComponent } from './tab-menu/tab-menu.component';
export class DecTabsComponent {
    /**
     * @param {?} route
     * @param {?} router
     */
    constructor(route, router) {
        this.route = route;
        this.router = router;
        this.persist = true;
        this.destroyOnBlur = false;
        this.padding = true;
        this.activeTabChange = new EventEmitter();
        this.activatedTabs = {};
        this.pathFromRoot = '';
        this.ensureUniqueName = () => {
            if (!this.name) {
                throw new Error('DecTabComponentError: The tab component must have an unique name. Please, ensure that you have passed an unique namme to the component.');
            }
        };
        this.ensureUniqueTabNames = () => {
            return new Promise((res, rej) => {
                /** @type {?} */
                const names = {};
                this.tabs.toArray().forEach(tab => {
                    if (!names[tab.name]) {
                        names[tab.name] = true;
                    }
                    else {
                        throw new Error(`DecTabComponentError: The <dec-tabs> component must have an unique name. The name ${tab.name} was used more than once.`);
                    }
                });
                res();
            });
        };
        this.selectTab = (tabName) => {
            if (this.tabs) {
                this.activeTab = tabName;
                this.activatedTabs[tabName] = true;
                this._activeTabObject = this.tabs.toArray().filter(tab => tab.name === tabName)[0];
                this._activeTabIndex = this.tabs.toArray().indexOf(this._activeTabObject);
                this.activeTabChange.emit(tabName);
            }
        };
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set activeTab(v) {
        if (v && this._activeTab !== v) {
            this._activeTab = v;
            this.persistTab(v);
        }
    }
    /**
     * @return {?}
     */
    get activeTab() {
        return this._activeTab;
    }
    /**
     * @return {?}
     */
    get activeTabIndex() {
        return this._activeTabIndex;
    }
    /**
     * @return {?}
     */
    get activeTabObject() {
        return this._activeTabObject;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ensureUniqueName();
        this.watchTabInUrlQuery();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.ensureUniqueTabNames()
            .then(() => {
            /** @type {?} */
            const queryParams = Object.assign({}, this.route.snapshot.queryParams);
            if (queryParams && queryParams[this.componentTabName()]) {
                /** @type {?} */
                const currentTab = queryParams[this.componentTabName()];
                this.selectTab(currentTab);
            }
            else {
                this.startSelectedTab();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stopWatchingTabInUrlQuery();
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    shouldTabBeDisplayed(tab) {
        /** @type {?} */
        const isSelected = this._activeTabObject === tab;
        /** @type {?} */
        const isActivated = this.activatedTabs[tab.name];
        return isSelected || (!this.destroyOnBlur && isActivated);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChangeTab($event) {
        /** @type {?} */
        const activeTabObject = this.tabs.toArray()[$event.index];
        this.activeTab = activeTabObject.name;
    }
    /**
     * @param {?} total
     * @return {?}
     */
    parseTotal(total) {
        return total !== null && total >= 0 ? total : '?';
    }
    /**
     * @return {?}
     */
    reset() {
        this.hidden = true;
        setTimeout(() => {
            this.hidden = false;
        }, 10);
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
    persistTab(tab) {
        if (this.persist) {
            /** @type {?} */
            const queryParams = Object.assign({}, this.route.snapshot.queryParams);
            queryParams[this.componentTabName()] = tab;
            this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
        }
    }
    /**
     * @return {?}
     */
    startSelectedTab() {
        /** @type {?} */
        const activeTab = this.activeTab || this.tabs.toArray()[0].name;
        setTimeout(() => {
            // avoid change after component checked error
            this.selectTab(activeTab);
        }, 1);
    }
    /**
     * @return {?}
     */
    watchTabInUrlQuery() {
        this.queryParamsSubscription = this.route.queryParams
            .subscribe((params) => {
            /** @type {?} */
            const tab = params[this.componentTabName()];
            this.selectTab(tab);
        });
    }
    /**
     * @return {?}
     */
    stopWatchingTabInUrlQuery() {
        this.queryParamsSubscription.unsubscribe();
    }
}
DecTabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-tabs',
                template: `<div *ngIf="!hidden">

  <!-- TABS -->
  <mat-tab-group [selectedIndex]="activeTabIndex" (focusChange)="onChangeTab($event)" [dynamicHeight]="true">

    <!-- TAB -->
    <mat-tab *ngFor="let tab of tabs;" [disabled]="tab.disabled">

      <!-- TAB LABEL -->
      <ng-template mat-tab-label>
        {{ tab.label }}
        <span class="badge badge-pill badge-small" *ngIf="tab.total >= 0">{{ parseTotal(tab.total) }}</span>
      </ng-template>

      <!-- TAB CONTENT WRAPPER -->
      <ng-container *ngIf="shouldTabBeDisplayed(tab)">

        <!-- TAB MENU -->
        <div *ngIf="tabMenuComponent" class="menu-wrapper">
          <ng-container *ngTemplateOutlet="tabMenuComponent.content; context: { activeTab: activeTab }"></ng-container>
        </div>

        <!-- TABS CONTENT -->
        <div [ngClass]="{'tab-padding': padding}">

          <ng-container *ngTemplateOutlet="tab.content"></ng-container>

        </div>

      </ng-container>

    </mat-tab>

  </mat-tab-group>

</div>
`,
                styles: [`.menu-wrapper{text-align:right;padding:8px 0}.tab-padding{padding:16px 0}`]
            },] },
];
/** @nocollapse */
DecTabsComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvdGFicy90YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5KLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBMkNwRSxNQUFNOzs7OztJQWlESixZQUFvQixLQUFxQixFQUFVLE1BQWM7UUFBN0MsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO3VCQXpDOUMsSUFBSTs2QkFFRSxLQUFLO3VCQUlYLElBQUk7K0JBYTJCLElBQUksWUFBWSxFQUFVOzZCQWdCL0MsRUFBRTs0QkFJUixFQUFFO2dDQTRERSxHQUFHLEVBQUU7WUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZixNQUFNLElBQUksS0FBSyxDQUFDLHlJQUF5SSxDQUFDLENBQUM7YUFDNUo7U0FDRjtvQ0FPOEIsR0FBRyxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTs7Z0JBQ25DLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO3FCQUN4QjtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHFGQUFxRixHQUFHLENBQUMsSUFBSSwyQkFBMkIsQ0FBQyxDQUFDO3FCQUM1STtpQkFDRixDQUFDLENBQUM7Z0JBQ0gsR0FBRyxFQUFFLENBQUM7YUFDUCxDQUFDLENBQUM7U0FDSjt5QkFVbUIsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztnQkFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7S0FuR29FOzs7OztJQWpDckUsSUFDSSxTQUFTLENBQUMsQ0FBUztRQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7S0FDRjs7OztJQUNELElBQUksU0FBUztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCOzs7O0lBSUQsSUFBSSxjQUFjO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0tBQzdCOzs7O0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7S0FDOUI7Ozs7SUFnQkQsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQzNCOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsRUFBRTthQUMxQixJQUFJLENBQUMsR0FBRyxFQUFFOztZQUNULE1BQU0sV0FBVyxHQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQy9FLEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUN4RCxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM1QjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3pCO1NBQ0YsQ0FBQyxDQUFDO0tBRUo7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7S0FDbEM7Ozs7O0lBRUQsb0JBQW9CLENBQUMsR0FBRzs7UUFDdEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixLQUFLLEdBQUcsQ0FBQzs7UUFDakQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxXQUFXLENBQUMsQ0FBQztLQUMzRDs7Ozs7SUFFRCxXQUFXLENBQUMsTUFBTTs7UUFDaEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDO0tBQ3ZDOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFLO1FBRWQsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FFcEQ7Ozs7SUFFRCxLQUFLO1FBRUgsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUVkLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBRXJCLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FFUjs7OztJQUVPLGdCQUFnQjtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Ozs7OztJQTRCcEIsVUFBVSxDQUFDLEdBQUc7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1lBQ2pCLE1BQU0sV0FBVyxHQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQy9FLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNyRzs7Ozs7SUFhSyxnQkFBZ0I7O1FBQ3RCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDaEUsVUFBVSxDQUFDLEdBQUcsRUFBRTs7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBR0Esa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7YUFDcEQsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7O1lBQ3BCLE1BQU0sR0FBRyxHQUFXLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckIsQ0FBQyxDQUFDOzs7OztJQUdHLHlCQUF5QjtRQUMvQixJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7WUEvTTlDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FvQ1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsMkVBQTJFLENBQUM7YUFDdEY7Ozs7WUE1Q1EsY0FBYztZQUFFLE1BQU07OzttQkErQzVCLGVBQWUsU0FBQyxlQUFlOytCQUUvQixZQUFZLFNBQUMsbUJBQW1CO3FCQUVoQyxLQUFLO3NCQUVMLEtBQUs7NEJBRUwsS0FBSzttQkFFTCxLQUFLO3NCQUVMLEtBQUs7d0JBRUwsS0FBSzs4QkFXTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi90YWIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1RhYk1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RhYi1tZW51L3RhYi1tZW51LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy10YWJzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiIWhpZGRlblwiPlxuXG4gIDwhLS0gVEFCUyAtLT5cbiAgPG1hdC10YWItZ3JvdXAgW3NlbGVjdGVkSW5kZXhdPVwiYWN0aXZlVGFiSW5kZXhcIiAoZm9jdXNDaGFuZ2UpPVwib25DaGFuZ2VUYWIoJGV2ZW50KVwiIFtkeW5hbWljSGVpZ2h0XT1cInRydWVcIj5cblxuICAgIDwhLS0gVEFCIC0tPlxuICAgIDxtYXQtdGFiICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFicztcIiBbZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCI+XG5cbiAgICAgIDwhLS0gVEFCIExBQkVMIC0tPlxuICAgICAgPG5nLXRlbXBsYXRlIG1hdC10YWItbGFiZWw+XG4gICAgICAgIHt7IHRhYi5sYWJlbCB9fVxuICAgICAgICA8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2Utc21hbGxcIiAqbmdJZj1cInRhYi50b3RhbCA+PSAwXCI+e3sgcGFyc2VUb3RhbCh0YWIudG90YWwpIH19PC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPCEtLSBUQUIgQ09OVEVOVCBXUkFQUEVSIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3VsZFRhYkJlRGlzcGxheWVkKHRhYilcIj5cblxuICAgICAgICA8IS0tIFRBQiBNRU5VIC0tPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwidGFiTWVudUNvbXBvbmVudFwiIGNsYXNzPVwibWVudS13cmFwcGVyXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRhYk1lbnVDb21wb25lbnQuY29udGVudDsgY29udGV4dDogeyBhY3RpdmVUYWI6IGFjdGl2ZVRhYiB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS0gVEFCUyBDT05URU5UIC0tPlxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndGFiLXBhZGRpbmcnOiBwYWRkaW5nfVwiPlxuXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRhYi5jb250ZW50XCI+PC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPC9tYXQtdGFiPlxuXG4gIDwvbWF0LXRhYi1ncm91cD5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm1lbnUtd3JhcHBlcnt0ZXh0LWFsaWduOnJpZ2h0O3BhZGRpbmc6OHB4IDB9LnRhYi1wYWRkaW5ne3BhZGRpbmc6MTZweCAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1RhYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNUYWJDb21wb25lbnQpIHRhYnM6IFF1ZXJ5TGlzdDxEZWNUYWJDb21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjVGFiTWVudUNvbXBvbmVudCkgdGFiTWVudUNvbXBvbmVudDogRGVjVGFiTWVudUNvbXBvbmVudDtcblxuICBASW5wdXQoKSBoaWRkZW47IC8vIGhpZGVzIHRoZSB0YWJzIGdyb3VwIHRvIHJlbG9hZCBpdHMgY29udGVudHNcblxuICBASW5wdXQoKSBwZXJzaXN0ID0gdHJ1ZTtcblxuICBASW5wdXQoKSBkZXN0cm95T25CbHVyID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHBhZGRpbmcgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBhY3RpdmVUYWIodjogc3RyaW5nKSB7XG4gICAgaWYgKHYgJiYgdGhpcy5fYWN0aXZlVGFiICE9PSB2KSB7XG4gICAgICB0aGlzLl9hY3RpdmVUYWIgPSB2O1xuICAgICAgdGhpcy5wZXJzaXN0VGFiKHYpO1xuICAgIH1cbiAgfVxuICBnZXQgYWN0aXZlVGFiKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVUYWI7XG4gIH1cblxuICBAT3V0cHV0KCkgYWN0aXZlVGFiQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGdldCBhY3RpdmVUYWJJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVUYWJJbmRleDtcbiAgfVxuXG4gIGdldCBhY3RpdmVUYWJPYmplY3QoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiT2JqZWN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfYWN0aXZlVGFiOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfYWN0aXZlVGFiSW5kZXg6IG51bWJlcjtcblxuICBwcml2YXRlIF9hY3RpdmVUYWJPYmplY3Q6IGFueTtcblxuICBwcml2YXRlIGFjdGl2YXRlZFRhYnM6IGFueSA9IHt9O1xuXG4gIHByaXZhdGUgcXVlcnlQYXJhbXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIHBhdGhGcm9tUm9vdCA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZW5zdXJlVW5pcXVlTmFtZSgpO1xuICAgIHRoaXMud2F0Y2hUYWJJblVybFF1ZXJ5KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbnN1cmVVbmlxdWVUYWJOYW1lcygpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICAgICAgaWYgKHF1ZXJ5UGFyYW1zICYmIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXSkge1xuICAgICAgICBjb25zdCBjdXJyZW50VGFiID0gcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldO1xuICAgICAgICB0aGlzLnNlbGVjdFRhYihjdXJyZW50VGFiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhcnRTZWxlY3RlZFRhYigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3BXYXRjaGluZ1RhYkluVXJsUXVlcnkoKTtcbiAgfVxuXG4gIHNob3VsZFRhYkJlRGlzcGxheWVkKHRhYikge1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB0aGlzLl9hY3RpdmVUYWJPYmplY3QgPT09IHRhYjtcbiAgICBjb25zdCBpc0FjdGl2YXRlZCA9IHRoaXMuYWN0aXZhdGVkVGFic1t0YWIubmFtZV07XG4gICAgcmV0dXJuIGlzU2VsZWN0ZWQgfHwgKCF0aGlzLmRlc3Ryb3lPbkJsdXIgJiYgaXNBY3RpdmF0ZWQpO1xuICB9XG5cbiAgb25DaGFuZ2VUYWIoJGV2ZW50KSB7XG4gICAgY29uc3QgYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKVskZXZlbnQuaW5kZXhdO1xuICAgIHRoaXMuYWN0aXZlVGFiID0gYWN0aXZlVGFiT2JqZWN0Lm5hbWU7XG4gIH1cblxuICBwYXJzZVRvdGFsKHRvdGFsKSB7XG5cbiAgICByZXR1cm4gdG90YWwgIT09IG51bGwgJiYgdG90YWwgPj0gMCA/ICB0b3RhbCA6ICc/JztcblxuICB9XG5cbiAgcmVzZXQoKSB7XG5cbiAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcblxuICAgIH0sIDEwKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBjb21wb25lbnRUYWJOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnLXRhYic7XG4gIH1cblxuICBwcml2YXRlIGVuc3VyZVVuaXF1ZU5hbWUgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSB0YWIgY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gUGxlYXNlLCBlbnN1cmUgdGhhdCB5b3UgaGF2ZSBwYXNzZWQgYW4gdW5pcXVlIG5hbW1lIHRvIHRoZSBjb21wb25lbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgLyogZW5zdXJlVW5pcXVlVGFiTmFtZXNcbiAgICogVGhpcyBtZXRob2QgcHJldmVudHMgdGhlIHVzZSBvZiB0aGUgc2FtZSBuYW1lIGZvciBtb3JlIHRoYW4gb25lIHRhYlxuICAgKiB3aGF0IHdvdWxkIGVuZGluZyB1cCBjb25mbGljdGluZyB0aGUgdGFicyBhY3RpdmF0aW9uIG9uY2UgdGhpcyBpcyBkb25lIHZpYSB0YWIgbmFtZVxuICAqL1xuXG4gIHByaXZhdGUgZW5zdXJlVW5pcXVlVGFiTmFtZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlcywgcmVqKSA9PiB7XG4gICAgICBjb25zdCBuYW1lcyA9IHt9O1xuICAgICAgdGhpcy50YWJzLnRvQXJyYXkoKS5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICAgIGlmICghbmFtZXNbdGFiLm5hbWVdKSB7XG4gICAgICAgICAgbmFtZXNbdGFiLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWNUYWJDb21wb25lbnRFcnJvcjogVGhlIDxkZWMtdGFicz4gY29tcG9uZW50IG11c3QgaGF2ZSBhbiB1bmlxdWUgbmFtZS4gVGhlIG5hbWUgJHt0YWIubmFtZX0gd2FzIHVzZWQgbW9yZSB0aGFuIG9uY2UuYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHBlcnNpc3RUYWIodGFiKSB7XG4gICAgaWYgKHRoaXMucGVyc2lzdCkge1xuICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICAgICAgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldID0gdGFiO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSwgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0VGFiID0gKHRhYk5hbWUpID0+IHtcbiAgICBpZiAodGhpcy50YWJzKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYk5hbWU7XG4gICAgICB0aGlzLmFjdGl2YXRlZFRhYnNbdGFiTmFtZV0gPSB0cnVlO1xuICAgICAgdGhpcy5fYWN0aXZlVGFiT2JqZWN0ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5maWx0ZXIodGFiID0+IHRhYi5uYW1lID09PSB0YWJOYW1lKVswXTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYkluZGV4ID0gdGhpcy50YWJzLnRvQXJyYXkoKS5pbmRleE9mKHRoaXMuX2FjdGl2ZVRhYk9iamVjdCk7XG4gICAgICB0aGlzLmFjdGl2ZVRhYkNoYW5nZS5lbWl0KHRhYk5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRTZWxlY3RlZFRhYigpIHtcbiAgICBjb25zdCBhY3RpdmVUYWIgPSB0aGlzLmFjdGl2ZVRhYiB8fCB0aGlzLnRhYnMudG9BcnJheSgpWzBdLm5hbWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIGF2b2lkIGNoYW5nZSBhZnRlciBjb21wb25lbnQgY2hlY2tlZCBlcnJvclxuICAgICAgdGhpcy5zZWxlY3RUYWIoYWN0aXZlVGFiKTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hUYWJJblVybFF1ZXJ5KCkge1xuICAgIHRoaXMucXVlcnlQYXJhbXNTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zXG4gICAgLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICBjb25zdCB0YWI6IHN0cmluZyA9IHBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV07XG4gICAgICB0aGlzLnNlbGVjdFRhYih0YWIpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wV2F0Y2hpbmdUYWJJblVybFF1ZXJ5KCkge1xuICAgIHRoaXMucXVlcnlQYXJhbXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iXX0=