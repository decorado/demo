import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsBestPracticesComponent } from './forms.component';

describe('FormsBestPracticesComponent', () => {
  let component: FormsBestPracticesComponent;
  let fixture: ComponentFixture<FormsBestPracticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsBestPracticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsBestPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
