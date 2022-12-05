import React from "react";

export default function HomePage({ setLoggedIn, setUsername }) {
  const [signupError, setSignupError] = React.useState(0);

  async function login(e) {
    e.preventDefault();
    try {
      const un = document.querySelector(".login-username").value;
      const response = await fetch(`http://localhost:5000/users/${un}`);
      const jsonData = await response.json();
      setUsername(jsonData.username);
      setLoggedIn(true);
    } catch (err) {
      document.querySelector(".login-incorrect").classList.remove("reveal1");
      setTimeout(() => {
        document.querySelector(".login-incorrect").classList.add("reveal1");
      }, 100);
    }
  }

  async function signup(e) {
    e.preventDefault();
    const un = document.querySelector(".signup-username").value;
    const pw = document.querySelector(".signup-password").value;
    const pwConfirm = document.querySelector(".signup-password-confirm").value;
    try {
      if (pw === pwConfirm) {
        const body = { username: un, password: pw };
        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        setUsername(un);
        setLoggedIn(true);
      } else {
        setSignupError(2);
        document.querySelector(".signup-incorrect").classList.remove("reveal1");
        setTimeout(() => {
          document.querySelector(".signup-incorrect").classList.add("reveal1");
        }, 100);
      }
    } catch (err) {
      setSignupError(1);
      console.error(err.message);
    }
  }

  return (
    <section className="homepage">
      <div className="homepage-title">RemindMe</div>

      <div className="homepage-login">
        <h1 className="login-title">LOG IN</h1>
        <form
          className="login-form"
          onSubmit={login}
        >
          <h5 className="login-incorrect">Incorrect username/password.</h5>
          <input
            className="login-username"
            placeholder="Username"
            required="required"
          />
          <input
            className="login-password"
            placeholder="Password"
            required="required"
          />
          <input
            className="login-button"
            type="submit"
            value="Log In"
          />
        </form>
      </div>

      <div className="homepage-signup">
        <h1 className="login-title">SIGN UP</h1>

        <form
          className="signup-form"
          onSubmit={signup}
        >
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
          <input
            className="signup-button"
            type="submit"
            value="Sign Up"
          />
        </form>
      </div>
    </section>
  );
}
