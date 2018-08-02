import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteCompanyDemoComponent } from './decora-autocomplete-company-demo.component';

describe('DecoraAutocompleteCompanyDemoComponent', () => {
  let component: DecoraAutocompleteCompanyDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteCompanyDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteCompanyDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteCompanyDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
