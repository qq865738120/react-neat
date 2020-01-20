import { useState, useReducer } from "react";
import { getDepth } from "./utils/baseUtil";

interface StatesInterface {
  reducer: (state, action) => any;
  initialState: any;
  initialAction?: any;
}

const __createState = (states: any[]): any[] => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const stateArr = [];
  (states || []).map(item => stateArr.push(...useState(item)));
  return stateArr;
};

const __createReducer = (option: StatesInterface): any[] => {
  return useReducer(option.reducer, option.initialState, option.initialAction);
};

const __useHooks = (
  context: any[],
  hooks: Array<(...rest) => any>,
  args: any[] | any[][]
): any[] => {
  if (!hooks) {
    return context;
  }
  const result = [];
  (hooks || []).map((item, index) => {
    const funReturn = item.apply(
      context,
      (args &&
        (getDepth(args) === 1 ? args : args[index] || []).concat([
          context
        ])) || [context]
    );
    if (Array.isArray(funReturn)) {
      result.push(...funReturn);
    } else {
      result.push(funReturn);
    }
  });
  return result;
};

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
export default function useBox(
  hooks: Array<(...rest) => any>,
  states?: any[] | StatesInterface,
  args?: any[] | any[][]
): any[] {
  let context = [];
  if ((states as any[]).length) {
    context = [...__createState(states as any[])];
  } else {
    context = [...__createReducer(states as StatesInterface)];
  }
  return __useHooks(context, hooks, args);
}
