import styles from '../styles/MovieCard.module.sass';

const MovieCard = ({ handleOpenMoviePage, movie }) => {
  return (
    <div className={styles.container} key={movie.imdbID} onClick={() => handleOpenMoviePage(movie.imdbID)} >
      <div className={styles.poster}>
        <img src={movie.Poster !== "N/A" ? movie.Poster : 'http://placehold.jp/300x300.png'} alt={movie.Title} />
      </div>
      <div className={styles.info}>
        <h2>{movie.Title}</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>{movie.Type.toUpperCase()}</h3>
          <h3>{movie.Year}</h3>
        </div>
        
      </div>
    </div>
  )
}

export default MovieCard