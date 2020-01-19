import AddMovie from './AddMovie.jsx';
import SearchBar from './SearchBar.jsx';
import MovieList from './MovieList.jsx';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // movieList: this.props.movieList, 
            movieList: [],
            searchInput: '',
            addMovieInput: '' 
        };
    };
    // 2.1. send get request from client to server
    // componentDiDMount() will call getMovies() as soon as page loads 
    componentDidMount() {
        this.getMovies();
    };

    // getMovies() will send get request to server 
        // server will respond w/ SQL query, "SELECT * FROM movies", which will get all movies from database
        // if error, send status 500 (server error) and end response 
        // if successful, send status 200 and movies data
    getMovies() {
        axios.get('/movies')
            .then((response) => {
                var moviesData = response.data;
                this.setState({
                    movieList: moviesData
                });
            })
            .catch((error) => { 
                console.log(error);
            })
    }
    
    // addMovie() will send post request to server
        // server will respond w/ SQL query, "INSERT INTO movies (title, watched)..."
        // which will add the data to the database 
        // if error, send status code 500 and end res
        // if successful, send status code 200 and movies data 
    addMovie(title) {
        var movieData = {item_title: title, watched: 'To Watch'};
        axios.post('/movies', movieData)
            .then(() => {
                this.setState({
                    movieList: this.state.movieList.concat({item_title: title, watched: 'To Watch'}),
                    addMovieInput: ''
                });
            })
            .catch((error) => {
                console.log("error", error);
            })
    };
    
    // handleTextInput method will set state of the specific event.target.name (searchInput or addMovieInput)
    handleTextInputBox(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    // searchMovies method will take in a movie and search if there are any matching movie titles in movieList
    // If no matches, send an alert. Else, update the state of movieList to the matches 
    searchMovies(searchTerm) {
        var matches = [];
        this.state.movieList.forEach( (movie) => {
            if (movie.item_title.toLowerCase().includes(searchTerm.toLowerCase()) ) {
                matches.push(movie);
            }
        });
        if (matches.length === 0) {
            alert("No movie by that name found")
        } 
        this.setState({
            movieList: matches,
            searchInput: ''
        });
    };

    // handleSubmit method will call the event.target.name method (searchMovies or addMovie) 
    // on the conditionally rendered input. The input will be searchInput if the method attached to 
    // event.target.name is searchMovies, while the input will be addMovieInput if the method is addMovie.
    handleSubmit(event) {
        event.preventDefault();
        if (event.target.name === 'searchMovies') {
            this.searchMovies(this.state.searchInput);
        } else if (event.target.name === 'addMovie') {
            this.addMovie(this.state.addMovieInput);
        }
    };

    // toggleWatched method should take in a movie and toggle the movie's watched property (initialized to maybe false)
    // It should be called onClick of the movie's watchedButton.
    toggleWatched(title) {
        axios.put('/movies', title)
            .then((res) => {
                // send back as response all the data and set to state
                // or call getMovies() 
                console.log("request is successful")
                // this.getMovies();
            })
            .catch((error) => {
                console.log(error);
            })
        // var movieList = this.state.movieList;
        // for (var i = 0; i < movieList.length; i++) {
        //     if (movieList[i].title === item) {
        //         if (movieList[i].watched === 'To Watch') {
        //             console.log("entered");
        //             movieList[i].splice(i, 1, {title: movieList[i].title, watched: 'Watched'} );
        //         } else if (movieList[i].watched === 'Watched') {
        //             movieList[i].splice(i, 1, {title: movieList[i].title, watched: 'To Watch'} );
        //         }
        //     }
        // };
        // this.setState({
        //     movieList: movieList
        // });
    } 

    render() {
        return (
            <div className = "main-container"> 
                <div>
                    <AddMovie 
                    addMovieInput = {this.state.addMovieInput}
                    handleTextInputBox={this.handleTextInputBox.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}/>
                </div>

                <div>
                    <SearchBar 
                    searchInput = {this.state.searchInput}
                    handleTextInputBox = {this.handleTextInputBox.bind(this)} 
                    handleSubmit = {this.handleSubmit.bind(this)} 
                    />
                </div>
                
                <div>
                    <MovieList 
                    movieList = {this.state.movieList} 
                    toggleWatched = {this.toggleWatched.bind(this)}
                    />
                </div>    
            </div>
        )
    }
};
export default App;



