import mysql from 'mysql';
import {getAddTracksToPlaylistParams} from '../spotify/spotifyPlaylists.js';

export async function spotifyCreateConnection() {
    //database configs
    const config_db = {
        host: "localhost",
        user: "root",
        password: "password"
    }
    const USE_SCHEMA = "USE spotifyApp_db";

    //creating connection
    const spotify_db = await mysql.createConnection(config_db);

    //connecting to database
    await spotify_db.connect(async err => {
        if (err) throw err;
        console.log('connected to mysql');
    })

    await spotify_db.query(USE_SCHEMA, (err, result) => {
        if (err) throw err;
        console.log('schema is used');
    });

    return spotify_db;
}

export async function spotifySearchUserTopTracksByArtist(req, res) {
    const spotifyUserTopTracks_db = await spotifyCreateConnection();
    const QUERY_SONGS_BY_ARTIST = `SELECT * FROM spotifyUserTopTracks
                                    WHERE artist LIKE '%${req.query.artist}%'
                                    ORDER BY added_at DESC`;

    switch (typeof req.query.plName) {
        case 'string': await spotifyUserTopTracks_db.query(QUERY_SONGS_BY_ARTIST, async (err, results) => {
                        if (err) throw err;
                        getAddTracksToPlaylistParams( req.query.plName, results.map((result) => result.spotify_uri));
                    });
            break;

        default: await spotifyUserTopTracks_db.query(QUERY_SONGS_BY_ARTIST, async (err, results) => {
                    if (err) throw err;

                    res.write("#index | artist | album | song | added_at | spotify_uri\n")

                    results.forEach((result, index) => {
                        const { artist, album, song, added_at, spotify_uri } = result;
                        res.write(`#${index}: ${artist} | ${album} | ${song} | ${added_at} | ${spotify_uri}\n`);
                    });

                    await res.end();
                 });
            break;
    }
}

export async function spotifyAddTracksToPlaylistByArtist(artist, res) {
    const spotifyUserTopTracks_db = await spotifyCreateConnection();
    const QUERY_SONGS_BY_ARTIST = `SELECT * FROM spotifyUserTopTracks
                                    WHERE artist LIKE '%${artist}%'
                                    ORDER BY added_at DESC`;

    await spotifyUserTopTracks_db.query(QUERY_SONGS_BY_ARTIST, async (err, results) => {
        if (err) throw err;
        res.write("#index | artist | album | song | added_at | spotify_uri\n")
        results.forEach(async (result, index) => {
            const { artist, album, song, added_at, spotify_uri } = result;
            res.write(`#${index}: ${artist} | ${album} | ${song} | ${added_at} | ${spotify_uri}\n`);
        });
        await res.end();
    })
}

export async function spotifySearchUserTopTracksBySong(song, res) {
    const spotifyUserTopTracks_db = await spotifyCreateConnection();
    const QUERY_ARTIST_BY_SONG = `SELECT * FROM spotifyUserTopTracks
                                    WHERE song LIKE '%${song}%'
                                    ORDER BY added_at DESC`;

    await spotifyUserTopTracks_db.query(QUERY_ARTIST_BY_SONG, async (err, results) => {
        if (err) throw err;
        res.write("#index | artist | album | song | added_at\n")
        results.forEach(async result => {
            const { artist, album, song, added_at } = result;
            res.write(`#${index}: ${artist} | ${album} | ${song} | ${added_at}\n`);
        });
        await res.end();
    })

}

