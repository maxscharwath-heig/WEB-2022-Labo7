import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function PlaylistCard({ playlist, onPlaylistClick }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => onPlaylistClick(playlist)}>
        <CardMedia
          component="img"
          image={playlist.picture_big}
          alt={playlist.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {playlist.title}
          </Typography>
          <Typography variant="caption" component="div">
            {playlist.user.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
