//Hooks
import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

//Libraries
import axios from 'axios';

// Styles
import styles from './styles/App.module.sass';

// Components
import SearchBar from './components/SearchBar/SearchBar';
import ToggleButton from './components//ToggleButton/ToggleButton';
import MovieCard from './components/MovieCard/MovieCard';
import MoviePage from './components/MoviePage/MoviePage';
import Pagination from './components/Pagination/Pagination';

// API key
const key = process.env.REACT_APP_MOVIE_DATABASE_API_KEY

const App = () => {

  // States

  // Movie states
  const [movieList, setMovieList] = useState([])
  const [totalList, setTotalList] = useState([])
  const [favoriteMovies, setFavoriteMovies] = useLocalStorage('movies', [{"Title":"Fight Club","Year":"1999","Rated":"R","Released":"15 Oct 1999","Runtime":"139 min","Genre":"Drama","Director":"David Fincher","Writer":"Chuck Palahniuk, Jim Uhls","Actors":"Brad Pitt, Edward Norton, Meat Loaf","Plot":"An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.","Language":"English","Country":"United States, Germany","Awards":"Nominated for 1 Oscar. 11 wins & 38 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.8/10"},{"Source":"Rotten Tomatoes","Value":"79%"},{"Source":"Metacritic","Value":"66/100"}],"Metascore":"66","imdbRating":"8.8","imdbVotes":"2,036,608","imdbID":"tt0137523","Type":"movie","DVD":"14 Oct 2003","BoxOffice":"$37,030,102","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Blade Runner","Year":"1982","Rated":"R","Released":"25 Jun 1982","Runtime":"117 min","Genre":"Action, Drama, Sci-Fi","Director":"Ridley Scott","Writer":"Hampton Fancher, David Webb Peoples, Philip K. Dick","Actors":"Harrison Ford, Rutger Hauer, Sean Young","Plot":"A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.","Language":"Low German, English, German, Cantonese, Japanese, Hungarian, Arabic, Korean","Country":"United States","Awards":"Nominated for 2 Oscars. 12 wins & 19 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.1/10"},{"Source":"Rotten Tomatoes","Value":"89%"},{"Source":"Metacritic","Value":"84/100"}],"Metascore":"84","imdbRating":"8.1","imdbVotes":"750,069","imdbID":"tt0083658","Type":"movie","DVD":"30 Oct 2001","BoxOffice":"$32,914,489","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"The Dark Knight","Year":"2008","Rated":"PG-13","Released":"18 Jul 2008","Runtime":"152 min","Genre":"Action, Crime, Drama","Director":"Christopher Nolan","Writer":"Jonathan Nolan, Christopher Nolan, David S. Goyer","Actors":"Christian Bale, Heath Ledger, Aaron Eckhart","Plot":"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.","Language":"English, Mandarin","Country":"United States, United Kingdom","Awards":"Won 2 Oscars. 159 wins & 163 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"9.0/10"},{"Source":"Rotten Tomatoes","Value":"94%"},{"Source":"Metacritic","Value":"84/100"}],"Metascore":"84","imdbRating":"9.0","imdbVotes":"2,562,136","imdbID":"tt0468569","Type":"movie","DVD":"09 Dec 2008","BoxOffice":"$534,987,076","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Goodfellas","Year":"1990","Rated":"R","Released":"21 Sep 1990","Runtime":"145 min","Genre":"Biography, Crime, Drama","Director":"Martin Scorsese","Writer":"Nicholas Pileggi, Martin Scorsese","Actors":"Robert De Niro, Ray Liotta, Joe Pesci","Plot":"The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.","Language":"English, Italian","Country":"United States","Awards":"Won 1 Oscar. 44 wins & 38 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.7/10"},{"Source":"Rotten Tomatoes","Value":"96%"},{"Source":"Metacritic","Value":"90/100"}],"Metascore":"90","imdbRating":"8.7","imdbVotes":"1,117,933","imdbID":"tt0099685","Type":"movie","DVD":"22 Aug 1997","BoxOffice":"$46,909,721","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Interstellar","Year":"2014","Rated":"PG-13","Released":"07 Nov 2014","Runtime":"169 min","Genre":"Adventure, Drama, Sci-Fi","Director":"Christopher Nolan","Writer":"Jonathan Nolan, Christopher Nolan","Actors":"Matthew McConaughey, Anne Hathaway, Jessica Chastain","Plot":"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.","Language":"English","Country":"United States, United Kingdom, Canada","Awards":"Won 1 Oscar. 44 wins & 148 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.6/10"},{"Source":"Rotten Tomatoes","Value":"72%"},{"Source":"Metacritic","Value":"74/100"}],"Metascore":"74","imdbRating":"8.6","imdbVotes":"1,733,825","imdbID":"tt0816692","Type":"movie","DVD":"31 Mar 2015","BoxOffice":"$188,020,017","Production":"N/A","Website":"N/A","Response":"True"}])
  const [selectedMovie, setSelectedMovie] = useState('')

  // Searching states
  const [query, setQuery] = useState('Spider-man')
  const [searchTerm, setSearchTerm] = useState('Spider-man')
  const [releaseFilter, setReleaseFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [page, setPage] = useState(1)

  // Toggle & Loading states
  const [loading, setLoading] = useState(false)
  const [favoriteToggle, setFavoriteToggle] = useState(false)

  // Callback functions

  // Search callback (activates the second useEffect)
  const searchMovies = useCallback(() => {
      axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}&y=${releaseFilter}&type=${typeFilter}&page=${page}`)
        .then((response) => {setMovieList(response.data.Search)})
  }, [searchTerm, releaseFilter, typeFilter, page]) 

  // Callback to set total amount of results getting fetched (used for pagination)
  const setTotal = useCallback(async() => {
      setTotalList([])
      await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}&y=${releaseFilter}&type=${typeFilter}&page=1`)
        .then((response) => {
          if (response.data.Search.length !== 0) {
            setTotalList([...response.data.Search]) 
          }
        })
      await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}&y=${releaseFilter}&type=${typeFilter}&page=2`)
        .then((response) => {
          if (response.data.Search.length !== 0) {
            setTotalList(prev => [...response.data.Search, ...prev]) 
          }
        })
      await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}&y=${releaseFilter}&type=${typeFilter}&page=3`)
        .then((response) => {
          if (response.data.Search.length !== 0) {
            setTotalList(prev => [...response.data.Search, ...prev]) 
          }
        })
      await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}&y=${releaseFilter}&type=${typeFilter}&page=4`)
        .then((response) => {
          if (response.data.Search.length !== 0) {
            setTotalList(prev => [...response.data.Search, ...prev]) 
          }
        })
      await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}&y=${releaseFilter}&type=${typeFilter}&page=5`)
        .then((response) => {
          if (response.data.Search.length !== 0) {
            setTotalList(prev => [...response.data.Search, ...prev]) 
          }
        })
  }, [searchTerm, releaseFilter, typeFilter])
  
  // Handlers

  // Handler for opening a page for a specific movie (requires a new fetch for more info)
  const handleOpenMoviePage = (imdbID) => {
      window.scroll(0, 0)
      setFavoriteToggle(false)
      setLoading(true)
      axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${imdbID}&plot=full`)
        .then((response) => {setSelectedMovie(response.data)})
        .then(setTimeout(() => {setLoading(false)}, 700))
  }

  const handleCloseMoviePage = () => {
    if (selectedMovie !== '') {
      window.scroll(0, 0)
      setSelectedMovie('')
    }
    setFavoriteToggle(false)
  }  

  const handleSetNewFavoriteMovie = (selected) => {
      favoriteMovies.some(movie => movie.imdbID === selectedMovie.imdbID) === false && setFavoriteMovies((prev) => [...prev, selected])
  }

  const handleRemoveFromFavorites = (selected) => {
      setFavoriteMovies(favoriteMovies.filter(movie => movie.imdbID !== selected.imdbID))
  }

  // Effects

  // Effect for setting the search term with the query to limit the requests (on a slight delay)
  useEffect(() => {
    setPage(1)
    const searchTimeout = setTimeout(() => setSearchTerm(query), 500);
    return () => clearTimeout(searchTimeout);
  }, [query]);


  // Effect for completing the actual search
  useEffect(() => {
      handleCloseMoviePage()
      searchMovies()
      setTotal()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMovies])

  // Render
  return (
    <>
      <div className={styles.container}>
        <h1 
          className={styles.title} 
          onClick={() => {
            handleCloseMoviePage()
            setQuery('Spider-man')
            setPage(1) 
            setReleaseFilter('') 
            setTypeFilter('')
          }}
        >
        Movie Database
        </h1>
        <div className={styles.searchAndToggle}>
          <SearchBar 
            query={query} 
            setQuery={setQuery} 
            releaseFilter={releaseFilter} 
            setReleaseFilter={setReleaseFilter}
            typeFilter={typeFilter} 
            setTypeFilter={setTypeFilter} 
            favoriteToggle={favoriteToggle}
          />
          <ToggleButton favoriteToggle={favoriteToggle} setFavoriteToggle={setFavoriteToggle} />
        </div>
      </div>

      <div>
        <div className={styles.skewed}></div>
      </div>
     
      {/* Implement React Router at some point */}

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
        <>
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
          <Pagination page={page} setPage={setPage} totalList={totalList} />
        </>
      :
        <div className={styles.noResults}>
          <h2>No movies were found. Please adjust your search term.</h2>
        </div>
      }
    </>
  )
}

export default App;
