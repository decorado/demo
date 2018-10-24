import { DecDialogModule } from './dec-dialog.module';

describe('DecDialogModule', () => {
  let decDialogModule: DecDialogModule;

  beforeEach(() => {
    decDialogModule = new DecDialogModule();
  });

  it('should create an instance', () => {
    expect(decDialogModule).toBeTruthy();
  });
});
