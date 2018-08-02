import { DecoraBreadcrumbDemoModule } from './decora-breadcrumb-demo.module';

describe('DecoraBreadcrumbDemoModule', () => {
  let decoraBreadcrumbDemoModule: DecoraBreadcrumbDemoModule;

  beforeEach(() => {
    decoraBreadcrumbDemoModule = new DecoraBreadcrumbDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraBreadcrumbDemoModule).toBeTruthy();
  });
});
