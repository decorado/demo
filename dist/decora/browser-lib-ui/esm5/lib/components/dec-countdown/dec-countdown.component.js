/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';
var DecCountdownComponent = /** @class */ (function () {
    function DecCountdownComponent() {
        this.finished = new EventEmitter();
    }
    /**
     * @return {?}
     */
    DecCountdownComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.countdown = this.getTime();
        timer(1000, 1000).subscribe(function (val) {
            _this.manipulateInterval();
            _this.countdown = _this.getTime();
            if (_this.interval === 0) {
                _this.countdownCompleted();
            }
        });
    };
    /**
     * @return {?}
     */
    DecCountdownComponent.prototype.getTime = /**
     * @return {?}
     */
    function () {
        if (this.interval < 0) {
            this.interval = Math.abs(this.interval);
            this.completed = true;
        }
        /** @type {?} */
        var hours = Math.floor(this.interval / 3600);
        /** @type {?} */
        var minutes = Math.floor((this.interval - (hours * 3600)) / 60);
        /** @type {?} */
        var seconds = (this.interval - (hours * 3600) - (minutes * 60));
        return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
    };
    /**
     * @return {?}
     */
    DecCountdownComponent.prototype.manipulateInterval = /**
     * @return {?}
     */
    function () {
        if (this.completed) {
            this.interval++;
        }
        else {
            this.interval--;
        }
    };
    /**
     * @return {?}
     */
    DecCountdownComponent.prototype.countdownCompleted = /**
     * @return {?}
     */
    function () {
        this.completed = true;
        this.finished.emit();
    };
    DecCountdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-countdown',
                    template: "{{ countdown }}"
                },] },
    ];
    /** @nocollapse */
    DecCountdownComponent.ctorParameters = function () { return []; };
    DecCountdownComponent.propDecorators = {
        interval: [{ type: Input }],
        finished: [{ type: Output }]
    };
    return DecCountdownComponent;
}());
export { DecCountdownComponent };
if (false) {
    /** @type {?} */
    DecCountdownComponent.prototype.interval;
    /** @type {?} */
    DecCountdownComponent.prototype.finished;
    /** @type {?} */
    DecCountdownComponent.prototype.completed;
    /** @type {?} */
    DecCountdownComponent.prototype.countdown;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvdW50ZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvdW50ZG93bi9kZWMtY291bnRkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDOztJQWdCM0I7d0JBTnFCLElBQUksWUFBWSxFQUFFO0tBTXRCOzs7O0lBRWpCLHdDQUFROzs7SUFBUjtRQUFBLGlCQVNDO1FBUkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQzdCLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDM0I7U0FDRixDQUFDLENBQUM7S0FDSjs7OztJQUVPLHVDQUFPOzs7O1FBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDdkI7O1FBQ0QsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDOztRQUMvQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDOztRQUNsRSxJQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLFNBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLFNBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFHLENBQUM7Ozs7O0lBR3RILGtEQUFrQjs7OztRQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjs7Ozs7SUFHSCxrREFBa0I7OztJQUFsQjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdEI7O2dCQWpERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzVCOzs7OzsyQkFHRSxLQUFLOzJCQUVMLE1BQU07O2dDQVhUOztTQU9hLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRpbWVyIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1jb3VudGRvd24nLFxuICB0ZW1wbGF0ZTogYHt7IGNvdW50ZG93biB9fWBcbn0pXG5leHBvcnQgY2xhc3MgRGVjQ291bnRkb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBpbnRlcnZhbDogbnVtYmVyO1xuXG4gIEBPdXRwdXQoKSBmaW5pc2hlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIGNvbXBsZXRlZDogYm9vbGVhbjtcblxuICBwdWJsaWMgY291bnRkb3duOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvdW50ZG93biA9IHRoaXMuZ2V0VGltZSgpO1xuICAgIHRpbWVyKDEwMDAsIDEwMDApLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgdGhpcy5tYW5pcHVsYXRlSW50ZXJ2YWwoKTtcbiAgICAgIHRoaXMuY291bnRkb3duID0gdGhpcy5nZXRUaW1lKCk7XG4gICAgICBpZiAodGhpcy5pbnRlcnZhbCA9PT0gMCkge1xuICAgICAgICB0aGlzLmNvdW50ZG93bkNvbXBsZXRlZCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaW1lKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaW50ZXJ2YWwgPCAwKSB7XG4gICAgICB0aGlzLmludGVydmFsID0gTWF0aC5hYnModGhpcy5pbnRlcnZhbCk7XG4gICAgICB0aGlzLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0aGlzLmludGVydmFsIC8gMzYwMCk7XG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHRoaXMuaW50ZXJ2YWwgLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9ICh0aGlzLmludGVydmFsIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKSk7XG4gICAgcmV0dXJuIGAke2hvdXJzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX06JHttaW51dGVzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX06JHtzZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gO1xuICB9XG5cbiAgcHJpdmF0ZSBtYW5pcHVsYXRlSW50ZXJ2YWwoKSB7XG4gICAgaWYgKHRoaXMuY29tcGxldGVkKSB7XG4gICAgICB0aGlzLmludGVydmFsKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW50ZXJ2YWwtLTtcbiAgICB9XG4gIH1cblxuICBjb3VudGRvd25Db21wbGV0ZWQoKSB7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIHRoaXMuZmluaXNoZWQuZW1pdCgpO1xuICB9XG5cbn1cbiJdfQ==