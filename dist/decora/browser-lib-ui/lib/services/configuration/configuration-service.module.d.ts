import { InjectionToken } from '@angular/core';
import { DecConfigurationService } from './configuration.service';
import { HttpClient } from '@angular/common/http';
import { DecConfigurationForRootConfig } from './configuration-service.models';
export declare const DECORA_CONFIGURATION_SERVICE_CONFIG: InjectionToken<DecConfigurationForRootConfig>;
export declare function InitDecConfigurationService(http: HttpClient, serviceConfig: DecConfigurationForRootConfig): DecConfigurationService;
export declare class DecConfigurationModule {
    constructor(parentModule: DecConfigurationModule);
    static forRoot(config: DecConfigurationForRootConfig): {
        ngModule: typeof DecConfigurationModule;
        providers: ({
            provide: InjectionToken<DecConfigurationForRootConfig>;
            useValue: DecConfigurationForRootConfig;
            useFactory?: undefined;
            deps?: undefined;
        } | {
            provide: typeof DecConfigurationService;
            useFactory: typeof InitDecConfigurationService;
            deps: (typeof HttpClient | InjectionToken<DecConfigurationForRootConfig>)[];
            useValue?: undefined;
        })[];
    };
}
