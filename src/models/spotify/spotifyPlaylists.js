import path from 'path';
import fs from 'fs';
import axios from 'axios';

const dirPlaylists = './playlists/';
const dirClient = path.resolve("./data/client.json");
const { Access_token, UserProfileId } = JSON.parse(fs.readFileSync(dirClient));

export function getCreatePlaylistParams(plName, description = '') {
  return {
    method: "post",
    headers: { 'Authorization': 'Bearer ' + Access_token },
    data: { name: plName, description: description },
    json: true,
    url: `https://api.spotify.com/v1/users/${UserProfileId}/playlists`
  };
}

export function savePlaylistData(data) {
  const {name} = data;
  const dirPlaylists = path.resolve(`./playlists/${name}.json`);
  
  fs.writeFileSync(dirPlaylists, JSON.stringify(data), 'utf-8', err => console.log(err));
}

export function getAddTracksToPlaylistParams(plName, songs) {
  
  const {id} = JSON.parse(fs.readFileSync(dirPlaylists + plName + '.json'));
  console.log(plName, songs, id)
  axios ({
    method: "post",
    headers: { 'Authorization': 'Bearer ' + Access_token },
    data: { uris: songs },
    json: true,
    url: `https://api.spotify.com/v1/playlists/${id}/tracks`
  }).catch(err => console.error(err));
}