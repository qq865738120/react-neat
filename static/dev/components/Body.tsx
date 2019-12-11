import React from "react";
import { useModal } from "../hooks/base";

export default function Body() {
  const [isShow, setShow, setHide] = useModal(true);

  return (
    <div>
      <p>Body</p>
      <p>{isShow ? "show" : "hide"}</p>
    </div>
  );
}
