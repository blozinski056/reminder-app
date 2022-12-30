import React from "react";

export default function ReminderWall({ tiles }) {
  return (
    <section className="reminder-wall">
      {tiles.length === 0 && <h1 className="empty">No more reminders!</h1>}

      {tiles.length > 0 && <div className="tile-container">{tiles}</div>}
    </section>
  );
}
