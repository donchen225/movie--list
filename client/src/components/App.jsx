import AddMovie from './AddMovie.jsx';
import SearchBar from './SearchBar.jsx';
import MovieList from './MovieList.jsx';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: this.props.movieList, 
            searchInput: '',
            addMovieInput: '' 
        };
    };
    // 2.1. send get request from client to server
    // componentDiDMount() will call getMovies() as soon as page loads 
    componentDidMount() {
        this.getMovies();
    }

    // getMovies() will send get request to server 
        // server will respond w/ SQL query, "SELECT * FROM movies", which will get all movies from database
        // if error, send status 500 (server error) and end response 
        // if successful, send status 200 and movies data
    getMovies() {
        axios.get('/movies')
            .then((movies) => {
                // console.log(movies.data)
                var movieList = this.state.movieList;
                movieList.push(movies.data);
                this.setState({
                    movieList: movieList
                });
            })
            .catch((error) => { 
                console.log(error);
            })
            // .finally(() => {
            //     console.log("finally done!")
            // });
    }

    // addMovie() will send post request to server
        // server will respond w/ SQL query, "INSERT INTO movies (title, watched)..."
        // which will add the data to the database 
        // if error, send status code 500 and end res
        // if successful, send status code 200 and movies data 
    addMovie(movie) {
        axios.post('/movies', {
            title: movie,
            watched: 'To Watch'
            })
            .then((response) => {
                // console.log("content-type", response.headers.content-type);
                console.log("response from server", response);
                // this.setState({ movieList: response.data});
            })
            .catch((error) => {
                console.log("error", error);
            })
            // .finally(() => {console.log("finally")})
        // event.preventDefault;
        // var alreadyExist = false;
        // this.state.movieList.forEach((item) => {
        //     if (item.title === movie) {
        //         alreadyExist = true;
        //     }
        // })
        // if (!alreadyExist) {
        //     var oldMovieList = this.state.movieList.slice();
        //     var newMovieList = oldMovieList.concat([{
        //         title: movie,
        //         watched: 'To Watch'
        //     }]);
        //     this.setState({
        //         movieList: newMovieList
        //     }); 
        // } else {
        //     alert('Movie already exists')
        // }
    }


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
            if (movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ) {
                matches.push(movie);
            }
        });
        if (matches.length === 0) {
            alert("no movie by that name found")
        } else {
            this.setState({
                movieList: matches
            })
        };
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
    toggleWatched(item) {
        var movieList = this.state.movieList;
        for (var i = 0; i < movieList.length; i++) {
            if (movieList[i].title === item) {
                if (movieList[i].watched === 'To Watch') {
                    console.log("entered");
                    movieList[i].splice(i, 1, {title: movieList[i].title, watched: 'Watched'} );
                } else if (movieList[i].watched === 'Watched') {
                    movieList[i].splice(i, 1, {title: movieList[i].title, watched: 'To Watch'} );
                }
            }
        };
        this.setState({
            movieList: movieList
        });
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
                    toggleWatched = {this.toggleWatched.bind(this)}/>
                </div>    
            </div>
        )
    }
};
export default App;



