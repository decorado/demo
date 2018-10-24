import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecEventsListComponent } from './dec-events-list.component';

describe('DecEventsListComponent', () => {
  let component: DecEventsListComponent;
  let fixture: ComponentFixture<DecEventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecEventsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
