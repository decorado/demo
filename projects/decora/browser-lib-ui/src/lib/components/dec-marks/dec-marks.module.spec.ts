import { DecMarksModule } from './dec-marks.module';

describe('DecMarksModule', () => {
  let decMarksModule: DecMarksModule;

  beforeEach(() => {
    decMarksModule = new DecMarksModule();
  });

  it('should create an instance', () => {
    expect(decMarksModule).toBeTruthy();
  });
});
