// Add back end to add persistence for working frontend.
// 1- Create a server
// 1.1 Create most basic running server (check that basic server can respond to a GET request, sent from browser to 'localhost:3000')
const express = require('express');
const path = require('path');
// const morgan = require('morgan'); 
// const bodyParser = require('body-parser');
// const Controller = require('./controller');

const app = express();
const port = 3000;

// This points to the dist aka public folder, where bundle.js, index.html, style.css and any other files 
// that the front-end needs access to (typically in a GET request). 
app.use(express.static(path.join(__dirname, '../client/dist')));

// // Middleware that parses JSON
// app.use(express.json());
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

//This checks that the server can respond to a basic GET request, sent from browser to 'localhost:3000/movies'
const {addMovie} = require('./db.js');

app.get('/movies', (req, res) => {
    res.send({title: "Titanic", watched: "To Watch"});
});

// Connect database to server
app.post('/movies', (req, res) => {
    const movie = req.body;
    console.log("movie", movie);
    addMovie(movie, (err) => {
        if (err) {
            console.log(err);
            res.status(500).end();
        } else {
            res.status(200).end(); 
        }
    })
});

//This initializes the server to start listening.
app.listen(port, () => console.log(`App listening on port ${port}!`));
