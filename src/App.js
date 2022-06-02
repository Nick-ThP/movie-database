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
  const [favoriteMovies, setFavoriteMovies] = useLocalStorage('movies', [{"Title":"2001: A Space Odyssey","Year":"1968","Rated":"G","Released":"24 Jun 1970","Runtime":"149 min","Genre":"Adventure, Sci-Fi","Director":"Stanley Kubrick","Writer":"Stanley Kubrick, Arthur C. Clarke","Actors":"Keir Dullea, Gary Lockwood, William Sylvester","Plot":"The Monoliths push humanity to reach for the stars; after their discovery in Africa generations ago, the mysterious objects lead mankind on an awesome journey to Jupiter, with the help of H.A.L. 9000: the world's greatest supercom...","Language":"English, Russian, French","Country":"United Kingdom, United States","Awards":"Won 1 Oscar. 16 wins & 12 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.3/10"},{"Source":"Rotten Tomatoes","Value":"92%"},{"Source":"Metacritic","Value":"84/100"}],"Metascore":"84","imdbRating":"8.3","imdbVotes":"652,541","imdbID":"tt0062622","Type":"movie","DVD":"23 Oct 2007","BoxOffice":"$60,481,243","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Pulp Fiction","Year":"1994","Rated":"R","Released":"14 Oct 1994","Runtime":"154 min","Genre":"Crime, Drama","Director":"Quentin Tarantino","Writer":"Quentin Tarantino, Roger Avary","Actors":"John Travolta, Uma Thurman, Samuel L. Jackson","Plot":"The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.","Language":"English, Spanish, French","Country":"United States","Awards":"Won 1 Oscar. 70 wins & 75 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.9/10"},{"Source":"Rotten Tomatoes","Value":"92%"},{"Source":"Metacritic","Value":"94/100"}],"Metascore":"94","imdbRating":"8.9","imdbVotes":"1,986,783","imdbID":"tt0110912","Type":"movie","DVD":"20 Aug 2002","BoxOffice":"$107,928,762","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Fight Club","Year":"1999","Rated":"R","Released":"15 Oct 1999","Runtime":"139 min","Genre":"Drama","Director":"David Fincher","Writer":"Chuck Palahniuk, Jim Uhls","Actors":"Brad Pitt, Edward Norton, Meat Loaf","Plot":"An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.","Language":"English","Country":"United States, Germany","Awards":"Nominated for 1 Oscar. 11 wins & 38 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.8/10"},{"Source":"Rotten Tomatoes","Value":"79%"},{"Source":"Metacritic","Value":"66/100"}],"Metascore":"66","imdbRating":"8.8","imdbVotes":"2,036,608","imdbID":"tt0137523","Type":"movie","DVD":"14 Oct 2003","BoxOffice":"$37,030,102","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Goodfellas","Year":"1990","Rated":"R","Released":"21 Sep 1990","Runtime":"145 min","Genre":"Biography, Crime, Drama","Director":"Martin Scorsese","Writer":"Nicholas Pileggi, Martin Scorsese","Actors":"Robert De Niro, Ray Liotta, Joe Pesci","Plot":"The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.","Language":"English, Italian","Country":"United States","Awards":"Won 1 Oscar. 44 wins & 38 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.7/10"},{"Source":"Rotten Tomatoes","Value":"96%"},{"Source":"Metacritic","Value":"90/100"}],"Metascore":"90","imdbRating":"8.7","imdbVotes":"1,117,933","imdbID":"tt0099685","Type":"movie","DVD":"22 Aug 1997","BoxOffice":"$46,909,721","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"American Psycho","Year":"2000","Rated":"R","Released":"14 Apr 2000","Runtime":"102 min","Genre":"Crime, Drama, Horror","Director":"Mary Harron","Writer":"Bret Easton Ellis, Mary Harron, Guinevere Turner","Actors":"Christian Bale, Justin Theroux, Josh Lucas","Plot":"A wealthy New York City investment banking executive, Patrick Bateman, hides his alternate psychopathic ego from his co-workers and friends as he delves deeper into his violent, hedonistic fantasies.","Language":"English, Spanish, Cantonese","Country":"United States, Canada","Awards":"8 wins & 13 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BZTM2ZGJmNjQtN2UyOS00NjcxLWFjMDktMDE2NzMyNTZlZTBiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.6/10"},{"Source":"Rotten Tomatoes","Value":"69%"},{"Source":"Metacritic","Value":"64/100"}],"Metascore":"64","imdbRating":"7.6","imdbVotes":"572,010","imdbID":"tt0144084","Type":"movie","DVD":"21 Jun 2005","BoxOffice":"$15,070,285","Production":"N/A","Website":"N/A","Response":"True"}])

  // Search callback
  const searchMovies = useCallback(() => {
      axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`)
        .then((response) => {setMovieList(response.data.Search)})
  }, [searchTerm])  
  
  console.log(selectedMovie)
  
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
                favoriteMovies={favoriteMovies}
                handleOpenMoviePage={handleOpenMoviePage} 
                handleSetNewFavoriteMovie={handleSetNewFavoriteMovie}
                handleRemoveFromFavorites={handleRemoveFromFavorites}
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
              favoriteMovies={favoriteMovies}
              handleOpenMoviePage={handleOpenMoviePage} 
              handleSetNewFavoriteMovie={handleSetNewFavoriteMovie}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
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
