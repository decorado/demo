import { DecProductInfoModule } from './dec-product-info.module';

describe('DecProductInfoModule', () => {
  let productInfoModule: DecProductInfoModule;

  beforeEach(() => {
    productInfoModule = new DecProductInfoModule();
  });

  it('should create an instance', () => {
    expect(productInfoModule).toBeTruthy();
  });
});
