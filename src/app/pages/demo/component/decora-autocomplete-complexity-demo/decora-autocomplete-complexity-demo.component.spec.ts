import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteComplexityDemoComponent } from './decora-autocomplete-complexity-demo.component';

describe('DecoraAutocompleteComplexityDemoComponent', () => {
  let component: DecoraAutocompleteComplexityDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteComplexityDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteComplexityDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteComplexityDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
