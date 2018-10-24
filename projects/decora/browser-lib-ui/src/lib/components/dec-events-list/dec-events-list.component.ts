import { Component, ContentChildren, QueryList } from '@angular/core';
import { DecEventsListEventComponent } from './dec-events-list-event/dec-events-list-event.component';

@Component({
  selector: 'dec-events-list',
  templateUrl: './dec-events-list.component.html',
  styleUrls: ['./dec-events-list.component.scss']
})
export class DecEventsListComponent {

  @ContentChildren(DecEventsListEventComponent) events: QueryList<DecEventsListEventComponent>;

  constructor() { }

}
