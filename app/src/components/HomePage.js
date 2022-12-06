import { useState, useEffect, useContext } from "react";
import PlaylistCard from "./PlaylistCard";
import { PlaylistContext } from "../context/PlaylistContext";
import { Grid } from "@mui/material";

function handlePlaylistClick(playlist) {
  console.log(playlist);
}

export default function HomePlage() {
  const { fetchPopularPlaylists } = useContext(PlaylistContext);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPopularPlaylists().then(setPlaylists).catch(console.error);
  }, [fetchPopularPlaylists]);

  return (
    <>
      <h1>Playlists</h1>
      <Grid container columns={{ xs: 1, sm: 2, md: 4 }} spacing={0.5}>
        {playlists.map((playlist) => (
          <Grid item xs={1} sm={1} md={1} key={playlist.id}>
            <PlaylistCard
              playlist={playlist}
              onPlaylistClick={handlePlaylistClick}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
