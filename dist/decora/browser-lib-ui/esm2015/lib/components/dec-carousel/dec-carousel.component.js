/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { DecCarouselItemComponent } from './dec-carousel-item/dec-carousel-item.component';
export class DecCarouselComponent {
    constructor() {
        this.selectedIndex = 0;
        this.itemsPerPage = 4;
        this.gap = '8px';
        this.itemSelected = new EventEmitter();
        this.initialIndex = 0;
    }
    /**
     * @return {?}
     */
    get itemWidth() {
        return 100 / this.itemsPerPage;
    }
    /**
     * @return {?}
     */
    get showPrevButton() {
        return this.initialIndex > 0;
    }
    /**
     * @return {?}
     */
    get showNextButton() {
        /** @type {?} */
        const totalItems = this.items.length;
        return this.initialIndex < (totalItems - this.itemsPerPage);
    }
    /**
     * @return {?}
     */
    get showNavigators() {
        return !this.items || this.items.length > this.itemsPerPage;
    }
    /**
     * @return {?}
     */
    get visibleItems() {
        /** @type {?} */
        const itemsArray = this.items.toArray();
        this.finalIndex = this.initialIndex + this.itemsPerPage;
        /** @type {?} */
        const itemsObjects = itemsArray.map((item, index) => {
            return {
                index: index,
                component: item
            };
        });
        return itemsObjects.slice(this.initialIndex, this.finalIndex);
    }
    /**
     * @return {?}
     */
    get selectedItem() {
        return this.items.toArray()[this.selectedIndex];
    }
    /**
     * @return {?}
     */
    goPrev() {
        this.initialIndex--;
    }
    /**
     * @return {?}
     */
    goNext() {
        this.initialIndex++;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectItem(index) {
        this.selectedIndex = index;
        this.itemSelected.emit({
            index: this.selectedIndex,
            value: this.selectedItem.value
        });
    }
}
DecCarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-carousel',
                template: `<div *ngIf="items" class="dec-carousel-wrapper" fxLayout="row" [fxLayoutGap]="gap" fxLayoutAlign="space-between center">

  <div fxFlex="24px" *ngIf="showNavigators">
    <div (click)="goPrev()" *ngIf="showPrevButton" class="dec-carousel-navigator dec-carousel-navigator-left"></div>
  </div>

  <div fxFlex>

    <div fxLayout="row" [fxLayoutGap]="gap">

      <div *ngFor="let item of visibleItems;" class="dec-carousel-item" [ngClass]="{'selected': selectedIndex === item.index}"
        [fxFlex]="itemWidth" (click)="selectItem(item.index)">

        <ng-template [ngTemplateOutlet]="item.component.template"></ng-template>

      </div>

    </div>

  </div>

  <div fxFlex="24px" *ngIf="showNavigators">
    <div (click)="goNext()" *ngIf="showNextButton" class="dec-carousel-navigator dec-carousel-navigator-right"></div>
  </div>

</div>

<ng-content></ng-content>
`,
                styles: [`.dec-carousel-wrapper{padding:2px}.dec-carousel-wrapper .dec-carousel-item{border:1px solid #000;padding:4px;cursor:pointer}.dec-carousel-wrapper .dec-carousel-item.selected{border-color:#daa520}.dec-carousel-wrapper .dec-carousel-navigator{cursor:pointer;border:solid rgba(0,0,0,.5);border-width:0 4px 4px 0;display:inline-block;padding:12px;margin:4px;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.dec-carousel-wrapper .dec-carousel-navigator-left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.dec-carousel-wrapper .dec-carousel-navigator-right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg);margin-left:-8px}`]
            },] },
];
/** @nocollapse */
DecCarouselComponent.ctorParameters = () => [];
DecCarouselComponent.propDecorators = {
    selectedIndex: [{ type: Input }],
    itemsPerPage: [{ type: Input }],
    gap: [{ type: Input }],
    items: [{ type: ContentChildren, args: [DecCarouselItemComponent,] }],
    itemSelected: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DecCarouselComponent.prototype.selectedIndex;
    /** @type {?} */
    DecCarouselComponent.prototype.itemsPerPage;
    /** @type {?} */
    DecCarouselComponent.prototype.gap;
    /** @type {?} */
    DecCarouselComponent.prototype.items;
    /** @type {?} */
    DecCarouselComponent.prototype.itemSelected;
    /** @type {?} */
    DecCarouselComponent.prototype.initialIndex;
    /** @type {?} */
    DecCarouselComponent.prototype.finalIndex;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtY2Fyb3VzZWwvZGVjLWNhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBbUMzRixNQUFNO0lBZ0JKOzZCQWR5QixDQUFDOzRCQUVGLENBQUM7bUJBRVYsS0FBSzs0QkFJSyxJQUFJLFlBQVksRUFBTzs0QkFFekIsQ0FBQztLQUlQOzs7O0lBRWpCLElBQUksU0FBUztRQUNYLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUNoQzs7OztJQUVELElBQUksY0FBYztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7S0FDOUI7Ozs7SUFFRCxJQUFJLGNBQWM7O1FBQ2hCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUM3RDs7OztJQUVELElBQUksY0FBYztRQUNoQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDN0Q7Ozs7SUFFRCxJQUFJLFlBQVk7O1FBRWQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUV4QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7UUFFeEQsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNsRCxNQUFNLENBQUM7Z0JBQ0wsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBRS9EOzs7O0lBRUQsSUFBSSxZQUFZO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ2pEOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyQjs7OztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFFZCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUUzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztTQUMvQixDQUFDLENBQUM7S0FFSjs7O1lBMUdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBNEJYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLGdzQkFBZ3NCLENBQUM7YUFDM3NCOzs7Ozs0QkFHRSxLQUFLOzJCQUVMLEtBQUs7a0JBRUwsS0FBSztvQkFFTCxlQUFlLFNBQUMsd0JBQXdCOzJCQUV4QyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNDYXJvdXNlbEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2RlYy1jYXJvdXNlbC1pdGVtL2RlYy1jYXJvdXNlbC1pdGVtLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIml0ZW1zXCIgY2xhc3M9XCJkZWMtY2Fyb3VzZWwtd3JhcHBlclwiIGZ4TGF5b3V0PVwicm93XCIgW2Z4TGF5b3V0R2FwXT1cImdhcFwiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiPlxuXG4gIDxkaXYgZnhGbGV4PVwiMjRweFwiICpuZ0lmPVwic2hvd05hdmlnYXRvcnNcIj5cbiAgICA8ZGl2IChjbGljayk9XCJnb1ByZXYoKVwiICpuZ0lmPVwic2hvd1ByZXZCdXR0b25cIiBjbGFzcz1cImRlYy1jYXJvdXNlbC1uYXZpZ2F0b3IgZGVjLWNhcm91c2VsLW5hdmlnYXRvci1sZWZ0XCI+PC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4PlxuXG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIFtmeExheW91dEdhcF09XCJnYXBcIj5cblxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiB2aXNpYmxlSXRlbXM7XCIgY2xhc3M9XCJkZWMtY2Fyb3VzZWwtaXRlbVwiIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBzZWxlY3RlZEluZGV4ID09PSBpdGVtLmluZGV4fVwiXG4gICAgICAgIFtmeEZsZXhdPVwiaXRlbVdpZHRoXCIgKGNsaWNrKT1cInNlbGVjdEl0ZW0oaXRlbS5pbmRleClcIj5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbS5jb21wb25lbnQudGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4PVwiMjRweFwiICpuZ0lmPVwic2hvd05hdmlnYXRvcnNcIj5cbiAgICA8ZGl2IChjbGljayk9XCJnb05leHQoKVwiICpuZ0lmPVwic2hvd05leHRCdXR0b25cIiBjbGFzcz1cImRlYy1jYXJvdXNlbC1uYXZpZ2F0b3IgZGVjLWNhcm91c2VsLW5hdmlnYXRvci1yaWdodFwiPjwvZGl2PlxuICA8L2Rpdj5cblxuPC9kaXY+XG5cbjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbmAsXG4gIHN0eWxlczogW2AuZGVjLWNhcm91c2VsLXdyYXBwZXJ7cGFkZGluZzoycHh9LmRlYy1jYXJvdXNlbC13cmFwcGVyIC5kZWMtY2Fyb3VzZWwtaXRlbXtib3JkZXI6MXB4IHNvbGlkICMwMDA7cGFkZGluZzo0cHg7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1jYXJvdXNlbC13cmFwcGVyIC5kZWMtY2Fyb3VzZWwtaXRlbS5zZWxlY3RlZHtib3JkZXItY29sb3I6I2RhYTUyMH0uZGVjLWNhcm91c2VsLXdyYXBwZXIgLmRlYy1jYXJvdXNlbC1uYXZpZ2F0b3J7Y3Vyc29yOnBvaW50ZXI7Ym9yZGVyOnNvbGlkIHJnYmEoMCwwLDAsLjUpO2JvcmRlci13aWR0aDowIDRweCA0cHggMDtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjEycHg7bWFyZ2luOjRweDstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9LmRlYy1jYXJvdXNlbC13cmFwcGVyIC5kZWMtY2Fyb3VzZWwtbmF2aWdhdG9yLWxlZnR7dHJhbnNmb3JtOnJvdGF0ZSgxMzVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxMzVkZWcpfS5kZWMtY2Fyb3VzZWwtd3JhcHBlciAuZGVjLWNhcm91c2VsLW5hdmlnYXRvci1yaWdodHt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7bWFyZ2luLWxlZnQ6LThweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNDYXJvdXNlbENvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgc2VsZWN0ZWRJbmRleCA9IDA7XG5cbiAgQElucHV0KCkgaXRlbXNQZXJQYWdlID0gNDtcblxuICBASW5wdXQoKSBnYXAgPSAnOHB4JztcblxuICBAQ29udGVudENoaWxkcmVuKERlY0Nhcm91c2VsSXRlbUNvbXBvbmVudCkgaXRlbXM6IFF1ZXJ5TGlzdDxEZWNDYXJvdXNlbEl0ZW1Db21wb25lbnQ+O1xuXG4gIEBPdXRwdXQoKSBpdGVtU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIGluaXRpYWxJbmRleCA9IDA7XG5cbiAgcHJpdmF0ZSBmaW5hbEluZGV4O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgZ2V0IGl0ZW1XaWR0aCgpIHtcbiAgICByZXR1cm4gMTAwIC8gdGhpcy5pdGVtc1BlclBhZ2U7XG4gIH1cblxuICBnZXQgc2hvd1ByZXZCdXR0b24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5pdGlhbEluZGV4ID4gMDtcbiAgfVxuXG4gIGdldCBzaG93TmV4dEJ1dHRvbigpIHtcbiAgICBjb25zdCB0b3RhbEl0ZW1zID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgcmV0dXJuIHRoaXMuaW5pdGlhbEluZGV4IDwgKHRvdGFsSXRlbXMgLSB0aGlzLml0ZW1zUGVyUGFnZSk7XG4gIH1cblxuICBnZXQgc2hvd05hdmlnYXRvcnMoKSB7XG4gICAgcmV0dXJuICF0aGlzLml0ZW1zIHx8IHRoaXMuaXRlbXMubGVuZ3RoID4gdGhpcy5pdGVtc1BlclBhZ2U7XG4gIH1cblxuICBnZXQgdmlzaWJsZUl0ZW1zKCkge1xuXG4gICAgY29uc3QgaXRlbXNBcnJheSA9IHRoaXMuaXRlbXMudG9BcnJheSgpO1xuXG4gICAgdGhpcy5maW5hbEluZGV4ID0gdGhpcy5pbml0aWFsSW5kZXggKyB0aGlzLml0ZW1zUGVyUGFnZTtcblxuICAgIGNvbnN0IGl0ZW1zT2JqZWN0cyA9IGl0ZW1zQXJyYXkubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBjb21wb25lbnQ6IGl0ZW1cbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaXRlbXNPYmplY3RzLnNsaWNlKHRoaXMuaW5pdGlhbEluZGV4LCB0aGlzLmZpbmFsSW5kZXgpO1xuXG4gIH1cblxuICBnZXQgc2VsZWN0ZWRJdGVtKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLnRvQXJyYXkoKVt0aGlzLnNlbGVjdGVkSW5kZXhdO1xuICB9XG5cbiAgZ29QcmV2KCkge1xuICAgIHRoaXMuaW5pdGlhbEluZGV4LS07XG4gIH1cblxuICBnb05leHQoKSB7XG4gICAgdGhpcy5pbml0aWFsSW5kZXgrKztcbiAgfVxuXG4gIHNlbGVjdEl0ZW0oaW5kZXgpIHtcblxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuXG4gICAgdGhpcy5pdGVtU2VsZWN0ZWQuZW1pdCh7XG4gICAgICBpbmRleDogdGhpcy5zZWxlY3RlZEluZGV4LFxuICAgICAgdmFsdWU6IHRoaXMuc2VsZWN0ZWRJdGVtLnZhbHVlXG4gICAgfSk7XG5cbiAgfVxuXG59XG4iXX0=