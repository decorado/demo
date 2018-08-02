import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteQuoteDemoComponent } from './decora-autocomplete-quote-demo.component';

describe('DecoraAutocompleteQuoteDemoComponent', () => {
  let component: DecoraAutocompleteQuoteDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteQuoteDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteQuoteDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteQuoteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
