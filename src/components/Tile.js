import React from "react"

export default function Tile({id, reminder, description, dateTime, removeTile, setDetModal, setDetails, convertDT, getDateTime}) {
  const [timeLeft, setTimeLeft] = React.useState(timeRemaining);
  let t = setInterval(() => setTimeLeft(timeRemaining), 1000);

  function timeRemaining() {
    // need seconds to be tracked
    let now = new Date(getDateTime().slice(0, -5));
    // returns time in milliseconds
    let timeBtwn = (new Date(dateTime)).getTime() - now.getTime();
    // convert time to minutes
    let minBtwn = timeBtwn / 60000;
    if(timeBtwn <= 0) {
      clearInterval(t);
      t = null;
      document.querySelector(`[name="tile-remaining${id}"]`).style.color = "red";
      document.querySelector(`[name="tile-datetime${id}"]`).style.color = "red";
      document.querySelector(`[name="tile${id}"]`).style.border = "solid 3px red";
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

  function details() {
    const newDets = {id: id, reminder: reminder, description: description, dateTime: dateTime};
    setDetails(newDets);
    setDetModal(true);
  }

  function remove() {
    clearInterval(t);
    t = null;
    removeTile(id);
  }

  return (
    <div className="tile" name={"tile" + id}>
      <button className="tile delete" onClick={remove}>
        <img src="./images/trash-icon.png" alt="" />
      </button>
      <div className="tile-content" onClick={details}>
        <h1 className="tile-reminder">{reminder}</h1>
        <h3 className="tile-datetime" name={"tile-datetime" + id}>{convertDT(dateTime)}</h3>
        <p className="tile-description">{description}</p>
        <h5 className="tile-remaining" name={"tile-remaining" + id}>
          Time Remaining: <br />{timeLeft}
        </h5>
      </div>
    </div>
  )
}