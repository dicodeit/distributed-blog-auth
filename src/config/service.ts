const services = new Map<string, BaseService>

export class BaseService {
  constructor(args = {}) { }
}

export const service = <T extends BaseService>(
  ServiceClass: new (...args: any[]) => T
): T => {
  const ServiceClassName = ServiceClass.name;
  let service = services.get(ServiceClassName);

  if (!service) {
    service = new ServiceClass();
    services.set(ServiceClassName, service);
  }

  if (!service) {
    throw Error(`Unable to create service for class ${ServiceClassName}`);
  }

  return service as T;
}