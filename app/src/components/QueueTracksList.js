import React from "react";
import { List, Divider } from "@mui/material";
import SongRow from "./SongRow";

function QueueTracksList({ queue, onSongClick }) {
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 460, bgcolor: "background.paper" }}>
        {queue.map((track) => [
          <SongRow
            track={track}
            onClick={() => {
              onSongClick(track);
            }}
            key={track.id}
          />,
          <Divider component="li" />,
        ])}
      </List>
    </>
  );
}

export default QueueTracksList;
