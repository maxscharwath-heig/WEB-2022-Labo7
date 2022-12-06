import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function PlaylistCard({ playlist }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        image={playlist.picture_big}
        alt={playlist.title}
      />
      <CardContent>
        <Typography gutterBottom={true} variant="h5" component="div">
          {playlist.title}
        </Typography>
        <Typography gutterBottom={true} variant="h5" component="div">
          {playlist.user.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
