import { DecStatusJobRoundItemModule } from './dec-status-job-round-item.module';

describe('DecStatusJobRoundItemModule', () => {
  let decStatusJobRoundItemModule: DecStatusJobRoundItemModule;

  beforeEach(() => {
    decStatusJobRoundItemModule = new DecStatusJobRoundItemModule();
  });

  it('should create an instance', () => {
    expect(decStatusJobRoundItemModule).toBeTruthy();
  });
});
