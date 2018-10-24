import { DecoraCarouselDemoModule } from './decora-carousel-demo.module';

describe('DecoraCarouselDemoModule', () => {
  let decoraCarouselDemoModule: DecoraCarouselDemoModule;

  beforeEach(() => {
    decoraCarouselDemoModule = new DecoraCarouselDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraCarouselDemoModule).toBeTruthy();
  });
});
