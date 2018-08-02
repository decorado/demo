import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'dec-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class DecTabMenuComponent implements OnInit {

  @Input() activeTab: string;

  @ContentChild(TemplateRef) content: TemplateRef<DecTabMenuComponent>;

  constructor() { }

  ngOnInit() {
  }

}
