/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ContentChild } from '@angular/core';
import { DecSidenavToolbarTitleComponent } from './../dec-sidenav-toolbar-title/dec-sidenav-toolbar-title.component';
export class DecSidenavToolbarComponent {
    constructor() {
        this.notProduction = true;
        this.ribbon = '';
        this.label = '';
        this.leftMenuTriggerVisible = true;
        this.rightMenuTriggerVisible = true;
        this.toggleLeftMenu = new EventEmitter();
        this.toggleRightMenu = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout(() => {
            this.initialized = true;
        }, 1);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.environment === 'local') {
            this.ribbon = 'ribbon-green';
            this.label = 'label.local';
        }
        else if (this.environment === 'development') {
            this.ribbon = 'ribbon-blue';
            this.label = 'label.development';
        }
        else if (this.environment === 'qa') {
            this.ribbon = 'ribbon-red';
            this.label = 'label.qa';
        }
        else if (this.environment === 'active') {
            this.ribbon = 'ribbon-green';
            this.label = 'label.active';
        }
        else {
            this.notProduction = false;
            this.ribbon = 'ribbon-hidden';
        }
    }
}
DecSidenavToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sidenav-toolbar',
                template: `<mat-toolbar [color]="color" *ngIf="initialized" class="dec-sidenav-toolbar">

  <span class="items-icon item-left" *ngIf="leftMenuTriggerVisible" (click)="toggleLeftMenu.emit()">
    &#9776;
  </span>

  <span *ngIf="customTitle">
    <ng-content select="dec-sidenav-toolbar-title"></ng-content>
  </span>

  <div class="ribbon {{ribbon}}" *ngIf="notProduction">
    <span>{{label | translate}}</span>
  </div>

  <span class="dec-sidenav-toolbar-custom-content">
    <ng-content></ng-content>
  </span>

  <span class="items-spacer"></span>

  <span class="items-icon item-right" *ngIf="rightMenuTriggerVisible" (click)="toggleRightMenu.emit()">
    &#9776;
  </span>

</mat-toolbar>
`,
                styles: [`.items-spacer{flex:1 1 auto}.items-icon{cursor:pointer;-webkit-transform:scale(1.2,.8);transform:scale(1.2,.8)}.items-icon.item-right{padding-left:14px}.items-icon.item-left{padding-right:14px}.dec-sidenav-toolbar-custom-content{padding:0 16px;width:100%}.ribbon{transition:all .3s ease;text-transform:lowercase;text-align:center;position:relative;line-height:64px;margin-left:4px;padding:0 20px;height:64px;width:155px;color:#fff;left:20px;top:0}.ribbon.ribbon-hidden{display:none}.ribbon::before{content:'';position:fixed;width:100vw;height:4px;z-index:2;top:64px;left:0}@media screen and (max-width:599px){.ribbon::before{top:56px}}`]
            },] },
];
/** @nocollapse */
DecSidenavToolbarComponent.ctorParameters = () => [];
DecSidenavToolbarComponent.propDecorators = {
    color: [{ type: Input }],
    environment: [{ type: Input }],
    leftMenuTriggerVisible: [{ type: Input }],
    rightMenuTriggerVisible: [{ type: Input }],
    toggleLeftMenu: [{ type: Output }],
    toggleRightMenu: [{ type: Output }],
    customTitle: [{ type: ContentChild, args: [DecSidenavToolbarTitleComponent,] }]
};
if (false) {
    /** @type {?} */
    DecSidenavToolbarComponent.prototype.initialized;
    /** @type {?} */
    DecSidenavToolbarComponent.prototype.notProduction;
    /** @type {?} */
    DecSidenavToolbarComponent.prototype.ribbon;
    /** @type {?} */
    DecSidenavToolbarComponent.prototype.label;
    /** @type {?} */
    DecSidenavToolbarComponent.prototype.color;
    /** @type {?} */
    DecSidenavToolbarComponent.prototype.environment;
    /** @type {?} */
    DecSidenavToolbarComponent.prototype.leftMenuTriggerVisible;
    /** @type {?} */
    DecSidenavToolbarComponent.prototype.rightMenuTriggerVisible;
    /** @type {?} */
    DecSidenavToolbarComponent.prototype.toggleLeftMenu;
    /** @type {?} */
    DecSidenavToolbarComponent.prototype.toggleRightMenu;
    /** @type {?} */
    DecSidenavToolbarComponent.prototype.customTitle;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNpZGVuYXYtdG9vbGJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2lkZW5hdi9kZWMtc2lkZW5hdi10b29sYmFyL2RlYy1zaWRlbmF2LXRvb2xiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFnQ3JILE1BQU07SUFzQko7NkJBbEJnQixJQUFJO3NCQUNYLEVBQUU7cUJBQ0gsRUFBRTtzQ0FNd0IsSUFBSTt1Q0FFSCxJQUFJOzhCQUVPLElBQUksWUFBWSxFQUFPOytCQUV0QixJQUFJLFlBQVksRUFBTztLQUlyRDs7OztJQUVqQixlQUFlO1FBQ2IsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDUDs7OztJQUVELFFBQVE7UUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7U0FDNUI7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUM7U0FDbEM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1NBQ3pCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztTQUM3QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7U0FDL0I7S0FDRjs7O1lBN0VGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F5Qlg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsNm5CQUE2bkIsQ0FBQzthQUN4b0I7Ozs7O29CQVNFLEtBQUs7MEJBRUwsS0FBSztxQ0FFTCxLQUFLO3NDQUVMLEtBQUs7NkJBRUwsTUFBTTs4QkFFTixNQUFNOzBCQUVOLFlBQVksU0FBQywrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9kZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlL2RlYy1zaWRlbmF2LXRvb2xiYXItdGl0bGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNpZGVuYXYtdG9vbGJhcicsXG4gIHRlbXBsYXRlOiBgPG1hdC10b29sYmFyIFtjb2xvcl09XCJjb2xvclwiICpuZ0lmPVwiaW5pdGlhbGl6ZWRcIiBjbGFzcz1cImRlYy1zaWRlbmF2LXRvb2xiYXJcIj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLWljb24gaXRlbS1sZWZ0XCIgKm5nSWY9XCJsZWZ0TWVudVRyaWdnZXJWaXNpYmxlXCIgKGNsaWNrKT1cInRvZ2dsZUxlZnRNZW51LmVtaXQoKVwiPlxuICAgICYjOTc3NjtcbiAgPC9zcGFuPlxuXG4gIDxzcGFuICpuZ0lmPVwiY3VzdG9tVGl0bGVcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJkZWMtc2lkZW5hdi10b29sYmFyLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICA8L3NwYW4+XG5cbiAgPGRpdiBjbGFzcz1cInJpYmJvbiB7e3JpYmJvbn19XCIgKm5nSWY9XCJub3RQcm9kdWN0aW9uXCI+XG4gICAgPHNwYW4+e3tsYWJlbCB8IHRyYW5zbGF0ZX19PC9zcGFuPlxuICA8L2Rpdj5cblxuICA8c3BhbiBjbGFzcz1cImRlYy1zaWRlbmF2LXRvb2xiYXItY3VzdG9tLWNvbnRlbnRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvc3Bhbj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLXNwYWNlclwiPjwvc3Bhbj5cblxuICA8c3BhbiBjbGFzcz1cIml0ZW1zLWljb24gaXRlbS1yaWdodFwiICpuZ0lmPVwicmlnaHRNZW51VHJpZ2dlclZpc2libGVcIiAoY2xpY2spPVwidG9nZ2xlUmlnaHRNZW51LmVtaXQoKVwiPlxuICAgICYjOTc3NjtcbiAgPC9zcGFuPlxuXG48L21hdC10b29sYmFyPlxuYCxcbiAgc3R5bGVzOiBbYC5pdGVtcy1zcGFjZXJ7ZmxleDoxIDEgYXV0b30uaXRlbXMtaWNvbntjdXJzb3I6cG9pbnRlcjstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjIsLjgpO3RyYW5zZm9ybTpzY2FsZSgxLjIsLjgpfS5pdGVtcy1pY29uLml0ZW0tcmlnaHR7cGFkZGluZy1sZWZ0OjE0cHh9Lml0ZW1zLWljb24uaXRlbS1sZWZ0e3BhZGRpbmctcmlnaHQ6MTRweH0uZGVjLXNpZGVuYXYtdG9vbGJhci1jdXN0b20tY29udGVudHtwYWRkaW5nOjAgMTZweDt3aWR0aDoxMDAlfS5yaWJib257dHJhbnNpdGlvbjphbGwgLjNzIGVhc2U7dGV4dC10cmFuc2Zvcm06bG93ZXJjYXNlO3RleHQtYWxpZ246Y2VudGVyO3Bvc2l0aW9uOnJlbGF0aXZlO2xpbmUtaGVpZ2h0OjY0cHg7bWFyZ2luLWxlZnQ6NHB4O3BhZGRpbmc6MCAyMHB4O2hlaWdodDo2NHB4O3dpZHRoOjE1NXB4O2NvbG9yOiNmZmY7bGVmdDoyMHB4O3RvcDowfS5yaWJib24ucmliYm9uLWhpZGRlbntkaXNwbGF5Om5vbmV9LnJpYmJvbjo6YmVmb3Jle2NvbnRlbnQ6Jyc7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwdnc7aGVpZ2h0OjRweDt6LWluZGV4OjI7dG9wOjY0cHg7bGVmdDowfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTk5cHgpey5yaWJib246OmJlZm9yZXt0b3A6NTZweH19YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjU2lkZW5hdlRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xuXG4gIGluaXRpYWxpemVkO1xuXG4gIG5vdFByb2R1Y3Rpb24gPSB0cnVlO1xuICByaWJib24gPSAnJztcbiAgbGFiZWwgPSAnJztcblxuICBASW5wdXQoKSBjb2xvcjtcblxuICBASW5wdXQoKSBlbnZpcm9ubWVudDtcblxuICBASW5wdXQoKSBsZWZ0TWVudVRyaWdnZXJWaXNpYmxlID0gdHJ1ZTtcblxuICBASW5wdXQoKSByaWdodE1lbnVUcmlnZ2VyVmlzaWJsZSA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHRvZ2dsZUxlZnRNZW51OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSB0b2dnbGVSaWdodE1lbnU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQENvbnRlbnRDaGlsZChEZWNTaWRlbmF2VG9vbGJhclRpdGxlQ29tcG9uZW50KSBjdXN0b21UaXRsZTogRGVjU2lkZW5hdlRvb2xiYXJUaXRsZUNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdsb2NhbCcpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1ncmVlbic7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLmxvY2FsJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1ibHVlJztcbiAgICAgIHRoaXMubGFiZWwgPSAnbGFiZWwuZGV2ZWxvcG1lbnQnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5lbnZpcm9ubWVudCA9PT0gJ3FhJykge1xuICAgICAgdGhpcy5yaWJib24gPSAncmliYm9uLXJlZCc7XG4gICAgICB0aGlzLmxhYmVsID0gJ2xhYmVsLnFhJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZW52aXJvbm1lbnQgPT09ICdhY3RpdmUnKSB7XG4gICAgICB0aGlzLnJpYmJvbiA9ICdyaWJib24tZ3JlZW4nO1xuICAgICAgdGhpcy5sYWJlbCA9ICdsYWJlbC5hY3RpdmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vdFByb2R1Y3Rpb24gPSBmYWxzZTtcbiAgICAgIHRoaXMucmliYm9uID0gJ3JpYmJvbi1oaWRkZW4nO1xuICAgIH1cbiAgfVxufVxuIl19