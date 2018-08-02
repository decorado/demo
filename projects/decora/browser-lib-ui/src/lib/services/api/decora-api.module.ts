import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { ServiceConfig } from './decora-api.model';
import { DecApiService } from './decora-api.service';

export const DECORA_API_SERVICE_CONFIG = new InjectionToken<ServiceConfig>('DECORA_API_SERVICE_CONFIG');

export function InitDecApiService(http: HttpClient, serviceConfig: ServiceConfig) {
  return new DecApiService(http, serviceConfig);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class DecApiModule {
  static forRoot(config: ServiceConfig): ModuleWithProviders {
    return {
      ngModule: DecApiModule,
      providers: [
        { provide: DECORA_API_SERVICE_CONFIG, useValue: config },
        {
          provide: DecApiService,
          useFactory: InitDecApiService,
          deps: [HttpClient, DECORA_API_SERVICE_CONFIG]
        }
      ]
    };
  }
}
