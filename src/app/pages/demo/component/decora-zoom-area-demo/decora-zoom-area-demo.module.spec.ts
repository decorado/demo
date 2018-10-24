import { DecoraZoomAreaDemoModule } from './decora-zoom-area-demo.module';

describe('DecoraZoomAreaDemoModule', () => {
  let decoraZoomAreaDemoModule: DecoraZoomAreaDemoModule;

  beforeEach(() => {
    decoraZoomAreaDemoModule = new DecoraZoomAreaDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraZoomAreaDemoModule).toBeTruthy();
  });
});
