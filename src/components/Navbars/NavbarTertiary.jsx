import { useOutletContext } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import DropDownButton from "../Buttons/DropDownButton";
import "../../styles/NavbarTertiary.scss";

export default function NavbarTertiary() {
  const { cards, filteredCards, setFilteredCards, activeHero } =
    useOutletContext();

  const NavRef = useRef(null);

  const [tempFiltredList, setTempFiltredList] = useState([]);

  const [attacksList, setAttacksList] = useState([]);
  const [healthsList, setHealthsList] = useState([]);
  const [costsList, setCostsList] = useState([]);
  const [typesList, setTypesList] = useState([]);

  const [selectedAttack, setSelectedAttack] = useState(null);
  const [selectedHealth, setSelectedHealth] = useState(null);
  const [selectedCost, setSelectedCost] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleClickFilter = () => {
    setFilteredCards(tempFiltredList);
  };

  const handleClickResetFilter = () => {
    setSelectedCost(null);
    setSelectedAttack(null);
    setSelectedHealth(null);
    setSelectedType(null);
    setFilteredCards(cards);
  };

  // Needed for phone and tablet, WIP
  /*
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (NavRef.current && !NavRef.current.contains(event.target)) {
        setShowFilterBar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilterBar]);
  */

  useEffect(() => {
    setTempFiltredList(
      cards
        .filter((card) => {
          return selectedCost !== null ? card.cost === selectedCost : card;
        })
        .filter((card) => {
          return selectedAttack !== null
            ? card.attack === selectedAttack
            : card;
        })
        .filter((card) => {
          return selectedHealth !== null
            ? card.health === selectedHealth
            : card;
        })
        .filter((card) => {
          return selectedType !== null ? card.type === selectedType : card;
        })
    );
  }, [selectedAttack, selectedHealth, selectedCost, selectedType, cards]);

  useEffect(() => {
    const updateList = (prop, list) => {
      const tempList = [];
      filteredCards.forEach((card) => {
        if (
          card[prop] !== null &&
          card[prop] !== undefined &&
          !tempList.some((item) => item.value === card[prop])
        ) {
          const textValue = String(card[prop]);
          tempList.push({ text: textValue, value: card[prop] });
          tempList.sort((a, b) => a.value - b.value);
        }
      });
      list(tempList);
    };

    updateList("attack", setAttacksList);
    updateList("health", setHealthsList);
    updateList("cost", setCostsList);
    updateList("type", setTypesList);
  }, [filteredCards]);

  useEffect(() => {
    handleClickResetFilter();
  }, [activeHero]);

  return (
    <div className="navbar-tertiary" ref={NavRef}>
      <p className="card-indicator">
        FIND {tempFiltredList.length} CARDS / {cards.length} CARDS
      </p>
      <div className="filters-container">
        <DropDownButton
          selectedOption={selectedAttack}
          setSelectedOption={setSelectedAttack}
          itemList={attacksList}
        >
          Attack
        </DropDownButton>
        <DropDownButton
          selectedOption={selectedHealth}
          setSelectedOption={setSelectedHealth}
          itemList={healthsList}
        >
          Health
        </DropDownButton>
        <DropDownButton
          selectedOption={selectedCost}
          setSelectedOption={setSelectedCost}
          itemList={costsList}
        >
          Cost
        </DropDownButton>
        <DropDownButton
          selectedOption={selectedType}
          setSelectedOption={setSelectedType}
          itemList={typesList}
        >
          Type
        </DropDownButton>
        <button
          type="button"
          className="btn btn-filter-done"
          onClick={handleClickFilter}
        >
          Apply
        </button>
        <button
          type="button"
          className="btn btn-filter-reset"
          onClick={handleClickResetFilter}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
