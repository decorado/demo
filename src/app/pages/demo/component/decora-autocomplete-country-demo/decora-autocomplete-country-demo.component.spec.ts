import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteCountryDemoComponent } from './decora-autocomplete-country-demo.component';

describe('DecoraAutocompleteCountryDemoComponent', () => {
  let component: DecoraAutocompleteCountryDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteCountryDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteCountryDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteCountryDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
