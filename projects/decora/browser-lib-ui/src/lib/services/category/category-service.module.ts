import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from './category.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryServiceModule { }
