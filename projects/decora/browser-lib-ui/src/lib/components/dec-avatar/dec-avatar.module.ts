import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecAvatarComponent } from './dec-avatar.component';
import { DecImageModule } from '../../directives/image/image.module';

@NgModule({
  imports: [
    CommonModule,
    DecImageModule
  ],
  declarations: [DecAvatarComponent],
  exports: [DecAvatarComponent]
})
export class DecAvatarModule { }
