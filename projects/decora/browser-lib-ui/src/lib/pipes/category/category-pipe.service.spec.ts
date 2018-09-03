import { TestBed, inject } from '@angular/core/testing';

import { CategoryPipeService } from './category-pipe.service';

describe('CategoryPipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryPipeService]
    });
  });

  it('should be created', inject([CategoryPipeService], (service: CategoryPipeService) => {
    expect(service).toBeTruthy();
  }));
});
