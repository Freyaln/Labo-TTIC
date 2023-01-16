import { TestBed } from '@angular/core/testing';

import { PopestiapiService } from './popestiapi.service';

describe('PopestiapiService', () => {
  let service: PopestiapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopestiapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
