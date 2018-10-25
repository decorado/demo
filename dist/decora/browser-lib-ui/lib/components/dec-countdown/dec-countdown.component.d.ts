import { OnInit, EventEmitter } from '@angular/core';
export declare class DecCountdownComponent implements OnInit {
    interval: number;
    finished: EventEmitter<{}>;
    private completed;
    countdown: string;
    constructor();
    ngOnInit(): void;
    private getTime();
    private manipulateInterval();
    countdownCompleted(): void;
}
