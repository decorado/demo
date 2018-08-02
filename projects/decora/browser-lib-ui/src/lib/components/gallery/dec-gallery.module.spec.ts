import { DecGalleryModule } from './dec-gallery.module';

describe('DecGalleryModule', () => {
  let decGalleryModule: DecGalleryModule;

  beforeEach(() => {
    decGalleryModule = new DecGalleryModule();
  });

  it('should create an instance', () => {
    expect(decGalleryModule).toBeTruthy();
  });
});
