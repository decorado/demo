import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecEventsListComponent } from './dec-events-list.component';
import { DecEventsListEventComponent } from './dec-events-list-event/dec-events-list-event.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [DecEventsListComponent, DecEventsListEventComponent],
  exports: [DecEventsListComponent, DecEventsListEventComponent]
})
export class DecEventsListModule { }
