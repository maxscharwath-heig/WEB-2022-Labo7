import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { PlayerContext } from "../../context/PlayerContext";
import { useContext, useEffect, useState } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Player from './Player'

const PlayerBar = () => {
  const {
    currentTrack,
  } = useContext(PlayerContext);

  return (
    <Box
      sx={{
        borderTop: 1,
        borderColor: "lightgray",
        backgroundColor: "white",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: "100%",
      }}
    >
      <Grid container alignItems="center" sx={{ height: 75 }}>
        <Grid item xs={4}>
          {currentTrack && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={currentTrack.album.cover_medium}
                alt="trackCover"
                variant="square"
                sx={{ height: 75, width: 75 }}
              >
                <MusicNoteIcon fontSize="large" />
              </Avatar>
              <Box sx={{ ml: 1.5, minWidth: 0 }}>
                <Typography variant="caption" fontWeight={500}>
                  {currentTrack?.artist.name}
                </Typography>
                <Typography noWrap>{currentTrack?.title}</Typography>
              </Box>
            </Box>
          )}
        </Grid>
        <Player/>
        <Grid item xs={4} paddingRight={2}>
          <Box textAlign="right">
            <Typography
              component={"div"}
              variant="caption"
              fontWeight={500}
              sx={{ marginBottom: "-8px" }}
            >
              Powered by
            </Typography>
            <img
              src="/study-logo.svg"
              alt="StudyStorm logo"
              id="footer-logo"
              height={35}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerBar;
