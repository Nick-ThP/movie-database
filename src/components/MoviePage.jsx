import styles from '../styles/MoviePage.module.sass';

const MoviePage = ({handleCloseMoviePage, selectedMovie: { Year, Poster, Title, Type, imdbRating, Plot } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <img src={Poster} alt={`Poster for ${Title}`} />
        </div>
        <div className={styles.textWrapper}>
          <h2>{Title}</h2>
          <h3>{Year}</h3>
          <h4>{`${Type} with a rating of ${imdbRating}`}</h4>
          <p>{Plot}</p>
        </div>
      </div>
      <button className={styles.backButton} onClick={handleCloseMoviePage}>Go back to selection</button>
    </div>
  )
}

export default MoviePage