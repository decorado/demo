import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-autocomplete-project-demo',
  templateUrl: './decora-autocomplete-project-demo.component.html',
  styleUrls: ['./decora-autocomplete-project-demo.component.css']
})
export class DecoraAutocompleteProjectDemoComponent implements OnInit {

  companyId = 1;

  project: number;

  projects = [];

  constructor() { }

  ngOnInit() {
  }

  optionSelected($event) {

    console.log('optionSelected($event)', $event);

  }

}
