import React, { useContext } from "react";
import { getStore, useStoreContext } from "../../../src/useStore";

export default function Body() {
  const [state, dispatch] = useStoreContext(getStore("test"));
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
