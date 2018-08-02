import { DecoraWebsocketDemoModule } from './websocket-demo.module';

describe('DecoraWebsocketDemoModule', () => {
  let websocketDemoModule: DecoraWebsocketDemoModule;

  beforeEach(() => {
    websocketDemoModule = new DecoraWebsocketDemoModule();
  });

  it('should create an instance', () => {
    expect(websocketDemoModule).toBeTruthy();
  });
});
