import axios from 'axios';
import { getPortNumber } from '../../../app.js';

import {
    setTracksParamsByLimitAndPage,
    setRecentTracksParamsByLimitAndPage
} from '../../models/lastfm/lastfmUser.js';

/* import {
    createConnection,
    insertIntoTable,
    closeConnection
} from '../models/lastfmUserArtists.js'; */

const url = 'http://ws.audioscrobbler.com/2.0';

async function getTrackPlayCount(trackName, trackIndex) {
    let params = setTracksParamsByLimitAndPage(100, 1);





    //let totalPages = getTotalPages();

    let currPage = 1;
    let i = 1;
    while (i) {
        i = await axios(url, { params })
            .then(result => {
                let res = result.data.toptracks
                if(res === undefined) return -1;
                if (currPage > res['@attr'].totalPages) return -1;
                res.track.forEach((track, index) => {
                    if (track.name === trackName) {console.log(trackIndex, trackName, currPage, index)
                    return 0;}
                });
                
                return 1;

            })
            .catch(err => console.log(err));
        if(i !== 1) break;

        params = setTracksParamsByLimitAndPage(100, currPage++);
        console.log(currPage)
    }
    console.log("not found", i, currPage)



}

export const setUserTracks = async (req, res) => {

    let params = setRecentTracksParamsByLimitAndPage(10, 1);
    //let lastfmUserArtists_db = await createConnection();


    await axios.get(url, { params })
        .then(result => {
            result.data.recenttracks.track.map((track, index) => {
                getTrackPlayCount(track.name, index)
            })
        }
        )
        /* .then(tracks => {
            tracks.forEach(
                track => {
                    res.write(`${track.artist} - ${track.song} - ${track.playcount}<br><br>`)
                }
            );
            res.end();
        }
        ) */
        .catch(err => console.log(err));
}