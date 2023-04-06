import { TestBed } from '@angular/core/testing';

import { SousCategoriesService } from './sous-categories.service';

describe('SousCategoriesService', () => {
  let service: SousCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SousCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
