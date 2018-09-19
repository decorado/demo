import { TestBed, inject } from '@angular/core/testing';

import { DecLoaderService } from './dec-loader.service';

describe('DecLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecLoaderService]
    });
  });

  it('should be created', inject([DecLoaderService], (service: DecLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
