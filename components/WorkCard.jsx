"use client";

import { useRouter } from "next/navigation";
// import Button from "./ui/Button";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
// import Heart from "./ui/icons/Heart";
// import Comment from "./ui/icons/Comment";
// import View from "./ui/icons/View";
import Delete from "./ui/icons/Delete";
import Lock from "./ui/icons/Lock";
import Unlock from "./ui/icons/Unlock";
// import Collection from "./ui/icons/Collection";
import FullScreen from "./ui/icons/FullScreen";
import HorizontalThreeDots from "./ui/icons/HorizontalThreeDots";
import CustomSandpackPreview from "./CustomSandpackPreview";

const WorkCard = ({
  content: initialContent,
  isTemplate,
  title,
  id,
  type: initialType,
  // profile,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [isDeleted, setIsDeleted] = useState(false);
  const [type, setType] = useState(initialType);
  const modal = useRef();

  useEffect(() => {
    setType(type);
  }, [type]);

  useEffect(()=> {
    if(initialContent) {
      setContent(initialContent);
    }
  }, [initialContent])

  console.log("shard ids : ", id);
  console.log(content);

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

  // library hooks
  const router = useRouter();

  const outputDoc = `
    <html lang="en">
    <head>
    <style>
    * {
      font-size: 0.7rem !important;
    }
    ${content.css}
    </style>
    </head>
    <body>${content.html}</body>
    <script defer>${content.js}</script>
    </html>`;

  const handleClick = () => {
    router.replace(`/shard/${id}`);
  };

  const handleDelete = () => {
    setIsPopoverOpen(false);
    const isConfirmed = confirm(
      "Are you sure you want to proceed with this action?"
    );
    if (isConfirmed) {
      setIsDeleted(true);
      fetch(`/api/shard/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("response success: ", data);
          router.refresh();
        })
        .catch((error) => {
          setIsDeleted(false);
          console.log("response error: ", error.message);
        });
    }
  };

  const toggleType = () => {
    setIsPopoverOpen(false);

    setType((prev) => {
      if (prev === "private") {
        return "public";
      }
      return "private";
    });
    fetch(`/api/shard/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        type: type === "private" ? "public" : "private",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("response success: ", data);
        router.refresh();
      })
      .catch((error) => {
        setType(initialType);
        console.log("response error: ", error.message);
      });
  };
  return (
    <div
      className={clsx(
        "flex flex-col bg-[#1E1F26] rounded-xl  p-4 gap-3",
        isDeleted && "hidden"
      )}
    >
      <div className="group relative w-full h-full">
        <span
          onClick={handleClick}
          className="text-slate-200 hidden group-hover:block z-40 bg-[#252830] hover:bg-slate-700 absolute right-0 m-1 rounded-md text-lg p-2 cursor-pointer"
        >
          <FullScreen className="size-5" />
        </span>

        {isTemplate ? (
          <>
            <CustomSandpackPreview
              template={content.templateType}
              files={content.files}
              dependencies={content.dependencies}
              devDependencies={content.devDependencies}
              className="pointer-events-none bg-white h-full rounded-lg -z-10"
            />
          </>
        ) : (
          <iframe
            className="pointer-events-none bg-white bg-cover rounded-lg"
            srcDoc={outputDoc}
            title="output"
            sandbox="allow-scripts"
            height="100%"
            width="100%"
          />
        )}
      </div>

      <div className="flex items-center justify-between relative">
        <p>{title}</p>
        <div>
          {isPopoverOpen && (
            <ul
              ref={modal}
              className="text-xs p-2 w-[12rem] rounded-md absolute right-0 bottom-5 bg-[#131417]"
            >
              {/* <li 
                
                className="cursor-pointer flex items-center gap-2 hover:bg-blue-500 p-1"><Collection className="size-4"/> Add to Collection</li> */}
              {type === "public" && (
                <li
                  onClick={toggleType}
                  className="cursor-pointer flex items-center gap-2 hover:bg-green-500 p-1"
                >
                  <Lock className="size-4 fill-white" /> Make Private{" "}
                </li>
              )}
              {type === "private" && (
                <li
                  onClick={toggleType}
                  className="cursor-pointer flex items-center gap-2 hover:bg-green-500 p-1"
                >
                  <Unlock className="size-4 fill-white" /> Make Public
                </li>
              )}

              <li
                onClick={handleDelete}
                className="cursor-pointer flex items-center gap-2 hover:bg-red-500 p-1"
              >
                {" "}
                <Delete className="size-4 fill-white" /> Delete
              </li>
            </ul>
          )}

          <HorizontalThreeDots
            onClick={() => setIsPopoverOpen(true)}
            className={clsx(
              "fill-[#5A5F73] size-5 cursor-pointer hover:fill-slate-200",
              isPopoverOpen && "fill-slate-200"
            )}
          />
        </div>
      </div>
      {/* <div className="flex gap-2">
             <Button  className="flex items-center" id="likes"><Heart className="size-5"/> <span>0</span></Button>
             <Button className="flex items-center" id="comments"><Comment className="size-4"/> <span>0</span></Button>
             <Button className="flex items-center" id="views"><View className="size-4"/> <span>0</span></Button>
           </div> */}
    </div>
  );
};

export default WorkCard;
