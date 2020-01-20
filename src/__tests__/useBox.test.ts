import useBox from "../useBox";
import { renderHook } from "@testing-library/react-hooks";
import { useState } from "react";

function useCountFun(def: number): any[] {
  const result = useState(def);
  return this ? [].concat(this, result) : result;
}

const useCount = (def, that: any[]): any[] => {
  const result = useState(def);
  return that ? [].concat(that, result) : result;
};

function useCountObj(): any {
  const [count, setCount] = useState(0);
  return {
    count,
    setCount
  };
}

const reducer = (state, action): { count: number } => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
  }
};

test("Test ordinary function parameters", () => {
  const { result } = renderHook(() =>
    useBox([useCountFun], ["test", (): string => "test"], [1])
  );
  const [text, , text2, , count] = result.current;

  expect(typeof result.current).toBe("object");
  expect(text).toBe("test");
  expect(text2).toBe("test");
  expect(count).toBe(1);
});

test("Test anonymous arrow function parameters", () => {
  const { result } = renderHook(() => useBox([useCount], ["test"], [[1]]));
  const [text, , count] = result.current;
  expect(text).toBe("test");
  expect(count).toBe(1);
});

test("Test reducer parameters", () => {
  const { result } = renderHook(() =>
    useBox([useCount], { reducer, initialState: { count: 0 } }, [[1]])
  );
  const [state] = result.current;
  expect(state.count).toBe(0);
});

test("Test function return value", () => {
  const { result } = renderHook(() => useBox([useCountObj], ["test"]));
  const [count] = result.current;
  expect(count.count).toBe(0);
});
