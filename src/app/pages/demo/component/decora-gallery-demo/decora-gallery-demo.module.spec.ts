import { DecoraGalleryDemoModule } from './decora-gallery-demo.module';

describe('DecoraGalleryDemoModule', () => {
  let decoraGalleryDemoModule: DecoraGalleryDemoModule;

  beforeEach(() => {
    decoraGalleryDemoModule = new DecoraGalleryDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraGalleryDemoModule).toBeTruthy();
  });
});
