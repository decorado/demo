import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-autocomplete-product-category-demo',
  templateUrl: './decora-autocomplete-product-category-demo.component.html',
  styleUrls: ['./decora-autocomplete-product-category-demo.component.css']
})
export class DecoraAutocompleteProductCategoryDemoComponent implements OnInit {

  categoryId = '0A1';

  category: number;

  categories = [];

  constructor() { }

  ngOnInit() {
  }

  optionSelected($event) {

    console.log('optionSelected($event)', $event);

  }

}
