/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { CarouselConfig } from './carousel-config';
export class DecGalleryComponent {
    constructor() {
        this.carouselConfig = CarouselConfig;
        this._images = [];
        this.onSelectImage = ($event, sysFile) => {
            if (this.activeImage && this.activeImage !== $event.target) {
                this.activeImage.className = '';
            }
            $event.target.className = 'active';
            this.activeImage = $event.target;
            this.imageHighlight = sysFile;
            this.setExternalLink();
        };
        this.setExternalLink = () => {
            if (this.imageHighlight) {
                this.imgExternalLink = this.imageHighlight.fileUrl;
            }
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set images(value) {
        value = value || new Array();
        if (value && (JSON.stringify(value) !== JSON.stringify(this._images))) {
            this.imageHighlight = value[0];
            this._images = value;
            this.setExternalLink();
        }
    }
    /**
     * @return {?}
     */
    get images() {
        return this._images;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInitDataFn(event) {
        this.setPrevNextCheckers(event.isFirst, event.items >= this.images.length);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMoveFn(event) {
        this.setPrevNextCheckers(event.isFirst, event.isLast);
    }
    /**
     * @param {?} first
     * @param {?} last
     * @return {?}
     */
    setPrevNextCheckers(first, last) {
        setTimeout(() => {
            this.isFirst = first;
            this.isLast = last;
        }, 0);
    }
}
DecGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-gallery',
                template: `<div class="dec-gallery-wrapper">

  <div class="image-highlighted">
      <dec-image-zoom
        [size]="{width: 620, height: 620}"
        [systemFile]="imageHighlight">
      </dec-image-zoom>
  </div>

  <div class="text-right" *ngIf="imgExternalLink">

    <a href="{{ imgExternalLink }}" target="_blank">{{ 'label.image-link' | translate }}</a>

  </div>

  <ngu-carousel class="carousel-wrapper" [inputs]="carouselConfig" (initData)="onInitDataFn($event)" (onMove)="onMoveFn($event)">

    <ngu-item NguCarouselItem *ngFor="let image of images" [class.active]="image == imageHighlight">

      <img [decImage]="image" [decImageSize]="{width:300, height:300}" (click)="onSelectImage($event,image)">

    </ngu-item>

    <mat-icon NguCarouselPrev class="left-previous" [ngClass]="{'disabled': isFirst}">chevron_left</mat-icon>

    <mat-icon NguCarouselNext class="right-next" [ngClass]="{'disabled': isLast}">chevron_right</mat-icon>

  </ngu-carousel>

</div>
`,
                styles: [`.dec-gallery-wrapper{max-width:624px;overflow:hidden}.dec-gallery-wrapper .image-highlighted{border:2px solid #f5f5f5;width:620px;height:620px}.dec-gallery-wrapper a{font-size:10px;text-decoration:none;color:#929292;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper{margin-top:8px;padding:0 24px;height:128px}.dec-gallery-wrapper .carousel-wrapper ngu-item{display:flex;justify-content:center;align-items:center}.dec-gallery-wrapper .carousel-wrapper ngu-item.active img,.dec-gallery-wrapper .carousel-wrapper ngu-item:hover img{border:2px solid #232e38}.dec-gallery-wrapper .carousel-wrapper ngu-item img{max-width:124px;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper .left-previous,.dec-gallery-wrapper .carousel-wrapper .right-next{display:block!important;position:absolute;top:calc(50% - 12px);cursor:pointer;text-shadow:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.dec-gallery-wrapper .carousel-wrapper .left-previous:hover,.dec-gallery-wrapper .carousel-wrapper .right-next:hover{text-shadow:0 0 6px rgba(0,0,0,.2)}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled{opacity:.4}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled:hover,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled:hover{text-shadow:none}.dec-gallery-wrapper .carousel-wrapper .left-previous{left:0}.dec-gallery-wrapper .carousel-wrapper .right-next{right:0}`]
            },] },
];
/** @nocollapse */
DecGalleryComponent.ctorParameters = () => [];
DecGalleryComponent.propDecorators = {
    images: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DecGalleryComponent.prototype.imageHighlight;
    /** @type {?} */
    DecGalleryComponent.prototype.activeImage;
    /** @type {?} */
    DecGalleryComponent.prototype.imgExternalLink;
    /** @type {?} */
    DecGalleryComponent.prototype.isFirst;
    /** @type {?} */
    DecGalleryComponent.prototype.isLast;
    /** @type {?} */
    DecGalleryComponent.prototype.carouselConfig;
    /** @type {?} */
    DecGalleryComponent.prototype._images;
    /** @type {?} */
    DecGalleryComponent.prototype.onSelectImage;
    /** @type {?} */
    DecGalleryComponent.prototype.setExternalLink;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWdhbGxlcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2dhbGxlcnkvZGVjLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFzQ25ELE1BQU07SUF1Q0o7OEJBM0JpQixjQUFjO3VCQXlCTixFQUFFOzZCQUlYLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBRWxDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFFM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2FBRWpDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBRW5DLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUVqQyxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztZQUU5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FFeEI7K0JBRWlCLEdBQUcsRUFBRTtZQUVyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFFeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQzthQUVwRDtTQUVGO0tBNUJnQjs7Ozs7SUF6QmpCLElBQ0ksTUFBTSxDQUFDLEtBQVk7UUFFckIsS0FBSyxHQUFHLEtBQUssSUFBSSxJQUFJLEtBQUssRUFBTyxDQUFDO1FBRWxDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBRXhCO0tBRUY7Ozs7SUFFRCxJQUFJLE1BQU07UUFFUixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUVyQjs7Ozs7SUFrQ0QsWUFBWSxDQUFDLEtBQXVCO1FBRWxDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUU1RTs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBdUI7UUFFOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBRXZEOzs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxLQUFjLEVBQUUsSUFBYTtRQUUvQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBRWQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FFcEIsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUVQOzs7WUE5SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQThCWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyw4OENBQTg4QyxDQUFDO2FBQ3o5Qzs7Ozs7cUJBZUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcm91c2VsQ29uZmlnIH0gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxTdG9yZSB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwvc3JjL25ndS1jYXJvdXNlbC9uZ3UtY2Fyb3VzZWwuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWdhbGxlcnknLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtZ2FsbGVyeS13cmFwcGVyXCI+XG5cbiAgPGRpdiBjbGFzcz1cImltYWdlLWhpZ2hsaWdodGVkXCI+XG4gICAgICA8ZGVjLWltYWdlLXpvb21cbiAgICAgICAgW3NpemVdPVwie3dpZHRoOiA2MjAsIGhlaWdodDogNjIwfVwiXG4gICAgICAgIFtzeXN0ZW1GaWxlXT1cImltYWdlSGlnaGxpZ2h0XCI+XG4gICAgICA8L2RlYy1pbWFnZS16b29tPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodFwiICpuZ0lmPVwiaW1nRXh0ZXJuYWxMaW5rXCI+XG5cbiAgICA8YSBocmVmPVwie3sgaW1nRXh0ZXJuYWxMaW5rIH19XCIgdGFyZ2V0PVwiX2JsYW5rXCI+e3sgJ2xhYmVsLmltYWdlLWxpbmsnIHwgdHJhbnNsYXRlIH19PC9hPlxuXG4gIDwvZGl2PlxuXG4gIDxuZ3UtY2Fyb3VzZWwgY2xhc3M9XCJjYXJvdXNlbC13cmFwcGVyXCIgW2lucHV0c109XCJjYXJvdXNlbENvbmZpZ1wiIChpbml0RGF0YSk9XCJvbkluaXREYXRhRm4oJGV2ZW50KVwiIChvbk1vdmUpPVwib25Nb3ZlRm4oJGV2ZW50KVwiPlxuXG4gICAgPG5ndS1pdGVtIE5ndUNhcm91c2VsSXRlbSAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgaW1hZ2VzXCIgW2NsYXNzLmFjdGl2ZV09XCJpbWFnZSA9PSBpbWFnZUhpZ2hsaWdodFwiPlxuXG4gICAgICA8aW1nIFtkZWNJbWFnZV09XCJpbWFnZVwiIFtkZWNJbWFnZVNpemVdPVwie3dpZHRoOjMwMCwgaGVpZ2h0OjMwMH1cIiAoY2xpY2spPVwib25TZWxlY3RJbWFnZSgkZXZlbnQsaW1hZ2UpXCI+XG5cbiAgICA8L25ndS1pdGVtPlxuXG4gICAgPG1hdC1pY29uIE5ndUNhcm91c2VsUHJldiBjbGFzcz1cImxlZnQtcHJldmlvdXNcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXNGaXJzdH1cIj5jaGV2cm9uX2xlZnQ8L21hdC1pY29uPlxuXG4gICAgPG1hdC1pY29uIE5ndUNhcm91c2VsTmV4dCBjbGFzcz1cInJpZ2h0LW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXNMYXN0fVwiPmNoZXZyb25fcmlnaHQ8L21hdC1pY29uPlxuXG4gIDwvbmd1LWNhcm91c2VsPlxuXG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLWdhbGxlcnktd3JhcHBlcnttYXgtd2lkdGg6NjI0cHg7b3ZlcmZsb3c6aGlkZGVufS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5pbWFnZS1oaWdobGlnaHRlZHtib3JkZXI6MnB4IHNvbGlkICNmNWY1ZjU7d2lkdGg6NjIwcHg7aGVpZ2h0OjYyMHB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIGF7Zm9udC1zaXplOjEwcHg7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y29sb3I6IzkyOTI5MjtjdXJzb3I6cG9pbnRlcn0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlcnttYXJnaW4tdG9wOjhweDtwYWRkaW5nOjAgMjRweDtoZWlnaHQ6MTI4cHh9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW17ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtLmFjdGl2ZSBpbWcsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW06aG92ZXIgaW1ne2JvcmRlcjoycHggc29saWQgIzIzMmUzOH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbSBpbWd7bWF4LXdpZHRoOjEyNHB4O2N1cnNvcjpwb2ludGVyfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0e2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O3Bvc2l0aW9uOmFic29sdXRlO3RvcDpjYWxjKDUwJSAtIDEycHgpO2N1cnNvcjpwb2ludGVyO3RleHQtc2hhZG93Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzOmhvdmVyLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0OmhvdmVye3RleHQtc2hhZG93OjAgMCA2cHggcmdiYSgwLDAsMCwuMil9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMuZGlzYWJsZWQsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQuZGlzYWJsZWR7b3BhY2l0eTouNH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cy5kaXNhYmxlZDpob3ZlciwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dC5kaXNhYmxlZDpob3Zlcnt0ZXh0LXNoYWRvdzpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3Vze2xlZnQ6MH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dHtyaWdodDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dhbGxlcnlDb21wb25lbnQge1xuXG4gIGltYWdlSGlnaGxpZ2h0OiBhbnk7XG5cbiAgYWN0aXZlSW1hZ2U6IEVsZW1lbnQ7XG5cbiAgaW1nRXh0ZXJuYWxMaW5rOiBzdHJpbmc7XG5cbiAgaXNGaXJzdDogYm9vbGVhbjtcblxuICBpc0xhc3Q6IGJvb2xlYW47XG5cbiAgY2Fyb3VzZWxDb25maWcgPSBDYXJvdXNlbENvbmZpZztcblxuICBASW5wdXQoKVxuICBzZXQgaW1hZ2VzKHZhbHVlOiBhbnlbXSkge1xuXG4gICAgdmFsdWUgPSB2YWx1ZSB8fCBuZXcgQXJyYXk8YW55PigpO1xuXG4gICAgaWYgKHZhbHVlICYmIChKU09OLnN0cmluZ2lmeSh2YWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuX2ltYWdlcykpKSB7XG5cbiAgICAgIHRoaXMuaW1hZ2VIaWdobGlnaHQgPSB2YWx1ZVswXTtcblxuICAgICAgdGhpcy5faW1hZ2VzID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuc2V0RXh0ZXJuYWxMaW5rKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBpbWFnZXMoKTogYW55W10ge1xuXG4gICAgcmV0dXJuIHRoaXMuX2ltYWdlcztcblxuICB9XG5cbiAgcHJpdmF0ZSBfaW1hZ2VzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgb25TZWxlY3RJbWFnZSA9ICgkZXZlbnQsIHN5c0ZpbGUpID0+IHtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUltYWdlICYmIHRoaXMuYWN0aXZlSW1hZ2UgIT09ICRldmVudC50YXJnZXQpIHtcblxuICAgICAgdGhpcy5hY3RpdmVJbWFnZS5jbGFzc05hbWUgPSAnJztcblxuICAgIH1cblxuICAgICRldmVudC50YXJnZXQuY2xhc3NOYW1lID0gJ2FjdGl2ZSc7XG5cbiAgICB0aGlzLmFjdGl2ZUltYWdlID0gJGV2ZW50LnRhcmdldDtcblxuICAgIHRoaXMuaW1hZ2VIaWdobGlnaHQgPSBzeXNGaWxlO1xuXG4gICAgdGhpcy5zZXRFeHRlcm5hbExpbmsoKTtcblxuICB9XG5cbiAgc2V0RXh0ZXJuYWxMaW5rID0gKCkgPT4ge1xuXG4gICAgaWYgKHRoaXMuaW1hZ2VIaWdobGlnaHQpIHtcblxuICAgICAgdGhpcy5pbWdFeHRlcm5hbExpbmsgPSB0aGlzLmltYWdlSGlnaGxpZ2h0LmZpbGVVcmw7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uSW5pdERhdGFGbihldmVudDogTmd1Q2Fyb3VzZWxTdG9yZSkge1xuXG4gICAgdGhpcy5zZXRQcmV2TmV4dENoZWNrZXJzKGV2ZW50LmlzRmlyc3QsIGV2ZW50Lml0ZW1zID49IHRoaXMuaW1hZ2VzLmxlbmd0aCk7XG5cbiAgfVxuXG4gIG9uTW92ZUZuKGV2ZW50OiBOZ3VDYXJvdXNlbFN0b3JlKSB7XG5cbiAgICB0aGlzLnNldFByZXZOZXh0Q2hlY2tlcnMoZXZlbnQuaXNGaXJzdCwgZXZlbnQuaXNMYXN0KTtcblxuICB9XG5cbiAgc2V0UHJldk5leHRDaGVja2VycyhmaXJzdDogYm9vbGVhbiwgbGFzdDogYm9vbGVhbikge1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuaXNGaXJzdCA9IGZpcnN0O1xuXG4gICAgICB0aGlzLmlzTGFzdCA9IGxhc3Q7XG5cbiAgICB9LCAwKTtcblxuICB9XG5cbn1cbiJdfQ==