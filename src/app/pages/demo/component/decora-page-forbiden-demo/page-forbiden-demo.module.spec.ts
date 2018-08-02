import { PageForbidenDemoModule } from './page-forbiden-demo.module';

describe('PageForbidenDemoModule', () => {
  let pageForbidenDemoModule: PageForbidenDemoModule;

  beforeEach(() => {
    pageForbidenDemoModule = new PageForbidenDemoModule();
  });

  it('should create an instance', () => {
    expect(pageForbidenDemoModule).toBeTruthy();
  });
});
