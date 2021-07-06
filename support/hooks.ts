import { AsyncFunc, Func, HookFunction } from 'mocha';
interface MochaGlobals {
    before: HookFunction;
    after: HookFunction;
    beforeEach: HookFunction;
    afterEach: HookFunction;
    suiteSetup: HookFunction;
    suiteTeardown: HookFunction;
    setup: HookFunction;
    teardown: HookFunction;
}

export const hook = function (name: string, handler: AsyncFunc | Func) {
  const HANDLERS: Record<keyof MochaGlobals, Array<AsyncFunc | Func>> = {
    after: [],
    afterEach: [],
    before: [],
    beforeEach: [],
    setup: [],
    suiteSetup: [],
    suiteTeardown: [],
    teardown: []
  };

  HANDLERS[name].push(handler);
  const descriptor = Object.getOwnPropertyDescriptor(global, name);
  if (!descriptor || !descriptor.get) {
    let setHook: HookFunction;
    Object.defineProperty(global, name, {
      get(): HookFunction {
        return setHook;
      },
      set(hook: HookFunction): void {
        if (!setHook) {
          HANDLERS[name].forEach(func => {
            hook(func);
          });
        }
        setHook = hook;
      }
    });
  }
};