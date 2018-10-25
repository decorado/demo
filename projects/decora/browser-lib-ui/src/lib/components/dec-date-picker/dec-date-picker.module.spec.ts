import { DecDatePickerModule } from './dec-date-picker.module';

describe('DecDatePickerModule', () => {
  let decDatePickerModule: DecDatePickerModule;

  beforeEach(() => {
    decDatePickerModule = new DecDatePickerModule();
  });

  it('should create an instance', () => {
    expect(decDatePickerModule).toBeTruthy();
  });
});
