import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { PlayerContext } from "../context/PlayerContext";
import { useContext, useEffect, useState } from "react";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

function FormattedTime({ duration }) {
  if (!duration) return <small>-:-</small>;

  const minutes = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");
  return (
    <small>
      {minutes}:{seconds}
    </small>
  );
}

function PlaySlider({ currentTime, duration, setCurrentTime }) {
  const [value, setValue] = useState(0);
  // set value with props but keep the possibility to change it with the slider

  useEffect(() => {
    setValue(currentTime);
  }, [currentTime]);

  function handleChange(newValue) {
    setCurrentTime(newValue);
    setValue(newValue);
  }

  return (
    <>
      <FormattedTime duration={currentTime ?? 0} />
      <Slider
        size="small"
        min={0}
        max={duration || 0}
        value={value}
        onChange={(e, newValue) => handleChange(newValue)}
      />
      <FormattedTime duration={duration ?? 0} />
    </>
  );
}

const Player = () => {
  const {
    audioState,
    currentTrack,
    toggleTrack,
    playPrevious,
    playNext,
    setCurrentTime,
    queue,
  } = useContext(PlayerContext);

  const buttonsActive = () => {
    return currentTrack != null || (!currentTrack && queue.length > 0);
  };

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

        <Grid item xs={4}>
          <Box>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                onClick={() => {
                  playPrevious();
                }}
                disabled={!buttonsActive()}
              >
                <SkipPrevious />
              </IconButton>
              <IconButton
                onClick={() => {
                  toggleTrack();
                }}
                disabled={!buttonsActive()}
              >
                {audioState.isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton
                onClick={() => {
                  playNext();
                }}
                disabled={!buttonsActive()}
              >
                <SkipNext />
              </IconButton>

              {currentTrack && (
                <PlaySlider setCurrentTime={setCurrentTime} {...audioState} />
              )}
            </Stack>
          </Box>
        </Grid>
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

export default Player;
