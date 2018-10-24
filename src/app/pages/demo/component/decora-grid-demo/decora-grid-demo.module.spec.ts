import { DecoraGridDemoModule } from './decora-grid-demo.module';

describe('DecoraGridDemoModule', () => {
  let decoraGridDemoModule: DecoraGridDemoModule;

  beforeEach(() => {
    decoraGridDemoModule = new DecoraGridDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraGridDemoModule).toBeTruthy();
  });
});
