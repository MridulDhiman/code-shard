import RoomsList from "@/components/RoomsList";
import Navbar from "../app/Navbar";
import { auth } from "@/auth";

    
const fetchRooms = async () => {
    const url = process.env.HOST_URL;
    const res = await fetch(`${url}/api/room`, {
        cache: "no-cache",
        next: { tags: ['rooms'] }
    });

    const data = await res.json();
    return data;
}
const  RoomListPage =  async () => {
    const session = await auth();
    // connectToDB();
  
    if(!session) {
      redirect("/login");
    }

    
    
    
let rooms = await fetchRooms();
   console.log(rooms);
  return (
    <div>
        <Navbar/>
    <RoomsList rooms={rooms}/>
    </div>
  )
}

export default RoomListPage;