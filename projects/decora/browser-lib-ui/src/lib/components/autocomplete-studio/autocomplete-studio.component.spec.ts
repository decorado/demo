import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteStudioComponent } from './autocomplete-studio.component';

describe('AutocompleteStudioComponent', () => {
  let component: AutocompleteStudioComponent;
  let fixture: ComponentFixture<AutocompleteStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
