import { HttpClient } from '@angular/common/http';
import { DecConfigurationForRootConfig } from './configuration-service.models';
export declare class DecConfigurationService {
    private http;
    private serviceConfiguration;
    config: any;
    profile: string;
    private _config;
    constructor(http: HttpClient, serviceConfiguration: DecConfigurationForRootConfig);
    loadConfig(): Promise<Object>;
    private isValidProfile(profile, availableProfiles);
}
