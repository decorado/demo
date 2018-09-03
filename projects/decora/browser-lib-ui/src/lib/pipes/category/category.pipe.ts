import { Pipe, PipeTransform } from '@angular/core';
import { CategoryPipeService } from './category-pipe.service';
import { Observable } from 'rxjs';



@Pipe({
  name: 'decCategory'
})
export class CategoryPipe implements PipeTransform {

  constructor(private categoryPipeService: CategoryPipeService) {
  }

  transform(value: string): Observable<string> {
    return this.categoryPipeService.get(value);
  }
}
