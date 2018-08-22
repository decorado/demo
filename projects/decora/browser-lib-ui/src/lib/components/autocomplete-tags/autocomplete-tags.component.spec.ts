import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAutocompleteTagsComponent } from './autocomplete-tags.component';

describe('DecAutocompleteTagsComponent', () => {
  let component: DecAutocompleteTagsComponent;
  let fixture: ComponentFixture<DecAutocompleteTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecAutocompleteTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAutocompleteTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
