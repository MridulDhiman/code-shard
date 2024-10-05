"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ObjectID from "bson-objectid";
import Footer from "@/components/Footer";
import { FeaturesSectionDemo } from "./FeatureSection";
import { HeroScrollDemo } from "./HeroScroll";

const Main = () => {
  const router = useRouter();
  const { data: session } = useSession();
  

  return (
    <>
      {/* Main Container */}
      <div className="w-full dark:bg-black/90 bg-black  dark:bg-grid-black/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-white bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_12%,black)]"></div>
        <main className="flex flex-col gap-2 justify-center items-center min-h-[85vh] px-4 lg:px-10">
          
        <h1 className="text-center text-3xl sm:text-6xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-8">
            Browser Based <br/>Collaborative Code Editor
          </h1>
     
          <p className="font-normal text-base text-neutral-300 w-fit mx-[20%] text-center">
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
            className="my-5 bg-white dark:bg-[#1F1F25] border border-transparent hover:bg-slate-100 dark:hover:bg-gray-700 text-md p-2 text-black dark:text-white rounded-sm  lg:w-[50%]"
          >
            {session ? "Start Coding" : "Signup for free"}
          </button>
        </main>
      </div>

      <HeroScrollDemo/>
      <FeaturesSectionDemo />
      <Footer />
    </>
  );
};

export default Main;
