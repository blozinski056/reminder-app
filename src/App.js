import React from "react"
import {nanoid} from "nanoid"

import "./App.css"
import Tile from "./components/Tile.js"
import Modal from "./components/Modal.js"

export default function App() {
  const [modal, setModal] = React.useState(false)
  const [infoTiles, setInfoTiles] = React.useState([])
  const tiles = infoTiles.map((tile) => {

    return (
      <Tile
        key={tile.id}
        reminder={tile.reminder}
        description={tile.description}
        dateTime={tile.dateTime}
      />
    )
  })

  function toggleModal() {
    setModal(!modal);
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

  return (
    <div className="container">
      <h1 className="title">RemindMe</h1>
      <button className="modal-button" onClick={toggleModal}>+ New Reminder</button>
        
      {/* Form */}
      {modal && 
        <Modal 
          onClose={toggleModal}
          createInfo={createTileInfo}
        />
      }
      
      {infoTiles.length > 0 &&
        <div className="tiles-container">
          {tiles}
        </div>
      }
    </div>
  )
}