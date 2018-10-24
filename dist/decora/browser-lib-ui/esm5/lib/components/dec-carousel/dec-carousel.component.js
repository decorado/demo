/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { DecCarouselItemComponent } from './dec-carousel-item/dec-carousel-item.component';
var DecCarouselComponent = /** @class */ (function () {
    function DecCarouselComponent() {
        this.selectedIndex = 0;
        this.itemsPerPage = 4;
        this.gap = '8px';
        this.itemSelected = new EventEmitter();
        this.initialIndex = 0;
    }
    Object.defineProperty(DecCarouselComponent.prototype, "itemWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return 100 / this.itemsPerPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecCarouselComponent.prototype, "showPrevButton", {
        get: /**
         * @return {?}
         */
        function () {
            return this.initialIndex > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecCarouselComponent.prototype, "showNextButton", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var totalItems = this.items.length;
            return this.initialIndex < (totalItems - this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecCarouselComponent.prototype, "showNavigators", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.items || this.items.length > this.itemsPerPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecCarouselComponent.prototype, "visibleItems", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var itemsArray = this.items.toArray();
            this.finalIndex = this.initialIndex + this.itemsPerPage;
            /** @type {?} */
            var itemsObjects = itemsArray.map(function (item, index) {
                return {
                    index: index,
                    component: item
                };
            });
            return itemsObjects.slice(this.initialIndex, this.finalIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecCarouselComponent.prototype, "selectedItem", {
        get: /**
         * @return {?}
         */
        function () {
            return this.items.toArray()[this.selectedIndex];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecCarouselComponent.prototype.goPrev = /**
     * @return {?}
     */
    function () {
        this.initialIndex--;
    };
    /**
     * @return {?}
     */
    DecCarouselComponent.prototype.goNext = /**
     * @return {?}
     */
    function () {
        this.initialIndex++;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    DecCarouselComponent.prototype.selectItem = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.selectedIndex = index;
        this.itemSelected.emit({
            index: this.selectedIndex,
            value: this.selectedItem.value
        });
    };
    DecCarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-carousel',
                    template: "<div *ngIf=\"items\" class=\"dec-carousel-wrapper\" fxLayout=\"row\" [fxLayoutGap]=\"gap\" fxLayoutAlign=\"space-between center\">\n\n  <div fxFlex=\"24px\" *ngIf=\"showNavigators\">\n    <div (click)=\"goPrev()\" *ngIf=\"showPrevButton\" class=\"dec-carousel-navigator dec-carousel-navigator-left\"></div>\n  </div>\n\n  <div fxFlex>\n\n    <div fxLayout=\"row\" [fxLayoutGap]=\"gap\">\n\n      <div *ngFor=\"let item of visibleItems;\" class=\"dec-carousel-item\" [ngClass]=\"{'selected': selectedIndex === item.index}\"\n        [fxFlex]=\"itemWidth\" (click)=\"selectItem(item.index)\">\n\n        <ng-template [ngTemplateOutlet]=\"item.component.template\"></ng-template>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div fxFlex=\"24px\" *ngIf=\"showNavigators\">\n    <div (click)=\"goNext()\" *ngIf=\"showNextButton\" class=\"dec-carousel-navigator dec-carousel-navigator-right\"></div>\n  </div>\n\n</div>\n\n<ng-content></ng-content>\n",
                    styles: [".dec-carousel-wrapper{padding:2px}.dec-carousel-wrapper .dec-carousel-item{border:1px solid #000;padding:4px;cursor:pointer}.dec-carousel-wrapper .dec-carousel-item.selected{border-color:#daa520}.dec-carousel-wrapper .dec-carousel-navigator{cursor:pointer;border:solid rgba(0,0,0,.5);border-width:0 4px 4px 0;display:inline-block;padding:12px;margin:4px;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.dec-carousel-wrapper .dec-carousel-navigator-left{transform:rotate(135deg);-webkit-transform:rotate(135deg)}.dec-carousel-wrapper .dec-carousel-navigator-right{transform:rotate(-45deg);-webkit-transform:rotate(-45deg);margin-left:-8px}"]
                },] },
    ];
    /** @nocollapse */
    DecCarouselComponent.ctorParameters = function () { return []; };
    DecCarouselComponent.propDecorators = {
        selectedIndex: [{ type: Input }],
        itemsPerPage: [{ type: Input }],
        gap: [{ type: Input }],
        items: [{ type: ContentChildren, args: [DecCarouselItemComponent,] }],
        itemSelected: [{ type: Output }]
    };
    return DecCarouselComponent;
}());
export { DecCarouselComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtY2Fyb3VzZWwvZGVjLWNhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOztJQW1EekY7NkJBZHlCLENBQUM7NEJBRUYsQ0FBQzttQkFFVixLQUFLOzRCQUlLLElBQUksWUFBWSxFQUFPOzRCQUV6QixDQUFDO0tBSVA7SUFFakIsc0JBQUksMkNBQVM7Ozs7UUFBYjtZQUNFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUNoQzs7O09BQUE7SUFFRCxzQkFBSSxnREFBYzs7OztRQUFsQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUM5Qjs7O09BQUE7SUFFRCxzQkFBSSxnREFBYzs7OztRQUFsQjs7WUFDRSxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDN0Q7OztPQUFBO0lBRUQsc0JBQUksZ0RBQWM7Ozs7UUFBbEI7WUFDRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDN0Q7OztPQUFBO0lBRUQsc0JBQUksOENBQVk7Ozs7UUFBaEI7O1lBRUUsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV4QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7WUFFeEQsSUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO2dCQUM5QyxNQUFNLENBQUM7b0JBQ0wsS0FBSyxFQUFFLEtBQUs7b0JBQ1osU0FBUyxFQUFFLElBQUk7aUJBQ2hCLENBQUM7YUFDSCxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUUvRDs7O09BQUE7SUFFRCxzQkFBSSw4Q0FBWTs7OztRQUFoQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNqRDs7O09BQUE7Ozs7SUFFRCxxQ0FBTTs7O0lBQU47UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7Ozs7SUFFRCxxQ0FBTTs7O0lBQU47UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7Ozs7O0lBRUQseUNBQVU7Ozs7SUFBVixVQUFXLEtBQUs7UUFFZCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUUzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztTQUMvQixDQUFDLENBQUM7S0FFSjs7Z0JBMUdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLG83QkE0Qlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsZ3NCQUFnc0IsQ0FBQztpQkFDM3NCOzs7OztnQ0FHRSxLQUFLOytCQUVMLEtBQUs7c0JBRUwsS0FBSzt3QkFFTCxlQUFlLFNBQUMsd0JBQXdCOytCQUV4QyxNQUFNOzsrQkE5Q1Q7O1NBb0NhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjQ2Fyb3VzZWxJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtY2Fyb3VzZWwtaXRlbS9kZWMtY2Fyb3VzZWwtaXRlbS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJpdGVtc1wiIGNsYXNzPVwiZGVjLWNhcm91c2VsLXdyYXBwZXJcIiBmeExheW91dD1cInJvd1wiIFtmeExheW91dEdhcF09XCJnYXBcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cblxuICA8ZGl2IGZ4RmxleD1cIjI0cHhcIiAqbmdJZj1cInNob3dOYXZpZ2F0b3JzXCI+XG4gICAgPGRpdiAoY2xpY2spPVwiZ29QcmV2KClcIiAqbmdJZj1cInNob3dQcmV2QnV0dG9uXCIgY2xhc3M9XCJkZWMtY2Fyb3VzZWwtbmF2aWdhdG9yIGRlYy1jYXJvdXNlbC1uYXZpZ2F0b3ItbGVmdFwiPjwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGZ4RmxleD5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBbZnhMYXlvdXRHYXBdPVwiZ2FwXCI+XG5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdmlzaWJsZUl0ZW1zO1wiIGNsYXNzPVwiZGVjLWNhcm91c2VsLWl0ZW1cIiBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogc2VsZWN0ZWRJbmRleCA9PT0gaXRlbS5pbmRleH1cIlxuICAgICAgICBbZnhGbGV4XT1cIml0ZW1XaWR0aFwiIChjbGljayk9XCJzZWxlY3RJdGVtKGl0ZW0uaW5kZXgpXCI+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIml0ZW0uY29tcG9uZW50LnRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuICA8ZGl2IGZ4RmxleD1cIjI0cHhcIiAqbmdJZj1cInNob3dOYXZpZ2F0b3JzXCI+XG4gICAgPGRpdiAoY2xpY2spPVwiZ29OZXh0KClcIiAqbmdJZj1cInNob3dOZXh0QnV0dG9uXCIgY2xhc3M9XCJkZWMtY2Fyb3VzZWwtbmF2aWdhdG9yIGRlYy1jYXJvdXNlbC1uYXZpZ2F0b3ItcmlnaHRcIj48L2Rpdj5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuXG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1jYXJvdXNlbC13cmFwcGVye3BhZGRpbmc6MnB4fS5kZWMtY2Fyb3VzZWwtd3JhcHBlciAuZGVjLWNhcm91c2VsLWl0ZW17Ym9yZGVyOjFweCBzb2xpZCAjMDAwO3BhZGRpbmc6NHB4O2N1cnNvcjpwb2ludGVyfS5kZWMtY2Fyb3VzZWwtd3JhcHBlciAuZGVjLWNhcm91c2VsLWl0ZW0uc2VsZWN0ZWR7Ym9yZGVyLWNvbG9yOiNkYWE1MjB9LmRlYy1jYXJvdXNlbC13cmFwcGVyIC5kZWMtY2Fyb3VzZWwtbmF2aWdhdG9ye2N1cnNvcjpwb2ludGVyO2JvcmRlcjpzb2xpZCByZ2JhKDAsMCwwLC41KTtib3JkZXItd2lkdGg6MCA0cHggNHB4IDA7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzoxMnB4O21hcmdpbjo0cHg7LXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5kZWMtY2Fyb3VzZWwtd3JhcHBlciAuZGVjLWNhcm91c2VsLW5hdmlnYXRvci1sZWZ0e3RyYW5zZm9ybTpyb3RhdGUoMTM1ZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTM1ZGVnKX0uZGVjLWNhcm91c2VsLXdyYXBwZXIgLmRlYy1jYXJvdXNlbC1uYXZpZ2F0b3ItcmlnaHR7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpO21hcmdpbi1sZWZ0Oi04cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQ2Fyb3VzZWxDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIHNlbGVjdGVkSW5kZXggPSAwO1xuXG4gIEBJbnB1dCgpIGl0ZW1zUGVyUGFnZSA9IDQ7XG5cbiAgQElucHV0KCkgZ2FwID0gJzhweCc7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihEZWNDYXJvdXNlbEl0ZW1Db21wb25lbnQpIGl0ZW1zOiBRdWVyeUxpc3Q8RGVjQ2Fyb3VzZWxJdGVtQ29tcG9uZW50PjtcblxuICBAT3V0cHV0KCkgaXRlbVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBpbml0aWFsSW5kZXggPSAwO1xuXG4gIHByaXZhdGUgZmluYWxJbmRleDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGdldCBpdGVtV2lkdGgoKSB7XG4gICAgcmV0dXJuIDEwMCAvIHRoaXMuaXRlbXNQZXJQYWdlO1xuICB9XG5cbiAgZ2V0IHNob3dQcmV2QnV0dG9uKCkge1xuICAgIHJldHVybiB0aGlzLmluaXRpYWxJbmRleCA+IDA7XG4gIH1cblxuICBnZXQgc2hvd05leHRCdXR0b24oKSB7XG4gICAgY29uc3QgdG90YWxJdGVtcyA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgIHJldHVybiB0aGlzLmluaXRpYWxJbmRleCA8ICh0b3RhbEl0ZW1zIC0gdGhpcy5pdGVtc1BlclBhZ2UpO1xuICB9XG5cbiAgZ2V0IHNob3dOYXZpZ2F0b3JzKCkge1xuICAgIHJldHVybiAhdGhpcy5pdGVtcyB8fCB0aGlzLml0ZW1zLmxlbmd0aCA+IHRoaXMuaXRlbXNQZXJQYWdlO1xuICB9XG5cbiAgZ2V0IHZpc2libGVJdGVtcygpIHtcblxuICAgIGNvbnN0IGl0ZW1zQXJyYXkgPSB0aGlzLml0ZW1zLnRvQXJyYXkoKTtcblxuICAgIHRoaXMuZmluYWxJbmRleCA9IHRoaXMuaW5pdGlhbEluZGV4ICsgdGhpcy5pdGVtc1BlclBhZ2U7XG5cbiAgICBjb25zdCBpdGVtc09iamVjdHMgPSBpdGVtc0FycmF5Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgY29tcG9uZW50OiBpdGVtXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGl0ZW1zT2JqZWN0cy5zbGljZSh0aGlzLmluaXRpYWxJbmRleCwgdGhpcy5maW5hbEluZGV4KTtcblxuICB9XG5cbiAgZ2V0IHNlbGVjdGVkSXRlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy50b0FycmF5KClbdGhpcy5zZWxlY3RlZEluZGV4XTtcbiAgfVxuXG4gIGdvUHJldigpIHtcbiAgICB0aGlzLmluaXRpYWxJbmRleC0tO1xuICB9XG5cbiAgZ29OZXh0KCkge1xuICAgIHRoaXMuaW5pdGlhbEluZGV4Kys7XG4gIH1cblxuICBzZWxlY3RJdGVtKGluZGV4KSB7XG5cbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcblxuICAgIHRoaXMuaXRlbVNlbGVjdGVkLmVtaXQoe1xuICAgICAgaW5kZXg6IHRoaXMuc2VsZWN0ZWRJbmRleCxcbiAgICAgIHZhbHVlOiB0aGlzLnNlbGVjdGVkSXRlbS52YWx1ZVxuICAgIH0pO1xuXG4gIH1cblxufVxuIl19