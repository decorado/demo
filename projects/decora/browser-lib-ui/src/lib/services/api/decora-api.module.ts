import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DecApiService } from './decora-api.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    DecApiService,
  ]
})
export class DecApiModule {
  constructor(@Optional() @SkipSelf() parentModule: DecApiModule) {
    if (parentModule) {
      throw new Error(
        'DecApiModule is already loaded. Import it in the AppModule only');
    }
  }
}
