import React from "react";
import { getStore, useStoreContext } from "../../../src/useStore";

export default function Body() {
  const { state, actions } = useStoreContext<any, any>(getStore("test"));
  console.log("state", state, actions);

  return (
    <div>
      <h2>Body</h2>
      <p>
        count: {state.count}, name: {state.name}
      </p>
      <button onClick={() => actions.increment()}>increment</button>
      <button onClick={() => actions.decrement()}>decrement</button>
    </div>
  );
}
