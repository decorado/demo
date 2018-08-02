import { ObjectSortModule } from './object-sort.module';

describe('ObjectSortModule', () => {
  let objectSortModule: ObjectSortModule;

  beforeEach(() => {
    objectSortModule = new ObjectSortModule();
  });

  it('should create an instance', () => {
    expect(objectSortModule).toBeTruthy();
  });
});
