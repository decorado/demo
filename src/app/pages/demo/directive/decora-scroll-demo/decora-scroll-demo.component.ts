import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-scroll-demo',
  templateUrl: './decora-scroll-demo.component.html',
  styleUrls: ['./decora-scroll-demo.component.scss']
})
export class DecoraScrollDemoComponent implements OnInit {

  itens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  constructor() { }

  ngOnInit() {
  }

  onScrollFinish(container) {
    console.log('Dec Scroll Finished', container);
  }

}
