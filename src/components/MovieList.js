import React from 'react';

const MovieList = ({movies, name, handleFavoritesClick, favouriteComponent}) => {
	return (
		<>
			{movies.map((movie) => (
				<div key={`${name}-${movie.imdbID}`} className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} alt='movie'/>
					<div
						onClick={() => handleFavoritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						{favouriteComponent}
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
