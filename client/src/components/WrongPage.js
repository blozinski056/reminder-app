import React from "react";
import { useNavigate } from "react-router-dom";

export default function WrongPage() {
  const navigate = useNavigate();
  React.useEffect(() => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  }, [navigate]);
  return (
    <section className="wrong-page">
      <h1>Redirecting to login page...</h1>
    </section>
  );
}
