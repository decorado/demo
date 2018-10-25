/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var DecJobRoundItemComponent = /** @class */ (function () {
    function DecJobRoundItemComponent() {
        this.negativeQA = false;
    }
    Object.defineProperty(DecJobRoundItemComponent.prototype, "round", {
        get: /**
         * @return {?}
         */
        function () {
            return this._round;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                if (v.status !== 'DENIED' && 'APPROVED') {
                    v.status = 'IN_QA';
                }
                this._round = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecJobRoundItemComponent.prototype.toggleNegative = /**
     * @return {?}
     */
    function () {
        this.negativeQA = true;
    };
    DecJobRoundItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-job-round-item',
                    template: "<div class=\"round-item-container\" fxLayout=\"column\" fxLayoutGap=\"8px\">\n  <div class=\"title-row-size\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n    <div class=\"smaller-font\">\n      Round {{ roundNumber }} of {{ roundQnt }}\n    </div>\n\n    <div>\n      <mat-icon>{{ round ? 'timer' : 'timelapse' }}</mat-icon>\n    </div>\n  </div>\n\n  <div *ngIf=\"round\">\n    <div *ngIf=\"round?.status === 'DELIVERED' ||\n                round?.status === 'DENIED' ||\n                round?.status === 'APPROVED'\"\n      fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"space-between center\">\n      <div fxFlex=\"40\" fxLayout=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"4px\">\n        <span class=\"smaller-font\"> {{ 'label.delivered' | translate }}: </span>\n        <span class=\"smaller-font\"> {{ round?.delivered | timeAgo }} </span>\n      </div>\n\n      <div class=\"position-status\" fxFlex=\"60\" fxLayout=\"column\" fxLayoutAlign=\"end start\">\n        <span class=\"smaller-font\">{{ 'label.status' | translate }}</span>\n        <dec-label-status [status]=\"round?.status\">\n        </dec-label-status>\n      </div>\n    </div>\n\n    <div *ngIf=\"round?.status === 'IN_DEVELOPMENT' ||\n                round?.status === 'IN_QA' ||\n                round?.status === 'IN_FIX'\"\n      fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"space-between center\">\n      <div fxFlex=\"40\" fxLayout=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"4px\">\n        <span class=\"smaller-font\"> {{ 'label.dead-line' | translate }}: </span>\n        <!-- <span class=\"smaller-font\" [ngClass]=\"{'red-qa': negativeQA}\">\n          {{ countdown }}\n        </span> -->\n        <span class=\"smaller-font\" [ngClass]=\"{'red-qa': negativeQA}\">\n          <dec-countdown [interval]='300' (finished)=\"toggleNegative()\"></dec-countdown>\n        </span>\n      </div>\n\n      <div class=\"position-status\" fxFlex=\"60\" fxLayout=\"column\" fxLayoutAlign=\"end start\">\n        <span class=\"smaller-font\">{{ 'label.status' | translate }}</span>\n        <dec-label-status [status]=\"round?.status\">\n        </dec-label-status>\n      </div>\n    </div>\n\n  </div>\n\n  <div *ngIf=\"!round\" fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"space-between center\">\n\n    <div fxFlex=\"40\" fxLayout=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"4px\">\n      <span class=\"smaller-font\"> - </span>\n      <span class=\"smaller-font\"> 00:00:00 </span>\n    </div>\n\n    <div class=\"position-status\" fxFlex=\"60\" fxLayout=\"column\" fxLayoutAlign=\"end start\">\n      <span class=\"smaller-font\">{{ 'label.status' | translate }}</span>\n      <dec-label-status [status]=\"'INACTIVE'\"></dec-label-status>\n    </div>\n  </div>\n</div>\n",
                    styles: [".title-row-size{height:40px}.position-status{position:relative;top:-5px}.round-item-container{padding-bottom:10px;border-bottom:1px solid rgba(0,0,0,.15)}.red-qa{color:#e94040}"]
                },] },
    ];
    /** @nocollapse */
    DecJobRoundItemComponent.ctorParameters = function () { return []; };
    DecJobRoundItemComponent.propDecorators = {
        round: [{ type: Input }],
        roundQnt: [{ type: Input }],
        roundNumber: [{ type: Input }],
        jobId: [{ type: Input }]
    };
    return DecJobRoundItemComponent;
}());
export { DecJobRoundItemComponent };
if (false) {
    /** @type {?} */
    DecJobRoundItemComponent.prototype.countdown;
    /** @type {?} */
    DecJobRoundItemComponent.prototype.roundQnt;
    /** @type {?} */
    DecJobRoundItemComponent.prototype.roundNumber;
    /** @type {?} */
    DecJobRoundItemComponent.prototype.jobId;
    /** @type {?} */
    DecJobRoundItemComponent.prototype._round;
    /** @type {?} */
    DecJobRoundItemComponent.prototype.negativeQA;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWpvYi1yb3VuZC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtam9iLXJvdW5kL2RlYy1qb2Itcm91bmQtaXRlbS9kZWMtam9iLXJvdW5kLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFnR3ZEOzBCQUZhLEtBQUs7S0FFRDtJQXJCakIsc0JBQ0ksMkNBQUs7Ozs7UUFTVDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3BCOzs7OztRQVpELFVBQ1UsQ0FBQztZQUNULEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxRQUFRLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDeEMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7aUJBQ3BCO2dCQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ2pCO1NBQ0Y7OztPQUFBOzs7O0lBZUQsaURBQWM7OztJQUFkO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7S0FDeEI7O2dCQWxHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLGl3RkFnRVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsa0xBQWtMLENBQUM7aUJBQzdMOzs7Ozt3QkFLRSxLQUFLOzJCQWNMLEtBQUs7OEJBQ0wsS0FBSzt3QkFDTCxLQUFLOzttQ0EzRlI7O1NBdUVhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtam9iLXJvdW5kLWl0ZW0nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJyb3VuZC1pdGVtLWNvbnRhaW5lclwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgPGRpdiBjbGFzcz1cInRpdGxlLXJvdy1zaXplXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwic21hbGxlci1mb250XCI+XG4gICAgICBSb3VuZCB7eyByb3VuZE51bWJlciB9fSBvZiB7eyByb3VuZFFudCB9fVxuICAgIDwvZGl2PlxuXG4gICAgPGRpdj5cbiAgICAgIDxtYXQtaWNvbj57eyByb3VuZCA/ICd0aW1lcicgOiAndGltZWxhcHNlJyB9fTwvbWF0LWljb24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJyb3VuZFwiPlxuICAgIDxkaXYgKm5nSWY9XCJyb3VuZD8uc3RhdHVzID09PSAnREVMSVZFUkVEJyB8fFxuICAgICAgICAgICAgICAgIHJvdW5kPy5zdGF0dXMgPT09ICdERU5JRUQnIHx8XG4gICAgICAgICAgICAgICAgcm91bmQ/LnN0YXR1cyA9PT0gJ0FQUFJPVkVEJ1wiXG4gICAgICBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgICA8ZGl2IGZ4RmxleD1cIjQwXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEFsaWduPVwiZW5kIHN0YXJ0XCIgZnhMYXlvdXRHYXA9XCI0cHhcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzbWFsbGVyLWZvbnRcIj4ge3sgJ2xhYmVsLmRlbGl2ZXJlZCcgfCB0cmFuc2xhdGUgfX06IDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzbWFsbGVyLWZvbnRcIj4ge3sgcm91bmQ/LmRlbGl2ZXJlZCB8IHRpbWVBZ28gfX0gPC9zcGFuPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJwb3NpdGlvbi1zdGF0dXNcIiBmeEZsZXg9XCI2MFwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRBbGlnbj1cImVuZCBzdGFydFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNtYWxsZXItZm9udFwiPnt7ICdsYWJlbC5zdGF0dXMnIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8ZGVjLWxhYmVsLXN0YXR1cyBbc3RhdHVzXT1cInJvdW5kPy5zdGF0dXNcIj5cbiAgICAgICAgPC9kZWMtbGFiZWwtc3RhdHVzPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ0lmPVwicm91bmQ/LnN0YXR1cyA9PT0gJ0lOX0RFVkVMT1BNRU5UJyB8fFxuICAgICAgICAgICAgICAgIHJvdW5kPy5zdGF0dXMgPT09ICdJTl9RQScgfHxcbiAgICAgICAgICAgICAgICByb3VuZD8uc3RhdHVzID09PSAnSU5fRklYJ1wiXG4gICAgICBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCI+XG4gICAgICA8ZGl2IGZ4RmxleD1cIjQwXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEFsaWduPVwiZW5kIHN0YXJ0XCIgZnhMYXlvdXRHYXA9XCI0cHhcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzbWFsbGVyLWZvbnRcIj4ge3sgJ2xhYmVsLmRlYWQtbGluZScgfCB0cmFuc2xhdGUgfX06IDwvc3Bhbj5cbiAgICAgICAgPCEtLSA8c3BhbiBjbGFzcz1cInNtYWxsZXItZm9udFwiIFtuZ0NsYXNzXT1cInsncmVkLXFhJzogbmVnYXRpdmVRQX1cIj5cbiAgICAgICAgICB7eyBjb3VudGRvd24gfX1cbiAgICAgICAgPC9zcGFuPiAtLT5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzbWFsbGVyLWZvbnRcIiBbbmdDbGFzc109XCJ7J3JlZC1xYSc6IG5lZ2F0aXZlUUF9XCI+XG4gICAgICAgICAgPGRlYy1jb3VudGRvd24gW2ludGVydmFsXT0nMzAwJyAoZmluaXNoZWQpPVwidG9nZ2xlTmVnYXRpdmUoKVwiPjwvZGVjLWNvdW50ZG93bj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJwb3NpdGlvbi1zdGF0dXNcIiBmeEZsZXg9XCI2MFwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRBbGlnbj1cImVuZCBzdGFydFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNtYWxsZXItZm9udFwiPnt7ICdsYWJlbC5zdGF0dXMnIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8ZGVjLWxhYmVsLXN0YXR1cyBbc3RhdHVzXT1cInJvdW5kPy5zdGF0dXNcIj5cbiAgICAgICAgPC9kZWMtbGFiZWwtc3RhdHVzPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cIiFyb3VuZFwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBjZW50ZXJcIj5cblxuICAgIDxkaXYgZnhGbGV4PVwiNDBcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJlbmQgc3RhcnRcIiBmeExheW91dEdhcD1cIjRweFwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzbWFsbGVyLWZvbnRcIj4gLSA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInNtYWxsZXItZm9udFwiPiAwMDowMDowMCA8L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicG9zaXRpb24tc3RhdHVzXCIgZnhGbGV4PVwiNjBcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJlbmQgc3RhcnRcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic21hbGxlci1mb250XCI+e3sgJ2xhYmVsLnN0YXR1cycgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICA8ZGVjLWxhYmVsLXN0YXR1cyBbc3RhdHVzXT1cIidJTkFDVElWRSdcIj48L2RlYy1sYWJlbC1zdGF0dXM+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnRpdGxlLXJvdy1zaXple2hlaWdodDo0MHB4fS5wb3NpdGlvbi1zdGF0dXN7cG9zaXRpb246cmVsYXRpdmU7dG9wOi01cHh9LnJvdW5kLWl0ZW0tY29udGFpbmVye3BhZGRpbmctYm90dG9tOjEwcHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgwLDAsMCwuMTUpfS5yZWQtcWF7Y29sb3I6I2U5NDA0MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNKb2JSb3VuZEl0ZW1Db21wb25lbnQge1xuXG4gIGNvdW50ZG93bjogYW55O1xuXG4gIEBJbnB1dCgpXG4gIHNldCByb3VuZCh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIGlmICh2LnN0YXR1cyAhPT0gJ0RFTklFRCcgJiYgJ0FQUFJPVkVEJykge1xuICAgICAgICB2LnN0YXR1cyA9ICdJTl9RQSc7XG4gICAgICB9XG4gICAgICB0aGlzLl9yb3VuZCA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvdW5kKCkge1xuICAgIHJldHVybiB0aGlzLl9yb3VuZDtcbiAgfVxuXG4gIEBJbnB1dCgpIHJvdW5kUW50OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJvdW5kTnVtYmVyOiBudW1iZXI7XG4gIEBJbnB1dCgpIGpvYklkOiBhbnk7XG5cbiAgcHJpdmF0ZSBfcm91bmQ7XG4gIG5lZ2F0aXZlUUEgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHRvZ2dsZU5lZ2F0aXZlKCkge1xuICAgIHRoaXMubmVnYXRpdmVRQSA9IHRydWU7XG4gIH1cblxufVxuIl19