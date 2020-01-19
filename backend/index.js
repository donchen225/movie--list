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

app.put('/movies', (req, res) => {
    // res.send("Request reach server");
    const title = req.body;
    updateWatched(title, (err) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).send(movies);
        }
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
