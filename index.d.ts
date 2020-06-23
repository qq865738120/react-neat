import * as React from "react";

declare type Context = React.Context<any>;

declare interface Store {
  name: string;
  actions: {};
  context: Context;
  getName: () => string;
  setName: (name: string) => boolean;
  getActions: () => object;
  setActions: (name: object) => boolean;
  getContext: () => Context;
  setContext: (context: Context) => boolean;
}

declare interface ProviderProps<T, U> {
  store: Store;
  value: StoreReducer<T, U>;
  children: React.ReactNode[] | React.ReactNode;
}

declare interface ProvidersProps<T, U> {
  stores: Store[];
  values: StoreReducer<T, U>[];
  children: React.ReactNode[] | React.ReactNode;
}

/**
 * The store reducer interface.
 *
 * @interface StoreReducer
 * @template T - The action type you defined.
 * @template U - The state type you defined.
 */
declare interface StoreReducer<T, U> {
  state: U;
  actions: T;
}

/**
 * Merge hooks add some shared state when needed.
 * 1.Please keep the state order unchanged at every renderer
 * 2.You can get the shared status through the last parameter
 * of the function. If it is not an arrow function, you can get
 * it through this reference
 *
 * @export
 * @param {(Array<(...rest) => [] | {}>)} hooks
 * @param {any[]} [state]
 * @param {(any[] | any[][])} [args]
 * @returns {any[]}
 */
declare function useBox(storeName: string, actions?: {}): Store;

/**
 * Get the specified store.
 * If the store does not exist, it will be created.
 *
 * @export
 * @template T - The action type you defined.
 * @param {string} storeName - The store name, you can find the corresponding store through `storeName`
 * @param {T} [actions] - The action object can provide multiple actions, and each action corresponds to an operation.
 * @returns {Store} - The Store object
 */
declare function getStore<T>(storeName: string, actions?: T): Store;

/**
 * Store Provider component.
 * This component will distribute the state in the store to its children.
 * If you need to use multiple stores at the same time, you should use `Providers`.
 *
 * @export
 * @template T - The action type you defined.
 * @template U - The state type you defined.
 * @param {ProviderProps<T, U>} props - React component props.
 * @returns {React.FunctionComponentElement<React.ProviderProps<ProvidersProps<T, U>>>}
 */
declare function Provider<T, U>(
  props: ProviderProps<T, U>
): React.FunctionComponentElement<React.ProviderProps<ProvidersProps<T, U>>>;

/**
 * Store Provider component.
 * This component will distribute the state in the store to its children.
 *
 * @export
 * @template T - The action type you defined.
 * @template U - The state type you defined.
 * @param {ProvidersProps<T, U>} props - React component props.
 * @returns {React.FunctionComponentElement<React.ProviderProps<ProvidersProps<T, U>>>}
 */
declare function Providers<T, U>(
  props: ProvidersProps<T, U>
): React.FunctionComponentElement<React.ProviderProps<ProvidersProps<T, U>>>;

/**
 * Use context to get the state provided in the store.
 * `useContext` is the encapsulation method of `useStoreContext`.
 * The provider must be injected into the global component before use.
 *
 * @export
 * @template T - The action type you defined.
 * @template U - The state type you defined.
 * @param {Store} store - Pass in the store whose context you want to use
 * @returns {StoreReducer<T, U>} - `StoreReducer` is an interface that provides `state` and `actions` to operate `state`.
 */
declare function useStoreContext<T, U>(store: Store): StoreReducer<T, U>;

/**
 * Use the store hook.
 *
 * @export
 * @template T
 * @template U
 * @param {Store} store - The store instance you want to use.
 * @param {*} initialState - Initial state.
 * @returns {StoreReducer<T, U>} - `StoreReducer` is an interface that provides `state` and `actions` to operate `state`.
 */
declare function useStore<T, U>(store: Store, initialState): StoreReducer<T, U>;
