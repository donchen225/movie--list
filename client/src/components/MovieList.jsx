import React from 'react';
import MovieListEntry from './MovieListEntry.jsx';

const MovieList = ({movieList}) => {
    return (
        <div>
            {movieList.map((movie, i) => 
                <MovieListEntry key={i} movie={movie}/>
            )}
        </div>
    )
};

export default MovieList; 