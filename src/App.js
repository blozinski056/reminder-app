import React from "react"
import {nanoid} from "nanoid"

import "./App.css"
import Tile from "./components/Tile.js"
import Modal from "./components/Modal.js"
import DetModal from "./components/DetModal.js"
import Login from "./components/Login.js"

export default function App() {
  const [modal, setModal] = React.useState(false)
  const [login, setLogin] = React.useState(false)
  const [showSignOut, setShowSignOut] = React.useState(false)
  const [detModal, setDetModal] = React.useState(false);
  const [details, setDetails] = React.useState({id: "", reminder: "", description: "", dateTime: ""})
  const [infoTiles, setInfoTiles] = React.useState([])
  const loginSavedTile = {
    id: "yzrLAOCzjZ-ArYRrJtcDv", 
    reminder: "Check out my LinkedIn!",
    description: "https://www.linkedin.com/in/bryce-lozinski/",
    dateTime: new Date()
  }
  const tiles = infoTiles.map((tile) => {
    return (
      <Tile
        key={tile.id}
        id={tile.id}
        reminder={tile.reminder}
        description={tile.description}
        dateTime={tile.dateTime}
        removeTile={removeTile}
        setDetModal={setDetModal}
        setDetails={setDetails}
        convertDT={convertDT}
        getDateTime={getDateTime}
      />
    )
  })

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

  function convertDT(dt) {
    const dtObj = new Date(dt);
    const date = dtObj.toDateString();
    const time = dtObj.toLocaleTimeString("en-US", {timeStyle: "short"});
    return (
      date + ", " + time
    )
  }

  // Creates new info object and adds it to info tiles array
  function createTileInfo(r, d, dt) {
    const newInfo = {
      id: nanoid(),
      reminder: r,
      description: d,
      dateTime: dt
    }
    setInfoTiles(prevInfoTiles => [newInfo, ...prevInfoTiles])
  }

  function removeTile(idNum) {
    const newTileList = [];
    infoTiles.forEach((tile) => {
      if(tile.id !== idNum) {
        newTileList.push(tile);
      }
    })
    setInfoTiles(newTileList);
  }

  function updateTile(dets) {
    let newList = [];
    infoTiles.forEach((tile) => {
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
    setInfoTiles(newList);
    setDetModal(false);
  }

  function contains(details) {
    if(infoTiles.length === 0) { return false }
    return infoTiles.some((tile) => tile.id === details.id)
  }

  return (
    <div className="container">
      <div className="header-container">
        <h1 className="title">RemindMe</h1>
        <button className="modal-button" onClick={() => setModal(true)}>+ New Reminder</button>
        {!showSignOut && <button className="login-button" onClick={() => setLogin(true)}>Login</button>}
        {showSignOut && <button className="login-button" onClick={() => setShowSignOut(false)}>Sign Out</button>}
        {login &&
          <Login 
            setLogin={setLogin}
            setShowSignOut={setShowSignOut}
            contains={contains}
            loginSavedTile={loginSavedTile}
            setInfoTiles={setInfoTiles}
          />
        }
      </div>
      {/* Form */}
      {modal && 
        <Modal 
          setModal={setModal}
          createTileInfo={createTileInfo}
          getDateTime={getDateTime}
        />
      }
      {detModal &&
        <DetModal
          details={details}
          setDetails={setDetails}
          setDetModal={setDetModal}
          removeTile={removeTile}
          updateTile={updateTile}
          getDateTime={getDateTime}
          convertDT={convertDT}
        />
      }      
      {infoTiles.length > 0 &&
        <div className="tiles-container">
          {tiles}
        </div>
      }
      {infoTiles.length === 0 &&
        <h1 className="empty">No more reminders!</h1>
      }
    </div>
  )
}