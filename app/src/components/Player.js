import { Box, Grid, Slider } from '@mui/material'

const Player = ({ currentSong }) => {
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
                     src='https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
                     alt='cover'
                     height={50}
                  />
                  tds
                  sfasdf
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Slider size='small' defaultValue={70} aria-label='Small' valueLabelDisplay='auto' />
            </Grid>
            <Grid item xs>
               xs
            </Grid>
         </Grid>
      </Box>
   )
}

export default Player
