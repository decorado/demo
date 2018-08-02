import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAutocompleteComponent } from './autocomplete.component';

describe('DecAutocompleteComponent', () => {
  let component: DecAutocompleteComponent;
  let fixture: ComponentFixture<DecAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
