import { PipeTransform } from '@angular/core';
import { CategoryPipeService } from './category-pipe.service';
import { Observable } from 'rxjs';
export declare class CategoryPipe implements PipeTransform {
    private categoryPipeService;
    constructor(categoryPipeService: CategoryPipeService);
    transform(value: string): Observable<string>;
}
