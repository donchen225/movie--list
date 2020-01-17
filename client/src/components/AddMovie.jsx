import React from 'react';

const AddMovie = ({addMovieInput, handleTextInputBox, handleSubmit}) => (
    <div id="add-movie-bar">
        <input 
            name="addMovieInput" 
            placeholder="Add movie title here" 
            value={addMovieInput} 
            onChange={handleTextInputBox}
        /> 
        <button 
            name="addMovie" 
            id="add-movie-button" 
            type="button" 
            className="button" 
            onClick={handleSubmit}> Add 
        </button>
    </div>
);

export default AddMovie;