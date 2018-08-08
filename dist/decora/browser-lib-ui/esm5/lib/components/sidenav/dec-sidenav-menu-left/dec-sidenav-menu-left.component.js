/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, QueryList, Input, ContentChild, Output, EventEmitter } from '@angular/core';
import { DecSidenavMenuItemComponent } from './../dec-sidenav-menu-item/dec-sidenav-menu-item.component';
import { DecSidenavMenuTitleComponent } from './../dec-sidenav-menu-title/dec-sidenav-menu-title.component';
import { BehaviorSubject } from 'rxjs';
import { DecSidenavService } from './../sidenav.service';
var DecSidenavMenuLeftComponent = /** @class */ (function () {
    function DecSidenavMenuLeftComponent(decSidenavService) {
        this.decSidenavService = decSidenavService;
        this.leftMenuVisible = new BehaviorSubject(true);
        this.leftMenuMode = new BehaviorSubject('side');
        this.openedChange = new EventEmitter();
        this.modeChange = new EventEmitter();
        this.subscribeAndExposeSidenavEvents();
    }
    Object.defineProperty(DecSidenavMenuLeftComponent.prototype, "open", {
        get: /**
         * @return {?}
         */
        function () {
            return this.leftMenuVisible.value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ currentValue = this.leftMenuVisible.value;
            if (v !== currentValue) {
                this.leftMenuVisible.next(v);
                this.decSidenavService.setSidenavVisibility('leftMenuHidden', !v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSidenavMenuLeftComponent.prototype, "mode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.leftMenuMode.value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ currentValue = this.leftMenuMode.value;
            if (v !== currentValue) {
                this.leftMenuMode.next(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecSidenavMenuLeftComponent.prototype.subscribeAndExposeSidenavEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.leftMenuVisible.subscribe(function (value) {
            _this.openedChange.emit(value);
        });
        this.leftMenuMode.subscribe(function (value) {
            _this.modeChange.emit(value);
        });
    };
    DecSidenavMenuLeftComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-menu-left',
                    template: "<ng-container *ngIf=\"customTitle\">\n  <div class=\"menu-title\">\n    <ng-content select=\"dec-dec-sidenav-menu-title\"></ng-content>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"items\">\n  <dec-sidenav-menu [items]=\"items.toArray()\"></dec-sidenav-menu>\n</ng-container>",
                    styles: [".menu-title{padding:16px;font-size:24px;font-weight:700}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavMenuLeftComponent.ctorParameters = function () { return [
        { type: DecSidenavService }
    ]; };
    DecSidenavMenuLeftComponent.propDecorators = {
        open: [{ type: Input }],
        mode: [{ type: Input }],
        persistVisibilityMode: [{ type: Input }],
        items: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
        customTitle: [{ type: ContentChild, args: [DecSidenavMenuTitleComponent,] }],
        openedChange: [{ type: Output }],
        modeChange: [{ type: Output }]
    };
    return DecSidenavMenuLeftComponent;
}());
export { DecSidenavMenuLeftComponent };
function DecSidenavMenuLeftComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecSidenavMenuLeftComponent.prototype.leftMenuVisible;
    /** @type {?} */
    DecSidenavMenuLeftComponent.prototype.leftMenuMode;
    /** @type {?} */
    DecSidenavMenuLeftComponent.prototype.persistVisibilityMode;
    /** @type {?} */
    DecSidenavMenuLeftComponent.prototype.items;
    /** @type {?} */
    DecSidenavMenuLeftComponent.prototype.customTitle;
    /** @type {?} */
    DecSidenavMenuLeftComponent.prototype.openedChange;
    /** @type {?} */
    DecSidenavMenuLeftComponent.prototype.modeChange;
    /** @type {?} */
    DecSidenavMenuLeftComponent.prototype.decSidenavService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNpZGVuYXYtbWVudS1sZWZ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC9kZWMtc2lkZW5hdi1tZW51LWxlZnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3pHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBQzVHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0lBeUR2RCxxQ0FDVTtRQUFBLHNCQUFpQixHQUFqQixpQkFBaUI7K0JBekNBLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQzs0QkFFckMsSUFBSSxlQUFlLENBQVMsTUFBTSxDQUFDOzRCQWtDbEMsSUFBSSxZQUFZLEVBQVc7MEJBRTdCLElBQUksWUFBWSxFQUFVO1FBSy9DLElBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO0tBQ3hDO0lBeENELHNCQUNJLDZDQUFJOzs7O1FBUVI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7U0FDbkM7Ozs7O1FBWEQsVUFDUyxDQUFNO1lBQ2IscUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkU7U0FDRjs7O09BQUE7SUFNRCxzQkFDSSw2Q0FBSTs7OztRQVFSO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1NBQ2hDOzs7OztRQVhELFVBQ1MsQ0FBTTtZQUNiLHFCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUU3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0I7U0FDRjs7O09BQUE7Ozs7SUFzQk8scUVBQStCOzs7OztRQUVyQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDbEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQy9CLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCLENBQUMsQ0FBQzs7O2dCQXJFTixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLDRSQVFJO29CQUNkLE1BQU0sRUFBRSxDQUFDLDBEQUEwRCxDQUFDO2lCQUNyRTs7OztnQkFkUSxpQkFBaUI7Ozt1QkFxQnZCLEtBQUs7dUJBYUwsS0FBSzt3Q0FhTCxLQUFLO3dCQUVMLGVBQWUsU0FBQywyQkFBMkIsRUFBRSxFQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUM7OEJBRWpFLFlBQVksU0FBQyw0QkFBNEI7K0JBRXpDLE1BQU07NkJBRU4sTUFBTTs7c0NBM0RUOztTQW1CYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbnB1dCwgQ29udGVudENoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LWl0ZW0vZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuLy4uL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtbGVmdCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1c3RvbVRpdGxlXCI+XG4gIDxkaXYgY2xhc3M9XCJtZW51LXRpdGxlXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWRlYy1zaWRlbmF2LW1lbnUtdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtc1wiPlxuICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwiaXRlbXMudG9BcnJheSgpXCI+PC9kZWMtc2lkZW5hdi1tZW51PlxuPC9uZy1jb250YWluZXI+YCxcbiAgc3R5bGVzOiBbYC5tZW51LXRpdGxle3BhZGRpbmc6MTZweDtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo3MDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdk1lbnVMZWZ0Q29tcG9uZW50IHtcblxuICByZWFkb25seSBsZWZ0TWVudVZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIHJlYWRvbmx5IGxlZnRNZW51TW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2lkZScpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcGVuKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMubGVmdE1lbnVWaXNpYmxlLnZhbHVlO1xuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubGVmdE1lbnVWaXNpYmxlLm5leHQodik7XG4gICAgICB0aGlzLmRlY1NpZGVuYXZTZXJ2aWNlLnNldFNpZGVuYXZWaXNpYmlsaXR5KCdsZWZ0TWVudUhpZGRlbicsICF2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbW9kZSh2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmxlZnRNZW51TW9kZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubGVmdE1lbnVNb2RlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdE1lbnVNb2RlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgcGVyc2lzdFZpc2liaWxpdHlNb2RlOiBib29sZWFuO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgaXRlbXM6IFF1ZXJ5TGlzdDxEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCkgY3VzdG9tVGl0bGU6IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIG9wZW5lZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAT3V0cHV0KCkgbW9kZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVjU2lkZW5hdlNlcnZpY2U6IERlY1NpZGVuYXZTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVBbmRFeHBvc2VTaWRlbmF2RXZlbnRzKCkge1xuXG4gICAgdGhpcy5sZWZ0TWVudVZpc2libGUuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sZWZ0TWVudU1vZGUuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMubW9kZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICB9XG5cbn1cbiJdfQ==