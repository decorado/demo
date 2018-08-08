import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteTagsDemoComponent } from './decora-autocomplete-tags-demo.component';

describe('DecoraAutocompleteTagsDemoComponent', () => {
  let component: DecoraAutocompleteTagsDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteTagsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteTagsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteTagsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
