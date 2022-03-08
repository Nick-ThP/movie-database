import styles from '../styles/MovieCard.module.sass';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  return (
    <div className={styles.container} key={imdbID}>
      <div className={styles.poster}>
        <img src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} alt={Title} />
      </div>
      <div className={styles.info}>
        <p><em>{Type}</em></p>
        <h3>{Title}</h3>
        <h4>{Year}</h4>
      </div>
    </div>
  )
}

export default MovieCard