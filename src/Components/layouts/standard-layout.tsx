"use client";


import React from "react";
import Providers from "../providers";
import Header from "../navbar";
import LocomotiveScroll from "../locomotive-scroll";

const StandardLayout: React.FC<
  React.PropsWithChildren<{
    navbarProps?: { transparent: boolean };
  }>
> = ({ children }) => {
  return (
    <div className="root">
      <div
        id="layout-mid-container"
        className=" relative flex flex-1 overflow-clip"
      >
        <div
          id="layout-desktop-content-container"
          className="flex w-full flex-1 flex-col"
        >
          <Providers>
            <LocomotiveScroll />
            <Header />
            {children}
          </Providers>
        </div>
      </div>
    </div>
  );
};

export default StandardLayout;
