import styles from './styles/App.module.sass';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import SearchIcon from "./search.svg";

const key = process.env.REACT_APP_MOVIE_DATABASE_API_KEY

function App() {

  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState("");

  const searchMovies = (term) => {
    axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${term}`)
      .then((response) => {
          setMovies(response.data.Search)
      });
  };

  console.log(movies)

  useEffect(() => {
    searchMovies(term)
  }, [term])

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Movie Database</h1>
        <div className={styles.search}>
          <input 
            className={styles.searchBar}
            type="text"
            placeholder="search for movies here"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
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
        
      <div className={styles.wrapper}>
        {movies?.length > 0 
          ? (
            <div className={styles.wrapper}>
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <h2>No movies were found. Please adjust your search term.</h2>
            </div>
          )
        }
      </div>
    </>

  );
}

export default App;
