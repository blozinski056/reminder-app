import React from "react"

export default function Navbar({setModal}) {

  return (
    <nav>
      <button className="new-reminder" onClick={() => setModal(1)}>
        + New Reminder
      </button>
      <h1 className="title">RemindMe</h1>
      <button className="login">Login</button>
    </nav>
  )
}