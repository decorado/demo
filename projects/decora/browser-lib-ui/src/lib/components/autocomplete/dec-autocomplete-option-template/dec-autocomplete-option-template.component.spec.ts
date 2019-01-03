import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAutocompleteOptionTemplateComponent } from './dec-autocomplete-option-template.component';

describe('DecAutocompleteOptionTemplateComponent', () => {
  let component: DecAutocompleteOptionTemplateComponent;
  let fixture: ComponentFixture<DecAutocompleteOptionTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecAutocompleteOptionTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAutocompleteOptionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
