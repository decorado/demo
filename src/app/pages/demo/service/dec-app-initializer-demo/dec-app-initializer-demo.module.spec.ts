import { DecAppInitializerDemoModule } from './dec-app-initializer-demo.module';

describe('DecAppInitializerDemoModule', () => {
  let decAppInitializerDemoModule: DecAppInitializerDemoModule;

  beforeEach(() => {
    decAppInitializerDemoModule = new DecAppInitializerDemoModule();
  });

  it('should create an instance', () => {
    expect(decAppInitializerDemoModule).toBeTruthy();
  });
});
