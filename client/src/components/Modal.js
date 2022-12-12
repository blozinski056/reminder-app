import React from "react";
import { nanoid } from "nanoid";

export default function Modal({
  username,
  setModal,
  getDateTime,
  setTileList,
}) {
  const [currentDT, setCurrentDT] = React.useState(minDT());

  // Gets current date and time
  function minDT() {
    return new Date(new Date(getDateTime()).getTime() + 60000)
      .toISOString()
      .slice(0, -8);
  }

  // Collects info for the new tile
  function submitClose(e) {
    e.preventDefault();
    createTile();
    setModal(0);
  }

  // Creates new info object and adds it to info tiles array
  async function createTile() {
    const r = document.querySelector(".modal-reminder").value;
    const d = document.querySelector(".modal-description").value;
    const dt = document.querySelector(".modal-datetime").value;
    const newtile = {
      id: nanoid(),
      reminder: r,
      description: d,
      dateTime: dt,
    };
    try {
      const body = newtile;
      await fetch(
        `https://reminder-app-bloz.herokuapp.com/api/users/${username}/notes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      setTileList((prevTileList) => [newtile, ...prevTileList]);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-exit" onClick={() => setModal(0)}>
          +
        </button>
        <form onSubmit={submitClose}>
          <input
            className="modal-reminder"
            type="text"
            placeholder="New Reminder"
            required="required"
            autoFocus
          />
          <textarea className="modal-description" placeholder="Description" />
          <input
            className="modal-datetime"
            type="datetime-local"
            min={minDT()}
            defaultValue={currentDT}
            required="required"
          />
          <input
            className="modal-submit"
            type="submit"
            onClick={() => setCurrentDT(minDT())}
          />
        </form>
      </div>
    </div>
  );
}
