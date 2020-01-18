import React from 'react';
import WatchedButton from "./WatchedButton.jsx";

const MovieListEntry = ({movie}) => {
    return (
        <div className="movie"> 
            <div> {movie.title}
                <WatchedButton movie={movie}/>
            </div>
        </div> 
        
    );
}

export default MovieListEntry;