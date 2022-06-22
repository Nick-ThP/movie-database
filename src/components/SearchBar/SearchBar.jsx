import styles from "./SearchBar.module.sass";
import SearchIcon from "../../images/search.svg";

const SearchBar = ({ query, setQuery, releaseFilter, setReleaseFilter, typeFilter, setTypeFilter, favoriteToggle }) => {
  return (
    <div className={styles.search} style={{ transition: '0.8s ease', opacity: favoriteToggle ? 0.7 : 1 }}>
      <div className={styles.searchIcon}>
        <img src={SearchIcon} alt="search" />
      </div>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className={styles.searchFilter}>
        <input
          type="number"
          min={1000}
          max={9999}
          placeholder="Released"
          value={releaseFilter}
          onChange={(e) => setReleaseFilter(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="" selected="selected">
            All categories
          </option>
          <option value="movie">Movies</option>
          <option value="series">TV Series</option>
          <option value="game">Video games</option>
        </select>
        <p className={styles.x} onClick={() => {setReleaseFilter(''); setTypeFilter('')}}>X</p>
      </div>
      
    </div>
  );
};

export default SearchBar;
