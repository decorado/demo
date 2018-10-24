import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraColorPickerDemoComponent } from './decora-color-picker-demo.component';

describe('DecoraColorPickerDemoComponent', () => {
  let component: DecoraColorPickerDemoComponent;
  let fixture: ComponentFixture<DecoraColorPickerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraColorPickerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraColorPickerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
