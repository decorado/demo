/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        this.actions = [];
        this.context = {};
        this.child = new EventEmitter();
        this.factoryTheComponent = () => {
            const /** @type {?} */ componentFactory = this.factor.resolveComponentFactory(this.childComponentType);
            const /** @type {?} */ componentRef = this.childContainer.createComponent(componentFactory);
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
                template: `<mat-toolbar color="primary">

  <div fxLayout="row" fxFlexFill fxLayoutAlign="start center">
    <div>
      <button type="button" mat-icon-button class="uppercase" mat-dialog-close>
        <mat-icon>arrow_back</mat-icon>
      </button>
    </div>
    <div>
      <h1>&nbsp; {{ title }}</h1>
    </div>
    <div fxFlex>
      <div fxLayout="row" fxLayoutAlign="end center">
        <div *ngIf="actions">
          <mat-menu #decDialogActionsMenu="matMenu">
            <button *ngFor="let action of actions" mat-menu-item (click)="action.callback(context)">
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

<div class="dec-dialog-child-wrapper">
  <template #childContainer></template>
</div>

<dec-spinner *ngIf="!loaded"></dec-spinner>
`,
                styles: [`.dec-dialog-child-wrapper{padding:32px}`]
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
function DecDialogComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecDialogComponent.prototype.childComponentType;
    /** @type {?} */
    DecDialogComponent.prototype.childComponentInstance;
    /** @type {?} */
    DecDialogComponent.prototype.actions;
    /** @type {?} */
    DecDialogComponent.prototype.title;
    /** @type {?} */
    DecDialogComponent.prototype.context;
    /** @type {?} */
    DecDialogComponent.prototype.loaded;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWRpYWxvZy9kZWMtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVUsd0JBQXdCLEVBQWtDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0osT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBMkNqRCxNQUFNOzs7OztJQW1CSixZQUNVLFFBQ0E7UUFEQSxXQUFNLEdBQU4sTUFBTTtRQUNOLGNBQVMsR0FBVCxTQUFTO3VCQWRPLEVBQUU7dUJBSWIsRUFBRTtxQkFNQyxJQUFJLFlBQVksRUFBTzttQ0FlWCxHQUFHLEVBQUU7WUFFakMsdUJBQU0sZ0JBQWdCLEdBQTBCLElBQUksQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFN0csdUJBQU0sWUFBWSxHQUFzQixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTlGLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBRXBELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRTdDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFdEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWxFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBRXBCO0tBMUJHOzs7O0lBRUosUUFBUTtRQUVOLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO2FBQ3pCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztLQUVqQzs7Ozs7O0lBb0JPLHVCQUF1QixDQUFDLFFBQWEsRUFBRSxPQUFZO1FBRXpELEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBRW5DLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBRW5DLENBQUMsQ0FBQztTQUVKOzs7O1lBckdKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FvQ1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMseUNBQXlDLENBQUM7YUFDcEQ7Ozs7WUE3Q3NDLHdCQUF3QjtZQUd0RCxZQUFZOzs7NkJBMERsQixTQUFTLFNBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7b0JBRXRELE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgT25Jbml0LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERpYWxvZ0FjdGlvbiB9IGZyb20gJy4vZGVjLWRpYWxvZy5tb2RlbHMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZGlhbG9nJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXRvb2xiYXIgY29sb3I9XCJwcmltYXJ5XCI+XG5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4RmxleEZpbGwgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxuICAgIDxkaXY+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJ1cHBlcmNhc2VcIiBtYXQtZGlhbG9nLWNsb3NlPlxuICAgICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGgxPiZuYnNwOyB7eyB0aXRsZSB9fTwvaDE+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBmeEZsZXg+XG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImFjdGlvbnNcIj5cbiAgICAgICAgICA8bWF0LW1lbnUgI2RlY0RpYWxvZ0FjdGlvbnNNZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGFjdGlvbnNcIiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJhY3Rpb24uY2FsbGJhY2soY29udGV4dClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhY3Rpb24ubGFiZWxcIj57eyBhY3Rpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWN0aW9uLmkxOG5MYWJlbFwiPnt7IGFjdGlvbi5pMThuTGFiZWwgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L21hdC1tZW51PlxuXG4gICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cImRlY0RpYWxvZ0FjdGlvbnNNZW51XCI+XG4gICAgICAgICAgICA8bWF0LWljb24+bW9yZV92ZXJ0PC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjwvbWF0LXRvb2xiYXI+XG5cbjxkaXYgY2xhc3M9XCJkZWMtZGlhbG9nLWNoaWxkLXdyYXBwZXJcIj5cbiAgPHRlbXBsYXRlICNjaGlsZENvbnRhaW5lcj48L3RlbXBsYXRlPlxuPC9kaXY+XG5cbjxkZWMtc3Bpbm5lciAqbmdJZj1cIiFsb2FkZWRcIj48L2RlYy1zcGlubmVyPlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtZGlhbG9nLWNoaWxkLXdyYXBwZXJ7cGFkZGluZzozMnB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLy8gQ1VSUkVOVFxuICBjaGlsZENvbXBvbmVudFR5cGU6IENvbXBvbmVudFR5cGU8YW55PjtcblxuICBjaGlsZENvbXBvbmVudEluc3RhbmNlOiBhbnk7XG5cbiAgYWN0aW9uczogRGlhbG9nQWN0aW9uW10gPSBbXTtcblxuICB0aXRsZTogc3RyaW5nO1xuXG4gIGNvbnRleHQ6IGFueSA9IHt9O1xuXG4gIGxvYWRlZDogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKCdjaGlsZENvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBjaGlsZENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBAT3V0cHV0KCkgY2hpbGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZhY3RvcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGVjRGlhbG9nQ29tcG9uZW50PlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLmRpYWxvZ1JlZi5hZnRlck9wZW4oKVxuICAgIC50b1Byb21pc2UoKVxuICAgIC50aGVuKHRoaXMuZmFjdG9yeVRoZUNvbXBvbmVudCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZmFjdG9yeVRoZUNvbXBvbmVudCA9ICgpID0+IHtcblxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiA9IHRoaXMuZmFjdG9yLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuY2hpbGRDb21wb25lbnRUeXBlKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gPSB0aGlzLmNoaWxkQ29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgIHRoaXMuY2hpbGRDb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcblxuICAgIHRoaXMuY2hpbGQuZW1pdCh0aGlzLmNoaWxkQ29tcG9uZW50SW5zdGFuY2UpO1xuXG4gICAgdGhpcy5jaGlsZC5jb21wbGV0ZSgpOyAvLyB1bnN1YnNyaWJlIHN1YnNjcmliZXJzXG5cbiAgICB0aGlzLmFwcGVuZENvbnRleHRUb0luc3RhbmNlKGNvbXBvbmVudFJlZi5pbnN0YW5jZSwgdGhpcy5jb250ZXh0KTtcblxuICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcblxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRDb250ZXh0VG9JbnN0YW5jZShpbnN0YW5jZTogYW55LCBjb250ZXh0OiBhbnkpIHtcblxuICAgIGlmIChpbnN0YW5jZSAmJiBjb250ZXh0KSB7XG5cbiAgICAgIE9iamVjdC5rZXlzKGNvbnRleHQpLmZvckVhY2goKGtleSkgPT4ge1xuXG4gICAgICAgIGluc3RhbmNlW2tleV0gPSB0aGlzLmNvbnRleHRba2V5XTtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG59XG4iXX0=