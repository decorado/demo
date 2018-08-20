import { DecImageZoomModule } from './dec-image-zoom.module';

describe('DecImageZoomModule', () => {
  let decImageZoomModule: DecImageZoomModule;

  beforeEach(() => {
    decImageZoomModule = new DecImageZoomModule();
  });

  it('should create an instance', () => {
    expect(decImageZoomModule).toBeTruthy();
  });
});
