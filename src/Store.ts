import { Context } from "./type";

/**
 * store empty class
 *
 * @class Store
 */
class Store {
  private name: string;
  private actions: {};
  private context: Context;
  constructor(name: string, actions: {}, context: Context) {
    this.name = name;
    this.actions = actions;
    this.context = context;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): boolean {
    this.name = name;
    return true;
  }

  public getActions(): {} {
    return this.actions;
  }

  public setActions(actions: {}): boolean {
    this.actions = actions;
    return true;
  }

  public getContext(): Context {
    return this.context;
  }

  public setContext(context: Context): boolean {
    this.context = context;
    return true;
  }
}

export default Store;
