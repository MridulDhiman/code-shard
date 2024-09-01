"use client";

import Svg1 from "./Svg1";
import Card from "./Card";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import Image from "next/image";
import laptopImage from "@/public/laptop2.svg";
import { useSession } from "next-auth/react";
import ObjectID from "bson-objectid";
import sideDots from "@/public/side-dots.png";
import darkCube from "@/public/dark_cube.png";

const Main = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <div className="absolute -z-10 -top-[28rem] right-[36rem] rotate-90 hidden lg:block">
        <Image width="200" height={"200"} src={sideDots} alt="Side dots" />
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center min-h-[85vh] px-4 lg:px-10">
        {/* left container  */}
        <div className="w-full lg:w-1/2 flex flex-col gap-2 relative mb-8 lg:mb-0">
          {/* heading  */}
          <h1 className="text-4xl lg:text-6xl font-semibold flex gap-2">
            Code.
          </h1>
          <h1 className="text-4xl lg:text-6xl font-semibold flex gap-2">
            Share.
          </h1>
          <h1 className="text-4xl lg:text-6xl font-semibold flex gap-2 mb-4 lg:mb-9">
            Collaborate.
          </h1>
          <p className="text-sm lg:text-base">
            Social Development Environment for building Frontend Snippets,
            allowing collaboration in rooms.
          </p>

          <button
            onClick={() => {
              if (session) {
                const id = ObjectID();
                router.push(`/shard/${id.toHexString()}`);
                return;
              }
              router.push("/register");
            }}
            className="my-5 bg-white border border-transparent hover:bg-slate-300 text-md p-2 text-black rounded-lg w-full lg:w-auto"
          >
            {session ? "START CODING" : "Signup for free"}
          </button>
          <div className="absolute top-[48vh] right-0 z-10 hidden lg:block">
            <Image width="200" height={"200"} src={darkCube} alt="Dark cube" />
          </div>
        </div>

        {/* right container  */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            width="500"
            height="500"
            src={laptopImage}
            alt="Laptop"
            className="w-full max-w-[300px] lg:max-w-[500px]"
          />
        </div>
      </div>
    </>
  );
};

export default Main;
