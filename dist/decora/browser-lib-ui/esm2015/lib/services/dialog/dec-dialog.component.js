/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export class DecDialogComponent {
    /**
     * @param {?} factor
     * @param {?} dialogRef
     */
    constructor(factor, dialogRef) {
        this.factor = factor;
        this.dialogRef = dialogRef;
        this.topActions = [];
        this.bottomActions = [];
        this.context = {};
        this.hideBackButton = false;
        this.showCancelButton = false;
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
                styles: [`.mat-dialog-actions,.mat-dialog-content{padding:32px}.mat-dialog-actions{margin-bottom:0}.fixActionRow{height:100%;display:flex;flex-direction:column}.spacer{flex-grow:1}.dec-dialog-title{font-size:24px;padding:0 16px}`]
            },] },
];
/** @nocollapse */
DecDialogComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: MatDialogRef }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RpYWxvZy9kZWMtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVUsd0JBQXdCLEVBQWtDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0osT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBK0VqRCxNQUFNOzs7OztJQTJCSixZQUNVLFFBQ0E7UUFEQSxXQUFNLEdBQU4sTUFBTTtRQUNOLGNBQVMsR0FBVCxTQUFTOzBCQXRCVSxFQUFFOzZCQUVDLEVBQUU7dUJBSW5CLEVBQUU7OEJBSUEsS0FBSztnQ0FFSCxLQUFLO3FCQUVoQixhQUFhO3FCQUlILElBQUksWUFBWSxFQUFPO21DQWVYLEdBQUcsRUFBRTs7WUFFakMsTUFBTSxnQkFBZ0IsR0FBMEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7WUFFN0csTUFBTSxZQUFZLEdBQXNCLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFOUYsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFFcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUV0QixJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FFcEI7S0ExQkc7Ozs7SUFFSixRQUFRO1FBRU4sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7YUFDekIsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBRWpDOzs7Ozs7SUFvQk8sdUJBQXVCLENBQUMsUUFBYSxFQUFFLE9BQVk7UUFFekQsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFFbkMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFFbkMsQ0FBQyxDQUFDO1NBRUo7Ozs7WUFqSkosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXdFWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyw0TkFBNE4sQ0FBQzthQUN2Tzs7OztZQWpGc0Msd0JBQXdCO1lBR3RELFlBQVk7Ozs2QkFzR2xCLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtvQkFFdEQsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBPbkluaXQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRGlhbG9nQWN0aW9uIH0gZnJvbSAnLi9kZWMtZGlhbG9nLm1vZGVscyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1kaWFsb2cnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmaXhBY3Rpb25Sb3dcIj5cblxuICA8bWF0LXRvb2xiYXIgW2NvbG9yXT1cImNvbG9yXCIgW25nU3R5bGVdPVwiY29sb3IgPT09ICd0cmFuc3BhcmVudCcgPyB7J2JhY2tncm91bmQnOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwKSd9IDoge31cIj5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeEZsZXhGaWxsIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCIhaGlkZUJhY2tCdXR0b25cIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWljb24tYnV0dG9uIGNsYXNzPVwidXBwZXJjYXNlXCIgbWF0LWRpYWxvZy1jbG9zZT5cbiAgICAgICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGVjLWRpYWxvZy10aXRsZVwiPnt7IHRpdGxlIH19PC9kaXY+XG4gICAgICA8ZGl2IGZ4RmxleD5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cInRvcEFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxtYXQtbWVudSAjZGVjRGlhbG9nQWN0aW9uc01lbnU9XCJtYXRNZW51XCI+XG4gICAgICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiB0b3BBY3Rpb25zXCIgbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiYWN0aW9uLmNhbGxiYWNrKGNvbnRleHQpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaTE4bkxhYmVsXCI+e3sgYWN0aW9uLmkxOG5MYWJlbCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L21hdC1tZW51PlxuXG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwiZGVjRGlhbG9nQWN0aW9uc01lbnVcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uPm1vcmVfdmVydDwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICA8L21hdC10b29sYmFyPlxuXG4gIDxkaXYgbWF0LWRpYWxvZy1jb250ZW50PlxuXG4gICAgPHRlbXBsYXRlICNjaGlsZENvbnRhaW5lcj48L3RlbXBsYXRlPlxuXG4gICAgPGRlYy1zcGlubmVyICpuZ0lmPVwiIWxvYWRlZFwiPjwvZGVjLXNwaW5uZXI+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxuXG5cbiAgPGRpdiBtYXQtZGlhbG9nLWFjdGlvbnMgYWxpZ249XCJlbmRcIiAqbmdJZj1cInNob3dDYW5jZWxCdXR0b24gfHwgYm90dG9tQWN0aW9uc1wiPlxuXG4gICAgPGJ1dHRvbiAqbmdJZj1cInNob3dDYW5jZWxCdXR0b25cIiBtYXQtYnV0dG9uIG1hdC1kaWFsb2ctY2xvc2U+XG4gICAgICB7eyAnbGFiZWwuQ2FuY2VsJyB8IHRyYW5zbGF0ZSB9fVxuICAgIDwvYnV0dG9uPlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGJvdHRvbUFjdGlvbnNcIj5cblxuICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiYWN0aW9uLmJ1dHRvblR5cGVcIj5cblxuICAgICAgICA8YnV0dG9uICpuZ1N3aXRjaENhc2U9XCInbWF0LWJ1dHRvbidcIiBtYXQtYnV0dG9uIChjbGljayk9XCJhY3Rpb24uY2FsbGJhY2soY29udGV4dClcIiBbY29sb3JdPVwiYWN0aW9uLmNvbG9yXCI+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaTE4bkxhYmVsXCI+e3sgYWN0aW9uLmkxOG5MYWJlbCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiAqbmdTd2l0Y2hDYXNlPVwiJ21hdC1yYWlzZWQtYnV0dG9uJ1wiIG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJhY3Rpb24uY2FsbGJhY2soY29udGV4dClcIiBbY29sb3JdPVwiYWN0aW9uLmNvbG9yXCI+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaTE4bkxhYmVsXCI+e3sgYWN0aW9uLmkxOG5MYWJlbCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiAqbmdTd2l0Y2hEZWZhdWx0IG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJhY3Rpb24uY2FsbGJhY2soY29udGV4dClcIiBbY29sb3JdPVwiYWN0aW9uLmNvbG9yXCI+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24uaTE4bkxhYmVsXCI+e3sgYWN0aW9uLmkxOG5MYWJlbCB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC1kaWFsb2ctYWN0aW9ucywubWF0LWRpYWxvZy1jb250ZW50e3BhZGRpbmc6MzJweH0ubWF0LWRpYWxvZy1hY3Rpb25ze21hcmdpbi1ib3R0b206MH0uZml4QWN0aW9uUm93e2hlaWdodDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59LnNwYWNlcntmbGV4LWdyb3c6MX0uZGVjLWRpYWxvZy10aXRsZXtmb250LXNpemU6MjRweDtwYWRkaW5nOjAgMTZweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIC8vIENVUlJFTlRcbiAgY2hpbGRDb21wb25lbnRUeXBlOiBDb21wb25lbnRUeXBlPGFueT47XG5cbiAgY2hpbGRDb21wb25lbnRJbnN0YW5jZTogYW55O1xuXG4gIHRvcEFjdGlvbnM6IERpYWxvZ0FjdGlvbltdID0gW107XG5cbiAgYm90dG9tQWN0aW9uczogRGlhbG9nQWN0aW9uW10gPSBbXTtcblxuICB0aXRsZTogc3RyaW5nO1xuXG4gIGNvbnRleHQ6IGFueSA9IHt9O1xuXG4gIGxvYWRlZDogYm9vbGVhbjtcblxuICBoaWRlQmFja0J1dHRvbiA9IGZhbHNlO1xuXG4gIHNob3dDYW5jZWxCdXR0b24gPSBmYWxzZTtcblxuICBjb2xvciA9ICd0cmFuc3BhcmVudCc7XG5cbiAgQFZpZXdDaGlsZCgnY2hpbGRDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgY2hpbGRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgQE91dHB1dCgpIGNoaWxkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmYWN0b3I6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERlY0RpYWxvZ0NvbXBvbmVudD5cbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJPcGVuKClcbiAgICAudG9Qcm9taXNlKClcbiAgICAudGhlbih0aGlzLmZhY3RvcnlUaGVDb21wb25lbnQpO1xuXG4gIH1cblxuICBwcml2YXRlIGZhY3RvcnlUaGVDb21wb25lbnQgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PGFueT4gPSB0aGlzLmZhY3Rvci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmNoaWxkQ29tcG9uZW50VHlwZSk7XG5cbiAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy5jaGlsZENvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cbiAgICB0aGlzLmNoaWxkLmVtaXQodGhpcy5jaGlsZENvbXBvbmVudEluc3RhbmNlKTtcblxuICAgIHRoaXMuY2hpbGQuY29tcGxldGUoKTsgLy8gdW5zdWJzcmliZSBzdWJzY3JpYmVyc1xuXG4gICAgdGhpcy5hcHBlbmRDb250ZXh0VG9JbnN0YW5jZShjb21wb25lbnRSZWYuaW5zdGFuY2UsIHRoaXMuY29udGV4dCk7XG5cbiAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG5cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kQ29udGV4dFRvSW5zdGFuY2UoaW5zdGFuY2U6IGFueSwgY29udGV4dDogYW55KSB7XG5cbiAgICBpZiAoaW5zdGFuY2UgJiYgY29udGV4dCkge1xuXG4gICAgICBPYmplY3Qua2V5cyhjb250ZXh0KS5mb3JFYWNoKChrZXkpID0+IHtcblxuICAgICAgICBpbnN0YW5jZVtrZXldID0gdGhpcy5jb250ZXh0W2tleV07XG5cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxufVxuIl19