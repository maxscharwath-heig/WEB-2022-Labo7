import PlaylistCard from "./PlaylistCard";
import {Grid} from "@mui/material";
import Page from "./Page";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const fetchPopularPlaylists = async () => {
    const response = await fetch("http://localhost:8080/popular/playlists");
    return await response.json();
};

export default function PopularPlaylists() {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPopularPlaylists().then(setPlaylists).catch(console.error);
    });

    function handlePlaylistClick(playlist) {
        navigate(`/playlist/${playlist.id}`)
    }

    return (
        <Page
            toolbar={<h1>Popular playlists</h1>}
        >
            <Grid container columns={{xs: 1, sm: 2, md: 4}} spacing={0.5}>
                {playlists.map((playlist) => (
                    <Grid item xs={1} sm={1} md={1} key={playlist.id}>
                        <PlaylistCard
                            playlist={playlist}
                            onCardClick={handlePlaylistClick}
                        />
                    </Grid>
                ))}
            </Grid>
        </Page>
    );
}
