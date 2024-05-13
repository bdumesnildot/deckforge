import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function NavbarMenuDesktop({ activeHero }) {
  return (
    <ul className="menu-desktop">
      <li className="navbar-navlink-desktop">
        <NavLink
          to={`${!activeHero.name ? "heroes-selection/" : "deck-builder/"}`}
        >
          {`${!activeHero.name ? "Heroes" : "Deck builder"}`}
        </NavLink>
      </li>
      <li className="navbar-navlink-desktop">
        <NavLink to="/deck/">Deck</NavLink>
      </li>
      <li className="navbar-navlink-desktop">
        <NavLink exact="true" to="/about-us/" end>
          About us
        </NavLink>
      </li>
      <li className="navbar-navlink-desktop">
        <NavLink exact="true" to="/Contact/" end>
          Contact
        </NavLink>
      </li>
    </ul>
  );
}
export default NavbarMenuDesktop;

NavbarMenuDesktop.propTypes = {
  activeHero: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    banner: PropTypes.string,
  }),
};

NavbarMenuDesktop.defaultProps = {
  activeHero: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    banner: PropTypes.string,
  }),
};
