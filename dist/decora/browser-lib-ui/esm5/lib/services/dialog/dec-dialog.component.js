/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DecApiService } from './../api/decora-api.service';
var DecDialogComponent = /** @class */ (function () {
    function DecDialogComponent(factor, dialogRef, decApi) {
        var _this = this;
        this.factor = factor;
        this.dialogRef = dialogRef;
        this.decApi = decApi;
        this.topActions = [];
        this.bottomActions = [];
        this.context = {};
        this.hideBackButton = false;
        this.showCancelButton = false;
        this.progressBarVisible = false;
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
        this.decApi.loading$.subscribe(function (state) {
            _this.progressBarVisible = state;
        });
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
                    template: "<div class=\"fixActionRow\">\n\n  <mat-toolbar [color]=\"color\" [ngStyle]=\"color === 'transparent' ? {'background': 'rgba(255, 255, 255, 0)'} : {}\">\n\n    <div fxLayout=\"row\" fxFlexFill fxLayoutAlign=\"start center\">\n      <div *ngIf=\"!hideBackButton\">\n        <button type=\"button\" mat-icon-button class=\"uppercase\" mat-dialog-close>\n          <mat-icon>arrow_back</mat-icon>\n        </button>\n      </div>\n      <div class=\"dec-dialog-title\">{{ title }}</div>\n      <div fxFlex>\n        <div fxLayout=\"row\" fxLayoutAlign=\"end center\">\n          <div *ngIf=\"topActions\">\n            <mat-menu #decDialogActionsMenu=\"matMenu\">\n              <button *ngFor=\"let action of topActions\" mat-menu-item (click)=\"action.callback(context)\">\n                <span *ngIf=\"action.label\">{{ action.label }}</span>\n                <span *ngIf=\"action.i18nLabel\">{{ action.i18nLabel | translate }}</span>\n              </button>\n            </mat-menu>\n\n            <button mat-icon-button [matMenuTriggerFor]=\"decDialogActionsMenu\">\n              <mat-icon>more_vert</mat-icon>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- PROGRESS BAR -->\n     <div class=\"progress-bar-wrapper\" *ngIf=\"progressBarVisible\">\n      <div class=\"progress-bar-message\" *ngIf=\"progressBarVisible !== true\">\n        {{ progressBarVisible }}\n      </div>\n      <mat-progress-bar mode=\"indeterminate\" color=\"accent\"></mat-progress-bar>\n    </div>\n    <!-- / PROGRESS BAR -->\n  </mat-toolbar>\n\n\n  <div mat-dialog-content>\n\n    <template #childContainer></template>\n\n    <dec-spinner *ngIf=\"!loaded\"></dec-spinner>\n\n  </div>\n\n  <div class=\"spacer\"></div>\n\n\n  <div mat-dialog-actions align=\"end\" *ngIf=\"showCancelButton || bottomActions\">\n\n    <button *ngIf=\"showCancelButton\" mat-button mat-dialog-close>\n      {{ 'label.Cancel' | translate }}\n    </button>\n\n    <ng-container *ngFor=\"let action of bottomActions\">\n\n      <ng-container [ngSwitch]=\"action.buttonType\">\n\n        <button *ngSwitchCase=\"'mat-button'\" mat-button (click)=\"action.callback(context)\" [color]=\"action.color\">\n          <span *ngIf=\"action.label\">{{ action.label }}</span>\n          <span *ngIf=\"action.i18nLabel\">{{ action.i18nLabel | translate }}</span>\n        </button>\n\n        <button *ngSwitchCase=\"'mat-raised-button'\" mat-raised-button (click)=\"action.callback(context)\" [color]=\"action.color\">\n          <span *ngIf=\"action.label\">{{ action.label }}</span>\n          <span *ngIf=\"action.i18nLabel\">{{ action.i18nLabel | translate }}</span>\n        </button>\n\n        <button *ngSwitchDefault mat-raised-button (click)=\"action.callback(context)\" [color]=\"action.color\">\n          <span *ngIf=\"action.label\">{{ action.label }}</span>\n          <span *ngIf=\"action.i18nLabel\">{{ action.i18nLabel | translate }}</span>\n        </button>\n\n      </ng-container>\n\n    </ng-container>\n  </div>\n</div>\n",
                    styles: [".mat-dialog-actions,.mat-dialog-content{padding:32px}.mat-dialog-actions{margin-bottom:0}.fixActionRow{height:100%;display:flex;flex-direction:column}.spacer{flex-grow:1}.dec-dialog-title{font-size:24px;padding:0 16px}.mat-toolbar{position:relative}.mat-toolbar .progress-bar-wrapper{position:absolute;bottom:0;width:inherit;margin-left:-16px}.mat-toolbar .progress-bar-wrapper .progress-bar-message{text-align:center;font-size:12px;line-height:12px}"]
                },] },
    ];
    /** @nocollapse */
    DecDialogComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: MatDialogRef },
        { type: DecApiService }
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
    DecDialogComponent.prototype.progressBarVisible;
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
    /** @type {?} */
    DecDialogComponent.prototype.decApi;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RpYWxvZy9kZWMtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVUsd0JBQXdCLEVBQWtDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0osT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUFxSDFELDRCQUNVLFFBQ0EsV0FDQTtRQUhWLGlCQVFDO1FBUFMsV0FBTSxHQUFOLE1BQU07UUFDTixjQUFTLEdBQVQsU0FBUztRQUNULFdBQU0sR0FBTixNQUFNOzBCQXpCZ0IsRUFBRTs2QkFFQyxFQUFFO3VCQUl0QixFQUFFOzhCQUlBLEtBQUs7Z0NBRUgsS0FBSztrQ0FFZSxLQUFLO3FCQUVwQyxhQUFhO3FCQUlILElBQUksWUFBWSxFQUFPO21DQW9CWDs7WUFFNUIsSUFBTSxnQkFBZ0IsR0FBMEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7WUFFN0csSUFBTSxZQUFZLEdBQXNCLEtBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFOUYsS0FBSSxDQUFDLHNCQUFzQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFFcEQsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFN0MsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUV0QixLQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbEUsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FFcEI7UUE3QkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNsQyxLQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQscUNBQVE7OztJQUFSO1FBRUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7YUFDekIsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBRWpDOzs7Ozs7SUFvQk8sb0RBQXVCOzs7OztjQUFDLFFBQWEsRUFBRSxPQUFZOztRQUV6RCxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7Z0JBRS9CLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBRW5DLENBQUMsQ0FBQztTQUVKOzs7Z0JBaktKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLHErRkFpRlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsb2NBQW9jLENBQUM7aUJBQy9jOzs7O2dCQTNGc0Msd0JBQXdCO2dCQUd0RCxZQUFZO2dCQUNaLGFBQWE7OztpQ0FpSG5CLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTt3QkFFdEQsTUFBTTs7NkJBdkhUOztTQTRGYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERlY0RpYWxvZ0FjdGlvbiB9IGZyb20gJy4vZGVjLWRpYWxvZy5tb2RlbHMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1kaWFsb2cnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmaXhBY3Rpb25Sb3dcIj5cblxuICA8bWF0LXRvb2xiYXIgW2NvbG9yXT1cImNvbG9yXCIgW25nU3R5bGVdPVwiY29sb3IgPT09ICd0cmFuc3BhcmVudCcgPyB7J2JhY2tncm91bmQnOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwKSd9IDoge31cIj5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeEZsZXhGaWxsIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCIhaGlkZUJhY2tCdXR0b25cIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIGNsYXNzPVwidXBwZXJjYXNlXCIgbWF0LWRpYWxvZy1jbG9zZT5cbiAgICAgICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGVjLWRpYWxvZy10aXRsZVwiPnt7IHRpdGxlIH19PC9kaXY+XG4gICAgICA8ZGl2IGZ4RmxleD5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cInRvcEFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxtYXQtbWVudSAjZGVjRGlhbG9nQWN0aW9uc01lbnU9XCJtYXRNZW51XCI+XG4gICAgICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiB0b3BBY3Rpb25zXCIgbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiYWN0aW9uLmNhbGxiYWNrKGNvbnRleHQpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaTE4bkxhYmVsXCI+e3sgYWN0aW9uLmkxOG5MYWJlbCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L21hdC1tZW51PlxuXG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwiZGVjRGlhbG9nQWN0aW9uc01lbnVcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uPm1vcmVfdmVydDwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gUFJPR1JFU1MgQkFSIC0tPlxuICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyLXdyYXBwZXJcIiAqbmdJZj1cInByb2dyZXNzQmFyVmlzaWJsZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhci1tZXNzYWdlXCIgKm5nSWY9XCJwcm9ncmVzc0JhclZpc2libGUgIT09IHRydWVcIj5cbiAgICAgICAge3sgcHJvZ3Jlc3NCYXJWaXNpYmxlIH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxtYXQtcHJvZ3Jlc3MtYmFyIG1vZGU9XCJpbmRldGVybWluYXRlXCIgY29sb3I9XCJhY2NlbnRcIj48L21hdC1wcm9ncmVzcy1iYXI+XG4gICAgPC9kaXY+XG4gICAgPCEtLSAvIFBST0dSRVNTIEJBUiAtLT5cbiAgPC9tYXQtdG9vbGJhcj5cblxuXG4gIDxkaXYgbWF0LWRpYWxvZy1jb250ZW50PlxuXG4gICAgPHRlbXBsYXRlICNjaGlsZENvbnRhaW5lcj48L3RlbXBsYXRlPlxuXG4gICAgPGRlYy1zcGlubmVyICpuZ0lmPVwiIWxvYWRlZFwiPjwvZGVjLXNwaW5uZXI+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxuXG5cbiAgPGRpdiBtYXQtZGlhbG9nLWFjdGlvbnMgYWxpZ249XCJlbmRcIiAqbmdJZj1cInNob3dDYW5jZWxCdXR0b24gfHwgYm90dG9tQWN0aW9uc1wiPlxuXG4gICAgPGJ1dHRvbiAqbmdJZj1cInNob3dDYW5jZWxCdXR0b25cIiBtYXQtYnV0dG9uIG1hdC1kaWFsb2ctY2xvc2U+XG4gICAgICB7eyAnbGFiZWwuQ2FuY2VsJyB8IHRyYW5zbGF0ZSB9fVxuICAgIDwvYnV0dG9uPlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGJvdHRvbUFjdGlvbnNcIj5cblxuICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiYWN0aW9uLmJ1dHRvblR5cGVcIj5cblxuICAgICAgICA8YnV0dG9uICpuZ1N3aXRjaENhc2U9XCInbWF0LWJ1dHRvbidcIiBtYXQtYnV0dG9uIChjbGljayk9XCJhY3Rpb24uY2FsbGJhY2soY29udGV4dClcIiBbY29sb3JdPVwiYWN0aW9uLmNvbG9yXCI+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaTE4bkxhYmVsXCI+e3sgYWN0aW9uLmkxOG5MYWJlbCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiAqbmdTd2l0Y2hDYXNlPVwiJ21hdC1yYWlzZWQtYnV0dG9uJ1wiIG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJhY3Rpb24uY2FsbGJhY2soY29udGV4dClcIiBbY29sb3JdPVwiYWN0aW9uLmNvbG9yXCI+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaTE4bkxhYmVsXCI+e3sgYWN0aW9uLmkxOG5MYWJlbCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiAqbmdTd2l0Y2hEZWZhdWx0IG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJhY3Rpb24uY2FsbGJhY2soY29udGV4dClcIiBbY29sb3JdPVwiYWN0aW9uLmNvbG9yXCI+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaTE4bkxhYmVsXCI+e3sgYWN0aW9uLmkxOG5MYWJlbCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC1kaWFsb2ctYWN0aW9ucywubWF0LWRpYWxvZy1jb250ZW50e3BhZGRpbmc6MzJweH0ubWF0LWRpYWxvZy1hY3Rpb25ze21hcmdpbi1ib3R0b206MH0uZml4QWN0aW9uUm93e2hlaWdodDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59LnNwYWNlcntmbGV4LWdyb3c6MX0uZGVjLWRpYWxvZy10aXRsZXtmb250LXNpemU6MjRweDtwYWRkaW5nOjAgMTZweH0ubWF0LXRvb2xiYXJ7cG9zaXRpb246cmVsYXRpdmV9Lm1hdC10b29sYmFyIC5wcm9ncmVzcy1iYXItd3JhcHBlcntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDt3aWR0aDppbmhlcml0O21hcmdpbi1sZWZ0Oi0xNnB4fS5tYXQtdG9vbGJhciAucHJvZ3Jlc3MtYmFyLXdyYXBwZXIgLnByb2dyZXNzLWJhci1tZXNzYWdle3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxMnB4O2xpbmUtaGVpZ2h0OjEycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvLyBDVVJSRU5UXG4gIGNoaWxkQ29tcG9uZW50VHlwZTogQ29tcG9uZW50VHlwZTxhbnk+O1xuXG4gIGNoaWxkQ29tcG9uZW50SW5zdGFuY2U6IGFueTtcblxuICB0b3BBY3Rpb25zOiBEZWNEaWFsb2dBY3Rpb25bXSA9IFtdO1xuXG4gIGJvdHRvbUFjdGlvbnM6IERlY0RpYWxvZ0FjdGlvbltdID0gW107XG5cbiAgdGl0bGU6IHN0cmluZztcblxuICBjb250ZXh0OiBhbnkgPSB7fTtcblxuICBsb2FkZWQ6IGJvb2xlYW47XG5cbiAgaGlkZUJhY2tCdXR0b24gPSBmYWxzZTtcblxuICBzaG93Q2FuY2VsQnV0dG9uID0gZmFsc2U7XG5cbiAgcHJvZ3Jlc3NCYXJWaXNpYmxlOiBzdHJpbmcgfCBib29sZWFuID0gZmFsc2U7XG5cbiAgY29sb3IgPSAndHJhbnNwYXJlbnQnO1xuXG4gIEBWaWV3Q2hpbGQoJ2NoaWxkQ29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIGNoaWxkQ29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIEBPdXRwdXQoKSBjaGlsZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmFjdG9yOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEZWNEaWFsb2dDb21wb25lbnQ+LFxuICAgIHByaXZhdGUgZGVjQXBpOiBEZWNBcGlTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLmRlY0FwaS5sb2FkaW5nJC5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgdGhpcy5wcm9ncmVzc0JhclZpc2libGUgPSBzdGF0ZTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJPcGVuKClcbiAgICAudG9Qcm9taXNlKClcbiAgICAudGhlbih0aGlzLmZhY3RvcnlUaGVDb21wb25lbnQpO1xuXG4gIH1cblxuICBwcml2YXRlIGZhY3RvcnlUaGVDb21wb25lbnQgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PGFueT4gPSB0aGlzLmZhY3Rvci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmNoaWxkQ29tcG9uZW50VHlwZSk7XG5cbiAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy5jaGlsZENvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cbiAgICB0aGlzLmNoaWxkLmVtaXQodGhpcy5jaGlsZENvbXBvbmVudEluc3RhbmNlKTtcblxuICAgIHRoaXMuY2hpbGQuY29tcGxldGUoKTsgLy8gdW5zdWJzcmliZSBzdWJzY3JpYmVyc1xuXG4gICAgdGhpcy5hcHBlbmRDb250ZXh0VG9JbnN0YW5jZShjb21wb25lbnRSZWYuaW5zdGFuY2UsIHRoaXMuY29udGV4dCk7XG5cbiAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG5cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kQ29udGV4dFRvSW5zdGFuY2UoaW5zdGFuY2U6IGFueSwgY29udGV4dDogYW55KSB7XG5cbiAgICBpZiAoaW5zdGFuY2UgJiYgY29udGV4dCkge1xuXG4gICAgICBPYmplY3Qua2V5cyhjb250ZXh0KS5mb3JFYWNoKChrZXkpID0+IHtcblxuICAgICAgICBpbnN0YW5jZVtrZXldID0gdGhpcy5jb250ZXh0W2tleV07XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIl19