import { DecLoaderModule } from './dec-loader.module';

describe('DecLoaderModule', () => {
  let decLoaderModule: DecLoaderModule;

  beforeEach(() => {
    decLoaderModule = new DecLoaderModule();
  });

  it('should create an instance', () => {
    expect(decLoaderModule).toBeTruthy();
  });
});
