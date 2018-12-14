import { Injectable } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
import { DecLanguageService } from '../../services/language/dec-language.service';
import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const CATEGORY_ENDPOINT = '/legacy/product/category?language={i18n}';

@Injectable({
  providedIn: 'root'
})
export class CategoryPipeService {

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

  private getCategoryNameByCode(code) {

    return this.langService.lang$.pipe(

      switchMap(lang => {

        const endpoint = CATEGORY_ENDPOINT.replace('{i18n}', lang.decoraLanguageCode);

        return this.decApi.get(endpoint).pipe(

          map(response => {

            const categories = response.sub;

            const name = this.mountCategorieNameByCode(categories, code);

            return name;

          })

        );

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
