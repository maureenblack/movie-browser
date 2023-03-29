import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/Search';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFaves';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState('man');

	const getMovieRequest = async (searchValue) => {
		try {
			const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=5c2abb11`;


			// for (let i = 0; i < 10; i++) {
			// 	const response = await fetch(url);
			// 	const responseJson = await response.json();
			// }

				const response = await fetch(url);
				const responseJson = await response.json();


			if (responseJson.Search) {
				setMovies(responseJson.Search);
			} else {
				console.log(responseJson);
			}
		} catch (e) {
			console.log("Error", e);
		}

	};
	useEffect(() => {
		getMovieRequest(searchValue);
	}, []);

	useEffect(() => {
		const movieFavorites = JSON.parse(
			localStorage.getItem('react-movie-app-favorites')
		);

		if (movieFavorites) {
			setFavorites(movieFavorites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {

		if (!favorites.map(movie => movie.imdbID).includes(movie.imdbID)) {
			const newFavoriteList = [...favorites, movie];
			setFavorites(newFavoriteList);
			saveToLocalStorage(newFavoriteList);
		}
	};

	const removeFavoriteMovie = (movie) => {
		const newFavoriteList = favorites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					name={'regular'}
					movies={movies}
					handleFavoritesClick={addFavouriteMovie}
					favouriteComponent={<AddFavorites />}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favorites' />
			</div>
			<div className='row'>
				<MovieList
					name={'favorites'}
					movies={favorites}
					handleFavoritesClick={removeFavoriteMovie}
					favouriteComponent={<RemoveFavorites />}
				/>
			</div>
		</div>
	);
};

export default App;
