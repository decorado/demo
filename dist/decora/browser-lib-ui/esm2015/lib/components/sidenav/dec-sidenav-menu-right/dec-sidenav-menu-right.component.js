/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, QueryList, Input, ContentChild, Output, EventEmitter } from '@angular/core';
import { DecSidenavMenuItemComponent } from './../dec-sidenav-menu-item/dec-sidenav-menu-item.component';
import { DecSidenavMenuTitleComponent } from './../dec-sidenav-menu-title/dec-sidenav-menu-title.component';
import { BehaviorSubject } from 'rxjs';
import { DecSidenavService } from './../sidenav.service';
export class DecSidenavMenuRightComponent {
    /**
     * @param {?} decSidenavService
     */
    constructor(decSidenavService) {
        this.decSidenavService = decSidenavService;
        this.rightMenuVisible = new BehaviorSubject(true);
        this.rightMenuMode = new BehaviorSubject('side');
        this.openedChange = new EventEmitter();
        this.modeChange = new EventEmitter();
        this.subscribeAndExposeSidenavEvents();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set open(v) {
        const /** @type {?} */ currentValue = this.rightMenuVisible.value;
        if (v !== currentValue) {
            this.rightMenuVisible.next(v);
            this.decSidenavService.setSidenavVisibility('rightMenuHidden', !v);
        }
    }
    /**
     * @return {?}
     */
    get open() {
        return this.rightMenuVisible.value;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set mode(v) {
        const /** @type {?} */ currentValue = this.rightMenuMode.value;
        if (v !== currentValue) {
            this.rightMenuMode.next(v);
        }
    }
    /**
     * @return {?}
     */
    get mode() {
        return this.rightMenuMode.value;
    }
    /**
     * @return {?}
     */
    subscribeAndExposeSidenavEvents() {
        this.rightMenuVisible.subscribe(value => {
            this.openedChange.emit(value);
        });
        this.rightMenuMode.subscribe(value => {
            this.modeChange.emit(value);
        });
    }
}
DecSidenavMenuRightComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-menu-right',
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
DecSidenavMenuRightComponent.ctorParameters = () => [
    { type: DecSidenavService }
];
DecSidenavMenuRightComponent.propDecorators = {
    open: [{ type: Input }],
    mode: [{ type: Input }],
    persistVisibilityMode: [{ type: Input }],
    items: [{ type: ContentChildren, args: [DecSidenavMenuItemComponent, { descendants: false },] }],
    customTitle: [{ type: ContentChild, args: [DecSidenavMenuTitleComponent,] }],
    openedChange: [{ type: Output }],
    modeChange: [{ type: Output }]
};
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
    DecSidenavMenuRightComponent.prototype.decSidenavService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNpZGVuYXYtbWVudS1yaWdodC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi1tZW51LXJpZ2h0L2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3pHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBQzVHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFlekQsTUFBTTs7OztJQTJDSixZQUNVO1FBQUEsc0JBQWlCLEdBQWpCLGlCQUFpQjtnQ0ExQ0MsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDOzZCQUVyQyxJQUFJLGVBQWUsQ0FBUyxNQUFNLENBQUM7NEJBbUNuQyxJQUFJLFlBQVksRUFBVzswQkFFN0IsSUFBSSxZQUFZLEVBQVU7UUFLL0MsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7S0FDeEM7Ozs7O0lBekNELElBQ0ksSUFBSSxDQUFDLENBQU07UUFDYix1QkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztRQUVqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BFO0tBQ0Y7Ozs7SUFFRCxJQUFJLElBQUk7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztLQUNwQzs7Ozs7SUFFRCxJQUNJLElBQUksQ0FBQyxDQUFNO1FBQ2IsdUJBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBRTlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO0tBQ0Y7Ozs7SUFFRCxJQUFJLElBQUk7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7S0FDakM7Ozs7SUFrQk8sK0JBQStCO1FBRXJDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0IsQ0FBQyxDQUFDOzs7O1lBdEVOLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxRQUFRLEVBQUU7Ozs7Ozs7O2dCQVFJO2dCQUNkLE1BQU0sRUFBRSxDQUFDLDBEQUEwRCxDQUFDO2FBQ3JFOzs7O1lBZFEsaUJBQWlCOzs7bUJBcUJ2QixLQUFLO21CQWNMLEtBQUs7b0NBYUwsS0FBSztvQkFFTCxlQUFlLFNBQUMsMkJBQTJCLEVBQUUsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDOzBCQUVqRSxZQUFZLFNBQUMsNEJBQTRCOzJCQUV6QyxNQUFNO3lCQUVOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbnB1dCwgQ29udGVudENoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LWl0ZW0vZGVjLXNpZGVuYXYtbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi1tZW51LXRpdGxlL2RlYy1zaWRlbmF2LW1lbnUtdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjU2lkZW5hdlNlcnZpY2UgfSBmcm9tICcuLy4uL3NpZGVuYXYuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1zaWRlbmF2LW1lbnUtcmlnaHQnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nSWY9XCJjdXN0b21UaXRsZVwiPlxuICA8ZGl2IGNsYXNzPVwibWVudS10aXRsZVwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImRlYy1kZWMtc2lkZW5hdi1tZW51LXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbXNcIj5cbiAgPGRlYy1zaWRlbmF2LW1lbnUgW2l0ZW1zXT1cIml0ZW1zLnRvQXJyYXkoKVwiPjwvZGVjLXNpZGVuYXYtbWVudT5cbjwvbmctY29udGFpbmVyPmAsXG4gIHN0eWxlczogW2AubWVudS10aXRsZXtwYWRkaW5nOjE2cHg7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NzAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NpZGVuYXZNZW51UmlnaHRDb21wb25lbnQge1xuXG4gIHJlYWRvbmx5IHJpZ2h0TWVudVZpc2libGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIHJlYWRvbmx5IHJpZ2h0TWVudU1vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3NpZGUnKTtcblxuICBASW5wdXQoKVxuICBzZXQgb3Blbih2OiBhbnkpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnJpZ2h0TWVudVZpc2libGUudmFsdWU7XG5cbiAgICBpZiAodiAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnJpZ2h0TWVudVZpc2libGUubmV4dCh2KTtcbiAgICAgIHRoaXMuZGVjU2lkZW5hdlNlcnZpY2Uuc2V0U2lkZW5hdlZpc2liaWxpdHkoJ3JpZ2h0TWVudUhpZGRlbicsICF2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgb3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodE1lbnVWaXNpYmxlLnZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG1vZGUodjogYW55KSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5yaWdodE1lbnVNb2RlLnZhbHVlO1xuXG4gICAgaWYgKHYgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5yaWdodE1lbnVNb2RlLm5leHQodik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHRNZW51TW9kZS52YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHBlcnNpc3RWaXNpYmlsaXR5TW9kZTogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkcmVuKERlY1NpZGVuYXZNZW51SXRlbUNvbXBvbmVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGl0ZW1zOiBRdWVyeUxpc3Q8RGVjU2lkZW5hdk1lbnVJdGVtQ29tcG9uZW50PjtcblxuICBAQ29udGVudENoaWxkKERlY1NpZGVuYXZNZW51VGl0bGVDb21wb25lbnQpIGN1c3RvbVRpdGxlOiBEZWNTaWRlbmF2TWVudVRpdGxlQ29tcG9uZW50O1xuXG4gIEBPdXRwdXQoKSBvcGVuZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgQE91dHB1dCgpIG1vZGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRlY1NpZGVuYXZTZXJ2aWNlOiBEZWNTaWRlbmF2U2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmliZUFuZEV4cG9zZVNpZGVuYXZFdmVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlQW5kRXhwb3NlU2lkZW5hdkV2ZW50cygpIHtcblxuICAgIHRoaXMucmlnaHRNZW51VmlzaWJsZS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJpZ2h0TWVudU1vZGUuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMubW9kZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9KTtcblxuICB9XG5cbn1cbiJdfQ==