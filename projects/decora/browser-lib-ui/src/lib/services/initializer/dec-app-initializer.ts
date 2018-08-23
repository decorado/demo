import { DecApiService } from './../api/decora-api.service';
import { DecConfigurationService } from './../configuration/configuration.service';

export const DecAppInitializer = (decConfig: DecConfigurationService, decApi: DecApiService) => {

  return () => {

    return new Promise((resolve, reject) => {

      decConfig.loadConfig().then((configuration) => {

        console.log('CONFIGURATION LOADED');

        decApi.handShake().then((account) => {

          console.log('API HANDSHAKE');

          resolve({
            configuration,
            account,
          });

        });

      });

    });

  };

};
