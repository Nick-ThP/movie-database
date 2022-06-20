import styles from '../styles/Pagination.module.sass'

const Pagination = ({ page, setPage }) => {
  return (
    <div className={styles.pagination}>
        <p className={page === 1 ? styles.invisible : styles.clickable} onClick={page > 1 ? () => setPage(page - 1) : null}>Previous</p>
        <p className={page === 1 ? styles.unClickable : styles.clickable} onClick={() => setPage(1)} style={{marginLeft: '2rem'}}>1</p>
        <p className={page === 2 ? styles.unClickable : styles.clickable} onClick={() => setPage(2)}>2</p>
        <p className={page === 3 ? styles.unClickable : styles.clickable} onClick={() => setPage(3)}>3</p>
        <p className={page === 4 ? styles.unClickable : styles.clickable} onClick={() => setPage(4)}>4</p>
        <p className={page === 5 ? styles.unClickable : styles.clickable} onClick={() => setPage(5)} style={{marginRight: '2rem'}}>5</p>
        <p className={page === 5 ? styles.invisible : styles.clickable} onClick={page < 5 ? () => setPage(page + 1) : null}>Next</p>
    </div>
  )
}

export default Pagination