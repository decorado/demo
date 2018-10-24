import { DialogDemoModule } from './dialog-demo.module';

describe('DialogDemoModule', () => {
  let dialogDemoModule: DialogDemoModule;

  beforeEach(() => {
    dialogDemoModule = new DialogDemoModule();
  });

  it('should create an instance', () => {
    expect(dialogDemoModule).toBeTruthy();
  });
});
