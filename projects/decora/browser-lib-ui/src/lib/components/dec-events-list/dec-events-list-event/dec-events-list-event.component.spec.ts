import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecEventsListEventComponent } from './dec-events-list-event.component';

describe('DecEventsListEventComponent', () => {
  let component: DecEventsListEventComponent;
  let fixture: ComponentFixture<DecEventsListEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecEventsListEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecEventsListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
