import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from './../../services/category/category.service';

@Pipe({
  name: 'decCategory'
})
export class CategoryPipe implements PipeTransform {

  constructor(private categoryService: CategoryService) {
  }

  transform(value: string): Observable<string> {
    return this.categoryService.getNameByCode(value);
  }
}
