import { DecScriptLoaderModule } from './dec-script-loader.module';

describe('DecScriptLoaderModule', () => {
  let decScriptLoaderModule: DecScriptLoaderModule;

  beforeEach(() => {
    decScriptLoaderModule = new DecScriptLoaderModule();
  });

  it('should create an instance', () => {
    expect(decScriptLoaderModule).toBeTruthy();
  });
});
