import { DecConfigurationModule } from './configuration-service.module';

describe('DecConfigurationModule', () => {
  let configurationServiceModule: DecConfigurationModule;

  beforeEach(() => {
    configurationServiceModule = new DecConfigurationModule();
  });

  it('should create an instance', () => {
    expect(configurationServiceModule).toBeTruthy();
  });
});
