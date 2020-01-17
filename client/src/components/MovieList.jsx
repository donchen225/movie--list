import React from 'react';
import MovieListEntry from './MovieListEntry.jsx';

const MovieList = ({movieList, toggleWatched}) => {
    return (
        <div>
            {movieList.map((movie, i) => <MovieListEntry key={i} movie={movie} toggleWatched={toggleWatched}/>)}
        </div>
    )
};

export default MovieList; 