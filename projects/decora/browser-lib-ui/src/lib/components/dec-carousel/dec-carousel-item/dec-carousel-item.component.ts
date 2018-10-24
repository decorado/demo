import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'dec-carousel-item',
  templateUrl: './dec-carousel-item.component.html',
  styleUrls: ['./dec-carousel-item.component.scss']
})
export class DecCarouselItemComponent implements OnInit {

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  @Input() value: any;

  constructor() { }

  ngOnInit() {
  }

}
