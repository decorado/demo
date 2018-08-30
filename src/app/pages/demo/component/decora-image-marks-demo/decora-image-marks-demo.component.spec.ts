import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraImageMarksDemoComponent } from './decora-image-marks-demo.component';

describe('DecoraImageMarksDemoComponent', () => {
  let component: DecoraImageMarksDemoComponent;
  let fixture: ComponentFixture<DecoraImageMarksDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraImageMarksDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraImageMarksDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
