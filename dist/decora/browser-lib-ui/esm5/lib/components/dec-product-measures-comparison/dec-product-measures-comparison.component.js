/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var DecProductMeasuresComparisonComponent = /** @class */ (function () {
    function DecProductMeasuresComparisonComponent() {
    }
    Object.defineProperty(DecProductMeasuresComparisonComponent.prototype, "measures", {
        get: /**
         * @return {?}
         */
        function () {
            return this._measures;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this._measures = v;
                this.formatMasures(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecProductMeasuresComparisonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} measures
     * @return {?}
     */
    DecProductMeasuresComparisonComponent.prototype.formatMasures = /**
     * @param {?} measures
     * @return {?}
     */
    function (measures) {
        this.formatedMeasures = [];
        /** @type {?} */
        var width = {
            label: 'label.cubeX',
            product: this.printMeasure(this.measures.referenceCubeX.toFixed(2)),
            model: this.printMeasure(this.measures.modelCubeX),
            productIn: this.printMeasureInches(this.measures.referenceCubeX),
            modelIn: this.printMeasureInches(this.measures.modelCubeX)
        };
        /** @type {?} */
        var depth = {
            label: 'label.cubeY',
            product: this.printMeasure(this.measures.referenceCubeY.toFixed(2)),
            model: this.printMeasure(this.measures.modelCubeY),
            productIn: this.printMeasureInches(this.measures.referenceCubeY),
            modelIn: this.printMeasureInches(this.measures.modelCubeY)
        };
        /** @type {?} */
        var height = {
            label: 'label.cubeZ',
            product: this.printMeasure(this.measures.referenceCubeZ.toFixed(2)),
            model: this.printMeasure(this.measures.modelCubeZ),
            productIn: this.printMeasureInches(this.measures.referenceCubeZ),
            modelIn: this.printMeasureInches(this.measures.modelCubeZ)
        };
        this.formatedMeasures.push(width);
        this.formatedMeasures.push(depth);
        this.formatedMeasures.push(height);
    };
    /**
     * @param {?} measure
     * @return {?}
     */
    DecProductMeasuresComparisonComponent.prototype.printMeasure = /**
     * @param {?} measure
     * @return {?}
     */
    function (measure) {
        if (measure) {
            return measure + ' cm';
        }
        return '-';
    };
    /**
     * @param {?} measure
     * @return {?}
     */
    DecProductMeasuresComparisonComponent.prototype.printMeasureInches = /**
     * @param {?} measure
     * @return {?}
     */
    function (measure) {
        if (measure) {
            return (Math.round(measure * 0.39370)).toFixed(2) + ' in';
        }
        return '-';
    };
    DecProductMeasuresComparisonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-product-measures-comparison',
                    template: "<dec-grid gap=\"0\">\n\n  <dec-grid-row>\n    <dec-grid-column>\n      <div>\n        <button mat-button class=\"dec-color-grey\">\n          <mat-icon>straighten</mat-icon>\n          <span>{{ 'label.measures' | translate }}</span>\n        </button>\n      </div>\n    </dec-grid-column>\n  </dec-grid-row>\n\n  <dec-grid-row>\n    <dec-grid-column span=\"12\">\n      <div fxLayout=\"column\" fxLayoutGap=\"1px\" class=\"dec-measure-list\">\n        <div fxLayout=\"row\">\n          <div fxFlex>\n            <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n              <div></div>\n            </div>\n          </div>\n          <!-- <div fxFlex>\n              <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n                <div></div>\n              </div>\n            </div> -->\n          <div fxFlex>\n            <div fxLayout=\"row\" fxLayoutAlign=\"center center\">\n              <div class=\"dec-subhead dec-color-grey\">{{ 'label.product' | translate }}</div>\n            </div>\n          </div>\n          <div fxFlex>\n            <div fxLayout=\"row\" fxLayoutAlign=\"center center\">\n              <div class=\"dec-subhead dec-color-grey\">{{ 'label.model' | translate }}</div>\n            </div>\n          </div>\n        </div>\n        <div fxFlex *ngFor=\"let measure of formatedMeasures\" class=\"dec-measure-list-row\">\n          <div fxLayout=\"row\">\n            <div fxFlex>\n              <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n                <div>\n                  {{measure.label | translate}}\n                </div>\n              </div>\n            </div>\n            <div fxFlex>\n              <div fxLayout=\"row\" fxLayoutAlign=\"center center\" fxLayoutGap=\"5px\">\n                <div>\n                  {{measure.product}}\n                </div>\n                <div> | </div>\n                <div>\n                  {{ measure.productIn}}\n                </div>\n              </div>\n            </div>\n            <div fxFlex>\n              <div fxLayout=\"row\" fxLayoutAlign=\"center center\" fxLayoutGap=\"5px\">\n                <div>\n                  {{measure.model}}\n                </div>\n                <div> | </div>\n                <div>\n                  {{measure.modelIn}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </dec-grid-column>\n  </dec-grid-row>\n\n</dec-grid>",
                    styles: [".dec-measure-list .dec-measure-list-row{font-size:13px;padding:8px 16px;line-height:32px}.dec-measure-list .dec-measure-list-row:nth-child(odd){background:#f4f4f4}.dec-measure-list .dec-measure-list-row:nth-child(even){background:#fbfbfb}.dec-subhead{font-size:13px;font-weight:400;margin:10px 0}"]
                },] },
    ];
    /** @nocollapse */
    DecProductMeasuresComparisonComponent.ctorParameters = function () { return []; };
    DecProductMeasuresComparisonComponent.propDecorators = {
        measures: [{ type: Input }]
    };
    return DecProductMeasuresComparisonComponent;
}());
export { DecProductMeasuresComparisonComponent };
if (false) {
    /** @type {?} */
    DecProductMeasuresComparisonComponent.prototype._measures;
    /** @type {?} */
    DecProductMeasuresComparisonComponent.prototype.formatedMeasures;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXByb2R1Y3QtbWVhc3VyZXMtY29tcGFyaXNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXByb2R1Y3QtbWVhc3VyZXMtY29tcGFyaXNvbi9kZWMtcHJvZHVjdC1tZWFzdXJlcy1jb21wYXJpc29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBbUd2RDtLQUFpQjtJQWZqQixzQkFDSSwyREFBUTs7OztRQU9aO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7Ozs7O1FBVkQsVUFDYSxDQUFDO1lBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QjtTQUNGOzs7T0FBQTs7OztJQVdELHdEQUFROzs7SUFBUjtLQUNDOzs7OztJQUVELDZEQUFhOzs7O0lBQWIsVUFBYyxRQUFRO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7O1FBRTNCLElBQU0sS0FBSyxHQUFHO1lBQ1osS0FBSyxFQUFFLGFBQWE7WUFDcEIsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ2xELFNBQVMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7WUFDaEUsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztTQUMzRCxDQUFDOztRQUVGLElBQU0sS0FBSyxHQUFHO1lBQ1osS0FBSyxFQUFFLGFBQWE7WUFDcEIsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ2xELFNBQVMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7WUFDaEUsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztTQUMzRCxDQUFDOztRQUVGLElBQU0sTUFBTSxHQUFHO1lBQ2IsS0FBSyxFQUFFLGFBQWE7WUFDcEIsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ2xELFNBQVMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7WUFDaEUsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztTQUMzRCxDQUFDO1FBRUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEM7Ozs7O0lBR08sNERBQVk7Ozs7Y0FBQyxPQUFlO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN4QjtRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7Ozs7OztJQUdMLGtFQUFrQjs7OztjQUFDLE9BQWU7UUFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMzRDtRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7OztnQkFsSmQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLFFBQVEsRUFBRSxrNkVBMkVBO29CQUNWLE1BQU0sRUFBRSxDQUFDLDBTQUEwUyxDQUFDO2lCQUNyVDs7Ozs7MkJBR0UsS0FBSzs7Z0RBcEZSOztTQWtGYSxxQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXByb2R1Y3QtbWVhc3VyZXMtY29tcGFyaXNvbicsXG4gIHRlbXBsYXRlOiBgPGRlYy1ncmlkIGdhcD1cIjBcIj5cblxuICA8ZGVjLWdyaWQtcm93PlxuICAgIDxkZWMtZ3JpZC1jb2x1bW4+XG4gICAgICA8ZGl2PlxuICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gY2xhc3M9XCJkZWMtY29sb3ItZ3JleVwiPlxuICAgICAgICAgIDxtYXQtaWNvbj5zdHJhaWdodGVuPC9tYXQtaWNvbj5cbiAgICAgICAgICA8c3Bhbj57eyAnbGFiZWwubWVhc3VyZXMnIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGVjLWdyaWQtY29sdW1uPlxuICA8L2RlYy1ncmlkLXJvdz5cblxuICA8ZGVjLWdyaWQtcm93PlxuICAgIDxkZWMtZ3JpZC1jb2x1bW4gc3Bhbj1cIjEyXCI+XG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxcHhcIiBjbGFzcz1cImRlYy1tZWFzdXJlLWxpc3RcIj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgZnhGbGV4PlxuICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwhLS0gPGRpdiBmeEZsZXg+XG4gICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgICAgIDxkaXYgZnhGbGV4PlxuICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWMtc3ViaGVhZCBkZWMtY29sb3ItZ3JleVwiPnt7ICdsYWJlbC5wcm9kdWN0JyB8IHRyYW5zbGF0ZSB9fTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlYy1zdWJoZWFkIGRlYy1jb2xvci1ncmV5XCI+e3sgJ2xhYmVsLm1vZGVsJyB8IHRyYW5zbGF0ZSB9fTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGZ4RmxleCAqbmdGb3I9XCJsZXQgbWVhc3VyZSBvZiBmb3JtYXRlZE1lYXN1cmVzXCIgY2xhc3M9XCJkZWMtbWVhc3VyZS1saXN0LXJvd1wiPlxuICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgZnhGbGV4PlxuICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICB7e21lYXN1cmUubGFiZWwgfCB0cmFuc2xhdGV9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiNXB4XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIHt7bWVhc3VyZS5wcm9kdWN0fX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PiB8IDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICB7eyBtZWFzdXJlLnByb2R1Y3RJbn19XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGZ4RmxleD5cbiAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI1cHhcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAge3ttZWFzdXJlLm1vZGVsfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PiB8IDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICB7e21lYXN1cmUubW9kZWxJbn19XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kZWMtZ3JpZC1jb2x1bW4+XG4gIDwvZGVjLWdyaWQtcm93PlxuXG48L2RlYy1ncmlkPmAsXG4gIHN0eWxlczogW2AuZGVjLW1lYXN1cmUtbGlzdCAuZGVjLW1lYXN1cmUtbGlzdC1yb3d7Zm9udC1zaXplOjEzcHg7cGFkZGluZzo4cHggMTZweDtsaW5lLWhlaWdodDozMnB4fS5kZWMtbWVhc3VyZS1saXN0IC5kZWMtbWVhc3VyZS1saXN0LXJvdzpudGgtY2hpbGQob2RkKXtiYWNrZ3JvdW5kOiNmNGY0ZjR9LmRlYy1tZWFzdXJlLWxpc3QgLmRlYy1tZWFzdXJlLWxpc3Qtcm93Om50aC1jaGlsZChldmVuKXtiYWNrZ3JvdW5kOiNmYmZiZmJ9LmRlYy1zdWJoZWFke2ZvbnQtc2l6ZToxM3B4O2ZvbnQtd2VpZ2h0OjQwMDttYXJnaW46MTBweCAwfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1Byb2R1Y3RNZWFzdXJlc0NvbXBhcmlzb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCBtZWFzdXJlcyh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX21lYXN1cmVzID0gdjtcbiAgICAgIHRoaXMuZm9ybWF0TWFzdXJlcyh2KTtcbiAgICB9XG4gIH1cblxuICBnZXQgbWVhc3VyZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21lYXN1cmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWVhc3VyZXM7XG4gIGZvcm1hdGVkTWVhc3VyZXM7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGZvcm1hdE1hc3VyZXMobWVhc3VyZXMpIHtcbiAgICB0aGlzLmZvcm1hdGVkTWVhc3VyZXMgPSBbXTtcblxuICAgIGNvbnN0IHdpZHRoID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbC5jdWJlWCcsXG4gICAgICBwcm9kdWN0OiB0aGlzLnByaW50TWVhc3VyZSh0aGlzLm1lYXN1cmVzLnJlZmVyZW5jZUN1YmVYLnRvRml4ZWQoMikpLFxuICAgICAgbW9kZWw6IHRoaXMucHJpbnRNZWFzdXJlKHRoaXMubWVhc3VyZXMubW9kZWxDdWJlWCksXG4gICAgICBwcm9kdWN0SW46IHRoaXMucHJpbnRNZWFzdXJlSW5jaGVzKHRoaXMubWVhc3VyZXMucmVmZXJlbmNlQ3ViZVgpLFxuICAgICAgbW9kZWxJbjogdGhpcy5wcmludE1lYXN1cmVJbmNoZXModGhpcy5tZWFzdXJlcy5tb2RlbEN1YmVYKVxuICAgIH07XG5cbiAgICBjb25zdCBkZXB0aCA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwuY3ViZVknLFxuICAgICAgcHJvZHVjdDogdGhpcy5wcmludE1lYXN1cmUodGhpcy5tZWFzdXJlcy5yZWZlcmVuY2VDdWJlWS50b0ZpeGVkKDIpKSxcbiAgICAgIG1vZGVsOiB0aGlzLnByaW50TWVhc3VyZSh0aGlzLm1lYXN1cmVzLm1vZGVsQ3ViZVkpLFxuICAgICAgcHJvZHVjdEluOiB0aGlzLnByaW50TWVhc3VyZUluY2hlcyh0aGlzLm1lYXN1cmVzLnJlZmVyZW5jZUN1YmVZKSxcbiAgICAgIG1vZGVsSW46IHRoaXMucHJpbnRNZWFzdXJlSW5jaGVzKHRoaXMubWVhc3VyZXMubW9kZWxDdWJlWSlcbiAgICB9O1xuXG4gICAgY29uc3QgaGVpZ2h0ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbC5jdWJlWicsXG4gICAgICBwcm9kdWN0OiB0aGlzLnByaW50TWVhc3VyZSh0aGlzLm1lYXN1cmVzLnJlZmVyZW5jZUN1YmVaLnRvRml4ZWQoMikpLFxuICAgICAgbW9kZWw6IHRoaXMucHJpbnRNZWFzdXJlKHRoaXMubWVhc3VyZXMubW9kZWxDdWJlWiksXG4gICAgICBwcm9kdWN0SW46IHRoaXMucHJpbnRNZWFzdXJlSW5jaGVzKHRoaXMubWVhc3VyZXMucmVmZXJlbmNlQ3ViZVopLFxuICAgICAgbW9kZWxJbjogdGhpcy5wcmludE1lYXN1cmVJbmNoZXModGhpcy5tZWFzdXJlcy5tb2RlbEN1YmVaKVxuICAgIH07XG5cbiAgICB0aGlzLmZvcm1hdGVkTWVhc3VyZXMucHVzaCh3aWR0aCk7XG4gICAgdGhpcy5mb3JtYXRlZE1lYXN1cmVzLnB1c2goZGVwdGgpO1xuICAgIHRoaXMuZm9ybWF0ZWRNZWFzdXJlcy5wdXNoKGhlaWdodCk7XG4gIH1cblxuXG4gIHByaXZhdGUgcHJpbnRNZWFzdXJlKG1lYXN1cmU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKG1lYXN1cmUpIHtcbiAgICAgIHJldHVybiBtZWFzdXJlICsgJyBjbSc7XG4gICAgfVxuICAgIHJldHVybiAnLSc7XG4gIH1cblxuICBwcml2YXRlIHByaW50TWVhc3VyZUluY2hlcyhtZWFzdXJlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmIChtZWFzdXJlKSB7XG4gICAgICByZXR1cm4gKE1hdGgucm91bmQobWVhc3VyZSAqIDAuMzkzNzApKS50b0ZpeGVkKDIpICsgJyBpbic7XG4gICAgfVxuICAgIHJldHVybiAnLSc7XG4gIH1cbn1cbiJdfQ==