import { BestPracticesModule } from './best-practices.module';

describe('BestPracticesModule', () => {
  let bestPracticesModule: BestPracticesModule;

  beforeEach(() => {
    bestPracticesModule = new BestPracticesModule();
  });

  it('should create an instance', () => {
    expect(bestPracticesModule).toBeTruthy();
  });
});
