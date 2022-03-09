import styles from '../styles/MovieCard.module.sass';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  return (
    <div className={styles.container} key={imdbID}>
      <div className={styles.poster}>
        <img src={Poster !== "N/A" ? Poster : 'http://placehold.jp/300x300.png'} alt={Title} />
      </div>
      <div className={styles.info}>
        <h3>{Title}</h3>
        <p><em>{Type}</em></p>
        <h4>{Year}</h4>
      </div>
    </div>
  )
}

export default MovieCard