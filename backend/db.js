var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'password',
    database : 'movie_db'
});
 
// Connect database to server
// 4.1. Establish connection from server to database
connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to mysql")
    }
});
 
// 4.2. Make server read from database and console.log the results
// 4.3. Refactor and make a function to read from the database and console.log results
const getMovies = (callback) => {
    const query = 'SELECT * FROM movies;';
    connection.query(query, (err, results) => {
        if (err) {
            console.log(`Error in getting data from DB`, err);
            callback(err)
        } else {
            console.log(`${results} successfully retrieved from DB`);
            callback(null, results);
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

const updateWatched = (title, callback) => {
    connection.query(`SELECT watched FROM movies WHERE item_title = ${title};`, (err, results) => {
        if (err) {
            console.log(`Error in selecting watched property of ${title}`);
            callback(err);
        } else {
            if (results === 'To Watch') {
                connection.query(`UPDATE movies SET watched = 'Watched';`, (err) => {
                    if (err) {
                        console.log(`Error in updating 'To Watch' to 'Watched'`);
                        callback(err);
                    } else {
                        console.log(`${title}'s watched property successfuly updated to 'Watched' in DB`);
                        callback(null);
                    }
                })
            } else if(results === 'Watched') {
                connection.query(`UPDATE movies SET watched = 'To Watch';`, (err, results) => {
                    if (err) {
                        console.log(`Error in updating 'Watched' to 'To Watch'`);
                        callback(err);
                    } else {
                        console.log(`${title}'s watched property successfully updated to 'To Watch`);
                        callback(null);
                    }
                });
            }
        }
    })
}


// connection.end();

// const getOneMovie = (movie, callback) => {
//     const query = `SELECT * FROM users WHERE item_title = ?;`;
//     connection.query(query, [movie], (err) => {
//         if (err) {
//             callback(err);
//         } else {
//             callback();
//         }
//     })
// }

module.exports.getMovies = getMovies;
module.exports.addMovie = addMovie;
module.exports.updateWatched = updateWatched;
// module.exports.getOneMovie  = getOneMovie;
