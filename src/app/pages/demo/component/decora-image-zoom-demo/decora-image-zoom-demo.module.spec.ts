import { DecoraImageZoomDemoModule } from './decora-image-zoom-demo.module';

describe('DecoraImageZoomDemoModule', () => {
  let decoraImageZoomDemoModule: DecoraImageZoomDemoModule;

  beforeEach(() => {
    decoraImageZoomDemoModule = new DecoraImageZoomDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraImageZoomDemoModule).toBeTruthy();
  });
});
