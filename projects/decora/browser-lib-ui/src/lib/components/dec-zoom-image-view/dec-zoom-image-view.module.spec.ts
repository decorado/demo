import { DecZoomImageViewModule } from './dec-zoom-image-view.module';

describe('DecZoomImageViewModule', () => {
  let decZoomImageViewModule: DecZoomImageViewModule;

  beforeEach(() => {
    decZoomImageViewModule = new DecZoomImageViewModule();
  });

  it('should create an instance', () => {
    expect(decZoomImageViewModule).toBeTruthy();
  });
});
