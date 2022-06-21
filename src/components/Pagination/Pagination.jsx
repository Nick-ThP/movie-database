import styles from "./Pagination.module.sass";

const Pagination = ({ page, setPage, totalList }) => {
  return (
    <div className={styles.pagination}>
      <p
        className={page === 1 ? styles.invisible : styles.clickable}
        onClick={page > 1 ? () => setPage(page - 1) : null}
        style={{ marginRight: "2rem" }}
      >
        Previous
      </p>
      <p
        className={page === 1 ? styles.selected : styles.clickable}
        onClick={() => setPage(1)}
      >
        1
      </p>
      <p
        className={
          page === 2
            ? styles.selected
            : totalList.length < 10
            ? styles.invisible
            : styles.clickable
        }
        onClick={() => setPage(2)}
      >
        2
      </p>
      <p
        className={
          page === 3
            ? styles.selected
            : totalList.length < 20
            ? styles.invisible
            : styles.clickable
        }
        onClick={() => setPage(3)}
      >
        3
      </p>
      <p
        className={
          page === 4
            ? styles.selected
            : totalList.length < 30
            ? styles.invisible
            : styles.clickable
        }
        onClick={() => setPage(4)}
      >
        4
      </p>
      <p
        className={
          page === 5
            ? styles.selected
            : totalList.length < 40
            ? styles.invisible
            : styles.clickable
        }
        onClick={() => setPage(5)}
      >
        5
      </p>
      <p
        className={
          page === 5 ||
          (page === 1 && totalList.length < 10) ||
          (page === 2 && totalList.length < 20) ||
          (page === 3 && totalList.length < 30) ||
          (page === 4 && totalList.length < 40)
            ? styles.invisible
            : styles.clickable
        }
        onClick={page < 5 ? () => setPage(page + 1) : null}
        style={{
          marginLeft: "2rem",
        }}
      >
        Next
      </p>
    </div>
  );
};

export default Pagination;
