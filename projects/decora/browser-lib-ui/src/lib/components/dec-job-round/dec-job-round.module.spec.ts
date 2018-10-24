import { DecJobRoundModule } from './dec-job-round.module';

describe('DecJobRoundModule', () => {
  let decJobRoundModule: DecJobRoundModule;

  beforeEach(() => {
    decJobRoundModule = new DecJobRoundModule();
  });

  it('should create an instance', () => {
    expect(decJobRoundModule).toBeTruthy();
  });
});
