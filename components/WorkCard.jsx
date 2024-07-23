"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Heart from "./ui/icons/Heart";
import Comment from "./ui/icons/Comment";
import Delete from "./ui/icons/Delete";
import Lock from "./ui/icons/Lock";
import Unlock from "./ui/icons/Unlock";
import FullScreen from "./ui/icons/FullScreen";
import HorizontalThreeDots from "./ui/icons/HorizontalThreeDots";
import CustomSandpackPreview from "./CustomSandpackPreview";
import Pencil from "./ui/icons/Pencil";
import { saveShardName, updateLikes } from "@/lib/actions";
import Button from "./ui/Button";
import { toast, Toaster } from "sonner";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CommentTextBox from "./CommentTextbox";
import { CommentsArea } from "./CommentsArea";
import { getThreadedComments } from "@/utils";
import { useActiveComment } from "@/context/CommentContext";

const WorkCard = ({
  content: initialContent,
  isTemplate,
  title,
  id,
  type: initialType,
  likes: initialLikes,
  likeStatus: initialLikeStatus,
  comments: initialComments,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [isDeleted, setIsDeleted] = useState(false);
  const [type, setType] = useState(initialType);
  const [pencilClicked, setPencilClick] = useState(false);
  const [shardName, setShardName] = useState(title);
  const [likes, setLikes] = useState(initialLikes);
  const [likeStatus, setLikeStatus] = useState(initialLikeStatus);
  const { comments, setComments, setShardId } = useActiveComment();
  const { data: session } = useSession();
  const modal = useRef();

  useEffect(() => {
    let toastId;
    if (!session) {
      toastId = toast.error("Authentication Error");
      window.location.href = "/login";
    }
    return () => {
      toast.dismiss(toastId);
    };
  });

  useEffect(() => {
    setComments(JSON.parse(initialComments));
    setShardId(id);
  }, []);

  useEffect(() => {
    setType(type);
  }, [type]);

  const onClick = () => {
    setPencilClick(true);
  };

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Enter") {
        setPencilClick(false);
        if (shardName !== "") {
          saveShardName(id, shardName)
            .then(() => console.log("success"))
            .catch((err) => {
              console.log("could not save shard name");
              setShardName(title);
              window.alert("Could not save shard title");
            });
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

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
      "Are you sure you want to proceed with this action?",
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

  const handleLikes = async () => {
    if (likeStatus === "liked") {
      setLikes((prev) => {
        return prev - 1;
      });
      setLikeStatus("unliked");
      await updateLikes(id, likes, "unliked", session?.user?.email);
    } else if (likeStatus === "unliked") {
      setLikes((prev) => {
        return prev + 1;
      });

      setLikeStatus("liked");
      await updateLikes(id, likes, "liked", session?.user?.email);
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col bg-[#1E1F26] rounded-xl  p-4 gap-3",
        isDeleted && "hidden",
      )}
    >
      <div className="group relative w-full h-full">
        <span
          onClick={handleClick}
          className="text-slate-200 hidden group-hover:block z-20 bg-[#252830] hover:bg-slate-700 absolute right-0 m-1 rounded-md text-lg p-2 cursor-pointer"
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
              className="pointer-events-none  bg-white h-[12rem] rounded-lg"
            />
          </>
        ) : (
          <iframe
            className="pointer-events-none bg-white bg-cover rounded-[0.2rem]"
            srcDoc={outputDoc}
            title="output"
            sandbox="allow-scripts"
            height="100%"
            width="100%"
          />
        )}
      </div>

      <div className="flex items-center justify-between relative">
        <div className="flex gap-1">
          {pencilClicked && (
            <input
              className="bg-transparent outline-none"
              type="text"
              onChange={(e) => setShardName(e.target.value)}
              value={shardName}
              placeholder={shardName}
            />
          )}
          {!pencilClicked && (
            <>
              <p>{shardName}</p>
              <Pencil
                onClick={onClick}
                className={
                  "size-5 fill-white hover:fill-slate-400 hover:cursor-pointer"
                }
              />
            </>
          )}
        </div>
        <div>
          {isPopoverOpen && (
            <ul
              ref={modal}
              className="text-xs p-2 w-[12rem] rounded-md absolute right-0 bottom-5 bg-[#131417]"
            >
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
              isPopoverOpen && "fill-slate-200",
            )}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleLikes}
          className="flex items-center bg-black hover:bg-red-500 text-white"
          id="likes"
        >
          <Heart className="size-5 fill-white" /> <span>{likes}</span>
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button
              className="flex items-center hover:bg-blue-500 bg-black text-white"
              id="comments"
            >
              <Comment className="size-4 fill-white" />{" "}
              <span>{comments.length}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white p-2 text-black">
            <CommentTextBox />
            <CommentsArea />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default WorkCard;
