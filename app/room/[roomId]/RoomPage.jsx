"use client";

import CollaborativeShard from "@/components/CollaborativeShard";
import RoomNavbar from "./RoomNavbar";
import Room from "@/components/Room";

import { useRef } from "react";
import LiveCursors from "@/components/LiveCursors";

const RoomPage = ({ roomId, title }) => {
  const cursorPanel = useRef(null);
  return (
    <Room roomId={roomId}>
      <div ref={cursorPanel}>
        {/* <LiveCursors cursorPanel={cursorPanel} /> */}
          <RoomNavbar title={title} roomId={roomId} />
          <CollaborativeShard roomId={roomId} />
      </div>
    </Room>
  );
};

export default RoomPage;
