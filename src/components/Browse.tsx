import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Browse: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Browse;
