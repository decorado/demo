import { DecPageNotFoundModule } from './page-not-found.module';

describe('DecPageNotFoundModule', () => {
  let pageNotFoundModule: DecPageNotFoundModule;

  beforeEach(() => {
    pageNotFoundModule = new DecPageNotFoundModule();
  });

  it('should create an instance', () => {
    expect(pageNotFoundModule).toBeTruthy();
  });
});
