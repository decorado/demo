import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecCarouselComponent } from './dec-carousel.component';
import { DecCarouselItemComponent } from './dec-carousel-item/dec-carousel-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [DecCarouselComponent, DecCarouselItemComponent],
  exports: [DecCarouselComponent, DecCarouselItemComponent]
})
export class DecCarouselModule { }
