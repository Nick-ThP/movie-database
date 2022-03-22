import styles from './styles/App.module.sass';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from "./images/search.svg";
import MovieCard from './components/MovieCard';
import MoviePage from './components/MoviePage';
import Spinner from './components/Spinner';

const key = process.env.REACT_APP_MOVIE_DATABASE_API_KEY

function App() {

  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = (searchTerm) => {
      axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`)
        .then((response) => {
            setMovieList(response.data.Search)
        }) 
  }  

  useEffect(() => {
    searchMovies(searchTerm)
  }, [searchTerm])

  let isLoading

  const handleOpenMoviePage = (id) => {
      isLoading = true
      axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${id}`)
        .then((response) => {
            setSelectedMovie(response.data)
        })
      isLoading = false
  }
  
  const handleCloseMoviePage = () => {
      setSelectedMovie('')
  }

  console.log(movieList)
  console.log(selectedMovie)

  if (isLoading === true) {
    return <Spinner />
  }

  return (

    <>

      <div className={styles.container}>
        <h1 className={styles.title}>Movie Database</h1>
        <div className={styles.search}>
          <input 
            className={styles.searchBar}
            type="text"
            placeholder="search for movies here"
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
        typeof selectedMovie.Title != "undefined" 
      ? 
        <div className={styles.pageWrapper}>
          <MoviePage selectedMovie={selectedMovie} handleCloseMoviePage={handleCloseMoviePage} />
        </div>
      : 
        movieList?.length > 0
      ? 
        <div className={styles.cardWrapper}>
          {movieList.map((movie) => (
            <MovieCard movie={movie} handleOpenMoviePage={handleOpenMoviePage} />
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
