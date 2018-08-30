import { AutocompleteComplexityModule } from './autocomplete-complexity.module';

describe('AutocompleteComplexityModule', () => {
  let autocompleteComplexityModule: AutocompleteComplexityModule;

  beforeEach(() => {
    autocompleteComplexityModule = new AutocompleteComplexityModule();
  });

  it('should create an instance', () => {
    expect(autocompleteComplexityModule).toBeTruthy();
  });
});
