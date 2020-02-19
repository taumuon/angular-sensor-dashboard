import { TestBed } from '@angular/core/testing';

import { HubStreamSubscriptionService } from './hub-stream-subscription.service';

describe('HubStreamSubscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HubStreamSubscriptionService = TestBed.get(HubStreamSubscriptionService);
    expect(service).toBeTruthy();
  });
});
