import { createContext, useEffect, useState } from "react";

export const PlayerContext = createContext({});

export const PlayerProvider = ({ children }) => {
  const [pastTracks, setPastTracks] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [audio] = useState(new Audio());

  const addToQueue = (...tracks) => {
    setQueue([...queue, ...tracks]);
  };

  const removeFromQueueAt = (targetIndex) => {
    setQueue(queue.filter((_, index) => index !== targetIndex));
  };

  const toggleTrack = () => {
    if (!audio.paused) {
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
    } else {
      audio.src = "";
      setCurrentTrack(null);
    }
  };

  const playPrevious = () => {
    if (audio.currentTime >= 4) {
      audio.currentTime = 0;
      return;
    }
    if (pastTracks.length > 0) {
      const previousTrack = pastTracks[0];
      setPastTracks(pastTracks.slice(1));
      playTrack(previousTrack);
    } else {
      audio.src = "";
      setCurrentTrack(null);
    }
  };

  const setCurrentTime = (time) => {
    audio.currentTime = time;
  };

  useEffect(() => {
    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("ended", playNext);
    };
  });

  return (
    <PlayerContext.Provider
      value={{
        queue,
        currentTrack,
        audio,
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
