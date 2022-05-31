import styles from '../styles/MovieCard.module.sass';

const FavoriteMovieCard = ({ handleOpenMoviePage, favoriteMovie: { imdbID, Year, Poster, Title } }) => {
  return (
    <div className={styles.container} key={imdbID} onClick={() => handleOpenMoviePage(imdbID)}>
      <div className={styles.poster}>
        <img src={Poster !== "N/A" ? Poster : 'http://placehold.jp/300x300.png'} alt={Title} />
      </div>
      <div className={styles.info}>
        <h2>{Title}</h2>
        <h3>{Year}</h3>
      </div>
    </div>
  )
}

export default FavoriteMovieCard