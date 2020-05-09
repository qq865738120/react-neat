import { Reducer, Context } from "./type";

/**
 * store empty class
 *
 * @class Store
 */
class Store {
  private name: string;
  private reducer: Reducer;
  private context: Context;
  constructor(name: string, reducer: Reducer, context: Context) {
    this.name = name;
    this.reducer = reducer;
    this.context = context;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): boolean {
    this.name = name;
    return true;
  }

  public getReducer(): Reducer {
    return this.reducer;
  }

  public setReducer(reducer: Reducer): boolean {
    this.reducer = reducer;
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
