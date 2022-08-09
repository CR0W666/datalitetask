import React from "react";
import "./App.css";

import { auth } from "./Firebase";

import { useAuthState } from "react-firebase-hooks/auth";

import { SignIn, SignOut } from "./components/Auth";
import { Content } from "./components/Content";

// TODO: Add room functionality and selection
// password locked rooms

export function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Data Lite Task</h1>
        <SignOut />
      </header>
      <section>{user ? <Content /> : <SignIn />}</section>
    </div>
  );
}

export default App;
