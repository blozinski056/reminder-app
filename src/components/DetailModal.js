import React from "react"

export default function DetailModal({setModal, details, getDateTime, convertDT, removeTile, updateTile, timeRemaining}) {
  const [editing, setEditing] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(timeRemaining(details.dateTime));
  const minDate = new Date((new Date(getDateTime()).getTime() + 60000)).toISOString().slice(0, -8);

  let intervalID = setInterval(() => {
    const tr = timeRemaining(details.dateTime);
    if(tr !== timeLeft) {
      setTimeLeft(tr);
    }
  }, 1000);

  React.useEffect(() => {
    if(timeLeft === "!!!" && editing === false) {
      clearInterval(intervalID);
      document.querySelector(`[name="dm-r${details.id}"]`).style.color = "red";
    } else if(editing === false) {
      document.querySelector(`[name="dm-r${details.id}"]`).style.color = "rgb(100, 129, 100)";
    }
  }, [timeLeft, editing, details.id, intervalID])

  function remove() {
    clearInterval(intervalID);
    intervalID = null;
    removeTile(details.id);
    setModal(0);
  }

  function submit(e) {
    e.preventDefault();
    const remVal = document.querySelector(".dm-form-reminder").value;
    const descVal = document.querySelector(".dm-form-description").value;
    const dtVal = document.querySelector(".dm-form-datetime").value;
    const newDets = {id: details.id, reminder: remVal, description: descVal, dateTime: dtVal};
    // update list of tiles
    updateTile(newDets);
  }

  return (
    <div className="detail-modal">
      <div className="dm-content">
        <button className="dm-exit" onClick={() => setModal(0)}>+</button>
        {editing
          ? <div className="dm-details">
              <button className="dm-cancel" onClick={() => setEditing(false)}>
                <img src="./images/back-icon.png" alt="" />
              </button>
              <form className="dm-form" onSubmit={submit}>
                <button className="dm-save" type="submit">
                  <img src="./images/save-icon.png" alt="" />
                </button>
                <input
                  className="dm-form-reminder"
                  type="text"
                  defaultValue={details.reminder}
                  required="required"
                  autoFocus
                />
                <textarea
                  className="dm-form-description"
                  defaultValue={details.description}
                />
                <input
                  className="dm-form-datetime"
                  type="datetime-local"
                  min={minDate}
                  defaultValue={details.dateTime}
                  required="required"
                />
              </form>
            </div>
          : <div className="dm-details">
              <h1 className="dm-reminder">{details.reminder}</h1>
              <h3 className="dm-datetime">{convertDT(details.dateTime)}</h3>
              <p className="dm-description">{details.description}</p>
              <div className="dm-timer"></div>
              <div className="dm-button-container">
                <button className="dm-edit" onClick={() => setEditing(true)}>
                  <img src="./images/edit-icon.png" alt="" />
                </button>
                <h5 name={"dm-r" + details.id}>Time Remaining: <br /> {timeLeft}</h5>
                <button className="dm-delete" onClick={remove}>
                  <img src="./images/trash-icon.png" alt="" />
                </button>
              </div>
            </div>
        }
      </div>
    </div>
  )
}