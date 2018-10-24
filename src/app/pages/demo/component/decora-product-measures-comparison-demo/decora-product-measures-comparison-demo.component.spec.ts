import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraProductMeasuresComparisonDemoComponent } from './decora-product-measures-comparison-demo.component';

describe('DecoraProductMeasuresComparisonDemoComponent', () => {
  let component: DecoraProductMeasuresComparisonDemoComponent;
  let fixture: ComponentFixture<DecoraProductMeasuresComparisonDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraProductMeasuresComparisonDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraProductMeasuresComparisonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
