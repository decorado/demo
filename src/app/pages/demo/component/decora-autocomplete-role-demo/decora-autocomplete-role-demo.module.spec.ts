import { DecoraAutocompleteRoleDemoModule } from './decora-autocomplete-role-demo.module';

describe('DecoraAutocompleteRoleDemoModule', () => {
  let decoraAutocompleteRoleDemoModule: DecoraAutocompleteRoleDemoModule;

  beforeEach(() => {
    decoraAutocompleteRoleDemoModule = new DecoraAutocompleteRoleDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteRoleDemoModule).toBeTruthy();
  });
});
