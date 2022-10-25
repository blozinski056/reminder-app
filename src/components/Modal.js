import React from "react"

export default function Modal({setModal, createTileInfo, getDateTime}) {
  function submitClose(e) {
    e.preventDefault();

    const reminder = document.querySelector(".modal-component.reminder")
    const description = document.querySelector(".modal-component.description")
    const dt = document.querySelector(".modal-component.datetime")

    // converts date-time object to string with date leading
    // const dtObj = new Date(dt.value);
    // const date = dtObj.toDateString();
    // const time = dtObj.toLocaleTimeString("en-US", {timeStyle: "short"});
    // const dtString = date + ", " + time;

    createTileInfo(reminder.value, description.value, dt.value);
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
            min={getDateTime()}
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