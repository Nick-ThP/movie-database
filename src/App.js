import styles from './styles/App.module.sass';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from "./images/search.svg";
import MovieCard from './components/MovieCard';
import MoviePage from './components/MoviePage';

const key = process.env.REACT_APP_MOVIE_DATABASE_API_KEY

function App() {

  const [movieList, setMovieList] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [searchTerm, setSearchTerm] = useState('Spider-man')
  const [loading, setLoading] = useState(false)

  const searchMovies = (searchTerm) => {
      axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`)
        .then((response) => {setMovieList(response.data.Search)}) 
  }  

  const handleOpenMoviePage = (id) => {
      setLoading(true)
      axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${id}`)
        .then((response) => {setSelectedMovie(response.data)})
        .then((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? window.scroll(0, 0) : null)
        .then(setTimeout(() => {setLoading(false)}, 500))
  }
  
  const handleCloseMoviePage = () => {
      setSelectedMovie('')
  }  
  
  useEffect(() => {
    handleCloseMoviePage()
    searchMovies(searchTerm)
  }, [searchTerm])

  return (

    <>

      <div className={styles.container}>
        <h1 className={styles.title}>Movie Database</h1>
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
        typeof selectedMovie.Title != "undefined" 
      ? 
        <div className={styles.pageWrapper}>
          <MoviePage selectedMovie={selectedMovie} handleCloseMoviePage={handleCloseMoviePage} />
        </div>
      : 
        movieList?.length > 0
      ? 
        <div className={styles.cardWrapper}>
          {movieList.filter((movie, index) => index < 10).map((movie, index) => (
            <MovieCard movie={movie} key={index} setLoading={setLoading} handleOpenMoviePage={handleOpenMoviePage} />
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
