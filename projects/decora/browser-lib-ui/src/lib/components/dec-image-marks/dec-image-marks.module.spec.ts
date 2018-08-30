import { DecImageMarksModule } from './dec-image-marks.module';

describe('DecImageMarksModule', () => {
  let decImageMarksModule: DecImageMarksModule;

  beforeEach(() => {
    decImageMarksModule = new DecImageMarksModule();
  });

  it('should create an instance', () => {
    expect(decImageMarksModule).toBeTruthy();
  });
});
