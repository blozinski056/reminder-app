import React from "react"

export default function Tile({id, reminder, description, dateTime, removeTile, setDetModal}) {
  function toNormalDateTime() {

    const dt = new Date(dateTime);
    const date = dt.toDateString();
    const time = dt.toLocaleTimeString("en-US", {timeStyle: "short"});

    return(
      date + ", " + time
    )
  }

  return (
    <div className="tile" onClick={() => setDetModal(true)}>
      <button className="tile exit" onClick={() => removeTile(id)}>+</button>
      <div className="tile-content">
        <h1 className="tile-details reminder">{reminder}</h1>
        <h3 className="tile-details datetime">{toNormalDateTime()}</h3>
        <p className="tile-details description">{description}</p>
      </div>
    </div>
  )
}