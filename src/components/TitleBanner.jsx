import React from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import logoSvg from "../assets/svg/titleBanner/mage.svg";

import "../styles/TitleBanner.scss";

function TitleBanner() {
  const { activeHero } = useOutletContext();
  const localisation = useLocation();

  return (
    <div className="titleBanner">
      <div className="titleContainer">
        <img
          src={
            localisation.pathname === "/deck/" && activeHero.name === undefined
              ? logoSvg
              : activeHero.banner
          }
          alt={`Title Banner for ${activeHero.name}`}
        />
        <h1>
          {localisation.pathname === "/deck/" && activeHero.name === undefined
            ? "Deck"
            : activeHero.name}
        </h1>
        <span className="line" />
      </div>
    </div>
  );
}

export default TitleBanner;
