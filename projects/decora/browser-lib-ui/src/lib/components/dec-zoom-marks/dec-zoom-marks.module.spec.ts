import { DecZoomMarksModule } from './dec-zoom-marks.module';

describe('DecZoomMarksModule', () => {
  let decZoomMarksModule: DecZoomMarksModule;

  beforeEach(() => {
    decZoomMarksModule = new DecZoomMarksModule();
  });

  it('should create an instance', () => {
    expect(decZoomMarksModule).toBeTruthy();
  });
});
