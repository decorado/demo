import { DecCarouselModule } from './dec-carousel.module';

describe('DecCarouselModule', () => {
  let decCarouselModule: DecCarouselModule;

  beforeEach(() => {
    decCarouselModule = new DecCarouselModule();
  });

  it('should create an instance', () => {
    expect(decCarouselModule).toBeTruthy();
  });
});
