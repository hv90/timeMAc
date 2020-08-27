import { OAuth, cb } from './lastfmOauth.js';
import { setArtists, getTotalPages } from './lastfmUserArtists.js';
import { setUserTopTracks } from './lastfmUserTopTracks.js';

export default function Lastfm(){};

Lastfm.prototype.OAuth = OAuth;
Lastfm.prototype.cb = cb;
Lastfm.prototype.setArtists = setArtists;
Lastfm.prototype.setUserTopTracks = setUserTopTracks;
//Lastfm.prototype.cb = cb;
