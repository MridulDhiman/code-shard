"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ObjectID from "bson-objectid";
import laptopImage from "@/public/laptop2.svg";
import Footer from "@/components/Footer";
import { BackgroundBeams } from "./ui/background-beams";
import { FeaturesSectionDemo } from "./FeatureSection";


const Main = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      {/* Background Dots and Cube */}
      {/* <div className="absolute -z-10 -top-[28rem] right-[36rem] rotate-90 hidden lg:block">
        <Image width="200" height={"200"} src={sideDots} alt="Side dots" />
      </div> */}
      <BackgroundBeams />

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row justify-center items-center min-h-[85vh] px-4 lg:px-10">
        {/* Left Container */}
        <div className="w-full lg:w-1/2 flex flex-col gap-2 relative mb-8 lg:mb-0">
          {/* Headings */}
          <h1 className="text-4xl lg:text-6xl font-semibold flex gap-2 text-white dark:text-white">
            Code.
          </h1>
          <h1 className="text-4xl lg:text-6xl font-semibold flex gap-2 text-white dark:text-white">
            Share.
          </h1>
          <h1 className="text-4xl lg:text-6xl font-semibold flex gap-2 mb-4 lg:mb-9 text-white dark:text-white">
            Collaborate.
          </h1>
          <p className="text-sm lg:text-base text-gray-300">
            Social Development Environment for building Frontend Snippets,
            allowing collaboration in rooms.
          </p>

          {/* Button */}
          <button
            onClick={() => {
              if (session) {
                const id = ObjectID();
                router.push(`/shard/${id.toHexString()}`);
                return;
              }
              router.push("/register");
            }}
            className="my-5 bg-white dark:bg-[#1F1F25] border border-transparent hover:bg-slate-300 dark:hover:bg-gray-700 text-md p-2 text-black dark:text-white rounded-lg w-full lg:w-auto"
          >
            {session ? "START CODING" : "Signup for free"}
          </button>

          {/* Dark Cube */}
          {/* <div className="absolute top-[48vh] right-0 z-10 hidden lg:block">
            <Image width="200" height={"200"} src={darkCube} alt="Dark cube" />
          </div> */}
        </div>

        {/* Right Container */}
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

      {/* Macbook Scroll Demo Section */}
      <FeaturesSectionDemo />
 
      <Footer />
    </>
  );
};

export default Main;
