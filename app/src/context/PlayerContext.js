import { createContext, useState } from "react";

export const PlayerContext = createContext({});

export const PlayerProvider = ({ children }) => {
  const [pastTracks, setPastTracks] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());

  const addToQueue = (...tracks) => {
    setQueue([...queue, ...tracks]);
  };

  const toggleTrack = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
    audio.src = track.preview;
    audio.play();
    setIsPlaying(true);
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

  return (
    <PlayerContext.Provider
      value={{
        queue,
        currentTrack,
        addToQueue,
        toggleTrack,
        playTrack,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
