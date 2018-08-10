import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@env/environment';

const TRANSLATION_PATH = `${environment.basePath}/assets/i18n/messages.`;

// ************************ //
// translate http file load //
// ************************ //

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, TRANSLATION_PATH, '.json');
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
    })
  ],
  exports: [ TranslateModule ]
})
export class DecoraTranslateModule {
  constructor(@Optional() @SkipSelf() parentModule: DecoraTranslateModule) {
    if (parentModule) {
      throw new Error('DecoraTranslateModule is already loaded. Import it in the AppModule only');
    }
  }
}
