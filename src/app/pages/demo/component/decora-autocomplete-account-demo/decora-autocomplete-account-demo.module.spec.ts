import { DecoraAutocompleteAccountDemoModule } from './decora-autocomplete-account-demo.module';

describe('DecoraAutocompleteAccountDemoModule', () => {
  let decoraAutocompleteAccountDemoModule: DecoraAutocompleteAccountDemoModule;

  beforeEach(() => {
    decoraAutocompleteAccountDemoModule = new DecoraAutocompleteAccountDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteAccountDemoModule).toBeTruthy();
  });
});
