"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOutHandler } from "@/lib/actions";
import {v4 as uuidV4} from "uuid";
import Search from "@/components/ui/icons/Search";

import { useEffect, useState } from "react";


export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
    const {data: session} = useSession();
    const router = useRouter();
    console.log("navbar session: ", session);

    const searchHandler = () => {
      if(!searchQuery) {
        // alert("Nothing there to search!");
        return;
      }

      

    }

    useEffect(()=> {
router.refresh();
    }, [router]);
    

  return (
    <div className="flex mx-2 my-4  gap-4 items-center text-sm">
    <h1 className="text-2xl tracking-widest"><Link href="/">CODESHARD</Link></h1>
    <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 bg-[#252830] p-2 rounded-lg"><Search onClick={searchHandler}  className=" size-4 fill-[#717790] cursor-pointer" /><input className="w-[65vw] outline-none caret-white text-white bg-[#252830]"  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Shards..."/> </div> 
          <button
          className="text-sm hover:text-slate-300"
           onClick={
          ()=> {
            const uuid = uuidV4();
            router.push(`/shard/${uuid}`); 
          }
        }>{ session ? "Start Coding" : "Try Editor"}</button>

        {session ?
         <>
         
         <p className="hover:text-slate-300 cursor-pointer">{session.user?.name}</p> 
         <form action={signOutHandler}>
         <button className="hover:text-slate-300" type="submit">Signout</button>
         </form>
         
         </>: 
        <>
         <Link className="cursor-pointer bg-[#47cf73] hover:bg-[#248C46] text-black px-2 py-2 rounded-md text-sm" href="/register">Signup</Link>
        <Link className="hover:text-slate-300 text-sm cursor-pointer" href="/login">Signin</Link>
        </>
      }
       
    </div>
</div>
  )
}
