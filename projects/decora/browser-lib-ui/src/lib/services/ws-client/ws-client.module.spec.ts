import { DecWsClientModule } from './ws-client.module';

describe('DecWsClientModule', () => {
  let wsClientModule: DecWsClientModule;

  beforeEach(() => {
    wsClientModule = new DecWsClientModule();
  });

  it('should create an instance', () => {
    expect(wsClientModule).toBeTruthy();
  });
});
