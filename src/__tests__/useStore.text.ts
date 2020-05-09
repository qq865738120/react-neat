import useStore, { getStore, getStoreList } from "../useStore";
import { renderHook } from "@testing-library/react-hooks";

const reducer = (state, action): any => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

test("The getStore and useStore function test", () => {
  for (let i = 0; i < 4; i++) {
    const storeName = i === 0 || i === 1 ? "test store" : "test store 2";
    const store = getStore(storeName, reducer);
    expect(store.getName()).toBe(storeName);
    expect(store.getReducer()).toBe(reducer);
    type initialStateType = { count: number };
    const { result } = renderHook((): [initialStateType, any] => {
      return useStore(store, { count: 0 });
    });
    const [state] = result.current;
    expect(state.count).toBe(0);
  }
  const storeList = getStoreList();
  expect(storeList.length).toBe(2);

  try {
    getStore("test reducer");
  } catch (error) {
    expect(error.code).toBe(1000);
  }
});

// test("Test reducer parameters", () => {
//   getStore("test store", );
//   const { result } = renderHook(() =>
//     useStore()
//   );
//   const [state] = result.current;
//   expect(state.count).toBe(0);
// });
