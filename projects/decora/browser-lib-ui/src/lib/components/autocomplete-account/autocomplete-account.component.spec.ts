import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAutocompleteAccountComponent } from './autocomplete-account.component';

describe('DecAutocompleteAccountComponent', () => {
  let component: DecAutocompleteAccountComponent;
  let fixture: ComponentFixture<DecAutocompleteAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecAutocompleteAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAutocompleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
