import { firestore, auth, useCollectionDataHook } from "../Firebase";

// !! NO WORKING CODE BELOW !!
//let joinedRoomID = null;
export function RoomSelection(props) {
  const { roomsRef, rooms, joinRoomFn } = props;
  

  const roomsNum = rooms !== undefined ? rooms.length : 0;

  return (
    <>
      {rooms && rooms.map((room) => <RoomBttn key={room.id} room={room} joinRoomFn={joinRoomFn}/>)}
      <br></br>
      <NewRoomBttn roomsRef={roomsRef} roomsNum={roomsNum} />
    </>
  );
}

function RoomBttn(props) {
  const { room, joinRoomFn } = props;

  return (
    <button className="room-bttn" onClick={() => joinRoomFn(room.id)}>
      {room.name}
    </button>
  );
}

function NewRoomBttn(props) {
  function makeRoom(props) {
    const { roomsRef, roomsNum } = props;

    let name = prompt("Enter a name for your chat room");
    let password = prompt("Enter your password (leave blank if no password)");

    const id = roomsNum;
    const createdAt = new Date();
    const createdBy = auth.currentUser.uid;
    let messages = [];
    let members = [];

    roomsRef.add({
      name,
      password,
      id,
      createdAt,
      createdBy,
      messages,
      members,
    });
  }

  return (
    <button className="new-room-bttn" onClick={() => makeRoom(props)}>
      Create a new room
    </button>
  );
}
