import { DecProductInfoModule } from './dec-product-info.module';

describe('DecProductInfoModule', () => {
  let decProductInfoModule: DecProductInfoModule;

  beforeEach(() => {
    decProductInfoModule = new DecProductInfoModule();
  });

  it('should create an instance', () => {
    expect(decProductInfoModule).toBeTruthy();
  });
});
