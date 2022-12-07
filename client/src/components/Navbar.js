import React from "react";

export default function Navbar({ setModal, username, signOut }) {
  function revealToggle() {
    const elm = document.querySelector(".dropdown");
    const arrow = document.querySelector(".dropdown-arrow");
    if (elm.classList.contains("reveal2")) {
      elm.classList.remove("reveal2");
      arrow.classList.add("rotate-down");
      arrow.classList.remove("rotate-up");
    } else {
      elm.classList.add("reveal2");
      arrow.classList.add("rotate-up");
      arrow.classList.remove("rotate-down");
    }
  }

  function closeDropdown(modalNum) {
    const elm = document.querySelector(".dropdown");
    const arrow = document.querySelector(".dropdown-arrow");
    elm.classList.remove("reveal2");
    arrow.classList.add("rotate-down");
    arrow.classList.remove("rotate-up");
    setModal(modalNum);
  }

  return (
    <nav>
      <button className="new-reminder" onClick={() => setModal(1)}>
        + New Reminder
      </button>
      <h1 className="title">RemindMe</h1>
      <div className="account-container">
        <h3>Hello {username}!</h3>
        <div className="dropdown-button" onClick={() => revealToggle()}>
          <img
            className="dropdown-arrow"
            src="./images/back-icon.png"
            alt="down arrow"
          />
        </div>
        <div className="dropdown">
          <button className="change-pw" onClick={() => closeDropdown(3)}>
            Change Password
          </button>
          <button className="delete-acc" onClick={() => closeDropdown(4)}>
            Delete Account
          </button>
        </div>
        <button className="sign-out" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}
