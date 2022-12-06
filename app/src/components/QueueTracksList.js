import React from "react";
import {List, ListItem,ListItemAvatar,Avatar,ListItemText,Typography} from '@mui/material'

function QueueTracksList(props) {
    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {props.queue.map(track=> (
                    <ListItem key={track.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <img src={track.album.cover_medium} alt={track.title} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={track.title} secondary={track.artist.name} />
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default QueueTracksList;
