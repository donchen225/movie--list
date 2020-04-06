import AddMovie from './AddMovie.jsx';
import SearchBar from './SearchBar.jsx';
import MovieList from './MovieList.jsx';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            searchInput:'',
            addMovieInput: '' 
        };
    };
    componentDidMount() {
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
    };
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
    handleTextInputBox(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    searchMovies(query) {
        var matches = this.state.movieList.filter(movieData => (
            movieData.item_title.toLowerCase().includes(query.toLowerCase())
        ))
        this.setState({
            movieList: matches,
            searchInput: ''
        })
    };
    // toggleWatched method should take in a movie and toggle the movie's watched property (initialized to maybe false)
    // It should be called onClick of the movie's watchedButton.
    toggleWatched(title) {
        axios.put('/movies', title)
            .then((res) => {
                console.log("request is successful")
                this.setState({movieList: res.data});
            })
            .catch((error) => {
                console.log(error);
            }) 
    } 
    render() {
        return (
            <div className = "main-container"> 
                <AddMovie 
                addMovieInput = {this.state.addMovieInput}
                addMovie = {this.addMovie.bind(this)}
                handleTextInputBox={this.handleTextInputBox.bind(this)}/>

                <SearchBar 
                searchInput = {this.state.searchInput}
                searchMovies = {this.searchMovies.bind(this)}
                handleTextInputBox = {this.handleTextInputBox.bind(this)}/>
                
                <MovieList 
                movieList = {this.state.movieList} 
                toggleWatched = {this.toggleWatched.bind(this)}/>   
            </div>
        )
    }
};
export default App;



