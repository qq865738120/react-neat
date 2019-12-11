import { useState, useEffect } from "react";
import upState from "../../../src/upState";
import withHook from "../../../src/withHook";

export function useModal(deff?) {
  const [isShow, setIsShow] = useState(deff || false);

  useEffect(() => {
    console.log("switch to", isShow);
  }, [isShow]);

  const setShow = () => {
    setIsShow(true);
  };

  const setHide = () => {
    setIsShow(false);
  };

  return [isShow, setShow, setHide];
}

export function useCount(deff?) {
  const [count, setCount] = useState(deff || 0);

  useEffect(() => {
    console.log("count change", count);
  }, [count]);

  const add = () => {
    setCount(count + 1);
  };

  const less = () => {
    setCount(count - 1);
  };

  return [count, add, less];
}

export function useHead() {
  const [count, add, less] = upState(useCount());
  const [isShow, setShow, setHide] = withHook(useModal(false), () => {})();

  return [count, add, less, isShow, setShow, setHide];
}
