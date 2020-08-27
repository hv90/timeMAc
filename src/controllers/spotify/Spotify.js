import { login, cb } from './spotifyOauth.js';
import { createPlaylist, addTracksToPlaylist } from './spotifyPlaylists.js';
import {getUserTopTracks} from './spotifyUserTopTracks.js';
import {setUserProfileInfo} from './spotifyUserProfile.js';
import {
    getUserTopTracksParams,
    createConnection,
    insertIntoTable,
    closeConnection
} from '../../models/spotify/spotifyUserTopTracks.js';

export default function Spotify(){};

Spotify.prototype.login = login;
Spotify.prototype.cb = cb;
Spotify.prototype.getUserTopTracks = getUserTopTracks;
Spotify.prototype.getUserTopTracksParams = getUserTopTracksParams;
Spotify.prototype.createConnection = createConnection;
Spotify.prototype.insertIntoTable = insertIntoTable;
Spotify.prototype.closeConnection = closeConnection;
Spotify.prototype.setUserProfileInfo = setUserProfileInfo;
Spotify.prototype.createPlaylist = createPlaylist;
Spotify.prototype.addTracksToPlaylist = addTracksToPlaylist;