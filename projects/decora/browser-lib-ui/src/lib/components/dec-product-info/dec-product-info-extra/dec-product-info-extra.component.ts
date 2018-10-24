import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'dec-product-info-extra',
  templateUrl: './dec-product-info-extra.component.html',
  styleUrls: ['./dec-product-info-extra.component.scss']
})
export class DecProductInfoExtraComponent implements OnInit {

  @Input() label = '';

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
