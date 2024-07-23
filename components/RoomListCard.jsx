"use client";

import { writeToClipboard } from "@/utils";
import React, { useState } from "react";
import CopyLink from "./ui/icons/Link";
import Delete from "./ui/icons/Delete";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const RoomListCard = ({ index, id, rooms, setRooms, title, onLinkCopy }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();

  const handleDelete = (id) => {
    const isConfirmed = confirm(
      "Are you sure you want to proceed with this action?",
    );
    if (isConfirmed) {
      setIsDeleted(true);
      setRooms((prev) => {
        return prev.filter((room) => room?._id !== id);
      });
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
          router.refresh();
          console.log("response error: ", error.message);
        });
    }
  };
  return (
    <li className={clsx("flex justify-center text-sm", isDeleted && "hidden")}>
      <span className="border border-r-0 p-2  border-white">{index + 1}. </span>
      <span className="border p-2 border-r-0 border-white">{title}</span>
      <span className="border p-2  border-r-0 border-white">{id}</span>
      <span
        onClick={() => {
          writeToClipboard(id);
          onLinkCopy();
        }}
        className="border p-2 cursor-pointer   border-white"
      >
        <CopyLink fill="white" className={"size-4"} />
      </span>
      <span
        onClick={() => handleDelete(id)}
        className="cursor-pointer flex items-center border border-l-0  hover:bg-red-500 p-2"
      >
        {" "}
        <Delete className="size-4 fill-white" />
      </span>
    </li>
  );
};

export default RoomListCard;

/*

"use client";
import clsx from 'clsx';
import {useState} from 'react'
import Delete from './ui/icons/Delete';
import { writeToClipboard } from '@/utils';
import { useRouter } from 'next/navigation';
import CopyLink from './ui/icons/Link';
import React from "react";


const RoomListCard = (index,title, id, onLinkCopy) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const router = useRouter();

    const handleDelete = (id) => {
      
        const isConfirmed = confirm("Are you sure you want to proceed with this action?");
        if(isConfirmed) {
          setIsDeleted(true);
          fetch(`/api/shard/${id}`, {
            method: "DELETE"
          })
          .then((res)=> res.json())
          .then((data) => {
            console.log("response success: ", data);
            router.refresh();
          })
          .catch((error) => {
            setIsDeleted(false);
            console.log("response error: ", error.message)})
        }
      }


  return (
    <li className={clsx(
        'flex justify-center text-sm',
        isDeleted && 'hidden'
        )}>
      
      <span>hello .</span>
         {/* <span className='border border-r-0 p-2  border-white'>{index+1}. </span>
           <span className='border p-2 border-r-0 border-white'>{title}</span>
           <span className='border p-2  border-r-0 border-white'>{id}</span>
           <span onClick={()=> { 
            writeToClipboard(id);
              onLinkCopy();
            }} className='border p-2 cursor-pointer   border-white'><CopyLink fill="white"  className={"size-4"}/></span>
            <span
            onClick={()=> handleDelete(id)}
            className="cursor-pointer flex items-center border border-l-0  hover:bg-red-500 p-2"> <Delete className="size-4 fill-white"/></span> 
      
            // </li>
        //     )
        //   }
          
        //   export default RoomListCard;
*/
