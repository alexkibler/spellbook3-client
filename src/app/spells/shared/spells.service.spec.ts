import { TestBed, inject } from '@angular/core/testing';

import { SpellsService } from './spells.service';

describe('SpellsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpellsService]
    });
  });

  it('should ...', inject([SpellsService], (service: SpellsService) => {
    expect(service).toBeTruthy();
  }));
});
