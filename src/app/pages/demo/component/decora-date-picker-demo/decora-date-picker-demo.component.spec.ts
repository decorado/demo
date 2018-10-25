import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraDatePickerDemoComponent } from './decora-date-picker-demo.component';

describe('DecoraDatePickerDemoComponent', () => {
  let component: DecoraDatePickerDemoComponent;
  let fixture: ComponentFixture<DecoraDatePickerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraDatePickerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraDatePickerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
