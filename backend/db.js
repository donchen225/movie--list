const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'password',
    database : 'movie_db'
});
 
// Connect database to server
connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to mysql")
    }
});
 
const getMovies = (callback) => {
    const query = 'SELECT * FROM movies;';
    connection.query(query, (err, movies) => {
        if (err) {
            console.log(`Error in getting data from DB`, err);
            callback(err)
        } else {
            // console.log(`${movies} successfully retrieved from DB`);
            callback(null, movies);
        }
    })
}

// Need to refactor to send an alert if movie already exists in DB 
const addMovie = (movieData, callback) => {
    const query = 
        `INSERT INTO movies (item_title, watched) 
        VALUES (?, ?);`;
    connection.query(query, [movieData.item_title, movieData.watched], (err) => {
        if (err) {
            console.log(`Error inserting ${movieData} to DB`, err);
            callback(err);
        } else {
            console.log(`${movieData} successfully inserted to DB`);
            callback();
        }
    })
}    

// const getOneMovie = (callback) => {
//     const query = `SELECT * FROM users WHERE item_title = ?;`;
//     connection.query(query, [movie], (err) => {
//         if (err) {
//             callback(err);
//         } else {
//             callback();
//         }
//     })
// }

const updateWatched = (movieData, callback) => {
    const query = `UPDATE movies SET watched = !? WHERE id = ?`;
    connection.query(query, [movieData.watched, movieData.id], (err, movie) => {
        if (err) {
            console.log(`Error in updating watched property of ${movieData.item_title}`);
            callback(err);
        } else {
            console.log(`${movieData.item_title} successfully updated in DB`);
            callback(null, movie);
        }
    })
}

// connection.end();

module.exports.getMovies = getMovies;
module.exports.addMovie = addMovie;
module.exports.updateWatched = updateWatched;
// module.exports.getOneMovie  = getOneMovie;
