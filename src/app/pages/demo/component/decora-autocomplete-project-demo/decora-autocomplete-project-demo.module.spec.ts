import { DecoraAutocompleteProjectDemoModule } from './decora-autocomplete-project-demo.module';

describe('DecoraAutocompleteProjectDemoModule', () => {
  let decoraAutocompleteProjectDemoModule: DecoraAutocompleteProjectDemoModule;

  beforeEach(() => {
    decoraAutocompleteProjectDemoModule = new DecoraAutocompleteProjectDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteProjectDemoModule).toBeTruthy();
  });
});
