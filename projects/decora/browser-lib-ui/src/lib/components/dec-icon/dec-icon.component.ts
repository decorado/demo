import { Component, Input, ViewChild, ElementRef, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'dec-icon',
  templateUrl: './dec-icon.component.html',
  styleUrls: ['./dec-icon.component.scss']
})
export class DecIconComponent implements OnChanges, AfterViewInit {

  icon: string;

  dinamicHeight = 'inherit';

  @Input() font: 'dec' | 'mat' | 'fas';

  @ViewChild('text') textElement: ElementRef;

  private elementChanges = new EventEmitter<number>();

  constructor(
    private elementRef: ElementRef
  ) {
    this.subscribeToChanges();
  }

  ngAfterViewInit() {
    this.elementChanges.emit(Date.now());
  }

  ngOnChanges() {
    this.elementChanges.emit(Date.now());
  }

  private detectChanges = () => {
    this.extractIconName();
    this.extractIconHeight();
  }

  private subscribeToChanges() {
    this.elementChanges.pipe(
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
