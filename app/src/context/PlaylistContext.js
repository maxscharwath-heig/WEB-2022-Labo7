import { createContext, useState } from "react";

export const PlaylistContext = createContext({});

export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState(null);

  const fetchPopularPlaylists = async () => {
    const response = await fetch("http://localhost:8080/popular/playlists");
    return await response.json();
  };

  const fetchPlaylist = async (playlistId) => {
    const response = await fetch(
      `http://localhost:8080/playlist/${playlistId}`
    );
    return await response.json();
  };

  return (
    <PlaylistContext.Provider
      value={{
        fetchPopularPlaylists,
        fetchPlaylist,
        playlist,
        setPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
