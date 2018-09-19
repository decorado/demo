import { DecoraLoaderDemoModule } from './decora-loader-demo.module';

describe('DecoraLoaderDemoModule', () => {
  let decoraLoaderDemoModule: DecoraLoaderDemoModule;

  beforeEach(() => {
    decoraLoaderDemoModule = new DecoraLoaderDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraLoaderDemoModule).toBeTruthy();
  });
});
