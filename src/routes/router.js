import Lastfm from '../controllers/lastfm/Lastfm.js';
import { welcome } from '../controllers/index.js';
import Spotify from '../controllers/spotify/Spotify.js';
import DB from '../controllers/mysql/DB.js';


let lastfm = new Lastfm();
let spotify = new Spotify();
let db = new DB();

export function router(app) {

    app.get('/', (req, res) => welcome(req, res));

    app.get('/lastfm/OAuth', (req, res) => lastfm.OAuth(req, res));

    app.get('/lastfm/cb', (req, res) => lastfm.cb(req, res));

    //app.get('/lastfm/new/user/artists', (req, res) => getTotalPages(req, res));

    //app.get('/lastfm/new/user/tracks', (req, res) => setUserTracks(req, res));    

    app.get('/lastfm/new/user/toptracks', (req, res) => lastfm.setUserTopTracks(req, res));

    app.get('/spotify/login', (req, res) => spotify.login(req, res));

    app.get('/callback', (req, res) => spotify.cb(req, res));

    app.get('/spotify/new/user/tracks', (req, res) => spotify.getUserTopTracks(req, res));

    app.get('/spotify/new/user/profile', async (req, res) => await spotify.setUserProfileInfo(req, res));

    app.get('/spotify/new/playlist', (req, res) => spotify.createPlaylist(req, res));

    app.get('/spotify/playlist/', (req, res) => db.spotifySearchUserTopTracksByArtist(req, res));
    
    app.get('/spotify/artist', (req, res) => db.spotifySearchUserTopTracksByArtist(req, res));

    app.get('/spotify/song', (req, res) => db.spotifySearchUserTopTracksBySong(req.query.q, res));

    app.get('/lastfm/genre', (req, res) => db.lastfmSearchUserArtistsByGenre(req.query.q, res));

    app.get('/lastfm/artist', (req, res) => db.lastfmSearchUserTopTracksByArtist(req.query.q, res));

    app.get('/lastfm/song', (req, res) => db.lastfmSearchUserTopTracksBySong(req.query.q, res));
}
