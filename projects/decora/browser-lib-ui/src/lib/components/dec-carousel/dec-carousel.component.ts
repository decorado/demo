import { Component, ContentChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { DecCarouselItemComponent } from './dec-carousel-item/dec-carousel-item.component';

@Component({
  selector: 'dec-carousel',
  templateUrl: './dec-carousel.component.html',
  styleUrls: ['./dec-carousel.component.scss']
})
export class DecCarouselComponent {

  @Input() selectedIndex = 0;

  @Input() itemsPerPage = 4;

  @Input() gap = '8px';

  @ContentChildren(DecCarouselItemComponent) items: QueryList<DecCarouselItemComponent>;

  @Output() itemSelected = new EventEmitter<any>();

  private initialIndex = 0;

  private finalIndex;

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

  get visibleItems() {

    const itemsArray = this.items.toArray();

    this.finalIndex = this.initialIndex + this.itemsPerPage;

    const itemsObjects = itemsArray.map((item, index) => {
      return {
        index: index,
        component: item
      };
    });

    return itemsObjects.slice(this.initialIndex, this.finalIndex);

  }

  get selectedItem() {
    return this.items.toArray()[this.selectedIndex];
  }

  goPrev() {
    this.initialIndex--;
  }

  goNext() {
    this.initialIndex++;
  }

  selectItem(index) {

    this.selectedIndex = index;

    this.itemSelected.emit({
      index: this.selectedIndex,
      value: this.selectedItem.value
    });

  }

}
