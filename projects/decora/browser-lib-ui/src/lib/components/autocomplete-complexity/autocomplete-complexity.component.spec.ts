import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComplexityComponent } from './autocomplete-complexity.component';

describe('AutocompleteComplexityComponent', () => {
  let component: AutocompleteComplexityComponent;
  let fixture: ComponentFixture<AutocompleteComplexityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteComplexityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComplexityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
