"use client";

import { useState } from "react";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../design-system/button";
import Navlinks from "./nav-links";
import { type SVGAttributes } from "react";
import ToggleTheme from "../toggle-theme";

function MenuIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileNavLink({ children, ...props }: any) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight dark:text-slate-300 dark:hover:text-slate-500 text-slate-700 hover:text-slate-500  transition-colors delay-150  hover:delay-[0ms] "
      {...props}
      href={""}
    >
      {children}
    </Popover.Button>
  );
}

const Header = () => {
  return (
    <header className="fixed z-50 w-full bg-transparent">
      <nav className="xl:max-w-5xl max-w-xl md:max-w-2xl mx-auto">
        <div className="relative z-50 flex  justify-between items-center px-2 py-2 sm:px-8 mx-3 rounded-full bg-white dark:bg-secondarydark mt-5 border border-dark">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <h2 className="text-lg tracking-tighter font-bold text-primary-500">
                nandanipaliwal
              </h2>
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <Navlinks />
            </div>
          </div>
          <span className="flex lg:hidden">
            <ToggleTheme />
          </span>
          <div className="flex items-center gap-6">
            <div className="rounded-md z-10">
              <Link href="" className="">
                <div className=" relative rounded-full ">
                  <span className="relative  isolate m-[-1px] block overflow-hidden rounded-full p-[1px] [transform:translateZ(10px)] ">
                    <span
                      aria-hidden="true"
                      className=" absolute bottom-0 left-0 right-0 top-0 block origin-center rounded-full"
                    ></span>
                    <span
                      aria-hidden="true"
                      className=" duration-900  absolute bottom-0 left-0 right-0 top-0 block  opacity-0 transition-opacity ease-linear"
                    ></span>
                    <span className="hidden lg:flex">
                      <div className="flex  items-center justify-center rounded-full">
                        <Button
                          variant={"outline"}
                        >
                          Hire for work
                        </Button>
                      </div>
                    </span>
                  </span>
                </div>
              </Link>
            </div>
            <span className="hidden lg:flex">
              <ToggleTheme />
            </span>
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10  inline-flex items-center border-none justify-center rounded-full dark:stroke-slate-300 stroke-slate-700 p-1 dark:hover:bg-dark dark:active:bg-dark [&:not(:focus-visible)]:focus:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-5 w-5 " />
                      ) : (
                        <MenuIcon className="h-5 w-5" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />

                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-20 z-0 origin-top rounded-2xl dark:bg-secondarydark border-dark border bg-white px-6 py-6 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-2 flex flex-col justify-center items-center">
                            <MobileNavLink href="#features">
                              Blogs
                            </MobileNavLink>
                            <MobileNavLink href="#reviews">
                              Tech Stack
                            </MobileNavLink>
                            <div className="flex  items-center justify-center rounded-full">
                              <Button
                                variant={"outline"}
                              >
                                Hire for work
                              </Button>
                            </div>
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
