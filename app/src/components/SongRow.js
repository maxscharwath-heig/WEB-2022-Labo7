import { ListItem, ListItemText } from '@mui/material'

const SongRow = ({ track, onClick }) => {
   return (
      <div onClick={onClick}>
         <ListItem
            sx={{
               display: 'flex',
            }}
         >
            <img src={track.album.cover_small} alt='trackCover' />
            <ListItemText primary={track.title} secondary={track.artist.name} />
         </ListItem>
      </div>
   )
}

export default SongRow
