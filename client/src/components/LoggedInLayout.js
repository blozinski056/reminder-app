import React from "react";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "./Navbar";
import ReminderWall from "./ReminderWall";
import Modal from "./Modal";
import DetailModal from "./DetailModal";
import Tile from "./Tile.js";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";

export default function LoggedInLayout() {
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
    // setTileList([]);
    getNotes(username);
  }, [username]);

  // Populate existing notes based on user
  async function getNotes(un) {
    try {
      const response = await fetch(`http://localhost:5000/users/${un}/notes`);
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
    // setTileList([]);
    navigate("/");
  }

  // Creates new info object and adds it to info tiles array
  async function createTile(r, d, dt) {
    const newtile = {
      id: nanoid(),
      reminder: r,
      description: d,
      dateTime: dt,
    };
    try {
      const body = newtile;
      await fetch(`http://localhost:5000/users/${username}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setTileList((prevTileList) => [newtile, ...prevTileList]);
    } catch (err) {
      console.error(err.message);
    }
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
      await fetch(`http://localhost:5000/users/${username}/notes/${idNum}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  // Update a tile
  async function updateTile(dets) {
    let newList = [];
    const updatedTile = {
      id: nanoid(),
      reminder: dets.reminder,
      description: dets.description,
      dateTime: dets.dateTime,
    };

    try {
      const body = {
        newId: updatedTile.id,
        reminder: dets.reminder,
        description: dets.description,
        dateTime: dets.dateTime,
      };
      await fetch(`http://localhost:5000/users/${username}/notes/${dets.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      tileList.forEach((tile) => {
        if (tile.id === dets.id) {
          // add to the front so edited note is at the top of UI
          newList.unshift(updatedTile);
          setDetails(updatedTile);
        } else {
          newList.push(tile);
        }
      });
      setTileList(newList);
      setModal(2);
    } catch (err) {
      console.error(err.message);
    }
  }

  // Update password of account
  async function updatePassword(e) {
    e.preventDefault();
    const oldPW = document.querySelector(".old-pw").value;
    const newPW = document.querySelector(".new-pw").value;

    try {
      const response = await fetch(`http://localhost:5000/users/${username}`);
      const jsonData = await response.json();

      if (jsonData.password !== oldPW) {
        // if user input incorrect old password
        setPwError(0);
        setTimeout(() => {
          setPwError(1);
        }, 10);
      } else if (oldPW === newPW) {
        // if user input same new password as old password
        setPwError(0);
        setTimeout(() => {
          setPwError(2);
        }, 10);
      } else {
        // if password combination has no errors
        try {
          const body = { oldPassword: oldPW, newPassword: newPW };
          const response = await fetch(
            `http://localhost:5000/users/${username}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );
          if (response) {
            const formElm = document.querySelector(".cp-form");
            while (formElm.firstChild) {
              formElm.removeChild(formElm.firstChild);
            }
            const formElmChild = document.createElement("h3");
            formElmChild.innerText = "Your password was updated!";
            formElmChild.style.textAlign = "center";

            formElm.appendChild(formElmChild);
            formElmChild.classList.add("display");
            setTimeout(() => {
              setPwError(0);
              setModal(0);
            }, 1500);
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  // Delete account
  async function deleteAccount(e) {
    e.preventDefault();
    const pw = document.querySelector(".da-form-password").value;

    try {
      const response = await fetch(`http://localhost:5000/users/${username}`);
      const jsonData = await response.json();
      if (jsonData.password !== pw) {
        // do somethng to show wrong pw
        setPwError(0);
        setTimeout(() => {
          setPwError(3);
        }, 10);
      } else {
        // if password is correct
        try {
          const body = { password: pw };
          const response = await fetch(
            `http://localhost:5000/users/${username}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );
          if (response) {
            const formElm = document.querySelector(".da-form");
            while (formElm.firstChild) {
              formElm.removeChild(formElm.firstChild);
            }
            const formElmChild = document.createElement("h3");
            formElmChild.innerText = "Account deleted!";
            formElmChild.style.textAlign = "center";

            formElm.appendChild(formElmChild);
            formElmChild.classList.add("display");
            setTimeout(() => {
              setPwError(0);
              setModal(0);
              navigate("/");
            }, 1500);
          }
        } catch (err) {
          console.error(err.message);
        }
      }
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
          setModal={setModal}
          getDateTime={getDateTime}
          createTile={createTile}
        />
      )}
      {modal === 2 && (
        <DetailModal
          setModal={setModal}
          details={details}
          getDateTime={getDateTime}
          convertDT={convertDT}
          removeTile={removeTile}
          updateTile={updateTile}
          timeRemaining={timeRemaining}
        />
      )}
      {modal === 3 && (
        <ChangePasswordModal
          setModal={setModal}
          pwError={pwError}
          setPwError={setPwError}
          updatePassword={updatePassword}
        />
      )}
      {modal === 4 && (
        <DeleteAccountModal
          setModal={setModal}
          pwError={pwError}
          setPwError={setPwError}
          deleteAccount={deleteAccount}
        />
      )}
    </>
  );
}
