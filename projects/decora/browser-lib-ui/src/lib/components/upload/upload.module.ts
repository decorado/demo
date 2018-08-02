import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';
import { DecUploadComponent } from './upload.component';
import { DecApiModule } from './../../services/api/decora-api.module';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    DecApiModule,
  ],
  declarations: [
    DecUploadComponent
  ],
  exports: [
    DecUploadComponent
  ]
})
export class DecUploadModule {}
