import { createContext, useEffect, useState } from "react";

export const PlayerContext = createContext({});

export const PlayerProvider = ({ children }) => {
  const [pastTracks, setPastTracks] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [audio] = useState(new Audio());
  const [audioState, setAudioState] = useState({
    currentTime: 0,
    duration: 0,
    isPlaying: false,
  });

  const addToQueue = (...tracks) => {
    setQueue([...queue, ...tracks]);
  };

  const removeFromQueueAt = (targetIndex) => {
    setQueue(queue.filter((_, index) => index !== targetIndex));
  };

  const toggleTrack = () => {
    if (audioState.isPlaying) {
      audio.pause();
    } else {
      if (!currentTrack && queue.length > 0) {
        playTrack(queue[0]);
      } else {
        audio.play();
      }
    }
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
    audio.src = track.preview;
    document.title = track.title;
    audio.play();
  };

  const playNext = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue(queue.slice(1));
      setPastTracks([currentTrack, ...pastTracks]);
      playTrack(nextTrack);
    }
  };

  const playPrevious = () => {
    if (pastTracks.length > 0) {
      const previousTrack = pastTracks[0];
      setPastTracks(pastTracks.slice(1));
      playTrack(previousTrack);
    }
  };

  const setCurrentTime = (time) => {
    audio.currentTime = time;
  };

  useEffect(() => {
    const updateAudioState = () => {
      setAudioState({
        currentTime: audio.currentTime,
        duration: audio.duration,
        isPlaying: !audio.paused,
      });
    };
    audio.addEventListener("ended", playNext);
    audio.addEventListener("play", updateAudioState);
    audio.addEventListener("pause", updateAudioState);
    audio.addEventListener("timeupdate", updateAudioState);

    return () => {
      audio.removeEventListener("ended", playNext);
      audio.removeEventListener("play", updateAudioState);
      audio.removeEventListener("pause", updateAudioState);
      audio.removeEventListener("timeupdate", updateAudioState);
    };
  });

  return (
    <PlayerContext.Provider
      value={{
        queue,
        currentTrack,
        audioState,
        addToQueue,
        toggleTrack,
        playTrack,
        playNext,
        playPrevious,
        setCurrentTime,
        removeFromQueueAt,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
