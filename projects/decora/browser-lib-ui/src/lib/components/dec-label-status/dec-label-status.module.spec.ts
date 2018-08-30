import { DecLabelStatusModule } from './dec-label-status.module';

describe('DecLabelStatusModule', () => {
  let decLabelStatusModule: DecLabelStatusModule;

  beforeEach(() => {
    decLabelStatusModule = new DecLabelStatusModule();
  });

  it('should create an instance', () => {
    expect(decLabelStatusModule).toBeTruthy();
  });
});
