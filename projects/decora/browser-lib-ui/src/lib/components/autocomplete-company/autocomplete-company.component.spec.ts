import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAutocompleteCompanyComponent } from './autocomplete-company.component';

describe('DecAutocompleteCompanyComponent', () => {
  let component: DecAutocompleteCompanyComponent;
  let fixture: ComponentFixture<DecAutocompleteCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecAutocompleteCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAutocompleteCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
