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
  const [favoriteMovies, setFavoriteMovies] = useLocalStorage('movies', [{"Title":"Fight Club","Year":"1999","Rated":"R","Released":"15 Oct 1999","Runtime":"139 min","Genre":"Drama","Director":"David Fincher","Writer":"Chuck Palahniuk, Jim Uhls","Actors":"Brad Pitt, Edward Norton, Meat Loaf","Plot":"An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.","Language":"English","Country":"United States, Germany","Awards":"Nominated for 1 Oscar. 11 wins & 38 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.8/10"},{"Source":"Rotten Tomatoes","Value":"79%"},{"Source":"Metacritic","Value":"66/100"}],"Metascore":"66","imdbRating":"8.8","imdbVotes":"2,036,608","imdbID":"tt0137523","Type":"movie","DVD":"14 Oct 2003","BoxOffice":"$37,030,102","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"The Dark Knight","Year":"2008","Rated":"PG-13","Released":"18 Jul 2008","Runtime":"152 min","Genre":"Action, Crime, Drama","Director":"Christopher Nolan","Writer":"Jonathan Nolan, Christopher Nolan, David S. Goyer","Actors":"Christian Bale, Heath Ledger, Aaron Eckhart","Plot":"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.","Language":"English, Mandarin","Country":"United States, United Kingdom","Awards":"Won 2 Oscars. 159 wins & 163 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"9.0/10"},{"Source":"Rotten Tomatoes","Value":"94%"},{"Source":"Metacritic","Value":"84/100"}],"Metascore":"84","imdbRating":"9.0","imdbVotes":"2,562,136","imdbID":"tt0468569","Type":"movie","DVD":"09 Dec 2008","BoxOffice":"$534,987,076","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Blade Runner","Year":"1982","Rated":"R","Released":"25 Jun 1982","Runtime":"117 min","Genre":"Action, Drama, Sci-Fi","Director":"Ridley Scott","Writer":"Hampton Fancher, David Webb Peoples, Philip K. Dick","Actors":"Harrison Ford, Rutger Hauer, Sean Young","Plot":"A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.","Language":"Low German, English, German, Cantonese, Japanese, Hungarian, Arabic, Korean","Country":"United States","Awards":"Nominated for 2 Oscars. 12 wins & 19 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.1/10"},{"Source":"Rotten Tomatoes","Value":"89%"},{"Source":"Metacritic","Value":"84/100"}],"Metascore":"84","imdbRating":"8.1","imdbVotes":"750,069","imdbID":"tt0083658","Type":"movie","DVD":"30 Oct 2001","BoxOffice":"$32,914,489","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"The Matrix","Year":"1999","Rated":"R","Released":"31 Mar 1999","Runtime":"136 min","Genre":"Action, Sci-Fi","Director":"Lana Wachowski, Lilly Wachowski","Writer":"Lilly Wachowski, Lana Wachowski","Actors":"Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss","Plot":"When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.","Language":"English","Country":"United States, Australia","Awards":"Won 4 Oscars. 42 wins & 51 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.7/10"},{"Source":"Rotten Tomatoes","Value":"88%"},{"Source":"Metacritic","Value":"73/100"}],"Metascore":"73","imdbRating":"8.7","imdbVotes":"1,859,128","imdbID":"tt0133093","Type":"movie","DVD":"15 May 2007","BoxOffice":"$172,076,928","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Iron Man","Year":"2008","Rated":"PG-13","Released":"02 May 2008","Runtime":"126 min","Genre":"Action, Adventure, Sci-Fi","Director":"Jon Favreau","Writer":"Mark Fergus, Hawk Ostby, Art Marcum","Actors":"Robert Downey Jr., Gwyneth Paltrow, Terrence Howard","Plot":"After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.","Language":"English, Persian, Urdu, Arabic, Kurdish, Hindi, Hungarian","Country":"United States, Canada","Awards":"Nominated for 2 Oscars. 21 wins & 73 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.9/10"},{"Source":"Rotten Tomatoes","Value":"94%"},{"Source":"Metacritic","Value":"79/100"}],"Metascore":"79","imdbRating":"7.9","imdbVotes":"1,028,811","imdbID":"tt0371746","Type":"movie","DVD":"30 Sep 2008","BoxOffice":"$319,034,126","Production":"N/A","Website":"N/A","Response":"True"}])

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
