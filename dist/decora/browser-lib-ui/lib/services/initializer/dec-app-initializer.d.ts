import { DecApiService } from './../api/decora-api.service';
import { DecConfigurationService } from './../configuration/configuration.service';
export declare const DecAppInitializer: (decConfig: DecConfigurationService, decApi: DecApiService) => () => Promise<{}>;
