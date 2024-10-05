"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CommentTextBox from "./CommentTextbox";
import { CommentsArea } from "./CommentsArea";
import { useActiveComment } from "@/context/CommentContext";

export default function CommonCard() {
  return <></>;
}
