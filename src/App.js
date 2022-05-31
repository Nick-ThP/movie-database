import styles from './styles/App.module.sass';
import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import axios from 'axios';
import SearchIcon from "./images/search.svg";
import FavoriteMovieCard from './components/FavoriteMovieCard'
import MovieCard from './components/MovieCard';
import MoviePage from './components/MoviePage';

const key = process.env.REACT_APP_MOVIE_DATABASE_API_KEY

function App() {

  const [movieList, setMovieList] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [searchTerm, setSearchTerm] = useState('Spider-man')
  const [loading, setLoading] = useState(false)
  const [favoriteToggle, setFavoriteToggle] = useState(false)
  const [favoriteMovies, setFavoriteMovies] = useState([])

  const searchMovies = useCallback(() => {
      axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`)
        .then((response) => {setMovieList(response.data.Search)})
  }, [searchTerm])  

  const handleOpenMoviePage = (id) => {
      setFavoriteToggle(false)
      setLoading(true)
      axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${id}`)
        .then((response) => {setSelectedMovie(response.data)})
        .then((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? window.scroll(0, 0) : null)
        .then(setTimeout(() => {setLoading(false)}, 1000))
  }
  
  const handleCloseMoviePage = () => {
      setSelectedMovie('')
      window.scroll(0, 0)
  }  

  const handleSetNewFavoriteMovie = (selected) => {
      setFavoriteMovies((favoriteMovies) => [...favoriteMovies, selected])
  }

  const handleRemoveFromFavorites = (selected) => {
      setFavoriteMovies(favoriteMovies.filter(movie => movie.imdbID !== selected.imdbID))
  }
  
  useEffect(() => {
      handleCloseMoviePage()
      searchMovies()
  }, [searchMovies])

  return (

    <>

      <div className={styles.container}>
        <h1 className={styles.title}>Movie Database</h1>
        <div className={styles.searchAndToggle}>
          <div className={styles.search}>
            <input 
              className={styles.searchBar}
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className={styles.icon}>
              <img 
                src={SearchIcon} 
                alt="search"
              />
            </div>
          </div>
          <button 
            className={favoriteToggle === false ? styles.toggleFavoritesBtn : styles.toggleFavoritesBtnActive}
            onClick={() => setFavoriteToggle(!favoriteToggle)}
            >Toggle Favorites</button>
        </div>
      </div>

      <div>
        <div className={styles.skewed}></div>
      </div>
     
      {
        loading === true
      ?
        <div className={styles.noResults}>
          <h2>...loading</h2>
        </div>
      :
        favoriteToggle === true
      ?
        <div className={styles.cardWrapper}>
          {favoriteMovies.map((favoriteMovie) => (
            <FavoriteMovieCard favoriteMovie={favoriteMovie} key={favoriteMovie.imdbID} />
          ))}
        </div>
      :
        typeof selectedMovie.Title != "undefined" 
      ? 
        <div className={styles.pageWrapper}>
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
        <div className={styles.cardWrapper}>
          {movieList.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} handleOpenMoviePage={handleOpenMoviePage} />
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
