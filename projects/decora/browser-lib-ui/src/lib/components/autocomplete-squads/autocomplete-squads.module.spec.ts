import { AutocompleteSquadsModule } from './autocomplete-squads.module';

describe('AutocompleteSquadsModule', () => {
  let autocompleteSquadsModule: AutocompleteSquadsModule;

  beforeEach(() => {
    autocompleteSquadsModule = new AutocompleteSquadsModule();
  });

  it('should create an instance', () => {
    expect(autocompleteSquadsModule).toBeTruthy();
  });
});
