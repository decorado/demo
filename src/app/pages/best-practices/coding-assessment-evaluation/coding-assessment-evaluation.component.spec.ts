import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingAssessmentEvaluationComponent } from './coding-assessment-evaluation.component';

describe('CodingAssessmentEvaluationComponent', () => {
  let component: CodingAssessmentEvaluationComponent;
  let fixture: ComponentFixture<CodingAssessmentEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodingAssessmentEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingAssessmentEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
