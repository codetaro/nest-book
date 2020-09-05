import { WsAuthentication.GatewayMiddleware } from './ws-authentication.gateway.middleware';

describe('WsAuthentication.GatewayMiddleware', () => {
  it('should be defined', () => {
    expect(new WsAuthentication.GatewayMiddleware()).toBeDefined();
  });
});
