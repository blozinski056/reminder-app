import React from "react"
import {nanoid} from "nanoid"

import "./App.css"
import Tile from "./components/Tile.js"
import Modal from "./components/Modal.js"
import DetModal from "./components/DetModal.js"

export default function App() {
  const [modal, setModal] = React.useState(false)
  const [detModal, setDetModal] = React.useState(false);
  const [details, setDetails] = React.useState({id: "", reminder: "", description: "", dateTime: ""})
  const [infoTiles, setInfoTiles] = React.useState([])
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
      />
    )
  })

  function getDateTime() {
    let today = new Date();
    let tzOffset = today.getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = (new Date(Date.now() - tzOffset)).toISOString().slice(0, -8);

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
      if(tile.props.id === dets.id) {
        newList.unshift({
          id: tile.props.id, 
          reminder: dets.reminder, 
          description: dets.description, 
          dateTime: dets.dateTime
        });
      } else {
        newList.push(tile);
      }
    })
    setInfoTiles(newList);
  }

  return (
    <div className="container">
      <h1 className="title">RemindMe</h1>
      <button className="modal-button" onClick={() => setModal(true)}>+ New Reminder</button>
        
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