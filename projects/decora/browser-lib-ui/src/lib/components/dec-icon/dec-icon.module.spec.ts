import { DecIconModule } from './dec-icon.module';

describe('DecIconModule', () => {
  let decIconModule: DecIconModule;

  beforeEach(() => {
    decIconModule = new DecIconModule();
  });

  it('should create an instance', () => {
    expect(decIconModule).toBeTruthy();
  });
});
