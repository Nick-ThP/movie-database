import { useState } from 'react'
import styles from '../styles/MoviePage.module.sass';

const MoviePage = ({ selectedMovie, favoriteMovies, handleSetNewFavoriteMovie, handleRemoveFromFavorites, handleCloseMoviePage }) => {

  const [fullPlot, setFullPlot] = useState(false)

  return (
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>{selectedMovie.Title}</h2>
          <h3>{selectedMovie.Released}</h3>
          <p>Directed by <em>{`${selectedMovie.Director}`}</em><br />Written by <em>{`${selectedMovie.Writer}`}</em><br />Starring <em>{`${selectedMovie.Actors}`}</em></p>
          <h4>{`This ${selectedMovie.Type} is rated ${selectedMovie.imdbRating} on IMDb with ${selectedMovie.imdbVotes} votes`}</h4>
          <div className={styles.plot}>
            <p className={fullPlot === true ? styles.extraClamp : undefined}>{selectedMovie.Plot}</p>
            {
              fullPlot === false 
            ?
              <h5 onClick={() => setFullPlot(!fullPlot)}>See more</h5>
            :
              <h5 onClick={() => setFullPlot(!fullPlot)}>See less</h5>
            }
          </div>
          <div className={styles.buttons}>
            {
              favoriteMovies.some(movie => movie.imdbID === selectedMovie.imdbID) 
            ?
              <button className={styles.button} onClick={() => handleRemoveFromFavorites(selectedMovie)}>
                Remove from favorites
              </button> 
            :
              <button className={styles.button} onClick={() => handleSetNewFavoriteMovie(selectedMovie)}>
                Set as favorite
              </button>
            }
            <button className={styles.button} onClick={handleCloseMoviePage}>Go back to selection</button>
          </div>
        </div>
        <div className={styles.poster}>
          <img src={selectedMovie.Poster} alt={`Poster for ${selectedMovie.Title}`} />
        </div>
      </div>
  )
}

export default MoviePage