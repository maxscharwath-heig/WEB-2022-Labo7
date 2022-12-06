import PlaylistCard from "./PlaylistCard";
import { Grid } from "@mui/material";

export default function PopularPlaylists({playlists, onPlaylistClick}) {

  return (
    <>
      <h1>Playlists</h1>
      <Grid container columns={{ xs: 1, sm: 2, md: 4 }} spacing={0.5}>
        {playlists.map((playlist) => (
          <Grid item xs={1} sm={1} md={1} key={playlist.id}>
            <PlaylistCard
              playlist={playlist}
              onPlaylistClick={onPlaylistClick}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
