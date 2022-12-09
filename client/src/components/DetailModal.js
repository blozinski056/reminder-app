import React from "react";
import { nanoid } from "nanoid";

export default function DetailModal({
  username,
  setModal,
  details,
  setDetails,
  getDateTime,
  convertDT,
  removeTile,
  timeRemaining,
  tileList,
  setTileList,
}) {
  const [editing, setEditing] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(
    timeRemaining(details.dateTime)
  );

  function minDT() {
    return new Date(new Date(getDateTime()).getTime() + 60000)
      .toISOString()
      .slice(0, -8);
  }

  let intervalID = setInterval(() => {
    const tr = timeRemaining(details.dateTime);
    if (tr !== timeLeft) {
      setTimeLeft(tr);
    }
  }, 1000);

  // If the detail modal component is rendered, change time remaining font color
  React.useEffect(() => {
    const trElm = document.querySelector(".dm-time-remaining");
    if (!trElm) {
      return;
    }
    if (timeLeft === "!!!") {
      clearInterval(intervalID);
      trElm.style.color = "red";
    } else {
      trElm.style.color = "rgb(100, 129, 100)";
    }
  }, [timeLeft, intervalID]);

  // Remove this tile
  function remove() {
    clearInterval(intervalID);
    intervalID = null;
    removeTile(details.id);
    setModal(0);
  }

  // Send an updated tile
  function submit(e) {
    e.preventDefault();
    const dtVal = document.querySelector(".dm-form-datetime").value;
    // update list of tiles
    updateTile();
    setEditing(false);
    setTimeLeft(timeRemaining(dtVal));
    setModal(10);
  }

  // Update a tile
  async function updateTile() {
    const remVal = document.querySelector(".dm-form-reminder").value;
    const descVal = document.querySelector(".dm-form-description").value;
    const dtVal = document.querySelector(".dm-form-datetime").value;
    const dets = {
      id: details.id,
      reminder: remVal,
      description: descVal,
      dateTime: dtVal,
    };
    let newList = [];
    const updatedTile = {
      id: nanoid(),
      reminder: dets.reminder,
      description: dets.description,
      dateTime: dets.dateTime,
    };

    try {
      const body = {
        newId: updatedTile.id,
        reminder: dets.reminder,
        description: dets.description,
        dateTime: dets.dateTime,
      };
      await fetch(`/api/users/${username}/notes/${dets.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      tileList.forEach((tile) => {
        if (tile.id === dets.id) {
          // add to the front so edited note is at the top of UI
          newList.unshift(updatedTile);
          setDetails(updatedTile);
        } else {
          newList.push(tile);
        }
      });
      setTileList(newList);
      setModal(2);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="detail-modal">
      <div className="dm-content">
        <button className="dm-exit" onClick={() => setModal(0)}>
          +
        </button>

        {editing ? (
          <div className="dm-details">
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
                min={minDT()}
                defaultValue={details.dateTime}
                required="required"
              />
            </form>
          </div>
        ) : (
          <div className="dm-details">
            <h1 className="dm-reminder">{details.reminder}</h1>
            <h3 className="dm-datetime">{convertDT(details.dateTime)}</h3>
            <p className="dm-description">{details.description}</p>
            <div className="dm-timer"></div>
            <div className="dm-button-container">
              <button className="dm-edit" onClick={() => setEditing(true)}>
                <img src="./images/edit-icon.png" alt="" />
              </button>
              <h5 className="dm-time-remaining">
                Time Remaining: <br /> {timeLeft}
              </h5>
              <button className="dm-delete" onClick={remove}>
                <img src="./images/trash-icon.png" alt="" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
