import React from "react";
import { useModal, useCount, useHead } from "../hooks/base";

export default function Head() {
  const [count, add, less, isShow, setShow, setHide] = useHead();
  return (
    <div>
      <p>Head</p>
      <p>{isShow ? "show" : "hide"}</p>
      <p>count:{count}</p>
      <button
        onClick={() => {
          setShow();
          add();
        }}
      >
        show
      </button>
      <button onClick={setHide}>hide</button>
    </div>
  );
}
