import { useState, useEffect } from "react";

export function useModal(deff?, count?) {
  const [isShow, setIsShow] = useState(deff || false);

  useEffect(() => {
    console.log("switch to", isShow);
  }, [isShow]);

  useEffect(() => {
    console.log("switch to show count", count);
  }, [count]);

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
  // const [count, add, less] = useCount();
  // const [isShow, setShow, setHide] = useModal(false, count);

  return [].concat(useCount(), useModal(false, 1));
}
