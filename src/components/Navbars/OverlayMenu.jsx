import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function OverlayMenu({ activeMenu, setActiveMenu, activeHero }) {
  const handleClick = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <div className="overlay-menu">
      <nav>
        <ul className="menu-link">
          <li className="menu-item">
            <NavLink
              to={`${!activeHero.name ? "heroes-selection/" : "deck-builder/"}`}
              onClick={() => handleClick()}
            >
              {!activeHero.name ? "Heroes selection" : "Deck builder"}
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/deck/" onClick={() => handleClick()}>
              Deck
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/about-us/" onClick={() => handleClick()}>
              About us
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              to="/Contact/"
              onClick={() => {
                handleClick();
              }}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default OverlayMenu;

OverlayMenu.propTypes = {
  setActiveMenu: PropTypes.func.isRequired,
  activeMenu: PropTypes.bool.isRequired,
  activeHero: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    banner: PropTypes.string,
  }),
};

OverlayMenu.defaultProps = {
  activeHero: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    banner: PropTypes.string,
  }),
};
