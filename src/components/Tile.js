import React from "react"

export default function Tile(props) {

  function toNormalDateTime() {

    const dt = new Date(props.dateTime);
    const date = dt.toDateString();
    const time = dt.toLocaleTimeString("en-US", {timeStyle: "short"});

    return(
      date + ", " + time
    )
  }

  return (
    <div className="tile">
      <div className="tile-content">
        <h1 className="tile-details reminder">{props.reminder}</h1>
        <h3 className="tile-details datetime">{toNormalDateTime()}</h3>
        <p className="tile-details description">{props.description}</p>
      </div>
    </div>
  )
}