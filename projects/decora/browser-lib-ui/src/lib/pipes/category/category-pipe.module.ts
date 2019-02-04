import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPipe } from './category.pipe';
import { CategoryServiceModule } from './../../services/category/category-service.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryServiceModule,
  ],
  declarations: [
    CategoryPipe
  ],
  exports: [
    CategoryPipe
  ],
  providers: [
    CategoryPipe
  ]
})
export class CategoryPipeModule { }
