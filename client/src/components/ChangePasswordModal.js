import React from "react";

export default function ChangePasswordModal({
  username,
  setModal,
  pwError,
  setPwError,
}) {
  // Update password of account
  async function updatePassword(e) {
    e.preventDefault();
    const oldPW = document.querySelector(".old-pw").value;
    const newPW = document.querySelector(".new-pw").value;

    try {
      const response = await fetch(`http://localhost:5000/users/${username}`);
      const jsonData = await response.json();

      if (jsonData.password !== oldPW) {
        // if user input incorrect old password
        setPwError(0);
        setTimeout(() => {
          setPwError(1);
        }, 10);
      } else if (oldPW === newPW) {
        // if user input same new password as old password
        setPwError(0);
        setTimeout(() => {
          setPwError(2);
        }, 10);
      } else {
        // if password combination has no errors
        try {
          const body = { oldPassword: oldPW, newPassword: newPW };
          const response = await fetch(
            `http://localhost:5000/users/${username}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );
          if (response) {
            const formElm = document.querySelector(".cp-form");
            while (formElm.firstChild) {
              formElm.removeChild(formElm.firstChild);
            }
            const formElmChild = document.createElement("h3");
            formElmChild.innerText = "Your password was updated!";
            formElmChild.style.textAlign = "center";

            formElm.appendChild(formElmChild);
            formElmChild.classList.add("display");
            setTimeout(() => {
              setPwError(0);
              setModal(0);
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
    <div className="change-password">
      <button
        className="exit"
        onClick={() => {
          setModal(0);
          setPwError(0);
        }}
      >
        +
      </button>
      <form className="cp-form" onSubmit={(e) => updatePassword(e)}>
        <h3>CHANGE PASSWORD</h3>
        {pwError === 1 && (
          <h4 className="cp-form-incorrect">Incorrect password!</h4>
        )}
        {pwError === 2 && (
          <h4 className="cp-form-incorrect">Cannot use the same password!</h4>
        )}
        <h4>Old Password:</h4>
        <input
          type="password"
          className="old-pw"
          placeholder="Old Password"
          required
        />
        <h4>New Password:</h4>
        <input
          type="password"
          className="new-pw"
          placeholder="New Password"
          required
        />
        <input type="submit" className="cp-form-submit" value="Update" />
      </form>
    </div>
  );
}
