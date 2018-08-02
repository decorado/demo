// Angular modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { DecBreadcrumbComponent } from './breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule,
    TranslateModule,
  ],
  declarations: [
    DecBreadcrumbComponent
  ],
  exports: [
    DecBreadcrumbComponent
  ]
})
export class DecBreadcrumbModule { }
