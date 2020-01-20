import React, { createContext, useReducer } from "react";
import Head from "./Head";
import Body from "./Body";

export const Context = createContext(null);

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
  const value = useReducer(reducer, { count: 1 });

  return (
    <Context.Provider value={value}>
      <div className="App">
        <Head></Head>
        <Body></Body>
      </div>
    </Context.Provider>
  );
}

export default App;
