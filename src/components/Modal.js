import React from "react"

export default function Modal(props) {
  const [reminder, setReminder] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [dateTime, setDateTime] = React.useState(new Date())

  function submitClose(event) {
    event.preventDefault();

    const remValue = document.querySelector(".modal-component.reminder")
    const descValue = document.querySelector(".modal-component.description")
    const dtValue = document.querySelector(".modal-component.datetime")
    // console.log("submitting")
    props.createInfo(remValue.value, descValue.value, dtValue.value)

    props.onClose();
  }
  
  return (
    <div>
      <div className="modal-overlay" onClick={props.onClose}></div>

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
          required="required"
        />
        <input
          className="modal-component submit"
          type="submit"
        />
      </form>
    </div>
  )
}