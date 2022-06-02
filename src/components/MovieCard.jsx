import styles from '../styles/MovieCard.module.sass';

const MovieCard = ({ handleOpenMoviePage, movie: { imdbID, Year, Poster, Title, Type, imdbRating } }) => {
  return (
    <div className={styles.container} key={imdbID} onClick={() => handleOpenMoviePage(imdbID)} >
      <div className={styles.poster}>
        <img src={Poster !== "N/A" ? Poster : 'http://placehold.jp/300x300.png'} alt={Title} />
      </div>
      <div className={styles.info}>
        <h2>{Title}</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>{Year}</h3>
          <h3>{imdbRating}</h3>
          <h3>{Type.toUpperCase()}</h3>
        </div>
        
      </div>
    </div>
  )
}

export default MovieCard