import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchButtonMenu({ activeSearch, setActiveSearch }) {
  const handleClick = () => {
    setActiveSearch(!activeSearch);
  };

  return (
    <div className="nav-icon">
      <button
        type="button"
        label="searchButton"
        onClick={() => handleClick()}
        className="navbar-btn"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

SearchButtonMenu.propTypes = {
  setActiveSearch: PropTypes.func.isRequired,
  activeSearch: PropTypes.bool.isRequired,
};

export default SearchButtonMenu;
