import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import SongRow from "./SongRow";
import React, { useContext, useEffect, useState } from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import Page from "./Page";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate, useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";

const fetchPlaylist = async (playlistId) => {
  const response = await fetch(`http://localhost:8080/playlist/${playlistId}`);
  return await response.json();
};

function PlaylistInfo({ playlist }) {
  const totalDurationMs =
    playlist.tracks.data.reduce((acc, track) => acc + track.duration, 0) * 1000;
  const humanizedDuration = humanizeDuration(totalDurationMs, {
    round: true,
    largest: 2,
  });
  const creationYear = new Date(playlist.creation_date).getFullYear();

  return `${creationYear} · ${playlist.nb_tracks} tracks · ${humanizedDuration}`;
}

export default function Playlist() {
  const { addToQueue, playTrack, currentTrack } = useContext(PlayerContext);
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    fetchPlaylist(id).then(setPlaylist).catch(console.error);
  }, [id]);

  function handleAddToQueue(e, track) {
    e.stopPropagation();
    addToQueue(track);
  }

  function handleClickTrack(e, track) {
    e.stopPropagation();
    playTrack(track);
  }

  return (
    <Page
      toolbar={
        <Button
          variant="plain"
          startIcon={<ArrowBack />}
          size="small"
          onClick={() => navigate("/")}
        >
          Back to playlists
        </Button>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          {playlist ? (
            <Card sx={{ width: 250, height: 250 }}>
              <CardMedia
                component="img"
                image={playlist.picture_medium}
                alt={playlist.title}
              />
            </Card>
          ) : (
            <Skeleton variant="rounded" width={250} height={250} />
          )}
          <Box
            sx={{
              paddingLeft: 2,
              flex: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                textTransform: "uppercase",
              }}
            >
              {playlist ? "Playlist" : <Skeleton width={70} />}
            </Typography>
            <Typography variant="h4">
              {playlist ? playlist.title : <Skeleton width={200} />}
            </Typography>
            <Typography variant="caption" component="div">
              {playlist ? (
                `By ${playlist?.creator.name}`
              ) : (
                <Skeleton width={170} />
              )}
            </Typography>
            <Typography variant="caption" component="div">
              {playlist ? (
                <PlaylistInfo playlist={playlist} />
              ) : (
                <Skeleton width={200} />
              )}
            </Typography>
          </Box>
        </Box>
        <List sx={{ overflow: "auto", flex: 1, mt: 2 }}>
          {playlist
            ? playlist.tracks.data.map((track, index) => (
                <React.Fragment key={track.id}>
                  <SongRow
                    track={track}
                    index={index + 1}
                    isPlaying={currentTrack?.id === track.id}
                    onClick={(e) => handleClickTrack(e, track)}
                  >
                    { /* Ok but in this case I would prefer a prop "actions" instead of children, its more obvious */ }
                    <Tooltip title="Add song to queue" placement="left">
                      <IconButton
                        aria-label="add to queue"
                        size="small"
                        onClick={(e) => handleAddToQueue(e, track)}
                      >
                        <QueueMusicIcon />
                      </IconButton>
                    </Tooltip>
                  </SongRow>
                  <Divider component="li" />
                  {/* <React.Fragment> = <> */ }
                </React.Fragment>
              ))
            : [...Array(10)].map((_, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <Skeleton
                      variant="rounded"
                      height={40}
                      width={40}
                      sx={{ marginLeft: "1.5rem", marginRight: "1rem" }}
                    />
                    <ListItemText
                      primary={<Skeleton width={150 + Math.random() * 100} />}
                      secondary={<Skeleton width={100 + Math.random() * 100} />}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
        </List>
      </Box>
    </Page>
  );
}
