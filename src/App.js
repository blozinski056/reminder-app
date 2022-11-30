import React from "react"
import {nanoid} from "nanoid"

import "./App.css"
import Navbar from "./components/Navbar"
import ReminderWall from "./components/ReminderWall"
import Modal from "./components/Modal"
import DetailModal from "./components/DetailModal"
import Tile from "./components/Tile.js"

export default function App() {
  const [modal, setModal] = React.useState(0);
  const [tileList, setTileList] = React.useState([]);
  const [details, setDetails] = React.useState({id: "", reminder: "", description: "", dateTime: ""})
  const tiles = tileList.map((tile) => {
    return (
      <Tile 
        key={tile.id}
        id={tile.id}
        reminder={tile.reminder}
        description={tile.description}
        dateTime={tile.dateTime}
        getDateTime={getDateTime}
        removeTile={removeTile}
        convertDT={convertDT}
        setDetails={setDetails}
        setModal={setModal}
        timeRemaining={timeRemaining}
      />
    )
  })

  // Turns current date and time to ISOString
  function getDateTime() {
    let today = new Date();
    // offset is positive if local tz is behind, negative if ahead; convert to ms
    let tzOffset = today.getTimezoneOffset() * 60000;
    // .now() - offset gets to local time from UTC
    let localISOTime = (new Date(Date.now() - tzOffset)).toISOString();

    return (
      localISOTime
    )
  }

  // Creates new info object and adds it to info tiles array
  function createTile(r, d, dt) {
    const newtile = {
      id: nanoid(),
      reminder: r,
      description: d,
      dateTime: dt
    }
    setTileList(prevTileList => [newtile, ...prevTileList]);
  }

  // Removes tile from list based on its ID number
  function removeTile(idNum) {
    const newTileList = [];
    tileList.forEach((tile) => {
      if(tile.id !== idNum) {
        newTileList.push(tile);
      }
    })
    setTileList(newTileList);
  }

  function updateTile(dets) {
    let newList = [];
    tileList.forEach((tile) => {
      if(tile.id === dets.id) {
        const updatedTile = {
          id: nanoid(), 
          reminder: dets.reminder, 
          description: dets.description, 
          dateTime: dets.dateTime
        }
        newList.unshift(updatedTile);
        setDetails(updatedTile);
      } else {
        newList.push(tile);
      }
    })
    setTileList(newList);
    setModal(0);
  }

  // Converts the dateTime to a string
  function convertDT(dt) {
    const dtObj = new Date(dt);
    const date = dtObj.toDateString();
    const time = dtObj.toLocaleTimeString("en-US", {timeStyle: "short"});
    return (
      date + ", " + time
    )
  }

  // Returns amount of time remaining
  function timeRemaining(dt) {
    // need seconds to be tracked
    let now = new Date(getDateTime().slice(0, -5));
    // returns time in milliseconds
    let timeBtwn = (new Date(dt)).getTime() - now.getTime();
    // convert time to minutes
    let minBtwn = timeBtwn / 60000;

    if(timeBtwn <= 0) {
      return("!!!");
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

  return (
    <div className="container">
      <Navbar 
        setModal={setModal}
      />

      <ReminderWall 
        tiles={tiles}
      />

      {modal !== 0 &&
        <div className="modal-background"></div>
      }

      {modal === 1 &&
        <Modal 
          setModal={setModal}
          getDateTime={getDateTime}
          createTile={createTile}
        />
      }

      {modal === 2 &&
        <DetailModal 
          setModal={setModal}
          details={details}
          getDateTime={getDateTime}
          convertDT={convertDT}
          removeTile={removeTile}
          updateTile={updateTile}
          timeRemaining={timeRemaining}
        />
      }
    </div>
  )
}