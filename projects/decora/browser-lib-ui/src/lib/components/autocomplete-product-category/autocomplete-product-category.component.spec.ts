import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAutocompleteProductCategoryComponent } from './autocomplete-product-category.component';

describe('DecAutocompleteProductCategoryComponent', () => {
  let component: DecAutocompleteProductCategoryComponent;
  let fixture: ComponentFixture<DecAutocompleteProductCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecAutocompleteProductCategoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAutocompleteProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
