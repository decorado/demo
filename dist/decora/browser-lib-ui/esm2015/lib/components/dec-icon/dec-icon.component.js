/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            catch (/** @type {?} */ error) { }
        }, 0);
    }
}
DecIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-icon',
                template: `<ng-container [ngSwitch]="font">
  <ng-container *ngSwitchCase="'mat'">
    <i class="material-icons">{{icon}}</i>
  </ng-container>
  <ng-container *ngSwitchCase="'fas'">
    <i class="fa {{'fa-'+icon}}" aria-hidden="true"></i>
  </ng-container>
</ng-container>

<span #text [hidden]="true">
  <ng-content></ng-content>
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
function DecIconComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecIconComponent.prototype.icon;
    /** @type {?} */
    DecIconComponent.prototype.font;
    /** @type {?} */
    DecIconComponent.prototype.textElement;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pY29uL2RlYy1pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFtQnZGLE1BQU07SUFRSixpQkFBaUI7Ozs7SUFFakIsZUFBZTtRQUNiLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7YUFDeEQ7WUFBQyxLQUFLLENBQUMsQ0FBQyxpQkFBQSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1NBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDUDs7O1lBakNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Q0FZWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxtUEFBbVAsQ0FBQzthQUM5UDs7Ozs7bUJBS0UsS0FBSzswQkFFTCxTQUFTLFNBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtaWNvbicsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiZm9udFwiPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInbWF0J1wiPlxuICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj57e2ljb259fTwvaT5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidmYXMnXCI+XG4gICAgPGkgY2xhc3M9XCJmYSB7eydmYS0nK2ljb259fVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cblxuPHNwYW4gI3RleHQgW2hpZGRlbl09XCJ0cnVlXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvc3Bhbj5cbmAsXG4gIHN0eWxlczogW2AubWF0ZXJpYWwtaWNvbnN7Y29sb3I6aW5oZXJpdDtmb250LXNpemU6aW5oZXJpdDtkaXNwbGF5OmlubGluZS1ibG9jazstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDE2JSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTYlKTstd2Via2l0LXRvdWNoLWNhbGxvdXQ6bm9uZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSWNvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIGljb246IHN0cmluZztcblxuICBASW5wdXQoKSBmb250OiAnbWF0JyB8ICdmYXMnO1xuXG4gIEBWaWV3Q2hpbGQoJ3RleHQnKSB0ZXh0RWxlbWVudDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuaWNvbiA9IHRoaXMudGV4dEVsZW1lbnQubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cbiAgICB9LCAwKTtcbiAgfVxuXG59XG4iXX0=