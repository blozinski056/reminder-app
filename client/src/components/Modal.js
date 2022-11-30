import React from "react"

export default function Modal({setModal, getDateTime, createTile}) {
  // Gets current date and time
  const minDate = new Date((new Date(getDateTime()).getTime() + 60000)).toISOString().slice(0, -8);

  // Collects info for the new tile
  function submitClose(e) {
    e.preventDefault();
    const reminder = document.querySelector(".modal-reminder").value
    const description = document.querySelector(".modal-description").value
    const dt = document.querySelector(".modal-datetime").value
    createTile(reminder, description, dt);
    setModal(0);
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-exit" onClick={() => setModal(0)}>+</button>
        <form onSubmit={submitClose}>
          <input
            className="modal-reminder"
            type="text"
            placeholder="New Reminder"
            required="required"
            autoFocus
          />
          <textarea
            className="modal-description"
            placeholder="Description"
          />
          <input
            className="modal-datetime"
            type="datetime-local"
            min={minDate}
            defaultValue={minDate}
            required="required"
          />
          <input
            className="modal-submit"
            type="submit"
          />
        </form>
      </div>
    </div>
  )
}