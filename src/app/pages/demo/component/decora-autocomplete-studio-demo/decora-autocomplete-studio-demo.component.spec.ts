import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteStudioDemoComponent } from './decora-autocomplete-studio-demo.component';

describe('DecoraAutocompleteStudioDemoComponent', () => {
  let component: DecoraAutocompleteStudioDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteStudioDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteStudioDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteStudioDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
