import querystring from 'querystring';
import request from 'request';
import { getLoginParams, getSpotifyCBKParams, cbk } from '../../models/spotify/spotifyOauth.js';


export function login(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify(getLoginParams(req, res))
  )
}

export function cb(req, res) {
  let params = getSpotifyCBKParams(req, res);

  if (params === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    request.post(params, function (error, response, body) {
      const options = cbk(error, response, body);
      const { access_token, refresh_token } = options[1];

      if (options[0]) {
        res.redirect('/spotify/new/user/profile');
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    })
  }
}