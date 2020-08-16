import { OAuth, cb } from '../controllers/lastfm/lastfmOauth.js';
import { setArtists, getTotalPages } from '../controllers/lastfm/lastfmUserArtists.js';
//import {setUserTracks} from '../controllers/lastfm/lastfmUserTracks.js';
import { setUserTopTracks } from '../controllers/lastfm/lastfmUserTopTracks.js';
import { welcome } from '../controllers/index.js';
import { login, cb2 } from '../controllers/spotify/spotifyOauth.js';
import { getIdTracks } from '../controllers/spotify/spotifyPlaylists.js';
import {
    searchUserArtistsByGenre,
    searchUserTopTracksByArtist,
    searchUserTopTracksBySong
} from '../models/mysql/queryLastfmDB.js';




export function router(app) {
    //app.get('/lastfm', (req, res) => welcome(req, res));

    //app.get('/lastfm/OAuth', (req, res) => OAuth(req, res));

    //app.get('/lastfm/cb', (req, res) => cb(req, res));

    //app.get('/lastfm/user/artists', (req, res) => getTotalPages(req, res));

    //app.get('/lastfm/user/tracks', (req, res) => setUserTracks(req, res));    

    //app.get('/lastfm/user/toptracks', (req, res) => setUserTopTracks(req, res)); 

    app.get('/spotify/login', (req, res) => login(req, res));

    app.get('/callback', (req, res) => cb2(req, res));

    app.get('/spotify/search', (req, res) => getIdTracks(req, res));

    app.get('/db/genre', (req, res) => searchUserArtistsByGenre(req.query.q, res));

    app.get('/db/artist', (req, res) => searchUserTopTracksByArtist(req.query.q, res));

    app.get('/db/song', (req, res) => searchUserTopTracksBySong(req.query.q, res));
}
