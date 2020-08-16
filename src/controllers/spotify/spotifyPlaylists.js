import axios from 'axios';
import { getSearchParams } from '../../models/spotify/spotifyPlaylists.js';

export async function getIdTracks(req, res) {

    await axios(getSearchParams(req.query.track, req.query.artist))
            .then(result => console.log(result.data.tracks.items))
            .catch(err => console.log(err.response.statusText));

    res.end();
}
