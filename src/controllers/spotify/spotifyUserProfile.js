import axios from 'axios';
import {getSpotifyUserProfileParams, setSpotifyUserProfileId} from '../../models/spotify/spotifyUserProfile.js';

export async function setUserProfileInfo(req, res){
    await axios(getSpotifyUserProfileParams())
        .then(result => setSpotifyUserProfileId(result.data.id))
        .catch(err => console.error(err.response.data.error));

    res.redirect('/');
    res.end()
}