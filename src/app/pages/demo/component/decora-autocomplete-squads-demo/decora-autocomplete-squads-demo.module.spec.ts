import { DecoraAutocompleteSquadsDemoModule } from './decora-autocomplete-squads-demo.module';

describe('DecoraAutocompleteSquadsDemoModule', () => {
  let decoraAutocompleteSquadsDemoModule: DecoraAutocompleteSquadsDemoModule;

  beforeEach(() => {
    decoraAutocompleteSquadsDemoModule = new DecoraAutocompleteSquadsDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteSquadsDemoModule).toBeTruthy();
  });
});
