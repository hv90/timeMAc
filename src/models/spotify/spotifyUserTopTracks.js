import path from 'path';
import fs from 'fs';


const dirClient = path.resolve("./data/client.json");
const {Access_token} = JSON.parse(fs.readFileSync(dirClient));

export function getUserTopTracksParams(offset){
    return {        
        method: "get",
        headers: {'Authorization': 'Bearer ' + Access_token},
        json: true,
        params: {limit: 50, offset: offset},
        url: 'https://api.spotify.com/v1/me/tracks'
    }
}

import mysql from 'mysql';
let count = 0;


async function createSchema (spotifyUserTracks_db) {
    const CREATE_SCHEMA = 'CREATE SCHEMA IF NOT EXISTS spotifyApp_db;';
    const USE_SCHEMA = 'USE spotifyApp_db';

    await spotifyUserTracks_db.query(CREATE_SCHEMA, (err, result) => {
        if (err) throw err;
        console.log('schema created');
    });

    await spotifyUserTracks_db.query(USE_SCHEMA, (err, result) => {
        if (err) throw err;
        console.log('schema is used');
    });

    return spotifyUserTracks_db;
}

async function createTable (spotifyUserTracks_db) {
    const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS spotifyUserTopTracks(
        id int primary key auto_increment,
        added_at varchar(50),
        spotify_uri varchar(500),
        artist varchar(1000) character set utf8,
        album varchar(500) character set utf8,
        song varchar(500) character set utf8
    )`;

    spotifyUserTracks_db.query(CREATE_TABLE, (err, result) => {
        if (err) throw err;
        console.log('table created');
    });

    return spotifyUserTracks_db;
}

export async function insertIntoTable (currPage, spotifyUserTracks_db, added_at, spotify_uri, artist, album, song) {

    const INSERT_INTO_TABLE = `INSERT INTO spotifyUserTopTracks (added_at, spotify_uri, artist, album, song)
                                VALUES (${JSON.stringify(added_at)}, ${JSON.stringify(spotify_uri)},
                                        ${JSON.stringify(artist)}, ${JSON.stringify(album)}, 
                                        ${JSON.stringify(song)}
                                        )`;

    //console.log(INSERT_INTO_TABLE);

    await spotifyUserTracks_db.query(INSERT_INTO_TABLE, (err, result)=>{
        if(err) throw err;
        console.log('added successfully in the table ', currPage, count++)
    })

    return spotifyUserTracks_db;
}

export async function closeConnection (spotifyUserTracks_db) {
    console.log('end');
    await spotifyUserTracks_db.end();
}

export async function createConnection() {

    //database configs
    const config_db = {
        host: "localhost",
        user: "root",
        password: "password"
    }

    //creating connection
    var spotifyUserTracks_db = await mysql.createConnection(config_db);

    //connecting to database
    await spotifyUserTracks_db.connect(async err => {
        if (err) throw err;
        console.log('connected to mysql');

        await createSchema(spotifyUserTracks_db)
        await createTable(spotifyUserTracks_db)   
    })


     return spotifyUserTracks_db;
}
