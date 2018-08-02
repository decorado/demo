import { DecoraSnackBarDemoRoutingModule } from './decora-snack-bar-demo-routing.module';

describe('DecoraSnackBarDemoRoutingModule', () => {
  let decoraSnackBarDemoRoutingModule: DecoraSnackBarDemoRoutingModule;

  beforeEach(() => {
    decoraSnackBarDemoRoutingModule = new DecoraSnackBarDemoRoutingModule();
  });

  it('should create an instance', () => {
    expect(decoraSnackBarDemoRoutingModule).toBeTruthy();
  });
});
