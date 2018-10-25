import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecDatePickerComponent } from './dec-date-picker.component';

describe('DecDatePickerComponent', () => {
  let component: DecDatePickerComponent;
  let fixture: ComponentFixture<DecDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
