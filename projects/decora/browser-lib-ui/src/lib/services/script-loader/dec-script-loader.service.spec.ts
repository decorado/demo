import { TestBed, inject } from '@angular/core/testing';

import { DecScriptLoaderService } from './dec-script-loader.service';

describe('DecScriptLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecScriptLoaderService]
    });
  });

  it('should be created', inject([DecScriptLoaderService], (service: DecScriptLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
