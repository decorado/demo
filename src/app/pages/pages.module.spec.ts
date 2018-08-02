import { PagesModule } from './pages.module';

describe('PagesModule', () => {
  let routesModule: PagesModule;

  beforeEach(() => {
    routesModule = new PagesModule();
  });

  it('should create an instance', () => {
    expect(routesModule).toBeTruthy();
  });
});
