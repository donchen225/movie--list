import React from 'react';

const AddMovie = ({addMovieInput, handleTextInputBox, addMovie}) => (
    <div id="add-movie-bar">
        <input name="addMovieInput" 
            placeholder="Add movie..." 
            value={addMovieInput} 
            onChange={handleTextInputBox}
        /> 
        <button 
            name="addMovie" 
            id="add-movie-button" 
            type="button" 
            className="button" 
            onClick={() => {addMovie(addMovieInput)}}> Add 
        </button>
    </div>
);

export default AddMovie;