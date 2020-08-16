import mysql from 'mysql';
let count = 0;


async function createSchema (lastfmUserArtists_db) {
    const CREATE_SCHEMA = 'CREATE SCHEMA IF NOT EXISTS lastfmApp_db;';
    const USE_SCHEMA = 'USE lastfmApp_db';

    await lastfmUserArtists_db.query(CREATE_SCHEMA, (err, result) => {
        if (err) throw err;
        console.log('schema created');
    });

    await lastfmUserArtists_db.query(USE_SCHEMA, (err, result) => {
        if (err) throw err;
        console.log('schema is used');
    });

    return lastfmUserArtists_db;
}

async function createTable (lastfmUserArtists_db) {
    const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS lastfmUserArtists(
        id int primary key auto_increment,
        artist varchar(500) character set utf8,
        playcount int,
        tags varchar(500) character set utf8
    )`;

    lastfmUserArtists_db.query(CREATE_TABLE, (err, result) => {
        if (err) throw err;
        console.log('table created');
    });

    return lastfmUserArtists_db;
}

export async function insertIntoTable (lastfmUserArtists_db, artist, playcount, tags) {

    const INSERT_INTO_TABLE = `INSERT INTO lastfmUserArtists ( artist, playcount, tags)
                                VALUES (${JSON.stringify(artist)}, ${playcount}, ${JSON.stringify(tags)})`;

    //console.log(INSERT_INTO_TABLE);

    await lastfmUserArtists_db.query(INSERT_INTO_TABLE, (err, result)=>{
        if(err) throw err;
        console.log('added successfully in the table ', count++)
    })

    return lastfmUserArtists_db;
}

export async function closeConnection (lastfmUserArtists_db) {
    console.log('end');
    await lastfmUserArtists_db.end();
}

export async function createConnection() {

    //database configs
    const config_db = {
        host: "localhost",
        user: "root",
        password: "password"
    }

    //creating connection
    var lastfmUserArtists_db = await mysql.createConnection(config_db);

    //connecting to database
    await lastfmUserArtists_db.connect(async err => {
        if (err) throw err;
        console.log('connected to mysql');

        await createSchema(lastfmUserArtists_db)
        await createTable(lastfmUserArtists_db)   
    })


     return lastfmUserArtists_db;
}
