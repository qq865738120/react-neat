import { useState, useEffect } from "react";
import useBox from "../../../src/useBox";

export function useText(callback?) {
  const text = useState("text");
  console.log("text", text);
}

export function useModal(callback?) {
  const [isShow, setIsShow] = useState(false);
  const [test, setTest] = this;

  useEffect(() => {
    console.log("switch to", isShow);
  }, [isShow]);

  const setShow = () => {
    console.log("11111", this);
    setIsShow(true);
  };

  const setHide = () => {
    setIsShow(false);
  };

  return [isShow, setShow, setHide];
}

export function useCount(callback?) {
  const [count, setCount] = useState(0);
  const [test, setTest] = this;
  // const [point, setPoint] = callback();
  useEffect(() => {
    console.log("count change", count);
  }, [count]);

  const add = () => {
    setCount(count + 1);
    setTest("test" + count);
  };

  const less = () => {
    setCount(count - 1);
  };

  return [count, add, less];
}

export function useHead() {
  // const [count, add, less] = useCount();
  // const [isShow, setShow, setHide] = useModal(false, count);
  useText();
  const arr = useBox([useCount, useModal], [3, false], [[1], [2]]);
  return arr;
}
