import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraAutocompleteDepartmentDemoComponent } from './decora-autocomplete-department-demo.component';

describe('DecoraAutocompleteDepartmentDemoComponent', () => {
  let component: DecoraAutocompleteDepartmentDemoComponent;
  let fixture: ComponentFixture<DecoraAutocompleteDepartmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraAutocompleteDepartmentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraAutocompleteDepartmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
