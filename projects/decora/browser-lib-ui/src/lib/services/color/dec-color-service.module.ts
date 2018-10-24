import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecColorService } from './dec-color.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [DecColorService]
})
export class DecColorServiceModule { }
