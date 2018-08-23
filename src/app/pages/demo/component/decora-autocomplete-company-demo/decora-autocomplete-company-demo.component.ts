import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-autocomplete-company-demo',
  templateUrl: './decora-autocomplete-company-demo.component.html',
  styleUrls: ['./decora-autocomplete-company-demo.component.css']
})
export class DecoraAutocompleteCompanyDemoComponent implements OnInit {

  company = 235;

  constructor() { }

  ngOnInit() {
  }

  optionSelected($event) {

    console.log('optionSelected($event)', $event);

  }

}
