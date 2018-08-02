import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { DecoraMissingTranslationHandler } from './missing-translation-handler/dec-missing-translation-handler';
import { environment } from '@env/environment';

// ************************ //
// translate http file load //
// ************************ //

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.active.host + '/assets/i18n/messages.', '.json');
}

// **** //
// i18n //
// **** //

export function getLanguage() {
  return environment.active.defaultLang;
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      // missingTranslationHandler: {provide: MissingTranslationHandler, useClass: DecoraMissingTranslationHandler}
    })
  ],
  providers: [
    { provide: LOCALE_ID, useFactory: getLanguage}
  ],
  exports: [ TranslateModule ]
})
export class DecoraTranslateModule {
  constructor() {
  }
}
