import { Component, Input, ViewChild, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'dec-icon',
  templateUrl: './dec-icon.component.html',
  styleUrls: ['./dec-icon.component.scss']
})
export class DecIconComponent implements OnChanges, OnDestroy {

  icon: string;

  dinamicHeight = 'inherit';

  @Input() font: 'dec' | 'mat' | 'fas';

  @ViewChild('text') textElement: ElementRef;

  private elementChanges = new BehaviorSubject<number>(0);

  private changesSubscription: Subscription;

  constructor(
    private elementRef: ElementRef
  ) {
    this.subscribeToChanges();
  }

  ngOnChanges() {
    this.elementChanges.next(Date.now());
  }

  ngOnDestroy() {
    this.changesSubscription.unsubscribe();
  }

  private detectChanges = () => {
    this.extractIconName();
    this.extractIconHeight();
  }

  private subscribeToChanges() {
    this.changesSubscription = this.elementChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
    ).subscribe(this.detectChanges);
  }

  private extractIconName() {
    try {
      const element = this.textElement.nativeElement;
      this.icon = element.textContent;
    } catch (error) { }
  }

  private extractIconHeight() {
    const element = this.elementRef.nativeElement;
    const elementStyles = getComputedStyle(element);
    this.dinamicHeight = elementStyles.fontSize;
  }

}
