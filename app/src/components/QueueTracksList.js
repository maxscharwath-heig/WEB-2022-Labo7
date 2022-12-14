import React from "react";
import { Divider, IconButton, List, Tooltip } from "@mui/material";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import SongRow from "./SongRow";

function QueueTracksList({ queue, onSongClick, onButtonClick }) {
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 460, bgcolor: "background.paper" }}>
        {queue.map((track) => [
          <React.Fragment key={track.id}>
            <SongRow
              track={track}
              onClick={() => {
                onSongClick(track);
              }}
            >
              <Tooltip title="Remove song from queue" placement="left">
                <IconButton
                  aria-label="remove from queue"
                  size="small"
                  onClick={() => onButtonClick(track)}
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

export default QueueTracksList;
