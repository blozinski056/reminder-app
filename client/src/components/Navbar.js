import React from "react";

export default function Navbar({ setModal, username, signOut }) {
  return (
    <nav>
      <button className="new-reminder" onClick={() => setModal(1)}>
        + New Reminder
      </button>
      <h1 className="title">RemindMe</h1>
      <div className="account-container">
        <h3>
          Hello <span>{username}!</span>
        </h3>
        <button className="sign-out" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}
