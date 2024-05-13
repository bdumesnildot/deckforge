import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import NavbarMenuDesktop from "./NavbarMenuDesktop";
import HambugerMenu from "./HambugerMenu";
import HeroButtonMenu from "./HeroButtonMenu";
import SearchButtonMenu from "./SearchButtonMenu";
import FilterButtonMenu from "./FilterButtonMenu";
import ToggleButton from "../ToggleButton";
import OverlayMenu from "./OverlayMenu";
import logo from "../../assets/logo.png";
import "../../styles/Navbar.scss";

function NavBar({
  isFancy,
  setIsFancy,
  activeSelectHeroBtn,
  setActiveSelectHeroBtn,
  activeSearch,
  setActiveSearch,
  activeFilter,
  setActiveFilter,
  activeHero,
}) {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTabletMobile = useMediaQuery({ maxWidth: 1023 });
  const location = useLocation();
  const isDeckPage = location.pathname.includes("/deck/");
  const isDeckBuilderPage = location.pathname.includes("/deck-builder/");
  const [activeMenu, setActiveMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isTabletMobile) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setActiveMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu, menuRef]);

  return (
    <div ref={menuRef}>
      <nav className="navbar">
        <div className="nav-logo">
          <NavLink
            to={`${!activeHero.name ? "heroes-selection/" : "deck-builder/"}`}
          >
            <img src={logo} alt="Logo deckforge" className="logo" />
          </NavLink>
        </div>
        {isDesktop && <NavbarMenuDesktop activeHero={activeHero} />}
        {isTabletMobile && (
          <div className="navbar-icon">
            {isDeckBuilderPage && (
              <HeroButtonMenu
                activeSelectHeroBtn={activeSelectHeroBtn}
                setActiveSelectHeroBtn={setActiveSelectHeroBtn}
              />
            )}
            {isDeckBuilderPage && (
              <SearchButtonMenu
                activeSearch={activeSearch}
                setActiveSearch={setActiveSearch}
              />
            )}
            {isDeckBuilderPage && (
              <FilterButtonMenu
                setActiveFilter={setActiveFilter}
                activeFilter={activeFilter}
              />
            )}
            {(isDeckBuilderPage || isDeckPage) && (
              <div className="nav-icon">
                <ToggleButton isFancy={isFancy} setIsFancy={setIsFancy} />
              </div>
            )}
            <HambugerMenu
              setActiveMenu={setActiveMenu}
              activeMenu={activeMenu}
            />
            {activeMenu && (
              <OverlayMenu
                setActiveMenu={setActiveMenu}
                activeMenu={activeMenu}
                itemsRef={menuRef}
                activeHero={activeHero}
              />
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
export default NavBar;

NavBar.propTypes = {
  isFancy: PropTypes.bool.isRequired,
  setIsFancy: PropTypes.func.isRequired,
  activeSelectHeroBtn: PropTypes.bool.isRequired,
  setActiveSelectHeroBtn: PropTypes.func.isRequired,
  activeSearch: PropTypes.bool.isRequired,
  setActiveSearch: PropTypes.func.isRequired,
  activeFilter: PropTypes.bool.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  activeHero: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    banner: PropTypes.string,
  }),
};

NavBar.defaultProps = {
  activeHero: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    banner: PropTypes.string,
  }),
};
