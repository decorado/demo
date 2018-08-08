import { HttpClient } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { DecSnackBarService } from './../snack-bar/dec-snack-bar.service';
import { ServiceConfig } from './decora-api.model';
import { DecApiService } from './decora-api.service';
export declare const DECORA_API_SERVICE_CONFIG: InjectionToken<ServiceConfig>;
export declare function InitDecApiService(http: HttpClient, snackbar: DecSnackBarService, serviceConfig: ServiceConfig): DecApiService;
export declare class DecApiModule {
    static forRoot(config: ServiceConfig): ModuleWithProviders;
}
