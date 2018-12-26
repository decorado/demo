import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecMeshQaComponent } from './dec-mesh-qa.component';
import { SafeModule } from '../../pipes/safe/safe.module';

@NgModule({
  imports: [
    CommonModule,
    SafeModule
  ],
  declarations: [DecMeshQaComponent],
  exports: [DecMeshQaComponent],
})
export class DecMeshQaModule { }
