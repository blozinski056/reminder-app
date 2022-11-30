import React from "react"

export default function Login({setLoggedIn}) {
  const [loginCreds, setLoginCreds] = React.useState([]);

  React.useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => setLoginCreds(data.users));
  }, [])
  
  function close() {
    setLoggedIn(false);
  }
  
  function login(e) {
    e.preventDefault();
    const un = document.querySelector(".login-username").value;
    const pw = document.querySelector(".login-password").value;
    let verified = false;

    loginCreds.forEach((user) => {
      console.log(`${user.username}, ${user.password}`);
      if(user.username === un && user.password === pw) {
        verified = true;
      }
    })

    if(!verified) {
      document.querySelector(".login-incorrect").classList.remove("reveal");
      setTimeout(() => {
        document.querySelector(".login-incorrect").classList.add("reveal");
      }, 100);
    } else {
      // show login popup
      // remove form element
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