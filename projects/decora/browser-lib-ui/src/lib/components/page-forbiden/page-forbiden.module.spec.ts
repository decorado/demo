import { DecPageForbidenModule } from './page-forbiden.module';

describe('DecPageForbidenModule', () => {
  let pageForbidenModule: DecPageForbidenModule;

  beforeEach(() => {
    pageForbidenModule = new DecPageForbidenModule();
  });

  it('should create an instance', () => {
    expect(pageForbidenModule).toBeTruthy();
  });
});
