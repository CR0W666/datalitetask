import { useState } from "react";
import { firestore, auth, useCollectionDataHook } from "../Firebase";

import { RoomSelection } from "./RoomSelection";
import { ChatRoom } from "./ChatRoom";

export function Content() {
  function joinRoom(id) {
    setRoomID(id);
  }

  function leaveRoom(e) {
    e.preventDefault();
    setRoomID(null);
  }

  const roomsRef = firestore.collection("ChatRooms");
  const query = roomsRef.orderBy("createdAt"); //.limit(25);
  const [rooms] = useCollectionDataHook(query, { idField: "id" });
  const [roomID, setRoomID] = useState(null);

  function getRoomData(roomID) {
    return rooms.find((room) => room.id === roomID);
  }
  
  return (
    <>
      {roomID !== null ? (
        <ChatRoom leaveRoomFn={leaveRoom} roomData={getRoomData(roomID)} />
      ) : (
        <RoomSelection
          roomsRef={roomsRef}
          joinRoomFn={joinRoom}
          rooms={rooms}
        />
      )}
    </>
  );
}
