import React from "react";

export default function DeleteAccountModal({
  setModal,
  pwError,
  setPwError,
  deleteAccount,
}) {
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
