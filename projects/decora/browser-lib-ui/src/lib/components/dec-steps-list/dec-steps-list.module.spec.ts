import { DecStepsListModule } from './dec-steps-list.module';

describe('DecStepsListModule', () => {
  let decStepsListModule: DecStepsListModule;

  beforeEach(() => {
    decStepsListModule = new DecStepsListModule();
  });

  it('should create an instance', () => {
    expect(decStepsListModule).toBeTruthy();
  });
});
