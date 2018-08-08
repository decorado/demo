/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DecScriptLoaderService } from './../../services/script-loader/dec-script-loader.service';
const /** @type {?} */ SKETCHFAB_SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js';
export class DecSketchfabViewComponent {
    /**
     * @param {?} decScriptLoaderService
     */
    constructor(decScriptLoaderService) {
        this.decScriptLoaderService = decScriptLoaderService;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    set sketchfabId(id) {
        if (id) {
            this._sketchfabId = id;
            this.startSketchfab(id);
        }
    }
    /**
     * @return {?}
     */
    get sketchfabId() {
        return this._sketchfabId;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} id
     * @return {?}
     */
    startSketchfab(id) {
        this.decScriptLoaderService.load(SKETCHFAB_SCRIPT_URL, 'Sketchfab')
            .then((Sketchfab) => {
            const /** @type {?} */ iframe = this.apiFrame.nativeElement;
            const /** @type {?} */ client = new Sketchfab('1.0.0', iframe);
            client.init(this.sketchfabId, {
                success: function onSuccess(api) {
                    api.start();
                    api.addEventListener('viewerready', () => { });
                }
            });
        });
    }
}
DecSketchfabViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-sketchfab-view',
                template: `<iframe src="" 
  #apiFrame 
  id="api-frame" 
  height="620"
  width="620" 
  allowfullscreen 
  mozallowfullscreen="true" 
  webkitallowfullscreen="true"></iframe>`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecSketchfabViewComponent.ctorParameters = () => [
    { type: DecScriptLoaderService }
];
DecSketchfabViewComponent.propDecorators = {
    sketchfabId: [{ type: Input }],
    apiFrame: [{ type: ViewChild, args: ['apiFrame',] }]
};
function DecSketchfabViewComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecSketchfabViewComponent.prototype._sketchfabId;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.apiFrame;
    /** @type {?} */
    DecSketchfabViewComponent.prototype.decScriptLoaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9za2V0Y2hmYWItdmlldy9kZWMtc2tldGNoZmFiLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBRWxHLHVCQUFNLG9CQUFvQixHQUFHLDREQUE0RCxDQUFDO0FBYzFGLE1BQU07Ozs7SUFrQkosWUFBb0Isc0JBQThDO1FBQTlDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7S0FBSzs7Ozs7SUFoQnZFLElBQ0ksV0FBVyxDQUFDLEVBQUU7UUFDaEIsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDekI7S0FDRjs7OztJQUVELElBQUksV0FBVztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzFCOzs7O0lBUUQsUUFBUTtLQUNQOzs7OztJQUVELGNBQWMsQ0FBQyxFQUFFO1FBQ2YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxXQUFXLENBQUM7YUFDaEUsSUFBSSxDQUFDLENBQUMsU0FBYyxFQUFFLEVBQUU7WUFDdkIsdUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQzNDLHVCQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUM1QixPQUFPLEVBQUUsbUJBQW1CLEdBQUc7b0JBQzdCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDWixHQUFHLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFHLEdBQUcsRUFBRSxJQUFHLENBQUMsQ0FBQztpQkFDaEQ7YUFDSixDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7S0FDSjs7O1lBL0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7eUNBTzZCO2dCQUN2QyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7OztZQWZRLHNCQUFzQjs7OzBCQWtCNUIsS0FBSzt1QkFjTCxTQUFTLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9zY3JpcHQtbG9hZGVyL2RlYy1zY3JpcHQtbG9hZGVyLnNlcnZpY2UnO1xuXG5jb25zdCBTS0VUQ0hGQUJfU0NSSVBUX1VSTCA9ICdodHRwczovL3N0YXRpYy5za2V0Y2hmYWIuY29tL2FwaS9za2V0Y2hmYWItdmlld2VyLTEuMC4wLmpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXNrZXRjaGZhYi12aWV3JyxcbiAgdGVtcGxhdGU6IGA8aWZyYW1lIHNyYz1cIlwiIFxuICAjYXBpRnJhbWUgXG4gIGlkPVwiYXBpLWZyYW1lXCIgXG4gIGhlaWdodD1cIjYyMFwiXG4gIHdpZHRoPVwiNjIwXCIgXG4gIGFsbG93ZnVsbHNjcmVlbiBcbiAgbW96YWxsb3dmdWxsc2NyZWVuPVwidHJ1ZVwiIFxuICB3ZWJraXRhbGxvd2Z1bGxzY3JlZW49XCJ0cnVlXCI+PC9pZnJhbWU+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1NrZXRjaGZhYlZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIFxuICBzZXQgc2tldGNoZmFiSWQoaWQpIHtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuX3NrZXRjaGZhYklkID0gaWQ7XG4gICAgICB0aGlzLnN0YXJ0U2tldGNoZmFiKGlkKTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2tldGNoZmFiSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NrZXRjaGZhYklkO1xuICB9XG5cbiAgX3NrZXRjaGZhYklkOiBzdHJpbmc7XG5cbiAgQFZpZXdDaGlsZCgnYXBpRnJhbWUnKSBhcGlGcmFtZTogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY1NjcmlwdExvYWRlclNlcnZpY2U6IERlY1NjcmlwdExvYWRlclNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgc3RhcnRTa2V0Y2hmYWIoaWQpIHtcbiAgICB0aGlzLmRlY1NjcmlwdExvYWRlclNlcnZpY2UubG9hZChTS0VUQ0hGQUJfU0NSSVBUX1VSTCwgJ1NrZXRjaGZhYicpXG4gICAgICAudGhlbigoU2tldGNoZmFiOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgaWZyYW1lID0gdGhpcy5hcGlGcmFtZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBjbGllbnQgPSBuZXcgU2tldGNoZmFiKCcxLjAuMCcsIGlmcmFtZSk7XG4gICAgICAgIGNsaWVudC5pbml0KHRoaXMuc2tldGNoZmFiSWQsIHtcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBvblN1Y2Nlc3MoYXBpKSB7XG4gICAgICAgICAgICBhcGkuc3RhcnQoKTtcbiAgICAgICAgICAgIGFwaS5hZGRFdmVudExpc3RlbmVyKCd2aWV3ZXJyZWFkeScsICAoKSA9PiB7fSk7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==