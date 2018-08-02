import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAutocompleteProjectComponent } from './autocomplete-project.component';

describe('DecAutocompleteProjectComponent', () => {
  let component: DecAutocompleteProjectComponent;
  let fixture: ComponentFixture<DecAutocompleteProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecAutocompleteProjectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAutocompleteProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
