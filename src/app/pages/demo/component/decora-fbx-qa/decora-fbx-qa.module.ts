import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraFbxQaRoutingModule } from './decora-fbx-qa-routing.module';
import { DecoraFbxQaComponent } from './decora-fbx-qa.component';

@NgModule({
  declarations: [DecoraFbxQaComponent],
  imports: [
    CommonModule,
    DecoraFbxQaRoutingModule
  ]
})
export class DecoraFbxQaModule { }
