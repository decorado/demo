import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodingAssessmentEvaluationComponent } from './coding-assessment-evaluation.component';

const routes: Routes = [
  { path: '', component: CodingAssessmentEvaluationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodingAssessmentEvaluationRoutingModule { }
