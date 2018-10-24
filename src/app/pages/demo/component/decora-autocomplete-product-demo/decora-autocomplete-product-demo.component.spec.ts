import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteProductDemoComponent } from './decora-autocomplete-product-demo.component';

describe('DecoraAutocompleteProductDemoComponent', () => {
  let component: DecoraAutocompleteProductDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteProductDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteProductDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteProductDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
