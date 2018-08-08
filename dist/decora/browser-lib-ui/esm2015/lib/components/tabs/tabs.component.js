/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                const /** @type {?} */ names = {};
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
            const /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
            if (queryParams && queryParams[this.componentTabName()]) {
                const /** @type {?} */ currentTab = queryParams[this.componentTabName()];
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
    shoulTabBeDisplayed(tab) {
        const /** @type {?} */ isSelected = this._activeTabObject === tab;
        const /** @type {?} */ isActivated = this.activatedTabs[tab.name];
        return isSelected || (!this.destroyOnBlur && isActivated);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onChangeTab($event) {
        const /** @type {?} */ activeTabObject = this.tabs.toArray()[$event.index];
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
            const /** @type {?} */ queryParams = Object.assign({}, this.route.snapshot.queryParams);
            queryParams[this.componentTabName()] = tab;
            this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams, replaceUrl: true });
        }
    }
    /**
     * @return {?}
     */
    startSelectedTab() {
        const /** @type {?} */ activeTab = this.activeTab || this.tabs.toArray()[0].name;
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
            const /** @type {?} */ tab = params[this.componentTabName()];
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
      <ng-container *ngIf="shoulTabBeDisplayed(tab)">

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
function DecTabsComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvdGFicy90YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5KLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBMkNwRSxNQUFNOzs7OztJQWlESixZQUFvQixLQUFxQixFQUFVLE1BQWM7UUFBN0MsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO3VCQXpDOUMsSUFBSTs2QkFFRSxLQUFLO3VCQUlYLElBQUk7K0JBYTJCLElBQUksWUFBWSxFQUFVOzZCQWdCL0MsRUFBRTs0QkFJUixFQUFFO2dDQTRERSxHQUFHLEVBQUU7WUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZixNQUFNLElBQUksS0FBSyxDQUFDLHlJQUF5SSxDQUFDLENBQUM7YUFDNUo7U0FDRjtvQ0FPOEIsR0FBRyxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDbkMsdUJBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2hDLEVBQUUs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aWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEZWNUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi90YWIuY29tcG9uZW50JztcbmltcG9ydCB7IERlY1RhYk1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RhYi1tZW51L3RhYi1tZW51LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy10YWJzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiIWhpZGRlblwiPlxuXG4gIDwhLS0gVEFCUyAtLT5cbiAgPG1hdC10YWItZ3JvdXAgW3NlbGVjdGVkSW5kZXhdPVwiYWN0aXZlVGFiSW5kZXhcIiAoZm9jdXNDaGFuZ2UpPVwib25DaGFuZ2VUYWIoJGV2ZW50KVwiIFtkeW5hbWljSGVpZ2h0XT1cInRydWVcIj5cblxuICAgIDwhLS0gVEFCIC0tPlxuICAgIDxtYXQtdGFiICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFicztcIiBbZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCI+XG5cbiAgICAgIDwhLS0gVEFCIExBQkVMIC0tPlxuICAgICAgPG5nLXRlbXBsYXRlIG1hdC10YWItbGFiZWw+XG4gICAgICAgIHt7IHRhYi5sYWJlbCB9fVxuICAgICAgICA8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2Utc21hbGxcIiAqbmdJZj1cInRhYi50b3RhbCA+PSAwXCI+e3sgcGFyc2VUb3RhbCh0YWIudG90YWwpIH19PC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPCEtLSBUQUIgQ09OVEVOVCBXUkFQUEVSIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3VsVGFiQmVEaXNwbGF5ZWQodGFiKVwiPlxuXG4gICAgICAgIDwhLS0gVEFCIE1FTlUgLS0+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0YWJNZW51Q29tcG9uZW50XCIgY2xhc3M9XCJtZW51LXdyYXBwZXJcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiTWVudUNvbXBvbmVudC5jb250ZW50OyBjb250ZXh0OiB7IGFjdGl2ZVRhYjogYWN0aXZlVGFiIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBUQUJTIENPTlRFTlQgLS0+XG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd0YWItcGFkZGluZyc6IHBhZGRpbmd9XCI+XG5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8L21hdC10YWI+XG5cbiAgPC9tYXQtdGFiLWdyb3VwPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AubWVudS13cmFwcGVye3RleHQtYWxpZ246cmlnaHQ7cGFkZGluZzo4cHggMH0udGFiLXBhZGRpbmd7cGFkZGluZzoxNnB4IDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBAQ29udGVudENoaWxkcmVuKERlY1RhYkNvbXBvbmVudCkgdGFiczogUXVlcnlMaXN0PERlY1RhYkNvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZChEZWNUYWJNZW51Q29tcG9uZW50KSB0YWJNZW51Q29tcG9uZW50OiBEZWNUYWJNZW51Q29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIGhpZGRlbjsgLy8gaGlkZXMgdGhlIHRhYnMgZ3JvdXAgdG8gcmVsb2FkIGl0cyBjb250ZW50c1xuXG4gIEBJbnB1dCgpIHBlcnNpc3QgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkJsdXIgPSBmYWxzZTtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGFkZGluZyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IGFjdGl2ZVRhYih2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAmJiB0aGlzLl9hY3RpdmVUYWIgIT09IHYpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYiA9IHY7XG4gICAgICB0aGlzLnBlcnNpc3RUYWIodik7XG4gICAgfVxuICB9XG4gIGdldCBhY3RpdmVUYWIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYjtcbiAgfVxuXG4gIEBPdXRwdXQoKSBhY3RpdmVUYWJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgZ2V0IGFjdGl2ZVRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVRhYkluZGV4O1xuICB9XG5cbiAgZ2V0IGFjdGl2ZVRhYk9iamVjdCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVUYWJPYmplY3Q7XG4gIH1cblxuICBwcml2YXRlIF9hY3RpdmVUYWI6IHN0cmluZztcblxuICBwcml2YXRlIF9hY3RpdmVUYWJJbmRleDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVRhYk9iamVjdDogYW55O1xuXG4gIHByaXZhdGUgYWN0aXZhdGVkVGFiczogYW55ID0ge307XG5cbiAgcHJpdmF0ZSBxdWVyeVBhcmFtc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgcGF0aEZyb21Sb290ID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5lbnN1cmVVbmlxdWVOYW1lKCk7XG4gICAgdGhpcy53YXRjaFRhYkluVXJsUXVlcnkoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmVuc3VyZVVuaXF1ZVRhYk5hbWVzKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBxdWVyeVBhcmFtczogUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcyk7XG4gICAgICBpZiAocXVlcnlQYXJhbXMgJiYgcXVlcnlQYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUYWIgPSBxdWVyeVBhcmFtc1t0aGlzLmNvbXBvbmVudFRhYk5hbWUoKV07XG4gICAgICAgIHRoaXMuc2VsZWN0VGFiKGN1cnJlbnRUYWIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGFydFNlbGVjdGVkVGFiKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpO1xuICB9XG5cbiAgc2hvdWxUYWJCZURpc3BsYXllZCh0YWIpIHtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gdGhpcy5fYWN0aXZlVGFiT2JqZWN0ID09PSB0YWI7XG4gICAgY29uc3QgaXNBY3RpdmF0ZWQgPSB0aGlzLmFjdGl2YXRlZFRhYnNbdGFiLm5hbWVdO1xuICAgIHJldHVybiBpc1NlbGVjdGVkIHx8ICghdGhpcy5kZXN0cm95T25CbHVyICYmIGlzQWN0aXZhdGVkKTtcbiAgfVxuXG4gIG9uQ2hhbmdlVGFiKCRldmVudCkge1xuICAgIGNvbnN0IGFjdGl2ZVRhYk9iamVjdCA9IHRoaXMudGFicy50b0FycmF5KClbJGV2ZW50LmluZGV4XTtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IGFjdGl2ZVRhYk9iamVjdC5uYW1lO1xuICB9XG5cbiAgcGFyc2VUb3RhbCh0b3RhbCkge1xuXG4gICAgcmV0dXJuIHRvdGFsICE9PSBudWxsICYmIHRvdGFsID49IDAgPyAgdG90YWwgOiAnPyc7XG5cbiAgfVxuXG4gIHJlc2V0KCkge1xuXG4gICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG5cbiAgICB9LCAxMCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgY29tcG9uZW50VGFiTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgJy10YWInO1xuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVVbmlxdWVOYW1lID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RlY1RhYkNvbXBvbmVudEVycm9yOiBUaGUgdGFiIGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFBsZWFzZSwgZW5zdXJlIHRoYXQgeW91IGhhdmUgcGFzc2VkIGFuIHVuaXF1ZSBuYW1tZSB0byB0aGUgY29tcG9uZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGVuc3VyZVVuaXF1ZVRhYk5hbWVzXG4gICAqIFRoaXMgbWV0aG9kIHByZXZlbnRzIHRoZSB1c2Ugb2YgdGhlIHNhbWUgbmFtZSBmb3IgbW9yZSB0aGFuIG9uZSB0YWJcbiAgICogd2hhdCB3b3VsZCBlbmRpbmcgdXAgY29uZmxpY3RpbmcgdGhlIHRhYnMgYWN0aXZhdGlvbiBvbmNlIHRoaXMgaXMgZG9uZSB2aWEgdGFiIG5hbWVcbiAgKi9cblxuICBwcml2YXRlIGVuc3VyZVVuaXF1ZVRhYk5hbWVzID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXMsIHJlaikgPT4ge1xuICAgICAgY29uc3QgbmFtZXMgPSB7fTtcbiAgICAgIHRoaXMudGFicy50b0FycmF5KCkuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgICBpZiAoIW5hbWVzW3RhYi5uYW1lXSkge1xuICAgICAgICAgIG5hbWVzW3RhYi5uYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRGVjVGFiQ29tcG9uZW50RXJyb3I6IFRoZSA8ZGVjLXRhYnM+IGNvbXBvbmVudCBtdXN0IGhhdmUgYW4gdW5pcXVlIG5hbWUuIFRoZSBuYW1lICR7dGFiLm5hbWV9IHdhcyB1c2VkIG1vcmUgdGhhbiBvbmNlLmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJzaXN0VGFiKHRhYikge1xuICAgIGlmICh0aGlzLnBlcnNpc3QpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgICAgIHF1ZXJ5UGFyYW1zW3RoaXMuY29tcG9uZW50VGFiTmFtZSgpXSA9IHRhYjtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLiddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtcywgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdFRhYiA9ICh0YWJOYW1lKSA9PiB7XG4gICAgaWYgKHRoaXMudGFicykge1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWJOYW1lO1xuICAgICAgdGhpcy5hY3RpdmF0ZWRUYWJzW3RhYk5hbWVdID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhYk9iamVjdCA9IHRoaXMudGFicy50b0FycmF5KCkuZmlsdGVyKHRhYiA9PiB0YWIubmFtZSA9PT0gdGFiTmFtZSlbMF07XG4gICAgICB0aGlzLl9hY3RpdmVUYWJJbmRleCA9IHRoaXMudGFicy50b0FycmF5KCkuaW5kZXhPZih0aGlzLl9hY3RpdmVUYWJPYmplY3QpO1xuICAgICAgdGhpcy5hY3RpdmVUYWJDaGFuZ2UuZW1pdCh0YWJOYW1lKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0U2VsZWN0ZWRUYWIoKSB7XG4gICAgY29uc3QgYWN0aXZlVGFiID0gdGhpcy5hY3RpdmVUYWIgfHwgdGhpcy50YWJzLnRvQXJyYXkoKVswXS5uYW1lO1xuICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBhdm9pZCBjaGFuZ2UgYWZ0ZXIgY29tcG9uZW50IGNoZWNrZWQgZXJyb3JcbiAgICAgIHRoaXMuc2VsZWN0VGFiKGFjdGl2ZVRhYik7XG4gICAgfSwgMSk7XG4gIH1cblxuICBwcml2YXRlIHdhdGNoVGFiSW5VcmxRdWVyeSgpIHtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtc1xuICAgIC5zdWJzY3JpYmUoKHBhcmFtcykgPT4ge1xuICAgICAgY29uc3QgdGFiOiBzdHJpbmcgPSBwYXJhbXNbdGhpcy5jb21wb25lbnRUYWJOYW1lKCldO1xuICAgICAgdGhpcy5zZWxlY3RUYWIodGFiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RvcFdhdGNoaW5nVGFiSW5VcmxRdWVyeSgpIHtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19