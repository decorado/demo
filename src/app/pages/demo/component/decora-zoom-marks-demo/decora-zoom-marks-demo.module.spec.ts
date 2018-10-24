import { DecoraZoomMarksDemoModule } from './decora-zoom-marks-demo.module';

describe('DecoraZoomMarksDemoModule', () => {
  let decoraZoomMarksDemoModule: DecoraZoomMarksDemoModule;

  beforeEach(() => {
    decoraZoomMarksDemoModule = new DecoraZoomMarksDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraZoomMarksDemoModule).toBeTruthy();
  });
});
