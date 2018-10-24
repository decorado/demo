import { DecGridModule } from './dec-grid.module';

describe('DecGridModule', () => {
  let decGridModule: DecGridModule;

  beforeEach(() => {
    decGridModule = new DecGridModule();
  });

  it('should create an instance', () => {
    expect(decGridModule).toBeTruthy();
  });
});
