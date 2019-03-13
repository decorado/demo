import { Component, OnInit, TemplateRef, ContentChild } from '@angular/core';

@Component({
  selector: 'dec-autocomplete-option-template',
  templateUrl: './dec-autocomplete-option-template.component.html',
  styleUrls: ['./dec-autocomplete-option-template.component.scss']
})
export class DecAutocompleteOptionTemplateComponent implements OnInit {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
