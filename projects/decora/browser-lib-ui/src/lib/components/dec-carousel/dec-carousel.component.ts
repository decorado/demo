import { Component, ContentChildren, QueryList, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { DecCarouselItemComponent } from './dec-carousel-item/dec-carousel-item.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, fromEvent, timer } from 'rxjs';
import { takeUntil, switchMap, debounce, throttle } from 'rxjs/operators';

@Component({
  selector: 'dec-carousel',
  templateUrl: './dec-carousel.component.html',
  styleUrls: ['./dec-carousel.component.scss']
})
export class DecCarouselComponent implements AfterViewInit {

  @ViewChild('itemsCarousel') itemsCarousel: ElementRef;
  public itemsCarouselEl: HTMLDivElement;

  @Input()
  set selectedIndex(v: number) {
    if (v !== this._selectedIndex) {
      this._selectedIndex = v * 1;
      if (this.items) {
        this.mountAndEmitSelected();
      }
    }
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @Input()
  set itemsPerPage(v: number) {
    if (v !== this._itemsPerPage) {
      this._itemsPerPage = v * 1;
      if (this.items) {
        this.mountAndEmitSelected();
      }
    }
  }

  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  @Input() highlightSelected = true;

  @Input() vertical = false;

  @Input() gap = '8px';

  @Input()
  set enableDrag(v) {
    this._enableDrag = v;
  }

  get enableDrag() {
    return this._enableDrag;
  }

  @Input()
  set arrayToSort(v) {
    if (v !== this._arrayToSort) {
      this._arrayToSort = v;
    }
  }

  get arrayToSort() {
    return this._arrayToSort;
  }

  @ContentChildren(DecCarouselItemComponent)
  set items(v: QueryList<DecCarouselItemComponent>) {
    this._items = v;
    this.mountSelectedItem();
    this.detectInitialIndexBasedOnPageSizeAndItemsLength();
    this.detectVisibleItems();
    this.mountAndEmitSelected();
  }

  get items() {
    return this._items;
  }

  @Output() itemSelected = new EventEmitter<any>();

  @Output() sortedArray = new EventEmitter<any>();

  @Output() lastItem = new EventEmitter<any>();

  visibleItems = [];

  selectedItem: { index: number, value: any } = {
    index: 0,
    value: undefined,
  };

  private initialIndex = 0;

  private finalIndex: number;

  private _items;

  private _selectedIndex = 0;

  private _itemsPerPage = 4;

  private _arrayToSort;

  private _enableDrag = false;

  constructor() { }

  public ngAfterViewInit(): void {
    this.itemsCarouselEl = this.itemsCarousel.nativeElement;
    this.mousedownEvent();
  }

  get itemWidth() {
    return 100 / this.itemsPerPage;
  }

  enablePrevButton() {
    return this.initialIndex > 0;
  }

  get enableNextButton() {
    const totalItems = this.items.length;
    return this.initialIndex < (totalItems - this.itemsPerPage);
  }

  get showNavigators() {
    return !this.items || this.items.length > this.itemsPerPage;
  }

  detectVisibleItems() {

    const itemsArray = this.items.toArray();

    this.finalIndex = this.initialIndex + this.itemsPerPage;

    const itemsObjects = itemsArray.map((item, index) => {
      return {
        index: index,
        component: item
      };
    });

    this.visibleItems = itemsObjects.slice(this.initialIndex, this.finalIndex);
    if (!this.enableNextButton) {
      this.lastItem.emit();
    }
  }

  goPrev() {
    if (this.enablePrevButton()) {
      this.initialIndex--;
      this.detectVisibleItems();
    }
  }

  goNext() {
    if (this.enableNextButton) {
      this.initialIndex++;
      this.detectVisibleItems();
    }
  }

  selectItem(index) {
    this.selectedIndex = index;
    this.mountAndEmitSelected();
  }

  private detectInitialIndexBasedOnPageSizeAndItemsLength() {

    const itemsArray = this.items.toArray();

    const totalItems = itemsArray.length;

    const totalToRight = totalItems - this.initialIndex;

    const doNotFullfillPage = totalToRight < this.itemsPerPage;

    if (doNotFullfillPage) {

      const suggestedInitialIndex = totalItems - this.itemsPerPage;

      const suggestedInitialIndexIsInsideOfRange = suggestedInitialIndex >= 0;

      if (suggestedInitialIndexIsInsideOfRange) {

        this.initialIndex = suggestedInitialIndex;

      } else {

        this.initialIndex = 0;

      }

    }

  }

  private mountAndEmitSelected() {
    this.mountSelectedItem();
    this.emitSelectedItem();
  }

  private mountSelectedItem() {
    if (this.items.length) {
      const item = this.items.toArray()[this.selectedIndex];
      this.selectedItem = {
        index: this.selectedIndex,
        value: item.value
      };
    }
  }

  private emitSelectedItem() {
    this.itemSelected.emit(this.selectedItem);
  }

  drop(event: CdkDragDrop<any[]>) {
    const previous = this.initialIndex + event.previousIndex;
    const current = this.initialIndex + event.currentIndex;
    if (this.arrayToSort) {
      moveItemInArray(this.arrayToSort, previous, current);
    }
    this.sortedArray.emit({
      previousIndex: previous,
      currentIndex: current
    });
  }

  // tslint:disable-next-line:member-ordering
  private _mouseEventReference: MouseEvent;

  private mousemoveEvent(): Observable<Event> {
    return fromEvent(this.itemsCarouselEl, 'mousemove').pipe(
      takeUntil(fromEvent(this.itemsCarouselEl, 'mouseup')),
      takeUntil(fromEvent(this.itemsCarouselEl, 'mouseleave')),
    );
  }

  private mousedownEvent(): void {

    fromEvent(this.itemsCarouselEl, 'mousedown').pipe(
      switchMap((event: MouseEvent) => {
        this._mouseEventReference = event;
        return this.mousemoveEvent();
      }),
      throttle(() => timer(100))
    ).subscribe((event: MouseEvent) => {
      this.onMousemove(event);
    });

  }

  private onMousemove(event: MouseEvent): void {
    if (!this._enableDrag) {
      let distance = 0;
      let lengthItems = 0;

      if (this.vertical) {
        distance = this._mouseEventReference.screenY - event.screenY;
        lengthItems = this.itemsCarouselEl.offsetHeight;
      } else {
        distance = event.screenX - this._mouseEventReference.screenX;
        lengthItems = this.itemsCarouselEl.offsetWidth;
      }

      if (Math.abs(distance) >= (lengthItems / this._itemsPerPage) - +this.gap.replace('px', '')) {
        this._mouseEventReference = event;
        let directionFunc;

        if (this.vertical) {
          if (distance < 0) {
            directionFunc = this.goPrev;
          } else {
            directionFunc = this.goNext;
          }
        } else {
          if (distance > 0) {
            directionFunc = this.goPrev;
          } else {
            directionFunc = this.goNext;
          }
        }

        directionFunc = directionFunc.bind(this);
        directionFunc();
      }
    }
  }
}
