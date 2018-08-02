import { DecoraStepsListDemoModule } from './decora-steps-list-demo.module';

describe('DecoraStepsListDemoModule', () => {
  let decoraStepsListDemoModule: DecoraStepsListDemoModule;

  beforeEach(() => {
    decoraStepsListDemoModule = new DecoraStepsListDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraStepsListDemoModule).toBeTruthy();
  });
});
