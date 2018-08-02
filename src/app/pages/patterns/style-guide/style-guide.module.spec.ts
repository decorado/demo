import { StyleGuideModule } from './style-guide.module';

describe('StyleGuideModule', () => {
  let styleGuideModule: StyleGuideModule;

  beforeEach(() => {
    styleGuideModule = new StyleGuideModule();
  });

  it('should create an instance', () => {
    expect(styleGuideModule).toBeTruthy();
  });
});
