import { useOutletContext } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../../styles/HeroesSelectionButton.scss";
import HeroesSelectionOption from "./HeroesSelectionOption";

import heroesList from "../../data/heroesList";

export default function HeroesSelectionButton() {
  const { activeHero, setActiveHero } = useOutletContext();

  const [activeItems, setActiveItems] = useState(false);
  const itemsRef = useRef(null);
  const handleClickActiveItems = () => {
    setActiveItems(!activeItems);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemsRef.current && !itemsRef.current.contains(event.target)) {
        setActiveItems(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeItems]);

  return (
    <div className="btn-heroes-container" ref={itemsRef}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={handleClickActiveItems}
        className="btn-heroes"
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(0,0,0) 50%, rgba(255, 255, 255, 0.05) 65%, rgb(0,0,0) 100%), url(${activeHero.img})`,
        }}
        onClick={handleClickActiveItems}
      >
        <div className="hero-name">{activeHero.name}</div>
        <FontAwesomeIcon
          className={activeItems ? "rotateIcon" : ""}
          icon={faCaretDown}
        />
      </div>

      {activeItems && (
        <div className="btn-heroes-items">
          {heroesList.map((hero) => (
            <HeroesSelectionOption
              key={hero.name}
              setActiveHero={setActiveHero}
              handleClickActiveItems={handleClickActiveItems}
              hero={hero}
            />
          ))}
        </div>
      )}
    </div>
  );
}
