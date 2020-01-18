const express = require('express');
const path = require('path');
// const morgan = require('morgan'); 
// const bodyParser = require('body-parser');

const getMovie = require('./db.js');
// const addMovie = require('./db.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
// app.use(bodyParser.json({ extended: false }))

app.get('/movies', (req, res) => {
    // res.send({title: "Titanic", watched: "To Watch"});
    console.log('*******************************************', getMovie);
    getMovie((err, movies) => {
        if (err) {
            console.log(err);
            res.status(500).end();
        } else {
            console.log("Server is successful in getting movies from database");
            console.log(`${movies} will be sent back to client`)
            res.status(200).send(movies);
        }
    }); 
});

// app.post('/movies', (req, res) => {
//     const movie = req.body;
//     console.log("movie", movie);
//     addMovie(movie, (err) => {
//         if (err) {
//             console.log(err);
//             res.status(500).end();
//         } else {
//             console.log("Server is successful in inserting movies to database");
//             res.status(200).end(); 
//         }
//     })
// });

app.listen(port, () => console.log(`App listening on port ${port}!`));
