import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraSpinnerDemoComponent } from './decora-spinner-demo.component';

describe('DecoraSpinnerDemoComponent', () => {
  let component: DecoraSpinnerDemoComponent;
  let fixture: ComponentFixture<DecoraSpinnerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraSpinnerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraSpinnerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
