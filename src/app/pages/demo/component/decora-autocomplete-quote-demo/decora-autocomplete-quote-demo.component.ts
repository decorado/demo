import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-autocomplete-quote-demo',
  templateUrl: './decora-autocomplete-quote-demo.component.html',
  styleUrls: ['./decora-autocomplete-quote-demo.component.css']
})
export class DecoraAutocompleteQuoteDemoComponent implements OnInit {

  projectId = 1136;

  companyId = 1;

  quote: any;

  quotes = [];

  constructor() { }

  ngOnInit() {
  }

}
