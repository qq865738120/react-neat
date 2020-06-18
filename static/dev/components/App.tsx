import React, { createContext, useReducer } from "react";
import Head from "./Head";
import Body from "./Body";
import useStore, { getStore, Provider, Providers } from "../../../src/useStore";

const sleep = async t => new Promise(resolve => setTimeout(resolve, t));

const actions = {
  increment(state) {
    return { count: state.count + 1 };
  },
  async decrement(state) {
    await sleep(2000);
    return { count: state.count - 1 };
  }
};

function App() {
  const store = getStore("test", actions);
  const value = useStore(store, { count: 1, name: "my name" });
  console.log("value", value);

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
