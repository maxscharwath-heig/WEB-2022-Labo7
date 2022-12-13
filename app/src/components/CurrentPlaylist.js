import { List, Divider, Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import SongRow from "./SongRow";
import React from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import Page from "./Page";

export default function CurrentPlaylists({
  playlist,
  onClickTrack,
  onClickBack,
  onClickAddToQueue,
}) {
  function handleAddToQueue(e, track) {
    e.stopPropagation();
    onClickAddToQueue(track);
  }

  function handleClickTrack(e, track) {
    e.stopPropagation();
    onClickTrack(track);
  }

  return (
    <Page
      toolbar={
        <Button
          variant="plain"
          startIcon={<ArrowBack />}
          size="small"
          onClick={() => onClickBack()}
        >
          Back to playlists
        </Button>
      }
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <img src={playlist.picture_medium} alt="playlistCover" />
        <div>
          <h3>Playlist</h3>
          <h1>{playlist.title}</h1>
          <h2>{playlist.id}</h2>
        </div>
      </Box>
      <List>
        {playlist.tracks.data.map((track) => (
          <React.Fragment key={track.id}>
            <SongRow track={track} onClick={(e) => handleClickTrack(e, track)}>
              <Button
                variant="outlined"
                startIcon={<QueueMusicIcon />}
                size="small"
                onClick={(e) => handleAddToQueue(e, track)}
              >
                Add to queue
              </Button>
            </SongRow>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Page>
  );
}
