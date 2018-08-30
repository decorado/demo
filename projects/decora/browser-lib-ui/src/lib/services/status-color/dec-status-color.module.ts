import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecStatusColorService } from './dec-status-color.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [DecStatusColorService]
})
export class DecStatusColorModule { }
