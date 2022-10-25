import React from "react"

export default function DetModal({details, setDetails, setDetModal, removeTile, updateTile, getDateTime, convertDT}) {
  const [editing, setEditing] = React.useState(false);

  function remove() {
    removeTile(details.id);
    setDetModal(false);
  }

  function submit(e) {
    e.preventDefault();

    const remVal = document.querySelector(".dm-reminder").value;
    const descVal = document.querySelector(".dm-description").value;
    const dtVal = document.querySelector(".dm-datetime").value;
    const newDets = {id: details.id, reminder: remVal, description: descVal, dateTime: dtVal};

    // update details
    setDetails(newDets);
    // update list of tiles
    updateTile(newDets);
    setEditing(false);
  }

  return (
    <div className="det-modal">
      <div className="modal-overlay"></div>
      <div className="dm-content">
        <button className="dm-exit" onClick={() => setDetModal(false)}>+</button>
        {!editing &&
          <div className="dm-details">
            <h1 className="dm-reminder">{details.reminder}</h1>
            <h3 className="dm-datetime">{convertDT(details.dateTime)}</h3>
            <p className="dm-description">{details.description}</p>
            <div className="dm-timer"></div>
            <div className="dm-button-container">
              <button className="dm-edit" onClick={() => setEditing(true)}>
                <img src="./images/edit-icon.png" alt="" />
              </button>
              <button className="dm-delete" onClick={remove}>
                <img src="./images/trash-icon.png" alt="" />
              </button>
            </div>
          </div>
        }
        {editing &&
          <div className="dm-details">
            <button className="dm-cancel" onClick={() => setEditing(false)}>
              <img src="./images/back-icon.png" alt="" />
            </button>
            <form className="dm-form" onSubmit={submit}>
              <button className="dm-save" type="submit">
                <img src="./images/save-icon.png" alt="" />
              </button>
              <input
                className="dm-form reminder"
                type="text"
                defaultValue={details.reminder}
                required="required"
                autoFocus
              />
              <textarea
                className="dm-form description"
                defaultValue={details.description}
              />
              <input
                className="dm-form datetime"
                type="datetime-local"
                min={getDateTime()}
                defaultValue={details.dateTime}
                required="required"
              />
            </form>
          </div>
        }
      </div>
    </div>
  )
}