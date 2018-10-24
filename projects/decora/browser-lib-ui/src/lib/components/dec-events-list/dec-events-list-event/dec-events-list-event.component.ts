import { Component, Input, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'dec-events-list-event',
  templateUrl: './dec-events-list-event.component.html',
  styleUrls: ['./dec-events-list-event.component.scss']
})
export class DecEventsListEventComponent {

  @Input() label: string;

  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  constructor() { }

}
