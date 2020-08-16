import fs from "fs";
import path from 'path';

const dirAPIkey = path.resolve("./data/apiKey.json")
var file = JSON.parse(fs.readFileSync(dirAPIkey));

export function setArtistsParamsByPage (page) {
    return {
        method: "user.gettopartists",
        user: file.user,
        api_key: file.api_key,
        format: "json",
        period: "overall",
        limit: 1000,
        page: `${page}`
    }
}

export function setTagsParamsByArtist (artist){
    return { 
        method: "artist.gettoptags",
        api_key: file.api_key,
        format: 'json',
        artist: `${artist}`
    };
}

export function setTopTracksParamsByLimitAndPage (limit, page) {
    return {
        method: "user.gettoptracks",
        user: file.user,
        api_key: file.api_key,
        format: "json",
        period: "overall",
        limit: `${limit}`,
        page: `${page}`      
    };
}


export function setRecentTracksParamsByLimitAndPage (limit, page) {
    return { 
        method: "user.getrecenttracks",
        user: file.user,
        api_key: file.api_key,
        format: "json",
        period: "overall",
        limit: `${limit}`,
        page: `${page}`      
    };
}