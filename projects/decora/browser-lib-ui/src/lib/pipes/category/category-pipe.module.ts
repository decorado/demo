import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPipe } from './category.pipe';
import { CategoryPipeService } from './category-pipe.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CategoryPipe
  ],
  exports: [
    CategoryPipe
  ],
  providers: [
    CategoryPipe,
    CategoryPipeService
  ]
})
export class CategoryPipeModule { }
