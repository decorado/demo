import { DecProductSpinModule } from './product-spin.module';

describe('ProductSpinSpinnerModule', () => {
  let productSpinSpinnerModule: DecProductSpinModule;

  beforeEach(() => {
    productSpinSpinnerModule = new DecProductSpinModule();
  });

  it('should create an instance', () => {
    expect(productSpinSpinnerModule).toBeTruthy();
  });
});
