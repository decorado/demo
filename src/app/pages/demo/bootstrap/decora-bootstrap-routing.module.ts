import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraBootstrapComponent } from './decora-bootstrap.component';
import { AppearanceComponent } from './appearance/appearance.component';
import { PositioningComponent } from './positioning/positioning.component';
import { ThirdPartyComponent } from './third-party/third-party.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: DecoraBootstrapComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'appearance', component: AppearanceComponent },
      { path: 'positioning', component: PositioningComponent },
      { path: 'third-party', component: ThirdPartyComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraBootstrapRoutingModule { }
