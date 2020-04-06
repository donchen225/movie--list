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
            searchInput: '',
            addMovieInput: '' 
        };
    };

    // componentDiDMount() will get allMovies and set to them to state as soon as page loads 
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
    
    // addMovie will send a post request to add movie to database, 
    // with properties title and watched, initialized to "To Watch"
    addMovie(title) {
        console.log('adding movie...')
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

    // searchMovies takes an input query and searches the initial movieList in state for any
    // matching titles and then updates the movieList to newfound matches   
    searchMovies(query) {
        console.log('searching...')
        var matches = this.state.movieList.filter(movieData => (
            movieData.item_title.toLowerCase().includes(query.toLowerCase())
        ))
        this.setState({
            movieList: matches,
            searchInput: ''
        })
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
                handleTextInputBox={this.handleTextInputBox.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}/>

                <SearchBar 
                searchInput = {this.state.searchInput}
                handleTextInputBox = {this.handleTextInputBox.bind(this)} 
                handleSubmit = {this.handleSubmit.bind(this)} 
                />
                
                <MovieList 
                movieList = {this.state.movieList} 
                toggleWatched = {this.toggleWatched.bind(this)}
                />   
            </div>
        )
    }
};
export default App;



