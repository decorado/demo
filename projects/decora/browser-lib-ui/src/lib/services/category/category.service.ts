import { Injectable } from '@angular/core';
import { DecApiService } from '../api/decora-api.service';
import { DecLanguageService } from '../language/dec-language.service';
import { of, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

const CATEGORY_ENDPOINT = '/legacy/product/category?language={i18n}';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categoriesObservable: ReplaySubject<any>;

  constructor(
    private decApi: DecApiService,
    private langService: DecLanguageService,
  ) { }

  getNameByCode(code): Observable<string> {

    if (code && code.length > 0) {

      return this.getCategoryNameByCode(code);

    } else {

      return of('');

    }

  }

  fetchCategories() {

    if (!this._categoriesObservable) {

      this._categoriesObservable = new ReplaySubject<any>(undefined);

      this.langService.lang$.subscribe(lang => {

        const endpoint = CATEGORY_ENDPOINT.replace('{i18n}', lang.decoraLanguageCode);

        return this.decApi.get(endpoint).subscribe(response => {

          this._categoriesObservable.next(response);

        });

      });

    }

    return this._categoriesObservable;

  }

  private getCategoryNameByCode(code: string | number) {

    return this.fetchCategories().pipe(
      map((categories: { sub: any }) => {
        return categories ? this.mountCategorieNameByCode(categories.sub, code) : '';
      })
    );
  }

  private mountCategorieNameByCode(categories, code) {

    const codeAsArray = code.toUpperCase().split('');

    let category = '';

    codeAsArray.forEach(codeSlice => {

      if (category.length > 0) {

        category += ' > ';

      }

      if (categories[codeSlice]) {

        category += categories[codeSlice].name;

        if (categories[codeSlice].sub) {

          categories = categories[codeSlice].sub;

        }

      } else {

        category += `UNKNOW CATEGORY #${code}`;

      }

    });

    return category;

  }

}
