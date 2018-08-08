/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, QueryList, Input, ContentChild, Output, EventEmitter } from '@angular/core';
import { DecSidenavMenuItemComponent } from './../dec-sidenav-menu-item/dec-sidenav-menu-item.component';
import { DecSidenavMenuTitleComponent } from './../dec-sidenav-menu-title/dec-sidenav-menu-title.component';
import { BehaviorSubject } from 'rxjs';
import { DecSidenavService } from './../sidenav.service';
export class DecSidenavMenuLeftComponent {
    /**
     * @param {?} decSidenavService
     */
    constructor(decSidenavService) {
        this.decSidenavService = decSidenavService;
        this.leftMenuVisible = new BehaviorSubject(true);
        this.leftMenuMode = new BehaviorSubject('side');
        this.openedChange = new EventEmitter();
        this.modeChange = new EventEmitter();
        this.subscribeAndExposeSidenavEvents();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set open(v) {
        const /** @type {?} */ currentValue = this.leftMenuVisible.value;
        if (v !== currentValue) {
            this.leftMenuVisible.next(v);
            this.decSidenavService.setSidenavVisibility('leftMenuHidden', !v);
        }
    }
    /**
     * @return {?}
     */
    get open() {
        return this.leftMenuVisible.value;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set mode(v) {
        const /** @type {?} */ currentValue = this.leftMenuMode.value;
        if (v !== currentValue) {
            this.leftMenuMode.next(v);
        }
    }
    /**
     * @return {?}
     */
    get mode() {
        return this.leftMenuMode.value;
    }
    /**
     * @return {?}
     */
    subscribeAndExposeSidenavEvents() {
        this.leftMenuVisible.subscribe(value => {
            this.openedChange.emit(value);
        });
        this.leftMenuMode.subscribe(value => {
            this.modeChange.emit(value);
        });
    }
}
DecSidenavMenuLeftComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-menu-left',
                template: `<ng-container *ngIf="customTitle">
  <div class="menu-title">
    <ng-content select="dec-dec-sidenav-menu-title"></ng-content>
  </div>
</ng-container>

<ng-container *ngIf="items">
  <dec-sidenav-menu [items]="items.toArray()"></dec-sidenav-menu>
</ng-container>`,
                styles: [`.menu-title{padding:16px;font-size:24px;font-weight:700}`]
            },] },
];
/** @nocollapse */
DecSidenavMenuLeftComponent.ctorParameters = () => [
    { type: DecSidenavService }
];
DecSidenavMenuLeftComponent.propDecorators = {
    open: [{ type: Input }],
    mode: [{ type: Input }],
    persistVisibilityMode: [{ type: Input }],
    items: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
    customTitle: [{ type: ContentChild, args: [DecSidenavMenuTitleComponent,] }],
    openedChange: [{ type: Output }],
    modeChange: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNpZGVuYXYtbWVudS1sZWZ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaWRlbmF2L2RlYy1zaWRlbmF2LW1lbnUtbGVmdC9kZWMtc2lkZW5hdi1tZW51LWxlZnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3pHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBQzVHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFlekQsTUFBTTs7OztJQTBDSixZQUNVO1FBQUEsc0JBQWlCLEdBQWpCLGlCQUFpQjsrQkF6Q0EsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDOzRCQUVyQyxJQUFJLGVBQWUsQ0FBUyxNQUFNLENBQUM7NEJBa0NsQyxJQUFJLFlBQVksRUFBVzswQkFFN0IsSUFBSSxZQUFZLEVBQVU7UUFLL0MsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7S0FDeEM7Ozs7O0lBeENELElBQ0ksSUFBSSxDQUFDLENBQU07UUFDYix1QkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkU7S0FDRjs7OztJQUVELElBQUksSUFBSTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztLQUNuQzs7Ozs7SUFFRCxJQUNJLElBQUksQ0FBQyxDQUFNO1FBQ2IsdUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNCO0tBQ0Y7Ozs7SUFFRCxJQUFJLElBQUk7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7S0FDaEM7Ozs7SUFrQk8sK0JBQStCO1FBRXJDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCLENBQUMsQ0FBQzs7OztZQXJFTixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7Ozs7OztnQkFRSTtnQkFDZCxNQUFNLEVBQUUsQ0FBQywwREFBMEQsQ0FBQzthQUNyRTs7OztZQWRRLGlCQUFpQjs7O21CQXFCdkIsS0FBSzttQkFhTCxLQUFLO29DQWFMLEtBQUs7b0JBRUwsZUFBZSxTQUFDLDJCQUEyQixFQUFFLEVBQUMsV0FBVyxFQUFFLEtBQUssRUFBQzswQkFFakUsWUFBWSxTQUFDLDRCQUE0QjsyQkFFekMsTUFBTTt5QkFFTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5wdXQsIENvbnRlbnRDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS1pdGVtL2RlYy1zaWRlbmF2LW1lbnUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXNpZGVuYXYtbWVudS10aXRsZS9kZWMtc2lkZW5hdi1tZW51LXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY1NpZGVuYXZTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zaWRlbmF2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc2lkZW5hdi1tZW51LWxlZnQnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nSWY9XCJjdXN0b21UaXRsZVwiPlxuICA8ZGl2IGNsYXNzPVwibWVudS10aXRsZVwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1kZWMtc2lkZW5hdi1tZW51LXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbXNcIj5cbiAgPGRlYy1zaWRlbmF2LW1lbnUgW2l0ZW1zXT1cIml0ZW1zLnRvQXJyYXkoKVwiPjwvZGVjLXNpZGVuYXYtbWVudT5cbjwvbmctY29udGFpbmVyPmAsXG4gIHN0eWxlczogW2AubWVudS10aXRsZXtwYWRkaW5nOjE2cHg7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NzAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51TGVmdENvbXBvbmVudCB7XG5cbiAgcmVhZG9ubHkgbGVmdE1lbnVWaXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcblxuICByZWFkb25seSBsZWZ0TWVudU1vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3NpZGUnKTtcblxuICBASW5wdXQoKVxuICBzZXQgb3Blbih2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLmxlZnRNZW51VmlzaWJsZS52YWx1ZTtcbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmxlZnRNZW51VmlzaWJsZS5uZXh0KHYpO1xuICAgICAgdGhpcy5kZWNTaWRlbmF2U2VydmljZS5zZXRTaWRlbmF2VmlzaWJpbGl0eSgnbGVmdE1lbnVIaWRkZW4nLCAhdik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG1vZGUodjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5sZWZ0TWVudU1vZGUudmFsdWU7XG5cbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmxlZnRNZW51TW9kZS5uZXh0KHYpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLmxlZnRNZW51TW9kZS52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHBlcnNpc3RWaXNpYmlsaXR5TW9kZTogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkcmVuKERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGl0ZW1zOiBRdWVyeUxpc3Q8RGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQpIGN1c3RvbVRpdGxlOiBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50O1xuXG4gIEBPdXRwdXQoKSBvcGVuZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQE91dHB1dCgpIG1vZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NpZGVuYXZTZXJ2aWNlOiBEZWNTaWRlbmF2U2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpIHtcblxuICAgIHRoaXMubGVmdE1lbnVWaXNpYmxlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLm9wZW5lZENoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMubGVmdE1lbnVNb2RlLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLm1vZGVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgfVxuXG59XG4iXX0=