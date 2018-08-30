import { TestBed, inject } from '@angular/core/testing';

import { DecSketchfabService } from './dec-sketchfab.service';

describe('DecSketchfabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecSketchfabService]
    });
  });

  it('should be created', inject([DecSketchfabService], (service: DecSketchfabService) => {
    expect(service).toBeTruthy();
  }));
});
