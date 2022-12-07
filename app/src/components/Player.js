import { Box, Grid, Slider, Typography } from '@mui/material'
import { PlayerContext } from '../context/PlayerContext'
import { useContext } from 'react'
import { styled } from '@mui/material/styles'
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'

const CoverImage = styled('div')({
   width: 75,
   height: 75,
   objectFit: 'cover',
   overflow: 'hidden',
   '& > img': {
      width: '100%',
   },
})

const Player = () => {
   const { audioState, currentTrack, toggleTrack, playPrevious, playNext } = useContext(PlayerContext)
   return (
      <Box
         sx={{
            flexGrow: 1,
            border: 1,
            borderColor: 'lightgray',
            backgroundColor: 'white',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: 'sticky',
            width: '100%',
            bottom: 0,
         }}
      >
         <Grid container spacing={2}>
            <Grid item xs={3}>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CoverImage>
                     <img alt='currentCover' src={currentTrack?.album.cover_medium} />
                  </CoverImage>
                  <Box sx={{ ml: 1.5, minWidth: 0 }}>
                     <Typography variant='caption' fontWeight={500}>
                        {currentTrack?.title}
                     </Typography>
                     <Typography noWrap>test</Typography>
                  </Box>
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                  }}
                  gap={2}
               >
                  <Box>
                     <SkipPrevious
                        cursor="pointer"
                        onClick={() => {
                           playPrevious()
                        }}
                     />
                     {audioState.isPlaying ? (
                        <Pause
                           cursor="pointer"
                           onClick={() => {
                              toggleTrack()
                           }}
                        />
                     ) : (
                        <PlayArrow
                        cursor="pointer"
                           onClick={() => {
                              toggleTrack()
                           }}
                        />
                     )}

                     <SkipNext
                        onClick={() => {
                           playNext()
                        }}
                     />
                  </Box>

                  <Slider
                     size='small'
                     value={audioState.currentTime ?? 0}
                     max={audioState.duration ?? 0}
                     aria-label='Small'
                     valueLabelDisplay='auto'
                  />
               </Box>
            </Grid>
            <Grid item xs={3}>
               <Box textAlign='right'>
                  Powered by
                  <br />
                  <img src='./deezer-logo.svg' alt='Deezer logo' id='footer-logo' height={20} />
               </Box>
            </Grid>
         </Grid>
      </Box>
   )
}

export default Player
