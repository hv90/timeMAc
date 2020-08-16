import querystring from 'querystring';
import request from 'request';
import { getLoginParams, getSpotifyCBKParams, cbk } from '../../models/spotify/spotifyOauth.js';


export function login(req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify(getLoginParams(req, res))
    )
}

export function cb2(req, res) {
    let params = getSpotifyCBKParams(req, res);

    if (params === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        request.post(params, function (error, response, body) {
            const options = cbk(error, response, body);
            const {access_token, refresh_token} = options[1];

            if (options[0] !== null) {
                // use the access token to access the Spotify Web API
                request.get(options[0], function (error, response, body) {
                    console.log(options[0]);console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: options[1].access_token,
                        refresh_token: options[1].refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        })
    }
}