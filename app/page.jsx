import Main from "@/components/Main"
import Navbar from "./Navbar"
import { auth } from "@/auth"


export default async  function Home() {
  const session = await auth();
return <>
  <Navbar/>
<Main/>
</>
}
