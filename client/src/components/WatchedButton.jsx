import React from 'react';

var WatchedButton = ({movie, toggleWatched}) => {
    return (
        <span className="watch-button">
            <button type="button" className="green small button" onClick={() => toggleWatched(movie.item_title)}> {movie.watched} </button>
        </span>    
    )
}

export default WatchedButton;