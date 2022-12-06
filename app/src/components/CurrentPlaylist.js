import PlaylistCard from "./PlaylistCard";
import { Grid } from "@mui/material";

export default function PopularPlaylists({playlist, onClickTrack, onClickBack}) {
  console.log(playlist);
  return (
    <>
      <button onClick={()=>onClickBack()}>Back</button>
      <h1>{playlist.title}</h1>
      <h2>{playlist.id}</h2>
      <Grid container columns={{ xs: 1, sm: 2, md: 4 }} spacing={0.5}>
        {playlist.tracks.data.map((track) => (
          <p onClick={()=>onClickTrack(track)}>{track.title}</p>
        ))}
      </Grid>
    </>
  );
}
