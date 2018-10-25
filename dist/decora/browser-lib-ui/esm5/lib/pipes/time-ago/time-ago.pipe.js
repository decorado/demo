/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, NgZone, Pipe } from '@angular/core';
import * as moment from 'moment';
/** @type {?} */
var momentConstructor = (/** @type {?} */ (moment)).default || moment;
var TimeAgoPipe = /** @class */ (function () {
    function TimeAgoPipe(cdRef, ngZone) {
        this.cdRef = cdRef;
        this.ngZone = ngZone;
    }
    /**
     * @param {?} value
     * @param {?=} omitSuffix
     * @return {?}
     */
    TimeAgoPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} omitSuffix
     * @return {?}
     */
    function (value, omitSuffix) {
        if (this.hasChanged(value, omitSuffix)) {
            this.lastTime = this.getTime(value);
            this.lastValue = value;
            this.lastOmitSuffix = omitSuffix;
            this.removeTimer();
            this.createTimer();
            this.lastText = momentConstructor(value).from(momentConstructor(), omitSuffix);
        }
        else {
            this.createTimer();
        }
        return this.lastText;
    };
    /**
     * @return {?}
     */
    TimeAgoPipe.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeTimer();
    };
    /**
     * @return {?}
     */
    TimeAgoPipe.prototype.createTimer = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.currentTimer) {
            return;
        }
        /** @type {?} */
        var momentInstance = momentConstructor(this.lastValue);
        /** @type {?} */
        var timeToUpdate = this.getSecondsUntilUpdate(momentInstance) * 1000;
        this.currentTimer = this.ngZone.runOutsideAngular(function () {
            if (typeof window !== 'undefined') {
                return window.setTimeout(function () {
                    _this.lastText = momentConstructor(_this.lastValue).from(momentConstructor(), _this.lastOmitSuffix);
                    _this.currentTimer = null;
                    _this.ngZone.run(function () { return _this.cdRef.markForCheck(); });
                }, timeToUpdate);
            }
        });
    };
    /**
     * @return {?}
     */
    TimeAgoPipe.prototype.removeTimer = /**
     * @return {?}
     */
    function () {
        if (this.currentTimer) {
            window.clearTimeout(this.currentTimer);
            this.currentTimer = null;
        }
    };
    /**
     * @param {?} momentInstance
     * @return {?}
     */
    TimeAgoPipe.prototype.getSecondsUntilUpdate = /**
     * @param {?} momentInstance
     * @return {?}
     */
    function (momentInstance) {
        /** @type {?} */
        var howOld = Math.abs(momentConstructor().diff(momentInstance, 'minute'));
        if (howOld < 1) {
            return 1;
        }
        else if (howOld < 60) {
            return 30;
        }
        else if (howOld < 180) {
            return 300;
        }
        else {
            return 3600;
        }
    };
    /**
     * @param {?} value
     * @param {?=} omitSuffix
     * @return {?}
     */
    TimeAgoPipe.prototype.hasChanged = /**
     * @param {?} value
     * @param {?=} omitSuffix
     * @return {?}
     */
    function (value, omitSuffix) {
        return this.getTime(value) !== this.lastTime || omitSuffix !== this.lastOmitSuffix;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimeAgoPipe.prototype.getTime = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (moment.isDate(value)) {
            return value.getTime();
        }
        else if (moment.isMoment(value)) {
            return value.valueOf();
        }
        else {
            return momentConstructor(value).valueOf();
        }
    };
    TimeAgoPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'timeAgo'
                },] },
    ];
    /** @nocollapse */
    TimeAgoPipe.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    return TimeAgoPipe;
}());
export { TimeAgoPipe };
if (false) {
    /** @type {?} */
    TimeAgoPipe.prototype.currentTimer;
    /** @type {?} */
    TimeAgoPipe.prototype.lastTime;
    /** @type {?} */
    TimeAgoPipe.prototype.lastValue;
    /** @type {?} */
    TimeAgoPipe.prototype.lastOmitSuffix;
    /** @type {?} */
    TimeAgoPipe.prototype.lastText;
    /** @type {?} */
    TimeAgoPipe.prototype.cdRef;
    /** @type {?} */
    TimeAgoPipe.prototype.ngZone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1hZ28ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvdGltZS1hZ28vdGltZS1hZ28ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBYSxJQUFJLEVBQWtCLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxJQUFNLGlCQUFpQixHQUFtQyxtQkFBTSxNQUFNLEVBQUMsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDOztJQWN4RixxQkFBb0IsS0FBd0IsRUFBVSxNQUFjO1FBQWhELFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtLQUNuRTs7Ozs7O0lBRUQsK0JBQVM7Ozs7O0lBQVQsVUFBVSxLQUFvQixFQUFFLFVBQW9CO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBRWhGO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7UUFFRCxNQUFNLENB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QUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNDOzs7Z0JBdkZKLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsU0FBUztpQkFDaEI7Ozs7Z0JBTlEsaUJBQWlCO2dCQUFFLE1BQU07O3NCQUFsQzs7U0FPYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIE5nWm9uZSwgT25EZXN0cm95LCBQaXBlLCBQaXBlVHJhbnNmb3JtICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnRDb25zdHJ1Y3RvcjogKHZhbHVlPzogYW55KSA9PiBtb21lbnQuTW9tZW50ID0gKDxhbnk+bW9tZW50KS5kZWZhdWx0IHx8IG1vbWVudDtcblxuQFBpcGUoe1xuICBuYW1lOiAndGltZUFnbydcbn0pXG5leHBvcnQgY2xhc3MgVGltZUFnb1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwcml2YXRlIGN1cnJlbnRUaW1lcjogbnVtYmVyO1xuXG4gIHByaXZhdGUgbGFzdFRpbWU6IE51bWJlcjtcbiAgcHJpdmF0ZSBsYXN0VmFsdWU6IERhdGUgfCBOdW1iZXI7XG4gIHByaXZhdGUgbGFzdE9taXRTdWZmaXg6IGJvb2xlYW47XG4gIHByaXZhdGUgbGFzdFRleHQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xuICB9XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBEYXRlIHwgbnVtYmVyLCBvbWl0U3VmZml4PzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaGFzQ2hhbmdlZCh2YWx1ZSwgb21pdFN1ZmZpeCkpIHtcbiAgICAgIHRoaXMubGFzdFRpbWUgPSB0aGlzLmdldFRpbWUodmFsdWUpO1xuICAgICAgdGhpcy5sYXN0VmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMubGFzdE9taXRTdWZmaXggPSBvbWl0U3VmZml4O1xuICAgICAgdGhpcy5yZW1vdmVUaW1lcigpO1xuICAgICAgdGhpcy5jcmVhdGVUaW1lcigpO1xuICAgICAgdGhpcy5sYXN0VGV4dCA9IG1vbWVudENvbnN0cnVjdG9yKHZhbHVlKS5mcm9tKG1vbWVudENvbnN0cnVjdG9yKCksIG9taXRTdWZmaXgpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3JlYXRlVGltZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5sYXN0VGV4dDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlVGltZXIoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBjcmVhdGVUaW1lcigpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50VGltZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbW9tZW50SW5zdGFuY2UgPSBtb21lbnRDb25zdHJ1Y3Rvcih0aGlzLmxhc3RWYWx1ZSk7XG5cbiAgICBjb25zdCB0aW1lVG9VcGRhdGUgPSB0aGlzLmdldFNlY29uZHNVbnRpbFVwZGF0ZShtb21lbnRJbnN0YW5jZSkgKiAxMDAwO1xuICAgIHRoaXMuY3VycmVudFRpbWVyID0gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sYXN0VGV4dCA9IG1vbWVudENvbnN0cnVjdG9yKHRoaXMubGFzdFZhbHVlKS5mcm9tKG1vbWVudENvbnN0cnVjdG9yKCksIHRoaXMubGFzdE9taXRTdWZmaXgpO1xuXG4gICAgICAgICAgdGhpcy5jdXJyZW50VGltZXIgPSBudWxsO1xuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICAgICAgfSwgdGltZVRvVXBkYXRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSByZW1vdmVUaW1lcigpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50VGltZXIpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5jdXJyZW50VGltZXIpO1xuICAgICAgdGhpcy5jdXJyZW50VGltZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2Vjb25kc1VudGlsVXBkYXRlKG1vbWVudEluc3RhbmNlOiBtb21lbnQuTW9tZW50KSB7XG4gICAgY29uc3QgaG93T2xkID0gTWF0aC5hYnMobW9tZW50Q29uc3RydWN0b3IoKS5kaWZmKG1vbWVudEluc3RhbmNlLCAnbWludXRlJykpO1xuICAgIGlmIChob3dPbGQgPCAxKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGhvd09sZCA8IDYwKSB7XG4gICAgICByZXR1cm4gMzA7XG4gICAgfSBlbHNlIGlmIChob3dPbGQgPCAxODApIHtcbiAgICAgIHJldHVybiAzMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAzNjAwO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFzQ2hhbmdlZCh2YWx1ZTogRGF0ZSB8IG51bWJlciwgb21pdFN1ZmZpeD86IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaW1lKHZhbHVlKSAhPT0gdGhpcy5sYXN0VGltZSB8fCBvbWl0U3VmZml4ICE9PSB0aGlzLmxhc3RPbWl0U3VmZml4O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaW1lKHZhbHVlOiBEYXRlIHwgbnVtYmVyKSB7XG4gICAgaWYgKG1vbWVudC5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUuZ2V0VGltZSgpO1xuICAgIH0gZWxzZSBpZiAobW9tZW50LmlzTW9tZW50KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnZhbHVlT2YoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1vbWVudENvbnN0cnVjdG9yKHZhbHVlKS52YWx1ZU9mKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==