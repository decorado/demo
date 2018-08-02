import { DecSpinnerModule } from './dec-spinner.module';

describe('DecSpinnerModule', () => {
  let decSpinnerModule: DecSpinnerModule;

  beforeEach(() => {
    decSpinnerModule = new DecSpinnerModule();
  });

  it('should create an instance', () => {
    expect(decSpinnerModule).toBeTruthy();
  });
});
