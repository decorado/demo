import { Component, OnInit, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'dec-list-actions',
  templateUrl: './list-actions.component.html',
  styleUrls: ['./list-actions.component.css']
})
export class DecListActionsComponent implements OnInit {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
