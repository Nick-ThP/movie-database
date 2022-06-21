import { useState } from 'react'
import styles from './MoviePage.module.sass';

const MoviePage = ({ selectedMovie, favoriteMovies, handleSetNewFavoriteMovie, handleRemoveFromFavorites, handleCloseMoviePage }) => {

  const [fullPlot, setFullPlot] = useState(false)

  return (
      <div className={styles.container}>
        <div className={styles.info}>
          <div>
            <h2>{selectedMovie.Title}</h2>
            <h3>{selectedMovie.Genre}</h3>
            <p>
               Released: <em>{selectedMovie.Released}</em><br />
               Country: <em>{selectedMovie.Country}</em><br />
               Runtime: <em>{selectedMovie.Runtime}</em><br />
               Directed by: <em>{selectedMovie.Director}</em><br />
               Written by: <em>{selectedMovie.Writer}</em><br />
               Starring: <em>{selectedMovie.Actors}</em>
            </p>
            <h4>{`This ${selectedMovie.Type} is rated ${selectedMovie.imdbRating} on IMDb with ${selectedMovie.imdbVotes} votes`}</h4>
            <div className={styles.plot}>
              <p className={fullPlot === true ? styles.extraClamp : undefined}><span style={{fontWeight: 'bold', display: 'block', marginBottom: '0.5rem'}}>Outline</span>{selectedMovie.Plot}</p>
              {
                fullPlot === false 
              ?
                <h5 style={{marginTop: '0.5rem'}} onClick={() => setFullPlot(!fullPlot)}>See more</h5>
              :
                <h5 style={{marginTop: '0.5rem'}} onClick={() => setFullPlot(!fullPlot)}>See less</h5>
              }
            </div>
          </div>
          <div>
            <hr style={{color: 'white', marginTop: '1.5rem', marginBottom: '1rem'}} />
            <div className={styles.buttons}>
              <button className={styles.button} onClick={handleCloseMoviePage}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M459.5 71.41l-171.5 142.9v83.45l171.5 142.9C480.1 457.7 512 443.3 512 415.1V96.03C512 68.66 480.1 54.28 459.5 71.41zM203.5 71.41L11.44 231.4c-15.25 12.87-15.25 36.37 0 49.24l192 159.1c20.63 17.12 52.51 2.749 52.51-24.62v-319.9C255.1 68.66 224.1 54.28 203.5 71.41z"/>
                </svg>
                <span style={{alignSelf: 'center'}}>Go back to selection</span>
              </button>
              {
                favoriteMovies.some(movie => movie.imdbID === selectedMovie.imdbID) 
              ?
                <button className={styles.buttonActive} onClick={() => handleRemoveFromFavorites(selectedMovie)}>
                  <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                  </svg>
                  <span style={{alignSelf: 'center'}}>Favorited</span>
                </button> 
              :
                <button className={styles.buttonInactive} onClick={() => handleSetNewFavoriteMovie(selectedMovie)}>
                  <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z" />
                  </svg>
                  <span style={{alignSelf: 'center'}}>Set as favorite</span>
                </button>
              }
            </div>
          </div>
        </div>
        <div className={styles.poster}>
          <img src={selectedMovie.Poster} alt={`Poster for ${selectedMovie.Title}`} />
        </div>
      </div>
  )
}

export default MoviePage