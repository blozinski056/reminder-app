import React from "react"
import "./App.css"
import Tile from "./components/Tile.js"

export default function App() {
  // [formData, setFormData] = React.useState(null);
  

  // createReminder(): opens form, then creates tile
  function createReminder() {

    createTile();
  }

  // createTile(): makes new object passing in data from form
  function createTile() {

    return (<Tile />)
  }

  return (
    <div className="container">
      
      {/* Navigation */}
      <nav>
        <h1 className="nav-title">RemindMe</h1>
        <button className="nav-new-reminder" onClick={createReminder}>+ New Reminder</button>
      </nav>
        
      {/* Form */}

      <div className="tiles-container">
        {/* Tiles */}
      </div>
    </div>
  )
}