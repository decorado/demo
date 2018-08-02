import { DecoraUploadDemoModule } from './decora-upload-demo.module';

describe('DecoraUploadDemoModule', () => {
  let decoraUploadDemoModule: DecoraUploadDemoModule;

  beforeEach(() => {
    decoraUploadDemoModule = new DecoraUploadDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraUploadDemoModule).toBeTruthy();
  });
});
