import { DecGalleryMarksModule } from './dec-gallery-marks.module';

describe('DecGalleryMarksModule', () => {
  let decGalleryMarksModule: DecGalleryMarksModule;

  beforeEach(() => {
    decGalleryMarksModule = new DecGalleryMarksModule();
  });

  it('should create an instance', () => {
    expect(decGalleryMarksModule).toBeTruthy();
  });
});
