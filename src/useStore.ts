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
export const getStore = (storeName: string, actions?: {}): Store => {
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
};

interface StoreReducer {
  state: any;
  actions: object;
}
/**
 * Use the store hook
 *
 * @param store The store instance you want to use
 * @param initialState Initial state
 * @param initializer Lazy loading state initial value
 */
export default function useStore(store: Store, initialState): StoreReducer {
  // const value = useReducer(store.getActions(), initialState, initializer);
  // return value;
  const actions = {};
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

interface ProviderProps {
  store: Store;
  value: any;
  children: React.ReactNode[] | React.ReactNode;
}
/**
 * Store Provider component
 * This component will distribute the state in the store to its children
 *
 * @param props component props
 */
export function Provider(
  props: ProviderProps
): React.FunctionComponentElement<React.ProviderProps<any>> {
  const { store, value, children } = props;
  const childrenArr = Array.isArray(children) ? children : [children];
  return React.createElement(
    store.getContext().Provider,
    { value },
    ...childrenArr
  );
}

interface ProvidersProps {
  stores: Store[];
  values: any[];
  children: React.ReactNode[] | React.ReactNode;
}
/**
 * Store Provider component
 * This component will distribute the state in the store to its children
 *
 * @param props component props
 */
export function Providers(
  props: ProvidersProps
): React.FunctionComponentElement<React.ProviderProps<any>> {
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
 * Use context to get the state provided in the store
 *
 * @param store Pass in the store whose context you want to use
 */
export function useStoreContext(store: Store): any {
  return useContext(store.getContext());
}
