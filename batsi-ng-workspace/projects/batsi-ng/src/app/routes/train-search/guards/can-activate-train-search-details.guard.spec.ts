import { TestBed } from '@angular/core/testing';

import { CanActivateTrainSearchDetailsGuard } from './can-activate-train-search-details.guard';

describe('CanActivateTrainSearchDetailsGuard', () => {
  let guard: CanActivateTrainSearchDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateTrainSearchDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
