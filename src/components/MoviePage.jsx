import styles from '../styles/MoviePage.module.sass';

const MoviePage = ({handleCloseMoviePage, selectedMovie: { Year, Poster, Title, Type, imdbRating, Plot } }) => {
  return (
      <div className={styles.container}>
        <div className={styles.poster}>
          <img src={Poster} alt={`Poster for ${Title}`} />
        </div>
        <div className={styles.info}>
          <h2>{Title}</h2>
          <h3>{Year}</h3>
          <h4>{`${Type} with a rating of ${imdbRating} out of 10`}</h4>
          <p>{Plot}</p>
          <button className={styles.backButton} onClick={handleCloseMoviePage}>Go back to selection</button>
        </div>
        
      </div>
  )
}

export default MoviePage