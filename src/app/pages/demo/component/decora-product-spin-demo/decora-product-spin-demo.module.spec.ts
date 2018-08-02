import { DecoraProductSpinDemoModule } from './decora-product-spin-demo.module';

describe('DecoraProductSpinDemoModule', () => {
  let decoraProductSpinDemoModule: DecoraProductSpinDemoModule;

  beforeEach(() => {
    decoraProductSpinDemoModule = new DecoraProductSpinDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraProductSpinDemoModule).toBeTruthy();
  });
});
