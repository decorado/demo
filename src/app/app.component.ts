import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DecLanguageService } from '@projects/decora/browser-lib-ui/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  initialized: boolean;

  constructor(
    private translate: TranslateService,
    private langService: DecLanguageService,
  ) {
    this.startTranslationService();
  }

  private startTranslationService() {
    this.langService.lang$.subscribe(lang => {
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang(lang.decoraLanguageCode);
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use(lang.decoraLanguageCode);
    });
  }
}
