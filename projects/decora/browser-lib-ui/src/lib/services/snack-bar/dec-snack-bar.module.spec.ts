import { DecSnackBarModule } from './dec-snack-bar.module';

describe('DecSnackBarModule', () => {
  let decSnackBarModule: DecSnackBarModule;

  beforeEach(() => {
    decSnackBarModule = new DecSnackBarModule();
  });

  it('should create an instance', () => {
    expect(decSnackBarModule).toBeTruthy();
  });
});
