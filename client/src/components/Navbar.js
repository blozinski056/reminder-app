import React from "react";

export default function Navbar({ setModal }) {
  const [showLogin, setShowLogin] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginCreds, setLoginCreds] = React.useState([]);
  const [username, setUsername] = React.useState("");

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then(res => res.json())
  //     .then(data => setLoginCreds(data.users));
  // }, [])

  function close() {
    setShowLogin(false);
  }

  // function login(e) {
  //   e.preventDefault();
  //   const un = document.querySelector(".login-username").value;
  //   const pw = document.querySelector(".login-password").value;
  //   let verified = false;

  //   loginCreds.forEach((user) => {
  //     console.log(`${user.username}, ${user.password}`);
  //     if (user.username === un && user.password === pw) {
  //       verified = true;
  //       setUsername(user.username);
  //     }
  //   });

  //   console.log(verified);

  //   if (verified) {
  //     const form = document.querySelector(".login-form");
  //     document.querySelector(".dropdown-container").removeChild(form);
  //     document.querySelector(".login-verified").classList.add("reveal2");
  //     setTimeout(() => {
  //       setShowLogin(false);
  //       document.querySelector(".login-verified").classList.remove("reveal2");
  //       setLoggedIn(true);
  //     }, 2000);
  //   } else {
  //     document.querySelector(".login-incorrect").classList.remove("reveal1");
  //     setTimeout(() => {
  //       document.querySelector(".login-incorrect").classList.add("reveal1");
  //     }, 100);
  //   }
  // }

  return (
    <nav>
      <button
        className="new-reminder"
        onClick={() => setModal(1)}
      >
        + New Reminder
      </button>
      <h1 className="title">RemindMe</h1>

      {/* {!loggedIn && (
        <button
          className="login-button"
          onClick={() => setShowLogin((prevShow) => !prevShow)}
        >
          Sign In
        </button>
      )}
      {loggedIn && (
        <button
          className="login-button"
          onClick={() => setLoggedIn(false)}
        >
          Sign Out
        </button>
      )} */}
    </nav>
  );
}
