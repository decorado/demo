import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteSquadsDemoComponent } from './decora-autocomplete-squads-demo.component';

describe('DecoraAutocompleteSquadsDemoComponent', () => {
  let component: DecoraAutocompleteSquadsDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteSquadsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteSquadsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteSquadsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
