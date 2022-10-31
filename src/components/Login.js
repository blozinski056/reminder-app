import React from "react"

export default function Login({setLogin, setShowSignOut, contains, loginSavedTile, setInfoTiles}) {
  function close() {
    setLogin(false);
  }

  function login(e) {
    e.preventDefault();
    const un = document.querySelector(".login-username").value;
    const pw = document.querySelector(".login-password").value;
    // with backend: pull from database
    if(un === "admin" && pw === "admin") {
      document.querySelector(".login-incorrect").classList.add("hidden");
      // with backend: pull user's reminders from database and compare with list
      // without database: using a premade tile 'loginSavedTile'
      if(!contains(loginSavedTile)) {
        setInfoTiles(prevTiles => [loginSavedTile, ...prevTiles]);
      }
      setShowSignOut(true);
      setLogin(false);
    } else {
      document.querySelector(".login-incorrect").classList.remove("hidden");
    }
  }

  return (
    <div className="login">
      <div className="login-overlay" onClick={close}></div>
      <div className="login-arrow"></div>
      <div className="login-arrow-coverup"></div>
      <form className="login-dropdown" onSubmit={login}>
        <h5 className="login-incorrect hidden">Incorrect username/password.</h5>
        <div className="input username">
          <input className="login-username" required="required" />
          <span className="username-placeholder">Username</span>
        </div>
        <div className="input password">
          <input className="login-password" required="required" />
          <span className="password-placeholder">Password</span>
        </div>
        <input className="login-signin" type="submit" value="Login" />
      </form>
    </div>
  )
}