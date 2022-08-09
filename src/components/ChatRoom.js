import { useRef, useState } from "react";
import { auth, firebase, firestore, useCollectionDataHook } from "../Firebase";
import './ChatRoom.css';

export function ChatRoom(props) {
  const {
    leaveRoomFn,
    roomData
  } = props;



  return <Chat leaveRoomFn={leaveRoomFn} roomData={roomData} />;
}

function Chat(props) {
  const { leaveRoomFn, roomData } = props;
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");

  return (
    <>
      <button className="back-bttn" onClick={leaveRoomFn}>{"<"}</button>
      <main>
        <MessageHistory messagesRef={messagesRef} roomData={roomData}/>
        <span ref={dummy}></span>
      </main>
      <MessageForm messagesRef={messagesRef} dummy={dummy} roomData={roomData}/>
    </>
  );
}

function MessageHistory(props) {
  const { messagesRef, roomData } = props;

  const query = messagesRef.orderBy("createdAt"); //.limit(25);
  const [messagess] = useCollectionDataHook(query, { idField: "id" });
  let messages = messagess
  if (messages) { messages = messages.filter((message) => message.roomID === roomData.id)}  
  
  return (
    messages &&
    messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const imgSrc =
    photoURL ||
    "https://i.pinimg.com/564x/3e/51/b7/3e51b7003375fb7e9e9c233a7f52c79e.jpg";
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={imgSrc} alt="user" />
        <p>{text}</p>
      </div>
    </>
  );
}

function MessageForm(props) {
  const { messagesRef, dummy, roomData } = props;
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const roomID = roomData.id;
    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      roomID
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={sendMessage}>
      <input
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        placeholder="send message..."
      />

      <button type="submit" disabled={!formValue}>
        Send
      </button>
    </form>
  );
}
