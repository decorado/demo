import { QueryList, EventEmitter } from '@angular/core';
import { DecCarouselItemComponent } from './dec-carousel-item/dec-carousel-item.component';
export declare class DecCarouselComponent {
    selectedIndex: number;
    itemsPerPage: number;
    highlightSelected: boolean;
    gap: string;
    items: QueryList<DecCarouselItemComponent>;
    itemSelected: EventEmitter<any>;
    visibleItems: any[];
    selectedItem: {
        index: number;
        value: any;
    };
    private initialIndex;
    private finalIndex;
    private _items;
    private _selectedIndex;
    constructor();
    readonly itemWidth: number;
    readonly showPrevButton: boolean;
    readonly showNextButton: boolean;
    readonly showNavigators: boolean;
    detectVisibleItems(): void;
    goPrev(): void;
    goNext(): void;
    selectItem(index: any): void;
    private mountAndEmitSelected();
    private mountSelectedItem();
    private emitSelectedItem();
}
