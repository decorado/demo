import { DecJobRoundModule } from './dec-job-round.module';

describe('DecJobRoundModule', () => {
  let decjobRoundModule: DecJobRoundModule;

  beforeEach(() => {
    decjobRoundModule = new DecJobRoundModule();
  });

  it('should create an instance', () => {
    expect(decjobRoundModule).toBeTruthy();
  });
});
