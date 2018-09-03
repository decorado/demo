import { DecoraCategoryDemoModule } from './decora-category-demo.module';

describe('DecoraCategoryDemoModule', () => {
  let decoraCategoryDemoModule: DecoraCategoryDemoModule;

  beforeEach(() => {
    decoraCategoryDemoModule = new DecoraCategoryDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraCategoryDemoModule).toBeTruthy();
  });
});
