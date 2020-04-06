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
            console.log(`${movies} successfully retrieved from DB`);
            callback(null, movies);
        }
    })
}

// Need to refactor to send an alert if movie already exists in DB 
const addMovie = (movieData, callback) => {
    const query = 
        `INSERT INTO movies (item_title, watched) 
        VALUES (?, ?);`;
        // WHERE NOT EXISTS 
            // (SELECT item_title FROM movies WHERE item_title=${movieData.item_title});`;
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

const updateWatched = (title, callback) => {
    connection.query(`SELECT watched FROM movies WHERE item_title = ${title};`, (err, results) => {
        if (err) {
            console.log(`Error in selecting watched property of ${title}`);
            callback(err);
        } else {
            if (results === 'To Watch') {
                connection.query(`UPDATE movies SET watched = 'Watched' WHERE item_title = ${title}';`, (err) => {
                    if (err) {
                        console.log(`Error in updating 'To Watch' to 'Watched'`);
                        callback(err);
                    } else {
                        console.log(`'To Watch' successfuly updated to 'Watched' in DB`);
                        callback(null);
                    }
                })
            } else if(results === 'Watched') {
                connection.query(`UPDATE movies SET watched = 'To Watch' WHERE item_title = ${title}';`, (err, results) => {
                    if (err) {
                        console.log(`Error in updating 'Watched' to 'To Watch'`);
                        callback(err);
                    } else {
                        console.log(`'Watched' successfully updated to 'To Watch`);
                        callback(null);
                    }
                })
            }
        }
    })
}


// connection.end();

module.exports.getMovies = getMovies;
module.exports.addMovie = addMovie;
module.exports.updateWatched = updateWatched;
// module.exports.getOneMovie  = getOneMovie;
