import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

export default function Room({roomId, children}) {
    const x = `${roomId}` ?? "nextjs-liveblocks";
  return (
    <div className="flex justify-center">
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
    </div>
  )
}
