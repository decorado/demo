import { DecoraDatePickerDemoModule } from './decora-date-picker-demo.module';

describe('DecoraDatePickerDemoModule', () => {
  let decoraDatePickerDemoModule: DecoraDatePickerDemoModule;

  beforeEach(() => {
    decoraDatePickerDemoModule = new DecoraDatePickerDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraDatePickerDemoModule).toBeTruthy();
  });
});
