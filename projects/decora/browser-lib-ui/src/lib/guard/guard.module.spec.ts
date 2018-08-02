import { GuardModule } from './guard.module';

describe('GuardModule', () => {
  let guardModule: GuardModule;

  beforeEach(() => {
    guardModule = new GuardModule();
  });

  it('should create an instance', () => {
    expect(guardModule).toBeTruthy();
  });
});
