import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAutocompleteProductComponent } from './autocomplete-product.component';

describe('DecAutocompleteProductComponent', () => {
  let component: DecAutocompleteProductComponent;
  let fixture: ComponentFixture<DecAutocompleteProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecAutocompleteProductComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAutocompleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
