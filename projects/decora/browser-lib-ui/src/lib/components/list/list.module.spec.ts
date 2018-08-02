import { DecListModule } from './list.module';

describe('DecListModule', () => {
  let listModule: DecListModule;

  beforeEach(() => {
    listModule = new DecListModule();
  });

  it('should create an instance', () => {
    expect(listModule).toBeTruthy();
  });
});
