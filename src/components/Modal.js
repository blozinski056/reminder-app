import React from "react"

export default function Modal(props) {
  function getDateTime() {
    let today = new Date();
    let tzOffset = today.getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = (new Date(Date.now() - tzOffset)).toISOString().slice(0, -8);

    return (
      localISOTime
    )
  }

  function submitClose(event) {
    event.preventDefault();

    const remValue = document.querySelector(".modal-component.reminder")
    const descValue = document.querySelector(".modal-component.description")
    const dtValue = document.querySelector(".modal-component.datetime")
    props.createInfo(remValue.value, descValue.value, dtValue.value)

    props.onClose();
  }
  
  return (
    <div>
      <div className="modal-overlay"></div>
      
      <div className="modal-content">
        <button className="modal-component exit" onClick={props.onClose}>+</button>

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