import mysql from 'mysql';

export async function createConnection() {
    //database configs
    const config_db = {
        host: "localhost",
        user: "root",
        password: "password"
    }
    const USE_SCHEMA = "USE lastfmApp_db";

    //creating connection
    const lastfm_db = await mysql.createConnection(config_db);

    //connecting to database
    await lastfm_db.connect(async err => {
        if (err) throw err;
        console.log('connected to mysql');
    })

    await lastfm_db.query(USE_SCHEMA, (err, result) => {
        if (err) throw err;
        console.log('schema is used');
    });

    return lastfm_db;
}


export async function searchUserArtistsByGenre(genre,  res) {
    const lastfmUserArtists_db = await createConnection();
    const QUERY_ARTISTS_BY_TAG = `SELECT * FROM lastfmUserArtists
                                    WHERE tags LIKE '%${genre}%'
                                    ORDER BY playcount DESC`;    

    await lastfmUserArtists_db.query(QUERY_ARTISTS_BY_TAG, async (err, results)=>{
        if (err) throw err;
        res.write("artist | playcount | tags \n")
        results.forEach( async result => {
            const {artist, playcount, tags} = result;
           res.write(`${artist} - ${playcount} - ${tags} \n`); 
        });
        await res.end();
    })    
}

export async function searchUserTopTracksByArtist(artist, res) {
    const lastfmUserTopTracks_db = await createConnection();
    const QUERY_SONGS_BY_ARTIST = `SELECT * FROM lastfmUserTopTracks
                                    WHERE artist LIKE '%${artist}%'
                                    ORDER BY playcount DESC`;    

    await lastfmUserTopTracks_db.query(QUERY_SONGS_BY_ARTIST, async (err, results)=>{
        if (err) throw err;
        res.write("artist | playcount | song \n")
        results.forEach( async result => {
            const {artist, playcount, song} = result;
           res.write(`${artist} - ${playcount} - ${song} \n`); 
        });
        await res.end();
    }) 
}

export async function searchUserTopTracksBySong(song, res) {
    const lastfmUserTopTracks_db = await createConnection();
    const QUERY_ARTIST_BY_SONG = `SELECT * FROM lastfmUserTopTracks
                                    WHERE song LIKE '%${song}%'
                                    ORDER BY playcount DESC`;    

    await lastfmUserTopTracks_db.query(QUERY_ARTIST_BY_SONG, async (err, results)=>{
        if (err) throw err;
        res.write("artist | playcount | song \n")
        results.forEach( async result => {
            const {artist, playcount, song} = result;
           res.write(`${artist} - ${playcount} - ${song} \n`); 
        });
        await res.end();
    }) 

}

