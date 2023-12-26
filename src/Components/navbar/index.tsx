"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import Link from "next/link";
import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../design-system/button";

import Navlinks from "./nav-links";
import { type SVGAttributes } from "react";

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
      className="block text-base leading-7 tracking-tight text-slate-300"
      {...props}
      href={""}
    >
      {children}
    </Popover.Button>
  );
}

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if(prevTheme === 'Dark'){
          return 'Light'
      }

      return "Dark"
  })
  }
  return (
    <header className="fixed z-[9999] w-full bg-transparent  backdrop-blur-sm">
      <nav>
        <div className="lg:py- relative z-50 mx-auto flex max-w-7xl justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <h2 className="text-xl tracking-tighter font-bold dark:text-white text-black">
                nandanipaliwal
              </h2>
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <Navlinks />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="rounded-md z-10">
              <Link href="" className="">
                <div className=" relative rounded-md ">
                  <span className="relative  isolate m-[-1px] block overflow-hidden rounded-lg p-[1px] [transform:translateZ(10px)] ">
                    <span
                      aria-hidden="true"
                      className="dark:gradient-wrapper_whitescaleBorder gradient-wrapper_blackscaleBorder   absolute bottom-0 left-0 right-0 top-0 block origin-center rounded-lg"
                    ></span>
                    <span
                      aria-hidden="true"
                      className=" duration-900  absolute bottom-0 left-0 right-0 top-0 block bg-black opacity-0 transition-opacity ease-linear"
                    ></span>
                    <span className="relative  z-50">
                      <div className="flex  items-center justify-center rounded-lg">
                        <Button
                          variant={"outline"}
                          className=" dark:bg-dark bg-white dark:text-white text-black"
                        >
                          Hire for work
                        </Button>
                      </div>
                    </span>
                  </span>
                </div>
              </Link>
            </div>
            <div
              className="cursor-pointer"
              onClick={toggleTheme}
            >
              {resolvedTheme === "Light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#121212"
                >
                  <path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm2 0c0-5.514 4.486-10 10-10v20c-5.514 0-10-4.486-10-10z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                >
                  <path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm2 0c0-5.514 4.486-10 10-10v20c-5.514 0-10-4.486-10-10z"></path>
                </svg>
              )}
            </div>
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center justify-center rounded-lg stroke-slate-300 p-2  hover:stroke-slate-300 active:stroke-slate-500 [&:not(:focus-visible)]:focus:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
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
                          className="fixed inset-0 z-0 bg-black opacity-50 backdrop-blur"
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
                          className="absolute inset-x-0 -top-16 z-0 origin-top rounded-b-2xl bg-dark px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="w-full h-px bg-slate-200"></div>
                          <div className="space-y-4 mt-10 flex flex-col justify-center items-center">
                            <MobileNavLink href="#features">
                              Features
                            </MobileNavLink>
                            <MobileNavLink href="#reviews">
                              Reviews
                            </MobileNavLink>
                            <MobileNavLink href="#pricing">
                              Pricing
                            </MobileNavLink>
                            <MobileNavLink href="#faqs">FAQs</MobileNavLink>
                          </div>
                          {/* <div className="mt-8 flex flex-col gap-4">
                            <Link href={"/hire"}>
                              <Button>Hire</Button>
                            </Link>
                            <Link
                              href={"https://call.sarthakjdev.com"}
                              target="_blank"
                            >
                              <Button variant="outline">Get on a call</Button>
                            </Link>
                          </div> */}
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
