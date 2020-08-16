import generateRandomString from '../../utils/generateRandomString.js';
import fs from 'fs';
import path from 'path';
import { getPortNumber } from '../../../app.js';

const dirClient = path.resolve("./data/client.json");
var { Id, Secret } = JSON.parse(fs.readFileSync(dirClient));

const redirect_uri = `http://localhost:${getPortNumber()}/callback`;

export function getLoginParams(req, res) {
  let stateKey = 'spotify_auth_state';
  let state = generateRandomString(16);
  let scope = 'user-read-private user-read-email user-library-modify user-library-read ' +
              'playlist-read-private playlist-modify-public';

  res.cookie(stateKey, state);

  return {
    response_type: 'code',
    client_id: Id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }
}

export function getSpotifyCBKParams(req, res) {
  let stateKey = 'spotify_auth_state';
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    return null;
  } else {
      res.clearCookie(stateKey);

      return {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(Id + ':' + Secret).toString('base64'))
        },
        json: true
      };    
  }
}

export function cbk(error, response, body){
    if (!error && response.statusCode === 200) {

      let access_token = body.access_token;
      let refresh_token = body.refresh_token;

      let client = {
        "Id": Id,
        "Secret": Secret,
        "Access_token": access_token,
        "Refresh_token": refresh_token
      };

      fs.writeFileSync(dirClient, JSON.stringify(client), 'utf-8', err => console.log(err));

      return [{
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      }, {access_token: access_token, refresh_token: refresh_token}]; 
    } else {
      return null;
    }
}