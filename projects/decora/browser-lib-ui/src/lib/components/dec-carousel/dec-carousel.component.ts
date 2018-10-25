import { Component, ContentChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { DecCarouselItemComponent } from './dec-carousel-item/dec-carousel-item.component';

@Component({
  selector: 'dec-carousel',
  templateUrl: './dec-carousel.component.html',
  styleUrls: ['./dec-carousel.component.scss']
})
export class DecCarouselComponent {

  @Input()
  set selectedIndex(v) {
    if (v !== this._selectedIndex) {
      this._selectedIndex = v;
      if (this.items) {
        this.mountAndEmitSelected();
      }
    }
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  @Input() itemsPerPage = 4;

  @Input() highlightSelected = true;

  @Input() gap = '8px';

  @ContentChildren(DecCarouselItemComponent)
  set items(v: QueryList<DecCarouselItemComponent>) {
    if (this._items !== v) {
      this._items = v;
      this.mountSelectedItem();
      this.detectVisibleItems();
      this.mountAndEmitSelected();
    }
  }

  get items() {
    return this._items;
  }

  @Output() itemSelected = new EventEmitter<any>();

  visibleItems = [];

  selectedItem: { index: number, value: any } = {
    index: 0,
    value: undefined,
  };

  private initialIndex = 0;

  private finalIndex;

  private _items;

  private _selectedIndex = 0;

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

  private mountAndEmitSelected() {
    this.mountSelectedItem();
    this.emitSelectedItem();
  }

  private mountSelectedItem() {
    const item = this.items.toArray()[this.selectedIndex];
    this.selectedItem = {
      index: this.selectedIndex,
      value: item.value
    };
  }

  private emitSelectedItem() {
    this.itemSelected.emit(this.selectedItem);
  }

}
