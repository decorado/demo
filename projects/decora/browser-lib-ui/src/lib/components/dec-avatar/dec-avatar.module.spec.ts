import { DecAvatarModule } from './dec-avatar.module';

describe('DecAvatarModule', () => {
  let decAvatarModule: DecAvatarModule;

  beforeEach(() => {
    decAvatarModule = new DecAvatarModule();
  });

  it('should create an instance', () => {
    expect(decAvatarModule).toBeTruthy();
  });
});
