import React, { useContext } from "react";
import QueueTracksList from "./QueueTracksList";
import { PlayerContext } from "../context/PlayerContext";

function QueueTracksPanel() {
  const { queue, playTrack } = useContext(PlayerContext);

  return (
    <>
      <div>
        <span>Queue · {queue.length} tracks</span>
      </div>
      <QueueTracksList queue={queue} onSongClick={playTrack} />
    </>
  );
}

export default QueueTracksPanel;
