import { CheckLoggedInUserGuard } from './check-logged-in-user.guard';

describe('CheckLoggedInUserGuard', () => {
  it('should be defined', () => {
    expect(new CheckLoggedInUserGuard()).toBeDefined();
  });
});
