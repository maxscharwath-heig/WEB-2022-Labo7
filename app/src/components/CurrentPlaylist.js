import { List, Divider, Box } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import SongRow from './SongRow'
import React from 'react'

export default function PopularPlaylists({ playlist, onClickTrack, onClickBack }) {
   return (
      <>
         <Box
            onClick={() => onClickBack()}
            sx={{
               display: 'flex',
               alignItems: 'center',
            }}
         >
            <ArrowBack
               sx={{
                  flexShrink: 0,
               }}
            />
            <span>Back to playlists</span>
         </Box>
         <Box
            sx={{
               display: 'flex',
            }}
         >
            <img src={playlist.picture_medium} alt='playlistCover' />
            <div>
               <h3>Playlist</h3>
               <h1>{playlist.title}</h1>
               <h2>{playlist.id}</h2>
            </div>
         </Box>

         <List>
            {playlist.tracks.data.map((track) => [
               <SongRow track={track} onClick={() => onClickTrack(track)} key={track.id} />,
               <Divider component='li' />,
            ])}
         </List>
      </>
   )
}
