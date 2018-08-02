import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteDepartmentComponent } from './autocomplete-department.component';

describe('AutocompleteDepartmentComponent', () => {
  let component: AutocompleteDepartmentComponent;
  let fixture: ComponentFixture<AutocompleteDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
