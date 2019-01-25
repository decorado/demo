import { Component, } from '@angular/core';

@Component({
  selector: 'app-decora-carousel-demo',
  templateUrl: './decora-carousel-demo.component.html',
  styleUrls: ['./decora-carousel-demo.component.scss']
})
export class DecoraCarouselDemoComponent {


  dragAndDropArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  dragAndDropItemsVertical = [...this.dragAndDropArray];


  onItemSelected(event: any) {
    console.log('onItemSelected', event);
  }

}
