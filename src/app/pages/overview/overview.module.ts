import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { TranslateModule } from '@ngx-translate/core';
import { DecMarkdownModule } from '@app/shared/components/markdown/markdown.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewRoutingModule,
    TranslateModule,
    DecMarkdownModule
  ],
  declarations: [OverviewComponent]
})
export class OverviewModule { }
