import { Box, Grid, Slider, Typography, Stack } from '@mui/material'
import { PlayerContext } from '../context/PlayerContext'
import { useContext } from 'react'
import { styled } from '@mui/material/styles'
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'

// TODO: disable button when queue is empty

const CoverImage = styled('div')({
   width: 75,
   height: 75,
   objectFit: 'cover',
   overflow: 'hidden',
   '& > img': {
      width: '100%',
   },
})

const PlaySlider = ({ currentTime, duration }) => {
   const formattedTime = (duration) => {
      var m = Math.floor((duration % 3600) / 60)
      var s = Math.floor((duration % 3600) % 60)
      const minutes = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '0'
      const secs = s > 0 ? (s < 10 ? `0${s}` : s) : '00'

      return `${minutes}: ${secs}`
   }

   return (
      <>
         <small>{formattedTime(currentTime)}</small>
         <Slider
            size='small'
            value={currentTime ?? 0}
            max={duration ?? 0}
            aria-label='Small'
            valueLabelDisplay='auto'
         />
         <small>{formattedTime(duration)}</small>
      </>
   )
}

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
            width: '100%',
         }}
      >
         <Grid container alignItems='center'>
            <Grid item xs={4}>
               {currentTrack && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                     <CoverImage>
                        <img alt='currentCover' src={currentTrack?.album.cover_medium} />
                     </CoverImage>
                     <Box sx={{ ml: 1.5, minWidth: 0 }}>
                        <Typography variant='caption' fontWeight={500}>
                           {currentTrack?.artist.name}
                        </Typography>
                        <Typography noWrap>{currentTrack?.title}</Typography>
                     </Box>
                  </Box>
               )}
            </Grid>

            <Grid item xs={4}>
               <Box>
                  <Stack spacing={2} direction='row' alignItems='center' width={'100%'}>
                     <SkipPrevious
                        cursor='pointer'
                        onClick={() => {
                           playPrevious()
                        }}
                     />
                     {audioState.isPlaying ? (
                        <Pause
                           cursor='pointer'
                           onClick={() => {
                              toggleTrack()
                           }}
                        />
                     ) : (
                        <PlayArrow
                           cursor='pointer'
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

                     {currentTrack && <PlaySlider {...audioState} />}
                  </Stack>
               </Box>
            </Grid>
            <Grid item xs={4} paddingRight={2}>
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
