import PlaylistCard from "./PlaylistCard";
import { Grid } from "@mui/material";
import Page from "./Page";

export default function PopularPlaylists({playlists, onPlaylistClick}) {

  return (
    <Page
        toolbar={<h1>Popular playlists</h1>}
    >
      <Grid container columns={{ xs: 1, sm: 2, md: 4 }} spacing={0.5}>
        {playlists.map((playlist) => (
          <Grid item xs={1} sm={1} md={1} key={playlist.id}>
            <PlaylistCard
              playlist={playlist}
              onCardClick={onPlaylistClick}
            />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
