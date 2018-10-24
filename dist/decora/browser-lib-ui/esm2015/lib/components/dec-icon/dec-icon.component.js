/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
export class DecIconComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout(() => {
            try {
                this.icon = this.textElement.nativeElement.textContent;
            }
            catch (error) { }
        }, 0);
    }
}
DecIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-icon',
                template: `<span class="dec-icon">

  <ng-container [ngSwitch]="font">
    <ng-container *ngSwitchCase="'mat'">
      <i class="material-icons dec-icon" aria-hidden="true">{{icon}}</i>
    </ng-container>
    <ng-container *ngSwitchCase="'fas'">
      <i class="fa {{'fa-'+icon}} dec-icon" aria-hidden="true"></i>
    </ng-container>
  </ng-container>

  <span #text [hidden]="true">
    <ng-content></ng-content>
  </span>

</span>
`,
                styles: [`.material-icons{color:inherit;font-size:inherit;display:inline-block;-webkit-transform:translateY(16%);transform:translateY(16%);-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}`]
            },] },
];
/** @nocollapse */
DecIconComponent.ctorParameters = () => [];
DecIconComponent.propDecorators = {
    font: [{ type: Input }],
    textElement: [{ type: ViewChild, args: ['text',] }]
};
if (false) {
    /** @type {?} */
    DecIconComponent.prototype.icon;
    /** @type {?} */
    DecIconComponent.prototype.font;
    /** @type {?} */
    DecIconComponent.prototype.textElement;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pY29uL2RlYy1pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUF1QnZGLE1BQU07SUFRSixpQkFBaUI7Ozs7SUFFakIsZUFBZTtRQUNiLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7YUFDeEQ7WUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO1NBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDUDs7O1lBckNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0NBZ0JYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLG1QQUFtUCxDQUFDO2FBQzlQOzs7OzttQkFLRSxLQUFLOzBCQUVMLFNBQVMsU0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1pY29uJyxcbiAgdGVtcGxhdGU6IGA8c3BhbiBjbGFzcz1cImRlYy1pY29uXCI+XG5cbiAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiZm9udFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidtYXQnXCI+XG4gICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGRlYy1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+e3tpY29ufX08L2k+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2ZhcydcIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEge3snZmEtJytpY29ufX0gZGVjLWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxzcGFuICN0ZXh0IFtoaWRkZW5dPVwidHJ1ZVwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9zcGFuPlxuXG48L3NwYW4+XG5gLFxuICBzdHlsZXM6IFtgLm1hdGVyaWFsLWljb25ze2NvbG9yOmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7ZGlzcGxheTppbmxpbmUtYmxvY2s7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgxNiUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDE2JSk7LXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ljb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBpY29uOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZm9udDogJ21hdCcgfCAnZmFzJztcblxuICBAVmlld0NoaWxkKCd0ZXh0JykgdGV4dEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmljb24gPSB0aGlzLnRleHRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG4gICAgfSwgMCk7XG4gIH1cblxufVxuIl19