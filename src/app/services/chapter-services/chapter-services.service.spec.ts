import { TestBed } from '@angular/core/testing';

import { ChapterServicesService } from './chapter-services.service';

describe('ChapterServicesService', () => {
  let service: ChapterServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
