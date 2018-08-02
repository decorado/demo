import { DecoraImageDemoModule } from './decora-image-demo.module';

describe('DecoraImageDemoModule', () => {
  let decoraImageDemoModule: DecoraImageDemoModule;

  beforeEach(() => {
    decoraImageDemoModule = new DecoraImageDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraImageDemoModule).toBeTruthy();
  });
});
