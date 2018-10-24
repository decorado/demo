import { TestBed, inject } from '@angular/core/testing';

import { DecColorService } from './dec-color.service';

describe('DecColorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecColorService]
    });
  });

  it('should be created', inject([DecColorService], (service: DecColorService) => {
    expect(service).toBeTruthy();
  }));
});
