/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
var DecDialogComponent = /** @class */ (function () {
    function DecDialogComponent(factor, dialogRef) {
        var _this = this;
        this.factor = factor;
        this.dialogRef = dialogRef;
        this.topActions = [];
        this.bottomActions = [];
        this.context = {};
        this.hideBackButton = false;
        this.showCancelButton = false;
        this.color = 'transparent';
        this.child = new EventEmitter();
        this.factoryTheComponent = function () {
            /** @type {?} */
            var componentFactory = _this.factor.resolveComponentFactory(_this.childComponentType);
            /** @type {?} */
            var componentRef = _this.childContainer.createComponent(componentFactory);
            _this.childComponentInstance = componentRef.instance;
            _this.child.emit(_this.childComponentInstance);
            _this.child.complete(); // unsubsribe subscribers
            _this.appendContextToInstance(componentRef.instance, _this.context);
            _this.loaded = true;
        };
    }
    /**
     * @return {?}
     */
    DecDialogComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.dialogRef.afterOpen()
            .toPromise()
            .then(this.factoryTheComponent);
    };
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    DecDialogComponent.prototype.appendContextToInstance = /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function (instance, context) {
        var _this = this;
        if (instance && context) {
            Object.keys(context).forEach(function (key) {
                instance[key] = _this.context[key];
            });
        }
    };
    DecDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-dialog',
                    template: "<div class=\"fixActionRow\">\n\n  <mat-toolbar [color]=\"color\" [ngStyle]=\"color === 'transparent' ? {'background': 'rgba(255, 255, 255, 0)'} : {}\">\n\n    <div fxLayout=\"row\" fxFlexFill fxLayoutAlign=\"start center\">\n      <div *ngIf=\"!hideBackButton\">\n        <button type=\"button\" mat-icon-button class=\"uppercase\" mat-dialog-close>\n          <mat-icon>arrow_back</mat-icon>\n        </button>\n      </div>\n      <div class=\"dec-dialog-title\">{{ title }}</div>\n      <div fxFlex>\n        <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n          <div *ngIf=\"topActions\">\n            <mat-menu #decDialogActionsMenu=\"matMenu\">\n              <button *ngFor=\"let action of topActions\" mat-menu-item (click)=\"action.callback(context)\">\n                <span *ngIf=\"action.label\">{{ action.label }}</span>\n                <span *ngIf=\"action.i18nLabel\">{{ action.i18nLabel | translate }}</span>\n              </button>\n            </mat-menu>\n\n            <button mat-icon-button [matMenuTriggerFor]=\"decDialogActionsMenu\">\n              <mat-icon>more_vert</mat-icon>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </mat-toolbar>\n\n  <div mat-dialog-content>\n\n    <template #childContainer></template>\n\n    <dec-spinner *ngIf=\"!loaded\"></dec-spinner>\n\n  </div>\n\n  <div class=\"spacer\"></div>\n\n\n  <div mat-dialog-actions align=\"end\" *ngIf=\"showCancelButton || bottomActions\">\n\n    <button *ngIf=\"showCancelButton\" mat-button mat-dialog-close>\n      {{ 'label.Cancel' | translate }}\n    </button>\n\n    <ng-container *ngFor=\"let action of bottomActions\">\n\n      <ng-container [ngSwitch]=\"action.buttonType\">\n\n        <button *ngSwitchCase=\"'mat-button'\" mat-button (click)=\"action.callback(context)\" [color]=\"action.color\">\n          <span *ngIf=\"action.label\">{{ action.label }}</span>\n          <span *ngIf=\"action.i18nLabel\">{{ action.i18nLabel | translate }}</span>\n        </button>\n\n        <button *ngSwitchCase=\"'mat-raised-button'\" mat-raised-button (click)=\"action.callback(context)\" [color]=\"action.color\">\n          <span *ngIf=\"action.label\">{{ action.label }}</span>\n          <span *ngIf=\"action.i18nLabel\">{{ action.i18nLabel | translate }}</span>\n        </button>\n\n        <button *ngSwitchDefault mat-raised-button (click)=\"action.callback(context)\" [color]=\"action.color\">\n          <span *ngIf=\"action.label\">{{ action.label }}</span>\n          <span *ngIf=\"action.i18nLabel\">{{ action.i18nLabel | translate }}</span>\n        </button>\n\n      </ng-container>\n\n    </ng-container>\n  </div>\n</div>\n",
                    styles: [".mat-dialog-actions,.mat-dialog-content{padding:32px}.mat-dialog-actions{margin-bottom:0}.fixActionRow{height:100%;display:flex;flex-direction:column}.spacer{flex-grow:1}.dec-dialog-title{font-size:24px;padding:0 16px}"]
                },] },
    ];
    /** @nocollapse */
    DecDialogComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: MatDialogRef }
    ]; };
    DecDialogComponent.propDecorators = {
        childContainer: [{ type: ViewChild, args: ['childContainer', { read: ViewContainerRef },] }],
        child: [{ type: Output }]
    };
    return DecDialogComponent;
}());
export { DecDialogComponent };
if (false) {
    /** @type {?} */
    DecDialogComponent.prototype.childComponentType;
    /** @type {?} */
    DecDialogComponent.prototype.childComponentInstance;
    /** @type {?} */
    DecDialogComponent.prototype.topActions;
    /** @type {?} */
    DecDialogComponent.prototype.bottomActions;
    /** @type {?} */
    DecDialogComponent.prototype.title;
    /** @type {?} */
    DecDialogComponent.prototype.context;
    /** @type {?} */
    DecDialogComponent.prototype.loaded;
    /** @type {?} */
    DecDialogComponent.prototype.hideBackButton;
    /** @type {?} */
    DecDialogComponent.prototype.showCancelButton;
    /** @type {?} */
    DecDialogComponent.prototype.color;
    /** @type {?} */
    DecDialogComponent.prototype.childContainer;
    /** @type {?} */
    DecDialogComponent.prototype.child;
    /** @type {?} */
    DecDialogComponent.prototype.factoryTheComponent;
    /** @type {?} */
    DecDialogComponent.prototype.factor;
    /** @type {?} */
    DecDialogComponent.prototype.dialogRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RpYWxvZy9kZWMtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVUsd0JBQXdCLEVBQWtDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0osT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDOztJQTBHL0MsNEJBQ1UsUUFDQTtRQUZWLGlCQUdJO1FBRk0sV0FBTSxHQUFOLE1BQU07UUFDTixjQUFTLEdBQVQsU0FBUzswQkF0QlUsRUFBRTs2QkFFQyxFQUFFO3VCQUluQixFQUFFOzhCQUlBLEtBQUs7Z0NBRUgsS0FBSztxQkFFaEIsYUFBYTtxQkFJSCxJQUFJLFlBQVksRUFBTzttQ0FlWDs7WUFFNUIsSUFBTSxnQkFBZ0IsR0FBMEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7WUFFN0csSUFBTSxZQUFZLEdBQXNCLEtBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFOUYsS0FBSSxDQUFDLHNCQUFzQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFFcEQsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFN0MsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUV0QixLQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbEUsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FFcEI7S0ExQkc7Ozs7SUFFSixxQ0FBUTs7O0lBQVI7UUFFRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTthQUN6QixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7S0FFakM7Ozs7OztJQW9CTyxvREFBdUI7Ozs7O2NBQUMsUUFBYSxFQUFFLE9BQVk7O1FBRXpELEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztnQkFFL0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFFbkMsQ0FBQyxDQUFDO1NBRUo7OztnQkFqSkosU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsZ29GQXdFWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyw0TkFBNE4sQ0FBQztpQkFDdk87Ozs7Z0JBakZzQyx3QkFBd0I7Z0JBR3RELFlBQVk7OztpQ0FzR2xCLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTt3QkFFdEQsTUFBTTs7NkJBM0dUOztTQWtGYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERpYWxvZ0FjdGlvbiB9IGZyb20gJy4vZGVjLWRpYWxvZy5tb2RlbHMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZGlhbG9nJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZml4QWN0aW9uUm93XCI+XG5cbiAgPG1hdC10b29sYmFyIFtjb2xvcl09XCJjb2xvclwiIFtuZ1N0eWxlXT1cImNvbG9yID09PSAndHJhbnNwYXJlbnQnID8geydiYWNrZ3JvdW5kJzogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMCknfSA6IHt9XCI+XG5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhGbGV4RmlsbCBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwiIWhpZGVCYWNrQnV0dG9uXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cInVwcGVyY2FzZVwiIG1hdC1kaWFsb2ctY2xvc2U+XG4gICAgICAgICAgPG1hdC1pY29uPmFycm93X2JhY2s8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRlYy1kaWFsb2ctdGl0bGVcIj57eyB0aXRsZSB9fTwvZGl2PlxuICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJ0b3BBY3Rpb25zXCI+XG4gICAgICAgICAgICA8bWF0LW1lbnUgI2RlY0RpYWxvZ0FjdGlvbnNNZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgdG9wQWN0aW9uc1wiIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImFjdGlvbi5jYWxsYmFjayhjb250ZXh0KVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmxhYmVsXCI+e3sgYWN0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9tYXQtbWVudT5cblxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cImRlY0RpYWxvZ0FjdGlvbnNNZW51XCI+XG4gICAgICAgICAgICAgIDxtYXQtaWNvbj5tb3JlX3ZlcnQ8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9tYXQtdG9vbGJhcj5cblxuICA8ZGl2IG1hdC1kaWFsb2ctY29udGVudD5cblxuICAgIDx0ZW1wbGF0ZSAjY2hpbGRDb250YWluZXI+PC90ZW1wbGF0ZT5cblxuICAgIDxkZWMtc3Bpbm5lciAqbmdJZj1cIiFsb2FkZWRcIj48L2RlYy1zcGlubmVyPlxuXG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cblxuXG4gIDxkaXYgbWF0LWRpYWxvZy1hY3Rpb25zIGFsaWduPVwiZW5kXCIgKm5nSWY9XCJzaG93Q2FuY2VsQnV0dG9uIHx8IGJvdHRvbUFjdGlvbnNcIj5cblxuICAgIDxidXR0b24gKm5nSWY9XCJzaG93Q2FuY2VsQnV0dG9uXCIgbWF0LWJ1dHRvbiBtYXQtZGlhbG9nLWNsb3NlPlxuICAgICAge3sgJ2xhYmVsLkNhbmNlbCcgfCB0cmFuc2xhdGUgfX1cbiAgICA8L2J1dHRvbj5cblxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBib3R0b21BY3Rpb25zXCI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImFjdGlvbi5idXR0b25UeXBlXCI+XG5cbiAgICAgICAgPGJ1dHRvbiAqbmdTd2l0Y2hDYXNlPVwiJ21hdC1idXR0b24nXCIgbWF0LWJ1dHRvbiAoY2xpY2spPVwiYWN0aW9uLmNhbGxiYWNrKGNvbnRleHQpXCIgW2NvbG9yXT1cImFjdGlvbi5jb2xvclwiPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmxhYmVsXCI+e3sgYWN0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b24gKm5nU3dpdGNoQ2FzZT1cIidtYXQtcmFpc2VkLWJ1dHRvbidcIiBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwiYWN0aW9uLmNhbGxiYWNrKGNvbnRleHQpXCIgW2NvbG9yXT1cImFjdGlvbi5jb2xvclwiPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmxhYmVsXCI+e3sgYWN0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b24gKm5nU3dpdGNoRGVmYXVsdCBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwiYWN0aW9uLmNhbGxiYWNrKGNvbnRleHQpXCIgW2NvbG9yXT1cImFjdGlvbi5jb2xvclwiPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmxhYmVsXCI+e3sgYWN0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtZGlhbG9nLWFjdGlvbnMsLm1hdC1kaWFsb2ctY29udGVudHtwYWRkaW5nOjMycHh9Lm1hdC1kaWFsb2ctYWN0aW9uc3ttYXJnaW4tYm90dG9tOjB9LmZpeEFjdGlvblJvd3toZWlnaHQ6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5zcGFjZXJ7ZmxleC1ncm93OjF9LmRlYy1kaWFsb2ctdGl0bGV7Zm9udC1zaXplOjI0cHg7cGFkZGluZzowIDE2cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvLyBDVVJSRU5UXG4gIGNoaWxkQ29tcG9uZW50VHlwZTogQ29tcG9uZW50VHlwZTxhbnk+O1xuXG4gIGNoaWxkQ29tcG9uZW50SW5zdGFuY2U6IGFueTtcblxuICB0b3BBY3Rpb25zOiBEaWFsb2dBY3Rpb25bXSA9IFtdO1xuXG4gIGJvdHRvbUFjdGlvbnM6IERpYWxvZ0FjdGlvbltdID0gW107XG5cbiAgdGl0bGU6IHN0cmluZztcblxuICBjb250ZXh0OiBhbnkgPSB7fTtcblxuICBsb2FkZWQ6IGJvb2xlYW47XG5cbiAgaGlkZUJhY2tCdXR0b24gPSBmYWxzZTtcblxuICBzaG93Q2FuY2VsQnV0dG9uID0gZmFsc2U7XG5cbiAgY29sb3IgPSAndHJhbnNwYXJlbnQnO1xuXG4gIEBWaWV3Q2hpbGQoJ2NoaWxkQ29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIGNoaWxkQ29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIEBPdXRwdXQoKSBjaGlsZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmFjdG9yOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEZWNEaWFsb2dDb21wb25lbnQ+XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyT3BlbigpXG4gICAgLnRvUHJvbWlzZSgpXG4gICAgLnRoZW4odGhpcy5mYWN0b3J5VGhlQ29tcG9uZW50KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBmYWN0b3J5VGhlQ29tcG9uZW50ID0gKCkgPT4ge1xuXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxhbnk+ID0gdGhpcy5mYWN0b3IucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5jaGlsZENvbXBvbmVudFR5cGUpO1xuXG4gICAgY29uc3QgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMuY2hpbGRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgdGhpcy5jaGlsZENvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXG4gICAgdGhpcy5jaGlsZC5lbWl0KHRoaXMuY2hpbGRDb21wb25lbnRJbnN0YW5jZSk7XG5cbiAgICB0aGlzLmNoaWxkLmNvbXBsZXRlKCk7IC8vIHVuc3Vic3JpYmUgc3Vic2NyaWJlcnNcblxuICAgIHRoaXMuYXBwZW5kQ29udGV4dFRvSW5zdGFuY2UoY29tcG9uZW50UmVmLmluc3RhbmNlLCB0aGlzLmNvbnRleHQpO1xuXG4gICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuXG4gIH1cblxuICBwcml2YXRlIGFwcGVuZENvbnRleHRUb0luc3RhbmNlKGluc3RhbmNlOiBhbnksIGNvbnRleHQ6IGFueSkge1xuXG4gICAgaWYgKGluc3RhbmNlICYmIGNvbnRleHQpIHtcblxuICAgICAgT2JqZWN0LmtleXMoY29udGV4dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cbiAgICAgICAgaW5zdGFuY2Vba2V5XSA9IHRoaXMuY29udGV4dFtrZXldO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbn1cbiJdfQ==