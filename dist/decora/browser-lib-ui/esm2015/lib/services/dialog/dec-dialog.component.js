/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DecApiService } from './../api/decora-api.service';
export class DecDialogComponent {
    /**
     * @param {?} factor
     * @param {?} dialogRef
     * @param {?} decApi
     */
    constructor(factor, dialogRef, decApi) {
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
        this.factoryTheComponent = () => {
            /** @type {?} */
            const componentFactory = this.factor.resolveComponentFactory(this.childComponentType);
            /** @type {?} */
            const componentRef = this.childContainer.createComponent(componentFactory);
            this.childComponentInstance = componentRef.instance;
            this.child.emit(this.childComponentInstance);
            this.child.complete(); // unsubsribe subscribers
            this.appendContextToInstance(componentRef.instance, this.context);
            this.loaded = true;
        };
        this.decApi.loading$.subscribe(state => {
            this.progressBarVisible = state;
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.dialogRef.afterOpen()
            .toPromise()
            .then(this.factoryTheComponent);
    }
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    appendContextToInstance(instance, context) {
        if (instance && context) {
            Object.keys(context).forEach((key) => {
                instance[key] = this.context[key];
            });
        }
    }
}
DecDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-dialog',
                template: `<div class="fixActionRow">

  <mat-toolbar [color]="color" [ngStyle]="color === 'transparent' ? {'background': 'rgba(255, 255, 255, 0)'} : {}">

    <div fxLayout="row" fxFlexFill fxLayoutAlign="start center">
      <div *ngIf="!hideBackButton">
        <button type="button" mat-icon-button class="uppercase" mat-dialog-close>
          <mat-icon>arrow_back</mat-icon>
        </button>
      </div>
      <div class="dec-dialog-title">{{ title }}</div>
      <div fxFlex>
        <div fxLayout="row" fxLayoutAlign="end center">
          <div *ngIf="topActions">
            <mat-menu #decDialogActionsMenu="matMenu">
              <button *ngFor="let action of topActions" mat-menu-item (click)="action.callback(context)">
                <span *ngIf="action.label">{{ action.label }}</span>
                <span *ngIf="action.i18nLabel">{{ action.i18nLabel | translate }}</span>
              </button>
            </mat-menu>

            <button mat-icon-button [matMenuTriggerFor]="decDialogActionsMenu">
              <mat-icon>more_vert</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- PROGRESS BAR -->
     <div class="progress-bar-wrapper" *ngIf="progressBarVisible">
      <div class="progress-bar-message" *ngIf="progressBarVisible !== true">
        {{ progressBarVisible }}
      </div>
      <mat-progress-bar mode="indeterminate" color="accent"></mat-progress-bar>
    </div>
    <!-- / PROGRESS BAR -->
  </mat-toolbar>


  <div mat-dialog-content>

    <template #childContainer></template>

    <dec-spinner *ngIf="!loaded"></dec-spinner>

  </div>

  <div class="spacer"></div>


  <div mat-dialog-actions align="end" *ngIf="showCancelButton || bottomActions">

    <button *ngIf="showCancelButton" mat-button mat-dialog-close>
      {{ 'label.Cancel' | translate }}
    </button>

    <ng-container *ngFor="let action of bottomActions">

      <ng-container [ngSwitch]="action.buttonType">

        <button *ngSwitchCase="'mat-button'" mat-button (click)="action.callback(context)" [color]="action.color">
          <span *ngIf="action.label">{{ action.label }}</span>
          <span *ngIf="action.i18nLabel">{{ action.i18nLabel | translate }}</span>
        </button>

        <button *ngSwitchCase="'mat-raised-button'" mat-raised-button (click)="action.callback(context)" [color]="action.color">
          <span *ngIf="action.label">{{ action.label }}</span>
          <span *ngIf="action.i18nLabel">{{ action.i18nLabel | translate }}</span>
        </button>

        <button *ngSwitchDefault mat-raised-button (click)="action.callback(context)" [color]="action.color">
          <span *ngIf="action.label">{{ action.label }}</span>
          <span *ngIf="action.i18nLabel">{{ action.i18nLabel | translate }}</span>
        </button>

      </ng-container>

    </ng-container>
  </div>
</div>
`,
                styles: [`.mat-dialog-actions,.mat-dialog-content{padding:32px}.mat-dialog-actions{margin-bottom:0}.fixActionRow{height:100%;display:flex;flex-direction:column}.spacer{flex-grow:1}.dec-dialog-title{font-size:24px;padding:0 16px}.mat-toolbar{position:relative}.mat-toolbar .progress-bar-wrapper{position:absolute;bottom:0;width:inherit;margin-left:-16px}.mat-toolbar .progress-bar-wrapper .progress-bar-message{text-align:center;font-size:12px;line-height:12px}`]
            },] },
];
/** @nocollapse */
DecDialogComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: MatDialogRef },
    { type: DecApiService }
];
DecDialogComponent.propDecorators = {
    childContainer: [{ type: ViewChild, args: ['childContainer', { read: ViewContainerRef },] }],
    child: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RpYWxvZy9kZWMtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVUsd0JBQXdCLEVBQWtDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0osT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQXdGNUQsTUFBTTs7Ozs7O0lBNkJKLFlBQ1UsUUFDQSxXQUNBO1FBRkEsV0FBTSxHQUFOLE1BQU07UUFDTixjQUFTLEdBQVQsU0FBUztRQUNULFdBQU0sR0FBTixNQUFNOzBCQXpCZ0IsRUFBRTs2QkFFQyxFQUFFO3VCQUl0QixFQUFFOzhCQUlBLEtBQUs7Z0NBRUgsS0FBSztrQ0FFZSxLQUFLO3FCQUVwQyxhQUFhO3FCQUlILElBQUksWUFBWSxFQUFPO21DQW9CWCxHQUFHLEVBQUU7O1lBRWpDLE1BQU0sZ0JBQWdCLEdBQTBCLElBQUksQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7O1lBRTdHLE1BQU0sWUFBWSxHQUFzQixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTlGLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBRXBELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRTdDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFdEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWxFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBRXBCO1FBN0JDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsUUFBUTtRQUVOLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO2FBQ3pCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztLQUVqQzs7Ozs7O0lBb0JPLHVCQUF1QixDQUFDLFFBQWEsRUFBRSxPQUFZO1FBRXpELEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBRW5DLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBRW5DLENBQUMsQ0FBQztTQUVKOzs7O1lBaktKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FpRlg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsb2NBQW9jLENBQUM7YUFDL2M7Ozs7WUEzRnNDLHdCQUF3QjtZQUd0RCxZQUFZO1lBQ1osYUFBYTs7OzZCQWlIbkIsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFO29CQUV0RCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIE9uSW5pdCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBEZWNEaWFsb2dBY3Rpb24gfSBmcm9tICcuL2RlYy1kaWFsb2cubW9kZWxzJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZGlhbG9nJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZml4QWN0aW9uUm93XCI+XG5cbiAgPG1hdC10b29sYmFyIFtjb2xvcl09XCJjb2xvclwiIFtuZ1N0eWxlXT1cImNvbG9yID09PSAndHJhbnNwYXJlbnQnID8geydiYWNrZ3JvdW5kJzogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMCknfSA6IHt9XCI+XG5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhGbGV4RmlsbCBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwiIWhpZGVCYWNrQnV0dG9uXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cInVwcGVyY2FzZVwiIG1hdC1kaWFsb2ctY2xvc2U+XG4gICAgICAgICAgPG1hdC1pY29uPmFycm93X2JhY2s8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRlYy1kaWFsb2ctdGl0bGVcIj57eyB0aXRsZSB9fTwvZGl2PlxuICAgICAgPGRpdiBmeEZsZXg+XG4gICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJ0b3BBY3Rpb25zXCI+XG4gICAgICAgICAgICA8bWF0LW1lbnUgI2RlY0RpYWxvZ0FjdGlvbnNNZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgdG9wQWN0aW9uc1wiIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImFjdGlvbi5jYWxsYmFjayhjb250ZXh0KVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmxhYmVsXCI+e3sgYWN0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9tYXQtbWVudT5cblxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cImRlY0RpYWxvZ0FjdGlvbnNNZW51XCI+XG4gICAgICAgICAgICAgIDxtYXQtaWNvbj5tb3JlX3ZlcnQ8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIFBST0dSRVNTIEJBUiAtLT5cbiAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhci13cmFwcGVyXCIgKm5nSWY9XCJwcm9ncmVzc0JhclZpc2libGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXItbWVzc2FnZVwiICpuZ0lmPVwicHJvZ3Jlc3NCYXJWaXNpYmxlICE9PSB0cnVlXCI+XG4gICAgICAgIHt7IHByb2dyZXNzQmFyVmlzaWJsZSB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8bWF0LXByb2dyZXNzLWJhciBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiIGNvbG9yPVwiYWNjZW50XCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPlxuICAgIDwvZGl2PlxuICAgIDwhLS0gLyBQUk9HUkVTUyBCQVIgLS0+XG4gIDwvbWF0LXRvb2xiYXI+XG5cblxuICA8ZGl2IG1hdC1kaWFsb2ctY29udGVudD5cblxuICAgIDx0ZW1wbGF0ZSAjY2hpbGRDb250YWluZXI+PC90ZW1wbGF0ZT5cblxuICAgIDxkZWMtc3Bpbm5lciAqbmdJZj1cIiFsb2FkZWRcIj48L2RlYy1zcGlubmVyPlxuXG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cblxuXG4gIDxkaXYgbWF0LWRpYWxvZy1hY3Rpb25zIGFsaWduPVwiZW5kXCIgKm5nSWY9XCJzaG93Q2FuY2VsQnV0dG9uIHx8IGJvdHRvbUFjdGlvbnNcIj5cblxuICAgIDxidXR0b24gKm5nSWY9XCJzaG93Q2FuY2VsQnV0dG9uXCIgbWF0LWJ1dHRvbiBtYXQtZGlhbG9nLWNsb3NlPlxuICAgICAge3sgJ2xhYmVsLkNhbmNlbCcgfCB0cmFuc2xhdGUgfX1cbiAgICA8L2J1dHRvbj5cblxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBib3R0b21BY3Rpb25zXCI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImFjdGlvbi5idXR0b25UeXBlXCI+XG5cbiAgICAgICAgPGJ1dHRvbiAqbmdTd2l0Y2hDYXNlPVwiJ21hdC1idXR0b24nXCIgbWF0LWJ1dHRvbiAoY2xpY2spPVwiYWN0aW9uLmNhbGxiYWNrKGNvbnRleHQpXCIgW2NvbG9yXT1cImFjdGlvbi5jb2xvclwiPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmxhYmVsXCI+e3sgYWN0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b24gKm5nU3dpdGNoQ2FzZT1cIidtYXQtcmFpc2VkLWJ1dHRvbidcIiBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwiYWN0aW9uLmNhbGxiYWNrKGNvbnRleHQpXCIgW2NvbG9yXT1cImFjdGlvbi5jb2xvclwiPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmxhYmVsXCI+e3sgYWN0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b24gKm5nU3dpdGNoRGVmYXVsdCBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwiYWN0aW9uLmNhbGxiYWNrKGNvbnRleHQpXCIgW2NvbG9yXT1cImFjdGlvbi5jb2xvclwiPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmxhYmVsXCI+e3sgYWN0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5tYXQtZGlhbG9nLWFjdGlvbnMsLm1hdC1kaWFsb2ctY29udGVudHtwYWRkaW5nOjMycHh9Lm1hdC1kaWFsb2ctYWN0aW9uc3ttYXJnaW4tYm90dG9tOjB9LmZpeEFjdGlvblJvd3toZWlnaHQ6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5zcGFjZXJ7ZmxleC1ncm93OjF9LmRlYy1kaWFsb2ctdGl0bGV7Zm9udC1zaXplOjI0cHg7cGFkZGluZzowIDE2cHh9Lm1hdC10b29sYmFye3Bvc2l0aW9uOnJlbGF0aXZlfS5tYXQtdG9vbGJhciAucHJvZ3Jlc3MtYmFyLXdyYXBwZXJ7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7d2lkdGg6aW5oZXJpdDttYXJnaW4tbGVmdDotMTZweH0ubWF0LXRvb2xiYXIgLnByb2dyZXNzLWJhci13cmFwcGVyIC5wcm9ncmVzcy1iYXItbWVzc2FnZXt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6MTJweDtsaW5lLWhlaWdodDoxMnB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLy8gQ1VSUkVOVFxuICBjaGlsZENvbXBvbmVudFR5cGU6IENvbXBvbmVudFR5cGU8YW55PjtcblxuICBjaGlsZENvbXBvbmVudEluc3RhbmNlOiBhbnk7XG5cbiAgdG9wQWN0aW9uczogRGVjRGlhbG9nQWN0aW9uW10gPSBbXTtcblxuICBib3R0b21BY3Rpb25zOiBEZWNEaWFsb2dBY3Rpb25bXSA9IFtdO1xuXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgY29udGV4dDogYW55ID0ge307XG5cbiAgbG9hZGVkOiBib29sZWFuO1xuXG4gIGhpZGVCYWNrQnV0dG9uID0gZmFsc2U7XG5cbiAgc2hvd0NhbmNlbEJ1dHRvbiA9IGZhbHNlO1xuXG4gIHByb2dyZXNzQmFyVmlzaWJsZTogc3RyaW5nIHwgYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbG9yID0gJ3RyYW5zcGFyZW50JztcblxuICBAVmlld0NoaWxkKCdjaGlsZENvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBjaGlsZENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBAT3V0cHV0KCkgY2hpbGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZhY3RvcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGVjRGlhbG9nQ29tcG9uZW50PixcbiAgICBwcml2YXRlIGRlY0FwaTogRGVjQXBpU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5kZWNBcGkubG9hZGluZyQuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXJWaXNpYmxlID0gc3RhdGU7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyT3BlbigpXG4gICAgLnRvUHJvbWlzZSgpXG4gICAgLnRoZW4odGhpcy5mYWN0b3J5VGhlQ29tcG9uZW50KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBmYWN0b3J5VGhlQ29tcG9uZW50ID0gKCkgPT4ge1xuXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxhbnk+ID0gdGhpcy5mYWN0b3IucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5jaGlsZENvbXBvbmVudFR5cGUpO1xuXG4gICAgY29uc3QgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiA9IHRoaXMuY2hpbGRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgdGhpcy5jaGlsZENvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXG4gICAgdGhpcy5jaGlsZC5lbWl0KHRoaXMuY2hpbGRDb21wb25lbnRJbnN0YW5jZSk7XG5cbiAgICB0aGlzLmNoaWxkLmNvbXBsZXRlKCk7IC8vIHVuc3Vic3JpYmUgc3Vic2NyaWJlcnNcblxuICAgIHRoaXMuYXBwZW5kQ29udGV4dFRvSW5zdGFuY2UoY29tcG9uZW50UmVmLmluc3RhbmNlLCB0aGlzLmNvbnRleHQpO1xuXG4gICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuXG4gIH1cblxuICBwcml2YXRlIGFwcGVuZENvbnRleHRUb0luc3RhbmNlKGluc3RhbmNlOiBhbnksIGNvbnRleHQ6IGFueSkge1xuXG4gICAgaWYgKGluc3RhbmNlICYmIGNvbnRleHQpIHtcblxuICAgICAgT2JqZWN0LmtleXMoY29udGV4dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cbiAgICAgICAgaW5zdGFuY2Vba2V5XSA9IHRoaXMuY29udGV4dFtrZXldO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICB9XG5cbn1cbiJdfQ==