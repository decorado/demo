import { DecApiModule } from './decora-api.module';

describe('DecApiModule', () => {
  let decoraApiModule: DecApiModule;

  beforeEach(() => {
    decoraApiModule = new DecApiModule();
  });

  it('should create an instance', () => {
    expect(decoraApiModule).toBeTruthy();
  });
});
