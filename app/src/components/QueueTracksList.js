import React from 'react'
import { List, Divider } from '@mui/material'
import SongRow from './SongRow'

function QueueTracksList(props) {
   return (
      <>
         {/* {props.queue.map((track) => (
               <ListItem key={track.id}>
                  <ListItemAvatar>
                    <img src={track.album.cover_small} alt={track.title} />
                  </ListItemAvatar>
                  <ListItemText primary={track.title} secondary={track.artist.name} />
               </ListItem>
            ))} */}
         <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
            {props.queue.map((track) => [
               <SongRow
                  track={track}
                  onClick={() => {
                     console.log(track.id)
                  }}
                  key={track.id}
               />,
               <Divider component='li' />,
            ])}
         </List>
      </>
   )
}

export default QueueTracksList
