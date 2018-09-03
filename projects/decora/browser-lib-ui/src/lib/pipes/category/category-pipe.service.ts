import { Injectable } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const CATEGORY_ENDPOINT = '/legacy/product/category?language={i18n}';

@Injectable()
export class CategoryPipeService {

  constructor(private decApi: DecApiService) { }

  get = (code) => {
    if (code && code.length > 0) {
      const codes = code.toUpperCase().split('');
      return this.getData().pipe(
        map(data => {

          let category = '';

          let map = data.sub;
          for (let i in codes) {
            if (category.length > 0) {
              category += ' > ';
            }

            if (map[codes[i]]) {

              category += map[codes[i]].name;
              if (map[codes[i]].sub) {
                map = map[codes[i]].sub;
              }

            } else {
              category += 'INVALID';
            }

          }
          return category;
        })
      );
    }

    return this.getData()
      .pipe(
        map(data => {

          const category = '';
          return category;
        })
      );
  }

  formatI18n(i18n) {
    switch (i18n) {
      case 'PT_BR':
        return 'pt-br';
      case 'EN':
        return 'en';
    }
  }

  private getData() {
    const user = this.decApi.user;
    const endpoint = CATEGORY_ENDPOINT.replace('{i18n}', this.formatI18n(user.i18n));
    return this.decApi.get(endpoint);
  }
}
