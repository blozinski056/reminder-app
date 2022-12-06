import React from "react";

export default function Tile({
  id,
  reminder,
  description,
  dateTime,
  removeTile,
  convertDT,
  setDetails,
  setModal,
  timeRemaining,
}) {
  const [timeLeft, setTimeLeft] = React.useState(timeRemaining(dateTime));

  let intervalID = setInterval(() => {
    const tr = timeRemaining(dateTime);
    if (tr !== timeLeft) {
      setTimeLeft(tr);
    }
  }, 1000);

  React.useEffect(() => {
    if (timeLeft === "!!!") {
      clearInterval(intervalID);
      document.querySelector(`[name="t${id}"]`).style.border = "solid 3px red";
      document.querySelector(`[name="dt${id}"]`).style.color = "red";
      document.querySelector(`[name="r${id}"]`).style.color = "red";
    }
  }, [timeLeft, id, intervalID]);

  function details() {
    const dets = {
      id: id,
      reminder: reminder,
      description: description,
      dateTime: dateTime,
    };
    setDetails(dets);
    setModal(2);
  }

  function remove() {
    clearInterval(intervalID);
    intervalID = null;
    removeTile(id);
  }

  return (
    <div className="tile" name={"t" + id}>
      <button className="delete" onClick={remove}>
        <img src="./images/trash-icon.png" alt="Remove" />
      </button>
      <div className="tile-content" onClick={details}>
        <h1 className="tile-reminder">{reminder}</h1>
        <h3 className="tile-datetime" name={"dt" + id}>
          {convertDT(dateTime)}
        </h3>
        <p className="tile-description">{description}</p>
        <h5 className="tile-remaining" name={"r" + id}>
          Time Remaining: <br />
          {timeLeft}
        </h5>
      </div>
    </div>
  );
}
