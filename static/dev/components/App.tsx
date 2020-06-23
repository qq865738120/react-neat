import React, { createContext, useReducer } from "react";
import Head from "./Head";
import Body from "./Body";
import { useStore, getStore, Provider, Providers } from "../../../src/index";

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
  const testStore = getStore("test", actions);
  const testValue = useStore(testStore, { count: 1, name: "my name" });
  const userStore = getStore("user", actions);
  const userValue = useStore(userStore, { nickName: "xiao ming", age: 22 });

  return (
    <Providers stores={[testStore, userStore]} values={[testValue, userValue]}>
      <div className="App">
        <Head></Head>
        <Body></Body>
      </div>
      <p>1</p>
    </Providers>
  );
}

export default App;
