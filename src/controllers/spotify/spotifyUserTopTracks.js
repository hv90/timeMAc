import axios from 'axios';
import Spotify from './Spotify.js';
import { insertIntoTable } from '../../models/lastfm/lastfmUserArtists.js';

export async function getUserTopTracks(req, res) {
    let offset = 6900;
    let next = 1;

    const spotify = new Spotify();
    const spotifyUserTracks_db = await spotify.createConnection();

    while (next) {
        next = await axios(spotify.getUserTopTracksParams(offset))
            .then(result => result.data.next ? result.data : 0)
            .catch(err => console.log(err.response.statusText));

        next && next.items.map(item => spotify.insertIntoTable(`${next.offset}/${next.total}`,
            spotifyUserTracks_db, item.added_at, item.track.uri, item.track.artists.map(
                artist => artist.name).toString(), item.track.album.name, item.track.name));

        offset += 50;
    }
    offset -= 50;
    next = await axios(spotify.getUserTopTracksParams(offset))
        .then(result => result.data)
        .catch(err => console.log(err.response.statusText));

    console.log(next)

    next && next.items.map(item => spotify.insertIntoTable(`${next.offset}/${next.total}`,
        spotifyUserTracks_db, item.added_at, item.track.uri, item.track.artists.map(
            artist => artist.name).toString(), item.track.album.name, item.track.name));

    res.end();

}