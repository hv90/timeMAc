import axios from 'axios';
import { getPortNumber } from '../../../app.js';

import {
    setArtistsParamsByPage,
    setTagsParamsByArtist
} from '../../models/lastfm/lastfmUser.js';

import {
    createConnection,
    insertIntoTable,
    closeConnection
} from '../../models/lastfm/lastfmUserArtists.js';

const url = 'http://ws.audioscrobbler.com/2.0';

async function getTags(params) {
    let artistTags = [];

    await axios(url, { params })
        .then(result => {
            artistTags = result.data.toptags.tag.map(
                tag => { return tag.name }
            );
        })
        .catch(err => console.log(err));

    return await artistTags.slice(0, 6).toString();
}

export async function getTotalPages(req, res) {
    let params = setArtistsParamsByPage(1);

    await axios.get(url, { params })
        .then(async result => {
            let i = 0;
            let totalPages = await result.data.topartists['@attr'].totalPages;
            while (i < totalPages) {
                res.write(`<a href=\'http://localhost:${getPortNumber()}/lastfm/user/artists?page=${i + 1}\'>
                Set Page ${i + 1}</a> | `); i++;
            }
        })
        .catch(async err => {
            await console.log(err)
        });
        setArtists(req, res)
}

export async function setArtists(req, res) {
    let params = setArtistsParamsByPage(parseInt(req.query.page));
    let lastfmUserArtists_db = await createConnection();

    await axios.get(url, { params })
        .then(async result => {
            Promise.all(result.data.topartists.artist.map(
                async artist => {
                    const tags = await getTags(setTagsParamsByArtist(artist.name));

                    await insertIntoTable(lastfmUserArtists_db, artist.name, artist.playcount, tags)
                        .catch(err => console.log(err))
                }
            ))
        })
        .catch(async err => {
            await closeConnection(lastfmUserArtists_db);
        });

    //res.end();
}


