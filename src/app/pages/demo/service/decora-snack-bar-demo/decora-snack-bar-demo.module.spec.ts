import { DecoraSnackBarDemoModule } from './decora-snack-bar-demo.module';

describe('DecoraSnackBarDemoModule', () => {
  let decoraSnackBarDemoModule: DecoraSnackBarDemoModule;

  beforeEach(() => {
    decoraSnackBarDemoModule = new DecoraSnackBarDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraSnackBarDemoModule).toBeTruthy();
  });
});
