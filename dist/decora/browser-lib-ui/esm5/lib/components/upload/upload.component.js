/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
var UPLOAD_ENDPOINT = '/upload';
/** @type {?} */
var noop = function () {
};
var ɵ0 = noop;
/** @type {?} */
export var DEC_UPLOAD_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecUploadComponent; }),
    multi: true
};
var DecUploadComponent = /** @class */ (function () {
    function DecUploadComponent(service) {
        this.service = service;
        this.progresses = [];
        this.error = new EventEmitter();
        this.uploaded = new EventEmitter();
        this.progress = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(DecUploadComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        /*
        ** ngModel VALUE
        */
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fn
     * @return {?}
     */
    DecUploadComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DecUploadComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecUploadComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DecUploadComponent.prototype.writeValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.value = v;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecUploadComponent.prototype.filesChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        for (var x = 0; x < event.target.files.length; x++) {
            this.uploadFile(event.target.files[x], x);
        }
    };
    /**
     * @return {?}
     */
    DecUploadComponent.prototype.openFileSelection = /**
     * @return {?}
     */
    function () {
        this.inputFile.nativeElement.click();
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    DecUploadComponent.prototype.getProgressbarMode = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        /** @type {?} */
        var mode;
        switch (progress.value) {
            case 0:
                mode = 'buffer';
                break;
            case 100:
                mode = 'indeterminate';
                break;
            default:
                mode = 'determinate';
                break;
        }
        return mode;
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    DecUploadComponent.prototype.getProgressValueBasedOnMode = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        /** @type {?} */
        var mode = this.getProgressbarMode(progress);
        /** @type {?} */
        var value = mode === 'buffer' ? 0 : progress.value;
        return value;
    };
    /**
     * @param {?} file
     * @param {?} index
     * @return {?}
     */
    DecUploadComponent.prototype.uploadFile = /**
     * @param {?} file
     * @param {?} index
     * @return {?}
     */
    function (file, index) {
        var _this = this;
        if (file) {
            /** @type {?} */
            var progress_1 = {
                fileIndex: index,
                fileName: file.name,
                value: 0,
            };
            this.progresses.push(progress_1);
            this.service.upload(this.endpoint, [file])
                .pipe(catchError(function (error) {
                console.log('catchError', error);
                progress_1.error = error.message;
                _this.error.emit('message.error.unexpected');
                _this.detectUploadEnd();
                return throwError(error.message);
            }))
                .subscribe(function (event) {
                if (event.type === HttpEventType.UploadProgress) {
                    /** @type {?} */
                    var percentDone = Math.round((100 * event.loaded) / event.total);
                    progress_1.value = percentDone === 100 ? percentDone : parseFloat(percentDone.toFixed(2));
                }
                else if (event instanceof HttpResponse) {
                    progress_1.value = 100;
                    progress_1.file = event.body;
                    _this.detectUploadEnd();
                }
                _this.progress.emit(_this.progresses);
            });
        }
    };
    /**
     * @return {?}
     */
    DecUploadComponent.prototype.detectUploadEnd = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var stillUploading = this.progresses.filter(function (progress) {
            return progress.value < 100;
        });
        if (!stillUploading.length) {
            this.emitUploadedFiles();
            this.clearInputFile();
            this.clearProgresses();
        }
    };
    /**
     * @return {?}
     */
    DecUploadComponent.prototype.clearInputFile = /**
     * @return {?}
     */
    function () {
        this.inputFile.nativeElement.value = '';
    };
    /**
     * @return {?}
     */
    DecUploadComponent.prototype.clearProgresses = /**
     * @return {?}
     */
    function () {
        this.progresses = [];
    };
    /**
     * @return {?}
     */
    DecUploadComponent.prototype.emitUploadedFiles = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var files = this.progresses.map(function (uploadProgress) {
            return uploadProgress.file;
        });
        this.value = tslib_1.__spread(files);
        this.uploaded.emit(this.value);
    };
    DecUploadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-upload',
                    template: "<ng-container [ngSwitch]=\"(progresses && progresses.length) ? true : false\">\n  <ng-container *ngSwitchCase=\"false\">\n    <span (click)=\"openFileSelection()\" class=\"click\">\n      <ng-content></ng-content>\n    </span>\n  </ng-container>\n  <ng-container *ngSwitchCase=\"true\">\n    <div *ngFor=\"let uploadProgress of progresses\" class=\"dec-upload-progress-wrapper\">\n      <mat-progress-bar\n        color=\"primary\"\n        [mode]=\"getProgressbarMode(uploadProgress)\"\n        [value]=\"getProgressValueBasedOnMode(uploadProgress)\">\n      </mat-progress-bar>\n      <div class=\"text-center\">\n        <small>\n          {{ uploadProgress.value }}% - {{ uploadProgress.fileName }}\n        </small>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n\n\n<input type=\"file\" #inputFile (change)=\"filesChanged($event)\" [multiple]=\"multiple\" [disabled]=\"disabled\">\n\n",
                    styles: [".click{cursor:pointer}input{display:none}.text-center{text-align:center}.dec-upload-progress-wrapper{padding:8px 0}"],
                    providers: [DEC_UPLOAD_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecUploadComponent.ctorParameters = function () { return [
        { type: DecApiService }
    ]; };
    DecUploadComponent.propDecorators = {
        disabled: [{ type: Input }],
        endpoint: [{ type: Input }],
        multiple: [{ type: Input }],
        error: [{ type: Output }],
        uploaded: [{ type: Output }],
        progress: [{ type: Output }],
        inputFile: [{ type: ViewChild, args: ['inputFile',] }]
    };
    return DecUploadComponent;
}());
export { DecUploadComponent };
if (false) {
    /** @type {?} */
    DecUploadComponent.prototype.progresses;
    /** @type {?} */
    DecUploadComponent.prototype.disabled;
    /** @type {?} */
    DecUploadComponent.prototype.endpoint;
    /** @type {?} */
    DecUploadComponent.prototype.multiple;
    /** @type {?} */
    DecUploadComponent.prototype.error;
    /** @type {?} */
    DecUploadComponent.prototype.uploaded;
    /** @type {?} */
    DecUploadComponent.prototype.progress;
    /** @type {?} */
    DecUploadComponent.prototype.inputFile;
    /** @type {?} */
    DecUploadComponent.prototype.innerValue;
    /** @type {?} */
    DecUploadComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecUploadComponent.prototype.onChangeCallback;
    /** @type {?} */
    DecUploadComponent.prototype.service;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDOztBQUd6RSxJQUFNLGVBQWUsR0FBRyxTQUFTLENBQUM7O0FBR2xDLElBQU0sSUFBSSxHQUFHO0NBQ1osQ0FBQzs7O0FBRUYsV0FBYSxpQ0FBaUMsR0FBUTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDO0lBQ2pELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7SUErREEsNEJBQW9CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7MEJBNUJYLEVBQUU7cUJBUWYsSUFBSSxZQUFZLEVBQUU7d0JBRWYsSUFBSSxZQUFZLEVBQUU7d0JBRWxCLElBQUksWUFBWSxFQUFFO2lDQVlDLElBQUk7Z0NBRUMsSUFBSTtLQUVIO0lBSzlDLHNCQUFJLHFDQUFLOzs7O1FBTVQ7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVB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LEdBQUcsR0FBRyxDQUFDO1NBQzdCLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4Qjs7Ozs7SUFHSywyQ0FBYzs7OztRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDOzs7OztJQUdsQyw0Q0FBZTs7OztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7Ozs7SUFHZiw4Q0FBaUI7Ozs7O1FBQ3ZCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUMsY0FBOEI7WUFDL0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7U0FDNUIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssb0JBQU8sS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Z0JBM0xsQyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRSw0NEJBeUJYO29CQUNDLE1BQU0sRUFBRSxDQUFDLHFIQUFxSCxDQUFDO29CQUMvSCxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztpQkFDL0M7Ozs7Z0JBakRRLGFBQWE7OzsyQkFzRG5CLEtBQUs7MkJBRUwsS0FBSzsyQkFFTCxLQUFLO3dCQUVMLE1BQU07MkJBRU4sTUFBTTsyQkFFTixNQUFNOzRCQUVOLFNBQVMsU0FBQyxXQUFXOzs2QkFuRXhCOztTQW1EYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFdmVudFR5cGUsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBVcGxvYWRQcm9ncmVzcyB9IGZyb20gJy4vdXBsb2FkLm1vZGVscyc7XG5cbmNvbnN0IFVQTE9BRF9FTkRQT0lOVCA9ICcvdXBsb2FkJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG5leHBvcnQgY29uc3QgREVDX1VQTE9BRF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNVcGxvYWRDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXVwbG9hZCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiKHByb2dyZXNzZXMgJiYgcHJvZ3Jlc3Nlcy5sZW5ndGgpID8gdHJ1ZSA6IGZhbHNlXCI+XG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgPHNwYW4gKGNsaWNrKT1cIm9wZW5GaWxlU2VsZWN0aW9uKClcIiBjbGFzcz1cImNsaWNrXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHVwbG9hZFByb2dyZXNzIG9mIHByb2dyZXNzZXNcIiBjbGFzcz1cImRlYy11cGxvYWQtcHJvZ3Jlc3Mtd3JhcHBlclwiPlxuICAgICAgPG1hdC1wcm9ncmVzcy1iYXJcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgW21vZGVdPVwiZ2V0UHJvZ3Jlc3NiYXJNb2RlKHVwbG9hZFByb2dyZXNzKVwiXG4gICAgICAgIFt2YWx1ZV09XCJnZXRQcm9ncmVzc1ZhbHVlQmFzZWRPbk1vZGUodXBsb2FkUHJvZ3Jlc3MpXCI+XG4gICAgICA8L21hdC1wcm9ncmVzcy1iYXI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgPHNtYWxsPlxuICAgICAgICAgIHt7IHVwbG9hZFByb2dyZXNzLnZhbHVlIH19JSAtIHt7IHVwbG9hZFByb2dyZXNzLmZpbGVOYW1lIH19XG4gICAgICAgIDwvc21hbGw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cblxuXG48aW5wdXQgdHlwZT1cImZpbGVcIiAjaW5wdXRGaWxlIChjaGFuZ2UpPVwiZmlsZXNDaGFuZ2VkKCRldmVudClcIiBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cblxuYCxcbiAgc3R5bGVzOiBbYC5jbGlja3tjdXJzb3I6cG9pbnRlcn1pbnB1dHtkaXNwbGF5Om5vbmV9LnRleHQtY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS5kZWMtdXBsb2FkLXByb2dyZXNzLXdyYXBwZXJ7cGFkZGluZzo4cHggMH1gXSxcbiAgcHJvdmlkZXJzOiBbREVDX1VQTE9BRF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgcHJvZ3Jlc3NlczogVXBsb2FkUHJvZ3Jlc3NbXSA9IFtdO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGVuZHBvaW50OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSB1cGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgcHJvZ3Jlc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXRGaWxlJykgaW5wdXRGaWxlOiBFbGVtZW50UmVmO1xuXG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnlbXTtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBEZWNBcGlTZXJ2aWNlKSB7fVxuXG4gIC8qXG4gICoqIG5nTW9kZWwgVkFMVUVcbiAgKi9cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHY6IGFueVtdKSB7XG4gICAgdGhpcy52YWx1ZSA9IHY7XG4gIH1cblxuXG4gIGZpbGVzQ2hhbmdlZChldmVudCkge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZXZlbnQudGFyZ2V0LmZpbGVzLmxlbmd0aDsgeCsrKSB7XG4gICAgICB0aGlzLnVwbG9hZEZpbGUoZXZlbnQudGFyZ2V0LmZpbGVzW3hdLCB4KTtcbiAgICB9XG4gIH1cblxuICBvcGVuRmlsZVNlbGVjdGlvbigpIHtcbiAgICB0aGlzLmlucHV0RmlsZS5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxuICBnZXRQcm9ncmVzc2Jhck1vZGUocHJvZ3Jlc3MpIHtcblxuICAgIGxldCBtb2RlO1xuXG4gICAgc3dpdGNoIChwcm9ncmVzcy52YWx1ZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBtb2RlID0gJ2J1ZmZlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMDA6XG4gICAgICAgIG1vZGUgPSAnaW5kZXRlcm1pbmF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBtb2RlO1xuXG4gIH1cblxuICBnZXRQcm9ncmVzc1ZhbHVlQmFzZWRPbk1vZGUocHJvZ3Jlc3MpIHtcbiAgICBjb25zdCBtb2RlID0gdGhpcy5nZXRQcm9ncmVzc2Jhck1vZGUocHJvZ3Jlc3MpO1xuICAgIGNvbnN0IHZhbHVlID0gbW9kZSA9PT0gJ2J1ZmZlcicgPyAwIDogcHJvZ3Jlc3MudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGxvYWRGaWxlKGZpbGUsIGluZGV4KSB7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIGNvbnN0IHByb2dyZXNzOiBVcGxvYWRQcm9ncmVzcyA9IHtcbiAgICAgICAgZmlsZUluZGV4OiBpbmRleCxcbiAgICAgICAgZmlsZU5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgdmFsdWU6IDAsXG4gICAgICB9O1xuICAgICAgdGhpcy5wcm9ncmVzc2VzLnB1c2gocHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5zZXJ2aWNlLnVwbG9hZCh0aGlzLmVuZHBvaW50LCBbZmlsZV0pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcihlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjYXRjaEVycm9yJywgZXJyb3IpO1xuICAgICAgICAgIHByb2dyZXNzLmVycm9yID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoJ21lc3NhZ2UuZXJyb3IudW5leHBlY3RlZCcpO1xuICAgICAgICAgIHRoaXMuZGV0ZWN0VXBsb2FkRW5kKCk7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgICBjb25zdCBwZXJjZW50RG9uZSA9IE1hdGgucm91bmQoKDEwMCAqIGV2ZW50LmxvYWRlZCkgLyBldmVudC50b3RhbCk7XG4gICAgICAgICAgcHJvZ3Jlc3MudmFsdWUgPSBwZXJjZW50RG9uZSA9PT0gMTAwID8gcGVyY2VudERvbmUgOiBwYXJzZUZsb2F0KHBlcmNlbnREb25lLnRvRml4ZWQoMikpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgcHJvZ3Jlc3MudmFsdWUgPSAxMDA7XG4gICAgICAgICAgcHJvZ3Jlc3MuZmlsZSA9IGV2ZW50LmJvZHk7XG4gICAgICAgICAgdGhpcy5kZXRlY3RVcGxvYWRFbmQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb2dyZXNzLmVtaXQodGhpcy5wcm9ncmVzc2VzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0ZWN0VXBsb2FkRW5kKCkge1xuXG4gICAgY29uc3Qgc3RpbGxVcGxvYWRpbmcgPSB0aGlzLnByb2dyZXNzZXMuZmlsdGVyKChwcm9ncmVzcykgPT4ge1xuICAgICAgcmV0dXJuIHByb2dyZXNzLnZhbHVlIDwgMTAwO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzdGlsbFVwbG9hZGluZy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZW1pdFVwbG9hZGVkRmlsZXMoKTtcbiAgICAgIHRoaXMuY2xlYXJJbnB1dEZpbGUoKTtcbiAgICAgIHRoaXMuY2xlYXJQcm9ncmVzc2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcklucHV0RmlsZSgpIHtcbiAgICB0aGlzLmlucHV0RmlsZS5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyUHJvZ3Jlc3NlcygpIHtcbiAgICB0aGlzLnByb2dyZXNzZXMgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdFVwbG9hZGVkRmlsZXMoKSB7XG4gICAgY29uc3QgZmlsZXMgPSB0aGlzLnByb2dyZXNzZXMubWFwKCh1cGxvYWRQcm9ncmVzczogVXBsb2FkUHJvZ3Jlc3MpID0+IHtcbiAgICAgIHJldHVybiB1cGxvYWRQcm9ncmVzcy5maWxlO1xuICAgIH0pO1xuICAgIHRoaXMudmFsdWUgPSBbLi4uZmlsZXNdO1xuICAgIHRoaXMudXBsb2FkZWQuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG59XG4iXX0=