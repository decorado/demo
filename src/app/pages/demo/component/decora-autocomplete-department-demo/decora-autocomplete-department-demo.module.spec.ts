import { DecoraAutocompleteDepartmentDemoModule } from './decora-autocomplete-department-demo.module';

describe('DecoraAutocompleteDepartmentDemoModule', () => {
  let decoraAutocompleteDepartmentDemoModule: DecoraAutocompleteDepartmentDemoModule;

  beforeEach(() => {
    decoraAutocompleteDepartmentDemoModule = new DecoraAutocompleteDepartmentDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteDepartmentDemoModule).toBeTruthy();
  });
});
