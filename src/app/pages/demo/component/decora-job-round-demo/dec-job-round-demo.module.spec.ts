import { DecJobRoundDemoModule } from './dec-job-round-demo.module';

describe('DecJobRoundDemoModule', () => {
  let decJobRoundDemoModule: DecJobRoundDemoModule;

  beforeEach(() => {
    decJobRoundDemoModule = new DecJobRoundDemoModule();
  });

  it('should create an instance', () => {
    expect(decJobRoundDemoModule).toBeTruthy();
  });
});
