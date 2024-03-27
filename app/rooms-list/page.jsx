import RoomsList from "@/components/RoomsList";
import Navbar from "../Navbar";


const fetchRooms = async () => {
const res = await fetch(`${process.env.HOST_URL}/api/room`, {
    cache: "no-cache",
    next: {
        tags: ['rooms']
    }
});

const data = await res.json();
return data;
}
const Rooms = async () => {

    const rooms = await fetchRooms();
console.log(rooms);
  return (
    <>
    <Navbar/>
    <RoomsList rooms={rooms}/>
    </>
  )
}

export default Rooms;