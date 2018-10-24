import { DecoraProductInfoDemoModule } from './decora-product-info-demo.module';

describe('DecoraProductInfoDemoModule', () => {
  let decoraProductInfoDemoModule: DecoraProductInfoDemoModule;

  beforeEach(() => {
    decoraProductInfoDemoModule = new DecoraProductInfoDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraProductInfoDemoModule).toBeTruthy();
  });
});
