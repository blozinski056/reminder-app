import React from "react"

export default function Navbar({setModal, loggedIn, setLoggedIn}) {

  return (
    <nav>
      <button className="new-reminder" onClick={() => setModal(1)}>
        + New Reminder
      </button>
      <h1 className="title">RemindMe</h1>
      {/* <button className="login">Login</button> */}

      {!loggedIn && 
        <button className="login-button" onClick={() => setLoggedIn(prevLogin => !prevLogin)}>Login</button>
      }
      {loggedIn && 
        <button className="login-button" onClick={() => setLoggedIn(false)}>Sign Out</button>
      }
    </nav>
  )
}