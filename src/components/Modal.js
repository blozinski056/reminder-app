import React from "react"

export default function Modal({setModal, createTileInfo, getDateTime}) {
  const minDate = new Date((new Date(getDateTime()).getTime() + 60000)).toISOString().slice(0, -8);
  function submitClose(e) {
    e.preventDefault();
    const reminder = document.querySelector(".modal-component.reminder").value
    const description = document.querySelector(".modal-component.description").value
    const dt = document.querySelector(".modal-component.datetime").value
    createTileInfo(reminder, description, dt);
    setModal(false);
  }
  
  return (
    <div>
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <button className="modal-component exit" onClick={() => setModal(false)}>+</button>
        <form className="modal-form" onSubmit={submitClose}>
          <input
            className="modal-component reminder"
            type="text"
            placeholder="New Reminder"
            required="required"
            autoFocus
          />
          <textarea
            className="modal-component description"
            placeholder="Description"
          />
          <input
            className="modal-component datetime"
            type="datetime-local"
            min={minDate}
            defaultValue={minDate}
            required="required"
          />
          <input
            className="modal-component submit"
            type="submit"
          />
        </form>
      </div>
    </div>
  )
}