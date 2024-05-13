import PropTypes from "prop-types";
import FiltersIcon from "../../assets/Filters.svg";

function FilterButtonMenu({ setActiveFilter, activeFilter }) {
  const handleClick = () => {
    setActiveFilter(!activeFilter);
  };

  return (
    <div className="nav-icon">
      <button
        type="button"
        onClick={() => handleClick()}
        className="navbar-btn"
      >
        <img src={FiltersIcon} alt="filters" />
      </button>
    </div>
  );
}

FilterButtonMenu.propTypes = {
  setActiveFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.bool.isRequired,
};

export default FilterButtonMenu;
