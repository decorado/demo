import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslationRoutingModule } from './translation-routing.module';
import { TranslationComponent } from './translation.component';

@NgModule({
  declarations: [TranslationComponent],
  imports: [
    CommonModule,
    TranslationRoutingModule,
    RouterModule,
  ]
})
export class TranslationModule { }
