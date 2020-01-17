import React from 'react';

const SearchBar = ({searchInput, handleTextInputBox, handleSubmit}) => (
    <div id='search-bar'>
        <input 
            name="searchInput" 
            placeholder="Search..." 
            value={searchInput} 
            onChange={handleTextInputBox}/>
        <button 
            name="searchMovies" 
            type="button" 
            className="button" 
            onClick={handleSubmit}> Go! 
        </button>
    </div>
);

export default SearchBar;