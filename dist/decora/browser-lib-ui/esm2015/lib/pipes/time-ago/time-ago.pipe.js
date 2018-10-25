/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, NgZone, Pipe } from '@angular/core';
import * as moment from 'moment';
/** @type {?} */
const momentConstructor = (/** @type {?} */ (moment)).default || moment;
export class TimeAgoPipe {
    /**
     * @param {?} cdRef
     * @param {?} ngZone
     */
    constructor(cdRef, ngZone) {
        this.cdRef = cdRef;
        this.ngZone = ngZone;
    }
    /**
     * @param {?} value
     * @param {?=} omitSuffix
     * @return {?}
     */
    transform(value, omitSuffix) {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeTimer();
    }
    /**
     * @return {?}
     */
    createTimer() {
        if (this.currentTimer) {
            return;
        }
        /** @type {?} */
        const momentInstance = momentConstructor(this.lastValue);
        /** @type {?} */
        const timeToUpdate = this.getSecondsUntilUpdate(momentInstance) * 1000;
        this.currentTimer = this.ngZone.runOutsideAngular(() => {
            if (typeof window !== 'undefined') {
                return window.setTimeout(() => {
                    this.lastText = momentConstructor(this.lastValue).from(momentConstructor(), this.lastOmitSuffix);
                    this.currentTimer = null;
                    this.ngZone.run(() => this.cdRef.markForCheck());
                }, timeToUpdate);
            }
        });
    }
    /**
     * @return {?}
     */
    removeTimer() {
        if (this.currentTimer) {
            window.clearTimeout(this.currentTimer);
            this.currentTimer = null;
        }
    }
    /**
     * @param {?} momentInstance
     * @return {?}
     */
    getSecondsUntilUpdate(momentInstance) {
        /** @type {?} */
        const howOld = Math.abs(momentConstructor().diff(momentInstance, 'minute'));
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
    }
    /**
     * @param {?} value
     * @param {?=} omitSuffix
     * @return {?}
     */
    hasChanged(value, omitSuffix) {
        return this.getTime(value) !== this.lastTime || omitSuffix !== this.lastOmitSuffix;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getTime(value) {
        if (moment.isDate(value)) {
            return value.getTime();
        }
        else if (moment.isMoment(value)) {
            return value.valueOf();
        }
        else {
            return momentConstructor(value).valueOf();
        }
    }
}
TimeAgoPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeAgo'
            },] },
];
/** @nocollapse */
TimeAgoPipe.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1hZ28ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvcGlwZXMvdGltZS1hZ28vdGltZS1hZ28ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBYSxJQUFJLEVBQWtCLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxNQUFNLGlCQUFpQixHQUFtQyxtQkFBTSxNQUFNLEVBQUMsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO0FBSzFGLE1BQU07Ozs7O0lBU0osWUFBb0IsS0FBd0IsRUFBVSxNQUFjO1FBQWhELFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtLQUNuRTs7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQW9CLEVBQUUsVUFBb0I7UUFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztZQUNqQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FFaEY7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtRQUVELE1BQU0s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QyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQzs7OztZQXZGSixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7YUFDaEI7Ozs7WUFOUSxpQkFBaUI7WUFBRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIE5nWm9uZSwgT25EZXN0cm95LCBQaXBlLCBQaXBlVHJhbnNmb3JtICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnRDb25zdHJ1Y3RvcjogKHZhbHVlPzogYW55KSA9PiBtb21lbnQuTW9tZW50ID0gKDxhbnk+bW9tZW50KS5kZWZhdWx0IHx8IG1vbWVudDtcblxuQFBpcGUoe1xuICBuYW1lOiAndGltZUFnbydcbn0pXG5leHBvcnQgY2xhc3MgVGltZUFnb1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwcml2YXRlIGN1cnJlbnRUaW1lcjogbnVtYmVyO1xuXG4gIHByaXZhdGUgbGFzdFRpbWU6IE51bWJlcjtcbiAgcHJpdmF0ZSBsYXN0VmFsdWU6IERhdGUgfCBOdW1iZXI7XG4gIHByaXZhdGUgbGFzdE9taXRTdWZmaXg6IGJvb2xlYW47XG4gIHByaXZhdGUgbGFzdFRleHQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xuICB9XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBEYXRlIHwgbnVtYmVyLCBvbWl0U3VmZml4PzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaGFzQ2hhbmdlZCh2YWx1ZSwgb21pdFN1ZmZpeCkpIHtcbiAgICAgIHRoaXMubGFzdFRpbWUgPSB0aGlzLmdldFRpbWUodmFsdWUpO1xuICAgICAgdGhpcy5sYXN0VmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMubGFzdE9taXRTdWZmaXggPSBvbWl0U3VmZml4O1xuICAgICAgdGhpcy5yZW1vdmVUaW1lcigpO1xuICAgICAgdGhpcy5jcmVhdGVUaW1lcigpO1xuICAgICAgdGhpcy5sYXN0VGV4dCA9IG1vbWVudENvbnN0cnVjdG9yKHZhbHVlKS5mcm9tKG1vbWVudENvbnN0cnVjdG9yKCksIG9taXRTdWZmaXgpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3JlYXRlVGltZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5sYXN0VGV4dDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlVGltZXIoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBjcmVhdGVUaW1lcigpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50VGltZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbW9tZW50SW5zdGFuY2UgPSBtb21lbnRDb25zdHJ1Y3Rvcih0aGlzLmxhc3RWYWx1ZSk7XG5cbiAgICBjb25zdCB0aW1lVG9VcGRhdGUgPSB0aGlzLmdldFNlY29uZHNVbnRpbFVwZGF0ZShtb21lbnRJbnN0YW5jZSkgKiAxMDAwO1xuICAgIHRoaXMuY3VycmVudFRpbWVyID0gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sYXN0VGV4dCA9IG1vbWVudENvbnN0cnVjdG9yKHRoaXMubGFzdFZhbHVlKS5mcm9tKG1vbWVudENvbnN0cnVjdG9yKCksIHRoaXMubGFzdE9taXRTdWZmaXgpO1xuXG4gICAgICAgICAgdGhpcy5jdXJyZW50VGltZXIgPSBudWxsO1xuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICAgICAgfSwgdGltZVRvVXBkYXRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSByZW1vdmVUaW1lcigpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50VGltZXIpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5jdXJyZW50VGltZXIpO1xuICAgICAgdGhpcy5jdXJyZW50VGltZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2Vjb25kc1VudGlsVXBkYXRlKG1vbWVudEluc3RhbmNlOiBtb21lbnQuTW9tZW50KSB7XG4gICAgY29uc3QgaG93T2xkID0gTWF0aC5hYnMobW9tZW50Q29uc3RydWN0b3IoKS5kaWZmKG1vbWVudEluc3RhbmNlLCAnbWludXRlJykpO1xuICAgIGlmIChob3dPbGQgPCAxKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGhvd09sZCA8IDYwKSB7XG4gICAgICByZXR1cm4gMzA7XG4gICAgfSBlbHNlIGlmIChob3dPbGQgPCAxODApIHtcbiAgICAgIHJldHVybiAzMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAzNjAwO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFzQ2hhbmdlZCh2YWx1ZTogRGF0ZSB8IG51bWJlciwgb21pdFN1ZmZpeD86IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaW1lKHZhbHVlKSAhPT0gdGhpcy5sYXN0VGltZSB8fCBvbWl0U3VmZml4ICE9PSB0aGlzLmxhc3RPbWl0U3VmZml4O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaW1lKHZhbHVlOiBEYXRlIHwgbnVtYmVyKSB7XG4gICAgaWYgKG1vbWVudC5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUuZ2V0VGltZSgpO1xuICAgIH0gZWxzZSBpZiAobW9tZW50LmlzTW9tZW50KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnZhbHVlT2YoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1vbWVudENvbnN0cnVjdG9yKHZhbHVlKS52YWx1ZU9mKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==