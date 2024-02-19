"use client";
import useMousePosition from "../utils/use-mouse-position";
import { useState } from "react";
import { motion } from "framer-motion";
import Socials from "../Components/socials";


export default function Home() {

  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <main className="">
      <div className="relative  lg:mx-auto flex h-full flex-col items-center justify-center mx-11 py-32">
        <motion.div
          animate={{
            WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
            WebkitMaskSize: `${size}px`,
          }}
          transition={{ type: "tween", ease: "backOut" }}
          className="mask w-full absolute h-full flex flex-col items-center justify-center text-black py-40"
        >
          {/* hero section */}
          <div
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
            className="flex flex-col items-center justify-center"
          >
            <p className="text-center text-base lg:text-lg mb-4 max-w-2xl tracking-widest uppercase font-semibold ">
              Nandani Paliwal
            </p>
            <h1 className=" text-5xl -space-y-2 sm:-space-y-4 sm:text-7xl lg:-space-y-6 lg:text-9xl text-center uppercase font-bold ">
              <span className="block">National</span>
              <span className="block">level</span>
              <span className="block">Chess</span>
              <span className="block">Player</span>
            </h1>
          </div>

          {/* about section */}
          <div
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
            className=" flex flex-col mt-48"
          >
            <p className="text-left mb-4 tracking-widest uppercase text-lg font-semibold">
              About Me
            </p>
            <h2 className=" text-4xl sm:text-5xl lg:text-7xl max-w-5xl font-bold ">
              I&rsquo;m a National level Chess player and is good in playing
              white and knows how to move her queen.
            </h2>
          </div>
        </motion.div>

        {/* actual content */}
        <div className="actual-content py-40 mx-11 lg:mx-auto h-full w-full flex flex-col items-center justify-center">
          {/* hero section */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-base lg:text-lg mb-4 max-w-2xl tracking-widest uppercase font-semibold text-gray-600 dark:text-secondary-400 ">
              Nandani Paliwal
            </p>
            <h1 className="  text-5xl -space-y-2 sm:-space-y-4 sm:text-7xl lg:-space-y-6 lg:text-9xl text-center uppercase font-bold text-gray-600 dark:text-secondary-400 ">
              <span className="block">Pixel</span>
              <span className="block">Perfect</span>
              <span className="block text-primary-500">Frontend</span>
              <span className="block">Developer</span>
            </h1>
          </div>

          {/* about section */}
          <div className="flex flex-col mt-48">
            {" "}
            <p className="text-left text-base lg:text-lg mb-4 tracking-widest uppercase font-semibold text-gray-600 dark:text-secondary-400">
              About Me
            </p>
            <h2 className=" text-4xl sm:text-5xl lg:text-7xl max-w-5xl font-bold text-gray-600 dark:text-secondary-400">
              I&rsquo;m Frontend Developer who is leaning to create some awesome
              animations on the canvas.
            </h2>
          </div>

          {/* socials section */}
         <Socials />
        </div>
      </div>
    </main>
  );
}
