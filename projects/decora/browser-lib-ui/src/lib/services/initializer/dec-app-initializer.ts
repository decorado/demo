import { DecApiService } from './../api/decora-api.service';
import { DecConfigurationService } from './../configuration/configuration.service';

export const DecAppInitializer = (decConfig: DecConfigurationService, decApi: DecApiService) => {

  return () => {

    return new Promise((resolve, reject) => {

      decConfig.loadConfig().then((configuration) => {

        decApi.handShake().then((account) => {

          resolve({
            configuration,
            account,
          });

        }, (err) => {

          resolve({
            configuration,
            account: undefined,
          });

        });

      });

    });

  };

};
