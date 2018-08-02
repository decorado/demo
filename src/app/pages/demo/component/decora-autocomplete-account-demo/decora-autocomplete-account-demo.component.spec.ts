import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteAccountDemoComponent } from './decora-autocomplete-account-demo.component';

describe('DecoraAutocompleteAccountDemoComponent', () => {
  let component: DecoraAutocompleteAccountDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteAccountDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteAccountDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteAccountDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
