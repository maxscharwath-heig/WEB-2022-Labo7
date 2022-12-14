import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const PlaylistCard = ({ playlist, onCardClick }) => {
  return (
    <Card position="relative">
      <CardActionArea onClick={() => onCardClick(playlist)}>
        <CardMedia
          component="img"
          image={playlist.picture_big}
          alt={playlist.title}
        />
        <CardContent
          background="transparent"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            bgcolor: "rgba(0, 0, 0, 0.54)",
            color: "white",
          }}
        >
          <Typography variant="h6" component="div">
            {playlist.title}
          </Typography>
          <Typography variant="caption" component="div">
            {playlist.user.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlaylistCard;
