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

  dinamicHeight;

  @Input() font: 'dec' | 'mat' | 'fas';

  @ViewChild('text') textElement: ElementRef;

  private elementChanges = new BehaviorSubject<number>(0);

  private changesSubscription: Subscription;

  constructor(
    private elementRef: ElementRef
  ) {
    this.subscribeToChanges();
    this.watchNodeInsertion();
  }

  ngOnChanges() {
    this.elementChanges.next(Date.now());
  }

  ngOnDestroy() {
    this.changesSubscription.unsubscribe();
  }

  // for use within components that remove elements from document like mat-tab
  private watchNodeInsertion() {
    this.elementRef.nativeElement.addEventListener('DOMNodeInsertedIntoDocument', (e) => {
      this.detectChanges();
    });
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
      setTimeout(() => {
        this.icon = element.textContent;
      }, 0);
    } catch (error) { }
  }

  private extractIconHeight() {

    const element = this.elementRef.nativeElement;

    const elementStyles = getComputedStyle(element);

    const fontSize = elementStyles.fontSize;

    const measureType = fontSize.replace(/^\d+\.\d+|\d+/g, '');

    const heightString = fontSize.replace(measureType, '');

    const height = heightString ? parseInt(heightString, 10) : 0;

    const calculedHeigth = height ? height * 0.72 : '';

    this.dinamicHeight = `${calculedHeigth}${measureType}`;

  }

}
