import { Component, ContentChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { DecCarouselItemComponent } from './dec-carousel-item/dec-carousel-item.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'dec-carousel',
  templateUrl: './dec-carousel.component.html',
  styleUrls: ['./dec-carousel.component.scss']
})
export class DecCarouselComponent {

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

  get itemWidth() {
    return 100 / this.itemsPerPage;
  }

  get showPrevButton() {
    return this.initialIndex > 0;
  }

  get showNextButton() {
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

  }

  goPrev() {
    this.initialIndex--;
    this.detectVisibleItems();
  }

  goNext() {
    this.initialIndex++;
    this.detectVisibleItems();
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

}
