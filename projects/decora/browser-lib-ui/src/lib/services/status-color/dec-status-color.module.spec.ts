import { DecStatusColorModule } from './dec-status-color.module';

describe('DecStatusColorModule', () => {
  let decStatusColorModule: DecStatusColorModule;

  beforeEach(() => {
    decStatusColorModule = new DecStatusColorModule();
  });

  it('should create an instance', () => {
    expect(decStatusColorModule).toBeTruthy();
  });
});
