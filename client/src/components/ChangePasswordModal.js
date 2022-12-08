import React from "react";

export default function ChangePasswordModal({
  setModal,
  pwError,
  setPwError,
  updatePassword,
}) {
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
