import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraEventsListDemoComponent } from './decora-events-list-demo.component';

describe('DecoraEventsListDemoComponent', () => {
  let component: DecoraEventsListDemoComponent;
  let fixture: ComponentFixture<DecoraEventsListDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraEventsListDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraEventsListDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
