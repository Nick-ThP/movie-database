import styles from '../styles/SearchBar.module.sass'
import SearchIcon from "../images/search.svg";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.searchIcon}>
        <img src={SearchIcon} alt="search" />
      </div>
    </div>
  );
};

export default SearchBar;
