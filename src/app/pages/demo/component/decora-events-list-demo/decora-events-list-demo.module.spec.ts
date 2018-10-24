import { DecoraEventsListDemoModule } from './decora-events-list-demo.module';

describe('DecoraEventsListDemoModule', () => {
  let decoraEventsListDemoModule: DecoraEventsListDemoModule;

  beforeEach(() => {
    decoraEventsListDemoModule = new DecoraEventsListDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraEventsListDemoModule).toBeTruthy();
  });
});
