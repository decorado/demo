import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { DecPageNotFoundModule } from './../../../../projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    PageNotFoundRoutingModule,
    DecPageNotFoundModule
  ],
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class PageNotFoundModule { }
