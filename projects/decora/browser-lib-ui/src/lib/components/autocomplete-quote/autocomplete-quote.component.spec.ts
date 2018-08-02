import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAutocompleteQuoteComponent } from './autocomplete-quote.component';

describe('DecAutocompleteQuoteComponent', () => {
  let component: DecAutocompleteQuoteComponent;
  let fixture: ComponentFixture<DecAutocompleteQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecAutocompleteQuoteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAutocompleteQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
