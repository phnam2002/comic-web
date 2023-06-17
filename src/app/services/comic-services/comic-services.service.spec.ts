import { TestBed } from '@angular/core/testing';

import { ComicServicesService } from './comic-services.service';

describe('ComicServicesService', () => {
  let service: ComicServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
