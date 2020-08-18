import { AuthenticationService } from '../modules/authentication/authentication.service';

export const CustomInjector = new class {
  protected services: Map<string, Type<any>> = new Map<string, Type<any>>();

  resolve<T>(target: Type<any>): T {
    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const injections = tokens.map(token => CustomInjector.resolve<any>(token));
    return new target(injections);
  }

  set(target: Type<any>) {
    this.services.set(target.name, target);
  }
};

const authenticationService = CustomInjector.resolve<AuthenticationService>(AuthenticationService);
const isValid = authenticationService.validateUser(payload);
