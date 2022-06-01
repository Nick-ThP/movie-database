//Hooks
import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

//Libraries
import axios from 'axios';

// Styles
import styles from './styles/App.module.sass';

// Components
import SearchBar from './components/SearchBar';
import ToggleButton from './components/ToggleButton';
import MovieCard from './components/MovieCard';
import MoviePage from './components/MoviePage';


// API key
const key = process.env.REACT_APP_MOVIE_DATABASE_API_KEY

function App() {

  // States
  const [movieList, setMovieList] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [searchTerm, setSearchTerm] = useState('Spider-man')
  const [loading, setLoading] = useState(false)
  const [favoriteToggle, setFavoriteToggle] = useState(false)
  const [favoriteMovies, setFavoriteMovies] = useState([])

  // Search callback
  const searchMovies = useCallback(() => {
      axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`)
        .then((response) => {setMovieList(response.data.Search)})
  }, [searchTerm])  
  
  // Effects
  useEffect(() => {
      handleCloseMoviePage()
      searchMovies()
  }, [searchMovies])

  // Handlers
  const handleOpenMoviePage = (imdbID) => {
      setFavoriteToggle(false)
      setLoading(true)
      axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${imdbID}`)
        .then((response) => {setSelectedMovie(response.data)})
        .then((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? window.scroll(0, 0) : null)
        .then(setTimeout(() => {setLoading(false)}, 700))
  }
  
  const handleCloseMoviePage = () => {
      setFavoriteToggle(false)
      setSelectedMovie('')
      window.scroll(0, 0)
  }  

  const handleSetNewFavoriteMovie = (selected) => {
      favoriteMovies.some(movie => movie.imdbID === selectedMovie.imdbID) === false && setFavoriteMovies((prev) => [...prev, selected])
  }

  const handleRemoveFromFavorites = (selected) => {
      setFavoriteMovies(favoriteMovies.filter(movie => movie.imdbID !== selected.imdbID))
  }
  
  // Render
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title} onClick={() => handleCloseMoviePage()}>Movie Database</h1>
        <div className={styles.searchAndToggle}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ToggleButton favoriteToggle={favoriteToggle} setFavoriteToggle={setFavoriteToggle} />
        </div>
      </div>

      <div>
        <div className={styles.skewed}></div>
      </div>
     
      {/* Nested ternary operators... Yes, i know. I might implement React Router later on...
      This entire project has been a big learning project, so it's not the cleanest */}

      {
        loading === true
      ?
        <div className={styles.noResults}>
          <h2>...loading</h2>
        </div>
      :
        favoriteToggle === true
      ?
        favoriteMovies?.length > 0 
        ? 
          <div className={styles.wrapper}>
            {favoriteMovies.map((movie) => (
              <MovieCard 
                movie={movie} 
                key={movie.imdbID} 
                handleOpenMoviePage={handleOpenMoviePage} 
              />
            ))}
          </div>
        :
          <div className={styles.noResults}>
            <h2>Sorry, you don't seem to have any favorite movies.</h2>
          </div>
      :
        typeof selectedMovie.Title != "undefined" 
      ? 
        <div className={styles.wrapper}>
          <MoviePage 
            selectedMovie={selectedMovie} 
            favoriteMovies={favoriteMovies}
            handleCloseMoviePage={handleCloseMoviePage} 
            handleSetNewFavoriteMovie={handleSetNewFavoriteMovie}
            handleRemoveFromFavorites={handleRemoveFromFavorites} 
          />
        </div>
      : 
        movieList?.length > 0
      ? 
        <div className={styles.wrapper}>
          {movieList.map((movie) => (
            <MovieCard 
              movie={movie} 
              key={movie.imdbID} 
              handleOpenMoviePage={handleOpenMoviePage} 
            />
          ))}
        </div>
      :
        <div className={styles.noResults}>
          <h2>No movies were found. Please adjust your search term.</h2>
        </div>
      }
    </>
  )
}

export default App;
