import React from 'react';

var WatchedListButtons = ({showWatchedList, showToWatchList}) => {
    return (
        <div>
            <div id="watched-list-button">
                <button 
                    type="button" 
                    className="green big button"
                    onClick={showWatchedList}>
                </button>
            </div>
            <div id="to-watch-list-buttton">
                <button
                    type="button"
                    className="white big button"
                    onClick={showToWatchList}>
                </button>
            </div>
        </div>
    )
}

export default WatchedListButtons;