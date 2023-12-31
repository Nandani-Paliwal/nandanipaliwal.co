import Image from "next/image";

import { Fragment } from "react";
import ToggleTheme from "../Components/toggle-theme";

export default function Home() {
  return (
    <main>
      {/* hero section */}
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-evenly pt-24 text-gray-800 lg:pb-5  xl:flex-row-reverse xl:justify-center xl:pt-24 ">
        <div className="mb-10  flex select-none xl:mb-16 w-fit">
			<Image
            alt="my-avatar"
            loading="lazy"
            width="400"
            height="400"
            className="aspect-square rounded-full object-contain "
            src={"/my-avatar.png"}
          />
        </div>
        <div className="flex flex-col text-center  xl:text-left">
          <div className="mb-2">
            <h1 className="mb-2 text-4xl font-bold md:text-5xl text-primary-500">
              Nandani Paliwal
            </h1>
            <h2 className="mb-4 text-xl dark:text-white text-black font-semibold">
              Frontend Developer | GDSC Lead | MLSA
            </h2>
          </div>
          <p className="font-content mb-8 max-w-2xl whitespace-break-spaces text-lg font-semibold text-gray-600 lg:leading-relaxed">
            Frontend Developer who converts your designs to a pixel fit UI.
          </p>
        </div>
      </div>

      {/* Works and products developed */}
      {/* <Works /> */}

      {/* blogs */}
      {/* <Blogs /> */}

      {/* Toggle Theme Section*/}
      
    </main>
  );
}
