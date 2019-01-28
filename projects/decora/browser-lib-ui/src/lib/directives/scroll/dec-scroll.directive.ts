import { Directive, AfterViewInit, ViewContainerRef, Output, EventEmitter, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[decScroll]'
})
export class DecScrollDirective implements AfterViewInit {

  containerElement: HTMLElement;

  eventScrollHelper: any;

  @Input() decScrollOffset: number;

  @Output() decScrollFinished = new EventEmitter();

  constructor(private viewContainerRef: ViewContainerRef) {
    this.detectContainerElement();
  }

  private detectContainerElement() {
    this.containerElement = this.viewContainerRef.element.nativeElement;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setScrollEvent();
    }, 0);
  }

  private setScrollEvent() {
    fromEvent(this.containerElement, 'scroll').pipe(
      debounceTime(400)
    ).subscribe((event) => {
      this.eventScrollHelper = event;
      if (this.isInView(event.target, this.eventScrollHelper.target.lastElementChild)) {
        this.decScrollFinished.emit();
      }
    });
  }

  private isInView(parent, element) {
    const contHeight = parent.clientHeight;
    const contTop = parent.scrollTop;
    const contBottom = contTop + contHeight;

    const elemTop = element.offsetTop - parent.offsetTop;
    const elemBottom = elemTop + element.clientHeight;

    const isTotal = (elemTop >= 0 && this.offsetScroll(elemBottom, element.clientHeight)  <= contBottom);
    return isTotal;
  }

  private offsetScroll(elemBottom, elementHeight) {
    if (this.decScrollOffset) {
      return (elemBottom - this.decScrollOffset);
    }
    return (elemBottom - elementHeight);
  }
}
