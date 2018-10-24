import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecColorPickerModalComponent } from './dec-color-picker-modal.component';

describe('DecColorPickerModalComponent', () => {
  let component: DecColorPickerModalComponent;
  let fixture: ComponentFixture<DecColorPickerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecColorPickerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecColorPickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
