import { DecoraTabsDemoModule } from './decora-tabs-demo.module';

describe('DecoraTabsDemoModule', () => {
  let decoraTabsDemoModule: DecoraTabsDemoModule;

  beforeEach(() => {
    decoraTabsDemoModule = new DecoraTabsDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraTabsDemoModule).toBeTruthy();
  });
});
