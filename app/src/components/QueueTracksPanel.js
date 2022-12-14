import React, { useContext } from "react";
import QueueTracksList from "./QueueTracksList";
import { PlayerContext } from "../context/PlayerContext";

function QueueTracksPanel() {
  const { queue, playTrack, removeFromQueueAt } = useContext(PlayerContext);

  return (
    <>
      <div className="queue-header body-1">Queue · {queue.length} tracks</div>
      {queue.length === 0 && (
        <div className="queue-empty-state">
          <span className="body-1 text-secondary">This queue is empty</span>
        </div>
      )}
      <QueueTracksList
        queue={queue}
        onSongClick={playTrack}
        onButtonClick={removeFromQueueAt}
      />
    </>
  );
}

export default QueueTracksPanel;
