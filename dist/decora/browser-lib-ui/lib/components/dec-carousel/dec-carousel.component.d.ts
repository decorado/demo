import { QueryList, EventEmitter } from '@angular/core';
import { DecCarouselItemComponent } from './dec-carousel-item/dec-carousel-item.component';
export declare class DecCarouselComponent {
    selectedIndex: number;
    itemsPerPage: number;
    gap: string;
    items: QueryList<DecCarouselItemComponent>;
    itemSelected: EventEmitter<any>;
    private initialIndex;
    private finalIndex;
    constructor();
    readonly itemWidth: number;
    readonly showPrevButton: boolean;
    readonly showNextButton: boolean;
    readonly showNavigators: boolean;
    readonly visibleItems: {
        index: number;
        component: DecCarouselItemComponent;
    }[];
    readonly selectedItem: DecCarouselItemComponent;
    goPrev(): void;
    goNext(): void;
    selectItem(index: any): void;
}
