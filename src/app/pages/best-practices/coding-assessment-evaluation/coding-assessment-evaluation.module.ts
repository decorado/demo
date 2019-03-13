import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodingAssessmentEvaluationRoutingModule } from './coding-assessment-evaluation-routing.module';
import { CodingAssessmentEvaluationComponent } from './coding-assessment-evaluation.component';

@NgModule({
  declarations: [CodingAssessmentEvaluationComponent],
  imports: [
    CommonModule,
    CodingAssessmentEvaluationRoutingModule
  ]
})
export class CodingAssessmentEvaluationModule { }
