import styles from "./SearchBar.module.sass";
import SearchIcon from "../../images/search.svg";

const SearchBar = ({ query, setQuery, releaseFilter, setReleaseFilter, setTypeFilter }) => {
  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select className={styles.searchFilter} onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="" selected="selected">
          All categories
        </option>
        <option value="movie">Movies</option>
        <option value="series">TV Series</option>
        <option value="game">Video games</option>
      </select>
      <div className={styles.searchIcon}>
        <img src={SearchIcon} alt="search" />
      </div>
    </div>
  );
};

export default SearchBar;
