import { ComponentStylesModule } from './component-styles.module';

describe('ComponentStylesModule', () => {
  let componentStylesModule: ComponentStylesModule;

  beforeEach(() => {
    componentStylesModule = new ComponentStylesModule();
  });

  it('should create an instance', () => {
    expect(componentStylesModule).toBeTruthy();
  });
});
