import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'component-styles', loadChildren: './component-styles/component-styles.module#ComponentStylesModule' },
  { path: 'presentation-components', loadChildren: './presentation-components/presentation-components.module#PresentationComponentsModule' },
  { path: 'forms', loadChildren: './forms/forms.module#FormsBestPracticesModule' },
  { path: 'translation', loadChildren: './translation/translation.module#TranslationModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BestPracticesRoutingModule { }
