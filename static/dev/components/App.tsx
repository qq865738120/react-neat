import React, { createContext, useReducer } from "react";
import Head from "./Head";
import Body from "./Body";
import useStore, { getStore, Provider, Providers } from "../../../src/useStore";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

function App() {
  const store = getStore("test", reducer);
  const value = useStore(store, { count: 1 });

  return (
    <Providers stores={[store]} values={[value]}>
      <div className="App">
        <Head></Head>
        <Body></Body>
      </div>
      <p>1</p>
    </Providers>
  );
}

export default App;
