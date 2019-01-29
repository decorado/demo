import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'dec-countdown',
  template: `{{ countdown }}`
})
export class DecCountdownComponent implements OnInit {

  @Input() interval: number;

  @Input() fixed: 'h' | 'm' | 's' = 'h';

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

    switch (this.fixed) {
      case 'h':
        timeAsString = this.formatWithHour(hours, minutes, seconds);
        break;

      case 'm':
        if (hours > 0) {
          timeAsString = this.formatWithHour(hours, minutes, seconds);
        } else {
          timeAsString = this.formatWithMinutes(hours, minutes, seconds);
        }
        break;

      case 's':
        if (hours > 0) {
          timeAsString = this.formatWithHour(hours, minutes, seconds);
        } else if (minutes > 0) {
          timeAsString = this.formatWithMinutes(hours, minutes, seconds);
        } else {
          timeAsString = this.formatWithSeconds(hours, minutes, seconds);
        }
        break;
    }

    return timeAsString;
  }

  private formatWithHour(hours, minutes, seconds) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  private formatWithMinutes(hours, minutes, seconds) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  private formatWithSeconds(hours, minutes, seconds) {
    return `${seconds.toString().padStart(2, '0')}`;
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
