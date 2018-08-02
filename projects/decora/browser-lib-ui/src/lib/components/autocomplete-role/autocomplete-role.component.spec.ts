import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAutocompleteRoleComponent } from './autocomplete-role.component';

describe('DecAutocompleteRoleComponent', () => {
  let component: DecAutocompleteRoleComponent;
  let fixture: ComponentFixture<DecAutocompleteRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecAutocompleteRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAutocompleteRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
