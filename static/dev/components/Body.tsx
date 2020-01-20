import React, { useContext } from "react";
import { Context } from "./App";

export default function Body() {
  const [state, dispatch] = useContext(Context);
  console.log("state", state);

  return (
    <div>
      <p>Body {state.count}</p>
      <button onClick={dispatch.bind(this, { type: "increment" })}>
        increment
      </button>
      <button onClick={dispatch.bind(this, { type: "decrement" })}>
        decrement
      </button>
    </div>
  );
}
