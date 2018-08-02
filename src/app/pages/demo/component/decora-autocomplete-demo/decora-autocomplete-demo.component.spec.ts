import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteDemoComponent } from './decora-autocomplete-demo.component';

describe('DecoraAutocompleteDemoComponent', () => {
  let component: DecoraAutocompleteDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
