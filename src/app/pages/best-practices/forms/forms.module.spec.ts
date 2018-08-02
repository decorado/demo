import { FormsBestPracticesModule } from './forms.module';

describe('FormsBestPracticesModule', () => {
  let formsModule: FormsBestPracticesModule;

  beforeEach(() => {
    formsModule = new FormsBestPracticesModule();
  });

  it('should create an instance', () => {
    expect(formsModule).toBeTruthy();
  });
});
