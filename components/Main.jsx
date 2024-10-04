"use client";
import { MacbookScroll } from "./ui/macbook-scroll";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ObjectID from "bson-objectid";
import Link from "next/link";
import laptopImage from "@/public/laptop2.svg";
// import sideDots from "@/public/side-dots.png";
// import darkCube from "@/public/dark_cube.png";
import ShardImg from "@/images/shard.png";
import Footer from "@/components/Footer";
import { BackgroundBeams } from "./ui/background-beams";

const Badge = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
        fill="#00AA45"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#219653"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
        fill="#24292E"
      ></path>
    </svg>
  );
};

// MacbookScrollDemo Component
export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden w-full py-12">
      <MacbookScroll
        badge={
          <Link href="https://peerlist.io/manuarora">
            <Badge className="h-10 w-10 transform -rotate-12 hover:scale-110 transition-transform duration-300" />
          </Link>
        }
        src={ShardImg}
        showGradient={true}
      />
    </div>
  );
}

const Main = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      {/* Background Dots and Cube */}
      {/* <div className="absolute -z-10 -top-[28rem] right-[36rem] rotate-90 hidden lg:block">
        <Image width="200" height={"200"} src={sideDots} alt="Side dots" />
      </div> */}
      <BackgroundBeams/>

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
      <MacbookScrollDemo />
      <Footer />
    </>
  );
};

export default Main;
