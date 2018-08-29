import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-autocomplete-role-demo',
  templateUrl: './decora-autocomplete-role-demo.component.html',
  styleUrls: ['./decora-autocomplete-role-demo.component.css']
})
export class DecoraAutocompleteRoleDemoComponent implements OnInit {

  role = 'adm.cfo';

  types = ['adm', 'it', 'production'];

  roles = [];

  constructor() { }

  ngOnInit() {
  }

  optionSelected($event) {

    console.log('optionSelected($event)', $event);

  }

}
