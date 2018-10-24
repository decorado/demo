import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecColorPickerComponent } from './dec-color-picker.component';

describe('DecColorPickerComponent', () => {
  let component: DecColorPickerComponent;
  let fixture: ComponentFixture<DecColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
