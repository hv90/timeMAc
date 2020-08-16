import axios from 'axios';
//import { getPortNumber } from '../../../app.js';

import { setTopTracksParamsByLimitAndPage } from '../../models/lastfm/lastfmUser.js';

import {
    createConnection,
    insertIntoTable,
    closeConnection
} from '../../models/lastfm/lastfmUserTopTracks.js';

const url = 'http://ws.audioscrobbler.com/2.0';

export const setUserTopTracks = async (req, res) => {
    let currPage = 1;
    let params = setTopTracksParamsByLimitAndPage(1000, currPage);

    const lastfmUserArtists_db = await createConnection();

    let i = 1;
    while (i) {
        i = await axios(url, { params })
            .then(result => {
                let res = result.data.toptracks
                //if (res === undefined) return -1;
                if (parseInt(res['@attr'].page) > parseInt(res['@attr'].totalPages)) return -1;

                res.track.forEach(async (track, index) => {
                    await insertIntoTable(currPage + " vs " +res['@attr'].page + " / " + res['@attr'].totalPages, lastfmUserArtists_db, track.artist.name, track.playcount, track.name)
                            .catch(err => console.log(err))
                });
                return 1;
            })
            .catch(async err => await closeConnection(lastfmUserArtists_db));

        if (i !== 1) {console.log(i + " - "+currPage ); break;}

        params = setTopTracksParamsByLimitAndPage(1000, currPage++);
    }
}