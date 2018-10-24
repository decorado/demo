import { DecZoomMarksGalleryModule } from './dec-zoom-marks-gallery.module';

describe('DecZoomMarksGalleryModule', () => {
  let decZoomMarksGalleryModule: DecZoomMarksGalleryModule;

  beforeEach(() => {
    decZoomMarksGalleryModule = new DecZoomMarksGalleryModule();
  });

  it('should create an instance', () => {
    expect(decZoomMarksGalleryModule).toBeTruthy();
  });
});
