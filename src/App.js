import styles from './styles/App.sass';
import { useState, useEffect } from 'react';
import axios from 'axios';

const key = process.env.REACT_APP_MOVIE_DATABASE_API_KEY

function App() {

  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState([]);

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
    <div className={styles.container}>
      <h1>Movie Database</h1>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search for movies"
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <div className={styles.wrapper}>
      </div>
    </div>
  );
}

export default App;
