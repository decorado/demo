import { AutocompleteTagsModule } from './autocomplete-tags.module';

describe('AutocompleteTagsModule', () => {
  let autocompleteTagsModule: AutocompleteTagsModule;

  beforeEach(() => {
    autocompleteTagsModule = new AutocompleteTagsModule();
  });

  it('should create an instance', () => {
    expect(autocompleteTagsModule).toBeTruthy();
  });
});
