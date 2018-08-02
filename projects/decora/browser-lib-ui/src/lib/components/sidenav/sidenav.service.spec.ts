import { TestBed, inject } from '@angular/core/testing';

import { DecSidenavService } from './sidenav.service';

describe('DecSidenavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecSidenavService]
    });
  });

  it('should be created', inject([DecSidenavService], (service: DecSidenavService) => {
    expect(service).toBeTruthy();
  }));
});
