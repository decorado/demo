import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteRoleDemoComponent } from './decora-autocomplete-role-demo.component';

describe('DecoraAutocompleteRoleDemoComponent', () => {
  let component: DecoraAutocompleteRoleDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteRoleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteRoleDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteRoleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
