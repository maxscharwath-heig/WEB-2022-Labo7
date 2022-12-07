import { Box, Grid, Slider } from '@mui/material'
import { PlayerContext } from '../context/PlayerContext'
import { useContext } from 'react'

const Player = ({ currentSong }) => {
  const { audioState,currentTrack } = useContext(PlayerContext)
   return (
      <Box
         sx={{
            flexGrow: 1,
            border: 1,
            borderColor: 'lightgray',
            backgroundColor: 'white',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: 'sticky',
            bottom: 0,
            height: 60,
         }}
      >
         <Grid
            container
            justify="space-between"
         >
            <Grid item xs>
               <Box>
                  <img
                    src={currentTrack?.album.cover_medium}
                    alt='cover'
                    height={50}
                  />
                 {currentTrack?.title}
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Slider size='small' value={audioState.currentTime??0} max={audioState.duration??0} aria-label='Small' valueLabelDisplay='auto' />
            </Grid>
            <Grid item xs>
              {audioState.currentTime}
            </Grid>
         </Grid>
      </Box>
   )
}

export default Player
