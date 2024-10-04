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
      <main className="flex flex-col gap-4 justify-center items-center min-h-[85vh] px-4 lg:px-10">
          <h1 className="text-center text-4xl lg:text-6xl font-semibol text-white dark:text-white">
          Browser Based <br/> Collaborative Code Editor
          </h1>
          <p className="text-sm font-semibold  text-gray-200 w-fit mx-[30%] text-center">
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
            className="my-5 bg-gray-400 dark:bg-[#1F1F25] border border-transparent hover:bg-slate-300 dark:hover:bg-gray-700 text-md p-2 text-black dark:text-white rounded-md  lg:w-[50%]"
          >
            {session ? "Start Coding" : "Signup for free"}
          </button>
      
       
      </main>

      {/* Macbook Scroll Demo Section */}
      <FeaturesSectionDemo />

      <Footer />
    </>
  );
};

export default Main;
