import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import HeroesSelectionButton from "../Buttons/HeroesSelectionButton";
import ToggleButtonFilterBar from "../ToggleButtonFilterBar";
import NavbarTertiary from "./NavbarTertiary";
import ToggleButton from "../ToggleButton";
import SearchBar from "../SearchBar";
import "../../styles/NavbarSecondary.scss";

function NavbarSecondary() {
  const { isFancy, setIsFancy } = useOutletContext();

  const [showFilterBar, setShowFilterBar] = useState(false);
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    isDesktop && (
      <>
        <div className="navbar-secondary">
          <div className="navbar-side-left">
            <HeroesSelectionButton />
          </div>
          <div className="navbar-center">
            <SearchBar />
          </div>
          <div className="navbar-side-right">
            <ToggleButtonFilterBar
              onClick={() => setShowFilterBar(!showFilterBar)}
            >
              FILTER
            </ToggleButtonFilterBar>
            <ToggleButton isFancy={isFancy} setIsFancy={setIsFancy} />
          </div>
        </div>
        {showFilterBar && <NavbarTertiary />}
      </>
    )
  );
}
export default NavbarSecondary;
