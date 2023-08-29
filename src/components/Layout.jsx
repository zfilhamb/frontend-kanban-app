import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";



function Layout({ children, fetchBoard }) {

  return (
    <>
      <Navbar fetchBoard={fetchBoard}></Navbar>
      {children}
    </>
  );
}

export default Layout;
