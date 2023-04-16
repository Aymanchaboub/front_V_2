import { TestBed } from '@angular/core/testing';

import { LignecommandeService } from './lignecommande.service';

describe('LignecommandeService', () => {
  let service: LignecommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LignecommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
