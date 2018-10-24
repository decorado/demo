import { ConfirmDialogDemoModule } from './confirm-dialog-demo.module';

describe('ConfirmDialogDemoModule', () => {
  let confirmDialogDemoModule: ConfirmDialogDemoModule;

  beforeEach(() => {
    confirmDialogDemoModule = new ConfirmDialogDemoModule();
  });

  it('should create an instance', () => {
    expect(confirmDialogDemoModule).toBeTruthy();
  });
});
