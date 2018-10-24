import { DecJobRoundItemModule } from './dec-job-round-item.module';

describe('DecJobRoundItemModule', () => {
  let decJobRoundItemModule: DecJobRoundItemModule;

  beforeEach(() => {
    decJobRoundItemModule = new DecJobRoundItemModule();
  });

  it('should create an instance', () => {
    expect(decJobRoundItemModule).toBeTruthy();
  });
});
