import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-autocomplete-country-demo',
  templateUrl: './decora-autocomplete-country-demo.component.html',
  styleUrls: ['./decora-autocomplete-country-demo.component.css']
})
export class DecoraAutocompleteCountryDemoComponent implements OnInit {

  country = 'AE';

  countries = [];

  constructor() { }

  ngOnInit() {
  }

  optionSelected($event) {

    console.log('optionSelected($event)', $event);

  }

}
