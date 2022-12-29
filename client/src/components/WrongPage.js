import React from "react";
import { useNavigate } from "react-router-dom";

export default function WrongPage() {
  const navigate = useNavigate();
  React.useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem("loggedIn", JSON.stringify(false));
      window.localStorage.setItem("username", JSON.stringify(""));
      navigate("/", { replace: true });
    }, 1500);
  }, [navigate]);

  return (
    <section className="wrong-page">
      <h1>Redirecting to login page...</h1>
    </section>
  );
}
