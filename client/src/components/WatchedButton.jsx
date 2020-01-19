import React from 'react';

var WatchedButton = ({movie, toggleWatched}) => {
    // var style =  {
    //     backgroundColor: green
    // }
    return (
        <span className="watch-button">
            <button type="button" className="button" onClick={() => toggleWatched(movie.item_title)}> Watched </button>
        </span>    
    )
}

export default WatchedButton;