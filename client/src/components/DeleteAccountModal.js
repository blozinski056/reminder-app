import React from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteAccountModal({
  username,
  setModal,
  pwError,
  setPwError,
}) {
  const navigate = useNavigate();

  // Delete account
  async function deleteAccount(e) {
    e.preventDefault();
    const pw = document.querySelector(".da-form-password").value;

    try {
      const response = await fetch(
        `https://reminder-app-bloz.herokuapp.com/api/users/${username}`
      );
      const jsonData = await response.json();
      if (jsonData.password !== pw) {
        // do somethng to show wrong pw
        setPwError(0);
        setTimeout(() => {
          setPwError(3);
        }, 10);
      } else {
        // if password is correct
        try {
          const body = { password: pw };
          const response = await fetch(
            `https://reminder-app-bloz.herokuapp.com/api/users/${username}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );
          if (response) {
            const formElm = document.querySelector(".da-form");
            while (formElm.firstChild) {
              formElm.removeChild(formElm.firstChild);
            }
            const formElmChild = document.createElement("h3");
            formElmChild.innerText = "Account deleted!";
            formElmChild.style.textAlign = "center";

            formElm.appendChild(formElmChild);
            formElmChild.classList.add("display");
            setTimeout(() => {
              setPwError(0);
              setModal(0);
              navigate("/");
            }, 1500);
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="delete-account">
      <button
        className="exit"
        onClick={() => {
          setModal(0);
          setPwError(0);
        }}
      >
        +
      </button>
      <form className="da-form" onSubmit={(e) => deleteAccount(e)}>
        <h3>DELETE ACCOUNT</h3>
        <h5>If you would like to delete your account, enter your password:</h5>
        {pwError === 3 && (
          <h5 className="da-form-incorrect">Incorrect password!</h5>
        )}
        <input
          type="password"
          className="da-form-password"
          placeholder="Password"
          required
        />
        <input type="submit" className="da-form-submit" />
      </form>
    </div>
  );
}
