import { action, makeAutoObservable } from 'mobx';

class Store {
  code = '';

  constructor() {
    makeAutoObservable(this, {
      update: action.bound,
    });
  }

  update(code: string): void {
    this.code = code;
  }
}

const store = new Store();

export default store;
