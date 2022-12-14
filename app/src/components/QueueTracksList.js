import React from 'react'
import { Divider, List } from '@mui/material'
import SongRow from './SongRow'

function QueueTracksList({ queue, onSongClick }) {
   return (
      <>
         <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
            {queue.map((track) => [
               <React.Fragment key={track.id}>
                  <SongRow
                     track={track}
                     onClick={() => {
                        onSongClick(track)
                     }}
                  />
                  <Divider component='li' />
               </React.Fragment>,
            ])}
         </List>
      </>
   )
}

export default QueueTracksList
