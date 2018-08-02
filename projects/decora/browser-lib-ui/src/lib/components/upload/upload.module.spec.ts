import { DecUploadModule } from './upload.module';

describe('DecUploadModule', () => {
  let uploadModule: DecUploadModule;

  beforeEach(() => {
    uploadModule = new DecUploadModule();
  });

  it('should create an instance', () => {
    expect(uploadModule).toBeTruthy();
  });
});
