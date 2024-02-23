import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

export default function Room({roomId, id, children}) {
    const x = `${roomId}-${id}` ?? "nextjs-liveblocks";
  return (
    <>
    <RoomProvider
    id={x}
    initialPresence={{
        cursor:null
    }}
    >
        <ClientSideSuspense fallback={<p className="text-black">Loading...</p>}>
            {()=> children}
        </ClientSideSuspense>
    </RoomProvider>
    </>
  )
}
