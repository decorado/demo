/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var DecJobRoundComponent = /** @class */ (function () {
    function DecJobRoundComponent() {
        this.roundsQnt = 3;
    }
    Object.defineProperty(DecJobRoundComponent.prototype, "job", {
        get: /**
         * @return {?}
         */
        function () {
            return this._job;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                console.log(v);
                if (v.rounds.length > 1) {
                    v.rounds[0].status = 'DENIED';
                    if (v.rounds.length > 2) {
                        v.rounds[1].status = 'DENIED';
                    }
                }
                this._job = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecJobRoundComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    DecJobRoundComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-job-round',
                    template: "<dec-grid gap=\"0\">\n  <dec-grid-row>\n    <dec-grid-column>\n      <div class=\"header-title\">\n        <div *ngIf=\"job?.type == 'MODELING_FIX'\" class=\"left-triangle modeling-fix\">\n          <mat-icon class=\"icon-position\">build</mat-icon>\n        </div>\n        <div *ngIf=\"job?.type == 'COLOR'\" class=\"left-triangle texture-color-swap\">\n          <mat-icon class=\"icon-position\">palette</mat-icon>\n        </div>\n        <div *ngIf=\"job?.type == 'MODELING'\" class=\"left-triangle full-model\">\n          <mat-icon class=\"icon-position\"></mat-icon>\n        </div>\n        <div class=\"text-header\" fxLayout=\"column\" fxLayoutGap=\"2px\">\n          <span class=\"smaller-font dec-color-grey uppercase\">{{ 'label.type' | translate }}</span>\n          <span *ngIf=\"job?.type == 'MODELING_FIX'\" class=\"font-text dec-font-500 uppercase\">{{\n            'label.modeling-fix-info' | translate }}</span>\n          <span *ngIf=\"job?.type == 'COLOR'\" class=\"font-text dec-font-500 uppercase\">{{ 'label.color-variation-info' |\n            translate }}</span>\n          <span *ngIf=\"job?.type == 'MODELING'\" class=\"font-text dec-font-500 uppercase\">{{ 'label.full-model-info' |\n            translate }}</span>\n        </div>\n      </div>\n    </dec-grid-column>\n  </dec-grid-row>\n  <dec-grid-row>\n    <dec-grid-column span=\"8\">\n      <dec-job-round-item [jobId]=\"job?.id\" [round]=\"job?.rounds[0]\" [roundQnt]=\"roundsQnt\" [roundNumber]=\"1\"></dec-job-round-item>\n    </dec-grid-column>\n  </dec-grid-row>\n  <dec-grid-row>\n    <dec-grid-column span=\"8\">\n      <dec-job-round-item [jobId]=\"job?.id\" [round]=\"job?.rounds[1]\" [roundQnt]=\"roundsQnt\" [roundNumber]=\"2\"></dec-job-round-item>\n    </dec-grid-column>\n  </dec-grid-row>\n  <dec-grid-row>\n    <dec-grid-column span=\"8\">\n      <dec-job-round-item [jobId]=\"job?.id\" [round]=\"job?.rounds[2]\" [roundQnt]=\"roundsQnt\" [roundNumber]=\"3\"></dec-job-round-item>\n    </dec-grid-column>\n  </dec-grid-row>\n</dec-grid>\n",
                    styles: [".rounds-container{width:250px}.header-title{height:70px;width:100%}.left-triangle{position:relative;width:0;height:0;border-style:solid;border-width:58px 58px 0 0;text-indent:1px;line-height:1px;color:#fff}.modeling-fix{border-color:#ff8f00 transparent transparent}.texture-color-swap{border-color:#4f83fd transparent transparent}.full-model{border-color:#263238 transparent transparent}.icon-position{position:absolute;top:-56px;left:3px}.text-header{min-width:240px;max-width:500px;position:relative;top:-49px;left:55px}.font-text{font-size:16px}"]
                },] },
    ];
    /** @nocollapse */
    DecJobRoundComponent.ctorParameters = function () { return []; };
    DecJobRoundComponent.propDecorators = {
        job: [{ type: Input }]
    };
    return DecJobRoundComponent;
}());
export { DecJobRoundComponent };
if (false) {
    /** @type {?} */
    DecJobRoundComponent.prototype._job;
    /** @type {?} */
    DecJobRoundComponent.prototype.roundsQnt;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWpvYi1yb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWpvYi1yb3VuZC9kZWMtam9iLXJvdW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBdUV2RDt5QkFGWSxDQUFDO0tBRUk7SUFyQmpCLHNCQUNJLHFDQUFHOzs7O1FBYVA7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNsQjs7Ozs7UUFoQkQsVUFDUSxDQUFDO1lBQ1AsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztvQkFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO3FCQUMvQjtpQkFDRjtnQkFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQzthQUNmO1NBQ0Y7OztPQUFBOzs7O0lBV0QsdUNBQVE7OztJQUFSO0tBQ0M7O2dCQXhFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSw2L0RBeUNYO29CQUNDLE1BQU0sRUFBRSxDQUFDLHNpQkFBc2lCLENBQUM7aUJBQ2pqQjs7Ozs7c0JBR0UsS0FBSzs7K0JBbERSOztTQWdEYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWpvYi1yb3VuZCcsXG4gIHRlbXBsYXRlOiBgPGRlYy1ncmlkIGdhcD1cIjBcIj5cbiAgPGRlYy1ncmlkLXJvdz5cbiAgICA8ZGVjLWdyaWQtY29sdW1uPlxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci10aXRsZVwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiam9iPy50eXBlID09ICdNT0RFTElOR19GSVgnXCIgY2xhc3M9XCJsZWZ0LXRyaWFuZ2xlIG1vZGVsaW5nLWZpeFwiPlxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImljb24tcG9zaXRpb25cIj5idWlsZDwvbWF0LWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiam9iPy50eXBlID09ICdDT0xPUidcIiBjbGFzcz1cImxlZnQtdHJpYW5nbGUgdGV4dHVyZS1jb2xvci1zd2FwXCI+XG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbi1wb3NpdGlvblwiPnBhbGV0dGU8L21hdC1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImpvYj8udHlwZSA9PSAnTU9ERUxJTkcnXCIgY2xhc3M9XCJsZWZ0LXRyaWFuZ2xlIGZ1bGwtbW9kZWxcIj5cbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJpY29uLXBvc2l0aW9uXCI+PC9tYXQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWhlYWRlclwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIycHhcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNtYWxsZXItZm9udCBkZWMtY29sb3ItZ3JleSB1cHBlcmNhc2VcIj57eyAnbGFiZWwudHlwZScgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJqb2I/LnR5cGUgPT0gJ01PREVMSU5HX0ZJWCdcIiBjbGFzcz1cImZvbnQtdGV4dCBkZWMtZm9udC01MDAgdXBwZXJjYXNlXCI+e3tcbiAgICAgICAgICAgICdsYWJlbC5tb2RlbGluZy1maXgtaW5mbycgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJqb2I/LnR5cGUgPT0gJ0NPTE9SJ1wiIGNsYXNzPVwiZm9udC10ZXh0IGRlYy1mb250LTUwMCB1cHBlcmNhc2VcIj57eyAnbGFiZWwuY29sb3ItdmFyaWF0aW9uLWluZm8nIHxcbiAgICAgICAgICAgIHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cImpvYj8udHlwZSA9PSAnTU9ERUxJTkcnXCIgY2xhc3M9XCJmb250LXRleHQgZGVjLWZvbnQtNTAwIHVwcGVyY2FzZVwiPnt7ICdsYWJlbC5mdWxsLW1vZGVsLWluZm8nIHxcbiAgICAgICAgICAgIHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2RlYy1ncmlkLWNvbHVtbj5cbiAgPC9kZWMtZ3JpZC1yb3c+XG4gIDxkZWMtZ3JpZC1yb3c+XG4gICAgPGRlYy1ncmlkLWNvbHVtbiBzcGFuPVwiOFwiPlxuICAgICAgPGRlYy1qb2Itcm91bmQtaXRlbSBbam9iSWRdPVwiam9iPy5pZFwiIFtyb3VuZF09XCJqb2I/LnJvdW5kc1swXVwiIFtyb3VuZFFudF09XCJyb3VuZHNRbnRcIiBbcm91bmROdW1iZXJdPVwiMVwiPjwvZGVjLWpvYi1yb3VuZC1pdGVtPlxuICAgIDwvZGVjLWdyaWQtY29sdW1uPlxuICA8L2RlYy1ncmlkLXJvdz5cbiAgPGRlYy1ncmlkLXJvdz5cbiAgICA8ZGVjLWdyaWQtY29sdW1uIHNwYW49XCI4XCI+XG4gICAgICA8ZGVjLWpvYi1yb3VuZC1pdGVtIFtqb2JJZF09XCJqb2I/LmlkXCIgW3JvdW5kXT1cImpvYj8ucm91bmRzWzFdXCIgW3JvdW5kUW50XT1cInJvdW5kc1FudFwiIFtyb3VuZE51bWJlcl09XCIyXCI+PC9kZWMtam9iLXJvdW5kLWl0ZW0+XG4gICAgPC9kZWMtZ3JpZC1jb2x1bW4+XG4gIDwvZGVjLWdyaWQtcm93PlxuICA8ZGVjLWdyaWQtcm93PlxuICAgIDxkZWMtZ3JpZC1jb2x1bW4gc3Bhbj1cIjhcIj5cbiAgICAgIDxkZWMtam9iLXJvdW5kLWl0ZW0gW2pvYklkXT1cImpvYj8uaWRcIiBbcm91bmRdPVwiam9iPy5yb3VuZHNbMl1cIiBbcm91bmRRbnRdPVwicm91bmRzUW50XCIgW3JvdW5kTnVtYmVyXT1cIjNcIj48L2RlYy1qb2Itcm91bmQtaXRlbT5cbiAgICA8L2RlYy1ncmlkLWNvbHVtbj5cbiAgPC9kZWMtZ3JpZC1yb3c+XG48L2RlYy1ncmlkPlxuYCxcbiAgc3R5bGVzOiBbYC5yb3VuZHMtY29udGFpbmVye3dpZHRoOjI1MHB4fS5oZWFkZXItdGl0bGV7aGVpZ2h0OjcwcHg7d2lkdGg6MTAwJX0ubGVmdC10cmlhbmdsZXtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDowO2hlaWdodDowO2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6NThweCA1OHB4IDAgMDt0ZXh0LWluZGVudDoxcHg7bGluZS1oZWlnaHQ6MXB4O2NvbG9yOiNmZmZ9Lm1vZGVsaW5nLWZpeHtib3JkZXItY29sb3I6I2ZmOGYwMCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0udGV4dHVyZS1jb2xvci1zd2Fwe2JvcmRlci1jb2xvcjojNGY4M2ZkIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50fS5mdWxsLW1vZGVse2JvcmRlci1jb2xvcjojMjYzMjM4IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50fS5pY29uLXBvc2l0aW9ue3Bvc2l0aW9uOmFic29sdXRlO3RvcDotNTZweDtsZWZ0OjNweH0udGV4dC1oZWFkZXJ7bWluLXdpZHRoOjI0MHB4O21heC13aWR0aDo1MDBweDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTQ5cHg7bGVmdDo1NXB4fS5mb250LXRleHR7Zm9udC1zaXplOjE2cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSm9iUm91bmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCBqb2Iodikge1xuICAgIGlmICh2KSB7XG4gICAgICBjb25zb2xlLmxvZyh2KTtcbiAgICAgIGlmICh2LnJvdW5kcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHYucm91bmRzWzBdLnN0YXR1cyA9ICdERU5JRUQnO1xuICAgICAgICBpZiAodi5yb3VuZHMubGVuZ3RoID4gMikge1xuICAgICAgICAgIHYucm91bmRzWzFdLnN0YXR1cyA9ICdERU5JRUQnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9qb2IgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCBqb2IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2pvYjtcbiAgfVxuXG4gIHByaXZhdGUgX2pvYjtcbiAgcm91bmRzUW50ID0gMztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG59XG4iXX0=