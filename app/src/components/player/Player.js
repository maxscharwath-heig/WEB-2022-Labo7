import { Grid, IconButton, Slider, Stack } from '@mui/material'
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react'
import { PlayerContext } from '../../context/PlayerContext'

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
  const [audioState, setAudioState] = useState({
    currentTime: 0,
    duration: 0,
  });
  useEffect(() => {
    const updateAudioState = () => {
      setAudioState({
        currentTime: audio.currentTime,
        duration: audio.duration,
      });
    };
    const handlePlay = () => {
      setIsPlaying(!audio.paused);
    }
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePlay);
    audio.addEventListener("timeupdate", updateAudioState);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePlay);
      audio.removeEventListener("timeupdate", updateAudioState);
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
          <PlaySlider setCurrentTime={setCurrentTime} {...audioState} />
        )}
      </Stack>
    </Grid>
  )
}

export default Player
