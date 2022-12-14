import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Divider, IconButton, List, Tooltip } from "@mui/material";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import SongRow from "./SongRow";

function QueueTracksPanel() {
  const { queue, playTrack, removeFromQueueAt, currentTrack } =
    useContext(PlayerContext);

  const playAndRemoveSong = (index, track) => {
    playTrack(track);
    removeFromQueueAt(index);
  };

  return (
    <>
      <div className="queue-header body-1">Queue · {queue.length} tracks</div>
      {queue.length === 0 && (
        <div className="queue-empty-state">
          <span className="body-1 text-secondary">This queue is empty</span>
        </div>
      )}
      <List sx={{ width: "100%", maxWidth: 460, bgcolor: "background.paper" }}>
        {queue.map((track, index) => [
          <React.Fragment key={track.id}>
            <SongRow
              index={index + 1}
              isPlaying={currentTrack?.id === track.id}
              track={track}
              onClick={() => {
                playAndRemoveSong(index, track);
              }}
            >
              <Tooltip title="Remove song from queue" placement="left">
                <IconButton
                  aria-label="remove from queue"
                  size="small"
                  onClick={() => removeFromQueueAt(index)}
                >
                  <PlaylistRemoveIcon />
                </IconButton>
              </Tooltip>
            </SongRow>
            <Divider component="li" />
          </React.Fragment>,
        ])}
      </List>
    </>
  );
}

export default QueueTracksPanel;
