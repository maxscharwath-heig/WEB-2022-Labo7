import {Avatar, Box, Grid, IconButton, Slider, Stack, Typography} from '@mui/material'
import {PlayerContext} from '../context/PlayerContext'
import {useContext, useEffect, useState} from 'react'
import {Pause, PlayArrow, SkipNext, SkipPrevious} from '@mui/icons-material'

// TODO: disable button when queue is empty

function FormattedTime({duration}) {
    const minutes = Math.floor(duration / 60).toString().padStart(2, '0')
    const seconds = Math.floor(duration % 60).toString().padStart(2, '0')
    return (<small>{minutes}:{seconds}</small>)
}


function PlaySlider({currentTime, duration, setCurrentTime}) {
    const [value, setValue] = useState(0);
    // set value with props but keep the possibility to change it with the slider

    useEffect(() => {
        setValue(currentTime);
    }, [currentTime]);

    function handleChange(newValue) {
        setCurrentTime(newValue);
        setValue(newValue);
    }

    return (
        <>
            <FormattedTime duration={currentTime ?? 0}/>
            <Slider
                size='small'
                min={0}
                max={duration}
                value={value}
                onChange={(e, newValue) => handleChange(newValue)}
            />
            <FormattedTime duration={duration ?? 0}/>
        </>
    )
}

const Player = () => {
    const {audioState, currentTrack, toggleTrack, playPrevious, playNext, setCurrentTime} = useContext(PlayerContext)
    return (
        <Box
            sx={{
                border: 1,
                borderColor: 'lightgray',
                backgroundColor: 'white',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                width: '100%',
            }}
        >
            <Grid container alignItems='center' sx={{height: 75}}>
                <Grid item xs={4}>
                    {currentTrack && (
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Avatar src={currentTrack.album.cover_medium} alt='trackCover' variant='square'
                                    sx={{height: 75, width: "auto"}}/>
                            <Box sx={{ml: 1.5, minWidth: 0}}>
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
                        <Stack spacing={2} direction='row' justifyContent='center' alignItems='center'>
                            <IconButton onClick={() => {
                                playPrevious()
                            }}>
                                <SkipPrevious/>
                            </IconButton>
                            <IconButton onClick={() => {
                                toggleTrack()
                            }}>
                                {audioState.isPlaying ? <Pause/> : <PlayArrow/>}
                            </IconButton>
                            <IconButton onClick={() => {
                                playNext()
                            }}>
                                <SkipNext/>
                            </IconButton>

                            {currentTrack && <PlaySlider setCurrentTime={setCurrentTime} {...audioState} />}
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4} paddingRight={2}>
                    <Box textAlign='right'>
                        Powered by
                        <br/>
                        <img src='/deezer-logo.svg' alt='Deezer logo' id='footer-logo' height={20}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Player
