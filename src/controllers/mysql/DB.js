import {
    lastfmCreateConnection, 
    lastfmSearchUserArtistsByGenre, 
    lastfmSearchUserTopTracksByArtist,
    lastfmSearchUserTopTracksBySong
} from '../../models/mysql/queryLastfmDB.js';

import {
    spotifyCreateConnection,
    spotifySearchUserTopTracksByArtist,
    spotifySearchUserTopTracksBySong,
    //spotifyGetUserTopTracksURIByArtist
} from '../../models/mysql/querySpotifyDB.js';

export default function DB (){};

DB.prototype.lastfmCreateConnection = lastfmCreateConnection;
DB.prototype.lastfmSearchUserArtistsByGenre = lastfmSearchUserArtistsByGenre;
DB.prototype.lastfmSearchUserTopTracksByArtist = lastfmSearchUserTopTracksByArtist;
DB.prototype.lastfmSearchUserTopTracksBySong = lastfmSearchUserTopTracksBySong;
DB.prototype.spotifyCreateConnection = spotifyCreateConnection;
DB.prototype.spotifySearchUserTopTracksByArtist = spotifySearchUserTopTracksByArtist;
DB.prototype.spotifySearchUserTopTracksBySong = spotifySearchUserTopTracksBySong;
//DB.prototype.spotifyGetUserTopTracksURIByArtist = spotifyGetUserTopTracksURIByArtist;

