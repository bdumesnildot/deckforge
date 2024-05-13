import React from "react";
import "../../styles/HeroesSelectionButton.scss";
import PropTypes from "prop-types";

export default function HeroesSelectionOption({
  setActiveHero,
  handleClickActiveItems,
  hero,
}) {
  return (
    <div
      role="option"
      aria-selected="false"
      tabIndex={0}
      onKeyDown={handleClickActiveItems}
      key={hero.name}
      className="btn btn-heroes"
      style={{
        backgroundImage: `linear-gradient(2rad, rgb(0,0,0) 40%, rgba(255,255,255,0.05) 100%), url(${hero.img})`,
      }}
      type="button"
      onClick={() => {
        setActiveHero(hero);
        handleClickActiveItems();
      }}
    >
      <div className="hero-name">{hero.name}</div>
    </div>
  );
}

HeroesSelectionOption.propTypes = {
  setActiveHero: PropTypes.func.isRequired,
  hero: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  ).isRequired,
  handleClickActiveItems: PropTypes.func.isRequired,
};
