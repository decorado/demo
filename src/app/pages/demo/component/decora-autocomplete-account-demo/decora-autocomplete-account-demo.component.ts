import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-autocomplete-account-demo',
  templateUrl: './decora-autocomplete-account-demo.component.html',
  styleUrls: ['./decora-autocomplete-account-demo.component.css']
})
export class DecoraAutocompleteAccountDemoComponent implements OnInit {

  account = '10013';

  types = ['production'];

  constructor() { }

  ngOnInit() {
  }

  optionSelected($event) {

    console.log('optionSelected($event)', $event);

  }

}
