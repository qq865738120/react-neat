import { createContext, useContext, useState } from "react";
import * as React from "react";
import Store from "./store";
// import { Reducer } from "./type";
import { ParamsException } from "./utils/exceptions";
import { isPromise } from "./utils/baseUtil";

const storeList: Store[] = [];

/**
 * Get store list.
 */
export const getStoreList = (): Store[] => {
  return storeList;
};

/**
 * Determines whether the specified store exists.
 *
 * @param storeName store name
 */
export const hasStore = (storeName: string): boolean => {
  const storeObj: Store = storeList
    .filter(item => item.getName() === storeName)
    .pop();
  return storeObj ? true : false;
};

/**
 * Get the specified store.
 * If the store does not exist, it will be created.
 *
 * @param storeName store name
 * @param actions If the store has never been obtained, please pass in the reducer parameter.
 */

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
export function getStore<T>(storeName: string, actions?: T): Store {
  let storeObj: Store = storeList
    .filter(item => item.getName() === storeName)
    .pop();

  if (storeObj) {
    return storeObj;
  }

  if (!actions) {
    throw new ParamsException(
      "If the store has never been obtained, please pass in the reducer parameter."
    );
  }

  const context = createContext(null);
  storeObj = new Store(storeName, actions, context);
  storeList.push(storeObj);
  return storeObj;
}

/**
 * The store reducer interface.
 *
 * @interface StoreReducer
 * @template T - The action type you defined.
 * @template U - The state type you defined.
 */
export interface StoreReducer<T, U> {
  state: U;
  actions: T;
}

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
export default function useStore<T, U>(
  store: Store,
  initialState
): StoreReducer<T, U> {
  // const value = useReducer(store.getActions(), initialState, initializer);
  // return value;
  const actions = {} as T;
  console.log("store.getReducer()", store.getActions());
  const [state, setState] = useState(initialState);
  Object.keys(store.getActions()).forEach(name => {
    actions[name] = (arg): any => {
      const res = store.getActions()[name].call(this, state, arg);
      if (isPromise(res)) {
        Promise.resolve(res).then(ret => {
          setState({ ...state, ...ret });
        });
      } else {
        setState({ ...state, ...res });
      }
    };
  });
  return { state, actions };
}

interface ProviderProps<T, U> {
  store: Store;
  value: StoreReducer<T, U>;
  children: React.ReactNode[] | React.ReactNode;
}

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
export function Provider<T, U>(
  props: ProviderProps<T, U>
): React.FunctionComponentElement<React.ProviderProps<ProvidersProps<T, U>>> {
  const { store, value, children } = props;
  const childrenArr = Array.isArray(children) ? children : [children];
  return React.createElement(
    store.getContext().Provider,
    { value },
    ...childrenArr
  );
}

interface ProvidersProps<T, U> {
  stores: Store[];
  values: StoreReducer<T, U>[];
  children: React.ReactNode[] | React.ReactNode;
}

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
export function Providers<T, U>(
  props: ProvidersProps<T, U>
): React.FunctionComponentElement<React.ProviderProps<ProvidersProps<T, U>>> {
  const { stores, values, children } = props;
  const childrenArr = Array.isArray(children) ? children : [children];
  if (stores.length !== values.length) {
    throw new ParamsException("Stores and values must correspond one by one.");
  }

  const queue = [];

  stores.map((item, index) => {
    if (index === 0) {
      queue.push(
        React.createElement(
          item.getContext().Provider,
          { value: values[index] },
          ...childrenArr
        )
      );
    } else {
      queue.push(
        React.createElement(
          item.getContext().Provider,
          { value: values[index] },
          queue.pop()
        )
      );
    }
  });
  return queue.pop();
}

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
export function useStoreContext<T, U>(store: Store): StoreReducer<T, U> {
  return useContext(store.getContext());
}
