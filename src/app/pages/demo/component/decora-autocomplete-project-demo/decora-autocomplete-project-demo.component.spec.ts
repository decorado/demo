import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteProjectDemoComponent } from './decora-autocomplete-project-demo.component';

describe('DecoraAutocompleteProjectDemoComponent', () => {
  let component: DecoraAutocompleteProjectDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteProjectDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteProjectDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteProjectDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
