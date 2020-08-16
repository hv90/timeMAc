import path from 'path';
import fs from 'fs';


const dirClient = path.resolve("./data/client.json");
const {Access_token} = JSON.parse(fs.readFileSync(dirClient));

export function getSearchParams(track, artist, type="track"){    
    return {        
        method: "get",
        headers: {'Authorization': 'Bearer ' + Access_token},
        json: true,
        url: `https://api.spotify.com/v1/search?q=track:${track}+artist:${artist}&type=${type}`        
    };
}