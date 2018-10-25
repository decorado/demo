/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';
export class DecCountdownComponent {
    constructor() {
        this.finished = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.countdown = this.getTime();
        timer(1000, 1000).subscribe(val => {
            this.manipulateInterval();
            this.countdown = this.getTime();
            if (this.interval === 0) {
                this.countdownCompleted();
            }
        });
    }
    /**
     * @return {?}
     */
    getTime() {
        if (this.interval < 0) {
            this.interval = Math.abs(this.interval);
            this.completed = true;
        }
        /** @type {?} */
        const hours = Math.floor(this.interval / 3600);
        /** @type {?} */
        const minutes = Math.floor((this.interval - (hours * 3600)) / 60);
        /** @type {?} */
        const seconds = (this.interval - (hours * 3600) - (minutes * 60));
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    /**
     * @return {?}
     */
    manipulateInterval() {
        if (this.completed) {
            this.interval++;
        }
        else {
            this.interval--;
        }
    }
    /**
     * @return {?}
     */
    countdownCompleted() {
        this.completed = true;
        this.finished.emit();
    }
}
DecCountdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-countdown',
                template: `{{ countdown }}`
            },] },
];
/** @nocollapse */
DecCountdownComponent.ctorParameters = () => [];
DecCountdownComponent.propDecorators = {
    interval: [{ type: Input }],
    finished: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvdW50ZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvdW50ZG93bi9kZWMtY291bnRkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBTTdCLE1BQU07SUFVSjt3QkFOcUIsSUFBSSxZQUFZLEVBQUU7S0FNdEI7Ozs7SUFFakIsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDM0I7U0FDRixDQUFDLENBQUM7S0FDSjs7OztJQUVPLE9BQU87UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2Qjs7UUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7O1FBQy9DLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7O1FBQ2xFLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7Ozs7O0lBR3RILGtCQUFrQjtRQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjs7Ozs7SUFHSCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN0Qjs7O1lBakRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLGlCQUFpQjthQUM1Qjs7Ozs7dUJBR0UsS0FBSzt1QkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGltZXIgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWNvdW50ZG93bicsXG4gIHRlbXBsYXRlOiBge3sgY291bnRkb3duIH19YFxufSlcbmV4cG9ydCBjbGFzcyBEZWNDb3VudGRvd25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGludGVydmFsOiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIGZpbmlzaGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgY29tcGxldGVkOiBib29sZWFuO1xuXG4gIHB1YmxpYyBjb3VudGRvd246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY291bnRkb3duID0gdGhpcy5nZXRUaW1lKCk7XG4gICAgdGltZXIoMTAwMCwgMTAwMCkuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICB0aGlzLm1hbmlwdWxhdGVJbnRlcnZhbCgpO1xuICAgICAgdGhpcy5jb3VudGRvd24gPSB0aGlzLmdldFRpbWUoKTtcbiAgICAgIGlmICh0aGlzLmludGVydmFsID09PSAwKSB7XG4gICAgICAgIHRoaXMuY291bnRkb3duQ29tcGxldGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFRpbWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pbnRlcnZhbCA8IDApIHtcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSBNYXRoLmFicyh0aGlzLmludGVydmFsKTtcbiAgICAgIHRoaXMuY29tcGxldGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHRoaXMuaW50ZXJ2YWwgLyAzNjAwKTtcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigodGhpcy5pbnRlcnZhbCAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gKHRoaXMuaW50ZXJ2YWwgLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApKTtcbiAgICByZXR1cm4gYCR7aG91cnMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfToke21pbnV0ZXMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfToke3NlY29uZHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfWA7XG4gIH1cblxuICBwcml2YXRlIG1hbmlwdWxhdGVJbnRlcnZhbCgpIHtcbiAgICBpZiAodGhpcy5jb21wbGV0ZWQpIHtcbiAgICAgIHRoaXMuaW50ZXJ2YWwrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnRlcnZhbC0tO1xuICAgIH1cbiAgfVxuXG4gIGNvdW50ZG93bkNvbXBsZXRlZCgpIHtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgdGhpcy5maW5pc2hlZC5lbWl0KCk7XG4gIH1cblxufVxuIl19