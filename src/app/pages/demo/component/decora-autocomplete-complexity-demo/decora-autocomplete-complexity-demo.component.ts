import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-autocomplete-complexity-demo',
  templateUrl: './decora-autocomplete-complexity-demo.component.html',
  styleUrls: ['./decora-autocomplete-complexity-demo.component.scss']
})
export class DecoraAutocompleteComplexityDemoComponent implements OnInit {

  complexity;

  complexities;

  constructor() { }

  ngOnInit() {
  }

  optionSelected($event) {
    console.log('DecoraAutocompleteDemoComponent:: OptionSelected', $event);
  }


}
