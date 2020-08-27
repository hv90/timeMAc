import { getPortNumber } from '../../app.js'
export function welcome(req, res) {
    res.write(`<h1>Lastfm</h1>`)
    res.write(`<a href=\'/lastfm/OAuth\'>
    Authenticate (If Required)</a> | `);

    res.write(`<a href=\'/lastfm/genre\'>
    Search Artists By Genre</a> | `);

    res.write(`<a href=\'/lastfm/new/user/artists\'>
    Set User Artists</a> | `);

    res.write(`<a href=\'/lastfm/new/user/tracks\'>
    Set User Tracks</a> | `);

    res.write(`<a href=\'/lastfm/new/user/toptracks\'>
    Set User TOP Tracks</a> | `);

    res.write(`<h1>Spotify</h1>`);
    res.write(`<a href=\'/spotify/login\'>
    Authenticate (If Required)</a> | `);

    res.write(`<a href=\'/spotify/new/user/tracks\'>
    Set User TOP Tracks</a> | `);
    
    res.write(`<a href=\'/spotify/new/playlist\'>
    Create a Spotify Playlist (plName, description)</a> | `);
    
    res.write(`<a href=\'/spotify/playlist\'>
    Add Tracks To a Spotify Playlist by Artist (plName, artist)</a> | `);

    res.end();

}