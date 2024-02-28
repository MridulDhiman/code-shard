"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiPencilFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShard } from "@/store/slices/shard";
import { CiExport } from "react-icons/ci";
import { CiStop1 } from "react-icons/ci";
import { FaRegShareSquare } from "react-icons/fa";
import { setModal } from "@/store/slices/modal";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
import Button from "@/components/ui/Button";


const RoomNavbar = ({ roomId }) => {
  const { data } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("Untitled");
  const [startEditing, setStartEditing] = useState(false);
  const dispatch = useDispatch();
  const shardState = useSelector((state) => state.shard.current);
  const modal = useRef();
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  useEffect(() => {
    const handleBodyClick = (e) => {
      console.log("body clicked");
      if (isModalOpen && modal.current && !modal.current.contains(e.target)) {
        dispatch(setModal(false));
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [isModalOpen]);



  useEffect(() => {
    dispatch(setShard({ title }));
  }, [title]);

  const editTitle = () => {
    setStartEditing(true);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setStartEditing(false);
    }
  };

  const openModal = () => {
    console.log("modal opened");
    dispatch(setModal(true));
  };

  const stopSession = () => {
    const isConfirmed = confirm(
      "Are you sure, you want to proceed with this action?"
    );
    if (isConfirmed) {
      router.replace("/your-work");
    }
  };

  const handleExport = () => {

  }
 

  return (
    <div
      onKeyDown={handleEnter}
      className="bg-[#010101] flex p-4 py-2  justify-between items-center"
    >
      <div className="flex items-center gap-4">
        {startEditing ? (
          <>
            <input
              className="bg-transparent outline-none caret-white text-xl w-[50vw]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </>
        ) : (
          <h1 className="flex items-center gap text-xl">
            {title}
            <RiPencilFill
              onClick={editTitle}
              className="cursor-pointer hover:text-slate-500"
            />
          </h1>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={openModal}
          className="text-white flex items-center gap-2 hover:text-slate-300"
        >
          <FaRegShareSquare /> Share
        </button>
        <Button onClick={handleExport}><CiExport/>Export</Button>
        {isModalOpen && (
          <dialog
            ref={modal}
            onClose={() => dispatch(setModal(false))}
            className="mt-[90vh] z-50 grid items-center bg-[#1E1F26] rounded-lg p-8 py-12 text-white gap-4 border border-emerald-600"
          >
            <div className="relative flex flex-col items-center gap-4">
              <h1 className="text-[#47cf73] text-lg">Live Collaboration</h1>
              <div className="flex flex-col items-center gap-4">
                <p className=""> User: {data?.user.name}.</p>
                <button
                  onClick={stopSession}
                  className={clsx(
                    "p-4 py-2 text-white border border-white rounded-md flex items-center gap-2 text-sm",
                    "hover:border-red-600 hover:text-red-600"
                  )}
                >
                  <CiStop1 /> Stop Session
                </button>
              </div>
            </div>
            <button
              className="absolute right-0 top-0 m-2 text-xl"
              onClick={() => dispatch(setModal(false))}
            >
              <IoMdClose />
            </button>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default RoomNavbar;
