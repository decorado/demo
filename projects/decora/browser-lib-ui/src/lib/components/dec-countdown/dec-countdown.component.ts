import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'dec-countdown',
  template: `{{ countdown }}`
})
export class DecCountdownComponent implements OnInit {

  @Input() interval: number;

  @Input() ommitZeroes: boolean;

  @Output() finished = new EventEmitter();

  private completed: boolean;

  public countdown: string;

  constructor() { }

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

  private getTime(): string {
    if (this.interval < 0) {
      this.interval = Math.abs(this.interval);
      this.completed = true;
    }
    const hours = Math.floor(this.interval / 3600);
    const minutes = Math.floor((this.interval - (hours * 3600)) / 60);
    const seconds = (this.interval - (hours * 3600) - (minutes * 60));

    let timeAsString;

    if (!this.ommitZeroes) {

      timeAsString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    } else {

      timeAsString = `${seconds.toString().padStart(2, '0')}`;

      if (minutes > 0) {
        timeAsString = `${minutes.toString().padStart(2, '0')}:${ timeAsString }`;
      }

      if (hours > 0) {
        timeAsString = `${hours.toString().padStart(2, '0')}:${timeAsString}`;
      }

    }

    return timeAsString;
  }

  private manipulateInterval() {
    if (this.completed) {
      this.interval++;
    } else {
      this.interval--;
    }
  }

  countdownCompleted() {
    this.completed = true;
    this.finished.emit();
  }

}
