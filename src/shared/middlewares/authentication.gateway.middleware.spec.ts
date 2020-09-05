import { AuthenticationGatewayMiddleware } from './authentication.gateway.middleware';

describe('AuthenticationGatewayMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthenticationGatewayMiddleware()).toBeDefined();
  });
});
