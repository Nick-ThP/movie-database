import styles from '../styles/MoviePage.module.sass';

const MoviePage = ({ selectedMovie, favoriteMovies, handleSetNewFavoriteMovie, handleRemoveFromFavorites, handleCloseMoviePage }) => {
  return (
      <div className={styles.container}>
        <div className={styles.info}>
          <div>
            <h2>{selectedMovie.Title}</h2>
            <h3>{selectedMovie.Year}</h3>
          </div>
          <div>
            <h4>{`${selectedMovie.Type.toUpperCase()} RATED ${selectedMovie.imdbRating}`}</h4>
            <p>{selectedMovie.Plot}</p>
          </div>
          {
            favoriteMovies.some(movie => movie.imdbID === selectedMovie.imdbID) 
          ?
            <button className={styles.backButton} onClick={() => handleRemoveFromFavorites(selectedMovie)}>
              Remove from favorites
            </button> 
          :
            <button className={styles.backButton} onClick={() => handleSetNewFavoriteMovie(selectedMovie)}>
              Set as favorite
            </button>
          }
          <button className={styles.backButton} onClick={handleCloseMoviePage}>Go back to selection</button>
        </div>
        <div className={styles.poster}>
          <img src={selectedMovie.Poster} alt={`Poster for ${selectedMovie.Title}`} />
        </div>
      </div>
  )
}

export default MoviePage