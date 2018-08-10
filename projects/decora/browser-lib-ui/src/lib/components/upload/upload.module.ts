import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';
import { DecUploadComponent } from './upload.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  declarations: [
    DecUploadComponent
  ],
  exports: [
    DecUploadComponent
  ]
})
export class DecUploadModule {}
