import { DecConfirmDialogModule } from './dec-confirm-dialog.module';

describe('DecConfirmDialogModule', () => {
  let decConfirmDialogModule: DecConfirmDialogModule;

  beforeEach(() => {
    decConfirmDialogModule = new DecConfirmDialogModule();
  });

  it('should create an instance', () => {
    expect(decConfirmDialogModule).toBeTruthy();
  });
});
