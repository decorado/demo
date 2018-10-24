import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-autocomplete-product-demo',
  templateUrl: './decora-autocomplete-product-demo.component.html',
  styleUrls: ['./decora-autocomplete-product-demo.component.css']
})
export class DecoraAutocompleteProductDemoComponent implements OnInit {

  companyId = 1;

  product: number;

  products = [];

  constructor() { }

  ngOnInit() {
  }

  optionSelected($event) {

    console.log('optionSelected($event)', $event);

  }

}
