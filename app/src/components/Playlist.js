import {Box, Button, Divider, List} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import SongRow from "./SongRow";
import React, {useContext, useEffect, useState} from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import Page from "./Page";
import {PlayerContext} from "../context/PlayerContext";
import {useNavigate, useParams} from "react-router-dom";

const fetchPlaylist = async (playlistId) => {
    const response = await fetch(
        `http://localhost:8080/playlist/${playlistId}`
    );
    return await response.json();
};

export default function Playlist() {
    const {addToQueue, playTrack} = useContext(PlayerContext);
    const [playlist, setPlaylist] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        console.log(id);
        fetchPlaylist(id).then(setPlaylist).catch(console.error);
    }, [id]);

    function handleAddToQueue(e, track) {
        e.stopPropagation();
        addToQueue(track);
    }

    function handleClickTrack(e, track) {
        e.stopPropagation();
        playTrack(track);
    }

    return (
        <Page
            toolbar={
                <Button
                    variant="plain"
                    startIcon={<ArrowBack/>}
                    size="small"
                    onClick={() => navigate("/")}
                >
                    Back to playlists
                </Button>
            }
        >
            <Box sx={{display: "flex", flexDirection: "column", height: "100%"}}>
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <img src={playlist?.picture_medium} alt="playlistCover"/>
                    <div>
                        <h3>Playlist</h3>
                        <h1>{playlist?.title}</h1>
                        <h2>{playlist?.id}</h2>
                    </div>
                </Box>
                <List sx={{overflow: 'auto', flex: 1, mt: 2}}>
                    {playlist?.tracks.data.map((track) => (
                        <React.Fragment key={track.id}>
                            <SongRow track={track} onClick={(e) => handleClickTrack(e, track)}>
                                <Button
                                    variant="outlined"
                                    startIcon={<QueueMusicIcon/>}
                                    size="small"
                                    onClick={(e) => handleAddToQueue(e, track)}
                                >
                                    Add to queue
                                </Button>
                            </SongRow>
                            <Divider component="li"/>
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Page>
    );
}
