import React from 'react';

const SearchBar = ({searchInput, handleTextInputBox, searchMovies}) => (
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
            onClick={()=> {searchMovies(searchInput)}}> Go! 
        </button>
    </div>
);

export default SearchBar;