const controllers = new Map<string, BaseController>;

export class BaseController {
  constructor(args = {}) { }
}

export const controller = <T extends BaseController>(
  ControllerClass: new (...args: any[]) => T
): T => {
  const ControllerClassName = ControllerClass.name;
  let controller = controllers.get(ControllerClassName);

  if (!controller) {
    controller = new ControllerClass();
    controllers.set(ControllerClassName, controller);
  }

  if (!controller) {
    throw Error(`Unable to create service for class ${ControllerClassName}`);
  }

  return controller as T;
}