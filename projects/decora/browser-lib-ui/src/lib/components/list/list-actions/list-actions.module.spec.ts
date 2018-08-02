import { DecListActionsModule } from './list-actions.module';

describe('DecListActionsModule', () => {
  let listActionsModule: DecListActionsModule;

  beforeEach(() => {
    listActionsModule = new DecListActionsModule();
  });

  it('should create an instance', () => {
    expect(listActionsModule).toBeTruthy();
  });
});
