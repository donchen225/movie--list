var mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'password',
    database : 'movie_db'
});
 
// Connect database to server
// Establish connection from server to database
connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected to mysql")
    }
});
 
const addMovie = (movie, callback) => {
    const query = `INSERT INTO movies (title, watched) VALUES (?, ?);`;
    connection.query(query, [movie.title, movie.watched], (err) => {
        if (err) {
            callback(err);
        } else {
            callback();
        }
    })
}    
// connection.end();

module.exports = { addMovie };
