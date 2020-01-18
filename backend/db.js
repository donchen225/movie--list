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
const getMovie = (callback) => {
    connection.query('SELECT * FROM movies;', function (err, results) {
        if (err) {
            console.log(err);
            callback(err)
        } else {
            console.log(results);
            callback(null, results);
        }
    })
}

// const addMovie = (movie, callback) => {
//     const query = `INSERT INTO movies (title, watched) VALUES (?, ?);`;
//     connection.query(query, [movie.title, movie.watched], (err) => {
//         if (err) {
//             console.log("error in insertion", err);
//             callback(err);
//         } else {
//             console.log("movie successfully inserted to database")
//             callback();
//         }
//     })
// }    
// connection.end();

module.exports = getMovie;
// module.exports = { addMovie };


// How to fully connect client -> server -> database?
// How to test each connection? client to server? server to database? client to server to database?
// How to test backend portion through postman?
// How to specify external APi database path?   
// Body Parser module?
// Morgan module?