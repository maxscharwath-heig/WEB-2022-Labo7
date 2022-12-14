import {
  Avatar,
  Box,
  Card,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const SongRow = ({ isPlaying, index, track, onClick, children }) => {
  return (
    <ListItem secondaryAction={children} disablePadding>
      <ListItemButton
        onClick={onClick}
        sx={{
          display: "flex",
        }}
      >
        <Typography variant="caption" width={10}>
          {index}
        </Typography>
        <Card
          sx={{
            position: "relative",
            marginX: "1rem",
          }}
        >
          <Avatar
            src={track.album.cover_small}
            alt="trackCover"
            variant="square"
          >
            <MusicNoteIcon />
          </Avatar>
          {isPlaying && (
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100%",
                color: "white",
                bgcolor: "rgba(0, 0, 0, 0.54)",
              }}
            >
              <PlayCircleIcon />
            </Box>
          )}
        </Card>
        <ListItemText primary={track.title} secondary={track.artist.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default SongRow;
