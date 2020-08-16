import mysql from 'mysql';
let count = 0;


async function createSchema (lastfmUserTracks_db) {
    const CREATE_SCHEMA = 'CREATE SCHEMA IF NOT EXISTS lastfmApp_db;';
    const USE_SCHEMA = 'USE lastfmApp_db';

    await lastfmUserTracks_db.query(CREATE_SCHEMA, (err, result) => {
        if (err) throw err;
        console.log('schema created');
    });

    await lastfmUserTracks_db.query(USE_SCHEMA, (err, result) => {
        if (err) throw err;
        console.log('schema is used');
    });

    return lastfmUserTracks_db;
}

async function createTable (lastfmUserTracks_db) {
    const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS lastfmUserTracks(
        id int primary key auto_increment,
        artist varchar(500) character set utf8,
        playcount int,
        track varchar(500) character set utf8,
        date varchar(100) character set utf8
    )`;

    lastfmUserTracks_db.query(CREATE_TABLE, (err, result) => {
        if (err) throw err;
        console.log('table created');
    });

    return lastfmUserTracks_db;
}

export async function insertIntoTable (lastfmUserTracks_db, artist, playcount, track, date) {

    const INSERT_INTO_TABLE = `INSERT INTO lastfmUserTracks ( artist, playcount, track, date)
                                VALUES (${JSON.stringify(artist)}, ${playcount}, 
                                        ${JSON.stringify(track)}, ${JSON.stringify(date)})`;

    //console.log(INSERT_INTO_TABLE);

    await lastfmUserTracks_db.query(INSERT_INTO_TABLE, (err, result)=>{
        if(err) throw err;
        console.log('added successfully in the table ', count++)
    })

    return lastfmUserTracks_db;
}

export async function closeConnection (lastfmUserTracks_db) {
    console.log('end');
    await lastfmUserTracks_db.end();
}

export async function createConnection() {

    //database configs
    const config_db = {
        host: "localhost",
        user: "root",
        password: "password"
    }

    //creating connection
    var lastfmUserTracks_db = await mysql.createConnection(config_db);

    //connecting to database
    await lastfmUserTracks_db.connect(async err => {
        if (err) throw err;
        console.log('connected to mysql');

        await createSchema(lastfmUserTracks_db)
        await createTable(lastfmUserTracks_db)   
    })


     return lastfmUserTracks_db;
}
