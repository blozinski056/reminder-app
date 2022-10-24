import React from "react"
import {nanoid} from "nanoid"

import "./App.css"
import Tile from "./components/Tile.js"
import Modal from "./components/Modal.js"
import DetModal from "./components/DetModal.js"

export default function App() {
  const [modal, setModal] = React.useState(false)
  const [detModal, setDetModal] = React.useState(false);
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
      />
    )
  })

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

  return (
    <div className="container">
      <h1 className="title">RemindMe</h1>
      <button className="modal-button" onClick={() => setModal(true)}>+ New Reminder</button>
        
      {/* Form */}
      {modal && 
        <Modal 
          setModal={setModal}
          createTileInfo={createTileInfo}
        />
      }

      {detModal &&
        <DetModal />
      }
      
      {infoTiles.length > 0 &&
        <div className="tiles-container">
          {tiles}
        </div>
      }
    </div>
  )
}