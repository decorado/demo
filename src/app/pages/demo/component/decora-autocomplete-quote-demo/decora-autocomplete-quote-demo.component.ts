import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-decora-autocomplete-quote-demo',
  templateUrl: './decora-autocomplete-quote-demo.component.html',
  styleUrls: ['./decora-autocomplete-quote-demo.component.css']
})
export class DecoraAutocompleteQuoteDemoComponent {

  projectId = 1136;

  companyId = 1;

  quote = 637;

  quotes = [];

  constructor() { }

  setTouched(ngModelEl: NgModel) {
    ngModelEl.control.markAsTouched();
  }

}
