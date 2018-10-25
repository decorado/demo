import { ChangeDetectorRef, NgZone, PipeTransform } from '@angular/core';
export declare class TimeAgoPipe implements PipeTransform {
    private cdRef;
    private ngZone;
    private currentTimer;
    private lastTime;
    private lastValue;
    private lastOmitSuffix;
    private lastText;
    constructor(cdRef: ChangeDetectorRef, ngZone: NgZone);
    transform(value: Date | number, omitSuffix?: boolean): string;
    ngOnDestroy(): void;
    private createTimer();
    private removeTimer();
    private getSecondsUntilUpdate(momentInstance);
    private hasChanged(value, omitSuffix?);
    private getTime(value);
}
