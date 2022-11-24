import React from "react";
import { Outlet } from "react-router-dom";
import Slidebars from "./Slidebars";

export default function Renderpage() {
  return (
    <>
      <Slidebars />
      <Outlet />
    </>
  );
}
