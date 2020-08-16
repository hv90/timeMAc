import { getPortNumber } from '../../app.js'
export function welcome(req, res) {
    res.write(`<a href=\'http://localhost:${getPortNumber()}/lastfm/OAuth\'>
    Authenticate (If Required)</a> | `);

    res.write(`<a href=\'http://localhost:${getPortNumber()}/lastfm/user/artists\'>
    Set User Artists</a> | `);

    res.write(`<a href=\'http://localhost:${getPortNumber()}/lastfm/user/tracks\'>
    Set User Tracks</a> | `);

    res.write(`<a href=\'http://localhost:${getPortNumber()}/lastfm/user/toptracks\'>
    Set User TOP Tracks</a> | `);

    res.end();

}