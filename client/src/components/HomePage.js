import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage({ setLoggedIn }) {
  const [signupError, setSignupError] = React.useState(0);
  const [loginError, setLoginError] = React.useState(false);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const un = document.querySelector(".login-username").value;
      const pw = document.querySelector(".login-password").value;
      const response = await fetch(
        `https://reminder-app-bloz.herokuapp.com/api/users/${un}`
      );
      const jsonData = await response.json();
      // check if passwords match
      if (jsonData.password === pw) {
        setLoggedIn(true);
        navigate(`/${jsonData.username}`, { replace: true });
      } else {
        setLoginError(true);
        document.querySelector(".login-incorrect").classList.remove("reveal1");
        setTimeout(() => {
          document.querySelector(".login-incorrect").classList.add("reveal1");
        }, 100);
      }
    } catch (err) {
      setLoginError(true);
      // if username does not exist
      document.querySelector(".login-incorrect").classList.remove("reveal1");
      setTimeout(() => {
        document.querySelector(".login-incorrect").classList.add("reveal1");
      }, 100);
    }
  }

  // POSTs new user to database
  async function signup(e) {
    e.preventDefault();
    const si = document.querySelector(".signup-incorrect");
    const un = document.querySelector(".signup-username").value;
    const pw = document.querySelector(".signup-password").value;
    const pwConfirm = document.querySelector(".signup-password-confirm").value;

    // check for matching passwords
    if (pw !== pwConfirm) {
      setSignupError(2);
      si.classList.remove("reveal1");
      setTimeout(() => {
        si.classList.add("reveal1");
      }, 100);
    } else {
      // if passwords match then fetch data in try-catch
      try {
        const body = { username: un, password: pw };
        const response = await fetch(
          "https://reminder-app-bloz.herokuapp.com/api/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        const jsonData = await response.json();
        // check if username already exists
        if (jsonData.duplicate === "duplicate") {
          setSignupError(1);
          si.classList.remove("reveal1");
          setTimeout(() => {
            si.classList.add("reveal1");
          }, 100);
        } else {
          // if username does not exist, then redirect to username page (login)
          setLoggedIn(true);
          navigate(`/${jsonData.username}`, { replace: true });
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  return (
    <section className="homepage">
      <div className="homepage-title">RemindMe</div>

      <div className="homepage-login">
        <h1 className="login-title">LOG IN</h1>
        <form className="login-form" onSubmit={(e) => login(e)}>
          <h5 className="login-incorrect">
            {loginError && "Incorrect username/password."}
          </h5>
          <input
            className="login-username"
            placeholder="Username"
            required="required"
          />
          <input
            className="login-password"
            placeholder="Password"
            type="password"
            required="required"
          />
          <input className="login-button" type="submit" value="Log In" />
        </form>
      </div>

      <div className="homepage-signup">
        <h1 className="login-title">SIGN UP</h1>

        <form className="signup-form" onSubmit={(e) => signup(e)}>
          <h5 className="signup-incorrect">
            {signupError === 1 && "Username already exists!"}
            {signupError === 2 && "Passwords do not match!"}
          </h5>
          <input
            className="signup-username"
            placeholder="Username"
            required="required"
          />
          <input
            className="signup-password"
            placeholder="Password"
            type="password"
            required="required"
          />
          <input
            className="signup-password-confirm"
            placeholder="Confirm Password"
            type="password"
            required="required"
          />
          <input className="signup-button" type="submit" value="Sign Up" />
        </form>
      </div>
    </section>
  );
}
