const express = require('express');
const path = require('path');

const { getMovies } = require('./db.js');
const { addMovie } = require('./db.js');
const { updateWatched } = require('./db.js');
// const { getOneMovie } = require('./db.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
// app.use(bodyParser.json({ extended: false }))

// handle get request for all movies
app.get('/movies', (req, res) => {
    console.log('*************************************')
    getMovies((err, movies) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).send(movies);
        }
    }); 
});

// handle get request for one movie
app.get('/movies/:item_title', (req, res) => {
    console.log('***************************************');
    getOneMovie((err, movie) => {
        if (err)  {
            res.status(500).end();
        } else {
            res.status(200).send(movie);
        }
    })
})

// handle post request
app.post('/movies', (req, res) => {
    console.log('***************************************');
    const movieData = req.body;
    addMovie(movieData, (err) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).end(); 
        }
    });
});

// handle put request 
app.patch('/movies', (req, res) => {
    // console.log('***************************************');
    const movieData = req.body;
    console.log(movieData, 'movieData');
    updateWatched(movieData, (err, result) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).send(result);
        }
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
