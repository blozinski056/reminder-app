import React from "react"

export default function Tile({id, reminder, description, dateTime, removeTile, setDetModal, setDetails, convertDT}) {
  function details() {
    const newDets = {id: id, reminder: reminder, description: description, dateTime: dateTime};
    setDetails(newDets);
    setDetModal(true);
  }

  return (
    <div className="tile">
      <button className="tile delete" onClick={() => removeTile(id)}>
        <img src="./images/trash-icon.png" alt="" />
      </button>
      <div className="tile-content" onClick={details}>
        <h1 className="tile-reminder">{reminder}</h1>
        <h3 className="tile-datetime">{convertDT(dateTime)}</h3>
        <p className="tile-description">{description}</p>
      </div>
    </div>
  )
}