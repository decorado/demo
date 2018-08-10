import { DecConfigurationService } from './configuration.service';

export const DecConfigurationInitializer = (decConfig: DecConfigurationService) => {
  return () => decConfig.loadConfig();
};
