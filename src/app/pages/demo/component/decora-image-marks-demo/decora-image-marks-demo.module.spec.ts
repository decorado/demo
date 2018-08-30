import { DecoraImageMarksDemoModule } from './decora-image-marks-demo.module';

describe('DecoraImageMarksDemoModule', () => {
  let decoraImageMarksDemoModule: DecoraImageMarksDemoModule;

  beforeEach(() => {
    decoraImageMarksDemoModule = new DecoraImageMarksDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraImageMarksDemoModule).toBeTruthy();
  });
});
