import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraProductsFeaturesDemoComponent } from './decora-products-features-demo.component';

describe('DecoraProductsFeaturesDemoComponent', () => {
  let component: DecoraProductsFeaturesDemoComponent;
  let fixture: ComponentFixture<DecoraProductsFeaturesDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraProductsFeaturesDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraProductsFeaturesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
