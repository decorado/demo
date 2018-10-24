/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { DecProductInfoExtraComponent } from './dec-product-info-extra/dec-product-info-extra.component';
/** @enum {string} */
const PRODUCT_INFO_PROPERTIES = {
    ID: 'ID',
    SKU: 'SKU',
    NAME: 'NAME',
    COMPANY_NAME: 'COMPANY_NAME',
    PROJECT_TITLE: 'PROJECT_TITLE',
    PROJECT_QUOTE: 'PROJECT_QUOTE',
    CATEGORY: 'CATEGORY',
    MEASURES: 'MEASURES',
};
export { PRODUCT_INFO_PROPERTIES };
export class DecProductInfoComponent {
    constructor() {
        this.infoTypes = PRODUCT_INFO_PROPERTIES;
        this.visibleInfo = [];
        this.extraInfos = new QueryList();
    }
    /**
     * @param {?} info
     * @return {?}
     */
    isVisible(info) {
        return this.visibleInfo.indexOf(info) > -1;
    }
}
DecProductInfoComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-product-info',
                template: `<div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px" class="dec-color-grey-dark">

  <h2>
    <dec-icon font="mat">info</dec-icon> {{ 'label.Info' | translate }}
  </h2>

</div>

<br>

<div *ngIf="product" fxLayout="column" fxLayoutGap="16px">

  <div fxFlex *ngIf="isVisible(infoTypes.ID)">
    <div fxLayout="row" fxLayoutGap="8px">
      <div fxFlex="80px" class="dec-color-grey">
        {{ 'label.Product_ID' | translate }}
      </div>
      <strong fxFlex class="dec-color-black">{{ product.id }}</strong>
    </div>
  </div>

  <div fxFlex *ngIf="isVisible(infoTypes.SKU)">
    <div fxLayout="row" fxLayoutGap="8px">
      <div fxFlex="80px" class="dec-color-grey">
        {{ 'label.sku' | translate }}
      </div>
      <strong fxFlex class="dec-color-black">{{ product.sku }}</strong>
    </div>
  </div>

  <div fxFlex *ngIf="isVisible(infoTypes.NAME)">
    <div fxLayout="row" fxLayoutGap="8px">
      <div fxFlex="80px" class="dec-color-grey">
        {{ 'label.Name' | translate }}
      </div>
      <strong fxFlex class="dec-color-black">{{ product.name }}</strong>
    </div>
  </div>

  <div fxFlex *ngIf="isVisible(infoTypes.COMPANY_NAME)">
    <div fxLayout="row" fxLayoutGap="8px">
      <div fxFlex="80px" class="dec-color-grey">
        {{ 'label.Company' | translate }}
      </div>
      <strong fxFlex class="dec-color-black">{{ product.company?.name }}</strong>
    </div>
  </div>

  <div fxFlex *ngIf="isVisible(infoTypes.PROJECT_TITLE)">
    <div fxLayout="row" fxLayoutGap="8px">
      <div fxFlex="80px" class="dec-color-grey">
        {{ 'label.Project' | translate }}
      </div>
      <strong fxFlex class="dec-color-black">{{ product.project?.title }}</strong>
    </div>
  </div>

  <div fxFlex *ngIf="isVisible(infoTypes.PROJECT_QUOTE)">
    <div fxLayout="row" fxLayoutGap="8px">
      <div fxFlex="80px" class="dec-color-grey">
        {{ 'label.Project' | translate }}
      </div>
      <strong fxFlex class="dec-color-black">{{ product.project?.quote }}</strong>
    </div>
  </div>

  <div fxFlex *ngIf="isVisible(infoTypes.CATEGORY)">
    <div fxLayout="row" fxLayoutGap="8px">
      <div fxFlex="80px" class="dec-color-grey">
        {{ 'label.Category' | translate }}
      </div>
      <strong fxFlex class="dec-color-black">{{ product.category | decCategory | async }}</strong>
    </div>
  </div>

  <div fxFlex *ngIf="isVisible(infoTypes.MEASURES)">
    <div fxLayout="row" fxLayoutGap="8px">
      <div fxFlex="80px" class="dec-color-grey">
        {{ 'label.measures' | translate }}
      </div>
      <strong fxLayout="column" fxLayoutGap="4px" class="dec-color-black">
        <div fxFlex>{{ 'label.cubeX' | translate }}: {{ product?.referenceCubeX?.toFixed(2) }} cm</div>
        <div fxFlex>{{ 'label.cubeY' | translate }}: {{ product?.referenceCubeY?.toFixed(2) }} cm</div>
        <div fxFlex>{{ 'label.cubeZ' | translate }}: {{ product?.referenceCubeZ?.toFixed(2) }} cm</div>
      </strong>
    </div>
  </div>

  <div fxFlex *ngFor="let extraInfo of extraInfos">
    <div fxLayout="row" fxLayoutGap="8px">
      <div fxFlex="80px" class="dec-color-grey">
        {{ extraInfo.label }}
      </div>
      <strong fxFlex class="dec-color-black">
        <ng-container [ngTemplateOutlet]="extraInfo.template"></ng-container>
      </strong>
    </div>
  </div>
</div>
`,
                styles: [`.title-icon{font-size:20px}`]
            },] },
];
/** @nocollapse */
DecProductInfoComponent.ctorParameters = () => [];
DecProductInfoComponent.propDecorators = {
    product: [{ type: Input }],
    visibleInfo: [{ type: Input }],
    extraInfos: [{ type: ContentChildren, args: [DecProductInfoExtraComponent,] }]
};
if (false) {
    /** @type {?} */
    DecProductInfoComponent.prototype.infoTypes;
    /** @type {?} */
    DecProductInfoComponent.prototype.product;
    /** @type {?} */
    DecProductInfoComponent.prototype.visibleInfo;
    /** @type {?} */
    DecProductInfoComponent.prototype.extraInfos;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXByb2R1Y3QtaW5mby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXByb2R1Y3QtaW5mby9kZWMtcHJvZHVjdC1pbmZvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQzs7O0lBR3ZHLElBQUssSUFBSTtJQUNULEtBQU0sS0FBSztJQUNYLE1BQU8sTUFBTTtJQUNiLGNBQWUsY0FBYztJQUM3QixlQUFnQixlQUFlO0lBQy9CLGVBQWdCLGVBQWU7SUFDL0IsVUFBVyxVQUFVO0lBQ3JCLFVBQVcsVUFBVTs7O0FBMkd2QixNQUFNO0lBVUo7eUJBUlksdUJBQXVCOzJCQUlGLEVBQUU7MEJBRWtFLElBQUksU0FBUyxFQUFnQztLQUVqSTs7Ozs7SUFFakIsU0FBUyxDQUFDLElBQVk7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzVDOzs7WUF0SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbUdYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLDZCQUE2QixDQUFDO2FBQ3hDOzs7OztzQkFLRSxLQUFLOzBCQUVMLEtBQUs7eUJBRUwsZUFBZSxTQUFDLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNQcm9kdWN0SW5mb0V4dHJhQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtcHJvZHVjdC1pbmZvLWV4dHJhL2RlYy1wcm9kdWN0LWluZm8tZXh0cmEuY29tcG9uZW50JztcblxuZXhwb3J0IGVudW0gUFJPRFVDVF9JTkZPX1BST1BFUlRJRVMge1xuICBJRCA9ICdJRCcsXG4gIFNLVSA9ICdTS1UnLFxuICBOQU1FID0gJ05BTUUnLFxuICBDT01QQU5ZX05BTUUgPSAnQ09NUEFOWV9OQU1FJyxcbiAgUFJPSkVDVF9USVRMRSA9ICdQUk9KRUNUX1RJVExFJyxcbiAgUFJPSkVDVF9RVU9URSA9ICdQUk9KRUNUX1FVT1RFJyxcbiAgQ0FURUdPUlkgPSAnQ0FURUdPUlknLFxuICBNRUFTVVJFUyA9ICdNRUFTVVJFUydcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXByb2R1Y3QtaW5mbycsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjhweFwiIGNsYXNzPVwiZGVjLWNvbG9yLWdyZXktZGFya1wiPlxuXG4gIDxoMj5cbiAgICA8ZGVjLWljb24gZm9udD1cIm1hdFwiPmluZm88L2RlYy1pY29uPiB7eyAnbGFiZWwuSW5mbycgfCB0cmFuc2xhdGUgfX1cbiAgPC9oMj5cblxuPC9kaXY+XG5cbjxicj5cblxuPGRpdiAqbmdJZj1cInByb2R1Y3RcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuXG4gIDxkaXYgZnhGbGV4ICpuZ0lmPVwiaXNWaXNpYmxlKGluZm9UeXBlcy5JRClcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgIDxkaXYgZnhGbGV4PVwiODBweFwiIGNsYXNzPVwiZGVjLWNvbG9yLWdyZXlcIj5cbiAgICAgICAge3sgJ2xhYmVsLlByb2R1Y3RfSUQnIHwgdHJhbnNsYXRlIH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzdHJvbmcgZnhGbGV4IGNsYXNzPVwiZGVjLWNvbG9yLWJsYWNrXCI+e3sgcHJvZHVjdC5pZCB9fTwvc3Ryb25nPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2IGZ4RmxleCAqbmdJZj1cImlzVmlzaWJsZShpbmZvVHlwZXMuU0tVKVwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPGRpdiBmeEZsZXg9XCI4MHB4XCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleVwiPlxuICAgICAgICB7eyAnbGFiZWwuc2t1JyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8c3Ryb25nIGZ4RmxleCBjbGFzcz1cImRlYy1jb2xvci1ibGFja1wiPnt7IHByb2R1Y3Quc2t1IH19PC9zdHJvbmc+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4ICpuZ0lmPVwiaXNWaXNpYmxlKGluZm9UeXBlcy5OQU1FKVwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPGRpdiBmeEZsZXg9XCI4MHB4XCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleVwiPlxuICAgICAgICB7eyAnbGFiZWwuTmFtZScgfCB0cmFuc2xhdGUgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPHN0cm9uZyBmeEZsZXggY2xhc3M9XCJkZWMtY29sb3ItYmxhY2tcIj57eyBwcm9kdWN0Lm5hbWUgfX08L3N0cm9uZz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBmeEZsZXggKm5nSWY9XCJpc1Zpc2libGUoaW5mb1R5cGVzLkNPTVBBTllfTkFNRSlcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgIDxkaXYgZnhGbGV4PVwiODBweFwiIGNsYXNzPVwiZGVjLWNvbG9yLWdyZXlcIj5cbiAgICAgICAge3sgJ2xhYmVsLkNvbXBhbnknIHwgdHJhbnNsYXRlIH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzdHJvbmcgZnhGbGV4IGNsYXNzPVwiZGVjLWNvbG9yLWJsYWNrXCI+e3sgcHJvZHVjdC5jb21wYW55Py5uYW1lIH19PC9zdHJvbmc+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4ICpuZ0lmPVwiaXNWaXNpYmxlKGluZm9UeXBlcy5QUk9KRUNUX1RJVExFKVwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPGRpdiBmeEZsZXg9XCI4MHB4XCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleVwiPlxuICAgICAgICB7eyAnbGFiZWwuUHJvamVjdCcgfCB0cmFuc2xhdGUgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPHN0cm9uZyBmeEZsZXggY2xhc3M9XCJkZWMtY29sb3ItYmxhY2tcIj57eyBwcm9kdWN0LnByb2plY3Q/LnRpdGxlIH19PC9zdHJvbmc+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4ICpuZ0lmPVwiaXNWaXNpYmxlKGluZm9UeXBlcy5QUk9KRUNUX1FVT1RFKVwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPGRpdiBmeEZsZXg9XCI4MHB4XCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleVwiPlxuICAgICAgICB7eyAnbGFiZWwuUHJvamVjdCcgfCB0cmFuc2xhdGUgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPHN0cm9uZyBmeEZsZXggY2xhc3M9XCJkZWMtY29sb3ItYmxhY2tcIj57eyBwcm9kdWN0LnByb2plY3Q/LnF1b3RlIH19PC9zdHJvbmc+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4ICpuZ0lmPVwiaXNWaXNpYmxlKGluZm9UeXBlcy5DQVRFR09SWSlcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgIDxkaXYgZnhGbGV4PVwiODBweFwiIGNsYXNzPVwiZGVjLWNvbG9yLWdyZXlcIj5cbiAgICAgICAge3sgJ2xhYmVsLkNhdGVnb3J5JyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8c3Ryb25nIGZ4RmxleCBjbGFzcz1cImRlYy1jb2xvci1ibGFja1wiPnt7IHByb2R1Y3QuY2F0ZWdvcnkgfCBkZWNDYXRlZ29yeSB8IGFzeW5jIH19PC9zdHJvbmc+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4ICpuZ0lmPVwiaXNWaXNpYmxlKGluZm9UeXBlcy5NRUFTVVJFUylcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgIDxkaXYgZnhGbGV4PVwiODBweFwiIGNsYXNzPVwiZGVjLWNvbG9yLWdyZXlcIj5cbiAgICAgICAge3sgJ2xhYmVsLm1lYXN1cmVzJyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8c3Ryb25nIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCI0cHhcIiBjbGFzcz1cImRlYy1jb2xvci1ibGFja1wiPlxuICAgICAgICA8ZGl2IGZ4RmxleD57eyAnbGFiZWwuY3ViZVgnIHwgdHJhbnNsYXRlIH19OiB7eyBwcm9kdWN0Py5yZWZlcmVuY2VDdWJlWD8udG9GaXhlZCgyKSB9fSBjbTwvZGl2PlxuICAgICAgICA8ZGl2IGZ4RmxleD57eyAnbGFiZWwuY3ViZVknIHwgdHJhbnNsYXRlIH19OiB7eyBwcm9kdWN0Py5yZWZlcmVuY2VDdWJlWT8udG9GaXhlZCgyKSB9fSBjbTwvZGl2PlxuICAgICAgICA8ZGl2IGZ4RmxleD57eyAnbGFiZWwuY3ViZVonIHwgdHJhbnNsYXRlIH19OiB7eyBwcm9kdWN0Py5yZWZlcmVuY2VDdWJlWj8udG9GaXhlZCgyKSB9fSBjbTwvZGl2PlxuICAgICAgPC9zdHJvbmc+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgZnhGbGV4ICpuZ0Zvcj1cImxldCBleHRyYUluZm8gb2YgZXh0cmFJbmZvc1wiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPGRpdiBmeEZsZXg9XCI4MHB4XCIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleVwiPlxuICAgICAgICB7eyBleHRyYUluZm8ubGFiZWwgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPHN0cm9uZyBmeEZsZXggY2xhc3M9XCJkZWMtY29sb3ItYmxhY2tcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJleHRyYUluZm8udGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc3Ryb25nPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC50aXRsZS1pY29ue2ZvbnQtc2l6ZToyMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1Byb2R1Y3RJbmZvQ29tcG9uZW50IHtcblxuICBpbmZvVHlwZXMgPSBQUk9EVUNUX0lORk9fUFJPUEVSVElFUztcblxuICBASW5wdXQoKSBwcm9kdWN0O1xuXG4gIEBJbnB1dCgpIHZpc2libGVJbmZvOiBzdHJpbmdbXSA9IFtdO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGVjUHJvZHVjdEluZm9FeHRyYUNvbXBvbmVudCkgZXh0cmFJbmZvczogUXVlcnlMaXN0PERlY1Byb2R1Y3RJbmZvRXh0cmFDb21wb25lbnQ+ID0gbmV3IFF1ZXJ5TGlzdDxEZWNQcm9kdWN0SW5mb0V4dHJhQ29tcG9uZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgaXNWaXNpYmxlKGluZm86IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnZpc2libGVJbmZvLmluZGV4T2YoaW5mbykgPiAtMTtcbiAgfVxuXG59XG4iXX0=