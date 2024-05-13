import PropTypes from "prop-types";

function HambugerMenu({ setActiveMenu, activeMenu }) {
  const handleClick = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <button
      className={`nav-icon hamburger hamburger--spin ${
        activeMenu && "is-active"
      }`}
      type="button"
      onClick={() => handleClick()}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  );
}

HambugerMenu.propTypes = {
  setActiveMenu: PropTypes.func.isRequired,
  activeMenu: PropTypes.bool.isRequired,
};

export default HambugerMenu;
