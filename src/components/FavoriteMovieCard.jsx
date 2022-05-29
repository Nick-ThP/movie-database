import styles from '../styles/MovieCard.module.sass';

const FavoriteMovieCard = ({ handleRemoveFromFavorite, favoriteMovie: { imdbID, Poster, Title } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.poster}>
        <img src={Poster !== "N/A" ? Poster : 'http://placehold.jp/300x300.png'} alt={Title} />
      </div>
      <div className={styles.info}>
        <h2>{Title}</h2>
        <button className={styles.button} onClick={() => handleRemoveFromFavorite(imdbID)}></button>
      </div>
    </div>
  )
}

export default FavoriteMovieCard