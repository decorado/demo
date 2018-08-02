import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraProductSpinDemoComponent } from './decora-product-spin-demo.component';

describe('DecoraProductSpinDemoComponent', () => {
  let component: DecoraProductSpinDemoComponent;
  let fixture: ComponentFixture<DecoraProductSpinDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraProductSpinDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraProductSpinDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
