import React from 'react';

var WatchedButton = ({movie, toggleWatched}) => {
    const watchedStatus = movie.watched ? 'Watched' : 'To Watch';
    return (
        <span className="watch-button">
            <button type="button" className="green small button" onClick={() => toggleWatched(movie)}> {watchedStatus} </button>
        </span>    
    )
}

export default WatchedButton;