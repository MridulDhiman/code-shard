import Main from "@/components/Main"
import Navbar from "./Navbar"
import { auth } from "@/auth"
import { redirect } from "next/navigation";


export default async  function Home() {
  const session = await auth();
  if(session) {
    redirect("/your-work");
  }
return <>
  <Navbar/>
<Main/>
</>
}
