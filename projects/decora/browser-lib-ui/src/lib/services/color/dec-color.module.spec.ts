import { DecColorServiceModule } from './dec-color-service.module';

describe('DecColorServiceModule', () => {
  let decColorModule: DecColorServiceModule;

  beforeEach(() => {
    decColorModule = new DecColorServiceModule();
  });

  it('should create an instance', () => {
    expect(decColorModule).toBeTruthy();
  });
});
