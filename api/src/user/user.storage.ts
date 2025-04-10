import { AsyncLocalStorage } from 'async_hooks';

export const UserStorage = {
  storage: new AsyncLocalStorage<{ id: number }>(),
  get() {
    return this.storage.getStore();
  },
  set(userId: number) {
    this.storage.enterWith({ id: userId });
  },
};
