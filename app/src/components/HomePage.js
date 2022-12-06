import { useState, useEffect } from "react";
import PlaylistCard from "./PlaylistCard";
import { Grid } from "@mui/material";

async function getPlaylists() {
  const response = await fetch("http://localhost:8080/popular/playlists");
  const data = await response.json();

  return data;
}

export default function HomePlage() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylists().then(setPlaylists).catch(console.error);
  }, []);

  return (
    <div className="playlist-grid">
      <Grid container={true} spacing={0.5}>
        {playlists.map((playlist) => (
          <Grid item={true} xs={2} sm={4} md={4} key={playlist.id}>
            <PlaylistCard playlist={playlist} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
