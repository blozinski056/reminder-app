import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "./Navbar";
import ReminderWall from "./ReminderWall";
import Modal from "./Modal";
import DetailModal from "./DetailModal";
import Tile from "./Tile.js";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";

export default function LoggedInLayout({ setLoggedIn }) {
  const navigate = useNavigate();
  const { username } = useParams();
  const [modal, setModal] = React.useState(0);
  const [tileList, setTileList] = React.useState([]);
  const [pwError, setPwError] = React.useState(0);
  const [details, setDetails] = React.useState({
    id: "",
    reminder: "",
    description: "",
    dateTime: "",
  });
  const tiles = tileList.map((tile) => {
    return (
      <Tile
        key={tile.id}
        id={tile.id}
        reminder={tile.reminder}
        description={tile.description}
        dateTime={tile.dateTime}
        removeTile={removeTile}
        convertDT={convertDT}
        setDetails={setDetails}
        setModal={setModal}
        timeRemaining={timeRemaining}
      />
    );
  });

  React.useEffect(() => {
    getNotes(username);
  }, [username]);

  // Populate existing notes based on user
  async function getNotes(un) {
    try {
      const response = await fetch(`/api/users/${un}/notes`);
      const jsonData = await response.json();
      const newTiles = [];
      jsonData.forEach((data) => {
        newTiles.push({
          id: data.id,
          reminder: data.reminder,
          description: data.description,
          dateTime: data.datetime,
        });
      });
      setTileList(newTiles);
    } catch (err) {
      console.error(err.message);
    }
  }

  function signOut() {
    setLoggedIn(false);
    navigate("/", { replace: true });
  }

  // Removes tile from list based on its ID number
  async function removeTile(idNum) {
    const newTileList = [];
    tileList.forEach((tile) => {
      // check if tile matches ID of tile to remove
      if (tile.id !== idNum) {
        newTileList.push(tile);
      }
    });
    setTileList(newTileList);

    try {
      await fetch(`/api/users/${username}/notes/${idNum}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  // Turns current date and time to ISOString
  function getDateTime() {
    let today = new Date();
    // offset is positive if local tz is behind, negative if ahead; convert to ms
    let tzOffset = today.getTimezoneOffset() * 60000;
    // .now() - offset gets to local time from UTC
    let localISOTime = new Date(Date.now() - tzOffset).toISOString();

    return localISOTime;
  }

  // Converts the dateTime to a string
  function convertDT(dt) {
    const dtObj = new Date(dt);
    const date = dtObj.toDateString();
    const time = dtObj.toLocaleTimeString("en-US", { timeStyle: "short" });
    return date + ", " + time;
  }

  // Returns amount of time remaining
  function timeRemaining(dt) {
    // need seconds to be tracked
    let now = new Date(getDateTime().slice(0, -5));
    // returns time in milliseconds
    let timeBtwn = new Date(dt).getTime() - now.getTime();
    // convert time to minutes
    let minBtwn = timeBtwn / 60000;

    if (timeBtwn <= 0) {
      return "!!!";
    } else {
      let mins = Math.ceil(minBtwn % 60);
      let hrs = Math.floor((minBtwn / 60) % 24);
      let days = Math.floor(minBtwn / (60 * 24));
      if (mins === 60) {
        mins = 0;
        hrs++;
      }
      if (hrs === 24) {
        hrs = 0;
        days++;
      }
      let timeString = "";
      if (days > 0) {
        timeString = timeString + days + "d ";
      }
      if (hrs > 0) {
        timeString = timeString + hrs + "h ";
      }
      if (mins > 0) {
        timeString = timeString + mins + "m";
      }
      return timeString;
    }
  }

  return (
    <>
      <Navbar setModal={setModal} username={username} signOut={signOut} />
      <ReminderWall tiles={tiles} />
      {modal !== 0 && <div className="modal-background"></div>}
      {modal === 1 && (
        <Modal
          username={username}
          setModal={setModal}
          getDateTime={getDateTime}
          setTileList={setTileList}
        />
      )}
      {modal === 2 && (
        <DetailModal
          username={username}
          setModal={setModal}
          details={details}
          setDetails={setDetails}
          getDateTime={getDateTime}
          convertDT={convertDT}
          removeTile={removeTile}
          timeRemaining={timeRemaining}
          tileList={tileList}
          setTileList={setTileList}
        />
      )}
      {modal === 3 && (
        <ChangePasswordModal
          username={username}
          setModal={setModal}
          pwError={pwError}
          setPwError={setPwError}
        />
      )}
      {modal === 4 && (
        <DeleteAccountModal
          username={username}
          setModal={setModal}
          pwError={pwError}
          setPwError={setPwError}
        />
      )}
    </>
  );
}
