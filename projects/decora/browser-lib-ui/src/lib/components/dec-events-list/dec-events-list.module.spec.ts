import { DecEventsListModule } from './dec-events-list.module';

describe('DecEventsListModule', () => {
  let decEventsListModule: DecEventsListModule;

  beforeEach(() => {
    decEventsListModule = new DecEventsListModule();
  });

  it('should create an instance', () => {
    expect(decEventsListModule).toBeTruthy();
  });
});
