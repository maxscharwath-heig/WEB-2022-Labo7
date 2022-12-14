import { Avatar, ListItem, ListItemButton, ListItemText } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const SongRow = ({ track, onClick, children }) => {
  return (
    <ListItem secondaryAction={children} disablePadding>
      <ListItemButton
        onClick={onClick}
        sx={{
          display: "flex",
        }}
      >
        <Avatar
          src={track.album.cover_small}
          alt="trackCover"
          variant="rounded"
          sx={{ marginRight: "1rem" }}
        >
          <MusicNoteIcon />
        </Avatar>
        <ListItemText primary={track.title} secondary={track.artist.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default SongRow;
