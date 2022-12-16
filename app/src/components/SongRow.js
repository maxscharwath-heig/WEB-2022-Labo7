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
import PlayingIcon from "./PlayingIcon";

const SongRow = ({ isPlaying, index, track, onClick, children }) => {
  return (
    <ListItem secondaryAction={children} disablePadding>
      <ListItemButton
        selected={isPlaying}
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
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",
                color: "white",
                bgcolor: "rgba(0, 0, 0, 0.54)",
              }}
            >
              <PlayingIcon />
            </Box>
          )}
        </Card>
        <ListItemText
          primary={track.title}
          secondary={track.artist.name}
          sx={{ flex: 1 }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SongRow;
