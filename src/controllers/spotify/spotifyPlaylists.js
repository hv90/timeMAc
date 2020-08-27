import axios from 'axios';
import DB from '../mysql/DB.js'
import { getCreatePlaylistParams,  savePlaylistData } from '../../models/spotify/spotifyPlaylists.js';

export async function createPlaylist(req, res) {console.log(req.query.plName, req.query.description)

    await axios(getCreatePlaylistParams(req.query.plName, req.query.description))
            .then(result => savePlaylistData(result.data))
            .catch(err => console.log(err.response.data.error));

    res.end();
}

export async function addTracksToPlaylist(req, res){
    const db = new DB();
    await db.spotifySearchUserTopTracksByArtist(req.query.plName, req.query.artist, res);
}
