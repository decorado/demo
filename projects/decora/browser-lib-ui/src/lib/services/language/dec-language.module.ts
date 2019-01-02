import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecLanguageService } from './dec-language.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [DecLanguageService]
})
export class DecLanguageModule {
  constructor(@Optional() @SkipSelf() parentModule: DecLanguageModule) {
    if (parentModule) {
      throw new Error(
        'DecLanguageModule is already loaded. Import it in the AppModule only');
    }
  }
}
