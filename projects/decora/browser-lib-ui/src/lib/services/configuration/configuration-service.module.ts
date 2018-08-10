import { NgModule, InjectionToken, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecConfigurationService } from './configuration.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DecConfigurationForRootConfig } from './configuration-service.models';

export const DECORA_CONFIGURATION_SERVICE_CONFIG = new InjectionToken<DecConfigurationForRootConfig>('DECORA_CONFIGURATION_SERVICE_CONFIG');

export function InitDecConfigurationService(http: HttpClient, serviceConfig: DecConfigurationForRootConfig) {
  return new DecConfigurationService(http, serviceConfig);
}
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ]
})
export class DecConfigurationModule {

  constructor(@Optional() @SkipSelf() parentModule: DecConfigurationModule) {
    if (parentModule) {
      throw new Error('DecConfigurationModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: DecConfigurationForRootConfig) {

    return {
      ngModule: DecConfigurationModule,
      providers: [
        { provide: DECORA_CONFIGURATION_SERVICE_CONFIG, useValue: config },
        {
          provide: DecConfigurationService,
          useFactory: InitDecConfigurationService,
          deps: [HttpClient, DECORA_CONFIGURATION_SERVICE_CONFIG]
        }
      ]
    };

  }

}
