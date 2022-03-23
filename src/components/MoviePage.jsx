import styles from '../styles/MoviePage.module.sass';

const MoviePage = ({handleCloseMoviePage, selectedMovie: { Year, Poster, Title, Type, imdbRating, Plot } }) => {
  return (
      <div className={styles.container}>
        <div className={styles.poster}>
          <img src={Poster} alt={`Poster for ${Title}`} />
        </div>
        <div className={styles.info}>
          <div>
            <h2>{Title}</h2>
            <h3><em>{Year}</em></h3>
          </div>
          <div>
            <h4>{`${Type.toUpperCase()} RATED ${imdbRating}/10`}</h4>
            <p>{Plot}</p>
          </div>
          <button className={styles.backButton} onClick={handleCloseMoviePage}>Go back to selection</button>
        </div>
        
      </div>
  )
}

export default MoviePage