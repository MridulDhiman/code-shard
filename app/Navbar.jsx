"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ObjectID from "bson-objectid";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Avatar from "react-avatar";
import Plus from "@/components/ui/icons/Plus";
import ArrowDown from "@/components/ui/icons/ArrowDown";
import Code from "@/components/ui/icons/Code";
import JoinRoom from "@/components/ui/icons/JoinRoom";
import Cloud from "@/components/ui/icons/Cloud";
import Drawer from "@mui/material/Drawer";
import SideDrawer from "@/components/SideDrawer";
import { useModal } from "@/customHooks/useModal";
import Close from "@/components/ui/icons/Close";
import styles from "./PgModal.module.css";
import clsx from "clsx";



const templates = ["static", "angular", "react", "react-ts", "solid", "svelte", "test-ts", "vanilla-ts", "vanilla", "vue", "vue-ts", "node", "nextjs" ,"astro", "vite", "vite-react", "vite-react-ts"];

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("navbar session: ", session);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomOpen] = useState(false);
const [pgModalOpen, setPgModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [roomInput, setRoomInput] = useState("");
  const modal = useRef();
  const joinModal = useRef();
  const pgModalRef = useRef();
  useModal(pgModalOpen, setPgModalOpen, pgModalRef);

  useEffect(() => {
    const handleBodyClick = (e) => {
      if (isPopoverOpen && modal.current && !modal.current.contains(e.target)) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("click", handleBodyClick);
    return () => {
      document.removeEventListener("click", handleBodyClick);
    };
  }, [isPopoverOpen]);

  useEffect(() => {
    const handleBodyClick = (e) => {
      if (
        isJoinRoomModalOpen &&
        joinModal.current &&
        !joinModal.current.contains(e.target)
      ) {
        setIsJoinRoomOpen(false);
      }
    };

    document.addEventListener("click", handleBodyClick);
    return () => {
      document.removeEventListener("click", handleBodyClick);
    };
  }, [isJoinRoomModalOpen]);

  const joinRoom = () => {
    if (!roomInput) {
      return;
    }

    router.push(`/room/${roomInput}`);
  };

  const onAvatarClick = () => {
    setIsDrawerOpen((prev) => !prev);
  };


  let pgModal = (
  <>
  <dialog
  onClose={() => setPgModalOpen(false)}
  className={clsx(
    "flex flex-col gap-5 w-[90%] h-[75vh absolute left-3 top-12 z-20 p-4 py-8   bg-[#090C08]",
    styles.container
  )}
  ref={pgModalRef}>
    <button onClick={()=> setPgModalOpen(false)} 
     className="self-end border border-transparent p-1 hover:opacity-60 hover:border-white hover:rounded-md" 
      ><Close className="fill-black size-4" /></button>
    <div className="grid grid-cols-5 gap-16">
{templates.map((template, key) => {
  return <div 
  className="text-white border p-2 cursor-pointer"
  key={template}>
    <p className="text-xl">{template}</p>
  </div>
})}
    </div>
  </dialog>
  </>
  );

  
  
  let codeModal = (
    <>
      <ul
        ref={modal}
        className="text-xs p-2 rounded-md absolute flex flex-col right-[3.7rem] text-black top-14 cursor-pointer bg-white"
      >
        <li
          onClick={() => {
            router.push(`/shard/new-shard`);
          }}
          className="bg-white px-2 p-1  flex gap-2 hover:bg-slate-200"
        >
          <Code className={"size-4 fill-white"} /> New Shard
        </li>
        <li
          onClick={() => {
            const id = ObjectID();
            router.push(`/room/new-room`);
          }}
          className="bg-white px-2 p-1 flex gap-2 hover:bg-slate-200"
        >
          <Cloud className={"size-4"} /> New Room
        </li>
        <li
          onClick={() => {
            setIsPopoverOpen(false);
            setIsJoinRoomOpen(true);
          }}
          className="bg-white px-2 p-1 flex gap-2 hover:bg-slate-200"
        >
          <JoinRoom className={" size-4"} /> Join Room
        </li>
      </ul>
    </>
  );

  let joinRoomModal = (
    <div
      ref={joinModal}
      className="flex border border-white w-[30vw] flex-col gap-4 bg-black p-4 z-20 rounded-md absolute left-1/3 top-1/3"
    >
      <h1 className="text-xl">Enter Room ID: </h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          className="h-8 rounded-md text-black caret-black"
          type="text"
        />
        <Button onClick={joinRoom} className={"self-end w-fit"}>
          Join
        </Button>
      </form>
    </div>
  );

  return (
    <div className="flex mx-2 my-4  gap-4 items-center justify-between text-sm">
      <h1 className="text-2xl tracking-widest">
        <Link href="/">CODESHARD</Link>
      </h1>
      <div className="flex gap-3 items-center">
        <Drawer
          anchor={"right"}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <SideDrawer />
        </Drawer>
        {!session && (
          <>
           {pgModalOpen && <>{pgModal}</>}
          <Button
            type="outline"
            onClick={() => {
              console.log("user clicked");
              setPgModalOpen(true);
            }}
          >
            Try Editor
          </Button>
          </>
          
        )}

        {session ? (
          <>
            <Button onClick={() => setIsPopoverOpen(true)} type="outline">
              <Plus className="size-3 fill-white" />{" "}
              <ArrowDown className="fill-white size-4" />
            </Button>
            {isPopoverOpen && <>{codeModal}</>}
            {isJoinRoomModalOpen && <>{joinRoomModal}</>}
  

            {/* <Link href="/your-work"> */}
            <button onClick={onAvatarClick}>
              <Avatar name={session.user?.name} round={true} size="40" />
            </button>
            {/* </Link> */}
          </>
        ) : (
          <>
            {/* <Link className="cursor-pointer bg-[#47cf73] hover:bg-[#248C46] text-black px-2 py-2 rounded-md text-sm" href="/register">Signup</Link> */}
            <Button onClick={() => router.push("/register")} type="primary">
              Signup
            </Button>
            {/* <Link className="hover:text-slate-300 text-sm cursor-pointer" href="/login">Signin</Link> */}
            <Button type="outline" onClick={() => router.push("/login")}>
              Signin
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
