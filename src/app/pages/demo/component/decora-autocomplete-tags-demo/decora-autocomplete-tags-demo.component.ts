import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-autocomplete-tags-demo',
  templateUrl: './decora-autocomplete-tags-demo.component.html',
  styleUrls: ['./decora-autocomplete-tags-demo.component.scss']
})
export class DecoraAutocompleteTagsDemoComponent implements OnInit {

  tag;

  tags;

  constructor() { }

  ngOnInit() {
  }


  optionSelected($event) {
    console.log($event);
  }

  enterButton($event) {
    console.log($event.target.value);
    $event.target.value = null;
  }
}
