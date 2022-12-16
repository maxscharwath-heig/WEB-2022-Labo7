import { Grid, IconButton, Slider, Stack } from "@mui/material";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";

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

function PlaySlider({ audio, setCurrentTime }) {
  const [value, setValue] = useState(0);
  const [{ duration, currentTime }, setAudioState] = useState(audio);
  useEffect(() => {
    const updateAudioState = () => {
      setAudioState({
        duration: audio.duration,
        currentTime: audio.currentTime,
      });
    };
    audio.addEventListener("timeupdate", updateAudioState);

    return () => {
      audio.removeEventListener("timeupdate", updateAudioState);
    };
  }, [audio]);

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
    audio,
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

  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const handlePlay = () => {
      setIsPlaying(!audio.paused);
    };
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePlay);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePlay);
    };
  });

  return (
    <Grid item xs={4}>
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
          {isPlaying ? <Pause /> : <PlayArrow />}
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
          <PlaySlider setCurrentTime={setCurrentTime} audio={audio} />
        )}
      </Stack>
    </Grid>
  );
};

export default Player;
