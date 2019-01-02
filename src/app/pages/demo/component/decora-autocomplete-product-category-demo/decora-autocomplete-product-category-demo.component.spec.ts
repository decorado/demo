import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteProductCategoryDemoComponent } from './decora-autocomplete-product-category-demo.component';

describe('DecoraAutocompleteProductCategoryDemoComponent', () => {
  let component: DecoraAutocompleteProductCategoryDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteProductCategoryDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteProductCategoryDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteProductCategoryDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
