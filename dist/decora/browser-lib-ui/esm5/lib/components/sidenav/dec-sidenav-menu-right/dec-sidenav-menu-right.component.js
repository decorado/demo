/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, QueryList, Input, ContentChild, Output, EventEmitter } from '@angular/core';
import { DecSidenavMenuItemComponent } from './../dec-sidenav-menu-item/dec-sidenav-menu-item.component';
import { DecSidenavMenuTitleComponent } from './../dec-sidenav-menu-title/dec-sidenav-menu-title.component';
import { BehaviorSubject } from 'rxjs';
import { DecSidenavService } from './../sidenav.service';
var DecSidenavMenuRightComponent = /** @class */ (function () {
    function DecSidenavMenuRightComponent(decSidenavService) {
        this.decSidenavService = decSidenavService;
        this.rightMenuVisible = new BehaviorSubject(true);
        this.rightMenuMode = new BehaviorSubject('side');
        this.openedChange = new EventEmitter();
        this.modeChange = new EventEmitter();
        this.itemSubscriptions = [];
        this.subscribeAndExposeSidenavEvents();
    }
    Object.defineProperty(DecSidenavMenuRightComponent.prototype, "open", {
        get: /**
         * @return {?}
         */
        function () {
            return this.rightMenuVisible.value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ currentValue = this.rightMenuVisible.value;
            if (v !== currentValue) {
                this.rightMenuVisible.next(v);
                this.decSidenavService.setSidenavVisibility('rightMenuHidden', !v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecSidenavMenuRightComponent.prototype, "mode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.rightMenuMode.value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var /** @type {?} */ currentValue = this.rightMenuMode.value;
            if (v !== currentValue) {
                this.rightMenuMode.next(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecSidenavMenuRightComponent.prototype.subscribeAndExposeSidenavEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.rightMenuVisible.subscribe(function (value) {
            _this.openedChange.emit(value);
        });
        this.rightMenuMode.subscribe(function (value) {
            _this.modeChange.emit(value);
        });
    };
    /**
     * @return {?}
     */
    DecSidenavMenuRightComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ items = this.items.toArray();
        items.forEach(function (item) {
            item.toggle.subscribe(function (state) {
                if (state) {
                    _this.closeBrothers(item);
                }
            });
        });
    };
    /**
     * @return {?}
     */
    DecSidenavMenuRightComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.itemSubscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    /**
     * @param {?} itemSelected
     * @return {?}
     */
    DecSidenavMenuRightComponent.prototype.closeBrothers = /**
     * @param {?} itemSelected
     * @return {?}
     */
    function (itemSelected) {
        var /** @type {?} */ items = this.items.toArray();
        items.forEach(function (item) {
            if (itemSelected !== item) {
                item.closeSubmenu();
            }
        });
    };
    DecSidenavMenuRightComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-sidenav-menu-right',
                    template: "<ng-container *ngIf=\"customTitle\">\n  <div class=\"menu-title\">\n    <ng-content select=\"dec-dec-sidenav-menu-title\"></ng-content>\n  </div>\n</ng-container>\n\n<ng-container *ngIf=\"items\">\n  <dec-sidenav-menu [items]=\"items.toArray()\"></dec-sidenav-menu>\n</ng-container>",
                    styles: [".menu-title{padding:16px;font-size:24px;font-weight:700}"]
                },] },
    ];
    /** @nocollapse */
    DecSidenavMenuRightComponent.ctorParameters = function () { return [
        { type: DecSidenavService }
    ]; };
    DecSidenavMenuRightComponent.propDecorators = {
        open: [{ type: Input }],
        mode: [{ type: Input }],
        persistVisibilityMode: [{ type: Input }],
        items: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
        customTitle: [{ type: ContentChild, args: [DecSidenavMenuTitleComponent,] }],
        openedChange: [{ type: Output }],
        modeChange: [{ type: Output }]
    };
    return DecSidenavMenuRightComponent;
}());
export { DecSidenavMenuRightComponent };
function DecSidenavMenuRightComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecSidenavMenuRightComponent.prototype.rightMenuVisible;
    /** @type {?} */
    DecSidenavMenuRightComponent.prototype.rightMenuMode;
    /** @type {?} */
    DecSidenavMenuRightComponent.prototype.persistVisibilityMode;
    /** @type {?} */
    DecSidenavMenuRightComponent.prototype.items;
    /** @type {?} */
    DecSidenavMenuRightComponent.prototype.customTitle;
    /** @type {?} */
    DecSidenavMenuRightComponent.prototype.openedChange;
    /** @type {?} */
    DecSidenavMenuRightComponent.prototype.modeChange;
    /** @type {?} */
    DecSidenavMenuRightComponent.prototype.itemSubscriptions;
    /** @type {?} */
    DecSidenavMenuRightComponent.prototype.decSidenavService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNpZGVuYXYtbWVudS1yaWdodC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUMzSSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUM1RyxPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7SUE0RHZELHNDQUNVO1FBQUEsc0JBQWlCLEdBQWpCLGlCQUFpQjtnQ0E1Q0MsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDOzZCQUVyQyxJQUFJLGVBQWUsQ0FBUyxNQUFNLENBQUM7NEJBbUNuQyxJQUFJLFlBQVksRUFBVzswQkFFN0IsSUFBSSxZQUFZLEVBQVU7aUNBRUwsRUFBRTtRQUs1QyxJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztLQUN4QztJQTNDRCxzQkFDSSw4Q0FBSTs7OztRQVNSO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7U0FDcEM7Ozs7O1FBWkQsVUFDUyxDQUFNO1lBQ2IscUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7WUFFakQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BFO1NBQ0Y7OztPQUFBO0lBTUQsc0JBQ0ksOENBQUk7Ozs7UUFRUjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztTQUNqQzs7Ozs7UUFYRCxVQUNTLENBQU07WUFDYixxQkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFFOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVCO1NBQ0Y7OztPQUFBOzs7O0lBd0JPLHNFQUErQjs7Ozs7UUFFckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDbkMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ2hDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCLENBQUMsQ0FBQzs7Ozs7SUFJTCxzREFBZTs7O0lBQWY7UUFBQSxpQkFrQkM7UUFoQkMscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQWlDO1lBRTlDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztnQkFFekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFFVixLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUUxQjthQUVGLENBQUMsQ0FBQztTQUVKLENBQUMsQ0FBQztLQUVKOzs7O0lBRUQsa0RBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFDLFlBQTBCO1lBQ3hELFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM1QixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFTyxvREFBYTs7OztjQUFDLFlBQVk7UUFFaEMscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQWlDO1lBRTlDLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUUxQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFFckI7U0FFRixDQUFDLENBQUM7OztnQkFsSE4sU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSw0UkFRSTtvQkFDZCxNQUFNLEVBQUUsQ0FBQywwREFBMEQsQ0FBQztpQkFDckU7Ozs7Z0JBZFEsaUJBQWlCOzs7dUJBcUJ2QixLQUFLO3VCQWNMLEtBQUs7d0NBYUwsS0FBSzt3QkFFTCxlQUFlLFNBQUMsMkJBQTJCLEVBQUUsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDOzhCQUVqRSxZQUFZLFNBQUMsNEJBQTRCOytCQUV6QyxNQUFNOzZCQUVOLE1BQU07O3VDQTVEVDs7U0FtQmEsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LWl0ZW0vZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2U2VydmljZSB9IGZyb20gJy4vLi4vc2lkZW5hdi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtbWVudS1yaWdodCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1c3RvbVRpdGxlXCI+XG4gIDxkaXYgY2xhc3M9XCJtZW51LXRpdGxlXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZGVjLWRlYy1zaWRlbmF2LW1lbnUtdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtc1wiPlxuICA8ZGVjLXNpZGVuYXYtbWVudSBbaXRlbXNdPVwiaXRlbXMudG9BcnJheSgpXCI+PC9kZWMtc2lkZW5hdi1tZW51PlxuPC9uZy1jb250YWluZXI+YCxcbiAgc3R5bGVzOiBbYC5tZW51LXRpdGxle3BhZGRpbmc6MTZweDtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo3MDB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdk1lbnVSaWdodENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgcmVhZG9ubHkgcmlnaHRNZW51VmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgcmVhZG9ubHkgcmlnaHRNZW51TW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignc2lkZScpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcGVuKHY6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMucmlnaHRNZW51VmlzaWJsZS52YWx1ZTtcblxuICAgIGlmICh2ICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMucmlnaHRNZW51VmlzaWJsZS5uZXh0KHYpO1xuICAgICAgdGhpcy5kZWNTaWRlbmF2U2VydmljZS5zZXRTaWRlbmF2VmlzaWJpbGl0eSgncmlnaHRNZW51SGlkZGVuJywgIXYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0TWVudVZpc2libGUudmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbW9kZSh2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnJpZ2h0TWVudU1vZGUudmFsdWU7XG5cbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnJpZ2h0TWVudU1vZGUubmV4dCh2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgbW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodE1lbnVNb2RlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgcGVyc2lzdFZpc2liaWxpdHlNb2RlOiBib29sZWFuO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgaXRlbXM6IFF1ZXJ5TGlzdDxEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCkgY3VzdG9tVGl0bGU6IERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIG9wZW5lZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAT3V0cHV0KCkgbW9kZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHByaXZhdGUgaXRlbVN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkZWNTaWRlbmF2U2VydmljZTogRGVjU2lkZW5hdlNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVBbmRFeHBvc2VTaWRlbmF2RXZlbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKSB7XG5cbiAgICB0aGlzLnJpZ2h0TWVudVZpc2libGUuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMub3BlbmVkQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yaWdodE1lbnVNb2RlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLm1vZGVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy50b0FycmF5KCk7XG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBEZWNTaWRlbmF2TWVudUl0ZW1Db21wb25lbnQpID0+IHtcblxuICAgICAgaXRlbS50b2dnbGUuc3Vic2NyaWJlKHN0YXRlID0+IHtcblxuICAgICAgICBpZiAoc3RhdGUpIHtcblxuICAgICAgICAgIHRoaXMuY2xvc2VCcm90aGVycyhpdGVtKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuaXRlbVN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pID0+IHtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZUJyb3RoZXJzKGl0ZW1TZWxlY3RlZCkge1xuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zLnRvQXJyYXkoKTtcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCkgPT4ge1xuXG4gICAgICBpZiAoaXRlbVNlbGVjdGVkICE9PSBpdGVtKSB7XG5cbiAgICAgICAgaXRlbS5jbG9zZVN1Ym1lbnUoKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxufVxuIl19