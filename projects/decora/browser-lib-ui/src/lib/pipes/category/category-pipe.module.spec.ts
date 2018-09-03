import { CategoryPipeModule } from './category-pipe.module';

describe('CategoryPipeModule', () => {
  let categoryPipeModule: CategoryPipeModule;

  beforeEach(() => {
    categoryPipeModule = new CategoryPipeModule();
  });

  it('should create an instance', () => {
    expect(categoryPipeModule).toBeTruthy();
  });
});
