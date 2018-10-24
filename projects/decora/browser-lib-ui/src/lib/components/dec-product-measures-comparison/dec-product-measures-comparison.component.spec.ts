import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecProductMeasuresComparisonComponent } from './dec-product-measures-comparison.component';

describe('DecProductMeasuresComparisonComponent', () => {
  let component: DecProductMeasuresComparisonComponent;
  let fixture: ComponentFixture<DecProductMeasuresComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecProductMeasuresComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecProductMeasuresComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
