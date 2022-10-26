import React from "react"

export default function DetModal({details, setDetails, setDetModal, removeTile, updateTile, getDateTime, convertDT}) {
  let t = setInterval(() => setTimeLeft(timeRemaining), 1000);
  const minDate = new Date((new Date(getDateTime()).getTime() + 60000)).toISOString().slice(0, -8);
  const [editing, setEditing] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(timeRemaining);

  function timeRemaining() {
    // need seconds to be tracked
    let now = new Date(getDateTime().slice(0, -5));
    // returns time in milliseconds
    let timeBtwn = (new Date(details.dateTime)).getTime() - now.getTime();
    // convert time to minutes
    let minBtwn = timeBtwn / 60000;
    if(timeBtwn <= 0) {
      if(t !== null) {
        clearInterval(t);
        t = null;
      }
      // document.querySelector(`[name="dm-remaining${details.id}"]`).style.color = "red";
      // document.querySelector(`[name="tile-datetime${id}"]`).style.color = "red";
      // document.querySelector(`[name="tile${id}"]`).style.border = "solid 3px red";
      return("!!!")
    } else {
      let mins = Math.ceil(minBtwn % 60);
      let hrs = Math.floor(minBtwn / 60 % 24);
      let days = Math.floor(minBtwn / (60 * 24));
      if(mins === 60) {
        mins = 0;
        hrs++;
      }
      if(hrs === 24) {
        hrs = 0;
        days++;
      }
      let timeString = "";
      if(days > 0) { timeString = timeString + days + "d "; }
      if(hrs > 0) { timeString = timeString + hrs + "h "; }
      if(mins > 0) { timeString = timeString + mins + "m"; }
      return(timeString);
    }
  }

  function remove() {
    removeTile(details.id);
    setDetModal(false);
  }

  function submit(e) {
    e.preventDefault();

    const remVal = document.querySelector(".dm-form.reminder").value;
    const descVal = document.querySelector(".dm-form.description").value;
    const dtVal = document.querySelector(".dm-form.datetime").value;
    const newDets = {id: details.id, reminder: remVal, description: descVal, dateTime: dtVal};

    // update details
    setDetails(newDets);
    // update list of tiles
    updateTile(newDets);
    setEditing(false);
  }

  React.useEffect(() => {
    if(timeLeft === "!!!" && editing === false) {
      document.querySelector(`[name="dm-remaining${details.id}"]`).style.color = "red";
    } else if(editing === false) {
      document.querySelector(`[name="dm-remaining${details.id}"]`).style.color = "rgb(100, 129, 100)";
    }
  }, [timeLeft, editing])

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
              <h5 name={"dm-remaining" + details.id}>Time Remaining: <br /> {timeLeft}</h5>
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
                min={minDate}
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