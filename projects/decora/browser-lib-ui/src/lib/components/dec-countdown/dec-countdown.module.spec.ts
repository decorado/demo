import { DecCountdownModule } from './dec-countdown.module';

describe('DecCountdownModule', () => {
  let decCountdownModule: DecCountdownModule;

  beforeEach(() => {
    decCountdownModule = new DecCountdownModule();
  });

  it('should create an instance', () => {
    expect(decCountdownModule).toBeTruthy();
  });
});
