import path from 'path';
import fs from 'fs';


const dirClient = path.resolve("./data/client.json");
const {Access_token, Id, Secret, Refresh_token} = JSON.parse(fs.readFileSync(dirClient));

export function getSpotifyUserProfileParams (){
    return {
        method: "get",
        headers: {'Authorization': 'Bearer ' + Access_token},
        json: true,
        url: 'https://api.spotify.com/v1/me'
    }
}

export function setSpotifyUserProfileId(userId){
    let client = {
        "Id": Id,
        "Secret": Secret,
        "Access_token": Access_token,
        "Refresh_token": Refresh_token,
        "UserProfileId": userId
      };

      fs.writeFileSync(dirClient, JSON.stringify(client), 'utf-8', err => console.log(err));

}