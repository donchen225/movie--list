// Add back end to add persistence for working frontend.
// 1- Create a server
// 1.1 Create most basic running server (check that basic server can respond to a GET request, sent from browser to 'localhost:3000')
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// This points to the dist aka public folder, where bundle.js, index.html, style.css and any other files 
// that the front-end needs access to (typically in a GET request). 
app.use(express.static(path.join(__dirname, '../client/dist')));

// Middleware that parses JSON
app.use(express.json());

//This checks that the server can respond to a basic GET request, sent from browser to 'localhost:3000/movies'
app.get('/movies', (req, res) => {
    console.log("Server received request from client");
    res.send({title: "Titanic", watched: "To Watch"});
});

//This initializes the server to start listening.
app.listen(port, () => console.log(`App listening on port ${port}!`));

