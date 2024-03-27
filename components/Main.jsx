"use client";


import Svg1 from "./Svg1";
import Card from "./Card";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import Image from "next/image";
import laptopImage from "@/public/laptop2.svg";
import { useSession } from "next-auth/react";
import ObjectID from "bson-objectid";
import sideDots from "@/public/side-dots.png"
import darkCube from "@/public/dark_cube.png"


const Main = () => {
  const router = useRouter();
  const {data: session} = useSession();


  const cardContainer = [{
    lang: "HTML",
    content: "<div class='container' >Hello World</div>"
  }, 
{
  lang: "CSS", 
  content: `
  .container: {
      font-family: Fira-code, monospace;
      z-index:-1;
  }`
}, {
  lang: "JS",
  content: "const container = document.querySelector('.container');"
}]
  return (
    <>
    <div className="absolute -z-10 -top-[28rem] right-[36rem] rotate-90">
      <Image width="200" height={"200"} src={sideDots}/>
    </div>
    
      <div className="flex justify-center items-center  h-[85vh] ">  

      {/* left container  */}
          <div className="w-1/2 flex flex-col m-10 gap-2 relative">
            {/* heading  */}
            <h1 className="text-6xl font-semibold flex gap-2">
             Code.
            </h1>
            <h1 className="text-6xl font-semibold flex gap-2">
              Share.
            </h1>
            <h1 className="text-6xl font-semibold flex gap-2 mb-9">
              Collaborate.
            </h1>
            <p>
              Social Development Environment for building HTML/CSS/JS Snippets,
              allowing collaboration in rooms.
            </p>
           
            <button
            onClick={()=> { 
              if(session) {
               const id =  ObjectID();
                router.push(`/shard/${id.toHexString()}`);
                return;
              }
              router.push("/register");
            }}
            className="my-5 bg-primary border border-transparent  hover:bg-secondary text-md  p-2 text-black rounded-lg " >{session ? "START CODING" : "Signup for free"}</button>
            <div className="absolute top-[48vh] right-0 z-10">
              <Image width="200" height={"200"} src={darkCube}/>
            </div>
          </div>

          {/* right container  */}
        <div className="" >
          {/* {cardContainer.map((card,index) => <Card key={index} {...card}/>)} */}
          <Image width="500" height="500" src={laptopImage}
          />
        
        </div>
      </div>

      {/* <Svg1 /> */}
    </>
  );
};

export default Main;
