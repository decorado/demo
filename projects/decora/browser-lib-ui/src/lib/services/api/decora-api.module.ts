import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DecSnackBarModule } from './../snack-bar/dec-snack-bar.module';
import { DecConfigurationModule } from './../configuration/configuration-service.module';
import { DecApiService } from './decora-api.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DecSnackBarModule,
    DecConfigurationModule,
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
