import { DecStatusJobRoundModule } from './dec-status-job-round.module';

describe('DecJobRoundModule', () => {
  let decJobRoundModule: DecStatusJobRoundModule;

  beforeEach(() => {
    decJobRoundModule = new DecStatusJobRoundModule();
  });

  it('should create an instance', () => {
    expect(decJobRoundModule).toBeTruthy();
  });
});
