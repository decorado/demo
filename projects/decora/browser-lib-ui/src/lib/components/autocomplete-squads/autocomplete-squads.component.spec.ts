import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteSquadsComponent } from './autocomplete-squads.component';

describe('AutocompleteSquadsComponent', () => {
  let component: AutocompleteSquadsComponent;
  let fixture: ComponentFixture<AutocompleteSquadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteSquadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteSquadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
